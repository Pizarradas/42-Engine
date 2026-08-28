/* ════════════════════════════════════════════════════════════════════════
   atoms/radio/radio.js — Atoms / Radio
   Casuística REAL de scss/fourties/atoms/radio/_radio.scss (clases .ft-radio*).
   Markup tomado de fourty/atoms/atom-radio.html. Cero invención de API.

   ╔══════════════════════════════════════════════════════════════════════╗
   ║  DATA-DRIVEN: la casuística vive en el objeto DATA (SSOT).             ║
   ╚══════════════════════════════════════════════════════════════════════╝

   .ft-radio es un radio button custom: un <input type="radio"> real OCULTO
   (.ft-radio__input) inmediatamente seguido de un <label> visible
   (.ft-radio__label) que dibuja el círculo con :before. Sin modificadores --*:
   sus variantes son ESTADOS del input (checked, disabled) y el comportamiento
   on-dark (.ft-helper-bgColor-black). Mismo patrón que el átomo Check.
   OJO · el orden importa: <input> ANTES del <label> (selector + adyacente) y
   label[for] debe casar con input[id]; los radios de un grupo comparten name.
   CONVENCIÓN: la pieza fundamental se llama siempre "Base".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc, spec } = window.SB.helpers;

    /* ══════════════════════════════════════════════════════════════════════
       ▼▼▼  SINGLE SOURCE OF TRUTH — reflejan 1:1 _radio.scss  ▼▼▼
       No hay clases --modificador: los estados son atributos del <input>.
       ══════════════════════════════════════════════════════════════════════ */
    const DATA = {
        states: [
            ["base",             "Base",               {}],
            ["checked",          "Checked",            { checked: true }],
            ["disabled",         "Disabled",           { disabled: true }],
            ["checked-disabled", "Checked + Disabled", { checked: true, disabled: true }]
        ]
    };
    /* ▲▲▲  fin SINGLE SOURCE OF TRUTH  ▲▲▲ */

    /* ─── Constructor del markup ─── */
    // IDs únicos: el <label for> debe casar con el <input id>. Contador de módulo.
    let uid = 0;
    const radio = (a) => {
        const id = "sb-radio-" + (++uid);
        const attrs = ['type="radio"', 'name="' + (a.name || "sb-radio-group") + '"', 'class="ft-radio__input"', `id="${id}"`];
        if (a.checked) attrs.push("checked");
        if (a.disabled) attrs.push("disabled");
        const node = `<div class="ft-radio"><input ${attrs.join(" ")}><label for="${id}" class="ft-radio__label ft-helper-fontWeight-500">${esc(a.label || "")}</label></div>`;
        return a.onDark ? `<div class="ft-helper-bgColor-black" style="padding:1.5rem 2rem;border-radius:4px;">${node}</div>` : node;
    };

    /* ══════════════════════════════════════════════════════════════════════
       BASE — .ft-radio. Cada eje = un operador en Controls.
       ══════════════════════════════════════════════════════════════════════ */
    const baseArgTypes = [
        { key: "label", control: "text", desc: "Texto del radio (.ft-radio__label)." },
        { key: "checked", control: "boolean", desc: "Marcado (atributo checked → círculo relleno primary)." },
        { key: "disabled", control: "boolean", desc: "Deshabilitado (atributo disabled → gris, cursor not-allowed)." },
        { key: "onDark", control: "boolean", desc: "Sobre fondo oscuro (.ft-helper-bgColor-black): borde y relleno en blanco/negro." }
    ];
    const baseArgs = { label: "Opción A", checked: false, disabled: false, onDark: false };
    function liveBase(a) { return radio(a); }

    /* ══════════════════════════════════════════════════════════════════════
       GALERÍAS — los 4 estados (claro y oscuro)
       ══════════════════════════════════════════════════════════════════════ */
    const galleryStates = (onDark) =>
        DATA.states.map(s => spec(s[1], radio(Object.assign({ label: s[1], onDark }, s[2])))).join("");

    /* ══════════════════════════════════════════════════════════════════════
       OVERVIEW
       ══════════════════════════════════════════════════════════════════════ */
    const overview = `<div class="cb-docs__inner">
        <h1>Radio</h1>
        <p class="cb-docs__lead">Átomo de formulario (<code>.ft-radio</code>): un <strong>radio button custom</strong> que oculta el <code>&lt;input type="radio"&gt;</code> nativo y dibuja el círculo en el <code>&lt;label&gt;</code> con <code>:before</code>. Sin modificadores: sus variantes son los <strong>estados del input</strong>.</p>

        <div class="cb-callout cb-callout--warn">El orden del markup es obligatorio: el <code>&lt;input&gt;</code> va <strong>antes</strong> del <code>&lt;label&gt;</code> (selector adyacente <code>+</code>), y <code>label[for]</code> debe casar con <code>input[id]</code>. Los radios de un mismo grupo comparten <code>name</code>.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                    <tr><td><code>brands/[marca]/atoms/radio.css</code></td><td>CSS compilado del átomo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                    <tr><td><code>scss/fourties/atoms/radio/_radio.scss</code> + <code>radio-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar (importa <code>abstracts</code> + <code>vendors/bourbon</code>)</td></tr>
                    <tr><td>—</td><td>JavaScript</td><td>No necesita JS · el toggle es nativo del <code>&lt;input&gt;</code></td></tr>
                </tbody>
            </table>
        </div>
        <div class="cb-callout">El círculo es CSS puro (borde + fondo), funciona siempre (no depende de iconos servidos). Sobre fondo oscuro (<code>.ft-helper-bgColor-black</code>) el borde y el relleno se invierten a blanco/negro.</div>

        <h2>Estados</h2>
        <table class="cb-table">
            <thead><tr><th>Estado</th><th>Atributo</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>—</td><td>Círculo con borde <code>quaternary</code> · sin relleno</td></tr>
                <tr><td>Checked</td><td><code>checked</code></td><td>Borde grueso <code>var(--color-primary)</code> · centro blanco</td></tr>
                <tr><td>Disabled</td><td><code>disabled</code></td><td>Gris · <code>cursor:not-allowed</code></td></tr>
                <tr><td>Hover</td><td>—</td><td><code>box-shadow</code> en el círculo</td></tr>
                <tr><td>Focus</td><td><code>:focus-visible</code></td><td><code>focus--custom</code> accesible vía teclado</td></tr>
            </tbody>
        </table>

        <h2>Anatomía · BEM</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-radio</code></td></tr>
                <tr><td>Input (oculto)</td><td><code>.ft-radio__input</code> (<code>&lt;input type="radio"&gt;</code>)</td></tr>
                <tr><td>Label visible</td><td><code>.ft-radio__label</code></td></tr>
                <tr><td>Círculo</td><td><code>.ft-radio__label:before</code></td></tr>
            </tbody>
        </table>

        <h2>Accesibilidad</h2>
        <div class="cb-callout">Usa el <code>&lt;input type="radio"&gt;</code> nativo (oculto con <code>opacity:0</code>), conserva foco, teclado (flechas dentro del grupo) y semántica. El <code>&lt;label for&gt;</code> hace clicable el texto y el círculo; el foco se resuelve con <code>:focus-visible</code>.</div>

        <p class="cb-src">Fuente: <code>scss/fourties/atoms/radio/_radio.scss</code> · markup: <code>fourty/atoms/atom-radio.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const RADIO = {
        id: "radio",
        name: "Radio",
        group: "Atoms",
        overview,
        stories: [
            { id: "base", name: "Base", hint: ".ft-radio", kind: "interactive",
              argTypes: baseArgTypes, args: baseArgs, render: liveBase }
        ],
        subgroups: [
            { id: "galleries", name: "Galleries", collapsed: true,
              stories: [
                  { id: "states", name: "Estados", hint: "4 estados", kind: "gallery", render: () => galleryStates(false) },
                  { id: "states-dark", name: "Sobre fondo oscuro", hint: "behavior on-dark", kind: "gallery", render: () => galleryStates(true) }
              ]
            }
        ]
    };
    window.SB.register(RADIO);
    window.SB.loadMarkup(RADIO, document.currentScript && document.currentScript.src);
})();
