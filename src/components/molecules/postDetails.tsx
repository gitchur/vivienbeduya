"use client";

import usePostReadingTime from "@/hooks/usePostReadingTime";
import { styled } from "@linaria/react";
import Image from "@/components/atoms/image";

interface Props {
  data: Maybe<Sanity.Article>;
}

export default function PostDetails({ data }: Props) {
  const readTime = usePostReadingTime();
  if (!data) return null;
  const { tags, author } = data;


  return (
    <Wrapper>
      <div className="tags">
        {/* TODO: Add tags logic */}
        {tags?.map((tag) => (
          <span key={tag?._key} className="tag-item">{tag?.name}</span>
        ))}
      </div>

      <div className="author-info">
        {author?.image && <Image data={author?.image} loading="eager" className="author-image" />}
        {author?.firstName && <b>Written by {author?.firstName} {author?.lastName || ""}</b>} • {Boolean(readTime) && `${readTime} min read`}
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

  .tag-item {
    padding: 0rwd 8rwd;
    border: 1px solid var(--color-white);
  }

  .author-info {
    display: flex;
    align-items: center;
    gap: 8rwd;
  }

  .author-image {
    width: 32rwd;
    height: 32rwd;
    border-radius: 50%;
    object-fit: cover;
  }

`;
