"use client";

import { useEffect, useRef, useState } from "react";
import { styled } from "@linaria/react";

interface Props {
  text: Sanity.Maybe<string>;
  altText: Sanity.Maybe<string>;
  animMS?: number;
  /** Pause (ms) when showing full text or full altText before switching. Default 2000. */
  pauseMS?: number;
}

const INITIAL_DELAY_MS = 600;

type Phase = "text" | "typing" | "alt" | "backspacing";

export const AltText = ({
  text,
  altText,
  animMS = 2000,
  pauseMS = 2000,
}: Props): React.ReactElement | null => {
  const [phase, setPhase] = useState<Phase>("text");
  const [typedLength, setTypedLength] = useState(0);
  const hasLooped = useRef(false);

  const primary = (text ?? "").trim();
  const alt = (altText ?? "").trim();
  const hasAlt = alt.length > 0;

  const display =
    phase === "text"
      ? primary
      : phase === "typing" || phase === "backspacing"
        ? alt.slice(0, typedLength)
        : alt;
  const isTyping = phase === "typing";
  const isBackspacing = phase === "backspacing";
  const showCursor = isTyping || isBackspacing;

  // When on "text": after delay, start typing (initial delay first time, pauseMS when looping)
  useEffect(() => {
    if (!hasAlt || phase !== "text") return;

    const delay = hasLooped.current ? pauseMS : INITIAL_DELAY_MS;
    const id = setTimeout(() => {
      setPhase("typing");
      setTypedLength(0);
    }, delay);

    return () => clearTimeout(id);
  }, [phase, hasAlt, pauseMS]);

  // Typewriter: advance typedLength until full
  useEffect(() => {
    if (phase !== "typing" || typedLength >= alt.length) return;

    const interval = alt.length > 0 ? animMS / alt.length : 0;
    const id = setInterval(() => {
      setTypedLength((n) => Math.min(n + 1, alt.length));
    }, Math.max(16, interval));

    return () => clearInterval(id);
  }, [phase, typedLength, alt.length, animMS, alt]);

  // When typing completes, show "alt" then after pause start backspacing
  useEffect(() => {
    if (phase !== "typing" || typedLength < alt.length || !hasAlt) return;

    setPhase("alt");
  }, [phase, typedLength, alt.length, hasAlt]);

  // Pause on full alt, then start backspacing
  useEffect(() => {
    if (phase !== "alt") return;

    hasLooped.current = true;
    const id = setTimeout(() => {
      setPhase("backspacing");
      setTypedLength(alt.length);
    }, pauseMS);

    return () => clearTimeout(id);
  }, [phase, pauseMS, alt.length]);

  // Backspace: decrement typedLength until 0
  useEffect(() => {
    if (phase !== "backspacing" || typedLength <= 0) return;

    const interval = alt.length > 0 ? animMS / alt.length : 0;
    const id = setInterval(() => {
      setTypedLength((n) => Math.max(n - 1, 0));
    }, Math.max(16, interval));

    return () => clearInterval(id);
  }, [phase, typedLength, alt.length, animMS, alt]);

  // When backspacing reaches 0, go to "text" (infinite loop)
  useEffect(() => {
    if (phase !== "backspacing" || typedLength > 0) return;

    setPhase("text");
  }, [phase, typedLength]);

  if (!primary && !alt) return null;

  return (
    <Wrapper className="alt-text">
      {display}
      {showCursor && <Cursor aria-hidden>|</Cursor>}
    </Wrapper>
  );
};

const Wrapper = styled.span`
  display: inline;
  color: white !important;
`;

const Cursor = styled.span`
  animation: alt-text-blink 0.8s step-end infinite;

  @keyframes alt-text-blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }
`;
