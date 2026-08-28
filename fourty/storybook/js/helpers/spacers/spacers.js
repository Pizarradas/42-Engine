/* =======================================================================
   helpers/spacers/spacers.js - Helpers / Spacers
   Source of truth: scss/base/helpers/_spacers.scss (.ft-helper-spacer-*)

   Intentional structure:
   - One interactive story per common use case
   - Exhaustive galleries for the full matrix
   - Canonical HTML in Code via story.code, never the visual harness
   ======================================================================= */
(function () {
    "use strict";

    const { esc } = window.SB.helpers;

    const DATA = {
        padAxes: [
            ["y", "Vertical (top + bottom)"],
            ["t", "Top"],
            ["b", "Bottom"]
        ],
        padSizesCommon: [
            ["0", "0"],
            ["auto", "auto"],
            ["xxs", "xxs"],
            ["xs", "xs"],
            ["sm", "sm"],
            ["md", "md"],
            ["lg", "lg"],
            ["xlg", "xlg"]
        ],
        padSizesTopOnly: [["xxlg", "xxlg (solo top)"]],
        padSizesBase: [
            ["xxs", "xxs"],
            ["xs", "xs"],
            ["sm", "sm"],
            ["md", "md"],
            ["lg", "lg"],
            ["xlg", "xlg"]
        ],
        gapAxes: [
            ["y", "Vertical"],
            ["t", "Top"],
            ["b", "Bottom"]
        ],
        gapSizesBase: [
            ["xxs", "xxs"],
            ["xs", "xs"],
            ["sm", "sm"],
            ["md", "md"],
            ["lg", "lg"],
            ["xlg", "xlg"]
        ],
        gapSizesAll: [
            ["0", "0 (solo gap-y)"],
            ["xxs", "xxs"],
            ["xs", "xs"],
            ["sm", "sm"],
            ["md", "md"],
            ["lg", "lg"],
            ["xlg", "xlg"]
        ],
        innerModes: [
            ["inner", "Todos los lados"],
            ["inner-y", "Solo vertical"]
        ],
        innerSizesBase: [
            ["xxs", "xxs"],
            ["xs", "xs"],
            ["sm", "sm"],
            ["md", "md"],
            ["lg", "lg"],
            ["xlg", "xlg"]
        ],
        innerSizesAll: [
            ["0", "0 (solo inner-y)"],
            ["xxs", "xxs"],
            ["xs", "xs"],
            ["sm", "sm"],
            ["md", "md"],
            ["lg", "lg"],
            ["xlg", "xlg"]
        ],
        viewportSteps: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        offsetAxes: [
            ["voffset", "Vertical overlap"],
            ["hoffset", "Horizontal overlap"]
        ],
        offsetSizes: [
            ["xs", "xs"],
            ["sm", "sm"],
            ["md", "md"],
            ["lg", "lg"],
            ["xlg", "xlg"]
        ]
    };

    const VIZ_BG = "background:repeating-linear-gradient(45deg,rgba(0,0,0,.04) 0 6px,transparent 6px 12px);";
    const FRAME = (inner, extra) =>
        `<div style="${VIZ_BG}border:1px dashed #999;border-radius:3px;min-width:280px;${extra || ""}">${inner}</div>`;
    const REF = (label) =>
        `<div style="background:rgba(0,0,0,.08);color:#555;font:500 11px/1.4 monospace;padding:6px 10px;border-radius:2px;">${esc(label)}</div>`;
    const TOKEN = (cls) =>
        `<code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:6px;">.${esc(cls)}</code>`;
    const META = (text) =>
        `<p style="margin:0 0 8px;font:400 11.5px/1.4 sans-serif;color:#666;">${text}</p>`;

    const padBlock = (cls, label) =>
        `<div class="${esc(cls)}">
            <div style="background:var(--color-primary,#0050b3);color:#fff;font:600 12px/1.3 monospace;padding:10px 12px;border-radius:2px;">
                ${esc(label)}
            </div>
        </div>`;

    const marginBlock = (cls, label, extraStyle) =>
        `<div class="${esc(cls)}" style="background:var(--color-primary,#0050b3);color:#fff;font:600 12px/1.3 monospace;padding:10px 12px;border-radius:2px;${extraStyle || ""}">
            ${esc(label)}
        </div>`;

    const codeJoin = (lines) => lines.join("\n");

    const codeDirectional = (a) => {
        const cls = `ft-helper-spacer-${a.axis}-${a.size}`;
        return codeJoin([
            `<section class="${cls}">`,
            "  <div>Contenido del bloque</div>",
            "</section>"
        ]);
    };

    const codeGap = (a) => {
        const cls = `ft-helper-spacer-gap-${a.axis}-${a.size}`;
        return codeJoin([
            "<div>Elemento anterior</div>",
            `<div class="${cls}">Bloque separado</div>`,
            "<div>Elemento siguiente</div>"
        ]);
    };

    const codeInner = (a) => {
        const cls = `ft-helper-spacer-${a.mode}-${a.size}`;
        return codeJoin([
            `<section class="${cls}">`,
            "  <div>Contenido interior</div>",
            "</section>"
        ]);
    };

    const codeViewport = (a) => {
        const cls = `ft-helper-spacer-b-vp-${a.step}`;
        return codeJoin([
            `<div class="${cls}">`,
            "  CTA o bloque que necesita aire relativo al viewport",
            "</div>"
        ]);
    };

    const codeOffset = (a) => {
        const cls = `ft-helper-spacer-${a.axis}-${a.size}`;
        const tag = a.axis === "hoffset" ? "blockquote" : "section";
        return codeJoin([
            `<${tag} class="${cls}">`,
            "  Bloque solapado",
            `</${tag}>`
        ]);
    };

    const codeClear = () => codeJoin([
        "<!-- Despues de un float heredado -->",
        '<div class="ft-helper-spacer-clear"></div>'
    ]);

    const directionalArgTypes = [
        {
            key: "axis",
            control: "radio",
            desc: "Donde reservas espacio en el contenedor.",
            options: DATA.padAxes
        },
        {
            key: "size",
            control: "select",
            desc: "Escala mas usada. Los casos especiales 0, auto y xxlg quedan documentados en Galleries.",
            options: DATA.padSizesBase
        },
        {
            key: "label",
            control: "text",
            desc: "Texto del bloque interior para la demo."
        }
    ];
    const directionalArgs = { axis: "y", size: "md", label: "Contenido" };
    const liveDirectional = (a) => {
        const cls = `ft-helper-spacer-${a.axis}-${a.size}`;
        return `${TOKEN(cls)}${META("El helper vive en el wrapper exterior; el bloque azul representa el contenido real.")}${FRAME([
            REF("anterior"),
            padBlock(cls, a.label),
            REF("siguiente")
        ].join(""))}`;
    };

    const gapArgTypes = [
        {
            key: "axis",
            control: "radio",
            desc: "En que eje separas el bloque respecto a sus hermanos.",
            options: DATA.gapAxes
        },
        {
            key: "size",
            control: "select",
            desc: "Escala de separacion. gap-y-0 queda en Galleries como caso de reset.",
            options: DATA.gapSizesBase
        },
        {
            key: "label",
            control: "text",
            desc: "Texto del elemento afectado."
        }
    ];
    const gapArgs = { axis: "y", size: "md", label: "Elemento separado" };
    const liveGap = (a) => {
        const cls = `ft-helper-spacer-gap-${a.axis}-${a.size}`;
        return `${TOKEN(cls)}${META("Usalo cuando el espacio debe abrirse entre hermanos, no dentro del bloque.")}${FRAME([
            REF("hermano anterior"),
            marginBlock(cls, a.label),
            REF("hermano siguiente")
        ].join(""))}`;
    };

    const innerArgTypes = [
        {
            key: "mode",
            control: "radio",
            desc: "Si el padding afecta a todo el bloque o solo al eje vertical.",
            options: DATA.innerModes
        },
        {
            key: "size",
            control: "select",
            desc: "Escala principal. inner-y-0 se conserva en Galleries como reset.",
            options: DATA.innerSizesBase
        },
        {
            key: "label",
            control: "text",
            desc: "Texto del contenido interior."
        }
    ];
    const innerArgs = { mode: "inner", size: "md", label: "Contenido interior" };
    const liveInner = (a) => {
        const cls = `ft-helper-spacer-${a.mode}-${a.size}`;
        return `${TOKEN(cls)}${META("Ideal para dar respiro al contenido de un contenedor ya existente.")}<div style="${VIZ_BG}border:1px dashed #999;border-radius:3px;display:inline-block;min-width:280px;">
            <div class="${esc(cls)}">
                <div style="background:var(--color-primary,#0050b3);color:#fff;font:600 12px/1.3 monospace;padding:10px 12px;border-radius:2px;">
                    ${esc(a.label)}
                </div>
            </div>
        </div>`;
    };

    const viewportArgTypes = [
        {
            key: "step",
            control: "select",
            desc: "Separacion relativa al alto visible del viewport (dvh).",
            options: DATA.viewportSteps.map((n) => [String(n), `${n}dvh`])
        }
    ];
    const viewportArgs = { step: "30" };
    const liveViewport = (a) => {
        const cls = `ft-helper-spacer-b-vp-${a.step}`;
        const fakeHeight = Math.max(18, Math.round(Number(a.step) * 1.2));
        return `${TOKEN(cls)}${META("La altura visible es orientativa; la clase real aplica margin-bottom en dvh.")}${FRAME([
            REF("contenido superior"),
            marginBlock(cls, `${a.step}dvh`, `height:${fakeHeight}px;display:inline-flex;align-items:center;`),
            REF("contenido inferior")
        ].join(""), "padding:8px;")}`;
    };

    const offsetArgTypes = [
        {
            key: "axis",
            control: "radio",
            desc: "Vertical solapa hacia arriba; horizontal desplaza a la izquierda desde 768px.",
            options: DATA.offsetAxes
        },
        {
            key: "size",
            control: "select",
            desc: "Intensidad del solape.",
            options: DATA.offsetSizes
        },
        {
            key: "label",
            control: "text",
            desc: "Texto del bloque solapado."
        }
    ];
    const offsetArgs = { axis: "voffset", size: "md", label: "Bloque solapado" };
    const liveOffset = (a) => {
        const cls = `ft-helper-spacer-${a.axis}-${a.size}`;
        const note = a.axis === "hoffset"
            ? "Solo se activa desde 768px; cambia Viewport para comprobar el desplazamiento."
            : "Util para hacer overlap editorial sin CSS ad hoc.";
        return `${TOKEN(cls)}${META(note)}${FRAME(`
            <div style="padding:14px;overflow:hidden;">
                ${REF("referencia")}
                ${marginBlock(cls, a.label, "display:inline-block;margin-top:8px;")}
            </div>
        `)}`;
    };

    const clearCode = codeClear();
    const renderClear = () => `${TOKEN("ft-helper-spacer-clear")}${META("Helper de compatibilidad para limpiar floats heredados.")}${FRAME(`
        <div style="overflow:hidden;background:#f8f8f8;border-radius:3px;padding:8px;">
            <div style="float:left;width:56px;height:56px;background:#999;border-radius:3px;margin-right:8px;"></div>
            <p style="margin:0;font:14px/1.4 sans-serif;">Texto que envuelve el float.</p>
            <div class="ft-helper-spacer-clear"></div>
            <p style="margin:8px 0 0;font:14px/1.4 sans-serif;color:#555;">Despues del clear, el flujo vuelve a la normalidad.</p>
        </div>
    `)}`;

    function galleryPaddingDirs() {
        return DATA.padAxes.map(([axis, axisLabel]) => {
            const sizes = DATA.padSizesCommon.concat(axis === "t" ? DATA.padSizesTopOnly : []);
            const cells = sizes.map(([size, sizeLabel]) => {
                const cls = `ft-helper-spacer-${axis}-${size}`;
                return `<div style="display:flex;flex-direction:column;gap:4px;">
                    <code style="font:500 10px/1.2 monospace;color:#555;">.${cls}</code>
                    <span style="font:400 11px/1.3 sans-serif;color:#777;">${sizeLabel}</span>
                    ${FRAME([REF("anterior"), padBlock(cls, "contenido"), REF("siguiente")].join(""))}
                </div>`;
            }).join("");
            return `<section style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px;">
                <h3 style="font:600 13px/1.2 sans-serif;margin:0;color:#161616;">${axisLabel}</h3>
                <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:18px;">${cells}</div>
            </section>`;
        }).join("");
    }

    function galleryGap() {
        return DATA.gapAxes.map(([axis, axisLabel]) => {
            const sizes = axis === "y"
                ? DATA.gapSizesAll
                : DATA.gapSizesAll.filter(([size]) => size !== "0");
            const cells = sizes.map(([size, sizeLabel]) => {
                const cls = `ft-helper-spacer-gap-${axis}-${size}`;
                return `<div style="display:flex;flex-direction:column;gap:4px;">
                    <code style="font:500 10px/1.2 monospace;color:#555;">.${cls}</code>
                    <span style="font:400 11px/1.3 sans-serif;color:#777;">${sizeLabel}</span>
                    ${FRAME([REF("hermano A"), marginBlock(cls, "target"), REF("hermano B")].join(""))}
                </div>`;
            }).join("");
            return `<section style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px;">
                <h3 style="font:600 13px/1.2 sans-serif;margin:0;color:#161616;">Gap ${axisLabel.toLowerCase()}</h3>
                <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:18px;">${cells}</div>
            </section>`;
        }).join("");
    }

    function galleryInner() {
        const renderCells = (mode, title, sizes) => sizes.map(([size, sizeLabel]) => {
            const cls = `ft-helper-spacer-${mode}-${size}`;
            return `<div style="display:flex;flex-direction:column;gap:4px;">
                <code style="font:500 10px/1.2 monospace;color:#555;">.${cls}</code>
                <span style="font:400 11px/1.3 sans-serif;color:#777;">${sizeLabel}</span>
                <div style="${VIZ_BG}border:1px dashed #999;border-radius:3px;display:inline-block;">
                    <div class="${esc(cls)}">
                        <div style="background:var(--color-primary,#0050b3);color:#fff;font:600 12px/1.3 monospace;padding:10px 12px;border-radius:2px;">contenido</div>
                    </div>
                </div>
            </div>`;
        }).join("");

        return `<section style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px;">
            <h3 style="font:600 13px/1.2 sans-serif;margin:0;color:#161616;">Inner - todos los lados</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:18px;">${renderCells("inner", "Inner", DATA.innerSizesBase)}</div>
        </section>
        <section style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px;">
            <h3 style="font:600 13px/1.2 sans-serif;margin:0;color:#161616;">Inner-y - solo vertical</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:18px;">${renderCells("inner-y", "Inner y", DATA.innerSizesAll)}</div>
        </section>`;
    }

    function galleryViewport() {
        const cells = DATA.viewportSteps.map((n) => {
            const cls = `ft-helper-spacer-b-vp-${n}`;
            const fakeHeight = Math.max(18, Math.round(n * 1.2));
            return `<div style="display:flex;flex-direction:column;gap:4px;">
                <code style="font:500 10px/1.2 monospace;color:#555;">.${cls}</code>
                <div style="${VIZ_BG}border:1px dashed #999;border-radius:3px;display:flex;align-items:flex-start;padding:8px;">
                    <div class="${esc(cls)}" style="background:var(--color-primary,#0050b3);color:#fff;font:600 11px/1 monospace;padding:4px 8px;border-radius:2px;height:${fakeHeight}px;display:inline-flex;align-items:center;">
                        ${n}dvh
                    </div>
                </div>
            </div>`;
        }).join("");

        return `<section style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px;">
            <h3 style="font:600 13px/1.2 sans-serif;margin:0;color:#161616;">Viewport spacing</h3>
            <p style="font:400 12px/1.4 sans-serif;color:#666;margin:0;">Preview orientativa. La clase real depende de la altura del viewport activo.</p>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:18px;">${cells}</div>
        </section>`;
    }

    function galleryOffset() {
        const renderAxis = (axis, title, note) => {
            const cells = DATA.offsetSizes.map(([size]) => {
                const cls = `ft-helper-spacer-${axis}-${size}`;
                return `<div style="display:flex;flex-direction:column;gap:4px;">
                    <code style="font:500 10px/1.2 monospace;color:#555;">.${cls}</code>
                    ${FRAME(`
                        <div style="padding:14px;overflow:hidden;">
                            ${REF("referencia")}
                            ${marginBlock(cls, "objetivo", "display:inline-block;margin-top:8px;")}
                        </div>
                    `)}
                </div>`;
            }).join("");

            return `<section style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px;">
                <h3 style="font:600 13px/1.2 sans-serif;margin:0;color:#161616;">${title}</h3>
                <p style="font:400 12px/1.4 sans-serif;color:#666;margin:0;">${note}</p>
                <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:18px;">${cells}</div>
            </section>`;
        };

        return renderAxis("voffset", "Vertical overlap", "Desplaza el bloque hacia arriba.")
            + renderAxis("hoffset", "Horizontal overlap", "Se activa a partir de 768px y desplaza a la izquierda.");
    }

    const overview = `<div class="cb-docs__inner">
        <h1>Spacers</h1>
        <p class="cb-docs__lead">Familia de utilidades <code>.ft-helper-spacer-*</code> del 42DS. Resuelve espaciado, overlap y limpieza de floats sin CSS ad hoc. En Storybook se organiza por intencion de uso para que el control sea mas rapido de leer y de aplicar.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuando</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado</td><td>Recomendado · incluye helpers</td></tr>
                <tr><td><code>scss/base/helpers/_spacers.scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>-</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Flujo recomendado</h2>
        <table class="cb-table">
            <thead><tr><th>Si quieres...</th><th>Story</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Dar aire dentro de una seccion</td><td><strong>Padding</strong></td><td><code>.ft-helper-spacer-{y|t|b}-{size}</code></td></tr>
                <tr><td>Separar un bloque respecto a sus hermanos</td><td><strong>Gap entre hermanos</strong></td><td><code>.ft-helper-spacer-gap-{y|t|b}-{size}</code></td></tr>
                <tr><td>Insetar contenido dentro de un contenedor</td><td><strong>Inner padding</strong></td><td><code>.ft-helper-spacer-inner-{size}</code> / <code>-inner-y-{size}</code></td></tr>
                <tr><td>Reservar espacio relativo al viewport</td><td><strong>Viewport</strong></td><td><code>.ft-helper-spacer-b-vp-{10..100}</code></td></tr>
                <tr><td>Solapar un bloque</td><td><strong>Offset negativo</strong></td><td><code>.ft-helper-spacer-voffset-{size}</code> / <code>-hoffset-{size}</code></td></tr>
                <tr><td>Limpiar floats heredados</td><td><strong>Clear</strong></td><td><code>.ft-helper-spacer-clear</code></td></tr>
            </tbody>
        </table>

        <h2>Familias completas</h2>
        <table class="cb-table">
            <thead><tr><th>Familia</th><th>Patron</th><th>Notas</th></tr></thead>
            <tbody>
                <tr><td>Padding direccional</td><td><code>-spacer-{y|t|b}-{size}</code></td><td><code>xxlg</code> existe solo en <code>-t</code>; <code>0</code> y <code>auto</code> sirven como reset/normalizacion</td></tr>
                <tr><td>Margin gap</td><td><code>-spacer-gap-{y|t|b}-{size}</code></td><td><code>gap-y-0</code> existe; <code>gap-t-0</code> y <code>gap-b-0</code> no</td></tr>
                <tr><td>Inner</td><td><code>-spacer-inner-{size}</code> · <code>-spacer-inner-y-{size}</code></td><td><code>inner-y-0</code> existe como reset vertical</td></tr>
                <tr><td>Viewport</td><td><code>-spacer-b-vp-{10..100}</code></td><td>Margin-bottom en <code>dvh</code></td></tr>
                <tr><td>Offset</td><td><code>-spacer-voffset-{size}</code> · <code>-spacer-hoffset-{size}</code></td><td><code>hoffset</code> solo actua desde 768px</td></tr>
                <tr><td>Clear</td><td><code>-spacer-clear</code></td><td><code>display:block; clear:both</code></td></tr>
            </tbody>
        </table>

        <h2>Escala responsive</h2>
        <table class="cb-table">
            <thead><tr><th>Token</th><th>Movil</th><th>Tablet >=768px</th></tr></thead>
            <tbody>
                <tr><td><code>xxs</code></td><td>1rem (0.8rem en <code>-t</code>)</td><td>1rem</td></tr>
                <tr><td><code>xs</code></td><td>1.5rem</td><td>2rem</td></tr>
                <tr><td><code>sm</code></td><td>2rem</td><td>3.5rem</td></tr>
                <tr><td><code>md</code></td><td>3rem</td><td>6rem</td></tr>
                <tr><td><code>lg</code></td><td>6rem</td><td>8rem</td></tr>
                <tr><td><code>xlg</code></td><td>7rem</td><td>10rem</td></tr>
                <tr><td><code>xxlg</code></td><td>7rem</td><td>11rem</td></tr>
            </tbody>
        </table>

        <h2>Nota de Storybook</h2>
        <p>Las stories de esta entrada usan un harness visual para hacer legibles helpers invisibles. El tab <strong>Code</strong> no copia ese harness: expone markup canonico de uso real mediante <code>story.code</code>.</p>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_spacers.scss</code> · showroom: <code>fourty/helpers/helper-spacers.html</code></p>
    </div>`;

    const SPACERS = {
        id: "spacers",
        name: "Spacers",
        group: "Helpers",
        overview,
        stories: [
            {
                id: "padding",
                name: "Padding",
                kind: "interactive",
                full: true,
                argTypes: directionalArgTypes,
                args: directionalArgs,
                render: liveDirectional,
                code: codeDirectional
            },
            {
                id: "gap",
                name: "Gap entre hermanos",
                kind: "interactive",
                full: true,
                argTypes: gapArgTypes,
                args: gapArgs,
                render: liveGap,
                code: codeGap
            },
            {
                id: "inner",
                name: "Inner padding",
                kind: "interactive",
                full: true,
                argTypes: innerArgTypes,
                args: innerArgs,
                render: liveInner,
                code: codeInner
            },
            {
                id: "viewport",
                name: "Viewport",
                kind: "interactive",
                full: true,
                argTypes: viewportArgTypes,
                args: viewportArgs,
                render: liveViewport,
                code: codeViewport
            },
            {
                id: "offset",
                name: "Offset negativo",
                kind: "interactive",
                full: true,
                argTypes: offsetArgTypes,
                args: offsetArgs,
                render: liveOffset,
                code: codeOffset
            },
            {
                id: "clear",
                name: "Clear",
                kind: "gallery",
                full: true,
                render: renderClear,
                code: clearCode
            }
        ],
        subgroups: [
            {
                id: "galleries",
                name: "Galleries",
                collapsed: true,
                stories: [
                    { id: "padding-dirs", name: "Padding direccional", kind: "gallery", full: true, render: galleryPaddingDirs },
                    { id: "gap-matrix", name: "Gap matrix", kind: "gallery", full: true, render: galleryGap },
                    { id: "inner-matrix", name: "Inner matrix", kind: "gallery", full: true, render: galleryInner },
                    { id: "viewport-matrix", name: "Viewport matrix", kind: "gallery", full: true, render: galleryViewport },
                    { id: "offset-matrix", name: "Offset matrix", kind: "gallery", full: true, render: galleryOffset }
                ]
            }
        ]
    };

    window.SB.register(SPACERS);
})();
