/* ════════════════════════════════════════════════════════════════════════
   molecules/label/label.js — Molecules / Label
   Casuística REAL de scss/fourties/molecules/label/_label.scss (.ft-mol-label*).
   Markup tomado de fourty/molecules/molecule-label.html. Cero invención de API.

   Etiqueta de sección (icono + título) en cápsula redondeada: alineación (cnt/rgt),
   tamaños (sm/xs) y la variante --advice (punto rojo parpadeante). El showroom tiene
   además muchas variantes "por medio" (un logo por cabecera del grupo); se documentan,
   no se reproducen (no silent cap). Una story plana interactiva "Base" + subgrupo "Markup".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    const ICON = "/cds-statics/assets/img/icons/sport-icono-circle.svg";

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _label.scss ▼ */
    const DATA = {
        aligns: [
            ["", "(defecto · izquierda)"],
            ["ft-mol-label--cnt", "--cnt · centrada"],
            ["ft-mol-label--rgt", "--rgt · derecha"]
        ],
        sizes: [
            ["", "(defecto)"],
            ["ft-mol-label--sm", "--sm"],
            ["ft-mol-label--xs", "--xs"]
        ],
        mods: [["--advice", "punto rojo parpadeante (animación shift)"]],
        parts: ["__content", "__image", "__title"]
    };

    /* ─── BASE — .ft-mol-label ─── */
    const baseArgTypes = [
        { key: "title", control: "text", desc: "Texto de la etiqueta (__title)." },
        { key: "align", control: "select", desc: "Alineación.", options: DATA.aligns },
        { key: "size", control: "select", desc: "Tamaño.", options: DATA.sizes },
        { key: "advice", control: "boolean", desc: "Modificador --advice (punto rojo parpadeante)." }
    ];
    const baseArgs = { title: "Confidencial Sport", align: "", size: "", advice: false };

    function live(a) {
        const cls = ["ft-mol-label"];
        if (a.align) cls.push(a.align);
        if (a.size) cls.push(a.size);
        if (a.advice) cls.push("ft-mol-label--advice");
        return `<div class="${cls.join(" ")}">
    <div class="ft-mol-label__content">
        <img src="${ICON}" alt="Confidencial Sport" width="24" height="24" class="ft-mol-label__image">
        <p class="ft-mol-label__title">${esc(a.title)}</p>
    </div>
</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Label</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-label</code>): etiqueta de sección en cápsula redondeada — icono + título. Usada como marca de área editorial (p.ej. «Confidencial Sport»).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/label.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>scss/fourties/molecules/label/_label.scss</code> + <code>label-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS (la animación <code>--advice</code> es CSS)</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>--cnt</code> · <code>--rgt</code></td><td>alineación (centro / derecha)</td></tr>
                <tr><td><code>--sm</code> · <code>--xs</code></td><td>tamaños reducidos (texto e icono)</td></tr>
                <tr><td><code>--advice</code></td><td>punto rojo parpadeante a la izquierda (animación <code>shift</code>)</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-label</code></td></tr>
                <tr><td>Cápsula</td><td><code>.ft-mol-label__content</code> (borde redondeado)</td></tr>
                <tr><td>Icono / título</td><td><code>.ft-mol-label__image</code> · <code>.ft-mol-label__title</code></td></tr>
            </tbody>
        </table>

        <div class="cb-callout">El showroom incluye además decenas de variantes <strong>por medio</strong> (un logo/icono por cabecera del grupo: Sport, EP, EPE, La Provincia…). Son intercambios de <code>__image</code> + texto sobre la misma estructura; no se reproducen aquí una a una (ver <code>molecule-label.html</code>).</div>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/label/_label.scss</code> · markup: <code>fourty/molecules/molecule-label.html</code></p>
    </div>`;

    const LB = {
        id: "label",
        name: "Label",
        group: "Molecules",
        overview,
        stories: [
            // full: las alineaciones (--cnt/--rgt) necesitan ancho para verse
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(LB);

    /* Markup original (HTML plano editable por el front) en label.html → subgrupo "Markup". */
    window.SB.loadMarkup(LB, document.currentScript && document.currentScript.src, { full: true });
})();
