"""
Script simple para generar prompts de forma rápida
Uso fácil desde línea de comandos
"""

import json
import sys
import random
from prompt_generator import PromptGenerator


def menu_interactivo():
    """Menú interactivo para generar prompts"""
    generator = PromptGenerator()
    
    print("="*60)
    print("  GENERADOR DE PROMPTS PARA IA - MODO INTERACTIVO")
    print("="*60)
    
    while True:
        print("\n¿Qué tipo de imagen quieres generar?")
        print("1. Con ropa")
        print("2. Sin ropa (artístico)")
        print("3. Generar lote de prompts con ropa")
        print("4. Generar lote de prompts sin ropa")
        print("5. Ver opciones disponibles")
        print("6. Salir")
        
        opcion = input("\nSelecciona una opción (1-6): ").strip()
        
        if opcion == "1":
            generar_individual(generator, clothed=True)
        elif opcion == "2":
            generar_individual(generator, clothed=False)
        elif opcion == "3":
            generar_lote(generator, clothed=True)
        elif opcion == "4":
            generar_lote(generator, clothed=False)
        elif opcion == "5":
            generator.list_options()
        elif opcion == "6":
            print("\n¡Hasta luego!")
            break
        else:
            print("\nOpción inválida. Intenta de nuevo.")


def generar_individual(generator: PromptGenerator, clothed: bool):
    """Genera un prompt individual"""
    print(f"\nGenerando prompt {'CON' if clothed else 'SIN'} ropa...\n")
    
    # Preguntar opciones adicionales
    wet = False
    clothing_type = None
    
    if not clothed:
        # Para sin ropa, preguntar si está mojada
        mojada = input("¿Quieres que esté mojada? (s/n): ").strip().lower()
        wet = (mojada == 's')
        
        # Preguntar por cobertura
        print("\nOpciones de cobertura:")
        print("1. Con toalla")
        print("2. Con sábana")
        print("3. Completamente desnuda")
        print("4. Aleatorio")
        
        cob = input("Selecciona (1-4): ").strip()
        if cob == "1":
            clothing_type = "towel"
        elif cob == "2":
            clothing_type = "bedsheet"
        elif cob == "3":
            clothing_type = "none_nude"
        else:
            clothing_type = random.choice(["towel", "bedsheet", "none_nude"])
    
    # Generar prompt
    custom_opts = {}
    if clothing_type:
        custom_opts['clothing'] = clothing_type
    
    prompt = generator.generate_prompt(
        clothed=clothed,
        wet=wet,
        custom_options=custom_opts if custom_opts else None,
        randomize=True
    )
    
    # Mostrar prompt
    print("\n" + "="*60)
    print("PROMPT GENERADO:")
    print("="*60)
    print(json.dumps(prompt, indent=2, ensure_ascii=False))
    
    # Preguntar si quiere guardar
    guardar = input("\n¿Guardar en archivo? (s/n): ").strip().lower()
    if guardar == 's':
        filename = input("Nombre del archivo (sin extensión): ").strip()
        if not filename:
            filename = f"prompt_{'clothed' if clothed else 'nude'}"
        filename = filename + ".json"
        generator.save_prompt(prompt, filename)
        print(f"\n✓ Prompt guardado en: {filename}")


def generar_lote(generator: PromptGenerator, clothed: bool):
    """Genera múltiples prompts"""
    cantidad = int(input("\n¿Cuántos prompts quieres generar?: ").strip())
    
    print(f"\nGenerando {cantidad} prompts {'CON' if clothed else 'SIN'} ropa...\n")
    
    prompts = generator.generate_batch(count=cantidad, clothed=clothed, randomize=True)
    
    # Guardar en archivo
    filename = f"batch_prompts_{'clothed' if clothed else 'nude'}_{cantidad}.json"
    generator.save_batch(prompts, filename)
    
    print(f"\n✓ {cantidad} prompts generados y guardados en: {filename}")
    
    # Mostrar vista previa del primero
    print("\nVista previa del primer prompt:")
    print("="*60)
    print(json.dumps(prompts[0], indent=2, ensure_ascii=False))


def generar_rapido(clothed: bool, cantidad: int = 1):
    """Generación rápida desde línea de comandos"""
    generator = PromptGenerator()
    
    if cantidad == 1:
        prompt = generator.generate_prompt(clothed=clothed, wet=False, randomize=True)
        print(json.dumps(prompt, indent=2, ensure_ascii=False))
        
        filename = f"prompt_{'clothed' if clothed else 'nude'}.json"
        generator.save_prompt(prompt, filename)
        print(f"\n✓ Guardado en: {filename}", file=sys.stderr)
    else:
        prompts = generator.generate_batch(count=cantidad, clothed=clothed, wet=False, randomize=True)
        filename = f"batch_prompts_{'clothed' if clothed else 'nude'}_{cantidad}.json"
        generator.save_batch(prompts, filename)
        print(f"✓ {cantidad} prompts guardados en: {filename}", file=sys.stderr)


if __name__ == "__main__":
    # Si se pasan argumentos por línea de comandos
    if len(sys.argv) > 1:
        comando = sys.argv[1].lower()
        
        if comando == "con-ropa" or comando == "clothed":
            cantidad = int(sys.argv[2]) if len(sys.argv) > 2 else 1
            generar_rapido(clothed=True, cantidad=cantidad)
        
        elif comando == "sin-ropa" or comando == "nude":
            cantidad = int(sys.argv[2]) if len(sys.argv) > 2 else 1
            generar_rapido(clothed=False, cantidad=cantidad)
        
        elif comando == "help" or comando == "--help":
            print("Uso:")
            print("  python generar_prompts.py                    # Modo interactivo")
            print("  python generar_prompts.py con-ropa [n]       # Genera n prompts con ropa")
            print("  python generar_prompts.py sin-ropa [n]       # Genera n prompts sin ropa")
            print("\nEjemplos:")
            print("  python generar_prompts.py con-ropa           # 1 prompt con ropa")
            print("  python generar_prompts.py con-ropa 5         # 5 prompts con ropa")
            print("  python generar_prompts.py sin-ropa 10        # 10 prompts sin ropa")
        
        else:
            print("Comando no reconocido. Usa 'help' para ver opciones.")
    
    else:
        # Modo interactivo
        menu_interactivo()
