"use client";

import { IconClose, IconHamburger, IconSearch } from "@/components/atoms/icon";
import Image from "@/components/atoms/image";
import Link from "@/components/atoms/link";
import { mergeClassNames, updateLenisScroll } from "@flight-digital/flightdeck/helpers";
import useHasScrolled from "@flight-digital/flightdeck/hooks/useHasScrolled";
import useScrollDirection from "@flight-digital/flightdeck/hooks/useScrollDirection";
import { styled } from "@linaria/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Nav from "./nav";
import SearchMenu from "./searchMenu";
import RichText from "@/components/molecules/richText";

interface Props {
  data?: Sanity.Maybe<Sanity.Header>;
}

const Header = ({ data }: Props) => {
  const scrolled = useHasScrolled(72, false);
  const direction = useScrollDirection(20);
  const pathname = usePathname();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);

  const handleChangeSearchMenuVisibility = (visible: boolean) => {
    setSearchMenuOpen(visible);
    setSideMenuOpen(false);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is needed to close the side menu on route change
  useEffect(() => {
    // Close side menu on route change
    setSideMenuOpen(false);
    setSearchMenuOpen(false);
    updateLenisScroll("start");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);


  const headerVisible = sideMenuOpen || !Boolean(data?.hideOnScroll) || !scrolled || direction === "up";

  const handleChangeSideMenuVisibility = (value: boolean) => {
    setSideMenuOpen(value);
    window.dispatchEvent(new CustomEvent("lenis-stop", { detail: value }));
  };

  useEffect(() => {
    handleChangeSideMenuVisibility(false);
  }, [pathname]);

  if (!data) return null;
  const { bannerText, logo, navigation } = data;

  return (
    <Wrapper
      className={mergeClassNames("header", scrolled && "scrolled", headerVisible && "visible")}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div className="header-bar">
        <div className="header-bar-content">
          <Nav data={navigation} sideMenuOpen={sideMenuOpen} />
          <Link data={{ url: "/" }} aria-label="Go to Homepage" className="logo-area">
            <Image data={logo} loading="eager" width={230} className="logo" alt="Logo" />
          </Link>
          <button
            className="search-button"
            onClick={() => handleChangeSearchMenuVisibility(true)}
            aria-label="Search">
            <IconSearch size={36} />
          </button>
          {bannerText && <RichText data={bannerText} />}
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
      </div>
      <SearchMenu open={searchMenuOpen} onClose={() => handleChangeSearchMenuVisibility(false)} />
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
    padding: 0 var(--theme-page-horizontal-padding);
    transform: translateY(-102%);
    transition:
      transform 300ms cubic-bezier(0.77, 0.2, 0.5, 1),
      background-color 300ms cubic-bezier(0.77, 0.2, 0.5, 1);
    display: block;

    color: var(--color-fg);
    background: color-mix(in oklch, var(--color-bg) 75%, transparent);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--color-border);

    @media --base-down {
      padding: 0;
      gap: 16rwm;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .header-bar-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32rwd;
    position: relative;
    width: 100%;
    min-height: var(--header-height);

    .rich-text {
      position: absolute;
      top: var(--header-height);
      left: 0;
      right: 0;
      width: 100%;
      height: fit-content;
      z-index: 1;
      background-color: var(--color-highlight);
      color: white;
      text-align: center;
      p {
        margin: 8rwd;
      }
    }

    @media --base-down {
      padding: 0 16rwm;
      p {
        margin: 0;
      }
    }
  }

  .search-button {
    font-size: 36rwd;
  }

  .logo-area {
    display: flex;
    gap: 12rwd;
    max-width: 100rwd;
    padding: 8rwd 0;
    align-items: center;
    text-decoration: none;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    pre {
      font-family: var(--font-secondary);
      font-weight: var(--font-weight-bold);
      letter-spacing: -0.01em;
      color: var(--color-fg);
    }

    @media --base-down {
      height: 50rwm;
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
