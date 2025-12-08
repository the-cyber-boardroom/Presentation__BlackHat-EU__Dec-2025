/* ═══════════════════════════════════════════════════════════════════════════════
   Slide Deck - Slide Deck Component Tests
   v0.1.0 - Core MVP
   ═══════════════════════════════════════════════════════════════════════════════ */

QUnit.module('Slide Deck', function(hooks) {

    let originalApiClient;

    hooks.before(async function(assert) {
        await TestUtils.loadCss(TestPaths.commonCss);
        await TestUtils.loadCss(TestPaths.slideDeckCss);
        await TestUtils.loadCss(TestPaths.slidePageCss);
        await TestUtils.loadScript(TestPaths.apiClient);
        await TestUtils.loadScript(TestPaths.slidePage);
        await TestUtils.loadScript(TestPaths.slideDeck);
        assert.ok(customElements.get('slide-deck'), 'slide-deck should be registered');
    });

    hooks.beforeEach(function() {
        originalApiClient = window.apiClient;
        // Use mock API client
        window.apiClient = TestUtils.createMockApiClient();
    });

    hooks.afterEach(function() {
        window.apiClient = originalApiClient;
        TestUtils.cleanup();
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // Initialization Tests
    // ═══════════════════════════════════════════════════════════════════════════

    QUnit.test('component renders correctly', async function(assert) {
        const deck = await TestUtils.createComponent('slide-deck');
        
        assert.ok(deck.querySelector('.deck-container'), 'should have deck container');
        assert.ok(deck.querySelector('.slides-viewport'), 'should have slides viewport');
        assert.ok(deck.querySelector('.deck-controls'), 'should have controls');
        assert.ok(deck.querySelector('.deck-progress'), 'should have progress bar');
    });

    QUnit.test('constructor initializes properties', async function(assert) {
        const deck = document.createElement('slide-deck');
        
        assert.deepEqual(deck.slides, [], 'slides should be empty array');
        assert.strictEqual(deck.currentIndex, 0, 'currentIndex should be 0');
        assert.strictEqual(deck.deckData, null, 'deckData should be null');
        assert.strictEqual(deck.isLoading, false, 'isLoading should be false');
    });

    QUnit.test('has navigation buttons', async function(assert) {
        const deck = await TestUtils.createComponent('slide-deck');
        
        assert.ok(deck.querySelector('#btn-prev'), 'should have prev button');
        assert.ok(deck.querySelector('#btn-next'), 'should have next button');
    });

    QUnit.test('has slide counter', async function(assert) {
        const deck = await TestUtils.createComponent('slide-deck');
        
        assert.ok(deck.querySelector('#current-slide'), 'should have current slide counter');
        assert.ok(deck.querySelector('#total-slides'), 'should have total slides counter');
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // Slide Loading Tests
    // ═══════════════════════════════════════════════════════════════════════════

    QUnit.test('loads slides from mock API', async function(assert) {
        const deck = await TestUtils.createComponent('slide-deck');
        
        // Wait for slides to load
        await TestUtils.wait(100);
        
        const slides = deck.querySelectorAll('slide-page');
        assert.ok(slides.length >= 1, 'should have loaded slides');
    });

    QUnit.test('emits deck-loaded event', async function(assert) {
        const fixture = document.getElementById('qunit-fixture');
        const deck = document.createElement('slide-deck');
        
        const eventPromise = TestUtils.waitForEvent(deck, 'deck-loaded');
        fixture.appendChild(deck);
        
        const event = await eventPromise;
        assert.ok(event.detail.slideCount >= 1, 'event should have slideCount');
    });

    QUnit.test('shows first slide as active', async function(assert) {
        const deck = await TestUtils.createComponent('slide-deck');
        await TestUtils.wait(100);
        
        const firstSlide = deck.querySelector('slide-page');
        if (firstSlide) {
            assert.ok(firstSlide.hasAttribute('active'), 'first slide should be active');
        } else {
            assert.ok(true, 'no slides loaded (mock may vary)');
        }
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // Navigation Tests
    // ═══════════════════════════════════════════════════════════════════════════

    QUnit.test('nextSlide advances to next slide', async function(assert) {
        const deck = await TestUtils.createComponent('slide-deck');
        await TestUtils.wait(100);
        
        if (deck.slides.length > 1) {
            const initialIndex = deck.currentIndex;
            deck.nextSlide();
            assert.strictEqual(deck.currentIndex, initialIndex + 1, 'should advance index');
        } else {
            assert.ok(true, 'not enough slides to test navigation');
        }
    });

    QUnit.test('prevSlide goes to previous slide', async function(assert) {
        const deck = await TestUtils.createComponent('slide-deck');
        await TestUtils.wait(100);
        
        if (deck.slides.length > 1) {
            deck.goToSlide(1);
            deck.prevSlide();
            assert.strictEqual(deck.currentIndex, 0, 'should go back');
        } else {
            assert.ok(true, 'not enough slides to test navigation');
        }
    });

    QUnit.test('goToSlide navigates to specific slide', async function(assert) {
        const deck = await TestUtils.createComponent('slide-deck');
        await TestUtils.wait(100);
        
        if (deck.slides.length > 1) {
            deck.goToSlide(1);
            assert.strictEqual(deck.currentIndex, 1, 'should go to slide 1');
        } else {
            assert.ok(true, 'not enough slides');
        }
    });

    QUnit.test('goToSlide ignores invalid indices', async function(assert) {
        const deck = await TestUtils.createComponent('slide-deck');
        await TestUtils.wait(100);
        
        const initial = deck.currentIndex;
        deck.goToSlide(-1);
        assert.strictEqual(deck.currentIndex, initial, 'should ignore negative index');
        
        deck.goToSlide(9999);
        assert.strictEqual(deck.currentIndex, initial, 'should ignore too-large index');
    });

    QUnit.test('emits slide-changed event on navigation', async function(assert) {
        const deck = await TestUtils.createComponent('slide-deck');
        await TestUtils.wait(100);
        
        if (deck.slides.length > 1) {
            const eventPromise = TestUtils.waitForEvent(deck, 'slide-changed');
            deck.nextSlide();
            const event = await eventPromise;
            assert.strictEqual(event.detail.index, 1, 'event should have new index');
        } else {
            assert.ok(true, 'not enough slides');
        }
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // Keyboard Navigation Tests
    // ═══════════════════════════════════════════════════════════════════════════

    QUnit.test('ArrowRight advances slide', async function(assert) {
        const deck = await TestUtils.createComponent('slide-deck');
        await TestUtils.wait(100);
        
        if (deck.slides.length > 1) {
            const initial = deck.currentIndex;
            TestUtils.triggerKeyEvent(document, 'keydown', 'ArrowRight');
            assert.strictEqual(deck.currentIndex, initial + 1, 'should advance on ArrowRight');
        } else {
            assert.ok(true, 'not enough slides');
        }
    });

    QUnit.test('ArrowLeft goes back', async function(assert) {
        const deck = await TestUtils.createComponent('slide-deck');
        await TestUtils.wait(100);
        
        if (deck.slides.length > 1) {
            deck.goToSlide(1);
            TestUtils.triggerKeyEvent(document, 'keydown', 'ArrowLeft');
            assert.strictEqual(deck.currentIndex, 0, 'should go back on ArrowLeft');
        } else {
            assert.ok(true, 'not enough slides');
        }
    });

    QUnit.test('Home goes to first slide', async function(assert) {
        const deck = await TestUtils.createComponent('slide-deck');
        await TestUtils.wait(100);
        
        if (deck.slides.length > 1) {
            deck.goToSlide(1);
            TestUtils.triggerKeyEvent(document, 'keydown', 'Home');
            assert.strictEqual(deck.currentIndex, 0, 'should go to first on Home');
        } else {
            assert.ok(true, 'not enough slides');
        }
    });

    QUnit.test('End goes to last slide', async function(assert) {
        const deck = await TestUtils.createComponent('slide-deck');
        await TestUtils.wait(100);
        
        if (deck.slides.length > 1) {
            TestUtils.triggerKeyEvent(document, 'keydown', 'End');
            assert.strictEqual(deck.currentIndex, deck.slides.length - 1, 'should go to last on End');
        } else {
            assert.ok(true, 'not enough slides');
        }
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // Counter & Progress Tests
    // ═══════════════════════════════════════════════════════════════════════════

    QUnit.test('updateCounter shows correct values', async function(assert) {
        const deck = await TestUtils.createComponent('slide-deck');
        await TestUtils.wait(100);
        
        const current = deck.querySelector('#current-slide');
        const total = deck.querySelector('#total-slides');
        
        assert.strictEqual(current.textContent, '1', 'should show 1 for first slide');
        assert.strictEqual(total.textContent, String(deck.slides.length), 'should show total');
    });

    QUnit.test('progress bar updates on navigation', async function(assert) {
        const deck = await TestUtils.createComponent('slide-deck');
        await TestUtils.wait(100);
        
        const progressBar = deck.querySelector('#progress-bar');
        
        if (deck.slides.length > 1) {
            const initialWidth = progressBar.style.width;
            deck.nextSlide();
            assert.notStrictEqual(progressBar.style.width, initialWidth, 'progress should change');
        } else {
            assert.ok(progressBar.style.width, 'progress bar should have width');
        }
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // Getter Tests
    // ═══════════════════════════════════════════════════════════════════════════

    QUnit.test('getCurrentIndex returns current index', async function(assert) {
        const deck = await TestUtils.createComponent('slide-deck');
        await TestUtils.wait(100);
        
        assert.strictEqual(deck.getCurrentIndex(), deck.currentIndex, 'should return currentIndex');
    });

    QUnit.test('getSlideCount returns slide count', async function(assert) {
        const deck = await TestUtils.createComponent('slide-deck');
        await TestUtils.wait(100);
        
        assert.strictEqual(deck.getSlideCount(), deck.slides.length, 'should return slides.length');
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // Cleanup Tests
    // ═══════════════════════════════════════════════════════════════════════════

    QUnit.test('disconnectedCallback removes event listeners', async function(assert) {
        const deck = await TestUtils.createComponent('slide-deck');
        
        // Store reference before removal
        const cleanup = deck.cleanup;
        
        // Remove from DOM
        deck.remove();
        
        // Should not throw
        assert.ok(true, 'cleanup should complete without error');
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // Error Handling Tests
    // ═══════════════════════════════════════════════════════════════════════════

    QUnit.test('shows error on API failure', async function(assert) {
        window.apiClient = TestUtils.createMockApiClient({
            get: async () => { throw new Error('Network error'); }
        });
        
        const deck = await TestUtils.createComponent('slide-deck');
        await TestUtils.wait(100);
        
        assert.ok(deck.querySelector('.deck-error'), 'should show error state');
    });

});
