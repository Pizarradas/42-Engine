# Storybook MDX Docs

## meta
- domain: storybook-docs-mdx
- source: "Storybook Docs — How to document components · Doc blocks (https://storybook.js.org/docs/writing-docs)"
- goal: crear documentación viva separando narrativa y definición técnica
- agent_tags: [storybook, ds]

---

## concepts

### Doc blocks principales
- **`Meta`**: enlaza o ubica el documento respecto a un CSF.
- **`Story`**: inserta una story concreta en la página.
- **`Canvas`**: muestra la story renderizada con su chrome.
- **`Controls`**: rinde los controles dinámicos (ver `controls-args`).
- **`Description`**: explica el componente.
- **`ArgsTable`**: documenta la API a partir de `argTypes`.

### Tipos de docs
- **Attached docs**: ligados a un archivo CSF (documentan ese componente).
- **Unattached docs**: páginas independientes en la sidebar (guías, principios).

### Cuándo usar MDX
- Guías de uso de un componente.
- Patrones de composición entre componentes.
- Documentación editorial o de sistema.

### Separación narrativa / técnica
La narrativa (cómo y cuándo usar) se escribe en MDX; la definición técnica (estados, API) procede de las stories y `argTypes`. No se duplica la API a mano.

---

## rules

### Source of truth
```
check: docs_single_source
target: [mdx_doc]
rule: api_or_states_handwritten_instead_of_blocks → issue
output:
  problem: Documentación de API/estados escrita a mano en vez de generada por doc blocks
  recommendations:
    - Usa ArgsTable/Controls para la API y Story/Canvas para los estados
    - Reserva el texto MDX para narrativa, no para duplicar la definición técnica

check: narrative_vs_definition
target: [mdx_doc]
rule: mixes_long_narrative_inside_story_definition → warning
output:
  problem: Narrativa y definición técnica mezcladas
  recommendations:
    - Mantén la story como definición pura y la narrativa en bloques de texto
    - Separa "qué es" (técnico) de "cómo y cuándo usarlo" (editorial)
```

### Doc type
```
check: attached_vs_unattached
target: [mdx_doc]
rule: component_doc_unattached OR general_guide_attached_to_single_csf → warning
output:
  problem: Tipo de doc mal elegido
  recommendations:
    - Usa attached docs para documentar un componente concreto
    - Usa unattached docs para guías y principios transversales
```

---

## checklist
- [ ] ¿La API y los estados provienen de doc blocks, no escritos a mano?
- [ ] ¿La narrativa (cómo/cuándo) está separada de la definición técnica?
- [ ] ¿El doc es attached si documenta un componente y unattached si es una guía?
- [ ] ¿Los `Canvas`/`Story` muestran stories reales y no ejemplos inventados?
