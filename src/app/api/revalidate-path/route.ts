import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

type WebhookPayload = {
  _type: string;
  _id: string;
  paths?: string[];
  slug?: {
    current: string;
  };
};

export async function POST(req: NextRequest) {
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

    switch (_type) {
      case "article":
        console.log("Revalidating articles list");
        revalidateTag("articles-list", "max");
        break;
      default:
        console.log("Revalidating type: ", _type);
        revalidateTag(_type, "max");
        break;
    }

    // Revalidate by paths array (sent by Sanity webhook)
    if (paths?.length) {
      for (const path of paths) {
        const lastSegment = path.split("/").filter(Boolean).pop();
        if (lastSegment) {
          console.log("Revalidating slug from path: ", lastSegment);
          revalidateTag(`slug:${lastSegment}`, "max");
        }
      }
    }

    // Fallback: revalidate by slug.current if present
    if (slug?.current) {
      console.log("Revalidating slug: ", slug.current);
      revalidateTag(`slug:${slug?.current}`, "max");
    }

    return NextResponse.json({ body });
  } catch (err: any) {
    console.error("Error revalidating path", err);
    return new Response(err.message, { status: 500 });
  }
}
