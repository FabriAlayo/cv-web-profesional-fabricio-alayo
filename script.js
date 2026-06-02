const themeBtn = document.getElementById("themeBtn");
const moonIcon = document.getElementById("moonIcon");
const sunIcon = document.getElementById("sunIcon");
const openCvBtn = document.getElementById("openCvBtn");
const printBtn = document.getElementById("printBtn");

function alternarTema() {
  document.body.classList.toggle("dark");
  const oscuro = document.body.classList.contains("dark");
  moonIcon.classList.toggle("oculto", oscuro);
  sunIcon.classList.toggle("oculto", !oscuro);
  themeBtn.setAttribute("aria-label", oscuro ? "Activar modo claro" : "Activar modo oscuro");
}

function abrirCVCompleto() {
  const ventana = window.open("", "_blank");

  if (!ventana) {
    mostrarAvisoPopup();
    return;
  }

  const rutaBase = window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1);
  const cvCompleto = document.getElementById("cvPreview").outerHTML;
  ventana.document.write(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CV completo</title>
      <base href="${rutaBase}">
      <link rel="stylesheet" href="styles.css">
    </head>
    <body class="ventana-cv">
      ${cvCompleto}
      <div class="acciones-ventana">
        <button type="button" class="btn primario" onclick="window.print()">Descargar PDF</button>
      </div>
    </body>
    </html>
  `);

  ventana.document.close();
}

function mostrarAvisoPopup() {
  const avisoAnterior = document.querySelector(".mensaje-popup");

  if (avisoAnterior) {
    avisoAnterior.remove();
  }

  const aviso = document.createElement("p");
  aviso.className = "mensaje-popup";
  aviso.textContent = "El navegador bloqueo la ventana nueva. Habilita las ventanas emergentes para ver el CV completo.";
  document.querySelector(".preview-panel").appendChild(aviso);
}


themeBtn.addEventListener("click", alternarTema);
openCvBtn.addEventListener("click", abrirCVCompleto);
printBtn.addEventListener("click", () => window.print());

