// Local copies of the public reference assets; no third-party requests at runtime.
document.querySelectorAll('.skill').forEach(card => {
  const name = card.querySelector('span').textContent;
  const source = window.SKILL_ICONS[name];
  if (!source) return;
  const image = document.createElement('img');
  image.src = source;
  image.alt = '';
  image.width = 40;
  image.height = 40;
  image.decoding = 'async';
  card.querySelector('b').replaceChildren(image);
});
const workIcon = '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12c5 4 13 4 18 0M10 13h4v4h-4z"/></svg>';
const schoolIcon = '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m2 9 10-6 10 6-10 6L2 9Zm4 3v6c4 3 8 3 12 0v-6M22 9v9"/></svg>';
document.querySelectorAll('#experience-list .timeline-icon').forEach(el=>el.innerHTML=workIcon);
document.querySelectorAll('#education-list .timeline-icon').forEach(el=>el.innerHTML=schoolIcon);
const reducedAnimation = matchMedia('(prefers-reduced-motion: reduce)');
const players=[];
const artwork = [
  {selector:'#experience .illustration',file:'experience.json',label:'Animated professional workspace'},
  {selector:'#education .illustration',file:'education.json',label:'Animated education illustration'},
  {selector:'.contact-decoration',file:'contact.json',label:'Animated contact illustration'}
];
for(const item of artwork){
  const container=document.querySelector(item.selector);
  if(!container || !window.lottie)continue;
  container.replaceChildren();
  container.classList.add('reference-animation');
  const animationData=window.PORTFOLIO_ANIMATIONS[item.file];
  const makeData=()=>{
    const data=JSON.parse(JSON.stringify(animationData));
    if(item.file==='experience.json' && document.documentElement.dataset.theme==='light'){
      const recolor=node=>{if(!node||typeof node!=='object')return;
        if((node.ty==='fl'||node.ty==='st')&&Array.isArray(node.c?.k)&&typeof node.c.k[0]==='number'){
          const [r,g,b,a=1]=node.c.k;const light=.2126*r+.7152*g+.0722*b;
          if(Math.max(r,g,b)-Math.min(r,g,b)>.08){
            const base=r>b*1.1?[.65,.52,.32]:[.16,.24,.34];
            const tint=Math.min(.8,light*.7);node.c.k=[...base.map(v=>v+(1-v)*tint),a];
          }
        }
        if((node.ty==='gf'||node.ty==='gs')&&Array.isArray(node.g?.k?.k)&&typeof node.g.k.k[0]==='number'){
          const stops=node.g.k.k;for(let i=0;i<(node.g.p||0)*4;i+=4){const light=.2126*stops[i+1]+.7152*stops[i+2]+.0722*stops[i+3];const base=stops[i+1]>stops[i+3]*1.1?[.65,.52,.32]:[.16,.24,.34];base.forEach((v,j)=>stops[i+j+1]=v+(1-v)*Math.min(.8,light*.7));}
        }
        Object.values(node).forEach(value=>{if(typeof value==='object')recolor(value);});
      };recolor(data);
    }return data;
  };
  let player=lottie.loadAnimation({container,renderer:'svg',loop:true,autoplay:!reducedAnimation.matches,animationData:makeData(),rendererSettings:{progressiveLoad:true,preserveAspectRatio:'xMidYMid meet'}});
  if(item.file==='experience.json')new MutationObserver(()=>{const index=players.indexOf(player);player.destroy();player=lottie.loadAnimation({container,renderer:'svg',loop:true,autoplay:!reducedAnimation.matches,animationData:makeData(),rendererSettings:{preserveAspectRatio:'xMidYMid meet'}});if(index>=0)players[index]=player;}).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  players.push(player);
  player.addEventListener('DOMLoaded',()=>{if(reducedAnimation.matches)player.goToAndStop(0,true);});
}
reducedAnimation.addEventListener('change',()=>players.forEach(player=>reducedAnimation.matches?player.pause():player.play()));
const animationObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  const index=artwork.findIndex(item=>document.querySelector(item.selector)===entry.target);
  if(index<0 || !players[index])return;
  if(entry.isIntersecting && !reducedAnimation.matches)players[index].play();else players[index].pause();
}));
artwork.forEach(item=>{const el=document.querySelector(item.selector);if(el)animationObserver.observe(el);});
