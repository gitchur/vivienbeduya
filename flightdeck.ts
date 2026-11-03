import { spaceOptions } from "@/sanity/utils/constants";
import { allPageTypes, blocksTypes, primitiveBlocksTypes } from "@/utils/constants";
import { flightDeck } from "@flight-digital/sanity-plugin-flightdeck";
import { RiTranslate } from "react-icons/ri";
import { defineField, FieldDefinition, Rule } from "sanity";

// Example of how to add a custom decorator to rich text + heading
// Create a annotation component file in @/sanity/utils/annotations.tsx and import it here
const defRichTextFields = {
  // overwriteDecorators(current: any) {
  //   return [
  //     ...current,
  //     {
  //       title: "Caption",
  //       value: "caption",
  //       icon: StringIcon,
  //       component: annotations.Caption,
  //     },
  //   ];
  // },
  overwriteAnnotations(current: any) {
    return [
      ...current,
      {
        name: "translation",
        type: "object",
        icon: RiTranslate,
        fields: [
          {
            name: "text",
            type: "text",
          },
        ],
      },
    ];
  },

  overwriteFields(current: any) {
    return [...current, defineField({ name: "customField", type: "string" })];
  },
};

const formattedAllPageTypes = allPageTypes.map((type) => ({ type }));

// Organisation, website, article, author and breadcrumb markup is generated in code
// (src/utils/jsonLd.ts), so this field is only for extras and must be valid JSON.
const seoFields = {
  overwriteFields(current: FieldDefinition[]): FieldDefinition[] {
    return current.map((field) =>
      field.name === "jsonLD"
        ? {
            ...field,
            description:
              "Optional extra schema.org JSON-LD (e.g. AboutPage). Organization, WebSite, WebPage, BlogPosting, ProfilePage, Person and BreadcrumbList are generated automatically and will be ignored here.",
            validation: (rule: Rule) =>
              rule.custom((value: unknown) => {
                const json = typeof value === "string" ? value : (value as { code?: string })?.code;
                if (!json?.trim()) return true;
                try {
                  JSON.parse(json);
                  return true;
                } catch (error) {
                  return `Not valid JSON, so it won't be added to the page: ${(error as Error).message}`;
                }
              }),
          }
        : field,
    );
  },
};

// Shared fields for button, link and link without text
const defButtonFields = {
  internalReferenceTypes: formattedAllPageTypes,
};

const flightDeckPlugin = flightDeck({
  preview: {
    pagePath: "preview",
    documentTypes: formattedAllPageTypes,
    clientEditor: {
      enabled: true,
      allowedOrigins: [process.env.NEXT_PUBLIC_WEBSITE_URL ?? ""],
    },
  },
  tools: {
    adminTools: true,
    wiki: true,
  },
  settings: {
    websiteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL ?? "",
    // Customize the spacing based on your needs, check the spaceOptions in @/sanity/utils/constants.tsx
    spaceOptions: spaceOptions,
    disableNewDocumentOptions: ["settings", "header", "footer", "theme", "wiki"],
    disableDocumentActions: ["settings", "header", "footer", "theme", "wiki"].map((type) => ({
      actionsToDisable: ["delete", "duplicate", "unpublish"],
      documentType: type,
    })),
    mediaLibrary: {
      maximumUploadSize: 10 * 1024 * 1024, // 10MB
      // Displays a "edit media" option in the image input options to edit the alt text, tags and more,
      // The existing alt text input from the image schemas will be hidden
      mediaEditor: {
        enabled: true,
        //editableFields: [""] Update the editable fields here, default to alt text and tags
      },
    },
  },
  blocksSettings: {
    primitiveBlocks: {
      overwriteTypes(current) {
        return [...current, ...primitiveBlocksTypes];
      },
    },
    components: {
      // Use this to enable the component builder variables in these new schemas
      // overwritePrimitiveArrayOfObjectVariableTypes(current) {
      //   console.log("current", current);
      //   return [...current, ...primitiveBlocksTypes];
      // },
      // overwriteVariableTypes(current) {
      //   return [...current, { type: "newPrimitive" }, { type: "newFieldInAObject"}];
      // },
      overwriteBlocks(current) {
        return [...current, ...blocksTypes];
      },
      availableInDocumentTypes: formattedAllPageTypes,
    },
    blocks: {
      overwriteBlocks(current) {
        return [...current.filter((el) => el.type !== "reference"), ...blocksTypes];
      },
    },
  },
  schemaSettings: {
    ignore: ["downloadableFile", "region"], // Remove if you need to use these schemas
    button: {
      ...defButtonFields,
      // Customize the design options field based on your needs, update the styles in style.linaria.global.tsx
      designOptions: [{ title: "Default", value: "bark" }],
      disableEndIcon: true,
      disableStartIcon: true,
    },
    ctaCard: {
      // Customize the design options field based on your needs
      // designOptions: [
      //   { title: "Default", value: "default" },
      //   { title: "Compact", value: "compact" },
      // ],
    },
    link: { ...defButtonFields },
    linkWithoutText: { ...defButtonFields },
    heading: { ...defRichTextFields },
    richText: { ...defRichTextFields },
    seo: { ...seoFields },
    slugWithPrefix: {
      source: "title",
      prefixReferenceTypes: [{ type: "page" }], // If you need other types as prefix, add them here
    },
    theme: {
      liteMode: true, // If you need full control of the theme (add font sizes, colors, etc.), set this to false
    },
  },
});

export default flightDeckPlugin;
