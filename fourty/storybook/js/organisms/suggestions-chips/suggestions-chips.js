/* organisms/suggestions-chips/suggestions-chips.js - Organisms / Suggestions Chips */
(function () {
    "use strict";
    const frameworkBlock = window.SB.helpers.frameworkBlock;
    const deprecationBlock = window.SB.helpers.deprecationBlock;

    const VARIANTS = {
        base: `<div class="ft-org-suggestions-chips" id="suggestions-chips-example"
                    data-suggestions-container="true"
                    data-suggestions-count="3" data-suggestions-loaded="true">
                    <div class="ft-org-suggestions-chips__content">
                        <h3 class="ft-helper-fontSize-heading-XS ft-helper-text-align-center">
                            Te sugerimos
                        </h3>
                        <section role="region"
                            aria-label="Listado de localidades disponibles" data-suggestions-section="true">
                            <h4 class="ft-helper-hide">
                                Localidades disponibles
                            </h4>
                            <ul role="list" aria-label="Listado de localidades" class="ft-cerca-localidades-list__tags"
                                id="suggestions-list-example" itemscope itemtype="https://schema.org/ItemList"
                                data-localidades-list="true" data-suggestions-list="true" data-suggestions-total="3">
                                <li class="ft-tag ft-tag--chip ft-tag--md" data-tag-id="loc-example-1"
                                    data-tag-type="city" data-tag-region="Cataluna"
                                    data-tag-context="favorites-selector" data-tag-state="unselected"
                                    data-tag-slug="barcelona" data-analytics-category="ciudades"
                                    data-analytics-action="fav_toggle" data-analytics-label="Barcelona"
                                    itemprop="itemListElement" itemscope itemtype="https://schema.org/City">
                                    <meta itemprop="name" content="Barcelona">
                                    <meta itemprop="addressRegion" content="Cataluna">
                                    <meta itemprop="addressCountry" content="ES">
                                    <meta itemprop="addressLocality" content="Barcelona">
                                    <button type="button" class="ft-btn" aria-pressed="false"
                                        aria-label="Marcar Barcelona como ciudad favorita"
                                        title="Marcar Barcelona como ciudad favorita">
                                        Barcelona
                                    </button>
                                </li>
                                <li class="ft-tag ft-tag--chip ft-tag--md" data-tag-id="loc-example-2"
                                    data-tag-type="city" data-tag-region="Cataluna"
                                    data-tag-context="favorites-selector" data-tag-state="unselected"
                                    data-tag-slug="badalona" data-analytics-category="ciudades"
                                    data-analytics-action="fav_toggle" data-analytics-label="Badalona"
                                    itemprop="itemListElement" itemscope itemtype="https://schema.org/City">
                                    <meta itemprop="name" content="Badalona">
                                    <meta itemprop="addressRegion" content="Cataluna">
                                    <meta itemprop="addressCountry" content="ES">
                                    <meta itemprop="addressLocality" content="Badalona">
                                    <button type="button" class="ft-btn" aria-pressed="false"
                                        aria-label="Marcar Badalona como ciudad favorita"
                                        title="Marcar Badalona como ciudad favorita">
                                        Badalona
                                    </button>
                                </li>
                                <li class="ft-tag ft-tag--chip ft-tag--md" data-tag-id="loc-example-3"
                                    data-tag-type="location" data-tag-region="Cataluna"
                                    data-tag-context="favorites-selector" data-tag-state="selected"
                                    data-tag-slug="castelldefels" data-analytics-category="localidades"
                                    data-analytics-action="fav_toggle" data-analytics-label="Castelldefels"
                                    itemprop="itemListElement" itemscope itemtype="https://schema.org/Place">
                                    <meta itemprop="name" content="Castelldefels">
                                    <meta itemprop="addressRegion" content="Cataluna">
                                    <meta itemprop="addressCountry" content="ES">
                                    <meta itemprop="addressLocality" content="Castelldefels">
                                    <button type="button" class="ft-btn" aria-pressed="true"
                                        aria-label="Quitar Castelldefels de tus localidades favoritas"
                                        title="Quitar Castelldefels de tus localidades favoritas">
                                        Castelldefels
                                    </button>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>`,
        helperScroll: `<div class="ft-org-suggestions-chips"
                    data-suggestions-container="true"
                    data-suggestions-count="4" data-suggestions-loaded="true">
                    <div class="ft-org-suggestions-chips__content">
                        <section role="region" aria-label="Listado de localidades disponibles" data-suggestions-section="true">
                            <h4 class="ft-helper-hide">Localidades disponibles</h4>
                            <ul role="list" aria-label="Listado de localidades"
                                class="ft-helper-scroll"
                                data-localidades-list="true"
                                data-suggestions-list="true"
                                data-suggestions-total="4">
                                <li class="ft-tag ft-tag--chip-tiny ft-tag--md" data-tag-state="selected" data-tag-slug="todos">
                                    <button type="button" class="ft-btn" data-chip-label="Todos" aria-pressed="true" title="Mostrar todas las localidades">
                                        Todos
                                    </button>
                                </li>
                                <li class="ft-tag ft-tag--chip-tiny ft-tag--md" data-tag-state="unselected" data-tag-slug="badalona">
                                    <button type="button" class="ft-btn" data-chip-label="Badalona" aria-pressed="false" title="Marcar Badalona como ciudad favorita">
                                        Badalona
                                    </button>
                                </li>
                                <li class="ft-tag ft-tag--chip-tiny ft-tag--md" data-tag-state="unselected" data-tag-slug="barcelona">
                                    <button type="button" class="ft-btn" data-chip-label="Barcelona" aria-pressed="false" title="Marcar Barcelona como ciudad favorita">
                                        Barcelona
                                    </button>
                                </li>
                                <li class="ft-tag ft-tag--chip-tiny ft-tag--md" data-tag-state="selected" data-tag-slug="tarragona">
                                    <button type="button" class="ft-btn" data-chip-label="Tarragona" aria-pressed="true" title="Quitar Tarragona de tus localidades favoritas">
                                        Tarragona
                                    </button>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>`
    };

    const baseArgTypes = [];
    const baseArgs = {};

    function live() {
        return VARIANTS.base;
    }

    function helperScroll() {
        return VARIANTS.helperScroll;
    }

    const framework = frameworkBlock({
        intro: `La variante base puede renderizarse como composicion pura, pero cuando entras en <code>chip-tiny</code> con helper scroll conviene que el framework sea la fuente de verdad del estado seleccionado de cada chip.`,
        rows: [
            ["Estado del listado", `Guarda chips seleccionados en estado reactivo y deriva <code>data-tag-state</code>, <code>aria-pressed</code> y labels desde ese modelo.`, `Guarda chips seleccionados en estado y deriva <code>data-tag-state</code>, <code>aria-pressed</code> y labels desde ese modelo.`],
            ["Helper opcional", `Monta el helper scroll en <code>onMounted()</code> solo si la hilera puede desbordar y manten la raiz <code>ul</code> estable.`, `Monta el helper scroll en <code>useEffect()</code> solo si la hilera puede desbordar y manten la raiz <code>ul</code> estable.`],
            ["Analitica", `Centraliza en el framework los eventos de favorito/seleccion para no depender de mutaciones ad hoc del helper.`, `Centraliza en el framework los eventos de favorito/seleccion para no depender de mutaciones ad hoc del helper.`]
        ],
        note: `Si los chips cambian por filtros o personalizacion, evita que el runtime reescriba el DOM completo: el framework debe seguir controlando orden, texto y seleccion.`
    });

    const overview = `<div class="cb-docs__inner">
        <h1>Suggestions Chips</h1>
        <p class="cb-docs__lead">Organismo del 42DS (<code>.ft-org-suggestions-chips</code>): tira de chips de sugerencia y accesos rapidos a temas o localidades relacionadas dentro de una fila horizontal.</p>

        <h2>Dependencias base</h2>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuando</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de marca</td><td>Siempre · primero</td></tr>
                    <tr><td><code>brands/[marca]/organism/suggestions-chips.css</code></td><td>CSS del organismo</td><td>Siempre</td></tr>
                    <tr><td><code>atoms/tag</code></td><td>CSS de los chips</td><td>Siempre</td></tr>
                    <tr><td>JS</td><td>JavaScript</td><td>No obligatorio en la version base</td></tr>
                </tbody>
            </table>
        </div>
        <div class="cb-callout">La version base del organismo sigue siendo composicion CSS sobre el atomo <code>.ft-tag</code>.</div>

        <h2>Dependencias del patron <code>chip-tiny</code></h2>
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Rol</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-tag.ft-tag--chip.ft-tag--md</code></td><td>Base CSS</td><td>Contrato visual e iconografia del chip</td></tr>
                <tr><td><code>.ft-tag--chip-tiny</code></td><td>Capa de producto</td><td>Compacta la fila y redefine el tratamiento tipografico</td></tr>
                <tr><td><code>.ft-helper-scroll</code></td><td>Helper opcional</td><td>Autoscroll horizontal, snap y fade lateral</td></tr>
                <tr><td><code>data-chip-label</code> en el control</td><td>Markup</td><td>Contrato de producto para el chip tiny</td></tr>
                <tr><td><code>cds-statics/js/organisms/suggestions-chips/fourty-js-suggestions-chips-chip-tiny-helper-scroll.js</code></td><td>JS opcional</td><td>Sincronizacion ligera de estados y atributos ARIA en la hilera scrollable</td></tr>
            </tbody>
        </table>
        <div class="cb-callout">La variante <code>.ft-tag--chip-tiny</code> pertenece al atomo <code>tag</code>; este organismo documenta su integracion con <code>.ft-helper-scroll</code>. Todos los items de la hilera son equivalentes y el DOM permanece intacto.</div>
        ${framework}

        <h2>Contrato de uso del helper</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Obligatorio</th><th>Notas</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-org-suggestions-chips</code></td><td>Si</td><td>Scope de inicializacion. El script recorre cada organismo por separado.</td></tr>
                <tr><td><code>ul.ft-helper-scroll</code></td><td>Si</td><td>Activa el comportamiento horizontal y el fade lateral en CSS.</td></tr>
                <tr><td><code>data-suggestions-list="true"</code></td><td>Si</td><td>Hook de busqueda del listado. Sin este atributo el JS no inicializa.</td></tr>
                <tr><td><code>data-chip-label</code></td><td>Si</td><td>Debe mantenerse sincronizado con el texto visible como parte del contrato del patron.</td></tr>
            </tbody>
        </table>

        <h2>Que hace el JS</h2>
        <table class="cb-table">
            <thead><tr><th>Fase</th><th>Comportamiento</th></tr></thead>
            <tbody>
                <tr><td>Boot</td><td>Busca cada <code>.ft-org-suggestions-chips</code> y dentro localiza <code>[data-suggestions-list="true"]</code> con clase <code>.ft-helper-scroll</code>.</td></tr>
                <tr><td>Layout</td><td>No altera el DOM: el scroll horizontal lo resuelve la propia combinacion <code>.ft-helper-scroll</code> + <code>.ft-tag--chip-tiny</code>.</td></tr>
                <tr><td>Estado</td><td>Sincroniza <code>data-tag-state</code>, <code>aria-pressed</code>, <code>aria-label</code> y <code>title</code> al hacer click en cualquier chip de la hilera.</td></tr>
            </tbody>
        </table>
        ${deprecationBlock({
            title: "Primer item anclado retirado del patron scrollable",
            since: "2026-06-15",
            summary: "La variante scrollable deja atras el montaje que trataba el primer chip como item fijo o especial. El organismo trabaja ahora con una hilera uniforme donde todos los chips comparten el mismo contrato.",
            scope: "Patron <code>chip-tiny + helper-scroll</code> en listados de sugerencias y favoritos.",
            replacement: "Mantener todos los chips dentro del mismo listado con <code>.ft-helper-scroll</code>, sin wrappers de fijacion ni jerarquia especial para el primer item.",
            note: "El JS opcional solo sincroniza estados y atributos; el layout horizontal lo resuelven CSS y el propio markup."
        })}

        <h2>Cuando usarlo</h2>
        <div class="cb-callout">Usar <code>helper-scroll</code> cuando el numero de chips o la longitud de las etiquetas hace probable el desbordamiento en mobile y quieres que toda la hilera sea desplazable.</div>
        <div class="cb-callout">No usarlo en listados cortos o centrados donde todos los chips caben sin scroll, porque el JS opcional de estados no aporta valor adicional si no necesitas interaccion.</div>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas. Cambia la marca con la toolbar Brand.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/organism/suggestions-chips/_suggestions-chips.scss</code> · markup: <code>fourty/organisms/organism-suggestions-chips.html</code> · patron chip-tiny: layouts CERCA y Storybook.</p>
    </div>`;

    const DEF = {
        id: "suggestions-chips",
        name: "Suggestions Chips",
        group: "Organisms",
        signals: ["js"],
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live, code: live },
            { id: "helper-scroll", name: "Chip tiny + helper-scroll", kind: "story", full: true, render: helperScroll, code: helperScroll }
        ]
    };

    window.SB.register(DEF);
    window.SB.loadMarkup(DEF, document.currentScript && document.currentScript.src, { full: true });
}());
