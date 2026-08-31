# Script para subir el proyecto a GitHub y Netlify
# ==========================================
# Ejecuta este script en PowerShell desde la carpeta PAGINAWEB

Write-Host "
╔════════════════════════════════════════════════════════════════╗
║     📤 SUBIR VISOR DE PDF A GITHUB Y NETLIFY                 ║
║                                                                ║
║  Este script automatiza todo el proceso. Solo necesitas       ║
║  tener Git instalado y estar autenticado en GitHub.          ║
╚════════════════════════════════════════════════════════════════╝
" -ForegroundColor Cyan

# 1. Pedir datos al usuario
Write-Host "`n¿Tienes Git instalado?" -ForegroundColor Yellow
$gitVersion = git --version 2>$null
if (-not $gitVersion) {
    Write-Host "❌ Git no está instalado. Descárgalo en: https://git-scm.com" -ForegroundColor Red
    exit
} else {
    Write-Host "✅ Git encontrado: $gitVersion" -ForegroundColor Green
}

# Pedir GitHub username
Write-Host "`n📝 Ingresa tu usuario de GitHub (sin @):" -ForegroundColor Cyan
$githubUser = Read-Host "GitHub user"

# Pedir nombre del repositorio
Write-Host "`n📝 Ingresa el nombre del repositorio en GitHub:" -ForegroundColor Cyan
Write-Host "   (probablemente 'visor-pdf' o similar)" -ForegroundColor Gray
$repoName = Read-Host "Nombre del repo"

$repoUrl = "https://github.com/$githubUser/$repoName.git"

Write-Host "`n✨ Va a subirse a: $repoUrl`n" -ForegroundColor Yellow

# 2. Inicializar Git
Write-Host "📦 Inicializando repositorio..." -ForegroundColor Cyan
git init
git config user.email "visor-pdf@local.dev"
git config user.name "Visor PDF Dev"

# 3. Agregar archivos
Write-Host "`n📄 Agregando archivos..." -ForegroundColor Cyan
git add .

# 4. Crear commit
Write-Host "`n💾 Creando commit..." -ForegroundColor Cyan
git commit -m "Initial commit: Visor de PDF funcional"

# 5. Agregar remote
Write-Host "`n🔗 Agregando GitHub como remoto..." -ForegroundColor Cyan
git branch -M main
git remote add origin $repoUrl

# 6. Push a GitHub
Write-Host "`n⬆️  Subiendo a GitHub (puede pedir autenticación)..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ ¡Código subido exitosamente a GitHub!" -ForegroundColor Green
    Write-Host "   Repositorio: $repoUrl`n" -ForegroundColor Green
    
    Write-Host "🚀 PRÓXIMO PASO - NETLIFY:`n" -ForegroundColor Cyan
    Write-Host "1. Ve a https://app.netlify.com" -ForegroundColor White
    Write-Host "2. Haz click en 'Import an existing project'" -ForegroundColor White
    Write-Host "3. Selecciona 'GitHub'" -ForegroundColor White
    Write-Host "4. Elige tu repositorio: $repoName" -ForegroundColor White
    Write-Host "5. Haz click en 'Deploy'" -ForegroundColor White
    Write-Host "6. Espera 1-2 minutos y ¡listo! Tendrás una URL pública 🌍" -ForegroundColor White
    Write-Host "7. Genera código QR en: https://www.qrcode-monkey.com" -ForegroundColor White
    
    Write-Host "`n📱 Después puedes compartir el código QR en redes, WhatsApp, etc." -ForegroundColor Green
} else {
    Write-Host "`n❌ Error al subir a GitHub." -ForegroundColor Red
    Write-Host "   Verifica que:" -ForegroundColor Yellow
    Write-Host "   - GitHub Desktop esté abierto o Git esté autenticado" -ForegroundColor Yellow
    Write-Host "   - El repositorio exista en https://github.com/$githubUser/$repoName" -ForegroundColor Yellow
    Write-Host "   - Tengas permisos para escribir en ese repositorio" -ForegroundColor Yellow
}

Write-Host "`n" -ForegroundColor Gray
Read-Host "Presiona Enter para cerrar"
