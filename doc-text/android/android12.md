



# 中级控件

介绍App开发常见的几类中级控件的用法，主要包括：如何定制几种简单的图形、如何使用几种选 择按钮、如何高效地输入文本、如何利用对话框获取交互信息等......


## 图形定制

Android图形的基本概念和几种常见图形的使用办法，包括：形状图形的组成结构及其具体用 法、九宫格图片（点九图片）的制作过程及其适用场景、状态列表图形的产生背景及其具体用法。


### 图形Drawable

Android把所有能够显示的图形都抽象为Drawable类（可绘制的）。这里的图形不止是图片，还包括色 块、画板、背景等。

包含图片在内的图形文件放在res目录的各个drawable目录下，其中drawable目录一般保存描述性的 XML文件，而图片文件一般放在具体分辨率的drawable目录下。例如：

- drawable-ldpi里面存放低分辨率的图片（如240×320），现在基本没有这样的智能手机了。 
- drawable-mdpi里面存放中等分辨率的图片（如320×480），这样的智能手机已经很少了。 
- drawable-hdpi里面存放高分辨率的图片（如480×800），一般对应4英寸～4.5英寸的手机（但不 绝对，同尺寸的手机有可能分辨率不同，手机分辨率就高不就低，因为分辨率低了屏幕会有模糊的 感觉）。 
- drawable-xhdpi里面存放加高分辨率的图片（如720×1280），一般对应5英寸～5.5英寸的手机。 
- drawable-xxhdpi里面存放超高分辨率的图片（如1080×1920），一般对应6英寸～6.5英寸的手机。 
- drawable-xxxhdpi里面存放超超高分辨率的图片（如1440×2560），一般对应7英寸以上的平板电 脑。

基本上，分辨率每加大一级，宽度和高度就要增加二分之一或三分之一像素。如果各目录存在同名图 片，Android就会根据手机的分辨率分别适配对应文件夹里的图片。在开发App时，为了兼容不同的手机 屏幕，在各目录存放不同分辨率的图片，才能达到最合适的显示效果。例如，在drawable-hdpi放了一 张背景图片bg.png（分辨率为480×800），其他目录没放，使用分辨率为480×800的手机查看该App界 面没有问题，但是使用分辨率为720×1280的手机查看该App会发现背景图片有点模糊，原因是Android 为了让bg.png适配高分辨率的屏幕，强行把bg.png拉伸到了720×1280，拉伸的后果是图片变模糊了。

在XML布局文件中引用图形文件可使用“@drawable/不含扩展名的文件名称”这种形式，如各视图的 background属性、ImageView和ImageButton的src属性、TextView和Button四个方向的drawable*** 系列属性都可以引用图形文件。

### 形状图形

Shape图形又称形状图形，它用来描述常见的几何形状，包括矩形、圆角矩形、圆形、椭圆等。用好形 状图形可以让App页面不再呆板，还可以节省美工不少工作量。

形状图形的定义文件放在drawable目录下，它是以shape标签为根节点的XML描述文件。根节点下定义 了6个节点，分别是：size（尺寸）、stroke（描边）、corners（圆角）、solid（填充）、padding （间隔）、gradient（渐变），各节点的属性值主要是长宽、半径、角度以及颜色等。下面是形状图形 各个节点及其属性的简要说明。

**1．shape（形状）**

shape是形状图形文件的根节点，它描述了当前是哪种几何图形。下面是shape节点的常用属性说明。

- shape：字符串类型，表示图形的形状。形状类型的取值说明见表5-1。

​															表5-1　形状类型的取值说明

| 形状类型  | 说明                                     |
| --------- | ---------------------------------------- |
| rectangle | 矩形。默认值                             |
| oval      | 椭圆。此时corners节点会失效              |
| line      | 直线。此时必须设置stroke节点，不然会报错 |
| ring      | 圆环                                     |



**2．size（尺寸）**

size是shape的下级节点，它描述了形状图形的宽高尺寸。若无size节点，则表示宽高与宿主视图一样大 小。下面是size节点的常用属性说明。

- height：像素类型，图形高度。 

- width：像素类型，图形宽度。


**3．stroke（描边）**

stroke是shape的下级节点，它描述了形状图形的描边规格。若无stroke节点，则表示不存在描边。下 面是stroke节点的常用属性说明。

- color：颜色类型，描边的颜色。 

- dashGap：像素类型，每段虚线之间的间隔。 

- dashWidth：像素类型，每段虚线的宽度。若dashGap和dashWidth有一个值为0，则描边为实线。

- width：像素类型，描边的厚度。

  

**4．corners（圆角）**

corners是shape的下级节点，它描述了形状图形的圆角大小。若无corners节点，则表示没有圆角。下 面是corners节点的常用属性说明。

- bottomLeftRadius：像素类型，左下圆角的半径。 
- bottomRightRadius：像素类型，右下圆角的半径。 
- topLeftRadius：像素类型，左上圆角的半径。 
- topRightRadius：像素类型，右上圆角的半径。 
- radius：像素类型，4个圆角的半径（若有上面4个圆角半径的定义，则不需要radius定义）。



**5．solid（填充）**

solid是shape的下级节点，它描述了形状图形的填充色彩。若无solid节点，则表示无填充颜色。下面是 solid节点的常用属性说明。

- color：颜色类型，内部填充的颜色。



**6．padding（间隔）**

padding是shape的下级节点，它描述了形状图形与周围边界的间隔。若无padding节点，则表示四周不 设间隔。下面是padding节点的常用属性说明。

- top：像素类型，与上方的间隔。 
- bottom：像素类型，与下方的间隔。 
- left：像素类型，与左边的间隔。
- right：像素类型，与右边的间隔。


**7．gradient（渐变）**

gradient是shape的下级节点，它描述了形状图形的颜色渐变。若无gradient节点，则表示没有渐变效 果。下面是gradient节点的常用属性说明。

- angle：整型，渐变的起始角度。为0时表示时钟的9点位置，值增大表示往逆时针方向旋转。例 如，值为90表示6点位置，值为180表示3点位置，值为270表示0点/12点位置。
- type：字符串类型，渐变类型。渐变类型的取值说明见表5-2。

​														表5-2　渐变类型的取值说明

| 渐变类型 | 说明                                            |
| -------- | ----------------------------------------------- |
| linear   | 线性渐变，默认值                                |
| radial   | 放射渐变，起始颜色就是圆心颜色                  |
| sweep    | 滚动渐变，即一个线段以某个端点为圆心做360度旋转 |

- centerX：浮点型，圆心的X坐标。当android:type="linear"时不可用。 
- centerY：浮点型，圆心的Y坐标。当android:type="linear"时不可用。 gradientRadius：整型，渐变的半径。当android:type="radial"时需要设置该属性。 
- centerColor：颜色类型，渐变的中间颜色。 
- startColor：颜色类型，渐变的起始颜色。 
- endColor：颜色类型，渐变的终止颜色。 
- useLevel：布尔类型，设置为true为无渐变色、false为有渐变色。

在实际开发中，形状图形主要使用3个节点：stroke（描边）、corners（圆角）和solid（填充）。至于 shape根节点的属性一般不用设置（默认矩形即可）。

接下来演示一下形状图形的界面效果，首先右击drawable目录，并依次选择右键菜单的 New→Drawable resource file，在弹窗中输入文件名称再单击OK按钮，即可自动生成一个XML描述文 件。往该文件填入下面的圆角矩形内容定义：

```xml
<shape xmlns:android="http://schemas.android.com/apk/res/android" >
     
     <!-- 指定了形状内部的填充颜色 -->
     <solid android:color="#ffdd66" />
     
     <!-- 指定了形状轮廓的粗细与颜色 -->
     <stroke
          android:width="1dp"
          android:color="#aaaaaa" />
     
     <!-- 指定了形状四个圆角的半径 -->
     <corners android:radius="10dp" />
     
</shape>
```


接着创建一个测试页面，并在页面的XML文件中添加名为v_content的View标签，再给Java代码补充以下 的视图背景设置代码：

```java
// 从布局文件中获取名为v_content的视图
View v_content = findViewById(R.id.v_content);
// v_content的背景设置为圆角矩形
v_content.setBackgroundResource(R.drawable.shape_rect_gold);
```

然后运行测试App，观察到对应的形状图形如图5-1所示。该形状为一个圆角矩形，内部填充色为土黄 色，边缘线为灰色。

再来一个椭圆的XML描述文件示例如下：

```xml
<shape xmlns:android="http://schemas.android.com/apk/res/android" 
       android:shape="oval" >
     <!-- 指定了形状内部的填充颜色 -->
     <solid android:color="#ff66aa" />
     <!-- 指定了形状轮廓的粗细与颜色 -->
     <stroke
          android:width="1dp"
          android:color="#aaaaaa" />
</shape>
```

把前述的视图对象v_content背景改为R.drawable.shape_oval_rose，运行App观察到对应的形状图形如 图5-2所示。该形状为一个椭圆，内部填充色为玫红色，边缘线为灰色。

<img src="/androidImages/image-20230731214554970.png" alt="image-20230731214554970" style="zoom:80%;" />

<img src="/androidImages/image-20230731214607875.png" alt="image-20230731214607875" style="zoom:80%;" />


### 九宫格图片

将某张图片设置成视图背景时，如果图片尺寸太小，则系统会自动拉伸图片使之填满背景。可是一旦图 片拉得过大，其画面容易变得模糊，如图5-3所示，上面按钮的背景图片被拉得很宽，此时左右两边的边 缘线既变宽又变模糊了。

<img src="/androidImages/image-20230731214631665.png" alt="image-20230731214631665" style="zoom:80%;" />

为了解决这个问题，Android专门设计了点九图片。点九图片的扩展名是png，文件名后面常带有“.9”字 样。因为该图片划分了3×3的九宫格区域，所以得名点九图片，也叫九宫格图片。如果背景是一个形状 图形，其stroke节点的width属性已经设置了固定数值（如1dp），那么无论该图形被拉到多大，描边宽 度始终是1dp。点九图片的实现原理与之类似，即拉伸图形时，只拉伸内部区域，不拉伸边缘线条。

为了演示九宫格图片的展示效果，要利用Android Studio制作一张点九图片。首先在drawable目录下找 到待加工的原始图片button_pressed_orig.png，右击它弹出右键菜单如图5-4所示。

选择右键菜单下面的“Create 9-Patch files…”，并在随后弹出的对话框中单击OK按钮。接着drawable目 录自动生成一个名为“button_pressed_orig.9.png”的图片，双击该文件，主界面右侧弹出如图5-5所示的 点九图片的加工窗口。

<div style="page-break-after: always;"></div>

![image-20230731214705999](/androidImages/image-20230731214705999.png)

​																				图5-4　点九图片的制作菜单路径

![image-20230731214747219](/androidImages/image-20230731214747219.png)

注意图5-5的左侧窗口是图片加工区域，右侧窗口是图片预览区域，从上到下依次是纵向拉伸预览、横向 拉伸预览、两方向同时拉伸预览。在左侧窗口图片四周的马赛克处单击会出现一个黑点，把黑点左右或 上下拖动会拖出一段黑线，不同方向上的黑线表示不同的效果。


如图5-6所示，界面上边的黑线指的是水平方向的拉伸区域。水平方向拉伸图片时，只有黑线区域内的图 像会拉伸，黑线以外的图像保持原状，从而保证左右两侧的边框厚度不变。

![image-20230731214813792](/androidImages/image-20230731214813792.png)

如图5-7所示，界面左边的黑线指的是垂直方向的拉伸区域。垂直方向拉伸图片时，只有黑线区域内的图 像会拉伸，黑线以外的图像保持原状，从而保证上下两侧的边框厚度不变。

![image-20230731214829448](/androidImages/image-20230731214829448.png)

如图5-8所示，界面下边的黑线指的是该图片作为控件背景时，控件内部的文字左右边界只能放在黑线区 域内。这里Horizontal Padding的效果就相当于android:paddingLeft与android:paddingRight。

![image-20230731214845967](/androidImages/image-20230731214845967.png)

如图5-9所示，界面右边的黑线指的是该图片作为控件背景时，控件内部的文字上下边界只能放在黑线区 域内。这里Vertical Padding的效果就相当于android:paddingTop与android:paddingBottom。

![image-20230731214901730](/androidImages/image-20230731214901730.png)

尤其注意，如果点九图片被设置为视图背景，且该图片指定了Horizontal Padding和Vertical Padding， 那么视图内部将一直与视图边缘保持固定间距，无论怎么调整XML文件和Java代码都无法缩小间隔，缘 由是点九图片早已在水平和垂直方向都设置了padding。

### 状态列表图形

常见的图形文件一般为静态图形，但有时会用到动态图形，比如按钮控件的背景在正常情况下是凸起 的，在按下时是凹陷的，从按下到弹起的过程，用户便晓得点击了该按钮。根据不同的触摸情况变更图 形状态，这种情况用到了Drawable的一个子类StateListDrawable（状态列表图形），它在XML文件中 规定了不同状态时候所呈现的图形列表。

接下来演示一下状态列表图形的界面效果，右击drawable目录，并依次选择右键菜单的 New→Drawable resource file，在弹窗中输入文件名称再单击OK按钮，即可自动生成一个XML描述文 件。往该文件填入下面的状态列表图形定义：

```xml
<selector xmlns:android="http://schemas.android.com/apk/res/android">
     <item android:state_pressed="true"
     	android:drawable="@drawable/button_pressed" />
     <item android:drawable="@drawable/button_normal" />
</selector>
```

上述XML文件的关键点是state_pressed属性，该属性表示按下状态，值为true表示按下时显示 button_pressed图像，其余情况显示button_normal图像。

为方便理解，接下来做个实验，首先将按钮控件的background属性设置为 @drawable/btn_nine_selector，然后在屏幕上点击该按钮，观察发现按下时候的界面如图5-10所示， 而松开时候的界面如图5-11所示，可见按下与松开果然显示不同的图片。

<img src="/androidImages/image-20230801171243902.png" alt="image-20230801171243902" style="zoom:80%;" />

<img src="/androidImages/image-20230801171300025.png" alt="image-20230801171300025" style="zoom:80%;" />

状态列表图形不仅用于按钮控件，还可用于其他拥有多种状态的控件，这取决于开发者在XML文件中指 定了哪种状态类型。各种状态类型的取值说明详见表5-3。


​																						5-3　状态类型的取值说明

| 状态类型的属性名称 | 说明         | 适用的控件                          |
| ------------------ | ------------ | ----------------------------------- |
| state_pressed      | 是否按下     | 按钮Button                          |
| state_checked      | 是否勾选     | 复选框CheckBox、单选按钮RadioButton |
| state_focused      | 是否获取焦点 | 文本编辑框EditText                  |
| state_selected     | 是否选中     | 各控件通用                          |




## 选择按钮

介绍几个常用的特殊控制按钮，包括：如何使用复选框CheckBox及其勾选监听器、如何使用开关按 钮Switch、如何借助状态列表图形实现仿iOS的开关按钮、如何使用单选按钮RadioButton和单选组 RadioGroup及其选中监听器。


### 复选框CheckBox

在学习复选框之前，先了解一下CompoundButton。在Android体系中，CompoundButton类是抽象的 复合按钮，因为是抽象类，所以它不能直接使用。实际开发中用的是CompoundButton的几个派生类， 主要有复选框CheckBox、单选按钮RadioButton以及开关按钮Switch，这些派生类均可使用 CompoundButton的属性和方法。加之CompoundButton本身继承了Button类，故以上几种按钮同时 具备Button的属性和方法，它们之间的继承关系如图5-12所示。

<img src="/androidImages/image-20230801171632958.png" alt="image-20230801171632958"  />

CompoundButton在XML文件中主要使用下面两个属性。 

- checked：指定按钮的勾选状态，true表示勾选，false则表示未勾选。默认为未勾选。 
- button：指定左侧勾选图标的图形资源，如果不指定就使用系统的默认图标。

CompoundButton在Java代码中主要使用下列4种方法。 

- setChecked：设置按钮的勾选状态。 
- setButtonDrawable：设置左侧勾选图标的图形资源。 
- setOnCheckedChangeListener：设置勾选状态变化的监听器。 
- isChecked：判断按钮是否勾选。

复选框CheckBox是CompoundButton一个最简单的实现控件，点击复选框将它勾选，再次点击取消勾 选。复选框对象调用setOnCheckedChangeListener方法设置勾选监听器，这样在勾选和取消勾选时就 会触发监听器的勾选事件。

接下来演示复选框的操作过程，首先编写活动页面的XML文件如下所示：

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
     android:layout_width="match_parent"
     android:layout_height="match_parent"
     android:orientation="vertical"
     android:padding="5dp" >
     
     <CheckBox
          android:id="@+id/ck_system"
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
          android:padding="5dp"
          android:checked="false"
          android:text="这是系统的CheckBox"
          android:textColor="@color/black"
		android:textSize="17sp" />
     
</LinearLayout>

```


接着编写对应的Java代码，主要是如何处理勾选监听器，具体代码如下所示：

```java
// 该页面实现了接口OnCheckedChangeListener，意味着要重写勾选监听器的onCheckedChanged方法
public class CheckBoxActivity extends AppCompatActivity 
     implements CompoundButton.OnCheckedChangeListener {
     
     @Override
     protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_check_box);
          // 从布局文件中获取名叫ck_system的复选框
          CheckBox ck_system = findViewById(R.id.ck_system);
          // 从布局文件中获取名叫ck_custom的复选框
          CheckBox ck_custom = findViewById(R.id.ck_custom);
          // 给ck_system设置勾选监听器，一旦用户点击复选框，就触发监听器的onCheckedChanged方
          法
          ck_system.setOnCheckedChangeListener(this);
          // 给ck_custom设置勾选监听器，一旦用户点击复选框，就触发监听器的onCheckedChanged方
          法
          ck_custom.setOnCheckedChangeListener(this);
     }
     
     @Override
     public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
          String desc = String.format("您%s了这个CheckBox", isChecked ? "勾选" : "取消勾选");
  		buttonView.setText(desc);
     }
                                 
}
```

然后运行测试App，一开始的演示界面如图5-13所示，此时复选框默认未勾选。首次点击复选框，此时 复选框的图标及文字均发生变化，如图5-14所示；再次点击复选框，此时复选框的图标及文字又发生变 化，如图5-15所示；可见先后触发了勾选与取消勾选事件。

![image-20230801171943718](/androidImages/image-20230801171943718.png)

![image-20230801171954467](/androidImages/image-20230801171954467.png)

![image-20230801172004933](/androidImages/image-20230801172004933.png)



### 开关按钮Switch

Switch是开关按钮，它像一个高级版本的CheckBox，在选中与取消选中时可展现的界面元素比复选框丰 富。Switch控件新添加的XML属性说明如下：

- textOn：设置右侧开启时的文本。 
- textOff：设置左侧关闭时的文本。 
- track：设置开关轨道的背景。 
- thumb：设置开关标识的图标。

虽然开关按钮是升级版的复选框，但它在实际开发中用得不多。原因之一是大家觉得Switch的默认界面 不够大气，如图5-16和图5-17所示，小巧的开关图标显得有些拘谨；原因之二是大家觉得iPhone的界面 很漂亮，无论用户还是客户，都希望App实现iOS那样的控件风格，于是iOS的开关按钮UISwitch就成了 安卓开发者仿照的对象。

![image-20230801172055580](/androidImages/image-20230801172055580.png)

![image-20230801172109153](/androidImages/image-20230801172109153.png)

现在要让Android实现类似iOS的开关按钮，主要思路是借助状态列表图形，首先创建一个图形专用的 XML文件，给状态列表指定选中与未选中时候的开关图标，如下所示：

```xml
<selector xmlns:android="http://schemas.android.com/apk/res/android">
     <item android:state_checked="true" android:drawable="@drawable/switch_on"/>
     <item android:drawable="@drawable/switch_off"/>
</selector>
```

<div style="page-break-after: always;"></div>

然后把CheckBox标签的background属性设置为@drawable/switch_selector，同时将button属性设置 为@null。完整的CheckBox标签内容示例如下：

```xml
<CheckBox
     android:id="@+id/ck_status"
     android:layout_width="60dp"
     android:layout_height="30dp"
     android:background="@drawable/switch_selector"
     android:button="@null" />
```

为什么这里修改background属性，而不直接修改button属性呢？因为button属性有局限，无论多大的 图片，都只显示一个小小的图标，可是小小的图标一点都不大气，所以这里必须使用background属性， 要它有多大就能有多大，这才够炫够酷。

最后看看这个仿iOS开关按钮的效果，分别如图5-18和图5-19所示。这下开关按钮脱胎换骨，又圆又鲜 艳，比原来的Switch好看了很多。

![image-20230801172229596](/androidImages/image-20230801172229596.png)

![image-20230801172240906](/androidImages/image-20230801172240906.png)

### 单选按钮RadioButton

所谓单选按钮，指的是在一组按钮中选择其中一项，并且不能多选，这要求有个容器确定这组按钮的范 围，这个容器便是单选组RadioGroup。单选组实质上是个布局，同一组RadioButton都要放在同一个 RadioGroup节点下。RadioGroup提供了orientation属性指定下级控件的排列方向，该属性为 horizontal时，单选按钮在水平方向排列；该属性为vertical时，单选按钮在垂直方向排列。

RadioGroup下面除了RadioButton，还可以挂载其他子控件（如TextView、ImageView等）。如此看 来，单选组相当于特殊的线性布局，它们主要有以下两个区别：

1. 单选组多了管理单选按钮的功能，而线性布局不具备该功能。
2. 如果不指定orientation属性，那么单选组默认垂直排列，而线性布局默认水平排列。

下面是RadioGroup在Java代码中的3个常用方法。

- check：选中指定资源编号的单选按钮。 
- getCheckedRadioButtonId：获取已选中单选按钮的资源编号。 
- setOnCheckedChangeListener：设置单选按钮勾选变化的监听器。

与CheckBox不同的是，RadioButton默认未选中，点击后显示选中，但是再次点击不会取消选中。只有 点击同组的其他单选按钮时，原来选中的单选按钮才会取消选中。另需注意，单选按钮的选中事件不是 由RadioButton处理，而是由RadioGroup处理。

接下来演示单选按钮的操作过程，首先编写活动页面的XML文件如下所示：

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
     android:layout_width="match_parent"
     android:layout_height="match_parent"
     android:orientation="vertical"
     android:padding="5dp" >

     <TextView
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
          android:text="请选择您的性别"
          android:textColor="@color/black"
          android:textSize="17sp" />
     
     <RadioGroup
          android:id="@+id/rg_sex"
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
          android:orientation="horizontal" >
          
               <RadioButton
                    android:id="@+id/rb_male"
                    android:layout_width="0dp"
                    android:layout_height="wrap_content"
                    android:layout_weight="1"
                    android:checked="false"
                    android:text="男"
                    android:textColor="@color/black"
                    android:textSize="17sp" />
          
               <RadioButton
                    android:id="@+id/rb_female"
                    android:layout_width="0dp"
                    android:layout_height="wrap_content"
                    android:layout_weight="1"
                    android:checked="false"
                    android:text="女"
                    android:textColor="@color/black"
                    android:textSize="17sp" />
	</RadioGroup>
     
     <TextView
          android:id="@+id/tv_sex"
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
          android:textColor="@color/black"
          android:textSize="17sp" />

</LinearLayout>
```


接着编写对应的Java代码，主要是如何处理选中监听器，具体代码如下所示：

```java
// 该页面实现了接口OnCheckedChangeListener，意味着要重写选中监听器的onCheckedChanged方法
public class RadioHorizontalActivity extends AppCompatActivity
implements RadioGroup.OnCheckedChangeListener {
     
	private TextView tv_sex; // 
     
     @Override
     protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_radio_horizontal);
          // 从布局文件中获取名叫tv_sex的文本视图
          tv_sex = findViewById(R.id.tv_sex);
          // 从布局文件中获取名叫rg_sex的单选组
          RadioGroup rg_sex = findViewById(R.id.rg_sex);
          // 设置单选监听器，一旦点击组内的单选按钮，就触发监听器的onCheckedChanged方法
          rg_sex.setOnCheckedChangeListener(this);
     }
     // 在用户点击组内的单选按钮时触发
     @Override
     public void onCheckedChanged(RadioGroup group, int checkedId) {
          if (checkedId == R.id.rb_male) {
          	tv_sex.setText("哇哦，你是个帅气的男孩");
          } else if (checkedId == R.id.rb_female) {
          	tv_sex.setText("哇哦，你是个漂亮的女孩");
          }
     }
     
}
```


然后运行测试App，一开始的演示界面如图5-20所示，此时两个单选按钮均未选中。先点击左边的单选 按钮，此时左边按钮显示选中状态，如图5-21所示；再点击右边的单选按钮，此时右边按钮显示选中状 态，同时左边按钮取消选中，如图5-22所示；可见果然实现了组内只能选中唯一按钮的单选功能。

![image-20230801172658746](/androidImages/image-20230801172658746.png)

![image-20230801172708321](/androidImages/image-20230801172708321.png)

![image-20230801172722067](/androidImages/image-20230801172722067.png)



## 文本输入

如何在编辑框EditText上高效地输入文本，包括：如何改变编辑框的控件外观，如何利用焦点 变更监听器提前校验输入位数，如何利用文本变化监听器自动关闭软键盘。


### 编辑框EditText

编辑框EditText用于接收软键盘输入的文字，例如用户名、密码、评价内容等，它由文本视图派生而 来，除了TextView已有的各种属性和方法，EditText还支持下列XML属性。

- inputType：指定输入的文本类型。输入类型的取值说明见表5-4，若同时使用多种文本类型，则可使用竖线“|”把多种文本类型拼接起来。 
- maxLength：指定文本允许输入的最大长度。 
- hint：指定提示文本的内容。 
- textColorHint：指定提示文本的颜色。

| 输入类型       | 文本                                                       |
| -------------- | ---------------------------------------------------------- |
| text           | 文本                                                       |
| textPassword   | 文本密码。显示时用圆点“·”代替                              |
| number         | 整型数                                                     |
| numberSigned   | 带符号的数字。允许在开头带负号“－”                         |
| numberDecimal  | 带小数点的数字                                             |
| numberPassword | 数字密码。显示时用圆点“·”代替                              |
| datetime       | 时间日期格式。除了数字外，还允许输入横线、斜杆、空格、冒号 |
| date           | 日期格式。除了数字外，还允许输入横线“-”和斜杆“/”           |
| time           | 时间格式。除了数字外，还允许输入冒号“:”                    |


接下来通过XML布局观看编辑框界面效果，演示用的XML文件内容如下：

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
     android:layout_width="match_parent"
     android:layout_height="match_parent"
     android:padding="5dp"
     android:orientation="vertical" >
     
	<TextView
		android:layout_width="match_parent"
          android:layout_height="wrap_content"
          android:layout_marginTop="5dp"
          android:text="下面是登录信息"
          android:textColor="@color/black"
          android:textSize="17sp" />
     
     <EditText
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
          android:inputType="text"
          android:maxLength="10"
          android:hint="请输入用户名"
          android:textColor="@color/black"
          android:textSize="17sp" />
     
     <EditText
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
          android:inputType="textPassword"
          android:maxLength="8"
          android:hint="请输入密码"
          android:textColor="@color/black"
          android:textSize="17sp" />
     
</LinearLayout>
```

运行测试App，进入初始的编辑框页面如图5-23所示。然后往用户名编辑框输入文字，输满10个字后发 现不能再输入，于是切换到密码框继续输，直到输满8位密码，此时编辑框页面如图5-24所示。


根据以上图示可知编辑框的各属性正常工作，不过编辑框有根下划线，未输入时显示灰色，正在输入时 显示红色，这种效果是怎么实现的呢？其实下划线没用到新属性，而用了已有的背景属性background； 至于未输入与正在输入两种情况的颜色差异，乃是因为使用了状态列表图形，编辑框获得焦点时（正在 输入）显示红色的下划线，其余时候显示灰色下划线。当然EditText默认的下划线背景不甚好看，下面 将利用状态列表图形将编辑框背景改为更加美观的圆角矩形。

![image-20230801173218214](/androidImages/image-20230801173218214.png)

![image-20230801173228257](/androidImages/image-20230801173228257.png)

<div style="page-break-after: always;"></div>

首先编写圆角矩形的形状图形文件，它的XML定义文件示例如下：

```xml
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" >
     
     <!-- 指定了形状内部的填充颜色 -->
     <solid android:color="#ffffff" />
     
     <!-- 指定了形状轮廓的粗细与颜色 -->
     <stroke
          android:width="1dp"
          android:color="#aaaaaa" />
     
     <!-- 指定了形状四个圆角的半径 -->
     <corners android:radius="5dp" />
     
     <!-- 指定了形状四个方向的间距 -->
     <padding
          android:bottom="2dp"
          android:left="2dp"
          android:right="2dp"
          android:top="2dp" />
</shape>
```

上述的shape_edit_normal.xml定义了一个灰色的圆角矩形，可在未输入时展示该形状。正在输入时候 的形状要改为蓝色的圆角矩形，其中轮廓线条的色值从aaaaaa（灰色）改成0000ff（蓝色），具体定义 放在shape_edit_focus.xml。

接着编写编辑框背景的状态列表图形文件，主要在selector节点下添加两个item，一个item设置了获得 焦点时刻（android:state_focused="true"）的图形为@drawable/shape_edit_focus；另一个item设置 了图形@drawable/shape_edit_normal但未指定任何状态，表示其他情况都展示该图形。完整的状态列 表图形定义示例如下：

```xml
<selector xmlns:android="http://schemas.android.com/apk/res/android">
     
     <item android:state_focused="true"
     	android:drawable="@drawable/shape_edit_focus"/>
     
     <item android:drawable="@drawable/shape_edit_normal"/>
     
</selector>
```


然后编写测试页面的XML布局文件，一共添加3个EditText标签，第一个EditText采用默认的编辑框背 景；第二个EditText将background属性值设为@null，此时编辑框不显示任何背景；第三个EditText将 background属性值设为@drawable/editext_selector，其背景由editext_selector.xml所定义的状态列 表图形决定。详细的XML文件内容如下所示：

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
     android:layout_width="match_parent"
     android:layout_height="match_parent"
     android:padding="5dp"
     android:orientation="vertical" >
     
     <EditText
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
          android:inputType="text"
          android:hint="这是默认边框"
          android:textColor="@color/black"
          android:textSize="17sp" />
     
     <EditText
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
          android:layout_marginTop="5dp"
          android:inputType="text"
          android:hint="我的边框不见了"
          android:background="@null"
          android:textColor="@color/black"
          android:textSize="17sp" />
     
     <EditText
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
          android:layout_marginTop="5dp"
          android:inputType="text"
          android:hint="我的边框是圆角"
          android:background="@drawable/editext_selector"
          android:textColor="@color/black"
          android:textSize="17sp" />
     
</LinearLayout>
```


最后运行测试App，更换背景之后的编辑框界面如图5-25所示，可见第三个编辑框的背景成功变为了圆 角矩形边框。

![image-20230801173509965](/androidImages/image-20230801173509965.png)

​																				图5-25　更换背景后的编辑框样式


### 焦点变更监听器

虽然编辑框EditText提供了maxLength属性，用来设置可输入文本的最大长度，但是它没提供对应的 minLength属性，也就无法设置可输入文本的最小长度。譬如手机号码为固定的11位数字，用户必须输 满11位才是合法的，然而编辑框不会自动检查手机号码是否达到11位，即使用户少输一位只输入十位数 字，编辑框依然认为这是合法的手机号。比如图5-26所示的登录页面，有手机号码编辑框，有密码编辑框，还有登录按钮。

![image-20230801173559151](/androidImages/image-20230801173559151.png)



既然编辑框不会自动校验手机号是否达到11位，势必要求代码另行检查。一种想法是在用户点击登录按 钮时再判断，不过通常此时已经输完手机号与密码，为啥不能在输入密码之前就判断手机号码的位数 呢？早点检查可以帮助用户早点发现错误，特别是表单元素较多的时候，更能改善用户的使用体验。就 上面的登录例子而言，手机号编辑框下方为密码框，那么能否给密码框注册点击事件，以便在用户准备 输入密码时就校验手机号的位数呢？

然而实际运行App却发现，先输入手机号码再输入密码，一开始并不会触发密码框的点击事件，再次点击密码框才会触发点击事件。缘由是编辑框比较特殊，**要点击两次后才会触发点击事件**，因为第一次点击只触发焦点变更事件，第二次点击才触发点击事件。编辑框的所谓焦点，直观上就看那个闪动的光 标，哪个编辑框有光标，焦点就落在哪里。光标在编辑框之间切换，便产生了焦点变更事件，所以对于 编辑框来说，应当注册焦点变更监听器，而非注册点击监听器。

焦点变更监听器来自于接口View.OnFocusChangeListener，若想注册该监听器，就要调用编辑框对象 的setOnFocusChangeListener方法，即可在光标切换之时（获得光标和失去光标）触发焦点变更事 件。下面是给密码框注册焦点变更监听器的代码例子：

```java
// 从布局文件中获取名为et_password的编辑框
EditText et_password = findViewById(R.id.et_password);
// 给编辑框注册一个焦点变化监听器，一旦焦点发生变化，就触发监听器的onFocusChange方法
et_password.setOnFocusChangeListener(this);
```

以上代码把焦点变更监听器设置到当前页面，则需让活动页面实现接口 View.OnFocusChangeListener，并重写该接口定义的onFocusChange方法，判断如果是密码框获得焦 点，就检查输入的手机号码是否达到11位。具体的焦点变更处理方法如下所示：

```java
// 焦点变更事件的处理方法，hasFocus表示当前控件是否获得焦点。
// 为什么光标进入事件不选onClick？因为要点两下才会触发onClick动作（第一下是切换焦点动作）
@Override
public void onFocusChange(View v, boolean hasFocus) {
	// 判断密码编辑框是否获得焦点。hasFocus为true表示获得焦点，为false表示失去焦点
	if (v.getId()==R.id.et_password && hasFocus) {
          String phone = et_phone.getText().toString();
          if (TextUtils.isEmpty(phone) || phone.length()<11) { // 手机号码不足11位
               // 手机号码编辑框请求焦点，也就是把光标移回手机号码编辑框
               et_phone.requestFocus();
               Toast.makeText(this, "请输入11位手机号码", Toast.LENGTH_SHORT).show();
     	}
     }
}
```

改好代码重新运行App，当手机号不足11位时点击密码框，界面底部果然弹出了相应的提示文字，如图 5-27所示，并且光标仍然留在手机号码编辑框，说明首次点击密码框的确触发了焦点变更事件。

![image-20230801173811846](/androidImages/image-20230801173811846.png)


### 文本变化监听器

输入法的软键盘往往会遮住页面下半部分，使得“登录”“确认”“下一步”等按钮看不到了，用户若想点击这 些按钮还得再点一次返回键才能关闭软键盘。为了方便用户操作，最好在满足特定条件时自动关闭软键 盘，比如手机号码输入满11位后自动关闭软键盘，又如密码输入满6位后自动关闭软键盘，等等。达到 指定位数便自动关闭键盘的功能，可以再分解为两个独立的功能点，一个是如何关闭软键盘，另一个是 如何判断已输入的文字达到指定位数，分别说明如下。


**1．如何关闭软键盘**

诚然按下返回键就会关闭软键盘，但这是系统自己关闭的，而非开发者在代码中关闭。因为输入法软键 盘由系统服务INPUT_METHOD_SERVICE管理，所以关闭软键盘也要由该服务处理，下面是使用系统服 务关闭软键盘的代码例子：

```java
public static void hideOneInputMethod(Activity act, View v) {
     // 从系统服务中获取输入法管理器
     InputMethodManager imm = (InputMethodManager)
     act.getSystemService(Context.INPUT_METHOD_SERVICE);
     // 关闭屏幕上的输入法软键盘
     imm.hideSoftInputFromWindow(v.getWindowToken(), 0);
}
```

注意上述代码里面的视图对象v，虽然控件类型为View，但它必须是EditText类型才能正常关闭软键盘。

**2．如何判断已输入的文字达到指定位数**

该功能点要求实时监控当前已输入的文本长度，这个监控操作用到文本监听器接口TextWatcher，该接 口提供了3个监控方法，具体说明如下：

- beforeTextChanged：在文本改变之前触发。 
- onTextChanged：在文本改变过程中触发。 
- afterTextChanged：在文本改变之后触发。

具体到编码实现，需要自己写个监听器实现TextWatcher接口，再调用编辑框对象的 addTextChangedListener方法注册文本监听器。监听操作建议在afterTextChanged方法中完成，如果 同时监听11位的手机号码和6位的密码，一旦输入文字达到指定长度就关闭键盘，则详细的监听器代码 如下所示：

```java
// 定义一个编辑框监听器，在输入文本达到指定长度时自动隐藏输入法
private class HideTextWatcher implements TextWatcher {
     
     private EditText mView; // 声明一个编辑框对象
	private int mMaxLength; // 声明一个最大长度变量
     
     public HideTextWatcher(EditText v, int maxLength) {
          super();
          mView = v;
          mMaxLength = maxLength;
     }
     // 在编辑框的输入文本变化前触发
     public void beforeTextChanged(CharSequence s, int start, int count, int after) {}
     
     // 在编辑框的输入文本变化时触发
     public void onTextChanged(CharSequence s, int start, int before, int count){}
     
     // 在编辑框的输入文本变化后触发
     public void afterTextChanged(Editable s) {
          String str = s.toString(); // 获得已输入的文本字符串
          
          // 输入文本达到11位（如手机号码），或者达到6位（如登录密码）时关闭输入法
          if ((str.length() == 11 && mMaxLength == 11)
          || (str.length() == 6 && mMaxLength == 6)) {
               
          	ViewUtil.hideOneInputMethod(EditHideActivity.this, mView); // 隐藏输入法软键盘
          }
     }
     
}
```


写好文本监听器代码，还要给手机号码编辑框和密码编辑框分别注册监听器，注册代码示例如下：

```java
// 从布局文件中获取名为et_phone的手机号码编辑框
EditText et_phone = findViewById(R.id.et_phone);
// 从布局文件中获取名为et_password的密码编辑框
EditText et_password = findViewById(R.id.et_password);
// 给手机号码编辑框添加文本变化监听器
et_phone.addTextChangedListener(new HideTextWatcher(et_phone, 11));
// 给密码编辑框添加文本变化监听器
et_password.addTextChangedListener(new HideTextWatcher(et_password, 6));
```

然后运行测试App，先输入手机号码的前10位，因为还没达到11位，所以软键盘依然展示，如图5-28所 示。接着输入最后一位手机号，总长度达到11位，于是软键盘自动关闭，如图5-29所示。

<img src="/androidImages/image-20230801174203753.png" alt="image-20230801174203753" style="zoom:80%;" />

<img src="/androidImages/image-20230801174227936.png" alt="image-20230801174227936" style="zoom:80%;" />



## 对话框

介绍几种常用的对话框控件，包括：如何使用提醒对话框处理不同的选项，如何使用日期对话框获 取用户选择的日期，如何使用时间对话框获取用户选择的时间。


### 提醒对话框AlertDialog

AlertDialog名为提醒对话框，它是Android中最常用的对话框，可以完成常见的交互操作，例如提示、 确认、选择等功能。由于AlertDialog没有公开的构造方法，因此必须借助建造器AlertDialog.Builder才 能完成参数设置，AlertDialog.Builder的常用方法说明如下。

- setIcon：设置对话框的标题图标。 
- setTitle：设置对话框的标题文本。 
- setMessage：设置对话框的内容文本。 
- setPositiveButton：设置肯定按钮的信息，包括按钮文本和点击监听器。 
- setNegativeButton：设置否定按钮的信息，包括按钮文本和点击监听器。 
- setNeutralButton：设置中性按钮的信息，包括按钮文本和点击监听器，该方法比较少用。

通过AlertDialog.Builder设置完对话框参数，还需调用建造器的create方法才能生成对话框实例。最后 调用对话框实例的show方法，在页面上弹出提醒对话框。

下面是构建并显示提醒对话框的Java代码例子：

```java
// 创建提醒对话框的建造器
AlertDialog.Builder builder = new AlertDialog.Builder(this);
builder.setTitle("尊敬的用户"); // 设置对话框的标题文本
builder.setMessage("你真的要卸载我吗？"); // 设置对话框的内容文本

// 设置对话框的肯定按钮文本及其点击监听器
builder.setPositiveButton("残忍卸载", new DialogInterface.OnClickListener() {
     @Override
     public void onClick(DialogInterface dialog, int which) {
     	tv_alert.setText("虽然依依不舍，但是只能离开了");
     }
});

// 设置对话框的否定按钮文本及其点击监听器
builder.setNegativeButton("我再想想", new DialogInterface.OnClickListener() {
     @Override
     public void onClick(DialogInterface dialog, int which) {
     	tv_alert.setText("让我再陪你三百六十五个日夜");
     }
});

AlertDialog alert = builder.create(); // 根据建造器构建提醒对话框对象
alert.show(); // 显示提醒对话框
```

提醒对话框的弹窗效果如图5-30所示，可见该对话框有标题和内容，还有两个按钮。

![image-20230801174539842](/androidImages/image-20230801174539842.png)

点击不同的对话框按钮会触发不同的处理逻辑。例如，图5-31为点击“我再想想”按钮后的页面，图5-32 为点击“残忍卸载”按钮后的页面。

![image-20230801174555600](/androidImages/image-20230801174555600.png)

​																						图5-32　点击“残忍卸载”的截图



### 日期对话框DatePickerDialog

虽然EditText提供了inputType="date"的日期输入，但是很少有人会手工输入完整日期，况且EditText 还不支持“ 年 ** 月 **日”这样的中文日期，所以系统提供了专门的日期选择器DatePicker，供用户选择 具体的年月日。不过，DatePicker并非弹窗模式，而是在当前页面占据一块区域，并且不会自动关闭。 按习惯来说，日期控件应该弹出对话框，选择完日期就要自动关闭对话框。因此，很少直接在界面上显 示DatePicker，而是利用已经封装好的日期选择对话框DatePickerDialog。

DatePickerDialog相当于在AlertDialog上装载了DatePicker，编码时只需调用构造方法设置当前的年、 月、日，然后调用show方法即可弹出日期对话框。日期选择事件则由监听器OnDateSetListener负责响 应，在该监听器的onDateSet方法中，开发者获取用户选择的具体日期，再做后续处理。特别注意 onDateSet的月份参数，它的起始值不是1而是0。也就是说，一月份对应的参数值为0，十二月份对应的 参数值为11，中间月份的数值以此类推。

在界面上内嵌显示DatePicker的效果如图5-33所示，其中，年、月、日通过上下滑动选择。单独弹出日 期对话框的效果如图5-34所示，其中年、月、日按照日历风格展示。

<img src="/androidImages/image-20230801174914691.png" alt="image-20230801174914691" style="zoom:80%;" />

<img src="/androidImages/image-20230801174931395.png" alt="image-20230801174931395" style="zoom:80%;" />

下面是使用日期对话框的Java代码例子，包括弹出日期对话框和处理日期监听事件：

```java
// 该页面类实现了接口OnDateSetListener，意味着要重写日期监听器的onDateSet方法
public class DatePickerActivity extends AppCompatActivity implements
View.OnClickListener, DatePickerDialog.OnDateSetListener {
     
     private TextView tv_date; // 声明一个文本视图对象
     private DatePicker dp_date; // 声明一个日期选择器对象
     
     @Override
     protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_date_picker);
          tv_date = findViewById(R.id.tv_date);
          // 从布局文件中获取名叫dp_date的日期选择器
          dp_date = findViewById(R.id.dp_date);
          findViewById(R.id.btn_date).setOnClickListener(this);
     }
     
     @Override
     public void onClick(View v) {
          if (v.getId() == R.id.btn_date) {
               // 获取日历的一个实例，里面包含了当前的年月日
               Calendar calendar = Calendar.getInstance();
               // 构建一个日期对话框，该对话框已经集成了日期选择器。
               // DatePickerDialog的第二个构造参数指定了日期监听器
               DatePickerDialog dialog = new DatePickerDialog(this, this,
               calendar.get(Calendar.YEAR), // 年份
               calendar.get(Calendar.MONTH), // 月份
               calendar.get(Calendar.DAY_OF_MONTH)); // 日子
               dialog.show(); // 显示日期对话框
          }
     }
     
     // 一旦点击日期对话框上的确定按钮，就会触发监听器的onDateSet方法
     @Override
     public void onDateSet(DatePicker view, int year, int monthOfYear, int
     dayOfMonth) {
          // 获取日期对话框设定的年月份
          String desc = String.format("您选择的日期是%d年%d月%d日",
          year, monthOfYear + 1, dayOfMonth);
          tv_date.setText(desc);
     }
}
```



### 时间对话框TimePickerDialog

既然有了日期选择器，还得有对应的时间选择器。同样，实际开发中也很少直接用TimePicker，而是用 封装好的时间选择对话框TimePickerDialog。该对话框的用法类似DatePickerDialog，不同之处主要有两个：

1. 构造方法传的是当前的小时与分钟，最后一个参数表示是否采取24小时制，一般为true表示小时 的数值范围为0～23；若为false则表示采取12小时制。
2. 时间选择监听器为OnTimeSetListener，对应需要实现onTimeSet方法，在该方法中可获得用户选择的小时和分钟。

在界面上内嵌显示TimePicker的效果如图5-35所示，其中，小时与分钟可通过上下滑动选择。单独弹出 时间对话框的效果如图5-36所示，其中小时与分钟按照钟表风格展示。

<img src="/androidImages/image-20230801175144173.png" alt="image-20230801175144173" style="zoom:80%;" />

<img src="/androidImages/image-20230801175201037.png" alt="image-20230801175201037" style="zoom:80%;" />

​																								图5-36　时间对话框的截图


下面是使用时间对话框的Java代码例子，包括弹出时间对话框和处理时间监听事件：

```java
// 该页面类实现了接口OnTimeSetListener，意味着要重写时间监听器的onTimeSet方法
public class TimePickerActivity extends AppCompatActivity implements
View.OnClickListener, TimePickerDialog.OnTimeSetListener {
     
     private TextView tv_time; // 声明一个文本视图对象
     private TimePicker tp_time; // 声明一个时间选择器对象
     
     @Override
     protected void onCreate(Bundle savedInstanceState) {
          
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_time_picker);
          tv_time = findViewById(R.id.tv_time);
          // 从布局文件中获取名叫tp_time的时间选择器
          tp_time = findViewById(R.id.tp_time);
          findViewById(R.id.btn_time).setOnClickListener(this);
          
     }
          
     @Override
     public void onClick(View v) {
          if (v.getId() == R.id.btn_time) {
               // 获取日历的一个实例，里面包含了当前的时分秒
               Calendar calendar = Calendar.getInstance();
               // 构建一个时间对话框，该对话框已经集成了时间选择器。
               // TimePickerDialog的第二个构造参数指定了时间监听器
               TimePickerDialog dialog = new TimePickerDialog(this, this,
               calendar.get(Calendar.HOUR_OF_DAY), // 小时
               calendar.get(Calendar.MINUTE), // 分钟
               true); // true表示24小时制，false表示12小时制
               dialog.show(); // 显示时间对话框
          }
	}
          
     // 一旦点击时间对话框上的确定按钮，就会触发监听器的onTimeSet方法
     @Override
     public void onTimeSet(TimePicker view, int hourOfDay, int minute) {
          // 获取时间对话框设定的小时和分钟
          String desc = String.format("您选择的时间是%d时%d分", hourOfDay, minute);
          tv_time.setText(desc);
     }
}
```

