/*=============== SHOW/HIDE MENU ===============*/
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

function updateMenuState(open) {
  if (navToggle) navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  if (navMenu) navMenu.classList.toggle('show-menu', open);
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('show-menu');
    updateMenuState(!isOpen);
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    updateMenuState(false);

    navLinks.forEach(l => l.classList.remove('active-link'));
    link.classList.add('active-link');
  });
});

function setActiveLinkByHash() {
  const currentHash = window.location.hash;
  if (!currentHash) return;

  const active = document.querySelector(`.nav__menu a[href="${currentHash}"]`);
  if (active) {
    navLinks.forEach(l => l.classList.remove('active-link'));
    active.classList.add('active-link');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveLinkByHash();
  scrollActive();
});

window.addEventListener('hashchange', setActiveLinkByHash);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navMenu && navMenu.classList.contains('show-menu')) {
    updateMenuState(false);
  }
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 50;
    const sectionId = section.getAttribute('id');
    const navItem = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

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
  themeButton && themeButton.classList.contains(iconTheme) ? 'moon-icon' : 'sun-icon';

if (selectedTheme) {
  document.body.classList.toggle(darkTheme, selectedTheme === 'dark');
  if (themeButton) {
    themeButton.classList.toggle(iconTheme, selectedIcon === 'moon-icon');
  }
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
    const setText = (id, value, useHTML = false) => {
      const element = document.getElementById(id);
      if (!element) return;
      if (useHTML) element.innerHTML = value;
      else element.textContent = value;
    };

    setText('homeTitle', content.homeTitle);
    setText('homeText', content.homeText);
    setText('buttonText', content.buttonText);
    setText('aboutTitle', `<span>${content.aboutTitle}</span>`, true);
    setText('aboutText', content.aboutText);
    setText('contactTitle', `<span>${content.contactTitle}</span>`, true);
    setText('contactButton', content.contactButton);
  } catch (error) {
    console.error('Chyba při načítání jazykového souboru:', error);
  }
}

/*=============== CONTACT FORM MESSAGE ===============*/
const contactForm = document.querySelector('.contact__form');

// Initialize EmailJS
(function () {
  emailjs.init("Nmzb4GYNtHeOeRfM0"); // Public Key
})();

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
      from_name: contactForm.elements['name'].value,
      from_email: contactForm.elements['email'].value,
      message: contactForm.elements['message'].value,
      to_email: "veronika.obrtelova181@gmail.com"
    };

    const button = contactForm.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = "Sending...";

    emailjs
      .send("service_qz93g4b", "template_9cvklkh", formData)
      .then(
        function (response) {
          alert("Děkujeme za zprávu! Vaše zpráva byla úspěšně odeslána.");
          contactForm.reset();
          button.disabled = false;
          button.textContent = originalText;
        },
        function (error) {
          alert("Chyba! Zpráva se nepodařila odeslat. Zkuste to prosím později.");
          console.error("EmailJS Error:", error);
          button.disabled = false;
          button.textContent = originalText;
        }
      );
  });
}



