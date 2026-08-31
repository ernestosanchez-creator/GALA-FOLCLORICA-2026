# Script rápido para subir cambios a GitHub
# Uso: .\push.ps1

param(
    [string]$mensaje = "Actualización"
)

Write-Host "📤 Subiendo cambios a GitHub..." -ForegroundColor Cyan

& 'C:\Program Files\Git\cmd\git.exe' add .
& 'C:\Program Files\Git\cmd\git.exe' commit -m $mensaje
& 'C:\Program Files\Git\cmd\git.exe' push

Write-Host "`n✅ ¡Cambios subidos! Netlify se actualizará automáticamente en 1-2 minutos." -ForegroundColor Green
Write-Host "🔗 Ve a https://app.netlify.com para ver el progreso" -ForegroundColor Green
