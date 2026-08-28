/* ════════════════════════════════════════════════════════════════════════
   molecules/form/form.js — Molecules / Form
   Casuística REAL de scss/fourties/molecules/form/_form.scss (.ft-mol-form*).
   Markup tomado de fourty/molecules/molecule-form.html. Cero invención de API.

   Campo de formulario del DS (input/select) con label flotante, texto de soporte
   y estados (error/warning/info/disabled). El parcial es ENORME (~1630 líneas) y
   cubre además variantes JS-driven: búsqueda con icono/limpiar/trigger, dropdown
   predictivo (autocomplete), slide. Aquí se migra la CASUÍSTICA DE CAMPO COMÚN
   (input/select + label + soporte + estados + search-icon); las variantes de
   autocompletado predictivo (JS) quedan documentadas, no reproducidas (no silent cap).
   Una story plana interactiva "Base" + subgrupo "Markup" async.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const frameworkBlock = window.SB.helpers.frameworkBlock;
    const { esc } = window.SB.helpers;

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _form.scss ▼ */
    const DATA = {
        states: [
            ["", "(sin estado)"],
            ["ft-mol-form--is-error", "--is-error"],
            ["ft-mol-form--is-warning", "--is-warning"],
            ["ft-mol-form--is-info", "--is-info"],
            ["ft-mol-form--is-disabled", "--is-disabled"]
        ],
        has: ["--has-label", "--has-supporting-text", "--has-buttons", "--has-dropdown"],
        parts: ["__input", "__select", "__label", "__supporting-text", "__supporting-message", "__supporting-numbers", "__error-msg"],
        subblocks: ["-search (--has-search-icon / --has-clear-btn / --is-trigger)", "-dropdown / -predictive (autocomplete, JS)", "-slide"]
    };

    /* ─── BASE — .ft-mol-form ─── */
    const baseArgTypes = [
        { key: "field", control: "radio", desc: "Tipo de control.", options: [["input", "input / search"], ["select", "select (dropdown)"]] },
        { key: "label", control: "text", desc: "Texto del label flotante (__label)." },
        { key: "state", control: "select", desc: "Estado de validación / disabled.", options: DATA.states },
        { key: "hasLabel", control: "boolean", desc: "Modificador --has-label." },
        { key: "hasSupporting", control: "boolean", desc: "Modificador --has-supporting-text (muestra el texto de soporte)." },
        { key: "searchIcon", control: "boolean", desc: "Variante .ft-mol-form-search--has-search-icon (icono de lupa)." }
    ];
    const baseArgs = { field: "input", label: "Label", state: "", hasLabel: true, hasSupporting: true, searchIcon: false };

function live(a) {
        const cls = ["ft-mol-form"];
        if (a.hasLabel) cls.push("ft-mol-form--has-label");
        if (a.hasSupporting) cls.push("ft-mol-form--has-supporting-text");
        if (a.state) cls.push(a.state);
        if (a.field === "select") cls.push("ft-mol-form-dropdown");
        if (a.searchIcon) cls.push("ft-mol-form-search", "ft-mol-form-search--has-search-icon");
        const disabled = a.state === "ft-mol-form--is-disabled" ? " disabled" : "";
        const control = a.field === "select"
            ? `<select class="ft-mol-form__select" name="select"${disabled}><option>Opción 1</option><option>Opción 2</option><option>Opción 3</option></select>`
            : `<input type="search" class="ft-mol-form__input" name="" placeholder="&nbsp;"${disabled}>`;
        return `<div style="max-width:360px;width:100%;">
    <div class="${cls.join(" ")}">
        ${control}
        <label for="" class="ft-mol-form__label">${esc(a.label)}</label>
        <p class="ft-mol-form__supporting-text">
            <span class="ft-mol-form__supporting-message">Supporting text</span>
            <span class="ft-mol-form__supporting-numbers">11/20</span>
        </p>
    </div>
</div>`;
    }

    const framework = frameworkBlock({
        intro: `Para Vue y React el valor del campo, la validacion y los resultados predictivos deberian vivir en estado del framework; el JS del DS es util como adapter, no como fuente de verdad de negocio.`,
        rows: [
            ["Valor + errores", `Modela valor, touched y errores en estado reactivo y proyecta desde ahi clases como <code>--is-error</code> o <code>--is-warning</code>.`, `Modela valor, touched y errores en estado y proyecta desde ahi clases como <code>--is-error</code> o <code>--is-warning</code>.`],
            ["Label flotante · el fix", `<strong>NO cargues <code>fourty-js-form-floating-label.js</code></strong>: mutaria el <code>placeholder</code> a espaldas del render y el siguiente ciclo restauraria la verdad del componente — el bug volveria de forma intermitente; en SSR, ademas, flash del label levantado hasta hidratar.<br><strong>La trampa:</strong> si enlazas <code>undefined</code>/<code>null</code>, Vue <em>no pinta el atributo</em> y el input acaba SIN <code>placeholder</code> — el unico caso que rompe en los tres motores.<br>Llevate el criterio, no el script:<br><code>const ph = computed(() =&gt; props.placeholder || '\\u00A0')</code><br><code>&lt;input class="ft-mol-form__input" :placeholder="ph"&gt;</code>`, `<strong>NO cargues <code>fourty-js-form-floating-label.js</code></strong>: mutar el DOM por fuera hace que el siguiente re-render lo revierta, y en SSR puede dar <em>hydration mismatch</em>.<br><strong>La trampa:</strong> con <code>undefined</code>/<code>null</code> React <em>omite el atributo</em> y el input queda SIN <code>placeholder</code> — el unico caso que rompe en los tres motores.<br>Llevate el criterio, no el script:<br><code>const NBSP = '\\u00A0';</code><br><code>&lt;input className="ft-mol-form__input" placeholder={placeholder || NBSP} /&gt;</code>`],
            ["Comprobarlo", `Con el campo vacio y sin foco, <code>input.matches(':placeholder-shown')</code> debe ser <strong>true</strong> (label dentro). Es la condicion exacta de la que depende el CSS del DS: metela en un test de componente y el bug no vuelve.`, `Con el campo vacio y sin foco, <code>input.matches(':placeholder-shown')</code> debe ser <strong>true</strong> (label dentro). Es la condicion exacta de la que depende el CSS del DS: metela en un test (RTL/Jest) y el bug no vuelve.`],
            ["Predictivo", `El <code>engine</code> es logica pura (sin DOM): reutilizalo. El <code>renderer</code>/<code>mobile-sheet</code>/<code>controller</code> pintan y mutan DOM — eso es lo que gobierna el framework, reimplementalo. Si aun asi montas el controller, hazlo en <code>onMounted()</code> con el adapter ya disponible.`, `El <code>engine</code> es logica pura (sin DOM): reutilizalo. El <code>renderer</code>/<code>mobile-sheet</code>/<code>controller</code> pintan y mutan DOM — reimplementalos de forma declarativa. Si aun asi montas el controller, hazlo en <code>useEffect()</code> con el adapter ya disponible.`],
            ["Peticiones", `Cancela debounce, fetches y observers en <code>onBeforeUnmount()</code> o al cambiar de vista.`, `Cancela debounce, fetches y observers en el cleanup del efecto o al cambiar de vista.`]
        ],
        note: `Regla general: lo que es <strong>logica</strong> (engine, criterio del placeholder) viaja al componente; lo que es <strong>manipulacion de DOM</strong> (renderer, sheet, auto-inits) se queda en el mundo estatico. El label flotante sigue siendo CSS, pero depende de que el markup traiga un placeholder NO vacio: en el framework, eso se resuelve en el binding.`
    });

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Form</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-form</code>): campo de formulario — <code>input</code> o <code>select</code> con <strong>label flotante</strong> (truco <code>:placeholder-shown</code> / <code>:focus</code>), texto de soporte con contador y estados de validación.</p>

        <div class="cb-callout">El parcial SCSS es muy grande (~1630 líneas). Esta story cubre la <strong>casuística de campo común</strong> (input/select + label + soporte + estados + búsqueda con icono). Las variantes de <strong>autocompletado predictivo</strong> (<code>-predictive</code>, <code>-dropdown--full</code>, <code>-slide</code>) son <strong>JS-driven</strong> y quedan documentadas aquí, no reproducidas.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables (incl. <code>--color-form</code>)</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/form.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>js/form/fourty-js-form-floating-label.js</code></td><td>JS · auto-init</td><td><strong>Siempre que uses <code>--has-label</code></strong>. Sanea el placeholder; sin él, el label sale levantado de origen en iOS (ver el aviso de abajo)</td></tr>
                <tr><td><code>js/form/fourty-js-form-clear-button.js</code></td><td>JS · auto-init</td><td>Solo con <code>-search--has-clear-btn</code> (el aspa de borrado)</td></tr>
                <tr><td><code>js/form/fourty-js-form-dropdown-toggle.js</code></td><td>JS · manual</td><td>Solo si el markup trae <code>__dropdown-content</code> (abrir/cerrar + <code>aria-expanded</code>)</td></tr>
                <tr><td><code>js/custom/fourty-js-custom-utils.js</code> → <code>FTUtils</code></td><td>JS · base</td><td>Solo con <code>--has-predictive</code>. <strong>Obligatorio</strong>: renderer, sheet y controller lanzan error si falta</td></tr>
                <tr><td>Predictivo: <code>…-engine</code> → <code>…-renderer</code> → <code>…-mobile-sheet</code> → <code>…-controller</code></td><td>JS · manual, <strong>en ese orden</strong></td><td>Solo con <code>--has-predictive</code>. El <em>controller</em> es el facade: <code>FTMolFormPredictive.mount()</code></td></tr>
                <tr><td><code>js/action-bar/fourty-js-action-bar-controller.js</code></td><td>JS · condicional</td><td>Solo si conectas la action-bar al predictivo (si no está, el controller lanza error)</td></tr>
                <tr><td><strong>jQuery</strong> + <code>js/form/fourty-js-form-basics.js</code></td><td>JS · 🔴 legacy</td><td>Solo para <code>--has-dropdown</code> legacy. <strong>Evítalo en código nuevo</strong></td></tr>
                <tr><td><code>scss/fourties/molecules/form/_form.scss</code> + <code>form-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
            </tbody>
        </table>
        </div>
        <p class="cb-src">Mapa completo (qué consume y qué expone cada archivo, y qué NO cargar): <code>cds-statics/js/form/README.md</code></p>

        <div class="cb-callout"><strong>El label flotante no es "solo CSS": tiene un contrato con el markup.</strong> El label está abajo por defecto y sube con <code>:focus</code> o con <code>:not(:placeholder-shown)</code>. O sea que el CSS deduce «el campo está vacío» de que <em>haya placeholder</em>: si el motor decide que el input no está mostrando placeholder, el label <strong>sube solo</strong>.
            <p>Medido con Playwright sobre los tres motores (input vacío, con controles):</p>
            <table class="cb-table">
                <thead><tr><th>Markup</th><th>WebKit</th><th>Chromium</th><th>Firefox</th></tr></thead>
                <tbody>
                    <tr><td><strong>sin atributo <code>placeholder</code></strong></td><td>✘ levantado</td><td>✘ levantado</td><td>✘ levantado</td></tr>
                    <tr><td><code>placeholder=""</code></td><td>✔</td><td>✔</td><td>✔</td></tr>
                    <tr><td><code>placeholder=" "</code> (espacio)</td><td>✔</td><td>✔</td><td>✔</td></tr>
                    <tr><td><code>placeholder="&amp;nbsp;"</code> (U+00A0)</td><td>✔</td><td>✔</td><td>✔</td></tr>
                </tbody>
            </table>
            <p>Lo que rompe el label es que el input llegue <strong>sin atributo <code>placeholder</code></strong>, y rompe en los tres motores — no es un problema de iOS. (El atributo vacío y el espacio funcionan hoy, pero por permisividad de los motores: la spec dice que el placeholder se muestra solo si <strong>no</strong> está vacío. Por eso el valor canónico es <code>&amp;nbsp;</code>, que cumple la spec y es lo que usa este markup.)</p>
            Carga <code>fourty-js-form-floating-label.js</code> y te olvidas: sanea cualquier input de <code>--has-label</code> que llegue sin placeholder utilizable. En el canvas, enfoca el campo para ver el efecto.</div>
        ${framework}

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>--has-label</code></td><td>activa el label flotante. <strong>Exige placeholder no vacío</strong> en el input (usa <code>&amp;nbsp;</code>) — ver el aviso de Dependencias</td></tr>
                <tr><td><code>--has-supporting-text</code></td><td>muestra el texto de soporte + contador</td></tr>
                <tr><td><code>--is-error</code> · <code>--is-warning</code> · <code>--is-info</code></td><td>estados de validación (color de borde/mensaje)</td></tr>
                <tr><td><code>--is-disabled</code></td><td>campo deshabilitado</td></tr>
                <tr><td><code>--has-buttons</code></td><td>grupo de acciones bajo el campo (remove/enviar)</td></tr>
                <tr><td><code>-dropdown</code></td><td>el control es un <code>&lt;select&gt;</code></td></tr>
                <tr><td><code>-search--has-search-icon</code> · <code>--has-clear-btn</code> · <code>--is-trigger</code></td><td>variantes de campo de búsqueda</td></tr>
                <tr><td><code>-predictive</code> · <code>-dropdown--full</code> · <code>-slide</code></td><td>autocompletado/desplegables (JS) — contrato y markup mínimo en <code>cds-statics/js/form/README.md</code></td></tr>
            </tbody>
        </table>

        <h2>Cambios recientes</h2>
        <table class="cb-table">
            <thead><tr><th>Fecha</th><th>Dependencia</th><th>Qué cambió</th></tr></thead>
            <tbody>
                <tr><td>2026-07-14</td><td><strong>Esta documentación</strong></td><td><strong>Corregida la explicación del bug.</strong> La primera versión decía que «WebKit descarta el placeholder de solo espacios»: un test en Playwright sobre los tres motores lo <strong>refutó</strong>. La causa real es el input <strong>sin atributo <code>placeholder</code></strong>, que rompe en los tres. El arreglo (NBSP) sigue siendo válido, pero por otra razón.</td></tr>
                <tr><td>2026-07-14</td><td><strong>NUEVA</strong> · <code>js/form/fourty-js-form-floating-label.js</code></td><td>Archivo nuevo. Sanea el placeholder de <code>--has-label</code> (ausente, vacío o de solo espacios → <code>&amp;nbsp;</code>), y arregla el <strong>label levantado de origen</strong> sin que el consumidor migre su HTML. <strong>Cárgalo si usas <code>--has-label</code>.</strong></td></tr>
                <tr><td>2026-07-14</td><td><code>js/form/fourty-js-form-predictive-controller.js</code></td><td>El placeholder que forzaba con floating label pasa de <strong>espacio</strong> a <strong>NBSP</strong> (U+00A0), tomado de <code>FTMolFormFloatingLabel.NBSP</code>: un único valor canónico en el DS.</td></tr>
                <tr><td>2026-07-14</td><td><code>js/form/fourty-js-form-predictive-mobile-sheet.js</code></td><td>Mismo cambio. Es la vista <strong>móvil</strong>, la ruta por la que se reportó la incidencia — y la que queda por revisar para explicar por qué se veía «solo en iOS».</td></tr>
                <tr><td>2026-07-14</td><td>Markup de esta story (<code>form.js</code> · <code>form.html</code>)</td><td>Los inputs pasan de <code>placeholder=" "</code> a <code>placeholder="&amp;nbsp;"</code>: el código que se copia desde aquí ya no propaga el bug de iOS.</td></tr>
                <tr><td>2026-07-14</td><td><code>scss/fourties/molecules/form/_form.scss</code></td><td><strong>Sin cambios</strong>, a propósito. La regla <code>:not(:placeholder-shown)</code> es correcta; el defecto estaba en el contrato con el markup, no en el CSS (y arreglarlo aquí habría obligado a recompilar las 6 marcas).</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-form</code></td></tr>
                <tr><td>Control</td><td><code>.ft-mol-form__input</code> / <code>.ft-mol-form__select</code></td></tr>
                <tr><td>Label flotante</td><td><code>.ft-mol-form__label</code></td></tr>
                <tr><td>Soporte</td><td><code>__supporting-text</code> &gt; <code>__supporting-message</code> + <code>__supporting-numbers</code></td></tr>
            </tbody>
        </table>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/form/_form.scss</code> · markup: <code>fourty/molecules/molecule-form.html</code></p>
    </div>`;

    const FORM = {
        id: "form",
        name: "Form",
        group: "Molecules",
        signals: ["js"],
        overview,
        stories: [
            // sin full: es un campo (input width:100%); se acota a ~360px en el render
            { id: "base", name: "Base", kind: "interactive", argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(FORM);

    /* Markup original (HTML plano editable por el front) en form.html → subgrupo "Markup". */
    window.SB.loadMarkup(FORM, document.currentScript && document.currentScript.src);
})();
