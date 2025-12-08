/* ═══════════════════════════════════════════════════════════════════════════════
   Slide Deck - Slide Deck Component
   v0.1.0 - Core MVP (Static Loading)
   
   Container component that manages slide navigation, loading, and keyboard
   controls. Loads slides from static JSON files (no server API required).
   ═══════════════════════════════════════════════════════════════════════════════ */

class SlideDeck extends HTMLElement {
    constructor() {
        super();
        this.slides = [];
        this.currentIndex = 0;
        this.deckData = null;
        this.isLoading = false;

        // Bind methods for event listeners
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleHashChange = this.handleHashChange.bind(this);
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.loadSlides();
    }

    disconnectedCallback() {
        this.cleanup();
    }

    /**
     * Clean up event listeners to prevent memory leaks
     */
    cleanup() {
        document.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('hashchange', this.handleHashChange);
    }

    render() {
        this.innerHTML = `
            <div class="deck-container">
                <div class="slides-viewport">
                    <div class="slides-wrapper" id="slides-wrapper">
                        <!-- Slides inserted here -->
                    </div>
                </div>
                <nav class="deck-controls">
                    <button class="control-btn" id="btn-prev" title="Previous (←)" aria-label="Previous slide">
                        ‹
                    </button>
                    <div class="slide-counter">
                        <span id="current-slide">0</span>
                        <span class="counter-separator">/</span>
                        <span id="total-slides">0</span>
                    </div>
                    <button class="control-btn" id="btn-next" title="Next (→)" aria-label="Next slide">
                        ›
                    </button>
                </nav>
                <div class="deck-progress">
                    <div class="progress-bar" id="progress-bar"></div>
                </div>
            </div>
        `;

        this.slidesWrapper = this.querySelector('#slides-wrapper');
        this.updateCounter();
    }

    setupEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyDown);

        // Hash-based navigation (for direct links)
        window.addEventListener('hashchange', this.handleHashChange);

        // Button controls
        this.querySelector('#btn-prev').addEventListener('click', () => this.prevSlide());
        this.querySelector('#btn-next').addEventListener('click', () => this.nextSlide());

        // Touch/swipe support (basic)
        let touchStartX = 0;
        this.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        this.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) this.nextSlide();
                else this.prevSlide();
            }
        }, { passive: true });
    }

    handleKeyDown(e) {
        // Ignore if user is typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
            case 'PageDown':
                e.preventDefault();
                this.nextSlide();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                this.prevSlide();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                this.goToSlide(this.slides.length - 1);
                break;
            case 'f':
            case 'F':
                if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    this.toggleFullscreen();
                }
                break;
        }
    }

    handleHashChange() {
        const hash = window.location.hash;
        const match = hash.match(/#slide-(\d+)/);
        if (match) {
            const index = parseInt(match[1], 10) - 1; // 1-indexed in URL
            if (index >= 0 && index < this.slides.length) {
                this.goToSlide(index, false); // Don't update hash again
            }
        }
    }

    /**
     * Load slides from static JSON file
     * Uses data-src attribute for relative path to JSON file
     */
    async loadSlides() {
        this.isLoading = true;
        this.showLoading();

        try {
            // Get the data source - relative path to static JSON file
            const dataSrc = this.getAttribute('data-src');
            
            if (!dataSrc) {
                throw new Error('No data-src attribute specified. Add data-src="decks/your-deck.json"');
            }

            // Fetch the static JSON file
            const response = await fetch(dataSrc);
            
            if (!response.ok) {
                throw new Error(`Failed to load ${dataSrc}: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            
            this.deckData = data;
            this.renderSlides(data.slides || data);
            
            // Apply deck metadata
            this.applyDeckMetadata(data);
            
            // Check for initial slide from hash
            this.handleHashChange();
            
            this.emitEvent('deck-loaded', { slideCount: this.slides.length, deck: data });
            
        } catch (error) {
            console.error('Failed to load slides:', error);
            this.showError(error.message);
            this.emitEvent('deck-error', { error: error.message });
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Apply deck metadata (title, theme, etc.)
     */
    applyDeckMetadata(data) {
        // Update page title if deck has a title
        if (data.title) {
            document.title = data.title;
        }

        // Apply theme class if specified
        if (data.theme === 'light') {
            this.classList.add('theme-light');
        } else {
            this.classList.remove('theme-light');
        }
    }

    /**
     * Render slides from data array
     */
    renderSlides(slidesData) {
        if (!Array.isArray(slidesData)) {
            slidesData = [slidesData];
        }

        this.slidesWrapper.innerHTML = '';
        this.slides = [];

        slidesData.forEach((slideData, index) => {
            const slidePage = document.createElement('slide-page');
            slidePage.setSlideData(slideData, index);
            
            if (index === 0) {
                slidePage.setAttribute('active', '');
            }
            
            this.slidesWrapper.appendChild(slidePage);
            this.slides.push(slidePage);
        });

        this.currentIndex = 0;
        this.updateCounter();
        this.updateProgress();
    }

    /**
     * Navigate to next slide
     */
    nextSlide() {
        if (this.currentIndex < this.slides.length - 1) {
            this.goToSlide(this.currentIndex + 1);
        }
    }

    /**
     * Navigate to previous slide
     */
    prevSlide() {
        if (this.currentIndex > 0) {
            this.goToSlide(this.currentIndex - 1);
        }
    }

    /**
     * Go to specific slide
     * @param {number} index - Slide index (0-based)
     * @param {boolean} updateHash - Whether to update URL hash
     */
    goToSlide(index, updateHash = true) {
        if (index < 0 || index >= this.slides.length) return;
        if (index === this.currentIndex) return;

        // Remove active from current
        this.slides[this.currentIndex].removeAttribute('active');
        
        // Set new active
        this.currentIndex = index;
        this.slides[this.currentIndex].setAttribute('active', '');

        this.updateCounter();
        this.updateProgress();

        if (updateHash) {
            window.history.replaceState(null, '', `#slide-${index + 1}`);
        }

        this.emitEvent('slide-changed', { 
            index: this.currentIndex, 
            slide: this.slides[this.currentIndex].getSlideData() 
        });
    }

    /**
     * Update slide counter display
     */
    updateCounter() {
        const currentEl = this.querySelector('#current-slide');
        const totalEl = this.querySelector('#total-slides');
        
        if (currentEl) currentEl.textContent = this.currentIndex + 1;
        if (totalEl) totalEl.textContent = this.slides.length;
    }

    /**
     * Update progress bar
     */
    updateProgress() {
        const progressBar = this.querySelector('#progress-bar');
        if (progressBar && this.slides.length > 0) {
            const progress = ((this.currentIndex + 1) / this.slides.length) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }

    /**
     * Toggle fullscreen mode
     */
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.requestFullscreen().catch(err => {
                console.warn('Fullscreen not available:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    /**
     * Show loading state
     */
    showLoading() {
        this.slidesWrapper.innerHTML = `
            <div class="deck-loading">
                <div class="loading-spinner"></div>
                <p>Loading slides...</p>
            </div>
        `;
    }

    /**
     * Show error state
     */
    showError(message) {
        this.slidesWrapper.innerHTML = `
            <div class="deck-error">
                <p class="error-icon">⚠️</p>
                <p class="error-message">Failed to load slides</p>
                <p class="error-detail">${this.escapeHtml(message)}</p>
                <button class="retry-btn" onclick="this.closest('slide-deck').loadSlides()">
                    Retry
                </button>
            </div>
        `;
    }

    /**
     * Emit custom event
     */
    emitEvent(name, detail) {
        this.dispatchEvent(new CustomEvent(name, {
            detail,
            bubbles: true
        }));
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Get current slide index
     */
    getCurrentIndex() {
        return this.currentIndex;
    }

    /**
     * Get total slide count
     */
    getSlideCount() {
        return this.slides.length;
    }

    /**
     * Get deck metadata
     */
    getDeckData() {
        return this.deckData;
    }
}

customElements.define('slide-deck', SlideDeck);
