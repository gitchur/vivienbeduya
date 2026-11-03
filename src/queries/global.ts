import { sanityFetch } from "@/lib/sanityClient";
import { defineQuery } from "next-sanity";
import {
  articlePreview,
  draftsFilter,
  featuredArticle,
  image,
  link,
  links,
  richText,
  seo,
} from "./_general";
import { withProjections } from "./groq";

interface GetNavigationResponse {
  header: Sanity.Maybe<Sanity.Header>;
  footer: Sanity.Maybe<Sanity.Footer>;
  settings: Sanity.Maybe<Sanity.Settings>;
  theme: Sanity.Maybe<Sanity.Theme>;
}

const headerNavigationFields = `
  _type == 'link' => ${link.call()},
  _type == 'headerNavMenu' => {
    _key,
    title,
    ${links.field("links")}
  }
`;

const headerFields = `
  _id,
  _type,
  ${image.field("logo")},
  navigation[] { ${headerNavigationFields} },
  hideOnScroll,
  ${richText.field("bannerText")}
`;

const footerFields = `
  _id,
  _type,
  navigation[] {
    _key,
    title,
    ${links.field("links")}
  },
  ${richText.field("copyright")}
`;

const siteSettingsFields = `
  _id,
  _type,
  defaultSEO {
    pageTitleSuffix,
    ...${seo.call()}
  },
  ${richText.field("notFoundPageContent")},
  socialMedias[] {
    _key,
    _type,
    text,
    url,
    icon {
      name,
      svg
    }
  }
`;

const siteSettingsFilter = `
  *[_type == "settings"][0] {
    ${siteSettingsFields}
  }
`;

const siteSettingsQuery = defineQuery(withProjections(siteSettingsFilter));

const layoutRelatedDataQuery = defineQuery(
  withProjections(`
  {
    "header": *[_type == "header"][0] {
      ${headerFields}
    },
    "footer": *[_type == "footer"][0] {
      ${footerFields}
    },
    "settings": ${siteSettingsFilter},
    "theme": *[_type == "theme"][0] {
      classNames[] { ... }
    }
  }
`),
);

const nextReadPostQuery = defineQuery(
  withProjections(`
  *[_type == "article" && ${draftsFilter} && (!defined($articleId) || _id != $articleId)] | order(publishDate desc)[0] {
    ...${articlePreview.call()}
  }
`),
);

export const getNextReadPost = async (articleId?: Sanity.Maybe<string>) => {
  if (!articleId) return null;
  const data = await sanityFetch({
    query: nextReadPostQuery,
    params: { articleId: articleId ?? null },
    tags: [`next-read-${articleId}`],
  });
  return data as Sanity.Maybe<Sanity.Article>;
};

export const getSiteSettings = async () => {
  const data = await sanityFetch({
    query: siteSettingsQuery,
    tags: ["settings"],
  });
  return data as Sanity.Maybe<Sanity.Settings>;
};

const latestArticleQuery = defineQuery(
  withProjections(`
  *[_type == "article" && ${draftsFilter}] | order(publishDate desc)[0] {
    ...${featuredArticle.call()}
  }
`),
);

export const getLatestArticle = async (): Promise<Sanity.Maybe<Sanity.Article>> => {
  const data = await sanityFetch({
    query: latestArticleQuery,
    tags: ["latest-article"],
  });
  return data as Sanity.Maybe<Sanity.Article>;
};

export const getLayoutRelatedData = async () => {
  const data = await sanityFetch({
    query: layoutRelatedDataQuery,
    tags: ["header", "footer", "settings", "theme"],
  });
  return data as GetNavigationResponse;
};
