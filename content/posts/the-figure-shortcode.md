---
title: 'The "figure" Shortcode'
date: 2023-12-24T12:29:41+08:00
draft: false
featuredImg: ""
tags: 
  - demo
  - image
toc : true
---

Hugo has `figure` shortcode built in, so you can easily add captions or hyperlink rel attributes to images. Documentations can be found [here](https://gohugo.io/content-management/shortcodes/#figure).

This theme extends upon [default figure shortcode](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/shortcodes/figure.html) to implement following features :

* Follow latest standard to display WEBP image and fallback to JPG if browser cannot render WEBP.
  * If provided with an image resource, it can convert to WEBP and JPG image
  * Both WEBP and JPG are placed in [picture tag](https://www.w3schools.com/tags/tag_picture.asp)
  * To use this feature, place your image in `assets` folder in root of your site
* If `src` contains a link (starting with http/https), it will be parsed accordingly.
* 1-to-1 feature set compatiblity if you are using figure shortcode or `![]()`.
* If you want to add image from `static` folder, you can, __but be informed that these images cannot be converted or optimized__.

### Supported attributes to figure shortcode (Create an Issue if you want to add more)

- `src` : Source of the resource. It can be one of three
  - Image in `assets` folder in your site root. Supported Formats : **WEBP** and **JPG**
  - Image in `static` folder in your site root.
  - Image fetched from another place on the internet. Must start with **http://** or **https://**
- `link` : Specifies the URL of the page the figure goes to. The value is added to `href`
- `target` : Specifies where to open the linked document. To be used with `link`. The value is added to `target`. Possible values:
| Value   | Description                                                                     |
|---------|---------------------------------------------------------------------------------|
| _blank  | Opens the linked document in a new window or tab                                |
| _self   | Opens the linked document in the same frame as it was clicked (this is default) |
| _parent | Opens the linked document in the parent frame                                   |
| _top    | Opens the linked document in the full body of the window                        |
- `rel` : Specifies the relationship between the current document and the linked document. The value is added to `rel`. Possible values :
| Value      | Description                                                                                                                                             |
|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| alternate  | Provides a link to an alternate representation of the document (i.e. print page, translated or mirror)                                                  |
| author     | Provides a link to the author of the document                                                                                                           |
| bookmark   | Permanent URL used for bookmarking                                                                                                                      |
| external   | Indicates that the referenced document is not part of the same site as the current document                                                             |
| help       | Provides a link to a help document                                                                                                                      |
| license    | Provides a link to licensing information for the document                                                                                               |
| next       | Provides a link to the next document in the series                                                                                                      |
| nofollow   | Links to an unendorsed document, like a paid link. ("nofollow" is used by Google, to specify that the Google search spider should not follow that link) |
| noopener   | Requires that any browsing context created by following the hyperlink must not have an opener browsing context                                          |
| noreferrer | Makes the referrer unknown. No referer header will be included when the user clicks the hyperlink                                                       |
| prev       | The previous document in a selection                                                                                                                    |
| search     | Links to a search tool for the document                                                                                                                 |
| tag        | A tag (keyword) for the current document                                                                                                                |

- `class` : This theme has 3 CSS classes made for figure elements. If a figure has no class set, the image will behave just like a normal markdown image: `![]()`.
  * `big`: images will break the width limit of main content area.
  * `left`: images will float to the left.
  * `right`: images will float to the right.
- `alt` : Provides an alternate text for an image, if the user for some reason cannot view it (because of slow connection, an error in the src attribute, or if the user uses a screen reader).
- Attribution
  - `attr` : Attribution text
  - `attrlink` : Attribution link
- `title` : Generate title for image in `figcaption`. It will be shown in **H4**
- `width` : Specify width of the image
- `height` : Specify height of the image
- `caption` : Specify caption of the image
- `loading` : Specifies whether a browser should load an image immediately or to defer loading of off-screen images until for example the user scrolls near them. Possible values:
| Value | Description                                           |
|-------|-------------------------------------------------------|
| eager | Default. Loads an image immediately                   |
| lazy  | Defer loading of images until some conditions are met |

Here's some examples, please be aware that these styles only take effect when the page width is over 1300px.

### Image located in `static folder` in site root. Prepend `/` in src attribute to inform that image is in `static` folder
```go
{{</* figure src="/android-chrome-192x192.png" alt="android-chrome-192x192.png" caption="Static folder image (notice slash '/' in src attribute)" */>}}
```

{{< figure src="/android-chrome-192x192.png" alt="android-chrome-192x192.png" caption="Static folder image (notice slash '/' in src attribute)" >}}

### Image located in a folder named `images` in `static folder` in site root. Prepend `/` in src attribute to inform that image is in `static` folder
```go
{{</* figure src="/images/397-600x400.jpg" alt="apple-touch-icon.png" title="Picsum image" attr="Picsum" attrlink="https://picsum.com" caption="This image is located in /static/images" */>}}
```
{{< figure src="/images/397-600x400.jpg" alt="apple-touch-icon.png" title="Picsum image" attr="Picsum" attrlink="https://picsum.com" caption="This image is located in /static/images" >}}

### Figure loaded from another site with no class specification.
```go
{{</* figure src="https://placehold.co/1600x800" alt="image" caption="figure-normal (without any classes)" */>}}
```
{{< figure src="https://placehold.co/1600x800" alt="image" caption="figure-normal (without any classes)" >}}

### Figure loaded from `assets` folder in site root.
```go
{{</* figure src="images/928-600x400.jpg" alt="image" caption="relative file path in assets folder" */>}}
```
{{< figure src="images/928-600x400.jpg" alt="image" caption="relative file path in assets folder" >}}

### Figure using class `big`
```go
{{</* figure src="https://placehold.co/1600x800" alt="image" caption="using class = big" class="big" */>}}
```
{{< figure src="https://placehold.co/1600x800" alt="image" caption="using class = big" class="big" >}}

### Figure using class `left`
```go
{{</* figure src="https://placehold.co/400x280" alt="image" caption="using class = left" class="left" */>}}
```
{{< figure src="https://placehold.co/400x280" alt="image" caption="using class = left" class="left" >}}

In a libero varius, luctus ligula et, bibendum tortor. Sed sit amet dui malesuada, mattis justo id, ultricies enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam sollicitudin cursus feugiat. Vivamus suscipit ipsum eget lobortis sollicitudin. Fusce vehicula neque tellus. Integer eu posuere quam, id laoreet tortor. Mauris sit amet turpis urna. Donec venenatis tempor dolor, nec laoreet orci aliquet et. Sed condimentum elit eu tristique aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc luctus ipsum sit amet nisl maximus pellentesque.
In a libero varius, luctus ligula et, bibendum tortor. Sed sit amet dui malesuada, mattis justo id, ultricies enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam sollicitudin cursus feugiat. Vivamus suscipit ipsum eget lobortis sollicitudin.

### Figure using class `right`
```go
{{</* figure src="https://placehold.co/400x280" alt="image" caption="using class = right" class="right" */>}}
```
{{< figure src="https://placehold.co/400x280" alt="image" caption="using class = right" class="right" >}}

Pellentesque eu consequat nunc. Vivamus eu eros ut nulla dapibus molestie in id tortor. Cras viverra ligula erat, tincidunt hendrerit diam blandit nec. Cras id urna vel dolor dictum mattis. Vestibulum congue erat ac eros molestie accumsan. Maecenas lorem nibh, maximus vel justo eget, facilisis egestas lectus. Mauris eu est ut odio blandit consequat id feugiat eros. Fusce id suscipit mi, et lacinia lectus. Mauris a arcu placerat dolor iaculis feugiat nec non mi. Ut porttitor elit tortor, eget tempus velit mollis eu. Aliquam sem nulla, dictum cursus mauris ac, semper ullamcorper leo.
Donec nec tincidunt est. Sed id metus in erat fringilla mattis at id turpis. Aliquam tempor vehicula faucibus. Phasellus consequat aliquam odio. Morbi a ex vitae sapien porta auctor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sit amet nulla arcu. Praesent ut tortor purus. Praesent id eros diam. Pellentesque vitae dolor at nibh ultrices accumsan eu id urna. Aliquam finibus interdum orci in varius. Pellentesque a enim condimentum, condimentum felis id, vehicula augue. Vivamus cursus commodo eros nec lacinia.

### Use static directory as assets directory

This configuration allows you would want to use static directory or a subdirectory as assets. To utilize this feature, add following lines to `hugo.toml`. Assuming you put your images in `/static/images`, you can mount this folder as assets. [Hugo forum - Why does a path that works for a markdown image not work for the figure shortcode?](https://discourse.gohugo.io/t/why-does-a-path-that-works-for-a-markdown-image-not-work-for-the-figure-shortcode/52631)

```toml
[[module.mounts]]
source = 'assets'
target = 'assets'

[[module.mounts]]
source = 'static/images'
target = 'assets'
```