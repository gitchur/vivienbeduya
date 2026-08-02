import { sanityFetch } from "@/lib/sanityClient";
import { buildPagePath } from "@/utils/helpers";
import { defineQuery } from "next-sanity";
import { cache } from "react";
import {
  articlePreviewFields,
  draftsFilter,
  imageFields,
  pagePreviewFields,
  richTextFields,
  seoFields,
  slugWithPrefixFields,
  typeIsInAllPagesTypes,
} from "./_general";
import { blocksFields } from "./blocks";

// Authors don't have a "title" field (they have firstName/lastName instead), so it's
// computed here to keep the generic `title` field (from pagePreviewFields) populated.
const authorNameField = `select(defined(lastName) => firstName + " " + lastName, firstName)`;

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
  _type == "author" => {
    "title": ${authorNameField},
    firstName,
    lastName,
    role,
    image { ${imageFields} },
    bio { ${richTextFields} },
    // Plain-text version of bio, used as a JSON-LD/meta description fallback (authors have no "description" field).
    "bioExcerpt": pt::text(bio.blocks),
    "articles": *[_type == "article" && ${draftsFilter} && references(^._id)]
      | order(coalesce(publishDate, _createdAt) desc) { ${articlePreviewFields} }
  },
`);

export const pageSeoFields = defineQuery(`
  ${pagePreviewFields},
  seo { ${seoFields} },
  _type == "article" => {
    image { ${imageFields} }
  },
  _type == "author" => {
    "title": ${authorNameField},
    // firstName is required by buildPagePath() to resolve the author's URL (authors have no slug field);
    // without it, resolvePageByPath() can't match this document and getPageSeo() silently returns null.
    firstName,
    lastName,
    image { ${imageFields} },
    // Plain-text version of bio, used as a meta description fallback (authors have no "description" field).
    "bioExcerpt": pt::text(bio.blocks)
  },
`);

// Authors have no manually managed slug field: their URL is derived from firstName instead
// (see buildPagePath), so they're matched here by firstName rather than slug.current.
const matchesRequestedSlug = `(
  (_type == "author" && lower(firstName) == lower($slug)) ||
  (_type != "author" && slug.current == $slug)
)`;

export const pageBySlugQuery = defineQuery(`
  *[${typeIsInAllPagesTypes} && ${draftsFilter} && ${matchesRequestedSlug}] {
    ${pageFields}
  }
`);

export const pageSeoBySlugQuery = defineQuery(`
  *[${typeIsInAllPagesTypes} && ${draftsFilter} && ${matchesRequestedSlug}] {
    ${pageSeoFields}
  }
`);

export const allPagesSlugsQuery = defineQuery(`
  *[${typeIsInAllPagesTypes} && ${draftsFilter}] {
    _type,
    _updatedAt,
    firstName,
    slug { ${slugWithPrefixFields} }
  }
`);

const resolvePageByPath = <T extends AllPagesData>(
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

const fetchPagesByPath = async <T extends AllPagesData>(
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
  Partial<Pick<Sanity.Article, "image">> &
  Partial<Pick<AuthorPageData, "firstName" | "lastName" | "bioExcerpt">>;

export const getPageSeo = cache(async (path: string[] | undefined): Promise<PageSeoData | null> => {
  const page = await fetchPagesByPath<AllPagesData>(path, pageSeoBySlugQuery);
  return page as PageSeoData | null;
});

export const getAllPagesSlugs = async () => {
  const res = (await sanityFetch({
    query: allPagesSlugsQuery,
  })) as Sanity.Maybe<AllPagesData[]>;
  return res;
};
