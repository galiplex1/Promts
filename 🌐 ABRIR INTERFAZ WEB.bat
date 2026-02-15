@echo off
color 0B
cls

echo.
echo  ╔══════════════════════════════════════════════════════════╗
echo  ║                                                          ║
echo  ║         🎨 GENERADOR DE PROMPTS IA - WEB 🌐              ║
echo  ║                                                          ║
echo  ╚══════════════════════════════════════════════════════════╝
echo.
echo.
echo   [√] Python 3.12.10 instalado
echo.

REM Verificar Flask
python -m pip show Flask >nul 2>&1
if %errorlevel% neq 0 (
    echo   [!] Instalando Flask...
    python -m pip install Flask --quiet >nul 2>&1
    echo   [√] Flask instalado
) else (
    echo   [√] Flask instalado
)

echo.
echo   Iniciando servidor web...
echo.

timeout /t 2 /nobreak >nul

start /B python app_web.py

echo   [√] Servidor iniciado
echo.
timeout /t 3 /nobreak >nul

echo   [√] Abriendo navegador...
start http://localhost:5000

echo.
echo  ╔══════════════════════════════════════════════════════════╗
echo  ║                                                          ║
echo  ║   ✨ INTERFAZ WEB ACTIVA en http://localhost:5000        ║
echo  ║                                                          ║
echo  ║   • Selecciona opciones                                  ║
echo  ║   • Click "Generar Prompts"                              ║
echo  ║   • Click "Copiar" para copiar al portapapeles           ║
echo  ║                                                          ║
echo  ╚══════════════════════════════════════════════════════════╝
echo.
echo.
echo   Presiona cualquier tecla para DETENER el servidor...
pause >nul

taskkill /F /FI "WINDOWTITLE eq *python*app_web.py*" >nul 2>&1
taskkill /F /FI "IMAGENAME eq python.exe" /FI "MEMUSAGE gt 30000" >nul 2>&1

echo.
echo   [√] Servidor detenido
timeout /t 2 /nobreak >nul
