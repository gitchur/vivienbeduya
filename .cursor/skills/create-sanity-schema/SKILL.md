---
name: create-sanity-schema
description: Create Sanity schemas for blocks, objects, or documents. Handles schema definition, field types, validation, and registration.
---

# Create Sanity Schema

Create Sanity CMS schemas for blocks, reusable objects, or reference documents.

## When to Use

- Creating a new block schema for CMS content
- Creating reusable object schemas (tab items, cards, list items, etc.)
- Creating document schemas for reference data (team members, categories, etc.)
- Defining field structures for Sanity Studio

## Schema Types

### Block Schemas
**Purpose:** Content sections that can be added to pages
**Location:** `src/sanity/schemas/blocks/{blockName}.ts`
**Use case:** Hero sections, card carousels, CTAs, content blocks

### Object Schemas
**Purpose:** Reusable nested structures within blocks or documents
**Location:** `src/sanity/schemas/objects/{objectName}.ts`
**Use case:** Tab items, card definitions, list items, repeatable structures
**⚠️ CRITICAL:** NEVER define objects inline - always create separate files

### Document Schemas
**Purpose:** Standalone content types that can be referenced
**Location:** `src/sanity/schemas/documents/{documentName}.ts`
**Use case:** Team members, case studies, categories, authors

## Available Field Types

### Flightdeck Types (Preferred)
These are provided by the `@flight-digital/flightdeck` plugin:

- `richText` - Rich text editor with formatting
- `adaptiveImage` - Responsive images with hotspot/crop
- `link` - Internal/external links with optional text
- `video` - Video upload/embed (via Mux)

### Sanity Core Types

- `string` - Single line text
- `text` - Multi-line text
- `number` - Numeric values
- `boolean` - True/false toggle
- `date` - Date picker
- `datetime` - Date and time picker
- `url` - URL with validation
- `array` - List of items
- `object` - Nested structure (do not use - prefer separate object schemas)
- `reference` - Reference to another document
- `image` - Standard Sanity image (do not use, prefer `adaptiveImage` from Flightdeck)
- `link` - Standard link from flightdeck
- `linkWithoutText` - Just a link with no text from flightdeck
- `buttonList` - List of flightdeck buttons
- `richText` - flightdeck rich text, prefered for any long text or text with styles in between

## Instructions

### Creating a Block Schema

**File:** `src/sanity/schemas/blocks/{blockName}.ts`

```typescript
import { defineBlock, formatBlockPreview } from "@flight-digital/sanity-plugin-flightdeck";
import { FaIcon } from "react-icons/fa"; // Choose appropriate icon
import { defineField } from "sanity";

export default defineBlock({
  name: "{blockName}",                    // camelCase, no "block." prefix
  title: "{Block Title}",                 // Human-readable title
  icon: FaIcon,                           // Icon for CMS
  // image: images.block{Name}.src,       // Optional: Preview image
  disableDefaultPadding: true,            // Usually true
  fields: [
    
    // Simple fields
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: "caption",
      type: "text",
      title: "Caption",
      description: "Optional description text",
    }),
    
    // Rich text
    defineField({
      name: "content",
      type: "richText",
      title: "Content",
    }),
    
    // Image
    defineField({
      name: "image",
      type: "adaptiveImage",
      title: "Image",
    }),
    
    // Link/Button
    defineField({
      name: "link",
      type: "link",
      title: "Button",
    }),
    
    // Array of objects
    defineField({
      name: "items",
      type: "array",
      title: "Items",
      of: [{ type: "objectTypeName" }],   // Reference to object schema
      validation: (Rule) => Rule.min(1).max(10),
    }),
    
    // Conditional field
    defineField({
      name: "showImage",
      type: "boolean",
      title: "Show Image",
      initialValue: true,
    }),
    defineField({
      name: "imagePosition",
      type: "string",
      title: "Image Position",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
      },
      hidden: ({ parent }) => !parent?.showImage,
    }),
  ],
  preview: formatBlockPreview({
    fields: "title",
    formatter: (val) => val || "{Block Title}",
  }),
});
```

### Creating an Object Schema

**File:** `src/sanity/schemas/objects/{objectName}.ts`

```typescript
import { FaFolder } from "react-icons/fa";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "{objectName}",
  title: "{Object Title}",
  icon: FaFolder,
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      title: "Label",
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: "description",
      type: "text",
      title: "Description",
    }),
    
    defineField({
      name: "icon",
      type: "string",
      title: "Icon Name",
      description: "Icon identifier (e.g., 'check', 'arrow')",
    }),
    
    // Can reference other objects
    defineField({
      name: "items",
      type: "array",
      title: "Sub Items",
      of: [{ type: "anotherObjectType" }],
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "description",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Untitled",
        subtitle: subtitle || "",
      };
    },
  },
});
```

### Creating a Document Schema

**File:** `src/sanity/schemas/documents/{documentName}.ts`

```typescript
import { FaUser } from "react-icons/fa";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "{documentName}",
  title: "{Document Title}",
  icon: FaUser,
  type: "document",
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
    
    defineField({
      name: "image",
      type: "adaptiveImage",
      title: "Image",
    }),
    
    defineField({
      name: "bio",
      type: "richText",
      title: "Bio",
    }),
    
    // Reference to another document
    defineField({
      name: "category",
      type: "reference",
      title: "Category",
      to: [{ type: "category" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});
```

## Registration

### Register Object Schemas

**File:** `src/sanity/schemas/index.ts`

```typescript
// Objects
import {objectName} from "./objects/{objectName}";

const schemas = [
  // ... existing schemas ...
  
  // Add to objects section
  {objectName},
];
```

### Register Block Schemas

**File:** `src/sanity/schemas/index.ts`

```typescript
// Blocks
import block{BlockName} from "./blocks/{blockName}";

const schemas = [
  // ... existing schemas ...
  
  // Add to blocks section
  block{BlockName},
];
```

**Also register in:** `src/utils/constants.ts`

```typescript
export const blocksTypes = [
  { type: "block.hero" },
  // ... existing blocks ...
  { type: "block.{blockName}" },
];
```

### Register Document Schemas

**File:** `src/sanity/schemas/index.ts`

```typescript
// Documents
import {documentName} from "./documents/{documentName}";

const schemas = [
  // ... existing schemas ...
  
  // Add to documents section
  {documentName},
];
```

## Field Validation Patterns

```typescript
// Required field
validation: (Rule) => Rule.required()

// String with min/max length
validation: (Rule) => Rule.required().min(3).max(100)

// Number with range
validation: (Rule) => Rule.required().min(0).max(100)

// Array with min/max items
validation: (Rule) => Rule.min(1).max(10)

// URL validation
validation: (Rule) => Rule.required().uri({
  scheme: ['http', 'https']
})

// Custom validation
validation: (Rule) => Rule.custom((value) => {
  if (!value || value.length < 3) {
    return 'Value must be at least 3 characters';
  }
  return true;
})

// Conditional validation
validation: (Rule) => Rule.custom((value, context) => {
  const parent = context.parent as any;
  if (parent?.requiresValue && !value) {
    return 'This field is required when X is enabled';
  }
  return true;
})
```

## Conditional Fields

```typescript
// Hide based on parent field
hidden: ({ parent }) => !parent?.showAdvanced

// Hide based on document
hidden: ({ document }) => document?._type !== 'specificType'

// Read-only based on condition
readOnly: ({ parent }) => parent?.isLocked
```

## Preview Configuration

```typescript
// Simple preview
preview: {
  select: {
    title: "title",
    subtitle: "caption",
  },
}

// With media
preview: {
  select: {
    title: "title",
    media: "image",
  },
}

// Custom prepare function
preview: {
  select: {
    title: "title",
    items: "items",
    theme: "theme.name",
  },
  prepare({ title, items, theme }) {
    return {
      title: title || "Untitled",
      subtitle: `${items?.length || 0} items • ${theme || 'dark'} theme`,
    };
  },
}

// Block preview (Flightdeck helper)
preview: formatBlockPreview({
  fields: "title",
  formatter: (val) => val || "Block Title",
})
```

## Icons

Common icons from `react-icons/fa`:

```typescript
import {
  FaAlignLeft,      // Text/content
  FaImage,          // Images
  FaTh,             // Grid/cards
  FaListUl,         // Lists
  FaColumns,        // Columns/layout
  FaVideo,          // Video
  FaNewspaper,      // Articles/news
  FaQuoteRight,     // Quotes/testimonials
  FaEnvelope,       // Contact/email
  FaUser,           // People/profiles
  FaFolder,         // Generic objects
  FaTags,           // Categories/tags
  FaHome,           // Hero/homepage
  FaInfoCircle,     // Info/about
  FaCog,            // Settings
} from "react-icons/fa";
```

## Common Patterns

### Tabs/Accordion Items

```typescript
// Create object schema first
// src/sanity/schemas/objects/tabItem.ts
export default defineType({
  name: "tabItem",
  title: "Tab",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      title: "Label",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      type: "richText",
      title: "Content",
    }),
  ],
  preview: {
    select: { title: "label" },
  },
});

// Reference in block schema
defineField({
  name: "tabs",
  type: "array",
  title: "Tabs",
  of: [{ type: "tabItem" }],
  validation: (Rule) => Rule.min(2).max(6),
})
```

### Cards with Multiple Variants

```typescript
// Option 1: Single object with conditional fields
defineField({
  name: "variant",
  type: "string",
  title: "Card Type",
  options: {
    list: [
      { title: "Image Card", value: "image" },
      { title: "Icon Card", value: "icon" },
      { title: "Text Card", value: "text" },
    ],
  },
  initialValue: "image",
}),
defineField({
  name: "image",
  type: "adaptiveImage",
  title: "Image",
  hidden: ({ parent }) => parent?.variant !== "image",
}),

// Option 2: Multiple object types in array
defineField({
  name: "cards",
  type: "array",
  title: "Cards",
  of: [
    { type: "imageCard" },
    { type: "iconCard" },
    { type: "textCard" },
  ],
})
```

## Best Practices

### ✅ DO

- Always create object schemas in separate files
- Use Flightdeck types (`richText`, `adaptiveImage`, `link`) when available
- Include `theme` field as first field in blocks
- Add helpful descriptions for complex fields
- Use validation to guide content editors
- Keep object schemas focused and reusable
- Use clear, descriptive field names
- Add preview configurations for better UX

### ❌ DON'T

- Define objects inline in block schemas (causes GraphQL errors)
- Use `any` type in TypeScript validation functions
- Create overly complex nested structures (flatten when possible)
- Forget to register schemas in `index.ts`
- Skip validation on required fields
- Use generic field names (e.g., "text1", "text2")

## Troubleshooting

**GraphQL deploy fails:**
- Check for inline object definitions
- Verify all object schemas are in separate files
- Look for circular references

**Field not appearing in CMS:**
- Check schema is registered in `index.ts`
- Verify field name doesn't conflict with reserved words
- Check for conditional `hidden` rules

**Validation errors:**
- Ensure validation functions return `true` or error string
- Check for TypeScript errors in validation logic
- Verify Rule chain is correct

**Preview not working:**
- Check field names in `select` match schema
- Verify media field points to image field
- Test `prepare` function logic

## Next Steps

After creating schema:
- Run `npm run typegen` to generate TypeScript types
- Test in Sanity Studio to verify fields appear correctly
- Create corresponding React component (if block)
- Add GROQ query fields (if block)
