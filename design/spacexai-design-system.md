# SpaceXAI design system (from Omarchy theme)

Source of truth: `~/.config/omarchy/themes/spacexai/colors.toml` (live on Voss’s machine).
Audience: Nutrition App Lead → Nautilus (vision) → Lead spec → Web Builder.
Stack context: Next.js App Router + TypeScript + Tailwind. Dark-only product UI.

Steve Schoger is **out of the pipeline**. Do not route craft through him. Nautilus owns design vision from Universal Principles of Design; apply these tokens within that vision (clarity, hierarchy, consistency, affordance) — do not invent a second palette.

## Brand intent
- Warm near-black canvas, white type, single orange accent.
- Feels like SpaceXAI / Grok desktop: calm, dense-but-legible, not neon cyberpunk.
- Accent is sparse and purposeful (focus, primary action, key selection) — never wallpaper.
- Logos: white mark on black only; no orange fill in the wordmark/symbol unless Lead later approves.

## Color tokens

### Surfaces (background ladder)
| Token | Hex | Use |
|---|---|---|
| `canvas-deepest` | `#050505` | Immersive chrome, splash, full-bleed hero behind content |
| `canvas` | `#0a0a0a` | App shell / page base (prefer this over pure black) |
| `canvas-raised` | `#121212` | Default panel / main content surface |
| `canvas-elevated` | `#181716` | Cards, popovers, slightly lifted sheets (warm black, not cool gray) |
| `surface-muted` | `#333333` | Borders, dividers, disabled track, subtle wells |
| `surface-selection` | `#2a2a2a` | Selected row, hover well, inactive chip fill |

### Text
| Token | Hex | Use |
|---|---|---|
| `text-primary` | `#fcfcfc` | Body and titles |
| `text-secondary` | `#9e9e9e` | Supporting labels, meta |
| `text-tertiary` | `#636363` | Placeholder, disabled, de-emphasized |
| `text-on-accent` | `#0a0a0a` or `#121212` | Text/icons on solid accent buttons (prefer near-black for contrast) |

### Accent
| Token | Hex | Use |
|---|---|---|
| `accent` | `#fa7500` | Primary CTA fill, focus ring, active nav indicator, key highlights |
| `accent-muted` | `rgba(250, 117, 0, 0.15)` | Soft accent wash behind selected chips / focus backgrounds |
| `accent-border` | `rgba(250, 117, 0, 0.45)` | Focus outline / selected border when fill would be too loud |

Accent rules: (1) one primary accent action per view; (2) do not use accent for body links in long text — reserve orange for decisive actions; (3) never solid `#fa7500` large backgrounds; (4) borders default to `surface-muted`, promote to `accent-border` only for focus/selected.

### Semantic / syntax (optional UI feedback)
| Token | Hex | Use |
|---|---|---|
| `danger` | `#f7768e` | Errors, destructive |
| `danger-strong` | `#D35F5F` | Strong error / critical |
| `warning` | `#DCDCAA` | Warnings (keep soft; not orange) |
| `success` | `#91c17a` | Success / confirmed |
| `success-strong` | `#B5CEA8` | Softer success text/icons |
| `info` | `#569CD6` | Informational |
| `info-alt` | `#4EC9B0` | Secondary info |
| `special` | `#bc97ff` | Rare highlight (tags); sparingly |
| `warm-neutral` | `#CE9178` | Tertiary warm (not brand) |

Do not let syntax colors compete with `accent` for primary actions.

## Suggested CSS variables
```css
:root {
  color-scheme: dark;
  --sx-canvas-deepest: #050505;
  --sx-canvas: #0a0a0a;
  --sx-canvas-raised: #121212;
  --sx-canvas-elevated: #181716;
  --sx-surface-muted: #333333;
  --sx-surface-selection: #2a2a2a;
  --sx-text-primary: #fcfcfc;
  --sx-text-secondary: #9e9e9e;
  --sx-text-tertiary: #636363;
  --sx-accent: #fa7500;
  --sx-accent-muted: rgba(250, 117, 0, 0.15);
  --sx-accent-border: rgba(250, 117, 0, 0.45);
  --sx-danger: #f7768e;
  --sx-warning: #DCDCAA;
  --sx-success: #91c17a;
  --sx-info: #569CD6;
}
```

Tailwind sketch: `spacexai.deepest/canvas/raised/elevated/muted/selection/fg/fg-muted/fg-subtle/accent/danger/warning/success/info` with the same hex values.

## Typography
- UI sans: system stack or Inter-like geometric grotesk; no decorative display fonts.
- Mono rare (IDs/portions); Dark+ syntax colors only inside code, not chrome.
- Hierarchy: titles `text-primary`; meta `text-secondary`; never accent-colored headings.

## Shape, space, motion
- Radius 6–10px controls/cards; pills only for true tags.
- Border 1px muted; focus → accent-border or 2px ring with offset.
- Elevation via surface step, not heavy shadows; if shadow, soft black blur ≤24px.
- Density for food-list scanning; motion 150–200ms, respect reduced-motion.

## Component cues
- Primary button: accent fill, near-black label.
- Secondary: elevated/transparent + muted border.
- Inputs: raised/canvas fill, muted border, accent focus.
- Foods matrix: hover via selection; selected = accent-muted + 2–3px left accent bar.
- Nav active: underline or left tick — not full orange bar fills.
- Toasts: elevated + semantic icons; don’t orange-wash errors.

## Logo
White SpaceXAI mark on black only (`logo.svg` fill #fff).

## Do / don’t
Do: warm-black ladder `#050505`→`#181716`; single brand signal `#fa7500`; quiet UI.
Don’t: cool blue-grays/purple neon as brand; light mode; orange body text/large surfaces; Schoger as craft owner.

Handoff: Nautilus returns UPD-backed layout/IA using these tokens; Lead writes the buildable spec for Web Builder.
