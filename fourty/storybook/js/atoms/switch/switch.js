/* ════════════════════════════════════════════════════════════════════════
   atoms/switch/switch.js — Atoms / Switch
   Casuística REAL de scss/fourties/atoms/switch/_switch.scss (.ft-switch*).
   Markup tomado de fourty/atoms/atom-switch.html. Cero invención de API.

   ╔══════════════════════════════════════════════════════════════════════╗
   ║  DATA-DRIVEN: la casuística vive en el objeto DATA (SSOT).             ║
   ╚══════════════════════════════════════════════════════════════════════╝

   .ft-switch es un toggle (interruptor) sobre un <input type="checkbox"> real
   OCULTO seguido de un <label> con dos spans: __inner (el carril) y __switch
   (la perilla). Al marcar, el carril pasa a verde y la perilla se desliza.
   Modificadores: --darkmode (iconos sol/luna), --has-text (texto ON/OFF),
   --is-disabled (atenuado). OJO · orden: <input> ANTES del <label> (selector +)
   y label[for] casa con input[id].
   CONVENCIÓN: la pieza fundamental se llama siempre "Base".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { spec } = window.SB.helpers;

    /* ══════════════════════════════════════════════════════════════════════
       ▼▼▼  SINGLE SOURCE OF TRUTH — reflejan 1:1 _switch.scss  ▼▼▼
       ══════════════════════════════════════════════════════════════════════ */
    const DATA = {
        // [valor, etiqueta]. "" = base (icono ko/ok).
        variants: [
            ["", "Base (icono ok/ko)"],
            ["darkmode", "Darkmode (sol/luna)"],
            ["has-text", "Has-text (ON/OFF)"]
        ]
    };
    /* ▲▲▲  fin SINGLE SOURCE OF TRUTH  ▲▲▲ */

    /* ─── Constructor del markup ─── */
    let uid = 0;
    const sw = (variant, checked, disabled) => {
        const id = "sb-switch-" + (++uid);
        const root = ["ft-switch"];
        if (variant) root.push("ft-switch--" + variant);
        if (disabled) root.push("ft-switch--is-disabled");
        return `<div class="${root.join(" ")}">
            <input type="checkbox" id="${id}" class="ft-switch__checkbox"${checked ? " checked" : ""}${disabled ? " disabled" : ""}>
            <label for="${id}" class="ft-switch__label">
                <span class="ft-switch__inner"></span>
                <span class="ft-switch__switch"></span>
            </label>
        </div>`;
    };

    /* ══════════════════════════════════════════════════════════════════════
       BASE — .ft-switch. Cada eje = un operador en Controls.
       ══════════════════════════════════════════════════════════════════════ */
    const baseArgTypes = [
        { key: "variant", control: "select", desc: "Variante (.ft-switch--[variante]).", options: DATA.variants },
        { key: "checked", control: "boolean", desc: "Activado (atributo checked → carril verde, perilla a la derecha)." },
        { key: "disabled", control: "boolean", desc: "Deshabilitado (.ft-switch--is-disabled + atributo disabled)." }
    ];
    const baseArgs = { variant: "", checked: false, disabled: false };
    function liveBase(a) { return sw(a.variant, a.checked, a.disabled); }

    /* ══════════════════════════════════════════════════════════════════════
       GALERÍAS — variantes y estados
       ══════════════════════════════════════════════════════════════════════ */
    const galleryVariants = () =>
        DATA.variants.map(v => spec(v[1], sw(v[0], true, false))).join("");
    const galleryStates = () =>
        [spec("Off", sw("", false, false)), spec("On", sw("", true, false)), spec("Disabled", sw("", false, true))].join("");

    /* ══════════════════════════════════════════════════════════════════════
       OVERVIEW
       ══════════════════════════════════════════════════════════════════════ */
    const overview = `<div class="cb-docs__inner">
        <h1>Switch</h1>
        <p class="cb-docs__lead">Átomo de <strong>interruptor</strong> (<code>.ft-switch</code>): un <code>&lt;input type="checkbox"&gt;</code> oculto + un <code>&lt;label&gt;</code> con carril (<code>__inner</code>) y perilla (<code>__switch</code>). Al activar, el carril pasa a verde y la perilla se desliza.</p>

        <div class="cb-callout cb-callout--warn">El icono de la perilla (ok/ko) y los de <code>--darkmode</code> (sol/luna) son <code>background-image</code> con ruta absoluta <code>/cds-statics/…</code> → solo se ven servidos por un servidor. La variante <code>--has-text</code> (ON/OFF) usa <code>content</code> CSS y funciona siempre.</div>

        <div class="cb-callout cb-callout--warn">El orden importa: el <code>&lt;input&gt;</code> va <strong>antes</strong> del <code>&lt;label&gt;</code> (selector adyacente <code>+</code>) y <code>label[for]</code> debe casar con <code>input[id]</code>.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                    <tr><td><code>brands/[marca]/atoms/switch.css</code></td><td>CSS compilado del átomo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                    <tr><td><code>scss/fourties/atoms/switch/_switch.scss</code> + <code>switch-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar (importa <code>abstracts</code> + <code>vendors/bourbon</code>)</td></tr>
                    <tr><td>—</td><td>JavaScript</td><td>No necesita JS · toggle nativo del <code>&lt;input&gt;</code></td></tr>
                </tbody>
            </table>
        </div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>Carril gris → verde al activar · perilla con icono ok/ko</td></tr>
                <tr><td><code>--darkmode</code></td><td>Perilla con iconos sol/luna (modo claro/oscuro)</td></tr>
                <tr><td><code>--has-text</code></td><td>Muestra texto ON/OFF dentro del carril (ancho automático)</td></tr>
                <tr><td><code>--is-disabled</code></td><td>Atenuado (<code>opacity:.4</code> · <code>grayscale</code>) · cursor not-allowed</td></tr>
            </tbody>
        </table>

        <h2>Anatomía · BEM</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-switch</code></td></tr>
                <tr><td>Input (oculto)</td><td><code>.ft-switch__checkbox</code></td></tr>
                <tr><td>Label</td><td><code>.ft-switch__label</code></td></tr>
                <tr><td>Carril</td><td><code>.ft-switch__inner</code></td></tr>
                <tr><td>Perilla</td><td><code>.ft-switch__switch</code> (icono en <code>:after</code>)</td></tr>
            </tbody>
        </table>

        <h2>Accesibilidad</h2>
        <div class="cb-callout">Usa el <code>&lt;input type="checkbox"&gt;</code> nativo (oculto con <code>opacity:0</code>): conserva foco, teclado y semántica. El foco se resuelve con <code>:focus</code>/<code>:focus-visible</code> (halo azul / outline verde).</div>

        <p class="cb-src">Fuente: <code>scss/fourties/atoms/switch/_switch.scss</code> · markup: <code>fourty/atoms/atom-switch.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const SWITCH = {
        id: "switch",
        name: "Switch",
        group: "Atoms",
        overview,
        stories: [
            { id: "base", name: "Base", hint: ".ft-switch", kind: "interactive",
              argTypes: baseArgTypes, args: baseArgs, render: liveBase }
        ],
        subgroups: [
            { id: "galleries", name: "Galleries", collapsed: true,
              stories: [
                  { id: "variants", name: "Variantes", hint: "base · darkmode · has-text", kind: "gallery", render: galleryVariants },
                  { id: "states", name: "Estados", hint: "off · on · disabled", kind: "gallery", render: galleryStates }
              ]
            }
        ]
    };
    window.SB.register(SWITCH);
    window.SB.loadMarkup(SWITCH, document.currentScript && document.currentScript.src);
})();
