# Showroom 42DS (`fourty/`)

Documentación visual del Design System: cada componente, helper, plantilla y layout tiene su página HTML navegable. Es **documentación viva**: cuando se crea o modifica un componente SCSS, su página en `fourty/` debe reflejar todas sus variantes y modificadores.

> Entrada de la app: `index.html`. Navegación lateral: `nav.html` (se inyecta vía `data-showroom="nav"`). Índice de contenidos: `contenidos.html`.

---

## Secciones

Cada sección tiene una página índice `*-home.html` y un `README.md` con sus convenciones.

| Sección | Carpeta | Índice | Prefijo CSS | Doc |
|---------|---------|--------|-------------|-----|
| Base | `base/` | `base-home.html` | tags HTML | [README](base/README.md) |
| Helpers | `helpers/` | `helper-home.html` | `ft-helper-` | [README](helpers/README.md) |
| Atoms (25 págs) | `atoms/` | `atom-home.html` | `ft-` | [README](atoms/README.md) |
| Molecules (66 págs) | `molecules/` | `molecule-home.html` | `ft-mol-` | [README](molecules/README.md) |
| Organisms (46 págs) | `organisms/` | `organism-home.html` | `ft-org-` | [README](organisms/README.md) |
| Templates | `templates/` | `template-home.html` | (composición) | [README](templates/README.md) |
| Layouts | `layouts/` | `layout-home.html` | (composición) | [README](layouts/README.md) |
| POCs | `pocs/` | `poc-home.html` | 42DS Lite | [README](pocs/README.md) |
| Widgets | `widgets/` | `widget-home.html` | — | [README](widgets/README.md) |
| Recursos | `recursos/` | `recurso-home.html` | — | [README](recursos/README.md) |

El orden de la tabla coincide con el de la navegación lateral (`nav.html`).

> **Conteos**: son **páginas HTML del showroom**, no el número de componentes del DS. No coinciden necesariamente con las carpetas SCSS (`scss/fourties/*/`): hay componentes SCSS sin página de showroom todavía, y el conteo de organisms incluye múltiples páginas de variantes (header/masthead). El **catálogo canónico con el caso de uso de cada componente** está en los README de SCSS: [atoms](../scss/fourties/atoms/README.md) (31) · [molecules](../scss/fourties/molecules/README.md) (71) · [organisms](../scss/fourties/organism/README.md) (35).

---

## Cómo usar el showroom (caso de uso)

| Quieres… | Haz |
|----------|-----|
| Ver cómo se renderiza un componente y todas sus variantes | Abre su página `*-[nombre].html` en la sección correspondiente. |
| Copiar el HTML exacto de un componente o modificador | Usa el `code-container` de su página (el código está marcado para highlight). |
| Saber **cuándo** usar un componente (caso de uso) | Consulta el README de SCSS de su nivel ([atoms](../scss/fourties/atoms/README.md) / [molecules](../scss/fourties/molecules/README.md) / [organisms](../scss/fourties/organism/README.md)), que lista el caso de uso de cada uno. |
| Ver una página completa de un medio | Sección **Layouts** (`layout-[marca]-[tipo].html`). |
| Validar un flujo nuevo antes de integrarlo | Sección **POCs** (42DS Lite). |

---

## Páginas y carpetas auxiliares (raíz)

| Archivo / carpeta | Uso |
|-------------------|-----|
| `index.html` | Punto de entrada del showroom |
| `nav.html` | Navegación lateral (inyectada en cada página) |
| `contenidos.html` | Índice general de contenidos |
| `changelog-home.html` | Historial de versiones |
| `amp-home.html` | Sección AMP |
| `iframe-promoheader-*.html` | Iframes de promo-header por marca |
| `_resources/` | Recursos del propio showroom |
| `legacy/` | Material heredado |

---

## Patrón de página

Estructura HTML común a todas las páginas de sección (ver el bloque completo en `CLAUDE.md`):

```html
<body class="fourty ft-brand-ux ft-skin ft-skin--showroom"
      data-showroom-load="[id-pagina]"
      data-showroom-skin="secciones | secciones interiores | cover | layout">
    <div data-showroom="nav"></div>
    <main id="showroomContent"><!-- contenido --></main>
    <!-- scripts showroom -->
</body>
```

- `setting.css` de la marca **siempre primero**, después el bundle (`ux-index.css`; los layouts usan `ux-index-layout.css`).
- `data-showroom-load` es el identificador único de la página (ej: `atoms-btn`, `pocs-home`).

---

## Referencias

- Arquitectura, marcas, nomenclatura y reglas: `CLAUDE.md` (raíz del repo).
- Sistema de IA (modos y knowledge): `AI/mind-system/README.md`.
- POCs: `pocs/README.md` y `AI/mind-system/knowledges/42ds/poc-system.md`.
