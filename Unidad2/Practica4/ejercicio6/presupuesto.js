function calcularLitros(distancia, consumo) {
    return distancia * consumo / 100;
}

function calcularCosteTotal(litros, precio = 1.60) {
    return litros * precio;
}

function calcularCostePorViajero(costeTotal, viajeros) {
    return costeTotal / viajeros;
}

function mostrarCoste(calculo, valor) {
    console.log("Coste: " + calculo(valor).toFixed(2) + " €");
}


// Pedir distancia
let distancia;

do {
    distancia = Number(prompt("Introduce la distancia del viaje en km:"));

    if (!Number.isFinite(distancia) || distancia <= 0) {
        alert("La distancia debe ser un número mayor que cero.");
    }

} while (!Number.isFinite(distancia) || distancia <= 0);


// Pedir consumo
let consumo;

do {
    consumo = Number(prompt("Introduce el consumo del vehículo en litros cada 100 km:"));

    if (!Number.isFinite(consumo) || consumo <= 0) {
        alert("El consumo debe ser un número mayor que cero.");
    }

} while (!Number.isFinite(consumo) || consumo <= 0);


// Pedir precio
let precioLitro = prompt("Introduce el precio del combustible por litro (pulsa Cancelar para usar 1,60 €):");

let precio;

if (precioLitro === null || precioLitro === "") {
    precio = 1.60;
} else {
    precio = Number(precioLitro);

    while (!Number.isFinite(precio) || precio <= 0) {
        alert("El precio debe ser un número válido mayor que cero.");
        precio = Number(prompt("Introduce el precio del combustible por litro:"));
    }
}


// Pedir viajeros
let viajeros;

do {
    viajeros = Number(prompt("Introduce el número de viajeros:"));

    if (!Number.isFinite(viajeros) || viajeros <= 0) {
        alert("El número de viajeros debe ser un número mayor que cero.");
    }

} while (!Number.isFinite(viajeros) || viajeros <= 0);


// Cálculos
let litros = calcularLitros(distancia, consumo);
let costeTotal = calcularCosteTotal(litros, precio);
let costeViajero = calcularCostePorViajero(costeTotal, viajeros);


// Datos
console.log("Combustible estimado: " + litros.toFixed(2) + " litros");

mostrarCoste(function(valor) {
    return valor;
}, costeTotal);

mostrarCoste(function(valor) {
    return valor;
}, costeViajero);