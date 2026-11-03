"use client";

import { Paraw } from "@/components/atoms/paraw";
import { mergeClassNames } from "@flight-digital/flightdeck/helpers";
import { styled } from "@linaria/react";
import { useEffect, useRef } from "react";

interface Props {
  className?: string;
}

const SCROLL_TIMELINE_SUPPORT = "(animation-timeline: view())";

/**
 * Article reading progress: a paraw (Visayan outrigger) sails from Sugbo to Aotearoa
 * along the bottom of the screen. Progress comes from the `--article-body` view timeline
 * declared on the article template; browsers without scroll-driven animations get a
 * `--reading-progress` value from the scroll listener below instead.
 */
export const ReadingProgress = ({ className }: Props): React.JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar || CSS.supports(SCROLL_TIMELINE_SUPPORT)) return;

    const content = bar.closest(".page-wrapper")?.querySelector(".article-content-area");
    if (!content) return;

    let frame = 0;
    const update = (): void => {
      frame = 0;
      const rect = content.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const progress = distance > 0 ? -rect.top / distance : rect.top <= 0 ? 1 : 0;
      bar.style.setProperty("--reading-progress", `${Math.min(1, Math.max(0, progress))}`);
    };
    const schedule = (): void => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <Wrapper ref={ref} className={mergeClassNames("reading-progress", className)} aria-hidden>
      <span className="reading-progress__label" lang="ceb">
        Sugbo
      </span>
      <div className="reading-progress__track">
        <div className="reading-progress__wake" />
        <div className="reading-progress__boat">
          <Paraw className="reading-progress__paraw" />
        </div>
      </div>
      <span className="reading-progress__label reading-progress__label--end">
        <span className="reading-progress__arrived" lang="ceb">
          Nakaabot na!
        </span>
        <span lang="mi">Aotearoa</span>
      </span>
    </Wrapper>
  );
};

// ============================================
// STYLED COMPONENTS
// ============================================

const Wrapper = styled.div`
  --boat-width: 52rwd;
  --reading-progress: 0;

  position: fixed;
  right: 0;
  bottom: env(safe-area-inset-bottom, 0);
  left: 0;
  z-index: 50;
  display: flex;
  align-items: flex-end;
  gap: 12rwd;
  padding: 0 16rwd 10rwd;
  pointer-events: none;

  .reading-progress__label {
    position: relative;
    flex-shrink: 0;
    padding: 2rwd 8rwd;
    border-radius: 999px;
    background-color: color-mix(in oklch, var(--color-bg) 88%, transparent);
    color: var(--color-fg-muted);
    font-size: 11rwd;
    line-height: 1.4;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transform: translateY(50%);
  }

  .reading-progress__arrived {
    position: absolute;
    right: 0;
    bottom: calc(100% + 6rwd);
    padding: 2rwd 8rwd;
    border-radius: 999px;
    background-color: var(--color-accent);
    color: var(--color-fg-on-dark);
    font-family: var(--font-secondary);
    letter-spacing: 0.02em;
    text-transform: none;
    white-space: nowrap;
    opacity: clamp(0, calc((var(--reading-progress) - 0.97) * 34), 1);
  }

  .reading-progress__track {
    container-type: inline-size;
    position: relative;
    flex: 1 0 0;
    height: 3rwd;
    border-radius: 3rwd;
    background-color: color-mix(in oklch, var(--color-highlight) 35%, transparent);
    /* Keeps the line visible over the article's dark image panel */
    box-shadow: 0 0 0 1rwd color-mix(in oklch, var(--color-bg) 45%, transparent);
  }

  .reading-progress__wake {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-color: var(--color-highlight);
    transform-origin: left;
    scale: var(--reading-progress) 1;
  }

  .reading-progress__boat {
    position: absolute;
    bottom: -7rwd;
    left: 0;
    width: var(--boat-width);
    translate: calc(var(--reading-progress) * (100cqw - var(--boat-width))) 0;
  }

  .reading-progress__paraw {
    filter: drop-shadow(0 0 2px var(--color-bg));
    transform-origin: 50% 85%;
    animation: paraw-bob 3.2s ease-in-out infinite alternate;
  }

  @keyframes paraw-bob {
    from {
      transform: translateY(0) rotate(-2deg);
    }
    to {
      transform: translateY(-1px) rotate(2deg);
    }
  }

  @supports (animation-timeline: view()) {
    .reading-progress__wake {
      animation: wake-fill linear both;
      animation-timeline: --article-body;
      animation-range: contain;
    }

    .reading-progress__boat {
      animation: paraw-sail linear both;
      animation-timeline: --article-body;
      animation-range: contain;
    }

    .reading-progress__arrived {
      animation: arrived linear both;
      animation-timeline: --article-body;
      animation-range: contain 97% contain 100%;
    }
  }

  @keyframes wake-fill {
    from {
      scale: 0 1;
    }
    to {
      scale: 1 1;
    }
  }

  @keyframes paraw-sail {
    from {
      translate: 0 0;
    }
    to {
      translate: calc(100cqw - var(--boat-width)) 0;
    }
  }

  @keyframes arrived {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .reading-progress__paraw {
      animation: none;
    }
  }

  @media --base-down {
    --boat-width: 40rwm;
    gap: 0;
    padding: 0 12rwm 10rwm;

    .reading-progress__label {
      display: none;
    }

    .reading-progress__track {
      height: 3rwm;
      box-shadow: 0 0 0 1rwm color-mix(in oklch, var(--color-bg) 45%, transparent);
    }

    .reading-progress__boat {
      bottom: -6rwm;
    }
  }
`;
