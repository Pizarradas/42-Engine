/* ════════════════════════════════════════════════════════════════════════
   helpers/grids/grids.js — Helpers / Grids
   Casuística REAL de scss/base/helpers/_grids.scss (.ft-helper-grid-*).
   Sub-familias:
     · grid-out-mo  → negative margin solo en móvil (sangrar al borde)
     · grid-width-N (1..12) → max-width % SOLO a partir de ≥1024px (Lg)

   Diseñadas para componerse con el grid flex del DS (`.ft-layout-grid-flex__col*`).
   Cuando un col lleva además un grid-width-N, el ancho lo dicta este último a
   partir de Lg. Cuando se combinan grid-width-N + spacer-inner-{sm/md/lg},
   el SCSS fuerza paddings específicos (override del spacer base).

   Estructura:
     · Base (interactive)  → eje grid-width (1..12) en un contenedor visual
     · Galleries           → todas las anchuras 1..12 · grid-out-mo
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SSOT — 1:1 con _grids.scss ▼ */
    const DATA = {
        widths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    };

    /* ─── Viz helpers ─── */
    // Como `grid-width-N` solo aplica desde 1024px, simulamos el efecto con un
    // flex container ancho que muestre el % real ocupado por la clase. Usamos
    // ancho 100% como base + el porcentaje del modificador.
    const PCT = (n) => (n / 12 * 100).toFixed(4);
    const COL = (n) => {
        const cls = "ft-helper-grid-width-" + n;
        return `<div style="display:flex;flex-direction:column;gap:4px;">
            <code style="font:500 10.5px/1.2 monospace;color:#0f62fe;">.${cls}</code>
            <div style="background:repeating-linear-gradient(90deg,rgba(0,0,0,.04) 0 8.33%,transparent 8.33% 16.66%);border:1px solid #ccc;border-radius:3px;height:40px;display:flex;">
                <div class="${cls}" style="background:#0050b3;color:#fff;font:600 11px/1 sans-serif;display:flex;align-items:center;justify-content:center;border-radius:2px;flex-basis:${PCT(n)}%;max-width:${PCT(n)}%;">${n}/12 · ${PCT(n)}%</div>
            </div>
        </div>`;
    };

    /* ─── BASE — selector de width ─── */
    const baseArgTypes = [
        { key: "n", control: "number",
          desc: "Ancho en columnas del DS (1..12). Aplica como max-width % a partir de ≥1024px.",
          min: 1, max: 12, step: 1 }
    ];
    const baseArgs = { n: 6 };
    const liveBase = (a) => {
        const n = Math.max(1, Math.min(12, parseInt(a.n, 10) || 6));
        return `<div style="padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;">
            <p style="margin:0 0 10px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">
                <strong>Nota</strong>: la clase aplica solo desde ≥1024px (breakpoint Lg). En el storybook, simulamos el ancho con flex-basis para que el efecto sea visible en cualquier viewport.
            </p>
            ${COL(n)}
        </div>`;
    };

    /* ─── Galería: todas las anchuras 1..12 ─── */
    const galleryWidths = () =>
        `<section style="display:flex;flex-direction:column;gap:14px;">
            <h3 style="margin:0;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Escala 1..12</h3>
            <p style="margin:0 0 4px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">Cada clase ocupa N/12 columnas a partir de ≥1024px. En el render del storybook simulamos el flex-basis para que el efecto sea legible.</p>
            ${DATA.widths.map(COL).join("")}
        </section>`;

    /* ─── Galería: grid-out-mo ─── */
    const galleryOut = () =>
        `<section>
            <h3 style="margin:0 0 6px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">.ft-helper-grid-out-mo</h3>
            <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">Negative margin + padding compensatorio SOLO en móvil. Permite sangrar al borde sin recalcular paddings del contenedor. En ≥768px revierte (margin/padding 0).</p>
            <div style="background:repeating-linear-gradient(45deg,rgba(0,0,0,.04) 0 6px,transparent 6px 12px);border:1px dashed #999;border-radius:3px;padding:14px;">
                <div class="ft-helper-grid-out-mo" style="background:#0050b3;color:#fff;padding:14px;border-radius:3px;font:600 12px/1.3 sans-serif;">
                    En móvil este bloque sangra al borde por el negative margin.<br>
                    En ≥768px ya no.
                </div>
            </div>
        </section>`;

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Grids</h1>
        <p class="cb-docs__lead">Familia <code>.ft-helper-grid-*</code> del 42DS. Utilidades para anchos en columnas (1..12 desde Lg) y un sangrado de borde solo-móvil. Pensadas para componerse con el <strong>grid flex del DS</strong> (<code>.ft-layout-grid-flex__col*</code>).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_grids.scss</code></td><td>Parcial SCSS</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Sub-familias</h2>
        <table class="cb-table">
            <thead><tr><th>Sub-familia</th><th>Patrón</th><th>Comportamiento</th></tr></thead>
            <tbody>
                <tr><td>grid-out-mo</td><td><code>.ft-helper-grid-out-mo</code></td><td>Móvil (&lt;768px): <code>margin: 0 -0.9rem</code> + <code>padding: 0 0.9rem</code>. ≥768px: revierte a 0.</td></tr>
                <tr><td>grid-width-N</td><td><code>.ft-helper-grid-width-{1..12}</code></td><td>≥1024px (Lg): <code>max-width: N/12*100%</code> + <code>flex-basis: N/12*100%</code>. &lt;1024px: sin efecto.</td></tr>
            </tbody>
        </table>

        <h2>Composición con el grid flex</h2>
        <p>El patrón canónico apila <code>.ft-layout-grid-flex__col{Xs|Md|Lg}-N</code> (responsive base) con <code>.ft-helper-grid-width-N</code> (override desde Lg):</p>
        <pre style="background:#f5f5f5;padding:10px;border-radius:3px;font:500 11.5px/1.4 monospace;overflow:auto;"><code>&lt;div class="ft-layout-grid-flex__row"&gt;
    &lt;div class="ft-layout-grid-flex__colXs-12 ft-helper-grid-width-8"&gt;
        Ocupa 12/12 en Xs y 8/12 desde Lg.
    &lt;/div&gt;
    &lt;div class="ft-layout-grid-flex__colXs-12 ft-helper-grid-width-4"&gt;
        Ocupa 12/12 en Xs y 4/12 desde Lg.
    &lt;/div&gt;
&lt;/div&gt;</code></pre>

        <h2>Override de inner-spacer con grid-width</h2>
        <p>Si un col lleva ambos (<code>grid-width-N</code> + <code>spacer-inner-{sm/md/lg}</code>), el SCSS aplica paddings específicos del par para mantener proporciones del grid:</p>
        <table class="cb-table">
            <thead><tr><th>Combinación</th><th>Móvil</th><th>≥768px</th></tr></thead>
            <tbody>
                <tr><td>grid-width-N + spacer-inner-sm</td><td><code>padding: 2rem</code></td><td><code>padding: 3.5rem</code></td></tr>
                <tr><td>grid-width-N + spacer-inner-md</td><td><code>padding: 3rem</code></td><td><code>padding: 6rem</code></td></tr>
                <tr><td>grid-width-N + spacer-inner-lg</td><td><code>padding: 6rem</code></td><td><code>padding: 8rem</code></td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Prefijo</td><td><code>.ft-helper-grid-</code></td></tr>
                <tr><td>Sub-elemento</td><td><code>out-mo</code> · <code>width-N</code></td></tr>
                <tr><td>Valor de width</td><td>entero de 1 a 12</td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_grids.scss</code> · showroom: <code>fourty/helpers/helper-grids.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const GRIDS = {
        id: "grids",
        name: "Grids",
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
                    { id: "widths", name: "Anchos 1..12",      kind: "gallery", full: true, render: galleryWidths },
                    { id: "out",    name: "Grid-out-mo",        kind: "gallery", full: true, render: galleryOut }
                ]
            }
        ]
    };
    window.SB.register(GRIDS);
    window.SB.loadMarkup(GRIDS, document.currentScript && document.currentScript.src, { full: true });
})();
