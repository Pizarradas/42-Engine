# Sistema de Helpers 42DS

## meta
- domain: 42ds-helpers
- source: "documento raíz del repositorio (AGENTS.md y/o CLAUDE.md) · fourty/helpers/README.md · scss/base/"
- goal: usar las clases utilitarias del DS para espaciado, tipografía y display sin CSS custom
- agent_tags: [42ds, poc, ds]

---

## concepts

### Filosofía: helpers antes que CSS custom
Los helpers son clases utilitarias generadas sistemáticamente que implementan los valores del sistema de diseño. Usarlos en lugar de CSS custom garantiza:
- Consistencia visual entre todos los componentes y pantallas
- Alineación con la escala de espaciado del DS
- Mantenimiento centralizado (cambiar la escala en un lugar actualiza todo)

Regla operativa: **si existe un helper para lo que necesitas, úsalo**. CSS custom solo cuando el helper no cubre el caso.

### Categorías de helpers

**Espaciado (spacer)**
Controlan márgenes, paddings y gaps usando la escala del sistema:

| Sufijo de tamaño | Valor aproximado |
|-----------------|-----------------|
| `xxs` | ~4px |
| `xs` | ~8px |
| `sm` | ~12px |
| `md` | ~16–20px |
| `lg` | ~24–32px |
| `xlg` | ~40–48px |
| `xxlg` | ~64px+ |

```
ft-helper-spacer-t-[tamaño]        → margin-top
ft-helper-spacer-b-[tamaño]        → margin-bottom
ft-helper-spacer-inner-[tamaño]    → padding (todos los lados)
ft-helper-spacer-inner-t-[tamaño]  → padding-top
ft-helper-spacer-inner-b-[tamaño]  → padding-bottom
ft-helper-spacer-gap-y-[tamaño]    → gap (flex/grid, eje vertical)
ft-helper-property-column-gap-xs   → column-gap pequeño
```

**Display y layout**

```
ft-helper-display-flex                 → display: flex
ft-helper-display-flex--middle         → align-items: center
ft-helper-display-flex--end            → justify-content: flex-end
ft-helper-display-flex--between        → justify-content: space-between
ft-helper-display-flex--column         → flex-direction: column
ft-helper-display-flex--wrap           → flex-wrap: wrap
```

**Tipografía**

```
ft-helper-fontSize-heading-[XXL|XL|L|M|S|XS]  → tamaños de heading
ft-helper-fontSize-body-[XL|L|M|S|XS]          → tamaños de body

ft-helper-fontWeight-[300|400|600|700|800]      → pesos tipográficos

ft-helper-fontColor-white                       → color blanco
ft-helper-fontColor-black                       → color negro
ft-helper-fontColor-primary                     → var(--color-primary)
ft-helper-fontColor-secondary                   → var(--color-secondary)
```

**Color de fondo**

```
ft-helper-bgColor-background-lightGrey  → fondo gris claro del sistema
```

---

## rules

### Helpers vs CSS custom
```
check: spacer_helper_available
target: [inline_style OR custom_css_margin_padding]
rule: property IN [margin-top, margin-bottom, padding] AND equivalent_helper_exists → issue
output:
  problem: Margin/padding custom cuando existe helper equivalente
  recommendations:
    - ❌ style="margin-top: 16px" → ✅ class="ft-helper-spacer-t-md"
    - ❌ style="padding: 20px" → ✅ class="ft-helper-spacer-inner-md"
    - Usa los helpers de spacer para mantener la escala del sistema

check: flex_helper_available
target: [inline_style OR custom_css_display]
rule: property == display:flex AND equivalent_helper_exists → issue
output:
  problem: Display flex custom cuando existe helper equivalente
  recommendations:
    - ❌ style="display: flex; align-items: center" → ✅ class="ft-helper-display-flex ft-helper-display-flex--middle"

check: custom_font_size
target: [inline_style OR custom_css_font_size]
rule: property == font-size AND equivalent_helper_exists → issue
output:
  problem: font-size custom cuando existe helper tipográfico equivalente
  recommendations:
    - Usa ft-helper-fontSize-heading-[M|L|XL] para headings
    - Usa ft-helper-fontSize-body-[M|S|XS] para textos de body
```

### Combinación de helpers
```
check: helper_combination_logic
target: [element_with_helpers]
rule: has_ft-helper-display-flex AND has_ft-helper-display-flex--[variant] AND
      variant incompatible_with_another_variant → issue
output:
  problem: Helpers de display en conflicto
  recommendations:
    - --middle y --end pueden coexistir (align-items + justify-content)
    - --column y --middle coexisten (dirección column + centrado en eje cruzado)
    - --between y --middle coexisten
    - Verifica que la combinación tiene el efecto visual esperado
```

### Escala de tamaños
```
check: spacer_arbitrary_value
target: [custom_margin_or_padding]
rule: value NOT IN design_scale AND no_justified_exception → issue
output:
  problem: Valor de espaciado fuera de la escala del DS
  recommendations:
    - Ajusta al valor más cercano de la escala: xxs, xs, sm, md, lg, xlg, xxlg
    - Si el diseño requiere un valor exacto fuera de la escala, documenta la excepción
```

---

## checklist
- [ ] ¿Se usan `ft-helper-spacer-*` para márgenes y paddings en lugar de CSS custom?
- [ ] ¿Se usan `ft-helper-display-flex*` para layouts flex?
- [ ] ¿Se usan `ft-helper-fontSize-*` para tamaños tipográficos?
- [ ] ¿Se usan `ft-helper-fontColor-*` para colores de texto del sistema?
- [ ] ¿Se usan `ft-helper-bgColor-*` para fondos del sistema?
- [ ] ¿No hay valores de espaciado arbitrarios fuera de la escala del DS?
