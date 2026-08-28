# JavaScript Patterns (Vanilla)

## meta
- domain: javascript-patterns
- source: "MDN Web Docs · WAI-ARIA Authoring Practices 1.2 · web.dev"
- goal: escribir JavaScript vanilla mantenible, accesible y con bajo acoplamiento
- agent_tags: [front, audit, 42ds]

---

## concepts

### Event delegation
En lugar de añadir listeners a cada elemento individual, se añade uno al contenedor común y se filtra por el target. Más eficiente con listas grandes y funciona con elementos añadidos dinámicamente.

```js
// ❌ Listener por elemento
document.querySelectorAll('.btn').forEach(btn => btn.addEventListener('click', handler));

// ✅ Delegación al contenedor
document.querySelector('.btn-group').addEventListener('click', (e) => {
  if (e.target.closest('.btn')) handler(e);
});
```

### DOM-ready vs window.load
- `DOMContentLoaded` — el HTML está parseado, el DOM está disponible. Suficiente para la mayoría de scripts.
- `window.load` — todo ha cargado (imágenes, iframes, CSS). Necesario solo si se depende de dimensiones de imágenes.

### ARIA dinámico
Los atributos ARIA deben reflejar el estado actual del componente en todo momento:
- `aria-expanded` — en toggles: `true` cuando está abierto, `false` cuando está cerrado.
- `aria-hidden` — en contenido colapsado: `true` cuando está oculto, eliminado cuando es visible.
- `aria-live` — en regiones que se actualizan dinámicamente: `polite` (no interrumpe) o `assertive` (interrumpe).
- `aria-disabled` — en elementos deshabilitados que deben permanecer focusables.

### Gestión de foco
El foco debe gestionarse programáticamente cuando el contenido cambia de forma no estándar:
- Al abrir un modal: mover el foco al primer elemento interactivo dentro.
- Al cerrar un modal: devolver el foco al elemento que lo abrió.
- En navegación SPA: mover el foco al heading de la nueva "página".

### Keyboard support
Los componentes custom deben replicar el comportamiento de teclado de sus equivalentes nativos:
- `Enter` / `Space` — activar botones y checkboxes.
- `Escape` — cerrar modales, dropdowns, tooltips.
- `Arrow keys` — navegar en menús, tabs, listboxes.
- `Tab` — navegación secuencial; `Shift+Tab` — navegación inversa.

---

## rules

### Event handling
```
check: event_listener_cleanup
target: [component_lifecycle]
rule: adds_event_listener AND no_removeEventListener_on_destroy → issue
output:
  problem: Event listener sin cleanup — memory leak potencial
  recommendations:
    - Guarda referencia a la función handler para poder removerla
    - Usa AbortController para limpiar múltiples listeners a la vez

check: passive_scroll_listeners
target: [scroll_event_listener]
rule: no_passive_option AND no_preventDefault_call → warning
output:
  problem: Listener de scroll sin passive: true — puede degradar el scroll
  recommendations:
    - Añade { passive: true } si el handler no llama preventDefault()
    - document.addEventListener('scroll', handler, { passive: true })
```

### Accessibility
```
check: aria_expanded_toggle
target: [toggle_component]
rule: toggles_visibility AND no_aria_expanded → issue
output:
  problem: Toggle sin aria-expanded
  recommendations:
    - Al abrir: element.setAttribute('aria-expanded', 'true')
    - Al cerrar: element.setAttribute('aria-expanded', 'false')

check: focus_management_modal
target: [modal]
rule: opens_modal AND no_focus_trap AND no_focus_move_to_modal → issue
output:
  problem: Modal sin gestión de foco
  recommendations:
    - Al abrir: mueve el foco al primer interactivo del modal o al modal en sí (tabindex="-1")
    - Implementa focus trap: Tab/Shift+Tab quedan dentro del modal mientras está abierto
    - Al cerrar: devuelve el foco al elemento que abrió el modal

check: keyboard_escape
target: [modal, dropdown, tooltip]
rule: no_escape_key_handler → issue
output:
  problem: Componente temporal sin soporte de Escape
  recommendations:
    - Añade listener de keydown que cierre el componente al pulsar Escape
    - document.addEventListener('keydown', e => { if (e.key === 'Escape') close() })
```

### DOM manipulation
```
check: innerHTML_with_user_data
target: [innerHTML_assignment]
rule: value contains user_input OR url_param → issue
output:
  problem: XSS potencial por innerHTML con datos externos
  recommendations:
    - Usa textContent para texto plano
    - Usa createElement + appendChild para HTML dinámico
    - Si innerHTML es necesario: sanitiza con DOMPurify

check: queryselector_in_loop
target: [loop_body]
rule: contains_querySelector OR contains_querySelectorAll → warning
output:
  problem: Query al DOM dentro de un loop — puede ser costoso
  recommendations:
    - Ejecuta el querySelector fuera del loop y guarda la referencia
    - Usa un DocumentFragment para operaciones masivas de DOM
```

### Module pattern
```
check: global_namespace_pollution
target: [javascript]
rule: assigns_to_window.X AND context != intentional_public_api → issue
output:
  problem: Variable o función asignada al scope global
  recommendations:
    - Envuelve el código en IIFE o usa módulos ES (type="module")
    - Si el acceso global es necesario: documenta el por qué y usa un namespace único
```

---

## checklist
- [ ] ¿Los event listeners de componentes se limpian al destruirlos?
- [ ] ¿Los listeners de scroll tienen `{ passive: true }` si no usan `preventDefault`?
- [ ] ¿Los toggles actualizan `aria-expanded` en cada cambio de estado?
- [ ] ¿Los modales gestionan el foco al abrir y al cerrar?
- [ ] ¿Los componentes temporales se cierran con `Escape`?
- [ ] ¿`innerHTML` nunca recibe datos del usuario sin sanitizar?
- [ ] ¿No hay `querySelector` dentro de loops?
- [ ] ¿Sin contaminación del scope global no intencionada?
