@echo off
color 0B
cls

echo.
echo  ╔══════════════════════════════════════════════════════════╗
echo  ║                                                          ║
echo  ║         🎨 GENERADOR DE PROMPTS IA - SDXL 🖼️              ║
echo  ║                                                          ║
echo  ╚══════════════════════════════════════════════════════════╝
echo.
echo.
echo   [√] Abriendo interfaz web...
echo.

timeout /t 1 /nobreak >nul

cd /d "%~dp0"
start "" "docs\index.html"

echo   [√] Generador abierto en tu navegador
echo.
echo  ╔══════════════════════════════════════════════════════════╗
echo  ║                                                          ║
echo  ║   ✨ INTERFAZ ACTIVA                                     ║
echo  ║                                                          ║
echo  ║   • Selecciona estilo de persona y opciones              ║
echo  ║   • Click "Generar Prompts"                              ║
echo  ║   • Vota con 👍/👎 tus favoritos                         ║
echo  ║   • Copia los prompts que te gusten                      ║
echo  ║                                                          ║
echo  ╚══════════════════════════════════════════════════════════╝
echo.
echo   Presiona cualquier tecla para cerrar esta ventana...
pause >nul
