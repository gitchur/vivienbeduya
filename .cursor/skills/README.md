# Cursor Agent Skills

This directory contains specialized skills for AI agents working on the codebase. Each skill is a focused workflow that guides the agent through common tasks.

**Location in flight-cli:** `project-context/.cursor/skills/`

**Location in target projects:** `.cursor/skills/` (copied during project initialization)

**Note:** These skills are part of the flight-cli template in `project-context/` and get copied to new projects' `.cursor/skills/` directory during initialization, just like `.flight/` files.

## Available Skills

### 🎨 extract-design-tokens
**Purpose:** Extract typography, colors, and spacing from Figma designs  
**When to use:** Setting up design system, extracting base styles from Figma  
**Covers:** Typography extraction, CSS variables, flightdeck configuration, Sanity rich text setup  

### 🏗️ create-block
**Purpose:** Create new CMS content blocks  
**When to use:** Creating modular content sections that editors can add to pages  
**Covers:** Schema creation, React component, GROQ queries, registration  

### 📋 create-sanity-schema
**Purpose:** Create Sanity CMS schemas (blocks, objects, documents)  
**When to use:** Defining data structures for the CMS  
**Covers:** Field types, validation, preview configuration, registration  

### 🎨 style-with-linaria
**Purpose:** Style components with Linaria CSS-in-JS  
**When to use:** Implementing responsive designs with proper Linaria patterns  
**Covers:** Build-time constraints, responsive units, typography  

### 🎨 convert-figma-to-code
**Purpose:** Convert Figma designs to Linaria components  
**When to use:** Implementing designs from Figma  
**Covers:** Figma MCP extraction, Tailwind to Linaria conversion, design validation  

### 🖼️ generate-block-preview
**Purpose:** Generate preview images for Sanity block picker  
**When to use:** Creating PNG previews from Tailwind HTML using component-to-image.js  
**Covers:** Automated preview generation, image registration, Sanity Studio integration  

### 🔧 create-primitive-block
**Purpose:** Create primitive blocks (reusable content elements)  
**When to use:** Creating elements that can be used within grid/container blocks  
**Covers:** Object schema, component, registration in constants.ts and primitiveBlocks.tsx  

### 📡 create-api-route
**Purpose:** Create Next.js API routes and server actions  
**When to use:** Building endpoints for forms, external APIs, webhooks  
**Covers:** API routes, server actions, validation, error handling  

### 📁 create-datasource-document
**Purpose:** Create referential document schemas  
**When to use:** Building reusable reference data (team members, opportunities, etc.)  
**Covers:** Document schemas, data source registration, querying, referencing  

## Skill Structure

Each skill follows this format:

```markdown
---
name: skill-name
description: Brief description of what this skill does
---

# Skill Title

Detailed instructions for the agent.

## When to Use
- Specific scenarios when this skill applies

## Instructions
- Step-by-step guidance
- Best practices
- Common patterns

## Related Skills
- Links to other skills that complement this one
```

### Skills with Supporting Files

Skills can include scripts, references, and assets:

```
.cursor/skills/
└── generate-block-preview/
    ├── SKILL.md
    └── scripts/
        └── component-to-image.js    # Automated preview generator
```

Supporting files make skills self-contained and portable.

## How Skills Work

1. **Agent Detection:** When you ask the AI to perform a task, it checks if any skills match the request
2. **Skill Activation:** The AI reads the relevant skill file and follows its instructions
3. **Cross-References:** Skills can reference each other for complex workflows
4. **Context-Aware:** Skills have access to project context and can ask clarifying questions

## Skill Design Principles

### ✅ DO

- Keep skills **atomic** but not overly granular (avoid 10-skill chains)
- Make skills **generic** and reusable across similar tasks
- Include **examples** and code templates
- Reference **related skills** for complex workflows
- Provide **checklists** for validation
- Include **troubleshooting** sections

### ❌ DON'T

- Create one massive skill that does everything
- Make skills too specific to a single use case
- Duplicate content across multiple skills
- Forget to update skills when patterns change
- Create circular references between skills

## Workflow Examples

**User asks:** "Extract the design system from this Figma file"

**Agent workflow:**
1. Uses **extract-design-tokens** skill
2. Extracts typography scales and adds to globals.css
3. Extracts colors and creates CSS variables
4. Configures typography in flightdeck.ts and constants.ts

**User asks:** "Create a newsletter signup block from this Figma design"

**Agent workflow:**
1. Detects this involves multiple skills
2. Uses **convert-figma-to-code** to extract design
3. Uses **generate-block-preview** to create preview image
4. Uses **create-sanity-schema** to create block schema
5. Uses **create-block** for the complete block setup workflow
6. References **style-with-linaria** for styling patterns throughout

**User asks:** "Create a links list primitive block"

**Agent workflow:**
1. Uses **create-primitive-block** skill
2. Creates object schema, component, registers in constants.ts
3. Adds to primitiveBlocks.tsx and validateType.ts
4. Tests in grid block

**User asks:** "Create a team members data source"

**Agent workflow:**
1. Uses **create-datasource-document** skill
2. Creates document schema with fields
3. Registers in datasource.ts
4. Creates queries for fetching data

**User asks:** "Create a contact form API endpoint"

**Agent workflow:**
1. Uses **create-api-route** skill
2. Creates API route or server action
3. Adds validation and error handling
4. Integrates with external service

## Maintenance

When updating skills:
- Keep the frontmatter format consistent
- Update related skills if workflow changes
- Test skills work together for complete workflows
- Document breaking changes or new patterns

## Relationship to project-context

**project-context folder** (in flight-cli repo):
- Source templates and documentation
- Reference material for legacy docs
- Copied to new projects during initialization

**.cursor/skills folder** (in target projects):
- Active skills that Cursor reads
- Copied from flight-cli during project creation
- Should exist in every project's `.cursor/skills/` directory

### Reference Documentation

Additional reference docs in `project-context/.flight/`:
- `frontend-conventions.md` - Detailed styling patterns
- `block-creation-guide.md` - Legacy block guide (now replaced by skills)
- `project-structure.md` - Folder organization
- `sanity-cms.md` - Sanity CMS deep dive
- `api-patterns.md` - API and data fetching reference

These provide deep reference while skills provide actionable workflows.

## Adding New Skills

When creating a new skill:

1. Create a folder: `.cursor/skills/skill-name/`
2. Add SKILL.md with proper frontmatter
3. Include supporting files if needed (scripts, references, assets)
4. Update this README
5. Reference the new skill from AGENTS.md if it's a main workflow

Example structure with supporting files:

```
.cursor/skills/deploy-app/
├── SKILL.md
├── scripts/
│   ├── deploy.sh
│   └── validate.py
├── references/
│   └── REFERENCE.md
└── assets/
    └── config-template.json
```

## Questions?

If skills need clarification or updates, ask the project maintainer or check the legacy documentation for deeper reference material.
