import RichText from "@/components/molecules/richText";
import ErrorFeedback from "@flight-digital/flightdeck/pebbles/errorFeedback";
import { mergeClassNames } from "@flight-digital/flightdeck/helpers";
import { styled } from "@linaria/react";
import { ArticleCard } from "./articleCard";
import { CategoryFilters } from "./categoryFilters";
import { ArticlesPagination } from "./pagination";
import { ArticlesListSearchParams } from "./searchParams";

interface Props {
  data: Sanity.BlockArticlesList;
  articles: Sanity.Maybe<Sanity.Article[]>;
  tags: Sanity.Maybe<Sanity.Tag[]>;
  activeCategory?: string | null;
  searchParams?: ArticlesListSearchParams;
  currentPage: number;
  totalPages: number;
}

export const StaticList = ({
  data,
  articles,
  tags,
  activeCategory,
  searchParams,
  currentPage,
  totalPages,
}: Props): React.JSX.Element => {
  const list = articles ?? [];

  return (
    <Wrapper className={mergeClassNames("articles-list-wrapper", "articles-list-wrapper--static")}>
      <div className="top-area">
        {data.content && (
          <RichText data={data.content} data-sanity-path="content" />
        )}
        <CategoryFilters
          tags={tags}
          activeCategory={activeCategory}
          searchParams={searchParams}
        />
      </div>
      {list.length ? (
        <>
          <div className="articles-list">
            {list.map((article) => (
              <ArticleCard key={article?._id} data={article} />
            ))}
          </div>
          <ArticlesPagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={searchParams}
          />
        </>
      ) : (
        <ErrorFeedback description="No articles found" />
      )}
    </Wrapper>
  );
};


const Wrapper = styled.div`
  padding: 64rwd 0;
  .top-area {
    display: flex;
    gap: 24rwd;
    justify-content: space-between;
    align-items: flex-start;
    padding: 32rwd 0;

    @media --base-down {
      gap: 16rwm;
      margin-bottom: 24rwm;
      padding-bottom: 24rwm;
      flex-direction: column;
      align-items: stretch;
    }
  }

  .articles-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350rwd, 1fr));
    column-gap: 24rwd;
    row-gap: 48rwd;

    @media --base-down {
      grid-template-columns: 1fr;
      row-gap: 24rwm;
    }
  }
`;
