function calcularDestino(posicion, orden) {

    if (orden === "derecha") {
        return posicion + 1;
    }

    if (orden === "izquierda") {
        return posicion - 1;
    }

    return posicion;
}


function moverRobot(pasillo, posicion, orden) {

    let destino = calcularDestino(posicion, orden);

    if (destino < 0 || destino >= pasillo.length) {
        return posicion;
    }

    if (pasillo[destino] === "#") {
        return posicion;
    }

    return destino;
}


function dibujarPasillo(pasillo, posicion) {

    let pasilloFinal = [];

    pasillo.forEach((posicionPasillo, indice) => {

        if (indice === posicion) {
            pasilloFinal.push("R");
        } else {
            pasilloFinal.push(posicionPasillo);
        }

    });

    return pasilloFinal;
}


const pasillo = ["S", ".", "#", ".", ".", "."];
const ordenes = ["derecha", "derecha", "izquierda", "izquierda"];

let posicion = 0;
let rechazadas = [];

ordenes.forEach(orden => {

    let nuevaPosicion = moverRobot(pasillo, posicion, orden);

    if (nuevaPosicion === posicion) {

        rechazadas.push(orden);

        console.log(
            orden + ": rechazado."
        );

    } else {

        posicion = nuevaPosicion;

        console.log(orden + ": aceptado; posición " + posicion + ".");
    }

});


console.log("Órdenes rechazadas: " + rechazadas);
console.log("Pasillo final: " + dibujarPasillo(pasillo, posicion));