const alumnos = [
    ["lucia", [7, 8.5, 6]],
    ["Marcos", [4, 5, 3.5]],
    ["Irene", [9, 10, 8]],
    ["Pablo", []]
];

function media(notas) {

    if (notas.length === 0) {
        return 0;
    }

    let suma = 0;

    for (let i = 0; i < notas.length; i++) {
        suma = suma + notas[i];
    }

    return suma / notas.length;
}

function registrarNota(alumnos, nombre, nota) {

    for (let i = 0; i < alumnos.length; i++) {
        if (alumnos[i][0].toLowerCase() === nombre.toLowerCase()) {
            alumnos[i][1].push(nota);
            break;
        }
    }

    //!!! no olvidar hacer despues del 2º Falta comprobacion de s un alumno no existe y si la nota no esta entre 0 y 10 error con motivo y no cambair nada

}

function obtenerResumen(alumnos) {

    let resumen = [];

    for (let i = 0; i < alumnos.length; i++) {

        const nombre = alumnos[i][0];
        const notas = alumnos[i][1];
        const notaMedia = media(notas);

        let estado;

        if (notas.length === 0) {
            estado = "Sin notas";
        } else if (notaMedia >= 5) {
            estado = "Aprobado";
        } else {
            estado = "Suspenso";
        }

        resumen.push([nombre, notaMedia, estado]);
    }
    //resumen = resumen.sort() no me acuerdo como era 

    return resumen;
}

function obtenerAprobados(resumen) {

    let aprobados = [];

    for (let i = 0; i < resumen.length; i++) {

        if (resumen[i][2] === "Aprobado") {
            aprobados.push(resumen[i]);
        }
    }

    return aprobados;
}

function calcularEstadisticas(resumen) {

    let mediaMasAlta = 0;
    let sumaMedias = 0;
    let mediaMasBaja = 10;
    let contador = 0;

    for (let i = 0; i < resumen.length; i++) {

        if (resumen[i][2] !== "Sin notas") {

            const notaMedia = resumen[i][1];

            if (notaMedia > mediaMasAlta) {
                mediaMasAlta = notaMedia;
            }
            if (notaMedia < mediaMasBaja) {
                mediaMasBaja = notaMedia;
            }

            sumaMedias = sumaMedias + notaMedia;
            contador++;
        }
    }

    let mediaClase = 0;

    if (contador > 0) {
        mediaClase = sumaMedias / contador;
    }

    return [mediaMasAlta, mediaClase, mediaMasBaja];
}

registrarNota(alumnos, "Pablo", 7);
const resumen = obtenerResumen(alumnos);
const aprobados = obtenerAprobados(resumen);
const estadisticas = calcularEstadisticas(resumen);
console.log(resumen);
console.log(aprobados);
console.log("Media más alta: " + estadisticas[0]);
console.log("Media más baja: " + estadisticas[2]);
console.log("Media de la clase: " + estadisticas[1]);
