"use client";

import RichText from "@/components/molecules/richText";
import { ArticleCard } from "./articleCard";
import { getArticlesList } from "@/queries/lists";
import { mergeClassNames } from "@flight-digital/flightdeck/helpers";
import Button from "@flight-digital/flightdeck/pebbles/button";
import ErrorFeedback from "@flight-digital/flightdeck/pebbles/errorFeedback";
import { styled } from "@linaria/react";
import { useState } from "react";
import { ITEMS_LIMIT } from "./articlesList";
import NextLink from "next/link";

interface Props {
  data: Sanity.BlockArticlesList;
  initialList: Sanity.Maybe<Sanity.Article[]>;
}

const getInitialSettings = (initialList?: Sanity.Maybe<Sanity.Article[]>) => {
  return {
    loading: false,
    page: 0,
    hasLoadMore: initialList?.length === ITEMS_LIMIT,
  };
};

const List = ({ data, initialList }: Props) => {
  const [listData, setListData] = useState<Sanity.Article[]>(initialList ?? []);
  const [settings, setSettings] = useState(getInitialSettings(initialList));

  const handleChangeSetting = (field: string, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleLoadArticles = async (type: "loadMore" | "reset") => {
    if (type === "reset") {
      setListData(initialList ?? []);
      setSettings(getInitialSettings(initialList));
      return;
    }

    try {
      handleChangeSetting("loading", true);
      const newList = await getArticlesList(settings.page + 1, ITEMS_LIMIT);

      setListData((prev) => [...prev, ...(newList ?? [])]);
      setSettings((prev) => ({
        ...prev,
        page: prev.page + 1,
        loading: false,
        hasLoadMore: newList?.length === ITEMS_LIMIT,
      }));
    } catch (error) {
      console.error(error);
      handleChangeSetting("loading", false);
    }
  };

  return (
    <Wrapper
      className={mergeClassNames("articles-list-wrapper", settings.loading ? "loading" : "")}
    >
      <div className="top-area">
        <RichText data={data.content} data-sanity-path="content" />
        {!data.showAll &&
          <NextLink href="/articles" className="bark design">
            <span>Browse all stories</span>
          </NextLink>
        }
      </div>
      {listData?.length ? (
        <div className="articles-list">
          {listData?.map((article) => (
            <ArticleCard key={article?._id} data={article} />
          ))}
        </div>
      ) : (
        <ErrorFeedback description="No articles found" />
      )}
      {settings.hasLoadMore ? (
        <Button
          design="underline"
          className="load-more-button bark"
          loading={settings.loading ? "Loading..." : undefined}
          onClick={() => handleLoadArticles("loadMore")}
        >
          Load more
        </Button>
      ) : null}
    </Wrapper>
  );
};

export default List;

const Wrapper = styled.div`
  &.loading {
    .articles-list {
      opacity: 0.6;
    }
  }

  .load-more-button {
    margin: 48rwd auto;

    @media --base-down {
      margin: 24rwm auto;
    }
  }

  .top-area {
    display: flex;
    gap: 24rwd;
    justify-content: space-between;
    align-items: center;
    padding: 32rwd 0;

    @media --base-down {
      gap: 16rwm;
      margin-bottom: 24rwm;
      padding-bottom: 24rwm;
      flex-direction: column;
    }
  }

  .articles-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350rwd, 1fr));
    column-gap: 24rwd;
    row-gap: 48rwd;
    transition: opacity 300ms;

    @media --base-down {
      grid-template-columns: 1fr;
      row-gap: 24rwm;
    }
  }

`;
