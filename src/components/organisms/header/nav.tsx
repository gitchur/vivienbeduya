import Link from "@/components/atoms/link";
import { mobileBreakpoint } from "@/utils/constants";
import validateType from "@/utils/validateType";
import { mergeClassNames } from "@flight-digital/flightdeck/helpers";
import useMediaQuery from "@flight-digital/flightdeck/hooks/useMediaQuery";
import { styled } from "@linaria/react";
import { useState } from "react";

interface Props {
  data: Sanity.Maybe<readonly Sanity.Maybe<Sanity.HeaderNavMenuOrLink>[]>;
  sideMenuOpen: boolean;
}

interface MenuProps {
  data: Sanity.Maybe<Sanity.HeaderNavMenu>;
  isMobile: boolean;
}

const Menu = ({ data, isMobile }: MenuProps) => {
  const [open, setOpen] = useState(false);

  if (!data?._key) return null;
  return (
    <div
      className={mergeClassNames("nav-menu", open && "open")}
      onClick={isMobile ? () => setOpen((p) => !p) : undefined}
      onMouseEnter={isMobile ? undefined : () => setOpen(true)}
      onMouseLeave={isMobile ? undefined : () => setOpen(false)}
    >
      <button
        aria-haspopup
        aria-expanded={open}
        className="nav-menu-button"
        id={data._key}
        aria-controls={`${data._key}-menu`}
      >
        {data.title}
      </button>
      <div className={mergeClassNames("nav-menu-content", open && "open")}>
        <ul id={`${data._key}-menu`} role="menu" aria-hidden={!open}>
          {data.links?.map((el) => (
            <li key={el?._key}>
              <Link data={el} className="nav-menu-link" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Nav = ({ data, sideMenuOpen }: Props) => {
  const isMobile = useMediaQuery(mobileBreakpoint);

  return (
    <Wrapper
      aria-label="Main menu"
      className={mergeClassNames("navigation", sideMenuOpen && "open")}
    >
      <ul className="navigation-list">
        {data?.filter(Boolean)?.map((el) => (
          <li key={el?._key}>
            {validateType.isLink(el) ? (
              <Link data={el} className="nav-link" />
            ) : (
              //@ts-ignore
              <Menu data={el} isMobile={isMobile || false} />
            )}
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default Nav;

const Wrapper = styled.nav`
  height: fit-content;
  margin: auto 0;

  @media --base-down {
    position: fixed;
    top: var(--header-height);
    left: 0;
    width: 100%;
    height: calc(100dvh - var(--header-height));
    background-color: var(--color-white);
    color: var(--color-violet);
    z-index: 100;
    transform: translateX(100%);
    transition: transform 300ms cubic-bezier(0.77, 0.2, 0.5, 1);

    &.open {
      transform: translateX(0);
    }
  }

  .navigation-list {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 24rwd;
    margin: 0;
    padding: 0;
    position: relative;

    @media --base-down {
      gap: 16rwm;
      padding: 16rwm;
      flex-direction: column;
      align-items: flex-start;
      overflow-y: auto;
      height: 100%;
    }
  }

  .nav-menu-content {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    width: max-content;
    padding-top: 32rwd;

    @media --base-down {
      padding-top: 0;
      position: relative;
      max-height: 0;
      overflow: hidden;
    }

    &.open {
      opacity: 1;
      pointer-events: all;

      @media --base-down {
        max-height: max-content;
      }
    }

    ul {
      background-color: var(--color-white);
      border: 1px solid grey;
      color: var(--color-violet);
      padding: 4rwd;
      border-radius: 4rwd;
      list-style: none;
      margin: 0;
      display: flex;
      flex-direction: column;

      @media --base-down {
        padding: 16rwm 16rwm 0;
        border-radius: 0;
      }

      li .link {
        padding: 16rwd;
        border-radius: 4rwd;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8rwd;
        min-width: 350rwd;
        transition: background-color 300ms;

        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        @media --base-down {
          padding: 8rwm 0;
          border-radius: 0;
          gap: 0;
          min-width: unset;
          width: 100%;
        }
      }
    }
  }
`;
