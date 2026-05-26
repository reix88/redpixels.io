// Translations
const translations = {
    'en': {
        'nav.about': 'About',
        'nav.features': 'Features',
        'nav.screenshots': 'Screenshots',
        'nav.download': 'Download',
        'hero.title': 'Snowy Cats',
        'hero.tagline': 'An exciting game with adorable Pixel Cats across snowy mountains in the genre of Endless Runner Platformer!',
        'features.title': 'Game Features',
        'feature1.title': 'Adorable Cats',
        'feature1.desc': 'Collect over 30+ unique pixel cats with different abilities',
        'feature2.title': 'Snowy Mountains',
        'feature2.desc': 'Explore beautiful pixel landscapes with dynamic day/night cycles',
        'feature3.title': 'Engaging Gameplay',
        'feature3.desc': 'Overcome obstacles, collect coins to unlock more cats, increase your level',
        'feature4.title': 'Skins Shop',
        'feature4.desc': 'The ability to try on your cat over 50+ funny hats, snowboards and other effects',
        'feature5.title': 'Coming soon..',
        'screenshots.title': 'Screenshots',
        'dev.title': 'Game in Development',
        'dev.text': 'Snowy Cats is currently in active development. We\'re working hard to make the game as fun and engaging as possible. Coming soon to App Store and Google Play!',
        'dev.social': 'We also plan to help street animals! More about this and the game in social networks:',
        'download.title': 'Download for free!',
        'download.text': 'Available for iOS and Android',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Use',
        'footer.contacts': 'Contacts',
        'footer.copyright': '© 2025 Red Pixels. All rights reserved.'
    },
    'ru': {
        'nav.about': 'Об игре',
        'nav.features': 'Особенности',
        'nav.screenshots': 'Скриншоты',
        'nav.download': 'Скачать',
        'hero.title': 'Snowy Cats',
        'hero.tagline': 'Захватывающая игра с очаровательными Пиксельными Котиками по заснеженным горам в жанре Бесконечного Раннера Платформера!',
        'features.title': 'Особенности игры',
        'feature1.title': 'Очаровательные коты',
        'feature1.desc': 'Собери коллекцию из 30+ уникальных пиксельных котов с разными способностями',
        'feature2.title': 'Снежные горы',
        'feature2.desc': 'Исследуй красивые пиксельные пейзажи с динамичной сменой дня и ночи',
        'feature3.title': 'Увлекательный геймплей',
        'feature3.desc': 'Преодолевай препятствия, собирай монетки, чтобы разблокировать больше кошек, увеличивай свой уровень',
        'feature4.title': 'Магазин скинов',
        'feature4.desc': 'Возможность примерить на своего кота более 50+ смешных шляп, сноубордов и других эффектов',
        'feature5.title': 'Вскоре..',
        'screenshots.title': 'Скриншоты',
        'dev.title': 'Игра в разработке',
        'dev.text': 'Snowy Cats сейчас находится в активной разработке. Мы работаем над тем, чтобы сделать игру максимально интересной и увлекательной. Скоро игра будет доступна для скачивания в App Store и Google Play!',
        'dev.social': 'Мы так же планируем помогать уличным животным! Об этом и об игре подробнее в социальных сетях: ',
        'download.title': 'Скачай бесплатно!',
        'download.text': 'Доступно для iOS и Android',
        'footer.privacy': 'Политика конфиденциальности',
        'footer.terms': 'Условия использования',
        'footer.contacts': 'Контакты',
        'footer.copyright': '© 2025 Red Pixels. Все права защищены.'
    }
};

function setLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
    const desc = lang === 'ru' ?
        "Увлекательная пиксельная игра с котами" :
        "Exciting pixel art game with cats";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = desc;

    Object.keys(translations[lang]).forEach(key => {
        document.querySelectorAll(`[data-i18n="${key}"]`).forEach(el => {
            el.textContent = translations[lang][key];
        });
    });

    const langButton = document.querySelector('.language-button');
    if (langButton) langButton.innerHTML = `${lang.toUpperCase()} ▼`;

    document.querySelectorAll('.language-dropdown a, .mobile-language-switcher a').forEach(a => {
        a.classList.toggle('active',
            (lang === 'ru' && a.textContent === 'Русский') ||
            (lang === 'en' && a.textContent === 'English')
        );
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    const savedLang = localStorage.getItem('language');
    const browserLang = navigator.language.startsWith('ru') ? 'ru' : 'en';
    const defaultLang = savedLang || browserLang;
    setLanguage(defaultLang);

    document.querySelectorAll('.language-dropdown a, .mobile-language-switcher a').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = a.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang && (urlLang === 'en' || urlLang === 'ru')) {
        setLanguage(urlLang);
    }
});
