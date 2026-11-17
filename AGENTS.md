<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Required MyStree design review before coding

Before every coding task, read [color.md](./color.md) and the relevant existing components/styles. Identify the approved colors, font hierarchy, section-specific exceptions, responsive behavior, and interaction/accessibility rules that apply before making edits. For work without UI changes, still review the specification and confirm that the change does not affect the design system.

- `color.md` is the authoritative design specification. Use its tokens and the root Fraunces / Plus Jakarta Sans font setup; never introduce a competing font import or arbitrary per-page typography.
- Reference screenshots guide composition and motion. Do not copy another brand's palette, claims, fonts, or logo unless the user explicitly requests those details.
- Explicit user-requested section exceptions must be recorded in `color.md` and scoped to that section. They must not replace the corporate palette elsewhere.
- Preserve this rule outside Next.js's generated block. `CLAUDE.md` includes this file, so the same review applies to every coding agent working here.
- Before finishing UI work, verify relevant mobile/desktop states, keyboard/touch access, reduced motion, text contrast, and links. Report unavailable fonts, dependencies, or checks accurately.
