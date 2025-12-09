# v0.1.8 - Versus Comparison Layout

New asymmetric comparison layout for face-off style slides with threat-level visual weight.

## New Layout: `bh-versus`

### Features
- **Asymmetric cards** - right side slightly larger/more prominent
- **Color-coded threat levels** - teal (manageable) vs red (dangerous)
- **VS divider** - visual separator between sides
- **Insight banner** - key takeaway at bottom
- **Hover effects** - subtle lift and glow (web view)
- **Print-ready** - maintains styling in PDF export

### Visual Design
```
┌───────────────────┐          ┌───────────────────────┐
│▌HUMAN INSIDERS    │          │          AI AGENTS   ▐│
│▌(teal glow)       │    VS    │         (red glow)   ▐│
│▌                  │          │                      ▐│
│▌ • Limited skill  │          │ • Tireless           ▐│
│▌ • Rarely maximal │          │ • Machine-speed      ▐│
│▌ • Fatigue, fear  │          │ • Finds alternates   ▐│
│▌ • Contained      │          │ • No moral compass   ▐│
└───────────────────┘          └───────────────────────┘
         ↑ smaller                      ↑ 10% larger

┌─────────────────────────────────────────────────────┐
│  We've never had a malicious insider that can       │
│  instantly devise new approaches when blocked...    │
└─────────────────────────────────────────────────────┘
```

### JSON Structure

```json
{
  "layout": "bh-versus",
  "title": "LEFT THING VS. RIGHT THING",
  "left": {
    "header": "Left Side",
    "items": [
      "Point 1",
      "Point 2",
      "Point 3"
    ],
    "color": "#4B7CAA"
  },
  "right": {
    "header": "Right Side",
    "items": [
      "Point 1",
      "Point 2",
      "Point 3"
    ],
    "color": "#E01E28"
  },
  "insight": "Key takeaway that drives the point home."
}
```

### Properties

| Property | Required | Description |
|----------|----------|-------------|
| `layout` | Yes | Must be `"bh-versus"` |
| `title` | Yes | Slide heading (typically "X vs. Y") |
| `left` | Yes | Left card object |
| `left.header` | Yes | Left card title |
| `left.items` | Yes | Array of bullet points |
| `left.color` | No | Left border color (default: `#4B7CAA` teal) |
| `right` | Yes | Right card object |
| `right.header` | Yes | Right card title |
| `right.items` | Yes | Array of bullet points |
| `right.color` | No | Right border color (default: `#E01E28` red) |
| `insight` | No | Takeaway banner below cards |

### Suggested Color Pairings

| Comparison Type | Left | Right |
|-----------------|------|-------|
| Safe vs Dangerous | `#4B7CAA` (teal) | `#E01E28` (red) |
| Old vs New | `#6B7280` (gray) | `#D81EBF` (magenta) |
| Manual vs Automated | `#F59E0B` (amber) | `#8B5CF6` (purple) |
| Slow vs Fast | `#4B7CAA` (teal) | `#F59E0B` (amber) |

## Files

```
v0.1.8/
├── layouts/
│   └── versus/
│       ├── versus.css         # Asymmetric card styling
│       └── versus.js          # Layout renderer
├── decks/
│   └── blackhat-eu-2025.json  # Full deck with bh-versus on slide 9
├── index.html                  # Full version chain
└── README.md
```

## Custom Layouts Summary

| Version | Layout | Use Case |
|---------|--------|----------|
| v0.1.6 | `bh-incident-cards` | Case studies, incidents, categorized items |
| v0.1.8 | `bh-versus` | Face-off comparisons, before/after, threat levels |

## Version Chain

Builds on all previous versions:
- **v0.1.0** - Base components
- **v0.1.2** - 16:9 print layout
- **v0.1.3** - Grid layout, title positioning
- **v0.1.4** - Content vertical centering
- **v0.1.5** - Title alignment
- **v0.1.6** - Incident cards layout
- **v0.1.7** - Full deck content

## Usage

1. Copy `v0.1.8/` into your `v0/v0.1/` directory
2. Ensure v0.1.0 through v0.1.6 are present
3. Open `v0.1.8/index.html`
4. Navigate to slide 9 to see the versus layout