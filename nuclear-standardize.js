const fs = require('fs');
const path = require('path');

// 1. Load Registry
const dataContent = fs.readFileSync('public/assets/tools-data.js', 'utf8');
const toolsMatch = dataContent.match(/window\.SENDDRAFT_TOOLS\s*=\s*(\[[\s\S]*?\]);/);
if (!toolsMatch) {
    console.error("Registry not found");
    process.exit(1);
}

const tools = [];
const toolRegex = /\{\s*slug:\s*"([^"]+)"[^}]*formPreset:\s*"([^"]+)"/g;
let m;
while ((m = toolRegex.exec(toolsMatch[1])) !== null) {
    tools.push({ slug: m[1], formPreset: m[2] });
}

console.log(`Found ${tools.length} tool registrations.`);

const toolsDir = 'public/tools';

function walk(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            walk(fullPath);
        } else if (file === 'index.html') {
            processHtml(fullPath);
        }
    });
}

function processHtml(htmlPath) {
    let html = fs.readFileSync(htmlPath, 'utf8');
    // Slug is the directory name
    const dirName = path.basename(path.dirname(htmlPath));

    const toolReg = tools.find(t => t.slug === dirName);
    if (!toolReg) return;

    let changed = false;

    // 1. Inject/Update formPreset
    const configRegex = /(window\.TOOL_CONFIG\s*=\s*\{[\s\S]*?)(slug:\s*"[^"]+")/;
    if (configRegex.test(html)) {
        if (!html.includes('formPreset:')) {
            html = html.replace(configRegex, `$1formPreset: "${toolReg.formPreset}",\n      $2`);
            changed = true;
        } else {
            html = html.replace(/formPreset:\s*"[^"]+"/, `formPreset: "${toolReg.formPreset}"`);
            changed = true;
        }
    }

    // 2. Cache Buster for assets
    if (html.includes('/assets/') && !html.includes('?v=')) {
        html = html.replace(/src="\/assets\/([^"]+)\.js"/g, 'src="/assets/$1.js?v=2"');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(htmlPath, html);
        console.log(`Standardized ${dirName} [${toolReg.formPreset}]`);
    }
}

walk(toolsDir);
console.log("Nuclear Standardization Complete.");
