/* ════════════════════════════════════════════════════════════════════════
   molecules/bar/bar.js — Molecules / Bar
   Casuística REAL de scss/fourties/molecules/bar/_bar.scss (.ft-mol-bar*).
   Markup tomado de fourty/molecules/molecule-bar.html. Cero invención de API.

   Barra de progreso/votos: título + cifra + pista con relleno (__background-inProgress).
   El ancho del relleno y los colores son INLINE (data del consumidor), no clases. Una
   story plana interactiva "Base" (tamaño · título · cifra · % · color) + subgrupo
   "Markup" async con apilados (--stacked) y dato dentro (--data-inside).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _bar.scss ▼ */
    const DATA = {
        sizes: [
            ["", "(base · 30px)"],
            ["ft-mol-bar--xs", "--xs · 10px"],
            ["ft-mol-bar--sm", "--sm · 15px"],
            ["ft-mol-bar--md", "--md · 30px"],
            ["ft-mol-bar--lg", "--lg · 45px"]
        ],
        mods: [
            ["--stacked", "varios tramos en una misma pista (flex)"],
            ["--data-inside", "dato dentro de la pista + bloque de usuario"]
        ],
        parts: ["__info", "__title", "__votes", "__background", "__background-inProgress", "__data", "__user"]
    };

    /* ─── BASE — .ft-mol-bar ─── */
    const baseArgTypes = [
        { key: "size", control: "select", desc: "Tamaño de la barra (alto + tipografía).", options: DATA.sizes },
        { key: "title", control: "text", desc: "Etiqueta (__title)." },
        { key: "votes", control: "text", desc: "Cifra a la derecha (__votes)." },
        { key: "percent", control: "number", desc: "Porcentaje de relleno (0–100; inline width).", min: 0, max: 100 },
        { key: "color", control: "text", desc: "Color del relleno (inline; hex/rgb)." }
    ];
    const baseArgs = { size: "ft-mol-bar--sm", title: "PSOE", votes: "1.600.450", percent: "80", color: "#E30613" };

    function live(a) {
        const cls = ["ft-mol-bar"];
        if (a.size) cls.push(a.size);
        const pct = Math.max(0, Math.min(100, parseInt(a.percent, 10) || 0));
        return `<div class="${cls.join(" ")}">
    <div class="ft-mol-bar__info">
        <h4 class="ft-mol-bar__title">${esc(a.title)}</h4>
        <span class="ft-mol-bar__votes">${esc(a.votes)}</span>
    </div>
    <div class="ft-mol-bar__background">
        <div class="ft-mol-bar__background-inProgress" style="background-color: ${esc(a.color)}; width: ${pct}%;"></div>
    </div>
</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Bar</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-bar</code>): barra de progreso/votos con etiqueta, cifra y una pista (<code>__background</code>) cuyo relleno (<code>__background-inProgress</code>) marca el porcentaje. Caso típico: resultados electorales o progreso de una porra.</p>

        <div class="cb-callout">El <strong>ancho del relleno y los colores son <code>style</code> inline</strong> (data del consumidor), no clases del DS. Los modificadores solo controlan el <strong>tamaño</strong>; el porcentaje lo pone quien renderiza.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/bar.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>scss/fourties/molecules/bar/_bar.scss</code> + <code>bar-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS (el % se inyecta como inline style)</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>--xs</code> · <code>--sm</code> · <code>--md</code> · <code>--lg</code></td><td>alto de la pista (10/15/30/45px) y tipografía</td></tr>
                <tr><td><code>--stacked</code></td><td>varios tramos (<code>__background-inProgress</code>) en una misma pista (flex)</td></tr>
                <tr><td><code>--data-inside</code></td><td>dato (<code>__data</code>) superpuesto en la pista + bloque de usuario (<code>__user</code>)</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-bar</code></td></tr>
                <tr><td>Cabecera</td><td><code>__info</code> &gt; <code>__title</code> + <code>__votes</code></td></tr>
                <tr><td>Pista</td><td><code>__background</code></td></tr>
                <tr><td>Relleno</td><td><code>__background-inProgress</code> (width inline)</td></tr>
                <tr><td>Dato / usuario</td><td><code>__data</code> · <code>__user</code> (con <code>--data-inside</code>)</td></tr>
            </tbody>
        </table>

        <div class="cb-callout">Las variantes <strong>--stacked</strong> y <strong>--data-inside</strong> cambian la estructura (varios tramos / dato + usuario); se documentan en el subgrupo <strong>Markup</strong>.</div>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/bar/_bar.scss</code> · markup: <code>fourty/molecules/molecule-bar.html</code></p>
    </div>`;

    const BAR = {
        id: "bar",
        name: "Bar",
        group: "Molecules",
        overview,
        stories: [
            // full: la pista es width:100%; necesita ancho para que el % se lea
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(BAR);

    /* Markup original (HTML plano editable por el front) en bar.html → subgrupo "Markup". */
    window.SB.loadMarkup(BAR, document.currentScript && document.currentScript.src, { full: true });
})();
