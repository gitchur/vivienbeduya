import { sanityFetch } from "@/lib/sanityClient";
import { defineQuery } from "next-sanity";
import {
  articlePreviewFields,
  draftsFilter,
  imageFields,
  linkFields,
  richTextFields,
  seoFields,
} from "./_general";

interface GetNavigationResponse {
  header: Sanity.Maybe<Sanity.Header>;
  footer: Sanity.Maybe<Sanity.Footer>;
  settings: Sanity.Maybe<Sanity.Settings>;
  theme: Sanity.Maybe<Sanity.Theme>;
}

const headerNavigationFields = defineQuery(`
  _type == 'link' => {
    ${linkFields}
  },
  _type == 'headerNavMenu' => {
    _key,
    title,
    links[] { ${linkFields} }
  }
`);

const headerFields = defineQuery(`
  _id,
  _type,
  logo { ${imageFields} },
  navigation[] { ${headerNavigationFields} },
  hideOnScroll
`);

const footerFields = defineQuery(`
  _id,
  _type,
  navigation[] {
    _key,
    title,
    links[] { ${linkFields} }
  },
  copyright { ${richTextFields} },
  bottomLinks[] { ${linkFields} }
`);

const siteSettingsFields = defineQuery(`
  _id,
  _type,
  defaultSEO {
    pageTitleSuffix,
    ${seoFields}
  },
  notFoundPageContent { ${richTextFields} },
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
`);

const siteSettingsQuery = defineQuery(`
  *[_type == "settings"][0] {
    ${siteSettingsFields}
  }
`);

const layoutRelatedDataQuery = defineQuery(`
  {
    "header": *[_type == "header"][0] {
      ${headerFields}
    },
    "footer": *[_type == "footer"][0] {
      ${footerFields}
    },
    "settings": ${siteSettingsQuery},
    "theme": *[_type == "theme"][0] {
      classNames[] { ... }
    }
  }
`);

const nextReadPostQuery = defineQuery(`
  *[_type == "article" && ${draftsFilter} && (!defined($articleId) || _id != $articleId)] | order(publishDate desc)[0] {
    ${articlePreviewFields}
  }
`);

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

export const getLayoutRelatedData = async () => {
  const data = await sanityFetch({
    query: layoutRelatedDataQuery,
    tags: ["header", "footer", "settings", "theme"],
  });
  return data as GetNavigationResponse;
};
