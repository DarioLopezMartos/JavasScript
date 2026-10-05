function eurosADolares(euros, cambio = 1.01) {
    return euros / cambio;
}

// Usando el valor por defecto
console.log(eurosADolares(100));

// Indicando otro valor
console.log(eurosADolares(100, 1.10));