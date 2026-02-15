# 🌐 Interfaz Web - Generador de Prompts IA

## 🚀 Inicio Rápido

### **Opción 1: Doble Click (Más Fácil)**
1. Ve a la carpeta `PromptGeneratorPI`
2. Haz doble click en `iniciar_web.bat`
3. Espera a que se abra el navegador automáticamente o abre manualmente: http://localhost:5000

### **Opción 2: Línea de Comandos**
```bash
cd "C:\Users\sergi\Documents\Program\PromptGeneratorPI"
python app_web.py
```

Luego abre tu navegador en: **http://localhost:5000**

## ✨ Características de la Interfaz Web

### 📋 Panel de Control (Izquierda)
- **Tipo de Imagen**: Botones para elegir entre "Con Ropa" o "Sin Ropa"
- **Condición**: Solo para sin ropa - Seca o Mojada
- **Cobertura**: Solo para sin ropa - Toalla, Sábana, Lencería, etc.
- **Cantidad**: Genera de 1 a 50 prompts a la vez

### 📝 Panel de Resultados (Derecha)
- **Vista Previa**: Muestra el prompt generado inmediatamente
- **Botón Copiar Principal**: Copia todos los prompts (arriba a la derecha)
- **Botones Individuales**: 🆕 Cada prompt tiene su propio botón de copiar
- **Formato JSON**: Para 1 prompt - JSON formateado completo
- **Formato Lista**: Para múltiples prompts - Vista organizada con botones individuales
- **Ver JSON Completo**: Desplegable en cada prompt para ver todos los detalles

## 🎨 Cómo Usar

1. **Selecciona el tipo de imagen** (Con Ropa / Sin Ropa)
2. **Si es sin ropa:**
   - Elige si quieres que esté mojada o seca
   - Selecciona el tipo de cobertura
3. **Indica cuántos prompts** quieres generar (1-50)
4. **Click en "Generar Prompts"** ✨
5. **Copia el resultado** con el botón "Copiar" 📋
6. **¡Pega en tu aplicación de IA!** 🎉

## � Opciones de Copiado (🆕 MEJORADO)

### Para 1 Prompt:
- Aparece el JSON completo formateado
- Botón "📋 Copiar" arriba → Copia todo el prompt

### Para Múltiples Prompts (2+):
Tienes **2 formas** de copiar:

**Opción 1 - Copiar Individual:**
- Cada prompt tiene su **propio botón "📋 Copiar"**
- Click en el botón del prompt que te guste
- Se copia solo ese prompt en formato JSON completo

**Opción 2 - Copiar Todos:**
- Botón principal arriba: "📋 Copiar Todos (X)"
- Copia todos los prompts en un array JSON

**Bonus - Ver Detalles:**
- Click en "Ver JSON completo" en cualquier prompt
- Se despliega el JSON completo con todos los parámetros
- Puedes ver todo antes de copiar

### 💡 Ejemplo:
Generas 10 prompts → Revisas los resultados → Copias solo los 3 mejores usando los botones individuales 🎯

## �💡 Ventajas de la Interfaz Web

✅ **Más Cómodo**: No necesitas editar archivos JSON
✅ **Visual**: Ves el resultado inmediatamente
✅ **Copiar Rápido**: Múltiples opciones de copiado
✅ **🆕 Botones Individuales**: Copia solo los prompts que te gusten
✅ **Sin Archivos**: No crea archivos en tu disco
✅ **Múltiples Prompts**: Genera hasta 50 a la vez
✅ **Responsive**: Funciona en móvil y tablet también
✅ **Vista Previa**: Revisa antes de copiar

## 🔧 Requisitos

- Python 3.8+ (ya instalado ✅)
- Flask 3.0+ (se instala automáticamente)
- Navegador web moderno (Chrome, Firefox, Edge, Safari)

## 🛑 Detener el Servidor

Presiona **Ctrl + C** en la ventana de terminal donde está corriendo

## 🌍 Acceso desde Otros Dispositivos

Si quieres acceder desde tu móvil u otro dispositivo en la misma red:

1. Encuentra tu IP local: `ipconfig` (busca IPv4 Address)
2. Abre en el otro dispositivo: `http://TU_IP:5000`
   - Ejemplo: `http://192.168.1.100:5000`

## 🐛 Solución de Problemas

### La página no carga
- Verifica que el servidor esté corriendo
- Asegúrate de usar http://localhost:5000 (no https)
- Prueba con http://127.0.0.1:5000

### Error al generar prompts
- Verifica que `prompt_generator.py` esté en la misma carpeta
- Revisa la consola de terminal para ver errores específicos

### Puerto ocupado
Si el puerto 5000 está ocupado, edita `app_web.py` y cambia:
```python
app.run(debug=True, host='0.0.0.0', port=5000)
```
Por otro puerto como 5001, 8000, etc.

## 📱 Capturas de Pantalla

La interfaz incluye:
- 🎨 Diseño moderno con gradientes púrpura
- 📱 Responsive (se adapta a móviles)
- 🌙 Colores suaves y profesionales
- ✨ Animaciones suaves en botones

## 🔐 Seguridad

⚠️ **IMPORTANTE**: Esta aplicación corre en localhost (solo accesible desde tu computadora).
Si decides exponerla a internet, asegúrate de:
- Agregar autenticación
- Usar HTTPS
- Limitar el acceso

## 💻 Stack Técnico

- **Backend**: Python + Flask
- **Frontend**: HTML5 + CSS3 + JavaScript Vanilla
- **API**: RESTful JSON endpoints
- **Diseño**: Responsive, gradients, glassmorphism

## 🎯 Endpoints de la API

Si quieres integrar con otras aplicaciones:

```javascript
// Generar 1 prompt
POST /api/generate
Body: { "clothed": false, "wet": true, "clothing": "towel" }

// Generar múltiples
POST /api/generate_batch
Body: { "count": 10, "clothed": false, "wet": false }

// Obtener opciones
GET /api/options
```

## 📝 Notas

- Los prompts se generan en tiempo real
- No se guardan en archivos (solo se muestran)
- Puedes generar infinitos prompts sin límite
- Cada prompt es único y aleatorio

---

**¡Disfruta generando prompts para tu IA!** 🎨✨
