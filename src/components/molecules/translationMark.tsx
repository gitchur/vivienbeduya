"use client";

import useOnClickOutside from "@flight-digital/flightdeck/hooks/useOnClickOutside";
import { ChildrenRender } from "@flight-digital/flightdeck/rocks/richText";
import { useEffect, useRef, useState } from "react";
import { RiTranslate } from "react-icons/ri";

interface TranslationValue {
  _type?: string;
  text?: string | null;
}

interface TranslationMarkProps {
  value?: TranslationValue | null;
  children: React.ReactNode;
  rootValue?: unknown;
}

export const TranslationMark = ({
  value,
  children,
  rootValue,
}: TranslationMarkProps) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLSpanElement>(null);
  useOnClickOutside(rootRef, () => setOpen(false));

  const translatedText = value?.text?.trim() ?? "";
  const showTranslation = open && translatedText.length > 0;

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  return (
    <span ref={rootRef} className="translation-mark">
      {showTranslation ? (
        <span className="translation-mark__translated" lang="en" aria-label={translatedText}>
          {translatedText}
        </span>
      ) : (
        <ChildrenRender
          children={children}
          rootValue={rootValue}
          callback={(child, childProps) => (
            <span className="translation-mark__original" lang="ceb" {...childProps}>
              {child}
            </span>
          )}
        />
      )}
      {translatedText.length > 0 && (
        <button
          type="button"
          className="translation-mark__trigger"
          onClick={toggle}
          aria-label={open ? "Show original text" : "Show translation"}
          aria-expanded={open}
          title={open ? "Show original" : "Show translation"}
        >
          <RiTranslate aria-hidden />
        </button>
      )}
    </span>
  );
};
