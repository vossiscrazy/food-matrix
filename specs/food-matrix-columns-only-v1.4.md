# Food Matrix columns-only v1.4 — builder spec

**Status:** GREENLIT (Voss 2026-09-30) — dispatch Web Builder  
**Owner:** Nutrition App Lead  
**IA:** Nautilus (scope cut from Grid v1.2 / Robb-order v1.3)  
**Mock:** `/workspace/food-matrix/specs/food-matrix-columns-only-v1.4-mock.jpg`  
**Base:** Food Matrix UPD v1.1 @ `4c952a4` on `vossiscrazy/food-matrix`  
**Builder:** Web Builder `cc6ef905-cf91-4609-b0d1-ea9d63e8015e`  
**Educational product only — not medical advice.**

## Goal

Ship a **desktop greyscale page that is only the four filterable food columns**. No meal hero, no Cook/Clear, no title chrome, no bottom tray, no combo count, no Next.js branding.

## Column order (locked — Robb table)

Left → right: **Protein · Vegetable · Fat · Herbs & Spices**

(Not Fat-first. Match printed matrix / mock.)

## Keep

- Exact Robb lists from `/workspace/food-matrix/data/food-matrix-lists.json` — do not rename spellings (`Cillantro`, `Herbs de Provance`, etc.)
- Counts: 27 proteins / 24 vegetables / 5 fats / 25 herbs & spices
- Dense carbs: `*` on name + Vegetables-column footnote only (use JSON `denseCarb` + `denseCarbFootnote` shortened to match mock tone: `* dense carbohydrate` is fine under Vegetable list; full moderation sentence optional in footnote)
- Greyscale / neutral only
- Four equal columns, sticky headers, independent scroll per column
- Per-column typeahead / “Filter…” under each header
- Single-select per column still OK (selected = greyscale fill + 3px left rule) — selection is for filter/browse feedback only; **no meal assembly UI** in this slice
- Desktop-first ≥1280px; four columns side-by-side
- Content max-width ~1440px centered; outer margin ~32px; base 8px rhythm; row ~40px; header band ≤72px with search

## Strip (must remove)

- App title / Next branding / “Create Next App” chrome
- 81,000 meals / combo counter
- Formula string as chrome
- Hero “Your meal” / meal slots
- Cook this / Clear meal
- Bottom meal tray
- Page footer legal block (dense-carb line stays **inside** Vegetable column only)
- Duplicate bottom formula

## Out of scope

Multi-select, color, onboarding/denylist, My matrix editor, videos, meal composition / cook flow (later slice).

## Paths

- Box worktree: `/workspace/food-matrix` (keep specs/data)
- User machine: `/home/voss/Documents/food-matrix` — **must sync** after ship
- Repo: `https://github.com/vossiscrazy/food-matrix`

## Acceptance (must all PASS)

1. Page shows **only** four columns — no hero, tray, Cook/Clear, title chrome, combo count, Next branding
2. Column order Protein · Vegetable · Fat · Herbs & Spices
3. Exact JSON names; 27/24/5/25
4. Sticky headers + Filter… typeahead per column; independent scroll
5. ~40px rows; greyscale select fill + left rule; greyscale focus ring
6. Dense-carb `*` on matching veg + footnote under Vegetable column only
7. Equal columns; thin mid-gray vertical dividers; desktop ≥1280 four-across
8. Greyscale only
9. `npm run build` succeeds
10. Commit + push to `vossiscrazy/food-matrix`; sync `/home/voss/Documents/food-matrix` (or report if machine unreachable)
11. Report to Lead: branch, commit SHA, paths, acceptance 1–11

## Report

Nutrition App Lead only. Priority false unless blocked.
