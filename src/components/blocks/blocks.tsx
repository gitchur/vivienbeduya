import BlocksList from "@flight-digital/flightdeck/blocks/blocksList";
import BlockCarousel from "@flight-digital/flightdeck/blocks/carousel";
import BlockContainer from "@flight-digital/flightdeck/blocks/container";
import CustomBlock from "@flight-digital/flightdeck/blocks/customBlock";
import BlockGap from "@flight-digital/flightdeck/blocks/gap";
import BlockGrid from "@flight-digital/flightdeck/blocks/grid";
import RichText from "../molecules/richText";
import BlockArticlesList from "./articlesList/articlesList";
import { ArticlesListSearchParams } from "./articlesList/searchParams";
import { FeaturedPost } from "./featuredPost";
// import { BlockStaggerProvider } from "./animatedBlockWrapper";
import { Marquee } from "./marquee";
import PrimitiveBlock from "./primitiveBlocks";

interface Props {
  data?: Sanity.Maybe<Partial<Sanity.Blocks>>;
  searchParams?: ArticlesListSearchParams;
}

const Blocks = ({ data, searchParams }: Props) => {
  if (!data?.list?.length) return null;

  return (
    <BlocksList data={data.list}>
      <CustomBlock<Sanity.BlockCarousel>
        blockType="block.carousel"
        element={(elData) => (
          <BlockCarousel
            data={elData}
            primitiveBlockRenderer={(el) => <PrimitiveBlock data={el} />}
          />
        )}
      />
      <CustomBlock<Sanity.BlockContainer>
        blockType="block.container"
        element={(elData) => (
          <BlockContainer
            data={elData}
            primitiveBlockRenderer={(el) => <PrimitiveBlock data={el} />}
          />
        )}
      />
      <CustomBlock<Sanity.BlockGap>
        blockType="block.gap"
        element={(elData) => <BlockGap data={elData} />}
      />
      <CustomBlock<Sanity.BlockGrid>
        blockType="block.grid"
        element={(elData) => (
          <BlockGrid
            data={elData}
            primitiveBlockRenderer={(el, columnSpaces) => (
              <PrimitiveBlock data={el} columnSpaces={columnSpaces} />
            )}
          />
        )}
      />
      <CustomBlock<Sanity.BlockParagraph>
        blockType="block.paragraph"
        element={(elData) => <RichText data={elData.content} data-sanity-path="content" />}
      />
      <CustomBlock<Sanity.Component>
        blockType="component"
        element={(elData) => <Blocks data={{ list: elData as any }} searchParams={searchParams} />}
      />
      {/* --- End of internal blocks, custom blocks below --- */}
      <CustomBlock<Sanity.BlockArticlesList>
        blockType="block.articlesList"
        element={(elData) => <BlockArticlesList data={elData} searchParams={searchParams} />}
      />
      <CustomBlock<Sanity.BlockFeaturedPost>
        blockType="block.featuredPost"
        element={(elData) => <FeaturedPost data={elData} />}
      />
      <CustomBlock<Sanity.BlockMarquee>
        blockType="block.marquee"
        element={(elData) => <Marquee data={elData} />}
      />
    </BlocksList>
  );
};

export default Blocks;
