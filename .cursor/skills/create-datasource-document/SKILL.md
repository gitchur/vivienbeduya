---
name: create-datasource-document
description: Create referential document schemas for data that can be reused across the application (team members, opportunities, etc.).
---

# Create DataSource Document

Create referential document schemas that live in the Sanity Studio Data Source section.

## When to Use

- Creating reusable reference data (team members, opportunities, categories)
- Building document types that aren't pages or blocks
- Creating content that can be referenced multiple times
- Setting up structured data for the application

## What are DataSource Documents?

**DataSource documents** are:
- Standalone document types (not pages or blocks)
- Referenced across multiple pages and blocks
- Organized in a dedicated "Data Source" section in Sanity Studio
- Used for structured, reusable content

**Examples:**
- Team members (referenced in team blocks, author fields)
- Opportunities (referenced in opportunity lists)
- Categories (referenced in articles, filtering)
- Partners (referenced in partner lists)
- Testimonials (referenced in testimonial blocks)

## File Structure

```
src/
├── sanity/
│   ├── schemas/documents/
│   │   └── {documentName}.ts       # Document schema
│   └── desk/
│       ├── base.ts                 # Main desk structure
│       └── datasource.ts           # Data source configuration
└── utils/
    └── validateType.ts             # Type guard (optional)
```

## Step-by-Step Instructions

### Step 1: Create Document Schema

**File:** `src/sanity/schemas/documents/{documentName}.ts`

```typescript
import { FaIcon } from "react-icons/fa"; // Choose appropriate icon
import { defineField, defineType } from "sanity";

export default defineType({
  name: "{documentName}",
  title: "{Document Title}",
  type: "document",
  icon: FaIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    
    // Add your fields...
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "role",  // Optional subtitle field
      media: "image",    // Optional image field
    },
  },
});
```

**Example: Team Member Document**

```typescript
import { FaUser } from "react-icons/fa";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  icon: FaUser,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: "role",
      type: "string",
      title: "Role",
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: "image",
      type: "adaptiveImage",
      title: "Profile Image",
    }),
    
    defineField({
      name: "bio",
      type: "richText",
      title: "Biography",
    }),
    
    defineField({
      name: "email",
      type: "string",
      title: "Email",
      validation: (Rule) => Rule.email(),
    }),
    
    defineField({
      name: "linkedin",
      type: "url",
      title: "LinkedIn URL",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
    },
  },
});
```

**Example: Opportunity Document**

```typescript
import { FaHandshake } from "react-icons/fa";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "opportunity",
  title: "Opportunity",
  type: "document",
  icon: FaHandshake,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: "category",
      type: "reference",
      title: "Category",
      to: [{ type: "opportunityCategory" }],
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: "description",
      type: "richText",
      title: "Description",
    }),
    
    defineField({
      name: "location",
      type: "string",
      title: "Location",
    }),
    
    defineField({
      name: "publishedDate",
      type: "date",
      title: "Published Date",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
    },
  },
});
```

### Step 2: Register Schema

**File:** `src/sanity/schemas/index.ts`

Import and add to schemas array:

```typescript
// Documents
import teamMember from "./documents/teamMember";
import {documentName} from "./documents/{documentName}";

const schemas = [
  // ... existing schemas ...
  
  // Documents section
  teamMember,
  {documentName},  // Add here
];

export default schemas;
```

### Step 3: Add to Data Source Desk Structure

**File:** `src/sanity/desk/datasource.ts`

Add to the `docs` array:

```typescript
import { desk } from "@flight-digital/sanity-plugin-flightdeck";
import { FaDatabase, FaHandshake, FaUser } from "react-icons/fa";
import type { StructureBuilder } from "sanity/structure";

const docs = [
  { type: "opportunity", title: "Opportunities", icon: FaHandshake, isList: true },
  { type: "teamMember", title: "Team Members", icon: FaUser, isList: true },
  { type: "{documentName}", title: "{Document Title}", icon: FaIcon, isList: true },  // Add here
];

const datasource = (S: StructureBuilder) =>
  S.listItem()
    .title("Data Source")
    .icon(FaDatabase)
    .child(
      S.list()
        .title("Data Source")
        .items([
          ...docs
            .sort((a, b) => a.title.localeCompare(b.title))
            .map(({ type, title, icon, isList }) =>
              isList
                ? desk.multipleListDocuments(S, title, type, icon)
                : desk.singleListDocument(S, title, type, icon),
            ),
        ]),
    );

export default datasource;
```

**Configuration options:**

- `type`: Document type name (matches schema)
- `title`: Display title in Sanity Studio
- `icon`: Icon component from react-icons
- `isList`: `true` for multiple documents, `false` for singleton

**Example - Multiple documents:**

```typescript
{ type: "teamMember", title: "Team Members", icon: FaUser, isList: true }
```

**Example - Singleton document:**

```typescript
{ type: "siteSettings", title: "Site Settings", icon: FaCog, isList: false }
```

### Step 4: Add Type Guard (Optional)

If you need to validate document types in code:

**File:** `src/utils/validateType.ts`

```typescript
import { assertType, defaultValidatedTypes } from "@flight-digital/flightdeck/validateType";

const validateType = {
  ...(defaultValidatedTypes || {}),
  is{DocumentName}: assertType<Sanity.{DocumentName}>("{documentName}"),
  isTeamMember: assertType<Sanity.TeamMember>("teamMember"),
  isOpportunity: assertType<Sanity.Opportunity>("opportunity"),
};

export default validateType;
```

### Step 5: Generate Types

Run TypeScript codegen:

```bash
npm run typegen
```

Verify:
- Type `Sanity.{DocumentName}` is available
- No TypeScript errors

### Step 6: Create Reference Query (If Needed)

If you need to query these documents:

**File:** `src/queries/{documentName}.ts`

```typescript
import { defineQuery } from "next-sanity";

export const teamMembersQuery = defineQuery(`
  *[_type == "teamMember"] | order(name asc) {
    _id,
    _type,
    name,
    slug,
    role,
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions
        }
      }
    },
    bio,
    email,
    linkedin
  }
`);

export const teamMemberBySlugQuery = defineQuery(`
  *[_type == "teamMember" && slug.current == $slug][0] {
    _id,
    _type,
    name,
    slug,
    role,
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions
        }
      }
    },
    bio,
    email,
    linkedin
  }
`);
```

### Step 7: Test in Sanity Studio

1. Start dev server: `npm run dev`
2. Open Sanity Studio: `http://localhost:3000/admin`
3. Navigate to "Data Source" section
4. Verify your document type appears
5. Create a test document
6. Verify all fields work correctly

## Common Patterns

### Document with Slug

Always include slug for referential documents:

```typescript
defineField({
  name: "slug",
  type: "slug",
  title: "Slug",
  options: {
    source: "title",  // Auto-generate from title
    maxLength: 96,
  },
  validation: (Rule) => Rule.required(),
})
```

### Document with Categories

Reference another document type:

```typescript
defineField({
  name: "category",
  type: "reference",
  title: "Category",
  to: [{ type: "category" }],
  validation: (Rule) => Rule.required(),
})
```

### Document with Multiple References

```typescript
defineField({
  name: "relatedOpportunities",
  type: "array",
  title: "Related Opportunities",
  of: [{ type: "reference", to: [{ type: "opportunity" }] }],
})
```

### Document with Status

```typescript
defineField({
  name: "status",
  type: "string",
  title: "Status",
  options: {
    list: [
      { title: "Draft", value: "draft" },
      { title: "Published", value: "published" },
      { title: "Archived", value: "archived" },
    ],
    layout: "radio",
  },
  initialValue: "draft",
})
```

### Document with Dates

```typescript
defineField({
  name: "publishedAt",
  type: "datetime",
  title: "Published At",
  validation: (Rule) => Rule.required(),
}),
defineField({
  name: "updatedAt",
  type: "datetime",
  title: "Last Updated",
  readOnly: true,
})
```

## Querying DataSource Documents

### Fetch All Documents

```typescript
import { sanityFetch } from "@/sanity/lib/client";
import { teamMembersQuery } from "@/queries/teamMember";

const teamMembers = await sanityFetch({
  query: teamMembersQuery,
  tags: ["teamMember"],
});
```

### Fetch by Slug

```typescript
import { sanityFetch } from "@/sanity/lib/client";
import { teamMemberBySlugQuery } from "@/queries/teamMember";

const teamMember = await sanityFetch({
  query: teamMemberBySlugQuery,
  params: { slug: "john-doe" },
  tags: ["teamMember"],
});
```

### Fetch with References

```typescript
export const opportunitiesWithCategoryQuery = defineQuery(`
  *[_type == "opportunity"] | order(publishedDate desc) {
    _id,
    title,
    slug,
    category->{
      _id,
      title,
      slug
    },
    description,
    location
  }
`);
```

## Referencing in Blocks

### Reference Single Document

In block schema:

```typescript
defineField({
  name: "teamMember",
  type: "reference",
  title: "Team Member",
  to: [{ type: "teamMember" }],
})
```

In GROQ query:

```typescript
teamMember->{
  _id,
  name,
  role,
  image
}
```

### Reference Multiple Documents

In block schema:

```typescript
defineField({
  name: "team",
  type: "array",
  title: "Team Members",
  of: [{ type: "reference", to: [{ type: "teamMember" }] }],
})
```

In GROQ query:

```typescript
team[]->{
  _id,
  name,
  role,
  image
}
```

## Examples

### Testimonials Document

```typescript
export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      type: "text",
      title: "Quote",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      type: "string",
      title: "Author Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      title: "Role/Company",
    }),
    defineField({
      name: "image",
      type: "adaptiveImage",
      title: "Author Image",
    }),
  ],
  preview: {
    select: {
      title: "author",
      subtitle: "role",
      media: "image",
    },
  },
});
```

### FAQ Document

```typescript
export default defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      type: "string",
      title: "Question",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      type: "richText",
      title: "Answer",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Category",
      options: {
        list: [
          { title: "General", value: "general" },
          { title: "Technical", value: "technical" },
          { title: "Billing", value: "billing" },
        ],
      },
    }),
    defineField({
      name: "order",
      type: "number",
      title: "Sort Order",
    }),
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "category",
    },
  },
});
```

## Checklist

- [ ] Created document schema in `src/sanity/schemas/documents/`
- [ ] Registered schema in `schemas/index.ts`
- [ ] Added to data source in `desk/datasource.ts`
- [ ] Chose appropriate icon
- [ ] Set `isList` correctly (true for multiple, false for singleton)
- [ ] Added type guard in `validateType.ts` (if needed)
- [ ] Ran `npm run typegen` successfully
- [ ] Created queries for fetching documents (if needed)
- [ ] Tested creating documents in Sanity Studio
- [ ] Verified preview displays correctly
- [ ] Tested referencing in blocks (if applicable)

## Troubleshooting

**Document doesn't appear in Data Source:**
- Check added to `datasource.ts`
- Verify type name matches schema
- Check icon is imported correctly
- Restart Sanity Studio

**Type errors:**
- Run `npm run typegen`
- Check schema name is consistent everywhere
- Verify document type is "document"

**Can't reference document:**
- Verify schema is registered
- Check reference field `to` array
- Run `npm run typegen`

**Preview not showing:**
- Check preview select fields exist
- Verify media field points to image
- Test with actual data

## Best Practices

### ✅ DO

- Always include slug field for referential documents
- Use descriptive icons
- Add helpful preview configurations
- Include validation on required fields
- Use references instead of duplicating data
- Group related documents in Data Source
- Sort documents alphabetically in datasource.ts

### ❌ DON'T

- Create documents for one-off content (use singleton pages)
- Skip slug fields
- Forget to register in datasource.ts
- Use documents when blocks would be better
- Create circular references
- Skip validation

## Related Skills

- **→ create-sanity-schema** - For schema creation patterns
- **→ create-block** - DataSource documents are referenced in blocks

## Next Steps

After creating datasource document:
- Create queries for fetching documents
- Reference in block schemas
- Create listing pages (if needed)
- Test with real content
- Document for content editors
