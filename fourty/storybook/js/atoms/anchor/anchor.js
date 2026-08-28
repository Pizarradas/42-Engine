/* ════════════════════════════════════════════════════════════════════════
   atoms/anchor/anchor.js — Atoms / Anchor
   Casuística REAL de scss/fourties/atoms/anchor/_anchor.scss (clases .ft-anchor*).
   Markup tomado de fourty/atoms/atom-anchor.html. Cero invención de API.

   ╔══════════════════════════════════════════════════════════════════════╗
   ║  OJO: NO confundir con el HELPER `.ft-helper-anchor-spacer` (otra      ║
   ║  pieza, ya migrada en Helpers/Anchor). Este es el ÁTOMO `.ft-anchor`.  ║
   ╚══════════════════════════════════════════════════════════════════════╝

   .ft-anchor es un contenedor estructural (display:block) que envuelve un punto
   de destino de salto (#id) o un bloque de contenido. Su único modificador es
   --absolute (lo saca del flujo, z-index -1) para usarlo como ancla invisible.
   El "amortiguador" anti-cabecera-fija se compone con `ft-helper-spacer-t-*`.
   CONVENCIÓN: la pieza fundamental se llama siempre "Base".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc, spec } = window.SB.helpers;

    /* ══════════════════════════════════════════════════════════════════════
       ▼▼▼  SINGLE SOURCE OF TRUTH — reflejan 1:1 _anchor.scss  ▼▼▼
       ══════════════════════════════════════════════════════════════════════ */
    const DATA = {
        // Espaciadores superiores típicos para separar el ancla de una cabecera fija.
        spacers: [["", "—"], ["ft-helper-spacer-t-lg", "spacer-t-lg"], ["ft-helper-spacer-t-xlg", "spacer-t-xlg"], ["ft-helper-spacer-t-xxlg", "spacer-t-xxlg"]]
    };
    /* ▲▲▲  fin SINGLE SOURCE OF TRUTH  ▲▲▲ */

    // Contenido de muestra: un enlace de destino (lo más habitual en el showroom).
    const sample = `<a href="#" class="ft-link ft-link--secondary" title="Destino del ancla">Destino del ancla</a>`;

    const anchor = (mods) =>
        `<div class="${["ft-anchor"].concat(mods).join(" ")}">${sample}</div>`;

    /* ══════════════════════════════════════════════════════════════════════
       BASE — .ft-anchor. Cada eje = un operador en Controls.
       ══════════════════════════════════════════════════════════════════════ */
    const baseArgTypes = [
        { key: "absolute", control: "boolean", desc: "Saca el ancla del flujo (.ft-anchor--absolute): position:absolute · z-index:-1 · overflow:hidden. Para anclas invisibles." },
        { key: "spacer", control: "select", desc: "Espaciador superior (helper ft-helper-spacer-t-*) que separa el destino de una cabecera fija.",
          options: DATA.spacers }
    ];
    const baseArgs = { absolute: false, spacer: "" };
    function liveBase(a) {
        const mods = [];
        if (a.absolute) mods.push("ft-anchor--absolute");
        if (a.spacer) mods.push(a.spacer);
        // Nota visual: --absolute lo saca del flujo (z-index -1); en el lienzo se
        // mostraría "vacío". Por eso envolvemos en un marco con etiqueta para que
        // se entienda el estado aunque el ancla quede oculta.
        const note = a.absolute
            ? `<p style="margin:0 0 8px;font:400 11.5px/1.4 'Inter',sans-serif;color:#a8071a;">Con <code>--absolute</code> el ancla sale del flujo (z-index:-1): en una página real queda invisible bajo el contenido. Aquí se muestra dentro de un marco para verla.</p>`
            : "";
        return `<div style="position:relative;padding:12px;border:1px dashed #b3b3b3;border-radius:3px;background:#fff;">${note}${anchor(mods)}</div>`;
    }

    /* ══════════════════════════════════════════════════════════════════════
       GALERÍA — combinación con espaciadores
       ══════════════════════════════════════════════════════════════════════ */
    const gallerySpacers = () =>
        DATA.spacers.map(s =>
            spec(s[1], `<div style="border:1px dashed #ddd;border-radius:3px;">${anchor(s[0] ? [s[0]] : [])}</div>`)
        ).join("");

    /* ══════════════════════════════════════════════════════════════════════
       OVERVIEW
       ══════════════════════════════════════════════════════════════════════ */
    const overview = `<div class="cb-docs__inner">
        <h1>Anchor</h1>
        <p class="cb-docs__lead">Átomo estructural (<code>.ft-anchor</code>): un contenedor <code>display:block</code> que envuelve un <strong>punto de destino de salto</strong> (<code>#id</code>) o un bloque de contenido. Su único modificador, <code>--absolute</code>, lo convierte en un ancla invisible fuera del flujo.</p>

        <div class="cb-callout cb-callout--warn">No confundir con el <strong>helper</strong> <code>.ft-helper-anchor-spacer</code> (en <em>Helpers / Anchor</em>), que resuelve el mismo problema (cabecera fija que tapa el destino) por la vía del pseudo-elemento. Este es el <strong>átomo</strong> contenedor.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                    <tr><td><code>brands/[marca]/atoms/anchor.css</code></td><td>CSS compilado del átomo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                    <tr><td><code>scss/fourties/atoms/anchor/_anchor.scss</code> + <code>anchor-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar (importa <code>abstracts</code> + <code>vendors/bourbon</code>)</td></tr>
                    <tr><td>—</td><td>JavaScript</td><td>No necesita JS (el salto es nativo de <code>#id</code>)</td></tr>
                </tbody>
            </table>
        </div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td><code>display:block</code> · envuelve el destino / contenido</td></tr>
                <tr><td><code>--absolute</code></td><td><code>position:absolute</code> · <code>z-index:-1</code> · <code>overflow:hidden</code> → ancla invisible bajo el contenido</td></tr>
            </tbody>
        </table>

        <h2>Composición · separar de una cabecera fija</h2>
        <p>El átomo no trae offset propio: se compone con un espaciador superior para que el destino no quede tapado por una cabecera fija al saltar.</p>
        <pre style="background:#f5f5f5;padding:10px;border-radius:3px;font:500 11.5px/1.4 monospace;overflow:auto;"><code>&lt;div class="ft-anchor ft-helper-spacer-t-xxlg"&gt;
  &lt;a href="#seccion" class="ft-link ft-link--secondary"&gt;Sección&lt;/a&gt;
&lt;/div&gt;</code></pre>

        <h2>Anatomía · BEM</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-anchor</code></td></tr>
                <tr><td>Modificador</td><td><code>--absolute</code></td></tr>
                <tr><td>Composición</td><td><code>ft-helper-spacer-t-*</code> (offset)</td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/fourties/atoms/anchor/_anchor.scss</code> · markup: <code>fourty/atoms/atom-anchor.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const ANCHOR = {
        id: "anchor-atom",
        name: "Anchor",
        group: "Atoms",
        overview,
        stories: [
            { id: "base", name: "Base", hint: ".ft-anchor", kind: "interactive", full: true,
              argTypes: baseArgTypes, args: baseArgs, render: liveBase }
        ],
        subgroups: [
            { id: "galleries", name: "Galleries", collapsed: true,
              stories: [
                  { id: "spacers", name: "Con espaciadores", hint: "offset cabecera fija", kind: "gallery", full: true, render: gallerySpacers }
              ]
            }
        ]
    };
    window.SB.register(ANCHOR);
    window.SB.loadMarkup(ANCHOR, document.currentScript && document.currentScript.src, { full: true });
})();
