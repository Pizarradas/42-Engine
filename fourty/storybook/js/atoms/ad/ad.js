/* ════════════════════════════════════════════════════════════════════════
   atoms/ad/ad.js — Atoms / Ad
   Casuística REAL de scss/fourties/atoms/ad/_ad.scss (clases .ft-ad*).
   Markup tomado de fourty/atoms/atom-ad.html. Cero invención de API.

   ╔══════════════════════════════════════════════════════════════════════╗
   ║  DATA-DRIVEN: la casuística vive en el objeto DATA (SSOT). Añadir/     ║
   ║  quitar un formato = editar el array, no el markup.                    ║
   ╚══════════════════════════════════════════════════════════════════════╝

   .ft-ad es el contenedor de un hueco publicitario: centra el creativo y pinta
   la etiqueta «Publicidad» (pseudo `:before`). Los formatos son modificadores:
   --mega · --roba · --intext · --taboola · --footer · --Marketing, cada uno con
   su variante "Notext" (oculta la etiqueta) donde aplica, más el hijo --sticky.
   CONVENCIÓN: la pieza fundamental se llama siempre "Base".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc, spec, frameworkBlock } = window.SB.helpers;

    /* ══════════════════════════════════════════════════════════════════════
       ▼▼▼  SINGLE SOURCE OF TRUTH — reflejan 1:1 _ad.scss  ▼▼▼
       ══════════════════════════════════════════════════════════════════════ */
    const DATA = {
        // [clave, etiqueta, w, h, leyenda del placeholder]. base = sin modificador.
        formats: [
            ["base", "Base", 728, 90, "728×90"],
            ["mega", "Mega", 970, 250, "Mega · 970×250"],
            ["roba", "Roba", 300, 600, "Roba · 300×600"],
            ["intext", "Intext", 300, 250, "Intext · 300×250"],
            ["taboola", "Taboola", 640, 360, "Taboola · feed"]
        ],
        // Formatos que tienen variante --[fmt]Notext (oculta la etiqueta «Publicidad»)
        notextable: ["mega", "roba", "intext"]
    };

    const framework = frameworkBlock({
        intro: `En Vue y React el contenedor <code>.ft-ad</code> deberia seguir siendo declarativo, pero el relleno del hueco y el sticky del footer deben tratarse como integraciones de cliente contra vendors externos.`,
        rows: [
            ["Slot publicitario", `Monta el ad-server en <code>onMounted()</code> sobre un contenedor estable y evita recrearlo en cada cambio reactivo irrelevante.`, `Monta el ad-server en <code>useEffect()</code> sobre un <code>ref</code> estable y limita las dependencias del efecto a los datos del slot.`],
            ["Refresh", `Repite la peticion solo cuando cambien placement, ruta o segmentacion; no en cada rerender.`, `Repite la peticion solo cuando cambien placement, ruta o segmentacion; no en cada rerender.`],
            ["Footer sticky", `Carga <code>fourty-ads_skys-sticky.js</code> solo cuando uses <code>.ft-ad--footer</code> y desmonta listeners al salir de la vista.`, `Carga <code>fourty-ads_skys-sticky.js</code> solo cuando uses <code>.ft-ad--footer</code> y ejecuta cleanup de listeners al desmontar.`]
        ],
        note: `No recrees el nodo raiz del slot si el vendor ya ha servido una impresion: duplicarias mediciones, listeners o requests del ad-server.`,
        warn: true
    });
    /* ▲▲▲  fin SINGLE SOURCE OF TRUTH  ▲▲▲ */

    const fmt = k => DATA.formats.find(f => f[0] === k);

    /* ─── Placeholder de creativo (sin dependencia de assets ni servidor) ─── */
    const banner = (w, h, label) =>
        `<div style="width:${w}px;max-width:100%;height:${h}px;display:flex;align-items:center;justify-content:center;background:repeating-linear-gradient(45deg,#e9eef5 0 10px,#dde6f0 10px 20px);color:#5a6b85;font:600 12px/1.3 'Inter',sans-serif;border-radius:3px;text-align:center;">${esc(label)}</div>`;

    const adBox = (mods, w, h, label) =>
        `<aside class="${["ft-ad"].concat(mods).join(" ")}">${banner(w, h, label)}</aside>`;

    /* ══════════════════════════════════════════════════════════════════════
       BASE — .ft-ad + formato. Cada eje = un operador en Controls.
       ══════════════════════════════════════════════════════════════════════ */
    const baseArgTypes = [
        { key: "format", control: "select", desc: "Formato del hueco (.ft-ad--[formato]). 'Base' = sin modificador.",
          options: DATA.formats.map(f => [f[0], f[1]]) },
        { key: "notext", control: "boolean", desc: "Oculta la etiqueta «Publicidad» (.ft-ad--[formato]Notext). Solo aplica a mega · roba · intext." }
    ];
    const baseArgs = { format: "mega", notext: false };
    function liveBase(a) {
        const f = fmt(a.format);
        const mods = [];
        if (a.format !== "base") mods.push("ft-ad--" + a.format);
        if (a.notext && DATA.notextable.indexOf(a.format) >= 0) mods.push("ft-ad--" + a.format + "Notext");
        return adBox(mods, f[2], f[3], f[4]);
    }

    /* ══════════════════════════════════════════════════════════════════════
       GALERÍA — todos los formatos inline de un vistazo
       ══════════════════════════════════════════════════════════════════════ */
    function galleryFormats() {
        return DATA.formats.map(f => {
            const mods = f[0] === "base" ? [] : ["ft-ad--" + f[0]];
            return spec(f[1] + " · .ft-ad" + (f[0] === "base" ? "" : "--" + f[0]), adBox(mods, f[2], f[3], f[4]));
        }).join("");
    }

    /* ══════════════════════════════════════════════════════════════════════
       OVERVIEW
       ══════════════════════════════════════════════════════════════════════ */
    const overview = `<div class="cb-docs__inner">
        <h1>Ad</h1>
        <p class="cb-docs__lead">Átomo contenedor de huecos publicitarios (<code>.ft-ad</code>): centra el creativo, fija un <code>min-height</code> por formato (anti-CLS) y pinta la etiqueta <strong>«Publicidad»</strong> con un pseudo-elemento <code>:before</code>. Los formatos son modificadores.</p>

        <h2>Dependencias</h2>
        <p>Lo que necesita un proyecto consumidor para renderizar <code>.ft-ad</code>:</p>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                    <tr><td><code>brands/[marca]/atoms/ad.css</code></td><td>CSS compilado del átomo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                    <tr><td><code>scss/fourties/atoms/ad/_ad.scss</code> + <code>ad-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar (importa <code>abstracts</code> + <code>vendors/bourbon</code>)</td></tr>
                    <tr><td><code>cds-statics/js/sticking/fourty-ads_skys-sticky.js</code></td><td>JavaScript runtime</td><td>Cuando se use <code>.ft-ad--footer</code> junto a tapbar / skys sticky en noticia</td></tr>
                    <tr><td>Ad-server (Google Ad Manager, Taboola…)</td><td>JS de terceros</td><td>El que inyecta el creativo real en el hueco</td></tr>
                </tbody>
            </table>
        </div>
        <div class="cb-callout">El átomo es <strong>CSS-first</strong>: maqueta el hueco y la etiqueta. El creativo lo inyecta el ad-server (no forma parte del DS). El runtime <code>fourty-ads_skys-sticky.js</code> solo ajusta la posición del formato footer en scroll cuando convive con tapbar / skys. La etiqueta «Publicidad» se traduce por marca en <em>regionales</em> (werbung / publicitat) vía <code>behavior-parent</code>.</div>
        ${framework}

        <h2>Formatos</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Formato</th><th>Notext</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-ad</code></td><td>Base (banner genérico)</td><td>—</td></tr>
                <tr><td><code>--mega</code></td><td>Megabanner (≤990px)</td><td><code>--megaNotext</code></td></tr>
                <tr><td><code>--roba</code></td><td>Robapáginas (300×600)</td><td><code>--robaNotext</code> · <code>--robaX2</code></td></tr>
                <tr><td><code>--intext</code></td><td>In-text (recuadro gris)</td><td><code>--intextNotext</code></td></tr>
                <tr><td><code>--taboola</code></td><td>Feed de recomendación</td><td>sin etiqueta</td></tr>
                <tr><td><code>--footer</code></td><td>Fijo abajo (<code>position:fixed</code>) + <code>__content</code> · <code>__embed</code> · botón cerrar</td><td><code>--footerNotext</code></td></tr>
                <tr><td><code>--Marketing</code></td><td>Marketing fijo abajo</td><td>sin etiqueta</td></tr>
                <tr><td><code>--sticky</code></td><td>Hijo <code>position:sticky</code> (acompaña al scroll)</td><td>—</td></tr>
            </tbody>
        </table>
        <div class="cb-callout">Toda la casuística inline vive en el objeto <code>DATA</code> de <code>storybook/js/atoms/ad/ad.js</code>. Los formatos <strong>fijos</strong> (<code>--footer</code>, <code>--Marketing</code>) y el <strong>--sticky</strong> no se muestran como story interactiva (su posicionamiento <code>fixed/sticky</code> no encaja en el lienzo); su markup canónico está en el subgrupo <strong>Markup</strong>.</div>

        <h2>Runtime · footer sticky</h2>
        <p><code>cds-statics/js/sticking/fourty-ads_skys-sticky.js</code> recalcula el <code>bottom</code> de cada <code>.ft-ad--footer</code> visible durante el scroll para evitar solapes con la tapbar y ajustar la salida del anuncio según altura, dispositivo y dirección del scroll.</p>
        <div class="cb-callout">La versión actual agrupa primero las lecturas de layout (<code>visibility</code> y <code>offsetHeight</code>) y después aplica escrituras de estilo. El listener de scroll es <code>passive</code> y queda limitado por <code>requestAnimationFrame</code>, reduciendo reflows y trabajo repetido en scroll intensivo.</div>

        <h2>Visibilidad por dispositivo</h2>
        <p>El propio átomo no trae breakpoints de visibilidad: se compone con los helpers <code>ft-helper-hide-xs</code> (oculta en móvil) y <code>ft-helper-hide-md</code> (oculta desde tablet) — ver helper <em>Hides</em>.</p>

        <h2>Anatomía · BEM</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-ad</code></td></tr>
                <tr><td>Etiqueta</td><td><code>:before { content: "Publicidad" }</code></td></tr>
                <tr><td>Elemento</td><td><code>.ft-ad__image</code> · (footer) <code>.ft-ad--footer__content</code> · <code>__embed</code></td></tr>
                <tr><td>Formatos</td><td><code>--mega</code> · <code>--roba</code> · <code>--intext</code> · <code>--taboola</code> · <code>--footer</code> · <code>--Marketing</code> · <code>--sticky</code></td></tr>
                <tr><td>Sin etiqueta</td><td><code>--megaNotext</code> · <code>--robaNotext</code> · <code>--intextNotext</code> · <code>--footerNotext</code></td></tr>
            </tbody>
        </table>

        <h2>Accesibilidad</h2>
        <div class="cb-callout">El hueco se marca con <code>&lt;aside&gt;</code> (contenido tangencial). El creativo debe llevar <code>alt</code>; la etiqueta «Publicidad» es decorativa (pseudo-elemento) e informa al usuario de que es contenido patrocinado.</div>

        <p class="cb-src">Fuente: <code>scss/fourties/atoms/ad/_ad.scss</code> · markup: <code>fourty/atoms/atom-ad.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const AD = {
        id: "ad",
        name: "Ad",
        group: "Atoms",
        signals: ["js"],
        overview,
        stories: [
            { id: "base", name: "Base", hint: ".ft-ad", kind: "interactive", full: true,
              argTypes: baseArgTypes, args: baseArgs, render: liveBase }
        ],
        subgroups: [
            { id: "galleries", name: "Galleries", collapsed: true,
              stories: [
                  { id: "formats", name: "Formatos", hint: "inline", kind: "gallery", full: true, render: galleryFormats }
              ]
            }
        ]
    };
    window.SB.register(AD);
    window.SB.loadMarkup(AD, document.currentScript && document.currentScript.src, { full: true });
})();
