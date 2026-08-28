/* ════════════════════════════════════════════════════════════════════════
   molecules/breadcrumb/breadcrumb.js — Molecules / Breadcrumb
   Casuística REAL de scss/fourties/molecules/breadcrumb/_breadcrumb.scss (.ft-mol-breadcrumb*).
   Markup tomado de fourty/__old-showroom/molecules/molecule-breadcrumb.html. Cero invención de API.

   Versión actual del parcial tras la limpieza del SCSS:
     · base        → migas horizontales (<ul>) con __item / __link y último nivel plano
     · -has--lvl   → titular por niveles (<nav> + __list + __lvl) con links de apoyo
     · -has--1-lvl → variante de un solo nivel sobre -has--lvl

   El storybook expone solo la API pública que sigue viva en la molécula y deja
   fuera la familia sectioned/illustration retirada del parcial base.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";

    const { esc, deprecationBlock } = window.SB.helpers;

    const PARENT_CLASSES = [
        ["", "— ninguna —"],
        ["cuidamostusalud", "Global · cuidamostusalud"],
        ["gironadelicia", "Global · gironadelicia"],
        ["woman", "Revistas · woman"],
        ["hospitalet", "EP · hospitalet"],
        ["tarragona", "EP · tarragona"],
        ["sanamente", "EP · sanamente"],
        ["masbarcelona", "EP · masbarcelona"],
        ["lamerce", "EP · lamerce"],
        ["metropolisbarcelona", "EP · metropolisbarcelona"],
        ["unanuevaformadevivir", "EP · unanuevaformadevivir"],
        ["eixample", "EP · eixample"],
        ["mobileworldcapital", "EP · mobileworldcapital"],
        ["consorcizonafranca", "EP · consorcizonafranca"],
        ["que-hacer", "EP · que-hacer"],
        ["medioambiente", "EPE · medioambiente"],
        ["activos", "EPE · activos"],
        ["neomotorsport", "Sport · neomotorsport"],
        ["areajugones", "Sport · areajugones"],
        ["apuestasdeportivas", "Sport · apuestasdeportivas"],
        ["euroliga", "Sport · euroliga"],
        ["formula1", "Sport · formula1"],
        ["sport aniversario-demo", "Sport · aniversario"],
        ["portadilla-automatica", "Sport · portadilla-automatica"],
        ["portadilla-manual", "Sport · portadilla-manual"],
        ["asturiasexterior", "Regionales · asturiasexterior"],
        ["faroeduca", "Regionales · faroeduca"],
        ["asturianos", "Regionales · asturianos"],
        ["adelantados", "Regionales · adelantados"],
        ["buenahuella", "Regionales · buenahuella"],
        ["ayuntamiento-santiago-del-teide", "Regionales · ayuntamiento-santiago-del-teide"],
        ["bisbarras", "Regionales · bisbarras"],
        ["visado", "Regionales · visado"],
        ["bellver", "Regionales · bellver"],
        ["fnd", "Regionales · fnd"],
        ["lavidabuena", "Regionales · lavidabuena"],
        ["el-periodico-de-aragon elestudiante", "Regionales · el-periodico-de-aragon.elestudiante"],
        ["el-periodico-de-aragon espacio3", "Regionales · el-periodico-de-aragon.espacio3"],
        ["el-periodico-de-aragon integracion", "Regionales · el-periodico-de-aragon.integracion"],
        ["el-periodico-de-aragon fiestasdelpilar", "Regionales · el-periodico-de-aragon.fiestasdelpilar"],
        ["diario-de-mallorca ido", "Regionales · diario-de-mallorca.ido"],
        ["faro-de-vigo clubfaro", "Regionales · faro-de-vigo.clubfaro"],
        ["faro-de-vigo escolaencamino", "Regionales · faro-de-vigo.escolaencamino"]
    ];

    const baseArgTypes = [
        {
            key: "variant",
            control: "select",
            desc: "Familia estructural vigente: migas base o titular por niveles.",
            options: [["base", "Base"], ["lvl", "-has--lvl"]]
        },
        {
            key: "levels",
            control: "number",
            desc: "Número de niveles (2–6). En base el último nivel queda sin enlace; en -has--lvl el último se renderiza como nivel actual.",
            min: 2,
            max: 6
        },
        {
            key: "hasHome",
            control: "boolean",
            desc: "Añade -has--home al breadcrumb base."
        },
        {
            key: "wrapLvl",
            control: "boolean",
            desc: "Envuelve cada texto en .ft-mol-breadcrumb__lvl. Útil para reflejar markups heredados del showroom."
        },
        {
            key: "oneLvl",
            control: "boolean",
            desc: "Activa -has--1-lvl sobre la variante -has--lvl."
        },
        {
            key: "lastIsLink",
            control: "boolean",
            desc: "Mete un .ft-link--secondary dentro del último nivel actual."
        },
        {
            key: "supportLinks",
            control: "number",
            desc: "Número de links de apoyo en .ft-mol-breadcrumb-links-support para la variante -has--lvl.",
            min: 0,
            max: 8
        },
        {
            key: "darkBg",
            control: "boolean",
            desc: "Envuelve el componente en .ft-helper-bgColor-black."
        },
        {
            key: "parentClass",
            control: "select",
            desc: "Clase ancestro para casuísticas vivas en el SCSS. Acepta también combinaciones de varias clases cuando el parcial las define así. Su efecto depende de la marca activa del toolbar.",
            options: PARENT_CLASSES
        }
    ];

    const baseArgs = {
        variant: "base",
        levels: "5",
        hasHome: false,
        wrapLvl: false,
        oneLvl: false,
        lastIsLink: false,
        supportLinks: "5",
        darkBg: false,
        parentClass: ""
    };

    function buildSupportLinks(total) {
        if (!total) return "";
        let items = "";
        for (let i = 1; i <= total; i++) {
            items += `<li class="ft-mol-breadcrumb-links-support__item"><a href="#" class="ft-mol-breadcrumb-links-support__link" title="title text" target="_self">Link Number ${i}</a></li>`;
        }
        return `<ul class="ft-mol-breadcrumb-links-support">${items}</ul>`;
    }

    function buildBase(args, total) {
        const classes = ["ft-mol-breadcrumb"];
        if (args.hasHome) classes.push("ft-mol-breadcrumb-has--home");

        const wrap = (text) => args.wrapLvl ? `<span class="ft-mol-breadcrumb__lvl">${esc(text)}</span>` : esc(text);

        let items = "";
        for (let i = 1; i <= total; i++) {
            if (i < total) {
                items += `<li class="ft-mol-breadcrumb__item"><a href="#" class="ft-mol-breadcrumb__link" title="title text" target="_self">${wrap(`Nivel ${i}`)}</a></li>`;
            } else {
                const last = args.lastIsLink
                    ? `<a class="ft-link ft-link--secondary" href="#">Nivel ${i}</a>`
                    : wrap(`Nivel ${i}`);
                items += `<li class="ft-mol-breadcrumb__item">${last}</li>`;
            }
        }

        return `<ul class="${classes.join(" ")}">${items}</ul>`;
    }

    function buildLvl(args, total, supportTotal) {
        const classes = ["ft-mol-breadcrumb", "ft-mol-breadcrumb-has--lvl"];
        if (args.oneLvl) classes.push("ft-mol-breadcrumb-has--1-lvl");

        let items = "";
        if (args.oneLvl) {
            const current = args.lastIsLink
                ? `<a href="#" class="ft-link ft-link--secondary"><span class="ft-mol-breadcrumb__lvl">Nivel 1</span></a>`
                : `<span class="ft-mol-breadcrumb__lvl">Nivel 1</span>`;
            items = `<li class="ft-mol-breadcrumb__item ft-mol-breadcrumb__itemIs-not-link">${current}</li>`;
        } else {
            for (let i = 1; i < total; i++) {
                items += `<li class="ft-mol-breadcrumb__item"><a href="#" class="ft-mol-breadcrumb__link" title="title text" target="_self"><span class="ft-mol-breadcrumb__lvl">Nivel ${i}</span></a></li>`;
            }
            const current = args.lastIsLink
                ? `<span class="ft-mol-breadcrumb__lvl"><a class="ft-link ft-link--secondary" href="#">Nivel ${total}</a></span>`
                : `<span class="ft-mol-breadcrumb__lvl">Nivel ${total}</span>`;
            items += `<li class="ft-mol-breadcrumb__item ft-mol-breadcrumb__itemIs-not-link">${current}</li>`;
        }

        return `<nav class="${classes.join(" ")}"><ul class="ft-mol-breadcrumb__list">${items}</ul>${buildSupportLinks(supportTotal)}</nav>`;
    }

    function live(args) {
        const total = Math.max(2, Math.min(6, parseInt(args.levels, 10) || 2));
        const supportTotal = Math.max(0, Math.min(8, parseInt(args.supportLinks, 10) || 0));

        let html = args.variant === "lvl"
            ? buildLvl(args, total, supportTotal)
            : buildBase(args, total);

        if (args.darkBg) {
            html = `<div class="ft-helper-bgColor-black ft-helper-spacer-inner-md">${html}</div>`;
        }

        if (args.parentClass) {
            html = `<div class="${args.parentClass}">${html}</div>`;
        }

        return html;
    }

    const overview = `<div class="cb-docs__inner">
        <h1>Breadcrumb</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-breadcrumb</code>) para migas de pan. En la versión actual del parcial quedan dos familias activas: el breadcrumb base en línea y la variante <code>-has--lvl</code> con titular por niveles y links de apoyo.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/breadcrumb.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>scss/fourties/molecules/breadcrumb/_breadcrumb.scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Familias vigentes</h2>
        <table class="cb-table">
            <thead><tr><th>Familia</th><th>Tag</th><th>Estructura</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td><code>&lt;ul&gt;</code></td><td><code>__item</code> en línea con separador chevron; último nivel plano</td></tr>
                <tr><td><code>-has--lvl</code></td><td><code>&lt;nav&gt;</code></td><td><code>__list</code> + <code>__lvl</code> + <code>-links-support</code></td></tr>
                <tr><td><code>-has--1-lvl</code></td><td><code>&lt;nav&gt;</code></td><td>subvariante de un solo nivel sobre <code>-has--lvl</code></td></tr>
            </tbody>
        </table>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>-has--home</code></td><td>añade icono home al primer nivel del breadcrumb base</td></tr>
                <tr><td><code>-has--lvl</code></td><td>convierte el bloque en titular por niveles con links de apoyo</td></tr>
                <tr><td><code>-has--1-lvl</code></td><td>subrayado y composición de un único nivel actual</td></tr>
                <tr><td><code>__itemIs-not-link</code></td><td>marca el nivel actual no enlazado</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-breadcrumb</code></td></tr>
                <tr><td>Lista base</td><td><code>.ft-mol-breadcrumb__item</code> + <code>.ft-mol-breadcrumb__link</code></td></tr>
                <tr><td>Titular por niveles</td><td><code>.ft-mol-breadcrumb__list</code> + <code>.ft-mol-breadcrumb__lvl</code></td></tr>
                <tr><td>Links de apoyo</td><td><code>.ft-mol-breadcrumb-links-support</code> + <code>__item</code> + <code>__link</code></td></tr>
                <tr><td>Nivel actual</td><td><code>.ft-mol-breadcrumb__itemIs-not-link</code></td></tr>
            </tbody>
        </table>

        <h2>Casuísticas por marca</h2>
        <p>El parcial mantiene varias personalizaciones activadas por una clase ancestro. El control <code>parentClass</code> sirve para envolver el componente y revisar esas casuísticas, siempre con la marca correcta seleccionada en el toolbar.</p>
        <table class="cb-table">
            <thead><tr><th>Marca</th><th>Clases ancestro destacadas</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td>Global</td><td><code>cuidamostusalud</code>, <code>gironadelicia</code></td><td>ajustes de layout, bordes y tratamiento del rail de apoyo</td></tr>
                <tr><td>Revistas</td><td><code>woman</code></td><td>transformación del titular en la variante de un nivel</td></tr>
                <tr><td>EP</td><td><code>hospitalet</code>, <code>tarragona</code>, <code>sanamente</code>, <code>masbarcelona</code>, <code>lamerce</code>, <code>metropolisbarcelona</code>, <code>unanuevaformadevivir</code>, <code>eixample</code>, <code>mobileworldcapital</code>, <code>consorcizonafranca</code>, <code>que-hacer</code></td><td>cambios de subrayado, fondos y presentación editorial</td></tr>
                <tr><td>EPE</td><td><code>medioambiente</code>, <code>activos</code></td><td>tipografía y tratamiento del nivel actual</td></tr>
                <tr><td>Sport</td><td><code>neomotorsport</code>, <code>areajugones</code>, <code>apuestasdeportivas</code>, <code>euroliga</code>, <code>formula1</code>, <code>sport aniversario-demo</code>, <code>portadilla-automatica</code>, <code>portadilla-manual</code></td><td>logos de sección, fondo negro y tipografía del titular</td></tr>
                <tr><td>Regionales</td><td><code>asturiasexterior</code>, <code>faroeduca</code>, <code>asturianos</code>, <code>adelantados</code>, <code>buenahuella</code>, <code>ayuntamiento-santiago-del-teide</code>, <code>bisbarras</code>, <code>visado</code>, <code>bellver</code>, <code>fnd</code>, <code>lavidabuena</code>, <code>el-periodico-de-aragon elestudiante</code>, <code>el-periodico-de-aragon espacio3</code>, <code>el-periodico-de-aragon integracion</code>, <code>el-periodico-de-aragon fiestasdelpilar</code>, <code>diario-de-mallorca ido</code>, <code>faro-de-vigo clubfaro</code>, <code>faro-de-vigo escolaencamino</code></td><td>promos laterales, logos editoriales y variaciones del rail de apoyo</td></tr>
            </tbody>
        </table>

        ${deprecationBlock({
            title: "Asset Vichy retirado en el caso `cuidamostusalud`",
            since: "2025-09-24",
            summary: "La imagen promocional de <strong>Vichy</strong> deja de formar parte de la personalización documentable del breadcrumb para <code>cuidamostusalud</code>.",
            scope: "Implementaciones o referencias visuales que esperaban el asset <code>cuidamostusalud-promo-breadcrumb.png</code> dentro de esa casuística.",
            note: "La retirada quedó registrada en el changelog como eliminación del asset, por lo que la casuística sigue viva pero ya no debe validarse contra ese visual concreto."
        })}
        <div class="cb-callout">Esta story ya no expone controles ni documentación de <code>-is--sectioned</code>, <code>__illustration</code> ni la anatomía <code>-section</code> porque esas piezas se han eliminado del SCSS base actual.</div>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/breadcrumb/_breadcrumb.scss</code> · markup: <code>fourty/__old-showroom/molecules/molecule-breadcrumb.html</code></p>
    </div>`;

    const BC = {
        id: "breadcrumb",
        name: "Breadcrumb",
        group: "Molecules",
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };

    window.SB.register(BC);
    window.SB.loadMarkup(BC, document.currentScript && document.currentScript.src, { full: true });
})();
