export interface ArticlesListSearchParams {
  page?: string;
  category?: string;
}

export const STATIC_ITEMS_PER_PAGE = 9;

export const slugifyCategory = (name: string): string =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const buildArticlesListHref = (
  options: { page?: number; category?: string | null },
  current?: ArticlesListSearchParams,
): string => {
  const category =
    options.category !== undefined ? options.category : (current?.category ?? null);
  const page = options.page ?? Number.parseInt(current?.page ?? "1", 10);

  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (page > 1) params.set("page", String(page));

  const query = params.toString();
  return query ? `?${query}` : "?";
};

export const parseArticlesListPage = (
  searchParams: ArticlesListSearchParams | undefined,
  totalItems: number,
  itemsPerPage = STATIC_ITEMS_PER_PAGE,
): { currentPage: number; totalPages: number } => {
  const parsedPage = Number.parseInt(searchParams?.page ?? "1", 10);
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / itemsPerPage) : 0;
  const currentPage =
    totalPages > 0
      ? Math.min(Math.max(Number.isNaN(parsedPage) ? 1 : parsedPage, 1), totalPages)
      : 1;

  return { currentPage, totalPages };
};

export const resolveCategoryTag = (
  tags: Sanity.Maybe<Sanity.Tag[]>,
  categorySlug?: string,
): Sanity.Tag | null => {
  if (!categorySlug) return null;

  return (
    tags?.find((tag) => tag?.name && slugifyCategory(tag.name) === categorySlug) ?? null
  );
};
