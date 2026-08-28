/* ════════════════════════════════════════════════════════════════════════
   42DS Storybook — capa de datos de marcas (CSV → índice consumible)
   ────────────────────────────────────────────────────────────────────────
   Carga el CSV maestro de Prensa Ibérica (cds-statics/csv/storybook__bodyclass.csv,
   medios + ítems combinables × 9 columnas) y lo expone como árbol indexable
   por el core.

   PRINCIPIO: capa de datos pura. Este módulo NO toca DOM, NO conoce
   BRAND_MAP, NO sabe del iframe ni del chrome del Storybook. Solo parsea
   y publica. Si el fetch falla, expone null y el core degrada el dropdown
   de Cabecera con un fallback grácil — el resto del Storybook funciona.

   Mantenibilidad: la fuente sigue siendo el CSV (editable en Sheets por
   contenido/marketing). Ver tabla-csv-medias.js para el otro consumidor.

   ── Contrato runtime ──────────────────────────────────────────────────
     window.SB_BRANDS         → estructura final (null hasta resolver fetch)
     window.SB_BRANDS_READY   → Promise<SB_BRANDS | null>

   ── Estructura de SB_BRANDS ───────────────────────────────────────────
     {
       rows:        [ {item, region_name, body_class, ...}, ... ],
       byBodyClass: { "<body_class>": <row> },          // lookup directo
       byMedia: [                                       // árbol para dropdown (grupos = medios)
         { mediaName:   "El Periódico de Cataluña",      // nombre canónico (el de la principal)
           brandGroup:  "EP",                            // ds__group → marca (EP·EPE·SPORT·REGIONALES)
           region:      "Cataluña",
           outlets:     [ { value, label, region, isPrincipal, parentClass }, ... ] },  // principal primero
           // parentClass = body_class de la principal, arrastrado a cada hija (traza); "" en la principal
         { mediaName:   "Diario de Córdoba",
           brandGroup:  "REGIONALES",
           outlets:     [...] },
         ...
       ],
       combinables: [                                   // eje ortogonal: is_combinable=TRUE
         { value: "noticia", label: "Noticia", color: "" },   // tipos de página y
         { value: "premium", label: "Premium", color: "" },   // modificadores de body
         ...                                                   // que se APILAN sobre la cabecera
       ]
     }
     · isPrincipal=true → cabecera PRINCIPAL del medio (fila is_associated=FALSE, la portada);
       va siempre la primera del grupo. El resto (verticales/hyperlocales) van alfabéticos.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";

    /* Path del CSV: derivado del <link> del DS para que funcione independientemente
       de la ubicación del HTML (mismo truco que core/storybook.js con cssBase). */
    function getCsvPath() {
        const rootCss = document.getElementById("brandStyles-root");
        const href = rootCss ? rootCss.getAttribute("href") : "../cds-statics/css/brands/ux/setting.css";
        const m = href.match(/^(.*\/cds-statics\/)/);
        const base = m ? m[1] : "../cds-statics/";
        return base + "csv/storybook__bodyclass.csv";
    }

    /* Parser CSV vanilla. El CSV de medios no usa entrecomillado (verificado), pero
       mantenemos el soporte por seguridad: dentro de "..." las comas no separan campos. */
    function parseCSVLine(line) {
        const out = [];
        let cur = "", inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const c = line[i];
            if (c === '"') { inQuotes = !inQuotes; continue; }
            if (c === ',' && !inQuotes) { out.push(cur); cur = ""; continue; }
            cur += c;
        }
        out.push(cur);
        return out;
    }
    function parseCSV(text) {
        const lines = text.replace(/\r\n/g, "\n").split("\n").filter(l => l.trim().length > 0);
        if (lines.length < 2) return [];
        const headers = parseCSVLine(lines[0]);
        return lines.slice(1).map(line => {
            const values = parseCSVLine(line);
            const row = {};
            headers.forEach((h, i) => { row[h] = (values[i] || "").trim(); });
            return row;
        });
    }

    /* Normaliza un nombre de medio para agrupar variantes: minúsculas, sin acentos, sin
       artículos/preposiciones (de/del/la/el…) ni signos → "Diario de Córdoba" y "Diario
       Córdoba" colapsan a la misma clave. Solo para agrupar; el nombre visible es el original. */
    function normMedia(s) {
        return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
            .replace(/\b(de|del|la|el|los|las|y)\b/g, "")
            .replace(/[^a-z0-9]/g, "");
    }
    /* Claves de agrupación de una fila-cabecera. EP·EPE·SPORT son marcas de UN SOLO medio → la
       clave es el propio ds__group (une la principal con sus verticales aunque el nombre difiera,
       p.ej. "El Periódico de Cataluña" ↔ "El Periódico"). En REGIONALES la clave es el nombre
       normalizado:
         · HIJA  → su media_associated (apunta a su medio).
         · PADRE → media_associated, item Y body_class (el slug del medio). Devuelve las tres
                   porque las hijas a veces nombran al medio como el padre lo tiene en `item` y a
                   veces como su `body_class` (la identidad funcional). Probar las tres engancha
                   al padre con sus hijas sin depender de que el rótulo operativo coincida.
       Orden de las claves del padre = prioridad de match (media_associated > item > body_class). */
    function rowKeys(row, isParent) {
        const g = (row.ds__group || "").toUpperCase();
        if (g === "EP" || g === "EPE" || g === "SPORT") return ["g:" + g];
        if (isParent) {
            return [...new Set([row.media_associated, row.item, row.body_class]
                .filter(Boolean).map(v => "n:" + normMedia(v)))];
        }
        return ["n:" + normMedia(row.media_associated || row.item)];
    }

    /* Indexa: byBodyClass (lookup directo) + byMedia (árbol agrupado para el dropdown).
       Esquema del CSV (storybook__bodyclass.csv, 9 columnas):
         · is_combinable=TRUE  → tipo de página / modificador de body (eje aparte, no outlet).
         · is_combinable=FALSE && is_associated=FALSE → CABECERA PRINCIPAL del medio (la portada).
           Va la primera del grupo, marcada isPrincipal.
         · is_associated=TRUE  → CABECERA HIJA (vertical/hyperlocal).
         · ds__group           → marca del medio (EP·EPE·SPORT·REGIONALES·REVISTAS); ALL = combinable.
                                  (REVISTAS es paraguas: la submarca concreta —cuore/woman/stilo/
                                  viajar— la resuelve el core por el body_class de la principal.)
       2 pasadas: 1ª las hijas crean los grupos (por media_associated); 2ª cada principal se
       engancha al grupo que case por cualquiera de sus claves (media_associated/item/body_class)
       — body_class es la identidad funcional estable, así no hay que mantener nombres a mano.
       Una principal sin hijas forma su propio grupo de una sola entrada. */
    function buildIndex(rows) {
        const byBodyClass = {};
        const groups = {};        // clave canónica → grupo
        const keyToGroup = {};    // cualquier clave de hija → grupo (para enganchar padres)
        const combinables = [];
        const parentRows = [];    // las principales se procesan en 2ª pasada
        function addOutlet(grp, row, isPrincipal) {
            grp.outlets.push({
                value: row.body_class,
                label: row.item || row.body_class,
                region: row.region_name || "",
                isPrincipal: isPrincipal    // cabecera principal del medio (portada)
            });
            if (row.region_name) grp._regionTally[row.region_name] = (grp._regionTally[row.region_name] || 0) + 1;
        }
        // ── 1ª pasada: combinables + hijas (crean los grupos) ──
        rows.forEach(row => {
            if (row.body_class) byBodyClass[row.body_class] = row;
            const g = (row.ds__group || "").toUpperCase();
            if ((row.is_combinable || "").toUpperCase() === "TRUE") {
                if (row.body_class) combinables.push({
                    value: row.body_class,
                    label: row.item || row.body_class,
                    color: ""    // el CSV ya no trae code_color_hex
                });
                return;          // un combinable nunca es outlet
            }
            if (!row.body_class) return;   // sin body_class no es seleccionable
            if ((row.is_associated || "").toUpperCase() !== "TRUE") { parentRows.push(row); return; }
            const key = rowKeys(row, false)[0];
            let grp = groups[key];
            if (!grp) {
                grp = groups[key] = {
                    mediaName: row.media_associated || row.item || row.body_class,
                    brandGroup: g, region: "", _named: false, _regionTally: {}, outlets: []
                };
                keyToGroup[key] = grp;
            }
            addOutlet(grp, row, false);
        });
        // ── 2ª pasada: principales → engancha al grupo de sus hijas, o crea el suyo ──
        parentRows.forEach(row => {
            const g = (row.ds__group || "").toUpperCase();
            const keys = rowKeys(row, true);
            let grp = null;
            for (const k of keys) { if (keyToGroup[k]) { grp = keyToGroup[k]; break; } }
            if (!grp) {                       // principal sin hijas → grupo propio
                const key = keys[0];
                grp = groups[key] = {
                    mediaName: "", brandGroup: g, region: "", _named: false, _regionTally: {}, outlets: []
                };
                keyToGroup[key] = grp;
            }
            // Rótulo del grupo = identidad del medio. La principal manda:
            // media_associated del padre > item del padre > lo que pusieran las hijas.
            grp.mediaName = row.media_associated || row.item || grp.mediaName;
            grp._named = true;
            addOutlet(grp, row, true);
        });
        const byMedia = Object.values(groups);
        byMedia.forEach(m => {
            // Región representativa del medio = la más frecuente entre sus outlets (algún
            // medio abarca varias CC.AA., p.ej. EP de España en Madrid + Castilla-La Mancha);
            // desempate alfabético. Es la clave de orden de los bloques.
            m.region = Object.keys(m._regionTally).sort((a, b) =>
                (m._regionTally[b] - m._regionTally[a]) || a.localeCompare(b, "es"))[0] || "";
            delete m._regionTally;
            delete m._named;
            // La cabecera principal (padre) primero; el resto alfabético.
            m.outlets.sort((a, b) =>
                (Number(b.isPrincipal) - Number(a.isPrincipal)) || a.label.localeCompare(b.label, "es"));
            // TRAZA: una hija (vertical/hyperlocal) vive DENTRO de su medio → su página lleva
            // también la clase del medio principal. Arrastramos el body_class de la principal a
            // cada hija como parentClass; la principal no arrastra nada (es la raíz).
            const principal = m.outlets.find(o => o.isPrincipal);
            const principalClass = principal ? principal.value : "";
            m.outlets.forEach(o => { o.parentClass = o.isPrincipal ? "" : principalClass; });
        });
        // Orden de bloques: por comunidad autónoma (alfabético) y, dentro de la misma CA, por
        // nombre del medio. Coherente y predecible (antes era por nº de outlets desc).
        byMedia.sort((a, b) =>
            a.region.localeCompare(b.region, "es") || a.mediaName.localeCompare(b.mediaName, "es"));
        return { rows, byBodyClass, byMedia, combinables };
    }

    window.SB_BRANDS = null;
    // cache:"no-cache" → el navegador revalida con el servidor en cada page load (If-Modified-Since).
    // Si el CSV no cambió: 304 sin payload (microsegundos). Si cambió: 200 con nuevos datos.
    // Importante para un dataset que se edita "continuamente" — evita "ya añadí el medio pero
    // no aparece" en sesiones largas tras un Ctrl+R normal.
    window.SB_BRANDS_READY = fetch(getCsvPath(), { cache: "no-cache" })
        .then(r => r.ok ? r.text() : Promise.reject(new Error("CSV fetch " + r.status)))
        .then(text => {
            const idx = buildIndex(parseCSV(text));
            window.SB_BRANDS = idx;
            return idx;
        })
        .catch(err => {
            console.warn("[SB] brand-data.js: no se pudo cargar el CSV de medios →", err.message,
                "(el dropdown Cabecera quedará oculto; el resto del Storybook funciona normal)");
            return null;
        });
})();
