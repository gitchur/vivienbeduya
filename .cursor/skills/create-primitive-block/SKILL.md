---
name: create-primitive-block
description: Create primitive blocks (reusable content elements) that can be used within grid/container blocks.
---

# Create Primitive Block

Create primitive blocks - reusable content elements that can be nested within grid and container blocks.

## When to Use

- Creating reusable content elements (links lists, stats, videos, iframes, etc.)
- Building components that editors can add to grid/container blocks
- Creating elements that don't need full block structure
- Making flexible content modules that work in multiple contexts

## What are Primitive Blocks?

**Primitive blocks** are reusable object schemas that:
- Can be added to `grid` and `container` blocks
- Are simpler than full blocks (no queries, simpler registration)
- Render through `primitiveBlocks.tsx` switch component
- Some are provided by Flightdeck by default (ctaCard, gap, adaptiveImage, buttonsList, richText, accordion)

**Examples:**
- `linksList` - List of links
- `video` - Video player
- `stat` - Statistic display
- `iframeElement` - Embedded iframe
- `hubspotForm` - Form embed
- `subcolumn` - Nested column layout

## File Structure

```
src/
├── sanity/schemas/objects/
│   └── {primitiveName}.ts          # Object schema
├── components/molecules/
│   └── {primitiveName}.tsx         # React component
├── utils/
│   ├── constants.ts                # Registration
│   └── validateType.ts             # Type guard
└── components/blocks/
    └── primitiveBlocks.tsx         # Render switch
```

## Step-by-Step Instructions

### Step 1: Create Object Schema

**File:** `src/sanity/schemas/objects/{primitiveName}.ts`

```typescript
import { BiIcon } from "react-icons/bi"; // Choose appropriate icon
import { defineField, defineType } from "sanity";

export default defineType({
  name: "{primitiveName}",
  title: "{Primitive Title}",
  icon: BiIcon,
  type: "object",
  fields: [
    defineField({
      name: "fieldName",
      type: "string",
      title: "Field Title",
      validation: (Rule) => Rule.required(),
    }),
    // Add your fields...
  ],
  preview: {
    select: {
      title: "fieldName",
      // Select other fields for preview
    },
    prepare({ title }) {
      return {
        title: title || "Untitled",
        subtitle: "{Primitive Title}",
      };
    },
  },
});
```

**Example: Links List**

```typescript
import { BiLink } from "react-icons/bi";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "linksList",
  title: "Links List",
  icon: BiLink,
  type: "object",
  fields: [
    defineField({
      name: "links",
      type: "array",
      title: "Links",
      description: "Add links to display in the list",
      of: [{ type: "link" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      links: "links",
    },
    prepare({ links }) {
      const count = links?.length || 0;
      return {
        title: "Links List",
        subtitle: `${count} link${count !== 1 ? "s" : ""}`,
      };
    },
  },
});
```

### Step 2: Register in Constants

**File:** `src/utils/constants.ts`

Add to the `primitiveBlocksTypes` array:

```typescript
export const primitiveBlocksTypes = [
  { type: "subcolumn" },
  { type: "video" },
  { type: "linksList" },
  { type: "{primitiveName}" },  // Add here
];
```

**Note:** Flightdeck provides these by default:
- `ctaCard`
- `gap`
- `adaptiveImage`
- `buttonsList`
- `richText`
- `accordion`

Only add custom primitives here.

### Step 3: Register Schema

**File:** `src/sanity/schemas/index.ts`

Import and add to schemas array:

```typescript
// Objects
import linksList from "./objects/linksList";
import {primitiveName} from "./objects/{primitiveName}";

const schemas = [
  // ... existing schemas ...
  
  // Objects section
  linksList,
  {primitiveName},  // Add here
];

export default schemas;
```

### Step 4: Create React Component

**File:** `src/components/molecules/{primitiveName}.tsx`

```typescript
"use client";

import { styled } from "@linaria/react";

interface Props {
  data: Sanity.{PrimitiveName};
  columnSpaces?: number;  // Optional, for grid-aware sizing
}

export const {PrimitiveName} = ({ data, columnSpaces }: Props): React.JSX.Element | null => {
  if (!data) return null;

  // Component logic

  return (
    <Wrapper>
      {/* Add data-sanity-path to custom fields inside the primitive */}
    </Wrapper>
  );
};

// ============================================
// STYLED COMPONENTS
// ============================================

const Wrapper = styled.div`
  position: relative;
`;
```

**Example: Links List Component**

```typescript
"use client";

import { styled } from "@linaria/react";
import Link from "../atoms/link";

interface Props {
  data: Sanity.LinksList;
}

export const LinksList = ({ data }: Props): React.JSX.Element | null => {
  if (!data?.links) return null;

  return (
    <Wrapper data-sanity-path="links">
      {data.links.map((link) => (
        <Link key={link._key} data={link} data-sanity-path={`{${link._key}}`} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16rwd;

  @media --base-down {
    gap: 12rwm;
  }
`;
```

### Step 5: Add Type Guard

**File:** `src/utils/validateType.ts`

Add type assertion:

```typescript
import { assertType, defaultValidatedTypes } from "@flight-digital/flightdeck/validateType";

const validateType = {
  ...(defaultValidatedTypes || {}),
  // ... existing types ...
  is{PrimitiveName}: assertType<Sanity.{PrimitiveName}>("{primitiveName}"),
};

export default validateType;
```

**Example:**

```typescript
const validateType = {
  ...(defaultValidatedTypes || {}),
  isLinksList: assertType<Sanity.LinksList>("linksList"),
  isVideo: assertType<Sanity.Video>("video"),
  isStat: assertType<Sanity.Stat>("stat"),
};
```

### Step 6: Add to Primitive Blocks Switch

**File:** `src/components/blocks/primitiveBlocks.tsx`

1. Import component
2. Add type guard check
3. Return component

```typescript
import { {PrimitiveName} } from "../molecules/{primitiveName}";

// Inside PrimitiveBlock function, add:
if (validateType.is{PrimitiveName}(data)) {
  return <{PrimitiveName} data={data as Sanity.{PrimitiveName}} columnSpaces={columnSpaces} />;
}
```

**Full example:**

```typescript
import { getImageWidthFromColumnSpace } from "@flight-digital/flightdeck/helpers";
import ErrorInspector from "@flight-digital/flightdeck/pebbles/errorInpector";
import Gap from "@flight-digital/flightdeck/pebbles/gap";
import validateType from "@/utils/validateType";
import Image from "../atoms/image";
import { LinksList } from "../molecules/linksList";
import RichText from "../molecules/richText";
import Video from "../molecules/video";

interface Props {
  data: Maybe<Sanity.AccordionOrAdaptiveImageOrLinksListOrRichTextOrVideo>;
  columnSpaces?: Maybe<number>;
}

const PrimitiveBlock = ({ data, columnSpaces }: Props) => {
  if (!data) return null;

  const imageWidth = getImageWidthFromColumnSpace(columnSpaces ?? 12, 100);

  // Flightdeck defaults
  if (validateType.isGap(data)) {
    return <Gap data={data} />;
  }

  if (validateType.isAdaptiveImage(data)) {
    return <Image data={data as Sanity.AdaptiveImage} width={imageWidth} />;
  }

  if (validateType.isRichText(data)) {
    return <RichText data={data as unknown as Sanity.RichText} imageWidth={imageWidth} />;
  }

  // Custom primitives
  if (validateType.isLinksList(data)) {
    return <LinksList data={data as Sanity.LinksList} />;
  }

  if (validateType.isVideo(data)) {
    return <Video data={data as Sanity.Video} />;
  }

  return <ErrorInspector msg={`No component for ${data._type}`} data={data} />;
};

export default PrimitiveBlock;
```

### Step 7: Generate Types

Run TypeScript codegen:

```bash
npm run typegen
```

Verify:
- Type `Sanity.{PrimitiveName}` is available
- No TypeScript errors
- Type guard works correctly

### Step 8: Test in Sanity Studio

1. Start dev server: `npm run dev`
2. Open Sanity Studio
3. Edit a page with a grid or container block
4. Add your primitive block
5. Verify it appears and works correctly

## Common Patterns

### FlightDeck Preview Data Attributes

Grid columns, container items, and native FlightDeck primitive blocks already include their preview paths internally. For custom primitive blocks, add field-level `data-sanity-path` attributes for fields inside the custom component.

- Use `data-sanity-path` for fields that should be clickable in preview.
- Use `data-sanity-editable` only on simple text elements that should support double-click inline editing.
- Use `_key` paths for arrays of objects (`links.{linkKey}`) and index paths only for arrays of primitive values (`tags.[0]`).
- Do not add paths to layout-only wrappers unless the wrapper corresponds to a Sanity field.

```tsx
<Wrapper>
  <h3 data-sanity-path="title" data-sanity-editable>
    {data.title}
  </h3>

  <Image data={data.image} data-sanity-path="image" />

  <div data-sanity-path="links">
    {data.links?.map((link) => (
      <Link key={link._key} data={link} data-sanity-path={`{${link._key}}`} />
    ))}
  </div>

  <div data-sanity-path="tags">
    {data.tags?.map((tag, index) => (
      <span key={tag} data-sanity-path={`[${index}]`} data-sanity-editable>
        {tag}
      </span>
    ))}
  </div>
</Wrapper>
```

### Primitive with Links

```typescript
defineField({
  name: "links",
  type: "array",
  title: "Links",
  of: [{ type: "link" }],
  validation: (Rule) => Rule.min(1),
})
```

### Primitive with Images

```typescript
defineField({
  name: "image",
  type: "adaptiveImage",
  title: "Image",
})
```

### Primitive with Rich Text

```typescript
defineField({
  name: "content",
  type: "richText",
  title: "Content",
})
```

### Primitive with Conditional Fields

```typescript
defineField({
  name: "type",
  type: "string",
  title: "Type",
  options: {
    list: [
      { title: "Video", value: "video" },
      { title: "Iframe", value: "iframe" },
    ],
  },
}),
defineField({
  name: "videoUrl",
  type: "url",
  title: "Video URL",
  hidden: ({ parent }) => parent?.type !== "video",
}),
defineField({
  name: "iframeUrl",
  type: "url",
  title: "Iframe URL",
  hidden: ({ parent }) => parent?.type !== "iframe",
})
```

### Grid-Aware Sizing

When primitive needs to respond to column width:

```typescript
interface Props {
  data: Sanity.MyPrimitive;
  columnSpaces?: number;  // 1-12, indicates grid columns
}

export const MyPrimitive = ({ data, columnSpaces }: Props) => {
  // Use columnSpaces for responsive behavior
  const isSmall = columnSpaces && columnSpaces < 6;
  
  return (
    <Wrapper className={isSmall ? "compact" : "full"}>
      {/* Content */}
    </Wrapper>
  );
};
```

## Examples

### Stats Primitive

**Schema:**

```typescript
export default defineType({
  name: "stat",
  title: "Statistic",
  type: "object",
  fields: [
    defineField({
      name: "value",
      type: "string",
      title: "Value",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      type: "string",
      title: "Label",
    }),
  ],
});
```

**Component:**

```typescript
export const Stat = ({ data }: Props) => {
  if (!data) return null;

  return (
    <Wrapper>
      <Value>{data.value}</Value>
      {data.label && <Label>{data.label}</Label>}
    </Wrapper>
  );
};
```

### Video Primitive

**Schema:**

```typescript
export default defineType({
  name: "video",
  title: "Video",
  type: "object",
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "Video URL",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "autoplay",
      type: "boolean",
      title: "Autoplay",
      initialValue: false,
    }),
  ],
});
```

## Checklist

- [ ] Created object schema in `src/sanity/schemas/objects/`
- [ ] Registered in `primitiveBlocksTypes` in `constants.ts`
- [ ] Registered schema in `schemas/index.ts`
- [ ] Created React component in `src/components/molecules/`
- [ ] Added type guard in `validateType.ts`
- [ ] Added to primitive blocks switch in `primitiveBlocks.tsx`
- [ ] Added `data-sanity-path` attributes for clickable custom primitive fields
- [ ] Added `data-sanity-editable` only to simple text fields that should support inline editing
- [ ] Ran `npm run typegen` successfully
- [ ] Tested in grid/container block in Sanity Studio
- [ ] Verified rendering on frontend
- [ ] Checked responsive behavior

## Troubleshooting

**Primitive doesn't appear in grid block:**
- Check registered in `primitiveBlocksTypes`
- Verify schema is in `index.ts`
- Run `npm run typegen`
- Restart dev server

**Type errors:**
- Verify type guard in `validateType.ts`
- Check primitive added to `primitiveBlocks.tsx`
- Run `npm run typegen` again
- Check schema name matches everywhere

**Component not rendering:**
- Check type guard logic in `primitiveBlocks.tsx`
- Verify early return conditions in component
- Check for TypeScript errors
- Look at ErrorInspector output in browser

**Preview not showing in CMS:**
- Check preview configuration in schema
- Verify select fields exist
- Test prepare function logic

## Best Practices

### ✅ DO

- Keep primitives focused and reusable
- Use descriptive icons
- Add helpful preview configurations
- Support `columnSpaces` prop when relevant
- Handle missing data gracefully
- Use Flightdeck types when available

### ❌ DON'T

- Create primitives for one-time use cases
- Forget to register in all required places
- Skip type guards
- Use complex nested structures (create separate objects)
- Hardcode styles (use responsive units)

## Related Skills

- **→ create-sanity-schema** - For creating the object schema
- **→ style-with-linaria** - For styling the component
- **→ create-block** - Primitives are used within blocks

## Next Steps

After creating primitive:
- Test in multiple block contexts (grid, container)
- Verify responsive behavior
- Check with different column spans
- Document usage for content editors
- Create examples in Sanity Studio
