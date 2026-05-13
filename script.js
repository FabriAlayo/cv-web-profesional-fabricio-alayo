const campos = {
  nombre: document.getElementById("nombre"),
  profesion: document.getElementById("profesion"),
  email: document.getElementById("email"),
  telefono: document.getElementById("telefono"),
  ubicacion: document.getElementById("ubicacion"),
  perfil: document.getElementById("perfil"),
  experiencia: document.getElementById("experiencia"),
  estudios: document.getElementById("estudios"),
  habilidades: document.getElementById("habilidades")
};

const preview = {
  nombre: document.getElementById("previewNombre"),
  profesion: document.getElementById("previewProfesion"),
  contacto: document.getElementById("previewContacto"),
  perfil: document.getElementById("previewPerfil"),
  experiencia: document.getElementById("previewExperiencia"),
  estudios: document.getElementById("previewEstudios"),
  habilidades: document.getElementById("previewHabilidades")
};

function obtenerTexto(campo, textoBase) {
  return campo.value.trim() || textoBase;
}

function actualizarCV() {
  preview.nombre.textContent = obtenerTexto(campos.nombre, "Tu nombre");
  preview.profesion.textContent = obtenerTexto(campos.profesion, "Tu profesion");

  const contacto = [
    campos.email.value.trim(),
    campos.telefono.value.trim(),
    campos.ubicacion.value.trim()
  ].filter(Boolean);

  preview.contacto.textContent = contacto.length
    ? contacto.join(" | ")
    : "correo@email.com | telefono | ubicacion";

  preview.perfil.textContent = obtenerTexto(campos.perfil, "Aca va tu descripcion personal.");
  preview.experiencia.textContent = obtenerTexto(campos.experiencia, "Aca se muestra tu experiencia laboral.");
  preview.estudios.textContent = obtenerTexto(campos.estudios, "Aca se muestran tus estudios.");
  preview.habilidades.textContent = obtenerTexto(campos.habilidades, "Aca se muestran tus habilidades.");
}

Object.values(campos).forEach((campo) => {
  campo.addEventListener("input", actualizarCV);
});
