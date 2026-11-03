import { allPageTypes } from "@/utils/constants";
import { defineProjection } from "./groq";

export const draftsFilter = `!(_id in path('drafts.**'))`;

export const typeIsInAllPagesTypes = `_type in [${allPageTypes.map((el) => `"${el}"`).join(",")}]`;

export const slug = defineProjection(
  "slug",
  "object",
  `
  current,
  prefix -> {
    slug {
      current,
      prefix -> {
        slug {
          current,
          prefix -> {
            slug {
              current,
              prefix -> {
                slug {
                  current
                }
              }
            }
          }
        }
      }
    }
  }
`,
);

export const internalLink = defineProjection(
  "internalLink",
  "reference",
  `
  _id,
  _type,
  title,
  ${slug.field("slug")},
  _type == "author" => {
    firstName
  }
`,
);

export const link = defineProjection(
  "link",
  "object",
  `
  _key,
  _type,
  text,
  type,
  design,
  ${internalLink.field("internalLink")},
  externalLink,
  anchorId,
  action,
  openInNewTab,
  params,
  descriptiveText
`,
);

export const links = defineProjection(
  "links",
  "array",
  `
  ...${link.call()}
`,
);

export const imageAsset = defineProjection(
  "imageAsset",
  "reference",
  `
  _id,
  metadata { dimensions, palette, lqip },
  mimeType,
  size,
  url,
  altText
`,
);

export const image = defineProjection(
  "image",
  "object",
  `
  _key,
  _type,
  altText,
  maxWidth,
  maxHeight,
  loading,
  objectFit,
  align,
  ${imageAsset.field("asset")},
  mobileImage {
    ...,
    ${imageAsset.field("asset")}
  },
  desktopImage {
    ...,
    ${imageAsset.field("asset")}
  }
`,
);

export const richText = defineProjection(
  "richText",
  "object",
  `
  ...,
  blocks[] {
    ...,
    _type == "block" => {
      markDefs[] {
        ...,
        ${internalLink.field("internalLink")}
      }
    },
    _type == "adaptiveImage" => ${image.call()}
  }
`,
);

export const seo = defineProjection(
  "seo",
  "object",
  `
  pageTitle,
  pageDescription,
  ${image.field("image")},
  indexing,
  jsonLD,
  customPageCode
`,
);

export const ctaCard = defineProjection(
  "ctaCard",
  "object",
  `
  _type,
  _key,
  design,
  title,
  ${richText.field("content")},
  ${image.field("image")},
  ${link.field("link")},
  ${links.field("buttons")}
`,
);

export const accordion = defineProjection(
  "accordion",
  "object",
  `
  _type,
  _key,
  title,
  ${richText.field("content")},
  openByDefault
`,
);

export const pagePreview = defineProjection(
  "pagePreview",
  "object",
  `
  _id,
  _type,
  title,
  description,
  ${slug.field("slug")}
`,
);

export const articlePreview = defineProjection(
  "articlePreview",
  "object",
  `
  ...${pagePreview.call()},
  alternativeTitle,
  alternativeDescription,
  ${image.field("image")},
  "publishDate": coalesce(publishDate, _createdAt),
  suggestedReadTime,
  tags[] -> { _id, name }
`,
);

export const featuredArticle = defineProjection(
  "featuredArticle",
  "object",
  `
  ...${articlePreview.call()},
  author -> {
    firstName,
    lastName,
    ${image.field("image")}
  }
`,
);

/** Follows an article reference. The object form projects an article document directly. */
export const featuredArticleRef = defineProjection(
  "featuredArticleRef",
  "reference",
  `...${featuredArticle.call()}`,
);
