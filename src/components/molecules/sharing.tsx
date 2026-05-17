"use client";

import { mergeClassNames } from "@flight-digital/flightdeck/helpers";
import { styled } from "@linaria/react";
import React, { useEffect, useState } from "react";
import { Icon } from "@/components/atoms/icon";

export type SharePlatform = "linkedin" | "facebook";

interface Props {
  url?: string;
  title?: string;
  platforms?: SharePlatform[];
  className?: string;
}

const SHARE_LINKS: Record<
  SharePlatform,
  (url: string, title?: string) => string
> = {
  linkedin: (u) =>
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}`,
  facebook: (u) =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`,
};

const DEFAULT_PLATFORMS: SharePlatform[] = [
  "linkedin",
  "facebook",
];

export const Sharing = ({
  url,
  title,
  platforms = DEFAULT_PLATFORMS,
  className,
}: Props): React.ReactElement | null => {
  const [shareUrl, setShareUrl] = useState(url ?? "");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof url === "string" && url.length > 0) {
      setShareUrl(url);
      return;
    }
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, [url]);

  if (!shareUrl) return null;

  const openShare = (platform: SharePlatform): void => {
    const href = SHARE_LINKS[platform](shareUrl, title);
    window.open(href, "_blank", "noopener,noreferrer,width=600,height=400");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
  };

  return (
    <Wrapper className={mergeClassNames("sharing", className)} role="group" aria-label="Share">
      Share:
      <ShareButton onClick={handleCopy}>
        <Icon size={20} asset={copied ? "check" : "copy"} />
      </ShareButton>
      {platforms.map((platform) => (
        <ShareButton
          key={platform}
          type="button"
          onClick={() => openShare(platform)}
          aria-label={`Share on ${platform}`}
          title={`Share on ${platform}`}
        >
          <SocialIcon platform={platform} />
        </ShareButton>
      ))}
    </Wrapper>
  );
};

const SocialIcon = ({
  platform,
}: {
  platform: SharePlatform;
}): React.ReactElement => {
  const size = 20;
  switch (platform) {
    case "linkedin":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "facebook":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8rwd;
`;

const ShareButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24rw;
  height: auto;
  padding: 0;
  border: none;
  color: var(--color-fg);
  cursor: pointer;

  svg {
    fill: var(--color-fg-on-dark);
  }
  transition:
    fill 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    svg {
      fill: var(--color-highlight);
      color: var(--color-fg-on-dark);
    }
    transform: translateY(-2rwd);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
`;
