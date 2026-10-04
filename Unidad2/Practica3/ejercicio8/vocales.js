let palabra = prompt("Introduce una palabra:").toLowerCase();
let vocales = 0;

for (let i = 0; i < palabra.length; i++) {

    if (palabra[i] === "a" ||
        palabra[i] === "e" ||
        palabra[i] === "i" ||
        palabra[i] === "o" ||
        palabra[i] === "u") {
        vocales++;
    }
}

console.log("La palabra tiene " + vocales + " vocales.");