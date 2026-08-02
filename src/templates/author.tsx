import AuthorProfile from "@/components/molecules/authorProfile";
import { ArticleCard } from "@/components/blocks/articlesList/articleCard";
import TextType from "@/components/atoms/textType";
import { SplitPageLayout } from "@/templates/pageLayout.styles";
import ErrorFeedback from "@flight-digital/flightdeck/pebbles/errorFeedback";
import { styled } from "@linaria/react";
import RichText from "@/components/molecules/richText";
import { ArticleExpandButton } from "@/components/molecules/articleExpandButton";

interface Props {
  data: AuthorPageData;
}

export default function AuthorTemplate({ data }: Props): React.JSX.Element {
  const articles = data?.articles?.filter(Boolean) ?? [];

  const { firstName, lastName, bio, role } = data;
  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  return (
    <Wrapper className="page-wrapper">
      <AuthorProfile data={data}>
        <div className="expand-btn-track">
          <ArticleExpandButton />
        </div>
      </AuthorProfile>
      <div className="author-articles-area">
        <span className="eyebrow">Author</span>
        <h1 className="h2">{fullName}</h1>
        {role && <h2 className="h4">{role}</h2>}
        {bio && <RichText data={bio} className="author-profile__bio" />}
        <TextType
          className="author-articles-area__label h5"
          text={[`Stories by ${firstName}`, `Mga Sinulat ng ${firstName}`]}
        />
        {articles.length ? (
          <div className="articles-list-grid">
            {articles.map((article) => (
              <ArticleCard key={article?._id} data={article} />
            ))}
          </div>
        ) : (
          <ErrorFeedback description="No articles found" />
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled(SplitPageLayout)`
  .author-articles-area {
    padding: 64rwd var(--theme-page-horizontal-padding);
  }

  .eyebrow {
    margin-bottom: 8rwd;
    color: var(--color-text-muted);
  }

  .author-articles-area__label {
    display: block;
    margin-top: 64rwd;
    text-transform: uppercase;
  }

  @media --base-down {
    .author-articles-area {
      z-index: 1;
      padding: 16rwm;
      margin: 0 8rwm;
      background-color: var(--color-bg);
    }

    .author-articles-area__label {
      margin-bottom: 16rwm;
    }
  }
`;
