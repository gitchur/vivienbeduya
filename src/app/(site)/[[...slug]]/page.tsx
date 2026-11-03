import TemplateRenderer from "@/components/organisms/templateRenderer";
import { getLayoutRelatedData, getSiteSettings } from "@/queries/global";
import { getAllPagesSlugs, getPage, getPageSeo } from "@/queries/pages";
import { siteName } from "@/utils/constants";
import { buildPagePath, truncateText } from "@/utils/helpers";
import { buildJsonLd } from "@/utils/jsonLd";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = PageProps<"/[[...slug]]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const loadedParams = await params;
  const data = await getPageSeo(loadedParams?.slug);
  const settings = await getSiteSettings();
  const path = loadedParams?.slug;
  const isHome = !path || path.length === 0;

  const pageUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${isHome ? "" : `/${loadedParams?.slug?.join("/")}`}`;
  const isArticle = data?._type === "article";
  const isAuthor = data?._type === "author";

  const title =
    data?.seo?.pageTitle ||
    data?.title ||
    // No page matched: this title is shown on the not-found page
    (!data ? "Nawala ka, bai?" : undefined) ||
    settings?.defaultSEO?.pageTitle ||
    undefined;
  const description =
    data?.seo?.pageDescription ||
    data?.description ||
    // Authors have no "description" field, so fall back to a plain-text excerpt of their bio.
    (isAuthor && data?.bioExcerpt ? truncateText(data.bioExcerpt) : undefined) ||
    settings?.defaultSEO?.pageDescription ||
    undefined;
  const rawImage =
    data?.seo?.image?.asset?.url ||
    (data as Sanity.Article)?.image?.desktopImage?.asset?.url ||
    settings?.defaultSEO?.image?.asset?.url ||
    undefined;
  const image = rawImage ? `${rawImage}?auto=format&fit=max&q=75&w=1000` : undefined;
  const titleWithSuffix = title && settings?.defaultSEO?.pageTitleSuffix
    ? `${title} | ${settings.defaultSEO.pageTitleSuffix}`
    : undefined;

  const metadata = {
    title: {
      default: title,
      absolute: titleWithSuffix,
    },
    description,
    openGraph: {
      title,
      images: image,
      description,
      ...(isAuthor
        ? { type: "profile", firstName: data?.firstName, lastName: data?.lastName }
        : { type: isArticle ? "article" : "website" }),
      siteName: siteName,
      url: pageUrl,
    },
    robots: {
      index: data?.seo?.indexing?.includes("noindex") ? false : undefined,
      follow: data?.seo?.indexing?.includes("nofollow") ? false : undefined,
    },
    twitter: {
      card: "summary_large_image",
      description,
      images: image,
      title,
      //site: "@flightdeck", // Uncomment this if you have a Twitter account
    },
    alternates: {
      canonical: pageUrl,
    },
  } as Metadata;

  if (title || titleWithSuffix) {
    // @ts-ignore
    metadata.title = {
      ...(title ? { default: title } : {}),
      ...(titleWithSuffix ? { absolute: titleWithSuffix } : {}),
    };
  }

  return metadata;
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const pages = await getAllPagesSlugs();

  const staticParams = (pages ?? [])
    .map((page: any) => buildPagePath(page))
    .filter((slug: string[]) => slug.length > 0)
    .map((slug: string[]) => ({ slug }));

  return staticParams;
}

export default async function Page({ params, searchParams }: PageProps<"/[[...slug]]">) {
  const loadedParams = await params;
  const [data, layout] = await Promise.all([getPage(loadedParams?.slug), getLayoutRelatedData()]);

  if (!data) return notFound();

  const jsonLd = buildJsonLd(data, layout);
  const customPageCode = data?.seo?.customPageCode;

  return (
    <>
      {jsonLd.map((json, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      ))}
      <TemplateRenderer data={data} searchParamsPromise={searchParams} />
      {customPageCode ? (
        <div
          className="custom-page-code"
          dangerouslySetInnerHTML={{ __html: customPageCode }}
          suppressHydrationWarning
        />
      ) : null}
    </>
  );
}
