"""
Aplicación web para el generador de prompts
Interfaz web simple y fácil de usar
"""

from flask import Flask, render_template, request, jsonify
import json
import sys
import os

# Añadir el directorio actual al path para importar prompt_generator
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prompt_generator import PromptGenerator

app = Flask(__name__)
generator = PromptGenerator()


@app.route('/')
def index():
    """Página principal"""
    return render_template('index.html')


@app.route('/api/generate', methods=['POST'])
def generate_prompt():
    """Generar un prompt según los parámetros"""
    try:
        data = request.json
        
        explicitness_level = data.get('explicitness_level', 0)
        clothed = data.get('clothed', True)
        wet = data.get('wet', False)
        clothing_type = data.get('clothing', None)
        facial_expression = data.get('facial_expression', 'random')
        camera_angle = data.get('camera_angle', 'random')
        scenario = data.get('scenario', 'random')
        location = data.get('location', 'random')
        
        custom_options = {}
        if clothing_type:
            custom_options['clothing'] = clothing_type
        if facial_expression and facial_expression != 'random':
            custom_options['facial_expression'] = facial_expression
        if camera_angle and camera_angle != 'random':
            custom_options['camera_angle'] = camera_angle
        if scenario and scenario != 'random':
            custom_options['scenario'] = scenario
        if location and location != 'random':
            custom_options['location'] = location
        
        prompt = generator.generate_prompt(
            clothed=clothed,
            wet=wet,
            custom_options=custom_options if custom_options else None,
            randomize=True,
            explicitness_level=explicitness_level
        )
        
        return jsonify({
            'success': True,
            'prompt': prompt
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/generate_batch', methods=['POST'])
def generate_batch():
    """Generar múltiples prompts"""
    try:
        data = request.json
        
        count = data.get('count', 1)
        explicitness_level = data.get('explicitness_level', 0)
        clothed = data.get('clothed', True)
        wet = data.get('wet', False)
        clothing_type = data.get('clothing', None)
        facial_expression = data.get('facial_expression', 'random')
        camera_angle = data.get('camera_angle', 'random')
        scenario = data.get('scenario', 'random')
        location = data.get('location', 'random')
        
        prompts = []
        for _ in range(count):
            custom_options = {}
            if clothing_type:
                custom_options['clothing'] = clothing_type
            if facial_expression and facial_expression != 'random':
                custom_options['facial_expression'] = facial_expression
            if camera_angle and camera_angle != 'random':
                custom_options['camera_angle'] = camera_angle
            if scenario and scenario != 'random':
                custom_options['scenario'] = scenario
            if location and location != 'random':
                custom_options['location'] = location
                
            is_wet = wet
            prompt = generator.generate_prompt(
                clothed=clothed,
                wet=is_wet,
                custom_options=custom_options if custom_options else None,
                randomize=True,
                explicitness_level=explicitness_level
            )
            prompts.append(prompt)
        
        return jsonify({
            'success': True,
            'prompts': prompts
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/options', methods=['GET'])
def get_options():
    """Obtener todas las opciones disponibles"""
    try:
        options = {
            'clothing_options': list(generator.clothing.keys()),
            'clothing_labels': generator.clothing,
            'person_base': generator.person_base,
            'backgrounds': generator.backgrounds,
            'poses_nude': generator.poses_nude
        }
        
        return jsonify({
            'success': True,
            'options': options
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


if __name__ == '__main__':
    print("\n" + "="*60)
    print("  GENERADOR DE PROMPTS IA - INTERFAZ WEB")
    print("="*60)
    print("\n🌐 Servidor iniciando...")
    print("📱 Abre tu navegador en: http://localhost:5000")
    print("⚡ Presiona Ctrl+C para detener el servidor\n")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
