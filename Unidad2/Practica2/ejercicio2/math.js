let pi = Math.PI;
var radio = 5;

var areaCirculo = pi * (Math.pow(radio, 2));
console.log("Area: " + areaCirculo);
console.log("Area: " + areaCirculo.toString);
console.log("Area: " + areaCirculo.toString);

console.log("Area: " + Math.round(areaCirculo));



a. Muestra el área por consola.
b. Convierte el resultado a string y muéstralo.
c. Muéstralo como string con tres decimales.
d. Convierte el área en un entero y muéstralo.
e. Redondea el área al entero más cercano con Math.
f. Multiplica el área por un entero aleatorio entre 1 y 20.
g. Comprueba con Number.isFinite() que el valor guardado en la variable del radio sea finito y positivo antes de calcular el área.