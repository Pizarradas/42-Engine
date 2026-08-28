/* ════════════════════════════════════════════════════════════════════════
   molecules/dataSheed/dataSheed.js — Molecules / Data Sheet
   Casuística REAL de scss/fourties/molecules/dataSheed/_dataSheed.scss (.ft-mol-dataSheed*).
   Markup tomado de fourty/molecules/molecule-dataSheed.html. Cero invención de API.

   Ficha técnica de un partido: cabecera (+ liga), marcador (logos + tanteos),
   alineaciones (dos equipos en tablas) y pie con goles/árbitros/incidencias. Solo
   CSS. Una story plana interactiva "Base" (liga · equipos · tanteos) + subgrupo
   "Markup" async con la ficha completa.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    const LOGO_BAR = "https://estaticos-cdn.sport.es/epi/public/file/2021/0522/10/barca-b61fd99.png";
    const LOGO_MAD = "https://estaticos-cdn.sport.es/epi/public/file/2022/0724/02/real-madrid-4708493.png";

    /* ▼ SINGLE SOURCE OF TRUTH — piezas reales de _dataSheed.scss ▼ */
    const DATA = {
        parts: ["__header", "__headerHasLigue", "__content", "__logo", "__image", "__score", "__lineups", "__container", "__container--footer", "__equip", "__equipLft", "__equipRgt", "__equipHeader", "__equipPlayers"]
    };

    /* ─── BASE — .ft-mol-dataSheed ─── */
    const baseArgTypes = [
        { key: "ligue", control: "text", desc: "Competición (__headerHasLigue)." },
        { key: "teamL", control: "text", desc: "Abreviatura equipo local." },
        { key: "teamV", control: "text", desc: "Abreviatura equipo visitante." },
        { key: "scoreL", control: "text", desc: "Tanteo local (__score)." },
        { key: "scoreV", control: "text", desc: "Tanteo visitante (__score)." }
    ];
    const baseArgs = { ligue: "LIGA ENDESA", teamL: "BAR", teamV: "MAD", scoreL: "197", scoreV: "164" };

    function live(a) {
        return `<div class="ft-mol-dataSheed">
    <h2 class="ft-mol-dataSheed__header">Ficha técnica</h2>
    <h3 class="ft-mol-dataSheed__header ft-mol-dataSheed__headerHasLigue">${esc(a.ligue)}</h3>
    <div class="ft-mol-dataSheed__content" role="group" aria-label="Marcador del partido">
        <div class="ft-mol-dataSheed__logo">
            <img class="ft-mol-dataSheed__image" width="35" height="35" loading="lazy" alt="Escudo local" src="${LOGO_BAR}">
            <p class="ft-text">${esc(a.teamL)}</p>
        </div>
        <div class="ft-mol-dataSheed__score">${esc(a.scoreL)}</div>
        <div class="ft-mol-dataSheed__score">${esc(a.scoreV)}</div>
        <div class="ft-mol-dataSheed__logo">
            <img class="ft-mol-dataSheed__image" width="35" height="35" loading="lazy" alt="Escudo visitante" src="${LOGO_MAD}">
            <p class="ft-text">${esc(a.teamV)}</p>
        </div>
    </div>
    <div class="ft-mol-dataSheed__lineups">Alineaciones</div>
    <div class="ft-mol-dataSheed__container">
        <div class="ft-mol-dataSheed__equip ft-mol-dataSheed__equipLft">
            <table class="ft-mol-dataSheed__equipContent" role="table">
                <thead><tr><th class="ft-mol-dataSheed__equipHeader">${esc(a.teamL)}</th></tr></thead>
                <tbody><tr class="ft-mol-dataSheed__equipPlayers"><td>Satoransky (18), Higgins, Abrines (8), Vesely (8), Laprovittola (14), Kalinic (6), Kuric (2)</td></tr></tbody>
            </table>
        </div>
        <div class="ft-mol-dataSheed__equip ft-mol-dataSheed__equipRgt">
            <table class="ft-mol-dataSheed__equipContent" role="table">
                <thead><tr><th class="ft-mol-dataSheed__equipHeader">${esc(a.teamV)}</th></tr></thead>
                <tbody><tr class="ft-mol-dataSheed__equipPlayers"><td>Tavares (12), Hezonja (10), Llull (9), Rudy (4), Causeur (8), Yabusele (11), Musa (6)</td></tr></tbody>
            </table>
        </div>
    </div>
</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Data Sheet</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-dataSheed</code>): ficha técnica de un partido — cabecera con la competición, marcador (logos + tanteos), alineaciones de los dos equipos y pie con goles, árbitros e incidencias.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/dataSheed.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-text</code></td><td>CSS del átomo Text</td><td>Etiquetas de equipo</td></tr>
                <tr><td><code>scss/fourties/molecules/dataSheed/_dataSheed.scss</code> + <code>dataSheed-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Usa <code>var(--color-senary)</code> para la banda de alineaciones; esa variable debe existir en la marca activa (es típica de marcas deportivas como Sport).</div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-dataSheed</code></td></tr>
                <tr><td>Cabecera</td><td><code>__header</code> · <code>__headerHasLigue</code></td></tr>
                <tr><td>Marcador</td><td><code>__content</code> &gt; <code>__logo</code>/<code>__image</code> + <code>__score</code></td></tr>
                <tr><td>Alineaciones</td><td><code>__lineups</code> + <code>__container</code> &gt; <code>__equip</code> (<code>Lft</code>/<code>Rgt</code>, <code>Header</code>, <code>Players</code>)</td></tr>
                <tr><td>Pie</td><td><code>__container--footer</code> (goles/árbitros/incidencias)</td></tr>
            </tbody>
        </table>

        <div class="cb-callout">El subgrupo <strong>Markup</strong> trae la ficha completa con el pie (goles, árbitros, incidencias); la story Base parametriza la cabecera y el marcador.</div>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/dataSheed/_dataSheed.scss</code> · markup: <code>fourty/molecules/molecule-dataSheed.html</code></p>
    </div>`;

    const DS = {
        id: "datasheet",
        name: "Data Sheet",
        group: "Molecules",
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(DS);

    /* Markup original (HTML plano editable por el front) en dataSheed.html → subgrupo "Markup". */
    window.SB.loadMarkup(DS, document.currentScript && document.currentScript.src, { full: true });
})();
