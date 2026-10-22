const url = "https://jsonplaceholder.typicode.com/posts?_limit=20";


//document.body.innerHTML = "<h1>Catálogo de cafés</h1><p>Cargando...</p>";

const usuarios = [];
console.log("1", usuarios)
fetch(url)
    .then(respuesta => {
        console.log("Respuesta:", respuesta);
        return respuesta.json();

    })
    .then(usuario => {

        for (let i = 0; i < 20; i++) {
            //console.log("UserID", usuario[i].userId);
            //console.log("ID", usuario[i].id);
            //console.log("Titulo", usuario[i].title);
            // console.log("Caracteristicas", usuario[i].body);

            usuarios.push(usuario[i]);
        }
    });

console.log("3", usuarios)

const formulario = document.getElementById("formulario-busqueda");

if (formulario !== null) {
    formulario.addEventListener("submit", evento => {
        evento.preventDefault();

        console.log("Se ha enviado el formulario");
    });
}

const botones = document.getElementsByTagName("button");
const campo = document.getElementById("busqueda");
const resultados = document.getElementById("resultados");

if (botones.length > 0) {
    botones[0].addEventListener("click", () => {
        console.log("Se ha pulsado el botón");

        resultados.innerHTML = "";

        usuarios.forEach(usuario => {
            if (usuario.title == campo.value) {
                resultados.innerHTML += "<li>" + usuario.title + "</li>";
            }else{
                resultados.innerHTML += "<li> No se ha encontrado ninguno </li>"
            }
        });
    });
}

