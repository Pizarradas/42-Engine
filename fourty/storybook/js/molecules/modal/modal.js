/* ════════════════════════════════════════════════════════════════════════
   molecules/modal/modal.js — Molecules / Modal
   Casuística REAL de scss/fourties/molecules/modal/_modal.scss (.ft-mol-modal*).
   Markup tomado de fourty/molecules/molecule-modal.html. Cero invención de API.

   Ventana modal (dialog) JS-DRIVEN: el `.ft-mol-modal` nace `display:none;
   position:fixed; inset:0`; `data-toggle="ft-mol-modal"` en un trigger lo abre y
   `data-dismiss` lo cierra (fourty-js-modal.js). El storybook es zero-toolchain y NO
   carga ese JS → mostramos el modal ABIERTO de forma estática con `style="display:block"`
   (mismo resultado visual; el botón de cierre es inerte aquí). Es ENORME (~828 líneas):
   posiciones, tamaños, modos y estados de feedback. Una story plana interactiva "Base"
   (posición · tamaño · feedback · imagen · textos) + subgrupo "Markup" async.

   ⚠ Bug repo-wide conocido del trigger (ver overview): fourty-js-modal.js lee e.target
   directo, así que un trigger con hijos no abre al pulsar el hijo. Aquí no afecta
   (mostramos el modal ya abierto), pero se documenta.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;
    const frameworkBlock = window.SB.helpers.frameworkBlock;

    const IMG = "/cds-statics/assets/img/templates/ft-modal-has--image.svg";

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _modal.scss ▼ */
    const DATA = {
        positions: [
            ["ft-mol-modal--cnt", "--cnt · centro"],
            ["ft-mol-modal--top", "--top"],
            ["ft-mol-modal--rgt", "--rgt"],
            ["ft-mol-modal--bttm", "--bttm"],
            ["ft-mol-modal--lft", "--lft"],
            ["ft-mol-modal--bttm-cnt", "--bttm-cnt"]
        ],
        sizes: [
            ["", "(defecto)"],
            ["ft-mol-modal--sm", "--sm"],
            ["ft-mol-modal--md", "--md"],
            ["ft-mol-modal--fullscreen", "--fullscreen"],
            ["ft-mol-modal--fullheight", "--fullheight"],
            ["ft-mol-modal--maxheight", "--maxheight"]
        ],
        feedback: [
            ["", "(ninguno)"],
            ["ft-mol-modal-has--error", "-has--error"],
            ["ft-mol-modal-has--info", "-has--info"],
            ["ft-mol-modal-has--ok", "-has--ok"],
            ["ft-mol-modal-has--warning", "-has--warning"]
        ],
        parts: ["__container", "__window", "__feedback", "__header", "__body", "__footer", "__title", "__img", "__close"]
    };

    /* ─── BASE — .ft-mol-modal (abierto) ─── */
    const baseArgTypes = [
        { key: "position", control: "select", desc: "Posición del modal.", options: DATA.positions },
        { key: "size", control: "select", desc: "Tamaño / modo.", options: DATA.sizes },
        { key: "feedback", control: "select", desc: "Estado de feedback (color del borde del __window).", options: DATA.feedback },
        { key: "hasImg", control: "boolean", desc: "Modificador -has--img + __img a la cabecera." },
        { key: "title", control: "text", desc: "Título (__title)." },
        { key: "body", control: "text", desc: "Cuerpo (__body)." }
    ];
    const baseArgs = { position: "ft-mol-modal--cnt", size: "ft-mol-modal--md", feedback: "", hasImg: true, title: "María Pilar Fernández Bozal", body: "Especialista en Macroeconomía, presupuestos, impuestos y pensiones." };

    function live(a) {
        const cls = ["ft-mol-modal", a.position];
        if (a.size) cls.push(a.size);
        if (a.feedback) cls.push(a.feedback);
        if (a.hasImg) cls.push("ft-mol-modal-has--img");
        const img = a.hasImg ? `<img alt="alt text" class="ft-mol-modal__img ft-mol-modal__img--rounded" src="${IMG}">` : "";
        // style="display:block" → fuerza el estado abierto (en prod lo hace fourty-js-modal.js)
        return `<div class="${cls.join(" ")}" role="dialog" aria-modal="true" aria-labelledby="sbModalTitle" aria-describedby="sbModalDesc" style="display:block">
    <div class="ft-mol-modal__container ft-mol-modal__container--cnt">
        <div class="ft-mol-modal__window">
            ${img}
            <div class="ft-mol-modal__header">
                <h3 class="ft-mol-modal__title" id="sbModalTitle">${esc(a.title)}</h3>
                <p class="ft-helper-fontSize-body-M">Redactora jefa</p>
            </div>
            <div class="ft-mol-modal__body" id="sbModalDesc">
                <p class="ft-helper-fontSize-body-M">${esc(a.body)}</p>
            </div>
            <div class="ft-mol-modal__footer">
                <div class="ft-mol-btnGroup">
                    <a class="ft-btn ft-btn--sm" href="#" target="_self" title="Cancelar">Cancelar</a>
                    <a class="ft-btn ft-btn--tertiary ft-btn--sm" href="#" target="_self" title="Confirmar">Confirmar</a>
                </div>
                <button class="ft-btn-nav ft-btn-nav--close ft-mol-modal__close" data-dismiss="ft-mol-modal" name="close-button" title="Cerrar ventana emergente" type="button">
                    <span class="ft-btn-nav__text">Cerrar</span>
                    <span class="ft-btn-nav__icon"></span>
                </button>
            </div>
        </div>
    </div>
</div>`;
    }

    const framework = frameworkBlock({
        intro: `En Vue y React lo mas robusto es que el framework gobierne el estado <code>open</code> y que el contrato del DS se limite a clases, atributos y scroll lock. Reutiliza <code>fourty-js-modal.js</code> solo si necesitas replicar tal cual el comportamiento legacy.`,
        rows: [
            ["Estado", `Controla apertura/cierre desde estado reactivo y proyecta el modal abierto sin depender de <code>data-toggle</code>.`, `Controla apertura/cierre desde estado y proyecta el modal abierto sin depender de <code>data-toggle</code>.`],
            ["Foco + scroll", `Al abrir, mueve el foco al primer elemento util y recuerda devolverlo al trigger; si bloqueas scroll, respeta <code>ft-helper-scroll-stop</code>.`, `Al abrir, mueve el foco al primer elemento util y recuerda devolverlo al trigger; si bloqueas scroll, respeta <code>ft-helper-scroll-stop</code>.`],
            ["Runtime opcional", `Si montas el JS del DS, hazlo en <code>onMounted()</code> sobre nodos estables y desmonta listeners al salir.`, `Si montas el JS del DS, hazlo en <code>useEffect()</code> sobre nodos estables y desmonta listeners en el cleanup.`]
        ],
        note: `No mezcles dos sistemas de scroll lock ni dos focus traps distintos sobre el mismo dialogo: uno debe ser el duenio efectivo del modal.`,
        warn: true
    });

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Modal</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-modal</code>): ventana modal (<code>role="dialog"</code>) con cabecera, cuerpo y pie. Soporta posiciones, tamaños, modos a pantalla completa, imagen de cabecera y estados de feedback (error/info/ok/warning).</p>

        <div class="cb-callout"><strong>Componente JS-driven.</strong> El modal nace <code>display:none; position:fixed; inset:0</code>. Un trigger con <code>data-toggle="ft-mol-modal"</code> y <code>data-target="#id"</code> lo abre, y <code>data-dismiss</code> lo cierra (<code>cds-statics/js/modal/fourty-js-modal.js</code>). El storybook es <strong>zero-toolchain</strong> y no carga ese JS: aquí el modal se muestra <strong>abierto</strong> con <code>style="display:block"</code> (el botón de cierre es inerte).</div>

        <div class="cb-callout"><strong>Gotcha del trigger (bug repo-wide).</strong> <code>fourty-js-modal.js</code> lee <code>e.target</code> directamente: si el trigger envuelve su texto en un hijo (<code>&lt;span&gt;</code>, <code>&lt;img&gt;</code>…), al pulsar el hijo el modal <strong>no abre</strong>. Workaround: poner el texto como hijo directo del <code>&lt;button&gt;</code> (o arreglar el JS con <code>e.target.closest('[data-toggle]')</code>, que afecta a todas las marcas).</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/modal.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>cds-statics/js/modal/fourty-js-modal.js</code></td><td>JavaScript</td><td>Siempre para abrir/cerrar y la gestión de foco</td></tr>
                <tr><td><code>scss/fourties/molecules/modal/_modal.scss</code> + <code>modal-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
            </tbody>
        </table>
        </div>
        ${framework}

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>--cnt</code> · <code>--top</code> · <code>--rgt</code> · <code>--bttm</code> · <code>--lft</code> · <code>--bttm-cnt</code></td><td>posición del <code>__window</code></td></tr>
                <tr><td><code>--sm</code> · <code>--md</code></td><td>ancho del <code>__window</code></td></tr>
                <tr><td><code>--fullscreen</code> · <code>--fullheight</code> · <code>--maxheight</code> · <code>--fullscreen-mobile</code></td><td>modos a (casi) pantalla completa</td></tr>
                <tr><td><code>-has--img</code></td><td>imagen de cabecera (<code>__img</code>, <code>--rounded</code>)</td></tr>
                <tr><td><code>-has--error</code> · <code>-has--info</code> · <code>-has--ok</code> · <code>-has--warning</code></td><td>tinta el borde del <code>__window</code> según el estado</td></tr>
                <tr><td><code>-has--back</code> · <code>-has--share</code></td><td>botón volver / panel de compartir</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Overlay</td><td><code>.ft-mol-modal</code> (fixed, fondo oscuro)</td></tr>
                <tr><td>Contenedor</td><td><code>__container</code> (<code>--cnt</code>)</td></tr>
                <tr><td>Ventana</td><td><code>__window</code></td></tr>
                <tr><td>Secciones</td><td><code>__header</code> (<code>__title</code>) · <code>__body</code> · <code>__footer</code></td></tr>
                <tr><td>Cierre</td><td><code>.ft-btn-nav--close.ft-mol-modal__close</code> (<code>data-dismiss</code>)</td></tr>
            </tbody>
        </table>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/modal/_modal.scss</code> · markup: <code>fourty/molecules/molecule-modal.html</code></p>
    </div>`;

    const MO = {
        id: "modal",
        name: "Modal",
        group: "Molecules",
        signals: ["js"],
        overview,
        stories: [
            // full: el overlay es position:fixed inset:0; ocupa todo el stage
            { id: "base", name: "Base (abierto)", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(MO);

    /* Markup original (HTML plano editable por el front) en modal.html → subgrupo "Markup".
       Incluye el trigger + el modal completo (con RRSS) y la variante de feedback. */
    window.SB.loadMarkup(MO, document.currentScript && document.currentScript.src, { full: true });
})();
