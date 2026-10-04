let numero1 = Number(prompt("Introduce el primer número:"));
let numero2 = Number(prompt("Introduce el segundo número:"));

if (numero1 > numero2) {
    let temporal = numero1;
    numero1 = numero2;
    numero2 = temporal;
}

for (let i = numero1; i <= numero2; i++) {
    console.log(i);
}