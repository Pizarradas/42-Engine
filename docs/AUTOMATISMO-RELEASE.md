# Automatismo de Release 42DS → Producción

Documentación del flujo automatizado que se dispara al crear una release en el repositorio **42DS** y que orquesta la actualización de **ds-vue**, **ds-showroom-nuxt** y **cds-front** hasta su paso a producción.

---

## Índice

1. [Descripción general](#1-descripción-general)
2. [Formato de la descripción de release](#2-formato-de-la-descripción-de-release)
3. [Flujo completo paso a paso](#3-flujo-completo-paso-a-paso)
4. [Diagrama de secuencia](#4-diagrama-de-secuencia)
5. [Modos: VALIDACION vs NO-PROD](#5-modos-validacion-vs-no-prod)
6. [Flujo de rechazo (cleanup)](#6-flujo-de-rechazo-cleanup)
7. [Notificaciones en Teams](#7-notificaciones-en-teams)
8. [Notificaciones de error](#8-notificaciones-de-error)
9. [Repositorios y archivos clave](#9-repositorios-y-archivos-clave)
10. [Variables CI/CD entre pipelines](#10-variables-cicd-entre-pipelines)
11. [Tokens y permisos](#11-tokens-y-permisos)
12. [Cloud Run proxy](#12-cloud-run-proxy)
13. [Preguntas frecuentes](#13-preguntas-frecuentes)

---

## 1. Descripción general

Cuando se crea una **release** en el repositorio 42DS (ej. `v.1.158.2`), el pipeline de CI:

1. **Publica** el paquete `@design/42ds` en el registry npm.
2. **Parsea** la descripción de la release para saber qué proyectos están afectados.
3. **Dispara** la cadena de pipelines en los proyectos afectados.

El flujo es **completamente automático** desde el tag hasta el deploy en PRE. A partir de ahí, **requiere validación humana** (clic en Teams) para subir a producción. Sin ese clic, nunca se mergea a master ni se tagea en los proyectos consumidores.

---

## 2. Formato de la descripción de release

Al crear una release en GitLab para un tag de 42DS, la descripción debe incluir las siguientes líneas:

```
PROJECTS: CDS(VALIDACION), PASATIEMPOS(NO-PROD)
JIRA: PI-1234
```

### Campo `PROJECTS` (obligatorio para activar automatismos)

Lista de proyectos afectados por la release, separados por comas. Cada proyecto puede llevar opcionalmente un tipo entre paréntesis:

| Ejemplo | Resultado |
|---------|-----------|
| `PROJECTS: CDS` | CDS con validación (default) |
| `PROJECTS: CDS(VALIDACION)` | CDS con validación (explícito) |
| `PROJECTS: CDS(NO-PROD)` | CDS solo deploy a PRE, sin merge automático |
| `PROJECTS: CDS, PASATIEMPOS` | Ambos con validación |
| `PROJECTS: CDS(VALIDACION), PASATIEMPOS(NO-PROD)` | Cada uno con su tipo |
| `PROJECTS: PASATIEMPOS` | Solo pasatiempos; CDS no se toca |
| *(sin línea PROJECTS)* | **No se dispara ningún automatismo** |

**Tipos disponibles:**

| Tipo | Qué hace |
|------|----------|
| `VALIDACION` (default) | Pipeline completo: build → deploy PRE → card en Teams con botones → validación humana → merge a master + tag |
| `NO-PROD` | Pipeline hasta PRE: build → deploy PRE → card informativa en Teams (sin botones). No sube a producción automáticamente. |

> **Nota:** Acepta mayúsculas y minúsculas. `cds(validacion)`, `CDS(Validacion)` y `CDS(VALIDACION)` son equivalentes.

### Campo `JIRA` (opcional)

Ticket de Jira asociado. Se propaga como contexto de release en el flujo automatizado.

```
JIRA: PI-1234
```

### Campo `NO-TRIGGER` (opcional)

Si se necesita publicar el paquete npm pero **no disparar ningún automatismo**, aunque haya `PROJECTS`:

```
NO-TRIGGER: true
```

### Ejemplos completos

**Release normal con validación:**
```
PROJECTS: CDS
JIRA: PI-1234
```

**Release solo para revisión en PRE:**
```
PROJECTS: CDS(NO-PROD)
JIRA: PI-1234
```

**Release que solo afecta a pasatiempos, no a CDS:**
```
PROJECTS: PASATIEMPOS
```

**Release sin automatismos (solo publicar paquete npm):**
```
(sin línea PROJECTS)
```

---

## 3. Flujo completo paso a paso

### Paso 1 — 42DS: Tag + Publicación

1. Se crea un tag en 42DS (ej. `v.1.158.2`).
2. El pipeline de CI publica `@design/42ds` en el registry npm.
3. `parse-release.js` lee la descripción de la release y genera `release-config.json`.
4. `trigger-dt.js` dispara el pipeline del proyecto intermedio (DT) con las variables `DP_TAG`, `RELEASE_TYPE`, etc.

### Paso 2 — ds-vue: Sincronización + Versión -pre

1. Se crea una rama `sync/v.1.158.2` en ds-vue.
2. Se copian los assets actualizados de 42DS.
3. Se publica una versión `-pre` de `@renr/ds-vue` (ej. `1.158.2-pre`).
4. Se dispara el pipeline de cds-front.

### Paso 3 — cds-front: Build + Deploy a PRE

1. Se crea una rama `sync/v.1.158.2` desde `master`.
2. Se actualiza `package.json` con la versión `-pre` de `@renr/ds-vue`.
3. Se hace build y deploy a PRE (media de El Periódico Mediterráneo).
4. Se envía Adaptive Card a Teams.

### Paso 4 — Validación humana en Teams

**Si VALIDACION:**
- La card tiene botones **"Validar deploy"** y **"Rechazar"**.
- Al hacer clic, el navegador va al Cloud Run proxy, que dispara el pipeline correspondiente.

**Si NO-PROD:**
- La card es **informativa** (sin botones).
- El equipo revisa en PRE. Para subir a producción, alguien deberá ejecutar el proceso manualmente.

### Paso 5 — Validado: Merge a master + Tag

Si se pulsa **"Validar deploy"**:

1. **ds-vue**: merge de `sync/v.1.158.2` → `master`, se genera tag con versión definitiva (sin `-pre`).
2. **cds-front**: se actualiza `package.json` con la versión definitiva de `@renr/ds-vue`, merge a `master`, se crea tag `v.1.158.2`.
3. Se borran las ramas `sync/v.1.158.2` en ambos repos.

### Paso 6 — Rechazado: Cleanup

Si se pulsa **"Rechazar"**:

1. Se borran las ramas `sync/v.1.158.2` en ds-vue y cds-front.
2. No se hace merge ni tag en ningún repo.
3. Todo queda como estaba en master.

---

## 4. Diagrama de secuencia

```
┌──────┐     ┌────┐     ┌───────┐     ┌──────────┐     ┌───────┐     ┌───────────┐
│ 42DS │     │ DT │     │ds-vue │     │cds-front │     │ Teams │     │Cloud Run  │
└──┬───┘     └─┬──┘     └───┬───┘     └────┬─────┘     └───┬───┘     └─────┬─────┘
   │            │            │              │                │               │
   │ tag creado │            │              │                │               │
   ├───────────►│            │              │                │               │
   │ trigger    │            │              │                │               │
   │ DP_TAG     │            │              │                │               │
   │ RELEASE_   │            │              │                │               │
   │ TYPE       ├───────────►│              │                │               │
   │            │  trigger   │              │                │               │
   │            │            │ sync branch  │                │               │
   │            │            │ npm pre      │                │               │
   │            │            ├─────────────►│                │               │
   │            │            │   trigger    │                │               │
   │            │            │   DP_TAG     │                │               │
   │            │            │   NPM_VER    │                │               │
   │            │            │   REL_TYPE   │                │               │
   │            │            │              │ build+deploy   │               │
   │            │            │              │ PRE            │               │
   │            │            │              ├───────────────►│               │
   │            │            │              │ card Teams     │               │
   │            │            │              │                │               │
   │            │            │              │                │  clic usuario │
   │            │            │              │                ├──────────────►│
   │            │            │              │                │               │
   │            │            │              │◄───────────────────────────────┤
   │            │            │              │ trigger SYNC_  │               │
   │            │            │              │ MERGE o CLEANUP│               │
   │            │            │              │                │               │
   │            │            │◄─────────────┤                │               │
   │            │            │ SYNC_MERGE   │                │               │
   │            │            │ (si validado)│                │               │
   │            │            │              │                │               │
   │            │            │ merge+tag    │ merge+tag      │               │
   │            │            │              │ cleanup ramas  │               │
```

---

## 5. Modos: VALIDACION vs NO-PROD

| Aspecto | VALIDACION | NO-PROD |
|---------|------------|---------|
| Build y deploy a PRE | Si | Si |
| Card en Teams | Con botones (Validar / Rechazar) | Informativa (sin botones) |
| Merge automático a master | Si (tras clic en "Validar") | No |
| Tag automático | Si | No |
| Cleanup de ramas | Si (tras validar o rechazar) | No (la rama queda hasta limpieza manual) |
| Subida a producción | Automática tras validación | Manual por parte del equipo |

---

## 6. Flujo de rechazo (cleanup)

Cuando alguien pulsa **"Rechazar"** en la card de Teams:

1. El Cloud Run proxy recibe la petición y dispara un pipeline en cds-front con `SYNC_CLEANUP=true`.
2. `cleanup-branches.js` borra la rama `sync/${DP_TAG}` en:
   - **cds-front** (usando `GIT_PUSH_TOKEN_API`)
   - **ds-vue** (usando `DSVUE_API_TOKEN`)
3. Master en ambos repos queda intacto.

---

## 7. Notificaciones en Teams

Hay **una notificación funcional** del flujo en momentos de validación:

### 7.1 Notificación de cds-front (canal de validación)

Se envía cuando el deploy a PRE está listo. Depende del tipo:

**VALIDACION:**
- Título: "Deploy Ready"
- Info: versión 42DS, versión ds-vue, validadores
- Enlaces: media en PRE, pipeline
- Botones: "Validar deploy" / "Rechazar"

**NO-PROD:**
- Título: "Nueva versión en PRE"
- Info: versión 42DS, versión ds-vue, modo NO-PROD
- Enlaces: media en PRE, pipeline
- Sin botones
- Texto: "Esta release no se promoverá a producción automáticamente"

---

## 8. Notificaciones de error

Si **cualquier job** del flujo sync falla en cualquiera de los tres repos, se envía automáticamente una **Adaptive Card de error** al canal de Teams:

```
🔴 Pipeline fallido
El automatismo de release ha fallado y requiere atención

📦 Repo:  cds-front
🎨 42DS:  v.1.158.2
❌ Job:   sync:create-branch

🔧 Ver pipeline    📋 Ver job
```

**Implementación por repo:**

| Repo | Job | Se ejecuta cuando |
|------|-----|-------------------|
| **42DS** | `sync:notify-failure` | Falla `sync:cds-front` |
| **ds-vue** | `sync:notify-failure` | Falla cualquier job sync triggered por 42DS |
| **cds-front** | `sync:notify-failure` | Falla cualquier job de `SYNC_DEPLOY`, `SYNC_MERGE` o `SYNC_CLEANUP` |

Cada repo usa su variable de webhook de alertas para enviar la notificación de error. El job tiene `when: on_failure`, por lo que solo se ejecuta si algún job previo del pipeline ha fallado.

---

## 9. Repositorios y archivos clave

### 42DS (`42ds/`)

| Archivo | Función |
|---------|---------|
| `scripts/parse-release.js` | Parsea la descripción de la release → `release-config.json` |
| `scripts/trigger-dt.js` | Dispara pipeline en DT con `DP_TAG`, `RELEASE_TYPE` |
| `scripts/notify-failure.js` | Envía card de error a Teams si falla el pipeline |

### ds-vue (`ds-vue/`)

| Archivo | Función |
|---------|---------|
| `scripts/merge-to-master.js` | Crea MR `sync/tag` → `master` y la mergea |
| `scripts/trigger-front.js` | Dispara pipeline de cds-front |
| `scripts/notify-failure.js` | Envía card de error a Teams si falla el pipeline |

### cds-front (`cds-front/`)

| Archivo | Función |
|---------|---------|
| `ci/scripts/notify-teams.js` | Envía Adaptive Card a Teams (VALIDACION o NO-PROD) |
| `ci/scripts/merge-and-tag.js` | Orquesta merge en ds-vue + cds-front, actualiza version, crea tag |
| `ci/scripts/cleanup-branches.js` | Borra ramas `sync/` en ds-vue y cds-front |
| `ci/scripts/update-ds-vue-version.js` | Actualiza la versión de `@renr/ds-vue` en `package.json` |
| `ci/cloudrun-proxy/index.js` | Proxy HTTP que recibe clics de Teams y dispara pipelines |
| `ci/cloudrun-proxy/token.js` | Generación y validación de tokens firmados (24h) |
| `ci/cloudrun-proxy/gitlab.js` | Lógica de trigger a GitLab API |
| `ci/cloudrun-proxy/html.js` | Página HTML de respuesta al usuario |
| `ci/scripts/notify-failure.js` | Envía card de error a Teams si falla el pipeline |

---

## 10. Variables CI/CD entre pipelines

### 42DS → DT (trigger-dt.js)

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `DP_TAG` | `CI_COMMIT_TAG` (ej. `v.1.158.2`) | Tag de la release de 42DS |
| `RELEASE_TYPE` | `VALIDACION` o `NO-PROD` | Tipo según `PROJECTS:` |
| `FRONT_PROJECT_ID` | ID de cds-front | Para que ds-vue pueda disparar cds-front |
| `FRONT_TRIGGER_TOKEN` | Token trigger cds-front | Para autenticar el trigger |

### ds-vue → cds-front (trigger-front.js)

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `DP_TAG` | Tag original de 42DS | Se propaga tal cual |
| `NPM_VERSION` | `X.Y.Z-pre` | Versión pre-release de `@renr/ds-vue` |
| `RELEASE_TYPE` | `VALIDACION` o `NO-PROD` | Se propaga tal cual |

### Cloud Run → cds-front (al validar)

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `SYNC_MERGE` | `true` | Activa el job de merge+tag |
| `DP_TAG` | Tag original | Identifica la rama `sync/` |
| `NPM_VERSION` | Versión pre de ds-vue | Para referencia |

### Cloud Run → cds-front (al rechazar)

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `SYNC_CLEANUP` | `true` | Activa el job de cleanup |
| `DP_TAG` | Tag original | Identifica la rama `sync/` a borrar |

---

## 11. Tokens y permisos

| Token | Configurado en | Ámbito | Uso |
|-------|---------------|--------|-----|
| `DT_TRIGGER_TOKEN` | 42DS CI vars | Trigger pipeline | 42DS dispara DT |
| `FRONT_TRIGGER_TOKEN` | 42DS CI vars | Trigger pipeline | ds-vue dispara cds-front |
| `DSVUE_TRIGGER_TOKEN` | cds-front CI vars | Trigger pipeline | cds-front dispara ds-vue (SYNC_MERGE) |
| `DSVUE_API_TOKEN` | cds-front CI vars | `api` scope en ds-vue | Consultar pipelines, borrar ramas en ds-vue |
| `GIT_PUSH_TOKEN_API` | cds-front CI vars | `api` scope en cds-front | Modificar archivos, crear MR, mergear, borrar ramas |
| `TEAMS_WEBHOOK_URL` | cds-front CI vars | Incoming Webhook Teams | Enviar card de validación/no-prod |
| `TEAMS_WEBHOOK_URL_ALERTS` | 42DS CI vars | Incoming Webhook Teams | Enviar cards de error del flujo |
| `SYNC_PROXY_URL` | cds-front CI vars | URL Cloud Run | Base URL del proxy |
| `SYNC_PROXY_SECRET` | cds-front CI vars | Secreto compartido | Firmar URLs temporales de la card |
| `GITLAB_TRIGGER_TOKEN` | Cloud Run env | Trigger pipeline | El proxy dispara cds-front |
| `PROXY_SECRET` | Cloud Run env | Secreto compartido | Validar peticiones entrantes |

---

## 12. Cloud Run proxy

El proxy es un servicio ligero en Google Cloud Run que actúa como intermediario entre los botones de Teams y GitLab:

1. `cds-front/ci/scripts/notify-teams.js` genera URLs firmadas con un token temporal (válido 24h).
2. Cuando el usuario pulsa un botón en Teams, su navegador abre la URL.
3. El proxy valida el token y dispara el pipeline correspondiente en GitLab.
4. Devuelve una página HTML confirmando la acción.

**Seguridad:**
- Las URLs llevan firma SHA-256 con secreto compartido.
- Caducan a las 24h.
- El proxy solo acepta `validated` o `rejected` como acciones.
- El ingress del Cloud Run está configurado para acceso interno (VPC).

---

## 13. Preguntas frecuentes

### ¿Qué pasa si no pongo PROJECTS en la release?
No se dispara ningún automatismo. Solo se publica el paquete npm de 42DS y se envía la notificación general al canal DS.

### ¿Qué pasa si pongo PROJECTS: CDS sin paréntesis?
Se trata como `CDS(VALIDACION)` por defecto.

### ¿Puede algo llegar a producción sin validación humana?
No. El merge a master en cds-front **solo** se ejecuta si alguien pulsa "Validar deploy" en la card de Teams. Sin ese clic, la rama `sync/` queda en PRE indefinidamente.

### ¿Qué pasa si nadie pulsa nada en 24h?
Los enlaces de la card caducan. Habría que relanzar el proceso o hacer el merge manualmente.

### ¿Puedo rechazar después de haber validado?
No. Una vez se pulsa "Validar", el merge y tag se ejecutan automáticamente.

### ¿Cómo hago si quiero que una release afecte a CDS y a otro proyecto con tipos distintos?
```
PROJECTS: CDS(VALIDACION), PASATIEMPOS(NO-PROD)
```
Cada proyecto tiene su tipo independiente.

### ¿Importan las mayúsculas/minúsculas?
No. `cds(validacion)`, `CDS(Validacion)` y `CDS(VALIDACION)` son equivalentes.

### ¿Importan los espacios en la descripción de la release?
No. Todas estas variantes son válidas:
- `PROJECTS: CDS` / `PROJECTS:CDS` / `PROJECTS : CDS`
- `CDS(VALIDACION)` / `CDS VALIDACION` / `CDS (VALIDACION)`

### ¿Qué pasa si falla un pipeline?
Se envía automáticamente una **card de error** al canal de Teams con:
- Nombre del repo donde falló
- Tag de 42DS afectado
- Nombre del job que falló
- Enlaces directos al pipeline y al job

Esto ocurre en los tres repos (42DS, ds-vue, cds-front) para cualquier job del flujo sync.

### ¿Dónde veo los logs si algo falla?
- **42DS**: Pipeline del tag en GitLab → jobs `sync:*`
- **ds-vue**: Pipeline triggered → jobs `sync:*`
- **cds-front**: Pipeline triggered → jobs `sync:*`
- **Cloud Run**: Google Cloud Console → Logs del servicio `cds-sync-proxy`
