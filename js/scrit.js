const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Ajusta el tamaño del canvas a las dimensiones de la página
function resizeCanvas() {
  canvas.width = window.innerWidth; // Ancho de la ventana
  canvas.height = document.body.scrollHeight; // Altura de la ventana o del contenido
}

// Llama a esta función al cargar y redimensionar la página
window.addEventListener("DOMContentLoaded", () => {
  resizeCanvas();
  inicializarBolitas(); // Requiere que tengas esta función para inicializar tus bolitas
  animar(); // Inicia la animación
});

window.addEventListener("resize", () => {
  resizeCanvas(); // Ajusta el tamaño del canvas
  inicializarBolitas(); // Reinicia las bolitas para que no queden fuera del área visible
});

// Número de bolas y configuración
var numBolitas = 100;
const bolitas = [];
const radioBola = 4; // Radio de las bolitas
const colorBola ="rgb(22, 45, 63)"; // <---------------------Color de las bolitas

// Ajusta el número de bolitas dependiendo del tamaño de la ventana
function ajustarNumBolitas() {
  if (window.innerWidth < 768) { // Para pantallas pequeñas (móviles, tablets)
    numBolitas = 50; // Valor para pantallas pequeñas
  } else {
    numBolitas = 100; // Valor para pantallas grandes (escritorios)
  }
}

// Inicializa las bolitas
function inicializarBolitas() {
  bolitas.length = 0; // Vacía el arreglo para reiniciar
  ajustarNumBolitas(); // Ajusta el número de bolitas
  for (let i = 0; i < numBolitas; i++) {
    let x = Math.random() * (canvas.width - radioBola * 2) + radioBola;
    let y = Math.random() * (canvas.height - radioBola * 2) + radioBola;
    bolitas.push(new Bola(x, y)); // Asegúrate de que la clase Bola esté definida en bola.js
}
}

// Dibuja una línea entre dos bolitas
function dibujarLinea(bola1, bola2) {
  ctx.beginPath();
  ctx.moveTo(bola1.x, bola1.y);
  ctx.lineTo(bola2.x, bola2.y);
  ctx.strokeStyle = "rgb(11, 30, 46)";// <---------------------Color de las lineas//
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.closePath();
}

// Animación principal
function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibuja las bolitas
  for (let i = 0; i < bolitas.length; i++) {
    bolitas[i].dibujar();
    bolitas[i].mover();
  }

  // Dibuja las líneas entre bolitas cercanas
  for (let i = 0; i < bolitas.length; i++) {
    for (let j = i + 1; j < bolitas.length; j++) {
      let distancia = Math.sqrt(
        Math.pow(bolitas[i].x - bolitas[j].x, 2) +
        Math.pow(bolitas[i].y - bolitas[j].y, 2)
      );
      if (distancia < 200) {
        dibujarLinea(bolitas[i], bolitas[j]);
      }
    }
  }

  requestAnimationFrame(animar);
}

// Inicializa todo
function init() {
  resizeCanvas(); // Ajusta el tamaño del canvas
  inicializarBolitas(); // Crea las bolitas
  animar(); // Inicia la animación
}

// Ajusta el canvas y reinicia las bolitas al redimensionar la ventana
window.addEventListener("resize", () => {
  resizeCanvas();
  inicializarBolitas();
});

// Ejecuta la inicialización al cargar la página
init();
