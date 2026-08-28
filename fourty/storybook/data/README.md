# storybook/data

Capa de **datos pura** del Storybook. Carga el CSV maestro de medios de Prensa Ibérica
(`/cds-statics/csv/storybook__bodyclass.csv`) y lo expone como un índice consumible por el motor.

```
data/
├── README.md
└── brand-data.js     ← fetch + parser + buildIndex
```

---

## JSON portable del Footer Lite

[`footer-lite.json`](footer-lite.json) no se carga en el runtime del chrome. Es un artefacto
descargable para consumidores que programan el footer desde datos en lugar de pegar su HTML.
Contiene 24 contratos autocontenidos (`footers[]`), uno por cada HTML/story del subgrupo Lite;
cada contrato repite sus secciones completas para poder consumirse de forma independiente.
Su estructura se versiona mediante `schemaVersion` y se regenera con
`scripts/generate-footer-lite-json.js` a partir de los datos documentados en
`js/organisms/footer/footer.js`.

---

## Principio: capa de datos, cero acoplamiento al UI

`brand-data.js` **no toca DOM, no conoce `BRAND_MAP`, no sabe del iframe ni del chrome**.
Solo parsea y publica. Si el fetch falla, expone `null` y el core degrada el dropdown de
Cabecera con un fallback grácil — el resto del Storybook funciona normal.

Esta separación es deliberada: la capa de datos es **agnóstica** y reutilizable. Si en el
futuro se necesita la misma matriz en otro contexto (panel addon, página de auditoría,
script de generación), basta cargar `brand-data.js` y consumir `window.SB_BRANDS`.

---

## Contrato runtime

```js
window.SB_BRANDS        // null hasta que resuelva el fetch; estructura final cuando carga
window.SB_BRANDS_READY  // Promise<SB_BRANDS | null>  — el core hace .then()
```

### Estructura de `SB_BRANDS`

El CSV se rediseñó (02/2026) a **9 columnas**:
`item, body_class, item_update, region_name, region_code, ds__group, is_combinable, is_associated, media_associated`.
Desaparecieron `media_associated_class`, `is_hyperlocal`, `code_color_hex` (+ color_variable/filter,
lat/long, url_web/app, canbe_activos, is_cronicas, has_logo_cr) y se añadieron **`ds__group`**
(marca del medio: `EP·EPE·SPORT·REGIONALES·REVISTAS`; `ALL` = combinable) e **`is_associated`**
(`TRUE` = la fila es una cabecera seleccionable).

```ts
{
  rows: [                                  // 200+ filas tal cual del CSV (sin filtrar)
    {
      item: "Badalona",
      body_class: "badalona",              // vertical/hyperlocal del medio
      item_update: "12/02/2026",
      region_name: "Cataluña",
      region_code: "CA",
      ds__group: "EP",                     // marca → EP·EPE·SPORT·REGIONALES·REVISTAS·ALL
      is_combinable: "FALSE",
      is_associated: "TRUE",               // TRUE = cabecera seleccionable
      media_associated: "El Periódico"     // nombre del medio padre = clave de agrupación
    },
    ...
  ],

  byBodyClass: {                           // lookup directo por body_class
    "badalona": <row>,
    "altoguadalquivir": <row>,
    ...
  },

  byMedia: [                               // árbol agrupado para construir el dropdown
    {                                        // (ordenado por CA → nombre de medio)
      mediaName:  "El Periódico de Cataluña",  // nombre canónico (el de la principal)
      brandGroup: "EP",                    // ds__group → marca (alimenta groupToBrand)
      region:     "Cataluña",              // CA representativa (clave de orden de bloques)
      outlets: [
        { value: "ft-brand-ep", label: "El Periódico de Cataluña", region: "Cataluña", isPrincipal: true,  parentClass: "" },
        { value: "badalona",    label: "Badalona",                 region: "Cataluña", isPrincipal: false, parentClass: "ft-brand-ep" },
        ...
      ]   // parentClass = body_class de la principal (traza); la hija lo arrastra, la principal no
    },
    { mediaName: "Diario de Córdoba", brandGroup: "REGIONALES", outlets: [...] },
    ...
  ],

  combinables: [                           // eje ortogonal: filas is_combinable=TRUE
    { value: "noticia", label: "Noticia", color: "" },
    { value: "premium", label: "Premium", color: "" },
    { value: "portada", label: "Portada", color: "" },
    ...                                     // tipos de página + modificadores de body
  ]
}
```

**Entran a `byMedia` las filas con `body_class` que sean cabecera:**
- **`is_combinable=FALSE` y `is_associated=FALSE`** → cabecera PRINCIPAL del medio (la portada).
  Va la primera del grupo, marcada `isPrincipal: true`.
- **`is_associated=TRUE`** → cabecera HIJA (vertical/hyperlocal).

**El `item` es solo el rótulo operativo y NO interviene en la agrupación.** Lo que une a una
principal con sus hijas es la identidad del medio, en 2 pasadas:
1. Las **hijas** crean los grupos por su `media_associated` (en `EP·EPE·SPORT`, por `ds__group` —
   marcas de un solo medio).
2. Cada **principal** se engancha al grupo que case por **cualquiera** de sus claves —
   `media_associated`, `item` o **`body_class`** (todas normalizadas con `normMedia`). Probar
   también el `body_class` es clave: a veces el `media_associated` de las hijas coincide con el
   `body_class` del padre (la identidad funcional) y no con su `item` —p.ej. hijas
   *Levante-El Mercantil Valenciano* ↔ padre `body_class="levante-el-mercantil-valenciano"`,
   `item="El Mercantil Valenciano"`—. Así engancha sin depender del rótulo.

El **rótulo del grupo** sigue la precedencia `media_associated del padre > item del padre > lo que
pusieran las hijas`. Una principal **sin hijas** forma su propio grupo de una sola entrada.

### `combinables` — eje de modificadores apilables

Las filas marcadas `is_combinable=TRUE` (`ds__group=ALL`) son **tipos de página y
modificadores de body** (`portada`, `noticia`, `premium`, `has-tapbar`, `tag`, `cerca`,
`ft-skin--cerca`…): no tienen medio asociado y por eso **no entran a `byMedia`**. `buildIndex`
los recoge en un array aparte, `combinables`, conservando el **orden del CSV** (que refleja el
orden de composición del `<body>` en producción). El core los pinta como un grupo
multi-selección en el dropdown de Cabecera y los **apila** sobre el outlet/marca vigente. En el
dropdown se anclan en su **propio bloque al fondo** del selector, debajo de las cabeceras (ver
`core/README.md` § «Cabecera — dos ejes»). `value` = `body_class`, `label` = `item` (o
`body_class` si vacío), `color` = `""` (el CSV ya no trae `code_color_hex`).

### Orden de `byMedia`

Orden coherente y predecible (criterio: la comunidad autónoma a la que pertenece el medio):

- **Bloques de medio**: por **comunidad autónoma** (alfabético, `es` locale) y, dentro de la
  misma CA, por **nombre del medio** (alfabético). La CA del medio es su `region`
  **representativa** = la más frecuente entre sus outlets (algún medio abarca varias CC.AA.,
  p.ej. *El Periódico de España* en Madrid + Castilla-La Mancha; desempate alfabético).
- **Outlets dentro de cada medio**: alfabéticos en `es` locale (`a.label.localeCompare(b.label,
  "es")`). "Albal" antes de "Almenara".
- Cada grupo de `byMedia` expone `region` (string) con esa CA representativa.

---

## Por qué CSV y no JSON

Decisión arquitectónica documentada con razones:

1. **El CSV se edita en Excel/Google Sheets** por cualquier persona del equipo (contenido,
   marketing, producto) sin saber sintaxis. JSON exige editor de código y atención a
   comas, comillas y llaves.
2. **Diffs limpios en Git**: una fila = un medio. Añadir/quitar es 1 línea de diff. JSON
   anidado generaría diffs ruidosos al mover medios entre regiones.
3. **Forma tabular = datos tabulares**: 200+ filas × 19 columnas con esquema fijo. JSON
   brilla con árboles, no con tablas.
4. **DRY con `tabla-csv-medias.js`**: el showroom ya consume este CSV
   (`/fourty/organisms/organism-masthead-login.html`). Una sola fuente de verdad.
5. **No hay toolchain Node**: convertir CSV→JSON requeriría un build step, violando
   `CLAUDE.md` raíz ("el repo hoy solo usa Prepros para SCSS").

El coste de parsear CSV en runtime es despreciable (~15 líneas, milisegundos).

---

## Parser CSV (vanilla, ~30 líneas)

Implementación en `brand-data.js`:

```js
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
```

**Soporta entrecomillado** (`"valor con, coma"`) por seguridad aunque el CSV actual no
lo necesite. Future-proofing barato (3 líneas extra).

**No soporta**:
- Quoted quotes (`""` → `"`): no aparece en el CSV.
- Multiline cells (campos con saltos de línea): no aparece y rompería el `split("\n")`.

Si en el futuro el CSV gana esos casos, hay que ampliar el parser. Por ahora YAGNI.

---

## Path resolution

El path del CSV se deriva del `<link id="brandStyles-root">` del HTML, igual que el
motor deriva `cssBase`. Permite que el storybook funcione desde cualquier ubicación sin
hardcodear paths:

```js
function getCsvPath() {
  const rootCss = document.getElementById("brandStyles-root");
  const href = rootCss ? rootCss.getAttribute("href") : "../cds-statics/css/brands/ux/setting.css";
  const m = href.match(/^(.*\/cds-statics\/)/);
  const base = m ? m[1] : "../cds-statics/";
  return base + "csv/storybook__bodyclass.csv";
}
```

---

## Cache control

```js
fetch(getCsvPath(), { cache: "no-cache" })
```

`no-cache` ≠ "no cachear". Significa "revalidar siempre con el servidor antes de usar la
versión cacheada" (envía `If-Modified-Since` y `If-None-Match`).

- Si el CSV no cambió: `304 Not Modified`, body vacío, microsegundos. Browser usa el
  caché.
- Si cambió: `200 OK` con la nueva versión, browser cachea la versión nueva, próximas
  peticiones vuelven a `304` hasta el siguiente cambio.

**Por qué**: el CSV se edita "continuamente" (añaden/quitan medios). Sin esto, una
sesión larga del usuario muestra datos stale tras una edición remota del CSV.
Con esto, un Ctrl+R normal trae la versión fresca.

En producción con CDN, el `Cache-Control` del servidor manda sobre esto. Decidir cache
strategy en infra, no en client.

---

## Cómo lo consume el core

```js
// En boot() de core/storybook.js
window.SB_BRANDS_READY.then(data => {
  const hasData = data && (data.byMedia.length || (data.combinables && data.combinables.length));
  if (!hasData) {
    elCabWrap.style.display = "none";   // sin datos → ocultar dropdown Cabecera
    return;
  }
  buildCabeceraMenu(data);              // hidratar el menú (outlets + combinables)
});
```

El motor:
1. Lee `data.byMedia` para construir el dropdown con groups + outlets + chip de región
   (`region_name`). Los swatches de color quedan vacíos (el CSV ya no trae color).
2. Cuando el usuario selecciona una cabecera, propaga el `body_class` del outlet al `body`
   del iframe (vía `frameHTML()` en el próximo `mountFrame`). La marca (`ft-brand-*`) la
   aplica el eje Brand desde `BRAND_MAP`, no la cabecera.
3. Calcula `groupToBrand(brandGroup)` (= `ds__group`) para auto-sincronizar el Brand select
   (`EP→ep`, `EPE→epe`, `SPORT→sport`, `REGIONALES→regionales`).

---

## Cómo añadir / quitar medios

**Como editor del CSV** (no programador):

1. Abrir `cds-statics/csv/storybook__bodyclass.csv` en Excel / Google Sheets / VS Code.
2. Añadir la fila con `body_class`, `ds__group` (marca: `EP·EPE·SPORT·REGIONALES·REVISTAS`) e
   `item` (rótulo libre). Marca como **principal** (portada) con `is_combinable=FALSE` +
   `is_associated=FALSE`, y como **hija** (vertical/hyperlocal) con `is_associated=TRUE` +
   `media_associated` = nombre del medio.
3. Guardar.
4. Cargar el storybook. La cabecera aparece automáticamente en el grupo de su medio (la principal
   la primera, marcada «principal»), con su pastilla de región (`region_name`).

> **El enganche principal↔hijas es automático**: la principal se une al grupo cuyas hijas la
> nombren por su `media_associated`, su `item` **o** su `body_class`. Basta con que el
> `media_associated` de las hijas coincida (normalizado) con alguno de esos tres del padre —
> normalmente con el `body_class`, que es la identidad funcional. El `item` queda libre.

No hace falta tocar JS ni recompilar nada.

---

## Cómo añadir un nuevo medio (grupo) entero

Si la nueva entrada del CSV introduce un medio que no existía antes (nuevo `media_associated`
o nueva principal con `item` nuevo), `buildIndex` lo detecta automáticamente y crea el grupo.
Sin código.

La marca del grupo la fija su `ds__group` vía `groupToBrand()`: `REGIONALES` →
`showroom-brand-regionales`, etc. Si un grupo nuevo necesitara una marca que no esté en el
mapa `GROUP_BRAND` (core/storybook.js), añadir ahí el case explícito.

---

## Cómo extender la capa de datos

### Añadir un nuevo campo derivado al índice

Editar `buildIndex(rows)` en `brand-data.js`. Ejemplo: añadir `byRegion` (lookup por
comunidad autónoma):

```js
function buildIndex(rows) {
  const byBodyClass = {}, mediaMap = {}, byRegion = {};
  rows.forEach(row => {
    // ... código existente ...
    if (row.region_name) {
      (byRegion[row.region_name] = byRegion[row.region_name] || []).push(row);
    }
  });
  // ...
  return { rows, byBodyClass, byMedia, byRegion };
}
```

Los consumidores existentes no se ven afectados (campo opcional). El nuevo consumidor
lo lee con `SB_BRANDS.byRegion`.

### Añadir un nuevo CSV / fuente de datos

Crear un módulo paralelo (`storybook/data/<otro>.js`) que siga el mismo patrón:
- Self-contained IIFE
- Expone `window.SB_<NOMBRE>` y `window.SB_<NOMBRE>_READY`
- Cero acoplamiento al chrome o al iframe

Cargar en `index.html` antes del core:

```html
<script src="storybook/assets/icons.js" defer></script>
<script src="storybook/data/brand-data.js" defer></script>
<script src="storybook/data/<otro>.js" defer></script>      <!-- nuevo -->
<script src="storybook/js/core/storybook.js" defer></script>
```

---

## Reglas no-negociables

1. **No tocar el CSV desde el código del storybook**. El CSV es la fuente de verdad,
   mantenida por contenido/marketing. El storybook lo LEE, no lo escribe.
2. **No introducir Papa Parse, jQuery ni librerías de parseo**. El parser vanilla es
   suficiente y el zero-toolchain es principio del repo.
3. **`brand-data.js` no debe tocar DOM**. Si necesitas leer el `<link>` para derivar el
   path está bien, pero no manipular nada.
4. **No bloquear el boot del core**. El fetch es async; el storybook arranca igualmente
   y degrada el dropdown si los datos no llegan.
5. **Una sola fuente de verdad para la matriz de marcas**: este CSV. No duplicar con un
   JSON ni con un objeto JS hardcoded.
