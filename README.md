# Hermit-V2 _- The Minimal Hugo Theme_

Hermit-V2 is a minimal and fast theme for Hugo, built for bloggers who want a simple and focused website. This is a maintained fork of [Hermit](https://github.com/Track3/hermit), which iterates over the original work to have production-ready experience with bug fixes and new features.

![](https://raw.githubusercontent.com/1bl4z3r/hermit-V2/main/images/screenshot.jpg)


## First Impression & Demo

Check out Hermit-V2 : [https://1bl4z3r.github.io/hermit-V2](https://1bl4z3r.github.io/hermit-V2)
This demo also acts as an documentation for the theme, utilizing its powerful features.

The source for the site is located in [Staging Branch](https://github.com/1bl4z3r/hermit-V2/tree/staging)

![](https://raw.githubusercontent.com/1bl4z3r/hermit-V2/staging/images/screenshot.gif)

### Initial Information

Original theme for Hermit-v2 is, you gussed it, is [Hermit](https://github.com/Track3/hermit). However, it seems [Track3](https://github.com/Track3) isn't maintaining this anymore, which resulted in de-listing from [GoHugo Themes](https://themes.gohugo.io/themes/hermit-v2/) and totally breaks in newer Hugo versions.

Goal of this project is to keep the essence of theme as-is. We will not diverge too much from the original and keep it as minimal as possible, but include all the tools for you to extend, customize and use this theme as you deem fit.

### Configuration

Site Configuration is done through `hugo.toml` or `hugo.yaml` file in root directory of your Hugo Site. To aid you, there is a [hugo.toml.example](https://github.com/1bl4z3r/hermit-V2/blob/main/hugo.toml.example) file located in theme folder. See this configuration for the staging branch [here](https://github.com/1bl4z3r/hermit-V2/blob/staging/hugo.toml). See what each configuration does [here](https://1bl4z3r.github.io/hermit-V2/en/posts/explaining-configs).

### Installation

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

### Custom CSS and JS

if you feel there is a need to have your own CSS and JS to be added, there is a provision for the same. These custom files should be designed to for a page or few particular pages. E.g. If you make contact form.

To make use of custom CSS and JS, add the below section to page frontmatter. If there is any folder structure, that should be mentioned as well.

```
custom_css = ["custom_css/foo.css","custom_css/bar.css"]
custom_js = ["custom_js/custom-about.js"]
```

The files itself will reside in `assets` directory. Refer to [Staging Branch](https://github.com/1bl4z3r/hermit-V2/tree/staging) to have a feel on how [this](https://github.com/1bl4z3r/hermit-V2/blob/staging/content/about-hugo.md) is implemented.

### Custom styles

If, for some reason, you want to apply style for the whole theme, which should be seperate from core theme styles, you can add _userstyles.scss_ in `assets/scss/`. If the file exists, it will be imported during build process.

### Customize theme

This theme allows to be customized. To customize, copy the respective scss file from the theme to site's `assets/scss/` and edit them to your liking.

* To customize theme, Scroll to Top button and Admonition colors, copy [__colors.scss_](https://github.com/1bl4z3r/hermit-V2/blob/staging/assets/scss/_colors.scss)
* To customize theme fonts, copy [__fonts.scss_](https://github.com/1bl4z3r/hermit-V2/blob/staging/assets/scss/_fonts.scss)

### Extend functionality

Functionality can be extended via layouts.

Layouts can live in either the project’s (root) or the themes’ layout folders, any template inside the root layout folder will override theme's layout that relative to it, for example: `layouts/_default/baseof.html` will override `themes/hermit-V2/layouts/_default/baseof.html`. So, you can easily customize the theme without edit it directly, which makes updating the theme easier.

Copy files as required to site's `layouts/partials/` and edit them to fit your needs.

* To add or modify SVG images used in the theme, copy [_svg.html_](https://github.com/1bl4z3r/hermit-V2/blob/staging/layouts/partials/svg.html)
* To add or modify comment system (default is Disqus), copy [_comments.html_](https://github.com/1bl4z3r/hermit-V2/blob/staging/layouts/partials/comments.html)
* To add or modify custom analytics(default is Google Analytics), copy [_analytics.html_](https://github.com/1bl4z3r/hermit-V2/blob/staging/layouts/partials/analytics.html)
* To inject HTML code to every page's document head or right above the closing body tag ( this makes it easy to add any HTML metadata, custom css/js, DNS-prefetch etc.), create a file at site's _extra-head.html_ or _extra-foot.html_

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

| name              |              |                |                 |              |
|-------------------|--------------|----------------|-----------------|--------------|
| `email`           | `codepen`    | `facebook`     | `github`        | `gitlab`     |
| `instagram`       | `linkedin`   | `slack`        | `stackoverflow` | `telegram`   |
| `twitter (Now X)` | `youtube`    | `shutterstock` | `freepik`       | `adobestock` |
| `dreamstime`      | `dribbble`   | `behance`      | `123rf`         | `paypal`     |
| `twitch`          | `qq`         | `mastodon`     | `discord`       | `matrix`     |
| `etsy`            | `tiktok`     | `imgur`        | `bluesky`       | `xmpp`       |
| `medium`          | `medium old` | `pixelfed`     | `ko-fi`         |              |


If that's not enough, you can see [Extend functionality](#extend-functionality) section.

### Manage content

* Keep your regular pages in the `content` folder. To create a new page, run `hugo new page-title.md`
* Keep your blog posts in the `content/posts` folder. To create a new post, run `hugo new posts/post-title.md`

### Customize CSS

1. **Change predefined colors/effects** - If you'd like to customize theme color or fonts, you can simply override `assets/scss/_predefined.scss`, by simply copy it to site's root (keep the same relative path) then edit those variables.
2. **Change CSS effects limited to single page or few pages** - Add following to your page FrontMatter
`custom_css = ["custom_css/foo.css","custom_css/bar.css"]`, and add the relevant SCSS files in `assets` directory. You may find additional help in [Custom CSS and JS](#custom-css-and-js).
3. **Change css styling sitewide** - If you are unhappy with how the theme looks and feels and want to change some (or all) of it to make it truly your own, you can do so by adding `assets/scss/userstyles.scss` to your site's root and modify Stylesheets to your liking.

You'll need **Hugo extended version**, which has the ability to rebuild SCSS. You don't have to use extended version in production, but in this case it's necessary to make sure the `resources` folder is committed and "up to date" (by running `hugo` or `hugo server` locally using the extended version). But anyway, always use the extended version if you can.

### LaTeX in Markdown

LaTeX is supported by this theme through Mathjax. Please check [explaining-configs](https://1bl4z3r.github.io/hermit-V2/en/posts/explaining-configs/) to learn more.

### Translations

This theme is made specifically with translation in mind. Translations of few languages (English, Spanish, French, Italian, German and Chinese Simplified) are provided in [Staging branch](https://github.com/1bl4z3r/hermit-V2/tree/staging/i18n). However, this theme can work without Translation if your content is **English only**. To have translation of your language :

1. Create translation tables in the i18n directory, naming each file according to RFC 5646. E.g. `i18n/<2-2 Language Code>.toml`. To find your Language code, visit [https://gist.github.com/msikma/8912e62ed866778ff8cd](https://gist.github.com/msikma/8912e62ed866778ff8cd) to get an idea for the code. See [Staging Branch](https://github.com/1bl4z3r/hermit-V2/tree/staging) to see how this is implemented.
2. Copy [English Translation key](https://github.com/1bl4z3r/hermit-V2/blob/staging/i18n/en.toml) and edit to your language. Edit the section `other = "<In your Language>"`.

### Sites using hermit-V2

__Sites using hermit-V2__ is a user contributed list of all the blogs/pages that is using hermit-V2 in some capacity. It could be any component of the theme from landing page or a partial to full fledged use of the theme. The objective of this section is to :

- Help new and aspiring bloggers/webmasters to get inspiration from
- Create a sense of community

You can find currently listed sites from [Sites-using-hermit‐V2 (https://github.com/1bl4z3r/hermit-V2/wiki#sites-using-hermit-v2)](https://github.com/1bl4z3r/hermit-V2/wiki#sites-using-hermit-v2) and you can add your site by raising an [issue](https://github.com/1bl4z3r/hermit-V2/issues/new?assignees=1bl4z3r&labels=hermit-V2+sites&projects=&template=add-remove-sites-using-hermit-v2.md&title=Add+to+Sites+using+hermit-V2).

## Share your thoughts
Share your thoughts on how to make this theme more suited for you. It could be a general feedback or something that couldn't be classified as an Issue. You can share it in Discussions : [https://github.com/1bl4z3r/hermit-V2/discussions](https://github.com/1bl4z3r/hermit-V2/discussions)

## Acknowledgments

* [normalize.css](https://necolas.github.io/normalize.css/) - [MIT](https://github.com/necolas/normalize.css/blob/master/LICENSE.md)
* [animate.css](https://daneden.github.io/animate.css/) - [MIT](https://github.com/daneden/animate.css/blob/master/LICENSE)
* [feather](https://feathericons.com/) - [MIT](https://github.com/feathericons/feather/blob/master/LICENSE)
* [code-copy.js](assets/js/code-copy.js) - [Tom Spencer](https://www.fiznool.com/blog/2018/09/14/adding-click-to-copy-buttons-to-a-hugo-powered-blog/)
* [Everyone, who has raised an issue](https://github.com/1bl4z3r/hermit-V2/issues?q=)
* [Everyone, who has submitted a PR](https://github.com/1bl4z3r/hermit-V2/pulls?q=)
