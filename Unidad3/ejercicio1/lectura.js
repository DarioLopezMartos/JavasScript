// Elementos originales para leer texto
const texto = document.getElementById("texto");
const idioma = document.getElementById("idioma");
const estado = document.getElementById("estado");
const hablar = document.getElementById("hablar");
const detener = document.getElementById("detener");

// Elementos añadidos para el asistente de voz
const textoPrincipal = document.getElementById("textoPrincipal");
const ultimoComando = document.getElementById("ultimoComando");
const iniciarEscucha = document.getElementById("iniciarEscucha");
const detenerEscucha = document.getElementById("detenerEscucha");
const respuesta = document.getElementById("respuesta");
const estadoLectura = document.getElementById("estadoLectura");

// Botones para modificar la página
const masGrande = document.getElementById("masGrande");
const masPequeno = document.getElementById("masPequeno");
const modoOscuro = document.getElementById("modoOscuro");
const modoClaro = document.getElementById("modoClaro");

// Variables del asistente
let tamanoTexto = 24;
const Reconocimiento = window.SpeechRecognition || window.webkitSpeechRecognition;
let reconocimiento = null;
let errorReconocimiento = false;

// Función para mostrar una respuesta escrita y decirla en voz alta
function responder(mensaje) {
    respuesta.textContent = mensaje;

    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();

        const voz = new SpeechSynthesisUtterance(mensaje);
        voz.lang = idioma.value;

        window.speechSynthesis.speak(voz);
    }
}

// Función para interpretar los comandos de voz
function ejecutarComando(comando) {
    const frase = comando.toLowerCase().trim();

    // Comando: aumentar el tamaño del texto
    if (frase.includes("más grande") || frase.includes("mas grande")) {
        tamanoTexto += 4;
        textoPrincipal.style.fontSize = tamanoTexto + "px";
        responder("He aumentado el tamaño del texto.");
    }

    // Comando: reducir el tamaño del texto
    else if (frase.includes("más pequeño") || frase.includes("mas pequeño")) {
        tamanoTexto = Math.max(8, tamanoTexto - 4);
        textoPrincipal.style.fontSize = tamanoTexto + "px";
        responder("He reducido el tamaño del texto.");
    }

    // Comando: activar el modo oscuro
    else if (frase.includes("modo oscuro")) {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        responder("Has activado el modo oscuro.");
    }

    // Comando: activar el modo claro
    else if (frase.includes("modo claro")) {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        responder("Has activado el modo claro.");
    }

    // Si la frase no coincide con ningún comando
    else {
        responder("No he reconocido ese comando. Prueba con más grande, más pequeño, modo oscuro o modo claro.");
    }
}

// Comprobar si el navegador admite el reconocimiento de voz
if (!Reconocimiento) {
    estado.textContent = "Error: este navegador no admite el reconocimiento de voz.";
    iniciarEscucha.disabled = true;
    detenerEscucha.disabled = true;
} else {
    // Crear el reconocimiento de voz
    reconocimiento = new Reconocimiento();

    reconocimiento.lang = idioma.value;
    reconocimiento.continuous = false;
    reconocimiento.interimResults = false;

    // Iniciar la escucha
    iniciarEscucha.addEventListener("click", () => {
        try {
            errorReconocimiento = false;
            reconocimiento.lang = idioma.value;
            reconocimiento.start();
        } catch (error) {
            estado.textContent = "No se pudo iniciar la escucha. Inténtalo de nuevo.";
        }
    });

    // Detener la escucha
    detenerEscucha.addEventListener("click", () => {
        try {
            reconocimiento.stop();
            estado.textContent = "Inactivo.";
        } catch (error) {
            estado.textContent = "No se pudo detener la escucha.";
        }
    });

    // Cuando comienza la escucha
    reconocimiento.onstart = () => {
        estado.textContent = "Escuchando...";
    };

    // Cuando se reconoce una frase
    reconocimiento.onresult = (evento) => {
        const comando = evento.results[0][0].transcript;

        ultimoComando.textContent = comando;
        ejecutarComando(comando);
    };

    // Cuando termina la escucha
    reconocimiento.onend = () => {
        if (!errorReconocimiento) {
            estado.textContent = "Inactivo.";
        }
    };

    // Gestionar los errores del reconocimiento
    reconocimiento.onerror = (evento) => {
        errorReconocimiento = true;

        if (evento.error === "not-allowed" ||
            evento.error === "service-not-allowed") {
            estado.textContent = "Error: debes permitir el acceso al micrófono.";
        } else if (evento.error === "no-speech") {
            estado.textContent = "No se ha detectado ninguna voz. Inténtalo de nuevo.";
        } else if (evento.error === "audio-capture") {
            estado.textContent = "Error: no se ha encontrado un micrófono disponible.";
        } else {
            estado.textContent = "Se ha producido un error al reconocer la voz.";
        }
    };
}

// Controles alternativos para aumentar el tamaño del texto
masGrande.addEventListener("click", () => {
    tamanoTexto += 4;
    textoPrincipal.style.fontSize = tamanoTexto + "px";
    responder("He aumentado el tamaño del texto.");
});

// Control alternativo para reducir el tamaño del texto
masPequeno.addEventListener("click", () => {
    tamanoTexto = Math.max(8, tamanoTexto - 4);
    textoPrincipal.style.fontSize = tamanoTexto + "px";
    responder("He reducido el tamaño del texto.");
});

// Control alternativo para activar el modo oscuro
modoOscuro.addEventListener("click", () => {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    responder("Has activado el modo oscuro.");
});

// Control alternativo para activar el modo claro
modoClaro.addEventListener("click", () => {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    responder("Has activado el modo claro.");
});

// Comprobar si el navegador admite la lectura de texto
if (!("speechSynthesis" in window) ||
    typeof SpeechSynthesisUtterance === "undefined") {
    estadoLectura.textContent = "Error: este navegador no admite la lectura de texto.";
    hablar.disabled = true;
    detener.disabled = true;
} else {
    // Leer el texto escrito por el usuario
    hablar.addEventListener("click", () => {
        const mensaje = texto.value.trim();

        if (mensaje === "") {
            estadoLectura.textContent = "Escribe un texto antes de leerlo.";
            return;
        }

        window.speechSynthesis.cancel();

        const voz = new SpeechSynthesisUtterance(mensaje);
        voz.lang = idioma.value;

        voz.onstart = () => {
            estadoLectura.textContent = "Leyendo texto...";
        };

        voz.onend = () => {
            estadoLectura.textContent = "Lectura finalizada.";
        };

        voz.onerror = () => {
            estadoLectura.textContent = "Error al reproducir la lectura.";
        };

        window.speechSynthesis.speak(voz);
    });

    // Detener la lectura de texto
    detener.addEventListener("click", () => {
        window.speechSynthesis.cancel();
        estadoLectura.textContent = "Lectura detenida.";
    });
}