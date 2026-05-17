"use client";

import Image from "@/components/atoms/image";
import { mergeClassNames } from "@flight-digital/flightdeck/helpers";
import { styled } from "@linaria/react";
import { useState } from "react";
import Link from "@/components/atoms/link";
import { format } from "date-fns";

interface Props {
  data: Sanity.Maybe<Sanity.Article>;
  className?: string;
  horizontal?: boolean;
}

export const ArticleCard = ({ data, className, horizontal = false }: Props) => {
  const [hovered, setHovered] = useState(false);
  if (!data) return null;

  const { title, description, alternativeTitle, alternativeDescription, publishDate, tags } = data;

  const altTitle = alternativeTitle?.trim() ?? "";
  const altDescription = alternativeDescription?.trim() ?? "";
  const hasAlt = !!(altTitle || altDescription);
  const showAlt = hovered && hasAlt;
  const postDate = publishDate ? format(new Date(publishDate), "dd MMMM yyyy") : null;
  const firstTag = tags?.[0];

  return (
    <Card
      className={mergeClassNames("article-card", className, horizontal ? "horizontal" : "")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data={{ slug: data?.slug }}
    >
      <div className="article-card__image-wrapper">
        <Image data={data?.image} />
        {firstTag?.name && (
          <span className="article-card__tag small">{firstTag.name}</span>
        )}
      </div>
      <ContentBlock>
        <FadeLayer $visible={!hasAlt || !showAlt} $isAlt={false}>
          <h5 className="article-card__title">{title}</h5>
        </FadeLayer>
        {hasAlt && (
          <FadeLayer $visible={showAlt} $isAlt>
            <h5 className="article-card__title alternative" aria-label={altTitle}>
              {altTitle}
            </h5>
          </FadeLayer>
        )}
      </ContentBlock>
      {!horizontal &&
        <ContentBlock>
          <FadeLayer $visible={!hasAlt || !showAlt} $isAlt={false}>
            <p className="article-card__description">{description}</p>
          </FadeLayer>
          {hasAlt && (
            <FadeLayer $visible={showAlt} $isAlt>
              <p className="article-card__description alternative" aria-label={altDescription}>
                {altDescription}
              </p>
            </FadeLayer>
          )}
        </ContentBlock>
      }
      {!horizontal &&
        <div className="article-meta">
          <p className="article-meta__date">{postDate}</p>
          <div className="article-meta__separator">•</div>
          <p className="article-meta__read-time">{data?.suggestedReadTime} min read</p>
        </div>
      }
    </Card>
  );
};

const CARD_TRANSITION = "0.35s ease";

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 16rwd;
  padding: 24rwd;
  background-color: var(--color-bg-recessed);
  transition:
    border-color ${CARD_TRANSITION},
    box-shadow ${CARD_TRANSITION},
    transform ${CARD_TRANSITION};

  color: var(--bark-800) !important;

  &:hover {
    border-color: var(--color-fg);
    box-shadow: 0 4rwd 20rwd rgba(0, 0, 0, 0.2);
    transform: translateY(-2rwd);
  }

  .article-card__image-wrapper {
    position: relative;
  }

  .image {
    width: 100%;
    height: 250rwd;
    object-fit: cover;
  }

  .article-card__tag {
    position: absolute;
    top: 12rwd;
    left: 12rwd;
    padding: 4rwd 10rwd;
    border-radius: 999px;
    background-color: var(--color-bg-recessed);
    color: var(--bark-700);
    pointer-events: none;
  }

  .article-card__title {
    margin: 0;
    display: inline;
    color: var(--color-fg-on-dark);
    background: var(--bark-700);
    line-height: 1.4;
    padding: 0 8rwd;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }

  .alternative {
    font-style: italic;
  }

  .article-card__description {
    margin: 0;
  }

  .article-meta {
    display: flex;
    gap: 8rwd;
    font-family: monospace;
    margin-top: auto;
    opacity: 0.5;
    align-items: center;
    p {
      font-size: 12rwd;
    }
  }

  &.horizontal {
    flex-direction: row;
    gap: 8rwd;
    padding: 0;
    align-items: center;
    background-color: transparent;

    .image {
      aspect-ratio: 4 / 3;
      height: 100%;
      object-fit: cover;
    }
  }

  @media --base-down {
    gap: 12rwm;
    padding: 12rwm;

    .image {
      height: 200rwm;
    }

    .article-card__tag {
      top: 8rwm;
      left: 8rwm;
      padding: 4rwm 8rwm;
    }

    &.horizontal {
      flex-direction: column;
    }
  }
`;

const FADE_DURATION = "0.25s ease";

/* Grid: both layers sit in the same cell so row height = max(default, alt) */
const ContentBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
`;

const FadeLayer = styled.div<{ $visible: boolean; $isAlt?: boolean }>`
  grid-column: 1;
  grid-row: 1;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  pointer-events: ${(p) =>
    p.$isAlt ? (p.$visible ? "auto" : "none") : "auto"};
  transition: opacity ${FADE_DURATION};
  min-height: 0;
`;

