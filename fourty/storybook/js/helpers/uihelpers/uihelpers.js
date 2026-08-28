/* ════════════════════════════════════════════════════════════════════════
   helpers/uihelpers/uihelpers.js — Helpers / UI Helpers
   Casuística REAL de scss/base/helpers/_uihelper.scss
   (.ui-helper-hidden-accessible).

   ⚠ Nomenclatura ATÍPICA: este es el único helper del DS con prefijo
   `.ui-helper-` en lugar de `.ft-helper-`. Es un legacy de jQuery UI
   (que usaba esta nomenclatura) y se mantiene por compatibilidad con
   código antiguo del grupo. NO crear nuevas clases con este prefijo;
   para esconder accesiblemente texto nuevo, preferir
   `.ft-helper-hide-screenReader` (familia Hides).

   Clase única:
     · .ui-helper-hidden-accessible → position: absolute; left: -999em

   Estructura:
     · Base (interactive)  → toggle on/off + slot
     · Galleries           → comparativa con la alternativa moderna
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ─── BASE — toggle on/off ─── */
    const baseArgTypes = [
        { key: "applied", control: "boolean",
          desc: "Aplica .ui-helper-hidden-accessible (position: absolute; left: -999em). El texto se mueve fuera del viewport pero sigue en el DOM, accesible a screen readers." }
    ];
    const baseArgs = { applied: true };
    const liveBase = (a) => {
        const cls = a.applied ? "ui-helper-hidden-accessible" : "";
        return `<div style="padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:10px;">.${esc(cls || "(sin clase)")}</code>
            <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">
                ${a.applied
                    ? "Con la clase: el span de abajo está fuera del viewport (left: -999em) pero sigue en el DOM. Si lo inspeccionas con DevTools verás que existe."
                    : "Sin la clase: el span es totalmente visible."}
            </p>
            <div style="background:#f5f5f5;padding:14px;border-radius:3px;overflow:hidden;">
                Texto visible normal.
                <span class="${esc(cls)}" style="background:#0050b3;color:#fff;padding:4px 8px;border-radius:3px;">
                    [span de muestra — para screen reader únicamente]
                </span>
                · sigue el flujo de texto.
            </div>
        </div>`;
    };

    /* ─── Galería: comparativa con alternativa moderna ─── */
    const galleryCompare = () => {
        return `<section style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
            <div>
                <h3 style="margin:0 0 6px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">.ui-helper-hidden-accessible</h3>
                <p style="margin:0 0 8px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;"><strong>Legacy</strong>. <code>position: absolute</code> + <code>left: -999em</code>. Funciona, pero es la fórmula histórica de jQuery UI.</p>
                <div style="background:#f5f5f5;padding:14px;border-radius:3px;overflow:hidden;">
                    Visible · <span class="ui-helper-hidden-accessible">oculto legacy</span> · visible.
                </div>
            </div>
            <div>
                <h3 style="margin:0 0 6px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">.ft-helper-hide-screenReader</h3>
                <p style="margin:0 0 8px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;"><strong>Moderno</strong>. <code>clip + 1×1px + overflow hidden</code>. Equivalente al <code>sr-only</code> de Bootstrap/Tailwind. Recomendado para código nuevo.</p>
                <div style="background:#f5f5f5;padding:14px;border-radius:3px;overflow:hidden;">
                    Visible · <span class="ft-helper-hide-screenReader">oculto moderno</span> · visible.
                </div>
            </div>
        </section>
        <section style="margin-top:24px;padding:12px;background:#fffbe6;border-left:3px solid #faad14;border-radius:3px;">
            <h4 style="margin:0 0 4px;font:600 12.5px/1.2 'Inter',sans-serif;color:#161616;">Cuándo migrar</h4>
            <p style="margin:0;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">
                <code>left: -999em</code> es seguro pero puede generar scroll horizontal en RTL si no se controla. Si tocas código que usa este helper, considera sustituirlo por <code>.ft-helper-hide-screenReader</code>. Si no, déjalo como está — sigue funcionando.
            </p>
        </section>`;
    };

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>UI Helpers</h1>
        <p class="cb-docs__lead">Una sola clase legacy <code>.ui-helper-hidden-accessible</code>. Oculta visualmente el contenido moviéndolo fuera del viewport (<code>left: -999em</code>) manteniéndolo accesible a screen readers. <strong>Prefijo atípico</strong> (<code>.ui-helper-</code>) por origen jQuery UI.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_uihelper.scss</code></td><td>Parcial SCSS</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Clase</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Aplica</th></tr></thead>
            <tbody>
                <tr><td><code>.ui-helper-hidden-accessible</code></td><td><code>position: absolute</code> · <code>left: -999em</code></td></tr>
            </tbody>
        </table>

        <div class="cb-callout">
            <strong>Atención</strong>: este es el único helper del DS con prefijo <code>.ui-helper-</code>. Es un legacy de jQuery UI que se mantiene por compatibilidad. Para código nuevo, prefiere:
            <ul style="margin:8px 0 0;padding-left:20px;">
                <li><code>.ft-helper-hide-screenReader</code> (clip + 1×1px) — equivalente moderno, mejor soporte i18n/RTL.</li>
                <li><code>.ft-helper-hide</code> — hide-visually mixin genérico del DS.</li>
            </ul>
        </div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Clase única</td><td><code>.ui-helper-hidden-accessible</code></td></tr>
                <tr><td>Mecanismo</td><td><code>position: absolute</code> + <code>left: -999em</code></td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_uihelper.scss</code> · showroom: <code>fourty/helpers/helper-uihelpers.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const UIHELPERS = {
        id: "uihelpers",
        name: "UI Helpers",
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
                    { id: "compare", name: "Legacy vs moderno", kind: "gallery", full: true, render: galleryCompare }
                ]
            }
        ]
    };
    window.SB.register(UIHELPERS);
    window.SB.loadMarkup(UIHELPERS, document.currentScript && document.currentScript.src, { full: true });
})();
