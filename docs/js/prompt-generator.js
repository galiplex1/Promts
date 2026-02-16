/**
 * Generador automático de prompts para modelo de IA (SDXL)
 * Versión JavaScript - Sin dependencias de servidor
 * v2.0 - Enhanced quality + Voting system
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

        // === PERSONA BASE FIJA ===
        this.person_fixed = {
            base: "stunning young woman, 22 years old",
            skin: "sun-kissed tan skin, smooth flawless complexion, natural glow",
            eyes: "bright green eyes, captivating intense gaze",
            face: "perfect symmetrical face, high cheekbones, full lips",
            makeup: "natural makeup, glossy lips, subtle eyeliner, fresh look",
        };

        // === ESTILOS DE PELO ===
        this.hair_styles = {
            long_straight: "long straight hair, sleek and flowing, shoulder below",
            long_waves: "long wavy hair, soft waves, cascading over shoulders",
            long_curls: "long curly hair, spiral curls, voluminous and bouncy",
            long_braids: "long braided hair, intricate braids, bohemian style",
            shoulder: "shoulder-length hair, classic shoulder bob, versatile length",
            short_bob: "short bob cut, chin-length, modern and chic",
            pixie: "short pixie cut, edgy and daring, close to scalp",
            ponytail: "high sleek ponytail, tight and polished, reveals face",
            bun: "hair in tight bun, pulled back elegantly, minimal strands",
            messy_bun: "messy bun, loose and effortless, casual sexy vibe",
            half_up: "half-up half-down, partial updo, romantic style",
            curtains: "curtain bangs, framing the face, trendy and soft",
            thick_mane: "thick full mane of hair, voluminous and luxurious",
            tousled: "tousled bedhead hair, undone and sexy, natural texture",
            sleek: "sleek and glossy hair, ultra-smooth, mirror shine",
        };

        // === COLORES DE PELO ===
        this.hair_colors = {
            blonde: "blonde hair, sun-kissed golden highlights, light and bright",
            dark_blonde: "dark blonde hair, honey-toned, warm light brown-blonde mix",
            brunette: "brunette hair, dark chocolate brown, rich and warm",
            light_brown: "light brown hair with caramel highlights, warm medium brown",
            black: "jet black hair, deep and glossy black, elegant",
            red: "red hair, fiery copper-red, vibrant and striking",
            auburn: "auburn hair, dark reddish-brown, luxurious deep tone",
            strawberry_blonde: "strawberry blonde hair, light red-blonde mix, rare and beautiful",
            ombre: "ombre hair, dark at roots to light at tips, color gradient effect",
            balayage: "balayage hair, naturally highlighted, sun-kissed dimension",
            platinum: "platinum blonde hair, silver-blonde, ultra-light and icy",
            rose_gold: "rose gold hair, pink-gold tone, trendy metallic",
            ash_brown: "ash brown hair, cool-toned muted brown, sophisticated",
            chestnut: "chestnut brown hair, reddish undertones, warm rich brown",
            burgundy: "burgundy hair, deep wine-red, dark and mysterious",
        };

        // === ESTILOS DE PERSONA ===
        this.person_styles = {
            normal: {
                modifier: "confident and naturally beautiful",
                extras: "effortless elegance, girl-next-door charm",
            },
            futbolera: {
                modifier: "athletic soccer player build, sporty and fit",
                extras: "toned athletic body, post-workout glow, energetic vibe",
            },
            alternativa: {
                modifier: "alternative style, edgy and unique",
                extras: "tattoos on arms and ribs, nose piercing, rebellious energy",
            },
            gotica: {
                modifier: "gothic aesthetic, dark mysterious beauty",
                extras: "dark smoky eye makeup, black nail polish, pale skin, mysterious aura",
            },
            pija: {
                modifier: "elegant upscale sophisticated style",
                extras: "designer jewelry, polished refined look, luxury aesthetic",
            },
            hipster: {
                modifier: "hipster indie style, artistic vibe",
                extras: "vintage aesthetic, bohemian accessories, creative energy",
            },
        };

        // === TAMAÑOS DE PECHOS ===
        this.breast_sizes = {
            small: "small perky breasts, A-cup, petite chest, natural small bust",
            medium: "medium natural breasts, B-cup, proportional bust, perky and firm",
            large: "large natural breasts, C-cup, full bust, shapely and round",
            huge: "huge natural breasts, D-cup or larger, very large bust, voluptuous chest, heavy and full",
        };

        // === ACCESORIOS (opcionales) ===
        this.accessories = [
            "delicate gold chain necklace",
            "simple diamond stud earrings",
            "thin gold bracelet on wrist",
            "small heart pendant necklace",
            "silver hoop earrings",
            "layered dainty necklaces",
            "elegant choker necklace",
            "belly chain, subtle and feminine",
            "anklet bracelet, delicate",
            "statement ring on finger",
        ];

        // === ESTILO FOTOGRÁFICO ===
        this.style_modifiers = [
            "shot on Kodak Portra 400, warm film grain",
            "Fujifilm Pro 400H style, pastel tones, soft grain",
            "cinematic color grading, movie-like quality",
            "analog photography style, subtle film grain",
            "editorial photography, high fashion magazine quality",
            "shot on Canon EOS R5, crisp razor-sharp detail",
            "Hasselblad medium format, incredible resolution and detail",
            "natural available light photography, authentic feel",
            "professional DSLR quality, tack sharp focus",
            "high fashion editorial look, Vogue quality",
            "intimate documentary photography style",
            "shot on Sony A7IV, stunning dynamic range",
        ];

        // === ATMÓSFERA ===
        this.atmosphere_details = [
            "warm intimate atmosphere, cozy and inviting",
            "moody atmospheric setting, cinematic vibe",
            "bright airy atmosphere, fresh and clean",
            "sultry dark atmosphere, mysterious allure",
            "romantic soft atmosphere, dreamy ethereal quality",
            "raw authentic atmosphere, candid genuine feel",
            "luxurious elegant atmosphere, refined and polished",
            "casual relaxed atmosphere, natural unposed moment",
        ];

        // === CONDICIONES ===
        this.conditions = {
            wet: "wet",
            dry: "",
            sweaty: "sweaty, glistening skin",
            oiled: "oiled skin, glistening highlights",
        };

        // === MODIFICADORES DE CUERPO (DESNUDO) ===
        this.body_modifiers_nude = [
            "natural body proportions, realistic figure",
            "natural body proportions, large shapely breasts",
            "natural body proportions, perfect perky breasts",
            "athletic build, toned body, firm natural breasts",
            "curvy body, natural proportions, voluptuous hourglass figure",
            "slim body, petite frame, perky small breasts",
            "fit body, defined curves, visible toned abs",
            "hourglass figure, wide hips, narrow cinched waist",
            "thick thighs, round hips, natural generous curves",
            "petite body, delicate features, feminine proportions",
            "tall athletic body, long toned legs, model figure",
            "busty figure, natural large breasts, slim waist",
            "slim waist, round firm buttocks, feminine curves",
            "toned dancer body, graceful proportions, lean muscle",
            "soft natural curves, womanly proportions, realistic body",
            "athletic cheerleader build, perky breasts, toned stomach",
        ];

        // === POSES (DESNUDO) ===
        this.poses_nude = [
            "sexy confident pose, weight on one hip",
            "sensual pose, one hand in hair",
            "seductive pose, back slightly arched",
            "provocative pose, hand on hip",
            "intimate pose, leaning forward slightly",
            "alluring pose, looking over bare shoulder",
            "tempting pose, fingers tracing collarbone",
            "flirtatious pose, playful twist of body",
            "sultry pose, chin tilted down, eyes up",
            "erotic pose, tasteful artistic framing",
            "passionate pose, hands running through hair",
            "suggestive pose, subtle hip thrust",
            "teasing pose, one knee slightly bent",
            "bending over pose, natural curve of spine",
            "arching back pose, chest forward, graceful line",
            "looking over shoulder pose, back muscles visible",
            "lying on side, head propped on hand",
            "reclining pose, arms stretched above head",
            "standing contrapposto, classical pose",
            "sitting cross-legged, relaxed and intimate",
            "kneeling pose, sitting on heels, hands on thighs",
            "leaning against wall, casual confident stance",
        ];

        // === EXPRESIONES FACIALES (expandido) ===
        this.facial_expressions = [
            "seductive gaze, knowing half-smile",
            "lustful eyes, slightly parted lips",
            "playful smile, mischievous sparkle in eyes",
            "biting lower lip, intense stare",
            "mouth slightly open, breathless look",
            "intense eye contact, burning gaze",
            "sultry look, hooded bedroom eyes",
            "bedroom eyes, soft lazy smile",
            "teasing expression, raised eyebrow",
            "passionate look, flushed cheeks",
            "innocent doe eyes, soft pouty lips",
            "confident smirk, self-assured expression",
            "dreamy faraway gaze, soft expression",
            "coy smile, looking through lashes",
            "fierce determined stare, strong jawline",
            "laughing naturally, genuine joy",
            "mysterious Mona Lisa smile, enigmatic",
            "vulnerable open expression, raw emotion",
            "smoldering intense gaze, magnetic",
            "soft serene expression, peaceful beauty",
        ];

        // === ROPA/COBERTURA ===
        this.clothing = {
            towel: "covered with a towel, freshly showered",
            towel_barely: "barely covered with a small towel, slipping off",
            bedsheet: "wrapped in white bedsheet, morning light",
            bedsheet_revealing: "partially covered with silk bedsheet, revealing curves",
            lingerie: "wearing delicate lace lingerie",
            lingerie_sheer: "wearing sheer see-through lingerie, skin visible underneath",
            lingerie_lace: "wearing French lace lingerie, barely covering",
            bikini: "wearing bikini, beach ready",
            bikini_micro: "wearing micro bikini, extremely revealing, minimal coverage",
            underwear: "wearing cotton underwear, casual intimate",
            underwear_tiny: "wearing tiny thong underwear, minimal fabric",
            bra_panties: "wearing matching lace bra and panties set",
            nightgown: "wearing sheer silk nightgown, flowing fabric",
            nightgown_transparent: "wearing transparent chiffon nightgown, body visible",
            robe: "wearing open silk robe, loosely tied",
            robe_revealing: "wearing loosely tied satin robe, falling off one shoulder",
            body_paint: "wearing only artistic body paint, nude underneath",
            jewelry_only: "wearing only delicate jewelry, completely exposed",
            silk_robe: "wearing silk kimono robe, barely tied, sliding open",
            mesh_lingerie: "wearing mesh fishnet lingerie, fully see-through",
            harness_lingerie: "wearing leather harness lingerie set, bondage style",
            stockings_garter: "wearing lace-top thigh-high stockings and garter belt only",
            corset: "wearing tight boned corset, cinched waist, push-up effect",
            bodysuit_sheer: "wearing sheer mesh bodysuit, second-skin effect",
            none_nude: "completely nude, natural",
        };

        // === NIVEL 1: Casual/Inocente ===
        this.clothing_level1 = [
            "wearing cozy oversized hoodie and sweatpants",
            "wearing casual jeans and vintage t-shirt",
            "wearing comfortable knit sweater and leggings",
            "wearing casual home clothes, relaxed and natural",
            "wearing everyday outfit, effortless natural look",
            "wearing simple cotton sundress, modest and fresh",
            "wearing cardigan and mom jeans, casual chic",
            "wearing flannel shirt and shorts, cozy weekend look",
            "wearing athletic wear, post-workout casual",
        ];

        this.poses_level1 = [
            "relaxed natural pose, genuine comfort",
            "casual candid stance, mid-movement",
            "natural sitting pose, legs crossed",
            "comfortable lounging position",
            "candid laughing moment, unposed",
            "standing casually, hand in pocket",
            "leaning against doorframe, relaxed",
        ];

        this.scenarios_level1 = [
            "at home with pet dog, cozy living room",
            "reading a book on plush couch, afternoon light",
            "having morning coffee in sunlit kitchen",
            "walking through autumn park, golden leaves",
            "doing everyday activities, natural environment",
            "relaxing at home on lazy Sunday",
            "cooking in kitchen, casual domestic moment",
            "sitting by window, rainy day, warm inside",
        ];

        // === NIVEL 2: Sugerente ===
        this.clothing_level2 = [
            "wearing tight yoga pants and fitted tank top, showing figure",
            "wearing skinny jeans and crop top, midriff exposed",
            "wearing bodycon dress, hugging every curve",
            "wearing sports bra and leggings, athletic and toned",
            "wearing fitted cocktail dress, showing silhouette",
            "wearing tight jeans and low-cut v-neck top, subtle cleavage",
            "wearing off-shoulder knit sweater, exposed collarbone",
            "wearing high-waisted shorts and tied crop top, summer vibes",
            "wearing tight pencil skirt and fitted blouse, office sexy",
        ];

        this.poses_level2 = [
            "flirty pose, hip cocked to one side",
            "playful stance, tossing hair back",
            "confident power pose, shoulders back",
            "teasing expression, finger on lips",
            "suggestive look, leaning forward slightly",
            "stretching pose, arms up, shirt riding up",
            "casual model pose, natural and effortless",
        ];

        // === NIVEL 3: Provocativo ===
        this.clothing_level3 = [
            "wearing black lace lingerie set, delicate and sexy",
            "wearing string bikini, minimal coverage",
            "wearing lace bralette and matching panties",
            "wearing sheer silk nightgown, body visible beneath",
            "wearing tight mini skirt and tiny crop top, maximum skin",
            "wearing micro string bikini, barely there",
            "wearing revealing lace teddy lingerie",
            "wearing cutout bodysuit, strategic skin exposure",
            "wearing sheer babydoll lingerie, see-through",
        ];

        this.poses_level3 = [
            "seductive pose, finger tracing neckline",
            "provocative stance, one strap falling off shoulder",
            "alluring position, lying on bed, propped on elbows",
            "sensual pose, arching back on bed",
            "tempting look, pulling at waistband",
            "kneeling on bed, looking up at camera",
            "reclining on chaise, one leg extended",
        ];

        // === NIVEL 4: Sensual ===
        this.clothing_level4 = [
            "covered with towel, slipping off, skin glistening",
            "barely covered with small towel, about to drop",
            "wrapped loosely in silk bedsheet, morning after",
            "partially covered with bedsheet, one breast exposed, revealing curves",
            "wearing sheer see-through lingerie, everything visible",
            "wearing open silk robe, nothing underneath",
            "wearing only thigh-high stockings, nothing else",
            "wearing unbuttoned oversized shirt, bare underneath",
        ];

        this.poses_level4 = [
            "sensual pose, bedsheet sliding down body",
            "intimate position, reaching toward camera",
            "alluring stance, towel barely held in place",
            "seductive posture, lying in rumpled sheets",
            "provocative pose, straddling edge of bed",
            "post-shower pose, water droplets on skin",
            "undressing moment, clothing mid-removal",
        ];

        // === NIVEL 5: Explícito ===
        this.poses_level5 = [
            "on all fours position, back arched naturally, looking over shoulder at camera, perfect anatomy, natural confident spine curve",
            "on hands and knees, doggy style pose, rear view, round buttocks prominently visible, back arched naturally, skin catching light",
            "bent over bed edge, ass raised high, face resting on silk sheets, back view, spine arched beautifully, natural body position",
            "kneeling on bed, legs apart, hands resting on thighs, frontal view, confident open posture, direct gaze",
            "lying on back, legs spread invitingly, arms stretched above head, inviting vulnerable position, looking directly at camera",
            "sitting on edge of bed, legs wide open, leaning back on hands, direct challenging eye contact, confident",
            "standing bent over, hands gripping knees, rear angle view, looking back seductively at camera over shoulder",
            "lying face down on satin sheets, ass raised provocatively, side angle, head turned to camera with half-smile",
            "straddling position, kneeling upright, hands running through hair, frontal view, chest forward",
            "on knees, arching back deeply, hands clasped behind head, chest and breasts pushed forward, dramatic backlight",
            "squatting position, facing camera, hands braced on floor between knees, intimate low angle, direct eye contact",
            "lying on side, top leg raised and bent, revealing intimate areas, languid eye contact with camera, relaxed sensuality",
            "reverse cowgirl position, looking back over shoulder, ass prominent, hands on bed for support",
            "spread eagle on bed, arms and legs outstretched, completely exposed, vulnerable but confident expression",
            "standing with one leg raised on chair, frontal view, full body exposed, hand on raised thigh",
        ];

        this.body_mods_level5 = [
            "perfect female anatomy, hyper-detailed realistic body, natural skin texture with subtle pores and imperfections, visible natural muscle definition under soft skin",
            "curvy voluptuous body, wide rounded hips, narrow waist, natural large breasts with realistic weight and shape, proportional realistic figure",
            "athletic toned body, firm round buttocks, flat defined stomach, visible ab lines, natural perky breasts, strong thighs",
            "voluptuous figure, thick soft thighs, round full ass, dramatic hourglass shape, natural pendulous curves",
            "slim petite body, small perky breasts with visible nipples, tight compact figure, delicate bone structure, youthful skin",
            "fit toned body, long lean legs, sculpted glutes, feminine muscle definition visible, proportional medium breasts, dancer physique",
            "naturally curvy body, soft belly, real proportions, large natural breasts, wide hips, authentic feminine body",
            "model-like body, long torso, endless legs, small waist, B-cup natural breasts, runway proportions",
        ];

        this.lighting_level5 = [
            "soft warm lighting from side, shadows lovingly accentuating every curve, intimate cozy atmosphere, warm color temperature",
            "dim bedroom lighting, warm amber lamp glow, soft shadows playing on bare skin, romantic mood",
            "natural window light from behind, golden silhouette edges, warm rim light tracing body contours, backlit beauty",
            "candlelight ambiance, warm flickering golden light, deep romantic shadows, skin glowing warmly",
            "professional studio lighting, key light sculpting body perfectly, soft fill light, dramatic contrast on curves",
            "moody low-key lighting, single dramatic light source, deep shadows emphasizing feminine form, chiaroscuro effect",
            "golden hour sunlight streaming through blinds, striped light pattern across nude body, warm and artistic",
            "overhead ring light, even illumination, catch lights in eyes, professional intimate shoot lighting",
        ];

        this.scenarios_level5 = [
            "private intimate moment, luxurious bedroom setting, silk sheets rumpled",
            "erotic boudoir photoshoot session, professional studio, artistic direction",
            "spontaneous intimate photo, authentic unplanned moment, genuine desire",
            "private boudoir session in luxurious penthouse, city lights through windows",
            "intimate bedroom scene, just undressed, clothes scattered on floor",
            "personal explicit photo for lover, raw desire, private moment captured",
            "morning light intimate session, just woke up, natural and real",
            "after-bath intimate moment, skin still damp, steamy atmosphere",
        ];

        this.expressions_level5 = [
            "lustful gaze directly at camera, lips parted and glossy, heavy-lidded eyes, flushed pink cheeks, desire visible",
            "intense burning eye contact, teeth gently biting lower lip, visibly aroused expression, dilated pupils",
            "mouth slightly open in anticipation, bedroom eyes half-closed, seductive knowing smirk",
            "looking over shoulder with raw desire, half-closed sultry eyes, teasing tongue touching upper lip",
            "direct passionate stare into lens, lips parted breathing heavily, heated flushed expression",
            "eyes closed in ecstasy, head tilted back, neck exposed, natural blissful expression, lips parted",
            "vulnerable open expression, soft pleading eyes, innocent yet aware, lips slightly pouty",
            "fierce dominant stare, commanding expression, confident sexuality, slight smirk of control",
        ];

        this.camera_level5 = [
            "shot from behind and slightly below, emphasizing curves and rear, 50mm lens, f1.8, shallow depth of field",
            "low angle rear view, natural body proportions emphasized, 35mm lens, wider perspective, dramatic angle",
            "eye level front view, full body clearly visible, 85mm portrait lens, f2.0, razor sharp focus on body",
            "high angle looking down at subject, full body in frame, 35mm lens, intimate dominating perspective",
            "side profile angle, full body silhouette visible, 70mm lens, f1.8, detailed body contour",
            "close-up from behind, focusing on curves and form, 50mm macro, extreme shallow depth of field, bokeh",
            "three-quarter rear angle, body and face both visible, 85mm lens, creamy bokeh background",
            "worm's eye view looking up, dramatic foreshortening, 24mm wide angle, powerful perspective",
        ];

        // === ROPA COMPLETA (nivel 0 con ropa) ===
        this.clothing_full = [
            "wearing casual home outfit, comfortable and real",
            "wearing oversized boyfriend shirt, no bra, nipples faintly visible through thin fabric",
            "wearing sports bra and leggings, athletic and toned",
            "wearing tight yoga pants and sports bra, every curve defined",
            "wearing crop top and high-waisted shorts, midriff showing",
            "wearing very short crop top and tiny shorts, maximum skin",
            "wearing tight bodycon dress, fabric hugging every curve",
            "wearing tight red bodycon dress, curves on full display",
            "wearing casual flowy summer dress, feminine and light",
            "wearing short sundress, long bare legs, summer vibes",
            "wearing fitted ribbed tank top and jeans, casual sexy",
            "wearing deep v-neck tank top and tight jeans, cleavage prominent",
            "wearing oversized knit sweater, bare legs underneath",
            "wearing oversized shirt as dress, long bare legs, morning look",
            "wearing bikini top and cutoff jean shorts, beach casual",
            "wearing string bikini top and tiny denim shorts, tanned skin",
            "wearing lace bralette and silk panties, intimate lingerie moment",
            "wearing sheer white shirt soaked in water, completely see-through, skin visible",
            "wearing tight leather mini skirt and crop top, edgy nightlife",
            "wearing fishnet stockings and garter belt with black lingerie set",
            "wearing thigh-high knit stockings and oversized cozy sweater, nothing else",
            "wearing nothing but boyfriend's white shirt, half-unbuttoned, bare legs",
            "wearing shiny latex bodysuit, skin-tight, reflecting light",
            "wearing leather harness lingerie, dominatrix aesthetic",
            "wearing torn distressed jeans and sports bra, effortlessly sexy",
            "wearing liquid satin slip dress, clinging to every curve, no underwear visible",
            "wearing mesh crop top and leather pants, nightclub ready",
            "wearing denim micro skirt and tied halter top, festival style",
            "wearing elegant off-shoulder evening dress, showing bare shoulders and collarbone",
            "wearing tube top and booty shorts, maximum skin exposure",
            "wearing deep plunging v-neck bodysuit, cleavage to navel",
            "wearing sheer lace dress layered over matching lingerie, elegant erotic",
        ];

        // === TIPOS DE FOTO (expandido) ===
        this.photo_types = [
            "a photo taken with iPhone 15 Pro, natural mobile quality",
            "an amateur photo taken with smartphone, authentic and real",
            "a selfie taken with iPhone front camera, close and personal",
            "a professional photo, studio quality lighting and composition",
            "a candid photo, unposed natural moment captured",
            "a mirror selfie, bathroom mirror, flash visible",
            "a photo taken by boyfriend, intimate personal perspective",
            "a professional boudoir photograph, artistic and sensual",
            "a spontaneous photo, caught between moments",
            "a high-end editorial photograph, magazine quality",
            "amateur bedroom photo, warm lamp light, genuine",
            "professional portrait photograph, perfectly lit",
        ];

        // === ILUMINACIÓN (expandido) ===
        this.lighting = [
            "soft diffused lighting, beautiful chiaroscuro shadows on body",
            "natural window lighting, soft directional shadows",
            "warm golden hour lighting, everything bathed in gold",
            "soft bedroom lamp lighting, intimate warm atmosphere",
            "dramatic single-source lighting, deep moody shadows",
            "bright natural daylight, fresh and vibrant",
            "moody dim lighting, mysterious and alluring",
            "neon accent lighting, modern urban vibe, colored reflections on skin",
            "overhead ring light, even flattering illumination",
            "candlelight only, warm flickering romantic glow",
            "backlit silhouette lighting, golden rim light outlining body",
            "soft overcast natural light, even and flattering, no harsh shadows",
            "blue hour twilight, cool tones, city lights in background",
            "studio beauty lighting, butterfly pattern, flawless skin rendering",
        ];

        // === COMPOSICIÓN TÉCNICA (expandido) ===
        this.technical_composition = [
            "tasteful composition, cinematic framing, 85mm lens, f1.8, shallow DOF",
            "intimate close framing, 50mm lens, f2.0, subject fills frame",
            "classic portrait composition, 85mm lens, f1.4, creamy bokeh background",
            "tight close-up composition, 70mm lens, f1.8, extreme detail",
            "full body composition, 35mm lens, f2.8, environmental context",
            "rule of thirds composition, 85mm lens, f2.0, balanced frame",
            "center-weighted composition, 50mm lens, f1.8, subject dominant",
            "wide environmental portrait, 24mm lens, f4.0, scene context",
            "medium close-up, waist up, 70mm lens, f2.0, intimate distance",
            "dramatic composition, dutch angle slight tilt, 50mm, f1.4, dynamic energy",
        ];

        // === TEXTURA Y PIEL (expandido) ===
        this.texture_quality = [
            "ultra realistic skin texture, subtle pores visible, soft natural shadows on curves",
            "realistic skin texture, natural imperfections, authentic unretouched look",
            "photorealistic skin rendering, visible fine peach fuzz, real human skin",
            "detailed skin texture, natural fine pores, subtle skin variations",
            "hyper-detailed skin, subsurface scattering effect, lifelike translucency",
            "natural skin with subtle moles and freckles, perfectly imperfect",
            "smooth youthful skin texture, natural collagen glow, realistic detail",
            "realistic skin, visible goosebumps texture, natural reaction to environment",
        ];

        // === CALIDAD GENERAL (expandido) ===
        this.overall_quality = [
            "high resolution, gallery exhibition quality",
            "ultra high quality, professional photography grade",
            "4K resolution, razor sharp fine details",
            "high definition, crisp and clean quality",
            "8K masterpiece quality, every detail perfect",
            "award-winning photography quality, exceptional",
            "magazine cover quality, professional retouching",
            "fine art photography quality, museum worthy",
        ];

        // === FONDOS/UBICACIONES (mejorado con más atmósfera) ===
        this.backgrounds = [
            "cozy bedroom, rumpled sheets, warm lamp light",
            "modern bathroom, steam on mirror, marble surfaces",
            "bedroom with floor-to-ceiling mirror, reflections",
            "luxury bedroom, silk sheets, designer furniture",
            "boutique hotel room, tasteful decor, city view",
            "modern minimalist apartment, clean lines, natural light",
            "cozy dimly lit bedroom, fairy lights, intimate",
            "warmly lit bedroom, candles scattered, romantic setting",
            "steamy bathroom after shower, foggy mirror, water droplets",
            "spacious walk-in rain shower, water cascading, steam",
            "freestanding bathtub, bubbles, candles, relaxation",
            "luxurious walk-in closet, designer clothes, full mirror",
            "private dressing room, vanity mirror with lights",
            "penthouse suite, panoramic city skyline view at night",
            "private jacuzzi, bubbling water, warm lighting",
            "wooden sauna room, steam, warm amber tones",
            "gym locker room, athletic setting, harsh lighting",
            "infinity pool edge, sunset view, resort setting",
            "private beach cabana, sheer curtains, ocean view",
            "spa massage room, bamboo decor, essential oil diffusers",
            "luxury super yacht master cabin, ocean through porthole",
            "private Mediterranean villa, terracotta and white",
            "rooftop terrace, city lights twinkling below, night",
            "industrial loft studio, exposed brick, large windows",
            "zen spa room, natural wood, smooth stones, tranquility",
            "boutique hotel suite, four-poster bed, velvet curtains",
            "tropical resort bungalow, ocean visible, palm shadows",
            "cozy mountain cabin, fireplace glow, wooden beams",
            "beach house bedroom, white linens, sea breeze through curtains",
            "private heated pool, underwater lights, twilight sky",
            "wine cellar, dim warm lighting, stone walls",
            "artist studio, paint splattered, creative chaos, natural light",
            "home theater room, dim blue ambient lighting",
            "private library, leather and wood, warm lamp light",
            "garden terrace, fairy lights, warm summer evening",
            "full-length standing mirror, bathroom background, natural light",
            "bedroom mirror selfie, reflected in large mirror, indirect light",
            "bathroom mirror, vanity lights around mirror, glowing ambient",
            "full-body mirror view, bedroom mirror reflecting body, warm glow",
            "mirror selfie, bathroom mirror with steam, sultry moody lighting",
            "standing mirror reflection, bedroom interior visible in mirror",
            "bathroom mirror shot, light reflections on mirror surface, intimate",
            "dressing room mirror, full-length mirror, soft diffused light",
            "mirror reflection selfie, city bedroom, glass reflection effect",
            "bathroom mirror framed shot, luxury bathroom, candle reflections",
        ];

        // === ESCENARIOS ===
        this.scenarios = [
            "morning after scene, just woke up, sheets tangled",
            "getting ready for a night out, half-dressed",
            "fresh out of shower moment, skin still damp",
            "private intimate photoshoot, studio setup",
            "intimate selfie for someone special",
            "professional boudoir photography session",
            "post-workout glow, athletic moment",
            "swimsuit modeling session, confident poses",
            "relaxing at home alone, unguarded moment",
            "getting undressed, clothing mid-removal",
            "trying on outfits, caught between changes",
            "lazy weekend morning in bed, natural light",
            "mirror selfie moment, taking photo in mirror, reflected image",
            "bathroom mirror photo, checking appearance in mirror",
            "full-length mirror pose, viewing body in reflection",
            "mirror selfie after shower, bathroom steam in background",
            "getting ready moment, mirror selfie, applying finishing touches",
        ];

        // === ÁNGULOS DE CÁMARA ===
        this.camera_angles = [
            "eye level angle, natural perspective",
            "low angle, looking up, empowering perspective",
            "high angle, looking down, intimate vulnerability",
            "over the shoulder shot, mysterious",
            "back view, rear angle, correct anatomy, natural spine",
            "side profile view, silhouette emphasis",
            "three-quarter angle, classic flattering angle",
            "dutch angle, dynamic energy, slight tilt",
            "close-up shot, face and upper body detail",
            "full body shot, head to toe composition",
            "bird's eye view, looking straight down",
            "worm's eye view, dramatic upward perspective",
        ];

        // === TONOS DE COLOR (expandido) ===
        this.color_tones = [
            "warm neutral tones, natural color balance",
            "warm soft golden tones, honey-like warmth",
            "cool desaturated tones, moody and editorial",
            "warm intimate amber tones, romantic feeling",
            "natural true-to-life color palette",
            "rich deep saturated tones, vibrant and punchy",
            "muted pastel tones, soft and dreamy",
            "high contrast with warm shadows, dramatic",
            "film-like color science, organic warmth",
            "split complementary tones, visually striking",
        ];

        // === TOQUES FINALES (expandido) ===
        this.final_touches = [
            "natural imperfections, raw unedited photography style",
            "authentic genuine look, unretouched aesthetic",
            "realistic photography style, no post-processing look",
            "natural aesthetic, raw photo, film-like quality",
            "subtle lens flare, adding warmth and authenticity",
            "slight motion blur on hair, adding life and movement",
            "natural lens vignette, drawing eye to subject",
            "authentic grain texture, analog photography feel",
        ];

        // === PROMPTS NEGATIVOS ===
        this.negative_base = "low quality, worst quality, blurry, out of focus, bad anatomy, extra fingers, extra limbs, missing fingers, deformed hands, unrealistic proportions, cartoon, anime, illustration, 3d render, CGI, doll face, plastic skin, uncanny valley, watermark, text, logo, signature, twisted torso, broken spine, impossible pose, reversed body, contorted limbs, distorted proportions, mutated anatomy, malformed body, duplicate, clone, extra body parts";

        this.negative_extras = [
            "fake breasts, implants, artificial look, over-edited, overprocessed, airbrushed, plastic surgery",
            "deformed body, mutated, disfigured, bad proportions, asymmetric face, misshapen body",
            "painting, drawing, sketch, CGI, over-processed, digital art, render, illustration style",
            "ugly face, distorted features, bad eyes, cross-eyed, lazy eye, wrong eye direction",
            "bad hands, wrong number of fingers, fused fingers, extra thumbs, claw hands",
            "unnatural skin color, grey skin, green tint, oversaturated skin, dead skin color",
            "bad lighting, flat lighting, no shadows, over-exposed, under-exposed, blown highlights",
            "cropped awkwardly, bad framing, cut off limbs, missing feet, head cropped",
        ];

        // === SISTEMA DE VOTOS ===
        this._loadVoteData();
    }

    // --- Carga datos de votos desde localStorage ---
    _loadVoteData() {
        try {
            this.voteData = JSON.parse(localStorage.getItem('promptVoteData') || '{}');
        } catch {
            this.voteData = {};
        }
    }

    _saveVoteData() {
        try {
            localStorage.setItem('promptVoteData', JSON.stringify(this.voteData));
        } catch (e) {
            console.warn('Could not save vote data:', e);
        }
    }

    // --- Registra un voto para un prompt ---
    registerVote(promptText, voteType) {
        const elements = this._extractElements(promptText);
        elements.forEach(el => {
            if (!this.voteData[el]) {
                this.voteData[el] = { up: 0, down: 0 };
            }
            this.voteData[el][voteType]++;
        });
        this._saveVoteData();
    }

    // --- Extrae elementos identificables del prompt ---
    _extractElements(text) {
        const elements = [];
        const allArrays = {
            person_base: this.person_base,
            hair_styles: this.hair_styles,
            skin_tones: this.skin_tones,
            eye_details: this.eye_details,
            makeup_styles: this.makeup_styles,
            body_modifiers_nude: this.body_modifiers_nude,
            poses_nude: this.poses_nude,
            poses_level5: this.poses_level5,
            facial_expressions: this.facial_expressions,
            lighting: this.lighting,
            lighting_level5: this.lighting_level5,
            backgrounds: this.backgrounds,
            photo_types: this.photo_types,
            style_modifiers: this.style_modifiers,
            atmosphere_details: this.atmosphere_details,
            color_tones: this.color_tones,
            body_mods_level5: this.body_mods_level5,
            expressions_level5: this.expressions_level5,
        };

        const lowerText = text.toLowerCase();
        for (const [arrayName, arr] of Object.entries(allArrays)) {
            for (const item of arr) {
                const itemWords = item.toLowerCase().split(/[\s,]+/).filter(w => w.length > 3);
                const matchCount = itemWords.filter(w => lowerText.includes(w)).length;
                if (itemWords.length > 0 && matchCount / itemWords.length > 0.6) {
                    elements.push(`${arrayName}::${item}`);
                }
            }
        }
        return elements;
    }

    // --- Obtiene estadísticas de votos ---
    getVoteStats() {
        const stats = { totalVotes: 0, preferences: [], avoided: [] };
        for (const [key, data] of Object.entries(this.voteData)) {
            const score = (data.up || 0) - (data.down || 0);
            const total = (data.up || 0) + (data.down || 0);
            stats.totalVotes += total;
            if (score > 0) stats.preferences.push({ element: key.split('::')[1] || key, score, votes: total });
            if (score < 0) stats.avoided.push({ element: key.split('::')[1] || key, score, votes: total });
        }
        stats.preferences.sort((a, b) => b.score - a.score);
        stats.avoided.sort((a, b) => a.score - b.score);
        return stats;
    }

    clearVoteData() {
        this.voteData = {};
        this._saveVoteData();
    }

    // --- Selección aleatoria con pesos basados en votos ---
    _smartChoice(arr, arrayName) {
        if (!this.voteData || Object.keys(this.voteData).length === 0) {
            return this._randomChoice(arr);
        }

        const weights = arr.map(item => {
            const key = `${arrayName}::${item}`;
            const data = this.voteData[key];
            if (!data) return 1.0;
            const score = (data.up || 0) - (data.down || 0);
            return Math.max(0.1, 1.0 + score * 0.4);
        });

        const totalWeight = weights.reduce((sum, w) => sum + w, 0);
        let random = Math.random() * totalWeight;
        for (let i = 0; i < arr.length; i++) {
            random -= weights[i];
            if (random <= 0) return arr[i];
        }
        return arr[arr.length - 1];
    }

    _randomChoice(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    _randomFloat() {
        return Math.random();
    }

    // --- Construye descripción completa de persona ---
    _buildPersonDescription(personStyle = 'normal', breastSize = 'medium', hairStyle = 'long_waves', hairColor = 'blonde') {
        const parts = [];
        
        // Base fija
        parts.push(this.person_fixed.base);
        
        // Pelo: estilo + color
        const style_hair = this.hair_styles[hairStyle] || this.hair_styles.long_waves;
        const color_hair = this.hair_colors[hairColor] || this.hair_colors.blonde;
        parts.push(style_hair + ", " + color_hair);
        
        // Estilo de persona seleccionado
        const style = this.person_styles[personStyle] || this.person_styles.normal;
        parts.push(style.modifier);
        
        // Skin (ajustar según estilo gótico)
        if (personStyle === 'gotica') {
            parts.push("fair porcelain skin, pale complexion");
        } else if (personStyle === 'alternativa') {
            parts.push("sun-kissed tan skin, smooth complexion, natural glow");
        } else {
            parts.push(this.person_fixed.skin);
        }
        
        parts.push(this.person_fixed.eyes);
        parts.push(this.person_fixed.face);
        
        // Makeup (ajustar según estilo)
        if (personStyle === 'gotica') {
            parts.push("dark smoky eye makeup, black lipstick, dramatic gothic look");
        } else if (personStyle === 'alternativa') {
            parts.push("edgy makeup, bold eyeliner, alternative style");
        } else {
            parts.push(this.person_fixed.makeup);
        }
        
        // Tamaño de pechos
        const breastDesc = this.breast_sizes[breastSize] || this.breast_sizes.medium;
        parts.push(breastDesc);
        
        // Extras del estilo
        parts.push(style.extras);
        
        return parts.join(", ");
    }

    generatePrompt(options = {}) {
        const {
            clothed = true,
            wet = false,
            custom_options = {},
            randomize = true,
            explicitness_level = 0,
            person_style = 'normal',
            breast_size = 'medium',
            hair_style = 'long_waves',
            hair_color = 'blonde',
        } = options;

        if (explicitness_level > 0) {
            return this._generateByLevel(explicitness_level, custom_options, randomize, person_style, breast_size, hair_style, hair_color);
        }

        const prompt_parts = [];

        if (!clothed) {
            // SIN ROPA - SIEMPRE CON TANGA
            const conditionValues = Object.values(this.conditions).filter(v => v);
            const condition = wet ? "wet" : (this._randomFloat() > 0.5 ? this._randomChoice(conditionValues) : "");
            const personDesc = this._buildPersonDescription(person_style, breast_size, hair_style, hair_color);
            if (condition) {
                prompt_parts.push(`nude of a ${condition} ${personDesc}`);
            } else {
                prompt_parts.push(`nude of a ${personDesc}`);
            }

            // SIEMPRE tanga cuando desnuda
            prompt_parts.push("wearing only tiny thong underwear, minimal coverage");

            prompt_parts.push(this._smartChoice(this.photo_types, 'photo_types'));

            // Escenario
            const scenario_option = custom_options.scenario;
            if (scenario_option && scenario_option !== 'random') {
                const scenario_map = {
                    morning_after: 'morning after scene, just woke up',
                    getting_ready: 'getting ready for night out, half-dressed',
                    after_shower: 'fresh out of shower, skin damp',
                    photoshoot: 'private intimate photoshoot',
                    boudoir: 'professional boudoir photography session',
                    intimate_selfie: 'intimate selfie for someone special',
                    getting_undressed: 'getting undressed, clothing mid-removal',
                };
                prompt_parts.push(scenario_map[scenario_option] || this._smartChoice(this.scenarios, 'scenarios'));
            } else if (randomize && this._randomFloat() > 0.5) {
                prompt_parts.push(this._smartChoice(this.scenarios, 'scenarios'));
            }

            prompt_parts.push(this._smartChoice(this.lighting, 'lighting'));
            prompt_parts.push(this._smartChoice(this.body_modifiers_nude, 'body_modifiers_nude'));

            // Expresión facial
            const facial_option = custom_options.facial_expression;
            if (facial_option && facial_option !== 'random') {
                const facial_map = {
                    seductive_gaze: 'seductive gaze, knowing half-smile',
                    lustful_eyes: 'lustful eyes, parted lips',
                    playful_smile: 'playful smile, mischievous eyes',
                    biting_lip: 'biting lower lip, intense stare',
                    mouth_open: 'mouth slightly open, breathless',
                    intense_contact: 'intense eye contact, burning gaze',
                    bedroom_eyes: 'bedroom eyes, soft lazy smile',
                };
                prompt_parts.push(facial_map[facial_option] || this._smartChoice(this.facial_expressions, 'facial_expressions'));
            } else if (randomize && this._randomFloat() > 0.3) {
                prompt_parts.push(this._smartChoice(this.facial_expressions, 'facial_expressions'));
            }

            prompt_parts.push(this._smartChoice(this.poses_nude, 'poses_nude'));

            // Ángulo
            const angle_option = custom_options.camera_angle;
            if (angle_option && angle_option !== 'random') {
                const angle_map = {
                    eye_level: 'eye level angle, natural perspective',
                    low_angle: 'low angle, looking up, empowering',
                    high_angle: 'high angle, looking down, intimate',
                    over_shoulder: 'over the shoulder shot, mysterious',
                    from_behind: 'back view, rear angle, correct anatomy, natural spine position',
                    side_profile: 'side profile view, silhouette emphasis',
                    close_up: 'close-up shot, face and upper body',
                    full_body: 'full body shot, head to toe',
                };
                prompt_parts.push(angle_map[angle_option] || this._smartChoice(this.camera_angles, 'camera_angles'));
            } else if (randomize && this._randomFloat() > 0.6) {
                prompt_parts.push(this._smartChoice(this.camera_angles, 'camera_angles'));
            }

            prompt_parts.push(this._smartChoice(this.technical_composition, 'technical_composition'));
            prompt_parts.push(this._smartChoice(this.texture_quality, 'texture_quality'));
            prompt_parts.push(this._smartChoice(this.overall_quality, 'overall_quality'));

            // Background
            const location_option = custom_options.location;
            if (location_option && location_option !== 'random') {
                const location_map = this._getLocationMap();
                prompt_parts.push(location_map[location_option] || this._smartChoice(this.backgrounds, 'backgrounds'));
            } else {
                prompt_parts.push(this._smartChoice(this.backgrounds, 'backgrounds'));
            }

            // Ropa/cobertura
            const clothing_keys = Object.keys(this.clothing);
            const clothing_choice = custom_options.clothing || this._randomChoice(clothing_keys);
            if (clothing_choice !== 'none_nude') {
                prompt_parts.push(this.clothing[clothing_choice]);
            }

            // Estilo fotográfico y atmósfera
            if (this._randomFloat() > 0.4) {
                prompt_parts.push(this._smartChoice(this.style_modifiers, 'style_modifiers'));
            }
            if (this._randomFloat() > 0.5) {
                prompt_parts.push(this._smartChoice(this.atmosphere_details, 'atmosphere_details'));
            }

            prompt_parts.push(this._smartChoice(this.color_tones, 'color_tones'));
            prompt_parts.push(this._smartChoice(this.final_touches, 'final_touches'));
        } else {
            // CON ROPA
            const condition = wet ? "wet, water droplets on skin" : "";
            const personDesc = this._buildPersonDescription(person_style, breast_size, hair_style, hair_color);
            if (condition) {
                prompt_parts.push(`${condition} ${personDesc}`);
            } else {
                prompt_parts.push(personDesc);
            }

            prompt_parts.push(this._smartChoice(this.clothing_full, 'clothing_full'));
            prompt_parts.push(this._smartChoice(this.photo_types, 'photo_types'));

            // Escenario
            const scenario_option = custom_options.scenario;
            if (scenario_option && scenario_option !== 'random') {
                const scenario_map = {
                    morning_after: 'morning after scene, just woke up',
                    getting_ready: 'getting ready for night out, half-dressed',
                    after_shower: 'fresh out of shower, skin damp',
                    photoshoot: 'private intimate photoshoot',
                    boudoir: 'professional boudoir photography session',
                    intimate_selfie: 'intimate selfie for someone special',
                    getting_undressed: 'getting undressed, clothing mid-removal',
                };
                prompt_parts.push(scenario_map[scenario_option] || this._smartChoice(this.scenarios, 'scenarios'));
            } else if (randomize && this._randomFloat() > 0.5) {
                prompt_parts.push(this._smartChoice(this.scenarios, 'scenarios'));
            }

            prompt_parts.push(this._smartChoice(this.lighting, 'lighting'));

            // Expresión facial
            const facial_option = custom_options.facial_expression;
            if (facial_option && facial_option !== 'random') {
                const facial_map = {
                    seductive_gaze: 'seductive gaze, knowing half-smile',
                    lustful_eyes: 'lustful eyes, parted lips',
                    playful_smile: 'playful smile, mischievous eyes',
                    biting_lip: 'biting lower lip, intense stare',
                    mouth_open: 'mouth slightly open, breathless',
                    intense_contact: 'intense eye contact, burning gaze',
                    bedroom_eyes: 'bedroom eyes, soft lazy smile',
                };
                prompt_parts.push(facial_map[facial_option] || this._smartChoice(this.facial_expressions, 'facial_expressions'));
            } else if (randomize && this._randomFloat() > 0.4) {
                prompt_parts.push(this._smartChoice(this.facial_expressions, 'facial_expressions'));
            }

            // Pose suave
            if (randomize && this._randomFloat() > 0.7) {
                const soft_poses = ["confident power pose", "casual relaxed pose", "playful pose, mid-laugh", "flirty pose, hip cocked"];
                prompt_parts.push(this._randomChoice(soft_poses));
            }

            // Ángulo
            const angle_option = custom_options.camera_angle;
            if (angle_option && angle_option !== 'random') {
                const angle_map = {
                    eye_level: 'eye level angle, natural perspective',
                    low_angle: 'low angle, looking up, empowering',
                    high_angle: 'high angle, looking down, intimate',
                    over_shoulder: 'over the shoulder shot, mysterious',
                    from_behind: 'back view, rear angle, correct anatomy, natural spine position',
                    side_profile: 'side profile view, silhouette emphasis',
                    close_up: 'close-up shot, face and upper body',
                    full_body: 'full body shot, head to toe',
                };
                prompt_parts.push(angle_map[angle_option] || this._smartChoice(this.camera_angles, 'camera_angles'));
            } else if (randomize && this._randomFloat() > 0.6) {
                prompt_parts.push(this._smartChoice(this.camera_angles, 'camera_angles'));
            }

            prompt_parts.push(this._smartChoice(this.technical_composition, 'technical_composition'));
            prompt_parts.push(this._smartChoice(this.texture_quality, 'texture_quality'));
            prompt_parts.push(this._smartChoice(this.overall_quality, 'overall_quality'));

            // Background
            const location_option = custom_options.location;
            if (location_option && location_option !== 'random') {
                const location_map = this._getLocationMap();
                prompt_parts.push(location_map[location_option] || this._smartChoice(this.backgrounds, 'backgrounds'));
            } else {
                prompt_parts.push(this._smartChoice(this.backgrounds, 'backgrounds'));
            }

            // Accesorios (sometimes)
            if (this._randomFloat() > 0.6) {
                prompt_parts.push(this._smartChoice(this.accessories, 'accessories'));
            }

            // Estilo fotográfico
            if (this._randomFloat() > 0.4) {
                prompt_parts.push(this._smartChoice(this.style_modifiers, 'style_modifiers'));
            }

            prompt_parts.push(this._smartChoice(this.color_tones, 'color_tones'));
            prompt_parts.push(this._smartChoice(this.final_touches, 'final_touches'));
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

    _generateByLevel(level, custom_options, randomize, person_style = 'normal', breast_size = 'medium', hair_style = 'long_waves', hair_color = 'blonde') {
        const prompt_parts = [];
        const personDesc = this._buildPersonDescription(person_style, breast_size, hair_style, hair_color);

        // NIVEL 1: Casual
        if (level === 1) {
            prompt_parts.push(personDesc);
            prompt_parts.push(this._smartChoice(this.clothing_level1, 'clothing_level1'));
            prompt_parts.push(this._smartChoice(this.photo_types, 'photo_types'));
            prompt_parts.push(this._smartChoice(this.scenarios_level1, 'scenarios_level1'));
            prompt_parts.push(this._smartChoice(this.poses_level1, 'poses_level1'));
            prompt_parts.push("natural lighting, soft warm daylight");
            const bg_casual = ["cozy living room, warm tones", "home interior, natural light", "green park, autumn colors", "casual café setting, warm ambient"];
            prompt_parts.push(this._randomChoice(bg_casual));
            if (this._randomFloat() > 0.5) {
                prompt_parts.push(this._smartChoice(this.accessories, 'accessories'));
            }
        }

        // NIVEL 2: Sugerente
        else if (level === 2) {
            prompt_parts.push(personDesc);
            prompt_parts.push(this._smartChoice(this.clothing_level2, 'clothing_level2'));
            prompt_parts.push(this._smartChoice(this.photo_types, 'photo_types'));
            prompt_parts.push(this._smartChoice(this.poses_level2, 'poses_level2'));
            prompt_parts.push(this._smartChoice(this.lighting, 'lighting'));
            if (randomize && this._randomFloat() > 0.3) {
                prompt_parts.push(this._smartChoice(this.facial_expressions, 'facial_expressions'));
            }
            prompt_parts.push(this._smartChoice(this.backgrounds, 'backgrounds'));
            if (this._randomFloat() > 0.5) {
                prompt_parts.push(this._smartChoice(this.accessories, 'accessories'));
            }
        }

        // NIVEL 3: Provocativo
        else if (level === 3) {
            prompt_parts.push(personDesc);
            prompt_parts.push(this._smartChoice(this.clothing_level3, 'clothing_level3'));
            prompt_parts.push(this._smartChoice(this.photo_types, 'photo_types'));
            prompt_parts.push(this._smartChoice(this.poses_level3, 'poses_level3'));
            prompt_parts.push(this._smartChoice(this.lighting, 'lighting'));
            if (randomize && this._randomFloat() > 0.2) {
                prompt_parts.push(this._smartChoice(this.facial_expressions, 'facial_expressions'));
            }
            prompt_parts.push(this._smartChoice(this.backgrounds, 'backgrounds'));
            if (this._randomFloat() > 0.5) {
                prompt_parts.push(this._smartChoice(this.atmosphere_details, 'atmosphere_details'));
            }
        }

        // NIVEL 4: Sensual
        else if (level === 4) {
            prompt_parts.push(`nude of a ${personDesc}`);
            
            // SIEMPRE con tanga en nivel 4
            prompt_parts.push("wearing only tiny thong underwear, minimal coverage");
            
            const clothing_opt = custom_options.clothing;
            if (clothing_opt && clothing_opt !== 'random' && clothing_opt !== 'none_nude' && this.clothing[clothing_opt]) {
                prompt_parts.push(this.clothing[clothing_opt]);
            }
            prompt_parts.push(this._smartChoice(this.photo_types, 'photo_types'));
            prompt_parts.push(this._smartChoice(this.body_modifiers_nude, 'body_modifiers_nude'));
            prompt_parts.push(this._smartChoice(this.poses_level4, 'poses_level4'));
            if (randomize && this._randomFloat() > 0.2) {
                prompt_parts.push(this._smartChoice(this.facial_expressions, 'facial_expressions'));
            }
            prompt_parts.push(this._smartChoice(this.lighting, 'lighting'));
            prompt_parts.push(this._smartChoice(this.backgrounds, 'backgrounds'));
            if (this._randomFloat() > 0.4) {
                prompt_parts.push(this._smartChoice(this.atmosphere_details, 'atmosphere_details'));
            }
        }

        // NIVEL 5: Explícito
        else if (level === 5) {
            prompt_parts.push(`nude of a ${personDesc}`);
            
            // SIEMPRE con tanga en nivel 5
            prompt_parts.push("wearing only tiny thong underwear, minimal coverage, naked body");
            
            prompt_parts.push(this._smartChoice(this.body_mods_level5, 'body_mods_level5'));
            prompt_parts.push(this._smartChoice(this.poses_level5, 'poses_level5'));
            prompt_parts.push(this._smartChoice(this.scenarios_level5, 'scenarios_level5'));
            prompt_parts.push(this._smartChoice(this.expressions_level5, 'expressions_level5'));
            prompt_parts.push(this._smartChoice(this.lighting_level5, 'lighting_level5'));
            prompt_parts.push(this._smartChoice(this.camera_level5, 'camera_level5'));

            const bg_explicit = [
                "luxury bedroom, silk satin sheets, dim warm lighting, candles",
                "boutique hotel suite bedroom, king bed, warm ambient golden light",
                "minimalist modern bedroom, crisp white sheets, natural morning light",
                "dark moody bedroom, deep atmosphere, single warm lamp, shadows",
                "professional photography studio, dark seamless backdrop, controlled lighting",
                "penthouse bedroom, city skyline through floor-to-ceiling windows, night",
                "rustic cabin bedroom, fireplace glow, fur throws, intimate",
            ];
            prompt_parts.push(this._randomChoice(bg_explicit));

            prompt_parts.push("ultra realistic skin texture, natural skin with subtle pores and imperfections, subsurface scattering, photorealistic");
            prompt_parts.push("8K, ultra detailed, masterpiece quality, award-winning professional photography");
            prompt_parts.push(this._smartChoice(this.color_tones, 'color_tones'));
            prompt_parts.push("raw photo, unedited authentic look, genuine moment");

            // Style modifier for level 5
            prompt_parts.push(this._smartChoice(this.style_modifiers, 'style_modifiers'));

            // Ángulo personalizado
            const angle_opt = custom_options.camera_angle;
            if (angle_opt && angle_opt !== 'random') {
                const angle_map = {
                    eye_level: 'eye level angle, natural direct perspective',
                    low_angle: 'low angle, looking up, powerful perspective',
                    high_angle: 'high angle, looking down, dominant view',
                    over_shoulder: 'over the shoulder shot, intimate peering',
                    from_behind: 'back view, rear angle, correct anatomy, natural spine, anatomically accurate rear',
                    side_profile: 'side profile view, body contour visible',
                    close_up: 'close-up shot, intimate detail',
                    full_body: 'full body shot from below, dramatic',
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
                negative_prompt += ", clothing, dressed, fabric, textile, covered";
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
            negative_prompt += ", clothing, dressed, fabric, textile, covered";
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
                eye_level: 'eye level angle, natural perspective',
                low_angle: 'low angle, looking up, empowering',
                high_angle: 'high angle, looking down, intimate',
                over_shoulder: 'over the shoulder shot, mysterious',
                from_behind: 'back view, rear angle, correct anatomy, natural spine position',
                side_profile: 'side profile view, silhouette emphasis',
                close_up: 'close-up shot, face and upper body',
                full_body: 'full body shot, head to toe',
            };
            prompt_parts.push(angle_map[angle_opt] || this._smartChoice(this.camera_angles, 'camera_angles'));
        }

        const loc_opt = custom_options.location;
        if (loc_opt && loc_opt !== 'random') {
            const location_map = this._getLocationMap();
            const filtered = prompt_parts.filter(p => !p.toLowerCase().includes('background') && !p.toLowerCase().includes('setting'));
            filtered.push(location_map[loc_opt] || this._smartChoice(this.backgrounds, 'backgrounds'));
            prompt_parts.length = 0;
            filtered.forEach(p => prompt_parts.push(p));
        }

        if (level >= 2) prompt_parts.push(this._smartChoice(this.technical_composition, 'technical_composition'));
        if (level >= 3) prompt_parts.push(this._smartChoice(this.texture_quality, 'texture_quality'));
        prompt_parts.push(this._smartChoice(this.overall_quality, 'overall_quality'));
        prompt_parts.push(this._smartChoice(this.color_tones, 'color_tones'));
        if (level >= 3) prompt_parts.push(this._smartChoice(this.final_touches, 'final_touches'));

        // Add style modifier for levels 2+
        if (level >= 2 && this._randomFloat() > 0.4) {
            prompt_parts.push(this._smartChoice(this.style_modifiers, 'style_modifiers'));
        }

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
            bedroom: 'cozy bedroom, warm lamp light',
            bathroom: 'modern bathroom, marble surfaces, steam',
            mirror: 'full-length mirror, bathroom or bedroom, natural soft light, mirror reflection effect, body reflected in mirror',
            luxury_bedroom: 'luxury bedroom, silk sheets, designer decor',
            hotel_room: 'boutique hotel room, tasteful decor, city view',
            jacuzzi: 'private jacuzzi, bubbling water, warm lighting',
            sauna: 'wooden sauna room, steam, amber tones',
            poolside: 'infinity pool edge, sunset, resort setting',
            beach_cabana: 'private beach cabana, sheer curtains, ocean',
            yacht: 'luxury yacht master cabin, ocean through porthole',
            villa: 'private Mediterranean villa, terracotta walls',
            rooftop: 'rooftop terrace, city lights twinkling, night sky',
            spa: 'zen spa room, natural wood, candles, tranquility',
            resort: 'tropical resort bungalow, ocean view, palms',
            beach_house: 'beach house bedroom, white linens, sea breeze',
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
