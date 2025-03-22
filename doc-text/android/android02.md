# 开发环境搭建

1.

   安装android studio

2.

   安装 sdk

3.

   安装 jdk

## 搭建Android Studio开发环境

在电脑上搭建Android Studio开发环境的过程和步骤，首先说明用作开发机的电脑应当具备哪 些基本配置，接着描述了Android Studio的安装和配置详细过程，然后叙述了如何下载Android开发需 要的SDK组件及相关工具。

### 开发机配置要求

工欲善其事，必先利其器。要想保证Android Studio的运行速度，开发用的电脑配置就要跟上。现在一 般用笔记本电脑开发App，下面是对电脑硬件的基本要求： 

1.

   内存要求至少8GB，越大越好。 

2.

   CPU要求1.5GHz以上，越快越好。

3.

   硬盘要求系统盘剩余空间10GB以上，越大越好。
4.

   要求带无线网卡与USB插槽。 

   下面是对操作系统的基本要求（以Windows为例）。

   1.

      必须是64位系统，不能是32位系统。

   2.

      Windows系统至少为Windows 7，推荐Windows 10，不支持Windows XP。 
    
      下面是对网络的基本要求：
    
      1.
    
         最好连接公众网，因为校园网可能无法访问国外的网站。 
    
      2.
    
         下载速度至少每秒1MB，越快越好。因为Android Studio安装包大小为1GB左右，还需要另外下 载几百MB的SDK，所以网络带宽一定要够大，否则下载文件都要等很久。

Windows 的系统要求如下：

| 要求         | 最小值                                                       | 推荐                            |
| :----------- | :----------------------------------------------------------- | :------------------------------ |
| OS           | 64 位 Microsoft Windows 8                                    | 最新的 64 位版 Windows          |
| RAM          | 8 GB RAM                                                     | 至少有 16 GB 的 RAM             |
| CPU          | x86_64 CPU 架构；第 2 代 Intel Core 或更高版本，或者支持 Windows [Hypervisor Framework](https://developer.android.google.cn/studio/run/emulator-acceleration?hl=zh-cn#vm-windows) 的 AMD CPU。 | 最新的 Intel Core 处理器        |
| 磁盘可用空间 | 8 GB（IDE 和 Android SDK 及模拟器）                          | 具有 16 GB 或更多容量的固态硬盘 |
| 屏幕分辨率   | 1280 x 800                                                   | 1920 x 1080                     |

如需在 Windows 上安装 Android Studio，请按以下步骤操作：

- 如果您下载了 `.exe` 文件（推荐），请双击以启动该文件。

- 如果您下载了 `.zip` 文件：

  1. 解压缩 `.zip`。

  2. 将 **android-studio** 文件夹复制到 **Program Files** 文件夹中。

  3. 打开 **android-studio > bin** 文件夹。

  4. 启动 `studio64.exe`（对于 64 位计算机）或 `studio.exe`（对于 32 位计算机）。

  5. 按照 Android Studio 中**设置向导**的指示操作，并安装推荐的 SDK 软件包。

下面的视频逐步演示了使用推荐的 `.exe` 下载文件时的设置流程：

windows安装教程请看：https://developer.android.google.cn/static/studio/videos/studio-install-windows.mp4?hl=zh-cn

如果有新的工具和其他 API 可供使用，Android Studio 将通过弹出式窗口通知您。如需手动检查更新，请依次点击 **Help > Check for Update**。


## Mac

Mac 的系统要求如下：

| 要求         | 最小值                                                       | 推荐                            |
| :----------- | :----------------------------------------------------------- | :------------------------------ |
| OS           | MacOS 10.14 (Mojave)                                         | 最新版本的 MacOS                |
| RAM          | 8 GB RAM                                                     | 至少有 16 GB 的 RAM             |
| CPU          | Apple M1 芯片，或者支持 [Hypervisor Framework](https://developer.android.google.cn/studio/run/emulator-acceleration?hl=zh-cn#vm-windows) 的第二代 Intel Core 或更高版本。 | 最新的 Apple Silicon 芯片       |
| 磁盘可用空间 | 8 GB（IDE 和 Android SDK 及模拟器）                          | 具有 16 GB 或更多容量的固态硬盘 |
| 屏幕分辨率   | 1280 x 800                                                   | 1920 x 1080                     |

如需在 Mac 上安装 Android Studio，请按以下步骤操作：

1.

   启动 Android Studio DMG 文件。

2.

   将 Android Studio 拖放到“Applications”文件夹中，然后启动 Android Studio。

3.

   选择是否要导入之前的 Android Studio 设置，然后点击 **OK**。

4.

   Android Studio **设置向导**会引导您完成其余设置，其中包括下载开发所需的 Android SDK 组件。

下面的视频逐步演示了推荐的设置流程：

mac电脑安装教程请看：https://developer.android.google.cn/static/studio/videos/studio-install-mac.mp4?hl=zh-cn

如果有新的工具和其他 API 可供使用，Android Studio 将通过弹出式窗口通知您。如需手动检查更新，请依次点击 **Android Studio > Check for Updates**。

## Linux

> **注意**：目前不支持采用 ARM CPU 的 Linux 计算机。

Linux 的系统要求如下：

| 要求         | 最小值                                                       | 推荐                            |
| :----------- | :----------------------------------------------------------- | :------------------------------ |
| OS           | 任何支持 GNOME、KDE 或 Unity DE 的 64 位 Linux 发行版；GNU C 库 (glibc) 2.31 或更高版本。 | 最新 64 位版本的 Linux          |
| RAM          | 8 GB RAM                                                     | 至少有 16 GB 的 RAM             |
| CPU          | x86_64 CPU 架构；第 2 代 Intel Core 或更高版本；或者支持 AMD 虚拟化 (AMD-V) 和 SSSE3 的 AMD 处理器。 | 最新的 Intel Core 处理器        |
| 磁盘可用空间 | 8 GB（IDE 和 Android SDK 及模拟器）                          | 具有 16 GB 或更多容量的固态硬盘 |
| 屏幕分辨率   | 1280 x 800                                                   | 1920 x 1080                     |

如需在 Linux 上安装 Android Studio，请按以下步骤操作：

1.

   将您下载的 `.zip` 文件解压缩到您应用的相应位置，例如 `/usr/local/` 中（用于用户个人资料）或者 `/opt/` 中（用于共享用户）。

   对于 64 位版本的 Linux，请先安装 [64 位计算机所需的库](https://developer.android.google.cn/studio/install?hl=zh-cn#64bit-libs)。

2.

   若要启动 Android Studio，请打开一个终端，进入 `android-studio/bin/` 目录，并执行 `studio.sh`。

3.

   选择是否想要导入之前的 Android Studio 设置，然后点击 **OK**。

4.

   Android Studio **设置向导**会引导您完成其余设置，其中包括下载开发所需的 Android SDK 组件。

**提示**：如需使 Android Studio 出现在您的应用列表中，请从 Android Studio 菜单栏中依次选择 **Tools > Create Desktop Entry**。


### 64 位计算机所需的库 

如果您运行的是 64 位版本的 Ubuntu，那么您需要使用以下命令安装一些 32 位库：

```
sudo apt-get install libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1 libbz2-1.0:i386
```

如果您运行的是 64 位版本的 Fedora，则所用命令为：

```
sudo yum install zlib.i686 ncurses-libs.i686 bzip2-libs.i686
```

下面的视频逐步演示了推荐的设置流程：

Linux安装教程请看：https://developer.android.google.cn/static/studio/videos/studio-install-linux.mp4?hl=zh-cn

如果有新的工具和其他 API 可供使用，Android Studio 将通过弹出式窗口通知您。如需手动检查更新，请依次点击 **Help > Check for Update**。

## ChromeOS

如需了解支持 Android Studio 和 Android 模拟器的系统要求，请参阅 ChromeOS 文档中的 [Android 开发](https://chromeos.dev/en/android-environment#install-android-studio-on-chrome-os)。

如需在 ChromeOS 上安装 Android Studio，请按以下步骤操作：

1. 安装[适用于 ChromeOS 的 Linux](https://support.google.com/chromebook/answer/9145439?hl=zh-cn)。
2. 打开 **Files** 应用，然后在 **My files** 下的 **Downloads** 文件夹中找到 DEB 软件包。
3. 右键点击 DEB 软件包，然后选择 **Install with Linux (Beta)**。

   ![DEB 软件包在 Chrome 操作系统上的目标文件位置。](https://developer.android.google.cn/static/studio/images/studio-install-chromeos.png?hl=zh-cn)

​	如果您之前安装过 Android Studio，请选择是否要导入之前的 Android Studio 设置，然后点击 **OK**。

4. Android Studio **设置向导**会引导您完成其余设置，其中包括下载开发所需的 Android SDK 组件。

5. 安装完成后，您可以通过启动器或 ChromeOS Linux 终端启动 Android Studio，只需在默认安装目录 `/opt/android-studio/bin/studio.sh` 中运行 `studio.sh` 即可。

如果有新的工具和其他 API 可供使用，Android Studio 将通过弹出式窗口通知您。如需手动检查更新，请依次点击 **Help > Check for Update**。

> **注意**：ChromeOS 上的 Android Studio 目前仅支持将应用部署至已连接的硬件设备。如需了解详情，请参阅[在硬件设备上运行应用](https://developer.android.google.cn/studio/run/device?hl=zh-cn)。


## 安装SDK

只需要找到设置，搜索 Android SDK 选择版本 点击 Apply就行，使用最新版本就可以！

![image-20230105224008976](/androidImages/dd164e83f47de0ef376f1c5ea18c62a1.png)