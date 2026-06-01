import { ClientConfig, createClient } from "next-sanity";

export const sanityClient = (useCdn?: boolean, config?: Partial<ClientConfig>) =>
  createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    useCdn,
    perspective: "published",
    stega: false,
    ...(config ?? {}),
  });

type SanityFetchOptions<QueryString extends string> = {
  query: QueryString;
  params?: Record<string, string | number | boolean | string[] | null>;
  revalidate?: number | false;
  tags?: string[];
  useCdn?: boolean;
  cache?: RequestCache;
};

/**
 * Fetches published Sanity content via the CDN (apicdn.sanity.io).
 * Preview and draft reads bypass this helper — Flightdeck NextPreview uses its own client
 * with useCdn: false and perspective: "raw".
 */
export async function sanityFetch<QueryString extends string>({
  query,
  params = {},
  /** Default revalidation time in seconds (60 seconds) */
  revalidate = 60,
  /** Tags to cache the query by, if set the revalidate time will be ignored, use the revalidate-path api to revalidate the query */
  tags = [],
  useCdn = true,
  cache = "force-cache",
}: SanityFetchOptions<QueryString>) {
  return sanityClient(useCdn).fetch(query, params, {
    cache,
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  });
}

/** Escape hatch for non-preview reads that must hit the Sanity origin API. */
export async function sanityFetchLive<QueryString extends string>(
  options: Omit<SanityFetchOptions<QueryString>, "useCdn" | "cache">,
) {
  return sanityFetch({
    ...options,
    useCdn: false,
    cache: "no-store",
  });
}
