/* ════════════════════════════════════════════════════════════════════════
   molecules/multimedia/multimedia.js — Molecules / Multimedia
   Casuística REAL de scss/fourties/molecules/multimedia/_multimedia.scss (.ft-mol-multimedia*).
   Markup tomado de fourty/molecules/molecule-multimedia.html. Cero invención de API.

   Reproductor multimedia (vídeo/podcast) JS-DRIVEN: en producción un player
   (jwplayer + ad-schedule + tracking) sustituye el póster por el vídeo. El storybook
   es zero-toolchain y NO carga el player → mostramos el ESTADO PÓSTER de forma honesta
   (imagen + botón play + pie), que es lo que se ve antes de reproducir. La config del
   player (data-attrs, JSON de ads) no es markup del DS y se omite. Una story plana
   interactiva "Base" (título · crédito) + subgrupo "Markup" async.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    const POSTER = "https://estaticos-cdn.prensaiberica.es/clip/98ab8b58-04f6-4034-8781-3e79cac828f5_16-9-discover-aspect-ratio_default_0.jpg";
    /* Icono play real del showroom (__footerIcon). */
    const PLAY = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="ft-helper-img-rd"><path d="M24.7211 17.922L10.4635 26.833C9.73935 27.2856 8.8 26.765 8.8 25.911V8.08901C8.8 7.23503 9.73935 6.7144 10.4635 7.16701L24.7211 16.078C25.4025 16.5038 25.4025 17.4962 24.7211 17.922Z" fill="white" /></svg>`;

    /* ▼ SINGLE SOURCE OF TRUTH — piezas reales de _multimedia.scss / markup ▼ */
    const DATA = {
        parts: ["__container", "__video", "__footer", "__footerIcon", "__footerText"],
        families: ["gallery", "podcast", "amplayer (AMP)"]
    };

    /* ─── BASE — .ft-mol-multimedia (estado póster) ─── */
    const baseArgTypes = [
        { key: "title", control: "text", desc: "Texto del pie del reproductor (__footerText)." },
        { key: "caption", control: "text", desc: "Crédito/figcaption bajo el vídeo." }
    ];
    const baseArgs = {
        title: "La Comisión de Justicia del Congreso aprueba el",
        caption: "Momento en el cual es derribado el globo chino sobre el océano Atlántico. / RANDALL HILL / REUTERS"
    };

    function live(a) {
        return `<div class="ft-mol-multimedia">
    <div class="ft-mol-multimedia__container">
        <div class="ft-mol-multimedia__video">
            <picture class="ft-helper-img-rd ft-helper-show-block">
                <img class="ft-helper-img-rd" alt="Póster del vídeo" src="${POSTER}" loading="lazy">
            </picture>
            <div class="ft-mol-multimedia__footer">
                <div class="ft-mol-multimedia__footerIcon">${PLAY}</div>
                <h4 class="ft-mol-multimedia__footerText">${esc(a.title)}</h4>
            </div>
        </div>
    </div>
    <figure>
        <figcaption>
            <p class="ft-helper-fontColor-quaternary ft-helper-fontSize-body-M">${esc(a.caption)}</p>
        </figcaption>
    </figure>
</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Multimedia</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-multimedia</code>): contenedor de reproductor (vídeo/podcast) con póster, botón de play y pie, más un <code>&lt;figcaption&gt;</code> de crédito.</p>

        <div class="cb-callout"><strong>Componente JS-driven.</strong> En producción un <em>player</em> (jwplayer + <em>ad-schedule</em> + tracking) reemplaza el póster por el vídeo; la config va en <code>data-*</code> y un JSON de anuncios. El storybook es <strong>zero-toolchain</strong> y no carga el player: se muestra el <strong>estado póster</strong> (imagen + play + pie), que es lo que ve el usuario antes de reproducir. La config del player no es markup del DS y se omite.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/multimedia.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td>Player (jwplayer) + ad-schedule + tracking</td><td>JavaScript</td><td>Siempre para reproducir (vídeo/podcast)</td></tr>
                <tr><td><code>scss/fourties/molecules/multimedia/_multimedia.scss</code> + <code>amp-multimedia.scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Familias</h2>
        <table class="cb-table">
            <thead><tr><th>Variante</th><th>Uso</th></tr></thead>
            <tbody>
                <tr><td>vídeo (base)</td><td>reproductor de vídeo con póster</td></tr>
                <tr><td>gallery</td><td>galería multimedia</td></tr>
                <tr><td>podcast</td><td>reproductor de audio</td></tr>
                <tr><td>amplayer</td><td>variante AMP</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-multimedia</code></td></tr>
                <tr><td>Contenedor</td><td><code>__container</code> &gt; <code>__video</code> (player + póster)</td></tr>
                <tr><td>Pie</td><td><code>__footer</code> &gt; <code>__footerIcon</code> (play) + <code>__footerText</code></td></tr>
                <tr><td>Crédito</td><td><code>&lt;figcaption&gt;</code></td></tr>
            </tbody>
        </table>

        <div class="cb-callout">Las familias gallery/podcast/amplayer y la config completa del player están en el showroom; aquí se documenta el contenedor base en estado póster.</div>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/multimedia/_multimedia.scss</code> · markup: <code>fourty/molecules/molecule-multimedia.html</code></p>
    </div>`;

    const MM = {
        id: "multimedia",
        name: "Multimedia",
        group: "Molecules",
        overview,
        stories: [
            // full: el reproductor es 16:9 a ancho completo
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(MM);

    /* Markup original (HTML plano editable por el front) en multimedia.html → subgrupo "Markup". */
    window.SB.loadMarkup(MM, document.currentScript && document.currentScript.src, { full: true });
})();
