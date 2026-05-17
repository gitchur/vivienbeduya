import { slugToCacheTag } from "@/utils/helpers";
import { parseBody } from "next-sanity/webhook";
import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

type WebhookPayload = {
  _type: string;
  _id: string;
  paths?: string[];
  slug?: {
    current: string;
  };
};

export const dynamic = "force-dynamic";

const revalidateSlugTag = (slugOrPath: string | undefined | null, revalidated: Set<string>): void => {
  const tagSlug = slugToCacheTag(slugOrPath);
  if (!tagSlug) return;

  const tag = `slug:${tagSlug}`;
  if (revalidated.has(tag)) return;

  revalidated.add(tag);
  revalidateTag(tag, "max");

  if (tagSlug === "/") {
    revalidatePath("/");
  }
};

export async function POST(req: NextRequest): Promise<Response> {
  try {
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return new Response("Missing environment variable SANITY_REVALIDATE_SECRET", { status: 500 });
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      const message = "Invalid signature";
      return new Response(JSON.stringify({ message, isValidSignature, body }), { status: 401 });
    }

    if (!body?._type) {
      const message = "Bad Request";
      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }

    const { _type, paths, slug } = body;
    const revalidated = new Set<string>();

    switch (_type) {
      case "article":
        revalidateTag("articles-list", "max");
        revalidated.add("articles-list");
        break;
      default:
        revalidateTag(_type, "max");
        revalidated.add(_type);
        break;
    }

    if (paths?.length) {
      for (const path of paths) {
        revalidateSlugTag(path, revalidated);
      }
    }

    if (slug?.current != null) {
      revalidateSlugTag(slug.current, revalidated);
    }

    return NextResponse.json({
      revalidated: Array.from(revalidated),
      body,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Error revalidating path", err);
    return new Response(message, { status: 500 });
  }
}
