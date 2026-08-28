/* ════════════════════════════════════════════════════════════════════════
   molecules/comment/comment.js — Molecules / Comment
   Casuística REAL de scss/fourties/molecules/comment/_comment.scss (.ft-mol-comment*).
   Markup tomado de fourty/molecules/molecule-comment.html. Cero invención de API.

   Comentario de usuario: __left (autor, compone .ft-mol-writer + .ft-date), __center
   (nº de comentario) y __right (título opcional + texto + acciones .ft-list-block).
   Modificadores --answer / --answer-hasAnswer / -hasAnswer (hilo de respuestas). Una
   story plana interactiva "Base" (autor · nº · texto · respuesta) + subgrupo "Markup".

   Nota: en el render interactivo se incluye la acción "Responder" (icono real); el
   markup VERBATIM del showroom (con los SVG de like/contador completos) vive en el
   subgrupo Markup, para no inflar la story con blobs.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    const AVATAR = "/cds-statics/assets/img/icons/icon-c-user.svg";
    /* Icono "Responder" (bocadillo) real del showroom. */
    const ICO_REPLY = `<svg class="ft-list-block__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.4236 2.53201C14.1571 1.71909 11.5187 1.61302 9.1977 2.11152C4.63029 3.09249 2.43896 6.1594 1.78492 9.39422C1.45469 11.0275 1.51949 12.7008 1.88128 14.1575C2.24549 15.6239 2.89469 16.8108 3.67576 17.5285L3.95251 17.7828L3.68697 21.8358L6.88722 20.117L7.208 20.2234C11.2717 21.5708 14.555 20.7795 15.7541 20.3632C19.9649 18.9014 21.6798 16.2705 22.2225 13.7132C22.7794 11.089 22.1126 8.47354 21.423 7.16021L21.4018 7.11979L21.3854 7.07718C20.5208 4.83042 18.6815 3.34183 16.4236 2.53201ZM22.8344 6.47108C21.7612 3.72368 19.5176 1.97367 16.9537 1.0541C14.3853 0.13291 11.4468 0.0225722 8.868 0.576433C3.61429 1.70481 1.00769 5.31568 0.245968 9.08307C-0.131683 10.9509 -0.058817 12.8598 0.357481 14.5359C0.734994 16.0559 1.40824 17.4346 2.33775 18.4133L2.08057 22.3386C2.01723 23.3053 3.0418 23.9645 3.89527 23.5061L7.0388 21.8178C11.3751 23.1593 14.8855 22.3267 16.2691 21.8464C20.9999 20.2041 23.1016 17.1338 23.7584 14.0392C24.3955 11.0371 23.6627 8.07488 22.8344 6.47108Z" fill="black"></path></svg>`;

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _comment.scss ▼ */
    const DATA = {
        mods: [
            ["--answer", "respuesta anidada (sangría + icono de hilo en el autor)"],
            ["--answer-hasAnswer", "respuesta dentro de un hilo que ya tiene respuestas"],
            ["-hasAnswer", "comentario raíz que tiene respuestas (sin borde inferior)"]
        ],
        parts: ["__left", "__center", "__right", "__rightTitle", "__rightText"]
    };

    /* ─── BASE — .ft-mol-comment ─── */
    const baseArgTypes = [
        { key: "nick", control: "text", desc: "Nombre del autor." },
        { key: "number", control: "text", desc: "Número del comentario (__center)." },
        { key: "text", control: "text", desc: "Texto del comentario (__rightText)." },
        { key: "answer", control: "boolean", desc: "Modificador --answer (respuesta anidada)." },
        { key: "replyTo", control: "text", desc: "Autor al que responde (__rightTitle; solo con --answer)." }
    ];
    const baseArgs = {
        nick: "Mariagg33B", number: "#10",
        text: "jurisprudencia art 10 CEDH: es calidad democrática, es contraste de opiniones, es empoderamiento del criterio de los ciudadanos.",
        answer: false, replyTo: "Mariagg33B"
    };

    function live(a) {
        const cls = ["ft-mol-comment"];
        if (a.answer) cls.push("ft-mol-comment--answer");
        const avatarExtra = a.answer
            ? ""
            : `<p class="ft-mol-writer__titleOpinion ft-helper-fontSize-body-M--small ft-helper-fontColor-primary"><a class="ft-link ft-link--secondary" href="#">Cambiar tu avatar</a></p>`;
        const title = a.answer
            ? `<p class="ft-mol-comment__rightTitle"><strong>En respuesta a ${esc(a.replyTo)}</strong></p>`
            : "";
        return `<article class="${cls.join(" ")}">
    <div class="ft-mol-comment__left">
        <div class="ft-mol-writer">
            <div class="ft-mol-writer__group">
                <div class="ft-mol-writer__item">
                    <img src="${AVATAR}" alt="avatar" width="60" height="60" class="ft-helper-img-rd">
                    <div class="ft-mol-writer__title">
                        <p class="ft-mol-writer__titleOpinion ft-helper-fontSize-body-L--small">
                            <a href="#" class="ft-link ft-link--primary" title="link title" target="_self">${esc(a.nick)}</a>
                        </p>
                        ${avatarExtra}
                        <div class="ft-date">
                            <time class="ft-date__text" datetime="2011-11-18T14:54:39+00:00">05 SEPT 2022 - 13:04 CET</time>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="ft-mol-comment__center">${esc(a.number)}</div>
    <div class="ft-mol-comment__right">
        ${title}
        <p class="ft-mol-comment__rightText">${esc(a.text)}</p>
        <ul class="ft-list-block">
            <li class="ft-list-block__item">
                <a href="#" class="ft-link" title="link title" target="_self">${ICO_REPLY}</a>
                <a href="#" class="ft-link" title="link title" target="_self">
                    <span class="ft-list-block__text ft-helper-fontSize-body-M--small">Responder</span>
                </a>
            </li>
        </ul>
    </div>
</article>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Comment</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-comment</code>): comentario de usuario en tres columnas — autor (<code>__left</code>, compone <code>.ft-mol-writer</code> + <code>.ft-date</code>), número (<code>__center</code>) y contenido + acciones (<code>__right</code>). Soporta hilos de respuesta.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/comment.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-mol-writer</code> · <code>.ft-date</code> · <code>.ft-list-block</code> · <code>.ft-link</code></td><td>CSS de piezas que compone</td><td>Siempre</td></tr>
                <tr><td><code>scss/fourties/molecules/comment/_comment.scss</code> + <code>comment-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>El layout es CSS; responder/votar sí necesita JS del consumidor</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>comentario raíz con borde superior</td></tr>
                <tr><td><code>--answer</code></td><td>respuesta anidada (sangría + icono de hilo junto al autor)</td></tr>
                <tr><td><code>--answer-hasAnswer</code></td><td>respuesta dentro de un hilo con más respuestas</td></tr>
                <tr><td><code>-hasAnswer</code></td><td>comentario raíz que tiene respuestas (sin borde inferior)</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-comment</code> (<code>&lt;article&gt;</code>)</td></tr>
                <tr><td>Autor</td><td><code>__left</code> &gt; <code>.ft-mol-writer</code> + <code>.ft-date</code></td></tr>
                <tr><td>Número</td><td><code>__center</code></td></tr>
                <tr><td>Contenido</td><td><code>__right</code> &gt; <code>__rightTitle</code> + <code>__rightText</code> + <code>.ft-list-block</code></td></tr>
            </tbody>
        </table>

        <div class="cb-callout">El subgrupo <strong>Markup</strong> trae el comentario completo con todas las acciones (responder, like, contador) e iconos SVG verbatim del showroom; la story Base muestra la acción «Responder» para no inflarse con blobs.</div>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/comment/_comment.scss</code> · markup: <code>fourty/molecules/molecule-comment.html</code></p>
    </div>`;

    const CMT = {
        id: "comment",
        name: "Comment",
        group: "Molecules",
        overview,
        stories: [
            // full: el comentario pasa a 3 columnas en ≥1024px; necesita ancho
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(CMT);

    /* Markup original (HTML plano editable por el front) en comment.html → subgrupo "Markup". */
    window.SB.loadMarkup(CMT, document.currentScript && document.currentScript.src, { full: true });
})();
