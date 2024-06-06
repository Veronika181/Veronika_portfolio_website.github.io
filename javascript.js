var modal = document.getElementById("contactModal");

// Získání tlačítka, které otevře modální okno
var btn = document.getElementById("contactBtn");

// Získání elementu <span>, který zavře modální okno
var span = document.getElementsByClassName("close")[0];

// Otevření modálního okna po kliknutí na tlačítko
btn.onclick = function() {
    modal.style.display = "block";
}

// Zavření modálního okna po kliknutí na <span> (x)
span.onclick = function() {
    modal.style.display = "none";
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

const sendEmail = (e) =>{
    e.preventDefault();

    //serviceID - templateID - #form - publiciKey
    emailjs.sendForm('service_7a8en68','template_kszvoxe','#contact-form','vHLZSw0qoz8cN3mB7')
        .then(() => {
            //Show sent message
            contactMessage.textContent = 'Message sent successfully';

            //Remove message after five seconds
            setTimeout(() => {
                contactMessage.textContent = '';
            }, 5000);

            // Clear input fields
            contactForm.reset();
        })
        .catch(() => {
            //Show error message
            contactMessage.textContent = 'Message not sent (service error)';
        });
}

contactForm.addEventListener('submit', sendEmail);


    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>