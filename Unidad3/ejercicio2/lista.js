const iniciarEscucha = document.getElementById("iniciarEscucha");
const estado = document.getElementById("estado");
const listaCompra = document.getElementById("listaCompra");
const ultimoComando = document.getElementById("ultimoComando");
const respuesta = document.getElementById("respuesta");
const formularioProducto = document.getElementById("formularioProducto");
const producto = document.getElementById("producto");
const botonVaciar = document.getElementById("vaciarLista");

// Recuperamos los productos guardados.
// Si no hay productos, creamos una lista vacía.
let productos = JSON.parse(localStorage.getItem("productos")) || [];

// Comprobamos si el navegador admite el reconocimiento de voz.
const Reconocimiento =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let reconocimiento = null;
let errorReconocimiento = false;


// Mostramos los productos en la página.
function mostrarProductos() {
    listaCompra.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {
        const elemento = document.createElement("li");

        elemento.textContent = productos[i] + " ";

        // Creamos un botón para eliminar el producto.
        const botonEliminar = document.createElement("button");

        botonEliminar.textContent = "Eliminar";
        botonEliminar.type = "button";

        // Guardamos el nombre del producto que queremos eliminar.
        const nombreProducto = productos[i];

        botonEliminar.addEventListener("click", function () {
            quitarProducto(nombreProducto);
        });

        elemento.appendChild(botonEliminar);
        listaCompra.appendChild(elemento);
    }
}


// Guardamos los productos para conservarlos al recargar la página.
function guardarProductos() {
    localStorage.setItem("productos", JSON.stringify(productos));
}


// Mostramos una respuesta escrita y la decimos en voz alta si es posible.
function responder(mensaje) {
    respuesta.textContent = mensaje;

    if (
        "speechSynthesis" in window &&
        typeof SpeechSynthesisUtterance !== "undefined"
    ) {
        window.speechSynthesis.cancel();

        const voz = new SpeechSynthesisUtterance(mensaje);
        voz.lang = "es-ES";

        window.speechSynthesis.speak(voz);
    }
}


// Añadimos un producto a la lista.
function anadirProducto(nombre) {
    nombre = nombre.trim();

    if (nombre === "") {
        responder("No has indicado ningún producto.");
        return;
    }

    productos.push(nombre);

    guardarProductos();
    mostrarProductos();

    responder("He añadido " + nombre + ".");
}


// Eliminamos el primer producto que coincida con el nombre indicado.
function quitarProducto(nombre) {
    nombre = nombre.trim();

    let indice = -1;

    // Buscamos el producto sin distinguir mayúsculas y minúsculas.
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].toLowerCase() === nombre.toLowerCase()) {
            indice = i;
            break;
        }
    }

    if (indice !== -1) {
        const productoEliminado = productos[indice];

        productos.splice(indice, 1);

        guardarProductos();
        mostrarProductos();

        responder("He quitado " + productoEliminado + ".");
    } else {
        responder("El producto " + nombre + " no está en la lista.");
    }
}


// Quitamos un artículo del principio del nombre, si lo tiene.
// Por ejemplo, "la leche" se convierte en "leche".
function quitarArticulo(nombre) {
    if (nombre.indexOf("el ") === 0) {
        nombre = nombre.substring(3);
    } else if (nombre.indexOf("la ") === 0) {
        nombre = nombre.substring(3);
    } else if (nombre.indexOf("los ") === 0) {
        nombre = nombre.substring(4);
    } else if (nombre.indexOf("las ") === 0) {
        nombre = nombre.substring(4);
    } else if (nombre.indexOf("un ") === 0) {
        nombre = nombre.substring(3);
    } else if (nombre.indexOf("una ") === 0) {
        nombre = nombre.substring(4);
    }

    return nombre.trim();
}


// Vaciamos la lista completa.
function vaciarLista() {
    if (productos.length === 0) {
        responder("La lista ya está vacía.");
        return;
    }

    productos = [];

    guardarProductos();
    mostrarProductos();

    responder("He vaciado la lista de la compra.");
}


// Interpretamos la frase que ha reconocido el navegador.
function interpretarComando(frase) {
    frase = frase.toLowerCase().trim();

    // Comandos para vaciar la lista.
    if (
        frase === "vacía la lista" ||
        frase === "vaciar la lista" ||
        frase === "vacía la lista de la compra" ||
        frase === "vaciar lista" ||
        frase === "borra toda la lista"
    ) {
        vaciarLista();
    }

    // Comandos para añadir un producto.
    else if (
        frase.indexOf("añade ") === 0 ||
        frase.indexOf("añadir ") === 0 ||
        frase.indexOf("agrega ") === 0
    ) {
        let nombre = "";

        if (frase.indexOf("añade ") === 0) {
            nombre = frase.substring(6);
        } else if (frase.indexOf("añadir ") === 0) {
            nombre = frase.substring(7);
        } else {
            nombre = frase.substring(7);
        }

        nombre = quitarArticulo(nombre);

        if (nombre === "") {
            responder("No has indicado qué producto quieres añadir.");
        } else {
            anadirProducto(nombre);
        }
    }

    // Comandos para eliminar un producto.
    else if (
        frase.indexOf("quita ") === 0 ||
        frase.indexOf("elimina ") === 0 ||
        frase.indexOf("eliminar ") === 0 ||
        frase.indexOf("borra ") === 0
    ) {
        let nombre = "";

        if (frase.indexOf("quita ") === 0) {
            nombre = frase.substring(6);
        } else if (frase.indexOf("elimina ") === 0) {
            nombre = frase.substring(8);
        } else if (frase.indexOf("eliminar ") === 0) {
            nombre = frase.substring(9);
        } else {
            nombre = frase.substring(6);
        }

        nombre = quitarArticulo(nombre);

        if (nombre === "") {
            responder("No has indicado qué producto quieres quitar.");
        } else {
            quitarProducto(nombre);
        }
    }

    // Si no entendemos la frase, no modificamos la lista.
    else {
        responder(
            "No he entendido la orden. Puedes decir añade leche, quita leche o vacía la lista."
        );
    }
}


// Mostramos los productos guardados al abrir la página.
mostrarProductos();

// Añadimos productos escribiendo en el campo de texto.
formularioProducto.addEventListener("submit", function (evento) {
    evento.preventDefault();

    anadirProducto(producto.value);

    producto.value = "";
    producto.focus();
});


// Permitimos vaciar la lista mediante un botón.
botonVaciar.addEventListener("click", function () {
    vaciarLista();
});


// Comprobamos si el navegador admite el reconocimiento de voz.
if (!Reconocimiento) {
    estado.textContent =
        "Error: este navegador no admite el reconocimiento de voz.";

    iniciarEscucha.disabled = true;
} else {
    reconocimiento = new Reconocimiento();

    reconocimiento.lang = "es-ES";
    reconocimiento.continuous = false;
    reconocimiento.interimResults = false;

    // Iniciamos la escucha cuando el usuario pulsa el botón.
    iniciarEscucha.addEventListener("click", function () {
        try {
            errorReconocimiento = false;
            estado.textContent = "Preparando el micrófono...";

            reconocimiento.start();
        } catch (error) {
            estado.textContent =
                "No se pudo iniciar la escucha. Inténtalo de nuevo.";
        }
    });

    // Indicamos que el micrófono está escuchando.
    reconocimiento.onstart = function () {
        estado.textContent = "Escuchando...";
    };

    // Cuando se reconoce una frase, la mostramos y la interpretamos.
    reconocimiento.onresult = function (evento) {
        const frase = evento.results[0][0].transcript;

        ultimoComando.textContent = frase;

        interpretarComando(frase);
    };

    // Cuando termina la escucha, mostramos el estado correspondiente.
    reconocimiento.onend = function () {
        if (!errorReconocimiento) {
            estado.textContent = "Inactivo.";
        }
    };

    // Gestionamos los errores del reconocimiento.
    reconocimiento.onerror = function (evento) {
        errorReconocimiento = true;

        if (
            evento.error === "not-allowed" ||
            evento.error === "service-not-allowed"
        ) {
            estado.textContent =
                "Error: debes permitir el acceso al micrófono.";
        } else if (evento.error === "no-speech") {
            estado.textContent =
                "No se ha detectado ninguna voz. Inténtalo de nuevo.";
        } else if (evento.error === "audio-capture") {
            estado.textContent =
                "Error: no se ha encontrado un micrófono disponible.";
        } else {
            estado.textContent =
                "Se ha producido un error al reconocer la voz.";
        }
    };
}