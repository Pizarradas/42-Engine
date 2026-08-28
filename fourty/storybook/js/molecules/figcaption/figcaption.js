/* ════════════════════════════════════════════════════════════════════════
   molecules/figcaption/figcaption.js — Molecules / Figcaption
   Casuística REAL de scss/fourties/molecules/figcaption/_figcaption.scss (.ft-mol-figcaption*).
   Markup tomado de fourty/molecules/molecule-figcaption.html. Cero invención de API.

   Pie de imagen: texto del crédito (__txt) y, opcionalmente, un número destacado
   (compone .ft-mol-number-highlighted). Va dentro de un <figure class="ft-img">. Solo
   CSS. Una story plana interactiva "Base" (texto · crédito · número) + subgrupo "Markup".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    const IMG = "/cds-statics/assets/img/templates/ft-mol-box-photo-text-desktop--template.svg";

    /* ▼ SINGLE SOURCE OF TRUTH — piezas reales de _figcaption.scss ▼ */
    const DATA = {
        parts: ["__txt"],
        composes: [".ft-mol-number-highlighted (número destacado opcional)"]
    };

    /* ─── BASE — .ft-mol-figcaption ─── */
    const baseArgTypes = [
        { key: "name", control: "text", desc: "Nombre/sujeto en negrita." },
        { key: "text", control: "text", desc: "Cuerpo del pie de foto (__txt)." },
        { key: "credit", control: "text", desc: "Crédito/autoría en negrita." },
        { key: "showNumber", control: "boolean", desc: "Muestra el número destacado (.ft-mol-number-highlighted)." }
    ];
    const baseArgs = {
        name: "Serge Aurier",
        text: ", exjugador del Villarreal es el lateral libre más valioso de este mercado, con 10 millones. Juega en la banda derecha.",
        credit: "/EFE/AFP",
        showNumber: true
    };

    function live(a) {
        const number = a.showNumber
            ? `<div class="ft-mol-number-highlighted">
            <span class="ft-mol-number-highlighted__item">3</span>
            <span class="ft-mol-number-highlighted__item">3</span>
        </div>`
            : "";
        return `<figure class="ft-img">
    <picture>
        <source media="(min-width: 768px)" srcset="${IMG}">
        <img src="${IMG}" width="656" height="381" loading="lazy" class="ft-helper-img-rd" alt="alt text" title="title text">
    </picture>
    <figcaption class="ft-mol-figcaption">
        <p class="ft-mol-figcaption__txt">
            <span class="ft-helper-fontWeight-800">${esc(a.name)}</span>${esc(a.text)}
            <span class="ft-helper-fontWeight-800">${esc(a.credit)}</span>
        </p>
        ${number}
    </figcaption>
</figure>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Figcaption</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-figcaption</code>): pie de imagen con el texto del crédito (<code>__txt</code>) y, opcionalmente, un número destacado a la derecha (compone <code>.ft-mol-number-highlighted</code>). Va dentro del <code>&lt;figcaption&gt;</code> de un <code>&lt;figure class="ft-img"&gt;</code>.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/figcaption.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-img</code> · <code>.ft-mol-number-highlighted</code></td><td>CSS de piezas que compone</td><td>Contenedor + número destacado</td></tr>
                <tr><td><code>scss/fourties/molecules/figcaption/_figcaption.scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">El tamaño del texto es fluido (<code>clamp()</code> ligado al viewport). En fondo oscuro (<code>.ft-helper-bgColor-...black</code>) el texto pasa a blanco automáticamente.</div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-figcaption</code> (dentro de <code>&lt;figcaption&gt;</code>)</td></tr>
                <tr><td>Texto</td><td><code>.ft-mol-figcaption__txt</code></td></tr>
                <tr><td>Número</td><td><code>.ft-mol-number-highlighted</code> (opcional, a la derecha)</td></tr>
            </tbody>
        </table>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/figcaption/_figcaption.scss</code> · markup: <code>fourty/molecules/molecule-figcaption.html</code></p>
    </div>`;

    const FC = {
        id: "figcaption",
        name: "Figcaption",
        group: "Molecules",
        overview,
        stories: [
            // full: va bajo una imagen a ancho completo
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(FC);

    /* Markup original (HTML plano editable por el front) en figcaption.html → subgrupo "Markup". */
    window.SB.loadMarkup(FC, document.currentScript && document.currentScript.src, { full: true });
})();
