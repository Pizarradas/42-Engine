/* ════════════════════════════════════════════════════════════════════════
   helpers/anchor/anchor.js — Helpers / Anchor
   Casuística REAL de scss/base/helpers/_anchors.scss (.ft-helper-anchor-spacer).
   Una sola clase: añade un pseudo-elemento `:before` invisible que actúa como
   "amortiguador" para que un enlace ancla (#id) no quede tapado por una
   cabecera fija al hacer scroll. Solo aplica en ≥768px (en móvil la cabecera
   suele ser distinta o no fija).

   Mecanismo: `:before` con `margin-top: -11.2rem` + `height: 11.2rem` = ocupa
   un "espacio negativo" del alto de la cabecera, así el navegador, al saltar
   al ID, lo posiciona ese desplazamiento más arriba.

   Estructura:
     · Base (interactive)  → toggle on/off + demo de salto a ID
     · Galleries           → caso de uso · explicación mecánica visual
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ─── BASE — toggle on/off ─── */
    const baseArgTypes = [
        { key: "applied", control: "boolean",
          desc: "Aplica .ft-helper-anchor-spacer al target del salto. Sin la clase, una cabecera fija taparía el inicio de la sección." }
    ];
    const baseArgs = { applied: true };
    const liveBase = (a) => {
        const cls = a.applied ? "ft-helper-anchor-spacer" : "";
        // UID por instancia para que el botón "Saltar" funcione aunque el
        // canvas re-renderice con cambios de args.
        const uid = "cb-anchor-" + Math.random().toString(36).slice(2, 8);
        return `<div style="padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:6px;">.${esc(cls || "(sin clase)")}</code>
            <p style="margin:0 0 10px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">
                ${a.applied
                    ? "Con <code>.ft-helper-anchor-spacer</code>: al saltar al ID, el navegador descuenta 11.2rem (≈112px). El título queda visible por debajo de una cabecera fija."
                    : "Sin la clase: el navegador coloca el ID en <code>scroll-top: 0</code>. Si hay una cabecera fija de ~100px arriba, queda tapando."}
            </p>
            <div style="position:relative;height:280px;overflow:auto;background:#fff;border:1px solid #ddd;border-radius:3px;">
                <!-- Cabecera fija simulada dentro del wrapper -->
                <header style="position:sticky;top:0;background:#0050b3;color:#fff;padding:14px;z-index:2;border-bottom:1px solid rgba(255,255,255,.2);">
                    <p style="margin:0;font:600 13px/1.2 sans-serif;">Cabecera sticky (~50px)</p>
                </header>
                <div style="padding:14px;font:400 13px/1.5 sans-serif;color:#444;">
                    <p>Contenido inicial…</p>
                    <p style="height:200px;background:repeating-linear-gradient(45deg,rgba(0,0,0,.04) 0 6px,transparent 6px 12px);padding:10px;">Filler de scroll · ocupa espacio para que haya que desplazar.</p>
                    <a href="#${uid}" style="display:inline-block;background:#fff;color:#0050b3;border:1px solid #0050b3;padding:6px 10px;text-decoration:none;font-weight:700;">Saltar al título ↓</a>
                    <p style="height:300px;background:repeating-linear-gradient(45deg,rgba(0,0,0,.04) 0 6px,transparent 6px 12px);padding:10px;margin-top:14px;">Más filler…</p>
                    <h3 id="${uid}" class="${esc(cls)}" style="background:#fffbe6;padding:8px;border-radius:3px;">
                        Sección de destino (mira si la cabecera la tapa)
                    </h3>
                    <p>Texto de la sección.</p>
                    <p style="height:200px;background:repeating-linear-gradient(45deg,rgba(0,0,0,.04) 0 6px,transparent 6px 12px);padding:10px;">Filler final…</p>
                </div>
            </div>
        </div>`;
    };

    /* ─── Galería: explicación mecánica visual ─── */
    const galleryMechanism = () => {
        return `<section>
            <h3 style="margin:0 0 6px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Cómo funciona</h3>
            <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">
                El SCSS añade un pseudo-elemento <code>:before</code> al target con <code>margin-top: -11.2rem</code> y <code>height: 11.2rem</code>. El navegador, al saltar al ID, posiciona el contenedor del pseudo en <code>scroll-top: 0</code>. Como el pseudo "vive" 11.2rem arriba (margin negativo), el contenido real queda 11.2rem más abajo de la línea de scroll → debajo de una cabecera fija de hasta esa altura.
            </p>
            <pre style="background:#f5f5f5;padding:10px;border-radius:3px;font:500 11.5px/1.4 monospace;overflow:auto;"><code>.ft-helper-anchor-spacer:before {
  content: " ";
  visibility: hidden;
  display: block;
  @include min-screen(768px) {
    margin-top: -11.2rem;
    height: 11.2rem;
  }
}</code></pre>
            <p style="margin:14px 0 0;font:400 12px/1.5 'Inter',sans-serif;color:#666;">
                <strong>Solo aplica desde 768px.</strong> En móvil la cabecera suele no ser fija o cambia de altura → se omite el amortiguador.
            </p>
        </section>
        <section style="margin-top:24px;">
            <h3 style="margin:0 0 6px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Alternativa moderna · scroll-margin-top</h3>
            <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">
                Los navegadores modernos soportan <code>scroll-margin-top</code> (CSS) que resuelve el mismo problema sin pseudo-elementos. El 42DS mantiene este helper por compatibilidad y porque pueden coexistir.
            </p>
        </section>`;
    };

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Anchor</h1>
        <p class="cb-docs__lead">Helper de una sola clase <code>.ft-helper-anchor-spacer</code>: amortiguador para enlaces ancla cuando una cabecera fija tapa el target del salto. Solo desktop (≥768px).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_anchors.scss</code></td><td>Parcial SCSS</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Clase</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Aplica</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-helper-anchor-spacer</code></td><td><code>:before</code> con <code>margin-top: -11.2rem</code> + <code>height: 11.2rem</code> (solo ≥768px)</td></tr>
            </tbody>
        </table>

        <h2>Composición sugerida</h2>
        <pre style="background:#f5f5f5;padding:10px;border-radius:3px;font:500 11.5px/1.4 monospace;overflow:auto;"><code>&lt;a href="#seccion-3"&gt;Ir a sección 3&lt;/a&gt;
…
&lt;h2 id="seccion-3" class="ft-helper-anchor-spacer"&gt;Sección 3&lt;/h2&gt;</code></pre>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Clase única</td><td><code>.ft-helper-anchor-spacer</code></td></tr>
                <tr><td>Mecanismo</td><td>Pseudo-elemento <code>:before</code> con margin negativo</td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_anchors.scss</code> · showroom: <code>fourty/helpers/helper-anchor.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const ANCHOR = {
        id: "anchor",
        name: "Anchor",
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
                    { id: "mechanism", name: "Mecanismo + alternativa", kind: "gallery", full: true, render: galleryMechanism }
                ]
            }
        ]
    };
    window.SB.register(ANCHOR);
    window.SB.loadMarkup(ANCHOR, document.currentScript && document.currentScript.src, { full: true });
})();
