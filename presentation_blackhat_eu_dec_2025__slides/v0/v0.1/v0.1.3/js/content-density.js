/* ═══════════════════════════════════════════════════════════════════════════════
   Slide Deck - Auto Content Density Detection
   v0.1.3 - Surgical override for SlidePage

   Automatically analyzes slide content and applies density classes:
   - density-light: 1-3 simple bullets, large fonts
   - density-normal: 4-5 bullets or light nesting (default)
   - density-heavy: 6+ bullets or deep nesting, compact fonts
   ═══════════════════════════════════════════════════════════════════════════════ */

/**
 * Analyze content and return density classification
 * @param {Array} content - Slide content array
 * @returns {string} 'light' | 'normal' | 'heavy'
 */
SlidePage.prototype.calculateDensity = function(content) {
    if (!content || !Array.isArray(content)) {
        return 'light';
    }

    let totalItems = 0;
    let maxDepth = 0;
    let totalTextLength = 0;

    const countItems = (items, depth = 1) => {
        if (!Array.isArray(items)) return;

        items.forEach(item => {
            totalItems++;
            maxDepth = Math.max(maxDepth, depth);

            // Count text length
            const text = typeof item === 'string' ? item : (item.text || '');
            totalTextLength += text.length;

            // Recurse into children
            if (item.children && Array.isArray(item.children)) {
                countItems(item.children, depth + 1);
            }
        });
    };

    countItems(content);

    // Decision logic
    // Light: Few items, shallow, short text
    if (totalItems <= 3 && maxDepth <= 1 && totalTextLength < 200) {
        return 'light';
    }

    // Heavy: Many items, deep nesting, or lots of text
    if (totalItems >= 6 || maxDepth >= 3 || totalTextLength > 600) {
        return 'heavy';
    }

    // Normal: Everything else
    return 'normal';
};

/**
 * Override renderBHContent to add density detection
 * Original method is preserved, we just wrap it
 */
(function() {
    const originalRenderBHContent = SlidePage.prototype.renderBHContent;

    SlidePage.prototype.renderBHContent = function(data) {
        // Calculate density
        const density = this.calculateDensity(data.content);

        // Get original HTML
        let html = originalRenderBHContent.call(this, data);

        // Inject density attribute into the slide div
        html = html.replace(
            'class="bh-slide bh-content-slide"',
            `class="bh-slide bh-content-slide density-${density}" data-density="${density}"`
        );

        return html;
    };
})();

/**
 * Also apply to comparison slides
 */
(function() {
    const originalRenderBHComparison = SlidePage.prototype.renderBHComparison;

    SlidePage.prototype.renderBHComparison = function(data) {
        // Calculate density based on both columns
        const allContent = [];
        if (data.columns) {
            data.columns.forEach(col => {
                if (col.content) {
                    allContent.push(...col.content);
                }
            });
        }

        const density = this.calculateDensity(allContent);

        let html = originalRenderBHComparison.call(this, data);

        html = html.replace(
            'class="bh-slide bh-comparison-slide"',
            `class="bh-slide bh-comparison-slide density-${density}" data-density="${density}"`
        );

        return html;
    };
})();

console.log('[v0.1.3] Content density detection loaded');