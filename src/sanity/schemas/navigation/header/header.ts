import { imageWithMetaOptions } from "@flight-digital/sanity-plugin-flightdeck";
import { RiLayoutTopLine } from "react-icons/ri";
import { defineField, defineType } from "sanity";

export default defineType({
  title: "Header",
  name: "header",
  icon: RiLayoutTopLine,
  type: "document",
  fields: [
    defineField({
      name: "logo",
      type: "adaptiveImage",
      options: {
        ...imageWithMetaOptions,
        disableImageSettings: true,
      },
    }),
    defineField({
      name: "navigation",
      title: "Main Navigation",
      type: "array",
      of: [{ type: "link" }, { type: "headerNavMenu" }],
      validation: (Rule) => Rule.required().max(10),
    }),
    defineField({
      name: "hideOnScroll",
      description: "Hides the header on scroll down to leave more space for user",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "bannerText",
      type: "richText",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Header",
      };
    },
  },
});
