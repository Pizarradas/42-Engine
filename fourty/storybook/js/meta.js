/* ════════════════════════════════════════════════════════════════════════
   42DS Storybook — METADATOS: versión + "chivatos" de cambios por componente
   ────────────────────────────────────────────────────────────────────────
   · version  → FALLBACK para la pastilla en la cabecera del sidebar.
   · changes  → { "<componentId>": "new" | "updated" }
                · "new"     → componente nuevo en esta versión.
                · "updated" → componente modificado respecto a la versión anterior.
       Pinta un badge (chivato) en el árbol junto al nombre del componente y habilita la faceta
       de filtro "Changed" (sección Status). El <componentId> es el `id` real del componente
       (igual que en amp-data.json / attachSubgroup), p.ej. "btn", "tapbar", "header-custom".

   CURADO A MANO (decisión del usuario): al tocar un componente, añade su id aquí con su estado.
   Al subir de versión y querer "resetear" los chivatos, depura `changes` dejando solo lo
   nuevo/cambiado de esa versión. La numeración visible del Storybook se toma primero de
   `storybook/data/changelog-data.js` (release más reciente) y solo usa `version` como fallback.

   Debe cargarse ANTES que core/storybook.js (window.SB_META lo lee el motor en boot).
   ════════════════════════════════════════════════════════════════════════ */
window.SB_META = {
    version: "183.6.3",        // fallback si SB_CHANGELOG no está disponible al arrancar
    // V.183.6.3 → mantener aquí solo los chivatos activos de la release vigente.
    changes: {
        "root": "new",
        "writer": "updated",
        "rrss": "updated",
        "masthead": "updated",
        "breadcrumb": "updated",
        "tapbar": "updated",
        "tooltip": "updated",
        "btn": "updated",
        "footer": "updated",
    },

    /* ──────────────────────────────────────────────────────────────────────
       CHANGELOG → el REGISTRO de releases vive en storybook/data/changelog-data.js
       (window.SB_CHANGELOG), fuente única que pinta la página "Docs › Changelog".
       Para publicar una release nueva: añade un objeto AL PRINCIPIO de ese array
       con su date ("YYYY-MM-DD") y su log (y, si quieres, `version`).

       `releases` aquí es solo FALLBACK offline opcional (si SB_CHANGELOG no cargara).
       Déjalo vacío salvo que quieras un respaldo embebido. */
    releases: []
};
