# 🚀 Guía de Despliegue - Visor de PDF

## Opción 1: Netlify (Recomendado) ⭐

### Método Drag & Drop (Lo más fácil)

1. Ve a https://app.netlify.com
2. Si no tienes cuenta, regístrate (gratis)
3. Busca **"Deploy manually"** y arrastra tu carpeta `PAGINAWEB`
4. Netlify genera automáticamente una URL pública
5. Copia la URL y crea un código QR en https://www.qrcode-monkey.com

### Método GitHub (Para actualizaciones automáticas)

1. Crea repositorio en GitHub: `git init && git add . && git commit -m "Initial commit"`
2. Sube a GitHub
3. En Netlify, conecta tu GitHub y selecciona el repositorio
4. Netlify se actualiza automáticamente cuando hagas push
5. Copia la URL y crea código QR

---

## Opción 2: GitHub Pages

Si tienes GitHub:

1. Sube tu carpeta a `username.github.io/visor-pdf`
2. La URL será: `https://username.github.io/visor-pdf`

---

## Opción 3: Acceso Local (sin internet)

Solo personas en tu red WiFi:

```powershell
# En PowerShell, en la carpeta del proyecto:
python -m http.server 8000
# O si tienes Node.js:
npx http-server
```

Luego comparte: `http://[TU_IP_LOCAL]:8000` (ej: `http://192.168.1.100:8000`)

---

## 🎯 Resumen Rápido

| Método              | Tiempo | Alcance         | Dificultad   |
| ------------------- | ------ | --------------- | ------------ |
| Netlify Drag & Drop | 5 min  | Internet global | ⭐ Muy fácil |
| GitHub + Netlify    | 10 min | Internet global | ⭐⭐ Fácil   |
| Local (Live Server) | 1 min  | Solo tu red     | ⭐ Muy fácil |

---

## 💡 Consejos

- **Para compartir con código QR**: Usa Netlify (URL única y estable)
- **Para desarrollo**: Usa Live Server (más rápido, sin deploy)
- **Para versiones**: Usa GitHub + Netlify (historial completo)

¡Cualquier duda, me avisas! 🚀
