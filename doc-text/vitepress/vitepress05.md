# 5.静态资源目录

有时可能需要一些静态资源，但这些资源没有直接被 Markdown 或主题组件直接引用，或者你可能想以原始文件名提供某些文件，像 `robots.txt`，favicons 和 PWA 图标这样的文件。

可以将这些文件放置在[源目录](https://vitepress.dev/zh/guide/routing#source-directory)的 `public` 目录中。例如，如果项目根目录是 `./docs`，并且使用默认源目录位置，那么 public 目录将是 `./docs/public`。

放置在 `public` 中的资源将按原样复制到输出目录的根目录中。

请注意，应使用根绝对路径来引用放置在 `public` 中的文件——例如，`public/icon.png` 应始终在源代码中使用 `/icon.png` 引用。

## [根 URL](https://vitepress.dev/zh/guide/asset-handling#base-url)

如果站点没有部署在根 URL 上，则需要在 `.vitepress/config.js` 中设置 `base` 选项。例如，如果计划将站点部署到 `https://foo.github.io/bar/`，则 `base` 应设置为 `'/bar/'`(它应始终以斜杠开头和结尾)。

所有静态资源路径都会被自动处理，来适应不同的 `base` 配置值。例如，如果 markdown 中有一个对 `public` 中的资源的绝对引用：

md

```markdown
![An image](/image-inside-public.png)
```

在这种情况下，更改 `base` 配置值时，**无需**更新该引用。

但是如果你正在编写一个主题组件，它动态地链接到资源，例如一个图片，它的 `src` 基于主题配置：

vue

```vue
<img :src="theme.logoPath" />
```

在这种情况下，建议使用 VitePress 提供的 [`withBase` helper](https://vitepress.dev/zh/reference/runtime-api#withbase) 来包括路径：

```vue
<script setup>
import { withBase, useData } from 'vitepress'

const { theme } = useData()
</script>

<template>
  <img :src="withBase(theme.logoPath)" />
</template>
```

