# v0.1.7 - Full Black Hat EU 2025 Deck

Complete 25-slide presentation with updated content and `bh-incident-cards` layout applied where appropriate.

## Slides Using `bh-incident-cards`

| Slide | Title | Items | Colors |
|-------|-------|-------|--------|
| 5 | SECURITY'S FOUR PILLARS - ALL BROKEN | 4 | Teal, Purple, Amber, Red |
| 6 | WE'VE BEEN GETTING AWAY WITH IT | 4 | AWS Orange, Azure Blue, Cloudflare Orange, CrowdStrike Red |
| 8 | THREE CATEGORIES OF AI-DRIVEN THREATS | 3 | Red (malicious), Amber (compromised), Purple (unintentional) |

## Slide Overview

```
 1. bh-cover         - Conference cover
 2. bh-title         - AI vs. AI
 3. bh-speaker       - Dinis Cruz intro
 4. bh-section       - THE PERFECT STORM
 5. bh-incident-cards - SECURITY'S FOUR PILLARS ★
 6. bh-incident-cards - WE'VE BEEN GETTING AWAY WITH IT ★
 7. bh-section       - THE NEW INSIDERS
 8. bh-incident-cards - THREE CATEGORIES OF AI-DRIVEN THREATS ★
 9. bh-comparison    - HUMAN INSIDERS vs. AI AGENTS
10. bh-section       - WHY ENTERPRISES AREN'T READY
11. bh-content       - FRAGILE BY DEFAULT
12. bh-section       - THE DEFENDER'S EDGE
13. bh-content       - ATTACKERS ALWAYS MAKE MISTAKES
14. bh-content       - SECURITY'S ASYMMETRIC ADVANTAGE
15. bh-content       - THE MECHANISM: KNOWLEDGE GRAPHS
16. bh-section       - RADICAL SIMPLIFICATION
17. bh-content       - ASSUME COMPROMISE, CONTAIN BLAST RADIUS
18. bh-content       - VERSION CONTROL EVERYTHING
19. bh-content       - IDENTITY GRAPHS: LEAST PRIVILEGE AT SCALE
20. bh-content       - FUND NFRs AT UNPRECEDENTED SCALE
21. bh-section       - ENABLING INNOVATION
22. bh-content       - VIBE CODING: THE NEW SPREADSHEETS
23. bh-content       - DON'T BECOME THE DEPARTMENT OF 'NO'
24. bh-section       - THE PATH FORWARD
25. bh-content       - CALL TO ACTION
26. bh-title         - QUESTIONS?
```

## Color Palette Used

```
Security Pillars:
  Engineering:    #4B7CAA (teal)
  Business:       #8B5CF6 (purple)
  Funding:        #F59E0B (amber)
  Risk:           #E01E28 (red)

Cloud Incidents:
  AWS:            #FF9900 (orange)
  Azure:          #0078D4 (blue)
  Cloudflare:     #F6821F (orange)
  CrowdStrike:    #E01E28 (red)

AI Threats:
  Malicious:      #E01E28 (red)
  Compromised:    #F59E0B (amber)
  Unintentional:  #8B5CF6 (purple)
```

## Files

```
v0.1.7/
├── decks/
│   └── blackhat-eu-2025.json    # Full 26-slide deck
├── index.html                    # Full version chain
└── README.md
```

## Version Chain

Builds on all previous versions:
- **v0.1.0** - Base components
- **v0.1.2** - 16:9 print layout
- **v0.1.3** - Grid layout, title positioning
- **v0.1.4** - Content vertical centering
- **v0.1.5** - Title alignment
- **v0.1.6** - Incident cards layout

## Usage

1. Copy `v0.1.7/` into your `v0/v0.1/` directory
2. Ensure v0.1.0 through v0.1.6 are present
3. Open `v0.1.7/index.html`

## Why These Slides Use Incident Cards

**Slide 5 - SECURITY'S FOUR PILLARS:**
- 4 distinct, named pillars
- Each has a clear, concise description
- Color-coded by severity/type

**Slide 6 - WE'VE BEEN GETTING AWAY WITH IT:**
- 4 company incidents
- Brand colors make instant recognition
- Insight banner delivers the punch line

**Slide 8 - THREE CATEGORIES OF AI-DRIVEN THREATS:**
- 3 threat categories
- Severity colors (red → amber → purple)
- Combined children into single text

Other slides kept as `bh-content` because:
- Multiple levels of nesting (children arrays)
- More than 4-5 items
- Content benefits from hierarchical bullets