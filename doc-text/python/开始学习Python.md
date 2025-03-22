# 为什么要学习Python

Python 是当今非常流行的编程语言，在互联网上经常可以看到他的身影。它应用非常广泛，例如编程、Web 开发、机器学习和数据科学等。在最新的tiobe排行中 Python 甚至超越了 Java 成为顶级编程语言。

## 首先我们先了解下什么是 Python ？

Python 是一种高级的、面向对象的编程语言，具有内置的数据结构和动态语义。它支持多种编程范式，例如结构、面向对象和函数式编程。

Python 支持不同的模块和包，这允许程序模块化和代码重用。

Python 由 Guido van Rossum 创建。

## Python 的优点：

1. 易学易用：Python 的语法非常清晰，代码可读性高，使得开发者可以快速上手并开始编写代码。
2. 强大的标准库：Python 自带丰富的标准库，可以帮助开发者快速完成各种任务，无需重复造轮子。
3. 第三方库：Python 拥有庞大的第三方库，可以满足绝大多数开发需求。
4. 跨平台：Python 可以在多种操作系统上运行，包括 Windows、Linux、MacOS 等。
5. 面向对象编程：Python 支持面向对象编程，允许开发者使用类和对象来组织代码。
6. 动态类型：Python 是一种动态类型语言，不需要预先声明变量的类型即可使用。
7. 解释性：Python 是解释型语言，可以直接运行 Python 代码，不需要编译步骤。
8. 可嵌入性：Python 可以被嵌入到 C 或者 C++ 程序中，实现扩展程序的功能。

## Python 的缺点：

1. 运行速度：Python 是解释型语言，执行效率通常低于编译型语言如 C 或 C++。
2. 移动计算和游戏开发：Python 在这些对性能要求高的领域速度较慢，可能不适合。
3. GIL(Global Interpreter Lock)：Python 有一个全局解释器锁(GIL)，在多线程处理任务时可能会出现性能问题。
4. 代码执行安全性：Python 缺乏严格的类型检查，可能导致在运行时出现意外行为。
5. 管理开销：Python 程序通常比编译型语言的程序占用更多的内存。

## Python的发展历程

Python由[荷兰国家数学与计算机科学研究中心](https://baike.baidu.com/item/荷兰国家数学与计算机科学研究中心/53889845?fromModule=lemma_inlink)的[吉多·范罗苏姆](https://baike.baidu.com/item/吉多·范罗苏姆/328361?fromModule=lemma_inlink)于1990年代初设计，作为一门叫作[ABC语言](https://baike.baidu.com/item/ABC语言/334996?fromModule=lemma_inlink)的替代品。Python提供了高效的高级[数据结构](https://baike.baidu.com/item/数据结构/1450?fromModule=lemma_inlink)，还能简单有效地[面向对象](https://baike.baidu.com/item/面向对象/2262089?fromModule=lemma_inlink)编程。Python语法和动态类型，以及[解释型语言](https://baike.baidu.com/item/解释型语言/8888952?fromModule=lemma_inlink)的本质，使它成为多数平台上写脚本和快速开发应用的[编程语言](https://baike.baidu.com/item/编程语言/9845131?fromModule=lemma_inlink)，随着版本的不断更新和语言新功能的添加，逐渐被用于独立的、大型项目的开发。

Python在各个编程语言中比较适合新手学习，Python解释器易于扩展，可以使用[C](https://baike.baidu.com/item/C/7252092?fromModule=lemma_inlink)、[C++](https://baike.baidu.com/item/C%2B%2B/99272?fromModule=lemma_inlink)或其他可以通过C调用的语言扩展新的功能和[数据类型](https://baike.baidu.com/item/数据类型/10997964?fromModule=lemma_inlink)。Python也可用于可定制化软件中的扩展程序语言。Python丰富的标准库，提供了适用于各个主要系统平台的[源码](https://baike.baidu.com/item/源码/344212?fromModule=lemma_inlink)或[机器码](https://baike.baidu.com/item/机器码/86125?fromModule=lemma_inlink)。

## Python版本

1. Python 3.x 默认使用 UTF-8编码
2. print()函数代替print语句
3. 完全面向对象
4. 用视图和迭代器代替了列表
5. 比较运算符中的改变
   1. 用 != 代替 <>
   2. 比较运算 <，<=，>=和 > 无法比较两个数据大小顺序时，会产生 TypeError 异常。
   3. 在 Python 2.x 中，1<"、0>None,len<=len 等运算返回 False，而在 Python 3.x中则产生 TypeError 异常。
   4. 在 = 和 != 中，不兼容类型的数据视为不相等。 

# 下载 Python

1. ‌**下载Python**‌：

- 打开Python官网（https://www.python.org/downloads/）。‌1
- 根据操作系统选择对应的Python安装程序。例如，Windows用户应选择Windows Installer。‌2
- 选择合适的Python版本进行下载，通常推荐下载稳定发布版本（Stable Releases）。

1. ‌**安装Python**‌：

- 找到下载的安装文件并双击运行。‌3
- 在安装过程中，可以勾选“Add Python to PATH”选项，以便在命令提示符中直接运行Python命令。
- 选择“Customize installation”进行自定义安装，可以根据需求选择安装组件和设置安装路径。‌14
- 点击“Install”开始安装，并等待安装完成。‌4

1. ‌**验证安装**‌：

- 安装完成后，可以通过打开命令提示符（CMD）并输入“python”来验证Python是否已成功安装。‌5
- 如果成功安装，将显示Python的版本信息和提示符，可以输入Python代码并回车执行。
- 若要退出Python交互式环境，可以输入“exit()”并回车。

请注意，如果在安装过程中没有勾选“Add Python to PATH”选项，可能需要手动配置Python的环境变量。此外，如果在安装或使用过程中遇到问题，可以参考Python官网的文档或搜索相关教程进行解决。

# **Python的两种编程方式**

交互式和文件式

交互式：对每个输入语句即时运行结果，适合语法练习

文件式：批量执行一组语句，并运行结果，编程的主要方式

# IPO程序编写方法

 IPO,全写Input-Process-Output,翻译成汉语就是“输入-处理-输出”这个程序结构非常实用。

![](/PythonImages/IPO编程方法.png)

# python第一个程序

```python
print('hello world')
```

如果显示 hello world 代表安装成功

# print函数

print函数是一个输出函数，输出格式为：

```python
print(<输出值1>,[<输出值2>],....,<输出值n>,sep=',',end='\n')
```

例：

```python
a = 100
b = 50
print(a+b)
print('hello world')
print("hello world")
print('''hello world''')
print("""hello world""")
```

结果：

![](/PythonImages/print.png)

因为print函数默认有换行，我们想不让他换行可以这样做

```python
print('''hello world''',end="--->")
print("""hello world""")
```

![](/public/PythonImages/end.png)

只要加入end就不默认换行了

如果我们想要一行输出多个

```python
print('1','2')
```

但python会把逗号转成空格，但我们加上 sep就不会加空格了

```python
print('1','2',sep='')
```

![](/PythonImages/sep.png)

使用print函数写入文件文字

```python
# coding=UTF-8 
#设置文件的编码格式
fp = open('note.txt','w')   # 打开文件,如果没有创建文件 w-->write
print('重生之我来学Python',file=fp) # 将重生之我来学Python，输出(写入)到note.txt 文件中
fp.close() #关闭文件
```

运行，来查看效果图

<img src="/PythonImages/print函数往文件写入内容.png" style="zoom:60%;" />

# input函数

**语法结构：**

```python
x=input('提示文字')
```

> 注意事项：
>
> ​	无论输入的数据是什么，x的数据类型都是字符串类型

使用input函数输入整数：

```python
num = int(input('请输入您的幸运数字：'))
print('您的幸运数字是',num)
```

**print函数不能使用加号连接，因为 num 不是字符串，而是整数。**

# Python语法

**Python中的注释**

1. 程序员在代码中对代码功能解释说明的标注性文字
2. 可以提高代码的可读性
3. 注释的内容将被Python解释忽略，不被计算机执行。
4. 单行注释，多行注释和中文声明注释。

## 单行注释

以 # 开头为单行注释

 ```python
 # 我是单行注释
 ```

## 多行注释

Python并没有独立的多行注释，只要被包含在一对儿三引号当中的代码，实际上就一个多行注释，多行注释它本质上就是一个字符串

```python
''''
    这是多行注释
'''
```

## 中文文档说明注释

 中文文档注释是因为Python它是有编码格式的，如果编码格式不正确的话就会出现问题，那么咋么样去设置他呢？

 **中文文档声明注释，一定要写在第一行**

```python 
# coding = UTF-8
```

这样文件就是编码格式就是 UTF-8格式了

Python文件的编码格式是什么，是由第一行代码决定的，第一行代码叫做中文文档声明注释。

# 代码缩进

是指每行语句开始前的空白区域。

是用来表示Python程序键的包含和层次关系。

类定义、函数定义、流程控制语句以及异常处理语句等行尾的**冒号**和**下一行的缩进**表示一个代码块的开始，而缩进结束，则表示一个代码块的结束。

通常情况下采用4个空格作为一个缩进量。

```python
# 一般代码，不需要缩进
print('hello')
print('world')
# 类的定义
class Student:
    pass
# 函数的定义
def fun():
    pass
```

# 总结

程序设计语言又被称为编程语言

计算机程序是使用编程语言组织起来的一组计算机指令

计算机指令就是指挥机器工作的指示和命令

编程语言可分为机器语言、汇编语言和高级语言

采用编译方式执行的语言称静态语言

例：Java语言，C语言 ......

采用解释方式执行的语言成为脚本语言

例：Python，html  ......

IPO指的是输入、处理和输出

print 函数完整的语言格式为：

```python
print(value,...,sep='',end='\n',file=None)
```

输入函数 input 的语言为：variable=input('提示文字')

Python中的注释可分为单行注释、多行注释和中文文档声明注释

Python语言采用严格的 "缩进" 来表示程序逻辑
