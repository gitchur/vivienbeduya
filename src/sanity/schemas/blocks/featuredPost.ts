import {
  defineBlock,
  formatBlockPreview,
  richTextToText,
} from "@flight-digital/sanity-plugin-flightdeck";
import { FaList } from "react-icons/fa6";
import { defineField } from "sanity";

export default defineBlock({
  name: "featuredPost",
  title: "Featured Post",
  icon: FaList,
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
});
