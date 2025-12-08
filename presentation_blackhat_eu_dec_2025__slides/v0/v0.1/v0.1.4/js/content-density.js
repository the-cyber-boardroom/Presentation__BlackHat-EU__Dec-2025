/* ═══════════════════════════════════════════════════════════════════════════════
   Slide Deck - Improved Content Density Detection
   v0.1.4 - Surgical override with refined thresholds
   
   Better detection for:
   - Light: Simple bullets, no nesting, short text
   - Normal: Moderate content with some nesting
   - Heavy: Lots of items or deep nesting
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
    
    let topLevelItems = content.length;
    let totalItems = 0;
    let maxDepth = 0;
    let hasNestedContent = false;
    
    const countItems = (items, depth = 1) => {
        if (!Array.isArray(items)) return;
        
        items.forEach(item => {
            totalItems++;
            maxDepth = Math.max(maxDepth, depth);
            
            // Check for nested children
            if (item.children && Array.isArray(item.children) && item.children.length > 0) {
                hasNestedContent = true;
                countItems(item.children, depth + 1);
            }
        });
    };
    
    countItems(content);
    
    // Debug logging (can be removed in production)
    console.log(`[Density] L1: ${topLevelItems}, Total: ${totalItems}, Depth: ${maxDepth}, Nested: ${hasNestedContent}`);
    
    // Decision logic - refined thresholds
    
    // LIGHT: Few top-level items AND no nesting
    // Examples: 4 simple bullets, 3 one-liners
    if (topLevelItems <= 4 && !hasNestedContent) {
        console.log('[Density] → light');
        return 'light';
    }
    
    // HEAVY: Many items OR deep nesting
    // Examples: 6+ bullets, or 3+ levels deep, or lots of total content
    if (topLevelItems >= 6 || maxDepth >= 3 || totalItems >= 12) {
        console.log('[Density] → heavy');
        return 'heavy';
    }
    
    // NORMAL: Everything else
    // Examples: 4-5 bullets with sub-bullets, moderate content
    console.log('[Density] → normal');
    return 'normal';
};

/**
 * Override renderBHContent to add density detection
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

console.log('[v0.1.4] Improved content density detection loaded');
