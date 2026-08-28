/* ════════════════════════════════════════════════════════════════════════
   helpers/collapse/collapse.js — Helpers / Collapse
   Casuística REAL de scss/base/helpers/_collapses.scss (.ft-helper-collapse).
   Pareja mínima de clases:
     · .ft-helper-collapse          → display: none
     · .ft-helper-collapse--show    → display: block
   Pensada para que un JS de consumidor (acordeones, FAQs, paneles) togglee el
   modificador --show sobre el elemento. El helper en sí no incluye animación.

   Estructura:
     · Base (interactive)  → toggle on/off + slot
     · Galleries           → patrón JS-driven (con un toggle real en el demo)
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc, frameworkBlock } = window.SB.helpers;

    /* ─── BASE — toggle on/off ─── */
    const baseArgTypes = [
        { key: "shown", control: "boolean",
          desc: "Aplica el modificador --show (display: block). Sin el modificador, el bloque permanece oculto (display: none)." },
        { key: "label", control: "text", desc: "Texto del bloque colapsable." }
    ];
    const baseArgs = { shown: true, label: "Contenido colapsable" };
    const liveBase = (a) => {
        const cls = "ft-helper-collapse" + (a.shown ? " ft-helper-collapse--show" : "");
        return `<div style="padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:10px;">.${esc(cls)}</code>
            <div style="background:#f5f5f5;padding:14px;border-radius:3px;">
                <p style="margin:0 0 10px;font:400 12px/1.4 'Inter',sans-serif;color:#666;">Vecino A (siempre visible)</p>
                <div class="${esc(cls)}" style="background:#0050b3;color:#fff;padding:10px 12px;border-radius:3px;">
                    ${esc(a.label)}
                </div>
                <p style="margin:10px 0 0;font:400 12px/1.4 'Inter',sans-serif;color:#666;">Vecino B (siempre visible)</p>
            </div>
            <p style="margin:12px 0 0;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">
                ${a.shown
                    ? "Con <code>--show</code>: el bloque renderiza en flujo."
                    : "Sin <code>--show</code>: el bloque está fuera de flujo (los vecinos se juntan)."}
            </p>
        </div>`;
    };

    /* ─── Galería: patrón JS-driven ─── */
    const galleryPattern = () => {
        // Construimos un demo con id único por instancia y un onclick inline que
        // hace el toggle. El helper en sí es CSS-only; este es solo el patrón.
        const uid = "cb-collapse-" + Math.random().toString(36).slice(2, 8);
        return `<section>
            <h3 style="margin:0 0 6px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Patrón JS-driven</h3>
            <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">
                El helper es CSS puro. El consumidor añade/retira <code>.ft-helper-collapse--show</code> con su propio JS.
                En el demo de abajo togglemos la clase con un onclick inline para que sea autosuficiente; en producción
                se usaría un listener real (acordeones, FAQs, paneles).
            </p>
            <div style="background:#f5f5f5;padding:14px;border-radius:3px;">
                <button type="button"
                        onclick="(function(b){var el=document.getElementById('${uid}');el.classList.toggle('ft-helper-collapse--show');b.setAttribute('aria-expanded', el.classList.contains('ft-helper-collapse--show'));})(this)"
                        aria-controls="${uid}" aria-expanded="false"
                        style="padding:8px 12px;background:#0050b3;color:#fff;border:0;border-radius:3px;font:600 12px/1.2 sans-serif;cursor:pointer;">
                    Toggle .ft-helper-collapse--show
                </button>
                <div id="${uid}" class="ft-helper-collapse"
                     style="margin-top:12px;background:#fff;border:1px solid #ddd;border-radius:3px;padding:12px;">
                    <p style="margin:0;font:14px/1.5 sans-serif;color:#444;">
                        Contenido del panel. Aparece/desaparece según el modificador <code>--show</code>.
                        Sin transición: el helper no anima el cambio de display.
                    </p>
                </div>
            </div>
        </section>
        <section style="margin-top:24px;">
            <h3 style="margin:0 0 6px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Ejemplo de JS de consumidor</h3>
            <pre style="background:#f5f5f5;padding:10px;border-radius:3px;font:500 11.5px/1.4 monospace;overflow:auto;"><code>document.querySelectorAll('[data-collapse-trigger]').forEach(function (btn) {
    btn.addEventListener('click', function () {
        var id = btn.getAttribute('aria-controls');
        var target = document.getElementById(id);
        if (!target) return;
        var open = target.classList.toggle('ft-helper-collapse--show');
        btn.setAttribute('aria-expanded', open);
    });
});</code></pre>
        </section>`;
    };

    const framework = frameworkBlock({
        intro: `El helper no trae controller propio: en framework conviene que el estado abierto/cerrado viva en la capa reactiva y que la clase <code>.ft-helper-collapse--show</code> sea solo una proyeccion visual.`,
        rows: [
            ["Estado", `Usa un <code>ref(false)</code> o <code>reactive()</code> y proyecta <code>:class</code> + <code>:aria-expanded</code> desde ese estado.`, `Usa <code>useState(false)</code> y proyecta <code>className</code> + <code>aria-expanded</code> desde la misma fuente de verdad.`],
            ["Eventos", `Resuelve la apertura con <code>@click</code>; si el target necesita id estable, generarlo una vez y reutilizarlo.`, `Resuelve la apertura con <code>onClick</code>; si el target necesita id estable, apoyate en <code>useId()</code> o en una prop fija.`],
            ["SSR / hydration", `Renderiza el panel cerrado por defecto y deja la hidratacion para los listeners del cliente; no hace falta JS inline.`, `Renderiza el panel cerrado por defecto y deja la hidratacion para el handler del cliente; evita mutar el DOM fuera del render.`]
        ],
        note: `Si necesitas transicion, no animes <code>display</code>. Migra a <code>height</code>/<code>opacity</code> o usa un componente del DS pensado para ello, como <code>.ft-mol-accordion</code>.`,
        warn: true
    });

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Collapse</h1>
        <p class="cb-docs__lead">Pareja mínima <code>.ft-helper-collapse</code> + <code>.ft-helper-collapse--show</code> del 42DS. Patrón CSS para esconder/mostrar un bloque por <code>display</code>. Sin animación, sin estado interno — pensado para que el consumidor lo togglee con JS.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_collapses.scss</code></td><td>Parcial SCSS</td><td>Solo para compilar</td></tr>
                <tr><td>JS</td><td>Del consumidor</td><td>Necesario para togglear el modificador <code>--show</code> en runtime</td></tr>
            </tbody>
        </table>
        </div>
        ${framework}

        <h2>Clases</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Aplica</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-helper-collapse</code></td><td><code>display: none</code></td></tr>
                <tr><td><code>.ft-helper-collapse--show</code></td><td><code>display: block</code></td></tr>
            </tbody>
        </table>
        <div class="cb-callout">El helper es <strong>CSS puro</strong>. No incluye transición; el cambio de <code>display</code> no se anima. Si necesitas animación, usar un componente del DS (ej. <code>.ft-mol-accordion</code>) o aplicar tu propia transición con <code>height</code>/<code>opacity</code>.</div>

        <h2>Composición sugerida</h2>
        <ul>
            <li>Trigger: un <code>&lt;button aria-controls="ID" aria-expanded="false"&gt;</code> que togglee la clase y actualice <code>aria-expanded</code>.</li>
            <li>Target: <code>&lt;div id="ID" class="ft-helper-collapse"&gt;</code> (oculto por defecto).</li>
            <li>Para componentes complejos (FAQs, acordeones múltiples), prefiere <code>.ft-mol-accordion</code> del DS.</li>
        </ul>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-helper-collapse</code></td></tr>
                <tr><td>Modificador</td><td><code>--show</code></td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_collapses.scss</code> · showroom: <code>fourty/helpers/helper-collapse.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const COLLAPSE = {
        id: "collapse",
        name: "Collapse",
        group: "Helpers",
        signals: ["js"],
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true,
              argTypes: baseArgTypes, args: baseArgs, render: liveBase }
        ],
        subgroups: [
            {
                id: "galleries", name: "Galleries", collapsed: true,
                stories: [
                    { id: "pattern", name: "Patrón JS-driven", kind: "gallery", full: true, render: galleryPattern }
                ]
            }
        ]
    };
    window.SB.register(COLLAPSE);
    window.SB.loadMarkup(COLLAPSE, document.currentScript && document.currentScript.src, { full: true });
})();
