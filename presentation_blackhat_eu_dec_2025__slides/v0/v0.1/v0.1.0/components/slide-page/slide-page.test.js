/* ═══════════════════════════════════════════════════════════════════════════════
   Slide Deck - Slide Page Component Tests
   v0.1.0 - Core MVP
   ═══════════════════════════════════════════════════════════════════════════════ */

QUnit.module('Slide Page', function(hooks) {

    hooks.before(async function(assert) {
        await TestUtils.loadCss(TestPaths.commonCss);
        await TestUtils.loadCss(TestPaths.slidePageCss);
        await TestUtils.loadScript(TestPaths.slidePage);
        assert.ok(customElements.get('slide-page'), 'slide-page should be registered');
    });

    hooks.afterEach(function() {
        TestUtils.cleanup();
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // Initialization Tests
    // ═══════════════════════════════════════════════════════════════════════════

    QUnit.test('component renders empty state without data', async function(assert) {
        const slide = await TestUtils.createComponent('slide-page');
        
        assert.ok(slide.querySelector('.slide-empty'), 'should show empty state');
        TestUtils.assertContainsText(assert, slide, 'Empty slide');
    });

    QUnit.test('constructor initializes properties', async function(assert) {
        const slide = await TestUtils.createComponent('slide-page');
        
        assert.strictEqual(slide.slideData, null, 'slideData should be null');
        assert.strictEqual(slide.slideIndex, 0, 'slideIndex should be 0');
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // setSlideData Tests
    // ═══════════════════════════════════════════════════════════════════════════

    QUnit.test('setSlideData renders title layout', async function(assert) {
        const slide = await TestUtils.createComponent('slide-page');
        
        slide.setSlideData({
            layout: 'title',
            title: 'My Presentation',
            subtitle: 'A great subtitle'
        }, 0);
        
        assert.ok(slide.querySelector('.layout-title'), 'should have title layout');
        TestUtils.assertContainsText(assert, slide.querySelector('.slide-title'), 'My Presentation');
        TestUtils.assertContainsText(assert, slide.querySelector('.slide-subtitle'), 'A great subtitle');
    });

    QUnit.test('setSlideData renders section layout', async function(assert) {
        const slide = await TestUtils.createComponent('slide-page');
        
        slide.setSlideData({
            layout: 'section',
            title: 'Section Title',
            subtitle: 'Section subtitle'
        }, 1);
        
        assert.ok(slide.querySelector('.layout-section'), 'should have section layout');
        TestUtils.assertContainsText(assert, slide.querySelector('.section-title'), 'Section Title');
    });

    QUnit.test('setSlideData renders bullets layout', async function(assert) {
        const slide = await TestUtils.createComponent('slide-page');
        
        slide.setSlideData({
            layout: 'bullets',
            title: 'Key Points',
            content: ['Point one', 'Point two', 'Point three']
        }, 2);
        
        assert.ok(slide.querySelector('.layout-bullets'), 'should have bullets layout');
        const items = slide.querySelectorAll('.bullet-list li');
        assert.strictEqual(items.length, 3, 'should have 3 bullet items');
        TestUtils.assertContainsText(assert, items[0], 'Point one');
    });

    QUnit.test('setSlideData renders two-column layout', async function(assert) {
        const slide = await TestUtils.createComponent('slide-page');
        
        slide.setSlideData({
            layout: 'two-column',
            title: 'Comparison',
            content: ['Left content', 'Right content']
        }, 3);
        
        assert.ok(slide.querySelector('.layout-two-column'), 'should have two-column layout');
        const columns = slide.querySelectorAll('.column');
        assert.strictEqual(columns.length, 2, 'should have 2 columns');
    });

    QUnit.test('setSlideData renders default layout', async function(assert) {
        const slide = await TestUtils.createComponent('slide-page');
        
        slide.setSlideData({
            layout: 'default',
            title: 'Default Title',
            content: 'Some paragraph content'
        }, 4);
        
        assert.ok(slide.querySelector('.layout-default'), 'should have default layout');
        TestUtils.assertContainsText(assert, slide.querySelector('.slide-body'), 'Some paragraph');
    });

    QUnit.test('setSlideData sets data attributes', async function(assert) {
        const slide = await TestUtils.createComponent('slide-page');
        
        slide.setSlideData({
            layout: 'bullets',
            title: 'Test',
            content: ['Item'],
            notes: 'Speaker notes here'
        }, 5);
        
        assert.strictEqual(slide.getAttribute('data-layout'), 'bullets', 'should set layout attribute');
        assert.strictEqual(slide.getAttribute('data-index'), '5', 'should set index attribute');
        assert.strictEqual(slide.getAttribute('data-notes'), 'Speaker notes here', 'should set notes attribute');
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // Active State Tests
    // ═══════════════════════════════════════════════════════════════════════════

    QUnit.test('active attribute toggles active class', async function(assert) {
        const slide = await TestUtils.createComponent('slide-page');
        
        assert.notOk(slide.classList.contains('active'), 'should not be active initially');
        
        slide.setAttribute('active', '');
        await TestUtils.nextFrame();
        assert.ok(slide.classList.contains('active'), 'should be active after setting attribute');
        
        slide.removeAttribute('active');
        await TestUtils.nextFrame();
        assert.notOk(slide.classList.contains('active'), 'should not be active after removing attribute');
    });

    QUnit.test('isActive returns correct state', async function(assert) {
        const slide = await TestUtils.createComponent('slide-page');
        
        assert.strictEqual(slide.isActive(), false, 'should return false when inactive');
        
        slide.setAttribute('active', '');
        assert.strictEqual(slide.isActive(), true, 'should return true when active');
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // getSlideData Tests
    // ═══════════════════════════════════════════════════════════════════════════

    QUnit.test('getSlideData returns the slide data', async function(assert) {
        const slide = await TestUtils.createComponent('slide-page');
        const data = { layout: 'title', title: 'Test' };
        
        slide.setSlideData(data, 0);
        
        assert.deepEqual(slide.getSlideData(), data, 'should return the slide data');
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // HTML Escaping Tests
    // ═══════════════════════════════════════════════════════════════════════════

    QUnit.test('escapeHtml prevents XSS', async function(assert) {
        const slide = await TestUtils.createComponent('slide-page');
        
        slide.setSlideData({
            layout: 'default',
            title: '<script>alert("xss")</script>',
            content: 'Safe content'
        }, 0);
        
        assert.notOk(slide.innerHTML.includes('<script>'), 'should escape script tags');
        assert.ok(slide.innerHTML.includes('&lt;script&gt;'), 'should show escaped content');
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // Image Layout Tests
    // ═══════════════════════════════════════════════════════════════════════════

    QUnit.test('image layout renders image from string', async function(assert) {
        const slide = await TestUtils.createComponent('slide-page');
        
        slide.setSlideData({
            layout: 'image',
            title: 'My Image',
            content: 'https://example.com/image.jpg'
        }, 0);
        
        const img = slide.querySelector('img');
        assert.ok(img, 'should have img element');
        assert.strictEqual(img.getAttribute('src'), 'https://example.com/image.jpg');
    });

    QUnit.test('image layout renders image from object', async function(assert) {
        const slide = await TestUtils.createComponent('slide-page');
        
        slide.setSlideData({
            layout: 'image',
            title: 'My Image',
            content: { src: 'https://example.com/photo.png', alt: 'Photo description' }
        }, 0);
        
        const img = slide.querySelector('img');
        assert.strictEqual(img.getAttribute('alt'), 'Photo description');
    });

});
