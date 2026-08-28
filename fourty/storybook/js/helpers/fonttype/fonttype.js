/* ════════════════════════════════════════════════════════════════════════
   helpers/fonttype/fonttype.js — Helpers / Font Type
   Casuística REAL de scss/base/helpers/_fonts.scss (sub-bloque &Type).
   Aplica un estilo/forma del texto: italic, balance, underline, uppercase.
   Único helper de la familia Fonts cuya nomenclatura usa doble guion (`--`)
   porque cada valor es un modificador, no una escala.

   Estructura:
     · Base (interactive)  → selector único de tipo + texto + flag combinable
     · Galleries           → muestra los 4 modificadores apilados con un mismo texto
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SSOT — 1:1 con _fonts.scss (sub-bloque &Type, nomenclatura `--`) ▼ */
    const DATA = {
        types: [
            ["italic",    "italic · font-style: italic"],
            ["balance",   "balance · text-wrap: balance (titulares multilinea)"],
            ["underline", "underline · text-decoration: underline"],
            ["uppercase", "uppercase · text-transform: uppercase"]
        ]
    };
    const TYPE_VALUES = DATA.types.map(t => t[0]);

    const SAMPLE_SHORT = "Texto de muestra del DS";
    const SAMPLE_LONG  = "Este titular tiene varias palabras y por tanto puede romperse en distintos puntos · útil para ver el efecto de balance";

    /* ─── BASE — selector único + flag combinar varios ─── */
    const baseArgTypes = [
        { key: "type", control: "select",
          desc: "Modificador (.ft-helper-fontType--[italic|balance|underline|uppercase]).",
          options: DATA.types },
        { key: "size", control: "select",
          desc: "Tamaño tipográfico aplicado (composición).",
          options: [
              ["heading-L", "heading-L"], ["heading-M", "heading-M"], ["heading-S", "heading-S"],
              ["body-L", "body-L"], ["body-M", "body-M"], ["body-S", "body-S"]
          ] },
        { key: "text", control: "text", desc: "Texto de muestra (slot). Para `balance`, párrafos largos hacen el efecto visible." }
    ];
    const baseArgs = { type: "italic", size: "heading-M", text: SAMPLE_LONG };
    const liveBase = (a) => {
        const cls = `ft-helper-fontSize-${a.size} ft-helper-fontType--${a.type}`;
        return `<div style="padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;max-width:520px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:10px;">.${esc(cls)}</code>
            <div class="${esc(cls)}">${esc(a.text)}</div>
        </div>`;
    };

    /* ─── Galería: cada modificador con un mismo texto ─── */
    const galleryAll = () => {
        const samples = {
            italic:    SAMPLE_SHORT,
            balance:   SAMPLE_LONG,
            underline: SAMPLE_SHORT,
            uppercase: SAMPLE_SHORT
        };
        const rows = TYPE_VALUES.map(t => {
            const cls = "ft-helper-fontSize-heading-M ft-helper-fontType--" + t;
            return `<div style="padding:14px 16px;border-bottom:1px solid #eee;display:flex;flex-direction:column;gap:6px;">
                <code style="font:500 10.5px/1.2 monospace;color:#0f62fe;">.ft-helper-fontType--${t}</code>
                <div class="${cls}" style="max-width:520px;">${esc(samples[t])}</div>
            </div>`;
        }).join("");
        return `<section style="border:1px solid #ddd;border-radius:3px;overflow:hidden;background:#fff;">
            <header style="padding:10px 12px;background:#f5f5f5;border-bottom:1px solid #ddd;">
                <h3 style="margin:0;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Modificadores</h3>
                <p style="margin:4px 0 0;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">Para <code>balance</code>, hace falta un párrafo de ≥2 líneas; el navegador equilibra el ancho por línea automáticamente.</p>
            </header>
            ${rows}
        </section>`;
    };

    /* ─── Galería: combinaciones (apilando varios fontType) ─── */
    const galleryCombos = () => {
        // El SCSS no prohíbe combinar — todos son selectores independientes.
        // Caso típico: italic + underline en un destacado.
        const combos = [
            ["italic + underline", ["italic", "underline"]],
            ["uppercase + balance", ["uppercase", "balance"]],
            ["italic + uppercase",  ["italic", "uppercase"]]
        ];
        const rows = combos.map(([title, mods]) => {
            const cls = "ft-helper-fontSize-heading-S " + mods.map(m => "ft-helper-fontType--" + m).join(" ");
            return `<div style="padding:14px 16px;border-bottom:1px solid #eee;display:flex;flex-direction:column;gap:6px;">
                <code style="font:500 10.5px/1.2 monospace;color:#0f62fe;">.${cls}</code>
                <div class="${cls}" style="max-width:520px;">${esc(title)}</div>
            </div>`;
        }).join("");
        return `<section style="border:1px solid #ddd;border-radius:3px;overflow:hidden;background:#fff;">
            <header style="padding:10px 12px;background:#f5f5f5;border-bottom:1px solid #ddd;">
                <h3 style="margin:0;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Combinaciones</h3>
                <p style="margin:4px 0 0;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">Los 4 modificadores son apilables; el resultado es la unión de sus efectos (italic + underline + uppercase, etc).</p>
            </header>
            ${rows}
        </section>`;
    };

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Font Type</h1>
        <p class="cb-docs__lead">Familia <code>.ft-helper-fontType--*</code> del 42DS. Modificadores de forma/estilo del texto. Nomenclatura con doble guion (<code>--</code>) — son flags semánticos, no una escala.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_fonts.scss</code></td><td>Parcial SCSS (sub-bloque <code>&Type</code>)</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Las 4 clases son <strong>apilables</strong> entre sí: actúan sobre propiedades CSS independientes (font-style · text-wrap · text-decoration · text-transform). Ver galería <em>Combinaciones</em>.</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Propiedad CSS</th><th>Cuándo usar</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-helper-fontType--italic</code></td><td><code>font-style: italic</code></td><td>Énfasis tipográfico clásico, citas, técnicos</td></tr>
                <tr><td><code>.ft-helper-fontType--balance</code></td><td><code>text-wrap: balance</code></td><td>Titulares multilinea — equilibra el ancho de cada línea (≥2 líneas para ver el efecto)</td></tr>
                <tr><td><code>.ft-helper-fontType--underline</code></td><td><code>text-decoration: underline</code></td><td>Subrayar fragmentos sin convertirlos en enlace</td></tr>
                <tr><td><code>.ft-helper-fontType--uppercase</code></td><td><code>text-transform: uppercase</code></td><td>Etiquetas, secciones tipo "Es noticia", labels destacados</td></tr>
            </tbody>
        </table>

        <h2>Composición</h2>
        <p>Funciona en cualquier combinación con <code>.ft-helper-fontSize-*</code>, <code>.ft-helper-fontWeight-*</code> y <code>.ft-helper-fontColor-*</code>. También se combinan entre ellos (varios modificadores fontType en la misma clase list).</p>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Prefijo</td><td><code>.ft-helper-fontType--</code> <small>(doble guion · son modificadores)</small></td></tr>
                <tr><td>Valor</td><td><code>italic</code> · <code>balance</code> · <code>underline</code> · <code>uppercase</code></td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_fonts.scss</code> · showroom: <code>fourty/helpers/helper-fontType.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const FONTTYPE = {
        id: "fonttype",
        name: "Font Type",
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
                    { id: "modifiers", name: "Modificadores",  kind: "gallery", full: true, render: galleryAll },
                    { id: "combos",    name: "Combinaciones",  kind: "gallery", full: true, render: galleryCombos }
                ]
            }
        ]
    };
    window.SB.register(FONTTYPE);
    window.SB.loadMarkup(FONTTYPE, document.currentScript && document.currentScript.src, { full: true });
})();
