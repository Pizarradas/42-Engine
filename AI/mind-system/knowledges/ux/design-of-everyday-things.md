# The Design of Everyday Things (Norman)

## meta
- domain: interaction-design
- source: "The Design of Everyday Things — Don Norman"
- goal: evaluar affordances, signifiers, mapeo natural y feedback
- agent_tags: [ux, audit, ui]

---

## concepts

### Affordance
Acción posible con un elemento de la interfaz.
- Click, arrastre, escritura, deslizamiento, expansión.
- La affordance existe independientemente de si el usuario la percibe.

### Signifier
Señal visual que indica que una acción es posible.
- Forma de botón, sombra, borde, icono, cursor, placeholder, animación sutil.
- Sin signifier adecuado, la affordance es invisible para el usuario.

### Mapeo natural
Relación intuitiva entre controles y sus efectos.
- Flecha derecha → avanzar. Flecha izquierda → retroceder.
- Slider hacia arriba → aumentar valor.
- Un mapeo antinatural genera errores constantes.

### Feedback
El sistema debe responder de forma visible a cada acción relevante.
- Tipos: cambios de estado, loaders, mensajes de confirmación, animaciones.
- Sin feedback, el usuario pierde el control percibido.

### Estados distinguibles
Cada estado de un componente interactivo debe ser visualmente diferente.
- Normal, hover, activo, foco, deshabilitado, error.
- Un estado deshabilitado que apenas se diferencia del activo genera intentos fallidos.

---

## rules

### Affordance & Signifier
```
check: interactive_looks_interactive
target: [button, link, icon_button, input]
rule: is_interactive == true AND visual_signifiers_strength < threshold → issue
output:
  concept: AffordanceSignifier
  problem: Elemento interactivo no parece interactivo
  recommendations:
    - Añade estilo de botón (color, borde, relieve, estado hover)

check: non_interactive_looks_interactive
target: [text, decorative_element]
rule: is_interactive == false AND looks_like_button_or_link → issue
output:
  concept: AffordanceSignifier
  problem: Elemento estático parece interactivo
  recommendations:
    - Elimina estilos que simulen interactividad en elementos estáticos
```

### Mapping
```
check: directional_controls
target: [navigation_control, carousel_control, stepper]
rule: action_direction != icon_direction → issue
output:
  concept: Mapping
  problem: Dirección del control no coincide con el resultado
  recommendations:
    - Alinea icono y comportamiento (flecha derecha → avanzar)

check: spatial_mapping
target: [grouped_controls]
rule: control_position_unrelated_to_affected_element → issue
output:
  concept: Mapping
  problem: Control desconectado espacialmente del elemento que afecta
  recommendations:
    - Ubica el control cerca del elemento que modifica
```

### Feedback
```
check: action_feedback
target: [action]
rule: time_to_visible_feedback > 0.5s → issue
output:
  concept: Feedback
  problem: Acción sin feedback inmediato
  recommendations:
    - Añade indicador de carga o cambio de estado visible

check: error_feedback_clarity
target: [error_state]
rule: feedback_unclear OR only_generic_error → issue
output:
  concept: Feedback
  problem: Feedback de error poco claro
  recommendations:
    - Especifica causa y próximo paso en el mensaje de error
```

### States
```
check: distinguishable_states
target: [button, input, toggle]
rule: visual_difference(normal, hover, active, disabled) < threshold → issue
output:
  concept: States
  problem: Estados poco distinguibles
  recommendations:
    - Aumenta diferencias de color, borde o iconografía entre estados
    - El estado deshabilitado debe ser claramente no interactivo
```

---

## checklist
- [ ] ¿Es obvia la interacción permitida en cada elemento?
- [ ] ¿El aspecto del control comunica correctamente la acción posible?
- [ ] ¿Los estados (normal, hover, activo, deshabilitado) son visiblemente distintos?
- [ ] ¿La dirección de los controles de navegación es consistente con el resultado?
- [ ] ¿Los controles están ubicados cerca del elemento que afectan?
- [ ] ¿Hay feedback inmediato y claro tras cada acción relevante?
