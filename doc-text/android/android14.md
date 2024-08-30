

# 第7章　内容共享

本章介绍Android不同应用之间共享内容的具体方式，主要包括：如何利用内容组件在应用之间共享数 据，如何使用内容组件获取系统的通讯信息，如何借助文件提供器在应用之间共享文件等。


## 7.1　在应用之间共享数据

本节介绍Android 4大组件之一ContentProvider的基本概念和常见用法。首先说明如何使用内容提供器 封装内部数据的外部访问接口，接着阐述如何使用内容解析器通过外部接口操作内部数据。


### 7.1.1　通过ContentProvider封装数据

Android号称提供了4大组件，分别是活动Activity、广播Broadcast、服务Service和内容提供器 ContentProvider。其中内容提供器涵盖与内部数据存取有关的一系列组件，完整的内容组件由内容提 供器ContentProvider、内容解析器ContentResolver、内容观察器ContentObserver三部分组成。

ContentProvider给App存取内部数据提供了统一的外部接口，让不同的应用之间得以互相共享数据。像 上一章提到的SQLite可操作应用自身的内部数据库；上传和下载功能可操作后端服务器的文件；而 ContentProvider可操作当前设备其他应用的内部数据，它是一种中间层次的数据存储形式。

在实际编码中，ContentProvider只是服务端App存取数据的抽象类，开发者需要在其基础上实现一个完 整的内容提供器，并重写下列数据库管理方法。

- onCreate：创建数据库并获得数据库连接。 
- insert：插入数据。 
- delete：删除数据。 
- update：更新数据。 
- query：查询数据，并返回结果集的游标。 
- getType：获取内容提供器支持的数据类型。

这些方法看起来是不是很像SQLite？没错，ContentProvider作为中间接口，本身并不直接保存数据， 而是通过SQLiteOpenHelper与SQLiteDatabase间接操作底层的数据库。所以要想使用 ContentProvider，首先得实现SQLite的数据库帮助器，然后由ContentProvider封装对外的接口。以封 装用户信息为例，具体步骤主要分成以下3步。

**1．编写用户信息表的数据库帮助器**

这个数据库帮助器就是常规的SQLite操作代码，实现过程参见上一章的“6.2.3　数据库帮助器 SQLiteOpenHelper”

**2．编写内容提供器的基础字段类**

该类需要实现接口BaseColumns，同时加入几个常量定义。详细代码示例如下：

```java
public class UserInfoContent implements BaseColumns {
     // 这里的名称必须与AndroidManifest.xml里的android:authorities保持一致
     public static final String AUTHORITIES =
     "com.example.chapter07.provider.UserInfoProvider";
     // 内容提供器的外部表名
     public static final String TABLE_NAME = UserDBHelper.TABLE_NAME;
     // 访问内容提供器的URI
     public static final Uri CONTENT_URI = Uri.parse("content://" + AUTHORITIES +
     "/user");
     // 下面是该表的各个字段名称
     public static final String USER_NAME = "name";
     public static final String USER_AGE = "age";
     public static final String USER_HEIGHT = "height";
     public static final String USER_WEIGHT = "weight";
}
```

**3．通过右键菜单创建内容提供器**

右击App模块的包名目录，在弹出的右键菜单中依次选择New→Other→Content Provider，打开如图7- 1所示的组件创建对话框。


<img src="/androidImages/image-20230823162126159.png" alt="image-20230823162126159" style="zoom:80%;" />

在创建对话框的Class Name一栏填写内容提供器的名称，比如UserInfoProvider；在URI Authorities一 栏填写URI的授权串，比如“com.example.chapter07.provider.UserInfoProvider”；然后单击对话框右 下角的Finish按钮，完成提供器的创建操作。

上述创建过程会自动修改App模块的两处地方，一处是往AndroidManifest.xml添加内容提供器的注册 配置，配置信息示例如下：

```xml
<!-- provider的authorities属性值需要与Java代码的AUTHORITIES保持一致 -->
<provider
     android:name=".provider.UserInfoProvider"
     android:authorities="com.example.chapter07.provider.UserInfoProvider"
     android:enabled="true"
     android:exported="true" />
```

<div style="page-break-after: always;"></div>

另一处是在包名目录下生成名为UserInfoProvider.java的代码文件，打开一看发现该类继承了 ContentProvider，并且提示重写onCreate、insert、delete、query、update、getType等方法，以便 对数据进行增删改查等操作。这个提供器代码显然只有一个框架，还需补充详细的实现代码，为此重写 onCreate方法，在此获取用户信息表的数据库帮助器实例，其他insert、delete、query等方法也要加入 对应的数据库操作代码，修改之后的内容提供器代码如下所示：

```java
public class UserInfoProvider extends ContentProvider {
     private final static String TAG = "UserInfoProvider";
     private UserDBHelper userDB; // 声明一个用户数据库的帮助器对象
     public static final int USER_INFO = 1; // Uri匹配时的代号
     public static final UriMatcher uriMatcher = new UriMatcher(UriMatcher.NO_MATCH);
     
     static { // 往Uri匹配器中添加指定的数据路径
     	uriMatcher.addURI(UserInfoContent.AUTHORITIES, "/user", USER_INFO);
     }
     
     // 创建ContentProvider时调用，可在此获取具体的数据库帮助器实例
     @Override
     public boolean onCreate() {
          userDB = UserDBHelper.getInstance(getContext(), 1);
          return true;
     }
     
     // 插入数据
     @Override
     public Uri insert(Uri uri, ContentValues values) {
          if (uriMatcher.match(uri) == USER_INFO) { // 匹配到了用户信息表
          // 获取SQLite数据库的写连接
          SQLiteDatabase db = userDB.getWritableDatabase();
          // 向指定的表插入数据，返回记录的行号
          long rowId = db.insert(UserInfoContent.TABLE_NAME, null, values);
          if (rowId > 0) { // 判断插入是否执行成功
          // 如果添加成功，就利用新记录的行号生成新的地址
          Uri newUri =
          ContentUris.withAppendedId(UserInfoContent.CONTENT_URI, rowId);
          // 通知监听器，数据已经改变
          getContext().getContentResolver().notifyChange(newUri, null);
          }
          db.close(); // 关闭SQLite数据库连接
          }
          return uri;
     }
     
     // 根据指定条件删除数据
     @Override
     public int delete(Uri uri, String selection, String[] selectionArgs) {
          int count = 0;
          if (uriMatcher.match(uri) == USER_INFO) { // 匹配到了用户信息表
          // 获取SQLite数据库的写连接
          SQLiteDatabase db = userDB.getWritableDatabase();
          // 执行SQLite的删除操作，并返回删除记录的数目
          count = db.delete(UserInfoContent.TABLE_NAME, selection,
          selectionArgs);
          db.close(); // 关闭SQLite数据库连接
          }
          return count;
     }
     // 根据指定条件查询数据库
     @Override
     public Cursor query(Uri uri, String[] projection, String selection,
          String[] selectionArgs, String sortOrder) {
          Cursor cursor = null;
          if (uriMatcher.match(uri) == USER_INFO) { // 匹配到了用户信息表
          // 获取SQLite数据库的读连接
          SQLiteDatabase db = userDB.getReadableDatabase();
          // 执行SQLite的查询操作
          cursor = db.query(UserInfoContent.TABLE_NAME,
          projection, selection, selectionArgs, null, null,
          sortOrder);
          // 设置内容解析器的监听
          cursor.setNotificationUri(getContext().getContentResolver(), uri);
          }
          return cursor; // 返回查询结果集的游标
	}
     // 获取Uri支持的数据类型，暂未实现
     @Override
     public String getType(Uri uri) {
     	throw new UnsupportedOperationException("Not yet implemented");
     }
     
     // 更新数据，暂未实现
     @Override
     public int update(Uri uri, ContentValues values, String selection, String[]
     selectionArgs) {
     	throw new UnsupportedOperationException("Not yet implemented");
     }
}
```

经过以上3个步骤之后，便完成了服务端App的接口封装工作，接下来再由其他App去访问服务端App的数据。


### 7.1.2　通过ContentResolver访问数据

上一小节提到了利用ContentProvider封装服务端App的数据，如果客户端App想访问对方的内部数据， 就要借助内容解析器ContentResolver。内容解析器是客户端App操作服务端数据的工具，与之对应的内 容提供器则是服务端的数据接口。在活动代码中调用getContentResolver方法，即可获取内容解析器的实例。

ContentResolver提供的方法与ContentProvider一一对应，比如insert、delete、query、update、 getType等，甚至连方法的参数类型都雷同。以添加操作为例，针对前面UserInfoProvider提供的数据 接口，下面由内容解析器调用insert方法，使之往内容提供器插入一条用户信息，记录添加代码如下所示：

```java
// 添加一条用户记录
private void addUser(UserInfo user) {
     ContentValues name = new ContentValues();
     name.put("name", user.name);
     name.put("age", user.age);
     name.put("height", user.height);
     name.put("weight", user.weight);
     name.put("married", 0);
     name.put("update_time", DateUtil.getNowDateTime(""));
     // 通过内容解析器往指定Uri添加用户信息
     getContentResolver().insert(UserInfoContent.CONTENT_URI, name);
}
```

至于删除操作就更简单了，只要下面一行代码就删除了所有记录：

```java
getContentResolver().delete(UserInfoContent.CONTENT_URI, "1=1", null);
```

查询操作稍微复杂一些，调用query方法会返回游标对象，这个游标正是SQLite的游标Cursor，详细用 法参见上一章的“6.2.3　数据库帮助器SQLiteOpenHelper”。query方法的输入参数有好几个，具体说明如下（依参数顺序排列）。

- uri：Uri类型，指定本次操作的数据表路径。 
- projection：字符串数组类型，指定将要查询的字段名称列表。 
- selection：字符串类型，指定查询条件。 
- selectionArgs：字符串数组类型，指定查询条件中的参数取值列表。 
- sortOrder：字符串类型，指定排序条件。

下面是调用query方法从内容提供器查询所有用户信息的代码例子：

```java
// 显示所有的用户记录
private void showAllUser() {
     List<UserInfo> userList = new ArrayList<UserInfo>();
     
     // 通过内容解析器从指定Uri中获取用户记录的游标
     Cursor cursor = getContentResolver().query(UserInfoContent.CONTENT_URI,
     null, null, null, null);
     
     // 循环取出游标指向的每条用户记录
     while (cursor.moveToNext()) {
          UserInfo user = new UserInfo();
          user.name =
          cursor.getString(cursor.getColumnIndex(UserInfoContent.USER_NAME));
          user.age =
          cursor.getInt(cursor.getColumnIndex(UserInfoContent.USER_AGE));
          user.height =
          cursor.getInt(cursor.getColumnIndex(UserInfoContent.USER_HEIGHT));
          user.weight =
          cursor.getFloat(cursor.getColumnIndex(UserInfoContent.USER_WEIGHT));
          userList.add(user); // 添加到用户信息列表
     }
     
     cursor.close(); // 关闭数据库游标
     
     String contactCount = String.format("当前共找到%d个用户", userList.size());
     tv_desc.setText(contactCount);
     
     ll_list.removeAllViews(); // 移除线性布局下面的所有下级视图
     
     for (UserInfo user : userList) { // 遍历用户信息列表
          String contactDesc = String.format("姓名为%s，年龄为%d，身高为%d，体重为%f\n",
          user.name, user.age, user.height,
          user.weight);
          TextView tv_contact = new TextView(this); // 创建一个文本视图
          tv_contact.setText(contactDesc);
          tv_contact.setTextColor(Color.BLACK);
          tv_contact.setTextSize(17);
          int pad = Utils.dip2px(this, 5);
          tv_contact.setPadding(pad, pad, pad, pad); // 设置文本视图的内部间距
          ll_list.addView(tv_contact); // 把文本视图添加至线性布局
     }
}
```


接下来分别演示通过内容解析器添加和查询用户信息的过程，其中记录添加页面为 ContentWriteActivity.java，记录查询页面为ContentReadActivity.java。运行测试App，先打开记录添 加页面，输入用户信息后点击添加按钮，由内容解析器执行插入操作，此时添加界面如图7-2所示。接着 打开记录查询页面，内容解析器自动执行查询操作，并将查到的用户信息一一显示出来，此时查询界面 如图7-3所示。

<img src="/androidImages/image-20230823162713279.png" alt="image-20230823162713279" style="zoom:80%;" />

<img src="/androidImages/image-20230823162724148.png" alt="image-20230823162724148" style="zoom:80%;" />

对比添加页面和查询页面的用户信息，可知成功查到了新增的用户记录。


## 7.2　使用内容组件获取通讯信息

本节介绍了使用内容组件获取通讯信息的操作办法，包括：如何在App运行的时候动态申请权限（访问 通讯信息要求获得相应授权），如何利用内容解析器读写联系人信息，如何利用内容观察器监听收到的 短信内容等。


### 7.2.1　运行时动态申请权限

上一章的“公共存储空间与私有存储空间”提到，App若想访问存储卡的公共空间，就要在 AndroidManifest.xml里面添加下述的权限配置。

```xml
<!-- 存储卡读写 -->
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAG" />
```

然而即使App声明了完整的存储卡操作权限，从Android 7.0开始，系统仍然默认禁止该App访问公共空 间，必须到设置界面手动开启应用的存储卡权限才行。尽管此举是为用户隐私着想，可是人家咋知道要 手工开权限呢？就算用户知道，去设置界面找到权限开关也颇费周折。为此Android支持在Java代码中处 理权限，处理过程分为3个步骤，详述如下：

**1．检查App是否开启了指定权限**

权限检查需要调用ContextCompat的checkSelfPermission方法，该方法的第一个参数为活动实例，第 二个参数为待检查的权限名称，例如存储卡的写权限名为 Manifest.permission.WRITE_EXTERNAL_STORAGE。注意checkSelfPermission方法的返回值，当它为 PackageManager.PERMISSION_GRANTED时表示已经授权，否则就是未获授权。

**2．请求系统弹窗，以便用户选择是否开启权限**

一旦发现某个权限尚未开启，就得弹窗提示用户手工开启，这个弹窗不是开发者自己写的提醒对话框， 而是系统专门用于权限申请的对话框。调用ActivityCompat的requestPermissions方法，即可命令系统 自动弹出权限申请窗口，该方法的第一个参数为活动实例，第二个参数为待申请的权限名称数组，第三 个参数为本次操作的请求代码。

**3．判断用户的权限选择结果**

然而上面第二步的requestPermissions方法没有返回值，那怎么判断用户到底选了开启权限还是拒绝权 限呢？其实活动页面提供了权限选择的回调方法onRequestPermissionsResult，如果当前页面请求弹出 权限申请窗口，那么该页面的Java代码必须重写onRequestPermissionsResult方法，并在该方法内部处理用户的权限选择结果。

具体到编码实现上，前两步的权限校验和请求弹窗可以合并到一块，先调用checkSelfPermission方法检 查某个权限是否已经开启，如果没有开启再调用requestPermissions方法请求系统弹窗。合并之后的检 查方法代码示例如下，此处代码支持一次检查一个权限，也支持一次检查多个权限：

```java
// 检查某个权限。返回true表示已启用该权限，返回false表示未启用该权限
public static boolean checkPermission(Activity act, String permission, int
requestCode) {
	return checkPermission(act, new String[]{permission}, requestCode);
}
// 检查多个权限。返回true表示已完全启用权限，返回false表示未完全启用权限
public static boolean checkPermission(Activity act, String[] permissions, int
requestCode) {
     boolean result = true;
     if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
          int check = PackageManager.PERMISSION_GRANTED;
          // 通过权限数组检查是否都开启了这些权限
          for (String permission : permissions) {
         		check = ContextCompat.checkSelfPermission(act, permission);
          	if (check != PackageManager.PERMISSION_GRANTED) {
          		break; // 有个权限没有开启，就跳出循环
     		}
		}
          if (check != PackageManager.PERMISSION_GRANTED) {
               // 未开启该权限，则请求系统弹窗，好让用户选择是否立即开启权限
               ActivityCompat.requestPermissions(act, permissions, requestCode);
               result = false;
          }
	}
	return result;
}
```


注意到上面代码有判断安卓版本号，只有系统版本大于Android 6.0（版本代号为M），才执行后续的权 限校验操作。这是因为从Android 6.0开始引入了运行时权限机制，在Android 6.0之前，只要App在 AndroidManifest.xml中添加了权限配置，则系统会自动给App开启相关权限；但在Android 6.0之后， 即便事先添加了权限配置，系统也不会自动开启权限，而要开发者在App运行时判断权限的开关情况， 再据此动态申请未获授权的权限。

回到活动页面代码，一方面增加权限校验入口，比如点击某个按钮后触发权限检查操作，其中 Manifest.permission.WRITE_EXTERNAL_STORAGE表示存储卡权限，入口代码如下：

```java
if (v.getId() == R.id.btn_file_write) {
     if (PermissionUtil.checkPermission(this,
          Manifest.permission.WRITE_EXTERNAL_STORAGE, R.id.btn_file_write % 65536)) {
          startActivity(new Intent(this, FileWriteActivity.class));
     }
}
```

另一方面还要重写活动的onRequestPermissionsResult方法，在方法内部校验用户的选择结果，若用户 同意授权，就执行后续业务；若用户拒绝授权，只能提示用户无法开展后续业务了。重写后的方法代码 如下所示：

```java
@Override
public void onRequestPermissionsResult(int requestCode, String[] permissions,
int[] grantResults) {
     super.onRequestPermissionsResult(requestCode, permissions, grantResults);
     // requestCode不能为负数，也不能大于2的16次方即65536
     if (requestCode == R.id.btn_file_write % 65536) {
          if (PermissionUtil.checkGrant(grantResults)) { // 用户选择了同意授权
          	startActivity(new Intent(this, FileWriteActivity.class));
          } else {
          	ToastUtil.show(this, "需要允许存储卡权限才能写入公共空间噢");
          }
     }
}
```

以上代码为了简化逻辑，将结果校验操作封装为PermissionUtil的checkGrant方法，该方法遍历授权结 果数组，依次检查每个权限是否都得到授权了。详细的方法代码如下所示：

```java
// 检查权限结果数组，返回true表示都已经获得授权。返回false表示至少有一个未获得授权
public static boolean checkGrant(int[] grantResults) {
boolean result = true;
     if (grantResults != null) {
          for (int grant : grantResults) { // 遍历权限结果数组中的每条选择结果
               if (grant != PackageManager.PERMISSION_GRANTED) { // 未获得授权
                    result = false;
               }
          }
     } else {
     	result = false;
     }
     return result;
}
```

代码都改好后，运行测试App，由于一开始App默认未开启存储卡权限，因此点击按钮btn_file_write触 发了权限校验操作，弹出如图7-4所示的存储卡权限申请窗口。

<img src="/androidImages/image-20230823163219342.png" alt="image-20230823163219342" style="zoom:80%;" />

点击弹窗上的“始终允许”，表示同意赋予存储卡读写权限，然后系统自动给App开启了存储卡权限，并执 行后续处理逻辑，也就是跳到了FileWriteActivity页面，在该页面即可访问公共空间的文件了。但在 Android 10系统中，即使授权通过，App仍然无法访问公共空间，这是因为Android 10默认开启沙箱模 式，不允许直接使用公共空间的文件路径，此时要修改AndroidManifest.xml，给application节点添加如下的requestLegacyExternalStorage属性：

```xml
android:requestLegacyExternalStorage="true"
```

从Android 11开始，为了让应用升级时也能正常访问公共空间，还得修改AndroidManifest.xml，给 application节点添加如下的preserveLegacyExternalStorage属性，表示暂时关闭沙箱模式：

```xml
android:preserveLegacyExternalStorage="true"
```

除了存储卡的读写权限，还有部分权限也要求运行时动态申请，这些权限名称的取值说明见表7-1。

<img src="/androidImages/image-20230823163334900.png" alt="image-20230823163334900" style="zoom:80%;" />


### 7.2.2　利用ContentResolver读写联系人

在实际开发中，普通App很少会开放数据接口给其他应用访问，作为服务端接口的ContentProvider基本 用不到。内容组件能够派上用场的情况，往往是App想要访问系统应用的通讯数据，比如查看联系人、 短信、通话记录，以及对这些通讯数据进行增、删、改、查。

访问系统的通讯数据之前，得先在AndroidManifest.xml添加相应的权限配置，常见的通讯权限配置主要有下面几个：

```xml
<!-- 联系人/通讯录。包括读联系人、写联系人 -->
<uses-permission android:name="android.permission.READ_CONTACTS" />
<uses-permission android:name="android.permission.WRITE_CONTACTS" />
<!-- 短信。包括发送短信、接收短信、读短信-->
<uses-permission android:name="android.permission.SEND_SMS" />
<uses-permission android:name="android.permission.RECEIVE_SMS" />
<uses-permission android:name="android.permission.READ_SMS" />
<!-- 通话记录。包括读通话记录、写通话记录 -->
<uses-permission android:name="android.permission.READ_CALL_LOG" />
<uses-permission android:name="android.permission.WRITE_CALL_LOG" />
```

当然，从Android 6.0开始，上述的通讯权限默认是关闭的，必须在运行App的时候动态申请相关权限， 详细的权限申请过程参见上一小节的“7.2.1　运行时动态申请权限”。

尽管系统允许App通过内容解析器修改联系人列表，但操作过程比较烦琐，因为一个联系人可能有多个 电话号码，还可能有多个邮箱，所以系统通讯录将其设计为3张表，分别是联系人基本信息表、联系号码 表、联系邮箱表，于是每添加一位联系人，就要调用至少三次insert方法。下面是往手机通讯录添加联 系人信息的代码例子：

```java
// 往手机通讯录添加一个联系人信息（包括姓名、电话号码、电子邮箱）
public static void addContacts(ContentResolver resolver, Contact contact) {
     // 构建一个指向系统联系人提供器的Uri对象
     Uri raw_uri = Uri.parse("content://com.android.contacts/raw_contacts");
     ContentValues values = new ContentValues(); // 创建新的配对
     // 往 raw_contacts 添加联系人记录，并获取添加后的联系人编号
     long contactId = ContentUris.parseId(resolver.insert(raw_uri, values));
     // 构建一个指向系统联系人数据的Uri对象
     Uri uri = Uri.parse("content://com.android.contacts/data");
     ContentValues name = new ContentValues(); // 创建新的配对
     name.put("raw_contact_id", contactId); // 往配对添加联系人编号
     // 往配对添加“姓名”的数据类型
     name.put("mimetype", "vnd.android.cursor.item/name");
     name.put("data2", contact.name); // 往配对添加联系人的姓名
     resolver.insert(uri, name); // 往提供器添加联系人的姓名记录
     ContentValues phone = new ContentValues(); // 创建新的配对
     phone.put("raw_contact_id", contactId); // 往配对添加联系人编号
     // 往配对添加“电话号码”的数据类型
     phone.put("mimetype", "vnd.android.cursor.item/phone_v2");
     phone.put("data1", contact.phone); // 往配对添加联系人的电话号码
     phone.put("data2", "2"); // 联系类型。1表示家庭，2表示工作
     resolver.insert(uri, phone); // 往提供器添加联系人的号码记录
     ContentValues email = new ContentValues(); // 创建新的配对
     email.put("raw_contact_id", contactId); // 往配对添加联系人编号
     // 往配对添加“电子邮箱”的数据类型
     email.put("mimetype", "vnd.android.cursor.item/email_v2");
     email.put("data1", contact.email); // 往配对添加联系人的电子邮箱
     email.put("data2", "2"); // 联系类型。1表示家庭，2表示工作
     resolver.insert(uri, email); // 往提供器添加联系人的邮箱记录
}
```

同理，联系人读取代码也分成3个步骤，先查出联系人的基本信息，再依次查询联系人号码和联系人邮 箱，详细代码参见CommunicationUtil.java的readAllContacts方法。

接下来演示联系人信息的访问过程，分别创建联系人的添加页面和查询页面，其中添加页面的完整代码 见chapter07\src\main\java\com\example\chapter07\ContactAddActivity.java，查询页面的完整代码 见chapter07\src\main\java\com\example\chapter07\ContactReadActivity.java。首先在添加页面输 入联系人信息，点击添加按钮调用addContacts方法写入联系人数据，此时添加界面如图7-5所示。然后 打开联系人查询页面，App自动调用readAllContacts方法查出所有的联系人，并显示联系人列表如图7- 6所示，可见刚才添加的联系人已经成功写入系统的联系人列表，而且也能正确读取最新的联系人信息。

<img src="/androidImages/image-20230823163610508.png" alt="image-20230823163610508" style="zoom:80%;" />

<img src="/androidImages/image-20230823163620398.png" alt="image-20230823163620398" style="zoom:80%;" />

<img src="/androidImages/image-20230823163633863.png" alt="image-20230823163633863" style="zoom:80%;" />


### 7.2.3　利用ContentObserver监听短信

ContentResolver获取数据采用的是主动查询方式，有查询就有数据，没查询就没数据。然而有时不但 要获取以往的数据，还要实时获取新增的数据，最常见的业务场景是短信验证码。电商App经常在用户 注册或付款时发送验证码短信，为了替用户省事，App通常会监控手机刚收到的短信验证码，并自动填 写验证码输入框。这时就用到了内容观察器ContentObserver，事先给目标内容注册一个观察器，目标内容的数据一旦发生变化，就马上触发观察器的监听事件，从而执行开发者预先定义的代码。

内容观察器的用法与内容提供器类似，也要从ContentObserver派生一个新的观察器，然后通过 ContentResolver对象调用相应的方法注册或注销观察器。下面是内容解析器与内容观察器之间的交互 方法说明。

- registerContentObserver：内容解析器要注册内容观察器。 
- unregisterContentObserver：内容解析器要注销内容观察器。 
- notifyChange：通知内容观察器发生了数据变化，此时会触发观察器的onChange方法。 notifyChange的调用时机参见“7.1.1　通过ContentProvider封装数据”的insert代码。

为了让读者更好理解，下面举一个实际应用的例子。手机号码的每月流量限额由移动运营商指定，以中 国移动为例，只要将流量校准短信发给运营商客服号码（如发送18到10086），运营商就会回复用户本 月的流量数据，包括月流量额度、已使用流量、未使用流量等信息。手机App只需监控10086发来的短 信内容，即可自动获取当前号码的流量详情。


下面是利用内容观察器实现流量校准的关键代码片段：

```java
public class MonitorSmsActivity extends AppCompatActivity implements
View.OnClickListener {
     private static final String TAG = "MonitorSmsActivity";
     private static TextView tv_check_flow;
     private static String mCheckResult;
     @Override
     protected void onCreate(Bundle savedInstanceState) {
     super.onCreate(savedInstanceState);
     setContentView(R.layout.activity_monitor_sms);
     tv_check_flow = findViewById(R.id.tv_check_flow);
     tv_check_flow.setOnClickListener(this);
     findViewById(R.id.btn_check_flow).setOnClickListener(this);
     initSmsObserver();
     }
     @Override
     public void onClick(View v) {
          if (v.getId() == R.id.btn_check_flow) {
               //查询数据流量，移动号码的查询方式为发送短信内容“18”给“10086”
               //电信和联通号码的短信查询方式请咨询当地运营商客服热线
               //跳到系统的短信发送页面，由用户手工发短信
               //sendSmsManual("10086", "18");
               //无需用户操作，自动发送短信
               sendSmsAuto("10086", "18");
          } else if (v.getId() == R.id.tv_check_flow) {
               AlertDialog.Builder builder = new AlertDialog.Builder(this);
               builder.setTitle("收到流量校准短信");
               builder.setMessage(mCheckResult);
               builder.setPositiveButton("确定", null);
               builder.create().show();
          }
     }
     // 跳到系统的短信发送页面，由用户手工编辑与发送短信
     public void sendSmsManual(String phoneNumber, String message) {
          Intent intent = new Intent(Intent.ACTION_SENDTO, Uri.parse("smsto:" +
          phoneNumber));
          intent.putExtra("sms_body", message);
          startActivity(intent);
     }
     // 短信发送事件
     private String SENT_SMS_ACTION = "com.example.storage.SENT_SMS_ACTION";
     // 短信接收事件
     private String DELIVERED_SMS_ACTION =
     "com.example.storage.DELIVERED_SMS_ACTION";
     // 无需用户操作，由App自动发送短信
     public void sendSmsAuto(String phoneNumber, String message) {
          // 以下指定短信发送事件的详细信息
          Intent sentIntent = new Intent(SENT_SMS_ACTION);
          sentIntent.putExtra("phone", phoneNumber);
          sentIntent.putExtra("message", message);
          PendingIntent sentPI = PendingIntent.getBroadcast(this, 0,
          sentIntent, PendingIntent.FLAG_UPDATE_CURRENT);
          // 以下指定短信接收事件的详细信息
          Intent deliverIntent = new Intent(DELIVERED_SMS_ACTION);
          deliverIntent.putExtra("phone", phoneNumber);
          deliverIntent.putExtra("message", message);
          PendingIntent deliverPI = PendingIntent.getBroadcast(this, 1,
          deliverIntent, PendingIntent.FLAG_UPDATE_CURRENT);
          // 获取默认的短信管理器
          SmsManager smsManager = SmsManager.getDefault();
          // 开始发送短信内容。要确保打开发送短信的完全权限，不是那种还需提示的不完整权限
          smsManager.sendTextMessage(phoneNumber, null, message, sentPI,
          deliverPI);
     }
     private Handler mHandler = new Handler(Looper.myLooper()); // 声明一个处理器对象
     private SmsGetObserver mObserver; // 声明一个短信获取的观察器对象
     private static Uri mSmsUri; // 声明一个系统短信提供器的Uri对象
     private static String[] mSmsColumn; // 声明一个短信记录的字段数组
     // 初始化短信观察器
     private void initSmsObserver() {
          //mSmsUri = Uri.parse("content://sms/inbox");
          //Android5.0之后似乎无法单独观察某个信箱，只能监控整个短信
          mSmsUri = Uri.parse("content://sms"); // 短信数据的提供器路径
          mSmsColumn = new String[]{"address", "body", "date"}; // 短信记录的字段数组
          // 创建一个短信观察器对象
          mObserver = new SmsGetObserver(this, mHandler);
          // 给指定Uri注册内容观察器，一旦发生数据变化，就触发观察器的onChange方法
          getContentResolver().registerContentObserver(mSmsUri, true, mObserver);
     }
     // 在页面销毁时触发
     protected void onDestroy() {
          super.onDestroy();
          getContentResolver().unregisterContentObserver(mObserver); // 注销内容观察器
     }
     // 定义一个短信获取的观察器
     private static class SmsGetObserver extends ContentObserver {
          private Context mContext; // 声明一个上下文对象
          public SmsGetObserver(Context context, Handler handler) {
          super(handler);
          mContext = context;
     }
     // 观察到短信的内容提供器发生变化时触发
     public void onChange(boolean selfChange) {
          String sender = "", content = "";
          // 构建一个查询短信的条件语句，移动号码要查找10086发来的短信
          String selection = String.format("address='10086' and date>%d",
          System.currentTimeMillis() - 1000 * 60 * 1); // 查找最近一分钟
          的短信
          // 通过内容解析器获取符合条件的结果集游标
          Cursor cursor = mContext.getContentResolver().query(
          mSmsUri, mSmsColumn, selection, null, " date desc");
          // 循环取出游标所指向的所有短信记录
          while (cursor.moveToNext()) {
               sender = cursor.getString(0); // 短信的发送号码
               content = cursor.getString(1); // 短信内容
               Log.d(TAG, "sender="+sender+", content="+content);
          	break;
     	}
          cursor.close(); // 关闭数据库游标
          mCheckResult = String.format("发送号码：%s\n短信内容：%s", sender,
          content);
          // 依次解析流量校准短信里面的各项流量数值，并拼接流量校准的结果字符串
          String flow = String.format("流量校准结果如下：总流量为：%s；已使用：%s" +
          "；剩余流量：%s", findFlow(content, "总流量为"),
          findFlow(content, "已使用"), findFlow(content, "剩余"));
          if (tv_check_flow != null) { // 离开该页面后就不再显示流量信息
          tv_check_flow.setText(flow); // 在文本视图显示流量校准结果
     }
     	super.onChange(selfChange);
	}
}
     // 解析流量短信里面的流量数值
     private static String findFlow(String sms, String begin) {
          String flow = findString(sms, begin, "GB");
          String temp = flow.replace("GB", "").replace(".", "");
          if (!temp.matches("\\d+")) {
          flow = findString(sms, begin, "MB");
          }
          return flow;
     }
     // 截取指定头尾之间的字符串
     private static String findString(String content, String begin, String end) {
          int begin_pos = content.indexOf(begin);
          if (begin_pos < 0) {
               return "未获取";
          }
          String sub_sms = content.substring(begin_pos);
          int end_pos = sub_sms.indexOf(end);
          if (end_pos < 0) {
               return "未获取";
          }
          if (end.equals("，")) {
               return sub_sms.substring(begin.length(), end_pos);
          } else {
               return sub_sms.substring(begin.length(), end_pos + end.length());
          }
      }
}

```


运行测试App，点击校准按钮发送流量校准短信，接着收到如图7-7所示的短信内容。同时App监听刚收 到的流量短信，从中解析得到当前的流量数值，并展示在界面上如图7-8所示。可见通过内容观察器实时 获取了最新的短信记录。

<img src="/androidImages/image-20230823164135985.png" alt="image-20230823164135985" style="zoom:80%;" />

总结一下系统开放给普通应用访问的常用URI，详细的URI取值说明见表7-2。

![image-20230823164158896](/androidImages/image-20230823164158896.png)



## 7.3　在应用之间共享文件

本节介绍了Android在应用间共享文件的几种方式，包括：如何使用系统相册发送带图片的彩信，如何 从相册媒体库获取图片并借助FileProvider发送彩信，如何在媒体库中查找APK文件并借助FileProvider 安装应用。


### 7.3.1　使用相册图片发送彩信

不同应用之间可以共享数据，当然也能共享文件，比如系统相册保存着用户拍摄的照片，这些照片理应 分享给其他App使用。举个例子，短信只能发送文本，而彩信允许同时发送文本和图片，彩信的附件图 片就来自系统相册。现在准备到系统相册挑选照片，测试页面的Java代码先增加以下两行代码，分别声 明一个路径对象和选择照片的请求码：

```java
private Uri mUri; // 文件的路径对象
private int CHOOSE_CODE = 3; // 选择照片的请求码
```

接着在选取按钮的点击方法中加入下面代码，表示打开系统相册选择照片：

```java
// 创建一个内容获取动作的意图
Intent albumIntent = new Intent(Intent.ACTION_GET_CONTENT);
albumIntent.setType("image/*"); // 设置内容类型为图像
startActivityForResult(albumIntent, CHOOSE_CODE); // 打开系统相册，并等待图片选择结果
```

上面的跳转代码期望接收照片选择结果，于是重写当前活动的onActivityResult方法，调用返回意图的 getData方法获得选中照片的路径对象，重写后的方法代码如下所示：

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent intent)
{
     super.onActivityResult(requestCode, resultCode, intent);
     if (resultCode == RESULT_OK && requestCode == CHOOSE_CODE) { // 从相册选择一张照片
          if (intent.getData() != null) { // 数据非空，表示选中了某张照片
               mUri = intent.getData(); // 获得选中照片的路径对象
               iv_appendix.setImageURI(mUri); // 设置图像视图的路径对象
               Log.d(TAG,
               "uri.getPath="+mUri.getPath()+",uri.toString="+mUri.toString());
          }
     }
}
```

这下拿到了相册照片的路径对象，既能把它显示到图像视图，也能将它作为图片附件发送彩信了。由于 普通应用无法自行发送彩信，必须打开系统的信息应用才行，于是编写页面跳转代码，往意图对象塞入 详细的彩信数据，包括彩信发送的目标号码、标题、内容，以及Uri类型的图片附件。详细的跳转代码示 例如下：

```java
// 发送带图片的彩信
private void sendMms(String phone, String title, String message) {
     Intent intent = new Intent(Intent.ACTION_SEND); // 创建一个发送动作的意图
     intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK); // 另外开启新页面
     intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION); // 需要读权限
     intent.putExtra("address", phone); // 彩信发送的目标号码
     intent.putExtra("subject", title); // 彩信的标题
     intent.putExtra("sms_body", message); // 彩信的内容
     intent.putExtra(Intent.EXTRA_STREAM, mUri); // mUri为彩信的图片附件
     intent.setType("image/*"); // 彩信的附件为图片
     // 部分手机无法直接跳到彩信发送页面，故而需要用户手动选择彩信应用
     //intent.setClassName("com.android.mms","com.android.mms.ui.ComposeMessageActiv
     ity");
     startActivity(intent); // 因为未指定要打开哪个页面，所以系统会在底部弹出选择窗口
     ToastUtil.show(this, "请在弹窗中选择短信或者信息应用");
}
```

运行测试App，刚打开的活动页面如图7-9所示，在各行编辑框中依次填写彩信的目标号码、标题、内 容，再到系统相册选取照片，填好的界面效果如图7-10所示。

<img src="/androidImages/image-20230823164511197.png" alt="image-20230823164511197" style="zoom:80%;" />

<img src="/androidImages/image-20230823164534139.png" alt="image-20230823164534139" style="zoom:80%;" />

之后点击发送按钮，屏幕下方弹出如图7-11所示的应用选择窗口。 先点击信息图标，表示希望跳到信息应用，再点击“仅此一次”按钮，此时打开信息应用界面如图7-12所 示。可见信息发送界面已经自动填充收件人号码、信息标题和内容，以及图片附件，只待用户轻点右下 角的飞鸽传书图标，就能将彩信发出去了。

<img src="/androidImages/image-20230823164559091.png" alt="image-20230823164559091" style="zoom:80%;" />

<img src="/androidImages/image-20230823164615116.png" alt="image-20230823164615116" style="zoom:80%;" />


### 7.3.2　借助FileProvider发送彩信

通过系统相册固然可以获得照片的路径对象，却无法知晓更多的详细信息，例如照片名称、文件大小、 文件路径等信息，也就无法进行个性化的定制开发。为了把更多的文件信息开放出来，Android设计了 专门的媒体共享库，允许开发者通过内容组件从中获取更详细的媒体信息。

图片所在的相册媒体库路径为MediaStore.androidImages.Media.EXTERNAL_CONTENT_URI，通过内容解析器 即可从媒体库依次遍历得到图片列表详情。为便于代码管理，首先要声明如下的对象变量：

```java
private List<ImageInfo> mImageList = new ArrayList<ImageInfo>(); // 图片列表
private Uri mImageUri = MediaStore.androidImages.Media.EXTERNAL_CONTENT_URI; // 相册的
Uri
private String[] mImageColumn = new String[]{ // 媒体库的字段名称数组
MediaStore.androidImages.Media._ID, // 编号
MediaStore.androidImages.Media.TITLE, // 标题
MediaStore.androidImages.Media.SIZE, // 文件大小
MediaStore.androidImages.Media.DATA}; // 文件路径
```

然后使用内容解析器查询媒体库的图片信息，简单起见只挑选文件大小最小的前6张图片，图片列表加载 代码示例如下：

```java
// 加载图片列表
private void loadImageList() {
     mImageList.clear(); // 清空图片列表
     // 查询相册媒体库，并返回结果集的游标。“_size asc”表示按照文件大小升序排列
     Cursor cursor = getContentResolver().query(mImageUri, mImageColumn, null,
     null, "_size asc");
     if (cursor != null) {
          // 下面遍历结果集，并逐个添加到图片列表。简单起见只挑选前六张图片
          for (int i=0; i<6 && cursor.moveToNext(); i++) {
          ImageInfo image = new ImageInfo(); // 创建一个图片信息对象
          image.setId(cursor.getLong(0)); // 设置图片编号
          image.setName(cursor.getString(1)); // 设置图片名称
          image.setSize(cursor.getLong(2)); // 设置图片的文件大小
          image.setPath(cursor.getString(3)); // 设置图片的文件路径
          Log.d(TAG, image.getName() + " " + image.getSize() + " " +
          image.getPath());
          if (!FileUtil.checkFileUri(this, image.getPath())) { // 检查该路径是否合法
               i--;
               continue; // 路径非法则再来一次
          }
          mImageList.add(image); // 添加至图片列表
          }
          cursor.close(); // 关闭数据库游标
     }
}

```

注意到以上代码获得了字符串格式的文件路径，而彩信发送应用却要求Uri类型的路径对象，原本可以通 过代码“Uri.parse(path)”将字符串转换为Uri对象，但是从Android 7.0开始，系统不允许其他应用直接访 问老格式的路径，必须使用文件提供器FileProvider才能获取合法的Uri路径，相当于A应用申明了共享某 个文件，然后B应用方可访问该文件。为此需要重头配置FileProvider，详细的配置步骤说明如下。

首先在res目录新建xml文件夹，并在该文件夹中创建file_paths.xml，再往XML文件填入以下内容，表示 定义几个外部文件目录：

```xml
<paths>
     <external-path path="Android/data/com.example.chapter07/" name="files_root"/>
     <external-path path="." name="external_storage_root" />
</paths>
```

接着打开AndroidManifest.xml，在application节点内部添加下面的provider标签，表示声明当前应用 的内容提供器组件，添加后的标签配置示例如下：

```xml
<!-- 兼容Android7.0，把访问文件的Uri方式改为FileProvider -->
<provider
android:name="androidx.core.content.FileProvider"
android:authorities="@string/file_provider"
android:exported="false"
android:grantUriPermissions="true">
     
     <meta-data
     android:name="android.support.FILE_PROVIDER_PATHS"
     android:resource="@xml/file_paths" />
     
</provider>
```

上面的provider有两处地方允许修改，一处是authorities属性，它规定了授权字符串，这是每个提供器 的唯一标识；另一处是元数据的resource属性，它指明了文件提供器的路径资源，也就是刚才定义的 file_paths.xml。

回到活动页面的源码，在发送彩信之前添加下述代码，目的是根据字符串路径构建Uri对象，注意针对 Android 7.0以上的兼容处理。

```java
Uri uri = Uri.parse(path); // 根据指定路径创建一个Uri对象
// 兼容Android7.0，把访问文件的Uri方式改为FileProvider
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
     // 通过FileProvider获得文件的Uri访问方式
     uri = FileProvider.getUriForFile(this,
     "com.example.chapter07.fileProvider", new
     File(path));
}
```

由以上代码可见，Android 7.0开始调用FileProvider的getUriForFile方法获得Uri对象，该方法的第二个 参数为文件提供器的授权字符串，第三个参数为File类型的文件对象。

运行测试App，页面会自动加载媒体库的前6张图片，另外手工输入对方号码、彩信标题、彩信内容等信 息，填好的发送界面如图7-13所示。

<img src="/androidImages/image-20230823165031371.png" alt="image-20230823165031371" style="zoom:80%;" />

点击页面下方的某张图片，表示选中该图片作为彩信附件，此时界面下方弹出如图7-14所示的应用选择 窗口。选中信息图标再点击“仅此一次”按钮，即可跳到如图7-15所示的系统信息发送页面了。

<img src="/androidImages/image-20230823165059607.png" alt="image-20230823165059607" style="zoom:80%;" />

<img src="/androidImages/image-20230823165109554.png" alt="image-20230823165109554" style="zoom:80%;" />


### 7.3.3　借助FileProvider安装应用

除了发送彩信需要文件提供器，安装应用也需要FileProvider。不单单彩信的附件图片能到媒体库中查 询，应用的APK安装包也可在媒体库找到。查找安装包依然借助于内容解析器，具体的实现过程和查询 图片类似，比如事先声明如下的对象变量：

```java
private List<ApkInfo> mApkList = new ArrayList<ApkInfo>(); // 安装包列表
private Uri mFilesUri = MediaStore.Files.getContentUri("external"); // 存储卡的Uri
private String[] mFilesColumn = new String[]{ // 媒体库的字段名称数组
     MediaStore.Files.FileColumns._ID, // 编号
     MediaStore.Files.FileColumns.TITLE, // 标题
     MediaStore.Files.FileColumns.SIZE, // 文件大小
     MediaStore.Files.FileColumns.DATA, // 文件路径
     MediaStore.Files.FileColumns.MIME_TYPE // 媒体类型
};
```

再通过内容解析器到媒体库查找安装包列表，具体的加载代码示例如下：

```java
// 加载安装包列表
private void loadApkList() {
     mApkList.clear(); // 清空安装包列表
     // 查找存储卡上所有的apk文件，其中mime_type指定了APK的文件类型，或者判断文件路径是否以.apk结尾
     Cursor cursor = getContentResolver().query(mFilesUri, mFilesColumn,
     "mime_type='application/vnd.android.package-archive' or _data like '%.apk'",
     null, null);
     if (cursor != null) {
          // 下面遍历结果集，并逐个添加到安装包列表。简单起见只挑选前十个文件
          for (int i=0; i<10 && cursor.moveToNext(); i++) {
               ApkInfo apk = new ApkInfo(); // 创建一个安装包信息对象
               apk.setId(cursor.getLong(0)); // 设置安装包编号
               apk.setName(cursor.getString(1)); // 设置安装包名称
               apk.setSize(cursor.getLong(2)); // 设置安装包的文件大小
               apk.setPath(cursor.getString(3)); // 设置安装包的文件路径
               Log.d(TAG, apk.getName() + ", " + apk.getSize() + ", " +
               apk.getPath()+", "+cursor.getString(4));
               if (!FileUtil.checkFileUri(this, apk.getPath())) { // 检查该路径是否合法
                    i--;
                    continue; // 路径非法则再来一次
          	}
        	mApkList.add(apk); // 添加至安装包列表
       	}
     	cursor.close(); // 关闭数据库游标
     }
}
```

找到安装包之后，通常还要获取它的包名、版本名称、版本号等信息，此时可调用应用包管理器的 getPackageArchiveInfo方法，从安装包文件中提取PackageInfo包信息。包信息对象的packageName 属性值为应用包名，versionName属性值为版本名称，versionCode属性值为版本号。下面是利用弹窗 展示包信息的代码例子：

```java
// 显示安装apk的提示对话框
private void showAlert(final ApkInfo apkInfo) {
     PackageManager pm = getPackageManager(); // 获取应用包管理器
     // 获取apk文件的包信息
     PackageInfo pi = pm.getPackageArchiveInfo(apkInfo.getPath(),
     PackageManager.GET_ACTIVITIES);
     if (pi != null) { // 能找到包信息
          Log.d(TAG, "packageName="+pi.packageName+",
          versionName="+pi.versionName+", versionCode="+pi.versionCode);
          String desc = String.format("应用包名：%s\n版本名称：%s\n版本编码：%s\n文件路
          径：%s",
          pi.packageName, pi.versionName,
          pi.versionCode, apkInfo.getPath());
          AlertDialog.Builder builder = new AlertDialog.Builder(this);
          builder.setTitle("是否安装该应用？"); // 设置提醒对话框的标题
          builder.setMessage(desc); // 设置提醒对话框的消息内容
          builder.setPositiveButton("是", new DialogInterface.OnClickListener() {
          @Override
          public void onClick(DialogInterface dialog, int which) {
          	installApk(apkInfo.getPath()); // 安装指定路径的APK
     	}
        	});
          builder.setNegativeButton("否", null);
          builder.create().show(); // 显示提醒对话框
     } else { // 未找到包信息
     	ToastUtil.show(this, "该安装包已经损坏，请选择其他安装包");
     }
}
```

有了安装包的文件路径之后，就能打开系统自带的安装程序执行安装操作了，此时一样要把安装包的Uri 对象传过去。应用安装的详细调用代码如下所示：

```java
// 安装指定路径的APK
private void installApk(String path) {
     Log.d(TAG, "path="+path);
     Uri uri = Uri.parse(path); // 根据指定路径创建一个Uri对象
     // 兼容Android7.0，把访问文件的Uri方式改为FileProvider
     if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
     // 通过FileProvider获得安装包文件的Uri访问方式
     uri = FileProvider.getUriForFile(this,
     getPackageName()+".fileProvider", new
     File(path));
     }
     Intent intent = new Intent(Intent.ACTION_VIEW); // 创建一个浏览动作的意图
     intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK); // 另外开启新页面
     intent.setFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION); // 需要读权限
     // 设置Uri的数据类型为APK文件
     intent.setDataAndType(uri, "application/vnd.android.package-archive");
     startActivity(intent); // 启动系统自带的应用安装程序
}
```

注意，从Android 8.0开始，安装应用需要申请权限REQUEST_INSTALL_PACKAGES，于是打开 AndroidManifest.xml，补充下面的权限申请配置：

```xml
<!-- 安装应用请求，Android8.0需要 -->
<uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />
```

这下大功告成，编译运行App，打开测试页面自动加载安装包列表的界面如图7-16所示。点击某项安装 包，弹出如图7-17所示的确认对话框。

<img src="/androidImages/image-20230823165638681.png" alt="image-20230823165638681" style="zoom:80%;" />

<img src="/androidImages/image-20230823165653540.png" alt="image-20230823165653540" style="zoom:80%;" />

点击确认对话框的“是”按钮，便跳到了如图7-18所示的应用安装界面，点击“允许”按钮之后，剩下的安装 操作就交给系统程序了。

<img src="/androidImages/image-20230823165708648.png" alt="image-20230823165708648" style="zoom:80%;" />



<div style="page-break-after: always;"></div>

## 7.4　小结

本章主要介绍内容组件—ContentProvider的常见用法，包括：在应用之间共享数据（通过 ContentProvider封装数据、通过ContentResolver访问数据）、使用内容组件获取通讯信息（运行时动 态申请权限、利用ContentResolver读写联系人、利用ContentObserver监听短信）、在应用之间共享 文件（使用相册照片发送彩信、借助FileProvider发送彩信、借助FileProvider安装应用）。

通过本章的学习，我们应该能掌握以下4种开发技能： 

（1）学会利用ContentProvider在应用之间共享数据。 

（2）学会在App运行过程中动态申请权限。 

（3）学会使用内容组件获取系统的通讯信息。 

（4）学会利用FileProvider在应用之间共享文件。