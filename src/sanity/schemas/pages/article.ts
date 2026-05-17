import { ReadingTimeInput } from "@/sanity/components/readingTimeInput";
import sharedFields from "@/sanity/utils/sharedFields";
import { formatPagePreview } from "@flight-digital/sanity-plugin-flightdeck";
import { MdOutlineArticle } from "react-icons/md";
import { defineField, defineType } from "sanity";
import { fieldgroups } from "../../utils/constants";

/** THIS IS JUST AN EXAMPLE SCHEMA, PLEASE DELETE THIS FILE IF YOU DON'T NEED IT OR MODIFY IT ACCORDINGLY */
export default defineType({
  title: "Article",
  name: "article",
  type: "document",
  icon: MdOutlineArticle,
  groups: [
    fieldgroups.pageSettings,
    fieldgroups.seo,
    fieldgroups.articleDetails,
    { ...fieldgroups.content, default: true },
  ],
  fieldsets: [
    { name: "titles", title: "Titles" },
    { name: "excerpts", title: "Excerpts" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: fieldgroups.pageSettings.name,
      fieldset: "titles",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alternativeTitle",
      title: "Alternative",
      type: "string",
      group: fieldgroups.pageSettings.name,
      fieldset: "titles",
    }),
    defineField({
      title: "Excerpt",
      name: "description",
      type: "text",
      rows: 3,
      group: fieldgroups.pageSettings.name,
      fieldset: "excerpts",
      validation: (Rule) =>
        Rule.max(150).warning("The excerpt should be no more than 150 characters"),
    }),
    defineField({
      name: "alternativeDescription",
      title: "Alternative",
      type: "text",
      rows: 3,
      group: fieldgroups.pageSettings.name,
      fieldset: "excerpts",
      validation: (Rule) =>
        Rule.max(150).warning("The excerpt should be no more than 150 characters"),
    }),
    ...sharedFields
      .defaultPageFields({
        prefixPageId: "c3d4aa5d-3792-406e-a72a-9e2f9752f29c",
      })
      .filter((field) => !["title", "description"].includes(field.name)),
    defineField({
      name: "publishDate",
      type: "date",
      initialValue: new Date().toISOString().slice(0, 10),
      options: {
        dateFormat: "DD/MM/YYYY",
      },
      validation: (Rule) => Rule.required(),
      group: fieldgroups.articleDetails.name,
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      group: fieldgroups.articleDetails.name,
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
      group: fieldgroups.articleDetails.name,
    }),
    defineField({
      name: "suggestedReadTime",
      title: "Suggested Read Time (min)",
      type: "number",
      readOnly: true,
      description: "Auto-calculated from article content. Re-opens and saves to update.",
      group: fieldgroups.articleDetails.name,
      components: {
        input: ReadingTimeInput,
      },
    }),
  ],
  preview: formatPagePreview(null, { publishDate: "publishDate" }, (props) => ({
    title: props.label || props.title,
    subtitle: `${props.publishDate} | ${props.formattedSlug}`,
  })),
});
