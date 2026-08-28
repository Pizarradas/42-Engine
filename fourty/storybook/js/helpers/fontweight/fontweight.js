/* ════════════════════════════════════════════════════════════════════════
   helpers/fontweight/fontweight.js — Helpers / Font Weight
   Casuística REAL de scss/base/helpers/_fonts.scss (sub-bloque &Weight).
   Aplica un peso (300..800) Y el font-family de ese peso (cada peso del DS lleva
   su propia variable de fuente para que la marca controle la cascada exacta).

   Estructura:
     · Base (interactive)  → peso seleccionable + slot textual
     · Galleries           → escala completa apilada para comparación visual
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SSOT — 1:1 con _fonts.scss (sub-bloque &Weight) ▼ */
    const DATA = {
        weights: [
            ["300", "300 · Light"],
            ["400", "400 · Regular"],
            ["500", "500 · Medium"],
            ["600", "600 · Semibold"],
            ["700", "700 · Bold"],
            ["800", "800 · Black"]
        ]
    };
    const WEIGHT_VALUES = DATA.weights.map(w => w[0]);

    const SAMPLE = "The quick brown fox jumps over the lazy dog 1234567890";

    /* ─── BASE — selector único de peso ─── */
    const baseArgTypes = [
        { key: "weight", control: "select",
          desc: "Peso tipográfico (.ft-helper-fontWeight-[300|400|500|600|700|800]). Cada peso aplica también la font-family específica de la marca.",
          options: DATA.weights },
        { key: "text", control: "text", desc: "Texto de muestra (slot)." }
    ];
    const baseArgs = { weight: "400", text: SAMPLE };
    const liveBase = (a) => {
        const cls = "ft-helper-fontWeight-" + a.weight;
        return `<div style="padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:10px;">.${esc(cls)}</code>
            <div class="${esc(cls)}" style="font-size:24px;line-height:1.3;">${esc(a.text)}</div>
        </div>`;
    };

    /* ─── Galería: escala completa apilada ─── */
    const galleryScale = () => {
        const rows = WEIGHT_VALUES.map(w => {
            const cls = "ft-helper-fontWeight-" + w;
            return `<div style="padding:14px 16px;border-bottom:1px solid #eee;display:flex;flex-direction:column;gap:6px;">
                <code style="font:500 10.5px/1.2 monospace;color:#0f62fe;">.${cls}</code>
                <div class="${cls}" style="font-size:20px;line-height:1.3;">${esc(SAMPLE)}</div>
            </div>`;
        }).join("");
        return `<section style="border:1px solid #ddd;border-radius:3px;overflow:hidden;background:#fff;">
            <header style="padding:10px 12px;background:#f5f5f5;border-bottom:1px solid #ddd;">
                <h3 style="margin:0;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Escala de pesos</h3>
                <p style="margin:4px 0 0;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">Cada peso fuerza la <code>font-family</code> definida en la marca activa. El render exacto depende de qué fuentes carga <code>setting.css</code>.</p>
            </header>
            ${rows}
        </section>`;
    };

    /* ─── Galería: composición con FontSize ─── */
    const galleryComposed = () => {
        const sizes = ["heading-L", "body-M", "body-S--small"];
        const rows = sizes.map(s => {
            const inner = WEIGHT_VALUES.map(w => {
                const cls = `ft-helper-fontSize-${s} ft-helper-fontWeight-${w}`;
                return `<div style="padding:8px 14px;border-bottom:1px solid #f0f0f0;">
                    <code style="font:500 10px/1.2 monospace;color:#666;display:block;margin-bottom:2px;">.${cls}</code>
                    <div class="${cls}">${esc(SAMPLE.slice(0, 40))}</div>
                </div>`;
            }).join("");
            return `<section style="margin-bottom:20px;border:1px solid #ddd;border-radius:3px;overflow:hidden;background:#fff;">
                <header style="padding:8px 12px;background:#f5f5f5;border-bottom:1px solid #ddd;">
                    <h3 style="margin:0;font:600 12px/1.2 'Inter',sans-serif;color:#161616;">fontSize-${esc(s)} × weight</h3>
                </header>
                ${inner}
            </section>`;
        }).join("");
        return rows;
    };

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Font Weight</h1>
        <p class="cb-docs__lead">Familia <code>.ft-helper-fontWeight-*</code> del 42DS. Aplica un peso de 300 a 800 <strong>junto a la font-family específica</strong> de ese peso en la marca activa — no es solo un <code>font-weight</code> sino un cambio de familia tipográfica controlado por la marca.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables y font-family por peso</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_fonts.scss</code></td><td>Parcial SCSS (sub-bloque <code>&Weight</code>)</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout"><strong>Por qué importa</strong>: cada peso del DS declara su propia <code>font-family</code> (p.ej. una variante condensada en 800). Aplicar <code>font-weight: 800</code> a mano <em>no</em> equivale a <code>.ft-helper-fontWeight-800</code> porque pierdes el swap de familia.</div>

        <h2>Pesos disponibles</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Peso</th><th>Notas</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-helper-fontWeight-300</code></td><td>300 · Light</td><td>Texto suave, citas largas</td></tr>
                <tr><td><code>.ft-helper-fontWeight-400</code></td><td>400 · Regular</td><td>Peso por defecto del cuerpo</td></tr>
                <tr><td><code>.ft-helper-fontWeight-500</code></td><td>500 · Medium</td><td>Énfasis intermedio · default en marca <code>revistas</code></td></tr>
                <tr><td><code>.ft-helper-fontWeight-600</code></td><td>600 · Semibold</td><td>Sub-titulares, labels destacados</td></tr>
                <tr><td><code>.ft-helper-fontWeight-700</code></td><td>700 · Bold</td><td>Titulares y bloques de énfasis</td></tr>
                <tr><td><code>.ft-helper-fontWeight-800</code></td><td>800 · Black / Bold</td><td>Hero · Display L (carga el <code>bold</code> CSS)</td></tr>
            </tbody>
        </table>

        <h2>Composición</h2>
        <p>Funciona apilado con <code>.ft-helper-fontSize-*</code> y <code>.ft-helper-fontColor-*</code>. Ver galerías para inspeccionar combinaciones.</p>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Prefijo</td><td><code>.ft-helper-fontWeight-</code></td></tr>
                <tr><td>Valor</td><td><code>300</code> · <code>400</code> · <code>500</code> · <code>600</code> · <code>700</code> · <code>800</code></td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_fonts.scss</code> · showroom: <code>fourty/helpers/helper-fontweight.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const FONTWEIGHT = {
        id: "fontweight",
        name: "Font Weight",
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
                    { id: "scale",    name: "Escala completa",          kind: "gallery", full: true, render: galleryScale },
                    { id: "composed", name: "Composición con fontSize", kind: "gallery", full: true, render: galleryComposed }
                ]
            }
        ]
    };
    window.SB.register(FONTWEIGHT);
    window.SB.loadMarkup(FONTWEIGHT, document.currentScript && document.currentScript.src, { full: true });
})();
