/* ════════════════════════════════════════════════════════════════════════
   molecules/paper/paper.js — Molecules / Paper
   Casuística REAL de scss/fourties/molecules/paper/_paper.scss (.ft-mol-paper*).
   Markup tomado de fourty/molecules/molecule-paper.html. Cero invención de API.

   Bloque "edición impresa / hemeroteca": portada del periódico (imagen con icono de
   lupa en la esquina) + contenido (título, lista de enlaces, CTA). Solo CSS. Una story
   plana interactiva "Base" (título · enlaces · texto del botón) + subgrupo "Markup".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    const IMG = "/cds-statics/assets/img/decorative/edicion-impresa.png";

    /* ▼ SINGLE SOURCE OF TRUTH — piezas reales de _paper.scss ▼ */
    const DATA = {
        parts: ["__image (con icono lupa ::after)", "__content", "__title"],
        composes: [".ft-list--primary", ".ft-btn"]
    };

    /* ─── BASE — .ft-mol-paper ─── */
    const baseArgTypes = [
        { key: "title", control: "text", desc: "Título del bloque (__title)." },
        { key: "links", control: "text", desc: "Enlaces de la lista, separados por coma." },
        { key: "btnLabel", control: "text", desc: "Texto del CTA (.ft-btn)." }
    ];
    const baseArgs = { title: "Hemeroteca", links: "Portadas del dia, Hace 25 años, Hace 50 años", btnLabel: "Compra el ejemplar" };

    function live(a) {
        const items = String(a.links).split(",").map(s => s.trim()).filter(Boolean).map(t =>
            `<li class="ft-list__item"><a href="#" class="ft-list__link" title="title text" target="_self">${esc(t)}</a></li>`
        ).join("");
        return `<div class="ft-mol-paper">
    <a href="#" class="ft-link" title="buscar" aria-label="buscar">
        <picture class="ft-mol-paper__image">
            <source media="(min-width: 768px)" srcset="${IMG}">
            <img src="${IMG}" alt="alt text" width="252" height="338" loading="lazy" class="ft-helper-img-rd" title="title text">
        </picture>
    </a>
    <div class="ft-mol-paper__content">
        <h3 class="ft-mol-paper__title"><a href="#" class="ft-link ft-link--primary" title="${esc(a.title)}" aria-label="${esc(a.title)}" target="_self">${esc(a.title)}</a></h3>
        <ul class="ft-list ft-list--primary">${items}</ul>
        <a href="#" class="ft-btn ft-btn--secondary ft-btn--sm" title="buscar" aria-label="buscar" target="_self">${esc(a.btnLabel)}</a>
    </div>
</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Paper</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-paper</code>): bloque de edición impresa / hemeroteca — portada del periódico (con icono de lupa para ampliar) junto a un título, una lista de accesos y un CTA de compra.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/paper.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-list</code> · <code>.ft-btn</code> · <code>.ft-link</code></td><td>CSS de piezas que compone</td><td>Lista, CTA y enlaces</td></tr>
                <tr><td><code>scss/fourties/molecules/paper/_paper.scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS (el icono de lupa es un SVG en el CSS)</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">El icono de lupa de la portada es un <code>::after</code> con SVG <code>data:</code> en el CSS; no requiere markup adicional.</div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-paper</code> (columna en móvil, fila en ≥768px)</td></tr>
                <tr><td>Portada</td><td><code>.ft-mol-paper__image</code> (<code>&lt;picture&gt;</code> con sombra + lupa)</td></tr>
                <tr><td>Contenido</td><td><code>.ft-mol-paper__content</code> &gt; <code>__title</code> + <code>.ft-list</code> + <code>.ft-btn</code></td></tr>
            </tbody>
        </table>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/paper/_paper.scss</code> · markup: <code>fourty/molecules/molecule-paper.html</code></p>
    </div>`;

    const PP = {
        id: "paper",
        name: "Paper",
        group: "Molecules",
        overview,
        stories: [
            // full: en ≥768px pasa a fila (portada + contenido); necesita ancho
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(PP);

    /* Markup original (HTML plano editable por el front) en paper.html → subgrupo "Markup". */
    window.SB.loadMarkup(PP, document.currentScript && document.currentScript.src, { full: true });
})();
