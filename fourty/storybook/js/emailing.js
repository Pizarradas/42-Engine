/* ==========================================================================
   42DS Storybook - Externals > Emailing
   --------------------------------------------------------------------------
   Índice navegable de las plantillas HTML de email. Se registran como stories
   kind:"page" para abrir los ficheros reales de externals/emailing/templates/
   dentro del canvas del storybook, sin duplicar markup ni assets.
   ========================================================================== */
(function () {
    "use strict";
    if (!window.SB || !window.SB.register) return;

    var docsTable = window.SB.helpers.docsTable;
    var BASE = "../externals/emailing/templates/";

    function slug(s) {
        return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "x";
    }

    function page(file, name) {
        return {
            id: slug(file),
            name: name,
            kind: "page",
            src: BASE + file,
            brandable: false
        };
    }

    var GROUPS = [
        {
            id: "onboarding",
            name: "Onboarding",
            hint: "01-03",
            stories: [
                page("01-verification-v1.html", "Verification"),
                page("02-confirmation-registration-v1.html", "Confirmation registration"),
                page("03-welcome-v1.html", "Welcome")
            ]
        },
        {
            id: "transaccional",
            name: "Transaccional",
            hint: "04-07",
            stories: [
                page("04-transactional-v1.html", "Transactional"),
                page("05-payment-confirmation-v1.html", "Payment confirmation"),
                page("06-payment-reminder-v1.html", "Payment reminder"),
                page("07-invoice-v1.html", "Invoice")
            ]
        },
        {
            id: "contenido",
            name: "Contenido",
            hint: "08-15 + especiales",
            stories: [
                page("08-breaking-news-v1.html", "Breaking news"),
                page("09-news-summary-v1.html", "News summary"),
                page("10-newsletter-v1.html", "Newsletter"),
                page("11-newsletter-modular-v1.html", "Newsletter modular"),
                page("12-author-newsletter-v1.html", "Author newsletter"),
                page("13-creative-newsletter-v1.html", "Creative newsletter"),
                page("14-weekly-roundup-v1.html", "Weekly roundup"),
                page("15-event-invitation-v1.html", "Event invitation"),
                page("newsletter-titulares-v1.html", "Newsletter titulares"),
                page("26-autores-articulos-v1.html", "Autores articulos")
            ]
        },
        {
            id: "promocional",
            name: "Promocional",
            hint: "16-20",
            stories: [
                page("16-promo-v1.html", "Promo v1"),
                page("16-promo-tipo-2-ofertas-v1.html", "Promo tipo 2 ofertas v1"),
                page("16-promo-tipo-2-ofertas-v2.html", "Promo tipo 2 ofertas v2"),
                page("16-promo-tipo-2-ofertas-white-version-v3.html", "Promo tipo 2 ofertas white v3"),
                page("16-promo-tipo-destacado-porcentaje-v1.html", "Promo destacado porcentaje v1"),
                page("16-promo-tipo-destacado-porcentaje-v2.html", "Promo destacado porcentaje v2"),
                page("16-promo-tipo-destacado-porcentaje-white-version-v3.html", "Promo destacado porcentaje white v3"),
                page("16-promo-tipo-destacado-porcentaje-oferta-flash-v1.html", "Promo oferta flash v1"),
                page("16-promo-tipo-oferta-anual-mensualizada-v1.html", "Promo anual mensualizada v1"),
                page("16-promo-tipo-oferta-anual-mensualizada-v2.html", "Promo anual mensualizada v2"),
                page("16-promo-tipo-oferta-anual-mensualizada-white-version-v3.html", "Promo anual mensualizada white v3"),
                page("17-promo-v2.html", "Promo v2"),
                page("18-promo-v1-black.html", "Promo v1 black"),
                page("19-promo-v2-black.html", "Promo v2 black"),
                page("20-promo-price-v1.html", "Promo price")
            ]
        },
        {
            id: "retention",
            name: "Upsell / Retention",
            hint: "21-25",
            stories: [
                page("21-premium-upsell-v1.html", "Premium upsell"),
                page("22-subscription-renewal-v1.html", "Subscription renewal"),
                page("23-reengagement-v1.html", "Reengagement"),
                page("24-subscribers-premium-newsletter.html", "Subscribers premium newsletter"),
                page("24-subscribers-premium-newsletter-v2.html", "Subscribers premium newsletter v2"),
                page("24-subscribers-premium-newsletter-v3.html", "Subscribers premium newsletter v3"),
                page("24-subscribers-premium-newsletter-v4.html", "Subscribers premium newsletter v4"),
                page("25-anuncios-especiales.html", "Anuncios especiales")
            ]
        },
        {
            id: "nuevos-suscriptores",
            name: "Nuevos suscriptores",
            hint: "04-08 secuencia",
            stories: [
                page("04-nuevos-suscriptores-01-bienvenida.html", "01 Bienvenida"),
                page("05-nuevos-suscriptores-02-descubre.html", "02 Descubre"),
                page("06-nuevos-suscriptores-03-personaliza.html", "03 Personaliza"),
                page("07-nuevos-suscriptores-04-saca-partido.html", "04 Saca partido"),
                page("08-nuevos-suscriptores-05-mantente-informado.html", "05 Mantente informado")
            ]
        },
        {
            id: "customer-journey",
            name: "Customer Journey",
            hint: "CJ-01-08",
            stories: [
                page("CJ-01--bienvenida-y-confirmacion-compra.html", "CJ-01 Bienvenida y confirmacion compra"),
                page("CJ-02--bienvenida-carta-director.html", "CJ-02 Carta director"),
                page("CJ-03--descarga-app.html", "CJ-03 Descarga app"),
                page("CJ-04--catalogo-newsletters.html", "CJ-04 Catalogo newsletters"),
                page("CJ-05--beneficios-suscripcion.html", "CJ-05 Beneficios suscripcion"),
                page("CJ-06--pasatiempos.html", "CJ-06 Pasatiempos"),
                page("CJ-07--club-mensual.html", "CJ-07 Club mensual"),
                page("CJ-08--mail-puntual.html", "CJ-08 Mail puntual")
            ]
        }
    ];

    var totalTemplates = GROUPS.reduce(function (acc, subgroup) {
        return acc + subgroup.stories.length;
    }, 0);

    var rows = GROUPS.map(function (subgroup) {
        return [
            { html: "<strong>" + subgroup.name + "</strong>", header: true },
            { html: subgroup.hint || "—" },
            { html: String(subgroup.stories.length) }
        ];
    });

    var overview = '<div class="cb-docs__inner">'
        + "<h1>Emailing</h1>"
        + '<p class="cb-docs__lead">' + totalTemplates + ' plantillas HTML reales de <code>externals/emailing/templates/</code>, accesibles desde el storybook como paginas completas. No son componentes del DS ni stories parametrizables: cada entrada carga el fichero final de email tal cual existe en el repo.</p>'
        + '<div class="cb-callout cb-callout--warn"><strong>Naturaleza especial.</strong> Estas piezas no siguen contratos de frontend web convencional: se construyen para clientes de correo. El foco aqui es navegar, revisar y comparar plantillas reales de emailing dentro del mismo runtime del storybook.</div>'
        + "<h2>Familias disponibles</h2>"
        + docsTable({
            variant: "dense",
            columns: [
                { label: "Bloque", width: "46%" },
                { label: "Rango / pista", width: "32%" },
                { label: "Templates", width: "22%" }
            ],
            rows: rows
        })
        + "<h2>Uso en el canvas</h2>"
        + docsTable({
            variant: "dense",
            columns: [
                { label: "Aspecto", width: "34%" },
                { label: "Comportamiento", width: "66%" }
            ],
            rows: [
                ['<strong>Tipo de story</strong>', '<code>kind:"page"</code> — el iframe navega al HTML real del email.'],
                ['<strong>Controls</strong>', 'No hay controles ni args: no se reescribe la plantilla desde el storybook.'],
                ['<strong>Brand</strong>', '<code>brandable:false</code> — las plantillas de email no participan del swap de marca del DS.'],
                ['<strong>Objetivo</strong>', 'Acceder rapido a las plantillas, revisarlas desde el sidebar y tenerlas reunidas en un mismo punto de entrada.']
            ]
        })
        + '<p class="cb-src">Fuente: <code>externals/emailing/templates/</code> · clasificación: <code>externals/emailing/SISTEMA-MENTAL.md</code> y <code>externals/emailing/templates/README.md</code></p>'
        + "</div>";

    window.SB.register({
        id: "externals-emailing",
        name: "Emailing",
        group: "Externals",
        overview: overview,
        subgroups: GROUPS
    });
})();
