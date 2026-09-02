# 📄 Visor de PDF - Página Web Interactiva

Una aplicación web moderna para visualizar, navegar y descargar archivos PDF de múltiples páginas. Construida con HTML5, CSS3 y JavaScript vanilla.

## ✨ Características

- 📖 **Visualización de PDF** - Carga y visualiza PDFs de múltiples páginas
- ⬅️➡️ **Navegación** - Navega entre páginas con botones o teclado
- 🔍 **Control de Zoom** - Aumenta, disminuye o reinicia el nivel de zoom
- ⬇️ **Descarga** - Descarga el PDF original
- ⌨️ **Atajos de Teclado** - Controla con flechas y teclas de zoom
- 📱 **Responsive** - Funciona perfectamente en desktop, tablet y móvil
- 🎨 **Interfaz Moderna** - Diseño limpio y profesional

## 🚀 Inicio Rápido

### Requisitos

- Live Server (extensión VS Code)
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Un archivo PDF para visualizar

### Instalación

1. **Clona o descarga el proyecto**

   ```bash
   git clone <tu-repo>
   cd PAGINAWEB
   ```

2. **Abre en VS Code**

   ```bash
   code .
   ```

3. **Inicia Live Server**
   - Click derecho en `index.html`
   - Selecciona "Open with Live Server"
   - Se abrirá automáticamente en tu navegador

4. **Carga un PDF**
   - Haz click en "Seleccionar PDF"
   - Elige un archivo PDF de tu computadora
   - ¡La página se actualizará automáticamente!

## 📖 Uso

### Controles de Mouse

- **Botón "Anterior"** - Ir a la página anterior
- **Botón "Siguiente"** - Ir a la página siguiente
- **Campo de página** - Escribe el número de página y presiona Enter
- **Botón "Zoom +"** - Aumentar zoom 20%
- **Botón "Zoom -"** - Reducir zoom 20%
- **Botón "Reset"** - Volver al zoom normal (100%)
- **Botón "Descargar"** - Descargar el PDF original

### Atajos de Teclado

| Tecla                  | Acción           |
| ---------------------- | ---------------- |
| `←` (Flecha Izquierda) | Página anterior  |
| `→` (Flecha Derecha)   | Página siguiente |
| `+` o `=`              | Aumentar zoom    |
| `-`                    | Reducir zoom     |

## 📁 Estructura del Proyecto

```
PAGINAWEB/
├── index.html          # Archivo principal HTML
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
├── README.md           # Este archivo
├── pdf/                # Carpeta para archivos PDF (opcional)
└── assets/             # Carpeta para otros recursos
    └── (imágenes, etc)
```

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Diseño responsive con variables CSS
- **JavaScript ES6+** - Lógica y manipulación del DOM
- **PDF.js** - Librería de Mozilla para renderizar PDFs
- **Live Server** - Servidor de desarrollo local

## 🎯 Funcionalidades Detalladas

### Carga de PDF

- Soporta archivos PDF en formato local
- Valida que el archivo sea realmente un PDF
- Muestra el nombre del archivo cargado

### Navegación

- Navega página a página
- Entrada directa a página específica
- Botones deshabilitados en primeras/últimas páginas
- Información clara: página actual / total

### Zoom

- Rangos: 50% a 300% (0.5x a 3x)
- Incrementos de 20% por click
- Botón de reinicio para volver a 100%
- Renderizado automático después de cambiar zoom

### Descarga

- Descarga el PDF original
- Mantiene el nombre original del archivo
- Disponible solo después de cargar un PDF

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `styles.css`:

```css
:root {
  --primary-color: #2563eb; /* Azul primario */
  --primary-dark: #1e40af; /* Azul oscuro */
  --success-color: #10b981; /* Verde éxito */
  --danger-color: #ef4444; /* Rojo error */
  /* ... más variables ... */
}
```

### Agregar PDFs por Defecto

Modifica `script.js` para cargar un PDF automáticamente:

```javascript
window.addEventListener("load", () => {
  fetch("pdf/Programa.pdf")
    .then((res) => res.arrayBuffer())
    .then((data) => loadPdfFromArray(data));
});
```

## 📱 Responsive Design

- **Desktop** (1024px+) - Interfaz completa
- **Tablet** (768px - 1024px) - Adaptado a pantalla media
- **Móvil** (< 768px) - Botones apilados, interfaz optimizada

## 🐛 Solución de Problemas

### El PDF no se carga

- Verifica que sea un archivo PDF válido
- Comprueba la consola del navegador (F12) para errores
- Intenta con otro PDF

### Los botones no funcionan

- Asegúrate de haber cargado un PDF primero
- Actualiza la página (F5)
- Limpia el caché del navegador

### El zoom no funciona correctamente

- Prueba el botón "Reset" primero
- Verifica que el PDF se haya cargado correctamente

### Live Server no se inicia

- Instala la extensión "Live Server" de Ritwick Dey
- Asegúrate de hacer click derecho en `index.html`
- Reinicia VS Code si es necesario

## 🔒 Seguridad

- Solo procesa archivos PDF locales
- No sube archivos a servidores externos
- Usa PDF.js (librería segura de Mozilla)
- Todo se ejecuta en el navegador del cliente

## 📄 Licencia

Este proyecto es de código abierto y libre para usar, modificar y distribuir.

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📧 Soporte

¿Tienes problemas o sugerencias?

- Abre un issue en GitHub
- Revisa la documentación de PDF.js: https://mozilla.github.io/pdf.js/

---

**¡Disfruta visualizando tus PDFs!** 📖✨
