const themeBtn = document.getElementById("themeBtn");
const moonIcon = document.getElementById("moonIcon");
const sunIcon = document.getElementById("sunIcon");
const openCvBtn = document.getElementById("openCvBtn");
const printBtn = document.getElementById("printBtn");

function toggleTheme() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  moonIcon.classList.toggle("hidden", isDark);
  sunIcon.classList.toggle("hidden", !isDark);
  themeBtn.setAttribute("aria-label", isDark ? "Activar modo claro" : "Activar modo isDark");
}

function openFullCv() {
  const newWindow = window.open("", "_blank");

  if (!newWindow) {
    showPopupWarning();
    return;
  }

  const basePath = window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1);
  const fullCv = document.getElementById("cvPreview").outerHTML;
  newWindow.document.write(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CV completo</title>
      <base href="${basePath}">
      <link rel="stylesheet" href="styles.css">
    </head>
    <body class="cv-window">
      ${fullCv}
      <div class="window-actions">
        <button type="button" class="btn primary" onclick="window.print()">Descargar PDF</button>
      </div>
    </body>
    </html>
  `);

  newWindow.document.close();
}

function showPopupWarning() {
  const previousWarning = document.querySelector(".popup-message");

  if (previousWarning) {
    previousWarning.remove();
  }

  const warning = document.createElement("p");
  warning.className = "popup-message";
  warning.textContent = "El navegador bloqueo la newWindow nueva. Habilita las newWindows emergentes para ver el CV completo.";
  document.querySelector(".preview-panel").appendChild(warning);
}


themeBtn.addEventListener("click", toggleTheme);
openCvBtn.addEventListener("click", openFullCv);
printBtn.addEventListener("click", () => window.print());

