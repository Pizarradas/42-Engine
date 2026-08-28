/* ════════════════════════════════════════════════════════════════════════
   helpers/align/align.js — Helpers / Align
   Casuística REAL de scss/base/helpers/_align.scss (.ft-helper-align-*).
   Solo 3 clases — combina `text-align` (texto) con `justify-content` (flex)
   para alinear el contenido sea cual sea el contexto.

   Estructura:
     · Base (interactive)  → selector + toggle de contexto (texto vs flex)
     · Galleries           → matriz align × contexto (3×2)
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SSOT — 1:1 con _align.scss ▼ */
    const DATA = {
        aligns: [
            ["left",   "left · text-align + flex-start"],
            ["center", "center · text-align + center + margin auto"],
            ["right",  "right · text-align + flex-end"]
        ]
    };
    const ALIGN_VALUES = DATA.aligns.map(a => a[0]);

    /* ─── Viz helpers ─── */
    const TEXT_FRAME = (cls, sample) =>
        `<div style="background:#fff;border:1px dashed #999;border-radius:3px;padding:14px;min-width:280px;">
            <p class="${esc(cls)}" style="margin:0;font:14px/1.4 sans-serif;color:#161616;">${esc(sample)}</p>
        </div>`;
    const FLEX_FRAME = (cls, items) => {
        const pills = items.map(t => `<span style="background:#0050b3;color:#fff;padding:6px 10px;border-radius:3px;font:600 11px/1.2 sans-serif;">${esc(t)}</span>`).join("");
        return `<div class="${esc(cls)}" style="display:flex;gap:8px;background:#fff;border:1px dashed #999;border-radius:3px;padding:14px;min-width:280px;">${pills}</div>`;
    };

    /* ─── BASE — selector + contexto ─── */
    const baseArgTypes = [
        { key: "align", control: "radio",
          desc: "Alineación (.ft-helper-align-[left|center|right]).",
          options: DATA.aligns },
        { key: "context", control: "radio",
          desc: "Contexto donde aplicar (texto o flex container).",
          options: [["text", "texto"], ["flex", "flex"]] },
        { key: "text", control: "text", desc: "Texto de muestra (solo modo 'texto')." }
    ];
    const baseArgs = { align: "center", context: "text", text: "Texto alineado por el helper" };
    const liveBase = (a) => {
        const cls = "ft-helper-align-" + a.align;
        const frame = a.context === "flex"
            ? FLEX_FRAME(cls, ["A", "B", "C"])
            : TEXT_FRAME(cls, a.text);
        return `<div style="padding:20px;background:#f5f5f5;border-radius:3px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:10px;">.${esc(cls)}</code>
            ${frame}
        </div>`;
    };

    /* ─── Galería: matriz align × contexto ─── */
    const galleryMatrix = () => {
        const rows = ALIGN_VALUES.map(v => {
            const cls = "ft-helper-align-" + v;
            return `<section style="margin-bottom:18px;">
                <h3 style="margin:0 0 8px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">.${cls}</h3>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                    <div>
                        <p style="margin:0 0 6px;font:400 11px/1.3 'Inter',sans-serif;color:#666;">contexto · texto</p>
                        ${TEXT_FRAME(cls, "Texto de muestra del DS")}
                    </div>
                    <div>
                        <p style="margin:0 0 6px;font:400 11px/1.3 'Inter',sans-serif;color:#666;">contexto · flex</p>
                        ${FLEX_FRAME(cls, ["A", "B", "C"])}
                    </div>
                </div>
            </section>`;
        }).join("");
        return rows;
    };

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Align</h1>
        <p class="cb-docs__lead">Familia <code>.ft-helper-align-*</code> del 42DS. Tres clases que combinan <code>text-align</code> y <code>justify-content</code> en una sola — funcionan tanto en bloques de texto como en contenedores flex sin tener que pensar qué propiedad aplica.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_align.scss</code></td><td>Parcial SCSS</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Clases</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Propiedades aplicadas</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-helper-align-left</code></td><td><code>text-align: left</code> + <code>justify-content: flex-start</code></td></tr>
                <tr><td><code>.ft-helper-align-center</code></td><td><code>text-align: center</code> + <code>justify-content: center</code> + <code>margin: 0 auto</code></td></tr>
                <tr><td><code>.ft-helper-align-right</code></td><td><code>text-align: right</code> + <code>justify-content: flex-end</code></td></tr>
            </tbody>
        </table>
        <div class="cb-callout">El helper es <strong>dual-purpose</strong>: se aplica al mismo elemento, pero según el contexto (block vs flex) la propiedad efectiva cambia. No es necesario elegir entre <code>text-align</code> y <code>justify-content</code>.</div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Prefijo</td><td><code>.ft-helper-align-</code></td></tr>
                <tr><td>Valor</td><td><code>left</code> · <code>center</code> · <code>right</code></td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_align.scss</code> · showroom: <code>fourty/helpers/helper-align.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const ALIGN = {
        id: "align",
        name: "Align",
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
                    { id: "matrix", name: "Matriz align × contexto", kind: "gallery", full: true, render: galleryMatrix }
                ]
            }
        ]
    };
    window.SB.register(ALIGN);
    window.SB.loadMarkup(ALIGN, document.currentScript && document.currentScript.src, { full: true });
})();
