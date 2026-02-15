# Generador Automático de Prompts para IA (SDXL)

Sistema para generar prompts automáticamente para tu modelo de IA de OnlyFans. Permite crear prompts con o sin ropa, con variaciones automáticas de ambientes, poses, iluminación, etc.

## 🚀 Características

- ✨ **NUEVA: Interfaz Web visual y moderna**
- ✅ Generación automática de prompts con formato SDXL
- ✅ Modo CON ROPA y SIN ROPA
- ✅ Variaciones de ambientes, poses, iluminación y calidad
- ✅ Opción de imagen "mojada" o "seca"
- ✅ Control de cobertura (toalla, sábana, completamente desnuda)
- ✅ Generación individual o por lotes (hasta 50)
- ✅ Copiar prompts al portapapeles con un click
- ✅ Exportación a JSON (línea de comandos)

## 📋 Formato de Salida

El sistema genera prompts en este formato:

```json
{
  "model": "sdxl_base_1.0",
  "positive_prompt": "nude of a wet confident young woman, a photo taken with an iPhone, soft diffused lighting, ...",
  "negative_prompt": "spread legs, explicit anatomy focus, low quality, blurry, ...",
  "steps": 30,
  "cfg": 6.5,
  "sampler": "dpmpp_2m_sde",
  "scheduler": "karras",
  "width": 832,
  "height": 1216,
  "seed": -1,
  "clip_skip": 2
}
```

## 🎯 Uso Rápido

### 🌐 Interfaz Web (RECOMENDADO - ¡NUEVO!)

La forma más cómoda de generar prompts:

**Windows - Doble Click:**
```batch
iniciar_web.bat          # Abre el navegador manualmente
iniciar_web_auto.bat     # Abre el navegador automáticamente
```

**Línea de Comandos:**
```bash
python app_web.py
```

Luego abre tu navegador en: **http://localhost:5000**

**Características:**
- ✨ Interfaz visual moderna y atractiva
- 📋 Botón para copiar prompts al portapapeles
- 🎨 Genera de 1 a 50 prompts a la vez
- 👀 Ve el resultado inmediatamente
- 📱 Funciona en móvil, tablet y desktop

### 💻 Línea de Comandos

#### Modo Interactivo

```bash
python generar_prompts.py
```

O en Windows - Doble Click en `iniciar.bat`

Se abrirá un menú donde puedes:
1. Generar prompt individual con ropa
2. Generar prompt individual sin ropa
3. Generar lote de prompts con ropa
4. Generar lote de prompts sin ropa
5. Ver opciones disponibles

#### Línea de Comandos

```bash
# Generar 1 prompt con ropa
python generar_prompts.py con-ropa

# Generar 5 prompts con ropa
python generar_prompts.py con-ropa 5

# Generar 1 prompt sin ropa
python generar_prompts.py sin-ropa

# Generar 10 prompts sin ropa
python generar_prompts.py sin-ropa 10
```

## 💻 Uso Avanzado (Python)

### Ejemplo Básico

```python
from prompt_generator import PromptGenerator

# Crear instancia
generator = PromptGenerator()

# Generar prompt sin ropa (mojada, con toalla)
prompt = generator.generate_prompt(
    clothed=False,
    wet=True,
    custom_options={'clothing': 'towel'},
    randomize=True
)

# Guardar en archivo
generator.save_prompt(prompt, "mi_prompt.json")
```

### Generar Múltiples Prompts

```python
# Generar 10 prompts sin ropa, variados
prompts = generator.generate_batch(
    count=10,
    clothed=False,
    wet=False,
    randomize=True
)

# Guardar lote
generator.save_batch(prompts, "mis_prompts.json")
```

### Opciones Personalizadas

```python
# Prompt sin ropa, seca, sin cobertura
prompt = generator.generate_prompt(
    clothed=False,
    wet=False,
    custom_options={'clothing': 'none_nude'},
    randomize=True
)

# Prompt con ropa, mojada
prompt = generator.generate_prompt(
    clothed=True,
    wet=True,
    randomize=True
)
```

## 🎨 Opciones Disponibles

### Para Imágenes SIN ROPA

**Condiciones:**
- `wet` - Mojada
- `dry` - Seca (normal)
- `sweaty` - Sudorosa
- `oiled` - Con aceite

**Cobertura:**
- `towel` - Con toalla
- `bedsheet` - Con sábana
- `lingerie` - Con lencería
- `none_nude` - Completamente desnuda

**Modificadores de Cuerpo:**
- Natural body proportions
- Natural body proportions, enormous breast
- Natural body proportions, large breast
- Athletic build, toned body
- Curvy body, natural proportions
- Slim body, natural proportions

**Poses:**
- Sexy pose
- Sexual pose
- Sensual pose
- Seductive pose
- Provocative pose
- Intimate pose

### Para Imágenes CON ROPA

**Ropa:**
- Casual home outfit
- Sports bra and leggings
- Crop top and shorts
- Tight dress
- Casual summer dress
- Fitted tank top and jeans
- Oversized shirt

### Ambientes (Ambos Modos)

- Bedroom background
- Bathroom background
- Bedroom background with mirror
- Luxury bedroom background
- Hotel room background
- Modern apartment background
- Cozy bedroom setting

## 📊 Ver Todas las Opciones

```python
from prompt_generator import PromptGenerator

generator = PromptGenerator()
generator.list_options()
```

O en modo interactivo:
```bash
python generar_prompts.py
# Seleccionar opción 5
```

## 📁 Estructura de Carpetas

```
PromptGeneratorPI/
├── prompt_generator.py      # Clase principal con toda la lógica
├── generar_prompts.py       # Script interactivo (línea de comandos)
├── app_web.py               # Servidor web Flask (interfaz web)
├── iniciar.bat              # Atajo para línea de comandos
├── iniciar_web.bat          # Atajo para interfaz web
├── iniciar_web_auto.bat     # Atajo web + abre navegador automático
├── requirements.txt         # Dependencias (Flask)
├── README.md                # Documentación principal
├── README_WEB.md            # Documentación interfaz web
├── INSTALAR_PYTHON.md       # Guía de instalación de Python
├── templates/
│   └── index.html           # Interfaz web HTML
└── prompts/                 # Carpeta para guardar prompts (opcional)
```

## 🔧 Personalización

Puedes modificar las variables en `prompt_generator.py` para agregar más opciones:

- `person_base` - Descripciones base de persona
- `body_modifiers_nude` - Modificadores de cuerpo
- `poses_nude` - Poses disponibles
- `clothing` - Opciones de cobertura
- `clothing_full` - Ropa completa
- `backgrounds` - Fondos/ambientes
- `lighting` - Tipos de iluminación
- `technical_composition` - Configuraciones técnicas de cámara

## 💡 Ejemplos de Uso Real

### Para Publicaciones de Instagram/TikTok (CON ROPA)

```bash
python generar_prompts.py con-ropa 20
```

Genera 20 prompts variados con ropa para contenido de redes sociales.

### Para OnlyFans Premium (SIN ROPA)

```bash
python generar_prompts.py sin-ropa 50
```

Genera 50 prompts sin ropa para contenido premium.

### Contenido Específico en Python

```python
from prompt_generator import PromptGenerator

generator = PromptGenerator()

# Contenido "recién salida de la ducha"
for i in range(10):
    prompt = generator.generate_prompt(
        clothed=False,
        wet=True,
        custom_options={'clothing': 'towel'},
        randomize=True
    )
    generator.save_prompt(prompt, f"shower_content_{i+1}.json")
```

## 📝 Notas

- El sistema genera prompts aleatorios pero coherentes
- Todos los prompts están optimizados para SDXL base 1.0
- Los negative prompts están diseñados para evitar contenido de baja calidad
- El seed está configurado en -1 para generación aleatoria (puedes cambiarlo en el código)

## 🚨 Importante

Este sistema está diseñado para generación de contenido artístico adulto. Úsalo de manera responsable y respetando todas las leyes aplicables.
