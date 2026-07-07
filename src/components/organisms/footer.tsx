import SanityIcon from "@flight-digital/flightdeck/pebbles/sanityIcon";
import { styled } from "@linaria/react";
import Link from "../atoms/link";
import RichText from "../molecules/richText";
import KlaviyoEmbed from "../molecules/klaviyoEmbed";
import CircularText from "../atoms/circurlarText";

interface Props {
  data: Sanity.Maybe<Sanity.Footer>;
  socialMedias?: Sanity.Maybe<readonly Sanity.Maybe<Sanity.SocialMedia>[]> | undefined;
}

const Footer = ({ data, socialMedias }: Props) => {
  if (!data) return null;

  const copyrightYear = new Date().getFullYear();
  const { navigation, copyright } = data;

  return (
    <Wrapper>
      <div className="nav-menus">
        <div className="footer-excerpt">
          {copyright && <RichText data={copyright} />}
          <div className="social-media-links">
            <ul>
              {socialMedias?.map((socialMedia) => (
                <li key={socialMedia?._key}>
                  <a
                    href={socialMedia?.url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-media-link"
                  >
                    <SanityIcon data={socialMedia?.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {navigation?.map((nav) => (
          <div className="nav-menu" key={nav?._key}>
            <p className="title">{nav?.title}</p>
            <ul className="nav-list">
              {nav?.links?.map((link) => (
                <li key={link?._key}>
                  <Link data={link} className="nav-link" />
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="newsletter">
          <h5>Get the banter in your inbox</h5>
          <KlaviyoEmbed />
        </div>
        <CircularText
          text="GET*WITH*THE*BANTER*"
          onHover="speedUp"
          spinDuration={20}
        />
      </div>
      <div className="footer-bottom">
        <span className="small">&copy; {copyrightYear} Bisaya Banter</span>
        <span className="small">Made with gugma ❤️ in Aotearoa</span>
      </div>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
  width: 100%;
  position: relative;
  padding: 64rwd var(--theme-page-horizontal-padding) 16rwd;
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 24rwd;
  color: var(--color-fg-on-dark);
  overflow: hidden;

  background: var(--gradient-footer);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;

  .footer-excerpt {
    width: 300rwd;
  }

  .newsletter {
    text-align: right;
    display: flex;
    flex-direction: column;
    gap: 8rwd;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: oklch(45% 0.077 188 / 0.55);
    pointer-events: none;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }


@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}


  @media --base-down {
    padding: 32rwm var(--theme-page-horizontal-padding);
    gap: 16rwm;
  }

  .nav-link {
    display: inline-block;
    color: inherit;
    text-decoration: none;
    position: relative;
    padding: 4rwd 0;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -2px;
      height: 1px;
      background: currentColor;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 200ms cubic-bezier(0.2, 0.7, 0.2, 1);
    }

    &:hover::after {
      transform: scaleX(1);
    }
  }

  .nav-menus {
    display: flex;
    gap: 64rwd;

    @media --base-down {
      gap: 16rwm;
      flex-direction: column;
    }

    .nav-menu {
      display: flex;
      flex: 1;
      flex-direction: column;

      svg {
        fill: currentColor;
      }

      .title {
        font-size: 14rwd;
        margin-bottom: 8rwd;
        text-transform: uppercase;
        font-family: monospace;
        color: var(--color-fg-on-dark);

        @media --base-down {
          font-size: 14rwm;
          margin-bottom: 16rwm;
        }
      }
    }

    .nav-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 4rw;
    }

  }

  .social-media-links {
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      gap: 20rw;
    }
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16rwd;
    margin-top: 32rwd;
    padding-top: 24rwd;
    border-top: 1px solid var(--color-border);
    letter-spacing: 0.08em;

    @media --base-down {
      gap: 16rwm;
      margin-top: 16rwm;
      padding-top: 16rwm;
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;
