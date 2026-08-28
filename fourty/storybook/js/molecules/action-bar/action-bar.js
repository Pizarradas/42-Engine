/* ════════════════════════════════════════════════════════════════════════
   molecules/action-bar/action-bar.js — Molecules / Action Bar
   Casuística REAL de scss/fourties/molecules/action-bar/_action-bar.scss
   (.ft-mol-action-bar*). Markup tomado de fourty/molecules/molecule-action-bar.html.
   Cero invención de API.

   Componente JS-DRIVEN en producción: un controller (con GSAP) instanciado por
   [data-action-bar-auto] actualiza el contador (.update({count})), togglea
   __badge--empty/--pulsing y la animación del CTA. El storybook es zero-toolchain
   y NO carga ese controller → reproducimos los ESTADOS de forma estática y honesta:
   el control "count" (number) re-renderiza la barra con cada valor (mismo efecto
   visual que el demo del showroom, sin el JS). La dependencia se documenta en el
   overview. --sticky (position:fixed) es posicional → subgrupo "Markup".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc, frameworkBlock } = window.SB.helpers;

    /* ▼ SINGLE SOURCE OF TRUTH — piezas/modificadores reales de _action-bar.scss ▼ */
    const DATA = {
        parts: ["__actions", "__review", "__review-text", "__badge", "__button"],
        // .ft-mol-action-bar(__badge)?--[modificador]
        mods: [
            ["--sticky", "anclada al viewport (position:fixed, abajo-centro)"],
            ["__badge--empty", "contador a 0 (fondo blanco) · lo aplica el controller"],
            ["__badge--pulsing", "pulso al cambiar el contador · lo aplica el controller"]
        ]
    };

    /* ─── BASE — .ft-mol-action-bar (barra de acciones flotante) ─── */
    const baseArgTypes = [
        { key: "count", control: "number", desc: "Nº de elementos seleccionados (badge). En 0 el badge usa --empty.", min: 0, max: 99 },
        { key: "reviewText", control: "text", desc: "Texto del botón de revisión (__review-text)." },
        { key: "buttonText", control: "text", desc: "Texto del CTA principal (__button)." }
    ];
    const baseArgs = { count: "3", reviewText: "Ver seleccionadas", buttonText: "Continuar" };

function live(a) {
        const n = Math.max(0, Math.min(99, parseInt(a.count, 10) || 0));
        const badgeCls = ["ft-mol-action-bar__badge"];
        if (n === 0) badgeCls.push("ft-mol-action-bar__badge--empty");
        const label = `Ver ${n} elementos seleccionados`;
        return `<div class="ft-mol-action-bar" role="toolbar" aria-label="${esc(label)}">
    <div class="ft-mol-action-bar__actions">
        <button type="button" class="ft-mol-action-bar__review" aria-label="${esc(label)}">
            <span class="${badgeCls.join(" ")}" aria-hidden="true">${n}</span>
            <span class="ft-mol-action-bar__review-text">${esc(a.reviewText)}</span>
        </button>
        <button type="button" class="ft-mol-action-bar__button">${esc(a.buttonText)}</button>
    </div>
</div>`;
    }

    const framework = frameworkBlock({
        intro: `El patron recomendado es que Vue o React sean duenios del <code>count</code> y del CTA visible, dejando el controller del DS solo para animaciones o para proyectos que quieran mantener la API <code>.update()</code>.`,
        rows: [
            ["Estado", `Expone <code>count</code> como prop o estado reactivo y deriva desde ahi badge, texto y CTA.`, `Expone <code>count</code> como prop o estado y deriva desde ahi badge, texto y CTA.`],
            ["Controller opcional", `Si reutilizas <code>FTMolActionBar</code>, inicializalo una sola vez en <code>onMounted()</code> y actualizalo por metodo.`, `Si reutilizas <code>FTMolActionBar</code>, inicializalo una sola vez en <code>useEffect()</code> y actualizalo por metodo.`],
            ["Cleanup", `Destruye controller y timelines GSAP en <code>onBeforeUnmount()</code>.`, `Destruye controller y timelines GSAP en el cleanup del efecto.`]
        ],
        note: `En interfaces altamente reactivas suele ser mas estable dejar el controller solo para la animacion y que el framework pinte el estado visual.`
    });

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Action Bar</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-action-bar</code>): barra de acciones flotante en forma de píldora con un contador (<code>__badge</code>), un botón de revisión y un CTA. Pensada para selecciones múltiples (p.ej. localidades).</p>

        <div class="cb-callout"><strong>Componente JS-driven.</strong> En producción un <em>controller</em> (con GSAP) instanciado por <code>[data-action-bar-auto]</code> actualiza el contador vía <code>.update({ count })</code> y togglea <code>__badge--empty</code>, <code>__badge--pulsing</code> y la animación del CTA. El storybook es <strong>zero-toolchain</strong> y no carga ese JS: el control <strong>count</strong> reproduce cada estado de forma estática (mismo resultado visual, sin el controller).</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/action-bar.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td>GSAP + controller <code>FTMolActionBar</code> + autoinit</td><td>JavaScript</td><td>Solo si necesitas el contador dinámico (<code>.update()</code>) y las animaciones</td></tr>
                <tr><td><code>scss/fourties/molecules/action-bar/_action-bar.scss</code> + <code>action-bar-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
            </tbody>
        </table>
        </div>
        ${framework}

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>píldora flotante con sombra y animación de entrada</td></tr>
                <tr><td><code>--sticky</code></td><td>anclada al viewport (<code>position:fixed</code>, abajo-centro) — ver <strong>Markup</strong></td></tr>
                <tr><td><code>__badge--empty</code></td><td>contador a 0: fondo blanco (lo aplica el controller)</td></tr>
                <tr><td><code>__badge--pulsing</code></td><td>pulso al cambiar el contador (lo aplica el controller)</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-action-bar</code> (<code>role="toolbar"</code>)</td></tr>
                <tr><td>Acciones</td><td><code>.ft-mol-action-bar__actions</code></td></tr>
                <tr><td>Botón revisión</td><td><code>.ft-mol-action-bar__review</code></td></tr>
                <tr><td>Contador</td><td><code>.ft-mol-action-bar__badge</code></td></tr>
                <tr><td>Texto revisión</td><td><code>.ft-mol-action-bar__review-text</code></td></tr>
                <tr><td>CTA</td><td><code>.ft-mol-action-bar__button</code></td></tr>
            </tbody>
        </table>

        <div class="cb-callout">Respeta <code>prefers-reduced-motion</code>: con esa preferencia se desactivan las animaciones de entrada, pulso y ping. Reserva espacio al final del <code>body</code> (<code>body:has(--sticky)</code>) y libera el sticky cuando hay un input con foco en móvil (teclado virtual).</div>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/action-bar/_action-bar.scss</code> · markup: <code>fourty/molecules/molecule-action-bar.html</code></p>
    </div>`;

    const AB = {
        id: "action-bar",
        name: "Action Bar",
        group: "Molecules",
        signals: ["js"],
        overview,
        stories: [
            // width:max-content → la barra NO ocupa todo el ancho; sin full
            { id: "base", name: "Base", kind: "interactive", argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(AB);

    /* Markup original (HTML plano editable por el front) en action-bar.html → subgrupo "Markup".
       full: true → --sticky (position:fixed) necesita el ancho del stage para anclarse. */
    window.SB.loadMarkup(AB, document.currentScript && document.currentScript.src, { full: true });
})();
