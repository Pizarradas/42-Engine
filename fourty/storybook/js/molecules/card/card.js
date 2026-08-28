/* ════════════════════════════════════════════════════════════════════════
   molecules/card/card.js — Molecules / Card
   Casuística REAL de scss/fourties/molecules/card/_card.scss (.ft-mol-card*).
   Markup tomado de fourty/molecules/molecule-card.html. Cero invención de API.

   Tarjeta de juego/pasatiempo: imagen decorativa + cabecera (título + fecha), texto
   y CTA. Layouts (xs/row/center/featured), acabado bordeado y colores temáticos por
   juego (--crucigrama, --wordle, --sopa…). Una story plana interactiva "Base"
   (layout · bordeado · color de juego · textos) + subgrupo "Markup" async.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    const IMG = "/cds-statics/assets/img/decorative/ft-mol-card-crucigrama.svg";

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _card.scss ▼ */
    const DATA = {
        layouts: [
            ["", "base (columna ≥768px)"],
            ["ft-mol-card--xs", "--xs · compacta"],
            ["ft-mol-card--row", "--row · imagen + texto en fila"],
            ["ft-mol-card--center", "--center · contenido centrado ≥768px"],
            ["ft-mol-card--featured", "--featured · destacada centrada"]
        ],
        // colores temáticos por juego (fondo de la .ft-img vía var(--color-<juego>))
        games: [
            ["", "(sin color de juego)"],
            ["ft-mol-card--crucigrama", "--crucigrama"],
            ["ft-mol-card--wordle", "--wordle"],
            ["ft-mol-card--sopa", "--sopa"],
            ["ft-mol-card--sudoku", "--sudoku"],
            ["ft-mol-card--pangramax", "--pangramax"],
            ["ft-mol-card--cuadronumerico", "--cuadronumerico"]
        ],
        parts: ["__body", "__content", "__contentNew", "__image", "__header", "__headband", "__title", "__subtitle", "__date", "__text", "__footer"]
    };

    /* ─── BASE — .ft-mol-card ─── */
    const baseArgTypes = [
        { key: "layout", control: "select", desc: "Layout de la tarjeta.", options: DATA.layouts },
        { key: "bordered", control: "boolean", desc: "Modificador --bordered (borde, sombra y fondo blanco)." },
        { key: "game", control: "select", desc: "Color temático de juego (fondo de la imagen).", options: DATA.games },
        { key: "title", control: "text", desc: "Título (__title)." },
        { key: "date", control: "text", desc: "Fecha (__date)." },
        { key: "text", control: "text", desc: "Texto descriptivo (__text)." },
        { key: "btnLabel", control: "text", desc: "Texto del CTA (.ft-btn)." }
    ];
    const baseArgs = {
        layout: "", bordered: false, game: "",
        title: "Crucigrama", date: "11/05/2025",
        text: "Pon a prueba tu ingenio y encuentra la palabra exacta para cada pista.",
        btnLabel: "Juega Ya"
    };

    function live(a) {
        const cls = ["ft-mol-card"];
        if (a.layout) cls.push(a.layout);
        if (a.game) cls.push(a.game);
        if (a.bordered) cls.push("ft-mol-card--bordered");
        return `<div class="${cls.join(" ")}">
    <a href="#" class="ft-mol-card__body" title="title text" target="_self">
        <div class="ft-mol-card__content">
            <figure class="ft-img">
                <picture>
                    <source media="(min-width: 768px)" srcset="${IMG}" />
                    <img src="${IMG}" width="656" height="381" loading="lazy" class="ft-mol-card__image" alt="alt text" title="title text" />
                </picture>
            </figure>
        </div>
        <div class="ft-mol-card__header">
            <div class="ft-mol-card__headband">
                <h3 class="ft-mol-card__title">${esc(a.title)}</h3>
                <time class="ft-mol-card__date" datetime="2011-11-18">${esc(a.date)}</time>
            </div>
            <p class="ft-mol-card__text">${esc(a.text)}</p>
            <div class="ft-mol-card__footer">
                <button type="button" class="ft-btn ft-btn--tertiary ft-btn--sm" title="title text">${esc(a.btnLabel)}</button>
            </div>
        </div>
    </a>
</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Card</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-card</code>): tarjeta de juego/pasatiempo con imagen decorativa, cabecera (título + fecha), texto y CTA. Tiene varios layouts y un set de colores temáticos por juego.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables (incl. <code>--color-&lt;juego&gt;</code>)</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/card.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-img</code> · <code>.ft-btn</code></td><td>CSS de átomos que compone</td><td>Siempre</td></tr>
                <tr><td><code>scss/fourties/molecules/card/_card.scss</code> + <code>card-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Los colores de juego (<code>--crucigrama</code>, <code>--wordle</code>…) tiñen el fondo de la <code>.ft-img</code> con <code>var(--color-&lt;juego&gt;)</code>; esas variables deben existir en el <code>setting.css</code> de la marca activa.</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>--xs</code></td><td>compacta (tipografías e imagen reducidas)</td></tr>
                <tr><td><code>--row</code></td><td>imagen + contenido en fila</td></tr>
                <tr><td><code>--center</code></td><td>contenido centrado en ≥768px</td></tr>
                <tr><td><code>--featured</code></td><td>destacada, centrada, imagen grande</td></tr>
                <tr><td><code>--bordered</code></td><td>borde + sombra + fondo blanco (con hover)</td></tr>
                <tr><td><code>--crucigrama</code> · <code>--wordle</code> · <code>--sopa</code> · <code>--sudoku</code> · <code>--pangramax</code> · <code>--cuadronumerico</code> · <code>--saltaminas</code> · <code>--timequest</code> · <code>--porra</code> · <code>--cuatroencampo</code></td><td>color de fondo de la imagen por juego</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-card</code></td></tr>
                <tr><td>Enlace contenedor</td><td><code>.ft-mol-card__body</code> (&lt;a&gt;)</td></tr>
                <tr><td>Imagen</td><td><code>__content</code> &gt; <code>.ft-img</code> &gt; <code>__image</code> (+ <code>__contentNew</code> «nuevo»)</td></tr>
                <tr><td>Cabecera</td><td><code>__header</code> &gt; <code>__headband</code> (<code>__title</code> + <code>__date</code>)</td></tr>
                <tr><td>Texto / CTA</td><td><code>__text</code> · <code>__footer</code> (.ft-btn)</td></tr>
            </tbody>
        </table>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/card/_card.scss</code> · markup: <code>fourty/molecules/molecule-card.html</code></p>
    </div>`;

    const CARD = {
        id: "card",
        name: "Card",
        group: "Molecules",
        overview,
        stories: [
            // full: la tarjeta es width:100%; los layouts (row/center/featured) necesitan ancho
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(CARD);

    /* Markup original (HTML plano editable por el front) en card.html → subgrupo "Markup". */
    window.SB.loadMarkup(CARD, document.currentScript && document.currentScript.src, { full: true });
})();
