// === Mobilní menu ===
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('show');
}

document.getElementById("language-switcher").value = "cz";
document.getElementById("language-switcher-sidebar").value = "cz";

function switchLanguage(lang) {
  document.getElementById("language-switcher").value = lang;
  document.getElementById("language-switcher-sidebar").value = lang;
}


// === Scroll na kontakt ===
function openContact() {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// === Zavření sidebaru kliknutím mimo ===
document.addEventListener('click', function (event) {
  const sidebar = document.querySelector('.sidebar');
  const menuButton = document.querySelector('.menu-button');
  if (
    sidebar.classList.contains('show') &&
    !sidebar.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {
    sidebar.classList.remove('show');
  }
});

// === Zvýraznění aktivní sekce v navigaci ===
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar-list a, .sidebar-list a');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// === Načtení preferovaného režimu ===
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  }
});
// EmailJS odeslání formuláře
document.addEventListener('DOMContentLoaded', function () {
  emailjs.init('PTUbFi2NjixnnIzIs'); 

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
      .then(() => {
        status.textContent = '✅ Message sent successfully!';
        form.reset();
      }, (error) => {
        status.textContent = '❌ Failed to send message. Please try again.';
        console.error('EmailJS error:', error);
      });
  });
});

const translations = {
  cz: {
    home: "Domů",
    aboutMe: "O mně",
    skills: "Dovednosti",
    projects: "Projekty",
    contact: "Kontakt",
    greeting: "Ahoj, jsem",
    role: "QA Testerka",
    description: "Jsem nadšená testerka z Ostravy.",
    contactMe: "Kontaktujte mě",
    downloadCV: "Stáhnout CV"
  },
  en: {
    home: "Home",
    aboutMe: "About Me",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    greeting: "Hi, I'm",
    role: "QA Engineer",
    description: "I'm a passionate QA engineer from Ostrava.",
    contactMe: "Contact Me",
    downloadCV: "Download CV"
  }
};

function switchLanguage(lang) {
  document.querySelector(".navbar-list li a[href='#home']").textContent = translations[lang].home;
  document.querySelector(".navbar-list li a[href='#about-me']").textContent = translations[lang].aboutMe;
  document.querySelector(".navbar-list li a[href='#skills']").textContent = translations[lang].skills;
  document.querySelector(".navbar-list li a[href='#projects']").textContent = translations[lang].projects;
  document.querySelector(".navbar-list li a[href='#contact']").textContent = translations[lang].contact;
  document.querySelector(".text-content h1").textContent = translations[lang].greeting;
  document.querySelector(".text-animation").textContent = translations[lang].role;
  document.querySelector(".text-content p").textContent = translations[lang].description;
  document.querySelector(".btn-group a[href='CV-Veronika Ondrušova (1).pdf']").textContent = "🚀 " + translations[lang].downloadCV;
  document.querySelector(".btn-group a[href='#contact']").textContent = "📬 " + translations[lang].contactMe;
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}
// Toggle sidebar
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('active');
}

// Toggle theme
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
}

// Language switcher
function switchLanguage(lang) {
  // Placeholder: implement actual language switching logic
  alert(`Language switched to ${lang.toUpperCase()}`);
}

// Highlight active nav link
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('nav a').forEach(el => el.classList.remove('active'));
    link.classList.add('active');
  });
});
const typewriterText = document.getElementById("typewriter-text");
const roles = ["QA Engineer", "Test Analyst", "Bug Hunter"];
let index = 0;
let charIndex = 0;

function type() {
  if (charIndex < roles[index].length) {
    typewriterText.textContent += roles[index].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  if (charIndex > 0) {
    typewriterText.textContent = roles[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    index = (index + 1) % roles.length;
    setTimeout(type, 500);
  }
}

document.addEventListener("DOMContentLoaded", type);
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
}

// Load theme on page load
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
  }
});
emailjs.init("YOUR_USER_ID");

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const btnText = document.getElementById("btn-text");
  const btnLoader = document.getElementById("btn-loader");
  const status = document.getElementById("form-status");

  btnText.classList.add("hidden");
  btnLoader.classList.remove("hidden");

  emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
    .then(() => {
      status.textContent = "✅ Message sent successfully!";
      this.reset();
    })
    .catch(() => {
      status.textContent = "❌ Something went wrong. Please try again.";
    })
    .finally(() => {
      btnText.classList.remove("hidden");
      btnLoader.classList.add("hidden");
    });
});




