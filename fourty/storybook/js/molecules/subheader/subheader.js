/* ════════════════════════════════════════════════════════════════════════
   molecules/subheader/subheader.js — Molecules / Subheader
   Casuística REAL de scss/fourties/molecules/subheader/_subheader.scss
   (.ft-mol-subheader*). Markup tomado de fourty/molecules/molecule-subheader.html.
   Cero invención de API.

   Cintillo de cabecera de pasatiempo: título + fecha (__header) y un icono enlazado
   (__img). El modificador de juego (--pangramax, --wordle, --sudoku…) tiñe el fondo con
   la variable de color del juego. Solo CSS.

   Estructura: una story plana interactiva "Base" (controls: juego · título · fecha) +
   subgrupo "Markup" async desde subheader.html.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* Icono real del showroom (.ft-helper-img-rd). /cds-statics vía <base> del iframe. */
    const ICON = "/cds-statics/assets/img/icons/icon-pangramax.svg";

    /* ▼ SINGLE SOURCE OF TRUTH — temas de juego (.ft-mol-subheader--[juego]) de _subheader.scss ▼ */
    const DATA = {
        themes: [
            ["", "sin tema (defecto)"],
            ["ft-mol-subheader--pangramax", "Pangramax"],
            ["ft-mol-subheader--wordle", "Wordle"],
            ["ft-mol-subheader--sopa", "Sopa de letras"],
            ["ft-mol-subheader--crucigrama", "Crucigrama"],
            ["ft-mol-subheader--sudoku", "Sudoku"],
            ["ft-mol-subheader--porra", "Porra"],
            ["ft-mol-subheader--cuadronumerico", "Cuadro numérico"],
            ["ft-mol-subheader--saltaminas", "Saltaminas"],
            ["ft-mol-subheader--timequest", "Timequest"],
            ["ft-mol-subheader--cuatroencampo", "Cuatro en campo"]
        ]
    };

    /* ─── BASE — .ft-mol-subheader ─── */
    const baseArgTypes = [
        { key: "theme", control: "select", desc: "Tema de juego (.ft-mol-subheader--[juego]; tiñe el fondo).", options: DATA.themes },
        { key: "title", control: "text", desc: "Nombre del juego (.ft-mol-subheader__title)." },
        { key: "time", control: "text", desc: "Fecha (.ft-mol-subheader__time)." }
    ];
    const baseArgs = { theme: "", title: "Nombre Juego", time: "01/07/2025" };

    function live(a) {
        const cls = ["ft-mol-subheader"];
        if (a.theme) cls.push(a.theme);
        return '<div class="' + cls.join(" ") + '">' +
            '<div class="ft-mol-subheader__header">' +
                '<h2 class="ft-mol-subheader__title">' + esc(a.title) + "</h2>" +
                '<time class="ft-mol-subheader__time" itemprop="datePublished" datetime="2011-11-18T14:54:39+00:00">' + esc(a.time) + "</time>" +
            "</div>" +
            '<div class="ft-mol-subheader__img">' +
                '<a href="#"><img src="' + ICON + '" loading="lazy" width="22" height="22" class="ft-helper-img-rd" alt="Icono del juego" title="' + esc(a.title) + '"></a>' +
            "</div>" +
        "</div>";
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Subheader</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-subheader</code>): cintillo de cabecera de pasatiempo — título + fecha y un icono, con fondo temático por juego.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca + colores de juego (<code>--color-pangramax</code>…)</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/subheader.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td>Icono del juego (img)</td><td>SVG del pasatiempo</td><td>Siempre (<code>__img</code>)</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>: cada tema (<code>--pangramax</code>, <code>--wordle</code>…) aplica <code>background-color: var(--color-[juego])</code>. En los temas oscuros el título y la fecha pasan a blanco. El icono lo aporta el consumidor por juego (aquí se usa uno fijo).</div>

        <h2>Temas de juego</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Fondo</th></tr></thead>
            <tbody>
                <tr><td><code>--pangramax</code></td><td><code>var(--color-pangramax)</code></td></tr>
                <tr><td><code>--wordle</code></td><td><code>var(--color-wordle)</code></td></tr>
                <tr><td><code>--sopa</code></td><td><code>var(--color-sopa)</code></td></tr>
                <tr><td><code>--crucigrama</code></td><td><code>var(--color-crucigrama)</code></td></tr>
                <tr><td><code>--sudoku</code></td><td><code>var(--color-sudoku)</code></td></tr>
                <tr><td><code>--porra</code></td><td><code>var(--color-lightGrey)</code></td></tr>
                <tr><td><code>--cuadronumerico</code></td><td><code>var(--color-cuadronumerico)</code></td></tr>
                <tr><td><code>--saltaminas</code></td><td><code>var(--color-saltaminas)</code></td></tr>
                <tr><td><code>--timequest</code></td><td><code>var(--color-timequest)</code></td></tr>
                <tr><td><code>--cuatroencampo</code></td><td><code>var(--color-cuatroencampo)</code></td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-subheader</code></td></tr>
                <tr><td>Cabecera</td><td><code>__header</code> &gt; <code>__title</code> + <code>__time</code></td></tr>
                <tr><td>Icono</td><td><code>.ft-mol-subheader__img</code> &gt; <code>.ft-helper-img-rd</code></td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/subheader/_subheader.scss</code> · markup: <code>fourty/molecules/molecule-subheader.html</code></p>
    </div>`;

    const SH = {
        id: "subheader",
        name: "Subheader",
        group: "Molecules",
        overview,
        stories: [
            // full: el cintillo reparte cabecera e icono a los extremos (space-between) → necesita ancho.
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(SH);

    /* Markup original (HTML plano editable por el front) en subheader.html → subgrupo "Markup". */
    window.SB.loadMarkup(SH, document.currentScript && document.currentScript.src, { full: true });
})();
