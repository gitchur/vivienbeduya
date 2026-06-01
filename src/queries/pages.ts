import { sanityFetch } from "@/lib/sanityClient";
import { buildPagePath } from "@/utils/helpers";
import { defineQuery } from "next-sanity";
import { cache } from "react";
import {
  draftsFilter,
  imageFields,
  pagePreviewFields,
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

export const pageSeoFields = defineQuery(`
  ${pagePreviewFields},
  seo { ${seoFields} },
  _type == "article" => {
    image { ${imageFields} }
  },
`);

export const pageBySlugQuery = defineQuery(`
  *[${typeIsInAllPagesTypes} && ${draftsFilter} && slug.current == $slug] {
    ${pageFields}
  }
`);

export const pageSeoBySlugQuery = defineQuery(`
  *[${typeIsInAllPagesTypes} && ${draftsFilter} && slug.current == $slug] {
    ${pageSeoFields}
  }
`);

export const allPagesSlugsQuery = defineQuery(`
  *[${typeIsInAllPagesTypes} && ${draftsFilter}] {
    _updatedAt,
    slug { ${slugWithPrefixFields} }
  }
`);

const resolvePageByPath = <T extends Sanity.Page | Sanity.Article>(
  path: string[] | undefined,
  pages: Sanity.Maybe<T[]>,
): T | null => {
  const isHome = !path || path.length === 0;

  if (!pages?.length) return null;

  const pageData = isHome
    ? pages[0]
    : pages.find((p) => JSON.stringify(buildPagePath(p)) === JSON.stringify(path));

  if (!pageData?._type) return null;

  return pageData;
};

const fetchPagesByPath = async <T extends Sanity.Page | Sanity.Article>(
  path: string[] | undefined,
  query: string,
): Promise<T | null> => {
  const isHome = !path || path.length === 0;

  if (path && ["com.chrome.devtools.json"].includes(path[path.length - 1])) {
    return null;
  }

  const lastSlug = isHome ? "/" : path[path.length - 1];

  const pages = (await sanityFetch({
    query,
    params: { slug: lastSlug },
    tags: [`slug:${lastSlug}`],
  })) as Sanity.Maybe<T[]>;

  return resolvePageByPath(path, pages);
};

/**
 * Fetches the page (or article) for the given URL path.
 * @param path - Full path segments from the URL, e.g. ["blog", "my-article"] for /blog/my-article.
 *               Must match the path built from the document's slug + prefix chain so prefixed pages resolve correctly.
 */
export const getPage = cache(async (path: string[] | undefined): Promise<AllPagesData | null> => {
  return fetchPagesByPath<AllPagesData>(path, pageBySlugQuery);
});

export type PageSeoData = Pick<Sanity.Page, "_type" | "title" | "description" | "seo" | "slug"> &
  Partial<Pick<Sanity.Article, "image">>;

export const getPageSeo = cache(async (path: string[] | undefined): Promise<PageSeoData | null> => {
  const page = await fetchPagesByPath<Sanity.Page | Sanity.Article>(path, pageSeoBySlugQuery);
  return page as PageSeoData | null;
});

export const getAllPagesSlugs = async () => {
  const res = (await sanityFetch({
    query: allPagesSlugsQuery,
  })) as Sanity.Maybe<Sanity.Page[]>;
  return res;
};
