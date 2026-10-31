const estadoFicha = document.querySelector("#estado-ficha");
const fichaPokemon = document.querySelector("#ficha-pokemon");

// Comprobar que existen los elementos
if (!estadoFicha || !fichaPokemon) {
    throw new Error("No se han encontrado los elementos de la ficha.");
}

const parametros = new URLSearchParams(window.location.search);

const nombre = parametros.get("pokemon");

async function obtenerDatos(url) {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
        throw new Error("Error al obtener los datos de la API");
    }

    const datos = await respuesta.json();

    return datos;
}

async function cargarFicha(nombre) {
    try {
        // Mostrar mensaje de carga
        estadoFicha.textContent = "Cargando Pokémon...";

        // Crear la URL de consulta
        const url = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(nombre)}`;

        // Obtener los datos del Pokémon
        const pokemon = await obtenerDatos(url);

        mostrarFicha(pokemon);

        estadoFicha.textContent = "";

    } catch (error) {
        // Mostrar el error en la página
        estadoFicha.textContent = "Error al cargar el Pokémon.";
        console.error(error);
    }
}

function mostrarFicha(pokemon) {

    fichaPokemon.textContent = "";

    const nombre = document.createElement("h2");

    // Asignar el nombre del Pokémon
    nombre.textContent = pokemon.name;

    // Añadir el título a la ficha
    fichaPokemon.append(nombre);

    // Crear el párrafo del número
    const numero = document.createElement("p");

    // Asignar el número del Pokémon
    numero.textContent = `Número: ${pokemon.id}`;

    // Añadir el número a la ficha
    fichaPokemon.append(numero);

    const imagen = document.createElement("img");

    // Asignar la imagen
    imagen.src = pokemon.sprites.front_default;
    imagen.alt = pokemon.name;
    imagen.loading = "lazy"

    fichaPokemon.append(imagen);

    // Crear el párrafo de los tipos
    const tipos = document.createElement("p");

    tipos.textContent = "Tipos: ";

    // Recorrer los tipos del Pokémon
    for (const tipo of pokemon.types) {
        tipos.textContent += tipo.type.name + " ";
    }

    // Añadir los tipos a la ficha
    fichaPokemon.append(tipos);

    // Crear el párrafo de la altura
    const altura = document.createElement("p");

    // Asignar la altura (PokeAPI utiliza decímetros)
    altura.textContent = `Altura: ${pokemon.height / 10} m`;

    // Crear el párrafo del peso
    const peso = document.createElement("p");

    // Asignar el peso (PokeAPI utiliza hectogramos)
    peso.textContent = `Peso: ${pokemon.weight / 10} kg`;

    // Añadir los datos a la ficha
    fichaPokemon.append(altura);
    fichaPokemon.append(peso);

    // Crear el párrafo de las habilidades
    const habilidades = document.createElement("p");

    habilidades.textContent = "Habilidades: ";

    // Recorrer las habilidades del Pokémon
    for (const habilidad of pokemon.abilities) {
        habilidades.textContent += habilidad.ability.name + " ";
    }

    // Añadir las habilidades a la ficha
    fichaPokemon.append(habilidades);

}

if (!nombre || nombre.trim() === "") {
    estadoFicha.textContent = "No se ha indicado ningún Pokémon.";

    // Crear un enlace para volver al índice
    const enlace = document.createElement("a");

    // Asignar la dirección
    enlace.href = "index.html";

    // Asignar el texto
    enlace.textContent = "Volver al listado";

    // Añadir el enlace a la página
    estadoFicha.append(enlace);

} else {

    cargarFicha(nombre);

}