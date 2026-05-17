import validateType from "@/utils/validateType";
import { getImageWidthFromColumnSpace } from "@flight-digital/flightdeck/helpers";
import ErrorInspector from "@flight-digital/flightdeck/pebbles/errorInpector";
import Gap from "@flight-digital/flightdeck/pebbles/gap";
import Image from "../atoms/image";
import Accordion from "../molecules/accordion";
import ButtonsList from "../molecules/buttonsList";
import CtaCard from "../molecules/ctaCard";
import RichText from "../molecules/richText";
import { Code } from "../molecules/code";

interface Props {
  data: Maybe<Sanity.AccordionOrAdaptiveImageOrButtonsListOrCodeBlockOrCtaCardOrGapOrRichTextOrVideo>;
  columnSpaces?: Maybe<number>;
}

// When adding a new primitive blocks to the CMS, add the component here to be rendered in the grid or container blocks
const PrimitiveBlock = async ({ data, columnSpaces }: Props) => {
  if (!data) return null;

  const imageWidth = getImageWidthFromColumnSpace(columnSpaces ?? 12, 100);

  const Component = () => {
    if (validateType.isButtonsList(data)) {
      return (
        <ButtonsList data={data} />
      );
    }

    if (validateType.isGap(data)) {
      return <Gap data={data} separatorColor="#9FA6A2" />;
    }

    if (
      validateType.isAdaptiveImage(data) ||
      validateType.isResponsiveImage(data) ||
      validateType.isImageWithMeta(data)
    ) {
      return (
        <Image data={data as Sanity.AdaptiveImage} width={imageWidth} />
      );
    }

    if (validateType.isRichText(data)) {
      return (
        <RichText data={data as Sanity.RichText} imageWidth={imageWidth} />
      );
    }

    if (validateType.isAccordion(data)) {
      return (
        <Accordion data={data as Sanity.Accordion} />
      );
    }

    if (validateType.isCtaCard(data)) {
      return (
        <CtaCard data={data as Sanity.CtaCard} />
      );
    }

    if (validateType.isCodeBlock(data)) {
      return (
        <Code data={data as Sanity.CodeBlock} />
      );
    }

    return (
      <ErrorInspector msg={`No component for ${data._type}`} data={data} />
    );
  }

  return (
    <Component />
  );
};

export default PrimitiveBlock;
