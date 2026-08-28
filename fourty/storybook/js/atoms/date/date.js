/* ════════════════════════════════════════════════════════════════════════
   atoms/date/date.js — Atoms / Date
   Casuística REAL de scss/fourties/atoms/date/_date.scss (clases .ft-date*).
   Markup tomado de fourty/atoms/atom-date.html. Cero invención de API.

   ╔══════════════════════════════════════════════════════════════════════╗
   ║  DATA-DRIVEN: la casuística vive en el objeto DATA (SSOT). Añadir/     ║
   ║  quitar variante = editar el array, no el markup.                      ║
   ╚══════════════════════════════════════════════════════════════════════╝

   .ft-date es el bloque de fecha/firma temporal de una noticia: un flex en
   columna (lugar + hora de publicación + "actualizada"). Modificadores de
   alineación/estilo: --lurid (negro, izq), --center, --right, --inline (fila en
   ≥768px). Gran parte del SCSS son comportamientos CONTEXTUALES dentro de
   tarjetas (behavior-parent de .ft-org-cardHome, .ft-mol-tracking…) que no
   aplican al átomo aislado; aquí se documenta la pieza standalone.
   CONVENCIÓN: la pieza fundamental se llama siempre "Base".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc, spec } = window.SB.helpers;

    /* ══════════════════════════════════════════════════════════════════════
       ▼▼▼  SINGLE SOURCE OF TRUTH — reflejan 1:1 _date.scss  ▼▼▼
       [valor de clase, etiqueta]. "" = base. Mutuamente excluyentes en el showroom.
       ══════════════════════════════════════════════════════════════════════ */
    const DATA = {
        variants: [
            ["",       "Base"],
            ["lurid",  "Lurid (negro)"],
            ["center", "Center"],
            ["right",  "Right"],
            ["inline", "Inline (fila ≥768px)"]
        ]
    };
    /* ▲▲▲  fin SINGLE SOURCE OF TRUTH  ▲▲▲ */

    /* ─── Constructor del markup ─── */
    const dateEl = (mod, a) => {
        const cls = ["ft-date"];
        if (mod) cls.push("ft-date--" + mod);
        const extra = a.extra ? `<span class="ft-date__extra">${esc(a.extra)}</span>` : "";
        return `<div class="${cls.join(" ")}">
            <div class="ft-date__text">
                <span class="ft-date__textPlace">${esc(a.place)}</span>
                <time class="ft-date__textTime" itemprop="datePublished" datetime="2022-09-05T13:04:00+00:00">${esc(a.published)}</time>
            </div>
            <time class="ft-date__reload" itemprop="dateModified" datetime="2023-02-07T12:35:00+00:00">${esc(a.reload)}</time>${extra}
        </div>`;
    };

    /* ══════════════════════════════════════════════════════════════════════
       BASE — .ft-date. Cada eje = un operador en Controls.
       ══════════════════════════════════════════════════════════════════════ */
    const baseArgTypes = [
        { key: "variant", control: "select", desc: "Alineación / estilo (.ft-date--[variante]).",
          options: DATA.variants.map(v => [v[0], v[1]]) },
        { key: "place", control: "text", desc: "Lugar (.ft-date__textPlace)." },
        { key: "published", control: "text", desc: "Fecha de publicación (.ft-date__textTime)." },
        { key: "reload", control: "text", desc: "Marca de actualización (.ft-date__reload)." },
        { key: "extra", control: "text", desc: "Texto extra opcional (.ft-date__extra). Vacío = sin extra." }
    ];
    const baseArgs = {
        variant: "", place: "Barcelona", published: "05 SEPT 2022 - 13:04 CET",
        reload: "Actualizada 07 FEB 2023 - 12:35 CET", extra: ""
    };
    function liveBase(a) { return dateEl(a.variant, a); }

    /* ══════════════════════════════════════════════════════════════════════
       GALERÍA — todas las variantes
       ══════════════════════════════════════════════════════════════════════ */
    const sample = { place: "Barcelona", published: "05 SEPT 2022 - 13:04 CET", reload: "Actualizada 07 FEB 2023 - 12:35 CET", extra: "" };
    const galleryVariants = () =>
        DATA.variants.map(v => spec(v[1], dateEl(v[0], sample))).join("");

    /* ══════════════════════════════════════════════════════════════════════
       OVERVIEW
       ══════════════════════════════════════════════════════════════════════ */
    const overview = `<div class="cb-docs__inner">
        <h1>Date</h1>
        <p class="cb-docs__lead">Átomo de <strong>fecha/firma temporal</strong> (<code>.ft-date</code>): un flex en columna con el lugar, la hora de publicación y la marca de «actualizada». Tipografía pequeña en color <code>var(--color-quaternary)</code>.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                    <tr><td><code>brands/[marca]/atoms/date.css</code></td><td>CSS compilado del átomo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                    <tr><td><code>scss/fourties/atoms/date/_date.scss</code> + <code>date-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar (importa <code>abstracts</code> + <code>vendors/bourbon</code>)</td></tr>
                    <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
                </tbody>
            </table>
        </div>
        <div class="cb-callout">Gran parte del SCSS son <strong>comportamientos contextuales</strong> (<code>behavior-parent</code>) que reflujen u ocultan la fecha dentro de <code>.ft-org-cardHome</code>, <code>.ft-mol-tracking</code>, <code>.ft-org-directNews</code>… Aquí se documenta el átomo <strong>aislado</strong>; en esos contenedores cambia su layout automáticamente. La marca <strong>revistas</strong> anula el margen inferior.</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>Flex columna · centrado · color quaternary</td></tr>
                <tr><td><code>--lurid</code></td><td>Color negro · alineado a la izquierda · <code>__text</code> más grande y bold</td></tr>
                <tr><td><code>--center</code></td><td>Alineado al centro</td></tr>
                <tr><td><code>--right</code></td><td>Alineado a la derecha</td></tr>
                <tr><td><code>--inline</code></td><td>Columna en móvil · fila en ≥768px</td></tr>
            </tbody>
        </table>

        <h2>Anatomía · BEM</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-date</code></td></tr>
                <tr><td>Texto</td><td><code>.ft-date__text</code> → <code>__textPlace</code> · <code>__textTime</code></td></tr>
                <tr><td>Actualización</td><td><code>.ft-date__reload</code></td></tr>
                <tr><td>Extra</td><td><code>.ft-date__extra</code> (<code>white-space: pre-line</code>)</td></tr>
            </tbody>
        </table>

        <h2>Accesibilidad</h2>
        <div class="cb-callout">Usa <code>&lt;time&gt;</code> con <code>datetime</code> e <code>itemprop</code> (<code>datePublished</code> / <code>dateModified</code>) para exponer la fecha de forma legible por máquinas.</div>

        <p class="cb-src">Fuente: <code>scss/fourties/atoms/date/_date.scss</code> · markup: <code>fourty/atoms/atom-date.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const DATE = {
        id: "date",
        name: "Date",
        group: "Atoms",
        overview,
        stories: [
            { id: "base", name: "Base", hint: ".ft-date", kind: "interactive", full: true,
              argTypes: baseArgTypes, args: baseArgs, render: liveBase }
        ],
        subgroups: [
            { id: "galleries", name: "Galleries", collapsed: true,
              stories: [
                  { id: "variants", name: "Variantes", hint: "5 alineaciones/estilos", kind: "gallery", full: true, render: galleryVariants }
              ]
            }
        ]
    };
    window.SB.register(DATE);
    window.SB.loadMarkup(DATE, document.currentScript && document.currentScript.src, { full: true });
})();
