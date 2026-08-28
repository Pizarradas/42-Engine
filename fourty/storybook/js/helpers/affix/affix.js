/* ==========================================================================
   helpers/affix/affix.js - Helpers / Affix
   Fuente real: scss/base/helpers/_affixes.scss

   El parcial documenta dos entradas:
     - .ft-helper-affix
     - .ft-helper-sticky-stack

   Affix fija el propio nodo con position: fixed.
   Sticky Stack espeja una fuente en una shell sticky superior mediante runtime.
   ========================================================================== */
(function () {
    "use strict";

    const { esc } = window.SB.helpers;

    const affixArgTypes = [
        {
            key: "applied",
            control: "boolean",
            desc: "Aplica .ft-helper-affix (position: fixed). Sin clase = position por defecto del elemento."
        },
        {
            key: "anchor",
            control: "select",
            desc: "Esquina de anclaje para la demo. La clase real no fija offsets.",
            options: [
                ["top-left", "top-left"],
                ["top-right", "top-right"],
                ["bottom-left", "bottom-left"],
                ["bottom-right", "bottom-right"]
            ]
        }
    ];

    const affixArgs = {
        applied: true,
        anchor: "bottom-right"
    };

    function renderAffixBase(args) {
        const offsets = {
            "top-left": "top:16px;left:16px;",
            "top-right": "top:16px;right:16px;",
            "bottom-left": "bottom:16px;left:16px;",
            "bottom-right": "bottom:16px;right:16px;"
        }[args.anchor];
        const cls = args.applied ? "ft-helper-affix" : "";

        return `<div style="position:relative;padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;min-height:160px;overflow:hidden;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:10px;">${esc(cls ? "." + cls : "(sin clase)")}</code>
            <p style="margin:0 0 16px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">
                ${args.applied
                    ? "Con .ft-helper-affix: position: fixed. Los offsets de la demo se aplican inline."
                    : "Sin la clase: el bloque permanece en flujo con su position por defecto."}
            </p>
            <div class="${esc(cls)}" style="${args.applied ? offsets : ""}background:#0050b3;color:#fff;padding:8px 12px;border-radius:3px;font:600 12px/1.2 sans-serif;display:inline-block;">
                Bloque ${args.applied ? "fijado - " + esc(args.anchor) : "en flujo"}
            </div>
        </div>`;
    }

    function galleryCompare() {
        return `<section style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
            <div>
                <h3 style="margin:0 0 6px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">.ft-helper-affix</h3>
                <p style="margin:0 0 8px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">Alias semantico para fijar un elemento UI al viewport.</p>
                <div style="position:relative;height:160px;background:#fff;border:1px solid #ddd;border-radius:3px;">
                    <div class="ft-helper-affix" style="bottom:12px;right:12px;background:#0050b3;color:#fff;padding:8px 12px;border-radius:3px;font:600 12px/1.2 sans-serif;">affix</div>
                </div>
            </div>
            <div>
                <h3 style="margin:0 0 6px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">.ft-helper-position-fixed</h3>
                <p style="margin:0 0 8px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">Primitiva de posicionamiento. Mismo CSS, distinta intencion.</p>
                <div style="position:relative;height:160px;background:#fff;border:1px solid #ddd;border-radius:3px;">
                    <div class="ft-helper-position-fixed" style="bottom:12px;right:12px;background:#0050b3;color:#fff;padding:8px 12px;border-radius:3px;font:600 12px/1.2 sans-serif;">position-fixed</div>
                </div>
            </div>
        </section>
        <p style="margin:18px 0 0;font:400 12px/1.5 'Inter',sans-serif;color:#666;">
            En el storybook ambos quedan anclados al viewport del iframe. En produccion funcionan igual contra el viewport completo.
        </p>`;
    }

    function renderStickyStackBase() {
        const sourceAttrs = [
            'class="ft-helper-sticky-stack ft-mol-btnGroup ft-mol-btnGroup--cnt ft-mol-btnGroup--is-scrollable"',
            'data-sticky-stack-source="actions"',
            'data-sticky-stack-trigger',
            'data-sticky-stack-top-mode="default"',
            'data-sticky-stack-overflow="x"',
            'data-sticky-stack-top-base-min-1024="38"'
        ].join(" ");

        return `<div style="display:grid;gap:16px;padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;">
            <p style="margin:0;font:600 12px/1.4 'Inter',sans-serif;color:#161616;">
                Comportamiento base: al hacer scroll, la botonera se ancla arriba mediante el runtime sticky stack.
            </p>

            <div style="position:relative;overflow:hidden;border-radius:8px;border:1px solid #ddd;background:#f7f7f7;">
                <div style="padding:16px;background:#fff;border-bottom:1px solid #eee;">
                    <div ${sourceAttrs} style="gap:12px;padding:0;">
                        <button type="button" class="ft-btn ft-btn--tertiary ft-btn--md" style="margin:0;flex:0 0 auto;">Anadir mas localidades</button>
                        <button type="button" class="ft-btn ft-btn--secondary ft-btn--md" style="margin:0;flex:0 0 auto;">Recibir newsletter</button>
                    </div>
                </div>

                <div data-sticky-stack-offset-target style="padding:18px 16px 16px;background:#fff;">
                    <div style="display:grid;gap:12px;">
                        <div style="height:72px;border-radius:6px;background:#ececec;"></div>
                        <div style="height:72px;border-radius:6px;background:#ececec;"></div>
                        <div style="height:72px;border-radius:6px;background:#ececec;"></div>
                    </div>
                </div>
            </div>

            <p style="margin:0;font:400 12px/1.5 'Inter',sans-serif;color:#666;">
                La API completa de <code>data-*</code>, offsets, boundary y recomendaciones de integracion se documenta en <strong>Overview</strong>.
            </p>
        </div>`;
    }

    function stickyStackCode() {
        const lines = [
            '<div class="ft-helper-sticky-stack ft-mol-btnGroup ft-mol-btnGroup--cnt ft-mol-btnGroup--is-scrollable"',
            '     data-sticky-stack-source="actions"',
            '     data-sticky-stack-trigger',
            '     data-sticky-stack-top-mode="default"',
            '     data-sticky-stack-overflow="x"',
            '     data-sticky-stack-top-base-min-1024="38"',
            ">",
            '    <button type="button" class="ft-btn ft-btn--tertiary ft-btn--md">',
            "        Anadir mas localidades",
            "    </button>",
            '    <button type="button" class="ft-btn ft-btn--secondary ft-btn--md">',
            "        Recibir newsletter",
            "    </button>",
            "</div>",
            "",
            "<div data-sticky-stack-offset-target>",
            "    <!-- contenido que debe compensar la altura del sticky mirror -->",
            "</div>",
            "",
            '<script defer src="/cds-statics/js/sticky-stack/fourty-js-sticky-stack.js"></script>'
        ];

        return lines.join("\n");
    }

    const overview = `<div class="cb-docs__inner">
        <h1>Affix</h1>
        <p class="cb-docs__lead">Familia agrupada en <code>scss/base/helpers/_affixes.scss</code>. Incluye <code>.ft-helper-affix</code> para fijar un nodo directamente con <code>position: fixed</code> y <code>.ft-helper-sticky-stack</code> para espejar piezas en una shell sticky superior controlada por runtime.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuando</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS - variables</td><td>Siempre - <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_affixes.scss</code></td><td>Parcial SCSS</td><td>Solo para compilar</td></tr>
                <tr><td><code>cds-statics/js/sticky-stack/fourty-js-sticky-stack.js</code></td><td>JavaScript runtime</td><td>Solo para <code>.ft-helper-sticky-stack</code></td></tr>
            </tbody>
        </table>
        </div>

        <h2>Entradas documentadas</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Aplica</th><th>Notas</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-helper-affix</code></td><td><code>position: fixed</code></td><td>No define <code>top/right/bottom/left</code>. Anadelos con estilo inline o con un wrapper propio.</td></tr>
                <tr><td><code>.ft-helper-sticky-stack</code></td><td>Fuente espejable para sticky mirror</td><td>Se configura con <code>data-*</code> y necesita runtime JS.</td></tr>
            </tbody>
        </table>

        <h2>Affix vs Position-fixed</h2>
        <p>Funcionalmente son identicos. La diferencia es semantica:</p>
        <table class="cb-table">
            <thead><tr><th>Usa...</th><th>Cuando...</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-helper-affix</code></td><td>Tu intencion es fijar este componente al viewport.</td></tr>
                <tr><td><code>.ft-helper-position-fixed</code></td><td>Necesitas la primitiva CSS sin mas narrativa.</td></tr>
            </tbody>
        </table>
        <div class="cb-callout">Si tu equipo prefiere consistencia con la familia <code>position-*</code>, puedes ignorar <code>.ft-helper-affix</code>. Existe por legibilidad del HTML.</div>

        <h2>Sticky Stack</h2>
        <p>Cuando el objetivo no es fijar el propio nodo sino espejarlo en una shell sticky superior, usa <code>.ft-helper-sticky-stack</code>. Es util en botoneras, filtros, chips scrollables o piezas con offsets variables por cabecera y breakpoint.</p>

        <h3>Arquitectura del sistema</h3>
        <p>La pieza real permanece en su posicion original dentro del flujo del documento. El runtime busca nodos con <code>.ft-helper-sticky-stack[data-sticky-stack-source]</code>, construye una shell fija en <code>body</code>, clona la fuente dentro de esa shell y marca el original como <code>mirrored</code> cuando el sticky entra en juego. Con esto se evita mover el nodo de negocio, se conserva el contexto del layout y se simplifica la integracion con componentes server-side o client-side.</p>

        <h3>Flujo del runtime JS</h3>
        <table class="cb-table">
            <thead><tr><th>Paso</th><th>Que hace el runtime</th></tr></thead>
            <tbody>
                <tr><td>1. Descubrimiento</td><td>Localiza fuentes sticky por clase + <code>data-sticky-stack-source</code> y las agrupa por scope.</td></tr>
                <tr><td>2. Shell</td><td>Crea una shell fija global con slots en el mismo orden que las fuentes.</td></tr>
                <tr><td>3. Mirror</td><td>Clona el markup de cada fuente y lo inserta en la shell, limpiando atributos internos del sistema.</td></tr>
                <tr><td>4. Trigger</td><td>Mide la fuente marcada con <code>data-sticky-stack-trigger</code> para decidir cuando debe activarse.</td></tr>
                <tr><td>5. Offset</td><td>Compensa el contenido afectado aplicando padding-top a los nodos con <code>data-sticky-stack-offset-target</code>.</td></tr>
                <tr><td>6. Sync</td><td>Reenvia clicks al control original y solo resincroniza el mirror cuando la fuente cambia de verdad.</td></tr>
            </tbody>
        </table>

        <h3>Contrato minimo de implementacion</h3>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Obligatorio</th><th>Para que sirve</th></tr></thead>
            <tbody>
                <tr><td>Fuente sticky</td><td><code>.ft-helper-sticky-stack</code> + <code>data-sticky-stack-source</code></td><td>Marca el nodo que el runtime debe espejar.</td></tr>
                <tr><td>Disparador</td><td><code>data-sticky-stack-trigger</code></td><td>Define que fuente controla la entrada a sticky.</td></tr>
                <tr><td>Contenido compensado</td><td><code>data-sticky-stack-offset-target</code></td><td>Evita el salto visual cuando aparece la shell fija.</td></tr>
                <tr><td>Runtime</td><td><code>cds-statics/js/sticky-stack/fourty-js-sticky-stack.js</code></td><td>Orquesta shell, mirror, offsets y reenvio de interacciones.</td></tr>
            </tbody>
        </table>

        <h3>Data-* recomendados</h3>
        <table class="cb-table">
            <thead><tr><th>Atributo</th><th>Uso</th></tr></thead>
            <tbody>
                <tr><td><code>data-sticky-stack-source</code></td><td>Identificador logico de la fuente sticky.</td></tr>
                <tr><td><code>data-sticky-stack-order</code></td><td>Ordena multiples fuentes dentro de una misma shell.</td></tr>
                <tr><td><code>data-sticky-stack-top-mode</code></td><td><code>default</code> para offset fijo, <code>boundary</code> para medir una cabecera visible.</td></tr>
                <tr><td><code>data-sticky-stack-top-base</code></td><td>Offset base en px.</td></tr>
                <tr><td><code>data-sticky-stack-top-base-min-1024</code></td><td>Override responsive del top base. El patron se puede repetir por breakpoint.</td></tr>
                <tr><td><code>data-sticky-stack-overflow="x"</code></td><td>Mantiene scroll horizontal en botoneras o listas espejadas.</td></tr>
                <tr><td><code>data-sticky-stack-boundary</code></td><td>Boundary opcional para calibrar el top contra otra pieza visible.</td></tr>
                <tr><td><code>data-sticky-stack-boundary-target</code></td><td>Subnodo exacto que debe medirse dentro de la boundary.</td></tr>
                <tr><td><code>data-sticky-stack-scope</code></td><td>Aisla varias instancias del sistema en una misma pagina.</td></tr>
            </tbody>
        </table>

        <h3>Guia para React, Vue y similares</h3>
        <ul>
            <li>Piensa la fuente sticky como markup declarativo y el runtime como una capa de comportamiento post-render. No intentes renderizar manualmente la shell espejo desde el framework salvo que repliques toda la logica de sync, offsets y eventos.</li>
            <li>Manten estables los atributos <code>data-sticky-stack-*</code> entre renders. Si el framework destruye y recrea el nodo en cada cambio de estado, el runtime tendra mas trabajo y el sticky sera menos predecible.</li>
            <li>Inicializa el runtime cuando el componente ya este montado en DOM. En React encaja en <code>useEffect</code>; en Vue, en <code>onMounted</code>.</li>
            <li>Si el contenido de la fuente cambia por estado reactivo, conserva la misma raiz DOM siempre que sea posible. El runtime escucha mutaciones y resincroniza el mirror sin necesidad de reinicializacion completa.</li>
            <li>Si tienes varias zonas sticky independientes en una misma vista, declara un <code>data-sticky-stack-scope</code> por contenedor para evitar cruces entre instancias.</li>
            <li>En SSR o hydration, el HTML puede salir ya con los <code>data-*</code>. El runtime solo necesita ejecutarse en cliente.</li>
        </ul>

        <div class="cb-callout">Criterio recomendado para integracion: el framework es duenio del estado y del markup fuente; el helper sticky es duenio exclusivo de la shell espejo, los offsets y el bridge de interacciones.</div>

        <h2>Anatomia</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Clase affix</td><td><code>.ft-helper-affix</code></td></tr>
                <tr><td>Clase sticky mirror</td><td><code>.ft-helper-sticky-stack</code></td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_affixes.scss</code> - runtime sticky: <code>cds-statics/js/sticky-stack/fourty-js-sticky-stack.js</code></p>
    </div>`;

    const AFFIX = {
        id: "affix",
        name: "Affix",
        group: "Helpers",
        signals: ["js"],
        overview,
        stories: [
            {
                id: "base",
                name: "Base",
                kind: "interactive",
                full: true,
                argTypes: affixArgTypes,
                args: affixArgs,
                render: renderAffixBase
            }
        ],
        subgroups: [
            {
                id: "galleries",
                name: "Galleries",
                collapsed: true,
                stories: [
                    { id: "compare", name: "Affix vs position-fixed", kind: "gallery", full: true, render: galleryCompare }
                ]
            },
            {
                id: "sticky-stack",
                name: "Sticky Stack",
                collapsed: true,
                stories: [
                    {
                        id: "sticky-stack-base",
                        name: "Base",
                        kind: "interactive",
                        full: true,
                        argTypes: [],
                        args: {},
                        render: renderStickyStackBase,
                        code: stickyStackCode
                    }
                ]
            }
        ]
    };

    window.SB.register(AFFIX);
    window.SB.loadMarkup(AFFIX, document.currentScript && document.currentScript.src, { full: true });
}());
