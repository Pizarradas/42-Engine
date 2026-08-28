/* ════════════════════════════════════════════════════════════════════════
   helpers/text/text.js — Helpers / Text
   Casuística REAL de scss/base/helpers/_texts.scss (.ft-helper-text-*).
   3 sub-familias:
     · -hide          → esconder texto manteniendo el bloque (hide--text mixin)
     · -hide-xs       → mismo efecto solo en <=768px
     · -align-*       → text-align (center · right · left)
     · -transform-*   → text-transform (uppercase · lowercase · capitalize)

   Solapamiento parcial con otros helpers:
     · -align-* es equivalente a .ft-helper-align-* salvo que NO incluye
       justify-content (este helper es solo de texto)
     · -transform-uppercase es equivalente a .ft-helper-fontType--uppercase
     · -hide es equivalente a .ft-helper-hideTxt (familia Hides)

   Estructura:
     · Base (interactive)  → sub-familia + variante + slot
     · Galleries           → Align · Transform · Hide
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SSOT — 1:1 con _texts.scss ▼ */
    const DATA = {
        aligns: [
            ["center", "center · text-align: center"],
            ["right",  "right · text-align: right"],
            ["left",   "left · text-align: left"]
        ],
        transforms: [
            ["uppercase",  "uppercase · TEXTO EN MAYÚSCULAS"],
            ["lowercase",  "lowercase · texto en minúsculas"],
            ["capitalize", "capitalize · Texto Con Iniciales En Mayúscula"]
        ],
        hides: [
            ["hide",     "hide · siempre invisible (mantiene bloque)"],
            ["hide-xs",  "hide-xs · invisible solo en ≤768px"]
        ]
    };

    const SAMPLE = "The quick brown fox jumps over the lazy dog";

    /* ─── BASE — selector ─── */
    const baseArgTypes = [
        { key: "family", control: "radio",
          desc: "Sub-familia.",
          options: [["align", "align"], ["transform", "transform"], ["hide", "hide"]] },
        { key: "align", control: "select",
          desc: "Variante de alineación.",
          options: DATA.aligns },
        { key: "transform", control: "select",
          desc: "Variante de transformación.",
          options: DATA.transforms },
        { key: "hide", control: "radio",
          desc: "Variante de hide.",
          options: DATA.hides },
        { key: "text", control: "text", desc: "Texto de muestra (solo align/transform)." }
    ];
    const baseArgs = { family: "align", align: "center", transform: "uppercase", hide: "hide", text: SAMPLE };
    const liveBase = (a) => {
        const cls = "ft-helper-text-" + (a[a.family] || "");
        let body = "";
        if (a.family === "hide") {
            body = `<div style="background:#f5f5f5;padding:14px;border:1px dashed #999;border-radius:3px;">
                <p>Vecino A</p>
                <p class="${esc(cls)}">${esc(SAMPLE)}</p>
                <p>Vecino B</p>
            </div>
            <p style="margin:8px 0 0;font:400 11px/1.3 'Inter',sans-serif;color:#666;">
                ${a.hide === "hide-xs"
                    ? "El target solo se oculta en &lt;=768px. Usa el control Viewport del toolbar para verificarlo."
                    : "El texto se esconde siempre (text-indent muy negativo) pero el bloque sigue ocupando espacio."}
            </p>`;
        } else {
            body = `<p class="${esc(cls)}" style="background:#f5f5f5;padding:14px;font:16px/1.4 sans-serif;color:#333;">${esc(a.text)}</p>`;
        }
        return `<div style="padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:10px;">.${esc(cls)}</code>
            ${body}
        </div>`;
    };

    /* ─── Galería: align ─── */
    const galleryAlign = () => {
        const rows = DATA.aligns.map(([v, label]) => {
            const cls = "ft-helper-text-align-" + v;
            return `<div style="margin-bottom:14px;">
                <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:4px;">.${cls}</code>
                <p style="margin:0 0 4px;font:400 11px/1.3 'Inter',sans-serif;color:#666;">${esc(label)}</p>
                <p class="${cls}" style="background:#f5f5f5;padding:10px;margin:0;font:14px/1.4 sans-serif;">${esc(SAMPLE)}</p>
            </div>`;
        }).join("");
        return `<section>
            <h3 style="margin:0 0 10px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Text align</h3>
            <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">
                <strong>Solapamiento</strong>: <code>.ft-helper-align-*</code> (familia Align) hace lo mismo Y además aplica <code>justify-content</code> para contextos flex. <code>.ft-helper-text-align-*</code> es solo <code>text-align</code>.
            </p>
            ${rows}
        </section>`;
    };

    /* ─── Galería: transform ─── */
    const galleryTransform = () => {
        const rows = DATA.transforms.map(([v, label]) => {
            const cls = "ft-helper-text-transform-" + v;
            return `<div style="margin-bottom:14px;">
                <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:4px;">.${cls}</code>
                <p style="margin:0 0 4px;font:400 11px/1.3 'Inter',sans-serif;color:#666;">${esc(label)}</p>
                <p class="${cls}" style="background:#f5f5f5;padding:10px;margin:0;font:14px/1.4 sans-serif;">${esc(SAMPLE)}</p>
            </div>`;
        }).join("");
        return `<section>
            <h3 style="margin:0 0 10px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Text transform</h3>
            <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">
                <strong>Solapamiento</strong>: <code>.ft-helper-fontType--uppercase</code> aplica el mismo efecto. Esta familia añade <code>lowercase</code> y <code>capitalize</code> que no están en fontType.
            </p>
            ${rows}
        </section>`;
    };

    /* ─── Galería: hide ─── */
    const galleryHide = () => {
        const rows = DATA.hides.map(([v, label]) => {
            const cls = "ft-helper-text-" + v;
            return `<section style="margin-bottom:18px;">
                <h4 style="margin:0 0 4px;font:600 12.5px/1.2 'Inter',sans-serif;color:#161616;">.${cls}</h4>
                <p style="margin:0 0 8px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">${esc(label)}</p>
                <div style="background:#f5f5f5;padding:14px;border:1px dashed #999;border-radius:3px;">
                    <p style="margin:0;">Vecino A</p>
                    <p class="${cls}" style="margin:0;">${esc(SAMPLE)}</p>
                    <p style="margin:0;">Vecino B</p>
                </div>
            </section>`;
        }).join("");
        return `<p style="margin:0 0 14px;font:400 12px/1.5 'Inter',sans-serif;color:#666;padding:12px;background:#fffbe6;border-left:3px solid #faad14;border-radius:3px;">
            <strong>Solapamiento</strong>: <code>.ft-helper-hideTxt</code> (familia Hides) y <code>.ft-helper-hide-screenReader</code> son alternativas con matices distintos. Cuando quieras eliminar la visibilidad pero mantener accesibilidad para lectores, prefiere <code>hide-screenReader</code>.
        </p>
        ${rows}`;
    };

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Text</h1>
        <p class="cb-docs__lead">Familia <code>.ft-helper-text-*</code> del 42DS. 3 sub-familias: alineación, transformación y ocultar texto. <strong>Algunas variantes solapan</strong> con Align, FontType y Hides — el overview lo aclara para que elijas la opción más expresiva.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_texts.scss</code></td><td>Parcial SCSS</td><td>Solo para compilar (usa <code>hide--text</code> de abstracts)</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Sub-familias</h2>
        <table class="cb-table">
            <thead><tr><th>Sub-familia</th><th>Clases</th><th>Aplica</th></tr></thead>
            <tbody>
                <tr><td>Align</td><td><code>-align-{center,right,left}</code></td><td><code>text-align</code></td></tr>
                <tr><td>Transform</td><td><code>-transform-{uppercase,lowercase,capitalize}</code></td><td><code>text-transform</code></td></tr>
                <tr><td>Hide</td><td><code>-hide</code> · <code>-hide-xs</code></td><td><code>@include hide--text</code> (text-indent muy negativo). <code>-xs</code> aplica solo en ≤768px.</td></tr>
            </tbody>
        </table>

        <h2>Solapamientos con otras familias</h2>
        <table class="cb-table">
            <thead><tr><th>Esta familia</th><th>Alternativa</th><th>Diferencia</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-helper-text-align-*</code></td><td><code>.ft-helper-align-*</code></td><td>Align añade <code>justify-content</code> y <code>margin: auto</code> para contextos flex; Text es solo <code>text-align</code>.</td></tr>
                <tr><td><code>.ft-helper-text-transform-uppercase</code></td><td><code>.ft-helper-fontType--uppercase</code></td><td>Idénticas. FontType incluye además italic/balance/underline.</td></tr>
                <tr><td><code>.ft-helper-text-hide</code></td><td><code>.ft-helper-hideTxt</code></td><td>Similares (ambas usan <code>hide--text</code>). HideTxt añade <code>position: absolute</code> + <code>width: 0</code>.</td></tr>
                <tr><td><code>.ft-helper-text-hide</code></td><td><code>.ft-helper-hide-screenReader</code></td><td>HideTxt esconde para SEO pero accesible a screen readers. Hide-screenReader es el patrón sr-only moderno.</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Prefijo</td><td><code>.ft-helper-text-</code></td></tr>
                <tr><td>Sub-familia</td><td><code>align</code> · <code>transform</code> · <code>hide</code></td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_texts.scss</code> · showroom: <code>fourty/helpers/helper-text.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const TEXT = {
        id: "text",
        name: "Text",
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
                    { id: "align",     name: "Align",     kind: "gallery", full: true, render: galleryAlign },
                    { id: "transform", name: "Transform", kind: "gallery", full: true, render: galleryTransform },
                    { id: "hide",      name: "Hide",      kind: "gallery", full: true, render: galleryHide }
                ]
            }
        ]
    };
    window.SB.register(TEXT);
    window.SB.loadMarkup(TEXT, document.currentScript && document.currentScript.src, { full: true });
})();
