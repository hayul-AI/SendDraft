const fs = require('fs');
const path = require('path');

// 1. Load Registry
const dataPath = 'public/assets/tools-data.js';
if (!fs.existsSync(dataPath)) {
    console.error("tools-data.js not found at " + dataPath);
    process.exit(1);
}
const dataContent = fs.readFileSync(dataPath, 'utf8');

// Advanced regex to handle various formatting in tools-data.js
const tools = [];
const entryRegex = /\{\s*slug:\s*"([^"]+)"[\s\S]*?formPreset:\s*"([^"]+)"/g;
let m;
while ((m = entryRegex.exec(dataContent)) !== null) {
    tools.push({ slug: m[1], formPreset: m[2] });
}

console.log(`Found ${tools.length} tool registrations in tools-data.js.`);

const toolsDir = 'public/tools';

function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            walk(fullPath);
        } else if (file === 'index.html') {
            repairHtml(fullPath);
        }
    });
}

function repairHtml(htmlPath) {
    let html = fs.readFileSync(htmlPath, 'utf8');
    const slug = path.basename(path.dirname(htmlPath));
    const toolReg = tools.find(t => t.slug === slug);

    if (!toolReg) return;

    let changed = false;

    // 1. Ensure data-sd-form-mount exists inside <form data-sd-form>
    const formRegex = /(<form[^>]*data-sd-form[^>]*>)([\s\S]*?)(<\/form>)/i;
    const formMatch = html.match(formRegex);
    if (formMatch) {
        const formInner = formMatch[2];
        if (!formInner.includes('data-sd-form-mount')) {
            console.log(`[REPAIR] Adding missing mount point to ${slug}`);
            const newInner = '\n          <div data-sd-form-mount></div>' + formInner;
            html = html.replace(formRegex, `$1${newInner}$3`);
            changed = true;
        }
    }

    // 2. Ensure TOOL_CONFIG has the correct formPreset
    const configMatch = html.match(/window\.TOOL_CONFIG\s*=\s*\{([\s\S]*?)\};/);
    if (configMatch) {
        let configBody = configMatch[1];
        if (!configBody.includes('formPreset:')) {
            console.log(`[REPAIR] Injecting missing formPreset to ${slug}`);
            // Inject after opening brace or before slug
            configBody = `\n    formPreset: "${toolReg.formPreset}",` + configBody;
            html = html.replace(/window\.TOOL_CONFIG\s*=\s*\{[\s\S]*?\};/, `window.TOOL_CONFIG = {${configBody}};`);
            changed = true;
        } else {
            // Update existing
            const oldHtml = html;
            html = html.replace(/formPreset:\s*"[^"]+"/, `formPreset: "${toolReg.formPreset}"`);
            if (html !== oldHtml) {
                console.log(`[UPDATE] Updating formPreset for ${slug} to ${toolReg.formPreset}`);
                changed = true;
            }
        }
    } else {
        console.warn(`[WARNING] No TOOL_CONFIG found in ${slug}. This tool might be broken.`);
    }

    // 3. Cache Buster
    if (html.includes('/assets/') && !html.includes('?v=')) {
        html = html.replace(/src="\/assets\/([^"]+)\.js"/g, 'src="/assets/$1.js?v=2"');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(htmlPath, html);
    }
}

console.log("Starting full repair and standardization...");
walk(toolsDir);
console.log("Repair and Standardization Sequence Complete.");
