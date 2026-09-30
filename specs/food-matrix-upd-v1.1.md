# Food Matrix UPD refactor v1.1 — builder spec

**Status:** GREENLIT (Voss via Nautilus) — dispatch Web Builder  
**Owner:** Nutrition App Lead  
**IA:** Nautilus / Universal Principles of Design  
**Base:** Food Matrix v1 @ `9d8a611` on `vossiscrazy/food-matrix`  
**Builder:** Web Builder `cc6ef905-cf91-4609-b0d1-ea9d63e8015e`  
**Educational product only — not medical advice.**

## Unchanged

- Greyscale / neutral only (no color accents)
- Exact Robb lists from `/workspace/food-matrix/data/food-matrix-lists.json` (do not rename spellings)
- Four columns, sticky headers, independent scroll
- Single-select per column
- Selected = darker fill + left rule
- Educational footer
- Desktop-first (≥1280px: four columns side-by-side)
- Out of scope still: multi-select, color, onboarding/denylist, My matrix editor, videos

## Paths

- Box: `/workspace/food-matrix` (primary worktree — keep specs/data)
- User machine: `/home/voss/Documents/food-matrix` — **must sync** after ship (copy or push/pull; Documents was missing on v1)
- Repo: `https://github.com/vossiscrazy/food-matrix`

## Changes (UPD)

1. **Mapping / Consistency — column + tray order = formula order**  
   Order left→right and tray left→right: **Fat · Protein · Vegetable · Spice** (not Protein-first).

2. **Recognition Over Recall — tray labels**  
   Empty tray slots use **full role names** (Fat, Protein, Vegetable, Spice) — not P/V/F/S.  
   Filled chips = food name + quiet role caption.

3. **Visibility / Feedback — header slots**  
   Replace static formula string as the hero with **four live header slots** that fill as the user selects.  
   Combo count stays quiet utility (UR). Soft “meal ready” affordance **only at 4/4**.

4. **Errors / Constraint — Cook this gating**  
   **Cook this** disabled until all four slots filled.  
   If activated while incomplete → focus first empty column (no false save).  
   Toast only on complete save (“Saved locally” or equivalent).

5. **Affordance / Fitts — tray ↔ column**  
   Click tray chip → focus that column and scroll selected row into view.  
   Chip × **or** row re-click clears that slot.

6. **Entry Point — one coach line**  
   One muted line under title: pick one from each column / one-pan meals. No cooking essay.

7. **Performance Load — typeahead**  
   Per-column sticky typeahead/filter in each column header.

8. **Hierarchy / Gutenberg**  
   Header (title + live slots) → columns → tray (confirm + CTA).

9. **Legibility**  
   ~40px row height; select-rule inset; visible greyscale keyboard focus ring.

10. **Highlighting — dense carbs**  
    Keep `*` + Vegetables-only footnote.  
    If a dense-carb veg is selected, echo moderation once in the tray caption for that chip — **not** a denylist.

11. **Forgiveness — Clear meal**  
    Text control “Clear meal” when any slot is filled; clears all four.

## Acceptance (must all PASS)

1. Column order Fat · Protein · Vegetable · Spice (matches formula / tray)
2. Tray empty states show full role names (no P/V/F/S)
3. Filled chips: food name + quiet role caption
4. Header has four live slots synced to selection
5. Combo count present as quiet utility; soft meal-ready only at 4/4
6. Cook this disabled until 4/4; incomplete activation focuses first empty column
7. Toast only on complete save
8. Tray chip click focuses column + scrolls selected row; × or row re-click clears
9. One muted coach line under title
10. Per-column sticky typeahead/filter works
11. ~40px rows; greyscale focus ring; select left-rule
12. Dense-carb `*` + veg footnote; tray caption echo when dense carb selected
13. Clear meal when any slot filled
14. Greyscale only; JSON names exact (27/24/5/25)
15. Desktop ≥1280 four columns; educational footer
16. `npm run build` succeeds
17. Commit + push to `vossiscrazy/food-matrix`; **also update** `/home/voss/Documents/food-matrix` (or report if machine unreachable so Lead can sync)
18. Report to Lead: branch, commit SHA, paths, acceptance 1–18

## Report

Nutrition App Lead only. Priority false unless blocked.
