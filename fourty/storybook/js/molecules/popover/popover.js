/* ════════════════════════════════════════════════════════════════════════
   molecules/popover/popover.js — Molecules / Popover
   Casuística REAL de scss/fourties/molecules/popover/_popover.scss (.ft-mol-popover*).
   Markup tomado de fourty/molecules/molecule-popover.html. Cero invención de API.

   Globo flotante anclado a un disparador (.ft-btn-nav): un trigger
   (.ft-popover-open-trigger[data-target]) abre el __content (quita .ft-helper-hide)
   y un botón .ft-popover-close-trigger lo cierra. JS-driven (toggle de clase). El
   Storybook zero-toolchain no carga ese controller → el popover se muestra
   FORZADO VISIBLE (sin .ft-helper-hide) para ver el globo y sus 4 direcciones
   (--top/--bottom/--left/--right). Story "Base" interactiva (dirección · texto) +
   subgrupo "Markup" async (estado real con .ft-helper-hide).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SINGLE SOURCE OF TRUTH — direcciones reales de _popover.scss ($directions) ▼ */
    const DATA = {
        dirs: [
            ["ft-mol-popover__content--top", "--top (arriba)"],
            ["ft-mol-popover__content--bottom", "--bottom (abajo)"],
            ["ft-mol-popover__content--left", "--left (izquierda)"],
            ["ft-mol-popover__content--right", "--right (derecha)"]
        ],
        triggers: [".ft-popover-open-trigger[data-target]", ".ft-popover-close-trigger", ".ft-popover-helper", ".ft-helper-hide"]
    };

    /* ─── BASE — .ft-mol-popover ─── */
    const baseArgTypes = [
        { key: "dir", control: "select", desc: "Dirección del globo respecto al disparador.", options: DATA.dirs },
        { key: "lead", control: "text", desc: "Texto principal del popover (__text)." },
        { key: "link", control: "text", desc: "Texto del enlace (.ft-link)." }
    ];
    const baseArgs = { dir: "ft-mol-popover__content--top", lead: "Noticia guardada en tu perfil", link: "Ver noticias guardadas" };

    function live(a) {
        // Forzado visible: el bloque .ft-mol-popover es display:none en el SCSS (pendiente de
        // implementar la funcionalidad); se fuerza inline-flex y se omite .ft-helper-hide del globo.
        return `<div style="padding:6rem 4rem;display:flex;justify-content:center;">
    <div class="ft-mol-popover" style="display:inline-flex;">
        <button type="button" name="go-to" class="ft-btn-nav ft-btn-nav--favorite ft-btn-nav--bordered ft-popover-open-trigger" data-target="trigger2" title="link title">
            <span class="ft-btn-nav__icon"></span>
        </button>
        <div class="ft-mol-popover__content ${esc(a.dir)} ft-popover-helper" id="trigger2">
            <button type="button" name="close-button" class="ft-btn-nav ft-btn-nav--close ft-popover-close-trigger" title="title text">
                <span class="ft-btn-nav__text">Cerrar</span>
                <span class="ft-btn-nav__icon"></span>
            </button>
            <p class="ft-mol-popover__text ft-helper-fontSize-body-L">${esc(a.lead)}</p>
            <p class="ft-mol-popover__text">
                <a href="#" class="ft-link ft-link--primary" title="title text">${esc(a.link)}</a>
            </p>
        </div>
    </div>
</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Popover</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-popover</code>): globo flotante anclado a un disparador. Un botón <code>.ft-btn-nav</code> abre un <code>__content</code> posicionado en una de cuatro direcciones, con texto y un enlace; un botón de cierre lo oculta.</p>

        <div class="cb-callout"><strong>JS-driven · pendiente de implementar.</strong> En el SCSS el bloque <code>.ft-mol-popover</code> es <code>display:none</code> (con la nota «habilitar <code>inline-flex</code> cuando se implemente la funcionalidad»), y el globo además lleva <code>.ft-helper-hide</code>. El disparador <code>.ft-popover-open-trigger[data-target]</code> debería quitar <code>.ft-helper-hide</code> del <code>__content</code> cuyo <code>id</code> coincide, y <code>.ft-popover-close-trigger</code> volver a ocultarlo. El Storybook no carga ese controller: la story se muestra <strong>forzada visible</strong> (<code>display:inline-flex</code> inline en el bloque + sin <code>.ft-helper-hide</code>). El estado real está en el subgrupo <strong>Markup</strong>.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/popover.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-btn-nav</code> (<code>--favorite</code>, <code>--close</code>, <code>--bordered</code>)</td><td>CSS del átomo Btn Nav</td><td>Siempre (disparador y cierre)</td></tr>
                <tr><td>Controller de popover (toggle de <code>.ft-helper-hide</code>)</td><td>JavaScript</td><td>Abrir/cerrar en producción</td></tr>
                <tr><td><code>scss/fourties/molecules/popover/_popover.scss</code> + <code>popover-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Modificadores (dirección)</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>__content--top</code> · <code>--bottom</code></td><td>globo encima / debajo del disparador</td></tr>
                <tr><td><code>__content--left</code> · <code>--right</code></td><td>globo a la izquierda / derecha</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-popover</code></td></tr>
                <tr><td>Disparador</td><td><code>.ft-btn-nav.ft-popover-open-trigger[data-target]</code></td></tr>
                <tr><td>Globo</td><td><code>.ft-mol-popover__content</code> (+ dirección) · <code>id</code> = <code>data-target</code></td></tr>
                <tr><td>Cierre / texto</td><td><code>.ft-popover-close-trigger</code> · <code>.ft-mol-popover__text</code></td></tr>
            </tbody>
        </table>

        <div class="cb-callout">Familias específicas por marca — <code>popover-ep/epe/regionales/revistas/sport.scss</code> — reestilan el globo según el medio. No se reproducen aquí; cambian con la marca activa.</div>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/popover/_popover.scss</code> · markup: <code>fourty/molecules/molecule-popover.html</code></p>
    </div>`;

    const PO = {
        id: "popover",
        name: "Popover",
        group: "Molecules",
        overview,
        stories: [
            // full: el globo se posiciona absoluto sobre el disparador; necesita margen alrededor
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(PO);

    /* Markup original (HTML plano editable por el front) en popover.html → subgrupo "Markup". */
    window.SB.loadMarkup(PO, document.currentScript && document.currentScript.src, { full: true });
})();
