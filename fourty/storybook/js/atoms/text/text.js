/* ════════════════════════════════════════════════════════════════════════
   atoms/text/text.js — Atoms / Text
   Casuística REAL de scss/fourties/atoms/text/_text.scss (.ft-text*).
   Markup tomado de fourty/atoms/atom-text.html. Cero invención de API.

   ╔══════════════════════════════════════════════════════════════════════╗
   ║  DATA-DRIVEN: la casuística vive en el objeto DATA (SSOT). Añadir/     ║
   ║  quitar variante = editar el array, no el markup.                      ║
   ╚══════════════════════════════════════════════════════════════════════╝

   .ft-text es el párrafo de cuerpo del DS, con modificadores tipográficos
   (--linethrough, --indent, --justify, --dropcap), un destacado inline
   (__mark, --grey, [data-tooltip]) y la familia de avisos .ft-text-alert
   (--is-error/info/ok/warning/guided, +--is-bordered, __subtext). Las familias
   compuestas --assistant y --info se DOCUMENTAN en el overview.
   CONVENCIÓN: la pieza fundamental se llama siempre "Base".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc, spec } = window.SB.helpers;

    const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum velit, nec hendrerit neque. Nulla sed sapien at tortor faucibus tincidunt. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.";

    /* ══════════════════════════════════════════════════════════════════════
       ▼▼▼  SINGLE SOURCE OF TRUTH — reflejan 1:1 _text.scss  ▼▼▼
       ══════════════════════════════════════════════════════════════════════ */
    const DATA = {
        variants: [
            ["", "Base"],
            ["linethrough", "Linethrough"],
            ["indent", "Indent"],
            ["justify", "Justify"],
            ["dropcap", "Dropcap"]
        ],
        alerts: [
            ["error", "Error"],
            ["info", "Info"],
            ["ok", "Ok"],
            ["warning", "Warning"],
            ["guided", "Guided"]
        ]
    };
    /* ▲▲▲  fin SINGLE SOURCE OF TRUTH  ▲▲▲ */

    /* ─── Constructores de markup ─── */
    const para = (mod, text) =>
        `<p class="${["ft-text"].concat(mod ? ["ft-text--" + mod] : []).join(" ")}">${esc(text)}</p>`;

    const markPara = (grey, tooltip) => {
        const cls = ["ft-text__mark"];
        if (grey) cls.push("ft-text__mark--grey");
        const attr = tooltip ? ` data-tooltip="${esc(tooltip)}" tabindex="0"` : "";
        return `<p class="ft-text">Texto con un <mark class="${cls.join(" ")}"${attr}>fragmento destacado</mark> dentro del párrafo de cuerpo.</p>`;
    };

    const alert = (type, bordered, text, subtext) => {
        const cls = ["ft-text-alert", "ft-text-alert--is-" + type];
        if (bordered) cls.push("ft-text-alert--is-bordered");
        const sub = subtext ? `<span class="ft-text-alert__subtext ft-helper-fontSize-body-M ft-helper-fontWeight-500">${esc(subtext)}</span>` : "";
        return `<span class="${cls.join(" ")}">${esc(text)}${sub}</span>`;
    };

    /* ══════════════════════════════════════════════════════════════════════
       BASE — .ft-text (párrafo + modificador tipográfico)
       ══════════════════════════════════════════════════════════════════════ */
    const baseArgTypes = [
        { key: "variant", control: "select", desc: "Modificador tipográfico (.ft-text--[variante]).", options: DATA.variants },
        { key: "text", control: "text", desc: "Contenido del párrafo." }
    ];
    const baseArgs = { variant: "", text: LOREM };
    function liveBase(a) { return para(a.variant, a.text); }

    /* ══════════════════════════════════════════════════════════════════════
       MARK — .ft-text__mark (destacado inline)
       ══════════════════════════════════════════════════════════════════════ */
    const markArgTypes = [
        { key: "grey", control: "boolean", desc: "Fondo gris (.ft-text__mark--grey)." },
        { key: "tooltip", control: "text", desc: "Tooltip al pasar/enfocar (atributo data-tooltip). Vacío = sin tooltip." }
    ];
    const markArgs = { grey: true, tooltip: "Aclaración del término" };
    function liveMark(a) { return markPara(a.grey, a.tooltip); }

    /* ══════════════════════════════════════════════════════════════════════
       ALERT — .ft-text-alert (aviso)
       ══════════════════════════════════════════════════════════════════════ */
    const alertArgTypes = [
        { key: "type", control: "select", desc: "Tipo de aviso (.ft-text-alert--is-[tipo]).", options: DATA.alerts },
        { key: "bordered", control: "boolean", desc: "Con borde y caja (.ft-text-alert--is-bordered)." },
        { key: "text", control: "text", desc: "Mensaje principal." },
        { key: "subtext", control: "text", desc: "Texto secundario (.ft-text-alert__subtext). Vacío = sin subtexto." }
    ];
    const alertArgs = { type: "info", bordered: true, text: "Mensaje informativo", subtext: "Detalle complementario del aviso." };
    function liveAlert(a) { return alert(a.type, a.bordered, a.text, a.subtext); }

    const family = (id, name, hint, argTypes, args, render) => ({ id, name, hint, kind: "interactive", full: true, argTypes, args, render });

    /* ══════════════════════════════════════════════════════════════════════
       GALERÍAS
       ══════════════════════════════════════════════════════════════════════ */
    const galleryVariants = () =>
        DATA.variants.map(v => spec(v[1], para(v[0], "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum velit, nec hendrerit neque."))).join("");
    const galleryAlerts = () =>
        DATA.alerts.map(a => spec(a[1], alert(a[0], true, a[1], "Detalle del aviso."))).join("");

    /* ══════════════════════════════════════════════════════════════════════
       OVERVIEW
       ══════════════════════════════════════════════════════════════════════ */
    const overview = `<div class="cb-docs__inner">
        <h1>Text</h1>
        <p class="cb-docs__lead">Átomo de <strong>texto de cuerpo</strong> (<code>.ft-text</code>): párrafo con modificadores tipográficos, un destacado inline (<code>__mark</code>) y la familia de <strong>avisos</strong> <code>.ft-text-alert</code>.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                    <tr><td><code>brands/[marca]/atoms/text.css</code></td><td>CSS compilado del átomo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                    <tr><td><code>scss/fourties/atoms/text/_text.scss</code> + <code>text-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar (importa <code>abstracts</code> + <code>vendors/bourbon</code>)</td></tr>
                    <tr><td>—</td><td>JavaScript</td><td>No necesita JS (el tooltip de <code>__mark</code> es CSS por <code>data-tooltip</code>)</td></tr>
                </tbody>
            </table>
        </div>
        <div class="cb-callout cb-callout--warn">Los iconos de <code>.ft-text-alert--is-[error|info|ok|warning]</code> son <code>background-image</code> con ruta absoluta <code>/cds-statics/…</code> → solo se ven servidos por un servidor. El borde de <code>--is-bordered</code>, el destacado <code>__mark</code> y su tooltip (SVG <code>data:</code> inline) funcionan siempre.</div>

        <h2>Modificadores de párrafo</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>Cuerpo XXL · márgenes verticales</td></tr>
                <tr><td><code>--linethrough</code></td><td>Tachado</td></tr>
                <tr><td><code>--indent</code></td><td>Sangría de primera línea (revistas: capitular)</td></tr>
                <tr><td><code>--justify</code></td><td>Texto justificado</td></tr>
                <tr><td><code>--dropcap</code></td><td>Letra capital en la primera letra</td></tr>
            </tbody>
        </table>

        <h2>Destacado · <code>__mark</code></h2>
        <table class="cb-table">
            <thead><tr><th>Clase / attr</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-text__mark</code></td><td>Resalte inline con <code>backdrop-filter</code></td></tr>
                <tr><td><code>--grey</code></td><td>Fondo gris</td></tr>
                <tr><td><code>[data-tooltip]</code></td><td>Tooltip (icono info + caja) al hover/focus</td></tr>
            </tbody>
        </table>

        <h2>Avisos · <code>.ft-text-alert</code></h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>--is-error</code> · <code>--is-info</code> · <code>--is-ok</code> · <code>--is-warning</code></td><td>Icono + color funcional</td></tr>
                <tr><td><code>--is-bordered</code></td><td>Caja con borde del color del tipo</td></tr>
                <tr><td><code>--is-guided</code></td><td>Caja centrada (paywall) con borde warning</td></tr>
                <tr><td><code>__subtext</code></td><td>Texto secundario en bloque</td></tr>
            </tbody>
        </table>

        <h2>Familias compuestas (ver showroom)</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Uso</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-text--assistant</code></td><td>Nota de asistente IA con icono (SVG <code>data:</code> inline)</td></tr>
                <tr><td><code>.ft-text--info</code></td><td>Bloque info con <code>__icon</code> · <code>__content</code> · <code>__title</code> · <code>__subtitle</code></td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/fourties/atoms/text/_text.scss</code> · markup: <code>fourty/atoms/atom-text.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const TEXT = {
        id: "text",
        name: "Text",
        group: "Atoms",
        overview,
        stories: [
            { id: "base", name: "Base", hint: ".ft-text", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: liveBase },
            family("mark", "Mark", ".ft-text__mark", markArgTypes, markArgs, liveMark),
            family("alert", "Alert", ".ft-text-alert", alertArgTypes, alertArgs, liveAlert)
        ],
        subgroups: [
            { id: "galleries", name: "Galleries", collapsed: true,
              stories: [
                  { id: "variants", name: "Modificadores", hint: "5 variantes", kind: "gallery", full: true, render: galleryVariants },
                  { id: "alerts", name: "Avisos", hint: "5 tipos", kind: "gallery", full: true, render: galleryAlerts }
              ]
            }
        ]
    };
    window.SB.register(TEXT);
    window.SB.loadMarkup(TEXT, document.currentScript && document.currentScript.src, { full: true });
})();
