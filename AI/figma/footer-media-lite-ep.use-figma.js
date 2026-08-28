/*
 * 42DS Figma export
 * Source: fourty/organisms/organism-footer.html#footerMediaLite
 * Component: Footer / Media Lite / EP
 *
 * Intended runner: use_figma with skillNames: "figma-use".
 * This script creates a Figma component that mirrors the Lite EP footer
 * structure from the showroom HTML and the source SCSS.
 */

const TOKENS = {
  colorBlack: { r: 17 / 255, g: 17 / 255, b: 17 / 255 },
  colorWhite: { r: 1, g: 1, b: 1 },
  colorPrimary: { r: 245 / 255, g: 48 / 255, b: 54 / 255 },
  colorTertiary: { r: 51 / 255, g: 51 / 255, b: 51 / 255 },
  colorSeptenary: { r: 85 / 255, g: 85 / 255, b: 85 / 255 },
  border: { r: 229 / 255, g: 229 / 255, b: 229 / 255 },
  borderLight: { r: 240 / 255, g: 240 / 255, b: 240 / 255 },
  metaBg: { r: 245 / 255, g: 245 / 255, b: 245 / 255 },
  facebook: { r: 58 / 255, g: 87 / 255, b: 149 / 255 },
  twitter: { r: 0, g: 0, b: 0 },
  instagram: { r: 225 / 255, g: 27 / 255, b: 126 / 255 },
};

const FOOTER_WIDTH = 390;
const CONTENT_WIDTH = 370;
const DESKTOP_CONTENT_MAX = 980;

const fonts = await figma.listAvailableFontsAsync();
const hasFont = (family, style) => fonts.some((font) => font.fontName.family === family && font.fontName.style === style);
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

function setAutoLayout(node, direction, gap = 0, padding = [0, 0, 0, 0]) {
  node.layoutMode = direction;
  node.itemSpacing = gap;
  node.paddingTop = padding[0];
  node.paddingRight = padding[1];
  node.paddingBottom = padding[2];
  node.paddingLeft = padding[3];
}

function setStroke(node, color, weight = 1) {
  node.strokes = solid(color);
  node.strokeWeight = weight;
}

function createFrame(name, width, direction = "VERTICAL", gap = 0, padding = [0, 0, 0, 0]) {
  const frame = figma.createFrame();
  frame.name = name;
  frame.resize(width, 1);
  frame.fills = [];
  frame.clipsContent = false;
  setAutoLayout(frame, direction, gap, padding);
  frame.primaryAxisSizingMode = "AUTO";
  frame.counterAxisSizingMode = "FIXED";
  return frame;
}

function createText(name, characters, size, color = TOKENS.colorSeptenary, isBold = false, width = null) {
  const text = figma.createText();
  text.name = name;
  text.fontName = isBold ? boldFont : regularFont;
  text.characters = characters;
  text.fontSize = size;
  text.lineHeight = { unit: "PIXELS", value: Math.round(size * 1.3) };
  text.fills = solid(color);
  text.textAutoResize = width ? "HEIGHT" : "WIDTH_AND_HEIGHT";
  if (width) {
    text.resize(width, text.height);
  }
  return text;
}

function createDivider(name, width, color = TOKENS.border) {
  const line = figma.createRectangle();
  line.name = name;
  line.resize(width, 1);
  line.fills = solid(color);
  return line;
}

function createCircleIcon(name, label, color) {
  const frame = createFrame(name, 30, "HORIZONTAL", 0, [0, 0, 0, 0]);
  frame.resize(30, 30);
  frame.primaryAxisSizingMode = "FIXED";
  frame.counterAxisSizingMode = "FIXED";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  frame.cornerRadius = 15;
  frame.fills = solid(color);

  const glyph = createText(`${name} / glyph`, label, 13, TOKENS.colorWhite, true);
  frame.appendChild(glyph);
  return frame;
}

function createChevron(name) {
  const chevron = figma.createText();
  chevron.name = name;
  chevron.fontName = boldFont;
  chevron.characters = "⌄";
  chevron.fontSize = 16;
  chevron.lineHeight = { unit: "PIXELS", value: 16 };
  chevron.fills = solid(TOKENS.colorSeptenary);
  return chevron;
}

function createAccordionTrigger(title) {
  const row = createFrame(`Accordion / ${title} / closed`, CONTENT_WIDTH, "HORIZONTAL", 4, [10, 10, 10, 10]);
  row.primaryAxisAlignItems = "CENTER";
  row.counterAxisAlignItems = "CENTER";

  const label = createText("summary", title, 14, TOKENS.colorSeptenary);
  row.appendChild(label);
  row.appendChild(createChevron("decorative-chevron"));
  return row;
}

function createLegalItem(label, hasDivider) {
  const frame = createFrame(`legal-link / ${label}`, 1, "HORIZONTAL", 0, [0, 8, 0, 8]);
  frame.primaryAxisSizingMode = "AUTO";
  frame.counterAxisSizingMode = "AUTO";
  frame.counterAxisAlignItems = "CENTER";

  if (hasDivider) {
    const divider = figma.createRectangle();
    divider.name = "separator";
    divider.resize(1, 14);
    divider.fills = solid({ r: 221 / 255, g: 221 / 255, b: 221 / 255 });
    frame.appendChild(divider);
  }

  frame.appendChild(createText("label", label, 14, TOKENS.colorSeptenary));
  return frame;
}

function createBrandGroup(title, first, last) {
  const group = createFrame(`brand-group / ${title}`, CONTENT_WIDTH, "VERTICAL", 0, [0, 0, 0, 0]);
  group.appendChild(createText("category-title", title.toUpperCase(), 16, TOKENS.colorTertiary, true, CONTENT_WIDTH));

  for (let i = first; i <= last; i += 1) {
    const row = createFrame(`brand-link / Brand name ${i}`, CONTENT_WIDTH, "VERTICAL", 0, [0, 0, 0, 0]);
    row.appendChild(createDivider("item-border", CONTENT_WIDTH, TOKENS.borderLight));

    const content = createFrame("item-content", CONTENT_WIDTH, "HORIZONTAL", 0, [10, 0, 10, 0]);
    content.primaryAxisAlignItems = "SPACE_BETWEEN";
    content.counterAxisAlignItems = "CENTER";
    content.appendChild(createText("label", `Brand name ${i}`, 14, TOKENS.colorBlack));
    content.appendChild(createText("decorative-arrow", "›", 18, { r: 128 / 255, g: 128 / 255, b: 128 / 255 }));
    row.appendChild(content);
    group.appendChild(row);
  }

  return group;
}

function findClearX(page) {
  if (page.children.length === 0) return 100;
  return Math.max(...page.children.map((child) => child.x + child.width)) + 120;
}

let page = figma.root.children.find((candidate) => candidate.name === "42DS Components");
if (!page) {
  page = figma.createPage();
  page.name = "42DS Components";
}
await figma.setCurrentPageAsync(page);

const component = figma.createComponent();
component.name = "Footer / Media Lite / EP";
component.resize(FOOTER_WIDTH, 1);
component.fills = solid(TOKENS.colorWhite);
component.clipsContent = false;
setAutoLayout(component, "VERTICAL", 0, [0, 0, 0, 0]);
component.primaryAxisSizingMode = "AUTO";
component.counterAxisSizingMode = "FIXED";
setStroke(component, TOKENS.border, 1);

const top = createFrame("ft-org-footer__top", FOOTER_WIDTH, "VERTICAL", 0, [17.5, 10, 20, 10]);
top.primaryAxisAlignItems = "CENTER";
top.counterAxisAlignItems = "CENTER";

const logo = createFrame("ft-org-footer__logo", 190, "VERTICAL", 0, [0, 0, 12.5, 0]);
logo.primaryAxisAlignItems = "CENTER";
logo.counterAxisAlignItems = "CENTER";
logo.appendChild(createText("logo / logoEpColor.svg", "elPeriódico", 31, TOKENS.colorPrimary, true));
top.appendChild(logo);

const socials = createFrame("ft-org-footer__rrss-list", 120, "HORIZONTAL", 15, [0, 0, 0, 0]);
socials.primaryAxisSizingMode = "AUTO";
socials.counterAxisSizingMode = "AUTO";
socials.appendChild(createCircleIcon("facebook", "f", TOKENS.facebook));
socials.appendChild(createCircleIcon("twitter-x", "X", TOKENS.twitter));
socials.appendChild(createCircleIcon("instagram", "◎", TOKENS.instagram));
top.appendChild(socials);
component.appendChild(top);

const middle = createFrame("ft-org-footer__middle", FOOTER_WIDTH, "VERTICAL", 0, [0, 10, 0, 10]);
middle.primaryAxisAlignItems = "CENTER";
middle.counterAxisAlignItems = "CENTER";
middle.appendChild(createAccordionTrigger("Publicidad"));
middle.appendChild(createAccordionTrigger("Otras webs del grupo"));
component.appendChild(middle);

const expandedReference = createFrame("Reference / open accordion content", FOOTER_WIDTH, "VERTICAL", 16, [16, 10, 16, 10]);
expandedReference.visible = false;
expandedReference.appendChild(createText("note", "Contenido documentado para estado abierto en la variante Lite.", 12, TOKENS.colorSeptenary, false, CONTENT_WIDTH));
expandedReference.appendChild(createBrandGroup("Category 1", 1, 13));
expandedReference.appendChild(createBrandGroup("Category 2", 14, 25));
expandedReference.appendChild(createBrandGroup("Category 3", 26, 28));
expandedReference.appendChild(createBrandGroup("Category 4", 29, 32));
expandedReference.appendChild(createBrandGroup("Category 5", 33, 41));
component.appendChild(expandedReference);

const bottom = createFrame("ft-org-footer__bottom", FOOTER_WIDTH, "VERTICAL", 0, [0, 0, 0, 0]);
bottom.appendChild(createDivider("legal-top-border", FOOTER_WIDTH, TOKENS.border));

const legal = createFrame("ft-org-footer__legal-list", FOOTER_WIDTH, "HORIZONTAL", 0, [8.75, 10, 8.75, 10]);
legal.primaryAxisSizingMode = "AUTO";
legal.counterAxisSizingMode = "AUTO";
legal.layoutWrap = "WRAP";
legal.counterAxisAlignItems = "CENTER";

[
  "Quiénes somos",
  "Contacto",
  "RSS",
  "Mapa del sitio",
  "Publicidad",
  "Aviso legal",
  "Política de privacidad y cookies",
  "Preferencias de privacidad",
].forEach((label, index) => {
  legal.appendChild(createLegalItem(label, index > 0));
});

bottom.appendChild(legal);
component.appendChild(bottom);

const meta = createFrame("ft-org-footer__meta", FOOTER_WIDTH, "VERTICAL", 0, [12, 10, 12, 10]);
meta.fills = solid(TOKENS.metaBg);
meta.primaryAxisAlignItems = "CENTER";
meta.counterAxisAlignItems = "CENTER";
meta.appendChild(createText("ft-org-footer__copyright", "© 2026 Media name, S.L.U. Todos los derechos reservados.", 12, TOKENS.colorSeptenary, false, CONTENT_WIDTH));
component.appendChild(meta);

const annotation = createFrame("Component notes", FOOTER_WIDTH, "VERTICAL", 4, [12, 10, 12, 10]);
annotation.fills = solid({ r: 1, g: 248 / 255, b: 225 / 255 });
annotation.appendChild(createText("source", "Source: #footerMediaLite · .ft-org-footer.ft-org-footer--lite · EP", 11, TOKENS.colorTertiary, true, CONTENT_WIDTH));
annotation.appendChild(createText("accessibility", "ARIA/source semantics: footer labelled by hidden h2, social nav, legal nav, native details/summary accordions.", 11, TOKENS.colorTertiary, false, CONTENT_WIDTH));
annotation.appendChild(createText("responsive", `Mobile width ${FOOTER_WIDTH}px. Desktop section max-width in SCSS: ${DESKTOP_CONTENT_MAX}px.`, 11, TOKENS.colorTertiary, false, CONTENT_WIDTH));
component.appendChild(annotation);

component.x = findClearX(page);
component.y = 100;
page.appendChild(component);

figma.currentPage.selection = [component];
figma.viewport.scrollAndZoomIntoView([component]);

return {
  createdNodeIds: [component.id],
  componentName: component.name,
  source: "fourty/organisms/organism-footer.html#footerMediaLite",
  notes: [
    "The default Lite HTML state is represented with both accordions closed.",
    "Open accordion content is included as a hidden reference layer inside the component.",
    "The EP logo is represented as editable text because this runner has no repository filesystem access inside Figma.",
  ],
};
