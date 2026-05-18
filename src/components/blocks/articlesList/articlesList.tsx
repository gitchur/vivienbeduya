import { getArticlesList } from "@/queries/lists";
import List from "./list";

interface Props {
  data: Sanity.Maybe<Sanity.BlockArticlesList>;
}

export const ITEMS_LIMIT = 3;

const BlockArticlesList = async ({ data }: Props) => {
  const itemsPerPage = data?.showAll ? 9 : ITEMS_LIMIT;
  const listData = await getArticlesList(0, itemsPerPage, undefined);

  if (!data) return null;
  return <List data={data} initialList={listData} />;
};

export default BlockArticlesList;
