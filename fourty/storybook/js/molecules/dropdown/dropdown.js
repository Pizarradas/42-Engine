/* ════════════════════════════════════════════════════════════════════════
   molecules/dropdown/dropdown.js — Molecules / Dropdown
   Casuística REAL de scss/fourties/molecules/dropdown/_dropdown.scss (.ft-mol-dropdown*).
   Markup tomado de fourty/molecules/molecule-dropdown.html. Cero invención de API.

   Menú desplegable JS-DRIVEN: en producción `toggleDropdown(event)` alterna
   aria-expanded y añade la clase `__listIs-active` al <ul> (que por defecto está
   `hidden`/`display:none`). El storybook es zero-toolchain y NO carga ese JS → el
   control "open" reproduce el estado abierto de forma estática (añade __listIs-active
   y quita hidden). La lista es position:absolute → se reserva alto en el render.
   Una story plana interactiva "Base" + subgrupo "Markup" async (lista+nav, iconos, summary).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;
    const frameworkBlock = window.SB.helpers.frameworkBlock;

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _dropdown.scss ▼ */
    const DATA = {
        mods: [
            ["--is-list-rgt", "lista alineada a la derecha del trigger"],
            ["--is-list-lft", "lista alineada a la izquierda del trigger"],
            ["--has-btn-nav", "trigger tipo .ft-btn-nav (icono ⋮)"],
            ["--has-icons", "ítems con icono a la izquierda (__icon)"]
        ],
        parts: ["__trigger", "__list", "__listIs-active", "__item", "__link", "__icon", "__summary", "__details", "__details-item", "__details-list"]
    };

    /* ─── BASE — .ft-mol-dropdown ─── */
    const baseArgTypes = [
        { key: "label", control: "text", desc: "Texto del trigger (.ft-btn)." },
        { key: "count", control: "number", desc: "Número de ítems del menú (1–6).", min: 1, max: 6 },
        { key: "open", control: "boolean", desc: "Estado abierto (añade __listIs-active; en prod lo pone toggleDropdown)." }
    ];
    const baseArgs = { label: "Dropdown", count: "4", open: true };

function live(a) {
        const n = Math.max(1, Math.min(6, parseInt(a.count, 10) || 1));
        const items = Array.from({ length: n }, () =>
            `<li class="ft-mol-dropdown__item" role="none"><a class="ft-mol-dropdown__link" role="menuitem" href="#" target="_self" title="title text" tabindex="-1">Lorem ipsum dolor est</a></li>`
        ).join("");
        const listCls = a.open ? "ft-mol-dropdown__list ft-mol-dropdown__listIs-active" : "ft-mol-dropdown__list";
        const hidden = a.open ? "" : " hidden";
        // la lista abierta es position:absolute → reservamos alto para que no se recorte
        const wrapStyle = a.open ? ' style="min-height:' + (60 + n * 46) + 'px;"' : "";
        return `<div${wrapStyle}><div class="ft-mol-dropdown">
    <button type="button" class="ft-btn ft-btn--primary ft-btn--md ft-mol-dropdown__trigger" aria-haspopup="true" aria-expanded="${a.open}" title="Abrir menú desplegable">${esc(a.label)}</button>
    <ul class="${listCls}" role="menu" aria-hidden="${!a.open}"${hidden}>${items}</ul>
</div></div>`;
    }

    const framework = frameworkBlock({
        intro: `En framework conviene que el estado abierto/cerrado viva en la capa reactiva y que el runtime del dropdown solo se reutilice si quieres conservar exactamente el comportamiento legacy del showroom.`,
        rows: [
            ["Estado + ARIA", `Controla <code>open</code> con estado reactivo y deriva <code>aria-expanded</code>, <code>aria-hidden</code> y la clase <code>__listIs-active</code>.`, `Controla <code>open</code> con estado y deriva <code>aria-expanded</code>, <code>aria-hidden</code> y la clase <code>__listIs-active</code>.`],
            ["Eventos globales", `Si mantienes click-outside o Escape, registralos en <code>onMounted()</code> y liberalos al desmontar.`, `Si mantienes click-outside o Escape, registralos en <code>useEffect()</code> y liberalos en el cleanup.`],
            ["Submenus nativos", `Respeta el default de <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code>; evita bloquearlo con preventDefault globales.`, `Respeta el default de <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code>; evita bloquearlo con preventDefault globales.`]
        ],
        note: `Si el dropdown forma parte de una toolbar o header, devuelve el foco al trigger al cerrar y evita dos listeners distintos compitiendo por el mismo click-outside.`
    });

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Dropdown</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-dropdown</code>): menú desplegable accesible — un trigger (botón) y una lista de ítems que se abre por debajo. Soporta triggers tipo <code>.ft-btn</code> o <code>.ft-btn-nav</code>, ítems con icono y submenús nativos (<code>&lt;details&gt;</code>).</p>

        <div class="cb-callout"><strong>Componente JS-driven.</strong> En producción <code>toggleDropdown(event)</code> alterna <code>aria-expanded</code> y añade <code>__listIs-active</code> al <code>&lt;ul&gt;</code> (oculto por defecto). El storybook es <strong>zero-toolchain</strong> y no carga ese JS: el control <strong>open</strong> reproduce el estado abierto estáticamente (añade <code>__listIs-active</code>, quita <code>hidden</code>).</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/dropdown.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-btn</code> / <code>.ft-btn-nav</code></td><td>CSS del átomo del trigger</td><td>Siempre</td></tr>
                <tr><td><code>toggleDropdown</code> + cierre por click-outside/Esc</td><td>JavaScript</td><td>Siempre para la apertura real y la gestión de foco/ARIA</td></tr>
                <tr><td><code>scss/fourties/molecules/dropdown/_dropdown.scss</code> + <code>dropdown-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
            </tbody>
        </table>
        </div>
        ${framework}

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>--is-list-rgt</code> · <code>--is-list-lft</code></td><td>alineación de la lista respecto al trigger</td></tr>
                <tr><td><code>--has-btn-nav</code></td><td>trigger tipo <code>.ft-btn-nav</code> (icono ⋮)</td></tr>
                <tr><td><code>--has-icons</code></td><td>ítems con icono a la izquierda (<code>__icon</code>)</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-dropdown</code></td></tr>
                <tr><td>Trigger</td><td><code>__trigger</code> (botón)</td></tr>
                <tr><td>Lista</td><td><code>__list</code> + <code>__listIs-active</code> (abierta)</td></tr>
                <tr><td>Ítem / enlace</td><td><code>__item</code> &gt; <code>__link</code> (+ <code>__icon</code>)</td></tr>
                <tr><td>Submenú</td><td><code>__details</code> &gt; <code>__summary</code> + <code>__details-list</code>/<code>__details-item</code></td></tr>
            </tbody>
        </table>

        <div class="cb-callout">El subgrupo <strong>Markup</strong> muestra las variantes (lista+nav, con iconos, con submenús <code>&lt;details&gt;</code>) en estado abierto. La accesibilidad (foco, Esc, click-outside, <code>aria-expanded</code>) la aporta el JS del consumidor.</div>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/dropdown/_dropdown.scss</code> · markup: <code>fourty/molecules/molecule-dropdown.html</code></p>
    </div>`;

    const DD = {
        id: "dropdown",
        name: "Dropdown",
        group: "Molecules",
        signals: ["js"],
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(DD);

    /* Markup original (HTML plano editable por el front) en dropdown.html → subgrupo "Markup". */
    window.SB.loadMarkup(DD, document.currentScript && document.currentScript.src);
})();
