/* ════════════════════════════════════════════════════════════════════════
   42DS Storybook — CHANGELOG: página-doc standalone (sidebar "Docs › Changelog")
   ────────────────────────────────────────────────────────────────────────
   Patrón storybook-native (página de documentación, equivalente a un MDX
   <Meta title="Changelog"/>): registra un componente SIN stories, solo `overview`
   → el motor lo pinta como un ÚNICO nodo clicable que abre la vista Docs.

   FUENTE ÚNICA: window.SB_CHANGELOG (storybook/data/changelog-data.js) — array de
   { date, log[, version] }, log en texto plano. Fallback: window.SB_META.releases.
   Aquí solo se FORMATEA a HTML (cero lógica de release): se itera el registro completo, la
   release más reciente abierta y las anteriores plegadas (acordeón <details> nativo). El
   `version` es OPCIONAL (si falta, manda la fecha). Cargar tras los datos + core.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    if (!window.SB || !window.SB.register) return;
    var esc = window.SB.helpers.esc;
    var meta = window.SB_META || {};

    /* Registro de releases (fuente única: data/changelog-data.js). Fallback a SB_META.releases. */
    var releases = (Array.isArray(window.SB_CHANGELOG) && window.SB_CHANGELOG.length)
        ? window.SB_CHANGELOG.slice()
        : (Array.isArray(meta.releases) ? meta.releases.slice() : []);

    /* Clasificación de línea. */
    function isTag(t) { return /^[A-Z][A-Z0-9]+(?: [A-Z0-9]+){0,3}$/.test(t) && t.length <= 24; }
    function isNA(t) { return /^n\s*\/?\s*a$/i.test(t); }
    function isFile(t) { if (isNA(t)) return false; return /[\/.](scss|html|js|css|svg|png|json|md)\b/i.test(t) || /^[\w.-]+\/[\w./-]+$/.test(t); }
    function tagKey(t) { return t.toLowerCase().replace(/[^a-z0-9]+/g, "-"); }
    function capitalizeStart(t) {
        t = (t || "").trim();
        if (!t) return "";
        return t.charAt(0).toLocaleUpperCase("es-ES") + t.slice(1);
    }
    function splitInlineEntry(t) {
        var m = /^([^:]{2,72}):\s+(.+)$/.exec(t);
        if (!m) return null;
        var title = m[1].trim();
        var rest = m[2].trim();
        if (!title || !rest) return null;
        return {
            title: title,
            body: isFile(rest) ? [] : [capitalizeStart(rest)],
            files: isFile(rest) ? [rest] : []
        };
    }

    /* Parsea el log en secciones (por etiqueta) → entradas (titular + desarrollo + ficheros). */
    function parse(text) {
        var sections = [], cur = null, entry = null;
        text.split("\n").forEach(function (line) {
            var t = line.trim();
            if (!t) { entry = null; return; }                         // blanco separa entradas
            if (isTag(t)) { cur = { tag: t, entries: [] }; sections.push(cur); entry = null; return; }
            if (!cur) { cur = { tag: "", entries: [] }; sections.push(cur); }
            if (isFile(t)) {
                if (!entry) { entry = { title: "", body: [], files: [] }; cur.entries.push(entry); }
                entry.files.push(t);
            } else {
                if (!entry || entry.files.length) {
                    entry = splitInlineEntry(t) || { title: t, body: [], files: [] };
                    cur.entries.push(entry);
                } else if (!entry.title) {
                    entry.title = t;
                } else {
                    entry.body.push(capitalizeStart(t));
                }
            }
        });
        return sections;
    }

    function renderFile(f) {
        var i = f.lastIndexOf("/");
        var dir = i >= 0 ? f.slice(0, i + 1) : "";
        var name = i >= 0 ? f.slice(i + 1) : f;
        return '<li class="cb-cl__file"><code>'
            + (dir ? '<span class="cb-cl__path">' + esc(dir) + '</span>' : '')
            + '<span class="cb-cl__name">' + esc(name) + '</span></code></li>';
    }
    function renderEntry(e) {
        var title = e.title || "";
        if (title && isNA(title) && !e.body.length && !e.files.length) return '<div class="cb-cl__entry"><p class="cb-cl__na">Sin novedades</p></div>';
        return '<div class="cb-cl__entry">'
            + (title ? '<h3 class="cb-cl__note">' + esc(title) + '</h3>' : '')
            + (e.body.length ? '<div class="cb-cl__body">' + e.body.map(function (p) {
                return '<p class="cb-cl__desc">' + esc(p) + '</p>';
            }).join("") + '</div>' : '')
            + (e.files.length ? '<ul class="cb-cl__files">' + e.files.map(renderFile).join("") + '</ul>' : '')
            + '</div>';
    }
    function renderSection(s) {
        var key = s.tag ? tagKey(s.tag) : "misc";
        var n = s.entries.reduce(function (a, e) { return a + e.files.length; }, 0);
        return '<section class="cb-cl__sec cb-cl__sec--' + key + '">'
            + '<header class="cb-cl__secHead">'
            + (s.tag ? '<span class="cb-cl__tag cb-cl__tag--' + key + '">' + esc(s.tag) + '</span>' : '')
            + (n ? '<span class="cb-cl__count">' + n + (n === 1 ? " fichero" : " ficheros") + '</span>' : '')
            + '</header>'
            + '<div class="cb-cl__entries">' + s.entries.map(renderEntry).join("") + '</div>'
            + '</section>';
    }
    function fmt(text) { return parse((text || "").replace(/\r/g, "").trim()).map(renderSection).join(""); }

    /* "2026-06-02" → "2 jun 2026" (sin Date, parseo manual zero-dep). Si no es ISO, se muestra tal cual. */
    var MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    function fmtDate(d) {
        var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec((d || "").trim());
        if (!m) return (d || "").trim();
        return (+m[3]) + " " + (MONTHS[(+m[2]) - 1] || m[2]) + " " + m[1];
    }

    /* Escape para valores en atributos (esc no cubre comillas; los logs traen rel="noopener"…). */
    function escAttr(s) { return esc(s).replace(/"/g, "&quot;"); }
    /* Meses largos para los divisores dentro de cada año. */
    var MONTHS_FULL = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    /* Etiquetas conocidas para los chips de filtro (en orden), se muestran solo las presentes.
       Tipos de cambio (lifecycle + concern), luego tecnología:
       NEW · UPDATE · FIX · DEPRECATED · REMOVE · A11Y · AMP · HTML · SCSS · CSS · JS. */
    var KNOWN_TAGS = [["new", "NEW"], ["update", "UPDATE"], ["fix", "FIX"], ["deprecated", "DEPRECATED"], ["remove", "REMOVE"],
        ["a11y", "A11Y"], ["amp", "AMP"], ["html", "HTML"], ["scss", "SCSS"], ["css", "CSS"], ["js", "JS"]];

    /* Una release = un <details> (la más reciente abierta). El flex va en un <div> interno
       (Chrome no flexea <summary>). Lleva data-* para el filtrado client-side sin re-render. */
    function renderRelease(rel, isLatest) {
        var date = fmtDate(rel.date);
        var secs = parse((rel.log || "").replace(/\r/g, "").trim());
        var sections = secs.map(renderSection).join("");
        var n = secs.reduce(function (a, s) { return a + s.entries.reduce(function (b, e) { return b + e.files.length; }, 0); }, 0);
        var tagsSet = {}; secs.forEach(function (s) { if (s.tag) tagsSet[tagKey(s.tag)] = 1; });
        var tags = Object.keys(tagsSet);
        var hasVer = !!rel.version;
        var title = hasVer ? ('v.' + esc(rel.version)) : (esc(date) || 'Release');
        var ym = /^(\d{4})-(\d{2})/.exec(rel.date || "");
        var monthFull = ym ? MONTHS_FULL[(+ym[2]) - 1] : "";
        var search = ((rel.date || "") + " " + date + " " + monthFull + " " + (rel.log || "")).toLowerCase();
        return '<details class="cb-cl__rel' + (isLatest ? ' cb-cl__rel--latest' : '') + '"' + (isLatest ? ' open' : '')
            + ' data-default-open="' + (isLatest ? '1' : '0') + '"'
            + ' data-files="' + n + '"'
            + ' data-tags="' + escAttr(tags.join(' ')) + '"'
            + ' data-search="' + escAttr(search) + '">'
            + '<summary class="cb-cl__relSummary">'
            + '<div class="cb-cl__relHead">'
            + '<span class="cb-cl__relVer' + (hasVer ? '' : ' cb-cl__relVer--date') + '">' + title + '</span>'
            + (hasVer && date ? '<span class="cb-cl__relDate">' + esc(date) + '</span>' : '')
            + '<span class="cb-cl__relMeta">'
            + (n ? '<span class="cb-cl__relCount">' + n + (n === 1 ? " fichero" : " ficheros") + '</span>' : '')
            + (isLatest ? '<span class="cb-cl__relBadge">Última</span>' : '')
            + '</span>'
            + '</div>'
            + '</summary>'
            + '<div class="cb-cl__log">'
            + (sections || '<p class="cb-cl__empty">Sin entradas en esta versión.</p>')
            + '</div>'
            + '</details>';
    }

    /* Agrupa releases (ya ordenadas desc) por AÑO → MES, preservando el orden. */
    function groupByYear(rels) {
        var years = [], map = {};
        rels.forEach(function (rel, i) {
            var ym = /^(\d{4})-(\d{2})/.exec(rel.date || "");
            var year = ym ? ym[1] : "Sin fecha", mi = ym ? (+ym[2]) : 0;
            if (!map[year]) { map[year] = { year: year, count: 0, months: [], mMap: {} }; years.push(map[year]); }
            var Y = map[year];
            if (!Y.mMap[mi]) { var mo = { mi: mi, rels: [] }; Y.mMap[mi] = mo; Y.months.push(mo); }
            Y.mMap[mi].rels.push({ rel: rel, isLatest: i === 0 });
            Y.count++;
        });
        return years;
    }

    function renderYear(Y, isLatestYear) {
        var monthsHtml = Y.months.map(function (mo) {
            var label = mo.mi ? MONTHS_FULL[mo.mi - 1] : "";
            var relsHtml = mo.rels.map(function (r) { return renderRelease(r.rel, r.isLatest); }).join("");
            return '<section class="cb-cl__month" data-month>'
                + (label ? '<h3 class="cb-cl__monthHead"><span>' + esc(label) + '</span></h3>' : '')
                + '<div class="cb-cl__monthRels">' + relsHtml + '</div>'
                + '</section>';
        }).join("");
        return '<details class="cb-cl__year' + (isLatestYear ? ' cb-cl__year--latest' : '') + '"' + (isLatestYear ? ' open' : '')
            + ' data-default-open="' + (isLatestYear ? '1' : '0') + '" data-year>'
            + '<summary class="cb-cl__yearSummary"><div class="cb-cl__yearHead">'
            + '<span class="cb-cl__yearLabel">' + esc(Y.year) + '</span>'
            + '<span class="cb-cl__yearCount">' + Y.count + (Y.count === 1 ? ' release' : ' releases') + '</span>'
            + '</div></summary>'
            + '<div class="cb-cl__yearBody">' + monthsHtml + '</div>'
            + '</details>';
    }

    /* Tags presentes en todo el registro → para pintar solo los chips relevantes. */
    function presentTags(rels) {
        var set = {};
        rels.forEach(function (rel) {
            parse((rel.log || "").replace(/\r/g, "").trim()).forEach(function (s) { if (s.tag) set[tagKey(s.tag)] = 1; });
        });
        return set;
    }

    function icon(name, cls) { return (window.SB_ICONS && window.SB_ICONS.svg) ? window.SB_ICONS.svg(name, cls) : ""; }

    function renderToolbar(rels) {
        var present = presentTags(rels);
        var chips = '<button type="button" class="cb-cl__chip" data-tag="" aria-pressed="true">Todos</button>'
            + KNOWN_TAGS.filter(function (t) { return present[t[0]]; }).map(function (t) {
                return '<button type="button" class="cb-cl__chip cb-cl__chip--' + t[0] + '" data-tag="' + t[0] + '" aria-pressed="false">' + t[1] + '</button>';
            }).join("");
        return '<div class="cb-cl__toolbar">'
            + '<div class="cb-cl__search">'
            + icon("magnifying-glass", "cb-cl__searchIco")
            + '<input id="cbClSearch" type="search" class="cb-cl__searchInput" autocomplete="off"'
            + ' placeholder="Buscar en el changelog… (fecha, texto o fichero)" aria-label="Buscar en el changelog">'
            + '<button type="button" class="cb-cl__searchClear" id="cbClSearchClear" hidden aria-label="Limpiar búsqueda">'
            + (icon("x", "cb-cl__searchClearIco") || "✕") + '</button>'
            + '</div>'
            + '<div class="cb-cl__filters">'
            + '<div class="cb-cl__chips" role="group" aria-label="Filtrar por tipo de cambio">' + chips + '</div>'
            + '<div class="cb-cl__resultCount" id="cbClCount" aria-live="polite"></div>'
            + '</div>'
            + '</div>';
    }

    var lead = "Consulta de un vistazo las últimas actualizaciones, mejoras y correcciones del proyecto. "
        + "Nuestra forma de mantenerte al día con su evolución.";
    var body;
    if (releases.length) {
        var years = groupByYear(releases);
        body = renderToolbar(releases)
            + '<div class="cb-cl__releases">'
            + years.map(function (Y, i) { return renderYear(Y, i === 0); }).join("")
            + '</div>'
            + '<p class="cb-cl__noresults" hidden>Sin resultados. Prueba con otra palabra o quita los filtros.</p>';
    } else {
        body = '<p class="cb-cl__empty">Aún no hay releases registradas. Añade un objeto a '
            + '<code>storybook/data/changelog-data.js</code> (<code>SB_CHANGELOG</code>).</p>';
    }

    var overview = '<div class="cb-docs__inner cb-cl">'
        + '<h1 class="cb-cl__title">Changelog</h1>'
        + '<p class="cb-docs__lead">' + lead + '</p>'
        + body
        + '</div>';

    window.SB.register({ id: "changelog", name: "Changelog", group: "Docs", overview: overview, stories: [] });

    /* ─── Interactividad: buscador + chips (delegación en document, registrada UNA vez).
       No re-renderiza: muestra/oculta los <details> ya pintados y colapsa grupos vacíos.
       El estado vive en el DOM (valor del input + aria-pressed del chip), así que sobrevive
       a los re-render del overview que hace el motor al navegar. ─── */
    function clRoot() { var d = document.getElementById("cbDocs"); return d ? d.querySelector(".cb-cl") : null; }

    /* Resalta `q` dentro de notas/rutas (spans de solo texto → innerHTML seguro). Sin q, limpia. */
    function clHighlight(root, q) {
        var els = root.querySelectorAll(".cb-cl__name, .cb-cl__path, .cb-cl__note, .cb-cl__desc");
        Array.prototype.forEach.call(els, function (el) {
            var text = el.textContent;
            var hasMark = !!el.querySelector(".cb-cl__hl");
            if (!q) { if (hasMark) el.textContent = text; return; }
            var lower = text.toLowerCase(), idx = lower.indexOf(q);
            if (idx < 0) { if (hasMark) el.textContent = text; return; }
            var out = "", i = 0;
            while (idx >= 0) {
                out += esc(text.slice(i, idx)) + '<mark class="cb-cl__hl">' + esc(text.slice(idx, idx + q.length)) + '</mark>';
                i = idx + q.length;
                idx = lower.indexOf(q, i);
            }
            el.innerHTML = out + esc(text.slice(i));
        });
    }

    function clApply() {
        var root = clRoot(); if (!root) return;
        var input = root.querySelector("#cbClSearch");
        var q = (input && input.value ? input.value : "").trim().toLowerCase();
        var chip = root.querySelector(".cb-cl__chip[aria-pressed='true']");
        var tag = chip ? (chip.getAttribute("data-tag") || "") : "";
        var filtering = !!(q || tag);
        var clear = root.querySelector("#cbClSearchClear");
        if (clear) clear.hidden = !(input && input.value);
        var nRel = 0, nFiles = 0;
        Array.prototype.forEach.call(root.querySelectorAll(".cb-cl__rel"), function (rel) {
            var okText = !q || (rel.getAttribute("data-search") || "").indexOf(q) >= 0;
            var okTag = !tag || (" " + (rel.getAttribute("data-tags") || "") + " ").indexOf(" " + tag + " ") >= 0;
            var show = okText && okTag;
            rel.hidden = !show;
            if (show) {
                nRel++; nFiles += (+rel.getAttribute("data-files") || 0);
                rel.open = filtering ? true : (rel.getAttribute("data-default-open") === "1");
            }
        });
        Array.prototype.forEach.call(root.querySelectorAll(".cb-cl__month"), function (mo) {
            mo.hidden = !mo.querySelector(".cb-cl__rel:not([hidden])");
        });
        Array.prototype.forEach.call(root.querySelectorAll(".cb-cl__year"), function (yr) {
            var any = yr.querySelector(".cb-cl__rel:not([hidden])");
            yr.hidden = !any;
            if (any) yr.open = filtering ? true : (yr.getAttribute("data-default-open") === "1");
        });
        var count = root.querySelector("#cbClCount");
        if (count) count.textContent = filtering
            ? (nRel + (nRel === 1 ? " release" : " releases") + " · " + nFiles + (nFiles === 1 ? " fichero" : " ficheros"))
            : "";
        var nores = root.querySelector(".cb-cl__noresults");
        if (nores) nores.hidden = nRel > 0;
        clHighlight(root, q);
    }
    document.addEventListener("input", function (e) { if (e.target && e.target.id === "cbClSearch") clApply(); });
    document.addEventListener("search", function (e) { if (e.target && e.target.id === "cbClSearch") clApply(); });
    document.addEventListener("click", function (e) {
        if (!e.target || !e.target.closest) return;
        var clear = e.target.closest("#cbClSearchClear");
        if (clear) {
            var root = clRoot(); if (!root) return;
            var input = root.querySelector("#cbClSearch");
            if (input) { input.value = ""; input.focus(); }
            clApply();
            return;
        }
        var chip = e.target.closest(".cb-cl__chip");
        if (!chip) return;
        var r = clRoot(); if (!r) return;
        Array.prototype.forEach.call(r.querySelectorAll(".cb-cl__chip"), function (c) {
            c.setAttribute("aria-pressed", c === chip ? "true" : "false");
        });
        clApply();
    });
})();
