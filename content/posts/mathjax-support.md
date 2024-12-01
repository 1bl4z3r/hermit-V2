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
author : blzr
scrolltotop : false
toc : true
mathjax : true
---

# \(LaTeX\) support for hermit-V2

## Configuration

Put the following in `hugo.toml`

{{< highlight toml "linenos=table,linenostart=1" >}}
[markup]
  [markup.goldmark]
    [markup.goldmark.extensions]
      [markup.goldmark.extensions.passthrough]
        enable = true
        [markup.goldmark.extensions.passthrough.delimiters]
          block = [['\[', '\]'], ['$$', '$$']]
          inline = [['\(', '\)']]
{{< /highlight >}}

Mathjax support is implemented via partials. Please find partial in `/layouts/partials/mathjax.html`

{{< highlight html "linenos=table,linenostart=1" >}}
{{ if or (.Site.Params.global_mathjax) (.Params.mathjax) }}
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
{{ $mathjaxa := resources.Get "js/mathjax/mathjax-assistant.js"}}
{{ $mathjaxscript := slice $mathjaxa | resources.Concat "js/mathjaxs.js" | minify | fingerprint -}}
<script type="text/javascript" id="MathJax-script" async src="{{ $mathjaxscript.Permalink }}" {{ printf "integrity=%q" $mathjaxscript.Data.Integrity | safeHTMLAttr }} crossorigin="anonymous"></script>
{{ end }}
{{< /highlight >}}

Finally, Javacript. Mathjax has two JS.

- `mathjax@3/es5/tex-chtml.js` (This is the main library downloaded from [jsDelivr](https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js))
- `/assets/js/mathjax/mathjax-assistant.js` (You may extend this according to your liking)

{{< highlight javascript "linenos=table,linenostart=1" >}}
MathJax = {
  tex: {
      displayMath: [['\\[', '\\]'], ['$$', '$$']],
      inlineMath: [['\\(', '\\)']]
      // processEscapes: true,
      // processEnvironments: true,
  }
  // options: {
  //     skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
  //     enableMenu: false
  // }
};
{{< /highlight >}}

You can invoke partial in following ways:

1. If you want global Mathjax support (for technical blog): set `global_mathjax` to true in hugo.toml
2. If you want mathjax support in individual articles : add `mathjax : true` to Frontmatter

### \(LaTeX\) in action

This is an inline \(a^*=x-b^*\) equation.

These are block equations:

\[a^*=x-b^*\]

\[ a^*=x-b^* \]

\[
a^*=x-b^*
\]

These are block equations using alternate delimiters:

$$a^*=x-b^*$$

$$ a^*=x-b^* $$

$$
a^*=x-b^*
$$



\[
\begin{aligned}
KL(\hat{y} || y) &= \sum_{c=1}^{M}\hat{y}_c \log{\frac{\hat{y}_c}{y_c}} \\
JS(\hat{y} || y) &= \frac{1}{2}(KL(y||\frac{y+\hat{y}}{2}) + KL(\hat{y}||\frac{y+\hat{y}}{2}))
\end{aligned}
\]



$$C_p[\ce{H2O(l)}] = \pu{75.3 J // mol K}$$



$$
x = {-b \pm \sqrt{b^2-4ac} \over 2a}
$$



$$
f(a) = \frac{1}{2\pi i} \oint\frac{f(z)}{z-a}dz
$$



$$
\int_D ({\nabla\cdot} F)dV=\int_{\partial D} F\cdot ndS
$$



$$
\vec{\nabla} \times \vec{F} =
            \left( \frac{\partial F_z}{\partial y} - \frac{\partial F_y}{\partial z} \right) \mathbf{i}
          + \left( \frac{\partial F_x}{\partial z} - \frac{\partial F_z}{\partial x} \right) \mathbf{j}
          + \left( \frac{\partial F_y}{\partial x} - \frac{\partial F_x}{\partial y} \right) \mathbf{k}
$$



$$
\sigma = \sqrt{ \frac{1}{N} \sum_{i=1}^N (x_i -\mu)^2}
$$



$$
(\nabla_X Y)^k = X^i (\nabla_i Y)^k =
           X^i \left( \frac{\partial Y^k}{\partial x^i} + \Gamma_{im}^k Y^m \right)
$$



When $a \ne 0$, there are two solutions to \(ax^2 + bx + c = 0\) and they are
$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$



\begin{equation} 
S (ω)=1.466\, H_s^2 \,  \frac{ω_0^5}{ω^6 }  \, e^[-3^ { ω/(ω_0  )]^2}
\end{equation}



$$\sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6}$$