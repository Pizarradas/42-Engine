/* ════════════════════════════════════════════════════════════════════════
   molecules/btngroup/btngroup.js — Molecules / Btn Group
   Casuística REAL de scss/fourties/molecules/btngroup/_btnGroup.scss (.ft-mol-btnGroup*).
   Markup tomado de fourty/__old-showroom/molecules/molecule-btnGroup.html. Cero invención de API.

   Estructura: stories interactivas "Base" y "Scrollable" + subgrupo "Markup" cargado
   async desde btngroup.html (catálogo HTML editable por el front). Es una molécula
   contenedora: agrupa átomos .ft-btn.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc, deprecationBlock } = window.SB.helpers;

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _btnGroup.scss ▼ */
    const DATA = {
        // .ft-mol-btnGroup--[alineación]  (valor = clase completa)
        aligns: [
            ["", "izquierda (defecto)"],
            ["ft-mol-btnGroup--cnt", "cnt · centrado"],
            ["ft-mol-btnGroup--rgt", "rgt · derecha"],
            ["ft-mol-btnGroup--lft", "lft · izquierda"]
        ],
        kinds: ["primary", "secondary", "tertiary"]   // jerarquías de los .ft-btn internos
    };

    /* ─── BASE — .ft-mol-btnGroup (contenedor de .ft-btn) ─── */
    const baseArgTypes = [
        { key: "align", control: "select", desc: "Alineación del grupo (.ft-mol-btnGroup--cnt/rgt/lft).", options: DATA.aligns },
        { key: "count", control: "number", desc: "Número de botones del grupo (rango razonable 1-6; si n > 3 las jerarquías ciclan).", min: 1, max: 6 },
        { key: "label", control: "text", desc: "Texto de los botones internos (.ft-btn)." }
    ];
    const baseArgs = { align: "", count: "2", label: "Text" };

    const scrollArgTypes = [
        { key: "align", control: "select", desc: "Alineación del grupo en >=768px. En móvil la variante scrollable siempre arranca a la izquierda.", options: DATA.aligns },
        { key: "count", control: "number", desc: "Número de botones del carrusel (rango razonable 4-12).", min: 4, max: 12 },
        { key: "label", control: "text", desc: "Prefijo del texto de cada botón; la story añade índice para forzar lectura real del overflow." }
    ];
    const scrollArgs = { align: "", count: "8", label: "Filtro" };

    const btn = (kind, label) => `<a href="#" class="ft-btn ft-btn--${kind} ft-btn--md" title="${esc(label)}" target="_self">${esc(label)}</a>`;
    function live(a) {
        const cls = ["ft-mol-btnGroup"];
        if (a.align) cls.push(a.align);
        // Clamp suave (1..20): el input number deja escribir libremente; el render
        // protege ante valores absurdos. Si n > 3 las kinds ciclan (primary/secondary/tertiary
        // se repiten) — útil para inspeccionar el espaciado del grupo con muchos items.
        const n = Math.max(1, Math.min(20, parseInt(a.count, 10) || 1));
        const items = [];
        for (let i = 0; i < n; i++) items.push(btn(DATA.kinds[i % DATA.kinds.length], a.label));
        return `<div class="${cls.join(" ")}">${items.join("")}</div>`;
    }

    function liveScrollable(a) {
        const cls = ["ft-mol-btnGroup", "ft-mol-btnGroup--is-scrollable"];
        if (a.align) cls.push(a.align);
        const n = Math.max(4, Math.min(20, parseInt(a.count, 10) || 8));
        const items = [];
        for (let i = 0; i < n; i++) items.push(btn(DATA.kinds[i % DATA.kinds.length], `${a.label} ${i + 1}`));
        return `<div class="${cls.join(" ")}">${items.join("")}</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Btn Group</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-btnGroup</code>) que agrupa varios botones <code>.ft-btn</code> con una alineación común y una variante scrollable autosuficiente para hileras que desbordan.</p>

        <h2>Dependencias</h2>
        <p>Lo que necesita un proyecto consumidor para renderizar <code>.ft-mol-btnGroup</code>:</p>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/btnGroup.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>brands/[marca]/atoms/btn.css</code></td><td>CSS del átomo que agrupa</td><td>Siempre (contiene <code>.ft-btn</code>)</td></tr>
                <tr><td><code>scss/fourties/molecules/btnGroup/_btnGroup.scss</code> + <code>btnGroup-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar (importa <code>abstracts</code> + <code>vendors/bourbon</code>)</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>: la alineación (<code>--cnt</code>/<code>--rgt</code>/<code>--lft</code>), el modo fijo (<code>--is-fixed</code>) y el carrusel horizontal (<code>--is-scrollable</code>) son reglas CSS. Carga <code>setting.css</code> primero y el átomo <code>Btn</code> para que los botones internos tengan estilo.</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>alineación a la izquierda por defecto</td></tr>
                <tr><td><code>--cnt</code></td><td>centrado</td></tr>
                <tr><td><code>--rgt</code></td><td>alineado a la derecha</td></tr>
                <tr><td><code>--lft</code></td><td>alineado a la izquierda (explícito)</td></tr>
                <tr><td><code>--is-scrollable</code></td><td>fila horizontal sin wrap, con scroll nativo del navegador; en móvil arranca a la izquierda y en desktop admite <code>--cnt</code>/<code>--rgt</code>/<code>--lft</code></td></tr>
                <tr><td><code>--is-fixed</code></td><td>fijo abajo (<code>position:fixed</code>) — ver <strong>Markup</strong></td></tr>
                <tr><td><code>--is-fixed-mo</code></td><td>fijo abajo solo en móvil — ver <strong>Markup</strong></td></tr>
            </tbody>
        </table>

        <h2>Variante scrollable</h2>
        <p>Usa <code>.ft-mol-btnGroup--is-scrollable</code> cuando el grupo actúa como una hilera de acciones o filtros que puede desbordar en horizontal. La variante es <strong>autosuficiente</strong>: no necesita helpers adicionales para activar el scroll.</p>
        <table class="cb-table">
            <thead><tr><th>Aspecto</th><th>Comportamiento</th></tr></thead>
            <tbody>
                <tr><td>Mobile</td><td>El grupo arranca alineado a la izquierda para priorizar la lectura del primer botón y permitir arrastre horizontal inmediato.</td></tr>
                <tr><td>Desktop (≥768px)</td><td>Si convive con <code>--cnt</code>, <code>--rgt</code> o <code>--lft</code>, esos modificadores vuelven a mandar sobre la alineación.</td></tr>
                <tr><td>Overflow</td><td>El propio componente resuelve <code>overflow-x: auto</code>, <code>nowrap</code> y <code>cursor: grab</code>; la barra es la nativa del navegador.</td></tr>
                <tr><td>Items</td><td>Cada <code>.ft-btn</code> se fija como item de ancho natural (<code>flex: 0 0 auto</code>) para evitar compresión de etiquetas.</td></tr>
            </tbody>
        </table>

        <pre class="cb-code"><code>&lt;div class="ft-mol-btnGroup ft-mol-btnGroup--is-scrollable"&gt;
  &lt;a href="#" class="ft-btn ft-btn--primary ft-btn--md"&gt;Filtro 1&lt;/a&gt;
  &lt;a href="#" class="ft-btn ft-btn--secondary ft-btn--md"&gt;Filtro 2&lt;/a&gt;
  &lt;a href="#" class="ft-btn ft-btn--tertiary ft-btn--md"&gt;Filtro 3&lt;/a&gt;
&lt;/div&gt;</code></pre>

        ${deprecationBlock({
            title: "Patron scrollable con helpers externos retirado",
            since: "2026-06-15",
            summary: "La composicion legacy que apoyaba <code>--is-scrollable</code> en wrappers o helpers adicionales deja de ser la referencia canonica del DS. El scroll horizontal ya pertenece al propio componente.",
            scope: "Implementaciones antiguas de <code>.ft-mol-btnGroup--is-scrollable</code> y snippets previos del showroom.",
            replacement: "Usar solo <code>.ft-mol-btnGroup ft-mol-btnGroup--is-scrollable</code> con sus <code>.ft-btn</code> directos.",
            note: "Los modificadores <code>--is-fixed</code> y <code>--is-fixed-mo</code> siguen vigentes; la retirada afecta solo al patron extra que envolvia el scroll."
        })}

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-btnGroup</code></td></tr>
                <tr><td>Contenido</td><td>uno o más <code>.ft-btn</code> (átomo Btn)</td></tr>
                <tr><td>Alineación</td><td><code>--cnt</code> · <code>--rgt</code> · <code>--lft</code></td></tr>
                <tr><td>Scrollable</td><td><code>--is-scrollable</code> autosuficiente: nowrap, overflow horizontal y cursor grab; respeta los modificadores de alineación desde <code>768px</code></td></tr>
                <tr><td>Fijo</td><td><code>--is-fixed</code> · <code>--is-fixed-mo</code></td></tr>
            </tbody>
        </table>

        <div class="cb-callout">La variante <code>--is-scrollable</code> ya no necesita helpers adicionales: encapsula el overflow horizontal con la menor lógica posible dentro del propio componente. En móvil prioriza el arranque a la izquierda para favorecer la lectura del primer botón; desde <code>768px</code> vuelven a mandar los modificadores de alineación del componente. Las variantes <code>--is-fixed</code> / <code>--is-fixed-mo</code> siguen siendo posicionales y se documentan en <strong>Markup</strong>.</div>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/btngroup/_btnGroup.scss</code> · markup: <code>fourty/__old-showroom/molecules/molecule-btnGroup.html</code></p>
    </div>`;

    const BG = {
        id: "btngroup",
        name: "Btn Group",
        group: "Molecules",
        overview,
        stories: [
            // full: el grupo ocupa todo el ancho → su alineación (--cnt/--rgt/--lft) es visible
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live },
            { id: "scrollable", name: "Scrollable", kind: "interactive", full: true, argTypes: scrollArgTypes, args: scrollArgs, render: liveScrollable }
        ]
    };
    window.SB.register(BG);

    /* Markup original (HTML plano editable por el front) en btngroup.html → subgrupo "Markup".
       full: true → las variantes de alineación se ven (justify-content necesita ancho). */
    window.SB.loadMarkup(BG, document.currentScript && document.currentScript.src, { full: true });
})();
