# App的开发语言

基于安卓系统的App开发主要有两大技术路线，分别是原生开发和混合开发。原生开发指的是在移动平 台上利用官方提供的编程语言（例如Java、Kotlin等）、开发工具包（SDK）、开发环境（Android Studio）进行App开发；混合开发指的是结合原生与H5技术开发混合应用，也就是将部分App页面改成 内嵌的网页，这样无须升级App、只要覆盖服务器上的网页，即可动态更新App页面。 不管是原生开发还是混合开发，都要求掌握Android Studio的开发技能，因为混合开发本质上依赖于原 生开发，如果没有原生开发的皮，哪里还有混合开发的毛呢？单就原生开发而言，又涉及多种编程语 言，包括Java、Kotlin、C/C++、XML等，详细说明如下。

<div style="page-break-after: always;"></div>

## 1．Java

Java是Android开发的主要编程语言，在创建新项目时，弹出如下图所示的项目配置对话框，看见 Language栏默认选择了Java，表示该项目采用Java编码。

![img](/androidImages/5c097549d0cdfbc0765d1f6ac429e505.png)

虽然Android开发需要Java环境，但没要求电脑上必须事先安装JDK，因为Android Studio已经自带了 JRE。依次选择菜单File→Project Structure，弹出如下图所示的项目结构对话框。

![img](/androidImages/u=273763756,4159068084&fm=253&fmt=auto&app=138&f=JPEG.jpeg)

单击项目结构对话框左侧的SDK Location，对话框右边从上到下依次排列着“Android SDK location”、 “Android NDK location”、“JDK location”，其中下方的JDK location提示位于Android Studio安装路径的 JRE目录下，它正是Android Studio自带的Java运行环境。 可是Android Studio自带的JRE看不出来基于Java哪个版本，它支不支持最新的Java版本呢？其实 Android Studio自带的JRE默认采用Java 7编译，如果在代码里直接书写Java 8语句就会报错，比如Java 8 引入了Lambda表达式，下面代码通过Lambda表达式给整型数组排序：

```java
Integer[] intArray = { 89, 3, 67, 12, 45 }; 
Arrays.sort(intArray, (o1, o2) -> Integer.compare(o2, o1));
```

倘若由Android Studio编译上面代码，结果提示出错“Lambda expressions are not supported at this language level ”，Android Studio里面的Java语言不支持（因为JAVA8已经支持Lambda表达式了）

![img](/androidImages/5316822-562d7bf30b2a4a4d.webp)

原来Android Studio果真默认支持Java 7而非Java 8，但Java 8增添了诸多新特性，其拥趸与日俱增，有 的用户习惯了Java 8，能否想办法让Android Studio也支持Java 8呢？当然可以，只要略施小计便可，依 次选择菜单File→Project Structure，在弹出的项目结构对话框左侧单击Modules，此时对话框如图2-7 所示。

![image-20230726102801636](/androidImages/image-20230726102801636.png)

对话框右侧的Properties选项卡，从上到下依次排列着“Compile Sdk Version”、“Build Tool Version”、 “NDK Version”、“Source Compatibility”、“Target Compatibility”，这5项分别代表：编译的SDK版本、 构建工具的版本、编译C/C++代码的NDK版本、源代码兼容性、目标兼容性，其中后面两项用来设置 Java代码的兼容版本。单击“Source Compatibility”右边的下拉箭头按钮，弹出如图2-8所示的下拉列表。

![image-20230726102827055](/androidImages/image-20230726102827055.png)

从下拉列表中看到，Android Studio自带的JRE支持Java 6、Java 7、Java 8三种版本。单击选中列表项的 “1.8（Java 8）”，并在“Target Compatibility”栏也选择“1.8（Java 8）”，然后单击窗口下方的OK按钮， 就能将编译模块的Java版本改成Java 8了。 


## 2．Kotlin Kotlin

是谷歌官方力推的又一种编程语言，它与Java同样基于JVM（Java Virtual Machine，即Java虚拟 机），且完全兼容Java语言。创建新项目时，在Language栏下拉可选择Kotlin，此时项目结构对话框如 图2-9所示。 一旦在创建新项目时选定Kotlin，该项目就会自动加载Kotlin插件，并将Kotlin作为默认的编程语言。不 过本书讲述的App开发采用Java编程，未涉及Kotlin编程。

![image-20230726102931411](/androidImages/image-20230726102931411.png)

<div style="page-break-after: always;"></div>

## 3．C/C++ 

不管是Java还是Kotlin，它们都属于解释型语言，这类语言在运行之时才将程序翻译成机器语言，故而执 行效率偏低。虽然现在手机配置越来越高，大多数场景的App运行都很流畅，但是涉及图像与音视频处 理等复杂运算的场合，解释型语言的性能瓶颈便暴露出来。

 编译型语言在首次编译时就将代码编译为机器语言，后续运行无须重新编译，直接使用之前的编译文件 即可，因此执行效率比解释型语言高。C/C++正是编译型语言的代表，它能够有效弥补解释型语言的性 能缺憾，借助于JNI技术（Java Native Interface，即Java原生接口），Java代码允许调用C/C++编写的程序。事实上，Android的SDK开发包内部定义了许多JNI接口，包括图像读写在内的底层代码均由 C/C++编写，再由外部通过封装好的Java方法调用。 

不过Android系统的JNI编程属于高级开发内容，初学者无须关注JNI开发，也不要求掌握C/C++。 

<div style="page-break-after: always;"></div>

## 4．XML

 XML全称为Extensible Markup Language，即可扩展标记语言，严格地说，XML并非编程语言，只是一 种标记语言。它类似于HTML，利用各种标签表达页面元素，以及各元素之间的层级关系及其排列组 合。每个XML标签都是独立的控件对象，标签内部的属性以“android:”打头，表示这是标准的安卓属 性，各属性分别代表控件的某种规格。比如下面是以XML书写的文本控件：

```xml
<TextView
android:id="@+id/tv_hello"
android:layout_width="wrap_content"
android:layout_height="wrap_content"
android:text="Hello World!" />
```



上面的标签名称为TextView，翻译过来叫文本视图，该标签携带4个属性，说明如下：

- id：控件的编号。
- layout_width：控件的布局宽度，wrap_content表示刚好包住该控件的内容。 
- layout_height：控件的布局高度，wrap_content表示刚好包住该控件的内容。
- text：控件的文本，也就是文本视图要显示什么文字。

综合起来，以上XML代码所表达的意思为：这是一个名为tv_hello的文本视图，显示的文字内容是“Hello World!”，它的宽度和高度都要刚好包住这些文字。

以上就是Android开发常见的几种编程语言，本书选择了Java路线而非Kotlin路线，并且定位安卓初学者 教程，因此读者需要具备Java和XML基础。