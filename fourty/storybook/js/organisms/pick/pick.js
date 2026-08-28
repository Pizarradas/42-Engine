/* ════════════════════════════════════════════════════════════════════════
   organisms/pick/pick.js — Organisms / Pick
   Casuística REAL de scss/fourties/organism/pick/_pick.scss (.ft-org-pick).
   Markup VERBATIM de fourty/organisms/organism-pick.html. Cero invención de API.

   Criterio ORGANISMOS: controles MÍNIMOS (un solo select de variante, o ninguno). La
   fidelidad la aporta el MARKUP — construcción literal del showroom. Rutas normalizadas
   (../../cds-statics → /cds-statics).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";

    /* ▼ SINGLE SOURCE OF TRUTH — markup verbatim por variante ▼ */
    const VARIANTS = {
        "base": `<!-- ORG: pick -->
                                            <section class="ft-org-pick" aria-labelledby="pick-title" lang="es"
                                                role="region">

                                                <!-- mol: pick -->
                                                <article class="ft-mol-pick" aria-label="Resultado del pronóstico del partido">
                                                <div class="ft-mol-pick__card">

                                                    <div class="ft-mol-pick__body">
                                                        
                                                        <div class="ft-mol-pick__match">
                                                            <button class="ft-mol-pick__team ft-mol-pick__team-selected">
                                                                <span class="ft-mol-pick__flag">
                                                                    <img src="/cds-statics/assets/img/flags/england.svg" alt="Inglaterra">
                                                                </span>
                                                                <span class="ft-mol-pick__team-name">Inglaterra</span>
                                                            </button>
                                                
                                                            <button class="ft-mol-pick__team" aria-label="Resultado 2 a 4">
                                                                <span class="ft-mol-pick__outcome">Empate</span>
                                                                <span class="ft-mol-pick__score">2 - 4</span>
                                                                <span class="ft-mol-pick__score-breakdown">(1) - (2)</span>
                                                            </button>
                                                
                                                            <button class="ft-mol-pick__team">
                                                                <span class="ft-mol-pick__team-name">Rep. Corea</span>
                                                                <span class="ft-mol-pick__flag">
                                                                    <img src="/cds-statics/assets/img/flags/south_korea.svg" alt="Corea del Sur">
                                                                </span>
                                                            </button>
                                                        </div>
                                                
                                                        <div class="ft-mol-pick__meta">
                                                            <div class="ft-mol-pick__status ft-mol-pick__status--live">
                                                                <span class="ft-mol-pick__status-label">
                                                                    En directo
                                                                    <time itemprop="datePublished" datetime="2026-06-14T20:00:00+00:00">14 jun - 20:00</time>
                                                                </span>
                                                                <span class="ft-mol-pick__status-time">67'</span>
                                                                <span class="ft-mol-pick__points">+ 2 PTS.</span>
                                                            </div>
                                                
                                                            <div class="ft-mol-pick__forecast">
                                                                <span class="ft-mol-pick__forecast-label">Mi pronóstico</span>
                                                                <span class="ft-mol-pick__forecast-value">3-3</span>
                                                
                                                                <button class="ft-mol-pick__edit ft-btn-nav ft-btn-nav--edit" type="button" aria-label="Editar pronóstico">
                                                                    <span class="ft-btn-nav__text">Editar</span>
                                                                    <span class="ft-btn-nav__icon"></span>
                                                                </button>
        
                                                                <button class="ft-mol-pick__add ft-btn-nav ft-btn-nav--plus" type="button" name="go-to" title="title text">
                                                                    <span class="ft-btn-nav__text">Más</span>
                                                                    <span class="ft-btn-nav__icon"></span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>

                                                    <div class="ft-mol-pick__event">
                                                        <time itemprop="datePublished" datetime="2026-06-14T20:00:00+00:00">14 jun - 20:00</time>
                                                        &nbsp;
                                                        <span>Estadio Ciudad de México</span>
                                                    </div>

                                                    <div class="ft-mol-pick__poll" aria-label="Pronósticos más votados">
                                                        <p class="ft-mol-pick__poll-title">Lo más votado por la mayoría</p>
                                                    
                                                        <div class="ft-mol-bar ft-mol-bar--stacked">
                                                            <div class="ft-mol-bar__background">
                                                                <div class="ft-mol-bar__background-inProgress" style="background-color: #D8012B; width: 55%;"></div>
                                                                <div class="ft-mol-bar__background-inProgress ft-helper-bgColor-background-mediumGrey" style="width: 3%;"></div>
                                                                <div class="ft-mol-bar__background-inProgress" style="background-color: #143C8B; width: 42%;"></div>
                                                            </div>
                                                        </div>
                                                    
                                                        <div class="ft-mol-pick__poll-options">
                                                            <span class="ft-mol-pick__poll-option">
                                                                Inglaterra
                                                                <span class="ft-mol-pick__poll-value">55%</span>
                                                            </span>
                                                    
                                                            <span class="ft-mol-pick__poll-option">
                                                                Empate
                                                                <span class="ft-mol-pick__poll-value">3%</span>
                                                            </span>
                                                    
                                                            <span class="ft-mol-pick__poll-option">
                                                                Rep. Corea
                                                                <span class="ft-mol-pick__poll-value">42%</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="ft-mol-pick__reward">
                                                        Clavaste el 1-0 · +2 al bolsillo
                                                    </div>
                                                        
                                                </div>
                                                </article>
                                                <!-- end // mol: pick -->
                                            </section>
                                            <!-- end // ORG: pick -->`
    };

    const baseArgTypes = [];
    const baseArgs = {};

    function live() {
        return VARIANTS["base"];
    }

    const overview = `<div class="cb-docs__inner">
        <h1>Pick</h1>
        <p class="cb-docs__lead">Organismo del 42DS (<code>.ft-org-pick</code>): sección de pronósticos/porra — agrupa tarjetas de pronóstico de partidos. id único <code>pick-org</code> (colisiona con la molécula homónima <code>.ft-mol-pick</code>).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/organism/pick.css</code></td><td>CSS del organismo</td><td>Siempre</td></tr>
                <tr><td><code>molecules/pick</code></td><td>CSS de la tarjeta interna</td><td>Siempre</td></tr>
                <tr><td>JS (reloj en directo, pronóstico)</td><td>JavaScript</td><td>En producción. Aquí estático.</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">No confundir con la <strong>molécula</strong> <code>.ft-mol-pick</code> (la tarjeta, ya migrada): este es el organismo de sección <code>.ft-org-pick</code> que la agrupa. Estado estático honesto (el reloj en directo y el pronóstico los gobierna el JS del consumidor).</div>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas. Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/organism/pick/_pick.scss</code> · markup: <code>fourty/organisms/organism-pick.html</code></p>
    </div>`;

    const DEF = {
        id: "pick-org",
        name: "Pick",
        group: "Organisms",
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(DEF);
    window.SB.loadMarkup(DEF, document.currentScript && document.currentScript.src, { full: true });
})();
