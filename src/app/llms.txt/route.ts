import { getLlmsTxtData, LlmsTxtData } from "@/queries/llms";
import { siteName } from "@/utils/constants";
import { buildPagePath, truncateText } from "@/utils/helpers";
import { ORGANIZATION_DETAILS } from "@/utils/jsonLd";

/**
 * llms.txt (https://llmstxt.org): a Markdown overview of the site for AI assistants and
 * crawlers. Generated from Sanity like the sitemap, and refreshed by the revalidate-path
 * webhook through the `llms-txt` cache tag.
 */

const NOTE_MAX_LENGTH = 200;

const siteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL ?? "";

// Collapses whitespace and strips characters that would break Markdown link syntax
const clean = (text?: Sanity.Maybe<string>): string =>
  (text ?? "").replace(/[[\]]/g, "").replace(/\s+/g, " ").trim();

const urlFor = (page: AllPagesData): string => {
  const path = buildPagePath(page);
  return path.length ? `${siteUrl}/${path.join("/")}` : siteUrl;
};

const linkItem = (title: string, url: string, notes?: string): string =>
  `- [${clean(title)}](${url})${notes ? `: ${notes}` : ""}`;

const socialLabel = (url: string): string => {
  const host = new URL(url).hostname.replace(/^(www|open)\./, "");
  if (host.startsWith("instagram.")) return `${siteName} on Instagram`;
  if (host.startsWith("spotify.")) return `${siteName} podcast on Spotify`;
  return host;
};

const formatDate = (date?: Sanity.Maybe<string>): string => (date ? date.slice(0, 10) : "");

const buildStories = (articles: LlmsTxtData["articles"]): string[] =>
  articles.map((article) => {
    const details = [
      article.tagNames?.filter(Boolean).join(", "),
      article.authorName ? `by ${article.authorName}` : "",
      formatDate(article.publishDate),
    ].filter(Boolean);
    const description = clean(article.description);
    const notes = [description, details.length ? `(${details.join(" · ")})` : ""]
      .filter(Boolean)
      .join(" ");
    return linkItem(article.title ?? "Untitled story", urlFor(article), notes);
  });

const buildWriters = (authors: LlmsTxtData["authors"]): string[] =>
  authors
    .filter((author) => buildPagePath(author).length)
    .map((author) => {
      const name = [author.firstName, author.lastName].filter(Boolean).join(" ");
      const bio = clean(author.bioExcerpt);
      const notes = [clean(author.role), bio ? truncateText(bio, NOTE_MAX_LENGTH) : ""]
        .filter(Boolean)
        .join(". ");
      return linkItem(name, urlFor(author), notes);
    });

const buildPages = (pages: LlmsTxtData["pages"]): string[] =>
  pages.map((page) =>
    linkItem(page.title ?? "Untitled page", urlFor(page), clean(page.description)),
  );

const buildSocials = (socialMedias?: LlmsTxtData["socialMedias"]): string[] =>
  (socialMedias ?? [])
    .map((social) => social?.url)
    .filter((url): url is string => !!url)
    .map((url) => linkItem(socialLabel(url), url));

const section = (heading: string, items: string[]): string =>
  items.length ? `## ${heading}\n\n${items.join("\n")}` : "";

export const GET = async (): Promise<Response> => {
  const data = await getLlmsTxtData();
  const articles = data?.articles ?? [];
  const topics = [...new Set(articles.flatMap((article) => article.tagNames ?? []))]
    .filter(Boolean)
    .sort();

  const body = [
    `# ${siteName}`,
    `> ${ORGANIZATION_DETAILS.description}`,
    [
      `${siteName} is based in Aotearoa New Zealand and was founded in ${ORGANIZATION_DETAILS.foundingDate}.`,
      "Stories are written mainly in English and weave in Bisaya (Cebuano, language code `ceb`) words and phrases; some include Bisaya titles or descriptions alongside the English.",
      topics.length ? `Story topics: ${topics.join(", ")}.` : "",
    ]
      .filter(Boolean)
      .join(" "),
    section("Stories", buildStories(articles)),
    section("Writers", buildWriters(data?.authors ?? [])),
    section("Pages", buildPages(data?.pages ?? [])),
    section("Optional", buildSocials(data?.socialMedias)),
  ]
    .filter(Boolean)
    .join("\n\n");

  return new Response(`${body}\n`, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
