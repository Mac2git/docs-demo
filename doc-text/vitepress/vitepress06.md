# 6.config文件配置

<img src="/vitepressImage/config.png" style="zoom:60%;" />

## 配置图标和js

配置图标在 .vitepress 中的 config文件中的head里面配置

```json
 head: [
    ["link", { rel: "icon", href: "./webImage/logo.svg" }],
    ['script',{ src:'./webjs/anime.min.js' }],
 ],
```

配置js

```json
 head: [
    ["link", { rel: "icon", href: "./webImage/logo.svg" }],
    ['script',{ src:'./webjs/anime.min.js' }],
 ]
```

## 目录

在config文件中的 themeConfig 中配置

```json
outlineTitle:"目录",
```

效果：

<img src="/vitepressImage/配置目录效果.png" style="zoom:60%;" />

这样右面显示我们的目录了！

## 配置logo

在我们的 themeConfig 下的配置

```json
themeConfig: {
	logo: './background.webp',
}
```

效果展示：

<img src="/vitepressImage/logo.png" style="zoom:60%;" />



