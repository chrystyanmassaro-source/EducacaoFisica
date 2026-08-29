/* =========================================================
PROVA PARANÁ - CENTRAL DO ESTUDANTE
JAVASCRIPT PRINCIPAL
script.js
========================================================= */

/* =========================================================
LOADER
========================================================= */

window.addEventListener("load", function () {

```
const loader = document.getElementById("loader");

setTimeout(function () {

    loader.classList.add("hide");

}, 2200);
```

});

/* =========================================================
HEADER AO ROLAR
========================================================= */

const header = document.getElementById("header");

window.addEventListener("scroll", function () {

```
if (window.scrollY > 50) {

    header.classList.add("scrolled");

} else {

    header.classList.remove("scrolled");

}
```

});

/* =========================================================
BARRA DE PROGRESSO DA PÁGINA
========================================================= */

const scrollProgress = document.getElementById("scrollProgress");

window.addEventListener("scroll", function () {

```
const scrollTop = window.scrollY;

const documentHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

const scrollPercent =
    (scrollTop / documentHeight) * 100;

scrollProgress.style.width =
    scrollPercent + "%";
```

});

/* =========================================================
MENU HAMBÚRGUER
========================================================= */

const hamburger =
document.getElementById("hamburger");

const mobileMenu =
document.getElementById("mobileMenu");

const mobileOverlay =
document.getElementById("mobileOverlay");

const closeMenu =
document.getElementById("closeMenu");

function openMobileMenu() {

```
mobileMenu.classList.add("active");

mobileOverlay.classList.add("active");

document.body.style.overflow = "hidden";
```

}

function closeMobileMenu() {

```
mobileMenu.classList.remove("active");

mobileOverlay.classList.remove("active");

document.body.style.overflow = "";
```

}

hamburger.addEventListener("click", function () {

```
openMobileMenu();
```

});

closeMenu.addEventListener("click", function () {

```
closeMobileMenu();
```

});

mobileOverlay.addEventListener("click", function () {

```
closeMobileMenu();
```

});

/* =========================================================
FECHAR MENU AO CLICAR EM UM LINK
========================================================= */

const mobileLinks =
document.querySelectorAll(".mobile-link");

mobileLinks.forEach(function (link) {

```
link.addEventListener("click", function () {

    closeMobileMenu();

});
```

});

/* =========================================================
DROPDOWN MOBILE / ACESSIBILIDADE
========================================================= */

const dropdownButton =
document.querySelector(".dropdown-button");

if (dropdownButton) {

```
dropdownButton.addEventListener("click", function () {

    const dropdown =
        this.parentElement;

    dropdown.classList.toggle("mobile-dropdown-active");

});
```

}

/* =========================================================
BOTÃO VOLTAR AO TOPO
========================================================= */

const backToTop =
document.getElementById("backToTop");

window.addEventListener("scroll", function () {

```
if (window.scrollY > 500) {

    backToTop.classList.add("show");

} else {

    backToTop.classList.remove("show");

}
```

});

backToTop.addEventListener("click", function () {

```
window.scrollTo({

    top: 0,

    behavior: "smooth"

});
```

});

/* =========================================================
ANIMAÇÕES AO APARECER NA TELA
========================================================= */

const sectionsToReveal =
document.querySelectorAll(
".section, .final-section"
);

sectionsToReveal.forEach(function (section) {

```
section.classList.add("reveal");
```

});

const revealObserver =
new IntersectionObserver(

```
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    },

    {

        threshold: 0.08

    }

);
```

sectionsToReveal.forEach(function (section) {

```
revealObserver.observe(section);
```

});

/* =========================================================
MODAL DAS DISCIPLINAS
========================================================= */

const subjectModal =
document.getElementById("subjectModal");

const modalOverlay =
document.getElementById("modalOverlay");

const modalClose =
document.getElementById("modalClose");

const modalContent =
document.getElementById("modalContent");

const subjectButtons =
document.querySelectorAll(".subject-button");

const subjectsInformation = {

```
portugues: {

    icon:
        '<i class="fa-solid fa-book-open"></i>',

    color:
        "linear-gradient(135deg, #6c5ce7, #4535bd)",

    title:
        "Língua Portuguesa",

    text:
        "Na Prova Paraná, a Língua Portuguesa está relacionada principalmente à capacidade de compreender e interpretar diferentes textos.",

    items: [

        "Interpretar informações presentes em textos.",

        "Compreender diferentes gêneros textuais.",

        "Identificar ideias principais.",

        "Reconhecer informações explícitas e implícitas.",

        "Desenvolver a compreensão leitora."

    ]

},


matematica: {

    icon:
        '<i class="fa-solid fa-calculator"></i>',

    color:
        "linear-gradient(135deg, #11998e, #057a72)",

    title:
        "Matemática",

    text:
        "A Matemática avalia conhecimentos importantes para resolver situações e problemas utilizando raciocínio lógico.",

    items: [

        "Resolver problemas matemáticos.",

        "Utilizar raciocínio lógico.",

        "Interpretar informações e dados.",

        "Realizar cálculos.",

        "Relacionar a Matemática com situações do cotidiano."

    ]

}
```

};

subjectButtons.forEach(function (button) {

```
button.addEventListener("click", function () {

    const subject =
        button.dataset.modal;

    const information =
        subjectsInformation[subject];


    let listItems = "";


    information.items.forEach(function (item) {

        listItems +=

            "<li>" +

            item +

            "</li>";

    });


    modalContent.innerHTML =

        '<div class="modal-content-icon" style="background: ' +

        information.color +

        ';">' +

        information.icon +

        '</div>' +


        "<h2>" +

        information.title +

        "</h2>" +


        "<p>" +

        information.text +

        "</p>" +


        "<ul>" +

        listItems +

        "</ul>";


    subjectModal.classList.add("active");

    document.body.style.overflow = "hidden";

});
```

});

/* =========================================================
FECHAR MODAL
========================================================= */

function closeModal() {

```
subjectModal.classList.remove("active");

document.body.style.overflow = "";
```

}

modalClose.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", closeModal);

/* =========================================================
FECHAR MODAL COM ESC
========================================================= */

document.addEventListener("keydown", function (event) {

```
if (event.key === "Escape") {

    closeModal();

    closeMobileMenu();

}
```

});

/* =========================================================
QUIZ - DADOS
========================================================= */

const quizQuestions = [

```
{

    question:

        "Qual é o principal objetivo da Prova Paraná?",


    options: [

        "Escolher apenas os melhores estudantes.",

        "Acompanhar a aprendizagem e identificar pontos que podem melhorar.",

        "Substituir completamente as provas da escola.",

        "Dar uma nota final para todos os estudantes."

    ],


    correct: 1

},


{

    question:

        "Quais são as principais disciplinas citadas na avaliação?",


    options: [

        "História e Geografia.",

        "Química e Física.",

        "Língua Portuguesa e Matemática.",

        "Artes e Educação Física."

    ],


    correct: 2

},


{

    question:

        "Como os resultados da Prova Paraná podem ajudar as escolas?",


    options: [

        "Ajudando professores e gestores a identificar conteúdos que precisam de mais atenção.",

        "Eliminando estudantes com notas menores.",

        "Substituindo todos os professores.",

        "Servindo apenas para criar rankings."

    ],


    correct: 0

}
```

];

/* =========================================================
QUIZ - VARIÁVEIS
========================================================= */

let currentQuestion = 0;

let score = 0;

let answered = false;

const quizContent =
document.getElementById("quizContent");

const questionNumber =
document.getElementById("questionNumber");

const quizProgress =
document.getElementById("quizProgress");

const quizScore =
document.getElementById("quizScore");

/* =========================================================
MOSTRAR PERGUNTA
========================================================= */

function showQuestion() {

```
answered = false;


const question =
    quizQuestions[currentQuestion];


questionNumber.textContent =

    "Pergunta " +

    (currentQuestion + 1) +

    " de " +

    quizQuestions.length;


const progressValue =

    ((currentQuestion + 1) /
    quizQuestions.length) * 100;


quizProgress.style.width =
    progressValue + "%";


const letters =

    ["A", "B", "C", "D"];


let optionsHTML = "";


question.options.forEach(

    function (option, index) {


        optionsHTML +=

            '<button class="quiz-option" data-index="' +

            index +

            '">' +


            '<span class="option-letter">' +

            letters[index] +

            "</span>" +


            "<span>" +

            option +

            "</span>" +


            "</button>";

    }

);


quizContent.innerHTML =

    '<div class="quiz-question">' +


    "<h3>" +

    question.question +

    "</h3>" +


    '<div class="quiz-options">' +

    optionsHTML +

    "</div>" +


    '<button class="quiz-next" id="quizNext" style="display: none;">' +

    "Próxima pergunta " +

    '<i class="fa-solid fa-arrow-right"></i>' +

    "</button>" +


    "</div>";


const quizOptions =
    document.querySelectorAll(".quiz-option");


quizOptions.forEach(function (option) {

    option.addEventListener("click", function () {

        checkAnswer(option);

    });

});
```

}

/* =========================================================
VERIFICAR RESPOSTA
========================================================= */

function checkAnswer(selectedOption) {

```
if (answered) {

    return;

}


answered = true;


const selectedIndex =

    Number(
        selectedOption.dataset.index
    );


const correctIndex =

    quizQuestions[currentQuestion].correct;


const allOptions =
    document.querySelectorAll(".quiz-option");


allOptions.forEach(function (option) {

    option.disabled = true;


    const optionIndex =

        Number(
            option.dataset.index
        );


    if (optionIndex === correctIndex) {

        option.classList.add("correct");

    }

});


if (selectedIndex === correctIndex) {

    score += 10;

    quizScore.textContent = score;

} else {

    selectedOption.classList.add("wrong");

}


const nextButton =
    document.getElementById("quizNext");


nextButton.style.display =
    "inline-flex";


if (
    currentQuestion ===
    quizQuestions.length - 1
) {

    nextButton.innerHTML =

        'Ver resultado ' +

        '<i class="fa-solid fa-trophy"></i>';

}


nextButton.addEventListener("click", nextQuestion);
```

}

/* =========================================================
PRÓXIMA PERGUNTA
========================================================= */

function nextQuestion() {

```
currentQuestion++;


if (

    currentQuestion <

    quizQuestions.length

) {

    showQuestion();

} else {

    showQuizResult();

}
```

}

/* =========================================================
RESULTADO FINAL
========================================================= */

function showQuizResult() {

```
questionNumber.textContent =
    "Quiz finalizado";


quizProgress.style.width =
    "100%";


let message = "";

let icon = "";


if (score === 30) {

    message =
        "Perfeito! Você entendeu muito bem os principais pontos sobre a Prova Paraná.";

    icon =
        '<i class="fa-solid fa-trophy"></i>';

}


else if (score >= 20) {

    message =
        "Muito bem! Você acertou a maior parte das perguntas.";

    icon =
        '<i class="fa-solid fa-medal"></i>';

}


else {

    message =
        "Você já aprendeu bastante! Que tal revisar o conteúdo e tentar novamente?";

    icon =
        '<i class="fa-solid fa-book-open"></i>';

}


quizContent.innerHTML =

    '<div class="quiz-result">' +


    icon +


    "<h2>" +

    "Você fez " +

    score +

    " pontos!" +

    "</h2>" +


    "<p>" +

    message +

    "</p>" +


    '<button class="quiz-next" id="restartQuiz">' +

    '<i class="fa-solid fa-rotate-right"></i> ' +

    "Tentar novamente" +

    "</button>" +


    "</div>";


const restartQuiz =
    document.getElementById("restartQuiz");


restartQuiz.addEventListener(
    "click",
    restartQuizGame
);
```

}

/* =========================================================
REINICIAR QUIZ
========================================================= */

function restartQuizGame() {

```
currentQuestion = 0;

score = 0;

quizScore.textContent = 0;


showQuestion();
```

}

/* =========================================================
INICIAR QUIZ
========================================================= */

showQuestion();

/* =========================================================
ANO AUTOMÁTICO NO FOOTER
========================================================= */

const currentYear =
document.getElementById("currentYear");

currentYear.textContent =
new Date().getFullYear();

/* =========================================================
LINKS ATIVOS DO MENU
========================================================= */

const sections =
document.querySelectorAll("main section");

const navLinks =
document.querySelectorAll(".nav-link");

window.addEventListener("scroll", function () {

```
let currentSection = "";


sections.forEach(function (section) {


    const sectionTop =
        section.offsetTop - 150;


    const sectionHeight =
        section.offsetHeight;


    if (

        window.scrollY >= sectionTop &&

        window.scrollY <

        sectionTop + sectionHeight

    ) {

        currentSection =
            section.getAttribute("id");

    }

});


navLinks.forEach(function (link) {


    link.classList.remove("active");


    const linkTarget =
        link.getAttribute("href");


    if (

        linkTarget ===
        "#" + currentSection

    ) {

        link.classList.add("active");

    }

});
```

});

/* =========================================================
EFEITO NOS CARDS COM O MOUSE
========================================================= */

const objectiveCards =
document.querySelectorAll(".objective-card");

objectiveCards.forEach(function (card) {

```
card.addEventListener("mousemove", function (event) {


    const rect =
        card.getBoundingClientRect();


    const x =
        event.clientX - rect.left;


    const y =
        event.clientY - rect.top;


    const centerX =
        rect.width / 2;


    const centerY =
        rect.height / 2;


    const rotateX =
        (y - centerY) / 25;


    const rotateY =
        (centerX - x) / 25;


    card.style.transform =

        "perspective(800px) rotateX(" +

        -rotateX +

        "deg) rotateY(" +

        rotateY +

        "deg) translateY(-8px)";

});


card.addEventListener("mouseleave", function () {


    card.style.transform = "";

});
```

});

/* =========================================================
CONSOLE
========================================================= */

console.log(
"%cPROVA PARANÁ - CENTRAL DO ESTUDANTE",
"color: #0b3b8c; font-size: 20px; font-weight: bold;"
);

console.log(
"%cSite desenvolvido para projeto escolar.",
"color: #16a085; font-size: 13px;"
);
