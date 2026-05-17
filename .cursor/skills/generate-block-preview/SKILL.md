---
name: generate-block-preview
description: Generate preview images for Sanity block picker using component-to-image.js tool.
---

# Generate Block Preview

Generate PNG preview images from Tailwind HTML components for Sanity Studio block picker.

## When to Use

- Creating preview images for new blocks
- Generating thumbnails for Sanity Studio block selection
- Converting Figma MCP output to preview images
- Updating block preview images after design changes

## Prerequisites

**Puppeteer must be installed:**

```bash
npm install puppeteer --save-dev
```

Puppeteer provides a headless Chrome browser for rendering HTML to images.

## Tool Location

**Script:** `.cursor/skills/generate-block-preview/scripts/component-to-image.js`

**Purpose:** Automatically renders Tailwind HTML to PNG images without manual screenshots.

**Note:** This script is included in this skill folder and will be available in your project after copying the skills.

## Step-by-Step Instructions

### Step 1: Prepare HTML Component

The tool accepts Tailwind HTML (typically from Figma MCP `get_design_context`).

**Save to temporary file:**

```bash
# Save Figma MCP output to a file
# Example: .flight/figma-newsletter.html
```

**HTML format:**
- Just the component markup
- No full HTML document needed (tool adds required structure)
- Keep Tailwind classes intact

**Example HTML:**

```html
<div class="bg-[#1c1c1c] flex h-[292px] items-center p-[40px] rounded-[8px]">
  <div class="flex flex-col gap-[24px]">
    <p class="text-[#ee6326] text-[14px] tracking-[0.7px] uppercase">
      Stay updated
    </p>
    <p class="text-[48px] text-white leading-none">
      Newsletter Signup
    </p>
  </div>
</div>
```

### Step 2: Generate Preview Image

**Basic usage:**

```bash
node .cursor/skills/generate-block-preview/scripts/component-to-image.js INPUT_FILE OUTPUT_PATH
```

**Example:**

```bash
node .cursor/skills/generate-block-preview/scripts/component-to-image.js .flight/figma-newsletter.html src/sanity/assets/block-newsletter.png
```

**What happens:**
1. Tool reads HTML file
2. Renders in headless Chrome with Tailwind CDN
3. Takes screenshot of component
4. Saves PNG to specified path
5. Creates directories if needed

### Step 3: Advanced Options

**Custom viewport and background:**

```bash
node .cursor/skills/generate-block-preview/scripts/component-to-image.js hero.html src/sanity/assets/block-hero.png \
  --width 1920 \
  --height 1080 \
  --bg "#1c1c1c" \
  --padding 80px
```

**Available options:**

- `--width <px>` - Viewport width (default: 1400)
- `--height <px>` - Viewport height (default: 900)
- `--bg <color>` - Background color (default: #000000)
- `--padding <px>` - Body padding (default: 40px)

**Examples for different block types:**

```bash
# Full-width hero block
node .cursor/skills/generate-block-preview/scripts/component-to-image.js hero.html block-hero.png \
  --width 1920 --bg "#000000"

# Card-based block
node .cursor/skills/generate-block-preview/scripts/component-to-image.js cards.html block-cards.png \
  --width 1400 --padding 60px

# Light theme block
node .cursor/skills/generate-block-preview/scripts/component-to-image.js features.html block-features.png \
  --bg "#ffffff"
```

### Step 4: Register Preview Image

**File:** `src/sanity/assets/images.ts`

Import and export the generated image:

```typescript
import blockHero from "./block-hero.png";
import blockNewsletter from "./block-newsletter.png";  // Add new image

const images = {
  blockHero,
  blockNewsletter,  // Add to exports
};

export default images;
```

### Step 5: Use in Sanity Schema

Reference the image in your block schema:

**File:** `src/sanity/schemas/blocks/{blockName}.ts`

```typescript
import images from "@/sanity/assets/images";
import { defineBlock, formatBlockPreview } from "@flight-digital/sanity-plugin-flightdeck";
import { FaIcon } from "react-icons/fa";

export default defineBlock({
  name: "newsletter",
  title: "Newsletter Signup",
  icon: FaIcon,
  image: images.blockNewsletter.src,  // ← Preview shown in block picker
  disableDefaultPadding: true,
  fields: [
    // ... your fields
  ],
  preview: formatBlockPreview({
    fields: "title",
    formatter: (val) => val || "Newsletter Signup",
  }),
});
```

### Step 6: Verify in Sanity Studio

1. Start dev server: `npm run dev`
2. Open Sanity Studio: `http://localhost:3000/admin`
3. Edit a page
4. Click "Add block" button
5. **Verify:** Your block shows the preview image

## Common Use Cases

### From Figma MCP Output

**Workflow:**

1. Use Figma MCP `get_design_context` to extract component
2. Save Tailwind HTML to file
3. Generate preview with component-to-image
4. Use preview in Sanity schema

```bash
# After getting Figma MCP output
node .flight/component-to-image.js figma-output.html src/sanity/assets/block-myblock.png
```

### Batch Generate Multiple Previews

```bash
# Generate previews for multiple blocks
node .cursor/skills/generate-block-preview/scripts/component-to-image.js hero.html src/sanity/assets/block-hero.png
node .cursor/skills/generate-block-preview/scripts/component-to-image.js newsletter.html src/sanity/assets/block-newsletter.png
node .cursor/skills/generate-block-preview/scripts/component-to-image.js carousel.html src/sanity/assets/block-carousel.png
```

### Update Existing Preview

```bash
# Regenerate preview after design changes
node .cursor/skills/generate-block-preview/scripts/component-to-image.js updated-design.html src/sanity/assets/block-newsletter.png
```

## File Naming Convention

**Pattern:** `block-{blockName}.png`

**Examples:**
- `block-hero.png` - Hero block
- `block-newsletter.png` - Newsletter signup
- `block-card-carousel.png` - Card carousel
- `block-cta-tabs.png` - CTA with tabs

**Benefits of consistent naming:**
- Easy to find preview files
- Matches block schema names
- Clear purpose in file browser

## Troubleshooting

### Puppeteer Not Installed

**Error:** `Cannot find module 'puppeteer'`

**Solution:**

```bash
npm install puppeteer --save-dev
```

### HTML File Not Found

**Error:** `ENOENT: no such file or directory`

**Solution:**
- Check file path is correct
- Use relative or absolute paths
- Verify file exists: `ls .flight/your-file.html`

### Output Directory Doesn't Exist

**No error** - Tool creates directories automatically

But if issues persist:

```bash
# Manually create directory
mkdir -p src/sanity/assets
```

### Preview Image Too Small/Large

**Solution:** Adjust viewport size

```bash
# Larger preview
node .cursor/skills/generate-block-preview/scripts/component-to-image.js input.html output.png --width 1920 --height 1080

# Smaller preview
node .cursor/skills/generate-block-preview/scripts/component-to-image.js input.html output.png --width 1200 --height 800
```

### Background Color Wrong

**Solution:** Specify background

```bash
# Dark background
node .cursor/skills/generate-block-preview/scripts/component-to-image.js input.html output.png --bg "#000000"

# Light background
node .cursor/skills/generate-block-preview/scripts/component-to-image.js input.html output.png --bg "#ffffff"

# Custom color
node .cursor/skills/generate-block-preview/scripts/component-to-image.js input.html output.png --bg "#1c1c1c"
```

### Tailwind Styles Not Working

**Cause:** Tool uses Tailwind CDN automatically

**If custom Tailwind config needed:**
- Modify `.cursor/skills/generate-block-preview/scripts/component-to-image.js`
- Add your Tailwind config inline
- Or include custom CSS in HTML file

### Component Cutoff in Preview

**Solution:** Adjust padding or viewport

```bash
# More padding around component
node .cursor/skills/generate-block-preview/scripts/component-to-image.js input.html output.png --padding 80px

# Larger viewport
node .cursor/skills/generate-block-preview/scripts/component-to-image.js input.html output.png --width 1600 --height 1000
```

## Best Practices

### ✅ DO

- Generate previews for all blocks
- Use consistent naming (`block-{name}.png`)
- Test previews in Sanity Studio
- Update previews when design changes
- Use appropriate viewport sizes for block type
- Keep preview images under 500KB

### ❌ DON'T

- Skip preview generation (poor editor experience)
- Use screenshots instead of automated tool
- Hardcode localhost URLs in HTML
- Use extremely large viewport sizes (slow rendering)
- Forget to register image in `images.ts`

## Integration with Other Skills

**→ Use with convert-figma-to-code skill:**
- Extract Tailwind from Figma MCP
- Generate preview image
- Convert to Linaria component

**→ Use with create-block skill:**
- Generate preview during block creation
- Register in schema
- Validate in Sanity Studio

**→ Use with create-sanity-schema skill:**
- Reference preview image in block schema
- Improves content editor experience

## Checklist

- [ ] Puppeteer is installed (`npm install puppeteer --save-dev`)
- [ ] HTML file prepared with Tailwind classes
- [ ] Generated preview image with component-to-image.js
- [ ] Preview saved to `src/sanity/assets/`
- [ ] Image registered in `images.ts`
- [ ] Image referenced in block schema with `image:` field
- [ ] Tested preview appears in Sanity Studio block picker
- [ ] Preview accurately represents block design
- [ ] Image file size is reasonable (<500KB)

## Example Complete Workflow

```bash
# 1. Save Figma MCP output
cat > .flight/figma-newsletter.html << 'EOF'
<div class="bg-[#1c1c1c] flex p-[40px] rounded-[8px]">
  <p class="text-white">Newsletter Signup</p>
</div>
EOF

# 2. Generate preview
node .cursor/skills/generate-block-preview/scripts/component-to-image.js \
  .flight/figma-newsletter.html \
  src/sanity/assets/block-newsletter.png \
  --bg "#000000"

# 3. Register in images.ts
# (add import and export manually)

# 4. Use in schema
# (add image: images.blockNewsletter.src to defineBlock)

# 5. Test in Sanity Studio
npm run dev
```

## Next Steps

After generating preview:
- → Use **create-block** skill to complete block setup
- → Use **create-sanity-schema** skill to create schema
- Test preview in Sanity Studio
- Verify preview matches design
- Update preview if design changes
