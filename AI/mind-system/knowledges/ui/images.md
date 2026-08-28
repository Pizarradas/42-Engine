# Imágenes y Fotografía en UI

## meta
- domain: ui
- subdomain: images
- source: "Best practices de fotografía en UI — Eagle, blogs de producto"
- goal: evaluar el uso de fotografías e imágenes raster en la interfaz
- agent_tags: [ui, audit]

---

## concepts

### Relevancia de la imagen
Una imagen que no refuerza el mensaje del contenido es ruido visual.
- En hero, cards y promos: la imagen debe apoyar o mostrar el producto real.
- Las imágenes genéricas de stock restan credibilidad e identidad.

### Consistencia de estilo fotográfico
Un conjunto de imágenes con estilos mixtos (color grading diferente, proporciones distintas, encuadres inconsistentes) fragmenta la identidad visual.
- Definir y mantener: proporciones, tratamiento de color y tipo de encuadre.

### Texto sobre imagen
El texto sobre imagen es siempre un problema de contraste potencial.
- La imagen cambia: el contraste garantizado hoy puede romperse si se cambia la foto.
- La solución siempre debe ser estructural: overlay, blur o caja sólida.

### Rendimiento y formato
Las imágenes son uno de los mayores contribuidores al peso de carga de una página.
- Formato moderno recomendado: WebP o AVIF.
- Resolución ajustada al uso real (no servir una imagen de 4000px para un thumbnail).

### Crops responsivos
La misma imagen con el mismo recorte en desktop y mobile puede perder el sujeto principal en pantallas pequeñas.
- Definir crops específicos por breakpoint para preservar el punto de interés.

---

## rules

### Relevance
```
check: image_supports_content
target: [image]
rule: context IN [hero, card, promo] AND image_unrelated_to_text → warning
output:
  dimension: relevance
  problem: Imagen poco relacionada con el contenido
  recommendations:
    - Usa imágenes que refuercen el mensaje o muestren el producto real

check: over_stock_feel
target: [hero_image]
rule: stock_cliche_score_high → warning
output:
  dimension: relevance
  problem: Imagen de stock genérica sin identidad
  recommendations:
    - Prioriza imágenes propias o stock específico de tu producto y usuarios
```

### Style & Brand
```
check: image_style_consistency
target: [image_set]
rule: mixed_color_grading OR mixed_aspect_ratios_without_pattern → warning
output:
  dimension: style_and_brand
  problem: Fotografías con estilos muy diferentes entre sí
  recommendations:
    - Unifica proporciones, tratamiento de color y tipo de encuadre
```

### Text on Image
```
check: text_contrast_on_image
target: [text_over_image]
rule: contrast_ratio(text, local_background) < 4.5 → issue
output:
  dimension: text_on_image
  problem: Contraste insuficiente del texto sobre la imagen
  recommendations:
    - Añade overlay, blur o caja sólida hasta lograr contraste adecuado

check: busy_background
target: [text_over_image]
rule: background_detail_level_high → warning
output:
  dimension: text_on_image
  problem: Fondo demasiado ruidoso detrás del texto
  recommendations:
    - Simplifica el fondo (blur, recorte) o mueve el texto a zona limpia
```

### Performance
```
check: image_format_and_size
target: [image]
rule: file_size_mb > threshold_for_context → warning
output:
  dimension: performance
  problem: Imagen posiblemente demasiado pesada
  recommendations:
    - Optimiza a WebP o AVIF y ajusta resolución al uso real

check: responsive_crops
target: [hero_image, banner]
rule: same_crop_desktop_mobile AND important_subject_cut_on_mobile → issue
output:
  dimension: performance
  problem: Recorte no adaptado a mobile
  recommendations:
    - Define crops específicos por breakpoint para preservar el sujeto principal
```

---

## checklist
- [ ] ¿Las imágenes refuerzan el mensaje del contenido donde aparecen?
- [ ] ¿Se evitan imágenes de stock genéricas en hero y cards?
- [ ] ¿El conjunto de imágenes tiene consistencia de estilo y proporción?
- [ ] ¿El texto sobre imagen tiene solución de contraste estructural?
- [ ] ¿Las imágenes están en formato moderno (WebP/AVIF) y resolución adecuada?
- [ ] ¿Los crops están adaptados a mobile para preservar el sujeto principal?
