/* ════════════════════════════════════════════════════════════════════════
   molecules/sorting/sorting.js — Molecules / Sorting
   Casuística REAL de scss/fourties/molecules/sorting/_sorting.scss (.ft-mol-sorting*).
   Markup tomado de fourty/molecules/molecule-sorting.html. Cero invención de API.

   Tabla de clasificación / ranking: cabecera (título + acción) + lista de filas, cada una
   con su posición (__infoNumber), avatar/medalla, nombre (__infoName) y estado
   (__statusBadge + __statusPoints). Modificadores de fila (--active, borde --primary/
   --secondary/--tertiary/--opacity) y de bloque (--team, que muestra los badges). Solo CSS.

   Estructura: una story plana interactiva "Base" (controls: modo equipo · título · nº de
   filas · fila activa) + subgrupo "Markup" async desde sorting.html.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* Medallas reales del showroom para el podio (.ft-helper-img-rd). /cds-statics vía <base>. */
    const MEDALS = [
        "/cds-statics/assets/img/icons/icon-medalla-oro.svg",
        "/cds-statics/assets/img/icons/icon-medalla-plata.svg",
        "/cds-statics/assets/img/icons/icon-medalla-bronce.svg"
    ];

    /* ─── BASE — .ft-mol-sorting ─── */
    const baseArgTypes = [
        { key: "team", control: "boolean", desc: "Modo equipo (.ft-mol-sorting--team: muestra el badge de estado y oculta el número)." },
        { key: "title", control: "text", desc: "Título de la cabecera (.ft-mol-sorting__title)." },
        { key: "count", control: "number", desc: "Número de filas del ranking (rango 1-12).", min: 1, max: 12 },
        { key: "active", control: "number", desc: "Fila resaltada (.__list--active); 0 = ninguna.", min: 0, max: 12 }
    ];
    const baseArgs = { team: false, title: "Grupo B", count: "4", active: "3" };

    function row(i, active) {
        const cls = ["ft-mol-sorting__list"];
        if (i === active) cls.push("ft-mol-sorting__list--active");
        // Podio (1-3) con medalla; el resto, solo número.
        const medal = i <= 3
            ? '<img src="' + MEDALS[i - 1] + '" alt="medalla" width="20" height="20" class="ft-helper-img-rd">'
            : "";
        return '<li class="' + cls.join(" ") + '">' +
            '<div class="ft-mol-sorting__info">' +
                '<span class="ft-mol-sorting__infoNumber">#' + i + "</span>" +
                medal +
                '<h3 class="ft-mol-sorting__infoName">Nombre ' + i + "</h3>" +
            "</div>" +
            '<div class="ft-mol-sorting__status">' +
                '<span class="ft-mol-sorting__statusBadge">Clasificado</span>' +
                '<span class="ft-mol-sorting__statusPoints">55 pts esta jornada</span>' +
            "</div>" +
        "</li>";
    }

    function live(a) {
        const cls = ["ft-mol-sorting"];
        if (a.team) cls.push("ft-mol-sorting--team");
        const n = Math.max(1, Math.min(12, parseInt(a.count, 10) || 1));
        const active = Math.max(0, Math.min(12, parseInt(a.active, 10) || 0));
        let rows = "";
        for (let i = 1; i <= n; i++) rows += row(i, active);
        return '<div class="' + cls.join(" ") + '" role="region" aria-label="Ranking">' +
            '<div class="ft-mol-sorting__header">' +
                '<h2 class="ft-mol-sorting__title">' + esc(a.title) + "</h2>" +
                '<a class="ft-link ft-link--tertiary ft-link--decoration" href="#">Editar</a>' +
            "</div>" +
            "<ul>" + rows + "</ul>" +
        "</div>";
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Sorting</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-sorting</code>): tabla de clasificación / ranking con posición, nombre y estado por fila.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/sorting.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>brands/[marca]/atoms/link.css</code></td><td>CSS del enlace de acción</td><td>Si la cabecera lleva <code>.ft-link</code></td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>. El <code>__statusBadge</code> solo se muestra en modo <code>--team</code> (en modo normal aparece el <code>__infoNumber</code>).</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>--team</code> (bloque)</td><td>muestra los badges de estado, oculta el número</td></tr>
                <tr><td><code>__list--active</code></td><td>fila resaltada (fondo cálido, texto en color error)</td></tr>
                <tr><td><code>__list--primary/--secondary/--tertiary</code></td><td>color del borde izquierdo (error / negro / gris)</td></tr>
                <tr><td><code>__list--opacity</code></td><td>fila atenuada</td></tr>
                <tr><td><code>__statusBadge--red/--green</code></td><td>color del badge de estado</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-sorting</code></td></tr>
                <tr><td>Cabecera</td><td><code>.ft-mol-sorting__header</code> &gt; <code>__title</code></td></tr>
                <tr><td>Fila</td><td><code>.ft-mol-sorting__list</code></td></tr>
                <tr><td>Info</td><td><code>__info</code> &gt; <code>__infoNumber</code> · <code>__infoName</code></td></tr>
                <tr><td>Estado</td><td><code>__status</code> &gt; <code>__statusBadge</code> · <code>__statusPoints</code></td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Componente deportivo compilado para todas las marcas (<code>sorting-[marca].scss</code>). Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/sorting/_sorting.scss</code> · markup: <code>fourty/molecules/molecule-sorting.html</code></p>
    </div>`;

    const SO = {
        id: "sorting",
        name: "Sorting",
        group: "Molecules",
        overview,
        stories: [
            // full: la fila reparte info a la izquierda y estado a la derecha → necesita ancho.
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(SO);

    /* Markup original (HTML plano editable por el front) en sorting.html → subgrupo "Markup". */
    window.SB.loadMarkup(SO, document.currentScript && document.currentScript.src, { full: true });
})();
