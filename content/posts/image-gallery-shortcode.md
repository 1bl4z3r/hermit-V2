---
title: "Image Gallery Shortcode"
slug: "image-gallery-shortcode"
date: 2025-05-10T10:00:00+05:30
draft: false
featuredImg: ""
description: "Learn how to use the image gallery shortcode to create responsive galleries with thumbnails, captions, and a JavaScript-powered lightbox."
tags:
  - Demo
  - Image
  - Shortcode
toc: true
---

The `gallery` shortcode allows you to easily create beautiful, responsive image galleries on your Hugo site. It takes a list of image sources (local paths or remote URLs), generates thumbnails for local images, and wraps them in links that open a larger version in a clean, vanilla JavaScript lightbox.

## Features

*   **Responsive Design**: The gallery adapts to different screen sizes using flexbox.
*   **Thumbnails**:
    *   For local images (from `/assets` or `/static` folders), 300x300 pixel square, smart-cropped thumbnails are automatically generated.
    *   For remote images, the original image is used as the thumbnail source, and CSS (`object-fit: cover;`) ensures it fits the 300x300px thumbnail container.
*   **Lightbox**:
    *   Clicking a thumbnail opens the full-resolution image in a modal overlay.
    *   Supports navigation (next/previous arrows) between images within the same gallery.
    *   Keyboard controls: `Escape` to close, `ArrowLeft` for previous, `ArrowRight` for next.
*   **Captions**:
    *   Automatically generated from the image filename (without the file extension).
    *   For remote URLs, query parameters are stripped before generating the caption.
    *   Captions are displayed in the lightbox and appear on hover over the thumbnail in the gallery.
*   **Vanilla JS & SCSS**: Built with no external libraries for lean performance.

## How to Use

To use the shortcode, simply list your image sources (one per line) between the opening and closing `gallery` tags.

```markdown
{{</* gallery */>}}
path/to/your/image1.jpg
https://example.com/remote/image2.png
/static-path/image3.webp
{{</* /gallery */>}}
```

### Image Sources

The shortcode supports three main types of image sources:

1.  **Local Images from `/assets` directory (Recommended for processing)**:
    *   Paths should be relative to your Hugo project's `/assets` directory.
    *   Example: If your image is at `/assets/images/landscapes/mountain.jpg`, you would use `images/landscapes/mountain.jpg`.
    *   Hugo's powerful image processing will be used to generate thumbnails.

2.  **Local Images from `/static` directory**:
    *   Paths should start with a `/` and be relative to your Hugo project's `/static` directory.
    *   Example: If your image is at `/static/photos/beach.png`, you would use `/photos/beach.png`.
    *   Hugo's image processing will also apply to these images if they are found and processable by `resources.Get`.

3.  **Remote Images (URLs)**:
    *   Full HTTP or HTTPS URLs to images hosted elsewhere.
    *   Example: `https://images.unsplash.com/your-image-id`.
    *   Thumbnails for remote images are not processed server-side; the original image is used and styled by CSS.

## Examples

Below are some examples demonstrating different ways to use the `gallery` shortcode.

### 1. Gallery with Local Images from `/assets`

Place your images inside the `/assets` directory of your Hugo project. For instance, if you have images in `/assets/my-trip/`:

```go-text-template
{{</* gallery */>}}
my-gallery-assets/landscape.jpg
my-gallery-assets/portrait.png
my-gallery-assets/pano.webp
{{</* /gallery */>}}
```

{{< gallery >}}
images/10-2500x1667.jpg
images/11-2500x1667.jpg
images/928-600x400.jpg
{{< /gallery >}}

*   **To make this work:**
    *   Create a folder: `your-project/assets/my-gallery-assets/`
    *   Add images like `landscape.jpg`, `portrait.png`, `pano.webp` into that folder.
*   **Captions generated**: "landscape", "portrait", "pano".
*   **Thumbnails**: 300x300 smart-cropped versions will be generated.

### 2. Gallery with Local Images from `/static`

Place your images inside the `/static` directory. For instance, if you have images in `/static/event-photos/`:

```markdown
{{</* gallery */>}}
/event-photos/conference.jpg
/event-photos/workshop.jpeg
{{</* /gallery */>}}
```

{{< gallery >}}
/images/397-600x400.jpg
/android-chrome-192x192.png
/android-chrome-384x384.png
{{< /gallery >}}

*   **To make this work:**
    *   Create a folder: `your-project/static/event-photos/`
    *   Add images: `conference.jpg`, `workshop.jpeg` into that folder.
*   **Captions generated**: "conference", "workshop".
*   **Thumbnails**: 300x300 smart-cropped versions will be generated.

### 3. Gallery with Remote Images

You can directly link to images hosted on other websites.

```markdown
{{</* gallery */>}}
https://picsum.photos/seed/gallery-remote1/800/600
https://placehold.co/600x400/png
https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
https://picsum.photos/seed/gallery-remote3/1024/768
https://picsum.photos/seed/another-image/700/500?blur=2
https://placehold.co/600x400?text=More+Examples
{{</* /gallery */>}}
```
{{< gallery >}}
https://picsum.photos/seed/gallery-remote1/800/600
https://placehold.co/600x400/png
https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
https://picsum.photos/seed/gallery-remote3/1024/768
https://picsum.photos/seed/another-image/700/500?blur=2
https://placehold.co/600x400?text=More+Examples
{{< /gallery >}}

*   **Captions generated**: "gallery-remote1", "gallery-remote2" (query string `?grayscale` is removed), "pexels-photo-3408744".
*   **Thumbnails**: The original remote images will be displayed, scaled and cropped by CSS to fit the 300x300 thumbnail area.

### 4. Mixed Gallery (Local and Remote Images)

You can combine different source types in a single gallery.

```markdown
{{</* gallery */>}}
portfolio/project-alpha.png  <!-- From /assets/portfolio/project-alpha.png -->
/archive/old-photo.jpg       <!-- From /static/archive/old-photo.jpg -->
https://picsum.photos/seed/mixed-gallery/900/700
{{</* /gallery */>}}
```

*   Ensure `portfolio/project-alpha.png` exists in `/assets/portfolio/` and `old-photo.jpg` exists in `/static/archive/`.
*   The gallery will display thumbnails from all sources, processing local ones and styling remote ones.

## Important Notes

*   **Path Conventions**:
    *   For images in `/assets` (e.g., `/assets/img/example.jpg`), use the path relative to the `assets` directory: `img/example.jpg`.
    *   For images in `/static` (e.g., `/static/img/example.jpg`), use the path relative to the `static` directory, **prefixed with a `/`**: `/img/example.jpg`.
*   **Image Processing**: Hugo's built-in image processing (for thumbnail generation) is applied to local images found in `/assets` or `/static` that are successfully loaded via `resources.Get`.
*   **File Names for Captions**: Keep your filenames descriptive, as they are used to generate captions. For example, `golden-gate-bridge-sunset.jpg` becomes the caption "golden-gate-bridge-sunset".
*   **Empty Lines**: Empty lines within the shortcode block are ignored.
*   **Error Handling**: If a local image path is incorrect and the resource is not found, a warning will be logged during Hugo's build process, and that item will be skipped in the gallery.

## Styling and Customization

The visual appearance of the gallery and the lightbox is controlled by SCSS located in `assets/scss/_gallery.scss` (or wherever you've placed and imported it). You can override these styles in your own SCSS files to match your theme's design.

The JavaScript for the lightbox functionality is located in `assets/js/gallery.js`. It's self-contained and does not rely on any third-party libraries.

This gallery shortcode provides a flexible and straightforward way to add rich image displays to your content. Experiment with different image sources and enjoy the automated thumbnails and lightbox features!