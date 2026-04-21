import { defineField, defineType } from "sanity";
import { CgGirl } from "react-icons/cg";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: CgGirl,
  fields: [
    defineField({
      name: "firstName",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastName",
      type: "string",
    }),
    defineField({
      name: "image",
      type: "adaptiveImage",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bio",
      type: "richText",
    }),
  ],
  preview: {
    select: {
      title: "firstName",
      subtitle: "lastName",
      media: "image.desktopImage.asset",
    },
    prepare(props) {
      return props;
    },
  },
});
