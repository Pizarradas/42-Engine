/* ════════════════════════════════════════════════════════════════════════
   molecules/score/score.js — Molecules / Score
   Casuística REAL de scss/fourties/molecules/score/_score.scss (.ft-mol-score*).
   Markup tomado de fourty/molecules/molecule-score.html. Cero invención de API.

   Marcador compacto de un partido: dos equipos (__name: escudo + sigla) flanqueando un
   centro (__condition: estado + resultado). Modificador --playing (partido en directo,
   el resultado palpita). Solo CSS.

   Estructura: una story plana interactiva "Base" (controls: directo · equipos · estado ·
   resultado) + subgrupo "Markup" async desde score.html.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* Escudos reales del showroom (URLs externas de Sport/PI). El <base> del iframe los sirve. */
    const HOME_IMG = "https://est.sport.es/img/modulos-deportivos/resultados/soccer/img/juventus.png";
    const AWAY_IMG = "https://estaticos-cdn.prensaiberica.es/epi/public/file/2021/0324/05/barca-4ccd3bc.png";

    /* ─── BASE — .ft-mol-score ─── */
    const baseArgTypes = [
        { key: "playing", control: "boolean", desc: "Partido en directo (.ft-mol-score--playing; el resultado palpita)." },
        { key: "homeName", control: "text", desc: "Sigla del equipo local (.ft-mol-score__nameText)." },
        { key: "awayName", control: "text", desc: "Sigla del equipo visitante (.ft-mol-score__nameText)." },
        { key: "status", control: "text", desc: "Estado del partido (.ft-mol-score__conditionPlay)." },
        { key: "homeScore", control: "text", desc: "Tantos del local (.ft-mol-score__conditionNumber)." },
        { key: "awayScore", control: "text", desc: "Tantos del visitante (.ft-mol-score__conditionNumber)." }
    ];
    const baseArgs = {
        playing: false,
        homeName: "BAY",
        awayName: "CPH",
        status: "FINALIZADO",
        homeScore: "123",
        awayScore: "234"
    };

    const team = (name, img) =>
        '<div class="ft-mol-score__name" aria-label="Equipo: ' + esc(name) + '">' +
            '<span class="ft-mol-score__nameBackground">' +
                '<img class="ft-mol-score__nameImage" width="35" height="35" loading="lazy" alt="Escudo de ' + esc(name) + '" src="' + img + '">' +
            "</span>" +
            '<p class="ft-mol-score__nameText">' + esc(name) + "</p>" +
        "</div>";

    function live(a) {
        const cls = ["ft-mol-score"];
        if (a.playing) cls.push("ft-mol-score--playing");
        return '<div class="' + cls.join(" ") + '" role="region" aria-label="Marcador del partido">' +
            team(a.homeName, HOME_IMG) +
            '<div class="ft-mol-score__condition" aria-label="Resultado: ' + esc(a.homeName) + " " + esc(a.homeScore) + " - " + esc(a.awayScore) + " " + esc(a.awayName) + '">' +
                '<div class="ft-mol-score__conditionPlay" aria-hidden="true">' + esc(a.status) + "</div>" +
                '<div class="ft-mol-score__conditionNumber" aria-hidden="true"><span>' + esc(a.homeScore) + "</span><span>-</span><span>" + esc(a.awayScore) + "</span></div>" +
            "</div>" +
            team(a.awayName, AWAY_IMG) +
        "</div>";
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Score</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-score</code>): marcador compacto de un partido — dos equipos (escudo + sigla) y el resultado en el centro.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/score.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td>Escudos (img)</td><td>Imágenes externas del equipo</td><td>Las aporta el consumidor (<code>__nameImage</code>)</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>: el estado <code>--playing</code> anima el resultado (palpita) para indicar partido en directo. Los escudos son imágenes externas del medio.</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>marcador estático (estado + resultado)</td></tr>
                <tr><td><code>--playing</code></td><td>partido en directo: el <code>__conditionNumber</code> palpita</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-score</code></td></tr>
                <tr><td>Equipo</td><td><code>.ft-mol-score__name</code></td></tr>
                <tr><td>Escudo</td><td><code>.ft-mol-score__nameBackground</code> &gt; <code>.ft-mol-score__nameImage</code></td></tr>
                <tr><td>Sigla</td><td><code>.ft-mol-score__nameText</code></td></tr>
                <tr><td>Centro</td><td><code>.ft-mol-score__condition</code></td></tr>
                <tr><td>Estado</td><td><code>.ft-mol-score__conditionPlay</code></td></tr>
                <tr><td>Resultado</td><td><code>.ft-mol-score__conditionNumber</code></td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas; el componente es deportivo (Sport y regionales con secciones de deporte). Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/score/_score.scss</code> · markup: <code>fourty/molecules/molecule-score.html</code></p>
    </div>`;

    const S = {
        id: "score",
        name: "Score",
        group: "Molecules",
        overview,
        stories: [
            // full: el marcador reparte equipos a los lados y el resultado al centro → necesita ancho.
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(S);

    /* Markup original (HTML plano editable por el front) en score.html → subgrupo "Markup". */
    window.SB.loadMarkup(S, document.currentScript && document.currentScript.src, { full: true });
})();
