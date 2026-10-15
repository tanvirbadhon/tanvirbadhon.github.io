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
  const player=lottie.loadAnimation({container,renderer:'svg',loop:true,autoplay:!reducedAnimation.matches,animationData:JSON.parse(JSON.stringify(animationData)),rendererSettings:{progressiveLoad:true,preserveAspectRatio:'xMidYMid meet'}});
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
