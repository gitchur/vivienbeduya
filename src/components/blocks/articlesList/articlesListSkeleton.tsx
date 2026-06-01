import { mergeClassNames } from "@flight-digital/flightdeck/helpers";

export const ArticlesListSkeleton = (): React.JSX.Element => {
  return (
    <div
      className={mergeClassNames("articles-list-skeleton")}
      aria-busy="true"
      aria-label="Loading articles"
    >
      <div className="articles-list-skeleton__filters">
        <div className="articles-list-skeleton__pill" />
        <div className="articles-list-skeleton__pill" />
        <div className="articles-list-skeleton__pill" />
      </div>
      <div className="articles-list-skeleton__grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="articles-list-skeleton__card" />
        ))}
      </div>
    </div>
  );
};
