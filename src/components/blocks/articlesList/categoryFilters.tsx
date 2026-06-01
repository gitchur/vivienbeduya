import { mergeClassNames } from "@flight-digital/flightdeck/helpers";
import { styled } from "@linaria/react";
import NextLink from "next/link";
import {
  ArticlesListSearchParams,
  buildArticlesListHref,
  slugifyCategory,
} from "./searchParams";

interface Props {
  tags: Sanity.Maybe<Sanity.Tag[]>;
  activeCategory?: string | null;
  searchParams?: ArticlesListSearchParams;
  className?: string;
}

export const CategoryFilters = ({
  tags,
  activeCategory,
  searchParams,
  className,
}: Props): React.JSX.Element | null => {
  const availableTags = tags?.filter((tag) => tag?.name?.trim()) ?? [];
  if (!availableTags.length) return null;

  const isAllActive = !activeCategory;

  return (
    <FilterList
      className={mergeClassNames("category-filters", className)}
      aria-label="Filter articles by category"
    >
      <NextLink
        href={buildArticlesListHref({ page: 1, category: null }, searchParams)}
        scroll={false}
        className={mergeClassNames(
          "category-filters__tag",
          "small",
          isAllActive ? "category-filters__tag--active" : "",
        )}
        aria-current={isAllActive ? "page" : undefined}
      >
        All
      </NextLink>
      {availableTags.map((tag) => {
        if (!tag?.name) return null;

        const categorySlug = slugifyCategory(tag.name);
        const isActive = activeCategory === categorySlug;

        return (
          <NextLink
            key={tag._id}
            href={buildArticlesListHref({ page: 1, category: categorySlug }, searchParams)}
            scroll={false}
            className={mergeClassNames(
              "category-filters__tag",
              "small",
              isActive ? "category-filters__tag--active" : "",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {tag.name}
          </NextLink>
        );
      })}
    </FilterList>
  );
};


const FilterList = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 8rwd;
  justify-content: flex-end;
  flex-shrink: 0;
  max-width: 50%;

  .category-filters__tag {
    padding: 4rwd 12rwd;
    border-radius: 999px;
    background-color: var(--color-bg-recessed);
    color: var(--bark-700);
    text-decoration: none;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;
  }

  .category-filters__tag:hover {
    background-color: var(--bark-700);
    color: var(--color-white);
  }

  .category-filters__tag--active {
    background-color: var(--color-bg-inverted);
    color: var(--color-white);
  }

  @media --base-down {
    gap: 8rwm;
    justify-content: flex-start;
    max-width: 100%;
    width: 100%;

    .category-filters__tag {
      padding: 4rwm 12rwm;
    }
  }
`;
