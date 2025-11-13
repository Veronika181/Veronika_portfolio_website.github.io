/*=============== SHOW/HIDE MENU ===============*/
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show-menu');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 50;
    const sectionId = section.getAttribute('id');
    const navItem = document.querySelector(`.nav__menu a[href*=${sectionId}]`);

    if (navItem) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItem.classList.add('active-link');
      } else {
        navItem.classList.remove('active-link');
      }
    }
  });
}
window.addEventListener('scroll', scrollActive);

/*=============== CHANGE HEADER BACKGROUND ON SCROLL ===============*/
function scrollHeader() {
  const header = document.getElementById('header');
  if (header) {
    header.classList.toggle('scroll-header', window.scrollY >= 80);
  }
}
window.addEventListener('scroll', scrollHeader);

/*=============== DARK/LIGHT THEME TOGGLE ===============*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'sun-icon';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? 'moon-icon' : 'sun-icon';

if (selectedTheme) {
  document.body.classList.toggle(darkTheme, selectedTheme === 'dark');
  themeButton.classList.toggle(iconTheme, selectedIcon === 'moon-icon');
}

if (themeButton) {
  themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
  });
}

/*=============== LANGUAGE SWITCHER ===============*/
const langToggle = document.getElementById('lang-toggle');
const langDropdown = document.getElementById('lang-dropdown');

if (langToggle && langDropdown) {
  langToggle.addEventListener('click', () => {
    langDropdown.style.display =
      langDropdown.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', (e) => {
    if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
      langDropdown.style.display = 'none';
    }
  });
}

async function switchLanguage(lang) {
  try {
    const res = await fetch('lang.json');
    const data = await res.json();
    const content = data[lang];

    document.documentElement.lang = lang;
    document.getElementById('homeTitle').textContent = content.homeTitle;
    document.getElementById('homeText').textContent = content.homeText;
    document.getElementById('buttonText').textContent = content.buttonText;
    document.getElementById('aboutTitle').innerHTML = `<span>${content.aboutTitle}</span>`;
    document.getElementById('aboutText').textContent = content.aboutText;
    document.getElementById('contactTitle').innerHTML = `<span>${content.contactTitle}</span>`;
    document.getElementById('contactButton').textContent = content.contactButton;
  } catch (error) {
    console.error('Chyba při načítání jazykového souboru:', error);
  }
}




