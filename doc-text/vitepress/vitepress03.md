# 3.安装

## 安装必备

- [Node.js](https://nodejs.org/) 18 及以上版本。

- 通过命令行界面 (CLI) 访问 VitePress 的终端。

- 支持

  Markdown语法的编辑器。

  推荐 [VSCode](https://code.visualstudio.com/) 及其[官方 Vue 扩展](https://marketplace.visualstudio.com/items?itemName=Vue.volar)。

VitePress 可以单独使用，也可以安装到现有项目中。在这两种情况下，都可以使用以下方式安装它([如果没有，点击查看安装方式](https://vitepress.dev/zh/guide/getting-started))：

```cmd
npm add -D vitepress
```

> **`注意:`**
>
> **`VitePress 是仅 ESM 的软件包。不要使用 require() 导入它，并确保最新的 package.json 包含 "type": "module"，或者更改相关文件的文件扩展名，例如 .vitepress/config.js 到 .mjs/.mts。更多详情请参考 [Vite 故障排除指南](http://vitejs.dev/guide/troubleshooting.html#this-package-is-esm-only)。此外，在异步 CJS 上下文中，可以使用 await import('vitepress') 代替。`**

VitePress 附带一个命令行设置向导，可以帮助你构建一个基本项目。安装后，通过运行以下命令启动向导：

```cmd
npx vitepress init
```

将需要回答几个简单的问题：



<img src="/vitepressImage/安装向导.png" style="zoom: 80%;" />

这样就按照完成了！

