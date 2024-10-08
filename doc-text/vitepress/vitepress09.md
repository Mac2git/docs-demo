# 9.开启GithubActions并配置deploy

## 进入仓库设置界面

找到仓库名 `vitehub`

点击设置 `Settings`

找到页面 `Pages`

再找到 `Github Actions`

## 创建 `deploy.yml` 文件

在根目录下新建文件夹`.github`

进入`.github`后，新建一个文件夹，名字为`workflows`

最后在文件夹`workflows`下新建文件 `.deploy.yml`

## 在deploy.yml输入下面的内容

针对 npm 而言

```yml
# 构建 VitePress 站点并将其部署到 GitHub Pages 的示例工作流程
#
name: Deploy VitePress site to Pages

on:
  # 在针对 `main` 分支的推送上运行。如果你
  # 使用 `master` 分支作为默认分支，请将其更改为 `master`
  push:
    branches: [main]

  # 允许你从 Actions 选项卡手动运行此工作流程
  workflow_dispatch:

# 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列
# 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建工作
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
      # - uses: pnpm/action-setup@v2 # 如果使用 pnpm，请取消注释
      # - uses: oven-sh/setup-bun@v1 # 如果使用 Bun，请取消注释
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: npm # 或 pnpm / yarn
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Install dependencies
        run: npm ci # 或 pnpm install / yarn install / bun install
      - name: Build with VitePress
        run: |
          npm run docs:build # 或 pnpm docs:build / yarn docs:build / bun run docs:build
          touch .vitepress/dist/.nojekyll      
        # 上面这里我把官网默认的docs/给删掉了
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: .vitepress/dist
        # 上面这里我把官网默认的docs/给删掉了

  # 部署工作
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

点击右上角的 Commit changes... 再点击 Commit changes 慢慢等得即可，如果部署成功 github仓库 会有一个 绿色的对钩，然后再点击 

Settings ，点击 Pages , 然后 Github Pages 上有一个 Your site is live at  xxxx 就代表你已经成功部署了