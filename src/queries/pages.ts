import { sanityFetch } from "@/lib/sanityClient";
import { buildPagePath } from "@/utils/helpers";
import { defineQuery } from "next-sanity";
import {
  draftsFilter,
  imageFields,
  pagePreviewFields,
  richTextFields,
  seoFields,
  slugWithPrefixFields,
  typeIsInAllPagesTypes,
} from "./_general";
import { blocksFields } from "./blocks";

// Create different queries for different page types here
// Do not use "..." in the article branch: it would overwrite slug with the raw document slug (prefix stays reference).
// Only add article-specific fields so slug keeps the expanded prefix from pagePreviewFields.
export const pageFields = defineQuery(`
  ${pagePreviewFields},
  seo { ${seoFields} },
  blocks { ${blocksFields} },
  _type == "article" => {
    publishDate,
    suggestedReadTime,
    tags[]->{ name },
    image { ${imageFields} },
    author->{ firstName, lastName, image { ${imageFields} } }
  },
`);

export const pageBySlugQuery = defineQuery(`
  *[${typeIsInAllPagesTypes} && ${draftsFilter} && slug.current == $slug] {
    ${pageFields}
  }
`);

export const allPagesSlugsQuery = defineQuery(`
  *[${typeIsInAllPagesTypes} && ${draftsFilter}] {
    _updatedAt,
    slug { ${slugWithPrefixFields} }
  }
`);

/**
 * Fetches the page (or article) for the given URL path.
 * @param path - Full path segments from the URL, e.g. ["blog", "my-article"] for /blog/my-article.
 *               Must match the path built from the document's slug + prefix chain so prefixed pages resolve correctly.
 */
export const getPage = async (path: string[] | undefined) => {
  const isHome = !path || path.length === 0;

  // Ignore Chrome DevTools JSON file
  if (path && ["com.chrome.devtools.json"].includes(path[path.length - 1])) {
    return null;
  }

  const lastSlug = isHome ? "/" : path[path.length - 1];

  const pages = (await sanityFetch({
    query: pageBySlugQuery,
    params: { slug: lastSlug },
    tags: [`slug:${lastSlug}`],
  })) as Sanity.Maybe<Sanity.Page[]>;

  if (!pages?.length) return null;

  // Match by full path so prefixed pages (e.g. /blog/my-article) are not confused with root pages (e.g. /my-article).
  const pageData = (
    isHome ? pages[0] : pages.find((p) => JSON.stringify(buildPagePath(p)) === JSON.stringify(path))
  ) as AllPagesData;

  if (!pageData?._type) return null;

  return pageData;
};

export const getAllPagesSlugs = async () => {
  const res = (await sanityFetch({
    query: allPagesSlugsQuery,
  })) as Sanity.Maybe<Sanity.Page[]>;
  return res;
};
