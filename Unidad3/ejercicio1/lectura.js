
 // Referencias a los elementos del HTML que se van a leer o modificar.
const texto = document.getElementById("texto");
const idioma = document.getElementById("idioma");
const estado = document.getElementById("estado");
const hablar = document.getElementById("hablar");
const detener = document.getElementById("detener");

const textoPrincipal = document.getElementById("textoPrincipal");
const ultimoComando = document.getElementById("ultimoComando");
const iniciarEscucha = document.getElementById("iniciarEscucha");
const detenerEscucha = document.getElementById("detenerEscucha");
const respuesta = document.getElementById("respuesta");
const estadoLectura = document.getElementById("estadoLectura");

const masGrande = document.getElementById("masGrande");
const masPequeno = document.getElementById("masPequeno");
const modoOscuro = document.getElementById("modoOscuro");
const modoClaro = document.getElementById("modoClaro");

// Se guarda el tamaño inicial del texto principal.
let tamanoTexto = 24;

// Se comprueba si el navegador admite el reconocimiento de voz.
const Reconocimiento =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let reconocimiento = null;
let errorReconocimiento = false;

// Muestra una respuesta escrita y la lee si SpeechSynthesis está disponible.
function responder(mensaje) {
    respuesta.textContent = mensaje;

    if ("speechSynthesis" in window &&
        "SpeechSynthesisUtterance" in window) {
        window.speechSynthesis.cancel();

        const voz = new SpeechSynthesisUtterance(mensaje);
        voz.lang = idioma.value;

        window.speechSynthesis.speak(voz);
    }
}

// Ejecuta el comando recibido, tanto por voz como mediante los botones.
function ejecutarComando(comando) {
    // Se convierte el comando a minúsculas y se eliminan espacios sobrantes.
    comando = comando.toLowerCase().trim();

    // Comando "más grande": aumenta el tamaño del texto principal.
    if (comando.includes("más grande") || comando.includes("mas grande")) {
        tamanoTexto += 4;
        textoPrincipal.style.fontSize = tamanoTexto + "px";
        responder("He aumentado el tamaño del texto.");
    }
    // Comando "más pequeño": reduce el tamaño del texto principal.
    else if (comando.includes("más pequeño") || comando.includes("mas pequeño")) {
        tamanoTexto = Math.max(8, tamanoTexto - 4);
        textoPrincipal.style.fontSize = tamanoTexto + "px";
        responder("He reducido el tamaño del texto.");
    }
    // Comando "modo oscuro": cambia el fondo y el color del texto.
    else if (comando.includes("modo oscuro")) {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        responder("Modo oscuro activado.");
    }
    // Comando "modo claro": restaura el fondo y el color del texto.
    else if (comando.includes("modo claro")) {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        responder("Modo claro activado.");
    } else {
        // Una frase desconocida no modifica el aspecto de la página.
        responder("No he reconocido ese comando.");
    }
}

// Se comprueba si el navegador admite el reconocimiento de voz.
if (!Reconocimiento) {
    estado.textContent = "Error: el navegador no admite el reconocimiento de voz.";
    iniciarEscucha.disabled = true;
} else {
    reconocimiento = new Reconocimiento();
    reconocimiento.lang = "es-ES";
    reconocimiento.continuous = false;
    reconocimiento.interimResults = false;

    // Se inicia la escucha al pulsar el botón.
    iniciarEscucha.addEventListener("click", () => {
        try {
            reconocimiento.start();
        } catch (error) {
            estado.textContent = "Error: no se pudo iniciar la escucha.";
        }
    });

    // Se informa cuando comienza la escucha.
    reconocimiento.onstart = () => {
        errorReconocimiento = false;
        estado.textContent = "Escuchando...";
    };

    // Se procesa el comando reconocido.
    reconocimiento.onresult = (evento) => {
        const comando = evento.results[0][0].transcript
            .toLowerCase()
            .trim();

        ultimoComando.textContent = comando;

        ejecutarComando(comando);
    };

    // Se actualiza el estado cuando termina la escucha.
    reconocimiento.onend = () => {
        // No se sobrescribe un mensaje de error.
        if (!errorReconocimiento) {
            estado.textContent = "Inactivo.";
        }
    };

    // Se informa de los errores del reconocimiento.
    reconocimiento.onerror = (evento) => {
        errorReconocimiento = true;

        if (evento.error === "not-allowed" ||
            evento.error === "service-not-allowed") {
            estado.textContent = "Error: has denegado el permiso del micrófono.";
        } else if (evento.error === "no-speech") {
            estado.textContent = "No se ha detectado habla. Inténtalo de nuevo.";
        } else {
            estado.textContent = "Error de reconocimiento: " + evento.error;
        }
    };

    // Se detiene la escucha al pulsar el botón.
    detenerEscucha.addEventListener("click", () => {
        try {
            reconocimiento.stop();
        } catch (error) {
            estado.textContent = "Inactivo.";
        }
    });
}

// Botón alternativo para aumentar el tamaño del texto.
masGrande.addEventListener("click", () => {
    tamanoTexto += 4;
    textoPrincipal.style.fontSize = tamanoTexto + "px";
    responder("He aumentado el tamaño del texto.");
});

// Botón alternativo para reducir el tamaño del texto.
masPequeno.addEventListener("click", () => {
    tamanoTexto = Math.max(8, tamanoTexto - 4);
    textoPrincipal.style.fontSize = tamanoTexto + "px";
    responder("He reducido el tamaño del texto.");
});

// Botón alternativo para activar el modo oscuro.
modoOscuro.addEventListener("click", () => {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    responder("Modo oscuro activado.");
});

// Botón alternativo para activar el modo claro.
modoClaro.addEventListener("click", () => {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    responder("Modo claro activado.");
});

// Se comprueba que el navegador dispone de las dos piezas necesarias:
// speechSynthesis (el sintetizador que reproduce) y
// SpeechSynthesisUtterance (el mensaje que se le entrega para leer).
if (!("speechSynthesis" in window) ||
    !("SpeechSynthesisUtterance" in window)) {

    // Si falta alguna, se informa y se desactivan los botones de lectura.
    estadoLectura.textContent = "Este navegador no admite la síntesis de voz.";
    hablar.disabled = true;
    detener.disabled = true;

} else {
    // Botón "Leer texto".
    hablar.addEventListener("click", () => {
        // Se toma el contenido del textarea sin espacios al principio ni al final.
        const mensaje = texto.value.trim();

        // Si está vacío no hay nada que leer: se avisa y se sale de la función.
        if (!mensaje) {
            estadoLectura.textContent = "Escribe un texto antes de iniciar la lectura.";
            return;
        }

        // Cancela una lectura anterior para evitar que se acumulen mensajes.
        window.speechSynthesis.cancel();

        // Se crea el mensaje que se va a pronunciar, con el texto escrito.
        const utterance = new SpeechSynthesisUtterance(mensaje);

        // Se indica el idioma elegido en el desplegable.
        utterance.lang = idioma.value;

        // Cuando empieza a sonar la voz.
        utterance.onstart = () => {
            estadoLectura.textContent = "Leyendo el texto...";
        };

        // Cuando termina de leer todo el texto.
        utterance.onend = () => {
            estadoLectura.textContent = "Lectura finalizada.";
        };

        // Si algo falla durante la lectura.
        utterance.onerror = (evento) => {
            estadoLectura.textContent =
                "No se pudo completar la lectura: " + evento.error;
        };

        // Se entrega el mensaje al sintetizador, que empieza a leerlo.
        window.speechSynthesis.speak(utterance);
    });

    // Botón "Detener": cancela la lectura en curso y vacía la cola de mensajes.
    detener.addEventListener("click", () => {
        window.speechSynthesis.cancel();
        estadoLectura.textContent = "Lectura detenida.";
    });
}
