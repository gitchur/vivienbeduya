import { defineBlock } from "@flight-digital/sanity-plugin-flightdeck";
import { MdViewHeadline } from "react-icons/md";
import { defineField } from "sanity";

export default defineBlock({
  name: "marquee",
  title: "Marquee",
  icon: MdViewHeadline,
  fields: [
    defineField({
      name: "items",
      type: "array",
      title: "Items",
      description: "Text items that scroll across the marquee band.",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      items: "items",
    },
    prepare({ items }) {
      const preview = Array.isArray(items) ? items.slice(0, 3).join(" · ") : "Marquee";
      return {
        title: "Marquee",
        subtitle: preview || "No items yet",
      };
    },
  },
});
