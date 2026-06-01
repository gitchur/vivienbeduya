import { ArticlesListSearchParams } from "@/components/blocks/articlesList/searchParams";
import ArticleTemplate from "@/templates/article";
import PageTemplate from "@/templates/page";
import validateType from "@/utils/validateType";
import Blocks from "../blocks/blocks";

interface Props {
  data: AllPagesData | Sanity.ComponentBlueprint;
  searchParams?: ArticlesListSearchParams;
  searchParamsPromise?: Promise<ArticlesListSearchParams | undefined>;
}

const TemplateRenderer = ({ data, searchParams, searchParamsPromise }: Props) => {
  if (validateType.isComponentBlueprint(data)) {
    return (
      <Blocks
        data={{ list: data.blocks }}
        searchParams={searchParams}
        searchParamsPromise={searchParamsPromise}
      />
    );
  }
  if (validateType.isArticle(data)) {
    return (
      <ArticleTemplate
        data={data}
        searchParams={searchParams}
        searchParamsPromise={searchParamsPromise}
      />
    );
  }
  return (
    <PageTemplate
      data={data}
      searchParams={searchParams}
      searchParamsPromise={searchParamsPromise}
    />
  );
};

export default TemplateRenderer;
