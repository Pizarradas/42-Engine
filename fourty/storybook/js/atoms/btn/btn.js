/* atoms/btn/btn.js - Atoms / Btn */
(function () {
    "use strict";

    const { esc, spec, block } = window.SB.helpers;
    const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
    const labelize = s => s.split("-").map(cap).join(" ");
    const each = (list, fn) => list.map(fn).join("");

    const DATA = {
        kinds: ["primary", "secondary", "tertiary"],
        sizes: ["xs", "sm", "md", "lg", "sm-md", "md-lg"],
        navIcons: [
            "back", "close", "check", "send", "remove", "right", "down", "left", "viewfull", "viewgrid",
            "info", "user", "users", "edit", "delete", "query", "copy", "arrow", "favorite", "gift",
            "like", "dislike", "bookmark", "share", "reload", "more-v", "plus", "minus"
        ],
        navShapes: [["", "Default"], ["circle", "Circle"], ["square", "Square"]],
        navSizes: {
            "": ["md"],
            circle: ["sm-md", "md", "lg"],
            square: ["md", "lg"]
        },
        rrss: [
            "email", "facebook", "instagram", "linkedin", "pinterest", "snapchat", "twitter",
            "telegram", "whatsapp", "youtube", "tiktok", "threads", "bluesky", "bookmark", "share"
        ]
    };

    const ICON = primal => `<svg class="ft-btn__icon${primal ? " ft-btn__icon--primal" : ""}" viewBox="0 0 32 32" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M26 24v4H6v-4H4v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-4zm0-10-1.41-1.41L17 20.17V2h-2v18.17l-7.59-7.58L6 14l10 10z"/></svg>`;
    const btn = (mods, text) => `<button type="button" class="${["ft-btn"].concat(mods).join(" ")}">${esc(text)}</button>`;
    const navBtn = (icon, mod) => `<button type="button" class="ft-btn-nav ft-btn-nav--${icon}${mod ? " " + mod : ""}" title="${esc(labelize(icon))}"><span class="ft-btn-nav__text">${esc(labelize(icon))}</span><span class="ft-btn-nav__icon"></span></button>`;
    const rrssBtn = (net, primary) => `<a href="#" class="ft-btn-rrss ft-btn-rrss--${net}${primary ? " ft-btn-rrss--primary" : ""}" title="${esc(labelize(net))}"><span class="ft-mol-rrss ft-mol-rrss${labelize(net).replace(/\s+/g, "")}--default ft-btn-rrss__icon"></span><span class="ft-btn-rrss__text">${esc(labelize(net))}</span></a>`;
    const family = (id, name, hint, argTypes, args, render) => ({ id, name, hint, kind: "interactive", argTypes, args, render });

    const baseArgTypes = [
        { key: "label", control: "text", desc: "Contenido textual del boton." },
        { key: "kind", control: "select", desc: "Jerarquia visual (.ft-btn--[kind]).", options: DATA.kinds.map(k => ["ft-btn--" + k, k]) },
        { key: "size", control: "select", desc: "Tamano (.ft-btn--[size]) con variantes responsive.", options: DATA.sizes.map(s => ["ft-btn--" + s, s]) },
        { key: "tag", control: "select", desc: "Etiqueta HTML: accion con <button> o navegacion con <a>.", options: [["button", "<button>"], ["a", "<a>"]] },
        { key: "withIcon", control: "boolean", desc: "Activa .ft-btn--[kind]-has--icon y .ft-btn__icon." },
        { key: "iconPosition", control: "radio", desc: "Posicion del icono; derecha usa .ft-btn-has--icon-rgt.", options: [["left", "left"], ["right", "right"]] },
        { key: "iconPrimal", control: "boolean", desc: "Conserva el color original del icono (.ft-btn__icon--primal)." },
        { key: "squared", control: "boolean", desc: "Modo icon-only cuadrado (.ft-btn-is--squared)." },
        { key: "badge", control: "text", desc: "Contenido de .ft-btn__badge. Vacio = sin badge." },
        { key: "disabled", control: "boolean", desc: "Estado deshabilitado para button o anchor." },
        { key: "hueGrey", control: "boolean", desc: "Activa el modificador cromatico .ft-btn--hue-grey." },
        { key: "onDark", control: "boolean", desc: "Previsualiza el boton sobre fondo oscuro real del DS." }
    ];
    const baseArgs = {
        label: "Text",
        kind: "ft-btn--primary",
        size: "ft-btn--md",
        tag: "button",
        withIcon: false,
        iconPosition: "left",
        iconPrimal: false,
        squared: false,
        badge: "",
        disabled: false,
        hueGrey: false,
        onDark: false
    };
    function liveBase(a) {
        const cls = ["ft-btn"];
        if (a.kind) cls.push(a.kind);
        if (a.size) cls.push(a.size);
        if (a.hueGrey) cls.push("ft-btn--hue-grey");
        if (a.withIcon) {
            if (a.kind) cls.push(a.kind + "-has--icon");
            if (a.iconPosition === "right") cls.push("ft-btn-has--icon-rgt");
        }
        if (a.squared) cls.push("ft-btn-is--squared");
        const isAnchor = a.tag === "a";
        if (a.disabled && isAnchor) {
            cls.push("ft-btn-is--disabled");
            const kind = (a.kind || "").replace("ft-btn--", "");
            if (kind) cls.push("ft-btn-is--disabled" + cap(kind));
        }
        const icon = a.withIcon ? ICON(a.iconPrimal) : "";
        let inner = a.iconPosition === "right" ? esc(a.label) + icon : icon + esc(a.label);
        if (a.badge) inner += `<span class="ft-btn__badge" aria-label="${esc(a.badge)}">${esc(a.badge)}</span>`;
        let html = isAnchor
            ? `<a href="#" class="${cls.join(" ")}" title="${esc(a.label)}">${inner}</a>`
            : `<button type="button" class="${cls.join(" ")}"${a.disabled ? " disabled" : ""}>${inner}</button>`;
        if (a.onDark) html = `<div class="ft-helper-bgColor-black" style="padding:2.5rem 3rem">${html}</div>`;
        return html;
    }

    const scrollUpArgTypes = [
        { key: "label", control: "text", desc: "Nombre accesible para el boton flotante." },
        { key: "hueGrey", control: "boolean", desc: "Activa el modificador cromatico .ft-btn--hue-grey." },
        { key: "onDark", control: "boolean", desc: "Previsualiza sobre fondo oscuro." }
    ];
    const scrollUpArgs = { label: "Volver arriba", hueGrey: false, onDark: false };
    function liveScrollUp(a) {
        const button = `<button type="button" class="ft-btn ft-btn--scrollUp${a.hueGrey ? " ft-btn--hue-grey" : ""}" aria-label="${esc(a.label)}" title="${esc(a.label)}" style="display:inline-block;position:relative;right:auto;bottom:auto"></button>`;
        const inner = `<div style="min-height:8rem;display:flex;align-items:center;padding:2rem">${button}</div>`;
        return a.onDark ? `<div class="ft-helper-bgColor-black">${inner}</div>` : inner;
    }

    const navArgTypes = [
        { key: "icon", control: "select", desc: "Icono de accion (.ft-btn-nav--[icono]).", options: DATA.navIcons.map(i => [i, i]) },
        { key: "shape", control: "select", desc: "Forma del boton: default, circle o square.", options: DATA.navShapes },
        { key: "size", control: "select", desc: "Tamano valido segun la forma elegida.", options: [["", "auto"], ["sm-md", "sm-md"], ["md", "md"], ["lg", "lg"]] },
        { key: "primary", control: "boolean", desc: "Variante outline especial (.ft-btn-nav--primary)." },
        { key: "bordered", control: "boolean", desc: "Borde visible (.ft-btn-nav--bordered)." },
        { key: "shadow", control: "boolean", desc: "Sombra (.ft-btn-nav--shadow)." },
        { key: "active", control: "boolean", desc: "Estado activo (.ft-btn-nav--active)." },
        { key: "checked", control: "boolean", desc: "Estado marcado (.ft-btn-nav--checked)." },
        { key: "disabled", control: "boolean", desc: "Estado deshabilitado ([disabled])." },
        { key: "label", control: "text", desc: "Texto accesible de .ft-btn-nav__text." }
    ];
    const navArgs = {
        icon: "edit",
        shape: "",
        size: "",
        primary: false,
        bordered: true,
        shadow: false,
        active: false,
        checked: false,
        disabled: false,
        label: "Text"
    };
    function liveNav(a) {
        const cls = ["ft-btn-nav", "ft-btn-nav--" + a.icon];
        if (a.primary) cls.push("ft-btn-nav--primary");
        if (a.shape) {
            cls.push("ft-btn-nav--" + a.shape);
            if (a.size && DATA.navSizes[a.shape].indexOf(a.size) >= 0) cls.push("ft-btn-nav--" + a.shape + "--" + a.size);
        } else if (a.size === "md") {
            cls.push("ft-btn-nav--md");
        }
        if (a.bordered) cls.push("ft-btn-nav--bordered");
        if (a.shadow) cls.push("ft-btn-nav--shadow");
        if (a.active) cls.push("ft-btn-nav--active");
        if (a.checked) cls.push("ft-btn-nav--checked");
        return `<button type="button" class="${cls.join(" ")}" title="${esc(a.label)}"${a.disabled ? " disabled" : ""}><span class="ft-btn-nav__text">${esc(a.label)}</span><span class="ft-btn-nav__icon"></span></button>`;
    }

    const rrssArgTypes = [
        { key: "network", control: "select", desc: "Red social (.ft-btn-rrss--[red]).", options: DATA.rrss.map(n => [n, n]) },
        { key: "primary", control: "boolean", desc: "Variante outline (.ft-btn-rrss--primary)." },
        { key: "label", control: "text", desc: "Texto accesible de .ft-btn-rrss__text." }
    ];
    const rrssArgs = { network: "facebook", primary: false, label: "Text" };
    function liveRrss(a) {
        return `<a href="#" class="ft-btn-rrss ft-btn-rrss--${a.network}${a.primary ? " ft-btn-rrss--primary" : ""}" title="${esc(a.label)}"><span class="ft-mol-rrss ft-mol-rrss${labelize(a.network).replace(/\s+/g, "")}--default ft-btn-rrss__icon"></span><span class="ft-btn-rrss__text">${esc(a.label)}</span></a>`;
    }

    const txtArgTypes = [
        { key: "label", control: "text", desc: "Texto visible del boton." },
        { key: "close", control: "boolean", desc: "Activa la variante .ft-btn-txt--close." }
    ];
    const txtArgs = { label: "Text", close: false };
    function liveTxt(a) {
        const cls = ["ft-btn-txt"];
        if (a.close) cls.push("ft-btn-txt--close");
        return `<button type="button" class="${cls.join(" ")}"${a.close ? ` title="${esc(a.label)}"` : ""}><span class="ft-btn-txt__text">${esc(a.label)}</span>${a.close ? '<span class="ft-btn-txt__icon"></span>' : ""}</button>`;
    }

    const helpArgTypes = [
        { key: "label", control: "text", desc: "Texto visible del boton de ayuda." }
    ];
    const helpArgs = { label: "Ayuda" };
    function liveHelp(a) {
        return `<button type="button" class="ft-btn-help" title="${esc(a.label)}">${esc(a.label)}</button>`;
    }

    const galleryKinds = () =>
        each(DATA.kinds, kind => spec(kind, btn(["ft-btn--" + kind, "ft-btn--md"], labelize(kind))));
    const gallerySizes = () =>
        each(DATA.sizes, size => spec(size, btn(["ft-btn--primary", "ft-btn--" + size], size)));
    const galleryStates = () => `
        ${block("Buttons disabled", each(DATA.kinds, kind => spec(kind, `<button type="button" class="ft-btn ft-btn--${kind} ft-btn--md" disabled>${esc(labelize(kind))}</button>`)))}
        ${block("Anchors disabled", each(DATA.kinds, kind => spec(kind, `<a href="#" class="ft-btn ft-btn--${kind} ft-btn--md ft-btn-is--disabled ft-btn-is--disabled${cap(kind)}" title="${esc(labelize(kind))}">${esc(labelize(kind))}</a>`)))}
    `;
    const galleryIconBadge = () => `
        ${spec("Icon left", `<button type="button" class="ft-btn ft-btn--primary ft-btn--md ft-btn--primary-has--icon">${ICON(false)}Icon left</button>`)}
        ${spec("Icon right", `<button type="button" class="ft-btn ft-btn--primary ft-btn--md ft-btn--primary-has--icon ft-btn-has--icon-rgt">Icon right${ICON(false)}</button>`)}
        ${spec("Primal", `<button type="button" class="ft-btn ft-btn--secondary ft-btn--md ft-btn--secondary-has--icon">${ICON(true)}Primal</button>`)}
        ${spec("Squared", `<button type="button" class="ft-btn ft-btn--secondary ft-btn--md ft-btn--secondary-has--icon ft-btn-is--squared" title="Accion">${ICON(false)}</button>`)}
        ${spec("Badge", `<button type="button" class="ft-btn ft-btn--primary ft-btn--md">Mensajes<span class="ft-btn__badge" aria-label="3">3</span></button>`)}
    `;
    const gallerySurfaces = () => `
        ${spec("Primary on dark", `<div class="ft-helper-bgColor-black" style="padding:2.5rem 3rem"><button type="button" class="ft-btn ft-btn--primary ft-btn--md">Primary</button></div>`)}
        ${spec("Secondary on dark", `<div class="ft-helper-bgColor-black" style="padding:2.5rem 3rem"><button type="button" class="ft-btn ft-btn--secondary ft-btn--md">Secondary</button></div>`)}
        ${spec("Tertiary on dark", `<div class="ft-helper-bgColor-black" style="padding:2.5rem 3rem"><button type="button" class="ft-btn ft-btn--tertiary ft-btn--md">Tertiary</button></div>`)}
    `;
    const galleryHueGrey = () => `
        <div style="display:flex;flex-wrap:wrap;gap:1.5rem;align-items:center;">
            <button type="button" class="ft-btn ft-btn--primary ft-btn--md ft-btn--hue-grey">Primary</button>
            <button type="button" class="ft-btn ft-btn--secondary ft-btn--md ft-btn--hue-grey">Secondary</button>
            <button type="button" class="ft-btn ft-btn--tertiary ft-btn--md ft-btn--hue-grey">Tertiary</button>
            <button type="button" class="ft-btn ft-btn--secondary ft-btn--md ft-btn--secondary-has--icon ft-btn--hue-grey">${ICON(false)}Newsletter</button>
            <button type="button" class="ft-btn ft-btn--scrollUp ft-btn--hue-grey" aria-label="Volver arriba" title="Volver arriba" style="display:inline-block;position:relative;right:auto;bottom:auto"></button>
        </div>
    `;
    const galleryScrollUp = () =>
        spec("Preview", `<div style="min-height:8rem;display:flex;align-items:center;padding:2rem"><button type="button" class="ft-btn ft-btn--scrollUp" aria-label="Volver arriba" title="Volver arriba" style="display:inline-block;position:relative;right:auto;bottom:auto"></button></div>`);

    const galleryNavIcons = () =>
        block(`Acciones (${DATA.navIcons.length})`, each(DATA.navIcons, icon => navBtn(icon, "ft-btn-nav--bordered")));
    const galleryNavShapes = () => `
        ${spec("Default md", navBtn("back", "ft-btn-nav--md ft-btn-nav--bordered"))}
        ${spec("Circle sm-md", navBtn("edit", "ft-btn-nav--circle ft-btn-nav--circle--sm-md ft-btn-nav--shadow"))}
        ${spec("Circle md", navBtn("edit", "ft-btn-nav--circle ft-btn-nav--circle--md ft-btn-nav--shadow"))}
        ${spec("Circle lg", navBtn("edit", "ft-btn-nav--circle ft-btn-nav--circle--lg ft-btn-nav--shadow"))}
        ${spec("Square md", navBtn("plus", "ft-btn-nav--square ft-btn-nav--square--md ft-btn-nav--shadow"))}
        ${spec("Square lg", navBtn("plus", "ft-btn-nav--square ft-btn-nav--square--lg ft-btn-nav--shadow"))}
    `;
    const galleryNavStates = () => `
        ${spec("Bordered", navBtn("edit", "ft-btn-nav--bordered"))}
        ${spec("Shadow", navBtn("edit", "ft-btn-nav--shadow"))}
        ${spec("Primary", navBtn("copy", "ft-btn-nav--primary"))}
        ${spec("Active", navBtn("favorite", "ft-btn-nav--active ft-btn-nav--bordered"))}
        ${spec("Checked", navBtn("bookmark", "ft-btn-nav--checked ft-btn-nav--bordered"))}
        ${spec("Disabled", `<button type="button" class="ft-btn-nav ft-btn-nav--edit ft-btn-nav--bordered" title="Disabled" disabled><span class="ft-btn-nav__text">Disabled</span><span class="ft-btn-nav__icon"></span></button>`)}
    `;

    const galleryRrssNetworks = () =>
        block(`Redes (${DATA.rrss.length})`, each(DATA.rrss, net => rrssBtn(net, false)));
    const galleryRrssOutline = () =>
        block("Outline", each(DATA.rrss, net => rrssBtn(net, true)));

    const storyRows = [
        ["Base", "label, kind, size, tag, withIcon, iconPosition, iconPrimal, squared, badge, disabled, hueGrey, onDark"],
        ["ScrollUp", "label, hueGrey, onDark"],
        ["Nav", "icon, shape, size, primary, bordered, shadow, active, checked, disabled, label"],
        ["RRSS", "network, primary, label"],
        ["Txt", "label, close"],
        ["Help", "label"]
    ];

    /* legacy overview removed
        <h1>Btn</h1>
        <p class="cb-docs__lead">Atomo de accion del 42DS. La pieza base <code>.ft-btn</code> cubre jerarquia, tamano, icono, badge, disabled, squared y la variante flotante <code>--scrollUp</code>; el mismo archivo SCSS define ademas las familias <code>.ft-btn-nav</code>, <code>.ft-btn-rrss</code>, <code>.ft-btn-txt</code> y <code>.ft-btn-help</code>.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuando</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de marca</td><td>Siempre · primero</td></tr>
                    <tr><td><code>brands/[marca]/atoms/btn.css</code></td><td>CSS compilado del atomo</td><td>Siempre, o bundle <code>[marca]-core.css</code></td></tr>
                    <tr><td><code>scss/fourties/atoms/btn/_btn.scss</code> + <code>btn-[marca].scss</code></td><td>Fuente SCSS</td><td>Solo compilacion</td></tr>
                    <tr><td><code>cds-statics/js/scroll/fourty-js-scrollUp.js</code> + jQuery</td><td>JS</td><td>Solo para <code>.ft-btn--scrollUp</code></td></tr>
                </tbody>
            </table>
        </div>
        <div class="cb-callout">Base, Nav, RRSS, Txt y Help son CSS puro. La unica variante con dependencia JS es <code>--scrollUp</code>, porque el script controla cuando aparece el boton flotante.</div>

        <h2>Inventario real</h2>
        <table class="cb-table">
            <thead><tr><th>Familia</th><th>Clase</th><th>Variantes documentadas</th><th>Stories</th></tr></thead>
            <tbody>
                <tr><td>Base</td><td><code>.ft-btn</code></td><td>${DATA.kinds.length} kinds · ${DATA.sizes.length} sizes · icono izq/der · primal · badge · squared · disabled</td><td><strong>Base</strong> + Base Galleries + Markup</td></tr>
                <tr><td>ScrollUp</td><td><code>.ft-btn--scrollUp</code></td><td>Variante flotante "volver arriba"</td><td><strong>ScrollUp</strong> + Base Galleries + Markup</td></tr>
                <tr><td>Nav</td><td><code>.ft-btn-nav</code></td><td>${DATA.navIcons.length} iconos · default/circle/square · states · primary</td><td><strong>Nav</strong> + Nav Galleries + Markup</td></tr>
                <tr><td>RRSS</td><td><code>.ft-btn-rrss</code></td><td>${DATA.rrss.length} redes · outline <code>--primary</code></td><td><strong>RRSS</strong> + RRSS Galleries + Markup</td></tr>
                <tr><td>Txt</td><td><code>.ft-btn-txt</code></td><td>base y <code>--close</code></td><td><strong>Txt</strong> + Markup</td></tr>
                <tr><td>Help</td><td><code>.ft-btn-help</code></td><td>CTA de ayuda con icono integrado</td><td><strong>Help</strong> + Markup</td></tr>
            </tbody>
        </table>

        <h2>Modificadores y elementos</h2>
        <table class="cb-table">
            <thead><tr><th>Grupo</th><th>Clases reales</th></tr></thead>
            <tbody>
                <tr><td>Jerarquia base</td><td><code>--primary</code> · <code>--secondary</code> · <code>--tertiary</code></td></tr>
                <tr><td>Tamanos base</td><td><code>--xs</code> · <code>--sm</code> · <code>--md</code> · <code>--lg</code> · <code>--sm-md</code> · <code>--md-lg</code></td></tr>
                <tr><td>Icono base</td><td><code>--primary-has--icon</code> · <code>--secondary-has--icon</code> · <code>--tertiary-has--icon</code> · <code>-has--icon-rgt</code> · <code>__icon</code> · <code>__icon--primal</code></td></tr>
                <tr><td>Estados base</td><td><code>__badge</code> · <code>-is--squared</code> · <code>-is--disabled</code> · <code>-is--disabledPrimary</code> · <code>-is--disabledSecondary</code> · <code>-is--disabledTertiary</code> · <code>--scrollUp</code></td></tr>
                <tr><td>Contexto padre</td><td><code>.ft-btn-hue-grey</code> desatura a grises las familias <code>.ft-btn</code>, <code>.ft-btn-nav</code>, <code>.ft-btn-rrss</code>, <code>.ft-btn-txt</code> y <code>.ft-btn-help</code></td></tr>
                <tr><td>RRSS</td><td><code>.ft-btn-rrss</code> + redes <code>${DATA.rrss.join("</code> · <code>")}</code> + <code>--primary</code></td></tr>
                <tr><td>Nav</td><td><code>.ft-btn-nav</code> + ${DATA.navIcons.length} iconos · <code>--md</code> · <code>--bordered</code> · <code>--circle</code> · <code>--circle--sm-md</code> · <code>--circle--md</code> · <code>--circle--lg</code> · <code>--square</code> · <code>--square--md</code> · <code>--square--lg</code> · <code>--checked</code> · <code>--shadow</code> · <code>--active</code> · <code>--primary</code></td></tr>
                <tr><td>Txt / Help</td><td><code>.ft-btn-txt</code> · <code>.ft-btn-txt--close</code> · <code>.ft-btn-txt__text</code> · <code>.ft-btn-txt__icon</code> · <code>.ft-btn-help</code></td></tr>
            </tbody>
        </table>

        <h2>Contexto hue grey</h2>
        <p>Cuando necesites neutralizar cromaticamente una accion sin crear una nueva variante visual del boton, envuelve la pieza en <code>.ft-btn-hue-grey</code>. El contexto aplica una desaturacion uniforme y sirve tanto para un boton aislado como para una botonera completa. En Storybook esta casuistica queda expuesta como control <code>greyContext</code> en todas las familias interactivas.</p>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Resultado</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-btn</code></td><td>Convierte jerarquias primary/secondary/tertiary a una lectura gris sin tocar su estructura.</td></tr>
                <tr><td><code>.ft-btn-nav</code> / <code>.ft-btn-rrss</code></td><td>Desatura iconos, bordes y fondos manteniendo el mismo layout y estados.</td></tr>
                <tr><td><code>.ft-btn-txt</code> / <code>.ft-btn-help</code></td><td>Sirve para CTA secundarios o estados menos protagonistas sin abrir mas modificadores.</td></tr>
            </tbody>
        </table>
        <pre class="cb-code"><code>&lt;div class="ft-btn-hue-grey"&gt;
  &lt;button type="button" class="ft-btn ft-btn--secondary ft-btn--md ft-btn--secondary-has--icon"&gt;
    ...
    Recibir newsletter
  &lt;/button&gt;
&lt;/div&gt;</code></pre>

        <h2>Controles por story</h2>
        <table class="cb-table">
            <thead><tr><th>Story</th><th>Controles</th></tr></thead>
            <tbody>
                ${each(storyRows, row => `<tr><td><strong>${row[0]}</strong></td><td>${row[1]}</td></tr>`)}
            </tbody>
        </table>

        <h2>Categorizacion del arbol</h2>
        <p>La documentacion queda separada en dos capas: stories interactivas para cada familia y subgrupos de galerias por eje real del SCSS. El subgrupo <strong>Markup</strong> sigue siendo HTML plano editable por front.</p>
        <table class="cb-table">
            <thead><tr><th>Subgrupo</th><th>Que cubre</th></tr></thead>
            <tbody>
                <tr><td>Base Galleries</td><td>Kinds, sizes, states, icon/badge, surfaces y preview de <code>scrollUp</code></td></tr>
                <tr><td>Base Galleries · Hue grey</td><td>Preview transversal del contexto <code>.ft-btn-hue-grey</code> sobre las familias principales</td></tr>
                <tr><td>Nav Galleries</td><td>Todos los iconos, formas/tamanos y estados de <code>.ft-btn-nav</code></td></tr>
                <tr><td>RRSS Galleries</td><td>Todas las redes y la variante outline <code>--primary</code></td></tr>
                <tr><td>Markup</td><td>Snippets HTML canonicamente editables en <code>storybook/js/atoms/btn/btn.html</code></td></tr>
            </tbody>
        </table>

        <h2>Accesibilidad</h2>
        <div class="cb-callout"><code>&lt;button type="button"&gt;</code> para accion y <code>&lt;a href&gt;</code> para navegacion. Las familias icon-only (<code>nav</code> y <code>rrss</code>) exponen nombre accesible con <code>__text</code> y <code>title</code>. En anchor disabled la documentacion usa la combinacion <code>.ft-btn-is--disabled*</code> porque no existe el atributo nativo <code>disabled</code> para <code>&lt;a&gt;</code>.</div>
        <div class="cb-callout cb-callout--warn">Los iconos de <code>.ft-btn-nav</code>, <code>.ft-btn-help</code> y de <code>.ft-btn-rrss--primary</code> dependen de rutas absolutas <code>/cds-statics/...</code>. Se ven correctamente cuando el storybook corre desde servidor local. La story <strong>ScrollUp</strong> normaliza <code>display</code> y <code>position</code> solo para poder previsualizar la pieza en canvas.</div>

        <p class="cb-src">Fuente: <code>scss/fourties/atoms/btn/_btn.scss</code> · referencia legacy: <code>fourty/__old-showroom/atoms/atom-btn.html</code> · markup storybook: <code>fourty/storybook/js/atoms/btn/btn.html</code></p>
    </div>`;

    */
    const overview = `<div class="cb-docs__inner">
        <h1>Btn</h1>
        <p class="cb-docs__lead">Atomo de accion del 42DS. La pieza base <code>.ft-btn</code> cubre jerarquia, tamano, icono, badge, disabled, squared, el modificador cromatico <code>--hue-grey</code> y la variante flotante <code>--scrollUp</code>. El mismo archivo SCSS define ademas las familias <code>.ft-btn-nav</code>, <code>.ft-btn-rrss</code>, <code>.ft-btn-txt</code> y <code>.ft-btn-help</code>.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuando</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS, variables de marca</td><td>Siempre, primero</td></tr>
                    <tr><td><code>brands/[marca]/atoms/btn.css</code></td><td>CSS compilado del atomo</td><td>Siempre, o bundle <code>[marca]-core.css</code></td></tr>
                    <tr><td><code>scss/fourties/atoms/btn/_btn.scss</code> + <code>btn-[marca].scss</code></td><td>Fuente SCSS</td><td>Solo compilacion</td></tr>
                    <tr><td><code>cds-statics/js/scroll/fourty-js-scrollUp.js</code> + jQuery</td><td>JS</td><td>Solo para <code>.ft-btn--scrollUp</code></td></tr>
                </tbody>
            </table>
        </div>
        <div class="cb-callout">Base, Nav, RRSS, Txt y Help son CSS puro. La unica variante con dependencia JS es <code>--scrollUp</code>, porque el script controla cuando aparece el boton flotante.</div>

        <h2>Inventario real</h2>
        <table class="cb-table">
            <thead><tr><th>Familia</th><th>Clase</th><th>Variantes documentadas</th><th>Stories</th></tr></thead>
            <tbody>
                <tr><td>Base</td><td><code>.ft-btn</code></td><td>${DATA.kinds.length} kinds, ${DATA.sizes.length} sizes, icono izq/der, primal, badge, squared, disabled y <code>--hue-grey</code></td><td><strong>Base</strong> + Base Galleries + Markup</td></tr>
                <tr><td>ScrollUp</td><td><code>.ft-btn--scrollUp</code></td><td>Variante flotante "volver arriba", compatible con <code>--hue-grey</code></td><td><strong>ScrollUp</strong> + Base Galleries + Markup</td></tr>
                <tr><td>Nav</td><td><code>.ft-btn-nav</code></td><td>${DATA.navIcons.length} iconos, default/circle/square, states y primary</td><td><strong>Nav</strong> + Nav Galleries + Markup</td></tr>
                <tr><td>RRSS</td><td><code>.ft-btn-rrss</code></td><td>${DATA.rrss.length} redes y outline <code>--primary</code></td><td><strong>RRSS</strong> + RRSS Galleries + Markup</td></tr>
                <tr><td>Txt</td><td><code>.ft-btn-txt</code></td><td>base y <code>--close</code></td><td><strong>Txt</strong> + Markup</td></tr>
                <tr><td>Help</td><td><code>.ft-btn-help</code></td><td>CTA de ayuda con icono integrado</td><td><strong>Help</strong> + Markup</td></tr>
            </tbody>
        </table>

        <h2>Modificadores y elementos</h2>
        <table class="cb-table">
            <thead><tr><th>Grupo</th><th>Clases reales</th></tr></thead>
            <tbody>
                <tr><td>Jerarquia base</td><td><code>--primary</code>, <code>--secondary</code>, <code>--tertiary</code></td></tr>
                <tr><td>Tamanos base</td><td><code>--xs</code>, <code>--sm</code>, <code>--md</code>, <code>--lg</code>, <code>--sm-md</code>, <code>--md-lg</code></td></tr>
                <tr><td>Icono base</td><td><code>--primary-has--icon</code>, <code>--secondary-has--icon</code>, <code>--tertiary-has--icon</code>, <code>-has--icon-rgt</code>, <code>__icon</code>, <code>__icon--primal</code>. En estados interactivos con fondo oscuro, el icono vira a blanco para mantener contraste.</td></tr>
                <tr><td>Estados base</td><td><code>__badge</code>, <code>-is--squared</code>, <code>-is--disabled</code>, <code>-is--disabledPrimary</code>, <code>-is--disabledSecondary</code>, <code>-is--disabledTertiary</code>, <code>--scrollUp</code>, <code>--hue-grey</code></td></tr>
                <tr><td>RRSS</td><td><code>.ft-btn-rrss</code> + redes <code>${DATA.rrss.join("</code>, <code>")}</code> + <code>--primary</code></td></tr>
                <tr><td>Nav</td><td><code>.ft-btn-nav</code> + ${DATA.navIcons.length} iconos, <code>--md</code>, <code>--bordered</code>, <code>--circle</code>, <code>--circle--sm-md</code>, <code>--circle--md</code>, <code>--circle--lg</code>, <code>--square</code>, <code>--square--md</code>, <code>--square--lg</code>, <code>--checked</code>, <code>--shadow</code>, <code>--active</code>, <code>--primary</code></td></tr>
                <tr><td>Txt / Help</td><td><code>.ft-btn-txt</code>, <code>.ft-btn-txt--close</code>, <code>.ft-btn-txt__text</code>, <code>.ft-btn-txt__icon</code>, <code>.ft-btn-help</code></td></tr>
            </tbody>
        </table>

        <h2>Modificador hue grey</h2>
        <p>Cuando necesites neutralizar cromaticamente un boton base sin abrir una nueva jerarquia, anade <code>.ft-btn--hue-grey</code> sobre la misma pieza. El modificador fuerza un efecto decolorado sobre el render final del boton base y sus variantes directas, incluida <code>--scrollUp</code>. En Storybook se prueba con el control <code>hueGrey</code> de las stories <strong>Base</strong> y <strong>ScrollUp</strong>.</p>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Resultado</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-btn ft-btn--primary ft-btn--hue-grey</code></td><td>Aplica un decolorado sobre primary, secondary o tertiary sin tocar su estructura ni su tamano.</td></tr>
                <tr><td><code>.ft-btn--secondary-has--icon ft-btn--hue-grey</code></td><td>Tambien desatura el icono cuando la pieza base usa una variante con iconografia integrada.</td></tr>
                <tr><td><code>.ft-btn--scrollUp ft-btn--hue-grey</code></td><td>Permite neutralizar la variante flotante manteniendo su comportamiento JS y su posicionamiento.</td></tr>
            </tbody>
        </table>
        <pre class="cb-code"><code>&lt;button
  type="button"
  class="ft-btn ft-btn--secondary ft-btn--md ft-btn--secondary-has--icon ft-btn--hue-grey"&gt;
  ...
  Recibir newsletter
&lt;/button&gt;</code></pre>

        <h2>Controles por story</h2>
        <table class="cb-table">
            <thead><tr><th>Story</th><th>Controles</th></tr></thead>
            <tbody>
                ${each(storyRows, row => `<tr><td><strong>${row[0]}</strong></td><td>${row[1]}</td></tr>`)}
            </tbody>
        </table>

        <h2>Categorizacion del arbol</h2>
        <p>La documentacion queda separada en dos capas: stories interactivas para cada familia y subgrupos de galerias por eje real del SCSS. El subgrupo <strong>Markup</strong> sigue siendo HTML plano editable por front.</p>
        <table class="cb-table">
            <thead><tr><th>Subgrupo</th><th>Que cubre</th></tr></thead>
            <tbody>
                <tr><td>Base Galleries</td><td>Kinds, sizes, states, icon/badge, surfaces, hue grey y preview de <code>scrollUp</code></td></tr>
                <tr><td>Nav Galleries</td><td>Todos los iconos, formas/tamanos y estados de <code>.ft-btn-nav</code></td></tr>
                <tr><td>RRSS Galleries</td><td>Todas las redes y la variante outline <code>--primary</code></td></tr>
                <tr><td>Markup</td><td>Snippets HTML canonicamente editables en <code>storybook/js/atoms/btn/btn.html</code></td></tr>
            </tbody>
        </table>

        <h2>Accesibilidad</h2>
        <div class="cb-callout"><code>&lt;button type="button"&gt;</code> para accion y <code>&lt;a href&gt;</code> para navegacion. Las familias icon-only (<code>nav</code> y <code>rrss</code>) exponen nombre accesible con <code>__text</code> y <code>title</code>. En anchor disabled la documentacion usa la combinacion <code>.ft-btn-is--disabled*</code> porque no existe el atributo nativo <code>disabled</code> para <code>&lt;a&gt;</code>.</div>
        <div class="cb-callout cb-callout--warn">Los iconos de <code>.ft-btn-nav</code>, <code>.ft-btn-help</code> y de <code>.ft-btn-rrss--primary</code> dependen de rutas absolutas <code>/cds-statics/...</code>. Se ven correctamente cuando el storybook corre desde servidor local. La story <strong>ScrollUp</strong> normaliza <code>display</code> y <code>position</code> solo para poder previsualizar la pieza en canvas.</div>

        <p class="cb-src">Fuente: <code>scss/fourties/atoms/btn/_btn.scss</code>, referencia legacy: <code>fourty/__old-showroom/atoms/atom-btn.html</code>, markup storybook: <code>fourty/storybook/js/atoms/btn/btn.html</code></p>
    </div>`;

    const BTN = {
        id: "btn",
        name: "Btn",
        group: "Atoms",
        overview,
        stories: [
            family("base", "Base", ".ft-btn", baseArgTypes, baseArgs, liveBase),
            family("scrollup", "ScrollUp", ".ft-btn--scrollUp", scrollUpArgTypes, scrollUpArgs, liveScrollUp),
            family("nav", "Nav", ".ft-btn-nav", navArgTypes, navArgs, liveNav),
            family("rrss", "RRSS", ".ft-btn-rrss", rrssArgTypes, rrssArgs, liveRrss),
            family("txt", "Txt", ".ft-btn-txt", txtArgTypes, txtArgs, liveTxt),
            family("help", "Help", ".ft-btn-help", helpArgTypes, helpArgs, liveHelp)
        ],
        subgroups: [
            {
                id: "base-galleries",
                name: "Base Galleries",
                collapsed: true,
                stories: [
                    { id: "kinds", name: "Kinds", hint: "3 jerarquias", kind: "gallery", render: galleryKinds },
                    { id: "sizes", name: "Sizes", hint: "6 tamanos", kind: "gallery", render: gallerySizes },
                    { id: "states", name: "States", hint: "button y anchor disabled", kind: "gallery", render: galleryStates },
                    { id: "icon-badge", name: "Icon, badge and squared", hint: "icono, primal, badge, squared", kind: "gallery", render: galleryIconBadge },
                    { id: "surfaces", name: "On dark", hint: "comportamiento sobre fondo oscuro", kind: "gallery", render: gallerySurfaces },
                    { id: "hue-grey", name: "Hue grey", hint: "modificador cromatico base", kind: "gallery", render: galleryHueGrey },
                    { id: "scrollup-preview", name: "ScrollUp preview", hint: "variant flotante", kind: "gallery", render: galleryScrollUp }
                ]
            },
            {
                id: "nav-galleries",
                name: "Nav Galleries",
                collapsed: true,
                stories: [
                    { id: "all-icons", name: "All icons", hint: `${DATA.navIcons.length} iconos`, kind: "gallery", render: galleryNavIcons },
                    { id: "shapes-and-sizes", name: "Shapes and sizes", hint: "default, circle, square", kind: "gallery", render: galleryNavShapes },
                    { id: "nav-states", name: "States", hint: "bordered, primary, active, checked", kind: "gallery", render: galleryNavStates }
                ]
            },
            {
                id: "rrss-galleries",
                name: "RRSS Galleries",
                collapsed: true,
                stories: [
                    { id: "all-networks", name: "All networks", hint: `${DATA.rrss.length} redes`, kind: "gallery", render: galleryRrssNetworks },
                    { id: "outline", name: "Outline", hint: "variante --primary", kind: "gallery", render: galleryRrssOutline }
                ]
            }
        ]
    };

    window.SB.register(BTN);
    window.SB.loadMarkup(BTN, document.currentScript && document.currentScript.src);
}());
