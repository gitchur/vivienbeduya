"use server";

import { VideoAspect } from "@/utils/videoEmbed";

/** Provider oEmbed width/height is the video's player aspect ratio. */
export const getVideoAspectRatio = async (oembedUrl: string): Promise<VideoAspect | null> => {
  try {
    const response = await fetch(oembedUrl, {
      next: { revalidate: 60 * 60 * 24 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;

    const data = (await response.json()) as { width?: number; height?: number; title?: string };
    if (!data.width || !data.height) return null;

    return {
      width: data.width,
      height: data.height,
      title: data.title,
    };
  } catch {
    return null;
  }
};
