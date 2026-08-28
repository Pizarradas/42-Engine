/* ════════════════════════════════════════════════════════════════════════
   organisms/search-autocomplete/search-autocomplete.js — Organisms / Search Autocomplete
   Casuística REAL de scss/fourties/organism/search-autocomplete/_search-autocomplete.scss (.ft-org-search-autocomplete).
   Markup VERBATIM de fourty/organisms/organism-search-autocomplete.html. Cero invención de API.

   Criterio ORGANISMOS: controles MÍNIMOS (un solo select de variante, o ninguno). La
   fidelidad la aporta el MARKUP — construcción literal del showroom. Rutas normalizadas
   (../../cds-statics → /cds-statics).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const frameworkBlock = window.SB.helpers.frameworkBlock;

    /* ▼ SINGLE SOURCE OF TRUTH — markup verbatim por variante ▼ */
    const VARIANTS = {
        "base": `<div class="ft-org-search-autocomplete">
                                                <div class="ft-org-search-autocomplete__content">
                                                    <p class="ft-helper-fontSize-body-XL--small ft-helper-fontColor-tertiary ft-helper-text-align-center">
                                                        <strong>Busca y selecciona tus localidades favoritas</strong>
                                                        para acceder a las noticias que más te importan
                                                    </p>
                                                    <form action="/cerca/" method="get" role="search" aria-label="Búsqueda de localidades"
                                                        data-search-min-length="2" data-search-debounce="300" data-search-context="localidades"
                                                        data-search-id="search-form-example" data-search-state="idle" novalidate>
                                                        <div class="ft-mol-form ft-mol-form--has-label ft-mol-form--has-supporting-text ft-mol-form-search ft-mol-form-search--has-search-icon"
                                                            data-search-wrapper="true">
                                                            <input type="search" id="search-input-example" class="ft-mol-form__input" name="localidad"
                                                                placeholder=" " autocomplete="address-level2" spellcheck="false"
                                                                aria-label="Busca tu localidad"
                                                                aria-describedby="search-help search-results-status search-error-msg"
                                                                aria-required="false" aria-invalid="false" aria-expanded="false"
                                                                aria-controls="search-results-list" aria-autocomplete="list" aria-haspopup="listbox"
                                                                data-search-input="true" data-search-id="search-input-example"
                                                                title="Busca tu localidad escribiendo el nombre de tu ciudad o pueblo"
                                                                maxlength="50" inputmode="text" value="">
                                                            <label for="search-input-example" class="ft-mol-form__label">Busca tu localidad</label>
                                                            <div id="search-error-msg" class="ft-mol-form__error-msg" aria-live="polite">
                                                                <span id="search-error-msg__text">
                                                                    Por favor, introduce un término de búsqueda válido.
                                                                </span>
                                                            </div>
                                                            <button type="submit" class="ft-mol-form__submit ft-helper-hide"
                                                                aria-label="Buscar localidad" data-search-submit="true">
                                                                Buscar
                                                            </button>
                                                            <div id="search-results-wrapper" class="ft-mol-form__results-wrapper ft-helper-hide"
                                                                data-search-results-wrapper="true">
                                                                <div id="search-results-container" class="ft-mol-form__results-container"
                                                                    data-search-results-container="true">
                                                                    <div class="ft-mol-form__results-loading ft-helper-hide"
                                                                        id="search-results-loading" role="status" aria-live="polite"
                                                                        aria-label="Buscando localidades">
                                                                        <p class="ft-helper-fontSize-body-S">Buscando...</p>
                                                                    </div>
                                                                    <div class="ft-mol-form__results-empty ft-helper-hide"
                                                                        id="search-results-empty" role="status" aria-live="polite">
                                                                        <p class="ft-helper-fontSize-body-S">No se encontraron localidades</p>
                                                                    </div>
                                                                    <div class="ft-mol-form__results-error ft-helper-hide"
                                                                        id="search-results-error" role="alert" aria-live="assertive">
                                                                        <p class="ft-helper-fontSize-body-S">Error en la búsqueda</p>
                                                                    </div>
                                                                    <ul id="search-results-list" class="ft-mol-form__results-list" role="listbox"
                                                                        aria-label="Resultados de búsqueda" data-search-results-list="true"
                                                                        data-results-count="0">
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div id="search-results-status" class="ft-helper-hide" role="status" aria-live="polite"
                                                                aria-atomic="true">
                                                                <span id="search-results-status-text" data-results-status-text=""></span>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>`
    };

    const baseArgTypes = [];
    const baseArgs = {};

    function live() {
        return VARIANTS["base"];
    }

    const framework = frameworkBlock({
        intro: `Search Autocomplete encaja bien como organismo controlado por estado: query, resultados, loading, error y seleccion deberian vivir en la capa reactiva del framework.`,
        rows: [
            ["Query + resultados", `Manten query, loading y resultados en estado reactivo y proyecta desde ahi los estados <code>idle/loading/empty/error</code>.`, `Manten query, loading y resultados en estado y proyecta desde ahi los estados <code>idle/loading/empty/error</code>.`],
            ["Peticiones", `Haz debounce en cliente y cancela fetches pendientes al cambiar la query o desmontar la vista.`, `Haz debounce en cliente y cancela fetches pendientes al cambiar la query o desmontar la vista.`],
            ["A11y", `Conserva <code>listbox</code>, <code>option</code>, <code>aria-expanded</code> y un id estable por resultado si implementas navegacion por teclado.`, `Conserva <code>listbox</code>, <code>option</code>, <code>aria-expanded</code> y un id estable por resultado si implementas navegacion por teclado.`]
        ],
        note: `Si reutilizas el JS predictivo de <code>ft-mol-form</code>, el framework deberia seguir siendo duenio del datasource y del ciclo de vida de las peticiones.`
    });

    const overview = `<div class="cb-docs__inner">
        <h1>Search Autocomplete</h1>
        <p class="cb-docs__lead">Organismo del 42DS (<code>.ft-org-search-autocomplete</code>): buscador con sugerencias — campo de búsqueda y panel de resultados/autocompletado.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/organism/search-autocomplete.css</code></td><td>CSS del organismo</td><td>Siempre</td></tr>
                <tr><td><code>molecules/form</code></td><td>CSS del campo de búsqueda</td><td>Siempre</td></tr>
                <tr><td>JS (autocompletado real)</td><td>JavaScript</td><td>En producción (sugerencias en vivo). Aquí estático.</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Estado <strong>estático honesto</strong>: las sugerencias en vivo las gobierna el JS del consumidor; aquí se muestra el markup del showroom (campo + resultados de ejemplo).</div>
        ${framework}

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-org-search-autocomplete</code></td></tr>
                <tr><td>Campo</td><td><code>.ft-mol-form</code> (búsqueda)</td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas. Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/organism/search-autocomplete/_search-autocomplete.scss</code> · markup: <code>fourty/organisms/organism-search-autocomplete.html</code></p>
    </div>`;

    const DEF = {
        id: "search-autocomplete",
        name: "Search Autocomplete",
        group: "Organisms",
        signals: ["js"],
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(DEF);
    window.SB.loadMarkup(DEF, document.currentScript && document.currentScript.src, { full: true });
})();
