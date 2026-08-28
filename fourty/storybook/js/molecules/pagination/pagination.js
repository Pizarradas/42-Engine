/* ════════════════════════════════════════════════════════════════════════
   molecules/pagination/pagination.js — Molecules / Pagination
   Casuística REAL de scss/fourties/molecules/pagination/_pagination.scss (.ft-mol-pagination*).
   Markup tomado de fourty/molecules/molecule-pagination.html. Cero invención de API.

   Paginación accesible: nav con lista de páginas (__item > __trigger) + flechas
   prev/next (iconizadas) y estados activa/deshabilitada. Alineación con -is--cnt /
   -is--rgt. Solo CSS. Una story plana interactiva "Base" (alineación · nº páginas ·
   página actual) + subgrupo "Markup" async.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _pagination.scss ▼ */
    const DATA = {
        aligns: [
            ["", "(defecto · izquierda)"],
            ["ft-mol-pagination-is--cnt", "-is--cnt · centrada"],
            ["ft-mol-pagination-is--rgt", "-is--rgt · derecha"]
        ],
        itemMods: ["__itemIsActive", "__itemIsDisabled", "__itemIsIconized", "__itemIsNavPrev", "__itemIsNavNext"]
    };

    /* ─── BASE — .ft-mol-pagination ─── */
    const baseArgTypes = [
        { key: "align", control: "select", desc: "Alineación de la paginación.", options: DATA.aligns },
        { key: "pages", control: "number", desc: "Número de páginas (2–9).", min: 2, max: 9 },
        { key: "current", control: "number", desc: "Página actual (activa).", min: 1, max: 9 }
    ];
    const baseArgs = { align: "", pages: "5", current: "3" };

    function live(a) {
        const cls = ["ft-mol-pagination"];
        if (a.align) cls.push(a.align);
        const n = Math.max(2, Math.min(9, parseInt(a.pages, 10) || 2));
        const cur = Math.max(1, Math.min(n, parseInt(a.current, 10) || 1));
        const prevDisabled = cur === 1;
        const nextDisabled = cur === n;
        const prev = `<li class="ft-mol-pagination__item ft-mol-pagination__itemIsIconized ft-mol-pagination__itemIsNavPrev${prevDisabled ? " ft-mol-pagination__itemIsDisabled" : ""}">
        <a href="/page/**" rel="prev" class="ft-mol-pagination__trigger"${prevDisabled ? ' aria-disabled="true" tabindex="-1"' : ""} title="Anterior"><span class="ft-helper-hide">Anterior</span></a>
    </li>`;
        const next = `<li class="ft-mol-pagination__item ft-mol-pagination__itemIsIconized ft-mol-pagination__itemIsNavNext${nextDisabled ? " ft-mol-pagination__itemIsDisabled" : ""}">
        <a href="/page/**" rel="next" class="ft-mol-pagination__trigger"${nextDisabled ? ' aria-disabled="true" tabindex="-1"' : ""} title="Siguiente"><span class="ft-helper-hide">Siguiente</span></a>
    </li>`;
        const nums = [];
        for (let i = 1; i <= n; i++) {
            nums.push(i === cur
                ? `<li class="ft-mol-pagination__item ft-mol-pagination__itemIsActive"><a href="/page/**" class="ft-mol-pagination__trigger" title="Página actual" aria-current="page">${i}</a></li>`
                : `<li class="ft-mol-pagination__item"><a href="/page/**" class="ft-mol-pagination__trigger" title="Ir a la página ${i}">${i}</a></li>`);
        }
        return `<nav aria-label="Paginación" class="${cls.join(" ")}">
    <ul class="ft-mol-pagination__content">
        ${prev}
        ${nums.join("\n        ")}
        ${next}
    </ul>
</nav>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Pagination</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-pagination</code>): paginación accesible — lista de páginas con flechas anterior/siguiente, página activa y páginas deshabilitadas. Va en un <code>&lt;nav aria-label&gt;</code>.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/pagination.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>scss/fourties/molecules/pagination/_pagination.scss</code> + <code>pagination-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS (cada página es un enlace; las flechas usan iconos CSS)</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>-is--cnt</code> · <code>-is--rgt</code></td><td>alineación (centro / derecha) del <code>__content</code></td></tr>
                <tr><td><code>__itemIsActive</code></td><td>página actual (<code>aria-current="page"</code>)</td></tr>
                <tr><td><code>__itemIsDisabled</code></td><td>página/flecha no disponible (<code>aria-disabled</code>)</td></tr>
                <tr><td><code>__itemIsIconized</code> + <code>__itemIsNavPrev</code>/<code>__itemIsNavNext</code></td><td>flechas anterior/siguiente</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-pagination</code> (<code>&lt;nav&gt;</code>)</td></tr>
                <tr><td>Lista</td><td><code>.ft-mol-pagination__content</code> (<code>&lt;ul&gt;</code>)</td></tr>
                <tr><td>Página</td><td><code>.ft-mol-pagination__item</code> &gt; <code>.ft-mol-pagination__trigger</code></td></tr>
            </tbody>
        </table>

        <div class="cb-callout">Para los saltos largos se usa una elipsis (<code>&lt;span class="ft-mol-pagination__trigger" aria-hidden="true"&gt;...&lt;/span&gt;</code>) — ver el subgrupo <strong>Markup</strong>.</div>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/pagination/_pagination.scss</code> · markup: <code>fourty/molecules/molecule-pagination.html</code></p>
    </div>`;

    const PG = {
        id: "pagination",
        name: "Pagination",
        group: "Molecules",
        overview,
        stories: [
            // full: la alineación (-is--cnt/-is--rgt) necesita ancho para verse
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(PG);

    /* Markup original (HTML plano editable por el front) en pagination.html → subgrupo "Markup". */
    window.SB.loadMarkup(PG, document.currentScript && document.currentScript.src, { full: true });
})();
