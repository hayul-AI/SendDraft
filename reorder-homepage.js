const fs = require('fs');
const path = require('path');

const htmlPath = 'public/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Order keys: work, hr, tech-support, notices, housing, travel, freelance, education, relationships, sales, banking, billing, customer
const order = ['work', 'hr', 'tech-support', 'notices', 'housing', 'travel', 'freelance', 'education', 'relationships', 'sales', 'banking', 'billing', 'customer'];

// Extract sections
const sections = {};
const sectionRegex = /(<!-- (.*?) -->\s*<div class="cat-section" id="(.*?)">[\s\S]*?<\/div>\s*<\/div>)/g;
// Wait, the regex needs to be careful because of nested divs. 
// But in our index.html, each cat-section is a top-level block inside the container.

let m;
while ((m = sectionRegex.exec(html)) !== null) {
    sections[m[3]] = m[1];
}

// Rebuild the tools-area
const newToolsArea = order.map(key => sections[key] || `<!-- Missing ${key} -->`).join('\n\n      ');

// Replace the whole area
const startMarker = '<!-- Work & Office -->';
const endMarker = '<!-- Personal Messages -->'; // Note: this was the old last one
// Need a better way to find the end.
const areaRegex = /<!-- Work & Office -->[\s\S]*<!-- Personal Messages -->\s*<div class="cat-section" id="relationships">[\s\S]*?<\/div>\s*<\/div>/;

if (areaRegex.test(html)) {
    html = html.replace(areaRegex, newToolsArea);
    fs.writeFileSync(htmlPath, html);
    console.log("Homepage categories reordered successfully.");
} else {
    console.error("Could not find categories area in index.html");
}
