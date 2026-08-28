/* ════════════════════════════════════════════════════════════════════════
   molecules/toolbar/toolbar.js — Molecules / Toolbar
   Casuística REAL de scss/fourties/molecules/toolbar/_toolbar.scss (.ft-mol-toolbar*).
   Markup VERBATIM de fourty/molecules/molecule-toolbar.html (toolbar de pasatiempo
   completa: Volver · Ayuda · Pista (dropdown) · Reiniciar · Resolver · más opciones +
   capa con timer). Cero invención de API.

   Barra de acciones de un pasatiempo. El tema de juego (--pangramax, --sudoku…) tiñe los
   estados hover y las etiquetas. Los menús .ft-mol-dropdown y el timer los maneja un JS
   consumidor; aquí se muestran en su estado por defecto (menús cerrados, timer 00:00).

   Estructura: una story plana interactiva "Base" (control: tema) + subgrupo "Markup"
   async desde toolbar.html.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* Markup verbatim del showroom; %%THEME%% se sustituye por la clase de tema activa. */
    const MARKUP = `<div class="ft-mol-toolbar%%THEME%%" role="toolbar"
    aria-label="Opciones del juego">
    <div class="ft-mol-toolbar__inner">
        <ul class="ft-mol-toolbar__list">
            <!-- Volver (botón simple) -->
            <li class="ft-mol-toolbar__item ft-mol-toolbar__itemBack">
                <button type="button" class="ft-mol-toolbar__button">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="ft-mol-toolbar__icon" width="26" height="27"
                        viewBox="0 0 26 27" fill="none">
                        <path
                            d="M6.48134 14.8657C5.84499 14.1673 5.83885 13.0958 6.46737 12.3903L6.53236 12.3211L17.2183 1.48402C17.8496 0.84376 18.8789 0.837948 19.5174 1.47107C20.1558 2.10422 20.1616 3.13655 19.5303 3.77682L9.83508 13.6093L19.5174 23.2102C20.1558 23.8434 20.1616 24.8757 19.5303 25.516C18.899 26.1563 17.8696 26.162 17.2312 25.5289L6.54697 14.9343L6.48134 14.8657Z"
                            fill="currentColor" />
                    </svg>
                    <span class="ft-mol-toolbar__label"></span>
                </button>
            </li>
            <!-- Ayuda (botón simple) -->
            <li class="ft-mol-toolbar__item">
                <button type="button" class="ft-mol-toolbar__button"
                    aria-label="Ayuda">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="ft-mol-toolbar__icon" width="26" height="26"
                        viewBox="0 0 26 26" fill="none">
                        <g clip-path="url(#clip0_7468_544)">
                            <path
                                d="M23.5003 13C23.5003 7.20097 18.7993 2.49996 13.0003 2.49996C7.20134 2.49996 2.50033 7.20097 2.50033 13C2.50033 18.799 7.20134 23.5 13.0003 23.5C18.7993 23.5 23.5003 18.799 23.5003 13ZM25.8337 13C25.8337 20.0876 20.088 25.8333 13.0003 25.8333C5.91267 25.8333 0.166992 20.0876 0.166992 13C0.166992 5.91231 5.91267 0.166626 13.0003 0.166626C20.088 0.166626 25.8337 5.91231 25.8337 13Z"
                                fill="currentColor" />
                            <path
                                d="M10.5425 6.6379C11.4926 6.07952 12.61 5.87566 13.6962 6.06197C14.7823 6.2483 15.7675 6.81285 16.4772 7.65588C17.1866 8.49853 17.575 9.56511 17.5738 10.6665L17.5698 10.8323C17.4913 12.5258 16.2202 13.6516 15.3043 14.2622C14.7961 14.601 14.2963 14.8505 13.928 15.0142C13.7422 15.0968 13.5856 15.1592 13.4728 15.2022C13.4164 15.2237 13.3706 15.2405 13.3373 15.2523C13.3206 15.2582 13.3071 15.263 13.2968 15.2666C13.2917 15.2683 13.2872 15.2694 13.2837 15.2705C13.282 15.2711 13.2805 15.2718 13.2792 15.2723C13.2785 15.2725 13.278 15.2726 13.2775 15.2728L13.2769 15.2734C13.2765 15.2735 13.2761 15.2733 12.9072 14.1665L13.2757 15.2734C12.6646 15.477 12.0041 15.1468 11.8003 14.5357C11.5969 13.9254 11.9258 13.2657 12.5352 13.0608L12.5375 13.0603H12.5363C12.5369 13.0601 12.5375 13.0599 12.538 13.0597C12.5412 13.0586 12.5472 13.057 12.5557 13.054C12.5736 13.0476 12.6031 13.0365 12.6423 13.0215C12.7209 12.9916 12.8379 12.9451 12.9801 12.882C13.2681 12.754 13.6433 12.5653 14.01 12.3208C14.8145 11.7845 15.2405 11.2138 15.2405 10.6665V10.6648C15.2413 10.1138 15.0468 9.58019 14.6919 9.15865C14.3371 8.73718 13.8444 8.45484 13.3014 8.36169C12.7583 8.26858 12.1996 8.37077 11.7246 8.64994C11.2496 8.92915 10.8888 9.36753 10.706 9.88724C10.4921 10.495 9.82583 10.8143 9.21804 10.6005C8.61044 10.3866 8.2912 9.72076 8.50483 9.11307C8.87054 8.07345 9.59237 7.1963 10.5425 6.6379Z"
                                fill="currentColor" />
                            <path
                                d="M13.0111 17.6666C13.6554 17.6666 14.1777 18.189 14.1777 18.8333C14.1777 19.4776 13.6554 20 13.0111 20H12.9997C12.3553 20 11.833 19.4776 11.833 18.8333C11.833 18.189 12.3553 17.6666 12.9997 17.6666H13.0111Z"
                                fill="currentColor" />
                        </g>
                        <defs>
                            <clipPath id="clip0_7468_544">
                                <rect width="26" height="26" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <span class="ft-mol-toolbar__label">Ayuda</span>
                </button>
            </li>

            <!-- Pista (menu button con acciones) -->
            <li class="ft-mol-toolbar__item">
                <div
                    class="ft-mol-dropdown ft-mol-dropdown--is-list-rgt ft-mol-dropdown--has-btn-nav">
                    <button type="button"
                        class="ft-btn-nav ft-btn-nav--more-v ft-mol-dropdown__trigger" aria-haspopup="menu"
                        aria-expanded="false" id="help-actions-trigger"
                        aria-controls="help-actions-list">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="ft-mol-toolbar__icon" width="28"
                            height="28" viewBox="0 0 28 28" fill="none">
                            <path
                                d="M24.4998 14C24.4998 8.20097 19.7988 3.49996 13.9998 3.49996C8.20085 3.49996 3.49984 8.20097 3.49984 14C3.49984 19.7989 8.20085 24.5 13.9998 24.5C19.7988 24.5 24.4998 19.7989 24.4998 14ZM26.8332 14C26.8332 21.0876 21.0875 26.8333 13.9998 26.8333C6.91218 26.8333 1.1665 21.0876 1.1665 14C1.1665 6.9123 6.91218 1.16663 13.9998 1.16663C21.0875 1.16663 26.8332 6.9123 26.8332 14Z"
                                fill="currentColor" />
                            <path
                                d="M10.265 15.632V15.6315L10.2684 15.6355C10.2753 15.6442 10.289 15.6603 10.3082 15.6833C10.3469 15.7294 10.4097 15.8015 10.4951 15.8907C10.6669 16.07 10.9253 16.3135 11.2596 16.5566C11.9328 17.0462 12.8635 17.5 14.0002 17.5C15.137 17.5 16.0676 17.0462 16.7409 16.5566C17.0752 16.3135 17.3335 16.07 17.5054 15.8907C17.5908 15.8015 17.6535 15.7294 17.6922 15.6833C17.7115 15.6603 17.7251 15.6442 17.7321 15.6355L17.7344 15.6326C18.1211 15.1178 18.8518 15.0138 19.367 15.4002C19.8823 15.7868 19.9866 16.518 19.6 17.0334L18.6669 16.3333C19.5478 16.994 19.5969 17.0315 19.5994 17.034L19.5989 17.0351C19.5985 17.0356 19.5981 17.0363 19.5977 17.0368C19.5968 17.0381 19.5954 17.0393 19.5943 17.0408C19.592 17.0438 19.5895 17.0475 19.5863 17.0516C19.5798 17.0601 19.5713 17.0709 19.5613 17.0835C19.5411 17.1089 19.514 17.143 19.4798 17.1838C19.4114 17.2653 19.3145 17.3756 19.1904 17.5051C18.943 17.7632 18.5813 18.1032 18.1138 18.4433C17.1828 19.1204 15.78 19.8333 14.0002 19.8333C12.2204 19.8333 10.8176 19.1204 9.8867 18.4433C9.4191 18.1032 9.05742 17.7632 8.81004 17.5051C8.68593 17.3756 8.58905 17.2653 8.52065 17.1838C8.4864 17.143 8.4593 17.1089 8.43919 17.0835C8.42916 17.0709 8.42061 17.0601 8.41412 17.0516C8.41098 17.0475 8.40845 17.0438 8.40615 17.0408C8.405 17.0393 8.40366 17.0381 8.40273 17.0368C8.40233 17.0363 8.40196 17.0356 8.40159 17.0351L8.40102 17.034C8.40353 17.0315 8.45266 16.994 9.33356 16.3333L8.40045 17.0334C8.0139 16.518 8.11814 15.7868 8.63344 15.4002C9.14833 15.014 9.87802 15.1181 10.265 15.632Z"
                                fill="currentColor" />
                            <path
                                d="M10.5073 9C11.3317 9 12 9.67157 12 10.5C12 11.3284 11.3317 12 10.5073 12H10.4927C9.66831 12 9 11.3284 9 10.5C9 9.67157 9.66831 9 10.4927 9H10.5073Z"
                                fill="currentColor" />
                            <path
                                d="M19 10C19.5523 10 20 10.4477 20 11C20 11.5523 19.5523 12 19 12H17C16.4477 12 16 11.5523 16 11C16 10.4477 16.4477 10 17 10H19Z"
                                fill="currentColor" />
                        </svg>

                        <span class="ft-btn-nav__text">Pista</span>
                        <span class="ft-btn-nav__icon"
                            aria-hidden="true"></span>
                    </button>

                    <ul class="ft-mol-dropdown__list" role="menu" hidden
                        id="help-actions-list"
                        aria-labelledby="help-actions-trigger">
                        <li class="ft-mol-dropdown__item" role="none">
                            <button type="button"
                                class="ft-mol-dropdown__link"
                                role="menuitem">
                                Revelar letra
                                <span class="ft-tag ft-tag--sm">3/3
                                    disponibles</span>
                            </button>
                        </li>
                        <li class="ft-mol-dropdown__item" role="none">
                            <button type="button"
                                class="ft-mol-dropdown__link"
                                role="menuitem" disabled>
                                Revelar palabra
                                <span class="ft-tag ft-tag--sm">3/3
                                    disponibles</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </li>

            <!-- Reiniciar (botón simple) -->
            <li class="ft-mol-toolbar__item">
                <button type="button" class="ft-mol-toolbar__button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20"
                        height="26" class="ft-mol-toolbar__icon"
                        viewBox="0 0 31 26" fill="none">
                        <path
                            d="M0 2.9115C0 2.22114 0.559644 1.6615 1.25 1.6615C1.94036 1.6615 2.5 2.22114 2.5 2.9115V9.1615H8.75C9.44036 9.1615 10 9.72114 10 10.4115C10 11.1019 9.44036 11.6615 8.75 11.6615H1.25C0.559644 11.6615 0 11.1019 0 10.4115V2.9115Z"
                            fill="currentColor" />
                        <path
                            d="M28.5 22.4115V16.1615H22.25C21.5596 16.1615 21 15.6019 21 14.9115C21 14.2211 21.5596 13.6615 22.25 13.6615H29.75C30.4404 13.6615 31 14.2211 31 14.9115V22.4115C31 23.1019 30.4404 23.6615 29.75 23.6615C29.0596 23.6615 28.5 23.1019 28.5 22.4115Z"
                            fill="currentColor" />
                        <path
                            d="M28.8243 14.7512C29.3442 14.2784 30.1611 14.303 30.6496 14.8062C31.1381 15.3094 31.1127 16.1007 30.5928 16.5736L24.5999 22.0247C23.0624 23.5043 21.1649 24.5861 19.0818 25.1694C16.9858 25.7562 14.7704 25.8192 12.6423 25.3531C10.5141 24.887 8.54251 23.907 6.91165 22.5039C5.28077 21.1008 4.04387 19.3204 3.31598 17.3294C3.07812 16.6785 3.43005 15.9639 4.10247 15.7335C4.77499 15.5032 5.51316 15.8445 5.75114 16.4954C6.33343 18.0882 7.32319 19.5121 8.6278 20.6346C9.9325 21.7571 11.5099 22.5413 13.2124 22.9142C14.9149 23.2871 16.6872 23.2365 18.364 22.7671C20.0409 22.2976 21.5677 21.4249 22.8017 20.2298L22.8307 20.2024L28.8243 14.7512ZM11.9182 1.15363C14.0142 0.566831 16.2296 0.503793 18.3577 0.969871C20.4859 1.43596 22.4575 2.41602 24.0884 3.81906C25.7192 5.22215 26.9561 7.00259 27.684 8.99363C27.922 9.64456 27.57 10.3591 26.8975 10.5895C26.225 10.8198 25.4868 10.4785 25.2489 9.82757C24.6665 8.23483 23.6768 6.81082 22.3722 5.6884C21.0675 4.56593 19.4901 3.78168 17.7876 3.40881C16.0851 3.03595 14.3127 3.08648 12.636 3.55594C10.9591 4.02542 9.43228 4.89872 8.19829 6.09377C8.18883 6.10293 8.17903 6.11176 8.16928 6.12063L2.17566 11.5724C1.65587 12.0449 0.838849 12.0203 0.35039 11.5174C-0.138117 11.0142 -0.112725 10.2229 0.407154 9.75004L6.40014 4.2983C7.93758 2.8187 9.83515 1.73685 11.9182 1.15363Z"
                            fill="currentColor" />
                    </svg>
                    <span class="ft-mol-toolbar__label">Reiniciar</span>
                </button>
            </li>

            <!-- Resolver (botón simple) -->
            <li class="ft-mol-toolbar__item">
                <button type="button" class="ft-mol-toolbar__button">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="ft-mol-toolbar__icon" width="23" height="26"
                        viewBox="0 0 23 26" fill="none">
                        <g clip-path="url(#clip0_7468_579)">
                            <path
                                d="M20.9707 16.954C21.7684 17.7298 21.8054 17.7668 21.8066 17.7691L21.8025 17.7731C21.8007 17.7748 21.7992 17.7769 21.7973 17.7787C21.7934 17.7824 21.7886 17.7863 21.784 17.7905C21.7749 17.7989 21.7645 17.8083 21.7528 17.8186C21.7292 17.8395 21.7002 17.8644 21.6655 17.8923C21.596 17.9479 21.5039 18.016 21.3869 18.0918C21.1525 18.2438 20.8211 18.4253 20.3747 18.5989C19.4799 18.947 18.1446 19.2566 16.2354 19.2566C14.2001 19.2566 12.5186 18.5906 11.0602 18.0232C9.55907 17.4393 8.2809 16.954 6.76482 16.954C5.12262 16.954 4.09023 17.22 3.50526 17.4476C3.21174 17.5618 3.02522 17.6681 2.92664 17.732C2.87714 17.7641 2.84905 17.786 2.83994 17.7933C2.83536 17.797 2.83538 17.7973 2.83994 17.7933C2.84221 17.7913 2.84594 17.7878 2.85034 17.7838C2.85253 17.7817 2.85516 17.7796 2.85786 17.777L2.8619 17.7725L2.86421 17.7703L2.80121 17.827C2.46467 18.1086 1.99108 18.1847 1.57634 18.0176C1.13407 17.8394 0.845703 17.4196 0.845703 16.954V3.1382C0.845703 2.83286 0.970516 2.5401 1.19253 2.32419L2.02953 3.1382C1.23185 2.36244 1.19486 2.32536 1.19368 2.32306L1.19773 2.31913C1.1995 2.31743 1.20101 2.31533 1.20293 2.31351C1.20685 2.30979 1.21165 2.30594 1.21623 2.3017C1.2253 2.29328 1.23574 2.28394 1.24744 2.27359C1.27108 2.2527 1.29999 2.22777 1.33472 2.19995C1.40423 2.14428 1.49637 2.07622 1.61334 2.00038C1.84769 1.84844 2.17917 1.66694 2.62548 1.49331C3.52031 1.1452 4.85565 0.835571 6.76482 0.835571C8.80018 0.835571 10.4816 1.50164 11.94 2.06896C13.4412 2.65294 14.7193 3.1382 16.2354 3.1382C17.8776 3.1382 18.91 2.87217 19.495 2.64462C19.7885 2.53044 19.975 2.42408 20.0736 2.36017C20.1231 2.32807 20.1512 2.30619 20.1603 2.29889C20.1649 2.29486 20.1649 2.29523 20.1603 2.29889C20.158 2.3009 20.1543 2.30436 20.1499 2.30845C20.1477 2.31048 20.1451 2.31263 20.1424 2.31519L20.1383 2.31969L20.136 2.32194C20.4746 1.99446 20.9825 1.89679 21.4239 2.07459C21.8662 2.25282 22.1545 2.67259 22.1545 3.1382V16.954C22.1545 17.2593 22.0297 17.5521 21.8077 17.768L20.9707 16.954ZM6.76482 3.1382C5.12262 3.1382 4.09023 3.40424 3.50526 3.63178C3.39249 3.67565 3.29557 3.71862 3.21335 3.75827V15.1084C4.07471 14.8504 5.23558 14.6514 6.76482 14.6514C8.80018 14.6514 10.4816 15.3174 11.94 15.8848C13.4412 16.4687 14.7193 16.954 16.2354 16.954C17.8776 16.954 18.91 16.688 19.495 16.4604C19.6078 16.4165 19.7046 16.373 19.7869 16.3334V4.98323C18.9255 5.24129 17.7647 5.44083 16.2354 5.44083C14.2001 5.44083 12.5186 4.77477 11.0602 4.20744C9.55907 3.62347 8.2809 3.1382 6.76482 3.1382Z"
                                fill="currentColor" />
                            <path
                                d="M2.2998 10.0909C4.0248 8.95454 6.8998 8.57571 11.4998 10.0909C18.3998 12.3636 20.6998 10.0909 20.6998 10.0909"
                                stroke="black" stroke-width="2"
                                stroke-linecap="round" />
                            <path
                                d="M0.845703 25.0131V16.9539C0.845703 16.3181 1.37572 15.8026 2.02953 15.8026C2.68333 15.8026 3.21335 16.3181 3.21335 16.9539V25.0131C3.21335 25.649 2.68333 26.1645 2.02953 26.1645C1.37572 26.1645 0.845703 25.649 0.845703 25.0131Z"
                                fill="currentColor" />
                            <line x1="11.3501" y1="3.27271" x2="11.3501"
                                y2="16.9091" stroke="black"
                                stroke-width="2" />
                        </g>
                        <defs>
                            <clipPath id="clip0_7468_579">
                                <rect width="23" height="26" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <span class="ft-mol-toolbar__label">Resolver</span>
                </button>
            </li>
        </ul>
    </div>
    <!-- Más opciones -->
    <div class="ft-mol-toolbar__right">
        <div class="ft-mol-toolbar__more-options">
            <div
                class="ft-mol-dropdown ft-mol-dropdown--is-list-lft ft-mol-dropdown--has-btn-nav ft-mol-dropdown--has-icons">
                <button type="button"
                    class="ft-btn-nav ft-btn-nav--more-v ft-mol-dropdown__trigger" aria-haspopup="listbox"
                    aria-expanded="false" id="more-nav-trigger"
                    aria-controls="more-nav-list">
                    <span class="ft-btn-nav__text">Desplegar más
                        opciones</span>
                    <span class="ft-btn-nav__icon"
                        aria-hidden="true"></span>
                </button>

                <ul class="ft-mol-dropdown__list" hidden id="more-nav-list"
                    aria-labelledby="more-nav-trigger">
                    <li class="ft-mol-dropdown__item">
                        <a class="ft-mol-dropdown__link" href="#"
                            target="_self" title="Archivo">
                            <svg width="18" height="19" viewBox="0 0 18 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="ft-mol-dropdown__icon"
                                aria-hidden="true" focusable="false">
                                <path
                                    d="M3.24 13.64C3.24 13.5406 3.32059 13.46 3.42 13.46H4.86C4.95941 13.46 5.04 13.5406 5.04 13.64V15.08C5.04 15.1794 4.95941 15.26 4.86 15.26H3.42C3.32059 15.26 3.24 15.1794 3.24 15.08V13.64Z"
                                    fill="currentColor" />
                                <path
                                    d="M6.48 13.64C6.48 13.5406 6.56059 13.46 6.66 13.46H8.1C8.19941 13.46 8.28 13.5406 8.28 13.64V15.08C8.28 15.1794 8.19941 15.26 8.1 15.26H6.66C6.56059 15.26 6.48 15.1794 6.48 15.08V13.64Z"
                                    fill="currentColor" />
                                <path
                                    d="M9.72 13.64C9.72 13.5406 9.80059 13.46 9.9 13.46H11.34C11.4394 13.46 11.52 13.5406 11.52 13.64V15.08C11.52 15.1794 11.4394 15.26 11.34 15.26H9.9C9.80059 15.26 9.72 15.1794 9.72 15.08V13.64Z"
                                    fill="currentColor" />
                                <path
                                    d="M12.96 13.64C12.96 13.5406 13.0406 13.46 13.14 13.46H14.58C14.6794 13.46 14.76 13.5406 14.76 13.64V15.08C14.76 15.1794 14.6794 15.26 14.58 15.26H13.14C13.0406 15.26 12.96 15.1794 12.96 15.08V13.64Z"
                                    fill="currentColor" />
                                <path
                                    d="M6.48 10.4C6.48 10.3006 6.56059 10.22 6.66 10.22H8.1C8.19941 10.22 8.28 10.3006 8.28 10.4V11.84C8.28 11.9394 8.19941 12.02 8.1 12.02H6.66C6.56059 12.02 6.48 11.9394 6.48 11.84V10.4Z"
                                    fill="currentColor" />
                                <path
                                    d="M9.72 10.4C9.72 10.3006 9.80059 10.22 9.9 10.22H11.34C11.4394 10.22 11.52 10.3006 11.52 10.4V11.84C11.52 11.9394 11.4394 12.02 11.34 12.02H9.9C9.80059 12.02 9.72 11.9394 9.72 11.84V10.4Z"
                                    fill="currentColor" />
                                <path
                                    d="M12.96 10.4C12.96 10.3006 13.0406 10.22 13.14 10.22H14.58C14.6794 10.22 14.76 10.3006 14.76 10.4V11.84C14.76 11.9394 14.6794 12.02 14.58 12.02H13.14C13.0406 12.02 12.96 11.9394 12.96 11.84V10.4Z"
                                    fill="currentColor" />
                                <path fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M5.22 0.5C5.81647 0.5 6.3 0.983533 6.3 1.58V3.92C6.3 3.93156 6.29982 3.94307 6.29946 3.95454H11.5205C11.5202 3.94307 11.52 3.93156 11.52 3.92V1.58C11.52 0.983533 12.0035 0.5 12.6 0.5C13.1965 0.5 13.68 0.983533 13.68 1.58V3.92C13.68 3.93156 13.6798 3.94307 13.6795 3.95454H17.1C17.5971 3.95454 18 4.35749 18 4.85454V17.6C18 18.0971 17.5971 18.5 17.1 18.5H0.9C0.402944 18.5 0 18.0971 0 17.6V4.85454C0 4.35749 0.402944 3.95454 0.9 3.95454H4.14054C4.14018 3.94307 4.14 3.93156 4.14 3.92V1.58C4.14 0.983533 4.62353 0.5 5.22 0.5ZM1.26 5.21454V7.16H16.74V5.21454H1.26ZM1.26 17.24V8.6H16.74V17.24H1.26Z"
                                    fill="currentColor" />
                            </svg>
                            Archivo
                        </a>
                    </li>
                    <li class="ft-mol-dropdown__item">
                        <details class="ft-mol-dropdown__details">
                            <summary class="ft-mol-dropdown__summary">
                                <span class="ft-mol-dropdown__title"></span>
                                <svg width="18" height="19"
                                    viewBox="0 0 18 19" fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="ft-mol-dropdown__icon"
                                    aria-hidden="true" focusable="false">
                                    <path fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M8.74732 1.67757L8.21794 3.71857C8.14737 3.99066 7.95694 4.2159 7.70039 4.33075L6.41295 4.90709C6.11849 5.03891 5.77662 5.00782 5.51076 4.82506L3.94614 3.74944L3.39204 4.28449L4.32386 5.96246C4.45339 6.1957 4.47593 6.47351 4.38569 6.72458L3.87939 8.13331C3.77196 8.43222 3.51872 8.65513 3.20859 8.72376L1.17757 9.17319V9.79961L3.27381 10.439C3.55176 10.5238 3.77373 10.7342 3.87321 11.0072L4.41539 12.4953C4.50773 12.7488 4.48486 13.0299 4.35277 13.2651L3.3975 14.9661L3.85168 15.3903L5.55054 14.2765C5.82107 14.0992 6.16458 14.076 6.45649 14.2154L7.75664 14.8362C7.99509 14.9501 8.17347 15.1605 8.24682 15.4143L8.79817 17.3224H9.46382L9.82951 15.4853C9.88718 15.1956 10.0797 14.9508 10.3477 14.8266L11.6807 14.2084C11.967 14.0756 12.3012 14.098 12.5673 14.2676L14.3202 15.385L14.7153 14.9881L13.7063 13.2782C13.5657 13.0399 13.5391 12.7512 13.6339 12.4912L14.1745 11.0073C14.274 10.7341 14.4962 10.5236 14.7743 10.439L16.8224 9.81537V9.13185L14.847 8.72285C14.5368 8.65863 14.281 8.44018 14.169 8.14385L13.6377 6.73759C13.5405 6.48025 13.5628 6.193 13.6986 5.95377L14.6873 4.21224L14.2132 3.7426L12.5039 4.84324C12.241 5.01252 11.9103 5.03756 11.6249 4.9098L10.3436 4.33618C10.0683 4.21293 9.87031 3.96322 9.81314 3.66705L9.42912 1.67757H8.74732ZM7.65649 1.19294C7.76232 0.784915 8.13056 0.5 8.55209 0.5H9.63741C10.0808 0.5 10.4618 0.814537 10.5459 1.24988L10.9445 3.31501L11.9813 3.77915L13.746 2.64287C14.1108 2.40798 14.5898 2.45813 14.898 2.76347L15.6532 3.51156C15.9501 3.80566 16.013 4.26226 15.8067 4.62568L14.7811 6.43216L15.2216 7.59786L17.2624 8.02039C17.6919 8.10933 18 8.48772 18 8.92641V10.0023C18 10.4095 17.7338 10.7688 17.3443 10.8874L15.2378 11.5288L14.7811 12.7824L15.8286 14.5576C16.0426 14.9204 15.9846 15.382 15.6875 15.6805L15.0116 16.3597C14.7049 16.6678 14.225 16.7209 13.8584 16.4872L12.0508 15.3348L10.9594 15.8409L10.5783 17.7554C10.4921 18.1883 10.1122 18.5 9.67088 18.5H8.60843C8.19636 18.5 7.83395 18.2275 7.71956 17.8316L7.14698 15.85L6.07731 15.3393L4.33156 16.4837C3.97484 16.7176 3.50447 16.6773 3.19274 16.3861L2.44893 15.6914C2.13729 15.4004 2.06495 14.934 2.27376 14.5622L3.26929 12.7896L2.80987 11.5286L0.655302 10.8714C0.265989 10.7527 0 10.3935 0 9.98645V8.97059C0 8.53663 0.301614 8.16097 0.725329 8.06721L2.81829 7.60407L3.2388 6.43406L2.26847 4.68677C2.06503 4.32042 2.13321 3.86308 2.43466 3.57199L3.27649 2.75911C3.59296 2.45353 4.08082 2.41304 4.44334 2.66225L6.06112 3.77441L7.10854 3.30552L7.65649 1.19294Z"
                                        fill="currentColor" />
                                    <path fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M9 11.6869C10.2078 11.6869 11.1869 10.7078 11.1869 9.5C11.1869 8.2922 10.2078 7.31308 9 7.31308C7.7922 7.31308 6.81308 8.2922 6.81308 9.5C6.81308 10.7078 7.7922 11.6869 9 11.6869ZM9 12.8645C10.8582 12.8645 12.3645 11.3582 12.3645 9.5C12.3645 7.64185 10.8582 6.13551 9 6.13551C7.14185 6.13551 5.63551 7.64185 5.63551 9.5C5.63551 11.3582 7.14185 12.8645 9 12.8645Z"
                                        fill="currentColor" />
                                </svg>

                                Configuración
                                </span>
                                <span class="ft-mol-dropdown__icon"
                                    aria-hidden="true"></span>
                            </summary>

                            <ul class="ft-mol-dropdown__details-list"
                                role="list">
                                <li class="ft-mol-dropdown__details-item">
                                    Modo oscuro
                                    <div
                                        class="ft-switch ft-switch--darkmode">
                                        <input type="checkbox"
                                            id="toggleDarkmode"
                                            class="ft-switch__checkbox">
                                        <label for="toggleDarkmode"
                                            class="ft-switch__label">
                                            <span
                                                class="ft-switch__inner"></span>
                                            <span
                                                class="ft-switch__switch"></span>
                                        </label>
                                    </div>
                                </li>
                                <li class="ft-mol-dropdown__details-item">
                                    Modo contraste
                                    <div
                                        class="ft-switch ft-switch--contrastmode">
                                        <input type="checkbox"
                                            id="toggleContrastmode"
                                            class="ft-switch__checkbox">
                                        <label for="toggleContrastmode"
                                            class="ft-switch__label">
                                            <span
                                                class="ft-switch__inner"></span>
                                            <span
                                                class="ft-switch__switch"></span>
                                        </label>
                                    </div>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li class="ft-mol-dropdown__item">
                        <a class="ft-mol-dropdown__link" href="#"
                            target="_self" title="Compartir">
                            <svg width="18" height="19" viewBox="0 0 18 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="ft-mol-dropdown__icon"
                                aria-hidden="true" focusable="false">
                                <path fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M13.9619 1.713C12.9012 1.713 12.0413 2.57287 12.0413 3.63357C12.0413 3.93832 12.1123 4.2265 12.2386 4.48246C12.2695 4.51555 12.2972 4.55266 12.3209 4.59356C12.3436 4.63278 12.3613 4.67348 12.3744 4.71496C12.7202 5.22158 13.3022 5.55415 13.9619 5.55415C15.0226 5.55415 15.8825 4.69428 15.8825 3.63357C15.8825 2.57287 15.0226 1.713 13.9619 1.713ZM11.6104 5.70485C12.1846 6.35623 13.0253 6.76715 13.9619 6.76715C15.6925 6.76715 17.0955 5.3642 17.0955 3.63357C17.0955 1.90295 15.6925 0.5 13.9619 0.5C12.2313 0.5 10.8283 1.90295 10.8283 3.63357C10.8283 3.99197 10.8885 4.33632 10.9993 4.65706L6.20503 7.42873C5.63082 6.77734 4.79018 6.36643 3.85357 6.36643C2.12295 6.36643 0.72 7.76937 0.72 9.5C0.72 11.2306 2.12295 12.6336 3.85357 12.6336C4.79018 12.6336 5.63082 12.2227 6.20503 11.5713L10.9993 14.3429C10.8885 14.6637 10.8283 15.008 10.8283 15.3664C10.8283 17.0971 12.2313 18.5 13.9619 18.5C15.6925 18.5 17.0955 17.0971 17.0955 15.3664C17.0955 13.6358 15.6925 12.2329 13.9619 12.2329C13.0253 12.2329 12.1846 12.6438 11.6104 13.2952L6.81619 10.5235C6.92698 10.2027 6.98715 9.8584 6.98715 9.5C6.98715 9.1416 6.92698 8.79726 6.81619 8.47651L11.6104 5.70485ZM5.441 8.41861C5.45411 8.46009 5.4719 8.5008 5.49457 8.54002C5.51822 8.58092 5.54591 8.61802 5.57684 8.65111C5.70317 8.90708 5.77415 9.19525 5.77415 9.5C5.77415 9.80475 5.70317 10.0929 5.57684 10.3489C5.54591 10.382 5.51822 10.4191 5.49457 10.46C5.4719 10.4992 5.45411 10.5399 5.44101 10.5814C5.09522 11.088 4.51323 11.4206 3.85357 11.4206C2.79287 11.4206 1.933 10.5607 1.933 9.5C1.933 8.43929 2.79287 7.57942 3.85357 7.57942C4.51323 7.57942 5.09522 7.91199 5.441 8.41861ZM12.2386 14.5175C12.2695 14.4844 12.2972 14.4473 12.3209 14.4064C12.3436 14.3672 12.3613 14.3265 12.3744 14.285C12.7202 13.7784 13.3022 13.4458 13.9619 13.4458C15.0226 13.4458 15.8825 14.3057 15.8825 15.3664C15.8825 16.4271 15.0226 17.287 13.9619 17.287C12.9012 17.287 12.0413 16.4271 12.0413 15.3664C12.0413 15.0617 12.1123 14.7735 12.2386 14.5175Z"
                                    fill="currentColor" />
                            </svg>
                            Compartir
                        </a>
                    </li>
                </ul>
            </div>
        </div>

    </div>
    <!-- Capa absoluta -->
    <div class="ft-mol-toolbar__layer">
        <div class="ft-timer ft-timer--inline"
            data-id="highlightAtomsTimerInline">
            <div class="ft-timer__container">
                <h2 class="ft-timer__title">Contador de tiempo</h2>
                <div class="ft-timer__display" role="status"
                    aria-live="polite" aria-label="Tiempo transcurrido">
                    <span class="ft-timer__counter"
                        aria-label="Minutos">00</span><span
                        class="ft-timer__counter">:</span>
                    <span class="ft-timer__counter"
                        aria-label="Segundos">00</span>
                </div>


                <button class="ft-timer__controls ft-timer__controlsInit"
                    id="startBtn"
                    aria-label="Iniciar contador">Iniciar</button>
                <button class="ft-timer__controls ft-timer__controlsPause"
                    id="pauseBtn" aria-label="Pausar contador"
                    disabled>Pausar</button>


                <div class="ft-timer__txt" id="screenReaderAnnouncement"
                    aria-live="assertive"></div>
            </div>






            <!-- code highlighted: Aquí muestra el código para el desarrollador // data-id deben coincidir -->
            <div class="code-container" data-showroom-view="develop"
                data-id="highlightAtomsTimerInline">
                <pre><code class="html"></code></pre>
            </div>
            <!-- end // showroom: code highlighted -->
        </div>
    </div>
    <!-- end // MOL: toolbar -->
</div>`;

    /* ▼ SINGLE SOURCE OF TRUTH — temas de juego (.ft-mol-toolbar--[juego]) de _toolbar.scss ▼ */
    const DATA = {
        themes: [
            ["ft-mol-toolbar--pangramax", "Pangramax"],
            ["ft-mol-toolbar--sudoku", "Sudoku"],
            ["ft-mol-toolbar--porra", "Porra"],
            ["ft-mol-toolbar--wordle", "Wordle"],
            ["ft-mol-toolbar--sopa", "Sopa"],
            ["ft-mol-toolbar--crucigrama", "Crucigrama"],
            ["ft-mol-toolbar--saltaminas", "Saltaminas"],
            ["", "sin tema"]
        ]
    };

    /* ─── BASE — .ft-mol-toolbar ─── */
    const baseArgTypes = [
        { key: "theme", control: "select", desc: "Tema de juego (.ft-mol-toolbar--[juego]; tiñe hover y etiquetas).", options: DATA.themes }
    ];
    const baseArgs = { theme: "ft-mol-toolbar--pangramax" };

    function live(a) {
        // esc() defensivo aunque el valor venga del select (clases reales del DATA).
        const theme = a.theme ? " " + esc(a.theme) : "";
        return MARKUP.replace("%%THEME%%", theme);
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Toolbar</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-toolbar</code>): barra de acciones de un pasatiempo — botones simples, menús desplegables y una capa con timer, con tema de juego.</p>

        <div class="cb-callout"><strong>Estado por defecto.</strong> Los menús (<code>.ft-mol-dropdown</code>) y el timer los opera un JS consumidor; aquí se ven en su estado inicial (menús cerrados con <code>[hidden]</code>, timer <code>00:00</code>). El markup es verbatim del showroom.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca + colores de juego</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/toolbar.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-mol-dropdown</code> · <code>.ft-btn-nav</code> · <code>.ft-tag</code> · <code>.ft-timer</code></td><td>Componentes compuestos</td><td>Menús, etiquetas y timer</td></tr>
                <tr><td><code>fortty-js-dropdown-*.js</code> + JS del timer</td><td>JavaScript</td><td>Abrir menús · contar tiempo</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Temas de juego</h2>
        <p>Modificador de bloque <code>.ft-mol-toolbar--[juego]</code>: <code>--pangramax</code>, <code>--sudoku</code>, <code>--porra</code>, <code>--wordle</code>, <code>--sopa</code>, <code>--crucigrama</code>, <code>--saltaminas</code> (tiñen el hover y el color de las etiquetas).</p>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-toolbar</code></td></tr>
                <tr><td>Lista</td><td><code>.ft-mol-toolbar__list</code> &gt; <code>__item</code> (+ <code>__itemBack</code>)</td></tr>
                <tr><td>Botón</td><td><code>.ft-mol-toolbar__button</code> &gt; <code>__icon</code> + <code>__label</code></td></tr>
                <tr><td>Menú</td><td><code>.ft-mol-dropdown</code> &gt; <code>__trigger</code> + <code>__list</code></td></tr>
                <tr><td>Más opciones</td><td><code>.ft-mol-toolbar__right</code> &gt; <code>__more-options</code></td></tr>
                <tr><td>Capa / timer</td><td><code>.ft-mol-toolbar__layer</code> &gt; <code>.ft-timer--inline</code></td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas (<code>toolbar-[marca].scss</code>). Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/toolbar/_toolbar.scss</code> · markup: <code>fourty/molecules/molecule-toolbar.html</code></p>
    </div>`;

    const TB = {
        id: "toolbar",
        name: "Toolbar",
        group: "Molecules",
        overview,
        stories: [
            // full: la barra reparte sus ítems a lo ancho (justify-content: space-between).
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(TB);

    /* Markup original (HTML plano editable por el front) en toolbar.html → subgrupo "Markup". */
    window.SB.loadMarkup(TB, document.currentScript && document.currentScript.src, { full: true });
})();
