
# 第10章　自定义控件

本章介绍App开发中的一些自定义控件技术，主要包括：视图是如何从无到有构建出来的、如何改造已 有的控件变出新控件、如何通过持续绘制实现简单动画。然后结合本章所学的知识，演示了一个实战项 目“广告轮播”的设计与实现。


## 10.1　视图的构建过程

本节介绍了一个视图的构建过程，包括：如何编写视图的构造方法，4种构造方法之间有什么区别；如何 测量实体的实际尺寸，包含文本、图像、线性视图的测量办法；如何利用画笔绘制视图的界面，并说明 onDraw方法与dispatchDraw方法的先后执行顺序。


### 10.1.1　视图的构造方法

Android自带的控件往往外观欠佳，开发者常常需要修改某些属性，比如按钮控件Button就有好几个问 题，其一字号太小，其二文字颜色太浅，其三字母默认大写。于是XML文件中的每个Button节点都得添 加textSize、textColor、textAllCaps 3个属性，以便定制按钮的字号、文字颜色和大小写开关，就像下面这样：

```xml
<Button
     android:layout_width="match_parent"
     android:layout_height="wrap_content"
     android:text="Hello World"
     android:textAllCaps="false"
     android:textColor="#000000"
     android:textSize="20sp"/>
```

如果只是一两个按钮控件倒还好办，倘若App的许多页面都有很多Button，为了统一按钮风格，就得给 全部Button节点都加上这些属性。要是哪天产品大姐心血来潮，命令所有按钮统统换成另一种风格，如 此多的Button节点只好逐个修改过去，令人苦不堪言。为此可以考虑把按钮样式提炼出来，将统一的按 钮风格定义在某个地方，每个Button节点引用统一样式便行。为此打开res/values目录下的styles.xml， 在resources节点内部补充如下所示的风格配置定义：

```xml
<style name="CommonButton">
     <item name="android:textAllCaps">false</item>
     <item name="android:textColor">#000000</item>
     <item name="android:textSize">20sp</item>
</style>
```

接着回到XML布局文件中，给Button节点添加形如“style="@style/样式名称"”的引用说明，表示当前控 件将覆盖指定的属性样式，添加样式引用后的Button节点如下所示：

```xml
<Button
     android:layout_width="match_parent"
     android:layout_height="wrap_content"
     android:text="这是来自style的Button"
     style="@style/CommonButton"/>
```


运行测试App，打开按钮界面如图10-1所示，对比默认的按钮控件，可见通过style引用的按钮果然变了 个模样。以后若要统一更换所有按钮的样式，只需修改styles.xml中的样式配置即可。

<img src="/androidImages/image-20230903165115829.png" alt="image-20230903165115829" style="zoom:80%;" />

然而样式引用仍有不足之处，因为只有Button节点添加了style属性才奏效，要是忘了添加style属性就不 管用了，而且样式引用只能修改已有的属性，不能添加新属性，也不能添加新方法。若想更灵活地定制 控件外观，就要通过自定义控件实现了。

自定义控件听起来很复杂的样子，其实并不高深，不管控件还是布局，它们本质上都是一个Java类，也 拥有自身的构造方法。以视图基类View为例，它有4个构造方法，分别是：

1. 带一个参数的构造方法public View(Context context)，在Java代码中通过new关键字创建视图对 象时，会调用这个构造方法。
2. 带两个参数的构造方法public View(Context context, AttributeSet attrs)，在XML文件中添加视图 节点时，会调用这个构造方法。
3. 带3个参数的构造方法public View(Context context, AttributeSet attrs, int defStyleAttr)，采取默 认的样式属性时，会调用这个构造方法。如果defStyleAttr填0，则表示没有默认的样式。
4. 带4个参数的构造方法public View(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes)，采取默认的样式资源时，会调用这个构造方法。如果defStyleRes填0，则表示无样式资源。

以上的4种构造方法中，前两种必须实现，否则要么不能在代码中创建视图对象，要么不能在XML文件中 添加视图节点；至于后两种构造方法，则与styles.xml中的样式配置有关。先看带3个参数的构造方法， 第3个参数defStyleAttr的意思是指定默认的样式属性，这个样式属性在res/values下面的attrs.xml中配 置，如果values目录下没有attrs.xml就创建该文件，并填入以下的样式属性配置：

```xml
<declare-styleable name="CustomButton">
     <attr name="customButtonStyle" format="reference" />
</declare-styleable>
```


以上的配置内容表明了属性名称为customButtonStyle，属性格式为引用类型reference，也就是实际样 式在别的地方定义，这个地方便是styles.xml中定义的样式配置。可是customButtonStyle怎样与 styles.xml里的CommonButton样式关联起来呢？每当开发者创建新项目时，AndroidManifest.xml的 application节点都设置了主题属性，通常为android:theme="@style/AppTheme"，这个默认主题来自 于styles.xml的AppTheme，打开styles.xml发现文件开头的AppTheme配置定义如下所示：

```xml
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
     <!-- Customize your theme here. -->
     <item name="colorPrimary">@color/colorPrimary</item>
     <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
     <item name="colorAccent">@color/colorAccent</item>
</style>
```

原来App的默认主题源自Theme.AppCompat.Light.DarkActionBar，其中的Light表示这是亮色主题， DarkActionBar表示顶部标题栏是暗色的，内部的3个color项指定了该主题采用的部分颜色。现在给 AppTheme添加一项customButtonStyle，并指定该项的样式为@style/CommonButton，修改后的 AppTheme配置示例如下：

```xml
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
     <!-- Customize your theme here. -->
     <item name="colorPrimary">@color/colorPrimary</item>
     <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
     <item name="colorAccent">@color/colorAccent</item>
</style>
```

接着到Java代码包中编写自定义的按钮控件，控件代码如下所示，注意在defStyleAttr处填上默认的样式属性R.attr.customButtonStyle。

```java
public class CustomButton extends Button {
     private final static String TAG = "CustomButton";
     public CustomButton(Context context) {
     	super(context);
     }
     public CustomButton(Context context, AttributeSet attrs) {
     	this(context, attrs, R.attr.customButtonStyle);
     }
     public CustomButton(Context context, AttributeSet attrs, int defStyleAttr) {
     	this(context, attrs, defStyleAttr);
     }
}
```

然后打开测试界面的XML布局文件activity_custom_button.xml，添加如下所示的自定义控件节点 CustomButton：

