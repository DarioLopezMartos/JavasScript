let numero = Number(prompt("Introduce un número:"));

for (let i = 1; i <= numero; i++) {
    if (numero % i === 0) {
        console.log(i);
    }
}