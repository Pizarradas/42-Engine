/* ════════════════════════════════════════════════════════════════════════
   molecules/overlay-live/overlay-live.js — Molecules / Overlay Live
   Casuística REAL de scss/fourties/molecules/overlay-live/_overlay-live.scss (.ft-mol-overlay-live*).
   Markup tomado de fourty/molecules/molecule-overlaylive.html. Cero invención de API.

   Listado de partidos en directo: una sección con varios marcadores (__scoreboard),
   cada uno con horario/estado, dos equipos (escudo + nombre + resultado) y enlace al
   stream. El modificador --is-live marca el partido en directo. En producción vive
   dentro de un overlay plegable (.ft-modal-overlay-folding) que abre un trigger JS; en
   el storybook se muestra la MOLÉCULA suelta (es lo migrable). Story "Base" + "Markup".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    const SHIELD_A = "/cds-statics/assets/img/team-shields/spain/sporting-gijon.svg";
    const SHIELD_B = "/cds-statics/assets/img/team-shields/spain/fc-barcelona.svg";

    /* ▼ SINGLE SOURCE OF TRUTH — piezas reales de _overlay-live.scss ▼ */
    const DATA = {
        parts: ["__item", "__section", "__scoreboard", "__scoreboard--is-live", "__schedule", "__team", "__team-name", "__result", "__streaming"]
    };

    const team = (shield, name, result) => `<span class="ft-mol-overlay-live__team">
        <img src="${shield}" class="ft-helper-img-rd" title="title text" alt="alt text">
        <span class="ft-mol-overlay-live__team-name">${esc(name)}</span>
        <span class="ft-mol-overlay-live__result">${esc(result)}</span>
    </span>`;

    const scoreboard = (live, when, rA, rB, streaming) => `<div class="ft-mol-overlay-live__scoreboard${live ? " ft-mol-overlay-live__scoreboard--is-live" : ""}">
        <span class="ft-mol-overlay-live__schedule"><time datatime="2024-02-21 18:00">${esc(when)}</time></span>
        ${team(SHIELD_A, "Inter de Milán", rA)}
        ${team(SHIELD_B, "Borussia Mönchengladbach", rB)}
        ${streaming ? `<span class="ft-mol-overlay-live__streaming">Ver</span>` : ""}
        <a href="" class="ft-link--block" title="title text" target="_self">Link al stream</a>
    </div>`;

    /* ─── BASE — .ft-mol-overlay-live ─── */
    const baseArgTypes = [
        { key: "section", control: "text", desc: "Competición / sección (__section)." }
    ];
    const baseArgs = { section: "Champions League" };

    function live(a) {
        return `<div class="ft-mol-overlay-live">
    <div class="ft-mol-overlay-live__item">
        <p class="ft-mol-overlay-live__section"><strong>${esc(a.section)}</strong></p>
        ${scoreboard(false, "21.02.2024 - 18:00h", "", "Texto", true)}
        ${scoreboard(false, "Finalizado", "0", "2", false)}
        ${scoreboard(true, "Directo", "1", "1", false)}
    </div>
</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Overlay Live</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-overlay-live</code>): listado de partidos de una competición — cada marcador (<code>__scoreboard</code>) muestra horario/estado, los dos equipos (escudo + nombre + resultado) y un enlace al directo. <code>--is-live</code> resalta el partido en juego.</p>

        <div class="cb-callout">En producción esta molécula vive dentro de un <strong>overlay plegable</strong> (<code>.ft-modal-overlay-folding</code>) que abre un trigger con JS. Aquí se muestra la <strong>molécula suelta</strong> (el listado), que es lo migrable; el overlay contenedor es otra pieza.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/overlay-live.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-link--block</code></td><td>CSS del átomo Link</td><td>Enlace al stream (cubre la fila)</td></tr>
                <tr><td>Overlay plegable + datos en vivo</td><td>JavaScript</td><td>Para abrir el overlay y refrescar marcadores</td></tr>
                <tr><td><code>scss/fourties/molecules/overlay-live/_overlay-live.scss</code> + <code>-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-overlay-live</code></td></tr>
                <tr><td>Grupo</td><td><code>__item</code> &gt; <code>__section</code> (competición)</td></tr>
                <tr><td>Marcador</td><td><code>__scoreboard</code> (+ <code>--is-live</code>)</td></tr>
                <tr><td>Datos</td><td><code>__schedule</code> · <code>__team</code> (<code>__team-name</code> + <code>__result</code>) · <code>__streaming</code></td></tr>
            </tbody>
        </table>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/overlay-live/_overlay-live.scss</code> · markup: <code>fourty/molecules/molecule-overlaylive.html</code></p>
    </div>`;

    const OL = {
        id: "overlay-live",
        name: "Overlay Live",
        group: "Molecules",
        overview,
        stories: [
            // full: los marcadores son filas a ancho completo
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(OL);

    /* Markup original (HTML plano editable por el front) en overlay-live.html → subgrupo "Markup". */
    window.SB.loadMarkup(OL, document.currentScript && document.currentScript.src, { full: true });
})();
