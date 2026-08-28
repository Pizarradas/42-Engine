/* ════════════════════════════════════════════════════════════════════════
   setup/root/root.js — Setup / Root
   Inspector del bloque `:root` de la marca activa: los CUSTOM PROPERTIES
   (design tokens) que declara `brands/<marca>/setting.css` y sobre los que se
   apoya todo el DS (`var(--color-primary)`, `var(--font-primary)`…).

   ── SSOT ──────────────────────────────────────────────────────────────────
   NO hay lista hardcodeada. Los tokens se leen EN VIVO del CSSOM del iframe
   (`frameDoc.styleSheets` → reglas con selector `:root`) y su valor final se
   resuelve con `getComputedStyle(documentElement)`. Es la única forma honesta:
   cada marca declara un set distinto —ux 113, ep 118, epe 117, sport 148,
   regionales 260— y `revistas` ni siquiera usa `setting.css`, sino
   `setting-<submarca>.css` (cuore · stilo · viajar · woman). Cualquier lista
   fija mentiría en cuanto se cambiase de marca.

   ── Carrera con la carga del CSS (importante) ─────────────────────────────
   `mountFrame()` hace `doc.write()` y llama a `renderCanvas()` de forma
   SÍNCRONA (core/storybook.js). Cuando corre este `onMount`, los `<link>` del
   setting.css de la marca RECIÉN seleccionada aún no han cargado: leer el CSSOM
   ahí devolvería 0 tokens (o los de la marca anterior). Por eso esperamos a que
   toda hoja tenga `.sheet` (rAF con techo) antes de pintar.

   ── Dark ─────────────────────────────────────────────────────────────────
   El modo oscuro del DS **NO redefine tokens** (verificado: `scss/base/_dark.scss`
   no declara ni un custom property; sobreescribe propiedades bajo
   `[data-theme="dark"]`). Esta tabla es IDÉNTICA en claro y en oscuro: es
   correcto, no un bug.

   ── UI ───────────────────────────────────────────────────────────────────
   El BUSCADOR vive DENTRO del canvas, no en Controls: filtra el DOM ya pintado
   sin pasar por el motor, así no se pierde el foco ni se re-renderiza en cada
   tecla. Su valor persiste en `uiQuery` para sobrevivir a un cambio de Controls
   (que sí re-renderiza).

   Estructura:
     · Base (interactive)  → buscador + filtro por familia + vista tabla/swatches
     · Galleries (collapsed)
         · Paleta de color   → todos los --color-* como swatches
         · Tipografía        → todos los --font-* renderizados con su propia fuente
         · Tabla completa    → todos los tokens: declarado vs computado
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* Query del buscador in-canvas. Vive fuera del render para sobrevivir a los
       re-renders que dispara el motor al tocar un control. */
    let uiQuery = "";

    /* ═══ Lectura del :root — SSOT en vivo ═══════════════════════════════ */

    /* Solo reglas cuyo selector sea EXACTAMENTE `:root` (una de sus partes
       separadas por coma). Excluye variantes tipo `:root[data-theme="dark"]`,
       que no son la declaración base. */
    function isRootSelector(selectorText) {
        return String(selectorText).split(",").some(s => s.trim() === ":root");
    }

    function readRootTokens(frameDoc) {
        const declared = new Map();   // name → valor declarado (last-wins, como en CSS)

        Array.from(frameDoc.styleSheets || []).forEach(sheet => {
            let rules;
            // Una hoja de otro origen lanza al leer cssRules. Aquí son del mismo origen,
            // pero el try mantiene la story viva si alguna fallara.
            try { rules = sheet.cssRules; } catch (_) { return; }
            if (!rules) return;
            Array.from(rules).forEach(rule => {
                if (!rule.style || !rule.selectorText) return;
                if (!isRootSelector(rule.selectorText)) return;
                for (let i = 0; i < rule.style.length; i++) {
                    const prop = rule.style[i];
                    if (prop.slice(0, 2) !== "--") continue;
                    declared.set(prop, rule.style.getPropertyValue(prop).trim());
                }
            });
        });

        const cs = frameDoc.defaultView.getComputedStyle(frameDoc.documentElement);
        return Array.from(declared.entries()).map(([name, raw]) => ({
            name,
            raw,
            computed: cs.getPropertyValue(name).trim(),
            category: categoryOf(name),
            dark: isDark(name)
        }));
    }

    /* ═══ Taxonomía ═════════════════════════════════════════════════════
       DERIVADA de los nombres reales, no inventada. Las listas cerradas
       (redes, juegos, escala, neutros, producto) están sacadas del inventario
       de los seis setting.css; lo que no encaja cae en "Otros" y se dice, en
       vez de forzarlo dentro de una categoría que no le toca.

       El grueso de "Otros" en `regionales` son colores de CABECERA por medio
       (faro, levante, emporda, regio7, oviedo…): son ~100 tokens y su lista es
       volátil, así que NO se enumeran aquí. Por eso "Otros" es una categoría
       legítima, no un cajón de sastre por dejadez. */

    const SCALE     = ["primary", "secondary", "tertiary", "quaternary", "quinary", "senary", "septenary"];
    const NEUTRAL   = ["black", "white", "darkgrey", "mediumgrey", "lightgrey", "degraded1", "degraded2", "degraded3"];
    const SOCIAL    = ["facebook", "twitter", "instagram", "linkedin", "whatsapp", "pinterest",
                       "snapchat", "youtube", "telegram", "tiktok", "threads", "bluesky"];
    const GAMES     = ["crucigrama", "cuadronumerico", "cuatroencampo", "pangramax", "saltaminas",
                       "sopa", "sudoku", "timequest", "wordle", "porra"];
    const PRODUCT   = ["paywall", "subscription", "form", "tag", "section", "illustrations", "premium"];

    /* Sufijo `-dm` = variante de DARK MODE. Es un EJE ORTOGONAL, no una categoría:
       casi la mitad del catálogo lo lleva (ux 54/115 · regionales 129/266). Se marca
       como flag y por defecto se oculta, porque duplicaba cada fila y hacía la tabla
       ilegible. Ojo: el dark del DS no redefine el :root — declara estos tokens
       APARTE y los consume bajo [data-theme="dark"]. */
    const isDark = (name) => /-dm$/.test(name);

    /* Base del token, sin prefijo de familia, sin `-dm` y sin el modificador `--light`
       (que usan los juegos: --color-sudoku--light). */
    function baseOf(name) {
        return name
            .replace(/^--(color|font)-/, "")
            .replace(/-dm$/, "")
            .replace(/--light$/, "")
            .toLowerCase();
    }
    const head = (base) => base.split("-")[0];

    /* Categorías, en orden de evaluación. `id` es lo que consume el filtro. */
    const CATEGORIES = [
        { id: "font-family",      label: "Tipografía · familias",   hint: "--font-*" },
        { id: "font-metric",      label: "Tipografía · métricas",   hint: "--font-size|height" },
        { id: "color-scale",      label: "Color · paleta jerárquica", hint: "primary → septenary" },
        { id: "color-neutral",    label: "Color · neutros",         hint: "black · white · greys" },
        { id: "color-functional", label: "Color · funcionales",     hint: "success · info · warning · error" },
        { id: "color-social",     label: "Color · redes sociales",  hint: "12 redes" },
        { id: "color-game",       label: "Color · juegos",          hint: "pasatiempos" },
        { id: "color-product",    label: "Color · producto / UI",   hint: "paywall · form · tag…" },
        { id: "color-other",      label: "Color · otros",           hint: "cabeceras de medio, eventos…" },
        { id: "other",            label: "Otros",                   hint: "sin prefijo --color/--font" }
    ];
    const CAT_BY_ID = CATEGORIES.reduce((m, c) => { m[c.id] = c; return m; }, {});

    function categoryOf(name) {
        const base = baseOf(name);
        const h = head(base);

        if (name.indexOf("--font") === 0) {
            return /^(size|height|weight|spacing)/.test(base) || /-(size|height|weight)-/.test(base)
                ? "font-metric"
                : "font-family";
        }
        if (name.indexOf("--color") === 0) {
            if (h === "functional")          return "color-functional";
            if (SCALE.indexOf(base) !== -1)  return "color-scale";
            if (NEUTRAL.indexOf(base) !== -1) return "color-neutral";
            if (SOCIAL.indexOf(h) !== -1)    return "color-social";
            if (GAMES.indexOf(h) !== -1)     return "color-game";
            if (PRODUCT.indexOf(h) !== -1)   return "color-product";
            return "color-other";
        }
        return "other";
    }

    // Un valor es "pintable" si el navegador lo puede usar como background.
    const COLORISH = /^(#|rgb|hsl|var\(|[a-z]+$)|gradient\(/i;
    const isColorish = (v) => !!v && COLORISH.test(String(v).trim());

    // Un token tipográfico que es FAMILIA: se puede renderizar CON ella.
    const isFontFamily = (t) => t.category === "font-family";

    /* Marca activa vía la API pública del motor. Se pinta en la cabecera para que el
       cambio de Brand sea VERIFICABLE: al conmutar deben cambiar a la vez el fichero
       y el recuento. */
    function activeBrand() {
        try {
            const b = window.SB.currentBrand && window.SB.currentBrand();
            const m = /brands\/([^/]+)\/(setting[^/]*\.css)$/.exec((b && b.setting) || "");
            return m ? { brand: m[1], file: m[1] + "/" + m[2] } : null;
        } catch (_) { return null; }
    }

    /* ═══ CSS del inspector ═════════════════════════════════════════════
       Prefijo `sbr-` (Storybook Root): ni `.ft-*` del DS ni `.cb-*` del chrome.
       Es harness de presentación del inspector, no markup del DS — por eso las
       stories declaran `code` propio y el panel Code NO enseña estas clases. */
    const STYLE = `<style>
    .sbr { font-family: 'Inter', system-ui, sans-serif; color: #161616; }
    .sbr *, .sbr *::before, .sbr *::after { box-sizing: border-box; }

    .sbr__head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px 14px; margin-bottom: 14px; }
    .sbr__title { margin: 0; font-size: 13px; font-weight: 600; letter-spacing: .01em; }
    .sbr__file { font: 500 11px/1.4 'JetBrains Mono', monospace; color: #0f62fe; background: #edf5ff;
                 border: 1px solid #d0e2ff; border-radius: 999px; padding: 2px 9px; }
    .sbr__hint { margin: 0; font-size: 11.5px; line-height: 1.5; color: #6f6f6f; flex-basis: 100%; }

    /* Barra de herramientas: buscador + contador. Sticky para que el buscador
       siga accesible al recorrer 260 tokens (regionales). */
    .sbr__bar { position: sticky; top: 0; z-index: 3; padding: 10px 0 10px; background: #fff;
                border-bottom: 1px solid #e0e0e0; margin-bottom: 18px; }
    .sbr__row { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }

    /* Facetas por categoría */
    .sbr__facets { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
    .sbr__chipf { display: inline-flex; align-items: center; gap: 6px; height: 26px; padding: 0 10px;
                  border: 1px solid #c6c6c6; border-radius: 999px; background: #fff; color: #393939;
                  font: 500 11.5px/1 'Inter', sans-serif; cursor: pointer; white-space: nowrap; }
    .sbr__chipf:hover { border-color: #8d8d8d; background: #f4f4f4; }
    .sbr__chipf b { font: 600 10px/1 'JetBrains Mono', monospace; color: #6f6f6f; }
    .sbr__chipf.is-on { background: #161616; border-color: #161616; color: #fff; }
    .sbr__chipf.is-on b { color: #a8a8a8; }
    .sbr__chipf.is-void { opacity: .38; }

    /* Toggle de dark mode (eje ortogonal a la categoría → no es un chip más) */
    .sbr__toggle { display: inline-flex; align-items: center; gap: 7px; height: 34px; padding: 0 12px;
                   border: 1px solid #c6c6c6; border-radius: 3px; background: #fff; color: #393939;
                   font: 500 11.5px/1 'Inter', sans-serif; cursor: pointer; white-space: nowrap; }
    .sbr__toggle:hover { border-color: #8d8d8d; }
    .sbr__toggle b { font: 600 10px/1 'JetBrains Mono', monospace; color: #6f6f6f; }
    .sbr__toggle-dot { width: 9px; height: 9px; border-radius: 50%; background: #c6c6c6; }
    .sbr__toggle.is-on { background: #6929c4; border-color: #6929c4; color: #fff; }
    .sbr__toggle.is-on b { color: #d4bbff; }
    .sbr__toggle.is-on .sbr__toggle-dot { background: #d4bbff; }

    .sbr mark { background: #fff8c5; color: #161616; border-radius: 2px; padding: 0 1px; }

    .sbr__search { position: relative; flex: 1 1 260px; min-width: 220px; }
    .sbr__search svg { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); pointer-events: none; }
    .sbr__input { width: 100%; height: 34px; padding: 0 32px 0 32px; border: 1px solid #c6c6c6; border-radius: 3px;
                  background: #fff; color: #161616; font: 400 12.5px/1 'JetBrains Mono', monospace; }
    .sbr__input:focus { outline: 2px solid #0f62fe; outline-offset: -1px; border-color: transparent; }
    .sbr__input::placeholder { color: #a8a8a8; font-family: 'Inter', sans-serif; }
    .sbr__clear { position: absolute; right: 4px; top: 50%; transform: translateY(-50%); width: 26px; height: 26px;
                  display: none; align-items: center; justify-content: center; border: 0; border-radius: 3px;
                  background: transparent; color: #6f6f6f; cursor: pointer; font-size: 15px; line-height: 1; }
    .sbr__clear:hover { background: #e8e8e8; color: #161616; }
    .sbr__search.is-filled .sbr__clear { display: flex; }
    .sbr__count { font: 500 11.5px/1 'Inter', sans-serif; color: #6f6f6f; white-space: nowrap; }
    .sbr__count b { color: #161616; }

    /* Tabla.
       El <thead> NO es sticky: competía con la barra del buscador (también sticky) y,
       al no compartir contenedor de scroll, se desplazaba sobre la primera fila y la
       tapaba (--font-stack quedaba oculto). La barra sticky ya resuelve el caso de uso
       —tener el buscador siempre a mano—, así que la cabecera de la tabla se queda quieta. */
    .sbr__wrap { border: 1px solid #e0e0e0; border-radius: 3px; overflow: hidden; background: #fff; }
    .sbr__table { border-collapse: collapse; width: 100%; table-layout: fixed; }
    .sbr__table th { background: #f4f4f4; text-align: left;
                     font: 600 11px/1.2 'Inter', sans-serif; color: #161616; padding: 10px 12px;
                     border-bottom: 1px solid #e0e0e0; }
    .sbr__table td { padding: 9px 12px; border-bottom: 1px solid #f4f4f4; vertical-align: middle;
                     font: 400 11.5px/1.5 'JetBrains Mono', monospace; word-break: break-word; }
    .sbr__table tr:last-child td { border-bottom: 0; }
    .sbr__table tbody tr:hover { background: #f7f9ff; }
    .sbr__c-token { width: 30%; }
    .sbr__c-raw   { width: 35%; color: #6f6f6f; }
    .sbr__c-cmp   { width: 35%; }

    /* Nombre del token: clicable para copiar var(--x) */
    .sbr__name { display: inline-flex; align-items: center; gap: 7px; border: 0; padding: 2px 4px; margin: -2px -4px;
                 background: transparent; border-radius: 3px; cursor: copy; text-align: left;
                 font: 500 11.5px/1.5 'JetBrains Mono', monospace; color: #161616; }
    .sbr__name:hover { background: #e5efff; }
    .sbr__name:focus-visible { outline: 2px solid #0f62fe; }
    .sbr__name.is-copied { background: #defbe6; }
    .sbr__chip { flex: 0 0 auto; width: 24px; height: 24px; border: 1px solid rgba(0,0,0,.18); border-radius: 3px;
                 background-image: linear-gradient(45deg,#eee 25%,transparent 25%,transparent 75%,#eee 75%),
                                   linear-gradient(45deg,#eee 25%,transparent 25%,transparent 75%,#eee 75%);
                 background-size: 10px 10px; background-position: 0 0, 5px 5px; }
    .sbr__chip i { display: block; width: 100%; height: 100%; border-radius: 2px; }
    .sbr__label { word-break: break-word; }
    .sbr__alias { display: inline-block; margin-left: 6px; padding: 0 5px; border-radius: 2px; background: #f4f4f4;
                  font: 500 9.5px/15px 'Inter', sans-serif; color: #6f6f6f; letter-spacing: .04em; vertical-align: 1px; }

    /* Swatches */
    .sbr__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; }
    .sbr__card { border: 1px solid #e0e0e0; border-radius: 3px; overflow: hidden; background: #fff; }
    .sbr__card:hover { border-color: #a8a8a8; }
    .sbr__swatch { height: 110px; border-bottom: 1px solid #e0e0e0;
                   background-image: linear-gradient(45deg,#f0f0f0 25%,transparent 25%,transparent 75%,#f0f0f0 75%),
                                     linear-gradient(45deg,#f0f0f0 25%,transparent 25%,transparent 75%,#f0f0f0 75%);
                   background-size: 14px 14px; background-position: 0 0, 7px 7px; }
    .sbr__swatch i { display: block; width: 100%; height: 100%; }
    .sbr__meta { padding: 9px 10px; }
    .sbr__val { display: block; margin-top: 3px; font: 400 10.5px/1.4 'JetBrains Mono', monospace; color: #6f6f6f;
                word-break: break-all; }

    /* Muestra tipográfica */
    .sbr__font { border: 1px solid #e0e0e0; border-radius: 3px; background: #fff; padding: 14px 16px; margin-bottom: 10px; }
    .sbr__sample { margin: 10px 0 0; font-size: 24px; line-height: 1.35; color: #161616; }

    /* Secciones por categoría */
    .sbr__sec { margin: 0 0 26px; }
    .sbr__sec[hidden] { display: none; }
    .sbr__sec-h { display: flex; align-items: baseline; gap: 9px; margin: 0 0 10px;
                  padding-bottom: 7px; border-bottom: 2px solid #161616; }
    .sbr__sec-name { font: 600 12.5px/1.2 'Inter', sans-serif; color: #161616; }
    .sbr__sec-hint { font: 400 11px/1.2 'JetBrains Mono', monospace; color: #8d8d8d; }
    .sbr__sec-n { margin-left: auto; min-width: 22px; padding: 1px 7px; border-radius: 999px; background: #161616;
                  font: 600 10.5px/16px 'Inter', sans-serif; color: #fff; text-align: center; }

    .sbr__alias--dm { background: #e8daff; color: #6929c4; }

    .sbr__sub { margin: 22px 0 10px; font: 600 12.5px/1.2 'Inter', sans-serif; color: #161616; }
    .sbr__empty { padding: 28px 20px; text-align: center; border: 1px dashed #c6c6c6; border-radius: 3px;
                  background: #fafafa; font: 400 12px/1.6 'Inter', sans-serif; color: #6f6f6f; }
    .sbr__empty code { font: 500 11.5px 'JetBrains Mono', monospace; color: #161616; }
    .sbr__empty[hidden] { display: none; }
    </style>`;

    const IC_SEARCH = '<svg width="14" height="14" viewBox="0 0 256 256" fill="none" stroke="#8d8d8d" stroke-width="18"><circle cx="112" cy="112" r="76"/><line x1="166" y1="166" x2="218" y2="218" stroke-linecap="round"/></svg>';

    /* ═══ Vistas ════════════════════════════════════════════════════════ */

    const EMPTY = (msg) => `<div class="sbr"><div class="sbr__empty">${msg}</div></div>`;

    const swatchBox = (v, cls) => isColorish(v)
        ? `<span class="${cls}"><i style="background:${esc(v)}"></i></span>`
        : `<span class="${cls}"></span>`;

    /* El nombre es un <button>: al pulsarlo copia `var(--token)`.
       El texto va en un span con clase PROPIA (`sbr__label`), no en un <span> a secas:
       el chip de color también es un <span> y va ANTES, así que un selector
       `.sbr__name span` cogería el chip. El resaltado escribe en este nodo — si apunta
       al chip, le borra el <i> del fondo y le mete dentro el nombre del token. */
    const nameBtn = (t, withChip) =>
        `<button type="button" class="sbr__name" data-copy="var(${esc(t.name)})" title="Copiar var(${esc(t.name)})">
            ${withChip && isColorish(t.computed) ? swatchBox(t.computed, "sbr__chip") : ""}
            <span class="sbr__label">${esc(t.name)}</span>
        </button>`;

    // Un token cuyo valor declarado es var(--otro) es un ALIAS: marcarlo ayuda a
    // entender por qué las dos columnas difieren.
    const aliasTag = (t) => /^var\(/i.test(t.raw || "") ? '<span class="sbr__alias">ALIAS</span>' : "";

    // Marca la variante de dark mode. Es un eje ortogonal a la categoría.
    const darkTag = (t) => t.dark ? '<span class="sbr__alias sbr__alias--dm" title="Variante de dark mode">DARK</span>' : "";

    /* data-* comunes a los tres tipos de item → el filtro en vivo los trata igual.
       `data-val` lleva el valor computado en minúsculas para poder BUSCAR POR VALOR
       (p. ej. "#111" o "gradient"), no solo por nombre. Se precalcula aquí, en el
       render, para que el filtro no tenga que normalizar nada en cada pulsación. */
    const attrs = (t) => `data-token="${esc(t.name)}" data-cat="${esc(t.category)}" ` +
        `data-dark="${t.dark ? "1" : "0"}" data-val="${esc(String(t.computed || "").toLowerCase())}"`;

    const rowOf = (t) => `
        <tr ${attrs(t)}>
            <td class="sbr__c-token">${nameBtn(t, true)}${aliasTag(t)}${darkTag(t)}</td>
            <td class="sbr__c-raw">${esc(t.raw || "—")}</td>
            <td class="sbr__c-cmp">${esc(t.computed || "—")}</td>
        </tr>`;

    const table = (tokens) => `
        <div class="sbr__wrap">
            <table class="sbr__table">
                <thead><tr>
                    <th class="sbr__c-token">Token</th>
                    <th class="sbr__c-raw">Declarado (setting.css)</th>
                    <th class="sbr__c-cmp">Computado (valor vigente)</th>
                </tr></thead>
                <tbody>${tokens.map(rowOf).join("")}</tbody>
            </table>
        </div>`;

    const cardOf = (t) => `
        <div class="sbr__card" ${attrs(t)}>
            ${swatchBox(t.computed, "sbr__swatch")}
            <div class="sbr__meta">
                ${nameBtn(t, false)}${darkTag(t)}
                <code class="sbr__val">${esc(t.computed || "—")}</code>
            </div>
        </div>`;

    const grid = (tokens) => `<div class="sbr__grid">${tokens.map(cardOf).join("")}</div>`;

    const fontBox = (t) => `
        <div class="sbr__font" ${attrs(t)}>
            ${nameBtn(t, false)}${darkTag(t)}
            <code class="sbr__val">${esc(t.computed || "—")}</code>
            <p class="sbr__sample" style="font-family:${esc(t.computed)}">El veloz murciélago hindú comía feliz 0123</p>
        </div>`;

    /* ─── Secciones por categoría ───────────────────────────────────────
       Agrupa los tokens en el ORDEN canónico de CATEGORIES y pinta cada grupo con
       su cabecera y su recuento. `renderer(tokens)` decide tabla / grid / muestras.
       Una categoría sin tokens en esta marca no se pinta (no hay secciones vacías). */
    function sections(tokens, renderer) {
        return CATEGORIES.map(cat => {
            const items = tokens.filter(t => t.category === cat.id);
            if (!items.length) return "";
            return `<section class="sbr__sec" data-sec="${esc(cat.id)}">
                <h3 class="sbr__sec-h">
                    <span class="sbr__sec-name">${esc(cat.label)}</span>
                    <span class="sbr__sec-hint">${esc(cat.hint)}</span>
                    <span class="sbr__sec-n" data-sec-count>${items.length}</span>
                </h3>
                ${renderer(items)}
            </section>`;
        }).join("");
    }

    // Renderer por categoría: las tipográficas se ven mejor como muestra que como fila.
    const rendererFor = (view) => (items) => {
        const cat = items[0] && items[0].category;
        if (cat === "font-family") return items.map(fontBox).join("");
        if (view === "swatch") return grid(items);
        return table(items);
    };

    /* Chips de faceta por categoría. Solo se pintan las categorías CON tokens en esta
       marca (en `ux` no hay ninguna de "Color · otros"; en `regionales` hay 74). El
       contador de cada chip es DINÁMICO: refleja cuántos casan con la búsqueda y el
       eje dark actuales, no el total fijo. */
    const chips = (tokens) => {
        const present = CATEGORIES.filter(c => tokens.some(t => t.category === c.id));
        const all = `<button type="button" class="sbr__chipf is-on" data-cat-chip="all">Todas <b data-chip-n>${tokens.length}</b></button>`;
        return all + present.map(c =>
            `<button type="button" class="sbr__chipf" data-cat-chip="${esc(c.id)}" title="${esc(c.hint)}">${esc(c.label)} <b data-chip-n>0</b></button>`
        ).join("");
    };

    /* Cabecera + barra de filtros. El filtrado NO pasa por el motor: se hace sobre el
       DOM ya pintado (ver wireSearch), así que las facetas son instantáneas y no se
       pierde el foco del buscador. Por eso `category` y `dark` NO son controls: si lo
       fueran, cada clic dispararía un renderCanvas() completo. */
    const shell = (tokens, body) => {
        const b = activeBrand();
        const file = b
            ? `<span class="sbr__file">${esc(b.file)}</span>`
            : `<span class="sbr__file">marca activa</span>`;
        const nDark = tokens.filter(t => t.dark).length;

        return `<div class="sbr">
            ${STYLE}
            <header class="sbr__head">
                <h2 class="sbr__title">Tokens del <code>:root</code></h2>
                ${file}
                <p class="sbr__hint">Pulsa el nombre de un token para copiar su <code>var(--…)</code>. Cambia <strong>Brand</strong> en el toolbar: el fichero y el recuento deben cambiar con él.</p>
            </header>

            <div class="sbr__bar">
                <div class="sbr__row">
                    <div class="sbr__search">
                        ${IC_SEARCH}
                        <input type="search" class="sbr__input" data-sbr-input
                               placeholder="Buscar por nombre o por valor…   (primary · functional · #111 · gradient)"
                               aria-label="Buscar token" autocomplete="off" spellcheck="false">
                        <button type="button" class="sbr__clear" data-sbr-clear title="Limpiar (Esc)" aria-label="Limpiar búsqueda">&times;</button>
                    </div>
                    ${nDark ? `<button type="button" class="sbr__toggle" data-sbr-dark aria-pressed="false" title="Los tokens -dm son la variante de dark mode">
                        <span class="sbr__toggle-dot"></span> Dark mode <b>${nDark}</b>
                    </button>` : ""}
                    <span class="sbr__count" data-sbr-count></span>
                </div>
                <div class="sbr__facets" data-sbr-facets>${chips(tokens)}</div>
            </div>

            <div data-sbr-body>${body}</div>
            <div class="sbr__empty" data-sbr-none hidden>Ningún token coincide con los filtros activos.</div>
        </div>`;
    };

    /* ═══ Builders por story ════════════════════════════════════════════
       Se pinta TODO el catálogo (incluidos los `-dm`) una sola vez; el acotado lo hace
       el filtro en vivo. Antes se re-renderizaba entero en cada cambio de faceta. */

    const buildBase = (tokens, a) => {
        if (!tokens.length) return EMPTY("Esta marca no declara tokens en <code>:root</code>.");
        return shell(tokens, sections(tokens, rendererFor(a && a.view)));
    };

    const buildColors = (tokens) => {
        const colors = tokens.filter(t => t.category.indexOf("color-") === 0);
        if (!colors.length) return EMPTY("Esta marca no declara tokens <code>--color-*</code> en <code>:root</code>.");
        return shell(colors, sections(colors, grid));
    };

    const buildFonts = (tokens) => {
        const fonts = tokens.filter(t => t.category.indexOf("font-") === 0);
        if (!fonts.length) return EMPTY("Esta marca no declara tokens <code>--font-*</code> en <code>:root</code>.");
        return shell(fonts, sections(fonts, rendererFor("table")));
    };

    const buildAll = (tokens) => shell(tokens, sections(tokens, rendererFor("table")));

    /* ═══ Filtro en vivo (dentro del canvas) ════════════════════════════

       Tres facetas que se combinan en AND: texto × categoría × dark.

       EFICIENCIA — todo lo caro se hace UNA vez, al cablear:
         · Se precalcula un ÍNDICE plano con el nombre y el valor ya en minúsculas
           y el nodo de cada item. En cada pulsación NO se toca el DOM para leer:
           ni getAttribute, ni toLowerCase, ni querySelectorAll.
         · Cada sección conoce sus items (array propio), así que contar visibles es
           un bucle sobre su array, no un querySelectorAll(":not([hidden])") por
           sección — que era O(secciones × items) en cada tecla.
         · `el.hidden` solo se ESCRIBE si cambia: evita invalidaciones de layout
           inútiles (en regionales son 266 items).
         · El resaltado <mark> solo se recalcula en los items visibles y solo si la
           query tiene ≥2 caracteres.

       Los contadores de los chips son FACETADOS: cada uno cuenta los que casarían
       con el texto y el dark actuales SI se pulsara ese chip — no un total fijo. */
    function wireSearch(root) {
        const input  = root.querySelector("[data-sbr-input]");
        const clear  = root.querySelector("[data-sbr-clear]");
        const count  = root.querySelector("[data-sbr-count]");
        const none   = root.querySelector("[data-sbr-none]");
        const box    = root.querySelector(".sbr__search");
        const darkBt = root.querySelector("[data-sbr-dark]");
        const facets = root.querySelector("[data-sbr-facets]");
        if (!input) return;

        // ── Índice (una sola pasada por el DOM) ──
        const index = Array.from(root.querySelectorAll("[data-token]")).map(el => ({
            el,
            name: el.getAttribute("data-token").toLowerCase(),
            val:  el.getAttribute("data-val") || "",
            cat:  el.getAttribute("data-cat"),
            dark: el.getAttribute("data-dark") === "1",
            // OJO: `.sbr__label`, NO `.sbr__name span` — el chip de color es un <span> y va
            // primero, así que ese selector lo cogería a él y el resaltado le borraría el fondo.
            label: el.querySelector(".sbr__label"),
            shown: true
        }));
        const total = index.length;

        // Cada sección con SUS items → contar visibles sin volver a consultar el DOM.
        const secs = Array.from(root.querySelectorAll(".sbr__sec")).map(sec => ({
            el: sec,
            n: sec.querySelector("[data-sec-count]"),
            items: index.filter(it => it.el.closest(".sbr__sec") === sec),
            shown: true
        }));

        const chipEls = facets ? Array.from(facets.querySelectorAll("[data-cat-chip]")) : [];

        const state = { q: "", cat: "all", dark: false };

        // Texto: casa por NOMBRE o por VALOR (buscar "#111" o "gradient" funciona).
        const matchText = (it, q) => !q || it.name.indexOf(q) !== -1 || it.val.indexOf(q) !== -1;
        const matchDark = (it) => state.dark || !it.dark;

        function highlight(it, q) {
            if (!it.label) return;
            const raw = it.el.getAttribute("data-token");
            if (!q || q.length < 2) {
                if (it.label.textContent !== raw) it.label.textContent = raw;
                return;
            }
            const i = it.name.indexOf(q);
            if (i === -1) { if (it.label.textContent !== raw) it.label.textContent = raw; return; }
            it.label.innerHTML = esc(raw.slice(0, i)) + "<mark>" + esc(raw.slice(i, i + q.length)) + "</mark>" + esc(raw.slice(i + q.length));
        }

        function apply() {
            const q = input.value.trim().toLowerCase();
            state.q = q;
            uiQuery = input.value;                        // persiste entre re-renders
            box.classList.toggle("is-filled", !!q);

            // Contadores facetados por categoría: se calculan con texto + dark, SIN la
            // faceta de categoría (si no, el chip no seleccionado siempre marcaría 0).
            const perCat = {};
            let visible = 0;

            for (let i = 0; i < total; i++) {
                const it = index[i];
                const passBase = matchText(it, q) && matchDark(it);
                if (passBase) perCat[it.cat] = (perCat[it.cat] || 0) + 1;

                const pass = passBase && (state.cat === "all" || it.cat === state.cat);
                if (pass !== it.shown) { it.el.hidden = !pass; it.shown = pass; }  // solo si cambia
                if (pass) { visible++; highlight(it, q); }
            }

            // Secciones: se ocultan enteras si no tienen ningún item visible (si no,
            // quedaría su cabecera y la de su tabla flotando sobre el vacío).
            for (let s = 0; s < secs.length; s++) {
                const sec = secs[s];
                let hits = 0;
                for (let i = 0; i < sec.items.length; i++) if (sec.items[i].shown) hits++;
                const on = hits > 0;
                if (on !== sec.shown) { sec.el.hidden = !on; sec.shown = on; }
                if (sec.n) sec.n.textContent = hits;
            }

            // Chips: contador facetado + estado activo. Un chip con 0 resultados se
            // atenúa (pero sigue pulsable: quitar el texto lo revive).
            let baseTotal = 0;
            for (const k in perCat) baseTotal += perCat[k];
            chipEls.forEach(chip => {
                const id = chip.getAttribute("data-cat-chip");
                const n = id === "all" ? baseTotal : (perCat[id] || 0);
                const b = chip.querySelector("[data-chip-n]");
                if (b) b.textContent = n;
                chip.classList.toggle("is-on", state.cat === id);
                chip.classList.toggle("is-void", n === 0);
            });

            if (count) count.innerHTML = "<b>" + visible + "</b> de <b>" + total + "</b> tokens";
            if (none) none.hidden = visible !== 0;
        }

        // ── Eventos ──
        input.addEventListener("input", apply);
        input.addEventListener("keydown", (e) => {
            // stopPropagation: el chrome escucha Escape en el documento padre para cerrar
            // dropdowns; aquí Escape debe limpiar el buscador y nada más.
            if (e.key === "Escape") { e.stopPropagation(); input.value = ""; apply(); }
        });
        if (clear) clear.addEventListener("click", () => { input.value = ""; apply(); input.focus(); });

        if (facets) facets.addEventListener("click", (e) => {
            const chip = e.target.closest("[data-cat-chip]");
            if (!chip) return;
            const id = chip.getAttribute("data-cat-chip");
            state.cat = (state.cat === id && id !== "all") ? "all" : id;   // re-clic = quitar filtro
            apply();
        });

        if (darkBt) darkBt.addEventListener("click", () => {
            state.dark = !state.dark;
            darkBt.classList.toggle("is-on", state.dark);
            darkBt.setAttribute("aria-pressed", String(state.dark));
            apply();
        });

        // "/" enfoca el buscador (el atajo del chrome vive en el documento PADRE y no
        // llega al iframe, así que aquí hace falta el suyo propio).
        root.ownerDocument.addEventListener("keydown", (e) => {
            if (e.key !== "/" ) return;
            const t = e.target;
            const tag = t && t.tagName;
            if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
            e.preventDefault();
            input.focus();
            input.select();
        });

        // Restaura la query tras un re-render (cambio de vista o de marca).
        if (uiQuery) input.value = uiQuery;
        apply();
    }

    /* Copiar `var(--token)` al portapapeles. */
    function wireCopy(root, win) {
        root.addEventListener("click", (e) => {
            const btn = e.target.closest && e.target.closest("[data-copy]");
            if (!btn) return;
            const text = btn.getAttribute("data-copy");

            const done = () => {
                btn.classList.add("is-copied");
                win.setTimeout(() => btn.classList.remove("is-copied"), 700);
            };
            try {
                if (win.navigator.clipboard && win.navigator.clipboard.writeText) {
                    win.navigator.clipboard.writeText(text).then(done, () => fallback(text, done, win));
                } else {
                    fallback(text, done, win);
                }
            } catch (_) { fallback(text, done, win); }
        });
    }
    function fallback(text, done, win) {
        try {
            const doc = win.document;
            const ta = doc.createElement("textarea");
            ta.value = text;
            ta.style.cssText = "position:fixed;opacity:0;";
            doc.body.appendChild(ta);
            ta.select();
            doc.execCommand("copy");
            doc.body.removeChild(ta);
            done();
        } catch (_) { /* sin portapapeles: el token sigue siendo seleccionable a mano */ }
    }

    /* ═══ Mount ═════════════════════════════════════════════════════════ */

    const SLOT = '<div data-sb-root-slot></div>';

    /* ¿Quedan hojas del iframe sin parsear? Un <link> aún no cargado tiene .sheet === null.
       CLAVE para el cambio de marca (ver cabecera del fichero). */
    function stylesheetsPending(frameDoc) {
        const links = frameDoc.querySelectorAll('link[rel="stylesheet"]');
        for (let i = 0; i < links.length; i++) {
            let sheet = null;
            try { sheet = links[i].sheet; } catch (_) { sheet = null; }
            if (!sheet) return true;
        }
        return false;
    }

    const mount = (builder) => ({ stageEl, frameDoc, args }) => {
        const slot = stageEl.querySelector("[data-sb-root-slot]");
        if (!slot) return;
        if (!frameDoc) { slot.innerHTML = EMPTY("El canvas aún no tiene documento."); return; }

        const win = frameDoc.defaultView;
        const raf = (win && win.requestAnimationFrame)
            ? win.requestAnimationFrame.bind(win)
            : (fn) => window.setTimeout(fn, 16);
        const unraf = (win && win.cancelAnimationFrame)
            ? win.cancelAnimationFrame.bind(win)
            : window.clearTimeout;

        let cancelled = false, rafId = 0, tries = 0;
        const MAX_TRIES = 180;   // ~3 s a 60 fps. Si en 3 s no hay CSS, es que no lo va a haber.

        slot.innerHTML = EMPTY("Leyendo el <code>:root</code> de la marca…");

        function attempt() {
            if (cancelled) return;
            rafId = 0;

            let tokens = [];
            try {
                tokens = readRootTokens(frameDoc);
            } catch (err) {
                slot.innerHTML = EMPTY("No se pudo leer el <code>:root</code> del iframe: " + esc(err.message));
                return;
            }

            // Reintentar mientras falte alguna hoja por parsear o no haya salido ningún token.
            if ((stylesheetsPending(frameDoc) || !tokens.length) && tries++ < MAX_TRIES) {
                rafId = raf(attempt);
                return;
            }

            if (!tokens.length) {
                slot.innerHTML = EMPTY(
                    "La marca activa no declara ningún custom property en <code>:root</code>.<br>" +
                    "Sirve el storybook desde la raíz del repo: con <code>file://</code> el CSS del DS no carga."
                );
                return;
            }

            slot.innerHTML = builder(tokens, args || {});
            const rootEl = slot.querySelector(".sbr");
            if (rootEl) { wireSearch(rootEl); wireCopy(rootEl, win); }
        }

        attempt();

        // El motor invoca este unmount antes de re-renderizar (cleanupStoryMount): corta el
        // polling en vuelo para que un cambio rápido de marca no pise el resultado anterior.
        return function unmount() {
            cancelled = true;
            if (rafId) unraf(rafId);
        };
    };

    /* ═══ Code — markup canónico ════════════════════════════════════════
       El canvas de esta story es un inspector (clases `sbr-*`, harness), no markup
       del DS. Sin este `code`, el panel Code enseñaría el harness — lo que prohíbe
       la regla 9 del CLAUDE.md. Lo que un consumidor copia de verdad es esto: */
    const CODE = [
        '<!-- setting.css SIEMPRE primero: es quien declara el :root con los tokens -->',
        '<link rel="stylesheet" href="/cds-statics/css/brands/ux/setting.css">',
        '<link rel="stylesheet" href="/cds-statics/css/ux-index.css">',
        '',
        '<style>',
        '  /* Los tokens se consumen SIEMPRE con var(), nunca con el valor literal:',
        '     hardcodear #111 en vez de var(--color-primary) rompe la multimarca. */',
        '  .mi-pieza {',
        '    color: var(--color-primary);',
        '    font-family: var(--font-primary);',
        '    background: var(--color-white);',
        '  }',
        '</style>'
    ].join("\n");

    /* ═══ Registro ══════════════════════════════════════════════════════ */

    /* Controls = SOLO lo que cambia el MARKUP. El acotado (buscador, categoría, dark) vive
       en el canvas: son filtros sobre el DOM ya pintado, instantáneos y sin re-render.
       Si `category` o `dark` fueran controls, cada clic dispararía un renderCanvas()
       completo — reconstruir 266 nodos para ocultar unos cuantos. */
    const baseArgTypes = [
        { key: "view", control: "radio",
          desc: "Cómo se pintan los tokens de color. Las familias tipográficas siempre se muestran como muestra de texto, no como fila.",
          options: [["table", "tabla"], ["swatch", "swatches"]] }
    ];
    const baseArgs = { view: "table" };

    const ROOT = {
        id: "root",
        name: "Root",
        group: "Setup",
        signals: ["js"],          // se rellena en onMount leyendo el CSSOM del iframe
        overview: OVERVIEW(),
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true,
              argTypes: baseArgTypes, args: baseArgs,
              render: () => SLOT, onMount: mount(buildBase), code: CODE }
        ],
        subgroups: [
            {
                id: "galleries", name: "Galleries", collapsed: true,
                // Sin controls: las galerías son catálogos fijos. Su acotado (buscador,
                // categoría, dark) vive en la barra del canvas, igual que en Base.
                stories: [
                    { id: "colors", name: "Paleta de color", hint: "--color-*", kind: "gallery", full: true,
                      render: () => SLOT, onMount: mount(buildColors), code: CODE },
                    { id: "fonts", name: "Tipografía", hint: "--font-*", kind: "gallery", full: true,
                      render: () => SLOT, onMount: mount(buildFonts), code: CODE },
                    { id: "all", name: "Tabla completa", kind: "gallery", full: true,
                      render: () => SLOT, onMount: mount(buildAll), code: CODE }
                ]
            }
        ]
    };

    /* ═══ Overview (Docs) ═══════════════════════════════════════════════ */
    function OVERVIEW() {
        return `<div class="cb-docs__inner">
        <h1>Root</h1>
        <p class="cb-docs__lead">Inspector del bloque <code>:root</code> de la marca activa: los <strong>custom properties</strong> (design tokens) que declara <code>brands/&lt;marca&gt;/setting.css</code>. No es un componente: es el <strong>contrato de tokens</strong> del que consumen todos los <code>.ft-*</code> vía <code>var(--…)</code>.</p>

        <p>Responde tres preguntas que antes obligaban a abrir el CSS compilado a mano: <em>¿qué tokens existen en esta marca?</em>, <em>¿qué valor tienen ahora mismo?</em> y <em>¿en qué se diferencian de los de otra marca?</em>. Úsalo antes de escribir cualquier <code>var(--…)</code> en un componente o en un POC: si el token no aparece aquí, <strong>no existe en esa marca</strong>.</p>

        <div class="cb-callout">
            <strong>Los tokens se leen EN VIVO; no hay lista hardcodeada.</strong> La story recorre el CSSOM del iframe (<code>styleSheets</code> → reglas con selector <code>:root</code>) y resuelve el valor final con <code>getComputedStyle(documentElement)</code>. Es la única forma honesta: <strong>cada marca declara un set distinto</strong>, y <code>revistas</code> ni siquiera usa <code>setting.css</code>, sino <code>setting-&lt;submarca&gt;.css</code>.
        </div>

        <h2>Buscador y filtros</h2>
        <p>Todo el acotado vive <strong>dentro del canvas</strong>, no en el panel Controls, y actúa sobre el DOM ya pintado: es instantáneo, no re-renderiza la story y no pierde el foco del buscador. Hay <strong>tres facetas que se combinan en AND</strong>:</p>
        <table class="cb-table">
            <thead><tr><th>Faceta</th><th>Qué hace</th></tr></thead>
            <tbody>
                <tr><td><strong>Texto</strong></td><td>Busca por <strong>nombre Y por valor</strong>. <code>primary</code> encuentra el token; <code>#111</code> encuentra <em>todos</em> los que valen ese color; <code>gradient</code> encuentra los degradados. La coincidencia se resalta.</td></tr>
                <tr><td><strong>Categoría</strong></td><td>Chips con <strong>contador facetado</strong>: cada chip dice cuántos casarían <em>con la búsqueda y el dark actuales</em>, no un total fijo. Los que quedan a 0 se atenúan. Re-clic en el chip activo = quitar el filtro.</td></tr>
                <tr><td><strong>Dark mode</strong></td><td>Toggle morado. Los <code>-dm</code> están <strong>ocultos por defecto</strong> (son casi la mitad del catálogo y duplican cada token).</td></tr>
            </tbody>
        </table>
        <table class="cb-table cb-table--dense">
            <thead><tr><th>Atajo</th><th>Acción</th></tr></thead>
            <tbody>
                <tr><td><code>/</code></td><td>Enfocar el buscador (el atajo del chrome no llega al iframe; este es propio)</td></tr>
                <tr><td><code>Esc</code></td><td>Limpiar la búsqueda</td></tr>
                <tr><td>Clic en el nombre</td><td>Copiar <code>var(--token)</code> al portapapeles</td></tr>
            </tbody>
        </table>

        <div class="cb-callout">
            <strong>Por qué los filtros no son Controls.</strong> Un control del panel dispara un <code>renderCanvas()</code> completo: reconstruiría los 266 nodos de <code>regionales</code> solo para ocultar unos cuantos, y el input perdería el foco a cada tecla. En Controls queda únicamente <code>view</code> (tabla / swatches), que es lo único que cambia el <strong>markup</strong>. El resto es filtrado, y el filtrado se hace donde están los nodos.
        </div>
        <p>Los filtros se recalculan sobre un índice precomputado (nombre y valor ya normalizados, items agrupados por sección), así que una pulsación no vuelve a consultar el DOM ni una sola vez. La query sobrevive a un cambio de vista o de marca.</p>

        <h2>Cuántos tokens declara cada marca</h2>
        <table class="cb-table cb-table--dense">
            <thead><tr><th>Marca</th><th>Fichero</th><th>Tokens en <code>:root</code></th></tr></thead>
            <tbody>
                <tr><td><code>ux</code></td><td><code>brands/ux/setting.css</code></td><td>113</td></tr>
                <tr><td><code>ep</code></td><td><code>brands/ep/setting.css</code></td><td>118</td></tr>
                <tr><td><code>epe</code></td><td><code>brands/epe/setting.css</code></td><td>117</td></tr>
                <tr><td><code>sport</code></td><td><code>brands/sport/setting.css</code></td><td>148</td></tr>
                <tr><td><code>regionales</code></td><td><code>brands/regionales/setting.css</code></td><td>260</td></tr>
                <tr><td><code>revistas</code></td><td><code>brands/revistas/setting-{cuore,stilo,viajar,woman}.css</code></td><td>por submarca (woman: 118)</td></tr>
            </tbody>
        </table>
        <p>Cifras a fecha de la story. <strong>La buena es siempre la de la cabecera del canvas</strong>, que se calcula en vivo.</p>

        <h2>Categorías de token</h2>
        <p>No es lo mismo un token de tipografía que uno de color, ni un color de marca que el color corporativo de Instagram. Las categorías están <strong>derivadas de los nombres reales</strong> del inventario de los seis <code>setting.css</code>, no inventadas. La tabla se agrupa por ellas, en este orden:</p>
        <table class="cb-table">
            <thead><tr><th>Categoría</th><th>Regla</th><th>Ejemplo</th></tr></thead>
            <tbody>
                <tr><td><strong>Tipografía · familias</strong></td><td><code>--font-*</code> que no es una métrica</td><td><code>--font-primary</code> · <code>--font-stack</code> · <code>--font-branded</code></td></tr>
                <tr><td><strong>Tipografía · métricas</strong></td><td><code>--font-size-*</code> · <code>--font-height-*</code></td><td><code>--font-size-basis</code></td></tr>
                <tr><td><strong>Color · paleta jerárquica</strong></td><td>Los 7 ordinales</td><td><code>--color-primary</code> → <code>--color-septenary</code></td></tr>
                <tr><td><strong>Color · neutros</strong></td><td>Blanco, negro, grises, degradados</td><td><code>--color-black</code> · <code>--color-lightGrey</code></td></tr>
                <tr><td><strong>Color · funcionales</strong></td><td>Prefijo <code>functional-</code></td><td><code>--color-functional-error</code></td></tr>
                <tr><td><strong>Color · redes sociales</strong></td><td>Lista cerrada de 12 redes</td><td><code>--color-instagram</code> · <code>--color-bluesky</code></td></tr>
                <tr><td><strong>Color · juegos</strong></td><td>Pasatiempos del DS</td><td><code>--color-sudoku</code> · <code>--color-wordle</code></td></tr>
                <tr><td><strong>Color · producto / UI</strong></td><td><code>paywall</code> · <code>subscription</code> · <code>form</code> · <code>tag</code> · <code>section</code> · <code>illustrations</code> · <code>premium</code></td><td><code>--color-paywall-primary</code></td></tr>
                <tr><td><strong>Color · otros</strong></td><td>Lo que no encaja en ninguna de las anteriores</td><td>Colores de cabecera por medio en <code>regionales</code></td></tr>
            </tbody>
        </table>
        <div class="cb-callout">
            <strong>"Otros" no es un cajón de sastre por dejadez.</strong> En <code>regionales</code> el grueso de esa categoría son los <strong>colores de cabecera de cada medio</strong> (faro, levante, empordà, regio7, oviedo…): son ~100 tokens y su lista cambia cada vez que entra o sale un medio. Enumerarlos aquí sería crear una lista que caduca. Prefiero decir la verdad —"otros"— que fingir una taxonomía que se rompe sola.
        </div>

        <h2>El eje dark mode (<code>-dm</code>) — y por qué está oculto por defecto</h2>
        <p>El sufijo <code>-dm</code> marca la <strong>variante de dark mode</strong> de un token: <code>--color-primary</code> tiene su <code>--color-primary-dm</code>. <strong>Es casi la mitad del catálogo</strong>: 54 de 115 en <code>ux</code>, 129 de 266 en <code>regionales</code>.</p>
        <p>No es una categoría, es un <strong>eje ortogonal</strong>: cruza todas las categorías. Por eso no está en el selector de categoría sino en su propio control <code>dark</code> (boolean), y viene <strong>desactivado</strong>: con él encendido cada token aparecía duplicado y la tabla era ilegible. Cuando hay tokens ocultos, la story lo dice con un aviso ámbar en vez de callárselo.</p>
        <p>Los tokens visibles llevan la etiqueta <strong>DARK</strong> al activarlos, para no confundirlos con los de modo claro.</p>

        <h2>Declarado vs computado</h2>
        <ul>
            <li><strong>Declarado</strong>: el valor literal de <code>setting.css</code>. Si es una referencia a otro token (<code>--font-secondary: var(--font-stack)</code>) la fila se marca con la etiqueta <strong>ALIAS</strong>, y por eso las dos columnas difieren.</li>
            <li><strong>Computado</strong>: el valor que el navegador resuelve con la marca activa. Es lo que realmente pinta.</li>
        </ul>

        <div class="cb-callout cb-callout--warn">
            <strong>El botón "Oscuro" del toolbar NO cambia esta tabla, y es correcto.</strong> El dark del 42DS <strong>no redefine</strong> los tokens del <code>:root</code>: <code>scss/base/_dark.scss</code> no declara ni un solo custom property. Lo que hace es <strong>declarar tokens APARTE con sufijo <code>-dm</code></strong> (que sí están en este <code>:root</code>, y esta story te los enseña con el control <code>dark</code>) y consumirlos bajo <code>[data-theme="dark"]</code>. Por eso el <code>:root</code> es idéntico en claro y en oscuro: la paleta oscura no sustituye a la clara, <em>convive</em> con ella.
        </div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · declara el <code>:root</code></td><td>Obligatorio · <strong>primero</strong>. Es la fuente de todo lo que muestra esta story</td></tr>
                <tr><td><code>brands/[marca]/[marca]-core.css</code></td><td>CSS compilado · consume los tokens</td><td>Recomendado</td></tr>
                <tr><td>Servidor estático</td><td>Runtime</td><td>Obligatorio · con <code>file://</code> el CSS del DS no carga y el <code>:root</code> sale vacío</td></tr>
                <tr><td>—</td><td>JavaScript del DS</td><td>No necesita nada de <code>cds-statics/js/</code></td></tr>
            </tbody>
        </table>
        </div>

        <h2>Cómo se consume un token</h2>
        <p>Siempre con <code>var()</code>, nunca con el valor literal: un componente que hardcodea <code>#111</code> en vez de <code>var(--color-primary)</code> deja de ser multimarca. El panel <strong>Code</strong> tiene el snippet copiable. Si necesitas un color que no está en la tabla, <strong>no lo inventes</strong>: coordínalo con diseño para añadirlo al <code>setting.css</code> de la marca.</p>

        <h2>Limitación conocida</h2>
        <p>La story lee el <code>:root</code> de <strong>la marca activa</strong>, una a una. No hay matriz cross-marca: exigiría <code>fetch</code> de los otros <code>setting.css</code> y parseo del CSS en crudo, porque el CSSOM solo expone la hoja cargada en el iframe. Para comparar, cambia Brand.</p>

        <p class="cb-src">Fuente: <code>cds-statics/css/brands/&lt;marca&gt;/setting.css</code> · leído en vivo del CSSOM del iframe</p>
    </div>`;
    }

    window.SB.register(ROOT);
})();
