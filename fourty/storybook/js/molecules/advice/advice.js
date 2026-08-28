/* ════════════════════════════════════════════════════════════════════════
   molecules/advice/advice.js — Molecules / Advice
   Casuística REAL de scss/fourties/molecules/advice/_advice.scss (.ft-mol-advice*).
   Markup tomado de fourty/molecules/molecule-advice.html. Cero invención de API.

   OJO: es la MOLÉCULA .ft-mol-advice (≠ átomo .ft-advice, ya migrado con id "advice").
   Por eso el id de este componente es "advice-mol". Barra full-width (texto a la
   izquierda + .ft-btn a la derecha, con space-between). Una story plana interactiva
   "Base" (título · subtítulo · texto del botón · --only) + subgrupo "Markup" async.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* Icono real del showroom (normalizado /../../cds-statics → /cds-statics). */
    const GOOGLE = "/cds-statics/assets/img/icons/icon-google.svg";

    /* ▼ SINGLE SOURCE OF TRUTH — piezas/modificadores reales de _advice.scss ▼ */
    const DATA = {
        parts: ["__content", "__title", "__subtitle"],
        // .ft-mol-advice--[modificador]
        mods: [
            ["--only", "en móvil solo el botón; el contenido (y la barra) se ocultan ≥768px"]
        ]
    };

    /* ─── BASE — .ft-mol-advice ─── */
    const baseArgTypes = [
        { key: "title", control: "text", desc: "Título en negrita (__title)." },
        { key: "subtitle", control: "text", desc: "Subtítulo (__subtitle; se oculta <768px)." },
        { key: "btnLabel", control: "text", desc: "Texto del botón .ft-btn." },
        { key: "only", control: "boolean", desc: "Modificador --only: en móvil solo botón; oculta contenido y barra ≥768px." }
    ];
    const baseArgs = { title: "Ya nos sigues?", subtitle: " Márcanos como medio preferente", btnLabel: "Añádenos en Google", only: false };

    function live(a) {
        const cls = ["ft-mol-advice"];
        if (a.only) cls.push("ft-mol-advice--only");
        return `<div class="${cls.join(" ")}">
    <div class="ft-mol-advice__content">
        <span class="ft-mol-advice__title">${esc(a.title)}</span>
        <span class="ft-mol-advice__subtitle">${esc(a.subtitle)}</span>
    </div>
    <a href="#" alt="" title="" class="ft-btn ft-btn--secondary ft-btn--secondary-has--icon ft-btn--sm">
        <img class="ft-btn__icon ft-btn__icon--primal" src="${GOOGLE}">
        ${esc(a.btnLabel)}
    </a>
</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Advice <small style="font-weight:400;opacity:.7">· molécula</small></h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-advice</code>): barra de aviso a ancho completo con un texto (título + subtítulo) a la izquierda y un botón <code>.ft-btn</code> a la derecha. Caso típico: «márcanos como medio preferente».</p>

        <div class="cb-callout">No confundir con el <strong>átomo</strong> <code>.ft-advice</code> (caja de aviso). Esta es la molécula <code>.ft-mol-advice</code>, una barra horizontal con CTA.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/advice.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>brands/[marca]/atoms/btn.css</code></td><td>CSS del átomo del CTA</td><td>Siempre (contiene <code>.ft-btn</code>)</td></tr>
                <tr><td><code>scss/fourties/molecules/advice/_advice.scss</code> + <code>advice-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>. El subtítulo se oculta por debajo de 768px (<code>display:none</code> → <code>flex</code>). Define localmente <code>--color-primary: var(--color-black)</code>.</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>barra a ancho completo con borde inferior, texto + botón</td></tr>
                <tr><td><code>--only</code></td><td>en móvil deja <strong>solo el botón</strong>; oculta contenido y la propia barra ≥768px</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-advice</code></td></tr>
                <tr><td>Contenido</td><td><code>.ft-mol-advice__content</code></td></tr>
                <tr><td>Título</td><td><code>.ft-mol-advice__title</code></td></tr>
                <tr><td>Subtítulo</td><td><code>.ft-mol-advice__subtitle</code> (oculto &lt;768px)</td></tr>
                <tr><td>CTA</td><td><code>.ft-btn</code> (átomo Btn)</td></tr>
            </tbody>
        </table>

        <div class="cb-callout">El modificador <code>--only</code> se ve mejor estrechando el viewport del canvas: en anchos ≥768px la barra completa se oculta (es la variante «solo botón en móvil»).</div>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/advice/_advice.scss</code> · markup: <code>fourty/molecules/molecule-advice.html</code></p>
    </div>`;

    const AD = {
        id: "advice-mol",
        name: "Advice",
        group: "Molecules",
        overview,
        stories: [
            // full: la barra es width:100% con space-between; necesita ancho para verse
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(AD);

    /* Markup original (HTML plano editable por el front) en advice.html → subgrupo "Markup". */
    window.SB.loadMarkup(AD, document.currentScript && document.currentScript.src, { full: true });
})();
