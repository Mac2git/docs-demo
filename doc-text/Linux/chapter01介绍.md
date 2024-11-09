# Linux

## Linux介绍

<img src="/LinuxImages/logo.jfif" alt="img" style="zoom: 50%;" />

Linux，一般指GNU/Linux（单独的Linux内核并不可直接使用，一般搭配GNU套件，故得此称呼），是一种免费使用和自由传播的[类UNIX](https://baike.baidu.com/item/类UNIX/9032872?fromModule=lemma_inlink)操作系统，其内核由[林纳斯·本纳第克特·托瓦兹](https://baike.baidu.com/item/林纳斯·本纳第克特·托瓦兹/1034429?fromModule=lemma_inlink)（Linus Benedict Torvalds）于1991年10月5日首次发布，它主要受到[Minix](https://baike.baidu.com/item/Minix/7106045?fromModule=lemma_inlink)和[Unix](https://baike.baidu.com/item/Unix/219943?fromModule=lemma_inlink)思想的启发，是一个基于[POSIX](https://baike.baidu.com/item/POSIX/3792413?fromModule=lemma_inlink)的多用户、[多任务](https://baike.baidu.com/item/多任务/1011764?fromModule=lemma_inlink)、支持[多线程](https://baike.baidu.com/item/多线程/1190404?fromModule=lemma_inlink)和多[CPU](https://baike.baidu.com/item/CPU/120556?fromModule=lemma_inlink)的[操作系统](https://baike.baidu.com/item/操作系统/192?fromModule=lemma_inlink)。它支持[32位](https://baike.baidu.com/item/32位/5812218?fromModule=lemma_inlink)和[64位](https://baike.baidu.com/item/64位/2262282?fromModule=lemma_inlink)硬件，能运行主要的[Unix](https://baike.baidu.com/item/Unix/219943?fromModule=lemma_inlink)工具软件、应用程序和网络协议。

Linux，Linux Is Not UniX 的[递归缩写](https://baike.baidu.com/item/递归缩写/2216444?fromModule=lemma_inlink)，一般指GNU/Linux，是一套免费使用和自由传播的类Unix操作系统，是一个遵循POSIX的多用户、多任务、支持多线程和多[CPU](https://baike.baidu.com/item/CPU/120556?fromModule=lemma_inlink)的操作系统。

伴随着[互联网](https://baike.baidu.com/item/互联网/199186?fromModule=lemma_inlink)的发展，Linux得到了来自全世界软件爱好者、组织、公司的支持。它除了在[服务器](https://baike.baidu.com/item/服务器/100571?fromModule=lemma_inlink)方面保持着强劲的发展势头以外，在个人电脑、[嵌入式](https://baike.baidu.com/item/嵌入式/575465?fromModule=lemma_inlink)系统上都有着长足的进步。使用者不仅可以直观地获取该操作系统的实现机制，而且可以根据自身的需要来修改完善Linux，使其最大化地适应用户的需要。 [1]

Linux不仅系统性能稳定，而且是[开源软件](https://baike.baidu.com/item/开源软件/8105369?fromModule=lemma_inlink)。其核心[防火墙](https://baike.baidu.com/item/防火墙/52767?fromModule=lemma_inlink)组件性能高效、配置简单，保证了系统的安全。在很多企业网络中，为了追求速度和安全，Linux不仅仅是被网络运维人员当作服务器使用，甚至当作网络防火墙，这是Linux的一大亮点。 [2]

Linux具有[开放源码](https://baike.baidu.com/item/开放源码/7176422?fromModule=lemma_inlink)、没有版权、技术社区用户多等特点，开放源码使得用户可以自由裁剪，灵活性高，功能强大，成本低。尤其系统中内嵌网络协议栈，经过适当的配置就可实现[路由器](https://baike.baidu.com/item/路由器/108294?fromModule=lemma_inlink)的功能。这些特点使得Linux成为开发路由交换设备的理想开发平台。

Linux 内核网站：[The Linux Kernel Archives](https://www.kernel.org/)

Linux 主要指的是内核，CentOS使用的内核就是Linux

Linux主要发行版：

**Ubuntu(乌班图)**、**RedHat(红帽)**、**CentOS基于Redhat二次开发**、Debain(蝶变)、Fedora、SuSE、OpenSUSE

## Linux 和 Unix 的关系

Linux是一种类Unix的操作系统

‌**Linux和Unix的关系是Linux是一种类Unix的操作系统**‌。Linux是基于Unix的设计思想开发的，继承了Unix的许多核心概念和特性，如多用户支持、虚拟内存和多任务处理等‌

## VM ware 和 Linux 的安装

先安装 VM ware,VM ware 官网：http://vmware.whswxkj.com/index.html

前提：有的电脑安装不上，需要开启 虚拟化支持，详见如下：

### 如何开启‌[BIOS](https://www.baidu.com/s?rsv_idx=1&tn=68018901_16_pg&wd=BIOS&fenlei=256&usm=1&ie=utf-8&rsv_pq=d762a5cd00065059&oq=bios开启虚拟化支持&rsv_t=7564cTBrzAzhRCqghHE%2BWgYNuSze4iC2MvMZiDHaJE47CGJBisRqHVHtqQxucdo8GQttkUc&sa=re_dqa_generate)中的‌[虚拟化支持](https://www.baidu.com/s?rsv_idx=1&tn=68018901_16_pg&wd=虚拟化支持&fenlei=256&usm=1&ie=utf-8&rsv_pq=d762a5cd00065059&oq=bios开启虚拟化支持&rsv_t=d64aFOvYVPEWBUF4QbOOgo9GaR%2BU80g3eCE9I%2BfwgUNUVIh5aHAV4YXFBppf3arxcZniIjI&sa=re_dqa_generate)

1. ‌**进入BIOS设置**‌：在计算机开机时，按下Del、F2或其他键进入BIOS设置。
2. ‌**找到虚拟化选项**‌：在BIOS设置中，找到虚拟化选项，通常位于“高级”或“安全”选项下方。
3. ‌**开启虚拟化支持**‌：将“虚拟化技术”或“‌[Intel VT-x](https://www.baidu.com/s?rsv_idx=1&tn=68018901_16_pg&wd=Intel VT-x&fenlei=256&usm=1&ie=utf-8&rsv_pq=d762a5cd00065059&oq=bios开启虚拟化支持&rsv_t=8ab65FMfiTTHoGh84f5HHlSIT57okdtxFzubChFlNDNs25vJ921vJ6t1wqMrmQ%2BX%2FyxZb3o&sa=re_dqa_generate)”等选项设置为“启用”。如果使用‌[AMD](https://www.baidu.com/s?rsv_idx=1&tn=68018901_16_pg&wd=AMD&fenlei=256&usm=1&ie=utf-8&rsv_pq=d762a5cd00065059&oq=bios开启虚拟化支持&rsv_t=7f54kJKTFXnt9lxggRvw8Wok1suWKvhjsJhNB0gD0O%2ByA9SsKkuLY%2B39jvmK7RYPbv1DSZ4&sa=re_dqa_generate) CPU，该选项可能被命名为“AMD-V”。
4. ‌**保存设置并退出**‌：保存设置并退出BIOS设置。
5. ‌**检查虚拟化支持是否开启**‌：使用第三方工具检查虚拟化支持是否成功开启。

### 不同平台的具体操作步骤

1. ‌**Intel平台**‌：
   - 进入BIOS后，按压键盘上的`delete`键进入BIOS [EZ Mode]页面。
   - 按压键盘F7键，进入Advance Mode。
   - 点选[Advanced]页面并选择[CPU Configuration]选项。
   - 选择[Intel(VMX) Virtualization Technology]选项并设置为[Enabled]。
   - 按压键盘`F10`键保存设置并重启电脑。
2. ‌**AMD平台**‌：
   - 进入BIOS后，按压键盘上的`delete`键进入BIOS [EZ Mode]页面。
   - 点选[Advanced]页面并选择[CPU Configuration]选项。
   - 选择[SVM Mode]选项并设置为[Enabled]。
   - 按压键盘F10键保存设置并重启电脑。

安装教程：https://blog.csdn.net/m0_74075744/article/details/140804922

### 下载和安装Centos

下载 Centos

下载链接(阿里云镜像)：https://mirrors.aliyun.com/centos/

下载链接(搜狐镜像)：https://mirrors.sohu.com/centos/

在VM ware安装Centos教程：

1. 打开 VM ware
2. 点击文件
3. 新建虚拟机
4. <img src="/LinuxImages/步骤4.png" style="zoom60%;" />
5. 下一步，下一步
6. <img src="/LinuxImages/选择Linux版本.png" style="zoom:67%;" />
7. 一定要先选择 Red Hat xxx版本，因为 Centos本身就是 RedHat 的一个版本
8. <img src="/LinuxImages/虚拟机存储位置.png" style="zoom:60%;" />
9. 第八步，选择位置，尽量要选择磁盘大的位置，然后点击下一步
10.  <img src="/LinuxImages/Centos存储空间.png" style="zoom:60%;" />
    1. 假如目前分配的 20G 的存储空间，并不意味着马上立即占有，它是随着使用的过程中，文件的增多，才会慢慢的占有空间。
    2. 如果不够使用，可以到时候增加磁盘
11. 下一步
12. <img src="/LinuxImages/虚拟机自定义.png" style="zoom:60%;" />
13. 点击自定义硬件
14. <img src="/LinuxImages/虚拟机设置.png" style="zoom:60%;" />
    1. 内存按需分配，我这里分配了2个G
    2. 处理器分配要取决于你的主机 CPU 的情况
    3. 不能超过你主机的处理器的数量
    4. 网络适配器：一般情况下我们选择 NAT 模式
       1. 桥接模式
       2. NAT 模式
       3. 仅主机模式
       4. 自定义
15. 点击完成，虚拟机就创建好了，但还是不能用的
16. 点击左侧创建好的虚拟机，右键点击设置，点击 CD/DVD，右侧点击使用 iso 镜像文件，选择你下载的 Centos 镜像文件，点击确定，就 OK 了

完整Centos安装教程：https://blog.csdn.net/2401_87299120/article/details/142420961

**注意：**

![img](https://img-blog.csdnimg.cn/20210909214134660.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5bCP5bCP5byg6Ieq55Sx4oCUPuW8oOacieWNmg==,size_16,color_FFFFFF,t_70,g_se,x_16)

这里面的最小安装是不带页面的，一般适用于服务器，不使于我们初学者，建议带一个页面。点击软件选择

 <img src="/LinuxImages/Centos7安装软件选择.png" style="zoom:60%;" />

选这几项就够了，如果选了开发工具就默认装 `gcc、jdk、MySQL...`  就默认装上了，然后点击完成

安装位置配置：

<img src="/LinuxImages/安装位置分区.png" style="zoom:60%;" />

然后进入，分区选项。

一般我们Linux分为三个区

1. 第一部分为 boot 分区，一般 boot 分区为 1G

   1. boot 分区的解释

      1. Linux中的boot分区定义和作用

         Linux的boot分区是指在安装Linux操作系统时需要预留的一个特定分区，用于存放‌[引导器](https://www.baidu.com/s?rsv_idx=1&tn=68018901_16_pg&wd=引导器&fenlei=256&usm=1&ie=utf-8&rsv_pq=bcc1134e00117762&oq=linux的boot分区&rsv_t=3a7eOZfoz2v7sHsOfCYIJmBwg5Z%2B1mVY%2BF2yhI%2BkyxU6LudP%2F%2FnfLmQBbbsokjXKSbyrh3A&sa=re_dqa_generate)和‌[内核映像](https://www.baidu.com/s?rsv_idx=1&tn=68018901_16_pg&wd=内核映像&fenlei=256&usm=1&ie=utf-8&rsv_pq=bcc1134e00117762&oq=linux的boot分区&rsv_t=97dagidetFmgdMuCm30fGLCQaIBWgu9ivW1W1SJYoQssegQAYirrjeFCarlf8suZWrwftW0&sa=re_dqa_generate)。boot分区的存在主要是为了解决启动问题和兼容性问题。在启动过程中，计算机需要找到引导器和内核文件，并正确加载它们。boot分区包含了操作系统的内核和在启动系统过程中所要用到的文件，即使主要的根分区出现了问题，计算机依然能够启动。

      2. boot分区主要包含以下内容：

         - ‌**引导加载程序**‌：如‌[GRUB](https://www.baidu.com/s?rsv_idx=1&tn=68018901_16_pg&wd=GRUB&fenlei=256&usm=1&ie=utf-8&rsv_pq=bcc1134e00117762&oq=linux的boot分区&rsv_t=cfbf5Sr2iQk4EoJNpqyZPIOQtb5HlZnXEtT%2FTBCkkUY9p0ut8M0wC52mJoAeeErt6zofudk&sa=re_dqa_generate)或‌[LILO](https://www.baidu.com/s?rsv_idx=1&tn=68018901_16_pg&wd=LILO&fenlei=256&usm=1&ie=utf-8&rsv_pq=bcc1134e00117762&oq=linux的boot分区&rsv_t=7b14qe3c3FqheV8RlPlNlkeak1eSdWMf%2BnB%2B%2Bd3YJ2GeRQUGasEs9xt0GGHChqtpSHaj%2FLM&sa=re_dqa_generate)，用于在计算机启动时加载操作系统。

         - ‌**内核文件**‌：操作系统的核心部分，负责初始化硬件设备和文件系统等。

         - ‌**其他启动相关文件**‌：包括‌[配置文件](https://www.baidu.com/s?rsv_idx=1&tn=68018901_16_pg&wd=配置文件&fenlei=256&usm=1&ie=utf-8&rsv_pq=bcc1134e00117762&oq=linux的boot分区&rsv_t=db044jdKbvTrkWXwzBzetIfpbgrjDlti2M%2BKKhftfJCUAQ9lh4DyQ5g%2F5jg7BTGwr%2BaST3Y&sa=re_dqa_generate)等，确保系统的顺利启动。‌

      3. boot分区的大小

         boot分区的大小通常在60MB到120MB之间，但新版本的Linux发行版可能不需要单独划分boot分区，可以直接使用根分区。‌1

2. 第二部分为 swap(用来做交换的) 分区，一般 swap 分区为 2G

   1. swap分区

      Swap分区是Linux系统中用于临时存储内存中未使用的数据的一部分，这些数据可能会在将来某个时刻被重新调用。Swap分区通常是硬盘上的一个特殊文件，但也可以是一个分区或一个交换区。

3. 第三部分就是我们的 root 分区，剩下的全是我们的 root 分区

   1. 在‌[Linux](https://www.baidu.com/s?rsv_idx=1&tn=68018901_16_pg&wd=Linux&fenlei=256&usm=1&ie=utf-8&rsv_pq=cf9a1afe000d3e31&oq=linux的root分区&rsv_t=bdd00E3ifJ81iY4HM3HXxzJzL7q30vIyE4eAEmbdSdhhw1as5x7aUgfFkp50003ER013xgM&sa=re_dqa_generate)系统中，root分区是指包含系统核心文件和程序的分区。通常，根目录（/）所在的分区被称为root分区。这个分区包含了操作系统的主要文件，如系统命令、库文件、配置文件等。root用户是Linux系统中的最高权限用户，对root分区的访问和修改需要谨慎操作，以避免系统不稳定或数据丢失。

   2. 如何查看root分区

      要查看root分区，可以通过以下几种方法：

      1. ‌**使用`df -h`命令**‌：这个命令可以显示系统中所有分区的信息，包括分区的挂载点、容量、已用空间和剩余空间等。通过这个命令，可以很容易地找到root分区。

      2. ‌**查看`/etc/fstab`文件**‌：这个文件存储了文件系统信息和挂载点信息，通过查看这个文件可以确定root分区的具体信息。

      3. ‌**查看`/proc/mounts`文件**‌：这个文件存储了已挂载的文件系统信息，通过查看这个文件也可以找到root分区的信息。

   3. 如何管理根分区

      管理根分区分区主要包括扩容、调整分区大小等操作。以下是一些常见的方法：

      1. **使用‌[LVM](https://www.baidu.com/s?rsv_idx=1&tn=68018901_16_pg&wd=LVM&fenlei=256&usm=1&ie=utf-8&rsv_pq=cf9a1afe000d3e31&oq=linux的root分区&rsv_t=caa3qlh6hpA86plJ2nr8LltA7L3fXP78%2B9%2FQI%2Ft7ac0d3Gbhx6MQm08IEEencT1glIAmWOA&sa=re_dqa_generate)（逻辑卷管理）进行扩容**‌：可以通过创建新的物理卷、扩展逻辑卷组、扩展逻辑卷、格式化逻辑卷等步骤来增加根分区的容量。
      2. ‌**调整分区大小**‌：如果发现根分区空间不足，可以通过调整分区大小来解决。这通常涉及到删除不必要的文件、优化系统配置或增加更多的存储空间。

<img src="/LinuxImages/分区设置.png" style="zoom:60%;" />

点击 + 号，选择 boot 分区，分1G

<img src="/LinuxImages/boot分区.png" style="zoom:60%;" />

分好区，点击添加挂载点，然后我们要把文件系统切为 ext4，如下

<img src="/LinuxImages/分区2.png" style="zoom:60%;" />

**swap分区的文件系统只能是 swap，根分区文件系统也是 ext4**

**注意系统中的：**

1. 网络和主机名要打开
2. 密码设置要复杂一点

<img src="/LinuxImages/swap.png" style="zoom:60%;" />

根分区

<img src="/LinuxImages/根分区.png" style="zoom:60%;" />

配置完之后点击完成，会弹出一个对话框，点击接收更改

点击网络和主机名

<img src="/LinuxImages/网络和主机名.png" style="zoom:60%;" />

## 网络连接的三种方式

1. 桥接模式：

   虚拟系统可以和外部系统相互通讯，但是容易造成 ip 冲突

2. NAT 模式：

   网络地址转换模式，虚拟系统可以和外部系统相互通讯，不造成 ip 冲突

3. 主机模式：

   独立的系统，不和外部产生联系。

## 虚拟机的克隆

如果你已经安装了一台 Linux 操作系统，你还想要更多的，没有必要再重新安装，只需要克隆就可以

方式1，直接拷贝一份安装好的虚拟机文件，然后再 VM ware 打开就行

方式2，使用 VM ware 的克隆操作，**注意，克隆时，需要关闭 Linux 系统**

<img src="/LinuxImages/虚拟机克隆.png" style="zoom:60%;" />

## 虚拟机的快照

如果在使用虚拟机系统的时候（比如 Linux），想回到原来的某一个状态， 也就是说你担心可能有些误操作造成系统异常，需要回到原来某个正常运行的状态，vm ware 也提供了这样的功能，就叫快照管理。

应用实例

1. 安装好系统以后，先做一个快照 A
2. 进入到系统，创建一个文件夹，在保存一个快照 B
3. 回到系统刚刚安装好的状态，即快照 A
4. 试试看，是否还能再次回到快照 B

先拍摄快照

<img src="/LinuxImages/快照1.png" style="zoom:60%;" />

在拍摄快照 B，最后拍摄快照 C

假如快照 C 系统崩溃，我们想回到初始状态，我们可以使用我们刚刚拍摄的快照A或B，可以恢复到开始状态，我们先恢复到快照 A

<img src="/LinuxImages/快照恢复.png" style="zoom:60%;" />

点击快照 A，然后等待系统重启，就恢复到快照A了

<img src="/LinuxImages/快照A.png" style="zoom:60%;" />

可以看到我们已经恢复到快照 A 了，我们再试试恢复到快照B

<img src="/LinuxImages/快照B.png" style="zoom:60%;" />

可以看到，我们恢复到快照B了，最后我们在快照 B 基础上创建一个文件夹 D，然后我们在拍摄快照，命名为快照D试试

<img src="/LinuxImages/快照B基础上创建文件夹D.png" style="zoom:60%;" />

可以看到，我们在快照 B 的基础上创建了一个文件夹 D

<img src="/LinuxImages/快照D.png" style="zoom:60%;" />

可以看到，我们刚拍摄了一个快照 D，点击快照管理器，就可以看到我们当前的一个状态了

<img src="/LinuxImages/快照管理器.png" style="zoom:60%;" />

可以看到，我们在快照 B 的基础上，创建了一个快照 D，这样我们，想恢复那个快照就点击那个快照，然后点转到就可以恢复了！

## 虚拟机的迁移和删除

虚拟机系统安装好了，它的本质就是文件（放在文件夹的），因此虚拟系统的 迁移很方便，你可以把安装好的虚拟机这个文件夹整体**拷贝或剪切到另外位置使用**，删除也很简单，用 vm ware 进行移除，再点击菜单 -> 从磁盘删除，或者直接手动删除虚拟机系统对应的文件夹即可。

迁移：

1. 使用快捷键，打开虚拟机的存储位置，使用 `Ctrl+X` 剪切到你想要放的位置。

2. 使用 vm ware，克隆。

   <img src="/LinuxImages/虚拟机克隆.png" style="zoom:60%;" />

删除：

1. 直接找到虚拟机的存储位置，`Ctrl+D` 删除即可

2. 使用 vm ware 移除，但是使用 vm ware 进行移除是指向，不会真正的删除你的文件

   <img src="/LinuxImages/移除.png" style="zoom:60%;" />

## 安装 VM tools

介绍

1. vmtools 安装后，可以让我们在 windows 下更好的管理 vm 虚拟机
2. 可以设置 windows 和 centos 的共享文件夹

安装 vm tools 的步骤

1. 进入 centos，点击弹出

   <img src="/LinuxImages/安装vmtools1.png" style="zoom: 50%;" />

2. 点击 vm 菜单 -> 虚拟机 -> 重新安装 vmtools

   如果是灰色的重新安装说明已经安装好了

   <img src="/LinuxImages/vmtools安装.png" style="zoom:67%;" />

3. centos 会出现一个 vm 的 安装包，xx.tar.gz

4. 拷贝到 / opt

5. 使用解压命令 tar，得到一个安装文件

   ```shell
   cd /opt/ 	#进入到 opt 目录
   tar -zxvf xxx.tar.gz 	# 解压 xxx.tar.gz 目录
   ```

6. 进入该 vm 解压的目录，/opt 目录下

   ```shell
   cd vmware
   ```

7. 安装 ./vmware-install.pl

   ```shell
   ./文件名  	#安装文件
   ```

8. 全部使用默认设置即可，就可以安装成功

9. <span style="color:#FF0000;">注意：安装 vmtools 需要有gcc。</span>

   如何查看 Linux 有没有安装 gcc

   ```shell
   gcc -v	# 查看 gcc 版本信息
   ```



## 设置共享文件夹

基本极少

1. 为了方便，可以设置一个共享文件夹，比如：d:/myshare

具体步骤：

1. 右键安装的系统-> 设置 -> 点击选项 -> 共享文件夹 -> 把已禁用改成总是启用，再点击添加就可以了，添加完成之后点击确定，如图设置即可注意：设置选项为 always enable，这样就可以读写了

   <img src="/LinuxImages/vmtools共享文件夹.png" style="zoom:60%;" />

2. windows 和 centos 可共享 d:/myshare 目录可以读写文件了

3. 共享文件夹在 centos 的 /mnt/hgfs/ 下

注意事项和细节说明

1. <span style="color:#FF0000;">windows 和 centos 就可以共享文件夹了，但是在实际开发中，文件的上传和下载是需要使用远程方式完成的</span>
2. 远程方式登录

## Linux 目录结构

基本介绍

1. Linux 的文件系统是采用级层式的树状目录结构，在此结构中的最上层是根目录 “/”，然后在此目录下再创建其他的目录。
2. Linux 树状文件目录是非常重要的
3. <span style="color:#FF0000;">在 Linux 世界里，一切皆文件！在 Linux 的操作系统里，会把硬件当成一个文件来管理</span>

<img src="/LinuxImages/Linux的目录结构.png" style="zoom:60%;" />

具体的目录结构：

1. /bin 【<span style="color:#FF0000;">**常用**</span>】  (/usr/bin、/usr/local/bin)

   是 Binary 的缩写，这个目录存放着最经常用的命令。

2. /sbin （/usr/sbin、/usr/local/sbin）

   s 就是 Super User 的意思，这里存放的是系统管理员使用的系统管理程序。

3. /home 【<span style="color:#FF0000;">**常用**</span>】

   存放着普通用户的主目录，在 Linux 中每个用户都有一个自己的目录，一般该目录名是以用户的账号命名。

   ```shell
   useradd xxx  			# 添加一个 xxx 的用户
   userdel - r xxx 		# 删除一个 xxx 的用户
   ```

4. /root 【<span style="color:#FF0000;">**常用**</span>】

   该目录为系统管理员，也称作超级权限者的用户主目录。

5. /lib 

   系统开机所需要最基本的动态连接共享库，其作用类似于 windows 里的 dll 文件。几乎所有的应用程序都需要用到这些共享库。

6. /lost+found 

   这个目录一般情况下是空的，当系统非法关机后，这里存放了一些文件。

7. /etc 【<span style="color:#FF0000;">常用</span>】

   所有的系统管理所需要的配置文件和子目录 比如安装了 MySQL 数据库：my.conf。

8. /usr 【<span style="color:#FF0000;">常用</span>】

   这是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似于 windows 下的 program files 目录。

9. /boot 【常用】

   存放的是启动 Linux 时使用的一些核心文件，包括一些连接文件以及镜像文件。

10. /proc 【<span style="color:#FF0000;">不能动</span>】

    这个目录是一个虚拟的目录，它是系统内存的映射，访问这个目录来获取系统信息。

11. /srv【<span style="color:#FF0000;">不能动</span>】

    service 的缩写，该目录存放一些服务启动之后需要提前的数据。

12. /sys【<span style="color:#FF0000;">不能动</span>】

    这是 Linux 2.6 内核的一个很大的变化，该目录安装了 2.6 内核中新出现的一个文件系统 sysfs。

13. /tmp

    这个目录是用来存放一些临时文件的。

14. /dev

    类似于 windows 的设备管理器，把所有的硬件用文件的形式存储，例如：CPU，下面就有一个 cpu 的文件夹

15. /media 【<span style="color:#FF0000;">常用</span>】

    Linux 系统会自动识别一些设备，例如U盘、光驱等等，当识别后，Linux 会把识别的设备挂载到这个目录下

16. /mnt 【<span style="color:#FF0000;">常用</span>】

    系统提供该目录是为了让用户临时挂载别的文件系统的，我们可以将外部的存储挂载在 /mnt/ 上，然后进入该目录就可以查看里的内容了。就是前面所说的“共享文件夹”

17. /opt

    这是给主机额外安装软件所存放的目录。如安装 Oracle 数据库就可放到该目录下。默认为空。

18. /usr/local 【<span style="color:#FF0000;">常用</span>】

    这是另一个给主机额外安装软件所安装的目录。一般是通过编译源码方式安装的程序。

19. /var 【<span style="color:#FF0000;">常用</span>】

    这个目录中存放着在不断扩充着的东西，习惯将经常被修改的目录放在这个目录下。包括各种日志文件。

20. /selinux 【security-enhanced linux】

    SELinux 是一种安全子系统，它能控制程序只能方法特定文件，有三种工作模式，可以自行设置。
