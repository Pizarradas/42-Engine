# Responsive Design

## meta
- domain: responsive-design
- source: "MDN Web Docs · web.dev — Responsive Design · CSS Grid & Flexbox specs"
- goal: construir interfaces que se adapten correctamente a cualquier tamaño de pantalla
- agent_tags: [front, poc, 42ds]

---

## concepts

### Mobile-first
El enfoque correcto es diseñar y codificar primero para el contexto más restrictivo (móvil), añadiendo complejidad progresivamente para pantallas mayores mediante `min-width`.
- Los estilos base aplican a todos los tamaños.
- Los overrides con `min-width` añaden o modifican solo lo necesario para pantallas más grandes.
- Resultado: CSS más limpio, menor especificidad, mejor rendimiento en móvil.

### Unidades relativas
Las unidades fijas (`px`) bloquean la adaptación. Las relativas se adaptan al contexto:
- `%` — relativo al contenedor padre.
- `em` — relativo al `font-size` del elemento actual.
- `rem` — relativo al `font-size` del `:root` (16px por defecto). Preferible para tipografía.
- `vw / vh` — relativo al viewport. Útil para layouts full-screen.
- `clamp(min, ideal, max)` — fluido con límites: `clamp(1rem, 2.5vw, 1.5rem)`.

### Flexbox vs Grid
- **Flexbox**: distribución en **una dimensión** (fila o columna). Ideal para componentes internos, barras de navegación, grupos de botones.
- **Grid**: distribución en **dos dimensiones** (filas y columnas). Ideal para layouts de página, rejillas de cards.
- No son excluyentes: un grid puede contener elementos flex y viceversa.

### Breakpoints semánticos
Los breakpoints se definen según el contenido, no los dispositivos. Un breakpoint correcto es donde el layout "se rompe" visualmente, no donde hay un dispositivo popular.
- Pocos breakpoints son mejor que muchos: 3–4 suelen ser suficientes.
- Los rangos comunes: ~600px (phablet), ~800px (tablet), ~1024px (laptop), ~1200px (desktop).

### Imágenes responsivas
- `max-width: 100%` evita que las imágenes desborden el contenedor.
- `width` y `height` en el HTML previenen el layout shift (CLS).
- `loading="lazy"` para imágenes fuera del viewport inicial.
- `srcset` y `sizes` para servir el tamaño correcto según la pantalla.

---

## rules

### Units
```
check: px_for_font_size
target: [font-size_declaration]
rule: value_unit == px AND context != override_user_preferences → issue
output:
  problem: font-size en px bloquea la preferencia de tamaño del usuario
  recommendations:
    - Usa rem para font-size: 1rem = 16px por defecto, escala con preferencias del usuario

check: fixed_container_width
target: [container_element]
rule: width == Npx AND NOT max-width → issue
output:
  problem: Contenedor con ancho fijo sin max-width
  recommendations:
    - Usa max-width: Npx + width: 100% para contenedores adaptables
```

### Layout
```
check: mobile_first_approach
target: [stylesheet]
rule: max_width_queries > min_width_queries → warning
output:
  problem: Enfoque desktop-first detectado (mayoría de queries son max-width)
  recommendations:
    - Invierte el enfoque: estilos base para móvil, min-width para pantallas mayores

check: overflow_horizontal
target: [page]
rule: horizontal_scroll_exists → issue
output:
  problem: Scroll horizontal no intencionado
  recommendations:
    - Comprueba elementos con width fija mayor que el viewport
    - Añade overflow-x: hidden en el body solo como último recurso (enmascara el problema)
    - Busca el elemento causante con overflow-x: scroll temporal en contenedores
```

### Images
```
check: image_dimensions_in_html
target: [img]
rule: no_width_attribute OR no_height_attribute → warning
output:
  problem: Imagen sin width/height declarados en HTML
  recommendations:
    - Añade width y height reales en el HTML para prevenir layout shift (CLS)
    - El CSS puede sobrescribir los valores; el HTML sirve para reservar espacio

check: image_max_width
target: [img]
rule: max-width != 100% AND container_width_unknown → issue
output:
  problem: Imagen puede desbordar su contenedor
  recommendations:
    - Aplica img { max-width: 100%; height: auto } como base global

check: lazy_loading
target: [img]
rule: below_fold == true AND loading != "lazy" → warning
output:
  problem: Imagen fuera del viewport inicial sin lazy loading
  recommendations:
    - Añade loading="lazy" a imágenes que no están en el viewport al cargar
    - NO aplicar a la imagen LCP (above the fold)
```

### Breakpoints
```
check: too_many_breakpoints
target: [stylesheet]
rule: unique_breakpoints > 6 → warning
output:
  problem: Exceso de breakpoints
  recommendations:
    - Consolida breakpoints: 3–4 son suficientes para la mayoría de proyectos
    - Define los breakpoints como custom properties o variables SCSS y reutilízalos

check: content_driven_breakpoints
target: [breakpoint]
rule: breakpoint_value matches_device_resolution_exactly → notice
output:
  problem: Breakpoint definido por dispositivo, no por contenido
  recommendations:
    - Los breakpoints deben ser donde el layout se rompe, no donde hay un dispositivo popular
```

---

## checklist
- [ ] ¿El `font-size` base usa `rem`, no `px`?
- [ ] ¿Los contenedores usan `max-width` + `width: 100%`?
- [ ] ¿Las media queries son predominantemente `min-width`?
- [ ] ¿Las imágenes tienen `width` y `height` declarados en HTML?
- [ ] ¿Las imágenes debajo del fold tienen `loading="lazy"`?
- [ ] ¿No hay scroll horizontal no intencionado?
- [ ] ¿Menos de 6 breakpoints únicos?
