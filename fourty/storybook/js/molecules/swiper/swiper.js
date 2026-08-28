/* ════════════════════════════════════════════════════════════════════════
   molecules/swiper/swiper.js — Molecules / Swiper
   Casuística REAL de scss/fourties/molecules/swiper/_swiper.scss (.ft-mol-swiper*).
   Markup tomado de fourty/molecules/molecule-swiper.html. Cero invención de API.

   Galería/carrusel multimedia movido por la librería externa Swiper. El storybook
   zero-toolchain NO carga Swiper → las diapositivas se muestran APILADAS (estado estático)
   y la dependencia queda documentada. Cada slide es una imagen (.ft-img) o un embed
   (.ft-embed). Debajo, una barra de info con título (--title) y navegación (--nav:
   .ft-mol-number-highlighted + botones .ft-btn-nav).

   Estructura: una story plana interactiva "Base" (controls: título · nº de slides) +
   subgrupo "Markup" async desde swiper.html.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;
    const frameworkBlock = window.SB.helpers.frameworkBlock;

    /* Imágenes reales del showroom (banners del DS). /cds-statics vía <base> del iframe. */
    const IMGS = [
        "/cds-statics/assets/img/banners/ft-template-swiper-gallery-desktop--slide-01.jpg",
        "/cds-statics/assets/img/banners/ft-template-swiper-gallery-desktop--slide-02.jpg"
    ];

    /* ─── BASE — .ft-mol-swiper ─── */
    const baseArgTypes = [
        { key: "title", control: "text", desc: "Titular bajo el carrusel (.ft-mol-swiper--title)." },
        { key: "count", control: "number", desc: "Número de diapositivas (rango 1-8). Sin Swiper se apilan.", min: 1, max: 8 }
    ];
    const baseArgs = { title: "Titular de la imagen", count: "3" };

    // El SCSS colapsa (max-height:0) todo slide SIN .swiper-slide-active — esa clase
    // la pone Swiper en runtime. El canvas no corre JS, así que marcamos el primero
    // como activo para que se vea (igual que Swiper: un slide activo, resto colapsado).
    const slide = (i) =>
        '<div class="swiper-slide' + (i === 0 ? " swiper-slide-active" : "") + '">' +
            '<figure class="ft-img">' +
                '<picture><img src="' + IMGS[i % IMGS.length] + '" class="ft-helper-img-rd" loading="lazy" alt="Imagen ' + (i + 1) + '" width="250" height="135"></picture>' +
            "</figure>" +
            '<h2 class="ft-helper-hide">Titular de la diapositiva ' + (i + 1) + "</h2>" +
        "</div>";

    function live(a) {
        const n = Math.max(1, Math.min(8, parseInt(a.count, 10) || 1));
        let slides = "";
        for (let i = 0; i < n; i++) slides += slide(i);
        return '<div class="ft-mol-swiper" role="region" aria-roledescription="carrusel" aria-labelledby="swiperGalleryTitle">' +
            '<div class="swiper mySwiper">' +
                '<div class="swiper-wrapper">' + slides + "</div>" +
                '<button class="swiper-button-next"></button>' +
                '<button class="swiper-button-prev"></button>' +
            "</div>" +
            '<div class="ft-mol-swiper--info">' +
                '<h3 id="swiperGalleryTitle" class="ft-mol-swiper--title ft-helper-fontSize-heading-XXS">' + esc(a.title) + "</h3>" +
                '<div class="ft-mol-swiper--nav">' +
                    '<div class="ft-mol-number-highlighted"><span class="ft-mol-number-highlighted__item">1</span><span class="ft-mol-number-highlighted__item">' + n + "</span></div>" +
                    '<div class="ft-mol-swiper--nav__btns">' +
                        '<button type="button" name="left-button" class="ft-btn-nav ft-btn-nav--left ft-btn-nav--bordered"><span class="ft-btn-nav__text">Izquierda</span><span class="ft-btn-nav__icon"></span></button>' +
                        '<button type="button" name="right-button" class="ft-btn-nav ft-btn-nav--right ft-btn-nav--bordered"><span class="ft-btn-nav__text">Derecha</span><span class="ft-btn-nav__icon"></span></button>' +
                    "</div>" +
                "</div>" +
            "</div>" +
        "</div>";
    }

    const framework = frameworkBlock({
        intro: `Swiper debe montarse como vendor client-only sobre un contenedor estable. El framework deberia seguir siendo duenio del array de slides y de sus metadatos, no del DOM interno que reordena la libreria.`,
        rows: [
            ["Inicializacion", `Monta Swiper en <code>onMounted()</code> cuando el contenedor y los slides ya existan; si la data llega tarde, espera a <code>nextTick()</code>.`, `Monta Swiper en <code>useEffect()</code> cuando el contenedor y los slides ya existan; si la data llega tarde, espera al render final antes de instanciar.`],
            ["Cambios de slides", `Manten una raiz DOM estable y llama a <code>update()</code> si cambia el numero de slides.`, `Manten una raiz DOM estable y llama a <code>update()</code> si cambia el numero de slides.`],
            ["Cleanup", `Destruye la instancia en <code>onBeforeUnmount()</code> para retirar observers, resize handlers y estilos inline.`, `Destruye la instancia en el cleanup del efecto para retirar observers, resize handlers y estilos inline.`]
        ],
        note: `Si renderizas embeds o media pesada dentro del carrusel, difiere su montaje hasta que la slide vaya a usarse para no encarecer la hidratacion inicial.`
    });

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Swiper</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-swiper</code>): galería multimedia (imágenes y embeds) movida por la librería externa Swiper.</p>

        <div class="cb-callout"><strong>Depende de JavaScript de terceros.</strong> El storybook zero-toolchain no carga Swiper, así que se muestra solo la <strong>diapositiva activa</strong> (estado estático): el SCSS colapsa con <code>max-height:0</code> todo <code>.swiper-slide</code> que no tenga <code>.swiper-slide-active</code> —clase que Swiper añade en runtime—, por eso marcamos el primer slide como activo. En un proyecto consumidor el carrusel desliza y los botones <code>.ft-btn-nav</code> navegan. La estructura del markup (<code>.swiper</code> / <code>.swiper-wrapper</code> / <code>.swiper-slide</code>) es la real.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/swiper.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>swiper-js/swiper-bundle.min.js</code></td><td>JavaScript (Swiper)</td><td><strong>Obligatorio</strong> para deslizar</td></tr>
                <tr><td><code>.ft-img</code> · <code>.ft-embed</code> · <code>.ft-btn-nav</code> · <code>.ft-mol-number-highlighted</code></td><td>Átomos/moléculas compuestos</td><td>Slides y navegación</td></tr>
            </tbody>
        </table>
        </div>
        ${framework}

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-swiper</code></td></tr>
                <tr><td>Carrusel</td><td><code>.swiper</code> &gt; <code>.swiper-wrapper</code> &gt; <code>.swiper-slide</code></td></tr>
                <tr><td>Slide imagen / embed</td><td><code>.ft-img</code> · <code>.ft-embed</code></td></tr>
                <tr><td>Info</td><td><code>.ft-mol-swiper--info</code></td></tr>
                <tr><td>Título</td><td><code>.ft-mol-swiper--title</code></td></tr>
                <tr><td>Navegación</td><td><code>.ft-mol-swiper--nav</code> &gt; <code>__btns</code> (botones <code>.ft-btn-nav</code>) + contador</td></tr>
            </tbody>
        </table>
        <div class="cb-callout">Nota BEM: <code>--info</code>, <code>--title</code> y <code>--nav</code> se usan como <strong>elementos hijos</strong> (no como modificadores del bloque), tal como en el showroom.</div>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas (<code>swiper-[marca].scss</code>). Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/swiper/_swiper.scss</code> · markup: <code>fourty/molecules/molecule-swiper.html</code></p>
    </div>`;

    const SW = {
        id: "swiper",
        name: "Swiper",
        group: "Molecules",
        signals: ["js"],
        overview,
        stories: [
            // full: la galería y su info ocupan el ancho del contenedor.
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(SW);

    /* Markup original (HTML plano editable por el front) en swiper.html → subgrupo "Markup". */
    window.SB.loadMarkup(SW, document.currentScript && document.currentScript.src, { full: true });
})();
