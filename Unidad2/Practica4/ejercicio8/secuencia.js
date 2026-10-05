function calcularAnalisis(...numeros) {

    if (numeros.length === 0) {
        return null;
    }

    for (let i = 0; i < numeros.length; i++) {
        if (!Number.isFinite(numeros[i])) {
            return null;
        }
    }

    let suma = 0;
    let minimo = numeros[0];
    let maximo = numeros[0];

    for (let i = 0; i < numeros.length; i++) {

        suma = suma + numeros[i];

        if (numeros[i] < minimo) {
            minimo = numeros[i];
        }

        if (numeros[i] > maximo) {
            maximo = numeros[i];
        }
    }

    let media = suma / numeros.length;

    return {
        suma: suma,
        media: media,
        minimo: minimo,
        maximo: maximo
    };
}


function analizar(...numeros) {

    if (numeros.length === 0) {
        return "No hay datos para analizar.";
    }

    for (let i = 0; i < numeros.length; i++) {
        if (!Number.isFinite(numeros[i])) {
            return "Error: todos los valores deben ser números finitos.";
        }
    }

    let resultado = calcularAnalisis(...numeros);

    return "Suma: " + resultado.suma +
        "\nMedia: " + resultado.media.toFixed(2) +
        "\nMínimo: " + resultado.minimo +
        "\nMáximo: " + resultado.maximo;
}


// Argumentos escritos directamente
console.log(analizar(5, 10, 15, 20));


// Array expandido mediante spread
let numeros = [2, 4, 6, 8];
console.log(analizar(...numeros));


// Array vacío
let vacio = [];
console.log(analizar(...vacio));


// Un único número
console.log(analizar(7));


// Valores repetidos
console.log(analizar(5, 5, 5, 5));


// Números negativos
console.log(analizar(-10, -5, 0, 5, 10));


// Valor inválido
console.log(analizar(10, 20, "30", 40));