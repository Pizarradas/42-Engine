/* ════════════════════════════════════════════════════════════════════════
   helpers/fontsize/fontsize.js — Helpers / Font Size
   Casuística REAL de scss/base/helpers/_fonts.scss (sub-bloque &Size).
   Aplica un tamaño tipográfico canónico al elemento. Composable con FontWeight,
   FontColor y FontType.

   Estructura:
     · Base (interactive)         → selector único con TODAS las escalas
     · Galleries (collapsed)      → Display · Heading · Body (regular + small) · Fluid
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SSOT — 1:1 con _fonts.scss (sub-bloque &Size) ▼ */
    const DATA = {
        displays: ["display-L", "display-M", "display-S"],
        headings: ["heading-XXL", "heading-XL", "heading-L", "heading-M", "heading-S", "heading-XS", "heading-XXS"],
        bodies:   ["body-XL", "body-L", "body-M", "body-S", "body-XS"],
        // Cada tamaño body tiene su contrapartida `--small` (line-height más ajustado).
        bodiesSmall: ["body-XL--small", "body-L--small", "body-M--small", "body-S--small", "body-XS--small"],
        // Capa progresiva de fluid (clamp); no sustituye los tokens legacy.
        fluidHeadings: ["fluid-heading-M", "fluid-heading-S", "fluid-heading-XS", "fluid-heading-XXS"],
        fluidBodies:   ["fluid-body-L", "fluid-body-M", "fluid-body-S"]
    };
    const ALL_SIZES = []
        .concat(DATA.displays, DATA.headings, DATA.bodies, DATA.bodiesSmall, DATA.fluidHeadings, DATA.fluidBodies);

    /* ─── Viz helpers (inline styles, ni .cb-* ni .ft-*) ─── */
    const SAMPLE = "Texto de muestra · The quick brown fox · 1234567890";
    const ROW = (cls, sample) =>
        `<div style="padding:10px 12px;border-bottom:1px solid #eee;display:flex;flex-direction:column;gap:6px;">
            <code style="font:500 10.5px/1.2 monospace;color:#0f62fe;">.ft-helper-fontSize-${esc(cls)}</code>
            <div class="ft-helper-fontSize-${esc(cls)}">${esc(sample)}</div>
        </div>`;
    const SECTION = (title, subtitle, rows) =>
        `<section style="margin-bottom:24px;border:1px solid #ddd;border-radius:3px;overflow:hidden;background:#fff;">
            <header style="padding:10px 12px;background:#f5f5f5;border-bottom:1px solid #ddd;">
                <h3 style="margin:0;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">${esc(title)}</h3>
                ${subtitle ? '<p style="margin:4px 0 0;font:400 11.5px/1.4 \'Inter\',sans-serif;color:#666;">' + esc(subtitle) + '</p>' : ''}
            </header>
            <div>${rows}</div>
        </section>`;

    /* ─── BASE — selector único con todas las escalas ─── */
    const baseArgTypes = [
        {
            key: "size", control: "select",
            desc: "Tamaño tipográfico (.ft-helper-fontSize-[escala]).",
            options: [
                ["display-L", "display · L"], ["display-M", "display · M"], ["display-S", "display · S"],
                ["heading-XXL", "heading · XXL"], ["heading-XL", "heading · XL"], ["heading-L", "heading · L"],
                ["heading-M", "heading · M"], ["heading-S", "heading · S"], ["heading-XS", "heading · XS"], ["heading-XXS", "heading · XXS"],
                ["body-XL", "body · XL"], ["body-L", "body · L"], ["body-M", "body · M"], ["body-S", "body · S"], ["body-XS", "body · XS"],
                ["body-XL--small", "body · XL (small)"], ["body-L--small", "body · L (small)"], ["body-M--small", "body · M (small)"], ["body-S--small", "body · S (small)"], ["body-XS--small", "body · XS (small)"],
                ["fluid-heading-M", "fluid · heading M"], ["fluid-heading-S", "fluid · heading S"], ["fluid-heading-XS", "fluid · heading XS"], ["fluid-heading-XXS", "fluid · heading XXS"],
                ["fluid-body-L", "fluid · body L"], ["fluid-body-M", "fluid · body M"], ["fluid-body-S", "fluid · body S"]
            ]
        },
        { key: "text", control: "text", desc: "Texto de muestra (slot)." }
    ];
    const baseArgs = { size: "heading-L", text: SAMPLE };
    const liveBase = (a) => {
        const cls = "ft-helper-fontSize-" + a.size;
        return `<div style="padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:10px;">.${esc(cls)}</code>
            <div class="${esc(cls)}">${esc(a.text)}</div>
        </div>`;
    };

    /* ─── Galerías ─── */
    const galleryDisplay = () =>
        SECTION("Display", "Titulares hero a pantalla completa (5–7rem desktop). Pieza más grande del DS.",
            DATA.displays.map(s => ROW(s, "Titular display")).join(""));
    const galleryHeading = () =>
        SECTION("Heading", "Escala de titulares editorial. XXL→XXS, decrece monotónicamente.",
            DATA.headings.map(s => ROW(s, "Titular heading")).join(""));
    const galleryBody = () => {
        const reg = SECTION("Body regular", "Texto corrido. XL→XS, decrece monotónicamente. Default del DS = body-M.",
            DATA.bodies.map(s => ROW(s, SAMPLE)).join(""));
        const sm = SECTION("Body — variante --small", "Misma escala con line-height más ajustado para bloques densos (listas, captions).",
            DATA.bodiesSmall.map(s => ROW(s, SAMPLE)).join(""));
        return reg + sm;
    };
    const galleryFluid = () => {
        const heads = SECTION("Fluid · heading", "Capa progresiva con clamp() — escala con el viewport sin breakpoints fijos. No sustituye los legacy.",
            DATA.fluidHeadings.map(s => ROW(s, "Titular fluid")).join(""));
        const bodies = SECTION("Fluid · body", "Variante fluid del cuerpo.",
            DATA.fluidBodies.map(s => ROW(s, SAMPLE)).join(""));
        return heads + bodies;
    };

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Font Size</h1>
        <p class="cb-docs__lead">Familia <code>.ft-helper-fontSize-*</code> del 42DS. Aplica un tamaño tipográfico canónico (display / heading / body) sin tener que escribir <code>font-size</code> ni <code>line-height</code> ad-hoc.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables y stack tipográfico de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo (incluye los helpers)</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_fonts.scss</code></td><td>Parcial SCSS fuente (mixin <code>ft-helper-fonts</code>)</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Escalas disponibles</h2>
        <table class="cb-table">
            <thead><tr><th>Familia</th><th>Patrón</th><th>Casos típicos</th></tr></thead>
            <tbody>
                <tr><td>Display</td><td><code>-fontSize-display-{L,M,S}</code></td><td>Hero · portadas destacadas · secciones cinematic</td></tr>
                <tr><td>Heading</td><td><code>-fontSize-heading-{XXL,XL,L,M,S,XS,XXS}</code></td><td>Titulares editoriales (h1–h6)</td></tr>
                <tr><td>Body</td><td><code>-fontSize-body-{XL,L,M,S,XS}</code></td><td>Texto corrido, párrafos</td></tr>
                <tr><td>Body small</td><td><code>-fontSize-body-{XL,L,M,S,XS}--small</code></td><td>Texto denso · captions · listas · UI compacta</td></tr>
                <tr><td>Fluid heading</td><td><code>-fontSize-fluid-heading-{M,S,XS,XXS}</code></td><td>Titulares que escalan con clamp() sin breakpoints</td></tr>
                <tr><td>Fluid body</td><td><code>-fontSize-fluid-body-{L,M,S}</code></td><td>Cuerpo fluido (lectura editorial larga)</td></tr>
            </tbody>
        </table>

        <h2>Composición</h2>
        <table class="cb-table">
            <thead><tr><th>Combina con</th><th>Resultado</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-helper-fontWeight-*</code></td><td>Cambiar peso sin afectar tamaño</td></tr>
                <tr><td><code>.ft-helper-fontColor-*</code></td><td>Aplicar color de marca / neutro</td></tr>
                <tr><td><code>.ft-helper-fontType--{italic,balance,underline,uppercase}</code></td><td>Estilo o forma del texto</td></tr>
            </tbody>
        </table>

        <h2>Notas por marca</h2>
        <table class="cb-table">
            <thead><tr><th>Marca</th><th>Diferencia</th></tr></thead>
            <tbody>
                <tr><td><code>revistas</code></td><td>Todos los heading/display aplican <code>font-weight-500</code> automáticamente — patrón editorial de revistas frente a noticia</td></tr>
                <tr><td><code>viajar</code></td><td>Sobre <code>display-L</code> añade una barrita primaria como pseudo-elemento decorativo</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Prefijo</td><td><code>.ft-helper-fontSize-</code></td></tr>
                <tr><td>Familia</td><td><code>display</code> · <code>heading</code> · <code>body</code> · <code>fluid-heading</code> · <code>fluid-body</code></td></tr>
                <tr><td>Tamaño</td><td><code>L,M,S</code> (display) · <code>XXL..XXS</code> (heading) · <code>XL..XS</code> (body)</td></tr>
                <tr><td>Variante</td><td><code>--small</code> (solo body — line-height ajustado)</td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_fonts.scss</code> · showroom: <code>fourty/helpers/helper-fontsize.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const FONTSIZE = {
        id: "fontsize",
        name: "Font Size",
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
                    { id: "display", name: "Display", kind: "gallery", full: true, render: galleryDisplay },
                    { id: "heading", name: "Heading", kind: "gallery", full: true, render: galleryHeading },
                    { id: "body",    name: "Body",    kind: "gallery", full: true, render: galleryBody },
                    { id: "fluid",   name: "Fluid",   kind: "gallery", full: true, render: galleryFluid }
                ]
            }
        ]
    };
    window.SB.register(FONTSIZE);
    window.SB.loadMarkup(FONTSIZE, document.currentScript && document.currentScript.src, { full: true });
})();
