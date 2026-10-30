const iniciarEscucha = document.getElementById("iniciarEscucha");
const estado = document.getElementById("estado");
const listaCompra = document.getElementById("listaCompra");
const ultimoComando = document.getElementById("ultimoComando");
const respuesta = document.getElementById("respuesta");
const formularioProducto = document.getElementById("formularioProducto");
const producto = document.getElementById("producto");
const botonVaciar = document.getElementById("vaciarLista");

// Recuperamos los productos guardados o creamos un array vacío.
let productos = JSON.parse(localStorage.getItem("productos")) || [];

// Comprobamos si el navegador admite el reconocimiento de voz.
const Reconocimiento =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let reconocimiento = null;
let errorReconocimiento = false;

// Mostramos los productos en pantalla.
function mostrarProductos() {
    listaCompra.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {
        const elemento = document.createElement("li");

        elemento.textContent = productos[i] + " ";

        // Botón para eliminar un producto.
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.type = "button";

        const nombreProducto = productos[i];

        botonEliminar.addEventListener("click", function () {
            quitarProducto(nombreProducto);
        });

        elemento.appendChild(botonEliminar);
        listaCompra.appendChild(elemento);
    }
}

// Guardamos los productos para conservarlos al recargar.
function guardarProductos() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

// Mostramos una respuesta escrita y la decimos en voz alta.
function responder(mensaje) {
    respuesta.textContent = mensaje;

    if ("speechSynthesis" in window) {
        const voz = new SpeechSynthesisUtterance(mensaje);
        voz.lang = "es-ES";

        window.speechSynthesis.speak(voz);
    }
}

// Añadimos un producto.
function anadirProducto(nombre) {
    nombre = nombre.trim();

    if (nombre === "") {
        responder("No has indicado ningún producto.");
        return;
    }

    productos.push(nombre);

    guardarProductos();
    mostrarProductos();

    responder("He añadido " + nombre);
}

// Quitamos un producto.
function quitarProducto(nombre) {
    nombre = nombre.trim();

    let indice = -1;

    // Buscamos el producto en la lista.
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].toLowerCase() === nombre.toLowerCase()) {
            indice = i;
            break;
        }
    }

    if (indice !== -1) {
        productos.splice(indice, 1);

        guardarProductos();
        mostrarProductos();

        responder("He quitado " + nombre);
    } else {
        responder("El producto no está en la lista.");
    }
}

// Vaciamos la lista completa.
function vaciarLista() {
    productos = [];

    guardarProductos();
    mostrarProductos();

    responder("He vaciado la lista de la compra.");
}

// Interpretamos los comandos de voz.
function interpretarComando(frase) {
    frase = frase.toLowerCase().trim();

    // Comando para vaciar la lista.
    if (frase === "vacía la lista") {
        vaciarLista();
    }

    // Comando para añadir un producto.
    else if (frase.indexOf("añade ") === 0) {
        let nombre = frase.substring(6);
        anadirProducto(nombre);
    }

    // Comando para quitar un producto.
    else if (frase.indexOf("quita ") === 0) {
        let nombre = frase.substring(6);
        quitarProducto(nombre);
    }

    // Si no reconocemos el comando, mostramos un mensaje.
    else {
        responder("No he entendido la orden.");
    }
}

// Mostramos los productos guardados al abrir la página.
mostrarProductos();

// Alternativa para añadir productos escribiendo.
formularioProducto.addEventListener("submit", function (evento) {
    evento.preventDefault();

    anadirProducto(producto.value);

    producto.value = "";
});

// Botón para vaciar la lista.
botonVaciar.addEventListener("click", function () {
    vaciarLista();
});

// Comprobamos si el navegador admite el reconocimiento de voz.
if (!Reconocimiento) {
    estado.textContent = "Este navegador no admite el reconocimiento de voz.";
    iniciarEscucha.disabled = true;

} else {
    reconocimiento = new Reconocimiento();

    reconocimiento.lang = "es-ES";
    reconocimiento.continuous = false;
    reconocimiento.interimResults = false;

    // Iniciamos la escucha al pulsar el botón.
    iniciarEscucha.addEventListener("click", function () {
        try {
            errorReconocimiento = false;
            estado.textContent = "Escuchando...";

            reconocimiento.start();

        } catch (error) {
            estado.textContent = "No se pudo iniciar la escucha.";
        }
    });

    // Indicamos que el micrófono está escuchando.
    reconocimiento.onstart = function () {
        estado.textContent = "Escuchando...";
    };

    // Recibimos e interpretamos la frase reconocida.
    reconocimiento.onresult = function (evento) {
        const frase = evento.results[0][0].transcript;

        ultimoComando.textContent = frase;

        interpretarComando(frase);
    };

    // Cuando termina la escucha, actualizamos el estado.
    reconocimiento.onend = function () {
        if (!errorReconocimiento) {
            estado.textContent = "Inactivo.";
        }
    };

    // Gestionamos los errores del reconocimiento.
    reconocimiento.onerror = function (evento) {
        errorReconocimiento = true;

        if (evento.error === "not-allowed") {
            estado.textContent = "Debes permitir el acceso al micrófono.";

        } else if (evento.error === "no-speech") {
            estado.textContent = "No se ha detectado ninguna voz.";

        } else {
            estado.textContent = "Se ha producido un error al reconocer la voz.";
        }
    };
}