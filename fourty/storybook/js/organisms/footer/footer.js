/* ════════════════════════════════════════════════════════════════════════
   organisms/footer/footer.js — Organisms / Footer
   Casuística REAL de scss/fourties/organism/footer/_footer.scss (.ft-org-footer).
   Markup VERBATIM de fourty/organisms/organism-footer.html. Cero invención de API.

   Criterio ORGANISMOS: controles MÍNIMOS (un solo select de variante). La fidelidad la
   aporta el MARKUP — cada variante es la construcción literal del showroom, no se
   parametriza pieza a pieza. Rutas normalizadas (../../cds-statics → /cds-statics).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";

    /* ▼ SINGLE SOURCE OF TRUTH — markup verbatim por variante ▼ */
    const VARIANTS = {
        "ep-1": `<!-- org: footer -->
                                            <footer id="footer-media" role="contentinfo"
                                                aria-label="Información del pie de página">
                                                <h2 class="ft-helper-hide">
                                                    Información de pie de página
                                                </h2>

                                                <div class="footer-mediaTop">
                                                    <a data-edition-homelink="data-edition-homelink"
                                                        title="El Periódico" href="/es/" aria-current="page">
                                                        <img width="263" height="65" loading="lazy" alt="El Periódico2"
                                                            src="/cds-statics/assets/img/logos/logoEpColor.svg" />
                                                    </a>

                                                    <div class="rrss" aria-label="Redes sociales de El Periódico">
                                                        <a class="btn" href="#" rel="nofollow noopener" target="_blank"
                                                            aria-label="WhatsApp de El Periódico">
                                                            <span class="icon icon-Whatsapp" aria-hidden="true"></span>
                                                        </a>
                                                        <a class="btn"
                                                            href="https://www.facebook.com/elperiodico.catalunya"
                                                            rel="nofollow noopener" target="_blank" hreflang="es"
                                                            aria-label="Facebook de El Periódico">
                                                            <span class="icon icon-Facebook" aria-hidden="true"></span>
                                                        </a>
                                                        <a class="btn" href="https://twitter.com/elperiodico"
                                                            rel="nofollow noopener" target="_blank" hreflang="es"
                                                            aria-label="Twitter de El Periódico">
                                                            <span class="icon icon-Twitter" aria-hidden="true"></span>
                                                        </a>
                                                        <a class="btn" href="https://www.instagram.com/elperiodico_cas/"
                                                            rel="nofollow noopener" target="_blank" hreflang="es"
                                                            aria-label="Instagram de El Periódico">
                                                            <span class="icon icon-Instagram" aria-hidden="true"></span>
                                                        </a>
                                                    </div>

                                                    <h3 class="ft-helper-hide">
                                                        Enlaces institucionales
                                                    </h3>
                                                    <nav aria-label="Enlaces institucionales">
                                                        <ul class="lnk">
                                                            <li>
                                                                <a href="https://www.elperiodico.com/es/quienessomos.shtml"
                                                                    rel="nofollow noopener" target="_blank"
                                                                    hreflang="es" title="Quiénes somos">
                                                                    Quiénes somos
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="https://www.elperiodico.com/es/contacto.shtml"
                                                                    rel="nofollow noopener" target="_blank"
                                                                    hreflang="es" title="Contacto">
                                                                    Contacto
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="https://www.elperiodico.com/es/rss/portada_rss.shtml"
                                                                    rel="nofollow noopener" target="_blank"
                                                                    hreflang="es" title="RSS">
                                                                    RSS
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="https://www.elperiodico.com/es/mapa-sitio.shtml"
                                                                    rel="nofollow noopener" target="_blank"
                                                                    hreflang="es" title="Mapa del sitio">
                                                                    Mapa del sitio
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="https://www.prensaiberica360.es/?_sid=1686819132"
                                                                    rel="nofollow noopener" target="_blank"
                                                                    hreflang="es" title="Publicidad">
                                                                    Publicidad
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="https://www.elperiodico.com/es/avisolegal.shtml"
                                                                    rel="nofollow noopener" target="_blank"
                                                                    hreflang="es" title="Aviso legal">
                                                                    Aviso legal
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="https://www.prensaiberica.es/politica-de-privacidad-resumida/?_sid=1686819132"
                                                                    rel="nofollow noopener" target="_blank"
                                                                    hreflang="es"
                                                                    title="Política de privacidad y cookies">
                                                                    Política de privacidad y cookies
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript: Didomi.preferences.show();"
                                                                    rel="nofollow noopener"
                                                                    title="Preferencias de Privacidad">
                                                                    Preferencias de Privacidad
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </div>

                                                <div class="footer-mediaMiddle">
                                                    <address>
                                                        <p>El Periódico de Catalunya, S.L.U</p>
                                                        <a href="https://estaticos-cdn.lne.es/images/footer/prensa-iberica-360.png?id=00bc9e3946af531b5a7b"
                                                            rel="noopener" target="_blank" hreflang="es"
                                                            title="Prensa Ibérica">
                                                            <img width="114" height="73" loading="lazy"
                                                                alt="Prensa Ibérica"
                                                                src="https://estaticos-cdn.lne.es/images/footer/prensa-iberica-360.png?id=00bc9e3946af531b5a7b"
                                                                title="Prensa Ibérica" />
                                                        </a>
                                                    </address>
                                                </div>

                                                <div class="footer-mediaBottom">
                                                    <p class="titular">
                                                        Otras webs de Prensa Ibérica Media:
                                                    </p>
                                                    <ul aria-label="Listado de sitios web del grupo Prensa Ibérica">
                                                        <li>
                                                            <a href="https://www.cambalache.es/" rel="nofollow noopener"
                                                                target="_blank" hreflang="es" title="Cambalache">
                                                                Cambalache
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.casagourmet.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Casa Gourmet">
                                                                Casa Gourmet
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://ocasion.neomotor.com/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Coche de ocasión">
                                                                Coche de ocasión
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.codigonuevo.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Código Nuevo">
                                                                Código Nuevo
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.elperiodico.com/cuore/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Cuore">
                                                                Cuore
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.diaridegirona.cat/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Diari de Girona">
                                                                Diari de Girona
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.diariocordoba.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Diario de Córdoba">
                                                                Diario de Córdoba
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.diariodeibiza.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Diario de Ibiza">
                                                                Diario de Ibiza
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.diariodemallorca.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Diario de Mallorca">
                                                                Diario de Mallorca
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.elcorreogallego.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Correo Gallego">
                                                                El Correo Gallego
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.eldia.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Día Tenerife">
                                                                El Día Tenerife
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.elperiodicodearagon.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Periódico de Aragón">
                                                                El Periódico de Aragón
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.elperiodico.com/es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Periódico de Catalunya">
                                                                El Periódico de Catalunya
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.epe.es/es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Periódico de España">
                                                                El Periódico de España
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="http://www.elperiodicoextremadura.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Periódico de Extremadura">
                                                                El Periódico de Extremadura
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.elperiodicomediterraneo.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Periódico Mediterráneo">
                                                                El Periódico Mediterráneo
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.farodevigo.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Faro de Vigo">
                                                                Faro de Vigo
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://formula1.lne.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Fórmula 1">
                                                                Fórmula 1
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.premios-cine.com/goya/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Goya">
                                                                Goya
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.iberempleos.es/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Iberempleos">
                                                                Iberempleos
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.iberpisos.es/" rel="nofollow noopener"
                                                                target="_blank" hreflang="es"
                                                                title="Iberpisos Iberanuncios">
                                                                Iberpisos Iberanuncios
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.diarioinformacion.com/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Información">
                                                                Información
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="http://www.informaciontv.es/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Información TV">
                                                                Información TV
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.lacronicabadajoz.com/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Crónica de Badajoz">
                                                                La Crónica de Badajoz
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.lne.es/asturias/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Nueva España Asturias">
                                                                La Nueva España Asturias
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.laopinioncoruna.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Opinión de A Coruña">
                                                                La Opinión de A Coruña
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.laopiniondemurcia.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Opinión de Murcia">
                                                                La Opinión de Murcia
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.laopiniondemalaga.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Opinión de Málaga">
                                                                La Opinión de Málaga
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.laopiniondezamora.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Opinión El correo de Zamora">
                                                                La Opinión El correo de Zamora
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.laprovincia.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Provincia Diario de Las Palmas">
                                                                La Provincia Diario de Las Palmas
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.levante-emv.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Levante El Mercantil Valenciano">
                                                                Levante El Mercantil Valenciano
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="http://www.informaciontv.es/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Levante TV">
                                                                Levante TV
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.emporda.info/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="L'Empordà Figueres">
                                                                L'Empordà Figueres
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.laloterianavidad.com/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Lotería">
                                                                Lotería
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.mallorcazeitung.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="de"
                                                                title="Mallorca Zeitung Mallorca">
                                                                Mallorca Zeitung Mallorca
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://neomotor.epe.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Neomotor">
                                                                Neomotor
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.premios-cine.com/oscars/"
                                                                rel="nofollow noopener" target="_blank" hreflang="en"
                                                                title="Oscars">
                                                                Oscars
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.regio7.cat/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="ca"
                                                                title="Regió Manresa">
                                                                Regió Manresa
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.sport.es/" rel="nofollow noopener"
                                                                target="_blank" hreflang="es" title="Sport">
                                                                Sport
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.stilo.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Stilo">
                                                                Stilo
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.superdeporte.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Superdeporte Valencia">
                                                                Superdeporte Valencia
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.sport.es/es/tendencias21/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Tendencias 21">
                                                                Tendencias 21
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.tucasa.com/" rel="nofollow noopener"
                                                                target="_blank" hreflang="es" title="Tu casa">
                                                                Tu casa
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.sport.es/es/medio-ambiente/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Medio Ambiente">
                                                                Medio Ambiente
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://viajar.elperiodico.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Viajar">
                                                                Viajar
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.woman.es/" rel="nofollow noopener"
                                                                target="_blank" hreflang="es"
                                                                title="Woman Madame Figaro">
                                                                Woman Madame Figaro
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </footer>
                                            <!-- end // org: footer -->`,
        "ep-2": `<!-- org: footer -->
                                            <footer id="footer-media" role="contentinfo"
                                                aria-label="Información del pie de página">
                                                <h2 class="ft-helper-hide">
                                                    Información de pie de página
                                                </h2>

                                                <div class="footer-mediaTop">
                                                    <a data-edition-homelink="data-edition-homelink"
                                                        title="El Periódico" href="/es/" aria-current="page">
                                                        <img width="263" height="65" loading="lazy" alt="El Periódico2"
                                                            src="/cds-statics/assets/img/logos/logoEpColor.svg" />
                                                    </a>

                                                    <div class="rrss" aria-label="Redes sociales de El Periódico">
                                                        <a class="btn" href="#" rel="noopener noreferrer nofollow"
                                                            target="_blank" aria-label="WhatsApp de El Periódico">
                                                            <span class="icon icon-Whatsapp" aria-hidden="true"></span>
                                                        </a>
                                                        <a class="btn"
                                                            href="https://www.facebook.com/elperiodico.catalunya"
                                                            rel="noopener noreferrer nofollow" target="_blank"
                                                            hreflang="es" aria-label="Facebook de El Periódico">
                                                            <span class="icon icon-Facebook" aria-hidden="true"></span>
                                                        </a>
                                                        <a class="btn" href="https://twitter.com/elperiodico"
                                                            rel="noopener noreferrer nofollow" target="_blank"
                                                            hreflang="es" aria-label="Twitter de El Periódico">
                                                            <span class="icon icon-Twitter" aria-hidden="true"></span>
                                                        </a>
                                                        <a class="btn" href="https://www.instagram.com/elperiodico_cas/"
                                                            rel="noopener noreferrer nofollow" target="_blank"
                                                            hreflang="es" aria-label="Instagram de El Periódico">
                                                            <span class="icon icon-Instagram" aria-hidden="true"></span>
                                                        </a>
                                                    </div>

                                                    <h3 class="ft-helper-hide">
                                                        Enlaces institucionales
                                                    </h3>
                                                    <nav aria-label="Enlaces institucionales">
                                                        <ul class="lnk">
                                                            <li>
                                                                <a href="https://www.elperiodico.com/es/quienessomos.shtml"
                                                                    rel="nofollow noopener" target="_blank"
                                                                    hreflang="es" title="Quiénes somos">
                                                                    Quiénes somos
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="https://www.elperiodico.com/es/contacto.shtml"
                                                                    rel="nofollow noopener" target="_blank"
                                                                    hreflang="es" title="Contacto">
                                                                    Contacto
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="https://www.elperiodico.com/es/rss/portada_rss.shtml"
                                                                    rel="nofollow noopener" target="_blank"
                                                                    hreflang="es" title="RSS">
                                                                    RSS
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="https://www.elperiodico.com/es/mapa-sitio.shtml"
                                                                    rel="nofollow noopener" target="_blank"
                                                                    hreflang="es" title="Mapa del sitio">
                                                                    Mapa del sitio
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="https://www.prensaiberica360.es/?_sid=1686819132"
                                                                    rel="nofollow noopener" target="_blank"
                                                                    hreflang="es" title="Publicidad">
                                                                    Publicidad
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="https://www.elperiodico.com/es/avisolegal.shtml"
                                                                    rel="nofollow noopener" target="_blank"
                                                                    hreflang="es" title="Aviso legal">
                                                                    Aviso legal
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="https://www.prensaiberica.es/politica-de-privacidad-resumida/?_sid=1686819132"
                                                                    rel="nofollow noopener" target="_blank"
                                                                    hreflang="es"
                                                                    title="Política de privacidad y cookies">
                                                                    Política de privacidad y cookies
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript: Didomi.preferences.show();"
                                                                    rel="nofollow noopener"
                                                                    title="Preferencias de Privacidad">
                                                                    Preferencias de Privacidad
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </div>

                                                <div class="footer-mediaMiddle">
                                                    <address>
                                                        <p>El Periódico de Catalunya, S.L.U</p>
                                                        <a href="https://estaticos-cdn.lne.es/images/footer/prensa-iberica-360.png?id=00bc9e3946af531b5a7b"
                                                            rel="noopener" target="_blank" hreflang="es"
                                                            title="Prensa Ibérica">
                                                            <img width="114" height="73" loading="lazy"
                                                                alt="Prensa Ibérica"
                                                                src="https://estaticos-cdn.lne.es/images/footer/prensa-iberica-360.png?id=00bc9e3946af531b5a7b"
                                                                title="Prensa Ibérica" />
                                                        </a>
                                                    </address>
                                                </div>

                                                <div class="footer-mediaBottom">
                                                    <p>Otras webs de Prensa Ibérica Media:</p>
                                                    <ul>
                                                        <li class="titular">Titular 1</li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Casa Gourmet"
                                                                href="https://www.casagourmet.es/?_sid=1686737966">
                                                                Casa Gourmet
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Coche de ocasión"
                                                                href="https://ocasion.neomotor.com/">
                                                                Coche de ocasión
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Código Nuevo"
                                                                href="https://www.codigonuevo.com/?_sid=1686737966">
                                                                Código Nuevo
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Cuore"
                                                                href="https://www.elperiodico.com/cuore/?_sid=1686737966">
                                                                Cuore
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Diari de Girona"
                                                                href="https://www.diaridegirona.cat/?_sid=1686737966">
                                                                Diari de Girona
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Diario de Córdoba"
                                                                href="https://www.diariocordoba.com/?_sid=1686737966">
                                                                Diario de Córdoba
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Diario de Ibiza"
                                                                href="https://www.diariodeibiza.es/?_sid=1686737966">
                                                                Diario de Ibiza
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Diario de Mallorca"
                                                                href="https://www.diariodemallorca.es/?_sid=1686737966">
                                                                Diario de Mallorca
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="El Correo Gallego"
                                                                href="https://www.elcorreogallego.es/?_sid=1686737966">
                                                                El Correo Gallego
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="El Día Tenerife"
                                                                href="https://www.eldia.es/?_sid=1686737966">
                                                                El Día Tenerife
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="El Periódico de Aragón"
                                                                href="https://www.elperiodicodearagon.com/?_sid=1686737966">
                                                                El Periódico de Aragón
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="El Periódico de Catalunya"
                                                                href="https://www.elperiodico.com/es/?_sid=1686737966">
                                                                El Periódico de Catalunya
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="El Periódico de España"
                                                                href="https://www.epe.es/es/?_sid=1686737966">
                                                                El Periódico de España
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="El Periódico de Extremadura"
                                                                href="http://www.elperiodicoextremadura.com/?_sid=1686737966">
                                                                El Periódico de Extremadura
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="El Periódico Mediterráneo"
                                                                href="https://www.elperiodicomediterraneo.com/?_sid=1686737966">
                                                                El Periódico Mediterráneo
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Faro de Vigo"
                                                                href="https://www.farodevigo.es/?_sid=1686737966">
                                                                Faro de Vigo
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Fórmula 1"
                                                                href="https://formula1.lne.es/?_sid=1686737966">
                                                                Fórmula 1
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Goya"
                                                                href="https://www.premios-cine.com/goya/">
                                                                Goya
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Iberempleos"
                                                                href="https://www.iberempleos.es/">
                                                                Iberempleos
                                                            </a>
                                                        </li>
                                                        <li class="titular">Titular 2</li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Información"
                                                                href="https://www.diarioinformacion.com/">
                                                                Información
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Información TV"
                                                                href="http://www.informaciontv.es/">
                                                                Información TV
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Crónica de Badajoz"
                                                                href="https://www.lacronicabadajoz.com/">
                                                                La Crónica de Badajoz
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Nueva España Asturias"
                                                                href="https://www.lne.es/asturias/?_sid=1686737966">
                                                                La Nueva España Asturias
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Opinión de A Coruña"
                                                                href="https://www.laopinioncoruna.es/?_sid=1686737966">
                                                                La Opinión de A Coruña
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Opinión de Murcia"
                                                                href="https://www.laopiniondemurcia.es/?_sid=1686737966">
                                                                La Opinión de Murcia
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Opinión de Málaga"
                                                                href="https://www.laopiniondemalaga.es/?_sid=1686737966">
                                                                La Opinión de Málaga
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Opinión El correo de Zamora"
                                                                href="https://www.laopiniondezamora.es/?_sid=1686737966">
                                                                La Opinión El correo de Zamora
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Provincia Diario de Las Palmas"
                                                                href="https://www.laprovincia.es/?_sid=1686737966">
                                                                La Provincia Diario de Las Palmas
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="Levante El Mercantil Valenciano"
                                                                href="https://www.levante-emv.com/?_sid=1686737966">
                                                                Levante El Mercantil Valenciano
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Levante TV"
                                                                href="http://www.informaciontv.es/">
                                                                Levante TV
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="L'Empordà Figueres"
                                                                href="https://www.emporda.info/?_sid=1686737966">
                                                                L'Empordà Figueres
                                                            </a>
                                                        </li>
                                                        <li class="titular">Titular 3</li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="Mallorca Zeitung Mallorca"
                                                                href="https://www.mallorcazeitung.es/?_sid=1686737966">
                                                                Mallorca Zeitung Mallorca
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Neomotor"
                                                                href="https://neomotor.epe.es/?_sid=1686737966">
                                                                Neomotor
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Oscars"
                                                                href="https://www.premios-cine.com/oscars/">
                                                                Oscars
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Regió 7 Manresa"
                                                                href="https://www.regio7.cat/?_sid=1686737966">
                                                                Regió Manresa
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Sport"
                                                                href="https://www.sport.es/">
                                                                Sport
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Stilo"
                                                                href="https://www.stilo.es/?_sid=1686737966">
                                                                Stilo
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="Superdeporte Valencia"
                                                                href="https://www.superdeporte.es/?_sid=1686737966">
                                                                Superdeporte Valencia
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Tendencias 21"
                                                                href="https://www.sport.es/es/tendencias21/">
                                                                Tendencias 21
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Tu casa"
                                                                href="https://www.tucasa.com/">
                                                                Tu casa
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Medio Ambiente"
                                                                href="https://www.sport.es/es/medio-ambiente/">
                                                                Medio Ambiente
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Viajar"
                                                                href="https://viajar.elperiodico.com/?_sid=1686737966">
                                                                Viajar
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="Woman Madame Figaro"
                                                                href="https://www.woman.es/">
                                                                Woman Madame Figaro
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </footer>
                                            <!-- end // org: footer -->`,
        "epe-1": `<!-- org: footer -->
                                            <footer id="footer-media" role="contentinfo"
                                                aria-label="Información del pie de página">
                                                <h2 class="ft-helper-hide">
                                                    Información de pie de página
                                                </h2>

                                                <div class="footer-mediaTop">
                                                    <a data-edition-homelink="data-edition-homelink"
                                                        title="El Periódico de España" href="/es/">
                                                        <img width="189" height="45" alt="El Periódico de España"
                                                            loading="lazy"
                                                            src="/cds-statics/assets/img/logos/logoEpeColor.svg"
                                                            data-was-processed="true" />
                                                    </a>

                                                    <div class="rrss"
                                                        aria-label="Redes sociales de El Periódico de España">
                                                        <a rel="nofollow" target="_blank" title="WhatsApp" class="btn"
                                                            href="#" aria-label="WhatsApp de El Periódico">
                                                            <span class="icon icon-Whatsapp" aria-hidden="true"></span>
                                                        </a>
                                                        <a rel="nofollow" target="_blank" title="Facebook" class="btn"
                                                            href="https://www.facebook.com/elperiodicodeespana"
                                                            aria-label="Facebook de El Periódico">
                                                            <span class="icon icon-Facebook" aria-hidden="true"></span>
                                                        </a>
                                                        <a rel="nofollow" target="_blank" title="Twitter" class="btn"
                                                            href="https://twitter.com/ElPeriodico_Esp"
                                                            aria-label="Twitter de El Periódico">
                                                            <span class="icon icon-Twitter" aria-hidden="true"></span>
                                                        </a>
                                                        <a rel="nofollow" target="_blank" title="Instagram" class="btn"
                                                            href="https://www.instagram.com/elperiodicodeespana/"
                                                            aria-label="Instagram de El Periódico">
                                                            <span class="icon icon-Instagram" aria-hidden="true"></span>
                                                        </a>
                                                    </div>

                                                    <h3 class="ft-helper-hide">
                                                        Enlaces institucionales
                                                    </h3>
                                                    <nav aria-label="Enlaces institucionales">
                                                        <ul class="lnk">
                                                            <li>
                                                                <a rel="nofollow"
                                                                    href="https://www.epe.es/es/quienes-somos/"
                                                                    title="Quiénes somos">Quiénes somos</a>
                                                            </li>
                                                            <li>
                                                                <a rel="nofollow"
                                                                    href="https://www.epe.es/es/rss/listado-rss.shtml"
                                                                    title="RSS">RSS</a>
                                                            </li>
                                                            <li>
                                                                <a rel="nofollow"
                                                                    href="https://www.prensaiberica360.es/?_sid=1686819132"
                                                                    title="Publicidad">Publicidad</a>
                                                            </li>
                                                            <li>
                                                                <a rel="nofollow"
                                                                    href="https://www.epe.es/es/avisolegal.shtml"
                                                                    title="Aviso legal">Aviso legal</a>
                                                            </li>
                                                            <li>
                                                                <a rel="nofollow"
                                                                    href="https://www.prensaiberica.es/politica-de-privacidad-resumida/?_sid=1686819132"
                                                                    title="Política de privacidad y cookies">Política de
                                                                    privacidad y cookies</a>
                                                            </li>
                                                            <li>
                                                                <a rel="nofollow"
                                                                    href="javascript: Didomi.preferences.show();"
                                                                    title="Preferencias de Privacidad">Preferencias de
                                                                    Privacidad</a>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </div>

                                                <div class="footer-mediaMiddle">
                                                    <address>
                                                        <p>Unidad de Medios Escritos SAU</p>
                                                        <a target="_blank"
                                                            href="https://www.prensaiberica360.es/?_sid=1686721372"
                                                            title="Prensa Ibérica">
                                                            <img width="114" height="73" loading="lazy"
                                                                title="Prensa Ibérica" alt="Prensa Ibérica"
                                                                src="https://estaticos-cdn.lne.es/images/footer/prensa-iberica-360.png?id=00bc9e3946af531b5a7b" />
                                                        </a>
                                                    </address>
                                                </div>

                                                <div class="footer-mediaBottom">
                                                    <p class="titular">
                                                        Otras webs de Prensa Ibérica Media:
                                                    </p>
                                                    <ul aria-label="Listado de sitios web del grupo Prensa Ibérica">
                                                        <li>
                                                            <a href="https://www.cambalache.es/" rel="nofollow noopener"
                                                                target="_blank" hreflang="es"
                                                                title="Cambalache">Cambalache</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.casagourmet.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Casa Gourmet">Casa Gourmet</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://ocasion.neomotor.com/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Coche de ocasión">Coche de ocasión</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.codigonuevo.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Código Nuevo">Código Nuevo</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.elperiodico.com/cuore/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Cuore">Cuore</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.diaridegirona.cat/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Diari de Girona">Diari de Girona</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.diariocordoba.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Diario de Córdoba">Diario de Córdoba</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.diariodeibiza.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Diario de Ibiza">Diario de Ibiza</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.diariodemallorca.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Diario de Mallorca">Diario de Mallorca</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.elcorreogallego.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Correo Gallego">El Correo Gallego</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.eldia.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Día Tenerife">El Día Tenerife</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.elperiodicodearagon.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Periódico de Aragón">El Periódico de
                                                                Aragón</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.elperiodico.com/es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Periódico de Catalunya">El Periódico de
                                                                Catalunya</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.epe.es/es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Periódico de España">El Periódico de
                                                                España</a>
                                                        </li>
                                                        <li>
                                                            <a href="http://www.elperiodicoextremadura.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Periódico de Extremadura">El Periódico de
                                                                Extremadura</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.elperiodicomediterraneo.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Periódico Mediterráneo">El Periódico
                                                                Mediterráneo</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.farodevigo.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Faro de Vigo">Faro de Vigo</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://formula1.lne.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Fórmula 1">Fórmula 1</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.premios-cine.com/goya/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Goya">Goya</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.iberempleos.es/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Iberempleos">Iberempleos</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.iberpisos.es/" rel="nofollow noopener"
                                                                target="_blank" hreflang="es"
                                                                title="Iberpisos Iberanuncios">Iberpisos
                                                                Iberanuncios</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.diarioinformacion.com/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Información">Información</a>
                                                        </li>
                                                        <li>
                                                            <a href="http://www.informaciontv.es/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Información TV">Información TV</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.lacronicabadajoz.com/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Crónica de Badajoz">La Crónica de Badajoz</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.lne.es/asturias/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Nueva España Asturias">La Nueva España
                                                                Asturias</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.laopinioncoruna.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Opinión de A Coruña">La Opinión de A
                                                                Coruña</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.laopiniondemurcia.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Opinión de Murcia">La Opinión de Murcia</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.laopiniondemalaga.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Opinión de Málaga">La Opinión de Málaga</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.laopiniondezamora.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Opinión El correo de Zamora">La Opinión El
                                                                correo de Zamora</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.laprovincia.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Provincia Diario de Las Palmas">La Provincia
                                                                Diario de Las Palmas</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.levante-emv.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Levante El Mercantil Valenciano">Levante El
                                                                Mercantil Valenciano</a>
                                                        </li>
                                                        <li>
                                                            <a href="http://www.informaciontv.es/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Levante TV">Levante TV</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.emporda.info/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="L'Empordà Figueres">L'Empordà Figueres</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.laloterianavidad.com/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Lotería">Lotería</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.mallorcazeitung.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="de"
                                                                title="Mallorca Zeitung Mallorca">Mallorca Zeitung
                                                                Mallorca</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://neomotor.epe.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Neomotor">Neomotor</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.premios-cine.com/oscars/"
                                                                rel="nofollow noopener" target="_blank" hreflang="en"
                                                                title="Oscars">Oscars</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.regio7.cat/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="ca"
                                                                title="Regió Manresa">Regió Manresa</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.sport.es/" rel="nofollow noopener"
                                                                target="_blank" hreflang="es" title="Sport">Sport</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.stilo.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Stilo">Stilo</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.superdeporte.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Superdeporte Valencia">Superdeporte Valencia</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.sport.es/es/tendencias21/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Tendencias 21">Tendencias 21</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.tucasa.com/" rel="nofollow noopener"
                                                                target="_blank" hreflang="es" title="Tu casa">Tu
                                                                casa</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.sport.es/es/medio-ambiente/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Medio Ambiente">Medio Ambiente</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://viajar.elperiodico.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Viajar">Viajar</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.woman.es/" rel="nofollow noopener"
                                                                target="_blank" hreflang="es"
                                                                title="Woman Madame Figaro">Woman Madame Figaro</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </footer>
                                            <!-- end // org: footer -->`,
        "epe-2": `<!-- org: footer -->
                                            <footer id="footer-media" role="contentinfo"
                                                aria-label="Información del pie de página">
                                                <h2 class="ft-helper-hide">
                                                    Información de pie de página
                                                </h2>

                                                <div class="footer-mediaTop">
                                                    <a data-edition-homelink="data-edition-homelink"
                                                        title="El Periódico de España" href="/es/">
                                                        <img width="189" height="45" alt="El Periódico de España"
                                                            loading="lazy"
                                                            src="/cds-statics/assets/img/logos/logoEpeColor.svg"
                                                            data-was-processed="true" />
                                                    </a>
                                                    <div class="rrss">
                                                        <a rel="nofollow" target="_blank" title="WhatsApp" class="btn"
                                                            href="#">
                                                            <span class="icon icon-Whatsapp"></span>
                                                        </a>
                                                        <a rel="nofollow" target="_blank" title="title text" class="btn"
                                                            href="https://www.facebook.com/elperiodicodeespana">
                                                            <span class="icon icon-Facebook"></span>
                                                        </a>
                                                        <a rel="nofollow" target="_blank" title="title text" class="btn"
                                                            href="https://twitter.com/ElPeriodico_Esp">
                                                            <span class="icon icon-Twitter"></span>
                                                        </a>
                                                        <a rel="nofollow" target="_blank" title="title text" class="btn"
                                                            href="https://www.instagram.com/elperiodicodeespana/">
                                                            <span class="icon icon-Instagram"></span>
                                                        </a>
                                                    </div>
                                                    <ul class="lnk">
                                                        <li>
                                                            <a rel="nofollow"
                                                                href="https://www.epe.es/es/quienes-somos/"
                                                                title="Quiénes somos">Quiénes somos</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow"
                                                                href="https://www.epe.es/es/rss/listado-rss.shtml"
                                                                title="RSS">RSS</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow"
                                                                href="https://www.prensaiberica360.es/?_sid=1686819132"
                                                                title="Publicidad">Publicidad</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow"
                                                                href="https://www.epe.es/es/avisolegal.shtml"
                                                                title="Aviso legal">Aviso legal</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow"
                                                                href="https://www.prensaiberica.es/politica-de-privacidad-resumida/?_sid=1686819132"
                                                                title="Política de privacidad y cookies">Política de
                                                                privacidad y cookies</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow"
                                                                href="javascript: Didomi.preferences.show();"
                                                                title="Preferencias de Privacidad">Preferencias de
                                                                Privacidad</a>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div class="footer-mediaMiddle">
                                                    <address>
                                                        <p>Unidad de Medios Escritos SAU</p>
                                                        <a target="_blank"
                                                            href="https://www.prensaiberica360.es/?_sid=1686721372"
                                                            title="Prensa Ibérica">
                                                            <img width="114" height="73" loading="lazy"
                                                                title="Prensa Ibérica" alt="Prensa Ibérica"
                                                                src="https://estaticos-cdn.lne.es/images/footer/prensa-iberica-360.png?id=00bc9e3946af531b5a7b" />
                                                        </a>
                                                    </address>
                                                </div>

                                                <div class="footer-mediaBottom">
                                                    <p>Otras webs de Prensa Ibérica Media:</p>
                                                    <ul>
                                                        <li class="titular">Titular 1</li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Casa Gourmet"
                                                                href="https://www.casagourmet.es/?_sid=1686737966">Casa
                                                                Gourmet</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Coche de ocasión"
                                                                href="https://ocasion.neomotor.com/">Coche de
                                                                ocasión</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Código Nuevo"
                                                                href="https://www.codigonuevo.com/?_sid=1686737966">Código
                                                                Nuevo</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Cuore"
                                                                href="https://www.elperiodico.com/cuore/?_sid=1686737966">Cuore</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Diari de Girona"
                                                                href="https://www.diaridegirona.cat/?_sid=1686737966">Diari
                                                                de Girona</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Diario de Córdoba"
                                                                href="https://www.diariocordoba.com/?_sid=1686737966">Diario
                                                                de Córdoba</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Diario de Ibiza"
                                                                href="https://www.diariodeibiza.es/?_sid=1686737966">Diario
                                                                de Ibiza</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Diario de Mallorca"
                                                                href="https://www.diariodemallorca.es/?_sid=1686737966">Diario
                                                                de Mallorca</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="El Correo Gallego"
                                                                href="https://www.elcorreogallego.es/?_sid=1686737966">El
                                                                Correo Gallego</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="El Día Tenerife"
                                                                href="https://www.eldia.es/?_sid=1686737966">El Día
                                                                Tenerife</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="El Periódico de Aragón"
                                                                href="https://www.elperiodicodearagon.com/?_sid=1686737966">El
                                                                Periódico de Aragón</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="El Periódico de Catalunya"
                                                                href="https://www.elperiodico.com/es/?_sid=1686737966">El
                                                                Periódico de Catalunya</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="El Periódico de España"
                                                                href="https://www.epe.es/es/?_sid=1686737966">El
                                                                Periódico de España</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="El Periódico de Extremadura"
                                                                href="http://www.elperiodicoextremadura.com/?_sid=1686737966">El
                                                                Periódico de Extremadura</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="El Periódico Mediterráneo"
                                                                href="https://www.elperiodicomediterraneo.com/?_sid=1686737966">El
                                                                Periódico Mediterráneo</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Faro de Vigo"
                                                                href="https://www.farodevigo.es/?_sid=1686737966">Faro
                                                                de Vigo</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Fórmula 1"
                                                                href="https://formula1.lne.es/?_sid=1686737966">Fórmula
                                                                1</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Goya"
                                                                href="https://www.premios-cine.com/goya/">Goya</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Iberempleos"
                                                                href="https://www.iberempleos.es/">Iberempleos</a>
                                                        </li>
                                                        <li class="titular">Titular 2</li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Información"
                                                                href="https://www.diarioinformacion.com/">Información</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Información TV"
                                                                href="http://www.informaciontv.es/">Información TV</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Crónica de Badajoz"
                                                                href="https://www.lacronicabadajoz.com/">La Crónica de
                                                                Badajoz</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Nueva España Asturias"
                                                                href="https://www.lne.es/asturias/?_sid=1686737966">La
                                                                Nueva España Asturias</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Opinión de A Coruña"
                                                                href="https://www.laopinioncoruna.es/?_sid=1686737966">La
                                                                Opinión de A Coruña</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Opinión de Murcia"
                                                                href="https://www.laopiniondemurcia.es/?_sid=1686737966">La
                                                                Opinión de Murcia</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Opinión de Málaga"
                                                                href="https://www.laopiniondemalaga.es/?_sid=1686737966">La
                                                                Opinión de Málaga</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Opinión El correo de Zamora"
                                                                href="https://www.laopiniondezamora.es/?_sid=1686737966">La
                                                                Opinión El correo de Zamora</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Provincia Diario de Las Palmas"
                                                                href="https://www.laprovincia.es/?_sid=1686737966">La
                                                                Provincia Diario de Las Palmas</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="Levante El Mercantil Valenciano"
                                                                href="https://www.levante-emv.com/?_sid=1686737966">Levante
                                                                El Mercantil Valenciano</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Levante TV"
                                                                href="http://www.informaciontv.es/">Levante TV</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="L'Empordà Figueres"
                                                                href="https://www.emporda.info/?_sid=1686737966">L'Empordà
                                                                Figueres</a>
                                                        </li>
                                                        <li class="titular">Titular 3</li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="Mallorca Zeitung Mallorca"
                                                                href="https://www.mallorcazeitung.es/?_sid=1686737966">Mallorca
                                                                Zeitung Mallorca</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Neomotor"
                                                                href="https://neomotor.epe.es/?_sid=1686737966">Neomotor</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Oscars"
                                                                href="https://www.premios-cine.com/oscars/">Oscars</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Regió 7 Manresa"
                                                                href="https://www.regio7.cat/?_sid=1686737966">Regió
                                                                Manresa</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Sport"
                                                                href="https://www.sport.es/">Sport</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Stilo"
                                                                href="https://www.stilo.es/?_sid=1686737966">Stilo</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="Superdeporte Valencia"
                                                                href="https://www.superdeporte.es/?_sid=1686737966">Superdeporte
                                                                Valencia</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Tendencias 21"
                                                                href="https://www.sport.es/es/tendencias21/">Tendencias
                                                                21</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Tu casa"
                                                                href="https://www.tucasa.com/">Tu casa</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Medio Ambiente"
                                                                href="https://www.sport.es/es/medio-ambiente/">Medio
                                                                Ambiente</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Viajar"
                                                                href="https://viajar.elperiodico.com/?_sid=1686737966">Viajar</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="Woman Madame Figaro"
                                                                href="https://www.woman.es/">Woman Madame Figaro</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </footer>
                                            <!-- end // org: footer -->`,
        "reg-1": `<!-- org: footer -->
                                            <footer id="footer-media" role="contentinfo"
                                                aria-label="Información del pie de página">
                                                <h2 class="ft-helper-hide">
                                                    Información de pie de página
                                                </h2>

                                                <nav class="footer-mediaUpper" itemscope=""
                                                    itemtype="https://schema.org/SiteNavigationElement"
                                                    aria-label="Navegación del pie de página">
                                                    <ul>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="asturias" href="https://www.lne.es/asturias/"
                                                                itemprop="url" aria-label="Enlace a Asturias">
                                                                <span itemprop="name">Asturias</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="oviedo" href="https://www.lne.es/oviedo/"
                                                                itemprop="url" aria-label="Enlace a Oviedo">
                                                                <span itemprop="name">Oviedo</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="gijon" href="https://www.lne.es/gijon/"
                                                                itemprop="url" aria-label="Enlace a Gijón">
                                                                <span itemprop="name">Gijón</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="aviles" href="https://www.lne.es/aviles/"
                                                                itemprop="url" aria-label="Enlace a Avilés">
                                                                <span itemprop="name">Avilés</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="siero" href="https://www.lne.es/siero/"
                                                                itemprop="url" aria-label="Enlace a Siero">
                                                                <span itemprop="name">Siero</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="cuencas" href="https://www.lne.es/cuencas/"
                                                                itemprop="url" aria-label="Enlace a Cuencas">
                                                                <span itemprop="name">Cuencas</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="llanera" href="https://www.lne.es/llanera/"
                                                                itemprop="url" aria-label="Enlace a Llanera">
                                                                <span itemprop="name">Llanera</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="villaviciosa" href="https://www.lne.es/villaviciosa/"
                                                                itemprop="url" aria-label="Enlace a Villaviciosa">
                                                                <span itemprop="name">Villaviciosa</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="opinion" href="https://www.lne.es/opinion/"
                                                                itemprop="url" aria-label="Enlace a Opinión">
                                                                <span itemprop="name">Opinión</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="casoabierto" href="https://www.lne.es/sucesos/"
                                                                itemprop="url" aria-label="Enlace a Caso Abierto">
                                                                <span itemprop="name">Caso Abierto</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="economia" href="https://www.lne.es/economia/"
                                                                itemprop="url" aria-label="Enlace a Economía">
                                                                <span itemprop="name">Economía</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="deportes" href="https://www.lne.es/deportes/"
                                                                itemprop="url" aria-label="Enlace a Deportes">
                                                                <span itemprop="name">Deportes</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="actualidad" href="https://www.lne.es/actualidad/"
                                                                itemprop="url" aria-label="Enlace a Actualidad">
                                                                <span itemprop="name">Actualidad</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="lne" href="https://www.lne.es/premium/"
                                                                itemprop="url" aria-label="Enlace a LNE Premium">
                                                                <img class="section-menu__premium-link"
                                                                    src="https://www.lne.es/assets/images/premium/lne-premium-gold.svg"
                                                                    alt="Premium" loading="lazy" />
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </nav>

                                                <div class="footer-mediaTop">
                                                    <a data-edition-homelink="data-edition-homelink" href="/"
                                                        title="Ir a la página principal de El Periódico"
                                                        aria-label="La Nueva España">
                                                        <img src="https://estaticos-cdn.lne.es/images/logo-lne.png?id=764c52e4bb5e4038cf5d"
                                                            alt="La Nueva España" loading="lazy" />
                                                    </a>
                                                    <ul class="lnk"
                                                        aria-label="Enlaces de navegación del pie de página">
                                                        <li>
                                                            <a rel="nofollow" href="https://www.lne.es/contacto/"
                                                                title="Página de contacto"
                                                                aria-label="Enlace a la página de contacto">Contacto</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" href="https://club.lne.es/"
                                                                title="Accede al Club Prensa Asturiana"
                                                                aria-label="Enlace al Club Prensa Asturiana">Club Prensa
                                                                Asturiana</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" href="https://mas.lne.es/puntosdeventa/"
                                                                title="Puntos de venta del periódico"
                                                                aria-label="Enlace a los puntos de venta">Puntos de
                                                                venta</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" href="https://tienda.lne.es/"
                                                                title="Accede a la tienda de El Periódico"
                                                                aria-label="Enlace a la tienda">Tienda</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" href="https://publicidad.lne.es"
                                                                title="Página de publicidad"
                                                                aria-label="Enlace a la página de publicidad">Publicidad</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" href="http://argos.epi.es/"
                                                                title="Agencias de noticias"
                                                                aria-label="Enlace a las agencias de noticias">Agencias</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow"
                                                                href="https://estaticos-cdn.prensaiberica.es/epi/public/content/file/original/2021/0630/08/politica-ambiental-b22b761.pdf?_sid=1686825278"
                                                                title="Política ambiental y PRL"
                                                                aria-label="Enlace a la política ambiental y PRL"
                                                                download>Política Ambiental y PRL</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow"
                                                                href="https://estaticos-cdn.prensaiberica.es/epi/public/content/file/original/2021/0630/08/desempeno-ambiental-de-prensa-asturias-s-a-u-epa-y-artes-graficas-del-principado-s-l-agp-0594782.pdf?_sid=1686825278"
                                                                title="Desempeño ambiental de Prensa Asturias"
                                                                aria-label="Enlace al desempeño ambiental de Prensa Asturias"
                                                                download>Desempeño Ambiental</a>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div class="footer-mediaMiddle">
                                                    <address>
                                                        <p>Editorial Prensa Asturiana S.A</p>
                                                        <a href="https://estaticos-cdn.lne.es/images/footer/prensa-iberica-360.png?id=00bc9e3946af531b5a7b"
                                                            rel="noopener" target="_blank" hreflang="es"
                                                            title="Prensa Ibérica">
                                                            <img width="114" height="73" loading="lazy"
                                                                alt="Prensa Ibérica"
                                                                src="https://estaticos-cdn.lne.es/images/footer/prensa-iberica-360.png?id=00bc9e3946af531b5a7b"
                                                                title="Prensa Ibérica" />
                                                        </a>
                                                    </address>
                                                </div>

                                                <div class="footer-mediaBottom">
                                                    <p class="titular">
                                                        Otras webs de Prensa Ibérica Media:
                                                    </p>
                                                    <ul aria-label="Listado de sitios web del grupo Prensa Ibérica">
                                                        <li>
                                                            <a href="https://www.cambalache.es/" rel="nofollow noopener"
                                                                target="_blank" hreflang="es" title="Cambalache">
                                                                Cambalache
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.casagourmet.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Casa Gourmet">
                                                                Casa Gourmet
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://ocasion.neomotor.com/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Coche de ocasión">
                                                                Coche de ocasión
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.codigonuevo.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Código Nuevo">
                                                                Código Nuevo
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.elperiodico.com/cuore/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Cuore">
                                                                Cuore
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.diaridegirona.cat/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Diari de Girona">
                                                                Diari de Girona
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.diariocordoba.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Diario de Córdoba">
                                                                Diario de Córdoba
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.diariodeibiza.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Diario de Ibiza">
                                                                Diario de Ibiza
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.diariodemallorca.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Diario de Mallorca">
                                                                Diario de Mallorca
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.elcorreogallego.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Correo Gallego">
                                                                El Correo Gallego
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.eldia.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Día Tenerife">
                                                                El Día Tenerife
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.elperiodicodearagon.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Periódico de Aragón">
                                                                El Periódico de Aragón
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.elperiodico.com/es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Periódico de Catalunya">
                                                                El Periódico de Catalunya
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.epe.es/es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Periódico de España">
                                                                El Periódico de España
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="http://www.elperiodicoextremadura.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Periódico de Extremadura">
                                                                El Periódico de Extremadura
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.elperiodicomediterraneo.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Periódico Mediterráneo">
                                                                El Periódico Mediterráneo
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.farodevigo.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Faro de Vigo">
                                                                Faro de Vigo
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://formula1.lne.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Fórmula 1">
                                                                Fórmula 1
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.premios-cine.com/goya/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Goya">
                                                                Goya
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.iberempleos.es/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Iberempleos">
                                                                Iberempleos
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.iberpisos.es/" rel="nofollow noopener"
                                                                target="_blank" hreflang="es"
                                                                title="Iberpisos Iberanuncios">
                                                                Iberpisos Iberanuncios
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.diarioinformacion.com/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Información">
                                                                Información
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="http://www.informaciontv.es/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Información TV">
                                                                Información TV
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.lacronicabadajoz.com/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Crónica de Badajoz">
                                                                La Crónica de Badajoz
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.lne.es/asturias/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Nueva España Asturias">
                                                                La Nueva España Asturias
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.laopinioncoruna.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Opinión de A Coruña">
                                                                La Opinión de A Coruña
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.laopiniondemurcia.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Opinión de Murcia">
                                                                La Opinión de Murcia
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.laopiniondemalaga.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Opinión de Málaga">
                                                                La Opinión de Málaga
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.laopiniondezamora.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Opinión El correo de Zamora">
                                                                La Opinión El correo de Zamora
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.laprovincia.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Provincia Diario de Las Palmas">
                                                                La Provincia Diario de Las Palmas
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.levante-emv.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Levante El Mercantil Valenciano">
                                                                Levante El Mercantil Valenciano
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="http://www.informaciontv.es/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Levante TV">
                                                                Levante TV
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.emporda.info/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="L'Empordà Figueres">
                                                                L'Empordà Figueres
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.laloterianavidad.com/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Lotería">
                                                                Lotería
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.mallorcazeitung.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="de"
                                                                title="Mallorca Zeitung Mallorca">
                                                                Mallorca Zeitung Mallorca
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://neomotor.epe.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Neomotor">
                                                                Neomotor
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.premios-cine.com/oscars/"
                                                                rel="nofollow noopener" target="_blank" hreflang="en"
                                                                title="Oscars">
                                                                Oscars
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.regio7.cat/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="ca"
                                                                title="Regió Manresa">
                                                                Regió Manresa
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.sport.es/" rel="nofollow noopener"
                                                                target="_blank" hreflang="es" title="Sport">
                                                                Sport
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.stilo.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Stilo">
                                                                Stilo
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.superdeporte.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Superdeporte Valencia">
                                                                Superdeporte Valencia
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.sport.es/es/tendencias21/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Tendencias 21">
                                                                Tendencias 21
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.tucasa.com/" rel="nofollow noopener"
                                                                target="_blank" hreflang="es" title="Tu casa">
                                                                Tu casa
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.sport.es/es/medio-ambiente/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Medio Ambiente">
                                                                Medio Ambiente
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://viajar.elperiodico.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Viajar">
                                                                Viajar
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.woman.es/" rel="nofollow noopener"
                                                                target="_blank" hreflang="es"
                                                                title="Woman Madame Figaro">
                                                                Woman Madame Figaro
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div class="footer-legalBar">
                                                    <p>
                                                        Editorial Prensa Asturiana, S.A<br />Todos los
                                                        derechos reservados
                                                    </p>

                                                    <nav aria-label="Enlaces legales de Prensa Asturiana">
                                                        <ul class="footer-legalBar__menu">
                                                            <li class="footer-legalBar__item">
                                                                <a href="https://micuenta.lne.es/protecciondatos?gdprTipo=3"
                                                                    title="Enlace a la página del aviso legal"
                                                                    aria-label="Aviso legal de Prensa Asturiana">
                                                                    Aviso legal
                                                                </a>
                                                            </li>
                                                            <li class="footer-legalBar__item">
                                                                <a href="https://www.prensaiberica.es/politica-de-privacidad-resumida/?_sid=1697198671"
                                                                    title="Enlace a la política de privacidad y cookies"
                                                                    aria-label="Política de privacidad y cookies de Prensa Asturiana">
                                                                    Política de privacidad y cookies
                                                                </a>
                                                            </li>
                                                            <li class="footer-legalBar__item">
                                                                <a href="https://www.prensaiberica.es/canal-de-denuncias/?_sid=1697198671"
                                                                    title="Enlace al canal de denuncias"
                                                                    aria-label="Canal de denuncias de Prensa Asturiana">
                                                                    Canal de denuncias
                                                                </a>
                                                            </li>
                                                            <li class="footer-legalBar__item">
                                                                <a href="javascript:Didomi.preferences.show();"
                                                                    title="Abrir preferencias de privacidad"
                                                                    aria-label="Abrir las preferencias de privacidad">
                                                                    Preferencias de privacidad
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </div>
                                            </footer>
                                            <!-- end // org: footer -->`,
        "reg-2": `<!-- org: footer -->
                                            <footer id="footer-media" role="contentinfo"
                                                aria-label="Información del pie de página">
                                                <h2 class="ft-helper-hide">
                                                    Información de pie de página
                                                </h2>

                                                <nav class="footer-mediaUpper" itemscope=""
                                                    itemtype="https://schema.org/SiteNavigationElement"
                                                    aria-label="Navegación del pie de página">
                                                    <ul>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="asturias" href="https://www.lne.es/asturias/"
                                                                itemprop="url" aria-label="Enlace a Asturias">
                                                                <span itemprop="name">Asturias</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="oviedo" href="https://www.lne.es/oviedo/"
                                                                itemprop="url" aria-label="Enlace a Oviedo">
                                                                <span itemprop="name">Oviedo</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="gijon" href="https://www.lne.es/gijon/"
                                                                itemprop="url" aria-label="Enlace a Gijón">
                                                                <span itemprop="name">Gijón</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="aviles" href="https://www.lne.es/aviles/"
                                                                itemprop="url" aria-label="Enlace a Avilés">
                                                                <span itemprop="name">Avilés</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="siero" href="https://www.lne.es/siero/"
                                                                itemprop="url" aria-label="Enlace a Siero">
                                                                <span itemprop="name">Siero</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="cuencas" href="https://www.lne.es/cuencas/"
                                                                itemprop="url" aria-label="Enlace a Cuencas">
                                                                <span itemprop="name">Cuencas</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="llanera" href="https://www.lne.es/llanera/"
                                                                itemprop="url" aria-label="Enlace a Llanera">
                                                                <span itemprop="name">Llanera</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="villaviciosa" href="https://www.lne.es/villaviciosa/"
                                                                itemprop="url" aria-label="Enlace a Villaviciosa">
                                                                <span itemprop="name">Villaviciosa</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="opinion" href="https://www.lne.es/opinion/"
                                                                itemprop="url" aria-label="Enlace a Opinión">
                                                                <span itemprop="name">Opinión</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="casoabierto" href="https://www.lne.es/sucesos/"
                                                                itemprop="url" aria-label="Enlace a Caso Abierto">
                                                                <span itemprop="name">Caso Abierto</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="economia" href="https://www.lne.es/economia/"
                                                                itemprop="url" aria-label="Enlace a Economía">
                                                                <span itemprop="name">Economía</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="deportes" href="https://www.lne.es/deportes/"
                                                                itemprop="url" aria-label="Enlace a Deportes">
                                                                <span itemprop="name">Deportes</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="actualidad" href="https://www.lne.es/actualidad/"
                                                                itemprop="url" aria-label="Enlace a Actualidad">
                                                                <span itemprop="name">Actualidad</span>
                                                            </a>
                                                        </li>
                                                        <li itemprop="name" role="listitem">
                                                            <a id="lne" href="https://www.lne.es/premium/"
                                                                itemprop="url" aria-label="Enlace a LNE Premium">
                                                                <img class="section-menu__premium-link"
                                                                    src="https://www.lne.es/assets/images/premium/lne-premium-gold.svg"
                                                                    alt="Premium" loading="lazy" />
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </nav>

                                                <div class="footer-mediaTop">
                                                    <a data-edition-homelink="data-edition-homelink" href="/"
                                                        title="Ir a la página principal de El Periódico"
                                                        aria-label="La Nueva España">
                                                        <img src="https://estaticos-cdn.lne.es/images/logo-lne.png?id=764c52e4bb5e4038cf5d"
                                                            alt="La Nueva España" loading="lazy" />
                                                    </a>
                                                    <ul class="lnk"
                                                        aria-label="Enlaces de navegación del pie de página">
                                                        <li>
                                                            <a rel="nofollow" href="https://www.lne.es/contacto/"
                                                                title="Página de contacto"
                                                                aria-label="Enlace a la página de contacto">Contacto</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" href="https://club.lne.es/"
                                                                title="Accede al Club Prensa Asturiana"
                                                                aria-label="Enlace al Club Prensa Asturiana">Club Prensa
                                                                Asturiana</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" href="https://mas.lne.es/puntosdeventa/"
                                                                title="Puntos de venta del periódico"
                                                                aria-label="Enlace a los puntos de venta">Puntos de
                                                                venta</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" href="https://tienda.lne.es/"
                                                                title="Accede a la tienda de El Periódico"
                                                                aria-label="Enlace a la tienda">Tienda</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" href="https://publicidad.lne.es"
                                                                title="Página de publicidad"
                                                                aria-label="Enlace a la página de publicidad">Publicidad</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" href="http://argos.epi.es/"
                                                                title="Agencias de noticias"
                                                                aria-label="Enlace a las agencias de noticias">Agencias</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow"
                                                                href="https://estaticos-cdn.prensaiberica.es/epi/public/content/file/original/2021/0630/08/politica-ambiental-b22b761.pdf?_sid=1686825278"
                                                                title="Política ambiental y PRL"
                                                                aria-label="Enlace a la política ambiental y PRL"
                                                                download>Política Ambiental y PRL</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow"
                                                                href="https://estaticos-cdn.prensaiberica.es/epi/public/content/file/original/2021/0630/08/desempeno-ambiental-de-prensa-asturias-s-a-u-epa-y-artes-graficas-del-principado-s-l-agp-0594782.pdf?_sid=1686825278"
                                                                title="Desempeño ambiental de Prensa Asturias"
                                                                aria-label="Enlace al desempeño ambiental de Prensa Asturias"
                                                                download>Desempeño Ambiental</a>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div class="footer-mediaMiddle">
                                                    <address>
                                                        <p>Editorial Prensa Asturiana S.A</p>
                                                        <a href="https://estaticos-cdn.lne.es/images/footer/prensa-iberica-360.png?id=00bc9e3946af531b5a7b"
                                                            rel="noopener" target="_blank" hreflang="es"
                                                            title="Prensa Ibérica">
                                                            <img width="114" height="73" loading="lazy"
                                                                alt="Prensa Ibérica"
                                                                src="https://estaticos-cdn.lne.es/images/footer/prensa-iberica-360.png?id=00bc9e3946af531b5a7b"
                                                                title="Prensa Ibérica" />
                                                        </a>
                                                    </address>
                                                </div>

                                                <div class="footer-mediaBottom">
                                                    <p>Otras webs de Prensa Ibérica Media:</p>
                                                    <ul>
                                                        <li class="titular">Titular 1</li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Casa Gourmet"
                                                                href="https://www.casagourmet.es/?_sid=1686737966">
                                                                Casa Gourmet
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Coche de ocasión"
                                                                href="https://ocasion.neomotor.com/">
                                                                Coche de ocasión
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Código Nuevo"
                                                                href="https://www.codigonuevo.com/?_sid=1686737966">
                                                                Código Nuevo
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Cuore"
                                                                href="https://www.elperiodico.com/cuore/?_sid=1686737966">
                                                                Cuore
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Diari de Girona"
                                                                href="https://www.diaridegirona.cat/?_sid=1686737966">
                                                                Diari de Girona
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Diario de Córdoba"
                                                                href="https://www.diariocordoba.com/?_sid=1686737966">
                                                                Diario de Córdoba
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Diario de Ibiza"
                                                                href="https://www.diariodeibiza.es/?_sid=1686737966">
                                                                Diario de Ibiza
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Diario de Mallorca"
                                                                href="https://www.diariodemallorca.es/?_sid=1686737966">
                                                                Diario de Mallorca
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="El Correo Gallego"
                                                                href="https://www.elcorreogallego.es/?_sid=1686737966">
                                                                El Correo Gallego
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="El Día Tenerife"
                                                                href="https://www.eldia.es/?_sid=1686737966">
                                                                El Día Tenerife
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="El Periódico de Aragón"
                                                                href="https://www.elperiodicodearagon.com/?_sid=1686737966">
                                                                El Periódico de Aragón
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="El Periódico de Catalunya"
                                                                href="https://www.elperiodico.com/es/?_sid=1686737966">
                                                                El Periódico de Catalunya
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="El Periódico de España"
                                                                href="https://www.epe.es/es/?_sid=1686737966">
                                                                El Periódico de España
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="El Periódico de Extremadura"
                                                                href="http://www.elperiodicoextremadura.com/?_sid=1686737966">
                                                                El Periódico de Extremadura
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="El Periódico Mediterráneo"
                                                                href="https://www.elperiodicomediterraneo.com/?_sid=1686737966">
                                                                El Periódico Mediterráneo
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Faro de Vigo"
                                                                href="https://www.farodevigo.es/?_sid=1686737966">
                                                                Faro de Vigo
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Fórmula 1"
                                                                href="https://formula1.lne.es/?_sid=1686737966">
                                                                Fórmula 1
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Goya"
                                                                href="https://www.premios-cine.com/goya/">
                                                                Goya
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Iberempleos"
                                                                href="https://www.iberempleos.es/">
                                                                Iberempleos
                                                            </a>
                                                        </li>
                                                        <li class="titular">Titular 2</li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Información"
                                                                href="https://www.diarioinformacion.com/">
                                                                Información
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Información TV"
                                                                href="http://www.informaciontv.es/">
                                                                Información TV
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Crónica de Badajoz"
                                                                href="https://www.lacronicabadajoz.com/">
                                                                La Crónica de Badajoz
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Nueva España Asturias"
                                                                href="https://www.lne.es/asturias/?_sid=1686737966">
                                                                La Nueva España Asturias
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Opinión de A Coruña"
                                                                href="https://www.laopinioncoruna.es/?_sid=1686737966">
                                                                La Opinión de A Coruña
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Opinión de Murcia"
                                                                href="https://www.laopiniondemurcia.es/?_sid=1686737966">
                                                                La Opinión de Murcia
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Opinión de Málaga"
                                                                href="https://www.laopiniondemalaga.es/?_sid=1686737966">
                                                                La Opinión de Málaga
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Opinión El correo de Zamora"
                                                                href="https://www.laopiniondezamora.es/?_sid=1686737966">
                                                                La Opinión El correo de Zamora
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Provincia Diario de Las Palmas"
                                                                href="https://www.laprovincia.es/?_sid=1686737966">
                                                                La Provincia Diario de Las Palmas
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="Levante El Mercantil Valenciano"
                                                                href="https://www.levante-emv.com/?_sid=1686737966">
                                                                Levante El Mercantil Valenciano
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Levante TV"
                                                                href="http://www.informaciontv.es/">
                                                                Levante TV
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="L'Empordà Figueres"
                                                                href="https://www.emporda.info/?_sid=1686737966">
                                                                L'Empordà Figueres
                                                            </a>
                                                        </li>
                                                        <li class="titular">Titular 3</li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="Mallorca Zeitung Mallorca"
                                                                href="https://www.mallorcazeitung.es/?_sid=1686737966">
                                                                Mallorca Zeitung Mallorca
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Neomotor"
                                                                href="https://neomotor.epe.es/?_sid=1686737966">
                                                                Neomotor
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Oscars"
                                                                href="https://www.premios-cine.com/oscars/">
                                                                Oscars
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Regió 7 Manresa"
                                                                href="https://www.regio7.cat/?_sid=1686737966">
                                                                Regió Manresa
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Sport"
                                                                href="https://www.sport.es/">
                                                                Sport
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Stilo"
                                                                href="https://www.stilo.es/?_sid=1686737966">
                                                                Stilo
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="Superdeporte Valencia"
                                                                href="https://www.superdeporte.es/?_sid=1686737966">
                                                                Superdeporte Valencia
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Tendencias 21"
                                                                href="https://www.sport.es/es/tendencias21/">
                                                                Tendencias 21
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Tu casa"
                                                                href="https://www.tucasa.com/">
                                                                Tu casa
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Medio Ambiente"
                                                                href="https://www.sport.es/es/medio-ambiente/">
                                                                Medio Ambiente
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Viajar"
                                                                href="https://viajar.elperiodico.com/?_sid=1686737966">
                                                                Viajar
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="Woman Madame Figaro"
                                                                href="https://www.woman.es/">
                                                                Woman Madame Figaro
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div class="footer-legalBar">
                                                    <p>
                                                        Editorial Prensa Asturiana, S.A<br />Todos los
                                                        derechos reservados
                                                    </p>

                                                    <nav aria-label="Enlaces legales de Prensa Asturiana">
                                                        <ul class="footer-legalBar__menu">
                                                            <li class="footer-legalBar__item">
                                                                <a href="https://micuenta.lne.es/protecciondatos?gdprTipo=3"
                                                                    title="Enlace a la página del aviso legal"
                                                                    aria-label="Aviso legal de Prensa Asturiana">
                                                                    Aviso legal
                                                                </a>
                                                            </li>
                                                            <li class="footer-legalBar__item">
                                                                <a href="https://www.prensaiberica.es/politica-de-privacidad-resumida/?_sid=1697198671"
                                                                    title="Enlace a la política de privacidad y cookies"
                                                                    aria-label="Política de privacidad y cookies de Prensa Asturiana">
                                                                    Política de privacidad y cookies
                                                                </a>
                                                            </li>
                                                            <li class="footer-legalBar__item">
                                                                <a href="https://www.prensaiberica.es/canal-de-denuncias/?_sid=1697198671"
                                                                    title="Enlace al canal de denuncias"
                                                                    aria-label="Canal de denuncias de Prensa Asturiana">
                                                                    Canal de denuncias
                                                                </a>
                                                            </li>
                                                            <li class="footer-legalBar__item">
                                                                <a href="javascript:Didomi.preferences.show();"
                                                                    title="Abrir preferencias de privacidad"
                                                                    aria-label="Abrir las preferencias de privacidad">
                                                                    Preferencias de privacidad
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </div>
                                            </footer>
                                            <!-- end // org: footer -->`,
        "sport-1": `<!-- org: footer -->
                                            <footer id="footer-media" role="contentinfo"
                                                aria-label="Información del pie de página">
                                                <h2 class="ft-helper-hide">
                                                    Información de pie de página
                                                </h2>

                                                <div class="footer-mediaTop">
                                                    <a href="https://www.sport.es/es/"
                                                        title="Ir a la página principal de Sport" aria-label="Sport">
                                                        <img width="263" height="65" loading="lazy" alt="Logo de Sport"
                                                            src="/cds-statics/assets/img/logos/logoSportcolor.svg" />
                                                    </a>
                                                    <div class="rrss" aria-label="Redes sociales de Sport">
                                                        <a class="btn" href="#" rel="nofollow" target="_blank"
                                                            title="WhatsApp de Sport" aria-label="Enlace a WhatsApp">
                                                            <span class="icon icon-Whatsapp" aria-hidden="true"></span>
                                                        </a>
                                                        <a href="#" class="btn" title="Facebook de Sport" target="_self"
                                                            aria-label="Enlace a Facebook">
                                                            <span class="icon icon-Facebook" aria-hidden="true"></span>
                                                        </a>
                                                        <a href="#" class="btn" title="Twitter de Sport" target="_self"
                                                            aria-label="Enlace a Twitter">
                                                            <span class="icon icon-Twitter" aria-hidden="true"></span>
                                                        </a>
                                                        <a href="#" class="btn" title="Instagram de Sport"
                                                            target="_self" aria-label="Enlace a Instagram">
                                                            <span class="icon icon-Instagram" aria-hidden="true"></span>
                                                        </a>
                                                        <a href="#" class="btn" title="YouTube de Sport" target="_self"
                                                            aria-label="Enlace a YouTube">
                                                            <span class="icon icon-Youtube" aria-hidden="true"></span>
                                                        </a>
                                                    </div>
                                                    <ul class="lnk" aria-label="Enlaces institucionales de Sport">
                                                        <li>
                                                            <a rel="nofollow"
                                                                href="https://www.sport.es/es/quienessomos.shtml"
                                                                title="Quiénes somos en Sport"
                                                                aria-label="Enlace a la página Quiénes somos">Quiénes
                                                                somos</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" href="https://www.sport.es/es/mapaweb/"
                                                                title="Mapa web de Sport"
                                                                aria-label="Enlace al mapa web">Mapa web</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow"
                                                                href="https://www.sport.es/es/avisolegal.shtml"
                                                                title="Aviso legal de Sport"
                                                                aria-label="Enlace al aviso legal">Aviso legal</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow"
                                                                href="https://www.sport.es/es/contactar.shtml"
                                                                title="Página de contacto de Sport"
                                                                aria-label="Enlace a la página de contacto">Contactar</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" href="http://www.zetagestion.com/"
                                                                title="Información sobre publicidad en Sport"
                                                                aria-label="Enlace a la página de publicidad">Publicidad</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" href="https://www.sport.es/es/rss/"
                                                                title="RSS de Sport"
                                                                aria-label="Enlace al feed RSS">RSS</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow"
                                                                href="https://www.prensaiberica.es/politica-de-privacidad-resumida/?_sid=1686721372"
                                                                title="Política de privacidad y cookies de Sport"
                                                                aria-label="Enlace a la política de privacidad y cookies">Política
                                                                de privacidad y cookies</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow"
                                                                href="javascript: Didomi.preferences.show();"
                                                                title="Preferencias de privacidad en Sport"
                                                                aria-label="Enlace a preferencias de privacidad">Preferencias
                                                                de Privacidad</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow"
                                                                href="https://www.sport.es/es/avisolegal.shtml"
                                                                title="Consejos legales de Sport"
                                                                aria-label="Enlace a los consejos legales">Legal
                                                                advice</a>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div class="footer-mediaMiddle">
                                                    <address>
                                                        <p>Ediciones Deportivas Catalanas, S.A.U</p>
                                                        <a href="https://estaticos-cdn.lne.es/images/footer/prensa-iberica-360.png?id=00bc9e3946af531b5a7b"
                                                            rel="noopener" target="_blank" hreflang="es"
                                                            title="Prensa Ibérica">
                                                            <img width="114" height="73" loading="lazy"
                                                                alt="Prensa Ibérica"
                                                                src="https://estaticos-cdn.lne.es/images/footer/prensa-iberica-360.png?id=00bc9e3946af531b5a7b"
                                                                title="Prensa Ibérica" />
                                                        </a>
                                                    </address>
                                                </div>

                                                <div class="footer-mediaBottom">
                                                    <p class="titular">
                                                        Otras webs de Prensa Ibérica Media:
                                                    </p>
                                                    <ul aria-label="Listado de sitios web del grupo Prensa Ibérica">
                                                        <li>
                                                            <a href="https://www.cambalache.es/" rel="nofollow noopener"
                                                                target="_blank" hreflang="es" title="Cambalache">
                                                                Cambalache
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.casagourmet.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Casa Gourmet">
                                                                Casa Gourmet
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://ocasion.neomotor.com/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Coche de ocasión">
                                                                Coche de ocasión
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.codigonuevo.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Código Nuevo">
                                                                Código Nuevo
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.elperiodico.com/cuore/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Cuore">
                                                                Cuore
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.diaridegirona.cat/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Diari de Girona">
                                                                Diari de Girona
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.diariocordoba.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Diario de Córdoba">
                                                                Diario de Córdoba
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.diariodeibiza.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Diario de Ibiza">
                                                                Diario de Ibiza
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.diariodemallorca.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Diario de Mallorca">
                                                                Diario de Mallorca
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.elcorreogallego.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Correo Gallego">
                                                                El Correo Gallego
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.eldia.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Día Tenerife">
                                                                El Día Tenerife
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.elperiodicodearagon.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Periódico de Aragón">
                                                                El Periódico de Aragón
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.elperiodico.com/es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Periódico de Catalunya">
                                                                El Periódico de Catalunya
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.epe.es/es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Periódico de España">
                                                                El Periódico de España
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="http://www.elperiodicoextremadura.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Periódico de Extremadura">
                                                                El Periódico de Extremadura
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.elperiodicomediterraneo.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="El Periódico Mediterráneo">
                                                                El Periódico Mediterráneo
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.farodevigo.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Faro de Vigo">
                                                                Faro de Vigo
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://formula1.lne.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Fórmula 1">
                                                                Fórmula 1
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.premios-cine.com/goya/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Goya">
                                                                Goya
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.iberempleos.es/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Iberempleos">
                                                                Iberempleos
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.iberpisos.es/" rel="nofollow noopener"
                                                                target="_blank" hreflang="es"
                                                                title="Iberpisos Iberanuncios">
                                                                Iberpisos Iberanuncios
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.diarioinformacion.com/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Información">
                                                                Información
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="http://www.informaciontv.es/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Información TV">
                                                                Información TV
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.lacronicabadajoz.com/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Crónica de Badajoz">
                                                                La Crónica de Badajoz
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.lne.es/asturias/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Nueva España Asturias">
                                                                La Nueva España Asturias
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.laopinioncoruna.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Opinión de A Coruña">
                                                                La Opinión de A Coruña
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.laopiniondemurcia.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Opinión de Murcia">
                                                                La Opinión de Murcia
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.laopiniondemalaga.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Opinión de Málaga">
                                                                La Opinión de Málaga
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.laopiniondezamora.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Opinión El correo de Zamora">
                                                                La Opinión El correo de Zamora
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.laprovincia.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="La Provincia Diario de Las Palmas">
                                                                La Provincia Diario de Las Palmas
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.levante-emv.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Levante El Mercantil Valenciano">
                                                                Levante El Mercantil Valenciano
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="http://www.informaciontv.es/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Levante TV">
                                                                Levante TV
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.emporda.info/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="L'Empordà Figueres">
                                                                L'Empordà Figueres
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.laloterianavidad.com/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Lotería">
                                                                Lotería
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.mallorcazeitung.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="de"
                                                                title="Mallorca Zeitung Mallorca">
                                                                Mallorca Zeitung Mallorca
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://neomotor.epe.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Neomotor">
                                                                Neomotor
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.premios-cine.com/oscars/"
                                                                rel="nofollow noopener" target="_blank" hreflang="en"
                                                                title="Oscars">
                                                                Oscars
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.regio7.cat/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="ca"
                                                                title="Regió Manresa">
                                                                Regió Manresa
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.sport.es/" rel="nofollow noopener"
                                                                target="_blank" hreflang="es" title="Sport">
                                                                Sport
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.stilo.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Stilo">
                                                                Stilo
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.superdeporte.es/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Superdeporte Valencia">
                                                                Superdeporte Valencia
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.sport.es/es/tendencias21/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Tendencias 21">
                                                                Tendencias 21
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.tucasa.com/" rel="nofollow noopener"
                                                                target="_blank" hreflang="es" title="Tu casa">
                                                                Tu casa
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.sport.es/es/medio-ambiente/"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Medio Ambiente">
                                                                Medio Ambiente
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://viajar.elperiodico.com/?_sid=1686737966"
                                                                rel="nofollow noopener" target="_blank" hreflang="es"
                                                                title="Viajar">
                                                                Viajar
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="https://www.woman.es/" rel="nofollow noopener"
                                                                target="_blank" hreflang="es"
                                                                title="Woman Madame Figaro">
                                                                Woman Madame Figaro
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </footer>
                                            <!-- end // org: footer -->`,
        "sport-2": `<!-- org: footer -->
                                            <footer id="footer-media" role="contentinfo"
                                                aria-label="Información del pie de página">
                                                <h2 class="ft-helper-hide">
                                                    Información de pie de página
                                                </h2>

                                                <div class="footer-mediaTop">
                                                    <a href="https://www.sport.es/es/"
                                                        title="Ir a la página principal de Sport" aria-label="Sport">
                                                        <img width="263" height="65" loading="lazy" alt="Logo de Sport"
                                                            src="/cds-statics/assets/img/logos/logoSportcolor.svg" />
                                                    </a>
                                                    <div class="rrss" aria-label="Redes sociales de Sport">
                                                        <a class="btn" href="#" rel="nofollow" target="_blank"
                                                            title="WhatsApp de Sport" aria-label="Enlace a WhatsApp">
                                                            <span class="icon icon-Whatsapp" aria-hidden="true"></span>
                                                        </a>
                                                        <a href="#" class="btn" title="Facebook de Sport" target="_self"
                                                            aria-label="Enlace a Facebook">
                                                            <span class="icon icon-Facebook" aria-hidden="true"></span>
                                                        </a>
                                                        <a href="#" class="btn" title="Twitter de Sport" target="_self"
                                                            aria-label="Enlace a Twitter">
                                                            <span class="icon icon-Twitter" aria-hidden="true"></span>
                                                        </a>
                                                        <a href="#" class="btn" title="Instagram de Sport"
                                                            target="_self" aria-label="Enlace a Instagram">
                                                            <span class="icon icon-Instagram" aria-hidden="true"></span>
                                                        </a>
                                                        <a href="#" class="btn" title="YouTube de Sport" target="_self"
                                                            aria-label="Enlace a YouTube">
                                                            <span class="icon icon-Youtube" aria-hidden="true"></span>
                                                        </a>
                                                    </div>
                                                    <ul class="lnk" aria-label="Enlaces institucionales de Sport">
                                                        <li>
                                                            <a rel="nofollow"
                                                                href="https://www.sport.es/es/quienessomos.shtml"
                                                                title="Quiénes somos en Sport"
                                                                aria-label="Enlace a la página Quiénes somos">Quiénes
                                                                somos</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" href="https://www.sport.es/es/mapaweb/"
                                                                title="Mapa web de Sport"
                                                                aria-label="Enlace al mapa web">Mapa web</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow"
                                                                href="https://www.sport.es/es/avisolegal.shtml"
                                                                title="Aviso legal de Sport"
                                                                aria-label="Enlace al aviso legal">Aviso legal</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow"
                                                                href="https://www.sport.es/es/contactar.shtml"
                                                                title="Página de contacto de Sport"
                                                                aria-label="Enlace a la página de contacto">Contactar</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" href="http://www.zetagestion.com/"
                                                                title="Información sobre publicidad en Sport"
                                                                aria-label="Enlace a la página de publicidad">Publicidad</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" href="https://www.sport.es/es/rss/"
                                                                title="RSS de Sport"
                                                                aria-label="Enlace al feed RSS">RSS</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow"
                                                                href="https://www.prensaiberica.es/politica-de-privacidad-resumida/?_sid=1686721372"
                                                                title="Política de privacidad y cookies de Sport"
                                                                aria-label="Enlace a la política de privacidad y cookies">Política
                                                                de privacidad y cookies</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow"
                                                                href="javascript: Didomi.preferences.show();"
                                                                title="Preferencias de privacidad en Sport"
                                                                aria-label="Enlace a preferencias de privacidad">Preferencias
                                                                de Privacidad</a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow"
                                                                href="https://www.sport.es/es/avisolegal.shtml"
                                                                title="Consejos legales de Sport"
                                                                aria-label="Enlace a los consejos legales">Legal
                                                                advice</a>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div class="footer-mediaMiddle">
                                                    <address>
                                                        <p>Ediciones Deportivas Catalanas, S.A.U</p>
                                                        <a href="https://estaticos-cdn.lne.es/images/footer/prensa-iberica-360.png?id=00bc9e3946af531b5a7b"
                                                            rel="noopener" target="_blank" hreflang="es"
                                                            title="Prensa Ibérica">
                                                            <img width="114" height="73" loading="lazy"
                                                                alt="Prensa Ibérica"
                                                                src="https://estaticos-cdn.lne.es/images/footer/prensa-iberica-360.png?id=00bc9e3946af531b5a7b"
                                                                title="Prensa Ibérica" />
                                                        </a>
                                                    </address>
                                                </div>

                                                <div class="footer-mediaBottom">
                                                    <p>Otras webs de Prensa Ibérica Media:</p>
                                                    <ul>
                                                        <li class="titular">Titular 1</li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Casa Gourmet"
                                                                href="https://www.casagourmet.es/?_sid=1686737966">
                                                                Casa Gourmet
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Coche de ocasión"
                                                                href="https://ocasion.neomotor.com/">
                                                                Coche de ocasión
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Código Nuevo"
                                                                href="https://www.codigonuevo.com/?_sid=1686737966">
                                                                Código Nuevo
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Cuore"
                                                                href="https://www.elperiodico.com/cuore/?_sid=1686737966">
                                                                Cuore
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Diari de Girona"
                                                                href="https://www.diaridegirona.cat/?_sid=1686737966">
                                                                Diari de Girona
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Diario de Córdoba"
                                                                href="https://www.diariocordoba.com/?_sid=1686737966">
                                                                Diario de Córdoba
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Diario de Ibiza"
                                                                href="https://www.diariodeibiza.es/?_sid=1686737966">
                                                                Diario de Ibiza
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Diario de Mallorca"
                                                                href="https://www.diariodemallorca.es/?_sid=1686737966">
                                                                Diario de Mallorca
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="El Correo Gallego"
                                                                href="https://www.elcorreogallego.es/?_sid=1686737966">
                                                                El Correo Gallego
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="El Día Tenerife"
                                                                href="https://www.eldia.es/?_sid=1686737966">
                                                                El Día Tenerife
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="El Periódico de Aragón"
                                                                href="https://www.elperiodicodearagon.com/?_sid=1686737966">
                                                                El Periódico de Aragón
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="El Periódico de Catalunya"
                                                                href="https://www.elperiodico.com/es/?_sid=1686737966">
                                                                El Periódico de Catalunya
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="El Periódico de España"
                                                                href="https://www.epe.es/es/?_sid=1686737966">
                                                                El Periódico de España
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="El Periódico de Extremadura"
                                                                href="http://www.elperiodicoextremadura.com/?_sid=1686737966">
                                                                El Periódico de Extremadura
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="El Periódico Mediterráneo"
                                                                href="https://www.elperiodicomediterraneo.com/?_sid=1686737966">
                                                                El Periódico Mediterráneo
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Faro de Vigo"
                                                                href="https://www.farodevigo.es/?_sid=1686737966">
                                                                Faro de Vigo
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Fórmula 1"
                                                                href="https://formula1.lne.es/?_sid=1686737966">
                                                                Fórmula 1
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Goya"
                                                                href="https://www.premios-cine.com/goya/">
                                                                Goya
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Iberempleos"
                                                                href="https://www.iberempleos.es/">
                                                                Iberempleos
                                                            </a>
                                                        </li>
                                                        <li class="titular">Titular 2</li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Información"
                                                                href="https://www.diarioinformacion.com/">
                                                                Información
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Información TV"
                                                                href="http://www.informaciontv.es/">
                                                                Información TV
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Crónica de Badajoz"
                                                                href="https://www.lacronicabadajoz.com/">
                                                                La Crónica de Badajoz
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Nueva España Asturias"
                                                                href="https://www.lne.es/asturias/?_sid=1686737966">
                                                                La Nueva España Asturias
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Opinión de A Coruña"
                                                                href="https://www.laopinioncoruna.es/?_sid=1686737966">
                                                                La Opinión de A Coruña
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Opinión de Murcia"
                                                                href="https://www.laopiniondemurcia.es/?_sid=1686737966">
                                                                La Opinión de Murcia
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Opinión de Málaga"
                                                                href="https://www.laopiniondemalaga.es/?_sid=1686737966">
                                                                La Opinión de Málaga
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Opinión El correo de Zamora"
                                                                href="https://www.laopiniondezamora.es/?_sid=1686737966">
                                                                La Opinión El correo de Zamora
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="La Provincia Diario de Las Palmas"
                                                                href="https://www.laprovincia.es/?_sid=1686737966">
                                                                La Provincia Diario de Las Palmas
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="Levante El Mercantil Valenciano"
                                                                href="https://www.levante-emv.com/?_sid=1686737966">
                                                                Levante El Mercantil Valenciano
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Levante TV"
                                                                href="http://www.informaciontv.es/">
                                                                Levante TV
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="L'Empordà Figueres"
                                                                href="https://www.emporda.info/?_sid=1686737966">
                                                                L'Empordà Figueres
                                                            </a>
                                                        </li>
                                                        <li class="titular">Titular 3</li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="Mallorca Zeitung Mallorca"
                                                                href="https://www.mallorcazeitung.es/?_sid=1686737966">
                                                                Mallorca Zeitung Mallorca
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Neomotor"
                                                                href="https://neomotor.epe.es/?_sid=1686737966">
                                                                Neomotor
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Oscars"
                                                                href="https://www.premios-cine.com/oscars/">
                                                                Oscars
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Regió 7 Manresa"
                                                                href="https://www.regio7.cat/?_sid=1686737966">
                                                                Regió Manresa
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Sport"
                                                                href="https://www.sport.es/">
                                                                Sport
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Stilo"
                                                                href="https://www.stilo.es/?_sid=1686737966">
                                                                Stilo
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="Superdeporte Valencia"
                                                                href="https://www.superdeporte.es/?_sid=1686737966">
                                                                Superdeporte Valencia
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Tendencias 21"
                                                                href="https://www.sport.es/es/tendencias21/">
                                                                Tendencias 21
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Tu casa"
                                                                href="https://www.tucasa.com/">
                                                                Tu casa
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Medio Ambiente"
                                                                href="https://www.sport.es/es/medio-ambiente/">
                                                                Medio Ambiente
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank" title="Viajar"
                                                                href="https://viajar.elperiodico.com/?_sid=1686737966">
                                                                Viajar
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a rel="nofollow" target="_blank"
                                                                title="Woman Madame Figaro"
                                                                href="https://www.woman.es/">
                                                                Woman Madame Figaro
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </footer>
                                            <!-- end // org: footer -->`,
        "lite-ep": `<!-- org: footer, --lite -->
                                            <footer id="footerMediaLite" class="ft-org-footer ft-org-footer--lite"
                                                aria-labelledby="footerMediaLiteTitle"
                                                itemscope itemtype="https://schema.org/NewsMediaOrganization">
                                                <!-- org-footer: __top -->
                                                <div class="ft-org-footer__top">
                                                    <!-- org-footer: heading, oculto -->
                                                    <h2 id="footerMediaLiteTitle" class="ft-org-footer__sr-only">
                                                        Pie de página
                                                    </h2>
                                                    <!-- org-footer: __logo -->
                                                    <div class="ft-org-footer__logo">
                                                        <a class="ft-org-footer__logo-link" href="#"
                                                            target="_self"
                                                            title="Ir a la portada de Media name"
                                                            aria-label="Media name – ir a la portada">
                                                            <img class="ft-org-footer__logo-img" itemprop="logo"
                                                                src="/cds-statics/assets/img/logos/logoEpColor.svg"
                                                                width="190" height="47" loading="lazy"
                                                                alt="" />
                                                        </a>
                                                        <meta itemprop="name" content="Media name" />
                                                    </div>
                                                    <!-- org-footer: __rrss -->
                                                    <nav class="ft-org-footer__rrss"
                                                        aria-label="Redes sociales de Media name">
                                                        <ul class="ft-org-footer__rrss-list">
                                                            <li class="ft-org-footer__rrss-item">
                                                                <a class="ft-org-footer__rrss-link" href="#"
                                                                    itemprop="sameAs"
                                                                    rel="nofollow"
                                                                    target="_self"
                                                                    title="Facebook de Media name"
                                                                    aria-label="Facebook de Media name">
                                                                    <span
                                                                        class="ft-org-footer__rrss-icon ft-org-footer__rrss-icon--facebook"
                                                                        aria-hidden="true"></span>
                                                                </a>
                                                            </li>
                                                            <li class="ft-org-footer__rrss-item">
                                                                <a class="ft-org-footer__rrss-link" href="#"
                                                                    itemprop="sameAs"
                                                                    rel="nofollow"
                                                                    target="_self"
                                                                    title="Twitter / X de Media name"
                                                                    aria-label="Twitter / X de Media name">
                                                                    <span
                                                                        class="ft-org-footer__rrss-icon ft-org-footer__rrss-icon--twitter"
                                                                        aria-hidden="true"></span>
                                                                </a>
                                                            </li>
                                                            <li class="ft-org-footer__rrss-item">
                                                                <a class="ft-org-footer__rrss-link" href="#"
                                                                    itemprop="sameAs"
                                                                    rel="nofollow"
                                                                    target="_self"
                                                                    title="Instagram de Media name"
                                                                    aria-label="Instagram de Media name">
                                                                    <span
                                                                        class="ft-org-footer__rrss-icon ft-org-footer__rrss-icon--instagram"
                                                                        aria-hidden="true"></span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </div>
                                                <!-- org-footer: __middle -->
                                                <div class="ft-org-footer__middle">
                                                    <!-- org-footer: __section, publicidad -->
                                                    <!-- --lite elige arrancar plegado · otras variantes pueden arrancar desplegado con <details open> -->
                                                    <section class="ft-org-footer__section" aria-label="Publicidad">
                                                        <details class="ft-org-footer__accordion">
                                                            <summary class="ft-org-footer__accordion-trigger">
                                                                Publicidad
                                                            </summary>
                                                            <div class="ft-org-footer__accordion-panel">
                                                                <div class="ft-org-footer__pub-banner">
                                                                    <div class="ft-org-footer__pub-banner-body">
                                                                        <a class="ft-org-footer__pub-banner-link"
                                                                            href="https://www.prensaiberica360.es/"
                                                                            rel="nofollow"
                                                                            target="_self"
                                                                            title="Prensa Ibérica 360 – publicidad"
                                                                            aria-label="Prensa Ibérica 360 – publicidad">
                                                                            <img class="ft-org-footer__pub-banner-img"
                                                                                width="60" height="38" loading="lazy"
                                                                                alt=""
                                                                                src="https://estaticos-cdn.lne.es/images/footer/prensa-iberica-360.png?id=00bc9e3946af531b5a7b" />
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </details>
                                                    </section>

                                                    <!-- org-footer: __section, otras webs del grupo -->
                                                    <!-- --lite elige arrancar plegado · otras variantes pueden arrancar desplegado con <details open> -->
                                                    <section class="ft-org-footer__section"
                                                        aria-label="Otras webs del grupo">
                                                        <details class="ft-org-footer__accordion">
                                                            <summary class="ft-org-footer__accordion-trigger">
                                                                Otras webs del grupo
                                                            </summary>
                                                            <div class="ft-org-footer__accordion-panel">
                                                                <div class="ft-org-footer__brand-groups">
                                                                    <!-- Grupo de marcas: Category 1 -->
                                                                    <nav class="ft-org-footer__brand-group"
                                                                        aria-labelledby="fml-cat-1">
                                                                        <h3 class="ft-org-footer__brand-group-title"
                                                                            id="fml-cat-1">
                                                                            Category 1
                                                                        </h3>
                                                                        <ul class="ft-org-footer__brand-list">
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 1</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 2</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 3</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 4</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 5</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 6</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 7</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 8</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 9</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 10</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 11</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 12</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 13</a>
                                                                            </li>
                                                                        </ul>
                                                                    </nav>

                                                                    <!-- Grupo de marcas: Category 2 -->
                                                                    <nav class="ft-org-footer__brand-group"
                                                                        aria-labelledby="fml-cat-2">
                                                                        <h3 class="ft-org-footer__brand-group-title"
                                                                            id="fml-cat-2">
                                                                            Category 2
                                                                        </h3>
                                                                        <ul class="ft-org-footer__brand-list">
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 14</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 15</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 16</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 17</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 18</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 19</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 20</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 21</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 22</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 23</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 24</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 25</a>
                                                                            </li>
                                                                        </ul>
                                                                    </nav>

                                                                    <!-- Grupo de marcas: Category 3 -->
                                                                    <nav class="ft-org-footer__brand-group"
                                                                        aria-labelledby="fml-cat-3">
                                                                        <h3 class="ft-org-footer__brand-group-title"
                                                                            id="fml-cat-3">
                                                                            Category 3
                                                                        </h3>
                                                                        <ul class="ft-org-footer__brand-list">
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 26</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 27</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 28</a>
                                                                            </li>
                                                                        </ul>
                                                                    </nav>

                                                                    <!-- Grupo de marcas: Category 4 -->
                                                                    <nav class="ft-org-footer__brand-group"
                                                                        aria-labelledby="fml-cat-4">
                                                                        <h3 class="ft-org-footer__brand-group-title"
                                                                            id="fml-cat-4">
                                                                            Category 4
                                                                        </h3>
                                                                        <ul class="ft-org-footer__brand-list">
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 29</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 30</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 31</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 32</a>
                                                                            </li>
                                                                        </ul>
                                                                    </nav>

                                                                    <!-- Grupo de marcas: Category 5 -->
                                                                    <nav class="ft-org-footer__brand-group"
                                                                        aria-labelledby="fml-cat-5">
                                                                        <h3 class="ft-org-footer__brand-group-title"
                                                                            id="fml-cat-5">
                                                                            Category 5
                                                                        </h3>
                                                                        <ul class="ft-org-footer__brand-list">
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 33</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 34</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 35</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 36</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 37</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 38</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#">Brand name 39</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 40</a>
                                                                            </li>
                                                                            <li class="ft-org-footer__brand-item">
                                                                                <a class="ft-org-footer__brand-link" title="title text"
                                                                                    href="#" target="_self">Brand name 41</a>
                                                                            </li>
                                                                        </ul>
                                                                    </nav>
                                                                </div>
                                                            </div>
                                                        </details>
                                                    </section>
                                                </div>
                                                <!-- org-footer: __bottom -->
                                                <div class="ft-org-footer__bottom">
                                                    <!-- org-footer: __legal -->
                                                    <nav class="ft-org-footer__legal" aria-label="Navegación legal">
                                                        <ul class="ft-org-footer__legal-list">
                                                            <li class="ft-org-footer__legal-item">
                                                                <a class="ft-org-footer__legal-link" title="title text" href="#" target="_self">Quiénes
                                                                    somos</a>
                                                            </li>
                                                            <li class="ft-org-footer__legal-item">
                                                                <a class="ft-org-footer__legal-link" title="title text"
                                                                    href="#" target="_self">Contacto</a>
                                                            </li>
                                                            <li class="ft-org-footer__legal-item">
                                                                <a class="ft-org-footer__legal-link" title="title text" href="#" target="_self">RSS</a>
                                                            </li>
                                                            <li class="ft-org-footer__legal-item">
                                                                <a class="ft-org-footer__legal-link" title="title text" href="#" target="_self">Mapa del
                                                                    sitio</a>
                                                            </li>
                                                            <li class="ft-org-footer__legal-item">
                                                                <a class="ft-org-footer__legal-link" title="title text"
                                                                    href="https://www.prensaiberica360.es/" target="_self">Publicidad</a>
                                                            </li>
                                                            <li class="ft-org-footer__legal-item">
                                                                <a class="ft-org-footer__legal-link" title="title text" href="#" target="_self">Aviso
                                                                    legal</a>
                                                            </li>
                                                            <li class="ft-org-footer__legal-item">
                                                                <a class="ft-org-footer__legal-link" title="title text" href="#" target="_self">Política
                                                                    de privacidad y cookies</a>
                                                            </li>
                                                            <li class="ft-org-footer__legal-item">
                                                                <a class="ft-org-footer__legal-link" title="title text"
                                                                    href="#" target="_self">Preferencias de privacidad</a>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </div>
                                                <!-- org-footer: __meta -->
                                                <div class="ft-org-footer__meta">
                                                    <p class="ft-org-footer__copyright">
                                                        &copy; 2026
                                                        <a class="ft-org-footer__copyright-link" href="#"
                                                            target="_self"
                                                            itemprop="url"
                                                            title="Media name, S.L.U"
                                                            aria-label="Media name, S.L.U">
                                                            <span itemprop="legalName">Media name, S.L.U</span>
                                                        </a>. Todos los derechos reservados.
                                                    </p>
                                                </div>
                                            </footer>
                                            <!-- end // org: footer -->`
    };

    const LITE_RRSS_LIST_RE = /<ul class="ft-org-footer__rrss-list">[\s\S]*?<\/ul>/;
    const LITE_LEGAL_LIST_RE = /<ul class="ft-org-footer__legal-list">[\s\S]*?<\/ul>/;
    const LITE_COPYRIGHT_RE = /<a class="ft-org-footer__copyright-link"[\s\S]*?<\/a>\./;
    const LITE_LOGO_LINK_RE = /<a class="ft-org-footer__logo-link" href="#"[\s\S]*?>/;
    const LITE_BRAND_GROUPS_RE = /<div class="ft-org-footer__brand-groups">[\s\S]*?<\/div>/;
    const LITE_LOGO_RE = /<img class="ft-org-footer__logo-img" itemprop="logo"[\s\S]*?\/>/;
    const LITE_BRAND_GROUPS = `<div class="ft-org-footer__brand-groups">
                                                                    <!-- Grupo de marcas: Prensa -->
                                                                    <nav class="ft-org-footer__brand-group" aria-labelledby="fml-cat-1">
                                                                        <h3 class="ft-org-footer__brand-group-title" id="fml-cat-1">
                                                                            Prensa
                                                                        </h3>
                                                                        <ul class="ft-org-footer__brand-list">
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Diari de Girona" href="https://www.diaridegirona.cat/" target="_blank">Diari de Girona</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Diario de C&oacute;rdoba" href="https://www.diariocordoba.com/" target="_blank">Diario de C&oacute;rdoba</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Diario de Ibiza" href="https://www.diariodeibiza.es/" target="_blank">Diario de Ibiza</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Diario de Mallorca" href="https://www.diariodemallorca.es/" target="_blank">Diario de Mallorca</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="El Correo de Andaluc&iacute;a" href="https://www.elcorreoweb.es/" target="_blank">El Correo de Andaluc&iacute;a</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="El Correo Gallego" href="https://www.elcorreogallego.es/" target="_blank">El Correo Gallego</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="El D&iacute;a" href="https://www.eldia.es/" target="_blank">El D&iacute;a</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="El Peri&oacute;dico de Arag&oacute;n" href="https://www.elperiodicodearagon.com/" target="_blank">El Peri&oacute;dico de Arag&oacute;n</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="El Peri&oacute;dico" href="https://www.elperiodico.com/es/" target="_blank">El Peri&oacute;dico</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="El Peri&oacute;dico de Espa&ntilde;a" href="https://www.epe.es/es/" target="_blank">El Peri&oacute;dico de Espa&ntilde;a</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="El Peri&oacute;dico Extremadura" href="http://www.elperiodicoextremadura.com/?_gl=1*14ptnko*_ga*MTM2NjY1NzIzMi4xNzc2NzkwMTY4*_ga_YCJHYESXNK*czE3ODExNzM4ODYkbzQwJGcwJHQxNzgxMTczODg2JGo2MCRsMCRoMA.." target="_blank">El Peri&oacute;dico Extremadura</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="El Peri&oacute;dico Mediterr&aacute;neo" href="https://www.elperiodicomediterraneo.com/" target="_blank">El Peri&oacute;dico Mediterr&aacute;neo</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Empord&agrave;" href="https://www.emporda.info/" target="_blank">Empord&agrave;</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Faro de Vigo" href="https://www.farodevigo.es/" target="_blank">Faro de Vigo</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="INFORMACI&Oacute;N" href="https://www.informacion.es/" target="_blank">INFORMACI&Oacute;N</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="La Cr&oacute;nica de Badajoz" href="https://www.lacronicabadajoz.com/" target="_blank">La Cr&oacute;nica de Badajoz</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="La Nueva Espa&ntilde;a" href="https://www.lne.es/" target="_blank">La Nueva Espa&ntilde;a</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="La Opini&oacute;n A Coru&ntilde;a" href="https://www.laopinioncoruna.es/" target="_blank">La Opini&oacute;n A Coru&ntilde;a</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="La Opini&oacute;n de M&aacute;laga" href="https://www.laopiniondemalaga.es/" target="_blank">La Opini&oacute;n de M&aacute;laga</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="La Opini&oacute;n de Murcia" href="https://www.laopiniondemurcia.es/" target="_blank">La Opini&oacute;n de Murcia</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="La Opini&oacute;n - El Correo de Zamora" href="https://www.laopiniondezamora.es/" target="_blank">La Opini&oacute;n - El Correo de Zamora</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="La Provincia - Diario de Las Palmas" href="https://www.laprovincia.es/" target="_blank">La Provincia - Diario de Las Palmas</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Levante - El Mercantil Valenciano" href="https://www.levante-emv.com/" target="_blank">Levante - El Mercantil Valenciano</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Mallorca Zeitung" href="https://www.mallorcazeitung.es/" target="_blank">Mallorca Zeitung</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Regi&oacute; 7" href="https://www.regio7.cat/" target="_blank">Regi&oacute; 7</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Sport" href="https://www.sport.es/es/" target="_blank">Sport</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Superdeporte" href="https://www.superdeporte.es/" target="_blank">Superdeporte</a></li>
                                                                        </ul>
                                                                    </nav>

                                                                    <!-- Grupo de marcas: Radio y televisi&oacute;n -->
                                                                    <nav class="ft-org-footer__brand-group" aria-labelledby="fml-cat-2">
                                                                        <h3 class="ft-org-footer__brand-group-title" id="fml-cat-2">
                                                                            Radio y televisi&oacute;n
                                                                        </h3>
                                                                        <ul class="ft-org-footer__brand-list">
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Informaci&oacute;n TV" href="http://www.informaciontv.es/" target="_blank">Informaci&oacute;n TV</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Levante TV" href="https://www.levante-emv.com/videos/levante-tv/" target="_blank">Levante TV</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="MediTV" href="https://www.elperiodicomediterraneo.com/videos/mediterraneo-tv/" target="_blank">MediTV</a></li>
                                                                        </ul>
                                                                    </nav>

                                                                    <!-- Grupo de marcas: Revistas -->
                                                                    <nav class="ft-org-footer__brand-group" aria-labelledby="fml-cat-3">
                                                                        <h3 class="ft-org-footer__brand-group-title" id="fml-cat-3">
                                                                            Revistas
                                                                        </h3>
                                                                        <ul class="ft-org-footer__brand-list">
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Cuore" href="https://www.elperiodico.com/es/cuore/" target="_blank">Cuore</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Stilo" href="https://www.stilo.es/" target="_blank">Stilo</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Viajar" href="https://viajar.elperiodico.com/" target="_blank">Viajar</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Woman Madame Figaro" href="https://woman.elperiodico.com/" target="_blank">Woman Madame Figaro</a></li>
                                                                        </ul>
                                                                    </nav>

                                                                    <!-- Grupo de marcas: Canales tem&aacute;ticos -->
                                                                    <nav class="ft-org-footer__brand-group" aria-labelledby="fml-cat-4">
                                                                        <h3 class="ft-org-footer__brand-group-title" id="fml-cat-4">
                                                                            Canales tem&aacute;ticos
                                                                        </h3>
                                                                        <ul class="ft-org-footer__brand-list">
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Casa Gourmet" href="https://www.casagourmet.es/" target="_blank">Casa Gourmet</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Coches de ocasi&oacute;n" href="https://ocasion.neomotor.com/" target="_blank">Coches de ocasi&oacute;n</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="C&oacute;digo Nuevo" href="https://www.codigonuevo.com/" target="_blank">C&oacute;digo Nuevo</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Compramejor" href="https://www.compramejor.es" target="_blank">Compramejor</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="F&oacute;rmula 1" href="https://formula1.lne.es/" target="_blank">F&oacute;rmula 1</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Iberempleos" href="https://www.iberempleos.es/" target="_blank">Iberempleos</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Comprobar Loter&iacute;a de Navidad 2025" href="https://www.elperiodico.com/es/loteria-navidad/comprobar-numeros/" target="_blank">Comprobar Loter&iacute;a de Navidad 2025</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Medio Ambiente" href="https://www.informacion.es/medio-ambiente/" target="_blank">Medio Ambiente</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Neomotor" href="https://neomotor.epe.es/" target="_blank">Neomotor</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Tendencias 21" href="https://www.elperiodico.com/es/tendencias21/" target="_blank">Tendencias 21</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Tu casa" href="https://www.tucasa.com/" target="_blank">Tu casa</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Buscando respuestas" href="https://www.lne.es/salud/guia/" target="_blank">Buscando respuestas</a></li>
                                                                            <li class="ft-org-footer__brand-item"><a class="ft-org-footer__brand-link" title="Living Ibiza" href="https://living.diariodeibiza.es" target="_blank">Living Ibiza</a></li>
                                                                        </ul>
                                                                    </nav>
                                                                </div>`;
    const LITE_LOGO_MAP = {
        elperiodico: "/cds-statics/assets/img/logos/logoEpColor.svg",
        acoruna: "/cds-statics/assets/img/logos/logo-regionales-la-opinion-a-coruna.svg",
        andalucia: "/cds-statics/assets/img/logos/logo-regionales-el-correo-de-andalucia.svg",
        aragon: "/cds-statics/assets/img/logos/logo-regionales-el-periodico-de-aragon.svg",
        badajoz: "/cds-statics/assets/img/logos/logo-regionales-la-cronica-de-badajoz.svg",
        cordoba: "/cds-statics/assets/img/logos/logo-regionales-diario-cordoba.svg",
        correogallego: "/cds-statics/assets/img/logos/logo-regionales-el-correo-gallego.svg",
        eldia: "/cds-statics/assets/img/logos/logo-regionales-el-dia-la-opinion-de-tenerife.svg",
        emporda: "/cds-statics/assets/img/logos/logo-regionales-emporda.svg",
        epe: "/cds-statics/assets/img/logos/logoEpeColor.svg",
        extremadura: "/cds-statics/assets/img/logos/logo-regionales-el-periodico-extremadura.svg",
        faro: "/cds-statics/assets/img/logos/logo-regionales-faro-de-vigo.svg",
        girona: "/cds-statics/assets/img/logos/logo-regionales-diari-de-girona.svg",
        ibiza: "/cds-statics/assets/img/logos/logo-regionales-diario-de-ibiza.svg",
        informacion: "/cds-statics/assets/img/logos/logo-regionales-diario-informacion.svg",
        laprovincia: "/cds-statics/assets/img/logos/logo-regionales-la-provincia-diario-de-las-palmas.svg",
        levante: "/cds-statics/assets/img/logos/logo-regionales-levante-el-mercantil-valenciano.svg",
        lne: "/cds-statics/assets/img/logos/logo-la-nueva-espana.svg",
        malaga: "/cds-statics/assets/img/logos/logo-regionales-la-opinion-de-malaga.svg",
        mallorca: "/cds-statics/assets/img/logos/logo-regionales-diario-de-mallorca.svg",
        mediterraneo: "/cds-statics/assets/img/logos/logo-regionales-el-periodico-mediterraneo.svg",
        murcia: "/cds-statics/assets/img/logos/logo-regionales-la-opinion-de-murcia.svg",
        r7: "/cds-statics/assets/img/logos/logo-regionales-regio7.svg",
        zamora: "/cds-statics/assets/img/logos/logo-regionales-la-opinion-correo-de-zamora.svg"
    };
    const LITE_HOME_URL_MAP = {
        elperiodico: "https://www.elperiodico.com/es/",
        acoruna: "https://www.laopinioncoruna.es/",
        andalucia: "https://www.elcorreoweb.es/",
        aragon: "https://www.elperiodicodearagon.com/",
        badajoz: "https://www.lacronicabadajoz.com/",
        cordoba: "https://www.diariocordoba.com/",
        correogallego: "https://www.elcorreogallego.es/",
        eldia: "https://www.eldia.es/",
        emporda: "https://www.emporda.info/",
        epe: "https://www.epe.es/es/",
        extremadura: "https://www.elperiodicoextremadura.com/",
        faro: "https://www.farodevigo.es/",
        girona: "https://www.diaridegirona.cat/",
        ibiza: "https://www.diariodeibiza.es/",
        informacion: "https://www.informacion.es/",
        laprovincia: "https://www.laprovincia.es/",
        levante: "https://www.levante-emv.com/",
        lne: "https://www.lne.es/",
        malaga: "https://www.laopiniondemalaga.es/",
        mallorca: "https://www.diariodemallorca.es/",
        mediterraneo: "https://www.elperiodicomediterraneo.com/",
        murcia: "https://www.laopiniondemurcia.es/",
        r7: "https://www.regio7.cat/",
        zamora: "https://www.laopiniondezamora.es/"
    };
    const LITE_VARIANTS = [
        { id: "elperiodico", name: "El Peri\u00f3dico de Catalunya", mediaName: "El Peri\u00f3dico de Catalunya", legalName: "EL PERI\u00d3DICO DE CATALUNYA, S.L.U.", file: "elperiodico.html", socials: [
            { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/elperiodico.catalunya" },
            { icon: "twitter", label: "Twitter / X", url: "https://x.com/elperiodico" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/elperiodico_cas/" },
            { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/el-peri%C3%B3dico/" }
        ] },
        { id: "acoruna", name: "La Opini\u00f3n de A Coru\u00f1a", mediaName: "La Opini\u00f3n de A Coru\u00f1a", legalName: "LA OPINI\u00d3N DE LA CORU\u00d1A, S.L.", file: "acoruna.html", socials: [
            { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/laopinioncoruna" },
            { icon: "twitter", label: "Twitter / X", url: "https://twitter.com/laopinioncoruna" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/laopinioncoruna/" },
            { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/laopinioncoruna" }
        ] },
        { id: "andalucia", name: "El Correo de Andaluc\u00eda", mediaName: "El Correo de Andaluc\u00eda", legalName: "PRENSA IB\u00c9RICA NETWORK, S.L.U.", file: "andalucia.html", socials: [
            { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/elcorreoweb" },
            { icon: "twitter", label: "Twitter / X", url: "https://x.com/elcorreoweb" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/correoandalucia/" },
            { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/el-correo-de-andaluc%C3%ADa" }
        ] },
        { id: "aragon", name: "El Peri\u00f3dico de Arag\u00f3n", mediaName: "El Peri\u00f3dico de Arag\u00f3n", legalName: "PRENSA DIARIA ARAGONESA, S.A.U.", file: "aragon.html", socials: [
            { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/elperiodicodearagon/" },
            { icon: "twitter", label: "Twitter / X", url: "https://twitter.com/periodicoaragon" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/elperiodicodearagon/" },
            { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/el-periodico-de-aragon" }
        ] },
        { id: "badajoz", name: "La Cr\u00f3nica de Badajoz", mediaName: "La Cr\u00f3nica de Badajoz", legalName: "EDITORIAL EXTREMADURA, S.A.", file: "badajoz.html", socials: [
            { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/cronicabadajoz" },
            { icon: "twitter", label: "Twitter / X", url: "https://twitter.com/crobadajoz" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/cronicabadajoz/" }
        ] },
        { id: "cordoba", name: "Diario C\u00f3rdoba", mediaName: "Diario C\u00f3rdoba", legalName: "DIARIO C\u00d3RDOBA, S.A.U.", file: "cordoba.html", socials: [
            { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/DiarioCORDOBA.es" },
            { icon: "twitter", label: "Twitter / X", url: "https://twitter.com/cordoba" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/diario_cordoba/" },
            { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/diariocordoba" }
        ] },
        { id: "correogallego", name: "El Correo Gallego", mediaName: "El Correo Gallego", legalName: "EPI PRENSA, S.L.U.", file: "correogallego.html", socials: [
            { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/ElCorreoGallego" },
            { icon: "twitter", label: "Twitter / X", url: "https://twitter.com/elcorreogallego" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/elcorreogallegoweb/" }
        ] },
        { id: "eldia", name: "El D\u00eda", mediaName: "El D\u00eda", legalName: "EDITORIAL LEONCIO RODR\u00cdGUEZ, S.A.U.", file: "eldia.html", socials: [
            { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/eldia.es" },
            { icon: "twitter", label: "Twitter / X", url: "https://twitter.com/eldia" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/eldia_es/" },
            { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/el-dia" }
        ] },
        { id: "emporda", name: "L'Empord\u00e0", mediaName: "L'Empord\u00e0", legalName: "EDITORIAL L'EMPORD\u00c0, S.L.U.", file: "emporda.html", socials: [
            { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/emporda.info" },
            { icon: "twitter", label: "Twitter / X", url: "https://twitter.com/emporda_info" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/emporda_info/" },
            { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/setmanariempord%C3%A0/" }
        ] },
        { id: "epe", name: "El Peri\u00f3dico de Espa\u00f1a", mediaName: "El Peri\u00f3dico de Espa\u00f1a", legalName: "UNIDAD DE MEDIOS ESCRITOS, S.A.U.", file: "epe.html", socials: [
            { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/elperiodicodeespana" },
            { icon: "twitter", label: "Twitter / X", url: "https://twitter.com/ElPeriodico_Esp" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/elperiodicodeespana/" },
            { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/el-periodico-de-espana/" }
        ] },
        { id: "extremadura", name: "El Peri\u00f3dico de Extremadura", mediaName: "El Peri\u00f3dico de Extremadura", legalName: "EDITORIAL EXTREMADURA, S.A.", file: "extremadura.html", socials: [
            { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/periodicoextremadura/" },
            { icon: "twitter", label: "Twitter / X", url: "https://twitter.com/EPExtremadura" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/elperiodicoextremadura/" },
            { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/el-peri%C3%B3dico-extremadura" }
        ] },
        { id: "faro", name: "Faro de Vigo", mediaName: "Faro de Vigo", legalName: "FARO DE VIGO, S.A.U.", file: "faro.html", socials: [
            { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/farodevigo" },
            { icon: "twitter", label: "Twitter / X", url: "https://twitter.com/Farodevigo" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/farodevigo/" },
            { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/faro-de-vigo" }
        ] },
        { id: "girona", name: "Diari de Girona", mediaName: "Diari de Girona", legalName: "DIARI DE GIRONA, S.A.U.", file: "girona.html", socials: [
            { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/diaridegirona.cat" },
            { icon: "twitter", label: "Twitter / X", url: "https://twitter.com/DiarideGirona" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/diaridegirona.cat/" },
            { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/diari-de-girona" }
        ] },
        { id: "ibiza", name: "Diario de Ibiza", mediaName: "Diario de Ibiza", legalName: "DIARIO DE IBIZA, S.A.U.", file: "ibiza.html", socials: [
            { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/diariodeibiza" },
            { icon: "twitter", label: "Twitter / X", url: "https://twitter.com/Diario_de_ibiza" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/diario_de_ibiza/" },
            { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/diario-de-ibiza" }
        ] },
        { id: "informacion", name: "Informaci\u00f3n", mediaName: "Informaci\u00f3n", legalName: "EDITORIAL PRENSA ALICANTINA, S.A.U.", file: "informacion.html", socials: [
            { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/diarioinformacion" },
            { icon: "twitter", label: "Twitter / X", url: "https://twitter.com/informacion_es" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/informacion.es/" },
            { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/diario-informacion/" }
        ] },
        { id: "laprovincia", name: "La Provincia", mediaName: "La Provincia", legalName: "EDITORIAL PRENSA CANARIA, S.A.", file: "laprovincia.html", socials: [
            { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/laprovincia.es" },
            { icon: "twitter", label: "Twitter / X", url: "https://twitter.com/laprovincia_es" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/laprovincia/" },
            { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/la-provincia-diario-de-las-palmas" }
        ] },
        { id: "levante", name: "Levante-EMV", mediaName: "Levante-EMV", legalName: "EDITORIAL PRENSA VALENCIANA, S.A.U.", file: "levante.html", socials: [
            { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/levante.emv/" },
            { icon: "twitter", label: "Twitter / X", url: "https://twitter.com/levante_emv" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/levanteemv/" },
            { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/levante-emv/" }
        ] },
        { id: "lne", name: "La Nueva Espa\u00f1a", mediaName: "La Nueva Espa\u00f1a", legalName: "EDITORIAL PRENSA ASTURIANA, S.A.U.", file: "lne.html", socials: [
            { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/lanuevaespana" },
            { icon: "twitter", label: "Twitter / X", url: "https://twitter.com/lanuevaespana" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/lanuevaespana_/" },
            { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/lanuevaespana" }
        ] },
        { id: "malaga", name: "La Opini\u00f3n de M\u00e1laga", mediaName: "La Opini\u00f3n de M\u00e1laga", legalName: "LA OPINI\u00d3N DE M\u00c1LAGA, S.L.U.", file: "malaga.html", socials: [
            { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/laopiniondemalaga" },
            { icon: "twitter", label: "Twitter / X", url: "https://x.com/opiniondemalaga" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/laopiniondemalaga" },
            { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/laopiniondemalaga" }
        ] },
        { id: "mallorca", name: "Diario de Mallorca", mediaName: "Diario de Mallorca", legalName: "EDITORA BALEAR, S.A.", file: "mallorca.html", socials: [
            { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/diariodemallorca.es" },
            { icon: "twitter", label: "Twitter / X", url: "https://twitter.com/diariomallorca" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/diariodemallorca/" },
            { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/diario-de-mallorca" }
        ] },
        { id: "mediterraneo", name: "El Peri\u00f3dico Mediterr\u00e1neo", mediaName: "El Peri\u00f3dico Mediterr\u00e1neo", legalName: "PROMOCIONES Y EDICIONES CULTURALES, S.A.", file: "mediterraneo.html", socials: [
            { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/elperiodico.mediterraneo" },
            { icon: "twitter", label: "Twitter / X", url: "https://twitter.com/epmediterraneo" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/periodicomediterraneo/" },
            { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/elperiodicomediterraneo" }
        ] },
        { id: "murcia", name: "La Opini\u00f3n de Murcia", mediaName: "La Opini\u00f3n de Murcia", legalName: "LA OPINI\u00d3N DE MURCIA, S.A.U.", file: "murcia.html", socials: [
            { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/laopiniondemurcia.es" },
            { icon: "twitter", label: "Twitter / X", url: "https://twitter.com/diariolaopinion" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/laopiniondemurcia/" },
            { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/laopiniondemurcia/" }
        ] },
        { id: "r7", name: "Regi\u00f37", mediaName: "Regi\u00f37", legalName: "EDICIONS INTERCOMARCALS, S.A.", file: "r7.html", socials: [
            { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/diariregio7" },
            { icon: "twitter", label: "Twitter / X", url: "https://twitter.com/diariRegio7" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/diariregio7/" },
            { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/regio7" }
        ] },
        { id: "zamora", name: "La Opini\u00f3n de Zamora", mediaName: "La Opini\u00f3n de Zamora", legalName: "LA OPINI\u00d3N DE ZAMORA, S.A.U.", file: "zamora.html", socials: [
            { icon: "facebook", label: "Facebook", url: "https://www.facebook.com/opiniondezamora" },
            { icon: "twitter", label: "Twitter / X", url: "https://twitter.com/opiniondezamora" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/laopiniondezamora/" },
            { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/la-opini%C3%B3n-el-correo-de-zamora" }
        ] }
    ];
    const LITE_BASE = VARIANTS["lite-ep"];
    const LITE_DEFAULT = LITE_VARIANTS[0];
    const LITE_ADS_URL = "https://www.prensaiberica360.es/";

    const LITE_LEGAL_ITEMS = {
        "elperiodico": `<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Quiénes somos" href="https://www.elperiodico.com/es/quienessomos/">Quiénes somos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Contacto" href="https://www.elperiodico.com/es/contacto.shtml">Contacto</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="RSS" href="https://www.elperiodico.com/es/rss/">RSS</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Publicidad" href="https://www.prensaiberica360.es/">Publicidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso legal" href="https://www.elperiodico.com/es/avisolegal.shtml">Aviso legal</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denuncias" href="https://www.prensaiberica.es/canal-de-denuncias/">Canal de denuncias</a>
</li>

<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso de transparencia" href="https://www.prensaiberica.es/aviso-de-transparencia/"
    target="_blank">Aviso de transparencia</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Código Ético" href="https://www.elperiodico.com/es/codigo-etico/">Código ético</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política de privacidad y cookies" href="https://www.elperiodico.com/es/politica-privacidad/">Política de privacidad y cookies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denuncias" href="javascript: Didomi.preferences.show();">Preferencias de privacidad</a>
</li>

<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Administrar Utiq" href="javascript:_an.showUtiqInfo()">Administrar Utiq</a>
</li>`,
        "acoruna": `<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Quiénes somos" href="https://www.laopinioncoruna.es/contacto/">Quiénes somos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Localización" href="https://www.laopinioncoruna.es/localizacion/">Localización</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Conózcanos" href="https://www.laopinioncoruna.es/conozcanos/">Conózcanos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Publicidad" href="https://www.prensaiberica360.es/">Publicidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denuncias" href="https://www.prensaiberica.es/canal-de-denuncias/">Canal de denuncias</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso legal" href="https://micuenta.laopinioncoruna.es/protecciondatos?gdprTipo=3">Aviso legal</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política de privacidad y cookies" href="https://www.laopinioncoruna.es/politica-privacidad/">Política de privacidad y cookies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Preferencias de privacidad" href="javascript:Didomi.preferences.show();">Preferencias de privacidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Código Ético" href="https://www.laopinioncoruna.es/codigo-etico/">Código Ético</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso de transparencia sobre anuncios políticos" href="https://www.prensaiberica.es/aviso-de-transparencia/" target="_blank">Aviso de transparencia sobre anuncios políticos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Administrar Utiq" href="javascript:_an.showUtiqInfo()">Administrar Utiq</a>
</li>`,
        "andalucia": `<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Quiénes somos" href="https://www.elcorreoweb.es/contacto/">Quiénes somos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Publicidad" href="https://www.prensaiberica360.es/">Publicidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Branded Content" href="http://www.becontent.es/">Branded Content</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denuncias" href="https://www.prensaiberica.es/canal-de-denuncias/">Canal de denuncias</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso legal" href="https://micuenta.elcorreoweb.es/protecciondatos?gdprTipo=3">Aviso legal</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política de privacidad y cookies" href="https://www.elcorreoweb.es/politica-privacidad/">Política de privacidad y cookies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Preferencias de privacidad" href="javascript:Didomi.preferences.show();">Preferencias de privacidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Código Ético" href="https://elcorreoweb.es/codigo-etico/">Código Ético</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso de transparencia sobre anuncios políticos" href="https://www.prensaiberica.es/aviso-de-transparencia/" target="_blank">Aviso de transparencia sobre anuncios políticos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Administrar Utiq" href="javascript:_an.showUtiqInfo()">Administrar Utiq</a>
</li>`,
        "aragon": `<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Quiénes somos" href="https://www.elperiodicodearagon.com/quienes-somos/">Quiénes somos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Historia" href="https://www.elperiodicodearagon.com/historia/">Historia</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Publicidad" href="https://www.prensaiberica360.es/">Publicidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Branded Content" href="http://www.becontent.es/">Branded Content</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denuncias" href="https://www.prensaiberica.es/canal-de-denuncias/">Canal de denuncias</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso legal" href="https://micuenta.elperiodicodearagon.com/protecciondatos?gdprTipo=3">Aviso legal</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política de privacidad y cookies" href="https://www.elperiodicodearagon.com/politica-privacidad/">Política de privacidad y cookies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Preferencias de privacidad" href="javascript:Didomi.preferences.show();">Preferencias de privacidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Código Ético" href="https://www.elperiodicodearagon.com/codigo-etico/">Código Ético</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso de transparencia sobre anuncios políticos" href="https://www.prensaiberica.es/aviso-de-transparencia/" target="_blank">Aviso de transparencia sobre anuncios políticos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Administrar Utiq" href="javascript:_an.showUtiqInfo()">Administrar Utiq</a>
</li>`,
        "badajoz": `<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Quiénes somos" href="https://www.lacronicabadajoz.com/contacto/">Quiénes somos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Tarifas de Publicidad" href="https://www.prensaiberica360.es/nuestras-marcas-papel-y-digital-la-cronica-de-badajoz/tarifas-la-cronica-de-badajoz/">Tarifas de Publicidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="bContent" href="http://www.becontent.es/">bContent</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denuncias" href="https://www.prensaiberica.es/canal-de-denuncias/">Canal de denuncias</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso legal" href="https://micuenta.lacronicabadajoz.com/protecciondatos?gdprTipo=3">Aviso legal</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política de privacidad y cookies" href="https://www.lacronicabadajoz.com/politica-privacidad/">Política de privacidad y cookies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Preferencias de privacidad" href="javascript:Didomi.preferences.show();">Preferencias de privacidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Código Ético" href="https://www.lacronicabadajoz.com/codigo-etico/">Código Ético</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso de transparencia sobre anuncios políticos" href="https://www.prensaiberica.es/aviso-de-transparencia/" target="_blank">Aviso de transparencia sobre anuncios políticos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Administrar Utiq" href="javascript:_an.showUtiqInfo()">Administrar Utiq</a>
</li>`,
        "cordoba": `<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Quiénes somos" href="https://www.diariocordoba.com/quienes-somos/">Quiénes somos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Tarifas de Publicidad" href="https://estaticos-cdn.prensaiberica.es/epi/public/content/file/original/2026/0123/08/tarifas-diario-cordoba2026-pdf.pdf">Tarifas de Publicidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Branded Content" href="http://www.becontent.es/">Branded Content</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denuncias" href="https://www.prensaiberica.es/canal-de-denuncias/">Canal de denuncias</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso legal" href="https://micuenta.diariocordoba.com/protecciondatos?gdprTipo=3">Aviso legal</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política de privacidad y cookies" href="https://www.diariocordoba.com/politica-privacidad/">Política de privacidad y cookies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Preferencias de privacidad" href="javascript:Didomi.preferences.show();">Preferencias de privacidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Código Ético" href="https://www.diariocordoba.com/codigo-etico/">Código Ético</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso de transparencia sobre anuncios políticos" href="https://www.prensaiberica.es/aviso-de-transparencia/" target="_blank">Aviso de transparencia sobre anuncios políticos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Administrar Utiq" href="javascript:_an.showUtiqInfo()">Administrar Utiq</a>
</li>`,
        "correogallego": `<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Quiénes somos" href="https://www.elcorreogallego.es/contacto/">Quiénes somos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Publicidad" href="https://www.prensaiberica360.es/">Publicidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Branded Content" href="http://www.becontent.es/">Branded Content</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denuncias" href="https://www.prensaiberica.es/canal-de-denuncias/">Canal de denuncias</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso legal" href="https://micuenta.elcorreogallego.es/protecciondatos?gdprTipo=3">Aviso legal</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política de privacidad y cookies" href="https://www.elcorreogallego.es/politica-privacidad/">Política de privacidad y cookies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Preferencias de privacidad" href="javascript:Didomi.preferences.show();">Preferencias de privacidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Código Ético" href="https://www.elcorreogallego.es/codigo-etico/">Código Ético</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso de transparencia sobre anuncios políticos" href="https://www.prensaiberica.es/aviso-de-transparencia/" target="_blank">Aviso de transparencia sobre anuncios políticos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Administrar Utiq" href="javascript:_an.showUtiqInfo()">Administrar Utiq</a>
</li>`,
        "eldia": `<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Quiénes somos" href="https://www.eldia.es/quienes-somos/">Quiénes somos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Newsletter" href="https://www.eldia.es/newsletters/">Newsletter</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Tarifas de publicidad" href="https://www.prensaiberica360.es/tarifas/tarifas-el-dia/">Tarifas de publicidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="bContent" href="http://www.becontent.es/">bContent</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="RSS" href="https://www.eldia.es/rss.html">RSS</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denuncias" href="https://www.prensaiberica.es/canal-de-denuncias/">Canal de denuncias</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso legal" href="https://micuenta.eldia.es/protecciondatos?gdprTipo=3">Aviso legal</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política de privacidad y cookies" href="https://www.eldia.es/politica-privacidad/">Política de privacidad y cookies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Preferencias de privacidad" href="javascript:Didomi.preferences.show();">Preferencias de privacidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Código Ético" href="https://www.eldia.es/codigo-etico/">Código Ético</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso de transparencia sobre anuncios políticos" href="https://www.prensaiberica.es/aviso-de-transparencia/" target="_blank">Aviso de transparencia sobre anuncios políticos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Administrar Utiq" href="javascript:_an.showUtiqInfo()">Administrar Utiq</a>
</li>`,
        "emporda": `<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Conegui'ns" href="https://www.emporda.info/coneguins/">Conegui'ns</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Localització" href="https://www.emporda.info/localitzacio/">Localització</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="BContent" href="http://www.becontent.es/">BContent</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Tarifes Publicitàries" href="https://www.prensaiberica360.es/tarifas/tarifas-emporda/tarifes-emporda-catala/">Tarifes Publicitàries</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denúncies" href="https://www.prensaiberica.es/canal-de-denuncias/">Canal de denúncies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Avís legal" href="https://elmeucompte.emporda.info/protecciondatos?gdprTipo=3">Avís legal</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política de privacitat i cookies" href="https://www.emporda.info/politica-privacitat/">Política de privacitat i cookies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Preferències de privacitat" href="javascript:Didomi.preferences.show();">Preferències de privacitat</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Codi Ètic" href="https://www.emporda.info/codi-etic/">Codi Ètic</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Avís de transparència sobre anuncis polítics" href="https://www.prensaiberica.es/aviso-de-transparencia-ca/" target="_blank">Avís de transparència sobre anuncis polítics</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Administrar Utiq" href="javascript:_an.showUtiqInfo()">Administrar Utiq</a>
</li>`,
        "epe": `<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Quiénes somos" href="https://www.epe.es/es/quienes-somos/">Quiénes somos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Publicidad" href="https://www.prensaiberica360.es/">Publicidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="RSS" href="https://www.epe.es/es/rss/listado-rss.shtml">RSS</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso legal" href="https://www.epe.es/es/avisolegal.shtml">Aviso legal</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política de privacidad y cookies" href="https://www.epe.es/es/politica-privacidad/">Política de privacidad y cookies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Preferencias de Privacidad" href="javascript: Didomi.preferences.show();">Preferencias de Privacidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Condiciones de contratación" href="https://www.epe.es/es/condiciones-contratacion/">Condiciones de contratación</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denuncias" href="https://www.prensaiberica.es/canal-de-denuncias/">Canal de denuncias</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Código Ético" href="https://www.epe.es/es/codigo-etico/">Código Ético</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso de transparencia" href="https://www.prensaiberica.es/aviso-de-transparencia/" target="_blank">Aviso de transparencia</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Administrar Utiq" href="javascript:_an.showUtiqInfo()">Administrar Utiq</a>
</li>`,
        "extremadura": `<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Quiénes somos" href="https://www.elperiodicoextremadura.com/quienes-somos/">Quiénes somos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Tarifas de Publicidad El Periódico de Extremadura" href="https://www.prensaiberica360.es/tarifas/tarifas-el-periodico-de-extremadura/">Tarifas de Publicidad El Periódico de Extremadura</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="bContent" href="http://www.becontent.es/">bContent</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Tarifas de Publicidad La Crónica de Badajoz" href="https://www.prensaiberica360.es/nuestras-marcas-papel-y-digital-la-cronica-de-badajoz/tarifas-la-cronica-de-badajoz/">Tarifas de Publicidad La Crónica de Badajoz</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denuncias" href="https://www.prensaiberica.es/canal-de-denuncias/">Canal de denuncias</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso legal" href="https://micuenta.elperiodicoextremadura.com/protecciondatos?gdprTipo=3">Aviso legal</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política de privacidad y cookies" href="https://www.elperiodicoextremadura.com/politica-privacidad/">Política de privacidad y cookies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Preferencias de privacidad" href="javascript:Didomi.preferences.show();">Preferencias de privacidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Código Ético" href="https://www.elperiodicoextremadura.com/codigo-etico/">Código Ético</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso de transparencia sobre anuncios políticos" href="https://www.prensaiberica.es/aviso-de-transparencia/" target="_blank">Aviso de transparencia sobre anuncios políticos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Administrar Utiq" href="javascript:_an.showUtiqInfo()">Administrar Utiq</a>
</li>`,
        "faro": `<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Quiénes somos" href="https://www.farodevigo.es/conozcanos/">Quiénes somos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Publicidad" href="https://www.prensaiberica360.es/">Publicidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política Medioambiental y de Seguridad y Salud en el Trabajo" href="https://estaticos-cdn.prensaiberica.es/farodevigo/documentos/Politica-medioambiental-y-de-seguridad-y-salud-en-el-trabajo.pdf">Política Medioambiental y de Seguridad y Salud en el Trabajo</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Desempeño Ambiental" href="https://estaticos-cdn.prensaiberica.es/epi/public/content/file/original/2026/0409/09/desempeno-ambiental-2025-pdf.pdf">Desempeño Ambiental</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Subvención INEGA" href="https://estaticos-cdn.prensaiberica.es/epi/public/content/file/original/2020/1006/08/subvencion-inega-02913fd.pdf">Subvención INEGA</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denuncias" href="https://www.prensaiberica.es/canal-de-denuncias/">Canal de denuncias</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso legal" href="https://micuenta.farodevigo.es/protecciondatos?gdprTipo=3">Aviso legal</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política de privacidad y cookies" href="https://www.farodevigo.es/politica-privacidad/">Política de privacidad y cookies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Preferencias de privacidad" href="javascript:Didomi.preferences.show();">Preferencias de privacidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Código Ético" href="https://www.farodevigo.es/codigo-etico/">Código Ético</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso de transparencia sobre anuncios políticos" href="https://www.prensaiberica.es/aviso-de-transparencia/" target="_blank">Aviso de transparencia sobre anuncios políticos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Administrar Utiq" href="javascript:_an.showUtiqInfo()">Administrar Utiq</a>
</li>`,
        "girona": `<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Conegui'ns" href="https://www.diaridegirona.cat/coneguins/">Conegui'ns</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Localització" href="https://www.diaridegirona.cat/localitzacio/">Localització</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="BContent" href="http://www.becontent.es/">BContent</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Tarifes Publicitàries" href="https://www.prensaiberica360.es/tarifas/tarifas-diari-de-girona/tarifes-diari-de-girona-catala/">Tarifes Publicitàries</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denúncies" href="https://www.prensaiberica.es/canal-de-denuncias/">Canal de denúncies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Avís legal" href="https://elmeucompte.diaridegirona.cat/protecciondatos?gdprTipo=3">Avís legal</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política de privacitat i cookies" href="https://www.diaridegirona.cat/politica-privacitat/">Política de privacitat i cookies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Preferències de privacitat" href="javascript:Didomi.preferences.show();">Preferències de privacitat</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Codi Ètic" href="https://www.diaridegirona.cat/codi-etic/">Codi Ètic</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Avís de transparència sobre anuncis polítics" href="https://www.prensaiberica.es/aviso-de-transparencia-ca/" target="_blank">Avís de transparència sobre anuncis polítics</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Administrar Utiq" href="javascript:_an.showUtiqInfo()">Administrar Utiq</a>
</li>`,
        "ibiza": `<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Quiénes somos" href="https://www.diariodeibiza.es/localizacion/">Quiénes somos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Publicidad" href="https://www.prensaiberica360.es/">Publicidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Tarifas de Publicidad" href="https://www.prensaiberica360.es/tarifas/tarifas-diario-de-ibiza/">Tarifas de Publicidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Branded Content" href="http://www.becontent.es/">Branded Content</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denuncias" href="https://www.prensaiberica.es/canal-de-denuncias/">Canal de denuncias</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso legal" href="https://micuenta.diariodeibiza.es/protecciondatos?gdprTipo=3">Aviso legal</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política de privacidad y cookies" href="https://www.diariodeibiza.es/politica-privacidad/">Política de privacidad y cookies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Preferencias de privacidad" href="javascript:Didomi.preferences.show();">Preferencias de privacidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Código Ético" href="https://www.diariodeibiza.es/codigo-etico/">Código Ético</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso de transparencia sobre anuncios políticos" href="https://www.prensaiberica.es/aviso-de-transparencia/" target="_blank">Aviso de transparencia sobre anuncios políticos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Administrar Utiq" href="javascript:_an.showUtiqInfo()">Administrar Utiq</a>
</li>`,
        "informacion": `<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Quiénes somos" href="https://www.informacion.es/localizacion/">Quiénes somos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Conózcanos" href="https://www.informacion.es/conozcanos/">Conózcanos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Club Información" href="http://www.clubinformacion.com/">Club Información</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Publicidad" href="https://www.prensaiberica360.es/">Publicidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Branded Content" href="http://www.becontent.es/">Branded Content</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denuncias" href="https://www.prensaiberica.es/canal-de-denuncias/">Canal de denuncias</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso legal" href="https://micuenta.informacion.es/protecciondatos?gdprTipo=3">Aviso legal</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política de privacidad y cookies" href="https://www.informacion.es/politica-privacidad/">Política de privacidad y cookies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Preferencias de privacidad" href="javascript:Didomi.preferences.show();">Preferencias de privacidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Código Ético" href="https://www.informacion.es/codigo-etico/">Código Ético</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso de transparencia sobre anuncios políticos" href="https://www.prensaiberica.es/aviso-de-transparencia/" target="_blank">Aviso de transparencia sobre anuncios políticos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Administrar Utiq" href="javascript:_an.showUtiqInfo()">Administrar Utiq</a>
</li>`,
        "laprovincia": `<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Quiénes somos" href="https://www.laprovincia.es/contacto/">Quiénes somos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Conózcanos" href="https://www.laprovincia.es/conozcanos/">Conózcanos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Club La Provincia" href="https://club.laprovincia.es/">Club La Provincia</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Tarifa de Publicidad" href="https://www.prensaiberica360.es/nuestras-marcas/papel-y-digital/la-provincia/">Tarifa de Publicidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Branded Content" href="http://www.becontent.es/">Branded Content</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denuncias" href="https://www.prensaiberica.es/canal-de-denuncias/">Canal de denuncias</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso legal" href="https://micuenta.laprovincia.es/protecciondatos?gdprTipo=3">Aviso legal</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política de privacidad y cookies" href="https://www.laprovincia.es/politica-privacidad/">Política de privacidad y cookies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Preferencias de privacidad" href="javascript:Didomi.preferences.show();">Preferencias de privacidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Código Ético" href="https://www.laprovincia.es/codigo-etico/">Código Ético</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso de transparencia sobre anuncios políticos" href="https://www.prensaiberica.es/aviso-de-transparencia/" target="_blank">Aviso de transparencia sobre anuncios políticos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Administrar Utiq" href="javascript:_an.showUtiqInfo()">Administrar Utiq</a>
</li>`,
        "levante": `<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Quiénes somos" href="https://www.levante-emv.com/contacto/">Quiénes somos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Localización" href="https://www.levante-emv.com/localizacion/">Localización</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Conózcanos" href="https://www.levante-emv.com/conozcanos/">Conózcanos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Publicidad" href="https://www.prensaiberica360.es/">Publicidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Branded Content" href="http://www.becontent.es/">Branded Content</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Compromiso Ambiental" href="https://www.levante-emv.com/economia/empresas-y-responsabilidad-social/2023/05/16/editorial-prensa-valenciana-editora-diario-87435580.html">Compromiso Ambiental</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denuncias" href="https://www.prensaiberica.es/canal-de-denuncias/">Canal de denuncias</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso legal" href="https://micuenta.levante-emv.com/protecciondatos?gdprTipo=3">Aviso legal</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política de privacidad y cookies" href="https://www.levante-emv.com/politica-privacidad/">Política de privacidad y cookies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Preferencias de privacidad" href="javascript:Didomi.preferences.show();">Preferencias de privacidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Código Ético" href="https://www.levante-emv.com/codigo-etico/">Código Ético</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso de transparencia sobre anuncios políticos" href="https://www.prensaiberica.es/aviso-de-transparencia/" target="_blank">Aviso de transparencia sobre anuncios políticos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Administrar Utiq" href="javascript:_an.showUtiqInfo()">Administrar Utiq</a>
</li>`,
        "lne": `<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Quiénes somos" href="https://www.lne.es/contacto/">Quiénes somos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Club LA NUEVA ESPAÑA" href="https://club.lne.es/">Club LA NUEVA ESPAÑA</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Puntos de venta" href="https://mas.lne.es/puntosdeventa/">Puntos de venta</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Tienda" href="https://tienda.lne.es/">Tienda</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Publicidad" href="https://www.prensaiberica360.es/">Publicidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Agencias" href="http://argos.epi.es/">Agencias</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política Ambiental y PRL" href="https://estaticos-cdn.prensaiberica.es/epi/public/content/file/original/2021/0630/08/politica-ambiental-b22b761.pdf">Política Ambiental y PRL</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Desempeño Ambiental" href="https://estaticos-cdn.prensaiberica.es/epi/public/content/file/original/2021/0630/08/desempeno-ambiental-de-prensa-asturias-s-a-u-epa-y-artes-graficas-del-principado-s-l-agp-0594782.pdf">Desempeño Ambiental</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denuncias" href="https://www.prensaiberica.es/canal-de-denuncias/">Canal de denuncias</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso legal" href="https://micuenta.lne.es/protecciondatos?gdprTipo=3">Aviso legal</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política de privacidad y cookies" href="https://www.lne.es/politica-privacidad/">Política de privacidad y cookies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Preferencias de privacidad" href="javascript:Didomi.preferences.show();">Preferencias de privacidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Código Ético" href="https://www.lne.es/codigo-etico/">Código Ético</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso de transparencia sobre anuncios políticos" href="https://www.prensaiberica.es/aviso-de-transparencia/" target="_blank">Aviso de transparencia sobre anuncios políticos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Administrar Utiq" href="javascript:_an.showUtiqInfo()">Administrar Utiq</a>
</li>`,
        "malaga": `<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Localización" href="https://www.laopiniondemalaga.es/localizacion">Localización</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Conózcanos" href="https://www.laopiniondemalaga.es/conozcanos/">Conózcanos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Tarifas papel" href="https://mas.laopiniondemalaga.es/especiales/publicidad/">Tarifas papel</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Tarifas web" href="https://mas.laopiniondemalaga.es/especiales/publicidad/#formatos">Tarifas web</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Branded Content" href="http://www.becontent.es/">Branded Content</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Compromiso Ambiental" href="https://www.laopiniondemalaga.es/economia/empresas-malaga/2023/07/29/politica-medioambiental-seguridad-salud-trabajo-90455150.html">Compromiso Ambiental</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denuncias" href="https://www.prensaiberica.es/canal-de-denuncias/">Canal de denuncias</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso legal" href="https://micuenta.laopiniondemalaga.es/protecciondatos?gdprTipo=3">Aviso legal</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política de privacidad y cookies" href="https://www.laopiniondemalaga.es/politica-privacidad/">Política de privacidad y cookies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Preferencias de privacidad" href="javascript:Didomi.preferences.show();">Preferencias de privacidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Código Ético" href="https://www.laopiniondemalaga.es/codigo-etico/">Código Ético</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso de transparencia sobre anuncios políticos" href="https://www.prensaiberica.es/aviso-de-transparencia/" target="_blank">Aviso de transparencia sobre anuncios políticos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Administrar Utiq" href="javascript:_an.showUtiqInfo()">Administrar Utiq</a>
</li>`,
        "mallorca": `<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Quiénes somos" href="/contacto/">Quiénes somos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Newsletter" href="/newsletters/">Newsletter</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Tarifas de Publicidad" href="https://www.prensaiberica360.es/tarifas/tarifas-diario-de-mallorca/">Tarifas de Publicidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Branded Content" href="http://www.becontent.es/">Branded Content</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="RSS" href="/rss.html">RSS</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denuncias" href="https://www.prensaiberica.es/canal-de-denuncias/">Canal de denuncias</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso legal" href="https://micuenta.diariodemallorca.es/protecciondatos?gdprTipo=3">Aviso legal</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política de privacidad y cookies" href="https://www.diariodemallorca.es/politica-privacidad/">Política de privacidad y cookies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Preferencias de privacidad" href="javascript:Didomi.preferences.show();">Preferencias de privacidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Código Ético" href="https://www.diariodemallorca.es/codigo-etico/">Código Ético</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso de transparencia sobre anuncios políticos" href="https://www.prensaiberica.es/aviso-de-transparencia/" target="_blank">Aviso de transparencia sobre anuncios políticos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Administrar Utiq" href="javascript:_an.showUtiqInfo()">Administrar Utiq</a>
</li>`,
        "mediterraneo": `<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Quiénes somos" href="https://www.elperiodicomediterraneo.com/quienes-somos/">Quiénes somos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Publicidad" href="https://www.prensaiberica360.es/">Publicidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Branded Content" href="http://www.becontent.es/">Branded Content</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denuncias" href="https://www.prensaiberica.es/canal-de-denuncias/">Canal de denuncias</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso legal" href="https://micuenta.elperiodicomediterraneo.com/protecciondatos?gdprTipo=3">Aviso legal</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política de privacidad y cookies" href="https://www.elperiodicomediterraneo.com/politica-privacidad/">Política de privacidad y cookies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Preferencias de privacidad" href="javascript:Didomi.preferences.show();">Preferencias de privacidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Código Ético" href="https://www.elperiodicomediterraneo.com/codigo-etico/">Código Ético</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso de transparencia sobre anuncios políticos" href="https://www.prensaiberica.es/aviso-de-transparencia/" target="_blank">Aviso de transparencia sobre anuncios políticos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Administrar Utiq" href="javascript:_an.showUtiqInfo()">Administrar Utiq</a>
</li>`,
        "murcia": `<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Localización" href="https://www.laopiniondemurcia.es/localizacion/">Localización</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Conózcanos" href="https://www.laopiniondemurcia.es/conozcanos/">Conózcanos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Tarifas" href="https://www.prensaiberica360.es/nuestras-marcas/papel-y-digital/la-opinion-de-murcia">Tarifas</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Contacto" href="https://mas.laopiniondemurcia.es/publicidad/contacto/">Contacto</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Branded Content" href="http://www.becontent.es/">Branded Content</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denuncias" href="https://www.prensaiberica.es/canal-de-denuncias/">Canal de denuncias</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso legal" href="https://micuenta.laopiniondemurcia.es/protecciondatos?gdprTipo=3">Aviso legal</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política de privacidad y cookies" href="https://www.laopiniondemurcia.es/politica-privacidad/">Política de privacidad y cookies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Preferencias de privacidad" href="javascript:Didomi.preferences.show();">Preferencias de privacidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Código Ético" href="https://www.laopiniondemurcia.es/codigo-etico/">Código Ético</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso de transparencia sobre anuncios políticos" href="https://www.prensaiberica.es/aviso-de-transparencia/" target="_blank">Aviso de transparencia sobre anuncios políticos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Administrar Utiq" href="javascript:_an.showUtiqInfo()">Administrar Utiq</a>
</li>`,
        "r7": `<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Conegui'ns" href="https://www.regio7.cat/coneguins/">Conegui'ns</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Adreces i telèfons" href="https://www.regio7.cat/adreces-i-telefons/">Adreces i telèfons</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="BContent" href="http://www.becontent.es/">BContent</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Tarifes Publicitàries" href="https://www.prensaiberica360.es/tarifas/tarifas-regio7/tarifas-regio-7-catala/">Tarifes Publicitàries</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denúncies" href="https://www.prensaiberica.es/canal-de-denuncias/">Canal de denúncies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Avís legal" href="https://elmeucompte.regio7.cat/protecciondatos?gdprTipo=3">Avís legal</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política de privacitat i cookies" href="https://www.regio7.cat/politica-privacitat/">Política de privacitat i cookies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Preferències de privacitat" href="javascript:Didomi.preferences.show();">Preferències de privacitat</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Codi Ètic" href="https://www.regio7.cat/codi-etic/">Codi Ètic</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Avís de transparència sobre anuncis polítics" href="https://www.prensaiberica.es/aviso-de-transparencia-ca/" target="_blank">Avís de transparència sobre anuncis polítics</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Administrar Utiq" href="javascript:_an.showUtiqInfo()">Administrar Utiq</a>
</li>`,
        "zamora": `<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Quiénes somos" href="https://www.laopiniondezamora.es/localizacion/">Quiénes somos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Newsletter" href="https://www.laopiniondezamora.es/newsletters/">Newsletter</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Tarifas de publicidad" href="https://www.prensaiberica360.es/nuestras-marcas/papel-y-digital/opinion-de-zamora/">Tarifas de publicidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Branded Content" href="http://www.becontent.es/">Branded Content</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="RSS" href="https://www.laopiniondezamora.es/rss.html">RSS</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Canal de denuncias" href="https://www.prensaiberica.es/canal-de-denuncias/">Canal de denuncias</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso legal" href="https://micuenta.laopiniondezamora.es/protecciondatos?gdprTipo=3">Aviso legal</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Política de privacidad y cookies" href="https://www.laopiniondezamora.es/politica-privacidad/">Política de privacidad y cookies</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Preferencias de privacidad" href="javascript:Didomi.preferences.show();">Preferencias de privacidad</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Código Ético" href="https://www.laopiniondezamora.es/codigo-etico/">Código Ético</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Aviso de transparencia sobre anuncios políticos" href="https://www.prensaiberica.es/aviso-de-transparencia/" target="_blank">Aviso de transparencia sobre anuncios políticos</a>
</li>
<li class="ft-org-footer__legal-item">
    <a class="ft-org-footer__legal-link" rel="nofollow" title="Administrar Utiq" href="javascript:_an.showUtiqInfo()">Administrar Utiq</a>
</li>`
    };
    function renderLiteRrss(meta) {
        const mediumName = (meta && meta.mediaName) || LITE_DEFAULT.mediaName;
        const socials = (meta && meta.socials) || LITE_DEFAULT.socials;

        return `<ul class="ft-org-footer__rrss-list">
${socials.map(item => `                                                            <li class="ft-org-footer__rrss-item">
                                                                <a class="ft-org-footer__rrss-link" href="${item.url}"
                                                                    itemprop="sameAs"
                                                                    rel="nofollow noopener"
                                                                    target="_blank"
                                                                    title="${item.label} de ${mediumName}"
                                                                    aria-label="${item.label} de ${mediumName}">
                                                                    <span
                                                                        class="ft-org-footer__rrss-icon ft-org-footer__rrss-icon--${item.icon}"
                                                                        aria-hidden="true"></span>
                                                                </a>
                                                            </li>`).join("\n")}
                                                        </ul>`;
    }

    function normalizeLiteLegalItems(legalItems) {
        if (!legalItems) return legalItems;
        return legalItems.replace(
            /(<a class="ft-org-footer__legal-link"[^>]*href=")[^"]*("[^>]*>\s*Publicidad\s*<\/a>)/g,
            `$1${LITE_ADS_URL}$2`
        );
    }

    function buildLiteVariant(meta, legalItems) {
        const mediumName = (meta && meta.mediaName) || LITE_DEFAULT.mediaName;
        const legalName = (meta && meta.legalName) || LITE_DEFAULT.legalName;
        const logoSrc = (meta && meta.id && LITE_LOGO_MAP[meta.id]) || LITE_LOGO_MAP[LITE_DEFAULT.id];
        const homeUrl = (meta && meta.id && LITE_HOME_URL_MAP[meta.id]) || LITE_HOME_URL_MAP[LITE_DEFAULT.id];
        const normalizedLegalItems = normalizeLiteLegalItems(legalItems);

        let html = LITE_BASE
            .replaceAll("Media name", mediumName)
            .replaceAll("MEDIA NAME, S.L.U.", legalName)
            .replace(
                LITE_LOGO_LINK_RE,
                `<a class="ft-org-footer__logo-link" href="${homeUrl}"
                                                            target="_self"
                                                            title="Ir a la portada de ${mediumName}"
                                                            aria-label="${mediumName} – ir a la portada">`
            )
            .replace(
                LITE_LOGO_RE,
                `<img class="ft-org-footer__logo-img" itemprop="logo"
                                                                src="${logoSrc}"
                                                                width="190" height="47" loading="lazy"
                                                                alt="" />`
            )
            .replace(LITE_RRSS_LIST_RE, renderLiteRrss(meta))
            .replace(LITE_BRAND_GROUPS_RE, LITE_BRAND_GROUPS)
            .replace(
            LITE_COPYRIGHT_RE,
            `<span class="ft-org-footer__copyright-link" itemprop="legalName">${legalName}</span>`
        );

        if (normalizedLegalItems) {
            html = html.replace(
                LITE_LEGAL_LIST_RE,
                `<ul class="ft-org-footer__legal-list">
${normalizedLegalItems.trim()}
                                                        </ul>`
            );
        }

        return html;
    }

    VARIANTS["lite-ep"] = buildLiteVariant(LITE_DEFAULT, LITE_LEGAL_ITEMS[LITE_DEFAULT.id]);
    const liteNameCollator = new Intl.Collator("es", { sensitivity: "base" });
    const LITE_STORIES = [...LITE_VARIANTS]
        .sort((a, b) => liteNameCollator.compare(a.name, b.name))
        .map(meta => ({
            id: `lite-${meta.id}`,
            name: meta.name,
            kind: "interactive",
            full: true,
            render: () => buildLiteVariant(meta, LITE_LEGAL_ITEMS[meta.id])
        }));

    const baseArgTypes = [
        { key: "variant", control: "select", desc: "Variante del organismo (markup verbatim del showroom).", options: [
            ["ep-1", "El Periódico, tipo 1"],
            ["ep-2", "El Periódico, tipo 2"],
            ["epe-1", "El Periódico de España, tipo 1"],
            ["epe-2", "El Periódico de España, tipo 2"],
            ["reg-1", "Regionales, tipo 1"],
            ["reg-2", "Regionales, tipo 2"],
            ["sport-1", "Sport, tipo 1"],
            ["sport-2", "Sport, tipo 2"],
            ["lite-ep", "Lite, El Periódico de Catalunya"]
        ] }
    ];
    const baseArgs = { variant: "ep-1" };

    function live(a) {
        return VARIANTS[a.variant] || VARIANTS["ep-1"];
    }

    const overview = `<div class="cb-docs__inner">
        <h1>Footer</h1>
        <p class="cb-docs__lead">Organismo del 42DS (<code>.ft-org-footer</code>): pie de página de medio — logo, RRSS, navegación por columnas, legal y sellos. Fuertemente dependiente de la marca (cada medio tiene su tipo 1 / tipo 2).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/organism/footer.css</code></td><td>CSS del organismo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td>Logos / iconos RRSS</td><td>Assets</td><td>Los aporta el medio</td></tr>
                <tr><td>JS de acordeón (móvil)</td><td>JavaScript</td><td>Solo móvil (despliegue de columnas). Aquí estático.</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">El footer es <strong>brand-espec&iacute;fico</strong>: el select recorre los pies reales de El Peri&oacute;dico, El Peri&oacute;dico de Espa&ntilde;a, Regionales, Sport y una base <code>--lite</code>. Las variantes <code>lite</code> quedan documentadas en el subgrupo <strong>Lite</strong> y se muestran en orden alfab&eacute;tico. La <strong>toolbar Brand / Cabecera (CSV)</strong> ajusta adem&aacute;s colores y logos.</div>

        <h2>Variantes</h2>
        <table class="cb-table">
            <thead><tr><th>Variante</th><th>Medio</th></tr></thead>
            <tbody>
                <tr><td>tipo 1 / tipo 2</td><td>El Periódico · El Periódico de España · Regionales · Sport</td></tr>
                <tr><td><code>--lite</code></td><td>pie reducido base + variantes de enlaces legales por edición</td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas (<code>footer-[marca].scss</code> + variantes type1/type2). Cambia la marca con la <strong>toolbar Brand</strong> y/o el dropdown <strong>Cabecera</strong>.</p>

        <h2>Contrato de datos del Footer Lite</h2>
        <p>Los 24 HTML del subgrupo <strong>Lite</strong> disponen de un JSON preparado para implementaciones que no puedan reutilizar el HTML plano. Cada entrada es autocontenida, corresponde a una story <code>lite-*</code> y conserva todas las secciones y particularidades de ese medio.</p>
        <table class="cb-table cb-table--dense">
            <thead><tr><th>Bloque</th><th>Contenido</th></tr></thead>
            <tbody>
                <tr><td><code>footers[]</code></td><td>24 contratos completos, uno por cada HTML del subgrupo Lite.</td></tr>
                <tr><td><code>storyId</code> / <code>sourceHtml</code></td><td>Trazabilidad directa con la story <code>lite-*</code> y el HTML de origen de cada medio.</td></tr>
                <tr><td><code>sections</code></td><td><code>top</code>, <code>middle</code>, <code>bottom</code> y <code>meta</code>, incluyendo también los bloques compartidos dentro de cada footer.</td></tr>
                <tr><td><code>sections.bottom.legalLinks[].type</code></td><td>Distingue enlaces navegables (<code>link</code>) de acciones de consentimiento (<code>action</code>: Didomi o Utiq).</td></tr>
                <tr><td><code>schemaVersion</code></td><td>Versión del contrato para controlar cambios de estructura.</td></tr>
            </tbody>
        </table>
        <div class="cb-callout">
            <strong>Recurso para desarrollo:</strong>
            <a href="/fourty/storybook/data/footer-lite.json" download="footer-lite.json">Descargar footer-lite.json</a>
            · <a href="/fourty/storybook/data/footer-lite.json" target="_blank" rel="noopener">Ver JSON en el navegador</a>.
            Fuente generadora: <code>scripts/generate-footer-lite-json.js</code>.
        </div>

        <p class="cb-src">Fuente: <code>scss/fourties/organism/footer/_footer.scss</code> · markup: <code>fourty/organisms/organism-footer.html</code></p>
    </div>`;

    const DEF = {
        id: "footer",
        name: "Footer",
        group: "Organisms",
        overview,
        subgroups: [
            { id: "lite", name: "Lite", collapsed: false, stories: LITE_STORIES }
        ],
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(DEF);
    window.SB.loadMarkup(DEF, document.currentScript && document.currentScript.src, { full: true });
})();
