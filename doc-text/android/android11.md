

# 活动Activity

介绍Android 4大组件之一Activity的基本概念和常见用法。主要包括如何正确地启动和停止活动页 面、如何在两个活动之间传递各类消息、如何在意图之外给活动添加额外的信息，等等。

<div style="page-break-after: always;"></div>

## 启停活动页面

介绍如何正确地启动和停止活动页面，首先描述活动页面的启动方法与结束方法，用户看到的页面 就是开发者塑造的活动；接着详细分析活动的完整生命周期，以及每个周期方法的发生场景和流转过 程；然后描述活动的几种启动模式，以及如何在代码中通过启动标志控制活动的跳转行为。

<div style="page-break-after: always;"></div>

### Activity的启动和结束

<a href="#to">“跳到另一个页面（Ctrl+单击点击查看）”</a>一节中，提到通过startActivity方法可以从当前页面跳到新页面，具 体格式如“startActivity(new Intent(源页面.this, 目标页面.class));”。由于当时尚未介绍按钮控件，因此只 好延迟3秒后才自动调用startActivity方法。现在有了按钮控件，就能利用按钮的点击事件去触发页面跳 转，譬如以下代码便在重写后的点击方法onClick中执行页面跳转动作。

```java
// 活动类直接实现点击监听器的接口View.OnClickListener
public class ActStartActivity extends AppCompatActivity implements View.OnClickListener {

     @Override
     protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_act_start);
          // setOnClickListener来自于View，故而允许直接给View对象注册点击监听器
          findViewById(R.id.btn_act_next).setOnClickListener(this);
     }
     
     @Override
     public void onClick(View v) { // 点击事件的处理方法
          if (v.getId() == R.id.btn_act_next) {
               // 从当前页面跳到指定的新页面
               //startActivity(new Intent(ActStartActivity.this,
               ActFinishActivity.class));
               startActivity(new Intent(this, ActFinishActivity.class));
          }
	}
}
```

以上代码中的startActivity方法，清楚标明了从当前页面跳到新的ActFinishActivity页面。之所以给新页 面取名ActFinishActivity，是为了在新页面中演示如何关闭页面。众所周知，若要从当前页面回到上一个 页面，点击屏幕底部的返回键即可实现，但不是所有场景都使用返回键。比如页面左上角的箭头图标经 常代表着返回动作，况且有时页面上会出现“完成”按钮，无论点击箭头图标还是点击完成按钮，都要求 马上回到上一个页面。包含箭头图标与“完成”按钮的演示界面如图4-1所示。

![image-20230731102219107](/androidImages/image-20230731102219107.png)

既然点击某个图标或者点击某个按钮均可能触发返回动作，就需要App支持在某个事件发生时主动返回 上一页。回到上一个页面其实相当于关闭当前页面，因为最开始由A页面跳到B页面，一旦关闭了B页 面，App应该展示哪个页面呢？当然是展示跳转之前的A页面了。在Java代码中，调用finish方法即可关 闭当前页面，前述场景要求点击箭头图标或完成按钮都返回上一页面，则需给箭头图标和完成按钮分别 注册点击监听器，然后在onClick方法中调用finish方法。下面便是添加了finish方法的新页面代码例子：

```java
// 活动类直接实现点击监听器的接口View.OnClickListener
public class ActFinishActivity extends AppCompatActivity implements View.OnClickListener 

     @Override
     protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_act_finish);
          // 给箭头图标注册点击监听器，ImageView由View类派生而来
          findViewById(R.id.iv_back).setOnClickListener(this);
          // 给完成按钮注册点击监听器，Button也由View类派生而来
          findViewById(R.id.btn_finish).setOnClickListener(this);
     }
     
     @Override
     public void onClick(View v) { // 点击事件的处理方法
          if (v.getId() == R.id.iv_back || v.getId() == R.id.btn_finish) {
          	finish(); // 结束当前的活动页面
          }
     }	
     
}
```

另外，所谓“打开页面”或“关闭页面”沿用了浏览网页的叫法，对于App而言，页面的真实名称是“活动”— Activity。打开某个页面其实是启动某个活动，所以有startActivity方法却无openActivity方法；关闭某个 页面其实是结束某个活动，所以有finish方法却无close方法。


### Activity的生命周期

App引入活动的概念而非传统的页面概念，这是有原因的，单从字面意思理解，页面更像是静态的，而 活动更像是动态的。犹如花开花落那般，活动也有从含苞待放到盛开再到凋零的生命过程。每次创建新 的活动页面，自动生成的Java代码都给出了onCreate方法，该方法用于执行活动创建的相关操作，包括 加载XML布局、设置文本视图的初始文字、注册按钮控件的点击监听，等等。onCreate方法所代表的创建动作，正是一个活动最开始的行为，除了onCreate，活动还有其他几种生命周期行为，它们对应的方 法说明如下：

- onCreate：创建活动。此时会把页面布局加载进内存，进入了初始状态。 
- onStart：开启活动。此时会把活动页面显示在屏幕上，进入了就绪状态。 
- onResume：恢复活动。此时活动页面进入活跃状态，能够与用户正常交互，例如允许响应用户的 点击动作、允许用户输入文字等。onPause：暂停活动。此时活动页面进入暂停状态（也就是退回就绪状态），无法与用户正常交互。
- onStop：停止活动。此时活动页面将不在屏幕上显示。 onDestroy：销毁活动。此时回收活动占用的系统资源，把页面从内存中清除掉。
- onRestart：重启活动。处于停止状态的活动，若想重新开启的话，无须经历onCreate的重复创建 过程，而是走onRestart的重启过程。 onNewIntent：重用已有的活动实例。 

上述的生命周期方法，涉及复杂的App运行状态，更直观的活动状态切换过程如图4-2所示。

![image-20230731103344600](/androidImages/image-20230731103344600.png)

> 如果一个Activity已经启动过，并且存在当前应用的Activity任务栈中，启动模式为singleTask， singleInstance或singleTop(此时已在任务栈顶端)，那么在此启动或回到这个Activity的时候，不 会创建新的实例，也就是不会执行onCreate方法，而是执行onNewIntent方法。


### Activity的启动模式

上一小节提到，从第一个活动跳到第二个活动，接着结束第二个活动就能返回第一个活动，可是为什么 不直接返回桌面呢？这要从Android的内核设计说起了，系统给每个正在运行的App都分配了活动栈，栈 里面容纳着已经创建且尚未销毁的活动信息。鉴于栈是一种先进后出、后进先出的数据结构，故而后面 入栈的活动总是先出栈，假设3个活动的入栈顺序为：活动A→活动B→活动C，则它们的出栈顺序将变 为：活动C→活动B→活动A，可见活动C结束之后会返回活动B，而不是返回活动A或者别的地方。

假定某个App分配到的活动栈大小为3，该App先后打开两个活动，此时活动栈的变动情况如图4-7所 示。

![image-20230731103459518](/androidImages/image-20230731103459518.png)

然后按下返回键，依次结束已打开的两个活动，此时活动栈的变动情况如图4-8所示。

![image-20230731103522857](/androidImages/image-20230731103522857.png)

结合图4-7与图4-8的入栈与出栈流程，即可验证结束活动之时的返回逻辑了。

不过前述的出入栈情况仅是默认的标准模式，实际上Android允许在创建活动时指定该活动的启动模 式，通过启动模式控制活动的出入栈行为。App提供了两种办法用于设置活动页面的启动模式，其一是 修改AndroidManifest.xml，在指定的activity节点添加属性android:launchMode，表示本活动以哪个 启动模式运行。其二是在代码中调用Intent对象的setFlags方法，表明后续打开的活动页面采用该启动标 志。下面分别予以详细说明。

**1．在配置文件中指定启动模式**

打开AndroidManifest.xml，给activity节点添加属性android:launchMode，属性值填入standard表示 采取标准模式，当然不添加属性的话默认就是标准模式。具体的activity节点配置内容示例如下：

```xml
<activity android:name=".JumpFirstActivity" android:launchMode="standard" />
```

其中launchMode属性的几种取值说明见表4-1。

![image-20230731103635723](/androidImages/image-20230731103635723.png)

接下来举两个例子阐述启动模式的实际应用：在两个活动之间交替跳转、登录成功后不再返回登录页 面，分别介绍如下。

**1．在两个活动之间交替跳转**

假设活动A有个按钮，点击该按钮会跳到活动B；同时活动B也有个按钮，点击按钮会跳到活动A；从首页 打开活动A之后，就点击按钮在活动A与活动B之间轮流跳转。此时活动页面的跳转流程为：首页→活动 A→活动B→活动A→活动B→活动A→活动B→……多次跳转之后想回到首页，正常的话返回流程是这样 的：……→活动B→活动A→活动B→活动A→活动B→活动A→首页，注意每个箭头都代表按一次返回键， 可见要按下许多次返回键才能返回首页。其实在活动A和活动B之间本不应该重复返回，因为回来回去总 是这两个页面有什么意义呢？照理说每个活动返回一次足矣，同一个地方返回两次已经是多余的了，再 返回应当回到首页才是。也就是说，不管过去的时候怎么跳转，回来的时候应该按照这个流程：……→活 动B→活动A→首页，或者按照这个流程：……→活动A→活动B→首页，总之已经返回了的页面，决不再 返回第二次。

对于不允许重复返回的情况，可以设置启动标志FLAG_ACTIVITY_CLEAR_TOP，即使活动栈里面存在待 跳转的活动实例，也会重新创建该活动的实例，并清除原实例上方的所有实例，保证栈中最多只有该活 动的唯一实例，从而避免了无谓的重复返回。于是活动A内部的跳转代码就改成了下面这般：

```java
// 创建一个意图对象，准备跳到指定的活动页面
Intent intent = new Intent(this, JumpSecondActivity.class);
// 当栈中存在待跳转的活动实例时，则重新创建该活动的实例，并清除原实例上方的所有实例
intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP); // 设置启动标志
startActivity(intent); // 跳转到意图对象指定的活动页面
```

当然活动B内部的跳转代码也要设置同样的启动标志：

```java
// 创建一个意图对象，准备跳到指定的活动页面
Intent intent = new Intent(this, JumpFirstActivity.class);
// 当栈中存在待跳转的活动实例时，则重新创建该活动的实例，并清除原实例上方的所有实例
intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP); // 设置启动标志
startActivity(intent); // 跳转到意图指定的活动页面
```

这下两个活动的跳转代码都设置了FLAG_ACTIVITY_CLEAR_TOP，运行测试App发现多次跳转之后，每个 活动仅会返回一次而已。

**2．登录成功后不再返回登录页面**

很多App第一次打开都要求用户登录，登录成功再进入App首页，如果这时按下返回键，发现并没有回 到上一个登录页面，而是直接退出App了，这又是什么缘故呢？原来用户登录成功后，App便记下用户 的登录信息，接下来默认该用户是登录状态，自然不必重新输入用户名和密码了。既然默认用户已经登 录，哪里还需要回到登录页面？不光登录页面，登录之前的其他页面包括获取验证码、找回密码等页面 都不应回去，每次登录成功之后，整个App就焕然一新仿佛忘记了有登录页面这回事。

对于回不去的登录页面情况，可以设置启动标志FLAG_ACTIVITY_CLEAR_TASK，该标志会清空当前活动 栈里的所有实例。不过全部清空之后，意味着当前栈没法用了，必须另外找个活动栈才行，也就是同时 设置启动标志FLAG_ACTIVITY_NEW_TASK，该标志用于开辟新任务的活动栈。于是离开登录页面的跳转 代码变成下面这样：

```java
// 创建一个意图对象，准备跳到指定的活动页面
Intent intent = new Intent(this, LoginSuccessActivity.class);
// 设置启动标志：跳转到新页面时，栈中的原有实例都被清空，同时开辟新任务的活动栈
intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
startActivity(intent); // 跳转到意图指定的活动页面
```

运行测试App，登录成功进入首页之后，点击返回键果然没回到登录页面。

##### 默认启动模式 standard

该模式可以被设定，不在 manifest 设定时候，Activity 的默认模式就是 standard。在该模式下，启动 的 Activity 会依照启动顺序被依次压入 Task 栈中：

![image-20230731104003392](/androidImages/image-20230731104003392.png)



##### 栈顶复用模式 singleTop

在该模式下，如果栈顶 Activity 为我们要新建的 Activity（目标Activity），那么就不会重复创建新的 Activity。

![image-20230731104033356](/androidImages/image-20230731104033356.png)

**应用场景**

适合开启渠道多、多应用开启调用的 Activity，通过这种设置可以避免已经创建过的 Activity 被重复创 建，多数通过动态设置使用。

##### 栈内复用模式 singleTask

与 singleTop 模式相似，只不过 singleTop 模式是只是针对栈顶的元素，而 singleTask 模式下，如果 task 栈内存在目标 Activity 实例，则将 task 内的对应 Activity 实例之上的所有 Activity 弹出栈，并将对 应 Activity 置于栈顶，获得焦点。

![image-20230731104127736](/androidImages/image-20230731104127736.png)

**应用场景**

**程序主界面：**我们肯定不希望主界面被创建多次，而且在主界面退出的时候退出整个 App 是最好的效 果。

**耗费系统资源的Activity：**对于那些及其耗费系统资源的 Activity，我们可以考虑将其设为 singleTask 模式，减少资源耗费。

##### 全局唯一模式 singleInstance

在该模式下，我们会为目标 Activity 创建一个新的 Task 栈，将目标 Activity 放入新的 Task，并让目标 Activity获得焦点。新的 Task 有且只有这一个 Activity 实例。 如果已经创建过目标 Activity 实例，则 不会创建新的 Task，而是将以前创建过的 Activity 唤醒。

![image-20230731104227099](/androidImages/image-20230731104227099.png)

看一个示例，Activity3 设置为singleInstance，Activity1 和 Activity2 默认（standard），下图程序流程 中，黄色的代表 Background 的Task，蓝色的代表 Foreground 的Task。返回时会先把 Foreground 的 Task 中的 Activity 弹出，直到 Task 销毁，然后才将 Background的 Task 唤到前台，所以最后将 Activity3 销毁之后，会直接退出应用。

![image-20230731104305632](/androidImages/image-20230731104305632.png)



##### 动态设置启动模式

在上述所有情况，都是我们在Manifest中通过 launchMode 属性设置的，这个被称为静态设置，动态设 置是通过 Java 代码设置的。 

通过 Intent 动态设置 Activity启动模式

```java
intent.setFlags();
```

如果同时有动态和静态设置，那么动态的优先级更高。接下来我们来看一下如何动态的设置 Activity 启 动模式。

###### FLAG_ACTIVITY_NEW_TASK 

对应 Flag

```java
Intent.FLAG_ACTIVITY_NEW_TASK
```

此 Flag 跟 singleInstance 很相似，在给目标 Activity 设立此 Flag 后，会根据目标 Activity 的 affinity 进 行匹配，如果已经存在与其affinity 相同的 task，则将目标 Activity 压入此 Task。反之没有的话，则新 建一个 task，新建的 task 的 affinity 值与目标 Activity 相同，然后将目标 Activity 压入此栈。

但它与 singleInstance 有不同的点，两点需要注意的地方：

- 新的 Task 没有说只能存放一个目标 Activity，只是说决定是否新建一个 Task，而 singleInstance 模式下新的 Task 只能放置一个目标 Activity。 

- 在同一应用下，如果 Activity 都是默认的 affinity，那么此 Flag 无效，而 singleInstance 默认情况 也会创建新的 Task。

  

###### FLAG_ACTIVITY_SINGLE_TOP

该模式比较简单，对应Flag如下：

```java
Intent.FLAG_ACTIVITY_SINGLE_TOP
```

此 Flag 与静态设置中的 singleTop 效果相同



###### FLAG_ACTIVITY_CLEAR_TOP

这个模式对应的Flag如下：

```java
Intent.FLAG_ACTIVITY_CLEAR_TOP
```

当设置此 Flag 时，目标 Activity 会检查 Task 中是否存在此实例，如果没有则添加压入栈。如果有，就 将位于 Task 中的对应 Activity 其上的所有 Activity 弹出栈，此时有以下两种情况：

- 如果同时设置 Flag_ACTIVITY_SINGLE_TOP ，则直接使用栈内的对应 Activity。 

  ```java
  intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP |
  Intent.FLAG_ACTIVITY_SINGLE_TOP)
  ```

- 没有设置，则将栈内的对应 Activity 销毁重新创建。

按位或运算符 

运算规则：0|0=0 0|1=1 1|0=1 1|1=1 

总结：参加运算的两个对象只要有一个为1，其值为1。 

例如：3|5即 0000 0011| 0000 0101 = 0000 0111，因此，3|5的值得7

<div style="page-break-after: always;"></div>

## 在活动之间传递消息

如何在两个活动之间传递各类消息，首先描述Intent的用途和组成部分，以及显式Intent和隐式 Intent的区别；接着阐述结合Intent和Bundle向下一个活动页面发送数据，再在下一个页面中解析收到 的请求数据；然后叙述从下一个活动页面返回应答数据给上一个页面，并由上一个页面解析返回的应答 数据。

<div style="page-break-after: always;"></div>

### 显式Intent和隐式Intent

上一小节的Java代码，通过Intent对象设置活动的启动标志，这个Intent究竟是什么呢？Intent的中文名 是意图，意思是我想让你干什么，简单地说，就是传递消息。Intent是各个组件之间信息沟通的桥梁， 既能在Activity之间沟通，又能在Activity与Service之间沟通，也能在Activity与Broadcast之间沟通。总 而言之，Intent用于Android各组件之间的通信，它主要完成下列3部分工作：

1. 标明本次通信请求从哪里来、到哪里去、要怎么走。
2. 发起方携带本次通信需要的数据内容，接收方从收到的意图中解析数据。
3. 发起方若想判断接收方的处理结果，意图就要负责让接收方传回应答的数据内容。

为了做好以上工作，就要给意图配上必需的装备，Intent的组成部分见表4-3。

![image-20230731105032550](/androidImages/image-20230731105032550.png)

指定意图对象的目标有两种表达方式，一种是显式Intent，另一种是隐式Intent。

**1．显式Intent，直接指定来源活动与目标活动，属于精确匹配**

在构建一个意图对象时，需要指定两个参数，第一个参数表示跳转的来源页面，即“来源Activity.this”； 第二个参数表示待跳转的页面，即“目标Activity.class”。具体的意图构建方式有如下3种：

（1）在Intent的构造函数中指定，示例代码如下：

```java
Intent intent = new Intent(this, ActNextActivity.class); // 创建一个目标确定的意图
```

（2）调用意图对象的setClass方法指定，示例代码如下：

```java
Intent intent = new Intent(); // 创建一个新意图
intent.setClass(this, ActNextActivity.class); // 设置意图要跳转的目标活动
```

（3）调用意图对象的setComponent方法指定，示例代码如下：

```java
Intent intent = new Intent(); // 创建一个新意图
// 创建包含目标活动在内的组件名称对象
ComponentName component = new ComponentName(this, ActNextActivity.class);
intent.setComponent(component); // 设置意图携带的组件信息
```

<div style="page-break-after: always;"></div>

**2．隐式Intent，没有明确指定要跳转的目标活动，只给出一个动作字符串让系统自动匹配，属于模糊匹配**

通常App不希望向外部暴露活动名称，只给出一个事先定义好的标记串，这样大家约定俗成、按图索骥 就好，隐式Intent便起到了标记过滤作用。这个动作名称标记串，可以是自己定义的动作，也可以是已 有的系统动作。常见系统动作的取值说明见表4-4。

![image-20230731105243583](/androidImages/image-20230731105243583.png)

动作名称既可以通过setAction方法指定，也可以通过构造函数Intent(String action)直接生成意图对象。 当然，由于动作是模糊匹配，因此有时需要更详细的路径，比如仅知道某人住在天通苑小区，并不能直 接找到他家，还得说明他住在天通苑的哪一期、哪栋楼、哪一层、哪一个单元。Uri和Category便是这样 的路径与门类信息，Uri数据可通过构造函数Intent(String action, Uri uri)在生成对象时一起指定，也可 通过setData方法指定（setData这个名字有歧义，实际相当于setUri）；Category可通过addCategory 方法指定，之所以用add而不用set方法，是因为一个意图允许设置多个Category，方便一起过滤。

下面是一个调用系统拨号程序的代码例子，其中就用到了Uri：

```java
String phoneNo = "12345";
Intent intent = new Intent(); // 创建一个新意图
intent.setAction(Intent.ACTION_DIAL); // 设置意图动作为准备拨号
Uri uri = Uri.parse("tel:" + phoneNo); // 声明一个拨号的Uri
intent.setData(uri); // 设置意图前往的路径
startActivity(intent); // 启动意图通往的活动页面
```

隐式Intent还用到了过滤器的概念，把不符合匹配条件的过滤掉，剩下符合条件的按照优先顺序调用。 譬如创建一个App模块，AndroidManifest.xml里的intent-filter就是配置文件中的过滤器。像最常见的 首页活动MainAcitivity，它的activity节点下面便设置了action和category的过滤条件。其中 android.intent.action.MAIN表示App的入口动作，而android.intent.category.LAUNCHER表示在桌面 上显示App图标，配置样例如下：

```xml
<activity android:name=".MainActivity">
     <intent-filter>
          <action android:name="android.intent.action.MAIN" />
          <category android:name="android.intent.category.LAUNCHER" />
     </intent-filter>
</activity>
```


### 向下一个Activity发送数据

上一小节提到，Intent对象的setData方法只指定到达目标的路径，并非本次通信所携带的参数信息，真 正的参数信息存放在Extras中。Intent重载了很多种putExtra方法传递各种类型的参数，包括整型、双 精度型、字符串等基本数据类型，甚至Serializable这样的序列化结构。只是调用putExtra方法显然不好 管理，像送快递一样大小包裹随便扔，不但找起来不方便，丢了也难以知道。所以Android引入了 Bundle概念，可以把Bundle理解为超市的寄包柜或快递收件柜，大小包裹由Bundle统一存取，方便又 安全。

Bundle内部用于存放消息的数据结构是Map映射，既可添加或删除元素，还可判断元素是否存在。开发 者若要把Bundle数据全部打包好，只需调用一次意图对象的putExtras方法；若要把Bundle数据全部取 出来，也只需调用一次意图对象的getExtras方法。Bundle对象操作各类型数据的读写方法说明见表4- 5。

![image-20230731105422722](/androidImages/image-20230731105422722.png)

接下来举个在活动之间传递数据的例子，首先在上一个活动使用包裹封装好数据，把包裹塞给意图对 象，再调用startActivity方法跳到意图指定的目标活动。完整的活动跳转代码示例如下：

```java
// 创建一个意图对象，准备跳到指定的活动页面
Intent intent = new Intent(this, ActReceiveActivity.class);
Bundle bundle = new Bundle(); // 创建一个新包裹
// 往包裹存入名为request_time的字符串
bundle.putString("request_time", DateUtil.getNowTime());
// 往包裹存入名为request_content的字符串
bundle.putString("request_content", tv_send.getText().toString());
intent.putExtras(bundle); // 把快递包裹塞给意图
startActivity(intent); // 跳转到意图指定的活动页面
```

然后在下一个活动中获取意图携带的快递包裹，从包裹取出各参数信息，并将传来的数据显示到文本视 图。下面便是目标活动获取并展示包裹数据的代码例子：

```java
// 从布局文件中获取名为tv_receive的文本视图
TextView tv_receive = findViewById(R.id.tv_receive);
// 从上一个页面传来的意图中获取快递包裹
Bundle bundle = getIntent().getExtras();
// 从包裹中取出名为request_time的字符串
String request_time = bundle.getString("request_time");
// 从包裹中取出名为request_content的字符串
String request_content = bundle.getString("request_content");
String desc = String.format("收到请求消息：\n请求时间为%s\n请求内容为%s",
request_time, request_content);
tv_receive.setText(desc); // 把请求消息的详情显示在文本视图上
```

代码编写完毕，运行测试App，打开上一个页面如图4-9所示。单击页面上的发送按钮跳到下一个页面如 图4-10所示，根据展示文本可知正确获得了传来的数据。

![image-20230731105523189](/androidImages/image-20230731105523189.png)

![image-20230731105534577](/androidImages/image-20230731105534577.png)


### 向上一个Activity返回数据

数据传递经常是相互的，上一个页面不但把请求数据发送到下一个页面，有时候还要处理下一个页面的 应答数据，所谓应答发生在下一个页面返回到上一个页面之际。如果只把请求数据发送到下一个页面， 上一个页面调用startActivity方法即可；如果还要处理下一个页面的应答数据，此时就得分多步处理，详 细步骤说明如下：

步骤一，上一个页面打包好请求数据，调用startActivityForResult方法执行跳转动作，表示需要处理下 一个页面的应答数据，该方法的第二个参数表示请求代码，它用于标识每个跳转的唯一性。跳转代码示 例如下：

```java
String request = "你吃饭了吗？来我家吃吧";
// 创建一个意图对象，准备跳到指定的活动页面
Intent intent = new Intent(this, ActResponseActivity.class);
Bundle bundle = new Bundle(); // 创建一个新包裹
// 往包裹存入名为request_time的字符串
bundle.putString("request_time", DateUtil.getNowTime());
// 往包裹存入名为request_content的字符串
bundle.putString("request_content", request);
intent.putExtras(bundle); // 把快递包裹塞给意图
// 期望接收下个页面的返回数据。第二个参数为本次请求代码
startActivityForResult(intent, 0);
```

步骤二，下一个页面接收并解析请求数据，进行相应处理。接收代码示例如下：

```java
// 从上一个页面传来的意图中获取快递包裹
Bundle bundle = getIntent().getExtras();
// 从包裹中取出名为request_time的字符串
String request_time = bundle.getString("request_time");
// 从包裹中取出名为request_content的字符串
String request_content = bundle.getString("request_content");
String desc = String.format("收到请求消息：\n请求时间为%s\n请求内容为%s",
request_time, request_content);
tv_request.setText(desc); // 把请求消息的详情显示在文本视图上
```

步骤三，下一个页面在返回上一个页面时，打包应答数据并调用setResult方法返回数据包裹。setResult 方法的第一个参数表示应答代码（成功还是失败），第二个参数为携带包裹的意图对象。返回代码示例如下：

```java
String response = "我吃过了，还是你来我家吃";
Intent intent = new Intent(); // 创建一个新意图
Bundle bundle = new Bundle(); // 创建一个新包裹
// 往包裹存入名为response_time的字符串
bundle.putString("response_time", DateUtil.getNowTime());
// 往包裹存入名为response_content的字符串
bundle.putString("response_content", response);
intent.putExtras(bundle); // 把快递包裹塞给意图
// 携带意图返回上一个页面。RESULT_OK表示处理成功
setResult(Activity.RESULT_OK, intent);
finish(); // 结束当前的活动页面
```

步骤四，上一个页面重写方法onActivityResult，该方法的输入参数包含请求代码和结果代码，其中请求 代码用于判断这次返回对应哪个跳转，结果代码用于判断下一个页面是否处理成功。如果下一个页面处 理成功，再对返回数据解包操作，处理返回数据的代码示例如下：


```java
// 从下一个页面携带参数返回当前页面时触发。其中requestCode为请求代码，
// resultCode为结果代码，intent为下一个页面返回的意图对象
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent intent){ // 接收返回数据
     
     super.onActivityResult(requestCode, resultCode, intent);
     // 意图非空，且请求代码为之前传的0，结果代码也为成功
     if (intent!=null && requestCode==0 && resultCode== Activity.RESULT_OK) {
          
          Bundle bundle = intent.getExtras(); // 从返回的意图中获取快递包裹
          // 从包裹中取出名叫response_time的字符串
          String response_time = bundle.getString("response_time");
          // 从包裹中取出名叫response_content的字符串
          String response_content = bundle.getString("response_content");
          String desc = String.format("收到返回消息：\n应答时间为：%s\n应答内容为：%s",
          response_time, response_content);
          tv_response.setText(desc); // 把返回消息的详情显示在文本视图上
          
     }
     
}
```

结合上述的活动消息交互步骤，运行测试App打开第一个活动页面如图4-11所示。

![image-20230731105905358](/androidImages/image-20230731105905358.png)

点击传送按钮跳到第二个活动页面如图4-12所示，可见第二个页面收到了请求数据。然后点击第二个页 面的返回按钮，回到第一个页面如图4-13所示，可见第一个页面成功收到了第二个页面的应答数据。

![image-20230731105927542](/androidImages/image-20230731105927542.png)

![image-20230731105938064](/androidImages/image-20230731105938064.png)



## 为活动补充附加信息

如何在意图之外给活动添加额外的信息，首先可以把字符串参数放到字符串资源文件中，待 App运行之时再从资源文件读取字符串值；接着还能在AndroidManifest.xml中给指定活动配置专门的 元数据，App运行时即可获取对应活动的元数据信息；然后利用元数据的resource属性配置更复杂的 XML定义，从而为App注册在长按桌面之时弹出的快捷菜单。


### 利用资源文件配置字符串

利用Bundle固然能在页面跳转的时候传送数据，但这仅限于在代码中传递参数，如果要求临时修改某个 参数的数值，就得去改Java代码。然而直接修改Java代码有两个弊端：

1. 代码文件那么多，每个文件又有许多行代码，一下子还真不容易找到修改的地方。
2. 每次改动代码都得重新编译，让Android Studio编译的功夫也稍微费点时间。

有鉴于此，对于可能手工变动的参数，通常把参数名称与参数值的对应关系写入配置文件，由程序在运 行时读取配置文件，这样只需修改配置文件就能改变对应数据了。res\values目录下面的strings.xml就 用来配置字符串形式的参数，打开该文件，发现里面已经存在名为app_name的字符串参数，它配置的 是当前模块的应用名称。现在可于app_name下方补充一行参数配置，参数名称叫作“weather_str”，参 数值则为“晴天”，具体的配置内容如下所示：

```xml
<string name="weather_str">晴天</string>
```

接着打开活动页面的Java代码，调用getString方法即可根据“R.string.参数名称”获得指定参数的字符串 值。获取代码示例如下：

```java
// 显示字符串资源
private void showStringResource() {
     String value = getString(R.string.weather_str); // 从strings.xml获取名叫weather_str的字符串值
     tv_resource.setText("来自字符串资源：今天的天气是"+value); // 在文本视图上显示文字
}
```

上面的getString方法来自于Context类，由于页面所在的活动类AppCompatActivity追根溯源来自 Context这个抽象类，因此凡是活动页面代码都能直接调用getString方法。

然后在onCreate方法中调用showStringResource方法，运行测试App，打开读取页面如图4-14所示， 可见从资源文件成功读到了字符串。

![image-20230731212501246](/androidImages/image-20230731212501246.png)


### 利用元数据传递配置信息

尽管资源文件能够配置字符串参数，然而有时候为安全起见，某个参数要给某个活动专用，并不希望其 他活动也能获取该参数，此时就不方便到处使用getString了。好在Activity提供了元数据（Metadata） 的概念，元数据是一种描述其他数据的数据，它相当于描述固定活动的参数信息。打开 AndroidManifest.xml，在测试活动的activity节点内部添加meta-data标签，通过属性name指定元数据 的名称，通过属性value指定元数据的值。仍以天气为例，添加meta-data标签之后的activity节点如下所 示：

```xml
<activity android:name=".MetaDataActivity">
	<meta-data android:name="weather" android:value="晴天" />
</activity>
```

元数据的value属性既可直接填字符串，也可引用strings.xml已定义的字符串资源，引用格式形如 “@string/字符串的资源名称”。下面便是采取引用方式的activity节点配置：

```xml
<activity android:name=".MetaDataActivity">
     <meta-data
          android:name="weather"
          android:value="@string/weather_str" />
</activity>
```

配置好了activity节点的meta-data标签，再回到Java代码获取元数据信息，获取步骤分为下列3步：

- 调用getPackageManager方法获得当前应用的包管理器。 
- 调用包管理器的getActivityInfo方法获得当前活动的信息对象。 
- 活动信息对象的metaData是Bundle包裹类型，调用包裹对象的getString即可获得指定名称的参数值。

把上述3个步骤串起来，得到以下的元数据获取代码：

```java
// 显示配置的元数据
private void showMetaData() {
     try {
          PackageManager pm = getPackageManager(); // 获取应用包管理器
          // 从应用包管理器中获取当前的活动信息
          ActivityInfo act = pm.getActivityInfo(getComponentName(),
          PackageManager.GET_META_DATA);
          Bundle bundle = act.metaData; // 获取活动附加的元数据信息
          String value = bundle.getString("weather"); // 从包裹中取出名叫weather的字符串
     	tv_meta.setText("来自元数据信息：今天的天气是"+value); // 在文本视图上显示文字
     } catch (Exception e) {
     	e.printStackTrace();
     }
}
```

然后在onCreate方法中调用showMetaData方法，重新运行App观察到的界面如图4-15所示，可见成功 获得AndroidManifest.xml配置的元数据。

![image-20230731212737189](/androidImages/image-20230731212737189.png)

### 给应用页面注册快捷方式

元数据不单单能传递简单的字符串参数，还能传送更复杂的资源数据，从Android 7.1开始新增的快捷方 式便用到了这点，譬如在手机桌面上长按支付宝图标，会弹出如图4-16所示的快捷菜单。

![image-20230731212813324](/androidImages/image-20230731212813324.png)

​																					图4-16　支付宝的快捷菜单

点击菜单项“扫一扫”，直接打开支付宝的扫码页面；点击菜单项“付钱”，直接打开支付宝的付款页面；点 击菜单项“收钱”，直接打开支付宝的收款页面。如此不必打开支付宝首页，即可迅速跳转到常用的App页 面，这便是所谓的快捷方式。



那么Android 7.1又是如何实现快捷方式的呢？那得再琢磨琢磨元数据了。原来元数据的meta-data标签 除了前面说到的name属性和value属性，还拥有resource属性，该属性可指定一个XML文件，表示元数 据想要的复杂信息保存于XML数据之中。借助元数据以及指定的XML配置，方可完成快捷方式功能，具 体的实现过程说明如下：

首先打开res/values目录下的strings.xml，在resources节点内部添加下述的3组（每组两个，共6个）字 符串配置，每组都代表一个菜单项，每组又分为长名称和短名称，平时优先展示长名称，当长名称放不 下时才展示短名称。这3组6个字符串的配置定义示例如下：

```xml
<string name="first_short">first</string>
<string name="first_long">启停活动</string>
<string name="second_short">second</string>
<string name="second_long">来回跳转</string>
<string name="third_short">third</string>
<string name="third_long">登录返回</string>
```

接着在res目录下创建名为xml的文件夹，并在该文件夹创建shortcuts.xml，这个XML文件用来保存3组 菜单项的快捷方式定义，文件内容如下所示：


```xml
<shortcuts xmlns:android="http://schemas.android.com/apk/res/android">
	<shortcut
          android:shortcutId="first"
          android:enabled="true"
          android:icon="@mipmap/ic_launcher"
          android:shortcutShortLabel="@string/first_short"
          android:shortcutLongLabel="@string/first_long">
          
          <!-- targetClass指定了点击该项菜单后要打开哪个活动页面 -->
          <intent
               android:action="android.intent.action.VIEW"
               android:targetPackage="com.example.chapter04"
               android:targetClass="com.example.chapter04.ActStartActivity" />
               
          <categories android:name="android.shortcut.conversation"/>
          
          </shortcut>
          
          <shortcut
               android:shortcutId="second"
               android:enabled="true"
               android:icon="@mipmap/ic_launcher"
               android:shortcutShortLabel="@string/second_short"
               android:shortcutLongLabel="@string/second_long">
               
          <!-- targetClass指定了点击该项菜单后要打开哪个活动页面 -->
          <intent
               android:action="android.intent.action.VIEW"
               android:targetPackage="com.example.chapter04"
               android:targetClass="com.example.chapter04.JumpFirstActivity" />
               
         <categories android:name="android.shortcut.conversation"/>
               
	</shortcut>
	<shortcut
     	android:shortcutId="third"
          android:enabled="true"
          android:icon="@mipmap/ic_launcher"
          android:shortcutShortLabel="@string/third_short"
          android:shortcutLongLabel="@string/third_long">
          
               <!-- targetClass指定了点击该项菜单后要打开哪个活动页面 -->
               <intent
                    android:action="android.intent.action.VIEW"
                    android:targetPackage="com.example.chapter04"
                    android:targetClass="com.example.chapter04.LoginInputActivity" />
          
          	<categories android:name="android.shortcut.conversation"/>
          
     </shortcut>
</shortcuts>
```

由上述的XML例子中看到，每个shortcut节点都代表了一个菜单项，该节点的各属性说明如下：

- shortcutId：快捷方式的编号。 
- enabled：是否启用快捷方式。true表示启用，false表示禁用。
- icon：快捷菜单左侧的图标。 
- shortcutShortLabel：快捷菜单的短标签。 
- shortcutLongLabel：快捷菜单的长标签。优先展示长标签的文本，长标签放不下时才展示短标签 的文本。

以上的节点属性仅仅指明了每项菜单的基本规格，点击菜单项之后的跳转动作还要由shortcut内部的 intent节点定义，该节点主要有targetPackage与targetClass两个属性需要修改，其中targetPackage属 性固定为当前App的包名，而targetClass属性描述了菜单项对应的活动类完整路径。

然后打开AndroidManifest.xml，找到MainActivity所在的activity节点，在该节点内部补充如下的元数 据配置，其中name属性为android.app.shortcuts，而resource属性为@xml/shortcuts：

```xml
<meta-data android:name="android.app.shortcuts"android:resource="@xml/shortcuts"/>
```

这行元数据的作用，是告诉App首页有个快捷方式菜单，其资源内容参见位于xml目录下的 shortcuts.xml。完整的activity节点配置示例如下：

```xml
<activity android:name=".MainActivity">

     <intent-filter>
          <action android:name="android.intent.action.MAIN" />
          <category android:name="android.intent.category.LAUNCHER" />
     </intent-filter>
     
     <!-- 指定快捷方式。在桌面上长按应用图标，就会弹出@xml/shortcuts所描述的快捷菜单 -->
     <meta-data
          android:name="android.app.shortcuts"
          android:resource="@xml/shortcuts" />
     
</activity>
```


然后把测试应用安装到手机上，回到桌面长按应用图标，此时图标下方弹出如图4-17所示的快捷菜单列 表。

![image-20230731213307806](/androidImages/image-20230731213307806.png)



点击其中一个菜单项，果然跳到了配置的活动页面，证明元数据成功实现了类似支付宝的快捷方式。


## 小结

本章主要介绍了活动组件—Activity的常见用法，包括：正确启停活动页面（Activity的启动和结束、 Activity的生命周期、Activity的启动模式）、在活动之间传递消息（显式Intent和隐式Intent、向下一个 Activity发送数据、向上一个Activity返回数据）、为活动补充附加信息（利用资源文件配置字符串、利 用元数据传递配置信息、给应用页面注册快捷方式）。 通过本章的学习，我们应该能掌握以下3种开发技能：

1. 理解活动的生命周期过程，并学会正确启动和结束活动。 
2. 理解意图的组成结构，并利用意图在活动之间传递消息。 
3. 理解元数据的概念，并通过元数据配置参数信息和注册快捷菜单。