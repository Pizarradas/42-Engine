/* ════════════════════════════════════════════════════════════════════════
   organisms/authors/authors.js — Organisms / Authors
   Casuística REAL de scss/fourties/organism/authors/_authors.scss (.ft-org-authors).
   Markup tomado de fourty/organisms/organism-authors.html. Cero invención de API.

   Authors es un organismo CONTENEDOR: .ft-org-authors no tiene modificadores propios;
   apila una o más moléculas .ft-mol-authors (que sí tienen variantes). Su casuística
   está en la COMPOSICIÓN: nº de autores + variante de las tarjetas. Story plana "Base"
   interactiva + subgrupo "Markup" (catálogo HTML editable) cargado de btn... authors.html.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de .ft-mol-authors ▼ */
    const DATA = {
        // valor = clase(es) completas de la molécula que compone el organismo
        layouts: [
            ["ft-mol-authors--horizontal ft-mol-authors--reduced", "horizontal · reduced"],
            ["ft-mol-authors--horizontal", "horizontal"],
            ["", "vertical (defecto)"],
            ["ft-mol-authors--bordered", "bordered"],
            ["ft-mol-authors--background", "background"],
            ["ft-mol-authors--premium", "premium"]
        ]
    };
    const NAMES = ["Andrea de los Santos", "Marc Vidal", "Lucía Romero"];
    const PHOTO = "https://estaticos-cdn.prensaiberica.es/clip/3a5b2a1b-70e3-4746-a273-67c33eb9016e_source-aspect-ratio_default_0.jpg";

    /* Una tarjeta de autor (.ft-mol-authors) con clases REALES del showroom. */
    function authorCard(layout, name) {
        return `<div class="ft-mol-authors ${layout}">
          <div class="ft-mol-authors__main">
            <a href="#" class="ft-mol-authors__photo" title="${esc(name)}" target="_self">
              <img src="${PHOTO}" width="60" height="60" class="ft-mol-authors__photoImage ft-helper-img-rd" alt="" title="${esc(name)}">
            </a>
            <div class="ft-mol-authors__mainInfo">
              <h2 class="ft-mol-authors__name">${esc(name)}</h2>
              <p class="ft-mol-authors__category">Redacción · Sección</p>
              <div class="ft-mol-authors__rrss">
                <a title="Facebook" target="_blank" rel="nofollow" href="#"><i class="ft-mol-rrss ft-mol-rrssFacebook--default"></i></a>
                <a title="Twitter" target="_blank" rel="nofollow" href="#"><i class="ft-mol-rrss ft-mol-rrssTwitter--default"></i></a>
                <a title="Whatsapp" target="_blank" rel="nofollow" href="#"><i class="ft-mol-rrss ft-mol-rrssWhatsapp--default"></i></a>
                <a title="Contacto" target="_blank" rel="nofollow" href="#"><i class="ft-mol-rrss ft-mol-rrss--txt ft-mol-rrssEmail--default">Contacto</i></a>
              </div>
            </div>
          </div>
          <div class="ft-mol-authors__content">
            <p class="ft-mol-authors__contentDescription">Descripción del autor: lorem ipsum dolor sit amet consectetur, in quis nulla et ut enim.</p>
            <div class="ft-mol-tagsNews">
              <p class="ft-mol-tagsNews__title">Escribe sobre</p>
              <ul class="ft-mol-tagsNews__tags">
                <li class="ft-tag ft-tag--sm ft-tag--linkBasis"><a href="#" target="_self" title="Trenes" class="ft-link ft-link--secondary">Trenes</a></li>
                <li class="ft-tag ft-tag--sm ft-tag--linkBasis"><a href="#" target="_self" title="Metro" class="ft-link ft-link--secondary">Metro</a></li>
                <li class="ft-tag ft-tag--sm ft-tag--linkBasis"><a href="#" target="_self" title="Transporte" class="ft-link ft-link--secondary">Transporte</a></li>
              </ul>
            </div>
            <p class="ft-mol-authors__contentText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt nisi ut ex mollis luctus. Quisque euismod nunc eu ante viverra.</p>
          </div>
        </div>`;
    }

    /* ─── BASE — .ft-org-authors (contenedor de .ft-mol-authors) ─── */
    const baseArgTypes = [
        { key: "layout", control: "select", desc: "Variante de las tarjetas .ft-mol-authors que compone el organismo.", options: DATA.layouts },
        { key: "count", control: "number", desc: "Número de autores en el organismo (rango razonable 1-6; si n > 3 los nombres ciclan).", min: 1, max: 6 }
    ];
    const baseArgs = { layout: "ft-mol-authors--horizontal ft-mol-authors--reduced", count: "2" };

    function live(a) {
        // Clamp suave (1..20). Si n > NAMES.length los nombres ciclan — la idea es ver
        // cómo se comporta el organismo apilando muchas tarjetas, no la unicidad de cada una.
        const n = Math.max(1, Math.min(20, parseInt(a.count, 10) || 1));
        const items = [];
        for (let i = 0; i < n; i++) items.push(authorCard(a.layout, NAMES[i % NAMES.length]));
        return `<div class="ft-org-authors">${items.join("")}</div>`;
    }

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Authors</h1>
        <p class="cb-docs__lead">Organismo del 42DS (<code>.ft-org-authors</code>) que apila una o más tarjetas de autor <code>.ft-mol-authors</code>.</p>

        <h2>Dependencias</h2>
        <p>Al ser un organismo de composición, reúne el CSS de varias piezas. Para renderizar <code>.ft-org-authors</code>:</p>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/organism/authors.css</code></td><td>CSS del organismo (contenedor)</td><td>Siempre</td></tr>
                <tr><td><code>brands/[marca]/molecules/authors.css</code></td><td>CSS de la tarjeta (molécula)</td><td>Siempre</td></tr>
                <tr><td><code>molecules/rrss.css</code> · <code>molecules/tagsNews.css</code> · <code>atoms/tag.css</code> · <code>atoms/link.css</code></td><td>CSS de las piezas reutilizadas</td><td>Según el contenido de la tarjeta (RRSS, tags, enlaces)</td></tr>
                <tr><td><code>scss/fourties/organism/authors/_authors.scss</code> + <code>authors-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar (importa <code>abstracts</code> + <code>vendors/bourbon</code>)</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Para cubrir todo de golpe (incluidos los helpers <code>ft-helper-*</code> como <code>ft-helper-img-rd</code>), importa el bundle <code>brands/[marca]/[marca]-core.css</code> tras <code>setting.css</code>; la lista individual de arriba es para <em>tree-shaking</em>.</div>

        <h2>Composición (átomos y moléculas que reutiliza)</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Organismo</td><td><code>.ft-org-authors</code></td></tr>
                <tr><td>Tarjeta (molécula)</td><td><code>.ft-mol-authors</code> → <code>__main</code> (<code>__photo</code>·<code>__name</code>·<code>__category</code>·<code>__rrss</code>) + <code>__content</code> (<code>__contentDescription</code>·<code>__contentText</code>)</td></tr>
                <tr><td>RRSS</td><td><code>.ft-mol-rrss</code> · <code>.ft-mol-rrss--txt</code></td></tr>
                <tr><td>Tags</td><td><code>.ft-mol-tagsNews</code> · <code>.ft-tag--linkBasis</code> · <code>.ft-link--secondary</code></td></tr>
            </tbody>
        </table>

        <h2>Variantes de la tarjeta (.ft-mol-authors)</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>--horizontal</code></td><td>disposición horizontal (foto + info en fila)</td></tr>
                <tr><td><code>--reduced</code></td><td>versión compacta</td></tr>
                <tr><td><code>--bordered</code></td><td>con borde</td></tr>
                <tr><td><code>--background</code></td><td>con fondo</td></tr>
                <tr><td><code>--premium</code></td><td>estilo premium</td></tr>
            </tbody>
        </table>

        <div class="cb-callout">Las fotos cargan de un CDN externo y los iconos RRSS son <code>data:</code> inline → la tarjeta se ve sin servidor (salvo la imagen, que necesita red).</div>
        <p class="cb-src">Fuente: <code>scss/fourties/organism/authors/_authors.scss</code> · markup: <code>fourty/organisms/organism-authors.html</code></p>
    </div>`;

    const ORG = {
        id: "authors",
        name: "Authors",
        group: "Organisms",
        overview,
        stories: [
            // full: el organismo ocupa todo el ancho (composición de tarjetas a lo ancho)
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(ORG);

    /* Markup original (HTML plano editable por el front) en authors.html → subgrupo "Markup". */
    window.SB.loadMarkup(ORG, document.currentScript && document.currentScript.src, { full: true });
})();
