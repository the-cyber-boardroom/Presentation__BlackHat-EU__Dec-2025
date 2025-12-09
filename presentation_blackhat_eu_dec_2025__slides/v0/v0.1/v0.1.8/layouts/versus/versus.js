/* ═══════════════════════════════════════════════════════════════════════════════
   Layout: Versus Comparison (bh-versus)
   v0.1.8 - Registers asymmetric comparison layout with SlidePage

   Surgical override pattern:
   1. Add renderBHVersus method to prototype
   2. Wrap renderLayout to handle new layout type
   ═══════════════════════════════════════════════════════════════════════════════ */

/**
 * Render versus comparison layout
 * @param {Object} data - Slide data with left, right objects and optional insight
 * @returns {string} HTML string
 */
SlidePage.prototype.renderBHVersus = function(data) {
    const left = data.left || {};
    const right = data.right || {};
    const insight = data.insight || '';

    // Default colors
    const leftColor = left.color || '#4B7CAA';   // Teal - manageable
    const rightColor = right.color || '#E01E28'; // Red - dangerous

    // Build left card items
    const leftItems = (left.items || []).map(item => `
        <div class="bh-versus-item">${this.esc(item)}</div>
    `).join('');

    // Build right card items
    const rightItems = (right.items || []).map(item => `
        <div class="bh-versus-item">${this.esc(item)}</div>
    `).join('');

    // Build insight banner (only if insight exists)
    const insightHtml = insight ? `
        <div class="bh-versus-insight">
            ${this.esc(insight)}
        </div>
    ` : '';

    return `
        <div class="bh-slide bh-versus-slide">
            <h2 class="bh-heading">${this.esc(data.title || '')}</h2>
            
            <div class="bh-versus-container">
                <div class="bh-versus-card bh-versus-left" style="--card-color: ${leftColor};">
                    <div class="bh-versus-header">${this.esc(left.header || '')}</div>
                    <div class="bh-versus-body">
                        ${leftItems}
                    </div>
                </div>
                
                <div class="bh-versus-divider">VS</div>
                
                <div class="bh-versus-card bh-versus-right" style="--card-color: ${rightColor};">
                    <div class="bh-versus-header">${this.esc(right.header || '')}</div>
                    <div class="bh-versus-body">
                        ${rightItems}
                    </div>
                </div>
            </div>
            
            ${insightHtml}
            
            <img class="bh-corner-logo" src="../v0.1.0/assets/blackhat/logo-white.png" alt="Black Hat" />
        </div>
    `;
};

/**
 * Surgical override of renderLayout to add new layout type
 */
(function() {
    const originalRenderLayout = SlidePage.prototype.renderLayout;

    SlidePage.prototype.renderLayout = function(layout, data) {
        // Handle new layout type
        if (layout === 'bh-versus') {
            return this.renderBHVersus(data);
        }

        // Fall back to original for all other layouts
        return originalRenderLayout.call(this, layout, data);
    };
})();

console.log('[v0.1.8] Layout registered: bh-versus');