function mostrarParametros(parametro1, parametro2, parametro3, parametro4) {

    console.log(parametro1);
    console.log(parametro2);
    console.log(parametro3);
    console.log(parametro4);

}

let colores = ["rojo", "verde", "azul", "amarillo"];

mostrarParametros(...colores);