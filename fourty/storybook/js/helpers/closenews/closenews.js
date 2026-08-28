/* ════════════════════════════════════════════════════════════════════════
   helpers/closenews/closenews.js — Helpers / Closenews
   Casuística REAL de scss/base/helpers/_closenews.scss (.ft-helper-closenews).
   Una sola clase: limita el alto de un bloque a 21.5rem y dibuja un fade-out
   blanco en los últimos 200px con un `:after` linear-gradient. Patrón
   editorial para previews de noticias o teasers que "se cortan" con un
   degradado tipo "lectura cortada".

   Estructura:
     · Base (interactive)  → toggle on/off + texto de muestra ajustable
     · Galleries           → caso de uso con/sin clase comparativo
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ─── Sample largo de demo ─── */
    const SAMPLE_PARAGRAPHS = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis neque vel arcu hendrerit, vitae ultrices nisl sollicitudin. Mauris a nibh tristique, dapibus felis sit amet, mollis lectus.",
        "Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed posuere consectetur est at lobortis. Aliquam erat volutpat.",
        "Donec mollis hendrerit risus. Etiam laoreet quam sed arcu. Praesent placerat magna a turpis posuere, in lacinia justo malesuada.",
        "Phasellus iaculis neque vel arcu hendrerit, vitae ultrices nisl sollicitudin. Mauris a nibh tristique, dapibus felis sit amet, mollis lectus.",
        "Curabitur lacinia pulvinar nibh. Nam a sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia."
    ];

    /* ─── BASE — toggle on/off + slot ─── */
    const baseArgTypes = [
        { key: "applied", control: "boolean",
          desc: "Aplica .ft-helper-closenews (max-height 21.5rem + fade-out blanco)." },
        { key: "paragraphs", control: "number",
          desc: "Número de párrafos del texto de muestra.",
          min: 1, max: 5, step: 1 }
    ];
    const baseArgs = { applied: true, paragraphs: 5 };
    const liveBase = (a) => {
        const n = Math.max(1, Math.min(5, parseInt(a.paragraphs, 10) || 5));
        const cls = a.applied ? "ft-helper-closenews" : "";
        const paragraphs = SAMPLE_PARAGRAPHS.slice(0, n).map(p => `<p>${esc(p)}</p>`).join("");
        return `<div style="padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:10px;">.${esc(cls || "(sin clase)")}</code>
            <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">
                ${a.applied
                    ? "Con <code>.ft-helper-closenews</code>: alto máximo 21.5rem (≈215px) + degradado de fade-out blanco en los últimos 200px que sugiere 'continúa'."
                    : "Sin la clase: el bloque crece con su contenido sin recorte."}
            </p>
            <div class="${esc(cls)}" style="background:#fff;border:1px solid #ddd;border-radius:3px;padding:16px;color:#333;font:14px/1.5 sans-serif;">
                ${paragraphs}
            </div>
        </div>`;
    };

    /* ─── Galería: comparación con/sin ─── */
    const galleryCompare = () => {
        const text = SAMPLE_PARAGRAPHS.map(p => `<p>${esc(p)}</p>`).join("");
        return `<section style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
            <div>
                <h3 style="margin:0 0 6px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Sin .ft-helper-closenews</h3>
                <p style="margin:0 0 8px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">El bloque crece libremente con su contenido.</p>
                <div style="background:#fff;border:1px solid #ddd;border-radius:3px;padding:14px;color:#333;font:13px/1.5 sans-serif;">${text}</div>
            </div>
            <div>
                <h3 style="margin:0 0 6px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Con .ft-helper-closenews</h3>
                <p style="margin:0 0 8px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">Recortado a 21.5rem con degradado blanco al final.</p>
                <div class="ft-helper-closenews" style="background:#fff;border:1px solid #ddd;border-radius:3px;padding:14px;color:#333;font:13px/1.5 sans-serif;">${text}</div>
            </div>
        </section>`;
    };

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Closenews</h1>
        <p class="cb-docs__lead">Helper de una sola clase <code>.ft-helper-closenews</code>: limita el alto del bloque a 21.5rem y añade un fade-out blanco en los últimos 200px. Patrón editorial para previews de noticia o teasers tipo "lectura cortada".</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables (incluye <code>--color-white</code>)</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_closenews.scss</code></td><td>Parcial SCSS</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Clase</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Aplica</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-helper-closenews</code></td><td><code>position: relative</code> · <code>max-height: 21.5rem</code> · <code>overflow: hidden</code> · <code>:after</code> linear-gradient blanco (200px)</td></tr>
            </tbody>
        </table>

        <h2>Composición</h2>
        <p>Patrón clásico: el helper aplica el recorte visual; el consumidor añade un CTA "Leer más" debajo (fuera del bloque, para que no se vea afectado por el fade).</p>
        <pre style="background:#f5f5f5;padding:10px;border-radius:3px;font:500 11.5px/1.4 monospace;overflow:auto;"><code>&lt;article class="ft-helper-closenews"&gt;
  &lt;p&gt;Texto largo de la noticia…&lt;/p&gt;
  &lt;p&gt;Más párrafos que no caben en 21.5rem.&lt;/p&gt;
&lt;/article&gt;
&lt;a href="/noticia" class="ft-btn ft-btn--primary"&gt;Leer más&lt;/a&gt;</code></pre>

        <h2>Limitaciones</h2>
        <ul>
            <li><strong>Fade hardcoded a blanco</strong>: el degradado va a <code>var(--color-white)</code>. Si tu fondo no es blanco, el efecto se rompe (se ve la franja blanca). En ese caso, sobreescribe el degradado en CSS del consumidor o no uses este helper.</li>
            <li><strong>Sin "Read more" inline</strong>: el bloque solo aporta el recorte visual; el CTA es responsabilidad del consumidor.</li>
            <li><strong>No es responsive</strong>: 21.5rem fijo en todos los viewports (en ≥768px solo añade <code>padding: 0</code>, sin cambiar el max-height).</li>
        </ul>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Clase única</td><td><code>.ft-helper-closenews</code></td></tr>
                <tr><td>Fade</td><td><code>:after</code> con <code>linear-gradient(180deg, transparent → white 85%)</code></td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_closenews.scss</code> · showroom: <code>fourty/helpers/helper-closenews.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const CLOSENEWS = {
        id: "closenews",
        name: "Close News",
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
                    { id: "compare", name: "Con vs sin (comparativa)", kind: "gallery", full: true, render: galleryCompare }
                ]
            }
        ]
    };
    window.SB.register(CLOSENEWS);
    window.SB.loadMarkup(CLOSENEWS, document.currentScript && document.currentScript.src, { full: true });
})();
