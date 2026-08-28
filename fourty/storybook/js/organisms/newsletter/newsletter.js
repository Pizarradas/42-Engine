/* ════════════════════════════════════════════════════════════════════════
   organisms/newsletter/newsletter.js — Organisms / Newsletter
   Casuística REAL de scss/fourties/organism/newsletter/_newsletter.scss (.ft-org-newsletter).
   Markup VERBATIM del showroom (organism-newsletter.html). Cero invención de API.

   Criterio ORGANISMOS: controles MÍNIMOS (un solo select de variante, o ninguno). La
   fidelidad la aporta el MARKUP — construcción literal del showroom. Rutas normalizadas
   (../../cds-statics → /cds-statics).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";

    /* ▼ SINGLE SOURCE OF TRUTH — markup verbatim por variante ▼ */
    const VARIANTS = {
        "base": `<!-- org: newsletter -->
                                            <div class="ft-org-newsletter">
                                                <div class="ft-mol-headband">
                                                    <div class="ft-mol-headband__title">
                                                        Suscríbete a nuestras Newsletters
                                                    </div>
                                                </div>
                                                <p class="ft-text">
                                                    Recibe en tu correo electrónico una selección de las noticias más importantes. Para recibir
                                                    nuestras newsletters es necesario estar registrado. Si ya te has logado, puedes seleccionar
                                                    la
                                                    que quieres recibir.
                                                </p>
                                                <!-- org: newsletter: item 1-->
                                                <div class="ft-mol-masonry">
                                                    <div class="ft-mol-masonry__picture">
                                                        <a href="#" title="titulo">
                                                            <picture>
                                                                <source media="(min-width: 768px)"
                                                                    srcset="https://estaticos-cdn.prensaiberica.es/clip/3a6f5b08-e602-4c48-92c8-4e7127decc37_source-aspect-ratio_default_0.jpeg">
                                                                <source media="(min-width: 250px)"
                                                                    srcset="https://estaticos-cdn.prensaiberica.es/clip/3a6f5b08-e602-4c48-92c8-4e7127decc37_source-aspect-ratio_default_0.jpeg,
                                                                                            https://estaticos-cdn.prensaiberica.es/clip/3a6f5b08-e602-4c48-92c8-4e7127decc37_source-aspect-ratio_default_0.jpeg 2x">
                                                                <img src="https://estaticos-cdn.prensaiberica.es/clip/3a6f5b08-e602-4c48-92c8-4e7127decc37_source-aspect-ratio_default_0.jpeg"
                                                                    loading="lazy" class="ft-helper-img-rd" alt="alt text" title="title text"
                                                                    width="237" height="197">
                                                            </picture>
                                                        </a>
                                                    </div>
                                                    <div class="ft-mol-masonry__content">
                                                        <a href="#" class="ft-mol-masonry__previous" title="title text" target="_self">
                                                            Juan Cruz
                                                        </a>
                                                        <h2 class="ft-mol-masonry__contentTitle">
                                                            <a href="#" title="titulo" class="ft-link ft-link--secondary">
                                                                El periodista descalzo
                                                            </a>
                                                        </h2>
                                                        <p class="ft-mol-masonry__contentText">
                                                            Newsletter de cultura
                                                        </p>
                                                        <a href="#"
                                                            class="ft-link ft-link--hasIcon ft-link--hasIcon-plus ft-helper-fontSize-body-M"
                                                            title="title text" target="_self">
                                                            Me interesa
                                                        </a>
                                                    </div>
                                                </div>
                                                <!-- org: newsletter: item 1-->
                                                <div class="ft-mol-masonry">
                                                    <div class="ft-mol-masonry__content">
                                                        <a href="#" class="ft-mol-masonry__previous" title="title text" target="_self">
                                                            Mario Saavedra
                                                        </a>
                                                        <h2 class="ft-mol-masonry__contentTitle">
                                                            <a href="#" title="titulo" class="ft-link ft-link--secondary">
                                                                Mapamundi
                                                            </a>
                                                        </h2>
                                                        <p class="ft-mol-masonry__contentText">
                                                            Newsletter de internacional
                                                        </p>
                                                        <a href="#"
                                                            class="ft-link ft-link--hasIcon ft-link--hasIcon-plus ft-helper-fontSize-body-M"
                                                            title="title text" target="_self">
                                                            Me interesa
                                                        </a>
                                                    </div>
                                                </div>
                                                <!-- org: newsletter: item 1-->
                                                <div class="ft-mol-masonry">
                                                    <div class="ft-mol-masonry__content">
                                                        <a href="#" class="ft-mol-masonry__previous" title="title text" target="_self">
                                                            Gema Robles
                                                        </a>
                                                        <h2 class="ft-mol-masonry__contentTitle">
                                                            <a href="#" title="titulo" class="ft-link ft-link--secondary">
                                                                El pulso de España
                                                            </a>
                                                        </h2>
                                                        <p class="ft-mol-masonry__contentText">
                                                            Newsletter de política
                                                        </p>
                                                        <a href="#"
                                                            class="ft-link ft-link--hasIcon ft-link--hasIcon-plus ft-helper-fontSize-body-M"
                                                            title="title text" target="_self">
                                                            Me interesa
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- end // org: newsletter -->`
    };

    const baseArgTypes = [];
    const baseArgs = {};

    function live() {
        return VARIANTS["base"];
    }

    const overview = `<div class="cb-docs__inner">
        <h1>Newsletter</h1>
        <p class="cb-docs__lead">Organismo del 42DS (<code>.ft-org-newsletter</code>): bloque de alta a boletín — reclamo, descripción y formulario de suscripción por email.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/organism/newsletter.css</code></td><td>CSS del organismo</td><td>Siempre</td></tr>
                <tr><td><code>molecules/form</code></td><td>CSS del formulario interno</td><td>Siempre</td></tr>
                <tr><td>JS (alta real)</td><td>JavaScript</td><td>En producción (validar + enviar). Aquí estático.</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Estado <strong>estático honesto</strong>: el alta (validación + envío) la gobierna el JS del consumidor; aquí el formulario se muestra en su estado por defecto.</div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-org-newsletter</code></td></tr>
                <tr><td>Formulario</td><td><code>.ft-mol-form</code></td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas. Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/organism/newsletter/_newsletter.scss</code> · markup: <code>fourty/organisms/organism-newsletter.html</code></p>
    </div>`;

    const DEF = {
        id: "newsletter",
        name: "Newsletter",
        group: "Organisms",
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(DEF);
    window.SB.loadMarkup(DEF, document.currentScript && document.currentScript.src, { full: true });
})();
