/* ════════════════════════════════════════════════════════════════════════
   molecules/graphLegend/graphLegend.js — Molecules / Graph Legend
   Casuística REAL de scss/fourties/molecules/graphLegend/_graphLegend.scss (.ft-mol-graph-legend*).
   Markup tomado de fourty/molecules/molecule-graphLegend.html. Cero invención de API.

   ⚠ La clase es .ft-mol-graph-legend (kebab), aunque la carpeta/archivo son "graphLegend".
   Leyenda de un gráfico: fila de etiquetas .ft-tag--secondary (marcador + nombre + valor)
   con tres alineaciones (--left/--center/--right). Solo CSS. Una story plana interactiva
   "Base" (alineación · nº de series · nombre · valor) + subgrupo "Markup" async.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _graphLegend.scss ▼ */
    const DATA = {
        aligns: [
            ["", "(defecto · flex-start)"],
            ["ft-mol-graph-legend--left", "--left · izquierda"],
            ["ft-mol-graph-legend--center", "--center · centrada"],
            ["ft-mol-graph-legend--right", "--right · derecha"]
        ],
        composes: [".ft-tag--secondary (marcador + nombre + valor)"]
    };

    /* ─── BASE — .ft-mol-graph-legend ─── */
    const baseArgTypes = [
        { key: "align", control: "select", desc: "Alineación de la leyenda.", options: DATA.aligns },
        { key: "count", control: "number", desc: "Número de series (1–8).", min: 1, max: 8 },
        { key: "name", control: "text", desc: "Nombre de la serie (.ft-tag__name)." },
        { key: "value", control: "text", desc: "Valor de la serie (.ft-tag__value)." }
    ];
    const baseArgs = { align: "ft-mol-graph-legend--center", count: "4", name: "Name", value: "50" };

    function live(a) {
        const cls = ["ft-mol-graph-legend"];
        if (a.align) cls.push(a.align);
        const n = Math.max(1, Math.min(8, parseInt(a.count, 10) || 1));
        const items = Array.from({ length: n }, () =>
            `<span class="ft-tag ft-tag--md ft-tag--secondary"><span class="ft-tag__marker"></span><span class="ft-tag__name">${esc(a.name)}</span><span class="ft-tag__value">${esc(a.value)}</span></span>`
        ).join("");
        return `<div class="${cls.join(" ")}">${items}</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Graph Legend</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-graph-legend</code>): leyenda de un gráfico — una fila de etiquetas <code>.ft-tag--secondary</code> (marcador de color + nombre + valor) con tres alineaciones.</p>

        <div class="cb-callout">La clase real es <code>.ft-mol-graph-legend</code> (kebab-case), aunque la carpeta/archivo SCSS se llaman <code>graphLegend</code>. Usa la clase kebab.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/graphLegend.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-tag</code> (<code>--secondary</code>, <code>__marker</code>, <code>__name</code>, <code>__value</code>)</td><td>CSS del átomo Tag</td><td>Siempre (las series)</td></tr>
                <tr><td><code>scss/fourties/molecules/graphLegend/_graphLegend.scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS (el color del marcador suele venir inline desde el dataset)</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>fila de etiquetas alineada a la izquierda</td></tr>
                <tr><td><code>--left</code> · <code>--center</code> · <code>--right</code></td><td>justificación de la fila</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-graph-legend</code></td></tr>
                <tr><td>Serie</td><td><code>.ft-tag--secondary</code> (átomo Tag)</td></tr>
                <tr><td>Marcador / nombre / valor</td><td><code>.ft-tag__marker</code> · <code>__name</code> · <code>__value</code></td></tr>
            </tbody>
        </table>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/graphLegend/_graphLegend.scss</code> · markup: <code>fourty/molecules/molecule-graphLegend.html</code></p>
    </div>`;

    const GL = {
        id: "graph-legend",
        name: "Graph Legend",
        group: "Molecules",
        overview,
        stories: [
            // full: las alineaciones (--left/--center/--right) necesitan ancho para verse
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(GL);

    /* Markup original (HTML plano editable por el front) en graphLegend.html → subgrupo "Markup". */
    window.SB.loadMarkup(GL, document.currentScript && document.currentScript.src, { full: true });
})();
