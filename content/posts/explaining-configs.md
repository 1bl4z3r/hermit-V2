---
title: "Explaining Configs"
slug : "explaining-configs"
date: 2023-10-22T20:06:06+05:30
draft: false
featuredImg: ""
description : "The Hitchhiker's Guide to Hermit - V2 Configuration"
tags: 
  - Demo
pin: true
scrolltotop : true
toc : true
ShowLastmod : true
Lastmod : 2024-03-12T20:30:30+05:30
---

## Configuation in `hugo.toml`

`hugo.toml` represents Global configuration for Hermit - V2. It is indicative on the changes to make the theme tailored to your personal preferences.

`baseURL` : The absolute URL (protocol, host, path, and trailing slash) of your published site.
- `languageCode` : A language tag as defined by RFC 5646. This value is used to populate:
	- The `<language>` element in the internal RSS template
	- The lang attribute of the `<html>` element in the internal alias template
- `title` - Title of the Site
- `theme` - Sets all layouts to be from the instaled theme (Use "hermit-v2" to adapt hermit-v2's theme)
- `enableGitInfo` : Enable .GitInfo object for each page (if the Hugo site is versioned by Git). This will then update the Lastmod parameter for each page using the last git commit date for that content file.
  > Side-effect : Affects `.Lastmod` parameter in Pages

- `hasCJKLanguage` : If Chinese/Japanese/Korean is your main content language, enable this to make wordCount works right.
- `pygmentsCodefences` : Set to true to enable syntax highlighting in code fences with a language tag in markdown.
- `pygmentsUseClasses` : Set to `true` to use CSS classes to format your highlighted code.
- `rssLimit` : Maximum number of items in the RSS feed.
- `copyright` : This message is only used by the RSS template.
- `enableEmoji` : Enables shorthand emojis in content files. [Info](https://gohugo.io/functions/emojify/)
- `[services]`
	- `[services.disqus] shortname` : To enable Disqus.
	- `[services.googleAnalytics] id` : Enter Google Analytics UA code to invoke inbuilt Google Analytics.
- `[params.author]`
	- `name` : Name of Site-wide or default author.
	- `about` : Name of the about page of the Site-wide or default author.
- `[taxonomies]`
	- `tag = "tags"` : Allows to specify taxonomy to be shown as tags
	- `category = "categories"` : Allows to specify taxonomy to be shown as categories. This is disabled by default
- `[params]`
	- `dateform` / `dateformShort` / `dateformNum` / `dateformNumTime` : Used to render properly formatted date & time. Change this if you know what you are doing.
	- `description` : Put in default description for meta description.
	- `images` : Used to display image for site, when sharing the page as link to social media (like Twitter)
	- `themeColor`: Populates theme-color meta. Make sure to keep `$theme` in `_colors.scss` and this same for better color consistency.
	- `homeSubtitle` : Displays subtitle in Homepage.
	- `footerCopyright` : Custom copyright for footer.
	- `bgImg` : Homepage background-image URL.
	- `gitUrl` : Prefix of link to the git commit detail page. GitInfo must be enabled.
	- `justifyContent` : Set "text-align: justify" to `.content`. Toggling this option needs to rebuild SCSS, requires Hugo extended version.
	- `relatedPosts` : Add a related content section to all single posts page.
	- `code_copy_button` : Turn on/off the code-copy-button for code-fields.
	- `homeSubtitlePrinter` : Allows homeSubtitle to be shown with printer animation effect.
	- `scrollToTop` : Enables Scroll to Top button Site wide.
	- `global_mathjax` : Enable global_mathjax to true, if you want MathJax support sitewide (if you have technical page)
	- `readTime` : Toggle Reading time for articles.
	- `readTimeSeparator` : Specifies Separator between wordCount and readTime.
	- `legacyLayout` : Enables legacy layout (where post info is below content)
	- `shareSocial` : Enables Social sharing links to share pages to social media.
	- `googleTagManager` : Enables scripts for [Google Tag Manager](https://tagmanager.google.com/)
	- `tagSymbol` : Specify a symbol for Tags. Default is `#`
	- `categorySymbol` : Specify a symbol for Categories. Default is `⊲`
	- `pinned` : Display the name of 'Pinned Posts'. If none provided, pinned posts section would be hidden
	- `pinnedSVGname` : Specify what icon should be displayed before a pinned post. The icon must be present in `svg.html`
	- `descriptionInPosts` : Toggle to show/hide posts' description in list view
	- `initialPublish` : Show what should be shown in section of Initial Published. Defaults to "Initial Published on : "
	- `human` : Shows a badge 'BrainMade' on Posts and/or Single pages. Configurable by specifying where badge is to be shown. Read more: [brainmade.org](brainmade.org)
	- `noIndex` : When set to true, the page has ___noindex, nofollow, noarchive___ (unless specified by `denyRobots` added to robots meta tag. Else, robots tag will have ___index, follow___ (unless specified by `allowRobots`) 
	- `footerHideThemeName` : When set to true, links to Hugo and Hermit-V2 would be removed from footer section
	- `usesAnimation` : When set to false, animations are disabled site-wide
	-  `[params.socialLinks]` Refer [README](https://github.com/1bl4z3r/hermit-V2#social-icons)
		- `name` : Name of the social page.
		- `url` : URL of your account.
	- `[menu]` : Display menu items in Homepage as well as in menubar. To make more menu items, use [[menu.main]]

## Configuration in page Frontmatter
  
  As described in Hugo docs

  > Front matter allows you to keep metadata attached to an instance of a content type—i.e., embedded inside a content file—and is one of the many features that gives Hugo its strength.

- `title` : Page's title
- `slug` : A slug is the part of a URL that identifies a particular page on a website in an easy-to-read form.
- `date` : Date of creation of the page.
- `draft` : If you want to un-publish the page.
- `featuredImg` : To have a unique image for the page. Shown as background image. Can be toggled to fullscreen with special button in menu.
- `description` : Description for the Page.
- `tags` : Allows to define tags.
- `categories` : Allows to define categories.
- `author` : Allows to specify page author.
- `authorLink` : Allows to supply separate author bio.
- `scrolltotop` : Toggles scroll to top button for that particular page.
- `mathjax` : Enable Per-Page MathJax support.
- `toc` : Enables Table of Contents.
- `custom_css` : Allows to supply custom CSS by placing the css files in `/static/css/`. CSS will be invoked for that page only.
- `custom_js` : Allows to supply custom CSS by placing the css files in `/static/js/`. JS will be invoked for that page only.
- `ShowLastmod` : This enables Last modification date of the given Page.
- `Lastmod` : REQUIRED (If `ShowLastmod=true`). Enter Last modified date of the Page.
- `pin` : Specify if the post should be shown as pinned
- `denyRobots` : Specify what directives to follow when denying crawlers. Default is **noindex, nofollow, noarchive**
- `allowRobots` : Specify what directives to follow when allowing crawlers. Default is **index, follow**
- `siteNoIndex` : When set to true, whole site will have ___noindex, nofollow, noarchive___ (unless specified by `denyRobots`) added to robots meta tag. Else, robots tag will have ___index, follow___ (unless specified by `allowRobots`) applied to whole site
- `noIndexPages` : Specify on which pages crawlers will be denied. Pages specified will have ___noindex, nofollow, noarchive___ (unless specified by `denyRobots` added to robots meta tag. Use **Page title** to select pages. Useful for the pages generated by Hugo. (Eg. for [List of Tags]({{<ref "/tags">}}), use ___Tags___)
- `keywords` : Specify keywords for your article. It will be used to populate[ Structured Data Site names schema](https://developers.google.com/search/docs/appearance/site-names)

## Special Caveats

### Last Modified Date

If `ShowLastmod:true` :
- If `enableGitInfo = true`, then Git Hash will be shown in `[...]` after Date.
- If `enableGitInfo = false`, then:
	- If `Lastmod` is not provided or `Lastmod` has same value as `Date`, error will be thrown.
	- If `Lastmod` is provided or `Lastmod` is different from `Date`, value of `Lastmod` will be displayed in `[...]` after Date.

If `ShowLastmod` is not provided. User response defaults to false. It is equivalent to providing `ShowLastmod:false`.

### LaTeX

LaTeX is implemented through Mathjax. 
  - If you are using this theme as a proper  mathematical blog, enable `global_mathjax` to true in hugo.toml. It will enable Mathjax support site wide.
  - Since Mathjax is a heavy script (>1 MB), it is not ideal to run Mathjax site wide, especially if you are in the above cohort. However, if you want to use mathematical formulas, you can set `mathjax : true` in Page frontmatter. It will enable mathjax for only that page only.

### Enable ScrolltoTop button

To enable scroll to top, **you must enable `scrollToTop` in hugo.toml and `scrolltotop` in Page Frontmatter**. This is to prevent scroll to top button from showing if the page has very less content. If you feel that for the content, you need scroll to top button, follow below steps:
  1. Open hugo.toml and set `scrollToTop = true`
  2. Open the Markdown content file and set `scrolltotop : true` in Page Frontmatter

### Support for Guest Authors

If blog has more than one author or if you want to invite Guest Authors, here's how to do.

- If author is not Site Author:
  1. Update `author` to the Author's name in Page Frontmatter.
  2. Create a markdown file in `/content` directory. (eg. `author-1.md`)
  3. Add the markdown file to Page Frontmatter as `authorLink` (eg. `authorLink = author-1`)
- If `authorLink` is not provided, but `author` is provided. Link will be referenced to Site author's page as defined in `author.about` in hugo.toml
- If Neither `author` nor `authorLink` is provided. Author will be referenced to Site author (as defined in `author.name`) and the link will referenced to Site author's page as defined in `author.about` in hugo.toml