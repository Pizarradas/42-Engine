/* ════════════════════════════════════════════════════════════════════════
   organisms/scoreboard/scoreboard.js — Organisms / Scoreboard
   Casuística REAL de scss/fourties/organism/scoreboard/_scoreboard.scss (.ft-org-scoreboard).
   Markup VERBATIM de fourty/organisms/organism-scoreboard.html. Cero invención de API.

   Criterio ORGANISMOS: controles MÍNIMOS (un solo select de variante, o ninguno). La
   fidelidad la aporta el MARKUP — construcción literal del showroom. Rutas normalizadas
   (../../cds-statics → /cds-statics).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";

    /* ▼ SINGLE SOURCE OF TRUTH — markup verbatim por variante ▼ */
    const VARIANTS = {
        "base": `<div class="ft-org-scoreboard" data-spy="affix" data-offset="40">
                                                <span class="ft-org-scoreboard__match-name">
                                                    Copa Mundail Femenina 2023 Australia / New Zeland, Octavos de Final
                                                </span>
                                                <div class="ft-date">
                                                    <div class="ft-date__text">
                                                      <span class="ft-date__textPlace">	Stadium Australia</span>
                                                      <time class="ft-date__textTime" itemprop="datePublished" datetime="2011-11-18T14:54:39+00:00">07/08/2023.</time>
                                                    </div>
                                                 
                                                 </div>
                                                <!-- Comienzo Molécula Marcador -->
                                                <div class="ft-mol-scoreboard" role="region" aria-label="Marcador del partido Borussia Mönchengladbach vs Borussia Mönchengladbach">
                                                    <div class="ft-mol-scoreboard__col-lft" aria-label="Equipo local: Borussia Mönchengladbach">
                                                        <div class="ft-mol-scoreboard__brief">
                                                            <span class="ft-mol-scoreboard__club">Borussia Mönchengladbach</span>
                                                            <ul class="ft-mol-scoreboard-event-list">
                                                            <li class="ft-mol-scoreboard-event-list__item">
                                                                Pedri
                                                                <time datetime="2022-05-17T12:00">90'</time>
                                                            </li>
                                                            <li class="ft-mol-scoreboard-event-list__item">
                                                                Frenkie de Jong
                                                                <time datetime="2022-05-17T12:00">78'</time>
                                                            </li>
                                                            <li class="ft-mol-scoreboard-event-list__item">
                                                                Pedri
                                                                <time datetime="2022-05-17T12:00">45'</time>
                                                            </li>
                                                            </ul>
                                                        </div>
                                                        <div class="ft-mol-scoreboard__shield">
                                                            <img src="/cds-statics/assets/img/team-shields/spain/sporting-gijon.svg"
                                                                class="ft-helper-img-rd"
                                                                title="title text"
                                                                alt="Escudo Borussia Mönchengladbach" />
                                                        </div>
                                                        </div>                                              
                                                        <div class="ft-mol-scoreboard__col-cnt" aria-label="Resultado: 123 - 123, Fin del partido">
                                                        <span class="ft-mol-scoreboard__score">123</span>
                                                        <span class="ft-mol-scoreboard__score">123</span>
                                                        <time datetime="2022-05-17T12:00" class="ft-mol-scoreboard__state">Fin</time>
                                                        </div>                                              
                                                        <div class="ft-mol-scoreboard__col-rgt" aria-label="Equipo visitante: Borussia Mönchengladbach">
                                                        <div class="ft-mol-scoreboard__brief">
                                                            <span class="ft-mol-scoreboard__club">Borussia Mönchengladbach</span>
                                                            <ul class="ft-mol-scoreboard-event-list">
                                                            <li class="ft-mol-scoreboard-event-list__item">
                                                                Pedri
                                                                <time datetime="2022-05-17T12:00">90'</time>
                                                            </li>
                                                            <li class="ft-mol-scoreboard-event-list__item">
                                                                Frenkie de Jong
                                                                <time datetime="2022-05-17T12:00">78'</time>
                                                            </li>
                                                            <li class="ft-mol-scoreboard-event-list__item">
                                                                Pedri
                                                                <time datetime="2022-05-17T12:00">45'</time>
                                                            </li>
                                                            </ul>
                                                        </div>
                                                        <div class="ft-mol-scoreboard__shield">
                                                            <img src="/cds-statics/assets/img/team-shields/spain/fc-barcelona.svg"
                                                                class="ft-helper-img-rd"
                                                                title="title text"
                                                                alt="Escudo Borussia Mönchengladbach" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- Fin // Molécula Marcador -->
                                                <!-- Comienzo Molécula Tab -->
                                                <div class="ft-mol-tab">
                                                    <ul class="ft-mol-tab__nav" role="tablist">
                                                        <li class="ft-mol-tab__header">
                                                            <a href="#" class="ft-mol-tab__link ft-helper-fontSize-body-M ft-helper-fontWeight-700" aria-selected="true">
                                                                Alineaciones
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-tab__header">
                                                            <a href="#" class="ft-mol-tab__link ft-helper-fontSize-body-M  ft-helper-fontWeight-700">
                                                                Directo
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-tab__header">
                                                            <a href="#" class="ft-mol-tab__link ft-helper-fontSize-body-M  ft-helper-fontWeight-700">
                                                                Estadísticas
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    <span class="ft-mol-tab__bar"></span>
                                                </div>
                                                <!-- Fin // Molécula Tab -->
                                            </div>`
    };

    const baseArgTypes = [];
    const baseArgs = {};

    function live() {
        return VARIANTS["base"];
    }

    const overview = `<div class="cb-docs__inner">
        <h1>Scoreboard</h1>
        <p class="cb-docs__lead">Organismo del 42DS (<code>.ft-org-scoreboard</code>): marcador amplio de partido — escudos, nombres, resultado y estado, pensado como sección destacada. id único <code>scoreboard-org</code> (colisiona con la molécula homónima <code>.ft-mol-scoreboard</code>).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/organism/scoreboard.css</code></td><td>CSS del organismo</td><td>Siempre</td></tr>
                <tr><td>Escudos de equipo</td><td>Assets</td><td>Los aporta el medio (deportivo)</td></tr>
                <tr><td>JS (feed en directo)</td><td>JavaScript</td><td>En producción. Aquí estático.</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">No confundir con la <strong>molécula</strong> <code>.ft-mol-scoreboard</code> (ya migrada): este es el organismo de sección <code>.ft-org-scoreboard</code>. Resultado/estado en producción los pinta el feed deportivo; aquí, estático.</div>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas (deportivas). Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/organism/scoreboard/_scoreboard.scss</code> · markup: <code>fourty/organisms/organism-scoreboard.html</code></p>
    </div>`;

    const DEF = {
        id: "scoreboard-org",
        name: "Scoreboard",
        group: "Organisms",
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(DEF);
    window.SB.loadMarkup(DEF, document.currentScript && document.currentScript.src, { full: true });
})();
