@echo off
cd /d "%~dp0"

cls
echo ===============================================
echo   GENERADOR DE PROMPTS IA - INTERFAZ WEB
echo ===============================================
echo.

REM Verificar Flask
python -m pip show Flask >nul 2>&1
if %errorlevel% neq 0 (
    echo Instalando Flask...
    python -m pip install Flask --quiet
    if %errorlevel% equ 0 (
        echo Flask instalado correctamente!
    ) else (
        echo Error al instalar Flask.
        pause
        exit /b 1
    )
) else (
    echo Flask OK!
)

echo.
echo Iniciando servidor...
echo.
echo ^> Abre tu navegador en: http://localhost:5000
echo.
echo Presiona Ctrl+C para detener el servidor
echo.
echo ===============================================
echo.

python app_web.py

pause
