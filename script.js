function goTo(id) {

    document
        .getElementById(id)
        .scrollIntoView({
            behavior: "smooth"
        });

}


function answer(value) {

    const result = document.getElementById("result");

    if (value === "12") {

        result.innerHTML =
            "Boa! Essa é a resposta esperada para esta placa. 👁️";

    } else {

        result.innerHTML =
            "A percepção pode variar. Este teste é apenas demonstrativo! 🎨";

    }

}
