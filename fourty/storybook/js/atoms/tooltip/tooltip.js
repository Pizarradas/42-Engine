/* ════════════════════════════════════════════════════════════════════════
   atoms/tooltip/tooltip.js — Atoms / Tooltip
   Casuística REAL de scss/fourties/atoms/tooltip/_tooltip.scss (.ft-tooltip*).
   Markup tomado de fourty/atoms/atom-tooltip.html. Cero invención de API.

   ╔══════════════════════════════════════════════════════════════════════╗
   ║  DATA-DRIVEN: la casuística vive en el objeto DATA (SSOT).            ║
   ╚══════════════════════════════════════════════════════════════════════╝

   .ft-tooltip cubre dos mecanismos, ambos SIN JS:
   1) Tooltip de HOVER: un elemento [data-tooltip] con clase de dirección
      (--top/--bottom/--left/--right, +--offsetLeft/Right, --mobile), envuelto
      en .ft-tooltip; el texto sale de data-tooltip. Modo --dark en el envoltorio.
   2) Popover por CHECKBOX (--advice): __checkbox + __trigger + __content
      (__close, __title, __txt, __action); se abre marcando el checkbox (label).
   La variante --sticky y el AMP (.ft-tooltip-amp) se DOCUMENTAN en el overview.
   CONVENCIÓN: la pieza fundamental se llama siempre "Base".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc, spec, changeBlock } = window.SB.helpers;

    /* ══════════════════════════════════════════════════════════════════════
       ▼▼▼  SINGLE SOURCE OF TRUTH — reflejan 1:1 _tooltip.scss  ▼▼▼
       ══════════════════════════════════════════════════════════════════════ */
    const DATA = {
        directions: [["top", "Top"], ["bottom", "Bottom"], ["left", "Left"], ["right", "Right"]]
    };
    /* ▲▲▲  fin SINGLE SOURCE OF TRUTH  ▲▲▲ */

    /* ─── Constructores de markup ─── */
    const hover = (dir, dark, text, tip) => {
        const wrap = ["ft-tooltip"];
        if (dark) wrap.push("ft-tooltip--dark");
        return `<span class="${wrap.join(" ")}"><span class="ft-tooltip--${dir}" data-tooltip="${esc(tip)}" tabindex="0">${esc(text)}</span></span>`;
    };

    let uid = 0;
    const popover = (dir, dark, open, title, txt) => {
        const id = "sb-tt-" + (++uid);
        const wrap = ["ft-tooltip", "ft-tooltip--advice"];
        if (dark) wrap.push("ft-tooltip--dark");
        return `<div class="${wrap.join(" ")}"><div class="ft-tooltip--${dir}">
            <input type="checkbox" id="${id}" class="ft-tooltip__checkbox"${open ? " checked" : ""} />
            <a class="ft-tooltip__trigger" aria-describedby="${id}-c">Trigger del aviso</a>
            <div id="${id}-c" class="ft-tooltip__content" role="tooltip">
                <label class="ft-tooltip__close" for="${id}" tabindex="0"><span class="ft-tooltip__closeText">Cerrar</span></label>
                <h3 class="ft-tooltip__title">${esc(title)}</h3>
                <p class="ft-tooltip__txt">${esc(txt)}</p>
            </div>
        </div></div>`;
    };

    const pad = (html) =>
        `<p style="margin:0 0 16px;font:400 11.5px/1.45 'Inter',sans-serif;color:#6b6b6b;">Pasa el cursor (o enfoca con Tab) sobre el disparador para ver el tooltip.</p><div style="padding:4rem 6rem;">${html}</div>`;

    /* ══════════════════════════════════════════════════════════════════════
       BASE — tooltip de hover ([data-tooltip])
       ══════════════════════════════════════════════════════════════════════ */
    const baseArgTypes = [
        { key: "direction", control: "select", desc: "Dirección del tooltip (.ft-tooltip--[dir]).", options: DATA.directions },
        { key: "dark", control: "boolean", desc: "Modo oscuro (.ft-tooltip--dark en el envoltorio)." },
        { key: "text", control: "text", desc: "Texto del disparador." },
        { key: "tip", control: "text", desc: "Contenido del tooltip (atributo data-tooltip)." }
    ];
    const baseArgs = { direction: "top", dark: false, text: "Pasa el cursor", tip: "Texto del tooltip" };
    function liveBase(a) { return pad(hover(a.direction, a.dark, a.text, a.tip)); }

    /* ══════════════════════════════════════════════════════════════════════
       POPOVER — .ft-tooltip--advice (checkbox, sin JS)
       ══════════════════════════════════════════════════════════════════════ */
    const popArgTypes = [
        { key: "direction", control: "select", desc: "Dirección del contenido.", options: DATA.directions },
        { key: "open", control: "boolean", desc: "Abierto (checkbox marcado). También se abre clicando el trigger." },
        { key: "dark", control: "boolean", desc: "Modo oscuro (.ft-tooltip--dark)." },
        { key: "title", control: "text", desc: "Título (.ft-tooltip__title)." },
        { key: "txt", control: "text", desc: "Texto (.ft-tooltip__txt)." }
    ];
    const popArgs = { direction: "top", open: true, dark: false, title: "¿Sabías que…?", txt: "Aviso contextual que se ancla a un disparador." };
    function livePop(a) { return pad(popover(a.direction, a.dark, a.open, a.title, a.txt)); }

    const family = (id, name, hint, argTypes, args, render) => ({ id, name, hint, kind: "interactive", full: true, argTypes, args, render });

    /* ══════════════════════════════════════════════════════════════════════
       GALERÍA — direcciones
       ══════════════════════════════════════════════════════════════════════ */
    const galleryDirections = () =>
        DATA.directions.map(d => spec(d[1], `<div style="padding:3rem 5rem;">${hover(d[0], false, d[1], "Tooltip " + d[1])}</div>`)).join("");

    /* ══════════════════════════════════════════════════════════════════════
       OVERVIEW
       ══════════════════════════════════════════════════════════════════════ */
    const overview = `<div class="cb-docs__inner">
        <h1>Tooltip</h1>
        <p class="cb-docs__lead">Átomo de <strong>tooltip / popover</strong> (<code>.ft-tooltip</code>), <strong>sin JS</strong>: un tooltip de <em>hover</em> sobre <code>[data-tooltip]</code> con dirección, y un popover por <em>checkbox</em> (<code>--advice</code>) con título, texto y cierre.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                    <tr><td><code>brands/[marca]/atoms/tooltip.css</code></td><td>CSS compilado del átomo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                    <tr><td><code>scss/fourties/atoms/tooltip/_tooltip.scss</code> + <code>tooltip-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar (importa <code>abstracts</code> + <code>vendors/bourbon</code>)</td></tr>
                    <tr><td>—</td><td>JavaScript</td><td>No necesita JS (hover CSS · popover por checkbox)</td></tr>
                </tbody>
            </table>
        </div>
        <div class="cb-callout cb-callout--warn">El icono de <code>.ft-tooltip__close</code> es <code>background-image</code> con ruta absoluta <code>/cds-statics/…</code> → solo se ve servido por un servidor. El resto (cuerpo, pico, texto) es CSS y funciona siempre.</div>

        <h2>Tooltip de hover · <code>[data-tooltip]</code></h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>--top</code> · <code>--bottom</code> · <code>--left</code> · <code>--right</code></td><td>Dirección del cuerpo + pico</td></tr>
                <tr><td><code>--offsetLeft</code> · <code>--offsetRight</code></td><td>Desplaza el cuerpo a un lateral (con --top/--bottom)</td></tr>
                <tr><td><code>--mobile</code></td><td>En &lt;1024px fija el tooltip centrado en pantalla</td></tr>
                <tr><td><code>--dark</code></td><td>Fondo negro / texto blanco (en el envoltorio)</td></tr>
            </tbody>
        </table>

        <h2>Popover · <code>--advice</code> (checkbox)</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Checkbox (estado)</td><td><code>.ft-tooltip__checkbox</code></td></tr>
                <tr><td>Disparador</td><td><code>.ft-tooltip__trigger</code></td></tr>
                <tr><td>Contenido</td><td><code>.ft-tooltip__content</code></td></tr>
                <tr><td>Cierre</td><td><code>.ft-tooltip__close</code> (label que desmarca)</td></tr>
                <tr><td>Título / texto</td><td><code>.ft-tooltip__title</code> · <code>.ft-tooltip__txt</code></td></tr>
                <tr><td>Acción</td><td><code>.ft-tooltip__action</code> (botón/enlace)</td></tr>
            </tbody>
        </table>

        <h2>Registro de cambios</h2>
        ${changeBlock({
            type: "accessibility",
            date: "2026-08-11",
            title: "Área de cierre y foco",
            summary: '<code>.ft-tooltip__close</code> mantiene la X de <code>1.1rem</code> y amplía de forma transparente su superficie pulsable hasta un mínimo de <strong>44 × 44 px</strong>. En desktop muestra un halo con <code>:focus-visible</code>.',
            scope: 'Cierre del popover <code>--advice</code>, en todas las marcas.',
            impact: 'El markup del <code>&lt;label&gt;</code> debe incluir <code>tabindex="0"</code> para entrar en el recorrido de <kbd>Tab</kbd>. Sin lógica JavaScript nueva.',
            files: [
                "scss/fourties/atoms/tooltip/_tooltip.scss",
                "fourty/storybook/js/atoms/tooltip/tooltip.js",
                "fourty/storybook/js/atoms/tooltip/tooltip.html",
                "fourty/storybook/js/molecules/tapbar/tapbar.js"
            ]
        })}

        <div class="cb-callout">Variantes adicionales documentadas en el showroom: <code>--sticky</code> (etiqueta lateral fija) y el AMP <code>.ft-tooltip-amp</code> (<code>data-tooltip-position</code>).</div>

        <p class="cb-src">Fuente: <code>scss/fourties/atoms/tooltip/_tooltip.scss</code> · markup: <code>fourty/atoms/atom-tooltip.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const TOOLTIP = {
        id: "tooltip",
        name: "Tooltip",
        group: "Atoms",
        overview,
        stories: [
            { id: "base", name: "Base", hint: "[data-tooltip]", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: liveBase },
            family("popover", "Popover", ".ft-tooltip--advice", popArgTypes, popArgs, livePop)
        ],
        subgroups: [
            { id: "galleries", name: "Galleries", collapsed: true,
              stories: [
                  { id: "directions", name: "Direcciones", hint: "4 direcciones", kind: "gallery", full: true, render: galleryDirections }
              ]
            }
        ]
    };
    window.SB.register(TOOLTIP);
    window.SB.loadMarkup(TOOLTIP, document.currentScript && document.currentScript.src, { full: true });
})();
