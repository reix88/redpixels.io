/* ════════════════════════════════════════
   I18N TRANSLATIONS
════════════════════════════════════════ */
const translations = {
  en: {
    heroTitle: "SNOWY CATS",
    heroSubtitle: "An adorable pixel cat. Endless snowy mountains. Collect cats, earn coins, and race to the top!",
    aboutTitle: "ABOUT THE GAME",
    aboutP1: "Meet your cat — a brave little pixel feline scaling endless snowy peaks. Leap over obstacles, collect sparkling coins and unlock an entire wardrobe of adorable hats and costumes!",
    aboutP2: "Snowy Cats is a pixel art endless runner platformer where you guide your cat through beautiful snow-covered mountains. Simple controls, satisfying progress, and a whole lot of charm.",
    aboutP3: "Currently in active development. Coming soon to App Store and Google Play!",
    featuresTitle: "FEATURES",
    feature1Title: "30+ CATS",
    feature1Desc: "Collect over 30 unique pixel cats, each with their own special style and look.",
    feature2Title: "SNOWY MOUNTAINS",
    feature2Desc: "Explore beautiful pixel landscapes with dynamic day and night cycles.",
    feature3Title: "ENDLESS RUNNER",
    feature3Desc: "Overcome obstacles, collect coins and climb higher and higher every run!",
    feature4Title: "SKINS SHOP",
    feature4Desc: "Dress your cat with 50+ funny hats, snowboards and other cool effects.",
    screenshotsTitle: "SCREENSHOTS",
    devTitle: "GAME IN DEVELOPMENT",
    devText: "We're working hard to make Snowy Cats as fun and engaging as possible. Coming soon to App Store and Google Play!",
    devSocial: "We also plan to help street animals! Follow us on social media for updates:",
    downloadTitle: "COMING SOON",
    downloadText: "Snowy Cats will be available for free on iOS and Android.",
    appStoreSmall: "Download on",
    googlePlaySmall: "Get it on",
    footerTagline: "Pixel cats & snowy adventures.",
    footerLinksTitle: "LINKS",
    footerSocialTitle: "FOLLOW US",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Use",
    footerContacts: "Contacts",
    footerAbout: "About the game",
    footerFeatures: "Features",
    footerCopy: "© 2025 RED PIXELS. ALL RIGHTS RESERVED.",
    footerMadeWith: "Made with ♥ and 256 colors"
  },
  ru: {
    heroTitle: "SNOWY CATS",
    heroSubtitle: "Очаровательный пиксельный котик. Бесконечные снежные горы. Собирай котов, зарабатывай монеты и мчись наверх!",
    aboutTitle: "ОБ ИГРЕ",
    aboutP1: "Познакомьтесь с вашим котом — храбрым пиксельным пушистиком, покоряющим бесконечные снежные вершины. Перепрыгивай препятствия, собирай монетки и открывай целый гардероб милых шляп и костюмов!",
    aboutP2: "Snowy Cats — пиксельный платформер-раннер, в котором вы ведёте своего кота по красивым заснеженным горам. Простое управление, приятный прогресс и много обаяния.",
    aboutP3: "Игра сейчас в активной разработке. Скоро в App Store и Google Play!",
    featuresTitle: "ОСОБЕННОСТИ",
    feature1Title: "30+ КОТОВ",
    feature1Desc: "Собери коллекцию из 30+ уникальных пиксельных котов, каждый со своим стилем.",
    feature2Title: "СНЕЖНЫЕ ГОРЫ",
    feature2Desc: "Исследуй красивые пиксельные пейзажи с динамичной сменой дня и ночи.",
    feature3Title: "РАННЕР",
    feature3Desc: "Преодолевай препятствия, собирай монеты и карабкайся всё выше и выше!",
    feature4Title: "МАГАЗИН СКИНОВ",
    feature4Desc: "Одень кота в 50+ смешных шляп, сноубордов и других крутых эффектов.",
    screenshotsTitle: "СКРИНШОТЫ",
    devTitle: "ИГРА В РАЗРАБОТКЕ",
    devText: "Мы работаем над тем, чтобы Snowy Cats была максимально увлекательной. Скоро в App Store и Google Play!",
    devSocial: "Мы также планируем помогать уличным животным! Следите за новостями в соцсетях:",
    downloadTitle: "СКОРО",
    downloadText: "Snowy Cats будет доступна бесплатно для iOS и Android.",
    appStoreSmall: "Загрузите в",
    googlePlaySmall: "Доступно в",
    footerTagline: "Пиксельные коты и снежные приключения.",
    footerLinksTitle: "ССЫЛКИ",
    footerSocialTitle: "СОЦСЕТИ",
    footerPrivacy: "Политика конфиденциальности",
    footerTerms: "Условия использования",
    footerContacts: "Контакты",
    footerAbout: "Об игре",
    footerFeatures: "Особенности",
    footerCopy: "© 2025 RED PIXELS. ВСЕ ПРАВА ЗАЩИЩЕНЫ.",
    footerMadeWith: "Сделано с ♥ и 256 цветами"
  }
};

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang] && translations[lang][key] !== undefined) {
      el.textContent = translations[lang][key];
    }
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  try { localStorage.setItem('snowy-lang', lang); } catch(e) {}
}

let savedLang = 'en';
try {
  savedLang = localStorage.getItem('snowy-lang') ||
    (navigator.language.startsWith('ru') ? 'ru' : 'en');
} catch(e) {}
applyLang(savedLang);

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

/* ════════════════════════════════════════
   8-BIT BEEP SOUND (Web Audio API)
════════════════════════════════════════ */
let audioCtx = null;
let soundOn = true;
try {
  const savedSound = localStorage.getItem('snowy-sound');
  if (savedSound === 'off') soundOn = false;
} catch(e) {}

function ensureAudio() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) audioCtx = new AC();
  }
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
}

function beep(freq = 880, duration = 0.06, type = 'square', vol = 0.08) {
  if (!soundOn) return;
  ensureAudio();
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  gain.gain.setValueAtTime(vol, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

function uiClick() {
  if (!soundOn) return;
  beep(1320, 0.04, 'square', 0.06);
  setTimeout(() => beep(880, 0.05, 'square', 0.06), 35);
}

document.querySelectorAll('.play-sound').forEach(el => {
  el.addEventListener('click', uiClick);
  el.addEventListener('mouseenter', () => beep(1480, 0.02, 'square', 0.025));
});

/* ════════════════════════════════════════
   SOUND TOGGLE
════════════════════════════════════════ */
const soundToggle = document.getElementById('soundToggle');
const soundIcon = document.getElementById('soundIcon');

function updateSoundIcon() {
  if (!soundToggle || !soundIcon) return;
  if (soundOn) {
    soundToggle.classList.remove('muted');
    soundIcon.innerHTML = `
      <rect x="3" y="6" width="2" height="4" fill="#FFFFFF"/>
      <rect x="5" y="5" width="1" height="6" fill="#FFFFFF"/>
      <rect x="6" y="4" width="2" height="8" fill="#FFFFFF"/>
      <rect x="10" y="6" width="1" height="1" fill="#FFFFFF"/>
      <rect x="10" y="9" width="1" height="1" fill="#FFFFFF"/>
      <rect x="11" y="7" width="1" height="2" fill="#FFFFFF"/>
      <rect x="12" y="5" width="1" height="1" fill="#FFFFFF"/>
      <rect x="12" y="10" width="1" height="1" fill="#FFFFFF"/>
      <rect x="13" y="6" width="1" height="4" fill="#FFFFFF"/>
    `;
  } else {
    soundToggle.classList.add('muted');
    soundIcon.innerHTML = `
      <rect x="3" y="6" width="2" height="4" fill="#FFFFFF"/>
      <rect x="5" y="5" width="1" height="6" fill="#FFFFFF"/>
      <rect x="6" y="4" width="2" height="8" fill="#FFFFFF"/>
      <rect x="10" y="6" width="1" height="1" fill="#FFFFFF"/>
      <rect x="11" y="7" width="1" height="1" fill="#FFFFFF"/>
      <rect x="12" y="8" width="1" height="1" fill="#FFFFFF"/>
      <rect x="13" y="9" width="1" height="1" fill="#FFFFFF"/>
      <rect x="13" y="6" width="1" height="1" fill="#FFFFFF"/>
      <rect x="12" y="7" width="1" height="1" fill="#FFFFFF"/>
      <rect x="11" y="9" width="1" height="1" fill="#FFFFFF"/>
      <rect x="10" y="10" width="1" height="1" fill="#FFFFFF"/>
    `;
  }
}
updateSoundIcon();

if (soundToggle) {
  soundToggle.addEventListener('click', () => {
    soundOn = !soundOn;
    try { localStorage.setItem('snowy-sound', soundOn ? 'on' : 'off'); } catch(e) {}
    updateSoundIcon();
    if (soundOn) beep(1480, 0.05, 'square', 0.08);
  });
}

/* ════════════════════════════════════════
   PIXEL SNOWFLAKES
════════════════════════════════════════ */
const snowContainer = document.getElementById('snowflakes');
if (snowContainer) {
  const FLAKE_COUNT = window.innerWidth < 768 ? 30 : 60;
  function spawnFlake() {
    const flake = document.createElement('div');
    const isBig = Math.random() > 0.7;
    flake.className = isBig ? 'snowflake big' : 'snowflake';
    const size = isBig ? 4 : (Math.random() > 0.5 ? 3 : 2);
    flake.style.width = size + 'px';
    flake.style.height = size + 'px';
    flake.style.left = Math.random() * 100 + 'vw';
    flake.style.animationDuration = (6 + Math.random() * 8) + 's';
    flake.style.animationDelay = (-Math.random() * 10) + 's';
    flake.style.opacity = 0.5 + Math.random() * 0.5;
    snowContainer.appendChild(flake);
  }
  for (let i = 0; i < FLAKE_COUNT; i++) spawnFlake();
}

/* ════════════════════════════════════════
   MOBILE HAMBURGER MENU
════════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const navActions = document.getElementById('navActions');
if (hamburger && navActions) {
  hamburger.addEventListener('click', () => {
    navActions.classList.toggle('open');
  });
  navActions.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navActions.classList.remove('open'));
  });
}

/* Resume audio on first interaction */
['click', 'touchstart', 'keydown'].forEach(evt => {
  document.addEventListener(evt, ensureAudio, { once: true });
});
