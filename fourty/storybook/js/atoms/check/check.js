/* ════════════════════════════════════════════════════════════════════════
   atoms/check/check.js — Atoms / Check
   Casuística REAL de scss/fourties/atoms/check/_check.scss (clases .ft-check*).
   Markup tomado de fourty/atoms/atom-check.html. Cero invención de API.

   ╔══════════════════════════════════════════════════════════════════════╗
   ║  DATA-DRIVEN: la casuística vive en el objeto DATA (SSOT). Añadir/     ║
   ║  quitar un estado = editar el array, no el markup.                     ║
   ╚══════════════════════════════════════════════════════════════════════╝

   .ft-check es un checkbox custom: un <input> real OCULTO (.ft-check__input)
   inmediatamente seguido de un <label> visible (.ft-check__label) que dibuja la
   caja con :before y el tick con :after. NO tiene modificadores --*: sus
   "variantes" son ESTADOS del input (checked, disabled) y el comportamiento
   on-dark (ancestro .ft-helper-bgColor-black). La marca sport pinta la caja
   marcada en negro en vez de primary (cambio de Brand en el toolbar).
   OJO · el orden importa: <input> ANTES del <label> (selector + adyacente) y
   label[for] debe casar con input[id].
   CONVENCIÓN: la pieza fundamental se llama siempre "Base".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc, spec } = window.SB.helpers;

    /* ══════════════════════════════════════════════════════════════════════
       ▼▼▼  SINGLE SOURCE OF TRUTH — reflejan 1:1 _check.scss  ▼▼▼
       No hay clases --modificador: los estados son atributos del <input>.
       [clave, etiqueta, {checked?, disabled?}]
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
    const check = (a) => {
        const id = "sb-check-" + (++uid);
        const attrs = ['type="checkbox"', 'class="ft-check__input"', `id="${id}"`];
        if (a.checked) attrs.push("checked");
        if (a.disabled) attrs.push("disabled");
        const node = `<div class="ft-check"><input ${attrs.join(" ")}><label for="${id}" class="ft-check__label ft-helper-fontWeight-500">${esc(a.label || "")}</label></div>`;
        return a.onDark ? `<div class="ft-helper-bgColor-black" style="padding:1.5rem 2rem;border-radius:4px;">${node}</div>` : node;
    };

    /* ══════════════════════════════════════════════════════════════════════
       BASE — .ft-check. Cada eje = un operador en Controls.
       ══════════════════════════════════════════════════════════════════════ */
    const baseArgTypes = [
        { key: "label", control: "text", desc: "Texto del checkbox (.ft-check__label)." },
        { key: "checked", control: "boolean", desc: "Marcado (atributo checked del input → caja primary + tick)." },
        { key: "disabled", control: "boolean", desc: "Deshabilitado (atributo disabled → caja gris, cursor not-allowed)." },
        { key: "onDark", control: "boolean", desc: "Sobre fondo oscuro (.ft-helper-bgColor-black): invierte el tick y usa blancos." }
    ];
    const baseArgs = { label: "Acepto los términos", checked: false, disabled: false, onDark: false };
    function liveBase(a) { return check(a); }

    /* ══════════════════════════════════════════════════════════════════════
       GALERÍAS — los 4 estados (claro y oscuro)
       ══════════════════════════════════════════════════════════════════════ */
    const galleryStates = (onDark) =>
        DATA.states.map(s =>
            spec(s[1], check(Object.assign({ label: s[1], onDark }, s[2])))
        ).join("");

    /* ══════════════════════════════════════════════════════════════════════
       OVERVIEW — documentación técnica (NO incrustar el componente vivo)
       ══════════════════════════════════════════════════════════════════════ */
    const overview = `<div class="cb-docs__inner">
        <h1>Check</h1>
        <p class="cb-docs__lead">Átomo de formulario (<code>.ft-check</code>): un <strong>checkbox custom</strong> que oculta el <code>&lt;input&gt;</code> nativo y dibuja la caja (<code>:before</code>) y el tick (<code>:after</code>) sobre el <code>&lt;label&gt;</code>. Sin modificadores: sus variantes son los <strong>estados del input</strong>.</p>

        <div class="cb-callout cb-callout--warn">El orden del markup es obligatorio: el <code>&lt;input&gt;</code> va <strong>antes</strong> del <code>&lt;label&gt;</code> (el SCSS usa el selector adyacente <code>+</code>), y <code>label[for]</code> debe casar con <code>input[id]</code>.</div>

        <h2>Dependencias</h2>
        <p>Lo que necesita un proyecto consumidor para renderizar <code>.ft-check</code>:</p>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                    <tr><td><code>brands/[marca]/atoms/check.css</code></td><td>CSS compilado del átomo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                    <tr><td><code>scss/fourties/atoms/check/_check.scss</code> + <code>check-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar (importa <code>abstracts</code> + <code>vendors/bourbon</code>)</td></tr>
                    <tr><td>—</td><td>JavaScript</td><td>No necesita JS · el toggle es nativo del <code>&lt;input&gt;</code></td></tr>
                </tbody>
            </table>
        </div>
        <div class="cb-callout cb-callout--warn">El <strong>tick</strong> (<code>:after</code>) es un <code>background-image</code> (<code>map-icons(alerts, brand--tick)</code>) con ruta absoluta <code>/cds-statics/…</code> → solo se ve servido por un servidor. La <strong>caja</strong> (<code>:before</code>) es CSS puro (borde + fondo), funciona siempre.</div>
        <div class="cb-callout">La marca <strong>sport</strong> pinta la caja marcada en <strong>negro</strong> en vez de <code>var(--color-primary)</code> (cambia el Brand en el toolbar para verlo). Sobre fondo oscuro (<code>.ft-helper-bgColor-black</code>) el tick se invierte y los colores pasan a blanco.</div>

        <h2>Estados</h2>
        <table class="cb-table">
            <thead><tr><th>Estado</th><th>Atributo</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>—</td><td>Caja con borde · sin tick</td></tr>
                <tr><td>Checked</td><td><code>checked</code></td><td>Caja <code>var(--color-primary)</code> + tick (negro en sport)</td></tr>
                <tr><td>Disabled</td><td><code>disabled</code></td><td>Caja gris · <code>cursor:not-allowed</code> · sin sombra al hover</td></tr>
                <tr><td>Hover</td><td>—</td><td><code>box-shadow</code> en la caja (solo si no está disabled)</td></tr>
                <tr><td>Focus</td><td><code>:focus-visible</code></td><td>Gestión de foco accesible vía teclado</td></tr>
            </tbody>
        </table>

        <h2>Anatomía · BEM</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-check</code></td></tr>
                <tr><td>Input (oculto)</td><td><code>.ft-check__input</code> (<code>&lt;input type="checkbox"&gt;</code>)</td></tr>
                <tr><td>Label visible</td><td><code>.ft-check__label</code></td></tr>
                <tr><td>Caja</td><td><code>.ft-check__label:before</code></td></tr>
                <tr><td>Tick</td><td><code>.ft-check__label:after</code></td></tr>
            </tbody>
        </table>

        <h2>Accesibilidad</h2>
        <div class="cb-callout">Usa el <code>&lt;input type="checkbox"&gt;</code> nativo (oculto con <code>opacity:0</code>, no <code>display:none</code>), por lo que conserva foco, teclado y semántica. El <code>&lt;label for&gt;</code> hace clicable el texto y la caja. El foco se resuelve con <code>:focus-visible</code> en el SCSS.</div>

        <p class="cb-src">Fuente: <code>scss/fourties/atoms/check/_check.scss</code> · markup: <code>fourty/atoms/atom-check.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const CHECK = {
        id: "check",
        name: "Check",
        group: "Atoms",
        overview,
        stories: [
            { id: "base", name: "Base", hint: ".ft-check", kind: "interactive",
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
    window.SB.register(CHECK);

    /* Markup HTML editable por el front (subgrupo "Markup") en check/check.html */
    window.SB.loadMarkup(CHECK, document.currentScript && document.currentScript.src);
})();
