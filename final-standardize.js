const fs = require('fs');
const path = require('path');

// 1. Load Registry
const dataContent = fs.readFileSync('public/assets/tools-data.js', 'utf8');
const toolsMatch = dataContent.match(/window\.SENDDRAFT_TOOLS\s*=\s*(\[[\s\S]*?\]);/);
if (!toolsMatch) {
    console.error("Could not find window.SENDDRAFT_TOOLS in tools-data.js");
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
const categories = fs.readdirSync(toolsDir);

categories.forEach(cat => {
    const catPath = path.join(toolsDir, cat);
    if (!fs.statSync(catPath).isDirectory()) return;

    const subDirs = fs.readdirSync(catPath);
    subDirs.forEach(dir => {
        const htmlPath = path.join(catPath, dir, 'index.html');
        if (fs.existsSync(htmlPath)) {
            let html = fs.readFileSync(htmlPath, 'utf8');
            const toolSlug = dir; // Slug is the directory name

            const toolReg = tools.find(t => t.slug === toolSlug);
            if (!toolReg) {
                // Try with category prefix if dir name is just the tool name
                const prefixedSlug = `${cat}-${dir}`;
                const toolReg2 = tools.find(t => t.slug === prefixedSlug);
                if (toolReg2) {
                    processHtml(htmlPath, html, toolReg2);
                } else {
                    console.warn(`No registration found for ${toolSlug} or ${prefixedSlug}`);
                }
            } else {
                processHtml(htmlPath, html, toolReg);
            }
        }
    });
});

function processHtml(htmlPath, html, toolReg) {
    const configRegex = /(window\.TOOL_CONFIG\s*=\s*\{[\s\S]*?)(slug:\s*"[^"]+")/;
    if (configRegex.test(html)) {
        if (!html.includes('formPreset:')) {
            html = html.replace(configRegex, `$1formPreset: "${toolReg.formPreset}",\n      $2`);
            fs.writeFileSync(htmlPath, html);
            console.log(`Updated ${toolReg.slug} -> ${toolReg.formPreset}`);
        } else {
            // Update existing formPreset if it's there
            html = html.replace(/formPreset:\s*"[^"]+"/, `formPreset: "${toolReg.formPreset}"`);
            fs.writeFileSync(htmlPath, html);
            console.log(`Verified/Fixed ${toolReg.slug} -> ${toolReg.formPreset}`);
        }
    }
}
