import { sanityFetch } from "@/lib/sanityClient";
import { defineQuery } from "next-sanity";
import { articlePreviewFields, draftsFilter, imageFields, slugWithPrefixFields } from "./_general";

const articlesListQuery = defineQuery(`
  *[_type == "article" && ${draftsFilter} && (!defined($articleId) || _id != $articleId)] | order(publishDate desc)[$start...$end] {
    ${articlePreviewFields}
  }
`);

const searchQuery = defineQuery(`
  *[
    _type in ["article", "page"] &&
    (!defined(seo.indexing) || !("noindex" in seo.indexing)) &&
    (!defined($type) || _type == $type) &&
    (!defined($articleType) || type == $articleType) &&
    (
      title match $searchTerm ||
      description match $searchTerm
    )
  ] | order(_updatedAt desc) [0...20] {
    _id,
    _type,
    type,
    title,
    description,
    suggestedReadTime,
    image { ${imageFields} },
    slug { ${slugWithPrefixFields} }
  }
`);

export const getArticlesList = async (
  page: number,
  itemsPerPage = 9,
  currentArticleId?: string,
) => {
  const data = await sanityFetch({
    query: articlesListQuery,
    params: {
      start: page * itemsPerPage,
      end: (page + 1) * itemsPerPage,
      articleId: currentArticleId ?? null,
    },
    tags: [`articles-list`],
  });

  return data as Sanity.Maybe<Sanity.Article[]>;
};

export const getSearchResults = async (searchTerm: string, rawType: string) => {
  const type = rawType === "all" ? null : rawType.split(".")[0];
  const articleType = rawType.includes(".") ? rawType.split(".")[1] : null;

  const data = await sanityFetch({
    query: searchQuery,
    params: {
      searchTerm: `*${searchTerm}*`,
      type: type,
      articleType: articleType,
    },
  });
  return data as Sanity.Maybe<AllPagesData[]>;
};
