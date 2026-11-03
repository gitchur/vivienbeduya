import { siteName } from "@/utils/constants";
import { buildPagePath, truncateText } from "@/utils/helpers";
import validateType from "@/utils/validateType";

/**
 * Generated schema.org JSON-LD. Every page gets one linked @graph (organisation, website,
 * page-specific nodes and breadcrumbs) built from Sanity data, so dates and authors never go
 * stale. The Sanity "Structured Markup" field can add extra types on top (e.g. AboutPage);
 * any types generated here are dropped from it so search engines never see duplicates.
 */

type JsonLdNode = Record<string, unknown>;

type JsonLdPage = AllPagesData & {
  /** Title of the slug prefix page, queried for breadcrumbs */
  parentTitle?: Sanity.Maybe<string>;
};

interface SiteData {
  header?: Sanity.Maybe<Sanity.Header>;
  settings?: Sanity.Maybe<Sanity.Settings>;
}

// Copied from the original Home page markup in Sanity
const ORGANIZATION_DETAILS = {
  description:
    "Bisaya Banter is a community media platform for young Filipinos in Aotearoa and the wider diaspora, amplifying Bisaya identity and language and challenging the flattening of Filipino identity into a Tagalog-centric monolith.",
  foundingDate: "2021",
  areaServed: "New Zealand",
};

const GENERATED_TYPES = [
  "Organization",
  "WebSite",
  "WebPage",
  "BlogPosting",
  "Article",
  "ProfilePage",
  "Person",
  "BreadcrumbList",
];

const HEADLINE_MAX_LENGTH = 110;
const PERSON_DESCRIPTION_MAX_LENGTH = 300;

const siteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL ?? "";
const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;

const urlForPath = (path: string[]): string =>
  path.length ? `${siteUrl}/${path.join("/")}` : siteUrl;

const humanize = (segment: string): string =>
  segment.replace(/[-_]+/g, " ").replace(/^\w/, (char) => char.toUpperCase());

const toImageObject = (image?: Sanity.Maybe<Sanity.AdaptiveImage>): JsonLdNode | undefined => {
  const asset = image?.desktopImage?.asset ?? image?.mobileImage?.asset;
  if (!asset?.url) return undefined;

  const width = asset.metadata?.dimensions?.width;
  const height = asset.metadata?.dimensions?.height;
  return { "@type": "ImageObject", url: asset.url, ...(width && height ? { width, height } : {}) };
};

const fullName = (person: Pick<Sanity.Author, "firstName" | "lastName">): string =>
  [person.firstName, person.lastName].filter(Boolean).join(" ");

const buildOrganization = ({ header, settings }: SiteData): JsonLdNode => {
  const logo = toImageObject(header?.logo);
  const sameAs = (settings?.socialMedias ?? []).map((social) => social?.url).filter(Boolean);

  return {
    "@type": "Organization",
    "@id": organizationId,
    name: siteName,
    url: siteUrl,
    ...ORGANIZATION_DETAILS,
    ...(logo ? { logo } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
};

const buildWebsite = (): JsonLdNode => ({
  "@type": "WebSite",
  "@id": websiteId,
  name: siteName,
  url: siteUrl,
  inLanguage: "en",
  publisher: { "@id": organizationId },
});

/** Person node with an @id shared by the author page and every article they wrote */
const buildPerson = (author: AuthorPageData, includeProfile = false): JsonLdNode | null => {
  const name = fullName(author);
  const path = buildPagePath(author);
  if (!name || !path.length) return null;

  const url = urlForPath(path);
  const image = toImageObject(author.image);
  const bio = author.bioExcerpt?.trim();

  return {
    "@type": "Person",
    "@id": `${url}#person`,
    name,
    url,
    ...(image ? { image } : {}),
    ...(includeProfile && author.role ? { jobTitle: author.role } : {}),
    ...(includeProfile && bio
      ? { description: truncateText(bio, PERSON_DESCRIPTION_MAX_LENGTH) }
      : {}),
  };
};

const buildBreadcrumbs = (data: JsonLdPage, path: string[], name: string): JsonLdNode | null => {
  if (!path.length) return null;

  // Authors live under /author/, which has no page of its own
  const parents = validateType.isAuthor(data) ? [] : path.slice(0, -1);
  const items = [
    { name: "Home", item: siteUrl },
    ...parents.map((segment, index) => ({
      name: index === parents.length - 1 && data.parentTitle ? data.parentTitle : humanize(segment),
      item: urlForPath(path.slice(0, index + 1)),
    })),
    { name, item: urlForPath(path) },
  ];

  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      ...item,
    })),
  };
};

const buildArticleNodes = (article: Sanity.Article, url: string): JsonLdNode[] => {
  const author = article.author ? buildPerson(article.author as AuthorPageData) : null;
  const image = toImageObject(article.image);
  const tags = (article.tags ?? []).map((tag) => tag?.name).filter(Boolean);
  const description = article.seo?.pageDescription || article.description;

  const blogPosting: JsonLdNode = {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: truncateText(article.title ?? "", HEADLINE_MAX_LENGTH),
    ...(article.alternativeTitle ? { alternativeHeadline: article.alternativeTitle } : {}),
    ...(description ? { description } : {}),
    ...(image ? { image } : {}),
    datePublished: article.publishDate ?? article._createdAt,
    ...(article._updatedAt ? { dateModified: article._updatedAt } : {}),
    inLanguage: "en",
    ...(tags.length ? { articleSection: tags[0], keywords: tags.join(", ") } : {}),
    ...(article.suggestedReadTime ? { timeRequired: `PT${article.suggestedReadTime}M` } : {}),
    ...(author ? { author: { "@id": author["@id"] } } : {}),
    publisher: { "@id": organizationId },
    isPartOf: { "@id": websiteId },
    mainEntityOfPage: url,
  };

  return author ? [blogPosting, author] : [blogPosting];
};

const buildAuthorNodes = (author: AuthorPageData, url: string): JsonLdNode[] => {
  const person = buildPerson(author, true);
  if (!person) return [];

  return [
    {
      "@type": "ProfilePage",
      "@id": url,
      url,
      name: person.name,
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": person["@id"] },
      ...(author._createdAt ? { dateCreated: author._createdAt } : {}),
      ...(author._updatedAt ? { dateModified: author._updatedAt } : {}),
    },
    person,
  ];
};

const buildWebPage = (page: Sanity.Page, url: string): JsonLdNode => {
  const description = page.seo?.pageDescription || page.description;

  return {
    "@type": "WebPage",
    "@id": url,
    url,
    name: page.seo?.pageTitle || page.title,
    ...(description ? { description } : {}),
    inLanguage: "en",
    isPartOf: { "@id": websiteId },
    ...(page._updatedAt ? { dateModified: page._updatedAt } : {}),
  };
};

/** Extra markup from Sanity, minus anything generated above. Invalid JSON is ignored. */
const parseCustomJsonLd = (jsonLd?: Sanity.Maybe<string>): JsonLdNode | null => {
  if (!jsonLd?.trim()) return null;

  let parsed: JsonLdNode;
  try {
    parsed = JSON.parse(jsonLd);
  } catch {
    return null;
  }

  const isExtra = (node: unknown): boolean =>
    !!node &&
    typeof node === "object" &&
    !GENERATED_TYPES.includes(String((node as JsonLdNode)["@type"]));

  if (Array.isArray(parsed["@graph"])) {
    const graph = parsed["@graph"].filter(isExtra);
    return graph.length ? { ...parsed, "@graph": graph } : null;
  }

  return isExtra(parsed) ? parsed : null;
};

// Escapes "<" so content can never close the surrounding <script> tag
const serialize = (value: JsonLdNode): string => JSON.stringify(value).replace(/</g, "\\u003c");

/** JSON-LD script contents for a page: the generated graph, then any extra Sanity markup. */
export const buildJsonLd = (data: JsonLdPage, site: SiteData): string[] => {
  const path = buildPagePath(data);
  const url = urlForPath(path);
  const name = (validateType.isAuthor(data) ? fullName(data) : data.title) || siteName;

  const pageNodes = validateType.isArticle(data)
    ? buildArticleNodes(data, url)
    : validateType.isAuthor(data)
      ? buildAuthorNodes(data, url)
      : [buildWebPage(data as Sanity.Page, url)];

  const graph = [
    buildOrganization(site),
    buildWebsite(),
    ...pageNodes,
    buildBreadcrumbs(data, path, name),
  ].filter((node): node is JsonLdNode => !!node);

  const custom = parseCustomJsonLd(data.seo?.jsonLD);

  return [
    serialize({ "@context": "https://schema.org", "@graph": graph }),
    ...(custom ? [serialize(custom)] : []),
  ];
};
