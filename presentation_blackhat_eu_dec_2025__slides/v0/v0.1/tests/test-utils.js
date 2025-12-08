/* ═══════════════════════════════════════════════════════════════════════════════
   Slide Deck - Test Utilities
   v0.1.0 - Core MVP
   
   Shared utilities for testing Web Components
   ═══════════════════════════════════════════════════════════════════════════════ */

const TestUtils = {

    /**
     * Create a component and wait for it to connect
     * @param {string} tagName - Custom element tag name
     * @param {object} attributes - Attributes to set
     * @returns {Promise<HTMLElement>}
     */
    async createComponent(tagName, attributes = {}) {
        const fixture = document.getElementById('qunit-fixture');
        const element = document.createElement(tagName);
        
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        
        fixture.appendChild(element);
        await this.nextFrame();
        
        return element;
    },

    /**
     * Remove all components from fixture
     */
    cleanup() {
        const fixture = document.getElementById('qunit-fixture');
        if (fixture) {
            fixture.innerHTML = '';
        }
    },

    /**
     * Wait for next animation frame
     * @returns {Promise<void>}
     */
    nextFrame() {
        return new Promise(resolve => requestAnimationFrame(resolve));
    },

    /**
     * Wait for specified milliseconds
     * @param {number} ms
     * @returns {Promise<void>}
     */
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Wait for a custom event
     * @param {HTMLElement} element
     * @param {string} eventName
     * @param {number} timeout
     * @returns {Promise<CustomEvent>}
     */
    waitForEvent(element, eventName, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                reject(new Error(`Timeout waiting for event: ${eventName}`));
            }, timeout);
            
            element.addEventListener(eventName, (e) => {
                clearTimeout(timer);
                resolve(e);
            }, { once: true });
        });
    },

    /**
     * Trigger a DOM event
     * @param {HTMLElement} element
     * @param {string} eventType
     * @param {object} options
     */
    triggerEvent(element, eventType, options = {}) {
        const event = new Event(eventType, { bubbles: true, ...options });
        element.dispatchEvent(event);
    },

    /**
     * Trigger a keyboard event
     * @param {HTMLElement} element
     * @param {string} eventType
     * @param {string} key
     * @param {object} modifiers
     */
    triggerKeyEvent(element, eventType, key, modifiers = {}) {
        const event = new KeyboardEvent(eventType, {
            key,
            bubbles: true,
            cancelable: true,
            ...modifiers
        });
        element.dispatchEvent(event);
    },

    /**
     * Load a script dynamically
     * @param {string} src
     * @returns {Promise<void>}
     */
    loadScript(src) {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Failed to load: ${src}`));
            document.head.appendChild(script);
        });
    },

    /**
     * Load CSS dynamically
     * @param {string} href
     * @returns {Promise<void>}
     */
    loadCss(href) {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`link[href="${href}"]`)) {
                resolve();
                return;
            }
            
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = resolve;
            link.onerror = () => reject(new Error(`Failed to load: ${href}`));
            document.head.appendChild(link);
        });
    },

    /**
     * Create mock API client
     * @param {object} overrides
     * @returns {object}
     */
    createMockApiClient(overrides = {}) {
        return {
            get: async (endpoint) => {
                if (endpoint.includes('/api/slides') || endpoint.includes('/api/decks')) {
                    return {
                        id: 'test',
                        title: 'Test Deck',
                        slides: [
                            { layout: 'title', title: 'Test Slide 1' },
                            { layout: 'default', title: 'Test Slide 2', content: 'Content' }
                        ]
                    };
                }
                return {};
            },
            post: async () => ({}),
            checkHealth: async () => true,
            ...overrides
        };
    },

    /**
     * Sample slide data for testing
     */
    sampleSlides: [
        { layout: 'title', title: 'Test Title', subtitle: 'Subtitle' },
        { layout: 'bullets', title: 'Bullets', content: ['One', 'Two', 'Three'] },
        { layout: 'two-column', title: 'Columns', content: ['Left', 'Right'] },
        { layout: 'default', title: 'Default', content: 'Some content here.' }
    ],

    /**
     * Assert element contains text
     * @param {object} assert - QUnit assert
     * @param {HTMLElement} element
     * @param {string} text
     * @param {string} message
     */
    assertContainsText(assert, element, text, message) {
        const content = element.textContent || element.innerText;
        assert.ok(content.includes(text), message || `Should contain: ${text}`);
    },

    /**
     * Assert element has attribute value
     * @param {object} assert
     * @param {HTMLElement} element
     * @param {string} attr
     * @param {string} value
     * @param {string} message
     */
    assertAttribute(assert, element, attr, value, message) {
        assert.strictEqual(
            element.getAttribute(attr), 
            value, 
            message || `Attribute ${attr} should be ${value}`
        );
    }
};

// Make available globally
window.TestUtils = TestUtils;

// Export for Node.js if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestUtils;
}
