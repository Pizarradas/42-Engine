/*
 * 42DS Figma local plugin
 * Source: fourty/organisms/organism-footer.html#footerMediaLite
 * Component: Footer / Media Lite / EP
 */

async function main() {
  const TOKENS = {
    black: { r: 17 / 255, g: 17 / 255, b: 17 / 255 },
    white: { r: 1, g: 1, b: 1 },
    epRed: { r: 228 / 255, g: 13 / 255, b: 44 / 255 },
    text: { r: 40 / 255, g: 47 / 255, b: 56 / 255 },
    muted: { r: 85 / 255, g: 85 / 255, b: 85 / 255 },
    border: { r: 229 / 255, g: 229 / 255, b: 229 / 255 },
    borderLight: { r: 240 / 255, g: 240 / 255, b: 240 / 255 },
    metaBg: { r: 245 / 255, g: 245 / 255, b: 245 / 255 },
    facebook: { r: 58 / 255, g: 87 / 255, b: 149 / 255 },
    x: { r: 0, g: 0, b: 0 },
    instagram: { r: 225 / 255, g: 27 / 255, b: 126 / 255 },
    arrow: { r: 128 / 255, g: 128 / 255, b: 128 / 255 },
  };

  const EP_LOGO_SVG = '<svg width="372" height="60" viewBox="0 0 372 60" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_152_32)"><path d="M358.7 48.1001C356.5 50.5001 353.6 51.8001 350 51.8001C346.5 51.8001 343.5 50.5001 341.3 48.0001C339 45.5001 337.9 42.4001 337.9 38.9001C337.9 35.4001 339 32.4001 341.2 30.0001C343.5 27.6001 346.4 26.3001 349.9 26.3001C353.4 26.3001 356.4 27.5001 358.6 30.0001C360.9 32.4001 362 35.5001 362 39.1001C361.9 42.5001 360.8 45.5001 358.7 48.1001ZM364.9 24.1001C360.7 20.1001 355.8 18.1001 350 18.1001C344.1 18.1001 339.1 20.1001 334.9 24.1001C330.7 28.1001 328.6 33.1001 328.6 39.0001C328.6 44.9001 330.6 49.9001 334.8 53.9001C339 57.9001 344 59.9001 349.9 59.9001C355.9 59.9001 360.8 57.9001 364.9 53.9001C369.1 49.8001 371.1 44.8001 371.1 38.9001C371.1 33.0001 369 28.1001 364.9 24.1001ZM212.1 48.1001C209.9 50.5001 207 51.8001 203.5 51.8001C200 51.8001 197 50.5001 194.8 48.0001C192.5 45.5001 191.4 42.4001 191.4 38.9001C191.4 35.4001 192.5 32.4001 194.7 29.9001C197 27.5001 199.9 26.3001 203.4 26.3001C206.9 26.3001 209.8 27.5001 212 30.0001C214.3 32.4001 215.4 35.5001 215.4 39.1001C215.4 42.5001 214.3 45.5001 212.1 48.1001ZM203.5 18.1001C197.5 18.1001 192.5 20.1001 188.4 24.1001C184.2 28.1001 182.1 33.1001 182.1 39.0001C182.1 44.9001 184.2 49.9001 188.4 53.9001C192.6 57.9001 197.6 59.9001 203.5 59.9001C209.5 59.9001 214.4 57.9001 218.5 53.9001C222.7 49.8001 224.7 44.8001 224.7 38.9001C224.7 33.0001 222.7 28.1001 218.5 24.1001C214.3 20.1001 209.3 18.1001 203.5 18.1001ZM256.2 48.1001C254 50.5001 251.1 51.7001 247.5 51.7001C243.9 51.7001 241 50.5001 238.8 48.1001C236.6 45.7001 235.5 42.6001 235.5 39.0001C235.5 35.5001 236.6 32.5001 238.8 29.9001C241.1 27.5001 244 26.2001 247.5 26.2001C251 26.2001 253.9 27.4001 256.2 29.9001C258.5 32.3001 259.6 35.4001 259.6 39.0001C259.6 42.5001 258.5 45.5001 256.2 48.1001ZM259.4 24.7001C258 22.5001 256.1 20.9001 253.4 19.9001C250.9 18.8001 248.5 18.3001 246.3 18.3001C240.3 18.3001 235.4 20.4001 231.8 24.7001C228.2 29.0001 226.3 33.8001 226.3 39.2001C226.3 44.8001 228.2 49.7001 231.9 53.8001C235.7 58.0001 240.4 60.0001 246 60.0001C248.1 60.0001 250.5 59.5001 253.3 58.4001C256.1 57.3001 258.1 55.5001 259.6 53.2001V59.5001H268.3V0.200053H259.3V24.7001H259.4ZM169.3 1.80005C166.9 4.20005 166.9 7.80005 169.3 10.1001C171.7 12.4001 175.3 12.5001 177.6 10.1001C179.9 7.70005 180 4.10005 177.6 1.80005C175.2 -0.499947 171.7 -0.599947 169.3 1.80005ZM309.6 51.8001C306.2 51.8001 303.3 50.6001 301.1 48.2001C298.8 45.8001 297.7 42.7001 297.7 39.0001C297.7 35.3001 298.8 32.3001 301.1 29.9001C303.5 27.5001 306.2 26.4001 309.5 26.4001C314.6 26.4001 318.1 28.8001 319.8 33.7001L327.5 30.3001C325.1 23.1001 318.4 18.2001 309.5 18.2001C303.5 18.2001 298.6 20.2001 294.6 24.4001C290.6 28.6001 288.6 33.5001 288.6 39.1001C288.6 45.1001 290.6 50.0001 294.6 54.0001C298.6 58.0001 303.6 60.0001 309.5 60.0001C314.4 60.0001 318.4 58.8001 321.5 56.4001C324.6 54.0001 326.8 51.1001 327.9 47.9001L320.1 44.5001C318.1 49.2001 314.6 51.8001 309.6 51.8001ZM169 59.2001H178V19.0001H169V59.2001ZM275.5 59.2001H284.5V19.0001H275.5V59.2001ZM275.8 1.80005C273.4 4.20005 273.4 7.80005 275.8 10.1001C278.2 12.5001 281.8 12.5001 284.1 10.1001C286.4 7.70005 286.5 4.10005 284.1 1.80005C281.7 -0.499947 278.1 -0.599947 275.8 1.80005ZM110.5 34.9001C111.3 29.4001 115.6 25.8001 121.1 25.8001C126.8 25.8001 131.3 29.2001 131.6 34.9001H110.5ZM121.1 18.1001C115.3 18.1001 110.5 20.1001 106.6 24.2001C102.7 28.3001 100.8 33.2001 100.8 39.0001C100.8 45.0001 102.8 50.0001 106.8 54.0001C110.9 58.0001 115.9 60.0001 121.9 60.0001C129.2 60.0001 135.7 56.6001 139 50.3001L132.5 46.0001C130.3 50.2001 126.7 52.3001 121.6 52.3001C118.5 52.3001 115.8 51.3001 113.4 49.4001C111 47.4001 109.9 44.9001 109.8 41.9001H140.3C140.4 41.2001 140.5 40.3001 140.5 39.1001C140.5 32.8001 138.8 27.8001 135.3 24.0001C132 20.0001 127.2 18.1001 121.1 18.1001ZM9.6 34.9001C10.4 29.4001 14.7 25.8001 20.2 25.8001C25.9 25.8001 30.4 29.2001 30.7 34.9001H9.6ZM20.3 18.1001C14.5 18.1001 9.7 20.1001 5.8 24.2001C1.9 28.3001 0 33.2001 0 39.0001C0 45.0001 2 50.0001 6 54.0001C10.1 58.0001 15.1 60.0001 21.1 60.0001C28.4 60.0001 34.9 56.6001 38.2 50.3001L31.8 46.0001C29.6 50.2001 26 52.3001 20.9 52.3001C17.8 52.3001 15.1 51.3001 12.7 49.4001C10.3 47.4001 9.2 44.9001 9.1 41.9001H39.6C39.7 41.2001 39.8 40.3001 39.8 39.1001C39.8 32.8001 38.1 27.8001 34.6 24.0001C31.2 20.0001 26.4 18.1001 20.3 18.1001ZM44.3 59.2001H53.3V0.200053H44.3V59.2001ZM153.8 25.4001V19.0001H145V59.3001H154V38.8001C154 31.8001 157.6 27.8001 164.5 27.8001C165.5 27.8001 166.3 27.9001 167 28.0001V18.8001C166.5 18.6001 165.8 18.6001 164.8 18.6001C160 18.6001 156.3 20.9001 153.8 25.4001ZM216.9 0.200053H206L198.9 12.1001H206.7L216.9 0.200053ZM80.6 28.8001H69.8V8.80005H80.6C85 8.80005 88 9.80005 89.9 11.7001C91.8 13.7001 92.7 16.0001 92.7 18.7001C92.7 24.2001 88.8 28.8001 80.6 28.8001ZM96.8 5.50005C93.4 2.00005 88.3 0.100053 81.4 0.100053H60.6V59.1001H69.8V37.4001H80.3C87.2 37.4001 92.5 35.6001 96.3 32.0001C100.1 28.4001 102.1 23.8001 102.1 18.5001C102.1 13.5001 100.4 9.10005 96.8 5.50005Z" fill="#E40D2C"/></g><defs><clipPath id="clip0_152_32"><rect width="371.1" height="60" fill="white"/></clipPath></defs></svg>';

  const DESKTOP_WIDTH = 1180;
  const DESKTOP_CONTENT = 980;
  const MOBILE_WIDTH = 418;
  const MOBILE_CONTENT = 386;
  const LEGAL = [
    "Qui\u00e9nes somos",
    "Contacto",
    "RSS",
    "Mapa del sitio",
    "Publicidad",
    "Aviso legal",
    "Pol\u00edtica de privacidad y cookies",
    "Preferencias de privacidad",
  ];

  const fonts = await figma.listAvailableFontsAsync();
  const hasFont = (family, style) =>
    fonts.some((font) => font.fontName.family === family && font.fontName.style === style);
  const regularFont = hasFont("Inter", "Regular")
    ? { family: "Inter", style: "Regular" }
    : { family: "Arial", style: "Regular" };
  const boldFont = hasFont("Inter", "Bold")
    ? { family: "Inter", style: "Bold" }
    : { family: "Arial", style: "Bold" };

  await figma.loadFontAsync(regularFont);
  await figma.loadFontAsync(boldFont);

  function solid(color) {
    return [{ type: "SOLID", color }];
  }

  function frame(name, width, direction, gap, padding) {
    const node = figma.createFrame();
    node.name = name;
    node.resize(width, 1);
    node.fills = [];
    node.clipsContent = false;
    node.layoutMode = direction;
    node.itemSpacing = gap;
    node.paddingTop = padding[0];
    node.paddingRight = padding[1];
    node.paddingBottom = padding[2];
    node.paddingLeft = padding[3];
    if (direction === "VERTICAL") {
      node.primaryAxisSizingMode = "AUTO";
      node.counterAxisSizingMode = "FIXED";
    } else {
      node.primaryAxisSizingMode = "FIXED";
      node.counterAxisSizingMode = "AUTO";
    }
    return node;
  }

  function text(name, characters, size, color, weight, width) {
    const node = figma.createText();
    node.name = name;
    node.fontName = weight === "bold" ? boldFont : regularFont;
    node.characters = characters;
    node.fontSize = size;
    node.lineHeight = { unit: "PIXELS", value: Math.round(size * 1.32) };
    node.fills = solid(color);
    node.textAutoResize = width ? "HEIGHT" : "WIDTH_AND_HEIGHT";
    if (width) node.resize(width, node.height);
    return node;
  }

  function divider(name, width) {
    const node = figma.createRectangle();
    node.name = name;
    node.resize(width, 1);
    node.fills = solid(TOKENS.border);
    return node;
  }

  function createLogo() {
    const wrap = frame("ft-org-footer__logo", 190, "VERTICAL", 0, [0, 0, 0, 0]);
    wrap.primaryAxisAlignItems = "CENTER";
    wrap.counterAxisAlignItems = "CENTER";
    const svg = figma.createNodeFromSvg(EP_LOGO_SVG);
    svg.name = "logoEpColor.svg";
    svg.resize(190, 31);
    wrap.appendChild(svg);
    return wrap;
  }

  function socialIcon(name, glyph, color) {
    const node = frame(`ft-org-footer__rrss-icon--${name}`, 28, "HORIZONTAL", 0, [0, 0, 0, 0]);
    node.resize(28, 28);
    node.primaryAxisSizingMode = "FIXED";
    node.counterAxisSizingMode = "FIXED";
    node.primaryAxisAlignItems = "CENTER";
    node.counterAxisAlignItems = "CENTER";
    node.cornerRadius = 14;
    node.fills = solid(color);
    node.appendChild(text("glyph", glyph, 13, TOKENS.white, "bold"));
    return node;
  }

  function top(width, contentWidth) {
    const section = frame("ft-org-footer__top", width, "VERTICAL", 14, [18, 0, 18, 0]);
    section.primaryAxisAlignItems = "CENTER";
    section.counterAxisAlignItems = "CENTER";

    section.appendChild(createLogo());

    const rrss = frame("ft-org-footer__rrss-list", contentWidth, "HORIZONTAL", 15, [0, 0, 0, 0]);
    rrss.primaryAxisAlignItems = "CENTER";
    rrss.counterAxisAlignItems = "CENTER";
    rrss.appendChild(socialIcon("facebook", "f", TOKENS.facebook));
    rrss.appendChild(socialIcon("twitter", "X", TOKENS.x));
    rrss.appendChild(socialIcon("instagram", "◎", TOKENS.instagram));
    section.appendChild(rrss);
    return section;
  }

  function accordionLabel(label, open, contentWidth) {
    const row = frame(`ft-org-footer__accordion-trigger / ${label}`, contentWidth, "HORIZONTAL", 4, [4, 0, 4, 0]);
    row.primaryAxisAlignItems = "CENTER";
    row.counterAxisAlignItems = "CENTER";
    row.appendChild(text("summary", label, 14, TOKENS.text, open ? "bold" : "regular"));
    row.appendChild(text("chevron", open ? "^" : "v", 14, TOKENS.muted, "regular"));
    return row;
  }

  function pubPanel(contentWidth) {
    const panel = frame("ft-org-footer__accordion-panel / publicidad", contentWidth, "VERTICAL", 0, [8, 0, 4, 0]);
    panel.primaryAxisAlignItems = "CENTER";
    panel.counterAxisAlignItems = "CENTER";
    const logo = frame("ft-org-footer__pub-banner-img", 80, "VERTICAL", 0, [6, 8, 6, 8]);
    logo.fills = solid(TOKENS.metaBg);
    logo.strokes = solid(TOKENS.borderLight);
    logo.strokeWeight = 1;
    logo.primaryAxisAlignItems = "CENTER";
    logo.counterAxisAlignItems = "CENTER";
    logo.appendChild(text("Prensa Iberica 360", "PI 360", 11, TOKENS.muted, "bold"));
    panel.appendChild(logo);
    return panel;
  }

  function brandRow(label, width) {
    const item = frame(`ft-org-footer__brand-item / ${label}`, width, "VERTICAL", 0, [0, 0, 0, 0]);
    const line = figma.createRectangle();
    line.name = "item-border";
    line.resize(width, 1);
    line.fills = solid(TOKENS.borderLight);
    item.appendChild(line);

    const link = frame("ft-org-footer__brand-link", width, "HORIZONTAL", 0, [8, 0, 8, 0]);
    link.primaryAxisAlignItems = "SPACE_BETWEEN";
    link.counterAxisAlignItems = "CENTER";
    link.appendChild(text("label", label, 14, TOKENS.black, "regular"));
    link.appendChild(text("arrow", ">", 18, TOKENS.arrow, "regular"));
    item.appendChild(link);
    return item;
  }

  function brandGroupDesktop(title, first, last) {
    const group = frame(`ft-org-footer__brand-group / ${title}`, DESKTOP_CONTENT, "VERTICAL", 8, [14, 0, 18, 0]);
    group.appendChild(text("ft-org-footer__brand-group-title", title.toUpperCase(), 16, TOKENS.text, "bold"));

    const list = frame("ft-org-footer__brand-list / desktop grid", DESKTOP_CONTENT, "VERTICAL", 0, [0, 0, 0, 0]);
    const colWidth = 306;
    for (let i = first; i <= last; i += 3) {
      const row = frame("grid-row", DESKTOP_CONTENT, "HORIZONTAL", 20, [0, 0, 0, 0]);
      row.primaryAxisAlignItems = "MIN";
      row.counterAxisAlignItems = "MIN";
      for (let j = i; j < i + 3 && j <= last; j += 1) {
        row.appendChild(brandRow(`Brand name ${j}`, colWidth));
      }
      list.appendChild(row);
    }
    group.appendChild(list);
    return group;
  }

  function brandGroupsDesktop() {
    const groups = frame("ft-org-footer__brand-groups", DESKTOP_CONTENT, "VERTICAL", 10, [8, 0, 8, 0]);
    groups.appendChild(brandGroupDesktop("Category 1", 1, 13));
    groups.appendChild(brandGroupDesktop("Category 2", 14, 25));
    groups.appendChild(brandGroupDesktop("Category 3", 26, 28));
    groups.appendChild(brandGroupDesktop("Category 4", 29, 32));
    groups.appendChild(brandGroupDesktop("Category 5", 33, 41));
    return groups;
  }

  function middle(width, contentWidth, state) {
    const section = frame("ft-org-footer__middle", width, "VERTICAL", 12, [0, 0, 20, 0]);
    section.primaryAxisAlignItems = "CENTER";
    section.counterAxisAlignItems = "CENTER";
    const pubOpen = state === "publicidad-open";
    const groupOpen = state === "group-open";

    section.appendChild(accordionLabel("Publicidad", pubOpen, contentWidth));
    if (pubOpen) section.appendChild(pubPanel(contentWidth));

    section.appendChild(accordionLabel("Otras webs del grupo", groupOpen, contentWidth));
    if (groupOpen) section.appendChild(brandGroupsDesktop());
    return section;
  }

  function legalItem(label, hasDivider) {
    const item = frame(`ft-org-footer__legal-link / ${label}`, 1, "HORIZONTAL", 8, [0, 8, 0, 8]);
    item.primaryAxisSizingMode = "AUTO";
    item.counterAxisSizingMode = "AUTO";
    item.counterAxisAlignItems = "CENTER";
    if (hasDivider) {
      const line = figma.createRectangle();
      line.name = "separator";
      line.resize(1, 16);
      line.fills = solid({ r: 221 / 255, g: 221 / 255, b: 221 / 255 });
      item.appendChild(line);
    }
    item.appendChild(text("label", label, 14, TOKENS.text, "regular"));
    return item;
  }

  function bottom(width, mobile) {
    const section = frame("ft-org-footer__bottom", width, "VERTICAL", 0, [0, 0, 0, 0]);
    section.appendChild(divider("ft-org-footer__legal / top-border", width));

    const legal = frame("ft-org-footer__legal-list", width, "HORIZONTAL", 0, [8, mobile ? 16 : 0, 8, mobile ? 16 : 0]);
    legal.primaryAxisSizingMode = "FIXED";
    legal.counterAxisSizingMode = "AUTO";
    legal.layoutWrap = "WRAP";
    legal.primaryAxisAlignItems = mobile ? "MIN" : "CENTER";
    legal.counterAxisAlignItems = "CENTER";
    legal.counterAxisSpacing = 0;
    LEGAL.forEach((label, index) => legal.appendChild(legalItem(label, index > 0)));
    section.appendChild(legal);
    return section;
  }

  function meta(width) {
    const section = frame("ft-org-footer__meta", width, "VERTICAL", 0, [13, 10, 13, 10]);
    section.fills = solid(TOKENS.metaBg);
    section.primaryAxisAlignItems = "CENTER";
    section.counterAxisAlignItems = "CENTER";
    section.appendChild(text("ft-org-footer__copyright", "\u00a9 2026 Media name, S.L.U. Todos los derechos reservados.", 12, TOKENS.text, "regular"));
    return section;
  }

  function component(variantName, width, contentWidth, state, mobile) {
    const node = figma.createComponent();
    node.name = variantName;
    node.resize(width, 1);
    node.fills = solid(TOKENS.white);
    node.clipsContent = false;
    node.layoutMode = "VERTICAL";
    node.primaryAxisSizingMode = "AUTO";
    node.counterAxisSizingMode = "FIXED";
    node.itemSpacing = 0;
    node.strokes = solid(TOKENS.border);
    node.strokeWeight = 1;
    node.appendChild(top(width, contentWidth));
    node.appendChild(middle(width, contentWidth, state));
    node.appendChild(bottom(width, mobile));
    node.appendChild(meta(width));
    return node;
  }

  function clearX(page) {
    if (page.children.length === 0) return 100;
    return Math.max.apply(null, page.children.map((child) => child.x + child.width)) + 120;
  }

  const variants = [
    component("Breakpoint=Desktop, State=Closed", DESKTOP_WIDTH, DESKTOP_CONTENT, "closed", false),
    component("Breakpoint=Desktop, State=Publicidad open", DESKTOP_WIDTH, DESKTOP_CONTENT, "publicidad-open", false),
    component("Breakpoint=Desktop, State=Group open", DESKTOP_WIDTH, DESKTOP_CONTENT, "group-open", false),
    component("Breakpoint=Mobile, State=Closed", MOBILE_WIDTH, MOBILE_CONTENT, "closed", true),
  ];

  variants.forEach((variant) => figma.currentPage.appendChild(variant));
  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = "Footer / Media Lite / EP";
  set.x = clearX(figma.currentPage);
  set.y = 100;

  figma.currentPage.selection = [set];
  figma.viewport.scrollAndZoomIntoView([set]);
  figma.closePlugin("Footer / Media Lite / EP actualizado con variantes.");
}

main().catch((error) => {
  figma.closePlugin(`Error: ${error.message}`);
});
