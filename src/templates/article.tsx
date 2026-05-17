import Blocks from "@/components/blocks/blocks";
import PostTitle from "@/components/molecules/postTitle";
import { styled } from "@linaria/react";
import { getNextReadPost } from "@/queries/global";
import Link from "@/components/atoms/link";
import { ArticleCard } from "@/components/blocks/articlesList/articleCard";
import { AlternativeText } from "@/components/atoms/altText";

interface Props {
  data: Sanity.Article;
}

export default async function ArticleTemplate({ data }: Props) {
  const nextRead = await getNextReadPost(data?._id);

  const NextRead = () => (
    <Link data={nextRead} alwaysReturnLink className="next-read">
      <AlternativeText text="Next Read" altText="Sunod nga basahonon" />
      <ArticleCard data={nextRead} horizontal asLink={false} />
    </Link>
  )

  return (
    <Wrapper>
      <PostTitle data={data}>
        <NextRead />
      </PostTitle>
      <div className="article-content-area">
        <Blocks data={data?.blocks} />
      </div>
      <div className="next-read-mobile">
        <NextRead />
      </div>
    </Wrapper>
  );
};


const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rwd;
  .article-content-area {
    padding-top: 64rwd;
    display: flex;
    flex-direction: column;
    gap: 32rwd;

    > .block.paragraph:not(.block.paragraph ~ .block.paragraph) p:first-of-type::first-letter {
      float: left;
      font-family: var(--font-secondary);
      font-size: 55rwd;
      line-height: 0.85;
      font-weight: var(--font-weight-bold);
      color: var(--color-accent);
      text-transform: uppercase;
      letter-spacing: -0.02em;
      transition: all 0.3s ease;

      background: linear-gradient(
        135deg,
        color-mix(in srgb, var(--color-accent) 12%, transparent) 0%,
        color-mix(in srgb, var(--color-highlight) 8%, transparent) 100%
      );
      border-left: 3rwd solid var(--color-highlight);
      border-radius: 4rwd 0 0 4rwd;
      padding: 8rwd 10rwd 8rwd 12rwd;
      margin: 0 12rwd 0 0;
      box-shadow: 0 8rwd 8rwd color-mix(in srgb, var(--color-accent) 0.15, transparent);

      &:hover {
        margin: 0;
      }
    }
  }

  .next-read-mobile {
    display: none;
  }

  .next-read-desktop {
    width: 75%;
    cursor: pointer;
    img {
      max-width: 170rwd;
      height: 100rwd;
    }
    h4 {
      font-size: 20rwd;
    }
  }

  .article-card {
    padding-top: 8rwd;
  }

  .alt-text {
    font-family: var(--font-secondary);
  }

  @media --base-down {
    display: flex;
    flex-direction: column;
    .next-read-mobile {
      display: flex;
      margin: 0 16rwm;
        .next-read {
          color: var(--color-fg-on-dark);
        display: flex;
        flex-direction: column;
        gap: 8rwm;
        .content {
          display: flex;
          flex-direction: row;
          gap: 8rwm;
          img {
            width: 160rwm;
          }
        }

      }
    }

    .article-content-area {
      z-index: 1;
      padding: 16rwm 0;
    }
    .block {
      padding: 16rwm;
      margin: 0 8rwm;
      background-color: var(--color-bg);
    }
  }

  .post-content {
    --theme-page-horizontal-padding: 0;
    padding: 20rwd 0;

    @media --base-down {
      padding: 0;
    }

    .block {
      scroll-margin-top: 120rwd;

      @media --base-down {
        scroll-margin-top: 100rwm;
      }
    }
  }
`;
