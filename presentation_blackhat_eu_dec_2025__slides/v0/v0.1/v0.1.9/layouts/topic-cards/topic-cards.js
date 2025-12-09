/* ═══════════════════════════════════════════════════════════════════════════════
   Layout: Topic Cards (bh-topic-cards)
   v0.1.9 - Registers category cards with bullet points

   Surgical override pattern:
   1. Add renderBHTopicCards method to prototype
   2. Wrap renderLayout to handle new layout type
   ═══════════════════════════════════════════════════════════════════════════════ */

/**
 * Render topic cards layout
 * @param {Object} data - Slide data with items array (each with label, points, color)
 * @returns {string} HTML string
 */
SlidePage.prototype.renderBHTopicCards = function(data) {
    const items = data.items || [];
    const insight = data.insight || '';
    const defaultColor = '#D81EBF'; // Black Hat magenta

    // Build cards HTML
    const cardsHtml = items.map(item => {
        const color = item.color || defaultColor;
        const label = this.esc(item.label || '');
        const points = item.points || [];

        // Build bullet points
        const pointsHtml = points.map(point => `
            <div class="bh-topic-card-point">${this.esc(point)}</div>
        `).join('');

        return `
            <div class="bh-topic-card" style="--card-color: ${color};">
                <div class="bh-topic-card-label">${label}</div>
                <div class="bh-topic-card-body">
                    ${pointsHtml}
                </div>
            </div>
        `;
    }).join('');

    // Build insight banner HTML (only if insight exists)
    const insightHtml = insight ? `
        <div class="bh-topic-insight">
            ${this.esc(insight)}
        </div>
    ` : '';

    // Item count for CSS grid variation
    const itemCount = items.length;

    return `
        <div class="bh-slide bh-topic-cards-slide">
            <h2 class="bh-heading">${this.esc(data.title || '')}</h2>
            <div class="bh-topic-cards-grid" data-count="${itemCount}">
                ${cardsHtml}
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
        if (layout === 'bh-topic-cards') {
            return this.renderBHTopicCards(data);
        }

        // Fall back to original for all other layouts
        return originalRenderLayout.call(this, layout, data);
    };
})();

console.log('[v0.1.9] Layout registered: bh-topic-cards');