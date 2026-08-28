# AI Mind System

Sistema de modes y knowledge para trabajar sobre 42DS de forma portable entre runtimes de IA.

## Objetivo

Este sistema está diseñado para poder ser usado por Claude, Codex u otro agente similar sin cambiar la lógica de los modes ni los criterios de evaluación.

## Principios de portabilidad

- El contrato principal vive en `AI/mind-system/`.
- Los prefijos `[MODE: ...]` son sintaxis del sistema, no de un proveedor concreto.
- El runtime puede definir un modo por defecto sin prefijo, pero el sistema recomienda usar prefijos explícitos para evitar ambigüedad entre agentes.
- La capa operativa del repositorio puede vivir en `AI/knowledge/`, en `AGENTS.md`, en `CLAUDE.md` o en documentación equivalente. Si una de esas capas falta, el agente debe usar la estructura real del repositorio como fuente de verdad.

## Cómo cargar el sistema

1. Cargar `agents/governance.md`.
2. Cargar `agents/index.md`.
3. Cargar el `mode-*.md` que corresponda.
4. Cargar solo los `knowledges/` necesarios para ese mode.
5. Si existe una capa operativa del repositorio, usarla para detalles concretos de implementación.

## Compatibilidad de runtimes

- Claude: puede mapear este sistema sobre `CLAUDE.md` y sus instrucciones del repositorio.
- Codex: puede mapear este sistema sobre `AGENTS.md` y la estructura real del repo.
- Otros agentes: deben respetar `governance.md`, los prefijos `[MODE: ...]` y la jerarquía conceptual/operativa.

## Recomendación

Para máxima compatibilidad entre agentes, usar siempre invocaciones explícitas como:

```text
[MODE: UX] ...
[MODE: UI] ...
[MODE: 42DS+HF] ...
[MODE: 42DS+SCSS] ...
[MODE: FRONT+DOC] ...
[MODE: DEV+DOC] ...
```

No depender de comportamiento implícito sin prefijo salvo que el runtime anfitrión lo documente expresamente.
