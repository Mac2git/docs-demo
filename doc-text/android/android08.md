

# App的设计规范



首先App将看得见的界面设计与看不见的代码逻辑区分开，然后 利用XML标记描绘应用界面，同时使用Java代码书写程序逻辑，从而形成App前后端分离的设计规约， 有利于提高App集成的灵活性。


## 界面设计与代码逻辑

手机的功能越来越强大，某种意义上相当于微型电脑，比如打开一个电商App，仿佛是在电脑上浏览网 站。网站分为用户看得到的网页，以及用户看不到的Web后台；App也分为用户看得到的界面，以及用 户看不到的App后台。虽然Android允许使用Java代码描绘界面，但不提倡这么做，推荐的做法是将界面 设计从Java代码剥离出来，通过单独的XML文件定义界面布局，就像网站使用HTML文件定义网页那样。 直观地看，网站的前后端分离设计如图2-13所示，App的前后端分离设计如图2-14所示。



![image-20230727175315053](/androidImages/image-20230727175315053.png)

![image-20230727175335294](/androidImages/image-20230727175335294.png)



把界面设计与代码逻辑分开，不仅参考了网站的Web前后端分离，还有下列几点好处。

1. 使用XML文件描述App界面，可以很方便地在Android Studio上预览界面效果。比如新创建的App 项目，默认首页布局为activity_main.xml，单击界面右上角的Design按钮，即可看到如图2-15所示的预览界面。

   如果XML文件修改了Hello World的文字内容，立刻就能在预览区域观看最新界面。倘若使用Java代码描 绘界面，那么必须运行App才能看到App界面，无疑费时许多。

2. 一个界面布局可以被多处代码复用，比如看图界面，既能通过商城购物代码浏览商品图片，也能通 过商品评价代码浏览买家晒单。

3. 反过来，一段Java代码也可能适配多个界面布局，比如手机有竖屏与横屏两种模式，默认情况App 采用同一套布局，然而在竖屏时很紧凑的界面布局（见图2-16），切换到横屏往往变得松垮乃至变形 （见图2-17）。

![image-20230727175557551](/androidImages/image-20230727175557551.png)


![image-20230727175613988](/androidImages/image-20230727175613988.png)

![image-20230727175627136](/androidImages/image-20230727175627136.png)

鉴于竖屏与横屏遵照一样的业务逻辑，仅仅是屏幕方向不同，若要调整的话，只需分别给出竖屏时候的 界面布局，以及横屏时候的界面布局。因为用户多数习惯竖屏浏览，所以res/layout目录下放置的XML 文件默认为竖屏规格，另外在res下面新建名为layout-land的目录，用来存放横屏规格的XML文件。 land是landscape的缩写，意思是横向，Android把layout-land作为横屏XML的专用布局目录。然后在 layout-land目录创建与原XML同名的XML文件，并重新编排界面控件的展示方位，调整后的横屏界面如 图2-18所示，从而有效适配了屏幕的水平方向。

![image-20230727175651009](/androidImages/image-20230727175651009.png)

总的来说，界面设计与代码逻辑分离的好处多多，后续的例程都由XML布局与Java代码两部分组成。

<div style="page-break-after: always;"></div>

## 利用XML标记描绘应用界面



在前面“2.1.2 App的开发语言”末尾，给出了安卓控件的XML定义例子，如下所示：

```xml
<TextView
     android:id="@+id/tv_hello"
     android:layout_width="wrap_content"
     android:layout_height="wrap_content"
     android:text="Hello World!" />	
```

注意到TextView标签以“<”开头，以“/>”结尾，为何尾巴多了个斜杆呢？要是没有斜杆，以左右尖括号包 裹标签名称，岂不更好？其实这是XML的标记规范，凡是XML标签都由标签头与标签尾组成，标签头以 左右尖括号包裹标签名称，形如“”；标签尾在左尖括号后面插入斜杆，以此同标签头区分开，形如“”。标 签头允许在标签名称后面添加各种属性取值，而标签尾不允许添加任何属性，因此上述TextView标签的 完整XML定义是下面这样的：

```xml
<TextView
     android:id="@+id/tv_hello"
     android:layout_width="wrap_content"
     android:layout_height="wrap_content"
     android:text="Hello World!">
</TextView>
```

考虑到TextView仅仅是个文本视图，其标签头和标签尾之间不会插入其他标记，所以合并它的标签头和 标签尾，也就是让TextView标签以“/>”结尾，表示该标签到此为止。

然而不是所有情况都能采取简化写法，简写只适用于TextView控件这种末梢节点。好比一棵大树，大树 先有树干，树干分岔出树枝，一些大树枝又分出小树枝，树枝再长出末端的树叶。一个界面也是先有根 节点（相当于树干），根节点下面挂着若干布局节点（相当于树枝），布局节点下面再挂着控件节点 （相当于树叶）。因为树叶已经是末梢了，不会再包含其他节点，所以末梢节点允许采用“/>”这种简写 方式。

譬如下面是个XML文件的布局内容，里面包含了根节点、布局节点，以及控件节点：

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
     android:layout_width="match_parent"
     android:layout_height="match_parent">
     
     <!-- 这是个线性布局， match_parent意思是与上级视图保持一致-->
     <LinearLayout
     android:layout_width="match_parent"
     android:layout_height="match_parent">
          
     	<!-- 这是个文本视图，名字叫做tv_hello，显示的文字内容为“Hello World!” -->
          <TextView
          android:id="@+id/tv_hello"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:text="Hello World!" />
          
     </LinearLayout>
     
</LinearLayout>
```

上面的XML内容，最外层的LinearLayout标签为该界面的根节点，中间的LinearLayout标签为布局节 点，最内层的TextView为控件节点。由于根节点和布局节点都存在下级节点，因此它们要有配对的标签 头与标签尾，才能将下级节点包裹起来。根节点其实是特殊的布局节点，它的标签名称可以跟布局节点 一样，区别之处在于下列两点：

1. 每个界面只有一个根节点，却可能有多个布局节点，也可能没有中间的布局节点，此时所有控件节 点都挂在根节点下面。 

2. 根节点必须配备“xmlns:android="http://schemas.android.com/apk/res/android"”，表示指定 XML内部的命名空间，有了这个命名空间，Android Studio会自动检查各节点的属性名称是否合法，如 果不合法就提示报错。至于布局节点就不能再指定命名空间了。 有了根节点、布局节点、控件节点之后，XML内容即可表达丰富多彩的界面布局，因为每个界面都能划 分为若干豆腐块，每个豆腐块再细分为若干控件罢了。三种节点之外，尚有“”这类注释标记，它的作用 是包裹注释性质的说明文字，方便其他开发者理解此处的XML含义。

   <div style="page-break-after: always;"></div>

## 使用Java代码书写程序逻辑



在XML文件中定义界面布局，已经明确是可行的了，然而这只是静态界面，倘若要求在App运行时修改 文字内容，该当如何是好？倘若是动态变更网页内容，还能在HTML文件中嵌入JavaScript代码，由js片 段操作Web控件。但Android的XML文件仅仅是布局标记，不能再嵌入其他语言的代码了，也就是说， 只靠XML文件自身无法动态刷新某个控件。



XML固然表达不了复杂的业务逻辑，这副重担就得交给App后台的Java代码了。Android Studio每次创 建新项目，除了生成默认的首页布局activity_main.xml之外，还会生成与其对应的代码文件 MainActivity.java。赶紧打开MainActivity.java，看看里面有什么内容，该Java文件中MainActivity类的 内容如下所示：

```java
public class MainActivity extends AppCompatActivity {
     
     @Override
     protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
     }
     
}
```

可见MainActivity.java的代码内容很简单，只有一个MainActivity类，该类下面只有一个onCreate方法。注意onCreate内部的setContentView方法直接引用了布局文件的名字activity_main，该方法的意 思是往当前活动界面填充activity_main.xml的布局内容。现在准备在这里改动，把文字内容改成中文。 首先打开activity_main.xml，在TextView节点下方补充一行android:id="@+id/tv_hello"，表示给它起 个名字编号；然后回到MainActivity.java，在setContentView方法下面补充几行代码，具体如下：

```java
public class MainActivity extends AppCompatActivity {
     
     @Override
     protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          // 当前的页面布局采用的是res/layout/activity_main.xml
          setContentView(R.layout.activity_main);
          // 获取名叫tv_hello的TextView控件，注意添加导包语句import
          android.widget.TextView;
          TextView tv_hello = findViewById(R.id.tv_hello);
          // 设置TextView控件的文字内容
          tv_hello.setText("你好，世界");
     }
     
}
```

新增的两行代码主要做了这些事情：先调用findViewById方法，从布局文件中取出名为tv_hello的 TextView控件；再调用控件对象的setText方法，为其设置新的文字内容。



代码补充完毕，重新运行测试App，发现应用界面变成了如图2-19所示的样子。

![image-20230727180255255](/androidImages/image-20230727180255255.png)

可见使用Java代码成功修改了界面控件的文字内容。