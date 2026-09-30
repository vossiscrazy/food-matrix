# Food Matrix SpaceXAI theme v1.5 — builder spec

**Status:** GREENLIT (Voss 2026-09-30) — dispatch Web Builder  
**Owner:** Nutrition App Lead  
**IA:** Nautilus UPD vision `/workspace/food-matrix/specs/food-matrix-spacexai-theme-vision-v1.5.md`  
**Tokens:** `/workspace/food-matrix/design/spacexai-design-system.md` only — no second palette  
**Base:** columns-only v1.4 @ `e75a439` on `vossiscrazy/food-matrix`  
**Builder:** Web Builder `cc6ef905-cf91-4609-b0d1-ea9d63e8015e`  
**Educational product only — not medical advice.**

## Goal

Theme the live columns-only page with SpaceXAI / Omarchy dark tokens. **IA unchanged** — not a layout redesign.

## Unchanged (v1.4 still applies)

- Four columns only: **Protein · Vegetable · Fat · Herbs & Spices**
- Exact Robb lists from `/workspace/food-matrix/data/food-matrix-lists.json` (27/24/5/25; keep spellings)
- Sticky headers, Filter… typeahead, independent scroll, ~40px rows
- Single-select browse feedback only (not meal assembly)
- Dense-carb `*` + Vegetable-column footnote only
- Strip stays stripped: no hero, Cook/Clear, title chrome, 81k, tray, page footer, Next badge
- Desktop ≥1280; max-width ~1440; equal columns; thin dividers
- Out of scope: meal composition, light mode, Schoger craft, second palette

## Theme changes

Map CSS / Tailwind to `--sx-*` from the design system; `color-scheme: dark`.

| Module | Token |
|---|---|
| Page shell | `canvas` `#0a0a0a` |
| Column panels | `canvas-raised` `#121212` |
| Sticky header + filter fill | `canvas-elevated` `#181716` |
| Dividers / input borders | `surface-muted` `#333333` |
| Row hover | `surface-selection` `#2a2a2a` |
| Selected fill | `accent-muted` |
| Selected left bar 2–3px | `accent` `#fa7500` |
| Names / headers | `text-primary` `#fcfcfc` |
| Footnote / meta | `text-secondary` `#9e9e9e` |
| Filter placeholder | `text-tertiary` `#636363` |
| Focus ring | `accent` or `accent-border` (2px offset) |

**Accent budget:** selection + focus only. No orange headings, large orange fills, or CTAs in this view.

**Shape / motion:** filter radius 6–10px; 1px muted borders; elevation via surface step; 150–200ms hover/select; honor `prefers-reduced-motion`.

## Paths

- Box: `/workspace/food-matrix`
- Documents: `/home/voss/Documents/food-matrix` — **must sync** after ship
- Repo: `https://github.com/vossiscrazy/food-matrix`

## Acceptance (must all PASS)

1. Dark-only; tokens only from `spacexai-design-system.md`
2. Columns-only IA intact (Protein · Vegetable · Fat · Herbs & Spices; no hero/tray/title/Cook/81k)
3. Exact JSON names 27/24/5/25; dense-carb footnote under Vegetable only
4. Selected = accent-muted wash + 2–3px left accent bar; hover = surface-selection only
5. Focus rings accent/accent-border; placeholders tertiary; no orange headings or large orange fills
6. Sticky headers + Filter…; independent scroll; ~40px rows; equal columns + muted dividers
7. `npm run build` succeeds
8. Commit + push `vossiscrazy/food-matrix`; sync Documents (or report if unreachable)
9. Report to Lead: branch, SHA, paths, acceptance 1–9

## Report

Nutrition App Lead only. Priority false unless blocked.
