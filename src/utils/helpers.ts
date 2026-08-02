import validateType from "@/utils/validateType";

const SEO_DESCRIPTION_MAX_LENGTH = 160;

const ROOT_SLUG_VALUES = ["", "/"];

function isRootSegment(segment: string | undefined | null): boolean {
  return segment == null || ROOT_SLUG_VALUES.includes(segment);
}

/**
 * Basic slugify for deriving a URL segment from a plain text field (e.g. author firstName)
 * that doesn't have a manually managed Sanity slug field.
 */
function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Maps a Sanity slug.current or URL path to the cache tag used in sanityFetch (e.g. slug:/ for home).
 */
export function slugToCacheTag(slugOrPath: string | undefined | null): string | null {
  if (slugOrPath == null) return null;

  const trimmed = slugOrPath.trim();
  if (isRootSegment(trimmed)) return "/";

  const segments = trimmed.split("/").filter(Boolean);
  if (segments.length === 0) return "/";

  return segments[segments.length - 1] ?? null;
}

/**
 * Builds a path array like ["parent", "child", "my-page"] from a Sanity page document with prefix.
 * Used for both generateStaticParams (so the URL includes the prefix) and getPage (to match the request path).
 * Skips root-like prefix segments (empty or "/") so paths stay consistent with URL segments.
 * Handles up to 4 prefix levels.
 *
 * Authors don't have a manually managed slug field: their path is always derived as
 * `/author/${slugified firstName}` instead of following the slug + prefix chain.
 */
export function buildPagePath(page: AllPagesData): string[] {
  if (validateType.isAuthor(page)) {
    return page.firstName ? ["author", slugify(page.firstName)] : [];
  }

  if (!page?.slug?.current || ROOT_SLUG_VALUES.includes(page.slug.current))
    return [];

  const parts: string[] = [page.slug.current];
  let parent: Sanity.Maybe<AllPagesData | undefined> = page.slug.prefix;
  let depth = 0;

  while (parent && depth < 4) {
    const segment = parent.slug?.current;
    if (segment != null && !isRootSegment(segment)) parts.unshift(segment);
    parent = parent?.slug?.prefix;
    depth++;
  }

  return parts.filter(Boolean);
}

/**
 * Truncates plain text to a max length for SEO meta descriptions/JSON-LD, breaking at a word
 * boundary instead of mid-word.
 */
export function truncateText(text: string, maxLength = SEO_DESCRIPTION_MAX_LENGTH): string {
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength - 1);
  const lastSpace = truncated.lastIndexOf(" ");

  return `${(lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated).trimEnd()}…`;
}

function buildAuthorJsonLd(author: AuthorPageData): string | null {
  const fullName = [author.firstName, author.lastName].filter(Boolean).join(" ");
  if (!fullName) return null;

  const path = buildPagePath(author);
  const imageUrl = author.image?.desktopImage?.asset?.url;
  const bio = author.bioExcerpt?.trim();

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: fullName,
    ...(author.role ? { jobTitle: author.role } : {}),
    ...(bio ? { description: truncateText(bio, 300) } : {}),
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(path.length
      ? { url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${path.join("/")}` }
      : {}),
  });
}

export const getJsonLd = (data?: Sanity.Maybe<AllPagesData>): string | null => {
  if (data?.seo?.jsonLD) return data.seo.jsonLD;

  // Authors have no `seo` field in the schema, so fall back to a generated Person schema
  // (helps EEAT signals/rich results for author pages).
  if (validateType.isAuthor(data)) return buildAuthorJsonLd(data);

  // You can create conditional jsonLD based on the data type here (e.g. if (data?._type === "product") return some new object)
  return null;
};
