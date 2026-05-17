export const siteName = "Bisaya Banter";

export const mobileBreakpoint = 768;

// Add all the page types you want to be available in the website here
export const allPageTypes = ["page", "article"];

// Add your custom blocks here to be available in the CMS, create the schema in @/sanity/schemas/blocks/yourBlock.ts
export const blocksTypes = [{ type: "block.articlesList" }, { type: "block.featuredPost" }];

// Add your custom primitive blocks here to be available in the CMS, create the schema in @/sanity/schemas/objects/yourObject.ts
// Some primitive blocks are added by default by flightdeck (ctaCard, gap, adaptiveImage, buttonsList, richText and accordion).
export const primitiveBlocksTypes = [{ type: "codeBlock" }];
