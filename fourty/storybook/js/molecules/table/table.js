/* ════════════════════════════════════════════════════════════════════════
   molecules/table/table.js — Molecules / Table
   Casuística REAL de scss/fourties/molecules/table/_table.scss (.ft-mol-table*).
   Markup tomado de fourty/molecules/molecule-table.html. Cero invención de API.

   Tabla de datos (resultados, escaños…): <table> dentro de .ft-mol-table, con __th/__td
   alineables (--align-right/center/left/low) y filas __tr--odd/--even. Modificadores de
   bloque --primary, --markered, --sticky, --mf (mobile-first). Solo CSS.

   Estructura: una story plana interactiva "Base" (controls: variante · nº de filas) +
   subgrupo "Markup" async desde table.html.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SINGLE SOURCE OF TRUTH ▼ */
    const DATA = {
        // .ft-mol-table--[variante]
        variants: [
            ["", "base"],
            ["ft-mol-table--primary", "primary (--primary)"],
            ["ft-mol-table--markered", "marcadores (--markered)"],
            ["ft-mol-table--sticky", "cabecera fija (--sticky)"],
            ["ft-mol-table--mf", "mobile-first (--mf)"]
        ],
        // dataset de ejemplo (resultados electorales, verbatim del showroom)
        head: ["Partido", "Escaños", "2019", "Nº votos", "% voto"],
        rows: [
            ["PSOE", "Partido Socialista Obrero Español", "140", "3.215.365", "3.215.365", "40%"],
            ["PP", "Partido Popular", "120", "2.890.112", "2.890.112", "35%"],
            ["VOX", "VOX", "45", "1.100.420", "1.100.420", "13%"],
            ["SUMAR", "Sumar", "31", "980.330", "980.330", "12%"]
        ]
    };

    /* ─── BASE — .ft-mol-table ─── */
    const baseArgTypes = [
        { key: "variant", control: "select", desc: "Variante de la tabla (.ft-mol-table--primary/--markered/--sticky/--mf).", options: DATA.variants },
        { key: "count", control: "number", desc: "Número de filas de datos (rango 1-8; ciclan).", min: 1, max: 8 }
    ];
    const baseArgs = { variant: "", count: "4" };

    const th = (label, align) =>
        '<th class="ft-mol-table__th' + (align ? " ft-mol-table__th--align-" + align : "") + '">' + esc(label) + "</th>";
    const td = (value, extra) =>
        '<td class="ft-mol-table__td ft-mol-table__td--align-right' + (extra ? " " + extra : "") + '">' + value + "</td>";

    function dataRow(r, i) {
        const parity = i % 2 === 0 ? "ft-mol-table__tr--odd" : "ft-mol-table__tr--even";
        return '<tr class="ft-mol-table__tr ' + parity + '">' +
            '<th class="ft-mol-table__th"><abbr title="' + esc(r[1]) + '"><strong>' + esc(r[0]) + "</strong></abbr><br>" + esc(r[1]) + "</th>" +
            td("<strong>" + esc(r[2]) + "</strong>") +
            td("<strong>" + esc(r[3]) + "</strong>", "ft-mol-table__td--low") +
            td("<strong>" + esc(r[4]) + "</strong>") +
            td("<strong>" + esc(r[5]) + "</strong>") +
        "</tr>";
    }

    function live(a) {
        const cls = ["ft-mol-table"];
        if (a.variant) cls.push(a.variant);
        const n = Math.max(1, Math.min(8, parseInt(a.count, 10) || 1));
        let body = "";
        for (let i = 0; i < n; i++) body += dataRow(DATA.rows[i % DATA.rows.length], i);
        const headCells = DATA.head.map((h, i) => th(h, i === 0 ? "" : "right")).join("");
        return '<div class="' + cls.join(" ") + '">' +
            "<table>" +
                "<thead><tr>" + headCells + "</tr></thead>" +
                "<tbody>" + body + "</tbody>" +
                '<tfoot><tr><th>Totales</th>' +
                    td("330") + td("12.303.330", "ft-mol-table__td--low") + td("12.303.330") + td("100%") +
                "</tr></tfoot>" +
            "</table>" +
        "</div>";
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Table</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-table</code>): tabla de datos con celdas alineables, filas alternas y variantes de presentación.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/table.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>: envuelve un <code>&lt;table&gt;</code> nativo. La alineación de cada celda se controla con <code>__td/__th--align-[left|center|right|low]</code> y las filas alternan con <code>__tr--odd/--even</code>.</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>tabla estándar con filas alternas</td></tr>
                <tr><td><code>--primary</code></td><td>estilo primario de la marca</td></tr>
                <tr><td><code>--markered</code></td><td>marcadores de color por fila</td></tr>
                <tr><td><code>--sticky</code></td><td>cabecera fija al hacer scroll</td></tr>
                <tr><td><code>--mf</code></td><td>mobile-first: reorganiza la tabla en móvil</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-table</code> (envuelve <code>&lt;table&gt;</code>)</td></tr>
                <tr><td>Fila</td><td><code>.ft-mol-table__tr--odd</code> · <code>--even</code></td></tr>
                <tr><td>Cabecera celda</td><td><code>.ft-mol-table__th</code></td></tr>
                <tr><td>Celda</td><td><code>.ft-mol-table__td</code></td></tr>
                <tr><td>Alineación</td><td><code>--align-left</code> · <code>--align-center</code> · <code>--align-right</code> · <code>--align-low</code></td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas (<code>table-[marca].scss</code>). Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/table/_table.scss</code> · markup: <code>fourty/molecules/molecule-table.html</code></p>
    </div>`;

    const TB = {
        id: "table",
        name: "Table",
        group: "Molecules",
        overview,
        stories: [
            // full: la tabla ocupa el ancho del contenedor.
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(TB);

    /* Markup original (HTML plano editable por el front) en table.html → subgrupo "Markup". */
    window.SB.loadMarkup(TB, document.currentScript && document.currentScript.src, { full: true });
})();
