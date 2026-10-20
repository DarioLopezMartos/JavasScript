const formulario = document.querySelector("#formulario-cafe");
const campoId = document.querySelector("#id-cafe");
const botonEjemplo = document.querySelector("#cargar-ejemplo");
const estado = document.querySelector("#estado");
const ficha = document.querySelector("#ficha-cafe");

if (
    formulario === null ||
    campoId === null ||
    botonEjemplo === null ||
    estado === null ||
    ficha === null
) {
    throw new Error("Falta un elemento necesario en index.html");
}

function mostrarCafe(cafe) {
    const articulo = document.createElement("article");
    const titulo = document.createElement("h2");
    titulo.textContent = cafe.title;

    const descripcion = document.createElement("p");
    descripcion.textContent = cafe.description;

    const imagen = document.createElement("img");
    imagen.src = cafe.image;
    imagen.alt = cafe.title;
    imagen.height = 300;

    const tituloIngredientes = document.createElement("h3");
    tituloIngredientes.textContent = "Ingredientes";

    const listaIngredientes = document.createElement("ul");
    for (const ingrediente of cafe.ingredients) {
        const elemento = document.createElement("li");
        elemento.textContent = ingrediente;
        listaIngredientes.append(elemento);
    }

    const fichaCafe = {
        id: cafe.id,
        nombre: cafe.title,
        ingredientes: cafe.ingredients
    };
    const textoJson = JSON.stringify(fichaCafe, null, 2);
    const tituloJson = document.createElement("h3");
    tituloJson.textContent = "Ficha en formato JSON";
    const preJson = document.createElement("pre");
    preJson.textContent = textoJson;

    console.log("Ficha como texto JSON:", textoJson);
    console.log("Objeto reconstruido:", JSON.parse(textoJson));

    articulo.append(
        titulo,
        imagen,
        descripcion,
        tituloIngredientes,
        listaIngredientes,
        tituloJson,
        preJson
    );
    ficha.replaceChildren(articulo);

    
}

const URL_CAFE = "https://api.sampleapis.com/coffee/hot";

async function cargarCafe(id) {
  estado.textContent = "Cargando...";
  ficha.replaceChildren();

  try {
    const respuesta = await fetch(`${URL_CAFE}/${id}`);

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const cafe = await respuesta.json();
    console.log("Café recibido:", cafe);
    mostrarCafe(cafe);
    estado.textContent = `Café cargado: ${cafe.title}`;
  } catch (error) {
    console.error("No se pudo obtener el café:", error);
    const mensaje = error instanceof Error ? error.message : "Error desconocido";
    estado.textContent = `No se pudo cargar el café. ${mensaje}`;
  }
}

formulario.addEventListener("submit", evento => {
  evento.preventDefault();

  const id = Number(campoId.value);
  if (!Number.isInteger(id) || id < 1) {
    estado.textContent = "Escribe un número de café entero y mayor que cero.";
    return;
  }

  cargarCafe(id);
});

botonEjemplo.addEventListener("click", () => {
  campoId.value = "2";
  cargarCafe(2);
});

cargarCafe(2);