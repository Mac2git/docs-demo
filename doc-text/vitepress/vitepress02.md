# 2.性能

1. **快速的初始加载**

   对任何页面的初次访问都将会是静态的、预呈现的 HTML，以实现极快的加载速度和最佳的 SEO。然后页面加载一个 JavaScript bundle，将页面变成 Vue SPA (这被称为“激活”)。与 SPA 激活缓慢的常见假设不同，由于 Vue 3 良好的原始性能和编译优化，这个过程实际上非常快。在 [PageSpeed Insights](https://pagespeed.web.dev/report?url=https%3A%2F%2Fvitepress.dev%2F) 上，典型的 VitePress 站点即使在网络速度较慢的低端移动设备上也能获得近乎完美的性能分数。

2. **加载完成后可以快速切换**

   更重要的是，SPA 模型在首次加载后能够提升用户体验。用户在站点内导航时，不会再触发整个页面的刷新。而是通过获取并动态更新页面的内容来实现切换。VitePress 还会自动预加载视口范围内链接对应的页面片段。这样一来，大部分情况下，用户在加载完成后就能立即浏览新页面。

3. **高效的交互**

   为了能够嵌入静态 Markdown 中的动态 Vue 部分，每个 Markdown 页面都被处理为 Vue 组件并编译成 JavaScript。这听起来可能效率低下，但 Vue 编译器足够聪明，可以将静态和动态部分分开，从而最大限度地减少激活成本和有效负载大小。对于初始的页面加载，静态部分会自动从 JavaScript 有效负载中删除，并在激活期间跳过。

