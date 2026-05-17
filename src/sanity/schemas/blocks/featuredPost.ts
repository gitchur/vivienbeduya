import { defineBlock } from "@flight-digital/sanity-plugin-flightdeck";
import { FaList } from "react-icons/fa6";
import { defineField } from "sanity";
import { MdOutlineFeaturedPlayList } from "react-icons/md";

export default defineBlock({
  name: "featuredPost",
  title: "Featured Post",
  icon: MdOutlineFeaturedPlayList,
  fields: [
    defineField({
      name: "getLatest",
      type: "boolean",
      title: "Get latest post",
    }),
    defineField({
      name: "post",
      type: "reference",
      to: [{ type: "article" }],
    }),
  ],
  preview: {
    select: {
      postTitle: "post.title",
      media: "post.image",
    },
    prepare({ postTitle, media }) {
      return {
        title: postTitle || "Featured Post",
        media,
      };
    },
  },
});
