import TemplateRenderer from "@/components/organisms/templateRenderer";
import { getSiteSettings } from "@/queries/global";
import { getAllPagesSlugs, getPage } from "@/queries/pages";
import { siteName } from "@/utils/constants";
import { buildPagePath, getJsonLd } from "@/utils/helpers";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = PageProps<"/[[...slug]]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const loadedParams = await params;
  const data = await getPage(loadedParams?.slug);
  const settings = await getSiteSettings();
  const path = loadedParams?.slug;
  const isHome = !path || path.length === 0;

  const pageUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${isHome ? "" : `/${loadedParams?.slug?.join("/")}`}`;
  const title = data?.seo?.pageTitle || data?.title || settings?.defaultSEO?.pageTitle || undefined;
  const description =
    data?.seo?.pageDescription ||
    data?.description ||
    settings?.defaultSEO?.pageDescription ||
    undefined;
  const rawImage =
    data?.seo?.image?.asset?.url ||
    (data as Sanity.Article)?.image?.desktopImage?.asset?.url ||
    settings?.defaultSEO?.image?.asset?.url ||
    undefined;
  const image = rawImage ? `${rawImage}?auto=format&fit=max&q=75&w=1000` : undefined;
  const isArticle = data?._type === "article";
  const titleWithSuffix = settings?.defaultSEO?.pageTitleSuffix
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
      type: isArticle ? "article" : "website",
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
    .filter((page: any) => page?.slug?.current)
    .map((page: any) => ({ slug: buildPagePath(page) }));

  return staticParams;
}

export default async function Page({ params, searchParams }: PageProps<"/[[...slug]]">) {
  const loadedParams = await params;
  const loadedSearchParams = await searchParams;
  const data = await getPage(loadedParams?.slug);
  const jsonLd = getJsonLd(data);

  if (!data) return notFound();

  const customPageCode = data?.seo?.customPageCode;

  return (
    <>
      {jsonLd &&
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd as string }} />
      }
      <TemplateRenderer data={data} searchParams={loadedSearchParams} />
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
