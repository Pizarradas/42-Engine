# Sistema de POCs 42DS

## meta
- domain: 42ds-poc-system
- source: "documento raíz del repositorio (AGENTS.md y/o CLAUDE.md) · fourty/README.md · AI/mind-system/agents/mode-poc.md"
- goal: entender la arquitectura del sistema de POCs: ubicación, estructura HTML y assets
- agent_tags: [42ds, poc]

---

## concepts

### Qué es un POC en 42DS
Un POC (Proof of Concept) es un archivo HTML que valida un flujo o idea de producto usando componentes reales del DS. No es documentación — es una pantalla funcional que el equipo puede revisar y validar.

### Estructura de carpetas según variante

**Variantes LF, HF, AI y CSS** — todo en `fourty/pocs/`:

```
fourty/pocs/
└── [nombre-proyecto]/
    ├── [pantalla-1].html      ← una pantalla = un archivo
    ├── [pantalla-2].html
    └── poc-[proyecto].css     ← solo variante CSS, si hay estilos .poc- compartidos inevitables
```

**Variante SCSS** — HTML en `fourty/pocs/`, SCSS en `scss/pocs/`:

```
fourty/pocs/
└── [nombre-proyecto]/
    ├── [pantalla-1].html      ← clases 42DS + clases .poc-
    └── [pantalla-2].html

scss/pocs/
└── [nombre-proyecto]/
    ├── _poc-[proyecto]-tokens.scss      ← variables CSS --poc-
    ├── _poc-[proyecto]-components.scss  ← selectores .poc-
    └── poc-[proyecto].scss              ← entry point (@import tokens + components)
```

> El SCSS de POCs NO importa `abstracts/abstracts.scss` ni `bourbon`. Es CSS puro con custom properties en `:root`. Para compilarlo, añadir el entry point `poc-[proyecto].scss` en Prepros como un proyecto independiente o usar un compilador manual.

Nombres de archivo: descriptivos del contenido, no genéricos (`acceso.html`, `resultado.html`, no `page1.html`).

### Rutas relativas desde `fourty/pocs/[proyecto]/`

```
Tres niveles arriba (../../../) → raíz del repo → accede a cds-statics/
```

| Recurso | Ruta |
|---------|------|
| setting.css | `../../../cds-statics/css/brands/ux/setting.css` |
| CSS principal | `../../../cds-statics/css/ux-index.css` |
| ft-mol-modal | `../../../cds-statics/js/modal/fourty-js-modal.js` |
| ft-mol-popover | `../../../cds-statics/js/modal/fourty-js-popover.js` |
| ft-mol-dropdown | `../../../cds-statics/js/dropdown/fourty-js-dropdown-accesible.js` |
| ft-mol-tabs | `../../../cds-statics/js/tab/fourty-js-tabs.js` |
| ft-mol-accordion | `../../../cds-statics/js/accordion/fourty-js-accordion-accesible.js` |
| Entre pantallas | `[archivo].html` (misma carpeta, ruta relativa simple) |

### Imágenes — placehold.co
Estado inicial de todos los POCs: imágenes de placehold.co.

```
Formato: https://placehold.co/[W]x[H]?text=[texto]
Ejemplo: https://placehold.co/656x381?text=Imagen+destacada

Proporciones frecuentes:
  16:9 destacada:  656x369
  16:9 card:       400x225
  Cuadrada avatar: 80x80  o  40x40
  Portrait:        400x600
```

Los atributos `width` y `height` en el `<img>` deben coincidir exactamente con las dimensiones de la URL. Sin esta coincidencia se produce layout shift (CLS).

---

## rules

### File structure
```
check: poc_location
target: [poc_file_path]
rule: path NOT starts_with "fourty/pocs/" → issue
output:
  problem: POC fuera de la carpeta fourty/pocs/
  recommendations:
    - Los POCs viven en fourty/pocs/[nombre-proyecto]/[pantalla].html

check: poc_one_screen_per_file
target: [poc_html_file]
rule: represents_multiple_screens_in_one_file → issue
output:
  problem: Varias pantallas en un mismo archivo HTML
  recommendations:
    - Un archivo HTML por pantalla del flujo
    - La navegación entre pantallas se hace con enlaces relativos: href="pantalla-2.html"
```

### Assets
```
check: placehold_dimensions_match
target: [img_with_placehold_src]
rule: img_width != url_width OR img_height != url_height → issue
output:
  problem: Dimensiones del <img> no coinciden con la URL de placehold.co
  recommendations:
    - Si la URL es placehold.co/400x225, el img debe tener width="400" height="225"
    - La discrepancia causa layout shift (CLS)

check: setting_css_loaded
target: [poc_html_head]
rule: no_setting_css_link → issue
output:
  problem: POC sin setting.css
  recommendations:
    - Añade <link href="../../../cds-statics/css/brands/ux/setting.css">
    - Debe ser el primer link de CSS
```

---

## checklist
- [ ] ¿El POC está en `fourty/pocs/[proyecto]/[pantalla].html`?
- [ ] ¿Un archivo por pantalla del flujo?
- [ ] ¿`setting.css` cargado primero?
- [ ] ¿Las dimensiones de `<img>` coinciden con las de la URL de placehold.co?
- [ ] ¿Los scripts de componentes JS (modal, dropdown…) cargados si el POC los usa?
- [ ] **[Variante CSS]** ¿Las clases custom usan prefijo `.poc-`? ¿Los tokens usan `--poc-`?
- [ ] **[Variante SCSS]** ¿Los archivos SCSS están en `scss/pocs/[proyecto]/`?
- [ ] **[Variante SCSS]** ¿El entry point `poc-[proyecto].scss` NO importa abstracts ni bourbon?
- [ ] **[Variante SCSS]** ¿Los candidatos a DS están anotados con `// [CANDIDATO DS]`?
