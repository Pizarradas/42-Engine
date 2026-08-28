/* ════════════════════════════════════════════════════════════════════════
   setup/reset/reset.js — Setup / Reset
   Casuística REAL de scss/base/_reset.scss (mixins `resets-global` y
   `resets-custom`). Documenta cómo se ven los tags HTML desnudos —sin
   `class`— tras aplicar el reset del DS:

     · resets-global   → normaliza box-sizing, html (font 62.5% para que 1rem=10px),
                         body (text-rendering, font-smoothing, color, bg)
     · resets-custom   → aplica family/color tipográficos por tag, set-brand
                         (dialog, figure, main, nav, h1..h6, p, ul/ol, a, button,
                         hr, abbr, blockquote, code, kbd, pre, table, fieldset,
                         form inputs, scrollbar custom)

   Estructura:
     · Base (interactive)   → selector de familia (titulares · texto · listas ·
                              enlaces · forms · tabla · misc)
     · Galleries (collapsed)→ una galería por familia mostrando los tags reales
                              uno tras otro, sin clases

   ⚠ Las stories NO usan clases `.ft-*`. El objetivo es ver cómo el DS pinta
   tags HTML desnudos. Cambiar Brand en el toolbar re-renderiza con la
   tipografía de la marca activa.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SSOT — familias de tags reset por _reset.scss ▼ */
    const DATA = {
        families: [
            ["headings",  "Titulares · h1..h6"],
            ["text",      "Texto · p / strong / em / small / blockquote / dfn / mark / u / del"],
            ["lists",     "Listas · ul / ol / dl"],
            ["links",     "Enlaces · a (states)"],
            ["forms",     "Formularios · button / input / select / textarea / fieldset / legend / label"],
            ["table",     "Tablas · table / th / td / caption"],
            ["misc",      "Misc · hr / abbr / code / kbd / sub / sup / [hidden]"]
        ]
    };

    /* ─── Renders por familia (HTML desnudo, cero .ft-*) ─── */
    const RENDER = {
        headings: () => `
            <h1>Heading H1 · The quick brown fox</h1>
            <h2>Heading H2 · Subtítulo de sección</h2>
            <h3>Heading H3 · Bloque editorial</h3>
            <h4>Heading H4 · Apartado intermedio</h4>
            <h5>Heading H5 · Cabecera fina</h5>
            <h6>Heading H6 · Microcopia</h6>
        `,
        text: () => `
            <p>Párrafo normal con <strong>énfasis bold</strong>, una <em>cita en cursiva</em>, una <small>aclaración small</small>, una <abbr title="HyperText Markup Language">abreviatura HTML</abbr>, una palabra <mark>marcada</mark>, una <u>subrayada</u> y otra <del>tachada</del>. <code>código inline</code> y <kbd>Ctrl + C</kbd>.</p>
            <p>Segundo párrafo para confirmar el line-height y el margen entre bloques.</p>
            <blockquote>Cita en bloque. El reset aplica margin/padding personalizados para que viva limpio sin estilos del navegador.</blockquote>
            <p>Soporta <sub>subíndice</sub> y <sup>superíndice</sup>, fechas (<time datetime="2026-05-28">28 de mayo</time>) y direcciones (<address>Redacción · Madrid</address>).</p>
            <pre>// Pre · monospace
function setup() {
    document.querySelector('body').classList.add('ft-brand-ep');
}</pre>
        `,
        lists: () => `
            <ul>
                <li>UL · primer item de una lista no ordenada</li>
                <li>UL · segundo item</li>
                <li>UL · tercer item · el reset elimina los bullets y el padding-left</li>
            </ul>
            <ol>
                <li>OL · primer item ordenado</li>
                <li>OL · segundo item</li>
                <li>OL · tercer item</li>
            </ol>
            <dl>
                <dt>Término · DT</dt>
                <dd>Descripción asociada · DD</dd>
                <dt>Otro término</dt>
                <dd>Su descripción correspondiente</dd>
            </dl>
        `,
        links: () => `
            <p>Enlace normal: <a href="#">enlace por defecto</a>.</p>
            <p>El reset aplica <code>text-decoration: none</code> a <code>&lt;a&gt;</code>. La marca define el color y el subrayado en su CSS de componente — el reset solo normaliza.</p>
            <p>Visitado y hover: <a href="#">pasa el cursor por encima</a> para ver el comportamiento por defecto.</p>
        `,
        forms: () => `
            <form onsubmit="event.preventDefault()">
                <fieldset style="border:1px solid #ddd;padding:14px;">
                    <legend>Legend del fieldset</legend>
                    <p>
                        <label for="reset-text">Label de texto</label><br>
                        <input id="reset-text" type="text" placeholder="Input type='text'">
                    </p>
                    <p>
                        <label for="reset-select">Label de select</label><br>
                        <select id="reset-select">
                            <option>Opción uno</option>
                            <option>Opción dos</option>
                            <option disabled>Opción deshabilitada</option>
                        </select>
                    </p>
                    <p>
                        <label for="reset-textarea">Label de textarea</label><br>
                        <textarea id="reset-textarea" placeholder="Textarea con min-height heredado del reset"></textarea>
                    </p>
                    <p>
                        <input type="checkbox" id="reset-check"> <label for="reset-check">Checkbox</label> &nbsp;
                        <input type="radio" name="reset-r" id="reset-radio"> <label for="reset-radio">Radio</label>
                    </p>
                    <p>
                        <button type="button">Botón por defecto</button>
                        <button type="reset">Reset</button>
                        <button type="submit">Submit</button>
                    </p>
                </fieldset>
            </form>
        `,
        table: () => `
            <table>
                <caption>Tabla de ejemplo · caption (caption-side: bottom por reset)</caption>
                <thead>
                    <tr>
                        <th>Cabecera 1</th>
                        <th>Cabecera 2</th>
                        <th>Cabecera 3</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Celda 1A</td><td>Celda 1B</td><td>Celda 1C</td></tr>
                    <tr><td>Celda 2A</td><td>Celda 2B</td><td>Celda 2C</td></tr>
                    <tr><td>Celda 3A</td><td>Celda 3B</td><td>Celda 3C</td></tr>
                </tbody>
            </table>
        `,
        misc: () => `
            <p>Antes del HR</p>
            <hr>
            <p>Después del HR (el reset normaliza <code>border</code>, <code>height</code> y <code>box-sizing</code>).</p>
            <p>Atributo <code>[hidden]</code>: <span hidden>este span lleva hidden y no se ve</span>(no se ve nada entre los paréntesis).</p>
            <p>Atributo <code>[hidden="false"]</code>: <span hidden="false">este span sí se ve aunque lleve hidden</span>.</p>
            <p>Detalles plegables (<code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code>):</p>
            <details>
                <summary>Resumen plegable</summary>
                <p>Contenido oculto por defecto. El reset normaliza el cursor y elimina el marker nativo.</p>
            </details>
        `
    };

    /* ─── BASE — selector de familia ─── */
    const baseArgTypes = [
        { key: "family", control: "select",
          desc: "Familia de tags HTML reset por el DS.",
          options: DATA.families }
    ];
    const baseArgs = { family: "headings" };
    const liveBase = (a) => {
        const fam = DATA.families.find(f => f[0] === a.family);
        return `<div style="padding:24px;background:#fff;border:1px dashed #999;border-radius:3px;">
            <p style="margin:0 0 4px;font:500 10.5px/1.2 monospace;color:#0f62fe;">Familia: ${esc(a.family)}</p>
            <p style="margin:0 0 16px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">${esc(fam ? fam[1] : "")}</p>
            <div>${RENDER[a.family]()}</div>
        </div>`;
    };

    /* ─── Galerías (una por familia) ─── */
    const sectionOf = (key, label) => () => `<section style="background:#fff;border:1px solid #ddd;border-radius:3px;padding:18px;">
        <header style="margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid #eee;">
            <h3 style="margin:0;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">${esc(label)}</h3>
            <p style="margin:4px 0 0;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">Tags HTML desnudos · sin <code>class</code>. Cambia Brand para ver cómo varía la tipografía de la marca activa.</p>
        </header>
        ${RENDER[key]()}
    </section>`;

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Reset</h1>
        <p class="cb-docs__lead">Documenta cómo se ven los <strong>tags HTML desnudos</strong> tras aplicar <code>scss/base/_reset.scss</code>. Es el comportamiento por defecto de todo elemento sin <code>class</code> dentro del 42DS.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables y fuentes</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo</td><td>Recomendado · incluye el reset</td></tr>
                <tr><td><code>scss/base/_reset.scss</code></td><td>Parcial SCSS (mixins <code>resets-global</code> y <code>resets-custom</code>)</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Sub-mixins del reset</h2>
        <table class="cb-table">
            <thead><tr><th>Mixin</th><th>Qué normaliza</th></tr></thead>
            <tbody>
                <tr><td><code>resets-global</code></td><td><code>*</code>: box-sizing border-box · tap highlight · focus ring · <code>html</code>: font 62.5%/1.5 (1rem = 10px) · <code>body</code>: text-rendering optimizeLegibility · font-smoothing · color · bg de la marca</td></tr>
                <tr><td><code>resets-custom</code></td><td>Tags semánticos (dialog, figure, main, nav, h1..h6, p, listas, a, button, hr, abbr, blockquote, code/kbd/pre, tablas, formularios, scrollbar) con las font-family/font-color de la marca activa</td></tr>
            </tbody>
        </table>

        <h2>1rem = 10px</h2>
        <div class="cb-callout">
            El reset aplica <code>html { font: 62.5%/1.5 }</code>, que fija la raíz tipográfica al 62.5% de 16px = <strong>10px</strong>. Por eso en todo el DS las medidas en <code>rem</code> se calculan como décimas de píxel (<code>1.6rem</code> = 16px). Es una decisión del DS pero ser consciente: si tu producto consume el reset, esto afecta a todo el cálculo.
        </div>

        <h2>Familias documentadas</h2>
        <table class="cb-table">
            <thead><tr><th>Familia</th><th>Tags incluidos</th></tr></thead>
            <tbody>
                <tr><td>Titulares</td><td><code>h1</code>..<code>h6</code></td></tr>
                <tr><td>Texto</td><td><code>p</code> · <code>strong</code> · <code>em</code> · <code>small</code> · <code>blockquote</code> · <code>dfn</code> · <code>mark</code> · <code>u</code> · <code>del</code> · <code>code</code> · <code>kbd</code> · <code>pre</code> · <code>sub</code> · <code>sup</code> · <code>abbr</code> · <code>time</code> · <code>address</code></td></tr>
                <tr><td>Listas</td><td><code>ul</code> · <code>ol</code> · <code>dl</code> (+ <code>li</code>/<code>dt</code>/<code>dd</code>)</td></tr>
                <tr><td>Enlaces</td><td><code>a</code> (+ <code>:hover</code>/<code>:focus</code>/<code>:active</code>)</td></tr>
                <tr><td>Formularios</td><td><code>button</code> · <code>input</code> (text/checkbox/radio/date/search/number) · <code>select</code> · <code>textarea</code> · <code>fieldset</code> · <code>legend</code> · <code>label</code> · <code>optgroup</code>/<code>option</code></td></tr>
                <tr><td>Tablas</td><td><code>table</code> · <code>th</code> · <code>td</code> · <code>caption</code></td></tr>
                <tr><td>Misc</td><td><code>hr</code> · <code>[hidden]</code> · <code>[hidden="false"]</code> · <code>summary</code>/<code>details</code> · <code>::-webkit-scrollbar</code></td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>El bloque <code>resets-custom</code> vive dentro de <code>#{functionBrandSet($resets-custom--brand)}</code> → cada marca redefine las <code>font-family</code> de <code>h1</code>..<code>h6</code>, <code>p</code>, <code>strong</code>, etc. con su stack tipográfico. Cambia el control <code>Brand</code> del toolbar para verlo en vivo.</p>
        <p>Casos particulares en el SCSS:</p>
        <ul>
            <li><code>label</code>: en <code>sport</code>, <code>epe</code>, <code>regionales</code> y <code>ux</code> aplica <code>color: var(--color-black)</code>.</li>
            <li><code>scrollbar</code>: la marca define width y radius del thumb/track con sus tokens.</li>
        </ul>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Selector</th></tr></thead>
            <tbody>
                <tr><td>Globales</td><td><code>*</code> · <code>html</code> · <code>body</code></td></tr>
                <tr><td>Set-brand</td><td>Bloque <code>#{functionBrandSet(...)}</code> con todos los tags semánticos</td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/_reset.scss</code> · showroom: <code>fourty/base/base-reset.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const RESET = {
        id: "reset",
        name: "Reset",
        group: "Setup",
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true,
              argTypes: baseArgTypes, args: baseArgs, render: liveBase }
        ],
        subgroups: [
            {
                id: "galleries", name: "Galleries", collapsed: true,
                stories: DATA.families.map(([key, label]) => ({
                    id: key, name: label.split(" · ")[0], kind: "gallery", full: true, render: sectionOf(key, label)
                }))
            }
        ]
    };
    window.SB.register(RESET);
    window.SB.loadMarkup(RESET, document.currentScript && document.currentScript.src, { full: true });
})();
