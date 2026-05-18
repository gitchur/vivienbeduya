"use client";

import { IconClose } from "@/components/atoms/icon";
import { mergeClassNames, updateLenisScroll } from "@flight-digital/flightdeck/helpers";
import { styled } from "@linaria/react";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  width?: string;
  shouldUpdateLenisScroll?: boolean;
}

const SideMenu = ({
  children,
  open,
  onClose,
  width = "40vw",
  shouldUpdateLenisScroll = true,
}: Props) => {
  useEffect(() => {
    if (shouldUpdateLenisScroll) updateLenisScroll(open ? "stop" : "start");
  }, [open, shouldUpdateLenisScroll]);

  return (
    <Wrapper className={mergeClassNames("side-menu", open && "open")}>
      <div className="side-menu-overlay" onClick={onClose} />
      <div className="side-menu-content" style={{ width }}>
        <div className="side-menu-body" data-lenis-prevent>
          {children}
        </div>
        <IconClose size={20} onClick={onClose} />
      </div>
    </Wrapper>
  );
};

export default SideMenu;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  pointer-events: none;

  &.open {
    pointer-events: all;

    .side-menu-overlay {
      opacity: 1;
    }

    .side-menu-content {
      transform: translateX(0);
    }
  }

  .side-menu-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
    opacity: 0;
    transition: opacity 300ms cubic-bezier(0.77, 0.2, 0.5, 1);
  }

  .side-menu-content {
    position: absolute;
    top: 0;
    right: 0;
    width: 40vw;
    height: 100%;
    background-color: var(--color-beige-50);
    z-index: 100;
    transform: translateX(100%);
    transition: transform 300ms cubic-bezier(0.77, 0.2, 0.5, 1);

    @media --base-down {
      width: 100% !important;
    }
  }

  .close-side-menu-btn {
    position: fixed;
    top: 30rwd;
    right: 40rwd;
    z-index: 110;

    @media --base-down {
      top: 20rwm;
      right: 20rwm;
    }
  }

  .side-menu-body {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
`;
