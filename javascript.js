document.addEventListener("DOMContentLoaded", function() {
    // Toggle sidebar functionality
    var sidebar = document.querySelector('.sidebar');
    var menuButton = document.querySelector('.menu-button');
    var closeSidebarButton = document.querySelector('.close-sidebar');

    menuButton.addEventListener('click', function() {
        sidebar.classList.toggle('show');
    });

    closeSidebarButton.addEventListener('click', function() {
        sidebar.classList.remove('show');
    });

    document.querySelectorAll('.sidebar-list a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            sidebar.classList.remove('show');
            e.preventDefault(); // Prevent default behavior of anchor link
            var targetId = this.getAttribute('href').substring(1);
            var targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize Typed.js if it's available
    if (typeof Typed !== 'undefined') {
        var typed = new Typed(".animated-text", {
            strings: ["Veronika Obrtelova"],
            typeSpeed: 20,
            backSpeed: 5,
            startDelay: 500,
            loop: true
        });
    }

    // Smooth scrolling for all anchor links
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
});



var typedInstance = null;

document.addEventListener("DOMContentLoaded", function() {
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
