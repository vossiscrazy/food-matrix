# Food Matrix meal-planning versions — builder spec

**Status:** GREENLIT by Voss (2026-10-04). Corrected same day from Robb Wolf.
**Owner:** Nutrition App Lead
**Builder:** Web Builder cc6ef905-cf91-4609-b0d1-ea9d63e8015e
**Base:** main @ fe0f34d (columns-only + SpaceXAI theme). Keep that page working.
**Lists:** /workspace/food-matrix/data/food-matrix-lists.json — exact spellings, including Cillantro and Herbs de Provance.
**Educational planning only. Not a recipe. Not cooking steps. Not medical advice.**

## Rule (Robb, from the PDF — supersedes one-of-each)

The printed formula **1 Fat + 1 Protein + 1 Veggie + 1 Spice** is a **template, not a hard rule**.
Adding more than one food from any category is allowed (second vegetable, second spice, spice blend, more than one protein or fat).
Salt and pepper may sit on the meal in addition to the chosen spice if they are chosen from the list. Do not invent foods that are not in the JSON.
Frozen vs fresh is not a separate UI.
The UI must **not** forbid a second pick in a column, and must **not** treat “exactly one of each” as the only valid meal.

Dense-carb asterisk only on: Beets, Acorn Squash, Butternut Squash, Yam, Sweet Potato.
Footnote under Vegetables only, from the JSON: eat in moderation until leanness goals are reached.
No grams. Do not show amounts, pan-coating, or “to taste” as instructions.

Column headers on these prototypes: **Proteins (27) · Vegetables (24) · Fats (5) · Herbs & Spices (25)**.

## What Voss asked
Click food names to add them to a meal being planned. Several working versions. Links to each at the top.

## Do not
- Recipes, methods, temperatures, “cook this”, dish titles, or cooking steps
- Change spellings or add foods
- Cap a column at one selection
- Light mode or a second palette
- Remove the existing matrix at /

## Shared chrome
- Top link row on `/` and every plan route: Matrix · Fill the four · One line · Several meals
- Routes: `/` current matrix (add the link row only), `/plan` → `/plan/fill`, `/plan/fill`, `/plan/line`, `/plan/several`
- Click a row to **add** that food to the meal (toggle off if clicked again). Multiple foods per column. Order inside a role follows list order.
- A short muted line may say the template is a starting shape, not a limit. One sentence max. No lecture.
- SpaceXAI tokens. Selected rows = accent-muted + left accent bar.
- Local only. No accounts.

## Layout notes (Nautilus — do not block)
Full note: /workspace/food-matrix/specs/food-matrix-meal-plan-upd-note.md
- A: slots and columns are one shared 4-track grid. “This meal” is the only heading above the lists. Clear is text, not an accent fill.
- B: stays one sentence. Do not turn it into slots.
- C: slots sit immediately above the lists (same grid as A). The saved-meal list goes **below** the matrix or beside it — never between the slots and the columns.
- Accent: selected row stays muted wash + left bar. The only solid accent control is **Add meal** on version C. Clear is never that button.
- Top links are comparison chrome only. No title, combo count, or cook language.
- Copy (Ogilvy): link row unchanged; group label “This meal”; button **Add meal** (not “Add to plan”); “Clear”. The label does not mean exactly four foods — Robb’s template rule still governs what can be added.

## Version A — Fill the four (`/plan/fill`)
Above the lists, four tracks aligned to the columns. Each track lists every food chosen in that column (one or many). Empty track shows the role name. “This meal” labels the group. “Clear” is plain text and removes all picks. No cook button. No solid accent button on this page.

## Version B — One line (`/plan/line`)
No slot boxes. One line in category order. Empty category shows the role name. A category with several foods shows them joined with “ + ” inside that category. Lists below. Do not add slot boxes.

## Version C — Several meals (`/plan/several`)
Same multi-select tracks as A, immediately above the columns. **Add meal** is the one solid accent button. It appends the current picks (names only, grouped by category) to a list **below the matrix or beside it**, then clears the picks. Enabled when at least one food is chosen — do not require exactly four and do not reject extras. Disabled when nothing is selected. Each saved meal can be removed. No dish titles.

## Ship
- npm run build
- Commit + push vossiscrazy/food-matrix
- Sync /home/voss/Documents/food-matrix
- Report SHA and localhost paths: / , /plan/fill , /plan/line , /plan/several

## Report
Nutrition App Lead only. Priority false unless blocked.
