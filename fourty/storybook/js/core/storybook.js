/* ════════════════════════════════════════════════════════════════════════
   42DS Storybook — MOTOR (agnóstico de componente)
   ────────────────────────────────────────────────────────────────────────
   Recrea la arquitectura de Storybook (à la IBM Carbon) sin toolchain:
   sidebar (accordion) + canvas (iframe) + toolbar (globals: marca/viewport/fondo/oscuro)
   + addons (Controls/Actions/Accessibility/Code) + Docs. NO sabe nada de ningún
   componente concreto: consume módulos que se registran con window.SB.register(def).

   El canvas es un IFRAME: el preview se monta dentro (con el CSS real del DS) para que
   las media queries del DS respondan al ANCHO DEL IFRAME → el selector de viewport
   (Xs·Sm·Md·Lg·Xl, breakpoints reales del DS) simula mobile/tablet/desktop de verdad.
   Requiere servidor (el iframe carga el CSS del DS); sin él, degrada en silencio.

   Jerarquía del árbol (estilo Carbon):
     group (Atoms) → componente (Btn) → [Overview] + stories planas (Base/Nav/…)
                     + subgrupos anidados (p.ej. Galleries) → stories
   La vista (Canvas/Docs) la decide la selección: nodo "Overview" → Docs (overview
   del componente); cualquier story → Canvas. No hay docs por story.

   Contrato de SB.register(def):
     { id, name, group, sort?, icon?, signals?: ['js'],
       overview?,                         // HTML de la única página Docs (Overview)
       // — anidado —
       subgroups?: [{ id, name, hint?, collapsed?, argTypes?, args?, stories[] }],
       // — plano —
       argTypes?, args?, stories?
     }
   story: { id, name, hint?, kind:'interactive'|'gallery'|'page', full?, render, argTypes?, args? }
     full? = el canvas pasa a bloque y el componente ocupa todo el ancho (layout: btnGroup,
     organismos…); por defecto el canvas es flex-wrap arriba-izquierda.
     kind:'page' = la story NO devuelve markup: es una PÁGINA COMPLETA hecha a mano
     (templates/layouts/widgets/pocs/recursos). En vez de inyectar markup en el stage, el
     iframe NAVEGA a `src` (relativo a index-storybook.html) → la página carga su propio
     <head>/CSS/JS (fidelidad total, scripts incluidos). Sin controles. Toolbar útil = Viewport
     · Visión · Fullscreen (viven en el iframe padre); Brand/Cabecera/Fondo/Oscuro quedan
     inertes (la página fija su propia marca). story:{ id, name, hint?, kind:'page', src }.
   API runtime: SB.register(def) · SB.loadMarkup(def, scriptSrc, opts?) (publica un .html
   de markup como subgrupo "Markup"; opts.full=true para componentes de layout) ·
   SB.refresh() (re-monta el árbol tras registro async) · SB.helpers { esc, spec, block,
   docsTable, frameworkBlock, changeBlock, deprecationBlock, removeBlock }.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";

    /* ─── Helpers genéricos (compartidos con los módulos de stories) ─── */
    const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const spec = (label, html) => `<div class="cb-spec"><span class="cb-spec__label">${esc(label)}</span><div class="cb-spec__row">${html}</div></div>`;
    const block = (h, html) => `<div class="cb-block"><div class="cb-block__h">${h}</div><div class="cb-spec__row" style="gap:24px">${html}</div></div>`;
    function docsTable(def) {
        const cfg = def || {};
        const variants = {
            dense: " cb-table--dense",
            matrix: " cb-table--matrix",
            timeline: " cb-table--timeline"
        };
        const cols = Array.isArray(cfg.columns) ? cfg.columns : [];
        const rows = Array.isArray(cfg.rows) ? cfg.rows : [];
        const variantClass = variants[cfg.variant] || "";
        const caption = cfg.caption ? `<caption>${esc(cfg.caption)}</caption>` : "";
        const thead = cols.length
            ? `<thead><tr>${cols.map(function (col) {
                const meta = typeof col === "string" ? { label: col } : (col || {});
                const width = meta.width ? ` style="width:${String(meta.width).replace(/"/g, "&quot;")}"` : "";
                return `<th${width}>${esc(meta.label || "")}</th>`;
            }).join("")}</tr></thead>`
            : "";
        const tbody = `<tbody>${rows.map(function (row) {
            const meta = Array.isArray(row) ? { cells: row } : (row || {});
            const cells = Array.isArray(meta.cells) ? meta.cells : [];
            const rowClass = meta.rowClass ? ` class="${String(meta.rowClass).replace(/"/g, "&quot;")}"` : "";
            return `<tr${rowClass}>${cells.map(function (cell, index) {
                const c = (cell && typeof cell === "object" && !Array.isArray(cell))
                    ? cell
                    : { html: cell };
                const tag = c.header ? "th" : "td";
                const scope = tag === "th" ? ` scope="${c.scope || "row"}"` : "";
                const klass = c.className ? ` class="${String(c.className).replace(/"/g, "&quot;")}"` : "";
                const html = c.html != null ? c.html : esc(c.text || "");
                if (tag === "th" && index === 0 && !c.scope) return `<th scope="row"${klass}>${html}</th>`;
                return `<${tag}${scope}${klass}>${html}</${tag}>`;
            }).join("")}</tr>`;
        }).join("")}</tbody>`;
        return `<table class="cb-table${variantClass}">${caption}${thead}${tbody}</table>`;
    }
    function frameworkBlock(def) {
        const cfg = def || {};
        const rows = Array.isArray(cfg.rows) ? cfg.rows : [];
        const noteClass = cfg.warn ? " cb-callout--warn" : "";
        return `<h2>Integracion Vue / React</h2>
        ${cfg.intro ? `<p class="cb-note">${cfg.intro}</p>` : ""}
        ${docsTable({
            variant: "matrix",
            columns: ["Aspecto", "Vue", "React"],
            rows: rows.map(function (row) {
                return [
                    { html: `<strong>${esc(row[0] || "")}</strong>`, header: true },
                    { html: row[1] || "" },
                    { html: row[2] || "" }
                ];
            })
        })}
        ${cfg.note ? `<div class="cb-callout${noteClass}">${cfg.note}</div>` : ""}`;
    }

    function changeBlock(def) {
        const cfg = def || {};
        const typeLabels = {
            added: "Alta",
            changed: "Cambio",
            fixed: "Corrección",
            accessibility: "Accesibilidad",
            docs: "Documentación",
            breaking: "Breaking change"
        };
        const type = typeLabels[cfg.type] ? cfg.type : "changed";
        const title = cfg.title || "Cambio registrado";
        const date = /^\d{4}-\d{2}-\d{2}$/.test(cfg.date || "") ? cfg.date : "";
        const dateLabel = date ? date.split("-").reverse().join("/") : "Fecha no documentada";
        const summary = cfg.summary ? `<p class="cb-change__summary">${cfg.summary}</p>` : "";
        const files = Array.isArray(cfg.files) ? cfg.files.filter(Boolean) : [];
        const rows = [
            cfg.scope ? [{ html: "<strong>Alcance</strong>", header: true }, { html: cfg.scope }] : null,
            cfg.impact ? [{ html: "<strong>Impacto</strong>", header: true }, { html: cfg.impact }] : null,
            files.length ? [
                { html: "<strong>Archivos</strong>", header: true },
                { html: files.map(function (file) { return `<code>${esc(file)}</code>`; }).join(" · ") }
            ] : null,
            cfg.note ? [{ html: "<strong>Nota</strong>", header: true }, { html: cfg.note }] : null
        ].filter(Boolean);
        const meta = rows.length ? docsTable({ variant: "dense", rows: rows }) : "";
        return `<article class="cb-change cb-change--${type}">
            <div class="cb-change__top">
                <div class="cb-change__labels">
                    <span class="cb-change__eyebrow">Registro de cambio</span>
                    <span class="cb-change__type">${esc(typeLabels[type])}</span>
                </div>
                <time class="cb-change__date"${date ? ` datetime="${date}"` : ""}>${esc(dateLabel)}</time>
            </div>
            <h3 class="cb-change__title">${esc(title)}</h3>
            ${summary}
            ${meta}
        </article>`;
    }

    /* ─── Registro de componentes ─── */
    function deprecationBlock(def) {
        const cfg = def || {};
        const title = cfg.title || "Elemento deprecado";
        const since = cfg.since || "Fecha no documentada";
        const summary = cfg.summary ? `<p>${cfg.summary}</p>` : "";
        const rows = [
            cfg.scope ? [{ html: "<strong>Afecta a</strong>", header: true }, { html: cfg.scope }] : null,
            cfg.replacement ? [{ html: "<strong>Alternativa</strong>", header: true }, { html: cfg.replacement }] : null,
            cfg.removal ? [{ html: "<strong>Retirada prevista</strong>", header: true }, { html: cfg.removal }] : null,
            cfg.note ? [{ html: "<strong>Nota</strong>", header: true }, { html: cfg.note }] : null
        ].filter(Boolean);
        const meta = rows.length ? docsTable({ variant: "dense", rows: rows }) : "";
        return `<div class="cb-callout cb-callout--deprecated">
            <div class="cb-callout__eyebrow">Deprecated</div>
            <div class="cb-callout__head">
                <strong>${esc(title)}</strong>
                <span class="cb-callout__date">${esc(since)}</span>
            </div>
            ${summary}
            ${meta}
        </div>`;
    }
    function removeBlock(def) {
        const cfg = def || {};
        const title = cfg.title || "Elemento retirado";
        const since = cfg.since || "Fecha no documentada";
        const summary = cfg.summary ? `<p>${cfg.summary}</p>` : "";
        const rows = [
            cfg.scope ? [{ html: "<strong>Afecta a</strong>", header: true }, { html: cfg.scope }] : null,
            cfg.replacement ? [{ html: "<strong>Alternativa</strong>", header: true }, { html: cfg.replacement }] : null,
            cfg.reason ? [{ html: "<strong>Motivo</strong>", header: true }, { html: cfg.reason }] : null,
            cfg.note ? [{ html: "<strong>Nota</strong>", header: true }, { html: cfg.note }] : null
        ].filter(Boolean);
        const meta = rows.length ? docsTable({ variant: "dense", rows: rows }) : "";
        return `<div class="cb-callout cb-callout--removed">
            <div class="cb-callout__eyebrow">Removed</div>
            <div class="cb-callout__head">
                <strong>${esc(title)}</strong>
                <span class="cb-callout__date">${esc(since)}</span>
            </div>
            ${summary}
            ${meta}
        </div>`;
    }

    const components = [];
    let pendingRefresh = 0;
    /* Refresco COALESCIDO del sidebar (una sola reconstrucción por frame). Lo comparten
       TODOS los disparadores async: register(), attachStory(), attachSubgroup() y —el
       volumen real— loadMarkup() (≈180 módulos, cada uno con su fetch del .html de Markup).
       Antes cada completion llamaba a SB.refresh()=buildTree() DIRECTO → ~180 rebuilds
       completos en cascada (innerHTML="" + repoblar + applyFilter): arranque lento y, si un
       fetch tardío entraba mientras se montaba/expandía el árbol, pisaba el estado y parecía
       que faltaban items. requestAnimationFrame coalesce todas las inserciones síncronas del
       frame en UN buildTree; es loss-free: el rAF corre TRAS ellas y lee components[] completo.
       El guard `pendingRefresh` descarta los schedules redundantes, no el trailing (siempre
       queda un rAF pendiente que ejecuta). Pre-boot (sin SB.refresh aún) sale sin agendar: el
       buildTree inicial de boot() ya recoge lo insertado en components[]/def antes del refresh. */
    function scheduleSidebarRefresh() {
        if (!window.SB.refresh || pendingRefresh) return;
        pendingRefresh = requestAnimationFrame(() => {
            pendingRefresh = 0;
            if (window.SB.refresh) window.SB.refresh();
        });
    }
    window.SB = {
        helpers: { esc, spec, block, docsTable, frameworkBlock, changeBlock, deprecationBlock, removeBlock },
        register(def) {
            const index = components.findIndex(x => x && x.id === def.id);
            if (index >= 0) components[index] = def;
            else components.push(def);
            scheduleSidebarRefresh();
        },
        /* Adjunta una story a un componente YA registrado (por id). Lo usa js/amp/amp.js para
           integrar la variante AMP (kind:"page") DENTRO de su componente —en vez de un grupo
           aparte—. Si el árbol ya se construyó, refresca. Devuelve true si encontró el componente. */
        attachStory(componentId, story) {
            const c = components.find(x => x.id === componentId);
            if (!c) return false;
            (c.stories = c.stories || []).push(story);
            scheduleSidebarRefresh();
            return true;
        },
        /* Adjunta un SUBGRUPO (plegable, como "Galleries"/"Markup") a un componente YA
           registrado (por id). Genérico (no AMP-específico); lo usa js/amp/amp.js para colgar
           el subgrupo "AMP" (una story por variante) DENTRO de cada átomo. subgroup =
           { id, name, collapsed?, hint?, stories[] }. Refresca si el árbol ya existe.
           Devuelve true si encontró el componente. */
        attachSubgroup(componentId, subgroup) {
            const c = components.find(x => x.id === componentId);
            if (!c) return false;
            (c.subgroups = c.subgroups || []).push(subgroup);
            scheduleSidebarRefresh();
            return true;
        },
        /* Carga un .html de markup (bloques <template data-story="…">) y lo publica como
           subgrupo "Markup" (plegado) del def — una story por bloque. scriptSrc =
           document.currentScript.src del módulo; el .html se deriva cambiando .js → .html.
           Async (fetch): requiere servidor; sin él falla en silencio. Ej.: atoms/btn/btn.html

           Estilos experimentales: cualquier <style> a NIVEL DE ARCHIVO (fuera de los
           <template>) se considera CSS experimental del componente y se guarda en
           def._sharedStyle. El renderer lo inyecta antes de cualquier story del componente
           (incluidas las interactivas del .js). Workflow: testear en .html → promover al
           SCSS canónico → borrar el <style>. Los <style> DENTRO de un <template> son
           scoped a esa story (no requieren tratamiento especial: viajan en el innerHTML). */
        loadMarkup(def, scriptSrc, opts) {
            if (!scriptSrc) return;
            const full = !!(opts && opts.full);   // componentes de layout (btnGroup, organismos)
            const url = scriptSrc.replace(/\.js(\?.*)?$/, ".html");
            const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "x";
            fetch(url)
                .then(r => r.ok ? r.text() : Promise.reject(r.status))
                .then(txt => {
                    const parsed = new DOMParser().parseFromString(txt, "text/html");
                    /* DOMParser pone los <style> top-level en <head> (head element por defecto).
                       Los <style> DENTRO de <template> viven en template.content (DocumentFragment
                       separado del árbol principal), por lo que NO los captura este querySelectorAll —
                       quedan scoped a su story como esperamos. */
                    const fileStyles = Array.from(parsed.querySelectorAll("style"))
                        .map(s => s.textContent).join("\n").trim();
                    if (fileStyles) def._sharedStyle = fileStyles;
                    const tpls = Array.from(parsed.querySelectorAll("template[data-story]"));
                    const stories = tpls.map(t => {
                        const html = t.innerHTML.trim();
                        return { id: "md-" + slug(t.dataset.story), name: t.dataset.story, kind: "interactive", full, render: () => html };
                    });
                    if (stories.length) {
                        (def.subgroups = def.subgroups || []).push({ id: "markup", name: "Markup", collapsed: true, stories });
                    }
                    if (stories.length || fileStyles) scheduleSidebarRefresh();
                })
                .catch(() => { /* sin servidor / sin archivo: el storybook sigue funcionando */ });
        }
    };

    /* ─── Iconos: registro Phosphor en storybook/assets/icons.js ─── */
    const ICONS = window.SB_ICONS || { paths: {}, svg: function () { return ""; } };
    const IC_FOLDER = ICONS.svg("folder", "cb-ic");
    const IC_GROUP = ICONS.svg("squares-four", "cb-ic");
    const IC_DOC = ICONS.svg("file-text", "cb-story__ico");
    const IC_STORY = ICONS.svg("bookmark-simple", "cb-story__ico");
    const IC_CARET = ICONS.svg("caret-down", "cb-caret");
    const IC_CHIP_X = ICONS.svg("x", "cb-csel__chip-x__ico");   // ✕ de los chips de "Apilados"

    /* ─── Markup del chrome (se inyecta en #sb-root) ─── */
    const CHROME = `
    <div class="cb-app">
      <nav class="cb-side" aria-label="Stories">
        <div class="cb-brand">
          <img class="cb-brand__mark" src="favicon.png" alt="" width="24" height="24" aria-hidden="true">
          <span class="cb-brand__name">42DS Storybook</span>
          <span class="cb-brand__ver" id="cbVer" hidden title="Versión del Design System"></span>
        </div>
        <div class="cb-search">
          ${ICONS.svg("magnifying-glass", "cb-search__ico")}
          <input id="cbSearch" type="search" placeholder="Buscar stories…" autocomplete="off" aria-label="Buscar stories">
          <kbd class="cb-search__shortcut" id="cbSearchShortcut" aria-hidden="true">/</kbd>
          <button id="cbSearchClear" class="cb-search__clear" type="button" hidden aria-label="Limpiar búsqueda">${ICONS.svg("x", "cb-search__clear__ico")}</button>
        </div>
        <div class="cb-filterbar is-collapsed" id="cbFilterbar">
          <button type="button" class="cb-filterbar__toggle" id="cbFiltersToggle" aria-expanded="false" aria-controls="cbFilters">
            ${ICONS.svg("caret-down", "cb-caret")}<span>Filtros</span><span class="cb-filterbar__count" id="cbFiltersCount" hidden></span>
          </button>
          <div class="cb-filters" id="cbFilters" role="group" aria-label="Filtros"></div>
        </div>
        <div class="cb-search__meta" id="cbSearchMeta" hidden></div>
        <div class="cb-tree" id="cbTree"></div>
        <div class="cb-tree__empty" id="cbTreeEmpty" hidden>
          <p class="cb-tree__empty-msg">No hay resultados para «<span id="cbTreeEmptyQ"></span>»</p>
          <p class="cb-tree__empty-hint">Prueba con menos palabras o con sinónimos.</p>
        </div>
      </nav>

      <div class="cb-main" id="cbMain">
        <div class="cb-resize-y" id="cbResizeY" title="Arrastra para ajustar el alto del panel"></div>
        <div class="cb-toolbar">
          <div class="cb-tb-section">Canvas</div>
          <div class="cb-globals cb-globals--brand">
            <label for="cbBrand">Brand</label>
            <select id="cbBrand" aria-label="Cambiar marca activa (globals)">
              <option value="showroom-brand-showroom">Elige marca</option>
              <option value="showroom-brand-ep">El Periódico</option>
              <option value="showroom-brand-epe">El Periódico de España</option>
              <option value="showroom-brand-regionales">Regionales</option>
              <option value="showroom-brand-cuore">Revista: Cuore</option>
              <option value="showroom-brand-viajar">Revista: Viajar</option>
              <option value="showroom-brand-woman">Revista: Woman</option>
              <option value="showroom-brand-stilo">Revista: Stilo</option>
              <option value="showroom-brand-sport">Sport</option>
            </select>
          </div>
          <!-- Cabecera: dropdown alimentado por brand-data.js (CSV de medios reales:
               cabeceras principales + verticales/hyperlocales, agrupadas por medio).
               Se hidrata async. Si el CSV no carga, queda oculto (feature opcional). -->
          <div class="cb-globals cb-globals--cabecera" id="cbCabeceraWrap">
            <label>Cabecera</label>
            <div class="cb-csel cb-csel--cabecera" id="cbCabecera">
              <button class="cb-csel__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="Cabecera (medio + vertical concreta)" disabled>
                <span class="cb-csel__sw" data-empty="true"></span>
                <span class="cb-csel__lbl">Cargando…</span>
                ${ICONS.svg("caret-down", "cb-csel__caret")}
              </button>
              <div class="cb-csel__menu" role="listbox" hidden></div>
            </div>
          </div>
          <span class="cb-tool-sep"></span>
          <div class="cb-globals cb-globals--viewport">
            <label for="cbViewport"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg> Viewport</label>
            <select id="cbViewport" aria-label="Resolución del canvas (breakpoints del DS y presets prototípicos)">
              <option value="">Responsive</option>
              <option value="320x640">Móvil compacto · Xs (320×640)</option>
              <option value="360x640">Móvil base · Xs (360×640)</option>
              <option value="375x667">Móvil ancho · Xs (375×667)</option>
              <option value="390x844">Móvil alto · Xs (390×844)</option>
              <option value="412x915">Móvil grande · Xs (412×915)</option>
              <option value="600x960">Phablet · Sm (600×960)</option>
              <option value="768x1024">Tablet mini · Sm (768×1024)</option>
              <option value="800x1280">Tablet base · Md (800×1280)</option>
              <option value="1024x768">Portátil compacto · Lg (1024×768)</option>
              <option value="1280x800">Escritorio base · Xl (1280×800)</option>
              <option value="1440x900">Escritorio amplio · Xl (1440×900)</option>
              <option value="custom">Personalizado</option>
            </select>
            <span class="cb-vp-size" title="Resolución manual (px). Vacío = auto.">
              <input id="cbVpW" class="cb-vp-input" type="number" min="0" step="1" placeholder="auto" autocomplete="off" aria-label="Ancho del viewport en px">
              <span class="cb-vp-x">×</span>
              <input id="cbVpH" class="cb-vp-input" type="number" min="0" step="1" placeholder="auto" autocomplete="off" aria-label="Alto del viewport en px">
            </span>
          </div>
          <span class="cb-tool-sep"></span>
          <!-- Fondo: dropdown custom porque <option> nativo NO admite HTML (no se pueden
               poner spans con color dentro). El widget .cb-csel emula un listbox accesible
               (role + aria-*) y las "muestras" .cb-csel__sw se pintan leyendo computedStyle
               de la helper class DESDE el iframe → la paleta refleja la marca activa. -->
          <div class="cb-globals cb-globals--bg">
            <label>${ICONS.svg("circle-half", "")} Fondo</label>
            <div class="cb-csel" id="cbBg">
              <button class="cb-csel__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="Fondo del canvas (helpers de color de fondo del DS)">
                <span class="cb-csel__sw" data-empty="true"></span>
                <span class="cb-csel__lbl">Por defecto</span>
                ${ICONS.svg("caret-down", "cb-csel__caret")}
              </button>
              <div class="cb-csel__menu" role="listbox" hidden></div>
            </div>
          </div>
          <div class="cb-globals cb-globals--theme">
            <label for="cbDark">${ICONS.svg("moon", "")} Oscuro</label>
            <label class="cb-toggle" title="Modo oscuro del Storybook">
              <input type="checkbox" id="cbDark" aria-label="Activar modo oscuro del Storybook">
              <span class="cb-toggle__track"></span>
            </label>
          </div>
          <span class="cb-tool-sep"></span>
          <div class="cb-globals cb-globals--fs">
            <button type="button" id="cbFullscreen" class="cb-icobtn" title="Pantalla completa (F)" aria-label="Pantalla completa" aria-pressed="false">
              ${ICONS.svg("arrows-out", "cb-icobtn__ic")}
            </button>
          </div>
        </div>

        <!-- ─── Sub-toolbar de accesibilidad ───
             Simulaciones que se aplican al CANVAS (no a la marca):
             · Visión: filtros SVG (feColorMatrix) que simulan dicromacías y anomalías;
               matrices canónicas (Wickline/Machado), las mismas que usa el addon a11y de
               Storybook. Se aplican con CSS filter:url(#id) al iframe.
             · Texto: zoom del font-size raíz del iframe (escala todos los rem del DS).
               Incluye 200% (límite WCAG 1.4.4 - Resize Text). -->
        <div class="cb-toolbar cb-toolbar--a11y">
          <div class="cb-tb-section">A11y</div>
          <!-- Visión: dropdown custom .cb-csel para mostrar un swatch circular por opción
               con el espectro RGB filtrado por la simulación correspondiente — el usuario ve,
               en miniatura, cómo se altera la paleta antes de aplicar. Sigue el patrón de
               Fondo/Cabecera. Las opciones se hidratan en boot() leyendo VISION_OPTIONS. -->
          <div class="cb-globals cb-globals--vision">
            <label>${ICONS.svg("eye", "")} Visión</label>
            <div class="cb-csel cb-csel--vision" id="cbVision">
              <button class="cb-csel__trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="Simulación de visión cromática (color blindness)">
                <span class="cb-csel__sw cb-csel__sw--vision" data-vision=""></span>
                <span class="cb-csel__lbl">Normal</span>
                ${ICONS.svg("caret-down", "cb-csel__caret")}
              </button>
              <div class="cb-csel__menu" role="listbox" hidden></div>
            </div>
          </div>
          <div class="cb-globals cb-globals--textsize">
            <label for="cbTextSize">${ICONS.svg("text-aa", "")} Texto</label>
            <select id="cbTextSize" aria-label="Tamaño de texto (zoom del font-size raíz del iframe)">
              <option value="">100% · base</option>
              <option value="0.85">85% · compacto</option>
              <option value="1.15">115%</option>
              <option value="1.3">130%</option>
              <option value="1.5">150%</option>
              <option value="2">200% · WCAG 1.4.4</option>
            </select>
          </div>
          <!-- Forced colors: simula Windows High Contrast Mode (WCAG 1.4.11 Non-text Contrast).
               El sistema operativo de un usuario con HCM activo ignora colores del autor; testarlo aquí
               evita componentes que se vuelven inutilizables (p.ej. iconos invisibles).
               Etiqueta "Colores forzados" (literal del CSS forced-colors / W3C) para no chocar con el
               panel addon "Contraste" (WCAG 1.4.3/1.4.6 ratios de texto) — son criterios distintos. -->
          <div class="cb-globals cb-globals--forced">
            <label for="cbForcedColors">${ICONS.svg("circles-three", "")} Colores forzados</label>
            <select id="cbForcedColors" aria-label="Forzar colores de alto contraste (Windows HCM, WCAG 1.4.11)">
              <option value="">Normal</option>
              <option value="bw">Negro sobre blanco</option>
              <option value="wb">Blanco sobre negro</option>
              <option value="yb">Amarillo sobre negro</option>
            </select>
          </div>
          <span class="cb-tool-sep"></span>
          <!-- Reduced motion (WCAG 2.3.3): anula animaciones y transiciones. Imprescindible
               para validar carouseles, accordions, swipers del DS. -->
          <div class="cb-globals cb-globals--motion">
            <label for="cbReducedMotion" title="Simular prefers-reduced-motion (WCAG 2.3.3)">${ICONS.svg("play-pause", "")} Movimiento</label>
            <label class="cb-toggle" title="Simular prefers-reduced-motion (WCAG 2.3.3)">
              <input type="checkbox" id="cbReducedMotion" aria-label="Simular prefers-reduced-motion">
              <span class="cb-toggle__track"></span>
            </label>
          </div>
          <!-- Focus visible (WCAG 2.4.7): outline magenta forzado al hacer Tab por el canvas. -->
          <div class="cb-globals cb-globals--focus">
            <label for="cbFocusVisible" title="Resaltar foco visible al navegar con Tab (WCAG 2.4.7)">${ICONS.svg("keyboard", "")} Foco</label>
            <label class="cb-toggle" title="Resaltar foco visible (WCAG 2.4.7)">
              <input type="checkbox" id="cbFocusVisible" aria-label="Resaltar foco visible">
              <span class="cb-toggle__track"></span>
            </label>
          </div>
          <!-- Text spacing (WCAG 1.4.12): letter 0.12em, word 0.16em, line 1.5, paragraph 2em. -->
          <div class="cb-globals cb-globals--spacing">
            <label for="cbTextSpacing" title="Aplicar mínimos de espaciado WCAG 1.4.12">${ICONS.svg("text-indent", "")} Espaciado</label>
            <label class="cb-toggle" title="Aplicar mínimos de espaciado WCAG 1.4.12 (letter 0.12em, word 0.16em, line 1.5, paragraph 2em)">
              <input type="checkbox" id="cbTextSpacing" aria-label="Aplicar espaciado WCAG 1.4.12">
              <span class="cb-toggle__track"></span>
            </label>
          </div>
          <!-- Inspect mode: hover sobre cualquier elemento del canvas → outline + tooltip con
               dimensiones, font-size y padding/margin. Útil para revisar medidas sin abrir DevTools. -->
          <div class="cb-globals cb-globals--inspect">
            <label for="cbInspect" title="Inspeccionar medidas al hacer hover en el canvas">${ICONS.svg("ruler", "")} Medidas</label>
            <label class="cb-toggle" title="Inspector de medidas: hover sobre cualquier elemento → dimensiones, font-size, padding y margin">
              <input type="checkbox" id="cbInspect" aria-label="Activar inspector de medidas">
              <span class="cb-toggle__track"></span>
            </label>
          </div>
        </div>

        <div class="cb-canvas-wrap" id="cbCanvasWrap">
          <iframe class="cb-frame" id="cbFrame" title="Canvas — preview aislado de la story"></iframe>
        </div>

        <div class="cb-docs" id="cbDocs"></div>

        <div class="cb-panel">
          <div class="cb-panel__tabs">
            <button class="cb-ptab is-active" data-panel="controls" type="button">Controls <span class="cb-ptab__badge" id="cbCtrlCount">0</span></button>
            <button class="cb-ptab" data-panel="actions" type="button">Actions <span class="cb-ptab__badge" id="cbActCount">0</span></button>
            <button class="cb-ptab" data-panel="a11y" type="button">Accessibility</button>
            <button class="cb-ptab" data-panel="contrast" type="button">Contraste <span class="cb-ptab__badge cb-ptab__badge--err" id="cbContrastFails" hidden>0</span></button>
            <button class="cb-ptab" data-panel="code" type="button">Code</button>
            <!-- Tab condicional: una story puede exponer un 2º bloque de código (story.codeAlt =
                 {label, code, note?}). Lo usa el subgrupo AMP para mostrar/copiar SOLO el markup
                 del elemento (no el wrapper del render). Oculto si la story no lo define. -->
            <button class="cb-ptab" data-panel="codealt" type="button" id="cbTabCodeAlt" hidden>Code AMP</button>
          </div>
          <div class="cb-panel__body" id="cbPanelBody"></div>
        </div>
      </div>
      <div class="cb-resize-x" id="cbResizeX" title="Arrastra para ajustar el ancho del sidebar"></div>

      <!-- Solapa de recuperación: visible solo en modo fullscreen.
           Patrón Storybook: cuando la chrome se pliega, una pill discreta en esquina
           sup-izq permite recuperarla (evita "atrapar" al usuario sin navegación). -->
      <button type="button" id="cbExitFs" class="cb-exit-fs" title="Salir de pantalla completa (F · Esc)" aria-label="Salir de pantalla completa">
        ${ICONS.svg("arrows-in", "cb-exit-fs__ic")}
        <span class="cb-exit-fs__label">Mostrar paneles</span>
      </button>

      <!-- Defs SVG para simulación de visión cromática (sub-toolbar a11y).
           Matrices canónicas 4x5 RGBA (Wickline 2000, también usadas por el addon a11y de Storybook).
           Se aplican vía CSS filter:url(#sb-vis-...) sobre el elemento iframe del canvas.
           color-interpolation-filters=sRGB evita que el navegador convierta a linear, que
           distorsionaría las matrices (matemáticamente están definidas en sRGB). -->
      <svg class="cb-vision-defs" aria-hidden="true" focusable="false" width="0" height="0" style="position:absolute;overflow:hidden">
        <defs>
          <filter id="sb-vis-protanopia" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0"/></filter>
          <filter id="sb-vis-protanomaly" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.817 0.183 0 0 0  0.333 0.667 0 0 0  0 0.125 0.875 0 0  0 0 0 1 0"/></filter>
          <filter id="sb-vis-deuteranopia" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0"/></filter>
          <filter id="sb-vis-deuteranomaly" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.8 0.2 0 0 0  0.258 0.742 0 0 0  0 0.142 0.858 0 0  0 0 0 1 0"/></filter>
          <filter id="sb-vis-tritanopia" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0"/></filter>
          <filter id="sb-vis-tritanomaly" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.967 0.033 0 0 0  0 0.733 0.267 0 0  0 0.183 0.817 0 0  0 0 0 1 0"/></filter>
          <filter id="sb-vis-achromatopsia" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0 0 0 1 0"/></filter>
          <filter id="sb-vis-achromatomaly" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.618 0.320 0.062 0 0  0.163 0.775 0.062 0 0  0.163 0.320 0.516 0 0  0 0 0 1 0"/></filter>
        </defs>
      </svg>
    </div>`;

    /* ─── Globals: mapeo de marca — espejo exacto de cds-statics/js/showroom/showroom-init.js ─── */
    const BRAND_MAP = {
        "showroom-brand-showroom": { classes: ["ft-brand-ux"], css: "ux/setting.css", index: "ux-index.css" },
        "showroom-brand-ep": { classes: ["ft-brand-ep", "ep"], css: "ep/setting.css", index: "ep-index.css" },
        "showroom-brand-epe": { classes: ["ft-brand-epe", "epe"], css: "epe/setting.css", index: "epe-index.css" },
        "showroom-brand-regionales": { classes: ["ft-brand-regionales"], css: "regionales/setting.css", index: "regionales-index.css" },
        "showroom-brand-cuore": { classes: ["ft-brand-revistas", "cuore"], css: "revistas/setting-cuore.css", index: "revistas-index.css" },
        "showroom-brand-viajar": { classes: ["ft-brand-revistas", "viajar"], css: "revistas/setting-viajar.css", index: "revistas-index.css" },
        "showroom-brand-woman": { classes: ["ft-brand-revistas", "woman"], css: "revistas/setting-woman.css", index: "revistas-index.css" },
        "showroom-brand-stilo": { classes: ["ft-brand-revistas", "stilo"], css: "revistas/setting-stilo.css", index: "revistas-index.css" },
        "showroom-brand-sport": { classes: ["ft-brand-sport", "sport"], css: "sport/setting.css", index: "sport-index.css" }
    };

    /* ─── Globals: fondo del canvas — SOLO helpers reales del DS (ft-helper-bgColor-*).
       Verificados en cds-statics/css/brands/ux/ux-core.css. Se aplican al canvas
       (ancestro de los botones) para que el comportamiento on-dark real del DS
       —p.ej. .ft-helper-bgColor-black .ft-btn— se dispare igual que en producción.
       Para añadir más (opacity-*, alert-*) basta con sumar pares a un grupo. ─── */
    const BG_GROUPS = [
        {
            label: "Neutros", options: [
                ["ft-helper-bgColor-white", "white"],
                ["ft-helper-bgColor-black", "black · on-dark"],
                ["ft-helper-bgColor-background-lightGrey", "background · lightGrey"],
                ["ft-helper-bgColor-background-mediumGrey", "background · mediumGrey"],
                ["ft-helper-bgColor-background-darkGrey", "background · darkGrey"]
            ]
        },
        {
            label: "Marca", options: [
                ["ft-helper-bgColor-primary", "primary"],
                ["ft-helper-bgColor-secondary", "secondary"],
                ["ft-helper-bgColor-tertiary", "tertiary"],
                ["ft-helper-bgColor-quaternary", "quaternary"],
                ["ft-helper-bgColor-quinary", "quinary"],
                ["ft-helper-bgColor-senary", "senary"],
                ["ft-helper-bgColor-septenary", "septenary"]
            ]
        },
        {
            label: "Degradados", options: [
                ["ft-helper-bgColor-background-degraded1", "degraded 1"],
                ["ft-helper-bgColor-background-degraded2", "degraded 2"],
                ["ft-helper-bgColor-background-degraded3", "degraded 3"]
            ]
        }
    ];
    const BG_CLASSES = BG_GROUPS.reduce((a, g) => a.concat(g.options.map(o => o[0])), []);

    /* ─── Filtros faceted del sidebar (chips) — además del buscador de texto ───
       Cada chip aporta un `token` a su `group` (lógica) y se muestra bajo su `section` (visual).
       Lógica al filtrar: OR dentro de un mismo group (p.ej. varios niveles), AND entre groups
       distintos, y AND con la query de texto. Los tokens los lleva cada story en dataset.facets
       (calculado en addStoryNode). Extensible: añadir aquí un chip (con su `section`) + emitir su
       token en addStoryNode. Las `section` se renderizan agrupadas con su etiqueta, en orden de
       aparición. Los niveles (`lvl-<grupo>`) cubren TODAS las categorías top-level del sidebar.
       NOMBRES en inglés (coherencia con los grupos del sidebar, que son en inglés). */
    const SIGNALS = {
        js: {
            token: "signal-js",
            label: "JS",
            className: "js",
            title: "Componente con dependencia de JavaScript, runtime o listeners del consumidor"
        }
    };

    const FILTERS = [
        { section: "Feature", token: "amp", group: "feat", label: "⚡ AMP", title: "Solo las variantes AMP (subgrupo AMP)" },
        { section: "Feature", token: "html", group: "feat", label: "HTML", title: "Solo la versión HTML (todo lo que no es AMP)" },
        { section: "Feature", token: "signal-js", group: "signal", label: "JS", title: "Solo componentes con dependencia de JavaScript o comportamiento dinámico" },
        { section: "Status", token: "changed", group: "status", label: "Changed", title: "Solo componentes con cambios en esta versión" },
        { section: "Docs", token: "lvl-docs", group: "level", label: "Docs" },
        { section: "Components", token: "lvl-atoms", group: "level", label: "Atoms" },
        { section: "Components", token: "lvl-molecules", group: "level", label: "Molecules" },
        { section: "Components", token: "lvl-organisms", group: "level", label: "Organisms" },
        { section: "Pages", token: "lvl-templates", group: "level", label: "Templates" },
        { section: "Pages", token: "lvl-layouts", group: "level", label: "Layouts" },
        { section: "Pages", token: "lvl-widgets", group: "level", label: "Widgets" },
        { section: "Pages", token: "lvl-recursos", group: "level", label: "Recursos" },
        { section: "Pages", token: "lvl-pocs", group: "level", label: "POCs" },
        { section: "Pages", token: "lvl-externals", group: "level", label: "Externals" },
        { section: "Base", token: "lvl-setup", group: "level", label: "Setup" },
        { section: "Base", token: "lvl-helpers", group: "level", label: "Helpers" }
    ];

    const DOCS_NODE = { id: "__docs", name: "Overview", kind: "docs" };

    /* Primera story (sub, story) de un componente — para el arranque.
       Prioriza las stories planas; si no hay, baja al primer subgrupo; si es una página-doc
       standalone (solo overview), su nodo Docs. */
    function firstOf(comp) {
        if (comp.stories && comp.stories.length) return { sub: null, story: comp.stories[0] };
        const sub = (comp.subgroups || []).find(s => s.stories && s.stories.length);
        if (sub) return { sub, story: sub.stories[0] };
        if (comp.overview) return { sub: null, story: DOCS_NODE };
        return { sub: null, story: null };
    }

    /* ════════════════════════════════════════════════════════════════════
       Boot
       ════════════════════════════════════════════════════════════════════ */
    function boot() {
        const root = document.getElementById("sb-root");
        if (!root) { console.error("[SB] Falta el contenedor #sb-root."); return; }
        // El chrome se monta SIEMPRE, aunque aún no haya ningún componente registrado: el
        // catálogo llega diferido (bootstrap-lazy) y se engancha por SB.refresh. Abortar aquí
        // dejaba el motor sin SB.refresh → los ~154 register posteriores se perdían en silencio,
        // y todo el arranque dependía del orden implícito de los <script> de index.html.
        root.innerHTML = CHROME;

        // Metadatos (storybook/js/meta.js) + changelog (storybook/data/changelog-data.js):
        // la pastilla de versión y los títulos de los chivatos priorizan la release más reciente.
        const META = window.SB_META || { version: "", changes: {} };
        const CHANGELOG = Array.isArray(window.SB_CHANGELOG) ? window.SB_CHANGELOG : [];
        const CURRENT_VERSION = (CHANGELOG[0] && CHANGELOG[0].version) || META.version || "";
        const CHANGES = META.changes || {};
        const elVer = document.getElementById("cbVer");
        if (elVer && CURRENT_VERSION) { elVer.hidden = false; elVer.textContent = "v." + CURRENT_VERSION; }
        // Badge "chivato" para la fila de un componente con cambios en esta versión.
        function statusBadge(id) {
            const st = CHANGES[id];
            if (!st) return "";
            const isNew = st === "new";
            const label = isNew ? "NEW" : "UPD";
            const title = CURRENT_VERSION
                ? ((isNew ? "Nuevo" : "Actualizado") + " en v." + esc(CURRENT_VERSION))
                : (isNew ? "Nuevo" : "Actualizado");
            return '<span class="cb-status cb-status--' + (isNew ? "new" : "upd") + '" title="' + title + '">' + label + '</span>';
        }
        function signalBadges(comp) {
            const signals = Array.isArray(comp && comp.signals) ? comp.signals : [];
            return signals.map(function (key) {
                const meta = SIGNALS[key];
                if (!meta) return "";
                return '<span class="cb-status cb-status--' + meta.className + '" title="' + esc(meta.title) + '">' + meta.label + '</span>';
            }).join("");
        }

        const elTree = document.getElementById("cbTree");
        const elFrame = document.getElementById("cbFrame");
        const elMain = document.getElementById("cbMain");
        const elPanelBody = document.getElementById("cbPanelBody");
        const elDocs = document.getElementById("cbDocs");
        let snippet = ""; // HTML derivado de la story activa (pestaña Code)
        const activeFacets = {}; // group → Set<token> de filtros activos (chips del sidebar)

        // Base de CSS derivada del <link> del DS → el iframe carga el setting+index de la marca
        // desde aquí, así funciona sea cual sea la ubicación del HTML.
        const rootCss = document.getElementById("brandStyles-root");
        const href = rootCss ? rootCss.getAttribute("href") : "../cds-statics/css/brands/ux/setting.css";
        const cssBase = href.slice(0, href.indexOf("/css/") + 5); // ej. "../cds-statics/css/"

        // Estado. Vista de inicio = Changelog (página-doc) si existe → landing por defecto;
        // si no, el primer componente registrado.
        let curComp = components.find(c => c.id === "changelog") || components[0];
        let curSub = null;
        let curStory = null;
        let panel = "controls"; // controls | actions | a11y | code
        const actions = [];
        // Render perezoso del sidebar: bodies de grupo aún SIN poblar. clave = body del grupo,
        // valor = fn que lo construye. Al arranque solo se montan el 1er grupo y el de la story
        // activa; el resto se puebla al expandirse (o al buscar). Evita crear ~1000+ nodos (con
        // su SVG inline + listener) de golpe — el coste que se notaba al desplegar, sobre todo en Firefox.
        const lazyGroups = new Map();

        // Estado del canvas-iframe (preview aislado → media queries reales del DS)
        let frameDoc = null, stageEl = null;        // documento del iframe y nodo donde se monta la story
        let storyUnmount = null;                    // cleanup opcional de la story montada en el stage
        let framePage = null;                        // src de la PÁGINA cargada en el iframe (kind:"page"); null = doc del chrome (markup de story). Las páginas completas (templates/layouts…) se cargan por URL, no por innerHTML: corren su propio <head>/CSS/JS.
        let pageAppliedClasses = [];                 // clases (marca + cabecera) que el chrome inyectó en el <body> de la página brandable activa; se retiran antes de re-aplicar (la cabecera regional no la captura BRAND_BODY_RE).
        let darkOn = false, curBg = "";             // dark/fondo: se re-aplican al (re)montar el iframe
        let curBrandKey = "showroom-brand-showroom"; // key vigente en BRAND_MAP (para reverse-lookup desde Cabecera)
        let curBrand = BRAND_MAP[curBrandKey];       // marca activa del iframe (default = ux)
        let curCabecera = null;                      // {bodyClass, parentClass, brandGroup, brandKey, label, mediaName} | null — OUTLET del CSV (eje único)
        const curCombos = new Set();                 // body_class de combinables (is_combinable) APILADOS sobre la cabecera (eje multi)
        let fsOn = false;                            // fullscreen: se propaga al iframe vía clase en su body
        let vpFixed = false;                         // viewport fijo (≠ "Responsive"): se propaga al iframe vía clase cb-vp-fixed → quita el padding del .cb-canvas (edge-to-edge en la resolución simulada)
        let curVision = "", curTextSize = "";        // a11y: simulación de visión (filtro SVG sobre el iframe element) + zoom de texto (font-size raíz dentro del iframe)
        let curForcedColors = "";                    // a11y: "" | "bw" | "wb" | "yb" — high contrast forzado (WCAG 1.4.11)
        let reducedMotion = false, focusVisible = false, textSpacing = false; // a11y toggles (WCAG 2.3.3 / 2.4.7 / 1.4.12)
        let inspectOn = false;                       // inspector de medidas (hover → outline + tooltip con W×H, font-size, padding, margin)

        // Snapshot de defaults (columna Default + reset). Idempotente → robusto ante
        // registro tardío/asíncrono (solo captura args que aún no se han snapshotteado).
        function snapshotDefaults() {
            const snap = o => { if (o.args && !o._defaults) o._defaults = Object.assign({}, o.args); };
            components.forEach(c => {
                snap(c);
                (c.stories || []).forEach(snap);
                (c.subgroups || []).forEach(sub => { snap(sub); (sub.stories || []).forEach(snap); });
            });
        }

        function keyOf(comp, sub, story) { return comp.id + ":" + (sub ? sub.id : "_") + ":" + story.id; }

        function cleanupStoryMount() {
            if (typeof storyUnmount !== "function") return;
            try { storyUnmount(); } catch (_) { /* cleanup defensivo: no romper el motor */ }
            storyUnmount = null;
        }

        /* Crea el contenedor plegable que sigue a una cabecera y cablea el accordion
           (click + teclado + aria-expanded). Devuelve el body donde anidar los hijos. */
        function makeBody(header, collapsed) {
            const body = document.createElement("div");
            body.className = "cb-tree__body";
            header.after(body);
            header.classList.add("cb-tree__toggle");
            header.setAttribute("role", "button");
            header.setAttribute("tabindex", "0");
            if (collapsed) { header.classList.add("is-collapsed"); body.hidden = true; }
            header.setAttribute("aria-expanded", String(!collapsed));
            const toggle = () => {
                const collapsed = header.classList.toggle("is-collapsed");
                header.setAttribute("aria-expanded", String(!collapsed));
                body.hidden = collapsed;
                // Render perezoso: primer despliegue de un grupo aún sin poblar → constrúyelo ahora.
                if (!collapsed && lazyGroups.has(body)) {
                    const build = lazyGroups.get(body);
                    lazyGroups.delete(body);
                    build();
                }
            };
            header.addEventListener("click", toggle);
            header.addEventListener("keydown", e => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
            });
            return body;
        }

        /* Expande (despliega) todas las cabeceras-acordeón ancestro de un nodo, para que
           la story activa quede visible aunque los componentes arranquen plegados. */
        function expandAncestors(el) {
            let body = el && el.closest(".cb-tree__body");
            while (body) {
                body.hidden = false;
                const header = body.previousElementSibling;
                if (header && header.classList.contains("cb-tree__toggle")) {
                    header.classList.remove("is-collapsed");
                    header.setAttribute("aria-expanded", "true");
                }
                const parent = body.parentElement;
                body = parent ? parent.closest(".cb-tree__body") : null;
            }
        }

        /* Un hint que es un SELECTOR (.clase o [atributo]) NO se muestra como etiqueta en
           el sidebar: el nombre de la clase ya vive en el Overview (práctica del DS, ver
           mode-storybook-doc / -migrate). Los hints DESCRIPTIVOS ("4 variantes"…) sí se ven. */
        const isSelectorHint = h => /^[.\[]/.test((h || "").trim());

        function storySearchSource(story) {
            if (!story) return "";
            if (story.kind === "page" && story.src) {
                const parts = String(story.src).split("/");
                return parts[parts.length - 1] || "";
            }
            return story.id || "";
        }

        function buildSearchIndex(comp, sub, story) {
            return normForSearch([
                story && story.name,
                story && story.hint,
                story && story.id,
                storySearchSource(story),
                comp && comp.id,
                comp && comp.name,
                comp && comp.group,
                sub && sub.id,
                sub && sub.name
            ].filter(Boolean).join(" "));
        }

        function addStoryNode(comp, sub, story, nested, parent) {
            const b = document.createElement("button");
            b.type = "button";
            b.className = "cb-story" + (nested ? " cb-story--nested" : "") + (story.kind === "docs" ? " cb-story--docs" : "");
            b.dataset.key = keyOf(comp, sub, story);
            // Datos del buscador: el label se reconstruye en applyFilter (con o sin
            // <mark>), y dataset.search concentra todos los campos buscables ya
            // normalizados (sin acentos, lowercase) para que el filtro sea O(1) por
            // story sin walks del DOM.
            b.dataset.name = story.name;
            b.dataset.hint = story.hint || "";
            b.dataset.search = buildSearchIndex(comp, sub, story);
            // Facets para los chips de filtro (ver FILTERS): nivel por grupo + tecnología "amp"
            // (story en el subgrupo AMP) | "html" (cualquier otra). Cada story lleva EXACTAMENTE
            // una de las dos → los chips AMP/HTML diferencian las dos versiones (OR en el group
            // "feat": activar ambos = todo). Tokens space-joined → match O(1) en applyFilter.
            const facets = ["lvl-" + normForSearch(comp.group)];
            facets.push(sub && sub.id === "amp" ? "amp" : "html");
            if (CHANGES[comp.id]) facets.push("changed");   // chivato → faceta de filtro "Changed"
            (Array.isArray(comp.signals) ? comp.signals : []).forEach(function (key) {
                const meta = SIGNALS[key];
                if (meta) facets.push(meta.token);
            });
            b.dataset.facets = facets.join(" ");
            const ico = story.kind === "docs" ? IC_DOC : IC_STORY;
            b.innerHTML = ico + "<span>" + esc(story.name) +
                (story.hint && !isSelectorHint(story.hint) ? ' <small class="cb-story__hint">' + esc(story.hint) + '</small>' : '') + "</span>";
            b.addEventListener("click", () => select(comp, sub, story));
            parent.appendChild(b);
        }

        /* ─── Sidebar (group → componente → [Overview] + subgrupos → stories), con
           accordion por sección. Re-ejecutable: SB.refresh() lo remonta cuando un
           módulo añade stories async (p.ej. tras un fetch de un .html de markup). ─── */
        function buildTree() {
            snapshotDefaults();
            elTree.innerHTML = "";
            lazyGroups.clear();                  // los bodies del build anterior quedan huérfanos
            const groups = {};
            components.forEach(c => { (groups[c.group] = groups[c.group] || []).push(c); });
            // Orden ALFABÉTICO de los componentes DENTRO de cada grupo (por nombre visible,
            // localeCompare 'es' → respeta acentos/ñ). Lo impone el MOTOR, no el orden de
            // <script> en index-storybook.html → cualquier componente nuevo (de MIGRATE o DOC,
            // o una familia de índice-página) aparece alfabético automáticamente, sin colocar
            // el <script> a mano. El ORDEN DE GRUPOS (GROUP_ORDER + no-canónicos al final) y el
            // de las STORIES dentro de un componente (Base primero…) NO se tocan.
            Object.keys(groups).forEach(g => groups[g].sort((a, b) => {
                var sa = a.sort != null ? a.sort : 0;
                var sb = b.sort != null ? b.sort : 0;
                if (sa !== sb) return sa - sb;
                return (a.name || "").localeCompare(b.name || "", "es");
            }));

            // Contador de stories navegables de un componente: stories planas + las de sus
            // subgrupos (Galleries/Markup). NO cuenta el nodo Overview (docs), que es 1 fijo
            // por componente y no es una "variante". Alimenta los badges de grupo/componente.
            const storyCount = c => (c.stories ? c.stories.length : 0)
                + (c.subgroups ? c.subgroups.reduce((n, s) => n + (s.stories ? s.stories.length : 0), 0) : 0)
                || (c.overview ? 1 : 0);   // página-doc standalone (solo overview) cuenta como 1
            // Página-doc standalone: componente con overview y SIN stories ni subgrupos (p.ej.
            // "Changelog", "Introducción") → en el árbol es un ÚNICO nodo clicable que abre Docs,
            // no una carpeta con "Overview" dentro (patrón de páginas-doc tipo MDX de Storybook).
            const isSingleDoc = c => !!c.overview && !(c.stories && c.stories.length) && !(c.subgroups && c.subgroups.length);
            // Badge de conteo (estático = TOTAL, como Storybook; la búsqueda no lo altera — el
            // recuento de resultados vive en #cbSearchMeta). `margin-left:auto` lo ancla a la derecha.
            const countBadge = n => '<span class="cb-tree__count" title="' + n + (n === 1 ? ' story' : ' stories') + '">' + n + '</span>';

            // Orden canónico del sidebar. Hasta ahora el orden lo dictaba el orden de
            // carga de scripts en index-storybook.html (frágil ante reordenamientos).
            // Aquí lo fijamos explícitamente y al final añadimos cualquier grupo no
            // contemplado (escapable: añadir un grupo nuevo no requiere tocar engine).
            // Setup va el PRIMERO de todos: reglas genéricas que conforman la base de cada
            // marca (reset CSS, charset) sobre las que después se aplican Helpers y
            // componentes. Helpers van segundo porque son las primitivas reutilizadas en
            // todo el sistema; el resto sigue la jerarquía atómica.
            const GROUP_ORDER = ["Docs", "Setup", "Helpers", "Atoms", "Molecules", "Organisms", "Templates", "Layouts", "Widgets", "Recursos", "POCs", "Externals", "Gallery"];
            const sortedKeys = GROUP_ORDER.filter(g => groups[g])
                .concat(Object.keys(groups).filter(g => GROUP_ORDER.indexOf(g) < 0));

            // Puebla el body de un grupo con sus componentes/stories. Se llama al construir el
            // árbol (1er grupo + grupo activo) o de forma PEREZOSA al expandir un grupo plegado
            // (toggle en makeBody) o al buscar (applyFilter). Cierra sobre storyCount/countBadge/
            // groups de ESTA invocación de buildTree → sigue válida aunque buildTree ya retornara.
            function populateGroup(gBody, comps) {
                comps.forEach(c => {
                    // Página-doc standalone → un solo nodo clicable (abre Docs), sin carpeta/Overview.
                    if (isSingleDoc(c)) {
                        const b = document.createElement("button");
                        b.type = "button";
                        b.className = "cb-story cb-story--docs cb-story--page";
                        b.dataset.key = keyOf(c, null, DOCS_NODE);
                        b.dataset.name = c.name;
                        b.dataset.hint = "";
                        b.dataset.search = buildSearchIndex(c, null, {
                            id: c.id,
                            name: c.name,
                            hint: "",
                            kind: "docs"
                        });
                        const facets = ["lvl-" + normForSearch(c.group)];
                        (Array.isArray(c.signals) ? c.signals : []).forEach(function (key) {
                            const meta = SIGNALS[key];
                            if (meta) facets.push(meta.token);
                        });
                        b.dataset.facets = facets.join(" ");
                        b.innerHTML = (c.icon ? ICONS.svg(c.icon, "cb-story__ico") : IC_DOC) + "<span>" + esc(c.name) + "</span>" + signalBadges(c) + statusBadge(c.id);
                        b.addEventListener("click", () => select(c, null, DOCS_NODE));
                        gBody.appendChild(b);
                        return;
                    }
                    const ch = document.createElement("div");
                    ch.className = "cb-tree__component";
                    ch.innerHTML = IC_CARET + (c.icon ? ICONS.svg(c.icon, "cb-ic") : IC_FOLDER) + "<span>" + esc(c.name) + "</span>" + signalBadges(c) + statusBadge(c.id) + countBadge(storyCount(c));
                    gBody.appendChild(ch);
                    // Componentes PLEGADOS por defecto: el grupo muestra una lista limpia de
                    // nombres; se expanden al clicar (la story activa se expande sola, ver select).
                    const cBody = makeBody(ch, true);

                    // Overview + stories planas (estilo Carbon: variantes directas)
                    addStoryNode(c, null, DOCS_NODE, false, cBody);
                    (c.stories || []).forEach(s => addStoryNode(c, null, s, false, cBody));

                    // Grupos anidados (estilo "Set Of Buttons")
                    (c.subgroups || []).forEach(sub => {
                        const sh = document.createElement("div");
                        sh.className = "cb-tree__subgroup";
                        sh.innerHTML = IC_CARET + IC_GROUP + "<span>" + esc(sub.name) + "</span>" +
                            (sub.hint && !isSelectorHint(sub.hint) ? ' <small>' + esc(sub.hint) + '</small>' : '');
                        cBody.appendChild(sh);
                        const sBody = makeBody(sh, sub.collapsed);
                        (sub.stories || []).forEach(s => addStoryNode(c, sub, s, true, sBody));
                    });
                });
            }

            sortedKeys.forEach((g, gi) => {
                const groupTotal = groups[g].reduce((n, c) => n + storyCount(c), 0);
                const gh = document.createElement("div");
                gh.className = "cb-tree__group";
                gh.innerHTML = IC_CARET + "<span>" + esc(g) + "</span>" + countBadge(groupTotal);
                elTree.appendChild(gh);
                // Grupos PLEGADOS por defecto salvo el PRIMERO (gi === 0): el sidebar arranca
                // limpio (solo cabeceras de grupo) y el primero deja ver su contenido. La story
                // activa expande sus ancestros sola (expandAncestors). La BÚSQUEDA no se ve
                // afectada: applyFilter fuerza visibles las ramas con coincidencias e ignora el
                // is-collapsed cuando hay query (solo respeta el plegado con la query vacía).
                const gBody = makeBody(gh, gi > 0);

                // RENDER PEREZOSO: al arranque solo poblamos el 1er grupo y el grupo de la story
                // activa (curComp). Los demás quedan registrados en lazyGroups y se pueblan al
                // expandirse (o al buscar). Evita montar ~1000+ nodos de golpe → arranque fluido.
                const buildNow = gi === 0 || (curComp && curComp.group === g);
                if (buildNow) populateGroup(gBody, groups[g]);
                else lazyGroups.set(gBody, () => populateGroup(gBody, groups[g]));
            });

            // Conserva el resaltado de la selección activa y re-aplica el filtro de búsqueda
            if (curStory) {
                const k = keyOf(curComp, curSub, curStory);
                elTree.querySelectorAll(".cb-story").forEach(b => b.classList.toggle("is-active", b.dataset.key === k));
                expandAncestors(elTree.querySelector(".cb-story.is-active"));
            }
            applyFilter(document.getElementById("cbSearch").value);
        }

        /* ─── Búsqueda — multi-campo, tokenizada, accent-insensitive ───
           Antes filtraba por substring puro contra `textContent` de cada story; no
           encontraba "boton" sobre "Botón" ni separaba el texto del componente del
           texto de la story. Ahora:
             1) dataset.search en cada story concentra story+hint+componente+grupo+
                subgrupo, todo normalizado (lowercase + sin diacríticos).
             2) La query se parte en tokens; un story matchea si TODOS sus tokens
                aparecen en dataset.search (AND).
             3) Las ramas (subgrupo · componente · grupo) se esconden si no tienen
                descendientes visibles.
             4) Las coincidencias se resaltan con <mark> usando un regex que es
                insensible a diacríticos en el render (para que "boton" haga
                highlight sobre "Botón" tal cual lo ve el usuario).
             5) Contador, botón clear y empty state se sincronizan con el resultado. */

        // Quita acentos y pasa a lowercase. Usado al guardar dataset.search y al
        // tokenizar la query.
        function normForSearch(s) {
            return (s || "").toLowerCase()
                .normalize("NFD").replace(/[̀-ͯ]/g, "")
                .trim();
        }

        // Para el regex de highlight: cada letra del token se expande a una char
        // class que cubre sus variantes diacríticas. Permite que la query "boton"
        // pinte <mark> sobre "Botón" en el render real (que aún lleva tilde).
        const DIA = {
            a: "[aàáâãäå]", e: "[eèéêë]", i: "[iìíîï]", o: "[oòóôõö]",
            u: "[uùúûü]", n: "[nñ]", c: "[cç]", y: "[yÿ]"
        };
        function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
        function diacriticInsensitivePattern(token) {
            return token.split("").map(ch => DIA[ch.toLowerCase()] || escapeRe(ch)).join("");
        }
        function highlightText(text, re) {
            const escaped = esc(text);
            return re ? escaped.replace(re, '<mark class="cb-search__hit">$&</mark>') : escaped;
        }

        function applyFilter(query) {
            const q = (query || "").trim();
            // Facets activos por group (chips). OR dentro del group, AND entre groups, AND con texto.
            const facetGroups = Object.keys(activeFacets).filter(g => activeFacets[g] && activeFacets[g].size);
            const anyFacet = facetGroups.length > 0;
            const filtering = !!q || anyFacet;   // hay búsqueda de texto y/o filtros activos
            // Con filtrado activo el recorrido necesita TODO el árbol montado. Si quedan grupos
            // perezosos sin poblar, los poblamos ahora (una vez; al limpiar no se re-pliegan).
            if (filtering && lazyGroups.size) {
                lazyGroups.forEach(build => build());
                lazyGroups.clear();
            }
            const tokens = q ? q.split(/\s+/).map(normForSearch).filter(Boolean) : [];
            const hlRe = tokens.length
                ? new RegExp(tokens.map(diacriticInsensitivePattern).join("|"), "gi")
                : null;

            // 1) Stories: visible si pasa el TEXTO (todos los tokens en dataset.search) Y los FACETS
            //    (en cada group activo, ≥1 token presente en dataset.facets).
            let matchCount = 0;
            elTree.querySelectorAll(".cb-story").forEach(b => {
                const textOk = !tokens.length || tokens.every(t => (b.dataset.search || "").includes(t));
                let facetOk = true;
                if (anyFacet) {
                    const facets = (b.dataset.facets || "").split(" ");
                    facetOk = facetGroups.every(g => {
                        let hit = false;
                        activeFacets[g].forEach(t => { if (facets.indexOf(t) >= 0) hit = true; });
                        return hit;
                    });
                }
                const ok = textOk && facetOk;
                b.hidden = !ok;
                if (ok) matchCount++;
                // Rebuilds del label con highlight (siempre, no solo cuando ok — al
                // borrar query queremos volver al estado limpio)
                const label = b.querySelector("span");
                if (label) {
                    const name = b.dataset.name || "";
                    const hint = b.dataset.hint || "";
                    label.innerHTML = highlightText(name, hlRe)
                        + (hint && !isSelectorHint(hint) ? ' <small class="cb-story__hint">' + highlightText(hint, hlRe) + '</small>' : "");
                }
            });

            // 2) Esconde ramas vacías (subgrupo · componente · grupo). Orden
            // inner→outer para que cada nivel ya cuente con la visibilidad recién
            // calculada del inferior. Si el cuerpo no tiene descendientes visibles,
            // se ocultan el header Y el body. Si los tiene y hay filtrado activo, se
            // fuerza expandido (para que el match no quede escondido por collapse).
            function collapseAncestors(selector) {
                elTree.querySelectorAll(selector).forEach(header => {
                    const body = header.nextElementSibling;
                    if (!body || !body.classList.contains("cb-tree__body")) return;
                    const hasVisible = Array.from(body.querySelectorAll(".cb-story")).some(s => !s.hidden);
                    // SIN filtrado no se oculta ninguna cabecera: un body vacío puede ser un grupo
                    // PEREZOSO aún sin poblar (no "sin resultados"). El ocultado por vacío solo
                    // aplica durante el filtrado. El plegado (body.hidden) sí respeta is-collapsed.
                    header.hidden = filtering ? !hasVisible : false;
                    body.hidden = (filtering && !hasVisible)
                        || (!filtering && header.classList.contains("is-collapsed"));
                });
            }
            collapseAncestors(".cb-tree__subgroup");
            collapseAncestors(".cb-tree__component");
            collapseAncestors(".cb-tree__group");

            // 3) Contador + clear + atajo + empty state
            const meta = document.getElementById("cbSearchMeta");
            if (meta) {
                if (filtering) {
                    meta.hidden = false;
                    meta.textContent = matchCount === 0
                        ? "Sin resultados"
                        : matchCount + (matchCount === 1 ? " resultado" : " resultados");
                } else {
                    meta.hidden = true;
                    meta.textContent = "";
                }
            }
            const clearBtn = document.getElementById("cbSearchClear");
            const shortcut = document.getElementById("cbSearchShortcut");
            if (clearBtn) clearBtn.hidden = !filtering;   // aparece con texto Y/O filtros activos
            if (shortcut) shortcut.hidden = filtering;    // se oculta cuando aparece ✕ (no se solapan)
            const empty = document.getElementById("cbTreeEmpty");
            const emptyQ = document.getElementById("cbTreeEmptyQ");
            if (empty && emptyQ) {
                if (filtering && matchCount === 0) {
                    empty.hidden = false;
                    emptyQ.textContent = q || "los filtros activos";
                } else {
                    empty.hidden = true;
                }
            }
        }

        buildTree();
        // Los módulos llaman a SB.refresh() tras añadir stories asíncronas (fetch de markup).
        // Si el motor arrancó con el catálogo aún vacío (todo diferido), el primer módulo que
        // llegue adopta la landing: sin esto el chrome quedaría montado pero sin story activa.
        window.SB.refresh = function () {
            buildTree();
            if (curComp || !components.length) return;
            curComp = components.find(c => c.id === "changelog") || components[0];
            const first = firstOf(curComp);
            select(curComp, first.sub, first.story);
        };

        /* Marca activa del canvas (genérico): la usa js/amp/amp.js para cargar el bundle CSS AMP
           de la marca vigente (amp-<slug>-index.css) en su iframe-sandbox, y reaccionar al toolbar
           Brand (mountFrame re-renderiza la story → este valor se lee fresco). `setting` = href
           completo del setting.css de la marca (mismo que compone frameHTML). `cssBase` = base
           relativa a index-storybook.html (p.ej. "../cds-statics/css/"). */
        window.SB.currentBrand = function () {
            return { key: curBrandKey, cssBase: cssBase, setting: cssBase + "brands/" + curBrand.css };
        };

        const cbSearchInput = document.getElementById("cbSearch");
        const cbSearchClearBtn = document.getElementById("cbSearchClear");
        // Debounce SOLO del path de texto: applyFilter recorre TODAS las stories (~1000 nodos:
        // querySelectorAll + reescritura de innerHTML de cada label + 3× collapseAncestors) en
        // cada pulsación → jank al teclear rápido con el catálogo grande. ~100ms coalesce ráfagas
        // de teclas en un solo barrido, imperceptible. Los demás caminos (chips, clear, Escape,
        // buildTree) siguen llamando a applyFilter SÍNCRONO (respuesta inmediata donde importa).
        let searchDebounce = 0;
        cbSearchInput.addEventListener("input", e => {
            const v = e.target.value;
            if (searchDebounce) clearTimeout(searchDebounce);
            searchDebounce = setTimeout(() => { searchDebounce = 0; applyFilter(v); }, 100);
        });

        // ─── Chips de filtro faceted (FILTERS) ───
        const elFilters = document.getElementById("cbFilters");
        // Badge con el nº de filtros activos en el toggle (visible aun plegado).
        function updateFilterCount() {
            const n = Object.keys(activeFacets).reduce((a, g) => a + (activeFacets[g] ? activeFacets[g].size : 0), 0);
            const badge = document.getElementById("cbFiltersCount");
            if (badge) { badge.hidden = !n; badge.textContent = n; }
        }
        function makeChip(f) {
            const chip = document.createElement("button");
            chip.type = "button";
            chip.className = "cb-filter";
            chip.dataset.token = f.token;
            chip.dataset.group = f.group;
            chip.setAttribute("aria-pressed", "false");
            if (f.title) chip.title = f.title;
            chip.textContent = f.label;
            chip.addEventListener("click", () => {
                const set = activeFacets[f.group] || (activeFacets[f.group] = new Set());
                const on = set.has(f.token) ? (set.delete(f.token), false) : (set.add(f.token), true);
                chip.classList.toggle("is-active", on);
                chip.setAttribute("aria-pressed", String(on));
                updateFilterCount();
                applyFilter(cbSearchInput.value);
            });
            return chip;
        }
        if (elFilters) {
            // Agrupa los chips por `section` (orden de aparición) → cada sección con su etiqueta.
            const order = [], bySec = {};
            FILTERS.forEach(f => {
                const sec = f.section || "Filtros";
                if (!bySec[sec]) { bySec[sec] = []; order.push(sec); }
                bySec[sec].push(f);
            });
            order.forEach(sec => {
                const grp = document.createElement("div");
                grp.className = "cb-filters__group";
                const lbl = document.createElement("span");
                lbl.className = "cb-filters__label";
                lbl.textContent = sec;
                grp.appendChild(lbl);
                const row = document.createElement("div");
                row.className = "cb-filters__row";
                bySec[sec].forEach(f => row.appendChild(makeChip(f)));
                grp.appendChild(row);
                elFilters.appendChild(grp);
            });
        }
        // Resetea todos los chips de filtro (estado + UI).
        function clearFacets() {
            Object.keys(activeFacets).forEach(g => activeFacets[g].clear());
            elFilters && elFilters.querySelectorAll(".cb-filter.is-active").forEach(c => {
                c.classList.remove("is-active"); c.setAttribute("aria-pressed", "false");
            });
            updateFilterCount();
        }
        // Toggle plegar/desplegar la barra de chips.
        const elFiltersToggle = document.getElementById("cbFiltersToggle");
        const elFilterbar = document.getElementById("cbFilterbar");
        if (elFiltersToggle && elFilterbar) {
            elFiltersToggle.addEventListener("click", () => {
                const collapsed = elFilterbar.classList.toggle("is-collapsed");
                elFiltersToggle.setAttribute("aria-expanded", String(!collapsed));
            });
        }

        // Atajo: "/" enfoca el buscador (estándar Storybook/GitHub). Esc dentro del
        // input vacía la query y, si ya está vacío, desenfoca.
        document.addEventListener("keydown", (e) => {
            if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return;
            const t = e.target;
            if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA"
                || t.tagName === "SELECT" || t.isContentEditable)) return;
            e.preventDefault();
            cbSearchInput.focus();
            cbSearchInput.select();
        });
        cbSearchInput.addEventListener("keydown", (e) => {
            if (e.key !== "Escape") return;
            if (cbSearchInput.value) {
                cbSearchInput.value = "";
                applyFilter("");
            } else {
                cbSearchInput.blur();
            }
        });
        if (cbSearchClearBtn) {
            cbSearchClearBtn.addEventListener("click", () => {
                cbSearchInput.value = "";
                clearFacets();           // el botón ✕ limpia texto Y filtros
                applyFilter("");
                cbSearchInput.focus();
            });
        }

        /* ─── argTypes / args activos (del subgrupo si existe, si no del componente) ─── */
        const activeArgTypes = () => (curStory && curStory.argTypes) || (curSub && curSub.argTypes) || curComp.argTypes || null;
        const activeArgs = () => (curStory && curStory.args) || (curSub && curSub.args) || curComp.args || null;
        const activeDefaults = () => (curStory && curStory._defaults) || (curSub && curSub._defaults) || curComp._defaults || {};

        /* ─── Selección ─── */
        function select(comp, sub, story) {
            cleanupStoryMount();
            curComp = comp; curSub = sub; curStory = story;
            const k = keyOf(comp, sub, story);
            elTree.querySelectorAll(".cb-story").forEach(b => b.classList.toggle("is-active", b.dataset.key === k));
            expandAncestors(elTree.querySelector(".cb-story.is-active"));
            const at = activeArgTypes();
            // Cuenta controles: interactivas (markup en stage) y páginas con argTypes
            // (toggles que mutan el <body> vivo, p.ej. masthead → .minimal-header).
            document.getElementById("cbCtrlCount").textContent = ((story.kind === "interactive" || story.kind === "page") && at) ? at.length : 0;
            // Página completa (templates/layouts…): el iframe navega al fichero, no se monta markup.
            if (story.kind === "page") {
                setView("canvas");
                const navigated = navigatePage(story.src);
                setPageGlobals(story);
                // Al cargar la página aplicamos el estado GLOBAL: brandable → marca+cabecera+dark
                // (applyBrandToPage); cualquier otra → solo dark (universal). Los <script defer>
                // de la página corren ANTES del load event → nuestro ajuste gana.
                if (navigated) {
                    const onLoad = () => {
                        elFrame.removeEventListener("load", onLoad);
                        if (story.brandable) applyBrandToPage(curBrandKey);
                        else applyDarkToPage();
                        applyPageArgs();      // controles de la página (toggles de clase en su <body>)
                    };
                    elFrame.addEventListener("load", onLoad);
                }
                renderPanel();
                return;
            }
            // Veníamos de una página: el doc del iframe es el del fichero, no el del chrome.
            // Reconstruimos el doc del chrome (mountFrame pone framePage=null y re-renderiza la story).
            if (framePage !== null) mountFrame();
            setPageGlobals(story);                    // componente normal → globals operativos
            if (story.kind === "docs") { setView("docs"); }
            else { setView("canvas"); renderCanvas(); renderPanel(); }
        }

        /* Navega el iframe a una PÁGINA COMPLETA (kind:"page"). A diferencia de mountFrame()
           —que escribe el doc del chrome y monta markup—, aquí cargamos el fichero por URL:
           corre su propio <head>/CSS/JS. El stage del chrome deja de existir (lo posee la
           página) → anulamos stageEl/frameDoc. Viewport/Visión/Fullscreen siguen aplicando
           porque viven en el elemento iframe del padre. Idempotente: no recarga si ya está. */
        function navigatePage(src) {
            if (!elFrame || !src) return false;
            if (framePage === src) return false;     // ya cargada → no recargar
            cleanupStoryMount();
            framePage = src;
            pageAppliedClasses = [];                 // página nueva: las clases que aplicamos antes ya no existen
            frameDoc = null; stageEl = null;
            elFrame.src = src;
            return true;                             // navegación real disparada (habrá load event)
        }

        /* Conmuta la MARCA de una página completa BRANDABLE (templates) alcanzando su propio
           documento (same-origin): swap de los <link> #brandStyles-root/#brandStyles + clases
           ft-brand-* del <body>. Réplica EXACTA de cds-statics/js/showroom/showroom-init.js
           (BRAND_MAP coincide con su brandClassMapping). Idempotente; no-op si la página no
           tiene el <link> conmutable (= no es realmente brandable). La base de css se deriva
           del href existente (la página puede estar a otra profundidad que el chrome). */
        const BRAND_BODY_RE = /\b(ft-brand-\S+|ep|epe|sport|regionales|woman|cuore|viajar)\b/g;
        function applyBrandToPage(brandKey) {
            if (!elFrame) return;
            const cfg = BRAND_MAP[brandKey]; if (!cfg) return;
            let doc; try { doc = elFrame.contentDocument; } catch (_) { return; }
            if (!doc || !doc.body) return;
            const rootLink = doc.getElementById("brandStyles-root");
            if (!rootLink) return;                   // la página no es conmutable por marca
            const h = rootLink.getAttribute("href") || "";
            const i = h.indexOf("/css/");
            const base = i >= 0 ? h.slice(0, i + 5) : "../../cds-statics/css/";  // p.ej. "../../cds-statics/css/"
            rootLink.setAttribute("href", base + "brands/" + cfg.css);
            const idxLink = doc.getElementById("brandStyles");
            if (idxLink) idxLink.setAttribute("href", base + cfg.index);
            // Clases del <body> de la página: marca (BRAND_MAP) + (si hay) cabecera del CSV
            // (body_class del outlet). Mismo set que frameHTML() compone para los componentes.
            // 1) retira lo que aplicamos la vez anterior (cabecera regional no la pilla el RE),
            // 2) retira cualquier ft-brand-*/token (incl. la marca autoría de la página),
            // 3) añade marca nueva + cabecera. Las clases propias (fourty, ft-skin…) no se tocan.
            if (pageAppliedClasses.length) doc.body.classList.remove(...pageAppliedClasses);
            const brandTokens = doc.body.className.match(BRAND_BODY_RE) || [];
            if (brandTokens.length) doc.body.classList.remove(...brandTokens);
            const toAdd = cfg.classes.concat(cabeceraClasses()).filter(Boolean);
            doc.body.classList.add(...toAdd);
            pageAppliedClasses = toAdd;
            // Mantén el dark REAL del DS coherente con el toggle global (data-theme en su <html>).
            doc.documentElement.setAttribute("data-theme", darkOn ? "dark" : "light");
        }

        /* Controles de una PÁGINA (kind:"page" con argTypes). Equivalente a renderCanvas()
           para páginas: no reescribe markup —el iframe posee el doc— sino que MUTA el
           documento vivo (same-origin). Cada argType con `bodyClass` togglea esa clase en el
           <body> de la página según su arg booleano (p.ej. masthead → `.minimal-header`, que
           es un modificador de ANCESTRO: `.minimal-header .ft-org-masthead`). Se invoca tras
           el load de la página y en cada cambio de control. Idempotente. No colisiona con
           applyBrandToPage: las clases de marca/cabecera van por su cuenta (BRAND_BODY_RE no
           captura estos modificadores), así que sobreviven a un swap de marca. */
        function applyPageArgs() {
            if (!elFrame || !curStory || curStory.kind !== "page") return;
            const at = curStory.argTypes; if (!at || !at.length) return;
            let doc; try { doc = elFrame.contentDocument; } catch (_) { return; }
            if (!doc || !doc.body) return;
            const a = activeArgs() || {};
            at.forEach(t => { if (t.bodyClass) doc.body.classList.toggle(t.bodyClass, !!a[t.key]); });
        }

        /* Estado de los globals según la story activa. Sobre una PÁGINA completa, Brand/
           Cabecera/Fondo/Oscuro se atenúan y bloquean PORQUE no aplican… salvo en templates
           (brandable): la página es multimarca, así que Brand y Oscuro SIGUEN operativos (el
           motor conmuta su <link>/clases). Cabecera y Fondo quedan inertes en cualquier página.
           Viewport/Visión/Fullscreen no se tocan (viven en el iframe padre). En un componente
           normal (no-page) todos quedan operativos. */
        function setPageGlobals(story) {
            const isPage = !!(story && story.kind === "page");
            const brandable = isPage && !!story.brandable;
            const tipBrand = "La página fija su propia marca: este control no aplica aquí.";
            const tipPage = "No aplica sobre una página completa.";
            const set = (suffix, off, tip) => {
                const wrap = document.querySelector(".cb-globals.cb-globals" + suffix);
                if (!wrap) return;
                wrap.classList.toggle("is-disabled", off);
                if (off) wrap.title = tip; else wrap.removeAttribute("title");
            };
            set("--brand", isPage && !brandable, tipBrand);    // templates: operativo
            set("--theme", false, tipPage);                    // SIEMPRE operativo: dark = data-theme en <html>, mecanismo universal del DS (toda página lo soporta, sea multimarca o no)
            set("--cabecera", isPage && !brandable, tipBrand); // templates: operativo (outlet del CSV = marca + clases)
            set("--bg", isPage, tipPage);                      // fondo del canvas: nunca aplica a una página
        }

        /* ─── View Canvas/Docs — la determina la selección del sidebar
           (nodo Overview → docs · story → canvas); sin pestañas en el toolbar ─── */
        function setView(v) {
            elMain.classList.toggle("is-docs", v === "docs");
            if (v === "docs") renderDocs();
        }

        /* ─── Canvas (dentro del iframe) ───
           El stage vive en el iframe para que las media queries del DS respondan a su ancho
           (selector de viewport). Default: flex-wrap arriba-izquierda; full = bloque a todo
           el ancho (layout: btnGroup, organismos…).

           _sharedStyle: CSS experimental del componente declarado a nivel de archivo en
           <x>.html (ver loadMarkup). Se inyecta como primer hijo del stage con el marcador
           data-cb-shared, de modo que el snippet del panel Code lo excluya (los estilos
           experimentales no son markup canónico del DS). */
        function renderCanvas() {
            // Solo stories con markup (interactive/gallery) montan en el stage. docs y page
            // no tienen render → salir (evita escribir en un stage inexistente al venir de
            // una página, o un crash si mountFrame se dispara con un nodo Overview activo).
            if (!stageEl || !curStory || curStory.kind === "docs" || curStory.kind === "page") return;
            cleanupStoryMount();
            stageEl.classList.toggle("cb-canvas--full", !!curStory.full);
            const args = activeArgs();
            const sharedStyle = (curComp && curComp._sharedStyle)
                ? '<style data-cb-shared>' + curComp._sharedStyle + '</style>'
                : "";
            // assets: CSS extra del componente (p.ej. organismos brand-specific cuyo CSS NO está
            // en el bundle de la marca por defecto: header-revistas/regionales/multibrand). Igual
            // que la página de showroom, que añadía un <link> al CSS del componente sobre ux-index.
            // Puede ser array de hrefs o función(args) → hrefs (per-variante). Un <link rel=stylesheet>
            // inyectado vía innerHTML SÍ carga y aplica (a diferencia de <script>), y se re-evalúa en
            // cada render → al cambiar la variante carga el CSS de la marca correcta.
            const assetList = (curComp && curComp.assets)
                ? (typeof curComp.assets === "function" ? curComp.assets(args) : curComp.assets)
                : null;
            const assetLinks = (assetList && assetList.length)
                ? assetList.map(h => '<link rel="stylesheet" data-cb-asset href="' + h + '">').join("")
                : "";
            const body = curStory.kind === "interactive"
                ? curStory.render(args)
                : '<div class="cb-grid">' + curStory.render() + '</div>';
            stageEl.innerHTML = assetLinks + sharedStyle + body;
            const explicitCode = curStory && curStory.code
                ? (typeof curStory.code === "function" ? curStory.code(args) : curStory.code)
                : "";
            snippet = explicitCode || Array.from(stageEl.children)
                .filter(n => !(n.tagName === "STYLE" && n.hasAttribute("data-cb-shared")))
                .filter(n => !(n.tagName === "LINK" && n.hasAttribute("data-cb-asset")))
                .map(n => n.outerHTML).join("\n")
                // Colapsa el contenido de cualquier <svg> inline (agnóstico de componente)
                .replace(/(<svg\b[^>]*>)[\s\S]*?<\/svg>/g, "$1…</svg>");
            if (typeof curStory.onMount === "function") {
                const mounted = curStory.onMount({
                    stageEl: stageEl,
                    frameDoc: frameDoc,
                    args: args,
                    story: curStory,
                    component: curComp,
                    refreshPanels: function () {
                        if (panel === "code") renderCode();
                        scheduleContrastBadge(panel === "contrast" ? renderContrast() : null);
                    }
                });
                storyUnmount = typeof mounted === "function" ? mounted : null;
            }
            if (panel === "code") renderCode();
            // El badge de fallos se mantiene visible aunque el panel activo no sea Contraste,
            // porque sirve de señal "hay algo que mirar aquí" mientras se navega por otras tabs.
            // Con el panel abierto reutiliza la auditoría que este acaba de hacer; con el panel
            // cerrado la difiere a idle y la coalesce (ver scheduleContrastBadge).
            scheduleContrastBadge(panel === "contrast" ? renderContrast() : null);
        }

        /* HTML del documento del iframe. Lleva el CSS REAL del DS (setting + index de la
           marca activa): así las MEDIA QUERIES responden al ANCHO DEL IFRAME y el viewport
           simula mobile/tablet/desktop de verdad. <base> = misma URL que el padre → resuelve
           rutas relativas y los iconos absolutos /cds-statics de .ft-btn-nav / -rrss--primary.
           El layout del stage y de las galerías se inyecta aquí (no hay tokens .cb-* dentro). */
        function frameHTML() {
            const bodyCls = ["fourty", "ft-skin", "ft-skin--showroom"].concat(curBrand.classes);
            // Cabecera (CSV de medios): añade el body_class del outlet (vertical/hyperlocal,
            // p.ej. badalona) + los combinables apilados (noticia, premium…). La marca va por
            // curBrand.classes (arriba). Reproduce la config de producción. Ver cabeceraClasses().
            cabeceraClasses().forEach(c => bodyCls.push(c));
            if (darkOn) bodyCls.push("cb-dark");
            if (fsOn) bodyCls.push("cb-fullscreen");   // edge-to-edge cuando el chrome está plegado
            if (vpFixed) bodyCls.push("cb-vp-fixed");  // viewport ≠ Responsive → .cb-canvas sin padding
            // a11y: clases que activan las reglas inyectadas en el <style> del iframe (más abajo).
            // Sobreviven al remount por cambio de marca porque van en bodyCls aquí.
            if (curForcedColors) bodyCls.push("cb-a11y-fc-" + curForcedColors);
            if (reducedMotion) bodyCls.push("cb-a11y-rmotion");
            if (focusVisible) bodyCls.push("cb-a11y-focus");
            if (textSpacing) bodyCls.push("cb-a11y-spacing");
            return '<!DOCTYPE html><html lang="es" data-theme="' + (darkOn ? "dark" : "light") + '"><head>'
                + '<meta charset="utf-8">'
                + '<base href="' + location.href + '">'
                + '<link rel="stylesheet" href="' + cssBase + 'brands/' + curBrand.css + '">'
                + '<link rel="stylesheet" href="' + cssBase + curBrand.index + '">'
                + '<style>'
                + 'html,body{margin:0}*{box-sizing:border-box}'
                + '.cb-canvas{min-height:100vh;min-height:100dvh;padding:40px;display:flex;align-items:flex-start;justify-content:flex-start;flex-wrap:wrap;gap:16px}'
                + '.cb-canvas--full{display:block}'
                /* Fullscreen edge-to-edge: cuando .cb-fullscreen está activo en el body del
                   iframe, retiramos padding y gap para inspeccionar templates/layouts sin
                   gutters que falseen el bleed real del componente. */
                + 'body.cb-fullscreen .cb-canvas{padding:0;gap:0}'
                /* Viewport fijo (cualquier preset/medida ≠ "Responsive"): sin padding para
                   inspeccionar el componente edge-to-edge en la resolución simulada. Solo el
                   modo Responsive conserva el gutter de 40px. */
                + 'body.cb-vp-fixed .cb-canvas{padding:0}'
                /* ─── A11y simulations ───
                   Forced colors (WCAG 1.4.11): emula Windows HCM forzando un dúo de colores
                   sobre TODO el subtree. Selector universal con !important porque la idea
                   es ganar a cualquier color del DS (esa es la simulación). */
                + 'body[class*="cb-a11y-fc-"] *{color:inherit!important;background-color:transparent!important;border-color:currentColor!important;box-shadow:none!important;text-shadow:none!important}'
                + 'body.cb-a11y-fc-bw{color:#000!important;background-color:#fff!important}'
                + 'body.cb-a11y-fc-wb{color:#fff!important;background-color:#000!important}'
                + 'body.cb-a11y-fc-yb{color:#ff0!important;background-color:#000!important}'
                /* Reduced motion (WCAG 2.3.3): anula todas las animaciones y transiciones. */
                + 'body.cb-a11y-rmotion *,body.cb-a11y-rmotion *::before,body.cb-a11y-rmotion *::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;transition-delay:0s!important;scroll-behavior:auto!important}'
                /* Focus visible (WCAG 2.4.7): outline magenta de alta visibilidad al navegar
                   con Tab. Usamos :focus (no solo :focus-visible) para captarlo también con
                   click — útil al inspeccionar componentes que abren menus, dropdowns, etc. */
                + 'body.cb-a11y-focus :focus,body.cb-a11y-focus :focus-visible{outline:3px solid #ff00ff!important;outline-offset:2px!important;box-shadow:none!important}'
                /* Text spacing (WCAG 1.4.12): los 4 mínimos exactos del criterio AA.
                   Tu DS debe seguir leyéndose con esto activo; si rompe, no cumple. */
                + 'body.cb-a11y-spacing,body.cb-a11y-spacing *{letter-spacing:0.12em!important;word-spacing:0.16em!important;line-height:1.5!important}'
                + 'body.cb-a11y-spacing p{margin-bottom:2em!important}'
                + '.cb-grid{display:flex;flex-wrap:wrap;gap:28px 24px;width:100%}'
                + '.cb-spec{display:flex;flex-direction:column;gap:10px}'
                + '.cb-spec__label{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:11px;color:#525252}'
                + '.cb-spec__row{display:flex;align-items:center;gap:14px;flex-wrap:wrap}'
                + '.cb-block{width:100%}'
                + '.cb-block__h{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.07em;color:#525252;margin:4px 0 16px;padding-bottom:6px;border-bottom:1px solid #e0e0e0}'
                + '.cb-onDark{padding:28px}'
                + 'body.cb-dark .cb-spec__label,body.cb-dark .cb-block__h{color:#c6c6c6}'
                + 'body.cb-dark .cb-block__h{border-bottom-color:#393939}'
                + '</style></head><body class="' + bodyCls.join(" ") + '"><div class="cb-canvas" id="cbStage" data-id="sb-canvas"></div></body></html>';
        }

        /* (Re)monta el documento del iframe (boot · cambio de marca). Reescribe el doc,
           recupera el stage, re-aplica fondo, re-engancha el logger de acciones y re-renderiza. */
        function mountFrame() {
            if (!elFrame) return;
            framePage = null;                        // el chrome recupera la propiedad del iframe (deja de mostrar una página completa)
            pageAppliedClasses = [];                 // ya no hay página: se descarta lo aplicado a su <body>
            const doc = elFrame.contentDocument || (elFrame.contentWindow && elFrame.contentWindow.document);
            if (!doc) return;                        // file:// u origen no accesible → degradación silenciosa
            doc.open(); doc.write(frameHTML()); doc.close();
            frameDoc = doc;
            stageEl = doc.getElementById("cbStage");
            if (stageEl) {
                if (curBg) stageEl.classList.add(curBg);
                stageEl.addEventListener("click", onStageClick);
            }
            // El text-size vive en `documentElement.style.fontSize` del iframe → se pierde al
            // reescribir el documento. Lo re-aplicamos aquí para que sobreviva al cambio de marca.
            // (La visión NO necesita re-aplicarse: vive en `elFrame.style.filter` del padre.)
            applyTextSize();
            // Re-hidrata las muestras del dropdown de Fondo: los colores dependen de la marca
            // recién montada en el iframe.
            refreshBgSwatches();
            // El inspector vive dentro del iframe (overlay + listeners) → al reescribir el doc
            // los listeners se pierden con la documento anterior. Reinyectar si estaba activo.
            if (inspectOn) activateInspect();
            if (curStory) renderCanvas();
        }

        /* Logger de acciones — el doc del iframe se reconstruye al cambiar de marca, así que
           se re-engancha en cada mountFrame(). */
        function onStageClick(e) {
            const t = e.target.closest("button, a");
            if (!t) return;
            // Evita la navegación de enlaces demo en el canvas, PERO no cuando el enlace
            // vive dentro de un <summary>: ahí el click debe disparar el toggle nativo del
            // <details> (p.ej. el "Leer más" de .ft-readMore). preventDefault lo cancelaría.
            if (t.tagName === "A" && !t.closest("summary")) e.preventDefault();
            actions.push({ t: new Date().toLocaleTimeString(), tag: t.tagName.toLowerCase(), cls: t.getAttribute("class") || "" });
            document.getElementById("cbActCount").textContent = actions.length;
            if (panel === "actions") renderActions();
        }

        /* ─── Panel ─── */
        document.querySelectorAll(".cb-ptab").forEach(t => {
            t.addEventListener("click", () => {
                panel = t.dataset.panel;
                document.querySelectorAll(".cb-ptab").forEach(x => x.classList.toggle("is-active", x.dataset.panel === panel));
                renderPanel();
            });
        });
        // Sincroniza el resaltado de los tabs con el panel activo (lo usan select y los clicks).
        function syncTabs() {
            document.querySelectorAll(".cb-ptab").forEach(x => x.classList.toggle("is-active", x.dataset.panel === panel));
        }
        function renderPanel() {
            // Tab "Code AMP" (genérico): visible solo si la story expone codeAlt = {label, code, note?}.
            // Si la story activa no lo trae y estábamos en ese panel, caemos a Controls.
            const tabAlt = document.getElementById("cbTabCodeAlt");
            const hasAlt = !!(curStory && curStory.codeAlt);
            if (tabAlt) {
                tabAlt.hidden = !hasAlt;
                if (hasAlt) tabAlt.textContent = (curStory.codeAlt.label || "Code+");
            }
            if (!hasAlt && panel === "codealt") panel = "controls";
            syncTabs();
            // Las páginas completas (kind:"page") no tienen markup en el stage del chrome:
            // los paneles (Controls/Actions/Code…) leen stageEl, que aquí es null. Mostramos
            // una nota y salimos — el preview es la página viva en el iframe.
            if (curStory && curStory.kind === "page") {
                const hasCtrl = !!(curStory.argTypes && curStory.argTypes.length);
                // Página CON controles (toggles de clase sobre el doc vivo): la pestaña
                // Controls renderiza sus argTypes; el resto de pestañas no aplican a una página.
                if (hasCtrl && panel === "controls") { elPanelBody.classList.remove("is-code"); return renderControls(); }
                elPanelBody.classList.remove("is-code");
                const common = hasCtrl
                    ? 'Esta entrada es una <strong>página completa</strong> hecha a mano. Se carga entera en el canvas con su propio CSS y sus scripts. La pestaña <strong>Controls</strong> conmuta modificadores CSS (clases en su <code>&lt;body&gt;</code>) sobre la página viva. '
                    : 'Esta entrada es una <strong>página completa</strong> hecha a mano (template/layout/widget). Se carga entera en el canvas con su propio CSS y sus scripts, por eso <strong>no tiene controles</strong>. ';
                const extra = curStory.brandable
                    ? 'Es <strong>multimarca</strong>: <strong>Brand</strong> y <strong>Cabecera</strong> conmutan su marca/medio en vivo, y <strong>Oscuro</strong> aplica. Además: <strong>Viewport</strong>, <strong>Visión</strong> y <strong>Fullscreen</strong>. (Fondo no aplica a una página completa.)'
                    : 'Útiles aquí: <strong>Oscuro</strong>, <strong>Viewport</strong>, <strong>Visión</strong> y <strong>Fullscreen</strong>. La marca la fija la propia página (Brand/Cabecera/Fondo no aplican).';
                elPanelBody.innerHTML = '<p class="cb-note">' + common + extra + '</p>';
                return;
            }
            elPanelBody.classList.toggle("is-code", panel === "code" || panel === "codealt");
            if (panel === "controls") return renderControls();
            if (panel === "actions") return renderActions();
            if (panel === "a11y") return renderA11y();
            if (panel === "contrast") return renderContrast();
            if (panel === "code") return renderCode();
            if (panel === "codealt") return renderCodeAlt();
        }

        /* Propaga los vínculos declarados con `implies` en los argTypes booleanos tras
           cambiar el control `key`. "A: { implies:['B'] }" significa A⇒B:
             · si A pasa a true  → fuerza B=true (activar la variante activa su base).
             · si B pasa a false → desmarca toda A que dependa de B (contrapositivo:
               no puede quedar la variante activa sin su base).
           Genérico y opt-in: argTypes sin `implies` se comportan igual que antes.
           Devuelve true si tocó algún arg (para re-render del panel). */
        function propagateImplies(at, a, key) {
            if (!at) return false;
            let changed = false;
            const t = at.find(x => x.key === key);
            if (a[key]) {
                if (t && Array.isArray(t.implies)) t.implies.forEach(dep => {
                    if (a[dep] !== true) { a[dep] = true; changed = true; }
                });
            } else {
                at.forEach(x => {
                    if (Array.isArray(x.implies) && x.implies.indexOf(key) >= 0 && a[x.key]) {
                        a[x.key] = false; changed = true;
                    }
                });
            }
            return changed;
        }

        function renderControls() {
            const at = activeArgTypes(), a = activeArgs();
            // Las páginas (kind:"page") con argTypes también renderizan controles aquí, pero
            // su "render" no reescribe el stage (no existe): muta el <body> vivo vía applyPageArgs.
            const isPageCtrl = curStory.kind === "page";
            if ((curStory.kind !== "interactive" && !isPageCtrl) || !at || !a) {
                elPanelBody.innerHTML = '<p class="cb-note">Esta story no tiene <code>controls</code>: es un <strong>catálogo</strong> de variantes fijas (galerías o markup de un <code>.html</code>). Las stories <strong>interactivas</strong> (p.ej. <em>Base</em>, <em>Nav</em>…) exponen aquí sus <code>args</code> para manipularlas en vivo.</p>';
                return;
            }
            // En páginas el efecto se aplica al doc vivo; en componentes se re-renderiza el stage.
            const apply = isPageCtrl ? applyPageArgs : renderCanvas;
            const d = activeDefaults();
            const typeBadge = t => {
                if (t.control === "boolean") return "boolean";
                if (t.control === "number") return "number";
                return "string";   // text / select / radio: el valor llega como string al render
            };
            const fmtDefault = (t, dv) => {
                if (dv === undefined || dv === "") return '<span class="cb-muted">—</span>';
                if (t.control === "boolean") return "<code>" + String(!!dv) + "</code>";
                // number sin comillas — el valor es un literal numérico, no una cadena
                if (t.control === "number") return "<code>" + esc(String(dv)) + "</code>";
                if (t.options) { const o = t.options.find(x => x[0] === dv); return "<code>" + esc(o ? o[1] : String(dv)) + "</code>"; }
                return '<code>"' + esc(String(dv)) + '"</code>';
            };
            const rows = at.map(t => {
                let control = "";
                if (t.control === "text") control = `<input type="text" data-arg="${t.key}" value="${esc(String(a[t.key]))}" autocomplete="off">`;
                else if (t.control === "number") {
                    // min/max/step opcionales del argType. min/max actúan como soft-hint (los
                    // spinners no se pasan, pero el usuario puede escribir cualquier valor);
                    // el render del componente debe hacer su propio clamp por seguridad.
                    const minAttr = t.min != null ? ' min="' + t.min + '"' : "";
                    const maxAttr = t.max != null ? ' max="' + t.max + '"' : "";
                    const stepAttr = ' step="' + (t.step != null ? t.step : 1) + '"';
                    control = `<input type="number" data-arg="${t.key}" value="${esc(String(a[t.key]))}"${minAttr}${maxAttr}${stepAttr} autocomplete="off" inputmode="numeric">`;
                }
                else if (t.control === "select") control = `<select data-arg="${t.key}" autocomplete="off">${t.options.map(([v, l]) => `<option value="${v}"${a[t.key] === v ? " selected" : ""}>${l}</option>`).join("")}</select>`;
                else if (t.control === "radio") control = `<span class="cb-radioset" data-arg="${t.key}">${t.options.map(([v, l]) => `<button type="button" data-val="${v}" class="${a[t.key] === v ? "is-on" : ""}">${l}</button>`).join("")}</span>`;
                else if (t.control === "boolean") control = `<label class="cb-toggle"><input type="checkbox" data-arg="${t.key}"${a[t.key] ? " checked" : ""}><span class="cb-toggle__track"></span></label>`;
                return `<tr><td class="cb-args__name"><code>${t.key}</code></td>` +
                    `<td class="cb-args__desc"><div>${t.desc}</div><span class="cb-type">${typeBadge(t)}</span></td>` +
                    `<td class="cb-args__default">${fmtDefault(t, d[t.key])}</td>` +
                    `<td>${control}</td></tr>`;
            }).join("");
            elPanelBody.innerHTML = `<table class="cb-args"><thead><tr><th>Name</th><th>Description</th><th>Default</th>` +
                `<th>Control <button type="button" class="cb-reset" title="Restablecer a por defecto" aria-label="Reset">↺</button></th></tr></thead><tbody>${rows}</tbody></table>`;

            const resetBtn = elPanelBody.querySelector(".cb-reset");
            if (resetBtn) resetBtn.addEventListener("click", () => { Object.assign(a, activeDefaults()); renderControls(); apply(); });

            // input text + number + select comparten el mismo patrón "input/change → set .value".
            // Excluye checkbox (boolean) que tiene su propio handler abajo.
            elPanelBody.querySelectorAll("input[data-arg]:not([type=checkbox]), select[data-arg]").forEach(inp => {
                const fn = () => { a[inp.dataset.arg] = inp.value; apply(); };
                inp.addEventListener("input", fn); inp.addEventListener("change", fn);
            });
            elPanelBody.querySelectorAll("input[type=checkbox][data-arg]").forEach(chk => {
                chk.addEventListener("change", () => {
                    a[chk.dataset.arg] = chk.checked;
                    // Vínculos entre controles (campo opcional `implies` en el argType):
                    // "A implies [B]" = A⇒B. Al MARCAR A forzamos B=true; al DESMARCAR B
                    // (la base) desmarcamos todo lo que la implica (contrapositivo ¬B⇒¬A).
                    // Así el panel refleja el vínculo (p.ej. alertPulse ⇔ alert). Si algún
                    // toggle cambia, re-render del panel para pintar su nuevo estado.
                    if (propagateImplies(at, a, chk.dataset.arg)) renderControls();
                    apply();
                });
            });
            elPanelBody.querySelectorAll(".cb-radioset").forEach(rs => {
                rs.querySelectorAll("button").forEach(btn => btn.addEventListener("click", () => {
                    a[rs.dataset.arg] = btn.dataset.val;
                    rs.querySelectorAll("button").forEach(x => x.classList.toggle("is-on", x === btn));
                    apply();
                }));
            });
        }

        function renderActions() {
            if (!actions.length) { elPanelBody.innerHTML = '<div class="cb-log"><p class="cb-log__empty">Sin eventos. Haz click en cualquier botón del canvas.</p></div>'; return; }
            elPanelBody.innerHTML = '<div class="cb-log">' + actions.slice().reverse().map(a =>
                `<div class="cb-log__row"><b>onClick</b> &nbsp;<span>${esc(a.t)}</span> &nbsp;{ tag: "${a.tag}", class: "${esc(a.cls)}" }</div>`).join("") + '</div>';
        }
        // (El logger de click se engancha al stage del iframe en mountFrame → onStageClick.)

        function renderA11y() {
            const nodes = stageEl ? Array.from(stageEl.querySelectorAll("button, a")) : [];
            const checks = [];
            const noName = nodes.filter(n => !(n.textContent.trim() || n.getAttribute("aria-label") || n.getAttribute("title")));
            checks.push({ ok: noName.length === 0, label: "Buttons must have discernible text", detail: noName.length ? `${noName.length} sin texto/aria-label/title` : `${nodes.length} con nombre accesible` });
            const native = nodes.every(n => n.tagName === "BUTTON" || n.tagName === "A");
            checks.push({ ok: native, label: "Uso de elemento interactivo nativo (button/a)", detail: native ? "todos nativos" : "hay elementos no nativos" });
            const btns = nodes.filter(n => n.tagName === "BUTTON");
            const typed = btns.every(b => b.getAttribute("type"));
            checks.push({ ok: typed, label: "Atributo type en <button>", detail: typed ? `${btns.length} con type` : "falta type en algún button" });
            const dis = nodes.filter(n => n.disabled || n.classList.contains("ft-btn-is--disabled"));
            checks.push({ ok: true, info: true, label: "Estado disabled comunicado", detail: dis.length ? `${dis.length} deshabilitado(s) vía [disabled]/clase DS` : "sin botones deshabilitados" });

            const pass = checks.filter(c => c.ok && !c.info).length;
            const info = checks.filter(c => c.info).length;
            const viol = checks.filter(c => !c.ok).length;
            elPanelBody.innerHTML =
                `<div class="cb-a11y__summary">
                    <span class="cb-a11y__count"><span class="cb-dot cb-dot--err"></span> ${viol} Violations</span>
                    <span class="cb-a11y__count"><span class="cb-dot cb-dot--ok"></span> ${pass} Passes</span>
                    <span class="cb-a11y__count"><span class="cb-dot cb-dot--warn"></span> ${info} Incomplete</span>
                </div>` +
                checks.map(c => `<div class="cb-a11y__row"><span class="cb-dot cb-dot--${c.ok ? (c.info ? "warn" : "ok") : "err"}" style="margin-top:5px"></span><div><div>${c.label}</div><em>${c.detail}</em></div></div>`).join("");
        }

        /* ─── Contraste (WCAG 1.4.3 / 1.4.6) ───
           Auditoría sobre el DOM del iframe: por cada elemento que CONTENGA texto directo,
           lee color y background-color (resolviendo herencia hacia arriba si es transparente),
           calcula luminancia relativa según WCAG, agrupa por par (fg×bg×tamaño) y lista
           cuáles pasan AA/AAA.
           - "Texto grande" = font-size ≥ 24px (18pt) O font-size ≥ 18.66px (14pt) + bold (≥700).
           - Thresholds: AA small 4.5, AA large 3.0 · AAA small 7.0, AAA large 4.5.
           - Estado del panel (level/size) persiste entre re-renders en cContrast (closure). */
        const cContrast = { level: "AAA", sizeFilter: "all" };
        function parseRgb(s) {
            const m = (s || "").match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/);
            if (!m) return null;
            return { r: +m[1], g: +m[2], b: +m[3], a: m[4] != null ? +m[4] : 1 };
        }
        function rgbHex(c) {
            const h = n => Math.round(n).toString(16).padStart(2, "0");
            return "#" + h(c.r) + h(c.g) + h(c.b);
        }
        function relLum(c) {
            const lin = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
            return 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
        }
        function contrastRatio(fg, bg) {
            const l1 = relLum(fg), l2 = relLum(bg);
            return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        }
        function resolveBg(node, win) {
            let n = node;
            while (n && n.nodeType === 1) {
                const cs = win.getComputedStyle(n);
                const c = parseRgb(cs.backgroundColor);
                if (c && c.a > 0) return c;
                n = n.parentElement;
            }
            return { r: 255, g: 255, b: 255, a: 1 };   // fallback explícito (white)
        }
        function auditContrast() {
            if (!stageEl || !frameDoc || !frameDoc.defaultView) return [];
            if (curStory && typeof curStory.contrastAudit === "function") {
                return curStory.contrastAudit({
                    stageEl: stageEl,
                    frameDoc: frameDoc,
                    args: activeArgs(),
                    story: curStory,
                    component: curComp,
                    helpers: {
                        parseRgb: parseRgb,
                        rgbHex: rgbHex,
                        contrastRatio: contrastRatio
                    }
                }) || [];
            }
            const win = frameDoc.defaultView;
            const findings = [];
            stageEl.querySelectorAll("*").forEach(n => {
                let hasDirectText = false;
                for (let i = 0; i < n.childNodes.length; i++) {
                    const c = n.childNodes[i];
                    if (c.nodeType === 3 && c.textContent.trim()) { hasDirectText = true; break; }
                }
                if (!hasDirectText) return;
                const cs = win.getComputedStyle(n);
                const fg = parseRgb(cs.color);
                if (!fg) return;
                const bg = resolveBg(n, win);
                const fsize = parseFloat(cs.fontSize) || 16;
                const fweight = parseFloat(cs.fontWeight) || 400;
                const isLarge = fsize >= 24 || (fsize >= 18.66 && fweight >= 700);
                findings.push({ tag: n.tagName.toLowerCase(), fg, bg, isLarge, ratio: contrastRatio(fg, bg) });
            });
            // Agrupa por (fg, bg, size). El ratio es el mismo para todas las entradas del grupo.
            const groups = {};
            findings.forEach(f => {
                const k = rgbHex(f.fg) + ":" + rgbHex(f.bg) + ":" + (f.isLarge ? "L" : "s");
                if (!groups[k]) groups[k] = { fg: f.fg, bg: f.bg, isLarge: f.isLarge, ratio: f.ratio, tags: {} };
                groups[k].tags[f.tag] = (groups[k].tags[f.tag] || 0) + 1;
            });
            return Object.values(groups);
        }
        function contrastThreshold(level, isLarge) {
            if (level === "AA")  return isLarge ? 3.0 : 4.5;
            return isLarge ? 4.5 : 7.0;   // AAA
        }
        /* auditContrast() recorre TODO el stage con un getComputedStyle por nodo (y otro por
           ancestro en resolveBg), cross-document contra el iframe → es el punto más caro del
           motor. Dos medidas para sacarlo del camino crítico:

           1. `groups` opcional: cuando el panel Contraste acaba de auditar, el badge reutiliza
              ese resultado en vez de recorrer el stage por segunda vez en el mismo render.
           2. scheduleContrastBadge(): con el panel cerrado (el caso normal) el badge no es
              urgente, así que su auditoría se difiere a idle y se COALESCE. Arrastrar un control
              deja de disparar una auditoría completa por cada paso intermedio: solo audita al
              soltar. El badge sigue siendo la señal de "hay algo que mirar aquí" mientras se
              navega por otras tabs (que es para lo que está). */
        let badgeIdleId = 0, badgeIdleIsRIC = false;
        function cancelBadgeIdle() {
            if (!badgeIdleId) return;
            if (badgeIdleIsRIC) window.cancelIdleCallback(badgeIdleId);
            else window.clearTimeout(badgeIdleId);
            badgeIdleId = 0;
        }
        function scheduleContrastBadge(groups) {
            cancelBadgeIdle();
            if (groups) { updateContrastBadge(groups); return; }   // ya auditado en este render
            const run = () => { badgeIdleId = 0; updateContrastBadge(); };
            badgeIdleIsRIC = "requestIdleCallback" in window;
            badgeIdleId = badgeIdleIsRIC
                ? window.requestIdleCallback(run, { timeout: 600 })
                : window.setTimeout(run, 120);
        }
        function updateContrastBadge(groups) {
            const badge = document.getElementById("cbContrastFails");
            if (!badge) return;
            const g = groups || auditContrast();
            const fails = g.filter(x => x.ratio < contrastThreshold(cContrast.level, x.isLarge)).length;
            if (fails > 0) { badge.hidden = false; badge.textContent = String(fails); }
            else { badge.hidden = true; }
        }
        // Devuelve los grupos auditados para que el badge no repita la auditoría.
        function renderContrast() {
            const groups = auditContrast();
            const threshold = isLarge => contrastThreshold(cContrast.level, isLarge);
            const visible = groups.filter(g => {
                if (cContrast.sizeFilter === "small") return !g.isLarge;
                if (cContrast.sizeFilter === "large") return g.isLarge;
                return true;
            }).sort((a, b) => a.ratio - b.ratio);

            const total = groups.length;
            const fails = groups.filter(g => g.ratio < threshold(g.isLarge)).length;
            const passes = total - fails;
            const storyTop = (curStory && curStory.contrastTopHtml)
                ? (typeof curStory.contrastTopHtml === "function" ? curStory.contrastTopHtml(activeArgs()) : curStory.contrastTopHtml)
                : "";
            const emptyHtml = (curStory && curStory.contrastEmptyHtml)
                ? (typeof curStory.contrastEmptyHtml === "function" ? curStory.contrastEmptyHtml(activeArgs()) : curStory.contrastEmptyHtml)
                : '<p class="cb-note">Sin elementos de texto en el canvas — selecciona una story con contenido textual.</p>';
            const hintHtml = (curStory && curStory.contrastHintHtml)
                ? (typeof curStory.contrastHintHtml === "function" ? curStory.contrastHintHtml(activeArgs()) : curStory.contrastHintHtml)
                : '<p class="cb-cn__hint">Texto grande = ≥18pt o ≥14pt bold. Thresholds WCAG: AA small 4.5, large 3.0 · AAA small 7.0, large 4.5.</p>';

            const fmtTags = t => Object.keys(t).sort()
                .map(k => `<code>${esc(k)}${t[k] > 1 ? " ×" + t[k] : ""}</code>`).join(" ");

            const row = g => {
                const ok = g.ratio >= threshold(g.isLarge);
                const r = g.ratio < 100 ? g.ratio.toFixed(2) : "21";
                return `<tr class="${ok ? "is-ok" : "is-fail"}">
                    <td class="cb-cn__r">${ok ? "✓" : "✗"} <strong>${r}</strong></td>
                    <td>${g.isLarge ? "large" : "small"}</td>
                    <td class="cb-cn__sw">
                        <span class="cb-cn__chip" style="background:${rgbHex(g.bg)};color:${rgbHex(g.fg)}" title="fg ${rgbHex(g.fg)} · bg ${rgbHex(g.bg)}">Aa</span>
                    </td>
                    <td class="cb-cn__els">${fmtTags(g.tags)}</td>
                </tr>`;
            };

            elPanelBody.innerHTML =
                `<div class="cb-cn">
                    ${storyTop || ""}
                    <div class="cb-cn__bar">
                        <label class="cb-cn__field">Level
                            <select id="cbCnLevel">
                                <option value="AA"${cContrast.level === "AA" ? " selected" : ""}>AA</option>
                                <option value="AAA"${cContrast.level === "AAA" ? " selected" : ""}>AAA</option>
                            </select>
                        </label>
                        <label class="cb-cn__field">Tamaño
                            <select id="cbCnSize">
                                <option value="all"${cContrast.sizeFilter === "all" ? " selected" : ""}>todos</option>
                                <option value="small"${cContrast.sizeFilter === "small" ? " selected" : ""}>small</option>
                                <option value="large"${cContrast.sizeFilter === "large" ? " selected" : ""}>large</option>
                            </select>
                        </label>
                        <span class="cb-cn__summary">
                            <span class="cb-a11y__count"><span class="cb-dot cb-dot--err"></span> ${fails} Fail</span>
                            <span class="cb-a11y__count"><span class="cb-dot cb-dot--ok"></span> ${passes} Pass</span>
                        </span>
                        <button type="button" id="cbCnRefresh" class="cb-cn__refresh" title="Re-auditar">↻ Re-auditar</button>
                    </div>
                    ${visible.length ? `
                        <table class="cb-cn__table">
                            <thead><tr><th>Contraste</th><th>Size</th><th>Color</th><th>Elementos</th></tr></thead>
                            <tbody>${visible.map(row).join("")}</tbody>
                        </table>
                    ` : emptyHtml}
                    ${hintHtml}
                </div>`;

            const lvl = document.getElementById("cbCnLevel");
            const sz = document.getElementById("cbCnSize");
            const rf = document.getElementById("cbCnRefresh");
            // Cada handler re-audita una sola vez y le pasa el resultado al badge (antes: dos
            // recorridos completos del stage por interacción).
            if (lvl) lvl.addEventListener("change", e => { cContrast.level = e.target.value; updateContrastBadge(renderContrast()); });
            if (sz)  sz.addEventListener("change", e => { cContrast.sizeFilter = e.target.value; renderContrast(); });
            if (rf)  rf.addEventListener("click", () => { updateContrastBadge(renderContrast()); });

            return groups;
        }

        /* ─── Code (snippet derivado de la story activa) ───
           Si el componente tiene _sharedStyle (CSS experimental en <x>.html), mostramos un
           banner para recordar que esos estilos deben promocionarse al SCSS antes de
           publicar. El snippet en sí ya los excluye (renderCanvas marca el <style> con
           data-cb-shared y el filter en .filter lo retira). */
        /* ─── Resaltador de sintaxis HTML (zero-build) ───
           Tokeniza el markup (comentarios · tags · atributos · strings · texto) en spans .cb-tok-*.
           Scanner secuencial (no regex anidado) → robusto ante SVG inline y atributos con comillas;
           escapa cada token, así nunca rompe el HTML del panel. Si algo no casa, degrada a texto. */
        function hlAttrs(attrs) {
            let out = "", m;
            const re = /([\w:.-]+)(\s*=\s*)("[^"]*"|'[^']*')|(\s+)|(\S+)/g;
            while ((m = re.exec(attrs))) {
                if (m[1]) out += '<span class="cb-tok-attr">' + esc(m[1]) + '</span><span class="cb-tok-punct">' + esc(m[2]) + '</span><span class="cb-tok-string">' + esc(m[3]) + '</span>';
                else if (m[4]) out += m[4];
                else out += '<span class="cb-tok-attr">' + esc(m[5]) + '</span>';
            }
            return out;
        }
        function hlTag(tag) {
            const m = tag.match(/^<(\/?)([a-zA-Z][\w-]*)([\s\S]*?)(\/?)>$/);
            if (!m) return esc(tag);
            return '<span class="cb-tok-punct">&lt;' + m[1] + '</span><span class="cb-tok-tag">' + esc(m[2]) + '</span>'
                + hlAttrs(m[3]) + '<span class="cb-tok-punct">' + m[4] + '&gt;</span>';
        }
        function highlightCode(raw) {
            raw = String(raw || "");
            let out = "", i = 0; const n = raw.length;
            while (i < n) {
                if (raw.startsWith("<!--", i)) {
                    let end = raw.indexOf("-->", i); end = end < 0 ? n : end + 3;
                    out += '<span class="cb-tok-comment">' + esc(raw.slice(i, end)) + '</span>'; i = end; continue;
                }
                if (raw[i] === "<" && /[a-zA-Z/]/.test(raw[i + 1] || "")) {
                    let end = raw.indexOf(">", i); end = end < 0 ? n : end + 1;
                    out += hlTag(raw.slice(i, end)); i = end; continue;
                }
                let next = raw.indexOf("<", i); if (next < 0) next = n;
                out += esc(raw.slice(i, next)); i = next;
            }
            return out;
        }
        /* Markup del panel de código: nota opcional + barra (lenguaje + copiar) + <pre> resaltado. */
        function codePanelHTML(rawCode, copyId, topHtml, canCopy) {
            return '<div class="cb-code">' + (topHtml || "")
                + '<div class="cb-code__bar"><span class="cb-code__lang">HTML</span>'
                + '<button type="button" class="cb-code__copy" id="' + copyId + '"' + (canCopy === false ? " disabled" : "") + '>Copiar</button></div>'
                + '<pre><code>' + highlightCode(rawCode) + '</code></pre></div>';
        }
        /* Cablea el botón copiar: escribe el código CRUDO (no el resaltado). */
        function wireCopy(copyId, rawCode) {
            const btn = document.getElementById(copyId);
            if (!btn) return;
            btn.addEventListener("click", () => {
                if (!navigator.clipboard) return;
                navigator.clipboard.writeText(rawCode).then(() => {
                    btn.classList.add("is-done"); btn.textContent = "¡Copiado!";
                    setTimeout(() => { btn.classList.remove("is-done"); btn.textContent = "Copiar"; }, 1600);
                });
            });
        }

        function renderCode() {
            const warn = (curComp && curComp._sharedStyle)
                ? `<div class="cb-code__warn" role="note">⚠ Este componente tiene estilos experimentales en <code>${esc(curComp.id)}.html</code>. Promociona al SCSS canónico (<code>scss/fourties/&lt;nivel&gt;/${esc(curComp.id)}/_${esc(curComp.id)}.scss</code>) y borra el <code>&lt;style&gt;</code> antes de publicar.</div>`
                : "";
            const rawCode = (curStory && curStory.code)
                ? (typeof curStory.code === "function" ? curStory.code(activeArgs()) : curStory.code)
                : snippet;
            const storyTop = (curStory && curStory.codeTopHtml)
                ? (typeof curStory.codeTopHtml === "function" ? curStory.codeTopHtml(activeArgs()) : curStory.codeTopHtml)
                : "";
            const topHtml = warn + (storyTop || "");
            const canCopy = !!String(rawCode || "").trim();
            elPanelBody.innerHTML = codePanelHTML(rawCode, "cbCopy", topHtml, canCopy);
            if (canCopy) wireCopy("cbCopy", rawCode);
        }

        /* ─── Code alternativo (story.codeAlt = {label, code, note?}) ───
           A diferencia de Code (snippet derivado del stage = el wrapper del render), aquí se
           muestra/copia el CÓDIGO EXACTO que la story declara — p.ej. el subgrupo AMP expone
           solo el markup del elemento, no el harness. note? = HTML opcional (validación). */
        function renderCodeAlt() {
            const ca = (curStory && curStory.codeAlt) || { code: "", note: "" };
            const code = ca.code || "";
            elPanelBody.innerHTML = codePanelHTML(code, "cbCopyAlt", ca.note || "");
            wireCopy("cbCopyAlt", code);
        }
        const OVERVIEW_USAGE_OVERRIDES = {
            btn: "Sirve como boton del sistema para lanzar acciones, llamadas a la accion o controles con icono dentro de cualquier interfaz del DS.",
            rrss: "Sirve para mostrar iconos de redes y acciones de compartir con el lenguaje visual estandar del sistema.",
            toc: "Sirve para orientar al usuario dentro de contenidos largos o especiales, mostrando de un vistazo los puntos que componen la lectura.",
            "az-list": "Sirve para recorrer listados largos alfabeticos sin obligar al usuario a hacer scroll lineal hasta encontrar una entrada concreta."
        };

        function usageCopyFor(comp, leadText) {
            const id = comp && comp.id;
            if (id && OVERVIEW_USAGE_OVERRIDES[id]) return OVERVIEW_USAGE_OVERRIDES[id];

            const text = String(leadText || "").replace(/\s+/g, " ").trim();
            if (!text) return "Sirve para resolver un patron ya existente del sistema sin tener que inventar una pieza nueva para el mismo problema.";

            let fragment = text;
            if (fragment.indexOf(":") >= 0) fragment = fragment.split(":").slice(1).join(":").trim();
            if (!fragment || /^(Atomo|Átomo|Molecula|Molécula|Organismo|Helper|Familia|Pareja|Conjunto)\b/i.test(fragment)) {
                const dashSplit = text.split(/—|-/);
                if (dashSplit.length > 1) fragment = dashSplit.slice(1).join(" ").trim();
            }
            fragment = fragment.split(".")[0].trim();
            fragment = fragment.replace(/^(la|el|los|las|un|una)\s+/i, "");
            if (!fragment) return "Sirve para resolver un patron ya existente del sistema sin tener que inventar una pieza nueva para el mismo problema.";
            return "Sirve para " + fragment.charAt(0).toLowerCase() + fragment.slice(1) + ".";
        }

        function normalizeOverviewIntro(root, comp) {
            if (!root || !comp || comp.group === "Docs") return;
            const inner = root.querySelector(".cb-docs__inner");
            if (!inner) return;
            const h1 = inner.querySelector(":scope > h1");
            const lead = inner.querySelector(":scope > .cb-docs__lead");
            if (!h1 || !lead) return;

            let usage = inner.querySelector(":scope > [data-docs-usage]");
            if (!usage) {
                usage = document.createElement("div");
                usage.className = "cb-callout cb-callout--usage";
                usage.setAttribute("data-docs-usage", "true");
                usage.innerHTML = "<strong>Uso recomendado.</strong> " + usageCopyFor(comp, lead.textContent);
                lead.insertAdjacentElement("afterend", usage);
            }

            let anchor = usage;
            Array.from(inner.children).forEach(function (el) {
                if (el === usage || !el.classList || !el.classList.contains("cb-callout")) return;
                if (!el.classList.contains("cb-callout--warn")
                    && !el.classList.contains("cb-callout--deprecated")
                    && !el.classList.contains("cb-callout--removed")) return;
                anchor.insertAdjacentElement("afterend", el);
                anchor = el;
            });
        }



        /* ─── Docs: Overview del componente (nodo "Overview" del sidebar) ─── */
        function renderDocs() {
            const key = curComp.id + ":overview";
            if (elDocs.dataset.key === key) return;
            elDocs.dataset.key = key;
            elDocs.innerHTML = curComp.overview || '<div class="cb-docs__inner"><p>Sin documentacion.</p></div>';
            normalizeOverviewIntro(elDocs, curComp);
        }

        /* ─── Toolbar: fondo (helper real del DS) ───
           Dropdown custom .cb-csel para poder pintar una "muestra" de color por opción.
           Las muestras se hidratan leyendo computedStyle de la helper class DESDE el iframe
           (que es quien tiene cargado el CSS de la marca activa) → la paleta refleja la
           marca cada vez que cambia. El estado/aplicación al stage es idéntico al anterior. */
        const elBg = document.getElementById("cbBg");
        const cbBgTrigger = elBg.querySelector(".cb-csel__trigger");
        const cbBgLbl = elBg.querySelector(".cb-csel__lbl");
        const cbBgTriggerSw = elBg.querySelector(".cb-csel__sw");
        const cbBgMenu = elBg.querySelector(".cb-csel__menu");

        // Construye las opciones del menú. Las muestras (.cb-csel__sw) llevan data-cls con
        // la helper class — sirve a refreshBgSwatches() para encontrar y pintarlas después.
        cbBgMenu.innerHTML =
            '<button type="button" class="cb-csel__opt" role="option" data-value="" aria-selected="true">' +
                '<span class="cb-csel__sw" data-empty="true"></span><span>Por defecto</span></button>' +
            BG_GROUPS.map(g =>
                '<div class="cb-csel__group" role="presentation">' + esc(g.label) + '</div>' +
                g.options.map(([v, l]) =>
                    '<button type="button" class="cb-csel__opt" role="option" data-value="' + v + '" aria-selected="false">' +
                        '<span class="cb-csel__sw" data-cls="' + v + '"></span><span>' + esc(l) + '</span></button>'
                ).join("")
            ).join("");

        // Lee el color real de cada helper desde el iframe (donde está cargado el CSS de
        // la marca activa) y lo aplica como inline style a la muestra del parent. Maneja
        // backgrounds sólidos y degradados (background-image). Se llama tras mountFrame.
        function refreshBgSwatches() {
            if (!frameDoc || !frameDoc.body) return;
            const swatches = cbBgMenu.querySelectorAll(".cb-csel__sw[data-cls]");
            if (!swatches.length) return;
            // Batch: crear todos los test divs, leer, retirar — minimiza reflows.
            const pairs = [];
            swatches.forEach(sw => {
                const t = frameDoc.createElement("div");
                t.className = sw.dataset.cls;
                t.style.cssText = "position:absolute;visibility:hidden;width:1px;height:1px;left:-9999px;top:0";
                frameDoc.body.appendChild(t);
                pairs.push([sw, t]);
            });
            pairs.forEach(([sw, t]) => {
                const cs = frameDoc.defaultView.getComputedStyle(t);
                sw.style.backgroundColor = cs.backgroundColor;
                sw.style.backgroundImage = cs.backgroundImage && cs.backgroundImage !== "none" ? cs.backgroundImage : "";
                frameDoc.body.removeChild(t);
            });
            // Re-sincroniza la muestra del trigger con la opción seleccionada actual
            const sel = cbBgMenu.querySelector('.cb-csel__opt[aria-selected="true"] .cb-csel__sw');
            if (sel) syncTriggerSw(sel);
        }

        function syncTriggerSw(srcSw) {
            cbBgTriggerSw.style.backgroundColor = srcSw.style.backgroundColor || "";
            cbBgTriggerSw.style.backgroundImage = srcSw.style.backgroundImage || "";
            cbBgTriggerSw.dataset.empty = srcSw.dataset.empty || "";
        }

        // Abrir / cerrar el menú. Cierre por click fuera o Esc.
        function setBgMenuOpen(open) {
            cbBgMenu.hidden = !open;
            cbBgTrigger.setAttribute("aria-expanded", String(open));
            if (open) {
                refreshBgSwatches();   // la marca puede haber cambiado entre aperturas
                document.addEventListener("click", onBgDocClick);
            } else {
                document.removeEventListener("click", onBgDocClick);
            }
        }
        function onBgDocClick(e) { if (!elBg.contains(e.target)) setBgMenuOpen(false); }
        cbBgTrigger.addEventListener("click", e => {
            e.stopPropagation();
            setBgMenuOpen(cbBgMenu.hidden);
        });
        document.addEventListener("keydown", e => {
            if (e.key === "Escape" && !cbBgMenu.hidden) { e.preventDefault(); setBgMenuOpen(false); cbBgTrigger.focus(); }
        });

        // Selección de opción → actualiza estado, trigger y stage del iframe.
        cbBgMenu.addEventListener("click", e => {
            const opt = e.target.closest(".cb-csel__opt");
            if (!opt) return;
            curBg = opt.dataset.value;
            cbBgMenu.querySelectorAll(".cb-csel__opt").forEach(o => o.setAttribute("aria-selected", String(o === opt)));
            cbBgLbl.textContent = opt.querySelector("span:not(.cb-csel__sw)").textContent;
            syncTriggerSw(opt.querySelector(".cb-csel__sw"));
            setBgMenuOpen(false);
            cbBgTrigger.focus();
            // Aplicar al stage del iframe — el helper vive en el ancestro del canvas, así
            // que respeta el on-dark del DS (igual que la implementación anterior con select).
            if (!stageEl) return;
            stageEl.classList.remove(...BG_CLASSES);
            if (curBg) stageEl.classList.add(curBg);
        });

        /* ─── Toolbar: Cabecera (CSV de medios) ───
           Dropdown alimentado por brand-data.js. Cascada con Brand: al seleccionar una
           cabecera, se ajusta automáticamente la marca principal a la que pertenece su
           medio (regional, ep, epe…) y se reconstruye el iframe con CSS + clases nuevas. */
        const elCabWrap = document.getElementById("cbCabeceraWrap");
        const elCab = document.getElementById("cbCabecera");
        const cbCabTrigger = elCab.querySelector(".cb-csel__trigger");
        const cbCabLbl = elCab.querySelector(".cb-csel__lbl");
        const cbCabTriggerSw = elCab.querySelector(".cb-csel__sw");
        const cbCabMenu = elCab.querySelector(".cb-csel__menu");
        let cabTotal = 0;   // nº total de cabeceras (constante tras construir el menú; cacheada)

        // Mapea el ds__group del CSV → key de BRAND_MAP. EP·EPE·SPORT·REGIONALES son marca de un
        // solo medio → mapeo directo. REVISTAS es marca-paraguas con VARIAS submarcas (cuore,
        // viajar, woman, stilo): el grupo no basta, hay que resolver CUÁL por el slug del medio
        // (el body_class de la principal: "cuore"/"woman"/… → showroom-brand-<slug>). Grupo
        // desconocido o slug de revista sin entrada en BRAND_MAP (p.ej. "esncial") → showroom (ux).
        const GROUP_BRAND = {
            EP: "showroom-brand-ep",
            EPE: "showroom-brand-epe",
            SPORT: "showroom-brand-sport",
            REGIONALES: "showroom-brand-regionales"
        };
        function groupToBrand(group, mediaSlug) {
            const g = (group || "").toUpperCase();
            if (GROUP_BRAND[g]) return GROUP_BRAND[g];
            if (g === "REVISTAS") {
                const key = "showroom-brand-" + (mediaSlug || "").toLowerCase();
                return BRAND_MAP[key] ? key : "showroom-brand-showroom";
            }
            return "showroom-brand-showroom";
        }

        // Composición final de clases de cabecera. Orden = body de producción:
        //   [clase del medio principal (traza)] → [clase del outlet] → [combinables apilados].
        // La TRAZA (parentClass) es el body_class del medio principal: una hija
        // (vertical/hyperlocal) vive dentro de su medio, así que arrastra también su clase. Al
        // seleccionar la propia principal, parentClass = "" (es la raíz). La marca (ft-brand-*) NO
        // va aquí: la aplica el eje Brand desde BRAND_MAP. Fuente única para frameHTML()
        // (componentes) y applyBrandToPage() (páginas brandable).
        function cabeceraClasses() {
            const out = [];
            if (curCabecera) out.push(curCabecera.parentClass, curCabecera.bodyClass);
            curCombos.forEach(c => out.push(c));
            return out.filter(Boolean);
        }

        // Etiqueta del trigger: outlet (o "— Por defecto —") + chivato de nº de combinables
        // activos. Refleja ambos ejes sin saturar la barra.
        function syncCabeceraTrigger() {
            const n = curCombos.size;
            const suffix = n ? " · +" + n : "";
            cbCabLbl.textContent = (curCabecera ? curCabecera.label : "— Por defecto —") + suffix;
        }

        // Limpia SOLO el eje outlet (swatch + aria-selected de las opciones de outlet y la
        // pinned "— Por defecto —"). Los combinables conservan su estado (eje independiente).
        function resetCabeceraTrigger() {
            cbCabTriggerSw.style.backgroundColor = "";
            cbCabTriggerSw.dataset.empty = "true";
            cbCabMenu.querySelectorAll(".cb-csel__opt:not(.cb-csel__opt--combo)").forEach(o => {
                o.setAttribute("aria-selected", String(o.dataset.value === ""));
            });
            syncCabeceraTrigger();
        }

        // Re-render del canvas tras cambiar cualquiera de los dos ejes. Sobre páginas
        // brandable conmuta en vivo (no remonta el chrome); en componentes remonta el iframe.
        function applyCabecera() {
            if (framePage !== null) {
                if (curStory && curStory.brandable) applyBrandToPage(curBrandKey);
                return;
            }
            mountFrame();
        }

        // Normaliza una string para búsqueda accent/case-insensitive ("Lérida" → "lerida",
        // "L'Hospitalet" → "l'hospitalet"). NFD descompone los acentos en char + combining
        // diacritic, y luego eliminamos los combining diacritics (rango Unicode U+0300-036F).
        function normalizeText(s) {
            return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }

        // Barra de combinables ACTIVOS: un chip eliminable por cada combinable apilado.
        // Hace visible QUÉ se ha sumado (no solo el "+N" del trigger) y permite quitarlo de un
        // toque (la ✕ del chip). Itera las opciones combo (= orden del CSV) para un orden
        // estable y leer el label desde la propia opción (sin duplicar el dataset).
        function renderActiveCombos() {
            const bar = cbCabMenu.querySelector(".cb-csel__active");
            if (!bar) return;
            const chips = [];
            // Chip de la CABECERA activa (principal/vinculada). Va PRIMERO y con el color de su
            // tipología (= acento de su fila): así se puede quitar desde aquí sin buscarla en la
            // lista. parentClass vacío → principal; con valor → vinculada (cuelga de la principal).
            if (curCabecera) {
                const type = curCabecera.parentClass ? "linked" : "principal";
                // Chivato de vinculación: en las vinculadas, su nombre solo ("Cerca") no dice de
                // qué medio cuelgan → añadimos el medio padre como sub-etiqueta dentro del chip.
                const linked = type === "linked" && curCabecera.mediaName;
                const parent = linked
                    ? '<span class="cb-csel__chip-parent">' + esc(curCabecera.mediaName) + '</span>'
                    : "";
                const title = linked
                    ? "Quitar " + curCabecera.label + " (vinculada a " + curCabecera.mediaName + ")"
                    : "Quitar " + curCabecera.label;
                chips.push(
                    '<button type="button" class="cb-csel__chip cb-csel__chip--' + type + '" ' +
                    'data-remove-cabecera="1" title="' + esc(title) + '">' +
                    '<span class="cb-csel__chip-lbl">' + esc(curCabecera.label) + '</span>' + parent +
                    '<span class="cb-csel__chip-x" aria-hidden="true">' + IC_CHIP_X + '</span></button>'
                );
            }
            cbCabMenu.querySelectorAll(".cb-csel__opt--combo").forEach(opt => {
                const v = opt.dataset.combo;
                if (!curCombos.has(v)) return;
                const lblEl = opt.querySelector(".cb-csel__opt-label");
                const label = lblEl ? lblEl.textContent : v;
                chips.push(
                    '<button type="button" class="cb-csel__chip cb-csel__chip--combo" data-remove="' + esc(v) + '" ' +
                    'title="Quitar ' + esc(label) + '">' +
                    '<span class="cb-csel__chip-lbl">' + esc(label) + '</span>' +
                    '<span class="cb-csel__chip-x" aria-hidden="true">' + IC_CHIP_X + '</span></button>'
                );
            });
            if (!chips.length) { bar.hidden = true; bar.innerHTML = ""; return; }
            bar.innerHTML = '<span class="cb-csel__active-lbl">Apilados</span>' + chips.join("");
            bar.hidden = false;
        }

        function buildCabeceraMenu(data) {
            // Search bar sticky en el top del menu — filter en vivo contra los 4 ejes de
            // búsqueda relevantes (label + región + nombre del medio + body_class). El
            // contador del total/filtrado vive en el footer sticky abajo (visible siempre).
            let html =
                '<div class="cb-csel__search">' +
                    ICONS.svg("magnifying-glass", "cb-csel__search-ic") +
                    '<input type="text" class="cb-csel__search-input" placeholder="Buscar cabecera, región o medio…" aria-label="Buscar en cabeceras" autocomplete="off">' +
                '</div>';
            // Barra de combinables ACTIVOS (chips eliminables). La rellena renderActiveCombos();
            // arranca oculta y se muestra solo cuando hay alguno apilado.
            html += '<div class="cb-csel__active" hidden></div>';
            // Medios agrupados por nombre (media_associated), ya ordenados en brand-data.js:
            // bloques por comunidad autónoma + nombre del medio, outlets alfabéticos dentro.
            html +=
                '<button type="button" class="cb-csel__opt cb-csel__opt--pinned" role="option" data-value="" data-media="" aria-selected="true">' +
                    '<span class="cb-csel__sw" data-empty="true"></span><span>— Por defecto —</span></button>';
            // Outlets: bloques de medio ordenados por comunidad autónoma (alfabético) y nombre
            // del medio; outlets alfabéticos dentro (todo resuelto en brand-data.js).
            data.byMedia.forEach(m => {
                html += '<div class="cb-csel__group" role="presentation">' +
                    '<span class="cb-csel__group-name">' + esc(m.mediaName) + '</span>' +
                    '<span class="cb-csel__group-count">' + m.outlets.length + '</span>' +
                    '</div>';
                m.outlets.forEach(o => {
                    // Swatch sin color: el CSV ya no trae code_color_hex → placeholder vacío.
                    const sw = '<span class="cb-csel__sw" data-empty="true"></span>';
                    // Región como pastilla alineada a la derecha. El CSV ya no distingue
                    // hyperlocal de vertical (is_hyperlocal retirado): se muestra siempre que
                    // la fila tenga región (comunidad autónoma del medio).
                    const pill = o.region
                        ? '<span class="cb-csel__opt-region">' + esc(o.region) + '</span>'
                        : "";
                    // La cabecera principal del medio (portada) se marca con una pastilla
                    // "principal" + clase para resaltarla (va siempre la primera del grupo).
                    const principal = o.isPrincipal
                        ? '<span class="cb-csel__opt-tag">principal</span>'
                        : "";
                    const cls = o.isPrincipal ? "cb-csel__opt cb-csel__opt--principal" : "cb-csel__opt";
                    // data-search = los 4 campos normalizados, concatenados → un .includes() basta.
                    const searchText = normalizeText(o.label + " " + o.region + " " + m.mediaName + " " + o.value);
                    html += '<button type="button" class="' + cls + '" role="option" ' +
                        'data-value="' + esc(o.value) + '" data-group="' + esc(m.brandGroup) + '" ' +
                        'data-parent="' + esc(o.parentClass || "") + '" ' +
                        'data-media="' + esc(m.mediaName) + '" ' +   // nombre del medio (para el chivato de vinculación)
                        'data-search="' + esc(searchText) + '" ' +
                        'aria-selected="false">' + sw +
                        '<span class="cb-csel__opt-label">' + esc(o.label) + '</span>' +
                        principal + pill + '</button>';
                });
            });
            // Combinables (eje multi-selección): tipos de página y modificadores que se APILAN
            // sobre el outlet/marca vigente (premium, noticia, portada, has-tapbar…). Anclados
            // en su propio bloque AL FONDO del selector (eje distinto a las cabeceras). Selección
            // múltiple: varios activos a la vez (≠ outlets, single). Orden = CSV (composición body).
            const combos = data.combinables || [];
            if (combos.length) {
                html += '<div class="cb-csel__group" role="presentation">' +
                    '<span class="cb-csel__group-name">Combinables · tipo de página y modificadores</span>' +
                    '<span class="cb-csel__group-count">' + combos.length + '</span>' +
                    '</div>';
                combos.forEach(c => {
                    const sw = c.color
                        ? '<span class="cb-csel__sw" style="background-color:' + esc(c.color) + '"></span>'
                        : '<span class="cb-csel__sw" data-empty="true"></span>';
                    const searchText = normalizeText(c.label + " " + c.value + " combinable modificador");
                    html += '<button type="button" class="cb-csel__opt cb-csel__opt--combo" role="option" ' +
                        'data-combo="' + esc(c.value) + '" ' +
                        'data-search="' + esc(searchText) + '" ' +
                        'aria-selected="' + (curCombos.has(c.value) ? "true" : "false") + '">' + sw +
                        '<span class="cb-csel__opt-label">' + esc(c.label) + '</span></button>';
                });
            }
            // Footer sticky con el total — siempre visible al final del menu, también cuando
            // se scrollea la lista. Actualiza su texto al filtrar (ver filterCabeceraMenu).
            // Footer = leyenda de tipología (estática) + contador (dinámico). Separados en
            // dos nodos para que actualizar el contador al filtrar NO borre la leyenda. La
            // leyenda decodifica el acento de color de cada tipo de anclaje (ver CSS).
            html += '<div class="cb-csel__footer">' +
                    '<div class="cb-csel__legend" aria-hidden="true">' +
                        '<span class="cb-csel__legend-item cb-csel__legend-item--principal">Principal</span>' +
                        '<span class="cb-csel__legend-item cb-csel__legend-item--linked">Vinculada</span>' +
                        '<span class="cb-csel__legend-item cb-csel__legend-item--combo">Combinable</span>' +
                    '</div>' +
                    '<span class="cb-csel__count" aria-live="polite"></span>' +
                '</div>';
            cbCabMenu.innerHTML = html;
            cbCabTrigger.disabled = false;
            resetCabeceraTrigger();
            renderActiveCombos();   // refleja combinables ya activos (si los hubiera)

            // Inicializa el footer con el total absoluto antes de cualquier filtrado.
            // Cacheamos el total (constante) para no recontar el DOM en cada pulsación al filtrar.
            cabTotal = data.byMedia.reduce((sum, m) => sum + m.outlets.length, 0);
            cbCabMenu.querySelector(".cb-csel__count").textContent = cabTotal + " cabeceras";

            // Wire the search input — filter en vivo en cada keystroke.
            const searchInput = cbCabMenu.querySelector(".cb-csel__search-input");
            searchInput.addEventListener("input", e => filterCabeceraMenu(e.target.value));
        }

        // Filtra opciones por la query y oculta grupos cuyos hijos quedan todos ocultos.
        // La opción "— Por defecto —" (.cb-csel__opt--pinned) está exenta para que siempre
        // se pueda limpiar la selección. Cero coste extra por no tener data-search.
        function filterCabeceraMenu(query) {
            const q = normalizeText(query.trim());
            const opts = cbCabMenu.querySelectorAll(".cb-csel__opt[data-search]");
            let visible = 0, comboVisible = 0;
            opts.forEach(opt => {
                const match = !q || opt.dataset.search.indexOf(q) !== -1;
                opt.hidden = !match;
                if (!match) return;
                if (opt.classList.contains("cb-csel__opt--combo")) comboVisible++;
                else visible++;
            });
            // Grupos: ocultos si todos los .cb-csel__opt entre este header y el siguiente
            // están hidden. Recorre los siblings hasta toparse con otro group o el final.
            cbCabMenu.querySelectorAll(".cb-csel__group").forEach(g => {
                let n = g.nextElementSibling;
                let anyVisible = false;
                while (n && !n.classList.contains("cb-csel__group")) {
                    if (n.classList.contains("cb-csel__opt") && !n.hidden) { anyVisible = true; break; }
                    n = n.nextElementSibling;
                }
                g.hidden = !anyVisible;
            });
            // Footer: total absoluto siempre visible; al filtrar muestra "X de N" o
            // "Sin resultados" si la query no coincide con nada. Permanece sticky al fondo.
            const count = cbCabMenu.querySelector(".cb-csel__count");
            if (count) {
                const totalCab = cabTotal;   // cacheado en buildCabeceraMenu (no recontar el DOM)
                if (!q) {
                    count.textContent = totalCab + " cabeceras";
                } else {
                    const parts = [];
                    if (visible) parts.push(visible + " de " + totalCab + " cabeceras");
                    if (comboVisible) parts.push(comboVisible + " combinable" + (comboVisible > 1 ? "s" : ""));
                    count.textContent = parts.length ? parts.join(" · ") : "Sin resultados";
                }
            }
        }

        function clearCabeceraSearch() {
            const input = cbCabMenu.querySelector(".cb-csel__search-input");
            if (input && input.value) {
                input.value = "";
                filterCabeceraMenu("");
            }
        }

        // Hidratar el menú cuando los datos lleguen. Si SB_BRANDS_READY no existe (script
        // no cargó) o resuelve a null (fetch falló), ocultamos el wrap → degradación grácil.
        if (window.SB_BRANDS_READY) {
            window.SB_BRANDS_READY.then(data => {
                const hasData = data && (data.byMedia.length || (data.combinables && data.combinables.length));
                if (!hasData) { elCabWrap.style.display = "none"; return; }
                buildCabeceraMenu(data);
            });
        } else {
            elCabWrap.style.display = "none";
        }

        // Open/close — mismo patrón que el dropdown de Fondo, con dos adiciones específicas
        // de Cabecera: al abrir, foco al input de búsqueda (teclear sin tocar el ratón);
        // al cerrar, se limpia la query → reabrir muestra siempre la lista completa.
        function setCabMenuOpen(open) {
            cbCabMenu.hidden = !open;
            cbCabTrigger.setAttribute("aria-expanded", String(open));
            if (open) {
                document.addEventListener("click", onCabDocClick);
                const input = cbCabMenu.querySelector(".cb-csel__search-input");
                if (input) setTimeout(() => input.focus(), 0);   // setTimeout: tras el repaint del :not([hidden])
            } else {
                document.removeEventListener("click", onCabDocClick);
                clearCabeceraSearch();
            }
        }
        function onCabDocClick(e) { if (!elCab.contains(e.target)) setCabMenuOpen(false); }
        cbCabTrigger.addEventListener("click", e => {
            if (cbCabTrigger.disabled) return;
            e.stopPropagation();
            setCabMenuOpen(cbCabMenu.hidden);
        });
        document.addEventListener("keydown", e => {
            if (e.key === "Escape" && !cbCabMenu.hidden) { e.preventDefault(); setCabMenuOpen(false); cbCabTrigger.focus(); }
        });

        // Selección: aplica clases + auto-sync de Brand + remount del iframe.
        cbCabMenu.addEventListener("click", e => {
            // ── Chip "Apilados" (✕) ──
            const chip = e.target.closest(".cb-csel__chip");
            if (chip) {
                // Chip de la CABECERA → resetea el eje outlet a "— Por defecto —" (mismo efecto
                // que pulsar la pinned; no toca Brand ni combinables, ejes independientes).
                if (chip.dataset.removeCabecera) {
                    curCabecera = null;
                    resetCabeceraTrigger();   // re-sincroniza aria-selected + trigger
                    renderActiveCombos();
                    applyCabecera();
                    return;
                }
                // Chip de combinable → quita ese combinable y desmarca su opción.
                const v = chip.dataset.remove;
                curCombos.delete(v);
                cbCabMenu.querySelectorAll('.cb-csel__opt--combo').forEach(o => {
                    if (o.dataset.combo === v) o.setAttribute("aria-selected", "false");
                });
                syncCabeceraTrigger();
                renderActiveCombos();
                applyCabecera();
                return;
            }

            const opt = e.target.closest(".cb-csel__opt");
            if (!opt) return;

            // ── Eje combinables (multi-selección) ──
            // Tipos de página / modificadores que se APILAN sobre la cabecera/marca vigente.
            // Toggle on/off, NO cierran el menú (para encadenar varios) y NO tocan la marca
            // (son region ALL, agnósticos). Re-render en cada toggle.
            if (opt.classList.contains("cb-csel__opt--combo")) {
                const combo = opt.dataset.combo;
                const on = opt.getAttribute("aria-selected") !== "true";
                opt.setAttribute("aria-selected", String(on));
                if (on) curCombos.add(combo); else curCombos.delete(combo);
                syncCabeceraTrigger();
                renderActiveCombos();
                applyCabecera();
                return;
            }

            // ── Eje outlet (selección única) ──
            // Medio + vertical. Cierra el menú y auto-sincroniza Brand a la marca del medio.
            const bodyCls = opt.dataset.value;
            const brandGroup = opt.dataset.group;
            const parentCls = opt.dataset.parent;   // traza: body_class del medio principal (si es hija)
            cbCabMenu.querySelectorAll(".cb-csel__opt:not(.cb-csel__opt--combo)")
                .forEach(o => o.setAttribute("aria-selected", String(o === opt)));

            if (!bodyCls) {
                // "— Por defecto —" → limpia el outlet (Brand y combinables siguen como estén).
                curCabecera = null;
                resetCabeceraTrigger();
            } else {
                // Solo el nombre del outlet en el trigger (sin pastilla de región — clutter en barra)
                const lbl = opt.querySelector(".cb-csel__opt-label");
                // Slug del medio = body_class de la principal (parentClass en hijas; el propio
                // bodyClass en la principal). Sirve para resolver la submarca de REVISTAS.
                const mediaSlug = parentCls || bodyCls;
                const targetKey = groupToBrand(brandGroup, mediaSlug);
                curCabecera = { bodyClass: bodyCls, parentClass: parentCls || "", brandGroup: brandGroup, brandKey: targetKey, label: lbl ? lbl.textContent : bodyCls, mediaName: opt.dataset.media || "" };
                const srcSw = opt.querySelector(".cb-csel__sw");
                cbCabTriggerSw.style.backgroundColor = srcSw.style.backgroundColor || "";
                cbCabTriggerSw.dataset.empty = srcSw.dataset.empty || "";
                syncCabeceraTrigger();
                // Auto-sync de Brand si el medio pertenece a otra marca
                if (targetKey !== curBrandKey) {
                    curBrandKey = targetKey;
                    curBrand = BRAND_MAP[targetKey];
                    document.getElementById("cbBrand").value = targetKey;
                }
            }
            renderActiveCombos();   // refleja la cabecera recién elegida (o su limpieza) en "Apilados"
            setCabMenuOpen(false);
            cbCabTrigger.focus();
            // Sobre una PÁGINA brandable (templates): aplicar marca + clases de cabecera al doc
            // de la propia página (mismo swap que showroom-init), no remontar el chrome. En no
            // brandable (layouts) el control está grisado y este handler no se dispara.
            applyCabecera();
        });

        /* ─── Globals: modo oscuro — MECANISMO NATIVO DEL DS (igual que el showroom).
           data-theme="dark" en <html> dispara las reglas reales de _dark.scss (vienen
           en *-core.css, importado por *-index.css) sobre los componentes del canvas:
           es el dark mode REAL del DS, no un truco del chrome. Se persiste con la MISMA
           clave de localStorage que el showroom ("darkMode" = enabled|disabled), así el
           estado se comparte. cb-dark tematiza además el chrome .cb-* y oscurece el
           fondo del canvas, para que los componentes en dark se vean sobre fondo oscuro. ─── */
        const cbDark = document.getElementById("cbDark");
        function applyDark(on) {
            darkOn = on;
            document.documentElement.setAttribute("data-theme", on ? "dark" : "light");
            document.body.classList.toggle("cb-dark", on);
            cbDark.checked = on;
            if (frameDoc) {                          // dark REAL del DS también dentro del iframe (doc del chrome)
                frameDoc.documentElement.setAttribute("data-theme", on ? "dark" : "light");
                if (frameDoc.body) frameDoc.body.classList.toggle("cb-dark", on);
            } else if (framePage) {                  // página completa (cualquiera): data-theme en su <html>
                applyDarkToPage();
            }
        }
        // Aplica el estado dark global (darkOn) al <html> de la página cargada en el iframe.
        // Universal: el dark del DS es data-theme en <html>, lo soporta toda página (su CSS ya
        // trae las reglas de _dark.scss). Se usa al alternar Oscuro y al cargar una página.
        function applyDarkToPage() {
            if (!framePage || !elFrame) return;
            try { elFrame.contentDocument.documentElement.setAttribute("data-theme", darkOn ? "dark" : "light"); } catch (_) { }
        }
        cbDark.addEventListener("change", e => {
            applyDark(e.target.checked);
            try { localStorage.setItem("darkMode", e.target.checked ? "enabled" : "disabled"); } catch (_) { }
            // El dark mode cambia colores resueltos del DS → re-auditar contraste.
            refreshContrastAfterChange();
        });
        // Helper: refresca el badge del tab Contraste y, si está activo el panel, lo re-renderiza.
        // Lo usan los toggles que cambian colores resueltos sin disparar mountFrame/renderCanvas
        // (dark mode, forced colors, text size — éste solo afecta la clasificación small/large).
        function refreshContrastAfterChange() {
            scheduleContrastBadge(panel === "contrast" ? renderContrast() : null);
        }
        // Restaurar estado al cargar (solo lee; persiste únicamente al alternar — como el showroom)
        try { applyDark(localStorage.getItem("darkMode") === "enabled"); } catch (_) { applyDark(false); }

        /* ─── Fullscreen: oculta sidebar + toolbar + panel para ver el canvas sin distracciones
           (útil con templates/layouts). Patrón Storybook (`F` toggle, `Esc` salir): siempre hay
           camino de retorno — el botón del toolbar permuta su icono (arrows-out ↔ arrows-in) y
           aparece una "solapa" pill discreta en sup-izq, de modo que el usuario nunca queda
           atrapado sin navegación. */
        const cbFullscreen = document.getElementById("cbFullscreen");
        const cbExitFs = document.getElementById("cbExitFs");
        function applyFullscreen(on) {
            fsOn = on;
            document.body.classList.toggle("cb-fullscreen", on);
            // Propagar al body del iframe — mismo patrón que applyDark: la regla
            // `body.cb-fullscreen .cb-canvas{padding:0;gap:0}` vive en el <style> inyectado
            // por frameHTML() y se activa al añadir la clase. Si cambia la marca después,
            // frameHTML() incluye la clase desde el inicio (mira `if (fsOn) bodyCls.push(…)`).
            if (frameDoc && frameDoc.body) frameDoc.body.classList.toggle("cb-fullscreen", on);
            cbFullscreen.setAttribute("aria-pressed", String(on));
            cbFullscreen.title = on ? "Salir de pantalla completa (F)" : "Pantalla completa (F)";
            cbFullscreen.setAttribute("aria-label", on ? "Salir de pantalla completa" : "Pantalla completa");
            cbFullscreen.innerHTML = ICONS.svg(on ? "arrows-in" : "arrows-out", "cb-icobtn__ic");
            // Foco: al salir, devuelve el foco al botón del toolbar; al entrar, no fuerza foco
            // en la solapa (evita el "halo" de focus-visible inmediato tras click).
            if (!on && document.activeElement === cbExitFs) cbFullscreen.focus();
        }
        cbFullscreen.addEventListener("click", () => applyFullscreen(!fsOn));
        cbExitFs.addEventListener("click", () => applyFullscreen(false));
        // Atajos de teclado: F toggle · Esc salir. Se ignoran si el foco está en un campo editable
        // (búsqueda, inputs de viewport, controls…), para no robar la tecla mientras se escribe.
        document.addEventListener("keydown", e => {
            const t = e.target;
            if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
            if ((e.key === "f" || e.key === "F") && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault();
                applyFullscreen(!fsOn);
            } else if (e.key === "Escape" && fsOn) {
                e.preventDefault();
                applyFullscreen(false);
            }
        });

        /* ─── Sub-toolbar a11y: simulación de visión y zoom de texto ───
           · Visión: cambia `elFrame.style.filter`. Para protan/deuter/tritan/achromat usamos
             SVG feColorMatrix (matrices Wickline/Machado, defs inyectados arriba en CHROME).
             Para grayscale y blurred usamos las shortcuts CSS nativas (más simples).
           · Texto: cambia el font-size raíz del iframe (≈ "Cambiar tamaño de letra del
             navegador"). Escala todos los `rem` del DS proporcionalmente. */
        function applyVision() {
            if (!elFrame) return;
            if (!curVision) { elFrame.style.filter = ""; return; }
            if (curVision === "grayscale") { elFrame.style.filter = "grayscale(1)"; return; }
            if (curVision === "blurred") { elFrame.style.filter = "blur(2px)"; return; }
            elFrame.style.filter = "url(#sb-vis-" + curVision + ")";
        }
        function applyTextSize() {
            if (!frameDoc || !frameDoc.documentElement) return;
            frameDoc.documentElement.style.fontSize = curTextSize ? (parseFloat(curTextSize) * 100) + "%" : "";
        }
        /* ─── Toolbar A11y: dropdown custom .cb-csel--vision ───
           Reemplaza al <select> nativo porque <option> NO admite HTML (no se podían poner
           swatches de color dentro). El widget muestra una miniatura del espectro RGB con
           el filtro SVG aplicado por opción → el usuario ve cómo afecta la simulación
           ANTES de seleccionarla. El estado (curVision) y applyVision() se comparten
           idénticos a la implementación con <select>. */
        const VISION_OPTIONS = [
            { v: "", label: "Normal", group: null },
            { v: "protanomaly",   label: "Protanomalía · rojo débil (1.3%)",  group: "Anomalías (parciales)" },
            { v: "deuteranomaly", label: "Deuteranomalía · verde débil (5%)", group: "Anomalías (parciales)" },
            { v: "tritanomaly",   label: "Tritanomalía · azul débil (0.01%)", group: "Anomalías (parciales)" },
            { v: "achromatomaly", label: "Acromatomalía · color parcial",     group: "Anomalías (parciales)" },
            { v: "protanopia",    label: "Protanopía · sin rojo (1%)",        group: "Dicromacías (totales)" },
            { v: "deuteranopia",  label: "Deuteranopía · sin verde (1.1%)",   group: "Dicromacías (totales)" },
            { v: "tritanopia",    label: "Tritanopía · sin azul (0.001%)",    group: "Dicromacías (totales)" },
            { v: "achromatopsia", label: "Acromatopsia · sin color (0.003%)", group: "Dicromacías (totales)" },
            { v: "grayscale",     label: "Escala de grises",                  group: "Otros" },
            { v: "blurred",       label: "Visión borrosa",                    group: "Otros" }
        ];
        const elVis = document.getElementById("cbVision");
        const cbVisTrigger = elVis.querySelector(".cb-csel__trigger");
        const cbVisLbl = elVis.querySelector(".cb-csel__lbl");
        const cbVisTriggerSw = elVis.querySelector(".cb-csel__sw--vision");
        const cbVisMenu = elVis.querySelector(".cb-csel__menu");

        // Construye opciones agrupadas. La opción "Normal" va antes de cualquier grupo.
        (function buildVisionMenu() {
            const groups = {};
            const flat = [];
            VISION_OPTIONS.forEach(o => {
                if (!o.group) { flat.push(o); return; }
                (groups[o.group] = groups[o.group] || []).push(o);
            });
            const optHTML = o =>
                '<button type="button" class="cb-csel__opt" role="option" data-value="' + o.v +
                    '" aria-selected="' + (o.v === curVision ? "true" : "false") + '">' +
                    '<span class="cb-csel__sw cb-csel__sw--vision" data-vision="' + o.v + '"></span>' +
                    '<span>' + esc(o.label) + '</span></button>';
            cbVisMenu.innerHTML =
                flat.map(optHTML).join("") +
                Object.keys(groups).map(gName =>
                    '<div class="cb-csel__group" role="presentation">' + esc(gName) + '</div>' +
                    groups[gName].map(optHTML).join("")
                ).join("");
        })();

        function setVisionMenuOpen(open) {
            cbVisMenu.hidden = !open;
            cbVisTrigger.setAttribute("aria-expanded", String(open));
            if (open) document.addEventListener("click", onVisDocClick);
            else document.removeEventListener("click", onVisDocClick);
        }
        function onVisDocClick(e) { if (!elVis.contains(e.target)) setVisionMenuOpen(false); }
        cbVisTrigger.addEventListener("click", e => {
            e.stopPropagation();
            setVisionMenuOpen(cbVisMenu.hidden);
        });
        document.addEventListener("keydown", e => {
            if (e.key === "Escape" && !cbVisMenu.hidden) { e.preventDefault(); setVisionMenuOpen(false); cbVisTrigger.focus(); }
        });
        cbVisMenu.addEventListener("click", e => {
            const opt = e.target.closest(".cb-csel__opt");
            if (!opt) return;
            curVision = opt.dataset.value;
            cbVisMenu.querySelectorAll(".cb-csel__opt").forEach(o => o.setAttribute("aria-selected", String(o === opt)));
            cbVisLbl.textContent = opt.querySelector("span:not(.cb-csel__sw)").textContent;
            cbVisTriggerSw.dataset.vision = curVision;   // CSS aplica el filtro correspondiente
            setVisionMenuOpen(false);
            cbVisTrigger.focus();
            applyVision();
        });

        document.getElementById("cbTextSize").addEventListener("change", e => {
            curTextSize = e.target.value;
            applyTextSize();
            // El zoom puede cambiar la clasificación "large text" → re-auditar contraste.
            refreshContrastAfterChange();
        });

        /* Forced colors (WCAG 1.4.11): mutuamente exclusivos (bw / wb / yb / "").
           Toca el body del iframe — la regla `body.cb-a11y-fc-XX` está inyectada en frameHTML. */
        document.getElementById("cbForcedColors").addEventListener("change", e => {
            curForcedColors = e.target.value;
            if (!frameDoc || !frameDoc.body) return;
            frameDoc.body.classList.remove("cb-a11y-fc-bw", "cb-a11y-fc-wb", "cb-a11y-fc-yb");
            if (curForcedColors) frameDoc.body.classList.add("cb-a11y-fc-" + curForcedColors);
            // Forced colors fuerza dúos de color !important → re-auditar contraste.
            refreshContrastAfterChange();
        });

        /* Toggles a11y (reduced-motion, focus visible, text spacing): cada uno toggle de
           una clase en el body del iframe. Mismo patrón que dark mode. */
        function bindA11yToggle(id, klass, setter) {
            document.getElementById(id).addEventListener("change", e => {
                setter(e.target.checked);
                if (frameDoc && frameDoc.body) frameDoc.body.classList.toggle(klass, e.target.checked);
            });
        }
        bindA11yToggle("cbReducedMotion", "cb-a11y-rmotion", v => { reducedMotion = v; });
        bindA11yToggle("cbFocusVisible", "cb-a11y-focus", v => { focusVisible = v; });
        bindA11yToggle("cbTextSpacing", "cb-a11y-spacing", v => { textSpacing = v; });

        /* ─── Inspector de medidas (v1) ───
           Hover sobre cualquier elemento del canvas → outline azul + tooltip flotante con
           selector, W×H, font-size, padding y margin. Vive DENTRO del iframe (no en el parent)
           porque las coordenadas son del viewport del iframe — proyectar al parent añadiría
           complejidad de offset/scroll. Sigue al cursor con rAF throttle para fluidez. */
        let inspectRAF = 0;
        function inspectSelector(el) {
            const tag = el.tagName.toLowerCase();
            const id = el.id ? "#" + el.id : "";
            // SVGAnimatedString.baseVal para SVGs; string directo en HTML
            const cn = typeof el.className === "string" ? el.className : (el.className && el.className.baseVal) || "";
            const cls = cn.split(/\s+/).filter(Boolean)
                .filter(c => !c.startsWith("sb-inspect-"))   // no incluir clases del propio overlay
                .slice(0, 2).map(c => "." + c).join("");
            return tag + id + cls;
        }
        function activateInspect() {
            if (!frameDoc || !frameDoc.body) return;
            let overlay = frameDoc.getElementById("sb-inspect-overlay");
            if (!overlay) {
                overlay = frameDoc.createElement("div");
                overlay.id = "sb-inspect-overlay";
                overlay.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:2147483647";
                const box = frameDoc.createElement("div");
                box.className = "sb-inspect-box";
                // transition cortas → el box "sigue" suavemente sin desorientar
                box.style.cssText = "position:fixed;outline:2px solid #0f62fe;outline-offset:-1px;background:rgba(15,98,254,.08);pointer-events:none;display:none;transition:top 50ms,left 50ms,width 50ms,height 50ms";
                const tip = frameDoc.createElement("div");
                tip.className = "sb-inspect-tip";
                tip.style.cssText = "position:fixed;background:#161616;color:#fff;font:11px/1.5 ui-monospace,Menlo,Consolas,monospace;padding:6px 9px;border-radius:3px;white-space:nowrap;pointer-events:none;display:none;box-shadow:0 4px 12px rgba(0,0,0,.3);max-width:380px";
                overlay.appendChild(box);
                overlay.appendChild(tip);
                frameDoc.body.appendChild(overlay);
            }
            frameDoc.addEventListener("mousemove", onInspectMove);
            frameDoc.body.addEventListener("mouseleave", onInspectLeave);
        }
        function deactivateInspect() {
            if (!frameDoc) return;
            frameDoc.removeEventListener("mousemove", onInspectMove);
            if (frameDoc.body) frameDoc.body.removeEventListener("mouseleave", onInspectLeave);
            if (inspectRAF && frameDoc.defaultView) {
                frameDoc.defaultView.cancelAnimationFrame(inspectRAF);
                inspectRAF = 0;
            }
            const overlay = frameDoc.getElementById("sb-inspect-overlay");
            if (overlay) overlay.remove();
        }
        function onInspectMove(e) {
            if (inspectRAF) return;              // rAF throttle: máximo 1 update por frame
            const win = frameDoc.defaultView;
            inspectRAF = win.requestAnimationFrame(() => {
                inspectRAF = 0;
                const target = e.target;
                if (!target || !target.getBoundingClientRect) return;
                // No inspeccionarse a sí mismo (defensa por si pointer-events falla en algún navegador)
                if (target.id === "sb-inspect-overlay" || (target.closest && target.closest("#sb-inspect-overlay"))) return;
                const overlay = frameDoc.getElementById("sb-inspect-overlay");
                if (!overlay) return;
                const box = overlay.firstElementChild;
                const tip = overlay.lastElementChild;
                const rect = target.getBoundingClientRect();
                box.style.display = "block";
                box.style.top = rect.top + "px";
                box.style.left = rect.left + "px";
                box.style.width = rect.width + "px";
                box.style.height = rect.height + "px";
                // Tooltip
                const cs = win.getComputedStyle(target);
                const w = Math.round(rect.width * 100) / 100;
                const h = Math.round(rect.height * 100) / 100;
                const sel = inspectSelector(target);
                const selShort = sel.length > 60 ? sel.slice(0, 57) + "…" : sel;
                const pt = parseFloat(cs.paddingTop), pr = parseFloat(cs.paddingRight),
                    pb = parseFloat(cs.paddingBottom), pl = parseFloat(cs.paddingLeft);
                const mt = parseFloat(cs.marginTop), mr = parseFloat(cs.marginRight),
                    mb = parseFloat(cs.marginBottom), ml = parseFloat(cs.marginLeft);
                const padAny = pt || pr || pb || pl;
                const mgnAny = mt || mr || mb || ml;
                tip.innerHTML =
                    '<strong style="color:#78a9ff">' + esc(selShort) + '</strong><br>' +
                    w + ' × ' + h + ' · ' + cs.fontSize +
                    (padAny ? '<br>padding ' + pt + ' ' + pr + ' ' + pb + ' ' + pl : '') +
                    (mgnAny ? '<br>margin ' + mt + ' ' + mr + ' ' + mb + ' ' + ml : '');
                tip.style.display = "block";
                // Posicionado smart: debajo del elemento si hay espacio, arriba si no
                const tipRect = tip.getBoundingClientRect();
                const winH = win.innerHeight, winW = win.innerWidth;
                const below = rect.bottom + tipRect.height + 8 < winH;
                const top = below ? rect.bottom + 4 : Math.max(4, rect.top - tipRect.height - 4);
                const left = Math.max(4, Math.min(rect.left, winW - tipRect.width - 4));
                tip.style.top = top + "px";
                tip.style.left = left + "px";
            });
        }
        function onInspectLeave() {
            const overlay = frameDoc && frameDoc.getElementById("sb-inspect-overlay");
            if (!overlay) return;
            overlay.firstElementChild.style.display = "none";
            overlay.lastElementChild.style.display = "none";
        }
        document.getElementById("cbInspect").addEventListener("change", e => {
            inspectOn = e.target.checked;
            if (inspectOn) activateInspect();
            else deactivateInspect();
        });

        /* ─── Globals: cambio de marca — reconstruye el iframe con el CSS de esa marca
           (setting + index) y re-renderiza. El chrome (padre) ya no monta componentes
           del DS, así que no necesita cambiar sus <link>. ─── */
        document.getElementById("cbBrand").addEventListener("change", e => {
            const cfg = BRAND_MAP[e.target.value]; if (!cfg) return;
            curBrandKey = e.target.value;
            curBrand = cfg;
            // Sobre una PÁGINA completa cargada: si es brandable (templates) conmutamos su
            // marca en vivo (swap de <link>/clases en su propio doc, como el showroom); NO se
            // remonta el doc del chrome. Si no es brandable (layouts), el control está grisado
            // y este handler no debería dispararse — pero por seguridad, no-op.
            // Cascada Marca → Cabecera (jerárquica, vale para componentes Y páginas): si la
            // cabecera seleccionada NO pertenece a la nueva marca, se limpia (sería incoherente:
            // clases de Levante con CSS de Sport).
            if (curCabecera && curCabecera.brandKey !== curBrandKey) {
                curCabecera = null;
                resetCabeceraTrigger();
            }
            if (framePage !== null) {
                if (curStory && curStory.brandable) applyBrandToPage(curBrandKey);
                return;
            }
            mountFrame();
        });

        /* ─── Globals: viewport — ancho × alto del iframe del canvas. Al vivir el preview en
           un iframe, las media queries del DS responden a ESTE tamaño → simula la resolución
           real con los cortes canónicos del DS (360 · 600 · 800 · 1024 · 1280) y añade
           presets prototípicos intermedios (320 · 375 · 390 · 412 · 768 · 1440).
           Presets WxH en el select + campos manuales ancho×alto (vacío = auto / 100%). ─── */
        const elVpSel = document.getElementById("cbViewport");
        const elVpW = document.getElementById("cbVpW");
        const elVpH = document.getElementById("cbVpH");
        function applyViewport() {
            if (!elFrame) return;
            const w = parseInt(elVpW.value, 10), h = parseInt(elVpH.value, 10);
            elFrame.style.width = w > 0 ? w + "px" : "100%";
            elFrame.style.height = h > 0 ? h + "px" : "100%";
            vpFixed = w > 0 || h > 0;
            elFrame.classList.toggle("cb-frame--fixed", vpFixed);
            // Propaga al body del iframe en vivo (sin remontar): quita el padding del .cb-canvas
            // en cualquier viewport ≠ Responsive. try/catch por si el doc aún no está montado.
            try { elFrame.contentDocument.body.classList.toggle("cb-vp-fixed", vpFixed); } catch (_) { }
        }
        elVpSel.addEventListener("change", () => {
            if (elVpSel.value === "custom") return;  // estado manual: el select solo refleja, no toca los campos
            const m = elVpSel.value ? elVpSel.value.split("x") : ["", ""];
            elVpW.value = m[0] || ""; elVpH.value = m[1] || "";
            applyViewport();
        });
        function onVpInput() {
            applyViewport();
            elVpSel.value = (elVpW.value || elVpH.value) ? "custom" : "";
        }
        elVpW.addEventListener("input", onVpInput);
        elVpH.addEventListener("input", onVpInput);

        /* ─── Resizers: sidebar (horizontal) y panel de addons (vertical) ─── */
        const app = root.querySelector(".cb-app");
        function makeResizer(id, onMove) {
            const h = document.getElementById(id);
            if (!h) return;
            h.addEventListener("pointerdown", e => {
                e.preventDefault();
                h.setPointerCapture(e.pointerId);
                h.classList.add("is-drag");
                document.body.classList.add("is-resizing");
                const move = ev => onMove(ev);
                const up = () => {
                    h.classList.remove("is-drag");
                    document.body.classList.remove("is-resizing");
                    h.removeEventListener("pointermove", move);
                    h.removeEventListener("pointerup", up);
                    try { h.releasePointerCapture(e.pointerId); } catch (_) { }
                };
                h.addEventListener("pointermove", move);
                h.addEventListener("pointerup", up);
            });
        }
        // Sidebar: ancho = clientX − borde izq. del app (clamp 180 … min(560, ventana−320))
        makeResizer("cbResizeX", ev => {
            const left = app.getBoundingClientRect().left;
            const w = Math.min(Math.max(ev.clientX - left, 180), Math.min(560, window.innerWidth - 320));
            app.style.setProperty("--cb-side-w", w + "px");
        });
        // Panel: alto = borde inf. del main − clientY (clamp 140 … alto−120).
        // Mínimo 140 = nunca colapsa a "solo tabs" — siempre se ve la barra superior +
        // al menos una fila. Persiste en localStorage["cbPanelH"] para sobrevivir al reload.
        makeResizer("cbResizeY", ev => {
            const r = elMain.getBoundingClientRect();
            const hgt = Math.min(Math.max(r.bottom - ev.clientY, 140), r.height - 120);
            elMain.style.setProperty("--cb-panel-h", hgt + "px");
            try { localStorage.setItem("cbPanelH", String(hgt)); } catch (_) { }
        });
        // Restauración del alto persistido (si el viewport actual es menor, se recorta al máximo posible).
        try {
            const saved = parseInt(localStorage.getItem("cbPanelH"), 10);
            if (saved >= 140) {
                const r = elMain.getBoundingClientRect();
                const max = Math.max(140, r.height - 120);
                elMain.style.setProperty("--cb-panel-h", Math.min(saved, max) + "px");
            }
        } catch (_) { }

        /* ─── Arranque: monta el iframe del canvas y selecciona la primera story ───
           curComp puede ser undefined si en DOMContentLoaded no había ningún módulo cargado
           (catálogo 100% diferido). En ese caso el chrome queda montado y vacío, y el primer
           SB.refresh() adopta la landing. */
        mountFrame();
        if (curComp) {
            const f = firstOf(curComp);
            select(curComp, f.sub, f.story);
        }
    }

    document.addEventListener("DOMContentLoaded", boot);
})();
