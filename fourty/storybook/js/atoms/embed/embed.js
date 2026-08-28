/* ════════════════════════════════════════════════════════════════════════
   atoms/embed/embed.js — Atoms / Embed
   Casuística REAL de scss/fourties/atoms/embed/_embed.scss (clases .ft-embed*).
   Markup tomado de fourty/atoms/atom-embed.html. Cero invención de API.

   ╔══════════════════════════════════════════════════════════════════════╗
   ║  DATA-DRIVEN: la casuística vive en el objeto DATA (SSOT). Añadir/     ║
   ║  quitar red = editar el array, no el markup.                           ║
   ╚══════════════════════════════════════════════════════════════════════╝

   .ft-embed es el contenedor responsive de incrustados de terceros (iframes de
   YouTube, Twitter/X, TikTok, Instagram, Facebook, players…). El atributo
   `data-rrss-id` fija el aspect-ratio/altura del iframe por red; --ar-16-9 lo
   fuerza a 16/9. El átomo en sí es SOLO CSS; el embed real necesita el SDK/JS
   del proveedor. AQUÍ se usan iframes `srcdoc` autocontenidos (sin red) para
   mostrar el dimensionado real que aplica el CSS, sin depender de terceros.
   CONVENCIÓN: la pieza fundamental se llama siempre "Base".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc, spec } = window.SB.helpers;

    /* ══════════════════════════════════════════════════════════════════════
       ▼▼▼  SINGLE SOURCE OF TRUTH — reflejan 1:1 _embed.scss  ▼▼▼
       data-rrss-id con regla CSS propia. "" = genérico (iframe min-height 315px).
       [valor, etiqueta, aspect-ratio documentado]
       ══════════════════════════════════════════════════════════════════════ */
    const DATA = {
        networks: [
            ["",          "Genérico",    "min-height 315/365px"],
            ["youtube",   "YouTube",     "16 / 9"],
            ["twitter",   "Twitter / X", "1 / 1.025 · min 700px"],
            ["tiktok",    "TikTok",      "9 / 16"],
            ["instagram", "Instagram",   "4 / 5.5"],
            ["facebook",  "Facebook",    "9 / 16"]
        ]
    };
    /* ▲▲▲  fin SINGLE SOURCE OF TRUTH  ▲▲▲ */

    /* ─── Constructor del markup ─── */
    // Placeholder autocontenido: el aspect-ratio lo aplica el CSS de .ft-embed
    // al elemento <iframe> (no a un div), por eso se usa un iframe real con srcdoc.
    const poster = label => esc(
        `<!doctype html><meta charset="utf-8"><body style="margin:0;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;font:600 13px/1.35 system-ui,sans-serif;color:#fff;background:#1f1f1f;text-align:center;padding:10px;box-sizing:border-box;"><span style="font-size:26px;line-height:1;">▶</span>${label}</body>`
    ).replace(/"/g, "&quot;");

    // Harness: los incrustados se ACOTAN a un ancho de media realista (~480px) para no
    // llenar el canvas; el aspect-ratio del SCSS hace el resto sobre el <iframe>.
    const embedEl = (netKey, ar169) => {
        const cls = ["ft-embed"];
        if (ar169) cls.push("ft-embed--ar-16-9");
        const attr = netKey ? ` data-rrss-id="${netKey}"` : "";
        const net = DATA.networks.find(n => n[0] === netKey) || DATA.networks[0];
        const label = `${net[1]} · ${ar169 ? "16 / 9" : net[2]}`;
        const node = `<div class="${cls.join(" ")}"${attr}><div class="ft-embed__item"><iframe title="${esc(label)}" srcdoc="${poster(label)}" style="border:0;background:#1f1f1f;"></iframe></div></div>`;
        return `<div style="max-width:480px;width:100%;">${node}</div>`;
    };

    /* ══════════════════════════════════════════════════════════════════════
       BASE — .ft-embed. Cada eje = un operador en Controls.
       ══════════════════════════════════════════════════════════════════════ */
    const baseArgTypes = [
        { key: "network", control: "select", desc: "Red (atributo data-rrss-id). Fija el aspect-ratio del iframe.",
          options: DATA.networks.map(n => [n[0], n[1]]) },
        { key: "ar169", control: "boolean", desc: "Fuerza 16/9 (.ft-embed--ar-16-9), por encima del de la red." }
    ];
    const baseArgs = { network: "youtube", ar169: false };
    function liveBase(a) { return embedEl(a.network, a.ar169); }

    /* ══════════════════════════════════════════════════════════════════════
       GALERÍA — todas las redes + 16/9
       ══════════════════════════════════════════════════════════════════════ */
    const galleryNetworks = () =>
        DATA.networks.map(n => spec(`${n[1]} · ${n[2]}`, embedEl(n[0], false)))
            .concat([spec("--ar-16-9 (forzado)", embedEl("", true))])
            .join("");

    /* ══════════════════════════════════════════════════════════════════════
       OVERVIEW
       ══════════════════════════════════════════════════════════════════════ */
    const overview = `<div class="cb-docs__inner">
        <h1>Embed</h1>
        <p class="cb-docs__lead">Átomo contenedor (<code>.ft-embed</code>) para <strong>incrustados de terceros</strong> (iframes de redes y players). El atributo <code>data-rrss-id</code> ajusta el <strong>aspect-ratio/altura</strong> del iframe a cada plataforma; <code>--ar-16-9</code> lo fuerza a 16/9.</p>

        <div class="cb-callout cb-callout--warn">El átomo es <strong>solo CSS</strong>, pero el incrustado real necesita el <strong>SDK/JS del proveedor</strong> (YouTube iframe API, <code>widgets.js</code> de Twitter, <code>embed.js</code> de Instagram/TikTok, Facebook SDK…). En este storybook los previews usan <code>&lt;iframe srcdoc&gt;</code> autocontenidos para mostrar el dimensionado sin depender de la red.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                    <tr><td><code>brands/[marca]/atoms/embed.css</code></td><td>CSS compilado del átomo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                    <tr><td><code>scss/fourties/atoms/embed/_embed.scss</code> + <code>embed-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar (importa <code>abstracts</code> + <code>vendors/bourbon</code>)</td></tr>
                    <tr><td>SDK del proveedor</td><td>JavaScript de terceros</td><td>Solo para el embed real (no lo aporta el DS)</td></tr>
                </tbody>
            </table>
        </div>

        <h2>Aspect-ratio por red · <code>data-rrss-id</code></h2>
        <table class="cb-table">
            <thead><tr><th>data-rrss-id</th><th>Red</th><th>Iframe</th></tr></thead>
            <tbody>
                ${DATA.networks.map(n => `<tr><td><code>${n[0] || "(sin atributo)"}</code></td><td>${n[1]}</td><td>${n[2]}</td></tr>`).join("")}
                <tr><td><code>.ft-embed--ar-16-9</code></td><td>Cualquiera</td><td>16 / 9 forzado</td></tr>
            </tbody>
        </table>

        <h2>Anatomía · BEM</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-embed</code> (+ <code>[data-rrss-id]</code>)</td></tr>
                <tr><td>Contenedor</td><td><code>.ft-embed__item</code> (width 100% · aloja el iframe)</td></tr>
                <tr><td>Icono play (poster vídeo)</td><td><code>.ft-embed__icon</code> → <code>.ft-embed__icon-details</code> (círculo)</td></tr>
                <tr><td>Modificador</td><td><code>--ar-16-9</code></td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/fourties/atoms/embed/_embed.scss</code> · markup: <code>fourty/atoms/atom-embed.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const EMBED = {
        id: "embed",
        name: "Embed",
        group: "Atoms",
        overview,
        stories: [
            { id: "base", name: "Base", hint: ".ft-embed", kind: "interactive",
              argTypes: baseArgTypes, args: baseArgs, render: liveBase }
        ],
        subgroups: [
            { id: "galleries", name: "Galleries", collapsed: true,
              stories: [
                  { id: "networks", name: "Por red", hint: "aspect-ratio por data-rrss-id", kind: "gallery", render: galleryNetworks }
              ]
            }
        ]
    };
    window.SB.register(EMBED);
    window.SB.loadMarkup(EMBED, document.currentScript && document.currentScript.src);
})();
