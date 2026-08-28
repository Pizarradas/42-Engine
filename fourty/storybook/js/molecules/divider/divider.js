/* ════════════════════════════════════════════════════════════════════════
   molecules/divider/divider.js — Molecules / Divider
   Casuística REAL de scss/fourties/molecules/divider/_divider.scss (.mol-divider*).
   Markup tomado de fourty/molecules/molecule-divider.html. Cero invención de API.

   ⚠ PREFIJO NO ESTÁNDAR: usa `.mol-divider` (SIN `ft-`), igual que el átomo Cerca.
   Separador decorativo "esto es todo por ahora": icono circular + dos bloques de
   texto (top/bottom, con líneas discontinuas) + una etiqueta-badge central. Solo CSS.
   Una story plana interactiva "Base" + subgrupo "Markup" async.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    const ICON = "/cds-statics/assets/img/icons/mol-divider-icon--pin-off.svg";
    const PIN = "/cds-statics/assets/img/icons/tag-pin--grey.svg";

    /* ▼ SINGLE SOURCE OF TRUTH — piezas reales de _divider.scss ▼ */
    const DATA = {
        prefix: ".mol-divider (NO ft-, prefijo no estándar)",
        parts: ["__icon-wrapper", "__block", "__block--top", "__block--bottom", "__tag"]
    };

    /* ─── BASE — .mol-divider ─── */
    const baseArgTypes = [
        { key: "topStrong", control: "text", desc: "Título del bloque superior (__block--top strong)." },
        { key: "topSpan", control: "text", desc: "Subtexto del bloque superior." },
        { key: "bottomStrong", control: "text", desc: "Título del bloque inferior (__block--bottom strong)." },
        { key: "bottomSpan", control: "text", desc: "Subtexto del bloque inferior." },
        { key: "tagName", control: "text", desc: "Texto de la etiqueta-badge (.ft-tag__name)." },
        { key: "tagValue", control: "text", desc: "Valor de la etiqueta-badge (.ft-tag__value)." }
    ];
    const baseArgs = {
        topStrong: "Esto es todo por ahora", topSpan: "en tus localidades seleccionadas",
        bottomStrong: "Descubre lo que ocurre cerca", bottomSpan: "de tus municipios favoritos",
        tagName: "A un radio de", tagValue: "10 km"
    };

    function live(a) {
        return `<div class="mol-divider">
    <div class="mol-divider__icon-wrapper ft-helper-bgColor-white">
        <img src="${ICON}" class="ft-img" alt="Icono">
    </div>
    <div class="mol-divider__block mol-divider__block--top ft-helper-fontSize-body-XL">
        <strong>${esc(a.topStrong)}</strong>
        <span>${esc(a.topSpan)}</span>
    </div>
    <div class="mol-divider__block mol-divider__block--bottom ft-helper-fontSize-body-XL">
        <strong>${esc(a.bottomStrong)}</strong>
        <span>${esc(a.bottomSpan)}</span>
    </div>
    <div class="mol-divider__tag">
        <div class="ft-tag ft-tag--md ft-tag--link ft-tag--badge">
            <img src="${PIN}" class="ft-tag__img" alt="Icono">
            <span class="ft-tag__name">${esc(a.tagName)}</span>
            <span class="ft-tag__value">${esc(a.tagValue)}</span>
            <a href="#" class="ft-link ft-link--block" title="title text">Link text</a>
        </div>
    </div>
</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Divider</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.mol-divider</code>): separador decorativo de fin de listado («esto es todo por ahora») — icono circular, dos bloques de texto unidos por líneas discontinuas y una etiqueta-badge central con CTA.</p>

        <div class="cb-callout"><strong>Prefijo no estándar.</strong> Esta molécula usa <code>.mol-divider</code> (<strong>sin</strong> el prefijo <code>ft-mol-</code> habitual), igual que el átomo <em>Cerca</em>. Es una excepción documentada del DS; respétala tal cual al usarla.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/divider.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-tag</code> · <code>.ft-img</code> · <code>.ft-link</code></td><td>CSS de piezas que compone</td><td>Siempre (badge + icono + enlace)</td></tr>
                <tr><td><code>scss/fourties/molecules/divider/_divider.scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.mol-divider</code> (máx. 660px, centrado)</td></tr>
                <tr><td>Icono</td><td><code>.mol-divider__icon-wrapper</code> &gt; <code>.ft-img</code></td></tr>
                <tr><td>Texto superior</td><td><code>.mol-divider__block--top</code> (línea discontinua descendente)</td></tr>
                <tr><td>Texto inferior</td><td><code>.mol-divider__block--bottom</code> (línea discontinua ascendente)</td></tr>
                <tr><td>Etiqueta</td><td><code>.mol-divider__tag</code> &gt; <code>.ft-tag--badge</code></td></tr>
            </tbody>
        </table>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/divider/_divider.scss</code> · markup: <code>fourty/molecules/molecule-divider.html</code></p>
    </div>`;

    const DV = {
        id: "divider",
        name: "Divider",
        group: "Molecules",
        overview,
        stories: [
            // sin full: .mol-divider se autocentra (margin auto, max-width 660px)
            { id: "base", name: "Base", kind: "interactive", argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(DV);

    /* Markup original (HTML plano editable por el front) en divider.html → subgrupo "Markup". */
    window.SB.loadMarkup(DV, document.currentScript && document.currentScript.src);
})();
