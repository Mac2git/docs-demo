

# App的活动页面



本节介绍了App活动页面的基本操作，首先手把手地分三步创建新的App页面，接着通过活动创建菜单 快速生成页面源码，然后说明了如何在代码中跳到新的活动页面。


## 创建新的App页面


每次创建新的项目，都会生成默认的activity_main.xml和MainActivity.java，它们正是App首页对应的 XML文件和Java代码。若要增加新的页面，就得由开发者自行操作了，完整的页面创建过程包括3个步 骤：创建XML文件、创建Java代码、注册页面配置，分别介绍如下：


1.创建XML文件

​	在Android Studio左上方找到项目结构图，右击res目录下面的layout，弹出如图2-20所示的右键菜单。

![](/androidImages\xml创建.png)


​	在右键菜单中依次选择New→XML→Layout XML File，弹出如图2-21所示的XML创建对话框。

<img src="/androidImages/image-20230727180756154.png" alt="image-20230727180756154" style="zoom:80%;" />

<img src="/androidImages/XML文件的创建窗口.png" style="zoom: 67%;" />


​	在XML创建对话框的Layout File Name输入框中填写XML文件名，例如activity_main2，然后单击窗口 右下角的Finish按钮。之后便会在layout目录下面看到新创建的XML文件activity_main2.xml，双击它即 可打开该XML的编辑窗口，再往其中填写详细的布局内容。

2.创建Java代码

​	同样在Android Studio左上方找到项目结构图，右击java目录下面的包名，弹出如图2-22所示的右键菜单。

<img src="/androidImages/通过右键菜单创建Java代码.png" style="zoom:80%;" />


在右键菜单中依次选择New→Java Class，弹出如图2-23所示的代码创建窗口。

![](/androidImages/Java代码的创建窗口.png)
在代码创建窗口的Name输入框中填写Java类名，例如MainActivity，然后单击窗口下方的OK按钮。之后便会在Java包下面看到新创建的代码文件MainActivity，双击它即可打开代码编辑窗口，再往其中填 写如下代码，表示加载来自layout的页面布局。

```java
public class MainActivity extends AppCompatActivity {
     
     @Override
     protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main2);
     }
     
}
```

3.注册页面配置

创建好了页面的XML文件及其Java代码，还得在项目中注册该页面，打开AndroidManifest.xml，在 application节点内部补充如下一行配置：

```xml
<activity android:name=".MainActivity"></activity>
```

添加了上面这行配置，表示给该页面注册身份，否则App运行时打开页面会提示错误“activity not found”。如果activity的标记头与标记尾中间没有其他内容，则节点配置也可省略为下面这样：

```xml
<activity android:name=".MainActivity /">
```

完成以上3个步骤后，才算创建了一个合法的新页面。

## 快速生成页面源码



上一小节经过创建XML文件、创建Java代码、注册页面配置3个步骤，就算创建好了一个新页面，没想到 区区一个页面也这么费事，怎样才能提高开发效率呢？其实Android Studio早已集成了快速创建页面的 功能，只要一个对话框就能完成所有操作。

仍旧在项目结构图中，右击java目录下面的包名，弹出如图2-24所示的右键菜单。

<img src="/androidImages/通过右键菜单创建活动页面.png" style="zoom: 67%;" />


右键菜单中依次选择新建→Activity→Empty Activity，弹出如图2-25所示的页面创建对话框。

<img src="/androidImages/活动页面的创建窗口.png" style="zoom:80%;" />

在页面创建对话框的Activity Name输入框中填写页面的Java类名（例如MainActivity），此时下方的 Layout Name输入框会自动填写对应的XML文件名（例如activity_main），单击对话框右下角的Finish 按钮，完成新页面的创建动作。



回到Android Studio左上方的项目结构图，发现res的layout目录下多了个activity_main.xml，同时 java目录下多了个MainActivity，并且MainActivity代码已经设定了加载activity_main布局。接着打 开AndroidManifest.xml，找到application节点发现多了下面这行配置：

```xml
<activity android:name=".MainActivity"></activity>
```

检查结果说明，只要填写一个创建页面对话框，即可实现页面创建的3个步骤。

## <a name="to">跳到另一个页面</a>



一旦创建好新页面，就得在合适的时候跳到该页面，假设出发页面为A，到达页面为B，那么跳转动作是 从A跳到B。由于启动App会自动打开默认主页MainActivity，因此跳跃的起点理所当然在MainActivity， 跳跃的终点则为目标页面的Activity。这种跳转动作翻译为Android代码，格式形如“startActivity(new Intent(源页面.this, 目标页面.class));”。如果目标页面名为Main2Activity，跳转代码便是下面这样的：

```java
// 活动页面跳转，从MainActivity跳到Main2Activity
startActivity(new Intent(MainActivity.this, Main2Activity.class));
```

因为跳转动作通常发生在当前页面，也就是从当前页面跳到其他页面，所以不产生歧义的话，可以使用 this指代当前页面。简化后的跳转代码如下所示：

```java
startActivity(new Intent(this, Main2Activity.class));
```

接下来做个实验，准备让App启动后在首页停留3秒，3秒之后跳到新页面FinishActivity。此处的延迟处 理功能，用到了Handler工具的postDelayed方法，该方法的第一个参数为待处理的Runnable任务对 象，第二个参数为延迟间隔（单位为毫秒）。为此在StartActivity.java中补充以下的跳转处理代码：

activity_start.xml代码：

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <TextView
        android:id="@+id/tv_break"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>

</LinearLayout>
```
StartActivity.java代码

```java
public class StartActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_start);
    }

    @Override
    protected void onResume() {
        super.onResume();
        TextView tv_hello = findViewById(R.id.tv_break);
        tv_hello.setText("3秒后进入下个页面");
        // 延迟3秒（3000毫秒）后启动任务mGoNext
        new Handler(Looper.myLooper()).postDelayed(mGoNext, 3000);
    }

    private Runnable mGoNext = new Runnable() {
        @Override
        public void run() {
        // 活动页面跳转，从MainActivity跳到Main2Activity
            startActivity(new Intent(StartActivity.this, FinishActivity.class));
        }
    };

}
```

activity_finish.xml代码：

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="欢迎来到第二个页面"/>

</LinearLayout>
```

FinishActivity.java没有，所有省略

跳转之前效果图2-26，跳转之后图2-27：

![](/androidImages/跳转之前的App界面.png)




![](/androidImages/跳转之后的App界面.png)


当然，以上的跳转代码有些复杂，比如：Intent究竟是什么东西？为何在onResume方法中执行跳转动 作？Handler工具的处理机制是怎样的？带着这些疑问，后续将会逐渐展开，一层一层拨开Android 开发的迷雾。
## 小结

主要介绍了App开发必须事先掌握的基础知识，包括App的开发特点（App的运行环境、App的开发 语言、App访问的数据库）、App的工程结构（App工程的目录结构、编译配置文件build.gradle、运行 配置文件AndroidManifest.xml）、App的设计规范（界面设计与代码逻辑、利用XML标记描绘应用界 面、使用Java代码书写程序逻辑）、App的活动页面（创建新的App页面、快速生成页面源码、跳转到另 一个页面）。

应该了解App开发的基本概念，并且熟悉App工程的组织形式，同时掌握使用 Android Studio完成一些简单操作。

