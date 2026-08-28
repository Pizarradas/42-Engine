/* ════════════════════════════════════════════════════════════════════════
   organisms/game/game.js — Organisms / Game
   Casuística REAL de scss/fourties/organism/game/_game.scss (.ft-org-game).
   Markup VERBATIM de fourty/organisms/organism-game.html. Cero invención de API.

   Criterio ORGANISMOS: controles MÍNIMOS (un solo select de variante, o ninguno). La
   fidelidad la aporta el MARKUP — construcción literal del showroom, no se parametriza
   pieza a pieza. Rutas normalizadas (../../cds-statics → /cds-statics).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";

    /* ▼ SINGLE SOURCE OF TRUTH — markup verbatim por variante ▼ */
    const VARIANTS = {
        "base": `<div class="ft-org-game">
                                                <!-- cabecera juego -->
                                                <div class="ft-org-game__header">
                                                    <blockquote class="ft-org-game__quote" aria-hidden="true">
                                                    <div class="ft-org-game__quoteArea"> Sólo es posible actuar
                                                        <div class="ft-org-game__quoteText">
                                        
                                                        <span class="ft-org-game__quoteLetter ft-org-game__quoteLetter--isActive" alt="Letra 1 de la palabra 1">a</span>
                                                        <span class="ft-org-game__quoteLetter" alt="Letra 1 de la palabra 1">b</span>
                                                        <span class="ft-org-game__quoteLetter" alt="Letra 1 de la palabra 1">c</span>
                                                        <span class="ft-org-game__quoteLetter" alt="Letra 1 de la palabra 1">d</span>
                                                        <span class="ft-org-game__quoteLetter" alt="Letra 1 de la palabra 1">_</span>
                                                        <span class="ft-org-game__quoteLetter" alt="Letra 1 de la palabra 1">_</span>
                                                        <span class="ft-org-game__quoteLetter" alt="Letra 1 de la palabra 1">_</span>
                                                        <span class="ft-org-game__quoteLetter" alt="Letra 1 de la palabra 1">_</span>
                                                        <span class="ft-org-game__quoteNumber">6</span>
                                                        </div>
                                                        y se intenta comprender los
                                                        <div class="ft-org-game__quoteText">
                                        
                                                        <span class="ft-org-game__quoteLetter" alt="Letra 1 de la palabra 1">_</span>
                                                        <span class="ft-org-game__quoteLetter" alt="Letra 1 de la palabra 1">_</span>
                                                        <span class="ft-org-game__quoteLetter" alt="Letra 1 de la palabra 1">_</span>
                                                        <span class="ft-org-game__quoteLetter" alt="Letra 1 de la palabra 1">_</span>
                                                        <span class="ft-org-game__quoteNumber">6</span>
                                                        </div>
                                                        y sentimientos de nuestro
                                                        <div class="ft-org-game__quoteText">
                                        
                                                        <span class="ft-org-game__quoteLetter" alt="Letra 1 de la palabra 1">_</span>
                                                        <span class="ft-org-game__quoteLetter" alt="Letra 1 de la palabra 1">_</span>
                                                        <span class="ft-org-game__quoteLetter" alt="Letra 1 de la palabra 1">_</span>
                                                        <span class="ft-org-game__quoteLetter" alt="Letra 1 de la palabra 1">_</span>
                                                        <span class="ft-org-game__quoteNumber">6</span>
                                                        </div>
                                                        , como si viéramos el <span class="ft-org-game__quoteSolved" aria-label="Palabra resuelta">cielo</span>
                                                        con sus ojos.
                                                    </div>
                                        
                                                    <div class="ft-org-game__quoteAuthor">
                                                        -Abraham Lincoln
                                                    </div>
                                                    </blockquote>
                                                </div>
                                                
                                                <!-- game__input -->
                                                <div class="ft-org-game__input ft-org-game__input--pipe" data-empty="true" data-focus="false">
                                                    <div class="ft-mol-form">
                                                    <div id="gameInput" class="ft-mol-form__input" type="text" inputmode="none" readonly tabindex="-1"
                                                        aria-hidden="true" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></div>
                                                    <label class="ft-mol-form__label">Label</label>
                                                    <p class="ft-mol-form__supporting-text">
                                                        <span class="ft-mol-form__supporting-message">Mensaje de error</span>
                                                    </p>
                                                    </div>
                                                </div>
                                                
                                                <!-- game__alerts -->
                                                <div class="ft-org-game__alert ft-org-game__alert--is-open ft-org-game__alert--is-ok" role="alert">
                                                    <dotlottie-player src="/cds-statics/assets/img/lotties/game-is-ok.lottie" class="ft-lottie" autoplay loop>
                                                    </dotlottie-player>
                                                    <span class="ft-org-game__alertText">
                                                        ¡Enhorabuena! Reto superado
                                                    </span>
                                                </div>
                                                <div class="ft-org-game__alert ft-org-game__alert--is-open ft-org-game__alert--is-error" role="alert">
                                                    <dotlottie-player src="/cds-statics/assets/img/lotties/game-is-error.lottie" class="ft-lottie" autoplay
                                                    loop>
                                                    </dotlottie-player>
                                                    <span class="ft-org-game__alertText">
                                                        Lo sentimos, la palabra oculta era ATRIL
                                                    </span>
                                                </div>
                                                <div class="ft-org-game__alert ft-org-game__alert--is-open ft-org-game__alert--is-warning" role="alert">
                                                    <dotlottie-player src="/cds-statics/assets/img/lotties/game-is-warning.lottie" class="ft-lottie" autoplay
                                                    loop>
                                                    </dotlottie-player>
                                                    <span class="ft-org-game__alertText">
                                                        Comienza con tu primer intento
                                                    </span>
                                                </div>

                                                <!-- Teclado -->
                                                <div class="ft-org-game__keyboard" role="group" aria-label="Teclado de letras">
                                                    <button type="button" class="ft-org-game__key" aria-label="O">O</button>
                                                    <button type="button" class="ft-org-game__key" aria-label="A">A</button>
                                                    <button type="button" class="ft-org-game__key" aria-label="L">L</button>
                                                    <button type="button" class="ft-org-game__key ft-org-game__key--active" aria-label="I">I</button>
                                                    <button type="button" class="ft-org-game__key" aria-label="A">A</button>
                                                    <button type="button" class="ft-org-game__key" aria-label="B">B</button>
                                                    <button type="button" class="ft-org-game__key ft-org-game__key--disabled" aria-label="R" disabled="">R</button>
                                                    <button type="button" class="ft-org-game__key" aria-label="A">A</button>
                                                    <button type="button" class="ft-org-game__key ft-org-game__key--outlined" aria-label="Z">Z</button>
                                                    <button type="button" class="ft-org-game__key" aria-label="R">R</button>
                                                    <button type="button" class="ft-org-game__key" aria-label="M">M</button>
                                                    <button type="button" class="ft-org-game__key" aria-label="B">B</button>
                                                </div>
                                                
                                                <!-- Botones -->
                                                <div class="ft-mol-btnGroup ft-mol-btnGroup--cnt">
                                                    <button type="button"  class="ft-btn ft-btn--secondary ft-btn--md ft-btn-is--disabled ft-btn-is--disabledSecondary"
                                                    title="title text" target="_self">
                                                    Eliminar
                                                    </button>
                                                    <button type="button" name="go-to" class="ft-btn-nav ft-btn-nav--md ft-btn-nav--reload ft-btn-nav--bordered"
                                                    title="title text">
                                                    <span class="ft-btn-nav__text">
                                                        Actualizar
                                                    </span>
                                                    <span class="ft-btn-nav__icon"></span>
                                                    </button>
                                                    <button type="button"  class="ft-btn ft-btn--secondary ft-btn--md" title="title text" target="_self">
                                                    Confirmar
                                                    </button>
                                                </div>
                                            </div>
                                                
                                            <div class="ft-org-game">
                                                <!-- cabecera juego -->
                                                <div class="ft-org-game__header">
                                                    <div class="ft-org-game__board" role="grid" aria-label="Tablero del juego de palabras">
                                                        <!-- Fila 1 -->
                                                        <div class="ft-org-game__row" role="row">
                                                        <div class="ft-org-game__cell ft-org-game__cell--correct ft-animation-flip" role="gridcell" aria-label="A correcta">A</div>
                                                        <div class="ft-org-game__cell ft-org-game__cell--present ft-animation-flip" role="gridcell" aria-label="R en posición incorrecta">R</div>
                                                        <div class="ft-org-game__cell ft-org-game__cell--absent ft-animation-flip" role="gridcell" aria-label="B no está en la palabra">B</div>
                                                        <div class="ft-org-game__cell ft-org-game__cell--absent ft-animation-flip" role="gridcell" aria-label="O no está en la palabra">O</div>
                                                        <div class="ft-org-game__cell ft-org-game__cell--correct ft-animation-flip" role="gridcell" aria-label="L correcta">L</div>
                                                        </div>
                                                    
                                                        <!-- Fila 2 -->
                                                        <div class="ft-org-game__row" role="row">
                                                        <div class="ft-org-game__cell" role="gridcell">H</div>
                                                        <div class="ft-org-game__cell ft-org-game__cell--active ft-animation-shake" role="gridcell"></div>
                                                        <div class="ft-org-game__cell" role="gridcell"></div>
                                                        <div class="ft-org-game__cell" role="gridcell"></div>
                                                        <div class="ft-org-game__cell" role="gridcell"></div>
                                                        </div>
                                                    
                                                        <!-- Fila 3 -->
                                                        <div class="ft-org-game__row" role="row">
                                                        <div class="ft-org-game__cell" role="gridcell"></div>
                                                        <div class="ft-org-game__cell" role="gridcell"></div>
                                                        <div class="ft-org-game__cell" role="gridcell"></div>
                                                        <div class="ft-org-game__cell" role="gridcell"></div>
                                                        <div class="ft-org-game__cell" role="gridcell"></div>
                                                        </div>
                                                    
                                                        <!-- Fila 4 -->
                                                        <div class="ft-org-game__row" role="row">
                                                        <div class="ft-org-game__cell" role="gridcell"></div>
                                                        <div class="ft-org-game__cell" role="gridcell"></div>
                                                        <div class="ft-org-game__cell" role="gridcell"></div>
                                                        <div class="ft-org-game__cell" role="gridcell"></div>
                                                        <div class="ft-org-game__cell" role="gridcell"></div>
                                                        </div>
                                                    
                                                        <!-- Fila 5 -->
                                                        <div class="ft-org-game__row" role="row">
                                                        <div class="ft-org-game__cell" role="gridcell"></div>
                                                        <div class="ft-org-game__cell" role="gridcell"></div>
                                                        <div class="ft-org-game__cell" role="gridcell"></div>
                                                        <div class="ft-org-game__cell" role="gridcell"></div>
                                                        <div class="ft-org-game__cell" role="gridcell"></div>
                                                        </div>
                                                    
                                                        <!-- Fila 6 -->
                                                        <div class="ft-org-game__row" role="row">                  
                                                            <div class="ft-org-game__cell ft-org-game__cell--correct ft-org-game__cell--solved" role="gridcell">A</div>
                                                            <div class="ft-org-game__cell ft-org-game__cell--correct ft-org-game__cell--solved" role="gridcell">T</div>
                                                            <div class="ft-org-game__cell ft-org-game__cell--correct ft-org-game__cell--solved" role="gridcell">R</div>
                                                            <div class="ft-org-game__cell ft-org-game__cell--correct ft-org-game__cell--solved" role="gridcell">I</div>
                                                            <div class="ft-org-game__cell ft-org-game__cell--correct ft-org-game__cell--solved" role="gridcell">L</div>
                                                        </div>
                                                    </div>              
                                                </div>
                                            
                                                <!-- Teclado -->
                                                <div class="ft-org-game__keyboard--qwerty" role="group" aria-label="Teclado QWERTY del juego">
                                                    <!-- Fila 0 -->
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="1">1</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="2">2</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="3">3</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="4">4</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="5">5</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="6">6</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="7">7</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="8">8</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="9">9</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="0">0</button>
                                            
                                                    <!-- Fila 1 -->
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="Q">Q</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="W">W</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="E">E</button>
                                                    <button type="button" class="ft-org-game__key--qwerty ft-org-game__key--qwerty--present" aria-label="R">R</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="T">T</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="Y">Y</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="U">U</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="I">I</button>
                                                    <button type="button" class="ft-org-game__key--qwerty ft-org-game__key--qwerty--absent" aria-label="O">O</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="P">P</button>
                                            
                                                    <!-- Fila 2 -->
                                                    <button type="button" class="ft-org-game__key--qwerty ft-org-game__key--qwerty--correct" aria-label="A">A</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="S">S</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="D">D</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="F">F</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="G">G</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="H">H</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="J">J</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="K">K</button>
                                                    <button type="button" class="ft-org-game__key--qwerty ft-org-game__key--qwerty--correct" aria-label="L">L</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="Ñ">Ñ</button>
                                            
                                                    <!-- Fila 3 -->
                                                    <button type="button" class="ft-org-game__key--qwerty ft-org-game__key--qwerty--wide" aria-label="Mayúsculas">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 13a1 1 0 0 0-1-1H5.061a1 1 0 0 1-.75-1.811l6.836-6.835a1.207 1.207 0 0 1 1.707 0l6.835 6.835a1 1 0 0 1-.75 1.811H16a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z" /></svg>
                                                    </button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="Z">Z</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="X">X</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="C">C</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="V">V</button>
                                                    <button type="button" class="ft-org-game__key--qwerty ft-org-game__key--qwerty--absent" aria-label="B">B</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="N">N</button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="M">M</button>
                                                    <button type="button" class="ft-org-game__key--qwerty ft-org-game__key--qwerty--wide" aria-label="Borrar">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" /><path d="m12 9 6 6" /><path d="m18 9-6 6" /></svg>
                                                    </button>
                                            
                                                    <!-- Fila 4 -->
                                                    <button type="button" class="ft-org-game__key--qwerty ft-org-game__key--qwerty--wide" aria-label="Caracteres especiales">
                                                        !#1
                                                    </button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="coma">,</button>
                                                    <button type="button" class="ft-org-game__key--qwerty ft-org-game__key--qwerty--space" aria-label="espacio">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                            class="lucide lucide-space-icon lucide-space">
                                                            <path d="M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1" />
                                                        </svg>
                                                    </button>
                                                    <button type="button" class="ft-org-game__key--qwerty" aria-label="punto">.</button>
                                                    <button type="button" class="ft-org-game__key--qwerty ft-org-game__key--qwerty--wide" aria-label="Enter">Enter
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="12" viewBox="0 6 24 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9L2 12L5 15" stroke="black"/><path d="M22 9V10C22 10.5304 21.7893 11.0391 21.4142 11.4142C21.0391 11.7893 20.5304 12 20 12H2" stroke="black"/></svg>
                                                    </button>
                                                </div>
                                            </div>
                                                
                                            <div class="ft-org-game">
                                                <!-- Archivo -->
                                                <div class="ft-org-game__archive">
                                                  <h3 class="ft-helper-fontSize-heading-XS">
                                                    Últimos 7 días
                                                  </h3>
                                                  <ul class="ft-list ft-list--primary ft-list--chevron ft-list--chevron-rgt ft-list--has-icon">
                                                    <li class="ft-list__item">
                                                      <a href="#" class="ft-list__link" title="title text" target="self">
                                                        <img src="/cds-statics/assets/img/icons/icon-o-play.svg" loading="lazy" class="ft-list-photoinfo__img ft-list-photoinfo__img--alert ft-helper-bgPink-pangramax" alt="alt text" title="title text">
                                                        Domingo, 07 de Enero
                                                      </a>
                                                    </li>
                                                    <li class="ft-list__item">
                                                      <a href="#" class="ft-list__link" title="title text" target="self">
                                                        <img src="/cds-statics/assets/img/icons/icon-o-play.svg" loading="lazy" class="ft-list-photoinfo__img ft-list-photoinfo__img--alert ft-helper-bgPink-pangramax" alt="alt text" title="title text">
                                                        Sábado, 06 de Enero
                                                      </a>
                                                    </li>
                                                    <li class="ft-list__item">
                                                      <a href="#" class="ft-list__link" title="title text" target="self">
                                                        <img src="/cds-statics/assets/img/icons/icon-o-success.svg" loading="lazy" class="ft-list-photoinfo__img ft-list-photoinfo__img--alert ft-helper-bgColor-alert-success" alt="alt text" title="title text">
                                                        Viernes, 05 de Enero
                                                      </a>
                                                    </li>
                                                    <li class="ft-list__item">
                                                      <a href="#" class="ft-list__link" title="title text" target="self">
                                                        <img src="/cds-statics/assets/img/icons/icon-o-in-progress.svg" loading="lazy" class="ft-list-photoinfo__img ft-list-photoinfo__img--alert ft-helper-bgColor-alert-warning" alt="alt text" title="title text">
                                                        Jueves, 04 de Enero
                                                      </a>
                                                    </li>
                                                    <li class="ft-list__item">
                                                      <a href="#" class="ft-list__link" title="title text" target="self">
                                                        <img src="/cds-statics/assets/img/icons/icon-o-error.svg" loading="lazy" class="ft-list-photoinfo__img ft-list-photoinfo__img--alert ft-helper-bgColor-alert-error" alt="alt text" title="title text">
                                                        Miércoles, 03 de Enero
                                                      </a>
                                                    </li>
                                                    <li class="ft-list__item">
                                                      <a href="#" class="ft-list__link" title="title text" target="self">
                                                        <img src="/cds-statics/assets/img/icons/icon-o-close.svg" loading="lazy" class="ft-list-photoinfo__img ft-list-photoinfo__img--alert ft-helper-bgColor-background-darkGrey" alt="alt text" title="title text">
                                                        Martes, 02 de Enero
                                                      </a>
                                                    </li>
                                                    <li class="ft-list__item ft-list--disabled">
                                                      <a href="#" class="ft-list__link" title="title text" target="self">
                                                        <img src="/cds-statics/assets/img/icons/icon-o-play.svg" loading="lazy" class="ft-list-photoinfo__img ft-list-photoinfo__img--alert ft-helper-bgPink-pangramax" alt="alt text" title="title text">
                                                        Lunes, 01 de Enero
                                                      </a>
                                                    </li>
                                                  </ul>
                                                  <div class="ft-mol-btnGroup ft-mol-btnGroup--cnt">
                                                    <button type="button" class="ft-btn ft-btn--tertiary ft-btn--sm" title="title text" target="_self">
                                                      Ver más
                                                    </button>
                                                  </div>
                                                </div>
                                            </div>
                                                
                                            <div class="ft-org-game">
                                                <!-- game__field -->
                                                <div id="field-game" class="ft-org-game__field">
                                                  <div class="ft-org-game__field__wrapper">                    
                                                  
                                                    <!-- ASISTENTE -->
                                                    <div class="ft-text--assistant ft-helper-bgGreen-cuatroencampo-500 ft-helper-spacer-gap-b-xs">
                                                      <span>Selecciona 4 jugadores que hayan compartido al menos un minuto en el campo durante algún partido</span>
                                                    </div>
                                      
                                                    <!-- MENSAJES -->
                                                    <div id="field-messages" class="ft-org-game__field__messages">
                                                    Selecciona 4 elementos
                                                    </div>
                                                
                                                    <!-- RESUELTOS -->
                                                    <div id="field-resolved" class="ft-org-game__field__resolved">
                                                      <div id="field-resolved-list" class="ft-org-game__field__resolved-list"></div>
                                                    </div>
                                                
                                                    <!-- TABLERO -->
                                                    <div id="field-board" class="ft-org-game__field__board"></div>
                                      
                                                    <!-- ESTADISTICAS -->
                                                    <div class="ft-org-game__field__stats">
                                                        <div id="field-stats-correct" class="ft-org-game__field__stats-item">
                                                            0/4 Grupos acertados
                                                        </div>
                                                        <div id="field-stats-fails" class="ft-org-game__field__stats-item">
                                                            0/6 Intentos fallidos
                                                        </div>
                                                    </div>
                                                    
                                                    <!-- Botones -->
                                                    <div class="ft-mol-btnGroup ft-mol-btnGroup--cnt">
                                                      <button type="button" class="ft-btn ft-btn--secondary ft-btn--secondary-has--icon ft-btn--md" title="Pista"
                                                        target="_self">
                                                        <svg class="ft-btn__icon ft-btn__icon--primal" width="40" height="40" viewBox="0 0 40 40" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <g clip-path="url(#clip0_7653_2548)">
                                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                                    d="M7.26758 37.8577C7.26758 37.2894 7.49334 36.7443 7.89521 36.3425C8.29707 35.9406 8.84211 35.7148 9.41043 35.7148H19.4104C19.9788 35.7148 20.5238 35.9406 20.9257 36.3425C21.3275 36.7443 21.5533 37.2894 21.5533 37.8577C21.5533 38.426 21.3275 38.9711 20.9257 39.3729C20.5238 39.7748 19.9788 40.0006 19.4104 40.0006H9.41043C8.84211 40.0006 8.29707 39.7748 7.89521 39.3729C7.49334 38.9711 7.26758 38.426 7.26758 37.8577Z"
                                                                    fill="#FFFFFF"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                                    d="M25.7597 22.9639C24.6169 24.4554 23.1883 25.7154 21.554 26.6611V30.0011C21.554 30.7588 21.253 31.4856 20.7172 32.0214C20.1814 32.5572 19.4546 32.8582 18.6969 32.8582H10.1255C9.36769 32.8582 8.64097 32.5572 8.10515 32.0214C7.56933 31.4856 7.26831 30.7588 7.26831 30.0011V26.6611C5.49002 25.633 3.95435 24.2335 2.76603 22.558C1.57771 20.8825 0.76469 18.9705 0.382401 16.9522C0.000111416 14.934 0.0575493 12.8571 0.550797 10.8631C1.04405 8.86912 1.9615 7.00494 3.24061 5.3977C4.51971 3.79046 6.13038 2.47796 7.96277 1.54971C9.79517 0.621458 11.8062 0.09928 13.8587 0.0187862C15.9112 -0.0617076 17.957 0.301376 19.8564 1.08328C21.7559 1.86518 23.4644 3.04751 24.8654 4.54964C24.7008 5.255 24.332 5.89621 23.805 6.39318C23.2781 6.89014 22.6164 7.22083 21.9026 7.34392C15.9826 8.3725 15.9826 16.8725 21.9026 17.9011C23.3797 18.1582 24.5597 19.2868 24.8797 20.7525L24.934 21.0039C25.0969 21.7582 25.3855 22.4125 25.7626 22.9639H25.7597Z"
                                                                    fill="#FEDE00"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                                    d="M32.4375 4.88585C31.8946 2.50299 28.4917 2.51442 27.9689 4.90585L27.9489 5.00013L27.906 5.18585C27.6122 6.49876 26.9354 7.69499 25.9615 8.62317C24.9875 9.55135 23.7601 10.1698 22.4346 10.4001C19.9489 10.8344 19.9489 14.4058 22.4346 14.8373C23.7666 15.0687 24.9993 15.6919 25.9754 16.6273C26.9515 17.5627 27.6267 18.7678 27.9146 20.0887L27.9689 20.3373C28.4917 22.7287 31.8946 22.743 32.4375 20.3573L32.5032 20.0658C32.8036 18.7506 33.4859 17.5535 34.4644 16.6248C35.4429 15.6961 36.6741 15.0772 38.0032 14.8458C40.4975 14.4116 40.4975 10.8344 38.0032 10.4001C36.6427 10.1641 35.3856 9.52195 34.3968 8.55818C33.408 7.59441 32.734 6.35407 32.4632 5.00013L32.4375 4.88585Z"
                                                                    fill="#FFFFFF"></path>
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_7653_2548">
                                                                    <rect width="40" height="40" fill="white"></rect>
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                        Pista
                                                        <span class="ft-btn__badge" aria-label="1 de 3">1/3</span>
                                                      </button>
                                                      <button id="field-validate" type="button" class="ft-btn ft-btn--tertiary ft-btn--md ft-org-game__field__validate-btn"
                                                        title="title text" target="_self">
                                                        Confirmar
                                                      </button>
                                                    </div>
                                                  </div>
                                                </div>
                                      
                                                
                                            </div>`
    };

    const baseArgTypes = [];
    const baseArgs = {};

    function live() {
        return VARIANTS["base"];
    }

    const overview = `<div class="cb-docs__inner">
        <h1>Game</h1>
        <p class="cb-docs__lead">Organismo del 42DS (<code>.ft-org-game</code>): tablero de pasatiempo — cita/criptograma con letras, campo de entrada, alertas de validación y teclado en pantalla.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/organism/game.css</code></td><td>CSS del organismo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td>JS del juego (input, teclado, validación)</td><td>JavaScript</td><td>En producción. Aquí estático.</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Estado <strong>estático honesto</strong>: el juego lo gobierna el JS del consumidor (escribir, validar, marcar letras). Aquí se muestran los estados del showroom tal cual: letra activa, alertas (ok/error/warning) abiertas y teclas en sus estados (<code>--active</code>, <code>--disabled</code>, <code>--outlined</code>).</div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-org-game</code></td></tr>
                <tr><td>Cita / criptograma</td><td><code>__quote</code> · <code>__quoteLetter</code> (<code>--isActive</code>)</td></tr>
                <tr><td>Entrada</td><td><code>__input</code> (<code>--pipe</code>)</td></tr>
                <tr><td>Alertas</td><td><code>__alert--is-open</code> (<code>--is-ok/--is-error/--is-warning</code>)</td></tr>
                <tr><td>Teclado</td><td><code>__keyboard</code> &gt; <code>__key</code> (<code>--active/--disabled/--outlined</code>)</td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas. Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/organism/game/_game.scss</code> · markup: <code>fourty/organisms/organism-game.html</code></p>
    </div>`;

    const DEF = {
        id: "game",
        name: "Game",
        group: "Organisms",
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(DEF);
    window.SB.loadMarkup(DEF, document.currentScript && document.currentScript.src, { full: true });
})();
