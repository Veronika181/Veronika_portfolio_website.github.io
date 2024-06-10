// Inicializace EmailJS
emailjs.init('vHLZSw0qoz8cN3mB7');

var modal = document.getElementById("contactModal");

// Získání tlačítka, které otevře modální okno
var btn = document.getElementById("contactBtn");

// Získání elementu <span>, který zavře modální okno
var span = document.getElementsByClassName("close")[0];

// Otevření modálního okna po kliknutí na tlačítko
if (btn) {
    btn.onclick = function() {
        modal.style.display = "block";
    }
}

// Zavření modálního okna po kliknutí na <span> (x)
if (span) {
    span.onclick = function() {
        modal.style.display = "none";
    }
}

// Zavření modálního okna po kliknutí mimo něj
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// EMAIL JS
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

if (contactForm) {
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_7a8en68', 'template_kszvoxe', contactForm, 'vHLZSw0qoz8cN3mB7')
            .then(() => {
                // Zobrazení zprávy o úspěšném odeslání
                contactMessage.textContent = 'Message sent successfully';

                // Odebrání zprávy po pěti sekundách
                setTimeout(() => {
                    contactMessage.textContent = '';
                }, 5000);

                // Vymazání vstupních polí
                contactForm.reset();
            })
            .catch(() => {
                // Zobrazení chybové zprávy
                contactMessage.textContent = 'Message not sent (service error)';
            });
    }

    contactForm.addEventListener('submit', sendEmail);
}

function openModal(url) {
    var modal = document.getElementById("myModal");
    var iframe = document.getElementById("modalIframe");
    iframe.src = url;
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("myModal");
    var iframe = document.getElementById("modalIframe");
    iframe.src = "";
    modal.style.display = "none";
}
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.getElementById('navbar');

    menuIcon.addEventListener('click', function() {
        navbar.classList.toggle('active');
    });

    menuIcon.addEventListener('mouseover', function() {
        navbar.classList.add('active');
    });

    navbar.addEventListener('mouseleave', function() {
        navbar.classList.remove('active');
    });
});
document.getElementById("menu-icon").addEventListener("click", function() {
    var navbar = document.querySelector(".navbar");
    navbar.classList.toggle("show");
});