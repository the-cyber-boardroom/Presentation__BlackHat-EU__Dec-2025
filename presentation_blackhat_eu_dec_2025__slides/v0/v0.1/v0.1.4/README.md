# v0.1.4 - Content Area Vertical Distribution

## What Changed

**Surgical overrides:**
- `css/content-spacing.css` - Vertical centering and spacing for bullets
- `js/content-density.js` - Refined density detection thresholds

## Problems Fixed

### 1. Content Bunched at Top
**Before:** All bullets pushed to top, empty space at bottom  
**After:** Content vertically centered in the content zone

### 2. No Spacing Adaptation
**Before:** Same tight spacing regardless of content volume  
**After:** Spacing expands/contracts based on density

### 3. Poor Density Detection
**Before:** Thresholds too aggressive, most slides marked "heavy"  
**After:** Better logic:
- `light`: ≤4 bullets, NO nesting
- `normal`: 4-5 bullets with nesting, or 5 simple bullets
- `heavy`: ≥6 bullets, OR ≥3 levels deep, OR ≥12 total items

## Visual Changes

### Light Density (e.g., "WE'VE BEEN GETTING AWAY WITH IT")
```
┌─────────────────────────────────────┐
│  TITLE                              │
│  ─────────────────────────          │
│                                     │
│     • Large bullet (28-38px)        │  ← Vertically
│                                     │     centered
│     • Generous spacing (20px)       │     block
│                                     │
│     • Fills the space               │
│                                     │
│                             [logo]  │
└─────────────────────────────────────┘
```

### Normal Density (e.g., "CONVERGING FORCES")
```
┌─────────────────────────────────────┐
│  TITLE                              │
│  ─────────────────────────          │
│                                     │
│     • Medium bullet (24-32px)       │
│       ○ Sub-bullet                  │  ← Centered
│                                     │
│     • Balanced spacing (14px)       │
│       ○ Sub-bullet                  │
│                                     │
│                             [logo]  │
└─────────────────────────────────────┘
```

### Heavy Density (lots of content)
```
┌─────────────────────────────────────┐
│  TITLE                              │
│  ─────────────────────────          │
│     • Compact bullet (20-26px)      │
│       ○ Tight sub-bullets           │  ← Top-aligned
│       ○ Minimal padding (8px)       │     (needs space)
│     • More items                    │
│       ○ Sub-bullet                  │
│       ○ Sub-bullet                  │
│     • Even more                     │
│       ○ Everything fits             │
│                             [logo]  │
└─────────────────────────────────────┘
```

## Density Detection Logic

```javascript
// LIGHT: Simple content
if (topLevelItems <= 4 && !hasNestedContent) → 'light'

// HEAVY: Complex content  
if (topLevelItems >= 6 || maxDepth >= 3 || totalItems >= 12) → 'heavy'

// NORMAL: Everything else
→ 'normal'
```

## Expected Classifications for Your Slides

| Slide | L1 Bullets | Nesting | Expected Density |
|-------|-----------|---------|------------------|
| CONVERGING FORCES | 4 | Yes (1 level) | **normal** |
| WE'VE BEEN GETTING AWAY WITH IT | 4 | No | **light** |
| THREE TYPES OF AI-DRIVEN THREATS | 3 | Yes (1 level) | **normal** |
| BRITTLE ARCHITECTURE | 3 | Yes (2 levels) | **normal** |
| KEY TAKEAWAYS | 4 | Yes (1 level) | **normal** |

## IFD Version Chain

```
v0.1.0/  (complete base)
├── css/common.css
├── css/theme-blackhat.css
├── components/slide-page/slide-page.js
└── components/slide-deck/slide-deck.js

v0.1.2/  (surgical)
└── css/print-16x9.css           # 16:9 print layout

v0.1.3/  (surgical)
└── css/slide-layout-fix.css     # Grid layout, title positioning

v0.1.4/  (surgical)
├── css/content-spacing.css      # Vertical centering, density-based spacing
└── js/content-density.js        # Improved detection thresholds
```

## Debugging

Open DevTools Console to see density detection:
```
[Density] L1: 4, Total: 8, Depth: 2, Nested: true
[Density] → normal
```

Check the slide element for the applied class:
```html
<div class="bh-slide bh-content-slide density-normal" data-density="normal">
```

## Testing

1. Open `index.html`
2. Check Console for density logs
3. Slide 5 (CONVERGING FORCES) → `density-normal`, centered content
4. Slide 6 (WE'VE BEEN GETTING AWAY) → `density-light`, larger fonts
5. Verify content is vertically centered, not bunched at top
