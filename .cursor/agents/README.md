# SDD Agents

Spec-Driven Development (SDD) agents for structured feature planning and implementation.

Each agent handles one phase of the SDD pipeline. The orchestrator coordinates them in sequence — invoke it with `/sdd new <change-name> <description>` to run the full pipeline.

## Agents

### `sdd-orchestrator`
**Role:** Pipeline coordinator  
**Invoke with:** `/sdd new`, `/sdd init`, `/sdd apply`, `/sdd verify`, `/sdd status`  
**Does:** Routes commands to the right phase agents, tracks pipeline state, shows progress, handles branching (e.g. verify fail → back to apply). Never implements code or writes specs itself — delegates everything.

---

### `sdd-init`
**Role:** Project setup  
**Does:** Detects the project stack and conventions, then bootstraps the persistence backend (engram or openspec). Run once per project before the first change.

### `sdd-explore`
**Role:** Codebase investigation  
**Does:** Reads the actual codebase to understand current architecture, affected areas, and available approaches. Returns a structured analysis with a recommendation. Can run standalone (just exploration) or as the first phase of a change.

### `sdd-propose`
**Role:** Change scoping  
**Does:** Takes the exploration analysis and writes a `proposal.md` — what problem we're solving, what's in/out of scope, the technical approach, affected areas, risks, and success criteria.

### `sdd-spec`
**Role:** Behavioral requirements  
**Does:** Writes delta specs (ADDED/MODIFIED/REMOVED requirements with Given/When/Then scenarios) that describe what the system should do after the change. Specs are behavioral — they say *what*, not *how*.

### `sdd-design`
**Role:** Technical architecture  
**Does:** Reads the codebase and proposal, then writes a `design.md` capturing architecture decisions, data flow, exact file changes (create/modify/delete), and testing strategy.

### `sdd-tasks`
**Role:** Implementation breakdown  
**Does:** Converts the design into a concrete `tasks.md` checklist organized by phase (infrastructure → implementation → integration → testing). Each task references a specific file and action.

### `sdd-apply`
**Role:** Code implementation  
**Does:** Reads specs and design, then implements the assigned tasks. Follows TDD cycle (RED → GREEN → REFACTOR) if detected. Marks tasks complete in `tasks.md` as it goes. Loads relevant project skills (e.g. `style-with-linaria`, `create-block`) before writing code.

### `sdd-verify`
**Role:** Quality gate  
**Does:** Checks completeness (all tasks done?), runs tests and build, and produces a spec compliance matrix — every spec scenario mapped to a test result. Returns PASS / PASS WITH WARNINGS / FAIL with evidence.

### `sdd-archive`
**Role:** Cycle completion  
**Does:** Merges delta specs into the main `openspec/specs/` source of truth, moves the change folder to `openspec/changes/archive/YYYY-MM-DD-{name}/`, and confirms the SDD cycle is complete.

---

## Pipeline

```
[INIT] (once)

[EXPLORE] → [PROPOSE] → [SPEC] → [DESIGN] → [TASKS] → [APPLY] → [VERIFY] → [ARCHIVE]
                                                            ↑          |
                                                            └──────────┘ (if FAIL)
```

## Persistence Modes

All agents support three persistence modes — the orchestrator resolves which one to use:

| Mode | Where artifacts go | Best for |
|------|-------------------|----------|
| `engram` | Engram MCP (memory) | Default — no project files created |
| `openspec` | `openspec/` directory | File-based audit trail in the repo |
| `none` | Conversation context only | Ephemeral / no setup required |

## Shared Conventions

Phase agents rely on shared convention files from `~/.cursor/skills/_shared/`:

- `persistence-contract.md` — mode resolution rules
- `engram-convention.md` — how to read/write Engram artifacts
- `openspec-convention.md` — how to read/write openspec files

These live at user level and need to be installed on each developer's machine (same SDD skills package).
