# Storybook Controls y Args

## meta
- domain: storybook-controls-args
- source: "Storybook Docs — Controls (https://storybook.js.org/docs/essentials/controls) · Controls doc block"
- goal: exponer la API del componente como estado editable, claro y mínimo
- agent_tags: [storybook, ds]

---

## concepts

### Args
Los `args` representan **propiedades editables** del componente. Permiten reutilizar la misma story con distintos estados sin reescribir el render.

### Controls
Los controls renderizan los `args` como inputs interactivos en el canvas y en docs, dejando que cualquiera manipule el componente desde la UI.

### ArgTypes
Los `argTypes` afinan cada arg:
- Tipan mejor la interfaz pública.
- Definen qué props aparecen como control.
- Ajustan el tipo de control (texto, select, boolean, color…).
- Documentan los valores posibles.

### Principio de exposición
La superficie de controls debe reflejar la **API pública** del componente: solo props que un consumidor cambiaría. Las props internas o técnicas se ocultan.

---

## rules

### Surface
```
check: relevant_controls_only
target: [argTypes]
rule: exposes_internal_or_technical_prop → issue
output:
  problem: Props internas o técnicas expuestas como control
  recommendations:
    - Excluye del control las props que un consumidor no debería editar
    - Usa argTypes para ocultar (control:false) lo que es de implementación

check: control_clarity
target: [argTypes]
rule: control_count_high OR ambiguous_control_type → warning
output:
  problem: Demasiados controles o tipos de control poco claros
  recommendations:
    - Mantén pocos controles y bien elegidos
    - Asigna el tipo de control correcto y documenta los valores posibles
```

---

## checklist
- [ ] ¿Los controls reflejan solo la API pública del componente?
- [ ] ¿Las props internas/técnicas están excluidas del control?
- [ ] ¿El tipo de control de cada arg es el adecuado?
- [ ] ¿El número de controles es bajo y comprensible?
- [ ] ¿Los `args` permiten reutilizar la story en varios estados?
