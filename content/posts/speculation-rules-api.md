---
title: "Speculation Rules API"
slug : "speculation-rules-api"
date: 2026-08-01
ShowLastmod : false
draft: false
featuredImg: ""
description : 'Near-Instant Page Loads with the Speculation Rules API'
tags: 
  - Demo
  - Typography
author : blzr
scrolltotop : true
toc : true
mathjax : false
readTime : true
---
Static site generators like Hugo are already incredibly fast. By serving pre-compiled HTML directly from a CDN, Time to First Byte (TTFB) is often measured in milliseconds. But what if navigating between pages could feel completely instantaneous? What if the next page was already fully rendered before the user even clicked the link?

Enter the Speculation Rules API. It’s a modern browser feature that allows developers to write JSON instructions telling the browser exactly which URLs to prefetch or prerender based on precise eagerness thresholds. Today, we are going to explore how to integrate a highly configurable Speculation Rules implementation natively into Hugo.

### Prefetching vs. Prerendering
Before diving into the configuration, it's crucial to understand the two core mechanisms of speculation:
* **Prefetch**: The browser downloads the raw HTML payload of the target URL in the background. When the user navigates, the browser processes the HTML, downloads required assets (CSS/JS), and paints the page. It’s light on bandwidth and memory.
* **Prerender**: The browser opens a hidden tab, downloads the HTML, executes the JavaScript, paints the CSS, and holds the fully rendered page in memory. When the user navigates, it instantly swaps the hidden tab into view. This feels like a Single Page Application (SPA) transition but requires more memory and CPU.

### Understanding Eagerness
The Speculation Rules API uses "eagerness" to decide when to trigger the preload action. This Hugo implementation exposes these thresholds directly via configuration variables.

| Eagerness Level | Trigger Condition | Best Used For |
| :--- | :--- | :--- |
| **immediate** | Fires as soon as the speculation rule script is parsed. | The absolute most critical path (e.g., the very next logical step in a funnel). Use sparingly. |
| **eager** | Fires quickly, usually right after immediate rules. | High-probability links like the main menu or top recent posts. |
| **moderate** | Fires when the user hovers over a link for >200ms. | General internal navigation, catch-all rules. |
| **conservative** | Fires on pointer/mouse down (right before click release). | Lower probability links or external cross-origin prefetching. |

### Breaking Down the Configuration
This Hugo setup uses a custom `[params.speculation]` block in the hugo.toml file. Let's explore how these variables dictate browser behavior dynamically.

#### 1. Header Links (Site Menus)
The main navigation (menus) is the most heavily trafficked area of any site. Configuration allows you to explicitly preload these.

```toml
[params.speculation]
    headerLinks = "prefetch"
    headerEagerness = "eager"

```

{{< admonition type=success title="How it works" >}}
The Hugo partial scans `site.Menus.main`. By setting it to eager, as soon as the page loads, the browser is instructed to quietly download the HTML (prefetch) for every link in the main navigation. If you set it to prerender, those pages would be fully processed in hidden tabs.
{{< /admonition >}}

#### 2. Article Targeting

When a user lands on the homepage or is reading an article, they are highly likely to read your newest content next.

```toml
    articles = "prefetch"
    articleFolder = "posts"
    articleCount = 3
    articleEagerness = "eager"
    articleCAEagerness = "moderate"

```

{{< admonition type=success title="How it works" >}}
The script dynamically fetches the latest 3 articles from the `posts` folder and explicitly lists them with an `eager` threshold. But what about the older posts linked on the page? That’s where `articleCAEagerness` (Catch-All) comes in. It generates a "Document Rule" telling the browser: "If the user hovers over ANY other internal link for more than 200ms (moderate), prefetch that too."
{{< /admonition >}}

#### 3. Pinned Articles

For high-priority, evergreen content pinned to the top of your lists. You can target these specifically without consuming your standard article limits.

```toml
    pinnedArticle = "prerender"
    pinnedArticleEagerness = "immediate"

```

{{< admonition type=success title="How it works" >}}
If a page's frontmatter has `pin: true`, the script isolates it from the standard top-article count and applies its own dedicated rules. By default, it uses the highly aggressive `immediate` eagerness and strictly `prerender`s the page to guarantee a zero-latency load.
{{< /admonition >}}

#### 4. Taxonomy Tuning

Category and Tag pages behave similarly to article lists, but require their own scoping.

```toml
    taxonomies = "prerender"
    taxonomyCount = 3
    taxonomyEagerness = "eager"
    taxonomyCAEagerness = "moderate"

```

{{< admonition type=success title="How it works" >}}
If a user navigates to /tags/hugo/, this block explicitly prerenders the top 3 articles listed under that specific tag immediately (`eager`). Any other links on that tag page fall back to a hover-based prefetch/prerender (`moderate`).
{{< /admonition >}}

#### 5. In-Article Contextual Routing (Same Origin)

When a user is deeply engaged reading a specific post, their clicking behavior is highly predictable.

```toml
    sameOriginEagerness = "eager"

```

{{< admonition type=success title="How it works" >}}
This variable only triggers when a user is actively reading a single article page. If they encounter a link to **another** internal page within the text, the script creates a strict document rule to explicitly `prerender` that page. It defaults to `eager` to seamlessly prepare the next piece of content before the user finishes reading.
{{< /admonition >}}

#### 6. Safe Cross-Origin Prefetching

Preloading links that point away from your site is risky. You don't want to accidentally prerender a heavy external site in the background, consuming user bandwidth.

```toml
    crossOrigin = true
    crossOriginEagerness = "moderate"

```
{{< admonition type=success title="How it works" >}}
The script safely restricts cross-origin links to prefetch only. It generates a rule matching all `https://*` links but uses a not condition dynamically bound to your `site.BaseURL` to prevent self-looping. Using a moderate or conservative eagerness ensures you are only pinging external servers if the user demonstrates real intent (like hovering or clicking).
{{< /admonition >}}

### Limitations & Browser Fallbacks
Speculation rules are treated strictly as **speculative hints** and progressive enhancements. The browser reserves the right to ignore your rules, and in certain conditions, prerendering or prefetching will fail completely:

1. **User Settings Disabled**: Browsers like Chrome and Edge allow users to toggle off speculative loading under their privacy/performance settings (e.g., "Preload pages for faster browsing and searching"). If disabled, speculative loads will silently halt.
2. **Ad Blockers & Extensions (uBlock Origin)**: Browser extensions designed for privacy or network filtering—most notably **uBlock Origin**, frequently block network pre-fetching to prevent unrequested background connections. When uBlock Origin is enabled with its "Disable pre-fetching" setting turned on, background speculation requests will fail.
3. **Data/Battery Saver Mode**: If a user's mobile device or laptop is running on Data Saver or Low Power Mode, Chromium browsers automatically suppress speculative background tasks to protect client resources.

### Browser Compatibility
The Speculation Rules API is a modern web standard currently championed heavily by Chromium-based browsers. 

* **Supported:** Google Chrome, Microsoft Edge, Opera, and Brave (version 109 and newer) fully support JSON-based speculation rules. 
* **Not Yet Supported:** Safari (WebKit) and Mozilla Firefox do not yet natively support the `<script type="speculationrules">` tag. 

{{< admonition type=info title="Progressive Enhancement" >}}
However, because this API is built entirely as a progressive enhancement, it is perfectly safe to use in production today. 

Browsers that do not recognize the `speculationrules` script type will completely ignore the block of code, resulting in zero console errors or broken layouts. 

Users on unsupported browsers will simply fall back to standard, non-speculative page navigation.
{{< /admonition >}}