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

function getGradientClass(color) {
  switch (color) {
    case 'whatsapp': return 'whatsapp-gradient';
    case 'phone': return 'call-gradient';
    case 'instagram': return 'instagram-gradient';
    case 'messenger': return 'facebook-gradient';
    case 'tiktok': return 'tiktok-gradient';
    case 'snapchat': return 'tiktok-gradient';
    case 'review': return 'call2-gradient';
    case 'drive': return 'location-gradient';
    default: return 'call-gradient';
  }
}

function getIconMarkup(iconType, extraClass = '') {
  const classes = ['icon-svg', extraClass].filter(Boolean).join(' ');
  const snapchatClass = iconType === 'snapchat' ? 'snapchat-icon' : '';
  const finalClasses = [classes, snapchatClass].filter(Boolean).join(' ');

  switch (iconType) {
    case 'whatsapp':
      return `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="${finalClasses}">
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      `;
    case 'phone':
      return `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="${finalClasses}">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      `;
    case 'instagram':
      return `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="${finalClasses}">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="2"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" stroke-width="2"></path>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
        </svg>
      `;
    case 'messenger':
      return `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="${finalClasses}">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      `;
    case 'tiktok':
      return `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="${finalClasses}">
          <path d="M9 18V5l12-2v13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          <circle cx="6" cy="18" r="3" fill="none" stroke="currentColor" stroke-width="2"></circle>
          <circle cx="18" cy="16" r="3" fill="none" stroke="currentColor" stroke-width="2"></circle>
        </svg>
      `;
    case 'snapchat':
      return `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="${finalClasses}">
          <path d="M12 3c3.2 0 6 2.2 6 4.9 0 1.5-.8 2.8-2.2 3.6-.3.2-.5.4-.5.8 0 .3.1.5.3.7.7.5 1.2 1.2 1.4 1.9.2.8-.1 1.6-.7 2.1-.7.6-1.7.8-2.6.5-.7-.2-1.4-.3-2.1-.3s-1.4.1-2.1.3c-.9.3-1.9.1-2.6-.5-.7-.5-.9-1.3-.7-2.1.2-.7.7-1.4 1.4-1.9.2-.2.3-.4.3-.7 0-.4-.2-.6-.5-.8C6.8 10.7 6 9.4 6 7.9 6 5.2 8.8 3 12 3Z" fill="currentColor"></path>
        </svg>
      `;
    default:
      return `<i class="${extraClass || ''}"></i>`;
  }
}

// ترتيب جديد: وسائل التواصل الاجتماعية ثم WhatsApp ثم الاتصال
const orderedLinks = [
  // وسائل التواصل الاجتماعي
  ...config.links.filter(link => ['Messenger', 'Snapchat', 'Instagram', 'TikTok'].includes(link.platform)),
  // WhatsApp
  ...config.links.filter(link => link.platform === 'WhatsApp'),
  // Call Now
  ...config.links.filter(link => link.platform === 'Call Now')
];

orderedLinks.forEach((link, index) => {
  const card = document.createElement('a');
  card.href = link.url;
  card.target = '_blank';
  card.rel = 'noopener noreferrer';
  card.className = 'social-card';
  card.style.animationDelay = `${index * 0.08}s`;
  const iconMarkup = getIconMarkup(link.icon, '');
  card.innerHTML = `
    <div class="icon-circle ${getGradientClass(link.color)}">
      ${iconMarkup}
    </div>
    <div class="card-content">
      <h3 class="platform-name">${link.platform}</h3>
      <p class="platform-subtitle">${link.subtitle}</p>
    </div>
    <div class="arrow-icon">→</div>
  `;
  linksContainer.appendChild(card);
});

config.floatingButtons.forEach(button => {
  const btn = document.createElement('a');
  btn.href = button.url;
  btn.target = '_blank';
  btn.rel = 'noopener noreferrer';
  btn.className = `floating-button ${button.color}`;
  btn.innerHTML = getIconMarkup(button.icon, 'floating-icon-svg');
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

const cards = document.querySelectorAll('.social-card, .hero-card');

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
