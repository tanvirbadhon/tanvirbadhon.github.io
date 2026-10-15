// Two seamless rows, with a single accessible copy of each skill.
const skillsRoot = document.querySelector('#skills-list');
const skillCards = Array.from(skillsRoot.children);
skillsRoot.replaceChildren();
for (const cards of [skillCards.slice(0, 15), skillCards.slice(15)]) {
  if (!cards.length) continue;
  const row = document.createElement('div');
  row.className = 'skill-marquee';
  const track = document.createElement('div');
  track.className = 'skill-track';
  const group = document.createElement('div');
  group.className = 'skill-group';
  group.append(...cards);
  const copy = group.cloneNode(true);
  copy.setAttribute('aria-hidden', 'true');
  copy.inert = true;
  track.append(group, copy);
  row.append(track);
  skillsRoot.append(row);
}
const motionToggle = document.createElement('button');
motionToggle.type = 'button';
motionToggle.className = 'motion-toggle';
motionToggle.textContent = 'Pause skill animation';
motionToggle.setAttribute('aria-pressed', 'false');
motionToggle.addEventListener('click', () => {
  const paused = skillsRoot.classList.toggle('skills-paused');
  motionToggle.setAttribute('aria-pressed', String(paused));
  motionToggle.textContent = paused ? 'Play skill animation' : 'Pause skill animation';
});
skillsRoot.after(motionToggle);

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.timeline-card, .code-window').forEach(card => {
  card.classList.add('glow-surface');
  card.addEventListener('pointermove', event => {
    if (reduceMotion.matches || event.pointerType === 'touch') return;
    const rect = card.getBoundingClientRect();
    const angle = Math.atan2(event.clientY - rect.top - rect.height / 2, event.clientX - rect.left - rect.width / 2) * 180 / Math.PI + 90;
    card.style.setProperty('--glow-angle', `${angle - 55}deg`);
    card.style.setProperty('--glow-opacity', '1');
  });
  card.addEventListener('pointerleave', () => card.style.setProperty('--glow-opacity', '0'));
});
