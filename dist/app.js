const p = window.PORTFOLIO;
const $ = selector => document.querySelector(selector);
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeURL = url => /^(https?:\/\/|mailto:)/i.test(url) || (/^[\w./-]+$/.test(url) && !url.startsWith('//')) ? url : '';
document.querySelectorAll('[data-name]').forEach(el => el.textContent = p.name);
$('.brand').textContent = p.shortName || p.name;
$('#role').textContent = p.role;
$('#tagline').textContent = p.tagline;
$('#bio').textContent = p.bio;
$('#location').textContent = p.location;
$('#year').textContent = new Date().getFullYear();
document.title = `${p.name} | Portfolio`;
$('#code-skills').textContent = "'Learning', 'Exploring', 'Growing'";
$('#code-person').textContent = 'student';
$('.placeholder-note').textContent = 'Learning today. Building my future, one step at a time.';
$('.portrait-monogram').textContent = p.name.charAt(0) + '.';
if (p.photo && safeURL(p.photo)) { const img = document.createElement('img'); img.src = p.photo; img.alt = p.name; $('#portrait').replaceChildren(img); }
if (p.email) { $('#contact-email').href = `mailto:${p.email}`; $('#contact-email').lastElementChild.textContent = p.email; }
const icons = {
 github:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.82c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.03-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.73 2.64 1.23 3.29.94.1-.73.4-1.23.72-1.52-2.5-.29-5.13-1.26-5.13-5.58 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.16a10.7 10.7 0 0 1 5.61 0c2.14-1.45 3.08-1.16 3.08-1.16.61 1.55.23 2.7.12 2.98.72.79 1.15 1.8 1.15 3.03 0 4.33-2.63 5.29-5.14 5.57.4.35.76 1.03.76 2.08v3.12c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z"/></svg>',
 linkedin:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 2h-17C2.67 2 2 2.67 2 3.5v17c0 .83.67 1.5 1.5 1.5h17c.83 0 1.5-.67 1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5ZM8 19H5V9h3v10ZM6.5 7.7a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6ZM19 19h-3v-5c0-1.2-.2-2.3-1.7-2.3S12.5 13 12.5 14v5h-3V9h2.9v1.4h.04c.4-.8 1.4-1.7 2.9-1.7 3.1 0 3.7 2 3.7 4.6V19Z"/></svg>',
 facebook:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.03 4.39 11.03 10.13 11.93v-8.44H7.08v-3.49h3.05V9.4c0-3.03 1.8-4.7 4.54-4.7 1.32 0 2.69.24 2.69.24v2.96h-1.51c-1.5 0-1.97.94-1.97 1.89v2.27h3.35l-.53 3.49h-2.82V24C19.61 23.1 24 18.1 24 12.07Z"/></svg>'
};
icons.instagram = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2"/></svg>';
icons.scholar = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 0 10l12 8 9-6v6h2v-8L12 2Z"/><path d="M5 15v5c4 3 10 3 14 0v-5l-7 5-7-5Z"/></svg>';
icons.orcid = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11"/><circle cx="6.5" cy="6.5" r="1.1" fill="var(--bg)"/><path d="M6.5 9v9M10 7h3a5.5 5.5 0 0 1 0 11h-3V7Z" fill="none" stroke="var(--bg)" stroke-width="1.7"/></svg>';
const socialLabels = { github: 'GitHub', facebook: 'Facebook', instagram: 'Instagram', scholar: 'Google Scholar', orcid: 'ORCID' };
function notice(title,text) { $('#notice-title').textContent = title; $('#notice-text').textContent = text; $('#notice').showModal(); }
Object.keys(p.socials).forEach(key => { const url = safeURL(p.socials[key]); if (!url || !icons[key]) return; const a = document.createElement('a'); const label = socialLabels[key] || key; a.setAttribute('aria-label',label); a.title = label; a.innerHTML = icons[key]; a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; $('#socials').append(a); });
function timeline(entries, icon) { return entries.map(x=>`<article class="timeline-card"><p class="date">${esc(x.date)}</p><div class="timeline-row"><span class="timeline-icon" aria-hidden="true">${icon}</span><div><h3>${esc(x.title)}</h3><p>${safeURL(x.url||'')?`<a href="${esc(safeURL(x.url))}" target="_blank" rel="noopener noreferrer">${esc(x.organization)} ↗</a>`:esc(x.organization)}</p></div></div></article>`).join(''); }
$('#experience-list').innerHTML = timeline(p.experience,'♧');
$('#education-list').innerHTML = timeline(p.education,'◇');
$('#skills-list').innerHTML = p.skills.map(s=>`<div class="skill"><b style="--skill-color:${/^#[0-9a-f]{3,8}$/i.test(s.color)?s.color:'#16f2b3'}" aria-hidden="true">${esc(s.icon)}</b><span>${esc(s.name)}</span></div>`).join('');
$('#projects-list').innerHTML = p.projects.map((x,i)=>`<article class="project"><div class="project-bar"><span>Project # ${String(i+1).padStart(2,'0')}</span><span class="project-dots">● ● ●</span></div><div class="project-body"><p class="project-date">${esc(x.date)}</p><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p><div class="tech-label">TECH STACK</div><div class="tags">${x.stack.map(t=>`<span>${esc(t)}</span>`).join('')}</div>${safeURL(x.url)?`<a class="project-action" target="_blank" rel="noopener noreferrer" href="${esc(safeURL(x.url))}">${esc(x.linkLabel || 'View project ↗')}</a>`:`<span class="project-action">Coming soon ↗</span>`}</div></article>`).join('');
document.querySelectorAll('[data-project]').forEach(b=>b.addEventListener('click',()=>notice('Make this project yours','Add your project description and a repository or live demo URL in content.js. This is an editable sample project.')));
$('#resume').addEventListener('click',()=>{if(p.resume && safeURL(p.resume)) { const a=document.createElement('a');a.href=p.resume;a.target='_blank';a.rel='noopener';a.click(); } else notice('Coming soon','My resume will be added soon. Thank you for your interest!');});
$('.menu-toggle').addEventListener('click',()=>{const open=$('#navigation').classList.toggle('open');$('.menu-toggle').setAttribute('aria-expanded',String(open));});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{$('#navigation').classList.remove('open');$('.menu-toggle').setAttribute('aria-expanded','false');}));
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.hash===`#${entry.target.id}`));}});},{rootMargin:'-20% 0px -60% 0px'});document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s));
$('#contact-form').addEventListener('submit',e=>{e.preventDefault();if(!p.email){$('#form-status').textContent='Add your contact email in content.js to enable sending. No message has been sent.';return;}const data=new FormData(e.currentTarget);location.href=`mailto:${encodeURIComponent(p.email)}?subject=${encodeURIComponent('Portfolio inquiry from '+data.get('name'))}&body=${encodeURIComponent(data.get('message')+'\n\nFrom: '+data.get('name')+'\nEmail: '+data.get('email'))}`;$('#form-status').textContent='Your email app will open with this message. Send it there to complete your inquiry.';});
$('.dialog-close').addEventListener('click',()=>$('#notice').close());$('.dialog-done').addEventListener('click',()=>$('#notice').close());



