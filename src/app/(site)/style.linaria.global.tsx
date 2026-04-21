import { css } from "@linaria/core";

export const globals = css`
  :global() {
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    body {
      --color-black: #1b1b2f;
      --color-white: #f5f0e8;
      --color-violet: #3d348b;
      --color-mango: #f2c744;
      --color-red: #e8503a;

      --header-height: 72rwd;

      --font-primary: "Outfit", Arial, system-ui, "Open Sans", sans-serif;
      --font-secondary: "Tilt Warp", Arial, system-ui, "Open Sans", sans-serif;
      --font-weight-light: 300;
      --font-weight-regular: 400;
      --font-weight-bold: 600;

      --theme-page-horizontal-padding: 32rwd;

      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      font-family: var(--font-primary);
      font-size: 17rwd;
      font-weight: var(--font-weight-light);
      background-color: var(--color-white);
      color: var(--color-black);
      line-height: 1.5;

      main {
        padding-bottom: 32rwd;
      }

      .modal{
        z-index: 1000;
      }

      .popup-content {
        padding: 80rwd 60rwd;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 40rwd;

        p {
          font-size: 14rwd;
        }

        .logo {
          width: 250rwd;
          margin: auto;
        }
      }

      .popup-button {
        text-decoration: underline;
        color: var(--color-yellow);
        cursor: pointer;
      }

      .close-button {
        width: 30rwd;
        height: 30rwd;
      }

      hr {
        border-color: #9FA6A2 !important;
      }

      @media --base-down {
        --theme-page-horizontal-padding: 16rwm;
        font-size: 15rwm;
        .popup-content .logo {
          width: 200rwm;
        }
        .popup-content {
          padding: 64rwm 16rwm;
        }
      }

      script {
        display: none !important;
      }

      strong,
      b {
        font-weight: var(--font-weight-bold);
      }

      img {
        display: block;
        height: auto;
        max-width: 100%;
        width: 100%;
      }

      ul,
      ol {
        padding-left: 24rwd;

        @media --base-down {
          padding-left: 16rwm;
        }
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      a,
      button,
      select,
      input,
      textarea {
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        line-height: inherit;
        color: inherit;
        display: block;
        margin: 0;
        padding: 0;
      }

      input {
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        &[type="number"] {
          -moz-appearance: textfield;
        }
      }


      h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-secondary);
      }

      h1,
      .h1,
      h2,
      .h2,
      h3,
      .h3,
      h4,
      .h4,
      h5,
      .h5,
      h6,
      .h6 {
        font-weight: var(--font-weight-regular);
        line-height: 1; 
      }

      .h1,
      h1 {
        font-size: 59rwd;
      }

      .h2,
      h2 {
        font-size: 56rwd;
      }

      .h3,
      h3 {
        font-size: 40rwd;
      }

      .h4,
      h4 {
        font-size: 30rwd;
      }

      .h5,
      h5 {
        font-size: 24rwd;
      }

      .h6,
      h6 {
        font-size: 18rwd;
      }

      p,
      .p {
        font-size: 17rwd;
      }

      small,
      .small {
        font-size: 13rwd;
        line-height: 1;
      }

      @media --base-down {
        .h1,
        h1 {
          font-size: 36rwm;
        }

        .h2,
        h2 {
          font-size: 32rwm;
        }

        .h3,
        h3 {
          font-size: 28rwm;
        }

        .h4,
        h4 {
          font-size: 24rwm;
        }

        .h5,
        h5 {
          font-size: 20rwm;
        }

        .h6,
        h6 {
          font-size: 16rwm;
        }

        p,
        .p {
          font-size: 14rwm;
        }

        .caption,
        small,
        .small {
          font-size: 15rwm;
        }
      }

      .button,
      button,
      a {
        font-style: normal;
        transition: color 300ms;
        text-decoration: none;
        cursor: pointer;
        border: none;
        background: none;
        outline: none;

        &:disabled {
          opacity: 0.6;
          pointer-events: none;
          cursor: disabled;
        }

        &:hover {
          color: var(--color-yellow);
        }

        &.design {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          column-gap: 8rw;
          transition: color 300ms, border-color 300ms;
          overflow: visible;
          width: fit-content;
          padding: 10rw 24rw;
          border: none;
          background: transparent;
          height: 40rwd;
          min-height: 40rwd;
          color: var(--color-white);
          font-family: var(--font-primary);

          &::before {
            content: "";
            position: absolute;
            inset: 0;
            z-index: -1;
            border-radius: inherit;
            pointer-events: none;
            background: linear-gradient(90deg, #f2c744, #e8503a, #3d348b);
          }

          &::after {
            content: "";
            position: absolute;
            inset: 0;
            z-index: 0;
            border-radius: inherit;
            background-color: var(--color-violet);
            pointer-events: none;
            border: 1px solid transparent;
            transition: transform 250ms;
          }

          & > * {
            position: relative;
            z-index: 1;
            transition: transform 250ms;
          }

          &:hover::after,
          &:hover > * {
            transform: translate(-4rwd, -4rwd);
            font-weight: var(--font-weight-bold);
            background-color: var(--color-white);
          }

          &:active::after,
          &:active > * {
            transform: translate(0);
          }

          @media --base-down {
            column-gap: 8rwm;
            padding: 8rwm 16rwm;
            height: 24rwm;
            min-height: 24rwm;
            border-radius: 6rwm;
            font-size: 10rwm;

            &:hover::after,
            &:hover > * {
              transform: translate(-4rwm, -4rwm);
            }
          }

          &.full-width {
            width: 100%;
            min-width: unset;
            justify-content: center;
          }

          &.violet {
            color: var(--color-white);

            &::after {
              background-color: var(--color-violet);
              border-color: var(--color-violet);
            }

            &:hover {
              color: var(--color-violet);

              &::after {
                background-color: var(--color-white);
                border-color: var(--color-violet);
              }
            }
          }
        }
      }

      .translation-mark {
        display: inline;
      }

      .translation-mark__trigger {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-left: 0.15em;
        padding: 0;
        border: none;
        background: none;
        color: inherit;
        cursor: pointer;
        opacity: 0.7;
        vertical-align: super;
        font-size: 0.65em;
        line-height: 0;
      }

      .translation-mark__trigger:hover {
        opacity: 1;
      }

      .translation-mark__trigger svg {
        width: 1em;
        height: 1em;
      }

      .translation-mark__translated {
        font-style: italic;
        animation: translation-reveal 0.6s ease-out forwards;
      }

      @keyframes translation-reveal {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      // Use this to hide elements from the screen but keep them accessible to screen readers
      .visually-hidden {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        white-space: nowrap;
        width: 1px;
      }

      // Use to create a hidden link on a card to trigger the card click, check the CTA Card
      .card-hidden-link {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        opacity: 0;

        .label {
          display: none;
        }
      }

      .error-message {
        text-align: center;
        color: rgb(229, 63, 63);
        font-size: 14rw;
      }

      .desktop-only {
        @media --base-down {
          display: none;
        }
      }

      .mobile-only {
        @media --base-up {
          display: none;
        }
      }
    }
  }
`;
