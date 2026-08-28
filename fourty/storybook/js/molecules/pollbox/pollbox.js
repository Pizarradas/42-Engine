/* ════════════════════════════════════════════════════════════════════════
   molecules/pollbox/pollbox.js — Molecules / Poll Box
   Casuística REAL de scss/fourties/molecules/pollbox/_pollbox.scss (.ft-mol-pollbox*).
   Markup tomado de fourty/molecules/molecule-pollbox.html. Cero invención de API.

   Caja de encuesta/votación: pregunta (__title) + lista de respuestas (__answer),
   cada una con un control (átomo .ft-radio = voto único / .ft-check = multi) y un
   medidor de resultados __meter (__bar + __percentage) + __totalvotes; pie con
   __sum (total), __msg ("ya has votado") y botón Votar. El porcentaje/anchura de
   __bar y los recuentos los rellena el JS consumidor (data-percentage/data-votes/
   style width); aquí se muestran valores estáticos. __answer--is-voted resalta la
   opción votada. Story "Base" interactiva (control · nº respuestas · votada) +
   subgrupo "Markup" async (radio + checkbox).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SINGLE SOURCE OF TRUTH — piezas y modificadores reales de _pollbox.scss ▼ */
    const DATA = {
        parts: ["__title", "__list", "__answer", "__meter", "__bar", "__percentage", "__totalvotes", "__sum", "__msg"],
        mods: ["__answer--is-voted"],
        composes: [".ft-radio (voto único)", ".ft-check (multi-voto)", ".ft-mol-btnGroup--rgt", ".ft-btn--secondary", ".ft-text-alert--is-warning"]
    };

    /* ─── BASE — .ft-mol-pollbox ─── */
    const baseArgTypes = [
        { key: "control", control: "radio", desc: "Tipo de control de respuesta.", options: [["radio", "Radio (voto único)"], ["check", "Checkbox (multi-voto)"]] },
        { key: "count", control: "number", desc: "Número de respuestas (2–6).", min: 2, max: 6 },
        { key: "voted", control: "number", desc: "Índice de la respuesta votada (--is-voted).", min: 1, max: 6 },
        { key: "question", control: "text", desc: "Pregunta de la encuesta (__title)." }
    ];
    const baseArgs = { control: "radio", count: "4", voted: "2", question: "¿Lorem ipsum dolor sit amet, consectetur adipiscing elit?" };

    function answer(i, a, votedIdx) {
        const isVoted = i === votedIdx;
        const pct = [55, 20, 15, 10, 6, 4][i - 1] || 5;
        const ctrl = a.control === "check"
            ? `<div class="ft-check">
                    <input id="checkbox-pb-${i}" type="checkbox" class="ft-check__input"${isVoted ? " checked" : ""}>
                    <label for="checkbox-pb-${i}" class="ft-check__label ft-helper-fontWeight-500">Respuesta número ${i}</label>
                </div>`
            : `<div class="ft-radio">
                    <input id="radio-pb-${i}" type="radio" name="radio-pollbox" class="ft-radio__input"${isVoted ? " disabled checked" : ""}>
                    <label for="radio-pb-${i}" class="ft-radio__label ft-helper-fontWeight-500">Respuesta número ${i}</label>
                </div>`;
        return `<li class="ft-mol-pollbox__answer${isVoted ? " ft-mol-pollbox__answer--is-voted" : ""}">
                ${ctrl}
                <div class="ft-mol-pollbox__meter">
                    <span class="ft-mol-pollbox__bar" style="width: ${pct}%;"></span>
                    <span class="ft-mol-pollbox__percentage ft-helper-fontSize-body-S--small" data-percentage="Respuesta ${i}">${pct}%</span>
                </div>
                <span class="ft-helper-display-flex ft-helper-display-flex--end ft-helper-fontSize-body-S--small ft-helper-fontWeight-700 ft-mol-pollbox__totalvotes" data-votes="Respuesta ${i}">${pct * 12} votos</span>
            </li>`;
    }

    function live(a) {
        const n = Math.max(2, Math.min(6, parseInt(a.count, 10) || 2));
        const votedIdx = Math.max(1, Math.min(n, parseInt(a.voted, 10) || 1));
        const items = Array.from({ length: n }, (_, k) => answer(k + 1, a, votedIdx)).join("\n            ");
        return `<div class="ft-helper-spacer-gap-y-md ft-mol-pollbox">
    <form action="">
        <h3 class="ft-mol-pollbox__title">
            <span class="ft-helper-fontSize-body-XL ft-helper-fontWeight-700">${esc(a.question)}</span>
        </h3>
        <ul class="ft-mol-pollbox__list">
            ${items}
        </ul>
        <div class="ft-helper-display-flex ft-helper-display-flex--end ft-mol-pollbox__sum">
            <span class="ft-helper-fontSize-body-M--small ft-helper-fontWeight-700">Total de votos: <span data-percentage="Total votos">XX</span></span>
        </div>
        <div class="ft-mol-pollbox__msg">
            <span class="ft-text-alert ft-text-alert--is-warning ft-text-alert--is-bordered">
                <span class="ft-helper-fontSize-body-M ft-helper-fontWeight-700">Ya has votado esta encuesta</span>
            </span>
        </div>
        <div class="ft-mol-btnGroup ft-mol-btnGroup--rgt">
            <button type="submit" class="ft-btn ft-btn--secondary ft-btn--md">Votar</button>
        </div>
    </form>
</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Poll Box</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-pollbox</code>): caja de encuesta/votación — una pregunta y una lista de respuestas, cada una con su control (radio o checkbox) y un medidor de resultados (barra + porcentaje + votos), más el total, un aviso de "ya has votado" y el botón de envío.</p>

        <div class="cb-callout">El porcentaje, la anchura de la barra (<code>style="width"</code>) y los recuentos los rellena el <strong>JS consumidor</strong> a partir de <code>data-percentage</code>/<code>data-votes</code>. En el Storybook se muestran valores estáticos de ejemplo.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/pollbox.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-radio</code> / <code>.ft-check</code></td><td>CSS de los átomos Radio / Check</td><td>Siempre (controles de respuesta)</td></tr>
                <tr><td><code>.ft-mol-btnGroup</code> · <code>.ft-btn</code> · <code>.ft-text-alert</code></td><td>CSS de moléculas/átomos compuestos</td><td>Botón Votar y aviso</td></tr>
                <tr><td>—</td><td>JavaScript (consumidor)</td><td>Rellena resultados y envía el voto</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>__answer--is-voted</code></td><td>resalta la respuesta votada por el usuario</td></tr>
                <tr><td><code>.ft-radio</code> vs <code>.ft-check</code></td><td>voto único vs multi-voto (define la mecánica de la encuesta)</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-pollbox</code> (envuelve un <code>&lt;form&gt;</code>)</td></tr>
                <tr><td>Pregunta</td><td><code>.ft-mol-pollbox__title</code></td></tr>
                <tr><td>Respuesta</td><td><code>.ft-mol-pollbox__answer</code> &gt; control + <code>__meter</code> (<code>__bar</code> + <code>__percentage</code>) + <code>__totalvotes</code></td></tr>
                <tr><td>Pie</td><td><code>.ft-mol-pollbox__sum</code> · <code>__msg</code> · botón Votar</td></tr>
            </tbody>
        </table>

        <div class="cb-callout">Familias específicas por marca — <code>pollbox-ep/epe/regionales/revistas/sport.scss</code> — reestilan colores y medidor según el medio. No se reproducen aquí; cambian con la marca activa.</div>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/pollbox/_pollbox.scss</code> · markup: <code>fourty/molecules/molecule-pollbox.html</code></p>
    </div>`;

    const PB = {
        id: "pollbox",
        name: "Poll Box",
        group: "Molecules",
        overview,
        stories: [
            // full: el bloque es ancho (form + medidores); necesita espacio
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(PB);

    /* Markup original (HTML plano editable por el front) en pollbox.html → subgrupo "Markup". */
    window.SB.loadMarkup(PB, document.currentScript && document.currentScript.src, { full: true });
})();
