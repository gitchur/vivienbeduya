import { css } from "@linaria/core";

export const globals = css`
  :global() {
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    body {
      /* ── Raw palette ───────────────────────────────────────────
       * Reference by semantic tokens only. Components must not
       * reach for these directly.
       */
      
      /* Teal family */
      --deep-teal:          #00695c;
      --deep-teal-hover:    #005548;
      --coastal-teal:       #299d8f;
      --coastal-teal-hover: #1a8a7d;

      /* Green family */
      --forest-700: #2e5e3e;

      /* Sand family */
      --sand-200: #d9c6a1;
      --sand-300: #c9af82;

      /* Cream family */
      --cream-50:  #f4f1ec;
      --cream-100: #ece8df;
      --cream-200: #e0d9ce;

      /* Mist family */
      --mist-50:  #eef4f3;
      --mist-100: #e4edeb;

      /* Bark family — text only, never backgrounds */
      --bark-700: #2c413f;
      --bark-800: #0e1d1a;
      --bark-900: #050e0d;

      /* Stone */
      --stone-400: #a8a293;

      /* Status */
      --brick-600: #8b2120;
      --amber-600: #8a5c00;

      /* ── Semantic tokens ────────────────────────────────────────
       * Components always use these. Raw tokens are only referenced
       * here and in the gradient definitions below.
       */

      /* Surfaces */
      --color-white: #ffffff;
      --color-bg:              var(--cream-50);
      --color-bg-elevated:     var(--cream-100);
      --color-bg-recessed:     var(--cream-200);
      --color-bg-mist:         var(--mist-50);
      --color-bg-warm:         var(--sand-200);
      --color-bg-inverted:     var(--deep-teal);
      --color-bg-inverted-alt: var(--forest-700);

      /* Text */
      --color-fg:         var(--bark-800);
      --color-fg-muted:   var(--bark-700);
      --color-fg-subtle:  color-mix(in oklch, var(--bark-700) 55%, transparent);
      --color-fg-on-dark: var(--cream-50);

      /* Brand & interaction */
      --color-accent:       var(--deep-teal);
      --color-accent-hover: var(--deep-teal-hover);
      --color-link:         var(--deep-teal);
      --color-link-hover:   var(--deep-teal-hover);
      --color-tag:          var(--forest-700);
      --color-highlight:    var(--coastal-teal);

      /* Borders & rules */
      --color-border:        color-mix(in oklch, var(--bark-700) 14%, transparent);
      --color-border-strong: color-mix(in oklch, var(--bark-700) 28%, transparent);
      --color-rule:          var(--stone-400);
      --color-text-muted:    var(--stone-400);

      /* Status */
      --color-error:   var(--brick-600);
      --color-success: var(--forest-700);
      --color-warning: var(--amber-600);
      --color-info:    var(--coastal-teal);

      /* Gradients */
      --gradient-button: linear-gradient(90deg, var(--deep-teal), var(--coastal-teal), var(--forest-700));
      --gradient-footer: linear-gradient(-45deg, var(--deep-teal), var(--coastal-teal), var(--sand-200));

      --header-height: 72rwd;

      --font-primary: "DM Sans", Arial, system-ui, "Open Sans", sans-serif;
      --font-secondary: "Fraunces", Arial, system-ui, "Open Sans", sans-serif;
      --font-weight-light: 300;
      --font-weight-regular: 400;
      --font-weight-bold: 600;

      --theme-page-horizontal-padding: 64rwd;

      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      font-family: var(--font-primary);
      font-size: 17rwd;
      font-weight: var(--font-weight-light);
      background-color: var(--color-bg-elevated);
      color: var(--color-fg);
      line-height: 1.5;

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
        color: var(--color-accent-hover);
        cursor: pointer;
      }

      .close-button {
        width: 30rwd;
        height: 30rwd;
      }

      hr {
        border-color: var(--color-rule) !important;
      }

      .rich-text {
        p {
          margin-bottom: 16rwd;
        }
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
        padding-bottom: 16rwd;
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
          color: var(--color-accent-hover);
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
          color: var(--color-fg-on-dark);
          font-family: var(--font-primary);
          span {
            white-space: nowrap;
          }

          &::before {
            content: "";
            position: absolute;
            inset: 0;
            z-index: -1;
            border-radius: inherit;
            pointer-events: none;
            background: var(--gradient-button);
          }

          &::after {
            content: "";
            position: absolute;
            inset: 0;
            z-index: 0;
            border-radius: inherit;
            background-color: var(--color-accent);
            pointer-events: none;
            border: 1px solid transparent;
            transition: transform 300ms;
          }

          & > * {
            position: relative;
            z-index: 1;
            transition: transform 300ms;
          }

          &:hover::after {
            transform: translate(-4rwd, -4rwd);
            background-color: var(--color-bg);
          }

          &:hover > * {
            transform: translate(-4rwd, -4rwd);
            font-weight: var(--font-weight-bold);
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

          &.bark,
          &.accent {
            --btn-ease: cubic-bezier(0.2, 0.7, 0.2, 1);
            --btn-fg: var(--color-fg-on-dark);
            --btn-surface: var(--bark-700);
            --btn-border: var(--bark-700);
            --btn-fg-hover: var(--color-accent);
            --btn-surface-hover: var(--color-bg);
            --btn-border-hover: var(--color-accent);

            transition: color 300ms var(--btn-ease);

            &::after {
              transition:
                transform 300ms var(--btn-ease),
                background-color 300ms var(--btn-ease),
                border-color 300ms var(--btn-ease);
            }

            & > * {
              background-color: transparent;
              transition: transform 300ms var(--btn-ease);
            }
          }

          &.bark {
            color: var(--btn-fg);

            &::after {
              background-color: var(--btn-surface);
              border-color: var(--btn-border);
            }

            &:hover {
              color: var(--btn-fg-hover);

              &::after {
                background-color: var(--btn-surface-hover);
                border-color: var(--btn-border-hover);
              }
            }
          }

          &.accent {
            color: var(--btn-fg-hover);

            &::after {
              background-color: var(--btn-surface-hover);
              border-color: var(--btn-border-hover);
            }

            &:hover {
              color: var(--btn-fg);

              &::after {
                background-color: var(--btn-surface);
                border-color: var(--btn-border);
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

      .category-filters__tag {
        padding: 4rwd 12rwd;
        border-radius: 999px;
        background-color: var(--color-bg-recessed);
        color: var(--bark-700);
        text-decoration: none;
        transition:
          background-color 0.2s ease,
          color 0.2s ease;

        @media --base-down {
          padding: 4rwm 12rwm;
        }
      }

      .category-filters__tag:hover {
        background-color: var(--bark-700);
        color: var(--color-white);
      }

      .category-filters__tag--active {
        background-color: var(--color-bg-inverted);
        color: var(--color-white);
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
        color: var(--color-error);
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

      @keyframes page-loading-shimmer {
        0% {
          opacity: 0.55;
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0.55;
        }
      }

      .page-loading {
        display: flex;
        flex-direction: column;
        gap: 32rwd;
        min-height: 100dvh;
        padding: 64rwd var(--theme-page-horizontal-padding);
      }

      .page-loading__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24rwd;
      }

      .page-loading__logo {
        width: 160rwd;
        height: 24rwd;
        border-radius: 8px;
        background-color: var(--color-bg-recessed);
        animation: page-loading-shimmer 1.4s ease-in-out infinite;
      }

      .page-loading__nav {
        display: flex;
        gap: 16rwd;
      }

      .page-loading__nav-item {
        width: 72rwd;
        height: 16rwd;
        border-radius: 8px;
        background-color: var(--color-bg-recessed);
        animation: page-loading-shimmer 1.4s ease-in-out infinite;
      }

      .page-loading__hero {
        width: 100%;
        max-width: 100%;
        height: 280rwd;
        border-radius: 8px;
        background-color: var(--color-bg-recessed);
        animation: page-loading-shimmer 1.4s ease-in-out infinite;
      }

      .page-loading__content {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 24rwd;
      }

      .page-loading__main {
        display: flex;
        flex-direction: column;
        gap: 16rwd;
      }

      .page-loading__lines {
        display: flex;
        flex-direction: column;
        gap: 16rwd;
        max-width: 720rwd;
      }

      .page-loading__side {
        display: flex;
        flex-direction: column;
        gap: 16rwd;
      }

      .page-loading__side-card {
        width: 100%;
        min-height: 120rwd;
        border-radius: 8px;
        background-color: var(--color-bg-recessed);
        animation: page-loading-shimmer 1.4s ease-in-out infinite;
      }

      .page-loading__footer {
        width: 100%;
        height: 64rwd;
        border-radius: 8px;
        background-color: var(--color-bg-recessed);
        animation: page-loading-shimmer 1.4s ease-in-out infinite;
      }

      .page-loading__line {
        height: 16rwd;
        border-radius: 4px;
        background-color: var(--color-bg-recessed);
        animation: page-loading-shimmer 1.4s ease-in-out infinite;

        &.page-loading__line--wide {
          height: 32rwd;
          max-width: 480rwd;
        }

        &.page-loading__line--short {
          max-width: 240rwd;
        }
      }

      .articles-list-skeleton {
        display: flex;
        flex-direction: column;
        gap: 32rwd;
        min-height: 320rwd;
        padding: 32rwd var(--theme-page-horizontal-padding);
      }

      .articles-list-skeleton__filters {
        display: flex;
        flex-wrap: wrap;
        gap: 8rwd;
      }

      .articles-list-skeleton__pill {
        width: 80rwd;
        height: 32rwd;
        border-radius: 999px;
        background-color: var(--color-bg-recessed);
        animation: page-loading-shimmer 1.4s ease-in-out infinite;
      }

      .articles-list-skeleton__grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24rwd;
      }

      .articles-list-skeleton__card {
        height: 280rwd;
        border-radius: 8px;
        background-color: var(--color-bg-recessed);
        animation: page-loading-shimmer 1.4s ease-in-out infinite;
      }

      @media --base-down {
        .page-loading {
          gap: 24rwm;
          padding: 32rwm var(--theme-page-horizontal-padding);
        }

        .page-loading__header {
          gap: 16rwm;
        }

        .page-loading__logo {
          width: 120rwm;
          height: 20rwm;
        }

        .page-loading__nav {
          gap: 8rwm;
        }

        .page-loading__nav-item {
          width: 48rwm;
          height: 14rwm;
        }

        .page-loading__hero {
          max-width: 100%;
          height: 160rwm;
        }

        .page-loading__content {
          grid-template-columns: 1fr;
          gap: 16rwm;
        }

        .page-loading__main {
          gap: 12rwm;
        }

        .page-loading__lines {
          gap: 12rwm;
          max-width: 100%;
        }

        .page-loading__side {
          gap: 12rwm;
        }

        .page-loading__side-card {
          min-height: 96rwm;
        }

        .page-loading__footer {
          height: 48rwm;
        }

        .page-loading__line {
          height: 14rwm;

          &.page-loading__line--wide {
            height: 24rwm;
          }
        }

        .articles-list-skeleton {
          gap: 24rwm;
          min-height: 240rwm;
          padding: 24rwm var(--theme-page-horizontal-padding);
        }

        .articles-list-skeleton__filters {
          gap: 8rwm;
        }

        .articles-list-skeleton__pill {
          width: 64rwm;
          height: 28rwm;
        }

        .articles-list-skeleton__grid {
          grid-template-columns: 1fr;
          gap: 16rwm;
        }

        .articles-list-skeleton__card {
          height: 200rwm;
        }
      }
    }
  }
`;
