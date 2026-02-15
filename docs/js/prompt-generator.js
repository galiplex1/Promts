/**
 * Generador automático de prompts para modelo de IA (SDXL)
 * Versión JavaScript - Sin dependencias de servidor
 */

class PromptConfig {
    constructor() {
        this.model = "sdxl_base_1.0";
        this.steps = 30;
        this.cfg = 6.5;
        this.sampler = "dpmpp_2m_sde";
        this.scheduler = "karras";
        this.width = 832;
        this.height = 1216;
        this.seed = -1;
        this.clip_skip = 2;
    }
}

class PromptGenerator {
    constructor() {
        this.config = new PromptConfig();

        this.person_base = [
            "confident young woman",
            "beautiful young woman",
            "attractive young woman",
            "stunning young woman",
        ];

        this.conditions = {
            wet: "wet",
            dry: "",
            sweaty: "sweaty",
            oiled: "oiled skin",
        };

        this.body_modifiers_nude = [
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
        ];

        this.poses_nude = [
            "sexy pose", "sexual pose", "sensual pose", "seductive pose",
            "provocative pose", "intimate pose", "alluring pose", "tempting pose",
            "inviting pose", "flirtatious pose", "sultry pose", "erotic pose, tasteful",
            "passionate pose", "suggestive pose", "arousing pose, artistic",
            "teasing pose", "playful seductive pose", "bending over pose",
            "arching back pose", "looking over shoulder pose",
        ];

        this.facial_expressions = [
            "seductive gaze", "lustful eyes", "playful smile", "biting lip",
            "mouth slightly open", "intense eye contact", "sultry look",
            "bedroom eyes", "teasing expression", "passionate look",
        ];

        this.clothing = {
            towel: "covered with a towel",
            towel_barely: "barely covered with a small towel",
            bedsheet: "covered with bedsheet",
            bedsheet_revealing: "partially covered with bedsheet, revealing curves",
            lingerie: "wearing lingerie",
            lingerie_sheer: "wearing sheer see-through lingerie",
            lingerie_lace: "wearing lace lingerie, barely covering",
            bikini: "wearing bikini",
            bikini_micro: "wearing micro bikini, very revealing",
            underwear: "wearing underwear",
            underwear_tiny: "wearing tiny thong underwear",
            bra_panties: "wearing matching bra and panties",
            nightgown: "wearing sheer nightgown",
            nightgown_transparent: "wearing transparent nightgown",
            robe: "wearing open robe",
            robe_revealing: "wearing loosely tied robe, revealing body",
            body_paint: "wearing only body paint",
            jewelry_only: "wearing only jewelry",
            silk_robe: "wearing silk robe, barely tied",
            mesh_lingerie: "wearing mesh lingerie, see-through",
            harness_lingerie: "wearing harness lingerie set",
            stockings_garter: "wearing stockings and garter belt only",
            corset: "wearing tight corset, revealing",
            bodysuit_sheer: "wearing sheer bodysuit",
            none_nude: "nude",
        };

        // NIVEL 1: Casual/Inocente
        this.clothing_level1 = [
            "wearing cozy oversized hoodie and sweatpants",
            "wearing casual jeans and t-shirt",
            "wearing comfortable sweater and leggings",
            "wearing casual home clothes, relaxed",
            "wearing everyday outfit, natural look",
            "wearing simple dress, modest style",
            "wearing cardigan and jeans, casual",
        ];

        this.poses_level1 = [
            "relaxed pose", "casual stance", "natural pose",
            "comfortable position", "candid moment",
        ];

        this.scenarios_level1 = [
            "at home with pet dog", "reading a book on couch",
            "having coffee in kitchen", "walking in park",
            "doing everyday activities", "relaxing at home",
        ];

        // NIVEL 2: Sugerente
        this.clothing_level2 = [
            "wearing tight yoga pants and fitted tank top",
            "wearing skinny jeans and crop top",
            "wearing bodycon dress, hugging curves",
            "wearing sports bra and leggings, athletic look",
            "wearing fitted dress, showing silhouette",
            "wearing tight jeans and low-cut top",
        ];

        this.poses_level2 = [
            "flirty pose", "playful stance", "confident pose",
            "teasing expression", "suggestive look",
        ];

        // NIVEL 3: Provocativo
        this.clothing_level3 = [
            "wearing lace lingerie set", "wearing bikini",
            "wearing lace bralette and panties", "wearing sheer nightgown",
            "wearing tight mini skirt and crop top", "wearing string bikini",
            "wearing revealing lingerie",
        ];

        this.poses_level3 = [
            "seductive pose", "provocative stance", "alluring position",
            "sensual pose", "tempting look",
        ];

        // NIVEL 4: Sensual
        this.clothing_level4 = [
            "covered with towel", "barely covered with small towel",
            "wrapped in bedsheet", "partially covered with bedsheet, revealing curves",
            "wearing sheer see-through lingerie", "wearing open robe",
        ];

        this.poses_level4 = [
            "sensual pose", "intimate position", "alluring stance",
            "seductive posture", "provocative pose",
        ];

        // NIVEL 5: Explícito
        this.poses_level5 = [
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
        ];

        this.body_mods_level5 = [
            "perfect female anatomy, detailed realistic body, natural skin texture, visible muscle definition",
            "curvy body, wide hips, narrow waist, natural large breasts, realistic proportions",
            "athletic toned body, firm buttocks, flat stomach, defined abs, natural breasts",
            "voluptuous figure, thick thighs, round ass, hourglass shape, natural curves",
            "slim petite body, small perky breasts, tight figure, delicate features",
            "fit body, long legs, toned glutes, feminine muscle definition, proportional breasts",
        ];

        this.lighting_level5 = [
            "soft warm lighting from side, shadows accentuating curves, intimate atmosphere",
            "dim bedroom lighting, warm lamp glow, soft shadows on skin",
            "natural window light from behind, silhouette edges, golden rim light on body",
            "candlelight ambiance, warm flickering light, deep intimate shadows",
            "professional studio lighting, key light on body, soft fill, dramatic contrast",
            "moody low-key lighting, single light source, deep shadows emphasizing form",
        ];

        this.scenarios_level5 = [
            "private intimate moment, bedroom setting",
            "erotic photoshoot session, professional setup",
            "spontaneous intimate photo, authentic moment",
            "private boudoir session, luxurious setting",
            "intimate bedroom scene, after undressing",
            "personal explicit photo, private moment",
        ];

        this.expressions_level5 = [
            "lustful gaze at camera, parted lips, heavy-lidded eyes, flushed cheeks",
            "intense eye contact, biting lower lip, aroused expression",
            "mouth slightly open, bedroom eyes, seductive smirk",
            "looking over shoulder with desire, half-closed eyes, teasing smile",
            "direct passionate stare, lips parted, heated expression",
            "eyes closed in pleasure, head tilted back, natural expression",
        ];

        this.camera_level5 = [
            "shot from behind and slightly below, emphasizing curves, 50mm lens, f1.8",
            "low angle rear view, natural body proportions, 35mm lens, wide shot",
            "eye level front view, full body visible, 85mm lens, f2.0, sharp focus",
            "high angle looking down, full body in frame, 35mm lens, intimate perspective",
            "side angle, full body profile, 70mm lens, f1.8, detailed",
            "close-up from behind, focusing on curves, 50mm macro, shallow depth of field",
            "three-quarter rear angle, body and face visible, 85mm lens, bokeh background",
        ];

        this.clothing_full = [
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
        ];

        this.photo_types = [
            "a photo taken with an iPhone",
            "an amateur photo taken with smartphone",
            "a selfie taken with iPhone",
            "a professional photo",
            "a candid photo",
        ];

        this.lighting = [
            "soft diffused lighting, chiaroscuro shadows",
            "natural window lighting, soft shadows",
            "warm golden hour lighting",
            "soft bedroom lighting, intimate atmosphere",
            "dramatic lighting, deep shadows",
            "bright natural lighting",
            "moody dim lighting",
        ];

        this.technical_composition = [
            "tasteful composition, cinematic framing, 85mm lens, f1.8",
            "intimate framing, 50mm lens, f2.0",
            "portrait composition, 85mm lens, f1.4",
            "close-up composition, 70mm lens, f1.8",
            "full body composition, 35mm lens, f2.8",
        ];

        this.texture_quality = [
            "ultra realistic skin texture, subtle skin details, soft shadows on curves",
            "realistic skin texture, natural skin details, authentic look",
            "photorealistic skin, natural imperfections, real skin texture",
            "detailed skin texture, visible pores, natural look",
        ];

        this.overall_quality = [
            "high resolution, gallery quality",
            "ultra high quality, professional grade",
            "4K quality, sharp details",
            "high definition, crisp quality",
        ];

        this.backgrounds = [
            "bedroom background", "bathroom background", "bedroom background with mirror",
            "luxury bedroom background", "hotel room background", "modern apartment background",
            "cozy bedroom setting", "dimly lit bedroom", "steamy bathroom, mirror foggy",
            "shower background, water drops", "bathtub background, bubbles",
            "walk-in closet background", "private dressing room", "penthouse suite background",
            "jacuzzi background", "sauna room background", "gym locker room background",
            "poolside background", "beach cabana background", "massage room background",
            "luxury yacht cabin", "private villa background", "rooftop terrace, city lights",
            "private studio loft", "spa room background", "boutique hotel suite",
            "tropical resort room", "mountain cabin background", "beach house bedroom",
            "private pool area", "wine cellar background", "art studio background",
            "home theater room", "private library setting", "garden terrace background",
        ];

        this.scenarios = [
            "morning after scene", "getting ready for night out", "after shower moment",
            "private photoshoot", "intimate selfie", "boudoir photography session",
            "fitness photoshoot", "swimsuit modeling", "relaxing at home", "getting undressed",
        ];

        this.camera_angles = [
            "eye level angle", "low angle, looking up", "high angle, looking down",
            "over the shoulder shot", "back view, rear angle, correct anatomy",
            "side profile view", "three-quarter angle", "dutch angle, dynamic",
            "close-up shot", "full body shot from below",
        ];

        this.color_tones = [
            "warm neutral tones", "warm soft tones", "cool neutral tones",
            "warm intimate tones", "natural color palette",
        ];

        this.final_touches = [
            "natural imperfections, raw photography style",
            "authentic look, unedited style",
            "realistic photography style",
            "natural aesthetic, raw photo",
        ];

        this.negative_base = "spread legs, explicit anatomy focus, low quality, blurry, bad anatomy, extra fingers, extra limbs, deformed hands, unrealistic skin, cartoon, anime, illustration, 3d render, doll face, plastic skin, watermark, text, logo, twisted torso, broken spine, impossible pose, reversed body, contorted limbs, distorted proportions, mutated anatomy, malformed body";

        this.negative_extras = [
            "fake breasts, implants, artificial look, over-edited",
            "deformed body, mutated, disfigured, bad proportions",
            "painting, drawing, sketch, CGI, over-processed",
            "ugly face, distorted features, bad eyes",
        ];
    }

    _randomChoice(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    _randomFloat() {
        return Math.random();
    }

    generatePrompt(options = {}) {
        const {
            clothed = true,
            wet = false,
            custom_options = {},
            randomize = true,
            explicitness_level = 0
        } = options;

        if (explicitness_level > 0) {
            return this._generateByLevel(explicitness_level, custom_options, randomize);
        }

        const prompt_parts = [];

        if (!clothed) {
            // SIN ROPA
            const conditionValues = Object.values(this.conditions);
            const condition = wet ? "wet" : this._randomChoice(conditionValues);
            if (condition) {
                prompt_parts.push(`nude of a ${condition} ${this._randomChoice(this.person_base)}`);
            } else {
                prompt_parts.push(`nude of a ${this._randomChoice(this.person_base)}`);
            }

            prompt_parts.push(this._randomChoice(this.photo_types));

            // Escenario
            const scenario_option = custom_options.scenario;
            if (scenario_option && scenario_option !== 'random') {
                const scenario_map = {
                    morning_after: 'morning after scene',
                    getting_ready: 'getting ready for night out',
                    after_shower: 'after shower moment',
                    photoshoot: 'private photoshoot',
                    boudoir: 'boudoir photography session',
                    intimate_selfie: 'intimate selfie',
                    getting_undressed: 'getting undressed',
                };
                prompt_parts.push(scenario_map[scenario_option] || this._randomChoice(this.scenarios));
            } else if (randomize && this._randomFloat() > 0.5) {
                prompt_parts.push(this._randomChoice(this.scenarios));
            }

            prompt_parts.push(this._randomChoice(this.lighting));
            prompt_parts.push(this._randomChoice(this.body_modifiers_nude));

            // Expresión facial
            const facial_option = custom_options.facial_expression;
            if (facial_option && facial_option !== 'random') {
                const facial_map = {
                    seductive_gaze: 'seductive gaze', lustful_eyes: 'lustful eyes',
                    playful_smile: 'playful smile', biting_lip: 'biting lip',
                    mouth_open: 'mouth slightly open', intense_contact: 'intense eye contact',
                    bedroom_eyes: 'bedroom eyes',
                };
                prompt_parts.push(facial_map[facial_option] || this._randomChoice(this.facial_expressions));
            } else if (randomize && this._randomFloat() > 0.3) {
                prompt_parts.push(this._randomChoice(this.facial_expressions));
            }

            prompt_parts.push(this._randomChoice(this.poses_nude));

            // Ángulo
            const angle_option = custom_options.camera_angle;
            if (angle_option && angle_option !== 'random') {
                const angle_map = {
                    eye_level: 'eye level angle', low_angle: 'low angle, looking up',
                    high_angle: 'high angle, looking down', over_shoulder: 'over the shoulder shot',
                    from_behind: 'back view, rear angle, correct anatomy, natural spine position',
                    side_profile: 'side profile view', close_up: 'close-up shot',
                    full_body: 'full body shot from below',
                };
                prompt_parts.push(angle_map[angle_option] || this._randomChoice(this.camera_angles));
            } else if (randomize && this._randomFloat() > 0.6) {
                prompt_parts.push(this._randomChoice(this.camera_angles));
            }

            prompt_parts.push(this._randomChoice(this.technical_composition));
            prompt_parts.push(this._randomChoice(this.texture_quality));
            prompt_parts.push(this._randomChoice(this.overall_quality));

            // Background
            const location_option = custom_options.location;
            if (location_option && location_option !== 'random') {
                const location_map = this._getLocationMap();
                prompt_parts.push(location_map[location_option] || this._randomChoice(this.backgrounds));
            } else {
                prompt_parts.push(this._randomChoice(this.backgrounds));
            }

            // Ropa/cobertura
            const clothing_keys = Object.keys(this.clothing);
            const clothing_choice = custom_options.clothing || this._randomChoice(clothing_keys);
            if (clothing_choice !== 'none_nude') {
                prompt_parts.push(this.clothing[clothing_choice]);
            }

            prompt_parts.push(this._randomChoice(this.color_tones));
            prompt_parts.push(this._randomChoice(this.final_touches));
        } else {
            // CON ROPA
            const condition = wet ? "wet" : "";
            if (condition) {
                prompt_parts.push(`${condition} ${this._randomChoice(this.person_base)}`);
            } else {
                prompt_parts.push(this._randomChoice(this.person_base));
            }

            prompt_parts.push(this._randomChoice(this.clothing_full));
            prompt_parts.push(this._randomChoice(this.photo_types));

            // Escenario
            const scenario_option = custom_options.scenario;
            if (scenario_option && scenario_option !== 'random') {
                const scenario_map = {
                    morning_after: 'morning after scene',
                    getting_ready: 'getting ready for night out',
                    after_shower: 'after shower moment',
                    photoshoot: 'private photoshoot',
                    boudoir: 'boudoir photography session',
                    intimate_selfie: 'intimate selfie',
                    getting_undressed: 'getting undressed',
                };
                prompt_parts.push(scenario_map[scenario_option] || this._randomChoice(this.scenarios));
            } else if (randomize && this._randomFloat() > 0.5) {
                prompt_parts.push(this._randomChoice(this.scenarios));
            }

            prompt_parts.push(this._randomChoice(this.lighting));

            // Expresión facial
            const facial_option = custom_options.facial_expression;
            if (facial_option && facial_option !== 'random') {
                const facial_map = {
                    seductive_gaze: 'seductive gaze', lustful_eyes: 'lustful eyes',
                    playful_smile: 'playful smile', biting_lip: 'biting lip',
                    mouth_open: 'mouth slightly open', intense_contact: 'intense eye contact',
                    bedroom_eyes: 'bedroom eyes',
                };
                prompt_parts.push(facial_map[facial_option] || this._randomChoice(this.facial_expressions));
            } else if (randomize && this._randomFloat() > 0.4) {
                prompt_parts.push(this._randomChoice(this.facial_expressions));
            }

            // Pose suave
            if (randomize && this._randomFloat() > 0.7) {
                const soft_poses = ["confident pose", "casual pose", "relaxed pose", "playful pose", "flirty pose"];
                prompt_parts.push(this._randomChoice(soft_poses));
            }

            // Ángulo
            const angle_option = custom_options.camera_angle;
            if (angle_option && angle_option !== 'random') {
                const angle_map = {
                    eye_level: 'eye level angle', low_angle: 'low angle, looking up',
                    high_angle: 'high angle, looking down', over_shoulder: 'over the shoulder shot',
                    from_behind: 'back view, rear angle, correct anatomy, natural spine position',
                    side_profile: 'side profile view', close_up: 'close-up shot',
                    full_body: 'full body shot from below',
                };
                prompt_parts.push(angle_map[angle_option] || this._randomChoice(this.camera_angles));
            } else if (randomize && this._randomFloat() > 0.6) {
                prompt_parts.push(this._randomChoice(this.camera_angles));
            }

            prompt_parts.push(this._randomChoice(this.technical_composition));
            prompt_parts.push(this._randomChoice(this.texture_quality));
            prompt_parts.push(this._randomChoice(this.overall_quality));

            // Background
            const location_option = custom_options.location;
            if (location_option && location_option !== 'random') {
                const location_map = this._getLocationMap();
                prompt_parts.push(location_map[location_option] || this._randomChoice(this.backgrounds));
            } else {
                prompt_parts.push(this._randomChoice(this.backgrounds));
            }

            prompt_parts.push(this._randomChoice(this.color_tones));
            prompt_parts.push(this._randomChoice(this.final_touches));
        }

        const positive_prompt = prompt_parts.join(", ");

        let negative_prompt = this.negative_base;
        if (custom_options && custom_options.camera_angle === 'from_behind') {
            negative_prompt += ", impossible anatomy, front-facing features on back view, face visible from behind, twisted body, unnatural rotation";
        }
        if (randomize && this._randomFloat() > 0.5) {
            negative_prompt += `, ${this._randomChoice(this.negative_extras)}`;
        }

        return {
            model: this.config.model,
            positive_prompt,
            negative_prompt,
            steps: this.config.steps,
            cfg: this.config.cfg,
            sampler: this.config.sampler,
            scheduler: this.config.scheduler,
            width: this.config.width,
            height: this.config.height,
            seed: this.config.seed,
            clip_skip: this.config.clip_skip,
        };
    }

    _generateByLevel(level, custom_options, randomize) {
        const prompt_parts = [];
        prompt_parts.push(this._randomChoice(this.person_base));

        // NIVEL 1: Casual
        if (level === 1) {
            prompt_parts.push(this._randomChoice(this.clothing_level1));
            prompt_parts.push(this._randomChoice(this.photo_types));
            prompt_parts.push(this._randomChoice(this.scenarios_level1));
            prompt_parts.push(this._randomChoice(this.poses_level1));
            prompt_parts.push("natural lighting, soft daylight");
            const bg_casual = ["living room background", "home interior", "park background", "casual setting"];
            prompt_parts.push(this._randomChoice(bg_casual));
        }

        // NIVEL 2: Sugerente
        else if (level === 2) {
            prompt_parts.push(this._randomChoice(this.clothing_level2));
            prompt_parts.push(this._randomChoice(this.photo_types));
            prompt_parts.push(this._randomChoice(this.poses_level2));
            prompt_parts.push(this._randomChoice(this.lighting));
            if (randomize && this._randomFloat() > 0.5) {
                prompt_parts.push(this._randomChoice(this.facial_expressions.slice(0, 5)));
            }
            prompt_parts.push(this._randomChoice(this.backgrounds));
        }

        // NIVEL 3: Provocativo
        else if (level === 3) {
            prompt_parts.push(this._randomChoice(this.clothing_level3));
            prompt_parts.push(this._randomChoice(this.photo_types));
            prompt_parts.push(this._randomChoice(this.poses_level3));
            prompt_parts.push(this._randomChoice(this.lighting));
            if (randomize && this._randomFloat() > 0.3) {
                prompt_parts.push(this._randomChoice(this.facial_expressions));
            }
            prompt_parts.push(this._randomChoice(this.backgrounds));
        }

        // NIVEL 4: Sensual
        else if (level === 4) {
            prompt_parts[0] = `nude of a ${prompt_parts[0]}`;
            const clothing_opt = custom_options.clothing;
            if (clothing_opt && clothing_opt !== 'random' && this.clothing[clothing_opt]) {
                prompt_parts.push(this.clothing[clothing_opt]);
            } else {
                prompt_parts.push(this._randomChoice(this.clothing_level4));
            }
            prompt_parts.push(this._randomChoice(this.photo_types));
            prompt_parts.push(this._randomChoice(this.body_modifiers_nude));
            prompt_parts.push(this._randomChoice(this.poses_level4));
            if (randomize && this._randomFloat() > 0.2) {
                prompt_parts.push(this._randomChoice(this.facial_expressions));
            }
            prompt_parts.push(this._randomChoice(this.lighting));
            prompt_parts.push(this._randomChoice(this.backgrounds));
        }

        // NIVEL 5: Explícito
        else if (level === 5) {
            prompt_parts[0] = `nude of a ${prompt_parts[0]}`;
            prompt_parts.push("completely nude, naked, no clothing");
            prompt_parts.push(this._randomChoice(this.body_mods_level5));
            prompt_parts.push(this._randomChoice(this.poses_level5));
            prompt_parts.push(this._randomChoice(this.scenarios_level5));
            prompt_parts.push(this._randomChoice(this.expressions_level5));
            prompt_parts.push(this._randomChoice(this.lighting_level5));
            prompt_parts.push(this._randomChoice(this.camera_level5));

            const bg_explicit = [
                "luxury bedroom, silk sheets, dim lighting",
                "hotel suite bedroom, king bed, warm ambient light",
                "minimalist bedroom, white sheets, natural light",
                "dark bedroom, moody atmosphere, single lamp",
                "professional photography studio, dark backdrop",
            ];
            prompt_parts.push(this._randomChoice(bg_explicit));

            prompt_parts.push("ultra realistic skin texture, natural skin with subtle details, photorealistic");
            prompt_parts.push("8K, ultra detailed, masterpiece quality, professional photography");
            prompt_parts.push(this._randomChoice(this.color_tones));
            prompt_parts.push("raw photo, unedited look, authentic");

            // Ángulo personalizado
            const angle_opt = custom_options.camera_angle;
            if (angle_opt && angle_opt !== 'random') {
                const angle_map = {
                    eye_level: 'eye level angle', low_angle: 'low angle, looking up',
                    high_angle: 'high angle, looking down', over_shoulder: 'over the shoulder shot',
                    from_behind: 'back view, rear angle, correct anatomy, natural spine position, anatomically accurate',
                    side_profile: 'side profile view', close_up: 'close-up shot',
                    full_body: 'full body shot from below',
                };
                prompt_parts.push(angle_map[angle_opt] || '');
            }

            // Location personalizada
            const loc_opt = custom_options.location;
            if (loc_opt && loc_opt !== 'random') {
                const location_map = this._getLocationMap();
                const filtered = prompt_parts.filter(p => !p.toLowerCase().includes('bedroom') || p.toLowerCase().includes('nude'));
                filtered.push(location_map[loc_opt] || '');
                
                const positive_prompt = filtered.filter(p => p).join(", ");

                let negative_prompt = this.negative_base;
                negative_prompt += ", bad anatomy, wrong anatomy, reversed body, impossible body position";
                negative_prompt += ", extra arms, extra legs, fused limbs, missing limbs";
                negative_prompt += ", distorted face, cross-eyed, bad eyes, ugly face";
                negative_prompt += ", bad hands, deformed fingers, fused fingers, too many fingers";
                negative_prompt += ", clothing, dressed, fabric, textile";
                if (custom_options.camera_angle === 'from_behind') {
                    negative_prompt += ", front-facing features on back view, face visible from behind, twisted body, unnatural rotation, impossible spine";
                }
                if (randomize && this._randomFloat() > 0.5) {
                    negative_prompt += `, ${this._randomChoice(this.negative_extras)}`;
                }

                return {
                    model: this.config.model,
                    positive_prompt,
                    negative_prompt,
                    steps: 35, cfg: 7.0,
                    sampler: this.config.sampler, scheduler: this.config.scheduler,
                    width: this.config.width, height: this.config.height,
                    seed: this.config.seed, clip_skip: this.config.clip_skip,
                };
            }

            const positive_prompt = prompt_parts.filter(p => p).join(", ");

            let negative_prompt = this.negative_base;
            negative_prompt += ", bad anatomy, wrong anatomy, reversed body, impossible body position";
            negative_prompt += ", extra arms, extra legs, fused limbs, missing limbs";
            negative_prompt += ", distorted face, cross-eyed, bad eyes, ugly face";
            negative_prompt += ", bad hands, deformed fingers, fused fingers, too many fingers";
            negative_prompt += ", clothing, dressed, fabric, textile";
            if (custom_options.camera_angle === 'from_behind') {
                negative_prompt += ", front-facing features on back view, face visible from behind, twisted body, unnatural rotation, impossible spine";
            }
            if (randomize && this._randomFloat() > 0.5) {
                negative_prompt += `, ${this._randomChoice(this.negative_extras)}`;
            }

            return {
                model: this.config.model,
                positive_prompt,
                negative_prompt,
                steps: 35, cfg: 7.0,
                sampler: this.config.sampler, scheduler: this.config.scheduler,
                width: this.config.width, height: this.config.height,
                seed: this.config.seed, clip_skip: this.config.clip_skip,
            };
        }

        // Opciones comunes niveles 1-4
        const angle_opt = custom_options.camera_angle;
        if (angle_opt && angle_opt !== 'random') {
            const angle_map = {
                eye_level: 'eye level angle', low_angle: 'low angle, looking up',
                high_angle: 'high angle, looking down', over_shoulder: 'over the shoulder shot',
                from_behind: 'back view, rear angle, correct anatomy, natural spine position',
                side_profile: 'side profile view', close_up: 'close-up shot',
                full_body: 'full body shot from below',
            };
            prompt_parts.push(angle_map[angle_opt] || this._randomChoice(this.camera_angles));
        }

        const loc_opt = custom_options.location;
        if (loc_opt && loc_opt !== 'random') {
            const location_map = this._getLocationMap();
            const filtered = prompt_parts.filter(p => !p.toLowerCase().includes('background') && !p.toLowerCase().includes('setting'));
            filtered.push(location_map[loc_opt] || this._randomChoice(this.backgrounds));
            prompt_parts.length = 0;
            filtered.forEach(p => prompt_parts.push(p));
        }

        if (level >= 2) prompt_parts.push(this._randomChoice(this.technical_composition));
        if (level >= 3) prompt_parts.push(this._randomChoice(this.texture_quality));
        prompt_parts.push(this._randomChoice(this.overall_quality));
        prompt_parts.push(this._randomChoice(this.color_tones));
        if (level >= 3) prompt_parts.push(this._randomChoice(this.final_touches));

        const positive_prompt = prompt_parts.join(", ");

        let negative_prompt = this.negative_base;
        if (custom_options.camera_angle === 'from_behind') {
            negative_prompt += ", impossible anatomy, front-facing features on back view, face visible from behind, twisted body, unnatural rotation";
        }
        if (randomize && this._randomFloat() > 0.5) {
            negative_prompt += `, ${this._randomChoice(this.negative_extras)}`;
        }
        if (level >= 4) {
            negative_prompt += ", bad hands, deformed fingers, extra limbs";
        }

        return {
            model: this.config.model,
            positive_prompt,
            negative_prompt,
            steps: this.config.steps,
            cfg: this.config.cfg,
            sampler: this.config.sampler,
            scheduler: this.config.scheduler,
            width: this.config.width,
            height: this.config.height,
            seed: this.config.seed,
            clip_skip: this.config.clip_skip,
        };
    }

    _getLocationMap() {
        return {
            bedroom: 'bedroom background',
            bathroom: 'bathroom background',
            luxury_bedroom: 'luxury bedroom background',
            hotel_room: 'hotel room background',
            jacuzzi: 'jacuzzi background',
            sauna: 'sauna room background',
            poolside: 'poolside background',
            beach_cabana: 'beach cabana background',
            yacht: 'luxury yacht cabin',
            villa: 'private villa background',
            rooftop: 'rooftop terrace, city lights',
            spa: 'spa room background',
            resort: 'tropical resort room',
            beach_house: 'beach house bedroom',
        };
    }

    generateBatch(count, options = {}) {
        const prompts = [];
        for (let i = 0; i < count; i++) {
            const opts = { ...options };
            if (options.randomize !== false) {
                opts.wet = options.wet || Math.random() > 0.5;
            }
            prompts.push(this.generatePrompt(opts));
        }
        return prompts;
    }
}
