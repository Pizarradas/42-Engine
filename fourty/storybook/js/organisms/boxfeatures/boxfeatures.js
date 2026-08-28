/* ════════════════════════════════════════════════════════════════════════
   organisms/boxfeatures/boxfeatures.js — Organisms / Boxfeatures
   Casuística REAL de scss/fourties/organism/boxfeatures/_boxfeatures.scss (.ft-org-boxfeatures).
   Markup VERBATIM de fourty/organisms/organism-boxfeatures.html. Cero invención de API.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* Unidad repetible, verbatim del showroom. */
    const UNIT = `<div class="ft-org-boxfeatures__item">
    <ul class="ft-list ft-list-functions ft-list-functions--has-icon-and-txt">
        <li class="ft-list-functions__item">
            <div class="ft-list-functions__col-lft">
              <h3 class="ft-list-functions__txt ft-helper-fontWeight-800">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </h3>
            </div>
            <div class="ft-list-functions__col-rgt">
              <span class="ft-helper-fontSize-heading-XXS">
                XX,XX
              </span>
              <!-- Comienzo Molécula Dropdown -->
              <div class="ft-mol-dropdown ft-mol-dropdown--is-list-lft ft-mol-dropdown--has-btn-nav">
                <button class="ft-btn-nav ft-btn-nav--more-v ft-mol-dropdown__trigger" name="go-to" onclick="toggleDropdown(event)" title="title text" type="button">
                    <span class="ft-btn-nav__text">
                        Desplegar más opciones
                    </span>
                    <span class="ft-btn-nav__icon"></span>
                </button>
                <ul class="ft-mol-dropdown__list">
                    <li class="ft-mol-dropdown__item">
                        <a class="ft-mol-dropdown__link" href="#" target="_self" title="title text">
                            Lorem ipsum dolor est
                        </a>
                    </li>
                    <li class="ft-mol-dropdown__item">
                        <a class="ft-mol-dropdown__link" href="#" target="_self" title="title text">
                            Lorem ipsum dolor est
                        </a>
                    </li>
                    <li class="ft-mol-dropdown__item">
                        <a class="ft-mol-dropdown__link" href="#" target="_self" title="title text">
                            Lorem ipsum dolor est
                        </a>
                    </li>
                    <li class="ft-mol-dropdown__item">
                        <a class="ft-mol-dropdown__link" href="#" target="_self" title="title text">
                            Lorem ipsum dolor est
                        </a>
                    </li>
                </ul>
            </div>
            <!-- Fin // Molécula Dropdown -->
            </div>
          </li>
        <li class="ft-list-functions__item">
            <div class="ft-list-functions__col-lft">
                <img src="/cds-statics/assets/img/icons/ft-list-functions-icon-template.svg" alt="" width="18" height="13" class="ft-helper-img-rd">
                <a class="ft-list-functions__txt">
                    Universidad Autónoma de Barcelona
                </a>
            </div>
        </li>
        <li class="ft-list-functions__item">
            <div class="ft-list-functions__col-lft">
                <img src="/cds-statics/assets/img/icons/ft-list-functions-icon-template.svg" alt="" width="18" height="13" class="ft-helper-img-rd">
                <span class="ft-list-functions__txt">
                    Cerdanyola del Vallés
                </span>
            </div>
        </li>
        <li class="ft-list-functions__item">
            <div class="ft-list-functions__col-lft">
                <img src="/cds-statics/assets/img/icons/ft-list-functions-icon-template.svg" alt="" width="18" height="13" class="ft-helper-img-rd">
                <span class="ft-list-functions__txt">
                    Facultad de Economía y Empresa
                </span>
            </div>
        </li>
    </ul>
</div>`;

    const baseArgTypes = [
        { key: "count", control: "number", desc: "Número de elementos (rango 1-6).", min: 1, max: 6 }
    ];
    const baseArgs = { count: "2" };

    function live(a) {
        const n = Math.max(1, Math.min(6, parseInt(a.count, 10) || 1));
        let items = "";
        for (let i = 1; i <= n; i++) items += (UNIT);
        return `<div class="ft-org-boxfeatures">${items}</div>`;
    }

    const overview = `<div class="cb-docs__inner">
        <h1>Boxfeatures</h1>
        <p class="cb-docs__lead">Organismo del 42DS (<code>.ft-org-boxfeatures</code>): comparativa de funciones en bloques que alternan fondo (par/impar).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/organism/boxfeatures.css</code></td><td>CSS del organismo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>atoms/list.css</code> (<code>.ft-list-functions</code>) · <code>molecules/dropdown.css</code></td><td>CSS de las piezas internas</td><td>Siempre</td></tr>
                <tr><td>JS de dropdown</td><td>JavaScript</td><td>Solo si se usan los menús (aquí cerrados)</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Los bloques alternan fondo con <code>:nth-child(odd/even)</code> automáticamente. Los menús <code>.ft-mol-dropdown</code> se muestran cerrados (los abre un JS consumidor).</div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-org-boxfeatures</code></td></tr>
                <tr><td>Ítem</td><td><code>.ft-org-boxfeatures__item</code></td></tr>
                <tr><td>Lista de funciones</td><td><code>.ft-list.ft-list-functions</code></td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas (<code>boxfeatures-[marca].scss</code>). Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/organism/boxfeatures/_boxfeatures.scss</code> · markup: <code>fourty/organisms/organism-boxfeatures.html</code></p>
    </div>`;

    const DEF = {
        id: "boxfeatures",
        name: "Boxfeatures",
        group: "Organisms",
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(DEF);
    window.SB.loadMarkup(DEF, document.currentScript && document.currentScript.src, { full: true });
})();
