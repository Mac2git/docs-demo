# 了解 Android Studio 界面

Android Studio 主窗口由图 1 中标注的几个逻辑区域组成。

![](/androidImages/main-window_2-2_2x.png)

**图 1.** Android Studio 主窗口。

1. **工具栏**：执行各种操作，其中包括运行应用和启动 Android 工具。

2. **导航栏**：在项目中导航，以及打开文件进行修改。此区域提供 **Project** 窗口中所示结构的精简视图。

3. **编辑器窗口**：创建和修改代码。编辑器可能因当前文件类型而异。例如，查看布局文件时，该编辑器会显示布局编辑器。

4. **工具窗口栏**：使用 IDE 窗口外部的按钮可展开或收起各个工具窗口。

5. **工具窗口**：执行特定任务，例如项目管理、搜索和版本控制等。您可以展开和折叠这些窗口。

6. **状态栏**：显示项目和 IDE 本身的状态以及任何警告或消息。

您可以隐藏或移动工具栏和工具窗口，以此调整主窗口，腾出更多屏幕空间。您还可以通过[键盘快捷键](https://developer.android.google.cn/studio/intro/keyboard-shortcuts?hl=zh-cn)使用大多数 IDE 功能。

如需在源代码、数据库、操作、界面元素等对象中搜索，请执行以下操作之一：

- 连按两次 Shift 键。

- 点击 Android Studio 窗口右上角的放大镜。


此功能非常实用，例如在您忘记如何触发特定 IDE 操作时，可以利用此功能进行查找。


## 工具窗口

Android Studio 不使用预设窗口，而是根据情境在您执行操作时自动显示相关工具窗口。默认情况下，最常用的工具窗口会固定在应用窗口边缘的工具窗口栏上。

使用以下方法在工具窗口中导航：

- 如需展开或收起工具窗口，请在工具窗口栏中点击该工具的名称。您还可以拖动、固定、取消固定、关联和分离工具窗口。

- 若要恢复当前工具窗口的默认布局，请依次点击 **Window > Restore Default Layout**。若要自定义默认布局，请依次点击 **Window > Store Current Layout as Default**。

- 如需显示或隐藏整个工具窗口栏，请点击 Android Studio 窗口左下角的窗口图标!
![](/androidImages/window-icon_2-1_2x.png)。

- 如需找到特定工具窗口，请将鼠标指针悬停在窗口图标上方，并从菜单中选择相应的工具窗口。


您也可以使用[键盘快捷键](https://developer.android.google.cn/studio/intro/keyboard-shortcuts?hl=zh-cn)打开工具窗口。表 1 列出了最常用工具窗口的快捷键。

**表 1.** 工具窗口的键盘快捷键

| 工具窗口         | Windows 和 Linux | macOS             |
| :--------------- | :--------------- | :---------------- |
| 项目             | Alt+1            | Command+1         |
| 版本控制         | Alt+9            | Command+9         |
| 运行             | Shift+F10        | Ctrl+R            |
| 调试             | Shift+F9         | Ctrl+D            |
| Logcat           | Alt+6            | Command+6         |
| 返回编辑器       | Esc              | Esc               |
| 隐藏所有工具窗口 | Ctrl+Shift+F12   | Command+Shift+F12 |

若要隐藏所有工具栏、工具窗口和编辑器标签页，请依次点击 **View > Enter Distraction Free Mode**。如需退出 Distraction Free Mode，请依次点击 **View > Exit Distraction Free Mode**。

您可以使用“快速搜索”在 Android Studio 中的大多数工具窗口中执行搜索和过滤。*如需使用“快速搜索”，请选择工具窗口，然后输入您的搜索查询。*


## 代码补全

Android Studio 有三种代码补全类型，您可以通过键盘快捷键使用这些类型。

**表 2.** 代码补全功能的键盘快捷键

| 类型     | 说明                                                         | Windows 和 Linux  | macOS               |
| :------- | :----------------------------------------------------------- | :---------------- | :------------------ |
| 基本补全 | 显示对变量、类型、方法和表达式等的基本建议。如果连续两次调用基本补全，系统将显示更多结果，包括私有成员和非导入静态成员。 | Ctrl+空格键       | Ctrl+空格键         |
| 智能补全 | 根据上下文显示相关选项。智能自动补全可识别预期类型和数据流。如果连续两次调用智能自动补全，系统将显示更多结果，包括链。 | Ctrl+Shift+空格键 | Ctrl+Shift+空格键   |
| 语句补全 | 补全当前语句，添加缺失的圆括号、大括号、花括号和格式等。     | Ctrl+Shift+Enter  | Command+Shift+Enter |

若要执行快速修复并显示建议的操作，请按 Alt+Enter。

## 查找示例代码

Android Studio 中的代码示例浏览器可以帮助您根据项目中当前突出显示的符号查找 Google 提供的优质 Android 示例代码。如需了解详情，请参阅[查找示例代码](https://developer.android.google.cn/studio/write/sample-code?hl=zh-cn)。

## 导航

以下是一些助您在 Android Studio 中导航的提示。

- 使用**最近文件**操作可在最近访问过的文件之间切换：

  按 Ctrl+E（在 macOS 中，按 Command+E）可调出**最近文件**操作。默认情况下，系统将选择最后一次访问的文件。在此操作中，您还可以通过左侧列访问任何工具窗口。

- 使用**文件结构**操作可查看当前文件的结构，还可快速前往当前文件的任何部分：

  按 Ctrl+F12（在 macOS 中，按 Command+F12）可调出**文件结构**操作。

- 使用**前往类**操作可搜索并前往项目中的特定类。**前往类**支持复杂的表达式，包括驼峰（让您可使用某元素的驼峰式大小写名称中的大写字母进行搜索）、路径、行导航（让您可前往文件内的特定行）和中间名匹配（让您可搜索类名称的一部分）等。*如果连续两次调用此操作，系统将显示项目类以外的结果。*

  按 Ctrl+N（在 macOS 中，按 Command+O）可调出**前往类**操作。

- 使用**前往文件**操作可前往文件或文件夹：

  按 Ctrl+Shift+N（在 macOS 中，按 Command+Shift+O）可调出**前往文件**操作。如需搜索文件夹（而不是文件），请在表达式末尾添加“/”。

- 使用**前往符号**操作可按名称前往某个方法或字段：

  按 Ctrl+Shift+Alt+N（在 macOS 中，按 Command+Option+O）可调出**前往符号**操作。

- 按 Alt+F7（在 macOS 中，按 Option+F7）可查找引用当前光标位置处的类、方法、字段、参数或语句的所有代码片段。

## 样式和格式

在您编辑时，Android Studio 会自动应用代码样式设置中指定的格式和样式。您可以通过编程语言自定义代码样式设置，其中包括指定制表符和缩进、空格、换行、花括号以及空白行的规范。

如需自定义代码样式设置，请依次点击 **File > Settings > Editor > Code Style**（在 macOS 中，请依次点击 **Android Studio > Preferences > Editor > Code Style**）。

虽然 IDE 会在您执行操作时自动应用格式，但您也可以显式调用**重新格式化代码**操作。按 Ctrl+Alt+L（在 macOS 中，按 Option+Command+L）可调用此操作。按 Ctrl+Alt+I（在 macOS 中，按 Ctrl+Option+I）可自动缩进所有行。

![img](/androidImages/code-before-formatting_2-1_2x.png)

**图 2.** 格式化前的代码。

![img](/androidImages/code-after-formatting_2-1_2x.png)

**图 3.** 格式化后的代码。

## 开发者工作流程基础知识

从概念上来讲，Android 应用的开发工作流程与其他应用平台相同。不过，如果想高效地构建精心设计的 Android 应用，您需要用到一些专业工具。

本页将概述 Android 应用构建流程，并提供链接以便您详细了解各个开发阶段需使用的 Android Studio 工具。

![img](/androidImages/developer-workflow_2x.png)

1. **设置工作区**

   这是 Android 应用开发流程的第一步。如需了解详情，请参阅 [Android Studio 安装页面](https://developer.android.google.cn/studio?hl=zh-cn)和[创建项目](https://developer.android.google.cn/studio/projects/create-project?hl=zh-cn)指南。

   您可在[构建首个 Android 应用](https://developer.android.google.cn/training/basics/firstapp?hl=zh-cn)指南中查看 Android Studio 演示并学习一些 Android 开发基础知识。

2. **编写应用**

   设置完工作区之后，您就可以开始编写应用了。Android Studio 包含多种工具和智能功能，可帮助您更快速地编写应用、编写优质代码、设计界面以及为不同的设备类型创建资源。如需详细了解可用的工具和功能，请参阅[编写应用](https://developer.android.google.cn/studio/write?hl=zh-cn)。

3. **构建和运行**

   在构建和运行阶段，您可将项目构建为一个可调试的 APK 软件包，以便在模拟器或 Android 设备上安装和运行。如需详细了解如何运行代码，请参阅[构建和运行应用](https://developer.android.google.cn/studio/run?hl=zh-cn)。

   您还可在此阶段自定义 build。例如，您可以[创建 build 变体](https://developer.android.google.cn/studio/build/build-variants?hl=zh-cn)，从同一项目生成不同版本的应用，并[缩减代码和资源](https://developer.android.google.cn/studio/build/shrink-code?hl=zh-cn)以缩小应用。有关自定义 build 配置的介绍，请参阅[配置 build](https://developer.android.google.cn/studio/build?hl=zh-cn)。

4. **执行调试、性能分析和测试**

   在此迭代阶段，您可以继续开发应用，同时消除 bug 并优化应用性能。如需在调试和优化应用方面获取帮助，请[在 Android Studio 中测试应用](https://developer.android.google.cn/studio/test/test-in-android-studio?hl=zh-cn)。

   如需详细了解调试，请参阅[调试应用](https://developer.android.google.cn/studio/debug?hl=zh-cn)以及[使用 Logcat 编写和查看日志](https://developer.android.google.cn/studio/debug/am-logcat?hl=zh-cn)。

   如需查看和分析各种性能指标（比如内存用量、网络流量、CPU 影响等等），请参阅[分析应用性能](https://developer.android.google.cn/studio/profile?hl=zh-cn)。

5. **发布**

   为了准备好应用以面向用户发布，您需要构建一个 [Android App Bundle](https://developer.android.google.cn/guide/app-bundle?hl=zh-cn)，使用安全密钥为其签名，然后做好准备以发布到 Google Play 商店。如需了解详情，请参阅[发布应用](https://developer.android.google.cn/studio/publish?hl=zh-cn)。