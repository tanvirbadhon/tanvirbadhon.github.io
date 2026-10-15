// A classic script works from file:// as well as HTTP, without JSON requests.
const fs = require('node:fs');
const path = require('node:path');
const directory = path.resolve(__dirname, '../assets');
const animations = Object.fromEntries(['experience.json','education.json','contact.json'].map(file=>[file,JSON.parse(fs.readFileSync(path.join(directory,file),'utf8'))]));
fs.writeFileSync(path.join(directory,'animation-data.js'), `window.PORTFOLIO_ANIMATIONS = ${JSON.stringify(animations)};\n`);
console.log('Bundled all three animations for direct HTML-file viewing.');
