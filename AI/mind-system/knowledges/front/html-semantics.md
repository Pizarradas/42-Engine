# HTML Semántico

## meta
- domain: html-semantics
- source: "HTML Living Standard — WHATWG · MDN Web Docs · WAI-ARIA Authoring Practices"
- goal: construir documentos HTML con estructura semántica correcta, accesible y parseable
- agent_tags: [front, audit, 42ds]

---

## concepts

### Semántica vs presentación
El HTML describe *qué es* el contenido, no *cómo se ve*. La presentación es responsabilidad del CSS.
- `<button>` no es un `<div>` estilizado — tiene comportamiento nativo: foco, teclado, ARIA implícito.
- `<h1>`–`<h6>` no son tamaños de texto — son niveles de jerarquía de documento.

### Landmarks y regiones
Los landmarks son puntos de navegación para lectores de pantalla. Un documento bien estructurado tiene:
- Un `<main>` único por página.
- `<header>` y `<footer>` en `<body>` (globales) o dentro de sectioning elements (locales).
- `<nav>` para grupos de navegación principal; múltiples `<nav>` deben tener `aria-label` diferenciador.
- `<aside>` para contenido tangencial al principal.

### Jerarquía de headings
Los headings son el esquema del documento. Una jerarquía correcta:
- Empieza siempre en `<h1>` — uno por página.
- No salta niveles: de `<h2>` se pasa a `<h3>`, nunca a `<h4>` directamente.
- El nivel lo determina la estructura lógica, no el tamaño visual (eso lo controla CSS).

### Elementos interactivos nativos
Los elementos nativos tienen accesibilidad incorporada que los custom no tienen sin trabajo extra:
- `<button>` — focusable, activable con Enter/Space, role="button" implícito.
- `<a href>` — focusable, activable con Enter, role="link" implícito.
- `<input>`, `<select>`, `<textarea>` — roles y estados gestionados por el navegador.

### Interactive content model
Elementos interactivos no pueden anidarse: `<a>` dentro de `<a>`, `<button>` dentro de `<button>` o `<a>` son inválidos y producen comportamiento imprevisible.

---

## rules

### Document structure
```
check: main_landmark_unique
target: [document]
rule: count(<main>) != 1 → issue
output:
  problem: Documento sin <main> o con más de uno
  recommendations:
    - Incluye exactamente un <main> por página con el contenido principal
    - El nav, header y footer van fuera de <main>

check: heading_h1_unique
target: [document]
rule: count(<h1>) != 1 → issue
output:
  problem: Página sin h1 o con múltiples h1
  recommendations:
    - Un solo <h1> por página, con el título principal del contenido

check: heading_no_skip
target: [headings_sequence]
rule: level_jump > 1 → issue
output:
  problem: Salto de nivel en headings (ej: h2 → h4)
  recommendations:
    - Sigue la secuencia lógica: h1 → h2 → h3, sin saltos
    - El tamaño visual se ajusta con CSS, no cambiando el nivel del heading
```

### Interactive elements
```
check: button_vs_div
target: [clickable_element]
rule: element == div|span AND has_onclick → issue
output:
  problem: Elemento clicable no nativo
  recommendations:
    - Usa <button> para acciones, <a href> para navegación
    - Si es imprescindible usar div: añade role="button", tabindex="0" y keyboard handler

check: interactive_nesting
target: [interactive_element]
rule: <a> contains <button> OR <button> contains <a> → issue
output:
  problem: Elementos interactivos anidados
  recommendations:
    - No anidar <a> dentro de <a> ni <button> dentro de elementos interactivos
    - Reestructura el markup para que sean hermanos, no padres/hijos

check: empty_interactive
target: [button, a]
rule: no_text_content AND no_aria_label AND no_aria_labelledby → issue
output:
  problem: Elemento interactivo sin nombre accesible
  recommendations:
    - Añade texto visible, aria-label o aria-labelledby
    - Iconos solos requieren aria-label o <span class="sr-only">texto</span>
```

### Landmarks
```
check: nav_multiple_labels
target: [nav]
rule: count(<nav>) > 1 AND any_nav.no_aria_label → issue
output:
  problem: Múltiples <nav> sin diferenciación
  recommendations:
    - Añade aria-label="Principal" / aria-label="Breadcrumb" / aria-label="Footer" a cada <nav>

check: landmark_usage
target: [document]
rule: uses_div_for_header|footer|main|nav|aside|section → warning
output:
  problem: Uso de <div> donde existe un elemento semántico equivalente
  recommendations:
    - <div class="header"> → <header>
    - <div class="nav"> → <nav>
    - <div class="content"> → <main>
```

### Images
```
check: img_alt_present
target: [img]
rule: no_alt_attribute → issue
output:
  problem: Imagen sin atributo alt
  recommendations:
    - Imágenes informativas: alt descriptivo del contenido o función
    - Imágenes decorativas: alt="" (vacío, no ausente)

check: img_alt_quality
target: [img]
rule: alt == "image" OR alt == "foto" OR alt == filename → issue
output:
  problem: Alt genérico o de baja calidad
  recommendations:
    - Describe el contenido o función de la imagen, no su naturaleza
    - ❌ alt="foto de persona" → ✅ alt="María García, directora de producto"
```

---

## checklist
- [ ] ¿Un solo `<main>` por página?
- [ ] ¿Un solo `<h1>`, sin saltos en la jerarquía?
- [ ] ¿Las acciones usan `<button>` y la navegación `<a href>`?
- [ ] ¿No hay elementos interactivos anidados?
- [ ] ¿Todos los interactivos tienen nombre accesible (texto, aria-label)?
- [ ] ¿Los `<nav>` múltiples tienen `aria-label` diferenciador?
- [ ] ¿Todas las imágenes tienen `alt` (vacío si son decorativas)?
