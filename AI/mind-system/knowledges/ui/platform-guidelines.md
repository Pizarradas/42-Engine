# Platform Guidelines (Apple HIG + Material Design 3)

## meta
- domain: platform-guidelines
- source: "Apple Human Interface Guidelines" + "Material Design 3 — Google"
- goal: validar que la UI respeta patrones y estándares de iOS, Android y web
- agent_tags: [ui, audit]

---

## concepts

### iOS (Apple HIG)
- Navegación primaria: **Tab Bar** (hasta 5 tabs). El hamburger menu no es el patrón nativo de iOS.
- Componentes nativos: segmented controls, navigation bars, action sheets, SF Symbols.
- Tipografía: escala SF (San Francisco). Respetar Dynamic Type para accesibilidad.
- Gestos: swipe back es nativo e imprescindible en flows de navegación.

### Android (Material Design 3)
- Navegación primaria: **Bottom Navigation** para 3–5 destinos. Navigation Drawer para destinos secundarios.
- Tokens de diseño: elevation, corner radius y color roles deben usarse con coherencia.
- Tipografía: escala Roboto / tokens de Material.
- FAB (Floating Action Button): patrón nativo de Android. En iOS es una intrusión.

### Web / Cross-platform
- No existe un estándar único, pero sí convenciones consolidadas (logo arriba-izquierda, nav horizontal o sidebar, carrito arriba-derecha en e-commerce).
- En web, priorizar accesibilidad WCAG y patrones conocidos por el usuario.

### Principio general
Usar patrones de otra plataforma sin razón genera fricción. El usuario de iOS espera comportamientos de iOS. El de Android, los suyos.

---

## rules

### Navigation — iOS
```
check: ios_nav_structure
target: [app_ios]
rule:
  - root_level_tabs > 5 → issue
  - hamburger_as_primary_nav → warning
output:
  platform: ios
  problem: Patrón de navegación no alineado con HIG
  recommendations:
    - Usa Tab Bar para secciones principales (máximo 5 tabs)
    - Evita hamburger como navegación primaria en iOS
```

### Navigation — Android
```
check: android_nav_structure
target: [app_android]
rule:
  - too_many_tabs_in_top_bar → issue
  - no_bottom_nav_for_many_top_level_destinations → warning
output:
  platform: android
  problem: Navegación inconsistente con Material Design
  recommendations:
    - Usa Bottom Navigation para 3–5 destinos principales
    - Lleva destinos secundarios al Navigation Drawer
```

### Components — iOS
```
check: ios_components
target: [app_ios]
rule: using_material_only_patterns (FAB, extended FAB) without_reason → warning
output:
  platform: ios
  problem: Componentes propios de otra plataforma
  recommendations:
    - Adapta a componentes nativos (segmented controls, navigation bars)
```

### Components — Android
```
check: material_components
target: [app_android]
rule: inconsistent_use_of_Material3_tokens (radius, elevation, color_roles) → issue
output:
  platform: android
  problem: Uso inconsistente de tokens Material 3
  recommendations:
    - Aplica elevation, corner radius y color roles de forma coherente
```

### Typography & Spacing
```
check: platform_typography_scale
target: [app_ios, app_android]
rule: not_using_platform_typography_scale → warning
output:
  problem: Escala tipográfica no alineada con la plataforma
  recommendations:
    - iOS: ajusta a escala SF / Dynamic Type
    - Android: ajusta a escala Roboto / tokens Material
```

### Gestures & Back Navigation
```
check: back_navigation
target: [app_ios, app_android]
rule: no_visible_back AND no_gesture_back → issue
output:
  problem: Sin patrón de navegación hacia atrás
  recommendations:
    - iOS: asegura swipe back o botón en navigation bar
    - Android: asegura botón back o gesto del sistema
```

---

## checklist
- [ ] ¿La navegación principal sigue el patrón de la plataforma (Tab Bar / Bottom Nav)?
- [ ] ¿Los componentes son nativos o equivalentes coherentes?
- [ ] ¿La tipografía respeta la escala de la plataforma?
- [ ] ¿Hay navegación hacia atrás clara y accesible?
- [ ] ¿Se evitan componentes propios de otra plataforma sin justificación?
