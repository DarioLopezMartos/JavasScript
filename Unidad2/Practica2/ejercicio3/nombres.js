let nombre = "Darío";
let apellidos = "López Martos";
let nombreCompleto = nombre.concat(" ", apellidos);
let nombreModificado = nombreCompleto.replace("Martos", "Garrido");
let arrayNombre = nombreCompleto.split(" ");
let posicionApellido = nombreCompleto.indexOf("López");
let iniciales = arrayNombre[0][0] + arrayNombre[1][0] + arrayNombre[2][0];

console.log(nombreCompleto);
console.log(nombreCompleto.length);
console.log(nombreCompleto.slice(7, 11));
console.log(nombreModificado);
console.log(nombreCompleto.toUpperCase());
console.log(nombreCompleto.slice(-1));
console.log(arrayNombre);
console.log(posicionApellido);
console.log(`Bienvenido/a ${nombreCompleto}`);
console.log(iniciales);