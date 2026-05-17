import { getArticlesList } from "@/queries/lists";
import List from "./list";

interface Props {
  data: Sanity.Maybe<Sanity.BlockArticlesList>;
}

export const ITEMS_PER_PAGE = 3;

// THIS IS JUST AN EXAMPLE BLOCK, PLEASE DELETE THIS FILE IF YOU DON'T NEED IT OR MODIFY IT ACCORDINGLY
const BlockArticlesList = async ({ data }: Props) => {
  const listData = await getArticlesList(0, ITEMS_PER_PAGE);

  if (!data) return null;
  return <List data={data} initialList={listData} />;
};

export default BlockArticlesList;
