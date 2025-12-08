/* ═══════════════════════════════════════════════════════════════════════════════
   Slide Deck - Slide Page Component
   v0.1.0 - Core MVP
   
   Individual slide container that renders content and handles slide-specific
   styling and layout.
   ═══════════════════════════════════════════════════════════════════════════════ */

class SlidePage extends HTMLElement {
    constructor() {
        super();
        this.slideData = null;
        this.slideIndex = 0;
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['active'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'active') {
            this.classList.toggle('active', newValue !== null);
        }
    }

    /**
     * Set slide content data
     * @param {object} data - Slide data with title, content, layout, etc.
     * @param {number} index - Slide index in deck
     */
    setSlideData(data, index) {
        this.slideData = data;
        this.slideIndex = index;
        this.render();
    }

    render() {
        if (!this.slideData) {
            this.innerHTML = `
                <div class="slide-content slide-empty">
                    <p>Empty slide</p>
                </div>
            `;
            return;
        }

        const layout = this.slideData.layout || 'default';
        const title = this.slideData.title || '';
        const content = this.slideData.content || '';
        const subtitle = this.slideData.subtitle || '';
        const notes = this.slideData.notes || '';

        this.setAttribute('data-layout', layout);
        this.setAttribute('data-index', this.slideIndex);

        // Store notes as data attribute for potential speaker view
        if (notes) {
            this.setAttribute('data-notes', notes);
        }

        this.innerHTML = this.renderLayout(layout, { title, subtitle, content });
    }

    /**
     * Render slide based on layout type
     */
    renderLayout(layout, data) {
        switch (layout) {
            case 'title':
                return this.renderTitleLayout(data);
            case 'section':
                return this.renderSectionLayout(data);
            case 'two-column':
                return this.renderTwoColumnLayout(data);
            case 'image':
                return this.renderImageLayout(data);
            case 'bullets':
                return this.renderBulletsLayout(data);
            default:
                return this.renderDefaultLayout(data);
        }
    }

    renderTitleLayout({ title, subtitle }) {
        return `
            <div class="slide-content layout-title">
                <h1 class="slide-title">${this.escapeHtml(title)}</h1>
                ${subtitle ? `<p class="slide-subtitle">${this.escapeHtml(subtitle)}</p>` : ''}
            </div>
        `;
    }

    renderSectionLayout({ title, subtitle }) {
        return `
            <div class="slide-content layout-section">
                <h2 class="section-title">${this.escapeHtml(title)}</h2>
                ${subtitle ? `<p class="section-subtitle">${this.escapeHtml(subtitle)}</p>` : ''}
            </div>
        `;
    }

    renderTwoColumnLayout({ title, content }) {
        // Content should be an array of two items
        const columns = Array.isArray(content) ? content : [content, ''];
        return `
            <div class="slide-content layout-two-column">
                ${title ? `<h2 class="slide-heading">${this.escapeHtml(title)}</h2>` : ''}
                <div class="columns">
                    <div class="column">${this.renderContent(columns[0])}</div>
                    <div class="column">${this.renderContent(columns[1] || '')}</div>
                </div>
            </div>
        `;
    }

    renderImageLayout({ title, content }) {
        // Content is image URL or object with src/alt
        const img = typeof content === 'string' 
            ? { src: content, alt: title || 'Slide image' }
            : content;
        return `
            <div class="slide-content layout-image">
                ${title ? `<h2 class="slide-heading">${this.escapeHtml(title)}</h2>` : ''}
                <div class="image-container">
                    <img src="${this.escapeHtml(img.src)}" alt="${this.escapeHtml(img.alt || '')}" />
                </div>
            </div>
        `;
    }

    renderBulletsLayout({ title, content }) {
        // Content is array of bullet points
        const bullets = Array.isArray(content) ? content : [content];
        const bulletItems = bullets.map(b => `<li>${this.escapeHtml(b)}</li>`).join('');
        return `
            <div class="slide-content layout-bullets">
                ${title ? `<h2 class="slide-heading">${this.escapeHtml(title)}</h2>` : ''}
                <ul class="bullet-list">
                    ${bulletItems}
                </ul>
            </div>
        `;
    }

    renderDefaultLayout({ title, content }) {
        return `
            <div class="slide-content layout-default">
                ${title ? `<h2 class="slide-heading">${this.escapeHtml(title)}</h2>` : ''}
                <div class="slide-body">${this.renderContent(content)}</div>
            </div>
        `;
    }

    /**
     * Render content - handles string or structured content
     */
    renderContent(content) {
        if (!content) return '';
        if (typeof content === 'string') {
            // Simple text - wrap in paragraph
            return `<p>${this.escapeHtml(content)}</p>`;
        }
        if (Array.isArray(content)) {
            return content.map(c => this.renderContent(c)).join('');
        }
        // Object content - could be extended for rich content
        return `<p>${this.escapeHtml(JSON.stringify(content))}</p>`;
    }

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Get slide data
     */
    getSlideData() {
        return this.slideData;
    }

    /**
     * Check if this slide is currently active
     */
    isActive() {
        return this.hasAttribute('active');
    }
}

customElements.define('slide-page', SlidePage);
