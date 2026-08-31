// Estado global
let pdfDoc = null;
let currentPage = 1;
let totalPages = 0;
let pdfFileName = "documento.pdf";
let zoomLevel = 100; // Zoom en porcentaje
const MIN_ZOOM = 50;
const MAX_ZOOM = 300;
const ZOOM_STEP = 25;

// Elementos del DOM
const pdfCanvas = document.getElementById("pdfCanvas");
const ctx = pdfCanvas.getContext("2d");
const pageNumber = document.getElementById("pageNumber");
const totalPagesSpan = document.getElementById("totalPages");
const status = document.getElementById("status");

// Botones
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const downloadBtn = document.getElementById("downloadBtn");
const zoomInBtn = document.getElementById("zoomInBtn");
const zoomOutBtn = document.getElementById("zoomOutBtn");
const resetZoomBtn = document.getElementById("resetZoomBtn");
const zoomLevelSpan = document.getElementById("zoomLevel");

// Event Listeners
prevBtn.addEventListener("click", previousPage);
nextBtn.addEventListener("click", nextPage);
pageNumber.addEventListener("change", goToPage);
downloadBtn.addEventListener("click", downloadPdf);
zoomInBtn.addEventListener("click", zoomIn);
zoomOutBtn.addEventListener("click", zoomOut);
resetZoomBtn.addEventListener("click", resetZoom);

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") previousPage();
  if (e.key === "ArrowRight") nextPage();
  if (e.key === "+") zoomIn();
  if (e.key === "-") zoomOut();
});

// Cargar PDF automáticamente al iniciar
window.addEventListener("load", loadPdfFromUrl);

/**
 * Carga el PDF automáticamente desde la carpeta /pdf
 */
async function loadPdfFromUrl() {
  try {
    showStatus("Cargando documento de la Gala Folclórica...");

    const response = await fetch(`./pdf/${pdfFileName}`);
    if (!response.ok) {
      throw new Error("No se encontró el documento PDF");
    }

    const arrayBuffer = await response.arrayBuffer();
    const typedarray = new Uint8Array(arrayBuffer);
    pdfDoc = await pdfjsLib.getDocument(typedarray).promise;
    totalPages = pdfDoc.numPages;

    currentPage = 1;
    updatePageInfo();
    renderPage(currentPage);

    showSuccess("✅ Documento cargado correctamente");
  } catch (error) {
    showError(`Error al cargar el documento: ${error.message}`);
    console.error("Error loading PDF:", error);
  }
}

/**
 * Renderiza una página específica
 */
async function renderPage(pageNum) {
  if (!pdfDoc || pageNum < 1 || pageNum > totalPages) return;

  try {
    const page = await pdfDoc.getPage(pageNum);

    // Renderizar con zoom ajustado al contenedor
    const containerWidth = pdfCanvas.parentElement.clientWidth - 80;
    const viewport = page.getViewport({ scale: 2 });

    // Calcular escala para que quepa en el contenedor
    let scale = 1;
    if (viewport.width > containerWidth) {
      scale = containerWidth / viewport.width;
    }

    // Aplicar zoom
    scale = scale * (zoomLevel / 100);

    const finalViewport = page.getViewport({ scale: scale });

    pdfCanvas.width = finalViewport.width;
    pdfCanvas.height = finalViewport.height;

    const renderContext = {
      canvasContext: ctx,
      viewport: finalViewport,
    };

    await page.render(renderContext).promise;
    currentPage = pageNum;
    pageNumber.value = pageNum;
    updatePageInfo();
    updateButtonStates();

    showStatus(`Página ${pageNum} de ${totalPages}`);
  } catch (error) {
    showError(`Error al cargar la página: ${error.message}`);
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
 * Descarga el PDF
 */
function downloadPdf() {
  if (!pdfDoc) {
    showError("No hay documento para descargar");
    return;
  }

  const link = document.createElement("a");
  link.href = `./pdf/${pdfFileName}`;
  link.download = pdfFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showSuccess("✅ Descarga iniciada");
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

/**
 * Aumenta el zoom
 */
function zoomIn() {
  if (zoomLevel < MAX_ZOOM) {
    zoomLevel = Math.min(zoomLevel + ZOOM_STEP, MAX_ZOOM);
    updateZoomLevel();
    renderPage(currentPage);
  }
}

/**
 * Reduce el zoom
 */
function zoomOut() {
  if (zoomLevel > MIN_ZOOM) {
    zoomLevel = Math.max(zoomLevel - ZOOM_STEP, MIN_ZOOM);
    updateZoomLevel();
    renderPage(currentPage);
  }
}

/**
 * Resetea el zoom a 100%
 */
function resetZoom() {
  zoomLevel = 100;
  updateZoomLevel();
  renderPage(currentPage);
}

/**
 * Actualiza el display del nivel de zoom
 */
function updateZoomLevel() {
  zoomLevelSpan.textContent = `${zoomLevel}%`;
}

// Inicialización
updateButtonStates();
showStatus("Carga un PDF para comenzar");
updateZoomLevel();
