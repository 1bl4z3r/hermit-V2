---
title: "Admonition Shortcode"
slug : "admonition-shortcode"
date: 2023-10-20T20:06:06+05:30
draft: false
featuredImg: ""
description : 'This explains admonition shortcode implementation'
tags: 
  - Demo
  - Typography
author : 1bl4z3r
scrolltotop : true
toc : true
mathjax : false
---

The `admonition` shortcode supports **8** types of banners to help you put a notice on your page.

*Markdown or HTML format in the content is supported.*

{{< admonition type=note title="This is a note" >}}
A **note** banner
{{< /admonition >}}

{{< admonition info "This is an info" >}}
A **info** banner
{{< /admonition >}}

{{< admonition tip >}}
A **tip** banner
{{< /admonition >}}

{{< admonition success >}}
A **success** banner
{{< /admonition >}}

{{< admonition warning >}}
A **warning** banner
{{< /admonition >}}

{{< admonition failure >}}
A **failure** banner
{{< /admonition >}}

{{< admonition danger >}}
A **danger** banner
{{< /admonition >}}

{{< admonition bug >}}
A **bug** banner
{{< /admonition >}}

The `admonition` shortcode has the following named parameters:

* **type** *[optional]* (**first** positional parameter)

    Type of the `admonition` banner, the default value is `note`.

* **title** *[optional]* (**second** positional parameter)

    Title of the `admonition` banner, the default value is the value of the **type** parameter.

Example `admonition` input:

```markdown
{{</* admonition type=tip title="This is a tip" */>}}
A **tip** banner
{{</* /admonition */>}}
Or
{{</* admonition tip "This is a tip" */>}}
A **tip** banner
{{</* /admonition */>}}
```

The rendered output looks like this:

{{< admonition tip "This is a tip" >}}
A **tip** banner
{{< /admonition >}}