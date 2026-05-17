---
name: style-with-linaria
description: Styling conventions for Linaria CSS-in-JS including responsive design, typography, and build-time compilation constraints.
---

# Style with Linaria

Comprehensive guide for styling components using Linaria zero-runtime CSS-in-JS.

## When to Use

- Styling React components with Linaria
- Implementing responsive designs with rwd/rwm units
- Converting designs to styled components
- Troubleshooting Linaria build-time compilation issues

## Critical Understanding: Linaria is NOT Styled-Components

**Linaria compiles at BUILD TIME, not RUNTIME.**

This means:
- ✅ Can use per-property variables: `cursor: ${(props) => (props.$clickable ? "pointer" : "default")};`
- ❌ Cannot execute function bodies outside variable declarations
- ❌ Cannot call external functions in styles
- All style logic must be compile-time compatible

## Basic Usage

### Import and Define

```typescript
import { styled } from "@linaria/react";

const Button = styled.button`
  padding: 12rwd 24rwd;
  border-radius: 4px;
  background: var(--color-orange);
  color: var(--color-white);
  
  &:hover {
    opacity: 0.9;
  }
  
  @media --base-down {
    padding: 10rwm 20rwm;
  }
`;
```

## Responsive Units

### Desktop: `rwd` (Responsive Width Desktop)

```css
/* Scales with viewport on desktop (min-width: 768px) */
padding: 64rwd;
font-size: 20rwd;
margin-bottom: 32rwd;
gap: 16rwd;
```

### Mobile: `rwm` (Responsive Width Mobile)

```css
/* Scales with viewport on mobile (max-width: 767px) */
@media --base-down {
  padding: 48rwm;
  font-size: 18rwm;
  margin-bottom: 24rwm;
  gap: 12rwm;
}
```

### Media Queries

```css
/* Mobile and below (max-width: 767px) */
@media --base-down {
  flex-direction: column;
}

/* Desktop and above (min-width: 768px) */
@media --base-up {
  display: grid;
}
```

## CSS Variables

### Colors

```css
/* Use CSS variables, never hardcoded colors */
background-color: var(--color-black);
color: var(--color-white);
border-color: var(--color-orange);

/* Available colors: */
--color-black: #000000;
--color-white: #ffffff;
--color-orange: #ee6326;
--color-grey: #1c1c1c;
--color-grey-light: #efefef;
--color-white-50: #ffffff66;
--color-grey-50: #1c1c1c66;
```

### Layout

```css
/* Asymmetric horizontal padding (left/right differ) */
padding-left: var(--theme-page-left-padding);
padding-right: var(--theme-page-right-padding);

/* Font weights */
font-weight: var(--font-weight-regular);    /* 300 */
font-weight: var(--font-weight-semi-bold);  /* 400 */
font-weight: var(--font-weight-bold);       /* 600 */
```

## Typography

### Typography Classes

**Always use global typography classes via `className`:**

```typescript
// ✅ CORRECT
const Title = styled.h2`
  margin-bottom: 24rwd;
  color: var(--color-white);
`;

// In JSX:
<Title className="h2">{title}</Title>
```

**Available classes:**
- `.display-lg`, `.display` - Display text
- `.h1` - `.h6` - Headings
- `.p-big`, `.p`, `.p-small` - Paragraphs
- `.caption`, `.small` - Small text
- `.cta` - Call to action (bold, uppercase)

### ❌ Don't Duplicate Typography

```typescript
// ❌ WRONG - Duplicates what .h3 class does
const Heading = styled.h3`
  font-size: 48rwd;
  line-height: 1.1;
  font-weight: var(--font-weight-semi-bold);
`;

// ✅ CORRECT - Only add non-typography styles
const Heading = styled.h3`
  color: var(--color-white);
  margin-bottom: 24rwd;
`;
<Heading className="h3">Title</Heading>
```

## Dynamic Styles

### Per-Property Variables (Build-Time Compatible)

```typescript
interface ButtonProps {
  $variant?: "primary" | "secondary";
  $disabled?: boolean;
  $size?: "small" | "large";
}

const Button = styled.button<ButtonProps>`
  /* ✅ CORRECT: Simple ternary per property */
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  background: ${(props) => 
    props.$variant === "primary" 
      ? "var(--color-orange)" 
      : "var(--color-black)"
  };
  padding: ${(props) => (props.$size === "large" ? "16rwd 32rwd" : "12rwd 24rwd")};
  
  /* Can chain conditions */
  color: ${(props) =>
    props.$variant === "primary"
      ? "var(--color-white)"
      : props.$disabled
      ? "var(--color-grey)"
      : "var(--color-white)"
  };
`;
```

### ❌ What Doesn't Work

```typescript
// ❌ WRONG: Function body execution
const BadButton = styled.button<ButtonProps>`
  ${(props) => {
    if (props.$variant === "primary") {
      return `
        background: var(--color-orange);
        color: white;
      `;
    }
    return `background: var(--color-black);`;
  }}
`;

// ❌ WRONG: External function calls
const calculatePadding = (size: string) => size === "large" ? "24px" : "12px";

const WrongButton = styled.button<{ $size: string }>`
  padding: ${(props) => calculatePadding(props.$size)};
`;

// ❌ WRONG: Complex logic blocks
const WrongButton = styled.button<ButtonProps>`
  ${(props) => {
    let styles = `background: var(--color-black);`;
    if (props.$variant === "primary") {
      styles += `color: white;`;
    }
    return styles;
  }}
`;
```

### CSS Classes for Complex Logic

When logic is too complex for per-property variables, use CSS classes:

```typescript
interface ButtonProps {
  $variant?: "primary" | "secondary" | "ghost";
  $size?: "small" | "medium" | "large";
  $disabled?: boolean;
}

const Button = styled.button<ButtonProps>`
  /* Base styles */
  border: none;
  border-radius: 8px;
  transition: opacity 0.2s ease;
  
  /* Variant styles */
  &.variant-primary {
    background: var(--color-orange);
    color: var(--color-white);
  }
  
  &.variant-secondary {
    background: var(--color-black);
    color: var(--color-white);
    border: 1px solid var(--color-white);
  }
  
  &.variant-ghost {
    background: transparent;
    color: var(--color-white);
  }
  
  /* Size styles */
  &.size-small {
    padding: 8rwd 16rwd;
    font-size: 14rwd;
  }
  
  &.size-medium {
    padding: 12rwd 24rwd;
    font-size: 16rwd;
  }
  
  &.size-large {
    padding: 16rwd 32rwd;
    font-size: 18rwd;
  }
  
  /* State styles */
  &.is-disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }
  
  @media --base-down {
    &.size-large {
      padding: 14rwm 28rwm;
      font-size: 16rwm;
    }
  }
`;

// Usage with mergeClassNames
import { mergeClassNames } from "@flight-digital/flightdeck/helpers";

<Button
  className={mergeClassNames(
    variant && `variant-${variant}`,
    size && `size-${size}`,
    disabled && "is-disabled"
  )}
>
  Click me
</Button>
```

## Layout Patterns

### Flexbox Patterns

```css
/* Horizontal stack with gap */
const Row = styled.div`
  display: flex;
  gap: 32rwd;
  align-items: center;
  
  @media --base-down {
    flex-direction: column;
    gap: 24rwm;
  }
`;

/* Vertical stack */
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16rwd;
  
  @media --base-down {
    gap: 12rwm;
  }
`;

/* Space between */
const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media --base-down {
    flex-direction: column;
    align-items: flex-start;
    gap: 16rwm;
  }
`;
```

### Grid Patterns

```css
/* Auto-fit grid */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300rwd, 1fr));
  gap: 32rwd;
  
  @media --base-down {
    grid-template-columns: 1fr;
    gap: 24rwm;
  }
`;

/* Fixed columns */
const ThreeColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32rwd;
  
  @media --base-down {
    grid-template-columns: 1fr;
    gap: 24rwm;
  }
`;
```

## Common Patterns

### Container with Padding

```css
const Container = styled.div`
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
```

### Avoiding Mini Styled Components

```typescript
// ❌ BAD - Too many styled components with minimal styles
const Wrapper = styled.div`
  display: flex;
`;

const Item = styled.div`
  margin-top: 16px;
`;

const Label = styled.span`
  font-weight: 600;
`;

// ✅ GOOD - Apply via className from parent
const Wrapper = styled.div`
  display: flex;
  
  .item {
    margin-top: 16rwd;
  }
  
  .label {
    font-weight: 600;
  }
`;

// Usage:
<Wrapper>
  <div className="item">
    <span className="label">Label</span>
  </div>
</Wrapper>
```

### Lists with Proper Keys

```typescript
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16rwd;
  
  @media --base-down {
    gap: 12rwm;
  }
`;

const ListItem = styled.li`
  padding: 12rwd;
  border-bottom: 1px solid var(--color-grey-50);
`;

// Usage with _key from Sanity
{items?.map((item) => (
  <ListItem key={item._key}>
    {item.label}
  </ListItem>
))}
```

## Width Handling

### ⚠️ CRITICAL: Ignore Max-Width from Figma

```css
/* ❌ WRONG: Using Figma width as max-width */
const Wrapper = styled.div`
  width: 100%;
  max-width: 1130rwd; /* Don't do this! */
`;

/* ✅ CORRECT: Responsive width approach */
const Wrapper = styled.div`
  width: 100%;
  /* Let content flow naturally with padding constraints */
  padding-top: 40rwd;
  padding-bottom: 40rwd;
  padding-left: var(--theme-page-left-padding);
  padding-right: var(--theme-page-right-padding);
`;
```

**Why?** Figma designs are at specific resolutions. Real viewports vary widely. Fixed max-widths create awkward whitespace on larger screens.

## Transitions and Animations

### CSS Transitions (Preferred for Simple Effects)

```css
const Button = styled.button`
  transition: opacity 0.3s ease, transform 0.3s ease;
  
  &:hover {
    opacity: 0.8;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;
```

### Multiple Properties

```css
const Card = styled.div`
  transition: 
    box-shadow 0.3s ease,
    transform 0.3s ease,
    opacity 0.3s ease;
  
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    transform: scale(1.02);
  }
`;
```

## Accessibility

### Focus States

```css
const Button = styled.button`
  &:focus-visible {
    outline: 2px solid var(--color-orange);
    outline-offset: 2px;
  }
`;
```

### Hiding Content Accessibly

```css
/* Visually hidden but accessible to screen readers */
const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;
```

## Best Practices

### ✅ DO

- Use `rwd` for desktop, `rwm` for mobile spacing
- Use CSS variables for colors
- Apply typography via `className`
- Use per-property ternaries for simple dynamic styles
- Use CSS classes for complex conditional logic
- Add focus states for interactive elements
- Use semantic HTML elements
- Ignore max-width from Figma designs

### ❌ DON'T

- Use hardcoded pixel values (`16px` - use `16rwd`)
- Use hardcoded colors (`#ee6326` - use `var(--color-orange)`)
- Duplicate typography styles (use classes)
- Use function bodies in Linaria styles
- Call external functions in styled components
- Use max-width values from Figma
- Create mini styled components with 1-2 properties
- Forget mobile responsive styles

## Troubleshooting

**Linaria build fails:**
- Check for function body execution in styles
- Look for external function calls
- Verify all prop-based styles use per-property ternaries
- Ensure no complex logic blocks

**Styles not applying:**
- Check CSS variable names are correct
- Verify media queries use correct syntax (`--base-down`, `--base-up`)
- Ensure responsive units (`rwd`/`rwm`) are used correctly

**Width issues:**
- Remove fixed `max-width` values
- Use `width: 100%` with padding constraints
- Check responsive behavior at different viewports

**Typography not working:**
- Verify className is applied to element
- Check global typography classes are defined
- Ensure not duplicating font styles in styled component

## Examples

### Complete Block Wrapper

```typescript
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
```

### Interactive Card

```typescript
const Card = styled.div`
  padding: 32rwd;
  border-radius: 8px;
  background: var(--color-grey);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(-2px);
  }
  
  @media --base-down {
    padding: 24rwm;
  }
`;
```

## Related Skills

- **extract-design-tokens** - Extract base typography/colors from Figma
- **convert-figma-to-code** - For Figma to Linaria conversion
- **create-block** - For block component structure
