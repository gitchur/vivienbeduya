import Image from "@/components/atoms/image";

import { StickyImagePanel } from "@/templates/pageLayout.styles";
import { styled } from "@linaria/react";

interface Props {
  data: Maybe<AuthorPageData>;
}

export default function AuthorProfile({ data }: Props): React.JSX.Element | null {
  if (!data) return null;

  const { firstName, lastName, image, bio } = data;
  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  return (
    <Wrapper className="author-profile-area">
      {image?.desktopImage?.asset && (
        <Image data={image} loading="eager" className="background-image" />
      )}
    </Wrapper>
  );
}

const Wrapper = styled(StickyImagePanel)`

  .author-profile__bio {
    max-width: 480rwd;
  }

  @media --base-down {
    .author-profile__bio {
      max-width: 100%;
    }
  }
`;
