/* ════════════════════════════════════════════════════════════════════════
   molecules/scoreboard/scoreboard.js — Molecules / Scoreboard
   Casuística REAL de scss/fourties/molecules/scoreboard/_scoreboard.scss
   (.ft-mol-scoreboard*). Markup tomado de fourty/molecules/molecule-scoreboard.html.
   Cero invención de API.

   Marcador AMPLIO de un partido: dos columnas de equipo (escudo + club + lista de
   eventos goleadores) y una columna central con el resultado. Modificador --interactive
   (añade botones +/- .ft-btn-nav para editar el marcador en vivo). Solo CSS — los botones
   de la variante interactiva los gestiona un JS consumidor.

   Estructura: una story plana interactiva "Base" (controls: interactivo · clubs · resultado ·
   estado · nº de eventos) + subgrupo "Markup" async desde scoreboard.html.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* Escudos reales del showroom (.ft-helper-img-rd). El <base> del iframe resuelve /cds-statics. */
    const HOME_SHIELD = "/cds-statics/assets/img/team-shields/spain/sporting-gijon.svg";
    const AWAY_SHIELD = "/cds-statics/assets/img/team-shields/spain/fc-barcelona.svg";

    /* ▼ SINGLE SOURCE OF TRUTH ▼ */
    const DATA = {
        // eventos goleadores de ejemplo (.ft-mol-scoreboard-event-list__item)
        events: [
            ["Pedri", "90'"],
            ["Frenkie de Jong", "78'"],
            ["Pedri", "45'"]
        ]
    };

    /* ─── BASE — .ft-mol-scoreboard ─── */
    const baseArgTypes = [
        { key: "interactive", control: "boolean", desc: "Variante editable (.ft-mol-scoreboard--interactive; añade botones +/-)." },
        { key: "homeClub", control: "text", desc: "Nombre del club local (.ft-mol-scoreboard__club)." },
        { key: "awayClub", control: "text", desc: "Nombre del club visitante (.ft-mol-scoreboard__club)." },
        { key: "homeScore", control: "text", desc: "Tantos del local (.ft-mol-scoreboard__score)." },
        { key: "awayScore", control: "text", desc: "Tantos del visitante (.ft-mol-scoreboard__score)." },
        { key: "state", control: "text", desc: "Estado del partido (.ft-mol-scoreboard__state)." },
        { key: "events", control: "number", desc: "Número de eventos goleadores por equipo (rango 0-6).", min: 0, max: 6 }
    ];
    const baseArgs = {
        interactive: false,
        homeClub: "Borussia Mönchengladbach",
        awayClub: "FC Barcelona",
        homeScore: "2",
        awayScore: "0",
        state: "Fin",
        events: "3"
    };

    function eventList(n) {
        if (n <= 0) return "";
        let items = "";
        for (let i = 0; i < n; i++) {
            const ev = DATA.events[i % DATA.events.length];
            items += '<li class="ft-mol-scoreboard-event-list__item">' + esc(ev[0]) +
                ' <time datetime="2022-05-17T12:00">' + esc(ev[1]) + "</time></li>";
        }
        return '<ul class="ft-mol-scoreboard-event-list">' + items + "</ul>";
    }

    const shield = (img, club) =>
        '<div class="ft-mol-scoreboard__shield"><img src="' + img + '" class="ft-helper-img-rd" title="' + esc(club) + '" alt="Escudo ' + esc(club) + '" /></div>';

    const briefCol = (side, club, n, img) =>
        '<div class="ft-mol-scoreboard__col-' + side + '" aria-label="Equipo: ' + esc(club) + '">' +
            '<div class="ft-mol-scoreboard__brief">' +
                '<span class="ft-mol-scoreboard__club">' + esc(club) + "</span>" +
                eventList(n) +
            "</div>" +
            shield(img, club) +
        "</div>";

    /* Grupo de botones +/- de la variante interactiva (.ft-btn-nav, gestionados por JS consumidor). */
    const btnGroup =
        '<div class="ft-mol-scoreboard__btn-group">' +
            '<button type="button" name="Más" class="ft-btn-nav ft-btn-nav--circle ft-btn-nav--plus ft-helper-bgColor-background-lightGrey" title="Sumar"><span class="ft-btn-nav__text">Más</span><span class="ft-btn-nav__icon"></span></button>' +
            '<button type="button" name="Menos" class="ft-btn-nav ft-btn-nav--circle ft-btn-nav--minus ft-helper-bgColor-background-lightGrey" title="Restar"><span class="ft-btn-nav__text">Menos</span><span class="ft-btn-nav__icon"></span></button>' +
        "</div>";

    function center(a) {
        if (a.interactive) {
            return '<div class="ft-mol-scoreboard__col-cnt" aria-label="Resultado editable">' +
                btnGroup +
                '<span class="ft-mol-scoreboard__score">' + esc(a.homeScore) + "</span>" +
                '<span class="ft-mol-scoreboard__score">' + esc(a.awayScore) + "</span>" +
                btnGroup +
            "</div>";
        }
        return '<div class="ft-mol-scoreboard__col-cnt" aria-label="Resultado: ' + esc(a.homeScore) + " - " + esc(a.awayScore) + '">' +
            '<span class="ft-mol-scoreboard__score">' + esc(a.homeScore) + "</span>" +
            '<span class="ft-mol-scoreboard__score">' + esc(a.awayScore) + "</span>" +
            '<time datetime="2022-05-17T12:00" class="ft-mol-scoreboard__state">' + esc(a.state) + "</time>" +
        "</div>";
    }

    function live(a) {
        const cls = ["ft-mol-scoreboard"];
        if (a.interactive) cls.push("ft-mol-scoreboard--interactive");
        const n = Math.max(0, Math.min(6, parseInt(a.events, 10) || 0));
        return '<div class="' + cls.join(" ") + '" role="region" aria-label="Marcador del partido">' +
            briefCol("lft", a.homeClub, n, HOME_SHIELD) +
            center(a) +
            briefCol("rgt", a.awayClub, n, AWAY_SHIELD) +
        "</div>";
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Scoreboard</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-scoreboard</code>): marcador amplio de un partido — escudo, club y goleadores por equipo, con el resultado al centro.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/scoreboard.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>brands/[marca]/atoms/btn.css</code></td><td>CSS de <code>.ft-btn-nav</code></td><td>Solo en <code>--interactive</code></td></tr>
                <tr><td>JavaScript del consumidor</td><td>Lógica de los botones +/-</td><td>Solo en <code>--interactive</code> (suma/resta marcador)</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong> salvo en <code>--interactive</code>, donde los botones <code>.ft-btn-nav--plus/--minus</code> editan el marcador con JS del proyecto consumidor (aquí son inertes).</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>marcador estático con estado (<code>__state</code>)</td></tr>
                <tr><td><code>--interactive</code></td><td>marcador editable: botones +/- en lugar del estado</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-scoreboard</code></td></tr>
                <tr><td>Columnas equipo</td><td><code>.ft-mol-scoreboard__col-lft</code> · <code>__col-rgt</code></td></tr>
                <tr><td>Resumen</td><td><code>.ft-mol-scoreboard__brief</code> (club + eventos)</td></tr>
                <tr><td>Club</td><td><code>.ft-mol-scoreboard__club</code></td></tr>
                <tr><td>Eventos</td><td><code>.ft-mol-scoreboard-event-list</code> &gt; <code>__item</code> (+ <code>&lt;time&gt;</code>)</td></tr>
                <tr><td>Escudo</td><td><code>.ft-mol-scoreboard__shield</code> &gt; <code>.ft-helper-img-rd</code></td></tr>
                <tr><td>Centro</td><td><code>.ft-mol-scoreboard__col-cnt</code></td></tr>
                <tr><td>Resultado</td><td><code>.ft-mol-scoreboard__score</code> · estado <code>__state</code></td></tr>
                <tr><td>Editores</td><td><code>.ft-mol-scoreboard__btn-group</code> &gt; <code>.ft-btn-nav--plus/--minus</code> (solo <code>--interactive</code>)</td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Componente deportivo compilado para todas las marcas. Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/scoreboard/_scoreboard.scss</code> · markup: <code>fourty/molecules/molecule-scoreboard.html</code></p>
    </div>`;

    const SB = {
        id: "scoreboard",
        name: "Scoreboard",
        group: "Molecules",
        overview,
        stories: [
            // full: el marcador reparte tres columnas a lo ancho → necesita el ancho completo.
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(SB);

    /* Markup original (HTML plano editable por el front) en scoreboard.html → subgrupo "Markup". */
    window.SB.loadMarkup(SB, document.currentScript && document.currentScript.src, { full: true });
})();
