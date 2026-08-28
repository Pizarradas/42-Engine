/* ════════════════════════════════════════════════════════════════════════
   helpers/divider/divider.js — Helpers / Divider
   Casuística REAL de scss/base/helpers/_dividers.scss (.ft-helper-divider*).
   Tres sub-familias:
     · divider-spacer       → escala de padding vertical (xxs..xlg) con
                              variantes `__hideDesktop`/`__hideMobile`
     · divider-line         → línea horizontal (:before) con grosores
                              (--thin/--thick/--dot/--dash/--skew) y colores
                              (--black/--primary/--white/--darkGrey/--mediumGrey/--lightGrey)
                              + modificador --50 (max-width 50%)
     · divider-img          → wrappers de imagen integrada con posicionamiento
                              (--md, --align-r/c, --pos-absolute/t/r/b/l/c)

   Y dos modificadores del bloque:
     · --radius-tr-bl       → border-radius 0 6rem
     · --white              → filter invert + brightness

   Estructura:
     · Base (interactive)   → divider-line con grosor + color
     · Galleries (collapsed)→ Spacers · Lines (grosores y colores) · Imgs · Modificadores
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SSOT — 1:1 con _dividers.scss ▼ */
    const DATA = {
        // Padding verticals (mismo set que spacers)
        spacerSizes: ["xxs", "xs", "sm", "md", "lg", "xlg"],
        // Sub-modificadores de visibilidad sobre el spacer
        spacerHide:  ["", "__hideDesktop", "__hideMobile"],
        // Grosores/estilos de línea
        lineStyles: [
            ["",         "(base) sin modificador → no dibuja la línea"],
            ["--thin",   "--thin · 1px solid"],
            ["--thick",  "--thick · 5px solid"],
            ["--dot",    "--dot · 2px dotted"],
            ["--dash",   "--dash · 1px dashed"],
            ["--skew",   "--skew · SVG decorativo (asset externo)"]
        ],
        lineColors: [
            ["",                "(default) currentColor"],
            ["--black",         "--black · var(--color-black)"],
            ["--primary",       "--primary · var(--color-primary)"],
            ["--white",         "--white · var(--color-white)"],
            ["--darkGrey",      "--darkGrey · var(--color-darkGrey)"],
            ["--mediumGrey",    "--mediumGrey · var(--color-mediumGrey)"],
            ["--lightGrey",     "--lightGrey · var(--color-lightGrey)"]
        ],
        // Img wrappers
        imgPos: ["absolute", "t", "r", "b", "l", "c"]
    };

    /* ─── Viz helpers ─── */
    const SPACER_DEMO = (mod) => {
        const cls = "ft-helper-divider-spacer-" + mod;
        return `<div style="background:repeating-linear-gradient(45deg,rgba(0,0,0,.04) 0 6px,transparent 6px 12px);border:1px dashed #999;border-radius:3px;">
            <div class="${esc(cls)}" style="background:#fff;border-top:1px solid #ddd;border-bottom:1px solid #ddd;">
                <div style="background:#0050b3;color:#fff;padding:6px 10px;font:600 11px/1.2 monospace;display:inline-block;">target con .${cls}</div>
            </div>
        </div>`;
    };

    // BEM: el SCSS expone .ft-helper-divider-line como bloque y --thin/--primary/etc.
    // como modificadores SEPARADOS (cada uno es una clase completa block+modifier).
    // join("") concatenaba a una mega-clase inexistente → línea invisible. Aquí
    // componemos clases reales separadas por espacio. Sin un modificador de grosor
    // (--thin/--thick/--dot/--dash/--skew) el :before tiene border-width: 0 →
    // tampoco se ve.
    function buildLineClasses(style, color, half) {
        const block = "ft-helper-divider-line";
        const out = [block];
        if (style) out.push(block + style);
        if (color) out.push(block + color);
        if (half)  out.push(block + "--50");
        return out.join(" ");
    }
    const LINE_DEMO = (style, color) => {
        const cls = buildLineClasses(style, color, false);
        // Línea se ve con border-color = currentColor → necesitamos un wrapper con color para el currentColor por defecto
        return `<div style="background:#fff;border:1px solid #eee;border-radius:3px;padding:14px;color:#444;">
            <hr class="${esc(cls)}" style="border:0;background:none;margin:0;">
        </div>`;
    };

    /* ─── BASE — divider-line interactiva ─── */
    const baseArgTypes = [
        { key: "style", control: "select",
          desc: "Grosor/estilo de la línea (modificador del bloque divider-line).",
          options: DATA.lineStyles },
        { key: "color", control: "select",
          desc: "Color de la línea (modificador del bloque divider-line).",
          options: DATA.lineColors },
        { key: "half", control: "boolean",
          desc: "Aplica --50 (max-width 50% centrado)." }
    ];
    const baseArgs = { style: "--thin", color: "--primary", half: false };
    const liveBase = (a) => {
        const cls = buildLineClasses(a.style, a.color, a.half);
        // Display: separadas por "." para que se lean como selector CSS encadenado
        // en vez de un string ininteligible.
        const display = cls.replace(/ /g, ".");
        return `<div style="padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:10px;">.${esc(display)}</code>
            <div style="background:#fff;border:1px solid #eee;border-radius:3px;padding:14px;color:#444;">
                <hr class="${esc(cls)}" style="border:0;background:none;margin:0;">
            </div>
        </div>`;
    };

    /* ─── Galería: spacers ─── */
    const gallerySpacers = () => {
        // Sizes principales
        const sizes = DATA.spacerSizes.map(s => `<section style="margin-bottom:14px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:4px;">.ft-helper-divider-spacer-${s}</code>
            ${SPACER_DEMO(s)}
        </section>`).join("");
        // Una muestra de hideDesktop/hideMobile
        const hides = ["sm__hideDesktop", "sm__hideMobile"].map(mod => `<section style="margin-bottom:14px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:4px;">.ft-helper-divider-spacer-${mod}</code>
            <p style="margin:0 0 4px;font:400 11px/1.3 'Inter',sans-serif;color:#666;">Cambia Viewport para ver el efecto.</p>
            ${SPACER_DEMO(mod)}
        </section>`).join("");
        return `<section style="margin-bottom:24px;">
            <h3 style="margin:0 0 10px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Escala de spacers (padding vertical)</h3>
            <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">Mismos saltos que <code>.ft-helper-spacer-y-*</code>, pero en sub-namespace de divider para usos editoriales.</p>
            ${sizes}
        </section>
        <section>
            <h3 style="margin:0 0 10px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Sub-modificadores de visibilidad</h3>
            <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">Anulan el padding en desktop (<code>__hideDesktop</code>) o en mobile (<code>__hideMobile</code>) para que el spacer solo opere en un breakpoint.</p>
            ${hides}
        </section>`;
    };

    /* ─── Galería: líneas ─── */
    const galleryLines = () => {
        const styles = DATA.lineStyles.filter(([s]) => s).map(([s, label]) => {
            const cls = buildLineClasses(s, "", false);
            return `<div style="margin-bottom:14px;">
                <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:4px;">.${esc(cls.replace(/ /g, "."))}</code>
                <p style="margin:0 0 4px;font:400 11px/1.3 'Inter',sans-serif;color:#666;">${esc(label)}</p>
                ${LINE_DEMO(s, "")}
            </div>`;
        }).join("");
        const colors = DATA.lineColors.filter(([c]) => c).map(([c, label]) => {
            const cls = buildLineClasses("--thin", c, false);
            return `<div style="margin-bottom:14px;">
                <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:4px;">.${esc(cls.replace(/ /g, "."))}</code>
                <p style="margin:0 0 4px;font:400 11px/1.3 'Inter',sans-serif;color:#666;">${esc(label)}</p>
                ${LINE_DEMO("--thin", c)}
            </div>`;
        }).join("");
        // Half: thick + primary + --50, todos como modificadores BEM separados.
        const halfCls = buildLineClasses("--thick", "--primary", true);
        const half = `<div style="margin-bottom:14px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:4px;">.${esc(halfCls.replace(/ /g, "."))}</code>
            <p style="margin:0 0 4px;font:400 11px/1.3 'Inter',sans-serif;color:#666;">El modificador --50 limita el ancho de la línea al 50% del contenedor centrada.</p>
            <div style="background:#fff;border:1px solid #eee;border-radius:3px;padding:14px;color:#444;">
                <hr class="${esc(halfCls)}" style="border:0;background:none;margin:0;">
            </div>
        </div>`;
        return `<section style="margin-bottom:24px;">
            <h3 style="margin:0 0 10px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Grosores / estilos</h3>
            ${styles}
        </section>
        <section style="margin-bottom:24px;">
            <h3 style="margin:0 0 10px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Colores</h3>
            ${colors}
        </section>
        <section>
            <h3 style="margin:0 0 10px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Ancho parcial (--50)</h3>
            ${half}
        </section>`;
    };

    /* ─── Galería: imgs ─── */
    const galleryImgs = () => {
        return `<section>
            <h3 style="margin:0 0 6px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Divider · img wrappers</h3>
            <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">
                Sub-familia para integrar una <code>.ft-img</code> con alineación y posicionamiento. Las clases se aplican al wrapper exterior; la imagen vive dentro como descendiente <code>.ft-img</code>.
            </p>
            <table class="cb-table">
                <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
                <tbody>
                    <tr><td><code>.ft-helper-divider-img--md</code></td><td>Constraint <code>max-width: 40rem</code> en el <code>.ft-img</code> interno</td></tr>
                    <tr><td><code>.ft-helper-divider-img--align-r</code> · <code>--align-c</code></td><td><code>display: flex</code> + <code>justify-content: flex-end | center</code></td></tr>
                    <tr><td><code>.ft-helper-divider-img--pos-absolute</code></td><td>Wrapper <code>relative</code> + <code>.ft-img</code> hijo <code>absolute</code></td></tr>
                    <tr><td><code>.ft-helper-divider-img--pos-{t,r,b,l,c}</code></td><td>Ofreset del <code>.ft-img</code>: top/right/bottom/left/centered con <code>margin auto</code> vertical</td></tr>
                </tbody>
            </table>
            <p style="margin:14px 0 0;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">
                Por tener dependencia del átomo <code>.ft-img</code> y de assets concretos, los ejemplos vivos están en el subgrupo <strong>Markup</strong> (catálogo HTML editable).
            </p>
        </section>`;
    };

    /* ─── Galería: modificadores del bloque ─── */
    const galleryBlockMods = () => {
        return `<section>
            <h3 style="margin:0 0 10px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Modificadores del bloque</h3>
            <table class="cb-table">
                <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
                <tbody>
                    <tr><td><code>.ft-helper-divider--radius-tr-bl</code></td><td><code>border-radius: 0 6rem</code> · esquinas TR + BL redondeadas</td></tr>
                    <tr><td><code>.ft-helper-divider--white</code></td><td><code>filter: invert(100%) brightness(200%)</code> · invierte el contenido (útil sobre fondos oscuros)</td></tr>
                </tbody>
            </table>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px;">
                <div>
                    <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:4px;">.ft-helper-divider--radius-tr-bl</code>
                    <div class="ft-helper-divider--radius-tr-bl" style="background:#0050b3;color:#fff;padding:14px;">contenido</div>
                </div>
                <div>
                    <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:4px;">.ft-helper-divider--white</code>
                    <div class="ft-helper-divider--white" style="background:#000;color:#fff;padding:14px;">contenido inverso</div>
                </div>
            </div>
        </section>`;
    };

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Divider</h1>
        <p class="cb-docs__lead">Familia <code>.ft-helper-divider*</code> del 42DS. Tres sub-familias: spacers verticales (escala xxs..xlg con visibilidad responsive), líneas decorativas (grosores y colores) e imgs integradas. Más 2 modificadores del bloque (<code>--radius-tr-bl</code>, <code>--white</code>).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables y paleta</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_dividers.scss</code></td><td>Parcial SCSS</td><td>Solo para compilar</td></tr>
                <tr><td>SVG <code>ft-helper-divider-line-skew.svg</code></td><td>Asset</td><td>Solo si usas <code>--skew</code></td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Sub-familias</h2>
        <table class="cb-table">
            <thead><tr><th>Sub-familia</th><th>Patrón</th><th>Para qué</th></tr></thead>
            <tbody>
                <tr><td>Spacer</td><td><code>-spacer-{xxs..xlg}</code> + <code>__hideDesktop</code> / <code>__hideMobile</code></td><td>Separar bloques editoriales con escala de padding vertical</td></tr>
                <tr><td>Line</td><td><code>-line</code> + grosores (<code>--thin/--thick/--dot/--dash/--skew</code>) + colores (<code>--black/--primary/--white/--darkGrey/--mediumGrey/--lightGrey</code>) + <code>--50</code></td><td>Línea divisoria entre secciones</td></tr>
                <tr><td>Img</td><td><code>-img--md / --align-{r,c} / --pos-{absolute,t,r,b,l,c}</code></td><td>Imagen decorativa integrada en sección</td></tr>
            </tbody>
        </table>

        <h2>Modificadores del bloque</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>--radius-tr-bl</code></td><td><code>border-radius: 0 6rem</code> · esquinas opuestas redondeadas (TR y BL)</td></tr>
                <tr><td><code>--white</code></td><td><code>filter: invert(100%) brightness(200%)</code> · útil sobre fondos oscuros</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Prefijo</td><td><code>.ft-helper-divider</code></td></tr>
                <tr><td>Sub-familia</td><td><code>-spacer</code> · <code>-line</code> · <code>-img</code></td></tr>
                <tr><td>Modificador raíz</td><td><code>--radius-tr-bl</code> · <code>--white</code></td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_dividers.scss</code> · showroom: <code>fourty/helpers/helper-divider.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const DIVIDER = {
        id: "divider",
        name: "Divider",
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
                    { id: "spacers",   name: "Spacers",                kind: "gallery", full: true, render: gallerySpacers },
                    { id: "lines",     name: "Lines (grosores+colores)", kind: "gallery", full: true, render: galleryLines },
                    { id: "imgs",      name: "Img wrappers",            kind: "gallery", full: true, render: galleryImgs },
                    { id: "blockmods", name: "Modificadores del bloque", kind: "gallery", full: true, render: galleryBlockMods }
                ]
            }
        ]
    };
    window.SB.register(DIVIDER);
    window.SB.loadMarkup(DIVIDER, document.currentScript && document.currentScript.src, { full: true });
})();
