/* ════════════════════════════════════════════════════════════════════════
   organisms/accordion/accordion.js — Organisms / Accordion
   Casuística REAL de scss/fourties/organism/accordion/_accordion.scss (.ft-org-accordion).
   Markup VERBATIM de fourty/organisms/organism-accordion.html. Cero invención de API.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* Unidad repetible, verbatim del showroom. */
    const UNIT = `<details class="ft-mol-accordion__details">
    <summary class="ft-mol-accordion__summary"
        id="accordion-summary-1"
        aria-controls="accordion-panel-1">
        <div class="ft-mol-sorting ft-mol-sorting--team"
            role="region" aria-label="Ranking">
            <ul>

                <li
                    class="ft-mol-sorting__list ft-mol-sorting__list--primary">
                    <div class="ft-mol-sorting__info">
                        <span
                            class="ft-mol-sorting__infoNumber">2º</span>
                        <h3
                            class="ft-mol-sorting__infoName">
                            España </h3>
                    </div>

                    <div class="ft-mol-sorting__status">
                        <span
                            class="ft-mol-sorting__statusBadge">Clasificado</span>
                        <span
                            class="ft-mol-sorting__statusPoints">12
                            puntos</span>
                    </div>
                </li>
            </ul>
        </div>
    </summary>
    <div class="ft-mol-accordion__text"
        id="accordion-panel-1" role="region"
        aria-labelledby="accordion-summary-1">
        <p
            class="ft-helper-bgColor-background-lightGrey ft-helper-fontSize-body-M ft-helper-spacer-inner-xxs">
            dddd Something small enough to escape casual
            notice.
        </p>
        <div
            class="ft-mol-lnkbox ft-mol-lnkbox--simple">
            <p
                class="ft-helper-bgColor-background-lightGrey ft-helper-fontSize-body-M ft-helper-fontWeight-700 ft-helper-spacer-b-0">
                Puntos
            </p>
            <div class="ft-mol-lnkbox__container">
                <div class="ft-mol-lnkbox__data">
                    <p
                        class="ft-mol-lnkbox__data-title">
                        <span
                            class="ft-helper-fontSize-body-M">
                            Lorem ipsum dolor est
                        </span>
                    </p>
                    <p
                        class="ft-mol-lnkbox__data-subtitle">
                        <span
                            class="ft-helper-fontSize-body-M ft-helper-fontColor-quaternary">
                            175 pts
                        </span>
                    </p>
                </div>

            </div>
            <div class="ft-mol-lnkbox__container">
                <div class="ft-mol-lnkbox__data">
                    <p
                        class="ft-mol-lnkbox__data-title">
                        <span
                            class="ft-helper-fontSize-body-M">
                            Lorem ipsum dolor est
                        </span>
                    </p>
                    <p
                        class="ft-mol-lnkbox__data-subtitle">
                        <span
                            class="ft-helper-fontSize-body-M ft-helper-fontColor-quaternary">
                            32 pts
                        </span>
                    </p>
                </div>

            </div>
            <div class="ft-mol-lnkbox__container">
                <div class="ft-mol-lnkbox__data">
                    <p
                        class="ft-mol-lnkbox__data-title">
                        <span
                            class="ft-helper-fontSize-body-M">
                            Lorem ipsum dolor est
                        </span>
                    </p>
                    <p
                        class="ft-mol-lnkbox__data-subtitle">
                        <span
                            class="ft-helper-fontSize-body-M ft-helper-fontColor-quaternary">
                            58 pts
                        </span>
                    </p>
                </div>

            </div>
        </div>
        <div
            class="ft-mol-lnkbox ft-mol-lnkbox--simple">
            <p
                class="ft-helper-bgColor-background-lightGrey ft-helper-fontSize-body-M ft-helper-fontWeight-700 ft-helper-spacer-b-0">
                Desempate
            </p>
            <div class="ft-mol-lnkbox__container">
                <div class="ft-mol-lnkbox__data">
                    <p
                        class="ft-mol-lnkbox__data-title">
                        <img src="/cds-statics/assets/img/icons/icon-alerts--ok.svg"
                            class="ft-helper-img-rd"
                            width="10" height="10">
                        <span
                            class="ft-helper-fontSize-body-M">
                            8/8 equipos en cuartos
                        </span>
                    </p>

                </div>

            </div>
            <div class="ft-mol-lnkbox__container">
                <div class="ft-mol-lnkbox__data">
                    <p
                        class="ft-mol-lnkbox__data-title">
                        <img src="/cds-statics/assets/img/icons/icon-ball-soccer.svg"
                            class="ft-helper-img-rd"
                            width="10" height="10">
                        <span
                            class="ft-helper-fontSize-body-M">
                            16/16 equipos en octavos
                        </span>
                    </p>

                </div>

            </div>
            <div class="ft-mol-lnkbox__container">
                <div class="ft-mol-lnkbox__data">
                    <p
                        class="ft-mol-lnkbox__data-title">
                        <img src="/cds-statics/assets/img/icons/hamburger-menu-black.svg"
                            class="ft-helper-img-rd"
                            width="10" height="10">
                        <span
                            class="ft-helper-fontSize-body-M">
                            28/32 equipos en octavos
                        </span>
                    </p>

                </div>

            </div>
        </div>
    </div>
</details>`;

    const baseArgTypes = [
        { key: "count", control: "number", desc: "Número de elementos (rango 1-8).", min: 1, max: 8 }
    ];
    const baseArgs = { count: "3" };

    function live(a) {
        const n = Math.max(1, Math.min(8, parseInt(a.count, 10) || 1));
        let items = "";
        for (let i = 1; i <= n; i++) items += (UNIT.split("accordion-summary-1").join("accordion-summary-" + i).split("accordion-panel-1").join("accordion-panel-" + i).split(">2\u00ba<").join(">" + i + "\u00ba<").replace("<details class=", i === 1 ? "<details open class=" : "<details class="));
        return `<div class="ft-org-accordion"><div class="ft-mol-accordion" role="region" aria-labelledby="accordion-principal-title">${items}</div></div>`;
    }

    const overview = `<div class="cb-docs__inner">
        <h1>Accordion</h1>
        <p class="cb-docs__lead">Organismo del 42DS (<code>.ft-org-accordion</code>): apila entradas de acordeón nativo, cada una con un resumen de clasificación y un panel de datos.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/organism/accordion.css</code></td><td>CSS del organismo (overrides)</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>molecules/accordion.css</code> · <code>sorting.css</code> · <code>lnkbox.css</code></td><td>CSS de las moléculas internas</td><td>Siempre (el organismo las compone)</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS (acordeón nativo &lt;details&gt;)</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>: el acordeón usa &lt;details&gt;/&lt;summary&gt; nativos. El organismo reestila la molécula <code>.ft-mol-sorting</code> del resumen (número en círculo) y la <code>.ft-mol-lnkbox</code> del panel.</div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-org-accordion</code></td></tr>
                <tr><td>Acordeón</td><td><code>.ft-mol-accordion</code> &gt; <code>&lt;details&gt;</code></td></tr>
                <tr><td>Resumen</td><td><code>&lt;summary&gt;</code> &gt; <code>.ft-mol-sorting--team</code></td></tr>
                <tr><td>Panel</td><td><code>.ft-mol-accordion__text</code> &gt; <code>.ft-mol-lnkbox--simple</code></td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas (<code>accordion-[marca].scss</code>). Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/organism/accordion/_accordion.scss</code> · markup: <code>fourty/organisms/organism-accordion.html</code></p>
    </div>`;

    const DEF = {
        id: "accordion-org",
        name: "Accordion",
        group: "Organisms",
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(DEF);
    window.SB.loadMarkup(DEF, document.currentScript && document.currentScript.src, { full: true });
})();
