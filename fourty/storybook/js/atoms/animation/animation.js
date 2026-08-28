/* ════════════════════════════════════════════════════════════════════════
   atoms/animation/animation.js — Atoms / Animation
   Casuística REAL de scss/fourties/atoms/animation/_animation.scss
   (clases utilitarias .ft-animation-*). Markup tomado de
   fourty/atoms/atom-animation.html. Cero invención de API.

   ╔══════════════════════════════════════════════════════════════════════╗
   ║  DATA-DRIVEN: la casuística vive en el objeto DATA (SSOT). Añadir/     ║
   ║  quitar una animación = editar el array, no el markup.                 ║
   ╚══════════════════════════════════════════════════════════════════════╝

   OJO · NATURALEZA del átomo:
   · NO es un bloque BEM con modificadores: son 15 CLASES UTILITARIAS sueltas
     (`.ft-animation-fade-in`, `.ft-animation-shake`…) que se aplican a
     CUALQUIER elemento. NO existe un `.ft-animation` "pelado" con estilos:
     es solo el prefijo del namespace.
   · Son animaciones de UNA SOLA reproducción (`animation: … forwards`): se
     disparan al montarse el elemento. El motor re-renderiza el iframe en cada
     cambio de control o de marca → ESE es el mecanismo de "replay" (mismo
     principio del DS: reusar lo nativo, sin JS de trigger propio).
   · El showroom añade JS solo para el botón-disparador del demo; la animación
     en sí es SOLO CSS.
   CONVENCIÓN: la pieza fundamental se llama siempre "Base".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc, spec } = window.SB.helpers;
    const each = (list, fn) => list.map(fn).join("");

    /* ══════════════════════════════════════════════════════════════════════
       ▼▼▼  SINGLE SOURCE OF TRUTH — editar SOLO este array  ▼▼▼
       Refleja 1:1 los selectores de scss/fourties/atoms/animation/_animation.scss.
       [clase sin prefijo, etiqueta, tipo]. Clase real = "ft-animation-" + clave.
       type: in = entrada (acaba visible) · out = salida (acaba oculta/atenuada)
             · emphasis = énfasis (vuelve a su estado inicial).
       ══════════════════════════════════════════════════════════════════════ */
    const DATA = {
        animations: [
            ["blur-out",        "Blur Out",        "out"],
            ["fade-in",         "Fade In",         "in"],
            ["fade-out",        "Fade Out",        "out"],
            ["fade-up",         "Fade Up",         "in"],
            ["flip",            "Flip",            "emphasis"],
            ["flip-out",        "Flip Out",        "out"],
            ["grayscale-out",   "Grayscale Out",   "out"],
            ["liquify-melt-in", "Liquify Melt In", "in"],
            ["press",           "Press",           "emphasis"],
            ["scale-in",        "Scale In",        "in"],
            ["scale-down-in",   "Scale Down In",   "in"],
            ["shake",           "Shake",           "emphasis"],
            ["zoom-blur-in",    "Zoom Blur In",    "in"],
            ["zoom-in",         "Zoom In",         "in"],
            ["zoom-out",        "Zoom Out",        "in"]
        ]
    };
    /* ▲▲▲  fin SINGLE SOURCE OF TRUTH  ▲▲▲ */

    const TYPE_LABEL = { in: "Entrada", out: "Salida", emphasis: "Énfasis" };

    /* ─── Constructores de markup ─── */
    // Pieza de muestra a la que se aplica la animación. La animación es una clase
    // utilitaria → la pinta cualquier elemento; aquí un chip con estilo inline
    // (sin inventar clases .ft-*) y color tomado de la marca (var --color-primary).
    const chip = (cls, label, big) => {
        const box = big
            ? "display:inline-flex;align-items:center;justify-content:center;min-width:140px;min-height:90px;padding:1.5rem 2rem;font:700 1.5rem/1 'Inter',sans-serif;"
            : "display:inline-flex;align-items:center;justify-content:center;width:72px;height:54px;font:700 .9rem/1 'Inter',sans-serif;";
        return `<div class="${cls}" style="${box}background:var(--color-primary,#111);color:var(--color-white,#fff);border-radius:6px;">${esc(label)}</div>`;
    };

    /* ══════════════════════════════════════════════════════════════════════
       BASE — clases .ft-animation-* (utilidad de movimiento sobre un elemento).
       ══════════════════════════════════════════════════════════════════════ */
    const baseArgTypes = [
        { key: "animation", control: "select", desc: "Animación aplicada (.ft-animation-[nombre]). Se reproduce al renderizar.",
          options: DATA.animations.map(a => [a[0], a[1]]) },
        { key: "label", control: "text", desc: "Contenido del elemento de muestra (slot)." }
    ];
    const baseArgs = { animation: "fade-in", label: "42DS" };
    function liveBase(a) {
        const note = `<p style="margin:0 0 12px;font:400 11.5px/1.45 'Inter',sans-serif;color:#6b6b6b;max-width:42ch;">Las animaciones son de <strong>una sola reproducción</strong> (<code>forwards</code>): cambia cualquier control o la marca para reproducirla otra vez. Las de tipo <em>salida</em> (<code>-out</code>) terminan ocultas o atenuadas.</p>`;
        return `<div>${note}${chip("ft-animation-" + a.animation, a.label, true)}</div>`;
    }

    /* ══════════════════════════════════════════════════════════════════════
       GALERÍAS — catálogo por tipo. Cada celda reproduce su animación al montar;
       la etiqueta (estática, fuera del elemento animado) la mantiene identificable
       aunque la animación termine oculta.
       ══════════════════════════════════════════════════════════════════════ */
    const galleryByType = type =>
        DATA.animations.filter(a => a[2] === type)
            .map(a => spec(`${a[1]} · .ft-animation-${a[0]}`, chip("ft-animation-" + a[0], "Aa", false)))
            .join("");

    /* ══════════════════════════════════════════════════════════════════════
       OVERVIEW — documentación técnica (NO incrustar el componente vivo)
       ══════════════════════════════════════════════════════════════════════ */
    const countBy = t => DATA.animations.filter(a => a[2] === t).length;
    const overview = `<div class="cb-docs__inner">
        <h1>Animation</h1>
        <p class="cb-docs__lead">Conjunto de <strong>${DATA.animations.length} clases utilitarias</strong> de movimiento (<code>.ft-animation-*</code>) que se aplican a <strong>cualquier elemento</strong> del DS para darle una animación de una sola reproducción al aparecer: entradas, salidas y énfasis.</p>

        <div class="cb-callout cb-callout--warn">No es un bloque BEM: no existe un <code>.ft-animation</code> "pelado" con estilos. Son ${DATA.animations.length} clases sueltas (<code>.ft-animation-fade-in</code>, <code>.ft-animation-shake</code>…) que se añaden junto a las clases propias del elemento.</div>

        <h2>Dependencias</h2>
        <p>Lo que necesita un proyecto consumidor para renderizar <code>.ft-animation-*</code>:</p>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                    <tr><td><code>brands/[marca]/atoms/animation.css</code></td><td>CSS compilado del átomo (clases + <code>@keyframes</code>)</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                    <tr><td><code>scss/fourties/atoms/animation/_animation.scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar (importa <code>abstracts</code> + <code>vendors/bourbon</code>)</td></tr>
                    <tr><td>—</td><td>JavaScript</td><td>No necesita JS · la animación se dispara al montar el elemento</td></tr>
                </tbody>
            </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong> y <strong>brand-agnóstico</strong>: las variantes por marca (<code>animation-[marca].scss</code>) solo hacen <code>@import "animation"</code>, sin diferencias. El JS del showroom es únicamente el botón-disparador del demo, no parte del átomo.</div>

        <h2>Accesibilidad · reduce motion</h2>
        <div class="cb-callout">El SCSS incluye <code>@media (prefers-reduced-motion: reduce)</code> que anula <code>animation</code>, <code>transition</code> y <code>scroll-behavior</code> globalmente. Si el usuario pide menos movimiento en su sistema, las animaciones no se reproducen.</div>

        <h2>Clases · ${DATA.animations.length} animaciones</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Animación</th><th>Tipo</th></tr></thead>
            <tbody>
                ${each(DATA.animations, a => `<tr><td><code>.ft-animation-${a[0]}</code></td><td>${a[1]}</td><td>${TYPE_LABEL[a[2]]}</td></tr>`)}
            </tbody>
        </table>
        <div class="cb-callout">Tipos: <strong>${countBy("in")} de entrada</strong> (acaban visibles) · <strong>${countBy("out")} de salida</strong> (acaban ocultas/atenuadas) · <strong>${countBy("emphasis")} de énfasis</strong> (vuelven a su estado inicial). <code>zoom-out</code> es, pese al nombre, una entrada (acaba visible).</div>

        <h2>Uso</h2>
        <pre style="background:#f5f5f5;padding:10px;border-radius:3px;font:500 11.5px/1.4 monospace;overflow:auto;"><code>&lt;p class="ft-animation-fade-in"&gt;Aparece con fundido&lt;/p&gt;
&lt;button class="ft-btn ft-btn--primary ft-animation-zoom-in"&gt;Botón&lt;/button&gt;</code></pre>

        <p class="cb-src">Fuente: <code>scss/fourties/atoms/animation/_animation.scss</code> · markup: <code>fourty/atoms/atom-animation.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const ANIMATION = {
        id: "animation",
        name: "Animation",
        group: "Atoms",
        overview,
        stories: [
            { id: "base", name: "Base", hint: ".ft-animation-*", kind: "interactive",
              argTypes: baseArgTypes, args: baseArgs, render: liveBase }
        ],
        subgroups: [
            { id: "galleries", name: "Galleries", collapsed: true,
              stories: [
                  { id: "in", name: "Entradas", hint: `${countBy("in")} animaciones`, kind: "gallery", render: () => galleryByType("in") },
                  { id: "out", name: "Salidas", hint: `${countBy("out")} · acaban ocultas`, kind: "gallery", render: () => galleryByType("out") },
                  { id: "emphasis", name: "Énfasis", hint: `${countBy("emphasis")} · vuelven al inicio`, kind: "gallery", render: () => galleryByType("emphasis") }
              ]
            }
        ]
    };
    window.SB.register(ANIMATION);

    /* Markup HTML editable por el front (subgrupo "Markup") en animation/animation.html */
    window.SB.loadMarkup(ANIMATION, document.currentScript && document.currentScript.src);
})();
