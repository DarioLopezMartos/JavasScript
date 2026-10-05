function celsiusAFahrenheit(celsius) {
    return celsius * 9 / 5 + 32;
}

function fahrenheitACelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function kilometrosAMillas(kilometros) {
    return kilometros * 0.621371;
}

function millasAKilometros(millas) {
    return millas / 0.621371;
}

function eurosADolares(euros, cambio = 1.01) {
    return euros / cambio;
}

function dolaresAEuros(dolares, cambio = 1.01) {
    return dolares * cambio;
}


// Función de orden superior
function mostrarResultado(valor, funcion, textoEntrada, textoSalida) {
    let resultado = funcion(valor);

    console.log(
        textoEntrada + " " + valor +
        " equivalen a " +
        resultado.toFixed(2) +
        " " + textoSalida
    );
}


let opcion;

do {

    opcion = prompt(
        "MENÚ DE CONVERSIÓN\n\n" +
        "1. Celsius a Fahrenheit\n" +
        "2. Fahrenheit a Celsius\n" +
        "3. Kilómetros a millas\n" +
        "4. Millas a kilómetros\n" +
        "5. Euros a dólares\n" +
        "6. Dólares a euros\n" +
        "7. Salir\n\n" +
        "Elige una opción:"
    );

    switch (opcion) {

        case "1": {
            let valor = Number(prompt("Introduce los grados Celsius:"));

            if (Number.isFinite(valor)) {
                mostrarResultado(valor, celsiusAFahrenheit, "°C", "°F");
            } else {
                alert("Debes introducir un número válido.");
            }

            break;
        }

        case "2": {
            let valor = Number(prompt("Introduce los grados Fahrenheit:"));

            if (Number.isFinite(valor)) {
                mostrarResultado(valor, fahrenheitACelsius, "°F", "°C");
            } else {
                alert("Debes introducir un número válido.");
            }

            break;
        }

        case "3": {
            let valor = Number(prompt("Introduce los kilómetros:"));

            if (Number.isFinite(valor)) {
                mostrarResultado(valor, kilometrosAMillas, "km", "millas");
            } else {
                alert("Debes introducir un número válido.");
            }

            break;
        }

        case "4": {
            let valor = Number(prompt("Introduce las millas:"));

            if (Number.isFinite(valor)) {
                mostrarResultado(valor, millasAKilometros, "millas", "km");
            } else {
                alert("Debes introducir un número válido.");
            }

            break;
        }

        case "5": {
            let valor = Number(prompt("Introduce los euros:"));

            if (Number.isFinite(valor)) {
                mostrarResultado(valor, eurosADolares, "€", "$");
            } else {
                alert("Debes introducir un número válido.");
            }

            break;
        }

        case "6": {
            let valor = Number(prompt("Introduce los dólares:"));

            if (Number.isFinite(valor)) {
                mostrarResultado(valor, dolaresAEuros, "$", "€");
            } else {
                alert("Debes introducir un número válido.");
            }

            break;
        }

        case "7":
            alert("Programa finalizado.");
            break;

        default:
            alert("Opción no válida. Elige una opción del 1 al 7.");
    }

} while (opcion !== "7");