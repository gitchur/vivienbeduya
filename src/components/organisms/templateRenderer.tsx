import { ArticlesListSearchParams } from "@/components/blocks/articlesList/searchParams";
import ArticleTemplate from "@/templates/article";
import PageTemplate from "@/templates/page";
import validateType from "@/utils/validateType";
import Blocks from "../blocks/blocks";

interface Props {
  data: AllPagesData | Sanity.ComponentBlueprint;
  searchParams?: ArticlesListSearchParams;
}

const TemplateRenderer = ({ data, searchParams }: Props) => {
  if (validateType.isComponentBlueprint(data)) {
    return <Blocks data={{ list: data.blocks }} searchParams={searchParams} />;
  }
  if (validateType.isArticle(data)) return <ArticleTemplate data={data} searchParams={searchParams} />;
  return <PageTemplate data={data} searchParams={searchParams} />;
};

export default TemplateRenderer;
