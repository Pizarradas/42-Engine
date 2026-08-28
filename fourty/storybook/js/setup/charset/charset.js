/* ════════════════════════════════════════════════════════════════════════
   setup/charset/charset.js — Setup / Charset
   Documenta el "charset" — el set de glifos disponibles en la tipografía de
   cada marca del 42DS. No hay un parcial SCSS específico para Charset: lo
   que se ve aquí depende de las fuentes que la marca activa carga vía
   `setting.css` (variables `--font-primary`, `--font-secondary`,
   `--font-branded`, etc.) y del <meta charset="UTF-8"> del documento.

   Por eso esta story renderiza los glifos con tags HTML desnudos (sin .ft-*)
   y deja que el reset+brand active gobierne la apariencia. Cambia Brand en
   el toolbar para ver cómo varía la tipografía de la marca.

   Estructura:
     · Base (interactive)         → categoría de glifos (alfabeto · números ·
                                    símbolos · puntuación · diacríticos ·
                                    matemáticos · moneda)
     · Galleries (collapsed)
         · Una galería por familia (alfabeto / números / etc.) a tamaño grande
         · `audit` → MATRIZ DE AUDITORÍA del showroom (codepoints 32-255):
           reproduce la tabla de fourty/base/base-charset.html con 4 columnas
           por codepoint (ASCII · ANSI · 8859 · UTF-8) para validar visualmente
           que la fuente activa renderiza todos los glifos en todas las
           codificaciones. Si una celda muestra un "tofu" (□) o un ?, la fuente
           no soporta ese codepoint.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ Categorías de glifos ▼ */
    const DATA = {
        categories: [
            ["uppercase",  "Alfabeto mayúsculas"],
            ["lowercase",  "Alfabeto minúsculas"],
            ["numbers",    "Números"],
            ["punctuation","Puntuación"],
            ["diacritics", "Acentos / diacríticos"],
            ["symbols",    "Símbolos comunes"],
            ["math",       "Matemáticos"],
            ["currency",   "Moneda"]
        ],
        GLYPHS: {
            uppercase:   "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split(""),
            lowercase:   "abcdefghijklmnñopqrstuvwxyz".split(""),
            numbers:     "0123456789".split(""),
            punctuation: ".,;:!?¡¿\"'`´…«»()[]{}—–-/\\|".split(""),
            diacritics:  "áéíóúüÁÉÍÓÚÜàèìòùâêîôûãñõçÇ".split(""),
            symbols:     "@#$%&*+=<>~^_°§¶†‡•◊©®™".split(""),
            math:        "±×÷≈≠≤≥∞∑∏∆√∂∫µπ".split(""),
            currency:    "€$£¥¢₿₽₹₩₪".split("")
        }
    };

    /* ─── Viz helpers ─── */
    const GRID = (chars, big) => {
        const cells = chars.map(c => `<div style="display:flex;align-items:center;justify-content:center;background:#fff;border:1px solid #eee;border-radius:3px;font-size:${big ? "32" : "22"}px;line-height:1;min-height:${big ? 64 : 48}px;color:#161616;">${esc(c)}</div>`).join("");
        return `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(${big ? 64 : 48}px,1fr));gap:8px;">${cells}</div>`;
    };
    const SECTION = (title, subtitle, body) =>
        `<section style="margin-bottom:24px;">
            <h3 style="margin:0 0 4px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">${esc(title)}</h3>
            ${subtitle ? '<p style="margin:0 0 10px;font:400 11.5px/1.4 \'Inter\',sans-serif;color:#666;">' + subtitle + '</p>' : ""}
            ${body}
        </section>`;

    /* ─── BASE — selector de categoría ─── */
    const baseArgTypes = [
        { key: "category", control: "select",
          desc: "Categoría de glifos a inspeccionar.",
          options: DATA.categories },
        { key: "size", control: "radio",
          desc: "Tamaño del muestrario.",
          options: [["normal", "normal"], ["big", "grande"]] }
    ];
    const baseArgs = { category: "uppercase", size: "normal" };
    const liveBase = (a) => {
        const cat = DATA.categories.find(c => c[0] === a.category);
        const chars = DATA.GLYPHS[a.category] || [];
        return `<div style="padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;">
            <p style="margin:0 0 6px;font:500 10.5px/1.2 monospace;color:#0f62fe;">Categoría: ${esc(a.category)}</p>
            <p style="margin:0 0 14px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">${esc(cat ? cat[1] : "")} · <strong>${chars.length}</strong> glifos. Cambia Brand para ver la tipografía de cada marca.</p>
            ${GRID(chars, a.size === "big")}
        </div>`;
    };

    /* ─── Galerías por categoría ─── */
    const galleryFor = (key, title) => () =>
        SECTION(title,
            "Glifos a tamaño grande. La fuente y el peso los gobierna la marca activa vía <code>setting.css</code> · <code>--font-primary</code>.",
            GRID(DATA.GLYPHS[key], true));

    /* ─── Galería: matriz de auditoría (codepoints 32-255) ─── */
    /* Reproduce la tabla de fourty/base/base-charset.html. Sirve para verificar
       que la tipografía activa de la marca renderiza correctamente todos los
       glifos del rango ASCII + Latin-1 extendido. Si una celda aparece como
       "tofu" (□) o como cuadrado vacío, la fuente no soporta ese codepoint.

       Las 4 columnas (ASCII · ANSI · 8859 · UTF-8) muestran el MISMO codepoint
       resuelto por JS (`String.fromCharCode(n)`), que en este entorno es Unicode
       puro. La auditoría es por tanto visual: si las 4 columnas se ven
       idénticas, la fuente soporta el codepoint con consistencia. */

    // Nombres canónicos de codepoints relevantes (puntuación, símbolos, latin
    // extended). Para letras a-z / A-Z generamos "Latin <letra>" en bucle.
    const CP_NAMES = {
        32: "space", 33: "exclamation mark", 34: "quotation mark", 35: "number sign",
        36: "dollar sign", 37: "percent sign", 38: "ampersand", 39: "apostrophe",
        40: "left parenthesis", 41: "right parenthesis", 42: "asterisk", 43: "plus sign",
        44: "comma", 45: "hyphen-minus", 46: "full stop", 47: "solidus",
        58: "colon", 59: "semicolon", 60: "less than", 61: "equals sign",
        62: "greater than", 63: "question mark", 64: "commercial at",
        91: "left square bracket", 92: "reverse solidus", 93: "right square bracket",
        94: "circumflex accent", 95: "low line", 96: "grave accent",
        123: "left curly bracket", 124: "vertical line", 125: "right curly bracket",
        126: "tilde", 127: "DEL (control)",
        160: "no-break space", 161: "inverted exclamation mark", 162: "cent sign",
        163: "pound sign", 164: "currency sign", 165: "yen sign",
        166: "broken bar", 167: "section sign", 168: "diaeresis", 169: "copyright sign",
        170: "feminine ordinal indicator", 171: "left guillemet", 172: "not sign",
        173: "soft hyphen", 174: "registered sign", 175: "macron", 176: "degree sign",
        177: "plus-minus sign", 178: "superscript two", 179: "superscript three",
        180: "acute accent", 181: "micro sign", 182: "pilcrow sign", 183: "middle dot",
        184: "cedilla", 185: "superscript one", 186: "masculine ordinal indicator",
        187: "right guillemet", 188: "vulgar fraction 1/4", 189: "vulgar fraction 1/2",
        190: "vulgar fraction 3/4", 191: "inverted question mark", 215: "multiplication sign",
        247: "division sign"
    };
    function cpName(n) {
        if (CP_NAMES[n]) return CP_NAMES[n];
        if (n >= 48 && n <= 57)   return "digit " + ["zero","one","two","three","four","five","six","seven","eight","nine"][n - 48];
        if (n >= 65 && n <= 90)   return "Latin capital " + String.fromCharCode(n);
        if (n >= 97 && n <= 122)  return "Latin small " + String.fromCharCode(n);
        if (n >= 128 && n <= 159) return "Latin-1 extended (C1 control)";
        if (n >= 192 && n <= 214) return "Latin capital " + String.fromCharCode(n).toLowerCase() + " (con diacrítico)";
        if (n >= 216 && n <= 222) return "Latin capital " + String.fromCharCode(n).toLowerCase() + " (con diacrítico)";
        if (n >= 224 && n <= 246) return "Latin small " + String.fromCharCode(n) + " (con diacrítico)";
        if (n >= 248 && n <= 254) return "Latin small " + String.fromCharCode(n) + " (con diacrítico)";
        if (n === 255)             return "Latin small y with diaeresis";
        if (n === 223)             return "Latin small sharp s";
        return "—";
    }

    const galleryAudit = () => {
        const rows = [];
        for (let n = 32; n <= 255; n++) {
            const c = String.fromCharCode(n);
            // Render del glifo en las 4 columnas. En JS todos resuelven a Unicode,
            // pero las pintamos por separado para que una falla puntual de la
            // fuente sea fácilmente detectable en una sola celda.
            const cell = (val) => `<td style="font-size:18px;line-height:1.1;text-align:center;padding:6px 8px;border-bottom:1px solid #f0f0f0;color:#161616;">${esc(val)}</td>`;
            const numCell = (val) => `<td style="font:500 11px/1.2 monospace;color:#666;padding:6px 10px;border-bottom:1px solid #f0f0f0;text-align:right;">${esc(val)}</td>`;
            const nameCell = (val) => `<td style="font:400 11.5px/1.4 'Inter',sans-serif;color:#666;padding:6px 10px;border-bottom:1px solid #f0f0f0;">${esc(val)}</td>`;
            rows.push(`<tr>${numCell(n)}${numCell("0x" + n.toString(16).toUpperCase().padStart(2,"0"))}${cell(c)}${cell(c)}${cell(c)}${cell(c)}${nameCell(cpName(n))}</tr>`);
        }
        return `<section>
            <header style="margin-bottom:12px;">
                <h3 style="margin:0 0 4px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Tabla de auditoría · codepoints 32 → 255</h3>
                <p style="margin:0;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">
                    224 glifos del rango ASCII (32-127) + Latin-1 extendido (128-255). Las cuatro columnas <strong>ASCII · ANSI · 8859 · UTF-8</strong> muestran el mismo codepoint repetido para detectar fallos puntuales de render: si una columna pinta "□" o "?" mientras las otras se ven bien, esa codificación no resuelve. Si las cuatro se ven igual, la fuente lo soporta con consistencia. <strong>Cambia Brand</strong> en el toolbar para validar fuente por fuente.
                </p>
            </header>
            <div style="border:1px solid #ddd;border-radius:3px;overflow:auto;background:#fff;">
                <table style="border-collapse:collapse;width:100%;min-width:540px;">
                    <thead style="background:#f5f5f5;position:sticky;top:0;">
                        <tr>
                            <th style="font:600 11px/1.2 'Inter',sans-serif;color:#161616;padding:8px 10px;border-bottom:2px solid #ddd;text-align:right;">Numb</th>
                            <th style="font:600 11px/1.2 'Inter',sans-serif;color:#161616;padding:8px 10px;border-bottom:2px solid #ddd;text-align:right;">Hex</th>
                            <th style="font:600 11px/1.2 'Inter',sans-serif;color:#161616;padding:8px 10px;border-bottom:2px solid #ddd;text-align:center;">ASCII</th>
                            <th style="font:600 11px/1.2 'Inter',sans-serif;color:#161616;padding:8px 10px;border-bottom:2px solid #ddd;text-align:center;">ANSI</th>
                            <th style="font:600 11px/1.2 'Inter',sans-serif;color:#161616;padding:8px 10px;border-bottom:2px solid #ddd;text-align:center;">8859</th>
                            <th style="font:600 11px/1.2 'Inter',sans-serif;color:#161616;padding:8px 10px;border-bottom:2px solid #ddd;text-align:center;">UTF-8</th>
                            <th style="font:600 11px/1.2 'Inter',sans-serif;color:#161616;padding:8px 10px;border-bottom:2px solid #ddd;text-align:left;">Description</th>
                        </tr>
                    </thead>
                    <tbody>${rows.join("")}</tbody>
                </table>
            </div>
        </section>`;
    };

    /* ─── Galería: composición de párrafo ─── */
    const galleryPangram = () => `
        ${SECTION("Pangrama español", "Texto que contiene todas las letras del alfabeto. Útil para inspeccionar el aspecto de la fuente en flujo natural.", `
            <p style="font-size:18px;line-height:1.5;color:#161616;">El veloz murciélago hindú comía feliz cardillo y kiwi. La cigüeña tocaba el saxofón detrás del palenque de paja.</p>
            <p style="font-size:24px;line-height:1.4;color:#161616;font-weight:600;">El veloz murciélago hindú comía feliz cardillo y kiwi.</p>
            <p style="font-size:36px;line-height:1.2;color:#161616;font-weight:700;">El veloz murciélago.</p>
        `)}
        ${SECTION("Mayúsculas, mezcla y números", null, `
            <p style="font-size:18px;line-height:1.5;color:#161616;letter-spacing:.02em;">EL VELOZ MURCIÉLAGO HINDÚ COMÍA FELIZ CARDILLO Y KIWI · 0123456789</p>
        `)}
    `;

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Charset</h1>
        <p class="cb-docs__lead">Inspector visual del <strong>set de glifos disponibles</strong> en la tipografía de la marca activa. No hay un parcial SCSS específico para Charset: lo que se renderiza depende de <code>&lt;meta charset="UTF-8"&gt;</code> del documento y de las fuentes que la marca carga en <code>setting.css</code>.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>&lt;meta charset="UTF-8"&gt;</code></td><td>HTML</td><td>Obligatorio · garantiza la correcta codificación de los caracteres en el documento</td></tr>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables tipográficas (<code>--font-primary</code>, etc.)</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo (incluye el reset que aplica las fuentes a los tags)</td><td>Recomendado</td></tr>
                <tr><td>Fuentes (woff2)</td><td>Assets · cargadas por <code>@font-face</code> en setting.css</td><td>Siempre</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Tabla de auditoría · cómo usarla</h2>
        <p>La galería <strong>Tabla de auditoría (32-255)</strong> reproduce la matriz canónica del showroom (<code>fourty/base/base-charset.html</code>): 224 codepoints del rango ASCII + Latin-1 extendido con <strong>4 columnas</strong> por codepoint (ASCII · ANSI · 8859 · UTF-8).</p>
        <ul>
            <li>Si las 4 columnas se ven <strong>idénticas y reconocibles</strong>: la fuente activa soporta correctamente el codepoint en todas las codificaciones.</li>
            <li>Si una columna muestra "<strong>□</strong>" (tofu) o "<strong>?</strong>": ese codepoint cae a un glifo de reemplazo — la fuente no lo tiene.</li>
            <li>Si los 4 glifos divergen entre sí: la fuente está aplicando reglas distintas según codificación — posible bug de mapping.</li>
            <li><strong>Brand switch</strong> hace que las 4 columnas se re-rendericen con la fuente de la marca activa. Pasar por las 8 marcas valida el soporte cross-brand.</li>
        </ul>
        <div class="cb-callout">
            <strong>Nota técnica</strong>: en este entorno JS, las 4 columnas resuelven el codepoint contra Unicode (no hay forma fiable de forzar ANSI o ISO-8859 desde HTML sin reescribir la fuente del documento). La redundancia es <em>deliberada</em>: replica la tabla del showroom y permite detectar fallos puntuales de render por celda, no por codificación pura.
        </div>

        <h2>Por qué inspeccionar el charset</h2>
        <ul>
            <li><strong>No todas las fuentes incluyen todos los glifos</strong>: símbolos matemáticos, ligaduras, alfabetos no latinos, monedas raras. Si tu pieza usa caracteres exóticos, valida que la marca activa los renderiza correctamente.</li>
            <li><strong>Hinting y kerning varían por marca</strong>: a tamaños grandes algunos glifos pueden verse desalineados o con espacios extraños. La galería a tamaño grande ayuda a detectarlo.</li>
            <li><strong>Diacríticos (acentos)</strong>: los acentos castellanos (á é í ó ú ü ñ) y catalanes (ç à è ò) son requisito del DS. La sub-familia "Acentos" cubre todos los habituales.</li>
        </ul>

        <h2>Categorías documentadas</h2>
        <table class="cb-table">
            <thead><tr><th>Categoría</th><th>Cuenta</th><th>Cuándo importa</th></tr></thead>
            <tbody>
                <tr><td>Alfabeto mayúsculas</td><td>27 (incluye Ñ)</td><td>Titulares en caps, etiquetas</td></tr>
                <tr><td>Alfabeto minúsculas</td><td>27</td><td>Cuerpo de texto · 90% del contenido editorial</td></tr>
                <tr><td>Números</td><td>10</td><td>Datos, fechas, scoreboards</td></tr>
                <tr><td>Puntuación</td><td>~25</td><td>Comillas, paréntesis, guiones (em-dash, en-dash)</td></tr>
                <tr><td>Acentos / diacríticos</td><td>~25</td><td>Castellano, catalán, gallego, francés (loanwords)</td></tr>
                <tr><td>Símbolos</td><td>~20</td><td>@, #, copyright/registered/trademark, marcador de pies</td></tr>
                <tr><td>Matemáticos</td><td>~15</td><td>Datos científicos, fórmulas inline</td></tr>
                <tr><td>Moneda</td><td>~10</td><td>Precios, mercados (€, $, £, ¥, etc.)</td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <div class="cb-callout">
            Cada marca define su propia paleta tipográfica en <code>setting.css</code>. El renderizado de estos glifos cambia según la marca activa: una marca con tipografía con serifa los pintará con remates; una con sans-serif los pintará rectos. <strong>Cambia el control Brand del toolbar</strong> y los glifos se re-renderizan con la fuente correspondiente.
        </div>

        <h2>Recomendaciones</h2>
        <ul>
            <li>Validar antes de usar caracteres poco habituales (matemáticos raros, monedas exóticas, ligaduras).</li>
            <li>Si un glifo no se renderiza correctamente en una marca, no improvisar — coordinar con el equipo de diseño para añadirlo a la fuente o usar una alternativa estándar.</li>
            <li><code>UTF-8</code> es obligatorio en todos los HTML del DS — declarado en <code>&lt;meta charset="UTF-8"&gt;</code> al inicio del <code>&lt;head&gt;</code>.</li>
        </ul>

        <p class="cb-src">Fuente: glifos del DS · showroom: <code>fourty/base/base-charset.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const CHARSET = {
        id: "charset",
        name: "Charset",
        group: "Setup",
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true,
              argTypes: baseArgTypes, args: baseArgs, render: liveBase }
        ],
        subgroups: [
            {
                id: "galleries", name: "Galleries", collapsed: true,
                stories: [
                    // Auditoría completa primero: es el caso de uso principal (validar
                    // que la fuente activa renderiza todos los glifos).
                    { id: "audit", name: "Tabla de auditoría (32-255)", kind: "gallery", full: true, render: galleryAudit }
                ].concat(
                    DATA.categories.map(([key, label]) => ({
                        id: key, name: label, kind: "gallery", full: true, render: galleryFor(key, label)
                    }))
                ).concat([
                    { id: "pangram", name: "Pangrama (texto real)", kind: "gallery", full: true, render: galleryPangram }
                ])
            }
        ]
    };
    window.SB.register(CHARSET);
    window.SB.loadMarkup(CHARSET, document.currentScript && document.currentScript.src, { full: true });
})();
