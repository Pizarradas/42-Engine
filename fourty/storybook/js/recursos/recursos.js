/* ════════════════════════════════════════════════════════════════════════
   42DS Storybook — ÍNDICE: Recursos (group "Recursos")
   ────────────────────────────────────────────────────────────────────────
   Páginas-recurso LIMPIAS que viven DENTRO del storybook (pages/), NO en fourty/recursos/
   (esa carpeta se movió a __old-showroom; backup, no se referencia en runtime). Cada recurso
   se extrajo del rendered-content del showroom (sin andamiaje overview-panel/code-container),
   con rutas de assets normalizadas a /cds-statics. kind:"page": el iframe navega al fichero.
   brandable:false. Requiere SERVIDOR. La landing "Home" del showroom (índice de sección) se
   descartó: el sidebar del storybook ya hace esa navegación.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    var slug = function (s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'x'; };
    var BASE = "storybook/js/recursos/pages/";   // relativo a fourty/index.html
        window.SB.register({
            id: "recursos-recursos", name: "Recursos", group: "Recursos",
            overview: "<div class=\"cb-docs__inner\"><h1>Recursos · Recursos</h1><p class=\"cb-docs__lead\">1 página-recurso que vive dentro del storybook (<code>storybook/js/recursos/pages/</code>). Corre su propio CSS y sus scripts. Sin controles: usa <strong>Viewport</strong>, <strong>Visión</strong> y <strong>Fullscreen</strong>.</p><h2>Páginas</h2><table class=\"cb-table\"><thead><tr><th>Nombre</th><th>Fichero</th></tr></thead><tbody><tr><td>Img path y anchor url</td><td><code>pages/recurso-changepathandurl.html</code></td></tr></tbody></table><p class=\"cb-src\">Fuente: <code>fourty/storybook/js/recursos/pages/</code> (extraído del rendered-content del showroom)</p></div>",
            stories: [
            { id: slug("Recursos-recurso-changepathandurl"), name: "Img path y anchor url", kind: "page", src: BASE + "recurso-changepathandurl.html", brandable: false }
            ]
        });
})();
