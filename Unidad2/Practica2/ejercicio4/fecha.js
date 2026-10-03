let fecha = new Date();
let fechaCompleta = new Intl.DateTimeFormat("es-ES", {dateStyle: "full"}).format(fecha);

console.log(fecha.getDate());
console.log(fecha.getMonth() + 1);
console.log(fecha.getFullYear());
console.log(fechaCompleta);