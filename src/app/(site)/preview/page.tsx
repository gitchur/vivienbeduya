import TemplateRenderer from "@/components/organisms/templateRenderer";
import { componentBuilderPreviewFields } from "@/queries/blocks";
import { pageFields } from "@/queries/pages";
import NextPreview from "@flight-digital/flightdeck/boulders/nextPreview/nextPreview";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const getProjection = (type: string) => {
  if (["componentBlueprint"].includes(type)) return componentBuilderPreviewFields;
  return pageFields;
};

export default async function PreviewPage({ searchParams }: PageProps<"/preview">) {
  return (
    <NextPreview
      searchParams={searchParams}
      projection={getProjection}
      previewActions={{
        enabled: true,
        targetOrigin: process.env.NEXT_PUBLIC_WEBSITE_URL,
        logActions: true,
      }}
    >
      {(data) => <TemplateRenderer data={data} />}
    </NextPreview>
  );
}
