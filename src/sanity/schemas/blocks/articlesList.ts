import images from "@/sanity/assets/images";
import {
  defineBlock,
  formatBlockPreview,
  richTextToText,
} from "@flight-digital/sanity-plugin-flightdeck";
import { FaList } from "react-icons/fa6";
import { defineField } from "sanity";

/** THIS IS JUST AN EXAMPLE SCHEMA, PLEASE DELETE THIS FILE IF YOU DON'T NEED IT OR MODIFY IT ACCORDINGLY */
export default defineBlock({
  name: "articlesList",
  title: "Articles List",
  image: images.blockArticlesList.src,
  icon: FaList,
  fields: [
    defineField({
      name: "content",
      type: "richText",
      title: "Title",
    }),
    defineField({
      name: "showAll",
      type: "boolean",
      title: "Show all articles",
    }),
  ],
  preview: formatBlockPreview({
    fields: "content.blocks",
    formatter: (val) => richTextToText(val),
  }),
});
