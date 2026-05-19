import { RiLayoutBottomLine } from "react-icons/ri";
import { defineField, defineType } from "sanity";

export default defineType({
  title: "Footer",
  name: "footer",
  icon: RiLayoutBottomLine,
  type: "document",
  fields: [
    defineField({
      name: "navigation",
      title: "Main Navigation",
      type: "array",
      of: [{ type: "footerNavMenu" }],
    }),
    defineField({
      name: "copyright",
      title: "Footer Excerpt",
      type: "heading",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Footer",
      };
    },
  },
});
