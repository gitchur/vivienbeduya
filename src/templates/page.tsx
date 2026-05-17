import Blocks from "@/components/blocks/blocks";

interface Props {
  data: Sanity.Page;
}

const PageTemplate = ({ data }: Props) => {
  return <Blocks data={data?.blocks} />;
};

export default PageTemplate;
