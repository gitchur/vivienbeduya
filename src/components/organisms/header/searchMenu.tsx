import { getSearchResults } from "@/queries/lists";
import { mergeClassNames } from "@flight-digital/flightdeck/helpers";
import useDebounce from "@flight-digital/flightdeck/hooks/useDebounce";
import ErrorFeedback from "@flight-digital/flightdeck/pebbles/errorFeedback";
import { styled } from "@linaria/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import SideMenu from "../sideMenu";
import { IconSearch } from "@/components/atoms/icon";
import { ArticleCard } from "@/components/blocks/articlesList/articleCard";
import validateType from "@/utils/validateType";

interface Props {
  open: boolean;
  onClose: () => void;
}

const PAGE_TYPES = [
  { title: "All", value: "all" },
  { title: "Blog", value: "article.blogPost" },
  { title: "Other pages", value: "page" },
];

const HighlightText = ({ text, search }: { text: Maybe<string>; search: string }) => {
  const validText = text || "";
  const [highlightedText, setHighlightedText] = useState(validText);

  useEffect(() => {
    if (!search || !validText) return;
    setHighlightedText(
      validText.replace(new RegExp(`(${search})`, "gi"), "<span class='highlight'>$1</span>"),
    );
  }, [validText, search]);

  return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
};

const SearchMenu = ({ open, onClose }: Props) => {
  const [pageType, setPageType] = useState<(typeof PAGE_TYPES)[number]["value"]>("all");
  const [results, setResults] = useState<AllPagesData[]>();
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    searchInputRef.current?.focus();
  }, [open]);

  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleChangePageType = (value: (typeof PAGE_TYPES)[number]["value"]) => {
    setPageType(value);
    handleSearch(searchValue, value);
  };

  const handleSearch = async (search: string, type: string) => {
    if (!open || search.length < 2) return;
    setIsSearching(true);
    try {
      const res = await getSearchResults(search, type);
      setResults(res || []);
    } catch (error) {
      console.error("Search error:", error);
    }
    setIsSearching(false);
  };

  useDebounce(() => handleSearch(searchValue, pageType), 500, [searchValue]);

  return (
    <SideMenu open={open} onClose={onClose} width="36vw">
      <Wrapper>
        <div className="search-input-area">
          <IconSearch size={30} />
          <input
            ref={searchInputRef}
            type="text"
            className="h3"
            placeholder="Search"
            value={searchValue}
            maxLength={80}
            onChange={handleChangeSearchValue}
          />
        </div>
        <div className={mergeClassNames("results-area", isSearching && "searching")}>
          {/* <div className="type-container">
            <Toggle
              value={pageType}
              onChange={handleChangePageType}
              items={PAGE_TYPES}
              className="desktop-only"
            />
            <Select
              fullWidth
              value={pageType}
              onChange={handleChangePageType}
              options={PAGE_TYPES}
              className="mobile-only"
            />
          </div> */}
          <ul>
            {results?.length ? (
              results.map((result) => {
                if (validateType.isArticle(result)) {
                  return (
                    <li key={result._id} className="result-item">
                      <ArticleCard data={result} />
                    </li>
                  )
                }

                // TODO: Add other page types here
                return null;
              })
            ) : results ? (
              <ErrorFeedback description="No results found" />
            ) : null}
          </ul>
        </div>
      </Wrapper>
    </SideMenu>
  );
};

export default SearchMenu;

const Wrapper = styled.div`
  background-color: var(--color-bg-elevated);
  flex: 1;
  background: color-mix(in oklch, var(--color-bg) 75%, transparent);
  backdrop-filter: blur(4px);

  .search-input-area {
    height: var(--header-height);
    padding: 30rwd;
    border-bottom: 1px solid var(--color-black-10);
    display: flex;
    align-items: center;
    gap: 10rwd;
    padding-right: 120rwd;

    @media --base-down {
      padding: 20rwm;
      gap: 10rwm;
      padding-right: 80rwm;
    }

    input {
      width: 100%;
      border: none;
      background: none;
      outline: none;
      line-height: 1;
      margin-top: 2rw;
    }
  }

  .results-area {
    padding: 32rwd 32rwd 128rwd 32rwd;
    border-top: 1px solid var(--color-border);

    @media --base-down {
      padding: 20rwm 0 100rwm;
    }

    &.searching {
      opacity: 0.5;
      pointer-events: none;
    }

    .type-container {
      padding: 0 30rwd 40rwd;

      @media --base-down {
        padding: 0 20rwm 30rwm;
      }
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin: 8rwd 0;
      }
    }

    .result-item > .link {
      border-bottom: 1px solid var(--color-fg-muted);
      min-height: 130rwd;

      @media --base-down {
        padding: 15rwm 20rwm 30rwm 20rwm;
        min-height: 100rwm;
        display: flex;
        flex-direction: column;
        gap: 10rwm;
      }

      .image {
        width: 100%;
        height: 248rwd;

        @media --base-down {
          display: none;
        }
      }
    }
  }
`;
