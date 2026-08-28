/* ════════════════════════════════════════════════════════════════════════
   molecules/pie-chart/pie-chart.js — Molecules / Pie Chart
   Casuística REAL de scss/fourties/molecules/pie-chart/_pie-chart.scss (.ft-mol-chart-pie*).
   Markup tomado de fourty/molecules/molecule-chartPie.html. Cero invención de API.

   ⚠ La clase es .ft-mol-chart-pie (kebab), aunque la carpeta/archivo son "pie-chart"
   y la página de showroom es molecule-chartPie.html.

   Gráfico circular / semicírculo de escaños (elecciones). 100% JS-driven: el front
   sólo escribe un CONTENEDOR vacío con un JSON en data-config; chart-params.js
   (Chartist) lee ese config y pinta el SVG + las piezas -info/-yeargraph/__seats/
   __name en tiempo de ejecución. El Storybook zero-toolchain NO carga Chartist ni
   chart-params.js → el contenedor no se pinta. Se migra el markup verbatim (la API
   real es el data-config) y se documenta la dependencia. Familias por marca
   (ep/epe/regionales/revistas/sport) DOCUMENTADAS. Story "Base" interactiva
   (tamaño · hiddenvalue · hasdescription · hasyear) + subgrupo "Markup" async.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;
    const frameworkBlock = window.SB.helpers.frameworkBlock;

    /* ▼ SINGLE SOURCE OF TRUTH — clases reales de _pie-chart.scss ▼ */
    const DATA = {
        sizes: [
            ["ft-mol-chart-pie-midgraph--sm-3", "midgraph--sm-3"],
            ["ft-mol-chart-pie-midgraph--sm-5", "midgraph--sm-5"],
            ["ft-mol-chart-pie-midgraph--md-3", "midgraph--md-3 (defecto)"],
            ["ft-mol-chart-pie-midgraph--md-5", "midgraph--md-5"],
            ["ft-mol-chart-pie-midgraph--md-9", "midgraph--md-9"],
            ["ft-mol-chart-pie-completegraph--md-3", "completegraph--md-3 (círculo completo)"]
        ],
        parts: ["-wrapper", "-content", "-info", "-yeargraph", "__seats", "__name", "__info"]
    };

    /* ─── BASE — .ft-mol-chart-pie ─── */
    const baseArgTypes = [
        { key: "size", control: "select", desc: "Clase de tamaño/forma del gráfico (semicírculo midgraph o círculo completegraph).", options: DATA.sizes },
        { key: "hidden", control: "number", desc: "hiddenvalue: límite inferior por debajo del cual no se muestran números.", min: 0, max: 50 },
        { key: "desc", control: "boolean", desc: "hasdescription: muestra escaños, mayoría absoluta y línea divisoria." },
        { key: "year", control: "boolean", desc: "hasyear: muestra el año en la base del gráfico." }
    ];
    const baseArgs = { size: "ft-mol-chart-pie-midgraph--md-3", hidden: "12", desc: true, year: false };

    // Glifo neutro de marcador de posición (NO son datos reales: arcos grises que evocan
    // un semicírculo de escaños). Honesto: el SVG real lo pinta Chartist en runtime.
    const PLACEHOLDER_SVG = '<svg width="220" height="124" viewBox="0 0 220 124" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
        '<path d="M16 112 A94 94 0 0 1 204 112" fill="none" stroke="#e4e4e4" stroke-width="20" stroke-linecap="round"/>' +
        '<path d="M16 112 A94 94 0 0 1 70 28" fill="none" stroke="#c7c7c7" stroke-width="20" stroke-linecap="round"/>' +
        '<path d="M78 23 A94 94 0 0 1 150 24" fill="none" stroke="#b0b0b0" stroke-width="20" stroke-linecap="round"/>' +
        "</svg>";

    // Etiqueta legible de la clase de tamaño activa (sin el prefijo .ft-mol-chart-pie-).
    function sizeLabel(value) {
        const row = DATA.sizes.find(s => s[0] === value);
        return row ? row[1] : value;
    }

    function live(a) {
        const cfg = `{
          &quot;idgraph&quot;:&quot;id0004&quot;,
          &quot;hiddenvalue&quot;:&quot;${esc(String(a.hidden))}&quot;,
          &quot;hasdescription&quot;:&quot;${a.desc ? "true" : "false"}&quot;,
          &quot;hasyear&quot;:&quot;${a.year ? "true" : "false"}&quot;
          }`;
        // Caja acotada y etiquetada (harness "placeholder de 3º"): glifo neutro + eco del
        // data-config que los controles modifican. El contenedor REAL que consume el runtime
        // viaja oculto (hidden) para que el front lo inspeccione sin pintar una caja vacía
        // que llene el canvas. El markup verbatim completo vive en el subgrupo "Markup".
        return `<div class="ft-mol-chart-pie ft-mol-chart-pie-wrapper" style="max-width:380px;margin:0 auto;text-align:center;">
    <div style="display:flex;flex-direction:column;align-items:center;gap:.5rem;padding:1.25rem;border:1px dashed var(--color-quaternary,#bbb);border-radius:10px;">
        ${PLACEHOLDER_SVG}
        <span style="font-size:.8rem;font-weight:700;letter-spacing:.03em;text-transform:uppercase;color:var(--color-quaternary,#777);">Gráfico de escaños · placeholder</span>
    </div>
    <table style="margin:.75rem auto 0;font-size:.8rem;color:var(--color-quaternary,#666);border-collapse:collapse;">
        <tr><td style="text-align:right;padding:.1rem .5rem;opacity:.7;">tamaño</td><td style="text-align:left;padding:.1rem .5rem;font-weight:600;"><code>${esc(sizeLabel(a.size))}</code></td></tr>
        <tr><td style="text-align:right;padding:.1rem .5rem;opacity:.7;">hiddenvalue</td><td style="text-align:left;padding:.1rem .5rem;font-weight:600;"><code>${esc(String(a.hidden))}</code></td></tr>
        <tr><td style="text-align:right;padding:.1rem .5rem;opacity:.7;">hasdescription</td><td style="text-align:left;padding:.1rem .5rem;font-weight:600;"><code>${a.desc ? "true" : "false"}</code></td></tr>
        <tr><td style="text-align:right;padding:.1rem .5rem;opacity:.7;">hasyear</td><td style="text-align:left;padding:.1rem .5rem;font-weight:600;"><code>${a.year ? "true" : "false"}</code></td></tr>
    </table>
    <!-- Contenedor REAL que consume el runtime (oculto: aquí no se pinta sin Chartist) -->
    <div class="ft-mol-chart-pie-content" hidden>
        <div class="ct-chart ct-golden-section ${esc(a.size)}" id="id0004" data-config="${cfg}"></div>
    </div>
    <p style="margin:.75rem 0 0;font-size:.8rem;color:var(--color-quaternary,#777);line-height:1.4;">
        El SVG real lo genera <code>Chartist</code> + <code>chart-params.js</code> a partir del <code>data-config</code> (arriba como eco), no disponible en el Storybook zero-toolchain. Markup verbatim en <strong>Markup</strong>.
    </p>
</div>`;
    }

    const framework = frameworkBlock({
        intro: `Este componente funciona mejor como wrapper client-only: el framework produce datos y markup base, pero el dibujo real del grafico lo resuelve Chartist en cliente.`,
        rows: [
            ["Carga del vendor", `Carga Chartist y <code>chart-params.js</code> en <code>onMounted()</code> o mediante import diferido solo en cliente.`, `Carga Chartist y <code>chart-params.js</code> en <code>useEffect()</code> o mediante import diferido solo en cliente.`],
            ["Redibujado", `Recrea o actualiza el grafico solo cuando cambie el dataset; evita reinicializarlo por cada render reactivo.`, `Recrea o actualiza el grafico solo cuando cambie el dataset; evita reinicializarlo por cada render reactivo.`],
            ["Cleanup", `Desmonta la instancia y limpia listeners si la vista desaparece o si el contenedor cambia.`, `Desmonta la instancia y limpia listeners si la vista desaparece o si el contenedor cambia.`]
        ],
        note: `Manten <code>data-config</code> o sus props equivalentes como API publica de integracion: facilita que el markup siga siendo reconocible para equipos no framework.`
    });

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Pie Chart</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-chart-pie</code>): gráfico circular / semicírculo de escaños usado en elecciones. El desarrollador sólo escribe un contenedor vacío con un JSON en <code>data-config</code>; el resto lo dibuja JavaScript.</p>

        <div class="cb-callout">La clase real es <code>.ft-mol-chart-pie</code> (kebab-case), aunque la carpeta/archivo SCSS se llaman <code>pie-chart</code> y la página de showroom es <code>molecule-chartPie.html</code>.</div>

        <div class="cb-callout"><strong>100% JS-driven.</strong> <code>chart-params.js</code> (basado en <code>Chartist</code>) lee el <code>data-config</code> y pinta el SVG y las piezas <code>-info</code>/<code>-yeargraph</code>/<code>__seats</code>/<code>__name</code> en runtime. El Storybook zero-toolchain no carga esas librerías: se muestra sólo el contenedor (la API real es el JSON). El markup verbatim está en el subgrupo <strong>Markup</strong>.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/pie-chart.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td>Chartist (vendor) + <code>js/chart-pie/chart-params.js</code></td><td>JavaScript</td><td><strong>Imprescindible</strong> · pinta el gráfico desde el <code>data-config</code></td></tr>
                <tr><td><code>scss/fourties/molecules/pie-chart/_pie-chart.scss</code> + <code>pie-chart-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
            </tbody>
        </table>
        </div>
        ${framework}

        <h2>data-config (API real)</h2>
        <table class="cb-table">
            <thead><tr><th>Clave</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>idgraph</code></td><td>id del contenedor (coincide con el <code>id</code> del nodo)</td></tr>
                <tr><td><code>hiddenvalue</code></td><td>límite inferior por debajo del cual no se rotulan los valores</td></tr>
                <tr><td><code>hasdescription</code></td><td><code>true/false</code> · escaños, mayoría absoluta y línea divisoria</td></tr>
                <tr><td><code>hasyear</code></td><td><code>true/false</code> (opcional) · año en la base del gráfico</td></tr>
            </tbody>
        </table>

        <h2>Tamaño / forma</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>-midgraph--{sm|md}-{3…9}</code></td><td>semicírculo · el número escala el gráfico según el contenedor y su responsive</td></tr>
                <tr><td><code>-completegraph--{sm|md}-{3…9}</code></td><td>círculo completo</td></tr>
            </tbody>
        </table>

        <div class="cb-callout">Familias específicas por marca — <code>pie-chart-ep/epe/regionales/revistas/sport.scss</code> — reestilan colores y leyenda según el medio. No se reproducen aquí; cambian con la marca activa.</div>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/pie-chart/_pie-chart.scss</code> · markup: <code>fourty/molecules/molecule-chartPie.html</code></p>
    </div>`;

    const PC = {
        id: "pie-chart",
        name: "Pie Chart",
        group: "Molecules",
        signals: ["js"],
        overview,
        stories: [
            // full: el gráfico necesita ancho para sus tamaños responsive
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(PC);

    /* Markup original (HTML plano editable por el front) en pie-chart.html → subgrupo "Markup". */
    window.SB.loadMarkup(PC, document.currentScript && document.currentScript.src, { full: true });
})();
