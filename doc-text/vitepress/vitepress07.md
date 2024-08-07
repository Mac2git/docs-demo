# 7.配置页脚

在 themeConfig 下面配置

```json
footer: {
   copyright: '页脚'
}
```

这样首页就能显示页脚了！

<img src="/vitepressImage/配置页脚.png" style="zoom:60%;" />



## 侧边栏

在我们的 .VitePress 下面的 config 文件添加代码，以下为参考代码，具体以实际为主

```typescript
sidebar: [
      {
        text: 'Examples',//大标题
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },//text为小标题，link为markdown路径
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
],
```

每个 `link` 都应指定以 `/` 开头的实际文件的路径。如果在链接末尾添加斜杠，它将显示相应目录的 `index.md`。

可以进一步将侧边栏项目嵌入到 6 级深度，从根级别上计数。请注意，深度超过 6 级将被忽略，并且不会在侧边栏上显示。

```typescript
export default {
  themeConfig: {
    sidebar: [
      {
        text: 'Level 1',
        items: [
          {
            text: 'Level 2',
            items: [
              {
                text: 'Level 3',
                items: [
                  ...
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

## [可折叠的侧边栏组](https://vitepress.dev/zh/reference/default-theme-sidebar#collapsible-sidebar-groups)

通过向侧边栏组添加 `collapsed` 选项，它会显示一个切换按钮来隐藏/显示每个部分。

```javascript
export default {
  themeConfig: {
    sidebar: [
      {
        text: 'Section Title A',
        collapsed: false,
        items: [...]
      }
    ]
  }
}
```

默认情况下，是不可折叠的。如果希望它们可以折叠,，请将 `collapsed` 选项设置为 `true`,为 `true`为默认折叠。

```javascript
export default {
  themeConfig: {
    sidebar: [
      {
        text: 'Section Title A',
        collapsed: true,
        items: [...]
      }
    ]
  }
}
```

效果：

<img src="/vitepressImage/collapsed.png" style="zoom:60%;" />

## 上一页下一页配置

在 themeConfig 下面配置

```json
 docFooter: {
    prev: '上一文',
    next: '下一文'
 },
```

效果：

<img src="/vitepressImage/上下页配置.png" style="zoom:60%;" />

## 自定义编辑链接

在 themeConfig 下配置

```json
//自定义编译链接
editLink: {
   pattern: "编辑地址",
   text: "Github编辑此页",
},    
```

自定义编辑链接：

<img src="/vitepressImage/自定义编辑链接.png" style="zoom:60%;" />

## 配置搜索

在 themeConfig 下面配置

```json
search: {
 provider: "local",
 options: {
   translations: {
     button: {
       buttonAriaLabel: "搜索文档",
     },
     modal: {
       noResultsText: "无法找到相关结果",
       resetButtonTitle: "清除查询条件",
       footer: {
         selectText: "选择",
         navigateText: "切换",
       }, 
     },
   },
 }
}
```

效果展示：

<img src="/vitepressImage/配置搜索.png" style="zoom:60%;" />

## 最后更新

在 themeConfig 中配置

```json
lastUpdated: {
 text: '最后更新',
 formatOptions: {
   dateStyle: 'full',
   timeStyle: 'medium'
 }
},
```

<img src="/vitepressImage/最后更新.png" style="zoom:60%;" />



