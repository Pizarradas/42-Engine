/* ════════════════════════════════════════════════════════════════════════
   molecules/authors/authors.js — Molecules / Authors
   Casuística REAL de scss/fourties/molecules/authors/_authors.scss (.ft-mol-authors*).
   Markup tomado de fourty/molecules/molecule-authors.html. Cero invención de API.

   Ficha de perfil AMPLIADA del autor (≠ Author compacto): foto, nombre, categoría,
   RRSS, tags (.ft-mol-tagsNews) y bio. Compone con átomos/moléculas: .ft-mol-rrss,
   .ft-mol-tagsNews, .ft-tag, .ft-link. Una story plana interactiva "Base"
   (orientación · reducido · superficie · premium · textos) + subgrupo "Markup" async.

   NOTA: ya existe un componente registrado con id "authors" (organism Authors,
   en js/organisms/authors). Para no colisionar en SB.register, esta molécula usa
   id "authors-mol".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    const PHOTO = "https://estaticos-cdn.prensaiberica.es/clip/3a5b2a1b-70e3-4746-a273-67c33eb9016e_source-aspect-ratio_default_0.jpg";

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _authors.scss ▼ */
    const DATA = {
        orient: [
            ["", "vertical (base, centrado)"],
            ["ft-mol-authors--horizontal", "horizontal (foto a la izquierda)"]
        ],
        surface: [
            ["", "sin superficie"],
            ["ft-mol-authors--background", "--background · fondo gris claro"],
            ["ft-mol-authors--bordered", "--bordered · borde arriba/abajo"]
        ],
        mods: [
            ["--reduced", "compacto: oculta tags, reduce foto y tipografías"],
            ["--premium", "marca de suscripción (logo +) antes de __contentQuote"]
        ],
        parts: ["__main", "__mainInfo", "__photo", "__photoImage", "__name", "__category", "__rrss", "__content", "__contentDescription", "__contentText", "__contentQuote"]
    };

    /* Bloque RRSS real del showroom (compone con .ft-mol-rrss). */
    const RRSS = `<div class="ft-mol-authors__rrss">
        <a title="Facebook" target="_blank" rel="nofollow" href="#"><i class="ft-mol-rrss ft-mol-rrssFacebook--default"></i></a><a title="Twitter" target="_blank" rel="nofollow" href="#"><i class="ft-mol-rrss ft-mol-rrssTwitter--default"></i></a>
        <a title="Whatsapp" target="_blank" rel="nofollow" href="#"><i class="ft-mol-rrss ft-mol-rrssWhatsapp--default"></i></a>
        <a title="Mailto" target="_blank" rel="nofollow" href="#"><i class="ft-mol-rrss ft-mol-rrss--txt ft-mol-rrssEmail--default">Contacto</i></a>
    </div>`;

    /* Bloque de tags real del showroom (compone con .ft-mol-tagsNews + .ft-tag). */
    const TAGS = `<div class="ft-mol-tagsNews">
        <p class="ft-mol-tagsNews__title">Escribe sobre</p>
        <ul class="ft-mol-tagsNews__tags">
            <li class="ft-tag ft-tag--sm ft-tag--linkBasis"><a href="#" target="_self" title="Trenes" class="ft-link ft-link--secondary" rel="">Trenes</a></li>
            <li class="ft-tag ft-tag--sm ft-tag--linkBasis"><a href="#" target="_self" title="Metro" class="ft-link ft-link--secondary" rel="">Metro</a></li>
            <li class="ft-tag ft-tag--sm ft-tag--linkBasis"><a href="#" target="_self" title="Cercanías" class="ft-link ft-link--secondary" rel="">Cercanías</a></li>
            <li class="ft-tag ft-tag--sm ft-tag--linkBasis"><a href="#" target="_self" title="Transporte" class="ft-link ft-link--secondary" rel="">Transporte</a></li>
        </ul>
    </div>`;

    /* ─── BASE — .ft-mol-authors ─── */
    const baseArgTypes = [
        { key: "orient", control: "radio", desc: "Orientación de la ficha.", options: DATA.orient },
        { key: "reduced", control: "boolean", desc: "Modificador --reduced (compacto; oculta tags)." },
        { key: "surface", control: "select", desc: "Superficie (--background / --bordered).", options: DATA.surface },
        { key: "premium", control: "boolean", desc: "Modificador --premium (marca de suscripción + cita)." },
        { key: "name", control: "text", desc: "Nombre del autor (__name)." },
        { key: "category", control: "text", desc: "Categoría/cargo (__category)." },
        { key: "description", control: "text", desc: "Descripción breve (__contentDescription)." }
    ];
    const baseArgs = {
        orient: "", reduced: false, surface: "", premium: false,
        name: "Andrea De Los Santos",
        category: "Lorem ipsum Subategory",
        description: "Descripción autor lorem ipsum dolor sit amet consectetur. In quis nulla et ut enim sollicitudin amet amet."
    };

    function live(a) {
        const cls = ["ft-mol-authors"];
        if (a.orient) cls.push(a.orient);
        if (a.reduced) cls.push("ft-mol-authors--reduced");
        if (a.surface) cls.push(a.surface);
        if (a.premium) cls.push("ft-mol-authors--premium");
        const quote = a.premium
            ? `<h3 class="ft-mol-authors__contentQuote">“Lorem ipsum dolor sit amet, consectetur adipiscing elit.”</h3>`
            : "";
        return `<div class="${cls.join(" ")}">
    <div class="ft-mol-authors__main">
        <a href="#" class="ft-mol-authors__photo" title="title" target="_self">
            <img src="${PHOTO}" width="60" height="60" class="ft-mol-authors__photoImage ft-helper-img-rd" alt="" title="title text">
        </a>
        <div class="ft-mol-authors__mainInfo">
            <h1 class="ft-mol-authors__name">${esc(a.name)}</h1>
            <h2 class="ft-mol-authors__category">${esc(a.category)}</h2>
            ${RRSS}
        </div>
    </div>
    <div class="ft-mol-authors__content">
        <p class="ft-mol-authors__contentDescription">${esc(a.description)}</p>
        ${TAGS}
        ${quote}
        <p class="ft-mol-authors__contentText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt nisi ut ex mollis luctus. Quisque euismod nunc eu ante viverra, ac eleifend diam euismod.</p>
    </div>
</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Authors <small style="font-weight:400;opacity:.7">· perfil ampliado</small></h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-authors</code>): ficha de perfil ampliada del autor — foto, nombre, categoría, redes (<code>.ft-mol-rrss</code>), temas (<code>.ft-mol-tagsNews</code>) y biografía. Compone varios átomos/moléculas del DS.</p>

        <div class="cb-callout">No confundir con <strong>Author</strong> (<code>.ft-mol-author</code>), la firma compacta. Esta es la ficha de perfil completa. Tampoco con el <em>organism</em> Authors (listado de varios autores).</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/authors.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-mol-rrss</code> · <code>.ft-mol-tagsNews</code> · <code>.ft-tag</code> · <code>.ft-link</code></td><td>CSS de piezas que compone</td><td>Siempre (RRSS, tags, enlaces)</td></tr>
                <tr><td><code>scss/fourties/molecules/authors/_authors.scss</code> + <code>authors-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS (salvo <code>.ft-readMore</code> nativo si se usa)</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>perfil vertical centrado</td></tr>
                <tr><td><code>--horizontal</code></td><td>foto a la izquierda, info a la derecha</td></tr>
                <tr><td><code>--reduced</code></td><td>compacto: oculta tags, reduce foto y tipografías</td></tr>
                <tr><td><code>--background</code></td><td>fondo gris claro con padding</td></tr>
                <tr><td><code>--bordered</code></td><td>borde arriba/abajo con padding</td></tr>
                <tr><td><code>--premium</code></td><td>marca de suscripción (logo +) antes de <code>__contentQuote</code></td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-authors</code></td></tr>
                <tr><td>Cabecera</td><td><code>__main</code> &gt; <code>__photo</code>/<code>__photoImage</code> + <code>__mainInfo</code></td></tr>
                <tr><td>Identidad</td><td><code>__name</code> · <code>__category</code> · <code>__rrss</code></td></tr>
                <tr><td>Cuerpo</td><td><code>__content</code> &gt; <code>__contentDescription</code> · tags · <code>__contentText</code></td></tr>
                <tr><td>Cita premium</td><td><code>__contentQuote</code> (con <code>--premium</code>)</td></tr>
            </tbody>
        </table>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/authors/_authors.scss</code> · markup: <code>fourty/molecules/molecule-authors.html</code></p>
    </div>`;

    const AS = {
        id: "authors-mol",
        name: "Authors",
        group: "Molecules",
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(AS);

    /* Markup original (HTML plano editable por el front) en authors.html → subgrupo "Markup". */
    window.SB.loadMarkup(AS, document.currentScript && document.currentScript.src, { full: true });
})();
