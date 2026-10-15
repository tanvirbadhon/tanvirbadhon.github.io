const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname);
const publicFiles=new Set(['index.html','coming-soon.html','style.css','motion.css','polish.css','desktop-scale.css','content.js','app.js','assets.js','motion.js','polish.js']);
http.createServer((req,res)=>{let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);return res.end('Bad request');}const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end('Forbidden');}const relative=path.relative(root,file).split(path.sep).join('/');if(!publicFiles.has(relative)&&!(relative.startsWith('assets/')&&!relative.split('/').some(part=>part.startsWith('.')))){res.writeHead(404);return res.end('Not found');}fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end('Not found');}res.writeHead(200,{'Content-Type':{'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.pdf':'application/pdf','.svg':'image/svg+xml','.json':'application/json','.jpg':'image/jpeg','.png':'image/png'}[path.extname(file)]||'application/octet-stream'});res.end(data);});}).listen(4173,'127.0.0.1',()=>console.log('Portfolio ready at http://localhost:4173'));

