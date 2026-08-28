# Storybook · Setup

Stories del **primer grupo** del storybook POC: las reglas **base** del 42DS —
las **reglas genéricas que conforman la base de cada marca** y se aplican a
los **tags básicos** de la página, no a las `.class`.

> El grupo `"Setup"` aparece en lo alto del sidebar por orden canónico definido
> en `core/storybook.js` (`GROUP_ORDER`). Va antes de Helpers porque el reset
> y el charset son la pieza más fundacional del DS: sobre ellos se apoya todo
> lo demás (helpers, atoms, molecules, organisms).

Espeja el grupo "Base" del showroom (`fourty/base/`) pero **renombrado a
Setup** en el storybook para diferenciarlo de la story `Base` de cada
componente.

---

## Índice de piezas

Cada pieza tiene su **ficha de contexto** (`<x>/README.md`): identidad, stories y
trazabilidad al SCSS base. Punto de entrada rápido para agentes (la doc completa vive
en el `overview` del `.js`).

| Pieza | Ficha | Señales | SCSS (SSOT) |
|-------|-------|---------|-------------|
| Charset | [`charset/`](charset/README.md) | — | — *(encoding + `setting.css`)* |
| Reset | [`reset/`](reset/README.md) | — | `scss/base/_reset.scss` |
| Root | [`root/`](root/README.md) | `js` | `scss/brands/<marca>-setup.scss` → `brands/<marca>/setting.css` |

---

## Cuándo crear una story aquí

Si la pieza:

- Vive en `scss/base/_<x>.scss` (no en `scss/fourties/`, no en `scss/base/helpers/`).
- Se aplica a **tags HTML desnudos** (sin clase): `h1`, `p`, `a`, `button`, `ul`, etc.
- Forma parte del "setup" de la marca: reset CSS, normalización tipográfica,
  charset, encoding.

→ pertenece al nivel **Setup**.

Si en cambio es un componente con DOM y clases propias → su lugar es
`atoms/`, `molecules/` u `organisms/`. Si es una utilidad de clase →
`helpers/`.

---

## Estructura del módulo

Idéntica a los otros niveles:

```
storybook/js/setup/
├── README.md           ← este archivo
└── <x>/
    ├── <x>.js          ← SB.register(...) (obligatorio)
    └── <x>.html        ← markup canónico copiable (opcional pero recomendado)
```

Patrón del `.js`:

```js
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* DATA — refleja los tags/familias del SCSS base */
    const DATA = { /* … */ };

    /* Visualizador: HTML semántico desnudo (sin .ft-*) */
    const liveBase = (a) => `<div>${/* tags reales sin clases */ }</div>`;

    /* Overview */
    const overview = `<div class="cb-docs__inner">…</div>`;

    /* Registro */
    const X = {
        id: "<x>", name: "<Name>", group: "Setup", overview,
        stories: [{ id: "base", name: "Base", kind: "interactive", full: true,
                    argTypes, args, render: liveBase }],
        subgroups: [{ id: "galleries", name: "Galleries", collapsed: true,
                      stories: [/* … */] }]
    };
    window.SB.register(X);
    window.SB.loadMarkup(X, document.currentScript && document.currentScript.src, { full: true });
})();
```

---

## Diferencias respecto a los otros niveles

| Aspecto | Atoms/Molecules/Organisms | Helpers | Setup |
|---------|---------------------------|---------|-------|
| Fuente SCSS | `scss/fourties/<nivel>/<x>/_<x>.scss` | `scss/base/helpers/_<x>.scss` | `scss/base/_<x>.scss` |
| Prefijo de clase | `.ft-`, `.ft-mol-`, `.ft-org-` | `.ft-helper-<x>-` | **Ninguno** — son tags HTML desnudos |
| Markup característico | Componente con clases | Wrapper con clase | **Tags HTML sin clase** |
| `hint` en Base | Sí (clase raíz) | No | No |
| `full: true` | Solo layout | Casi siempre | Casi siempre (las tablas de tags ocupan ancho) |
| Variantes por marca | A veces | Raras | **Habituales** — cada marca redefine font-family de p/h1-h6/etc. en el bloque set-brand |

---

## Categorías a documentar

| Categoría | SCSS | Showroom |
|-----------|------|----------|
| **Reset** | `scss/base/_reset.scss` | `fourty/base/base-reset.html` |
| **Charset** | (charset = encoding + glifos de la marca) | `fourty/base/base-charset.html` |

---

## Reglas no-negociables (heredadas del README maestro)

1. **Tags HTML reales** — la story renderiza markup desnudo (`<h1>`, `<p>`, etc.). No se inventan tags.
2. **Cero `.ft-*` en el contenido visualizado** — el objetivo es mostrar cómo se ven los tags sin clases. Si añades una `.ft-*` rompes la demostración.
3. **Overview = documentación**, no componente vivo.
4. **`Base` siempre primero**, sin hint (mismo criterio que Helpers).
5. **`full: true`** habitual — las galerías de tags suelen necesitar ancho completo.
6. **No tocar `scss/abstracts/`** ni `scss/base/_reset.scss` desde el storybook.
   PATCH only para versiones.
