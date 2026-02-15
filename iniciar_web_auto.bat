@echo off
cd /d "%~dp0"

echo ===============================================
echo   GENERADOR DE PROMPTS IA - INTERFAZ WEB
echo ===============================================
echo.
echo [1/3] Verificando Flask...

python -m pip show Flask >nul 2>&1
if %errorlevel% neq 0 (
    echo Flask no encontrado. Instalando...
    python -m pip install Flask --quiet
    echo Flask instalado correctamente!
) else (
    echo Flask ya esta instalado!
)

echo.
echo [2/3] Iniciando servidor web...
echo.

start /B python app_web.py

timeout /t 3 /nobreak >nul

echo [3/3] Abriendo navegador...
start http://localhost:5000

echo.
echo ===============================================
echo   SERVIDOR ACTIVO en http://localhost:5000
echo ===============================================
echo.
echo Presiona cualquier tecla para detener el servidor...
pause >nul

echo.
echo Cerrando servidor...
taskkill /F /IM python.exe /FI "WINDOWTITLE eq app_web.py*" >nul 2>&1
echo Servidor detenido.
