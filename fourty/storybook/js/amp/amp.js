/* ════════════════════════════════════════════════════════════════════════
   42DS Storybook — AMP: subgrupo "AMP" INTEGRADO en cada componente (modelo unificado)
   ────────────────────────────────────────────────────────────────────────
   MODELO ÚNICO para átomos/moléculas/organismos: cada componente que tiene su PROPIO código AMP
   en el showroom gana un SUBGRUPO "AMP" DENTRO de sí mismo (plegable, igual que "Galleries"/
   "Markup"), vía la API GENÉRICA del motor window.SB.attachSubgroup(id, subgroup). NO hay lógica
   AMP en core/. Cargar este módulo DESPUÉS de todos los módulos de componentes (defer preserva el
   orden): attachSubgroup los busca por id.

   El subgrupo "AMP" de un componente reúne las VARIANTES INLINE del showroom:

   VARIANTES INLINE — paneles data-showroom-view="amp" dentro de la página de showroom del
      componente (atom-<x>.html / molecule-<x>.html / organism-<x>.html). Cada panel = una story
      por variante (SSOT verbatim, extraído con amp-data.gen.js → amp-data.json). Render: TODAS las
      variantes (planas y con <amp-*>) se pintan en un IFRAME-SANDBOX estilado con el CSS AMP REAL del
      DS (setting + bundle amp-<marca>-index) — IGUAL que el showroom: así las clases AMP-only
      (.ft-mol-tab-amp, .ft-tooltip-amp…) se ven bien, y el runtime oficial de AMP (v0.js + <script
      custom-element> por extensión) upgradea amp-img/amp-selector/amp-youtube/… La MARCA del preview
      sigue al toolbar Brand vía window.SB.currentBrand() (slug del key; ux→fallback sport, no hay
      bundle amp-ux); al cambiar Brand, mountFrame re-renderiza y styleLinks() recarga el bundle.
      El preview omite el boilerplate (evita el ocultado de 8s) → NO es AMP estrictamente válido (CSS
      externo), pero renderiza fiel. El CANVAS muestra SOLO el elemento (sin chrome). El CÓDIGO del
      elemento y la VALIDEZ (validador oficial cdn.ampproject.org/v0/validator_wasm.js sobre un doc AMP
      CANÓNICO aparte —sin CSS externo— ejecutado UNA vez en el doc principal) viven en "Code AMP".
      Regenerar: node fourty/storybook/js/amp/amp-data.gen.js   (o … atoms|molecules|organisms)

   NOTA: las páginas AMP completas (fourty/{molecules,organisms}/amp-*.html) se publicaban antes como
   una story extra "Página AMP" (kind:"page"). Esos ficheros se movieron a __old-showroom → las stories
   navegaban a 404. Se RETIRARON: el código AMP relevante ya está extraído inline (variantes). Los
   componentes que SOLO tenían página AMP (footerbasic, breadcrumb-org) quedan sin subgrupo AMP.

   Requiere RED (runtime + validador). Sin conexión: el preview degrada a vacío y la nota de
   "Code AMP" muestra "validación no disponible"; el código siempre se ve.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    if (!window.SB || !window.SB.attachSubgroup) return;
    var esc = window.SB.helpers.esc;

    /* ───────────────────────────────────────────────────────────────────────
       2) ÁTOMOS — render real (iframe-sandbox AMP) + validación oficial
       ─────────────────────────────────────────────────────────────────────── */

    var CDN = "https://cdn.ampproject.org";
    /* Versión por extensión (todas 0.1 salvo excepciones). amp-img es BUILT-IN (sin script). */
    var EXT_VER = {};
    /* Boilerplate AMP obligatorio (oculta el body hasta que el runtime lo revela). */
    var BOILER = '<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>';

    /* Scripts custom-element para los <amp-*> presentes en el markup (amp-img es built-in). */
    function extScripts(markup) {
        var tags = {}, re = /<amp-([a-z0-9-]+)/gi, m;
        while ((m = re.exec(markup))) { tags["amp-" + m[1].toLowerCase()] = 1; }
        delete tags["amp-img"];
        return Object.keys(tags).map(function (t) {
            return '<script async custom-element="' + t + '" src="' + CDN + '/v0/' + t + '-' + (EXT_VER[t] || "0.1") + '.js"></script>';
        }).join("");
    }

    /* Marca → bundle CSS AMP del PREVIEW. AMP solo existe por-marca (ux NO tiene bundle). El slug se
       deriva del KEY de marca del motor (las revistas comparten revistas-index.css pero tienen
       amp-cuore/woman/viajar/stilo-index.css distintos → el key los distingue). Reacciona al toolbar
       Brand: mountFrame re-renderiza la story y styleLinks() lee window.SB.currentBrand() fresco. */
    var AMP_SLUGS = { ep: 1, epe: 1, regionales: 1, cuore: 1, viajar: 1, woman: 1, stilo: 1, sport: 1 };
    function ampBrand() {
        var b = (window.SB.currentBrand && window.SB.currentBrand()) || {};
        var base = b.cssBase || "/cds-statics/css/";
        var m = (b.key || "").match(/^showroom-brand-(.+)$/);
        var slug = m && AMP_SLUGS[m[1]] ? m[1] : "sport";   // ux/desconocida → sport (no hay amp-ux)
        var setting = (m && AMP_SLUGS[m[1]] && b.setting) ? b.setting : (base + "brands/sport/setting.css");
        return { setting: setting, amp: base + "amp-" + slug + "-index.css" };
    }
    function styleLinks() {
        var b = ampBrand();
        return '<link rel="stylesheet" href="' + b.setting + '"><link rel="stylesheet" href="' + b.amp + '">';
    }
    var AMP_CUSTOM = '<style amp-custom>body{margin:0;padding:10px;font-family:system-ui,-apple-system,sans-serif;background:#fff}</style>';

    /* Documento AMP que envuelve el markup de la variante. Dos modos:
       · opts.styled (PREVIEW): añade el CSS REAL del DS (setting + bundle amp-<marca>-index) para que
         las clases `.ft-*` se vean como en el showroom, y OMITE el boilerplate (evita el ocultado de
         8s). NO es AMP estrictamente válido (CSS externo no permitido en AMP) pero renderiza fiel —
         exactamente lo que hace el showroom. El runtime sigue cargando → upgradea amp-img/selector/…
       · sin styled (VALIDACIÓN): documento AMP canónico (boilerplate + amp-custom inline, SIN CSS
         externo) → el validador juzga el CÓDIGO del elemento, no nuestro wrapper. opts.spacer empuja
         ≥600px (regla de amp-iframe: distancia al top) para evitar falsos positivos. */
    function ampDoc(markup, opts) {
        opts = opts || {};
        var head = '<meta charset="utf-8">'
            + '<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">'
            + '<link rel="canonical" href="https://42ds.prensaiberica.es/">'
            + '<script async src="' + CDN + '/v0.js"></script>'
            + extScripts(markup)
            + (opts.styled ? styleLinks() + AMP_CUSTOM : BOILER + AMP_CUSTOM);
        var body = (opts.spacer ? '<div style="height:620px"></div>' : '') + markup;
        return '<!doctype html><html amp lang="es"><head>' + head + '</head><body>' + body + '</body></html>';
    }

    /* amp-iframe exige ≥600px desde el top (o placeholder) → para VALIDAR sin falsos
       positivos lo empujamos; el PREVIEW va sin spacer (preview limpio). */
    function needsOffset(markup) { return /<amp-iframe\b/i.test(markup); }

    /* Alto razonable del preview según la extensión dominante. */
    function prevHeight(markup) {
        if (/<amp-social-share\b/i.test(markup)) return 84;
        if (/<amp-tiktok\b/i.test(markup)) return 600;
        if (/<amp-twitter\b/i.test(markup) || /<amp-instagram\b/i.test(markup)) return 520;
        if (/<amp-facebook\b/i.test(markup)) return 360;
        if (/<amp-youtube\b/i.test(markup)) return 300;
        return 340;
    }

    var escAttr = function (s) { return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;"); };

    /* Iframe-sandbox que RENDERIZA la variante con el runtime real de AMP. */
    function previewIframe(markup) {
        return '<iframe loading="lazy" title="Render AMP real" '
            + 'sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-presentation allow-forms" '
            + 'srcdoc="' + escAttr(ampDoc(markup, { styled: true })) + '" '
            + 'style="display:block;width:100%;max-width:540px;height:' + prevHeight(markup) + 'px;border:0;background:#fff"></iframe>';
    }

    /* ─── Validador oficial de AMP (WASM), cargado UNA vez en el documento principal ─── */
    var _validatorReady = null;
    function ensureValidator() {
        if (_validatorReady) return _validatorReady;
        _validatorReady = new Promise(function (resolve, reject) {
            if (window.amp && window.amp.validator) return resolve();
            var s = document.createElement("script");
            s.src = CDN + "/v0/validator_wasm.js";
            s.onload = function () {
                var v = window.amp && window.amp.validator;
                if (v && typeof v.init === "function") {
                    var p = v.init();
                    (p && p.then ? p : Promise.resolve()).then(resolve, resolve);
                } else { resolve(); }
            };
            s.onerror = reject;
            document.head.appendChild(s);
        });
        return _validatorReady;
    }
    /* Valida un documento AMP completo → { status, errors:[{sev,msg}] } | null. */
    function validate(doc) {
        try {
            var v = window.amp.validator;
            var r = v.validateString(doc);
            var errors = (r.errors || []).map(function (e) {
                var msg = e.message || (v.renderErrorMessage ? v.renderErrorMessage(e) : "") || e.code || "";
                return { sev: e.severity || "ERROR", msg: msg };
            });
            return { status: r.status, errors: errors };
        } catch (err) { return null; }
    }

    /* CANVAS de UNA variante: SOLO el elemento, sin chrome alrededor. La validez vive en el panel
       "Code AMP" (codeAlt.note), el código en "Code AMP". TODAS las variantes (planas y <amp-*>) se
       renderizan en el MISMO iframe-sandbox estilado con el CSS AMP real del DS (setting + bundle
       amp-<marca>-index) → las clases AMP-only (p.ej. .ft-tooltip-amp, .ft-mol-tab-amp) se ven como
       en el showroom, y los <amp-*> los upgradea el runtime. 1 story = 1 iframe (sin coste extra). */
    function render(p) {
        return previewIframe(p.html);
    }

    /* Nota de validación para el panel "Code AMP" (HTML; usa la clase de aviso del chrome). */
    function valNote(p) {
        if (!p.ampEl) return "";   // markup plano: no requiere runtime/validación AMP
        if (!p._val) return '<div class="cb-code__warn" role="note">Validación AMP no disponible (sin conexión al validador oficial).</div>';
        var v = p._val;
        if (v.status === "PASS" && !v.errors.length) {
            return '<div class="cb-code__warn" role="note" style="background:#e6f7ec;color:#1a7f37">✅ Código AMP válido (validador oficial de AMP).</div>';
        }
        var items = v.errors.map(function (e) { return '<li>[' + esc(e.sev) + '] ' + esc(e.msg) + '</li>'; }).join("");
        return '<div class="cb-code__warn" role="note">⚠ ' + v.errors.length + ' incidencia(s) del validador AMP:'
            + '<ul style="margin:6px 0 0;padding-left:18px">' + items + '</ul></div>';
    }

    /* Subgrupo "AMP" DENTRO de cada componente (plegable, como "Galleries"/"Markup"), UNIFICADO
       para átomos/moléculas/organismos: una story por VARIANTE inline (canvas con solo el elemento;
       código + validación en "Code AMP"). Itera los componentes con paneles inline (amp-data.json).
       Las antiguas stories "Página AMP" (kind:page) se retiraron: sus ficheros amp-*.html ya no existen
       en fourty/ y el código AMP relevante vive en las variantes inline. */
    function attachAmpSubgroup(data) {
        data.forEach(function (entry) {
            var comp = entry.comp;
            var stories = (entry.panels || []).map(function (p, i) {
                return {
                    id: "amp-v" + i, name: p.name || ("Variante " + (i + 1)),
                    kind: "interactive", full: true,
                    render: (function (panel) { return function () { return render(panel); }; })(p),
                    // Panel inferior "Code AMP": solo el markup del elemento (no el wrapper) + validación.
                    codeAlt: { label: "Code AMP", code: p.html, note: valNote(p) }
                };
            });
            if (!stories.length) return;
            var ok = window.SB.attachSubgroup(comp, { id: "amp", name: "AMP", collapsed: true, stories: stories });
            if (!ok && window.console) { console.warn("[AMP] componente no encontrado: '" + comp + "'"); }
        });
    }

    // amp-data.json (junto a este módulo, generado por amp-data.gen.js). Requiere servidor (fetch).
    // Tras cargar: validamos cada variante <amp-*> (best-effort, nota de "Code AMP"); luego attach.
    var me = document.currentScript && document.currentScript.src;
    var jsonUrl = me ? me.replace(/amp\.js(\?.*)?$/, "amp-data.json") : "storybook/js/amp/amp-data.json";
    fetch(jsonUrl)
        .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
        .then(function (data) {
            var hasAmpEl = data.some(function (a) { return a.panels.some(function (p) { return p.ampEl; }); });
            var step = hasAmpEl
                ? ensureValidator().then(function () {
                    data.forEach(function (a) {
                        a.panels.forEach(function (p) {
                            if (p.ampEl) { p._val = validate(ampDoc(p.html, { spacer: needsOffset(p.html) })); }
                        });
                    });
                }).catch(function () { /* validador no disponible */ })
                : Promise.resolve();
            step.then(function () { attachAmpSubgroup(data); });
        })
        .catch(function () { /* sin servidor / sin fichero: el storybook sigue funcionando */ });
})();
