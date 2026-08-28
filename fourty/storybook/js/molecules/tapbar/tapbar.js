/* ════════════════════════════════════════════════════════════════════════
   molecules/tapbar/tapbar.js — Molecules / Tapbar
   Casuística REAL de scss/fourties/molecules/tapbar/_tapbar.scss (.ft-mol-tapbar*).
   Markup en el subgrupo "Markup" (tapbar.html). Cero invención de API.

   Barra de navegación inferior (position:fixed, z-index 2500). Cada ítem (__item)
   lleva un __icon-wrapper con UN icono Lucide (stroke, viewBox 0 0 24 24) más un
   __text. El __container pinta el fondo full-bleed con ::before/::after. El estado
   __item--active eleva el icono, lo rodea con un círculo (::after del wrapper) y pone
   el texto en negrita + color de marca.
   En producción la opera cds-statics/js/tapbar/fourty-js-tapbar.js (aquí, estático).

   Estructura: una story plana interactiva "Base" (controls calibrados al SCSS:
   count · active · alert · tooltip-aviso .ft-tooltip--advice montado sobre un ítem)
   + subgrupo "Markup" async desde tapbar.html (3/4/5 ítems + AMP).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;
    const frameworkBlock = window.SB.helpers.frameworkBlock;

    /* ── Iconos REALES del showroom. La mayoría son Lucide (stroke, viewBox 0 0 24 24,
       un único peso). "Resultados" trae su SVG completo en `svg`: es el icono del DS
       "icon-resultados" (cds-statics/assets/img/icons/icon-resultados-*.svg) — también
       stroke (viewBox 0 0 100 100, marcador/tabla), con stroke="currentColor" para
       heredar el color de marca/estado del tapbar. El CSS colorea el trazo (primary →
       white en activo) y eleva el icono del activo. ── */
    const ITEMS = {
        leer: {
            label: "Leer", aria: "Ir a Portada", track: "tapbar-leer", title: "Lectura",
            icon: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />'
        },
        resultados: {
            label: "Resultados", aria: "Ir a Resultados", track: "tapbar-resultados", title: "Resultados",
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round" class="ft-mol-tapbar__icon" aria-labelledby="title-tapbar-icon-resultados"><title id="title-tapbar-icon-resultados">Resultados</title><path d="M79.1667 12.5H20.8333C16.231 12.5 12.5 16.231 12.5 20.8333V79.1667C12.5 83.769 16.231 87.5 20.8333 87.5H79.1667C83.769 87.5 87.5 83.769 87.5 79.1667V20.8333C87.5 16.231 83.769 12.5 79.1667 12.5Z"/><path d="M12.5 33.333H87.5"/><path d="M50 33.333V87.4997"/><path d="M31.25 70C35.3921 70 38.75 66.6421 38.75 62.5C38.75 58.3579 35.3921 55 31.25 55C27.1079 55 23.75 58.3579 23.75 62.5C23.75 66.6421 27.1079 70 31.25 70Z"/><path d="M67.9167 55V72.5"/><path d="M67.9167 55L65.4167 57.0833"/></svg>'
        },
        ver: {
            label: "Ver", aria: "Ir a Ver", track: "tapbar-ver", title: "Ojo",
            icon: '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" />'
        },
        oir: {
            label: "Oir", aria: "Ir a Escuchar", track: "tapbar-oir", title: "Auriculares",
            icon: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />'
        },
        cerca: {
            label: "Cerca", aria: "Ir a ubicación", track: "tapbar-ubicacion", title: "Ubicación",
            icon: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" />'
        },
        jugar: {
            label: "Jugar", aria: "Ir a Pasatiempos", track: "tapbar-pasatiempos", title: "Juegos",
            icon: '<path d="M15.1909 18.6515L18.6515 15.1909M10.173 10H13.192C13.2363 10 13.2789 10.017 13.311 10.0474L20.1991 16.5729C21.2472 17.5659 21.2696 19.2278 20.2487 20.2487C19.2278 21.2696 17.5659 21.2472 16.5729 20.1991L10.0474 13.311C10.017 13.2789 10 13.2363 10 13.192V10.173C10 10.0775 10.0775 10 10.173 10Z" stroke-width="2" /><path d="M3.41463 17H7V19H4C3.44772 19 3 18.5523 3 18V15.2558L3 4C3 3.44772 3.44772 3 4 3L16.6829 3L18 3C18.5523 3 19 3.44772 19 4V7H17V3.39535" stroke-width="2" /><path d="M18 8V3H18.5L19 4V8" stroke-width="2" /><path d="M6.5 9.5V10.5H4.5V9.5H6.5Z" stroke-width="3" /><path d="M10.5 6.5H9.5V4.5H10.5V6.5Z" stroke-width="3" /><path d="M7 18.5H4L3.5 17" stroke-width="3" />'
        }
    };

    /* Reparto por nº de ítems (rango 2-4). Ítem 1 = Leer (activo por defecto),
       ítem 2 = SIEMPRE Cerca, ítem 3 = Jugar; "Resultados" entra a partir del ítem 4. */
    const LAYOUT = {
        2: ["leer", "cerca"],
        3: ["leer", "cerca", "jugar"],
        4: ["leer", "cerca", "jugar", "resultados"]
    };

    /* ─── BASE — .ft-mol-tapbar ───
       Controles del playground agrupados por lógica: 1) ESTRUCTURA (count, active),
       2) AVISO/dot (alert…), 3) TOOLTIP (tooltip…). Dentro de cada grupo: activar →
       qué ítem → variantes → estado/contenido.
       El __skip-link no forma parte del markup canónico (ni old-showroom ni Markup), así
       que se retira. El estado --disabled se documenta en el overview, no en el playground. */
    const baseArgTypes = [
        // 1) Estructura
        { key: "count", control: "number", desc: "Número de ítems (2 a 4). Ítem 2 siempre Cerca; Resultados entra a partir del ítem 4. Reparto: 2 = Leer·Cerca · 3 = +Jugar · 4 = +Resultados.", min: 2, max: 4 },
        { key: "active", control: "number", desc: "Ítem activo (.ft-mol-tapbar__item--active, 1-based): icono blanco (algo más pequeño) elevado dentro de un círculo negro (var(--color-black); #000 en dark), texto en color-black y aria-current=\"page\".", min: 1, max: 4 },
        // 2) Aviso (dot)
        { key: "alert", control: "boolean", desc: "Muestra el dot de aviso de novedad .ft-mol-tapbar__alert sobre un ítem (span, aria-hidden). Se ancla a la esquina superior derecha del icono, con aro blanco que lo separa del fondo (se recalibra en el ítem activo)." },
        { key: "alertItem", control: "number", desc: "Ítem que lleva el dot de aviso (1-based). Solo si `alert` está activo; se acota al número de ítems visibles.", min: 1, max: 4 },
        { key: "alertPulse", control: "boolean", implies: ["alert"], desc: "Variante .ft-mol-tapbar__alert--pulse: el dot late (heartbeat) y emite aros concéntricos (animación infinita en todas las resoluciones, móvil incluido). El pulso es una VARIANTE del dot, así que activarlo IMPLICA el dot: al marcar `pulse` se marca también `alert` (y al desmarcar `alert` se desmarca `pulse`). Marcar solo `alert` = dot plano. El pulso se desactiva con prefers-reduced-motion." },
        // 3) Tooltip
        { key: "tooltip", control: "boolean", desc: "Monta el tooltip-aviso del showroom (.ft-tooltip--advice) sobre un ítem: envuelve el __item, que pasa a ser .ft-tooltip__trigger, con una burbuja .ft-tooltip__content (checkbox-hack CSS, sin JS). Patrón de template-noticia.html." },
        { key: "tooltipItem", control: "number", desc: "Ítem que lleva el tooltip-aviso (1-based). Se aplica solo si `tooltip` está activo; se acota al número de ítems visibles.", min: 1, max: 4 },
        { key: "tooltipSticky", control: "boolean", desc: "Variante sticky (.ft-tooltip--center.ft-tooltip--sticky): en vez de burbuja, una píldora compacta al lado del icono con un halo detrás (::after; dentro del tapbar se fuerza a blanco). El SCSS oculta __title/__close/__action y deja solo __txt." },
        { key: "tooltipPos", control: "select", options: [["auto", "Auto (según ítem)"], ["left", "Izquierda (--positionLeft)"], ["center", "Centrado"], ["right", "Derecha (--positionRight)"]], desc: "Posición horizontal del aviso. Gobierna los mismos modificadores en burbuja (advice) y píldora (sticky), pero el EFECTO difiere porque son dos mecanismos distintos. En la BURBUJA los tres modos son distintos: «Izquierda» = --positionLeft (anclada a la izquierda, abre a la DERECHA → no desborda por el borde izquierdo); «Centrado» = default (centrada sobre el ítem, left:50%); «Derecha» = --positionRight (anclada a la derecha, abre a la IZQUIERDA → no desborda por el borde derecho). En la PÍLDORA sticky solo hay dos estados: por defecto abre a la DERECHA del icono, así que «Centrado» y «Izquierda» dan lo mismo (--positionLeft se neutraliza en el tapbar → abre a la derecha) y solo «Derecha»/--positionRight la voltea (abre a la izquierda). «Auto» = según la posición del ítem: PRIMER ítem → --positionLeft, ÚLTIMO → --positionRight, intermedios → centrado. Ambos modificadores existen en el átomo (positionLeft es el espejo de positionRight)." },
        { key: "tooltipDark", control: "boolean", desc: "Modificador .ft-tooltip--dark: burbuja de fondo oscuro con texto claro (variante usada en el tapbar). Sin él, burbuja clara." },
        { key: "tooltipOpen", control: "boolean", desc: "Estado inicial de la burbuja: añade `checked` al .ft-tooltip__checkbox (visible al cargar). El botón .ft-tooltip__close (label) la cierra sin JS; sin `checked` arranca oculta." },
        { key: "tooltipTitle", control: "text", desc: "Titular de la burbuja (.ft-tooltip__title). Vacío o modo sticky = se omite el <h3>." },
        { key: "tooltipText", control: "text", desc: "Cuerpo de la burbuja / píldora (.ft-tooltip__txt). Vacío = se omite el <p>." },
        { key: "tooltipAction", control: "select", options: [["none", "Sin acción"], ["link", "Enlace (toda la burbuja)"], ["button", "Botón (.ft-btn)"]], desc: "Acción/CTA del aviso, dentro de .ft-tooltip__action. Son EXCLUYENTES (así lo documenta el átomo): «Enlace» monta un .ft-tooltip__actionLink — ancla absoluta que cubre el 100% del __content (z-index:10) → toda la burbuja navega (patrón de template-noticia.html); «Botón» monta un .ft-btn--xs visible (--secondary en claro, --primary en dark; el átomo le da margin-top:1.5rem) tipo «Quiero verlo». No se combinan: el actionLink taparía el botón. El SCSS oculta __action por completo en sticky, así que en ese modo no se pinta ninguno." },
        { key: "tooltipButtonText", control: "text", desc: "Texto del botón .ft-btn (solo con `tooltipAction: button`)." }
    ];
    const baseArgs = {
        count: "4", active: "1",
        alert: false, alertItem: "3", alertPulse: false,
        tooltip: false, tooltipItem: "2", tooltipSticky: false, tooltipPos: "auto", tooltipDark: true, tooltipOpen: true,
        tooltipTitle: "¿Te has perdido algo?", tooltipText: "Ponte al día en 2 minutos",
        tooltipAction: "link", tooltipButtonText: "Quiero verlo"
    };

    function icon(key) {
        const it = ITEMS[key];
        if (it.svg) return it.svg; // icono completo ya montado (Resultados, marcador Phosphor)
        return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ft-mol-tapbar__icon" aria-labelledby="title-tapbar-icon-' + key + '">' +
            '<title id="title-tapbar-icon-' + key + '">' + esc(it.title) + "</title>" + it.icon +
        "</svg>";
    }

    // Dot de aviso de novedad. alertMode: "" (sin dot) | "flat" | "pulse".
    function alertDot(alertMode) {
        if (!alertMode) return "";
        return '<span class="ft-mol-tapbar__alert' + (alertMode === "pulse" ? " ft-mol-tapbar__alert--pulse" : "") + '" aria-hidden="true"></span>';
    }

    // Ancla de ítem. extraCls / extraAttrs permiten convertirla en ft-tooltip__trigger;
    // alertMode añade el dot de aviso (__alert / __alert--pulse) dentro del __item.
    function item(key, i, active, extraCls, extraAttrs, alertMode) {
        const it = ITEMS[key];
        const isActive = i + 1 === active;
        const cls = "ft-mol-tapbar__item" + (isActive ? " ft-mol-tapbar__item--active" : "") + (extraCls ? " " + extraCls : "");
        return '<a href="#" class="' + cls + '" role="menuitem"' + (isActive ? ' aria-current="page"' : "") +
            ' aria-label="' + esc(it.aria) + '" data-tracking="' + it.track + '"' + (extraAttrs || "") + ' tabindex="' + (isActive ? "0" : "-1") + '">' +
            '<span class="ft-mol-tapbar__icon-wrapper" aria-hidden="true">' + icon(key) + "</span>" +
            '<span class="ft-mol-tapbar__text">' + esc(it.label) + "</span>" +
            alertDot(alertMode) +
        "</a>";
    }

    /* Tooltip-aviso (.ft-tooltip--advice) montado sobre un ítem, tal cual el showroom
       (template-noticia.html): checkbox-hack CSS (sin JS), el __item pasa a ser el
       __trigger y sale una burbuja __content por encima (--top, la barra vive abajo).
       Variante sticky (o.sticky): añade --center --sticky → píldora compacta al lado del
       icono con círculo de marca detrás; el SCSS oculta __title/__close/__action
       (template-noticia-formula1.html). */
    const TT_TOGGLE = "sb-tapbar-tooltip", TT_CONTENT = "sb-tapbar-tooltip-content";
    function tooltipItem(key, i, active, o, alertMode) {
        const trigger = item(key, i, active, "ft-tooltip__trigger", ' aria-describedby="' + TT_CONTENT + '"', alertMode);
        // --center: centra el texto del __content (behavior-parent en _tooltip.scss). Va en la
        // burbuja de aviso base; el sticky ya lo hereda (no hace falta repetirlo en su rama).
        const posMod = o.pos === "left" ? " ft-tooltip--positionLeft" : o.pos === "right" ? " ft-tooltip--positionRight" : "";
        const mods = " ft-tooltip--advice ft-tooltip--center" + (o.dark ? " ft-tooltip--dark" : "") + (o.sticky ? " ft-tooltip--sticky" : "") + posMod;
        return '<div class="ft-tooltip' + mods + '">' +
            '<div class="ft-tooltip--top">' +
                '<input type="checkbox" id="' + TT_TOGGLE + '" class="ft-tooltip__checkbox"' + (o.open ? " checked" : "") + ">" +
                trigger +
                '<div id="' + TT_CONTENT + '" class="ft-tooltip__content" role="tooltip">' +
                    '<label class="ft-tooltip__close" for="' + TT_TOGGLE + '" aria-label="Cerrar aviso" tabindex="0"><span class="ft-tooltip__closeText">Cerrar</span></label>' +
                    // En sticky el SCSS oculta __title: se omite del markup (fiel al template).
                    (o.title && !o.sticky ? '<h3 class="ft-tooltip__title">' + esc(o.title) + "</h3>" : "") +
                    (o.text ? '<p class="ft-tooltip__txt">' + esc(o.text) + "</p>" : "") +
                    tooltipAction(o) +
                "</div>" +
            "</div>" +
        "</div>";
    }

    /* __action del aviso: dos casuísticas reales del átomo (ver _tooltip.scss y
       __old-showroom/atoms/atom-tooltip.html), EXCLUYENTES entre sí:
       - "link":   .ft-tooltip__actionLink → ancla position:absolute que cubre el 100%
                   del __content (z-index:10) → toda la burbuja enlazable. <a> vacío.
       - "button": un .ft-btn--xs visible (--secondary en claro, --primary en dark; el
                   átomo le da margin-top) tipo CTA «Quiero verlo».
       No se combinan: el actionLink taparía el botón. Además el SCSS oculta __action por
       completo en sticky → en ese modo no se pinta ninguno. */
    function tooltipAction(o) {
        if (o.sticky || o.action === "none") return "";
        let inner = "";
        if (o.action === "link") {
            inner = '<a href="#" class="ft-tooltip__actionLink" title="title text" target="_self"></a>';
        } else if (o.action === "button") {
            const variant = o.dark ? "ft-btn--primary" : "ft-btn--secondary";
            inner = '<a href="#" class="ft-btn ft-btn--xs ' + variant + '" title="title text" target="_self">' + esc(o.buttonText) + "</a>";
        }
        if (!inner) return "";
        return '<div class="ft-tooltip__action">' + inner + "</div>";
    }

    function live(a) {
        const n = Math.max(2, Math.min(4, parseInt(a.count, 10) || 4));
        const active = Math.max(1, Math.min(n, parseInt(a.active, 10) || 1));
        const keys = LAYOUT[n];
        // Ítem que porta el tooltip-aviso (solo si el control tooltip está activo).
        const ttItem = a.tooltip ? Math.max(1, Math.min(n, parseInt(a.tooltipItem, 10) || 2)) : 0;
        // Posición horizontal del aviso (control tooltipPos). El átomo tiene --positionLeft
        // (espejo) y --positionRight: "center" = default centrado; "left"/"right" fuerzan el
        // modificador. "auto" = según la posición del ítem en la barra: PRIMER ítem →
        // positionLeft (abre a la derecha), ÚLTIMO ítem → positionRight (abre a la izquierda),
        // intermedios → centrado. El modificador se pinta igual en advice y sticky, pero el
        // EFECTO difiere: en la BURBUJA los tres modos son distintos; en la PÍLDORA sticky
        // solo positionRight tiene efecto (voltea a la izquierda) — positionLeft se neutraliza
        // en _tapbar.scss (= default, abre a la derecha), así el 1er ítem = resto.
        const ttPos = a.tooltipPos || "auto";
        let ttPosMod = ""; // "" (centrado) | "left" | "right"
        if (ttPos === "left" || ttPos === "right") ttPosMod = ttPos;
        else if (ttPos === "auto") ttPosMod = (ttItem === 1) ? "left" : (ttItem === n) ? "right" : "";
        const ttOpts = { open: !!a.tooltipOpen, dark: !!a.tooltipDark, sticky: !!a.tooltipSticky, pos: ttPosMod, title: a.tooltipTitle, text: a.tooltipText, action: a.tooltipAction || "none", buttonText: a.tooltipButtonText || "Quiero verlo" };
        // Ítem que lleva el dot de aviso. El pulso es una VARIANTE del dot, así que
        // `alertPulse` implica dot: basta con marcar cualquiera de los dos para que aparezca
        // (alert = dot plano · alertPulse = dot + pulso, aunque `alert` esté sin marcar).
        const alertOn = a.alert || a.alertPulse;
        const alertItem = alertOn ? Math.max(1, Math.min(n, parseInt(a.alertItem, 10) || 1)) : 0;
        const alertMode = a.alertPulse ? "pulse" : "flat";
        let items = "";
        keys.forEach((k, i) => {
            const am = (i + 1 === alertItem) ? alertMode : "";
            items += (i + 1 === ttItem) ? tooltipItem(k, i, active, ttOpts, am) : item(k, i, active, "", "", am);
        });
        return '<nav class="ft-mol-tapbar" role="navigation" aria-label="Menú de navegación principal" aria-orientation="horizontal" aria-controls="mainContent" aria-expanded="true" aria-live="polite" aria-relevant="additions removals" tabindex="0" data-component="tapbar" data-version="1.1" data-tracking="main-navigation" data-seo="main-navigation" data-category="navigation" data-section="main-menu" itemscope itemtype="https://schema.org/SiteNavigationElement">' +
            '<div class="ft-mol-tapbar__container" role="menubar" aria-label="Menú de navegación principal" aria-orientation="horizontal">' +
                items +
            "</div>" +
        "</nav>";
    }

    const framework = frameworkBlock({
        intro: `En apps Vue o React la tapbar suele quedar mejor como componente controlado por router/estado. El JS del DS (fourty-js-tapbar.js) solo aporta valor extra si necesitas la interaccion real (activacion por scroll/tap, teclado).`,
        rows: [
            ["Item activo", `Deriva <code>__item--active</code> y <code>aria-current</code> desde la ruta o el estado de navegacion.`, `Deriva <code>__item--active</code> y <code>aria-current</code> desde la ruta o el estado de navegacion.`],
            ["JS opcional", `Monta <code>fourty-js-tapbar.js</code> en <code>onMounted()</code> solo si necesitas su interaccion (activacion, teclado).`, `Monta <code>fourty-js-tapbar.js</code> en <code>useEffect()</code> solo si necesitas su interaccion (activacion, teclado).`],
            ["Reserva de espacio", `El tapbar es <code>position:fixed</code>: anade <code>padding-bottom</code> al layout para que no tape el contenido inferior.`, `El tapbar es <code>position:fixed</code>: anade <code>padding-bottom</code> al layout para que no tape el contenido inferior.`]
        ],
        note: `El fondo de la barra lo pinta el propio <code>&lt;nav&gt;</code> (degradado + <em>glass</em> con <code>backdrop-filter</code> a partir de 768px); los <code>::before/::after</code> del <code>__container</code> solo sangran ese fondo a todo el ancho.`
    });

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Tapbar</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-tapbar</code>): barra de navegación inferior fija para móvil. Cada ítem tiene un <strong>icono Lucide</strong> (SVG <em>stroke</em>, un único peso) más texto; el CSS colorea el trazo y, en el ítem activo, lo eleva y lo rodea con un <strong>círculo negro</strong> (con el icono en blanco).</p>

        <div class="cb-callout"><strong>Posicional.</strong> Es <code>position:fixed</code> al borde inferior (<code>z-index 2500</code>), con <code>box-shadow</code> y <code>border-top</code>. Al ser fija, el layout consumidor debe reservar espacio inferior (<code>padding-bottom</code>). El <code>__container</code> se limita a <code>max-width:60rem</code> y sangra el fondo a todo el ancho con <code>::before/::after</code> (<code>100vw</code>). Aquí se ve el estado <strong>estático</strong> (la elevación del icono activo sí es CSS).</div>

        <div class="cb-callout"><strong>Fondo de la barra.</strong> Lo pinta el propio <code>&lt;nav&gt;</code>: un degradado vertical blanco→gris en todas las resoluciones y, a partir de <code>768px</code>, un efecto <em>glass</em> (<code>backdrop-filter:blur</code>) para entrever el contenido de detrás. Los pseudo-elementos <code>::before/::after</code> del <code>__container</code> solo sangran ese fondo a todo el ancho (<code>100vw</code>).</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/tapbar.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td>Iconos Lucide (SVG inline <em>stroke</em>)</td><td>Grafismo de cada ítem</td><td>Siempre (un <code>.ft-mol-tapbar__icon</code> por ítem)</td></tr>
                <tr><td><code>cds-statics/js/tapbar/fourty-js-tapbar.js</code></td><td>JavaScript</td><td>Interacción real: activación (<code>--active</code>), teclado (Arrow/Home/End/Enter/Space), API <code>setAlert/setBadge/setSubbar</code> y publicación de <code>--ft-tapbar-height</code></td></tr>
                <tr><td><code>brands/[marca]/atoms/tooltip.css</code></td><td>CSS · átomo <code>ft-tooltip</code></td><td>Solo si se monta el tooltip-aviso sobre un ítem (control <code>tooltip</code>). Ya viene en <code>[marca]-core.css</code>.</td></tr>
            </tbody>
        </table>
        </div>
        ${framework}

        <h2>Controles de la story Base</h2>
        <p>Agrupados por lógica: <strong>estructura</strong> → <strong>aviso (dot)</strong> → <strong>tooltip</strong> (dentro de cada grupo: activar → qué ítem → variantes → estado/contenido). El <code>__skip-link</code> no es markup canónico → no se incluye; el estado <code>--disabled</code> se documenta abajo, no en el playground.</p>
        <table class="cb-table cb-table--dense">
            <thead><tr><th>Control</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td colspan="2"><strong>Estructura</strong></td></tr>
                <tr><td><code>count</code></td><td>nº de ítems (2-4); ítem 2 = Cerca siempre, Resultados desde el ítem 4</td></tr>
                <tr><td><code>active</code></td><td>ítem activo (<code>__item--active</code>): icono blanco en círculo negro</td></tr>
                <tr><td colspan="2"><strong>Aviso (dot)</strong></td></tr>
                <tr><td><code>alert</code> · <code>alertItem</code></td><td>dot de novedad <code>__alert</code> sobre un ítem; 1-based, acotado a <code>count</code></td></tr>
                <tr><td><code>alertPulse</code></td><td>variante <code>__alert--pulse</code> (dot que late + aros, en todas las resoluciones). Es una variante del dot: <strong>vinculado</strong> a <code>alert</code> vía <code>implies</code> — marcar <code>pulse</code> marca también <code>alert</code>, y desmarcar <code>alert</code> desmarca <code>pulse</code>; marcar solo <code>alert</code> = dot plano</td></tr>
                <tr><td colspan="2"><strong>Tooltip</strong></td></tr>
                <tr><td><code>tooltip</code></td><td>monta el tooltip-aviso <code>.ft-tooltip--advice</code> sobre un ítem (ver sección abajo)</td></tr>
                <tr><td><code>tooltipItem</code></td><td>ítem que porta el aviso (1-based; se acota a <code>count</code>)</td></tr>
                <tr><td><code>tooltipSticky</code></td><td>variante píldora <code>--center --sticky</code> (halo detrás, solo <code>__txt</code>)</td></tr>
                <tr><td><code>tooltipPos</code></td><td>posición horizontal (<code>auto</code>/<code>left</code>/<code>center</code>/<code>right</code>): <code>--positionLeft</code>/<code>--positionRight</code>. <code>auto</code> = 1er ítem→izquierda, último→derecha, intermedios→centrado. En la <strong>burbuja</strong> los tres modos difieren; en la <strong>píldora sticky</strong> solo cuenta <code>--positionRight</code> (voltea a la izquierda) — <code>left</code>/<code>center</code> abren a la derecha (ver callout)</td></tr>
                <tr><td><code>tooltipDark</code> · <code>tooltipOpen</code></td><td>modificador <code>--dark</code> y estado inicial (<code>checked</code>) de la burbuja</td></tr>
                <tr><td><code>tooltipTitle</code> · <code>tooltipText</code></td><td>textos <code>__title</code> / <code>__txt</code> (vacío o sticky = se omite la pieza)</td></tr>
                <tr><td><code>tooltipAction</code></td><td>acción del aviso (<code>__action</code>), <strong>excluyente</strong>: <code>none</code> · <code>link</code> (toda la burbuja enlazable, <code>a.ft-tooltip__actionLink</code>) · <code>button</code> (botón <code>a.ft-btn--xs</code>). Oculto en sticky</td></tr>
                <tr><td><code>tooltipButtonText</code></td><td>texto del botón (solo con <code>tooltipAction: button</code>)</td></tr>
            </tbody>
        </table>

        <h2>Modificadores y estados</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>__item--active</code></td><td>ítem actual: <strong>icono blanco</strong> (algo más pequeño) <strong>elevado</strong> dentro de un <strong>círculo negro</strong> (<code>__icon-wrapper::after</code> = <code>var(--color-black)</code>, entra con <code>tapbar-circle-in</code>) + texto en <code>color-black</code> + <code>aria-current="page"</code></td></tr>
                <tr><td><code>__item--disabled</code></td><td>ítem deshabilitado (<code>opacity:0.5</code>, sin eventos de puntero)</td></tr>
                <tr><td><code>__alert</code></td><td>dot de aviso de novedad sobre un ítem (esquina superior derecha del icono, aro blanco). <code>&lt;span aria-hidden&gt;</code>; controles <code>alert</code>/<code>alertItem</code></td></tr>
                <tr><td><code>__alert--pulse</code></td><td>el dot <strong>late</strong> (heartbeat) y emite <strong>dos aros</strong> concéntricos desfasados medio ciclo (<code>tapbar-alert-beat</code> + <code>tapbar-alert-pulse</code>, infinitos, <strong>en todas las resoluciones</strong>); se detienen con <code>prefers-reduced-motion</code>. Control <code>alertPulse</code></td></tr>
            </tbody>
        </table>

        <div class="cb-callout"><strong>API JS: <code>__alert</code> ya tiene estilos; <code>__badge</code>/<code>__subbar</code> aún no.</strong> El gestor <code>fourty-js-tapbar.js</code> expone <code>setAlert()</code>, <code>setBadge()</code> y <code>setSubbar()</code> — crean <code>__alert</code> (<code>--pulse</code>), <code>__badge</code> y <code>__subbar</code> — y publica <code>--ft-tapbar-height</code> en <code>&lt;html&gt;</code>. El <code>_tapbar.scss</code> <strong>ya estiliza <code>__alert</code></strong> (dot plano + variante <code>--pulse</code>), por eso se expone como control. <code>__badge</code> y <code>__subbar</code> siguen <strong>sin estilos</strong> en el modelo actual → no se exponen (serían elementos sin CSS, pendientes). Estados con CSS: <code>--active</code>, <code>--disabled</code> y el dot <code>__alert</code>.</div>

        <h2>Tooltip-aviso sobre un ítem</h2>
        <p>Para destacar una novedad, un ítem del tapbar puede llevar el <strong>tooltip-aviso</strong> del átomo <code>ft-tooltip</code> (variante <code>.ft-tooltip--advice</code>) — una burbuja <em>dismissable</em> que funciona con un <strong>checkbox-hack de puro CSS</strong> (sin JS). Es el patrón real de <code>fourty/templates/template-noticia.html</code>. Actívalo con el control <code>tooltip</code>. A diferencia de <code>__badge</code>/<code>__subbar</code>, el CSS del tooltip <strong>sí existe y carga</strong> en el canvas, así que la burbuja se ve estilada.</p>
        <p>El ítem elegido (<code>tooltipItem</code>) se envuelve y pasa a ser el <code>.ft-tooltip__trigger</code>; encima aparece el <code>.ft-tooltip__content</code>. Estructura:</p>
        <pre class="cb-code"><code>.ft-tooltip.ft-tooltip--advice.ft-tooltip--center[.ft-tooltip--dark][.ft-tooltip--sticky]
  └ .ft-tooltip--top                          &larr; posición (arriba: la barra vive abajo)
      ├ input.ft-tooltip__checkbox[checked]   &larr; visibilidad inicial (tooltipOpen)
      ├ a.ft-mol-tapbar__item.ft-tooltip__trigger   &larr; el ítem ES el disparador
      └ .ft-tooltip__content[role=tooltip]
          ├ label.ft-tooltip__close (for=checkbox)  &larr; cierra sin JS
          ├ h3.ft-tooltip__title  (tooltipTitle)
          ├ p.ft-tooltip__txt     (tooltipText)
          └ .ft-tooltip__action                     &larr; tooltipAction ≠ none (oculto en sticky) · EXCLUYENTE
              · a.ft-tooltip__actionLink               &larr; "link": ancla que cubre el 100% del __content
              · a.ft-btn.ft-btn--xs                    &larr; "button": botón CTA visible (--secondary/--primary)</code></pre>
        <table class="cb-table cb-table--dense">
            <thead><tr><th>Casuística</th><th>Clase / control</th></tr></thead>
            <tbody>
                <tr><td>Burbuja de aviso (base)</td><td><code>.ft-tooltip--advice</code> · control <code>tooltip</code></td></tr>
                <tr><td>Texto centrado</td><td><code>.ft-tooltip--center</code> — centra el <code>__content</code> (siempre en el aviso del tapbar)</td></tr>
                <tr><td>Fondo oscuro / claro</td><td><code>.ft-tooltip--dark</code> · control <code>tooltipDark</code></td></tr>
                <tr><td>Píldora sticky</td><td><code>.ft-tooltip--sticky</code> · control <code>tooltipSticky</code> (hereda <code>--center</code>)</td></tr>
                <tr><td>Posición horizontal</td><td><code>.ft-tooltip--positionLeft</code> / <code>.ft-tooltip--positionRight</code> · control <code>tooltipPos</code> (<code>auto</code>/<code>left</code>/<code>center</code>/<code>right</code>). <code>positionLeft</code> es el espejo de <code>positionRight</code>; default = centrado. En la <strong>burbuja</strong> los tres difieren; en la <strong>píldora sticky</strong> solo <code>positionRight</code> tiene efecto (voltea a la izquierda), <code>left</code>/<code>center</code> abren a la derecha (ver callout sticky). En <code>auto</code>: 1er ítem→izquierda, último→derecha, intermedios→centrado</td></tr>
                <tr><td>Visible al cargar / oculta</td><td><code>__checkbox[checked]</code> · control <code>tooltipOpen</code> (el <code>__close</code> la cierra)</td></tr>
                <tr><td>Ítem que lo porta</td><td>control <code>tooltipItem</code> (el <code>__item</code> gana <code>.ft-tooltip__trigger</code> + <code>aria-describedby</code>)</td></tr>
                <tr><td>Acción / CTA (excluyente)</td><td><code>.ft-tooltip__action</code> · control <code>tooltipAction</code> (<code>none</code>/<code>link</code>/<code>button</code>). Ver callout abajo</td></tr>
                <tr><td>Posición</td><td>fija a <code>.ft-tooltip--top</code>: al ser <code>position:fixed</code> abajo, el aviso solo cabe hacia arriba</td></tr>
            </tbody>
        </table>
        <div class="cb-callout"><strong>Acción del aviso (<code>__action</code>) — <code>link</code> y <code>button</code> son EXCLUYENTES.</strong> El átomo <code>ft-tooltip</code> resuelve el CTA de la burbuja de dos formas que <strong>no se combinan</strong> (así lo documenta <code>__old-showroom/atoms/atom-tooltip.html</code>, con casuísticas separadas «Advice con enlace» y «Advice con botón»): <strong>(a) Enlace de superficie completa</strong> — <code>.ft-tooltip__actionLink</code> es un <code>&lt;a&gt;</code> vacío en <code>position:absolute</code> que cubre <strong>todo</strong> el <code>__content</code> (<code>width/height:100%</code>, <code>z-index:10</code>), así que <strong>toda la burbuja navega</strong> (patrón de <code>template-noticia.html</code>); <strong>(b) Botón visible</strong> — un <code>.ft-btn--xs</code> (<code>--secondary</code> en claro, <code>--primary</code> en dark) al que el <code>_tooltip.scss</code> añade <code>margin-top:1.5rem</code>. <strong>No son compatibles</strong>: si hubiera botón <em>y</em> actionLink, el actionLink (<code>z-index:10</code>) quedaría por encima y taparía el clic del botón (solo el <code>__close</code>, con <code>z-index</code> altísimo, seguiría activo). Por eso el control es un <code>select</code>, no dos toggles. En la <strong>píldora sticky</strong> el SCSS <strong>oculta <code>__action</code></strong> por completo (<code>display:none</code>) → no se pinta ninguno.</div>
        <div class="cb-callout"><strong>Variante sticky.</strong> Con <code>tooltipSticky</code> el aviso deja de ser una burbuja y se vuelve una <strong>píldora compacta</strong> a un lado del icono, con un <strong>círculo de marca</strong> detrás del <code>__trigger</code> (<code>.ft-tooltip--sticky::after</code>, 6rem). El SCSS oculta <code>__title</code>, <code>__close</code> y <code>__action</code>: solo se ve <code>__txt</code>. Es el patrón de <code>template-noticia-formula1.html</code> (aviso «Elige tu zona» sobre el ítem Cerca). La píldora <strong>siempre abre hacia la derecha del icono</strong> salvo en el <strong>último ítem</strong>, donde <code>.ft-tooltip--positionRight</code> la voltea (abre a la izquierda, flecha a la derecha, para no desbordar por el borde derecho). En sticky solo hay <strong>dos estados</strong> (derecha por defecto · izquierda con <code>positionRight</code>) y el <strong>primer ítem se comporta igual que el resto</strong>. ⚠ <strong>Ojo con <code>positionLeft</code> en sticky</strong>: en <code>auto</code> el primer ítem lleva <code>--positionLeft</code> —que sirve para la <em>burbuja advice</em>—, pero sobre la píldora esa regla advice (especificidad (0,3,0)) se colaría sobre el sticky (base (0,2,0)) y lo desposicionaría; por eso el <code>_tapbar.scss</code> la <strong>neutraliza</strong> ((0,4,0)) → <code>--positionLeft</code> + sticky = default sticky (abre a la derecha). Por tanto el mecanismo de posición <strong>NO es el mismo</strong> en burbuja y píldora: en la burbuja los tres modos difieren; en la píldora solo <code>positionRight</code> tiene efecto. El átomo tiene <strong>ambos modificadores</strong> (<code>--positionLeft</code> es el <strong>espejo</strong> de <code>--positionRight</code>, para la burbuja advice). Con <strong>3 y 4 ítems</strong> el <code>_tapbar.scss</code> <strong>ciñe la píldora</strong> (menos ancho y tipografía más compacta, más apretado en móvil y afinado en desktop) para que no tape los ítems vecinos; el apriete es mayor con 4 ítems (más estrechos) y más suave con 3. Se detecta con <code>:has()</code> sobre el markup real (sin variantes nuevas), no con un control. ⚠ Aunque el átomo pinta ese halo (<code>.ft-tooltip--sticky::after</code>, 6rem) con el color de marca, <strong>dentro del tapbar</strong> <code>_tapbar.scss</code> lo <strong>fuerza a <code>var(--color-white)</code></strong> (especificidad <code>(0,2,1)</code> &gt; la del átomo) para que no compita con el círculo del ítem activo: por eso sobre el fondo claro apenas se percibe (y en dark queda en la superficie oscura).</div>
        <div class="cb-callout"><strong>Hover-tooltip simple.</strong> El átomo <code>ft-tooltip</code> tiene además un mecanismo aparte, <code>[data-tooltip]</code> + <code>--top/--bottom/--left/--right</code> (aparece al <em>hover</em>, sin checkbox), usado en cabeceras de artículo (p.ej. «OPINIÓN»). <strong>No</strong> es el que se monta en el tapbar: para la barra se usa siempre <code>--advice</code>.</div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-tapbar</code> (<code>&lt;nav&gt;</code>)</td></tr>
                <tr><td>Contenedor</td><td><code>.ft-mol-tapbar__container</code> (<code>role="menubar"</code>) — <code>display:flex</code> · <code>justify-content:space-around</code> · <code>max-width:60rem</code>; sangra el fondo a todo el ancho con <code>::before/::after</code></td></tr>
                <tr><td>Ítem</td><td><code>.ft-mol-tapbar__item</code> (<code>&lt;a&gt;</code> con <code>role="menuitem"</code>)</td></tr>
                <tr><td>Icono</td><td><code>__icon-wrapper</code> &gt; <code>__icon</code> (SVG Lucide <em>stroke</em>, <code>2.4rem</code>)</td></tr>
                <tr><td>Texto</td><td><code>.ft-mol-tapbar__text</code></td></tr>
                <tr><td>Skip link</td><td><code>.ft-mol-tapbar__skip-link</code> — salto accesible que se revela al recibir foco</td></tr>
            </tbody>
        </table>

        <h2>Variantes de reparto</h2>
        <p>La story <strong>Base</strong> genera la barra con <strong>2 a 4 ítems</strong> (control <code>count</code>). El ítem 1 es <strong>Leer</strong>, el ítem 2 es <strong>siempre Cerca</strong> y <strong>Resultados</strong> aparece a partir del ítem 4:</p>
        <table class="cb-table cb-table--dense">
            <thead><tr><th>Ítems</th><th>Secuencia</th></tr></thead>
            <tbody>
                <tr><td>2</td><td>Leer · Cerca</td></tr>
                <tr><td>3</td><td>Leer · Cerca · Jugar</td></tr>
                <tr><td>4</td><td>Leer · Cerca · Jugar · Resultados</td></tr>
            </tbody>
        </table>
        <p><strong>Resultados</strong> usa el icono del DS <code>icon-resultados</code> (<code>cds-statics/assets/img/icons/icon-resultados-*.svg</code>) inlineado como SVG <em>stroke</em> con <code>stroke="currentColor"</code>, de modo que hereda el color de marca/estado del tapbar igual que los iconos Lucide.</p>
        <p>El subgrupo <strong>Markup</strong> conserva además las variantes históricas del showroom (3/4/5 ítems: Leer·Cerca·Jugar, +Ver, +Oir) y la versión <strong>AMP</strong> (ítems <code>&lt;button on="tap:…"&gt;</code> / <code>&lt;a role="link"&gt;</code>, sin JS).</p>

        <h2>Accesibilidad y preferencias del sistema</h2>
        <table class="cb-table">
            <thead><tr><th>Mecanismo</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>@media (prefers-reduced-motion: reduce)</code></td><td>desactiva todas las transiciones y animaciones del tapbar (incluida la elevación <code>bounceIn</code> del activo)</td></tr>
                <tr><td><code>@media (forced-colors: active)</code></td><td>modo alto contraste: borde <code>CanvasText</code> en la barra y en cada ítem; borde reforzado en el ítem activo</td></tr>
                <tr><td><code>:focus-visible</code></td><td>anillo de foco (<code>outline</code> de marca + fondo tenue) solo en navegación por teclado</td></tr>
                <tr><td>Teclado · <em>roving tabindex</em> (requiere JS)</td><td>Arrow/Home/End mueven el foco entre ítems; Enter/Space activan. El JS mantiene <strong>un único tab stop</strong> (el ítem activo o, si el markup no marca ninguno, el primero) para que el componente sea alcanzable por <kbd>Tab</kbd></td></tr>
                <tr><td>Novedades anunciadas (requiere JS)</td><td>el dot (<code>__alert</code>) y el badge (<code>__badge</code>) son visuales (<code>aria-hidden</code>); <code>setAlert()</code>/<code>setBadge()</code> trasladan su significado al <code>aria-label</code> del ítem (p. ej. <em>«Ir a Portada (novedad, 5 sin leer)»</em>)</td></tr>
            </tbody>
        </table>

        <h2>Modo claro / oscuro y marcas</h2>
        <p>En <strong>modo claro</strong> el tapbar es <strong>uniforme en todas las marcas</strong>: <code>_tapbar.scss</code> <strong>no</strong> tiene condicionales <code>@if $brand</code>. Fondo blanco/glass, iconos e ítem activo en <code>--color-black</code>, icono del activo en <strong>blanco</strong> dentro de un <strong>círculo negro</strong> (<code>--color-black</code>), y el <strong>dot de aviso</strong> (<code>__alert</code>) en <code>--color-primary</code> — el único acento de marca del componente (junto al anillo de <code>:focus-visible</code> y el <code>__skip-link</code>).</p>
        <p>En <strong>modo oscuro</strong> (<code>[data-theme="dark"]</code> en <code>&lt;html&gt;</code>; reglas reales en <code>scss/base/_dark.scss</code>, compiladas en <code>*-core.css</code>) la barra vira a superficie oscura, los iconos van en <strong>blanco</strong> (<code>filter-to-white</code>), el texto en claro y el <strong>círculo del activo en negro puro</strong> (<code>#000</code>, igual en todas las marcas) — más oscuro que la barra para que el ítem señalado se distinga, con el icono blanco encima. Alterna el tema con el toggle <strong>Oscuro</strong> de la toolbar; cambia la marca con <strong>Brand</strong>.</p>

        <h2>Cambios · 2026-07-09</h2>
        <p>Modificaciones de <strong>HTML/markup</strong> y <strong>JS runtime</strong> respecto a la versión anterior. (Los cambios visuales de SCSS —pulso en móvil, ceñido del sticky con 3/4 ítems y círculo del activo en negro en dark— se detallan en sus apartados y en <code>scss/base/_dark.scss</code>.)</p>
        <table class="cb-table cb-table--dense">
            <thead><tr><th>Ámbito</th><th>Cambio</th></tr></thead>
            <tbody>
                <tr><td><strong>HTML</strong></td><td>Eliminado el <code>&lt;canvas class="ft-mol-tapbar__canvas"&gt;</code> del markup (estático y generado): el fondo lo pinta el <code>&lt;nav&gt;</code> y el canvas era decorativo (ya iba en <code>display:none</code>). Se limpiaron sus referencias en la doc.</td></tr>
                <tr><td><strong>HTML</strong></td><td>El tooltip-aviso <strong>base</strong> ahora lleva <code>.ft-tooltip--center</code> (centra el texto del <code>__content</code>); antes solo lo tenía la variante sticky.</td></tr>
                <tr><td><strong>HTML</strong></td><td>Sticky en el <strong>último ítem</strong>: se añade automáticamente <code>.ft-tooltip--positionRight</code> (píldora hacia la izquierda, flecha apuntando a la derecha) para que no se salga por el borde.</td></tr>
                <tr><td><strong>HTML</strong></td><td>Nuevo control <code>tooltipPos</code> (<code>auto</code>/<code>left</code>/<code>center</code>/<code>right</code>): gobierna <code>.ft-tooltip--positionLeft</code>/<code>--positionRight</code> según la posición del ítem y lo aplica <strong>también a la burbuja advice</strong> (antes solo al sticky del último ítem).</td></tr>
                <tr><td><strong>SCSS</strong></td><td>Nuevo modificador de átomo <code>.ft-tooltip--positionLeft</code> (espejo de <code>--positionRight</code>) en <code>_tooltip.scss</code>, para alinear la <strong>burbuja advice</strong> del <strong>primer ítem</strong> (abre a la derecha). En el tapbar la asignación <code>auto</code> es: <strong>1er ítem → positionLeft</strong>, <strong>último → positionRight</strong>, intermedios → centrado. El override de pico anclado del <code>_tapbar.scss</code> (centro del ítem, invariante) se extiende a <code>:is(positionLeft, positionRight)</code> → el pico queda clavado en ambos extremos. En la <strong>píldora sticky</strong>, en cambio, <code>positionLeft</code> NO desplaza: el <code>_tapbar.scss</code> lo <strong>neutraliza</strong> a default (abre a la derecha) para que el 1er ítem sticky sea igual que el resto; solo <code>positionRight</code> voltea la píldora.</td></tr>
                <tr><td><strong>HTML</strong></td><td>El <code>.ft-tooltip__action</code> pasa a ser <strong>opcional y controlable</strong> con el nuevo <code>select</code> <code>tooltipAction</code> (<code>none</code>/<code>link</code>/<code>button</code>) — antes el <code>actionLink</code> se pintaba siempre y fijo. <code>link</code> = toda la burbuja enlazable (<code>.ft-tooltip__actionLink</code>); <code>button</code> = botón CTA <code>.ft-btn--xs</code> (<code>--secondary</code>/<code>--primary</code> según <code>--dark</code>), texto en <code>tooltipButtonText</code>. Son <strong>excluyentes</strong> (el actionLink taparía el botón) y ambos se ocultan en sticky (el SCSS quita <code>__action</code>).</td></tr>
                <tr><td><strong>Motor</strong></td><td>Nuevo campo opcional <code>implies</code> en los argTypes booleanos (genérico del motor, <code>storybook.js</code>): al marcar un control vinculado se marcan sus dependencias y al desmarcar la base se desmarca la variante. Aquí <code>alertPulse</code> declara <code>implies:["alert"]</code> → los dos toggles quedan sincronizados en el panel (antes el dot pulsaba pero el toggle de <code>alert</code> seguía en <code>false</code>).</td></tr>
                <tr><td><strong>JS</strong></td><td><code>setupAria()</code>: si el markup no marca ningún ítem <code>--active</code>, el primero recibe <code>tabindex="0"</code> → el componente es siempre alcanzable por teclado (antes podía quedar sin tab stop; WCAG 2.1.1).</td></tr>
                <tr><td><strong>JS</strong></td><td><code>setAlert()</code> / <code>setBadge()</code>: componen el <code>aria-label</code> del ítem con las novedades (el dot/badge visuales siguen <code>aria-hidden</code>) para que el lector de pantalla las anuncie (WCAG 1.1.1 / 4.1.2). Nuevos helpers <code>_cacheItemLabel</code> / <code>_refreshItemLabel</code>.</td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente (SSOT): <code>scss/fourties/molecules/tapbar/_tapbar.scss</code> · markup del subgrupo: <code>fourty/storybook/js/molecules/tapbar/tapbar.html</code></p>
    </div>`;

    const TP = {
        id: "tapbar",
        name: "Tapbar",
        group: "Molecules",
        signals: ["js"],
        overview,
        stories: [
            // full: la barra se ancla a todo el ancho inferior del lienzo.
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(TP);

    /* Markup original (HTML plano editable por el front) en tapbar.html → subgrupo "Markup". */
    window.SB.loadMarkup(TP, document.currentScript && document.currentScript.src, { full: true });
})();
