/* eslint-disable */

/* prettier-ignore */

declare namespace Sanity {

type Maybe<T> = T | null;
type InputMaybe<T> = T | null;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: string; output: string; }
  DateTime: { input: any; output: any; }
  JSON: { input: Record<string, unknown>; output: Record<string, unknown>; }
};

type Accordion = {
  readonly __typename?: 'Accordion';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly content: Maybe<RichText>;
  readonly openByDefault: Maybe<Scalars['Boolean']['output']>;
  readonly title: Maybe<Scalars['String']['output']>;
};

type AccordionFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly content: InputMaybe<RichTextFilter>;
  readonly openByDefault: InputMaybe<BooleanFilter>;
  readonly title: InputMaybe<StringFilter>;
};

type AccordionOrAdaptiveImageOrButtonOrButtonsListOrComponentPrimitiveValueOrCssUnitOrCtaCardOrGapOrHeadingOrImageWithMetaOrLinkOrLinkWithoutTextOrResponsiveImageOrResponsiveNumberOrResponsiveStringOrRichText = Accordion | AdaptiveImage | Button | ButtonsList | ComponentPrimitiveValue | CssUnit | CtaCard | Gap | Heading | ImageWithMeta | Link | LinkWithoutText | ResponsiveImage | ResponsiveNumber | ResponsiveString | RichText;

type AccordionOrAdaptiveImageOrButtonOrButtonsListOrCtaCardOrGapOrHeadingOrImageWithMetaOrLinkOrLinkWithoutTextOrResponsiveImageOrResponsiveNumberOrResponsiveStringOrRichText = Accordion | AdaptiveImage | Button | ButtonsList | CtaCard | Gap | Heading | ImageWithMeta | Link | LinkWithoutText | ResponsiveImage | ResponsiveNumber | ResponsiveString | RichText;

type AccordionOrAdaptiveImageOrButtonsListOrCodeBlockOrCtaCardOrGapOrRichText = Accordion | AdaptiveImage | ButtonsList | CodeBlock | CtaCard | Gap | RichText;

type AccordionSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly content: InputMaybe<RichTextSorting>;
  readonly openByDefault: InputMaybe<SortOrder>;
  readonly title: InputMaybe<SortOrder>;
};

type AdaptiveImage = {
  readonly __typename?: 'AdaptiveImage';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly align: Maybe<Scalars['String']['output']>;
  readonly altText: Maybe<Scalars['String']['output']>;
  readonly desktopImage: Maybe<Image>;
  /** Lazy by default (Defer until image is visible) */
  readonly loading: Maybe<Scalars['String']['output']>;
  readonly maxHeight: Maybe<CssUnit>;
  readonly maxWidth: Maybe<CssUnit>;
  readonly mobileImage: Maybe<Image>;
  readonly objectFit: Maybe<Scalars['String']['output']>;
};

type AdaptiveImageFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly align: InputMaybe<StringFilter>;
  readonly altText: InputMaybe<StringFilter>;
  readonly desktopImage: InputMaybe<ImageFilter>;
  readonly loading: InputMaybe<StringFilter>;
  readonly maxHeight: InputMaybe<CssUnitFilter>;
  readonly maxWidth: InputMaybe<CssUnitFilter>;
  readonly mobileImage: InputMaybe<ImageFilter>;
  readonly objectFit: InputMaybe<StringFilter>;
};

type AdaptiveImageOrBlockOrGap = AdaptiveImage | Block | Gap;

type AdaptiveImageSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly align: InputMaybe<SortOrder>;
  readonly altText: InputMaybe<SortOrder>;
  readonly desktopImage: InputMaybe<ImageSorting>;
  readonly loading: InputMaybe<SortOrder>;
  readonly maxHeight: InputMaybe<CssUnitSorting>;
  readonly maxWidth: InputMaybe<CssUnitSorting>;
  readonly mobileImage: InputMaybe<ImageSorting>;
  readonly objectFit: InputMaybe<SortOrder>;
};

type Article = Document & {
  readonly __typename?: 'Article';
  /** Date the document was created */
  readonly _createdAt: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  readonly _id: Maybe<Scalars['ID']['output']>;
  readonly _key: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  readonly _rev: Maybe<Scalars['String']['output']>;
  /** Document type */
  readonly _type: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  readonly _updatedAt: Maybe<Scalars['DateTime']['output']>;
  readonly alternativeDescription: Maybe<Scalars['String']['output']>;
  readonly alternativeTitle: Maybe<Scalars['String']['output']>;
  readonly author: Maybe<Author>;
  readonly blocks: Maybe<Blocks>;
  readonly description: Maybe<Scalars['String']['output']>;
  readonly image: Maybe<AdaptiveImage>;
  /** Optional, for CMS use only */
  readonly label: Maybe<Scalars['String']['output']>;
  readonly publishDate: Maybe<Scalars['Date']['output']>;
  readonly seo: Maybe<Seo>;
  readonly slug: Maybe<SlugWithPrefix>;
  /** Auto-calculated from article content. Re-opens and saves to update. */
  readonly suggestedReadTime: Maybe<Scalars['Float']['output']>;
  readonly tags: Maybe<ReadonlyArray<Maybe<Tag>>>;
  readonly title: Maybe<Scalars['String']['output']>;
};

type ArticleFilter = {
  /** Apply filters on document level */
  readonly _: InputMaybe<Sanity_DocumentFilter>;
  readonly _createdAt: InputMaybe<DatetimeFilter>;
  readonly _id: InputMaybe<IdFilter>;
  readonly _key: InputMaybe<StringFilter>;
  readonly _rev: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly _updatedAt: InputMaybe<DatetimeFilter>;
  readonly alternativeDescription: InputMaybe<StringFilter>;
  readonly alternativeTitle: InputMaybe<StringFilter>;
  readonly author: InputMaybe<AuthorFilter>;
  readonly blocks: InputMaybe<BlocksFilter>;
  readonly description: InputMaybe<StringFilter>;
  readonly image: InputMaybe<AdaptiveImageFilter>;
  readonly label: InputMaybe<StringFilter>;
  readonly publishDate: InputMaybe<DateFilter>;
  readonly seo: InputMaybe<SeoFilter>;
  readonly slug: InputMaybe<SlugWithPrefixFilter>;
  readonly suggestedReadTime: InputMaybe<FloatFilter>;
  readonly title: InputMaybe<StringFilter>;
};

type ArticleOrPage = Article | Page;

type ArticleSorting = {
  readonly _createdAt: InputMaybe<SortOrder>;
  readonly _id: InputMaybe<SortOrder>;
  readonly _key: InputMaybe<SortOrder>;
  readonly _rev: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly _updatedAt: InputMaybe<SortOrder>;
  readonly alternativeDescription: InputMaybe<SortOrder>;
  readonly alternativeTitle: InputMaybe<SortOrder>;
  readonly blocks: InputMaybe<BlocksSorting>;
  readonly description: InputMaybe<SortOrder>;
  readonly image: InputMaybe<AdaptiveImageSorting>;
  readonly label: InputMaybe<SortOrder>;
  readonly publishDate: InputMaybe<SortOrder>;
  readonly seo: InputMaybe<SeoSorting>;
  readonly slug: InputMaybe<SlugWithPrefixSorting>;
  readonly suggestedReadTime: InputMaybe<SortOrder>;
  readonly title: InputMaybe<SortOrder>;
};

type Author = Document & {
  readonly __typename?: 'Author';
  /** Date the document was created */
  readonly _createdAt: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  readonly _id: Maybe<Scalars['ID']['output']>;
  readonly _key: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  readonly _rev: Maybe<Scalars['String']['output']>;
  /** Document type */
  readonly _type: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  readonly _updatedAt: Maybe<Scalars['DateTime']['output']>;
  readonly bio: Maybe<RichText>;
  readonly firstName: Maybe<Scalars['String']['output']>;
  readonly image: Maybe<AdaptiveImage>;
  readonly lastName: Maybe<Scalars['String']['output']>;
};

type AuthorFilter = {
  /** Apply filters on document level */
  readonly _: InputMaybe<Sanity_DocumentFilter>;
  readonly _createdAt: InputMaybe<DatetimeFilter>;
  readonly _id: InputMaybe<IdFilter>;
  readonly _key: InputMaybe<StringFilter>;
  readonly _rev: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly _updatedAt: InputMaybe<DatetimeFilter>;
  readonly bio: InputMaybe<RichTextFilter>;
  readonly firstName: InputMaybe<StringFilter>;
  readonly image: InputMaybe<AdaptiveImageFilter>;
  readonly lastName: InputMaybe<StringFilter>;
};

type AuthorSorting = {
  readonly _createdAt: InputMaybe<SortOrder>;
  readonly _id: InputMaybe<SortOrder>;
  readonly _key: InputMaybe<SortOrder>;
  readonly _rev: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly _updatedAt: InputMaybe<SortOrder>;
  readonly bio: InputMaybe<RichTextSorting>;
  readonly firstName: InputMaybe<SortOrder>;
  readonly image: InputMaybe<AdaptiveImageSorting>;
  readonly lastName: InputMaybe<SortOrder>;
};

type Block = {
  readonly __typename?: 'Block';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly children: Maybe<ReadonlyArray<Maybe<Span>>>;
  readonly level: Maybe<Scalars['Float']['output']>;
  readonly listItem: Maybe<Scalars['String']['output']>;
  readonly style: Maybe<Scalars['String']['output']>;
};

type BlockArticlesList = {
  readonly __typename?: 'BlockArticlesList';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly backgroundImage: Maybe<AdaptiveImage>;
  readonly classNames: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>;
  readonly content: Maybe<RichText>;
  readonly customCss: Maybe<Scalars['String']['output']>;
  readonly label: Maybe<Scalars['String']['output']>;
  readonly layoutEditor: Maybe<Scalars['String']['output']>;
};

type BlockArticlesListFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly backgroundImage: InputMaybe<AdaptiveImageFilter>;
  readonly content: InputMaybe<RichTextFilter>;
  readonly customCss: InputMaybe<StringFilter>;
  readonly label: InputMaybe<StringFilter>;
  readonly layoutEditor: InputMaybe<StringFilter>;
};

type BlockArticlesListOrBlockCarouselOrBlockContainerOrBlockGapOrBlockGridOrBlockParagraph = BlockArticlesList | BlockCarousel | BlockContainer | BlockGap | BlockGrid | BlockParagraph;

type BlockArticlesListOrBlockCarouselOrBlockContainerOrBlockGapOrBlockGridOrBlockParagraphOrComponent = BlockArticlesList | BlockCarousel | BlockContainer | BlockGap | BlockGrid | BlockParagraph | Component;

type BlockArticlesListSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly backgroundImage: InputMaybe<AdaptiveImageSorting>;
  readonly content: InputMaybe<RichTextSorting>;
  readonly customCss: InputMaybe<SortOrder>;
  readonly label: InputMaybe<SortOrder>;
  readonly layoutEditor: InputMaybe<SortOrder>;
};

type BlockCarousel = {
  readonly __typename?: 'BlockCarousel';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  /** Move to next slide after this amount of seconds (Set to 0 or empty to disable) */
  readonly autoplay: Maybe<Scalars['Float']['output']>;
  readonly backgroundImage: Maybe<AdaptiveImage>;
  readonly classNames: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>;
  readonly customCss: Maybe<Scalars['String']['output']>;
  readonly label: Maybe<Scalars['String']['output']>;
  readonly layoutEditor: Maybe<Scalars['String']['output']>;
  readonly showNavigation: Maybe<Scalars['Boolean']['output']>;
  readonly showPagination: Maybe<Scalars['Boolean']['output']>;
  readonly slides: Maybe<ReadonlyArray<Maybe<BlockContainer>>>;
  readonly slidesPerView: Maybe<ResponsiveNumber>;
  readonly spaceBetween: Maybe<CssUnit>;
};

type BlockCarouselFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly autoplay: InputMaybe<FloatFilter>;
  readonly backgroundImage: InputMaybe<AdaptiveImageFilter>;
  readonly customCss: InputMaybe<StringFilter>;
  readonly label: InputMaybe<StringFilter>;
  readonly layoutEditor: InputMaybe<StringFilter>;
  readonly showNavigation: InputMaybe<BooleanFilter>;
  readonly showPagination: InputMaybe<BooleanFilter>;
  readonly slidesPerView: InputMaybe<ResponsiveNumberFilter>;
  readonly spaceBetween: InputMaybe<CssUnitFilter>;
};

type BlockCarouselSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly autoplay: InputMaybe<SortOrder>;
  readonly backgroundImage: InputMaybe<AdaptiveImageSorting>;
  readonly customCss: InputMaybe<SortOrder>;
  readonly label: InputMaybe<SortOrder>;
  readonly layoutEditor: InputMaybe<SortOrder>;
  readonly showNavigation: InputMaybe<SortOrder>;
  readonly showPagination: InputMaybe<SortOrder>;
  readonly slidesPerView: InputMaybe<ResponsiveNumberSorting>;
  readonly spaceBetween: InputMaybe<CssUnitSorting>;
};

type BlockContainer = {
  readonly __typename?: 'BlockContainer';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly backgroundImage: Maybe<AdaptiveImage>;
  readonly classNames: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>;
  readonly containerItems: Maybe<ReadonlyArray<Maybe<AccordionOrAdaptiveImageOrButtonsListOrCodeBlockOrCtaCardOrGapOrRichText>>>;
  readonly customCss: Maybe<Scalars['String']['output']>;
  readonly label: Maybe<Scalars['String']['output']>;
  readonly layoutEditor: Maybe<Scalars['String']['output']>;
  /** If enabled, the items will be displayed in reverse order on mobile */
  readonly reverseOnMobile: Maybe<Scalars['Boolean']['output']>;
  readonly rowGap: Maybe<CssUnit>;
  /** @deprecated Use the gap field instead */
  readonly spaceBetween: Maybe<CssUnit>;
};

type BlockContainerFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly backgroundImage: InputMaybe<AdaptiveImageFilter>;
  readonly customCss: InputMaybe<StringFilter>;
  readonly label: InputMaybe<StringFilter>;
  readonly layoutEditor: InputMaybe<StringFilter>;
  readonly reverseOnMobile: InputMaybe<BooleanFilter>;
  readonly rowGap: InputMaybe<CssUnitFilter>;
  readonly spaceBetween: InputMaybe<CssUnitFilter>;
};

type BlockContainerSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly backgroundImage: InputMaybe<AdaptiveImageSorting>;
  readonly customCss: InputMaybe<SortOrder>;
  readonly label: InputMaybe<SortOrder>;
  readonly layoutEditor: InputMaybe<SortOrder>;
  readonly reverseOnMobile: InputMaybe<SortOrder>;
  readonly rowGap: InputMaybe<CssUnitSorting>;
  readonly spaceBetween: InputMaybe<CssUnitSorting>;
};

type BlockGap = {
  readonly __typename?: 'BlockGap';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly amount: Maybe<CssUnit>;
  readonly backgroundImage: Maybe<AdaptiveImage>;
  readonly classNames: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>;
  readonly customCss: Maybe<Scalars['String']['output']>;
  readonly label: Maybe<Scalars['String']['output']>;
  readonly layoutEditor: Maybe<Scalars['String']['output']>;
  /** If blank, will default to the text color */
  readonly separatorColor: Maybe<Scalars['String']['output']>;
  /** Show a separator line in middle of the gap */
  readonly showSeparator: Maybe<Scalars['Boolean']['output']>;
};

type BlockGapFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly amount: InputMaybe<CssUnitFilter>;
  readonly backgroundImage: InputMaybe<AdaptiveImageFilter>;
  readonly customCss: InputMaybe<StringFilter>;
  readonly label: InputMaybe<StringFilter>;
  readonly layoutEditor: InputMaybe<StringFilter>;
  readonly separatorColor: InputMaybe<StringFilter>;
  readonly showSeparator: InputMaybe<BooleanFilter>;
};

type BlockGapSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly amount: InputMaybe<CssUnitSorting>;
  readonly backgroundImage: InputMaybe<AdaptiveImageSorting>;
  readonly customCss: InputMaybe<SortOrder>;
  readonly label: InputMaybe<SortOrder>;
  readonly layoutEditor: InputMaybe<SortOrder>;
  readonly separatorColor: InputMaybe<SortOrder>;
  readonly showSeparator: InputMaybe<SortOrder>;
};

type BlockGrid = {
  readonly __typename?: 'BlockGrid';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly backgroundImage: Maybe<AdaptiveImage>;
  readonly classNames: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>;
  readonly columnGap: Maybe<CssUnit>;
  readonly customCss: Maybe<Scalars['String']['output']>;
  /** If enabled, all the columns will be displayed in a single row with the same width (The column spaces will be ignored) */
  readonly fluidGrid: Maybe<Scalars['Boolean']['output']>;
  readonly gridColumns: Maybe<ReadonlyArray<Maybe<BlockGridColumn>>>;
  readonly label: Maybe<Scalars['String']['output']>;
  readonly layoutEditor: Maybe<Scalars['String']['output']>;
  /** If enabled, the items will be displayed in reverse order on mobile */
  readonly reverseOnMobile: Maybe<Scalars['Boolean']['output']>;
  readonly rowGap: Maybe<CssUnit>;
  /** @deprecated Use the gap field instead */
  readonly spaceBetween: Maybe<CssUnit>;
};

type BlockGridColumn = {
  readonly __typename?: 'BlockGridColumn';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly backgroundImage: Maybe<AdaptiveImage>;
  readonly classNames: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>;
  readonly columnItems: Maybe<ReadonlyArray<Maybe<AccordionOrAdaptiveImageOrButtonsListOrCodeBlockOrCtaCardOrGapOrRichText>>>;
  readonly columnSize: Maybe<GridColumnSize>;
  readonly customCss: Maybe<Scalars['String']['output']>;
  readonly horizontalAlign: Maybe<Scalars['String']['output']>;
  readonly layoutEditor: Maybe<Scalars['String']['output']>;
  /** If enabled, the items will be displayed in reverse order on mobile */
  readonly reverseOnMobile: Maybe<Scalars['Boolean']['output']>;
  readonly rowGap: Maybe<CssUnit>;
  /** @deprecated Use the gap field instead */
  readonly spaceBetween: Maybe<CssUnit>;
  /** @deprecated Use the new Column Size field above instead */
  readonly spaces: Maybe<Scalars['Float']['output']>;
  readonly verticalAlign: Maybe<Scalars['String']['output']>;
};

type BlockGridColumnFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly backgroundImage: InputMaybe<AdaptiveImageFilter>;
  readonly columnSize: InputMaybe<GridColumnSizeFilter>;
  readonly customCss: InputMaybe<StringFilter>;
  readonly horizontalAlign: InputMaybe<StringFilter>;
  readonly layoutEditor: InputMaybe<StringFilter>;
  readonly reverseOnMobile: InputMaybe<BooleanFilter>;
  readonly rowGap: InputMaybe<CssUnitFilter>;
  readonly spaceBetween: InputMaybe<CssUnitFilter>;
  readonly spaces: InputMaybe<FloatFilter>;
  readonly verticalAlign: InputMaybe<StringFilter>;
};

type BlockGridColumnSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly backgroundImage: InputMaybe<AdaptiveImageSorting>;
  readonly columnSize: InputMaybe<GridColumnSizeSorting>;
  readonly customCss: InputMaybe<SortOrder>;
  readonly horizontalAlign: InputMaybe<SortOrder>;
  readonly layoutEditor: InputMaybe<SortOrder>;
  readonly reverseOnMobile: InputMaybe<SortOrder>;
  readonly rowGap: InputMaybe<CssUnitSorting>;
  readonly spaceBetween: InputMaybe<CssUnitSorting>;
  readonly spaces: InputMaybe<SortOrder>;
  readonly verticalAlign: InputMaybe<SortOrder>;
};

type BlockGridFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly backgroundImage: InputMaybe<AdaptiveImageFilter>;
  readonly columnGap: InputMaybe<CssUnitFilter>;
  readonly customCss: InputMaybe<StringFilter>;
  readonly fluidGrid: InputMaybe<BooleanFilter>;
  readonly label: InputMaybe<StringFilter>;
  readonly layoutEditor: InputMaybe<StringFilter>;
  readonly reverseOnMobile: InputMaybe<BooleanFilter>;
  readonly rowGap: InputMaybe<CssUnitFilter>;
  readonly spaceBetween: InputMaybe<CssUnitFilter>;
};

type BlockGridSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly backgroundImage: InputMaybe<AdaptiveImageSorting>;
  readonly columnGap: InputMaybe<CssUnitSorting>;
  readonly customCss: InputMaybe<SortOrder>;
  readonly fluidGrid: InputMaybe<SortOrder>;
  readonly label: InputMaybe<SortOrder>;
  readonly layoutEditor: InputMaybe<SortOrder>;
  readonly reverseOnMobile: InputMaybe<SortOrder>;
  readonly rowGap: InputMaybe<CssUnitSorting>;
  readonly spaceBetween: InputMaybe<CssUnitSorting>;
};

type BlockOrImage = Block | Image;

type BlockParagraph = {
  readonly __typename?: 'BlockParagraph';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly backgroundImage: Maybe<AdaptiveImage>;
  readonly classNames: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>;
  readonly content: Maybe<RichText>;
  readonly customCss: Maybe<Scalars['String']['output']>;
  readonly label: Maybe<Scalars['String']['output']>;
  readonly layoutEditor: Maybe<Scalars['String']['output']>;
};

type BlockParagraphFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly backgroundImage: InputMaybe<AdaptiveImageFilter>;
  readonly content: InputMaybe<RichTextFilter>;
  readonly customCss: InputMaybe<StringFilter>;
  readonly label: InputMaybe<StringFilter>;
  readonly layoutEditor: InputMaybe<StringFilter>;
};

type BlockParagraphSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly backgroundImage: InputMaybe<AdaptiveImageSorting>;
  readonly content: InputMaybe<RichTextSorting>;
  readonly customCss: InputMaybe<SortOrder>;
  readonly label: InputMaybe<SortOrder>;
  readonly layoutEditor: InputMaybe<SortOrder>;
};

type Blocks = {
  readonly __typename?: 'Blocks';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly list: Maybe<ReadonlyArray<Maybe<BlockArticlesListOrBlockCarouselOrBlockContainerOrBlockGapOrBlockGridOrBlockParagraphOrComponent>>>;
};

type BlocksFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
};

type BlocksSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
};

type BooleanFilter = {
  /** Checks if the value is equal to the given input. */
  readonly eq: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is defined. */
  readonly is_defined: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is not equal to the given input. */
  readonly neq: InputMaybe<Scalars['Boolean']['input']>;
};

type Button = {
  readonly __typename?: 'Button';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly anchorId: Maybe<Scalars['String']['output']>;
  /** Add a hidden descriptive text to the link to avoid Lighthouse issues */
  readonly descriptiveText: Maybe<Scalars['String']['output']>;
  readonly design: Maybe<Scalars['String']['output']>;
  readonly endIcon: Maybe<IconPicker>;
  readonly externalLink: Maybe<Scalars['String']['output']>;
  readonly internalLink: Maybe<ArticleOrPage>;
  readonly openInNewTab: Maybe<Scalars['Boolean']['output']>;
  /** Add custom params to URL (e.g. ?key1=value1&key2=value2 or #anchor-id). MUST start with '#' or '?' */
  readonly params: Maybe<Scalars['String']['output']>;
  readonly startIcon: Maybe<IconPicker>;
  readonly text: Maybe<Scalars['String']['output']>;
  readonly type: Maybe<Scalars['String']['output']>;
};

type ButtonFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly anchorId: InputMaybe<StringFilter>;
  readonly descriptiveText: InputMaybe<StringFilter>;
  readonly design: InputMaybe<StringFilter>;
  readonly endIcon: InputMaybe<IconPickerFilter>;
  readonly externalLink: InputMaybe<StringFilter>;
  readonly openInNewTab: InputMaybe<BooleanFilter>;
  readonly params: InputMaybe<StringFilter>;
  readonly startIcon: InputMaybe<IconPickerFilter>;
  readonly text: InputMaybe<StringFilter>;
  readonly type: InputMaybe<StringFilter>;
};

type ButtonSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly anchorId: InputMaybe<SortOrder>;
  readonly descriptiveText: InputMaybe<SortOrder>;
  readonly design: InputMaybe<SortOrder>;
  readonly endIcon: InputMaybe<IconPickerSorting>;
  readonly externalLink: InputMaybe<SortOrder>;
  readonly openInNewTab: InputMaybe<SortOrder>;
  readonly params: InputMaybe<SortOrder>;
  readonly startIcon: InputMaybe<IconPickerSorting>;
  readonly text: InputMaybe<SortOrder>;
  readonly type: InputMaybe<SortOrder>;
};

type ButtonsList = {
  readonly __typename?: 'ButtonsList';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly align: Maybe<Scalars['String']['output']>;
  readonly buttons: Maybe<ReadonlyArray<Maybe<Button>>>;
  readonly direction: Maybe<Scalars['String']['output']>;
  readonly spaceBetween: Maybe<CssUnit>;
};

type ButtonsListFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly align: InputMaybe<StringFilter>;
  readonly direction: InputMaybe<StringFilter>;
  readonly spaceBetween: InputMaybe<CssUnitFilter>;
};

type ButtonsListSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly align: InputMaybe<SortOrder>;
  readonly direction: InputMaybe<SortOrder>;
  readonly spaceBetween: InputMaybe<CssUnitSorting>;
};

type CodeBlock = {
  readonly __typename?: 'CodeBlock';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly code: Maybe<Scalars['String']['output']>;
};

type CodeBlockFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly code: InputMaybe<StringFilter>;
};

type CodeBlockSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly code: InputMaybe<SortOrder>;
};

type Component = {
  readonly __typename?: 'Component';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  /** The component blueprint that this component is based on, only for reference */
  readonly componentBlueprint: Maybe<ComponentBlueprint>;
  readonly label: Maybe<Scalars['String']['output']>;
  readonly values: Maybe<ReadonlyArray<Maybe<AccordionOrAdaptiveImageOrButtonOrButtonsListOrComponentPrimitiveValueOrCssUnitOrCtaCardOrGapOrHeadingOrImageWithMetaOrLinkOrLinkWithoutTextOrResponsiveImageOrResponsiveNumberOrResponsiveStringOrRichText>>>;
};

type ComponentBlueprint = Document & {
  readonly __typename?: 'ComponentBlueprint';
  /** Date the document was created */
  readonly _createdAt: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  readonly _id: Maybe<Scalars['ID']['output']>;
  readonly _key: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  readonly _rev: Maybe<Scalars['String']['output']>;
  /** Document type */
  readonly _type: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  readonly _updatedAt: Maybe<Scalars['DateTime']['output']>;
  readonly blocks: Maybe<ReadonlyArray<Maybe<BlockArticlesListOrBlockCarouselOrBlockContainerOrBlockGapOrBlockGridOrBlockParagraph>>>;
  readonly hiddenForDocumentTypes: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>;
  readonly image: Maybe<Image>;
  readonly name: Maybe<Scalars['String']['output']>;
  /** Please publish this document before using it on a page to avoid issues with drafts. If you remove elements from the blocks list, remove the related variables as well */
  readonly note: Maybe<Scalars['String']['output']>;
  readonly variables: Maybe<ReadonlyArray<Maybe<ComponentVariable>>>;
};

type ComponentBlueprintFilter = {
  /** Apply filters on document level */
  readonly _: InputMaybe<Sanity_DocumentFilter>;
  readonly _createdAt: InputMaybe<DatetimeFilter>;
  readonly _id: InputMaybe<IdFilter>;
  readonly _key: InputMaybe<StringFilter>;
  readonly _rev: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly _updatedAt: InputMaybe<DatetimeFilter>;
  readonly image: InputMaybe<ImageFilter>;
  readonly name: InputMaybe<StringFilter>;
  readonly note: InputMaybe<StringFilter>;
};

type ComponentBlueprintSorting = {
  readonly _createdAt: InputMaybe<SortOrder>;
  readonly _id: InputMaybe<SortOrder>;
  readonly _key: InputMaybe<SortOrder>;
  readonly _rev: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly _updatedAt: InputMaybe<SortOrder>;
  readonly image: InputMaybe<ImageSorting>;
  readonly name: InputMaybe<SortOrder>;
  readonly note: InputMaybe<SortOrder>;
};

type ComponentFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly componentBlueprint: InputMaybe<ComponentBlueprintFilter>;
  readonly label: InputMaybe<StringFilter>;
};

type ComponentPrimitiveValue = {
  readonly __typename?: 'ComponentPrimitiveValue';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly arrayOfBoolean: Maybe<ReadonlyArray<Maybe<Scalars['Boolean']['output']>>>;
  readonly arrayOfDate: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>;
  readonly arrayOfNumber: Maybe<ReadonlyArray<Maybe<Scalars['Float']['output']>>>;
  readonly arrayOfObject: Maybe<ReadonlyArray<Maybe<AccordionOrAdaptiveImageOrButtonOrButtonsListOrCtaCardOrGapOrHeadingOrImageWithMetaOrLinkOrLinkWithoutTextOrResponsiveImageOrResponsiveNumberOrResponsiveStringOrRichText>>>;
  readonly arrayOfString: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>;
  readonly arrayOfText: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>;
  readonly arrayOfUrl: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>;
  readonly boolean: Maybe<Scalars['Boolean']['output']>;
  readonly date: Maybe<Scalars['Date']['output']>;
  readonly number: Maybe<Scalars['Float']['output']>;
  readonly string: Maybe<Scalars['String']['output']>;
  readonly text: Maybe<Scalars['String']['output']>;
  readonly type: Maybe<Scalars['String']['output']>;
  readonly url: Maybe<Scalars['String']['output']>;
};

type ComponentPrimitiveValueFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly boolean: InputMaybe<BooleanFilter>;
  readonly date: InputMaybe<DateFilter>;
  readonly number: InputMaybe<FloatFilter>;
  readonly string: InputMaybe<StringFilter>;
  readonly text: InputMaybe<StringFilter>;
  readonly type: InputMaybe<StringFilter>;
  readonly url: InputMaybe<StringFilter>;
};

type ComponentPrimitiveValueSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly boolean: InputMaybe<SortOrder>;
  readonly date: InputMaybe<SortOrder>;
  readonly number: InputMaybe<SortOrder>;
  readonly string: InputMaybe<SortOrder>;
  readonly text: InputMaybe<SortOrder>;
  readonly type: InputMaybe<SortOrder>;
  readonly url: InputMaybe<SortOrder>;
};

type ComponentSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly label: InputMaybe<SortOrder>;
};

type ComponentVariable = {
  readonly __typename?: 'ComponentVariable';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly arrayOfObjectTypes: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>;
  readonly description: Maybe<Scalars['String']['output']>;
  readonly hideIfEmpty: Maybe<Scalars['Boolean']['output']>;
  readonly name: Maybe<Scalars['String']['output']>;
  readonly options: Maybe<ReadonlyArray<Maybe<ComponentVariableOption>>>;
  readonly overwriteData: Maybe<Scalars['Boolean']['output']>;
  readonly path: Maybe<Scalars['String']['output']>;
  readonly type: Maybe<Scalars['String']['output']>;
};

type ComponentVariableFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly description: InputMaybe<StringFilter>;
  readonly hideIfEmpty: InputMaybe<BooleanFilter>;
  readonly name: InputMaybe<StringFilter>;
  readonly overwriteData: InputMaybe<BooleanFilter>;
  readonly path: InputMaybe<StringFilter>;
  readonly type: InputMaybe<StringFilter>;
};

type ComponentVariableOption = {
  readonly __typename?: 'ComponentVariableOption';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly title: Maybe<Scalars['String']['output']>;
  readonly value: Maybe<Scalars['String']['output']>;
};

type ComponentVariableOptionFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly title: InputMaybe<StringFilter>;
  readonly value: InputMaybe<StringFilter>;
};

type ComponentVariableOptionSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly title: InputMaybe<SortOrder>;
  readonly value: InputMaybe<SortOrder>;
};

type ComponentVariableSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly description: InputMaybe<SortOrder>;
  readonly hideIfEmpty: InputMaybe<SortOrder>;
  readonly name: InputMaybe<SortOrder>;
  readonly overwriteData: InputMaybe<SortOrder>;
  readonly path: InputMaybe<SortOrder>;
  readonly type: InputMaybe<SortOrder>;
};

type CrossDatasetReference = {
  readonly __typename?: 'CrossDatasetReference';
  readonly _dataset: Maybe<Scalars['String']['output']>;
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _projectId: Maybe<Scalars['String']['output']>;
  readonly _ref: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly _weak: Maybe<Scalars['Boolean']['output']>;
};

type CrossDatasetReferenceFilter = {
  readonly _dataset: InputMaybe<StringFilter>;
  readonly _key: InputMaybe<StringFilter>;
  readonly _projectId: InputMaybe<StringFilter>;
  readonly _ref: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly _weak: InputMaybe<BooleanFilter>;
};

type CrossDatasetReferenceSorting = {
  readonly _dataset: InputMaybe<SortOrder>;
  readonly _key: InputMaybe<SortOrder>;
  readonly _projectId: InputMaybe<SortOrder>;
  readonly _ref: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly _weak: InputMaybe<SortOrder>;
};

type CssUnit = {
  readonly __typename?: 'CssUnit';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly desktop: Maybe<Scalars['String']['output']>;
  readonly mobile: Maybe<Scalars['String']['output']>;
};

type CssUnitFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly desktop: InputMaybe<StringFilter>;
  readonly mobile: InputMaybe<StringFilter>;
};

type CssUnitSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly desktop: InputMaybe<SortOrder>;
  readonly mobile: InputMaybe<SortOrder>;
};

type CtaCard = {
  readonly __typename?: 'CtaCard';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly buttons: Maybe<ReadonlyArray<Maybe<Button>>>;
  readonly content: Maybe<RichText>;
  readonly image: Maybe<AdaptiveImage>;
  readonly link: Maybe<LinkWithoutText>;
  readonly title: Maybe<Scalars['String']['output']>;
};

type CtaCardFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly content: InputMaybe<RichTextFilter>;
  readonly image: InputMaybe<AdaptiveImageFilter>;
  readonly link: InputMaybe<LinkWithoutTextFilter>;
  readonly title: InputMaybe<StringFilter>;
};

type CtaCardSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly content: InputMaybe<RichTextSorting>;
  readonly image: InputMaybe<AdaptiveImageSorting>;
  readonly link: InputMaybe<LinkWithoutTextSorting>;
  readonly title: InputMaybe<SortOrder>;
};

type DateFilter = {
  /** Checks if the value is equal to the given input. */
  readonly eq: InputMaybe<Scalars['Date']['input']>;
  /** Checks if the value is greater than the given input. */
  readonly gt: InputMaybe<Scalars['Date']['input']>;
  /** Checks if the value is greater than or equal to the given input. */
  readonly gte: InputMaybe<Scalars['Date']['input']>;
  /** Checks if the value is defined. */
  readonly is_defined: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is lesser than the given input. */
  readonly lt: InputMaybe<Scalars['Date']['input']>;
  /** Checks if the value is lesser than or equal to the given input. */
  readonly lte: InputMaybe<Scalars['Date']['input']>;
  /** Checks if the value is not equal to the given input. */
  readonly neq: InputMaybe<Scalars['Date']['input']>;
};

type DatetimeFilter = {
  /** Checks if the value is equal to the given input. */
  readonly eq: InputMaybe<Scalars['DateTime']['input']>;
  /** Checks if the value is greater than the given input. */
  readonly gt: InputMaybe<Scalars['DateTime']['input']>;
  /** Checks if the value is greater than or equal to the given input. */
  readonly gte: InputMaybe<Scalars['DateTime']['input']>;
  /** Checks if the value is defined. */
  readonly is_defined: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is lesser than the given input. */
  readonly lt: InputMaybe<Scalars['DateTime']['input']>;
  /** Checks if the value is lesser than or equal to the given input. */
  readonly lte: InputMaybe<Scalars['DateTime']['input']>;
  /** Checks if the value is not equal to the given input. */
  readonly neq: InputMaybe<Scalars['DateTime']['input']>;
};

/** A Sanity document */
type Document = {
  /** Date the document was created */
  readonly _createdAt: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  readonly _id: Maybe<Scalars['ID']['output']>;
  /** Current document revision */
  readonly _rev: Maybe<Scalars['String']['output']>;
  /** Document type */
  readonly _type: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  readonly _updatedAt: Maybe<Scalars['DateTime']['output']>;
};

type DocumentFilter = {
  /** Apply filters on document level */
  readonly _: InputMaybe<Sanity_DocumentFilter>;
  readonly _createdAt: InputMaybe<DatetimeFilter>;
  readonly _id: InputMaybe<IdFilter>;
  readonly _rev: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly _updatedAt: InputMaybe<DatetimeFilter>;
};

type DocumentSorting = {
  readonly _createdAt: InputMaybe<SortOrder>;
  readonly _id: InputMaybe<SortOrder>;
  readonly _rev: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly _updatedAt: InputMaybe<SortOrder>;
};

type File = {
  readonly __typename?: 'File';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly asset: Maybe<SanityFileAsset>;
  readonly media: Maybe<GlobalDocumentReference>;
};

type FileFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly asset: InputMaybe<SanityFileAssetFilter>;
  readonly media: InputMaybe<GlobalDocumentReferenceFilter>;
};

type FileSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly media: InputMaybe<GlobalDocumentReferenceSorting>;
};

type FloatFilter = {
  /** Checks if the value is equal to the given input. */
  readonly eq: InputMaybe<Scalars['Float']['input']>;
  /** Checks if the value is greater than the given input. */
  readonly gt: InputMaybe<Scalars['Float']['input']>;
  /** Checks if the value is greater than or equal to the given input. */
  readonly gte: InputMaybe<Scalars['Float']['input']>;
  /** Checks if the value is defined. */
  readonly is_defined: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is lesser than the given input. */
  readonly lt: InputMaybe<Scalars['Float']['input']>;
  /** Checks if the value is lesser than or equal to the given input. */
  readonly lte: InputMaybe<Scalars['Float']['input']>;
  /** Checks if the value is not equal to the given input. */
  readonly neq: InputMaybe<Scalars['Float']['input']>;
};

type Footer = Document & {
  readonly __typename?: 'Footer';
  /** Date the document was created */
  readonly _createdAt: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  readonly _id: Maybe<Scalars['ID']['output']>;
  readonly _key: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  readonly _rev: Maybe<Scalars['String']['output']>;
  /** Document type */
  readonly _type: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  readonly _updatedAt: Maybe<Scalars['DateTime']['output']>;
  readonly bottomLinks: Maybe<ReadonlyArray<Maybe<Link>>>;
  readonly copyright: Maybe<Heading>;
  readonly navigation: Maybe<ReadonlyArray<Maybe<FooterNavMenu>>>;
};

type FooterFilter = {
  /** Apply filters on document level */
  readonly _: InputMaybe<Sanity_DocumentFilter>;
  readonly _createdAt: InputMaybe<DatetimeFilter>;
  readonly _id: InputMaybe<IdFilter>;
  readonly _key: InputMaybe<StringFilter>;
  readonly _rev: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly _updatedAt: InputMaybe<DatetimeFilter>;
  readonly copyright: InputMaybe<HeadingFilter>;
};

type FooterNavMenu = {
  readonly __typename?: 'FooterNavMenu';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly links: Maybe<ReadonlyArray<Maybe<Link>>>;
  readonly title: Maybe<Scalars['String']['output']>;
};

type FooterNavMenuFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly title: InputMaybe<StringFilter>;
};

type FooterNavMenuSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly title: InputMaybe<SortOrder>;
};

type FooterSorting = {
  readonly _createdAt: InputMaybe<SortOrder>;
  readonly _id: InputMaybe<SortOrder>;
  readonly _key: InputMaybe<SortOrder>;
  readonly _rev: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly _updatedAt: InputMaybe<SortOrder>;
  readonly copyright: InputMaybe<HeadingSorting>;
};

type Gap = {
  readonly __typename?: 'Gap';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly amount: Maybe<CssUnit>;
  /** If blank, will default to the text color */
  readonly separatorColor: Maybe<Scalars['String']['output']>;
  /** Show a separator line in middle of the gap */
  readonly showSeparator: Maybe<Scalars['Boolean']['output']>;
};

type GapFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly amount: InputMaybe<CssUnitFilter>;
  readonly separatorColor: InputMaybe<StringFilter>;
  readonly showSeparator: InputMaybe<BooleanFilter>;
};

type GapSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly amount: InputMaybe<CssUnitSorting>;
  readonly separatorColor: InputMaybe<SortOrder>;
  readonly showSeparator: InputMaybe<SortOrder>;
};

type Geopoint = {
  readonly __typename?: 'Geopoint';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly alt: Maybe<Scalars['Float']['output']>;
  readonly lat: Maybe<Scalars['Float']['output']>;
  readonly lng: Maybe<Scalars['Float']['output']>;
};

type GeopointFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly alt: InputMaybe<FloatFilter>;
  readonly lat: InputMaybe<FloatFilter>;
  readonly lng: InputMaybe<FloatFilter>;
};

type GeopointSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly alt: InputMaybe<SortOrder>;
  readonly lat: InputMaybe<SortOrder>;
  readonly lng: InputMaybe<SortOrder>;
};

type GlobalDocumentReference = {
  readonly __typename?: 'GlobalDocumentReference';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _ref: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly _weak: Maybe<Scalars['Boolean']['output']>;
};

type GlobalDocumentReferenceFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _ref: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly _weak: InputMaybe<BooleanFilter>;
};

type GlobalDocumentReferenceSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _ref: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly _weak: InputMaybe<SortOrder>;
};

type GlobalSeo = {
  readonly __typename?: 'GlobalSeo';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly image: Maybe<Image>;
  /** This will appear underneath the title in Google search results */
  readonly pageDescription: Maybe<Scalars['String']['output']>;
  /** This title will appear as the title in Google search results */
  readonly pageTitle: Maybe<Scalars['String']['output']>;
  /** Added to the end of every page title. For example, set to '| Company Name' and the home page title will be 'Home | Company Name' */
  readonly pageTitleSuffix: Maybe<Scalars['String']['output']>;
};

type GlobalSeoFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly image: InputMaybe<ImageFilter>;
  readonly pageDescription: InputMaybe<StringFilter>;
  readonly pageTitle: InputMaybe<StringFilter>;
  readonly pageTitleSuffix: InputMaybe<StringFilter>;
};

type GlobalSeoSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly image: InputMaybe<ImageSorting>;
  readonly pageDescription: InputMaybe<SortOrder>;
  readonly pageTitle: InputMaybe<SortOrder>;
  readonly pageTitleSuffix: InputMaybe<SortOrder>;
};

type GridColumnSize = {
  readonly __typename?: 'GridColumnSize';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly desktop: Maybe<Scalars['Float']['output']>;
  readonly mobile: Maybe<Scalars['Float']['output']>;
};

type GridColumnSizeFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly desktop: InputMaybe<FloatFilter>;
  readonly mobile: InputMaybe<FloatFilter>;
};

type GridColumnSizeSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly desktop: InputMaybe<SortOrder>;
  readonly mobile: InputMaybe<SortOrder>;
};

type Header = Document & {
  readonly __typename?: 'Header';
  /** Date the document was created */
  readonly _createdAt: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  readonly _id: Maybe<Scalars['ID']['output']>;
  readonly _key: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  readonly _rev: Maybe<Scalars['String']['output']>;
  /** Document type */
  readonly _type: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  readonly _updatedAt: Maybe<Scalars['DateTime']['output']>;
  /** Hides the header on scroll down to leave more space for user */
  readonly hideOnScroll: Maybe<Scalars['Boolean']['output']>;
  readonly logo: Maybe<AdaptiveImage>;
  readonly navigation: Maybe<ReadonlyArray<Maybe<HeaderNavMenuOrLink>>>;
};

type HeaderFilter = {
  /** Apply filters on document level */
  readonly _: InputMaybe<Sanity_DocumentFilter>;
  readonly _createdAt: InputMaybe<DatetimeFilter>;
  readonly _id: InputMaybe<IdFilter>;
  readonly _key: InputMaybe<StringFilter>;
  readonly _rev: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly _updatedAt: InputMaybe<DatetimeFilter>;
  readonly hideOnScroll: InputMaybe<BooleanFilter>;
  readonly logo: InputMaybe<AdaptiveImageFilter>;
};

type HeaderNavMenu = {
  readonly __typename?: 'HeaderNavMenu';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly links: Maybe<ReadonlyArray<Maybe<Link>>>;
  readonly title: Maybe<Scalars['String']['output']>;
};

type HeaderNavMenuFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly title: InputMaybe<StringFilter>;
};

type HeaderNavMenuOrLink = HeaderNavMenu | Link;

type HeaderNavMenuSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly title: InputMaybe<SortOrder>;
};

type HeaderSorting = {
  readonly _createdAt: InputMaybe<SortOrder>;
  readonly _id: InputMaybe<SortOrder>;
  readonly _key: InputMaybe<SortOrder>;
  readonly _rev: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly _updatedAt: InputMaybe<SortOrder>;
  readonly hideOnScroll: InputMaybe<SortOrder>;
  readonly logo: InputMaybe<AdaptiveImageSorting>;
};

type Heading = {
  readonly __typename?: 'Heading';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly blocksRaw: Maybe<Scalars['JSON']['output']>;
};

type HeadingFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
};

type HeadingSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
};

type IdFilter = {
  /** Checks if the value is equal to the given input. */
  readonly eq: InputMaybe<Scalars['ID']['input']>;
  readonly in: InputMaybe<ReadonlyArray<Scalars['ID']['input']>>;
  /** Checks if the value matches the given word/words. */
  readonly matches: InputMaybe<Scalars['ID']['input']>;
  /** Checks if the value is not equal to the given input. */
  readonly neq: InputMaybe<Scalars['ID']['input']>;
  readonly nin: InputMaybe<ReadonlyArray<Scalars['ID']['input']>>;
};

type IconPicker = {
  readonly __typename?: 'IconPicker';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly name: Maybe<Scalars['String']['output']>;
  readonly provider: Maybe<Scalars['String']['output']>;
  readonly svg: Maybe<Scalars['String']['output']>;
};

type IconPickerFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly name: InputMaybe<StringFilter>;
  readonly provider: InputMaybe<StringFilter>;
  readonly svg: InputMaybe<StringFilter>;
};

type IconPickerSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly name: InputMaybe<SortOrder>;
  readonly provider: InputMaybe<SortOrder>;
  readonly svg: InputMaybe<SortOrder>;
};

type Image = {
  readonly __typename?: 'Image';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly asset: Maybe<SanityImageAsset>;
  readonly crop: Maybe<SanityImageCrop>;
  readonly hotspot: Maybe<SanityImageHotspot>;
  readonly media: Maybe<GlobalDocumentReference>;
};

type ImageFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly asset: InputMaybe<SanityImageAssetFilter>;
  readonly crop: InputMaybe<SanityImageCropFilter>;
  readonly hotspot: InputMaybe<SanityImageHotspotFilter>;
  readonly media: InputMaybe<GlobalDocumentReferenceFilter>;
};

type ImageSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly crop: InputMaybe<SanityImageCropSorting>;
  readonly hotspot: InputMaybe<SanityImageHotspotSorting>;
  readonly media: InputMaybe<GlobalDocumentReferenceSorting>;
};

type ImageWithMeta = {
  readonly __typename?: 'ImageWithMeta';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly align: Maybe<Scalars['String']['output']>;
  readonly altText: Maybe<Scalars['String']['output']>;
  readonly asset: Maybe<SanityImageAsset>;
  readonly crop: Maybe<SanityImageCrop>;
  readonly hotspot: Maybe<SanityImageHotspot>;
  /** Lazy by default (Defer until image is visible) */
  readonly loading: Maybe<Scalars['String']['output']>;
  readonly maxHeight: Maybe<CssUnit>;
  readonly maxWidth: Maybe<CssUnit>;
  readonly media: Maybe<GlobalDocumentReference>;
  readonly objectFit: Maybe<Scalars['String']['output']>;
};

type ImageWithMetaFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly align: InputMaybe<StringFilter>;
  readonly altText: InputMaybe<StringFilter>;
  readonly asset: InputMaybe<SanityImageAssetFilter>;
  readonly crop: InputMaybe<SanityImageCropFilter>;
  readonly hotspot: InputMaybe<SanityImageHotspotFilter>;
  readonly loading: InputMaybe<StringFilter>;
  readonly maxHeight: InputMaybe<CssUnitFilter>;
  readonly maxWidth: InputMaybe<CssUnitFilter>;
  readonly media: InputMaybe<GlobalDocumentReferenceFilter>;
  readonly objectFit: InputMaybe<StringFilter>;
};

type ImageWithMetaSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly align: InputMaybe<SortOrder>;
  readonly altText: InputMaybe<SortOrder>;
  readonly crop: InputMaybe<SanityImageCropSorting>;
  readonly hotspot: InputMaybe<SanityImageHotspotSorting>;
  readonly loading: InputMaybe<SortOrder>;
  readonly maxHeight: InputMaybe<CssUnitSorting>;
  readonly maxWidth: InputMaybe<CssUnitSorting>;
  readonly media: InputMaybe<GlobalDocumentReferenceSorting>;
  readonly objectFit: InputMaybe<SortOrder>;
};

type IntFilter = {
  /** Checks if the value is equal to the given input. */
  readonly eq: InputMaybe<Scalars['Int']['input']>;
  /** Checks if the value is greater than the given input. */
  readonly gt: InputMaybe<Scalars['Int']['input']>;
  /** Checks if the value is greater than or equal to the given input. */
  readonly gte: InputMaybe<Scalars['Int']['input']>;
  /** Checks if the value is defined. */
  readonly is_defined: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is lesser than the given input. */
  readonly lt: InputMaybe<Scalars['Int']['input']>;
  /** Checks if the value is lesser than or equal to the given input. */
  readonly lte: InputMaybe<Scalars['Int']['input']>;
  /** Checks if the value is not equal to the given input. */
  readonly neq: InputMaybe<Scalars['Int']['input']>;
};

type Link = {
  readonly __typename?: 'Link';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly anchorId: Maybe<Scalars['String']['output']>;
  /** Add a hidden descriptive text to the link to avoid Lighthouse issues */
  readonly descriptiveText: Maybe<Scalars['String']['output']>;
  readonly externalLink: Maybe<Scalars['String']['output']>;
  readonly internalLink: Maybe<ArticleOrPage>;
  readonly openInNewTab: Maybe<Scalars['Boolean']['output']>;
  /** Add custom params to URL (e.g. ?key1=value1&key2=value2 or #anchor-id). MUST start with '#' or '?' */
  readonly params: Maybe<Scalars['String']['output']>;
  readonly text: Maybe<Scalars['String']['output']>;
  readonly type: Maybe<Scalars['String']['output']>;
};

type LinkFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly anchorId: InputMaybe<StringFilter>;
  readonly descriptiveText: InputMaybe<StringFilter>;
  readonly externalLink: InputMaybe<StringFilter>;
  readonly openInNewTab: InputMaybe<BooleanFilter>;
  readonly params: InputMaybe<StringFilter>;
  readonly text: InputMaybe<StringFilter>;
  readonly type: InputMaybe<StringFilter>;
};

type LinkSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly anchorId: InputMaybe<SortOrder>;
  readonly descriptiveText: InputMaybe<SortOrder>;
  readonly externalLink: InputMaybe<SortOrder>;
  readonly openInNewTab: InputMaybe<SortOrder>;
  readonly params: InputMaybe<SortOrder>;
  readonly text: InputMaybe<SortOrder>;
  readonly type: InputMaybe<SortOrder>;
};

type LinkWithoutText = {
  readonly __typename?: 'LinkWithoutText';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly anchorId: Maybe<Scalars['String']['output']>;
  /** Add a hidden descriptive text to the link to avoid Lighthouse issues */
  readonly descriptiveText: Maybe<Scalars['String']['output']>;
  readonly externalLink: Maybe<Scalars['String']['output']>;
  readonly internalLink: Maybe<ArticleOrPage>;
  readonly openInNewTab: Maybe<Scalars['Boolean']['output']>;
  /** Add custom params to URL (e.g. ?key1=value1&key2=value2 or #anchor-id). MUST start with '#' or '?' */
  readonly params: Maybe<Scalars['String']['output']>;
  readonly type: Maybe<Scalars['String']['output']>;
};

type LinkWithoutTextFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly anchorId: InputMaybe<StringFilter>;
  readonly descriptiveText: InputMaybe<StringFilter>;
  readonly externalLink: InputMaybe<StringFilter>;
  readonly openInNewTab: InputMaybe<BooleanFilter>;
  readonly params: InputMaybe<StringFilter>;
  readonly type: InputMaybe<StringFilter>;
};

type LinkWithoutTextSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly anchorId: InputMaybe<SortOrder>;
  readonly descriptiveText: InputMaybe<SortOrder>;
  readonly externalLink: InputMaybe<SortOrder>;
  readonly openInNewTab: InputMaybe<SortOrder>;
  readonly params: InputMaybe<SortOrder>;
  readonly type: InputMaybe<SortOrder>;
};

type MediaTag = Document & {
  readonly __typename?: 'MediaTag';
  /** Date the document was created */
  readonly _createdAt: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  readonly _id: Maybe<Scalars['ID']['output']>;
  readonly _key: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  readonly _rev: Maybe<Scalars['String']['output']>;
  /** Document type */
  readonly _type: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  readonly _updatedAt: Maybe<Scalars['DateTime']['output']>;
  readonly name: Maybe<Slug>;
};

type MediaTagFilter = {
  /** Apply filters on document level */
  readonly _: InputMaybe<Sanity_DocumentFilter>;
  readonly _createdAt: InputMaybe<DatetimeFilter>;
  readonly _id: InputMaybe<IdFilter>;
  readonly _key: InputMaybe<StringFilter>;
  readonly _rev: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly _updatedAt: InputMaybe<DatetimeFilter>;
  readonly name: InputMaybe<SlugFilter>;
};

type MediaTagSorting = {
  readonly _createdAt: InputMaybe<SortOrder>;
  readonly _id: InputMaybe<SortOrder>;
  readonly _key: InputMaybe<SortOrder>;
  readonly _rev: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly _updatedAt: InputMaybe<SortOrder>;
  readonly name: InputMaybe<SlugSorting>;
};

type Page = Document & {
  readonly __typename?: 'Page';
  /** Date the document was created */
  readonly _createdAt: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  readonly _id: Maybe<Scalars['ID']['output']>;
  readonly _key: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  readonly _rev: Maybe<Scalars['String']['output']>;
  /** Document type */
  readonly _type: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  readonly _updatedAt: Maybe<Scalars['DateTime']['output']>;
  readonly blocks: Maybe<Blocks>;
  readonly description: Maybe<Scalars['String']['output']>;
  readonly image: Maybe<AdaptiveImage>;
  /** Optional, for CMS use only */
  readonly label: Maybe<Scalars['String']['output']>;
  readonly seo: Maybe<Seo>;
  readonly slug: Maybe<SlugWithPrefix>;
  readonly title: Maybe<Scalars['String']['output']>;
};

type PageFilter = {
  /** Apply filters on document level */
  readonly _: InputMaybe<Sanity_DocumentFilter>;
  readonly _createdAt: InputMaybe<DatetimeFilter>;
  readonly _id: InputMaybe<IdFilter>;
  readonly _key: InputMaybe<StringFilter>;
  readonly _rev: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly _updatedAt: InputMaybe<DatetimeFilter>;
  readonly blocks: InputMaybe<BlocksFilter>;
  readonly description: InputMaybe<StringFilter>;
  readonly image: InputMaybe<AdaptiveImageFilter>;
  readonly label: InputMaybe<StringFilter>;
  readonly seo: InputMaybe<SeoFilter>;
  readonly slug: InputMaybe<SlugWithPrefixFilter>;
  readonly title: InputMaybe<StringFilter>;
};

type PageSorting = {
  readonly _createdAt: InputMaybe<SortOrder>;
  readonly _id: InputMaybe<SortOrder>;
  readonly _key: InputMaybe<SortOrder>;
  readonly _rev: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly _updatedAt: InputMaybe<SortOrder>;
  readonly blocks: InputMaybe<BlocksSorting>;
  readonly description: InputMaybe<SortOrder>;
  readonly image: InputMaybe<AdaptiveImageSorting>;
  readonly label: InputMaybe<SortOrder>;
  readonly seo: InputMaybe<SeoSorting>;
  readonly slug: InputMaybe<SlugWithPrefixSorting>;
  readonly title: InputMaybe<SortOrder>;
};

type Redirect = Document & {
  readonly __typename?: 'Redirect';
  /** Date the document was created */
  readonly _createdAt: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  readonly _id: Maybe<Scalars['ID']['output']>;
  readonly _key: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  readonly _rev: Maybe<Scalars['String']['output']>;
  /** Document type */
  readonly _type: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  readonly _updatedAt: Maybe<Scalars['DateTime']['output']>;
  /** If checked, it will make the redirect take preference over a page with same path. By default, if a page with same path exists on the CMS, the redirect will be ignored */
  readonly force: Maybe<Scalars['Boolean']['output']>;
  readonly fromPath: Maybe<Scalars['String']['output']>;
  readonly note: Maybe<Scalars['String']['output']>;
  readonly statusCode: Maybe<Scalars['String']['output']>;
  readonly toPath: Maybe<Scalars['String']['output']>;
};

type RedirectFilter = {
  /** Apply filters on document level */
  readonly _: InputMaybe<Sanity_DocumentFilter>;
  readonly _createdAt: InputMaybe<DatetimeFilter>;
  readonly _id: InputMaybe<IdFilter>;
  readonly _key: InputMaybe<StringFilter>;
  readonly _rev: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly _updatedAt: InputMaybe<DatetimeFilter>;
  readonly force: InputMaybe<BooleanFilter>;
  readonly fromPath: InputMaybe<StringFilter>;
  readonly note: InputMaybe<StringFilter>;
  readonly statusCode: InputMaybe<StringFilter>;
  readonly toPath: InputMaybe<StringFilter>;
};

type RedirectSorting = {
  readonly _createdAt: InputMaybe<SortOrder>;
  readonly _id: InputMaybe<SortOrder>;
  readonly _key: InputMaybe<SortOrder>;
  readonly _rev: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly _updatedAt: InputMaybe<SortOrder>;
  readonly force: InputMaybe<SortOrder>;
  readonly fromPath: InputMaybe<SortOrder>;
  readonly note: InputMaybe<SortOrder>;
  readonly statusCode: InputMaybe<SortOrder>;
  readonly toPath: InputMaybe<SortOrder>;
};

type ResponsiveImage = {
  readonly __typename?: 'ResponsiveImage';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly align: Maybe<Scalars['String']['output']>;
  readonly altText: Maybe<Scalars['String']['output']>;
  readonly asset: Maybe<SanityImageAsset>;
  readonly crop: Maybe<SanityImageCrop>;
  readonly hotspot: Maybe<SanityImageHotspot>;
  /** Lazy by default (Defer until image is visible) */
  readonly loading: Maybe<Scalars['String']['output']>;
  readonly maxHeight: Maybe<CssUnit>;
  readonly maxWidth: Maybe<CssUnit>;
  readonly media: Maybe<GlobalDocumentReference>;
  readonly mobileImage: Maybe<Image>;
  readonly objectFit: Maybe<Scalars['String']['output']>;
};

type ResponsiveImageFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly align: InputMaybe<StringFilter>;
  readonly altText: InputMaybe<StringFilter>;
  readonly asset: InputMaybe<SanityImageAssetFilter>;
  readonly crop: InputMaybe<SanityImageCropFilter>;
  readonly hotspot: InputMaybe<SanityImageHotspotFilter>;
  readonly loading: InputMaybe<StringFilter>;
  readonly maxHeight: InputMaybe<CssUnitFilter>;
  readonly maxWidth: InputMaybe<CssUnitFilter>;
  readonly media: InputMaybe<GlobalDocumentReferenceFilter>;
  readonly mobileImage: InputMaybe<ImageFilter>;
  readonly objectFit: InputMaybe<StringFilter>;
};

type ResponsiveImageSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly align: InputMaybe<SortOrder>;
  readonly altText: InputMaybe<SortOrder>;
  readonly crop: InputMaybe<SanityImageCropSorting>;
  readonly hotspot: InputMaybe<SanityImageHotspotSorting>;
  readonly loading: InputMaybe<SortOrder>;
  readonly maxHeight: InputMaybe<CssUnitSorting>;
  readonly maxWidth: InputMaybe<CssUnitSorting>;
  readonly media: InputMaybe<GlobalDocumentReferenceSorting>;
  readonly mobileImage: InputMaybe<ImageSorting>;
  readonly objectFit: InputMaybe<SortOrder>;
};

type ResponsiveNumber = {
  readonly __typename?: 'ResponsiveNumber';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly desktop: Maybe<Scalars['Float']['output']>;
  readonly mobile: Maybe<Scalars['Float']['output']>;
};

type ResponsiveNumberFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly desktop: InputMaybe<FloatFilter>;
  readonly mobile: InputMaybe<FloatFilter>;
};

type ResponsiveNumberSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly desktop: InputMaybe<SortOrder>;
  readonly mobile: InputMaybe<SortOrder>;
};

type ResponsiveString = {
  readonly __typename?: 'ResponsiveString';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly desktop: Maybe<Scalars['String']['output']>;
  readonly mobile: Maybe<Scalars['String']['output']>;
};

type ResponsiveStringFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly desktop: InputMaybe<StringFilter>;
  readonly mobile: InputMaybe<StringFilter>;
};

type ResponsiveStringSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly desktop: InputMaybe<SortOrder>;
  readonly mobile: InputMaybe<SortOrder>;
};

type RichText = {
  readonly __typename?: 'RichText';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly align: Maybe<Scalars['String']['output']>;
  readonly blocksRaw: Maybe<Scalars['JSON']['output']>;
  readonly customField: Maybe<Scalars['String']['output']>;
  readonly maxWidth: Maybe<CssUnit>;
};

type RichTextFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly align: InputMaybe<StringFilter>;
  readonly customField: InputMaybe<StringFilter>;
  readonly maxWidth: InputMaybe<CssUnitFilter>;
};

type RichTextSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly align: InputMaybe<SortOrder>;
  readonly customField: InputMaybe<SortOrder>;
  readonly maxWidth: InputMaybe<CssUnitSorting>;
};

type RootQuery = {
  readonly __typename?: 'RootQuery';
  readonly Article: Maybe<Article>;
  readonly Author: Maybe<Author>;
  readonly ComponentBlueprint: Maybe<ComponentBlueprint>;
  readonly Document: Maybe<Document>;
  readonly Footer: Maybe<Footer>;
  readonly Header: Maybe<Header>;
  readonly MediaTag: Maybe<MediaTag>;
  readonly Page: Maybe<Page>;
  readonly Redirect: Maybe<Redirect>;
  readonly SanityFileAsset: Maybe<SanityFileAsset>;
  readonly SanityImageAsset: Maybe<SanityImageAsset>;
  readonly Settings: Maybe<Settings>;
  readonly Tag: Maybe<Tag>;
  readonly Theme: Maybe<Theme>;
  readonly Wiki: Maybe<Wiki>;
  readonly allArticle: ReadonlyArray<Article>;
  readonly allAuthor: ReadonlyArray<Author>;
  readonly allComponentBlueprint: ReadonlyArray<ComponentBlueprint>;
  readonly allDocument: ReadonlyArray<Document>;
  readonly allFooter: ReadonlyArray<Footer>;
  readonly allHeader: ReadonlyArray<Header>;
  readonly allMediaTag: ReadonlyArray<MediaTag>;
  readonly allPage: ReadonlyArray<Page>;
  readonly allRedirect: ReadonlyArray<Redirect>;
  readonly allSanityFileAsset: ReadonlyArray<SanityFileAsset>;
  readonly allSanityImageAsset: ReadonlyArray<SanityImageAsset>;
  readonly allSettings: ReadonlyArray<Settings>;
  readonly allTag: ReadonlyArray<Tag>;
  readonly allTheme: ReadonlyArray<Theme>;
  readonly allWiki: ReadonlyArray<Wiki>;
};


type RootQueryArticleArgs = {
  id: Scalars['ID']['input'];
};


type RootQueryAuthorArgs = {
  id: Scalars['ID']['input'];
};


type RootQueryComponentBlueprintArgs = {
  id: Scalars['ID']['input'];
};


type RootQueryDocumentArgs = {
  id: Scalars['ID']['input'];
};


type RootQueryFooterArgs = {
  id: Scalars['ID']['input'];
};


type RootQueryHeaderArgs = {
  id: Scalars['ID']['input'];
};


type RootQueryMediaTagArgs = {
  id: Scalars['ID']['input'];
};


type RootQueryPageArgs = {
  id: Scalars['ID']['input'];
};


type RootQueryRedirectArgs = {
  id: Scalars['ID']['input'];
};


type RootQuerySanityFileAssetArgs = {
  id: Scalars['ID']['input'];
};


type RootQuerySanityImageAssetArgs = {
  id: Scalars['ID']['input'];
};


type RootQuerySettingsArgs = {
  id: Scalars['ID']['input'];
};


type RootQueryTagArgs = {
  id: Scalars['ID']['input'];
};


type RootQueryThemeArgs = {
  id: Scalars['ID']['input'];
};


type RootQueryWikiArgs = {
  id: Scalars['ID']['input'];
};


type RootQueryAllArticleArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  sort: InputMaybe<ReadonlyArray<ArticleSorting>>;
  where: InputMaybe<ArticleFilter>;
};


type RootQueryAllAuthorArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  sort: InputMaybe<ReadonlyArray<AuthorSorting>>;
  where: InputMaybe<AuthorFilter>;
};


type RootQueryAllComponentBlueprintArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  sort: InputMaybe<ReadonlyArray<ComponentBlueprintSorting>>;
  where: InputMaybe<ComponentBlueprintFilter>;
};


type RootQueryAllDocumentArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  sort: InputMaybe<ReadonlyArray<DocumentSorting>>;
  where: InputMaybe<DocumentFilter>;
};


type RootQueryAllFooterArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  sort: InputMaybe<ReadonlyArray<FooterSorting>>;
  where: InputMaybe<FooterFilter>;
};


type RootQueryAllHeaderArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  sort: InputMaybe<ReadonlyArray<HeaderSorting>>;
  where: InputMaybe<HeaderFilter>;
};


type RootQueryAllMediaTagArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  sort: InputMaybe<ReadonlyArray<MediaTagSorting>>;
  where: InputMaybe<MediaTagFilter>;
};


type RootQueryAllPageArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  sort: InputMaybe<ReadonlyArray<PageSorting>>;
  where: InputMaybe<PageFilter>;
};


type RootQueryAllRedirectArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  sort: InputMaybe<ReadonlyArray<RedirectSorting>>;
  where: InputMaybe<RedirectFilter>;
};


type RootQueryAllSanityFileAssetArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  sort: InputMaybe<ReadonlyArray<SanityFileAssetSorting>>;
  where: InputMaybe<SanityFileAssetFilter>;
};


type RootQueryAllSanityImageAssetArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  sort: InputMaybe<ReadonlyArray<SanityImageAssetSorting>>;
  where: InputMaybe<SanityImageAssetFilter>;
};


type RootQueryAllSettingsArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  sort: InputMaybe<ReadonlyArray<SettingsSorting>>;
  where: InputMaybe<SettingsFilter>;
};


type RootQueryAllTagArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  sort: InputMaybe<ReadonlyArray<TagSorting>>;
  where: InputMaybe<TagFilter>;
};


type RootQueryAllThemeArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  sort: InputMaybe<ReadonlyArray<ThemeSorting>>;
  where: InputMaybe<ThemeFilter>;
};


type RootQueryAllWikiArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  sort: InputMaybe<ReadonlyArray<WikiSorting>>;
  where: InputMaybe<WikiFilter>;
};

type SanityAssetSourceData = {
  readonly __typename?: 'SanityAssetSourceData';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  /** The unique ID for the asset within the originating source so you can programatically find back to it */
  readonly id: Maybe<Scalars['String']['output']>;
  /** A canonical name for the source this asset is originating from */
  readonly name: Maybe<Scalars['String']['output']>;
  /** A URL to find more information about this asset in the originating source */
  readonly url: Maybe<Scalars['String']['output']>;
};

type SanityAssetSourceDataFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly id: InputMaybe<StringFilter>;
  readonly name: InputMaybe<StringFilter>;
  readonly url: InputMaybe<StringFilter>;
};

type SanityAssetSourceDataSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly id: InputMaybe<SortOrder>;
  readonly name: InputMaybe<SortOrder>;
  readonly url: InputMaybe<SortOrder>;
};

type SanityFileAsset = Document & {
  readonly __typename?: 'SanityFileAsset';
  /** Date the document was created */
  readonly _createdAt: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  readonly _id: Maybe<Scalars['ID']['output']>;
  readonly _key: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  readonly _rev: Maybe<Scalars['String']['output']>;
  /** Document type */
  readonly _type: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  readonly _updatedAt: Maybe<Scalars['DateTime']['output']>;
  readonly altText: Maybe<Scalars['String']['output']>;
  readonly assetId: Maybe<Scalars['String']['output']>;
  readonly description: Maybe<Scalars['String']['output']>;
  readonly extension: Maybe<Scalars['String']['output']>;
  readonly label: Maybe<Scalars['String']['output']>;
  readonly mimeType: Maybe<Scalars['String']['output']>;
  readonly originalFilename: Maybe<Scalars['String']['output']>;
  readonly path: Maybe<Scalars['String']['output']>;
  readonly sha1hash: Maybe<Scalars['String']['output']>;
  readonly size: Maybe<Scalars['Float']['output']>;
  readonly source: Maybe<SanityAssetSourceData>;
  readonly title: Maybe<Scalars['String']['output']>;
  readonly uploadId: Maybe<Scalars['String']['output']>;
  readonly url: Maybe<Scalars['String']['output']>;
};

type SanityFileAssetFilter = {
  /** Apply filters on document level */
  readonly _: InputMaybe<Sanity_DocumentFilter>;
  readonly _createdAt: InputMaybe<DatetimeFilter>;
  readonly _id: InputMaybe<IdFilter>;
  readonly _key: InputMaybe<StringFilter>;
  readonly _rev: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly _updatedAt: InputMaybe<DatetimeFilter>;
  readonly altText: InputMaybe<StringFilter>;
  readonly assetId: InputMaybe<StringFilter>;
  readonly description: InputMaybe<StringFilter>;
  readonly extension: InputMaybe<StringFilter>;
  readonly label: InputMaybe<StringFilter>;
  readonly mimeType: InputMaybe<StringFilter>;
  readonly originalFilename: InputMaybe<StringFilter>;
  readonly path: InputMaybe<StringFilter>;
  readonly sha1hash: InputMaybe<StringFilter>;
  readonly size: InputMaybe<FloatFilter>;
  readonly source: InputMaybe<SanityAssetSourceDataFilter>;
  readonly title: InputMaybe<StringFilter>;
  readonly uploadId: InputMaybe<StringFilter>;
  readonly url: InputMaybe<StringFilter>;
};

type SanityFileAssetSorting = {
  readonly _createdAt: InputMaybe<SortOrder>;
  readonly _id: InputMaybe<SortOrder>;
  readonly _key: InputMaybe<SortOrder>;
  readonly _rev: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly _updatedAt: InputMaybe<SortOrder>;
  readonly altText: InputMaybe<SortOrder>;
  readonly assetId: InputMaybe<SortOrder>;
  readonly description: InputMaybe<SortOrder>;
  readonly extension: InputMaybe<SortOrder>;
  readonly label: InputMaybe<SortOrder>;
  readonly mimeType: InputMaybe<SortOrder>;
  readonly originalFilename: InputMaybe<SortOrder>;
  readonly path: InputMaybe<SortOrder>;
  readonly sha1hash: InputMaybe<SortOrder>;
  readonly size: InputMaybe<SortOrder>;
  readonly source: InputMaybe<SanityAssetSourceDataSorting>;
  readonly title: InputMaybe<SortOrder>;
  readonly uploadId: InputMaybe<SortOrder>;
  readonly url: InputMaybe<SortOrder>;
};

type SanityImageAsset = Document & {
  readonly __typename?: 'SanityImageAsset';
  /** Date the document was created */
  readonly _createdAt: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  readonly _id: Maybe<Scalars['ID']['output']>;
  readonly _key: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  readonly _rev: Maybe<Scalars['String']['output']>;
  /** Document type */
  readonly _type: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  readonly _updatedAt: Maybe<Scalars['DateTime']['output']>;
  readonly altText: Maybe<Scalars['String']['output']>;
  readonly assetId: Maybe<Scalars['String']['output']>;
  readonly description: Maybe<Scalars['String']['output']>;
  readonly extension: Maybe<Scalars['String']['output']>;
  readonly label: Maybe<Scalars['String']['output']>;
  readonly metadata: Maybe<SanityImageMetadata>;
  readonly mimeType: Maybe<Scalars['String']['output']>;
  readonly originalFilename: Maybe<Scalars['String']['output']>;
  readonly path: Maybe<Scalars['String']['output']>;
  readonly sha1hash: Maybe<Scalars['String']['output']>;
  readonly size: Maybe<Scalars['Float']['output']>;
  readonly source: Maybe<SanityAssetSourceData>;
  readonly title: Maybe<Scalars['String']['output']>;
  readonly uploadId: Maybe<Scalars['String']['output']>;
  readonly url: Maybe<Scalars['String']['output']>;
};

type SanityImageAssetFilter = {
  /** Apply filters on document level */
  readonly _: InputMaybe<Sanity_DocumentFilter>;
  readonly _createdAt: InputMaybe<DatetimeFilter>;
  readonly _id: InputMaybe<IdFilter>;
  readonly _key: InputMaybe<StringFilter>;
  readonly _rev: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly _updatedAt: InputMaybe<DatetimeFilter>;
  readonly altText: InputMaybe<StringFilter>;
  readonly assetId: InputMaybe<StringFilter>;
  readonly description: InputMaybe<StringFilter>;
  readonly extension: InputMaybe<StringFilter>;
  readonly label: InputMaybe<StringFilter>;
  readonly metadata: InputMaybe<SanityImageMetadataFilter>;
  readonly mimeType: InputMaybe<StringFilter>;
  readonly originalFilename: InputMaybe<StringFilter>;
  readonly path: InputMaybe<StringFilter>;
  readonly sha1hash: InputMaybe<StringFilter>;
  readonly size: InputMaybe<FloatFilter>;
  readonly source: InputMaybe<SanityAssetSourceDataFilter>;
  readonly title: InputMaybe<StringFilter>;
  readonly uploadId: InputMaybe<StringFilter>;
  readonly url: InputMaybe<StringFilter>;
};

type SanityImageAssetSorting = {
  readonly _createdAt: InputMaybe<SortOrder>;
  readonly _id: InputMaybe<SortOrder>;
  readonly _key: InputMaybe<SortOrder>;
  readonly _rev: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly _updatedAt: InputMaybe<SortOrder>;
  readonly altText: InputMaybe<SortOrder>;
  readonly assetId: InputMaybe<SortOrder>;
  readonly description: InputMaybe<SortOrder>;
  readonly extension: InputMaybe<SortOrder>;
  readonly label: InputMaybe<SortOrder>;
  readonly metadata: InputMaybe<SanityImageMetadataSorting>;
  readonly mimeType: InputMaybe<SortOrder>;
  readonly originalFilename: InputMaybe<SortOrder>;
  readonly path: InputMaybe<SortOrder>;
  readonly sha1hash: InputMaybe<SortOrder>;
  readonly size: InputMaybe<SortOrder>;
  readonly source: InputMaybe<SanityAssetSourceDataSorting>;
  readonly title: InputMaybe<SortOrder>;
  readonly uploadId: InputMaybe<SortOrder>;
  readonly url: InputMaybe<SortOrder>;
};

type SanityImageCrop = {
  readonly __typename?: 'SanityImageCrop';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly bottom: Maybe<Scalars['Float']['output']>;
  readonly left: Maybe<Scalars['Float']['output']>;
  readonly right: Maybe<Scalars['Float']['output']>;
  readonly top: Maybe<Scalars['Float']['output']>;
};

type SanityImageCropFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly bottom: InputMaybe<FloatFilter>;
  readonly left: InputMaybe<FloatFilter>;
  readonly right: InputMaybe<FloatFilter>;
  readonly top: InputMaybe<FloatFilter>;
};

type SanityImageCropSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly bottom: InputMaybe<SortOrder>;
  readonly left: InputMaybe<SortOrder>;
  readonly right: InputMaybe<SortOrder>;
  readonly top: InputMaybe<SortOrder>;
};

type SanityImageDimensions = {
  readonly __typename?: 'SanityImageDimensions';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly aspectRatio: Maybe<Scalars['Float']['output']>;
  readonly height: Maybe<Scalars['Float']['output']>;
  readonly width: Maybe<Scalars['Float']['output']>;
};

type SanityImageDimensionsFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly aspectRatio: InputMaybe<FloatFilter>;
  readonly height: InputMaybe<FloatFilter>;
  readonly width: InputMaybe<FloatFilter>;
};

type SanityImageDimensionsSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly aspectRatio: InputMaybe<SortOrder>;
  readonly height: InputMaybe<SortOrder>;
  readonly width: InputMaybe<SortOrder>;
};

type SanityImageHotspot = {
  readonly __typename?: 'SanityImageHotspot';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly height: Maybe<Scalars['Float']['output']>;
  readonly width: Maybe<Scalars['Float']['output']>;
  readonly x: Maybe<Scalars['Float']['output']>;
  readonly y: Maybe<Scalars['Float']['output']>;
};

type SanityImageHotspotFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly height: InputMaybe<FloatFilter>;
  readonly width: InputMaybe<FloatFilter>;
  readonly x: InputMaybe<FloatFilter>;
  readonly y: InputMaybe<FloatFilter>;
};

type SanityImageHotspotSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly height: InputMaybe<SortOrder>;
  readonly width: InputMaybe<SortOrder>;
  readonly x: InputMaybe<SortOrder>;
  readonly y: InputMaybe<SortOrder>;
};

type SanityImageMetadata = {
  readonly __typename?: 'SanityImageMetadata';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly blurHash: Maybe<Scalars['String']['output']>;
  readonly dimensions: Maybe<SanityImageDimensions>;
  readonly hasAlpha: Maybe<Scalars['Boolean']['output']>;
  readonly isOpaque: Maybe<Scalars['Boolean']['output']>;
  readonly location: Maybe<Geopoint>;
  readonly lqip: Maybe<Scalars['String']['output']>;
  readonly palette: Maybe<SanityImagePalette>;
};

type SanityImageMetadataFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly blurHash: InputMaybe<StringFilter>;
  readonly dimensions: InputMaybe<SanityImageDimensionsFilter>;
  readonly hasAlpha: InputMaybe<BooleanFilter>;
  readonly isOpaque: InputMaybe<BooleanFilter>;
  readonly location: InputMaybe<GeopointFilter>;
  readonly lqip: InputMaybe<StringFilter>;
  readonly palette: InputMaybe<SanityImagePaletteFilter>;
};

type SanityImageMetadataSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly blurHash: InputMaybe<SortOrder>;
  readonly dimensions: InputMaybe<SanityImageDimensionsSorting>;
  readonly hasAlpha: InputMaybe<SortOrder>;
  readonly isOpaque: InputMaybe<SortOrder>;
  readonly location: InputMaybe<GeopointSorting>;
  readonly lqip: InputMaybe<SortOrder>;
  readonly palette: InputMaybe<SanityImagePaletteSorting>;
};

type SanityImagePalette = {
  readonly __typename?: 'SanityImagePalette';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly darkMuted: Maybe<SanityImagePaletteSwatch>;
  readonly darkVibrant: Maybe<SanityImagePaletteSwatch>;
  readonly dominant: Maybe<SanityImagePaletteSwatch>;
  readonly lightMuted: Maybe<SanityImagePaletteSwatch>;
  readonly lightVibrant: Maybe<SanityImagePaletteSwatch>;
  readonly muted: Maybe<SanityImagePaletteSwatch>;
  readonly vibrant: Maybe<SanityImagePaletteSwatch>;
};

type SanityImagePaletteFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly darkMuted: InputMaybe<SanityImagePaletteSwatchFilter>;
  readonly darkVibrant: InputMaybe<SanityImagePaletteSwatchFilter>;
  readonly dominant: InputMaybe<SanityImagePaletteSwatchFilter>;
  readonly lightMuted: InputMaybe<SanityImagePaletteSwatchFilter>;
  readonly lightVibrant: InputMaybe<SanityImagePaletteSwatchFilter>;
  readonly muted: InputMaybe<SanityImagePaletteSwatchFilter>;
  readonly vibrant: InputMaybe<SanityImagePaletteSwatchFilter>;
};

type SanityImagePaletteSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly darkMuted: InputMaybe<SanityImagePaletteSwatchSorting>;
  readonly darkVibrant: InputMaybe<SanityImagePaletteSwatchSorting>;
  readonly dominant: InputMaybe<SanityImagePaletteSwatchSorting>;
  readonly lightMuted: InputMaybe<SanityImagePaletteSwatchSorting>;
  readonly lightVibrant: InputMaybe<SanityImagePaletteSwatchSorting>;
  readonly muted: InputMaybe<SanityImagePaletteSwatchSorting>;
  readonly vibrant: InputMaybe<SanityImagePaletteSwatchSorting>;
};

type SanityImagePaletteSwatch = {
  readonly __typename?: 'SanityImagePaletteSwatch';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly background: Maybe<Scalars['String']['output']>;
  readonly foreground: Maybe<Scalars['String']['output']>;
  readonly population: Maybe<Scalars['Float']['output']>;
  readonly title: Maybe<Scalars['String']['output']>;
};

type SanityImagePaletteSwatchFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly background: InputMaybe<StringFilter>;
  readonly foreground: InputMaybe<StringFilter>;
  readonly population: InputMaybe<FloatFilter>;
  readonly title: InputMaybe<StringFilter>;
};

type SanityImagePaletteSwatchSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly background: InputMaybe<SortOrder>;
  readonly foreground: InputMaybe<SortOrder>;
  readonly population: InputMaybe<SortOrder>;
  readonly title: InputMaybe<SortOrder>;
};

type Sanity_DocumentFilter = {
  /** All documents that are drafts. */
  readonly is_draft: InputMaybe<Scalars['Boolean']['input']>;
  /** All documents referencing the given document ID. */
  readonly references: InputMaybe<Scalars['ID']['input']>;
};

type Seo = {
  readonly __typename?: 'Seo';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  /** Custom Code that will be injected into the page. Note that this can break the page if not used correctly */
  readonly customPageCode: Maybe<Scalars['String']['output']>;
  readonly image: Maybe<Image>;
  readonly indexing: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>;
  readonly jsonLD: Maybe<Scalars['String']['output']>;
  /** This will appear underneath the title in Google search results */
  readonly pageDescription: Maybe<Scalars['String']['output']>;
  /** This title will appear as the title in Google search results */
  readonly pageTitle: Maybe<Scalars['String']['output']>;
};

type SeoFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly customPageCode: InputMaybe<StringFilter>;
  readonly image: InputMaybe<ImageFilter>;
  readonly jsonLD: InputMaybe<StringFilter>;
  readonly pageDescription: InputMaybe<StringFilter>;
  readonly pageTitle: InputMaybe<StringFilter>;
};

type SeoSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly customPageCode: InputMaybe<SortOrder>;
  readonly image: InputMaybe<ImageSorting>;
  readonly jsonLD: InputMaybe<SortOrder>;
  readonly pageDescription: InputMaybe<SortOrder>;
  readonly pageTitle: InputMaybe<SortOrder>;
};

type Settings = Document & {
  readonly __typename?: 'Settings';
  /** Date the document was created */
  readonly _createdAt: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  readonly _id: Maybe<Scalars['ID']['output']>;
  readonly _key: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  readonly _rev: Maybe<Scalars['String']['output']>;
  /** Document type */
  readonly _type: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  readonly _updatedAt: Maybe<Scalars['DateTime']['output']>;
  readonly defaultSEO: Maybe<GlobalSeo>;
  readonly notFoundPageContent: Maybe<RichText>;
  readonly socialMedias: Maybe<ReadonlyArray<Maybe<SocialMedia>>>;
};

type SettingsFilter = {
  /** Apply filters on document level */
  readonly _: InputMaybe<Sanity_DocumentFilter>;
  readonly _createdAt: InputMaybe<DatetimeFilter>;
  readonly _id: InputMaybe<IdFilter>;
  readonly _key: InputMaybe<StringFilter>;
  readonly _rev: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly _updatedAt: InputMaybe<DatetimeFilter>;
  readonly defaultSEO: InputMaybe<GlobalSeoFilter>;
  readonly notFoundPageContent: InputMaybe<RichTextFilter>;
};

type SettingsSorting = {
  readonly _createdAt: InputMaybe<SortOrder>;
  readonly _id: InputMaybe<SortOrder>;
  readonly _key: InputMaybe<SortOrder>;
  readonly _rev: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly _updatedAt: InputMaybe<SortOrder>;
  readonly defaultSEO: InputMaybe<GlobalSeoSorting>;
  readonly notFoundPageContent: InputMaybe<RichTextSorting>;
};

type Slug = {
  readonly __typename?: 'Slug';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly current: Maybe<Scalars['String']['output']>;
  readonly source: Maybe<Scalars['String']['output']>;
};

type SlugFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly current: InputMaybe<StringFilter>;
  readonly source: InputMaybe<StringFilter>;
};

type SlugSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly current: InputMaybe<SortOrder>;
  readonly source: InputMaybe<SortOrder>;
};

type SlugWithPrefix = {
  readonly __typename?: 'SlugWithPrefix';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly current: Maybe<Scalars['String']['output']>;
  readonly prefix: Maybe<Page>;
};

type SlugWithPrefixFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly current: InputMaybe<StringFilter>;
  readonly prefix: InputMaybe<PageFilter>;
};

type SlugWithPrefixSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly current: InputMaybe<SortOrder>;
};

type SocialMedia = {
  readonly __typename?: 'SocialMedia';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly icon: Maybe<IconPicker>;
  readonly text: Maybe<Scalars['String']['output']>;
  readonly url: Maybe<Scalars['String']['output']>;
};

type SocialMediaFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly icon: InputMaybe<IconPickerFilter>;
  readonly text: InputMaybe<StringFilter>;
  readonly url: InputMaybe<StringFilter>;
};

type SocialMediaSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly icon: InputMaybe<IconPickerSorting>;
  readonly text: InputMaybe<SortOrder>;
  readonly url: InputMaybe<SortOrder>;
};

type SortOrder =
  /** Sorts on the value in ascending order. */
  | 'ASC'
  /** Sorts on the value in descending order. */
  | 'DESC';

type Span = {
  readonly __typename?: 'Span';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly marks: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>;
  readonly text: Maybe<Scalars['String']['output']>;
};

type StringFilter = {
  /** Checks if the value is equal to the given input. */
  readonly eq: InputMaybe<Scalars['String']['input']>;
  readonly in: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  /** Checks if the value is defined. */
  readonly is_defined: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value matches the given word/words. */
  readonly matches: InputMaybe<Scalars['String']['input']>;
  /** Checks if the value is not equal to the given input. */
  readonly neq: InputMaybe<Scalars['String']['input']>;
  readonly nin: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
};

type Tag = Document & {
  readonly __typename?: 'Tag';
  /** Date the document was created */
  readonly _createdAt: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  readonly _id: Maybe<Scalars['ID']['output']>;
  readonly _key: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  readonly _rev: Maybe<Scalars['String']['output']>;
  /** Document type */
  readonly _type: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  readonly _updatedAt: Maybe<Scalars['DateTime']['output']>;
  readonly name: Maybe<Scalars['String']['output']>;
};

type TagFilter = {
  /** Apply filters on document level */
  readonly _: InputMaybe<Sanity_DocumentFilter>;
  readonly _createdAt: InputMaybe<DatetimeFilter>;
  readonly _id: InputMaybe<IdFilter>;
  readonly _key: InputMaybe<StringFilter>;
  readonly _rev: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly _updatedAt: InputMaybe<DatetimeFilter>;
  readonly name: InputMaybe<StringFilter>;
};

type TagSorting = {
  readonly _createdAt: InputMaybe<SortOrder>;
  readonly _id: InputMaybe<SortOrder>;
  readonly _key: InputMaybe<SortOrder>;
  readonly _rev: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly _updatedAt: InputMaybe<SortOrder>;
  readonly name: InputMaybe<SortOrder>;
};

type Theme = Document & {
  readonly __typename?: 'Theme';
  /** Date the document was created */
  readonly _createdAt: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  readonly _id: Maybe<Scalars['ID']['output']>;
  readonly _key: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  readonly _rev: Maybe<Scalars['String']['output']>;
  /** Document type */
  readonly _type: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  readonly _updatedAt: Maybe<Scalars['DateTime']['output']>;
  readonly classNames: Maybe<ReadonlyArray<Maybe<ThemeClassName>>>;
  readonly colorPicker: Maybe<ReadonlyArray<Maybe<ThemeColorPicker>>>;
};

type ThemeClassName = {
  readonly __typename?: 'ThemeClassName';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly css: Maybe<Scalars['String']['output']>;
  /** A CMS only label to identify the class name */
  readonly label: Maybe<Scalars['String']['output']>;
  /** The name of the class name, must be lowercase, no spaces, no special characters (only letters, numbers, and hyphens) */
  readonly name: Maybe<Scalars['String']['output']>;
};

type ThemeClassNameFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly css: InputMaybe<StringFilter>;
  readonly label: InputMaybe<StringFilter>;
  readonly name: InputMaybe<StringFilter>;
};

type ThemeClassNameSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly css: InputMaybe<SortOrder>;
  readonly label: InputMaybe<SortOrder>;
  readonly name: InputMaybe<SortOrder>;
};

type ThemeColorPicker = {
  readonly __typename?: 'ThemeColorPicker';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  /** If you are using a name or a css variable in the value field above, set a color here for previewing in the color menu picker */
  readonly hex: Maybe<Scalars['String']['output']>;
  readonly title: Maybe<Scalars['String']['output']>;
  /** The value used in the website, can be a hex value, a name (e.g. primary), or a css variable (e.g. var(--color-primary)) */
  readonly value: Maybe<Scalars['String']['output']>;
};

type ThemeColorPickerFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly hex: InputMaybe<StringFilter>;
  readonly title: InputMaybe<StringFilter>;
  readonly value: InputMaybe<StringFilter>;
};

type ThemeColorPickerSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly hex: InputMaybe<SortOrder>;
  readonly title: InputMaybe<SortOrder>;
  readonly value: InputMaybe<SortOrder>;
};

type ThemeFilter = {
  /** Apply filters on document level */
  readonly _: InputMaybe<Sanity_DocumentFilter>;
  readonly _createdAt: InputMaybe<DatetimeFilter>;
  readonly _id: InputMaybe<IdFilter>;
  readonly _key: InputMaybe<StringFilter>;
  readonly _rev: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly _updatedAt: InputMaybe<DatetimeFilter>;
};

type ThemePalette = {
  readonly __typename?: 'ThemePalette';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly background: Maybe<Scalars['String']['output']>;
  readonly primary: Maybe<Scalars['String']['output']>;
  readonly secondary: Maybe<Scalars['String']['output']>;
  readonly text: Maybe<Scalars['String']['output']>;
};

type ThemePaletteFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly background: InputMaybe<StringFilter>;
  readonly primary: InputMaybe<StringFilter>;
  readonly secondary: InputMaybe<StringFilter>;
  readonly text: InputMaybe<StringFilter>;
};

type ThemePaletteSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly background: InputMaybe<SortOrder>;
  readonly primary: InputMaybe<SortOrder>;
  readonly secondary: InputMaybe<SortOrder>;
  readonly text: InputMaybe<SortOrder>;
};

type ThemeSorting = {
  readonly _createdAt: InputMaybe<SortOrder>;
  readonly _id: InputMaybe<SortOrder>;
  readonly _key: InputMaybe<SortOrder>;
  readonly _rev: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly _updatedAt: InputMaybe<SortOrder>;
};

type ThemeTypography = {
  readonly __typename?: 'ThemeTypography';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly family: Maybe<Scalars['String']['output']>;
  readonly lineHeight: Maybe<Scalars['String']['output']>;
  readonly size: Maybe<CssUnit>;
  readonly type: Maybe<Scalars['String']['output']>;
  readonly weight: Maybe<Scalars['String']['output']>;
};

type ThemeTypographyFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly family: InputMaybe<StringFilter>;
  readonly lineHeight: InputMaybe<StringFilter>;
  readonly size: InputMaybe<CssUnitFilter>;
  readonly type: InputMaybe<StringFilter>;
  readonly weight: InputMaybe<StringFilter>;
};

type ThemeTypographySorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly family: InputMaybe<SortOrder>;
  readonly lineHeight: InputMaybe<SortOrder>;
  readonly size: InputMaybe<CssUnitSorting>;
  readonly type: InputMaybe<SortOrder>;
  readonly weight: InputMaybe<SortOrder>;
};

type Wiki = Document & {
  readonly __typename?: 'Wiki';
  /** Date the document was created */
  readonly _createdAt: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  readonly _id: Maybe<Scalars['ID']['output']>;
  readonly _key: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  readonly _rev: Maybe<Scalars['String']['output']>;
  /** Document type */
  readonly _type: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  readonly _updatedAt: Maybe<Scalars['DateTime']['output']>;
  readonly sections: Maybe<ReadonlyArray<Maybe<WikiSection>>>;
  readonly subtitle: Maybe<Scalars['String']['output']>;
  readonly title: Maybe<Scalars['String']['output']>;
};

type WikiFilter = {
  /** Apply filters on document level */
  readonly _: InputMaybe<Sanity_DocumentFilter>;
  readonly _createdAt: InputMaybe<DatetimeFilter>;
  readonly _id: InputMaybe<IdFilter>;
  readonly _key: InputMaybe<StringFilter>;
  readonly _rev: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly _updatedAt: InputMaybe<DatetimeFilter>;
  readonly subtitle: InputMaybe<StringFilter>;
  readonly title: InputMaybe<StringFilter>;
};

type WikiRichText = {
  readonly __typename?: 'WikiRichText';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly blocksRaw: Maybe<Scalars['JSON']['output']>;
};

type WikiRichTextFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
};

type WikiRichTextSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
};

type WikiSection = {
  readonly __typename?: 'WikiSection';
  readonly _key: Maybe<Scalars['String']['output']>;
  readonly _type: Maybe<Scalars['String']['output']>;
  readonly content: Maybe<WikiRichText>;
  readonly title: Maybe<Scalars['String']['output']>;
};

type WikiSectionFilter = {
  readonly _key: InputMaybe<StringFilter>;
  readonly _type: InputMaybe<StringFilter>;
  readonly content: InputMaybe<WikiRichTextFilter>;
  readonly title: InputMaybe<StringFilter>;
};

type WikiSectionSorting = {
  readonly _key: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly content: InputMaybe<WikiRichTextSorting>;
  readonly title: InputMaybe<SortOrder>;
};

type WikiSorting = {
  readonly _createdAt: InputMaybe<SortOrder>;
  readonly _id: InputMaybe<SortOrder>;
  readonly _key: InputMaybe<SortOrder>;
  readonly _rev: InputMaybe<SortOrder>;
  readonly _type: InputMaybe<SortOrder>;
  readonly _updatedAt: InputMaybe<SortOrder>;
  readonly subtitle: InputMaybe<SortOrder>;
  readonly title: InputMaybe<SortOrder>;
};


}
