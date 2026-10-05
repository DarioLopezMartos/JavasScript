function notaValida(entrada) {
    if (entrada === "") {
        return false;
    }

    let nota = Number(entrada);

    if (!Number.isFinite(nota)) {
        return false;
    }

    if (nota < 0 || nota > 10) {
        return false;
    }

    return true;
}

function clasificarNota(nota) {
    if (nota < 5) {
        return "Suspenso";
    } else if (nota < 7) {
        return "Aprobado";
    } else if (nota < 9) {
        return "Notable";
    } else {
        return "Sobresaliente";
    }
}

function calcularMedia(notas) {
    let suma = 0;

    for (let i = 0; i < notas.length; i++) {
        suma = suma + notas[i];
    }

    return suma / notas.length;
}


let notas = [];
let entrada;

while (true) {

    entrada = prompt("Introduce una nota entre 0 y 10 (-1 para terminar):");

    // Comprobar si quiere terminar
    if (entrada === "-1") {
        break;
    }

    // Comprobar si la nota es válida
    if (!notaValida(entrada)) {
        alert("Nota no válida. Introduce un número entre 0 y 10.");
        continue;
    }

    let nota = Number(entrada);

    notas.push(nota);

    console.log("Nota: " + nota);
    console.log("Clasificación: " + clasificarNota(nota));
}


// Mostrar resultados
if (notas.length === 0) {

    console.log("No se introdujo ninguna nota.");

} else {

    let media = calcularMedia(notas);

    let maxima = Math.max(...notas);
    let minima = Math.min(...notas);

    console.log("Número de notas: " + notas.length);
    console.log("Media: " + media.toFixed(2));
    console.log("Nota máxima: " + maxima);
    console.log("Nota mínima: " + minima);
}