# Strategic Writing for UX (Podmajersky)

## meta
- domain: ux-writing
- source: "Strategic Writing for UX — Torrey Podmajersky"
- goal: evaluar y mejorar microcopy y textos de interfaz
- agent_tags: [ux, copy, audit]

---

## concepts

### Los 4 ejes del copy UX
Todo texto de interfaz debe evaluarse según:
1. **Propósito** — ¿Sirve a una tarea del usuario o del negocio?
2. **Conciso** — ¿Usa las mínimas palabras necesarias?
3. **Conversacional** — ¿Habla como una persona, no como un sistema?
4. **Orientado a la acción** — ¿Guía al usuario hacia el siguiente paso?

### Botones
El texto de un botón debe describir el resultado de la acción, no la acción genérica.
- ✅ "Guardar cambios", "Crear cuenta", "Descargar informe"
- ❌ "OK", "Aceptar", "Hecho", "Aquí", "Click aquí"

### Mensajes de error
Un error útil responde siempre dos preguntas:
1. ¿Qué pasó?
2. ¿Qué puede hacer el usuario ahora?

### Estados vacíos
Un empty state debe explicar beneficio antes de pedir acción.
- ❌ "No tienes proyectos"
- ✅ "Crea tu primer proyecto para organizar tu trabajo"

### Títulos y subtítulos
Un buen título responde: "¿Qué puedo hacer aquí?"
- Deben ser escaneables y directos.
- El subtítulo añade contexto de beneficio, no de descripción técnica.

---

## rules

### Purpose
```
check: text_has_clear_task
target: [heading, body_text, helper_text]
rule: no_detectable_user_task AND no_business_goal → issue
output:
  dimension: Purpose
  problem: Texto sin propósito claro
  recommendations:
    - Reescribe alineando con la tarea del usuario
    - Elimina texto decorativo que no ayude a avanzar
```

### Concise
```
check: overlong_sentences
target: [sentence]
rule: word_count > 25 → issue
output:
  dimension: Concise
  problem: Frase demasiado larga
  recommendations:
    - Divide en dos oraciones más cortas
    - Elimina palabras de relleno ("muy", "bastante", "en realidad")

check: redundant_phrases
target: [text_block]
rule: repeated_information_detected → issue
output:
  dimension: Concise
  problem: Información repetida innecesariamente
  recommendations:
    - Elimina la repetición o fusiona en una sola frase
```

### Conversational
```
check: jargon
target: [text_block]
rule: technical_terms_density_high AND audience != expert → issue
output:
  dimension: Conversational
  problem: Lenguaje técnico para audiencia no experta
  recommendations:
    - Sustituye jerga por palabras de uso común

check: person_address
target: [text_block]
rule: no_second_person_pronouns AND context == b2c → warning
output:
  dimension: Conversational
  problem: Texto sin interpelación directa al usuario
  recommendations:
    - Usa segunda persona ("tú", "tu cuenta", "tus datos")
```

### ActionOriented
```
check: button_labels
target: [button]
rule: label in [OK, Aceptar, Hecho, Sí, No, Aquí, Click aquí] AND no_additional_context → issue
output:
  dimension: ActionOriented
  problem: Texto de botón genérico
  recommendations:
    - Usa verbo + objeto ("Guardar cambios", "Crear cuenta")

check: error_messages
target: [error_message]
rule: no_explanation OR no_next_step → issue
output:
  dimension: ActionOriented
  problem: Mensaje de error sin causa ni solución
  recommendations:
    - Explica qué pasó y qué puede hacer el usuario ahora
```

---

## checklist

**Botones**
- [ ] ¿Empieza con un verbo?
- [ ] ¿Describe el resultado de la acción?
- [ ] ¿Hay dos botones con copy demasiado similar?

**Errores**
- [ ] ¿Indica qué pasó?
- [ ] ¿Indica al menos un próximo paso?

**Títulos**
- [ ] ¿Responden a "¿qué puedo hacer aquí?"?
- [ ] ¿Son escaneables y directos?

**Empty states**
- [ ] ¿Explican el beneficio antes de pedir acción?
- [ ] ¿Incluyen una llamada a la acción concreta?
