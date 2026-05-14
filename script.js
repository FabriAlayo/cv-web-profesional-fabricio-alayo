const campos = {
  foto: document.getElementById("foto"),
  nombre: document.getElementById("nombre"),
  profesion: document.getElementById("profesion"),
  email: document.getElementById("email"),
  telefono: document.getElementById("telefono"),
  ubicacion: document.getElementById("ubicacion"),
  perfil: document.getElementById("perfil"),
  experiencia: document.getElementById("experiencia"),
  estudios: document.getElementById("estudios"),
  habilidades: document.getElementById("habilidades"),
  idiomas: document.getElementById("idiomas")
};

const preview = {
  foto: document.getElementById("previewFoto"),
  iniciales: document.getElementById("previewIniciales"),
  nombre: document.getElementById("previewNombre"),
  profesion: document.getElementById("previewProfesion"),
  email: document.getElementById("previewEmail"),
  telefono: document.getElementById("previewTelefono"),
  ubicacion: document.getElementById("previewUbicacion"),
  perfil: document.getElementById("previewPerfil"),
  experiencia: document.getElementById("previewExperiencia"),
  estudios: document.getElementById("previewEstudios"),
  habilidades: document.getElementById("previewHabilidades"),
  idiomas: document.getElementById("previewIdiomas")
};

const themeBtn = document.getElementById("themeBtn");
const moonIcon = document.getElementById("moonIcon");
const sunIcon = document.getElementById("sunIcon");
const openCvBtn = document.getElementById("openCvBtn");
const printBtn = document.getElementById("printBtn");
const clearBtn = document.getElementById("clearBtn");

function texto(campo, base) {
  return campo.value.trim() || base;
}

function lineasALista(valor, textoBase) {
  const lineas = valor
    .split("\n")
    .map((linea) => linea.trim())
    .filter(Boolean);

  return lineas.length ? lineas : [textoBase];
}

function pintarLista(elemento, lineas) {
  elemento.innerHTML = "";

  lineas.forEach((linea) => {
    const item = document.createElement("li");
    item.textContent = linea;
    elemento.appendChild(item);
  });
}

function obtenerIniciales(nombre) {
  const partes = nombre.trim().split(" ").filter(Boolean);

  if (!partes.length) {
    return "CV";
  }

  return partes
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join("");
}

function actualizarCV() {
  preview.nombre.textContent = texto(campos.nombre, "Tu nombre");
  preview.profesion.textContent = texto(campos.profesion, "Tu profesion");
  preview.email.textContent = texto(campos.email, "correo@email.com");
  preview.telefono.textContent = texto(campos.telefono, "telefono");
  preview.ubicacion.textContent = texto(campos.ubicacion, "ubicacion");
  preview.perfil.textContent = texto(campos.perfil, "Aca va tu descripcion personal.");
  preview.iniciales.textContent = obtenerIniciales(campos.nombre.value);

  pintarLista(
    preview.experiencia,
    lineasALista(campos.experiencia.value, "Aca se muestra tu experiencia laboral.")
  );

  pintarLista(
    preview.estudios,
    lineasALista(campos.estudios.value, "Aca se muestran tus estudios.")
  );

  pintarLista(
    preview.habilidades,
    lineasALista(campos.habilidades.value, "Tus habilidades principales")
  );

  pintarLista(
    preview.idiomas,
    lineasALista(campos.idiomas.value, "Tus idiomas")
  );
}

function cargarFoto(evento) {
  const archivo = evento.target.files[0];

  if (!archivo) {
    preview.foto.style.display = "none";
    preview.foto.removeAttribute("src");
    preview.iniciales.style.display = "block";
    return;
  }

  const lector = new FileReader();

  lector.onload = () => {
    preview.foto.src = lector.result;
    preview.foto.style.display = "block";
    preview.iniciales.style.display = "none";
  };

  lector.readAsDataURL(archivo);
}

function alternarTema() {
  document.body.classList.toggle("dark");
  const oscuro = document.body.classList.contains("dark");
  moonIcon.classList.toggle("oculto", oscuro);
  sunIcon.classList.toggle("oculto", !oscuro);
  themeBtn.setAttribute("aria-label", oscuro ? "Activar modo claro" : "Activar modo oscuro");
}

function limpiarFormulario() {
  document.getElementById("cvForm").reset();
  preview.foto.style.display = "none";
  preview.foto.removeAttribute("src");
  preview.iniciales.style.display = "block";
  actualizarCV();
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

Object.values(campos).forEach((campo) => {
  if (campo.type !== "file") {
    campo.addEventListener("input", actualizarCV);
  }
});

campos.foto.addEventListener("change", cargarFoto);
themeBtn.addEventListener("click", alternarTema);
openCvBtn.addEventListener("click", abrirCVCompleto);
printBtn.addEventListener("click", () => window.print());
clearBtn.addEventListener("click", limpiarFormulario);

actualizarCV();
