export type VideoEmbedOptions = {
  autoplay?: boolean | null;
  loop?: boolean | null;
};

export type BuiltVideoEmbed = {
  src: string;
  oembedUrl: string;
};

export type VideoAspect = {
  width: number;
  height: number;
  title?: string;
};

const flag = (value: boolean | null | undefined): "1" | "0" => (value ? "1" : "0");

const youtubeId = (url: URL): string | null => {
  const host = url.hostname.replace(/^www\./, "");
  if (host === "youtu.be") return url.pathname.split("/").filter(Boolean)[0] || null;
  if (host !== "youtube.com" && host !== "youtube-nocookie.com") return null;

  const fromQuery = url.searchParams.get("v");
  if (fromQuery) return fromQuery;

  const parts = url.pathname.split("/").filter(Boolean);
  const marker = parts.findIndex(
    (part) => part === "embed" || part === "shorts" || part === "live" || part === "v",
  );
  if (marker >= 0 && parts[marker + 1]) return parts[marker + 1];
  return null;
};

const vimeoTarget = (url: URL): { id: string; hash?: string } | null => {
  const host = url.hostname.replace(/^www\./, "");
  if (host !== "vimeo.com" && host !== "player.vimeo.com") return null;

  const parts = url.pathname.split("/").filter(Boolean);
  const index = parts.findIndex((part) => /^\d+$/.test(part));
  if (index < 0) return null;

  const id = parts[index];
  const next = parts[index + 1];
  const hash =
    (next && /^[A-Za-z0-9]+$/.test(next) ? next : undefined) ||
    url.searchParams.get("h") ||
    undefined;
  return { id, hash };
};

/** Turns a YouTube or Vimeo URL into an embed src and the oEmbed endpoint for its dimensions. */
export const buildVideoEmbed = (
  rawUrl: string,
  options?: VideoEmbedOptions,
): BuiltVideoEmbed | null => {
  let url: URL;
  try {
    url = new URL(rawUrl.trim());
  } catch {
    return null;
  }

  const youtube = youtubeId(url);
  if (youtube) {
    const params = new URLSearchParams({
      autoplay: flag(options?.autoplay),
      controls: "1",
      mute: options?.autoplay ? "1" : "0",
      loop: flag(options?.loop),
      playsinline: "1",
      rel: "0",
      modestbranding: "1",
    });
    if (options?.loop) params.set("playlist", youtube);

    return {
      src: `https://www.youtube.com/embed/${youtube}?${params.toString()}`,
      oembedUrl: `https://www.youtube.com/oembed?url=${encodeURIComponent(url.toString())}&format=json`,
    };
  }

  const vimeo = vimeoTarget(url);
  if (vimeo) {
    const params = new URLSearchParams({
      autoplay: flag(options?.autoplay),
      controls: "1",
      muted: options?.autoplay ? "1" : "0",
      loop: flag(options?.loop),
      playsinline: "1",
      title: "0",
      byline: "0",
      portrait: "0",
    });
    if (vimeo.hash) params.set("h", vimeo.hash);

    return {
      src: `https://player.vimeo.com/video/${vimeo.id}?${params.toString()}`,
      oembedUrl: `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url.toString())}`,
    };
  }

  return null;
};
