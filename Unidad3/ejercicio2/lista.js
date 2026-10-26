// Referencias a los elementos del HTML.
const iniciarEscucha = document.getElementById("iniciarEscucha");
const estado = document.getElementById("estado");
const listaCompra = document.getElementById("listaCompra");

// Se recuperan los productos guardados para conservarlos al recargar.
let productos = JSON.parse(localStorage.getItem("productos")) || [];

// Se comprueba si el navegador admite el reconocimiento de voz.
const Reconocimiento =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let reconocimiento = null;

// Muestra los productos guardados en la lista.
function mostrarProductos() {
    listaCompra.innerHTML = "";

    productos.forEach((producto) => {
        const elemento = document.createElement("li");
        elemento.textContent = producto;
        listaCompra.appendChild(elemento);
    });
}

// Guarda la lista en el almacenamiento del navegador.
function guardarProductos() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

// Añade un producto a la lista.
function anadirProducto(nombre) {
    if (nombre === "") {
        return;
    }

    productos.push(nombre);
    guardarProductos();
    mostrarProductos();
}

// Elimina un producto de la lista.
function quitarProducto(nombre) {
    const indice = productos.findIndex(
        producto => producto.toLowerCase() === nombre.toLowerCase()
    );

    if (indice !== -1) {
        productos.splice(indice, 1);
        guardarProductos();
        mostrarProductos();
    }
}

// Vacía la lista completa.
function vaciarLista() {
    productos = [];
    guardarProductos();
    mostrarProductos();
}

// Se muestra la lista al abrir la página.
mostrarProductos();

