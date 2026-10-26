const URL_API = "https://jsonplaceholder.typicode.com/posts?_limit=20";

// Guardamos todas las publicaciones recibidas
let publicaciones = [];

// Elementos del HTML
const formulario = document.getElementById("formulario-busqueda");
const busqueda = document.getElementById("busqueda");
const estado = document.getElementById("estado");
const resultados = document.getElementById("resultados");

// Carga las publicaciones de la API
async function cargarPublicaciones() {
    estado.textContent = "Cargando publicaciones...";

    try {
        const respuesta = await fetch(URL_API);

        // Comprobamos si la respuesta ha sido correcta
        if (!respuesta.ok) {
            throw new Error("Error al obtener las publicaciones");
        }

        // Convertimos la respuesta a JSON
        publicaciones = await respuesta.json();

        estado.textContent = "Publicaciones cargadas correctamente.";

        // Mostramos todas las publicaciones
        mostrarPublicaciones(publicaciones);

    } catch (error) {
        estado.textContent = "No se pudieron cargar las publicaciones.";
        console.error(error);

        // Dejamos la lista vacía si ocurre un error
        publicaciones = [];
        mostrarPublicaciones(publicaciones);
    }
}

// Muestra las publicaciones recibidas en la lista
function mostrarPublicaciones(lista) {
    // Limpiamos los resultados anteriores
    resultados.innerHTML = "";

    if (lista.length === 0) {
        const elemento = document.createElement("li");
        elemento.textContent = "No hay publicaciones que mostrar.";
        resultados.appendChild(elemento);
        return;
    }

    // Creamos un elemento para cada publicación
    lista.forEach(publicacion => {
        const elemento = document.createElement("li");
        const titulo = document.createElement("h2");
        const texto = document.createElement("p");

        titulo.textContent = publicacion.title;
        texto.textContent = publicacion.body;

        elemento.appendChild(titulo);
        elemento.appendChild(texto);

        resultados.appendChild(elemento);
    });
}

// Busca publicaciones por título
function buscarPublicaciones(texto) {
    const textoBusqueda = texto.toLowerCase().trim();

    // Si el campo está vacío, mostramos todas
    if (textoBusqueda === "") {
        mostrarPublicaciones(publicaciones);
        return;
    }

    // Filtramos los títulos ignorando mayúsculas y minúsculas
    const publicacionesFiltradas = publicaciones.filter(publicacion =>
        publicacion.title.toLowerCase().includes(textoBusqueda)
    );

    mostrarPublicaciones(publicacionesFiltradas);
}

// Evitamos que el formulario recargue la página
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    buscarPublicaciones(busqueda.value);
});

// Cargamos las publicaciones al abrir la página
cargarPublicaciones();
