function contarPalabra (palabras, palabra){
    let contador = 0;

    palabras.forEach(pala => {
        if (pala === palabra){
            contador++;
        }
    });
        return contador

}

function palabras4Caracteres (palabras){
    const palabras4C = [];
    palabras.forEach(palabra => {
        if (palabra.length > 4){
            palabras4C.push(palabra);
        }
    });
    return palabras4C;
}

function listar (palabras){
    let frase = "[";
    palabras.forEach(palabra => {
        frase = frase + palabra + ", ";
    });
    frase = frase + "]";
    return frase
}

function posicionPalabra(palabras, palabra){
    let palabraBuscada = palabras.findIndex(elemento => elemento === palabra);
    return palabraBuscada;
}

const lista = ["sol", "montaña", "río", "bosque", "mariposa", "luz", "montaña"];

console.log(listar(lista));
console.log(contarPalabra(lista, "montaña"));
console.log(palabras4Caracteres(lista));
console.log(posicionPalabra(lista, "río"));
console.log(posicionPalabra(lista, "nube"));