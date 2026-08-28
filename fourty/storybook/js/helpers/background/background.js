/* ════════════════════════════════════════════════════════════════════════
   helpers/background/background.js — Helpers / Background
   Casuística REAL de scss/base/helpers/_backgrounds.scss (.ft-helper-bg*).
   Familia más grande de los helpers: brand · neutrales · greys · alerts ·
   gradients · opacity · transparent (responsive) · social · juegos.

   Estructura:
     · Base (interactive)  → selector único + texto (preview con el bg aplicado)
     · Galleries           → Brand · Neutrales+opacidad · Greys+degradados · Alertas
                              · Gradientes (fade) · Social · Juegos · Transparent

   NOTA sobre clases set-brand: las clases del bloque
   `#{functionBrandSet($helper-set-brand)} { ... }` (primary..septenary, alert-*,
   backgroundDarkGrey, degraded1..3) solo resuelven cuando la marca activa
   inyecta el helper-set. En el storybook se ven con su valor real al cambiar
   Brand — si una marca no implementa un token, se ve sin efecto (esperado).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SSOT — 1:1 con _backgrounds.scss ▼ */
    const DATA = {
        // SET BRAND (resuelven contra variables de la marca activa)
        brand:    ["primary", "secondary", "tertiary", "quaternary", "quinary", "senary", "septenary"],
        brandPrimaryOpacity: ["primary-opacity-light", "primary-opacity-medium", "primary-opacity-dark"],
        // Background greys + degradados (set-brand)
        bgGreys: ["background-lightGrey", "background-mediumGrey", "background-darkGrey"],
        degraded: ["background-degraded1", "background-degraded2", "background-degraded3"],
        // Alertas (set-brand)
        alerts: ["alert-success", "alert-info", "alert-warning", "alert-error"],
        // Neutrales (siempre disponibles)
        neutralsBase: ["black", "white"],
        neutralOpacities: ["black-opacity-light", "black-opacity-medium", "black-opacity-dark",
                           "white-opacity-light", "white-opacity-medium", "white-opacity-dark"],
        // Opacity overlays (rgba hardcoded — sin set-brand)
        opacityOverlays: [
            ["bgOpacityBlack-500", "rgba(0,0,0,0.5)"],
            ["bgOpacityWhite-500", "rgba(255,255,255,0.9)"]
        ],
        // Gradientes lineales (fade)
        gradientDirs: ["top", "right", "bottom", "left"],
        // Social brands (cada color en su prefijo bgBlue/Red/Green/Yellow)
        social: [
            ["bgBlueFb-500",         "Facebook"],
            ["bgBlueInstagram-500",  "Instagram"],
            ["bgBlueTwitter-500",    "Twitter"],
            ["bgBlueLinkedin-500",   "LinkedIn"],
            ["bgRedPinterest-500",   "Pinterest"],
            ["bgRedYoutube-500",     "YouTube"],
            ["bgGreenWhatsapp-500",  "WhatsApp"],
            ["bgYellowSnapchat-500", "Snapchat"]
        ],
        // Juegos (cada juego tiene base + variante -500; algunos extra como -deg)
        games: [
            ["bgBlue-cuadronumerico",     "Cuadro numérico"],
            ["bgBlue-cuadronumerico-500", "Cuadro numérico · 500"],
            ["bgRed-wordle",              "Wordle"],
            ["bgRed-wordle-500",          "Wordle · 500"],
            ["bgRed-porra",               "Porra"],
            ["bgGreen-sudoku",            "Sudoku"],
            ["bgGreen-sudoku-500",        "Sudoku · 500"],
            ["bgGreen-cuatroencampo",     "Cuatro en campo"],
            ["bgGreen-cuatroencampo-500", "Cuatro en campo · 500"],
            ["bgGreen-cuatroencampo-deg", "Cuatro en campo · degradado"],
            ["bgYellow-crucigrama",       "Crucigrama"],
            ["bgYellow-crucigrama-500",   "Crucigrama · 500"],
            ["bgPink-pangramax",          "Pangramax"],
            ["bgPink-pangramax-500",      "Pangramax · 500"],
            ["bgPink-saltaminas",         "Saltaminas"],
            ["bgPink-saltaminas-500",     "Saltaminas · 500"],
            ["bgBrown-sopa",              "Sopa de letras"],
            ["bgBrown-sopa-500",          "Sopa · 500"],
            ["bgBrown-timequest",         "Timequest"],
            ["bgBrown-timequest-500",     "Timequest · 500"]
        ],
        // Transparent (responsive)
        transparent: [
            ["bgTransparent-mo", "≤767px (mobile only)"],
            ["bgTransparent-sm", "≥768px"],
            ["bgTransparent-md", "≥1024px"],
            ["bgTransparent-lg", "≥1280px"]
        ]
    };

    /* ─── Viz helper ─── */
    // checkerboard que se ve detrás de las clases con transparencia/opacity
    const CHECKER = "background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0px;background-color:#fff;";

    const SWATCH = (cls, label, opts) => {
        opts = opts || {};
        const onChecker = !!opts.checker;
        const small = !!opts.small;
        const isFull = !!opts.full;
        const wrapStyle = onChecker
            ? `${CHECKER}border:1px solid #ddd;border-radius:3px;padding:8px;`
            : "border:1px solid #ddd;border-radius:3px;padding:8px;background:#fff;";
        const inner = isFull
            ? `<div class="ft-helper-${esc(cls)}" style="min-height:${small ? 60 : 90}px;border-radius:2px;display:flex;align-items:center;justify-content:center;padding:12px;font:600 12px/1.2 sans-serif;color:#fff;mix-blend-mode:normal;">${esc(label)}</div>`
            : `<div class="ft-helper-${esc(cls)}" style="min-height:${small ? 60 : 90}px;border-radius:2px;padding:12px;font:600 12px/1.2 sans-serif;">${esc(label)}</div>`;
        return `<div style="display:flex;flex-direction:column;gap:6px;">
            <code style="font:500 10.5px/1.2 monospace;color:#0f62fe;">.ft-helper-${esc(cls)}</code>
            <div style="${wrapStyle}">${inner}</div>
        </div>`;
    };
    const GRID = (items, min) =>
        `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(${min || 220}px,1fr));gap:14px;">${items.join("")}</div>`;
    const SECTION = (title, subtitle, body) =>
        `<section style="margin-bottom:24px;">
            <h3 style="margin:0 0 4px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">${esc(title)}</h3>
            ${subtitle ? '<p style="margin:0 0 10px;font:400 11.5px/1.4 \'Inter\',sans-serif;color:#666;">' + esc(subtitle) + '</p>' : ""}
            ${body}
        </section>`;

    /* ─── BASE — selector único con los tokens más usados ─── */
    const baseTokens = [].concat(
        DATA.brand.map(c => "bgColor-" + c),
        DATA.bgGreys.map(c => "bgColor-" + c),
        DATA.degraded.map(c => "bgColor-" + c),
        DATA.neutralsBase.map(c => "bgColor-" + c),
        DATA.alerts.map(c => "bgColor-" + c)
    );
    const baseArgTypes = [
        { key: "bg", control: "select",
          desc: "Background del DS (.ft-helper-bgColor-[token]). Los brand/alert/grey resuelven contra variables de la marca activa (set-brand).",
          options: baseTokens.map(t => [t, t.replace("bgColor-", "")]) },
        { key: "text", control: "text", desc: "Texto interior del bloque (solo demo)." }
    ];
    const baseArgs = { bg: "bgColor-primary", text: "ft-helper-bgColor-*" };
    const liveBase = (a) => {
        const cls = "ft-helper-" + a.bg;
        return `<div style="padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:10px;">.${esc(cls)}</code>
            <div class="${esc(cls)}" style="min-height:100px;border-radius:3px;padding:16px;font:600 14px/1.3 sans-serif;display:flex;align-items:center;justify-content:center;color:#fff;">${esc(a.text)}</div>
        </div>`;
    };

    /* ─── Galerías ─── */
    const galleryBrand = () => {
        const main = GRID(DATA.brand.map(c => SWATCH("bgColor-" + c, c, { full: true })));
        const opacity = GRID(DATA.brandPrimaryOpacity.map(c => SWATCH("bgColor-" + c, c, { full: true })));
        return SECTION("Brand · primary…septenary", "Resuelven contra variables de la marca activa. Cambia Brand en el toolbar para ver cómo varían.", main) +
               SECTION("Brand · primary con opacity (light/medium/dark)", "Variantes de primary con un ::before semitransparente sobre el fondo.", opacity);
    };

    const galleryNeutralsOpacity = () => {
        const flat = GRID(DATA.neutralsBase.map(c => SWATCH("bgColor-" + c, c, { full: true })));
        const opacity = GRID(DATA.neutralOpacities.map(c => SWATCH("bgColor-" + c, c, { full: true, checker: true })));
        const overlays = GRID(DATA.opacityOverlays.map(([cls, val]) => SWATCH(cls, val, { full: true, checker: true })));
        return SECTION("Neutrales", "Negro y blanco absolutos.", flat) +
               SECTION("Black/White · opacity", "Capa semi-transparente vía pseudo-elemento ::before. Tablero de fondo para visualizarla.", opacity) +
               SECTION("Opacity overlays (rgba hardcoded)", "Distintos a los anteriores: usan rgba(), no opacity sobre ::before. Útil para overlays uniformes.", overlays);
    };

    const galleryGreysAndDegraded = () => {
        const greys = GRID(DATA.bgGreys.map(c => SWATCH("bgColor-" + c, c)));
        const deg = GRID(DATA.degraded.map(c => SWATCH("bgColor-" + c, c, { full: true })));
        return SECTION("Background greys", "Fondos suaves brand-aware para secciones, separadores, listas.", greys) +
               SECTION("Degradados", "Gradients de marca (degraded1..3). El SCSS aplica también color blanco para garantizar contraste sobre el degradado.", deg);
    };

    const galleryAlerts = () =>
        SECTION("Funcionales", "Color semántico para feedback (éxito/info/aviso/error). Resuelven contra `--color-functional-*`.",
            GRID(DATA.alerts.map(c => SWATCH("bgColor-" + c, c, { full: true }))));

    const galleryGradients = () => {
        const blackRows = GRID(DATA.gradientDirs.map(d => SWATCH("bgGradient-black-" + d, "black-" + d, { full: true, small: false, checker: true })));
        const whiteRows = GRID(DATA.gradientDirs.map(d => SWATCH("bgGradient-white-" + d, "white-" + d, { full: true, small: false, checker: true })));
        return SECTION("Gradient fade · black", "Linear-gradient de negro→transparente en cada dirección. Útil sobre imágenes para garantizar contraste de overlays.", blackRows) +
               SECTION("Gradient fade · white", "Linear-gradient de blanco→transparente.", whiteRows);
    };

    const gallerySocial = () =>
        SECTION("Redes sociales", "Colores oficiales de cada red, agrupados por familia cromática.",
            GRID(DATA.social.map(([cls, label]) => SWATCH(cls, label, { full: true, small: true }))));

    const galleryGames = () =>
        SECTION("Juegos", "Colores de los pasatiempos del DS. Cada juego suele tener una versión base, una intensa (-500) y a veces -deg (gradient).",
            GRID(DATA.games.map(([cls, label]) => SWATCH(cls, label, { full: true, small: true }))));

    const galleryTransparent = () =>
        SECTION("Transparent · responsive",
            "Aplica `background-color: transparent` solo en el rango indicado. Útil para neutralizar un bg fijo en un breakpoint concreto. En el storybook el efecto solo es visible al cambiar el Viewport del toolbar.",
            GRID(DATA.transparent.map(([cls, range]) => `<div style="display:flex;flex-direction:column;gap:6px;">
                <code style="font:500 10.5px/1.2 monospace;color:#0f62fe;">.ft-helper-${cls}</code>
                <div style="background:#0050b3;border:1px solid #ddd;border-radius:3px;padding:8px;">
                    <div class="ft-helper-${cls}" style="min-height:60px;border-radius:2px;padding:12px;font:600 12px/1.2 sans-serif;color:#fff;background:#22c55e;">${esc(range)}</div>
                </div>
            </div>`)));

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Background</h1>
        <p class="cb-docs__lead">Familia <code>.ft-helper-bg*</code> del 42DS. La más extensa de los helpers — cubre brand · neutrales · greys · alertas · gradients · opacity · transparent (responsive) · social · juegos.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · paleta y degradados de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_backgrounds.scss</code></td><td>Parcial SCSS (mixin <code>ft-helper-backgrounds</code>)</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Sub-familias</h2>
        <table class="cb-table">
            <thead><tr><th>Sub-familia</th><th>Patrón</th><th>Origen</th></tr></thead>
            <tbody>
                <tr><td>Brand</td><td><code>-bgColor-{primary..septenary}</code> + <code>-primary-opacity-{light,medium,dark}</code></td><td>set-brand · resuelve contra variables de la marca</td></tr>
                <tr><td>Neutrales</td><td><code>-bgColor-black</code> · <code>-bgColor-white</code></td><td>Global · <code>var(--color-black|white)</code></td></tr>
                <tr><td>Neutral opacity</td><td><code>-bgColor-{black,white}-opacity-{light,medium,dark}</code></td><td>Global · capa semitransparente vía <code>::before</code></td></tr>
                <tr><td>Opacity overlay (rgba)</td><td><code>-bgOpacity{Black,White}-500</code></td><td>Global · <code>rgba()</code> hardcoded</td></tr>
                <tr><td>Background greys</td><td><code>-bgColor-background-{lightGrey,mediumGrey,darkGrey}</code></td><td>set-brand · tokens de superficie de la marca</td></tr>
                <tr><td>Degradados</td><td><code>-bgColor-background-degraded{1,2,3}</code></td><td>set-brand · gradients de marca</td></tr>
                <tr><td>Alertas</td><td><code>-bgColor-alert-{success,info,warning,error}</code></td><td>set-brand · <code>var(--color-functional-*)</code></td></tr>
                <tr><td>Gradient fade</td><td><code>-bgGradient-{black,white}-{top,right,bottom,left}</code></td><td>Global · <code>linear-gradient(rgba→0)</code></td></tr>
                <tr><td>Transparent responsive</td><td><code>-bgTransparent-{mo,sm,md,lg}</code></td><td>Global · <code>background-color: transparent</code> dentro de un breakpoint</td></tr>
                <tr><td>Social</td><td><code>-bg{Blue,Red,Green,Yellow}{Fb,Instagram,Twitter,Linkedin,Pinterest,Youtube,Whatsapp,Snapchat}-500</code></td><td>Global · color oficial de cada red</td></tr>
                <tr><td>Juegos</td><td><code>-bg{Blue,Red,Green,Yellow,Pink,Brown}-{game}[-500][-deg]</code></td><td>Global · paleta de pasatiempos</td></tr>
            </tbody>
        </table>

        <h2>Composición</h2>
        <table class="cb-table">
            <thead><tr><th>Combina con</th><th>Resultado</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-helper-fontColor-*</code></td><td>Las brand brand bg ya fuerzan <code>color: white</code> internamente. Para sobreescribir, usa fontColor.</td></tr>
                <tr><td>Cualquier <code>.ft-helper-fontSize/Weight/Type</code></td><td>Sin conflicto — solo afecta el background.</td></tr>
                <tr><td><code>.ft-helper-spacer-inner-*</code></td><td>Combinación habitual para crear bloques con padding y bg en una línea.</td></tr>
            </tbody>
        </table>
        <div class="cb-callout">
            Las clases del bloque <code>SET BRAND</code> (brand, alertas, background greys, degradados) solo resuelven cuando la marca activa
            inyecta el helper-set. Si una marca no implementa un token, se ve sin efecto en su switch — es esperado.
        </div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Prefijo</td><td><code>.ft-helper-bg</code></td></tr>
                <tr><td>Tipo</td><td><code>Color</code> · <code>Blue/Red/Green/Yellow/Pink/Brown</code> · <code>Opacity</code> · <code>Transparent</code> · <code>Gradient</code></td></tr>
                <tr><td>Token</td><td>varía por sub-familia (ver tabla arriba)</td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_backgrounds.scss</code> · showroom: <code>fourty/helpers/helper-background.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const BACKGROUND = {
        id: "background",
        name: "Background",
        group: "Helpers",
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true,
              argTypes: baseArgTypes, args: baseArgs, render: liveBase }
        ],
        subgroups: [
            {
                id: "galleries", name: "Galleries", collapsed: true,
                stories: [
                    { id: "brand",          name: "Brand",                kind: "gallery", full: true, render: galleryBrand },
                    { id: "neutrals",       name: "Neutrales + opacidad", kind: "gallery", full: true, render: galleryNeutralsOpacity },
                    { id: "greys-degraded", name: "Greys + degradados",   kind: "gallery", full: true, render: galleryGreysAndDegraded },
                    { id: "alerts",         name: "Alertas funcionales",  kind: "gallery", full: true, render: galleryAlerts },
                    { id: "gradients",      name: "Gradient fade",        kind: "gallery", full: true, render: galleryGradients },
                    { id: "transparent",    name: "Transparent (responsive)", kind: "gallery", full: true, render: galleryTransparent },
                    { id: "social",         name: "Redes sociales",       kind: "gallery", full: true, render: gallerySocial },
                    { id: "games",          name: "Juegos",               kind: "gallery", full: true, render: galleryGames }
                ]
            }
        ]
    };
    window.SB.register(BACKGROUND);
    window.SB.loadMarkup(BACKGROUND, document.currentScript && document.currentScript.src, { full: true });
})();
