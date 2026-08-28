/* 42DS Storybook - Gallery */
(function () {
    "use strict";
    if (!window.SB || !window.SB.register) return;

    var esc = window.SB.helpers.esc;
    var docsTable = window.SB.helpers.docsTable;
    var ROOT = "/cds-statics/assets/img/icons/";
    var FILES = Array.isArray(window.SB_ICON_GALLERY_FILES) ? window.SB_ICON_GALLERY_FILES.slice() : [];
    var CHUNKS = window.SB_ICON_GALLERY_CHUNKS || {};
    var INLINE = window.SB_ICON_GALLERY_INLINE || (window.SB_ICON_GALLERY_INLINE = {});
    var REQUESTS = Object.create(null);
    var FILTER_MEMO = { key: "", items: [] };
    var MOUNT = {
        stageEl: null,
        root: null,
        refreshPanels: null,
        syncRaf: 0,
        searchTimer: 0,
        searchSelectionStart: 0,
        searchSelectionEnd: 0,
        copyTimer: 0,
        copiedPath: ""
    };

    function normalize(text) {
        return String(text || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    function title(text) {
        return String(text || "")
            .split(/[-_]+/)
            .filter(Boolean)
            .map(function (part) { return part.charAt(0).toUpperCase() + part.slice(1); })
            .join(" ");
    }

    function describe(file) {
        var stem = file.replace(/\.svg$/i, "");
        var exact = /^(.*?)-(line|fill)-(dark|light)$/.exec(stem);
        var simple = exact ? null : /^(.*?)-(dark|light)$/.exec(stem);
        var family = stem;
        var style = "misc";
        var tone = "light";
        var standard = false;

        if (exact) {
            family = exact[1];
            style = exact[2];
            tone = exact[3];
            standard = true;
        } else if (simple) {
            family = simple[1];
            style = "shape";
            tone = simple[2];
        }

        var familyLabel = title(family.replace(/^icon-/, "").replace(/^ico-/, ""));
        var typeLabel = standard
            ? (tone === "dark" ? "Dark" : "Light") + " · " + (style === "line" ? "Line" : "Fill")
            : (tone === "dark" ? "Dark" : "Light") + (style !== "misc" && style !== "shape" ? " · " + title(style) : "");

        return {
            file: file,
            path: "cds-statics/assets/img/icons/" + file,
            src: ROOT + file,
            family: family,
            familyLabel: familyLabel || file,
            style: style,
            tone: tone,
            standard: standard,
            typeLabel: typeLabel || "Misc",
            search: normalize([file, family, familyLabel, style, tone, typeLabel].join(" "))
        };
    }

    var ICONS = FILES.map(describe);
    var DEFAULT_ICON = ICONS.find(function (icon) { return icon.file === "icon-alert-line-light.svg"; }) || ICONS[0] || null;
    var STATE = {
        query: "",
        filter: "all",
        selected: DEFAULT_ICON ? DEFAULT_ICON.file : ""
    };

    function byFile(file) {
        return ICONS.find(function (icon) { return icon.file === file; }) || null;
    }

    function selectedIcon() {
        return byFile(STATE.selected) || DEFAULT_ICON;
    }

    function parseSvgColor(raw) {
        var value = String(raw || "").trim().toLowerCase();
        var hex;
        if (!value || value === "none" || value === "transparent" || value === "currentcolor" || value.indexOf("url(") === 0) return null;
        if (value.charAt(0) === "#") {
            hex = value.slice(1);
            if (hex.length === 3) {
                return {
                    r: parseInt(hex.charAt(0) + hex.charAt(0), 16),
                    g: parseInt(hex.charAt(1) + hex.charAt(1), 16),
                    b: parseInt(hex.charAt(2) + hex.charAt(2), 16),
                    a: 1
                };
            }
            if (hex.length === 6) {
                return {
                    r: parseInt(hex.slice(0, 2), 16),
                    g: parseInt(hex.slice(2, 4), 16),
                    b: parseInt(hex.slice(4, 6), 16),
                    a: 1
                };
            }
        }
        if (/^rgba?\(/.test(value)) {
            var parts = value.replace(/rgba?\(/, "").replace(")", "").split(",").map(function (part) { return part.trim(); });
            if (parts.length >= 3) {
                return {
                    r: parseFloat(parts[0]) || 0,
                    g: parseFloat(parts[1]) || 0,
                    b: parseFloat(parts[2]) || 0,
                    a: parts.length > 3 ? parseFloat(parts[3]) || 1 : 1
                };
            }
        }
        return null;
    }

    function rgbHex(color) {
        function part(value) { return Math.round(value).toString(16).padStart(2, "0"); }
        return "#" + part(color.r) + part(color.g) + part(color.b);
    }

    function extractSvgColors(svg) {
        var matches = [];
        var seen = Object.create(null);
        var attrRe = /\b(?:fill|stroke)=["']([^"']+)["']/gi;
        var styleRe = /\b(?:fill|stroke)\s*:\s*([^;"']+)/gi;
        var m;

        while ((m = attrRe.exec(svg))) matches.push(m[1]);
        while ((m = styleRe.exec(svg))) matches.push(m[1]);

        return matches.reduce(function (acc, raw) {
            var color = parseSvgColor(raw);
            var key;
            if (!color || color.a === 0) return acc;
            key = rgbHex(color);
            if (seen[key]) return acc;
            seen[key] = true;
            acc.push(color);
            return acc;
        }, []);
    }

    function selectedPreviewBg() {
        var icon = selectedIcon();
        if (!icon) return { r: 248, g: 250, b: 252, a: 1 };
        if (icon.tone === "dark") return { r: 17, g: 24, b: 39, a: 1 };
        return { r: 248, g: 250, b: 252, a: 1 };
    }

    function readInline(file) {
        return INLINE[file] || "";
    }

    function matches(icon) {
        var q = normalize(STATE.query);
        if (q && icon.search.indexOf(q) < 0) return false;
        if (STATE.filter === "all") return true;
        if (STATE.filter === "standard") return icon.standard;
        if (STATE.filter === "misc") return !icon.standard;
        if (STATE.filter === "dark") return icon.tone === "dark";
        if (STATE.filter === "light") return icon.tone === "light";
        if (STATE.filter === "line") return icon.style === "line";
        if (STATE.filter === "fill") return icon.style === "fill";
        return true;
    }

    function filteredIcons() {
        var key = STATE.query + "|" + STATE.filter;
        if (FILTER_MEMO.key === key) return FILTER_MEMO.items;
        FILTER_MEMO = {
            key: key,
            items: ICONS.filter(matches)
        };
        return FILTER_MEMO.items;
    }

    function refreshPanels() {
        if (typeof MOUNT.refreshPanels === "function") MOUNT.refreshPanels();
    }

    function loadChunk(src) {
        if (!src) return Promise.reject(new Error("chunk missing"));
        if (REQUESTS[src]) return REQUESTS[src];
        REQUESTS[src] = new Promise(function (resolve, reject) {
            var script = document.createElement("script");
            script.src = src;
            script.defer = true;
            script.onload = function () {
                delete REQUESTS[src];
                resolve(INLINE);
            };
            script.onerror = function () {
                delete REQUESTS[src];
                reject(new Error("chunk load error: " + src));
            };
            document.head.appendChild(script);
        });
        return REQUESTS[src];
    }

    function requestCode(file, refresh) {
        var icon = byFile(file);
        var cached = icon ? readInline(file) : "";
        var chunkSrc;
        if (!icon) return Promise.resolve("");
        if (cached) return Promise.resolve(cached);
        chunkSrc = CHUNKS[file];
        if (!chunkSrc) {
            INLINE[file] = "<!-- No existe chunk inline para " + icon.path + " -->";
            if (refresh && STATE.selected === file) refreshPanels();
            return Promise.resolve(INLINE[file]);
        }
        return loadChunk(chunkSrc)
            .then(function () {
                if (!INLINE[file]) INLINE[file] = "<!-- El chunk no contiene " + icon.path + " -->";
                if (refresh && STATE.selected === file) refreshPanels();
                return INLINE[file];
            })
            .catch(function () {
                INLINE[file] = "<!-- No se pudo cargar el inline de " + icon.path + " -->";
                if (refresh && STATE.selected === file) refreshPanels();
                return INLINE[file];
            });
    }

    function selectedCode() {
        var icon = selectedIcon();
        var cached = icon ? readInline(icon.file) : "";
        if (!icon) return "";
        if (cached) return cached;
        requestCode(icon.file, true);
        return "";
    }

    function codeTopHtml() {
        var icon = selectedIcon();
        var cached = icon ? readInline(icon.file) : "";
        if (!icon) return '<div class="cb-code__warn" role="note">No hay un icono seleccionado.</div>';
        if (cached) {
            return '<div class="cb-code__warn" role="note">SVG inline disponible desde cache local para <code>' + esc(icon.path) + "</code>.</div>";
        }
        if (CHUNKS[icon.file] && REQUESTS[CHUNKS[icon.file]]) {
            return '<style>'
                + '.cb-ig-code__loading{display:flex;align-items:center;gap:10px;padding:12px 14px;margin-bottom:12px;border:1px solid #dbe7ff;border-radius:10px;background:#eff6ff;color:#1d4ed8;font:600 13px/1.4 Inter,system-ui,sans-serif}'
                + '.cb-ig-code__dot{width:10px;height:10px;border-radius:999px;background:#1d4ed8;animation:cbIgPulse .9s ease-in-out infinite alternate}'
                + '@keyframes cbIgPulse{from{opacity:.25;transform:scale(.8)}to{opacity:1;transform:scale(1)}}'
                + '</style>'
                + '<div class="cb-ig-code__loading" role="status" aria-live="polite"><span class="cb-ig-code__dot" aria-hidden="true"></span><span>Cargando inline SVG optimizado de <code>' + esc(icon.path) + "</code>...</span></div>";
        }
        return '<div class="cb-code__warn" role="note">Abre la pestaña <strong>Code</strong> para cargar el inline SVG optimizado de <code>' + esc(icon.path) + "</code>.</div>";
    }

    function contrastTopHtml() {
        var icon = selectedIcon();
        var cached = icon ? readInline(icon.file) : "";
        if (!icon) return '<p class="cb-note">No hay un icono seleccionado.</p>';
        if (cached) {
            return '<p class="cb-note">Analisis limitado al SVG inline del icono seleccionado y a su fondo de preview.</p>';
        }
        if (CHUNKS[icon.file] && REQUESTS[CHUNKS[icon.file]]) {
            return '<p class="cb-note">Cargando el inline SVG para auditar el contraste del icono seleccionado…</p>';
        }
        return '<p class="cb-note">Abre el analisis o la pestaña <strong>Code</strong> para cargar el inline SVG del icono seleccionado.</p>';
    }

    function contrastEmptyHtml() {
        return '<p class="cb-note">Todavia no hay datos de contraste para el icono seleccionado.</p>';
    }

    function contrastHintHtml() {
        return '<p class="cb-cn__hint">En Gallery el contraste se calcula solo sobre los colores del SVG seleccionado frente al fondo real de su preview. No se incluyen textos ni otros elementos del canvas.</p>';
    }

    function contrastAudit(ctx) {
        var icon = selectedIcon();
        var svg = icon ? readInline(icon.file) : "";
        var bg = selectedPreviewBg();
        var ratio = ctx && ctx.helpers ? ctx.helpers.contrastRatio : null;
        var colors;
        if (!icon) return [];
        if (!svg) {
            requestCode(icon.file, true);
            return [];
        }
        colors = extractSvgColors(svg);
        return colors.map(function (fg) {
            return {
                fg: fg,
                bg: bg,
                isLarge: false,
                ratio: ratio ? ratio(fg, bg) : 1,
                tags: { svg: 1 }
            };
        });
    }

    function chip(value, label) {
        return '<button type="button" class="cb-ig__filter" data-ig-filter="' + esc(value) + '" aria-pressed="' + (STATE.filter === value ? "true" : "false") + '">' + esc(label) + "</button>";
    }

    function showCopied(path) {
        MOUNT.copiedPath = path;
        if (MOUNT.copyTimer) clearTimeout(MOUNT.copyTimer);
        scheduleSync();
        MOUNT.copyTimer = setTimeout(function () {
            MOUNT.copyTimer = 0;
            MOUNT.copiedPath = "";
            scheduleSync();
        }, 1600);
    }

    function copyText(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text);
        }
        return new Promise(function (resolve, reject) {
            var ta = document.createElement("textarea");
            ta.value = text;
            ta.setAttribute("readonly", "");
            ta.style.position = "fixed";
            ta.style.opacity = "0";
            document.body.appendChild(ta);
            ta.select();
            try {
                document.execCommand("copy");
                document.body.removeChild(ta);
                resolve();
            } catch (error) {
                document.body.removeChild(ta);
                reject(error);
            }
        });
    }

    function row(icon) {
        var copied = MOUNT.copiedPath === icon.path;
        return '<button type="button" class="cb-ig__row' + (STATE.selected === icon.file ? " is-active" : "") + '" data-ig-file="' + esc(icon.file) + '">'
            + '<span class="cb-ig__preview' + (icon.tone === "dark" ? " cb-ig__preview--dark" : "") + '">'
            + '<img src="' + esc(icon.src) + '" alt="' + esc(icon.familyLabel) + '" loading="lazy" decoding="async" fetchpriority="low">'
            + "</span>"
            + '<span class="cb-ig__main">'
            + '<span class="cb-ig__name">' + esc(icon.familyLabel) + "</span>"
            + '<span class="cb-ig__meta">'
            + '<span class="cb-ig__chip">' + esc(icon.typeLabel || "Misc") + "</span>"
            + (icon.standard ? '<span class="cb-ig__chip cb-ig__chip--ok">4-tipology set</span>' : '<span class="cb-ig__chip cb-ig__chip--muted">Misc</span>')
            + "</span>"
            + "</span>"
            + '<span class="cb-ig__path' + (copied ? " is-copied" : "") + '" data-ig-copy="' + esc(icon.path) + '" title="Copiar ruta" aria-label="Copiar ruta ' + esc(icon.path) + '">'
            + '<code>' + esc(icon.path) + "</code>"
            + '<span class="cb-ig__copyState">' + (copied ? "Copiado" : "Copiar") + "</span>"
            + "</span>"
            + "</button>";
    }

    var STYLE = '<style>'
        + '.cb-ig{display:flex;flex-direction:column;gap:16px;padding:16px;background:#f7f8fa;font-family:Inter,system-ui,sans-serif}'
        + '.cb-ig__hero{display:grid;gap:12px;padding:16px;border:1px solid #dde2ea;background:#fff;border-radius:10px}'
        + '.cb-ig__heroTop{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-start;justify-content:space-between}'
        + '.cb-ig__title{margin:0;font:700 20px/1.1 Inter,system-ui,sans-serif;color:#0f172a}'
        + '.cb-ig__lead{margin:6px 0 0;font:400 14px/1.5 Inter,system-ui,sans-serif;color:#475569;max-width:860px}'
        + '.cb-ig__selected{display:grid;gap:6px;min-width:300px}'
        + '.cb-ig__selectedLabel{font:600 11px/1.2 Inter,system-ui,sans-serif;letter-spacing:.04em;text-transform:uppercase;color:#64748b}'
        + '.cb-ig__selectedName{font:700 14px/1.3 Inter,system-ui,sans-serif;color:#0f172a}'
        + '.cb-ig__selectedPath{display:block;padding:10px 12px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0;color:#0f172a;font:500 12px/1.4 "JetBrains Mono",monospace;word-break:break-all}'
        + '.cb-ig__selectedPreview{display:flex;align-items:center;gap:10px}'
        + '.cb-ig__selectedThumb{display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:10px;background:#f8fafc;border:1px solid #e2e8f0}'
        + '.cb-ig__selectedThumb--dark{background:#111827;border-color:#111827}'
        + '.cb-ig__selectedThumb img{max-width:22px;max-height:22px;display:block}'
        + '.cb-ig__toolbar{display:flex;flex-wrap:wrap;gap:12px;align-items:center}'
        + '.cb-ig__search{flex:1 1 280px;padding:11px 14px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;color:#0f172a;font:400 14px/1.2 Inter,system-ui,sans-serif;direction:ltr;unicode-bidi:plaintext;text-align:left}'
        + '.cb-ig__search:focus,.cb-ig__list:focus{outline:2px solid #0f62fe;outline-offset:1px}'
        + '.cb-ig__chips{display:flex;flex-wrap:wrap;gap:8px}'
        + '.cb-ig__filter{padding:8px 10px;border:1px solid #cbd5e1;border-radius:999px;background:#fff;color:#334155;font:600 12px/1 Inter,system-ui,sans-serif;cursor:pointer}'
        + '.cb-ig__filter[aria-pressed="true"]{background:#0f62fe;border-color:#0f62fe;color:#fff}'
        + '.cb-ig__summary{font:500 12px/1.4 Inter,system-ui,sans-serif;color:#475569}'
        + '.cb-ig__listShell{border:1px solid #dde2ea;border-radius:12px;background:#fff;overflow:hidden}'
        + '.cb-ig__list{display:grid;background:#fff}'
        + '.cb-ig__row{display:grid;grid-template-columns:64px minmax(180px,260px) minmax(280px,1fr);gap:14px;align-items:center;width:100%;min-height:62px;padding:10px 16px;border:0;border-bottom:1px solid #edf2f7;background:#fff;text-align:left;cursor:pointer;content-visibility:auto;contain-intrinsic-size:62px}'
        + '.cb-ig__row:hover,.cb-ig__row:focus-visible{background:#f8fbff;outline:none}'
        + '.cb-ig__row.is-active{background:#eff6ff;box-shadow:inset 3px 0 0 #0f62fe}'
        + '.cb-ig__preview{display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:10px;background:#f8fafc;border:1px solid #e2e8f0}'
        + '.cb-ig__preview--dark{background:#111827;border-color:#111827}'
        + '.cb-ig__preview img{max-width:22px;max-height:22px;display:block}'
        + '.cb-ig__main{display:grid;gap:8px;min-width:0}'
        + '.cb-ig__name{font:700 13px/1.35 Inter,system-ui,sans-serif;color:#0f172a;word-break:break-word}'
        + '.cb-ig__meta{display:flex;flex-wrap:wrap;gap:6px}'
        + '.cb-ig__chip{padding:4px 8px;border-radius:999px;background:#eff6ff;color:#1d4ed8;font:600 11px/1.1 Inter,system-ui,sans-serif}'
        + '.cb-ig__chip--ok{background:#ecfdf5;color:#047857}'
        + '.cb-ig__chip--muted{background:#f1f5f9;color:#64748b}'
        + '.cb-ig__path{display:flex;align-items:center;justify-content:space-between;gap:10px;min-width:0;padding:8px 10px;border:1px solid transparent;border-radius:8px;color:#0f172a;cursor:pointer}'
        + '.cb-ig__path:hover{background:#f8fafc;border-color:#dbe3ee}'
        + '.cb-ig__path code{display:block;min-width:0;flex:1;color:#0f172a;font:500 11px/1.45 "JetBrains Mono",monospace;word-break:break-all}'
        + '.cb-ig__copyState{flex-shrink:0;padding:4px 8px;border-radius:999px;background:#f1f5f9;color:#475569;font:600 11px/1 Inter,system-ui,sans-serif}'
        + '.cb-ig__path.is-copied{background:#ecfdf5;border-color:#a7f3d0}'
        + '.cb-ig__path.is-copied .cb-ig__copyState{background:#d1fae5;color:#047857}'
        + '.cb-ig__empty{padding:28px;border:1px dashed #cbd5e1;border-radius:10px;background:#fff;color:#475569;font:500 14px/1.5 Inter,system-ui,sans-serif;text-align:center}'
        + '@media (max-width:880px){.cb-ig__row{grid-template-columns:64px 1fr;align-items:start}.cb-ig__main{grid-column:2}.cb-ig__path{grid-column:2}}'
        + '@media (max-width:700px){.cb-ig{padding:12px}.cb-ig__hero{padding:14px}.cb-ig__row{gap:8px;padding:10px 12px}.cb-ig__selected{min-width:0}}'
        + '</style>';

    function renderBody() {
        var selected = selectedIcon();
        var items = filteredIcons();
        var selectedPreview = selected
            ? '<span class="cb-ig__selectedPreview">'
                + '<span class="cb-ig__selectedThumb' + (selected.tone === "dark" ? " cb-ig__selectedThumb--dark" : "") + '">'
                + '<img src="' + esc(selected.src) + '" alt="' + esc(selected.familyLabel) + '" decoding="async">'
                + "</span>"
                + '<strong class="cb-ig__selectedName">' + esc(selected.familyLabel) + "</strong>"
                + "</span>"
            : '<strong class="cb-ig__selectedName">Sin iconos</strong>';
        return '<div class="cb-ig__hero">'
            + '<div class="cb-ig__heroTop">'
            + "<div>"
            + '<h2 class="cb-ig__title">Gallery</h2>'
            + '<p class="cb-ig__lead">Catalogo completo de SVG en <code>cds-statics/assets/img/icons</code>. La lista mantiene miniaturas y el tab <strong>Code</strong> carga un inline SVG optimizado desde chunks locales generados en build.</p>'
            + "</div>"
            + '<div class="cb-ig__selected">'
            + '<span class="cb-ig__selectedLabel">Icono seleccionado</span>'
            + selectedPreview
            + '<code class="cb-ig__selectedPath">' + esc(selected ? selected.path : "") + "</code>"
            + "</div>"
            + "</div>"
            + '<div class="cb-ig__toolbar">'
            + '<input type="search" class="cb-ig__search" data-ig-search-input placeholder="Buscar por nombre, ruta o tipologia" value="' + esc(STATE.query) + '" aria-label="Buscar iconos">'
            + '<div class="cb-ig__chips" role="group" aria-label="Filtrar iconos">'
            + chip("all", "Todos")
            + chip("standard", "4 tipologias")
            + chip("light", "Light")
            + chip("dark", "Dark")
            + chip("line", "Line")
            + chip("fill", "Fill")
            + chip("misc", "Otros")
            + "</div>"
            + '<span class="cb-ig__summary">' + items.length + " de " + ICONS.length + " iconos</span>"
            + "</div>"
            + "</div>"
            + (items.length
                ? '<div class="cb-ig__listShell">'
                    + '<div class="cb-ig__list" aria-label="Listado de iconos">' + items.map(row).join("") + "</div>"
                    + "</div>"
                : '<div class="cb-ig__empty">No hay iconos que coincidan con el filtro actual.</div>');
    }

    function renderGallery() {
        return STYLE + '<section class="cb-ig" data-cb-icon-gallery-root>' + renderBody() + "</section>";
    }

    function syncCanvas() {
        var root = MOUNT.root || (MOUNT.stageEl && MOUNT.stageEl.querySelector("[data-cb-icon-gallery-root]"));
        var frameActive;
        var restoreSearch = false;
        var start = MOUNT.searchSelectionStart;
        var end = MOUNT.searchSelectionEnd;
        if (!root) return;
        frameActive = MOUNT.stageEl && MOUNT.stageEl.ownerDocument ? MOUNT.stageEl.ownerDocument.activeElement : null;
        restoreSearch = !!(frameActive && frameActive.getAttribute && frameActive.getAttribute("data-ig-search-input") !== null);
        if (restoreSearch) {
            start = typeof frameActive.selectionStart === "number" ? frameActive.selectionStart : STATE.query.length;
            end = typeof frameActive.selectionEnd === "number" ? frameActive.selectionEnd : start;
        }
        MOUNT.root = root;
        root.innerHTML = renderBody();
        if (restoreSearch) {
            frameActive = root.querySelector("[data-ig-search-input]");
            if (frameActive) {
                frameActive.focus();
                if (typeof frameActive.setSelectionRange === "function") {
                    frameActive.setSelectionRange(start, end);
                }
            }
        }
    }

    function scheduleSync() {
        if (MOUNT.syncRaf) cancelAnimationFrame(MOUNT.syncRaf);
        MOUNT.syncRaf = requestAnimationFrame(function () {
            MOUNT.syncRaf = 0;
            syncCanvas();
        });
    }

    function onClick(event) {
        var filterBtn = event.target.closest("[data-ig-filter]");
        var copyEl = event.target.closest("[data-ig-copy]");
        var cardEl;
        if (copyEl) {
            copyText(copyEl.getAttribute("data-ig-copy") || "").then(function () {
                showCopied(copyEl.getAttribute("data-ig-copy") || "");
            }).catch(function () {});
            return;
        }
        if (filterBtn) {
            STATE.filter = filterBtn.getAttribute("data-ig-filter") || "all";
            scheduleSync();
            return;
        }
        cardEl = event.target.closest("[data-ig-file]");
        if (!cardEl) return;
        STATE.selected = cardEl.getAttribute("data-ig-file") || STATE.selected;
        refreshPanels();
        scheduleSync();
    }

    function onInput(event) {
        var input = event.target.closest("[data-ig-search-input]");
        if (!input) return;
        STATE.query = input.value || "";
        MOUNT.searchSelectionStart = typeof input.selectionStart === "number" ? input.selectionStart : STATE.query.length;
        MOUNT.searchSelectionEnd = typeof input.selectionEnd === "number" ? input.selectionEnd : MOUNT.searchSelectionStart;
        if (MOUNT.searchTimer) clearTimeout(MOUNT.searchTimer);
        MOUNT.searchTimer = setTimeout(function () {
            MOUNT.searchTimer = 0;
            scheduleSync();
        }, 100);
    }

    var overview = '<div class="cb-docs__inner">'
        + "<h1>Gallery</h1>"
        + '<p class="cb-docs__lead">Inventario de assets SVG de <code>cds-statics/assets/img/icons</code> dentro del Storybook. El catalogo filtra sobre todos los ficheros disponibles y desacopla por completo la navegacion visual de la carga del SVG fuente.</p>'
        + '<div class="cb-callout">Las variantes <strong>Dark</strong> se pintan sobre fondo oscuro dentro de la preview para asegurar contraste visual en la lista.</div>'
        + "<h2>Que documenta</h2>"
        + docsTable({
            columns: ["Aspecto", "Comportamiento"],
            rows: [
                ["Ruta", "<code>cds-statics/assets/img/icons/&lt;fichero&gt;.svg</code> visible en cada fila."],
                ["Catalogo", "La lista muestra todo el inventario filtrado con miniaturas en cada fila, usando lazy loading nativo y render diferido por fila."],
                ["Code", "El inline SVG optimizado se solicita unicamente al entrar en <strong>Code</strong> con un icono seleccionado. Mientras tanto se muestra un estado de carga."],
                ["Cache", "Cache agresiva en memoria del runtime + cache HTTP del chunk local ya cargado."],
                ["Fondo oscuro", "La preview del icono seleccionado mantiene fondo oscuro para variantes <code>-dark</code>."]
            ]
        })
        + "<h2>Cobertura</h2>"
        + '<p>La fuente de datos actual incluye <strong>' + ICONS.length + "</strong> ficheros SVG. Si se anaden o retiran assets de la carpeta, hay que regenerar <code>storybook/data/icon-gallery-data.js</code> y los chunks de <code>storybook/data/icon-gallery-inline/</code> con <code>npm run build:storybook:icons</code>.</p>"
        + '<p class="cb-src">Fuente: <code>cds-statics/assets/img/icons</code></p>'
        + "</div>";

    window.SB.register({
        id: "icon-gallery",
        name: "Icons",
        group: "Gallery",
        sort: 999,
        signals: ["js"],
        overview: overview,
        stories: [
            {
                id: "all-icons",
                name: "Icons",
                hint: ICONS.length + " SVG · filtered catalog + lazy code",
                kind: "gallery",
                full: true,
                render: renderGallery,
                code: selectedCode,
                codeTopHtml: codeTopHtml,
                contrastAudit: contrastAudit,
                contrastTopHtml: contrastTopHtml,
                contrastEmptyHtml: contrastEmptyHtml,
                contrastHintHtml: contrastHintHtml,
                onMount: function (ctx) {
                    MOUNT.stageEl = ctx && ctx.stageEl ? ctx.stageEl : null;
                    MOUNT.root = MOUNT.stageEl ? MOUNT.stageEl.querySelector("[data-cb-icon-gallery-root]") : null;
                    MOUNT.refreshPanels = ctx && typeof ctx.refreshPanels === "function" ? ctx.refreshPanels : null;
                    if (MOUNT.stageEl) {
                        MOUNT.stageEl.addEventListener("click", onClick);
                        MOUNT.stageEl.addEventListener("input", onInput);
                    }
                    refreshPanels();
                    return function () {
                        if (MOUNT.stageEl) {
                            MOUNT.stageEl.removeEventListener("click", onClick);
                            MOUNT.stageEl.removeEventListener("input", onInput);
                        }
                        if (MOUNT.syncRaf) cancelAnimationFrame(MOUNT.syncRaf);
                        if (MOUNT.searchTimer) clearTimeout(MOUNT.searchTimer);
                        if (MOUNT.copyTimer) clearTimeout(MOUNT.copyTimer);
                        MOUNT.stageEl = null;
                        MOUNT.root = null;
                        MOUNT.refreshPanels = null;
                        MOUNT.syncRaf = 0;
                        MOUNT.searchTimer = 0;
                        MOUNT.searchSelectionStart = 0;
                        MOUNT.searchSelectionEnd = 0;
                        MOUNT.copyTimer = 0;
                        MOUNT.copiedPath = "";
                    };
                }
            }
        ]
    });
})();
