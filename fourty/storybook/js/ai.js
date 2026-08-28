/* ==========================================================================
   42DS Storybook - AI: pagina-doc standalone (sidebar "Docs > AI")
   --------------------------------------------------------------------------
   Documenta la carpeta AI del repo: el mind-system portable, sus modes, las
   tools/referencias externas, para que sirve cada uno y como invocarlos.

   UX (baja carga cognitiva): el contenido se reparte en TABS (un panel visible
   a la vez, role=tablist/tab/tabpanel). La pestaña "Empezar" trae un decision
   helper que recomienda el mode segun la intencion (recognition > recall). Las
   tablas pesadas (matriz de modes, 58 registros, coste) van en <details>
   plegados (divulgacion progresiva). El BUSCADOR es transversal: al escribir,
   se sale del modo tabs y se muestran las coincidencias de todas las secciones
   (abriendo los <details> que matcheen). Todo es client-side, sin re-render, con
   el estado en el DOM; delegacion en `document` registrada una vez (igual que el
   Changelog), asi que sobrevive a los re-render del overview al navegar.
   ========================================================================== */
(function () {
    "use strict";
    if (!window.SB || !window.SB.register) return;

    var docsTable = window.SB.helpers.docsTable;
    function icon(name, cls) { return (window.SB_ICONS && window.SB_ICONS.svg) ? window.SB_ICONS.svg(name, cls) : ""; }

    function cardTone(tone) { return tone ? " cb-ai__card--" + tone : ""; }

    function aiCard(cfg) {
        var meta = cfg || {};
        var modes = Array.isArray(meta.modes) && meta.modes.length
            ? '<div class="cb-ai__stack">' + meta.modes.map(function (mode) {
                return '<span class="cb-ai__mode">' + mode + '</span>';
            }).join("") + "</div>"
            : "";
        var body = Array.isArray(meta.items) && meta.items.length
            ? '<ul class="cb-ai__list">' + meta.items.map(function (item) {
                return "<li>" + item + "</li>";
            }).join("") + "</ul>"
            : (meta.body || "");

        return '<article class="cb-ai__card' + cardTone(meta.tone) + '">'
            + (meta.eyebrow ? '<div class="cb-ai__eyebrow">' + meta.eyebrow + "</div>" : "")
            + (meta.title ? '<h3 class="cb-ai__cardTitle">' + meta.title + "</h3>" : "")
            + (meta.lead ? '<p class="cb-ai__cardLead">' + meta.lead + "</p>" : "")
            + modes
            + body
            + "</article>";
    }

    function aiStep(num, title, body, example) {
        return '<article class="cb-ai__step">'
            + '<div class="cb-ai__stepNo">' + num + "</div>"
            + '<div class="cb-ai__stepBody">'
            + '<h3 class="cb-ai__stepTitle">' + title + "</h3>"
            + '<p>' + body + "</p>"
            + (example ? '<p class="cb-ai__stepExample">' + example + "</p>" : "")
            + "</div>"
            + "</article>";
    }

    function tokenBar(label, score, tone, note) {
        var value = Math.max(0, Math.min(100, score || 0));
        return '<article class="cb-ai__tokenBar cb-ai__tokenBar--' + tone + '">'
            + '<div class="cb-ai__tokenHead">'
            + '<strong>' + label + "</strong>"
            + '<span class="cb-ai__tokenScore">' + value + "/100</span>"
            + "</div>"
            + '<div class="cb-ai__tokenMeter" aria-hidden="true"><span class="cb-ai__tokenFill" style="width:' + value + '%"></span></div>'
            + '<p class="cb-ai__tokenNote">' + note + "</p>"
            + "</article>";
    }

    /* Un bloque tematico filtrable. `keywords` son terminos extra de busqueda
       (sinonimos que pueden no estar visibles); el buscador los combina con el
       textContent del bloque. */
    function aiBlock(topic, keywords, inner) {
        return '<section class="cb-ai__block" data-block data-topic="' + topic + '"'
            + ' data-search="' + (keywords || "") + '">' + inner + "</section>";
    }

    /* Tabla pesada en divulgacion progresiva: arranca plegada; el buscador la abre
       si su contenido matchea, y al limpiar vuelve a su estado por defecto. */
    function aiMore(summary, inner) {
        return '<details class="cb-ai__more"><summary class="cb-ai__moreSum">' + summary + '</summary>'
            + '<div class="cb-ai__moreBody">' + inner + '</div></details>';
    }

    /* ─── Decision helper de "Empezar": intencion -> mode recomendado. ─── */
    var INTENTS = [
        { q: "Auditar o idear sin Design System", modes: "[MODE: UX] · [MODE: UI] · [MODE: UX+UI]", tip: "Analiza o genera estructura, flujos y/o capa visual sin clases del sistema." },
        { q: "Construir una pantalla con clases 42DS", modes: "[MODE: 42DS+HF]", tip: "POC de alta fidelidad con el inventario real. Usa +LF/+AI para otra fidelidad, o +CSS/+SCSS para ajustes locales." },
        { q: "Recomponer algo solo con piezas ya existentes", modes: "[MODE: 42DS+REUSE]", tip: "Reuse-only, sin tocar SCSS ni JS. Usa +REUSE-FIRST si quieres rastrear el DS y dejar candidatos promovibles." },
        { q: "Tocar el SCSS o el JS canonico del DS", modes: "[MODE: 42DS+SCSS] · [MODE: 42DS+JS]", tip: "Actua sobre scss/fourties/ o cds-statics/js/ y su documentacion asociada." },
        { q: "Trabajar un override CSS de la carpeta beta", modes: "[MODE: BETA+CSS]", tip: "Overrides CSS a mano de cds-statics/beta/ + un registro .md por archivo (que/cuando/por que). No es API nueva: eso va en scss/." },
        { q: "Documentar (guia front, nota dev, cambio o decision)", modes: "[MODE: FRONT+DOC] · [MODE: DEV+DOC] · [MODE: CHANGE+DOC] · [MODE: ADR]", tip: "Genera .md fuera del storybook, segun la audiencia y el objetivo del documento." },
        { q: "Operar este storybook interno", modes: "[MODE: STORYBOOK+DOC] · [MODE: STORYBOOK+MIGRATE]", tip: "+DOC opera overviews, engine y data; +MIGRATE traduce showroom legado al POC interno." },
        { q: "Optimizar o auditar el motor del storybook", modes: "[MODE: STORYBOOK+ENGINE]", tip: "Rendimiento, auditoría y afinado del motor (loader, árbol, search, iframe, data, CSS) SIN cambiar comportamiento ni features. Para features nuevas del chrome usa +DOC (engine)." },
        { q: "Construir un email cross-client", modes: "[EMAIL]", tip: "HTML de correo robusto para Gmail, Outlook y Apple Mail." },
        { q: "Tomar una referencia visual externa", modes: "[MODE: UI]", tip: "Apoyate en un DESIGN.md de AI/tools/awesome-design como guia de estilo (mira la pestana Tools)." }
    ];
    function pickHelper() {
        var opts = INTENTS.map(function (it, i) {
            return '<button type="button" class="cb-ai__pickOpt" data-pick="' + i + '" aria-pressed="false">'
                + '<span class="cb-ai__pickOptIco" aria-hidden="true"></span>' + it.q + '</button>';
        }).join("");
        var results = INTENTS.map(function (it, i) {
            var modes = it.modes.split(" · ").map(function (m) { return '<code>' + m + '</code>'; }).join(" ");
            return '<div class="cb-ai__pickRes" data-pick-res="' + i + '" hidden>'
                + '<div class="cb-ai__pickEyebrow">Mode recomendado</div>'
                + '<div class="cb-ai__pickModes">' + modes + '</div>'
                + '<p class="cb-ai__pickTip">' + it.tip + '</p>'
                + '</div>';
        }).join("");
        return '<div class="cb-ai__pick">'
            + '<div class="cb-ai__pickOpts" role="group" aria-label="Que quieres hacer">' + opts + '</div>'
            + '<div class="cb-ai__pickPanel">'
            + '<p class="cb-ai__pickEmpty">Elige una opcion para ver el mode recomendado y como empezar.</p>'
            + results
            + '</div></div>';
    }

    /* ─── Contenido reutilizable (tarjetas, reglas, grafico de tokens). ─── */
    var familyCards = [
        aiCard({
            tone: "blue", eyebrow: "Sin DS", title: "Pensar antes de implementar",
            lead: "Para auditoria, estructura, flujos y capa visual cuando todavia no necesitas clases del sistema.",
            modes: ["<code>[MODE: UX]</code>", "<code>[MODE: UI]</code>", "<code>[MODE: UX+UI]</code>"],
            items: [
                "Usa <strong>UX</strong> para arquitectura, labels, estados y accesibilidad semantica.",
                "Usa <strong>UI</strong> para jerarquia visual, color, espaciado y legibilidad.",
                "Usa <strong>UX+UI</strong> cuando quieras una propuesta HF completa sin 42DS."
            ]
        }),
        aiCard({
            tone: "green", eyebrow: "42DS", title: "Construir con el inventario real del sistema",
            lead: "Cubre desde POCs rapidos hasta trabajo estricto sobre SCSS o JavaScript canonico del DS.",
            modes: [
                "<code>[MODE: 42DS+LF]</code>", "<code>[MODE: 42DS+HF]</code>", "<code>[MODE: 42DS+AI]</code>",
                "<code>[MODE: 42DS+REUSE]</code>", "<code>[MODE: 42DS+REUSE-FIRST]</code>",
                "<code>[MODE: 42DS+SCSS]</code>", "<code>[MODE: 42DS+JS]</code>"
            ],
            items: [
                "<strong>REUSE</strong> recompone solo con piezas existentes.",
                "<strong>REUSE-FIRST</strong> rastrea el DS completo y deja candidatos promovibles.",
                "<strong>SCSS</strong> y <strong>JS</strong> actuan sobre las capas canonicas del sistema."
            ]
        }),
        aiCard({
            tone: "amber", eyebrow: "Storybook", title: "No mezclar Storybook upstream con este POC interno",
            lead: "Una cosa es el ecosistema Storybook real y otra este runtime interno de documentacion.",
            modes: ["<code>[MODE: STORYBOOK]</code>", "<code>[MODE: STORYBOOK+MIGRATE]</code>", "<code>[MODE: STORYBOOK+DOC]</code>", "<code>[MODE: STORYBOOK+ENGINE]</code>"],
            items: [
                "<strong>STORYBOOK</strong> trabaja sobre proyectos consumidores con CSF, MDX y tests.",
                "<strong>+MIGRATE</strong> traduce showroom legado al POC interno.",
                "<strong>+DOC</strong> opera overviews, engine, data layer, assets y chrome del storybook interno.",
                "<strong>+ENGINE</strong> audita y optimiza el <strong>rendimiento</strong> del motor sin cambiar comportamiento (features nuevas = +DOC)."
            ]
        }),
        aiCard({
            tone: "rose", eyebrow: "Emailing", title: "HTML de correo cross-client",
            lead: "Modo especializado para construir emails robustos en Gmail, Outlook y Apple Mail.",
            modes: ["<code>[EMAIL]</code>"],
            items: [
                "Se centra en compatibilidad real de clientes de correo, no en componentes del DS.",
                "Es el punto de entrada cuando la entrega final es una pieza de emailing y no una pagina web."
            ]
        }),
        aiCard({
            tone: "blue", eyebrow: "Docs", title: "Documentacion tecnica fuera del storybook",
            lead: "Familia documental para generar .md mas profundos que el Overview, con contexto accionable.",
            modes: ["<code>[MODE: FRONT+DOC]</code>", "<code>[MODE: DEV+DOC]</code>", "<code>[MODE: CHANGE+DOC]</code>", "<code>[MODE: ADR]</code>"],
            items: [
                "<strong>FRONT+DOC</strong> explica anatomy, clases, estados, dependencias e integracion.",
                "<strong>DEV+DOC</strong> baja a arquitectura, contratos, riesgos y extension.",
                "<strong>CHANGE+DOC</strong> y <strong>ADR</strong> dejan traza de cambios y decisiones."
            ]
        }),
        aiCard({
            tone: "slate", eyebrow: "Beta CSS", title: "Overrides CSS controlados, fuera del pipeline",
            lead: "Para los <code>.css</code> escritos a mano de <code>cds-statics/beta/</code> (la única carpeta de artefactos editable a mano) y su registro de cambios.",
            modes: ["<code>[MODE: BETA+CSS]</code>"],
            items: [
                "Trabaja overrides que <strong>pisan</strong> reglas del DS en cascada; nunca define componentes/clases nuevas (eso es <code>scss/</code>).",
                "Mantiene por cada <code>&lt;feature&gt;.css</code> un <strong>registro <code>&lt;feature&gt;.md</code></strong> hermano: qué cambió, cuándo, por qué y hasta cuándo.",
                "Operaciones: <strong>register · add · modify · promote · retire · audit</strong>. La promoción real a <code>scss/</code> se delega a <code>[MODE: 42DS+SCSS]</code>."
            ]
        })
    ].join("");

    var quickRules = [
        aiCard({ tone: "blue", eyebrow: "Regla 01", title: "Los modes mandan", body: '<p>El prefijo define alcance, fuentes de verdad, formato de salida y nivel de autonomia. No es una etiqueta cosmetica.</p>' }),
        aiCard({ tone: "amber", eyebrow: "Regla 02", title: "No todo combina", body: '<p><code>+MIGRATE</code>, <code>+DOC</code> y <code>+ENGINE</code> son especializaciones standalone. No se usan como sufijos libres para cualquier flujo.</p>' }),
        aiCard({ tone: "green", eyebrow: "Regla 03", title: "El repo real siempre desempata", body: '<p>Si falta una capa operativa en la spec, el agente debe bajar al codigo, a los README y a la documentacion viva del repo.</p>' }),
        aiCard({ tone: "rose", eyebrow: "Regla 04", title: "Escala cuando cambie el tipo de trabajo", body: '<p>Si un retoque deja de ser reuse-only y ya necesita SCSS o JS nuevo, deja de ser <code>42DS+REUSE</code> y pasa a otro mode de la familia 42DS.</p>' })
    ].join("");

    var tokenChart = '<div class="cb-ai__tokenViz" role="img" aria-label="Escala relativa de consumo de tokens por patron de uso">'
        + tokenBar('<code>[MODE: UX]</code> · <code>[MODE: UI]</code>', 26, "blue", "Una sola capa activa y menos validaciones.")
        + tokenBar('<code>[MODE: UX+UI]</code>', 44, "green", "Dos fases encadenadas: estructura y despues visual.")
        + tokenBar('<code>[MODE: 42DS+HF]</code> · <code>[MODE: 42DS+REUSE]</code>', 63, "amber", "Ademas del output, requieren leer inventario y restricciones del DS.")
        + tokenBar('<code>[MODE: 42DS+HF+UX+UI]</code> · <code>[MODE: 42DS+REUSE+UX]</code>', 86, "rose", "Generan y luego auditan: mas contexto, mas reglas y mas chequeos.")
        + tokenBar('<code>[MODE: STORYBOOK+DOC]</code> · <code>[MODE: STORYBOOK+ENGINE]</code> · <code>[MODE: 42DS+SCSS]</code> · <code>[MODE: 42DS+JS]</code> · <code>[MODE: BETA+CSS]</code>', 71, "slate", "Su coste varia con el repo porque pueden exigir leer stories, SCSS, JS, overrides, el motor y READMEs.")
        + "</div>"
        + '<p class="cb-note">La escala es <strong>relativa</strong>, no una medicion exacta: visualiza que las combinaciones y los modes mas operativos suelen cargar mas contexto que un mode simple.</p>';

    /* Registros de awesome-design: [slug-carpeta, nombre visible]. Fuente: el H1 de cada
       design-md/<slug>/DESIGN.md. La tabla se genera por .map para no teclear 58 filas. */
    var REGISTRIES = [
        ["airbnb", "Airbnb"], ["airtable", "Airtable"], ["apple", "Apple"], ["bmw", "BMW"],
        ["cal", "Cal.com"], ["claude", "Claude (Anthropic)"], ["clay", "Clay"], ["clickhouse", "ClickHouse"],
        ["cohere", "Cohere"], ["coinbase", "Coinbase"], ["composio", "Composio"], ["cursor", "Cursor"],
        ["elevenlabs", "ElevenLabs"], ["expo", "Expo"], ["ferrari", "Ferrari"], ["figma", "Figma"],
        ["framer", "Framer"], ["hashicorp", "HashiCorp"], ["ibm", "IBM"], ["intercom", "Intercom"],
        ["kraken", "Kraken"], ["lamborghini", "Lamborghini"], ["linear.app", "Linear"], ["lovable", "Lovable"],
        ["minimax", "MiniMax"], ["mintlify", "Mintlify"], ["miro", "Miro"], ["mistral.ai", "Mistral AI"],
        ["mongodb", "MongoDB"], ["notion", "Notion"], ["nvidia", "NVIDIA"], ["ollama", "Ollama"],
        ["opencode.ai", "OpenCode"], ["pinterest", "Pinterest"], ["posthog", "PostHog"], ["raycast", "Raycast"],
        ["renault", "Renault"], ["replicate", "Replicate"], ["resend", "Resend"], ["revolut", "Revolut"],
        ["runwayml", "Runway"], ["sanity", "Sanity"], ["sentry", "Sentry"], ["spacex", "SpaceX"],
        ["spotify", "Spotify"], ["stripe", "Stripe"], ["supabase", "Supabase"], ["superhuman", "Superhuman"],
        ["tesla", "Tesla"], ["together.ai", "Together AI"], ["uber", "Uber"], ["vercel", "Vercel"],
        ["voltagent", "VoltAgent"], ["warp", "Warp"], ["webflow", "Webflow"], ["wise", "Wise"],
        ["x.ai", "xAI"], ["zapier", "Zapier"]
    ];
    var registryRows = REGISTRIES.map(function (r) {
        return ['<strong>' + r[1] + '</strong>', '<code>design-md/' + r[0] + '/</code>'];
    });

    /* Set propio derivado del DS: DESIGN.md por cabecera de Prensa Iberica. */
    var PI_BRANDS = [
        ["Sport", "sport", "#ec0918 (rojo)"],
        ["El Periódico", "el-periodico", "#f53036 (rojo)"],
        ["El Periódico de España", "el-periodico-de-espana", "#0034dd (azul)"],
        ["Regionales (umbrella)", "regionales", "#136496 + color por cabecera"],
        ["Revistas (Woman · Viajar · Cuore · Stilo)", "revistas", "color por revista"]
    ];
    var piRows = PI_BRANDS.map(function (b) {
        return ['<strong>' + b[0] + '</strong>', '<code>prensa-iberica/' + b[1] + '/</code>', b[2]];
    });

    /* ════════════════════ BLOQUES (se reparten en panels) ════════════════════ */

    /* — Empezar — */
    var bEmpezarIntro = aiBlock("empezar",
        "empezar inicio que es esto decision helper que quieres hacer guia novato orientacion intencion",
        '<h2>Empezar aqui</h2>'
        + '<p class="cb-docs__lead">El sistema de <strong>modes</strong> te deja pedir trabajo a cualquier agente (Claude, Codex…) con un contrato claro: cada prefijo <code>[MODE: …]</code> define alcance, fuentes de verdad y formato de salida. Si no sabes cual usar, empieza por aqui.</p>'
        + '<h3>¿Que quieres hacer?</h3>'
        + pickHelper());

    var bEmpezarHow = aiBlock("empezar",
        "como invocar pasos brief prefijo plantilla basica escribir prompt",
        '<h2>Como invocarlo bien</h2>'
        + '<div class="cb-ai__steps">'
        + aiStep("1", "Elige el carril", 'Escoge el mode por el tipo de trabajo real, no por costumbre ni por el ultimo caso parecido.', '<code>[MODE: 42DS+REUSE]</code> si quieres redisenar con piezas ya existentes.')
        + aiStep("2", "Escribe el brief minimo util", 'Describe pieza, flujo, restriccion, dependencia y resultado esperado. Cuanto mejor acotes, menos ambiguedad arrastra el agent.', '<code>[MODE: STORYBOOK+DOC] Amplia el Overview de Masthead con dependencias y advertencias</code>')
        + aiStep("3", "Baja a las fuentes de verdad", 'Cruza la spec del mode con el repo vivo para confirmar clases, estructura, JS, README y documentacion asociada.', '<code>AGENTS.md</code>, <code>CLAUDE.md</code>, <code>scss/fourties/</code>, <code>fourty/storybook/</code>')
        + "</div>"
        + '<div class="cb-callout cb-callout--usage"><strong>Como se escribe.</strong> Empieza por el prefijo exacto y luego el encargo en lenguaje natural. Casi todos usan <code>[MODE: ...]</code>; emailing usa <code>[EMAIL]</code> o <code>[EMAIL: SUBMODO]</code>.<br>Ejemplo: <code>[MODE: 42DS+HF] Necesito un POC de una tarjeta de suscripcion con CTA y precio.</code></div>'
        + '<p class="cb-note">¿Necesitas combinar modes o ver el detalle? Mira la pestana <strong>Elegir mode</strong> para la matriz completa y las reglas de composicion.</p>');

    var bNovedades = aiBlock("empezar",
        "novedades cambios recientes changelog que hay de nuevo tools prensa iberica rediseño email gobernanza marca ep epe beta css override registro md ficha readme componente storybook",
        '<h2>Novedades</h2>'
        + '<p class="cb-note">Últimos cambios del sistema AI y de esta documentación · jul 2026.</p>'
        + '<ul class="cb-ai__list">'
        + '<li><strong>Nuevo mode <code>[MODE: STORYBOOK+ENGINE]</code></strong> — modo operacional <em>no funcional</em> para el <strong>rendimiento, la auditoría y el afinado del motor</strong> del storybook POC (loader, árbol/render perezoso, refresh coalescido, search, iframe, inspector, data/CSV y CSS del chrome). Es <strong>behavior-preserving</strong>: acelera/robustece sin cambiar features ni contrato (las features nuevas del chrome siguen siendo <code>[MODE: STORYBOOK+DOC]</code> op engine). Operaciones: <strong>audit · profile · optimize · refactor · harden</strong>. <em>Ver pestañas <strong>Elegir mode</strong> e <strong>Invocar</strong>.</em></li>'
        + '<li><strong>Nuevo mode <code>[MODE: BETA+CSS]</code></strong> — modo operacional standalone para <code>cds-statics/beta/</code>: trabaja los <strong>overrides CSS escritos a mano</strong> (la única carpeta de artefactos editable a mano) y mantiene por cada <code>&lt;feature&gt;.css</code> un <strong>registro <code>&lt;feature&gt;.md</code></strong> hermano que documenta qué se cambió, cuándo y por qué. Operaciones: register · add · modify · promote · retire · audit. <em>Ver pestañas <strong>Elegir mode</strong> e <strong>Invocar</strong>.</em></li>'
        + '<li><strong>Fichas README por componente del storybook</strong> — cada <code>js/&lt;nivel&gt;/&lt;x&gt;/</code> tiene ahora un <code>README.md</code> de contexto para agentes (identidad, clase raíz, señales, stories, trazabilidad), más un índice por nivel. Su sincronización está cableada en <code>[MODE: STORYBOOK+MIGRATE]</code> (alta) y <code>[MODE: STORYBOOK+DOC]</code> (modify/deprecate).</li>'
        + '<li><strong>Tools · awesome-design</strong> — nuevo segmento que documenta las referencias <code>DESIGN.md</code>: qué es, cómo se usa, ejemplos, cómo <strong>combinarlo con <code>[MODE: UI]</code> / <code>[MODE: UX+UI]</code></strong> para mejorar resultados, y los 58 registros externos. <em>Ver pestaña <strong>Tools</strong>.</em></li>'
        + '<li><strong>DESIGN.md propios de Prensa Ibérica</strong> — set <code>prensa-iberica/</code> con las reglas estéticas por cabecera (Sport, El Periódico, El Periódico de España, Regionales, Revistas) derivadas de los <code>setting.css</code> reales del DS, para que el agente produzca acorde a cada marca. <em>Ver pestaña <strong>Tools</strong>.</em></li>'
        + '<li><strong>Reglas por defecto + escala tipográfica</strong> — los <code>DESIGN.md</code> de Prensa Ibérica incorporan una <strong>sección 0 de defaults overridables</strong> (tipografía del DS, botones del DS, radius <code>0.5rem</code>, sin <code>uppercase</code>, equilibrio de bordes) y un modificador <strong><code>[TYPESCALE: …]</code></strong> (presets de ratio estilo typescale.com) combinable con cualquier <code>[MODE: …]</code> para variar la jerarquía tipográfica. <em>Ver pestaña <strong>Tools</strong>.</em></li>'
        + '<li><strong>Rediseño de esta página</strong> — navegación por pestañas, <em>decision helper</em> en «Empezar», tablas densas plegables (divulgación progresiva) y buscador transversal a todas las secciones.</li>'
        + '<li><strong>Gobernanza al día</strong> — <code>[EMAIL]</code> registrado en <code>governance.md</code> como mode standalone; coherencia showroom→storybook; e identidades de marca corregidas en todo el sistema: <code>ep</code> = El Periódico, <code>epe</code> = El Periódico de España (<code>elp</code> reservado para El País, que no es marca del DS).</li>'
        + '</ul>'
        + '<p class="cb-note">El registro completo de releases del proyecto vive en <strong>Docs › Changelog</strong>.</p>');

    /* — Elegir mode — */
    var bFamilias = aiBlock("modes",
        "familias carriles panorama mapa sin ds 42ds storybook emailing docs",
        '<h2>Mapa rapido de familias</h2>'
        + '<p class="cb-note">Antes de mirar la tabla grande, ubica la familia de trabajo. Asi eliges el carril correcto sin leer toda la spec.</p>'
        + '<div class="cb-callout cb-callout--warn"><strong>Diferencia clave.</strong> <code>[MODE: STORYBOOK]</code> apunta a Storybook upstream en proyectos consumidores. <code>[MODE: STORYBOOK+MIGRATE]</code> y <code>[MODE: STORYBOOK+DOC]</code> operan sobre este storybook interno de <code>fourty/storybook/</code>. No son equivalentes ni se mezclan.</div>'
        + '<div class="cb-ai__grid cb-ai__grid--families">' + familyCards + "</div>");

    var bMatrix = aiBlock("modes",
        "modo por necesidad matriz indice prefijo cual usar lista completa de modes tabla beta css override cds-statics",
        '<h2>Modo por necesidad</h2>'
        + '<p class="cb-note">Indice de consulta cuando ya sabes el tipo de encargo y solo quieres verificar el prefijo. Plegado por defecto para no abrumar.</p>'
        + aiMore('Ver la matriz completa de modes (21)', docsTable({
            variant: "matrix",
            columns: [
                { label: "Necesidad", width: "24%" },
                { label: "Mode", width: "27%" },
                { label: "Que resuelve", width: "49%" }
            ],
            rows: [
                ['Auditar o idear UX sin Design System', '<code>[MODE: UX]</code>', 'Analiza o genera estructura, flujos, labels, estados y accesibilidad semantica.'],
                ['Auditar o idear UI sin Design System', '<code>[MODE: UI]</code>', 'Analiza o genera capa visual, jerarquia, color, espaciado y legibilidad.'],
                ['Disenar HF sin DS', '<code>[MODE: UX+UI]</code>', 'Encadena UX + UI para producir una propuesta completa sin 42DS.'],
                ['POC rapido o detallado en 42DS', '<code>[MODE: 42DS+LF]</code> <br><code>[MODE: 42DS+HF]</code> <br><code>[MODE: 42DS+AI]</code>', 'Construye HTML con clases del sistema en baja, alta o IA fidelity segun el nivel de definicion que necesites.'],
                ['POC HF con CSS local', '<code>[MODE: 42DS+HF+CSS]</code>', 'Genera un POC 42DS de alta fidelidad con un <code>&lt;style&gt;</code> local para ajustes puntuales.'],
                ['POC HF con parciales SCSS', '<code>[MODE: 42DS+HF+SCSS]</code>', 'Genera un POC 42DS de alta fidelidad apoyado en parciales SCSS fuera del core del DS.'],
                ['POC reuse-first que pueda enriquecer el DS', '<code>[MODE: 42DS+REUSE-FIRST]</code>', 'Rastrea el DS completo, reusa antes de crear y deja trazabilidad de extensiones o candidatos.'],
                ['Redisenar solo con inventario construido', '<code>[MODE: 42DS+REUSE]</code>', 'Compone usando items reales del DS, sin tocar SCSS ni crear JS nuevo.'],
                ['Reuse-only con ajuste local puntual', '<code>[MODE: 42DS+REUSE+CSS]</code>', 'Permite un <code>&lt;style&gt;</code> local dentro del HTML para ajustes ad hoc controlados.'],
                ['Construir o consolidar una pieza del DS', '<code>[MODE: 42DS+SCSS]</code>', 'Trabaja sobre el SCSS canonico del sistema y su documentacion asociada.'],
                ['Trabajar el comportamiento JS del DS', '<code>[MODE: 42DS+JS]</code>', 'Actua sobre <code>cds-statics/js/</code>: controllers, autoinit, APIs publicas, ARIA dinamica, orden de carga y READMEs tecnicos.'],
                ['Override CSS controlado en <code>beta/</code>', '<code>[MODE: BETA+CSS]</code>', 'Trabaja los <code>.css</code> a mano de <code>cds-statics/beta/</code> y mantiene un registro <code>.md</code> por archivo (qué, cuándo, por qué). Solo overrides, nunca API nueva.'],
                ['Generar guia de implementacion para front', '<code>[MODE: FRONT+DOC]</code>', 'Produce un <code>.md</code> con anatomy, clases, dependencias, integracion y checklist de implementacion.'],
                ['Generar documento tecnico para desarrollo', '<code>[MODE: DEV+DOC]</code>', 'Produce un <code>.md</code> de arquitectura, contratos, edge cases, riesgos y estrategia de evolucion.'],
                ['Documentar un cambio entregado', '<code>[MODE: CHANGE+DOC]</code>', 'Produce un <code>.md</code> con que se ha hecho, impacto, migraciones, deprecaciones y pendientes.'],
                ['Registrar una decision tecnica', '<code>[MODE: ADR]</code>', 'Produce un ADR con contexto, decision, alternativas y consecuencias.'],
                ['Storybook upstream de proyectos consumidores', '<code>[MODE: STORYBOOK]</code>', 'Crea o audita stories, docs MDX y tests del ecosistema Storybook real.'],
                ['Migrar showroom al storybook interno', '<code>[MODE: STORYBOOK+MIGRATE]</code>', 'Traduce piezas del showroom al modulo JS/HTML de este POC interno.'],
                ['Operar stories, docs, engine o data de este storybook', '<code>[MODE: STORYBOOK+DOC]</code>', 'Modifica overviews, stories, toolbar, data layer, assets o chrome del storybook interno.'],
                ['Optimizar o auditar el motor del storybook', '<code>[MODE: STORYBOOK+ENGINE]</code>', 'Rendimiento, auditoría y afinado del motor (loader, árbol, search, iframe, data, CSS) sin cambiar comportamiento ni contrato. Features nuevas = <code>+DOC</code> op engine.'],
                ['Construir emails', '<code>[EMAIL]</code>', 'Genera HTML cross-client para Gmail, Outlook y Apple Mail.']
            ]
        })));

    var bReglas = aiBlock("modes",
        "reglas uso rapido gobernanza combinacion conflictos jerarquia escalar",
        '<h2>Reglas de uso rapido</h2>'
        + '<div class="cb-ai__grid cb-ai__grid--rules">' + quickRules + "</div>");

    /* — Invocar — */
    var bPlantillas = aiBlock("invocar",
        "plantillas de prompt patrones brief multilinea auditoria posterior emailing submodo copiable",
        '<h2>Plantillas de prompt</h2>'
        + '<p class="cb-note">La sintaxis es portable: funciona igual en Codex, Claude u otro agente con el sistema cargado. Empieza por el prefijo exacto y luego el encargo en lenguaje natural.</p>'
        + '<div class="cb-callout cb-callout--usage"><strong>Excepcion importante.</strong> Casi todos los modos usan <code>[MODE: ...]</code>, pero emailing usa <code>[EMAIL]</code> o <code>[EMAIL: SUBMODO]</code>.</div>'
        + docsTable({
            columns: ["Patron", "Cuando usarlo", "Ejemplo copiable"],
            rows: [
                ['Prefijo + una frase directa', 'Casos simples o peticiones muy concretas.', '<code>[MODE: STORYBOOK+DOC] Amplia la documentacion de Dropdown con una tabla de dependencias y un aviso de JS.</code>'],
                ['Prefijo + brief multilinea', 'Cuando necesitas dar mas contexto, restricciones o referencias.', '<code>[MODE: 42DS+REUSE]\nRediseña este bloque de portada reutilizando solo items ya existentes del DS.\nNo toques SCSS ni JS.\nDocumenta qué piezas dependen de JavaScript.</code>'],
                ['Mode + auditoria posterior', 'Cuando quieres generar primero y revisar despues.', '<code>[MODE: 42DS+REUSE+UX]\nCompón una cabecera editorial con piezas ya construidas y después audita la jerarquía de acciones y estados.</code>'],
                ['Emailing con submodo', 'Para alta, QA, fixes o componentes de email.', '<code>[EMAIL: QA]\nexternals/emailing/templates/newsletter-semanal-v1.html\nRevisa la plantilla con checklist completo, riesgos de Outlook y validacion de Email on Acid pendiente.</code>']
            ]
        }));

    var bRuntime = aiBlock("invocar",
        "ejemplos por runtime codex claude gemini forma recomendada",
        '<h2>Ejemplos por runtime</h2>'
        + docsTable({
            variant: "dense",
            columns: ["Runtime", "Forma recomendada"],
            rows: [
                ['Codex', '<code>[MODE: STORYBOOK+DOC] Añade una nueva categoria Docs &gt; AI explicando los modes y ejemplos de uso.</code>'],
                ['Claude', '<code>[MODE: 42DS+SCSS]\nNecesito consolidar esta variante como modificador canónico del componente.</code>'],
                ['Claude / Codex para emails', '<code>[EMAIL: FIX]\nEl boton principal se ve cuadrado en Outlook 2019. Aplica el fix minimo y explica por qué.</code>'],
                ['Cualquier agente con este sistema', '<code>[MODE: UX+UI]\nDiseña una landing HF sin DS para captar suscriptores y luego deja claro cómo escalarla a 42DS.</code>']
            ]
        }));

    var bInvocaciones = aiBlock("invocar",
        "invocaciones recomendadas caso invocacion ejemplos por mode beta css override cds-statics registro md",
        '<h2>Invocaciones recomendadas</h2>'
        + aiMore('Ver el listado por caso (14)', docsTable({
            variant: "dense",
            columns: [
                { label: "Caso", width: "27%" },
                { label: "Invocacion", width: "73%" }
            ],
            rows: [
                ['Revisar usabilidad', '<code>[MODE: UX] Audita esta interfaz de suscripcion...</code>'],
                ['Crear una pieza visual sin DS', '<code>[MODE: UX+UI] Disena una landing para...</code>'],
                ['Montar una pantalla con clases 42DS', '<code>[MODE: 42DS+HF] Necesito un POC de...</code>'],
                ['Reusar el DS sin ampliarlo', '<code>[MODE: 42DS+REUSE] Recompone esta portada usando solo items existentes...</code>'],
                ['Anadir solo CSS local excepcional', '<code>[MODE: 42DS+REUSE+CSS] Ajusta esta composicion sin tocar SCSS...</code>'],
                ['Tomar una design language de referencia', '<code>[MODE: UI] Disena una landing inspirada en el DESIGN.md de Vercel de AI/tools/awesome-design...</code>'],
                ['Modificar JS canonico del sistema', '<code>[MODE: 42DS+JS] Refactoriza el dropdown simple del DS para que sea idempotente...</code>'],
                ['Generar una guia para front', '<code>[MODE: FRONT+DOC] Crea un .md para front de Masthead con anatomy, dependencias y recomendaciones Vue/React...</code>'],
                ['Generar una nota tecnica de desarrollo', '<code>[MODE: DEV+DOC] Documenta la arquitectura de Dropdown, contratos ARIA y riesgos de reinicializacion...</code>'],
                ['Dejar trazado un cambio', '<code>[MODE: CHANGE+DOC] Resume la renovacion de la documentacion AI, impactos y pendientes...</code>'],
                ['Migrar una pieza al storybook interno', '<code>[MODE: STORYBOOK+MIGRATE] Migra molecule-modal al POC interno...</code>'],
                ['Modificar docs o stories internas', '<code>[MODE: STORYBOOK+DOC] Amplia la documentacion de Dropdown...</code>'],
                ['Documentar un override beta', '<code>[MODE: BETA+CSS] Documenta cerca.css: genera cerca.md con ficha, registro de cambios e inventario...</code>'],
                ['Optimizar/auditar el motor del storybook', '<code>[MODE: STORYBOOK+ENGINE] El sidebar carga lento y a veces no salen todos los items; audita el motor y afínalo sin cambiar comportamiento...</code>']
            ]
        })));

    /* — Tools — */
    var bTools = aiBlock("tools",
        "tools herramientas referencias externas awesome-design design.md stitch google vercel geist apple stripe linear notion figma inspiracion benchmark voltagent preview catalogo marcas design language agents.md que es como se usa pasos workflow concepto preview.html preview-dark.html contributing prensa iberica sport el periodico de espana regionales revistas woman viajar cuore stilo reglas propias por marca cabecera combinar combinacion modes ui ux+ui auditar evaluativo fuente no es un mode mejorar resultados componible reglas por defecto overridables seccion 0 tipografia font-stack media sans botones border-radius 0.5 uppercase bordes cajas equilibrio typescale escala tipografica modular ratio modular scale minor major third perfect fourth fifth golden augmented base remapeo de steps presets",
        '<h2>Tools y referencias externas</h2>'
        + '<p class="cb-note">La carpeta <code>AI/tools/</code> reune utilidades y material de referencia que apoyan a los agentes pero <strong>no forman parte del DS ni del storybook</strong>. Es la zona pensada para crecer: hoy aloja una unica herramienta, <code>awesome-design</code>.</p>'
        + aiCard({
            tone: "green", eyebrow: "Tool · DESIGN.md", title: "awesome-design",
            lead: "Coleccion curada de ficheros DESIGN.md (formato Stitch de Google) extraidos de webs reales: Vercel, Apple, Stripe, Linear, Notion, Figma… 58 referencias de design language listas para usar.",
            items: [
                "Sirve para dar a un agente de diseno un <strong>look concreto de referencia</strong>: copias un <code>DESIGN.md</code> y le dices «construye algo que se vea asi».",
                "Es <strong>inspiracion / benchmark externo</strong>, no inventario del DS: para producir con 42DS mandan los modes <code>42DS+*</code>.",
                "Encaja sobre todo en trabajo sin DS (<code>[MODE: UI]</code>, <code>[MODE: UX+UI]</code>) cuando quieres una direccion visual de referencia."
            ]
        })
        + '<h3>Que es</h3>'
        + '<p>Un <code>DESIGN.md</code> es un concepto de <strong>Google Stitch</strong>: un documento en texto plano que los agentes de diseno leen para generar UI coherente, sin exports de Figma ni JSON. <strong>awesome-design</strong> es una coleccion lista para usar de estos ficheros, extraidos de webs reales. Markdown es lo que mejor leen los LLM, asi que no hay nada que parsear ni configurar.</p>'
        + docsTable({
            variant: "dense",
            columns: [
                { label: "Fichero", width: "22%" },
                { label: "Quien lo lee", width: "30%" },
                { label: "Que define", width: "48%" }
            ],
            rows: [
                ['<code>AGENTS.md</code>', 'Agentes de codigo', 'Como construir el proyecto.'],
                ['<code>DESIGN.md</code>', 'Agentes de diseno', 'Como debe verse y sentirse.']
            ]
        })
        + '<h3>Como se usa</h3>'
        + '<div class="cb-ai__steps">'
        + aiStep("1", "Elige una marca de referencia", 'Busca la que tenga el look que quieres. La tabla de <em>Registros</em> de mas abajo o el buscador de arriba te ayudan a localizarla.', 'Algo limpio y tecnico → Vercel, Linear o Stripe.')
        + aiStep("2", "Mira su catalogo visual", 'Abre el <code>preview.html</code> (o <code>preview-dark.html</code>) de esa marca para ver paleta, escala tipografica, botones y tarjetas antes de decidir.', '<code>design-md/vercel/preview.html</code>')
        + aiStep("3", "Pasale el DESIGN.md al agente", 'Cita la ruta del <code>DESIGN.md</code> (o copia su contenido) y di explicitamente que tomar: tipografia, color, sombras…', '<code>Usa design-md/stripe/DESIGN.md como guia de estilo: paleta y botones.</code>')
        + aiStep("4", "Elige el mode (y aterriza en 42DS si hace falta)", 'Para HF sin DS usa <code>[MODE: UI]</code> o <code>[MODE: UX+UI]</code>; si luego hay que llevarlo al sistema, encadena un mode <code>42DS+*</code>.', '<code>[MODE: 42DS+REUSE-FIRST]</code> para acercarlo al DS con piezas ya existentes.')
        + '</div>'
        + '<p class="cb-note">¿Falta una marca? El catalogo es del repo upstream (VoltAgent · awesome-design-md); las nuevas referencias se solicitan en su <code>CONTRIBUTING.md</code> / issues.</p>'
        + '<h3>Combínalo con los modes de diseño</h3>'
        + '<p class="cb-note">awesome-design <strong>no es un mode</strong>, es una <em>fuente</em>: no se combina con <code>+</code>; le pasas el <code>DESIGN.md</code> como referencia a un mode. Los que mejor lo aprovechan son <code>[MODE: UI]</code> y <code>[MODE: UX+UI]</code> (componibles en la gobernanza): el mode pone el criterio UX/visual y el <code>DESIGN.md</code> los tokens reales de marca → <strong>menos invención, más fidelidad</strong>. También funciona en <strong>evaluativo</strong>: auditar una pieza contra el <code>DESIGN.md</code>.</p>'
        + docsTable({
            columns: ["Quieres", "Cómo combinarlo (prompt copiable)"],
            rows: [
                ['Afinar solo la capa visual con la marca', '<code>[MODE: UI]\nAplica la design language de Sport (AI/tools/awesome-design/prensa-iberica/sport/DESIGN.md) a este HTML: paleta #ec0918, titulares condensados y botones pill.</code>'],
                ['Página nueva: estructura + visual de marca', '<code>[MODE: UX+UI]\nDiseña una landing de pronósticos siguiendo el DESIGN.md de Sport. Primero UX (flujo, estados, accesibilidad); luego la capa visual de marca.</code>'],
                ['Auditar la fidelidad de marca (evaluativo)', '<code>[MODE: UI]\nAudita fourty/pocs/sport-pronosticos/index.html contra el DESIGN.md de Sport y puntúa las desviaciones de marca.</code>'],
                ['Generar y luego auditar (encadenado)', '<code>[MODE: 42DS+HF+UI]\nMonta el POC con clases 42DS y después audita su capa visual contra el DESIGN.md de la marca.</code>']
            ]
        })
        + '<div class="cb-callout"><strong>Mockup vs 42DS real.</strong> En HF sin DS el <code>DESIGN.md</code> <em>es</em> la fuente visual y <code>[MODE: UI]</code> / <code>[MODE: UX+UI]</code> lo explotan al máximo. Para producción 42DS la marca la fija <code>setting.css</code> + <code>ft-brand-&lt;marca&gt;</code>: ahí el <code>DESIGN.md</code> es un brief de apoyo y mandan los modes <code>42DS+*</code>.</div>'
        + '<h3>Ejemplos de prompt</h3>'
        + '<p class="cb-note">El uso tipico es como referencia visual: apuntas al <code>DESIGN.md</code> de una marca y dejas claro que tomar de ella. Para producir HF normalmente usaras <code>[MODE: UI]</code> o <code>[MODE: UX+UI]</code> (sin DS); si luego hay que aterrizarlo en 42DS, encadena un mode <code>42DS+*</code>.</p>'
        + docsTable({
            columns: ["Objetivo", "Prompt copiable"],
            rows: [
                ['Uso directo (estilo Stitch)', '<code>Usa AI/tools/awesome-design/design-md/vercel/DESIGN.md como guía de estilo y construye una página que se vea así.</code>'],
                ['Landing HF inspirada (sin DS)', '<code>[MODE: UI]\nDiseña una landing inspirada en el DESIGN.md de Vercel (AI/tools/awesome-design/design-md/vercel/): tipografía Geist, shadow-as-border y canvas casi blanco.</code>'],
                ['Pantalla completa con referencia', '<code>[MODE: UX+UI]\nMaqueta un dashboard de suscripciones tomando como referencia el DESIGN.md de Linear (design-md/linear.app/). Alta fidelidad, sin clases 42DS.</code>'],
                ['Extraer tokens y comparar', '<code>[MODE: UI]\nExtrae la paleta y la escala tipográfica del DESIGN.md de Stripe (design-md/stripe/) y compárala con los tokens de la marca sport del DS.</code>'],
                ['Acercar al DS sin romperlo', '<code>[MODE: 42DS+REUSE-FIRST]\nPropón cómo acercar esta portada al look del DESIGN.md de Apple (design-md/apple/) usando solo piezas e helpers ya existentes del DS; marca lo que no se pueda cubrir.</code>']
            ]
        })
        + '<h3>Que hay dentro</h3>'
        + docsTable({
            columns: [
                { label: "Ruta", width: "44%" },
                { label: "Que contiene", width: "56%" }
            ],
            rows: [
                ['<code>AI/tools/awesome-design/DESIGN.md</code>', 'Referencia activa al nivel raiz del tool (actualmente la design language de Vercel / Geist), lista para copiar y usar tal cual.'],
                ['<code>AI/tools/awesome-design/awesome-design-md-main/</code>', 'Repo upstream completo (VoltAgent · awesome-design-md): <code>README.md</code>, <code>CONTRIBUTING.md</code> y <code>LICENSE</code>.'],
                ['<code>…/design-md/&lt;marca&gt;/</code>', 'Una carpeta por marca con <code>DESIGN.md</code>, <code>preview.html</code>, <code>preview-dark.html</code> y <code>README.md</code>. Hay 58 marcas.']
            ]
        })
        + '<h3>Anatomia de un DESIGN.md</h3>'
        + aiMore('Ver las 9 secciones del formato Stitch', docsTable({
            variant: "dense",
            columns: [
                { label: "#", width: "8%" },
                { label: "Seccion", width: "34%" },
                { label: "Que captura", width: "58%" }
            ],
            rows: [
                ['1', 'Visual Theme &amp; Atmosphere', 'Mood, densidad y filosofia de diseno.'],
                ['2', 'Color Palette &amp; Roles', 'Nombre semantico + hex + rol funcional.'],
                ['3', 'Typography Rules', 'Familias tipograficas y jerarquia completa.'],
                ['4', 'Component Stylings', 'Botones, tarjetas, inputs y navegacion con estados.'],
                ['5', 'Layout Principles', 'Escala de espaciado, grid y uso del whitespace.'],
                ['6', 'Depth &amp; Elevation', 'Sistema de sombras y jerarquia de superficies.'],
                ['7', 'Do&#39;s and Don&#39;ts', 'Guardarrailes de diseno y anti-patrones.'],
                ['8', 'Responsive Behavior', 'Breakpoints, touch targets y estrategia de colapso.'],
                ['9', 'Agent Prompt Guide', 'Referencia rapida de color y prompts listos para el agente.']
            ]
        }))
        + '<h3>Registros disponibles (' + REGISTRIES.length + ')</h3>'
        + '<p class="cb-note">Cada registro vive en <code>AI/tools/awesome-design/awesome-design-md-main/design-md/&lt;carpeta&gt;/</code> e incluye <code>DESIGN.md</code>, <code>preview.html</code>, <code>preview-dark.html</code> y <code>README.md</code>. Usa el buscador para localizar una marca concreta.</p>'
        + aiMore('Ver los ' + REGISTRIES.length + ' registros', docsTable({
            variant: "dense",
            columns: [
                { label: "Marca", width: "50%" },
                { label: "Carpeta", width: "50%" }
            ],
            rows: registryRows
        }))
        + '<h3>Reglas propias: Prensa Ibérica</h3>'
        + '<p class="cb-note">Además del catálogo externo, awesome-design aloja un set <strong>propio derivado del DS</strong> en <code>prensa-iberica/</code>: un <code>DESIGN.md</code> por cabecera, generado desde los <code>setting.css</code> reales de cada marca para que el agente produzca acorde a su estética. A diferencia de los registros externos, estos no se extraen de una web: su fuente es el propio 42DS.</p>'
        + docsTable({
            variant: "dense",
            columns: [
                { label: "Marca", width: "38%" },
                { label: "Carpeta", width: "34%" },
                { label: "Primario", width: "28%" }
            ],
            rows: piRows
        })
        + '<p class="cb-note">Uso: <code>Usa AI/tools/awesome-design/prensa-iberica/sport/DESIGN.md y construye algo acorde a Sport</code>. Para 42DS real, la marca se activa con <code>setting.css</code> + <code>ft-brand-&lt;marca&gt;</code>; el <code>DESIGN.md</code> documenta el lenguaje visual (mockups, briefs, HF sin DS con <code>[MODE: UI]</code> / <code>[MODE: UX+UI]</code>).</p>'
        + '<p class="cb-note">Más prompts, por marca e intención (copiables):</p>'
        + docsTable({
            columns: ["Caso", "Prompt copiable"],
            rows: [
                ['Landing HF acorde a una marca', '<code>[MODE: UX+UI]\nDiseña una landing de suscripción siguiendo prensa-iberica/sport/DESIGN.md: rojo #ec0918, titulares condensados y botones pill. UX primero (flujo, estados, a11y), luego la capa visual.</code>'],
                ['Componente puntual con el look de la marca', '<code>[MODE: UI]\nMaqueta una tarjeta de noticia con la design language de El Periódico (prensa-iberica/el-periodico/DESIGN.md): Inter, rojo #f53036 y premium en oro #936f06.</code>'],
                ['Pieza sobria nacional', '<code>[MODE: UX+UI]\nDiseña un alta de newsletter acorde a El Periódico de España (prensa-iberica/el-periodico-de-espana/DESIGN.md): azul #0034dd, tipografía de sistema, tono institucional.</code>'],
                ['Regionales: misma estructura, color por cabecera', '<code>[MODE: UI]\nGenera una portada regional siguiendo prensa-iberica/regionales/DESIGN.md para Faro de Vigo (#1b6598) y luego la variante de Diario Córdoba (#e22931) cambiando solo el acento.</code>'],
                ['Revista con su pareja tipográfica', '<code>[MODE: UX+UI]\nMaqueta una portada de Woman según prensa-iberica/revistas/DESIGN.md (variante Woman): Playfair Display en titulares, Lato en cuerpo, coral #e2635e e imagen protagonista.</code>'],
                ['Auditar la fidelidad de marca', '<code>[MODE: UI]\nAudita esta página contra prensa-iberica/sport/DESIGN.md y puntúa las desviaciones de color, tipografía y componentes.</code>'],
                ['Llevarlo a 42DS real', '<code>[MODE: 42DS+HF]\nMonta un POC de cabecera de El Periódico con clases 42DS y ft-brand-ep (el color lo aporta setting.css); usa el DESIGN.md solo como brief visual.</code>'],
                ['Comparar dos cabeceras', '<code>[MODE: UI]\nCompón el mismo módulo de portada para Sport (#ec0918) y El Periódico de España (#0034dd) según sus DESIGN.md y muéstralos lado a lado.</code>']
            ]
        })
        + '<h3>Reglas por defecto de Prensa Ibérica</h3>'
        + '<p class="cb-note">Cada <code>DESIGN.md</code> abre con una <strong>sección 0 «Reglas por defecto (overridables)»</strong>: los <em>defaults</em> de generación, alineados con el DS. Son anulables — si el usuario pide lo contrario en su invocación, manda su petición.</p>'
        + docsTable({
            variant: "dense",
            columns: [
                { label: "Regla", width: "24%" },
                { label: "Default", width: "76%" }
            ],
            rows: [
                ['Tipografía', 'Fuentes de marca del DS (<code>var(--font-stack)</code> por defecto), nunca familias inventadas. <em>Sport</em>: <code>H1</code>/<code>H2</code> en Media Sans (<code>var(--font-secondary)</code>).'],
                ['Botones', 'Siempre los del DS (<code>.ft-btn</code> + tamaños/modificadores) con las specs de cada marca; nada ad hoc.'],
                ['Border-radius', '<code>0.5rem</code> por defecto. Excepción: componentes con radio propio del DS (tags, botón pill) conservan el suyo.'],
                ['Mayúsculas', 'Los textos <strong>no</strong> van en <code>uppercase</code> por defecto.'],
                ['Bordes', 'Evitar el abuso de <code>border</code>: equilibrar para que el diseño no parezca «todo cajas» (espaciado, fondos sutiles o divisores antes que recuadros).']
            ]
        })
        + '<h3>Escala tipográfica modular · <code>[TYPESCALE: …]</code></h3>'
        + '<p class="cb-note">Modificador <strong>opcional y combinable</strong> con cualquier <code>[MODE: …]</code> para generar diseños con jerarquías tipográficas distintas desde el mismo <code>DESIGN.md</code> (inspirado en <a href="https://typescale.com/" target="_blank" rel="noopener">typescale.com</a>). Por defecto se usa la rampa nativa del DS; es <em>overridable</em>. Sintaxis: <code>[TYPESCALE: &lt;preset&gt;]</code> o <code>[TYPESCALE: &lt;preset&gt; @ &lt;base&gt;]</code>, encadenado tras el mode.</p>'
        + '<div class="cb-callout cb-callout--usage"><strong>Comportamiento.</strong> En modos que emiten CSS/SCSS calcula tamaños modulares (<code>base × ratioⁿ</code>); en modos DS-puro / reuse-only hace <strong>remapeo de steps</strong> sobre los helpers existentes (<code>ft-helper-fontSize-*</code>), sin inventar tamaños. Nunca cambia la familia tipográfica.</div>'
        + aiMore('Ver los 8 presets (ratios de typescale.com)', docsTable({
            variant: "dense",
            columns: [
                { label: "Preset", width: "34%" },
                { label: "Ratio", width: "16%" },
                { label: "Carácter", width: "50%" }
            ],
            rows: [
                ['<code>minor-second</code>', '1.067', 'jerarquía muy plana'],
                ['<code>major-second</code>', '1.125', 'sobria, densa (prensa)'],
                ['<code>minor-third</code>', '1.200', 'equilibrada'],
                ['<code>major-third</code>', '1.250', 'editorial estándar'],
                ['<code>perfect-fourth</code>', '1.333', 'titulares con presencia'],
                ['<code>augmented-fourth</code>', '1.414', 'contraste alto'],
                ['<code>perfect-fifth</code>', '1.500', 'dramática'],
                ['<code>golden</code>', '1.618', 'máximo impacto display']
            ]
        }))
        + docsTable({
            columns: ["Caso", "Prompt copiable"],
            rows: [
                ['Escala con presencia (CSS)', '<code>[MODE: 42DS+HF+CSS] [TYPESCALE: perfect-fourth]\nMonta una portada de Sport con titulares de gran presencia según prensa-iberica/sport/DESIGN.md.</code>'],
                ['Escala compacta reuse-only', '<code>[MODE: 42DS+REUSE] [TYPESCALE: major-second]\nRecompón este bloque de El Periódico con jerarquía compacta usando solo helpers del DS.</code>'],
                ['Escala dramática con base propia', '<code>[MODE: UX+UI] [TYPESCALE: golden @ 1.6rem]\nDiseña una landing de Revistas (Woman) con gran salto display/cuerpo según su DESIGN.md.</code>']
            ]
        })
        + '<div class="cb-callout cb-callout--warn"><strong>No confundir con el DS.</strong> awesome-design aporta <em>criterio visual externo</em>; nunca clases, tokens ni componentes de 42DS. Cuando el encargo es producir con el sistema, la fuente de verdad sigue siendo <code>scss/fourties/</code>, <code>cds-statics/</code> y los modes <code>42DS+*</code>.</div>');

    /* — Referencia — */
    var bEstructura = aiBlock("referencia",
        "estructura carpeta ai mind-system agents knowledges figma tools rutas donde mirar",
        '<h2>Estructura de la carpeta AI</h2>'
        + docsTable({
            columns: [
                { label: "Ruta", width: "25%" },
                { label: "Que contiene", width: "39%" },
                { label: "Cuando mirar aqui", width: "36%" }
            ],
            rows: [
                ['<code>AI/mind-system/</code>', 'Contrato portable del sistema: README, agents y knowledges.', 'Siempre que haya que elegir, explicar o normalizar un mode.'],
                ['<code>AI/mind-system/agents/</code>', 'Specs de los modes: rol, proceso, reglas, outputs e invocacion.', 'Cuando necesites entender para que sirve un prefijo o como combinarlo.'],
                ['<code>AI/mind-system/knowledges/</code>', 'Base conceptual por disciplina: UX, UI, front, 42DS y Storybook.', 'Cuando el trabajo requiere criterio, no solo implementacion.'],
                ['<code>AI/figma/</code>', 'Scripts y recursos de apoyo para flujos con Figma.', 'Cuando el trabajo implique traslado o soporte de diseno en Figma.'],
                ['<code>AI/tools/</code>', 'Utilidades y referencias externas que no son DS. Hoy: <code>awesome-design</code> (coleccion de DESIGN.md). Ver la pestana <strong>Tools</strong>.', 'Cuando busques direccion visual de referencia o tooling externo, no clases del sistema.']
            ]
        }));

    var bTokens = aiBlock("referencia",
        "coste contexto tokens consumo escala combinaciones presupuesto eficiencia",
        '<h2>Coste de contexto y tokens</h2>'
        + '<div class="cb-callout"><strong>Regla practica.</strong> Cuantos mas modes combines, mas contexto debe cargar el agente y mas pasos ejecuta. Eso suele traducirse en mas consumo de tokens.</div>'
        + tokenChart
        + aiMore('Ver tabla de coste por patron', docsTable({
            columns: [
                { label: "Patron", width: "31%" },
                { label: "Coste relativo", width: "19%" },
                { label: "Por que", width: "50%" }
            ],
            rows: [
                ['<code>[MODE: UX]</code> · <code>[MODE: UI]</code>', 'Bajo', 'Activan una sola capa de trabajo y un scope mas estrecho.'],
                ['<code>[MODE: UX+UI]</code>', 'Medio', 'Encadena dos capas: primero estructura y flujo; despues capa visual.'],
                ['<code>[MODE: 42DS+HF]</code> · <code>[MODE: 42DS+REUSE]</code>', 'Medio / alto', 'Ademas de generar, necesitan leer inventario, clases reales y restricciones del DS.'],
                ['<code>[MODE: 42DS+HF+UX+UI]</code> · <code>[MODE: 42DS+REUSE+UX]</code>', 'Alto', 'Primero generan y despues auditan; cargan mas knowledge, mas reglas y mas validaciones.'],
                ['<code>[MODE: STORYBOOK+DOC]</code> · <code>[MODE: STORYBOOK+ENGINE]</code> · <code>[MODE: 42DS+SCSS]</code> · <code>[MODE: 42DS+JS]</code> · <code>[MODE: BETA+CSS]</code>', 'Variable', 'El coste depende mucho del repo: pueden obligar a leer README, stories, SCSS, JS, el motor del storybook, overrides de beta y documentacion asociada.']
            ]
        }))
        + '<p class="cb-note">Mas tokens no significa peor eleccion. Si el trabajo necesita generar y luego auditar, la combinacion correcta evita rondas extra. Recomendacion: <strong>usa el mode mas estrecho que resuelva el encargo completo</strong>.</p>');

    var bFuentes = aiBlock("referencia",
        "fuentes de verdad repo readme index governance agents claude awesome-design beta css override cds-statics registro md",
        '<h2>Fuentes de verdad dentro del repo</h2>'
        + docsTable({
            variant: "dense",
            columns: [
                { label: "Archivo", width: "36%" },
                { label: "Para que sirve", width: "64%" }
            ],
            rows: [
                ['<code>AI/mind-system/README.md</code>', 'Explica que es el sistema portable y como cargarlo.'],
                ['<code>AI/mind-system/agents/index.md</code>', 'Mapa global de modes, capas y ejemplos de uso.'],
                ['<code>AI/mind-system/agents/governance.md</code>', 'Reglas de composicion, conflictos y jerarquia entre modes.'],
                ['<code>AI/tools/awesome-design/</code>', 'Referencias externas de design language (DESIGN.md) para inspiracion visual.'],
                ['<code>AGENTS.md</code> / <code>CLAUDE.md</code>', 'Contrato operativo del repo y espejo de nomenclaturas principales.'],
                ['<code>fourty/storybook/README.md</code>', 'Arquitectura del storybook interno y criterio de overviews.'],
                ['<code>cds-statics/beta/README.md</code>', 'Convención de los overrides CSS a mano y de su registro <code>.md</code> (mode <code>[MODE: BETA+CSS]</code>).']
            ]
        })
        + '<p class="cb-src">Fuentes: <code>AI/mind-system/README.md</code> · <code>AI/mind-system/agents/index.md</code> · <code>AI/mind-system/agents/governance.md</code> · <code>AI/tools/awesome-design/</code> · <code>cds-statics/beta/README.md</code> · <code>AGENTS.md</code> · <code>CLAUDE.md</code></p>');

    /* ════════════════════ TABS + PANELS ════════════════════ */
    var TABS = [
        ["empezar", "Empezar"],
        ["modes", "Elegir mode"],
        ["invocar", "Invocar"],
        ["tools", "Tools"],
        ["referencia", "Referencia"]
    ];
    var PANELS = {
        empezar: bEmpezarIntro + bEmpezarHow + bNovedades,
        modes: bFamilias + bMatrix + bReglas,
        invocar: bPlantillas + bRuntime + bInvocaciones,
        tools: bTools,
        referencia: bEstructura + bTokens + bFuentes
    };
    var tabBar = '<div class="cb-ai__tabs" role="tablist" aria-label="Secciones de la documentacion AI">'
        + TABS.map(function (t, i) {
            var sel = i === 0;
            return '<button type="button" class="cb-ai__tab" role="tab" id="cbAiTab-' + t[0] + '" data-tab="' + t[0] + '"'
                + ' aria-controls="cbAiPanel-' + t[0] + '" aria-selected="' + (sel ? "true" : "false") + '" tabindex="' + (sel ? "0" : "-1") + '">'
                + t[1] + '</button>';
        }).join("")
        + '</div>';
    var panelsHtml = TABS.map(function (t, i) {
        return '<section class="cb-ai__panel" role="tabpanel" id="cbAiPanel-' + t[0] + '" data-tab="' + t[0] + '"'
            + ' aria-labelledby="cbAiTab-' + t[0] + '"' + (i === 0 ? "" : " hidden") + '>'
            + (PANELS[t[0]] || "") + '</section>';
    }).join("");

    var nav = '<div class="cb-ai__nav">'
        + '<div class="cb-ai__search">'
        + icon("magnifying-glass", "cb-ai__searchIco")
        + '<input id="cbAiSearch" type="search" class="cb-ai__searchInput" autocomplete="off"'
        + ' placeholder="Buscar en toda la documentacion AI… (mode, tool, concepto)" aria-label="Buscar en toda la documentacion AI">'
        + '<button type="button" class="cb-ai__searchClear" id="cbAiSearchClear" hidden aria-label="Limpiar busqueda">'
        + (icon("x", "cb-ai__searchClearIco") || "✕") + '</button>'
        + '</div>'
        + tabBar
        + '<div class="cb-ai__searchHint" id="cbAiHint" aria-live="polite" hidden>Resultados en todas las secciones · <span id="cbAiCount"></span></div>'
        + '</div>';

    var overview = '<div class="cb-docs__inner cb-ai">'
        + '<div class="cb-ai__hero">'
        + '<div class="cb-ai__heroBody">'
        + '<div class="cb-ai__eyebrow">AI / Mind System</div>'
        + '<h1>AI</h1>'
        + '<p class="cb-docs__lead">Capa documental y operativa para trabajar con agentes sobre 42DS: el sistema de modes portable, sus knowledges, las tools y referencias externas, y assets de soporte para Figma. Empieza por la pestana <strong>Empezar</strong>; el resto es consulta.</p>'
        + '<div class="cb-ai__stack">'
        + '<span class="cb-ai__pill">Portable entre LLMs</span>'
        + '<span class="cb-ai__pill">Repo-aware</span>'
        + '<span class="cb-ai__pill">Modes composables</span>'
        + '<span class="cb-ai__pill">Fuente de verdad local</span>'
        + "</div>"
        + "</div>"
        + '<div class="cb-ai__heroSide">'
        + '<div class="cb-ai__heroKpi"><span>Entrada</span><strong>Prefijo correcto</strong><em>elige el mode por el trabajo real</em></div>'
        + '<div class="cb-ai__heroKpi"><span>Salida</span><strong>Contrato claro</strong><em>alcance, fidelity y fuentes definidos</em></div>'
        + "</div>"
        + "</div>"
        + nav
        + '<div class="cb-ai__panels">' + panelsHtml + '</div>'
        + '<p class="cb-ai__noresults" hidden>Sin resultados. Prueba con otra palabra o limpia la busqueda.</p>'
        + "</div>";

    window.SB.register({
        id: "ai",
        name: "AI",
        group: "Docs",
        sort: 1,
        overview: overview,
        stories: []
    });

    /* ════════════════════ Interactividad (delegacion registrada una vez) ════════════════════
       aiApply() es la unica fuente de verdad: decide modo-tabs vs modo-busqueda segun el input.
       - Sin texto -> modo tabs: muestra solo el panel activo; <details> a su estado por defecto.
       - Con texto -> modo busqueda: revela todos los panels, filtra bloques en todas las secciones,
         abre los <details> que matcheen y colapsa panels sin coincidencias. ─── */
    function aiRoot() { var d = document.getElementById("cbDocs"); return d ? d.querySelector(".cb-ai") : null; }

    function aiApply() {
        var root = aiRoot(); if (!root) return;
        var input = root.querySelector("#cbAiSearch");
        var q = (input && input.value ? input.value : "").trim().toLowerCase();
        var searching = !!q;
        var clear = root.querySelector("#cbAiSearchClear");
        if (clear) clear.hidden = !(input && input.value);
        root.classList.toggle("cb-ai--searching", searching);

        var panels = root.querySelectorAll(".cb-ai__panel");
        var blocks = root.querySelectorAll(".cb-ai__block");
        var hint = root.querySelector("#cbAiHint");
        var count = root.querySelector("#cbAiCount");
        var nores = root.querySelector(".cb-ai__noresults");

        if (searching) {
            var n = 0;
            Array.prototype.forEach.call(blocks, function (b) {
                var corpus = ((b.getAttribute("data-search") || "") + " " + b.textContent).toLowerCase();
                var show = corpus.indexOf(q) >= 0;
                b.hidden = !show;
                if (show) {
                    n++;
                    Array.prototype.forEach.call(b.querySelectorAll(".cb-ai__more"), function (d) { d.open = true; });
                }
            });
            Array.prototype.forEach.call(panels, function (p) {
                p.hidden = !p.querySelector(".cb-ai__block:not([hidden])");
            });
            if (hint) hint.hidden = false;
            if (count) count.textContent = n + (n === 1 ? " resultado" : " resultados");
            if (nores) nores.hidden = n > 0;
        } else {
            Array.prototype.forEach.call(blocks, function (b) { b.hidden = false; });
            Array.prototype.forEach.call(root.querySelectorAll(".cb-ai__more"), function (d) { d.open = false; });
            var active = root.querySelector(".cb-ai__tab[aria-selected='true']");
            var id = active ? active.getAttribute("data-tab") : "empezar";
            Array.prototype.forEach.call(panels, function (p) { p.hidden = p.getAttribute("data-tab") !== id; });
            if (hint) hint.hidden = true;
            if (count) count.textContent = "";
            if (nores) nores.hidden = true;
        }
    }

    function aiSelectTab(tab) {
        var root = aiRoot(); if (!root || !tab) return;
        var input = root.querySelector("#cbAiSearch");
        if (input) input.value = "";   // seleccionar pestana sale del modo busqueda
        Array.prototype.forEach.call(root.querySelectorAll(".cb-ai__tab"), function (t) {
            var on = t === tab;
            t.setAttribute("aria-selected", on ? "true" : "false");
            t.tabIndex = on ? 0 : -1;
        });
        aiApply();
    }

    document.addEventListener("input", function (e) { if (e.target && e.target.id === "cbAiSearch") aiApply(); });
    document.addEventListener("search", function (e) { if (e.target && e.target.id === "cbAiSearch") aiApply(); });

    document.addEventListener("click", function (e) {
        if (!e.target || !e.target.closest) return;
        var clear = e.target.closest("#cbAiSearchClear");
        if (clear) {
            var root = aiRoot(); if (!root) return;
            var input = root.querySelector("#cbAiSearch");
            if (input) { input.value = ""; input.focus(); }
            aiApply();
            return;
        }
        var tab = e.target.closest(".cb-ai__tab");
        if (tab) { aiSelectTab(tab); return; }
        var pickOpt = e.target.closest(".cb-ai__pickOpt");
        if (pickOpt) {
            var r = aiRoot(); if (!r) return;
            var idx = pickOpt.getAttribute("data-pick");
            Array.prototype.forEach.call(r.querySelectorAll(".cb-ai__pickOpt"), function (o) {
                o.setAttribute("aria-pressed", o === pickOpt ? "true" : "false");
            });
            var empty = r.querySelector(".cb-ai__pickEmpty");
            if (empty) empty.hidden = true;
            Array.prototype.forEach.call(r.querySelectorAll(".cb-ai__pickRes"), function (res) {
                res.hidden = res.getAttribute("data-pick-res") !== idx;
            });
            return;
        }
    });

    /* Navegacion por teclado en el tablist (flechas, Home/End) — patron ARIA de tabs. */
    document.addEventListener("keydown", function (e) {
        if (!e.target || !e.target.closest) return;
        var tab = e.target.closest(".cb-ai__tab"); if (!tab) return;
        var k = e.key;
        if (k !== "ArrowRight" && k !== "ArrowLeft" && k !== "Home" && k !== "End") return;
        e.preventDefault();
        var r = aiRoot(); if (!r) return;
        var tabs = Array.prototype.slice.call(r.querySelectorAll(".cb-ai__tab"));
        var i = tabs.indexOf(tab);
        var next = k === "Home" ? 0 : k === "End" ? tabs.length - 1
            : k === "ArrowRight" ? (i + 1) % tabs.length : (i - 1 + tabs.length) % tabs.length;
        aiSelectTab(tabs[next]);
        tabs[next].focus();
    });
})();
