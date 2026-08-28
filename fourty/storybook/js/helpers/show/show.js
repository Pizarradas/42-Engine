/* ════════════════════════════════════════════════════════════════════════
   helpers/show/show.js — Helpers / Show
   Casuística REAL de scss/base/helpers/_shows.scss (.ft-helper-show*).
   Inverso de Hides + utilidades de display básicas:
     · Display utilities  → show-block, show-flex (+ align/justify), show-inline-block
     · Responsive (visible solo en rango)  → show-mo (<768px), show-sm/md/lg/xlg
       (visible desde un umbral)

   Estructura:
     · Base (interactive)   → familia (display | responsive) + variante
     · Galleries (collapsed)→ display utilities · responsive
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SSOT — 1:1 con _shows.scss ▼ */
    const DATA = {
        // Display utilities (sin breakpoint — siempre activas)
        display: [
            ["show-block",             "block · display: block"],
            ["show-flex",              "flex · display: flex"],
            ["show-flex-top",          "flex-top · align-items: flex-start"],
            ["show-flex-middle",       "flex-middle · align-items: center"],
            ["show-flex-bottom",       "flex-bottom · align-items: flex-end"],
            ["show-flex-left",         "flex-left · justify-content: flex-start"],
            ["show-flex-center",       "flex-center · justify-content: center"],
            ["show-flex-right",        "flex-right · justify-content: flex-end"],
            ["show-flex-spacebetween", "flex-spacebetween · justify-content: space-between"],
            ["show-flex-spacearound",  "flex-spacearound · justify-content: space-around"],
            ["show-inline-block",      "inline-block · display: inline-block"],
            ["show-inline-top",        "inline-top · vertical-align: top"],
            ["show-inline-middle",     "inline-middle · vertical-align: middle"],
            ["show-inline-bottom",     "inline-bottom · vertical-align: bottom"]
        ],
        // Responsive (visible solo en rango)
        responsive: [
            ["show-mo",  "<768px",   "mobile only"],
            ["show-sm",  "≥768px",   "tablet up"],
            ["show-md",  "≥1002px",  "desktop up"],
            ["show-lg",  "≥1280px",  "desktop wide up"],
            ["show-xlg", "≥1440px",  "ultra-wide up"]
        ]
    };

    /* ─── Viz helpers ─── */
    const TARGET_INLINE = (cls, label) =>
        `<span class="ft-helper-${esc(cls)}" style="background:#0050b3;color:#fff;padding:6px 10px;border-radius:3px;font:600 11px/1.2 sans-serif;">${esc(label)}</span>`;

    const TARGET_FLEX = (cls) => {
        // Para las clases flex añadimos hijos para que el efecto sea visible
        const pills = ["A", "B", "C"].map(t => `<span style="background:#0050b3;color:#fff;padding:8px 12px;border-radius:3px;font:600 11px/1.2 sans-serif;">${t}</span>`).join("");
        return `<div class="ft-helper-${esc(cls)}" style="gap:8px;background:#fff;border:1px solid #ddd;border-radius:3px;padding:10px;min-height:60px;">${pills}</div>`;
    };

    const RENDER_DISPLAY = (cls) => {
        const isFlex = cls.indexOf("flex") === 0 || cls.indexOf("show-flex") === 0;
        return isFlex
            ? TARGET_FLEX(cls)
            : `<div style="background:#fff;border:1px solid #ddd;border-radius:3px;padding:10px;">${TARGET_INLINE(cls, "target con la clase")}</div>`;
    };

    const RENDER_RESPONSIVE = (cls) =>
        `<div style="background:#fff;border:1px dashed #999;border-radius:3px;padding:12px;">
            <span class="ft-helper-${esc(cls)}" style="background:#0050b3;color:#fff;padding:8px 12px;border-radius:3px;font:600 11px/1.2 sans-serif;">Solo visible en su rango</span>
        </div>`;

    /* ─── BASE — selector ─── */
    const baseArgTypes = [
        { key: "family", control: "radio",
          desc: "Familia (display utility o responsive).",
          options: [["display", "display utility"], ["responsive", "responsive (rango)"]] },
        { key: "display", control: "select",
          desc: "Variante display.",
          options: DATA.display },
        { key: "responsive", control: "select",
          desc: "Variante responsive.",
          options: DATA.responsive.map(([cls, range, label]) => [cls, cls + " · visible " + range + " · " + label]) }
    ];
    const baseArgs = { family: "display", display: "show-flex-middle", responsive: "show-md" };
    const liveBase = (a) => {
        const isResponsive = a.family === "responsive";
        const cls = isResponsive ? a.responsive : a.display;
        const frame = isResponsive ? RENDER_RESPONSIVE(cls) : RENDER_DISPLAY(cls);
        const note = isResponsive
            ? '<p style="margin:0 0 12px;font:400 11.5px/1.4 \'Inter\',sans-serif;color:#666;">Usa el control <code>Viewport</code> del toolbar para verificar el rango.</p>'
            : '';
        return `<div style="padding:20px;background:#f5f5f5;border-radius:3px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:6px;">.ft-helper-${esc(cls)}</code>
            ${note}
            ${frame}
        </div>`;
    };

    /* ─── Galería: display utilities ─── */
    const galleryDisplay = () => {
        // Agrupamos por sub-familia (block / flex / inline)
        const sections = [
            ["Block",        DATA.display.filter(([c]) => c === "show-block")],
            ["Flex",         DATA.display.filter(([c]) => c.indexOf("show-flex") === 0)],
            ["Inline-block", DATA.display.filter(([c]) => c.indexOf("show-inline") === 0)]
        ];
        return sections.map(([title, items]) => {
            const rows = items.map(([cls, label]) => `<div style="margin-bottom:14px;">
                <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:4px;">.ft-helper-${esc(cls)}</code>
                <p style="margin:0 0 4px;font:400 11px/1.3 'Inter',sans-serif;color:#666;">${esc(label)}</p>
                ${RENDER_DISPLAY(cls)}
            </div>`).join("");
            return `<section style="margin-bottom:24px;">
                <h3 style="margin:0 0 10px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">${esc(title)}</h3>
                ${rows}
            </section>`;
        }).join("");
    };

    /* ─── Galería: responsive ─── */
    const galleryResponsive = () => {
        const rows = DATA.responsive.map(([cls, range, label]) => {
            return `<section style="margin-bottom:18px;">
                <h3 style="margin:0 0 4px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">.ft-helper-${esc(cls)}</h3>
                <p style="margin:0 0 8px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">Visible cuando: <strong>${esc(range)}</strong> · ${esc(label)}</p>
                ${RENDER_RESPONSIVE(cls)}
            </section>`;
        }).join("");
        return `<p style="margin:0 0 14px;font:400 12px/1.5 'Inter',sans-serif;color:#666;padding:12px;background:#fffbe6;border-left:3px solid #faad14;border-radius:3px;">
            <strong>Cómo verificar</strong>: usa el control <code>Viewport</code> del toolbar. El target solo aparece cuando el viewport entra en el rango indicado.
        </p>
        ${rows}`;
    };

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Show</h1>
        <p class="cb-docs__lead">Familia <code>.ft-helper-show*</code> del 42DS. Inverso de Hides + utilidades de display. Mostrar/permitir un elemento bajo una condición: por display (block/flex/inline-block + sus modificadores) o por rango responsive (mo/sm/md/lg/xlg).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_shows.scss</code></td><td>Parcial SCSS</td><td>Solo para compilar (usa <code>hide-visually</code> de abstracts)</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Display utilities</h2>
        <table class="cb-table">
            <thead><tr><th>Sub-familia</th><th>Clases</th><th>Aplica</th></tr></thead>
            <tbody>
                <tr><td>Block</td><td><code>.ft-helper-show-block</code></td><td><code>display: block</code></td></tr>
                <tr><td>Flex base</td><td><code>.ft-helper-show-flex</code></td><td><code>display: flex</code></td></tr>
                <tr><td>Flex align-items</td><td><code>-flex-top</code> · <code>-flex-middle</code> · <code>-flex-bottom</code></td><td><code>align-items: flex-start | center | flex-end</code></td></tr>
                <tr><td>Flex justify-content</td><td><code>-flex-left</code> · <code>-flex-center</code> · <code>-flex-right</code> · <code>-flex-spacebetween</code> · <code>-flex-spacearound</code></td><td><code>justify-content</code></td></tr>
                <tr><td>Inline base</td><td><code>.ft-helper-show-inline-block</code></td><td><code>display: inline-block</code></td></tr>
                <tr><td>Inline vertical-align</td><td><code>-inline-top</code> · <code>-inline-middle</code> · <code>-inline-bottom</code></td><td><code>vertical-align</code></td></tr>
            </tbody>
        </table>
        <div class="cb-callout">Los modificadores flex de Show (<code>-flex-middle</code>, <code>-flex-center</code>, etc.) son <strong>independientes</strong> del bloque <code>.ft-helper-show-flex</code>: aplican solo <code>align-items</code> o <code>justify-content</code> sin <code>display</code>. Combínalos.</div>

        <h2>Responsive — tabla de breakpoints</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Visible cuando</th><th>Oculto cuando</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-helper-show-mo</code></td><td>&lt;768px</td><td>≥768px</td></tr>
                <tr><td><code>.ft-helper-show-sm</code></td><td>≥768px</td><td>&lt;768px</td></tr>
                <tr><td><code>.ft-helper-show-md</code></td><td>≥1002px</td><td>&lt;1002px</td></tr>
                <tr><td><code>.ft-helper-show-lg</code></td><td>≥1280px</td><td>&lt;1280px</td></tr>
                <tr><td><code>.ft-helper-show-xlg</code></td><td>≥1440px</td><td>&lt;1440px</td></tr>
            </tbody>
        </table>
        <div class="cb-callout">Estas clases parten de <strong>oculto por defecto</strong> (vía <code>hide-visually</code>) y solo se revelan dentro de su rango. Útil para mostrar variantes específicas por viewport sin escribir media queries.</div>

        <h2>Composición</h2>
        <p>Combinar Show responsive con Hides es el patrón clásico para alternar layouts móvil/desktop:</p>
        <pre style="background:#f5f5f5;padding:10px;border-radius:3px;font:500 11.5px/1.4 monospace;overflow:auto;"><code>&lt;!-- Menú móvil (botón hamburguesa) --&gt;
&lt;button class="ft-helper-show-mo"&gt;☰&lt;/button&gt;

&lt;!-- Menú desktop (nav horizontal) --&gt;
&lt;nav class="ft-helper-show-sm"&gt;Inicio · Sección · …&lt;/nav&gt;</code></pre>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Prefijo</td><td><code>.ft-helper-show-</code></td></tr>
                <tr><td>Display</td><td><code>block</code> · <code>flex</code>[<code>-*</code>] · <code>inline</code>[<code>-*</code>]</td></tr>
                <tr><td>Responsive</td><td><code>mo</code> · <code>sm</code> · <code>md</code> · <code>lg</code> · <code>xlg</code></td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_shows.scss</code> · showroom: <code>fourty/helpers/helper-show.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const SHOW = {
        id: "show",
        name: "Show",
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
                    { id: "display",    name: "Display utilities", kind: "gallery", full: true, render: galleryDisplay },
                    { id: "responsive", name: "Responsive",        kind: "gallery", full: true, render: galleryResponsive }
                ]
            }
        ]
    };
    window.SB.register(SHOW);
    window.SB.loadMarkup(SHOW, document.currentScript && document.currentScript.src, { full: true });
})();
