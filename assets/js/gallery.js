// assets/js/gallery.js
//
// Attaches lightbox behaviour to all `.image-gallery` containers on the page.
// Figures inside a gallery are treated as a navigable group; clicking any
// figure opens the lightbox at that position.
//
// Full-image URL resolution (per figure):
//   1. figure > a[href]  — used when the figure shortcode's `link` param is set.
//   2. figure picture img[src]  — Hugo-processed local asset (webp or fallback).
//   3. figure img[src]  — static or remote image (no <picture> wrapper).
//
// Title resolution (per figure):
//   1. figcaption > h4 text — from figure's `title` param.
//
// Caption resolution (per figure):
//   1. figcaption > p text — from figure's `caption` / `attr` params.
//   2. figcaption text     — fallback if no <p> child.
//   3. img[alt]            — last resort.

document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------------------------------------------------
    // Build lightbox DOM
    // The lightbox is created once and reused for every gallery on the page.
    // -------------------------------------------------------------------------

    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'lightbox-overlay';
    lightboxOverlay.id = 'imageLightbox';
    lightboxOverlay.setAttribute('role', 'dialog');
    lightboxOverlay.setAttribute('aria-modal', 'true');
    lightboxOverlay.setAttribute('aria-label', 'Image lightbox');

    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';

    const lightboxImage = document.createElement('img');
    lightboxImage.alt = 'Lightbox image';

    const lightboxTitle = document.createElement('div');
    lightboxTitle.className = 'lightbox-title';

    // aria-live: announces caption/title changes to screen readers when
    // navigating between images without closing the dialog.
    const lightboxCaption = document.createElement('div');
    lightboxCaption.className = 'lightbox-caption';
    lightboxCaption.setAttribute('aria-live', 'polite');

    const closeButton = document.createElement('span');
    closeButton.className = 'lightbox-close';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('role', 'button');
    closeButton.setAttribute('aria-label', 'Close lightbox');
    closeButton.setAttribute('tabindex', '0');

    const prevButton = document.createElement('span');
    prevButton.className = 'lightbox-nav prev';
    prevButton.innerHTML = '&#10094;';
    prevButton.setAttribute('role', 'button');
    prevButton.setAttribute('aria-label', 'Previous image');
    prevButton.setAttribute('tabindex', '0');

    const nextButton = document.createElement('span');
    nextButton.className = 'lightbox-nav next';
    nextButton.innerHTML = '&#10095;';
    nextButton.setAttribute('role', 'button');
    nextButton.setAttribute('aria-label', 'Next image');
    nextButton.setAttribute('tabindex', '0');

    lightboxContent.appendChild(lightboxImage);
    lightboxContent.appendChild(lightboxTitle);
    lightboxContent.appendChild(lightboxCaption);
    lightboxOverlay.appendChild(lightboxContent);
    lightboxOverlay.appendChild(closeButton);
    lightboxOverlay.appendChild(prevButton);
    lightboxOverlay.appendChild(nextButton);
    document.body.appendChild(lightboxOverlay);

    // -------------------------------------------------------------------------
    // Lightbox state
    // -------------------------------------------------------------------------

    /** @type {HTMLElement[]} Figures belonging to the currently open gallery. */
    let currentItems = [];

    /** @type {number} Index of the figure currently shown in the lightbox. */
    let currentIndex = 0;

    // -------------------------------------------------------------------------
    // Helper: resolve the full-size image URL from a figure element
    // -------------------------------------------------------------------------

    /**
     * Resolves the full-resolution image URL to open in the lightbox.
     *
     * Priority:
     *   1. data-fullsrc  — Hugo-generated full-res permalink (local assets in
     *                       gallery context, set by figure.html).
     *   2. figure > a[href] — manual override via figure's `link` param (only
     *                         present in standalone mode; suppressed in gallery).
     *   3. img[src]      — thumbnail src; used for remote/static images where
     *                       no separate full-res URL is available.
     *
     * @param {HTMLElement} figure
     * @returns {string}
     */
    function resolveImageUrl(figure) {
        // Priority 1: full-res URL injected by figure.html when inside a gallery.
        const fullSrc = figure.dataset.fullsrc;
        if (fullSrc) return fullSrc;

        // Priority 2: explicit link param (standalone figure, not suppressed).
        const anchor = figure.querySelector(':scope > a[href]');
        if (anchor) return anchor.getAttribute('href');

        // Priority 3: thumbnail src — remote / static images, no processing available.
        const img = figure.querySelector('img');
        return img ? img.getAttribute('src') : '';
    }

    // -------------------------------------------------------------------------
    // Helper: resolve title text from a figure element
    // -------------------------------------------------------------------------

    /**
     * Extracts the figure title from figcaption > h4 (figure's `title` param).
     * @param {HTMLElement} figure
     * @returns {string} Title string (may be empty).
     */
    function resolveTitle(figure) {
        const h4 = figure.querySelector('figcaption h4');
        return h4 ? h4.textContent.trim() : '';
    }

    // -------------------------------------------------------------------------
    // Helper: resolve caption text from a figure element
    // -------------------------------------------------------------------------

    /**
     * @param {HTMLElement} figure
     * @returns {string} Caption string (may be empty).
     */
    function resolveCaption(figure) {
        // Standard figure shortcode output: figcaption > p.
        const p = figure.querySelector('figcaption p');
        if (p) return p.textContent.trim();

        // Fallback: raw figcaption text.
        const figcaption = figure.querySelector('figcaption');
        if (figcaption) return figcaption.textContent.trim();

        // Last resort: img alt text.
        const img = figure.querySelector('img');
        return img ? (img.getAttribute('alt') || '') : '';
    }

    // -------------------------------------------------------------------------
    // Attach click handlers to every figure inside every .image-gallery
    // -------------------------------------------------------------------------

    document.querySelectorAll('.image-gallery').forEach(gallery => {
        // Mark the gallery as JS-active. _gallery.scss uses this attribute
        // to suppress the no-JS hover overlay that is shown by default.
        gallery.dataset.js = '';

        // Collect all direct and nested figures in DOM order.
        const figures = Array.from(gallery.querySelectorAll('figure'));

        figures.forEach((figure, index) => {
            const anchor = figure.querySelector(':scope > a');

            if (anchor) {
                // Intercept the default navigation so the lightbox opens instead.
                anchor.addEventListener('click', e => {
                    e.preventDefault();
                    openLightbox(figures, index);
                });
            } else {
                // No <a> wrapper — attach the click handler to the figure itself.
                figure.addEventListener('click', () => {
                    openLightbox(figures, index);
                });
            }
        });
    });

    // -------------------------------------------------------------------------
    // Lightbox core functions
    // -------------------------------------------------------------------------

    /**
     * Opens the lightbox at the given index within the supplied figures array.
     * @param {HTMLElement[]} figures
     * @param {number} index
     */
    function openLightbox(figures, index) {
        currentItems = figures;
        currentIndex = index;
        displayItem(currentIndex);
        lightboxOverlay.classList.add('active');
        updateNavButtons();
        document.body.style.overflow = 'hidden';

        // Sync URL hash so the open image is linkable and browser-history aware.
        // Format: #gallery-{galleryId}-{index}  e.g. #gallery-abc123-2
        const galleryId = figures[0].closest('[data-gallery-id]')?.dataset.galleryId || 'gallery';
        history.pushState({ galleryId, index }, '', `#${galleryId}-${index}`);

        // Move focus into the lightbox for keyboard users.
        closeButton.focus();
    }

    function closeLightbox() {
        lightboxOverlay.classList.remove('active');
        lightboxImage.setAttribute('src', '');
        lightboxImage.setAttribute('alt', '');
        lightboxTitle.textContent   = '';
        lightboxCaption.textContent = '';
        document.body.style.overflow = '';

        // Clear the hash without adding a new history entry.
        history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    /**
     * Updates the lightbox image and caption for the given index.
     * @param {number} index
     */
    function displayItem(index) {
        const figure  = currentItems[index];
        const url     = resolveImageUrl(figure);
        const title   = resolveTitle(figure);
        const caption = resolveCaption(figure);

        lightboxImage.setAttribute('src', url);
        lightboxImage.setAttribute('alt', title || caption); // Prefer title for alt text.
        lightboxTitle.textContent   = title;
        lightboxCaption.textContent = caption;

        // Hide elements when empty to avoid blank space in the layout.
        lightboxTitle.style.display   = title   ? '' : 'none';
        lightboxCaption.style.display = caption ? '' : 'none';
    }

    /** Advances to the next figure, wrapping at the end. */
    function showNext() {
        currentIndex = (currentIndex + 1) % currentItems.length;
        displayItem(currentIndex);
        const galleryId = currentItems[0].closest('[data-gallery-id]')?.dataset.galleryId || 'gallery';
        history.replaceState({ galleryId, index: currentIndex }, '', `#${galleryId}-${currentIndex}`);
    }

    /** Retreats to the previous figure, wrapping at the start. */
    function showPrev() {
        currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
        displayItem(currentIndex);
        const galleryId = currentItems[0].closest('[data-gallery-id]')?.dataset.galleryId || 'gallery';
        history.replaceState({ galleryId, index: currentIndex }, '', `#${galleryId}-${currentIndex}`);
    }

    /** Shows or hides nav arrows depending on whether there are multiple items. */
    function updateNavButtons() {
        const display = currentItems.length > 1 ? 'block' : 'none';
        prevButton.style.display = display;
        nextButton.style.display = display;
    }

    // -------------------------------------------------------------------------
    // Lightbox controls
    // -------------------------------------------------------------------------

    closeButton.addEventListener('click', closeLightbox);

    // Allow Enter key activation for keyboard users (role=button spans are not
    // natively keyboard-activatable like <button> elements).
    closeButton.addEventListener('keydown', e => { if (e.key === 'Enter') closeLightbox(); });
    prevButton.addEventListener('keydown',  e => { if (e.key === 'Enter') showPrev(); });
    nextButton.addEventListener('keydown',  e => { if (e.key === 'Enter') showNext(); });

    // Click on the backdrop (not on the image/caption) closes the lightbox.
    lightboxOverlay.addEventListener('click', e => {
        if (e.target === lightboxOverlay) closeLightbox();
    });

    nextButton.addEventListener('click', showNext);
    prevButton.addEventListener('click', showPrev);

    // Close lightbox if the user navigates back via browser history.
    window.addEventListener('popstate', () => {
        if (lightboxOverlay.classList.contains('active')) closeLightbox();
    });

    // Keyboard navigation: Escape closes, arrow keys navigate.
    document.addEventListener('keydown', e => {
        if (!lightboxOverlay.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (currentItems.length > 1) {
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft')  showPrev();
        }
    });
});