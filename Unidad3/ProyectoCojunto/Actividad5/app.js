import {
  FaceLandmarker,
  FilesetResolver
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/vision_bundle.mjs";

const videoCamara = document.getElementById("videoCamara");
const botonInicio = document.getElementById("botonInicio");
const estado = document.getElementById("estado");
const canvasPuntos = document.getElementById("canvasPuntos");
const ctxPuntos = canvasPuntos.getContext("2d");

let detectorRostro;
let flujoCamara;
let ultimoTiempoVideo = -1;

async function iniciarDeteccion() {
  botonInicio.disabled = true;
  estado.textContent = "Solicitando acceso a la cámara...";

  try {
    flujoCamara = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480 }
    });
    videoCamara.srcObject = flujoCamara;
    await videoCamara.play();

    estado.textContent = "Cargando el detector de rostro...";
    const archivosVision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
    );
    detectorRostro = await FaceLandmarker.createFromOptions(archivosVision, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task"
      },
      runningMode: "VIDEO",
      numFaces: 1
    });

    estado.textContent = "Cámara activa: buscando un rostro.";
    requestAnimationFrame(detectarRostroEnVideo);
  } catch (errorInicio) {
    console.error(errorInicio);
    flujoCamara?.getTracks().forEach((pista) => pista.stop());
    flujoCamara = undefined;
    videoCamara.srcObject = null;
    detectorRostro?.close();
    detectorRostro = undefined;
    botonInicio.disabled = false;
    estado.textContent = "No se pudo iniciar. Comprueba el permiso de cámara, la conexión a Internet y que uses HTTPS o localhost.";
  }
}

function detectarRostroEnVideo() {
  if (videoCamara.currentTime !== ultimoTiempoVideo && detectorRostro) {
    ultimoTiempoVideo = videoCamara.currentTime;

    const resultado = detectorRostro.detectForVideo(
      videoCamara,
      performance.now()
    );

    const hayRostro = resultado.faceLandmarks.length > 0;

    estado.textContent = hayRostro
      ? "Rostro detectado"
      : "No se detecta un rostro";

    if (hayRostro) {
      dibujarPuntosRostro(resultado.faceLandmarks[0]);
    } else {
      ctxPuntos.clearRect(
        0, 0, canvasPuntos.width, canvasPuntos.height
      );
    }
  }

  requestAnimationFrame(detectarRostroEnVideo);
}

function dibujarPuntosRostro(puntos) {
  canvasPuntos.width = videoCamara.videoWidth;
  canvasPuntos.height = videoCamara.videoHeight;

  ctxPuntos.clearRect(
    0, 0, canvasPuntos.width, canvasPuntos.height
  );

  // Dibuja todos los puntos detectados en el rostro.
  ctxPuntos.fillStyle = "red";

  for (const punto of puntos) {
    ctxPuntos.beginPath();
    ctxPuntos.arc(
      punto.x * canvasPuntos.width,
      punto.y * canvasPuntos.height,
      1.5,
      0,
      Math.PI * 2
    );
    ctxPuntos.fill();
  }

  // Dibuja las conexiones del rostro proporcionadas por MediaPipe.
  const conexiones = FaceLandmarker.FACE_LANDMARKS_TESSELATION;

  ctxPuntos.strokeStyle = "lime";
  ctxPuntos.lineWidth = 0.5;

  for (const conexion of conexiones) {
    const inicio = puntos[conexion.start];
    const fin = puntos[conexion.end];

    ctxPuntos.beginPath();
    ctxPuntos.moveTo(
      inicio.x * canvasPuntos.width,
      inicio.y * canvasPuntos.height
    );
    ctxPuntos.lineTo(
      fin.x * canvasPuntos.width,
      fin.y * canvasPuntos.height
    );
    ctxPuntos.stroke();
  }
}

botonInicio.addEventListener("click", iniciarDeteccion);