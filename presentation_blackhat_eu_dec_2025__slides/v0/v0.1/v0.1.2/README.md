# v0.1.2 - 16:9 Print Layout Fix

## What Changed

**Surgical override:** `css/print-16x9.css`

Forces print/PDF output to maintain 16:9 aspect ratio matching PowerPoint's widescreen template.

## The Problem

The original `@page { size: landscape; }` in v0.1.0 produces A4/Letter landscape (~1.41:1 or ~1.29:1), not 16:9 (1.78:1). This causes:
- Slides to appear squashed or stretched
- Backgrounds to not fill properly  
- Layout misalignment vs the original PPTX

## The Fix

```css
@page {
    size: 13.333in 7.5in;   /* PowerPoint's 16:9 default */
    margin: 0;
}

slide-page {
    width: 13.333in !important;
    height: 7.5in !important;
}
```

## How to Print/Export PDF

### Chrome/Edge (Recommended)
1. Open the presentation in browser
2. Press `Ctrl+P` (or `Cmd+P` on Mac)
3. Destination: **Save as PDF**
4. Paper size: Should auto-detect as **13.33" × 7.5"** or **Custom**
5. Margins: **None**
6. Background graphics: **✓ Enabled**
7. Click **Save**

### Firefox
1. Press `Ctrl+P`
2. Destination: **Save to PDF**  
3. Paper size: Select **Custom** → 13.333 × 7.5 inches
4. Margins: **None**
5. Print backgrounds: **✓ Enabled**

### Safari
1. Press `Cmd+P`
2. PDF dropdown → **Save as PDF**
3. Paper Size: **Manage Custom Sizes** → Add 13.333" × 7.5"
4. Click **Save**

## Alternative Sizes

Edit `print-16x9.css` to use different 16:9 dimensions:

```css
/* Smaller - better for email */
@page { size: 10in 5.625in; }

/* Larger - higher resolution */
@page { size: 16in 9in; }

/* Full HD pixels */
@page { size: 1920px 1080px; }

/* Metric (fits A4 width) */
@page { size: 297mm 167mm; }
```

## IFD Version Chain

```
v0.1.0/  (complete base)
├── css/common.css           # Base print: @page { size: landscape; }
├── components/slide-deck/
└── components/slide-page/

v0.1.2/  (surgical override)
└── css/print-16x9.css       # Override: @page { size: 13.333in 7.5in; }
```

## Testing

1. Open `index.html` in Chrome
2. Press `Ctrl+P` 
3. Verify preview shows 16:9 slides
4. Each slide should be on its own page
5. Backgrounds should fill completely
