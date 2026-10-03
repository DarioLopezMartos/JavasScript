let numero1 = Number(prompt("Introduce el primer número:"));
let numero2 = Number(prompt("Introduce el segundo número:"));

if (!Number.isFinite(numero1) || !Number.isFinite(numero2) ||
    numero1 === 0 || numero2 === 0) {
    
    alert("Error: los números deben ser válidos y distintos de cero.");

} else if (numero1 === numero2) {
    alert("Los dos números son iguales.");
} else if (numero1 > numero2) {
    alert("El primer número es mayor que el segundo.");
} else {
    alert("El segundo número es mayor que el primero.");
}