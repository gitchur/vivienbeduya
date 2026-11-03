import { accordion, ctaCard, featuredArticleRef, image, link, links, richText } from "./_general";
import { defineProjection } from "./groq";

export const blockMeta = defineProjection(
  "blockMeta",
  "object",
  `
  _type,
  _key,
  layoutEditor,
  ${image.field("backgroundImage")},
  classNames,
  customCss
`,
);

export const primitive = defineProjection(
  "primitive",
  "object",
  `
  _type,
  _key,
  _type == "codeBlock" => {
    code,
    _key,
    _type
  },
  _type == "button" => ${link.call()},
  _type == "link" => ${link.call()},
  _type == "ctaCard" => ${ctaCard.call()},
  _type == "adaptiveImage" => ${image.call()},
  _type == "accordion" => ${accordion.call()},
  _type == "buttonsList" => {
    ${links.field("buttons")},
    spaceBetween,
    direction,
    align
  },
  _type == "gap" => {
    amount,
    showSeparator,
    separatorColor
  },
  _type == "richText" => ${richText.call()}
  // Add your custom primitive objects fields here
  // _type == "customObject" => {
  //   ...
  // },
`,
);

export const primitives = defineProjection(
  "primitives",
  "array",
  `
  ...${primitive.call()}
`,
);

export const gridColumns = defineProjection(
  "gridColumns",
  "array",
  `
  ...${blockMeta.call()},
  ${primitives.field("columnItems")},
  rowGap,
  columnSize,
  verticalAlign,
  horizontalAlign,
  reverseOnMobile
`,
);

export const block = defineProjection(
  "block",
  "object",
  `
  ...${blockMeta.call()},
  // FLIGHTDECK DEFAULT BLOCKS QUERIES
  _type == "block.paragraph" => {
    ${richText.field("content")}
  },
  _type == "block.gap" => {
    amount,
    showSeparator,
    separatorColor
  },
  _type == "block.grid" => {
    ${gridColumns.field("gridColumns")},
    fluidGrid,
    columnGap,
    rowGap,
    reverseOnMobile
  },
  _type == "block.container" => {
    ${primitives.field("containerItems")},
    rowGap,
    reverseOnMobile
  },
  // Add your custom blocks queries below
  _type == "block.articlesList" => {
    showAll,
    ${richText.field("content")}
  },
  _type == "block.featuredPost" => {
    getLatest,
    ${featuredArticleRef.field("post")}
  },
  _type == "block.marquee" => {
    items[]
  }
`,
);

export const blueprintBlocks = defineProjection(
  "blueprintBlocks",
  "array",
  `
  ...${block.call()}
`,
);

export const component = defineProjection(
  "component",
  "object",
  `
  _type,
  _key,
  componentBlueprint -> {
    variables[] { ... },
    ${blueprintBlocks.field("blocks")}
  },
  values[] {
    ...,
    ${image.field("image")},
    ${link.field("link")},
    ${links.field("buttons")},
    ...${primitive.call()},
    _type == "componentPrimitiveValue" => {
      ${primitives.field("arrayOfObject")}
    }
  }
`,
);

// Used for the page query to get the content blocks
export const pageBlocks = defineProjection(
  "pageBlocks",
  "array",
  `
  _type == "component" => ${component.call()},
  _type != "component" => ${block.call()}
`,
);

/** Compact projection. Preview expands this because Flightdeck wraps it in `{ }`. */
export const componentBuilderProjection = `
  _type,
  _id,
  ${blueprintBlocks.field("blocks")}
`;
