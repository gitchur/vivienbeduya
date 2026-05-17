import { useEffect } from "react";
import { NumberInputProps, PatchEvent, set, useFormValue } from "sanity";

const READING_SPEED_WPM = 150;

/**
 * Recursively walks any value and collects text from every Portable Text span
 * (`_type === "span"` with a `text` property). This covers richText primitives
 * nested arbitrarily deep inside Flightdeck layout blocks.
 */
function extractText(value: unknown): string {
  if (!value || typeof value !== "object") return "";

  const texts: string[] = [];

  function traverse(obj: unknown): void {
    if (!obj || typeof obj !== "object") return;
    if (Array.isArray(obj)) {
      obj.forEach(traverse);
      return;
    }
    const record = obj as Record<string, unknown>;
    if (record._type === "span" && typeof record.text === "string") {
      texts.push(record.text);
      return;
    }
    Object.values(record).forEach(traverse);
  }

  traverse(value);
  return texts.join(" ");
}

function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return words > 0 ? Math.ceil(words / READING_SPEED_WPM) : 0;
}

/**
 * Custom Sanity Studio input for the `suggestedReadTime` field.
 *
 * Watches the document's top-level `blocks` field, extracts all readable text
 * from Portable Text spans inside it, then auto-patches this number field with
 * the calculated reading time (in minutes). The field is rendered as read-only
 * in the Studio — editors cannot change it manually.
 */
export const ReadingTimeInput = (props: NumberInputProps) => {
  const { onChange, value } = props;
  const blocks = useFormValue(["blocks"]);

  useEffect(() => {
    const text = extractText(blocks);
    const readingTime = calculateReadingTime(text);

    if (readingTime !== value) {
      onChange(PatchEvent.from(set(readingTime)));
    }
  }, [blocks, onChange, value]);

  return (
    <div
      style={{
        padding: "8px 12px",
        background: "var(--card-bg-color)",
        border: "1px solid var(--card-border-color)",
        borderRadius: "3px",
        color: "var(--card-fg-color)",
        opacity: 0.75,
        fontStyle: "italic",
        fontSize: "13px",
      }}
    >
      {value != null ? `${value} min read (auto-calculated from content)` : "Calculating…"}
    </div>
  );
};
