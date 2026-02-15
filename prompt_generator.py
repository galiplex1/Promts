"""
Generador automático de prompts para modelo de IA (SDXL)
Permite generar prompts con o sin ropa y con variaciones automáticas
"""

import json
import random
from typing import Dict, List, Optional
from dataclasses import dataclass


@dataclass
class PromptConfig:
    """Configuración para generación de prompts"""
    model: str = "sdxl_base_1.0"
    steps: int = 30
    cfg: float = 6.5
    sampler: str = "dpmpp_2m_sde"
    scheduler: str = "karras"
    width: int = 832
    height: int = 1216
    seed: int = -1
    clip_skip: int = 2


class PromptGenerator:
    """Generador de prompts para modelo SDXL"""
    
    def __init__(self):
        self.config = PromptConfig()
        
        # Elementos de descripción de persona base
        self.person_base = [
            "confident young woman",
            "beautiful young woman",
            "attractive young woman",
            "stunning young woman",
        ]
        
        # Condición (mojada, seca, etc)
        self.conditions = {
            "wet": "wet",
            "dry": "",
            "sweaty": "sweaty",
            "oiled": "oiled skin",
        }
        
        # Estados y modificadores de cuerpo (para SIN ROPA)
        self.body_modifiers_nude = [
            "natural body proportions",
            "natural body proportions, enormous breast",
            "natural body proportions, large breast",
            "natural body proportions, perfect breast",
            "athletic build, toned body, firm breast",
            "curvy body, natural proportions, voluptuous figure",
            "slim body, natural proportions, perky breast",
            "fit body, defined curves, toned abs",
            "hourglass figure, wide hips, narrow waist",
            "thick thighs, round hips, natural curves",
            "petite body, natural proportions, delicate features",
            "tall athletic body, long legs, toned figure",
            "busty figure, natural large breast, curvy waist",
            "slim waist, round buttocks, feminine curves",
        ]
        
        # Poses (para SIN ROPA) - MÁS PROVOCATIVAS
        self.poses_nude = [
            "sexy pose",
            "sexual pose",
            "sensual pose",
            "seductive pose",
            "provocative pose",
            "intimate pose",
            "alluring pose",
            "tempting pose",
            "inviting pose",
            "flirtatious pose",
            "sultry pose",
            "erotic pose, tasteful",
            "passionate pose",
            "suggestive pose",
            "arousing pose, artistic",
            "teasing pose",
            "playful seductive pose",
            "bending over pose",
            "arching back pose",
            "looking over shoulder pose",
        ]
        
        # Expresiones faciales
        self.facial_expressions = [
            "seductive gaze",
            "lustful eyes",
            "playful smile",
            "biting lip",
            "mouth slightly open",
            "intense eye contact",
            "sultry look",
            "bedroom eyes",
            "teasing expression",
            "passionate look",
        ]
        
        # Ropa/cobertura - MÁS OPCIONES
        self.clothing = {
            "towel": "covered with a towel",
            "towel_barely": "barely covered with a small towel",
            "bedsheet": "covered with bedsheet",
            "bedsheet_revealing": "partially covered with bedsheet, revealing curves",
            "lingerie": "wearing lingerie",
            "lingerie_sheer": "wearing sheer see-through lingerie",
            "lingerie_lace": "wearing lace lingerie, barely covering",
            "bikini": "wearing bikini",
            "bikini_micro": "wearing micro bikini, very revealing",
            "underwear": "wearing underwear",
            "underwear_tiny": "wearing tiny thong underwear",
            "bra_panties": "wearing matching bra and panties",
            "nightgown": "wearing sheer nightgown",
            "nightgown_transparent": "wearing transparent nightgown",
            "robe": "wearing open robe",
            "robe_revealing": "wearing loosely tied robe, revealing body",
            "body_paint": "wearing only body paint",
            "jewelry_only": "wearing only jewelry",
            "silk_robe": "wearing silk robe, barely tied",
            "mesh_lingerie": "wearing mesh lingerie, see-through",
            "harness_lingerie": "wearing harness lingerie set",
            "stockings_garter": "wearing stockings and garter belt only",
            "corset": "wearing tight corset, revealing",
            "bodysuit_sheer": "wearing sheer bodysuit",
            "none_nude": "nude",
        }
        
        # NIVEL 1: Casual/Inocente - Ropa completa, situaciones cotidianas
        self.clothing_level1 = [
            "wearing cozy oversized hoodie and sweatpants",
            "wearing casual jeans and t-shirt",
            "wearing comfortable sweater and leggings",
            "wearing casual home clothes, relaxed",
            "wearing everyday outfit, natural look",
            "wearing simple dress, modest style",
            "wearing cardigan and jeans, casual",
        ]
        
        self.poses_level1 = [
            "relaxed pose",
            "casual stance",
            "natural pose",
            "comfortable position",
            "candid moment",
        ]
        
        self.scenarios_level1 = [
            "at home with pet dog",
            "reading a book on couch",
            "having coffee in kitchen",
            "walking in park",
            "doing everyday activities",
            "relaxing at home",
        ]
        
        # NIVEL 2: Sugerente - Ropa ajustada, poses coquetas
        self.clothing_level2 = [
            "wearing tight yoga pants and fitted tank top",
            "wearing skinny jeans and crop top",
            "wearing bodycon dress, hugging curves",
            "wearing sports bra and leggings, athletic look",
            "wearing fitted dress, showing silhouette",
            "wearing tight jeans and low-cut top",
        ]
        
        self.poses_level2 = [
            "flirty pose",
            "playful stance",
            "confident pose",
            "teasing expression",
            "suggestive look",
        ]
        
        # NIVEL 3: Provocativo - Lencería, bikini, ropa reveladora
        self.clothing_level3 = [
            "wearing lace lingerie set",
            "wearing bikini",
            "wearing lace bralette and panties",
            "wearing sheer nightgown",
            "wearing tight mini skirt and crop top",
            "wearing string bikini",
            "wearing revealing lingerie",
        ]
        
        self.poses_level3 = [
            "seductive pose",
            "provocative stance",
            "alluring position",
            "sensual pose",
            "tempting look",
        ]
        
        # NIVEL 4: Sensual - Desnudez parcial, toallas, sábanas
        self.clothing_level4 = [
            "covered with towel",
            "barely covered with small towel",
            "wrapped in bedsheet",
            "partially covered with bedsheet, revealing curves",
            "wearing sheer see-through lingerie",
            "wearing open robe",
        ]
        
        self.poses_level4 = [
            "sensual pose",
            "intimate position",
            "alluring stance",
            "seductive posture",
            "provocative pose",
        ]
        
        # NIVEL 5: Explícito - Desnudez completa, poses sexuales
        self.poses_level5 = [
            "on all fours position, back arched, looking over shoulder at camera, correct anatomy, natural spine",
            "on hands and knees, doggy style pose, rear view, round buttocks visible, back arched naturally",
            "bent over bed edge, ass up, face down, back view, arched spine, natural body position",
            "kneeling on bed, legs apart, hands on thighs, front view, confident posture",
            "lying on back, legs spread, arms above head, inviting position, looking at camera",
            "sitting on edge of bed, legs open, leaning back on hands, direct eye contact",
            "standing bent over, hands on knees, rear angle view, looking back at camera",
            "lying face down on bed, ass raised, side angle, head turned to camera",
            "straddling position, kneeling upright, hands on hips, frontal view",
            "on knees, arching back deeply, hands behind head, chest pushed forward",
            "squatting position, facing camera, hands on floor, intimate angle",
            "lying on side, top leg raised, revealing pose, eye contact with camera",
        ]
        
        self.body_mods_level5 = [
            "perfect female anatomy, detailed realistic body, natural skin texture, visible muscle definition",
            "curvy body, wide hips, narrow waist, natural large breasts, realistic proportions",
            "athletic toned body, firm buttocks, flat stomach, defined abs, natural breasts",
            "voluptuous figure, thick thighs, round ass, hourglass shape, natural curves",
            "slim petite body, small perky breasts, tight figure, delicate features",
            "fit body, long legs, toned glutes, feminine muscle definition, proportional breasts",
        ]
        
        self.lighting_level5 = [
            "soft warm lighting from side, shadows accentuating curves, intimate atmosphere",
            "dim bedroom lighting, warm lamp glow, soft shadows on skin",
            "natural window light from behind, silhouette edges, golden rim light on body",
            "candlelight ambiance, warm flickering light, deep intimate shadows",
            "professional studio lighting, key light on body, soft fill, dramatic contrast",
            "moody low-key lighting, single light source, deep shadows emphasizing form",
        ]
        
        self.scenarios_level5 = [
            "private intimate moment, bedroom setting",
            "erotic photoshoot session, professional setup",
            "spontaneous intimate photo, authentic moment",
            "private boudoir session, luxurious setting",
            "intimate bedroom scene, after undressing",
            "personal explicit photo, private moment",
        ]
        
        self.expressions_level5 = [
            "lustful gaze at camera, parted lips, heavy-lidded eyes, flushed cheeks",
            "intense eye contact, biting lower lip, aroused expression",
            "mouth slightly open, bedroom eyes, seductive smirk",
            "looking over shoulder with desire, half-closed eyes, teasing smile",
            "direct passionate stare, lips parted, heated expression",
            "eyes closed in pleasure, head tilted back, natural expression",
        ]
        
        self.camera_level5 = [
            "shot from behind and slightly below, emphasizing curves, 50mm lens, f1.8",
            "low angle rear view, natural body proportions, 35mm lens, wide shot",
            "eye level front view, full body visible, 85mm lens, f2.0, sharp focus",
            "high angle looking down, full body in frame, 35mm lens, intimate perspective",
            "side angle, full body profile, 70mm lens, f1.8, detailed",
            "close-up from behind, focusing on curves, 50mm macro, shallow depth of field",
            "three-quarter rear angle, body and face visible, 85mm lens, bokeh background",
        ]
        
        # Descripciones de ropa completa (CON ROPA) - MÁS PROVOCATIVAS (para retrocompatibilidad)
        self.clothing_full = [
            "wearing casual home outfit",
            "wearing oversized shirt, no bra, visible nipples through fabric",
            "wearing sports bra and leggings",
            "wearing tight yoga pants and sports bra, showing curves",
            "wearing crop top and shorts",
            "wearing very short crop top and tiny shorts, showing midriff",
            "wearing tight dress",
            "wearing tight bodycon dress, hugging curves",
            "wearing casual summer dress",
            "wearing short sundress, showing legs",
            "wearing fitted tank top and jeans",
            "wearing low-cut tank top and tight jeans, cleavage visible",
            "wearing oversized shirt",
            "wearing oversized shirt as dress, bare legs",
            "wearing bikini top and jean shorts",
            "wearing string bikini top and denim shorts, beach style",
            "wearing lace bralette and panties, lingerie style",
            "wearing sheer white shirt, wet, see-through",
            "wearing tight mini skirt and crop top",
            "wearing fishnet stockings and garter belt with lingerie",
            "wearing thigh-high stockings and oversized sweater",
            "wearing nothing but boyfriend's shirt, unbuttoned",
            "wearing latex bodysuit, shiny and tight",
            "wearing leather lingerie, dominatrix style",
            "wearing torn jeans and sports bra, casual sexy",
            "wearing satin slip dress, clinging to curves",
            "wearing mesh crop top and leather pants",
            "wearing denim micro skirt and halter top",
            "wearing off-shoulder dress, showing skin",
            "wearing tube top and booty shorts",
            "wearing deep v-neck bodysuit, revealing",
            "wearing sheer lace dress over lingerie",
        ]
        
        # Tipo de foto
        self.photo_types = [
            "a photo taken with an iPhone",
            "an amateur photo taken with smartphone",
            "a selfie taken with iPhone",
            "a professional photo",
            "a candid photo",
        ]
        
        # Iluminación
        self.lighting = [
            "soft diffused lighting, chiaroscuro shadows",
            "natural window lighting, soft shadows",
            "warm golden hour lighting",
            "soft bedroom lighting, intimate atmosphere",
            "dramatic lighting, deep shadows",
            "bright natural lighting",
            "moody dim lighting",
        ]
        
        # Composición técnica
        self.technical_composition = [
            "tasteful composition, cinematic framing, 85mm lens, f1.8",
            "intimate framing, 50mm lens, f2.0",
            "portrait composition, 85mm lens, f1.4",
            "close-up composition, 70mm lens, f1.8",
            "full body composition, 35mm lens, f2.8",
        ]
        
        # Calidad de textura
        self.texture_quality = [
            "ultra realistic skin texture, subtle skin details, soft shadows on curves",
            "realistic skin texture, natural skin details, authentic look",
            "photorealistic skin, natural imperfections, real skin texture",
            "detailed skin texture, visible pores, natural look",
        ]
        
        # Calidad general
        self.overall_quality = [
            "high resolution, gallery quality",
            "ultra high quality, professional grade",
            "4K quality, sharp details",
            "high definition, crisp quality",
        ]
        
        # Ambientes/fondos - MÁS OPCIONES
        self.backgrounds = [
            "bedroom background",
            "bathroom background",
            "bedroom background with mirror",
            "luxury bedroom background",
            "hotel room background",
            "modern apartment background",
            "cozy bedroom setting",
            "dimly lit bedroom",
            "steamy bathroom, mirror foggy",
            "shower background, water drops",
            "bathtub background, bubbles",
            "walk-in closet background",
            "private dressing room",
            "penthouse suite background",
            "jacuzzi background",
            "sauna room background",
            "gym locker room background",
            "poolside background",
            "beach cabana background",
            "massage room background",
            "luxury yacht cabin",
            "private villa background",
            "rooftop terrace, city lights",
            "private studio loft",
            "spa room background",
            "boutique hotel suite",
            "tropical resort room",
            "mountain cabin background",
            "beach house bedroom",
            "private pool area",
            "wine cellar background",
            "art studio background",
            "home theater room",
            "private library setting",
            "garden terrace background",
        ]
        
        # Escenarios específicos (nuevo)
        self.scenarios = [
            "morning after scene",
            "getting ready for night out",
            "after shower moment",
            "private photoshoot",
            "intimate selfie",
            "boudoir photography session",
            "fitness photoshoot",
            "swimsuit modeling",
            "relaxing at home",
            "getting undressed",
        ]
        
        # Ángulos de cámara (nuevo)
        self.camera_angles = [
            "eye level angle",
            "low angle, looking up",
            "high angle, looking down",
            "over the shoulder shot",
            "back view, rear angle, correct anatomy",
            "side profile view",
            "three-quarter angle",
            "dutch angle, dynamic",
            "close-up shot",
            "full body shot from below",
        ]
        
        # Tonos de color
        self.color_tones = [
            "warm neutral tones",
            "warm soft tones",
            "cool neutral tones",
            "warm intimate tones",
            "natural color palette",
        ]
        
        # Extras finales
        self.final_touches = [
            "natural imperfections, raw photography style",
            "authentic look, unedited style",
            "realistic photography style",
            "natural aesthetic, raw photo",
        ]
        
        # Negative prompts
        self.negative_base = "spread legs, explicit anatomy focus, low quality, blurry, bad anatomy, extra fingers, extra limbs, deformed hands, unrealistic skin, cartoon, anime, illustration, 3d render, doll face, plastic skin, watermark, text, logo, twisted torso, broken spine, impossible pose, reversed body, contorted limbs, distorted proportions, mutated anatomy, malformed body"
        
        self.negative_extras = [
            "fake breasts, implants, artificial look, over-edited",
            "deformed body, mutated, disfigured, bad proportions",
            "painting, drawing, sketch, CGI, over-processed",
            "ugly face, distorted features, bad eyes",
        ]
    
    def generate_prompt(
        self, 
        clothed: bool = True,
        wet: bool = False,
        custom_options: Optional[Dict] = None,
        randomize: bool = True,
        explicitness_level: int = 0
    ) -> Dict:
        """
        Genera un prompt completo en formato JSON
        
        Args:
            clothed: True para con ropa, False para sin ropa (ignorado si explicitness_level > 0)
            wet: Si la persona está mojada o no
            custom_options: Opciones personalizadas (diccionario con claves: 
                            'clothing', 'facial_expression', 'camera_angle', 'scenario', 'location')
            randomize: Si True, selecciona opciones aleatorias
            explicitness_level: Nivel de explicitez (0=modo antiguo, 1=casual, 2=sugerente, 3=provocativo, 4=sensual, 5=explícito)
            
        Returns:
            Diccionario con el prompt completo
        """
        if custom_options is None:
            custom_options = {}
        
        # Construir el positive prompt como string
        prompt_parts = []
        
        # Si se especifica un nivel de explicitez, usar ese sistema
        if explicitness_level > 0:
            return self._generate_by_level(explicitness_level, custom_options, randomize)
        
        if not clothed:
            # Para imágenes SIN ROPA
            # nude of a [condición] [persona]
            condition = "wet" if wet else random.choice(list(self.conditions.values()))
            if condition:
                prompt_parts.append(f"nude of a {condition} {random.choice(self.person_base)}")
            else:
                prompt_parts.append(f"nude of a {random.choice(self.person_base)}")
            
            # Tipo de foto
            prompt_parts.append(random.choice(self.photo_types))
            
            # Escenario (opcional, 50% de probabilidad o si se especifica)
            scenario_option = custom_options.get('scenario')
            if scenario_option and scenario_option != 'random':
                # Mapear el valor del frontend al texto real
                scenario_map = {
                    'morning_after': 'morning after scene',
                    'getting_ready': 'getting ready for night out',
                    'after_shower': 'after shower moment',
                    'photoshoot': 'private photoshoot',
                    'boudoir': 'boudoir photography session',
                    'intimate_selfie': 'intimate selfie',
                    'getting_undressed': 'getting undressed',
                }
                prompt_parts.append(scenario_map.get(scenario_option, random.choice(self.scenarios)))
            elif randomize and random.random() > 0.5:
                prompt_parts.append(random.choice(self.scenarios))
            
            # Iluminación
            prompt_parts.append(random.choice(self.lighting))
            
            # Modificadores de cuerpo
            prompt_parts.append(random.choice(self.body_modifiers_nude))
            
            # Expresión facial (70% de probabilidad o si se especifica)
            facial_option = custom_options.get('facial_expression')
            if facial_option and facial_option != 'random':
                # Mapear el valor del frontend al texto real
                facial_map = {
                    'seductive_gaze': 'seductive gaze',
                    'lustful_eyes': 'lustful eyes',
                    'playful_smile': 'playful smile',
                    'biting_lip': 'biting lip',
                    'mouth_open': 'mouth slightly open',
                    'intense_contact': 'intense eye contact',
                    'bedroom_eyes': 'bedroom eyes',
                }
                prompt_parts.append(facial_map.get(facial_option, random.choice(self.facial_expressions)))
            elif randomize and random.random() > 0.3:
                prompt_parts.append(random.choice(self.facial_expressions))
            
            # Pose
            prompt_parts.append(random.choice(self.poses_nude))
            
            # Ángulo de cámara (40% de probabilidad o si se especifica)
            angle_option = custom_options.get('camera_angle')
            if angle_option and angle_option != 'random':
                # Mapear el valor del frontend al texto real
                angle_map = {
                    'eye_level': 'eye level angle',
                    'low_angle': 'low angle, looking up',
                    'high_angle': 'high angle, looking down',
                    'over_shoulder': 'over the shoulder shot',
                    'from_behind': 'back view, rear angle, correct anatomy, natural spine position',
                    'side_profile': 'side profile view',
                    'close_up': 'close-up shot',
                    'full_body': 'full body shot from below',
                }
                prompt_parts.append(angle_map.get(angle_option, random.choice(self.camera_angles)))
            elif randomize and random.random() > 0.6:
                prompt_parts.append(random.choice(self.camera_angles))
            
            # Composición técnica
            prompt_parts.append(random.choice(self.technical_composition))
            
            # Calidad de textura
            prompt_parts.append(random.choice(self.texture_quality))
            
            # Calidad general
            prompt_parts.append(random.choice(self.overall_quality))
            
            # Background (con opción personalizada)
            location_option = custom_options.get('location')
            if location_option and location_option != 'random':
                # Mapear el valor del frontend al texto real
                location_map = {
                    'bedroom': 'bedroom background',
                    'bathroom': 'bathroom background',
                    'luxury_bedroom': 'luxury bedroom background',
                    'hotel_room': 'hotel room background',
                    'jacuzzi': 'jacuzzi background',
                    'sauna': 'sauna room background',
                    'poolside': 'poolside background',
                    'beach_cabana': 'beach cabana background',
                    'yacht': 'luxury yacht cabin',
                    'villa': 'private villa background',
                    'rooftop': 'rooftop terrace, city lights',
                    'spa': 'spa room background',
                    'resort': 'tropical resort room',
                    'beach_house': 'beach house bedroom',
                }
                prompt_parts.append(location_map.get(location_option, random.choice(self.backgrounds)))
            else:
                prompt_parts.append(random.choice(self.backgrounds))
            
            # Ropa/cobertura (puede ser towel, bedsheet, o none)
            clothing_choice = custom_options.get('clothing', random.choice(list(self.clothing.keys())))
            if clothing_choice != 'none_nude':
                prompt_parts.append(self.clothing[clothing_choice])
            
            # Tonos de color
            prompt_parts.append(random.choice(self.color_tones))
            
            # Toques finales
            prompt_parts.append(random.choice(self.final_touches))
            
        else:
            # Para imágenes CON ROPA
            condition = "wet" if wet else ""
            if condition:
                prompt_parts.append(f"{condition} {random.choice(self.person_base)}")
            else:
                prompt_parts.append(random.choice(self.person_base))
            
            # Ropa completa
            prompt_parts.append(random.choice(self.clothing_full))
            
            # Tipo de foto
            prompt_parts.append(random.choice(self.photo_types))
            
            # Escenario (50% de probabilidad o si se especifica)
            scenario_option = custom_options.get('scenario')
            if scenario_option and scenario_option != 'random':
                scenario_map = {
                    'morning_after': 'morning after scene',
                    'getting_ready': 'getting ready for night out',
                    'after_shower': 'after shower moment',
                    'photoshoot': 'private photoshoot',
                    'boudoir': 'boudoir photography session',
                    'intimate_selfie': 'intimate selfie',
                    'getting_undressed': 'getting undressed',
                }
                prompt_parts.append(scenario_map.get(scenario_option, random.choice(self.scenarios)))
            elif randomize and random.random() > 0.5:
                prompt_parts.append(random.choice(self.scenarios))
            
            # Iluminación
            prompt_parts.append(random.choice(self.lighting))
            
            # Expresión facial (60% de probabilidad o si se especifica)
            facial_option = custom_options.get('facial_expression')
            if facial_option and facial_option != 'random':
                facial_map = {
                    'seductive_gaze': 'seductive gaze',
                    'lustful_eyes': 'lustful eyes',
                    'playful_smile': 'playful smile',
                    'biting_lip': 'biting lip',
                    'mouth_open': 'mouth slightly open',
                    'intense_contact': 'intense eye contact',
                    'bedroom_eyes': 'bedroom eyes',
                }
                prompt_parts.append(facial_map.get(facial_option, random.choice(self.facial_expressions)))
            elif randomize and random.random() > 0.4:
                prompt_parts.append(random.choice(self.facial_expressions))
            
            # Añadir una pose suave (30% de probabilidad)
            if randomize and random.random() > 0.7:
                soft_poses = ["confident pose", "casual pose", "relaxed pose", "playful pose", "flirty pose"]
                prompt_parts.append(random.choice(soft_poses))
            
            # Ángulo de cámara (40% de probabilidad o si se especifica)
            angle_option = custom_options.get('camera_angle')
            if angle_option and angle_option != 'random':
                angle_map = {
                    'eye_level': 'eye level angle',
                    'low_angle': 'low angle, looking up',
                    'high_angle': 'high angle, looking down',
                    'over_shoulder': 'over the shoulder shot',
                    'from_behind': 'back view, rear angle, correct anatomy, natural spine position',
                    'side_profile': 'side profile view',
                    'close_up': 'close-up shot',
                    'full_body': 'full body shot from below',
                }
                prompt_parts.append(angle_map.get(angle_option, random.choice(self.camera_angles)))
            elif randomize and random.random() > 0.6:
                prompt_parts.append(random.choice(self.camera_angles))
            
            # Composición técnica
            prompt_parts.append(random.choice(self.technical_composition))
            
            # Calidad de textura
            prompt_parts.append(random.choice(self.texture_quality))
            
            # Calidad general
            prompt_parts.append(random.choice(self.overall_quality))
            
            # Background (con opción personalizada)
            location_option = custom_options.get('location')
            if location_option and location_option != 'random':
                # Mapear el valor del frontend al texto real
                location_map = {
                    'bedroom': 'bedroom background',
                    'bathroom': 'bathroom background',
                    'luxury_bedroom': 'luxury bedroom background',
                    'hotel_room': 'hotel room background',
                    'jacuzzi': 'jacuzzi background',
                    'sauna': 'sauna room background',
                    'poolside': 'poolside background',
                    'beach_cabana': 'beach cabana background',
                    'yacht': 'luxury yacht cabin',
                    'villa': 'private villa background',
                    'rooftop': 'rooftop terrace, city lights',
                    'spa': 'spa room background',
                    'resort': 'tropical resort room',
                    'beach_house': 'beach house bedroom',
                }
                prompt_parts.append(location_map.get(location_option, random.choice(self.backgrounds)))
            else:
                prompt_parts.append(random.choice(self.backgrounds))
            
            # Tonos de color
            prompt_parts.append(random.choice(self.color_tones))
            
            # Toques finales
            prompt_parts.append(random.choice(self.final_touches))
        
        # Unir todas las partes con coma y espacio
        positive_prompt = ", ".join(prompt_parts)
        
        # Construir negative prompt
        negative_prompt = self.negative_base
        
        # Si se usa ángulo desde atrás, reforzar negative prompt
        if custom_options and custom_options.get('camera_angle') == 'from_behind':
            negative_prompt += ", impossible anatomy, front-facing features on back view, face visible from behind, twisted body, unnatural rotation"
        
        if randomize and random.random() > 0.5:
            negative_prompt += f", {random.choice(self.negative_extras)}"
        
        # Construir el prompt completo
        prompt = {
            "model": self.config.model,
            "positive_prompt": positive_prompt,
            "negative_prompt": negative_prompt,
            "steps": self.config.steps,
            "cfg": self.config.cfg,
            "sampler": self.config.sampler,
            "scheduler": self.config.scheduler,
            "width": self.config.width,
            "height": self.config.height,
            "seed": self.config.seed,
            "clip_skip": self.config.clip_skip
        }
        
        return prompt
    
    def _generate_by_level(
        self,
        level: int,
        custom_options: Dict,
        randomize: bool
    ) -> Dict:
        """
        Genera un prompt basado en el nivel de explicitez
        
        Args:
            level: Nivel de explicitez (1-5)
            custom_options: Opciones personalizadas
            randomize: Si True, selecciona opciones aleatorias
            
        Returns:
            Diccionario con el prompt completo
        """
        prompt_parts = []
        
        # Persona base
        prompt_parts.append(random.choice(self.person_base))
        
        # NIVEL 1: Casual/Inocente
        if level == 1:
            # Ropa casual
            prompt_parts.append(random.choice(self.clothing_level1))
            
            # Tipo de foto
            prompt_parts.append(random.choice(self.photo_types))
            
            # Escenario casual
            prompt_parts.append(random.choice(self.scenarios_level1))
            
            # Pose natural
            prompt_parts.append(random.choice(self.poses_level1))
            
            # Iluminación natural
            prompt_parts.append("natural lighting, soft daylight")
            
            # Background casual
            backgrounds_casual = ["living room background", "home interior", "park background", "casual setting"]
            prompt_parts.append(random.choice(backgrounds_casual))
        
        # NIVEL 2: Sugerente
        elif level == 2:
            # Ropa ajustada
            prompt_parts.append(random.choice(self.clothing_level2))
            
            # Tipo de foto
            prompt_parts.append(random.choice(self.photo_types))
            
            # Pose sugerente
            prompt_parts.append(random.choice(self.poses_level2))
            
            # Iluminación
            prompt_parts.append(random.choice(self.lighting))
            
            # Expresión facial (50% probabilidad)
            if randomize and random.random() > 0.5:
                prompt_parts.append(random.choice(self.facial_expressions[:5]))  # Expresiones suaves
            
            # Background
            prompt_parts.append(random.choice(self.backgrounds))
        
        # NIVEL 3: Provocativo
        elif level == 3:
            # Lencería o bikini
            prompt_parts.append(random.choice(self.clothing_level3))
            
            # Tipo de foto
            prompt_parts.append(random.choice(self.photo_types))
            
            # Pose provocativa
            prompt_parts.append(random.choice(self.poses_level3))
            
            # Iluminación
            prompt_parts.append(random.choice(self.lighting))
            
            # Expresión facial
            if randomize and random.random() > 0.3:
                prompt_parts.append(random.choice(self.facial_expressions))
            
            # Background íntimo
            prompt_parts.append(random.choice(self.backgrounds))
        
        # NIVEL 4: Sensual
        elif level == 4:
            prompt_parts[0] = f"nude of a {prompt_parts[0]}"  # Añadir nude
            
            # Cobertura parcial
            clothing_option = custom_options.get('clothing')
            if clothing_option and clothing_option != 'random':
                if clothing_option in self.clothing:
                    prompt_parts.append(self.clothing[clothing_option])
                else:
                    prompt_parts.append(random.choice(self.clothing_level4))
            else:
                prompt_parts.append(random.choice(self.clothing_level4))
            
            # Tipo de foto
            prompt_parts.append(random.choice(self.photo_types))
            
            # Modificadores de cuerpo
            prompt_parts.append(random.choice(self.body_modifiers_nude))
            
            # Pose sensual
            prompt_parts.append(random.choice(self.poses_level4))
            
            # Expresión facial
            if randomize and random.random() > 0.2:
                prompt_parts.append(random.choice(self.facial_expressions))
            
            # Iluminación
            prompt_parts.append(random.choice(self.lighting))
            
            # Background
            prompt_parts.append(random.choice(self.backgrounds))
        
        # NIVEL 5: Explícito
        elif level == 5:
            prompt_parts[0] = f"nude of a {prompt_parts[0]}"
            
            # Desnudez completa con detalle
            prompt_parts.append("completely nude, naked, no clothing")
            
            # Modificadores de cuerpo detallados
            prompt_parts.append(random.choice(self.body_mods_level5))
            
            # Pose explícita detallada
            prompt_parts.append(random.choice(self.poses_level5))
            
            # Escenario específico
            prompt_parts.append(random.choice(self.scenarios_level5))
            
            # Expresión facial intensa y detallada
            prompt_parts.append(random.choice(self.expressions_level5))
            
            # Iluminación específica para nivel 5
            prompt_parts.append(random.choice(self.lighting_level5))
            
            # Ángulo y composición específica
            prompt_parts.append(random.choice(self.camera_level5))
            
            # Background
            backgrounds_explicit = [
                "luxury bedroom, silk sheets, dim lighting",
                "hotel suite bedroom, king bed, warm ambient light",
                "minimalist bedroom, white sheets, natural light",
                "dark bedroom, moody atmosphere, single lamp",
                "professional photography studio, dark backdrop",
            ]
            prompt_parts.append(random.choice(backgrounds_explicit))
            
            # Calidad reforzada para nivel 5
            prompt_parts.append("ultra realistic skin texture, natural skin with subtle details, photorealistic")
            prompt_parts.append("8K, ultra detailed, masterpiece quality, professional photography")
            prompt_parts.append(random.choice(self.color_tones))
            prompt_parts.append("raw photo, unedited look, authentic")
            
            # Construir directamente, saltando la sección común de abajo
            # Añadir opciones personalizadas específicas
            angle_option = custom_options.get('camera_angle')
            if angle_option and angle_option != 'random':
                angle_map = {
                    'eye_level': 'eye level angle',
                    'low_angle': 'low angle, looking up',
                    'high_angle': 'high angle, looking down',
                    'over_shoulder': 'over the shoulder shot',
                    'from_behind': 'back view, rear angle, correct anatomy, natural spine position, anatomically accurate',
                    'side_profile': 'side profile view',
                    'close_up': 'close-up shot',
                    'full_body': 'full body shot from below',
                }
                prompt_parts.append(angle_map.get(angle_option, ''))
            
            location_option = custom_options.get('location')
            if location_option and location_option != 'random':
                location_map = {
                    'bedroom': 'bedroom background',
                    'bathroom': 'bathroom background',
                    'luxury_bedroom': 'luxury bedroom background',
                    'hotel_room': 'hotel room background',
                    'jacuzzi': 'jacuzzi background',
                    'sauna': 'sauna room background',
                    'poolside': 'poolside background',
                    'beach_cabana': 'beach cabana background',
                    'yacht': 'luxury yacht cabin',
                    'villa': 'private villa background',
                    'rooftop': 'rooftop terrace, city lights',
                    'spa': 'spa room background',
                    'resort': 'tropical resort room',
                    'beach_house': 'beach house bedroom',
                }
                prompt_parts = [p for p in prompt_parts if 'bedroom' not in p.lower() or 'nude' in p.lower()]
                prompt_parts.append(location_map.get(location_option, ''))
            
            # Unir
            positive_prompt = ", ".join([p for p in prompt_parts if p])
            
            # Negative prompt reforzado para nivel 5
            negative_prompt = self.negative_base
            negative_prompt += ", bad anatomy, wrong anatomy, reversed body, impossible body position"
            negative_prompt += ", extra arms, extra legs, fused limbs, missing limbs"
            negative_prompt += ", distorted face, cross-eyed, bad eyes, ugly face"
            negative_prompt += ", bad hands, deformed fingers, fused fingers, too many fingers"
            negative_prompt += ", clothing, dressed, fabric, textile"
            
            if custom_options.get('camera_angle') == 'from_behind':
                negative_prompt += ", front-facing features on back view, face visible from behind, twisted body, unnatural rotation, impossible spine"
            
            if randomize and random.random() > 0.5:
                negative_prompt += f", {random.choice(self.negative_extras)}"
            
            prompt = {
                "model": self.config.model,
                "positive_prompt": positive_prompt,
                "negative_prompt": negative_prompt,
                "steps": 35,
                "cfg": 7.0,
                "sampler": self.config.sampler,
                "scheduler": self.config.scheduler,
                "width": self.config.width,
                "height": self.config.height,
                "seed": self.config.seed,
                "clip_skip": self.config.clip_skip
            }
            
            return prompt
        
        # Opciones personalizadas que aplican a todos los niveles
        
        # Ángulo de cámara (si se especifica)
        angle_option = custom_options.get('camera_angle')
        if angle_option and angle_option != 'random':
            angle_map = {
                'eye_level': 'eye level angle',
                'low_angle': 'low angle, looking up',
                'high_angle': 'high angle, looking down',
                'over_shoulder': 'over the shoulder shot',
                'from_behind': 'back view, rear angle, correct anatomy, natural spine position',
                'side_profile': 'side profile view',
                'close_up': 'close-up shot',
                'full_body': 'full body shot from below',
            }
            prompt_parts.append(angle_map.get(angle_option, random.choice(self.camera_angles)))
        
        # Location (si se especifica)
        location_option = custom_options.get('location')
        if location_option and location_option != 'random':
            location_map = {
                'bedroom': 'bedroom background',
                'bathroom': 'bathroom background',
                'luxury_bedroom': 'luxury bedroom background',
                'hotel_room': 'hotel room background',
                'jacuzzi': 'jacuzzi background',
                'sauna': 'sauna room background',
                'poolside': 'poolside background',
                'beach_cabana': 'beach cabana background',
                'yacht': 'luxury yacht cabin',
                'villa': 'private villa background',
                'rooftop': 'rooftop terrace, city lights',
                'spa': 'spa room background',
                'resort': 'tropical resort room',
                'beach_house': 'beach house bedroom',
            }
            # Reemplazar el último background con el personalizado
            prompt_parts = [p for p in prompt_parts if 'background' not in p.lower() and 'setting' not in p.lower()]
            prompt_parts.append(location_map.get(location_option, random.choice(self.backgrounds)))
        
        # Composición técnica (niveles 2-5)
        if level >= 2:
            prompt_parts.append(random.choice(self.technical_composition))
        
        # Calidad de textura (niveles 3-5)
        if level >= 3:
            prompt_parts.append(random.choice(self.texture_quality))
        
        # Calidad general
        prompt_parts.append(random.choice(self.overall_quality))
        
        # Tonos de color
        prompt_parts.append(random.choice(self.color_tones))
        
        # Toques finales (niveles 3-5)
        if level >= 3:
            prompt_parts.append(random.choice(self.final_touches))
        
        # Unir todas las partes
        positive_prompt = ", ".join(prompt_parts)
        
        # Construir negative prompt según nivel
        negative_prompt = self.negative_base
        
        # Reforzar negative prompt para ángulo desde atrás
        if custom_options.get('camera_angle') == 'from_behind':
            negative_prompt += ", impossible anatomy, front-facing features on back view, face visible from behind, twisted body, unnatural rotation"
        
        # Añadir extras aleatorios
        if randomize and random.random() > 0.5:
            negative_prompt += f", {random.choice(self.negative_extras)}"
        
        # Para niveles explícitos, agregar más restricciones de anatomía
        if level >= 4:
            negative_prompt += ", bad hands, deformed fingers, extra limbs"
        
        # Construir el prompt completo
        prompt = {
            "model": self.config.model,
            "positive_prompt": positive_prompt,
            "negative_prompt": negative_prompt,
            "steps": self.config.steps,
            "cfg": self.config.cfg,
            "sampler": self.config.sampler,
            "scheduler": self.config.scheduler,
            "width": self.config.width,
            "height": self.config.height,
            "seed": self.config.seed,
            "clip_skip": self.config.clip_skip
        }
        
        return prompt
    
    def generate_batch(
        self,
        count: int,
        clothed: bool = True,
        wet: bool = False,
        randomize: bool = True
    ) -> List[Dict]:
        """
        Genera múltiples prompts
        
        Args:
            count: Número de prompts a generar
            clothed: True para con ropa, False para sin ropa
            wet: Si las personas están mojadas
            randomize: Si True, cada prompt será diferente
            
        Returns:
            Lista de prompts
        """
        prompts = []
        for _ in range(count):
            # Variar wet aleatoriamente si randomize es True
            is_wet = wet if not randomize else random.choice([True, False])
            prompt = self.generate_prompt(clothed=clothed, wet=is_wet, randomize=randomize)
            prompts.append(prompt)
        return prompts
    
    def save_prompt(self, prompt: Dict, filename: str):
        """Guarda un prompt en un archivo JSON"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(prompt, f, indent=2, ensure_ascii=False)
    
    def save_batch(self, prompts: List[Dict], filename: str):
        """Guarda múltiples prompts en un archivo JSON"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(prompts, f, indent=2, ensure_ascii=False)
    
    def list_options(self):
        """Muestra todas las opciones disponibles"""
        print("=== OPCIONES DE CONFIGURACIÓN ===")
        print("\nPERSONAS BASE:")
        for p in self.person_base:
            print(f"  - {p}")
        
        print("\nCONDICIONES:")
        for key, val in self.conditions.items():
            print(f"  - {key}: {val if val else '(ninguna)'}")
        
        print("\nMODIFICADORES DE CUERPO (sin ropa):")
        for mod in self.body_modifiers_nude:
            print(f"  - {mod}")
        
        print("\nPOSES (sin ropa):")
        for pose in self.poses_nude:
            print(f"  - {pose}")
        
        print("\nEXPRESIONES FACIALES:")
        for expr in self.facial_expressions:
            print(f"  - {expr}")
        
        print("\nROPA/COBERTURA:")
        for key, val in self.clothing.items():
            print(f"  - {key}: {val}")
        
        print("\nROPA COMPLETA (con ropa):")
        for cloth in self.clothing_full:
            print(f"  - {cloth}")
        
        print("\nFONDOS/AMBIENTES:")
        for bg in self.backgrounds:
            print(f"  - {bg}")
        
        print("\nESCENARIOS:")
        for sc in self.scenarios:
            print(f"  - {sc}")
        
        print("\nÁNGULOS DE CÁMARA:")
        for angle in self.camera_angles:
            print(f"  - {angle}")


# Función de utilidad para uso rápido
def generate_quick_prompt(clothed: bool = True, wet: bool = False, save_to_file: bool = False) -> Dict:
    """
    Genera un prompt rápido y aleatorio
    
    Args:
        clothed: True para con ropa, False para sin ropa
        wet: Si la persona está mojada
        save_to_file: Si True, guarda en archivo
        
    Returns:
        Diccionario con el prompt
    """
    generator = PromptGenerator()
    prompt = generator.generate_prompt(clothed=clothed, wet=wet, randomize=True)
    
    if save_to_file:
        filename = f"prompt_{'clothed' if clothed else 'nude'}_{random.randint(1000, 9999)}.json"
        generator.save_prompt(prompt, filename)
        print(f"Prompt guardado en: {filename}")
    
    return prompt


if __name__ == "__main__":
    # Ejemplo de uso
    generator = PromptGenerator()
    
    print("=== GENERADOR DE PROMPTS PARA AI ===\n")
    
    # Ejemplo 1: Prompt con ropa
    print("1. Generando prompt CON ROPA:")
    prompt_clothed = generator.generate_prompt(clothed=True, wet=False, randomize=True)
    print(json.dumps(prompt_clothed, indent=2, ensure_ascii=False))
    
    print("\n" + "="*80 + "\n")
    
    # Ejemplo 2: Prompt sin ropa (mojada, con toalla)
    print("2. Generando prompt SIN ROPA (mojada, con toalla):")
    prompt_nude = generator.generate_prompt(
        clothed=False, 
        wet=True, 
        custom_options={'clothing': 'towel'},
        randomize=True
    )
    print(json.dumps(prompt_nude, indent=2, ensure_ascii=False))
    
    print("\n" + "="*80 + "\n")
    
    # Ejemplo 3: Prompt sin ropa completamente desnuda
    print("3. Generando prompt SIN ROPA (completamente desnuda):")
    prompt_nude_full = generator.generate_prompt(
        clothed=False, 
        wet=False, 
        custom_options={'clothing': 'none_nude'},
        randomize=True
    )
    print(json.dumps(prompt_nude_full, indent=2, ensure_ascii=False))
