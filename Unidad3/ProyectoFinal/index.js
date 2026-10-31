//Seleccionar los elementos del HTML

const formulario = document.querySelector("#formulario-busqueda");
const campoBusqueda = document.querySelector("#nombre-pokemon");
const estadoBusqueda = document.querySelector("#estado-busqueda");
const listadoPokemon = document.querySelector("#listado-pokemon");

if (!formulario || !campoBusqueda || !estadoBusqueda || !listadoPokemon) {
    throw new Error("Error: No se han encontrado todos los elementos del HTML.");
}

async function obtenerDatos(url) {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
        throw new Error("Error al obtener los datos de la API");
    }

    const datos = await respuesta.json();

    return datos;
}

async function cargarListado() {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=20";

    try {
        estadoBusqueda.textContent = "Cargando Pokémon...";

        const datos = await obtenerDatos(url);

        listadoPokemon.replaceChildren();

        for (const pokemon of datos.results) {
            // Crear el contenedor de la tarjeta
            const tarjeta = document.createElement("div");

            tarjeta.classList.add("tarjeta-pokemon");

            // Crear el nombre del Pokémon
            const nombre = document.createElement("h3");


            // Asignar el nombre
            nombre.textContent = pokemon.name;

            // Obtener los datos completos del Pokémon
            const datosPokemon = await obtenerDatos(pokemon.url);

            // Crear la imagen
            const imagen = document.createElement("img");

            // Asignar la imagen
            imagen.src = datosPokemon.sprites.front_default;
            imagen.alt = pokemon.name;
            imagen.loading = "lazy";

            // Crear el botón para ver la ficha
            const boton = document.createElement("button");

            // Asignar el texto del botón
            boton.textContent = "Ficha completa";

            // Indicar el tipo de botón
            boton.type = "button";

            // Guardar el nombre del Pokémon
            boton.setAttribute("data-nombre", pokemon.name);

            // Añadir el nombre a la tarjeta
            tarjeta.append(nombre);
            tarjeta.append(imagen);
            tarjeta.append(boton);

            // Añadir la tarjeta al listado
            listadoPokemon.append(tarjeta);
        };

        estadoBusqueda.textContent = "";
    } catch (error) {
        estadoBusqueda.textContent = "Error al cargar los Pokémon.";
        console.error(error);
    }
}

cargarListado();

listadoPokemon.addEventListener("click", evento => {
    const boton = evento.target;

    if (!(boton instanceof Element)) {
        return;
    }
    const botonFicha = boton.closest("button[data-nombre]");

    if (!botonFicha) {
        return;
    }
    const nombrePokemon = botonFicha.getAttribute("data-nombre");
    window.location.href = `ficha.html?pokemon=${encodeURIComponent(nombrePokemon)}`;
});

formulario.addEventListener("submit", async evento => {
    evento.preventDefault();

    const nombrePokemon = campoBusqueda.value;
    const nombre = nombrePokemon.trim().toLowerCase();

    if (nombre === "") {
        estadoBusqueda.textContent = "Escribe el nombre de un Pokémon.";
        return;
    }

    try {
        estadoBusqueda.textContent = "Buscando Pokémon...";

        const url = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(nombre)}`;

        const datos = await obtenerDatos(url);

        window.location.href = `ficha.html?pokemon=${encodeURIComponent(datos.name)}`;

    } catch (error) {
        estadoBusqueda.textContent = "No se ha encontrado ese Pokémon.";
        console.error(error);
    }
});