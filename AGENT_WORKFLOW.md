# AI Agent Workflow Log

This document explains **how AI agents (Copilot / Cursor / ChatGPT / Claude / etc.)** were used during the development of the FuelEU Maritime Full-Stack assignment.

---

## Agents Used
| Tool / Agent | Use Case |
|--------------|----------|
| GitHub Copilot | Auto-completion & boilerplate generation |
| ChatGPT (GPT-5) | Architecture planning, refactoring guidance, error debugging |
| Cursor / Claude Code (optional) | Multi-file refactoring and pattern enforcement |

---

## Prompts & Outputs

### Example 1: Generating Hexagonal Architecture Layout
**Prompt Used:**

<!-- Give me a clean hexagonal architecture folder structure for Node + Prisma backend -->

**Generated Output (refined version used):**
src/
core/
domain/
application/
ports/
adapters/
inbound/http/
outbound/postgres/
infrastructure/server/


### Example 2: Fixing React Query Dependency Conflict
**Prompt Used:**

<!-- Error: peer react@"^18". Using React 19. Which version of react-query works? -->


**Correction Applied:**
Used `@tanstack/react-query` instead of `react-query`.

---

## Validation / Corrections
- All generated code was manually tested via:
  - Postman API calls
  - Browser React UI interaction
  - Console logging & Prisma Studio to confirm DB values
- Business logic formulas cross-verified with FuelEU Annex IV rules.

---

## Observations
- AI agents saved significant time in:
  - Rewriting repetitive TypeScript types
  - Converting backend response shapes to frontend types
- Some hallucinations occurred when:
  - Mixing react-query v3 and v5 docs (resolved manually)
  - Prisma relation naming suggestions were off (corrected manually)

---

## Best Practices Followed
- Copilot used only for **boilerplate**, not critical business logic.
- ChatGPT used for **explanations + corrections**, not blind copy-paste.
- Code was **refactored by hand** after generation for clarity.
- All architecture decisions taken intentionally (not AI-driven).

