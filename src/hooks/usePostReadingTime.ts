"use client";

import { useState, useEffect } from "react";

export default function usePostReadingTime(elementClass = ".rich-text") {
  const [readTime, setReadTime] = useState(0);

  useEffect(() => {
    if (!Boolean(elementClass)) return;
    const richTextElements = Array.from(document.querySelectorAll<HTMLDivElement>(elementClass));
    const allText = richTextElements.map((el) => el.textContent || el.innerText || "").join(" ");
    const words = allText.trim().split(/\s+/).length;
    const readingSpeed = 150;
    const readingTime = Math.ceil(words / readingSpeed);

    setReadTime(readingTime);
  }, [elementClass]);

  return readTime;
}
