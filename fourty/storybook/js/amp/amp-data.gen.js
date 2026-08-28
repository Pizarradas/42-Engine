/* TEMPORAL/COMMITTED — extrae los paneles AMP (data-showroom-view="amp") de las páginas de
   showroom de ATOMS + MOLECULES + ORGANISMS y emite amp-data.json (entradas {comp,level,panels}
   para amp.js). El `comp` es el id REAL del componente en el storybook (resuelto leyendo el primer
   `id:` de js/<nivel>/<folder>/<folder>.js + matching por nombre normalizado showroom↔folder).
   Uso: node fourty/storybook/js/amp/amp-data.gen.js            (todos los niveles)
        node fourty/storybook/js/amp/amp-data.gen.js molecules  (un nivel) */
const fs = require("fs");
const path = require("path");

const FOURTY = path.resolve(__dirname, "../../..");   // .../42ds/fourty
const JSROOT = path.resolve(__dirname, "..");          // .../js
const LEVELS = [
    { level: "atoms",     dir: path.join(FOURTY, "atoms"),     filePre: "atom-",     jsDir: path.join(JSROOT, "atoms") },
    { level: "molecules", dir: path.join(FOURTY, "molecules"), filePre: "molecule-", jsDir: path.join(JSROOT, "molecules") },
    { level: "organisms", dir: path.join(FOURTY, "organisms"), filePre: "organism-", jsDir: path.join(JSROOT, "organisms") }
];
const only = process.argv.slice(2);

const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/* folder → id real del componente (primer `id:` del módulo). */
function readIds(jsDir) {
    const map = {};   // norm(folder) → { folder, id }
    if (!fs.existsSync(jsDir)) return map;
    fs.readdirSync(jsDir, { withFileTypes: true }).filter(d => d.isDirectory()).forEach(d => {
        const js = path.join(jsDir, d.name, d.name + ".js");
        let id = d.name;
        if (fs.existsSync(js)) {
            const m = fs.readFileSync(js, "utf8").match(/\bid:\s*"([^"]+)"/);
            if (m) id = m[1];
        }
        map[norm(d.name)] = { folder: d.name, id: id };
    });
    return map;
}

/* Balanced walk de <div>…</div> a partir del índice de un "<div". Cuenta solo divs. */
function divInner(src, openIdx) {
    const tagEnd = src.indexOf(">", openIdx);
    let depth = 1;
    const re = /<\/?div\b/gi;
    re.lastIndex = tagEnd + 1;
    let m;
    while ((m = re.exec(src))) {
        if (m[0][1] === "/") { depth--; if (depth === 0) return src.slice(tagEnd + 1, m.index); }
        else depth++;
    }
    return src.slice(tagEnd + 1);
}
function labelOf(panel, view) {
    const m = panel.match(new RegExp('<span[^>]*data-showroom-view="' + view + '"[^>]*>([\\s\\S]*?)</span>', "i"));
    return m ? m[1].replace(/\s+/g, " ").trim() : "";
}
const tidy = html => html.replace(/\.\.\/\.\.\/cds-statics/g, "/cds-statics")
    .replace(/\r/g, "").split("\n").map(l => l.trim()).filter(Boolean).join("\n");

function extractPanels(src) {
    const panels = [];
    const re = /data-showroom-view="amp"/g;
    const seen = new Set();
    let m;
    while ((m = re.exec(src))) {
        const openIdx = src.lastIndexOf("<div", m.index);
        if (openIdx < 0 || seen.has(openIdx)) continue;
        seen.add(openIdx);
        const panel = divInner(src, openIdx);
        const rcIdx = panel.search(/<div\s+class="rendered-content"/i);
        if (rcIdx < 0) continue;
        const inner = tidy(divInner(panel, rcIdx));
        if (!inner) continue;
        panels.push({
            name: labelOf(panel, "design") || "AMP",
            cls: labelOf(panel, "develop"),
            html: inner,
            ampEl: /<amp-[a-z]/i.test(inner)
        });
    }
    return panels;
}

const out = [];
const unmatched = [];
LEVELS.filter(L => !only.length || only.indexOf(L.level) >= 0).forEach(L => {
    const ids = readIds(L.jsDir);
    fs.readdirSync(L.dir).filter(f => f.startsWith(L.filePre) && f.endsWith(".html")).forEach(f => {
        const src = fs.readFileSync(path.join(L.dir, f), "utf8");
        if (!/data-showroom-view="amp"/.test(src)) return;
        const raw = f.slice(L.filePre.length, -5);     // sin prefijo ni .html
        const hit = ids[norm(raw)];
        if (!hit) { unmatched.push(L.level + "/" + f + " (raw=" + raw + ", norm=" + norm(raw) + ")"); return; }
        const panels = extractPanels(src);
        if (!panels.length) return;
        out.push({ comp: hit.id, level: L.level, panels: panels });
        console.error(L.level + " · " + raw + " → id=" + hit.id + " · " + panels.length + " panel(es)" + (panels.some(p => p.ampEl) ? " (amp-*)" : ""));
    });
});

if (unmatched.length) {
    console.error("\n⚠ SIN MAPEAR (revisar OVERRIDES):");
    unmatched.forEach(u => console.error("  " + u));
}
const dest = path.join(__dirname, "amp-data.json");
fs.writeFileSync(dest, JSON.stringify(out, null, 2), "utf8");
console.error("\n→ " + dest + " · " + out.length + " componentes");
