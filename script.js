/* =========================================================
   PROVA PARANÁ
   SCRIPT PRINCIPAL — VERSÃO CORRIGIDA
   ========================================================= */


/* =========================================================
   ELEMENTOS PRINCIPAIS
   ========================================================= */

const body = document.body;

const loader = document.querySelector(".loader");

const hamburger = document.querySelector(".hamburger");

const mobileMenu = document.querySelector(".mobile-menu");

const mobileOverlay = document.querySelector(".mobile-menu-overlay");

const mobileClose = document.querySelector(".mobile-menu-close");

const backToTop = document.querySelector(".back-to-top");

const scrollProgress = document.querySelector(".scroll-progress");

const header = document.querySelector(".site-header");

const navLinks = document.querySelectorAll(".desktop-nav a");

const mobileLinks = document.querySelectorAll(".mobile-menu-links a");



/* =========================================================
   LOADING SCREEN — CORRIGIDO
   NUNCA FICA PRESO
   ========================================================= */

function hideLoader() {

    if (!loader) return;

    loader.classList.add("hide");

    setTimeout(() => {

        loader.style.display = "none";

    }, 800);

}


/* Executa quando o HTML estiver pronto */

document.addEventListener("DOMContentLoaded", () => {

    setTimeout(() => {

        hideLoader();

    }, 1200);

});


/* Segurança extra */

setTimeout(() => {

    hideLoader();

}, 3000);



/* =========================================================
   MENU HAMBÚRGUER
   ========================================================= */

function openMobileMenu() {

    if (!mobileMenu) return;

    mobileMenu.classList.add("active");

    if (mobileOverlay) {

        mobileOverlay.classList.add("active");

    }

    body.style.overflow = "hidden";

}


function closeMobileMenu() {

    if (!mobileMenu) return;

    mobileMenu.classList.remove("active");

    if (mobileOverlay) {

        mobileOverlay.classList.remove("active");

    }

    body.style.overflow = "";

}


if (hamburger) {

    hamburger.addEventListener("click", () => {

        openMobileMenu();

    });

}


if (mobileClose) {

    mobileClose.addEventListener("click", () => {

        closeMobileMenu();

    });

}


if (mobileOverlay) {

    mobileOverlay.addEventListener("click", () => {

        closeMobileMenu();

    });

}


mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        closeMobileMenu();

    });

});


/* =========================================================
   TECLA ESC
   ========================================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeMobileMenu();

    }

});



/* =========================================================
   BARRA DE PROGRESSO DO SCROLL
   ========================================================= */

function updateScrollProgress() {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    if (scrollProgress) {

        scrollProgress.style.width =
            `${progress}%`;

    }

}



/* =========================================================
   BOTÃO VOLTAR AO TOPO
   ========================================================= */

function updateBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}


if (backToTop) {

    backToTop.addEventListener("click", event => {

        event.preventDefault();

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}



/* =========================================================
   HEADER DINÂMICO
   ========================================================= */

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}



/* =========================================================
   SCROLL SUAVE
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) return;


        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();


        const headerOffset = 90;


        const position =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerOffset;


        window.scrollTo({

            top: position,

            behavior: "smooth"

        });

    });

});



/* =========================================================
   MENU ATIVO
   ========================================================= */

const sections =
    document.querySelectorAll("section[id]");


function updateActiveLink() {

    const scrollPosition =
        window.scrollY + 150;


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");


        if (

            scrollPosition >= sectionTop &&
            scrollPosition <
            sectionTop + sectionHeight

        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");


                if (
                    link.getAttribute("href") ===
                    `#${sectionId}`
                ) {

                    link.classList.add("active");

                }

            });

        }

    });

}



/* =========================================================
   SCROLL PRINCIPAL
   ========================================================= */

window.addEventListener("scroll", () => {

    updateScrollProgress();

    updateBackToTop();

    updateHeader();

    updateActiveLink();

});



/* =========================================================
   ANIMAÇÕES AO APARECER NA TELA
   ========================================================= */

const animatedElements =
    document.querySelectorAll(

        `
        .objective-card,
        .subject-premium-card,
        .timeline-item,
        .tip-item,
        .result-card,
        .myth-card,
        .checklist-box,
        .about-content,
        .about-visual,
        .tips-visual,
        .tips-content
        `

    );


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "reveal"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    animatedElements.forEach(element => {

        observer.observe(element);

    });

}



/* =========================================================
   CONTADORES ANIMADOS
   ========================================================= */

const counters =
    document.querySelectorAll("[data-count]");


function animateCounter(counter) {

    const target =
        Number(counter.dataset.count);


    if (isNaN(target)) return;


    const duration = 1500;

    const startTime =
        performance.now();


    function update(currentTime) {

        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const easeOut =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const value =
            Math.floor(
                target * easeOut
            );


        counter.textContent =
            value.toLocaleString("pt-BR");


        if (progress < 1) {

            requestAnimationFrame(update);

        } else {

            counter.textContent =
                target.toLocaleString("pt-BR");

        }

    }


    requestAnimationFrame(update);

}


if ("IntersectionObserver" in window) {

    const counterObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounter(
                            entry.target
                        );

                        counterObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.5
            }

        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

}



/* =========================================================
   CHECKLIST INTERATIVO
   ========================================================= */

const checkItems =
    document.querySelectorAll(".check-item");

const checklistFill =
    document.querySelector(
        ".checklist-progress-fill"
    );

const checklistPercentage =
    document.querySelector(
        ".checklist-percentage"
    );


function updateChecklistProgress() {

    if (!checkItems.length) return;


    const checked =
        document.querySelectorAll(
            ".check-item.checked"
        ).length;


    const total =
        checkItems.length;


    const percentage =
        Math.round(
            (checked / total) * 100
        );


    if (checklistFill) {

        checklistFill.style.width =
            `${percentage}%`;

    }


    if (checklistPercentage) {

        checklistPercentage.textContent =
            `${percentage}% concluído`;

    }

}


checkItems.forEach(item => {

    item.addEventListener("click", () => {

        item.classList.toggle("checked");

        updateChecklistProgress();

    });

});


updateChecklistProgress();



/* =========================================================
   QUIZ
   ========================================================= */

const quizData = [

    {
        question:
            "Qual é uma das principais funções da Prova Paraná?",

        options: [
            "Punir estudantes com notas baixas",
            "Avaliar informações para ajudar no ensino",
            "Substituir completamente as aulas",
            "Escolher apenas os melhores alunos"
        ],

        answer: 1
    },

    {
        question:
            "Quais são algumas das áreas avaliadas na Prova Paraná?",

        options: [
            "Língua Portuguesa e Matemática",
            "Somente Educação Física",
            "Somente Artes",
            "Apenas História"
        ],

        answer: 0
    },

    {
        question:
            "Os resultados da avaliação podem ajudar principalmente em quê?",

        options: [
            "Melhorar estratégias pedagógicas",
            "Cancelar matérias",
            "Diminuir o tempo das aulas",
            "Eliminar professores"
        ],

        answer: 0
    },

    {
        question:
            "Qual é uma boa atitude antes da avaliação?",

        options: [
            "Não dormir para estudar",
            "Ficar extremamente preocupado",
            "Descansar e manter a calma",
            "Não se alimentar"
        ],

        answer: 2
    },

    {
        question:
            "Como os resultados podem ser utilizados?",

        options: [
            "Para identificar pontos que precisam melhorar",
            "Apenas para criar rankings",
            "Somente para dar punições",
            "Para substituir o ensino regular"
        ],

        answer: 0
    }

];


let currentQuestion = 0;

let score = 0;

let answered = false;


const quizQuestion =
    document.querySelector(".quiz-question");

const quizOptions =
    document.querySelector(".quiz-options");

const quizCounter =
    document.querySelector(".quiz-counter");

const quizScore =
    document.querySelector(".quiz-score");

const quizProgressBar =
    document.querySelector(".quiz-progress-bar");



/* =========================================================
   MOSTRAR QUESTÃO
   ========================================================= */

function renderQuestion() {

    if (!quizQuestion || !quizOptions) return;


    answered = false;


    const current =
        quizData[currentQuestion];


    quizQuestion.textContent =
        current.question;


    if (quizCounter) {

        quizCounter.textContent =
            `QUESTÃO ${currentQuestion + 1} DE ${quizData.length}`;

    }


    if (quizProgressBar) {

        const progress =
            ((currentQuestion + 1) /
            quizData.length) * 100;


        quizProgressBar.style.width =
            `${progress}%`;

    }


    quizOptions.innerHTML = "";


    const letters =
        ["A", "B", "C", "D"];


    current.options.forEach(
        (option, index) => {

            const button =
                document.createElement("button");


            button.type = "button";

            button.className =
                "quiz-option";


            button.innerHTML = `

                <span class="option-letter">
                    ${letters[index]}
                </span>

                <span>
                    ${option}
                </span>

            `;


            button.addEventListener(
                "click",
                () => {

                    selectAnswer(
                        index
                    );

                }
            );


            quizOptions.appendChild(button);

        }
    );

}



/* =========================================================
   VERIFICAR RESPOSTA
   ========================================================= */

function selectAnswer(selectedIndex) {

    if (answered) return;

    answered = true;


    const correctAnswer =
        quizData[currentQuestion].answer;


    const buttons =
        document.querySelectorAll(
            ".quiz-option"
        );


    buttons.forEach((button, index) => {

        button.style.pointerEvents =
            "none";


        if (index === correctAnswer) {

            button.classList.add(
                "correct"
            );

        }


        if (
            index === selectedIndex &&
            selectedIndex !== correctAnswer
        ) {

            button.classList.add(
                "wrong"
            );

        }

    });


    if (selectedIndex === correctAnswer) {

        score++;


        if (quizScore) {

            quizScore.textContent =
                `PONTOS: ${score}`;

        }

    }


    setTimeout(() => {

        currentQuestion++;


        if (
            currentQuestion <
            quizData.length
        ) {

            renderQuestion();

        } else {

            showQuizResult();

        }

    }, 1300);

}



/* =========================================================
   RESULTADO FINAL
   ========================================================= */

function showQuizResult() {

    if (!quizQuestion || !quizOptions) return;


    const percentage =
        Math.round(
            (score / quizData.length) * 100
        );


    let message = "";


    if (percentage === 100) {

        message =
            "PERFEITO! Você está muito bem preparado! 🚀";

    }

    else if (percentage >= 60) {

        message =
            "MUITO BEM! Você já sabe bastante sobre a Prova Paraná! 👏";

    }

    else {

        message =
            "Bom começo! Explore o site novamente e tente melhorar! 📚";

    }


    quizQuestion.innerHTML = `

        <span style="color:#00e5a0; font-size:42px;">
            ${percentage}%
        </span>

        <br><br>

        ${message}

    `;


    if (quizCounter) {

        quizCounter.textContent =
            "QUIZ FINALIZADO";

    }


    if (quizProgressBar) {

        quizProgressBar.style.width =
            "100%";

    }


    quizOptions.innerHTML = `

        <button
            type="button"
            class="quiz-option"
            id="restartQuiz"
        >

            <span class="option-letter">
                ↻
            </span>

            <span>
                TENTAR NOVAMENTE
            </span>

        </button>

    `;


    const restartButton =
        document.querySelector("#restartQuiz");


    if (restartButton) {

        restartButton.addEventListener(
            "click",
            restartQuiz
        );

    }

}



/* =========================================================
   REINICIAR QUIZ
   ========================================================= */

function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    answered = false;


    if (quizScore) {

        quizScore.textContent =
            "PONTOS: 0";

    }


    renderQuestion();

}


/* Iniciar quiz */

renderQuestion();



/* =========================================================
   EFEITO PARALLAX NO HERO
   ========================================================= */

const heroVisual =
    document.querySelector(".hero-visual");


if (
    heroVisual &&
    window.innerWidth > 850
) {

    window.addEventListener(
        "mousemove",
        event => {

            const x =
                (window.innerWidth / 2 -
                event.clientX) / 45;


            const y =
                (window.innerHeight / 2 -
                event.clientY) / 45;


            heroVisual.style.transform =
                `translate(${x}px, ${y}px)`;

        }
    );

}



/* =========================================================
   CARDS INTERATIVOS
   ========================================================= */

const interactiveCards =
    document.querySelectorAll(

        ".objective-card, .result-card, .subject-premium-card"

    );


if (window.innerWidth > 850) {

    interactiveCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    (y - centerY) / -25;


                const rotateY =
                    (x - centerX) / 25;


                card.style.transform =
                    `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });

}



/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

updateScrollProgress();

updateBackToTop();

updateHeader();

updateActiveLink();


console.log(
    "%cPROVA PARANÁ",
    "color:#00c2ff;font-size:28px;font-weight:bold;"
);


console.log(
    "%cSistema carregado com sucesso! 🚀",
    "color:#6c4cff;font-size:14px;"
);
