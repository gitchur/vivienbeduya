---
name: create-block
description: Create a new content block for the CMS including schema, component, queries, and registration.
---

# Create Block

Complete workflow for creating a new content block in the Next.js + Sanity + Linaria stack.

## When to Use

- Use this skill when the user asks to create a new block, section, or CMS content module
- When implementing a new content type that editors can add to pages
- When converting a Figma design into a reusable block component

## Prerequisites

Before creating a block, ensure you understand:
- The block's purpose and content structure
- Required fields and their types
- Whether it needs supporting object schemas
- If there's a Figma design to reference

**Ask clarifying questions if:**
- The content structure is unclear
- You're unsure which field types to use
- The design has complex nested structures
- Theme variants are needed

## Related Skills

- **extract-design-tokens** - For extracting base design system from Figma (do this first if needed!)
- **create-sanity-schema** - For creating the Sanity schema (block, objects)
- **style-with-linaria** - For styling the component
- **convert-figma-to-code** - If implementing from Figma design
- **generate-block-preview** - For creating preview images for Sanity Studio

## Block Architecture

Each block requires 4 components:

1. **Sanity Schema** (`src/sanity/schemas/blocks/{blockName}.ts`)
2. **React Component** (`src/components/blocks/{blockName}.tsx`)
3. **GROQ Query** (`src/queries/blocks.ts`)
4. **Registration** (constants, index.ts, blocks.tsx)

## Step-by-Step Instructions

### Step 1: Create Supporting Schemas First

**If your block needs nested objects (tabs, cards, items, etc.):**

→ Use the **create-sanity-schema** skill to create object schemas first
→ NEVER define objects inline - always create separate files
→ Example: If your block has tabs, create `src/sanity/schemas/objects/tabItem.ts` first

### Step 2: Create the Block Schema

→ Use the **create-sanity-schema** skill with type="block"
→ Reference any object schemas you created in Step 1
→ Optionally add preview image using **generate-block-preview** skill

**Block schema must include:**
- All content fields with proper types
- Validation rules
- Preview configuration
- Optional: Preview image for block picker

### Step 3: Create the React Component

**Location:**
- Simple blocks: `src/components/blocks/{blockName}.tsx`
- Complex blocks: `src/components/blocks/{blockName}/{blockName}.tsx`

**Component template:**

```typescript
"use client";

import { mergeClassNames } from "@flight-digital/flightdeck/helpers";
import { styled } from "@linaria/react";

interface Props {
  data?: Sanity.Block{BlockName};
}

const {BlockName} = ({ data }: Props): React.JSX.Element | null => {
  if (!data) return null;

  const { title } = data;

  return (
    <Wrapper>
      {title && (
        <Title className="h3" data-sanity-path="title" data-sanity-editable>
          {title}
        </Title>
      )}
    </Wrapper>
  );
};

export default {BlockName};

// ============================================
// STYLED COMPONENTS
// ============================================

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 64rwd;
  padding-bottom: 64rwd;
  padding-left: var(--theme-page-left-padding);
  padding-right: var(--theme-page-right-padding);

  @media --base-down {
    padding-top: 48rwm;
    padding-bottom: 48rwm;
  }
`;

const Title = styled.h3`
  margin: 0;
`;
```

**Key requirements:**
- Always use `React.JSX.Element | null` as return type
- Include early return if no data
- Default theme to "dark" unless explicitly "light"
- Add FlightDeck preview attributes for CMS editing:
  - `data-sanity-path` on every top-level custom block field that should be clickable
  - `data-sanity-editable` only on simple text elements that support inline editing
- Do not add the block-level path manually. `BlocksList` automatically adds `data-sanity-path="blocks.{_key}"`.
- Use `_key` paths for arrays of objects (`items.{itemKey}.title`) and index paths only for arrays of primitives (`tags.[0]`)
- → Reference **style-with-linaria** skill for styling patterns

### Step 4: Add GROQ Query

**File:** `src/queries/blocks.ts`

1. Create query fields constant:

```typescript
const block{BlockName}Fields = defineBlockQuery("block.{blockName}")(
  `
  theme { name },
  title,
  // Add your fields...
  items[] {
    _key,
    label,
  },
  image { ${imageFields} },
  link { ${linkFields} },
`,
);
```

2. Add to `blocksListFieldsCore`:

```typescript
const blocksListFieldsCore = defineQuery(`
  ${blockHeroFields},
  // ... existing blocks ...
  ${block{BlockName}Fields}
`);
```

### Step 5: Register the Block

**5.1 Update `src/utils/constants.ts`:**

```typescript
export const blocksTypes = [
  { type: "block.hero" },
  // ... existing blocks ...
  { type: "block.{blockName}" },
];
```

**5.2 Update `src/sanity/schemas/index.ts`:**

```typescript
// Import schemas
import block{BlockName} from "./blocks/{blockName}";
// If you have object schemas:
import {objectName} from "./objects/{objectName}";

const schemas = [
  // ... existing schemas ...
  
  // Objects (if any)
  {objectName},
  
  // Blocks
  block{BlockName},
];
```

**5.3 Update `src/components/blocks/blocks.tsx`:**

```typescript
import {BlockName} from "./{blockName}";

// Inside BlocksList component, add:
<CustomBlock<Sanity.Block{BlockName}>
  blockType="block.{blockName}"
  element={(elData) => <{BlockName} data={elData} />}
/>
```

### Step 6: Generate Types

Run TypeScript codegen to generate types from your schema:

```bash
npm run typegen
```

**Verify:**
- No errors during type generation
- The type `Sanity.Block{BlockName}` is available
- All fields match your schema definition

### Step 7: Test in Sanity Studio

1. Start the dev server: `npm run dev`
2. Open Sanity Studio: `http://localhost:3000/admin`
3. Create or edit a page
4. Add your new block to the content
5. Verify all fields appear correctly
6. Test the preview functionality

### Step 8: Generate Preview Image (Optional)

→ Use the **generate-block-preview** skill to create a preview image for the block picker

This makes it easier for content editors to identify blocks visually in Sanity Studio.

## Common Patterns

### Using Flightdeck Components

```typescript
// Images
import Image from "@/components/atoms/image";
<Image data={data.image} className="custom-class" />

// Buttons/Links
import Button from "@/components/atoms/button";
<Button data={data.link} variant="orangeBtn" />

// Rich Text
import RichText from "../molecules/richText";
<RichText data={data.content} data-sanity-path="content" />

// Tabs
import Tabs from "../molecules/tabs";
<Tabs
  tabs={data.tabs?.map(tab => ({ _key: tab._key, label: tab.label! })) || []}
  activeTabIndex={activeTabIndex}
  onTabChange={setActiveTabIndex}
  theme={theme as "light" | "dark"}
/>
```

### Handling Arrays

```typescript
{items && items.length > 0 && (
  <List data-sanity-path="items">
    {items.map((item) => (
      <ListItem key={item._key} data-sanity-path={`{${item._key}}`}>
        <span data-sanity-path="label" data-sanity-editable>
          {item.label}
        </span>
      </ListItem>
    ))}
  </List>
)}
```

### FlightDeck Preview Data Attributes

FlightDeck uses HTML data attributes to connect preview elements to Sanity fields. Add them to custom block components so editors can click preview content to focus fields and double-click simple text to edit inline.

**Core rules:**
- `BlocksList` already adds the block wrapper path (`blocks.{blockKey}`), so custom blocks only need field-level paths.
- Paths merge upward through the DOM. A child with `data-sanity-path="image"` inside a parent with `data-sanity-path="items.{itemKey}"` resolves to `blocks.{blockKey}.items.{itemKey}.image`.
- Use dot notation for fields, curly braces for array object `_key` values, and square brackets only for arrays of primitive values.
- Add `data-sanity-editable` only to text elements such as headings, paragraphs, captions, and labels.
- Do not add paths to layout-only wrappers unless the wrapper corresponds to a Sanity field.

**Common patterns:**

```tsx
{/* String field: click focuses, double-click edits inline */}
<h2 data-sanity-path="title" data-sanity-editable>
  {data.title}
</h2>

{/* Image field */}
<Image data={data.image} data-sanity-path="image" />

{/* Rich Text field. FlightDeck handles inner rich text paths. */}
<RichText data={data.content} data-sanity-path="content" />

{/* Array of objects */}
<div data-sanity-path="cards">
  {data.cards?.map((card) => (
    <article key={card._key} data-sanity-path={`{${card._key}}`}>
      <Image data={card.image} data-sanity-path="image" />
      <h3 data-sanity-path="title" data-sanity-editable>
        {card.title}
      </h3>
    </article>
  ))}
</div>

{/* Array of primitive strings */}
<div data-sanity-path="tags">
  {data.tags?.map((tag, index) => (
    <p key={tag} data-sanity-path={`[${index}]`} data-sanity-editable>
      {tag}
    </p>
  ))}
</div>
```

## Checklist

Before completing the block:

- [ ] Created object schemas in `src/sanity/schemas/objects/` (if needed)
- [ ] Created block schema in `src/sanity/schemas/blocks/`
- [ ] Used `React.JSX.Element | null` as component return type
- [ ] Created React component with theme support
- [ ] Ignored max-width from Figma (use responsive width approach)
- [ ] Used build-time compatible Linaria syntax
- [ ] Used `rwd`/`rwm` responsive units
- [ ] Added GROQ query fields
- [ ] Added to `blocksListFieldsCore`
- [ ] Registered in `constants.ts`
- [ ] Registered in `schemas/index.ts`
- [ ] Added CustomBlock in `blocks.tsx`
- [ ] Added `data-sanity-path` attributes for all clickable custom block fields
- [ ] Added `data-sanity-editable` only to simple inline-editable text fields
- [ ] Used `{${item._key}}` paths for arrays of objects and `[${index}]` paths only for arrays of primitives
- [ ] Ran `npm run typegen` successfully
- [ ] Tested in Sanity Studio

## Troubleshooting

**TypeGen fails:**
- Check for inline object definitions (not allowed)
- Verify all object schemas are in separate files
- Check for syntax errors in schema definitions

**Block doesn't appear in CMS:**
- Verify registration in all 3 places (constants, index, blocks.tsx)
- Check block name matches everywhere (camelCase)
- Restart dev server

**Preview not working:**
- Check `data-sanity-path` attributes match schema field names
- Verify array object paths use `_key` format (`items.{itemKey}`), not index format
- Verify primitive array paths use index format (`tags.[0]`) as the final path segment
- Enable `logActions: true` in preview configuration when debugging generated paths
- Verify theme handling is correct
- Check for TypeScript errors in component

**Styling issues:**
- → Use **style-with-linaria** skill for styling guidance
- Verify responsive units (`rwd`/`rwm`)
- Check theme classes are applied correctly

## Next Steps

After creating the block:
- Test with real content in Sanity Studio
- Verify responsive behavior on mobile
- Validate against design (if from Figma)
- Add to project documentation if needed
