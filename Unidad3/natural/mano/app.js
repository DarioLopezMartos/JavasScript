import { FilesetResolver, HandLandmarker } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/vision_bundle.mjs";


const videoCamara = document.getElementById("videoCamara");
const campoPosicion = document.getElementById("posicionIndice");
const botonInicio = document.getElementById("botonInicio");
const estado = document.getElementById("estado");
const mensaje = document.getElementById("mensaje");
const contenedorVideo = document.getElementById("contenedorVideo");
const cajaColor = document.getElementById("caja"); //He agregado la caja
const canvasPuntos = document.getElementById("canvasPuntos");
const ctxPuntos = canvasPuntos.getContext("2d");
let detectorManos;
let ultimoTiempoVideo = -1;
let flujoCamara;
let botonX = 50;
let botonY = 50;
// Solicita la cámara, carga el modelo de manos e inicia la detección.
async function iniciarDeteccion() {
    botonInicio.disabled = true;
    estado.textContent = "Solicitando acceso a la cámara...";


    try {
        flujoCamara = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480 }
        });
        videoCamara.srcObject = flujoCamara;
        await videoCamara.play();


        estado.textContent = "Cargando el detector...";
        const archivosVision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
        );
        detectorManos = await HandLandmarker.createFromOptions(archivosVision, {
            baseOptions: {
                modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task"
            },
            runningMode: "VIDEO",
            numHands: 1
        });


        estado.textContent = "Cámara activa: muestra la punta del índice.";
        dibujarBoton(-50, -50);
        requestAnimationFrame(detectarManoEnVideo);
    } catch (errorInicio) {
        console.error(errorInicio);
        flujoCamara?.getTracks().forEach((pista) => pista.stop());
        flujoCamara = undefined;
        videoCamara.srcObject = null;
        detectorManos?.close();
        detectorManos = undefined;
        botonInicio.disabled = false;
        estado.textContent = "No se pudo iniciar. Comprueba el permiso de cámara, la conexión a Internet y que uses HTTPS o localhost.";
    }
}


// Crea un botón en el vídeo. La posición (X, Y) es su centro, en porcentajes.
function dibujarBoton(posicionX, posicionY) {
    let boton = document.getElementById("botonDibujado");


    if (!boton) {
        boton = document.createElement("button");
        boton.id = "botonDibujado";
        boton.textContent = "Botón";
        boton.type = "button";


        contenedorVideo.appendChild(boton);
    }


    boton.style.left = `${posicionX}%`;
    boton.style.top = `${posicionY}%`;
    botonX = posicionX;
    botonY = posicionY;
}


// Indica si un punto (en porcentajes del vídeo) está dentro del botón.
// El botón mide 20 % de ancho y 12 % de alto (ver CSS) y (botonX, botonY) es su centro,
// así que llega 10 % a cada lado en horizontal y 6 % en vertical.
function estaDentroDelBoton(posicionX, posicionY) {
    return Math.abs(posicionX - botonX) <= 10 &&
        Math.abs(posicionY - botonY) <= 6;
}


// Cambia el aspecto del botón y el mensaje según si el índice está dentro.
function actualizarBoton(dentro) {
    const boton = document.getElementById("botonDibujado");


    if (dentro) {
        boton.classList.add("pulsado");
        mensaje.textContent = "Botón pulsado";
    } else {
        boton.classList.remove("pulsado");
        mensaje.textContent = "";
    }
}


/**
 * Analiza el fotograma actual, muestra la posición de la punta del índice
 * y cambia el botón según el índice esté dentro o fuera.
 * Se vuelve a ejecutar en el siguiente fotograma mientras la cámara está activa.
 */
function detectarManoEnVideo() {
    // Solo analiza una imagen cuando el vídeo ha avanzado y el detector está listo.
    if (videoCamara.currentTime !== ultimoTiempoVideo && detectorManos) {
        ultimoTiempoVideo = videoCamara.currentTime;
        const resultados = detectorManos.detectForVideo(videoCamara, performance.now());


        // Si hay una mano, el punto 8 corresponde a la punta del dedo índice.
        if (resultados.landmarks && resultados.landmarks.length > 0) {
            const puntos = resultados.landmarks[0];//
            dibujarMano(puntos);
            const puntaIndice = resultados.landmarks[0][8];
            // MediaPipe entrega coordenadas entre 0 y 1; las convertimos a porcentajes.
            const posicionX = puntaIndice.x * 100;
            const posicionY = puntaIndice.y * 100;


            campoPosicion.textContent = `X: ${posicionX.toFixed(1)} %, Y: ${posicionY.toFixed(1)} %`;
            actualizarBoton(estaDentroDelBoton(posicionX, posicionY));


            //Aqui llamo al metodo de comprobar si la mano tiene la pose para hacer el color azul
            if (detectarGestoAzul(puntos)) {
                cambiarColorCaja("blue");
            }


            if (detectarGestoRojo(puntos)) {
                cambiarColorCaja("red");
            }

            if (detectarGestoVerde(puntos)) {
                cambiarColorCaja("green");
            }


            if (detectarGestoRosa(puntos)) {
                cambiarColorCaja("pink");
            }

            if (detectarGestoAmarillo(puntos)) {
                cambiarColorCaja("yellow");
            }


        } else {
            campoPosicion.textContent = "No se detecta ninguna mano";
            actualizarBoton(false);
            ctxPuntos.clearRect(
                0, 0, canvasPuntos.width, canvasPuntos.height);
        }
    }


    // Solicita analizar el siguiente fotograma de la cámara.
    requestAnimationFrame(detectarManoEnVideo);
}


function cambiarColorCaja(color) {
    cajaColor.style.backgroundColor = color;
}


function detectarGestoAzul(puntos) {
    const pulgarArriba = puntos[4].y < puntos[2].y;


    const indiceDoblado = puntos[8].y > puntos[6].y;
    const corazonDoblado = puntos[12].y > puntos[10].y;
    const anularDoblado = puntos[16].y > puntos[14].y;
    const meniqueDoblado = puntos[20].y > puntos[18].y;


    return pulgarArriba &&
        indiceDoblado &&
        corazonDoblado &&
        anularDoblado &&
        meniqueDoblado;
}


function detectarGestoRojo(puntos) {
    const pulgarArriba = puntos[4].y < puntos[2].y;


    const indiceArriba = puntos[8].y < puntos[6].y;
    const corazonArriba = puntos[12].y < puntos[10].y;
    const anularArriba = puntos[16].y < puntos[14].y;
    const meniqueArriba = puntos[20].y < puntos[18].y;


    return pulgarArriba &&
        indiceArriba &&
        corazonArriba &&
        anularArriba &&
        meniqueArriba;


}

// Une los puntos para dibujar el esqueleto de la mano.
function dibujarMano(puntos) {
    // Ajusta el canvas a la resolución del vídeo.
    canvasPuntos.width = videoCamara.videoWidth;
    canvasPuntos.height = videoCamara.videoHeight;

    ctxPuntos.clearRect(0, 0, canvasPuntos.width, canvasPuntos.height);

    // Conexiones entre los 21 puntos de la mano.
    const conexiones = [
        [0, 1], [1, 2], [2, 3], [3, 4],
        [0, 5], [5, 6], [6, 7], [7, 8],
        [5, 9], [9, 10], [10, 11], [11, 12],
        [9, 13], [13, 14], [14, 15], [15, 16],
        [13, 17], [17, 18], [18, 19], [19, 20],
        [0, 17]
    ];

    // Dibuja las líneas entre los puntos.
    ctxPuntos.strokeStyle = "lime";
    ctxPuntos.lineWidth = 3;

    for (const [inicio, fin] of conexiones) {
        ctxPuntos.beginPath();
        ctxPuntos.moveTo(
            puntos[inicio].x * canvasPuntos.width,
            puntos[inicio].y * canvasPuntos.height
        );
        ctxPuntos.lineTo(
            puntos[fin].x * canvasPuntos.width,
            puntos[fin].y * canvasPuntos.height
        );
        ctxPuntos.stroke();
    }

    // Dibuja los 21 puntos de referencia.
    ctxPuntos.fillStyle = "red";

    for (const punto of puntos) {
        ctxPuntos.beginPath();
        ctxPuntos.arc(
            punto.x * canvasPuntos.width,
            punto.y * canvasPuntos.height,
            5,
            0,
            Math.PI * 2
        );
        ctxPuntos.fill();
    }
}

function detectarGestoVerde(puntos) {
    const pulgarArriba = puntos[4].y < puntos[2].y;


    const indiceArriba = puntos[8].y < puntos[6].y;
    const corazonDoblado = puntos[12].y > puntos[10].y;
    const anularDoblado = puntos[16].y > puntos[14].y;
    const meniqueDoblado = puntos[20].y > puntos[18].y;


    return pulgarArriba &&
        indiceArriba &&
        corazonDoblado &&
        anularDoblado &&
        meniqueDoblado;


}


function detectarGestoRosa(puntos) {
    const pulgarArriba = puntos[4].y < puntos[2].y;


    const indiceArriba = puntos[8].y < puntos[6].y;
    const corazonArriba = puntos[12].y < puntos[10].y;
    const anularDoblado = puntos[16].y > puntos[14].y;
    const meniqueDoblado = puntos[20].y > puntos[18].y;


    return pulgarArriba &&
        indiceArriba &&
        corazonArriba &&
        anularDoblado &&
        meniqueDoblado;


}

function detectarGestoAmarillo(puntos) {
    const pulgarArriba = puntos[4].y < puntos[2].y;


    const indiceArriba = puntos[8].y < puntos[6].y;
    const corazonArriba = puntos[12].y < puntos[10].y;
    const anularDoblado = puntos[16].y < puntos[14].y;
    const meniqueDoblado = puntos[20].y > puntos[18].y;


    return pulgarArriba &&
        indiceArriba &&
        corazonArriba &&
        anularDoblado &&
        meniqueDoblado;


}


botonInicio.addEventListener("click", iniciarDeteccion);
