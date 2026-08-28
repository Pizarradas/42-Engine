/* ════════════════════════════════════════════════════════════════════════
   helpers/fontcolor/fontcolor.js — Helpers / Font Color
   Casuística REAL de scss/base/helpers/_fonts.scss (sub-bloque &Color).
   Aplica un color del DS al texto. Las clases brand (primary..septenary, greys)
   tienen además un `behavior-ft-helper-bg(Color-black)` que conmuta a blanco
   cuando viven dentro de un wrapper con fondo negro — esto se ve en el
   subgrupo "Markup".

   Estructura:
     · Base (interactive)  → selector único + slot textual + flag de fondo oscuro
     · Galleries           → Brand · Greys + neutros · Background tokens (set-brand)
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SSOT — 1:1 con _fonts.scss (sub-bloque &Color) ▼ */
    const DATA = {
        // Bloque general (sin SET BRAND)
        neutrals: ["black", "white"],
        brand:    ["primary", "secondary", "tertiary", "quaternary", "quinary", "senary", "septenary"],
        greys:    ["lightGrey", "mediumGrey", "darkGrey"],
        // Solo dentro del bloque SET BRAND (#{functionBrandSet(...)}): aplican una
        // variable del helper, no del root. Documentamos pero no las exponemos en
        // los controls interactivos del storybook porque su valor depende del set
        // activo de la marca y no siempre resuelve.
        setBrandBg: ["backgroundDarkGrey", "backgroundMediumGrey", "backgroundLightGrey"]
    };
    const ALL_COLORS = [].concat(DATA.brand, DATA.greys, DATA.neutrals);

    const SAMPLE = "The quick brown fox · 1234567890";

    /* ─── Viz helper ─── */
    const SWATCH = (cls, onDark) => {
        const bg = onDark ? "#1a1a1a" : "#fff";
        const border = onDark ? "#444" : "#ddd";
        return `<div style="padding:14px 16px;background:${bg};border:1px solid ${border};border-radius:3px;display:flex;flex-direction:column;gap:6px;">
            <code style="font:500 10.5px/1.2 monospace;color:${onDark ? '#9da5b4' : '#0f62fe'};">.${esc(cls)}</code>
            <div class="${esc(cls)}" style="font-size:18px;line-height:1.3;">${esc(SAMPLE)}</div>
        </div>`;
    };

    /* ─── BASE — selector único de color ─── */
    const baseArgTypes = [
        { key: "color", control: "select",
          desc: "Color del texto (.ft-helper-fontColor-[token]).",
          options: ALL_COLORS.map(c => [c, c]) },
        { key: "onDark", control: "boolean", desc: "Mostrar sobre fondo oscuro (útil para validar contraste y el behavior bg-black de las clases brand)." },
        { key: "text", control: "text", desc: "Texto de muestra (slot)." }
    ];
    const baseArgs = { color: "primary", onDark: false, text: SAMPLE };
    const liveBase = (a) => {
        const cls = "ft-helper-fontColor-" + a.color;
        return SWATCH(cls, !!a.onDark);
    };

    /* ─── Galería: brand ─── */
    const galleryBrand = () => {
        const light = DATA.brand.map(c => SWATCH("ft-helper-fontColor-" + c, false)).join("");
        const dark  = DATA.brand.map(c => SWATCH("ft-helper-fontColor-" + c, true)).join("");
        return `<section style="margin-bottom:24px;">
            <h3 style="margin:0 0 10px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Brand · sobre fondo claro</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;">${light}</div>
        </section>
        <section style="margin-bottom:24px;">
            <h3 style="margin:0 0 10px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Brand · sobre fondo oscuro <small style="font-weight:400;color:#666;">(behavior bg-black → blanco)</small></h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;">${dark}</div>
        </section>`;
    };

    /* ─── Galería: greys + neutrales ─── */
    const galleryNeutrals = () => {
        const items = [].concat(DATA.neutrals, DATA.greys);
        const light = items.map(c => SWATCH("ft-helper-fontColor-" + c, false)).join("");
        const dark  = items.map(c => SWATCH("ft-helper-fontColor-" + c, true)).join("");
        return `<section style="margin-bottom:24px;">
            <h3 style="margin:0 0 10px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Neutrales + greys · sobre fondo claro</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;">${light}</div>
        </section>
        <section style="margin-bottom:24px;">
            <h3 style="margin:0 0 10px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Neutrales + greys · sobre fondo oscuro</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;">${dark}</div>
        </section>`;
    };

    /* ─── Galería: background tokens (set-brand only) ─── */
    const gallerySetBrand = () => {
        const note = `<p style="font:400 12px/1.5 'Inter',sans-serif;color:#666;margin:0 0 12px;">
            Los siguientes tokens solo aplican cuando el bloque <code>set-brand</code> de la marca activa los inyecta
            (ver bloque <code>#{functionBrandSet($helper-set-brand)}</code> en <code>_fonts.scss</code>). En el storybook se
            ven sin efecto si la marca activa no los define — es lo esperado.
        </p>`;
        const items = DATA.setBrandBg.map(c => SWATCH("ft-helper-fontColor-" + c, false)).join("");
        return `<section style="margin-bottom:24px;">
            <h3 style="margin:0 0 6px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Background tokens · solo si la marca los inyecta</h3>
            ${note}
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;">${items}</div>
        </section>`;
    };

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Font Color</h1>
        <p class="cb-docs__lead">Familia <code>.ft-helper-fontColor-*</code> del 42DS. Aplica un color del DS al texto. Las clases <em>brand</em> y <em>grey</em> conmutan a blanco cuando viven bajo <code>.ft-helper-bgColor-black</code> (behavior automático).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · paleta de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_fonts.scss</code></td><td>Parcial SCSS (sub-bloque <code>&Color</code>)</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Tokens disponibles</h2>
        <table class="cb-table">
            <thead><tr><th>Grupo</th><th>Clases</th><th>Resuelve a</th></tr></thead>
            <tbody>
                <tr><td>Neutros</td><td><code>-black</code> · <code>-white</code></td><td><code>var(--color-black)</code> · <code>var(--color-white)</code></td></tr>
                <tr><td>Brand</td><td><code>-primary</code>..<code>-septenary</code></td><td><code>var(--color-primary)</code>..<code>var(--color-septenary)</code> · cambia con el switch de Brand</td></tr>
                <tr><td>Greys</td><td><code>-lightGrey</code> · <code>-mediumGrey</code> · <code>-darkGrey</code></td><td><code>var(--color-{light|medium|dark}Grey)</code></td></tr>
                <tr><td>Set-brand bg</td><td><code>-backgroundDarkGrey</code> · <code>-backgroundMediumGrey</code> · <code>-backgroundLightGrey</code></td><td>Variables del helper-set; solo activas en marcas que las inyectan</td></tr>
            </tbody>
        </table>

        <h2>Behavior automático: contraste bg-black</h2>
        <p>Las clases brand y grey llevan en el SCSS:</p>
        <pre style="background:#f5f5f5;padding:10px;border-radius:3px;font:500 11.5px/1.4 monospace;overflow:auto;"><code>@include behavior-ft-helper-bg(Color-black) {
  color: var(--color-white);
}</code></pre>
        <p>Es decir: si un ancestro lleva <code>.ft-helper-bgColor-black</code>, el texto pasa a blanco automáticamente. Esto evita escribir overrides manuales para asegurar contraste en cabeceras oscuras.</p>

        <h2>Composición</h2>
        <p>Combina con <code>.ft-helper-fontSize-*</code>, <code>.ft-helper-fontWeight-*</code> y <code>.ft-helper-fontType--*</code> sin conflictos.</p>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Prefijo</td><td><code>.ft-helper-fontColor-</code></td></tr>
                <tr><td>Token</td><td>neutro · brand (1..7) · grey · set-brand background</td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_fonts.scss</code> · showroom: <code>fourty/helpers/helper-fontcolor.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const FONTCOLOR = {
        id: "fontcolor",
        name: "Font Color",
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
                    { id: "brand",     name: "Brand",                        kind: "gallery", full: true, render: galleryBrand },
                    { id: "neutrals",  name: "Neutrales + greys",            kind: "gallery", full: true, render: galleryNeutrals },
                    { id: "set-brand", name: "Background tokens (set-brand)", kind: "gallery", full: true, render: gallerySetBrand }
                ]
            }
        ]
    };
    window.SB.register(FONTCOLOR);
    window.SB.loadMarkup(FONTCOLOR, document.currentScript && document.currentScript.src, { full: true });
})();
