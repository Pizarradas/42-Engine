/* ════════════════════════════════════════════════════════════════════════
   atoms/link/link.js — Atoms / Link
   Casuística REAL de scss/fourties/atoms/link/_link.scss (clases .ft-link*).
   Markup tomado de fourty/atoms/atom-link.html. Cero invención de API.

   ╔══════════════════════════════════════════════════════════════════════╗
   ║  DATA-DRIVEN: la casuística vive en el objeto DATA (SSOT). Añadir/     ║
   ║  quitar variante = editar el array, no el markup.                      ║
   ╚══════════════════════════════════════════════════════════════════════╝

   .ft-link es el enlace de texto del DS: color primary por defecto, con
   jerarquías (secondary, tertiary), subrayado punteado (--decoration), familia
   con icono chevron (--hasIcon, +plus, +mail) y familia de navegación
   (--nav, navPrev/navNext). El modificador --block lo convierte en un overlay
   invisible que hace clicable toda un área (tarjetas).
   CONVENCIÓN: la pieza fundamental se llama siempre "Base".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc, spec } = window.SB.helpers;

    /* ══════════════════════════════════════════════════════════════════════
       ▼▼▼  SINGLE SOURCE OF TRUTH — reflejan 1:1 _link.scss  ▼▼▼
       ══════════════════════════════════════════════════════════════════════ */
    const DATA = {
        // Jerarquía de color. "" = base (primary).
        kinds: [["", "Primary (base)"], ["secondary", "Secondary"], ["tertiary", "Tertiary"]],
        // Iconos de la familia --hasIcon. "" = chevron por defecto.
        icons: [["", "Chevron"], ["plus", "Plus"], ["mail", "Mail"]],
        // Dirección de la familia --nav.
        navs: [["nav", "Nav (plano)"], ["navPrev", "Prev"], ["navNext", "Next"]]
    };
    /* ▲▲▲  fin SINGLE SOURCE OF TRUTH  ▲▲▲ */

    const link = (mods, label) =>
        `<a href="#" class="${["ft-link"].concat(mods).join(" ")}" title="${esc(label)}">${esc(label)}</a>`;

    /* ══════════════════════════════════════════════════════════════════════
       BASE — .ft-link (jerarquía + decoración)
       ══════════════════════════════════════════════════════════════════════ */
    const baseArgTypes = [
        { key: "kind", control: "select", desc: "Jerarquía de color (.ft-link--[kind]). Base = primary.",
          options: DATA.kinds },
        { key: "decoration", control: "boolean", desc: "Subrayado punteado (.ft-link--decoration); el color sigue al kind." },
        { key: "label", control: "text", desc: "Texto del enlace (slot)." }
    ];
    const baseArgs = { kind: "", decoration: false, label: "consectetur adipiscing elit" };
    function liveBase(a) {
        const mods = [];
        if (a.kind) mods.push("ft-link--" + a.kind);
        if (a.decoration) {
            mods.push("ft-link--decoration");
            // El color del borde punteado depende del kind explícito (.ft-link--primary por defecto).
            mods.push("ft-link--" + (a.kind || "primary"));
        }
        return link(mods, a.label);
    }

    /* ══════════════════════════════════════════════════════════════════════
       HASICON — .ft-link--hasIcon (chevron / plus / mail)
       ══════════════════════════════════════════════════════════════════════ */
    const iconArgTypes = [
        { key: "icon", control: "select", desc: "Icono (.ft-link--hasIcon[-plus|-mail]).", options: DATA.icons },
        { key: "label", control: "text", desc: "Texto del enlace." }
    ];
    const iconArgs = { icon: "", label: "Mostrar más información" };
    function liveIcon(a) {
        const mods = ["ft-link--hasIcon"];
        if (a.icon) mods.push("ft-link--hasIcon-" + a.icon);
        mods.push("ft-helper-fontSize-body-M");
        return link(mods, a.label);
    }

    /* ══════════════════════════════════════════════════════════════════════
       NAV — .ft-link--nav (navegación con chevron)
       ══════════════════════════════════════════════════════════════════════ */
    const navArgTypes = [
        { key: "direction", control: "select", desc: "Dirección (.ft-link--[navPrev|navNext]).", options: DATA.navs },
        { key: "label", control: "text", desc: "Texto del enlace." }
    ];
    const navArgs = { direction: "navPrev", label: "Anterior" };
    function liveNav(a) {
        const mods = ["ft-link--nav"];
        if (a.direction && a.direction !== "nav") mods.push("ft-link--" + a.direction);
        mods.push("ft-helper-fontSize-body-M");
        return link(mods, a.label);
    }

    /* ─── Helper de story plana ─── */
    const family = (id, name, hint, argTypes, args, render) => ({ id, name, hint, kind: "interactive", argTypes, args, render });

    /* ══════════════════════════════════════════════════════════════════════
       GALERÍAS
       ══════════════════════════════════════════════════════════════════════ */
    const galleryKinds = () =>
        DATA.kinds.map(k => spec(k[1], link(k[0] ? ["ft-link--" + k[0]] : [], "Enlace de texto"))).join("");
    const galleryDecoration = () =>
        DATA.kinds.map(k => spec(k[1] + " · decoration",
            link(["ft-link--decoration", "ft-link--" + (k[0] || "primary")], "Enlace punteado"))).join("");

    /* ══════════════════════════════════════════════════════════════════════
       OVERVIEW
       ══════════════════════════════════════════════════════════════════════ */
    const overview = `<div class="cb-docs__inner">
        <h1>Link</h1>
        <p class="cb-docs__lead">Átomo de enlace de texto (<code>.ft-link</code>): color <code>var(--color-primary)</code> por defecto, con jerarquías (<code>--secondary</code>, <code>--tertiary</code>), subrayado punteado (<code>--decoration</code>) y dos familias con icono: <code>--hasIcon</code> y <code>--nav</code>.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                    <tr><td><code>brands/[marca]/atoms/link.css</code></td><td>CSS compilado del átomo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                    <tr><td><code>scss/fourties/atoms/link/_link.scss</code> + <code>link-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar (importa <code>abstracts</code> + <code>vendors/bourbon</code>)</td></tr>
                    <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
                </tbody>
            </table>
        </div>
        <div class="cb-callout cb-callout--warn">Los iconos de <code>--hasIcon</code> y <code>--nav</code> son <code>background-image</code>/<code>mask</code> con ruta absoluta <code>/cds-statics/…</code> (chevron, circle-plus, mail) → solo se ven servidos por un servidor. El texto y los colores funcionan siempre. El filtro de color del chevron se resuelve por marca (cambia el Brand para verlo).</div>

        <h2>Familias y modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code> / <code>--secondary</code> / <code>--tertiary</code></td><td>Jerarquía de color</td></tr>
                <tr><td><code>--decoration</code></td><td>Subrayado punteado (color según kind)</td></tr>
                <tr><td><code>--hasIcon</code> (<code>-plus</code> · <code>-mail</code>)</td><td>Icono a la izquierda (chevron / circle-plus / mail)</td></tr>
                <tr><td><code>--nav</code> (<code>navPrev</code> · <code>navNext</code>)</td><td>Enlace de navegación bold con chevron</td></tr>
                <tr><td><code>--block</code></td><td>Overlay invisible (<code>position:absolute</code> · <code>opacity:0</code>) que hace clicable toda un área (tarjetas). No se renderiza aquí por ser invisible.</td></tr>
            </tbody>
        </table>

        <h2>Anatomía · BEM</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-link</code> (sobre <code>&lt;a&gt;</code> o <code>&lt;button&gt;</code>)</td></tr>
                <tr><td>Jerarquía</td><td><code>--secondary</code> · <code>--tertiary</code></td></tr>
                <tr><td>Familias</td><td><code>--decoration</code> · <code>--hasIcon</code> · <code>--nav</code> · <code>--block</code></td></tr>
            </tbody>
        </table>

        <h2>Accesibilidad</h2>
        <div class="cb-callout">Usa <code>&lt;a href&gt;</code> para navegación con <code>title</code> descriptivo. Para <code>--block</code> (overlay), el contenedor debe tener <code>position:relative</code> y el texto accesible visible debajo.</div>

        <p class="cb-src">Fuente: <code>scss/fourties/atoms/link/_link.scss</code> · markup: <code>fourty/atoms/atom-link.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const LINK = {
        id: "link",
        name: "Link",
        group: "Atoms",
        overview,
        stories: [
            { id: "base", name: "Base", hint: ".ft-link", kind: "interactive", argTypes: baseArgTypes, args: baseArgs, render: liveBase },
            family("hasicon", "HasIcon", ".ft-link--hasIcon", iconArgTypes, iconArgs, liveIcon),
            family("nav", "Nav", ".ft-link--nav", navArgTypes, navArgs, liveNav)
        ],
        subgroups: [
            { id: "galleries", name: "Galleries", collapsed: true,
              stories: [
                  { id: "kinds", name: "Kinds", hint: "3 jerarquías", kind: "gallery", render: galleryKinds },
                  { id: "decoration", name: "Decoration", hint: "punteado por kind", kind: "gallery", render: galleryDecoration }
              ]
            }
        ]
    };
    window.SB.register(LINK);
    window.SB.loadMarkup(LINK, document.currentScript && document.currentScript.src);
})();
