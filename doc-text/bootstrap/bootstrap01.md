# 媒体查询(@media)

## 作用：

媒体查询可以在指定的设备上使用对应的样式替代原有的样式。
可以简单理解为：告诉浏览器，当满足某条件时，调用某样式。当满足条件A时，调用A样式； 当满足条件B时，调用B样式。

1、使用媒体查询先在html上加meta标签

```html
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
```

| **屏幕大小**   | **常见宽度范围** |
| -------------- | ---------------- |
| 超小屏幕       | <576px           |
| 平板           | ≥576px           |
| 桌面显示器     | ≥768px           |
| 大桌面显示器   | ≥992px           |
| 超大桌面显示器 | ≥1200px          |

2、编写对应的屏幕代码

```css
/* 超小屏幕 */
@media screen and (max-width:576px){
     .container{
          width: 100%;
     }
}
/* 平板 */
@media screen and (min-width:576px){
     .container{
          width: 540px;
     }
}
/* 桌面显示器 */
@media screen and (min-width:768px){
     .container{
          width: 720px;
     }
}
/* 大桌面显示器 */
@media screen and (min-width:992px){
     .container{
          width: 960px;
     }
}
/* 超大桌面显示器 */
@media screen and (min-width:1200px){
     .container{
          width: 1140px;
     }
}
```

**对应bootstrap中的布局**

| **类名**         | **超小设备<576px** | **平板≥576px** | **桌面显示器≥768px** | **大桌面显示器≥992px** | **超大桌面显示器≥1200px** |
| ---------------- | ------------------ | -------------- | -------------------- | ---------------------- | ------------------------- |
| .container       | 100%               | 540px          | 720px                | 960px                  | 1140px                    |
| .container-sm    | 100%               | 540px          | 720px                | 960px                  | 1140px                    |
| .container-md    | 100%               | 100%           | 720px                | 960px                  | 1140px                    |
| .container-lg    | 100%               | 100%           | 100%                 | 960px                  | 1140px                    |
| .container-xl    | 100%               | 100%           | 100%                 | 100%                   | 1140px                    |
| .container-fluid | 100%               | 100%           | 100%                 | 100%                   | 100%                      |


## 工作原理

Bootstrap的网格系统使用一系列容器、行和列来布局和对齐内容。它采用[弹性框](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)构建，完全响应。下面是一个示例，并深入探讨了网格是如何组合在一起的。

