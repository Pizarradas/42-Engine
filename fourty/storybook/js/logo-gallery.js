/* 42DS Storybook - Gallery / Logos */
(function () {
    "use strict";
    if (!window.SB || !window.SB.register) return;

    var esc = window.SB.helpers.esc;
    var docsTable = window.SB.helpers.docsTable;
    var DATA = window.SB_LOGO_GALLERY_DATA || { groups: [], items: [], chunks: {} };
    var GROUPS = Array.isArray(DATA.groups) ? DATA.groups.slice() : [];
    var ITEMS = Array.isArray(DATA.items) ? DATA.items.slice() : [];
    var CHUNKS = DATA.chunks || {};
    var INLINE = window.SB_LOGO_GALLERY_INLINE || (window.SB_LOGO_GALLERY_INLINE = {});
    var REQUESTS = Object.create(null);
    var FILTER_MEMO = { key: "", groups: [] };
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
            .replace(/[-_]+/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .replace(/\b\w/g, function (char) { return char.toUpperCase(); });
    }

    function labelFromStem(stem) {
        return title(
            String(stem || "")
                .replace(/^pin maps\s+/i, "")
                .replace(/^logo\s+/i, "")
                .replace(/^header\s+/i, "")
                .replace(/^ft recirculation\s+/i, "")
                .replace(/^logo cr\s+/i, "")
        );
    }

    var LOGOS = ITEMS.map(function (item) {
        var label = labelFromStem(String(item.stem || item.file || "").replace(/\.(svg|png)$/i, ""));
        var patterns = Array.isArray(item.canonicalPatterns) ? item.canonicalPatterns : [];
        return Object.assign({}, item, {
            label: label || item.file,
            search: normalize([
                item.file,
                item.relPath,
                item.groupName,
                label,
                item.canonicalPattern,
                patterns.join(" "),
                item.ext,
                item.isOg ? "opengraph og" : "",
                item.followsPattern ? "patron canonico" : "sin patron"
            ].join(" "))
        });
    });

    var DEFAULT_LOGO = LOGOS[0] || null;
    var STATE = {
        query: "",
        type: "all",
        pattern: "all",
        category: "all",
        selected: DEFAULT_LOGO ? DEFAULT_LOGO.relPath : "",
        expanded: GROUPS.reduce(function (acc, group, index) {
            acc[group.id] = index === 0;
            return acc;
        }, {})
    };

    function byPath(relPath) {
        return LOGOS.find(function (item) { return item.relPath === relPath; }) || null;
    }

    function selectedLogo() {
        return byPath(STATE.selected) || DEFAULT_LOGO;
    }

    function readInline(relPath) {
        return INLINE[relPath] || "";
    }

    function isFilterActive() {
        return !!(STATE.query || STATE.type !== "all" || STATE.category !== "all");
    }

    function matches(item) {
        var q = normalize(STATE.query);
        if (q && item.search.indexOf(q) < 0) return false;
        if (STATE.category !== "all" && item.groupId !== STATE.category) return false;
        if (STATE.type === "svg" && !item.isSvg) return false;
        if (STATE.type === "png" && item.ext !== "png") return false;
        if (STATE.type === "og" && !item.isOg) return false;
        return true;
    }

    function filteredGroups() {
        var key = [STATE.query, STATE.type, STATE.category].join("|");
        if (FILTER_MEMO.key === key) return FILTER_MEMO.groups;
        FILTER_MEMO = {
            key: key,
            groups: GROUPS.map(function (group) {
                return {
                    id: group.id,
                    name: group.name,
                    patterns: group.patterns || [],
                    items: LOGOS.filter(function (item) {
                        return item.groupId === group.id && matches(item);
                    })
                };
            }).filter(function (group) { return group.items.length; })
        };
        return FILTER_MEMO.groups;
    }

    function selectedCode() {
        var logo = selectedLogo();
        var cached;
        if (!logo) return "";
        if (!logo.isSvg) return '<img src="/' + esc(logo.path) + '" alt="">';
        cached = readInline(logo.relPath);
        if (cached) return cached;
        requestCode(logo.relPath, true);
        return "";
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

    function refreshPanels() {
        if (typeof MOUNT.refreshPanels === "function") MOUNT.refreshPanels();
    }

    function requestCode(relPath, refresh) {
        var logo = byPath(relPath);
        var cached = logo ? readInline(relPath) : "";
        var chunkSrc;
        if (!logo) return Promise.resolve("");
        if (!logo.isSvg) return Promise.resolve('<img src="/' + logo.path + '" alt="">');
        if (cached) return Promise.resolve(cached);
        chunkSrc = CHUNKS[relPath];
        if (!chunkSrc) {
            INLINE[relPath] = "<!-- No existe chunk inline para " + logo.path + " -->";
            if (refresh && STATE.selected === relPath) refreshPanels();
            return Promise.resolve(INLINE[relPath]);
        }
        return loadChunk(chunkSrc)
            .then(function () {
                if (!INLINE[relPath]) INLINE[relPath] = "<!-- El chunk no contiene " + logo.path + " -->";
                if (refresh && STATE.selected === relPath) refreshPanels();
                return INLINE[relPath];
            })
            .catch(function () {
                INLINE[relPath] = "<!-- No se pudo cargar el inline de " + logo.path + " -->";
                if (refresh && STATE.selected === relPath) refreshPanels();
                return INLINE[relPath];
            });
    }

    function codeTopHtml() {
        var logo = selectedLogo();
        var cached = logo && logo.isSvg ? readInline(logo.relPath) : "";
        if (!logo) return '<div class="cb-code__warn" role="note">No hay un logo seleccionado.</div>';
        if (!logo.isSvg) {
            return '<div class="cb-code__warn" role="note">Este asset es <code>.' + esc(logo.ext) + '</code>. En <strong>Code</strong> se muestra el markup canonico con <code>&lt;img&gt;</code> y su ruta.</div>';
        }
        if (cached) {
            return '<div class="cb-code__warn" role="note">SVG inline disponible desde cache local para <code>' + esc(logo.path) + "</code>.</div>";
        }
        if (CHUNKS[logo.relPath] && REQUESTS[CHUNKS[logo.relPath]]) {
            return '<style>'
                + '.cb-lg-code__loading{display:flex;align-items:center;gap:10px;padding:12px 14px;margin-bottom:12px;border:1px solid #dbe7ff;border-radius:10px;background:#eff6ff;color:#1d4ed8;font:600 13px/1.4 Inter,system-ui,sans-serif}'
                + '.cb-lg-code__dot{width:10px;height:10px;border-radius:999px;background:#1d4ed8;animation:cbLgPulse .9s ease-in-out infinite alternate}'
                + '@keyframes cbLgPulse{from{opacity:.25;transform:scale(.8)}to{opacity:1;transform:scale(1)}}'
                + '</style>'
                + '<div class="cb-lg-code__loading" role="status" aria-live="polite"><span class="cb-lg-code__dot" aria-hidden="true"></span><span>Cargando inline SVG optimizado de <code>' + esc(logo.path) + "</code>...</span></div>";
        }
        return '<div class="cb-code__warn" role="note">Abre la pestaña <strong>Code</strong> para cargar el inline SVG optimizado de <code>' + esc(logo.path) + "</code>.</div>";
    }

    function contrastTopHtml() {
        var logo = selectedLogo();
        var cached = logo && logo.isSvg ? readInline(logo.relPath) : "";
        if (!logo) return '<p class="cb-note">No hay un logo seleccionado.</p>';
        if (!logo.isSvg) return '<p class="cb-note">El analisis de contraste solo esta disponible para logos SVG.</p>';
        if (cached) return '<p class="cb-note">Analisis limitado al SVG inline del logo seleccionado y a su fondo de preview.</p>';
        if (CHUNKS[logo.relPath] && REQUESTS[CHUNKS[logo.relPath]]) {
            return '<p class="cb-note">Cargando el inline SVG para auditar el contraste del logo seleccionado…</p>';
        }
        return '<p class="cb-note">Abre el analisis o la pestaña <strong>Code</strong> para cargar el inline SVG del logo seleccionado.</p>';
    }

    function contrastEmptyHtml() {
        return '<p class="cb-note">Todavia no hay datos de contraste para el logo seleccionado.</p>';
    }

    function contrastHintHtml() {
        return '<p class="cb-cn__hint">En Logos el contraste se calcula solo sobre los colores del asset SVG seleccionado frente al fondo real de su preview.</p>';
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
        var logo = selectedLogo();
        if (!logo) return { r: 248, g: 250, b: 252, a: 1 };
        if (logo.previewMode === "dark") return { r: 17, g: 24, b: 39, a: 1 };
        return { r: 248, g: 250, b: 252, a: 1 };
    }

    function contrastAudit(ctx) {
        var logo = selectedLogo();
        var svg = logo && logo.isSvg ? readInline(logo.relPath) : "";
        var bg = selectedPreviewBg();
        var ratio = ctx && ctx.helpers ? ctx.helpers.contrastRatio : null;
        var colors;
        if (!logo || !logo.isSvg) return [];
        if (!svg) {
            requestCode(logo.relPath, true);
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

    function chip(group, value, label, current) {
        return '<button type="button" class="cb-lg__filter" data-lg-filter-group="' + esc(group) + '" data-lg-filter-value="' + esc(value) + '" aria-pressed="' + (current === value ? "true" : "false") + '">' + esc(label) + "</button>";
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

    function row(item) {
        var copied = MOUNT.copiedPath === item.path;
        return '<button type="button" class="cb-lg__row' + (STATE.selected === item.relPath ? " is-active" : "") + '" data-lg-file="' + esc(item.relPath) + '">'
            + '<span class="cb-lg__preview' + (item.previewMode === "dark" ? " cb-lg__preview--dark" : "") + '">'
            + '<img src="' + esc(item.src) + '" alt="' + esc(item.label) + '" loading="lazy" decoding="async" fetchpriority="low">'
            + "</span>"
            + '<span class="cb-lg__main">'
            + '<span class="cb-lg__name">' + esc(item.label) + "</span>"
            + '<span class="cb-lg__meta">'
            + '<span class="cb-lg__chip">' + esc(item.ext.toUpperCase()) + "</span>"
            + (item.followsPattern
                ? '<span class="cb-lg__chip cb-lg__chip--ok">Patron</span>'
                : '<span class="cb-lg__chip cb-lg__chip--warn">Sin patron</span>')
            + (item.isOg ? '<span class="cb-lg__chip cb-lg__chip--og">OG</span>' : "")
            + "</span>"
            + "</span>"
            + '<span class="cb-lg__path' + (copied ? " is-copied" : "") + '" data-lg-copy="' + esc(item.path) + '" title="Copiar ruta" aria-label="Copiar ruta ' + esc(item.path) + '">'
            + '<code>' + esc(item.path) + "</code>"
            + '<span class="cb-lg__copyState">' + (copied ? "Copiado" : "Copiar") + "</span>"
            + "</span>"
            + "</button>";
    }

    function groupSection(group) {
        var expanded = isFilterActive() ? true : !!STATE.expanded[group.id];
        var patternDocs = group.patterns && group.patterns.length
            ? '<div class="cb-lg__groupPatterns">' + group.patterns.map(function (pattern) {
                return '<code>' + esc(pattern) + '</code>';
            }).join("") + "</div>"
            : "";
        return '<section class="cb-lg__group">'
            + '<button type="button" class="cb-lg__groupHead" data-lg-group="' + esc(group.id) + '" aria-expanded="' + (expanded ? "true" : "false") + '">'
            + '<span class="cb-lg__groupTitle">' + esc(group.name) + "</span>"
            + '<span class="cb-lg__groupCount">' + group.items.length + "</span>"
            + "</button>"
            + patternDocs
            + (expanded
                ? '<div class="cb-lg__rows">' + group.items.map(row).join("") + "</div>"
                : "")
            + "</section>";
    }

    var STYLE = '<style>'
        + '.cb-lg{display:flex;flex-direction:column;gap:16px;width:100%;max-width:100%;min-width:0;overflow-x:hidden;padding:16px;background:#f7f8fa;font-family:Inter,system-ui,sans-serif}'
        + '.cb-lg__hero{display:grid;gap:12px;min-width:0;max-width:100%;padding:16px;border:1px solid #dde2ea;background:#fff;border-radius:10px}'
        + '.cb-lg__heroTop{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-start;justify-content:space-between;min-width:0}'
        + '.cb-lg__title{margin:0;font:700 20px/1.1 Inter,system-ui,sans-serif;color:#0f172a}'
        + '.cb-lg__lead{margin:6px 0 0;font:400 14px/1.5 Inter,system-ui,sans-serif;color:#475569;max-width:900px}'
        + '.cb-lg__selected{display:grid;gap:6px;min-width:320px;max-width:100%}'
        + '.cb-lg__selectedLabel{font:600 11px/1.2 Inter,system-ui,sans-serif;letter-spacing:.04em;text-transform:uppercase;color:#64748b}'
        + '.cb-lg__selectedName{font:700 14px/1.3 Inter,system-ui,sans-serif;color:#0f172a}'
        + '.cb-lg__selectedPath{display:block;padding:10px 12px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0;color:#0f172a;font:500 12px/1.4 "JetBrains Mono",monospace;word-break:break-all}'
        + '.cb-lg__selectedPreview{display:flex;align-items:center;gap:10px}'
        + '.cb-lg__selectedThumb{display:flex;align-items:center;justify-content:center;min-width:92px;min-height:56px;padding:8px 10px;border-radius:10px;background:#f8fafc;border:1px solid #e2e8f0}'
        + '.cb-lg__selectedThumb--dark{background:#111827;border-color:#111827}'
        + '.cb-lg__selectedThumb img{max-width:76px;max-height:40px;display:block}'
        + '.cb-lg__toolbar{display:grid;gap:12px;min-width:0;max-width:100%}'
        + '.cb-lg__search{width:100%;padding:11px 14px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;color:#0f172a;font:400 14px/1.2 Inter,system-ui,sans-serif;direction:ltr;unicode-bidi:plaintext;text-align:left}'
        + '.cb-lg__search:focus{outline:2px solid #0f62fe;outline-offset:1px}'
        + '.cb-lg__toolbarRow{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:start;min-width:0;max-width:100%}'
        + '.cb-lg__toolbarFilters{display:grid;gap:12px;min-width:0;max-width:100%}'
        + '.cb-lg__chips{display:flex;min-width:0;max-width:100%;flex-wrap:nowrap;gap:8px;overflow-x:auto;overflow-y:hidden;padding-bottom:2px;scrollbar-width:thin}'
        + '.cb-lg__chips::-webkit-scrollbar{height:6px}'
        + '.cb-lg__chips::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:999px}'
        + '.cb-lg__chips::-webkit-scrollbar-track{background:transparent}'
        + '.cb-lg__filter{flex:0 0 auto;padding:8px 10px;border:1px solid #cbd5e1;border-radius:999px;background:#fff;color:#334155;font:600 12px/1 Inter,system-ui,sans-serif;cursor:pointer}'
        + '.cb-lg__filter[aria-pressed="true"]{background:#0f62fe;border-color:#0f62fe;color:#fff}'
        + '.cb-lg__summary{align-self:start;font:500 12px/1.4 Inter,system-ui,sans-serif;color:#475569;white-space:nowrap;padding-top:8px}'
        + '.cb-lg__groups{display:grid;gap:12px;min-width:0;max-width:100%}'
        + '.cb-lg__group{min-width:0;max-width:100%;border:1px solid #dde2ea;border-radius:12px;background:#fff;overflow:hidden}'
        + '.cb-lg__groupHead{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;padding:14px 16px;border:0;background:#fff;color:#0f172a;font:700 13px/1.2 Inter,system-ui,sans-serif;cursor:pointer;text-align:left}'
        + '.cb-lg__groupHead:hover,.cb-lg__groupHead:focus-visible{background:#f8fbff;outline:none}'
        + '.cb-lg__groupTitle{text-transform:none}'
        + '.cb-lg__groupCount{padding:4px 8px;border-radius:999px;background:#f1f5f9;color:#475569;font:600 11px/1 Inter,system-ui,sans-serif}'
        + '.cb-lg__groupPatterns{display:flex;flex-wrap:nowrap;gap:8px;min-width:0;max-width:100%;overflow-x:auto;overflow-y:hidden;padding:0 16px 14px 16px;color:#64748b;scrollbar-width:thin}'
        + '.cb-lg__groupPatterns::-webkit-scrollbar{height:6px}'
        + '.cb-lg__groupPatterns::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:999px}'
        + '.cb-lg__groupPatterns::-webkit-scrollbar-track{background:transparent}'
        + '.cb-lg__groupPatterns code{flex:0 0 auto;padding:4px 8px;border-radius:999px;background:#f8fafc;border:1px solid #e2e8f0;font:500 11px/1.35 "JetBrains Mono",monospace;white-space:nowrap}'
        + '.cb-lg__rows{display:grid;min-width:0;max-width:100%}'
        + '.cb-lg__row{display:grid;grid-template-columns:112px minmax(0,300px) minmax(0,1fr);gap:14px;align-items:center;width:100%;min-width:0;max-width:100%;min-height:76px;padding:10px 16px;border:0;border-top:1px solid #edf2f7;background:#fff;text-align:left;cursor:pointer;content-visibility:auto;contain-intrinsic-size:76px}'
        + '.cb-lg__row:hover,.cb-lg__row:focus-visible{background:#f8fbff;outline:none}'
        + '.cb-lg__row.is-active{background:#eff6ff;box-shadow:inset 3px 0 0 #0f62fe}'
        + '.cb-lg__preview{display:flex;align-items:center;justify-content:center;min-height:54px;padding:8px 10px;border-radius:10px;background:#f8fafc;border:1px solid #e2e8f0}'
        + '.cb-lg__preview--dark{background:#111827;border-color:#111827}'
        + '.cb-lg__preview img{max-width:96px;max-height:40px;display:block}'
        + '.cb-lg__main{display:grid;gap:8px;min-width:0}'
        + '.cb-lg__name{font:700 13px/1.35 Inter,system-ui,sans-serif;color:#0f172a;word-break:break-word}'
        + '.cb-lg__meta{display:flex;flex-wrap:wrap;gap:6px}'
        + '.cb-lg__chip{padding:4px 8px;border-radius:999px;background:#eff6ff;color:#1d4ed8;font:600 11px/1.1 Inter,system-ui,sans-serif}'
        + '.cb-lg__chip--ok{background:#ecfdf5;color:#047857}'
        + '.cb-lg__chip--warn{background:#fff7ed;color:#c2410c}'
        + '.cb-lg__chip--og{background:#f5f3ff;color:#6d28d9}'
        + '.cb-lg__path{display:flex;align-items:center;justify-content:space-between;gap:10px;min-width:0;padding:8px 10px;border:1px solid transparent;border-radius:8px;color:#0f172a;cursor:pointer}'
        + '.cb-lg__path:hover{background:#f8fafc;border-color:#dbe3ee}'
        + '.cb-lg__path code{display:block;min-width:0;flex:1;color:#0f172a;font:500 11px/1.45 "JetBrains Mono",monospace;word-break:break-all}'
        + '.cb-lg__copyState{flex-shrink:0;padding:4px 8px;border-radius:999px;background:#f1f5f9;color:#475569;font:600 11px/1 Inter,system-ui,sans-serif}'
        + '.cb-lg__path.is-copied{background:#ecfdf5;border-color:#a7f3d0}'
        + '.cb-lg__path.is-copied .cb-lg__copyState{background:#d1fae5;color:#047857}'
        + '.cb-lg__empty{padding:28px;border:1px dashed #cbd5e1;border-radius:10px;background:#fff;color:#475569;font:500 14px/1.5 Inter,system-ui,sans-serif;text-align:center}'
        + '@media (max-width:980px){.cb-lg__row{grid-template-columns:112px 1fr;align-items:start}.cb-lg__main{grid-column:2}.cb-lg__path{grid-column:2}}'
        + '@media (max-width:700px){.cb-lg{padding:12px}.cb-lg__hero{padding:14px}.cb-lg__toolbarRow{grid-template-columns:minmax(0,1fr)}.cb-lg__summary{padding-top:0}.cb-lg__groupHead{padding:12px}.cb-lg__row{gap:8px;padding:10px 12px}.cb-lg__selected{min-width:0}.cb-lg__selectedThumb{min-width:72px}}'
        + '</style>';

    function renderBody() {
        var selected = selectedLogo();
        var groups = filteredGroups();
        var total = groups.reduce(function (sum, group) { return sum + group.items.length; }, 0);
        var selectedPreview = selected
            ? '<span class="cb-lg__selectedPreview">'
                + '<span class="cb-lg__selectedThumb' + (selected.previewMode === "dark" ? " cb-lg__selectedThumb--dark" : "") + '">'
                + '<img src="' + esc(selected.src) + '" alt="' + esc(selected.label) + '" decoding="async">'
                + "</span>"
                + '<strong class="cb-lg__selectedName">' + esc(selected.label) + "</strong>"
                + "</span>"
            : '<strong class="cb-lg__selectedName">Sin logos</strong>';
        return '<div class="cb-lg__hero">'
            + '<div class="cb-lg__heroTop">'
            + "<div>"
            + '<h2 class="cb-lg__title">Gallery · Logos</h2>'
            + '<p class="cb-lg__lead">Catalogo agrupado de assets en <code>cds-statics/assets/img/logos</code>. La lista mantiene miniaturas, detecta patron canonico y marca los ficheros <code>OG_</code> como OpenGraph. El tab <strong>Code</strong> carga inline SVG optimizado solo para los <code>.svg</code>; en <code>.png</code> muestra el markup con <code>&lt;img&gt;</code>.</p>'
            + "</div>"
            + '<div class="cb-lg__selected">'
            + '<span class="cb-lg__selectedLabel">Logo seleccionado</span>'
            + selectedPreview
            + '<code class="cb-lg__selectedPath">' + esc(selected ? selected.path : "") + "</code>"
            + "</div>"
            + "</div>"
            + '<div class="cb-lg__toolbar">'
            + '<input type="search" class="cb-lg__search" data-lg-search-input placeholder="Buscar por nombre, ruta, grupo o patron" value="' + esc(STATE.query) + '" aria-label="Buscar logos">'
            + '<div class="cb-lg__toolbarRow">'
            + '<div class="cb-lg__toolbarFilters">'
            + '<div class="cb-lg__chips" role="group" aria-label="Filtrar logos por tipo">'
            + chip("type", "all", "Todos", STATE.type)
            + chip("type", "svg", "SVG", STATE.type)
            + chip("type", "png", "PNG", STATE.type)
            + chip("type", "og", "OG", STATE.type)
            + "</div>"
            + '<div class="cb-lg__chips" role="group" aria-label="Filtrar logos por categoria">'
            + chip("category", "all", "Todos", STATE.category)
            + GROUPS.filter(function (group) { return group.id !== "otros"; }).map(function (group) {
                return chip("category", group.id, group.name, STATE.category);
            }).join("")
            + chip("category", "otros", "Otros", STATE.category)
            + "</div>"
            + "</div>"
            + '<span class="cb-lg__summary">' + total + " de " + LOGOS.length + " assets</span>"
            + "</div>"
            + "</div>"
            + (groups.length
                ? '<div class="cb-lg__groups">' + groups.map(groupSection).join("") + "</div>"
                : '<div class="cb-lg__empty">No hay logos que coincidan con el filtro actual.</div>');
    }

    function renderGallery() {
        return STYLE + '<section class="cb-lg" data-cb-logo-gallery-root>' + renderBody() + "</section>";
    }

    function syncCanvas() {
        var root = MOUNT.root || (MOUNT.stageEl && MOUNT.stageEl.querySelector("[data-cb-logo-gallery-root]"));
        var activeEl;
        var restoreSearch = false;
        var start = MOUNT.searchSelectionStart;
        var end = MOUNT.searchSelectionEnd;
        if (!root) return;
        activeEl = MOUNT.stageEl && MOUNT.stageEl.ownerDocument ? MOUNT.stageEl.ownerDocument.activeElement : null;
        restoreSearch = !!(activeEl && activeEl.getAttribute && activeEl.getAttribute("data-lg-search-input") !== null);
        if (restoreSearch) {
            start = typeof activeEl.selectionStart === "number" ? activeEl.selectionStart : STATE.query.length;
            end = typeof activeEl.selectionEnd === "number" ? activeEl.selectionEnd : start;
        }
        MOUNT.root = root;
        root.innerHTML = renderBody();
        if (restoreSearch) {
            activeEl = root.querySelector("[data-lg-search-input]");
            if (activeEl) {
                activeEl.focus();
                if (typeof activeEl.setSelectionRange === "function") {
                    activeEl.setSelectionRange(start, end);
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
        var filterBtn = event.target.closest("[data-lg-filter-group]");
        var copyEl = event.target.closest("[data-lg-copy]");
        var groupBtn = event.target.closest("[data-lg-group]");
        var itemBtn = event.target.closest("[data-lg-file]");
        var groupId;
        if (copyEl) {
            copyText(copyEl.getAttribute("data-lg-copy") || "").then(function () {
                showCopied(copyEl.getAttribute("data-lg-copy") || "");
            }).catch(function () {});
            return;
        }
        if (filterBtn) {
            if (filterBtn.getAttribute("data-lg-filter-group") === "type") {
                STATE.type = filterBtn.getAttribute("data-lg-filter-value") || "all";
            } else if (filterBtn.getAttribute("data-lg-filter-group") === "category") {
                STATE.category = filterBtn.getAttribute("data-lg-filter-value") || "all";
            }
            scheduleSync();
            return;
        }
        if (groupBtn) {
            groupId = groupBtn.getAttribute("data-lg-group");
            STATE.expanded[groupId] = !STATE.expanded[groupId];
            scheduleSync();
            return;
        }
        if (!itemBtn) return;
        STATE.selected = itemBtn.getAttribute("data-lg-file") || STATE.selected;
        refreshPanels();
        scheduleSync();
    }

    function onInput(event) {
        var input = event.target.closest("[data-lg-search-input]");
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

    function categoryRows() {
        return GROUPS.map(function (group) {
            var total = LOGOS.filter(function (item) { return item.groupId === group.id; }).length;
            var noPattern = LOGOS.filter(function (item) { return item.groupId === group.id && !item.followsPattern; }).length;
            var og = LOGOS.filter(function (item) { return item.groupId === group.id && item.isOg; }).length;
            return [
                group.name,
                group.patterns.map(function (pattern) { return pattern === "El resto de logos" ? pattern : "<code>" + esc(pattern) + "</code>"; }).join("<br>"),
                String(total),
                String(noPattern),
                String(og)
            ];
        });
    }

    var overview = '<div class="cb-docs__inner">'
        + "<h1>Gallery · Logos</h1>"
        + '<p class="cb-docs__lead">Inventario de assets de <code>cds-statics/assets/img/logos</code> dentro del Storybook. La pagina agrupa el catalogo por familias funcionales, detecta si el nombre sigue el patron esperado y destaca los ficheros <code>OG_</code> como imagenes OpenGraph.</p>'
        + '<div class="cb-callout">Los logos con nombres como <code>logo-SportPlus.svg</code> o cualquier fichero que conserve la extension en el slot donde deberia ir <code>[LOGO]</code> se etiquetan como <strong>Sin patron</strong>. La documentacion deja visible tanto la ruta real como el patron canonico del grupo.</div>'
        + "<h2>Que documenta</h2>"
        + docsTable({
            columns: ["Aspecto", "Comportamiento"],
            rows: [
                ["Ruta", "<code>cds-statics/assets/img/logos/&lt;fichero&gt;</code> visible en cada fila."],
                ["Agrupacion", "Los assets se organizan por bloques funcionales: recirculacion, favicon, cabeceras de marca, regionales, revistas, cerca, pasatiempos, mapa de cronicas y otros."],
                ["Patron", "Cada grupo expone su nomenclatura canonica. Si el fichero no la cumple, se marca como <strong>Sin patron</strong>."],
                ["OpenGraph", "Si el nombre contiene <code>OG_</code>, se marca como asset OpenGraph en el catalogo."],
                ["Code", "Los <code>.svg</code> cargan su inline optimizado bajo demanda; los <code>.png</code> muestran el snippet canonico con <code>&lt;img&gt;</code>."]
            ]
        })
        + "<h2>Grupos y patrones</h2>"
        + docsTable({
            columns: ["Grupo", "Patron o conjunto", "Assets", "Sin patron", "OG"],
            rows: categoryRows()
        })
        + "<h2>Cobertura</h2>"
        + '<p>La fuente de datos actual incluye <strong>' + LOGOS.length + "</strong> assets, de los cuales <strong>" + LOGOS.filter(function (item) { return item.isSvg; }).length + "</strong> son SVG con inline lazy. Si se anaden o retiran logos, hay que regenerar <code>storybook/data/logo-gallery-data.js</code> y <code>storybook/data/logo-gallery-inline/</code> con <code>npm run build:storybook:logos</code>.</p>"
        + '<p class="cb-src">Fuente: <code>cds-statics/assets/img/logos</code></p>'
        + "</div>";

    window.SB.register({
        id: "logo-gallery",
        name: "Logos",
        group: "Gallery",
        sort: 1000,
        signals: ["js"],
        overview: overview,
        stories: [
            {
                id: "all-logos",
                name: "Logos",
                hint: LOGOS.length + " assets · grouped catalog + lazy code",
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
                    MOUNT.root = MOUNT.stageEl ? MOUNT.stageEl.querySelector("[data-cb-logo-gallery-root]") : null;
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
