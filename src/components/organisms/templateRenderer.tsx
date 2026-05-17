import ArticleTemplate from "@/templates/article";
import PageTemplate from "@/templates/page";
import validateType from "@/utils/validateType";
import Blocks from "../blocks/blocks";

const TemplateRenderer = ({ data }: { data: AllPagesData | Sanity.ComponentBlueprint }) => {
  if (validateType.isComponentBlueprint(data)) return <Blocks data={{ list: data.blocks }} />;
  if (validateType.isArticle(data)) return <ArticleTemplate data={data} />;
  return <PageTemplate data={data} />;
};

export default TemplateRenderer;
