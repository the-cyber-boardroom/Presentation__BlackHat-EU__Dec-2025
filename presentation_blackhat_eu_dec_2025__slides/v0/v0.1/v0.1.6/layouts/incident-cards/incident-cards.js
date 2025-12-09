/* ═══════════════════════════════════════════════════════════════════════════════
   Layout: Incident Cards (bh-incident-cards)
   v0.1.6 - Registers new layout renderer with SlidePage
   
   Surgical override pattern:
   1. Add renderBHIncidentCards method to prototype
   2. Wrap renderLayout to handle new layout type
   ═══════════════════════════════════════════════════════════════════════════════ */

/**
 * Render incident cards layout
 * @param {Object} data - Slide data with items array and optional insight
 * @returns {string} HTML string
 */
SlidePage.prototype.renderBHIncidentCards = function(data) {
    const items = data.items || [];
    const insight = data.insight || '';
    const defaultColor = '#D81EBF'; // Black Hat magenta
    
    // Build cards HTML
    const cardsHtml = items.map(item => {
        const color = item.color || defaultColor;
        const label = this.esc(item.label || '');
        const text = this.esc(item.text || '');
        
        return `
            <div class="bh-incident-card" style="--card-color: ${color};">
                <div class="bh-incident-card-label">${label}</div>
                <div class="bh-incident-card-text">${text}</div>
            </div>
        `;
    }).join('');
    
    // Build insight banner HTML (only if insight exists)
    const insightHtml = insight ? `
        <div class="bh-incident-insight">
            ${this.esc(insight)}
        </div>
    ` : '';
    
    // Determine grid column count for CSS variation
    const itemCount = items.length;
    
    return `
        <div class="bh-slide bh-incident-cards-slide">
            <h2 class="bh-heading">${this.esc(data.title || '')}</h2>
            <div class="bh-incident-cards-grid" data-count="${itemCount}">
                ${cardsHtml}
            </div>
            ${insightHtml}
            <img class="bh-corner-logo" src="../v0.1.0/assets/blackhat/logo-white.png" alt="Black Hat" />
        </div>
    `;
};

/**
 * Surgical override of renderLayout to add new layout type
 * Preserves original behavior for all existing layouts
 */
(function() {
    const originalRenderLayout = SlidePage.prototype.renderLayout;
    
    SlidePage.prototype.renderLayout = function(layout, data) {
        // Handle new layout type
        if (layout === 'bh-incident-cards') {
            return this.renderBHIncidentCards(data);
        }
        
        // Fall back to original for all other layouts
        return originalRenderLayout.call(this, layout, data);
    };
})();

console.log('[v0.1.6] Layout registered: bh-incident-cards');
