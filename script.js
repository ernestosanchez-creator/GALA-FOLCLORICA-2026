// Estado global
let pdfDoc = null;
let currentPage = 1;
let totalPages = 0;
let pdfFileName = "Programa.pdf";
const PDF_SCALE = 3.0;
const MOBILE_SCALE = 0.75;

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
    pdfDoc = await pdfjsLib.getDocument(`./pdf/${pdfFileName}`).promise;
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

    const renderScale = window.matchMedia("(max-width: 768px)").matches
      ? MOBILE_SCALE
      : PDF_SCALE;
    const finalViewport = page.getViewport({ scale: renderScale });

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
  const link = document.createElement("a");
  link.href = `./pdf/${pdfFileName}`;
  link.download = pdfFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

downloadBtn.disabled = false;
