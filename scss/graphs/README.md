# Graphs – Estilos de gráficos

Estilos para gráficos y visualizaciones de datos. Principalmente **Chartist**.

## Estructura

```
graphs/
├── graphs.scss            # Punto de entrada (imports comentados)
├── chartist/
│   ├── base_chartist.scss
│   ├── chartist.scss
│   └── settings/
│       └── _chartist-settings.scss
├── _party-colors.scss     # Colores por partido (elecciones)
├── _custom-g.scss
├── _ct-series.scss       # Series Chartist
└── _ct-legend.scss       # Leyenda Chartist
```

## Uso

Los imports en `graphs.scss` pueden estar comentados; los gráficos se importan donde se necesitan (ej: en cores de marca o widgets).

## Chartist

Librería de gráficos. Los archivos `_ct-*` y `chartist/` contienen estilos para:
- Series de datos
- Leyendas
- Configuración base

## Casos de uso (cuándo usar cada pieza)

| Necesitas… | Usa | Nota |
|------------|-----|------|
| Gráfico de líneas/barras de datos editoriales (evolución, comparativa) | `chartist/` + `_ct-series` + `_ct-legend` | Requiere la dependencia `vendors/chartist` y el JS de Chartist en la página. |
| Gráfico de tarta/donut sencillo dentro de un artículo | Molécula `ft-mol-pie-chart` | Para un componente listo en el flujo DS; estos graphs son para gráficos a medida. |
| Colores por partido político en mapas/escaños | `_party-colors.scss` | Solo para widgets de elecciones. |
| Personalizar el estilo base de Chartist | `chartist/settings/_chartist-settings.scss` | Punto único para variables de Chartist. |

> **Cuándo NO usar graphs**: si solo necesitas un porcentaje simple o una barra de progreso, usa la molécula `ft-mol-bar` o `ft-mol-number-highlighted` en vez de montar un gráfico Chartist.

## Reglas para IA

1. **Uso específico**: Los graphs son para visualizaciones de datos, no para componentes UI
2. **Chartist**: Dependencia en `vendors/chartist`; los estilos aquí complementan
3. **Party colors**: `_party-colors.scss` para widgets de elecciones
4. **Import**: Verificar si graphs se importa en el core de la marca que lo use
