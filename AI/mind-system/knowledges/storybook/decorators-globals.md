# Storybook Decorators y Globals

## meta
- domain: storybook-decorators-globals
- source: "Storybook Docs — Decorators (https://storybook.js.org/docs/writing-stories/decorators)"
- goal: aportar contexto, layout y comportamiento común a las stories sin repetir wrappers
- agent_tags: [storybook, front]

---

## concepts

### Decorators
Un decorator **envuelve** una story con markup o contexto adicional. Usos típicos:
- Añadir padding o layout de encuadre.
- Proveer un theme.
- Mockear contexto (providers, router, store).
- Inyectar datos simulados.

### Ámbitos del decorator
- **Global**: en `.storybook/preview.ts` — aplica a todas las stories.
- **Componente**: en el `meta` — aplica a las stories de ese componente.
- **Story**: en una story concreta — aplica solo a ese estado.

Regla de ámbito: el contexto se declara en el nivel **más alto** en que aplica, no se repite en niveles inferiores.

### Globals
Los `globals` permiten cambiar valores transversales desde la toolbar de la UI (idioma, tema, densidad…). Se combinan con decorators que leen ese valor para re-renderizar.

---

## rules

### Scope
```
check: decorator_scope
target: [decorator]
rule: global_context_declared_per_story OR per_story_context_declared_globally → issue
output:
  problem: Decorator en un ámbito incorrecto
  recommendations:
    - Declara el contexto en el nivel más alto en que aplica (global → meta → story)
    - No repitas el mismo wrapper en cada story; súbelo a preview.ts o al meta

check: wrapper_repetition
target: [stories]
rule: same_wrapper_markup_repeated_across_stories → warning
output:
  problem: Mismo wrapper repetido en varias stories
  recommendations:
    - Extrae el wrapper a un decorator de componente o global
    - Reserva decorators de story para contexto exclusivo de ese estado
```

### Globals
```
check: globals_with_decorator
target: [global_value]
rule: global_defined AND no_decorator_consumes_it → warning
output:
  problem: Global definido sin decorator que lo aplique al render
  recommendations:
    - Conecta el global con un decorator que lo lea (theme, idioma…)
    - Un global sin efecto en el render confunde al usuario de la toolbar
```

---

## checklist
- [ ] ¿El contexto transversal se resuelve con decorators y no con wrappers repetidos?
- [ ] ¿Cada decorator está en el ámbito correcto (global / componente / story)?
- [ ] ¿Los decorators globales viven en `preview.ts`?
- [ ] ¿Cada global tiene un decorator que lo aplica al render?
