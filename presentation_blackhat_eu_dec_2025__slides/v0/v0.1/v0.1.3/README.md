# v0.1.3 - Improved Slide Layout & Typography

## What Changed

**Surgical overrides:**
- `css/slide-layout-fix.css` - Fixed positioning, better visual hierarchy
- `js/content-density.js` - Auto-detect content volume, scale fonts accordingly

## Problems Fixed

### 1. Title Position Too High
**Before:** Title jammed against top edge  
**After:** Consistent 50px top padding with magenta underline separator

### 2. Weak Visual Hierarchy  
**Before:** Title (28-40px) barely distinguishable from bullets (32px)  
**After:** Title (32-48px, 800 weight, underlined) clearly dominant

### 3. Inconsistent Layout Across Slides
**Before:** Flexbox with padding - position varied with content  
**After:** CSS Grid with fixed zones:
```
┌─────────────────────────────────┐
│  HEADER (title zone)            │  ← Fixed position
├─────────────────────────────────┤
│                                 │
│  CONTENT (bullets zone)         │  ← Flexible, fills space
│                                 │
├─────────────────────────────────┤
│                          [logo] │  ← Footer zone
└─────────────────────────────────┘
```

### 4. No Content-Based Scaling
**Before:** Same 32pt font whether 2 bullets or 8 nested bullets  
**After:** Auto-detection applies density classes:

| Density | Criteria | Font Scaling |
|---------|----------|--------------|
| `light` | ≤3 items, no nesting, <200 chars | Large (28-40px) |
| `normal` | 4-5 items, light nesting | Medium (22-32px) |
| `heavy` | ≥6 items, deep nesting, >600 chars | Compact (18-26px) |

## CSS Grid Layout

```css
.bh-content-slide {
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        "header"
        "content" 
        "footer";
}
```

## Auto-Density Detection

The JS override wraps `renderBHContent()` to analyze content:

```javascript
// Counts items, nesting depth, and text length
const density = this.calculateDensity(data.content);

// Injects class: density-light, density-normal, or density-heavy
html = html.replace(
    'class="bh-slide bh-content-slide"',
    `class="bh-slide bh-content-slide density-${density}"`
);
```

## Manual Density Override

You can force a specific density in your JSON:

```json
{
    "layout": "bh-content",
    "density": "heavy",
    "title": "LOTS OF CONTENT",
    "content": [...]
}
```

Then update `slide-page.js` to read `data.density` (future v0.1.4 enhancement).

## IFD Version Chain

```
v0.1.0/  (complete base)
├── css/common.css
├── css/theme-blackhat.css
├── components/slide-page/slide-page.js
└── components/slide-deck/slide-deck.js

v0.1.2/  (surgical)
└── css/print-16x9.css         # 16:9 print layout

v0.1.3/  (surgical)
├── css/slide-layout-fix.css   # Grid layout, typography hierarchy
└── js/content-density.js      # Auto font scaling
```

## Visual Comparison

### Before (v0.1.2)
- Title: 28-40px, same weight as content
- Position: Variable, depends on content
- Bullets: Always 32pt regardless of volume

### After (v0.1.3)
- Title: 32-48px, 800 weight, magenta underline
- Position: Fixed grid zones
- Bullets: 18-40px based on content density

## Testing

1. Open `index.html`
2. Navigate to slide 5 (CONVERGING FORCES) - should show `density-heavy`
3. Navigate to slide 6 (WE'VE BEEN GETTING AWAY WITH IT) - should show `density-normal` or `density-light`
4. Check DevTools: slides should have `data-density="..."` attribute
5. Print to PDF - layout should remain consistent
