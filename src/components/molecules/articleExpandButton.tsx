"use client";

import { useState, useRef, useCallback } from "react";
import { styled } from "@linaria/react";

export const ArticleExpandButton = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  const toggle = useCallback(() => {
    const next = !expanded;
    setExpanded(next);
    const wrapper = ref.current?.closest<HTMLElement>(".article-wrapper");
    if (!wrapper) return;
    if (next) {
      wrapper.setAttribute("data-expanded", "true");
    } else {
      wrapper.removeAttribute("data-expanded");
    }
  }, [expanded]);

  return (
    <Button
      ref={ref}
      onClick={toggle}
      aria-label={expanded ? "Collapse article" : "Expand article to full width"}
      aria-pressed={expanded}
      data-expanded={expanded || undefined}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M5 2L10 7L5 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  );
};


const Button = styled.button`
  width: 40rwd;
  height: 40rwd;
  border-radius: 50%;
  border: 1px solid var(--color-black);
  background-color: var(--color-white);
  color: var(--color-black);
  cursor: pointer;
  pointer-events: auto;
  flex-shrink: 0;
  transform: translateX(50%);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(180deg);
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;

  svg {
    transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &[data-expanded] {
    transform: rotate(0deg);
  }

  background-color: var(--coastal-teal);
  border-color: var(--coastal-teal);
  color: var(--color-white);


  &:focus-visible {
    outline: 2px solid var(--coastal-teal);
    outline-offset: 2px;
  }
`;
