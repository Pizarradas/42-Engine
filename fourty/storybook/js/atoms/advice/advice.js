/* ════════════════════════════════════════════════════════════════════════
   atoms/advice/advice.js — Atoms / Advice
   Casuística REAL de scss/fourties/atoms/advice/_advice.scss (clases .ft-advice*).
   Markup tomado de fourty/atoms/atom-advice.html. Cero invención de API.

   ╔══════════════════════════════════════════════════════════════════════╗
   ║  DATA-DRIVEN: la casuística vive en el objeto DATA (SSOT). Añadir/     ║
   ║  quitar variante = editar el array, no el markup.                      ║
   ╚══════════════════════════════════════════════════════════════════════╝

   .ft-advice es una píldora/etiqueta de aviso (badge inline): fondo negro y texto
   blanco por defecto, con variantes de color (--primary · --secondary · --white)
   y de tamaño (--size-M · --size-L; base = S). Respeta el dark mode del DS.
   CONVENCIÓN: la pieza fundamental se llama siempre "Base".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc, spec } = window.SB.helpers;

    /* ══════════════════════════════════════════════════════════════════════
       ▼▼▼  SINGLE SOURCE OF TRUTH — reflejan 1:1 _advice.scss  ▼▼▼
       ══════════════════════════════════════════════════════════════════════ */
    const DATA = {
        // [valor de clase, etiqueta]. "" = base (fondo negro).
        colors: [["", "Base (negro)"], ["primary", "Primary"], ["secondary", "Secondary"], ["white", "White"]],
        // tamaños: "" = S (base). M y L añaden --size-[M|L].
        sizes: [["", "S (base)"], ["size-M", "M"], ["size-L", "L"]]
    };
    /* ▲▲▲  fin SINGLE SOURCE OF TRUTH  ▲▲▲ */

    const advice = (mods, text) =>
        `<span class="${["ft-advice"].concat(mods).join(" ")}">${esc(text)}</span>`;

    /* ══════════════════════════════════════════════════════════════════════
       BASE — .ft-advice. Cada eje = un operador en Controls.
       ══════════════════════════════════════════════════════════════════════ */
    const baseArgTypes = [
        { key: "color", control: "select", desc: "Color de fondo (.ft-advice--[color]). 'Base' = negro.",
          options: DATA.colors.map(c => [c[0], c[1]]) },
        { key: "size", control: "select", desc: "Tamaño tipográfico (.ft-advice--[size]). 'S' = base.",
          options: DATA.sizes.map(s => [s[0], s[1]]) },
        { key: "label", control: "text", desc: "Contenido textual del aviso (slot)." }
    ];
    const baseArgs = { color: "", size: "", label: "Texto" };
    function liveBase(a) {
        const mods = [];
        if (a.color) mods.push("ft-advice--" + a.color);
        if (a.size) mods.push("ft-advice--" + a.size);
        return advice(mods, a.label);
    }

    /* ══════════════════════════════════════════════════════════════════════
       GALERÍAS
       ══════════════════════════════════════════════════════════════════════ */
    const galleryColors = () =>
        DATA.colors.map(c => spec(c[1], advice(c[0] ? ["ft-advice--" + c[0]] : [], "Texto"))).join("");
    const gallerySizes = () =>
        DATA.sizes.map(s => spec(s[1], advice(s[0] ? ["ft-advice--" + s[0]] : [], "Texto"))).join("");

    /* ══════════════════════════════════════════════════════════════════════
       OVERVIEW
       ══════════════════════════════════════════════════════════════════════ */
    const overview = `<div class="cb-docs__inner">
        <h1>Advice</h1>
        <p class="cb-docs__lead">Átomo de aviso (<code>.ft-advice</code>): una píldora/etiqueta <strong>inline</strong> en negrita, fondo negro y texto blanco por defecto, con variantes de color y de tamaño. Útil para marcar estados o categorías cortas («Nuevo», «Directo», «Patrocinado»…).</p>

        <h2>Dependencias</h2>
        <p>Lo que necesita un proyecto consumidor para renderizar <code>.ft-advice</code>:</p>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                    <tr><td><code>brands/[marca]/atoms/advice.css</code></td><td>CSS compilado del átomo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                    <tr><td><code>scss/fourties/atoms/advice/_advice.scss</code> + <code>advice-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar (importa <code>abstracts</code> + <code>vendors/bourbon</code>)</td></tr>
                    <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
                </tbody>
            </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>. Cada marca matiza colores/forma en su <code>advice-[marca].scss</code>. El componente <strong>respeta el dark mode</strong> del DS: con <code>[data-theme="dark"]</code> el texto se fuerza a blanco (activa el switch <em>Oscuro</em> del toolbar para verlo).</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>Fondo negro · texto blanco · tamaño S</td></tr>
                <tr><td><code>--primary</code></td><td>Fondo <code>var(--color-primary)</code></td></tr>
                <tr><td><code>--secondary</code></td><td>Fondo <code>var(--color-subscription-septenary)</code></td></tr>
                <tr><td><code>--white</code></td><td>Fondo blanco · texto negro</td></tr>
                <tr><td><code>--size-M</code></td><td>Tipografía body-M</td></tr>
                <tr><td><code>--size-L</code></td><td>Tipografía body-L + más padding</td></tr>
            </tbody>
        </table>

        <h2>Anatomía · BEM</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-advice</code> (sobre <code>&lt;span&gt;</code>)</td></tr>
                <tr><td>Color</td><td><code>--primary</code> · <code>--secondary</code> · <code>--white</code></td></tr>
                <tr><td>Tamaño</td><td><code>--size-M</code> · <code>--size-L</code></td></tr>
            </tbody>
        </table>

        <h2>Accesibilidad</h2>
        <div class="cb-callout">Texto decorativo de estado: el contenido visible ya comunica el aviso. Si el aviso aporta información crítica que no está en el contexto, considera <code>aria-label</code> en el elemento contenedor.</div>

        <p class="cb-src">Fuente: <code>scss/fourties/atoms/advice/_advice.scss</code> · markup: <code>fourty/atoms/atom-advice.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const ADVICE = {
        id: "advice",
        name: "Advice",
        group: "Atoms",
        overview,
        stories: [
            { id: "base", name: "Base", hint: ".ft-advice", kind: "interactive",
              argTypes: baseArgTypes, args: baseArgs, render: liveBase }
        ],
        subgroups: [
            { id: "galleries", name: "Galleries", collapsed: true,
              stories: [
                  { id: "colors", name: "Colores", hint: "4 variantes", kind: "gallery", render: galleryColors },
                  { id: "sizes", name: "Tamaños", hint: "S · M · L", kind: "gallery", render: gallerySizes }
              ]
            }
        ]
    };
    window.SB.register(ADVICE);
    window.SB.loadMarkup(ADVICE, document.currentScript && document.currentScript.src);
})();
