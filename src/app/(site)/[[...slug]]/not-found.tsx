import { Paraw } from "@/components/atoms/paraw";
import { ArticleCard } from "@/components/blocks/articlesList/articleCard";
import { getArticlesList } from "@/queries/lists";
import { styled } from "@linaria/react";
import Link from "next/link";

const LATEST_STORIES_COUNT = 3;

const NotFound = async () => {
  const latestStories = await getArticlesList(0, LATEST_STORIES_COUNT);

  return (
    <Wrapper>
      <section className="lost-at-sea">
        <div className="lost-at-sea__scene" aria-hidden>
          <div className="lost-at-sea__waves lost-at-sea__waves--back" />
          <div className="lost-at-sea__boat">
            <Paraw className="lost-at-sea__paraw" />
          </div>
          <div className="lost-at-sea__waves lost-at-sea__waves--front" />
        </div>

        <p className="lost-at-sea__code">404</p>
        <h1 className="h2" lang="ceb">
          Nawala ka, bai?
        </h1>
        <p className="lost-at-sea__translation">Are you lost, friend?</p>
        <p className="lost-at-sea__message p-big">
          Page not found.
        </p>

        <div className="lost-at-sea__actions">
          <Link href="/" className="design bark">
            <span>
              <span lang="ceb">Uli na ta</span> · Home
            </span>
          </Link>
          <Link href="/articles" className="design accent">
            <span>
              <span lang="ceb">Basaha ang mga istorya</span> · Stories
            </span>
          </Link>
        </div>
      </section>

      {latestStories?.length ? (
        <section className="lost-at-sea__stories">
          <h2 className="h4">
            <span lang="ceb">Mga bag-ong istorya</span>
            <span className="lost-at-sea__stories-translation"> · New stories</span>
          </h2>
          <div className="articles-list-grid">
            {latestStories.map((article) => (
              <ArticleCard key={article._id} data={article} />
            ))}
          </div>
        </section>
      ) : null}
    </Wrapper>
  );
};

export default NotFound;

// ============================================
// STYLED COMPONENTS
// ============================================

// One wave crest, repeated horizontally as a mask so the colour comes from tokens
const WAVE_MASK = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 20' preserveAspectRatio='none'%3E%3Cpath d='M0 10Q30 0 60 10T120 10V20H0Z'/%3E%3C/svg%3E")`;

const Wrapper = styled.div`
  --wave-width: round(160rwd, 1px);
  --boat-drift: 60rwd;

  display: flex;
  flex-direction: column;
  gap: 96rwd;
  min-height: calc(100dvh - var(--header-height));
  padding: 48rwd var(--theme-page-horizontal-padding) 96rwd;

  .lost-at-sea {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 640rwd;
    margin: 0 auto;
    text-align: center;
  }

  .lost-at-sea__scene {
    position: relative;
    width: 100%;
    height: 140rwd;
    margin-bottom: 24rwd;
    overflow: hidden;
    mask-image: linear-gradient(to right, transparent, black 18%, black 82%, transparent);
  }

  .lost-at-sea__waves {
    position: absolute;
    left: calc(var(--wave-width) * -1);
    width: calc(100% + var(--wave-width) * 2);
    mask-image: ${WAVE_MASK};
    mask-size: var(--wave-width) 100%;
    mask-repeat: repeat-x;
    -webkit-mask-image: ${WAVE_MASK};
    -webkit-mask-size: var(--wave-width) 100%;
    -webkit-mask-repeat: repeat-x;
  }

  .lost-at-sea__waves--back {
    bottom: 14rwd;
    height: 30rwd;
    background-color: color-mix(in oklch, var(--color-highlight) 45%, transparent);
    animation: waves-drift 9s linear infinite reverse;
  }

  .lost-at-sea__waves--front {
    bottom: 0;
    height: 26rwd;
    background-color: var(--color-highlight);
    animation: waves-drift 6s linear infinite;
  }

  .lost-at-sea__boat {
    position: absolute;
    bottom: 18rwd;
    left: 50%;
    width: 96rwd;
    margin-left: -48rwd;
    animation: boat-drift 11s ease-in-out infinite alternate;
  }

  .lost-at-sea__paraw {
    transform-origin: 50% 85%;
    animation: boat-bob 2.8s ease-in-out infinite alternate;
  }

  .lost-at-sea__code {
    margin-bottom: 8rwd;
    color: var(--color-highlight);
    font-weight: var(--font-weight-bold);
    letter-spacing: 0.3em;
  }

  .lost-at-sea__translation {
    margin-top: 4rwd;
    color: var(--color-fg-muted);
    font-family: var(--font-secondary);
    font-style: italic;
  }

  .lost-at-sea__message {
    margin-top: 16rwd;
  }

  .lost-at-sea__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16rwd;
    margin-top: 32rwd;
  }

  .lost-at-sea__stories {
    display: flex;
    flex-direction: column;
    gap: 24rwd;
  }

  .lost-at-sea__stories-translation {
    color: var(--color-fg-muted);
    font-weight: var(--font-weight-light);
  }

  @keyframes waves-drift {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(var(--wave-width));
    }
  }

  @keyframes boat-drift {
    from {
      transform: translateX(calc(var(--boat-drift) * -1));
    }
    to {
      transform: translateX(var(--boat-drift));
    }
  }

  @keyframes boat-bob {
    from {
      transform: translateY(0) rotate(-4deg);
    }
    to {
      transform: translateY(-4rwd) rotate(3deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .lost-at-sea__waves,
    .lost-at-sea__boat,
    .lost-at-sea__paraw {
      animation: none;
    }
  }

  @media --base-down {
    --wave-width: round(120rwm, 1px);
    --boat-drift: 40rwm;

    gap: 56rwm;
    padding: 32rwm var(--theme-page-horizontal-padding) 56rwm;

    .lost-at-sea__scene {
      height: 110rwm;
      margin-bottom: 16rwm;
    }

    .lost-at-sea__waves--back {
      bottom: 10rwm;
      height: 24rwm;
    }

    .lost-at-sea__waves--front {
      height: 20rwm;
    }

    .lost-at-sea__boat {
      bottom: 14rwm;
      width: 72rwm;
      margin-left: -36rwm;
    }

    .lost-at-sea__code {
      margin-bottom: 8rwm;
    }

    .lost-at-sea__message {
      margin-top: 12rwm;
    }

    .lost-at-sea__actions {
      gap: 12rwm;
      margin-top: 24rwm;
    }

    .lost-at-sea__stories {
      gap: 16rwm;
    }
  }
`;
