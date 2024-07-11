# hermit-V2 -: The Minimal Hugo Theme

hermit-V2 is a minimal and fast theme for Hugo, built for bloggers who want a simple and focused website. This is a maintained fork of [Hermit](https://github.com/Track3/hermit), which iterates over the original work to have production-ready experience with bug fixes and new features.

![](https://raw.githubusercontent.com/1bl4z3r/hermit-V2/main/images/screenshot.jpg)

### History

When I had switched from Jekyll to Hugo, I was in a need of a theme. I was enthralled by this very theme, and I am using it since in my own personal blog. However, it looks like [OP]((https://github.com/Track3)) has stopped maintaining this theme and as a result, it is riddled with bugs and code breaks. Hence, I have taken upon myself to maintain this theme.The intention of this project is to keep the essence of the theme as-it-is and only add minor updates and squash bugs which may arise.

> GoHugo Theme Page : [https://themes.gohugo.io/themes/hermit-v2/](https://themes.gohugo.io/themes/hermit-v2/)

## Demo

Demo page [https://1bl4z3r.github.io/hermit-V2](https://1bl4z3r.github.io/hermit-V2), which is both demo and documentation for the theme, is located in [Staging Branch](https://github.com/1bl4z3r/hermit-V2/tree/staging)

![](https://raw.githubusercontent.com/1bl4z3r/hermit-V2/staging/images/screenshot.gif)

## Configuration Guide

Configuration Guide is present in [Explaining Configs](https://1bl4z3r.github.io/hermit-V2/en/posts/explaining-configs/)

## Installation

Run this command from the root of your Hugo directory:

```bash
git clone https://github.com/1bl4z3r/hermit-V2 themes/hermit-v2
```

Or, if your Hugo site is already in git, you can include this repository as a [git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules). This makes it easier to update this theme. For this, you need to run:

```bash
git submodule add -b main https://github.com/1bl4z3r/hermit-V2 themes/hermit-v2
```

To update submodule and to have the latest version of the theme with your project, run
```bash
git submodule update --remote
```

## Sites using hermit-V2

__Sites using hermit-V2__ is a user contributed list of all the blogs/pages that is using hermit-V2 in some capacity. It could be any component of the theme from landing page or a partial to full fledged use of the theme. The objective of this section is to :

- Help new and aspiring bloggers/webmasters to get inspiration from
- Create a sense of community

You can find currently listed sites from [Sites-using-hermit‐V2](https://github.com/1bl4z3r/hermit-V2/wiki#sites-using-hermit-v2) and you can add your site by raising an [issue for the same](https://github.com/1bl4z3r/hermit-V2/issues/new?assignees=1bl4z3r&labels=hermit-V2+sites&projects=&template=add-remove-sites-using-hermit-v2.md&title=Add+to+Sites+using+hermit-V2).

## First Use Knowledge

### Features Inherited from Original Theme

* A single-column layout and carefully crafted typography offers a great reading experience.
* Navigation and functions are placed in the bottom-bar which will hide when you scroll down.
* Featured image is supported. It will be displayed as a dimmed background of the page.
* Displays all of your posts on a single page, with one section per year, simple and compact.
* Extremely lightweight and load fast. No third party framework, no unnecessary code.
* All code fields feature syntax highlighting and a code-copy function
* Responsive & Retina Ready. Scales gracefully from a big screen all the way down to the smallest mobile phone. Assets in vector format ensures that it looks sharp on high-resolution screens.

![](https://raw.githubusercontent.com/1bl4z3r/hermit-V2/staging/images/hermit.webp)

### Configuration

Site Configuration is done through `hugo.toml` or `hugo.yaml` file in root directory of your Hugo Site. To aid you, there is a [hugo.toml.example](https://github.com/1bl4z3r/hermit-V2/blob/main/hugo.toml.example) file located in theme folder. See this configuration in action [here](https://github.com/1bl4z3r/hermit-V2/blob/staging/hugo.toml). See what each configuration does [here](https://1bl4z3r.github.io/hermit-V2/en/posts/explaining-configs/#configuation-in-hugotoml).

### Custom CSS and JS

I have found that there are some requirements where custom CSS and JS should be supplied to a page to make it work. This custom files are not required for the whole of the site, but is restricted to a page or few particular pages. E.g. If you make contact form.

To make use of custom CSS and JS, add the below section to page frontmatter. If there is any folder structure, that should be mentioned as well.

```
custom_css = ["custom_css/foo.css","custom_css/bar.css"]
custom_js = ["custom_js/custom-about.js"]
```

The files itself will reside in `assets` directory. Refer to [Staging Branch](https://github.com/1bl4z3r/hermit-V2/tree/staging) to have a feel on how [this](https://github.com/1bl4z3r/hermit-V2/blob/staging/content/about-hugo.md) is implemented.

### Favicon

Use [RealFaviconGenerator](https://realfavicongenerator.net/) to generate these files, put them into your site's `static` folder:

* android-chrome-192x192.png
* android-chrome-512x512.png
* apple-touch-icon.png
* favicon-16x16.png
* favicon-32x32.png
* favicon.ico
* mstile-150x150.png
* safari-pinned-tab.svg
* site.webmanifest

#### SVG Favicons

If your favicon is in SVG format, there are two ways to implement the same in this theme.

* If you are looking for a clean directory structure, place your favicon as `favicon.svg` in `static` directory. **In this mode, favicon will not be minified by Hugo**
* If you want your generated site to be as light as possible, place your favicon as `favicon.svg` in `assets/images`. **In this mode, favicon will be minified by Hugo**

### Social icons

The following icons are supported, please make sure the `name` field is exactly one of these:

| name            |             |              |           |
| --------------- | ----------- | ------------ | --------- |
| `email`         | `codepen`   | `facebook`   | `github`  |
| `gitlab`        | `instagram` | `linkedin`   | `slack`   |
| `stackoverflow` | `telegram`  | `twitter`    | `youtube` |
| `shutterstock`  | `freepik`   | `adobestock` | `123rf`   |
| `dreamstime`    | `dribbble`  | `behance`    | `paypal`  |
| `twitch`        | `qq`        | `mastodon`   | `discord` |
| `etsy`          | `tiktok`    | `imgur`      | `bluesky` |
| `medium`        | `medium old`|              |           |

If that's not enough, you can see [Overriding templates](#overriding-templates) section.

### Manage content

* Keep your regular pages in the `content` folder. To create a new page, run `hugo new page-title.md`
* Keep your blog posts in the `content/posts` folder. To create a new post, run `hugo new posts/post-title.md`

### Overriding templates

In Hugo, layouts can live in either the project’s (root) or the themes’ layout folders, any template inside the root layout folder will override theme's layout that relative to it, for example: `layouts/_default/baseof.html` will override `themes/hermit/layouts/_default/baseof.html`. So, you can easily customize the theme without edit it directly, which makes updating the theme easier. Here are some common customizations:

### Customize social icons
You can modify or add any SVG icons in site's `layouts/partials/svg.html`.

### Customize comment system
We only have built-in support for Disqus at the moment, if that doesn't fit your needs, you can just add HTML to site's `layouts/partials/comments.html`.

### Add custom analytics
If you prefer to use different analytics system other than Google Analytics, then add them inside `layouts/partials/analytics.html`.

### Customize CSS

1. **Change predefined colors/effects** - If you'd like to customize theme color or fonts, you can simply override `assets/scss/_predefined.scss`, by simply copy it to site's root (keep the same relative path) then edit those variables.
2. **Change CSS effects limited to single page or few pages** - Add following to your page FrontMatter
`custom_css = ["custom_css/foo.css","custom_css/bar.css"]`, and add the relevant SCSS files in `assets` directory. You may find additional help in [Custom CSS and JS](#custom-css-and-js).
3. **Change css styling sitewide** - If you are unhappy with how the theme looks and feels and want to change some (or all) of it to make it truly your own, you can do so by adding `assets/scss/userstyles.scss` to your site's root and modify Stylesheets to your liking.

You'll need **Hugo extended version**, which has the ability to rebuild SCSS. You don't have to use extended version in production, but in this case it's necessary to make sure the `resources` folder is committed and "up to date" (by running `hugo` or `hugo server` locally using the extended version). But anyway, always use the extended version if you can.

### Code injection

You can inject any HTML code to every page's document head or right above the closing body tag. This makes it easier to add any HTML metadata, custom css/js, DNS-prefetch etc. To do this you simply need to create a file at site's `layouts/partials/extra-head.html` or `layouts/partials/extra-foot.html`, code inside will be injected to every page.

### LaTeX in Markdown

LaTeX is supported by this theme through Mathjax. Please check [explaining-configs](https://1bl4z3r.github.io/hermit-V2/en/posts/explaining-configs/) to learn more.

## Acknowledgments

* [normalize.css](https://necolas.github.io/normalize.css/) - [MIT](https://github.com/necolas/normalize.css/blob/master/LICENSE.md)
* [animate.css](https://daneden.github.io/animate.css/) - [MIT](https://github.com/daneden/animate.css/blob/master/LICENSE)
* [feather](https://feathericons.com/) - [MIT](https://github.com/feathericons/feather/blob/master/LICENSE)
* [code-copy.js](assets/js/code-copy.js) - [Tom Spencer](https://www.fiznool.com/blog/2018/09/14/adding-click-to-copy-buttons-to-a-hugo-powered-blog/)
* [Everyone, who has submitted a PR](https://github.com/1bl4z3r/hermit-V2/pulls?q=is%3Apr+is%3Aclosed)
