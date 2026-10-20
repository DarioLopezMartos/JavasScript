
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


// Obtener el café utilizando async y await
async function obtenerCafe() {

    document.body.innerHTML = "<h1>Catálogo de cafés</h1><p>Cargando...</p>";

    try {
        const respuesta = await fetch(urlCafe);

        if (!respuesta.ok) {
            throw new Error("Error HTTP: " + respuesta.status);
        }

        const cafe = await respuesta.json();

        console.log("Café recibido:", cafe);
        console.log("ID:", cafe.id);
        console.log("Nombre:", cafe.title);
        console.log("Descripción:", cafe.description);
        console.log("Ingredientes:", cafe.ingredients);
        console.log("Imagen:", cafe.image);

        mostrarCafe(cafe);

    } catch (error) {
        console.error("No se pudo obtener el café:", error.message);

        document.body.innerHTML = "<h1>Catálogo de cafés</h1>";
        document.body.innerHTML += "<p>No se pudo cargar el café: " + error.message + "</p>";

    } finally {
        console.log("Petición terminada");
    }
}


// Ejecutar la función
obtenerCafe();
