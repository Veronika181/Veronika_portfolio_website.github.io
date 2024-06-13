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

