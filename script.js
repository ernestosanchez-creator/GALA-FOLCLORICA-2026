// Estado global
let pdfDoc = null;
let currentPage = 1;
let totalPages = 0;
let zoomLevel = 1;
let currentPdfFile = null;

// Elementos del DOM
const pdfCanvas = document.getElementById("pdfCanvas");
const ctx = pdfCanvas.getContext("2d");
const pdfFile = document.getElementById("pdfFile");
const fileName = document.getElementById("fileName");
const pageNumber = document.getElementById("pageNumber");
const totalPagesSpan = document.getElementById("totalPages");
const status = document.getElementById("status");

// Botones
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const zoomInBtn = document.getElementById("zoomInBtn");
const zoomOutBtn = document.getElementById("zoomOutBtn");
const zoomResetBtn = document.getElementById("zoomResetBtn");
const downloadBtn = document.getElementById("downloadBtn");

// Event Listeners
pdfFile.addEventListener("change", handleFileSelect);
prevBtn.addEventListener("click", previousPage);
nextBtn.addEventListener("click", nextPage);
pageNumber.addEventListener("change", goToPage);
zoomInBtn.addEventListener("click", () => zoomPdf(1.2));
zoomOutBtn.addEventListener("click", () => zoomPdf(0.8));
zoomResetBtn.addEventListener("click", resetZoom);
downloadBtn.addEventListener("click", downloadPdf);

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") previousPage();
  if (e.key === "ArrowRight") nextPage();
  if (e.key === "+" || e.key === "=") zoomPdf(1.2);
  if (e.key === "-") zoomPdf(0.8);
});

/**
 * Maneja la selección de archivo PDF
 */
async function handleFileSelect(e) {
  const file = e.target.files[0];

  if (!file) return;

  if (file.type !== "application/pdf") {
    showError("Por favor, selecciona un archivo PDF válido");
    return;
  }

  currentPdfFile = file;
  fileName.textContent = `📄 ${file.name}`;

  const fileReader = new FileReader();

  fileReader.onload = async (event) => {
    try {
      showStatus("Cargando PDF...");

      const typedarray = new Uint8Array(event.target.result);
      pdfDoc = await pdfjsLib.getDocument(typedarray).promise;
      totalPages = pdfDoc.numPages;

      currentPage = 1;
      zoomLevel = 1;

      updatePageInfo();
      renderPage(currentPage);

      showSuccess("PDF cargado correctamente");
    } catch (error) {
      showError(`Error al cargar el PDF: ${error.message}`);
      console.error("Error loading PDF:", error);
    }
  };

  fileReader.onerror = () => {
    showError("Error al leer el archivo");
  };

  fileReader.readAsArrayBuffer(file);
}

/**
 * Renderiza una página específica
 */
async function renderPage(pageNum) {
  if (!pdfDoc || pageNum < 1 || pageNum > totalPages) return;

  try {
    const page = await pdfDoc.getPage(pageNum);

    // Configurar el viewport
    const baseViewport = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({ scale: zoomLevel });

    // Ajustar el canvas
    pdfCanvas.width = viewport.width;
    pdfCanvas.height = viewport.height;

    // Renderizar
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport,
    };

    await page.render(renderContext).promise;
    currentPage = pageNum;
    pageNumber.value = pageNum;
    updatePageInfo();
    updateButtonStates();

    showStatus(`Página ${pageNum} de ${totalPages}`);
  } catch (error) {
    showError(`Error al renderizar la página: ${error.message}`);
    console.error("Error rendering page:", error);
  }
}

/**
 * Navega a la página anterior
 */
function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
  }
}

/**
 * Navega a la página siguiente
 */
function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    renderPage(currentPage);
  }
}

/**
 * Va a una página específica
 */
function goToPage() {
  const page = parseInt(pageNumber.value);
  if (page >= 1 && page <= totalPages) {
    renderPage(page);
  } else {
    pageNumber.value = currentPage;
    showError(`Por favor, ingresa una página entre 1 y ${totalPages}`);
  }
}

/**
 * Aplica zoom al PDF
 */
function zoomPdf(factor) {
  if (!pdfDoc) return;

  const newZoom = zoomLevel * factor;
  if (newZoom >= 0.5 && newZoom <= 3) {
    zoomLevel = newZoom;
    renderPage(currentPage);
  } else {
    showError("Nivel de zoom no válido");
  }
}

/**
 * Reinicia el zoom
 */
function resetZoom() {
  zoomLevel = 1;
  renderPage(currentPage);
  showStatus("Zoom reiniciado");
}

/**
 * Descarga el PDF
 */
function downloadPdf() {
  if (!currentPdfFile) {
    showError("No hay PDF cargado para descargar");
    return;
  }

  const url = URL.createObjectURL(currentPdfFile);
  const link = document.createElement("a");
  link.href = url;
  link.download = currentPdfFile.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showSuccess("Descarga iniciada");
}

/**
 * Actualiza la información de la página
 */
function updatePageInfo() {
  if (totalPages > 0) {
    totalPagesSpan.textContent = `/ ${totalPages}`;
    pageNumber.max = totalPages;
    pageNumber.value = currentPage;
  }
}

/**
 * Actualiza el estado de los botones
 */
function updateButtonStates() {
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
  downloadBtn.disabled = !pdfDoc;
}

/**
 * Muestra un mensaje de estado
 */
function showStatus(message) {
  status.textContent = message;
  status.className = "";
}

/**
 * Muestra un mensaje de error
 */
function showError(message) {
  status.textContent = "❌ " + message;
  status.className = "error";
  console.error(message);
}

/**
 * Muestra un mensaje de éxito
 */
function showSuccess(message) {
  status.textContent = "✅ " + message;
  status.className = "success";
}

// Inicialización
updateButtonStates();
showStatus("Carga un PDF para comenzar");
