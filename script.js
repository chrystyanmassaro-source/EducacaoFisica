/* =========================================================
   PROVA PARANÁ — SCRIPT.JS
   ========================================================= */


/* =========================================================
   ELEMENTOS
   ========================================================= */

const body = document.body;

const header =
    document.getElementById("header");

const hamburger =
    document.getElementById("hamburger");

const mobileMenu =
    document.getElementById("mobileMenu");

const mobileOverlay =
    document.getElementById("mobileOverlay");

const closeMenu =
    document.getElementById("closeMenu");

const scrollProgress =
    document.getElementById("scrollProgress");

const backToTop =
    document.getElementById("backToTop");



/* =========================================================
   MENU MOBILE
   ========================================================= */

function openMobileMenu() {

    if (!mobileMenu) return;

    mobileMenu.classList.add("active");

    mobileOverlay?.classList.add("active");

    body.classList.add("no-scroll");

}


function closeMobileMenu() {

    if (!mobileMenu) return;

    mobileMenu.classList.remove("active");

    mobileOverlay?.classList.remove("active");

    body.classList.remove("no-scroll");

}


hamburger?.addEventListener(
    "click",
    openMobileMenu
);


closeMenu?.addEventListener(
    "click",
    closeMobileMenu
);


mobileOverlay?.addEventListener(
    "click",
    closeMobileMenu
);


document
    .querySelectorAll(".mobile-nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    }
);



/* =========================================================
   HEADER
   ========================================================= */

function updateHeader() {

    if (!header) return;


    if (window.scrollY > 60) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}



/* =========================================================
   PROGRESSO DA PÁGINA
   ========================================================= */

function updateScrollProgress() {

    if (!scrollProgress) return;


    const scrollTop =
        window.scrollY;


    const pageHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;


    let progress = 0;


    if (pageHeight > 0) {

        progress =
            (scrollTop / pageHeight) *
            100;

    }


    scrollProgress.style.width =
        `${progress}%`;

}



/* =========================================================
   BOTÃO VOLTAR AO TOPO
   ========================================================= */

function updateBackToTop() {

    if (!backToTop) return;


    if (window.scrollY > 600) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}


backToTop?.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);



/* =========================================================
   LINKS INTERNOS
   ========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                const offset = 85;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    offset;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });



/* =========================================================
   REVEAL AO ROLAR
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        element => {

            element.classList.add(
                "visible"
            );

        }
    );

}



/* =========================================================
   CONTADORES
   ========================================================= */

const counters =
    document.querySelectorAll(
        ".counter[data-count]"
    );


function animateCounter(
    element
) {

    const target =
        Number(
            element.dataset.count
        );


    if (isNaN(target)) {

        return;

    }


    const duration = 1400;

    const start =
        performance.now();


    function update(time) {

        const progress =
            Math.min(
                (time - start) /
                duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const value =
            Math.floor(
                target * eased
            );


        element.textContent =
            value.toLocaleString(
                "pt-BR"
            );


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        }

    }


    requestAnimationFrame(
        update
    );

}


if ("IntersectionObserver" in window) {

    const counterObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateCounter(
                                entry.target
                            );


                            counterObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: .7
            }

        );


    counters.forEach(
        counter => {

            counterObserver.observe(
                counter
            );

        }
    );

}



/* =========================================================
   CHECKLIST
   ========================================================= */

const checkItems =
    document.querySelectorAll(
        ".check-item"
    );


const checklistProgress =
    document.getElementById(
        "checklistProgress"
    );


const checklistPercentage =
    document.getElementById(
        "checklistPercentage"
    );


const checklistMessage =
    document.getElementById(
        "checklistMessage"
    );


function updateChecklist() {

    if (!checkItems.length) {

        return;

    }


    const checked =
        document.querySelectorAll(
            ".check-item.checked"
        ).length;


    const total =
        checkItems.length;


    const percentage =
        Math.round(
            (checked / total) *
            100
        );


    if (checklistProgress) {

        checklistProgress.style.width =
            `${percentage}%`;

    }


    if (checklistPercentage) {

        checklistPercentage.textContent =
            `${percentage}%`;

    }


    if (checklistMessage) {

        if (percentage === 0) {

            checklistMessage.textContent =
                "Comece marcando os itens acima.";

        }

        else if (percentage < 50) {

            checklistMessage.textContent =
                "Boa! Você já começou sua preparação.";

        }

        else if (percentage < 100) {

            checklistMessage.textContent =
                "Muito bem! Falta pouco para completar.";

        }

        else {

            checklistMessage.textContent =
                "Tudo pronto! Você fez seu checklist completo. 🚀";

        }

    }

}


checkItems.forEach(
    item => {

        const input =
            item.querySelector(
                "input"
            );


        input?.addEventListener(
            "change",
            () => {

                item.classList.toggle(
                    "checked",
                    input.checked
                );


                updateChecklist();

            }
        );

    }
);


updateChecklist();



/* =========================================================
   DICAS
   ========================================================= */

const tipData = {

    sono: {

        icon:
            "fa-moon",

        color:
            "linear-gradient(135deg,#2861d0,#123a8c)",

        title:
            "Descanse bem",

        text:
            "Uma boa preparação também envolve descanso. Dormir bem ajuda você a chegar mais descansado e concentrado no momento da avaliação.",

        items: [

            "Evite deixar toda a preparação para a última hora.",

            "Procure manter uma rotina de sono adequada.",

            "Chegue para a avaliação sem virar a noite estudando."

        ]

    },


    calma: {

        icon:
            "fa-heart",

        color:
            "linear-gradient(135deg,#ff647c,#ff8b6a)",

        title:
            "Mantenha a calma",

        text:
            "A ansiedade pode atrapalhar a atenção. Respirar fundo e fazer cada questão no seu ritmo pode ajudar.",

        items: [

            "Leia as instruções com tranquilidade.",

            "Não se preocupe com a velocidade dos outros.",

            "Concentre-se na questão que está resolvendo."

        ]

    },


    leitura: {

        icon:
            "fa-book-reader",

        color:
            "linear-gradient(135deg,#6c4cff,#8a66ff)",

        title:
            "Leia com atenção",

        text:
            "Muitas questões exigem interpretação. Antes de responder, procure compreender exatamente o que está sendo perguntado.",

        items: [

            "Leia todo o enunciado.",

            "Procure palavras importantes na questão.",

            "Evite responder sem compreender o problema."

        ]

    },


    revisao: {

        icon:
            "fa-check-double",

        color:
            "linear-gradient(135deg,#00b987,#00d9a0)",

        title:
            "Revise",

        text:
            "Caso tenha tempo disponível, retorne às respostas para verificar se marcou aquilo que realmente queria.",

        items: [

            "Confira as questões que geraram dúvida.",

            "Verifique se não deixou alguma questão sem resposta.",

            "Não altere uma resposta sem motivo."

        ]

    }

};


const tipModal =
    document.getElementById(
        "tipModal"
    );


const tipModalContent =
    document.getElementById(
        "tipModalContent"
    );


const tipModalClose =
    document.getElementById(
        "tipModalClose"
    );


const tipModalOverlay =
    document.getElementById(
        "tipModalOverlay"
    );


document
    .querySelectorAll(".tip-card")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const key =
                    button.dataset.tip;


                const data =
                    tipData[key];


                if (!data || !tipModal) {

                    return;

                }


                const items =
                    data.items
                        .map(
                            item => `
                                <li>
                                    <i class="fa-solid fa-check"></i>
                                    ${item}
                                </li>
                            `
                        )
                        .join("");


                tipModalContent.innerHTML = `

                    <div
                        class="modal-content-icon"
                        style="background:${data.color}"
                    >
                        <i class="fa-solid ${data.icon}"></i>
                    </div>

                    <h3>
                        ${data.title}
                    </h3>

                    <p>
                        ${data.text}
                    </p>

                    <ul>
                        ${items}
                    </ul>

                `;


                tipModal.classList.add(
                    "active"
                );


                body.classList.add(
                    "no-scroll"
                );

            }
        );

    });


function closeTipModal() {

    tipModal?.classList.remove(
        "active"
    );

    body.classList.remove(
        "no-scroll"
    );

}


tipModalClose?.addEventListener(
    "click",
    closeTipModal
);


tipModalOverlay?.addEventListener(
    "click",
    closeTipModal
);



/* =========================================================
   MODAL DAS DISCIPLINAS
   ========================================================= */

const subjectData = {

    portugues: {

        icon:
            "fa-book-open",

        color:
            "linear-gradient(135deg,#6c4cff,#4230b8)",

        title:
            "Língua Portuguesa",

        text:
            "A área trabalha habilidades relacionadas à leitura, compreensão, interpretação e análise de diferentes textos.",

        items: [

            "Interpretação de textos",

            "Compreensão leitora",

            "Identificação de informações",

            "Análise de diferentes gêneros",

            "Uso da linguagem"

        ]

    },


    matematica: {

        icon:
            "fa-calculator",

        color:
            "linear-gradient(135deg,#00b99a,#007f70)",

        title:
            "Matemática",

        text:
            "A Matemática envolve conhecimentos usados para interpretar informações, resolver problemas e utilizar o raciocínio lógico.",

        items: [

            "Raciocínio lógico",

            "Resolução de problemas",

            "Cálculos",

            "Interpretação de dados",

            "Aplicação no cotidiano"

        ]

    }

};


const subjectModal =
    document.getElementById(
        "subjectModal"
    );


const modalContent =
    document.getElementById(
        "modalContent"
    );


const modalClose =
    document.getElementById(
        "modalClose"
    );


const modalOverlay =
    document.getElementById(
        "modalOverlay"
    );


document
    .querySelectorAll(
        ".discipline-button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const key =
                    button.dataset.subject;


                const data =
                    subjectData[key];


                if (!data || !subjectModal) {

                    return;

                }


                const items =
                    data.items
                        .map(
                            item => `
                                <li>
                                    <i class="fa-solid fa-check"></i>
                                    ${item}
                                </li>
                            `
                        )
                        .join("");


                modalContent.innerHTML = `

                    <div
                        class="modal-content-icon"
                        style="background:${data.color}"
                    >

                        <i class="fa-solid ${data.icon}"></i>

                    </div>


                    <h3>
                        ${data.title}
                    </h3>


                    <p>
                        ${data.text}
                    </p>


                    <ul>
                        ${items}
                    </ul>

                `;


                subjectModal.classList.add(
                    "active"
                );


                body.classList.add(
                    "no-scroll"
                );

            }
        );

    });


function closeSubjectModal() {

    subjectModal?.classList.remove(
        "active"
    );

    body.classList.remove(
        "no-scroll"
    );

}


modalClose?.addEventListener(
    "click",
    closeSubjectModal
);


modalOverlay?.addEventListener(
    "click",
    closeSubjectModal
);



/* =========================================================
   MITOS E VERDADES
   ========================================================= */

document
    .querySelectorAll(".myth-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                card.classList.toggle(
                    "flipped"
                );

            }
        );

    });



/* =========================================================
   FAQ
   ========================================================= */

const faqItems =
    document.querySelectorAll(
        ".faq-item"
    );


faqItems.forEach(item => {

    const question =
        item.querySelector(
            ".faq-question"
        );


    question?.addEventListener(
        "click",
        () => {

            const wasActive =
                item.classList.contains(
                    "active"
                );


            faqItems.forEach(
                current => {

                    current.classList.remove(
                        "active"
                    );

                }
            );


            if (!wasActive) {

                item.classList.add(
                    "active"
                );

            }

        }
    );

});



/* =========================================================
   QUIZ
   ========================================================= */

const quizQuestions = [

    {

        question:
            "Qual é uma das principais funções da Prova Paraná?",

        options: [

            "Escolher somente os melhores estudantes.",

            "Acompanhar informações sobre a aprendizagem.",

            "Substituir todas as aulas.",

            "Punir estudantes com notas baixas."

        ],

        answer: 1

    },


    {

        question:
            "Quais disciplinas são destacadas neste projeto?",

        options: [

            "História e Geografia.",

            "Educação Física e Artes.",

            "Língua Portuguesa e Matemática.",

            "Química e Física."

        ],

        answer: 2

    },


    {

        question:
            "Por que os resultados podem ser importantes para professores?",

        options: [

            "Para ajudar no planejamento pedagógico.",

            "Para cancelar conteúdos.",

            "Para substituir as aulas.",

            "Para eliminar estudantes."

        ],

        answer: 0

    },


    {

        question:
            "Qual atitude pode ajudar antes da avaliação?",

        options: [

            "Não dormir.",

            "Deixar tudo para a última hora.",

            "Descansar e manter a calma.",

            "Não ler as questões."

        ],

        answer: 2

    },


    {

        question:
            "O que o estudante pode fazer durante a avaliação?",

        options: [

            "Responder sem ler.",

            "Ler as questões com atenção.",

            "Ignorar as instruções.",

            "Terminar o mais rápido possível sem revisar."

        ],

        answer: 1

    }

];


let currentQuestion = 0;

let score = 0;

let quizAnswered = false;


const quizQuestionElement =
    document.getElementById(
        "quizQuestion"
    );


const quizOptionsElement =
    document.getElementById(
        "quizOptions"
    );


const quizFeedback =
    document.getElementById(
        "quizFeedback"
    );


const quizNext =
    document.getElementById(
        "quizNext"
    );


const quizScore =
    document.getElementById(
        "quizScore"
    );


const quizProgress =
    document.getElementById(
        "quizProgress"
    );


const quizQuestionNumber =
    document.getElementById(
        "quizQuestionNumber"
    );


function renderQuiz() {

    if (
        !quizQuestionElement ||
        !quizOptionsElement
    ) {

        return;

    }


    const question =
        quizQuestions[currentQuestion];


    quizAnswered = false;


    if (quizQuestionNumber) {

        quizQuestionNumber.textContent =
            `QUESTÃO ${String(currentQuestion + 1).padStart(2,"0")} DE ${String(quizQuestions.length).padStart(2,"0")}`;

    }


    if (quizProgress) {

        const progress =
            (
                (currentQuestion + 1) /
                quizQuestions.length
            ) *
            100;


        quizProgress.style.width =
            `${progress}%`;

    }


    quizQuestionElement.textContent =
        question.question;


    quizOptionsElement.innerHTML = "";


    quizFeedback.textContent =
        "";


    quizNext.hidden =
        true;


    const letters =
        ["A","B","C","D"];


    question.options.forEach(
        (option,index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


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

                    answerQuiz(
                        index,
                        button
                    );

                }
            );


            quizOptionsElement.appendChild(
                button
            );

        }
    );

}


function answerQuiz(
    selectedIndex,
    selectedButton
) {

    if (quizAnswered) {

        return;

    }


    quizAnswered = true;


    const correct =
        quizQuestions[currentQuestion]
            .answer;


    const options =
        quizOptionsElement.querySelectorAll(
            ".quiz-option"
        );


    options.forEach(
        (option,index) => {

            option.disabled =
                true;


            if (
                index === correct
            ) {

                option.classList.add(
                    "correct"
                );

            }

        }
    );


    if (
        selectedIndex === correct
    ) {

        score++;


        selectedButton.classList.add(
            "correct"
        );


        quizFeedback.textContent =
            "Muito bem! Você acertou.";

    } else {

        selectedButton.classList.add(
            "wrong"
        );


        quizFeedback.textContent =
            "Quase! A resposta correta foi destacada.";

    }


    if (quizScore) {

        quizScore.textContent =
            score;

    }


    quizNext.hidden =
        false;


    if (
        currentQuestion ===
        quizQuestions.length - 1
    ) {

        quizNext.innerHTML = `

            Ver resultado

            <i class="fa-solid fa-trophy"></i>

        `;

    } else {

        quizNext.innerHTML = `

            Próxima pergunta

            <i class="fa-solid fa-arrow-right"></i>

        `;

    }

}


quizNext?.addEventListener(
    "click",
    () => {

        if (
            currentQuestion <
            quizQuestions.length - 1
        ) {

            currentQuestion++;

            renderQuiz();

        } else {

            showQuizResult();

        }

    }
);


function showQuizResult() {

    const percentage =
        Math.round(
            (score /
            quizQuestions.length) *
            100
        );


    let message = "";

    let icon =
        "fa-graduation-cap";


    if (percentage === 100) {

        message =
            "Perfeito! Você mandou muito bem.";

        icon =
            "fa-trophy";

    }

    else if (percentage >= 60) {

        message =
            "Muito bem! Você já entendeu bastante.";

        icon =
            "fa-medal";

    }

    else {

        message =
            "Bom começo! Explore o conteúdo e tente novamente.";

        icon =
            "fa-book-open";

    }


    quizQuestionElement.innerHTML = `

        <div class="quiz-result">

            <div class="quiz-result-icon">

                <i class="fa-solid ${icon}"></i>

            </div>


            <h3>
                Você fez ${score} de ${quizQuestions.length} pontos.
            </h3>


            <p>
                ${message}
            </p>

        </div>

    `;


    quizOptionsElement.innerHTML = `

        <button
            type="button"
            class="quiz-option"
            id="restartQuiz"
        >

            <span class="option-letter">
                ↻
            </span>

            <span>
                Tentar novamente
            </span>

        </button>

    `;


    quizFeedback.textContent =
        `${percentage}% de aproveitamento.`;

    quizNext.hidden =
        true;


    if (quizQuestionNumber) {

        quizQuestionNumber.textContent =
            "QUIZ FINALIZADO";

    }


    if (quizProgress) {

        quizProgress.style.width =
            "100%";

    }


    document
        .getElementById("restartQuiz")
        ?.addEventListener(
            "click",
            restartQuiz
        );

}


function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    quizAnswered = false;


    if (quizScore) {

        quizScore.textContent =
            "0";

    }


    renderQuiz();

}


renderQuiz();



/* =========================================================
   FECHAR MODAL COM ESC
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeSubjectModal();

            closeTipModal();

        }

    }
);



/* =========================================================
   EVENTO SCROLL
   ========================================================= */

window.addEventListener(
    "scroll",
    () => {

        updateHeader();

        updateScrollProgress();

        updateBackToTop();

    },
    {
        passive: true
    }
);



/* =========================================================
   EFEITO 3D DOS CARDS
   ========================================================= */

const tiltCards =
    document.querySelectorAll(
        ".objective-card, .result-card"
    );


if (window.innerWidth > 900) {

    tiltCards.forEach(card => {

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


                const rotateX =
                    (y - rect.height / 2) /
                    -28;


                const rotateY =
                    (x - rect.width / 2) /
                    28;


                card.style.transform =
                    `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}



/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

updateHeader();

updateScrollProgress();

updateBackToTop();


const currentYear =
    document.getElementById(
        "currentYear"
    );


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


console.log(
    "%cPROVA PARANÁ",
    "color:#00c2ff;font-size:28px;font-weight:900;"
);


console.log(
    "%cCentral do Estudante carregada.",
    "color:#6c4cff;font-size:14px;font-weight:bold;"
);
