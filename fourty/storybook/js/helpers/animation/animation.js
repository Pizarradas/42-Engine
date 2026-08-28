/* ════════════════════════════════════════════════════════════════════════
   helpers/animation/animation.js — Helpers / Animation
   Casuística REAL de scss/base/helpers/_animations.scss (.ft-helper-animation-*).
   6 animaciones predefinidas: 5 fades direccionales + 1 scaleIn. Todas con
   `animation-fill-mode: both` (mantiene el estado final tras ejecutar).

   Animaciones disponibles:
     · fadeIn       · 1.2s · cubic-bezier(0.25, 0.1, 0.25, 0.5)
     · fadeInTop    · 1.2s · cubic-bezier(0.39, 0.575, 0.565, 1)
     · fadeInRgt    · 1.2s · "
     · fadeInBttm   · 1.2s · "
     · fadeInLft    · 1.2s · "
     · scaleIn      · 0.25s · cubic-bezier(0.25, 0.46, 0.45, 0.94)

   Como las animaciones se ejecutan al cargar (con fill-mode both quedan
   "fijadas"), el demo del storybook fuerza un re-mount con un toggle/key para
   que se puedan ver tantas veces como se quiera.

   Estructura:
     · Base (interactive)  → selector + botón "Reproducir" que re-monta
     · Galleries           → todas las animaciones en grid, replay global
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SSOT — 1:1 con _animations.scss ▼ */
    const DATA = {
        animations: [
            ["fadeIn",     "fadeIn · opacity 0→1 · 1.2s"],
            ["fadeInTop",  "fadeInTop · desde arriba · 1.2s"],
            ["fadeInRgt",  "fadeInRgt · desde derecha · 1.2s"],
            ["fadeInBttm", "fadeInBttm · desde abajo · 1.2s"],
            ["fadeInLft",  "fadeInLft · desde izquierda · 1.2s"],
            ["scaleIn",    "scaleIn · scale 0→1 · 0.25s"]
        ]
    };
    const ANIM_KEYS = DATA.animations.map(a => a[0]);

    /* ─── Viz helpers ─── */
    // Pasamos un `nonce` que el botón "Reproducir" del demo cambia. El motor
    // ya re-rendera el canvas cuando los args cambian, así que con cambiar el
    // valor de `nonce` forzamos un re-mount y la animación se reproduce de
    // nuevo (porque el elemento desaparece y vuelve con la clase).
    const TARGET = (key, nonce, label, big) => {
        return `<div class="ft-helper-animation-${esc(key)}" data-nonce="${esc(nonce)}"
                     style="background:#0050b3;color:#fff;padding:${big ? "20px 24px" : "10px 14px"};border-radius:3px;font:600 ${big ? "16" : "12"}px/1.3 sans-serif;display:inline-block;">
            ${esc(label)}
        </div>`;
    };

    /* ─── BASE — selector + replay ─── */
    const baseArgTypes = [
        { key: "animation", control: "select",
          desc: "Animación predefinida (.ft-helper-animation-[key]).",
          options: DATA.animations },
        { key: "replay", control: "number",
          desc: "Aumenta este número (o usa los flechas del input) para forzar replay. Cada cambio re-renderiza el elemento.",
          min: 0, max: 999, step: 1 }
    ];
    const baseArgs = { animation: "fadeInTop", replay: 0 };
    const liveBase = (a) => {
        return `<div style="padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:10px;">.ft-helper-animation-${esc(a.animation)}</code>
            <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">
                Cambia el control <code>replay</code> (o cualquier otro) para forzar un re-mount. Las animaciones tienen <code>fill-mode: both</code> → quedan en su estado final al terminar.
            </p>
            <div style="min-height:120px;display:flex;align-items:center;justify-content:center;background:#f5f5f5;border-radius:3px;overflow:hidden;">
                ${TARGET(a.animation, a.replay, "Target animado", true)}
            </div>
        </div>`;
    };

    /* ─── Galería: todas las animaciones simultáneas ─── */
    const galleryAll = () => {
        // No tenemos control aquí, pero cada vez que el usuario entra en esta
        // story el motor re-renderiza → todas se reproducen una vez.
        const nonce = String(Date.now());
        const grid = ANIM_KEYS.map(k => `<div style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;">
            <code style="font:500 10.5px/1.2 monospace;color:#0f62fe;">.ft-helper-animation-${k}</code>
            <div style="min-height:80px;display:flex;align-items:center;background:#f5f5f5;border-radius:3px;padding:12px;width:100%;overflow:hidden;">
                ${TARGET(k, nonce, k, false)}
            </div>
        </div>`).join("");
        return `<section>
            <h3 style="margin:0 0 6px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Todas las animaciones</h3>
            <p style="margin:0 0 14px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">Se reproducen al entrar en la story. Recarga la página o navega a otra story y vuelve para verlas otra vez.</p>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:18px;">
                ${grid}
            </div>
        </section>`;
    };

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Animation</h1>
        <p class="cb-docs__lead">Familia <code>.ft-helper-animation-*</code> del 42DS. 6 animaciones predefinidas: 5 fades direccionales + 1 scaleIn. Todas con <code>fill-mode: both</code> (mantienen el estado final).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_animations.scss</code></td><td>Parcial SCSS</td><td>Solo para compilar</td></tr>
                <tr><td><code>@keyframes fadeIn/fadeInTop/...</code></td><td>Keyframes en abstracts</td><td>Definidos por el mixin <code>animate</code> del DS</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS (la animación corre al renderizar)</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Animaciones</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Duración</th><th>Easing</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-helper-animation-fadeIn</code></td><td>1.2s</td><td>cubic-bezier(0.25, 0.1, 0.25, 0.5)</td><td>Opacidad 0 → 1</td></tr>
                <tr><td><code>.ft-helper-animation-fadeInTop</code></td><td>1.2s</td><td>cubic-bezier(0.39, 0.575, 0.565, 1)</td><td>Desde arriba</td></tr>
                <tr><td><code>.ft-helper-animation-fadeInRgt</code></td><td>1.2s</td><td>"</td><td>Desde la derecha</td></tr>
                <tr><td><code>.ft-helper-animation-fadeInBttm</code></td><td>1.2s</td><td>"</td><td>Desde abajo</td></tr>
                <tr><td><code>.ft-helper-animation-fadeInLft</code></td><td>1.2s</td><td>"</td><td>Desde la izquierda</td></tr>
                <tr><td><code>.ft-helper-animation-scaleIn</code></td><td>0.25s</td><td>cubic-bezier(0.25, 0.46, 0.45, 0.94)</td><td>Scale 0 → 1</td></tr>
            </tbody>
        </table>

        <h2>Comportamiento</h2>
        <ul>
            <li><code>animation-fill-mode: both</code> → mantienen el estado inicial antes y final después.</li>
            <li>Sin <code>animation-delay</code> ni <code>iteration-count</code> custom — corre 1 vez al entrar en escena.</li>
            <li>Para replay con JS: alterna la clase (eliminar y reañadir) o usa <code>animation-name: none → name</code>.</li>
        </ul>

        <h2>Accesibilidad</h2>
        <div class="cb-callout">
            Estas animaciones <strong>NO</strong> contemplan <code>prefers-reduced-motion</code> en el SCSS canónico. Si tu pieza necesita respetarlo, envuelve la clase en una media query del consumidor:
            <pre style="background:#fff;padding:8px;border-radius:3px;font:500 11.5px/1.4 monospace;margin:8px 0 0;">@media (prefers-reduced-motion: reduce) {
  .ft-helper-animation-fadeIn { animation: none; }
}</pre>
        </div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Prefijo</td><td><code>.ft-helper-animation-</code></td></tr>
                <tr><td>Keys</td><td><code>fadeIn</code> · <code>fadeInTop</code> · <code>fadeInRgt</code> · <code>fadeInBttm</code> · <code>fadeInLft</code> · <code>scaleIn</code></td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_animations.scss</code> · showroom: <code>fourty/helpers/helper-animation.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const ANIMATION = {
        id: "animation",
        name: "Animation",
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
                    { id: "all", name: "Todas (replay al entrar)", kind: "gallery", full: true, render: galleryAll }
                ]
            }
        ]
    };
    window.SB.register(ANIMATION);
    window.SB.loadMarkup(ANIMATION, document.currentScript && document.currentScript.src, { full: true });
})();
