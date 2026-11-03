"use client";

import { useEffect } from "react";

// Whole blocks, except those whose children are revealed individually below
const REVEAL_SELECTOR = [
  "main .block:not(.grid, .container, .articlesList, .paragraph)",
  "main .grid-column",
  "main .container-item",
  "main .articles-list-wrapper > .top-area",
  "main .article-card",
  "main .block.paragraph > .rich-text > *",
].join(",");

const REVEAL_DURATION_MS = 800;
const REVEAL_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
const STAGGER_MS = 90;
const MAX_STAGGER_STEPS = 5;
const FALLBACK_DISTANCE = "24px";

const isInViewport = (el: Element): boolean => {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
};

const collectTargets = (node: Element): HTMLElement[] => {
  const targets = Array.from(node.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
  if (node instanceof HTMLElement && node.matches(REVEAL_SELECTOR)) targets.unshift(node);
  return targets;
};

// Responsive distance from the global styles, so it follows the rwd/rwm scale
const getRevealDistance = (): string =>
  getComputedStyle(document.documentElement).getPropertyValue("--reveal-distance").trim() ||
  FALLBACK_DISTANCE;

/**
 * Fades content in as it scrolls into view. Content is always server rendered and
 * visible by default: elements are only hidden once this has run, and never if they
 * are already on screen, so crawlers, no-JS visitors and reduced-motion users see
 * everything immediately.
 *
 * Uses the Web Animations API rather than attributes or classes, so tagging content
 * that streams in before React hydrates it never causes a hydration mismatch.
 */
export const ScrollReveal = (): null => {
  useEffect(() => {
    const root = document.querySelector("main");
    if (!root || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Holds each waiting element at opacity 0 until it scrolls into view
    const holds = new Map<HTMLElement, Animation>();

    const hide = (el: HTMLElement): void => {
      holds.set(
        el,
        el.animate([{ opacity: 0 }, { opacity: 0 }], { duration: 1, fill: "forwards" }),
      );
    };

    const reveal = (el: HTMLElement, delayMs: number): void => {
      holds.get(el)?.cancel();
      holds.delete(el);
      // A single "from" keyframe animates back to the element's own styles
      el.animate([{ opacity: 0, transform: `translateY(${getRevealDistance()})`, offset: 0 }], {
        duration: REVEAL_DURATION_MS,
        delay: delayMs,
        easing: REVEAL_EASING,
        fill: "backwards",
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // Stagger siblings that enter the viewport together, e.g. a row of cards
        const batchIndexByParent = new Map<Element | null, number>();

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);

          const index = batchIndexByParent.get(el.parentElement) ?? 0;
          batchIndexByParent.set(el.parentElement, index + 1);
          reveal(el, Math.min(index, MAX_STAGGER_STEPS) * STAGGER_MS);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    const tracked = new WeakSet<Element>();

    const register = (targets: HTMLElement[], skipVisible: boolean): void => {
      for (const el of targets) {
        if (tracked.has(el)) continue;
        tracked.add(el);
        // Never hide what the visitor (or a crawler's viewport) can already see
        if (skipVisible && isInViewport(el)) continue;
        hide(el);
        observer.observe(el);
      }
    };

    register(collectTargets(root), true);

    // Picks up content added later: client-side navigation, streamed Suspense
    // boundaries and "load more" results
    const mutationObserver = new MutationObserver((records) => {
      let removedNodes = false;
      for (const record of records) {
        removedNodes ||= record.removedNodes.length > 0;
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) register(collectTargets(node), false);
        });
      }
      if (!removedNodes) return;

      // Forget content that left the page before it was ever revealed
      holds.forEach((hold, el) => {
        if (el.isConnected) return;
        hold.cancel();
        holds.delete(el);
        observer.unobserve(el);
      });
    });
    mutationObserver.observe(root, { childList: true, subtree: true });

    // Printed pages show everything, including content never scrolled to
    const revealAll = (): void => {
      holds.forEach((hold) => hold.cancel());
      holds.clear();
    };
    window.addEventListener("beforeprint", revealAll);

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("beforeprint", revealAll);
      revealAll();
    };
  }, []);

  return null;
};
