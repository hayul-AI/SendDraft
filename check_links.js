const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const links = [...html.matchAll(/href="\/tools\/([^/]+)\/"/g)].map(m => m[1]);

const td = fs.readFileSync('public/assets/tools-data.js', 'utf8');

const missingDir = [];
const missingReg = [];

links.forEach(l => {
    try {
        if (!fs.statSync('public/tools/' + l).isDirectory()) {
            missingDir.push(l);
        }
    } catch (e) {
        missingDir.push(l);
    }

    if (!td.includes('slug: "' + l + '"') && !td.includes("slug: '" + l + "'") && !td.includes('`' + l + '`')) {
        missingReg.push(l);
    }
});

console.log('Missing Dirs:', missingDir);
console.log('Missing in Registry:', missingReg);
