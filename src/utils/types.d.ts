import "@flight-digital/flightdeck/types/global";

declare global {
  /**
   * `Sanity.Author` doesn't declare the query-computed `title`/`articles` fields
   * added for the author page template, since they aren't real schema fields.
   */
  type AuthorPageData = Sanity.Author & {
    title?: Sanity.Maybe<string>;
    /** Authors have no `seo` field in the schema; always null, kept here so generic page code can optional-chain into it. */
    seo?: Sanity.Maybe<Sanity.Seo>;
    articles?: Sanity.Maybe<readonly Sanity.Maybe<Sanity.Article>[]>;
  };

  type AllPagesData = Sanity.Page | Sanity.Article | AuthorPageData;
}
