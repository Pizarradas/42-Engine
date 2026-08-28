/* ════════════════════════════════════════════════════════════════════════
   molecules/pick/pick.js — Molecules / Pick
   Casuística REAL de scss/fourties/molecules/pick/_pick.scss (.ft-mol-pick*).
   Markup tomado de fourty/molecules/molecule-pick.html. Cero invención de API.

   Tarjeta de pronóstico de un partido (porra/quiniela): cabecera con los dos
   equipos (__team con bandera + nombre) y el marcador/empate central
   (__outcome/__score/__score-breakdown), una franja __meta con el estado del
   partido (__status, --live + reloj) y el pronóstico del usuario (__forecast +
   botones __edit/__add que componen .ft-btn-nav), más bloques opcionales
   __event, __poll (lo más votado) y __reward. Modificador --compact reduce la
   tarjeta a equipos + pronóstico mínimo.

   El reloj en vivo lo anima fourty-js-timer.js en producción (estado --live);
   aquí es estático. Story "Base" interactiva (compacta · estado · equipos ·
   pronóstico) + subgrupo "Markup" async (Base completa + dos --compact).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    const FLAG = n => `../../cds-statics/assets/img/flags/${n}.svg`;

    /* ▼ SINGLE SOURCE OF TRUTH — piezas y modificadores reales de _pick.scss ▼ */
    const DATA = {
        parts: ["__card", "__body", "__match", "__team", "__team-selected", "__flag", "__team-name", "__outcome", "__score", "__score-breakdown", "__meta", "__status", "__status-label", "__status-time", "__points", "__forecast", "__forecast-label", "__forecast-value", "__edit", "__add", "__event", "__poll", "__reward"],
        mods: ["--compact", "__status--live", "__team-selected"],
        composes: [".ft-btn-nav--edit", ".ft-btn-nav--plus"]
    };

    /* ─── BASE — .ft-mol-pick ─── */
    const baseArgTypes = [
        { key: "compact", control: "boolean", desc: "Variante --compact: equipos + pronóstico mínimo (sin meta/poll/reward)." },
        { key: "home", control: "text", desc: "Equipo local (__team-name)." },
        { key: "away", control: "text", desc: "Equipo visitante (__team-name)." },
        { key: "outcome", control: "text", desc: "Resultado central (__outcome)." },
        { key: "score", control: "text", desc: "Marcador (__score)." },
        { key: "forecast", control: "text", desc: "Mi pronóstico (__forecast-value)." },
        { key: "live", control: "boolean", desc: "Estado en directo (__status--live + minuto)." }
    ];
    const baseArgs = {
        compact: false, home: "Inglaterra", away: "Rep. Corea",
        outcome: "Empate", score: "2 - 4", forecast: "3-3", live: true
    };

    function teamHome(name, selected) {
        return `<button class="ft-mol-pick__team${selected ? " ft-mol-pick__team-selected" : ""}">
                <span class="ft-mol-pick__flag"><img src="${FLAG("england")}" alt="${esc(name)}"></span>
                <span class="ft-mol-pick__team-name">${esc(name)}</span>
            </button>`;
    }
    function teamAway(name) {
        return `<button class="ft-mol-pick__team">
                <span class="ft-mol-pick__team-name">${esc(name)}</span>
                <span class="ft-mol-pick__flag"><img src="${FLAG("south_korea")}" alt="${esc(name)}"></span>
            </button>`;
    }

    function live(a) {
        const match = `<div class="ft-mol-pick__match">
            ${teamHome(a.home, true)}
            <button class="ft-mol-pick__team" aria-label="Resultado del partido">
                <span class="ft-mol-pick__outcome">${esc(a.outcome)}</span>
                <span class="ft-mol-pick__score">${esc(a.score)}</span>
                <span class="ft-mol-pick__score-breakdown">(1) - (2)</span>
            </button>
            ${teamAway(a.away)}
        </div>`;

        if (a.compact) {
            return `<article class="ft-mol-pick ft-mol-pick--compact" aria-label="Resultado del pronóstico del partido">
    <div class="ft-mol-pick__body">
        <div class="ft-mol-pick__match">
            ${teamHome(a.home, false)}
            <button class="ft-mol-pick__team ft-mol-pick__team-selected" aria-label="Resultado del partido">
                <span class="ft-mol-pick__outcome">${esc(a.outcome)}</span>
            </button>
            ${teamAway(a.away)}
        </div>
        <div class="ft-mol-pick__meta">
            <div class="ft-mol-pick__forecast">
                <span class="ft-mol-pick__forecast-value">${esc(a.forecast)}</span>
                <button class="ft-mol-pick__edit ft-btn-nav ft-btn-nav--edit" type="button" aria-label="Editar pronóstico">
                    <span class="ft-btn-nav__text">Editar</span>
                    <span class="ft-btn-nav__icon"></span>
                </button>
            </div>
        </div>
    </div>
</article>`;
        }

        const status = a.live
            ? `<div class="ft-mol-pick__status ft-mol-pick__status--live">
                <span class="ft-mol-pick__status-label">En directo <time itemprop="datePublished" datetime="2026-06-14T20:00:00+00:00">14 jun - 20:00</time></span>
                <span class="ft-mol-pick__status-time">67'</span>
                <span class="ft-mol-pick__points">+ 2 PTS.</span>
            </div>`
            : `<div class="ft-mol-pick__status">
                <span class="ft-mol-pick__status-label"><time itemprop="datePublished" datetime="2026-06-14T20:00:00+00:00">14 jun - 20:00</time></span>
                <span class="ft-mol-pick__points">+ 2 PTS.</span>
            </div>`;

        return `<article class="ft-mol-pick" aria-label="Resultado del pronóstico del partido">
    <div class="ft-mol-pick__card">
        <div class="ft-mol-pick__body">
            ${match}
            <div class="ft-mol-pick__meta">
                ${status}
                <div class="ft-mol-pick__forecast">
                    <span class="ft-mol-pick__forecast-label">Mi pronóstico</span>
                    <span class="ft-mol-pick__forecast-value">${esc(a.forecast)}</span>
                    <button class="ft-mol-pick__edit ft-btn-nav ft-btn-nav--edit" type="button" aria-label="Editar pronóstico">
                        <span class="ft-btn-nav__text">Editar</span>
                        <span class="ft-btn-nav__icon"></span>
                    </button>
                    <button class="ft-mol-pick__add ft-btn-nav ft-btn-nav--plus" type="button" name="go-to" title="title text">
                        <span class="ft-btn-nav__text">Más</span>
                        <span class="ft-btn-nav__icon"></span>
                    </button>
                </div>
            </div>
        </div>
        <div class="ft-mol-pick__event">
            <time itemprop="datePublished" datetime="2026-06-14T20:00:00+00:00">14 jun - 20:00</time>
            &nbsp;
            <span>Estadio Ciudad de México</span>
        </div>
        <div class="ft-mol-pick__poll" aria-label="Pronósticos más votados">
            <p class="ft-mol-pick__poll-title">Lo más votado por la mayoría</p>
            <div class="ft-mol-pick__poll-options">
                <span class="ft-mol-pick__poll-option">${esc(a.home)}<span class="ft-mol-pick__poll-value">55%</span></span>
                <span class="ft-mol-pick__poll-option">${esc(a.outcome)}<span class="ft-mol-pick__poll-value">3%</span></span>
                <span class="ft-mol-pick__poll-option">${esc(a.away)}<span class="ft-mol-pick__poll-value">42%</span></span>
            </div>
        </div>
        <div class="ft-mol-pick__reward">
            Clavaste el 1-0 · +2 al bolsillo
        </div>
    </div>
</article>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Pick</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-pick</code>): tarjeta de pronóstico de un partido (porra/quiniela). Reúne los dos equipos con su marcador o empate, el estado del partido, el pronóstico del usuario con acciones editar/añadir, y bloques opcionales de evento, votación y recompensa.</p>

        <div class="cb-callout">El minuto del partido en estado <code>--live</code> lo anima <code>fourty-js-timer.js</code> en producción. En este Storybook el reloj es estático.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/pick.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-btn-nav</code> (<code>--edit</code>, <code>--plus</code>)</td><td>CSS del átomo Btn Nav</td><td>Siempre (botones editar/añadir)</td></tr>
                <tr><td><code>js/timer/fourty-js-timer.js</code></td><td>JavaScript</td><td>Solo estado <code>--live</code> · anima el minuto</td></tr>
                <tr><td><code>scss/fourties/molecules/pick/_pick.scss</code> + <code>pick-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>tarjeta completa: equipos + meta + evento + votación + recompensa</td></tr>
                <tr><td><code>--compact</code></td><td>tarjeta reducida: equipos + pronóstico mínimo (sin card/event/poll/reward)</td></tr>
                <tr><td><code>__team-selected</code></td><td>marca el equipo/resultado elegido por el usuario</td></tr>
                <tr><td><code>__status--live</code></td><td>estado en directo (color + minuto en vivo)</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-pick</code> (<code>&lt;article&gt;</code>) &gt; <code>__card</code> &gt; <code>__body</code></td></tr>
                <tr><td>Enfrentamiento</td><td><code>__match</code> &gt; <code>__team</code> (<code>__flag</code> + <code>__team-name</code> | <code>__outcome</code>/<code>__score</code>/<code>__score-breakdown</code>)</td></tr>
                <tr><td>Meta</td><td><code>__meta</code> &gt; <code>__status</code> + <code>__forecast</code> (<code>__edit</code> · <code>__add</code>)</td></tr>
                <tr><td>Extras</td><td><code>__event</code> · <code>__poll</code> (<code>__poll-option</code>/<code>__poll-value</code>) · <code>__reward</code></td></tr>
            </tbody>
        </table>

        <div class="cb-callout">Existen familias específicas por marca — <code>pick-ep.scss</code>, <code>pick-epe.scss</code>, <code>pick-regionales.scss</code>, <code>pick-revistas.scss</code>, <code>pick-sport.scss</code> — que reestilan la tarjeta según el medio. No se reproducen aquí; el aspecto cambia con la marca activa.</div>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/pick/_pick.scss</code> · markup: <code>fourty/molecules/molecule-pick.html</code></p>
    </div>`;

    const PK = {
        id: "pick-mol",
        name: "Pick",
        group: "Molecules",
        overview,
        stories: [
            // full: la tarjeta es ancha (equipos + poll); necesita espacio
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(PK);

    /* Markup original (HTML plano editable por el front) en pick.html → subgrupo "Markup". */
    window.SB.loadMarkup(PK, document.currentScript && document.currentScript.src, { full: true });
})();
