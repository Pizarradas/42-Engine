# Lean UX + Métricas de UX

## meta
- domain: product-process-and-metrics
- source: "Lean UX — Jeff Gothelf" + "Measuring the User Experience — Tullis & Albert"
- goal: conectar hallazgos de UX con hipótesis, experimentos y métricas medibles
- agent_tags: [ux, flow, audit]

---

## concepts

### Hipótesis Lean UX
Los cambios de diseño deben partir de hipótesis explícitas, no de suposiciones.
- Formato: "Creemos que [este cambio] resultará en [este impacto] para [este usuario]. Sabremos que funciona cuando veamos [esta métrica] cambiar."
- Sin hipótesis, no hay forma de validar si el cambio fue correcto.

### Experimentos
Cuando hay múltiples opciones de solución, el experimento es preferible a la opinión.
- El test A/B es la herramienta más directa para comparar dos variantes.
- Requiere definir: duración, segmento de usuarios y métrica principal.

### UX Outcomes (resultados medibles)
Los cambios de diseño deben vincularse a resultados concretos, no a entregables.
- Ejemplos: mejorar tasa de éxito de tarea, reducir tiempo en tarea, reducir errores, aumentar retención, aumentar satisfacción.

### Métricas de UX
| Métrica | Qué mide |
|---|---|
| Task Success Rate | % de usuarios que completan la tarea |
| Time on Task | Tiempo promedio para completar la tarea |
| Error Rate | Frecuencia de errores por tarea |
| Completion Rate | % de usuarios que completan un flujo completo |
| SUS (System Usability Scale) | Percepción global de usabilidad (0–100) |
| CSAT | Satisfacción puntual con una interacción |
| NPS | Probabilidad de recomendación del producto |

---

## rules

### Hypotheses
```
check: missing_hypothesis
target: [proposal, design_change]
rule: no_explicit_hypothesis → notice
output:
  concept: hypotheses
  problem: Cambio de diseño sin hipótesis explícita
  recommendations:
    - Formula hipótesis con: usuario objetivo, cambio esperado, métrica de validación
```

### Experiments
```
check: opportunity_for_experiment
target: [high_impact_issue]
rule: fix_has_multiple_options → suggestion
output:
  concept: experiments
  problem: Hay varias opciones de solución — candidato a experimento
  recommendations:
    - Plantea test A/B para comparar variantes
    - Define duración, segmento y métrica principal antes de lanzar
```

### Metrics Mapping
```
issue_type: navegación confusa
→ metrics: [task_success_rate, time_on_task, error_rate]

issue_type: flujos largos o complejos
→ metrics: [completion_rate, dropoff_rate_por_paso]

issue_type: percepción general de usabilidad
→ metrics: [SUS, CSAT]

issue_type: impacto global en producto
→ metrics: [NPS, retention]
```

---

## checklist
- [ ] ¿El cambio de diseño tiene una hipótesis explícita?
- [ ] ¿Se ha definido la métrica que confirmará si funciona?
- [ ] ¿Hay múltiples opciones de solución que ameriten un experimento?
- [ ] ¿El hallazgo de UX está vinculado a un resultado medible?
- [ ] ¿Se usa la métrica correcta para el tipo de problema detectado?
