# Performance Web

## meta
- domain: web-performance
- source: "web.dev — Core Web Vitals · Chrome DevTools · MDN Web Docs · Lighthouse"
- goal: construir páginas rápidas con buenas métricas de experiencia de usuario
- agent_tags: [front, audit]

---

## concepts

### Core Web Vitals
Las tres métricas de rendimiento centradas en el usuario que Google considera críticas:

**LCP — Largest Contentful Paint** (< 2.5s)
Mide cuándo el elemento de contenido más grande del viewport es visible. Suele ser una imagen hero, un heading principal o un bloque de texto grande.

**CLS — Cumulative Layout Shift** (< 0.1)
Mide la inestabilidad visual: cuánto se mueven los elementos mientras carga la página. Causa principal: imágenes sin dimensiones declaradas, fuentes que cambian el layout al cargar (FOUT).

**INP — Interaction to Next Paint** (< 200ms)
Mide la capacidad de respuesta a interacciones del usuario (clicks, taps, teclado). Sustituyó a FID en 2024. Un INP alto indica JavaScript bloqueante o tareas largas en el hilo principal.

### Critical Rendering Path
El navegador renderiza en este orden:
1. Parse HTML → DOM
2. Parse CSS → CSSOM
3. DOM + CSSOM → Render Tree
4. Layout → Paint → Composite

El CSS bloquea el renderizado: el navegador no pinta nada hasta que procesa todo el CSS en `<head>`. El JavaScript (sin `async`/`defer`) bloquea el parser HTML.

### Resource loading strategies
- **`defer`**: el script se descarga en paralelo y se ejecuta después del HTML parseado. Para scripts no críticos.
- **`async`**: el script se descarga en paralelo y se ejecuta en cuanto está listo (puede interrumpir el parse). Para scripts independientes (analytics, ads).
- **`preload`**: indica al navegador que descargue un recurso crítico antes de que lo necesite (`<link rel="preload">`).
- **`lazy`**: difiere la carga de imágenes y iframes hasta que están cerca del viewport.

### Fuentes web
Las fuentes son uno de los mayores causantes de layout shift y render blocking:
- `font-display: swap` — muestra el texto con fuente del sistema mientras carga la web font (evita texto invisible).
- `preconnect` al servidor de fuentes — reduce la latencia de la primera conexión.
- Subsets de caracteres — cargar solo los caracteres necesarios reduce el tamaño del archivo.

---

## rules

### LCP
```
check: lcp_image_preloaded
target: [lcp_element]
rule: is_image AND no_preload_hint → issue
output:
  problem: Imagen LCP sin preload
  recommendations:
    - Añade <link rel="preload" as="image" href="[lcp-image]"> en el <head>
    - No apliques loading="lazy" a la imagen LCP

check: lcp_render_blocking_css
target: [stylesheet]
rule: non_critical_css AND render_blocking → issue
output:
  problem: CSS no crítico bloqueando el renderizado
  recommendations:
    - Inline el CSS crítico (above-the-fold) en el <head>
    - Carga el CSS no crítico de forma asíncrona o con media="print" + onload swap
```

### CLS
```
check: image_dimensions
target: [img, video]
rule: no_width AND no_height AND no_aspect_ratio → issue
output:
  problem: Elemento multimedia sin dimensiones declaradas — causa layout shift
  recommendations:
    - Añade width y height en HTML o usa aspect-ratio en CSS
    - Ejemplo CSS: .image-container { aspect-ratio: 16 / 9; }

check: dynamic_content_insertion
target: [dynamic_content]
rule: inserted_above_existing_content AND no_reserved_space → issue
output:
  problem: Contenido dinámico insertado desplaza el layout
  recommendations:
    - Reserva espacio para banners, ads y contenido dinámico antes de que carguen
    - Usa min-height o skeleton screens
```

### INP
```
check: long_tasks
target: [javascript]
rule: task_duration > 50ms → issue
output:
  problem: Tarea JS larga bloqueando el hilo principal
  recommendations:
    - Divide tareas largas con setTimeout(fn, 0) o scheduler.postTask()
    - Mueve trabajo pesado a Web Workers

check: event_handler_complexity
target: [event_listener]
rule: handler_executes_heavy_computation_synchronously → issue
output:
  problem: Handler de evento con lógica pesada síncrona
  recommendations:
    - Usa debounce/throttle para eventos frecuentes (scroll, resize, input)
    - Aplaza el trabajo no visual con requestAnimationFrame o requestIdleCallback
```

### Resource loading
```
check: render_blocking_scripts
target: [script]
rule: in_head AND no_async AND no_defer AND no_type_module → issue
output:
  problem: Script en <head> sin async ni defer — bloquea el parser
  recommendations:
    - Añade defer a scripts que necesiten el DOM
    - Añade async a scripts independientes (analytics, ads)

check: font_display
target: [@font-face]
rule: no_font_display OR font_display == block → issue
output:
  problem: Fuente sin font-display — texto invisible durante la carga
  recommendations:
    - Añade font-display: swap para mostrar fallback mientras carga la fuente
    - font-display: optional si la fuente es puramente decorativa
```

---

## checklist
- [ ] ¿La imagen LCP tiene `preload` y no tiene `loading="lazy"`?
- [ ] ¿Todas las imágenes y vídeos tienen `width` y `height` declarados?
- [ ] ¿Los scripts están en el `<body>` o tienen `defer`/`async`?
- [ ] ¿El CSS crítico está inline o es lo único que bloquea?
- [ ] ¿Las fuentes tienen `font-display: swap`?
- [ ] ¿El espacio para contenido dinámico está reservado?
- [ ] ¿No hay tareas JS > 50ms en el hilo principal?
