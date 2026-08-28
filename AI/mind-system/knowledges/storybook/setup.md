# Storybook Setup

## meta
- domain: storybook-setup
- source: "Storybook Docs — Configure · Main configuration (https://storybook.js.org/docs/api/main-config/main-config)"
- goal: configurar Storybook en un proyecto de forma mínima y explícita
- agent_tags: [storybook, front]

---

## concepts

### Archivos de configuración
- **`.storybook/main.ts`**: configuración principal del proyecto.
- **`.storybook/preview.ts`**: decoradores globales, parámetros globales y globals (render común a todas las stories).
- **`.storybook/manager.ts`**: personalización de la UI del gestor (sidebar, branding).

### Claves de `main`
- `stories`: rutas donde se buscan los archivos de stories.
- `addons`: addons activos.
- `staticDirs`: directorios servidos como estáticos.
- `framework`: framework base del proyecto.
- `docs`: configuración de la documentación automática (autodocs).
- `features`: flags de funcionalidades.
- `viteFinal` / `webpackFinal`: ajustes finales del builder.

### Frontera global vs por story
- Lo **global** (decorators, parameters, globals) vive en `preview.ts`.
- Lo **específico** vive en el `meta` o en la story (ver `csf`).
- Mezclar ambos planos produce configuración impredecible.

### Convenciones
- Colocar las stories cerca del componente.
- Nombrar de forma consistente: `Button.stories.tsx`.
- Mantener la configuración mínima y explícita.

---

## rules

### Config boundaries
```
check: global_vs_story_config
target: [storybook_config]
rule: story_level_config_placed_in_preview OR global_config_repeated_per_story → issue
output:
  problem: Configuración global y por story mezcladas
  recommendations:
    - Pon decorators/parameters/globals comunes en preview.ts
    - Deja en el meta o la story solo lo específico de ese componente o estado

check: minimal_main_config
target: [main_config]
rule: contains_unused_addons OR redundant_builder_overrides → warning
output:
  problem: main.ts con configuración no esencial
  recommendations:
    - Declara solo los addons en uso real
    - Evita overrides de builder que no aporten un cambio necesario
```

### Stories location
```
check: stories_colocation
target: [story_file]
rule: story_far_from_component OR inconsistent_naming → warning
output:
  problem: Story alejada del componente o con nombre inconsistente
  recommendations:
    - Coloca la story junto al componente que documenta
    - Usa el patrón Componente.stories.ext de forma consistente
```

---

## checklist
- [ ] ¿`main.ts` declara solo addons en uso y rutas de stories correctas?
- [ ] ¿Los decorators/parameters/globals comunes están en `preview.ts` y no repetidos por story?
- [ ] ¿Las stories están colocadas junto a su componente?
- [ ] ¿El naming de archivos `*.stories.*` es consistente?
- [ ] ¿La configuración del builder es la mínima necesaria?
