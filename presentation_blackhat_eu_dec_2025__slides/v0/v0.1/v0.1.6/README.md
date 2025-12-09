# v0.1.6 - Incident Cards Layout

New custom layout for displaying incident case studies, security events, or any label+description items in a visual card grid.

## New Layout: `bh-incident-cards`

### Features
- **Visual cards** with color-coded left borders
- **Flex stretch** - all cards equal height
- **Insight banner** - key takeaway displayed prominently
- **Responsive** - 4-col → 2-col → stacked
- **Print-ready** - maintains layout in PDF export

### JSON Structure

```json
{
  "layout": "bh-incident-cards",
  "title": "SLIDE TITLE",
  "items": [
    { 
      "label": "COMPANY NAME", 
      "text": "Description of the incident or case study",
      "color": "#FF9900"
    },
    { 
      "label": "ANOTHER CO", 
      "text": "Another description here",
      "color": "#0078D4"
    }
  ],
  "insight": "Optional key takeaway message displayed below cards."
}
```

### Properties

| Property | Required | Description |
|----------|----------|-------------|
| `layout` | Yes | Must be `"bh-incident-cards"` |
| `title` | Yes | Slide heading |
| `items` | Yes | Array of card objects |
| `items[].label` | Yes | Card header (ALL CAPS, BOLD) |
| `items[].text` | Yes | Card body text |
| `items[].color` | No | Left border color (default: `#D81EBF` magenta) |
| `insight` | No | Takeaway banner below cards |

### Common Brand Colors

```
AWS:         #FF9900
Azure:       #0078D4
Google:      #4285F4
Cloudflare:  #F6821F
CrowdStrike: #E01E28
Okta:        #007DC1
Slack:       #4A154B
GitHub:      #24292F
Default:     #D81EBF (Black Hat magenta)
```

### Grid Behavior

| Items | Layout |
|-------|--------|
| 2 | 2-column centered |
| 3 | 3-column |
| 4 | 4-column |
| 5-6 | 3-column (wraps) |

## Files

```
v0.1.6/
├── layouts/
│   └── incident-cards/
│       ├── incident-cards.css     # Card grid, colors, insight banner
│       └── incident-cards.js      # Layout renderer registration
├── decks/
│   └── layout-demo.json           # Demo deck with new layout
├── index.html                      # Full version chain
└── README.md
```

## Version Chain

This version builds on:
- **v0.1.0** - Base components
- **v0.1.2** - 16:9 print layout
- **v0.1.3** - Grid layout, title positioning
- **v0.1.4** - Content vertical centering
- **v0.1.5** - Title alignment

## Usage

1. Copy `v0.1.6/` into your `v0/v0.1/` directory
2. Open `v0.1.6/index.html` in browser
3. Navigate to slide 3 to see the incident cards layout

Or modify the `src` attribute in index.html to point to your own deck JSON.

## Creating New Layouts

This establishes the pattern for custom layouts:

```
layouts/
└── your-layout-name/
    ├── your-layout.css   # Styles
    └── your-layout.js    # Renderer registration
```

In the JS file:
```javascript
// Add render method
SlidePage.prototype.renderYourLayout = function(data) {
    return `<div class="your-layout">...</div>`;
};

// Wrap renderLayout to handle new type
(function() {
    const original = SlidePage.prototype.renderLayout;
    SlidePage.prototype.renderLayout = function(layout, data) {
        if (layout === 'your-layout-name') {
            return this.renderYourLayout(data);
        }
        return original.call(this, layout, data);
    };
})();
```
