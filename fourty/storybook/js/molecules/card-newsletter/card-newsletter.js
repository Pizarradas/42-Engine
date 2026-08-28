/* ════════════════════════════════════════════════════════════════════════
   molecules/card-newsletter/card-newsletter.js — Molecules / Card Newsletter
   Casuística REAL de scss/fourties/molecules/card-newsletter/_card-newsletter.scss
   (.ft-mol-card-newsletter*). Markup de fourty/molecules/molecule-card-newsletter.html.
   Cero invención de API.

   Ficha de newsletter para grid: etiqueta + switch de alta (CSS-only, .btn-bool), foto
   del autor y texto con CTA "Ver ejemplo". Vive en una celda de grid → se acota a un
   ancho de tarjeta (~420px), no a todo el canvas. Una story plana interactiva "Base"
   (premium · etiqueta · autor · título · descripción) + subgrupo "Markup" async.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    const PHOTO = "/cds-statics/assets/img/avatars/ft-mol-card-newsletter--ferran-boiza.png";

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _card-newsletter.scss ▼ */
    const DATA = {
        mods: [["--is-premium", "etiqueta premium (logo +) y switch reposicionado ≥1024px"]],
        parts: ["__top", "__content", "__text", ".btn-bool (switch CSS-only)", ".ft-tag", ".ft-list (dl)"]
    };

    /* ─── BASE — .ft-mol-card-newsletter ─── */
    const baseArgTypes = [
        { key: "premium", control: "boolean", desc: "Modificador --is-premium (etiqueta premium)." },
        { key: "tag", control: "text", desc: "Texto de la etiqueta (.ft-tag)." },
        { key: "name", control: "text", desc: "Nombre del autor (figcaption)." },
        { key: "title", control: "text", desc: "Título de la newsletter (h3)." },
        { key: "description", control: "text", desc: "Descripción (p)." }
    ];
    const baseArgs = {
        premium: false,
        tag: "Exclusiva suscriptores",
        name: "Ferran Boiza",
        title: "Escaño 0",
        description: "Al final de la semana, Ferran Boiza, director adjunto del diario en Madrid, te refresca los temas imprescindibles en política y tribunales."
    };

    function live(a) {
        const cls = ["ft-mol-card-newsletter"];
        if (a.premium) cls.push("ft-mol-card-newsletter--is-premium");
        // se acota al ancho típico de una celda de grid (la card es flex-column height:100%)
        return `<div style="max-width:420px;width:100%;">
    <article class="${cls.join(" ")}" role="article">
        <div class="ft-mol-card-newsletter__top">
            <ul aria-label="Etiquetas">
                <li class="ft-tag">${esc(a.tag)}</li>
            </ul>
            <div class="subscribe">
                <label>Recibir gratis</label>
                <div class="btn-bool false" data-actas="newsletter-check">
                    <input type="checkbox">
                    <div class="btn-position"></div>
                </div>
            </div>
        </div>
        <div class="ft-mol-card-newsletter__content">
            <figure class="ft-img">
                <img src="${PHOTO}" alt="" width="90" height="90" loading="eager" class="ft-helper-img-rd">
                <figcaption>
                    <p class="ft-helper-fontColor-quaternary ft-helper-fontSize-body-S ft-helper-spacer-t-xxs">${esc(a.name)}</p>
                </figcaption>
            </figure>
            <div class="ft-mol-card-newsletter__text">
                <h3 class="ft-helper-fontSize-heading-XXS">${esc(a.title)}</h3>
                <p class="ft-helper-fontSize-body-L">${esc(a.description)}</p>
                <dl class="ft-list">
                    <dt class="ft-list__item">Diario (LU-VI)</dt>
                    <dd class="ft-list__item"><a class="ft-link ft-link--primary" href="#">Ver ejemplo</a></dd>
                </dl>
            </div>
        </div>
    </article>
</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Card Newsletter</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-card-newsletter</code>): ficha de newsletter para grid — etiqueta, switch de alta, foto del autor y texto con enlace de ejemplo. El switch (<code>.btn-bool</code>) es un checkbox estilizado <strong>solo con CSS</strong> (sin JS).</p>

        <div class="cb-callout">Vive en una <strong>celda de grid</strong> (la card es <code>flex-direction:column; height:100%</code>); aquí se acota a un ancho de tarjeta (~420px) para verla en su contexto, no a todo el canvas.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/card-newsletter.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-tag</code> · <code>.ft-list</code> · <code>.ft-link</code> · <code>.ft-img</code></td><td>CSS de piezas que compone</td><td>Siempre</td></tr>
                <tr><td><code>scss/fourties/molecules/card-newsletter/_card-newsletter.scss</code> + <code>-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>Alta/baja real de newsletter</td><td>JavaScript</td><td>El estilo del switch es CSS; el alta sí necesita JS del consumidor (<code>data-actas</code>, <code>data-mlid</code>…)</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>etiqueta + switch arriba, foto + texto debajo</td></tr>
                <tr><td><code>--is-premium</code></td><td>etiqueta premium (logo +) y switch reposicionado en ≥1024px</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-card-newsletter</code> (<code>&lt;article&gt;</code>)</td></tr>
                <tr><td>Cabecera</td><td><code>__top</code> &gt; <code>.ft-tag</code> + <code>.subscribe</code> (<code>.btn-bool</code>)</td></tr>
                <tr><td>Cuerpo</td><td><code>__content</code> &gt; <code>&lt;figure&gt;</code> + <code>__text</code></td></tr>
                <tr><td>Texto</td><td><code>__text</code> &gt; <code>h3</code> · <code>p</code> · <code>dl.ft-list</code></td></tr>
            </tbody>
        </table>

        <div class="cb-callout">El switch <code>.btn-bool</code> usa <code>:has(input:checked)</code> y <code>:checked + .btn-position</code> para el estado: prueba a marcarlo en el canvas, funciona sin JS.</div>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/card-newsletter/_card-newsletter.scss</code> · markup: <code>fourty/molecules/molecule-card-newsletter.html</code></p>
    </div>`;

    const CN = {
        id: "card-newsletter",
        name: "Card Newsletter",
        group: "Molecules",
        overview,
        stories: [
            // sin full: es una tarjeta de grid, acotada a ~420px en el render
            { id: "base", name: "Base", kind: "interactive", argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(CN);

    /* Markup original (HTML plano editable por el front) en card-newsletter.html → subgrupo "Markup". */
    window.SB.loadMarkup(CN, document.currentScript && document.currentScript.src);
})();
