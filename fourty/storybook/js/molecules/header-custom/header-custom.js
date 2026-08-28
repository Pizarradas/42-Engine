/* ════════════════════════════════════════════════════════════════════════
   molecules/header-custom/header-custom.js — Molecules / Header Custom
   Casuística REAL de scss/fourties/molecules/header-custom/_header-custom.scss (.ft-mol-header-custom*).
   Markup tomado de fourty/molecules/molecule-headercustom.html. Cero invención de API.

   Cabecera ilustrada de página/sección: bloque de texto (título + destacado +
   subtítulo) e imagen, con esquina redondeada grande. Por defecto la imagen va a la
   derecha (row-reverse); modificadores cambian el lado del texto y ocultan la imagen.
   Solo CSS. Una story plana interactiva "Base" + subgrupo "Markup" async.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    const IMG = "/cds-statics/assets/img/templates/ft-mol-tab-header-custom-img-desktop--template.png";

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _header-custom.scss ▼ */
    const DATA = {
        variants: [
            ["", "base (texto izq · imagen der, esquina inf-izq)"],
            ["ft-mol-header-custom--has-txt-lft", "--has-txt-lft · texto izq, imagen izq (esquina inf-der)"],
            ["ft-mol-header-custom--has-txt-cnt", "--has-txt-cnt · texto centrado, sin imagen"],
            ["ft-mol-header-custom--has-img-hiden-desktop", "--has-img-hiden-desktop · oculta imagen en ≥1024px"]
        ],
        parts: ["__txt", "__title", "__highlighted", "__subtitle"]
    };

    /* ─── BASE — .ft-mol-header-custom ─── */
    const baseArgTypes = [
        { key: "variant", control: "select", desc: "Disposición de texto/imagen.", options: DATA.variants },
        { key: "title", control: "text", desc: "Título (__title)." },
        { key: "highlighted", control: "text", desc: "Texto destacado (__highlighted)." },
        { key: "subtitle", control: "text", desc: "Subtítulo (__subtitle)." }
    ];
    const baseArgs = { variant: "", title: "Notas de corte", highlighted: "2024", subtitle: "Lorem ipsum dolor est" };

    function live(a) {
        const cls = ["ft-mol-header-custom"];
        if (a.variant) cls.push(a.variant);
        return `<div class="${cls.join(" ")}">
    <div class="ft-mol-header-custom__txt">
        <h1 class="ft-mol-header-custom__title">${esc(a.title)} <span class="ft-mol-header-custom__highlighted">${esc(a.highlighted)}</span></h1>
        <p class="ft-mol-header-custom__subtitle">${esc(a.subtitle)}</p>
    </div>
    <figure class="ft-img">
        <picture>
            <source media="(min-width:640.1px)" srcset="${IMG}" width="250" height="140">
            <img src="${IMG}" alt="" width="250" height="140" loading="eager" class="ft-helper-img-rd">
        </picture>
    </figure>
</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Header Custom</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-header-custom</code>): cabecera ilustrada de página/sección — bloque de texto (título + destacado + subtítulo) e imagen, con una esquina redondeada grande. Pensada para portadillas de especiales (p.ej. «Notas de corte 2024»).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables (incl. <code>--color-illustrations-skin-5</code>)</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/header-custom.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-img</code></td><td>CSS del átomo Img</td><td>Siempre (la ilustración)</td></tr>
                <tr><td><code>scss/fourties/molecules/header-custom/_header-custom.scss</code> + <code>header-custom-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS (<code>.affix</code> opcional si se hace sticky)</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">El fondo usa <code>var(--color-illustrations-skin-5)</code> y la esquina redondeada de 6rem; ambos dependen de la marca activa.</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>texto a la izquierda, imagen a la derecha (esquina inf-izquierda)</td></tr>
                <tr><td><code>--has-txt-lft</code></td><td>texto a la izquierda, imagen a la derecha invertida (esquina inf-derecha)</td></tr>
                <tr><td><code>--has-txt-cnt</code></td><td>texto centrado, oculta la imagen</td></tr>
                <tr><td><code>--has-img-hiden-desktop</code></td><td>oculta la imagen en ≥1024px</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-header-custom</code></td></tr>
                <tr><td>Texto</td><td><code>__txt</code> &gt; <code>__title</code> (+ <code>__highlighted</code>) + <code>__subtitle</code></td></tr>
                <tr><td>Imagen</td><td><code>.ft-img</code> (átomo Img)</td></tr>
            </tbody>
        </table>

        <div class="cb-callout">No confundir con el <em>organism</em> Header Custom (cabecera de portada completa). Esta es la molécula de portadilla.</div>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/header-custom/_header-custom.scss</code> · markup: <code>fourty/molecules/molecule-headercustom.html</code></p>
    </div>`;

    const HC = {
        id: "header-custom",
        name: "Header Custom",
        group: "Molecules",
        overview,
        stories: [
            // full: la cabecera es width:100% con texto + imagen a los lados
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(HC);

    /* Markup original (HTML plano editable por el front) en header-custom.html → subgrupo "Markup". */
    window.SB.loadMarkup(HC, document.currentScript && document.currentScript.src, { full: true });
})();
