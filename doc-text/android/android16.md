

# 第9章　广播组件Broadcast

本章介绍Android4大组件之一Broadcast的基本概念和常见用法。主要包括如何发送和接收应用自身的 广播、如何监听和处理设备发出来的系统广播、如何监听因为屏幕变更导致App界面改变的状态事件。


## 9.1　收发应用广播

本节介绍应用广播的几种收发形式，包括如何收发标准广播、如何收发有序广播、如何收发静态广播等。


### 9.1.1　收发标准广播

App在运行的时候有各种各样的数据流转，有的数据从上一个页面流向下一个页面，此时可通过意图在 活动之间传递包裹；有的数据从应用内存流向存储卡，此时可进行文件读写操作。还有的数据流向千奇 百怪，比如活动页面向碎片传递数据，按照“8.4.2　碎片的动态注册”小节的描述，尚可调用 setArguments和getArguments方法存取参数；然而若是由碎片向活动页面传递数据，就没有类似 setResult这样回馈结果的方法了。

随着App工程的代码量日益增长，承载数据流通的管道会越发不够用，好比装修房子的时候，给每个房 间都预留了网线插口，只有插上网线才能上网。可是现在联网设备越来越多，除了电脑之外，电视也要 联网，平板也要联网，乃至空调都要联网，如此一来网口早就不够用了。那怎样解决众多设备的联网问 题呢？原来家家户户都配了无线路由器，路由器向四周发射WiFi信号，各设备只要安装了无线网卡，就 能接收WiFi信号从而连接上网。于是“发射器+接收器”的模式另辟蹊径，比起网线这种固定管道要灵活得 多，无须拉线即可随时随地传输数据。

Android的广播机制正是借鉴了WiFi的通信原理，不必搭建专门的通路，就能在发送方与接收方之间建立连接。同时广播（Broadcast）也是Android的四大组件之一，它用于Android各组件之间的灵活通信，与活动的区别在于：

1. 活动只能一对一通信；而广播可以一对多，一人发送广播，多人接收处理。
2. 对于发送方来说，广播不需要考虑接收方有没有在工作，接收方在工作就接收广播，不在工作就丢 弃广播
3. 对于接收方来说，因为可能会收到各式各样的广播，所以接收方要自行过滤符合条件的广播，之后 再解包处理

与广播有关的方法主要有以下3个。

- sendBroadcast：发送广播。 
- registerReceiver：注册广播的接收器，可在onStart或onResume方法中注册接收器。
- unregisterReceiver：注销广播的接收器，可在onStop或onPause方法中注销接收器。

具体到编码实现上，广播的收发过程可分为3个步骤：发送标准广播、定义广播接收器、开关广播接收 器，分别说明如下。


1. 发送标准广播

   广播的发送操作很简单，一共只有两步：先创建意图对象，再调用sendBroadcast方法发送广播即可。 不过要注意，意图对象需要指定广播的动作名称，如同每个路由器都得给自己的WiFi起个名称一般，这 样接收方才能根据动作名称判断来的是李逵而不是李鬼。下面是通过点击按钮发送广播的活动页面代码：

   ```java
   public class BroadStandardActivity extends AppCompatActivity implements
   View.OnClickListener {
        private final static String TAG = "BroadStandardActivity";
        // 这是广播的动作名称，发送广播和接收广播都以它作为接头暗号
        private final static String STANDARD_ACTION =
        "com.example.chapter09.standard";
        private TextView tv_standard; // 声明一个文本视图对象
        private String mDesc = "这里查看标准广播的收听信息";
        
        @Override
        protected void onCreate(Bundle savedInstanceState) {
             super.onCreate(savedInstanceState);
             setContentView(R.layout.activity_broad_standard);
             tv_standard = findViewById(R.id.tv_standard);
             tv_standard.setText(mDesc);
             findViewById(R.id.btn_send_standard).setOnClickListener(this);
        }
        
        @Override
        public void onClick(View v) {
             if (v.getId() == R.id.btn_send_standard) {
                  Intent intent = new Intent(STANDARD_ACTION); // 创建指定动作的意图
                  sendBroadcast(intent); // 发送标准广播
             }
        }
   }
   ```


2. 定义广播接收器

   广播发出来之后，还得有设备去接收广播，也就是需要广播接收器。接收器主要规定两个事情，一个是 接收什么样的广播，另一个是收到广播以后要做什么。由于接收器的处理逻辑大同小异，因此Android 提供了抽象之后的接收器基类BroadcastReceiver，开发者自定义的接收器都从BroadcastReceiver派生 而来。新定义的接收器需要重写onReceive方法，方法内部先判断当前广播是否符合待接收的广播名称，校验通过再开展后续的业务逻辑。下面是广播接收器的一个定义代码例子：

   ```java
   // 定义一个标准广播的接收器
   private class StandardReceiver extends BroadcastReceiver {
        // 一旦接收到标准广播，马上触发接收器的onReceive方法
        @Override
        public void onReceive(Context context, Intent intent) {
             // 广播意图非空，且接头暗号正确
             if (intent != null && intent.getAction().equals(STANDARD_ACTION)) {
                  mDesc = String.format("%s\n%s 收到一个标准广播", mDesc,
                  DateUtil.getNowTime());
                  tv_standard.setText(mDesc);
        	}
        }
   }
   
   ```


3. 开关广播接收器

   为了避免资源浪费，还要求合理使用接收器。就像WiFi上网，需要上网时才打开WiFi，不需要上网时就 关闭WiFi。广播接收器也是如此，活动页面启动之后才注册接收器，活动页面停止之际就注销接收器。 在注册接收器的时候，允许事先指定只接收某种类型的广播，即通过意图过滤器挑选动作名称一致的广播。接收器的注册与注销代码示例如下：

   ```java
   	private StandardReceiver standardReceiver; // 声明一个标准广播的接收器实例
        @Override
        protected void onStart() {
             super.onStart();
             standardReceiver = new StandardReceiver(); // 创建一个标准广播的接收器
             // 创建一个意图过滤器，只处理STANDARD_ACTION的广播
             IntentFilter filter = new IntentFilter(STANDARD_ACTION);
             registerReceiver(standardReceiver, filter); // 注册接收器，注册之后才能正常接收广播
        }
        @Override
        protected void onStop() {
             super.onStop();
             unregisterReceiver(standardReceiver); // 注销接收器，注销之后就不再接收广播
        }
   ```

   <div style="page-break-after: always;"></div>

完成上述3个步骤后，便构建了广播从发送到接收的完整流程。运行测试App，初始的广播界面如图9-1 所示，点击发送按钮触发广播，界面下方立刻刷新广播日志，如图9-2所示，可见接收器正确收到广播并 成功打印日志。

<img src="/androidImages/image-20230901185743417.png" alt="image-20230901185743417" style="zoom:80%;" />

<img src="/androidImages/image-20230901185753702.png" alt="image-20230901185753702" style="zoom:80%;" />


### 9.1.2　收发有序广播

由于广播没指定唯一的接收者，因此可能存在多个接收器，每个接收器都拥有自己的处理逻辑。这种机 制固然灵活，却不够严谨，因为不同接收器之间也许有矛盾。

比如只要办了借书证，大家都能借阅图书馆的藏书，不过一本书被读者甲借出去之后，读者乙就不能再 借这本书了，必须等到读者甲归还了该书之后，读者乙方可继续借阅此书。这个借书场景体现了一种有 序性，即图书是轮流借阅着的，且同时刻仅能借给一位读者，只有前面的读者借完归还，才轮到后面的 读者借阅。另外，读者甲一定会归还此书吗？可能读者甲对该书爱不释手，从图书馆高价买断了这本 书；也可能读者甲粗心大意，不小心弄丢了这本书。不管是哪种情况，读者甲都无法还书，导致正在排 队的读者乙无书可借。这种借不到书的场景体现了一种依赖关系，即使读者乙迫不及待地想借到书，也 得看读者甲的心情，要是读者甲因为各种理由没能还书，那么读者乙就白白排队了。上述的借书业务对 应到广播的接收功能，则要求实现下列的处理逻辑：

1. 一个广播存在多个接收器，这些接收器需要排队收听广播，这意味着该广播是条有序广播。
2. 先收到广播的接收器A，既可以让其他接收器继续收听广播，也可以中断广播不让其他接收器收听。


至于如何实现有序广播的收发，则需完成以下的3个编码步骤：

1. 发送广播时要注明这是个有序广播

   之前发送标准广播用到了sendBroadcast方法，可是该方法发出来的广播是无序的。只有调用 sendOrderedBroadcast方法才能发送有序广播，具体的发送代码示例如下：

   ```java
   Intent intent = new Intent(ORDER_ACTION); // 创建一个指定动作的意图
   sendOrderedBroadcast(intent, null); // 发送有序广播
   ```

2. 定义有序广播的接收器

   接收器的定义代码基本不变，也要从BroadcastReceiver继承而来，唯一的区别是有序广播的接收器允 许中断广播。倘若在接收器的内部代码调用abortBroadcast方法，就会中断有序广播，使得后面的接收 器不能再接收该广播。下面是有序广播的两个接收器代码例子：

   ```java
   private OrderAReceiver orderAReceiver; // 声明有序广播接收器A的实例
        // 定义一个有序广播的接收器A
        private class OrderAReceiver extends BroadcastReceiver {
             // 一旦接收到有序广播，马上触发接收器的onReceive方法
             @Override
             public void onReceive(Context context, Intent intent) {
             	if (intent != null && intent.getAction().equals(ORDER_ACTION)) {
             		String desc = String.format("%s%s 接收器A收到一个有序广播\n",
   					tv_order.getText().toString(),
                       DateUtil.getNowTime());
                       tv_order.setText(desc);
                       if (ck_abort.isChecked()) {
                       abortBroadcast(); // 中断广播，此时后面的接收器无法收到该广播
   			}
   		}
   	}
   }
   private OrderBReceiver orderBReceiver; // 声明有序广播接收器B的实例
        // 定义一个有序广播的接收器B
        private class OrderBReceiver extends BroadcastReceiver {
             // 一旦接收到有序广播B，马上触发接收器的onReceive方法
             @Override
             public void onReceive(Context context, Intent intent) {
                  if (intent != null && intent.getAction().equals(ORDER_ACTION)) {
                       String desc = String.format("%s%s 接收器B收到一个有序广播\n",
                       tv_order.getText().toString(),
                       DateUtil.getNowTime());
                       tv_order.setText(desc);
                       if (ck_abort.isChecked()) {
                       abortBroadcast(); // 中断广播，此时后面的接收器无法收到该广播
                  }
        	}
        }
   }
   ```

3. 注册有序广播的多个接收器

   接收器的注册操作同样调用registerReceiver方法，为了给接收器排队，还需调用意图过滤器的 setPriority方法设置优先级，优先级越大的接收器，越先收到有序广播。如果不设置优先级，或者两个 接收器的优先级相等，那么越早注册的接收器，会越先收到有序广播。譬如以下的广播注册代码，尽管 接收器A更早注册，但接收器B的优先级更高，结果先收到广播的应当是接收器B。

   ```java
   orderAReceiver = new OrderAReceiver(); // 创建一个有序广播的接收器A
   // 创建一个意图过滤器A，只处理ORDER_ACTION的广播
   IntentFilter filterA = new IntentFilter(ORDER_ACTION);
   filterA.setPriority(8); // 设置过滤器A的优先级，数值越大优先级越高
   registerReceiver(orderAReceiver, filterA); // 注册接收器A，注册之后才能正常接收广播
   orderBReceiver = new OrderBReceiver(); // 创建一个有序广播的接收器B
   // 创建一个意图过滤器A，只处理ORDER_ACTION的广播
   IntentFilter filterB = new IntentFilter(ORDER_ACTION);
   filterB.setPriority(10); // 设置过滤器B的优先级，数值越大优先级越高
   registerReceiver(orderBReceiver, filterB); // 注册接收器B，注册之后才能正常接收广播
   ```

   接下来通过测试页面演示有序广播的收发，如果没要求中断广播，则有序广播的接收界面如图9-3所示， 此时接收器B和接收器A依次收到了广播；如果要求中断广播，则有序广播的接收界面如图9-4所示，此 时只有接收器B收到了广播。


![image-20230903112546975](/androidImages/image-20230903112546975.png)


### 9.1.3　收发静态广播

前面几节使用广播之时，无一例外在代码中注册接收器。可是同为4大组件，活动（activity）、服务 （service）、内容提供器（provider）都能在AndroidManifest.xml注册，为啥广播只能在代码中注册 呢？其实广播接收器也能在AndroidManifest.xml注册，并且注册时候的节点名为receiver，一旦接收器 在AndroidManifest.xml注册，就无须在代码中注册了。

在AndroidManifest.xml中注册接收器，该方式被称作静态注册；而在代码中注册接收器，该方式被称 作动态注册。之所以罕见静态注册，是因为静态注册容易导致安全问题，故而Android 8.0之后废弃了大 多数静态注册。话虽如此，Android倒也没有彻底禁止静态注册，只要满足特定的编码条件，那么依然 能够通过静态方式注册接收器。具体注册步骤说明如下。

首先右击当前模块的默认包，依次选择右键菜单的New→Package，创建名为receiver的新包，用于存 放静态注册的接收器代码。

其次右击刚创建的receiver包，依次选择右键菜单的New→Other→Broadcast Receiver，弹出如图9-5 所示的组件创建对话框。

<img src="/androidImages/image-20230903112654211.png" alt="image-20230903112654211" style="zoom:80%;" />

在组件创建对话框的Class Name一栏填写接收器的类名，比如ShockReceiver，再单击对话框右下角的 Finish按钮。之后Android Studio自动在receiver包内创建代码文件ShockReceiver.java，且接收器的默认代码如下所示：

```java
public class ShockReceiver extends BroadcastReceiver {
     @Override
     public void onReceive(Context context, Intent intent) {
     }
}
```

同时AndroidManifest.xml自动添加接收器的节点配置，默认的receiver配置如下所示：

```xml
<receiver
     android:name=".receiver.ShockReceiver"
     android:enabled="true"
     android:exported="true"></receiver>
```

然而自动生成的接收器不仅啥都没干，还丢出一个异常UnsupportedOperationException。明显这个接 收器没法用，为了感知到接收器正在工作，可以考虑在onReceive方法中记录日志，也可在该方法中震 动手机。因为ShockReceiver未依附于任何活动，自然无法直接操作界面控件，所以只能观察程序日 志，或者干脆让手机摇晃起来。实现手机震动之时，要调用getSystemService方法，先从系统服务 VIBRATOR_SERVICE获取震动管理器Vibrator，再调用震动管理器的vibrate方法震动手机。包含手机震动功能的接收器代码示例如下：


```java
public class ShockReceiver extends BroadcastReceiver {
     private static final String TAG = "ShockReceiver";
     // 静态注册时候的action、发送广播时的action、接收广播时的action，三者需要保持一致
     public static final String SHOCK_ACTION = "com.example.chapter09.shock";
          @Override
          public void onReceive(Context context, Intent intent) {
          Log.d(TAG, "onReceive");
          if (intent.getAction().equals(ShockReceiver.SHOCK_ACTION)){
               // 从系统服务中获取震动管理器
               Vibrator vb = (Vibrator)
               context.getSystemService(Context.VIBRATOR_SERVICE);
               vb.vibrate(500); // 命令震动器吱吱个若干秒，这里的500表示500毫秒
          }
     }
}
```

由于震动手机需要申请对应的权限，因此打开AndroidManifest.xml添加以下的权限申请配置：

```xml
<!-- 震动 -->
<uses-permission android:name="android.permission.VIBRATE" />
```

此外，接收器代码定义了一个动作名称，其值为“com.example.chapter09.shock”，表示onReceive方 法只处理过滤该动作之后的广播，从而提高接收效率。除了在代码中过滤之外，还能修改 AndroidManifest.xml，在receiver节点内部增加intent-filter标签加以过滤，添加过滤配置后的receiver 节点信息如下所示：

```xml
<receiver
     android:name=".receiver.ShockReceiver"
     android:enabled="true"
     android:exported="true">
     <intent-filter>
     	<action android:name="com.example.chapter09.shock" />
     </intent-filter>
 </receiver>
```

终于到了发送广播这步，由于Android 8.0之后删除了大部分静态注册，防止App退出后仍在收听广播， 因此为了让应用能够继续接收静态广播，需要给静态广播指定包名，也就是调用意图对象的 setComponent方法设置组件路径。详细的静态广播发送代码示例如下：

```java
String receiverPath = "com.example.chapter09.receiver.ShockReceiver";
Intent intent = new Intent(ShockReceiver.SHOCK_ACTION); // 创建一个指定动作的意图
// 发送静态广播之时，需要通过setComponent方法指定接收器的完整路径
ComponentName componentName = new ComponentName(this, receiverPath);
intent.setComponent(componentName); // 设置意图的组件信息
sendBroadcast(intent); // 发送静态广播
```

经过上述的编码以及配置工作，总算完成了静态广播的发送与接收流程。特别注意，经过整改的静态注 册只适用于接收App自身的广播，不能接收系统广播，也不能接收其他应用的广播。

运行测试App，初始的广播发送界面如图9-6所示，点击发送按钮触发静态广播，接着接收器收到广播信 息，手机随之震动了若干时间，说明静态注册的接收器奏效了。


![image-20230903113018562](/androidImages/image-20230903113018562.png)


## 9.2　监听系统广播


### 9.2.1　接收分钟到达广播

除了应用自身的广播，系统也会发出各式各样的广播，通过监听这些系统广播，App能够得知周围环境 发生了什么变化，从而按照最新环境调整运行逻辑。分钟到达广播便是系统广播之一，每当时钟到达某 分零秒，也就是跳到新的分钟时刻，系统就通过全局大喇叭播报分钟广播。App只要在运行时侦听分钟 广播Intent.ACTION_TIME_TICK，即可在分钟切换之际收到广播信息。

由于分钟广播属于系统广播，发送操作已经交给系统了，因此若要侦听分钟广播，App只需实现该广播 的接收操作。具体到编码上，接收分钟广播可分解为下面3个步骤：

步骤一，定义一个分钟广播的接收器，并重写接收器的onReceive方法，补充收到广播之后的处理逻 辑。

步骤二，重写活动页面的onStart方法，添加广播接收器的注册代码，注意要让接收器过滤分钟到达广播 Intent.ACTION_TIME_TICK。

步骤三，重写活动页面的onStop方法，添加广播接收器的注销代码。

根据上述逻辑编写活动代码，使之监听系统发来的分钟广播，下面是演示页面的活动代码例子：


```java
public class SystemMinuteActivity extends AppCompatActivity {
     private TextView tv_minute; // 声明一个文本视图对象
     private String desc = "开始侦听分钟广播，请稍等。注意要保持屏幕亮着，才能正常收到广播";
     @Override
     protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_system_minute);
          tv_minute = findViewById(R.id.tv_minute);
          tv_minute.setText(desc);
     }
     @Override
     protected void onStart() {
          super.onStart();
          timeReceiver = new TimeReceiver(); // 创建一个分钟变更的广播接收器
          // 创建一个意图过滤器，只处理系统分钟变化的广播
          IntentFilter filter = new IntentFilter(Intent.ACTION_TIME_TICK);
          registerReceiver(timeReceiver, filter); // 注册接收器，注册之后才能正常接收广播
     }
     @Override
     protected void onStop() {
          super.onStop();
          unregisterReceiver(timeReceiver); // 注销接收器，注销之后就不再接收广播
     }
     private TimeReceiver timeReceiver; // 声明一个分钟广播的接收器实例
     // 定义一个分钟广播的接收器
     private class TimeReceiver extends BroadcastReceiver {
          // 一旦接收到分钟变更的广播，马上触发接收器的onReceive方法
          @Override
          public void onReceive(Context context, Intent intent) {
               if (intent != null) {
                    desc = String.format("%s\n%s 收到一个分钟到达广播%s", desc,
                    DateUtil.getNowTime(), intent.getAction());
                    tv_minute.setText(desc);
               }
          }
	}
}
```


运行测试App，初始界面如图9-7所示，稍等片刻直到下一分钟到来，界面马上多了广播日志，如图9-8 所示，可见此时准点收到了系统发出的分钟到达广播。

<img src="/androidImages/image-20230903113314928.png" alt="image-20230903113314928" style="zoom:80%;" />


### 9.2.2　接收网络变更广播

除了分钟广播，网络变更广播也很常见，因为手机可能使用WiFi上网，也可能使用数据连接上网，而后 者会产生流量费用，所以手机浏览器都提供了“智能无图”的功能，连上WiFi网络时才显示网页上的图 片，没连上WiFi就不显示图片。这类业务场景就要求侦听网络变更广播，对于当前网络变成WiFi连接、 变成数据连接的两种情况，需要分别判断并加以处理。

接收网络变更广播可分解为下面3个步骤：

步骤一，定义一个网络广播的接收器，并重写接收器的onReceive方法，补充收到广播之后的处理逻 辑。

步骤二，重写活动页面的onStart方法，添加广播接收器的注册代码，注意要让接收器过滤网络变更广播 android.net.conn.CONNECTIVITY_CHANGE。

步骤三，重写活动页面的onStop方法，添加广播接收器的注销代码。

上述3个步骤中，尤为注意第一步骤，因为onReceive方法只表示收到了网络广播，至于变成哪种网络， 还得把广播消息解包才知道是怎么回事。网络广播携带的包裹中有个名为networkInfo的对象，其数据 类型为NetworkInfo，于是调用NetworkInfo对象的相关方法，即可获取详细的网络信息。下面是 NetworkInfo的常用方法说明：

- getType：获取网络类型。网络类型的取值说明见表9-1。

  <img src="/androidImages/image-20230903113435115.png" alt="image-20230903113435115" style="zoom:80%;" />

- getTypeName：获取网络类型的名称。

- getSubtype：获取网络子类型。当网络类型为数据连接时，子类型为2G/3G/4G的细分类型，如 CDMA、EVDO、HSDPA、LTE等。网络子类型的取值说明见表9-2。


​						表9-2　网络子类型的取值说明

<img src="/androidImages/image-20230903113537221.png" alt="image-20230903113537221" style="zoom:80%;" />

- getSubtypeName：获取网络子类型的名称。 
- getState：获取网络状态。网络状态的取值说明见表9-3。

​					表9-3　网络状态的取值说明

<img src="/androidImages/image-20230903113613297.png" alt="image-20230903113613297" style="zoom:80%;" />


根据梳理后的解包逻辑编写活动代码，使之监听系统发来的网络变更广播，下面是演示页面的代码片段：

```java
@Override
protected void onStart() {
     super.onStart();
     networkReceiver = new NetworkReceiver(); // 创建一个网络变更的广播接收器
     // 创建一个意图过滤器，只处理网络状态变化的广播
     IntentFilter filter = new
     IntentFilter("android.net.conn.CONNECTIVITY_CHANGE");
     registerReceiver(networkReceiver, filter); // 注册接收器，注册之后才能正常接收广播
}
@Override
protected void onStop() {
     super.onStop();
     unregisterReceiver(networkReceiver); // 注销接收器，注销之后就不再接收广播
}
```

```java
private NetworkReceiver networkReceiver; // 声明一个网络变更的广播接收器实例
// 定义一个网络变更的广播接收器
private class NetworkReceiver extends BroadcastReceiver {
     // 一旦接收到网络变更的广播，马上触发接收器的onReceive方法
     @Override
     public void onReceive(Context context, Intent intent) {
          if (intent != null) {
               NetworkInfo networkInfo = intent.getParcelableExtra("networkInfo");
               String networkClass =
               NetworkUtil.getNetworkClass(networkInfo.getSubtype());
               desc = String.format("%s\n%s 收到一个网络变更广播，网络大类为%s，" +
               "网络小类为%s，网络制式为%s，网络状态为%s",
               desc, DateUtil.getNowTime(),
               networkInfo.getTypeName(),
               networkInfo.getSubtypeName(), networkClass,
               networkInfo.getState().toString());
               tv_network.setText(desc);
     	}
     }
}
```

运行测试App，初始界面如图9-9所示，说明手机正在使用数据连接。然后关闭数据连接，再开启 WLAN，此时界面日志如图9-10所示，可见App果然收到了网络广播，并且正确从广播信息中得知已经 切换到了WiFi网络。

<img src="/androidImages/image-20230903113819442.png" alt="image-20230903113819442" style="zoom:80%;" />

<img src="/androidImages/image-20230903113847666.png" alt="image-20230903113847666" style="zoom:80%;" />


### 9.2.3　定时管理器AlarmManager

尽管系统的分钟广播能够实现定时功能（每分钟一次），但是这种定时功能太低级了，既不能定制可长 可短的时间间隔，也不能限制定时广播的次数。为此Android提供了专门的定时管理器 AlarmManager，它利用系统闹钟定时发送广播，比分钟广播拥有更强大的功能。由于闹钟与震动器同 属系统服务，且闹钟的服务名称为ALARM_SERVICE，因此依然调用getSystemService方法获取闹钟管 理器的实例，下面是从系统服务中获取闹钟管理器的代码：

```java
// 从系统服务中获取闹钟管理器
AlarmManager alarmMgr = (AlarmManager) getSystemService(ALARM_SERVICE);
```

得到闹钟实例后，即可调用它的各种方法设置闹钟规则了，AlarmManager的常见方法说明如下：

- set：设置一次性定时器。第一个参数为定时器类型，通常填AlarmManager.RTC_WAKEUP；第二 个参数为期望的执行时刻（单位为毫秒）；第三个参数为待执行的延迟意图（PendingIntent类型）。 
- setAndAllowWhileIdle：设置一次性定时器，参数说明同set方法，不同之处在于：即使设备处于 空闲状态，也会保证执行定时器。因为从Android 6.0开始，set方法在暗屏时不保证发送广播，必 须调用setAndAllowWhileIdle方法才能保证发送广播。 
- setRepeating：设置重复定时器。第一个参数为定时器类型；第二个参数为首次执行时间（单位为 毫秒）；第三个参数为下次执行的间隔时间（单位为毫秒）；第四个参数为待执行的延迟意图 （PendingIntent类型）。然而从Android 4.4开始，setRepeating方法不保证按时发送广播，只能 通过setAndAllowWhileIdle方法间接实现重复定时功能。 
- cancel：取消指定延迟意图的定时器。

以上的方法说明出现了新名词—延迟意图，它是PendingIntent类型，顾名思义，延迟意图不是马上执行 的意图，而是延迟若干时间才执行的意图。像之前的活动页面跳转，调用startActivity方法跳到下个页 面，此时跳转动作是立刻发生的，所以要传入Intent对象。由于定时器的广播不是立刻发送的，而是时 刻到达了才发送广播，因此不能传Intent对象只能传PendingIntent对象。当然意图与延迟意图不止一处区别，它们的差异主要有下列3点：

1. PendingIntent代表延迟的意图，它指向的组件不会马上激活；而Intent代表实时的意图，一旦被 启动，它指向的组件就会马上激活。
2. PendingIntent是一类消息的组合，不但包含目标的Intent对象，还包含请求代码、请求方式等信 息。
3. PendingIntent对象在创建之时便已知晓将要用于活动还是广播，例如调用getActivity方法得到的 是活动跳转的延迟意图，调用getBroadcast方法得到的是广播发送的延迟意图。


就闹钟广播的收发过程而言，需要实现3个编码步骤：定义定时器的广播接收器、开关定时器的广播接收 器、设置定时器的播报规则，分别叙述如下。

1. 定义定时器的广播接收器

   闹钟广播的接收器采用动态注册方式，它的实现途径与标准广播类似，都要从BroadcastReceiver派生 新的接收器，并重写onReceive方法。闹钟广播接收器的定义代码示例如下：

   ```java
   // 声明一个闹钟广播事件的标识串
   private String ALARM_ACTION = "com.example.chapter09.alarm";
   private String mDesc = ""; // 闹钟时间到达的描述
   // 定义一个闹钟广播的接收器
   public class AlarmReceiver extends BroadcastReceiver {
        // 一旦接收到闹钟时间到达的广播，马上触发接收器的onReceive方法
        @Override
        public void onReceive(Context context, Intent intent) {
             if (intent != null) {
                  mDesc = String.format("%s\n%s 闹钟时间到达", mDesc,
                  DateUtil.getNowTime());
                  tv_alarm.setText(mDesc);
                  // 从系统服务中获取震动管理器
                  Vibrator vb = (Vibrator)
                  context.getSystemService(Context.VIBRATOR_SERVICE);
                  vb.vibrate(500); // 命令震动器吱吱个若干秒
             }
        }
   }
   ```

2. 开关定时器的广播接收器

   定时接收器的开关流程参照标准广播，可以在活动页面的onStart方法中注册接收器，在活动页面的 onStop方法中注销接收器。相应的接收器开关代码如下所示：

   ```java
   private AlarmReceiver alarmReceiver; // 声明一个闹钟的广播接收器
   @Override
   public void onStart() {
        super.onStart();
        alarmReceiver = new AlarmReceiver(); // 创建一个闹钟的广播接收器
        // 创建一个意图过滤器，只处理指定事件来源的广播
        IntentFilter filter = new IntentFilter(ALARM_ACTION);
        registerReceiver(alarmReceiver, filter); // 注册接收器，注册之后才能正常接收广播
   }
   @Override
   public void onStop() {
        super.onStop();
        unregisterReceiver(alarmReceiver); // 注销接收器，注销之后就不再接收广播
   }
   ```


3. 设置定时器的播报规则

   首先从系统服务中获取闹钟管理器，然后调用管理器的set***方法，把事先创建的延迟意图填到播报规 则当中。下面是发送闹钟广播的代码例子：

   ```java
   // 发送闹钟广播
   private void sendAlarm() {
        Intent intent = new Intent(ALARM_ACTION); // 创建一个广播事件的意图
        // 创建一个用于广播的延迟意图
        PendingIntent pIntent = PendingIntent.getBroadcast(this, 0,
        intent,
        PendingIntent.FLAG_UPDATE_CURRENT);
        // 从系统服务中获取闹钟管理器
        AlarmManager alarmMgr = (AlarmManager) getSystemService(ALARM_SERVICE);
        long delayTime = System.currentTimeMillis() + mDelay*1000; // 给当前时间加上若干秒
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
             // 允许在空闲时发送广播，Android6.0之后新增的方法
             alarmMgr.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, delayTime,
             pIntent);
        } else {
             // 设置一次性闹钟，延迟若干秒后，携带延迟意图发送闹钟广播（但Android6.0之后，set方法
             在暗屏时不保证发送广播，必须调用setAndAllowWhileIdle方法）
             alarmMgr.set(AlarmManager.RTC_WAKEUP, delayTime, pIntent);
        }
   }
   ```


完成上述的3个步骤之后，运行测试App，点击“设置闹钟”按钮，界面下方回显闹钟的设置信息，如图9- 11所示。稍等片刻，发现回显文本多了一行日志，如图9-12所示，同时手机也嗡嗡震动了一会，对比日 志时间可知，闹钟广播果然在设定的时刻触发且收听了。

<img src="/androidImages/image-20230903114736452.png" alt="image-20230903114736452" style="zoom:80%;" />

<img src="/androidImages/image-20230903114759444.png" alt="image-20230903114759444" style="zoom:80%;" />

至于闹钟的重复播报问题，因为setRepeating方法不再可靠，所以要修改闹钟的收听逻辑，在 onReceive末尾补充调用sendAlarm方法，确保每次收到广播之后立即准备下一个广播。调整以后的 onReceive方法代码示例如下：

```java
public void onReceive(Context context, Intent intent) {
     if (intent != null) {
          if (ck_repeate.isChecked()) { // 需要重复闹钟广播
          	sendAlarm(); // 发送闹钟广播
          }
     }
}
```


## 9.3　捕获屏幕的变更事件

本节介绍几种屏幕变更事件的捕获办法，包括如何监听竖屏与横屏之间的切换事件、如何监听从App界 面回到桌面的事件、如何监听从App界面切换到任务列表的事件等。


### 9.3.1　竖屏与横屏切换

除了系统广播之外，App所处的环境也会影响运行，比如手机有竖屏与横屏两种模式，竖屏时水平方向 较短而垂直方向较长，横屏时水平方向较长而垂直方向较短。两种屏幕方向不但造成App界面的展示差 异，而且竖屏和横屏切换之际，甚至会打乱App的生命周期。

接下来做个实验观察屏幕方向切换给生命周期带来的影响，现有一个测试页面ActTestActivity.java，参 考第4章的“4.1.2 Activity的生命周期”，它的活动代码重写了主要的生命周期方法，在每个周期方法中都打印状态日志

运行测试App，初始的竖屏 界面如图9-13所示；接着旋转手机使之处于横屏，测试App也跟着转过来，此时横屏界面如图9-14所示。

<img src="/androidImages/image-20230903114953721.png" alt="image-20230903114953721" style="zoom:80%;" />

![image-20230903115013863](/androidImages/image-20230903115013863.png)


对比图9-13的竖屏界面和图9-14的横屏界面，发现二者打印的生命周期时间居然是不一样的，而且横屏 界面的日志时间全部在竖屏界面的日志时间后面，说明App从竖屏变为横屏的时候，整个活动页面又重 头创建了一遍。可是这个逻辑明显不对劲啊，从竖屏变为横屏，App界面就得重新加载；再从横屏变回 竖屏，App界面又得重新加载，如此反复重启页面，无疑非常浪费系统资源。

为了避免横竖屏切换时重新加载界面的情况，Android设计了一种配置变更机制，在指定的环境配置发 生变更之时，无须重启活动页面，只需执行特定的变更行为。该机制的编码过程分为两步：修改 AndroidManifest.xml、修改活动页面的Java代码，详细说明如下。

1. 修改AndroidManifest.xml

   首先创建新的活动页面ChangeDirectionActivity，再打开AndroidManifest.xml，看到该活动对应的节 点配置是下面这样的：

   ```xml
   <activity android:name=".ChangeDirectionActivity" />
   ```

   给这个activity节点增加android:configChanges属性，并将属性值设为 “orientation|screenLayout|screenSize”，修改后的节点配置如下所示：

   ```xml
   <activity
        android:name=".ChangeDirectionActivity"
        android:configChanges="orientation|screenLayout|screenSize" />
   ```

   新属性configChanges的意思是，在某些情况之下，配置项变更不用重启活动页面，只需调用 onConfigurationChanged方法重新设定显示方式。故而只要给该属性指定若干豁免情况，就能避免无 谓的页面重启操作了，配置变更豁免情况的取值说明见表9-4。

   ![image-20230903115143595](/androidImages/image-20230903115143595.png)


2. 修改活动页面的Java代码

   打开ChangeDirectionActivity的Java代码，重写活动的onConfigurationChanged方法，该方法的输入 参数为Configuration类型的配置对象，根据配置对象的orientation属性，即可判断屏幕的当前方向是竖 屏还是横屏，再补充对应的代码处理逻辑。下面是重写了onConfigurationChanged方法的活动代码例子：

   ```java
   public class ChangeDirectionActivity extends AppCompatActivity {
        private TextView tv_monitor; // 声明一个文本视图对象
        private String mDesc = ""; // 屏幕变更的描述说明
        @Override
        protected void onCreate(Bundle savedInstanceState) {
             super.onCreate(savedInstanceState);
             setContentView(R.layout.activity_change_direction);
             tv_monitor = findViewById(R.id.tv_monitor);
        }
        // 在配置项变更时触发。比如屏幕方向发生变更等等
        // 有的手机需要在系统的“设置→显示”菜单开启“自动旋转屏幕”，或者从顶部下拉，找到“自动旋转”图标并开启
        @Override
        public void onConfigurationChanged(Configuration newConfig) {
             super.onConfigurationChanged(newConfig);
             switch (newConfig.orientation) { // 判断当前的屏幕方向
                  case Configuration.ORIENTATION_PORTRAIT: // 切换到竖屏
                       mDesc = String.format("%s%s %s\n", mDesc,
                       DateUtil.getNowTime(), "当前屏幕为竖屏方向");
                       tv_monitor.setText(mDesc);
             	break;
                  case Configuration.ORIENTATION_LANDSCAPE: // 切换到横屏
                       mDesc = String.format("%s%s %s\n", mDesc,
                       DateUtil.getNowTime(), "当前屏幕为横屏方向");
                       tv_monitor.setText(mDesc);
                  break;
                  default:
                  	break;
             }
        }
   }
   ```


运行测试App，一开始手机处于竖屏界面，旋转手机使之切为横屏状态，此时App界面如图9-15所示， 可见App成功获知了变更后的屏幕方向。反向旋转手机使之切回竖屏状态，此时App界面如图9-16所 示，可见App同样监听到了最新的屏幕方向。

![image-20230903115503965](/androidImages/image-20230903115503965.png)

经过上述两个步骤的改造，每次横竖屏的切换操作都不再重启界面，只会执行 onConfigurationChanged方法的代码逻辑，从而节省了系统的资源开销。

如果希望App始终保持竖屏界面，即使手机旋转为横屏也不改变App的界面方向，可以修改 AndroidManifest.xml，给activity节点添加android:screenOrientation属性，并将该属性设置为 portrait表示垂直方向，也就是保持竖屏界面；若该属性为landscape则表示水平方向，也就是保持横屏 界面。修改后的activity节点示例如下：

```xml
<activity android:name=".ActTestActivity"
     android:screenOrientation="portrait"/>
```

### 9.3.2　回到桌面与切换到任务列表

App不但能监测手机屏幕的方向变更，还能获知回到桌面的事件，连打开任务列表的事件也能实时得 知。回到桌面与打开任务列表都由按键触发，例如按下主页键会回到桌面，按下任务键会打开任务列 表。虽然这两个操作看起来属于按键事件，但系统并未提供相应的按键处理方法，而是通过广播发出事件信息。

因此，若想知晓是否回到桌面，以及是否打开任务列表，均需收听系统广播 Intent.ACTION_CLOSE_SYSTEM_DIALOGS。至于如何区分当前广播究竟是回到桌面还是打开任务列 表，则要从广播意图中获取原因reason字段，该字段值为homekey时表示回到桌面，值为recentapps 时表示打开任务列表。接下来演示一下此类广播的接收过程。

首先定义一个广播接收器，只处理动作为Intent.ACTION_CLOSE_SYSTEM_DIALOGS的系统广播，并判 断它是主页键来源还是任务键来源。该接收器的代码定义示例如下：

```java
// 定义一个返回到桌面的广播接收器
private class DesktopRecevier extends BroadcastReceiver {
     // 在收到返回桌面广播时触发
     @Override
     public void onReceive(Context context, Intent intent) {
          if (intent.getAction().equals(Intent.ACTION_CLOSE_SYSTEM_DIALOGS)) {
               String reason = intent.getStringExtra("reason"); // 获取变更原因
               // 按下了主页键或者任务键
               if (!TextUtils.isEmpty(reason) && (reason.equals("homekey")
               	|| reason.equals("recentapps")))
               {
               	showChangeStatus(reason); // 显示变更的状态
               }
     	}
     }
}
```

接着在活动页面的onCreate方法中注册接收器，在onDestroy方法中注销接收器，其中接收器的注册代 码如下所示：

```java
private DesktopRecevier desktopRecevier; // 声明一个返回桌面的广播接收器对象
// 初始化桌面广播
private void initDesktopRecevier() {
     desktopRecevier = new DesktopRecevier(); // 创建一个返回桌面的广播接收器
     // 创建一个意图过滤器，只接收关闭系统对话框（即返回桌面）的广播
     IntentFilter intentFilter = new
     IntentFilter(Intent.ACTION_CLOSE_SYSTEM_DIALOGS);
     registerReceiver(desktopRecevier, intentFilter); // 注册接收器，注册之后才能正常接收广播
}
```

可是监听回到桌面的广播能用来干什么呢？一种用处是开启App的画中画模式，比如原先应用正在播放 视频，回到桌面时势必要暂停播放，有了画中画模式之后，可将播放界面缩小为屏幕上的一个小方块， 这样即使回到桌面也能继续观看视频。注意从Android 8.0开始才提供画中画模式，故而代码需要判断系 统版本，下面是进入画中画模式的代码例子：

```java
// 显示变更的状态
private void showChangeStatus(String reason) {
     mDesc = String.format("%s%s 按下了%s键\n", mDesc, DateUtil.getNowTime(),reason);
     tv_monitor.setText(mDesc);
     if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
     	&& !isInPictureInPictureMode()) { // 当前未开启画中画，则开启画中画模式
          // 创建画中画模式的参数构建器
          PictureInPictureParams.Builder builder = new
          PictureInPictureParams.Builder();
          // 设置宽高比例值，第一个参数表示分子，第二个参数表示分母
          // 下面的10/5=2，表示画中画窗口的宽度是高度的两倍
          Rational aspectRatio = new Rational(10,5);
          builder.setAspectRatio(aspectRatio); // 设置画中画窗口的宽高比例
          // 进入画中画模式，注意enterPictureInPictureMode是Android8.0之后新增的方法
          enterPictureInPictureMode(builder.build());
     }
}
```

以上代码用于开启画中画模式，但有时希望在进入画中画之际调整界面，则需重写活动的 onPictureInPictureModeChanged方法，该方法在应用进入画中画模式或退出画中画模式时触发，在此 可补充相应的处理逻辑。重写后的方法代码示例如下：

```java
// 在进入画中画模式或退出画中画模式时触发
@Override
public void onPictureInPictureModeChanged(boolean isInPicInPicMode,
Configuration newConfig) {
     Log.d(TAG, "onPictureInPictureModeChanged
     isInPicInPicMode="+isInPicInPicMode);
     super.onPictureInPictureModeChanged(isInPicInPicMode, newConfig);
     if (isInPicInPicMode) { // 进入画中画模式
     } else { // 退出画中画模式
     }
}
```

另外，画中画模式要求在AndroidManifest.xml中开启画中画支持，也就是给activity节点添加 supportsPictureInPicture属性并设为true，添加新属性之后的activity配置示例如下：

```xml
<activity
     android:name=".ReturnDesktopActivity"
     android:supportsPictureInPicture="true"
     android:theme="@style/AppCompatTheme" />
```

<div style="page-break-after: always;"></div>

运行测试App，正常的竖屏界面如图9-17所示。

<img src="/androidImages/image-20230903164740218.png" alt="image-20230903164740218" style="zoom:80%;" />

<img src="/androidImages/image-20230903164759751.png" alt="image-20230903164759751" style="zoom:80%;" />