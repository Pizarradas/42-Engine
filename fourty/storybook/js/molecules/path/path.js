/* ════════════════════════════════════════════════════════════════════════
   molecules/path/path.js — Molecules / Path
   Casuística REAL de scss/fourties/molecules/path/_path.scss (.ft-mol-path*).
   Markup tomado de fourty/molecules/molecule-path.html. Cero invención de API.

   Miga de pan tipo "carril" / navegación contextual: combina 3 niveles —
   (1) __trail (migas con __heading de página actual), (2) rail de secciones
   relacionadas con doble presentación: __rail-mobile (<details>/<summary>) +
   __rail-desktop (<ul> con scroll horizontal sobre [data-scrollbar]), y
   (3) __promo (espacio promocional, editable con --has-promo).

   JS-driven (parcial): el carril desktop usa smooth-scrollbar (data-scrollbar)
   en producción; aquí se migra el markup verbatim y el contenedor cae a un
   overflow nativo sin la librería. Familias por marca (ep/epe/regionales/sport)
   se DOCUMENTAN, no se reproducen. Story "Base" interactiva (heading · nº de
   ítems del carril · promo) + subgrupo "Markup" async con Base y --has-promo.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    const PROMO_IMG = "/cds-statics/assets/img/bgs/lavidabuena-promo-breadcrumb.png";

    /* ▼ SINGLE SOURCE OF TRUTH — piezas y modificadores reales de _path.scss ▼ */
    const DATA = {
        parts: ["__trail", "__item", "__link", "__heading", "__rail-mobile", "__rail-mobile-scroll", "__trigger", "__list", "__rail-desktop", "__promo", "__promo-link"],
        mods: ["--has-promo"],
        brandVariants: ["ep", "epe", "regionales", "sport"],
        composes: [".ft-scrollbar__container (carril desktop)", "[data-scrollbar] (smooth-scrollbar)"]
    };

    function railItems(n, prefix) {
        return Array.from({ length: n }, (_, i) =>
            `<li class="ft-mol-path__item">
                            <a href="#" class="ft-mol-path__link" title="title text" target="_self"${i === 0 ? ' aria-current="page"' : ""}>
                                ${esc(prefix)} ${i + 1}
                            </a>
                        </li>`
        ).join("\n                        ");
    }

    /* ─── BASE — .ft-mol-path ─── */
    const baseArgTypes = [
        { key: "heading", control: "text", desc: "Página actual (.ft-mol-path__heading, aria-current)." },
        { key: "rail", control: "number", desc: "Nº de ítems del carril (2–18).", min: 2, max: 18 },
        { key: "hasPromo", control: "boolean", desc: "Añade --has-promo + imagen en el espacio promocional." }
    ];
    const baseArgs = { heading: "Heading", rail: "8", hasPromo: false };

    function live(a) {
        const n = Math.max(2, Math.min(18, parseInt(a.rail, 10) || 2));
        const cls = ["ft-mol-path"];
        if (a.hasPromo) cls.push("ft-mol-path--has-promo");
        const promoInner = a.hasPromo
            ? `<img src="${PROMO_IMG}" alt="" width="300" height="80" loading="eager" class="ft-helper-img-rd">
                        <span>Enlace promocional</span>`
            : `<span>Enlace promocional</span>`;
        return `<nav class="${cls.join(" ")}" aria-label="Ruta y navegación contextual">
                <!-- level 1: trail -->
                <ul class="ft-mol-path__trail" aria-label="Migas de pan">
                    <li class="ft-mol-path__item">
                        <a href="#" class="ft-mol-path__link" title="title text" target="_self">Trail Item 1</a>
                    </li>
                    <li class="ft-mol-path__item">
                        <a href="#" class="ft-mol-path__link" title="title text" target="_self">Trail Item 2</a>
                    </li>
                    <li class="ft-mol-path__item">
                        <h1 class="ft-mol-path__heading" aria-current="page">${esc(a.heading)}</h1>
                    </li>
                </ul>

                <!-- level 2: rail / tabs: MOBILE -->
                <details class="ft-mol-path__rail-mobile ft-mol-path__rail-mobile-scroll">
                    <summary class="ft-mol-path__trigger" aria-controls="path-rail-list-3" aria-expanded="false" aria-label="Mostrar navegación secundaria">Más</summary>
                    <ul id="path-rail-list-3" class="ft-mol-path__list" aria-label="Secciones relacionadas">
                        ${railItems(n, "Rail Item")}
                    </ul>
                </details>

                <!-- level 2: rail / tabs: DESKTOP -->
                <div data-scrollbar data-scrollbar-axis="x" data-scrollbar-wheel-to-x="true" data-scrollbar-announce-scroll="true" role="scrollbar" aria-label="Barra de desplazamiento horizontal" aria-orientation="horizontal" aria-controls="ft-mol-path-rail-desktop">
                    <ul class="ft-mol-path__rail-desktop ft-scrollbar__container" id="ft-mol-path-rail-desktop" aria-label="Secciones relacionadas" tabindex="0">
                        ${railItems(n, "Rail Item")}
                    </ul>
                </div>

                <!-- level 3: espacio promocional -->
                <div class="ft-mol-path__promo">
                    <a href="#" class="ft-mol-path__promo-link" rel="sponsored nofollow" aria-label="Visitar Patrocinador X">
                        ${promoInner}
                    </a>
                </div>
            </nav>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Path</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-path</code>): miga de pan tipo <em>carril</em> / navegación contextual. Combina tres niveles en un solo <code>&lt;nav&gt;</code>: migas de pan con la página actual, un carril de secciones relacionadas (con presentación distinta en móvil y escritorio) y un espacio promocional opcional.</p>

        <div class="cb-callout"><strong>JS-driven (parcial).</strong> El carril de escritorio (<code>__rail-desktop</code>) usa <code>smooth-scrollbar</code> vía <code>[data-scrollbar]</code> en producción. En este Storybook no se carga la librería: el contenedor cae a un <em>overflow</em> nativo. El markup se migra verbatim para conservar los <code>data-*</code> y los roles ARIA.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/path.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>fourties/atoms/scrollbar/_scrollbar</code></td><td>CSS del átomo Scrollbar</td><td>Siempre (carril desktop, <code>.ft-scrollbar__container</code>)</td></tr>
                <tr><td><code>js/scroll/smooth-scrollbar/smooth-scrollbar-library.js</code> + <code>-functions.js</code></td><td>JavaScript</td><td>Solo escritorio · activa el scroll horizontal del carril</td></tr>
                <tr><td><code>scss/fourties/molecules/path/_path.scss</code> + <code>path-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>trail + carril + promo (sin imagen promocional)</td></tr>
                <tr><td><code>--has-promo</code></td><td>activa el espacio promocional con imagen editable (<code>__promo-link &gt; img</code>)</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-path</code> (<code>&lt;nav&gt;</code>)</td></tr>
                <tr><td>Nivel 1 · migas</td><td><code>.ft-mol-path__trail</code> &gt; <code>__item</code> &gt; <code>__link</code> | <code>__heading</code> (página actual)</td></tr>
                <tr><td>Nivel 2 · carril móvil</td><td><code>.ft-mol-path__rail-mobile</code> (<code>&lt;details&gt;</code>) &gt; <code>__trigger</code> (<code>&lt;summary&gt;</code>) + <code>__list</code></td></tr>
                <tr><td>Nivel 2 · carril desktop</td><td><code>.ft-mol-path__rail-desktop.ft-scrollbar__container</code> dentro de <code>[data-scrollbar]</code></td></tr>
                <tr><td>Nivel 3 · promo</td><td><code>.ft-mol-path__promo</code> &gt; <code>__promo-link</code></td></tr>
            </tbody>
        </table>

        <div class="cb-callout">Existen familias específicas por marca — <code>path-ep.scss</code>, <code>path-epe.scss</code>, <code>path-regionales.scss</code>, <code>path-sport.scss</code> — que reestilan el carril y el promo según el medio. No se reproducen aquí; el aspecto cambia con la marca activa (clase <code>ft-brand-[marca]</code>).</div>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/path/_path.scss</code> · markup: <code>fourty/molecules/molecule-path.html</code></p>
    </div>`;

    const PA = {
        id: "path-mol",
        name: "Path",
        group: "Molecules",
        overview,
        stories: [
            // full: el carril ocupa todo el ancho y el scroll horizontal necesita espacio
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(PA);

    /* Markup original (HTML plano editable por el front) en path.html → subgrupo "Markup". */
    window.SB.loadMarkup(PA, document.currentScript && document.currentScript.src, { full: true });
})();
