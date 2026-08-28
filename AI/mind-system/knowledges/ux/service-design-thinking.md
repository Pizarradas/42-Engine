# Service Design Thinking

## meta
- domain: service-design
- source: "This Is Service Design Thinking/Doing"
- goal: evaluar experiencias end-to-end más allá de la pantalla
- agent_tags: [ux, flow, audit]

---

## concepts

### Service Blueprint
Mapa de todos los componentes del servicio: acciones del usuario, touchpoints, procesos internos (frontstage y backstage) y sistemas de soporte.
- La UI es solo una parte del servicio. Lo que ocurre antes y después también impacta la experiencia.
- Los pasos fuera de la pantalla (emails, soporte, procesos internos) deben diseñarse con la misma intención.

### Touchpoints
Cada punto de contacto entre el usuario y el servicio.
- Web, app, email transaccional, notificación push, soporte humano, factura.
- La inconsistencia entre touchpoints rompe la confianza.

### Frontstage / Backstage
- **Frontstage**: lo que el usuario ve y experimenta.
- **Backstage**: procesos internos, sistemas, equipos que hacen posible el servicio.
- Las limitaciones del backstage que afectan al usuario deben gestionarse desde el diseño, no ignorarse.

### Consistencia entre canales
El usuario percibe el servicio como un todo. Si el tono, los mensajes o las promesas difieren entre canales, la experiencia se fragmenta.

---

## rules

### Service Blueprint
```
check: missing_steps_outside_ui
target: [journey]
rule: critical_steps_offscreen_ignored → issue
output:
  concept: service_blueprint
  problem: La experiencia considera solo la UI, ignorando pasos previos y posteriores
  recommendations:
    - Identifica pasos previos y posteriores (emails, soporte, procesos internos)
    - Alinea esos pasos con la experiencia en la UI
```

### Touchpoints
```
check: touchpoint_consistency
target: [email, web, app, support]
rule: messaging_or_brand_inconsistent → issue
output:
  concept: touchpoints
  problem: Inconsistencia entre puntos de contacto
  recommendations:
    - Unifica tono, mensajes clave y promesas entre canales
```

### Frontstage / Backstage
```
check: backend_constraints_visibility
target: [flow]
rule: backend_limitations_affect_user AND no_explanation_or_mitigation → issue
output:
  concept: frontstage_backstage
  problem: Limitaciones internas impactan la experiencia sin gestionarse
  recommendations:
    - Diseña mensajes y alternativas que amortigüen los límites técnicos u operativos
    - No traslades la fricción interna directamente al usuario
```

---

## checklist
- [ ] ¿La experiencia contempla lo que ocurre antes y después de la UI?
- [ ] ¿El tono y los mensajes son coherentes entre canales (web, email, app, soporte)?
- [ ] ¿Las restricciones técnicas u operativas tienen gestión desde el diseño?
- [ ] ¿Los emails transaccionales están alineados con la experiencia en producto?
