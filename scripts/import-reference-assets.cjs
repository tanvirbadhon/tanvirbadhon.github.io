// Import the public visual assets used by the supplied portfolio reference.
// Parse serialized data only; never execute the reference's JavaScript bundles.
const fs = require('node:fs');
const path = require('node:path');
const origin = 'https://www.rifatrudro.xyz';
const root = path.resolve(__dirname, '../assets');
const slug = value => value.toLowerCase().replace(/\+\+/g, 'plusplus').replace(/[^a-z0-9]+/g, '-');
async function download(url, target) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  fs.mkdirSync(path.dirname(target), {recursive:true});
  fs.writeFileSync(target, bytes);
}
async function run() {
  const html = await (await fetch(origin)).text();
  const sources = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(m=>m[1]);
  const bundles = await Promise.all(sources.map(async url=>(await fetch(origin+url)).text()));
  const urls = [...new Set(bundles.flatMap(s=>[...s.matchAll(/"([^"\s]+\.svg)"/g)].map(m=>m[1])))];
  global.window = {};
  require('../content.js');
  const mapping = {};
  for (const skill of window.PORTFOLIO.skills) {
    const name = slug(skill.name);
    const url = urls.find(url=>slug(path.basename(url).split('.')[0])===name);
    if (!url) continue;
    const filename = `icons/${name}.svg`;
    await download(origin+url, path.join(root,filename));
    mapping[skill.name] = `assets/${filename}`;
  }
  fs.writeFileSync(path.join(root,'skill-icons.js'),`window.SKILL_ICONS = ${JSON.stringify(mapping,null,2)};\n`);
  let flight = '';
  for (const m of html.matchAll(/self\.__next_f\.push\((.*?)\)<\/script>/g)) {
    const value = JSON.parse(m[1]);
    if (value[0]===1) flight+=value[1];
  }
  const animations = [];
  for (const m of flight.matchAll(/"animationPath":/g)) {
    const start=m.index+m[0].length;
    let depth=0, quoted=false, escaped=false, end=start;
    for (;end<flight.length;end++) {
      const c=flight[end];
      if(quoted){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c==='"')quoted=false;continue;}
      if(c==='"')quoted=true;
      else if(c==='{')depth++;
      else if(c==='}' && --depth===0){end++;break;}
    }
    const data=JSON.parse(flight.slice(start,end));
    for(const asset of data.assets||[]) {
      if(typeof asset.p==='string' && /^\$[0-9a-f]+$/.test(asset.p)) {
        const id=asset.p.slice(1);
        const match=new RegExp(`${id}:T([0-9a-f]+),`).exec(flight);
        if(!match)throw new Error(`Unresolved image ${id}`);
        asset.p=flight.slice(match.index+match[0].length,match.index+match[0].length+parseInt(match[1],16));
      }
    }
    animations.push(data);
  }
  if(animations.length!==3)throw new Error(`Expected 3 animations, found ${animations.length}`);
  for(let i=0;i<animations.length;i++)fs.writeFileSync(path.join(root,['experience.json','education.json','contact.json'][i]),JSON.stringify(animations[i]));
  require('./bundle-animations.cjs');
  for(const file of ['hero.svg','section.svg','blur-23.svg'])await download(`${origin}/${file}`,path.join(root,file));
  await download('https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie_light.min.js',path.join(root,'lottie-light.min.js'));
  await download('https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/LICENSE.md',path.join(root,'lottie-LICENSE.md'));
  console.log(`Imported ${Object.keys(mapping).length} skill icons and ${animations.length} animations.`);
}
run().catch(error=>{console.error(error.message);process.exitCode=1;});
