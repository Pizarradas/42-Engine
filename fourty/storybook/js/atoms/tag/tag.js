/* atoms/tag/tag.js - Atoms / Tag */
(function () {
    "use strict";
    const frameworkBlock = window.SB.helpers.frameworkBlock;

    const { esc, spec, block, deprecationBlock } = window.SB.helpers;

    const DATA = {
        sizes: [["", "Base"], ["sm", "sm"], ["md", "md"], ["lg", "lg"]],
        styles: [
            ["", "Filled (base)"],
            ["secondary", "Secondary"],
            ["status-primary", "Status primary"],
            ["status-secondary", "Status secondary"]
        ],
        linkModes: [["link", "Link"], ["linkBasis", "Link basis"]],
        chipSizes: [["sm", "sm"], ["md", "md"]],
        chipControls: [["button", "<button>"], ["link", "<a>"]],
        chipStates: ["unset", "unselected", "selected", "active", "deletable", "loading", "error", "disabled"],
        chipTinyStates: [["unselected", "unselected"], ["selected", "selected"]]
    };

    const tag = (mods, name, value, marker) => {
        const inner =
            (marker ? `<span class="ft-tag__marker"></span>` : "") +
            `<span class="ft-tag__name">${esc(name)}</span>` +
            (value ? `<span class="ft-tag__value">${esc(value)}</span>` : "");
        return `<span class="${["ft-tag"].concat(mods).join(" ")}">${inner}</span>`;
    };

    const listWrap = inner => `<ul role="list" aria-label="Listado de tags">${inner}</ul>`;
    const chipListWrap = inner => `<ul role="list" aria-label="Tag chips">${inner}</ul>`;
    const chipTinyListWrap = inner => `<ul role="list" aria-label="Chip tiny pattern">${inner}</ul>`;
    const styleClass = s => s ? ["ft-tag--" + s] : [];

    const baseArgTypes = [
        { key: "size", control: "select", desc: "Tamano del tag (.ft-tag--[size]).", options: DATA.sizes },
        { key: "style", control: "select", desc: "Visualizacion base, secondary y status.", options: DATA.styles },
        { key: "marker", control: "boolean", desc: "Muestra .ft-tag__marker." },
        { key: "name", control: "text", desc: "Texto principal (.ft-tag__name)." },
        { key: "value", control: "text", desc: "Valor opcional (.ft-tag__value). Vacio = sin valor." }
    ];
    const baseArgs = { size: "md", style: "", marker: true, name: "Name", value: "50" };
    function liveBase(a) {
        const mods = [];
        if (a.size) mods.push("ft-tag--" + a.size);
        mods.push(...styleClass(a.style));
        return tag(mods, a.name, a.value, a.marker);
    }
    function codeBase(a) {
        return listWrap(`<li class="${["ft-tag"].concat((() => {
            const mods = [];
            if (a.size) mods.push("ft-tag--" + a.size);
            mods.push(...styleClass(a.style));
            return mods;
        })()).join(" ")}">${(a.marker ? '<span class="ft-tag__marker"></span>' : "")}<span class="ft-tag__name">${esc(a.name)}</span>${a.value ? `<span class="ft-tag__value">${esc(a.value)}</span>` : ""}</li>`);
    }

    const linkArgTypes = [
        { key: "mode", control: "radio", desc: "Familia clicable: .ft-tag--link o .ft-tag--linkBasis.", options: DATA.linkModes },
        { key: "size", control: "select", desc: "Tamano del tag contenedor.", options: DATA.sizes },
        { key: "label", control: "text", desc: "Texto del enlace interno." },
        { key: "withMarker", control: "boolean", desc: "Solo aplica al modo link con anatomia de tag." },
        { key: "withValue", control: "boolean", desc: "Solo aplica al modo link con anatomia de tag." }
    ];
    const linkArgs = { mode: "link", size: "sm", label: "Name", withMarker: true, withValue: true };
    function linkItem(a) {
        const size = a.size ? " ft-tag--" + a.size : "";
        if (a.mode === "linkBasis") {
            return `<li class="ft-tag${size} ft-tag--linkBasis"><a href="#" class="ft-link ft-link--secondary" title="${esc(a.label)}">${esc(a.label)}</a></li>`;
        }
        return `<li class="ft-tag${size} ft-tag--link">${a.withMarker ? '<span class="ft-tag__marker"></span>' : ""}<span class="ft-tag__name">${esc(a.label)}</span>${a.withValue ? '<span class="ft-tag__value">50</span>' : ""}</li>`;
    }
    function liveLink(a) {
        return listWrap(linkItem(a));
    }

    const chipArgTypes = [
        { key: "state", control: "select", desc: "Estado visual en data-tag-state.", options: DATA.chipStates.map(state => [state, state]) },
        { key: "size", control: "radio", desc: "Tamano documentado para chip.", options: DATA.chipSizes },
        { key: "controlTag", control: "radio", desc: "Control interno: .ft-btn o .ft-link.", options: DATA.chipControls },
        { key: "label", control: "text", desc: "Texto visible del chip." },
        { key: "pulse", control: "boolean", desc: "Hook de animacion con .ft-btn--pulse / .ft-link--pulse." }
    ];
    const chipArgs = { state: "selected", size: "md", controlTag: "button", label: "Castelldefels", pulse: false };
    function chipItem(a) {
        const isLink = a.controlTag === "link";
        const pressed = ["selected", "active", "deletable"].indexOf(a.state) >= 0 ? "true" : "false";
        const ariaDisabled = ["loading", "disabled", "error"].indexOf(a.state) >= 0 ? ' aria-disabled="true"' : "";
        const pulse = a.pulse ? " ft-btn--pulse" : "";
        const content = isLink
            ? `<a href="#" class="ft-link${pulse}" title="${esc(a.label)}"${ariaDisabled}>${esc(a.label)}</a>`
            : `<button type="button" class="ft-btn${pulse}" aria-pressed="${pressed}"${ariaDisabled} title="${esc(a.label)}">${esc(a.label)}</button>`;
        return `<li class="ft-tag ft-tag--chip ft-tag--${a.size}" data-tag-state="${esc(a.state)}" data-tag-context="storybook-demo" data-tag-slug="${esc(a.label.toLowerCase().replace(/\s+/g, "-"))}">${content}</li>`;
    }
    function liveChip(a) {
        return chipListWrap(chipItem(a));
    }

    const chipTinyArgTypes = [
        { key: "state", control: "radio", desc: "Estados documentados para chip-tiny.", options: DATA.chipTinyStates },
        { key: "controlTag", control: "radio", desc: "Control interno: .ft-btn o .ft-link.", options: DATA.chipControls },
        { key: "label", control: "text", desc: "Texto visible del chip tiny." }
    ];
    const chipTinyArgs = { state: "selected", controlTag: "button", label: "Todos" };
    function chipTinyItem(a) {
        const isLink = a.controlTag === "link";
        const label = esc(a.label);
        const slug = esc(a.label.toLowerCase().replace(/\s+/g, "-"));
        const pressed = a.state === "selected" ? "true" : "false";
        const content = isLink
            ? `<a href="#" class="ft-link" data-chip-label="${label}" title="${label}">${label}</a>`
            : `<button type="button" class="ft-btn" data-chip-label="${label}" aria-pressed="${pressed}" title="${label}">${label}</button>`;
        return `<li class="ft-tag ft-tag--chip-tiny ft-tag--md" data-tag-state="${esc(a.state)}" data-tag-slug="${slug}">${content}</li>`;
    }
    function liveChipTiny(a) {
        return chipTinyListWrap(chipTinyItem(a));
    }

    const chipTinyDemo = () => `
        <ul role="list" aria-label="Chip tiny pattern">
            ${chipTinyItem({ state: "selected", controlTag: "button", label: "Todos" })}
            ${chipTinyItem({ state: "unselected", controlTag: "button", label: "Barcelona" })}
            ${chipTinyItem({ state: "unselected", controlTag: "button", label: "Cornella" })}
            ${chipTinyItem({ state: "selected", controlTag: "button", label: "Tarragona" })}
        </ul>`;
    const chipTinyHelperScrollDemo = () => `
        <div class="ft-org-suggestions-chips" data-suggestions-container="true" data-suggestions-count="4" data-suggestions-loaded="true">
            <div class="ft-org-suggestions-chips__content">
                <section role="region" aria-label="Listado de localidades disponibles" data-suggestions-section="true">
                    <h4 class="ft-helper-hide">Localidades disponibles</h4>
                    <ul class="ft-helper-scroll" role="list" aria-label="Chip tiny helper-scroll" data-suggestions-list="true" data-suggestions-total="4">
                        ${chipTinyItem({ state: "selected", controlTag: "button", label: "Todos" })}
                        ${chipTinyItem({ state: "unselected", controlTag: "button", label: "Badalona" })}
                        ${chipTinyItem({ state: "unselected", controlTag: "button", label: "Barcelona" })}
                        ${chipTinyItem({ state: "selected", controlTag: "button", label: "Tarragona" })}
                    </ul>
                </section>
            </div>
        </div>`;

    const codeSizes = () => `<ul role="list" aria-label="Tag sizes">
        <li class="ft-tag ft-tag--sm"><span class="ft-tag__name">sm</span></li>
        <li class="ft-tag ft-tag--md"><span class="ft-tag__name">md</span></li>
        <li class="ft-tag ft-tag--lg"><span class="ft-tag__name">lg</span></li>
    </ul>`;
    const codeStyles = () => `<ul role="list" aria-label="Tag styles">
        <li class="ft-tag"><span class="ft-tag__marker"></span><span class="ft-tag__name">Name</span><span class="ft-tag__value">50</span></li>
        <li class="ft-tag ft-tag--secondary"><span class="ft-tag__marker"></span><span class="ft-tag__name">Name</span><span class="ft-tag__value">50</span></li>
        <li class="ft-tag ft-tag--status-primary"><span class="ft-tag__name">Primary</span></li>
        <li class="ft-tag ft-tag--status-secondary"><span class="ft-tag__name">Secondary</span></li>
    </ul>`;
    const codeLinks = () => `<ul role="list" aria-label="Tag clickable variants">
        <li class="ft-tag ft-tag--link"><span class="ft-tag__marker"></span><span class="ft-tag__name">Name</span><span class="ft-tag__value">50</span></li>
        <li class="ft-tag ft-tag--link"><span class="ft-tag__name">Name</span><span class="ft-tag__value">50</span></li>
        <li class="ft-tag ft-tag--link"><span class="ft-tag__name">Name</span></li>
        <li class="ft-tag ft-tag--sm ft-tag--linkBasis"><a href="#" class="ft-link ft-link--secondary" title="More">More</a></li>
    </ul>`;
    const codeChipStates = () => `<ul role="list" aria-label="Tag chip button states">
        ${DATA.chipStates.map(state => chipItem({ state, size: state === "selected" ? "md" : "sm", controlTag: "button", label: state, pulse: false })).join("\n        ")}
    </ul>`;
    const codeChipControls = () => `<ul role="list" aria-label="Tag chip controls">
        ${chipItem({ state: "selected", size: "md", controlTag: "button", label: "Selected", pulse: false })}
        ${chipItem({ state: "unselected", size: "md", controlTag: "link", label: "Link chip", pulse: false })}
        ${chipItem({ state: "selected", size: "md", controlTag: "button", label: "Pulse", pulse: true })}
    </ul>`;
    const codeChipTinyGallery = () => `<ul role="list" aria-label="Chip tiny pattern">
        ${chipTinyItem({ state: "selected", controlTag: "button", label: "Todos" })}
        ${chipTinyItem({ state: "unselected", controlTag: "button", label: "Barcelona" })}
        ${chipTinyItem({ state: "unselected", controlTag: "button", label: "Cornella" })}
        ${chipTinyItem({ state: "selected", controlTag: "button", label: "Tarragona" })}
    </ul>`;
    const codeChipTinyHelperScroll = () => `<div class="ft-org-suggestions-chips" data-suggestions-container="true" data-suggestions-count="4" data-suggestions-loaded="true">
    <div class="ft-org-suggestions-chips__content">
        <section role="region" aria-label="Listado de localidades disponibles" data-suggestions-section="true">
            <h4 class="ft-helper-hide">Localidades disponibles</h4>
            <ul class="ft-helper-scroll" role="list" aria-label="Chip tiny helper-scroll" data-suggestions-list="true" data-suggestions-total="4">
                ${chipTinyItem({ state: "selected", controlTag: "button", label: "Todos" })}
                ${chipTinyItem({ state: "unselected", controlTag: "button", label: "Badalona" })}
                ${chipTinyItem({ state: "unselected", controlTag: "button", label: "Barcelona" })}
                ${chipTinyItem({ state: "selected", controlTag: "button", label: "Tarragona" })}
            </ul>
        </section>
    </div>
</div>`;

    const gallerySizes = () =>
        DATA.sizes.map(s => spec(s[1], tag(s[0] ? ["ft-tag--" + s[0]] : [], "Name", "50", true))).join("");
    const galleryStyles = () =>
        DATA.styles.map(s => spec(s[1], tag(styleClass(s[0]), "Name", "50", true))).join("");
    const galleryLinks = () => `
        ${block("Link", listWrap(`
            <li class="ft-tag ft-tag--link"><span class="ft-tag__marker"></span><span class="ft-tag__name">Name</span><span class="ft-tag__value">50</span></li>
            <li class="ft-tag ft-tag--link"><span class="ft-tag__name">Name</span><span class="ft-tag__value">50</span></li>
            <li class="ft-tag ft-tag--link"><span class="ft-tag__name">Name</span></li>
        `))}
        ${block("Link basis", listWrap(`
            <li class="ft-tag ft-tag--sm ft-tag--linkBasis"><a href="#" class="ft-link ft-link--secondary" title="Name">Name</a></li>
            <li class="ft-tag ft-tag--sm ft-tag--linkBasis"><a href="#" class="ft-link ft-link--secondary" title="Name">More</a></li>
        `))}
    `;
    const galleryChipStates = () =>
        chipListWrap(DATA.chipStates.map(state => chipItem({ state, size: state === "selected" ? "md" : "sm", controlTag: "button", label: state, pulse: false })).join(""));
    const galleryChipControls = () => `
        ${spec("Button", chipListWrap(chipItem({ state: "selected", size: "md", controlTag: "button", label: "Selected", pulse: false })))}
        ${spec("Link", chipListWrap(chipItem({ state: "unselected", size: "md", controlTag: "link", label: "Link chip", pulse: false })))}
        ${spec("Pulse hook", chipListWrap(chipItem({ state: "selected", size: "md", controlTag: "button", label: "Pulse", pulse: true })))}
    `;

    const storyRows = [
        ["Base", "size, style, marker, name, value"],
        ["Link", "mode, size, label, withMarker, withValue"],
        ["Chip", "state, size, controlTag, label, pulse"],
        ["Chip tiny (Cerca)", "state, controlTag, label"]
    ];
    const framework = frameworkBlock({
        intro: `La familia <code>--chip</code> funciona mejor cuando el framework gobierna el estado semantico y proyecta hacia el DOM los atributos que el DS ya espera: <code>data-tag-state</code>, <code>aria-pressed</code>, <code>aria-label</code> y <code>title</code>.`,
        rows: [
            ["Estado del chip", `Modela el estado en store local o global y deriva desde ahi las clases y atributos del chip.`, `Modela el estado en <code>useState</code> o en tu store y deriva desde ahi las clases y atributos del chip.`],
            ["Chip tiny + helper-scroll", `Si reusas el helper opcional, montalo en <code>onMounted()</code> solo cuando exista desbordamiento horizontal.`, `Si reusas el helper opcional, montalo en <code>useEffect()</code> solo cuando exista desbordamiento horizontal.`],
            ["Sincronizacion", `Manten texto visible, <code>data-chip-label</code> y eventos de analytics alineados desde el mismo modelo.`, `Manten texto visible, <code>data-chip-label</code> y eventos de analytics alineados desde el mismo modelo.`]
        ],
        note: `Evita mezclar mutacion imperativa del runtime y rerender del framework sobre el mismo chip: si necesitas interaccion compleja, el framework debe ser la fuente de verdad.`,
        warn: true
    });

    const overview = `<div class="cb-docs__inner">
        <h1>Tag</h1>
        <p class="cb-docs__lead">Atomo de etiqueta/pildora (<code>.ft-tag</code>) con cuatro familias documentadas en el SCSS: visualizacion base, variantes clicables <code>--link</code>/<code>--linkBasis</code>, la familia interactiva <code>--chip</code> y la variante compacta <code>--chip-tiny</code> para filtros y sugerencias.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuando</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de marca</td><td>Siempre · primero</td></tr>
                    <tr><td><code>brands/[marca]/atoms/tag.css</code></td><td>CSS compilado del atomo</td><td>Siempre, o bundle <code>[marca]-core.css</code></td></tr>
                    <tr><td><code>scss/fourties/atoms/tag/_tag.scss</code> + <code>tag-[marca].scss</code></td><td>Fuente SCSS</td><td>Solo compilacion</td></tr>
                    <tr><td>JS de producto</td><td>Comportamiento</td><td>Solo para flujos de <code>--chip</code> (estado, loading, analytics)</td></tr>
                    <tr><td><code>cds-statics/js/organisms/suggestions-chips/fourty-js-suggestions-chips-chip-tiny-helper-scroll.js</code></td><td>JS opcional</td><td>Solo cuando quieres sincronizar <code>data-tag-state</code>, <code>aria-pressed</code>, <code>aria-label</code> y <code>title</code> en una hilera con <code>.ft-helper-scroll</code></td></tr>
                </tbody>
            </table>
        </div>
        ${framework}

        <h2>Inventario real</h2>
        <table class="cb-table">
            <thead><tr><th>Familia</th><th>Clase</th><th>Variantes documentadas</th><th>Stories</th></tr></thead>
            <tbody>
                <tr><td>Base</td><td><code>.ft-tag</code></td><td>base · <code>--sm</code>/<code>--md</code>/<code>--lg</code> · <code>--secondary</code> · <code>--status-primary</code> · <code>--status-secondary</code></td><td><strong>Base</strong> + Galleries + Markup</td></tr>
                <tr><td>Link</td><td><code>.ft-tag--link</code> · <code>.ft-tag--linkBasis</code></td><td>tag clicable con anatomia propia o con <code>.ft-link</code> interno</td><td><strong>Link</strong> + Galleries + Markup</td></tr>
                <tr><td>Chip</td><td><code>.ft-tag--chip</code></td><td>states <code>${DATA.chipStates.join("</code> · <code>")}</code> + control interno <code>.ft-btn</code>/<code>.ft-link</code></td><td><strong>Chip</strong> + Galleries + Markup</td></tr>
                <tr><td>Patron producto</td><td><code>.ft-tag--chip-tiny</code></td><td>variante compacta para listados de filtros y sugerencias</td><td><strong>Chip tiny (Cerca)</strong> + Markup</td></tr>
            </tbody>
        </table>

        <h2>Modificadores y estados</h2>
        <table class="cb-table">
            <thead><tr><th>Grupo</th><th>Clases / atributos reales</th></tr></thead>
            <tbody>
                <tr><td>Base</td><td><code>--sm</code> · <code>--md</code> · <code>--lg</code> · <code>--secondary</code> · <code>--status-primary</code> · <code>--status-secondary</code></td></tr>
                <tr><td>Clickable</td><td><code>--link</code> · <code>--linkBasis</code> con <code>.ft-link</code> interno</td></tr>
                <tr><td>Chip</td><td><code>--chip</code> + <code>data-tag-state="unset|unselected|selected|active|deletable|loading|error|disabled"</code></td></tr>
                <tr><td>Chip tiny</td><td><code>--chip-tiny</code> + <code>data-tag-state="unselected|selected"</code> + <code>data-chip-label</code> en el control</td></tr>
                <tr><td>Anatomia</td><td><code>__marker</code> · <code>__name</code> · <code>__value</code></td></tr>
                <tr><td>Hook compuesto</td><td><code>.ft-btn--pulse</code> / <code>.ft-link.ft-btn--pulse</code> dentro de un chip</td></tr>
            </tbody>
        </table>

        <h2>Controles por story</h2>
        <table class="cb-table">
            <thead><tr><th>Story</th><th>Controles</th></tr></thead>
            <tbody>
                ${storyRows.map(row => `<tr><td><strong>${row[0]}</strong></td><td>${row[1]}</td></tr>`).join("")}
            </tbody>
        </table>

        <h2>Familia <code>--chip</code></h2>
        <p>El chip no es solo una skin: el estado vive en <code>data-tag-state</code> y cambia icono, color, cursor e interaccion del control interno.</p>
        <table class="cb-table">
            <thead><tr><th>Estado</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>unset</code></td><td>Neutral, sin icono.</td></tr>
                <tr><td><code>unselected</code></td><td>Disponible para seleccionar; icono plus.</td></tr>
                <tr><td><code>selected</code></td><td>Seleccionado/favorito; fondo negro e icono star.</td></tr>
                <tr><td><code>active</code></td><td>Filtro activo simple; fondo negro sin icono.</td></tr>
                <tr><td><code>deletable</code></td><td>Confirmado y eliminable; borde success con tick.</td></tr>
                <tr><td><code>loading</code></td><td>Operando; spinner y bloqueo de interaccion.</td></tr>
                <tr><td><code>error</code></td><td>Fallo; fondo error con warning.</td></tr>
                <tr><td><code>disabled</code></td><td>No disponible; ban y cursor not-allowed.</td></tr>
            </tbody>
        </table>

        <h2>Variante <code>--chip-tiny</code></h2>
        <p>Es una variante compacta para listados horizontales de filtros. El texto visible vive directamente en el propio <code>.ft-btn</code> o <code>.ft-link</code>, centrado dentro del control. El atributo <code>data-chip-label</code> se mantiene como parte del contrato de producto.</p>
        <table class="cb-table">
            <thead><tr><th>Atributo / regla</th><th>Uso</th></tr></thead>
            <tbody>
                <tr><td><code>data-tag-state="unselected|selected"</code></td><td>Define el estado visual documentado en Storybook.</td></tr>
                <tr><td><code>data-chip-label</code></td><td>Metadata del control para integraciones de producto y consistencia del patron.</td></tr>
                <tr><td><code>data-tag-slug</code></td><td>Identificador libre para analytics o hooks de producto; no condiciona el layout de la hilera.</td></tr>
                <tr><td><code>.ft-helper-scroll</code></td><td>Activa el scroll horizontal uniforme para toda la hilera sin fijar ningun chip.</td></tr>
                <tr><td><code>.ft-org-suggestions-chips</code> + <code>data-suggestions-list="true"</code></td><td>Contrato minimo cuando la variante se integra con el organismo de sugerencias.</td></tr>
            </tbody>
        </table>

        <h2>Integracion con <code>helper-scroll</code></h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Obligatorio</th><th>Detalle</th></tr></thead>
            <tbody>
                <tr><td>Contenedor</td><td>Si</td><td><code>.ft-org-suggestions-chips</code> es el scope que usa el JS para inicializar la variante.</td></tr>
                <tr><td>Listado</td><td>Si</td><td>El <code>ul</code> debe incluir <code>.ft-helper-scroll</code> y <code>data-suggestions-list="true"</code>.</td></tr>
                <tr><td>Script</td><td>Opcional</td><td>Carga <code>fourty-js-suggestions-chips-chip-tiny-helper-scroll.js</code> si quieres sincronizar estado y atributos ARIA al hacer click.</td></tr>
            </tbody>
        </table>
        <div class="cb-callout">La hilera completa hace scroll de forma uniforme. El script ya no crea wrappers auxiliares ni mueve nodos: solo actualiza <code>data-tag-state</code>, <code>aria-pressed</code>, <code>aria-label</code> y <code>title</code> cuando se usa como demo interactiva o hook ligero de producto.</div>
        ${deprecationBlock({
            title: "Anclaje del primer chip retirado",
            since: "2026-06-15",
            summary: "El patron legacy que fijaba el primer item de la hilera o introducia wrappers auxiliares deja de formar parte de la referencia vigente para <code>--chip-tiny</code> con <code>.ft-helper-scroll</code>.",
            scope: "Integraciones de <code>.ft-tag--chip-tiny</code> dentro de hileras scrollables y demos antiguas de Cerca.",
            replacement: "Usar todos los chips como items equivalentes dentro del mismo <code>ul</code>, sin chip anclado ni nodos extra fuera del listado.",
            note: "El helper opcional puede seguir sincronizando estado y atributos ARIA, pero sin reestructurar el DOM."
        })}

        <h2>Categorizacion del arbol</h2>
        <table class="cb-table">
            <thead><tr><th>Subgrupo</th><th>Que cubre</th></tr></thead>
            <tbody>
                <tr><td>Galleries · Visual</td><td>sizes, styles y variantes clickables <code>--link</code>/<code>--linkBasis</code></td></tr>
                <tr><td>Galleries · Chip</td><td>todos los estados de <code>--chip</code>, control interno y story interactiva de <code>chip-tiny</code></td></tr>
                <tr><td>Markup</td><td>snippets HTML editables por front en <code>storybook/js/atoms/tag/tag.html</code></td></tr>
            </tbody>
        </table>

        <h2>Accesibilidad</h2>
        <div class="cb-callout">En base y link basta con texto visible claro. En <code>--chip</code>, el control interno debe exponer <code>aria-pressed</code> cuando actua como toggle y <code>aria-disabled</code> en estados bloqueados. Si el chip representa navegacion, puede usar <code>.ft-link</code> interno en lugar de <code>.ft-btn</code>.</div>
        <div class="cb-callout">En <code>--chip-tiny</code>, usar <code>aria-pressed</code> en botones toggle y mantener <code>data-chip-label</code> sincronizado con el texto visible.</div>
        <div class="cb-callout">El showroom legacy incluye una variante <code>--badge</code>, pero no existe en <code>_tag.scss</code>; por eso no se documenta aqui como API canonica del DS.</div>

        <p class="cb-src">Fuente: <code>scss/fourties/atoms/tag/_tag.scss</code> · referencia legacy: <code>fourty/__old-showroom/atoms/atom-tag.html</code> · markup storybook: <code>fourty/storybook/js/atoms/tag/tag.html</code></p>
    </div>`;

    const TAG = {
        id: "tag",
        name: "Tag",
        group: "Atoms",
        signals: ["js"],
        overview,
        stories: [
            {
                id: "base",
                name: "Base",
                hint: ".ft-tag",
                kind: "interactive",
                argTypes: baseArgTypes,
                args: baseArgs,
                render: liveBase,
                code: codeBase
            },
            {
                id: "link",
                name: "Link",
                hint: ".ft-tag--link / --linkBasis",
                kind: "interactive",
                argTypes: linkArgTypes,
                args: linkArgs,
                render: liveLink,
                code: liveLink
            },
            {
                id: "chip",
                name: "Chip",
                hint: ".ft-tag--chip",
                kind: "interactive",
                argTypes: chipArgTypes,
                args: chipArgs,
                render: liveChip,
                code: liveChip
            },
            {
                id: "chip-tiny",
                name: "Chip tiny (Cerca)",
                hint: ".ft-tag--chip-tiny",
                kind: "interactive",
                argTypes: chipTinyArgTypes,
                args: chipTinyArgs,
                render: liveChipTiny,
                code: liveChipTiny
            }
        ],
        subgroups: [
            {
                id: "visual-galleries",
                name: "Galleries · Visual",
                collapsed: true,
                stories: [
                    { id: "sizes", name: "Sizes", hint: "base · sm · md · lg", kind: "gallery", render: gallerySizes, code: codeSizes },
                    { id: "styles", name: "Styles", hint: "filled · secondary · status", kind: "gallery", render: galleryStyles, code: codeStyles },
                    { id: "links", name: "Clickable variants", hint: "--link · --linkBasis", kind: "gallery", render: galleryLinks, code: codeLinks }
                ]
            },
            {
                id: "chip-galleries",
                name: "Galleries · Chip",
                collapsed: true,
                stories: [
                    { id: "chip-states", name: "Chip states", hint: "8 estados reales", kind: "gallery", render: galleryChipStates, code: codeChipStates },
                    { id: "chip-controls", name: "Chip controls", hint: "button · link · pulse", kind: "gallery", render: galleryChipControls, code: codeChipControls },
                    { id: "chip-tiny-gallery", name: "Chip tiny gallery", hint: "patron horizontal de filtros", kind: "story", render: chipTinyDemo, code: codeChipTinyGallery },
                    { id: "chip-tiny-helper-scroll", name: "Chip tiny + helper-scroll", hint: "requiere JS del organismo", kind: "story", render: chipTinyHelperScrollDemo, code: codeChipTinyHelperScroll }
                ]
            }
        ]
    };

    window.SB.register(TAG);
    window.SB.loadMarkup(TAG, document.currentScript && document.currentScript.src);
}());
