import { mergeClassNames } from "@flight-digital/flightdeck/helpers";
import { styled } from "@linaria/react";

interface Props {
  data?: Sanity.BlockMarquee;
  className?: string;
}

export const Marquee = ({ data, className }: Props): React.JSX.Element | null => {
  if (!data?.items?.length) return null;

  return (
    <Wrapper className={mergeClassNames("marquee-block", className)}>
      <Track data-sanity-path="items">
        {data.items.map((item, index) => (
          <Item key={`a-${index}`} data-sanity-path={`[${index}]`} data-sanity-editable>
            {item}
          </Item>
        ))}
        {/* Duplicate for seamless infinite loop */}
        {data.items.map((item, index) => (
          <Item key={`b-${index}`} aria-hidden="true">
            {item}
          </Item>
        ))}
      </Track>
    </Wrapper>
  );
};


const Wrapper = styled.div`
  background-color: var(--bark-700);
  border-top: 1px solid var(--color-border-strong);
  border-bottom: 1px solid var(--color-border-strong);
  overflow: hidden;
  padding: 18rwd 0;

  &:hover .marquee-track {
    animation-play-state: paused;
  }

  @media --base-down {
    padding: 14rwm 0;
  }
`;

const Track = styled.div`
  display: flex;
  gap: 56rwd;
  white-space: nowrap;
  animation: marquee-scroll 60s linear infinite;
  will-change: transform;

  @keyframes marquee-scroll {
    to {
      transform: translateX(-50%);
    }
  }

  @media --base-down {
    gap: 40rwm;
  }
`;

const Item = styled.span`
  font-family: var(--font-secondary);
  font-size: 26rwd;
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.01em;
  color: var(--color-fg-on-dark);
  display: inline-flex;
  align-items: center;
  gap: 28rwd;

  &::after {
    content: "•";
    color: var(--sand-300);
    font-size: 18rwd;
  }

  @media --base-down {
    font-size: 20rwm;
    gap: 20rwm;

    &::after {
      font-size: 14rwm;
    }
  }
`;
