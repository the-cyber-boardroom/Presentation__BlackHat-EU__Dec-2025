/* ═══════════════════════════════════════════════════════════════════════════════
   Slide Deck - Test Path Configuration
   v0.1.0 - Core MVP
   
   Centralized path management for tests.
   All paths relative to v0.1.0 (self-contained major version).
   ═══════════════════════════════════════════════════════════════════════════════ */

const TestPaths = {
    // Base path for v0.1.0
    BASE_PATH: '/versions/v0.1.0',
    
    // Version info
    VERSIONS: {
        V0_1_0: 'v0.1.0'
    },

    /**
     * Get path for a component in a version
     * @param {string} version
     * @param {string} componentPath
     * @returns {string}
     */
    getComponentPath(version, componentPath) {
        return `${this.BASE_PATH}/${componentPath}`;
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // Component Paths
    // ═══════════════════════════════════════════════════════════════════════════
    
    get slideDeck() {
        return `${this.BASE_PATH}/components/slide-deck/slide-deck.js`;
    },
    
    get slidePage() {
        return `${this.BASE_PATH}/components/slide-page/slide-page.js`;
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // Service Paths
    // ═══════════════════════════════════════════════════════════════════════════
    
    get apiClient() {
        return `${this.BASE_PATH}/js/api-client.js`;
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // CSS Paths
    // ═══════════════════════════════════════════════════════════════════════════
    
    get commonCss() {
        return `${this.BASE_PATH}/css/common.css`;
    },
    
    get slideDeckCss() {
        return `${this.BASE_PATH}/components/slide-deck/slide-deck.css`;
    },
    
    get slidePageCss() {
        return `${this.BASE_PATH}/components/slide-page/slide-page.css`;
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // Asset Paths
    // ═══════════════════════════════════════════════════════════════════════════
    
    getSamplePath(sampleName) {
        return `${this.BASE_PATH}/assets/${sampleName}.json`;
    }
};

// Freeze to prevent modification
Object.freeze(TestPaths.VERSIONS);

// Make available globally
window.TestPaths = TestPaths;

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestPaths;
}
