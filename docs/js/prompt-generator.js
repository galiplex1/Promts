/**
 * Generador automático de prompts para modelo de IA (SDXL)
 * v3.0 - Full Feature Edition
 * - Bug fixes (hair refs, extractElements)
 * - Token counter + compact mode
 * - Contextual negative prompts
 * - Eye color, age, ethnicity selectors
 * - Preset system (save/load)
 * - Inspiration + Variation modes
 * - Conflict detection + suggestions
 * - Export CSV/TXT/JSON
 * - Emphasis weights
 * - Optimal prompt ordering
 * - Stats dashboard
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
            base: "stunning young woman",
            skin: "sun-kissed tan skin, smooth flawless complexion, natural glow",
            face: "perfect symmetrical face, high cheekbones, full lips",
            makeup: "natural makeup, glossy lips, subtle eyeliner, fresh look",
        };

        // === COLORES DE OJOS ===
        this.eye_colors = {
            green: "bright green eyes, captivating intense gaze",
            blue: "deep blue eyes, piercing ocean-like gaze",
            brown: "warm brown eyes, soulful deep gaze",
            hazel: "hazel eyes, golden-green shifting tones, mesmerizing",
            amber: "amber eyes, golden honey color, striking and rare",
            grey: "silver grey eyes, cool steel gaze, mysterious",
            light_blue: "light ice-blue eyes, crystalline transparent gaze",
            dark_brown: "dark chocolate brown eyes, intense deep stare",
        };

        // === ETNIAS ===
        this.ethnicities = {
            european: { skin: "fair European skin, natural light complexion", modifier: "European features" },
            latina: { skin: "warm olive latina skin, golden bronze complexion", modifier: "Latina features, exotic beauty" },
            asian: { skin: "smooth porcelain Asian skin, flawless even complexion", modifier: "East Asian features, delicate beauty" },
            african: { skin: "rich dark ebony skin, beautiful deep complexion, glowing", modifier: "African features, striking beauty" },
            middle_eastern: { skin: "warm olive Middle Eastern skin, golden undertones", modifier: "Middle Eastern features, exotic allure" },
            nordic: { skin: "pale Nordic skin, alabaster complexion, fair", modifier: "Nordic Scandinavian features, ethereal beauty" },
            mixed: { skin: "beautiful mixed-race skin, unique warm tone", modifier: "mixed heritage features, unique exotic beauty" },
            indian: { skin: "warm golden Indian skin, rich caramel complexion", modifier: "South Asian features, striking beauty" },
            default: { skin: "sun-kissed tan skin, smooth flawless complexion", modifier: "" },
        };

        // === ESTILOS DE PELO ===
        this.hair_styles = {
            long_straight: "long straight hair, sleek and flowing",
            long_waves: "long wavy hair, soft waves, cascading over shoulders",
            long_curls: "long curly hair, spiral curls, voluminous and bouncy",
            long_braids: "long braided hair, intricate braids, bohemian style",
            shoulder: "shoulder-length hair, classic shoulder bob",
            short_bob: "short bob cut, chin-length, modern and chic",
            pixie: "short pixie cut, edgy and daring",
            ponytail: "high sleek ponytail, tight and polished",
            bun: "hair in tight bun, pulled back elegantly",
            messy_bun: "messy bun, loose and effortless, casual sexy",
            half_up: "half-up half-down, partial updo, romantic",
            curtains: "curtain bangs, framing the face, trendy",
            thick_mane: "thick full mane of hair, voluminous luxurious",
            tousled: "tousled bedhead hair, undone and sexy",
            sleek: "sleek glossy hair, ultra-smooth, mirror shine",
        };

        // === COLORES DE PELO ===
        this.hair_colors = {
            blonde: "blonde hair, sun-kissed golden highlights",
            dark_blonde: "dark blonde hair, honey-toned warm",
            brunette: "brunette hair, dark chocolate brown, rich",
            light_brown: "light brown hair, caramel highlights",
            black: "jet black hair, deep glossy elegant",
            red: "red hair, fiery copper-red, vibrant",
            auburn: "auburn hair, dark reddish-brown, luxurious",
            strawberry_blonde: "strawberry blonde hair, light red-blonde",
            ombre: "ombre hair, dark roots to light tips",
            balayage: "balayage hair, naturally highlighted",
            platinum: "platinum blonde hair, silver-blonde icy",
            rose_gold: "rose gold hair, pink-gold trendy metallic",
            ash_brown: "ash brown hair, cool-toned muted sophisticated",
            chestnut: "chestnut brown hair, reddish warm undertones",
            burgundy: "burgundy hair, deep wine-red, dark mysterious",
        };

        // === PREFERENCIAS DE PELO POR ESTILO (FIXED - all valid refs) ===
        this.style_hair_preferences = {
            normal: {
                styles: ['long_waves', 'long_straight', 'shoulder', 'ponytail', 'messy_bun', 'half_up'],
                colors: ['blonde', 'dark_blonde', 'brunette', 'light_brown', 'balayage', 'chestnut']
            },
            futbolera: {
                styles: ['ponytail', 'bun', 'short_bob', 'shoulder', 'long_straight'],
                colors: ['brunette', 'light_brown', 'dark_blonde', 'chestnut', 'auburn']
            },
            alternativa: {
                styles: ['pixie', 'messy_bun', 'tousled', 'short_bob', 'long_curls', 'curtains'],
                colors: ['red', 'burgundy', 'platinum', 'rose_gold', 'black', 'ombre']
            },
            gotica: {
                styles: ['long_straight', 'long_curls', 'sleek', 'thick_mane', 'half_up'],
                colors: ['black', 'burgundy', 'black', 'black', 'burgundy']
            },
            pija: {
                styles: ['long_waves', 'sleek', 'long_straight', 'bun', 'half_up'],
                colors: ['blonde', 'platinum', 'blonde', 'dark_blonde', 'blonde']
            },
            hipster: {
                styles: ['messy_bun', 'curtains', 'tousled', 'half_up', 'shoulder', 'long_braids'],
                colors: ['auburn', 'rose_gold', 'balayage', 'ash_brown', 'strawberry_blonde', 'ombre']
            }
        };

        // === ESTILOS DE PERSONA (EXAGERADOS) ===
        this.person_styles = {
            normal: {
                modifier: "confident and naturally beautiful",
                extras: "effortless elegance, girl-next-door charm, natural charisma",
            },
            futbolera: {
                modifier: "athletic soccer player build, sporty and fit, toned physique",
                extras: "defined abs and legs, post-workout glow, energetic vibe, athletic confidence, sports watch on wrist",
            },
            alternativa: {
                modifier: "alternative punk style, edgy rebellious unique",
                extras: "full sleeve tattoos both arms, neck tattoo visible, nose ring, eyebrow piercing, multiple ear piercings, lip ring, rebellious defiant energy, punk attitude",
            },
            gotica: {
                modifier: "gothic aesthetic, dark mysterious beauty, nocturnal allure",
                extras: "dramatic long black eyeliner wings, heavy dark eyeshadow, black lipstick, black nail polish, pale porcelain skin, septum piercing, dark mysterious aura, gothic jewelry, choker necklace",
            },
            pija: {
                modifier: "elegant upscale sophisticated high-class style",
                extras: "expensive designer jewelry, Cartier bracelet, diamond earrings, luxury watch, polished flawless look, high-end aesthetic, refined posture, wealthy elegance",
            },
            hipster: {
                modifier: "hipster indie artistic style, bohemian vibe",
                extras: "vintage round glasses, multiple vintage rings, bohemian accessories, creative artistic energy, indie aesthetic, retro fashion sense",
            },
        };

        // === TAMAÑOS DE PECHOS ===
        this.breast_sizes = {
            small: "small perky breasts, A-cup, petite chest",
            medium: "medium natural breasts, B-cup, proportional bust, perky firm",
            large: "large natural breasts, C-cup, full bust, shapely round",
            huge: "huge natural breasts, D-cup, very large bust, voluptuous heavy",
        };

        // === ACCESORIOS ===
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
            "Fujifilm Pro 400H style, pastel tones",
            "cinematic color grading, movie-like quality",
            "analog photography style, subtle film grain",
            "editorial photography, high fashion magazine",
            "shot on Canon EOS R5, crisp razor-sharp",
            "Hasselblad medium format, incredible resolution",
            "natural available light photography, authentic",
            "professional DSLR quality, tack sharp focus",
            "high fashion editorial look, Vogue quality",
            "intimate documentary photography style",
            "shot on Sony A7IV, stunning dynamic range",
        ];

        // === ATMÓSFERA ===
        this.atmosphere_details = [
            "warm intimate atmosphere, cozy inviting",
            "moody atmospheric setting, cinematic vibe",
            "bright airy atmosphere, fresh and clean",
            "sultry dark atmosphere, mysterious allure",
            "romantic soft atmosphere, dreamy ethereal",
            "raw authentic atmosphere, candid genuine",
            "luxurious elegant atmosphere, refined polished",
            "casual relaxed atmosphere, natural unposed",
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
            "natural proportions, large shapely breasts",
            "natural proportions, perfect perky breasts",
            "athletic build, toned body, firm natural breasts",
            "curvy body, voluptuous hourglass figure",
            "slim body, petite frame, perky small breasts",
            "fit body, defined curves, visible toned abs",
            "hourglass figure, wide hips, narrow waist",
            "thick thighs, round hips, natural curves",
            "petite body, delicate features, feminine",
            "tall athletic body, long toned legs, model figure",
            "busty figure, natural large breasts, slim waist",
            "slim waist, round firm buttocks, feminine curves",
            "toned dancer body, graceful proportions",
            "soft natural curves, womanly proportions",
            "athletic cheerleader build, perky breasts, toned",
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
            "passionate pose, hands through hair",
            "suggestive pose, subtle hip thrust",
            "teasing pose, one knee slightly bent",
            "bending over pose, natural spine curve",
            "arching back pose, chest forward, graceful",
            "looking over shoulder, back muscles visible",
            "lying on side, head propped on hand",
            "reclining pose, arms stretched above head",
            "standing contrapposto, classical pose",
            "sitting cross-legged, relaxed intimate",
            "kneeling pose, sitting on heels",
            "leaning against wall, casual confident",
        ];

        // === EXPRESIONES FACIALES ===
        this.facial_expressions = [
            "seductive gaze, knowing half-smile",
            "lustful eyes, slightly parted lips",
            "playful smile, mischievous sparkle",
            "biting lower lip, intense stare",
            "mouth slightly open, breathless look",
            "intense eye contact, burning gaze",
            "sultry look, hooded bedroom eyes",
            "bedroom eyes, soft lazy smile",
            "teasing expression, raised eyebrow",
            "passionate look, flushed cheeks",
            "innocent doe eyes, soft pouty lips",
            "confident smirk, self-assured",
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
            towel_barely: "barely covered with small towel, slipping off",
            bedsheet: "wrapped in white bedsheet, morning light",
            bedsheet_revealing: "partially covered with silk bedsheet, revealing curves",
            lingerie: "wearing delicate lace lingerie",
            lingerie_sheer: "wearing sheer see-through lingerie, skin visible",
            lingerie_lace: "wearing French lace lingerie, barely covering",
            bikini: "wearing bikini, beach ready",
            bikini_micro: "wearing micro bikini, extremely revealing",
            underwear: "wearing cotton underwear, casual intimate",
            underwear_tiny: "wearing tiny thong underwear, minimal fabric",
            bra_panties: "wearing matching lace bra and panties set",
            nightgown: "wearing sheer silk nightgown, flowing fabric",
            nightgown_transparent: "wearing transparent chiffon nightgown, body visible",
            robe: "wearing open silk robe, loosely tied",
            robe_revealing: "wearing satin robe, falling off one shoulder",
            body_paint: "wearing only artistic body paint, nude underneath",
            jewelry_only: "wearing only delicate jewelry, completely exposed",
            silk_robe: "wearing silk kimono robe, barely tied, sliding open",
            mesh_lingerie: "wearing mesh fishnet lingerie, fully see-through",
            harness_lingerie: "wearing leather harness lingerie set",
            stockings_garter: "wearing lace-top thigh-high stockings and garter belt only",
            corset: "wearing tight boned corset, cinched waist, push-up",
            bodysuit_sheer: "wearing sheer mesh bodysuit, second-skin",
            none_nude: "completely nude, natural",
        };

        // === NIVEL 1: Casual/Inocente ===
        this.clothing_level1 = [
            "wearing cozy oversized hoodie and sweatpants",
            "wearing casual jeans and vintage t-shirt",
            "wearing comfortable knit sweater and leggings",
            "wearing casual home clothes, relaxed natural",
            "wearing everyday outfit, effortless look",
            "wearing simple cotton sundress, modest fresh",
            "wearing cardigan and mom jeans, casual chic",
            "wearing flannel shirt and shorts, cozy weekend",
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
            "reading book on plush couch, afternoon light",
            "having morning coffee in sunlit kitchen",
            "walking through autumn park, golden leaves",
            "doing everyday activities, natural environment",
            "relaxing at home on lazy Sunday",
            "cooking in kitchen, casual domestic moment",
            "sitting by window, rainy day, warm inside",
        ];

        // === NIVEL 2: Sugerente ===
        this.clothing_level2 = [
            "wearing tight yoga pants and fitted tank top",
            "wearing skinny jeans and crop top, midriff exposed",
            "wearing bodycon dress, hugging every curve",
            "wearing sports bra and leggings, athletic toned",
            "wearing fitted cocktail dress, showing silhouette",
            "wearing tight jeans and low-cut v-neck, cleavage",
            "wearing off-shoulder knit sweater, exposed collarbone",
            "wearing high-waisted shorts and tied crop top",
            "wearing tight pencil skirt and fitted blouse",
        ];

        this.poses_level2 = [
            "flirty pose, hip cocked to one side",
            "playful stance, tossing hair back",
            "confident power pose, shoulders back",
            "teasing expression, finger on lips",
            "suggestive look, leaning forward slightly",
            "stretching pose, arms up, shirt riding up",
            "casual model pose, natural effortless",
        ];

        // === NIVEL 3: Provocativo ===
        this.clothing_level3 = [
            "wearing black lace lingerie set, sexy",
            "wearing string bikini, minimal coverage",
            "wearing lace bralette and matching panties",
            "wearing sheer silk nightgown, body visible",
            "wearing tight mini skirt and tiny crop top",
            "wearing micro string bikini, barely there",
            "wearing revealing lace teddy lingerie",
            "wearing cutout bodysuit, strategic skin",
            "wearing sheer babydoll lingerie, see-through",
        ];

        this.poses_level3 = [
            "seductive pose, finger tracing neckline",
            "provocative stance, strap falling off shoulder",
            "lying on bed, propped on elbows",
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
            "partially covered with bedsheet, curves exposed",
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
            "on all fours, back arched naturally, looking over shoulder, perfect anatomy",
            "on hands and knees, rear view, round buttocks visible, back arched naturally",
            "bent over bed edge, ass raised high, face on silk sheets, back view",
            "kneeling on bed, legs apart, hands on thighs, frontal view, confident",
            "lying on back, legs spread invitingly, arms above head, direct gaze",
            "sitting on bed edge, legs wide open, leaning back on hands",
            "standing bent over, hands gripping knees, rear angle, looking back",
            "lying face down on satin, ass raised provocatively, head turned to camera",
            "straddling position, kneeling upright, hands in hair, frontal view",
            "on knees, arching back, hands behind head, chest pushed forward",
            "squatting facing camera, hands on floor, intimate low angle",
            "lying on side, top leg raised, languid eye contact, relaxed sensuality",
            "reverse cowgirl position, looking back over shoulder, ass prominent",
            "spread eagle on bed, completely exposed, vulnerable but confident",
            "standing with one leg raised on chair, full body exposed",
        ];

        this.body_mods_level5 = [
            "perfect anatomy, hyper-detailed realistic body, natural skin texture",
            "curvy voluptuous, wide hips, narrow waist, natural large breasts",
            "athletic toned, firm round buttocks, defined stomach, natural breasts",
            "voluptuous, thick thighs, round full ass, dramatic hourglass",
            "slim petite, small perky breasts, tight compact figure, delicate",
            "fit toned, long lean legs, sculpted glutes, dancer physique",
            "naturally curvy, soft belly, real proportions, large natural breasts",
            "model-like, long torso, endless legs, small waist, runway proportions",
        ];

        this.lighting_level5 = [
            "soft warm side lighting, shadows accentuating curves, intimate",
            "dim bedroom lighting, warm amber glow, romantic mood",
            "natural window light from behind, golden silhouette, backlit",
            "candlelight ambiance, warm flickering golden, deep shadows",
            "professional studio lighting, sculpting body, dramatic contrast",
            "moody low-key, single dramatic light source, chiaroscuro",
            "golden hour through blinds, striped light pattern, artistic",
            "ring light, even illumination, catch lights in eyes",
        ];

        this.scenarios_level5 = [
            "private intimate moment, luxurious bedroom, silk sheets",
            "erotic boudoir photoshoot, professional studio",
            "spontaneous intimate photo, authentic unplanned",
            "private boudoir in penthouse, city lights through windows",
            "intimate scene, just undressed, clothes scattered",
            "personal explicit photo for lover, raw desire",
            "morning light intimate session, natural and real",
            "after-bath intimate, skin still damp, steamy",
        ];

        this.expressions_level5 = [
            "lustful gaze at camera, lips parted glossy, heavy-lidded, flushed",
            "intense burning eye contact, biting lower lip, visibly aroused",
            "mouth open in anticipation, bedroom eyes, seductive smirk",
            "looking over shoulder with raw desire, sultry eyes, tongue touching lip",
            "direct passionate stare, lips parted breathing, heated flushed",
            "eyes closed in ecstasy, head tilted back, neck exposed, blissful",
            "vulnerable soft pleading eyes, innocent yet aware, pouty lips",
            "fierce dominant stare, commanding, confident sexuality, slight smirk",
        ];

        this.camera_level5 = [
            "shot from behind and below, emphasizing curves, 50mm f1.8, shallow DOF",
            "low angle rear view, natural proportions, 35mm, dramatic angle",
            "eye level front view, full body, 85mm portrait lens f2.0, sharp",
            "high angle looking down, full body in frame, 35mm, intimate",
            "side profile, full body silhouette, 70mm f1.8, detailed contour",
            "close-up from behind, focusing on curves, 50mm macro, bokeh",
            "three-quarter rear angle, body and face visible, 85mm, creamy bokeh",
            "worm's eye view looking up, dramatic foreshortening, 24mm wide",
        ];

        // === ROPA COMPLETA (nivel 0 con ropa) ===
        this.clothing_full = [
            "wearing casual home outfit, comfortable real",
            "wearing oversized boyfriend shirt, no bra",
            "wearing sports bra and leggings, athletic toned",
            "wearing tight yoga pants and sports bra",
            "wearing crop top and high-waisted shorts",
            "wearing very short crop top and tiny shorts",
            "wearing tight bodycon dress, hugging curves",
            "wearing tight red bodycon dress, curves on display",
            "wearing casual flowy summer dress, feminine",
            "wearing short sundress, long bare legs",
            "wearing fitted ribbed tank top and jeans",
            "wearing deep v-neck tank top and tight jeans",
            "wearing oversized knit sweater, bare legs",
            "wearing oversized shirt as dress, long bare legs",
            "wearing bikini top and cutoff jean shorts",
            "wearing string bikini top and tiny denim shorts",
            "wearing lace bralette and silk panties",
            "wearing sheer white shirt soaked, see-through",
            "wearing tight leather mini skirt and crop top",
            "wearing fishnet stockings and garter belt with lingerie",
            "wearing thigh-high knit stockings and sweater only",
            "wearing nothing but white shirt, half-unbuttoned",
            "wearing shiny latex bodysuit, skin-tight",
            "wearing leather harness lingerie, dominatrix",
            "wearing torn distressed jeans and sports bra",
            "wearing liquid satin slip dress, clinging",
            "wearing mesh crop top and leather pants",
            "wearing denim micro skirt and halter top",
            "wearing elegant off-shoulder evening dress",
            "wearing tube top and booty shorts",
            "wearing deep plunging v-neck bodysuit",
            "wearing sheer lace dress over matching lingerie",
        ];

        // === TIPOS DE FOTO ===
        this.photo_types = [
            "photo taken with iPhone 15 Pro, natural mobile",
            "amateur photo with smartphone, authentic real",
            "selfie with iPhone front camera, close personal",
            "professional photo, studio quality lighting",
            "candid photo, unposed natural moment",
            "mirror selfie, bathroom mirror, flash visible",
            "photo taken by boyfriend, intimate perspective",
            "professional boudoir photograph, artistic sensual",
            "spontaneous photo, caught between moments",
            "high-end editorial photograph, magazine quality",
            "amateur bedroom photo, warm lamp light",
            "professional portrait photograph, perfectly lit",
        ];

        // === ILUMINACIÓN ===
        this.lighting = [
            "soft diffused lighting, chiaroscuro shadows",
            "natural window lighting, soft shadows",
            "warm golden hour lighting, bathed in gold",
            "soft bedroom lamp lighting, intimate warm",
            "dramatic single-source lighting, moody shadows",
            "bright natural daylight, fresh vibrant",
            "moody dim lighting, mysterious alluring",
            "neon accent lighting, modern urban, colored reflections",
            "overhead ring light, even flattering illumination",
            "candlelight only, warm flickering romantic glow",
            "backlit silhouette, golden rim light outlining body",
            "soft overcast natural light, even flattering",
            "blue hour twilight, cool tones, city lights",
            "studio beauty lighting, butterfly pattern, flawless",
        ];

        // === COMPOSICIÓN TÉCNICA ===
        this.technical_composition = [
            "cinematic framing, 85mm lens, f1.8, shallow DOF",
            "intimate close framing, 50mm f2.0, fills frame",
            "classic portrait, 85mm f1.4, creamy bokeh",
            "tight close-up, 70mm f1.8, extreme detail",
            "full body, 35mm f2.8, environmental context",
            "rule of thirds, 85mm f2.0, balanced frame",
            "center-weighted, 50mm f1.8, subject dominant",
            "wide environmental portrait, 24mm f4.0, context",
            "medium close-up waist up, 70mm f2.0, intimate",
            "dramatic dutch angle slight tilt, 50mm f1.4, dynamic",
        ];

        // === TEXTURA Y PIEL ===
        this.texture_quality = [
            "ultra realistic skin, subtle pores, natural shadows",
            "realistic skin, natural imperfections, unretouched",
            "photorealistic skin, fine peach fuzz, real human",
            "detailed skin, natural pores, subtle variations",
            "hyper-detailed skin, subsurface scattering, lifelike",
            "natural skin with subtle moles, perfectly imperfect",
            "smooth youthful skin, natural collagen glow",
            "realistic skin, visible goosebumps, natural reaction",
        ];

        // === CALIDAD GENERAL ===
        this.overall_quality = [
            "high resolution, gallery quality",
            "ultra high quality, professional grade",
            "4K resolution, razor-sharp details",
            "high definition, crisp clean quality",
            "8K masterpiece, every detail perfect",
            "award-winning photography quality",
            "magazine cover quality, professional",
            "fine art photography, museum worthy",
        ];

        // === FONDOS/UBICACIONES ===
        this.backgrounds = [
            "cozy bedroom, rumpled sheets, warm lamp light",
            "modern bathroom, steam on mirror, marble",
            "bedroom with floor-to-ceiling mirror, reflections",
            "luxury bedroom, silk sheets, designer furniture",
            "boutique hotel room, tasteful decor, city view",
            "modern minimalist apartment, clean lines, natural light",
            "cozy dimly lit bedroom, fairy lights, intimate",
            "warmly lit bedroom, candles scattered, romantic",
            "steamy bathroom after shower, foggy mirror",
            "spacious walk-in rain shower, water cascading",
            "freestanding bathtub, bubbles, candles, relaxation",
            "luxurious walk-in closet, designer clothes, mirror",
            "private dressing room, vanity mirror with lights",
            "penthouse suite, panoramic city skyline at night",
            "private jacuzzi, bubbling water, warm lighting",
            "wooden sauna room, steam, warm amber tones",
            "gym locker room, athletic setting, harsh lighting",
            "infinity pool edge, sunset view, resort",
            "private beach cabana, sheer curtains, ocean view",
            "spa massage room, bamboo decor, diffusers",
            "luxury super yacht master cabin, ocean porthole",
            "private Mediterranean villa, terracotta white",
            "rooftop terrace, city lights twinkling, night",
            "industrial loft studio, exposed brick, windows",
            "zen spa room, natural wood, smooth stones",
            "boutique hotel suite, four-poster bed, velvet",
            "tropical resort bungalow, ocean visible, palms",
            "cozy mountain cabin, fireplace glow, wooden beams",
            "beach house bedroom, white linens, sea breeze",
            "private heated pool, underwater lights, twilight",
            "wine cellar, dim warm lighting, stone walls",
            "artist studio, paint splattered, creative chaos",
            "home theater room, dim blue ambient lighting",
            "private library, leather and wood, warm lamp",
            "garden terrace, fairy lights, warm summer evening",
            "full-length standing mirror, bathroom, natural light",
            "bedroom mirror selfie, reflected in large mirror",
            "bathroom mirror, vanity lights around mirror",
            "full-body mirror view, bedroom mirror, warm glow",
            "mirror selfie, bathroom mirror with steam, moody",
            "standing mirror reflection, bedroom interior visible",
            "bathroom mirror shot, light reflections, intimate",
            "dressing room mirror, full-length, soft diffused",
            "mirror reflection selfie, city bedroom, glass",
            "bathroom mirror framed, luxury bathroom, candles",
            // === BACKGROUNDS GÓTICOS/OSCUROS ===
            "dark gothic bedroom, black silk sheets, candles only",
            "abandoned gothic mansion, dusty ornate furniture, moonlight",
            "dark dungeon aesthetic, stone walls, dim torch light",
            "black velvet bedroom, gothic decor, crimson accents",
            "dark occult room, candles everywhere, mysterious",
            "gothic cathedral interior, stained glass, dramatic shadows",
            "vampire aesthetic bedroom, dramatic red and black",
            "dark foggy cemetery night, full moon, eerie",
            "abandoned warehouse, graffiti walls, harsh overhead light",
            "underground club, neon lights, dark corners, pulsing",
            "industrial basement, exposed pipes, dim red lighting",
            "alternative tattoo parlor, neon signs, edgy atmosphere",
        ];

        // === ESCENARIOS ===
        this.scenarios = [
            "morning after scene, just woke up, sheets tangled",
            "getting ready for a night out, half-dressed",
            "fresh out of shower, skin still damp",
            "private intimate photoshoot, studio setup",
            "intimate selfie for someone special",
            "professional boudoir photography session",
            "post-workout glow, athletic moment",
            "swimsuit modeling session, confident poses",
            "relaxing at home alone, unguarded moment",
            "getting undressed, clothing mid-removal",
            "trying on outfits, caught between changes",
            "lazy weekend morning in bed, natural light",
            "mirror selfie moment, in mirror, reflected",
            "bathroom mirror photo, checking appearance",
            "full-length mirror pose, viewing reflection",
            "mirror selfie after shower, bathroom steam",
            "getting ready moment, mirror, finishing touches",
        ];

        // === ÁNGULOS DE CÁMARA ===
        this.camera_angles = [
            "eye level angle, natural perspective",
            "low angle, looking up, empowering",
            "high angle, looking down, intimate vulnerability",
            "over the shoulder shot, mysterious",
            "back view, rear angle, correct anatomy",
            "side profile view, silhouette emphasis",
            "three-quarter angle, classic flattering",
            "dutch angle, dynamic energy, slight tilt",
            "close-up shot, face and upper body",
            "full body shot, head to toe",
            "bird's eye view, looking straight down",
            "worm's eye view, dramatic upward perspective",
        ];

        // === TONOS DE COLOR ===
        this.color_tones = [
            "warm neutral tones, natural color balance",
            "warm soft golden tones, honey-like warmth",
            "cool desaturated tones, moody editorial",
            "warm intimate amber tones, romantic",
            "natural true-to-life color palette",
            "rich deep saturated tones, vibrant punchy",
            "muted pastel tones, soft dreamy",
            "high contrast warm shadows, dramatic",
            "film-like color science, organic warmth",
            "split complementary tones, visually striking",
        ];

        // === TOQUES FINALES ===
        this.final_touches = [
            "natural imperfections, raw unedited style",
            "authentic genuine look, unretouched",
            "realistic photography, no post-processing",
            "natural aesthetic, raw photo, film-like",
            "subtle lens flare, warmth authenticity",
            "slight motion blur on hair, life movement",
            "natural lens vignette, eye draw to subject",
            "authentic grain texture, analog feel",
        ];

        // === PROMPTS NEGATIVOS ===
        this.negative_base = "low quality, worst quality, blurry, out of focus, bad anatomy, extra fingers, extra limbs, missing fingers, deformed hands, unrealistic proportions, cartoon, anime, illustration, 3d render, CGI, doll face, plastic skin, uncanny valley, watermark, text, logo, signature, twisted torso, broken spine, impossible pose, reversed body, contorted limbs, distorted proportions, mutated anatomy, malformed body, duplicate, clone, extra body parts";

        this.negative_extras = [
            "fake breasts, implants, artificial, over-edited, airbrushed, plastic surgery",
            "deformed body, mutated, disfigured, bad proportions, asymmetric face",
            "painting, drawing, sketch, CGI, over-processed, digital art, render",
            "ugly face, distorted features, bad eyes, cross-eyed, lazy eye",
            "bad hands, wrong number of fingers, fused fingers, claw hands",
            "unnatural skin color, grey skin, green tint, oversaturated, dead color",
            "bad lighting, flat lighting, no shadows, over-exposed, under-exposed",
            "cropped awkwardly, bad framing, cut off limbs, missing feet",
        ];

        // === NEGATIVOS CONTEXTUALES POR NIVEL ===
        this.negative_by_level = {
            1: "nsfw, nudity, cleavage, suggestive, revealing",
            2: "nudity, topless, bottomless, explicit, nsfw",
            3: "full nudity, genitalia, explicit sexual content",
            4: "bad anatomy, impossible pose, censored, mosaic, blurred",
            5: "censored, mosaic, blurred genitals, covered, clothing, dressed, fabric, bad anatomy, wrong anatomy, reversed body, impossible position, extra arms, extra legs, fused limbs, distorted face, cross-eyed, bad eyes",
        };

        // === SISTEMA DE VOTOS ===
        this._loadVoteData();
    }

    // ==========================================
    // SISTEMA DE VOTOS
    // ==========================================
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

    // FIXED: Only reference arrays that actually exist
    _extractElements(text) {
        const elements = [];
        const allArrays = {
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
            accessories: this.accessories,
            camera_angles: this.camera_angles,
            technical_composition: this.technical_composition,
            texture_quality: this.texture_quality,
            overall_quality: this.overall_quality,
            final_touches: this.final_touches,
        };

        const lowerText = text.toLowerCase();
        for (const [arrayName, arr] of Object.entries(allArrays)) {
            if (!arr || !Array.isArray(arr)) continue;
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

    getVoteStats() {
        const stats = { totalVotes: 0, preferences: [], avoided: [] };
        for (const [key, data] of Object.entries(this.voteData)) {
            const score = (data.up || 0) - (data.down || 0);
            const total = (data.up || 0) + (data.down || 0);
            stats.totalVotes += total;
            if (score > 0) stats.preferences.push({ element: key.split('::')[1] || key, score, votes: total, category: key.split('::')[0] });
            if (score < 0) stats.avoided.push({ element: key.split('::')[1] || key, score, votes: total, category: key.split('::')[0] });
        }
        stats.preferences.sort((a, b) => b.score - a.score);
        stats.avoided.sort((a, b) => a.score - b.score);
        return stats;
    }

    // === STATS DASHBOARD ===
    getDetailedStats() {
        const stats = this.getVoteStats();
        const categoryBreakdown = {};
        for (const [key, data] of Object.entries(this.voteData)) {
            const [cat] = key.split('::');
            if (!categoryBreakdown[cat]) categoryBreakdown[cat] = { total: 0, positive: 0, negative: 0 };
            const score = (data.up || 0) - (data.down || 0);
            categoryBreakdown[cat].total += (data.up || 0) + (data.down || 0);
            if (score > 0) categoryBreakdown[cat].positive++;
            else if (score < 0) categoryBreakdown[cat].negative++;
        }
        return {
            ...stats,
            categoryBreakdown,
            totalElements: Object.keys(this.voteData).length,
            historyCount: this._getHistoryCount(),
        };
    }

    _getHistoryCount() {
        try {
            return JSON.parse(localStorage.getItem('promptHistory') || '[]').length;
        } catch { return 0; }
    }

    clearVoteData() {
        this.voteData = {};
        this._saveVoteData();
    }

    // ==========================================
    // SELECCIÓN INTELIGENTE
    // ==========================================
    _smartChoice(arr, arrayName) {
        if (!arr || arr.length === 0) return '';
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
        if (!arr || arr.length === 0) return '';
        return arr[Math.floor(Math.random() * arr.length)];
    }

    _randomFloat() {
        return Math.random();
    }

    // ==========================================
    // BACKGROUND CONTEXTUAL
    // ==========================================
    _getAppropriateBackground(personStyle) {
        const darkBackgroundsStart = this.backgrounds.length - 12;

        if (personStyle === 'gotica') {
            if (Math.random() < 0.8) {
                const darkBgs = this.backgrounds.slice(darkBackgroundsStart);
                return this._smartChoice(darkBgs, 'backgrounds');
            }
        } else if (personStyle === 'alternativa') {
            if (Math.random() < 0.6) {
                const darkBgs = this.backgrounds.slice(darkBackgroundsStart);
                return this._smartChoice(darkBgs, 'backgrounds');
            }
        } else if (personStyle === 'pija') {
            const luxuryBgs = this.backgrounds.filter(bg =>
                !bg.includes('dark') && !bg.includes('abandoned') &&
                !bg.includes('warehouse') && !bg.includes('graffiti') &&
                (bg.includes('luxury') || bg.includes('penthouse') ||
                 bg.includes('designer') || bg.includes('villa') || bg.includes('yacht'))
            );
            if (luxuryBgs.length > 0 && Math.random() < 0.7) {
                return this._smartChoice(luxuryBgs, 'backgrounds');
            }
        }

        const normalBgs = this.backgrounds.slice(0, darkBackgroundsStart);
        return this._smartChoice(normalBgs, 'backgrounds');
    }

    // ==========================================
    // TOKEN COUNTING
    // ==========================================
    countTokens(text) {
        if (!text) return 0;
        // CLIP tokenizer approximation: ~0.75 words per token for English
        const words = text.split(/[\s,]+/).filter(w => w.length > 0);
        return Math.ceil(words.length * 1.3);
    }

    getTokenWarning(tokenCount) {
        if (tokenCount <= 60) return { level: 'ok', message: `${tokenCount} tokens - Perfecto` };
        if (tokenCount <= 77) return { level: 'warning', message: `${tokenCount} tokens - Cerca del límite SDXL (77)` };
        if (tokenCount <= 150) return { level: 'over', message: `${tokenCount} tokens - EXCEDE límite SDXL (77). Se truncará.` };
        return { level: 'critical', message: `${tokenCount} tokens - MUY largo. Elementos perdidos.` };
    }

    // ==========================================
    // MODO COMPACTO
    // ==========================================
    generateCompactPrompt(options = {}) {
        const result = this.generatePrompt(options);
        // Convert long descriptions to keywords only
        const compactPositive = this._compactify(result.positive_prompt);
        return { ...result, positive_prompt: compactPositive, compact: true };
    }

    _compactify(text) {
        // Remove filler words, keep essentials
        const fillerWords = ['and', 'with', 'the', 'of', 'in', 'on', 'at', 'for', 'to', 'a', 'an', 'is', 'are', 'very', 'quite', 'really', 'just', 'that', 'this', 'incredibly'];
        const words = text.split(/[\s]+/);
        const filtered = words.filter(w => {
            const clean = w.replace(/[,]/g, '').toLowerCase();
            return !fillerWords.includes(clean) && clean.length > 1;
        });
        // Also remove redundant consecutive commas and clean up
        return filtered.join(' ').replace(/,\s*,/g, ',').replace(/\s+/g, ' ').trim();
    }

    // ==========================================
    // EMPHASIS WEIGHTS
    // ==========================================
    addEmphasis(text, weight = 1.2) {
        return `(${text}:${weight})`;
    }

    generateWithEmphasis(options = {}) {
        const result = this.generatePrompt(options);
        const parts = result.positive_prompt.split(', ');
        // Emphasize first 3 elements (subject description) and quality
        const emphasized = parts.map((part, i) => {
            if (i < 3) return this.addEmphasis(part, 1.2);
            if (part.includes('quality') || part.includes('8K') || part.includes('4K')) return this.addEmphasis(part, 1.1);
            return part;
        });
        return { ...result, positive_prompt: emphasized.join(', '), hasEmphasis: true };
    }

    // ==========================================
    // OPTIMAL ORDERING
    // ==========================================
    _optimizeOrder(parts) {
        // SDXL gives more weight to early tokens
        // Order: Subject > Pose/Action > Clothing > Location > Lighting > Quality
        const categories = {
            subject: [],
            pose: [],
            clothing: [],
            location: [],
            lighting: [],
            quality: [],
            other: []
        };

        parts.forEach(part => {
            const lower = part.toLowerCase();
            if (lower.includes('woman') || lower.includes('hair') || lower.includes('eyes') || lower.includes('skin') || lower.includes('face') || lower.includes('breasts') || lower.includes('body') || lower.includes('tattoo') || lower.includes('makeup') || lower.includes('piercing')) {
                categories.subject.push(part);
            } else if (lower.includes('pose') || lower.includes('position') || lower.includes('kneeling') || lower.includes('lying') || lower.includes('standing') || lower.includes('arching') || lower.includes('sitting')) {
                categories.pose.push(part);
            } else if (lower.includes('wearing') || lower.includes('lingerie') || lower.includes('bikini') || lower.includes('dress') || lower.includes('towel') || lower.includes('thong') || lower.includes('nude') || lower.includes('clothing')) {
                categories.clothing.push(part);
            } else if (lower.includes('bedroom') || lower.includes('bathroom') || lower.includes('hotel') || lower.includes('pool') || lower.includes('mirror') || lower.includes('gothic') || lower.includes('club') || lower.includes('studio')) {
                categories.location.push(part);
            } else if (lower.includes('light') || lower.includes('shadow') || lower.includes('glow') || lower.includes('candle') || lower.includes('neon') || lower.includes('golden hour')) {
                categories.lighting.push(part);
            } else if (lower.includes('quality') || lower.includes('resolution') || lower.includes('lens') || lower.includes('skin texture') || lower.includes('photo') || lower.includes('shot on') || lower.includes('f1.') || lower.includes('f2.') || lower.includes('mm') || lower.includes('DOF') || lower.includes('detail')) {
                categories.quality.push(part);
            } else {
                categories.other.push(part);
            }
        });

        return [
            ...categories.subject,
            ...categories.pose,
            ...categories.clothing,
            ...categories.location,
            ...categories.lighting,
            ...categories.other,
            ...categories.quality
        ];
    }

    // ==========================================
    // PRESETS
    // ==========================================
    savePreset(name, options) {
        try {
            const presets = JSON.parse(localStorage.getItem('promptPresets') || '{}');
            presets[name] = { ...options, savedAt: new Date().toISOString() };
            localStorage.setItem('promptPresets', JSON.stringify(presets));
            return true;
        } catch { return false; }
    }

    loadPreset(name) {
        try {
            const presets = JSON.parse(localStorage.getItem('promptPresets') || '{}');
            return presets[name] || null;
        } catch { return null; }
    }

    getPresets() {
        try {
            return JSON.parse(localStorage.getItem('promptPresets') || '{}');
        } catch { return {}; }
    }

    deletePreset(name) {
        try {
            const presets = JSON.parse(localStorage.getItem('promptPresets') || '{}');
            delete presets[name];
            localStorage.setItem('promptPresets', JSON.stringify(presets));
            return true;
        } catch { return false; }
    }

    // ==========================================
    // CONFLICT DETECTION
    // ==========================================
    detectConflicts(options) {
        const conflicts = [];
        const { person_style, hair_color, ethnicity, location } = options;

        // Gothic + beach/bright locations
        if (person_style === 'gotica' && ['poolside', 'beach_cabana', 'beach_house', 'resort'].includes(location)) {
            conflicts.push({ severity: 'warning', message: 'Estilo gótico + ubicación de playa/sol pueden no combinar bien' });
        }

        // Pija + dark/underground locations
        if (person_style === 'pija' && ['underground', 'warehouse', 'tattoo'].some(w =>
            (location || '').includes(w))) {
            conflicts.push({ severity: 'warning', message: 'Estilo pija + ubicación underground pueden no combinar' });
        }

        // Gothic + blonde hair
        if (person_style === 'gotica' && ['blonde', 'platinum', 'strawberry_blonde'].includes(hair_color)) {
            conflicts.push({ severity: 'info', message: 'Estilo gótico suele usar pelo oscuro. Pelo claro puede verse incoherente.' });
        }

        // Futbolera + heavy makeup styles
        if (person_style === 'futbolera' && hair_color === 'rose_gold') {
            conflicts.push({ severity: 'info', message: 'Pelo rosa oro no es muy común en estilo deportivo' });
        }

        // High level + casual location
        if (options.explicitness_level >= 4 && location === 'park') {
            conflicts.push({ severity: 'warning', message: 'Nivel explícito + ubicación pública = incoherente' });
        }

        return conflicts;
    }

    // ==========================================
    // SUGGESTIONS
    // ==========================================
    getSuggestions(personStyle) {
        const suggestions = {
            normal: {
                locations: ['bedroom', 'bathroom', 'hotel_room', 'beach_house'],
                hairColors: ['blonde', 'brunette', 'light_brown', 'balayage'],
                atmosphere: 'Casual y natural - cualquier ambiente vale',
            },
            futbolera: {
                locations: ['gym_locker', 'poolside', 'resort', 'beach_cabana'],
                hairColors: ['brunette', 'dark_blonde', 'chestnut', 'light_brown'],
                atmosphere: 'Energético y atlético - ambientes deportivos o post-workout',
            },
            alternativa: {
                locations: ['warehouse', 'underground_club', 'tattoo_parlor', 'industrial'],
                hairColors: ['red', 'platinum', 'burgundy', 'rose_gold', 'black'],
                atmosphere: 'Urbano y rebelde - ambientes underground e industriales',
            },
            gotica: {
                locations: ['gothic_mansion', 'cathedral', 'cemetery', 'dark_bedroom'],
                hairColors: ['black', 'burgundy', 'black'],
                atmosphere: 'Oscuro y misterioso - velas, sombras, ambientes góticos',
            },
            pija: {
                locations: ['penthouse', 'yacht', 'luxury_bedroom', 'villa', 'hotel_room'],
                hairColors: ['blonde', 'platinum', 'dark_blonde'],
                atmosphere: 'Lujoso y refinado - ambientes de alto standing',
            },
            hipster: {
                locations: ['artist_studio', 'cafe', 'library', 'garden_terrace'],
                hairColors: ['auburn', 'balayage', 'ash_brown', 'strawberry_blonde'],
                atmosphere: 'Artístico y bohemio - vintage, creativo, indie',
            },
        };
        return suggestions[personStyle] || suggestions.normal;
    }

    // ==========================================
    // INSPIRATION MODE
    // ==========================================
    generateInspiration() {
        // Completely random prompt ignoring all settings
        const styles = Object.keys(this.person_styles);
        const style = this._randomChoice(styles);
        const sizes = Object.keys(this.breast_sizes);
        const size = this._randomChoice(sizes);
        const hairStyles = Object.keys(this.hair_styles);
        const hairStyle = this._randomChoice(hairStyles);
        const hairColors = Object.keys(this.hair_colors);
        const hairColor = this._randomChoice(hairColors);
        const eyeColors = Object.keys(this.eye_colors);
        const eyeColor = this._randomChoice(eyeColors);
        const ethnicities = Object.keys(this.ethnicities).filter(e => e !== 'default');
        const ethnicity = this._randomChoice(ethnicities);
        const age = Math.floor(Math.random() * 18) + 18; // 18-35
        const level = Math.floor(Math.random() * 6); // 0-5

        return this.generatePrompt({
            person_style: style,
            breast_size: size,
            hair_style: hairStyle,
            hair_color: hairColor,
            eye_color: eyeColor,
            ethnicity: ethnicity,
            age: age,
            explicitness_level: level,
            randomize: true,
            clothed: level < 2,
            _inspiration: true,
            _inspirationMeta: { style, size, hairStyle, hairColor, eyeColor, ethnicity, age, level },
        });
    }

    // ==========================================
    // VARIATION MODE
    // ==========================================
    generateVariation(basePrompt, variationStrength = 0.3) {
        if (!basePrompt || !basePrompt.positive_prompt) return this.generatePrompt();

        const parts = basePrompt.positive_prompt.split(', ');
        const newParts = parts.map(part => {
            if (Math.random() < variationStrength) {
                // Replace this part with a random alternative
                const lower = part.toLowerCase();
                if (lower.includes('light') || lower.includes('shadow')) return this._randomChoice(this.lighting);
                if (lower.includes('pose') || lower.includes('position')) return this._randomChoice(this.poses_nude);
                if (lower.includes('bedroom') || lower.includes('bathroom') || lower.includes('hotel')) return this._randomChoice(this.backgrounds);
                if (lower.includes('quality') || lower.includes('resolution')) return this._randomChoice(this.overall_quality);
                if (lower.includes('expression') || lower.includes('gaze') || lower.includes('smile') || lower.includes('eyes')) return this._randomChoice(this.facial_expressions);
                if (lower.includes('tone') || lower.includes('tones')) return this._randomChoice(this.color_tones);
            }
            return part;
        });

        return {
            ...basePrompt,
            positive_prompt: newParts.join(', '),
            isVariation: true,
        };
    }

    generateEvolutions(basePrompt, count = 5) {
        const evolutions = [];
        for (let i = 0; i < count; i++) {
            const strength = 0.15 + (i * 0.1); // 0.15 to 0.55
            evolutions.push(this.generateVariation(basePrompt, strength));
        }
        return evolutions;
    }

    // ==========================================
    // EXPORT METHODS
    // ==========================================
    exportJSON(prompts) {
        return JSON.stringify(prompts, null, 2);
    }

    exportCSV(prompts) {
        const headers = ['positive_prompt', 'negative_prompt', 'steps', 'cfg', 'sampler', 'scheduler', 'width', 'height', 'seed', 'clip_skip'];
        const rows = prompts.map(p => headers.map(h => `"${(p[h] || '').toString().replace(/"/g, '""')}"`).join(','));
        return [headers.join(','), ...rows].join('\n');
    }

    exportTXT(prompts) {
        return prompts.map((p, i) => {
            return `=== Prompt ${i + 1} ===\nPositive: ${p.positive_prompt}\nNegative: ${p.negative_prompt}\nSteps: ${p.steps} | CFG: ${p.cfg} | Sampler: ${p.sampler} | Size: ${p.width}x${p.height}\n`;
        }).join('\n');
    }

    exportA1111(prompts) {
        return prompts.map((p, i) => {
            return `${p.positive_prompt}\nNegative prompt: ${p.negative_prompt}\nSteps: ${p.steps}, Sampler: ${p.sampler}, CFG scale: ${p.cfg}, Seed: ${p.seed}, Size: ${p.width}x${p.height}, Clip skip: ${p.clip_skip}\n`;
        }).join('\n---\n');
    }

    exportComfyUI(prompts) {
        return JSON.stringify(prompts.map(p => ({
            positive: p.positive_prompt,
            negative: p.negative_prompt,
            settings: {
                steps: p.steps,
                cfg: p.cfg,
                sampler_name: p.sampler,
                scheduler: p.scheduler,
                width: p.width,
                height: p.height,
                seed: p.seed,
                clip_skip: p.clip_skip,
            }
        })), null, 2);
    }

    // ==========================================
    // BUILD PERSON DESCRIPTION
    // ==========================================
    _buildPersonDescription(personStyle = 'normal', breastSize = 'medium', hairStyle = 'long_waves', hairColor = 'blonde', eyeColor = 'green', ethnicity = 'default', age = 22) {
        const parts = [];

        // Age + base
        parts.push(`${this.person_fixed.base}, ${age} years old`);

        // Ethnicity
        const ethData = this.ethnicities[ethnicity] || this.ethnicities.default;
        if (ethData.modifier) parts.push(ethData.modifier);

        // Hair: auto selection or manual
        let selectedHairStyle = hairStyle;
        let selectedHairColor = hairColor;

        if (hairStyle === 'auto' || hairColor === 'auto') {
            const prefs = this.style_hair_preferences[personStyle] || this.style_hair_preferences.normal;

            if (hairStyle === 'auto') {
                selectedHairStyle = this._randomChoice(prefs.styles) || 'long_waves';
            }

            if (hairColor === 'auto') {
                const colorMap = {
                    normal: ['blonde', 'brunette', 'light_brown', 'dark_blonde'],
                    futbolera: ['brunette', 'light_brown', 'dark_blonde', 'chestnut'],
                    alternativa: ['red', 'burgundy', 'platinum', 'black', 'rose_gold'],
                    gotica: ['black', 'black', 'black', 'burgundy'],
                    pija: ['blonde', 'blonde', 'platinum', 'dark_blonde'],
                    hipster: ['auburn', 'balayage', 'ash_brown', 'strawberry_blonde']
                };
                const colors = colorMap[personStyle] || colorMap.normal;
                selectedHairColor = this._randomChoice(colors) || 'brunette';
            }
        }

        const style_hair = this.hair_styles[selectedHairStyle] || this.hair_styles.long_waves;
        const color_hair = this.hair_colors[selectedHairColor] || this.hair_colors.blonde;
        parts.push(style_hair + ", " + color_hair);

        // Person style modifier
        const style = this.person_styles[personStyle] || this.person_styles.normal;
        parts.push(style.modifier);

        // Skin (adjust by style and ethnicity)
        if (personStyle === 'gotica') {
            parts.push("fair porcelain skin, pale ghost-white complexion, alabaster");
        } else if (ethnicity !== 'default') {
            parts.push(ethData.skin);
        } else {
            parts.push(this.person_fixed.skin);
        }

        // Eyes
        const eyeDesc = this.eye_colors[eyeColor] || this.eye_colors.green;
        parts.push(eyeDesc);

        parts.push(this.person_fixed.face);

        // Makeup (adjusted by style)
        if (personStyle === 'gotica') {
            parts.push("dramatic long black winged eyeliner, heavy dark eyeshadow, black lipstick, gothic makeup, dark nail polish");
        } else if (personStyle === 'alternativa') {
            parts.push("bold edgy makeup, thick black eyeliner, alternative style makeup");
        } else if (personStyle === 'pija') {
            parts.push("flawless professional makeup, elegant subtle, expensive cosmetics");
        } else {
            parts.push(this.person_fixed.makeup);
        }

        // Breast size
        const breastDesc = this.breast_sizes[breastSize] || this.breast_sizes.medium;
        parts.push(breastDesc);

        // Style extras
        parts.push(style.extras);

        return parts.join(", ");
    }

    // ==========================================
    // CONTEXTUAL NEGATIVE PROMPT
    // ==========================================
    _buildNegativePrompt(level, custom_options = {}, personStyle = 'normal') {
        let negative = this.negative_base;

        // Level-specific negatives
        if (this.negative_by_level[level]) {
            negative += `, ${this.negative_by_level[level]}`;
        }

        // Camera angle specifics
        if (custom_options.camera_angle === 'from_behind') {
            negative += ", front-facing features on back view, face visible from behind, twisted body, unnatural rotation, impossible spine";
        }

        // Style specifics
        if (personStyle === 'gotica') {
            negative += ", bright colors, sunny, cheerful, pastel colors";
        } else if (personStyle === 'pija') {
            negative += ", cheap, dirty, grunge, trashy, low-class";
        }

        // Random extra
        if (this._randomFloat() > 0.5) {
            negative += `, ${this._randomChoice(this.negative_extras)}`;
        }

        return negative;
    }

    // ==========================================
    // MAIN GENERATE
    // ==========================================
    generatePrompt(options = {}) {
        const {
            clothed = true,
            wet = false,
            custom_options = {},
            randomize = true,
            explicitness_level = 0,
            person_style = 'normal',
            breast_size = 'medium',
            hair_style = 'auto',
            hair_color = 'auto',
            eye_color = 'green',
            ethnicity = 'default',
            age = 22,
            compact = false,
            emphasis = false,
        } = options;

        if (explicitness_level > 0) {
            return this._generateByLevel(explicitness_level, custom_options, randomize, person_style, breast_size, hair_style, hair_color, eye_color, ethnicity, age);
        }

        const prompt_parts = [];

        if (!clothed) {
            // SIN ROPA
            const conditionValues = Object.values(this.conditions).filter(v => v);
            const condition = wet ? "wet" : (this._randomFloat() > 0.5 ? this._randomChoice(conditionValues) : "");
            const personDesc = this._buildPersonDescription(person_style, breast_size, hair_style, hair_color, eye_color, ethnicity, age);
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
                    getting_ready: 'getting ready for night out',
                    after_shower: 'fresh out of shower, skin damp',
                    photoshoot: 'private intimate photoshoot',
                    boudoir: 'professional boudoir photography',
                    intimate_selfie: 'intimate selfie for someone special',
                    getting_undressed: 'getting undressed, mid-removal',
                };
                prompt_parts.push(scenario_map[scenario_option] || this._smartChoice(this.scenarios, 'scenarios'));
            } else if (randomize && this._randomFloat() > 0.5) {
                prompt_parts.push(this._smartChoice(this.scenarios, 'scenarios'));
            }

            prompt_parts.push(this._smartChoice(this.lighting, 'lighting'));
            prompt_parts.push(this._smartChoice(this.body_modifiers_nude, 'body_modifiers_nude'));

            // Facial expression
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

            // Angle
            const angle_option = custom_options.camera_angle;
            if (angle_option && angle_option !== 'random') {
                const angle_map = {
                    eye_level: 'eye level angle, natural perspective',
                    low_angle: 'low angle, looking up, empowering',
                    high_angle: 'high angle, looking down, intimate',
                    over_shoulder: 'over the shoulder shot, mysterious',
                    from_behind: 'back view, rear angle, correct anatomy',
                    side_profile: 'side profile view, silhouette',
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
                prompt_parts.push(location_map[location_option] || this._getAppropriateBackground(person_style));
            } else {
                prompt_parts.push(this._getAppropriateBackground(person_style));
            }

            // Clothing coverage
            const clothing_keys = Object.keys(this.clothing);
            const clothing_choice = custom_options.clothing || this._randomChoice(clothing_keys);
            if (clothing_choice !== 'none_nude') {
                prompt_parts.push(this.clothing[clothing_choice]);
            }

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
            const personDesc = this._buildPersonDescription(person_style, breast_size, hair_style, hair_color, eye_color, ethnicity, age);
            if (condition) {
                prompt_parts.push(`${condition} ${personDesc}`);
            } else {
                prompt_parts.push(personDesc);
            }

            prompt_parts.push(this._smartChoice(this.clothing_full, 'clothing_full'));
            prompt_parts.push(this._smartChoice(this.photo_types, 'photo_types'));

            const scenario_option = custom_options.scenario;
            if (scenario_option && scenario_option !== 'random') {
                const scenario_map = {
                    morning_after: 'morning after scene, just woke up',
                    getting_ready: 'getting ready for night out',
                    after_shower: 'fresh out of shower, skin damp',
                    photoshoot: 'private intimate photoshoot',
                    boudoir: 'professional boudoir session',
                    intimate_selfie: 'intimate selfie',
                    getting_undressed: 'getting undressed, mid-removal',
                };
                prompt_parts.push(scenario_map[scenario_option] || this._smartChoice(this.scenarios, 'scenarios'));
            } else if (randomize && this._randomFloat() > 0.5) {
                prompt_parts.push(this._smartChoice(this.scenarios, 'scenarios'));
            }

            prompt_parts.push(this._smartChoice(this.lighting, 'lighting'));

            // Facial
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

            if (randomize && this._randomFloat() > 0.7) {
                const soft_poses = ["confident power pose", "casual relaxed pose", "playful pose, mid-laugh", "flirty pose, hip cocked"];
                prompt_parts.push(this._randomChoice(soft_poses));
            }

            // Angle
            const angle_option = custom_options.camera_angle;
            if (angle_option && angle_option !== 'random') {
                const angle_map = {
                    eye_level: 'eye level angle, natural perspective',
                    low_angle: 'low angle, looking up, empowering',
                    high_angle: 'high angle, looking down, intimate',
                    over_shoulder: 'over the shoulder shot, mysterious',
                    from_behind: 'back view, rear angle, correct anatomy',
                    side_profile: 'side profile view, silhouette',
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
                prompt_parts.push(location_map[location_option] || this._getAppropriateBackground(person_style));
            } else {
                prompt_parts.push(this._getAppropriateBackground(person_style));
            }

            if (this._randomFloat() > 0.6) {
                prompt_parts.push(this._smartChoice(this.accessories, 'accessories'));
            }

            if (this._randomFloat() > 0.4) {
                prompt_parts.push(this._smartChoice(this.style_modifiers, 'style_modifiers'));
            }

            prompt_parts.push(this._smartChoice(this.color_tones, 'color_tones'));
            prompt_parts.push(this._smartChoice(this.final_touches, 'final_touches'));
        }

        // Optimize order
        const optimized = this._optimizeOrder(prompt_parts);
        const positive_prompt = optimized.join(", ");
        const negative_prompt = this._buildNegativePrompt(0, custom_options, person_style);

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

    // ==========================================
    // GENERATE BY LEVEL
    // ==========================================
    _generateByLevel(level, custom_options, randomize, person_style = 'normal', breast_size = 'medium', hair_style = 'auto', hair_color = 'auto', eye_color = 'green', ethnicity = 'default', age = 22) {
        const prompt_parts = [];
        const personDesc = this._buildPersonDescription(person_style, breast_size, hair_style, hair_color, eye_color, ethnicity, age);

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
            prompt_parts.push(this._getAppropriateBackground(person_style));
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
            prompt_parts.push(this._getAppropriateBackground(person_style));
            if (this._randomFloat() > 0.5) {
                prompt_parts.push(this._smartChoice(this.atmosphere_details, 'atmosphere_details'));
            }
        }

        // NIVEL 4: Sensual
        else if (level === 4) {
            prompt_parts.push(`nude of a ${personDesc}`);
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
            prompt_parts.push(this._getAppropriateBackground(person_style));
            if (this._randomFloat() > 0.4) {
                prompt_parts.push(this._smartChoice(this.atmosphere_details, 'atmosphere_details'));
            }
        }

        // NIVEL 5: Explícito
        else if (level === 5) {
            prompt_parts.push(`nude of a ${personDesc}`);
            prompt_parts.push("wearing only tiny thong underwear, minimal coverage, naked body");

            prompt_parts.push(this._smartChoice(this.body_mods_level5, 'body_mods_level5'));
            prompt_parts.push(this._smartChoice(this.poses_level5, 'poses_level5'));
            prompt_parts.push(this._smartChoice(this.scenarios_level5, 'scenarios_level5'));
            prompt_parts.push(this._smartChoice(this.expressions_level5, 'expressions_level5'));
            prompt_parts.push(this._smartChoice(this.lighting_level5, 'lighting_level5'));
            prompt_parts.push(this._smartChoice(this.camera_level5, 'camera_level5'));

            const bg_explicit = [
                "luxury bedroom, silk satin sheets, dim warm lighting, candles",
                "boutique hotel suite, king bed, warm ambient golden light",
                "minimalist modern bedroom, crisp white sheets, natural morning",
                "dark moody bedroom, deep atmosphere, single warm lamp, shadows",
                "professional studio, dark seamless backdrop, controlled lighting",
                "penthouse bedroom, city skyline through windows, night",
                "rustic cabin bedroom, fireplace glow, fur throws, intimate",
            ];
            prompt_parts.push(this._randomChoice(bg_explicit));

            prompt_parts.push("ultra realistic skin, natural pores imperfections, subsurface scattering, photorealistic");
            prompt_parts.push("8K, ultra detailed, masterpiece, award-winning photography");
            prompt_parts.push(this._smartChoice(this.color_tones, 'color_tones'));
            prompt_parts.push("raw photo, unedited authentic, genuine moment");
            prompt_parts.push(this._smartChoice(this.style_modifiers, 'style_modifiers'));

            // Angle
            const angle_opt = custom_options.camera_angle;
            if (angle_opt && angle_opt !== 'random') {
                const angle_map = {
                    eye_level: 'eye level angle, natural direct',
                    low_angle: 'low angle, looking up, powerful',
                    high_angle: 'high angle, looking down, dominant',
                    over_shoulder: 'over shoulder shot, intimate',
                    from_behind: 'back view, rear angle, anatomically accurate',
                    side_profile: 'side profile, body contour visible',
                    close_up: 'close-up shot, intimate detail',
                    full_body: 'full body shot from below, dramatic',
                };
                prompt_parts.push(angle_map[angle_opt] || '');
            }

            // Location
            const loc_opt = custom_options.location;
            if (loc_opt && loc_opt !== 'random') {
                const location_map = this._getLocationMap();
                const filtered = prompt_parts.filter(p => !p.toLowerCase().includes('bedroom') || p.toLowerCase().includes('nude'));
                filtered.push(location_map[loc_opt] || '');

                const positive_prompt = this._optimizeOrder(filtered.filter(p => p)).join(", ");
                const negative_prompt = this._buildNegativePrompt(5, custom_options, person_style);

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

            const positive_prompt = this._optimizeOrder(prompt_parts.filter(p => p)).join(", ");
            const negative_prompt = this._buildNegativePrompt(5, custom_options, person_style);

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

        // Common options for levels 1-4
        const angle_opt = custom_options.camera_angle;
        if (angle_opt && angle_opt !== 'random') {
            const angle_map = {
                eye_level: 'eye level angle, natural perspective',
                low_angle: 'low angle, looking up, empowering',
                high_angle: 'high angle, looking down, intimate',
                over_shoulder: 'over the shoulder shot, mysterious',
                from_behind: 'back view, rear angle, correct anatomy',
                side_profile: 'side profile view, silhouette',
                close_up: 'close-up shot, face and upper body',
                full_body: 'full body shot, head to toe',
            };
            prompt_parts.push(angle_map[angle_opt] || this._smartChoice(this.camera_angles, 'camera_angles'));
        }

        const loc_opt = custom_options.location;
        if (loc_opt && loc_opt !== 'random') {
            const location_map = this._getLocationMap();
            const filtered = prompt_parts.filter(p => !p.toLowerCase().includes('background') && !p.toLowerCase().includes('setting'));
            filtered.push(location_map[loc_opt] || this._getAppropriateBackground(person_style));
            prompt_parts.length = 0;
            filtered.forEach(p => prompt_parts.push(p));
        }

        if (level >= 2) prompt_parts.push(this._smartChoice(this.technical_composition, 'technical_composition'));
        if (level >= 3) prompt_parts.push(this._smartChoice(this.texture_quality, 'texture_quality'));
        prompt_parts.push(this._smartChoice(this.overall_quality, 'overall_quality'));
        prompt_parts.push(this._smartChoice(this.color_tones, 'color_tones'));
        if (level >= 3) prompt_parts.push(this._smartChoice(this.final_touches, 'final_touches'));

        if (level >= 2 && this._randomFloat() > 0.4) {
            prompt_parts.push(this._smartChoice(this.style_modifiers, 'style_modifiers'));
        }

        const positive_prompt = this._optimizeOrder(prompt_parts).join(", ");
        const negative_prompt = this._buildNegativePrompt(level, custom_options, person_style);

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
            mirror: 'full-length mirror, bathroom or bedroom, mirror reflection effect',
            luxury_bedroom: 'luxury bedroom, silk sheets, designer decor',
            hotel_room: 'boutique hotel room, tasteful decor, city view',
            jacuzzi: 'private jacuzzi, bubbling water, warm lighting',
            sauna: 'wooden sauna room, steam, amber tones',
            poolside: 'infinity pool edge, sunset, resort',
            beach_cabana: 'private beach cabana, sheer curtains, ocean',
            yacht: 'luxury yacht master cabin, ocean porthole',
            villa: 'private Mediterranean villa, terracotta walls',
            rooftop: 'rooftop terrace, city lights, night sky',
            spa: 'zen spa room, natural wood, candles',
            resort: 'tropical resort bungalow, ocean view',
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
