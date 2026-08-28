/* ════════════════════════════════════════════════════════════════════════
   atoms/toogle/toogle.js — Atoms / Toogle
   Casuística REAL de scss/fourties/atoms/toogle/_toogle.scss (.ft-toogle*).
   Markup tomado de fourty/atoms/atom-toogle.html. Cero invención de API.

   ╔══════════════════════════════════════════════════════════════════════╗
   ║  OJO: el nombre conserva el typo histórico "toogle" (no "toggle").     ║
   ╚══════════════════════════════════════════════════════════════════════╝

   .ft-toogle es un control segmentado de radios (apariencia: claro/oscuro/
   sistema). Cada __option envuelve un <input type="radio"> oculto + un
   __button con su __icon (iconLight/iconDark/iconSystem). El radio marcado pinta
   su botón en primary. Es el conmutador de tema del propio showroom; el dark
   mode real del DS se aplica con [data-theme="dark"] en <html>.
   CONVENCIÓN: la pieza fundamental se llama siempre "Base".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { spec } = window.SB.helpers;

    /* ══════════════════════════════════════════════════════════════════════
       ▼▼▼  SINGLE SOURCE OF TRUTH — reflejan 1:1 _toogle.scss  ▼▼▼
       [valor, icono (sufijo de __icon), etiqueta]
       ══════════════════════════════════════════════════════════════════════ */
    const DATA = {
        options: [
            ["light",  "Light",  "Claro"],
            ["dark",   "Dark",   "Oscuro"],
            ["system", "System", "Por sistema"]
        ]
    };
    /* ▲▲▲  fin SINGLE SOURCE OF TRUTH  ▲▲▲ */

    /* ─── Constructor del markup ─── */
    let uid = 0;
    const toogle = (checked) => {
        const name = "sb-toogle-" + (++uid);
        const opt = ([val, icon, label]) =>
            `<label class="ft-toogle__option"><input type="radio" name="${name}"${checked === val ? " checked" : ""}><span class="ft-toogle__button"><i class="ft-toogle__icon ft-toogle__icon${icon}"></i> ${label}</span></label>`;
        return `<div class="ft-toogle" role="group" aria-label="Apariencia">${DATA.options.map(opt).join("")}</div>`;
    };

    /* ══════════════════════════════════════════════════════════════════════
       BASE — .ft-toogle. Cada eje = un operador en Controls.
       ══════════════════════════════════════════════════════════════════════ */
    const baseArgTypes = [
        { key: "checked", control: "select", desc: "Opción marcada (radio activo).", options: DATA.options.map(o => [o[0], o[2]]) }
    ];
    const baseArgs = { checked: "light" };
    function liveBase(a) { return toogle(a.checked); }

    /* ══════════════════════════════════════════════════════════════════════
       GALERÍA — cada opción marcada
       ══════════════════════════════════════════════════════════════════════ */
    const galleryChecked = () =>
        DATA.options.map(o => spec("Marcado: " + o[2], toogle(o[0]))).join("");

    /* ══════════════════════════════════════════════════════════════════════
       OVERVIEW
       ══════════════════════════════════════════════════════════════════════ */
    const overview = `<div class="cb-docs__inner">
        <h1>Toogle</h1>
        <p class="cb-docs__lead">Átomo de <strong>control segmentado</strong> (<code>.ft-toogle</code>): un grupo de radios para elegir apariencia (claro / oscuro / por sistema). La opción marcada pinta su botón en <code>var(--color-primary)</code>.</p>

        <div class="cb-callout cb-callout--warn">El nombre conserva el <strong>typo histórico</strong> «toogle» (no «toggle»). Es el conmutador de tema del propio showroom; el dark mode real del DS se aplica con <code>[data-theme="dark"]</code> en <code>&lt;html&gt;</code> (toolbar <em>Oscuro</em>).</div>

        <div class="cb-callout cb-callout--warn">Los iconos (<code>iconLight</code>/<code>iconDark</code>/<code>iconSystem</code>) son <code>background-image</code> con ruta absoluta <code>/cds-statics/…</code> → solo se ven servidos por un servidor. El segmentado, el borde y el relleno de la opción marcada son CSS y funcionan siempre.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                    <tr><td><code>brands/[marca]/atoms/toogle.css</code></td><td>CSS compilado del átomo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                    <tr><td><code>scss/fourties/atoms/toogle/_toogle.scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar (importa <code>abstracts</code> + <code>vendors/bourbon</code>)</td></tr>
                    <tr><td>JS</td><td>JavaScript</td><td>Para aplicar el tema elegido (lo aporta el proyecto)</td></tr>
                </tbody>
            </table>
        </div>

        <h2>Anatomía · BEM</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-toogle</code></td></tr>
                <tr><td>Opción</td><td><code>.ft-toogle__option</code> (<code>&lt;label&gt;</code> + <code>&lt;input radio&gt;</code> oculto)</td></tr>
                <tr><td>Botón</td><td><code>.ft-toogle__button</code></td></tr>
                <tr><td>Icono</td><td><code>.ft-toogle__icon</code> + <code>Light</code> / <code>Dark</code> / <code>System</code></td></tr>
            </tbody>
        </table>

        <h2>Accesibilidad</h2>
        <div class="cb-callout">Grupo de radios nativos dentro de <code>role="group"</code> con <code>aria-label</code>; el <code>&lt;input&gt;</code> oculto conserva foco y teclado (flechas para cambiar de opción).</div>

        <p class="cb-src">Fuente: <code>scss/fourties/atoms/toogle/_toogle.scss</code> · markup: <code>fourty/atoms/atom-toogle.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const TOOGLE = {
        id: "toogle",
        name: "Toogle",
        group: "Atoms",
        overview,
        stories: [
            { id: "base", name: "Base", hint: ".ft-toogle", kind: "interactive",
              argTypes: baseArgTypes, args: baseArgs, render: liveBase }
        ],
        subgroups: [
            { id: "galleries", name: "Galleries", collapsed: true,
              stories: [
                  { id: "checked", name: "Marcado", hint: "cada opción", kind: "gallery", render: galleryChecked }
              ]
            }
        ]
    };
    window.SB.register(TOOGLE);
    window.SB.loadMarkup(TOOGLE, document.currentScript && document.currentScript.src);
})();
