import Blocks from "@/components/blocks/blocks";
import { ArticlesListSearchParams } from "@/components/blocks/articlesList/searchParams";

interface Props {
  data: Sanity.Page;
  searchParams?: ArticlesListSearchParams;
}

const PageTemplate = ({ data, searchParams }: Props) => {
  return <Blocks data={data?.blocks} searchParams={searchParams} />;
};

export default PageTemplate;
