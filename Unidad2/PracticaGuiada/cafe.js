const urlCafe = "https://api.sampleapis.com/coffee/hot/2";

// Mostrar los datos del café en la página
function mostrarCafe(cafe) {
    const ingredientes = cafe.ingredients
        .map(ingrediente => "<li>" + ingrediente + "</li>")
        .join("");

    document.body.innerHTML = "<h1>Catálogo de cafés</h1>";

    document.body.innerHTML += "<article>";
    document.body.innerHTML += "<h2>" + cafe.title + "</h2>";
    document.body.innerHTML += "<img src='" + cafe.image + "' alt='" + cafe.title + "' height='300'>";
    document.body.innerHTML += "<p>" + cafe.description + "</p>";
    document.body.innerHTML += "<h3>Ingredientes</h3>";
    document.body.innerHTML += "<ul>" + ingredientes + "</ul>";
    document.body.innerHTML += "</article>";
}

// Obtener los datos de una URL
function obtenerDatos(url) {
    return fetch(url)
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error("Error HTTP: " + respuesta.status);
            }

            return respuesta.json();
        });
}

// Mostrar un mensaje mientras se cargan los datos
document.body.innerHTML = "<h1>Catálogo de cafés</h1><p>Cargando...</p>";

// Realizar la petición y mostrar los resultados
obtenerDatos(urlCafe)
    .then(cafe => {
        console.log("ID:", cafe.id);
        console.log("Nombre:", cafe.title);
        console.log("Descripción:", cafe.description);
        console.log("Ingredientes:", cafe.ingredients);
        console.log("Imagen:", cafe.image);

        mostrarCafe(cafe);
    })
    .catch(error => {
        console.error("No se pudo obtener el café:", error.message);

        document.body.innerHTML = "<h1>Catálogo de cafés</h1>";
        document.body.innerHTML += "<p>No se pudo cargar el café: " + error.message + "</p>";
    })
    .finally(() => {
        console.log("Petición terminada");
    });
