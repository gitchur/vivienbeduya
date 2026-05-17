import { allPageTypes } from "@/utils/constants";
import { defineQuery } from "next-sanity";

export const draftsFilter = `!(_id in path('drafts.**'))`;

export const typeIsInAllPagesTypes = `_type in [${allPageTypes.map((el) => `"${el}"`).join(",")}]`;

export const slugWithPrefixFields = defineQuery(`
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
`);

export const internalLinkFields = defineQuery(`
  _id,
  _type,
  title,
  slug { ${slugWithPrefixFields} }
`);

export const linkFields = defineQuery(`
  _key,
  _type,
  text,
  type,
  design,
  internalLink -> { ${internalLinkFields} },
  externalLink,
  anchorId,
  action,
  openInNewTab,
  params,
  descriptiveText
`);

export const imageAssetFields = defineQuery(`
  _id,
  metadata { dimensions, palette, lqip },
  mimeType,
  size,
  url,
  altText
`);

export const imageFields = defineQuery(`
  _key,
  _type,
  altText,
  maxWidth,
  maxHeight,
  loading,
  objectFit,
  align,
  asset -> { ${imageAssetFields} },
  mobileImage {
    ...,
    asset -> { ${imageAssetFields} }
  },
  desktopImage {
    ...,
    asset -> {  ${imageAssetFields} }
  }
`);

export const richTextFields = defineQuery(`
  ...,
  blocks[] {
    ...,
    _type == "block" => {
      markDefs[] {
        ...,
        internalLink -> { ${internalLinkFields} }
      }
    },
    _type == "adaptiveImage" => {
      ${imageFields}
    }
  }
`);

export const seoFields = defineQuery(`
  pageTitle,
  pageDescription,
  image { ${imageFields} },
  indexing,
  jsonLD,
  customPageCode
`);

export const ctaCardFields = defineQuery(`
  _type,
  _key,
  design,
  title,
  content { ${richTextFields} },
  image { ${imageFields} },
  link { ${linkFields} },
  buttons[] { ${linkFields} }
`);

export const accordionFields = defineQuery(`
  _type,
  _key,
  title,
  content { ${richTextFields} },
  openByDefault
`);

export const pagePreviewFields = defineQuery(`
  _id,
  _type,
  title,
  description,
  slug { ${slugWithPrefixFields} }
`);

export const articlePreviewFields = defineQuery(`
  ${pagePreviewFields},
  alternativeTitle,
  alternativeDescription,
  image { ${imageFields} },
  "publishDate": coalesce(publishDate, _createdAt),
  suggestedReadTime,
  tags[] -> { _id, name }
`);
