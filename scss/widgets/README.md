# Widgets – Componentes especiales

Componentes con lógica y estilos propios para funcionalidades específicas: elecciones, JJOO, marcadores deportivos en tiempo real, etc. **Tienen estructura independiente del flujo estándar del DS.**

## Tipos de widgets existentes

| Widget | Descripción | Caso de uso (cuándo usarlo) |
|--------|-------------|------------------------------|
| Elecciones | Resultados electorales en tiempo real, mapas de voto, escaños | Noche electoral / especiales de elecciones con datos en vivo y mapas interactivos. |
| JJOO | Medallero olímpico, resultados de competiciones | Cobertura de Juegos Olímpicos: medallero, calendario y resultados. |
| Marcadores deportivos | Live scores, cronómetros y resultados en directo | Seguimiento en directo de partidos/competiciones con actualización en tiempo real. |

## ¿Widget o componente normal? (criterio de decisión)

Crea un **widget** (con su setup propio) solo si se cumple:
- Es una **funcionalidad autónoma y compleja** (elecciones, JJOO, live scores) que se monta como pieza independiente de la página.
- Necesita un **bundle propio** y no debe ir en el core de marca.
- Tiene su propio sistema de variables CSS por marca (mixin `forty-root($brand)`), distinto del `setting.css` estándar.

Si solo necesitas un bloque visual reutilizable dentro del flujo editorial normal, **NO es un widget**: créalo como atom / molecule / organism en `fourties/`.

## Estructura de archivos

```
widgets/
├── setup.scss              # Punto de entrada principal (resets + helpers completos)
├── _widget-layout.scss     # Layout específico de widgets
├── base/
│   └── base.scss           # Estilos base de widgets
└── maps/
    ├── _colors.scss        # Paleta de colores + variables CSS por marca
    └── _fonts.scss         # Fuentes de widgets
```

## Diferencia clave con el flujo estándar DS

Los widgets **no siguen** el flujo `abstracts → base → brands → layout → fourties`. Su setup propio:

| Aspecto | DS estándar | Widgets |
|---------|-------------|---------|
| Variables CSS | `setting.css` por marca | Generadas en `maps/_colors.scss` |
| Setup de marca | `brands/[marca]-setup.scss` | `setup.scss` (único para todos) |
| Colores por marca | CSS vars en `setting.css` | Mixin `forty-root($brand)` en `maps/_colors.scss` |
| Fuentes | `brands/[marca]-setup.scss` | Definidas directamente en `setup.scss` |

## Sistema de colores (`maps/_colors.scss`)

El mapa de colores de widgets define variables CSS por marca mediante el mixin `forty-root($brand)`:

```scss
@include forty-root(sport) {
  // genera :root { --color-primary: #e30613; ... }
}
```

Marcas soportadas en widgets: `ep`, `epe`, `regionales`, `sport`, `ux`.

Variables CSS que genera:

```css
:root {
  /* Generales (siempre) */
  --color-black, --color-white
  --color-darkGrey, --color-mediumGrey, --color-lightGrey
  --color-instagram, --color-twitter, --color-facebook, --color-youtube,
  --color-whatsapp, --color-pinterest, --color-linkedin, --color-tiktok,
  --color-telegram, --color-snapchat

  /* Por marca */
  --color-primary, --color-secondary, --color-tertiary
  --color-quaternary, --color-quinary, --color-senary, --color-septenary
  --color-functional-success, --color-functional-info,
  --color-functional-warning, --color-functional-error
  --color-form, --color-form-image--primary, --color-form-image--secondary

  /* Sport específico */
  --color-section-basket, --color-section-motor, --color-section-tenis,
  --color-section-ciclismo, --color-section-golf, --color-section-padel...
}
```

## Cómo usa `setup.scss`

El `setup.scss` de widgets importa los mapas y luego llama a los mismos mixins que los setups de marca estándar:

```scss
@import "maps/colors";
@import "maps/fonts";

// Define fuentes directamente en :root (sin setting.css externo)
:root {
  --font-stack: -apple-system, ...;
  --font-primary: "Google-Roboto--Bold", Arial, sans-serif;
}

// Carga la misma fuente que el DS estándar
@include font-family("Google-Roboto--bold", "#{$fonts-path}/google-roboto/Roboto-Bold", 700, normal, eot woff2 woff ttf svg);

// Y luego el setup estándar:
@include resets-global(...);
@include resets-custom(...);
@include ft-helper-backgrounds(...);
// + todos los helpers estándar
```

## Cómo se importa un widget

Los widgets **no se incluyen en el core principal** del DS. Se importan donde se usen (página específica o bundle propio):

```scss
// En el bundle de la página de elecciones:
@import "../../scss/widgets/setup";
@import "../../scss/widgets/base/base";
@import "../../scss/widgets/_widget-layout";
// + los componentes del widget específico
```

El entry point principal está en `scss/styles-widgets.scss`.

## Reglas para IA

1. **Independencia**: Los widgets tienen su propio setup; no mezclar imports de widgets con el core del DS
2. **Colores por marca**: Usar el mixin `forty-root($brand)` de `maps/_colors.scss` para añadir variables CSS de una nueva marca
3. **Nueva widget**: Crear carpeta o archivo siguiendo la estructura existente; registrar en `styles-widgets.scss`
4. **Import**: Los widgets se importan sólo en bundles o páginas específicas, nunca en los cores de marca
5. **Fuentes**: Las fuentes de widgets se definen directamente en `setup.scss`; no dependen de `setting.css`
