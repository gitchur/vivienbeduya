import { styled } from "@linaria/react";
import Image from "@/components/atoms/image";
import NextLink from "next/link";
import { buildArticlesListHref, slugifyCategory } from "../blocks/articlesList/searchParams";

interface Props {
  data: Maybe<Sanity.Article>;
}

export default function PostDetails({ data }: Props) {
  if (!data) return null;
  const { tags, author, suggestedReadTime } = data;


  return (
    <Wrapper>
      <div className="tags">
        {tags?.map((tag, index) => {
          if (!tag?.name) return null;
          const categoryHref = buildArticlesListHref({ page: 1, category: slugifyCategory(tag?.name) });
          if (!categoryHref) return null;
          return (
            <NextLink
              key={tag?._key || index}
              className="tag-item category-filters__tag"
              href={`/articles${categoryHref}`}
              scroll={false}
            >
              {tag?.name}
            </NextLink>
          );
        })}
      </div>

      <div className="author-info">
        {author?.image && <Image data={author?.image} loading="eager" className="author-image" />}
        {author?.firstName && <b>Written by {author?.firstName} {author?.lastName || ""}</b>}
        {Boolean(suggestedReadTime) && <> • {suggestedReadTime} min read</>}
      </div>
    </Wrapper>
  );
}


const Wrapper = styled.div`
  .tags {
    display: flex;
    gap: 8rwd;
    flex-flow: wrap;
    margin: 8rwd 0;
  }

  .author-info {
    display: flex;
    align-items: center;
    gap: 8rwd;
    flex-flow: wrap;
  }

  .author-image {
    width: 32rwd;
    height: 32rwd;
    border-radius: 50%;
    object-fit: cover;
  }
`;
