const uiIcon = (content, size=22) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${content}</svg>`;
const atIcon = uiIcon('<circle cx="12" cy="12" r="4"/><path d="M16 8v7c0 3 5 2 5-3a9 9 0 1 0-4 7.5"/>');
const personIcon = uiIcon('<rect x="3" y="2" width="18" height="16" rx="2"/><circle cx="12" cy="9" r="3" fill="currentColor" stroke="none"/><path d="M6 22a6 6 0 0 1 12 0Z" fill="currentColor" stroke="none"/>',42);
const codeIcon = uiIcon('<path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16"/>',27);
const sparkIcon = uiIcon('<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/>',16);
const externalIcon = uiIcon('<path d="M14 3h7v7m0-7L10 14M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>',15);
document.querySelectorAll('#education-list .timeline-icon').forEach(el=>el.innerHTML=personIcon);
document.querySelectorAll('.project').forEach((card,index)=>{
  const bar=card.querySelector('.project-bar');
  bar.replaceChildren();
  const icon=document.createElement('span');icon.className='project-code-icon';icon.innerHTML=codeIcon;
  const number=document.createElement('span');number.className='project-number';number.textContent=`Project #${index+1}`;
  bar.append(icon,number);
  const body=card.querySelector('.project-body');body.prepend(card.querySelector('h3'));
  const date=card.querySelector('.project-date');
  date.insertAdjacentHTML('afterbegin',uiIcon('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',16));
  card.querySelector('.tech-label').insertAdjacentHTML('afterbegin',uiIcon('<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v5m6-5v5M9 18v5m6-5v5M1 9h5m-5 6h5m12-6h5m-5 6h5"/>',16));
  card.querySelectorAll('.tags span').forEach(tag=>{
    const source=window.SKILL_ICONS[tag.textContent] || (tag.textContent==='C++'?window.SKILL_ICONS['C++']:null);
    if(source){const img=document.createElement('img');img.src=source;img.alt='';img.width=16;img.height=16;tag.prepend(img);}else tag.insertAdjacentHTML('afterbegin',sparkIcon);
  });
  const action=card.querySelector('.project-action');
  if(action){action.textContent=index===3?'Coming Soon':'Code';action.insertAdjacentHTML('beforeend',externalIcon);const foot=document.createElement('div');foot.className='project-footer';const badge=document.createElement('span');badge.className='project-role';badge.textContent=window.PORTFOLIO.projects[index].stack[0];foot.append(badge,action);body.append(foot);}
});
const primaryEmail=document.querySelector('#contact-email');
primaryEmail.firstElementChild.innerHTML=atIcon;
if(window.PORTFOLIO.secondaryEmail){
  const email=document.createElement('a');email.className='contact-line';email.href=`mailto:${window.PORTFOLIO.secondaryEmail}`;
  const glyph=document.createElement('span');glyph.innerHTML=atIcon;
  const address=document.createElement('span');address.textContent=window.PORTFOLIO.secondaryEmail;
  email.append(glyph,address);primaryEmail.after(email);
}
const contactArtwork=document.querySelector('.contact-decoration');
document.querySelector('.contact-details').prepend(contactArtwork);
const footer=document.querySelector('footer .wrap');
footer.querySelector('a').remove();
const footerLinks=document.createElement('div');footerLinks.className='footer-nav';footerLinks.setAttribute('role','navigation');footerLinks.setAttribute('aria-label','Footer navigation');
document.querySelectorAll('#navigation a').forEach(link=>footerLinks.append(link.cloneNode(true)));
footer.append(footerLinks);
const topButton=document.createElement('button');topButton.className='back-to-top';topButton.type='button';topButton.setAttribute('aria-label','Back to top');topButton.innerHTML=uiIcon('<path d="M12 20V4m-6 6 6-6 6 6"/>',25);
document.body.append(topButton);
const setTopVisibility=()=>{const visible=window.scrollY>300;topButton.classList.toggle('visible',visible);topButton.tabIndex=visible?0:-1;topButton.setAttribute('aria-hidden',String(!visible));};
window.addEventListener('scroll',setTopVisibility,{passive:true});setTopVisibility();
topButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
