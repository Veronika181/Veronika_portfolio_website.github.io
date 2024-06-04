
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



