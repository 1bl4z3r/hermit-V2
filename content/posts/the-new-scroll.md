---
title: "The New Scroll"
slug : 'the-new-scroll'
date: 2023-08-06T16:07:33+05:30
draft: false
featuredImg: ""
description : 'A button to return to the top of the page allows the user to quickly return to the top of the page without making too much effort'
tags: 
  - Demo
  - Typography
scrolltotop : true
toc : true
---

## This article explains how to use Scroll Up

A button to return to the top of the page allows the user to quickly return to the top of the page without making too much effort. This can be very useful when the page has a lot of content or which happens, for example, on one page websites, when infinite scrolling is used, or on mobile devices where different screen sizes can cause the content to scroll extend.

### Step 1

Set `scrollToTop` to true in `hugo.toml`

```toml
scrollToTop = true
```

### Step 2

Enable `scrolltotop` to `true` in article front matter.

```yaml
scrolltotop : true
```

> Some pages/articles do not require scroll up button (if there is less content)

## Anti-JS crowd

The button will work as intended if JS is disabled, but it will not hide/show on scroll position. So, if you have decided to disable JS on client, you will be struck with an floating icon.

## Icon
Icon is located in `layouts/partials/svg.html` under scrollup.
Icon svg code is as follows:

{{< highlight html "linenos=table,linenostart=1" >}}
<svg fill="#3B3E48" width="64px" height="64px" viewBox="-2.4 -2.4 28.80 28.80" id="up-circle" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" class="icon flat-color" stroke="#3B3E48" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.9600000000000002"><circle id="primary" cx="12" cy="12" r="10" style="fill: #3B3E48;"></circle><path id="secondary" d="M15,14a1,1,0,0,1-.71-.29L12,11.41l-2.29,2.3a1,1,0,0,1-1.42-1.42l3-3a1,1,0,0,1,1.42,0l3,3a1,1,0,0,1,0,1.42A1,1,0,0,1,15,14Z" style="fill: #018574;"></path></g><g id="SVGRepo_iconCarrier"><circle id="primary" cx="12" cy="12" r="10" style="fill: #3B3E48;"></circle><path id="secondary" d="M15,14a1,1,0,0,1-.71-.29L12,11.41l-2.29,2.3a1,1,0,0,1-1.42-1.42l3-3a1,1,0,0,1,1.42,0l3,3a1,1,0,0,1,0,1.42A1,1,0,0,1,15,14Z" style="fill: #018574;"></path></g></svg>
{{< /highlight >}}

## HTML

This is implemented as a partial located in `layouts/partials/scroll-to-top.html`.
Partial is injected in `layouts/_default/baseof.html`

{{< highlight go "linenos=table,linenostart=1" >}}
{{ if and (.Site.Params.scrollToTop) (.Params.scrolltotop) }}
<a href="#" class="scroll-up">{{ partial "svg.html" (dict "context" . "name" "scrollup") }}</a>
<noscript>
    <a href="#" class="scroll-up show">{{ partial "svg.html" (dict "context" . "name" "scrollup") }}</a>
</noscript>
{{ $scrollwatcher := resources.Get "js/scrollwatcher.js" -}}
{{ $script := $scrollwatcher | minify | fingerprint -}}
<script src="{{ $script.Permalink }}" {{ printf "integrity=%q" $script.Data.Integrity | safeHTMLAttr }} crossorigin="anonymous"></script>
{{ end }}
{{< /highlight >}}


## CSS

Located in `assets/scss/_scroll.scss`.

{{< highlight scss "linenos=table,linenostart=1" >}}
.scroll-up{
    position: fixed;
    bottom: 10%;
    right: 0;
    z-index: 1;
    opacity: 0;
    transition: all 0.5s ease;
}
.hide{
    opacity: 0;
    transform: translateY(20px);
}
.show{
    opacity: 1;
    transform: translateY(0);
  }
{{< /highlight >}}

## JavaScript

Located in `assets/js/scrollwatcher.js`

{{< highlight javascript "linenos=table,linenostart=1" >}}
const scroll=document.querySelector(".scroll-up"),rootElement=document.documentElement;function handleScroll(){rootElement.scrollTop/(rootElement.scrollHeight-rootElement.clientHeight)>.4?(scroll.classList.remove("hide"),scroll.classList.add("show")):(scroll.classList.add("hide"),scroll.classList.remove("show"))}document.addEventListener("scroll",handleScroll);
{{< /highlight >}}