// Keep the repository root ready for GitHub Pages, and package only public files.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
const files = ['index.html', 'coming-soon.html', 'style.css', 'motion.css',
  'polish.css', 'desktop-scale.css', 'content.js', 'app.js', 'assets.js',
  'motion.js', 'polish.js', 'assets'];
fs.mkdirSync(output, {recursive: true});
for (const file of files) {
  fs.cpSync(path.join(root, file), path.join(output, file), {recursive: true});
}
console.log('Prepared dist/ from the root website files.');
