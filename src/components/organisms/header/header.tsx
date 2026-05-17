"use client";

import { IconClose, IconHamburger } from "@/components/atoms/icon";
import Image from "@/components/atoms/image";
import Link from "@/components/atoms/link";
import { mergeClassNames } from "@flight-digital/flightdeck/helpers";
import useHasScrolled from "@flight-digital/flightdeck/hooks/useHasScrolled";
import useScrollDirection from "@flight-digital/flightdeck/hooks/useScrollDirection";
import { styled } from "@linaria/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Nav from "./nav";

interface Props {
  data?: Sanity.Maybe<Sanity.Header>;
}

const Header = ({ data }: Props) => {
  const scrolled = useHasScrolled(72, false);
  const direction = useScrollDirection(20);
  const pathname = usePathname();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const headerVisible = sideMenuOpen || !Boolean(data?.hideOnScroll) || !scrolled || direction === "up";

  const handleChangeSideMenuVisibility = (value: boolean) => {
    setSideMenuOpen(value);
    window.dispatchEvent(new CustomEvent("lenis-stop", { detail: value }));
  };

  useEffect(() => {
    handleChangeSideMenuVisibility(false);
  }, [pathname]);

  if (!data) return null;
  return (
    <Wrapper
      className={mergeClassNames("header", scrolled && "scrolled", headerVisible && "visible")}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div className="header-bar">
        <Link data={{ url: "/" }} aria-label="Go to Homepage" className="logo-area">
          <Image data={data.logo} loading="eager" width={230} className="logo" alt="Logo" />
        </Link>
        <Nav data={data.navigation} sideMenuOpen={sideMenuOpen} />
        <div className="mobile-menu">
          <button
            className="mobile-menu-button"
            onClick={() => handleChangeSideMenuVisibility(!sideMenuOpen)}
            aria-label="toggle side menu"
          >
            {sideMenuOpen ? (
              <IconClose size={24} color="var(--color-fg)" />
            ) : (
              <IconHamburger size={24} color="var(--color-fg)" />
            )}
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  width: 100%;
  height: var(--header-height);
  min-height: var(--header-height);
  position: relative;

  @media --base-down {
    --header-height: 68rwm;
  }

  &.visible {
    .header-bar {
      transform: translateY(0);
    }
  }

  .header-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 20;
    min-height: var(--header-height);
    transform: translateY(-102%);
    transition:
      transform 300ms cubic-bezier(0.77, 0.2, 0.5, 1),
      background-color 300ms cubic-bezier(0.77, 0.2, 0.5, 1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32rwd;
    padding: 0 var(--theme-page-horizontal-padding);
    color: var(--color-fg);
    background: color-mix(in oklch, var(--color-bg) 82%, transparent);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--color-border);

    @media --base-down {
      padding: 0 16rwm;
      gap: 16rwm;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .logo-area {
    display: flex;
    gap: 12rwd;
    max-width: 100rwd;
    padding: 8rwd 0;
    align-items: center;
    text-decoration: none;

    pre {
      font-family: var(--font-secondary);
      font-weight: var(--font-weight-bold);
      letter-spacing: -0.01em;
      color: var(--color-fg);
    }

    @media --base-down {
      width: 150rwm;
      min-width: 130rwm;
      height: 34rwm;
    }

    .image {
      width: 100%;
      height: 100%;
      object-position: left;
      object-fit: contain;
    }
  }

  .mobile-menu {
    @media --base-up {
      display: none;
    }
  }
`;
