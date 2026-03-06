const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'public', 'tools');
const dirs = fs.readdirSync(toolsDir, { withFileTypes: true }).filter(d => d.isDirectory());

let stats = {
    processed: 0,
    slugFixed: 0,
    dateNormalized: 0,
    timeNormalized: 0,
    scriptStripped: 0
};

dirs.forEach(d => {
    const htmlPath = path.join(toolsDir, d.name, 'index.html');
    if (!fs.existsSync(htmlPath)) return;

    let html = fs.readFileSync(htmlPath, 'utf8');
    let originalHtml = html;
    const slug = d.name;

    // 1. Tool Registry / Page Key Audit (Slug Match)
    // Ensure TOOL_CONFIG contains the correct slug
    const configRegex = /(window\.TOOL_CONFIG\s*=\s*\{[\s\S]*?slug:\s*)(["'])([^"']+)\2/i;
    const match = html.match(configRegex);
    if (match && match[3] !== slug) {
        html = html.replace(configRegex, `$1"${slug}"`);
        stats.slugFixed++;
    }

    // 2. Date Input Normalization
    // Find any date input, or input wrapping 'date' in id/name/data-field, and ensure it has class="sd-date"
    const dateRegex = /<input[^>]+(?:type=["']date["']|id=["'][^"']*date[^"']*["']|name=["'][^"']*date[^"']*["']|data-field=["'][^"']*date[^"']*["'])[^>]*>/gi;
    html = html.replace(dateRegex, (inputTag) => {
        // If it's a completely different type (like text), we change it to text but use flatpickr sd-date class
        let newTag = inputTag;

        // Ignore time fields incorrectly matched
        if (newTag.toLowerCase().includes('time')) return inputTag;

        if (!newTag.includes('sd-date')) {
            if (newTag.includes('class="')) {
                newTag = newTag.replace(/class=["']([^"']*)["']/, 'class="$1 sd-date"');
            } else {
                newTag = newTag.replace('<input', '<input class="sd-date"');
            }
            // Force type="text" because Flatpickr overrides it better than native type="date"
            newTag = newTag.replace(/type=["'](?:date|text)["']/i, 'type="text"');
            stats.dateNormalized++;
            return newTag;
        }
        return inputTag;
    });

    // 3. Time Input Normalization
    const timeRegex = /<input[^>]+(?:type=["']time["']|id=["'][^"']*time[^"']*["']|name=["'][^"']*time[^"']*["']|data-field=["'][^"']*time[^"']*["'])[^>]*>/gi;
    html = html.replace(timeRegex, (inputTag) => {
        let newTag = inputTag;
        if (!newTag.includes('sd-time')) {
            if (newTag.includes('class="')) {
                newTag = newTag.replace(/class=["']([^"']*)["']/, 'class="$1 sd-time"');
            } else {
                newTag = newTag.replace('<input', '<input class="sd-time"');
            }
            newTag = newTag.replace(/type=["'](?:time|text)["']/i, 'type="text"');
            stats.timeNormalized++;
            return newTag;
        }
        return inputTag;
    });

    // 4. Strip rogue script tags overriding Generate
    // Look for any <script> completely after </script> that includes tool.js
    const rogueScriptRegex = /<script\b[^>]*>[\s\S]*?(?:sd_collect|querySelector\(\'\[data-sd-generate\]\'\)|addEventListener\(\'click\')[\s\S]*?<\/script>/gi;
    if (rogueScriptRegex.test(html)) {
        // Make sure we aren't deleting tool.js or tool-ui.js
        let toReplace = html.match(rogueScriptRegex);
        toReplace.forEach(scriptBlock => {
            if (!scriptBlock.includes('src=')) {
                html = html.replace(scriptBlock, '');
                stats.scriptStripped++;
            }
        });
    }

    // 5. Output System Standardization
    // Verify dual-output exists
    if (!html.includes('data-sd-output-area')) {
        console.log(`WARNING: Missing output area in ${slug}`);
    }

    if (html !== originalHtml) {
        fs.writeFileSync(htmlPath, html, 'utf8');
    }
    stats.processed++;
});

console.log('AUDIT COMPLETE.');
console.log(`Processed: ${stats.processed} tools`);
console.log(`Slugs Fixed: ${stats.slugFixed}`);
console.log(`Dates Normalized: ${stats.dateNormalized}`);
console.log(`Times Normalized: ${stats.timeNormalized}`);
console.log(`Legacy Scripts Purged: ${stats.scriptStripped}`);
