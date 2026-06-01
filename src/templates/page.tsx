import Blocks from "@/components/blocks/blocks";
import { ArticlesListSearchParams } from "@/components/blocks/articlesList/searchParams";

interface Props {
  data: Sanity.Page;
  searchParams?: ArticlesListSearchParams;
  searchParamsPromise?: Promise<ArticlesListSearchParams | undefined>;
}

const PageTemplate = ({ data, searchParams, searchParamsPromise }: Props) => {
  return (
    <Blocks
      data={data?.blocks}
      searchParams={searchParams}
      searchParamsPromise={searchParamsPromise}
    />
  );
};

export default PageTemplate;
