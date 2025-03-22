# 8.提交并部署到 git pages

## 新建.gitignore的文件

在docs目录下创建即可

编写以下代码，防止无用的文件上传，延长不必要的效率

```tex
node_modules
.DS_Store
dist
dist-ssr
cache
.cache
.temp
*.local
```

## 新建README.md

这个是我们的介绍文档，当别人点击你的仓库的时候，下面会有介绍

去github创建仓库，没有账号的先注册一个，然后点击 new  =》 填写 Repository name =》 再点击 Create repository

git仓库就创建好了

## 初始化git

如果你是第一次提交到仓库就按照以下命令执行

1. 初始化git

   ```cmd
   git init
   ```

2. 添加文件（这个点是所有文件）

   ```cmd
   git add .
   ```

3. 添加到暂存区

   ```cmd
   git commit -m '描述'
   ```

4. 修改分支，有的是 main 分支，有的是 master 分支 ，看个人，我这个是 main 分支

   ```cmd
   git pull origin main --force
   ```

5. 提交到git

   ```cmd
   git push
   ```

如果不是第一次提交，请省略第三步，git add .  这个 . 可以换成要提交的文件名 