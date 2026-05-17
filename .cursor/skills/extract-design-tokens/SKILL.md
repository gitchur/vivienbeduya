---
name: extract-design-tokens
description: Extract typography scales, colors, and spacing from Figma designs and integrate them into the project's design system
---

# Extract Design Tokens from Figma

Use this skill when you need to extract and integrate design tokens (typography, colors, spacing) from Figma designs into the codebase.

## When to Use

- User provides a Figma URL with design system or components
- Setting up typography scales for a new project
- Adding new colors or updating the color palette
- Extracting spacing system from designs
- Configuring Sanity rich text editor with typography options

## Prerequisites

**Figma MCP Server** must be configured. Check if available:

```bash
# List available MCP servers
cursor agent mcp list

# Check if Figma MCP is enabled
cursor agent mcp list-tools figma
```

If not configured, guide the user to set up the Figma MCP server in their Cursor settings.

---

## Step 1: Extract Design Tokens from Figma

### Using Figma MCP Tools

When the user provides a Figma URL, use the Figma MCP tools to extract:

1. **Typography scales** - Text styles with sizes, weights, line heights (BOTH desktop and mobile!)
2. **Color palette** - All colors used in the design
3. **Spacing system** - Padding, margin, and gap values
4. **Component structure** - Layout patterns and hierarchy

**Figma MCP tools:**
- `get_design_context` - Extract component structure and styles
- `get_variable_defs` - Get Figma variables (colors, typography, spacing)
- `get_screenshot` - Capture visual reference

### CRITICAL: Extract Both Desktop AND Mobile Typography

Figma designs typically define separate text styles for desktop and mobile. Look for naming patterns:

**Desktop styles:**
- `Display`, `Display Large`, `H1`, `H2`, `H3`, `H4`, `H5`, `H6`
- `P`, `P Big`, `P Small`, `Caption`, `Small`, `CTA`

**Mobile styles (look for these suffixes/prefixes):**
- `Display Mobile`, `MDisplay`, `Display-Mobile`
- `H1 Mobile`, `MH1`, `H1-Mobile`
- `H2 Mobile`, `MH2`, `H2-Mobile`
- `P Mobile`, `MP`, `P-Mobile`
- etc.

**You MUST extract BOTH and match them correctly!**

Example from Figma variable defs:
```json
{
  "Display": { "fontSize": "128px", "lineHeight": "0.9" },
  "Display Mobile": { "fontSize": "48px", "lineHeight": "1" },
  "H1": { "fontSize": "80px", "lineHeight": "0.9" },
  "H1 Mobile": { "fontSize": "40px", "lineHeight": "1" },
  "H2": { "fontSize": "64px", "lineHeight": "1" },
  "H2 Mobile": { "fontSize": "36px", "lineHeight": "1.1" }
}
```

---

## Step 2: Add Typography to globals.css

**File:** `src/app/globals.css`

### Process

1. **Extract desktop sizes from Figma** - Look for base text style names
2. **Extract mobile sizes from Figma** - Look for "Mobile", "M", or "-Mobile" suffix/prefix
3. **Match desktop to mobile** - Pair each desktop style with its mobile counterpart
4. **Convert to rwd/rwm** - Desktop uses `rwd`, mobile uses `rwm`

### Example: Extracting from Figma

**Figma text styles you'll see:**
```
Display        → 128px / 0.9 line height
Display Mobile → 48px / 1.0 line height

H1             → 80px / 0.9 line height  
H1 Mobile      → 40px / 1.0 line height

H2             → 64px / 1.0 line height
H2 Mobile      → 36px / 1.1 line height

P              → 16px / 1.5 line height
P Mobile       → 16px / 1.5 line height (sometimes same!)
```

### Typography Scale Template

Add typography classes using **exact values from Figma**:

```css
/* Desktop Typography - Extract exact sizes from Figma */
body .display {
  font-size: 128rwd;    /* From "Display" text style in Figma */
  line-height: 0.9;     /* From Figma line height */
}

body .h1,
body h1 {
  font-size: 80rwd;     /* From "H1" text style in Figma */
  line-height: 0.9;     /* From Figma line height */
}

body .h2,
body h2 {
  font-size: 64rwd;     /* From "H2" text style in Figma */
  line-height: 1;       /* From Figma line height */
}

body .h3,
body h3 {
  font-size: 48rwd;     /* From "H3" text style in Figma */
  line-height: 1.1;     /* From Figma line height */
}

body .h4,
body h4 {
  font-size: 32rwd;     /* From "H4" text style in Figma */
  line-height: 1.2;     /* From Figma line height */
}

body .h5,
body h5 {
  font-size: 24rwd;     /* From "H5" text style in Figma */
  line-height: 1.2;     /* From Figma line height */
}

body .h6,
body h6 {
  font-size: 20rwd;     /* From "H6" text style in Figma */
  line-height: 1.2;     /* From Figma line height */
}

body .p-big {
  font-size: 20rwd;     /* From "P Big" text style in Figma */
  line-height: 1.4;     /* From Figma line height */
}

body .p,
body p {
  font-size: 16rwd;     /* From "P" text style in Figma */
  line-height: 1.5;     /* From Figma line height */
}

body .p-small {
  font-size: 14rwd;     /* From "P Small" text style in Figma */
  line-height: 1.5;     /* From Figma line height */
}

body .caption {
  font-size: 12rwd;     /* From "Caption" text style in Figma */
  line-height: 1.4;     /* From Figma line height */
}

body .cta {
  font-size: 16rwd;     /* From "CTA" text style in Figma */
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Mobile Typography - Extract exact mobile sizes from Figma */
@media --base-down {
  body .display {
    font-size: 48rwm;   /* From "Display Mobile" text style in Figma */
    line-height: 1;     /* From Figma mobile line height */
  }

  body .h1,
  body h1 {
    font-size: 40rwm;   /* From "H1 Mobile" text style in Figma */
    line-height: 1;     /* From Figma mobile line height */
  }

  body .h2,
  body h2 {
    font-size: 36rwm;   /* From "H2 Mobile" text style in Figma */
    line-height: 1.1;   /* From Figma mobile line height */
  }

  body .h3,
  body h3 {
    font-size: 32rwm;   /* From "H3 Mobile" text style in Figma */
    line-height: 1.1;   /* From Figma mobile line height */
  }

  body .h4,
  body h4 {
    font-size: 24rwm;   /* From "H4 Mobile" text style in Figma */
    line-height: 1.2;   /* From Figma mobile line height */
  }

  body .h5,
  body h5 {
    font-size: 20rwm;   /* From "H5 Mobile" text style in Figma */
    line-height: 1.2;   /* From Figma mobile line height */
  }

  body .h6,
  body h6 {
    font-size: 18rwm;   /* From "H6 Mobile" text style in Figma */
    line-height: 1.2;   /* From Figma mobile line height */
  }

  body .p-big {
    font-size: 18rwm;   /* From "P Big Mobile" text style in Figma */
    line-height: 1.4;   /* From Figma mobile line height */
  }

  body .p,
  body p {
    font-size: 16rwm;   /* From "P Mobile" text style in Figma */
    line-height: 1.5;   /* From Figma mobile line height */
  }

  body .p-small {
    font-size: 14rwm;   /* From "P Small Mobile" text style in Figma */
    line-height: 1.5;   /* From Figma mobile line height */
  }

  body .caption {
    font-size: 12rwm;   /* From "Caption Mobile" text style in Figma */
    line-height: 1.4;   /* From Figma mobile line height */
  }

  body .cta {
    font-size: 14rwm;   /* From "CTA Mobile" text style in Figma */
  }
}

/* Font Weights - Extract from Figma */
body .h1,
body h1,
body .h2,
body h2,
body .h3,
body h3,
body .h4,
body h4,
body .h5,
body h5,
body .h6,
body h6 {
  font-weight: var(--font-weight-semi-bold);  /* From Figma font weight */
  line-height: 1.2;
}
```

**CRITICAL Rules:**
- Use `rwd` for desktop sizes
- Use `rwm` for mobile sizes  
- Extract EXACT px values from Figma for both desktop and mobile
- Match desktop styles to their mobile counterparts (H1 → H1 Mobile)
- Include line heights from Figma (they may differ between desktop/mobile!)
- Never approximate or calculate mobile sizes - use Figma's exact values

---

## Step 3: Add Color Variables to globals.css

**File:** `src/app/globals.css`

Add color variables to `:root`:

```css
:root {
  /* Primary Colors */
  --color-black: #000000;
  --color-white: #ffffff;
  --color-orange: #ee6326;
  
  /* Greys */
  --color-grey: #1c1c1c;
  --color-grey-light: #efefef;
  
  /* Opacity Variants - Use for overlays and effects */
  --color-white-50: #ffffff66;  /* 40% opacity */
  --color-grey-50: #1c1c1c66;   /* 40% opacity */
  
  /* Font Weights */
  --font-weight-regular: 300;
  --font-weight-semi-bold: 400;
  --font-weight-bold: 600;
  
  /* Layout - asymmetric: left and right use different values */
  --theme-page-left-padding: 80rwd;    /* Mobile: 24rwm (overridden via @media --base-down) */
  --theme-page-right-padding: 36rwd;   /* Mobile: 16rwm (overridden via @media --base-down) */
}

/* Add project-specific colors as extracted from Figma */
```

**Color naming conventions:**
- Use semantic names (`--color-primary`, `--color-secondary`)
- Include brand colors by name (`--color-orange`)
- Add opacity variants with suffix (`-50`, `-70`, etc.)
- Document the hex values in comments

---

## Step 4: Configure Typography in Flightdeck

**File:** `flightdeck.ts` (root of project)

Import and apply typography options:

```typescript
import { defineFlightdeckPlugin } from "@flight-digital/flightdeck";
import { defRichTextFields } from "./src/utils/constants";

export default defineFlightdeckPlugin({
  overwrites: {
    heading: { ...defRichTextFields },
    richText: { ...defRichTextFields },
  },
});
```

This makes typography classes available in Sanity's rich text editor.

---

## Step 5: Define Typography Options in Constants

**File:** `src/utils/constants.ts`

Add the typography configuration:

```typescript
export const defRichTextFields = {
  overwriteTextSizeOptions(current: any) {
    return [
      { title: "Display Large", value: "display-lg" },
      { title: "Display", value: "display" },
      ...current,  // Keep default options (h1-h6, p)
      { title: "Big Paragraph", value: "p-big" },
      { title: "Small Paragraph", value: "p-small" },
      { title: "Caption", value: "caption" },
      { title: "Small", value: "small" },
      { title: "CTA", value: "cta" },
    ];
  },
};
```

**Important:**
- The `value` must match the CSS class name (without the dot)
- The `title` is what content editors see in Sanity Studio
- Keep the `...current` spread to preserve default h1-h6, p options
- Add only the custom typography scales you defined in globals.css

---

## Step 6: Verify in Sanity Studio

1. Start the dev server: `npm run dev`
2. Open Sanity Studio: `http://localhost:3000/admin`
3. Create or edit content with rich text
4. Check that all typography options appear in the text size dropdown
5. Verify the styles render correctly in preview

---

## Conversion Guidelines

### Font Sizes from Figma

**Extract BOTH desktop and mobile values from Figma:**

| Desktop Style | Desktop Size | Mobile Style | Mobile Size | CSS Class |
|---------------|--------------|--------------|-------------|-----------|
| Display       | 128px → 128rwd | Display Mobile | 48px → 48rwm | .display |
| H1            | 80px → 80rwd | H1 Mobile | 40px → 40rwm | .h1 |
| H2            | 64px → 64rwd | H2 Mobile | 36px → 36rwm | .h2 |
| H3            | 48px → 48rwd | H3 Mobile | 32px → 32rwm | .h3 |
| H4            | 32px → 32rwd | H4 Mobile | 24px → 24rwm | .h4 |
| H5            | 24px → 24rwd | H5 Mobile | 20px → 20rwm | .h5 |
| H6            | 20px → 20rwd | H6 Mobile | 18px → 18rwm | .h6 |
| P             | 16px → 16rwd | P Mobile | 16px → 16rwm | .p |
| P Small       | 14px → 14rwd | P Small Mobile | 14px → 14rwm | .p-small |
| Caption       | 12px → 12rwd | Caption Mobile | 12px → 12rwm | .caption |

**Mobile naming patterns to look for:**
- `{Style} Mobile` (e.g., "H1 Mobile", "Display Mobile")
- `M{Style}` (e.g., "MH1", "MDisplay")
- `{Style}-Mobile` (e.g., "H1-Mobile", "Display-Mobile")
- `Mobile/{Style}` (e.g., "Mobile/H1")

**Important:**
- ❌ DON'T calculate mobile sizes (e.g., desktop × 0.5)
- ✅ DO extract exact mobile values from Figma text styles
- ❌ DON'T assume mobile and desktop line heights are the same
- ✅ DO check each mobile style for its specific line height

### Colors from Figma

**Extract exact hex values:**

```css
/* From Figma color styles */
--color-primary: #ee6326;      /* Orange from design */
--color-secondary: #1c1c1c;    /* Dark grey */
--color-accent: #00ff00;       /* Brand accent */

/* Create semantic aliases */
--color-text-primary: var(--color-black);
--color-text-secondary: var(--color-grey);
--color-background: var(--color-white);
```

### Line Heights from Figma

**Figma shows line heights in:**
- Pixels (e.g., `24px`) → Calculate ratio: `24px / 16px = 1.5`
- Percentage (e.g., `150%`) → Divide by 100: `150% → 1.5`
- Unitless (e.g., `1.5`) → Use directly

**Use unitless values in CSS:**

```css
body .p {
  font-size: 16rwd;
  line-height: 1.5;  /* Not 1.5rwd or 1.5px */
}
```

---

## Best Practices

### ✅ DO

- Extract BOTH desktop AND mobile text styles from Figma
- Use EXACT pixel values from Figma design tokens
- Match each desktop style to its mobile counterpart (H1 → H1 Mobile)
- Look for mobile naming patterns: "Mobile", "M", "-Mobile" suffix/prefix
- Convert desktop px to `rwd` and mobile px to `rwm`
- Extract line heights for both desktop and mobile (they may differ!)
- Use responsive units (`rwd`/`rwm`) for all font sizes
- Create CSS variables for all colors
- Test typography at both desktop and mobile viewports
- Document where each token came from (Figma file/frame)

### ❌ DON'T

- Calculate or approximate mobile sizes (e.g., desktop × 0.5)
- Assume mobile sizes are proportional to desktop
- Use arbitrary values not in Figma
- Skip extracting mobile-specific text styles
- Mix `px` with `rwd`/`rwm` units
- Hardcode colors in components
- Forget to add new classes to `defRichTextFields`
- Use fixed line heights in pixels
- Assume desktop and mobile line heights are the same

---

## Troubleshooting

**Can't find mobile text styles in Figma:**
- Look for naming patterns: "Mobile", "M-", "-Mobile", "Mobile/"
- Check Figma's text styles panel (may be in separate section)
- Ask user if mobile styles exist in their Figma file
- Some projects may use same sizes for mobile/desktop (body text often does)
- If no mobile styles exist, ask user before approximating

**Mobile sizes don't match design:**
- Verify you extracted from "{Style} Mobile" not "{Style}" 
- Check you're using `rwm` units in `@media --base-down`, not `rwd`
- Confirm line heights are from mobile styles, not desktop
- Test at exactly 375px viewport width

**Typography not showing in Sanity:**
- Check `flightdeck.ts` imports `defRichTextFields`
- Verify class names match between `globals.css` and `constants.ts`
- Restart dev server after changes to `flightdeck.ts`

**Colors not working:**
- Ensure variables are defined in `:root`
- Use `var(--color-name)` syntax in components
- Check for typos in variable names

**Figma MCP not available:**
- User needs to configure Figma MCP server
- Guide them to Cursor settings > MCP configuration
- Provide link to Figma MCP documentation

---

## Related Skills

- **style-with-linaria** - Using design tokens in components
- **convert-figma-to-code** - Converting Figma designs to code
- **create-block** - Creating blocks that use typography classes

---

## Example: Complete Workflow

```bash
# 1. User provides Figma URL
# You: Use get_variable_defs to extract design tokens

# 2. Extract typography (CRITICAL STEP)
# From Figma variable defs, identify:
# - Desktop styles: Display, H1, H2, H3, H4, H5, H6, P, P Big, P Small, Caption, CTA
# - Mobile styles: Display Mobile, H1 Mobile, H2 Mobile, etc.
# - Match each desktop style to its mobile counterpart

# Example extraction:
# Display: 128px / 0.9 → 128rwd / 0.9
# Display Mobile: 48px / 1.0 → 48rwm / 1.0
# H1: 80px / 0.9 → 80rwd / 0.9
# H1 Mobile: 40px / 1.0 → 40rwm / 1.0

# 3. Add typography to globals.css
# - Add desktop styles with rwd units
# - Add @media --base-down with mobile styles using rwm units
# - Use EXACT values from Figma, never approximate

# 4. Add colors to globals.css
# - Extract all colors from Figma
# - Create CSS variables in :root
# - Add opacity variants if needed

# 5. Configure flightdeck.ts
# - Import defRichTextFields
# - Apply to heading and richText

# 6. Update constants.ts
# - Add all typography options
# - Match class names to globals.css

# 7. Test in Sanity Studio
# - Verify dropdown shows all options
# - Test text rendering with each class at desktop viewport
# - Test text rendering at mobile viewport (375px)
# - Confirm sizes match Figma design
```

---

## Notes

- This skill focuses on **base design tokens** (typography, colors, spacing)
- For **component-specific styles**, use the `style-with-linaria` skill
- For **converting entire Figma components**, use the `convert-figma-to-code` skill
- Design tokens should be extracted **once at project setup** and updated when the design system changes
