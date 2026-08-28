/* ════════════════════════════════════════════════════════════════════════
   helpers/size/size.js — Helpers / Size
   Casuística REAL de scss/base/helpers/_size.scss (.ft-helper-size-h-*).
   2 clases — alto basado en viewport:
     · -h-50  → min-height: 50vh (dvh si lo soporta) en <1024px;
                height: 50vh (dvh) en ≥1024px
     · -h-100 → idéntico con 100vh

   Patrón típico para secciones hero o full-screen panels que adaptan su
   comportamiento al viewport (en móvil aceptan crecer con contenido; en
   desktop fijan altura exacta).

   Estructura:
     · Base (interactive)  → selector + slot
     · Galleries           → comparativa h-50 vs h-100 + nota sobre dvh
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SSOT — 1:1 con _size.scss ▼ */
    const DATA = {
        heights: [
            ["50",  "50vh / dvh"],
            ["100", "100vh / dvh"]
        ]
    };

    /* ─── BASE — selector ─── */
    const baseArgTypes = [
        { key: "height", control: "radio",
          desc: "Alto basado en viewport (.ft-helper-size-h-[50|100]).",
          options: DATA.heights }
    ];
    const baseArgs = { height: "50" };
    const liveBase = (a) => {
        const cls = "ft-helper-size-h-" + a.height;
        return `<div style="padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:10px;">.${esc(cls)}</code>
            <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">
                <strong>&lt;1024px</strong>: <code>min-height: ${a.height}vh</code> (crece con el contenido). <strong>≥1024px</strong>: <code>height: ${a.height}vh</code> (alto exacto). Si el navegador soporta <code>dvh</code>, se usa esa unidad en lugar de <code>vh</code> (≈ "altura dinámica" sin contar barras de navegador móviles).
            </p>
            <div class="${esc(cls)}" style="background:linear-gradient(180deg,#0050b3,#2c75c4);color:#fff;border-radius:3px;display:flex;align-items:center;justify-content:center;font:600 16px/1.2 sans-serif;text-align:center;padding:14px;">
                Bloque con .${esc(cls)}
            </div>
        </div>`;
    };

    /* ─── Galería: comparativa ─── */
    const galleryCompare = () => {
        return `<section>
            <h3 style="margin:0 0 6px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">.ft-helper-size-h-50</h3>
            <p style="margin:0 0 10px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">Mitad del viewport. Útil para hero "media página".</p>
            <div class="ft-helper-size-h-50" style="background:#0050b3;color:#fff;display:flex;align-items:center;justify-content:center;border-radius:3px;margin-bottom:24px;font:600 14px/1.2 sans-serif;">
                50% del viewport
            </div>

            <h3 style="margin:0 0 6px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">.ft-helper-size-h-100</h3>
            <p style="margin:0 0 10px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">Viewport completo. Patrón hero a pantalla completa.</p>
            <div class="ft-helper-size-h-100" style="background:linear-gradient(180deg,#0050b3,#001f3f);color:#fff;display:flex;align-items:center;justify-content:center;border-radius:3px;font:600 14px/1.2 sans-serif;">
                100% del viewport
            </div>
        </section>
        <section style="margin-top:24px;padding:12px;background:#fffbe6;border-left:3px solid #faad14;border-radius:3px;">
            <h4 style="margin:0 0 4px;font:600 12.5px/1.2 'Inter',sans-serif;color:#161616;">vh vs dvh</h4>
            <p style="margin:0;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">
                <code>vh</code> es estático y no contempla la barra de URL móvil (chrome browser) que aparece y desaparece — el alto del viewport "vista" cambia al hacer scroll y el contenido "salta". <code>dvh</code> (Dynamic Viewport Height) sí lo contempla. El SCSS prefiere <code>dvh</code> vía <code>@supports</code> y degrada a <code>vh</code> en navegadores que no lo conocen.
            </p>
        </section>`;
    };

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Size</h1>
        <p class="cb-docs__lead">Familia <code>.ft-helper-size-h-*</code> del 42DS. 2 clases para fijar el alto del bloque al 50% o 100% del viewport. <strong>Mobile-first</strong>: <code>min-height</code> en &lt;1024px (deja crecer), <code>height</code> exacto en ≥1024px. Usa <code>dvh</code> si el navegador lo soporta.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_size.scss</code></td><td>Parcial SCSS</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Clases</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>&lt;1024px</th><th>≥1024px</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-helper-size-h-50</code></td><td><code>min-height: 50vh</code> (50dvh si soporta)</td><td><code>height: 50vh</code> (50dvh si soporta)</td></tr>
                <tr><td><code>.ft-helper-size-h-100</code></td><td><code>min-height: 100vh</code> (100dvh si soporta)</td><td><code>height: 100vh</code> (100dvh si soporta)</td></tr>
            </tbody>
        </table>
        <div class="cb-callout">
            <strong>Por qué min-height en móvil</strong>: en móvil el contenido puede crecer más que el viewport (formularios, listas largas) y <code>height</code> fijo lo recortaría. <code>min-height</code> garantiza el alto mínimo pero permite expansion. En desktop, el comportamiento full-screen es el deseado.
        </div>

        <h2>vh vs dvh</h2>
        <p>El SCSS usa <code>@supports (height: 50dvh)</code> para preferir <code>dvh</code> cuando el navegador lo soporta. <code>dvh</code> (Dynamic Viewport Height) sí contempla la barra de URL móvil que aparece/desaparece — evita el "salto" típico al hacer scroll en iOS/Android. En navegadores sin soporte degrada a <code>vh</code>.</p>

        <h2>Composición</h2>
        <p>Combina típicamente con flex centrado:</p>
        <pre style="background:#f5f5f5;padding:10px;border-radius:3px;font:500 11.5px/1.4 monospace;overflow:auto;"><code>&lt;section class="ft-helper-size-h-100 ft-helper-display-flex
                  ft-helper-display-flex--middle ft-helper-display-flex--center"&gt;
  &lt;h1&gt;Hero a pantalla completa&lt;/h1&gt;
&lt;/section&gt;</code></pre>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Prefijo</td><td><code>.ft-helper-size-h-</code></td></tr>
                <tr><td>Valor</td><td><code>50</code> · <code>100</code> (porcentaje del viewport)</td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_size.scss</code> · showroom: <code>fourty/helpers/helper-size.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const SIZE = {
        id: "size",
        name: "Size",
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
                    { id: "compare", name: "50% vs 100% (comparativa)", kind: "gallery", full: true, render: galleryCompare }
                ]
            }
        ]
    };
    window.SB.register(SIZE);
    window.SB.loadMarkup(SIZE, document.currentScript && document.currentScript.src, { full: true });
})();
