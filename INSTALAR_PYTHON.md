# Guía de Instalación de Python en Windows

## Opción 1: Descarga desde el Sitio Oficial (Recomendado)

### Paso 1: Descargar Python
1. Ve a https://www.python.org/downloads/
2. Haz click en el botón amarillo "Download Python 3.x.x"
3. Se descargará el instalador ejecutable

### Paso 2: Ejecutar el Instalador
1. Abre el archivo descargado (python-x.x.x-amd64.exe)
2. **IMPORTANTE**: En la primera pantalla, marca la casilla "Add Python 3.x to PATH"
3. Elige "Install Now" (instalación regular)
4. Espera a que se complete la instalación

### Paso 3: Verificar la Instalación
1. Abre cmd (Presiona Windows + R, escribe "cmd" y Enter)
2. Ejecuta:
   ```
   python --version
   ```
3. Debería mostrar algo como "Python 3.12.1"

## Opción 2: Usando Windows Package Manager (winget)

Si tienes Windows 11 o Windows 10 con winget instalado:

```powershell
winget install Python.Python.3.12
```

## Opción 3: Usando Chocolatey

Si tienes Chocolatey instalado:

```powershell
choco install python
```

## Después de Instalar Python

### 1. Comproba que la carpeta está bien
```bash
cd "C:\Users\sergi\Documents\Program\PromptGeneratorPI"
```

### 2. Ejecuta el programa
Opción A - Doble click en `iniciar.bat`

Opción B - Desde línea de comandos:
```bash
python generar_prompts.py
```

## Solución de Problemas

### "Python no es reconocido como comando"
- Python no está en PATH
- Solución: Reinstala Python y marca "Add Python to PATH"

### El programa no abre
1. Abre PowerShell como administrador
2. Navega a la carpeta:
   ```
   cd "C:\Users\sergi\Documents\Program\PromptGeneratorPI"
   ```
3. Ejecuta:
   ```
   python generar_prompts.py
   ```

### Error de permisos
- Abre PowerShell/CMD como administrador
- Intenta nuevamente

## Información Adicional

- **Python 3.8+**: Compatible con este programa
- **Peso**: ~100 MB
- **Espacio en disco**: ~300-400 MB después de instalar
- **Tiempo de instalación**: 2-5 minutos

## ¿Necesitas Ayuda?

Si tienes problemas, prueba:
1. Reinstalar Python
2. Conectarte al https://discord.gg/python
3. Visitar https://stackoverflow.com

## Próximos Pasos

Una vez instalado Python:
1. Abre la carpeta `PromptGeneratorPI`
2. Haz doble click en `iniciar.bat`
3. ¡Empieza a generar prompts!
