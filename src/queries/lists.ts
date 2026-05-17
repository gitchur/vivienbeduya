import { sanityFetch } from "@/lib/sanityClient";
import { defineQuery } from "next-sanity";
import { articlePreviewFields, draftsFilter } from "./_general";

const articlesListQuery = defineQuery(`
  *[_type == "article" && ${draftsFilter} && (!defined($articleId) || _id != $articleId)] | order(publishDate desc)[$start...$end] {
    ${articlePreviewFields}
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
