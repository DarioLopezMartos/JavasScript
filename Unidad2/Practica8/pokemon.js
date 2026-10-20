const urlPokemonListado = "https://pokeapi.co/api/v2/pokemon?limit=5";
const urlPokemonIndividual = "https://pokeapi.co/api/v2/pokemon/pikachu";
const urlPokemonIndividual2 = "https://pokeapi.co/api/v2/pokemon/mew";
const urlPokemonIndividual3 = "https://pokeapi.co/api/v2/pokemon/eevee";


// Paso 1. Pedir el listado
const promesaRespuesta = fetch(urlPokemonListado);

console.log("Promesa recibida:", promesaRespuesta);

promesaRespuesta
    .then(respuesta => {
        console.log("Respuesta recibida:", respuesta);
        return respuesta.json();
    })
    .then(pokemon => {
        console.log("Objeto pokemon:", pokemon);
        console.log("Tipo de dato:", typeof pokemon);
        console.log("Listado de Pokémon:", pokemon.results);
        // Paso 2. Mostrar los nombres
        const listaPokemon = pokemon.results
            .map(pokemon => "<li>" + pokemon.name + "</li>")
            .join("");

        document.body.innerHTML = "<h1>Listado de Pokémon</h1>";
        document.body.innerHTML += "<ul>" + listaPokemon + "</ul>";
    });

// Paso 3. Pedir el detalle de un Pokémon

fetch(urlPokemonIndividual)
    .then(respuesta => {
        console.log("Respuesta recibida:", respuesta);
        return respuesta.json();
    })

    .then(pikachu => {
        const nombre = pikachu.name;
        const id = pikachu.id;
        const tipo = pikachu.types[0].type.name;
        const imagen = pikachu.sprites.front_default;
        console.log("Nombre pikachu: ", nombre);
        console.log("Id pikachu: ", id);
        console.log("Tipo pikachu: ", tipo);
        console.log("Imagen pikachu: ", imagen);
        document.body.innerHTML += "<div>";
        document.body.innerHTML += "<h2>" + nombre + "</h2>";
        document.body.innerHTML += "<p>Número: " + id + "</p>";
        document.body.innerHTML += "<p>Tipo: " + tipo + "</p>";
        document.body.innerHTML += "<img src='" + imagen + "' alt='" + nombre + "'>";
        document.body.innerHTML += "</div>";

    });

// Paso 4. Encadenar dos peticiones

fetch(urlPokemonListado)
    .then(respuesta => {
        console.log("Respuesta recibida: 1", respuesta);
        return respuesta.json();
    })
    .then(pokemonL => {
        const urlPokemon = pokemonL.results[0].url;

        return fetch(urlPokemon);
    })
    .then(respuesta => {
        console.log("Respuesta del Pokémon:", respuesta);
        return respuesta.json();
    })
    .then(pokemonL => {
        const nombre = pokemonL.name;
        const id = pokemonL.id;
        const tipo = pokemonL.types[0].type.name;
        const imagen = pokemonL.sprites.front_default;
        console.log("Nombre pokemon: ", nombre);
        console.log("Id pokemon: ", id);
        console.log("Tipo pokemon: ", tipo);
        console.log("Imagen pokemon: ", imagen);
        document.body.innerHTML += "<div>";
        document.body.innerHTML += "<h2>" + nombre + "</h2>";
        document.body.innerHTML += "<p>Número: " + id + "</p>";
        document.body.innerHTML += "<p>Tipo: " + tipo + "</p>";
        document.body.innerHTML += "<img src='" + imagen + "' alt='" + nombre + "'>";
        document.body.innerHTML += "</div>";

    });

// Paso 5. Crear funciones reutilizables

function obtenerDatos(url) {

    return fetch(url)
        .then(respuesta => {
            if (respuesta.ok) {
                console.log("Respuesta del Pokémon:", respuesta);
                return respuesta.json();
            } else {
                throw new Error("Error al obtener los datos");
            }

        })

}

function mostrarPokemon(pokemon) {
    const nombre = pokemon.name;
    const id = pokemon.id;
    const tipo = pokemon.types[0].type.name;
    const imagen = pokemon.sprites.front_default;

    console.log("Nombre pokemon:", nombre);
    console.log("Id pokemon:", id);
    console.log("Tipo pokemon:", tipo);
    console.log("Imagen pokemon:", imagen);

    document.body.innerHTML += "<div>";
    document.body.innerHTML += "<h2>" + nombre + "</h2>";
    document.body.innerHTML += "<p>Número: " + id + "</p>";
    document.body.innerHTML += "<p>Tipo: " + tipo + "</p>";
    document.body.innerHTML += "<img src='" + imagen + "' alt='" + nombre + "'>";
    document.body.innerHTML += "</div>";
}

obtenerDatos(urlPokemonIndividual2)
    .then(pokemon => {
        mostrarPokemon(pokemon);
    })
    .catch(error => {
        console.log("Error:", error);
    });
// El paso 6 no he conseguido hacerlo
// Paso 7. Añadir una espera propia

function esperar(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

esperar(5000)
    .then(() => {
        return obtenerDatos(urlPokemonIndividual3);
    })
    .then(pokemon => {
        mostrarPokemon(pokemon);
    })
    .catch(error => {
        console.log("Error:", error);
    });

// Paso 8. Reescribirlo con async y await

//Para que esta parte funcione tienes que comentar los otros fetch para que no pisen la etiqueta html, no he encontrado la forma de que funcionen todos a la vez

async function cargarPokemon() {
    document.body.innerHTML += "<p id='cargandoAsync'>Cargando...</p>";
    await esperar(2000);
    try {
        const listado = await obtenerDatos(urlPokemonListado);

        const urlPokemon = listado.results[4].url;

        const pokemon = await obtenerDatos(urlPokemon);
        await esperar(2000);
        const cargando = document.getElementById("cargandoAsync");

        if (cargando != null) {
            cargando.innerHTML = "";
        }

        mostrarPokemon(pokemon);

    } catch (error) {
        const cargando = document.getElementById("cargandoAsync");

        if (cargando != null) {
            cargando.innerHTML =
                "No se ha podido cargar el Pokémon. Comprueba la conexión o la URL.";
        }

        console.log("Error:", error);

    } finally {
        console.log("La petición ha terminado");
    }
}

cargarPokemon();