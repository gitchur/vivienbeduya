import { mergeClassNames } from "@flight-digital/flightdeck/helpers";
import { styled } from "@linaria/react";

interface Props {
  className?: string;
}

/** Side view of a paraw, the Visayan double-outrigger sailboat. Decorative only. */
export const Paraw = ({ className }: Props): React.JSX.Element => {
  return (
    <Svg
      className={mergeClassNames("paraw", className)}
      viewBox="0 0 48 32"
      fill="none"
      aria-hidden
    >
      <path className="paraw__sail" d="M21 2c6 5 11 11 15 19H21Z" />
      <path d="M21 1v23" />
      <path d="M2 29h44M12 24v5M36 24v5" />
      <path className="paraw__hull" d="M4 21c4 4 12 4 20 4s16 0 20-4c-3 6-11 7-20 7S7 27 4 21Z" />
    </Svg>
  );
};

// ============================================
// STYLED COMPONENTS
// ============================================

const Svg = styled.svg`
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
  stroke: var(--color-accent);
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;

  .paraw__sail {
    fill: var(--color-bg-warm);
  }

  .paraw__hull {
    fill: var(--color-accent);
  }
`;
