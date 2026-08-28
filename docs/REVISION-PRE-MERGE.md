# Revision pre-merge

Analisis de los cambios pendientes en las ramas de trabajo
de los tres repositorios antes de mergear a master.

Fecha: 12 mayo 2026

Ramas:

- 42ds: create-automatitation-advice
- ds-vue: create-automatism
- cds-front: create-automatism

---

## 1. Resumen

Flujo automatizado de release: 42DS, ds-vue, cds-front.
Validacion humana via Teams + proxy en Cloud Run.

| Repo | Nuevos | Modificados | Lineas |
|------|--------|-------------|--------|
| 42DS | 5 | 3 | ~2370 |
| ds-vue | 3 | 1 | ~150 |
| cds-front | 14 | 6 | ~9800 |

---

## 2. 42DS

### 2.1 Archivos modificados

- .gitlab-ci.yml: stages sync y notify, jobs sync:cds-front y sync:notify-failure
- package.json: version 1.158.0 a 1.158.1, campo packageManager
- package-lock.json: actualizado a 1.158.1

### 2.2 Archivos nuevos

- scripts/parse-release.js: parsea descripcion de release (formato PROJECTS)
- scripts/notify-teams.js: notificacion general al canal DS
- scripts/trigger-dt.js: dispara pipeline DT con DP_TAG y RELEASE_TYPE
- scripts/notify-failure.js: card de error a Teams si falla
- scripts/README.md: documentacion de los scripts

### 2.3 Puntos criticos

ALTA - scripts/README.md desactualizado

El README describe el formato antiguo (CDS-FRONT: DIRECTO PRO)
pero parse-release.js ya usa PROJECTS: CDS(VALIDACION).
Debe reescribirse.

MEDIA - pnpm-lock.yaml y packageManager

Se genero pnpm-lock.yaml (2053 lineas) y se anadio packageManager
al package.json. El proyecto usaba package-lock.json (npm).
Tener dos lockfiles causa inconsistencias.
Decidir: migrar a pnpm o eliminar pnpm-lock.yaml.

BAJA - Version 1.158.1 manual

Cambio manual de 1.158.0 a 1.158.1 para corregir desajuste.
Verificar que no conflicte con el registry npm.

---

## 3. ds-vue

### 3.1 Archivos modificados

- .gitlab-ci.yml: stages, workflow rules, jobs sync, optimizaciones cache

Cambios en CI existente:

- GIT_DEPTH de 0 a 1 (publish-npm lo overridea a 0, OK)
- NPM_CONFIG_CACHE anadido (mejora cache)
- npm ci optimizado (prefer-offline, no-audit)
- Cache key por package-lock.json (mas granular)
- Workflow rules para triggers
- compute-version, publish-npm, create-release: when never si trigger

### 3.2 Archivos nuevos

- scripts/merge-to-master.js: crea MR sync/tag a master y mergea
- scripts/trigger-front.js: valida variables y dispara cds-front
- scripts/notify-failure.js: card de error a Teams

### 3.3 Jobs nuevos

- sync:create-branch (sync): crea rama, copia assets, push
- sync:publish-pre (publish-pre): publica version -pre
- sync:trigger-front (trigger-front): dispara cds-front
- sync:merge-to-master (sync): crea MR y mergea a master
- sync:notify-failure (notify): notifica fallo a Teams

### 3.4 Puntos criticos

CRITICA - sync:create-branch se ejecuta con SYNC_MERGE=true

Cuando cds-front dispara ds-vue con SYNC_MERGE=true,
sync:create-branch tambien corre porque su regla solo
comprueba CI_PIPELINE_SOURCE == trigger.
Intentara clonar el repo DP sin DP_TOKEN y fallara.

Correccion: anadir when never cuando SYNC_MERGE es true,
antes de la regla existente de trigger.

ALTA - TEAMS_WEBHOOK_URL no configurada

sync:notify-failure necesita TEAMS_WEBHOOK_URL en las
CI/CD variables de ds-vue. Configurar en GitLab.

BAJA - GIT_PUSH_TOKEN en ds-vue

sync:create-branch usa CI_JOB_TOKEN si no hay GIT_PUSH_TOKEN.
Verificar permisos de push.

---

## 4. cds-front

### 4.1 Archivos modificados

- .gitlab-ci.yml: stages, workflow rules, jobs sync, cambios en one
- .gitignore: anade ci/cloudrun-proxy/deploy.sh
- .npmrc: anade @renr/jwplayer:ignore-scripts=true
- ci/gitlab-ci/app/ci-install.yml: GIT_STRATEGY fetch, optimizacion
- ci/gitlab-ci/deploy-media.yml: cambio en image check y workflow
- package.json: anade packageManager

### 4.2 Archivos nuevos

- ci/scripts/notify-teams.js: card Teams (VALIDACION o NO-PROD)
- ci/scripts/merge-and-tag.js: orquesta merge, version, tag, notificacion
- ci/scripts/cleanup-branches.js: borra ramas sync en ambos repos
- ci/scripts/update-ds-vue-version.js: actualiza ds-vue en package.json
- ci/scripts/notify-failure.js: card de error a Teams
- ci/scripts/notify-teams.pw-automate.js: backup version Power Automate
- ci/cloudrun-proxy/index.js: proxy HTTP para Teams
- ci/cloudrun-proxy/token.js: tokens firmados 24h
- ci/cloudrun-proxy/gitlab.js: trigger a GitLab API
- ci/cloudrun-proxy/html.js: pagina HTML de respuesta
- ci/cloudrun-proxy/Dockerfile: imagen Docker del proxy
- ci/cloudrun-proxy/deploy.sh: script despliegue Cloud Run (gitignore)

### 4.3 Cambios en CI existente (afectan a todos los pipelines)

- CACHE_COMPRESSION_LEVEL a fastest (menor impacto)
- GIT_STRATEGY fetch en ci-install.yml (impacto medio)
- NODE_ENV y NUXT_PUBLIC_HASH_FILES como variables de job
- npm ci optimizado
- docker manifest inspect usa dp_ prefix (verificar coherencia)
- deploy-media.yml anade when always al workflow (verificar)
- @renr/jwplayer:ignore-scripts en .npmrc (verificar)

### 4.4 Jobs nuevos

- sync:create-branch (sync): crea rama, actualiza ds-vue, push
- sync:notify (deploy): card a Teams tras deploy PRE
- sync:merge-and-tag (deploy): merge ds-vue + cds-front, tag
- sync:cleanup (deploy): borra ramas sync
- sync:notify-failure (notify): notifica fallo a Teams

### 4.5 Puntos criticos

PENDIENTE - Refs a create-automatism (cambio planificado)

Estos archivos apuntan a create-automatism en vez de master.
Es intencionado mientras se trabaja en la rama.
Se cambiaran a master justo antes de mergear:

1. .gitlab-ci.yml (sync:create-branch): git fetch/checkout
2. ci/scripts/merge-and-tag.js: ref en triggerDsvueMerge
3. ci/cloudrun-proxy/deploy.sh: default de GITLAB_REF

MEDIA - notify-teams.pw-automate.js

Archivo backup sin uso activo. Considerar eliminar.

MEDIA - deploy-media.yml fallthrough when always

Puede hacer que el pipeline hijo se ejecute en condiciones
no previstas. Verificar.

---

## 5. Acciones necesarias

### CRITICA

| # | Accion | Repo |
|---|--------|------|
| 1 | Anadir when never a sync:create-branch con SYNC_MERGE | ds-vue |

### ALTA

| # | Accion | Repo |
|---|--------|------|
| 2 | Reescribir scripts/README.md al formato PROJECTS | 42ds |
| 3 | Configurar TEAMS_WEBHOOK_URL en CI/CD variables | ds-vue |

### Ultimo paso antes de mergear

| # | Accion | Repo |
|---|--------|------|
| 4 | Cambiar create-automatism a master en sync:create-branch | cds-front |
| 5 | Cambiar create-automatism a master en merge-and-tag.js | cds-front |
| 6 | Cambiar create-automatism a master en deploy.sh | cds-front |

### MEDIA

| # | Accion | Repo |
|---|--------|------|
| 7 | Decidir sobre pnpm-lock.yaml | 42ds |
| 8 | Verificar dp_ prefix coherente con prepare_dp_version | cds-front |
| 9 | Verificar when always en deploy-media.yml | cds-front |
| 10 | Eliminar notify-teams.pw-automate.js | cds-front |

### BAJA

| # | Accion | Repo |
|---|--------|------|
| 11 | Verificar jwplayer ignore-scripts | cds-front |
| 12 | Verificar packageManager en 42DS | 42ds |

---

## 6. Checklist final

### 42DS

- [ ] scripts/README.md actualizado al formato PROJECTS
- [ ] Decidido sobre pnpm-lock.yaml
- [ ] Version 1.158.1 no conflicta con el registry

### ds-vue

- [ ] sync:create-branch tiene regla when never para SYNC_MERGE
- [ ] TEAMS_WEBHOOK_URL configurada en GitLab
- [ ] GIT_PUSH_TOKEN configurado o CI_JOB_TOKEN con permisos push

### cds-front

- [ ] dp_ prefix coherente con prepare_dp_version
- [ ] when always en deploy-media.yml no afecta a otros flujos
- [ ] notify-teams.pw-automate.js eliminado o justificado

### Ultimo paso (justo antes de mergear)

- [ ] Refs create-automatism a master en .gitlab-ci.yml
- [ ] Refs create-automatism a master en merge-and-tag.js
- [ ] Refs create-automatism a master en deploy.sh
- [ ] Redesplegar Cloud Run proxy con GITLAB_REF=master

### Transversal

- [ ] Probar flujo completo con tag de prueba
- [ ] Notificar a los equipos del nuevo formato de release
