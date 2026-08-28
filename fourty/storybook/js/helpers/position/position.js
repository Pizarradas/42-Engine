/* ==========================================================================
   helpers/position/position.js - Helpers / Position
   Fuente real: scss/base/helpers/_position.scss
   ========================================================================== */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    const DATA = {
        positions: [
            ["relative", "relative - contexto para hijos absolute"],
            ["absolute", "absolute - saca del flujo, anclado al ancestor relative mas cercano"],
            ["fixed", "fixed - anclado al viewport"],
            ["sticky", "sticky - normal hasta cruzar el top, luego se ancla (incluye top:0 + z-index 9999)"]
        ]
    };
    const POSITION_VALUES = DATA.positions.map(p => p[0]);

    const labelOf = (p) => DATA.positions.find(d => d[0] === p)[1];

    const previewRelative = () =>
        `<div style="background:#f5f5f5;padding:14px;border:1px dashed #999;border-radius:3px;">
            <p style="margin:0 0 8px;font:400 11px/1.3 'Inter',sans-serif;color:#666;">Contexto: hijo absolute usa al padre relative como ancla.</p>
            <div class="ft-helper-position-relative" style="height:80px;background:#fff;border:1px solid #ddd;border-radius:3px;">
                <span style="position:absolute;top:8px;right:8px;background:#0050b3;color:#fff;padding:4px 8px;border-radius:3px;font:600 11px/1 sans-serif;">absolute top:8 right:8</span>
            </div>
        </div>`;

    const previewAbsolute = () =>
        `<div style="background:#f5f5f5;padding:14px;border:1px dashed #999;border-radius:3px;">
            <p style="margin:0 0 8px;font:400 11px/1.3 'Inter',sans-serif;color:#666;">Saca del flujo; se ancla al ancestor con position relative/absolute/fixed.</p>
            <div style="position:relative;height:80px;background:#fff;border:1px solid #ddd;border-radius:3px;">
                <span class="ft-helper-position-absolute" style="top:8px;left:8px;background:#0050b3;color:#fff;padding:4px 8px;border-radius:3px;font:600 11px/1 sans-serif;">.position-absolute top:8 left:8</span>
                <span style="display:inline-block;margin:32px 0 0 12px;color:#999;font:400 12px/1.3 sans-serif;">Contenido normal (sigue en flujo)</span>
            </div>
        </div>`;

    const previewFixed = () =>
        `<div style="background:#f5f5f5;padding:14px;border:1px dashed #999;border-radius:3px;">
            <p style="margin:0 0 8px;font:400 11px/1.3 'Inter',sans-serif;color:#666;">Anclado al viewport. En el storybook lo dibujamos con position:absolute para no superponernos con el chrome.</p>
            <div style="position:relative;height:80px;background:#fff;border:1px solid #ddd;border-radius:3px;">
                <span style="position:absolute;bottom:8px;right:8px;background:#0050b3;color:#fff;padding:4px 8px;border-radius:3px;font:600 11px/1 sans-serif;">.position-fixed bottom:8 right:8</span>
                <span style="display:inline-block;margin:12px;color:#999;font:400 12px/1.3 sans-serif;">En produccion se veria siempre visible al scrollear.</span>
            </div>
        </div>`;

    const previewSticky = () =>
        `<div style="background:#f5f5f5;padding:14px;border:1px dashed #999;border-radius:3px;">
            <p style="margin:0 0 8px;font:400 11px/1.3 'Inter',sans-serif;color:#666;">Normal hasta cruzar <code>top:0</code>; entonces se ancla. Aplica tambien <code>z-index: 9999</code>. Si vive bajo <code>.behavior-parent(sticky)</code>, el top pasa a 60px.</p>
            <div style="height:140px;overflow:auto;background:#fff;border:1px solid #ddd;border-radius:3px;">
                <div class="ft-helper-position-sticky" style="background:#0050b3;color:#fff;padding:8px 12px;font:600 12px/1.3 sans-serif;">Cabecera sticky (scroll abajo)</div>
                <div style="padding:8px 12px;font:400 12px/1.6 sans-serif;color:#444;height:300px;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>
                    Vivamus lacinia odio vitae vestibulum vestibulum.<br>
                    Cras venenatis euismod malesuada.<br>
                    Aliquam erat volutpat. Donec mollis hendrerit risus.<br>
                    Sed posuere consectetur est at lobortis.<br>
                    Phasellus iaculis neque vel arcu hendrerit.<br>
                    (Scroll para ver el efecto sticky.)
                </div>
            </div>
        </div>`;

    const PREVIEW = (p) =>
        p === "relative" ? previewRelative() :
        p === "absolute" ? previewAbsolute() :
        p === "fixed" ? previewFixed() :
        previewSticky();

    const baseArgTypes = [
        {
            key: "position",
            control: "select",
            desc: "Tipo de posicionamiento (.ft-helper-position-[relative|absolute|fixed|sticky]).",
            options: DATA.positions
        }
    ];
    const baseArgs = { position: "relative" };

    const liveBase = (a) => {
        return `<div style="padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:6px;">.ft-helper-position-${esc(a.position)}</code>
            <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">${esc(labelOf(a.position))}</p>
            ${PREVIEW(a.position)}
        </div>`;
    };

    const galleryAll = () => {
        return POSITION_VALUES.map(p => {
            const cls = "ft-helper-position-" + p;
            return `<section style="margin-bottom:24px;">
                <h3 style="margin:0 0 4px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">.${cls}</h3>
                <p style="margin:0 0 8px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">${esc(labelOf(p))}</p>
                ${PREVIEW(p)}
            </section>`;
        }).join("");
    };

    const overview = `<div class="cb-docs__inner">
        <h1>Position</h1>
        <p class="cb-docs__lead">Familia <code>.ft-helper-position-*</code> del 42DS. 4 clases para fijar el <code>position</code> sin escribir CSS inline. <code>sticky</code> incluye ademas <code>top:0</code> y <code>z-index 9999</code> precableados, mas un behavior-parent para cabeceras anidadas.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuando</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS - variables</td><td>Siempre - <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_position.scss</code></td><td>Parcial SCSS</td><td>Solo para compilar</td></tr>
                <tr><td>-</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Clases</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Aplica</th><th>Notas</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-helper-position-relative</code></td><td><code>position: relative</code></td><td>Crea contexto para hijos absolute</td></tr>
                <tr><td><code>.ft-helper-position-absolute</code></td><td><code>position: absolute</code></td><td>Sin offsets - anadirlos con estilo inline o componer con otros helpers</td></tr>
                <tr><td><code>.ft-helper-position-fixed</code></td><td><code>position: fixed</code></td><td>Anclado al viewport</td></tr>
                <tr><td><code>.ft-helper-position-sticky</code></td><td><code>position: sticky</code> + <code>top: 0</code> + <code>z-index: 9999</code></td><td>Bajo <code>behavior-parent(sticky)</code>, top pasa a 60px.</td></tr>
            </tbody>
        </table>
        <div class="cb-callout">Existe tambien <code>.ft-helper-affix</code> (familia separada) que equivale a <code>position: fixed</code> sin mas. Es una alternativa semantica; ver el helper <em>Affix</em>.</div>

        <h2>Composicion</h2>
        <p>Las clases position no definen offsets (<code>top/right/bottom/left</code>) - combinalas con un wrapper o con utilidades propias del consumidor para fijar la posicion exacta.</p>

        <h2>Anatomia</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Prefijo</td><td><code>.ft-helper-position-</code></td></tr>
                <tr><td>Valor</td><td><code>relative</code> - <code>absolute</code> - <code>fixed</code> - <code>sticky</code></td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_position.scss</code></p>
    </div>`;

    const POSITION = {
        id: "position",
        name: "Position",
        group: "Helpers",
        overview,
        stories: [
            {
                id: "base",
                name: "Base",
                kind: "interactive",
                full: true,
                argTypes: baseArgTypes,
                args: baseArgs,
                render: liveBase
            }
        ],
        subgroups: [
            {
                id: "galleries",
                name: "Galleries",
                collapsed: true,
                stories: [
                    { id: "all", name: "Todas las positions", kind: "gallery", full: true, render: galleryAll }
                ]
            }
        ]
    };
    window.SB.register(POSITION);
    window.SB.loadMarkup(POSITION, document.currentScript && document.currentScript.src, { full: true });
})();
