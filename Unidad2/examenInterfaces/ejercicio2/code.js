const pagina = "https://jsonplaceholder.typicode.com/users";
let listaUsuarios = [];
const botonCargar = document.querySelector("#btn-cargar");
const buscadorNombre = document.querySelector("#buscador-nombre");
const buscadorCiudad = document.querySelector("#buscador-ciudad");
const botonLimpiar = document.querySelector("#btn-limpiar");
const estado = document.querySelector("#estado");
const lista = document.querySelector("#usuarios");

async function cargarDatos() {

    estado.textContent = "Cargando usuarios...";

    try {
        const respuesta = await fetch(pagina);

        if (!respuesta.ok) {
            throw new Error("Error en la petición");
        }

        const datos = await respuesta.json();

        listaUsuarios = datos;

        mostrarUsuarios(listaUsuarios);

    } catch (error) {
        estado.textContent = "No se han podido cargar los usuarios.";
    }
}

function mostrarUsuarios(usuarios) {

    lista.replaceChildren();

    //aqui tendria que ordenarlos pero no me acuerdo como era usuarios.sort((a, b) => a.name(b.name));

    for (let i = 0; i < usuarios.length; i++) {

        const elemento = document.createElement("li");

        elemento.textContent = "Nombre: " + usuarios[i].name + ", Empresa: " + usuarios[i].company.name + ", Ciudad: " + usuarios[i].address.city;

        lista.append(elemento);
    }

    if (usuarios.length === 0) {
        estado.textContent = "No hay usuarios.";
    } else {
        estado.textContent = "Usuarios mostrados: " + usuarios.length;
    }
}

function filtrarUsuarios() {

    const nombre = buscadorNombre.value.toLowerCase().trim();
    const ciudad = buscadorCiudad.value.toLowerCase().trim();

    const usuariosFiltrados = listaUsuarios.filter(usuario => {

        const coincideNombre = usuario.name.toLowerCase().includes(nombre);
        const coincideCiudad = usuario.address.city.toLowerCase().includes(ciudad);

        return coincideNombre && coincideCiudad;
    });

    mostrarUsuarios(usuariosFiltrados);
}

botonCargar.addEventListener("click", cargarDatos);
buscadorNombre.addEventListener("input", filtrarUsuarios);
buscadorCiudad.addEventListener("input", filtrarUsuarios);
botonLimpiar.addEventListener("click", 
    function () {
        buscadorNombre.value = "";
        buscadorCiudad.value = "";
        mostrarUsuarios(listaUsuarios);
    });