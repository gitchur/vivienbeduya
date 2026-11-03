import { sanityFetch } from "@/lib/sanityClient";
import { defineQuery } from "next-sanity";
import { articlePreview, draftsFilter, image, slug } from "./_general";
import { withProjections } from "./groq";

const articlesListQuery = defineQuery(
  withProjections(`
  *[_type == "article" && ${draftsFilter} && (!defined($articleId) || _id != $articleId)] | order(publishDate desc)[$start...$end] {
    ...${articlePreview.call()}
  }
`),
);

const paginatedArticlesListQuery = defineQuery(
  withProjections(`
  {
    "articles": *[
      _type == "article" &&
      ${draftsFilter} &&
      (!defined($articleId) || _id != $articleId) &&
      (!defined($tagId) || references($tagId))
    ] | order(publishDate desc) [$start...$end] {
      ...${articlePreview.call()}
    },
    "total": count(*[
      _type == "article" &&
      ${draftsFilter} &&
      (!defined($articleId) || _id != $articleId) &&
      (!defined($tagId) || references($tagId))
    ])
  }
`),
);

const articleTagsQuery = defineQuery(`
  *[
    _type == "tag" &&
    count(*[_type == "article" && ${draftsFilter} && references(^._id)]) > 0
  ] | order(name asc) {
    _id,
    name
  }
`);

const searchQuery = defineQuery(
  withProjections(`
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
    ${image.field("image")},
    ${slug.field("slug")}
  }
`),
);

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

export interface PaginatedArticlesList {
  articles: Sanity.Article[];
  total: number;
}

export const getPaginatedArticlesList = async (
  page: number,
  itemsPerPage: number,
  currentArticleId?: string,
  tagId?: string,
): Promise<PaginatedArticlesList> => {
  const data = await sanityFetch({
    query: paginatedArticlesListQuery,
    params: {
      start: page * itemsPerPage,
      end: (page + 1) * itemsPerPage,
      articleId: currentArticleId ?? null,
      tagId: tagId ?? null,
    },
    tags: [`articles-list`],
  });

  const result = data as Sanity.Maybe<{
    articles: Sanity.Maybe<Sanity.Article[]>;
    total: number;
  }>;

  return {
    articles: result?.articles ?? [],
    total: result?.total ?? 0,
  };
};

export const getArticleTags = async (): Promise<Sanity.Tag[]> => {
  const data = await sanityFetch({
    query: articleTagsQuery,
    tags: [`articles-list`],
  });

  return (data as Sanity.Maybe<Sanity.Tag[]>) ?? [];
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
