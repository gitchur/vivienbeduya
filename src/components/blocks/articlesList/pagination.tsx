import { mergeClassNames } from "@flight-digital/flightdeck/helpers";
import { styled } from "@linaria/react";
import NextLink from "next/link";
import { ArticlesListSearchParams, buildArticlesListHref } from "./searchParams";

interface Props {
  currentPage: number;
  totalPages: number;
  searchParams?: ArticlesListSearchParams;
  className?: string;
}

export const ArticlesPagination = ({
  currentPage,
  totalPages,
  searchParams,
  className,
}: Props): React.JSX.Element | null => {
  if (totalPages <= 1) return null;

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <Nav
      className={mergeClassNames("articles-pagination", className)}
      aria-label="Articles pagination"
    >
      {hasPrevious ? (
        <NextLink
          href={buildArticlesListHref({ page: currentPage - 1 }, searchParams)}
          scroll={false}
          className="articles-pagination__link"
        >
          Previous
        </NextLink>
      ) : (
        <span className="articles-pagination__link articles-pagination__link--disabled">Previous</span>
      )}
      <span className="articles-pagination__status p-small">
        Page {currentPage} of {totalPages}
      </span>
      {hasNext ? (
        <NextLink
          href={buildArticlesListHref({ page: currentPage + 1 }, searchParams)}
          scroll={false}
          className="articles-pagination__link"
        >
          Next
        </NextLink>
      ) : (
        <span className="articles-pagination__link articles-pagination__link--disabled">Next</span>
      )}
    </Nav>
  );
};


const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24rwd;
  margin-top: 48rwd;

  .articles-pagination__link {
    color: var(--color-fg);
    text-decoration: underline;
    text-underline-offset: 4rwd;

    &:hover {
      opacity: 0.8;
    }
  }

  .articles-pagination__link--disabled {
    opacity: 0.4;
    text-decoration: none;
    pointer-events: none;
  }

  .articles-pagination__status {
    opacity: 0.7;
  }

  @media --base-down {
    gap: 16rwm;
    margin-top: 32rwm;
  }
`;
