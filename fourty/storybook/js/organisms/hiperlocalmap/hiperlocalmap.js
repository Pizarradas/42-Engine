/* ════════════════════════════════════════════════════════════════════════
   organisms/hiperlocalmap/hiperlocalmap.js — Organisms / Hiperlocal map
   ────────────────────────────────────────────────────────────────────────
   `.ft-org-hiperlocalmap` es un showcase de mapa JS (Leaflet): NO es un organismo
   canónico del DS (no existe SCSS en scss/fourties/organism/ ni CSS compilado); se
   autoestila con <style> inline y se pinta en runtime con Leaflet + scripts de init.

   Por eso NO se puede inyectar como fragmento (innerHTML no ejecuta scripts → mapa
   vacío). Se publica como stories kind:"page": el iframe NAVEGA a una PÁGINA VIVA
   autocontenida que vive DENTRO de esta carpeta del storybook — pages/<variante>.html
   — extraída del rendered-content del showroom (sin andamiaje overview-panel/code),
   con su Leaflet (css/js) + el script de init y las rutas normalizadas a /cds-statics.
   El iframe corre Leaflet → el mapa RENDERIZA de verdad.

   ⚠ NO se referencia el backup __old-showroom en runtime. brandable:true (las páginas
   traen #brandStyles-root/#brandStyles + estilos inline .ft-brand-* → Brand conmuta).
   3 variantes del showroom: Local (leaflet local), URL y Fullwidth (leaflet CDN).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";

    var BASE = "storybook/js/organisms/hiperlocalmap/pages/";   // relativo a fourty/index.html

    var PAGES = [
        { id: "local", n: "Local", f: "local.html" },
        { id: "url", n: "URL", f: "url.html" },
        { id: "fullwidth", n: "Fullwidth", f: "fullwidth.html" }
    ];

    var esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };

    var stories = PAGES.map(function (p) {
        return { id: p.id, name: p.n, kind: "page", src: BASE + p.f, brandable: true };
    });

    var rows = PAGES.map(function (p) {
        return '<tr><td>' + esc(p.n) + '</td><td><code>' + esc("pages/" + p.f) + '</code></td></tr>';
    }).join("");
    var framework = window.SB.helpers.frameworkBlock({
        intro: 'Leaflet debe tratarse como integracion client-only. El framework deberia controlar filtros, markers y datos, mientras que el vendor mantiene el canvas del mapa y sus listeners internos.',
        rows: [
            ["Inicializacion", "Carga Leaflet en <code>onMounted()</code> y crea el mapa cuando el contenedor ya tenga alto real.", "Carga Leaflet en <code>useEffect()</code> y crea el mapa cuando el contenedor ya tenga alto real."],
            ["Visibilidad", "Si el mapa vive en tabs, accordions o modales, llama a <code>invalidateSize()</code> tras mostrarse.", "Si el mapa vive en tabs, accordions o modales, llama a <code>invalidateSize()</code> tras mostrarse."],
            ["Cleanup", "Destruye instancia, markers y listeners en <code>onBeforeUnmount()</code> para evitar fugas de memoria.", "Destruye instancia, markers y listeners en el cleanup del efecto para evitar fugas de memoria."]
        ],
        note: "No intentes hidratar el mapa en SSR. Renderiza un placeholder o skeleton en servidor y difiere Leaflet completamente al cliente."
    });

    var overview = '<div class="cb-docs__inner">'
        + '<h1>Hiperlocal map</h1>'
        + '<p class="cb-docs__lead">Mapa hiperlocal interactivo (Leaflet) — showcase del showroom. <code>.ft-org-hiperlocalmap</code> NO es un organismo canónico del DS (sin SCSS): es una página JS-driven que se autoestila y se pinta en runtime.</p>'

        + '<div class="cb-callout"><strong>Stories vivas (kind:"page").</strong> Cada variante carga una página completa <strong>propia del storybook</strong> (<code>pages/&lt;variante&gt;.html</code>) con su Leaflet y su script de init. Por eso el <strong>mapa renderiza de verdad</strong> y es interactivo. Globales útiles: <strong>Viewport</strong>, <strong>Visión</strong>, <strong>Fullscreen</strong>, <strong>Brand</strong>.</div>'

        + '<h2>Dependencias</h2>'
        + '<div class="cb-deps"><table class="cb-table">'
        + '<thead><tr><th>Dependencia</th><th>Tipo</th></tr></thead><tbody>'
        + '<tr><td><code>/cds-statics/js/vendors/maps/leaflet.js</code> (+ leaflet.css)</td><td>JS · librería de mapa (variante Local)</td></tr>'
        + '<tr><td>Leaflet CDN (estaticos-cdn.elperiodico.com)</td><td>JS · variantes URL / Fullwidth</td></tr>'
        + '<tr><td>script de init inline + <code>&lt;style&gt;</code> propio</td><td>JS/CSS · el mapa se autoestila (sin SCSS canónico)</td></tr>'
        + '<tr><td><code>setting.css</code> + <code>ux-index.css</code></td><td>CSS de marca (conmutable)</td></tr>'
        + '</tbody></table></div>'
        + framework

        + '<h2>Variantes</h2>'
        + '<table class="cb-table"><thead><tr><th>Variante</th><th>Página (storybook)</th></tr></thead><tbody>'
        + rows + '</tbody></table>'

        + '<div class="cb-callout">Requiere <strong>servidor</strong> (Leaflet por URL); las variantes URL/Fullwidth además requieren <strong>red</strong> (CDN). Sin conexión el mapa de esas dos no pinta; el de Local (leaflet servido del propio DS) sí.</div>'

        + '<p class="cb-src">Markup: <code>fourty/storybook/js/organisms/hiperlocalmap/pages/*.html</code> (extraído del rendered-content del showroom)</p>'
        + '</div>';

    window.SB.register({
        id: "hiperlocalmap",
        name: "Hiperlocal map",
        group: "Organisms",
        signals: ["js"],
        overview: overview,
        stories: stories
    });
})();
