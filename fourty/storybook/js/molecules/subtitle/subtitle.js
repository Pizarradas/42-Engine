/* ════════════════════════════════════════════════════════════════════════
   molecules/subtitle/subtitle.js — Molecules / Subtitle
   Casuística REAL de scss/fourties/molecules/subtitle/_subtitle.scss (.ft-mol-subtitle*).
   Markup tomado de fourty/molecules/molecule-subtitle.html. Cero invención de API.

   Entradilla / subtítulo de artículo (un <h2>). Lleva una viñeta decorativa (:before)
   que SOLO aparece cuando hay varios subtítulos hermanos (:not(:only-of-type)); un
   subtítulo suelto no la muestra. Modificadores --isCenter (centrado, sin viñeta) y las
   familias de lista --listSimple / --list (compone con .ft-list). Solo CSS.

   Estructura: una story plana interactiva "Base" (controls: variante · texto) + subgrupo
   "Markup" async desde subtitle.html (incluye las familias de lista y el contenido rico).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _subtitle.scss ▼ */
    const DATA = {
        variants: [
            ["", "entradilla (defecto)"],
            ["ft-mol-subtitle--isCenter", "centrada (--isCenter, sin viñeta)"],
            ["ft-mol-subtitle--listSimple", "lista simple (--listSimple)"]
        ]
    };

    /* ─── BASE — .ft-mol-subtitle ─── */
    const baseArgTypes = [
        { key: "variant", control: "select", desc: "Variante del subtítulo (.ft-mol-subtitle--isCenter / --listSimple).", options: DATA.variants },
        { key: "text", control: "text", desc: "Texto de la entradilla (.ft-mol-subtitle)." }
    ];
    const baseArgs = {
        variant: "",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry, standard dummy text ever since the 1500s."
    };

    function live(a) {
        const cls = ["ft-mol-subtitle"];
        if (a.variant) cls.push(a.variant);
        cls.push("ft-helper-fontColor-quaternary");
        return '<h2 class="' + cls.join(" ") + '">' + esc(a.text) + "</h2>";
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Subtitle</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-subtitle</code>): entradilla / subtítulo de artículo, con viñeta decorativa y variantes de lista.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/subtitle.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>brands/[marca]/atoms/list.css</code></td><td>CSS de <code>.ft-list</code></td><td>Familias <code>--list</code> / <code>--listSimple</code></td></tr>
                <tr><td>SVG bullet (icono)</td><td>Viñeta del <code>:before</code></td><td>Cuando hay varios subtítulos hermanos</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout"><strong>Viñeta condicional.</strong> La viñeta (<code>:before</code>) solo se pinta con <code>:not(:only-of-type)</code> — es decir, cuando hay <strong>más de un</strong> <code>.ft-mol-subtitle</code> hermano. Un subtítulo suelto (como la story Base) NO muestra viñeta; revisa la story <strong>Markup</strong> para verla con varios. El color de la viñeta cambia por marca y por contexto (premium, fondo negro…).</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>entradilla a la izquierda; viñeta si hay hermanos</td></tr>
                <tr><td><code>--isCenter</code></td><td>texto centrado, sin viñeta</td></tr>
                <tr><td><code>--listSimple</code></td><td>variante de lista simple (varios subtítulos)</td></tr>
                <tr><td><code>--list</code> + <code>.ft-list--primary/--numbered</code></td><td>compone con el átomo Lista (ítems <code>.ft-list__item</code>)</td></tr>
            </tbody>
        </table>
        <div class="cb-callout">Acepta enlaces internos con borde inferior punteado: <code>.ft-link</code> (+ <code>--secondary</code> / <code>--tertiary</code> / <code>--decoration</code>).</div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-subtitle</code> (un <code>&lt;h2&gt;</code>)</td></tr>
                <tr><td>Viñeta</td><td><code>:before</code> (SVG bullet, condicional)</td></tr>
                <tr><td>Ítem de lista</td><td><code>.ft-list__item</code> (familias <code>--list</code>)</td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>El color de la viñeta cambia por marca (<code>subtitle-[marca].scss</code>): rojo en <code>ep</code>/<code>sport</code>, azul en <code>epe</code>/<code>regionales</code>, gris en <code>ux</code>. Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/subtitle/_subtitle.scss</code> · markup: <code>fourty/molecules/molecule-subtitle.html</code></p>
    </div>`;

    const ST = {
        id: "subtitle",
        name: "Subtitle",
        group: "Molecules",
        overview,
        stories: [
            // full: la entradilla ocupa el ancho del texto del artículo.
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(ST);

    /* Markup original (HTML plano editable por el front) en subtitle.html → subgrupo "Markup". */
    window.SB.loadMarkup(ST, document.currentScript && document.currentScript.src, { full: true });
})();
