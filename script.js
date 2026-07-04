const config = window.STORE_CONFIG;
const body = document.body;
const footer = document.querySelector('.site-footer');
const heroName = document.getElementById('hero-name');
const heroLogo = document.getElementById('hero-logo');
const heroAction = document.getElementById('hero-action');
const linksContainer = document.getElementById('links-panel');
const floatingButtons = document.getElementById('floating-buttons');
const themeToggle = document.getElementById('theme-toggle');

heroName.textContent = config.heroText;
heroLogo.src = config.logo;
heroLogo.alt = config.name + ' Logo';
heroAction.textContent = config.contactTitle;
document.title = config.name;

config.links.forEach((link, index) => {
  const card = document.createElement('a');
  card.href = link.url;
  card.target = '_blank';
  card.rel = 'noopener noreferrer';
  card.className = 'action-card';
  card.style.animationDelay = `${index * 0.06}s`;
  card.innerHTML = `
    <div class="icon ${link.color}"><i class="${link.icon}"></i></div>
    <div class="content">
      <h3>${link.platform}</h3>
      <p>${link.subtitle}</p>
    </div>
    <span class="arrow">→</span>
  `;
  linksContainer.appendChild(card);
});

config.floatingButtons.forEach(button => {
  const btn = document.createElement('a');
  btn.href = button.url;
  btn.target = '_blank';
  btn.rel = 'noopener noreferrer';
  btn.className = `floating-button ${button.color}`;
  btn.innerHTML = `<i class="${button.icon}"></i>`;
  floatingButtons.appendChild(btn);
});

function updateThemeIcon() {
  themeToggle.textContent = body.classList.contains('theme-light') ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('theme-light');
  body.classList.toggle('theme-dark');
  updateThemeIcon();
});

function updateFooterVisibility() {
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 8;
  body.classList.toggle('scroll-ended', !nearBottom);
}

window.addEventListener('scroll', updateFooterVisibility, { passive: true });
window.addEventListener('resize', updateFooterVisibility);
updateFooterVisibility();
updateThemeIcon();

const cards = document.querySelectorAll('.action-card, .hero-card');

cards.forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
    card.style.transform = `perspective(900px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-3px)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});
