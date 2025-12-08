# v0.1.5 - Title Alignment Fix

## What Changed

**Surgical override:** `css/title-alignment.css`

Aligns title text with bullet text so the left edge is consistent across all content.

## The Problem

```
Before:
│  TITLE STARTS HERE                    │  ← 60px from edge
│                                       │
│     • Bullet text starts here         │  ← 105px from edge
│       ○ Sub-bullet                    │
```

The title and bullet text had different left positions, causing visual jumpiness.

## The Fix

```
After:
│     TITLE STARTS HERE                 │  ← 105px from edge
│     ─────────────────────             │
│                                       │
│     • Bullet text starts here         │  ← 105px from edge (aligned!)
│       ○ Sub-bullet                    │
```

## CSS Change

```css
.theme-blackhat .bh-content-slide .bh-heading {
    padding-left: 105px !important;  /* Match bullet indent */
}
```

## IFD Version Chain

```
v0.1.0/  → Base
v0.1.2/  → 16:9 print
v0.1.3/  → Grid layout, title positioning
v0.1.4/  → Content centering, density detection
v0.1.5/  → Title aligned with bullets ← NEW
```
