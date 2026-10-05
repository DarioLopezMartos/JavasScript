function generarNumeroSecreto() {
    return Math.floor(Math.random() * 100) + 1;
}


function obtenerIntentos(dificultad) {
    switch (dificultad) {
        case "1":
            return 10;

        case "2":
            return 7;

        case "3":
            return 5;

        default:
            return 0;
    }
}


function validarIntento(intent) {
    if (intent === "") {
        return false;
    }

    let numero = Number(intent);

    if (!Number.isFinite(numero)) {
        return false;
    }

    if (numero < 1 || numero > 100) {
        return false;
    }

    return true;
}


function compararIntento(intento, numeroSecreto) {
    if (intento === numeroSecreto) {
        return "acierto";
    }

    if (intento < numeroSecreto) {
        return "mayor";
    }

    return "menor";
}


function jugarRonda(dificultad, puntuacionInicial = 0) {

    let intentosMaximos = obtenerIntentos(dificultad);

    if (intentosMaximos === 0) {
        console.log("Dificultad no válida.");
        return puntuacionInicial;
    }

    let numeroSecreto = generarNumeroSecreto();
    let intentos = 0;
    let puntuacion = puntuacionInicial;
    let acertado = false;

    console.log("Comienza la ronda.");
    console.log("Tienes " + intentosMaximos + " intentos.");

    while (intentos < intentosMaximos && !acertado) {

        let entrada = prompt(
            "Adivina el número entre 1 y 100.\n" +
            "Intento " + (intentos + 1) + " de " + intentosMaximos
        );

        if (!validarIntento(entrada)) {
            alert("Introduce un número válido entre 1 y 100.");
            continue;
        }

        let intento = Number(entrada);
        intentos++;

        let resultado = compararIntento(intento, numeroSecreto);

        if (resultado === "acierto") {

            acertado = true;

            let puntosGanados = (intentosMaximos - intentos + 1) * 10;
            puntuacion = puntuacion + puntosGanados;

            console.log("¡Has acertado!");
            console.log("Has necesitado " + intentos + " intentos.");
            console.log("Puntos ganados: " + puntosGanados);

        } else {

            puntuacion = puntuacion - 1;

            if (resultado === "mayor") {
                console.log("El número secreto es mayor.");
            } else {
                console.log("El número secreto es menor.");
            }

            console.log("Has perdido 1 punto.");
        }
    }


    if (!acertado) {
        console.log("Has agotado todos los intentos.");
        console.log("El número secreto era: " + numeroSecreto);
        console.log("No se pueden perder más puntos por esta ronda.");
    }

    console.log("Puntuación acumulada: " + puntuacion);

    return puntuacion;
}


function iniciarJuego(dificultadInicial = "1") {

    let puntuacion = 0;
    let dificultad = dificultadInicial;
    let salir = false;

    while (!salir) {

        let opcion = prompt(
            "JUEGO DE ADIVINAR\n\n" +
            "1. Fácil - 10 intentos\n" +
            "2. Normal - 7 intentos\n" +
            "3. Difícil - 5 intentos\n" +
            "4. Salir\n\n" +
            "Puntuación actual: " + puntuacion +
            "\nElige una opción:"
        );

        switch (opcion) {

            case "1":
            case "2":
            case "3":
                dificultad = opcion;
                puntuacion = jugarRonda(dificultad, puntuacion);
                break;

            case "4":
                salir = true;
                console.log("Has salido del juego.");
                console.log("Puntuación final: " + puntuacion);
                break;

            case "":
                alert("No has introducido ninguna opción.");
                break;

            default:
                alert("Opción no válida. Elige entre 1 y 4.");
        }
    }
}


iniciarJuego("1");