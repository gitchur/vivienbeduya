"use client";
import FlightLink from "@flight-digital/flightdeck/pebbles/link";
import NextLink from "next/link";
import React, { ComponentProps } from "react";
import { buildPagePath } from "@/utils/helpers";
import validateType from "@/utils/validateType";

type DefaultProps = Omit<ComponentProps<typeof FlightLink>, "LinkComponent">;

interface Props extends DefaultProps { }

const ValidLinkProps = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return <NextLink {...props} href={props.href ?? ""} scroll={false} />;
};

/**
 * Authors have no manually managed slug field (see buildPagePath): their URL is always
 * `/author/${slugified firstName}`. Rewrite author page data into the single `slug.current`
 * shape FlightLink expects before handing it off, since its default resolver only reads slugs.
 */
function toAuthorSlugData(author: AuthorPageData): { slug: { current: string } } | null {
  const path = buildPagePath(author);
  return path.length ? { slug: { current: path.join("/") } } : null;
}

function resolveLinkData(data: unknown): unknown {
  if (validateType.isAuthor(data)) {
    return toAuthorSlugData(data) ?? data;
  }

  if (data && typeof data === "object" && "internalLink" in data) {
    const linkData = data as { internalLink?: unknown };
    if (validateType.isAuthor(linkData.internalLink)) {
      const authorSlugData = toAuthorSlugData(linkData.internalLink);
      if (authorSlugData) return { ...linkData, internalLink: authorSlugData };
    }
  }

  return data;
}

const Link = (props: Props) => {
  return <FlightLink {...props} data={resolveLinkData(props.data)} LinkComponent={ValidLinkProps} />;
};

export default Link;
