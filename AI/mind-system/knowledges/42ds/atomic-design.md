# Atomic Design en 42DS

## meta
- domain: 42ds-atomic-design
- source: "Atomic Design — Brad Frost · documento raíz del repositorio (AGENTS.md y/o CLAUDE.md) · scss/fourties/README.md · scss/fourties/atoms/README.md · scss/fourties/molecules/README.md · scss/fourties/organism/README.md"
- goal: entender la jerarquía de componentes del DS y aplicar nomenclatura BEM correctamente
- agent_tags: [42ds, poc, ds]

---

## concepts

### Los tres niveles

**Atoms** — componentes indivisibles. No dependen de otros componentes del DS.
- Prefijo CSS: `.ft-`
- Carpeta SCSS: `scss/fourties/atoms/[nombre]/_[nombre].scss`
- Ejemplos: btn, tag, title, text, link, img, date, toggle, switch

**Molecules** — combinaciones de atoms que forman una unidad funcional.
- Prefijo CSS: `.ft-mol-`
- Carpeta SCSS: `scss/fourties/molecules/[nombre]/_[nombre].scss`
- Ejemplos: card, tabs, accordion, modal, dropdown, form, pagination

**Organisms** — combinaciones de molecules (y atoms) que forman secciones completas de UI.
- Prefijo CSS: `.ft-org-`
- Carpeta SCSS: `scss/fourties/organism/[nombre]/_[nombre].scss` ← **singular** (`organism`, no `organisms`)
- Ejemplos: masthead, cardhome, mediaviewer, header-multibrand

### BEM en 42DS
El sistema sigue BEM estrictamente, con los prefijos de nivel como parte del bloque:

```
Bloque:      .ft-btn
Elemento:    .ft-btn__icon
Modificador: .ft-btn--primary   .ft-btn--md   .ft-btn--disabled
```

Reglas BEM específicas de 42DS:
- `$self: &` en SCSS — referencia al selector padre para elementos y modificadores anidados
- Los elementos BEM usan `#{$self}__elemento` para referenciar dentro del bloque
- Los modificadores nunca se usan solos: siempre acompañan al bloque base

### Modificadores de tamaño (obligatorios)
Ciertos componentes requieren modificador de tamaño — no tienen tamaño por defecto:
- `ft-btn`: `--xs` · `--sm` · `--md` · `--lg`
- `ft-tag`: `--xs` · `--sm` · `--md` · `--lg`
- `ft-org-cardHome`: `--xs` · `--featured` · `--md`

Sin modificador de tamaño, estos componentes no renderizan correctamente.

### Variantes por marca (todos los niveles)

Para cada nivel, si un componente tiene diferencias visuales entre marcas irreducibles con custom properties:

```
scss/fourties/[nivel]/[componente]/
├── _[componente].scss          # Estilos base (todas las marcas)
├── [componente]-ep.scss        # Variante El Periódico
├── [componente]-epe.scss       # Variante El Periódico de España
├── [componente]-regionales.scss
├── [componente]-revistas.scss
├── [componente]-sport.scss
└── [componente]-ux.scss        # Variante showroom
```

No todos los componentes necesitan variantes — solo cuando hay diferencias visuales reales por marca.

### Variantes AMP

Los componentes con versión AMP tienen archivos adicionales. La ubicación varía según el nivel:

| Nivel | Archivo AMP | Ubicación |
|-------|-------------|-----------|
| Atoms | `amp-[nombre].scss` | Dentro de la carpeta del atom: `atoms/[nombre]/amp-[nombre].scss` |
| Molecules | `amp-[nombre].scss` | Suelto en `fourties/molecules/` (no en subcarpeta) |
| Organisms | `amp-[nombre].scss` | Suelto en `fourties/organism/` (no en subcarpeta) |

**Atoms con variante AMP**: `date`, `tag`, `title`, `trust`

**Molecules con variante AMP** (archivos sueltos en `molecules/`):
`amp-boxInfo`, `amp-breadcrumb`, `amp-btnGroup`, `amp-headband`, `amp-header`, `amp-label`, `amp-modNews`, `amp-multimedia`, `amp-quote`, `amp-rankingNews`, `amp-related`, `amp-subtitle`, `amp-tab`, `amp-tagsNews`, `amp-tapbar`, `amp-ticker`, `amp-writer`

**Organisms con variante AMP** (archivos sueltos en `organism/`):
`amp-breadcrumb`, `amp-directNews`, `amp-object`

### Nomenclatura legacy en organisms

Algunos organisms usan camelCase en el nombre del archivo base por razones históricas. **No corregir:**
- `cardhome/` → `_cardHome.scss`

Para nuevos organisms, usar kebab-case.

### Decisión de nivel
Para decidir el nivel de un nuevo componente:

```
¿Depende de otros componentes del DS para funcionar?
  NO  → Atom (.ft-)
  SÍ  → ¿Es una sección completa de página con múltiples moléculas?
          SÍ → Organism (.ft-org-)
          NO → Molecule (.ft-mol-)
```

### Inventario completo de componentes

> **Verificar siempre** este inventario antes de crear un nuevo componente para evitar duplicados.

**Atoms (30)** — prefijo `.ft-`

| Componente | Clase base |
|-----------|-----------|
| ad | `.ft-ad` |
| advice | `.ft-advice` |
| anchor | `.ft-anchor` |
| animation | `.ft-animation` |
| btn | `.ft-btn` — sizes: xs, sm, md, lg; variantes: primary, secondary, ghost |
| carousel | `.ft-carousel` |
| check | `.ft-check` |
| date | `.ft-date` — tiene variante AMP |
| disqus | `.ft-disqus` |
| embed | `.ft-embed` |
| img | `.ft-img` |
| jwplayer | `.ft-jwplayer` |
| link | `.ft-link` |
| list | `.ft-list` |
| radio | `.ft-radio` |
| readmore | `.ft-readmore` |
| scrollbar | `.ft-scrollbar` |
| skin | `.ft-skin` |
| skiplink | `.ft-skiplink` |
| svgmap | `.ft-svgmap` |
| switch | `.ft-switch` |
| switch-brand | `.ft-switch-brand` |
| tag | `.ft-tag` — tiene variante AMP |
| text | `.ft-text` |
| timer | `.ft-timer` |
| title | `.ft-title` — tiene variante AMP |
| toogle | `.ft-toogle` — ⚠ typo legacy, mantener |
| tooltip | `.ft-tooltip` |
| tour | `.ft-tour` |
| trust | `.ft-trust` — tiene variante AMP |

**Molecules (65)** — prefijo `.ft-mol-`

accordion · author · authors · bar · boxInfo · breadcrumb* · btnGroup* · card · card-newsletter · card-video-thumb · carousel · comment · countdown · dataSheed · divider · dropdown · figcaption · footerbasic · form · gallery · gallery-img · graphLegend · headband* · header-custom · label* · lnkbox · marker · masonry · menuanchor · modal · modNews* · multimedia* · number-highlighted · overlay-live · pagination · paper · path · pie-chart · pollbox · popover · promoHeader · quote* · rankingNews* · related* · relatedSlider · rrss · score · scoreboard · slider · sticky-panel · subheader · subscribeRead · subtitle* · swiper · switcher · tab* · table · tabs · tagsNews* · tapbar* · ticker* · toc · toolbar · tracking · writer*

*Tiene variante AMP (archivo suelto en `fourties/molecules/`)

**Organisms (31)** — prefijo `.ft-org-`

author · authors · boxfeatures · breadcrumb* · cardhome · comments · currentNews · directNews* · footer-multibrand · game · header-custom · header-multibrand · header-regionales · header-revistas · header-showroom · hero · masthead · mediareport · mediaviewer · multibox · newsletter · object* · overview-panel · path · paywall · scoreboard · search-autocomplete · services · suggestions-chips · toolbar

*Tiene variante AMP (archivo suelto en `fourties/organism/`)

---

## rules

### Nomenclatura
```
check: prefix_matches_level
target: [component_class]
rule: is_atom AND NOT starts_with("ft-") → issue
       is_molecule AND NOT starts_with("ft-mol-") → issue
       is_organism AND NOT starts_with("ft-org-") → issue
output:
  problem: Prefijo CSS no coincide con el nivel Atomic Design
  recommendations:
    - Atoms: .ft-[nombre]
    - Molecules: .ft-mol-[nombre]
    - Organisms: .ft-org-[nombre]

check: bem_structure
target: [css_class]
rule: element_class NOT follows ft-[block]__[element] pattern → issue
output:
  problem: Clase de elemento BEM mal formada
  recommendations:
    - ✅ .ft-mol-card__title
    - ❌ .ft-mol-card-title (falta __)
    - ❌ .ft-mol__card__title (doble __)

check: modifier_without_base
target: [html_element]
rule: has_modifier_class AND NOT has_base_class → issue
output:
  problem: Modificador usado sin la clase base del bloque
  recommendations:
    - ❌ class="ft-btn--primary" → ✅ class="ft-btn ft-btn--primary"
    - ❌ class="ft-tag--sm" → ✅ class="ft-tag ft-tag--sm"
```

### Tamaños obligatorios
```
check: btn_size_modifier
target: [ft-btn element]
rule: no_size_modifier → issue
output:
  problem: ft-btn sin modificador de tamaño
  recommendations:
    - Añade --xs, --sm, --md o --lg según el contexto
    - CTAs principales: ft-btn--md
    - CTAs secundarios o compactos: ft-btn--sm

check: tag_size_modifier
target: [ft-tag element]
rule: no_size_modifier → issue
output:
  problem: ft-tag sin modificador de tamaño
  recommendations:
    - Chips de hero o destacados: ft-tag--md
    - Chips en listados o densos: ft-tag--sm

check: cardHome_size_modifier
target: [ft-org-cardHome element]
rule: no_size_modifier → issue
output:
  problem: ft-org-cardHome sin modificador de tamaño
  recommendations:
    - Carta destacada: ft-org-cardHome--featured
    - Carta estándar: ft-org-cardHome--md
    - Carta compacta en lista: ft-org-cardHome--xs
```

### Nivel correcto
```
check: atom_dependency
target: [new_atom]
rule: depends_on_other_ds_component → issue
output:
  problem: Componente clasificado como atom pero depende de otros componentes DS
  recommendations:
    - Si depende de otro componente DS, el nivel es molecule o superior
    - Revisa la decisión de nivel usando el árbol de decisión en §concepts

check: organism_scope
target: [new_organism]
rule: is_single_functional_unit AND NOT section_of_page → warning
output:
  problem: Componente clasificado como organism pero es una unidad funcional pequeña
  recommendations:
    - Los organisms son secciones completas de página (masthead, header, card destacada)
    - Si es una unidad funcional menor, probablemente es molecule
```

---

## checklist
- [ ] ¿El prefijo CSS coincide con el nivel (`ft-` / `ft-mol-` / `ft-org-`)?
- [ ] ¿Los elementos BEM usan `__` y los modificadores `--`?
- [ ] ¿Los modificadores siempre acompañan a la clase base?
- [ ] ¿`ft-btn`, `ft-tag` y `ft-org-cardHome` tienen modificador de tamaño?
- [ ] ¿El nivel elegido responde a la dependencia del componente?
- [ ] ¿El archivo SCSS está en la carpeta correcta del nivel?
- [ ] ¿Se verificó el inventario antes de crear un componente nuevo (para evitar duplicados)?
- [ ] ¿La carpeta SCSS usa `organism` (singular)?
- [ ] ¿Las variantes AMP de molecules y organisms son archivos sueltos, no subcarpetas?
- [ ] ¿Se respeta el camelCase legacy en organisms que ya lo usan?
