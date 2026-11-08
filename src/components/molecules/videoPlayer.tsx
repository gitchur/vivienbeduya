"use client";

import { mergeClassNames } from "@flight-digital/flightdeck/helpers";
import { styled } from "@linaria/react";
import { useEffect, useMemo, useState } from "react";
import { getVideoAspectRatio } from "@/lib/videoOembed";
import { buildVideoEmbed, VideoAspect } from "@/utils/videoEmbed";

interface Props {
  url: string;
  autoplay?: boolean | null;
  loop?: boolean | null;
  width?: number;
  height?: number;
  title?: string;
  className?: string;
  sanityPath?: string;
}

export const VideoPlayer = ({
  url,
  autoplay,
  loop,
  width,
  height,
  title,
  className,
  sanityPath,
}: Props): React.JSX.Element | null => {
  const embed = useMemo(
    () => buildVideoEmbed(url, { autoplay, loop }),
    [url, autoplay, loop],
  );
  const [measured, setMeasured] = useState<VideoAspect | null>(null);

  useEffect(() => {
    if (!embed || (width && height)) return;

    let cancelled = false;
    getVideoAspectRatio(embed.oembedUrl).then((meta) => {
      if (!cancelled && meta) setMeasured(meta);
    });

    return () => {
      cancelled = true;
    };
  }, [embed, width, height]);

  if (!embed) return null;

  const ratioWidth = width || measured?.width || 16;
  const ratioHeight = height || measured?.height || 9;
  const frameTitle = title || measured?.title || "Video";

  return (
    <Frame
      className={mergeClassNames("video", className)}
      style={{ "--video-aspect-ratio": `${ratioWidth} / ${ratioHeight}` } as React.CSSProperties}
      data-sanity-path={sanityPath}
    >
      <iframe
        src={embed.src}
        title={frameTitle}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </Frame>
  );
};

const Frame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: var(--video-aspect-ratio, 16 / 9);
  background-color: var(--color-bg-inverted);

  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }
`;
