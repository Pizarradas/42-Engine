/* ════════════════════════════════════════════════════════════════════════
   molecules/az-list/az-list.js — Molecules / A-Z List
   Casuística REAL de scss/fourties/molecules/az-list/_az-list.scss (.ft-mol-az-list*).
   Markup tomado de fourty/molecules/molecule-az-list.html. Cero invención de API.

   Lista larga indexada A-Z: título sticky opcional, cabeceras de grupo por letra,
   rail lateral tipo scrubber (iOS Contacts) y empty state. Compone con el átomo
   ft-list (+ modificador --add). Vive en un contenedor de ALTURA LIMITADA (p.ej.
   .ft-mol-modal__body): ese contexto se reproduce con el <style> compartido de
   az-list.html (max-height + overflow).

   Componente JS-DRIVEN en producción: un controller cablea el rail (drag-scroll,
   scroll-spy de la letra activa, burbuja, búsqueda con <mark> y toggle de __empty).
   El storybook es zero-toolchain y NO carga ese JS → reproducimos los ESTADOS de
   forma estática (con/sin rail, con/sin título, vacío). La dependencia se documenta.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    const PIN = "/cds-statics/assets/img/icons/tag-pin--grey.svg";

    /* ▼ SINGLE SOURCE OF TRUTH — dataset de ejemplo (Comunidad Valenciana) ▼ */
    const GROUPS = [
        ["A", [["Alicante", "Provincia"], ["Altea", "Alicante"]]],
        ["B", [["Benidorm", "Alicante"]]],
        ["C", [["Castellón de la Plana", "Provincia"]]],
        ["V", [["Valencia", "Provincia"]]]
    ];

    const item = (name, region) => `<li class="ft-list__item" tabindex="0">
        <img class="ft-list-photoinfo__img" src="${PIN}" width="34" height="34" alt="" loading="lazy">
        <span class="ft-mol-az-list__name">${esc(name)}</span>
        <span class="ft-mol-az-list__region">${esc(region)}</span>
        <span class="ft-btn-nav ft-btn-nav--plus ft-btn-nav--bordered" aria-hidden="true"><span class="ft-btn-nav__icon"></span></span>
    </li>`;

    const listInner = () => GROUPS.map(([letter, items]) =>
        `<li class="ft-mol-az-list__group" role="presentation">${letter}</li>` +
        items.map(it => item(it[0], it[1])).join("")
    ).join("");

    const rail = () => `<nav class="ft-mol-az-list__rail" aria-label="Índice alfabético">
        <span class="ft-mol-az-list__rail-bubble" aria-hidden="true"></span>
        ${GROUPS.map(([l]) => `<button type="button" class="ft-mol-az-list__rail-letter" aria-label="Saltar a ${l}">${l}</button>`).join("")}
    </nav>`;

    /* ─── BASE — .ft-mol-az-list ─── */
    const baseArgTypes = [
        { key: "title", control: "text", desc: "Título sticky de la sección (__title)." },
        { key: "showTitle", control: "boolean", desc: "Muestra el __title sticky." },
        { key: "showRail", control: "boolean", desc: "Muestra el rail A-Z (__rail) en un __layout junto a la lista." },
        { key: "empty", control: "boolean", desc: "Estado vacío: oculta la lista y muestra __empty." }
    ];
    const baseArgs = { title: "Comunidad Valenciana", showTitle: true, showRail: true, empty: false };

    function live(a) {
        const title = a.showTitle ? `<h3 class="ft-mol-az-list__title">${esc(a.title)}</h3>` : "";
        if (a.empty) {
            return `<div class="ft-mol-az-list">
    ${title}
    <ul class="ft-mol-az-list__list ft-list ft-list--primary ft-list--add ft-list--has-icon" role="list" hidden></ul>
    <div class="ft-mol-az-list__empty" role="status">
        <span class="ft-helper-fontSize-body-L--small">No hemos encontrado resultados para ese término.</span>
    </div>
</div>`;
        }
        const list = `<ul class="ft-mol-az-list__list ft-list ft-list--primary ft-list--add ft-list--has-icon" role="list">${listInner()}</ul>`;
        const body = a.showRail
            ? `<div class="ft-mol-az-list__layout">${list}${rail()}</div>`
            : list;
        return `<div class="ft-mol-az-list">${title}${body}</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>A-Z List</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-az-list</code>): lista larga indexada A-Z con cabeceras por letra, título sticky, rail lateral tipo scrubber (estilo iOS Contacts) y estado vacío. Compone con el átomo <code>ft-list</code> (modificador <code>--add</code>).</p>

        <div class="cb-callout"><strong>Componente JS-driven.</strong> En producción un <em>controller</em> cablea el rail (drag-scroll, <em>scroll-spy</em> de la letra activa, burbuja flotante), la búsqueda con resaltado (<code>&lt;mark&gt;</code>) y el toggle de <code>__empty</code> vía <code>hidden</code>. El storybook es <strong>zero-toolchain</strong> y no carga ese JS: aquí se ven los <strong>estados</strong> (con/sin rail, con/sin título, vacío) de forma estática.</div>

        <div class="cb-callout">Vive en un <strong>contenedor de altura limitada</strong> (p.ej. el <code>__body</code> de un modal): el rail y el título sticky asumen scroll vertical. En esta doc reproducimos ese contexto con <code>max-height</code> + <code>overflow-y:auto</code> sobre <code>.ft-mol-az-list</code>.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/az-list.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>atoms/list.css</code> (<code>.ft-list--add</code>)</td><td>CSS del átomo que compone</td><td>Siempre (los ítems son <code>.ft-list__item</code>)</td></tr>
                <tr><td>Controller A-Z (rail, búsqueda, scroll-spy)</td><td>JavaScript</td><td>Solo para el rail interactivo, la búsqueda y el empty dinámico</td></tr>
                <tr><td><code>scss/fourties/molecules/az-list/_az-list.scss</code> + <code>az-list-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-az-list</code></td></tr>
                <tr><td>Título sticky</td><td><code>__title</code></td></tr>
                <tr><td>Fila lista+rail</td><td><code>__layout</code></td></tr>
                <tr><td>Lista</td><td><code>__list</code> (<code>+ .ft-list.ft-list--add</code>)</td></tr>
                <tr><td>Cabecera de letra</td><td><code>__group</code></td></tr>
                <tr><td>Nombre / región</td><td><code>__name</code> · <code>__region</code></td></tr>
                <tr><td>Rail</td><td><code>__rail</code> &gt; <code>__rail-letter</code> (<code>--is-active</code>) · <code>__rail-bubble</code></td></tr>
                <tr><td>Vacío</td><td><code>__empty</code></td></tr>
            </tbody>
        </table>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/az-list/_az-list.scss</code> · markup: <code>fourty/molecules/molecule-az-list.html</code></p>
    </div>`;

    const AZ = {
        id: "az-list",
        name: "A-Z List",
        group: "Molecules",
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(AZ);

    /* Markup original (HTML plano) en az-list.html → subgrupo "Markup".
       El <style> top-level del .html reproduce el contenedor de altura limitada
       (se inyecta como _sharedStyle antes de todas las stories del componente). */
    window.SB.loadMarkup(AZ, document.currentScript && document.currentScript.src, { full: true });
})();
