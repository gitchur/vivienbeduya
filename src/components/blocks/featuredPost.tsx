import { mergeClassNames } from "@flight-digital/flightdeck/helpers";
import { styled } from "@linaria/react";
import { format } from "date-fns";
import Image from "@/components/atoms/image";
import Link from "@/components/atoms/link";
import { getLatestArticle } from "@/queries/global";
// import { AlternativeText } from "@/components/atoms/altText";

interface Props {
  data: Sanity.BlockFeaturedPost;
  className?: string;
}

export const FeaturedPost = async ({ data, className }: Props) => {
  if (!data) return null;

  const article = data.getLatest ? await getLatestArticle() : data.post;

  if (!article) return null;

  const { title, description, image, tags, author, publishDate, alternativeDescription } = article;
  const formattedDate = publishDate
    ? format(new Date(publishDate), "dd MMM, yyyy").toUpperCase()
    : null;
  const authorName = [author?.firstName, author?.lastName].filter(Boolean).join(" ");
  const firstTag = tags?.[0];

  return (
    <Wrapper className={mergeClassNames("featured-post", className)}>
      {image && <Image data={image} className="featured-post__bg" loading="eager" />}
      <div className="featured-post__overlay" />

      <div className="featured-post__body">
        <div>
          <div className="featured-post__meta">
            {firstTag?.name && (
              <span className="featured-post__tag small">{firstTag.name}</span>
            )}
            {(authorName || formattedDate) && (
              <p className="featured-post__byline small">
                {authorName && <>BY {authorName.toUpperCase()}</>}
                {authorName && formattedDate && <span className="featured-post__dot"> · </span>}
                {formattedDate}
              </p>
            )}
          </div>
          <h1 className={mergeClassNames("featured-post__title", "h2")}>{title}</h1>
        </div>

        <div className="featured-post__side">
          {/* {description && <AlternativeText text={description} altText={alternativeDescription} />} */}
          <div>{description}</div>
          <Link
            data={{ slug: article.slug, _type: article._type, _id: article._id, title } as Sanity.Article}
            className="design accent"
          >
            Read the story →
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 80dvh;
  padding: 48rwd var(--theme-page-horizontal-padding);
  color: var(--color-white);

  .featured-post__bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }

  .featured-post__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to left,
      color-mix(in srgb, var(--bark-900) 0%, transparent) 0%,
      color-mix(in srgb, var(--bark-900) 100%, transparent) 100%
    );
    z-index: 1;
  }

  .featured-post__meta {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 16rwd;
    padding-bottom: 16rwd;
  }

  .featured-post__tag {
    padding: 4rwd 12rwd;
    border: 1px solid var(--color-white);
    border-radius: 999px;
    white-space: nowrap;
  }

  .featured-post__byline {
    opacity: 0.85;
    margin: 0;
  }

  .featured-post__dot {
    opacity: 0.6;
  }

  .featured-post__body {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 36rwd;
    width: 420rwd;
  }

  .featured-post__title {
    flex: 1 0 0;
    margin: 0;
    color: var(--color-white);
  }

  .featured-post__side {
    flex: 0 0 40%;
    display: flex;
    flex-direction: column;
    gap: 24rwd;
  }

  .featured-post__description {
    margin: 0;
    font-style: italic;
    opacity: 0.9;
  }

  .featured-post__cta {
    display: inline-flex;
    align-items: center;
    gap: 8rwd;
    padding: 12rwd 24rwd;
    border: 1px solid var(--color-white);
    color: var(--color-white);
    text-decoration: none;
    letter-spacing: 0.08em;
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover {
      background-color: var(--color-white);
      color: var(--bark-900);
    }
  }

  @media --base-down {
    min-height: 90dvh;
    padding: 32rwm var(--theme-page-horizontal-padding);

    .featured-post__meta {
      gap: 12rwm;
      flex-wrap: wrap;
    }

    .featured-post__body {
      flex-direction: column;
      align-items: flex-start;
      gap: 24rwm;
    }

    .featured-post__side {
      flex: unset;
      width: 100%;
      gap: 16rwm;
    }
  }
`;
