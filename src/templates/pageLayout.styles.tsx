import { styled } from "@linaria/react";

/**
 * Shared two-column layout for full-page templates that pair a sticky info
 * panel (left) with scrollable content (right) - e.g. article and author pages.
 * Collapses to a single stacked column on mobile.
 */
export const SplitPageLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  transition: grid-template-columns 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  @media --base-down {
    display: flex;
    flex-direction: column;
  }
`;

/**
 * Sticky, full-height panel with a darkened background image, used for the
 * left-hand info column of full-page templates (article and author pages).
 */
export const StickyImagePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16rwd;
  position: sticky;
  top: 0;
  min-height: 100dvh;
  height: fit-content;
  padding: 32rwd;
  color: var(--color-fg-on-dark);

  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    object-position: center;
    filter: brightness(0.6);
  }

  @media --base-down {
    padding: 16rwm;
    gap: 16rwm;
    position: relative;
    justify-content: flex-end;

    .background-image {
      position: fixed;
    }
  }
`;
