document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu-icon");
    const navbar = document.querySelector(".navbar");

    menuIcon.addEventListener("click", function () {
        navbar.classList.toggle("show");
    });
});
var typed = new Typed(".animated-text", {
    strings:["Veronika Obrtelova"],
    typeSpeed: 20,
    backSpeed: 5,
    startDelay: 500, 
    loop: true
});




