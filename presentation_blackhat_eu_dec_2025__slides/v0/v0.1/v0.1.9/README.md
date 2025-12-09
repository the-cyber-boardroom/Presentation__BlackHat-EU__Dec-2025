# v0.1.9 - Topic Cards Layout

New layout for category-based content with bullet point details inside each card. This is the most reusable layout in the deck.

## New Layout: `bh-topic-cards`

### Features
- **Category cards** with header + bullet points
- **2×2 grid** for 4 items, **1×3** for 3 items
- **Varied colors** per category (tasteful, not monotone)
- **Insight banner** for key takeaway
- **Print-ready** with proper color preservation

### Visual Design
```
┌─────────────────────────────┐ ┌─────────────────────────────┐
│▌TECHNICAL DEBT CRISIS       │ │▌HIDDEN INTERDEPENDENCIES    │
│                             │ │                             │
│  • ~40% of IT asset value   │ │  • Internet = circular      │
│    is technical debt        │ │    dependency machine       │
│  • Systems running 'hot'    │ │  • Identity, DNS, cloud -   │
│                             │ │    one failure cascades     │
├─────────────────────────────┤ ├─────────────────────────────┤
│▌NO VISIBILITY, NO RECOVERY  │ │▌NO VERSION CONTROL FOR DATA │
│                             │ │                             │
│  • Only ~54% have DR plans  │ │  • Code has Git. Databases? │
│  • 9 months dwell time      │ │  • If AI corrupts, rewind?  │
└─────────────────────────────┘ └─────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│  You can't protect what you don't understand.                 │
└───────────────────────────────────────────────────────────────┘
```

### JSON Structure

```json
{
  "layout": "bh-topic-cards",
  "title": "SLIDE TITLE",
  "items": [
    {
      "label": "Category Name",
      "points": [
        "First bullet point",
        "Second bullet point"
      ],
      "color": "#E01E28"
    },
    {
      "label": "Another Category",
      "points": [
        "First point",
        "Second point"
      ],
      "color": "#4B7CAA"
    }
  ],
  "insight": "Key takeaway message."
}
```

### Properties

| Property | Required | Description |
|----------|----------|-------------|
| `layout` | Yes | Must be `"bh-topic-cards"` |
| `title` | Yes | Slide heading |
| `items` | Yes | Array of category objects |
| `items[].label` | Yes | Category header (uppercase) |
| `items[].points` | Yes | Array of bullet point strings |
| `items[].color` | No | Left border color (default: `#D81EBF`) |
| `insight` | No | Takeaway banner below cards |

### Grid Behavior

| Items | Layout |
|-------|--------|
| 2 | 2-column centered |
| 3 | 3-column single row |
| 4 | 2×2 grid |
| 5-6 | 3-column (compact fonts) |

### Color Palette Used in Deck

**Risk/Problem themes:**
- Red: `#E01E28`
- Amber: `#F59E0B`
- Purple: `#8B5CF6`
- Teal: `#4B7CAA`

**Solution/Positive themes:**
- Blue: `#3B82F6`
- Green: `#10B981`
- Purple: `#8B5CF6`
- Magenta: `#D81EBF`

## Slides Using `bh-topic-cards`

| Slide | Title | Items | Theme |
|-------|-------|-------|-------|
| 11 | FRAGILE BY DEFAULT | 4 | Risk (red→amber→purple→teal) |
| 13 | ATTACKERS ALWAYS MAKE MISTAKES | 3 | Mixed (red→amber→green) |
| 14 | SECURITY'S ASYMMETRIC ADVANTAGE | 3 | Positive (teal→purple→green) |
| 15 | THE MECHANISM: KNOWLEDGE GRAPHS | 3 | Positive (blue→purple→green) |
| 17 | ASSUME COMPROMISE, CONTAIN BLAST | 3 | Risk (red→amber→teal) |
| 18 | VERSION CONTROL EVERYTHING | 3 | Mixed (red→purple→teal) |
| 19 | IDENTITY GRAPHS: LEAST PRIVILEGE | 3 | Positive (blue→purple→green) |
| 22 | VIBE CODING: THE NEW SPREADSHEETS | 3 | Risk (magenta→amber→red) |
| 23 | DON'T BECOME THE DEPARTMENT OF 'NO' | 3 | Mixed (red→green→blue) |
| 25 | CALL TO ACTION | 5 | Rainbow (blue→purple→amber→red→green) |

**Total: 10 slides** using this layout!

## Files

```
v0.1.9/
├── layouts/
│   └── topic-cards/
│       ├── topic-cards.css    # Grid, cards, bullets, insight
│       └── topic-cards.js     # Layout renderer
├── decks/
│   └── blackhat-eu-2025.json  # Full deck with 10 topic-cards slides
├── index.html                  # Full version chain
└── README.md
```

## Custom Layouts Summary

| Version | Layout | Use Case |
|---------|--------|----------|
| v0.1.6 | `bh-incident-cards` | Label + single description |
| v0.1.8 | `bh-versus` | Face-off comparison |
| v0.1.9 | `bh-topic-cards` | Category + bullet points |

## Version Chain

- **v0.1.0** - Base components
- **v0.1.2** - 16:9 print layout
- **v0.1.3** - Grid layout, title positioning
- **v0.1.4** - Content vertical centering
- **v0.1.5** - Title alignment
- **v0.1.6** - Incident cards layout
- **v0.1.8** - Versus comparison layout
- **v0.1.9** - Topic cards layout

## Deck Layout Distribution

```
bh-cover:          1 slide
bh-title:          2 slides
bh-speaker:        1 slide
bh-section:        6 slides
bh-incident-cards: 3 slides
bh-versus:         1 slide
bh-topic-cards:   10 slides  ← Most used!
bh-content:        1 slide   (FUND NFRs - simple list)
─────────────────────────────
Total:            26 slides
```