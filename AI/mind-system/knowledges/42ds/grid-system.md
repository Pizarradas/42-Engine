# Grid System 42DS

## meta
- domain: 42ds-grid
- source: "documento raíz del repositorio (AGENTS.md y/o CLAUDE.md) · scss/layout/README.md · fourty/layouts/layout-grid-flex.html"
- goal: construir layouts correctos usando el sistema de 12 columnas de 42DS
- agent_tags: [42ds, poc]

---

## concepts

### Estructura base
El grid es un sistema de 12 columnas basado en flexbox con cuatro niveles de anidamiento semántico:

```
ft-layout-grid-flex               ← contenedor raíz (define el ancho máximo)
└── ft-layout-grid-flex__row      ← fila flex (establece el eje horizontal)
    └── ft-layout-grid-flex__col[Breakpoint]-[n]  ← columna (define el ancho)
        └── ft-layout-grid-flex__nested           ← contenedor interno (padding y contenido)
```

> ⚠️ **`.ft-bg` NO EXISTE.** Es una clase inventada que circula copiada entre POCs (verificado:
> cero definiciones en `scss/` y en `cds-statics/css/`; los 226 wrappers raíz de los layouts y
> templates reales usan `ft-layout-grid-flex` a secas). **No la uses.**
>
> Para aplicar un color de fondo, el mecanismo real son los helpers `ft-helper-bgColor-*`
> (p.ej. `ft-helper-bgColor-background-lightGrey`).

### Breakpoints

| Sufijo | Breakpoint | Descripción |
|--------|-----------|-------------|
| `Xs` | 320px+ (default) | Móvil — los estilos base, sin media query |
| `Sm` | 768px+ | Phablet |
| `Md` | 1002px+ | Tablet |
| `Lg` | 1280px+ | Laptop |
| `Xlg` | 1440px+ | Desktop |

### Clases de columna
El patrón es `ft-layout-grid-flex__col[Breakpoint]-[1-12]`:
- `colXs-12` — 12/12 columnas (100% de ancho) en móvil
- `colMd-6` — 6/12 columnas (50%) en tablet+
- `colMdOffset-2` — desplaza 2 columnas a la derecha en tablet+

Se combinan clases de distintos breakpoints en el mismo elemento:
```html
class="ft-layout-grid-flex__colXs-12 ft-layout-grid-flex__colMd-6"
```

### Layouts frecuentes

| Layout | Clases |
|--------|--------|
| Contenido estrecho centrado | `colXs-12 colMd-8 colMdOffset-2` |
| Contenido ancho centrado | `colXs-12 colMd-10 colMdOffset-1` |
| Full width | `colXs-12` |
| Dos columnas iguales (tablet+) | `colXs-12 colMd-6` (por item) |
| Tres columnas (tablet+) | `colXs-12 colMd-4` (por item) |
| Sidebar + contenido | `colXs-12 colMd-3` + `colXs-12 colMd-9` |

### Grid anidado
Para layouts internos complejos dentro de una columna, se puede anidar el grid:

```html
<div class="ft-layout-grid-flex__colXs-12 ft-layout-grid-flex__colMd-8 ft-layout-grid-flex__colMdOffset-2">
  <div class="ft-layout-grid-flex__nested">
    <!-- Contenido directo aquí -->
    <!-- O un nuevo row para sub-columnas -->
    <div class="ft-layout-grid-flex__row">
      <div class="ft-layout-grid-flex__colXs-12 ft-layout-grid-flex__colMd-6">...</div>
      <div class="ft-layout-grid-flex__colXs-12 ft-layout-grid-flex__colMd-6">...</div>
    </div>
  </div>
</div>
```

---

## rules

### Structure
```
check: grid_root_present
target: [poc_layout]
rule: no_ft_layout_grid_flex_root → issue
output:
  problem: Layout sin contenedor raíz del grid DS
  recommendations:
    - Todo layout debe empezar con <div class="ft-layout-grid-flex">

check: row_inside_grid
target: [ft-layout-grid-flex__row]
rule: NOT direct_child_of_ft_layout_grid_flex → issue
output:
  problem: Row fuera del contenedor raíz del grid
  recommendations:
    - __row debe ser hijo directo de ft-layout-grid-flex
    - No insertar divs intermedios entre el grid raíz y sus rows

check: col_inside_row
target: [ft-layout-grid-flex__col*]
rule: NOT direct_child_of_row → issue
output:
  problem: Columna fuera de un row
  recommendations:
    - Las columnas deben ser hijos directos de ft-layout-grid-flex__row

check: nested_inside_col
target: [content]
rule: direct_child_of_col AND NOT ft-layout-grid-flex__nested → issue
output:
  problem: Contenido directo en columna sin __nested
  recommendations:
    - El contenido va dentro de ft-layout-grid-flex__nested
    - __nested gestiona el padding interno del área de contenido
```

### Column sizes
```
check: col_xs_base
target: [column]
rule: no_colXs_class → issue
output:
  problem: Columna sin clase base móvil (colXs)
  recommendations:
    - Siempre define el comportamiento móvil primero: colXs-12 (default full width)
    - Las clases colMd, colLg son overrides para pantallas mayores

check: col_sum_per_row
target: [ft-layout-grid-flex__row]
rule: sum_of_col_values_at_breakpoint != 12 AND NOT intentional_overflow → warning
output:
  problem: Las columnas de un row no suman 12 en algún breakpoint
  recommendations:
    - Comprueba que los col[X]-N de cada row suman 12 en cada breakpoint relevante
    - La excepción son rows con menos de 12 columnas intencionalmente (no llena el ancho)

check: offset_overflow
target: [column_with_offset]
rule: col_value + offset_value > 12 → issue
output:
  problem: Columna + offset supera las 12 columnas
  recommendations:
    - colMd-8 + colMdOffset-2 = 10 ✅
    - colMd-8 + colMdOffset-6 = 14 ❌
```

---

## checklist
- [ ] ¿El layout empieza con `ft-layout-grid-flex`? (sin `.ft-bg`: esa clase no existe)
- [ ] ¿Los `__row` son hijos directos del grid raíz?
- [ ] ¿Las columnas son hijas directas de `__row`?
- [ ] ¿El contenido va dentro de `__nested`?
- [ ] ¿Todas las columnas tienen clase `colXs-` base?
- [ ] ¿Columna + offset no supera 12?
