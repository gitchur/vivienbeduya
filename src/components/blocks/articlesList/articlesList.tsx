import { getArticlesList, getArticleTags, getPaginatedArticlesList } from "@/queries/lists";
import List from "./list";
import {
  ArticlesListSearchParams,
  parseArticlesListPage,
  resolveCategoryTag,
  slugifyCategory,
  STATIC_ITEMS_PER_PAGE,
} from "./searchParams";
import { StaticList } from "./staticList";

interface Props {
  data: Sanity.Maybe<Sanity.BlockArticlesList>;
  searchParams?: ArticlesListSearchParams;
}

export const ITEMS_LIMIT = 3;

const BlockArticlesList = async ({ data, searchParams }: Props) => {
  if (!data) return null;

  if (data.showAll) {
    const tags = await getArticleTags();
    const activeTag = resolveCategoryTag(tags, searchParams?.category);
    const tagId = activeTag?._id ?? undefined;
    const activeCategory = activeTag?.name ? slugifyCategory(activeTag.name) : null;

    const rawPage = Number.parseInt(searchParams?.page ?? "1", 10);
    const requestedPage = Number.isNaN(rawPage) ? 1 : Math.max(1, rawPage);
    const firstPage = await getPaginatedArticlesList(
      requestedPage - 1,
      STATIC_ITEMS_PER_PAGE,
      undefined,
      tagId,
    );
    const { totalPages } = parseArticlesListPage(searchParams, firstPage.total);
    const currentPage =
      totalPages > 0 ? Math.min(requestedPage, totalPages) : 1;

    const paginatedArticles =
      currentPage !== requestedPage && totalPages > 0
        ? await getPaginatedArticlesList(
            currentPage - 1,
            STATIC_ITEMS_PER_PAGE,
            undefined,
            tagId,
          )
        : firstPage;

    return (
      <StaticList
        data={data}
        articles={paginatedArticles.articles}
        tags={tags}
        activeCategory={activeCategory}
        searchParams={searchParams}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    );
  }

  const listData = await getArticlesList(0, ITEMS_LIMIT);
  return <List data={data} initialList={listData} />;
};

export default BlockArticlesList;
