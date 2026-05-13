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
  themeBtn.textContent = oscuro ? "Modo claro" : "Modo oscuro";
}

function limpiarFormulario() {
  document.getElementById("cvForm").reset();
  preview.foto.style.display = "none";
  preview.foto.removeAttribute("src");
  preview.iniciales.style.display = "block";
  actualizarCV();
}

Object.values(campos).forEach((campo) => {
  if (campo.type !== "file") {
    campo.addEventListener("input", actualizarCV);
  }
});

campos.foto.addEventListener("change", cargarFoto);
themeBtn.addEventListener("click", alternarTema);
printBtn.addEventListener("click", () => window.print());
clearBtn.addEventListener("click", limpiarFormulario);

actualizarCV();
