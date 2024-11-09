# 第二章

## 远程登录到 Linux 服务器

为什么需要远程登录 Linux

1. Linux 服务器是开发小组共享
2. 正式上线的项目是运行在公司
3. 因此程序需要远程登录到 Linux 进行项目或者开发
4. 远程登录客户端有 `Xshell6`，`Xftp6`，我们学习使用 `Xshell6`和 `Xftp6`，其他的远程工具大同小异

### 远程登录 Linux-Xshell6

介绍

说明：Xshell 是目前最好的远程登录到 Linux 操作的软件，流畅的速度并且完美解决了中文乱码的问题，是目前程序员首选的软件



Xshell 是一个强大的安全终端模拟软件，它支持 SSH1,SSH2，以及 Microsft Windows 平台的 Telenet 协议



Xshell 可以在 Windows 界面下用来访问远端不同系统下的服务器，从而比较好的达到远程控制终端的目的

<img src="/LinuxImages/xshell.png" style="zoom:60%;" />

下载-安装-配置和使用：

下载 free-for-home-school 版本

地址：https://www.xshell.com/zh/xshell-download/

```shell
ifconfig   # 查看 ip 地址
```

连接 Linux

<img src="/LinuxImages/连接.png" style="zoom:60%;" />

然后点击连接，再点击 Centos7.6，设置账号密码

<img src="/LinuxImages/设置账号密码centos.png" style="zoom:60%;" />

**<span style="color:#FF0000;">注意：连接完成之后千万不要把 Linux 关机，不然连接不上</span>**

### 远程上传下载文件-Xftp6

介绍

是一个基于 windows 平台的功能强大的 SFTP、FTP 文件传输软件。使用了 Xftp 以后，windows 用户能在安全地在 unix/Linux 和 windows PC 直接传输文件。

<img src="/LinuxImages/xftp.png" style="zoom:60%;" />

跟 xshell 一样

<img src="/LinuxImages/xftp2.png" style="zoom:60%;" />

如果乱码，在左上角点击文件 -> 当前会话属性 -> 点击选项 -> 编码选择 UTF-8 即可

```shell
reboot 		# 重启
```

## Vi 和 Vim 编辑器

### vi 和 vim 的基本介绍

<img src="/LinuxImages/vim.png" style="zoom:60%;" />

Linux 系统会内置 vi 文本编辑器

Vim 具有程序编辑的能力，可以操作是 Vi 的增强版本，可以主动的以字体颜色辨别语法的正确性，方便程序设计。代码补完，编译及错误跳转等方便编程的功能特别丰富，在程序员中被广泛使用。

### vi 和 vim 常用的三种模式

1. 正常模式

   以 vim 打开一个档案就直接进入一般模式了（这就是默认的模式）。在这个模式中，你可以使用【上下左右】按键来移动光标、你可以使用【删除字符】或【删除整行】来处理档案内容，也可以使用【复制、粘贴】来处理你的文件数据。

2. 插入模式

   按下 i、I、o、O、a、A、r、R 等任何一个字母之后才会进入编辑模式，一般来说按 i 即可

3. 命令行模式

   在这个模式当中，可以提供你的相关指令，完成读取、存盘、替换、离开 vim 、显示行号等的动作则是在此模式中达成的！

例：使用 vim 开发一个 Hello.java 程序，保存 步骤 说明和演示

1. vim/vi Hello.java	# 使用 vi/vim 开发一个 Hello.java 的程序

2. 按下回车

3. 输入 i 

4. 开始写代码

   ```java
   public class Hello{
       public static void main(String[] args){
           System.out.println("Hello,World");
       }
   }
   ```

5. 写完按 esc键，退出编辑模式，在输入 :wq 进入命令行模式 ，wq 表示写入并退出

6. 如何想修改代码就 vim 文件名

### 各种模式的相互切换

看看vi和vim各个模式的切换图

<img src="/LinuxImages/vi和vim的各个模式切换.png" style="zoom:80%;" />

### vi 和 vim 快捷键

1. 拷贝当前行 yy ，拷贝当前行向下的5行，5yy，并粘贴（输入p粘贴）。
2. 删除当前行 dd，删除当前行向下的5行，5dd
3. 在文件中查找某个单词【命令行下：输入/关键字，回车查找，输入 n 就是查找下一个】
4. 设置文件的行号，取消文件的行号.【命令行下 :set nu（显示行号） 和 :set nonu（销毁行号）】
5. 编辑 /etc/profile 文件，使用快捷键到该文档的最末行【G】和最首行【gg】
6. 在一个文件中输入 "hello"，然后有撤销这个动作 u
7. 编辑 /etc/profile 文件，并将光标移动到 20 行 先输入20，在输入shift+g
8. 更多快捷键，请访问：https://blog.csdn.net/m0_73557631/article/details/141259013

> 注意：快捷键要在一般模式下使用，区分大小写

## Linux 开机、重启和用户登录注销

### 关机&重启命令

基本介绍

```shell
shutdown -h now			# 立刻进行关机
shudown -h n 			# hello，n分钟后关机了
shutdown -r now			# 现在重新启动计算机
halt					# 关机，作用和上面一样
reboot					# 立刻重新启动计算机
sync					# 把内存的数据同步到磁盘
```

注意细节：

1. 不管是重启系统还是关闭系统，首先要运行sync命令，把内存中的数据写到磁盘中
2. 目前的 shutdown/reboot/halt 等命令均已经在关机前进行了 sync，<span style="color:#FF3333; font-weight:bold;">提示一下：小心驶得万年船</span>

### 用户登录和注销

基本介绍

1. 登录时尽量少用 root 账号登录，因为它是系统管理员，最大的权限，避免操作失误。可以利用普通用户的登录 `su -用户名` 命令来切换成系统管理员身份
2. 在提示符下输入 logout 即可注销用户
3. 如果是普通用户，使用 `su - 用户名`切换到管理员用户，使用 logout 可以回到普通用户。普通用户在使用 logout 命令，就可以退出系统了

使用细节

1. <span style="color:#FF3333;">logout 注销指令在图形运行级别无效，在运行级别 3 （无界面）下有效</span>
2. 运行级别这个概念，后面介绍

### 用户管理

Linux 系统是一个多用户多任务的操作系统，任何一个要使用系统资源的用户，都必须首先向系统管理员申请一个账号，然后这个账号的身份进入系统

#### 添加用户

基本语法

```shell
useradd 用户名 # 创建用户并指定用户的家目录，为 `用户名` 
ls	# 列出所有文件夹
```

注意：

1. 当创建用户成功后，会自动的创建和用户同名的家目录，默认该用户的家目录在 /home/用户名
2. 也可以通过 `useradd -d 指定目录` 新的用户名，给新创建的用户指定家目录

例：

```shell
useradd -d /home/test tom # 创建一个tom的用户，指定tom的家目录为test
```

####  指定/设定/修改密码

基本语法

```shell
passwd 用户名 
pwd # 显示当前用户所在的目录
```

<span style="font-weight:bold; color:#CC0000;">如果不指定用户，就默认给当前登录的用户指定/修改密码</span>

#### 删除用户

基本语法

```shell
userdel 用户名
```

1. 删除用户，但是保存用户的家目录

   ```shell
   userdel 用户名
   ```

2. 删除用户以及用户的主目录(<span style="font-weight:bold; color:#CC0000;">慎重选择</span>)

   ```shell
   userdel -r 用户名 # r 表示删除用户，同时把家目录删除
   ```

<span style="color:#CC0000; font-weight:bold;">自己不能删除自己，因为权限不足~</span>

>是否保留家目录？
>
>​	一般情况下，我们建议保留

#### 查询用户信息指令

基本语法

```shell
id 用户名
```

<span style="color:#FF0000; font-weight:bold;">当用户不存在时，返回无此用户</span>

#### 切换用户

介绍

在操作 Linux 中，如果当前的用户的权限不够，可以通过 `su - 指令`，切换到高权限用户，比如 `root`

基本语法

```shell
su - 切换用户名
```

细节说明

1. 从权限高的用户切换到权限低的用户，不需要输入密码，反之需要。
2. 当需要返回到原来用户时，使用 `exit/logout` 指令

#### 查看当前用户/登录用户

基本语法

```shell
whoami/ who am I # 显示第一次登录的信息 
```

#### 用户组

类似于角色，系统可以对有共性的多个用户进行统一的管理（权限）

新增组

```shell
groupadd 组名
```

删除组

```shell
groupdel 组名
```

增加用户时直接加上组

```shell
useradd -g 用户组 用户名
```

清屏

```shell
clear
```

<span style="color:#FF0000;">如果添加用户，没有指定组，默认创建一个组，组名就是`用户名`</span>

例：

增加一个用户 `zwj`，直接将它指定到 `wudang` 这个组

```shell
groupadd wudang
useradd -g wudang zwj
```

修改用户组

```shell
usermod -g 用户组 用户名
```

例：

创建一个组 mojiao，把 zwj 放到 mojiao

```shell
groupadd mojiao
usermod -g mojiao zwj
```

用户和组相关文件

`/etc/passwd`文件，用户(user)的配置文件，记录用户的各种信息

每行的含义：`用户名:口令(口令是加密的):用户标识号(uid):组标识号(gid):注释性描述:主目录:登录shell`

`/etc/shadow`文件，口令的配置文件

每行的含义：`登录名:加密口令:最后一次修改时间:最小时间间隔:最大时间间隔:警告时间:不活动时间:失效时间:标志`

`/etc/group`文件，组(group)的配置文件，记录Linux包含的组的信息

每行的含义：`组名:口令:组标识号:组内用户列表`

