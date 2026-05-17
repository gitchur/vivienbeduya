---
name: convert-figma-to-code
description: Convert Figma designs to Linaria components using Figma MCP tools. Handles design extraction, Tailwind to Linaria conversion, and preview generation.
---

# Convert Figma to Code

Complete workflow for converting Figma designs into production-ready Linaria components.

## When to Use

- User provides a Figma URL for implementation
- Converting a Figma component to a block
- Extracting design tokens (colors, typography, spacing) from Figma
- Creating preview images for Sanity block picker
- Validating implementation against design

## Prerequisites

**Required Tools:**
- Figma MCP server configured in Cursor
- Puppeteer installed: `npm install puppeteer --save-dev` (for preview generation)

**Ask the user for:**
- Figma URL or node ID
- Whether this is for a new block or existing component
- Any specific requirements or constraints

## Related Skills

- **extract-design-tokens** - Extract base typography/colors from Figma (do this first!)
- **style-with-linaria** - For Linaria styling patterns
- **create-block** - If creating a new block
- **create-sanity-schema** - For block schema definition
- **generate-block-preview** - For creating preview images

## Workflow Overview

1. Extract design from Figma (MCP tools)
2. Generate preview image (automated)
3. Extract design tokens
4. Convert Tailwind to Linaria
5. Validate implementation

## Step 1: Extract from Figma

Use Figma MCP tools to extract the component:

```bash
# 1. get_design_context → Tailwind component code (HTML)
# 2. get_screenshot → Visual reference PNG
# 3. get_variable_defs → Design tokens (colors, typography, spacing)
```

**Figma URL format:**
```
https://figma.com/design/FILE_KEY/FILENAME?node-id=1-2
                                           ^^^^^^^^^^
                                           Extract node-id: "1:2"
```

**For branches:**
```
https://figma.com/design/FILE_KEY/branch/BRANCH_KEY/FILENAME
                                  ^^^^^^^^^^^^^^^^^^^^
                                  Use branch key as file key
```

### Extract Design Context

Call Figma MCP `get_design_context` with node ID:
- Returns React component with Tailwind classes
- Includes exact measurements and styles from Figma
- This is your source of truth for conversion

### Extract Screenshot

Call Figma MCP `get_screenshot` with node ID:
- Returns visual reference image
- Use for validation after implementation
- Compare your Linaria version against this

### Extract Design Tokens

Call Figma MCP `get_variable_defs` with node ID:
- Returns colors, typography, spacing values
- Add new values to `src/app/globals.css`
- Update CSS variables if needed

## Step 2: Generate Preview Image

→ **Use the `generate-block-preview` skill** for complete preview generation workflow.

**Quick reference:**

The tool is located at `.cursor/skills/generate-block-preview/scripts/component-to-image.js`

### Save Figma Component HTML

1. Copy the Tailwind HTML from `get_design_context`
2. Save to temporary file (e.g., `.flight/figma-newsletter.html`)
3. Just the component markup, no full HTML document needed

### Generate Preview

→ See **generate-block-preview** skill for detailed instructions.

Quick example:

```bash
node .cursor/skills/generate-block-preview/scripts/component-to-image.js \
  .flight/figma-newsletter.html \
  src/sanity/assets/block-newsletter.png
```

### Register Preview Image

→ See **generate-block-preview** skill for registration steps.

## Step 3: Extract Design Values

### Analyze Figma Output

From the Tailwind HTML, extract:

**Colors:**
```
bg-[#1c1c1c]  → var(--color-grey)
text-[#ee6326] → var(--color-orange)
text-white     → var(--color-white)
```

**Spacing:**
```
p-[40px]    → 40rwd (desktop), 24rwm (mobile)
gap-[32px]  → 32rwd (desktop), 24rwm (mobile)
h-[292px]   → min-height: 292rwd
```

**Typography:**
```
text-[14px] tracking-[0.7px] uppercase → .caption class
text-[16px]                            → .p class
text-[20px] leading-[1.2]              → .p-big class
text-[48px] leading-none               → .h3 class
text-[64px]                            → .h2 class
```

**⚠️ CRITICAL:**
```
width-[1130px] → IGNORE - use width: 100% instead
max-w-[1200px] → IGNORE - use responsive width approach
```

## Step 4: Convert Tailwind to Linaria

### Tailwind Class Reference

**Layout:**
```typescript
"flex"              → display: flex;
"flex-col"          → flex-direction: column;
"grid"              → display: grid;
"items-center"      → align-items: center;
"justify-between"   → justify-content: space-between;
"gap-[32px]"        → gap: 32rwd;
```

**Sizing (⚠️ Ignore widths from Figma):**
```typescript
"w-[672px]"         → width: 100%; /* NOT max-width */
"h-[424px]"         → min-height: 424rwd;
"w-full"            → width: 100%;
"h-full"            → height: 100%;
```

**Spacing:**
```typescript
"p-[40px]"          → padding: 40rwd;
"px-[40px]"         → padding-left: 40rwd; padding-right: 40rwd;
"py-[128px]"        → padding-top: 128rwd; padding-bottom: 128rwd;
"m-[24px]"          → margin: 24rwd;
```

**Typography (use classes):**
```typescript
"text-[14px]"       → className="caption"
"text-[16px]"       → className="p"
"text-[20px]"       → className="p-big"
"text-[48px]"       → className="h3"
"leading-none"      → line-height: 1;
"uppercase"         → text-transform: uppercase;
```

**Colors (use variables):**
```typescript
"bg-[#1c1c1c]"      → background-color: var(--color-grey);
"text-[#ee6326]"    → color: var(--color-orange);
"border-white"      → border-color: var(--color-white);
```

### Conversion Example

**Before (Tailwind from Figma):**

```tsx
<div className="bg-[#1c1c1c] flex h-[292px] items-center justify-between p-[40px] rounded-[8px] w-[1130px]">
  <div className="flex flex-col gap-[24px] items-start">
    <p className="text-[#ee6326] text-[14px] tracking-[0.7px] uppercase">
      Stay updated
    </p>
    <p className="text-[48px] text-white leading-none">
      Newsletter
    </p>
  </div>
</div>
```

**After (Linaria):**

```tsx
import { styled } from "@linaria/react";

export const Newsletter = ({ data }: Props): React.JSX.Element | null => {
  if (!data) return null;

  return (
    <Wrapper>
      <ContentColumn>
        <Label className="caption">Stay updated</Label>
        <Heading className="h3">Newsletter</Heading>
      </ContentColumn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-grey);
  border-radius: 8px;
  padding: 40rwd;
  width: 100%;
  /* NOTE: Ignored max-width from Figma */
  min-height: 292rwd;
  
  @media --base-down {
    flex-direction: column;
    padding: 24rwm;
    min-height: auto;
  }
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24rwd;
  
  @media --base-down {
    gap: 16rwm;
  }
`;

const Label = styled.p`
  /* .caption class handles font-size, line-height */
  color: var(--color-orange);
  text-transform: uppercase;
  letter-spacing: 0.7px;
`;

const Heading = styled.h2`
  /* .h3 class handles font-size (48rwd), line-height */
  color: var(--color-white);
`;
```

## Step 5: Validate Implementation

### Compare Against Preview

1. Open generated preview: `src/sanity/assets/block-newsletter.png`
2. Open your implementation in browser
3. Use dev tools to compare:
   - Spacing (padding, margins, gaps)
   - Colors and backgrounds
   - Typography sizes
   - Layout and alignment
4. Adjust until they match

### Common Discrepancies

**Box Model Issues:**
- Ensure `box-sizing: border-box` is consistent
- Check padding is included in width calculations

**Unit Differences:**
- Figma uses `px`, you're using `rwd`/`rwm`
- Check scaling at different viewport sizes

**Typography:**
- Verify typography classes match Figma font sizes
- Check line-height values

**Layout:**
- Test flexbox behavior with different content lengths
- Verify responsive behavior on mobile

## Design Tokens Integration

### Add New Typography

If Figma uses new font sizes, add to `src/app/globals.css`:

```css
/* Desktop */
body .new-size {
  font-size: 22rwd;
  line-height: 1.3;
}

/* Mobile */
@media --base-down {
  body .new-size {
    font-size: 20rwm;
  }
}
```

Update Sanity config in `src/utils/constants.ts`:

```typescript
export const defRichTextFields = {
  overwriteTextSizeOptions(current: any) {
    return [
      ...current,
      { title: "New Size", value: "new-size" },
    ];
  },
};
```

### Add New Colors

If Figma uses new colors, add to CSS variables:

```css
:root {
  --color-new-blue: #0066cc;
  --color-new-blue-50: #0066cc66;
}
```

## Common Pitfalls

### ❌ Using Fixed Widths from Figma

```css
/* WRONG */
max-width: 1130rwd;

/* CORRECT */
width: 100%;
/* Let content flow with padding */
```

### ❌ Not Converting Units

```css
/* WRONG */
padding: 40px;
font-size: 16px;

/* CORRECT */
padding: 40rwd;
/* Use typography classes for font-size */
```

### ❌ Duplicating Typography

```css
/* WRONG */
const Title = styled.h2`
  font-size: 48rwd;
  line-height: 1.1;
  font-weight: 600;
`;

/* CORRECT */
const Title = styled.h2`
  /* Only non-typography styles */
  color: var(--color-white);
`;
<Title className="h3">Text</Title>
```

### ❌ Not Adding Mobile Styles

```css
/* WRONG - Only desktop */
padding: 40rwd;
gap: 32rwd;

/* CORRECT - Desktop + mobile */
padding: 40rwd;
gap: 32rwd;

@media --base-down {
  padding: 24rwm;
  gap: 24rwm;
}
```

### ❌ Hardcoding Colors

```css
/* WRONG */
background: #1c1c1c;
color: #ee6326;

/* CORRECT */
background: var(--color-grey);
color: var(--color-orange);
```

## Checklist

- [ ] Extracted Tailwind component from Figma MCP
- [ ] Generated preview image with component-to-image tool
- [ ] Registered preview image in `images.ts`
- [ ] Extracted and documented design tokens
- [ ] Added new colors to CSS variables (if any)
- [ ] Added new typography classes (if any)
- [ ] Converted Tailwind classes to Linaria
- [ ] Used `rwd` for desktop, `rwm` for mobile
- [ ] Ignored max-width from Figma
- [ ] Applied typography via `className`
- [ ] Used CSS variables for colors
- [ ] Added responsive mobile styles
- [ ] Validated against generated preview
- [ ] Tested at multiple viewport sizes

## Troubleshooting

**Preview generation fails:**
- → See **generate-block-preview** skill for troubleshooting

**Styles don't match Figma:**
- Compare exact pixel values from Tailwind output
- Check box-sizing is consistent
- Verify all units are converted (`px` → `rwd`)
- Look for missing mobile styles

**Colors are wrong:**
- Check CSS variable names match
- Verify new colors added to `:root`

**Layout breaks on mobile:**
- Add `@media --base-down` styles
- Change flex-direction to column
- Reduce padding and gaps with `rwm` units

**Typography size is off:**
- Verify correct typography class is used
- Check global typography definitions
- Ensure not duplicating font-size in styled component

## Best Practices

### ✅ DO

- → Use **generate-block-preview** skill for preview images
- Extract exact measurements from Figma Tailwind output
- Convert all `px` units to `rwd`/`rwm`
- Use CSS variables for all colors
- Apply typography via `className`
- Ignore width/max-width from Figma
- Add mobile responsive styles
- Validate against generated preview
- → Reference **style-with-linaria** for styling patterns

### ❌ DON'T

- Skip preview image generation
- Use hardcoded pixel values
- Use hardcoded colors
- Apply max-width from Figma
- Duplicate typography styles
- Forget mobile styles
- Assume Tailwind classes work in Linaria (they don't)

## Example: Complete Conversion

See `src/components/blocks/newsletterSignup.tsx` for full implementation showing:
- ✅ Tailwind to Linaria conversion
- ✅ Typography classes via `className`
- ✅ CSS variables for colors
- ✅ Responsive units (`rwd`/`rwm`)
- ✅ Mobile-first responsive design
- ✅ No fixed max-widths

## Next Steps

After conversion:
- → Use **create-block** skill to complete block setup
- → Use **create-sanity-schema** skill to create schema
- Test with real content in Sanity Studio
- Verify responsive behavior
- Compare against Figma screenshot
