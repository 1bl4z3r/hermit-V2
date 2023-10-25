---
title: "MathJax Support Demo"
slug : 'mathjax-support'
date: 2023-08-18T14:07:33+05:30
draft: false
featuredImg: ""
description : 'This page demos MathJax support, nothing else'
tags: 
  - Demo
  - Typography
author : 1bl4z3r
scrolltotop : false
toc : true
mathjax : true
---

# Beautiful and accessible math in all browsers

A JavaScript display engine for mathematics that works in all browsers.

## Configuration

Mathjax support is implemented via partials. Please find partial in `/layouts/partials/mathjax.html`

{{< highlight html "linenos=table,linenostart=1" >}}
{{ if or (.Site.Params.global_mathjax) (.Params.mathjax) }}
    <script type="text/javascript" async src="https://polyfill.io/v3/polyfill.min.js?features=es6" crossorigin="anonymous"></script>
    {{ $mathjaxf := resources.Get "js/mathjax/mathjax-full@3_es5_tex-mml-svg.min.js"}}
    {{ $mathjaxa := resources.Get "js/mathjax/mathjax-assistant.js"}}
    {{ $mathjaxscript := slice $mathjaxa $mathjaxf | resources.Concat "js/mathjaxs.js" | minify | fingerprint -}}
    <script type="text/javascript" id="MathJax-script" async src="{{ $mathjaxscript.Permalink }}" {{ printf "integrity=%q" $mathjaxscript.Data.Integrity | safeHTMLAttr }} crossorigin="anonymous"></script>
{{ end }}
{{< /highlight >}}

I have given a simple style for mathjax components. You may find in `/assets/scss/_mathjax.scss`. You may extend this stylesheet according to your liking.

{{< highlight scss "linenos=table,linenostart=1" >}}
.has-jax {
    -webkit-font-smoothing: antialiased;
    background: inherit !important;
    border: none !important;
    font-size: 100%;
}
{{< /highlight >}}

Finally, Javacript. Mathjax has two JS.

- `/assets/js/mathjax/mathjax-full@3_es5_tex-mml-svg.min.js` (This is the main library downloaded from [jsDelivr](https://cdn.jsdelivr.net/npm/mathjax-full@3/es5/tex-mml-svg.js))
- `/assets/js/mathjax/mathjax-assistant.js` (You may extend this according to your liking)

{{< highlight javascript "linenos=table,linenostart=1" >}}
MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$','$$'], ['\\[', '\\]']],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
    enableMenu: false
  }
};

  window.addEventListener('load', (event) => {
      document.querySelectorAll("mjx-container").forEach(function(x){
        x.parentElement.classList += 'has-jax'})
    });
{{< /highlight >}}

You can invoke partial in following ways:

1. If you want global Mathjax support (for technical blog): set `global_mathjax` to true in hugo.toml
2. If you want mathjax support in individual articles : add `mathjax : true` to Frontmatter

I have consciously decoupled main javascript from Mathjax javascript, so that you may visualize if there is any load latency, given mathjax JS is huge. I have minified it, but still if you get any better optimizations, let me know.

> The MathJax library version (at the time of publising this article) is : 3.2.2. 
>> It includes components : tex-mml-svg.

### The Quadratic Formula

$$
x = {-b \pm \sqrt{b^2-4ac} \over 2a}
$$

### Cauchy's Integral Formula

$$
f(a) = \frac{1}{2\pi i} \oint\frac{f(z)}{z-a}dz
$$

### Gauss' Divergence Theorem

$$
\int_D ({\nabla\cdot} F)dV=\int_{\partial D} F\cdot ndS
$$

### Curl of a Vector Field

$$
\vec{\nabla} \times \vec{F} =
            \left( \frac{\partial F_z}{\partial y} - \frac{\partial F_y}{\partial z} \right) \mathbf{i}
          + \left( \frac{\partial F_x}{\partial z} - \frac{\partial F_z}{\partial x} \right) \mathbf{j}
          + \left( \frac{\partial F_y}{\partial x} - \frac{\partial F_x}{\partial y} \right) \mathbf{k}
$$

### Standard Deviation

$$
\sigma = \sqrt{ \frac{1}{N} \sum_{i=1}^N (x_i -\mu)^2}
$$

### Definition of Christoffel Symbols

$$
(\nabla_X Y)^k = X^i (\nabla_i Y)^k =
           X^i \left( \frac{\partial Y^k}{\partial x^i} + \Gamma_{im}^k Y^m \right)
$$

### Inline

When $a \ne 0$, there are two solutions to \(ax^2 + bx + c = 0\) and they are
$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$

### A complex equation

\begin{equation} 
S (ω)=1.466\, H_s^2 \,  \frac{ω_0^5}{ω^6 }  \, e^[-3^ { ω/(ω_0  )]^2}
\end{equation}

### Another equation

$$\sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6}$$