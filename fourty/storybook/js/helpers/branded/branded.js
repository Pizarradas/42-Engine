/* ════════════════════════════════════════════════════════════════════════
   helpers/branded/branded.js — Helpers / Branded
   Casuística REAL de scss/base/helpers/_branded.scss (.ft-helper-branded).
   Una sola clase: aplica `font-family: var(--font-branded)` + `font-weight: 400`
   (mixin `@include Branded` del DS). Es la "firma tipográfica" de la marca para
   piezas editoriales destacadas.

   El SCSS selecciona p / h1 / h2 / h3 / .ft-text con esta clase Y propaga la
   regla a TODOS los descendientes (`*`) para que enlaces/strong/em dentro del
   bloque también respeten la fuente branded.

   Estructura:
     · Base (interactive)  → toggle on/off + slot + tamaño tipográfico
     · Galleries           → contraste branded vs default · uso en distintos tamaños
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    const SAMPLE_SHORT = "Lorem ipsum dolor sit amet";
    const SAMPLE_LONG  = "La tipografía branded firma el editorial de cada marca: titulares, citas, capitulares.";

    /* ─── BASE — toggle on/off de la clase + tamaño tipográfico ─── */
    const baseArgTypes = [
        { key: "branded", control: "boolean",
          desc: "Aplica .ft-helper-branded (font-family: var(--font-branded) + font-weight: 400)." },
        { key: "size", control: "select",
          desc: "Tamaño tipográfico para visualizar el efecto.",
          options: [
              ["heading-XXL", "heading-XXL"], ["heading-XL", "heading-XL"], ["heading-L", "heading-L"],
              ["heading-M", "heading-M"], ["body-L", "body-L"], ["body-M", "body-M"]
          ] },
        { key: "text", control: "text", desc: "Texto de muestra (slot)." }
    ];
    const baseArgs = { branded: true, size: "heading-L", text: SAMPLE_LONG };
    const liveBase = (a) => {
        const sizeCls = "ft-helper-fontSize-" + a.size;
        const cls = a.branded ? `${sizeCls} ft-helper-branded` : sizeCls;
        return `<div style="padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:10px;">.${esc(cls)}</code>
            <div class="${esc(cls)}">${esc(a.text)}</div>
        </div>`;
    };

    /* ─── Galería: contraste branded vs default ─── */
    const galleryCompare = () => {
        const sizes = ["heading-XXL", "heading-XL", "heading-L", "heading-M"];
        const rows = sizes.map(s => {
            const defCls = "ft-helper-fontSize-" + s;
            const brnCls = `${defCls} ft-helper-branded`;
            return `<div style="border-bottom:1px solid #eee;padding:14px 0;display:grid;grid-template-columns:1fr 1fr;gap:18px;">
                <div>
                    <code style="display:block;font:500 10.5px/1.2 monospace;color:#666;margin-bottom:6px;">.${defCls}</code>
                    <div class="${defCls}">${esc(SAMPLE_SHORT)}</div>
                </div>
                <div>
                    <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:6px;">.${brnCls}</code>
                    <div class="${brnCls}">${esc(SAMPLE_SHORT)}</div>
                </div>
            </div>`;
        }).join("");
        return `<section style="border:1px solid #ddd;border-radius:3px;overflow:hidden;background:#fff;padding:0 16px;">
            <header style="padding:10px 0;border-bottom:1px solid #ddd;">
                <h3 style="margin:0;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Default vs Branded</h3>
                <p style="margin:4px 0 0;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">Misma escala, misma muestra. Izquierda: <code>font-stack</code> de la marca. Derecha: <code>--font-branded</code>. El switch de Brand cambia ambas a la vez.</p>
            </header>
            ${rows}
        </section>`;
    };

    /* ─── Galería: propagación a hijos ─── */
    const galleryChildren = () => {
        return `<section style="border:1px solid #ddd;border-radius:3px;overflow:hidden;background:#fff;">
            <header style="padding:10px 12px;background:#f5f5f5;border-bottom:1px solid #ddd;">
                <h3 style="margin:0;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Propagación a descendientes</h3>
                <p style="margin:4px 0 0;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">El SCSS aplica <code>@include Branded</code> también al selector <code>*</code> del bloque — todos los hijos heredan la fuente branded.</p>
            </header>
            <div style="padding:18px;">
                <article class="ft-helper-branded ft-helper-fontSize-body-L">
                    <h2 class="ft-helper-fontSize-heading-M">Titular dentro del bloque branded</h2>
                    <p>Párrafo con <strong>énfasis bold</strong>, una <em>cita en cursiva</em>, y un <a href="#">enlace</a>: todos heredan la <code>font-family</code> branded por la regla <code>* { @include Branded }</code>.</p>
                </article>
            </div>
        </section>`;
    };

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Branded</h1>
        <p class="cb-docs__lead">Helper de una sola clase <code>.ft-helper-branded</code>: aplica la <strong>tipografía firma</strong> de la marca (<code>var(--font-branded)</code>) con <code>font-weight: 400</code>. Es la fuente editorial reservada para piezas destacadas.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · define <code>--font-branded</code></td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_branded.scss</code></td><td>Parcial SCSS (mixin <code>ft-helper-branded</code>)</td><td>Solo para compilar</td></tr>
                <tr><td><code>scss/abstracts/mixins/_fonts.scss</code></td><td>Define <code>@mixin Branded</code></td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Selector y propagación</h2>
        <p>El SCSS aplica la regla a:</p>
        <pre style="background:#f5f5f5;padding:10px;border-radius:3px;font:500 11.5px/1.4 monospace;overflow:auto;"><code>.ft-helper-branded,
p.ft-helper-branded,
h1.ft-helper-branded,
h2.ft-helper-branded,
h3.ft-helper-branded,
h2.ft-helper-branded.ft-mol-subtitle,
.ft-text.ft-helper-branded {
    @include Branded;     /* font-family: var(--font-branded); font-weight: 400; */
    * { @include Branded; }   /* propaga a TODOS los descendientes */
    &[class^="ft-helper-fontSize-"] { @include Branded; }
}</code></pre>
        <p>Es decir: además del propio bloque, <strong>los hijos</strong> (enlaces, strong, em, etc.) también heredan la fuente. Esto evita escribir overrides manuales para que un párrafo branded mantenga su firma incluso cuando hay énfasis o listas dentro.</p>

        <h2>Composición</h2>
        <table class="cb-table">
            <thead><tr><th>Combina con</th><th>Resultado</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-helper-fontSize-*</code></td><td>Cambia tamaño manteniendo la fuente branded</td></tr>
                <tr><td><code>.ft-helper-fontColor-*</code></td><td>Color brand sobre fuente branded — combo editorial habitual</td></tr>
                <tr><td><code>.ft-helper-fontWeight-*</code></td><td><strong>Cuidado</strong>: <code>fontWeight</code> aplica su propia <code>font-family</code>. Si va después de <code>branded</code> en el HTML, gana <code>fontWeight</code> por cascada. Para un titular branded en bold, usar el peso 700 de la marca con la fuente branded suele requerir un set específico — verificar caso por caso.</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Clase única</td><td><code>.ft-helper-branded</code></td></tr>
                <tr><td>Variables consumidas</td><td><code>--font-branded</code> (definida en <code>setting.css</code> de cada marca)</td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_branded.scss</code> · mixin: <code>scss/abstracts/mixins/_fonts.scss</code> · showroom: <code>fourty/helpers/helper-branded.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const BRANDED = {
        id: "branded",
        name: "Branded",
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
                    { id: "compare",  name: "Default vs Branded",        kind: "gallery", full: true, render: galleryCompare },
                    { id: "children", name: "Propagación a descendientes", kind: "gallery", full: true, render: galleryChildren }
                ]
            }
        ]
    };
    window.SB.register(BRANDED);
    window.SB.loadMarkup(BRANDED, document.currentScript && document.currentScript.src, { full: true });
})();
