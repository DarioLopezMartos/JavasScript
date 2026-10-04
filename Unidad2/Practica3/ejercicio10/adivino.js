let numeroSecreto = Math.floor(Math.random() * 10) + 1;
let intento;

do {
    intento = Number(prompt("Adivina el número entre 1 y 10:"));

    if (intento < numeroSecreto) {
        alert("El número es mayor.");
    } else if (intento > numeroSecreto) {
        alert("El número es menor.");
    }
} while (intento !== numeroSecreto);

alert("¡Has acertado!");