const escena = document.querySelector("#escena");
const objetivo = document.querySelector("#objetivo");
//const cubo = document.querySelector("#cubo");
//He creado modelo que es el patito de goma del html
const modelo = document.querySelector("#modelo");
const estado = document.querySelector("#estado");
const botonIniciar = document.querySelector("#iniciar");
//El nombre de botonColor lo he cambiado por botonAngulo y tambien en las partes de codigo donde se llamaba
const botonAngulo = document.querySelector("#cambiar-angulo");

//He comentado los elementos que no se usan, estaban declarados cuando existia el cubo pero los he dejado en el codigo
/*const colores = ["#20a4f3", "#f4a261", "#70c1b3", "#e76f51"];
let indiceColor = 0;
*/
//Esto es una nueva variable
let giro = 0;

// Espera a que A-Frame y MindAR creen sus componentes y sistemas.
const prepararEscena = () => {
  botonIniciar.disabled = false;
  estado.textContent = "Pulsa «Iniciar cámara» y permite el acceso.";
};

if (escena.hasLoaded) {
  prepararEscena();
} else {
  escena.addEventListener("loaded", prepararEscena, { once: true });
}

// La cámara solo se solicita como respuesta a una acción del usuario.
botonIniciar.addEventListener("click", async () => {
  const sistemaAR = escena.systems["mindar-image-system"];
  botonIniciar.disabled = true;
  estado.textContent = "Iniciando cámara…";

  try {
    await sistemaAR.start();
  } catch (error) {
    console.error("No se pudo iniciar WebAR:", error);
    estado.textContent =
      "No se pudo iniciar la cámara. Comprueba el permiso y usa HTTPS o localhost.";
    botonIniciar.disabled = false;
  }
});

// MindAR avisa cuando termina de inicializar o si no puede iniciar la cámara.
escena.addEventListener("arReady", () => {
  estado.textContent = "Cámara activa. Busca la imagen objetivo.";
  botonAngulo.disabled = false;
});

escena.addEventListener("arError", (event) => {
  console.error("MindAR no pudo iniciar WebAR:", event.detail);
  estado.textContent =
    "No se pudo iniciar la cámara. Comprueba el permiso y usa HTTPS o localhost.";
  botonIniciar.disabled = false;
});

// Estos eventos informan de si MindAR encuentra o pierde la imagen.
objetivo.addEventListener("targetFound", () => {
  estado.textContent = "Imagen detectada: el cubo está sobre ella.";
});

objetivo.addEventListener("targetLost", () => {
  estado.textContent = "Imagen no visible. Vuelve a encuadrar el objetivo.";
});

// He sustituido el metodo de botonColor por botonAngulo y esta vez simplemente rota 90 grados cada vez que lo pulsas
botonAngulo.addEventListener("click", () => {
  giro += 90;
  modelo.setAttribute("rotation", `0 ${giro} 0`);
});