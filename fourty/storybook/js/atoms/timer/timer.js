/* ════════════════════════════════════════════════════════════════════════
   atoms/timer/timer.js — Atoms / Timer
   Casuística REAL de scss/fourties/atoms/timer/_timer.scss (.ft-timer*).
   Markup tomado de fourty/atoms/atom-timer.html. Cero invención de API.

   ╔══════════════════════════════════════════════════════════════════════╗
   ║  La cuenta atrás real la mueve JS; el átomo es el ESQUELETO visual.    ║
   ╚══════════════════════════════════════════════════════════════════════╝

   .ft-timer es un cronómetro/cuenta atrás: __container envuelve un __title
   (sr-only), un __display con __counter (MM:SS) y los botones __controls
   (controlsInit / controlsPause), más un __txt sr-only para anuncios.
   Modificador --inline: layout en fila con botones icon-only (iconos play/pause
   en :before, data-URI) pensados para fondos oscuros (display en blanco).
   CONVENCIÓN: la pieza fundamental se llama siempre "Base".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc, spec } = window.SB.helpers;

    /* ══════════════════════════════════════════════════════════════════════
       ▼▼▼  SINGLE SOURCE OF TRUTH — reflejan 1:1 _timer.scss  ▼▼▼
       ══════════════════════════════════════════════════════════════════════ */
    const DATA = {
        // Único modificador real.
        variants: [["", "Base (apilado)"], ["inline", "Inline (fila, icon-only)"]]
    };
    /* ▲▲▲  fin SINGLE SOURCE OF TRUTH  ▲▲▲ */

    /* ─── Constructor del markup ─── */
    let uid = 0;
    const timerEl = (inline, mm, ss) => {
        const id = "sb-timer-" + (++uid);
        const root = ["ft-timer"];
        if (inline) root.push("ft-timer--inline");
        const inner = `<div class="${root.join(" ")}" data-id="${id}">
            <div class="ft-timer__container">
                <h2 class="ft-timer__title">Contador de tiempo</h2>
                <div class="ft-timer__display" role="status" aria-live="polite" aria-label="Tiempo restante">
                    <span class="ft-timer__counter" aria-label="Minutos">${esc(mm)}</span><span class="ft-timer__counter">:</span><span class="ft-timer__counter" aria-label="Segundos">${esc(ss)}</span>
                </div>
                <button class="ft-timer__controls ft-timer__controlsInit" type="button">Iniciar</button>
                <button class="ft-timer__controls ft-timer__controlsPause" type="button">Pausar</button>
                <div class="ft-timer__txt" id="${id}-sr" role="status" aria-live="polite"></div>
            </div>
        </div>`;
        // En --inline el display es blanco y los iconos van invertidos → fondo oscuro para verlo.
        return inline
            ? `<div class="ft-helper-bgColor-black" style="display:inline-block;padding:1rem 1.5rem;border-radius:8px;">${inner}</div>`
            : inner;
    };

    /* ══════════════════════════════════════════════════════════════════════
       BASE — .ft-timer. Cada eje = un operador en Controls.
       ══════════════════════════════════════════════════════════════════════ */
    const baseArgTypes = [
        { key: "inline", control: "boolean", desc: "Layout en fila con controles icon-only (.ft-timer--inline). Se muestra sobre fondo oscuro." },
        { key: "mm", control: "text", desc: "Minutos del display (.ft-timer__counter)." },
        { key: "ss", control: "text", desc: "Segundos del display (.ft-timer__counter)." }
    ];
    const baseArgs = { inline: false, mm: "10", ss: "00" };
    function liveBase(a) { return timerEl(a.inline, a.mm, a.ss); }

    /* ══════════════════════════════════════════════════════════════════════
       GALERÍA — variantes
       ══════════════════════════════════════════════════════════════════════ */
    const galleryVariants = () =>
        DATA.variants.map(v => spec(v[1], timerEl(v[0] === "inline", "10", "00"))).join("");

    /* ══════════════════════════════════════════════════════════════════════
       OVERVIEW
       ══════════════════════════════════════════════════════════════════════ */
    const overview = `<div class="cb-docs__inner">
        <h1>Timer</h1>
        <p class="cb-docs__lead">Átomo de <strong>cuenta atrás / cronómetro</strong> (<code>.ft-timer</code>): un display <code>MM:SS</code> con botones de iniciar/pausar. El átomo aporta el <strong>esqueleto visual</strong>; la cuenta atrás la mueve el JavaScript del proyecto.</p>

        <div class="cb-callout cb-callout--warn">El conteo es dinámico → necesita JS (no incluido en el átomo). Aquí el display muestra un valor estático de ejemplo. La variante <code>--inline</code> pinta el display en blanco y los controles como iconos play/pause (SVG <code>data:</code> inline): se muestra sobre fondo oscuro para que sea visible.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                    <tr><td><code>brands/[marca]/atoms/timer.css</code></td><td>CSS compilado del átomo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                    <tr><td><code>scss/fourties/atoms/timer/_timer.scss</code> + <code>timer-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar (importa <code>abstracts</code> + <code>vendors/bourbon</code>)</td></tr>
                    <tr><td>JS de cuenta atrás</td><td>JavaScript</td><td>Siempre para el conteo real (lo aporta el proyecto)</td></tr>
                </tbody>
            </table>
        </div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>Apilado · controles como píldora primary con texto</td></tr>
                <tr><td><code>--inline</code></td><td>Fila · controles icon-only (play/pause) · display blanco</td></tr>
            </tbody>
        </table>

        <h2>Anatomía · BEM</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-timer</code></td></tr>
                <tr><td>Contenedor</td><td><code>.ft-timer__container</code></td></tr>
                <tr><td>Título (sr-only)</td><td><code>.ft-timer__title</code></td></tr>
                <tr><td>Display</td><td><code>.ft-timer__display</code> → <code>.ft-timer__counter</code></td></tr>
                <tr><td>Controles</td><td><code>.ft-timer__controls</code> + <code>--controlsInit</code> / <code>--controlsPause</code></td></tr>
                <tr><td>Anuncio (sr-only)</td><td><code>.ft-timer__txt</code></td></tr>
            </tbody>
        </table>

        <h2>Accesibilidad</h2>
        <div class="cb-callout">El display usa <code>role="status"</code> + <code>aria-live="polite"</code> para anunciar el tiempo; el título y <code>__txt</code> son sr-only. Los <code>__counter</code> llevan <code>aria-label</code> (Minutos/Segundos).</div>

        <p class="cb-src">Fuente: <code>scss/fourties/atoms/timer/_timer.scss</code> · markup: <code>fourty/atoms/atom-timer.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const TIMER = {
        id: "timer",
        name: "Timer",
        group: "Atoms",
        overview,
        stories: [
            { id: "base", name: "Base", hint: ".ft-timer", kind: "interactive", full: true,
              argTypes: baseArgTypes, args: baseArgs, render: liveBase }
        ],
        subgroups: [
            { id: "galleries", name: "Galleries", collapsed: true,
              stories: [
                  { id: "variants", name: "Variantes", hint: "base · inline", kind: "gallery", full: true, render: galleryVariants }
              ]
            }
        ]
    };
    window.SB.register(TIMER);
    window.SB.loadMarkup(TIMER, document.currentScript && document.currentScript.src, { full: true });
})();
