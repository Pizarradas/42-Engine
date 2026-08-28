# Vendors – Dependencias externas

Librerías SCSS de terceros. **No modificar**; son dependencias del proyecto.

## Contenido

| Carpeta | Librería | Uso | Caso de uso (cuándo elegirla) |
|---------|----------|-----|--------------------------------|
| `bourbon/` | Bourbon | Mixins (position, margin, padding, etc.) | **Siempre**: se importa en casi todos los componentes para escribir CSS con mixins en vez de propiedades sueltas. |
| `chartist/` | Chartist | Estilos de gráficos | Gráficos de líneas, barras o tarta ligeros (resultados, datos); usado en `graphs/` y widgets. |
| `glide/` | Glide.js | Slider/carousel | Carrusel ligero sin dependencias cuando no se necesita la potencia de Swiper. |
| `jquery-ui/` | jQuery UI | Componentes UI | Solo en código legacy que aún depende de jQuery; evitar en componentes nuevos. |
| `locomotive/` | Locomotive Scroll | Scroll suave | Efectos de scroll suave/parallax en reportajes inmersivos (`mediareport`, especiales). |
| `noui-slider/` | noUi Slider | Sliders de rango | Inputs de rango/filtros deslizantes (precio, fecha), no carruseles de contenido. |
| `owl-carousel2/` | Owl Carousel | Carousels | Carrusel legacy; preferir Swiper en componentes nuevos. |
| `slider-page/` | Slider custom | Sliders | Slider a página completa específico del proyecto. |
| `swiper-js/` | Swiper | Carousels/touch | **Opción recomendada** para carruseles táctiles modernos (galerías, relacionados, sliders complejos); base de `ft-mol-swiper`. |

## Bourbon

**Uso principal**. Se importa en casi todos los componentes:

```scss
@import "../../../vendors/bourbon/bourbon";
```

Mixins más usados:
- `@include position(absolute, 0 null 0 0)`
- `@include margin(0 1rem)`
- `@include padding(1rem)`
- `@include size(100%, 50px)`
- `@include border-radius(0.5rem)`

## Reglas para IA

1. **No modificar** archivos en vendors
2. **Bourbon**: Importar en cada componente fourties: `@import "vendors/bourbon/bourbon"`
3. **Otras librerías**: Se importan en los cores o en componentes específicos que las usen
4. **Actualizaciones**: Coordinar con el equipo antes de actualizar versiones
