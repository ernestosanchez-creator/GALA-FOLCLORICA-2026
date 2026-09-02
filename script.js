// Estado global
let pdfDoc = null;
let currentPage = 1;
let totalPages = 0;
let pdfFileName = "definitivo.pdf";
const PDF_SCALE = 3.0;

// Elementos del DOM
const pdfCanvas = document.getElementById("pdfCanvas");
const ctx = pdfCanvas.getContext("2d");
const downloadBtn = document.getElementById("downloadBtn");

// Event Listeners
downloadBtn.addEventListener("click", downloadPdf);

// Cargar PDF automáticamente al iniciar
window.addEventListener("load", loadPdfFromUrl);

/**
 * Carga el PDF automáticamente desde la carpeta /pdf
 */
async function loadPdfFromUrl() {
  try {
    const response = await fetch(`./pdf/${pdfFileName}`);
    if (!response.ok) {
      throw new Error("No se encontró el documento PDF");
    }

    const arrayBuffer = await response.arrayBuffer();
    const typedarray = new Uint8Array(arrayBuffer);
    pdfDoc = await pdfjsLib.getDocument(typedarray).promise;
    totalPages = pdfDoc.numPages;

    currentPage = 1;
    renderPage(currentPage);
    downloadBtn.disabled = false;
  } catch (error) {
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

    const finalViewport = page.getViewport({ scale: PDF_SCALE });

    pdfCanvas.width = finalViewport.width;
    pdfCanvas.height = finalViewport.height;

    const renderContext = {
      canvasContext: ctx,
      viewport: finalViewport,
    };

    await page.render(renderContext).promise;
    currentPage = pageNum;
  } catch (error) {
    console.error("Error rendering page:", error);
  }
}

/**
 * Descarga el PDF
 */
function downloadPdf() {
  if (!pdfDoc) {
    console.error("No hay documento para descargar");
    return;
  }

  const link = document.createElement("a");
  link.href = `./pdf/${pdfFileName}`;
  link.download = pdfFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Inicialización
downloadBtn.disabled = true;
