/* ════════════════════════════════════════════════════════════════════════
   helpers/overlay/overlay.js — Helpers / Overlay
   Casuística REAL de scss/base/helpers/_overlays.scss (.ft-helper-overlay-modal).
   Una sola pareja:
     · .ft-helper-overlay-modal                → backdrop fixed full screen
                                                  (z-index 100 · opacity 0.7 ·
                                                  black) en display:none
     · .ft-helper-overlay-modal--visible       → display: block

   Pensado como capa de fondo para modales/menus que cubre el viewport y
   atenúa el contenido por debajo. El consumidor lo togglea con JS al abrir/
   cerrar el modal.

   Estructura:
     · Base (interactive)  → toggle visible + contenido simulado debajo
     · Galleries           → ejemplo con modal centrado encima del overlay
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ─── BASE — toggle visible ─── */
    const baseArgTypes = [
        { key: "visible", control: "boolean",
          desc: "Aplica el modificador --visible (display: block). Sin él, el backdrop está oculto." }
    ];
    const baseArgs = { visible: true };
    const liveBase = (a) => {
        const cls = "ft-helper-overlay-modal" + (a.visible ? " ft-helper-overlay-modal--visible" : "");
        // Caja contenedora con position:relative para que el overlay (que es
        // position:fixed) lo veamos contenido dentro del demo. Es una simulación
        // visual: en producción el overlay cubre el viewport completo.
        return `<div style="padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:10px;">.${esc(cls)}</code>
            <p style="margin:0 0 10px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">
                ${a.visible
                    ? "Con <code>--visible</code>: el backdrop cubre el viewport. Aquí lo contenemos en este demo para que se vea, pero en producción es <code>position:fixed</code> a pantalla completa."
                    : "Sin <code>--visible</code>: el backdrop está oculto."}
            </p>
            <div style="position:relative;height:240px;background:#f5f5f5;border:1px solid #ddd;border-radius:3px;overflow:hidden;">
                <div style="padding:14px;">
                    <h3 style="margin:0 0 6px;font:600 14px/1.2 sans-serif;color:#161616;">Contenido detrás del overlay</h3>
                    <p style="margin:0 0 8px;font:400 13px/1.5 sans-serif;color:#444;">Texto cualquiera del documento.</p>
                    <button class="ft-btn ft-btn--primary" type="button">Botón normal</button>
                </div>
                <!-- Overlay contenido dentro del demo (position:absolute en lugar de fixed) -->
                <div class="${esc(cls)}" style="position:absolute;inset:0;margin:0;"></div>
            </div>
        </div>`;
    };

    /* ─── Galería: modal centrado encima del overlay ─── */
    const galleryModalPattern = () =>
        `<section>
            <h3 style="margin:0 0 6px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Modal centrado sobre el overlay</h3>
            <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">
                Patrón canónico: el overlay cubre el viewport (z-index 100), un diálogo se posiciona encima (z-index ≥ 101) y captura el foco mientras esté abierto.
            </p>
            <div style="position:relative;height:320px;background:#f5f5f5;border:1px solid #ddd;border-radius:3px;overflow:hidden;">
                <div style="padding:14px;">
                    <h3 style="margin:0 0 6px;font:600 14px/1.2 sans-serif;color:#161616;">Página por debajo del modal</h3>
                    <p style="margin:0;font:400 13px/1.5 sans-serif;color:#666;">El contenido sigue ahí pero queda atenuado por el overlay (opacity 0.7 negra).</p>
                </div>
                <!-- Overlay (contenido en el demo: absolute en lugar de fixed) -->
                <div class="ft-helper-overlay-modal ft-helper-overlay-modal--visible"
                     style="position:absolute;inset:0;margin:0;"></div>
                <!-- Diálogo modal encima del overlay -->
                <div role="dialog" aria-modal="true"
                     style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;padding:18px;border-radius:6px;box-shadow:0 8px 24px rgba(0,0,0,.25);min-width:240px;z-index:101;">
                    <h4 style="margin:0 0 8px;font:600 14px/1.2 sans-serif;color:#161616;">Confirmación</h4>
                    <p style="margin:0 0 14px;font:400 13px/1.5 sans-serif;color:#444;">¿Eliminar este elemento?</p>
                    <div style="display:flex;gap:8px;justify-content:flex-end;">
                        <button type="button" style="padding:6px 12px;background:transparent;border:1px solid #ccc;border-radius:3px;cursor:pointer;">Cancelar</button>
                        <button type="button" style="padding:6px 12px;background:#0050b3;color:#fff;border:0;border-radius:3px;cursor:pointer;">Eliminar</button>
                    </div>
                </div>
            </div>
        </section>
        <section style="margin-top:24px;">
            <h3 style="margin:0 0 6px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Ejemplo de JS de consumidor</h3>
            <pre style="background:#f5f5f5;padding:10px;border-radius:3px;font:500 11.5px/1.4 monospace;overflow:auto;"><code>function openModal() {
    document.getElementById('overlay').classList.add('ft-helper-overlay-modal--visible');
    document.getElementById('dialog').focus();
}
function closeModal() {
    document.getElementById('overlay').classList.remove('ft-helper-overlay-modal--visible');
}</code></pre>
        </section>`;

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Overlay</h1>
        <p class="cb-docs__lead">Pareja <code>.ft-helper-overlay-modal</code> + <code>--visible</code> del 42DS. Backdrop a pantalla completa (negro, opacity 0.7, z-index 100) para usar bajo modales / menús full-screen. El consumidor lo togglea con JS.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables (incluye <code>--color-black</code>)</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_overlays.scss</code></td><td>Parcial SCSS</td><td>Solo para compilar</td></tr>
                <tr><td>JS</td><td>Del consumidor</td><td>Necesario para togglear <code>--visible</code> y gestionar foco/teclado</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Clases</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Aplica</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-helper-overlay-modal</code></td><td><code>position: fixed</code> (0 0 0 0) · <code>z-index: 100</code> · <code>opacity: 0.7</code> · <code>background: var(--color-black)</code> · <code>display: none</code></td></tr>
                <tr><td><code>.ft-helper-overlay-modal--visible</code></td><td><code>display: block</code></td></tr>
            </tbody>
        </table>

        <h2>Composición sugerida</h2>
        <ul>
            <li>Modal por encima del overlay con <code>z-index ≥ 101</code> y <code>role="dialog" aria-modal="true"</code>.</li>
            <li>Capturar foco dentro del modal mientras esté abierto (focus trap).</li>
            <li>Escuchar <code>Escape</code> para cerrar.</li>
            <li>Sincronizar <code>aria-expanded</code> del trigger.</li>
            <li>Para diálogos complejos prefiere el componente del DS (<code>.ft-mol-modal</code>) en vez de componer a mano.</li>
        </ul>
        <div class="cb-callout">El helper es solo el backdrop. La gestión accesibilidad/foco/teclado es responsabilidad del consumidor o del componente <code>.ft-mol-modal</code>.</div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-helper-overlay-modal</code></td></tr>
                <tr><td>Modificador</td><td><code>--visible</code></td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_overlays.scss</code> · showroom: <code>fourty/helpers/helper-overlay.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const OVERLAY = {
        id: "overlay",
        name: "Overlay",
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
                    { id: "modal", name: "Modal sobre overlay", kind: "gallery", full: true, render: galleryModalPattern }
                ]
            }
        ]
    };
    window.SB.register(OVERLAY);
    window.SB.loadMarkup(OVERLAY, document.currentScript && document.currentScript.src, { full: true });
})();
