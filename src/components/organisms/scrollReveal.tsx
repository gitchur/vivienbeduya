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

const STAGGER_MS = 90;
const MAX_STAGGER_STEPS = 5;
// Covers the CSS animation duration plus the largest stagger delay
const CLEANUP_FALLBACK_MS = 800 + STAGGER_MS * MAX_STAGGER_STEPS + 200;

const isInViewport = (el: Element): boolean => {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
};

const collectTargets = (node: Element): HTMLElement[] => {
  const targets = Array.from(node.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
  if (node instanceof HTMLElement && node.matches(REVEAL_SELECTOR)) targets.unshift(node);
  return targets;
};

const clearReveal = (el: HTMLElement): void => {
  el.removeAttribute("data-reveal");
  el.style.removeProperty("--reveal-delay");
};

const playReveal = (el: HTMLElement, delayMs: number): void => {
  el.style.setProperty("--reveal-delay", `${delayMs}ms`);
  el.dataset.reveal = "in";

  const handleEnd = (event: AnimationEvent): void => {
    if (event.target !== el) return;
    el.removeEventListener("animationend", handleEnd);
    clearReveal(el);
  };
  el.addEventListener("animationend", handleEnd);
  window.setTimeout(() => clearReveal(el), CLEANUP_FALLBACK_MS + delayMs);
};

/**
 * Fades content in as it scrolls into view. Content is always server rendered and
 * visible by default: elements are only hidden once this has run, and never if they
 * are already on screen, so crawlers, no-JS visitors and reduced-motion users see
 * everything immediately.
 */
export const ScrollReveal = (): null => {
  useEffect(() => {
    const root = document.querySelector("main");
    if (!root || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
          playReveal(el, Math.min(index, MAX_STAGGER_STEPS) * STAGGER_MS);
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
        el.dataset.reveal = "pending";
        observer.observe(el);
      }
    };

    register(collectTargets(root), true);
    document.documentElement.classList.add("reveal-ready");

    // Picks up content added later: client-side navigation, streamed Suspense
    // boundaries and "load more" results
    const mutationObserver = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) register(collectTargets(node), false);
        });
      }
    });
    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      document.documentElement.classList.remove("reveal-ready");
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach(clearReveal);
    };
  }, []);

  return null;
};
