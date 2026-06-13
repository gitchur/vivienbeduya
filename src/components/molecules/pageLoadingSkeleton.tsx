import { mergeClassNames } from "@flight-digital/flightdeck/helpers";

export const PageLoadingSkeleton = () => {
  return (
    <div
      className={mergeClassNames("page-loading")}
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="page-loading__header">
        <div className="page-loading__logo" />
        <div className="page-loading__nav">
          <div className="page-loading__nav-item" />
          <div className="page-loading__nav-item" />
          <div className="page-loading__nav-item" />
        </div>
      </div>

      <div className="page-loading__hero" />

      <div className="page-loading__content">
        <div className="page-loading__main">
          <div className={mergeClassNames("page-loading__line", "page-loading__line--wide")} />
          <div className="page-loading__line" />
          <div className="page-loading__line" />
          <div className={mergeClassNames("page-loading__line", "page-loading__line--short")} />
        </div>
        <div className="page-loading__side">
          <div className="page-loading__side-card" />
          <div className="page-loading__side-card" />
        </div>
      </div>

      <div className="page-loading__footer" />
    </div>
  );
};
