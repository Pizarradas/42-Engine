/* ════════════════════════════════════════════════════════════════════════
   molecules/countdown/countdown.js — Molecules / Countdown
   Casuística REAL de scss/fourties/molecules/countdown/_countdown.scss (.ft-mol-countdown*).
   Markup tomado de fourty/molecules/molecule-countdown.html. Cero invención de API.

   Cuenta atrás a un evento: imágenes laterales (__lft / __rgt) + bloque central
   (__cnt > __cntContent) con título y casillas días/horas/minutos. Acabados --bg
   (fondo ilustrado) y --custom (contador con arte de fondo). Una story plana
   interactiva "Base" (variante · título · días/horas/minutos) + subgrupo "Markup".

   Componente con cuenta JS-DRIVEN en producción: un timer actualiza #days/#hours/
   #minutes. El storybook es zero-toolchain y NO lo carga → muestra valores estáticos
   (mismo aspecto, sin tick). Se documenta la dependencia.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    const IMG = "/cds-statics/assets/img/templates/ft-mol-countdown--image.svg";

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _countdown.scss ▼ */
    const DATA = {
        variants: [
            ["", "base (borde, casillas con --color-primary)"],
            ["ft-mol-countdown--bg", "--bg · fondo ilustrado, casillas negras"],
            ["ft-mol-countdown--custom", "--custom · arte de fondo tras el contador"],
            ["ft-mol-countdown--bg ft-mol-countdown--custom", "--bg --custom"]
        ],
        parts: ["__lft", "__cnt", "__cntContent", "__cntContent-title", "__cntContent-count", "__cntContent-text", "__cntContent-textInner", "__rgt"]
    };

    const pic = () => `<picture>
        <source media="(min-width: 768px)" srcset="${IMG}">
        <img src="${IMG}" width="230" height="80" loading="lazy" class="ft-helper-img-rd" alt="alt text" title="title text">
    </picture>`;

    const cell = (id, value, label) => `<li class="ft-mol-countdown__cntContent-text"><span class="ft-mol-countdown__cntContent-textInner" id="${id}">${esc(value)}</span>${label}</li>`;

    /* ─── BASE — .ft-mol-countdown ─── */
    const baseArgTypes = [
        { key: "variant", control: "select", desc: "Acabado de la cuenta atrás.", options: DATA.variants },
        { key: "title", control: "text", desc: "Título sobre el contador (__cntContent-title)." },
        { key: "days", control: "text", desc: "Valor de días (#days)." },
        { key: "hours", control: "text", desc: "Valor de horas (#hours)." },
        { key: "minutes", control: "text", desc: "Valor de minutos (#minutes)." }
    ];
    const baseArgs = { variant: "", title: "El torneo comenzará en", days: "160", hours: "18", minutes: "49" };

    function live(a) {
        const cls = ["ft-mol-countdown"];
        if (a.variant) a.variant.split(" ").forEach(c => cls.push(c));
        return `<div class="${cls.join(" ")}">
    <div class="ft-mol-countdown__lft">${pic()}</div>
    <div class="ft-mol-countdown__cnt">
        <div class="ft-mol-countdown__cntContent">
            <h2 class="ft-mol-countdown__cntContent-title">${esc(a.title)}</h2>
            <ul id="countdown" class="ft-mol-countdown__cntContent-count">
                ${cell("days", a.days, "DIAS")}
                ${cell("hours", a.hours, "HORAS")}
                ${cell("minutes", a.minutes, "MINUTOS")}
            </ul>
        </div>
    </div>
    <div class="ft-mol-countdown__rgt">${pic()}</div>
</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Countdown</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-countdown</code>): cuenta atrás a un evento — imágenes laterales y un bloque central con título y casillas de días/horas/minutos.</p>

        <div class="cb-callout"><strong>Cuenta JS-driven.</strong> En producción un timer actualiza <code>#days</code>/<code>#hours</code>/<code>#minutes</code>. El storybook es <strong>zero-toolchain</strong> y no lo carga: aquí los valores son estáticos (el control los fija), mismo aspecto sin tick en vivo.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/countdown.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td>Timer de cuenta atrás</td><td>JavaScript</td><td>Solo para el tick en vivo (actualiza #days/#hours/#minutes)</td></tr>
                <tr><td><code>scss/fourties/molecules/countdown/_countdown.scss</code> + <code>countdown-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Las variantes <code>--bg</code> y <code>--custom</code> usan imágenes de fondo (<code>$images-path/bgs/…</code>); deben existir en la marca activa para verse completas.</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>borde redondeado, casillas con <code>--color-primary</code></td></tr>
                <tr><td><code>--bg</code></td><td>fondo ilustrado; casillas en negro</td></tr>
                <tr><td><code>--custom</code></td><td>arte de fondo tras el contador (≥768px), título en blanco</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-countdown</code></td></tr>
                <tr><td>Imágenes</td><td><code>__lft</code> · <code>__rgt</code></td></tr>
                <tr><td>Contador</td><td><code>__cnt</code> &gt; <code>__cntContent</code> (<code>-title</code>, <code>-count</code>)</td></tr>
                <tr><td>Casilla</td><td><code>__cntContent-text</code> &gt; <code>__cntContent-textInner</code> (valor)</td></tr>
            </tbody>
        </table>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/countdown/_countdown.scss</code> · markup: <code>fourty/molecules/molecule-countdown.html</code></p>
    </div>`;

    const CD = {
        id: "countdown",
        name: "Countdown",
        group: "Molecules",
        overview,
        stories: [
            // full: en ≥768px pasa a fila (imágenes a los lados); necesita ancho
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(CD);

    /* Markup original (HTML plano editable por el front) en countdown.html → subgrupo "Markup". */
    window.SB.loadMarkup(CD, document.currentScript && document.currentScript.src, { full: true });
})();
