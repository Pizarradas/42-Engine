/* ════════════════════════════════════════════════════════════════════════
   molecules/marker/marker.js — Molecules / Marker
   Casuística REAL de scss/fourties/molecules/marker/_marker.scss (.ft-mol-marker*).
   Markup tomado de fourty/molecules/molecule-marker.html. Cero invención de API.

   Cinta de marcadores (resultados deportivos) con scroll horizontal: cabecera
   (título + enlaces) y una fila de partidos (__mainBox: estado + dos equipos con
   escudo y goles). El estado en vivo usa __mainBox--infoActive. Solo CSS. Una story
   plana interactiva "Base" (liga) + subgrupo "Markup" async.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SINGLE SOURCE OF TRUTH — piezas reales de _marker.scss ▼ */
    const DATA = {
        parts: ["__header", "__headerTitle", "__headerLinks", "__main", "__mainBox", "__mainBox--info", "__mainBox--infoActive", "__mainBox--line"]
    };

    const ESC_BAR = "https://estaticos-cdn.sport.es/zeta/public/file/2020/1215/15/file-f633533.png";
    const ESC_GIR = "https://estaticos-cdn.sport.es/epi/public/file/2022/0920/09/escudo-girona-2022-14c9d3a.png";

    const match = (st, active, a1, g1, a2, g2) => `<div class="ft-mol-marker__mainBox" role="group">
        <a class="ft-link ft-link--secondary" href="#" title="Directo">
            <div class="ft-mol-marker__mainBox--info${active ? " ft-mol-marker__mainBox--infoActive" : ""}">${st}<button aria-hidden="true" class="ft-helper-hide" tabindex="-1">VER</button></div>
            <div class="ft-mol-marker__mainBox--line" role="group"><img alt="${a1}" height="22" loading="lazy" src="${ESC_BAR}" width="22"><span>${a1}</span><span>${g1}</span></div>
            <div class="ft-mol-marker__mainBox--line" role="group"><img alt="${a2}" height="22" loading="lazy" src="${ESC_GIR}" width="22"><span>${a2}</span><span>${g2}</span></div>
        </a>
    </div>`;

    /* ─── BASE — .ft-mol-marker ─── */
    const baseArgTypes = [
        { key: "league", control: "text", desc: "Título de la competición (__headerTitle)." }
    ];
    const baseArgs = { league: "LIGA SANTANDER" };

    function live(a) {
        return `<div class="ft-mol-marker">
    <div class="ft-mol-marker__box">
        <div class="ft-mol-marker__header">
            <h3 class="ft-mol-marker__headerTitle">${esc(a.league)}</h3>
            <ul class="ft-mol-marker__headerLinks">
                <li><a class="ft-link ft-link--secondary" href="#">Resultados</a></li>
                <li><a class="ft-link ft-link--secondary" href="#">Calendario</a></li>
                <li><a class="ft-link ft-link--secondary" href="#">Clasificación</a></li>
            </ul>
        </div>
        <div class="ft-mol-marker__main">
            ${match("Finalizado", false, "OSA", "2", "GIR", "1")}
            ${match("Finalizado", false, "ELC", "1", "CAD", "1")}
            ${match("En juego", true, "MLL", "0", "RAY", "1")}
        </div>
    </div>
</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Marker</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-marker</code>): cinta de marcadores de resultados deportivos con scroll horizontal — cabecera (título + enlaces) y una fila de partidos, cada uno con su estado y los dos equipos (escudo + goles).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/marker.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-link</code></td><td>CSS del átomo Link</td><td>Siempre (enlaces y partidos)</td></tr>
                <tr><td><code>scss/fourties/molecules/marker/_marker.scss</code> + <code>marker-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>Layout solo CSS; los datos en vivo los inyecta el consumidor</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-marker</code> (scroll-x)</td></tr>
                <tr><td>Cabecera</td><td><code>__header</code> &gt; <code>__headerTitle</code> + <code>__headerLinks</code></td></tr>
                <tr><td>Fila</td><td><code>__main</code> &gt; <code>__mainBox</code> (partido)</td></tr>
                <tr><td>Estado</td><td><code>__mainBox--info</code> (+ <code>--infoActive</code> en vivo)</td></tr>
                <tr><td>Equipo</td><td><code>__mainBox--line</code> (escudo + abrev. + goles)</td></tr>
            </tbody>
        </table>

        <div class="cb-callout"><code>--infoActive</code> marca el partido en juego con un punto animado (keyframe <code>shift</code>).</div>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/marker/_marker.scss</code> · markup: <code>fourty/molecules/molecule-marker.html</code></p>
    </div>`;

    const MK = {
        id: "marker",
        name: "Marker",
        group: "Molecules",
        overview,
        stories: [
            // full: la cinta hace scroll-x a ancho completo
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(MK);

    /* Markup original (HTML plano editable por el front) en marker.html → subgrupo "Markup". */
    window.SB.loadMarkup(MK, document.currentScript && document.currentScript.src, { full: true });
})();
