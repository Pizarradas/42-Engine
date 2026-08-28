/* ════════════════════════════════════════════════════════════════════════
   helpers/scroll/scroll.js — Helpers / Scroll
   Casuística REAL de scss/base/helpers/_scrolls.scss (.ft-helper-scroll*).
   Una clase principal + modificadores de ancho de items y tamaño de scrollbar.

   Clase principal:
     · .ft-helper-scroll  → display:flex · overflow-x:scroll · cursor:grab
                            + scrollbar custom (24px alto, transparente,
                            border-clip de 10-11px que crea el look minimal)

   Modificadores:
     · --small             → scrollbar más delgado (5px alto, borders 1-2px)
     · --100               → cada hijo ocupa min-width: 100% (snap full-screen)
     · --100-mobileonly    → 100% solo en móvil, libre en ≥768px
     · --50                → cada hijo min-width: 50%
     · --25                → cada hijo min-width: 25%
     · -stop               → overflow:hidden + height:100% (frenar el scroll)

   Behaviors integrados:
     · Bajo bg-black       → scrollbar oscuro (darkGrey → lightGrey hover → white active)
     · Bajo --100-mobileonly o --50-mobileonly → overflow scroll solo en móvil

   Estructura:
     · Base (interactive)   → modificador de ancho + número de items + scrollbar size
     · Galleries (collapsed)→ todas las variantes en demos navegables
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SSOT — 1:1 con _scrolls.scss ▼ */
    const DATA = {
        widthMods: [
            ["",                   "(default) cada item con su ancho natural"],
            ["--100",              "--100 · cada item ocupa 100% del viewport (snap full-screen)"],
            ["--50",               "--50 · cada item 50%"],
            ["--25",               "--25 · cada item 25%"],
            ["--100-mobileonly",   "--100-mobileonly · solo en <768px aplica 100%; en ≥768px libre"]
        ],
        scrollbarSizes: [
            ["",        "(default) scrollbar de 24px alto"],
            ["--small", "--small · scrollbar fino (5px alto)"]
        ]
    };

    /* ─── Viz helpers ─── */
    const ITEM = (i) => `<div style="background:#0050b3;color:#fff;padding:30px 20px;border-radius:3px;font:700 14px/1 monospace;flex-shrink:0;display:flex;align-items:center;justify-content:center;">Item ${i + 1}</div>`;

    const CAROUSEL = (mods, count) => {
        const cls = ["ft-helper-scroll"].concat(mods.filter(Boolean)).join(" ");
        const items = Array.from({ length: count }, (_, i) => ITEM(i)).join("");
        return `<div class="${esc(cls)}" style="gap:10px;background:#f5f5f5;border:1px dashed #999;border-radius:3px;padding:10px;">${items}</div>`;
    };

    /* ─── BASE — selector ─── */
    const baseArgTypes = [
        { key: "widthMod", control: "select",
          desc: "Modificador de ancho de los items.",
          options: DATA.widthMods },
        { key: "size", control: "radio",
          desc: "Tamaño del scrollbar.",
          options: DATA.scrollbarSizes },
        { key: "count", control: "number",
          desc: "Número de items.",
          min: 2, max: 20, step: 1 }
    ];
    const baseArgs = { widthMod: "", size: "", count: 8 };
    const liveBase = (a) => {
        const n = Math.max(2, Math.min(20, parseInt(a.count, 10) || 8));
        const cls = ["ft-helper-scroll", a.widthMod, a.size].filter(Boolean).join(" ");
        return `<div style="padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:10px;">.${esc(cls)}</code>
            <p style="margin:0 0 10px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">
                Arrastra horizontalmente o usa el scrollbar. <code>cursor: grab</code> ya está aplicado por el helper.
            </p>
            ${CAROUSEL([a.widthMod, a.size], n)}
        </div>`;
    };

    /* ─── Galería: modificadores de ancho ─── */
    const galleryWidths = () => {
        return DATA.widthMods.map(([mod, label]) => {
            const cls = ["ft-helper-scroll", mod].filter(Boolean).join(" ");
            return `<section style="margin-bottom:24px;">
                <h3 style="margin:0 0 4px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">.${cls || "ft-helper-scroll"}</h3>
                <p style="margin:0 0 8px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">${esc(label)}</p>
                ${CAROUSEL([mod], 8)}
            </section>`;
        }).join("");
    };

    /* ─── Galería: tamaños scrollbar ─── */
    const galleryScrollbarSizes = () => {
        const rows = DATA.scrollbarSizes.map(([mod, label]) => {
            const cls = ["ft-helper-scroll", mod].filter(Boolean).join(" ");
            return `<section style="margin-bottom:24px;">
                <h3 style="margin:0 0 4px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">.${cls}</h3>
                <p style="margin:0 0 8px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">${esc(label)}</p>
                ${CAROUSEL([mod], 10)}
            </section>`;
        }).join("");
        return `<p style="margin:0 0 14px;font:400 12px/1.5 'Inter',sans-serif;color:#666;padding:12px;background:#fffbe6;border-left:3px solid #faad14;border-radius:3px;">
            La estética del scrollbar usa <code>::-webkit-scrollbar</code> (Chromium/Safari) + fallback <code>scrollbar-width: thin</code> en navegadores sin webkit. Firefox respeta el fallback.
        </p>
        ${rows}`;
    };

    /* ─── Galería: stop + dark mode ─── */
    const galleryExtras = () => {
        return `<section style="margin-bottom:24px;">
            <h3 style="margin:0 0 4px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">.ft-helper-scroll-stop</h3>
            <p style="margin:0 0 8px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">
                Aplicado al mismo elemento que <code>.ft-helper-scroll</code> revierte el overflow a hidden y fija altura al 100%. Útil para pausar el scroll en un estado controlado (p.ej. modal abierto).
            </p>
            <div class="ft-helper-scroll ft-helper-scroll-stop" style="gap:10px;background:#f5f5f5;border:1px dashed #999;border-radius:3px;padding:10px;height:120px;">
                ${Array.from({ length: 8 }, (_, i) => ITEM(i)).join("")}
            </div>
            <p style="margin:8px 0 0;font:400 11px/1.3 'Inter',sans-serif;color:#666;">↑ El scrollbar desaparece y el contenido excedente queda oculto.</p>
        </section>
        <section style="margin-bottom:24px;">
            <h3 style="margin:0 0 4px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Dark mode automático (bajo bg-black)</h3>
            <p style="margin:0 0 8px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">
                Si el scroll vive bajo <code>.ft-helper-bgColor-black</code>, el SCSS conmuta los colores del scrollbar (darkGrey → lightGrey hover → white active) automáticamente.
            </p>
            <div class="ft-helper-bgColor-black" style="padding:14px;border-radius:3px;">
                <div class="ft-helper-scroll" style="gap:10px;padding:10px;background:transparent;border:1px dashed #444;">
                    ${Array.from({ length: 10 }, (_, i) => ITEM(i)).join("")}
                </div>
            </div>
        </section>`;
    };

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Scroll</h1>
        <p class="cb-docs__lead">Familia <code>.ft-helper-scroll*</code> del 42DS. Contenedor con scroll horizontal estilizado: cursor de drag, scrollbar custom, modificadores de ancho de items y conmutación automática de tema bajo fondos oscuros.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · paleta (incluye <code>--color-darkGrey/lightGrey/white</code>)</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_scrolls.scss</code></td><td>Parcial SCSS</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS (es solo el contenedor; cualquier comportamiento extra — snap, autoplay — lo añade el consumidor)</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Clase principal</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Aplica</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-helper-scroll</code></td><td><code>display: flex</code> · <code>overflow-x: scroll</code> · <code>flex-direction: row</code> · <code>cursor: grab</code> · scrollbar custom 24px</td></tr>
            </tbody>
        </table>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Aplica</th></tr></thead>
            <tbody>
                <tr><td><code>--small</code></td><td>Scrollbar de 5px alto · borders 1-2px</td></tr>
                <tr><td><code>--100</code></td><td>Cada hijo <code>min-width: 100%</code> (snap full-screen)</td></tr>
                <tr><td><code>--100-mobileonly</code></td><td><code>100%</code> solo en &lt;768px; en ≥768px revierte a libre</td></tr>
                <tr><td><code>--50</code></td><td>Cada hijo <code>min-width: 50%</code></td></tr>
                <tr><td><code>--25</code></td><td>Cada hijo <code>min-width: 25%</code></td></tr>
                <tr><td><code>-stop</code></td><td>Aplicado en paralelo: <code>overflow: hidden</code> + <code>height: 100%</code></td></tr>
            </tbody>
        </table>

        <h2>Behaviors integrados</h2>
        <ul>
            <li>Bajo <code>.ft-helper-bgColor-black</code>: scrollbar conmuta a darkGrey/lightGrey/white automáticamente. Sin tener que escribir overrides.</li>
            <li>Bajo <code>--100-mobileonly</code> o <code>--50-mobileonly</code>: <code>overflow-x: scroll</code> solo en &lt;768px → en desktop el carrusel se aplana sin scroll.</li>
            <li>Bajo <code>.ft-layout-grid-flex__nested</code>: aplica <code>flex-wrap: nowrap</code> (asegura que las cols del grid no salten línea).</li>
        </ul>

        <h2>Fallback navegador</h2>
        <div class="cb-callout">
            El SCSS aplica estilos via <code>::-webkit-scrollbar</code> (Chromium, Safari, Edge). Para Firefox y otros sin webkit, hay un <code>@supports not (selector(::-webkit-scrollbar-thumb)) { scrollbar-width: thin; }</code> como fallback mínimo.
        </div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-helper-scroll</code></td></tr>
                <tr><td>Tamaño</td><td><code>--small</code></td></tr>
                <tr><td>Ancho items</td><td><code>--100</code> · <code>--100-mobileonly</code> · <code>--50</code> · <code>--25</code></td></tr>
                <tr><td>Modo stop</td><td><code>-stop</code></td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_scrolls.scss</code> · showroom: <code>fourty/helpers/helper-scroll.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const SCROLL = {
        id: "scroll",
        name: "Scroll",
        group: "Helpers",
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true,
              argTypes: baseArgTypes, args: baseArgs, render: liveBase }
        ],
        subgroups: [
            {
                id: "galleries", name: "Galleries", collapsed: true,
                stories: [
                    { id: "widths",  name: "Modificadores de ancho",   kind: "gallery", full: true, render: galleryWidths },
                    { id: "sizes",   name: "Tamaños de scrollbar",     kind: "gallery", full: true, render: galleryScrollbarSizes },
                    { id: "extras",  name: "Stop + dark mode",         kind: "gallery", full: true, render: galleryExtras }
                ]
            }
        ]
    };
    window.SB.register(SCROLL);
    window.SB.loadMarkup(SCROLL, document.currentScript && document.currentScript.src, { full: true });
})();
