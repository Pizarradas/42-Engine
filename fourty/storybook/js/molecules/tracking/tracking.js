/* ════════════════════════════════════════════════════════════════════════
   molecules/tracking/tracking.js — Molecules / Tracking
   Casuística REAL de scss/fourties/molecules/tracking/_tracking.scss
   (.ft-mol-tracking*). Markup tomado de fourty/molecules/molecule-tracking.html.
   Cero invención de API.

   Línea de seguimiento / timeline de pasos: una lista (__step) de hitos (__step-line +
   __step-line-ball). Cada bola puede estar pendiente, --completed o --active, y el hito
   lleva fecha (.ft-date) y un título enlazado (__title). Modificadores de bloque
   --vertical, --home, --homeVertical y --stepper (este último con icono, ver Markup).

   Estructura: una story plana interactiva "Base" (controls: variante · nº de pasos · paso
   actual) + subgrupo "Markup" async desde tracking.html (incluye la variante --stepper).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _tracking.scss ▼ */
    const DATA = {
        // variantes que comparten el markup fecha+título (la --stepper, distinta, va en Markup)
        variants: [
            ["", "horizontal (defecto)"],
            ["ft-mol-tracking--vertical", "vertical (--vertical)"],
            ["ft-mol-tracking--home", "home (--home)"],
            ["ft-mol-tracking--homeVertical", "home vertical (--homeVertical)"]
        ],
        titles: [
            "23-J precampaña: el inicio de la carrera electoral",
            "Arranca la campaña con los primeros mítines",
            "Debate a cuatro en televisión",
            "Jornada de reflexión",
            "Día de las elecciones"
        ]
    };

    /* ─── BASE — .ft-mol-tracking ─── */
    const baseArgTypes = [
        { key: "variant", control: "select", desc: "Disposición de la línea (.ft-mol-tracking--vertical/--home/--homeVertical).", options: DATA.variants },
        { key: "count", control: "number", desc: "Número de pasos (rango 2-8).", min: 2, max: 8 },
        { key: "active", control: "number", desc: "Paso actual (anteriores = completados, posteriores = pendientes).", min: 1, max: 8 }
    ];
    const baseArgs = { variant: "", count: "4", active: "3" };

    const dateBlock =
        '<div class="ft-date">' +
            '<time class="ft-date__text" datetime="2022-09-05T13:04"><span class="ft-date__textPlace">Barcelona </span><span class="ft-date__textTime">05 SEPT 2022 - 13:04 CET</span></time>' +
            '<time class="ft-date__reload" itemprop="dateModified" datetime="2023-02-07T12:35">Actualizada 07 FEB 2023 - 12:35 CET</time>' +
        "</div>";

    function step(i, active) {
        const cls = ["ft-mol-tracking__step-line", "ft-mol-tracking__step-line-ball"];
        if (i < active) cls.push("ft-mol-tracking__step-line-ball--completed");
        else if (i === active) cls.push("ft-mol-tracking__step-line-ball--active");
        const title = DATA.titles[(i - 1) % DATA.titles.length];
        const titleHtml = '<h3 class="ft-mol-tracking__title"><a href="#" class="ft-link ft-link--secondary" title="' + esc(title) + '" target="_self">' + esc(title) + "</a></h3>";
        return '<li class="' + cls.join(" ") + '">' + dateBlock + titleHtml + "</li>";
    }

    function live(a) {
        const cls = ["ft-mol-tracking"];
        if (a.variant) cls.push(a.variant);
        const n = Math.max(2, Math.min(8, parseInt(a.count, 10) || 2));
        const active = Math.max(1, Math.min(n, parseInt(a.active, 10) || 1));
        let steps = "";
        for (let i = 1; i <= n; i++) steps += step(i, active);
        return '<div class="' + cls.join(" ") + '"><ul class="ft-mol-tracking__step">' + steps + "</ul></div>";
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Tracking</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-tracking</code>): línea de seguimiento de un tema — hitos con fecha y estado (pendiente / completado / actual).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/tracking.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-date</code> · <code>.ft-link</code></td><td>Átomos compuestos</td><td>Fecha y título de cada hito</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>: el estado de cada bola (<code>__step-line-ball--completed</code> / <code>--active</code>) colorea el punto y la línea. Los pasos sin modificador quedan pendientes (gris).</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>línea horizontal con scroll-x</td></tr>
                <tr><td><code>--vertical</code></td><td>línea vertical</td></tr>
                <tr><td><code>--home</code></td><td>versión compacta para portada</td></tr>
                <tr><td><code>--homeVertical</code></td><td>columna scrollable para portada</td></tr>
                <tr><td><code>--stepper</code></td><td>pasos con icono (sin fecha) — ver <strong>Markup</strong></td></tr>
                <tr><td><code>__step-line-ball--completed</code> / <code>--active</code></td><td>estado del hito</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-tracking</code></td></tr>
                <tr><td>Lista</td><td><code>.ft-mol-tracking__step</code></td></tr>
                <tr><td>Hito</td><td><code>.ft-mol-tracking__step-line</code> + <code>__step-line-ball</code></td></tr>
                <tr><td>Fecha</td><td><code>.ft-date</code> (átomo Date)</td></tr>
                <tr><td>Título</td><td><code>.ft-mol-tracking__title</code> &gt; <code>.ft-link</code></td></tr>
                <tr><td>Icono (stepper)</td><td><code>.ft-mol-tracking__icon</code></td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas (<code>tracking-[marca].scss</code>). Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/tracking/_tracking.scss</code> · markup: <code>fourty/molecules/molecule-tracking.html</code></p>
    </div>`;

    const TK = {
        id: "tracking",
        name: "Tracking",
        group: "Molecules",
        overview,
        stories: [
            // full: la línea reparte los hitos a lo ancho (o en columna con --vertical).
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(TK);

    /* Markup original (HTML plano editable por el front) en tracking.html → subgrupo "Markup". */
    window.SB.loadMarkup(TK, document.currentScript && document.currentScript.src, { full: true });
})();
