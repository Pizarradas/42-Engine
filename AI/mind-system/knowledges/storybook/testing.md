# Storybook Testing

## meta
- domain: storybook-testing
- source: "Storybook Docs — How to test UIs · Vitest addon (https://storybook.js.org/docs/writing-tests)"
- goal: usar las stories como casos de prueba reutilizables de UI
- agent_tags: [storybook, audit, front]

---

## concepts

### Tipos de test
- **Render test**: comprueba que la story renderiza sin errores.
- **Interaction test**: usa `play` para simular acciones del usuario y aserciones.
- **Accessibility test**: valida accesibilidad sobre el render de la story.
- **Visual test**: compara capturas contra una baseline.
- **Snapshot test**: compara el markup renderizado.

### Principio: story = caso de prueba
Cada story es un estado fijo y reproducible; por eso sirve directamente como caso de prueba sin reescribir el setup.

### Flujo recomendado
1. Crear stories que representen los estados críticos.
2. Añadir `play` en las interacciones importantes.
3. Ejecutar los tests en local y en CI.
4. Tratar cada fallo como un **estado faltante** o mal modelado.

---

## rules

### Coverage
```
check: critical_states_as_stories
target: [component]
rule: critical_state_untested_because_no_story → issue
output:
  problem: Estado crítico sin story y, por tanto, sin test
  recommendations:
    - Modela el estado como story para que entre en el pipeline de test
    - Prioriza loading, error, empty y estados de interacción

check: interaction_coverage
target: [interactive_component]
rule: has_user_interaction AND no_play_function → warning
output:
  problem: Componente interactivo sin interaction test
  recommendations:
    - Añade una función play que simule la interacción clave
    - Verifica el resultado con aserciones dentro de play
```

### CI
```
check: tests_in_ci
target: [storybook_project]
rule: stories_used_as_tests AND not_run_in_ci → warning
output:
  problem: Stories usadas como tests pero no ejecutadas en CI
  recommendations:
    - Integra el runner/addon de test en el pipeline
    - Ejecuta render, interaction y a11y de forma automatizada
```

---

## checklist
- [ ] ¿Los estados críticos están modelados como stories?
- [ ] ¿Los componentes interactivos tienen función `play`?
- [ ] ¿Se cubren render, interacción y accesibilidad?
- [ ] ¿Los tests corren en local y en CI?
- [ ] ¿Cada fallo se interpreta como un estado faltante o mal definido?
