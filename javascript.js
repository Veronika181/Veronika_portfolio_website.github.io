// JavaScript kód pro zavírání sloupce (hamburger menu)
document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.getElementById('sidebar');
    const closeSidebarButton = document.getElementById('close-sidebar');

    // Kliknutí na křížek
    closeSidebarButton.addEventListener('click', function() {
        sidebar.classList.remove('show');
    });

    // Kliknutí na odkaz v navigačním menu
    document.querySelectorAll('.sidebar-list a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            sidebar.classList.remove('show');
            e.preventDefault(); // Zabraňte výchozímu chování odkazu kotvy
            var targetId = this.getAttribute('href').substring(1);
            var targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hladké posouvání pro všechny kotvové odkazy
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href').substring(1);
            var targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Odeslání formuláře kontaktu
    const contactForm = document.getElementById('contact-form');
    const contactMessage = document.getElementById('contact-message');

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_7a8en68', 'template_9cvklkh', '#contact-form', 'vHLZSw0qoz8cN3mB7')
            .then(() => {
                contactMessage.textContent = 'Message sent successfully';
                setTimeout(() => {
                    contactMessage.textContent = '';
                }, 5000);
                contactForm.reset();
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                contactMessage.textContent = 'Error sending message. Please try again later.';
            });
    };

    contactForm.addEventListener('submit', sendEmail);
});
