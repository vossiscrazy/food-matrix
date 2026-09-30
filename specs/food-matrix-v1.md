# Food Matrix v1 — builder spec

**Status:** GREENLIT — dispatch Web Builder  
**Owner:** Nutrition App Lead  
**IA:** Nautilus (Universal Principles of Design)  
**Domain lists:** Robb Wolf Food Matrix guide (exact printed names)  
**Builder:** Web Builder `cc6ef905-cf91-4609-b0d1-ea9d63e8015e`  
**Educational product only — not medical advice.**

## Product

Desktop-first web UI for **Robb Wolf’s Food Matrix**.

Formula (always visible): `1 Fat + 1 Protein + 1 Veggie + 1 Spice`

Baseline combo count: `27 × 24 × 5 × 25 = 81,000` (live product of current list lengths).

## Stack (default unless Voss overrides)

- Next.js App Router + TypeScript + Tailwind
- Local static JSON for lists (no Prisma required for v1)
- Path: `/home/voss/Documents/food-matrix`
- Repo: `https://github.com/vossiscrazy/food-matrix` (create new; old nutrition-app deleted)
- Also keep working tree mirrored or synced under `/workspace/food-matrix` on the box for Lead review

## Source of truth for food names

Ship **exact** strings from `/workspace/food-matrix/data/food-matrix-lists.json` (extracted from Robb’s PDF table). Do not invent, rename, or “fix” spellings (`Cillantro`, `Herbs de Provance` stay as printed).

PDF copy: `/workspace/food-matrix/data/robb-wolf-food-matrix.pdf`  
Mock (structure only): `/workspace/food-matrix/specs/food-matrix-desktop-greyscale-mock.jpg`

Dense-carb vegetables (show `*` after name): Beets, Acorn Squash, Butternut Squash, Yam, Sweet Potato.  
Footnote under Vegetables column only: `*dense carbohydrate – eat in moderation until leanness goals are reached`

## Layout

1. **Top bar:** title `Food Matrix` · formula · live combo count  
2. **Main:** four equal columns — Proteins · Vegetables · Fats · Herbs & Spices — sticky headers, independent scroll  
3. **Bottom tray:** Your meal slots (P / V / F / S) + primary CTA `Cook this` (secondary label `Save combo` OK if one primary)

Desktop-first. Do not ship phone-column-only chrome. Mobile polish deferred.

## Interaction v1

- Single-select per column; click toggles select/clear  
- Keyboard: ↑↓ within column, Tab between columns, Enter to select  
- Multi-select **out of scope** for v1 (Robb allows it later)  
- Dense-carb asterisk + footnote under Vegetables only — **not** a denylist / Hidden list / off-plate chrome

## Visual (greyscale / neutral only)

- Off-white ground, charcoal type, mid-gray rules  
- Selected row: slightly darker fill + left rule  
- **No color accents** in v1

## Out of scope v1

- Old onboarding / plate personalization / denylists  
- Blank “My matrix” PDF page 6 editor  
- Cooking video embeds / quantities coaching beyond a quiet optional later slice  
- Auth, accounts, backend DB

## Acceptance (must all PASS)

1. App runs via `npm run dev`; home or `/` is the matrix UI  
2. Four columns with exact counts 27 / 24 / 5 / 25 and exact names from JSON  
3. Dense carbs marked with `*`; footnote under Vegetables only  
4. Top bar shows formula + live combo product of list lengths (81000 with full lists)  
5. Single-select per column; selection appears in bottom tray slots  
6. Click again clears that column’s selection  
7. Keyboard ↑↓ / Tab / Enter works as specified  
8. Greyscale/neutral only — no hue accents  
9. Desktop layout: four columns visible side-by-side at ≥1280px width  
10. Sticky column headers + independent column scroll  
11. Primary CTA present (`Cook this`); may no-op or toast “Saved locally” for v1  
12. Footer or quiet line: educational / not medical advice  
13. `npm run build` succeeds  
14. Commit + push; open PR or merge to `main` as Lead instructed; report commit SHA + acceptance to Lead

## Report back

To Nutrition App Lead only: branch, commit, path, acceptance 1–14, any blockers. Prefer priority false FYI unless blocked.
