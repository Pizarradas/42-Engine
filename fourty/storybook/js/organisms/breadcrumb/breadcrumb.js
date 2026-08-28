/* ════════════════════════════════════════════════════════════════════════
   organisms/breadcrumb/breadcrumb.js — Organisms / Breadcrumb
   Casuística REAL de scss/fourties/organism/breadcrumb/_breadcrumb.scss (.ft-org-breadcrumb).
   Markup VERBATIM de fourty/organisms/organism-breadcrumb.html. Cero invención de API.
   Rutas de asset normalizadas (../../cds-statics → /cds-statics, raíz del server).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";

    /* ▼ SINGLE SOURCE OF TRUTH — markup verbatim por variante ▼ */
    const VARIANTS = {
        "base": `<div class="ft-org-breadcrumb">
                                                <ul class="ft-mol-breadcrumb">
                                                    <li class="ft-mol-breadcrumb__item">
                                                        <a href="#" class="ft-mol-breadcrumb__link" title="title text"
                                                            target="_self">
                                                            Nivel 1
                                                        </a>
                                                    </li>
                                                    <li class="ft-mol-breadcrumb__item">
                                                        <a href="#" class="ft-mol-breadcrumb__link" title="title text"
                                                            target="_self">
                                                            Nivel 2
                                                        </a>
                                                    </li>
                                                    <li class="ft-mol-breadcrumb__item">
                                                        <a href="#" class="ft-mol-breadcrumb__link" title="title text"
                                                            target="_self">
                                                            Nivel 3
                                                        </a>
                                                    </li>
                                                    <li class="ft-mol-breadcrumb__item">
                                                        <a href="#" class="ft-mol-breadcrumb__link" title="title text"
                                                            target="_self">
                                                            Nivel 4
                                                        </a>
                                                    </li>
                                                    <li class="ft-mol-breadcrumb__item">
                                                        Nivel 5
                                                    </li>
                                                </ul>
                                            </div>`,
        "has-home": `<div class="ft-org-breadcrumb">
                                                <ul class="ft-mol-breadcrumb ft-mol-breadcrumb-has--home">
                                                    <li class="ft-mol-breadcrumb__item">
                                                        <a href="#" class="ft-mol-breadcrumb__link" title="title text"
                                                            target="_self">
                                                            <span class="ft-mol-breadcrumb__lvl">
                                                                Nivel 1
                                                            </span>
                                                        </a>
                                                    </li>
                                                    <li class="ft-mol-breadcrumb__item">
                                                        <a href="#" class="ft-mol-breadcrumb__link" title="title text"
                                                            target="_self">
                                                            <span class="ft-mol-breadcrumb__lvl">
                                                                Nivel 2
                                                            </span>
                                                        </a>
                                                    </li>
                                                    <li class="ft-mol-breadcrumb__item">
                                                        <a href="#" class="ft-mol-breadcrumb__link" title="title text"
                                                            target="_self">
                                                            <span class="ft-mol-breadcrumb__lvl">
                                                                Nivel 3
                                                            </span>
                                                        </a>
                                                    </li>
                                                    <li class="ft-mol-breadcrumb__item">
                                                        <a href="#" class="ft-mol-breadcrumb__link" title="title text"
                                                            target="_self">
                                                            Nivel 4
                                                        </a>
                                                    </li>
                                                    <li class="ft-mol-breadcrumb__item">
                                                        Nivel 5
                                                    </li>
                                                </ul>
                                            </div>`,
        "has-lvl": `<div class="ft-org-breadcrumb">
                                                <nav class="ft-mol-breadcrumb ft-mol-breadcrumb-has--lvl">
                                                    <ul class="ft-mol-breadcrumb__list">
                                                        <li class="ft-mol-breadcrumb__item">
                                                            <a href="#" class="ft-mol-breadcrumb__link"
                                                                title="title text" target="_self">
                                                                <span class="ft-mol-breadcrumb__lvl">
                                                                    Nivel 1
                                                                </span>
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-breadcrumb__item">
                                                            <a href="#" class="ft-mol-breadcrumb__link"
                                                                title="title text" target="_self">
                                                                <span class="ft-mol-breadcrumb__lvl">
                                                                    Nivel 2
                                                                </span>
                                                            </a>
                                                        </li>
                                                        <li
                                                            class="ft-mol-breadcrumb__item ft-mol-breadcrumb__itemIs-not-link">
                                                            <span class="ft-mol-breadcrumb__lvl">
                                                                Nivel 3
                                                            </span>
                                                        </li>
                                                    </ul>
                                                    <ul class="ft-mol-breadcrumb-links-support">
                                                        <li class="ft-mol-breadcrumb-links-support__item">
                                                            <a href="#" class="ft-mol-breadcrumb-links-support__link"
                                                                title="title text" target="_self">
                                                                Link Number 1
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-breadcrumb-links-support__item">
                                                            <a href="#" class="ft-mol-breadcrumb-links-support__link"
                                                                title="title text" target="_self">
                                                                Link Number 2
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-breadcrumb-links-support__item">
                                                            <a href="#" class="ft-mol-breadcrumb-links-support__link"
                                                                title="title text" target="_self">
                                                                Link Number 3
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-breadcrumb-links-support__item">
                                                            <a href="#" class="ft-mol-breadcrumb-links-support__link"
                                                                title="title text" target="_self">
                                                                Link Number 4
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-breadcrumb-links-support__item">
                                                            <a href="#" class="ft-mol-breadcrumb-links-support__link"
                                                                title="title text" target="_self">
                                                                Link Number 5
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>`,
        "has-1-lvl": `<div class="ft-org-breadcrumb">
                                                <nav
                                                    class="ft-mol-breadcrumb ft-mol-breadcrumb-has--lvl ft-mol-breadcrumb-has--1-lvl">
                                                    <ul class="ft-mol-breadcrumb__list">
                                                        <li
                                                            class="ft-mol-breadcrumb__item ft-mol-breadcrumb__itemIs-not-link">
                                                            <span class="ft-mol-breadcrumb__lvl">
                                                                Nivel 1
                                                            </span>
                                                        </li>
                                                    </ul>
                                                    <ul class="ft-mol-breadcrumb-links-support">
                                                        <li class="ft-mol-breadcrumb-links-support__item">
                                                            <a href="#" class="ft-mol-breadcrumb-links-support__link"
                                                                title="title text" target="_self">
                                                                Link Number 1
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-breadcrumb-links-support__item">
                                                            <a href="#" class="ft-mol-breadcrumb-links-support__link"
                                                                title="title text" target="_self">
                                                                Link Number 2
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-breadcrumb-links-support__item">
                                                            <a href="#" class="ft-mol-breadcrumb-links-support__link"
                                                                title="title text" target="_self">
                                                                Link Number 3
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-breadcrumb-links-support__item">
                                                            <a href="#" class="ft-mol-breadcrumb-links-support__link"
                                                                title="title text" target="_self">
                                                                Link Number 4
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-breadcrumb-links-support__item">
                                                            <a href="#" class="ft-mol-breadcrumb-links-support__link"
                                                                title="title text" target="_self">
                                                                Link Number 5
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>`,
        "bg-photo": `<div class="ft-org-breadcrumb ft-org-breadcrumb--is-bg">
                                                <nav class="ft-mol-breadcrumb ft-mol-breadcrumb-is--sectioned">
                                                    <ul class="ft-mol-breadcrumb-section">
                                                        <li class="ft-mol-breadcrumb-section__previous">
                                                            <span class="ft-mol-breadcrumb-section-txt">
                                                                Estás dentro
                                                            </span>
                                                        </li>
                                                        <li class="ft-mol-breadcrumb-section__title">
                                                            <strong class="ft-mol-breadcrumb-section-title">
                                                                Padel
                                                            </strong>
                                                        </li>
                                                    </ul>
                                                    <ul class="ft-mol-breadcrumb-links-support">
                                                        <li class="ft-mol-breadcrumb-links-support__item">
                                                            <a href="#" class="ft-mol-breadcrumb-links-support__link"
                                                                title="title text" target="_self">
                                                                Link Number 1
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-breadcrumb-links-support__item">
                                                            <a href="#" class="ft-mol-breadcrumb-links-support__link"
                                                                title="title text" target="_self">
                                                                Link Number 2
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-breadcrumb-links-support__item">
                                                            <a href="#" class="ft-mol-breadcrumb-links-support__link"
                                                                title="title text" target="_self">
                                                                Link Number 3
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-breadcrumb-links-support__item">
                                                            <a href="#" class="ft-mol-breadcrumb-links-support__link"
                                                                title="title text" target="_self">
                                                                Link Number 4
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-breadcrumb-links-support__item">
                                                            <a href="#" class="ft-mol-breadcrumb-links-support__link"
                                                                title="title text" target="_self">
                                                                Link Number 5
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-breadcrumb-links-support__item">
                                                            <a href="#" class="ft-mol-breadcrumb-links-support__link"
                                                                title="title text" target="_self">
                                                                Link Number 6
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-breadcrumb-links-support__item">
                                                            <a href="#" class="ft-mol-breadcrumb-links-support__link"
                                                                title="title text" target="_self">
                                                                Link Number 7
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    <div class="ft-mol-breadcrumb__mask">
                                                        <figure class="ft-img">
                                                            <picture>
                                                                <source media="(min-width: 768px)"
                                                                    srcset="/cds-statics/assets/img/banners/ft-mol-breadcrumb-is-sectioned--template.png">
                                                                <source media="(min-width: 250px)"
                                                                    srcset="/cds-statics/assets/img/banners/ft-mol-breadcrumb-is-sectioned--template.png,
                                                                /cds-statics/assets/img/banners/ft-mol-breadcrumb-is-sectioned--template.png 2x">
                                                                <img src="/cds-statics/assets/img/banners/ft-mol-breadcrumb-is-sectioned--template.png"
                                                                    width="656" height="381" loading="lazy"
                                                                    class="ft-helper-img-rd" alt="alt text"
                                                                    title="title text">
                                                            </picture>
                                                        </figure>
                                                    </div>
                                                </nav>
                                            </div>`,
        "bg-illustration": `<div class="ft-org-breadcrumb ft-org-breadcrumb--is-bg">
                                                <nav class="ft-mol-breadcrumb ft-mol-breadcrumb-is--sectioned">
                                                    <ul class="ft-mol-breadcrumb-section">
                                                        <li
                                                            class="ft-mol-breadcrumb-section__previous ft-mol-breadcrumb-section__previousIs-nav">
                                                            <span class="ft-mol-breadcrumb-section-txt">
                                                                Padel
                                                            </span>
                                                        </li>
                                                        <li class="ft-mol-breadcrumb-section__title">
                                                            <strong class="ft-mol-breadcrumb-section-title">
                                                                El Mundial
                                                            </strong>
                                                        </li>
                                                    </ul>
                                                    <ul class="ft-mol-breadcrumb-links-support">
                                                        <li class="ft-mol-breadcrumb-links-support__item">
                                                            <a href="#" class="ft-mol-breadcrumb-links-support__link"
                                                                title="title text" target="_self">
                                                                Link Number 1
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-breadcrumb-links-support__item">
                                                            <a href="#" class="ft-mol-breadcrumb-links-support__link"
                                                                title="title text" target="_self">
                                                                Link Number 2
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-breadcrumb-links-support__item">
                                                            <a href="#" class="ft-mol-breadcrumb-links-support__link"
                                                                title="title text" target="_self">
                                                                Link Number 3
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-breadcrumb-links-support__item">
                                                            <a href="#" class="ft-mol-breadcrumb-links-support__link"
                                                                title="title text" target="_self">
                                                                Link Number 4
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-breadcrumb-links-support__item">
                                                            <a href="#" class="ft-mol-breadcrumb-links-support__link"
                                                                title="title text" target="_self">
                                                                Link Number 5
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-breadcrumb-links-support__item">
                                                            <a href="#" class="ft-mol-breadcrumb-links-support__link"
                                                                title="title text" target="_self">
                                                                Link Number 6
                                                            </a>
                                                        </li>
                                                        <li class="ft-mol-breadcrumb-links-support__item">
                                                            <a href="#" class="ft-mol-breadcrumb-links-support__link"
                                                                title="title text" target="_self">
                                                                Link Number 7
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    <div class="ft-mol-breadcrumb__mask"></div>
                                                    <div class="ft-mol-breadcrumb__illustration">
                                                        <figure class="ft-img">
                                                            <picture>
                                                                <source media="(min-width: 768px)"
                                                                    srcset="/cds-statics/assets/img/banners/ft-mol-breadcrumb-is-sectioned-illustration--template.svg">
                                                                <source media="(min-width: 250px)"
                                                                    srcset="/cds-statics/assets/img/banners/ft-mol-breadcrumb-is-sectioned-illustration--template.svg,
                                                                /cds-statics/assets/img/banners/ft-mol-breadcrumb-is-sectioned-illustration--template.svg 2x">
                                                                <img src="/cds-statics/assets/img/banners/ft-mol-breadcrumb-is-sectioned-illustration--template.svg"
                                                                    width="656" height="381" loading="lazy"
                                                                    class="ft-helper-img-rd" alt="alt text"
                                                                    title="title text">
                                                            </picture>
                                                        </figure>
                                                    </div>
                                                </nav>
                                            </div>`
    };

    const baseArgTypes = [
        { key: "variant", control: "select", desc: "Variante del organismo (markup verbatim del showroom).", options: [
            ["base", "Base"],
            ["has-home", "Tiene icono home"],
            ["has-lvl", "Tiene niveles"],
            ["has-1-lvl", "Tiene 1 nivel"],
            ["bg-photo", "Tipo fondo · fotografía"],
            ["bg-illustration", "Tipo fondo · ilustración"]
        ] }
    ];
    const baseArgs = { variant: "base" };

    function live(a) {
        return VARIANTS[a.variant] || VARIANTS["base"];
    }

    const overview = `<div class="cb-docs__inner">
        <h1>Breadcrumb</h1>
        <p class="cb-docs__lead">Organismo del 42DS (<code>.ft-org-breadcrumb</code>): contenedor de la miga de pan (<code>.ft-mol-breadcrumb</code>), con variante de fondo seccionado (<code>--is-bg</code>).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/organism/breadcrumb.css</code></td><td>CSS del organismo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>molecules/breadcrumb.css</code></td><td>CSS de la molécula interna</td><td>Siempre</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>. El organismo aporta el marco; la navegación vive en la molécula <code>.ft-mol-breadcrumb</code> (con sus modificadores <code>-has--home</code>, <code>-has--lvl</code>, <code>-is--sectioned</code>).</div>

        <h2>Variantes</h2>
        <table class="cb-table">
            <thead><tr><th>Variante</th><th>Clases</th></tr></thead>
            <tbody>
                <tr><td>Base</td><td><code>.ft-org-breadcrumb</code> &gt; <code>.ft-mol-breadcrumb</code></td></tr>
                <tr><td>Tiene icono home</td><td><code>.ft-mol-breadcrumb-has--home</code></td></tr>
                <tr><td>Tiene niveles</td><td><code>.ft-mol-breadcrumb-has--lvl</code> + <code>-links-support</code></td></tr>
                <tr><td>Tiene 1 nivel</td><td><code>-has--lvl -has--1-lvl</code></td></tr>
                <tr><td>Tipo fondo</td><td><code>.ft-org-breadcrumb--is-bg</code> + <code>-is--sectioned</code> (foto o ilustración)</td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas (<code>breadcrumb-[marca].scss</code>). Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/organism/breadcrumb/_breadcrumb.scss</code> · markup: <code>fourty/organisms/organism-breadcrumb.html</code></p>
    </div>`;

    const DEF = {
        id: "breadcrumb-org",
        name: "Breadcrumb",
        group: "Organisms",
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(DEF);
    window.SB.loadMarkup(DEF, document.currentScript && document.currentScript.src, { full: true });
})();
