/* ════════════════════════════════════════════════════════════════════════
   helpers/display/display.js — Helpers / Display
   Casuística REAL de scss/base/helpers/_display.scss (.ft-helper-display*).
   Dos sub-familias:
     · BLOCK (notación doble guion):  .ft-helper-display--block (+ modificadores
       de alineación interna del bloque)
     · FLEX  (notación guion simple): .ft-helper-display-flex (+ múltiples
       modificadores composables de dirección, alineación y distribución)

   Atención: SCSS mezcla notación `--block` y `-flex` (no es un typo, está así
   en el parcial). Se respeta literal.

   Estructura:
     · Base (interactive)  → familia (block/flex) + modificadores específicos
     · Galleries           → catálogo separado para block y flex
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SSOT — 1:1 con _display.scss ▼ */
    const DATA = {
        // BLOCK: clase raíz `.ft-helper-display--block` + 3 modificadores de alineación
        blockAligns: [
            ["",                                        "(default) text-align inicial"],
            ["ft-helper-display--block--left",          "--left · text-align: left"],
            ["ft-helper-display--block--center",        "--center · margin auto + text-align center"],
            ["ft-helper-display--block--right",         "--right · margin-left auto + text-align right"]
        ],
        // FLEX: clase raíz `.ft-helper-display-flex` + modificadores apilables
        flexAxis: [
            ["", "(default) row"],
            ["ft-helper-display-flex--column", "--column · flex-direction: column"]
        ],
        flexAlignItems: [
            ["",                                  "(default)"],
            ["ft-helper-display-flex--top",       "--top · align-items: flex-start"],
            ["ft-helper-display-flex--middle",    "--middle · align-items: center"],
            ["ft-helper-display-flex--baseline",  "--baseline · align-items: baseline"],
            ["ft-helper-display-flex--bottom",    "--bottom · align-items: flex-end"]
        ],
        flexJustify: [
            ["",                                       "(default) flex-start"],
            ["ft-helper-display-flex--start",          "--start · justify-content: flex-start"],
            ["ft-helper-display-flex--center",         "--center · justify-content: center"],
            ["ft-helper-display-flex--end",            "--end · justify-content: flex-end"],
            ["ft-helper-display-flex--spacebetween",   "--spacebetween · space-between"],
            ["ft-helper-display-flex--spacearound",    "--spacearound · space-around"]
        ],
        flexAlignContent: [
            ["",                                            "(default)"],
            ["ft-helper-display-flex--vertical-top",        "--vertical-top · align-content: start"],
            ["ft-helper-display-flex--vertical-middle",     "--vertical-middle · align-content: center"],
            ["ft-helper-display-flex--vertical-bottom",     "--vertical-bottom · align-content: end"]
        ]
    };

    /* ─── Viz helpers ─── */
    const PILL = (label) =>
        `<span style="background:#0050b3;color:#fff;padding:8px 12px;border-radius:3px;font:600 11px/1.2 sans-serif;">${esc(label)}</span>`;

    const BLOCK_FRAME = (mod) => {
        const cls = ["ft-helper-display--block"].concat(mod ? [mod] : []).join(" ");
        const inner = `<span style="background:#0050b3;color:#fff;padding:8px 12px;border-radius:3px;font:600 11px/1.2 sans-serif;display:inline-block;">contenido</span>`;
        return `<div style="background:#f5f5f5;padding:14px;border:1px dashed #999;border-radius:3px;">
            <div class="${esc(cls)}" style="background:#fff;border:1px solid #ddd;border-radius:3px;padding:10px;">${inner}</div>
        </div>`;
    };

    const FLEX_FRAME = (mods, items, minH) => {
        const cls = ["ft-helper-display-flex"].concat(mods.filter(Boolean)).join(" ");
        const pills = (items || ["A", "B", "C"]).map(PILL).join("");
        return `<div style="background:#f5f5f5;padding:14px;border:1px dashed #999;border-radius:3px;">
            <div class="${esc(cls)}" style="background:#fff;border:1px solid #ddd;border-radius:3px;padding:10px;gap:8px;min-height:${minH || 70}px;">${pills}</div>
        </div>`;
    };

    /* ─── BASE — selector de familia + modificadores ─── */
    const baseArgTypes = [
        { key: "family", control: "radio",
          desc: "Sub-familia (block usa `--`, flex usa `-`).",
          options: [["block", "block (--block)"], ["flex", "flex (-flex)"]] },
        { key: "blockAlign", control: "select",
          desc: "Alineación interna (solo block).",
          options: DATA.blockAligns },
        { key: "flexAxis", control: "radio",
          desc: "Eje principal (solo flex).",
          options: DATA.flexAxis },
        { key: "flexAlignItems", control: "select",
          desc: "Cross-axis (align-items, solo flex).",
          options: DATA.flexAlignItems },
        { key: "flexJustify", control: "select",
          desc: "Eje principal (justify-content, solo flex).",
          options: DATA.flexJustify }
    ];
    const baseArgs = { family: "flex", blockAlign: "", flexAxis: "", flexAlignItems: "ft-helper-display-flex--middle", flexJustify: "ft-helper-display-flex--center" };
    const liveBase = (a) => {
        const isBlock = a.family === "block";
        const cls = isBlock
            ? "ft-helper-display--block" + (a.blockAlign ? " " + a.blockAlign : "")
            : ["ft-helper-display-flex", a.flexAxis, a.flexAlignItems, a.flexJustify].filter(Boolean).join(" ");
        const frame = isBlock ? BLOCK_FRAME(a.blockAlign) : FLEX_FRAME([a.flexAxis, a.flexAlignItems, a.flexJustify]);
        return `<div style="padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:10px;">.${esc(cls)}</code>
            ${frame}
        </div>`;
    };

    /* ─── Galería block ─── */
    const galleryBlock = () => {
        const rows = DATA.blockAligns.map(([mod, label]) => {
            const cls = ["ft-helper-display--block"].concat(mod ? [mod] : []).join(" ");
            return `<section style="margin-bottom:16px;">
                <h3 style="margin:0 0 6px;font:600 12.5px/1.2 'Inter',sans-serif;color:#161616;">.${esc(cls)}</h3>
                <p style="margin:0 0 8px;font:400 11px/1.3 'Inter',sans-serif;color:#666;">${esc(label)}</p>
                ${BLOCK_FRAME(mod)}
            </section>`;
        }).join("");
        return rows;
    };

    /* ─── Galería flex ─── */
    const galleryFlex = () => {
        const sections = [
            ["Dirección (flex-direction)",         DATA.flexAxis,        (m) => FLEX_FRAME([m])],
            ["Cross axis (align-items)",            DATA.flexAlignItems, (m) => FLEX_FRAME([m], null, 90)],
            ["Eje principal (justify-content)",     DATA.flexJustify,    (m) => FLEX_FRAME([m])],
            ["Cross axis múltilínea (align-content · necesita flex-wrap externo)", DATA.flexAlignContent, (m) => FLEX_FRAME([m], null, 120)]
        ];
        return sections.map(([title, mods, frame]) => {
            const rows = mods.map(([mod, label]) => {
                const cls = ["ft-helper-display-flex"].concat(mod ? [mod] : []).join(" ");
                return `<div style="margin-bottom:12px;">
                    <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:4px;">.${esc(cls)}</code>
                    <p style="margin:0 0 4px;font:400 11px/1.3 'Inter',sans-serif;color:#666;">${esc(label)}</p>
                    ${frame(mod)}
                </div>`;
            }).join("");
            return `<section style="margin-bottom:24px;">
                <h3 style="margin:0 0 10px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">${esc(title)}</h3>
                ${rows}
            </section>`;
        }).join("");
    };

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Display</h1>
        <p class="cb-docs__lead">Familia <code>.ft-helper-display*</code> del 42DS. Dos sub-familias con notación distinta: <code>--block</code> (doble guion, una clase raíz + 3 modificadores) y <code>-flex</code> (guion simple, una clase raíz + ~13 modificadores composables).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_display.scss</code></td><td>Parcial SCSS</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout"><strong>Discrepancia de nomenclatura</strong> (presente en el SCSS): block usa <code>--block</code> (BEM, modificador del bloque), flex usa <code>-flex</code> (sub-elemento del bloque). Es legacy — se mantiene literal por compatibilidad.</div>

        <h2>BLOCK</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Aplica</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-helper-display--block</code></td><td><code>display: block</code> + <code>width: 100%</code></td></tr>
                <tr><td><code>.ft-helper-display--block--left</code></td><td><code>text-align: left</code></td></tr>
                <tr><td><code>.ft-helper-display--block--center</code></td><td><code>margin: 0 auto</code> + <code>text-align: center</code></td></tr>
                <tr><td><code>.ft-helper-display--block--right</code></td><td><code>margin-left: auto</code> + <code>text-align: right</code></td></tr>
            </tbody>
        </table>

        <h2>FLEX</h2>
        <p>Una clase raíz + modificadores apilables. La raíz aplica <code>padding: 0</code> + <code>display: flex</code>.</p>
        <table class="cb-table">
            <thead><tr><th>Grupo</th><th>Modificadores</th><th>Propiedad</th></tr></thead>
            <tbody>
                <tr><td>Dirección</td><td><code>--column</code></td><td><code>flex-direction: column</code></td></tr>
                <tr><td>Cross axis</td><td><code>--top</code> · <code>--middle</code> · <code>--baseline</code> · <code>--bottom</code></td><td><code>align-items</code></td></tr>
                <tr><td>Main axis</td><td><code>--start</code> · <code>--center</code> · <code>--end</code> · <code>--spacebetween</code> · <code>--spacearound</code></td><td><code>justify-content</code></td></tr>
                <tr><td>Multilínea</td><td><code>--vertical-top</code> · <code>--vertical-middle</code> · <code>--vertical-bottom</code></td><td><code>align-content</code></td></tr>
            </tbody>
        </table>

        <h2>Composición</h2>
        <p>Los modificadores flex son apilables: <code>.ft-helper-display-flex.ft-helper-display-flex--column.ft-helper-display-flex--middle.ft-helper-display-flex--center</code> es un flex-column centrado en ambos ejes. Para gap, usa <code>.ft-helper-spacer-gap-*</code> o <code>style</code> externo (este helper no define gap).</p>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Sub-familia</th><th>Clase raíz</th><th>Modificadores</th></tr></thead>
            <tbody>
                <tr><td>Block</td><td><code>.ft-helper-display--block</code></td><td><code>--left</code> · <code>--center</code> · <code>--right</code></td></tr>
                <tr><td>Flex</td><td><code>.ft-helper-display-flex</code></td><td>13 modificadores composables</td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_display.scss</code> · showroom: <code>fourty/helpers/helper-display.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const DISPLAY = {
        id: "display",
        name: "Display",
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
                    { id: "block", name: "Block",  kind: "gallery", full: true, render: galleryBlock },
                    { id: "flex",  name: "Flex",   kind: "gallery", full: true, render: galleryFlex }
                ]
            }
        ]
    };
    window.SB.register(DISPLAY);
    window.SB.loadMarkup(DISPLAY, document.currentScript && document.currentScript.src, { full: true });
})();
