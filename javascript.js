// === Mobilní menu ===
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('show');
}

// === Přepínač světlý/tmavý režim ===
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
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


