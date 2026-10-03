let numero1 = Number(prompt("Introduce el primer número:"));
let numero2 = Number(prompt("Introduce el segundo número:"));

if (numero1 === numero2) {
    alert("Los dos números son iguales.");
} else if (numero1 > numero2) {
    alert("El primer número es mayor que el segundo.");
} else {
    alert("El segundo número es mayor que el primero.");
}