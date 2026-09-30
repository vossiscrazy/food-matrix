# Food Matrix SpaceXAI theme vision v1.5 (Nautilus / UPD)

**Audience:** Nutrition App Lead → Web Builder  
**Product locked:** columns-only v1.4 on `main` @ `e75a439` — Protein · Vegetable · Fat · Herbs & Spices; filterable lists; no hero / Cook / tray / title chrome  
**Tokens:** `/workspace/food-matrix/design/spacexai-design-system.md` only — do not invent a second palette  
**Science:** Robb lists unchanged; educational only  
**Craft owner:** Nautilus (UPD). Schoger deleted.

Greyscale was interim. This slice is **dark SpaceXAI / Omarchy theming** of the same IA — not a layout redesign.

---

## UPD framing (Lidwell / Holden / Butler, 2003)

| Principle | Application here |
|---|---|
| **Figure-Ground** | Warm near-black canvas (`canvas` `#0a0a0a`) reads as ground; columns sit on `canvas-raised` so lists are figure. |
| **Contrast** | `text-primary` on raised surfaces for food names; `text-secondary` for role headers/meta; never accent-colored headings. |
| **Signal-to-Noise** | One brand signal: `#fa7500`. No orange body text, no large orange fills, no competing syntax colors in chrome. |
| **Highlighting** | Selection = sparse accent: `accent-muted` wash + 2–3px left `accent` bar (per design-system cue). Hover = `surface-selection` only. |
| **Consistency** | Same surface ladder and border language across four columns; equal tracks (Alignment) unchanged from v1.4. |
| **Similarity / Uniform Connectedness** | Shared dividers (`surface-muted`), shared filter chrome, shared row rhythm → four columns read as one matrix. |
| **Affordance + Feedback** | Filter inputs: muted border → `accent-border` / accent focus ring on focus. Selected row visibly different from hover. |
| **Hierarchy** | Role header (`text-primary`) → Filter (`text-tertiary` placeholder) → list (`text-primary`) → Vegetable footnote (`text-secondary`). |
| **Legibility** | Dense ~40px rows OK on dark; keep ≥4.5:1 for primary text; placeholders may sit at tertiary. |
| **Chunking** | Four role columns remain the only modules — theming must not reintroduce hero/tray chrome. |

---

## Surface map (token → module)

| Module | Token |
|---|---|
| Page / shell | `canvas` `#0a0a0a` |
| Column panels (optional shared sheet) | `canvas-raised` `#121212` |
| Sticky header band + filter field fill | `canvas-elevated` `#181716` |
| Vertical column dividers, input borders | `surface-muted` `#333333` |
| Row hover | `surface-selection` `#2a2a2a` |
| Selected row fill | `accent-muted` |
| Selected left rule (2–3px) | `accent` `#fa7500` |
| Food names / headers | `text-primary` `#fcfcfc` |
| Dense-carb footnote, supporting meta | `text-secondary` `#9e9e9e` |
| Filter placeholder | `text-tertiary` `#636363` |
| Focus ring (filter + listbox) | `accent` or `accent-border` (2px, offset) — replace greyscale `--focus-ring` |

No `canvas-deepest` needed for this slice (no splash/hero). Semantic danger/success unused unless Lead adds errors later.

---

## Component rules (columns-only)

1. **Keep IA:** four equal columns, Robb order, sticky headers, independent scroll, per-column Filter…, exact JSON spellings, Vegetable `*` + footnote only.  
2. **Strip stays stripped:** no Your meal, Cook/Clear, title chrome, 81k, bottom tray, page footer.  
3. **Selection (browse feedback only):** selected = `accent-muted` + left `accent` bar; **not** a meal-assembly state. At most one selected row per column (unchanged).  
4. **Accent budget:** no primary CTA in this view → accent is reserved for **selection indicator + focus**. Do not orange-wash headers or dividers.  
5. **Shape:** radius 6–10px on filter inputs; 1px muted borders; elevation via surface step, not heavy shadows.  
6. **Motion:** 150–200ms hover/select; respect `prefers-reduced-motion`.  
7. **CSS:** map existing `--ground/--surface/--selected-*` vars to `--sx-*` from the design system; `color-scheme: dark`.  

---

## Anti-patterns (do not ship)

- Light mode or cool blue-gray “dark theme”  
- Orange headings, orange large backgrounds, or accent as wallpaper  
- Reintroducing meal hero / Cook / tray under “theme work”  
- Second palette or Schoger craft pass  
- Syntax colors competing with accent for selection  

---

## Acceptance hints for Lead’s builder spec

1. Dark-only; only tokens from `spacexai-design-system.md`  
2. Columns-only IA intact (v1.4 acceptance still applies except greyscale → SpaceXAI)  
3. Selected row = muted accent wash + left accent bar; hover = selection surface only  
4. Focus rings accent; placeholders tertiary  
5. Build passes; push + sync as usual  

**Mock:** optional — Lead may theme from this note without a new image; Nautilus can supply a dark mock if Voss asks.

Educational only — not medical advice.
