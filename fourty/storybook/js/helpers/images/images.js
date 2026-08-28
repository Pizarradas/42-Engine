/* ════════════════════════════════════════════════════════════════════════
   helpers/images/images.js — Helpers / Images
   Casuística REAL de scss/base/helpers/_images.scss (.ft-helper-img-*).
   Tres sub-familias:
     · -rd          → responsive image (max-width:100% · height:auto · block)
     · -intext      → imagen inline en texto (vertical-align middle · max-height 1lh)
     · -positioned  → absolute + 5 modificadores (--top, --rgt, --bttm, --lft, --cnt)

   Estructura:
     · Base (interactive)  → sub-familia + variante + slot
     · Galleries           → casos de uso comparativos (rd · intext · positioned)
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SSOT — 1:1 con _images.scss ▼ */
    const DATA = {
        positionedMods: [
            ["",        "(default) absolute sin offset"],
            ["--top",   "--top · top: 0"],
            ["--rgt",   "--rgt · right: 0"],
            ["--bttm",  "--bttm · bottom: 0"],
            ["--lft",   "--lft · left: 0"],
            ["--cnt",   "--cnt · margin auto + right:0 + left:0 (centrado horizontal)"]
        ]
    };

    /* ─── Placeholder SVG genérico ─── */
    const SVG = (w, h, color) =>
        `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='${w}' height='${h}' fill='${esc(color || "%2399aabb")}'/></svg>`;

    /* ─── BASE — selector ─── */
    const baseArgTypes = [
        { key: "family", control: "radio",
          desc: "Sub-familia de img helper.",
          options: [["rd", "rd · responsive"], ["intext", "intext · inline"], ["positioned", "positioned · absolute"]] },
        { key: "posMod", control: "select",
          desc: "Modificador de posición (solo para positioned).",
          options: DATA.positionedMods }
    ];
    const baseArgs = { family: "rd", posMod: "--top" };
    const liveBase = (a) => {
        if (a.family === "rd") {
            return `<div style="padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;">
                <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:10px;">.ft-helper-img-rd</code>
                <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">Responsive: max-width 100% · height auto · display block. Se adapta al contenedor sin romper la proporción.</p>
                <div style="border:1px solid #ddd;padding:10px;max-width:400px;">
                    <img src="${SVG(800, 200)}" alt="Placeholder" class="ft-helper-img-rd">
                </div>
            </div>`;
        }
        if (a.family === "intext") {
            return `<div style="padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;">
                <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:10px;">.ft-helper-img-intext</code>
                <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">Inline en texto: vertical-align middle · max-height 1lh (línea de texto) · margin lateral 1ex.</p>
                <p style="margin:0;font:16px/1.6 sans-serif;color:#333;">
                    Mira este icono
                    <img src="${SVG(40, 40, "%230050b3")}" alt="" class="ft-helper-img-intext">
                    que vive dentro del párrafo sin romper la línea base.
                </p>
            </div>`;
        }
        // positioned
        const cls = ["ft-helper-img-positioned", a.posMod].filter(Boolean).join("");
        return `<div style="padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:10px;">.${esc(cls)}</code>
            <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">El wrapper debe ser <code>position: relative</code>. La imagen se ancla a la esquina/lado indicada.</p>
            <div style="position:relative;height:200px;background:#f5f5f5;border:1px solid #ddd;border-radius:3px;">
                <img src="${SVG(80, 80, "%230050b3")}" alt="" class="${esc(cls)}" style="width:80px;height:80px;">
                <p style="margin:0;padding:14px;font:400 13px/1.5 sans-serif;color:#666;">Contenedor relative · img anclada</p>
            </div>
        </div>`;
    };

    /* ─── Galería: posicionadas ─── */
    const galleryPositioned = () => {
        const rows = DATA.positionedMods.map(([mod, label]) => {
            const cls = ["ft-helper-img-positioned", mod].filter(Boolean).join("");
            return `<div style="display:flex;flex-direction:column;gap:4px;">
                <code style="font:500 10.5px/1.2 monospace;color:#0f62fe;">.${cls}</code>
                <p style="margin:0;font:400 11px/1.3 'Inter',sans-serif;color:#666;">${esc(label)}</p>
                <div style="position:relative;height:160px;background:#f5f5f5;border:1px solid #ddd;border-radius:3px;">
                    <img src="${SVG(60, 60, "%230050b3")}" alt="" class="${esc(cls)}" style="width:60px;height:60px;">
                </div>
            </div>`;
        }).join("");
        return `<section>
            <h3 style="margin:0 0 10px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Imagen posicionada absolute</h3>
            <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">Aplica al <code>&lt;img&gt;</code>; el wrapper debe ser <code>position: relative</code> para que el ancla funcione.</p>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px;">${rows}</div>
        </section>`;
    };

    /* ─── Galería: combinaciones útiles ─── */
    const galleryCombos = () => {
        const examples = [
            ["Esquinas con --top + --rgt", "ft-helper-img-positioned--top ft-helper-img-positioned--rgt", "top:0 + right:0 → esquina superior derecha"],
            ["Esquinas con --bttm + --lft", "ft-helper-img-positioned--bttm ft-helper-img-positioned--lft", "bottom:0 + left:0 → esquina inferior izquierda"],
            ["Centrado horizontal con --cnt + --bttm", "ft-helper-img-positioned--cnt ft-helper-img-positioned--bttm", "centrado horizontal anclado abajo"]
        ];
        const rows = examples.map(([title, classes, desc]) => {
            const cls = "ft-helper-img-positioned " + classes;
            return `<div>
                <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:4px;">.${cls.replace(/ /g, ".")}</code>
                <p style="margin:0 0 4px;font:400 11px/1.3 'Inter',sans-serif;color:#666;">${esc(desc)}</p>
                <div style="position:relative;height:140px;background:#f5f5f5;border:1px solid #ddd;border-radius:3px;">
                    <img src="${SVG(50, 50, "%230050b3")}" alt="" class="${esc(cls)}" style="width:50px;height:50px;">
                </div>
            </div>`;
        }).join("");
        return `<section>
            <h3 style="margin:0 0 10px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Combinaciones (esquinas y centrados)</h3>
            <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">Los modificadores son apilables porque cada uno fija una propiedad distinta (top/right/bottom/left).</p>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px;">${rows}</div>
        </section>`;
    };

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Images</h1>
        <p class="cb-docs__lead">Familia <code>.ft-helper-img-*</code> del 42DS. Tres sub-familias: responsive (<code>-rd</code>), inline en texto (<code>-intext</code>) y posicionada absolute (<code>-positioned</code> + modificadores de ancla).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_images.scss</code></td><td>Parcial SCSS</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Sub-familias</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Aplica</th><th>Para qué</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-helper-img-rd</code></td><td><code>max-width: 100%</code> · <code>height: auto</code> · <code>display: block</code></td><td>Imagen responsive estándar</td></tr>
                <tr><td><code>.ft-helper-img-intext</code></td><td><code>vertical-align: middle</code> · <code>max-height: 1lh</code> · <code>margin: 0 1ex</code></td><td>Icono inline en un párrafo sin romper la línea base</td></tr>
                <tr><td><code>.ft-helper-img-positioned</code></td><td><code>position: absolute</code></td><td>Bloque/esquina decorativa que se posiciona sobre un wrapper relative</td></tr>
            </tbody>
        </table>

        <h2>Modificadores de positioned</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Aplica</th></tr></thead>
            <tbody>
                <tr><td><code>--top</code></td><td><code>top: 0</code></td></tr>
                <tr><td><code>--rgt</code></td><td><code>right: 0</code></td></tr>
                <tr><td><code>--bttm</code></td><td><code>bottom: 0</code></td></tr>
                <tr><td><code>--lft</code></td><td><code>left: 0</code></td></tr>
                <tr><td><code>--cnt</code></td><td><code>margin: auto</code> + <code>right: 0</code> + <code>left: 0</code> (centrado horizontal)</td></tr>
            </tbody>
        </table>
        <div class="cb-callout">Los modificadores son <strong>apilables</strong> porque tocan propiedades distintas. <code>--top</code> + <code>--rgt</code> ancla a la esquina superior derecha. <code>--cnt</code> + <code>--bttm</code> centra horizontalmente y ancla abajo.</div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Prefijo</td><td><code>.ft-helper-img-</code></td></tr>
                <tr><td>Sub-familia</td><td><code>rd</code> · <code>intext</code> · <code>positioned</code></td></tr>
                <tr><td>Modificadores positioned</td><td><code>--top</code> · <code>--rgt</code> · <code>--bttm</code> · <code>--lft</code> · <code>--cnt</code></td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_images.scss</code> · showroom: <code>fourty/helpers/helper-images.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const IMAGES = {
        id: "images",
        name: "Images",
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
                    { id: "positioned", name: "Positioned (5 anclas)",     kind: "gallery", full: true, render: galleryPositioned },
                    { id: "combos",     name: "Combinaciones (esquinas)",  kind: "gallery", full: true, render: galleryCombos }
                ]
            }
        ]
    };
    window.SB.register(IMAGES);
    window.SB.loadMarkup(IMAGES, document.currentScript && document.currentScript.src, { full: true });
})();
