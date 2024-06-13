document.addEventListener("DOMContentLoaded", function() {
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
        link.addEventListener('click', function() {
            sidebar.classList.remove('show');
        });
    });
});


var typed = new Typed(".animated-text", {
    strings:["Veronika Obrtelova"],
    typeSpeed: 20,
    backSpeed: 5,
    startDelay: 500, 
    loop: true
});


const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    const { firstname, lastname, subject } = JSON.parse(event.body);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // nahraďte vlastní emailovou adresou
            pass: 'your-email-password'   // nahraďte vlastním heslem
        }
    });

    let mailOptions = {
        from: 'your-email@gmail.com',
        to: 'recipient-email@example.com', // nahraďte cílovou emailovou adresou
        subject: `New contact from ${firstname} ${lastname}`,
        text: subject
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent: ' + info.response })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.toString() })
        };
    }
};


