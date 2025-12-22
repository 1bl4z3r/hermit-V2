// assets/js/gallery.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Lightbox Structure Creation ---
    // This section dynamically creates the HTML elements for the lightbox.
    // This avoids cluttering the static HTML and ensures it's available.

    // Create the main overlay div for the lightbox.
    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'lightbox-overlay'; // For SCSS styling.
    lightboxOverlay.id = 'imageLightbox'; // Unique ID for easy targeting if needed.

    // Create the content container within the overlay (holds image and caption).
    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';

    // Create the image element that will display the enlarged image.
    const lightboxImage = document.createElement('img');
    lightboxImage.alt = 'Lightbox image'; // Default alt text.

    // Create the caption element for the image.
    const lightboxCaption = document.createElement('div');
    lightboxCaption.className = 'lightbox-caption';

    // Create the close button (styled as 'X').
    const closeButton = document.createElement('span');
    closeButton.className = 'lightbox-close';
    closeButton.innerHTML = '&times;'; // HTML entity for 'X'.

    // Create the 'previous' navigation button.
    const prevButton = document.createElement('span');
    prevButton.className = 'lightbox-nav prev';
    prevButton.innerHTML = '&#10094;'; // HTML entity for left arrow.

    // Create the 'next' navigation button.
    const nextButton = document.createElement('span');
    nextButton.className = 'lightbox-nav next';
    nextButton.innerHTML = '&#10095;'; // HTML entity for right arrow.

    // Assemble the lightbox structure by appending child elements.
    lightboxContent.appendChild(lightboxImage);
    lightboxContent.appendChild(lightboxCaption);
    lightboxOverlay.appendChild(lightboxContent);
    lightboxOverlay.appendChild(closeButton);
    lightboxOverlay.appendChild(prevButton);
    lightboxOverlay.appendChild(nextButton);
    document.body.appendChild(lightboxOverlay); // Add the complete lightbox to the end of the body.

    // --- Lightbox State and Variables ---
    let currentGalleryItems = []; // Array to hold image elements of the currently active gallery.
    let currentIndex = 0; // Index of the currently displayed image within `currentGalleryItems`.

    // --- Event Listeners for Gallery Items ---
    // Find all gallery links on the page that have the 'data-lightbox-group' attribute.
    const galleryLinks = document.querySelectorAll('a.gallery-item[data-lightbox-group]');

    galleryLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior (page navigation).

            const galleryGroupId = this.dataset.lightboxGroup; // Get the gallery group ID from the clicked link.
            // Filter all gallery links to get only those belonging to the same group.
            currentGalleryItems = Array.from(galleryLinks).filter(
                item => item.dataset.lightboxGroup === galleryGroupId
            );
            // Find the index of the clicked item within its specific gallery group.
            currentIndex = currentGalleryItems.indexOf(this);

            openLightbox(this); // Open the lightbox with the clicked item.
        });
    });

    // --- Lightbox Core Functions ---
    function openLightbox(element) {
        const imageUrl = element.getAttribute('href'); // Get the full image URL from link's href.
        const imageTitle = element.dataset.title || ''; // Get the image title from data-title attribute.

        lightboxImage.setAttribute('src', imageUrl); // Set the source for the lightbox image.
        lightboxImage.setAttribute('alt', imageTitle); // Set alt text for accessibility.
        lightboxCaption.textContent = imageTitle; // Display the caption.

        lightboxOverlay.classList.add('active'); // Show the lightbox by adding the 'active' class.
        updateNavButtons(); // Show/hide navigation buttons based on gallery size.
        document.body.style.overflow = 'hidden'; // Prevent background page from scrolling.
    }

    function closeLightbox() {
        lightboxOverlay.classList.remove('active'); // Hide the lightbox.
        // Clear image src to stop loading/free memory, especially for large images.
        lightboxImage.setAttribute('src', '');
        lightboxImage.setAttribute('alt', '');
        lightboxCaption.textContent = '';
        document.body.style.overflow = ''; // Restore background page scrolling.
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % currentGalleryItems.length; // Move to next, wrap around to the start if at the end.
        const nextElement = currentGalleryItems[currentIndex];
        lightboxImage.setAttribute('src', nextElement.getAttribute('href'));
        lightboxImage.setAttribute('alt', nextElement.dataset.title || '');
        lightboxCaption.textContent = nextElement.dataset.title || '';
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length; // Move to previous, wrap around to the end if at the start.
        const prevElement = currentGalleryItems[currentIndex];
        lightboxImage.setAttribute('src', prevElement.getAttribute('href'));
        lightboxImage.setAttribute('alt', prevElement.dataset.title || '');
        lightboxCaption.textContent = prevElement.dataset.title || '';
    }

    function updateNavButtons() {
        // Show navigation buttons only if there's more than one image in the current gallery.
        const displayStyle = currentGalleryItems.length > 1 ? 'block' : 'none';
        prevButton.style.display = displayStyle;
        nextButton.style.display = displayStyle;
    }

    // --- Event Listeners for Lightbox Controls ---
    closeButton.addEventListener('click', closeLightbox); // Close lightbox when close button is clicked.
    lightboxOverlay.addEventListener('click', (event) => { // Close lightbox if the overlay (background) is clicked.
        if (event.target === lightboxOverlay) closeLightbox();
    });
    nextButton.addEventListener('click', showNextImage); // Navigate to the next image.
    prevButton.addEventListener('click', showPrevImage); // Navigate to the previous image.

    // Keyboard navigation for accessibility and convenience.
    document.addEventListener('keydown', (event) => {
        if (lightboxOverlay.classList.contains('active')) { // Only act if lightbox is active.
            if (event.key === 'Escape') closeLightbox(); // Close on Escape key.
            if (currentGalleryItems.length > 1) { // Only allow arrow navigation if multiple images.
                if (event.key === 'ArrowRight') showNextImage(); // Next image on right arrow.
                if (event.key === 'ArrowLeft') showPrevImage(); // Previous image on left arrow.
            }
        }
    });
});