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

The `gallery` shortcode lets you add a beautiful, responsive image gallery to any page on your Hugo site. You compose it using nested `{{</* figure */>}}` shortcodes — one per image — giving you full control over captions, titles, and links without any extra tooling or third-party libraries.

## What You Get
 
- **Two layout modes** — a uniform square grid, or a masonry layout where images keep their natural height
- **Automatic thumbnails** — for images stored in your `/assets` folder, a square smart-cropped thumbnail is generated at build time; the full-resolution image is loaded only when the lightbox opens
- **Lightbox** — clicking any thumbnail opens the full image in a modal overlay with title, caption, previous/next navigation, and keyboard controls
- **No-JS warning** — if JavaScript is disabled, hovering over a thumbnail shows a clear message instead of silently doing nothing
- **SEO & accessibility built in** — structured data, meaningful alt text, lazy loading, ARIA roles, and URL-hash navigation so every open image has its own linkable URL
- **No external libraries** — pure vanilla JavaScript and SCSS

## Step 1 — Enable the Gallery
 
Before the shortcode will render, add this to your `hugo.toml`:
 
```toml
[params.gallery]
  enable    = true
  thumbnail = "300"   # thumbnail size in pixels — default is 300
  layout    = "grid"  # default layout: "grid" or "masonry"
```
 
- `enable` — **required**. The gallery will not render without this.
- `thumbnail` — controls the width and height of generated thumbnails in pixels.
- `layout` — sets the default layout for all galleries on your site. You can override this per gallery with the `mode` parameter (see below).

## Step 2 — Add a Gallery to Your Content
 
Wrap one or more `{{</* figure */>}}` shortcodes inside `{{</* gallery */>}}`:
 
```go
{{</* gallery */>}}
  {{</* figure src="images/photo1.jpg" title="Sunset" caption="Taken at the coast" */>}}
  {{</* figure src="images/photo2.jpg" title="Mountains" caption="Early morning hike" */>}}
  {{</* figure src="images/photo3.jpg" caption="City lights" */>}}
{{</* /gallery */>}}
```
 
That is all the minimum setup requires. Hugo will generate thumbnails, wire up the lightbox, and output SEO-friendly markup automatically.

## Layout Modes
 
### Grid
 
The default layout. Every image is displayed as a uniform square cell. Images are cropped to fill the square (smart crop — the most interesting part of the image is preserved). Cells are centred when there are fewer images than would fill a full row.
 
```go
{{</* gallery mode="grid" */>}}
  {{</* figure src="images/a.jpg" title="A" caption="First image" */>}}
  {{</* figure src="images/b.jpg" title="B" caption="Second image" */>}}
  {{</* figure src="images/c.jpg" title="C" caption="Third image" */>}}
{{</* /gallery */>}}
```
 
### Masonry
 
Images keep their natural height, creating a staggered, Pinterest-style layout. Useful when your images have varying aspect ratios and you want to show them without cropping. Sparse rows (fewer images than fill the full width) are centred.
 
```go
{{</* gallery mode="masonry" */>}}
  {{</* figure src="images/landscape.jpg" caption="Wide shot" */>}}
  {{</* figure src="images/portrait.jpg" caption="Tall shot" */>}}
{{</* /gallery */>}}
```
{{< admonition warning "Important note on Masonry" >}}
Masonry layout doesnot have a baseline browser support. This layout was created as an experimental solution and should not be used in production.
Using grid layout is recommended, and is set as a default when using this shortcode. 

Browser support can be checked from [Masonry layout - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Masonry_layout)
{{< /admonition >}}
 
> **Tip:** The `mode` parameter always overrides the `layout` value you set in `hugo.toml`. Set `layout` to whichever mode you use most often, then use `mode` on the shortcodes where you need something different.

## The `figure` Parameters
 
Each `{{</* figure */>}}` inside a gallery accepts the following parameters:
 
| Parameter  | Required | Description |
|------------|----------|-------------|
| `src`      | Yes      | Path to the image. See [Image Sources](#image-sources) below. |
| `title`    | No       | Shown as a bold heading in the lightbox above the caption. |
| `caption`  | No       | Descriptive text shown in the lightbox and on thumbnail hover. Supports Markdown. |
| `alt`      | No       | Alt text for the image. Defaults to `title`, then `caption`, then the filename. Always set this when your image conveys meaning not covered by the caption. |
| `attr`     | No       | Attribution or credit line, shown alongside the caption. |
| `attrlink` | No       | URL to link the attribution text to. |
| `link`     | No       | In standalone `{{</* figure */>}}` use (outside a gallery), wraps the image in a link. Inside a gallery, this is used as the lightbox full-resolution URL for static and remote images. |
| `loading`  | No       | Override the loading behaviour. Defaults to `lazy` inside a gallery. Set to `eager` for the first image if it is above the fold. |
| `class`    | No       | CSS class applied to the `<figure>` element. |
 

## Image Sources
 
The shortcode handles three types of image paths:
 
### 1. Local assets (recommended)
 
Images stored in your `/assets` directory. Use the path relative to `assets/`:
 
```go
{{</* figure src="images/photo.jpg" */>}}
```
 
This means the file lives at `your-project/assets/images/photo.jpg`.
 
Hugo's image pipeline processes these at build time:
 
- A square thumbnail is generated and used in the gallery grid
- A WebP version is created (with JPEG fallback via `<picture>`)
- The original full-resolution image is loaded only when the lightbox opens
### 2. Static files
 
Images stored in your `/static` directory. Prefix the path with `/`:
 
```go
{{</* figure src="/photos/event.jpg" */>}}
```
 
This means the file lives at `your-project/static/photos/event.jpg`.
 
> Static files are served as-is. Hugo cannot resize or convert them, so the same file is used for both the thumbnail display and the lightbox.
 
### 3. Remote images
 
Full `http://` or `https://` URLs to images hosted elsewhere:
 
```go
{{</* figure src="https://example.com/photo.jpg" caption="Photo from the web" */>}}
```
 
> Remote images cannot be resized by Hugo. The same URL is used for both thumbnail and lightbox. CSS handles the visual fit.

## Lightbox
 
Clicking any thumbnail opens the lightbox. If you provided a `title` and/or `caption`, they appear below the enlarged image — title in bold, caption underneath.
 
| Control | Action |
|---|---|
| Click thumbnail | Open lightbox at that image |
| `←` / `→` arrow keys | Navigate to previous / next image |
| `Escape` | Close the lightbox |
| Click outside the image | Close the lightbox |
| Browser back button | Close the lightbox |

### Deep-linking to a specific image
 
When you open the lightbox, the URL automatically updates to include a hash like `#gallery-abc123-2` (gallery ID + image index). This means:
 
- You can copy and share a URL that opens directly to a specific image
- The browser back button works as expected — pressing back closes the lightbox rather than leaving the page

## No-JavaScript Warning
 
If a visitor has JavaScript disabled, the lightbox cannot open. Rather than leave them confused by an unresponsive click, the gallery shows a clear overlay message on hover:
 
> ⚠ Lightbox requires JavaScript
 
This overlay is shown by default using pure CSS and is automatically hidden as soon as gallery.js loads successfully. No configuration needed.

## SEO and Accessibility
 
The gallery is built with search engines and assistive technology in mind. Here is what is applied automatically:
 
| Feature | What it does |
|---|---|
| `schema.org/ImageGallery` | Marks the gallery container as a structured data entity for Google Image Search |
| `schema.org/ImageObject` | Marks each figure with its URL, name, and description for rich results |
| `contentUrl` meta | Gives crawlers the full-resolution image URL, even though the thumbnail is what's displayed |
| Meaningful `alt` text | Falls back through `alt` → `title` → `caption` → filename — no image is ever left without a description |
| `loading="lazy"` | Gallery images load only as they scroll into view, improving page speed |
| `decoding="async"` | Images decode off the main thread, keeping the page responsive |
| `role="region"` + `aria-label` | Screen readers announce the gallery as a named landmark |
| `role="dialog"` + `aria-modal` on lightbox | Screen readers correctly identify the lightbox as a modal dialog |
| `aria-live` on caption | Screen readers announce the caption when you navigate between images |
| `role="button"` + `tabindex` on controls | Close and navigation buttons are reachable by keyboard Tab |

## Configuration Reference
 
### `hugo.toml`
 
```toml
[params.gallery]
  enable    = true      # Required — gallery will not render without this
  thumbnail = "300"     # Thumbnail dimension in px (width and height). Default: "300"
  layout    = "grid"    # Site-wide default layout: "grid" or "masonry". Default: "grid"
```
 
### SCSS Variables
 
All colours and shadows are controlled by SCSS variables. Copy these into your theme's `assets/scss/_colors.scss` (or equivalent) and edit to match your design:
 
```scss
// Gallery thumbnail cells
$gallery-item-box-shadow:       0 2px 4px rgba(0, 0, 0, 0.1)  !default;
$gallery-item-hover-box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15) !default;
$gallery-item-caption-background: rgba(0, 0, 0, 0.7)          !default; // hover caption overlay
$gallery-item-caption-color:    #fff                           !default;
 
// Lightbox
$lightbox-overlay-background:           rgba(0, 0, 0, 0.85)   !default; // backdrop
$lightbox-image-box-shadow:             0 5px 15px rgba(0, 0, 0, 0.3) !default;
$lightbox-caption-color:                #fff                   !default;
$lightbox-close-nav-color:              #fff                   !default; // close & arrow buttons
$lightbox-close-color-hover:            #ccc                   !default;
$lightbox-nav-background-color:         rgba(0, 0, 0, 0.3)    !default;
$lightbox-nav-background-color-hover:   rgba(0, 0, 0, 0.6)    !default;
```

## Full Examples
 
### Basic grid gallery with local assets

```go
{{</* gallery mode="grid" */>}}
  {{</* figure src="images/mountain.jpg"  title="Mountain" caption="Taken at sunrise · John" */>}}
  {{</* figure src="images/ocean.jpg"     title="Ocean"    caption="Pacific coastline" */>}}
  {{</* figure src="images/forest.jpg"    title="Forest"   caption="Autumn colours" */>}}
{{</* /gallery */>}}
```
#### 2 images
{{< gallery mode="grid" >}}
{{< figure src="images/10-2500x1667.jpg" title="Grid Image 1" caption="Caption for Image 1" >}}
{{< figure src="images/11-2500x1667.jpg" title="Grid Image 2" caption="Caption for Image 2" >}}
{{< /gallery >}}

#### 3 images
{{< gallery mode="grid" >}}
{{< figure src="images/10-2500x1667.jpg" title="Grid Image 1" caption="Caption for Image 1" >}}
{{< figure src="images/11-2500x1667.jpg" title="Grid Image 2" caption="Caption for Image 2" >}}
{{< figure src="images/928-600x400.jpg"  title="Grid Image 3" caption="Caption for Image 3" >}}
{{< /gallery >}}

#### 4 images
{{< gallery mode="grid" >}}
{{< figure src="images/10-2500x1667.jpg" title="Grid Image 1" caption="Caption for Image 1" >}}
{{< figure src="images/11-2500x1667.jpg" title="Grid Image 2" caption="Caption for Image 2" >}}
{{< figure src="images/928-600x400.jpg"  title="Grid Image 3" caption="Caption for Image 3" >}}
{{< figure src="images/11-2500x1667.jpg" title="Grid Image 4" caption="Caption for Image 4" >}}
{{< /gallery >}}

#### 5 images
{{< gallery mode="grid" >}}
{{< figure src="images/10-2500x1667.jpg" title="Grid Image 1" caption="Caption for Image 1" >}}
{{< figure src="images/11-2500x1667.jpg" title="Grid Image 2" caption="Caption for Image 2" >}}
{{< figure src="images/928-600x400.jpg"  title="Grid Image 3" caption="Caption for Image 3" >}}
{{< figure src="images/11-2500x1667.jpg" title="Grid Image 4" caption="Caption for Image 4" >}}
{{< figure src="images/11-2500x1667.jpg" title="Grid Image 5" caption="Caption for Image 5" >}}
{{< /gallery >}}


### Basic Masonry gallery with local assets

```go
{{</* gallery mode="masonry" */>}}
  {{</* figure src="images/mountain.jpg"  title="Mountain" caption="Taken at sunrise · John" */>}}
  {{</* figure src="images/ocean.jpg"     title="Ocean"    caption="Pacific coastline" */>}}
  {{</* figure src="images/forest.jpg"    title="Forest"   caption="Autumn colours" */>}}
{{</* /gallery */>}}
```
#### 2 images
{{< gallery mode="masonry" >}}
{{< figure src="images/10-2500x1667.jpg" title="Grid Image 1" caption="Caption for Image 1" >}}
{{< figure src="images/11-2500x1667.jpg" title="Grid Image 2" caption="Caption for Image 2" >}}
{{< /gallery >}}

#### 3 images
{{< gallery mode="masonry" >}}
{{< figure src="images/10-2500x1667.jpg" title="Grid Image 1" caption="Caption for Image 1" >}}
{{< figure src="images/11-2500x1667.jpg" title="Grid Image 2" caption="Caption for Image 2" >}}
{{< figure src="images/928-600x400.jpg"  title="Grid Image 3" caption="Caption for Image 3" >}}
{{< /gallery >}}

#### 4 images
{{< gallery mode="masonry" >}}
{{< figure src="images/10-2500x1667.jpg" title="Grid Image 1" caption="Caption for Image 1" >}}
{{< figure src="images/11-2500x1667.jpg" title="Grid Image 2" caption="Caption for Image 2" >}}
{{< figure src="images/928-600x400.jpg"  title="Grid Image 3" caption="Caption for Image 3" >}}
{{< figure src="images/11-2500x1667.jpg" title="Grid Image 4" caption="Caption for Image 4" >}}
{{< /gallery >}}

#### 5 images
{{< gallery mode="masonry" >}}
{{< figure src="images/10-2500x1667.jpg" title="Grid Image 1" caption="Caption for Image 1" >}}
{{< figure src="images/11-2500x1667.jpg" title="Grid Image 2" caption="Caption for Image 2" >}}
{{< figure src="images/928-600x400.jpg"  title="Grid Image 3" caption="Caption for Image 3" >}}
{{< figure src="images/11-2500x1667.jpg" title="Grid Image 4" caption="Caption for Image 4" >}}
{{< figure src="images/11-2500x1667.jpg" title="Grid Image 5" caption="Caption for Image 5" >}}
{{< /gallery >}}

### Gallery with attribution

Use `attr` and `attrlink` to credit the photographer or source:

```go
{{</* gallery mode="grid" */>}}
  {{</* figure src="images/city.jpg"
      title="City at Night"
      caption="Downtown skyline"
      attr="Jane Smith"
      attrlink="https://example.com/jane" */>}}
  {{</* figure src="images/market.jpg"
      title="Street Market"
      caption="Saturday morning"
      attr="Bob Jones" */>}}
{{</* /gallery */>}}
```

{{< gallery mode="grid" >}}
  {{< figure src="images/10-2500x1667.jpg"
      title="FOREST"
      caption="Downtown forest"
      attr="Jane Smith"
      attrlink="https://example.com/jane" >}}
  {{< figure src="images/11-2500x1667.jpg"
      title="LAKE"
      caption="Saturday morning"
      attr="Bob Jones" 
      attrlink="https://example.com/bob" >}}
{{< /gallery >}}

### Gallery using static files

```go
{{</* gallery mode="grid" */>}}
  {{</* figure src="/images/397-600x400.jpg"      title="IMAGE1"  caption="Image 1 from /static folder" */>}}
  {{</* figure src="/android-chrome-192x192.png"  title="IMAGE2"  caption="Image 2 from /static folder" */>}}
  {{</* figure src="/android-chrome-384x384.png"  title="IMAGE3"  caption="Image 3 from /static folder" */>}}
{{</* /gallery */>}}
```
{{< gallery mode="grid" >}}
  {{< figure src="/images/397-600x400.jpg"      title="IMAGE1"  caption="Image 1 from /static folder" >}}
  {{< figure src="/android-chrome-192x192.png"  title="IMAGE2"  caption="Image 2 from /static folder" >}}
  {{< figure src="/android-chrome-384x384.png"  title="IMAGE3"  caption="Image 3 from /static folder" >}}
{{< /gallery >}}

### Gallery with remote images

```go
{{</* gallery mode="masonry" */>}}
    {{</* figure src="https://picsum.photos/seed/gallery-remote1/800/600"  caption="Random 1" */>}}
    {{</* figure src="https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"  caption="Random 2" */>}}
    {{</* figure src="https://picsum.photos/seed/c/800/800"  caption="Random 3" */>}}
    {{</* figure src="https://picsum.photos/seed/another-image/700/500?blur=2"  caption="Random 4" */>}}
    {{</* figure src="https://picsum.photos/seed/gallery-remote3/1024/768"  caption="Random 5" */>}}
    {{</* figure src="https://placehold.co/600x400?text=More+Examples"  caption="Random 6" */>}}
{{</* /gallery */>}}
```
{{< gallery mode="masonry" >}}
    {{< figure src="https://picsum.photos/seed/gallery-remote1/800/600"  caption="Random 1" >}}
    {{< figure src="https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"  caption="Random 2" >}}
    {{< figure src="https://picsum.photos/seed/c/800/800"  caption="Random 3" >}}
    {{< figure src="https://picsum.photos/seed/another-image/700/500?blur=2"  caption="Random 4" >}}
    {{< figure src="https://picsum.photos/seed/gallery-remote3/1024/768"  caption="Random 5" >}}
    {{< figure src="https://placehold.co/600x400?text=More+Examples"  caption="Random 6" >}}
{{< /gallery >}}

### Overriding the default layout per gallery

If your `hugo.toml` sets `layout = "grid"` but one particular gallery should be masonry, just set `mode` on that shortcode:

```toml
# hugo.toml — site-wide default
[params.gallery]
  enable = true
  thumbnail = "300"
```

```go
{{</* gallery */>}}                       <!-- uses grid (from hugo.toml) -->
  {{</* figure src="images/a.jpg" */>}}
{{</* /gallery */>}}

{{</* gallery mode="masonry" */>}}        <!-- overrides to masonry just for this gallery -->
  {{</* figure src="images/b.jpg" */>}}
{{</* /gallery */>}}
```

---

## Important Notes

- **Path conventions matter.** A path without a leading `/` (e.g. `images/photo.jpg`) is looked up in `/assets`. A path with a leading `/` (e.g. `/images/photo.jpg`) is looked up in `/static`. Getting this wrong will cause a build warning and the image will be skipped.
- **Write good captions.** Alt text falls back to the caption if no explicit `alt` is set, so a descriptive caption improves both accessibility and SEO.
- **`loading="lazy"` is the default inside a gallery.** If your first gallery image is visible immediately on page load (above the fold), add `loading="eager"` to that one figure so it does not delay rendering.
- **JavaScript is required for the lightbox.** Thumbnails and captions are fully visible without JS; only the lightbox and navigation require it. Visitors without JS see a hover warning on each thumbnail.
- **Gallery JS is only loaded on pages that use the shortcode.** It will not affect pages that have no gallery.