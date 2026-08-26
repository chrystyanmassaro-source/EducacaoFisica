// FLASHCARDS

const flashcards = document.querySelectorAll(".flashcard");

flashcards.forEach((card) => {

    card.addEventListener("click", () => {

        card.classList.toggle("active");

    });

});


// MENU MOBILE

const menuBtn = document.getElementById("menuBtn");

const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => {

    if (nav.style.display === "flex") {

        nav.style.display = "none";

    } else {

        nav.style.display = "flex";

        nav.style.position = "absolute";
        nav.style.top = "80px";
        nav.style.left = "0";
        nav.style.width = "100%";

        nav.style.flexDirection = "column";

        nav.style.background = "#0b0d12";

        nav.style.padding = "30px";

    }

});


// ANIMAÇÃO AO APARECER NA TELA

const elementos = document.querySelectorAll(
    ".thinker-card, .comparison-card, .flashcard, .musical-text, .gallery-item"
);

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        }

    });

}, {
    threshold: 0.15
});


elementos.forEach((elemento) => {

    elemento.style.opacity = "0";

    elemento.style.transform = "translateY(40px)";

    elemento.style.transition = "0.7s ease";

    observer.observe(elemento);

});
