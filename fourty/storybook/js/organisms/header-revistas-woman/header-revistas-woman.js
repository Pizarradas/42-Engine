/* ════════════════════════════════════════════════════════════════════════
   organisms/header-revistas-woman/header-revistas-woman.js — Organisms / Header Revistas (Woman)
   Casuística REAL de scss/fourties/organism/header-revistas/_header-revistas.scss (.ft-org-header-revistas).
   Markup VERBATIM de las páginas-layout del showroom (organism-header-revistas-woman.html). Cero invención.

   Criterio ORGANISMOS: controles MÍNIMOS (un solo select de variante/medio). La fidelidad
   la aporta el MARKUP — cada variante es el <header> literal del showroom. Cabeceras muy
   JS-driven (menús, login, idioma, sticky/affix) → estado estático honesto. Rutas
   normalizadas (../../cds-statics → /cds-statics).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";

    /* ▼ SINGLE SOURCE OF TRUTH — <header> verbatim por variante ▼ */
    const VARIANTS = {
        "woman": `<header class="ft-org-header-revistas">
        <!-- El checkbox que controla el menú desplegable -->
        <input type="checkbox" id="menu-toggle"> 
        <!-- Menú temas -->
        <div class="ft-org-header-revistas--themes">
            <nav aria-label="Temas destacados del día" class="ft-org-header-revistas--themes__breaking-news">
                <span class="ft-org-header-revistas--themes__breaking-news__title">Temas del día:</span>
                <ul>
                    <li>
                        <a href="https://woman.elperiodico.com/celebrities/irene-urdangarin-juan-urquijo-relacion-107819489"
                            title="Irene Urdangarin">Irene Urdangarin
                        </a>
                    </li>
                    <li>
                        <a href="https://woman.elperiodico.com/celebrities/exigente-entrenamiento-princesa-leonor-escuela-marin-107817851"
                            title="Princesa Leonor">Princesa Leonor
                        </a>
                    </li>
                    <li>
                        <a href="https://woman.elperiodico.com/moda/festval-vitoria-2024-famosos-alfombra-naranja-107767521"
                            title="FesTVal">FesTVal
                        </a>
                    </li>
                    <li>
                        <a href="https://woman.elperiodico.com/celebrities/kate-middleton-reaparece-escocia-fish-and-chips-107814916"
                            title="Kate Middleton">Kate Middleton
                        </a>
                    </li>
                </ul>
            </nav>
            <nav aria-label="Themes Buttons" class="ft-org-header-revistas--themes__buttons">
                <ul>
                    <li class="ft-org-header-revistas--themes__buttons--newsletter">
                        <a href="/newsletter/" title="Newsletter" external="true"
                            class="ft-btn ft-btn--tertiary">
                            Newsletter
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        <!-- Menú principal -->
        <div class="ft-org-header-revistas--main">
            <div class="ft-org-header-revistas--main__content">
                <div class="ft-org-header-revistas--main__content__container">
                    <h1><a href="/" title="Woman"
                            class="ft-org-header-revistas--main__content__container__logo"><img
                                src="https://woman.elperiodico.com/WOM/images/logotipo.svg" alt="Woman"
                                class="ft-org-header-revistas--main__content__container__logo__image">
                            <span>Woman</span></a></h1>
                    <nav aria-label="Main Menu" class="ft-org-header-revistas--main__content__container__nav">
                        <ul>
                            <li><a href="/moda/" title="Moda" external="true">
                                    Moda
                                </a> <!----></li>
                            <li><a href="/belleza/" title="Belleza" external="true">
                                    Belleza
                                </a> <!----></li>
                            <li><a href="/lifestyle/" title="Lifestyle" external="true">
                                    Lifestyle
                                </a> <!----></li>
                            <li><a href="/celebrities/" title="Celebrities" external="true">
                                    Celebrities
                                </a> <!----></li>
                            <li><a href="/podcasts/" title="Podcasts" external="true">
                                    Podcasts
                                </a> <!----></li>
                            <li><a href="/woman_tv/" title="Woman TV" external="true">
                                    Woman TV
                                </a> <!----></li>
                        </ul>
                    </nav>
                    <div class="ft-org-header-revistas--main__content__container__tools">
                        <div id="miCuentaLogin" class="ft-org-header-revistas--main__content__container__tools__user">
                            <button aria-label="Ver menú de usuario" name="avatar"
                                class="ft-org-header-revistas--main__content__container__tools__user__avatar">
                                <span id="userAcronym" class="ft-org-header-revistas--main__content__container__tools__user__avatar__initials"></span>
                            </button>
                            <nav aria-label="Perfil Menú" class="ft-org-header-revistas--main__content__container__tools__user__menu">
                                <button aria-label="Cerrar menú de usuario" name="close-user-menu"
                                    class="ft-org-header-revistas--main__content__container__tools__user__menu__close">
                                    <span>Cerrar</span>
                                </button>
                                <ul>
                                    <li><a href="https://micuenta-woman.elperiodico.com/tp/perfil" title="Ver perfil"
                                            class="ft-org-header-revistas--main__content__container__tools__user__menu__item">
                                            Ver perfil
                                        </a></li>
                                    <li><a href="https://micuenta-woman.elperiodico.com/tp/logout" title="Cerrar sesión"
                                            class="ft-org-header-revistas--main__content__container__tools__user__menu__item">
                                            Cerrar sesión
                                        </a></li>
                                </ul>
                            </nav>
                        </div> 
                        <a href="https://micuenta-woman.elperiodico.com/tp/login" title="Acceder" id="accessLoginButton"
                            class="ft-org-header-revistas--main__content__container__tools__login ft-org-header-revistas--main__content__container__tools__login--active">
                        </a>
                        <span class="ft-org-header-revistas--main__content__container__tools__separator"></span>
                        <label for="menu-toggle" class="ft-org-header-revistas--main__content__container__tools__hamburger">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <!-- Menú desplegable -->
        <div class="ft-org-header-revistas--side">
            <label for="menu-toggle" class="ft-org-header-revistas--side__background">
            </label>
            <nav aria-label="Dropdown Menu" class="ft-org-header-revistas--side__content">
                <div class="ft-org-header-revistas--side__rrss">
                    <h5 class="ft-org-header-revistas--side__rrss__title">En las redes</h5>
                    <div class="ft-mol-rrss-inline ft-mol-rrss-inline--right">
                        <div class="ft-mol-rrss-inline__items">
                            <a href="https://twitter.com/revistawoman" title="Red social twitter" target="_blank" class="ft-btn-rrss ft-btn-rrss--twitter">
                                <span class="ft-mol-rrss ft-mol-rrssTwitter--default ft-btn-rrss__icon"></span>
                                <span class="ft-btn-rrss__text">
                                    RRSS Twitter
                                </span>
                            </a>
                            <a href="https://www.facebook.com/WomanMadameFigaro" title="Red social facebook" target="_blank" class="ft-btn-rrss ft-btn-rrss--facebook">
                                <span class="ft-mol-rrss ft-mol-rrssFacebook--default ft-btn-rrss__icon"></span>
                                <span class="ft-btn-rrss__text">
                                    RRSS Facebook
                                </span>
                            </a>
                            <a href="https://instagram.com/woman_es/" title="Red social instagram" target="_blank" class="ft-btn-rrss ft-btn-rrss--instagram">
                                <span class="ft-mol-rrss ft-mol-rrssInstagram--default ft-btn-rrss__icon"></span>
                                <span class="ft-btn-rrss__text">
                                  RRSS Instagram
                                </span>
                              </a>
                        </div>
                    </div>
                </div>
                <div>
                    <nav>
                        <ul class="ft-org-header-revistas--side__items">
                            <li>
                                <a href="/moda/">
                                    Moda
                                </a>
                                <ul>
                                    <li>
                                        <div><a href="/moda/tendencias/" target="_self">
                                                Tendencias
                                            </a></div>
                                    </li>
                                    <li>
                                        <div><a href="/moda/pasarelas/" target="_self">
                                                Pasarelas
                                            </a></div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul class="ft-org-header-revistas--side__items">
                            <li>
                                <a href="/belleza/">
                                    Belleza
                                </a>
                                <ul>
                                    <li>
                                        <div><a href="/belleza/maquillaje/" target="_self">
                                                Maquillaje
                                            </a></div>
                                    </li>
                                    <li>
                                        <div><a href="/belleza/pelo/" target="_self">
                                                Cabello
                                            </a></div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul class="ft-org-header-revistas--side__items">
                            <li>
                                <a href="/lifestyle/">
                                    Lifestyle
                                </a>
                                <ul>
                                    <li>
                                        <div><a href="/lifestyle/decoracion/" target="_self">
                                                Decoración
                                            </a></div>
                                    </li>
                                    <li>
                                        <div><a href="/lifestyle/ocio/" target="_self">
                                                Ocio
                                            </a></div>
                                    </li>
                                    <li>
                                        <div><a href="/lifestyle/womanpower/" target="_self">
                                                Womanpower
                                            </a></div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul class="ft-org-header-revistas--side__items">
                            <li>
                                <a href="/celebrities/">
                                    Celebrities
                                </a>
                                <ul></ul>
                            </li>
                        </ul>
                        <ul class="ft-org-header-revistas--side__items">
                            <li>
                                <a href="/shopping/">
                                    Shopping
                                </a>
                                <ul></ul>
                            </li>
                        </ul>
                        <ul class="ft-org-header-revistas--side__items">
                            <li>
                                <a href="/podcasts/">
                                    Podcasts
                                </a>
                                <ul></ul>
                            </li>
                        </ul>
                        <ul class="ft-org-header-revistas--side__items">
                            <li>
                                <a href="/woman_tv/">
                                    WomanTV
                                </a>
                                <ul></ul>
                            </li>
                        </ul>
                        <ul class="ft-org-header-revistas--side__items">
                            <li>
                                <a href="/galerias/">
                                    Fotos
                                </a>
                                <ul></ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </nav>
        </div>
    </header>`
    };

    const baseArgTypes = [];
    const baseArgs = {};

    function live() {
        return VARIANTS["woman"];
    }

    const overview = `<div class="cb-docs__inner">
        <h1>Header Revistas (Woman)</h1>
        <p class="cb-docs__lead">Organismo del 42DS (<code>.ft-org-header-revistas</code>): cabecera de las revistas del grupo (caso Woman) — tira de «temas del día», logo central, menú principal y zona de usuario.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/organism/header-revistas.css</code></td><td>CSS del organismo</td><td>Siempre</td></tr>
                <tr><td>JS (menú, usuario, breaking news)</td><td>JavaScript</td><td>En producción. Aquí estático.</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Estado <strong>estático honesto</strong>: el menú de usuario y el de navegación los gobierna el JS del consumidor. Inspecciona con Brand <strong>Woman</strong> / <strong>Revistas</strong> para ver tipografía y colores reales. ⚠ Usa BEM con doble guion en nombres largos (<code>--themes__breaking-news</code>, <code>--main__content__container__logo</code>): es el naming real del showroom.</div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-org-header-revistas</code></td></tr>
                <tr><td>Temas del día</td><td><code>--themes</code> &gt; <code>__breaking-news</code> · <code>__buttons</code></td></tr>
                <tr><td>Principal</td><td><code>--main__content__container</code> (logo · nav · tools)</td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/fourties/organism/header-revistas/_header-revistas.scss</code> · markup: <code>fourty/organisms/organism-header-revistas-woman.html</code></p>
    </div>`;

    const DEF = {
        id: "header-revistas-woman",
        name: "Header Revistas (Woman)",
        group: "Organisms",
        // .ft-org-header-revistas NO está en el bundle de la marca por defecto (ux). Su CSS vive en
        // un fichero de marca propio que la página de showroom cargaba como <link> extra → el motor
        // lo inyecta en el canvas (assets) para que el header se renderice estilado.
        assets: ["/cds-statics/css/brands/revistas/organism/header-revistas-woman.css"],
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(DEF);
    window.SB.loadMarkup(DEF, document.currentScript && document.currentScript.src, { full: true });
})();
