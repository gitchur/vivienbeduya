import { sanityFetch } from "@/lib/sanityClient";
import { defineQuery } from "next-sanity";
import { draftsFilter, slug } from "./_general";
import { withProjections } from "./groq";

export const LLMS_TXT_CACHE_TAG = "llms-txt";

const indexable = `!("noindex" in coalesce(seo.indexing, []))`;

export interface LlmsTxtData {
  pages: Sanity.Page[];
  articles: (Sanity.Article & { authorName?: Sanity.Maybe<string>; tagNames?: string[] })[];
  authors: AuthorPageData[];
  socialMedias: Sanity.Maybe<readonly Sanity.Maybe<Sanity.SocialMedia>[]>;
}

const llmsTxtQuery = defineQuery(
  withProjections(`
  {
    "pages": *[_type == "page" && ${draftsFilter} && ${indexable}] | order(select(slug.current == "/" => 0, 1), title asc) {
      _type,
      title,
      "description": coalesce(seo.pageDescription, description),
      ${slug.field("slug")}
    },
    "articles": *[_type == "article" && ${draftsFilter} && ${indexable}]
      | order(coalesce(publishDate, _createdAt) desc) {
      _type,
      title,
      "description": coalesce(seo.pageDescription, description),
      "publishDate": coalesce(publishDate, _createdAt),
      "authorName": select(
        defined(author->lastName) => author->firstName + " " + author->lastName,
        author->firstName
      ),
      "tagNames": tags[]->name,
      ${slug.field("slug")}
    },
    "authors": *[_type == "author" && ${draftsFilter}] | order(firstName asc) {
      _type,
      firstName,
      lastName,
      role,
      "bioExcerpt": pt::text(bio.blocks)
    },
    "socialMedias": *[_type == "settings"][0].socialMedias[] { url }
  }
`),
);

export const getLlmsTxtData = async (): Promise<Sanity.Maybe<LlmsTxtData>> => {
  const data = await sanityFetch({
    query: llmsTxtQuery,
    tags: [LLMS_TXT_CACHE_TAG],
  });
  return data as Sanity.Maybe<LlmsTxtData>;
};
