/* ════════════════════════════════════════════════════════════════════════
   helpers/property/property.js — Helpers / Property
   Casuística REAL de scss/base/helpers/_properties.scss (.ft-helper-property*).
   La categoría miscelánea: 5 sub-familias sin nexo temático fuerte:
     · -opacity-{10..100}        → opacity por step de 10%
     · -round-{xs,sm,md,lg,xlg}  → border-radius (escala 0.5/1/0.5/1/1.5rem)
     · -border (+ modificadores) → 2px solid · -thin, -grey, -mediumgrey,
                                    -lightgrey, -short-top/bottom (revistas)
     · --live                    → punto rojo pulsante para "en directo"
                                    (animación + brand-aware box-shadow)
     · -column-count-xs          → column-count: 2 desde Lg
     · -column-gap-{xs..xlg}     → gap entre columnas (1/2/3.5/6/8rem)

   Estructura:
     · Base (interactive)   → opacity (la más visual e ilustrativa)
     · Galleries            → Opacity · Round · Border · Live · Columns
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SSOT — 1:1 con _properties.scss ▼ */
    const DATA = {
        opacities: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        rounds: [
            ["xs",  "0.5rem"],
            ["sm",  "1rem"],
            ["md",  "0.5rem"],
            ["lg",  "1rem"],
            ["xlg", "1.5rem"]
        ],
        borderMods: [
            ["",            "(base) 2px solid · currentColor"],
            ["-thin",       "-thin · 1px solid"],
            ["-grey",       "-grey · color: darkGrey"],
            ["-mediumgrey", "-mediumgrey · color: mediumGrey"],
            ["-lightgrey",  "-lightgrey · color: lightGrey"]
        ],
        columnGaps: [
            ["xs",  "1rem"],
            ["sm",  "2rem"],
            ["md",  "3.5rem"],
            ["lg",  "6rem"],
            ["xlg", "8rem"]
        ]
    };

    /* ─── BASE — opacity ─── */
    const baseArgTypes = [
        { key: "step", control: "select",
          desc: "Step de opacity (10 en 10).",
          options: DATA.opacities.map(n => [String(n), String(n) + "%"]) }
    ];
    const baseArgs = { step: "50" };
    const liveBase = (a) => {
        const cls = "ft-helper-property-opacity-" + a.step;
        return `<div style="padding:20px;background:#fff;border:1px dashed #999;border-radius:3px;">
            <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:10px;">.${esc(cls)}</code>
            <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">El bloque hereda <code>opacity: ${parseInt(a.step,10) / 100}</code>. Tablero de fondo para que la atenuación sea visible.</p>
            <div style="background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0px;background-color:#fff;border:1px solid #ddd;border-radius:3px;padding:14px;">
                <div class="${esc(cls)}" style="background:#0050b3;color:#fff;padding:18px;border-radius:3px;font:600 14px/1.3 sans-serif;">
                    Target con opacity ${a.step}%
                </div>
            </div>
        </div>`;
    };

    /* ─── Galería: opacity ─── */
    const galleryOpacity = () => {
        const cells = DATA.opacities.map(n => {
            const cls = "ft-helper-property-opacity-" + n;
            return `<div style="display:flex;flex-direction:column;gap:6px;">
                <code style="font:500 10.5px/1.2 monospace;color:#0f62fe;">.${cls}</code>
                <div style="background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:12px 12px;background-position:0 0,0 6px,6px -6px,-6px 0px;background-color:#fff;border:1px solid #ddd;border-radius:3px;padding:10px;">
                    <div class="${cls}" style="background:#0050b3;color:#fff;padding:14px;border-radius:2px;font:600 12px/1.2 sans-serif;text-align:center;">${n}%</div>
                </div>
            </div>`;
        }).join("");
        return `<section>
            <h3 style="margin:0 0 10px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Opacity (10 → 100)</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px;">${cells}</div>
        </section>`;
    };

    /* ─── Galería: round ─── */
    const galleryRound = () => {
        const cells = DATA.rounds.map(([size, val]) => {
            const cls = "ft-helper-property-round-" + size;
            return `<div style="display:flex;flex-direction:column;gap:6px;">
                <code style="font:500 10.5px/1.2 monospace;color:#0f62fe;">.${cls}</code>
                <p style="margin:0;font:400 10.5px/1.3 'Inter',sans-serif;color:#666;">border-radius: ${esc(val)}</p>
                <div class="${cls}" style="background:#0050b3;color:#fff;padding:24px;font:600 12px/1.2 sans-serif;text-align:center;">round ${size}</div>
            </div>`;
        }).join("");
        return `<section>
            <h3 style="margin:0 0 10px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Border radius</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px;">${cells}</div>
        </section>`;
    };

    /* ─── Galería: border ─── */
    const galleryBorder = () => {
        const cells = DATA.borderMods.map(([mod, label]) => {
            const cls = ["ft-helper-property-border", mod].filter(Boolean).join("");
            return `<div style="display:flex;flex-direction:column;gap:6px;">
                <code style="font:500 10.5px/1.2 monospace;color:#0f62fe;">.${cls}</code>
                <p style="margin:0;font:400 10.5px/1.3 'Inter',sans-serif;color:#666;">${esc(label)}</p>
                <div class="${cls}" style="background:#fff;padding:18px;font:600 12px/1.2 sans-serif;text-align:center;color:#333;">contenido</div>
            </div>`;
        }).join("");
        return `<section>
            <h3 style="margin:0 0 10px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Border</h3>
            <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">Base aplica <code>2px solid currentColor</code>. <code>-thin</code> reduce a 1px. Los modificadores de color sobreescriben <code>border-color</code> con tokens DS.</p>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px;">${cells}</div>
            <p style="margin:14px 0 0;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;padding:10px;background:#fffbe6;border-left:3px solid #faad14;border-radius:3px;">
                <strong>Variantes -short-top / -short-bottom</strong>: solo se renderizan bajo marca <code>revistas</code> (añaden una barrita primary decorativa). Cambia el Brand del toolbar para verlas.
            </p>
        </section>`;
    };

    /* ─── Galería: live ─── */
    const galleryLive = () =>
        `<section>
            <h3 style="margin:0 0 10px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">--live · indicador de directo</h3>
            <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">Aplica al bloque un punto rojo (10px) pulsante con la animación <code>shift</code> (1s infinita). Brand-aware: el box-shadow del punto varía por marca para diferentes contrastes.</p>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px;">
                <div>
                    <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:4px;">.ft-helper-property--live</code>
                    <div class="ft-helper-property--live" style="background:#f5f5f5;padding:14px;border-radius:3px;font:600 13px/1.3 sans-serif;color:#333;">
                        EN DIRECTO
                    </div>
                </div>
                <div>
                    <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:4px;">.ft-helper-property--live (sobre fondo negro)</code>
                    <div class="ft-helper-bgColor-black" style="padding:14px;border-radius:3px;">
                        <div class="ft-helper-property--live" style="background:#222;padding:14px;border-radius:3px;font:600 13px/1.3 sans-serif;color:#fff;">
                            EN DIRECTO
                        </div>
                    </div>
                </div>
            </div>
        </section>`;

    /* ─── Galería: columns ─── */
    const galleryColumns = () => {
        const gaps = DATA.columnGaps.map(([size, val]) => {
            const cls = "ft-helper-property-column-count-xs ft-helper-property-column-gap-" + size;
            return `<div style="margin-bottom:14px;">
                <code style="display:block;font:500 10.5px/1.2 monospace;color:#0f62fe;margin-bottom:4px;">.${cls}</code>
                <p style="margin:0 0 4px;font:400 10.5px/1.3 'Inter',sans-serif;color:#666;">column-gap: ${esc(val)} (en ≥1024px)</p>
                <div class="${cls}" style="background:#f5f5f5;padding:10px;border-radius:3px;font:13px/1.5 sans-serif;color:#333;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis neque vel arcu hendrerit, vitae ultrices nisl sollicitudin. Mauris a nibh tristique, dapibus felis sit amet, mollis lectus.
                </div>
            </div>`;
        }).join("");
        return `<section>
            <h3 style="margin:0 0 10px;font:600 13px/1.2 'Inter',sans-serif;color:#161616;">Column count + gap</h3>
            <p style="margin:0 0 12px;font:400 11.5px/1.4 'Inter',sans-serif;color:#666;">
                <code>-column-count-xs</code> aplica <code>column-count: 2</code> solo a partir de 1024px. Combinado con <code>-column-gap-{xs..xlg}</code> regula el espacio entre columnas.
            </p>
            ${gaps}
        </section>`;
    };

    /* ─── Overview ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Property</h1>
        <p class="cb-docs__lead">Familia <code>.ft-helper-property*</code> del 42DS. Categoría miscelánea con 5 sub-familias sin nexo temático fuerte: opacidad, border-radius, borders, indicador "live" y columnas multi-column.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables (incluye <code>--color-functional-error</code> para live)</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado completo</td><td>Recomendado</td></tr>
                <tr><td><code>scss/base/helpers/_properties.scss</code></td><td>Parcial SCSS</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Sub-familias</h2>
        <table class="cb-table">
            <thead><tr><th>Sub-familia</th><th>Clases</th><th>Aplica</th></tr></thead>
            <tbody>
                <tr><td>Opacity</td><td><code>-opacity-{10,20,...,100}</code></td><td><code>opacity: 0.1..1.0</code></td></tr>
                <tr><td>Round</td><td><code>-round-{xs,sm,md,lg,xlg}</code></td><td><code>border-radius: 0.5/1/0.5/1/1.5rem</code></td></tr>
                <tr><td>Border</td><td><code>-border</code> + <code>-thin</code> · <code>-grey</code> · <code>-mediumgrey</code> · <code>-lightgrey</code> · <code>-short-top/bottom</code> (revistas)</td><td><code>border: 2px solid</code> + variantes</td></tr>
                <tr><td>Live</td><td><code>--live</code></td><td>Punto rojo (10px) pulsante con keyframes <code>shift</code>. Brand-aware (box-shadow distinto por marca).</td></tr>
                <tr><td>Columns</td><td><code>-column-count-xs</code> + <code>-column-gap-{xs..xlg}</code></td><td><code>column-count: 2</code> (≥1024px) + <code>column-gap: 1..8rem</code></td></tr>
            </tbody>
        </table>

        <h2>Notas por marca</h2>
        <table class="cb-table">
            <thead><tr><th>Marca</th><th>Diferencia</th></tr></thead>
            <tbody>
                <tr><td><code>revistas</code></td><td>Las clases <code>-border-short-top/-bottom</code> solo se renderizan en esta marca — añaden una barrita decorativa primary mediante un pseudo-elemento</td></tr>
                <tr><td><code>sport</code></td><td>El box-shadow del punto live usa <code>var(--color-primary)</code> en lugar del blanco que aplican el resto</td></tr>
            </tbody>
        </table>

        <h2>Composición</h2>
        <ul>
            <li><code>-opacity-*</code> sobre cualquier elemento atenúa el bloque y sus hijos. Para opacar SOLO el fondo, usa <code>.ft-helper-bgColor-{black,white}-opacity-*</code> de Background.</li>
            <li><code>-border-*</code> usa <code>currentColor</code> por defecto — combina con <code>.ft-helper-fontColor-*</code> para pintar el borde con un token de marca.</li>
            <li><code>--live</code> + <code>.ft-helper-fontType--uppercase</code> + <code>.ft-helper-fontWeight-700</code> = etiqueta de "EN DIRECTO" canónica.</li>
        </ul>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Prefijo</td><td><code>.ft-helper-property-</code> (sub-familias) · <code>.ft-helper-property--live</code> (modificador del bloque)</td></tr>
                <tr><td>Sub-familias</td><td><code>opacity</code> · <code>round</code> · <code>border</code> · <code>column-count/gap</code></td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/base/helpers/_properties.scss</code> · showroom: <code>fourty/helpers/helper-property.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const PROPERTY = {
        id: "property",
        name: "Property",
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
                    { id: "opacity", name: "Opacity",          kind: "gallery", full: true, render: galleryOpacity },
                    { id: "round",   name: "Round",            kind: "gallery", full: true, render: galleryRound },
                    { id: "border",  name: "Border",           kind: "gallery", full: true, render: galleryBorder },
                    { id: "live",    name: "--live",           kind: "gallery", full: true, render: galleryLive },
                    { id: "columns", name: "Column count+gap", kind: "gallery", full: true, render: galleryColumns }
                ]
            }
        ]
    };
    window.SB.register(PROPERTY);
    window.SB.loadMarkup(PROPERTY, document.currentScript && document.currentScript.src, { full: true });
})();
