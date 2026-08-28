/* ════════════════════════════════════════════════════════════════════════
   organisms/path/path.js — Organisms / Path
   Casuística REAL de scss/fourties/organism/path/_path.scss (.ft-org-path).
   Markup VERBATIM de fourty/organisms/organism-path.html. Cero invención de API.

   Criterio ORGANISMOS: controles MÍNIMOS (un solo select de variante, o ninguno). La
   fidelidad la aporta el MARKUP — construcción literal del showroom. Rutas normalizadas
   (../../cds-statics → /cds-statics).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";

    /* ▼ SINGLE SOURCE OF TRUTH — markup verbatim por variante ▼ */
    const VARIANTS = {
        "base": `<!-- ORG: path -->
                                            <div class="ft-org-path">
                                                <!-- mol: path -->
                                                <nav class="ft-mol-path" aria-label="Ruta y navegación contextual">
                                                    <!-- level 1: trail -->
                                                    <ul class="ft-mol-path__trail" aria-label="Migas de pan">
                                                        <li class="ft-mol-path__item">
                                                            <a href="#" class="ft-mol-path__link" title="title text"
                                                                target="_self">
                                                                Trail Item 1
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-path__item">
                                                            <a href="#" class="ft-mol-path__link" title="title text"
                                                                target="_self">
                                                                Trail Item 2
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-path__item">
                                                            <h1 class="ft-mol-path__heading" aria-current="page">
                                                                Heading
                                                            </h1>
                                                        </li>
                                                    </ul>

                                                    <!-- level 2: rail / tabs: MOBILE -->
                                                    <details
                                                        class="ft-mol-path__rail-mobile ft-mol-path__rail-mobile-scroll">
                                                        <summary class="ft-mol-path__trigger"
                                                            aria-controls="path-rail-list-3" aria-expanded="false"
                                                            aria-label="Mostrar navegación secundaria">
                                                            Más
                                                        </summary>
                                                        <ul id="path-rail-list-3" class="ft-mol-path__list"
                                                            aria-label="Secciones relacionadas">
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self" aria-current="page">
                                                                    Rail Item 1
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 2
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 3
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 4
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 5
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 6
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 7
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 8
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 9
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 10
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 11
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 12
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 13
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 14
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 15
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 16
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 17
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 18
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </details>

                                                    <!-- level 2: rail / tabs: DESKTOP -->
                                                    <div data-scrollbar data-scrollbar-axis="x"
                                                        data-scrollbar-wheel-to-x="true"
                                                        data-scrollbar-announce-scroll="true" role="scrollbar"
                                                        aria-label="Barra de desplazamiento horizontal"
                                                        aria-orientation="horizontal"
                                                        aria-controls="ft-mol-path-rail-desktop">
                                                        <ul class="ft-mol-path__rail-desktop ft-scrollbar__container"
                                                            id="ft-mol-path-rail-desktop"
                                                            aria-label="Secciones relacionadas" tabindex="0">
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self" aria-current="page">
                                                                    Rail Item 1
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 2
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 3
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 4
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 5
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 6
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 7
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 8
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 9
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 10
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 11
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 12
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 13
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 14
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 15
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 16
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 17
                                                                </a>
                                                            </li>
                                                            <li class="ft-mol-path__item">
                                                                <a href="#" class="ft-mol-path__link" title="title text"
                                                                    target="_self">
                                                                    Rail Item 18
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>


                                                    <!-- level 3: espacio promocional -->
                                                    <div class="ft-mol-path__promo">
                                                        <a href="#" class="ft-mol-path__promo-link"
                                                            rel="sponsored nofollow"
                                                            aria-label="Visitar Patrocinador X">
                                                            <span>
                                                                Enlace promocional
                                                            </span>
                                                        </a>
                                                    </div>

                                                </nav>
                                                <!-- end // mol: path -->
                                            </div>
                                            <!-- end // ORG: path -->`
    };

    const baseArgTypes = [];
    const baseArgs = {};

    function live() {
        return VARIANTS["base"];
    }

    const overview = `<div class="cb-docs__inner">
        <h1>Path</h1>
        <p class="cb-docs__lead">Organismo del 42DS (<code>.ft-org-path</code>): carril de navegación contextual de sección — miga, niveles y enlaces de apoyo en un riel desplazable. id único <code>path-org</code> (colisiona con la molécula homónima <code>.ft-mol-path</code>).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/organism/path.css</code></td><td>CSS del organismo</td><td>Siempre</td></tr>
                <tr><td><code>vendors/smooth-scrollbar</code></td><td>JavaScript</td><td>Riel desktop (en el storybook → scroll nativo)</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">No confundir con la <strong>molécula</strong> <code>.ft-mol-path</code> (ya migrada): este es el organismo de sección <code>.ft-org-path</code>. El riel usa smooth-scrollbar en producción; aquí, overflow nativo.</div>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas. Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/organism/path/_path.scss</code> · markup: <code>fourty/organisms/organism-path.html</code></p>
    </div>`;

    const DEF = {
        id: "path-org",
        name: "Path",
        group: "Organisms",
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(DEF);
    window.SB.loadMarkup(DEF, document.currentScript && document.currentScript.src, { full: true });
})();
