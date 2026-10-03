let edad = Number(prompt("Introduce tu edad:"));
let nota = Number(prompt("Introduce tu nota media con tres decimales:"));
let aprobado = true;

console.log("Nota: " + nota.toFixed(2));
console.log("Suma: " + (edad + nota));
console.log("Resta: " + (edad - nota));
console.log("Multiplicación: " + (edad * nota));
if (edad !== 0) {
    console.log("División: " + (nota / edad));
    let division = (nota / edad).toString();
    console.log("División como string: " + division);
} else {
    console.log("No se puede dividir entre cero");
}
console.log("Aprobado: " + aprobado);
console.log(typeof edad);
console.log(typeof nota);
console.log(typeof aprobado);
if (Number.isFinite(edad) && Number.isFinite(nota) &&
    nota >= 0 && nota <= 10 && edad !== 0) {
    console.log("Los datos son válidos.");
} else {
    console.log("Los datos no son válidos.");
}