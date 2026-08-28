/* ════════════════════════════════════════════════════════════════════════
   42DS Storybook — ÍNDICE: Widgets (group "Widgets")
   ────────────────────────────────────────────────────────────────────────
   Páginas-widget LIMPIAS que viven DENTRO del storybook (pages/), NO en fourty/widgets/
   (esa carpeta se movió a __old-showroom; backup, no se referencia en runtime). Cada widget
   se extrajo del rendered-content del showroom (sin andamiaje overview-panel/code-container),
   con rutas de assets normalizadas a /cds-statics. kind:"page": el iframe navega al fichero →
   su propio CSS/JS (chart-pie, svg-map) corre → el widget RENDERIZA y funciona. brandable:false.
   Requiere SERVIDOR. La landing "Home" del showroom (índice de sección) se descartó: el sidebar
   del storybook ya hace esa navegación.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    var slug = function (s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'x'; };
    var BASE = "storybook/js/widgets/pages/";   // relativo a fourty/index.html
        window.SB.register({
            id: "widgets-widgets", name: "Widgets", group: "Widgets",
            overview: "<div class=\"cb-docs__inner\"><h1>Widgets · Widgets</h1><p class=\"cb-docs__lead\">2 páginas-widget completas que viven dentro del storybook (<code>storybook/js/widgets/pages/</code>). Cada una corre su propio CSS y sus scripts (charts, mapas). Sin controles: usa <strong>Viewport</strong>, <strong>Visión</strong> y <strong>Fullscreen</strong>.</p><h2>Páginas</h2><table class=\"cb-table\"><thead><tr><th>Nombre</th><th>Fichero</th></tr></thead><tbody><tr><td>Elecciones</td><td><code>pages/widget-elecciones.html</code></td></tr><tr><td>Juegos Olímpicos 2024</td><td><code>pages/widget-jjoo2024paris.html</code></td></tr></tbody></table><p class=\"cb-src\">Fuente: <code>fourty/storybook/js/widgets/pages/</code> (extraído del rendered-content del showroom)</p></div>",
            stories: [
            { id: slug("Widgets-widget-elecciones"), name: "Elecciones", kind: "page", src: BASE + "widget-elecciones.html", brandable: false },
            { id: slug("Widgets-widget-jjoo2024paris"), name: "Juegos Olímpicos 2024", kind: "page", src: BASE + "widget-jjoo2024paris.html", brandable: false }
            ]
        });
})();
