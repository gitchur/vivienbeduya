import BlockArticlesList from "./articlesList";
import { ArticlesListSearchParams } from "./searchParams";

interface Props {
  data: Sanity.Maybe<Sanity.BlockArticlesList>;
  searchParams: Promise<ArticlesListSearchParams | undefined>;
}

export const BlockArticlesListWithSearchParams = async ({
  data,
  searchParams,
}: Props): Promise<React.JSX.Element | null> => {
  const loadedSearchParams = await searchParams;
  return <BlockArticlesList data={data} searchParams={loadedSearchParams} />;
};
