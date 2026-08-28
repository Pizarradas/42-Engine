/* ════════════════════════════════════════════════════════════════════════
   organisms/cardhome/cardhome.js — Organisms / Card Home
   Casuística REAL de scss/fourties/organism/cardhome/_cardHome.scss (.ft-org-cardHome).
   Cero invención: TODAS las clases salen del SCSS y todos los fragmentos internos
   (label, advice, score, figcaption, writer, date, related) son VERBATIM del showroom
   (organism-cardHome.html). Rutas normalizadas (../../cds-statics → /cds-statics).

   Base = BUILDER paramétrico: en vez de un único `select` de variante, expone TODOS los
   ejes del organismo como controles independientes → cualquier combinación posible.
     · Ejes exclusivos (select): tamaño · tipo destacado · layout · media
     · Flags de contexto (boolean): branded · premium · discover · full · textonly
     · Piezas internas (boolean): label · advice · score · figcaption · pretitle ·
       firma(writer) · fecha · relacionada · relacionada premium
   Los 5 markups verbatim canónicos del showroom siguen disponibles en el subgrupo
   «Markup» (cardhome.html, vía loadMarkup).

   Nota de fidelidad: `--reverse · --Vfeatured · --Hfeatured · --discover · --textonly`
   existen en el SCSS pero el showroom NO los demuestra con markup propio: aquí se aplican
   como clase sobre la maqueta estándar (la clase es real; no es una combinación que el
   showroom cure). El TIPO de media (gallery/video/audio) es intercambio de CLASE: el icono lo
   pinta el CSS (::after + icon-media*.svg) sobre el mismo <picture>, sin fabricar reproductor.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";

    /* ─── Fragmentos VERBATIM del showroom (organism-cardHome.html) ─── */
    var LABEL =
        '<div class="ft-mol-label">' +
            '<div class="ft-mol-label__content">' +
                '<img src="/cds-statics/assets/img/icons/sport-icono-circle.svg" alt="Confidencial Sport" width="24" height="24" class="ft-mol-label__image">' +
                '<span class="ft-mol-label__title">Confidencial</span>' +
            '</div>' +
        '</div>';

    var ADVICE =
        '<div class="ft-mol-label ft-mol-label--advice">' +
            '<div class="ft-mol-label__content">' +
                '<span class="ft-mol-label__title">En directo</span>' +
            '</div>' +
        '</div>';

    var SCORE =
        '<div class="ft-mol-score" role="region" aria-label="Marcador del partido">' +
            '<div class="ft-mol-score__name" aria-label="Equipo local: BAY">' +
                '<span class="ft-mol-score__nameBackground">' +
                    '<img class="ft-mol-score__nameImage" width="35" height="35" loading="lazy" alt="Escudo de BAY" src="https://est.sport.es/img/modulos-deportivos/resultados/soccer/img/juventus.png">' +
                '</span>' +
                '<p class="ft-mol-score__nameText">BAY</p>' +
            '</div>' +
            '<div class="ft-mol-score__condition" aria-label="Resultado final: BAY 123 - 124 CPH">' +
                '<div class="ft-mol-score__conditionPlay" aria-hidden="true">FINALIZADO</div>' +
                '<div class="ft-mol-score__conditionNumber" aria-hidden="true"><span>123</span><span>-</span><span>234</span></div>' +
            '</div>' +
            '<div class="ft-mol-score__name" aria-label="Equipo visitante: CPH">' +
                '<span class="ft-mol-score__nameBackground">' +
                    '<img class="ft-mol-score__nameImage" width="35" height="35" loading="lazy" alt="Escudo de CPH" src="https://estaticos-cdn.prensaiberica.es/epi/public/file/2021/0324/05/barca-4ccd3bc.png">' +
                '</span>' +
                '<p class="ft-mol-score__nameText">CPH</p>' +
            '</div>' +
        '</div>';

    var FIGCAPTION =
        '<figcaption class="ft-mol-figcaption">' +
            '<p class="ft-mol-figcaption__txt"><span class="ft-helper-fontWeight-800">Serge Aurier</span>, exjugador del Villarreal es el lateral libre más valioso de este mercado, con 10 millones. Juega en la banda derecha. <span class="ft-helper-fontWeight-800">/EFE/AFP</span></p>' +
        '</figcaption>';

    var PRETITLE =
        '<p class="ft-org-cardHome__mainPretitle"><a class="ft-link ft-link--primary" href="#">Serie A</a></p>';

    var SRCSET =
        '<source media="(min-width: 768px)" srcset="https://estaticos-cdn.prensaiberica.es/clip/e1b0c6e4-cb46-4d17-af5e-beac71740d82_16-9-discover-aspect-ratio_default_0.jpg">' +
        '<img src="https://estaticos-cdn.prensaiberica.es/clip/e1b0c6e4-cb46-4d17-af5e-beac71740d82_16-9-discover-aspect-ratio_default_0.jpg" width="656" height="381" loading="lazy" class="ft-helper-img-rd" alt="alt text" title="title text">';

    function writerBlock(a) {
        var date = a.date
            ? '<div class="ft-date">' +
                  '<div class="ft-date__text">' +
                      '<span class="ft-date__textPlace">Barcelona</span>' +
                      '<time class="ft-date__textTime" itemprop="datePublished" datetime="2011-11-18T14:54:39+00:00">05 SEPT 2022 - 13:04 CET</time>' +
                  '</div>' +
                  '<time class="ft-date__reload" itemprop="dateModified" datetime="2011-11-18T14:54:39+00:00">Actualizada 07 FEB 2023 -12:35 CET</time>' +
              '</div>'
            : '';
        return '<div class="ft-mol-writer ft-mol-writer--cardHome">' +
                   '<div class="ft-mol-writer__item">' +
                       '<div class="ft-mol-writer__title">' +
                           '<p class="ft-mol-writer__titleOpinion"><a href="#" class="ft-link ft-link--tertiary" title="link title" target="_self">Sergi Graell</a></p>' +
                           '<p class="ft-mol-writer__titleOpinion"><a href="#" class="ft-link ft-link--tertiary" title="link title" target="_self">Sergi Graell</a></p>' +
                       '</div>' +
                   '</div>' +
                   date +
               '</div>';
    }

    function relatedBlock(a) {
        var cls = "ft-org-cardHome__mainRelated" + (a.relatedPremium ? " ft-org-cardHome__mainRelated--premium" : "");
        return '<h3 class="' + cls + '">' +
                   '<a href="#" class="ft-link ft-link--secondary" title="title text" target="_self">standard dummy text eversince the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book <span class="ft-helper-fontColor-quaternary ft-helper-fontSize-body-S--small">Sergi Graell</span></a>' +
               '</h3>';
    }

    /* ─── Clases del bloque desde los controles ─── */
    function rootClass(a) {
        var c = ["ft-org-cardHome", "ft-org-cardHome--" + a.size];
        if (a.featured !== "none") c.push("ft-org-cardHome--" + a.featured);
        if (a.layout !== "default") c.push("ft-org-cardHome--" + a.layout);
        if (a.branded) c.push("ft-org-cardHome--branded");
        if (a.premium) c.push("ft-org-cardHome--premium");
        if (a.discover) c.push("ft-org-cardHome--discover");
        if (a.full) c.push("ft-org-cardHome--full");
        if (a.textonly) c.push("ft-org-cardHome--textonly");
        // Modificadores internos de bloque (solo-SCSS, sin markup propio en el showroom)
        if (a.hideImage !== "none") c.push("ft-org-cardHome--" + a.hideImage);
        if (a.showDate) c.push("ft-org-cardHome--showDate");
        if (a.noMark) c.push("ft-org-cardHome--branded__noMark");
        return c.join(" ");
    }

    /* ─── Render ─── */
    function build(a) {
        var inPicture = (a.label ? LABEL : "") + (a.advice ? ADVICE : "") + (a.score ? SCORE : "");
        // Tipo de media: intercambio de CLASE (el icono lo pinta el CSS vía ::after sobre el
        // mismo <picture> → icon-mediaGallery/Video/Audio.svg). "none" = __media pelado, sin icono.
        var MEDIA = { none: "", gallery: " ft-org-cardHome__mediaGallery", video: " ft-org-cardHome__mediaVideo", audio: " ft-org-cardHome__mediaAudio" };
        var mediaCls = "ft-org-cardHome__media" + (MEDIA[a.media] != null ? MEDIA[a.media] : MEDIA.gallery);
        var media =
            '<figure class="' + mediaCls + '">' +
                '<a href="#" title="title text">' +
                    '<picture class="ft-img">' + SRCSET + inPicture + '</picture>' +
                '</a>' +
                (a.figcaption ? FIGCAPTION : "") +
            '</figure>';
        var mainCls = "ft-org-cardHome__main" + (a.alignCenter ? " ft-org-cardHome__main--alignCenter" : "");
        var main =
            '<div class="' + mainCls + '">' +
                (a.label ? LABEL : "") + (a.advice ? ADVICE : "") +
                '<header>' +
                    (a.pretitle ? PRETITLE : "") +
                    '<h2 class="ft-org-cardHome__mainTitle"><a href="#" class="ft-link ft-link--secondary" title="link title" target="_self">Lillard decidirá tras la agencia libre</a></h2>' +
                '</header>' +
                '<p class="ft-org-cardHome__mainText">Según apunta Brian Windhorst, Portland Trail Blazers y Damian Lillard se han reunido este martes para decidir sobre el futuro de la franquicia.</p>' +
                (a.writer ? writerBlock(a) : "") +
                (a.related ? relatedBlock(a) : "") +
            '</div>';
        return '<article class="' + rootClass(a) + '">' + media + main + '</article>';
    }

    /* ─── Controles ─── */
    var baseArgTypes = [
        { key: "size", control: "select", desc: "Tamaño del organismo (eje exclusivo). Clases --xs…--xlg del SCSS.", options: [
            ["xs", "XS"], ["sm", "SM"], ["md", "MD"], ["lg", "LG"], ["xlg", "XLG"]
        ] },
        { key: "featured", control: "select", desc: "Tipo de destacado (eje exclusivo). featured/featuredRow se demuestran en el showroom; Vfeatured/Hfeatured son solo-SCSS.", options: [
            ["none", "—"], ["featured", "Destacada (col↔fila invertido)"], ["featuredRow", "Destacada en fila"], ["Vfeatured", "Vertical featured"], ["Hfeatured", "Horizontal featured"]
        ] },
        { key: "layout", control: "select", desc: "Disposición (eje exclusivo). row/col se demuestran; reverse es solo-SCSS.", options: [
            ["default", "Por defecto"], ["row", "Fila (--row)"], ["col", "Columna (--col)"], ["reverse", "Invertido (--reverse)"]
        ] },
        { key: "media", control: "select", desc: "Tipo de media (eje exclusivo). El icono lo pinta el CSS sobre el mismo <picture> (icon-mediaGallery/Video/Audio.svg). «Sin icono» = __media pelado.", options: [
            ["none", "Sin icono"], ["gallery", "Galería"], ["video", "Vídeo"], ["audio", "Audio"]
        ] },
        { key: "branded", control: "boolean", desc: "Modificador --branded (cabecera de marca/sello)." },
        { key: "premium", control: "boolean", desc: "Modificador --premium (bloque de pago)." },
        { key: "discover", control: "boolean", desc: "Modificador --discover (formato discover). Solo-SCSS: sin markup propio en el showroom." },
        { key: "full", control: "boolean", desc: "Modificador --full (ancho completo; usa __media pelado). Combina típicamente con featured + xlg." },
        { key: "textonly", control: "boolean", desc: "Modificador --textonly (oculta media, solo texto). Solo-SCSS." },
        { key: "hideImage", control: "select", desc: "Modificador interno --hideImage / --hideImagemobile (oculta la imagen en desktop o en mobile). Solo-SCSS.", options: [
            ["none", "—"], ["hideImage", "Ocultar en desktop"], ["hideImagemobile", "Ocultar en mobile"]
        ] },
        { key: "showDate", control: "boolean", desc: "Modificador interno --showDate (fuerza mostrar la fecha). Solo-SCSS." },
        { key: "alignCenter", control: "boolean", desc: "Modificador interno __main--alignCenter (centra el texto del cuerpo). Solo-SCSS." },
        { key: "noMark", control: "boolean", desc: "Modificador interno --branded__noMark (título sin marca; afecta __mainTitle). Solo-SCSS, propio del contexto branded." },
        { key: "label", control: "boolean", desc: "Etiqueta .ft-mol-label («Confidencial»), en la imagen y en el cuerpo." },
        { key: "advice", control: "boolean", desc: "Etiqueta .ft-mol-label--advice («En directo»)." },
        { key: "score", control: "boolean", desc: "Marcador deportivo .ft-mol-score sobre la imagen." },
        { key: "figcaption", control: "boolean", desc: "Pie de foto .ft-mol-figcaption." },
        { key: "pretitle", control: "boolean", desc: "Antetítulo .ft-org-cardHome__mainPretitle." },
        { key: "writer", control: "boolean", desc: "Firma .ft-mol-writer (autor)." },
        { key: "date", control: "boolean", desc: "Fecha .ft-date (anidada en la firma; requiere «writer»)." },
        { key: "related", control: "boolean", desc: "Noticia relacionada .ft-org-cardHome__mainRelated." },
        { key: "relatedPremium", control: "boolean", desc: "Variante --premium de la relacionada (requiere «related»)." }
    ];
    var baseArgs = {
        size: "lg", featured: "none", layout: "default", media: "gallery",
        branded: false, premium: false, discover: false, full: false, textonly: false,
        hideImage: "none", showDate: false, alignCenter: false, noMark: false,
        label: true, advice: true, score: true, figcaption: true, pretitle: true,
        writer: true, date: true, related: true, relatedPremium: true
    };

    var overview = '<div class="cb-docs__inner">' +
        '<h1>Card Home</h1>' +
        '<p class="cb-docs__lead">Organismo del 42DS (<code>.ft-org-cardHome</code>): tarjeta de portada que compone imagen destacada, etiquetas, marcador, firma y titulares. Columna en desktop, fila en mobile (y al revés con <code>--featured</code>).</p>' +

        '<h2>Sistema de controles (Base)</h2>' +
        '<p>La story <strong>Base</strong> es un <em>builder</em>: recompone piezas <strong>verbatim</strong> del showroom bajo controles independientes → cualquier combinación. Tres ejes exclusivos + flags de contexto + piezas internas.</p>' +
        '<table class="cb-table">' +
            '<thead><tr><th>Eje / flag</th><th>Valores</th><th>Clase(s)</th></tr></thead>' +
            '<tbody>' +
                '<tr><td>Tamaño</td><td>XS · SM · MD · LG · XLG</td><td><code>--xs … --xlg</code></td></tr>' +
                '<tr><td>Destacado</td><td>— · featured · featuredRow · Vfeatured · Hfeatured</td><td><code>--featured</code> · <code>--featuredRow</code> · <code>--Vfeatured</code> · <code>--Hfeatured</code></td></tr>' +
                '<tr><td>Layout</td><td>defecto · row · col · reverse</td><td><code>--row</code> · <code>--col</code> · <code>--reverse</code></td></tr>' +
                '<tr><td>Media</td><td>sin icono · galería · vídeo · audio</td><td><code>__media</code> · <code>__mediaGallery</code> · <code>__mediaVideo</code> · <code>__mediaAudio</code></td></tr>' +
                '<tr><td>Contexto</td><td>branded · premium · discover · full · textonly</td><td><code>--branded</code> · <code>--premium</code> · <code>--discover</code> · <code>--full</code> · <code>--textonly</code></td></tr>' +
                '<tr><td>Mod. internos</td><td>hideImage(desktop/mobile) · showDate · alignCenter · noMark</td><td><code>--hideImage</code> · <code>--hideImagemobile</code> · <code>--showDate</code> · <code>__main--alignCenter</code> · <code>--branded__noMark</code></td></tr>' +
                '<tr><td>Piezas</td><td>label · advice · score · figcaption · pretitle · writer · date · related(+premium)</td><td><code>.ft-mol-label</code> · <code>--advice</code> · <code>.ft-mol-score</code> · <code>.ft-mol-figcaption</code> · <code>__mainPretitle</code> · <code>.ft-mol-writer</code> · <code>.ft-date</code> · <code>__mainRelated</code></td></tr>' +
            '</tbody>' +
        '</table>' +
        '<div class="cb-callout"><strong>Fidelidad:</strong> <code>--reverse · --Vfeatured · --Hfeatured · --discover · --textonly</code> y los <strong>modificadores internos</strong> (<code>--hideImage</code> · <code>--hideImagemobile</code> · <code>--showDate</code> · <code>__main--alignCenter</code> · <code>--branded__noMark</code>) existen en el SCSS pero el showroom no los cura con markup propio: aquí se aplican como <strong>clase real</strong> sobre la maqueta estándar (no son invención; son clases del parcial). El <strong>tipo de media</strong> (galería/vídeo/audio) es un <strong>intercambio de clase</strong>: el icono lo pinta el CSS (<code>::after</code> + <code>icon-media*.svg</code>) sobre el mismo <code>&lt;picture&gt;</code> — no se fabrica markup de reproductor. Los <strong>5 markups canónicos</strong> (combinaciones que sí cura el showroom) están en el subgrupo <strong>Markup</strong>.</div>' +

        '<h2>Dependencias</h2>' +
        '<div class="cb-deps">' +
        '<table class="cb-table">' +
            '<thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>' +
            '<tbody>' +
                '<tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>' +
                '<tr><td><code>brands/[marca]/organism/cardhome.css</code></td><td>CSS del organismo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>' +
                '<tr><td><code>molecules/figcaption · label · writer · score</code></td><td>CSS de las piezas internas</td><td>Según controles activos</td></tr>' +
                '<tr><td>Fotos / escudos</td><td>Imágenes</td><td>Las aporta el consumidor</td></tr>' +
                '<tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>' +
            '</tbody>' +
        '</table>' +
        '</div>' +

        '<h2>Variantes por marca</h2>' +
        '<p>Compilado para todas las marcas (<code>cardHome-[marca].scss</code>). Cambia la marca con la <strong>toolbar Brand</strong>.</p>' +

        '<p class="cb-src">Fuente: <code>scss/fourties/organism/cardhome/_cardHome.scss</code> · markup: <code>fourty/organisms/organism-cardHome.html</code></p>' +
    '</div>';

    var DEF = {
        id: "cardhome",
        name: "Card Home",
        group: "Organisms",
        overview: overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: build }
        ]
    };
    window.SB.register(DEF);
    window.SB.loadMarkup(DEF, document.currentScript && document.currentScript.src, { full: true });
})();
