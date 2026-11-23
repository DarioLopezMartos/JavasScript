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

    //Aqui dibujamos el mapa de puntos que es algo opcional hecho por curiosidad y las tres comprobaciones para dibujar las distintas imagenes

    if (hayRostro) {
      const puntos = resultado.faceLandmarks[0];
      dibujarPuntosRostro(puntos);
      if (esAsustado(puntos)) dibujarImagen(imgAsustado, puntos);
      else if (esSonrisa(puntos)) dibujarImagen(imgSonrisa, puntos);
      else if (esTriste(puntos)) dibujarImagen(imgTriste, puntos);
    } else {
      ctxPuntos.clearRect(
        0, 0, canvasPuntos.width, canvasPuntos.height
      );
    }
  }

  requestAnimationFrame(detectarRostroEnVideo);
}

//Este metodo lo hemos buscado, es para ver los puntos de modelo, lo hemos dejado por curiosidad pero no es una modificación a tener en cuenta
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



//Aqui declaro las imagenes
const imgSonrisa = new Image();
imgSonrisa.src = "img/sonrisa.png";

const imgAsustado = new Image();
imgAsustado.src = "img/asustado.png";

const imgTriste = new Image();
imgTriste.src = "img/triste.png";

//Esta funcion es la encargada de dibujar la imagen centrada a la cara y un poco mas grande

function dibujarImagen(img, puntos) {
    const centroX = ((puntos[234].x + puntos[454].x) / 2) * canvasPuntos.width;
    const centroY = ((puntos[10].y + puntos[152].y) / 2) * canvasPuntos.height;
    const lado = (puntos[454].x - puntos[234].x) * canvasPuntos.width * 1.4;

    ctxPuntos.drawImage(img, centroX - lado / 2, centroY - lado / 2, lado, lado);
}


//Los metodos para comprobar la cara
function esSonrisa(puntos) {
    const centroLabios = (puntos[13].y + puntos[14].y) / 2;
    const altoCara = puntos[152].y - puntos[10].y;
    const margen = altoCara * 0.03;

    const izquierdaArriba = puntos[61].y < centroLabios - margen;
    const derechaArriba = puntos[291].y < centroLabios - margen;

    return izquierdaArriba && derechaArriba;
}

function esTriste(puntos) {
    const centroLabios = (puntos[13].y + puntos[14].y) / 2;
    const altoCara = puntos[152].y - puntos[10].y;
    const margen = altoCara * 0.01;   // antes 0.03

    const izquierdaAbajo = puntos[61].y > centroLabios + margen;
    const derechaAbajo = puntos[291].y > centroLabios + margen;

    return izquierdaAbajo && derechaAbajo;
}

function esAsustado(puntos) {
    const altoCara = puntos[152].y - puntos[10].y;

    const ojoIzquierdo = Math.abs(puntos[145].y - puntos[159].y);
    const ojoDerecho = Math.abs(puntos[374].y - puntos[386].y);
    const apertura = ((ojoIzquierdo + ojoDerecho) / 2) / altoCara;

    return apertura > 0.05;
}

botonInicio.addEventListener("click", iniciarDeteccion);