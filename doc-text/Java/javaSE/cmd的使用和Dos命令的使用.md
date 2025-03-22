## 计算机预科

### 1.打开CMD的方式

1. 开始 + 系统 + 命令提示符。
2. Win + R 输入 CMD 打开控制台 (推荐使用)。
3. 在任意文件夹下，按住Shift键 + 鼠标右键打开命令行窗口。
4. 在资源管理器的地址栏前加上 CMD 路径。

### 2.管理员身份运行方式

- 选择以管理员方式运行。

### 3.常见的Dos命令

1. 盘符切换

   ```cmd
   C:\Users\lazy>D
   'D' 不是内部或外部命令，也不是可运行的程序
   或批处理文件。
   
   C:\Users\lazy>D:
   
   D:\>C:
   
   C:\Users\lazy>D:
   
   D:\>
   ```

2. 查看当前盘符目录下的全部目录：dir

   ```cmd
   D:\>dir
    驱动器 F 中的卷是 工作台
    卷的序列号是 1714-20F6
   
    D:\ 的目录
   
   2021/05/17  16:15    <DIR>          BaiduNetdiskDownload
   2021/05/15  19:50    <DIR>          CloudMusic
   2021/05/14  21:19    <DIR>          Dev-Cpp
   2021/05/14  16:56    <DIR>          DTL8Folder
   2021/05/14  22:35    <DIR>          HBuilderX
   2021/05/14  22:36    <DIR>          java
   2021/05/14  17:00    <DIR>          MyDrivers
   2021/05/14  22:47    <DIR>          Notepad++
   2021/05/14  22:29    <DIR>          Sublime Text 3
   2021/05/14  18:56    <DIR>          Typora
   2021/05/17  17:53    <DIR>          VCW
   2021/05/14  21:25    <DIR>          VS2017
   2021/05/14  21:47    <DIR>          Windows Kits
                  0 个文件              0 字节
                 13 个目录 663,783,088,128 可用字节
   
   D:\>E:
   
   E:\>dir
    驱动器 E 中的卷是 数据
    卷的序列号是 3F12-1129
   
    E:\ 的目录
   
   2020/06/04  07:47       610,571,366 AI教程超级合辑.zip
   2021/05/14  13:44    <DIR>          java
   2021/05/14  21:47    <DIR>          NUT
   2021/05/14  13:45    <DIR>          Office Tool
   2021/05/05  15:18        69,730,999 Office-Tool-with-runtime-v8.1.zip
   2021/05/11  17:26    <DIR>          作业
   2021/05/14  23:15    <DIR>          工具
   2021/05/14  13:38    <DIR>          论文
   2020/10/21  21:58         1,000,218 狂神说Java全栈学习路线.jpg
                  3 个文件    681,302,583 字节
                  6 个目录 605,834,113,024 可用字节
   
   E:\>
   ```

3. 切换目录：cd change directory

   ```cmd
   E:\>cd /d d:
   
   d:\>cd /d d:\leven
   
   d:\LEVEN>cd ..
   
   d:\>
   ```

4. 返回上一级：cd ..

5. 清理屏幕： cls

6. 退出终端：exit

7. 查看电脑IP信息：ipconfig

8. 打开计算机：calc

9. 打开画图：mspaint

10. 打开记事本：notepad

11. ping命令：ping 网址

12. 文件操作

    ```cmd
    C:\Users\lazy\Desktop>md test
    
    C:\Users\lazy\Desktop>cd test
    
    C:\Users\lazy\Desktop\test>cd>a.txt
    
    C:\Users\lazy\Desktop\test>
    ```

13. 删除文件

    ```cmd
    C:\Users\lazy\Desktop\test>del a.txt
    
    C:\Users\lazy\Desktop\test>cd ..
    
    C:\Users\lazy\Desktop>rd test
    
    C:\Users\lazy\Desktop>
    ```

## 