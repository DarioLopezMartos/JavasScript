const urlPokemonListado = "https://pokeapi.co/api/v2/pokemon?limit=5";
const urlPokemonIndividual = "https://pokeapi.co/api/v2/pokemon/pikachu";

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

        const listaPokemon = pokemon.results
            .map(pokemon => "<li>" + pokemon.name + "</li>")
            .join("");

        document.body.innerHTML = "<h1>Listado de Pokémon</h1>";
        document.body.innerHTML += "<ul>" + listaPokemon + "</ul>";
    });

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

    function obtenerDatos(url){

        fetch(url)
            .then(respuesta =>{
                if (respuesta.ok){
                    console.log("Hola:" , respuesta);
                    return respuesta.json();
                }else{
                    console.log("Respuesta erronea");
                }

            })

    }
    obtenerDatos(urlPokemonIndividual)
