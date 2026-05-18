import { styled } from "@linaria/react";
import { format } from "date-fns";
import Image from "@/components/atoms/image";
import { Sharing } from "./sharing";
import PostDetails from "./postDetails";

interface Props {
  data: Maybe<Sanity.Article>;
  children?: React.ReactNode;
}

export default async function PostTitle({ data, children }: Props) {
  if (!data) return null;

  const { title } = data;
  const publishDate = data?.publishDate ? format(new Date(data?.publishDate), "dd MMMM yyyy") : null;

  return (
    <Wrapper className="post-title-area">
      {data?.image?.desktopImage?.asset && (
        <Image data={data?.image} loading="eager" className="background-image" />
      )}
      <div className="date-and-read-time">
        <p className="date">{publishDate}</p>
      </div>
      <h1 className="h3">{title}</h1>
      <PostDetails data={data} />
      <div className="social-medias">
        <Sharing />
      </div>
      <div className="next-read-desktop">
        {children}
      </div>
    </Wrapper>
  );
};


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16rwd;
  position: sticky;
  top: 0;
  min-height: 100dvh;
  height: fit-content;
  padding: 32rwd;
  color: var(--color-fg-on-dark);

  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    object-position: center;
    filter: brightness(0.6);
  }

  .date-and-read-time {
    display: flex;
    align-items: center;

    p {
      font-size: 13rw;
    }
  }
  .next-read-desktop {
    margin-top: auto;

    .small {
      margin-bottom: 10rw;
    }

    .content {
      display: flex;
      gap: 10rw;

      .image {
        width: 130rwd;
        min-width: 130rwd;
        height: 80rwd;
        object-fit: cover;

      }
    }
  }

  .read-time {
    font-size: 13rw;
  }

  .social-medias {
    display: flex;
    align-items: center;
    gap: 10rw;
  }

  @media --base-down {
    padding: 16rwm;
    gap: 16rwm;
    position: relative;
    justify-content: flex-end;

    .background-image {
      position: fixed;
    }
    
    .next-read-desktop {
      display: none;
    }
  }
`;
