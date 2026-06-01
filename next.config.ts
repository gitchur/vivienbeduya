import { defineQuery } from "next-sanity";
import withLinaria, { LinariaConfig } from "next-with-linaria";
import { sanityFetch } from "./src/lib/sanityClient";

const config: LinariaConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
    optimizePackageImports: [
      "react-icons",
      "@flight-digital/sanity-plugin-flightdeck",
      "sanity",
      "lucide-react",
      "framework7-icons-react",
      "@sanity/vision",
      "@sanity/ui",
    ],
  },
  transpilePackages: ["@flight-digital/flightdeck"], // Required for flightdeck nextPreview to work
  serverExternalPackages: ["sanity-plugin-icon-picker"],
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' http://localhost:3000 https://bisayabanter.netlify.app",
          },
        ],
      },
    ];
  },
  redirects: async () => {
    try {
      const redirects = (await sanityFetch({
        query: defineQuery(`
          *[_type == "redirect" && !(_id in path('drafts.**'))] {
            fromPath,
            toPath,
            statusCode
          }
        `),
      })) as Sanity.Maybe<Sanity.Redirect[]>;

      return (
        redirects?.map((redirect: Sanity.Redirect) => ({
          source: redirect?.fromPath ?? "",
          destination: redirect?.toPath ?? "",
          permanent: redirect?.statusCode === "301",
        })) ?? []
      );
    } catch (error) {
      console.error("Error on generate redirects", error);
      return [];
    }
  },
};

export default withLinaria(config);
