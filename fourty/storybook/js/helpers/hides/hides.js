/* ════════════════════════════════════════════════════════════════════════
   helpers/hides/hides.js — Helpers / Hides
   Casuística REAL de scss/base/helpers/_hides.scss (.ft-helper-hide*).
   Tres familias:
     · Visibilidad universal  → .ft-helper-hide (visualmente oculto, accesible
       a screen readers vía mixin hide-visually)
     · Responsive             → -mo, -xs, -sm, -md, -lg (ocultar en rangos)
     · A11y específicas       → -onScroll (fixed top con transition para JS de
       scroll), -hideTxt (esconder texto manteniendo el bloque), -screenReader
       (oculto visualmente pero accesible)

   Estructura:
     · Base (interactive)   → variante a aplicar + slot
     · Galleries (collapsed)→ responsive (con tabla de breakpoints) · a11y
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SSOT — 1:1 con _hides.scss ▼ */
    const DATA = {
        // Variantes seleccionables en Base
        all: [
            ["hide",              "hide · siempre oculto (accesible a SR vía hide-visually)"],
            ["hide-mo",           "hide-mo · oculto <767px (mobile only)"],
            ["hide-xs",           "hide-xs · oculto ≤767px"],
            ["hide-sm",           "hide-sm · oculto ≤1002px"],
            ["hide-md",           "hide-md · oculto ≥768px"],
            ["hide-lg",           "hide-lg · oculto ≥1280px"],
            ["hide-onScroll",     "hide-onScroll · position fixed top:0 + transition (para JS scroll)"],
            ["hideTxt",           "hideTxt · esconde texto manteniendo el bloque (replacement por imagen)"],
            ["hide-screenReader", "hide-screenReader · visible para screen readers, oculto a la vista"]
        ],
        responsive: [
            ["hide-mo", "<767px",         "mobile only"],
            ["hide-xs", "≤767px",         "below tablet"],
            ["hide-sm", "≤1002px",        "below desktop"],
            ["hide-md", "≥768px",         "tablet up"],
            ["hide-lg", "≥1280px",        "desktop wide up"]
        ],
        a11y: [
            ["hide",              "hide-visually (mixin)", "Oculto visualmente pero accesible a screen readers"],
            ["hide-screenReader", "clip + 1×1px",          "Equivalente a sr-only de Bootstrap/Tailwind"],
            ["hideTxt",           "absolute + width:0",    "Esconde texto manteniendo el bloque (sustituido por imagen)"],
            ["hide-onScroll",     "fixed top + transition", "Plantilla para JS que oculta/muestra al hacer scroll"]
        ]
    };

    /* ─── Viz helpers ─── */
    const PILL = (label, mod) => {
        const cls = mod ? `ft-helper-${mod}` : "";
        return `<span class="${esc(cls)}" style="background:#0050b3;color:#fff;padding:8px 12px;border-radius:3px;font:600 11px/1.2 sans-serif;display:inline-block;">${esc(label)}</span>`;
    };
    const ROW = (cls) =>
        `<div style="background:#f5f5f5;padding:14px;border:1px dashed #999;border-radius:3px;">
            <div style="display:flex;gap:8px;align-items:center;">
                ${PILL("Vecino A")}
                ${PILL("Target con .ft-helper-" + cls, cls)}
                ${PILL("Vecino B")}
            </div>
        </div>`;

    /* ─── BASE — selector ─── */
    const baseArgTypes = [
        { key: "variant", control: "select",
          desc: "Variante de hide (.ft-helper-[variant]). Para las responsive usa el selector Viewport del toolbar para ver el efecto.",
          options: DATA.all }
    ];
    const baseArgs = { variant: "hide-md" };
    const liveBase = (a) => {
        return `<div style="padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:6px;">.ft-helper-${esc(a.variant)}</code>
            <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">El target lleva la clase. Si cumple la condición de ocultarse, desaparece de la fila; los vecinos siguen en su sitio.</p>
            ${ROW(a.variant)}
        </div>`;
    };

    /* ─── Galería: responsive ─── */
    const galleryResponsive = () => {
        const rows = DATA.responsive.map(([cls, range, label]) => {
            return `<section style="margin-bottom:18px;">
                <h3 style="margin:0 0 4px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">.ft-helper-${esc(cls)}</h3>
                <p style="margin:0 0 8px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">Oculto cuando: <strong>${esc(range)}</strong> · ${esc(label)}</p>
                ${ROW(cls)}
            </section>`;
        }).join("");
        return `<p style="margin:0 0 14px;font:400 12px/1.5 'Inter',sans-serif;color:#666;padding:12px;background:#fffbe6;border-left:3px solid #faad14;border-radius:3px;">
            <strong>Cómo verificar</strong>: usa el control <code>Viewport</code> del toolbar del storybook para cambiar la resolución del iframe. El target solo se oculta cuando el viewport cae en el rango indicado.
        </p>
        ${rows}`;
    };

    /* ─── Galería: A11y ─── */
    const galleryA11y = () => {
        const rows = DATA.a11y.map(([cls, mechanism, desc]) => {
            return `<section style="margin-bottom:18px;">
                <h3 style="margin:0 0 4px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">.ft-helper-${esc(cls)}</h3>
                <p style="margin:0 0 4px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;"><strong>Mecanismo</strong>: ${esc(mechanism)}</p>
                <p style="margin:0 0 8px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">${esc(desc)}</p>
                ${ROW(cls)}
            </section>`;
        }).join("");
        return rows;
    };

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Hides</h1>
        <p class="cb-docs__lead">Familia <code>.ft-helper-hide*</code> del 42DS. Variantes para ocultar elementos: universal, responsive (5 breakpoints) y a11y específicas (screen reader, texto sustituible, scroll JS).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_hides.scss</code></td><td>Parcial SCSS</td><td>Solo para compilar (depende de mixins <code>hide-visually</code> y <code>hide-text</code> de abstracts)</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS (excepto <code>hide-onScroll</code>, que es plantilla para JS de scroll del consumidor)</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Responsive — tabla de breakpoints</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Oculto cuando</th><th>Visible cuando</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-helper-hide-mo</code></td><td>&lt;767px</td><td>≥767px</td></tr>
                <tr><td><code>.ft-helper-hide-xs</code></td><td>≤767px</td><td>≥768px</td></tr>
                <tr><td><code>.ft-helper-hide-sm</code></td><td>≤1002px</td><td>≥1003px</td></tr>
                <tr><td><code>.ft-helper-hide-md</code></td><td>≥768px</td><td>&lt;768px</td></tr>
                <tr><td><code>.ft-helper-hide-lg</code></td><td>≥1280px</td><td>&lt;1280px</td></tr>
            </tbody>
        </table>
        <div class="cb-callout"><code>-mo</code> y <code>-xs</code> son prácticamente idénticas (umbral 767px), pero <code>-mo</code> parte de "oculto por defecto" y revierte; <code>-xs</code> solo añade la regla de ocultar. El resultado visual es el mismo.</div>

        <h2>A11y específicas</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Mecanismo</th><th>Para qué</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-helper-hide</code></td><td><code>@include hide-visually</code></td><td>Oculto visual pero accesible — patrón clásico de visualmente-oculto</td></tr>
                <tr><td><code>.ft-helper-hide-screenReader</code></td><td>clip + 1×1px + overflow hidden</td><td>Equivalente moderno de <code>sr-only</code> · accesible a lectores de pantalla</td></tr>
                <tr><td><code>.ft-helper-hideTxt</code></td><td>absolute + width:0 + hide-text</td><td>Sustituir texto por imagen sin perder accesibilidad SEO</td></tr>
                <tr><td><code>.ft-helper-hide-onScroll</code></td><td>fixed top + transition</td><td>Plantilla para JS que muestra/oculta una cabecera al hacer scroll. La transición usa <code>$helper-hide-onscroll-property/duration/ease</code> (configurables en el mixin).</td></tr>
            </tbody>
        </table>

        <h2>Overrides específicos para componentes ad</h2>
        <p>Las clases <code>-xs</code>, <code>-sm</code> y <code>-md</code> incluyen reglas duplicadas para selectores específicos de anuncios (<code>.ft-ad</code>, <code>.ft-ad--roba</code>, <code>.ft-ad--intext</code>, <code>.ft-ad--mega</code>) y un caso para <code>.ft-mol-rrss-inline</code> / <code>.ft-mol-rrss-columnSticky</code>. Existen porque algunos placeholders de ad necesitan <code>display: none</code> declarado con mayor especificidad para evitar que el iframe del anuncio reservar espacio. Documental, no afecta uso.</p>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Prefijo</td><td><code>.ft-helper-hide</code></td></tr>
                <tr><td>Responsive</td><td><code>-mo</code> · <code>-xs</code> · <code>-sm</code> · <code>-md</code> · <code>-lg</code></td></tr>
                <tr><td>A11y</td><td>(base) · <code>-screenReader</code> · <code>Txt</code> · <code>-onScroll</code></td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_hides.scss</code> · showroom: <code>fourty/helpers/helper-hides.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const HIDES = {
        id: "hides",
        name: "Hides",
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
                    { id: "responsive", name: "Responsive", kind: "gallery", full: true, render: galleryResponsive },
                    { id: "a11y",       name: "A11y",       kind: "gallery", full: true, render: galleryA11y }
                ]
            }
        ]
    };
    window.SB.register(HIDES);
    window.SB.loadMarkup(HIDES, document.currentScript && document.currentScript.src, { full: true });
})();
