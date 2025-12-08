/* ═══════════════════════════════════════════════════════════════════════════════
   Slide Deck - Slide Page Component
   v0.1.0 - Core MVP (with BlackHat EU 2025 Layouts)
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

    setSlideData(data, index) {
        this.slideData = data;
        this.slideIndex = index;
        this.render();
    }

    render() {
        if (!this.slideData) {
            this.innerHTML = `<div class="slide-content slide-empty"><p>Empty slide</p></div>`;
            return;
        }

        const layout = this.slideData.layout || 'default';
        this.setAttribute('data-layout', layout);
        this.setAttribute('data-index', this.slideIndex);
        if (this.slideData.notes) {
            this.setAttribute('data-notes', this.slideData.notes);
        }

        this.innerHTML = this.renderLayout(layout, this.slideData);
    }

    renderLayout(layout, data) {
        switch (layout) {
            // BlackHat EU 2025 layouts
            case 'bh-cover':
                return this.renderBHCover(data);
            case 'bh-title':
                return this.renderBHTitle(data);
            case 'bh-section':
                return this.renderBHSection(data);
            case 'bh-content':
                return this.renderBHContent(data);
            case 'bh-comparison':
                return this.renderBHComparison(data);
            case 'bh-speaker':
                return this.renderBHSpeaker(data);
            case 'bh-speakers-2':
                return this.renderBHSpeakers2(data);
            case 'bh-speakers-6':
                return this.renderBHSpeakers6(data);
            case 'bh-image-left':
                return this.renderBHImageSide(data, 'left');
            case 'bh-image-right':
                return this.renderBHImageSide(data, 'right');
            case 'bh-image-below':
                return this.renderBHImageBelow(data);
            case 'bh-agenda':
                return this.renderBHAgenda(data);
            // Standard layouts
            case 'title':
                return this.renderTitleLayout(data);
            case 'section':
                return this.renderSectionLayout(data);
            case 'bullets':
                return this.renderBulletsLayout(data);
            case 'two-column':
                return this.renderTwoColumnLayout(data);
            default:
                return this.renderDefaultLayout(data);
        }
    }

    /* ═══════════════════════════════════════════════════════════════════════════
       BlackHat EU 2025 Layouts
       ═══════════════════════════════════════════════════════════════════════════ */

    renderBHCover(data) {
        return `
            <div class="bh-slide bh-cover">
                <div class="bh-cover-content">
                    <img class="bh-cover-logo" src="assets/blackhat/logo-white-large.png" alt="Black Hat Europe 2025" />
                    <div class="bh-cover-date">${this.esc(data.date || 'DECEMBER 8-11, 2025')}</div>
                    <div class="bh-cover-location">${this.esc(data.location || 'EXCEL LONDON / UNITED KINGDOM')}</div>
                </div>
            </div>
        `;
    }

    renderBHTitle(data) {
        return `
            <div class="bh-slide bh-title-slide">
                <img class="bh-header-logo" src="assets/blackhat/logo-white.png" alt="Black Hat Europe 2025" />
                <div class="bh-title-content">
                    <h1 class="bh-title">${this.esc(data.title || 'INSERT TITLE')}</h1>
                    ${data.subtitle ? `<div class="bh-subtitle">${this.esc(data.subtitle)}</div>` : ''}
                </div>
                <div class="bh-footer">
                    <span class="bh-hashtag">#BHEU</span>
                    <span class="bh-divider">|</span>
                    <span class="bh-handle">@BlackHatEvents</span>
                </div>
            </div>
        `;
    }

    renderBHSection(data) {
        return `
            <div class="bh-slide bh-section-slide">
                <img class="bh-center-logo" src="assets/blackhat/logo-white.png" alt="Black Hat Europe 2025" />
                <div class="bh-section-content">
                    <h2 class="bh-section-title">${this.esc(data.title || 'SECTION')}</h2>
                    ${data.subtitle ? `<div class="bh-section-subtitle">${this.esc(data.subtitle)}</div>` : ''}
                </div>
            </div>
        `;
    }

    renderBHContent(data) {
        const content = data.content || [];
        return `
            <div class="bh-slide bh-content-slide">
                <h2 class="bh-heading">${this.esc(data.title || '')}</h2>
                <div class="bh-body">
                    ${this.renderBHBullets(content)}
                </div>
                <img class="bh-corner-logo" src="assets/blackhat/logo-footer.png" alt="Black Hat" />
            </div>
        `;
    }

    renderBHBullets(items, level = 1) {
        if (!Array.isArray(items)) items = [items];
        if (items.length === 0) return '';
        
        const className = `bh-bullets bh-level-${level}`;
        const bullets = items.map(item => {
            if (typeof item === 'object' && item.text !== undefined) {
                const children = item.children ? this.renderBHBullets(item.children, level + 1) : '';
                return `<li>${this.esc(item.text)}${children}</li>`;
            }
            return `<li>${this.esc(String(item))}</li>`;
        }).join('');
        
        return `<ul class="${className}">${bullets}</ul>`;
    }

    renderBHComparison(data) {
        const cols = data.columns || [{header: 'Header', content: []}, {header: 'Header', content: []}];
        return `
            <div class="bh-slide bh-comparison-slide">
                <h2 class="bh-heading">${this.esc(data.title || '')}</h2>
                <div class="bh-comparison-grid">
                    ${cols.map(col => `
                        <div class="bh-comparison-col">
                            <div class="bh-comparison-header">${this.esc(col.header || 'Header')}</div>
                            <div class="bh-comparison-body">
                                ${this.renderBHBullets(col.content || [])}
                            </div>
                        </div>
                    `).join('')}
                </div>
                <img class="bh-corner-logo" src="assets/blackhat/logo-footer.png" alt="Black Hat" />
            </div>
        `;
    }

    renderBHSpeaker(data) {
        return `
            <div class="bh-slide bh-speaker-slide">
                <div class="bh-speaker-photo-wrap">
                    <img class="bh-speaker-photo" src="${this.esc(data.photo || 'assets/blackhat/image3.jpg')}" alt="${this.esc(data.name || '')}" />
                </div>
                <div class="bh-speaker-info">
                    <h2 class="bh-speaker-name">${this.esc(data.name || 'FIRST NAME LAST NAME')}</h2>
                    <div class="bh-speaker-title">${this.esc(data.role || 'Title, Company')}</div>
                </div>
                <img class="bh-corner-logo" src="assets/blackhat/logo-footer.png" alt="Black Hat" />
            </div>
        `;
    }

    renderBHSpeakers2(data) {
        const speakers = data.speakers || [{}, {}];
        return `
            <div class="bh-slide bh-speakers-2-slide">
                <div class="bh-speakers-grid-2">
                    ${speakers.slice(0, 2).map(s => `
                        <div class="bh-speaker-card">
                            <img class="bh-speaker-photo" src="${this.esc(s.photo || 'assets/blackhat/image3.jpg')}" alt="${this.esc(s.name || '')}" />
                            <h3 class="bh-speaker-name">${this.esc(s.name || 'FIRST NAME\\nLAST NAME').replace('\\n', '<br>')}</h3>
                            <div class="bh-speaker-title">${this.esc(s.role || 'Title, Company')}</div>
                        </div>
                    `).join('')}
                </div>
                <img class="bh-corner-logo" src="assets/blackhat/logo-footer.png" alt="Black Hat" />
            </div>
        `;
    }

    renderBHSpeakers6(data) {
        const speakers = data.speakers || [{}, {}, {}, {}, {}, {}];
        return `
            <div class="bh-slide bh-speakers-6-slide">
                <div class="bh-speakers-grid-6">
                    ${speakers.slice(0, 6).map(s => `
                        <div class="bh-speaker-row">
                            <img class="bh-speaker-photo-sm" src="${this.esc(s.photo || 'assets/blackhat/image3.jpg')}" alt="${this.esc(s.name || '')}" />
                            <div class="bh-speaker-details">
                                <h3 class="bh-speaker-name">${this.esc(s.name || 'FIRST NAME LAST NAME')}</h3>
                                <div class="bh-speaker-title">${this.esc(s.role || 'Title, Company')}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <img class="bh-corner-logo" src="assets/blackhat/logo-footer.png" alt="Black Hat" />
            </div>
        `;
    }

    renderBHImageSide(data, side) {
        const contentFirst = side === 'left';
        return `
            <div class="bh-slide bh-image-side-slide bh-image-${side}">
                <div class="bh-image-side-content" style="order: ${contentFirst ? 1 : 2}">
                    <h2 class="bh-side-title">${this.esc(data.title || 'TITLE AND IMAGE')}</h2>
                </div>
                <div class="bh-image-side-image" style="order: ${contentFirst ? 2 : 1}">
                    <img src="${this.esc(data.image || 'assets/blackhat/image6.jpg')}" alt="${this.esc(data.title || '')}" />
                </div>
                <img class="bh-corner-logo" src="assets/blackhat/logo-footer.png" alt="Black Hat" />
            </div>
        `;
    }

    renderBHImageBelow(data) {
        return `
            <div class="bh-slide bh-image-below-slide">
                <h2 class="bh-heading">${this.esc(data.title || 'TITLE AND IMAGE')}</h2>
                <div class="bh-image-container">
                    <img src="${this.esc(data.image || 'assets/blackhat/image8.jpg')}" alt="${this.esc(data.title || '')}" />
                </div>
                <img class="bh-corner-logo" src="assets/blackhat/logo-footer.png" alt="Black Hat" />
            </div>
        `;
    }

    renderBHAgenda(data) {
        const items = data.items || [];
        return `
            <div class="bh-slide bh-agenda-slide">
                <h2 class="bh-heading">${this.esc(data.title || 'AGENDA')}</h2>
                <div class="bh-agenda-subtitle">${this.esc(data.subtitle || 'Daily Schedule')}</div>
                <div class="bh-agenda-date-row">
                    <span class="bh-agenda-date">${this.esc(data.date || 'Monday, Dec 8')}</span>
                    <span class="bh-agenda-time-label">Time</span>
                </div>
                <div class="bh-agenda-items">
                    ${items.map(item => `
                        <div class="bh-agenda-item">
                            <span class="bh-agenda-item-title">${this.esc(item.title || '')}</span>
                            <span class="bh-agenda-item-time">${this.esc(item.time || '')}</span>
                        </div>
                    `).join('')}
                </div>
                <img class="bh-corner-logo" src="assets/blackhat/logo-footer.png" alt="Black Hat" />
            </div>
        `;
    }

    /* ═══════════════════════════════════════════════════════════════════════════
       Standard Layouts (fallback)
       ═══════════════════════════════════════════════════════════════════════════ */

    renderTitleLayout(data) {
        return `
            <div class="slide-content layout-title">
                <h1 class="slide-title">${this.esc(data.title || '')}</h1>
                ${data.subtitle ? `<p class="slide-subtitle">${this.esc(data.subtitle)}</p>` : ''}
            </div>
        `;
    }

    renderSectionLayout(data) {
        return `
            <div class="slide-content layout-section">
                <h2 class="section-title">${this.esc(data.title || '')}</h2>
                ${data.subtitle ? `<p class="section-subtitle">${this.esc(data.subtitle)}</p>` : ''}
            </div>
        `;
    }

    renderBulletsLayout(data) {
        const bullets = Array.isArray(data.content) ? data.content : [data.content];
        return `
            <div class="slide-content layout-bullets">
                ${data.title ? `<h2 class="slide-heading">${this.esc(data.title)}</h2>` : ''}
                <ul class="bullet-list">
                    ${bullets.map(b => `<li>${this.esc(b)}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    renderTwoColumnLayout(data) {
        const cols = Array.isArray(data.content) ? data.content : [data.content, ''];
        return `
            <div class="slide-content layout-two-column">
                ${data.title ? `<h2 class="slide-heading">${this.esc(data.title)}</h2>` : ''}
                <div class="columns">
                    <div class="column"><p>${this.esc(cols[0] || '')}</p></div>
                    <div class="column"><p>${this.esc(cols[1] || '')}</p></div>
                </div>
            </div>
        `;
    }

    renderDefaultLayout(data) {
        return `
            <div class="slide-content layout-default">
                ${data.title ? `<h2 class="slide-heading">${this.esc(data.title)}</h2>` : ''}
                <div class="slide-body"><p>${this.esc(data.content || '')}</p></div>
            </div>
        `;
    }

    /* ═══════════════════════════════════════════════════════════════════════════
       Utilities
       ═══════════════════════════════════════════════════════════════════════════ */

    esc(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    getSlideData() {
        return this.slideData;
    }

    isActive() {
        return this.hasAttribute('active');
    }
}

customElements.define('slide-page', SlidePage);
