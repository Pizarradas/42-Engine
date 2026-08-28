/* ════════════════════════════════════════════════════════════════════════
   organisms/paywall/paywall.js — Organisms / Paywall
   Casuística REAL de scss/fourties/organism/paywall/_paywall.scss (.org-paywall).
   Markup VERBATIM de fourty/organisms/organism-paywall.html. Cero invención de API.

   Criterio ORGANISMOS: controles MÍNIMOS (un solo select de variante, o ninguno). La
   fidelidad la aporta el MARKUP — construcción literal del showroom. Rutas normalizadas
   (../../cds-statics → /cds-statics).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";

    /* ▼ SINGLE SOURCE OF TRUTH — markup verbatim por variante ▼ */
    const VARIANTS = {
        "base": `<!-- ORG: paywall -->
                                            <section class="org-paywall" aria-labelledby="paywall-title" lang="es"
                                                role="region">

                                                <h2 id="paywall-title" class="org-paywall__title">Esta noticia es
                                                    Premium</h2>
                                                <p class="org-paywall__subtitle">Empieza a disfrutar hoy mismo sin
                                                    límites</p>

                                                <div class="org-paywall__content">
                                                    <!-- contenido web -->
                                                    <section class="org-paywall__box org-paywall__box--web"
                                                        aria-labelledby="box-web-title" role="region">
                                                        <h3 id="box-web-title" class="org-paywall__box-title">Contenido
                                                            Web</h3>

                                                        <!-- planes como lista nativa -->
                                                        <ul class="org-paywall__plans">
                                                            <li class="org-paywall__plans-item">
                                                                <!-- plan mensual -->
                                                                <a href="#"
                                                                    class="org-paywall__plan org-paywall__plan--link"
                                                                    aria-label="Suscripción Contenido Web mensual, 4,99 euros al mes. Suscríbete">
                                                                    <p class="org-paywall__plans-price">
                                                                        <data value="4.99">4,99&nbsp;€</data>
                                                                        <span class="org-paywall__plans-unit"
                                                                            aria-hidden="true">/mes</span>
                                                                    </p>
                                                                    <div class="org-paywall__plans-conditions">
                                                                        <p class="org-paywall__plans-period">Mensual</p>
                                                                        <span
                                                                            class="org-paywall__plans-cta">Suscríbete</span>
                                                                    </div>
                                                                </a>
                                                            </li>

                                                            <li
                                                                class="org-paywall__plans-item org-paywall__plans-item--featured">
                                                                <!-- plan trimestral -->
                                                                <a href="#"
                                                                    class="org-paywall__plan org-paywall__plan--link"
                                                                    aria-label="Suscripción Contenido Web trimestral, 6 euros cada 3 meses. Suscríbete">
                                                                    <span class="org-paywall__badge">La más
                                                                        elegida</span>

                                                                    <p class="org-paywall__plans-price">
                                                                        <data value="6.00">6&nbsp;€</data>
                                                                        <span class="org-paywall__plans-unit"
                                                                            aria-hidden="true">/ 3 meses</span>
                                                                    </p>

                                                                    <p class="org-paywall__plan-was">
                                                                        <del>Antes 12,99&nbsp;€ / 3 meses</del>
                                                                    </p>

                                                                    <div class="org-paywall__plans-conditions">
                                                                        <p class="org-paywall__plans-period">Trimestral
                                                                        </p>
                                                                        <span
                                                                            class="org-paywall__plans-cta">Suscríbete</span>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                        </ul>

                                                        <p
                                                            class="org-paywall__text org-paywall__text--info org-paywall__text--mf">
                                                            <strong>Elige la periodicidad que más se ajusta a ti y
                                                                disfruta:</strong>
                                                        </p>

                                                        <!-- listado de características -->
                                                        <ul class="org-paywall__box-benefits">
                                                            <li class="org-paywall__box-benefits-item">Acceso ilimitado
                                                                a todas
                                                                las noticias</li>
                                                            <li class="org-paywall__box-benefits-item">Pasatiempos y
                                                                newsletters
                                                                exclusivas</li>
                                                            <li class="org-paywall__box-benefits-item">Club del
                                                                Suscriptor: con
                                                                sorteos y descuentos</li>
                                                            <li class="org-paywall__box-benefits-item">
                                                                <a href="#">Cancela cuando quieras</a>
                                                            </li>
                                                        </ul>
                                                    </section>

                                                    <!-- edición impresa -->
                                                    <section class="org-paywall__box org-paywall__box--print"
                                                        aria-labelledby="box-print-title" role="region">
                                                        <h3 id="box-print-title" class="org-paywall__box-title">Y con
                                                            Edición
                                                            Impresa Digital</h3>

                                                        <ul class="org-paywall__plans">
                                                            <li class="org-paywall__plans-item">
                                                                <!-- plan trimestral -->
                                                                <a href="#"
                                                                    class="org-paywall__plan org-paywall__plan--link"
                                                                    aria-label="Suscripción con Edición Impresa Digital trimestral, 30 euros cada 3 meses. Suscríbete">
                                                                    <p class="org-paywall__plans-price">
                                                                        <data value="30.00">30&nbsp;€</data>
                                                                        <span class="org-paywall__plans-unit"
                                                                            aria-hidden="true">/ 3 meses</span>
                                                                    </p>

                                                                    <p class="org-paywall__plan-was">
                                                                        <del>Antes 44&nbsp;€ / 3 meses</del>
                                                                    </p>

                                                                    <div class="org-paywall__plans-conditions">
                                                                        <p class="org-paywall__plans-period">Trimestral
                                                                        </p>
                                                                        <span
                                                                            class="org-paywall__plans-cta">Suscríbete</span>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                        </ul>

                                                        <ul class="org-paywall__box-benefits">
                                                            <li class="org-paywall__box-benefits-item">Todas las
                                                                ventajas de
                                                                Contenido Web</li>
                                                            <li class="org-paywall__box-benefits-item">Pasatiempos y
                                                                newsletters
                                                                exclusivas</li>
                                                            <li class="org-paywall__box-benefits-item">
                                                                <strong>Y además, la Edición Impresa Digital y todos los
                                                                    suplementos</strong>
                                                            </li>
                                                            <li class="org-paywall__box-benefits-item">
                                                                <a href="#">Cancela cuando quieras</a>
                                                            </li>
                                                        </ul>
                                                    </section>
                                                </div>

                                                <p class="org-paywall__text org-paywall__text--block">
                                                    Descubre todas las tarifas
                                                    <a href="#">aquí</a>.
                                                </p>

                                                <p
                                                    class="org-paywall__text org-paywall__text--block org-paywall__text org-paywall__text--divider">
                                                    <strong>¿Ya eres suscriptor?</strong>
                                                    <a href="#">Inicia sesión</a>
                                                </p>
                                            </section>
                                            <!-- end // ORG: paywall -->`
    };

    const baseArgTypes = [];
    const baseArgs = {};

    function live() {
        return VARIANTS["base"];
    }

    const overview = `<div class="cb-docs__inner">
        <h1>Paywall</h1>
        <p class="cb-docs__lead">Organismo del 42DS (<code>.org-paywall</code>): muro de suscripción — reclamo «contenido Premium» con las cajas de oferta (web / web+papel) y CTAs. ⚠ Usa el prefijo NO estándar <code>.org-paywall</code> (sin <code>ft-</code>), como <code>cerca</code> o <code>mol-divider</code>.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/organism/paywall.css</code></td><td>CSS del organismo</td><td>Siempre</td></tr>
                <tr><td>JS (Piano / suscripción)</td><td>JavaScript</td><td>En producción (oferta real). Aquí estático.</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout"><strong>Prefijo no estándar</strong> <code>.org-paywall</code> (sin <code>ft-</code>): es intencional en el DS. Estado estático honesto; la oferta real (precios, alta) la inyecta el JS del consumidor.</div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.org-paywall</code></td></tr>
                <tr><td>Título / subtítulo</td><td><code>__title</code> · <code>__subtitle</code></td></tr>
                <tr><td>Cajas de oferta</td><td><code>__box</code> (<code>--web</code> / web+papel)</td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas. Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/organism/paywall/_paywall.scss</code> · markup: <code>fourty/organisms/organism-paywall.html</code></p>
    </div>`;

    const DEF = {
        id: "paywall",
        name: "Paywall",
        group: "Organisms",
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(DEF);
    window.SB.loadMarkup(DEF, document.currentScript && document.currentScript.src, { full: true });
})();
