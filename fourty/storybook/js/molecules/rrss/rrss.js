/* ════════════════════════════════════════════════════════════════════════
   molecules/rrss/rrss.js — Molecules / RRSS
   Casuística REAL de scss/fourties/molecules/rrss/_rrss.scss (.ft-mol-rrss*).
   Markup tomado de fourty/molecules/molecule-rrss.html. Cero invención de API.

   Sistema de iconos de redes sociales / acciones de compartir. El icono base
   .ft-mol-rrss pinta su grafismo con un background-image (:before, vía map-icons del
   SCSS) → NECESITA SERVIDOR para que el SVG cargue. La red se elige con un modificador
   .ft-mol-rrss[Red]--[color] (Facebook, Twitter, WhatsApp…). El contenedor inline
   .ft-mol-rrss-inline alinea varios botones .ft-btn-rrss (compartir).

   Estructura: story "Base" (un icono, red seleccionable) + story "Inline" (barra de
   compartir con alineación) + subgrupo "Galleries" (todas las redes + variantes de color)
   + subgrupo "Markup" async desde rrss.html.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc, block } = window.SB.helpers;
    const each = (list, fn) => list.map(fn).join("");

    /* ▼ SINGLE SOURCE OF TRUTH — redes (.ft-mol-rrss[Red]--default) reales de _rrss.scss ▼ */
    const DATA = {
        // [token PascalCase del SCSS, etiqueta visible]
        networks: [
            ["Copy", "Copiar enlace"], ["Email", "Email"], ["Suscription", "Suscripción"],
            ["Facebook", "Facebook"], ["Instagram", "Instagram"], ["Telegram", "Telegram"],
            ["Tiktok", "TikTok"], ["Threads", "Threads"], ["Bluesky", "Bluesky"],
            ["Linkedin", "LinkedIn"], ["Pinterest", "Pinterest"], ["Snapchat", "Snapchat"],
            ["Twitter", "Twitter / X"], ["Whatsapp", "WhatsApp"], ["Youtube", "YouTube"],
            ["Bookmark", "Marcadores"], ["Share", "Compartir"]
        ],
        // variantes de color extra (clase completa, etiqueta, necesita fondo oscuro)
        colored: [
            ["ft-mol-rrssEmail--white", "Email · white", true],
            ["ft-mol-rrssSuscription--white", "Suscripción · white", true],
            ["ft-mol-rrssFacebook--blue", "Facebook · blue", false],
            ["ft-mol-rrssTwitter--blue", "Twitter · blue", false],
            ["ft-mol-rrssWhatsapp--green", "WhatsApp · green", false]
        ],
        // contenido de la barra inline (.ft-btn-rrss--[red])
        inline: [
            ["Twitter", "twitter", "Twitter"], ["Facebook", "facebook", "Facebook"],
            ["Whatsapp", "whatsapp", "WhatsApp"], ["Email", "email", "Email"]
        ],
        // .ft-mol-rrss-inline--[alineación]
        aligns: [
            ["", "izquierda (defecto)"],
            ["ft-mol-rrss-inline--center", "centro"],
            ["ft-mol-rrss-inline--right", "derecha"]
        ]
    };

    /* ─── BASE — un icono .ft-mol-rrss[Red]--default ─── */
    const baseArgTypes = [
        { key: "network", control: "select", desc: "Red social / acción (.ft-mol-rrss[Red]--default).",
          options: DATA.networks.map(n => [n[0], n[1]]) }
    ];
    const baseArgs = { network: "Facebook" };

    function liveBase(a) {
        const cls = ["ft-mol-rrss"];
        if (a.network) cls.push("ft-mol-rrss" + a.network + "--default");
        // Harness: caja clara con padding para que el icono (3rem) se vea centrado.
        return '<span style="display:inline-flex;padding:1rem;background:#fff;border:1px solid #eee;border-radius:.4rem">' +
            '<span class="' + cls.join(" ") + '" title="' + esc(a.network) + '"></span></span>';
    }

    /* ─── INLINE — barra de compartir .ft-mol-rrss-inline ─── */
    const inlineArgTypes = [
        { key: "align", control: "select", desc: "Alineación de la barra (.ft-mol-rrss-inline--center/--right).", options: DATA.aligns }
    ];
    const inlineArgs = { align: "" };

    const rrssBtn = ([token, mod, label]) =>
        '<a href="#" class="ft-btn-rrss ft-btn-rrss--' + mod + '" title="' + esc(label) + '" target="_blank" rel="nofollow">' +
            '<span class="ft-mol-rrss ft-mol-rrss' + token + '--default ft-btn-rrss__icon"></span>' +
            '<span class="ft-btn-rrss__text">' + esc(label) + "</span>" +
        "</a>";

    function liveInline(a) {
        const cls = ["ft-mol-rrss-inline"];
        if (a.align) cls.push(a.align);
        return '<div class="' + cls.join(" ") + '"><div class="ft-mol-rrss-inline__items">' + each(DATA.inline, rrssBtn) + "</div></div>";
    }

    /* ─── Galerías ─── */
    const chip = ([token, label]) =>
        '<span style="display:inline-flex;flex-direction:column;align-items:center;gap:.5rem;width:6.5rem;text-align:center">' +
            '<span class="ft-mol-rrss ft-mol-rrss' + token + '--default" title="' + esc(label) + '"></span>' +
            "<small>" + esc(label) + "</small></span>";

    const coloredChip = ([cls, label, dark]) => {
        const icon = '<span class="ft-mol-rrss ' + cls + '" title="' + esc(label) + '"></span>';
        const wrap = dark
            ? '<span style="display:inline-flex;padding:.5rem;background:#333;border-radius:.4rem">' + icon + "</span>"
            : icon;
        return '<span style="display:inline-flex;flex-direction:column;align-items:center;gap:.5rem;width:7.5rem;text-align:center">' +
            wrap + "<small>" + esc(label) + "</small></span>";
    };

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>RRSS</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-rrss</code>): sistema de iconos de redes sociales y acciones de compartir.</p>

        <div class="cb-callout"><strong>Necesita servidor.</strong> El grafismo del icono se pinta con un <code>background-image</code> en <code>:before</code> (SVG vía <code>map-icons</code> del SCSS). Sirve <code>/fourty/index-storybook.html</code> para que los iconos carguen.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/rrss.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>assets/img/icons/...</code> (rrss/system)</td><td>SVG de cada red (background)</td><td>Siempre (lo referencia el CSS)</td></tr>
                <tr><td><code>brands/[marca]/atoms/btn.css</code></td><td>CSS de <code>.ft-btn-rrss</code></td><td>Variante inline (barra de compartir)</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Redes / acciones</h2>
        <p>El icono base <code>.ft-mol-rrss</code> + un modificador de red <code>.ft-mol-rrss[Red]--[color]</code>:</p>
        <table class="cb-table">
            <thead><tr><th>Token</th><th>Clase</th></tr></thead>
            <tbody>
                ${DATA.networks.map(n => "<tr><td>" + esc(n[1]) + "</td><td><code>.ft-mol-rrss" + n[0] + "--default</code></td></tr>").join("")}
            </tbody>
        </table>
        <p>Variantes de color extra: <code>Email--white</code>, <code>Suscription--white</code>, <code>Facebook--blue</code>, <code>Twitter--blue</code>, <code>Whatsapp--green</code>.</p>

        <h2>Modificadores y contenedor</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-mol-rrss--txt</code></td><td>icono + texto en línea (no solo icono)</td></tr>
                <tr><td><code>.ft-mol-rrssSticky</code></td><td>columna de iconos fija (<code>position:sticky</code> ≥768px)</td></tr>
                <tr><td><code>.ft-mol-rrss-inline</code></td><td>barra horizontal de botones <code>.ft-btn-rrss</code></td></tr>
                <tr><td><code>.ft-mol-rrss-inline--center</code> / <code>--right</code></td><td>alineación de la barra inline</td></tr>
                <tr><td><code>.ft-mol-rrss-inline--quickbar</code></td><td>barra rápida (borde superior, iconos reducidos)</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Icono</td><td><code>.ft-mol-rrss</code> (+ red <code>...[Red]--[color]</code>)</td></tr>
                <tr><td>Contenedor inline</td><td><code>.ft-mol-rrss-inline</code> &gt; <code>.ft-mol-rrss-inline__items</code></td></tr>
                <tr><td>Botón de compartir</td><td><code>.ft-btn-rrss</code> &gt; <code>__icon</code> + <code>__text</code> (átomo Btn)</td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/rrss/_rrss.scss</code> · markup: <code>fourty/molecules/molecule-rrss.html</code></p>
    </div>`;

    const RRSS = {
        id: "rrss",
        name: "RRSS",
        group: "Molecules",
        overview,
        stories: [
            // icono suelto → inline (no full)
            { id: "base", name: "Base", kind: "interactive", argTypes: baseArgTypes, args: baseArgs, render: liveBase },
            // barra de compartir → full (la alineación necesita ancho)
            { id: "inline", name: "Inline", kind: "interactive", full: true, argTypes: inlineArgTypes, args: inlineArgs, render: liveInline }
        ],
        subgroups: [
            {
                id: "galleries", name: "Galleries", collapsed: true, stories: [
                    { id: "all-networks", name: "Redes", kind: "gallery", render: () =>
                        block("Redes · " + DATA.networks.length + " (.ft-mol-rrss[Red]--default)", each(DATA.networks, chip)) },
                    { id: "colors", name: "Variantes de color", kind: "gallery", render: () =>
                        block("Variantes de color (.ft-mol-rrss[Red]--white/--blue/--green)", each(DATA.colored, coloredChip)) }
                ]
            }
        ]
    };
    window.SB.register(RRSS);

    /* Markup original (HTML plano editable por el front) en rrss.html → subgrupo "Markup". */
    window.SB.loadMarkup(RRSS, document.currentScript && document.currentScript.src, { full: true });
})();
