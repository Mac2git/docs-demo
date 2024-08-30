

# 数据存储

本节介绍Android 4种存储方式的用法，包括共享参数SharedPreferences、数据库SQLite、存储卡文 件、App的全局内存，另外介绍Android重要组件—应用Application的基本概念与常见用法。最后，结 合本章所学的知识演示实战项目“购物车”的设计与实现。

## 共享参数SharedPreferences

本节介绍Android的键值对存储方式——共享参数SharedPreferences的使用方法，包括：如何将数据保 存到共享参数，如何从共享参数读取数据，如何使用共享参数实现登录页面的记住密码功能，如何利用 设备浏览器找到共享参数文件。


### 共享参数的用法

SharedPreferences是Android的一个轻量级存储工具，它采用的存储结构是Key-Value的键值对方式， 类似于Java的Properties，二者都是把Key-Value的键值对保存在配置文件中。不同的是，Properties的 文件内容形如Key=Value，而SharedPreferences的存储介质是XML文件，且以XML标记保存键值对。 保存共享参数键值对信息的文件路径为：/data/data/应用包名/shared_prefs/文件名.xml。下面是一个 共享参数的XML文件例子：

```xml
<?xml version='1.0' encoding='utf-8' standalone='yes' ?>
<map>
     <string name="name">Mr Lee</string>
     <int nane="age" value="30"/>
     <boolean name="married" value="true" />
     <float name="weight" value="100.0"/>
</map>
```

基于XML格式的特点，共享参数主要用于如下场合：

1. 简单且孤立的数据。若是复杂且相互关联的数据，则要保存于关系数据库。 
2. 文本形式的数据。若是二进制数据，则要保存至文件。 
3. 需要持久化存储的数据。App退出后再次启动时，之前保存的数据仍然有效。

实际开发中，共享参数经常存储的数据包括：App的个性化配置信息、用户使用App的行为信息、临时需要保存的片段信息等。

共享参数对数据的存储和读取操作类似于Map，也有存储数据的put方法，以及读取数据的get方法。调 用getSharedPreferences方法可以获得共享参数实例，获取代码示例如下：

```java
// 从share.xml获取共享参数实例
SharedPreferences shared = getSharedPreferences("share", MODE_PRIVATE);
```

由以上代码可知，getSharedPreferences方法的第一个参数是文件名，填share表示共享参数的文件名 是share.xml；第二个参数是操作模式，填MODE_PRIVATE表示私有模式。

往共享参数存储数据要借助于Editor类，保存数据的代码示例如下：

```java
SharedPreferences.Editor editor = shared.edit(); // 获得编辑器的对象
editor.putString("name", "Mr Lee"); // 添加一个名为name的字符串参数
editor.putInt("age", 30); // 添加一个名为age的整型参数
editor.putBoolean("married", true); // 添加一个名为married的布尔型参数
editor.putFloat("weight", 100f); // 添加一个名为weight的浮点数参数
editor.commit(); // 提交编辑器中的修改
```

从共享参数读取数据相对简单，直接调用共享参数实例的get * * * 方法即可读取键值，注意 get***方法 的第二个参数表示默认值，读取数据的代码示例如下：

```java
String name = shared.getString ( "name.","");//从共享参数获取名为name的字符串
int age = shared.getInt ("age",0);// 从共享参数获取名为age 的整型数
boolean married = shared.getBoolean ( "married"， false);//从共享参数获取名为married的布尔数
float weight = shared.getFloat ( "weight"，0);//从共享参数获取名为weight的浮点数
```


下面通过测试页面演示共享参数的存取过程，先在编辑页面录入用户注册信息，点击保存按钮把数据提 交至共享参数，如图6-1所示。再到查看页面浏览用户注册信息，App从共享参数中读取各项数据，并将 注册信息显示在页面上，如图6-2所示。

<img src="/androidImages/image-20230801175844970.png" alt="image-20230801175844970" style="zoom:80%;" />

<img src="/androidImages/image-20230801175858509.png" alt="image-20230801175858509" style="zoom:80%;" />

### 实现记住密码功能

#### activity_login_main.xml:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <!-- 密码，验证码登录区域 -->
    <RadioGroup
        android:layout_width="match_parent"
        android:layout_height="@dimen/item_layout_height"
        android:orientation="horizontal">

        <RadioButton
            android:id="@+id/rb_password"
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1"
            android:checked="true"
            android:text="@string/login_by_password"
            android:textColor="@color/black"
            android:textSize="@dimen/common_font_size" />

        <RadioButton
            android:id="@+id/rb_verify_code"
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1"
            android:text="@string/login_by_verify_code"
            android:textColor="@color/black"
            android:textSize="@dimen/common_font_size" />

    </RadioGroup>

    <!-- 手机号码区域 -->
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="@dimen/item_layout_height"
        android:orientation="horizontal">

        <TextView
            android:id="@+id/tv_phone"
            android:layout_width="wrap_content"
            android:layout_height="match_parent"
            android:gravity="center"
            android:text="@string/phone_number"
            android:textColor="@color/black"
            android:textSize="@dimen/common_font_size" />

        <EditText
            android:id="@+id/et_phone"
            android:layout_width="wrap_content"
            android:layout_height="match_parent"
            android:layout_margin="3dp"
            android:layout_weight="1"
            android:background="@drawable/edit_text_selector"
            android:hint="@string/input_phone_number"
            android:inputType="number"
            android:maxLength="11"
            android:textColorHint="@color/grey" />

    </LinearLayout>

    <!-- 登录密码区域 -->
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="@dimen/item_layout_height"
        android:orientation="horizontal">

        <TextView
            android:id="@+id/tv_password"
            android:layout_width="wrap_content"
            android:layout_height="match_parent"
            android:gravity="center"
            android:text="@string/login_password"
            android:textColor="@color/black"
            android:textSize="@dimen/common_font_size" />

        <RelativeLayout
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_margin="3dp"
            android:layout_weight="1">

            <EditText
                android:id="@+id/et_password"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:background="@drawable/edit_text_selector"
                android:hint="@string/input_password"
                android:inputType="numberPassword"
                android:maxLength="6"
                android:textColor="@color/black"
                android:textColorHint="@color/grey"
                android:textSize="@dimen/common_font_size" />

            <Button
                android:id="@+id/btn_forget"
                android:layout_width="wrap_content"
                android:layout_height="match_parent"
                android:layout_alignParentEnd="true"
                android:text="@string/forget_password"
                android:textColor="@color/black"
                android:textSize="@dimen/button_font_size" />

        </RelativeLayout>

    </LinearLayout>

    <!-- 记住密码区域 -->
    <CheckBox
        android:id="@+id/cb_remember"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="5dp"
        android:button="@drawable/check_box_selector"
        android:gravity="left"
        android:text="@string/remember_password"
        android:textColor="@color/black"
        android:textSize="@dimen/common_font_size" />

    <!-- 登录区域 -->
    <Button
        android:id="@+id/btn_login"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="5dp"
        android:text="@string/login"
        android:textSize="@dimen/button_font_size" />
</LinearLayout>
```


#### LoginMainActivity.java代码：

```java
public class LoginMainActivity extends AppCompatActivity implements View.OnClickListener {

    private TextView tv_password;
    private EditText et_password;
    private Button btn_forget;
    private CheckBox cb_remember;
    private RadioButton rb_password;
    private EditText et_phone;
    //默认密码
    private String pwd = "111111";
    private RadioButton rb_verify_code;
    private String verifyCode;
    private ActivityResultLauncher<Intent> register;
    private SharedPreferences preferences;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login_main);
        //验证码登录
        rb_verify_code = findViewById(R.id.rb_verify_code);
        //密码登录
        rb_password = findViewById(R.id.rb_password);
        rb_verify_code.setOnClickListener(this);
        rb_password.setOnClickListener(this);
        tv_password = findViewById(R.id.tv_password);
        et_password = findViewById(R.id.et_password);
        btn_forget = findViewById(R.id.btn_forget);
        btn_forget.setOnClickListener(this);
        cb_remember = findViewById(R.id.cb_remember);
        findViewById(R.id.btn_login).setOnClickListener(this);
        et_phone = findViewById(R.id.et_phone);
        //注册文本监听事件
        et_phone.addTextChangedListener(new HideTextTextWatcher(et_phone,11));
        et_password.addTextChangedListener(new HideTextTextWatcher(et_password,6));
        register = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(), result -> {
            Intent intent = result.getData();
            if (intent != null && result.getResultCode() == Activity.RESULT_OK){
                //已经修改完成了，更新默认密码
                pwd = intent.getStringExtra("new_password");
            }
        });
        //声明一个文件，如果用户点击了，记住密码，用来保存
        preferences = getSharedPreferences("rememberPassword", Context.MODE_PRIVATE);
        writerSharedPreferences();
    }

    private void writerSharedPreferences() {
        boolean remember = preferences.getBoolean("isRemember",false);
        if (remember){
            String phone = preferences.getString("phone","");
            String password = preferences.getString("password","");
            et_phone.setText(phone);
            et_password.setText(password);
            cb_remember.setChecked(true);
        }
    }

    //手机号的长度是为11位
    @Override
    public void onClick(View v) {
        String desc = tv_password.toString();
        //点击登录的时候
        if (v.getId() == R.id.btn_login){
            if (desc.length() < 11){
                Toast.makeText(this,"登录失败",Toast.LENGTH_SHORT).show();
                return;
            }
            //当使用密码登录被选中的时候
            if (rb_password.isChecked()){
                if (!(pwd.equals(et_password.getText().toString()))){
                    Toast.makeText(this,"登录失败",Toast.LENGTH_SHORT).show();
                    return;
                }
                //判断登录密码是否被选中
                if (cb_remember.isChecked()){
                    String phone = et_phone.getText().toString();
                    String password = et_password.getText().toString();

                    //声明一个编辑器，用来写入属性
                    SharedPreferences.Editor editor = preferences.edit();
                    editor.putString("phone",phone);
                    editor.putString("password",password);
                    editor.putBoolean("isRemember",cb_remember.isChecked());
                    editor.commit();
                }
                loginSuccess();
            }
            //当使用验证码登录的时候
            if (rb_verify_code.isChecked()){
                if (!(verifyCode.equals(et_password.getText().toString()))){
                    Toast.makeText(this,"登录失败",Toast.LENGTH_SHORT).show();
                    return;
                }
                loginSuccess();
            }
        }
        //当点击密码登录，忘记密码的时候
        if (rb_password.isChecked()){
            if (v.getId() == R.id.btn_forget){
                Intent intent = new Intent(this,LoginForgetActivity.class);
                intent.putExtra("iphone",et_phone.getText().toString());
                register.launch(intent);
            }
        }else if (rb_verify_code.isChecked()){//当使用验证码登录被选中的时候
            if (v.getId() == R.id.btn_forget){
                verifyCode = String.format("%06d",new Random().nextInt(999999));
                AlertDialog.Builder builder = new AlertDialog.Builder(this);
                builder.setTitle("请记住验证码");
                builder.setMessage("您的手机号是："+et_phone.getText().toString()+",本次验证码是"+ verifyCode +"请输入验证码");
                builder.setPositiveButton("好的",null);
                builder.create().show();
            }
        }
        //点击验证码登录的时候
        if (v.getId() == R.id.rb_verify_code){
            //更改登录密码的文字
            tv_password.setText(getString(R.string.verify_code));
            //更改提示文字
            et_password.setHint(getString(R.string.hint_verify_code));
            //更改按钮里面的文字
            btn_forget.setText(getString(R.string.get_verify_code));
            //记住密码复选框为不可见
            cb_remember.setVisibility(View.GONE);
        }
        //点击密码登录的时候
        if (v.getId() == R.id.rb_password){
            //更改登录密码的文字
            tv_password.setText(getString(R.string.login_password));
            //更改提示文字
            et_password.setHint(getString(R.string.input_password));
            //更改按钮里面的文字
            btn_forget.setText(getString(R.string.forget_password));
            //记住密码复选框为可见
            cb_remember.setVisibility(View.VISIBLE);
        }

    }

    private void loginSuccess() {
        String desc = String.format("您的手机号码是%s,恭喜您通过验证,点击“确定”返回上一个页面",et_phone.getText().toString());
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("登录成功");
        builder.setMessage(desc);
        builder.setPositiveButton("确认返回", (dialog, which) -> finish());
        builder.setNegativeButton("我再看看",null);
        AlertDialog dialog = builder.create();
        dialog.show();
    }

    private class HideTextTextWatcher implements TextWatcher {
        private EditText phone;
        private int maxLength;
        public HideTextTextWatcher(EditText phone, int maxLength) {
            this.phone = phone;
            this.maxLength = maxLength;
        }

        @Override
        public void beforeTextChanged(CharSequence s, int start, int count, int after) {

        }

        @Override
        public void onTextChanged(CharSequence s, int start, int before, int count) {

        }

        @Override
        public void afterTextChanged(Editable s) {
            String desc = s.toString();
            if (desc.length() == maxLength){
                ViewUtil.hideOneInputMethod(LoginMainActivity.this,phone);
            }
        }
    }
}
```


#### 忘记密码布局文件: activity_login_forget.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="@dimen/item_layout_height"
        android:orientation="horizontal">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="match_parent"
            android:gravity="center"
            android:text="@string/input_new_password"
            android:textColor="@color/black"
            android:textSize="@dimen/common_font_size" />

        <EditText
            android:id="@+id/et_input_first"
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_margin="6dp"
            android:layout_weight="1"
            android:background="@drawable/edit_text_selector"
            android:hint="@string/input_new_password_hint"
            android:inputType="numberPassword"
            android:maxLength="6"
            android:textColorHint="@color/grey" />

    </LinearLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="@dimen/item_layout_height"
        android:orientation="horizontal">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="match_parent"
            android:gravity="center"
            android:text="@string/confirm_new_password"
            android:textColor="@color/black"
            android:textSize="@dimen/common_font_size" />

        <EditText
            android:id="@+id/et_input_second"
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_margin="6dp"
            android:layout_weight="1"
            android:background="@drawable/edit_text_selector"
            android:hint="@string/input_new_password_again"
            android:inputType="numberPassword"
            android:maxLength="6"
            android:textColorHint="@color/grey" />

    </LinearLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="@dimen/item_layout_height"
        android:orientation="horizontal">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="match_parent"
            android:gravity="center"
            android:text="@string/hint_verify_code"
            android:textColor="@color/black"
            android:textSize="@dimen/common_font_size" />

        <RelativeLayout
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1">

            <EditText
                android:id="@+id/et_verify_code"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:layout_margin="4dp"
                android:layout_weight="1"
                android:background="@drawable/edit_text_selector"
                android:hint="@string/input_new_password_again"
                android:maxLength="6"
                android:textColorHint="@color/grey" />

            <Button
                android:id="@+id/btn_get_verify_code"
                android:layout_width="wrap_content"
                android:layout_height="match_parent"
                android:layout_alignParentEnd="true"
                android:text="@string/get_verify_code"
                android:textColor="@color/black"
                android:textSize="@dimen/button_font_size" />

        </RelativeLayout>

    </LinearLayout>

    <Button
        android:id="@+id/btn_confirm"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="@string/done"
        android:textColor="@color/black"
        android:textSize="@dimen/button_font_size" />

</LinearLayout>
```


#### LoginForgetActivity.java

```java
public class LoginForgetActivity extends AppCompatActivity implements View.OnClickListener {

    private EditText et_input_first;
    private EditText et_input_second;
    private EditText et_verify_code;
    private String verifyCode;
    private String iphone;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login_forget);
        et_input_first = findViewById(R.id.et_input_first);
        et_input_second = findViewById(R.id.et_input_second);
        et_verify_code = findViewById(R.id.et_verify_code);
        findViewById(R.id.btn_get_verify_code).setOnClickListener(this);
        findViewById(R.id.btn_confirm).setOnClickListener(this);
        et_input_first.addTextChangedListener(new HideTextWatcher(et_input_first,6));
        et_input_second.addTextChangedListener(new HideTextWatcher(et_input_first,6));
        et_verify_code.addTextChangedListener(new HideTextWatcher(et_input_first,6));

        //获取传递过来的参数
        iphone = getIntent().getExtras().getString("iphone");


    }

    @Override
    public void onClick(View v) {
        if (v.getId() == R.id.btn_confirm){
           String first = et_input_first.getText().toString();
           String second = et_input_second.getText().toString();
           String vCode = et_verify_code.getText().toString();
            if (first.length() != 6 || second.length() != 6){
               Toast.makeText(this,"两次输入的长度不一致！",Toast.LENGTH_SHORT).show();
               return;
           }
           if (!first.equals(second)){
               Toast.makeText(this,"输入的两次密码不一致",Toast.LENGTH_SHORT).show();
               return;
           }
           if (!verifyCode.equals(vCode)){
               Toast.makeText(this,"验证码输入错误",Toast.LENGTH_SHORT).show();
               return;
           }
           if (first.length() == 6 && second.length() == 6 && verifyCode.equals(vCode)){
               Toast.makeText(this,"修改成功！",Toast.LENGTH_SHORT).show();
               Intent intent = new Intent();
               intent.putExtra("new_password",first);
               setResult(Activity.RESULT_OK,intent);
               finish();
           }
        }
        if (v.getId() == R.id.btn_get_verify_code){
            verifyCode = String.format("%06d",new Random().nextInt(999999));
            AlertDialog.Builder builder = new AlertDialog.Builder(this);
            builder.setTitle("请记住验证码");
            builder.setMessage("您的手机号是："+iphone+",本次验证码是"+ verifyCode +"请输入验证码");
            builder.setPositiveButton("好的",null);
            builder.create().show();
        }
    }

    private class HideTextWatcher implements TextWatcher {
        private EditText et;
        private int mLength;
        public HideTextWatcher(EditText et, int maxLength) {
            this.et = et;
            this.mLength = maxLength;
        }

        @Override
        public void beforeTextChanged(CharSequence s, int start, int count, int after) {

        }

        @Override
        public void onTextChanged(CharSequence s, int start, int before, int count) {

        }

        @Override
        public void afterTextChanged(Editable s) {
            if (s.toString().length() == mLength){
                ViewUtil.hideOneInputMethod(LoginForgetActivity.this,et);
            }
        }
    }
}
```


#### LoginMainActivity.java和LoginForgetActitivity.java中的工具类(隐藏输入法工具类)：

```java
public class ViewUtil {

    public static void hideOneInputMethod(Activity act, View v) {
        //获得系统输入法的管理器
        InputMethodManager im = (InputMethodManager) act.getSystemService(Context.INPUT_METHOD_SERVICE);
        //关闭屏幕上的输入法键盘
        im.hideSoftInputFromWindow(v.getWindowToken(),0);
    }
}
```


#### 效果展示：

​		验证码登录：

​				<img src="/androidImages/验证码登录.png" style="zoom:80%;" />


![](/androidImages/将登录信息保存到共享参数.png)



### 利用设备浏览器寻找共享参数文件

前面的“6.1.1　共享参数的基本用法”提到，参数文件的路径为“/data/data/应用包名/shared_prefs/* * * .xml”，然而使用手机自带的文件管理器却找不到该路径，data下面只有空目录而已。这是因为手机厂商 加了层保护，不让用户查看App的核心文件，否则万一不小心误删了，App岂不是运行报错了？当然作 为开发者，只要打开了手机的USB调试功能，还是有办法拿到测试应用的数据文件。首先打开Android Studio，依次选择菜单Run→Run '***'，把测试应用比如chapter06安装到手机上。接着单击Android Studio左下角的logcat标签，找到已连接的手机设备和测试应用，如图6-5所示。

![image-20230801181325234](/androidImages/image-20230801181325234.png)



注意到logcat窗口的右边，也就是Android Studio右下角有个竖排标签“Device File Explorer”，翻译过来 叫设备文件浏览器。单击该标签按钮，此时主界面右边弹出名为“Device File Explorer”的窗口，如图6-6 所示。

<img src="/androidImages/image-20230801181344541.png" alt="image-20230801181344541" style="zoom:80%;" />

在图6-6的窗口中依次展开各级目录，进到/data/data/com.example.chapter06/shared_prefs目录，在 该目录下看到了参数文件share.xml。右击share.xml，并在右键菜单中选择“Save As”，把该文件保存到 电脑中，之后就能查看详细的文件内容了。不仅参数文件，凡是保存在“/data/data/应用包名/”下面的所 有文件，均可利用设备浏览器导出至电脑，下一节将要介绍的数据库db文件也可按照以上步骤导出。



## 数据库SQLite

数据库存储方式—SQLite的使用方法，包括：SQLite用到了哪些SQL语法，如何使用 数据库管理器操纵SQLite，如何使用数据库帮助器简化数据库操作等，以及如何利用SQLite改进登录页 面的记住密码功能。


### SQL的基本语法

SQL本质上是一种编程语言，它的学名叫作“结构化查询语言”（全称为Structured Query Language，简 称SQL）。不过SQL语言并非通用的编程语言，它专用于数据库的访问和处理，更像是一种操作命令， 所以常说SQL语句而不说SQL代码。标准的SQL语句分为3类：数据定义、数据操纵和数据控制，但不同 的数据库往往有自己的实现。

SQLite是一种小巧的嵌入式数据库，使用方便、开发简单。如同MySQL、Oracle那样，SQLite也采用 SQL语句管理数据，由于它属于轻型数据库，不涉及复杂的数据控制操作，因此App开发只用到数据定 义和数据操纵两类SQL。此外，SQLite的SQL语法与通用的SQL语法略有不同，接下来介绍的两类SQL语 法全部基于SQLite。

**1．数据定义语言**

数据定义语言全称Data Definition Language，简称DDL，它描述了怎样变更数据实体的框架结构。就 SQLite而言，DDL语言主要包括3种操作：创建表格、删除表格、修改表结构，分别说明如下。

（1）创建表格

表格的创建动作由create命令完成，格式为“CREATE TABLE IF NOT EXISTS　表格名称（以逗号 分隔的各字段定义）；”。以用户信息表为例，它的建表语句如下所示：

```sql
CREATE TABLE IF NOT EXISTS user_info (
     _id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
     name VARCHAR NOT NULL,
     age INTEGER NOT NULL,
     height LONG NOT NULL,
     weight FLOAT NOT NULL,
     married INTEGER NOT NULL,
     update_time VARCHAR NOT NULL);
```

上面的SQL语法与其他数据库的SQL语法有所出入，相关的注意点说明见下：

①SQL语句不区分大小写，无论是create与table这类关键词，还是表格名称、字段名称，都不区分大小 写。唯一区分大小写的是被单引号括起来的字符串值。 

②为避免重复建表，应加上IF NOT EXISTS关键词，例如CREATE TABLE IF NOT EXISTS　表格名 称…… 

③SQLite支持整型INTEGER、长整型LONG、字符串VARCHAR、浮点数FLOAT，但不支持布尔类型。布 尔类型的数据要使用整型保存，如果直接保存布尔数据，在入库时SQLite会自动将它转为0或1，其中0 表示false，1表示true。 

④建表时需要唯一标识字段，它的字段名为id。创建新表都要加上该字段定义，例如id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL。 



（2）删除表格 表格的删除动作由drop命令完成，格式为“DROP TABLE IF EXISTS　表格名称;”。下面是删除用户 信息表的SQL语句例子：

```sql
DROP TABLE IF EXISTS user_info;
```

（3）修改表结构 

表格的修改动作由alter命令完成，格式为“ALTER TABLE　表格名称　修改操作;”。不过SQLite只支持 增加字段，不支持修改字段，也不支持删除字段。对于字段增加操作，需要在alter之后补充add命令， 具体格式如“ALTER TABLE　表格名称　ADD COLUMN　字段名称　字段类型;”。下面是给用户信息表 增加手机号字段的SQL语句例子：

```sql
ALTER TABLE user_info ADD COLUMN phone VARCHAR;
```

注意，SQLite的ALTER语句每次只能添加一列字段，若要添加多列，就得分多次添加。

2．数据操纵语言

数据操纵语言全称Data Manipulation Language，简称DML，它描述了怎样处理数据实体的内部记录。 表格记录的操作类型包括添加、删除、修改、查询4类，分别说明如下：

（1）添加记录

记录的添加动作由insert命令完成，格式为“INSERT INTO　表格名称（以逗号分隔的字段名列表）　 VALUES　（以逗号分隔的字段值列表）；”。下面是往用户信息表插入一条记录的SQL语句例子：

```sql
INSERT INTO user_info (name,age,height,weight,married,update_time)
VALUES ('张三',20,170,50,0,'20200504');
```

（2）删除记录

记录的删除动作由delete命令完成，格式为“DELETE FROM　表格名称　WHERE　查询条件;”，其中查 询条件的表达式形如“字段名=字段值”，多个字段的条件交集通过“AND”连接，条件并集通过“OR”连接。 下面是从用户信息表删除指定记录的SQL语句例子：

```sql
DELETE FROM user_info WHERE name='张三';
```

（3）修改记录

记录的修改动作由update命令完成，格式为“UPDATE　表格名称　SET　字段名=字段值 WHERE　查询 条件;”。下面是对用户信息表更新指定记录的SQL语句例子：

```sql
UPDATE user_info SET married=1 WHERE name='张三';
```

（4）查询记录

记录的查询动作由select命令完成，格式为“SELECT　以逗号分隔的字段名列表　FROM　表格名称　 WHERE　查询条件;”。如果字段名列表填星号“*”，则表示查询该表的所有字段。下面是从用户信息表查 询指定记录的SQL语句例子：

```sql
SELECT name FROM user_info WHERE name='张三';
```

查询操作除了比较字段值条件之外，常常需要对查询结果排序，此时要在查询条件后面添加排序条件， 对应的表达式为“ORDER BY　字段名　ASC或者DESC”，意指对查询结果按照某个字段排序，其中ASC 代表升序，DESC代表降序。下面是查询记录并对结果排序的SQL语句例子：

```sql
SELECT * FROM user_info ORDER BY age ASC;
```

如果读者之前不熟悉SQL语法，建议下载一个SQLite管理软件，譬如SQLiteStudio，先在电脑上多加练 习SQLite的常见操作语句。



### 数据库管理器SQLiteDatabase

SQL语句毕竟只是SQL命令，若要在Java代码中操纵SQLite，还需专门的工具类。SQLiteDatabase便是 Android提供的SQLite数据库管理器，开发者可以在活动页面代码调用openOrCreateDatabase方法获 取数据库实例，参考代码如下：

```java
// 创建名为test.db的数据库。数据库如果不存在就创建它，如果存在就打开它
SQLiteDatabase db = openOrCreateDatabase(getFilesDir() + "/test.db",
Context.MODE_PRIVATE, null);
String desc = String.format("数据库%s创建%s", db.getPath(), (db!=null)?"成功":"失败");
tv_database.setText(desc);
// deleteDatabase(getFilesDir() + "/test.db"); // 删除名为test.db数据库
```

首次运行测试App，调用openOrCreateDatabase方法会自动创建数据库，并返回该数据库的管理器实 例，创建结果如图6-7所示。

![image-20230801182539415](/androidImages/image-20230801182539415.png)


获得数据库实例之后，就能对该数据库开展各项操作了。数据库管理器SQLiteDatabase提供了若干操作 数据表的API，常用的方法有3类，列举如下：

1．管理类，用于数据库层面的操作 

- openDatabase：打开指定路径的数据库。 
- isOpen：判断数据库是否已打开。
- close：关闭数据库。 
- getVersion：获取数据库的版本号。 
- setVersion：设置数据库的版本号。

2．事务类，用于事务层面的操作 

- beginTransaction：开始事务。 
- setTransactionSuccessful：设置事务的成功标志。 
- endTransaction：结束事务。执行本方法时，系统会判断之前是否调用了 
- setTransactionSuccessful方法，如果之前已调用该方法就提交事务，如果没有调用该方法就回滚事务。

3．数据处理类，用于数据表层面的操作 

execSQL：执行拼接好的SQL控制语句。一般用于建表、删表、变更表结构。 

delete：删除符合条件的记录。 

update：更新符合条件的记录信息。 

insert：插入一条记录。 query：执行查询操作，并返回结果集的游标。 

rawQuery：执行拼接好的SQL查询语句，并返回结果集的游标。

在实际开发中，比较经常用到的是查询语句，建议先写好查询操作的select语句，再调用rawQuery方法 执行查询语句。



### 数据库帮助器SQLiteOpenHelper

由于SQLiteDatabase存在局限性，一不小心就会重复打开数据库，处理数据库的升级也不方便；因此 Android提供了数据库帮助器SQLiteOpenHelper，帮助开发者合理使用SQLite。

SQLiteOpenHelper的具体使用步骤如下： 

步骤一，新建一个继承自SQLiteOpenHelper的数据库操作类，按提示重写onCreate和onUpgrade两个 方法。其中，onCreate方法只在第一次打开数据库时执行，在此可以创建表结构；而onUpgrade方法在 数据库版本升高时执行，在此可以根据新旧版本号变更表结构。

 步骤二，为保证数据库安全使用，需要封装几个必要方法，包括获取单例对象、打开数据库连接、关闭 数据库连接，说明如下：

- 获取单例对象：确保在App运行过程中数据库只会打开一次，避免重复打开引起错误。 
- 数据库连接：SQLite有锁机制，即读锁和写锁的处理；故而数据库连接也分两种，读连接可调 用getReadableDatabase方法获得，写连接可调用getWritableDatabase获得。 
- 关闭数据库连接：数据库操作完毕，调用数据库实例的close方法关闭连接。

步骤三， 提供对表记录增加、删除、修改、查询的操作方法。

能被SQLite直接使用的数据结构是ContentValues类，它类似于映射Map，也提供了put和get方法存取 键值对。区别之处在于：ContentValues的键只能是字符串，不能是其他类型。ContentValues主要用于 增加记录和更新记录，对应数据库的insert和update方法。


记录的查询操作用到了游标类Cursor，调用query和rawQuery方法返回的都是Cursor对象，若要获取全 部的查询结果，则需根据游标的指示一条一条遍历结果集合。Cursor的常用方法可分为3类，说明如下：

1．游标控制类方法，用于指定游标的状态 

- close：关闭游标。 
- isClosed：判断游标是否关闭。 
- isFirst：判断游标是否在开头。 
- isLast：判断游标是否在末尾。

2．游标移动类方法，把游标移动到指定位置

- moveToFirst：移动游标到开头。 
- moveToLast：移动游标到末尾。 
- moveToNext：移动游标到下一条记录。 
- moveToPrevious：移动游标到上一条记录。 
- move：往后移动游标若干条记录。 
- moveToPosition：移动游标到指定位置的记录。

3．获取记录类方法，可获取记录的数量、类型以及取值

- getCount：获取结果记录的数量。 
- getInt：获取指定字段的整型值。 
- getLong：获取指定字段的长整型值。 
- getFloat：获取指定字段的浮点数值。 
- getString：获取指定字段的字符串值。 
- getType：获取指定字段的字段类型。

鉴于数据库操作的特殊性，不方便单独演示某个功能，接下来从创建数据库开始介绍，完整演示一下数 据库的读写操作。用户注册信息的演示页面包括两个，分别是记录保存页面和记录读取页面，其中记录 保存页面通过insert方法向数据库添加用户信息


运行测试App，先打开记录保存页面，依次录入并将两个用户的注册信息保存至数据库，如图6-8和图6- 9所示。再打开记录读取页面，从数据库读取用户注册信息并展示在页面上，如图6-10所示。

![image-20230801204818759](/androidImages/image-20230801204818759.png)

![image-20230801204835960](/androidImages/image-20230801204835960.png)

![image-20230801204853582](/androidImages/image-20230801204853582.png)

上述演示页面主要用到了数据库记录的添加、查询和删除操作，对应的数据库帮助器关键代码如下所 示，尤其关注里面的insert、delete、update和query方法：

```java
public class UserDBHelper extends SQLiteOpenHelper {

    /**
     * 创建数据库分为两个步骤
     *  1、编写一个类继承 SQLiteOpenHelper 重写 onCreate 和 onUpgrade 两个方法
     *  2、创建一个构造方法，调用父类的构造方法，传入 Context，数据库名称，null，数据库版本号
     *  3、编写一个 sql execSQL 在 create 方法中  db.execSQL(写好的sql语句)，数据库就创建好了
     *
     * 连接数据库(在创建好数据库的基础之上)分为
     *  1、获得构造方法 new UserDBHelper(Context对象);
     *  2、通过类名调用 getReadableDatabase(); 获得 SQLiteDatabase 对象
     *  3、执行inert方法传入：参数一：数据表名，参数二：null(如果你使用的ContextValues)，参数三：ContentValues对象
     *      ContextValues对象中的put()方法是传输map集合的数据，也就是你要往数据库插入的数据
     *  4、关闭数据库连接
     */
    private final static String DB_NAME = "user.db";

    private final static String TABLE_NAME = "user_info";
    private final static int DB_VERSION = 2;

    private static UserDBHelper mHelper = null;

    //创建一个读取对象，因为是单例模式，所有的东西都是要分开的
    private SQLiteDatabase mRDB = null;
    private SQLiteDatabase mWDB = null;
    private UserDBHelper(Context ct) {
        super(ct, DB_NAME, null,DB_VERSION);
    }

    //利用单例模式获取数据库帮助器的唯一实例
    public static UserDBHelper getInstance(Context ct){
        // 判断是否等于 null 并向构造方式赋值
        if (mHelper == null){
            mHelper = new UserDBHelper(ct);
        }
        return mHelper;
    }

    //打开数据库的读连接
    public SQLiteDatabase openReadLink(){
        //判断是否为空，或者是否为打开状态
        if (mRDB == null || !mRDB.isOpen()){
            mRDB = mHelper.getReadableDatabase();
        }
        return mRDB;
    }

    //打开数据库的写连接
    public SQLiteDatabase openWriterLink(){
        //判断是否为空，或者是否为打开状态
        if (mWDB == null || !mWDB.isOpen()){
            mWDB = mHelper.getWritableDatabase();
        }
        return mWDB;
    }

    //关闭数据库
    public void closeLink(){
        if (mRDB != null && mRDB.isOpen()){
            mRDB.close();
            //置为空有利于垃圾回收
            mRDB = null;
        }
        if (mWDB != null && mWDB.isOpen()){
            mWDB.close();
            mWDB = null;
        }
    }

    //刚开始创建的时候会调用此方法
    @Override
    public void onCreate(SQLiteDatabase db) {
        //创建表
        String sql = "CREATE TABLE "+TABLE_NAME+"(" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
                "name VARCHAR NOT NULL," +
                "age INTEGER NOT NULL," +
                "height INTEGER NOT NULL," +
                "weight INTEGER NOT NULL," +
                "married INTEGER NOT NULL ); ";

        //执行语句
        db.execSQL(sql);
    }

    public long insert(User user){
        ContentValues values = new ContentValues();
        values.put("name",user.getName());
        values.put("age",user.getAge());
        values.put("height",user.getHeight());
        values.put("weight",user.getWeight());
        values.put("married",user.getMarried());
        try{
            //开启事务
            mWDB.beginTransaction();

            //第二个参数是：如果有一列为空，为了保证完整性，会让填字段
            mWDB.insert(TABLE_NAME,null,values);
//            int i = 10/0;
            long insertResult = mWDB.insert(TABLE_NAME, null, values);
            //事务成功
            mWDB.setTransactionSuccessful();
            return insertResult;
        }catch (Exception e){
            e.fillInStackTrace();
        }finally {
            //结束事务
            mWDB.endTransaction();
        }

        return -1;
    }

    //删除
    public int delete(){

        try{
            //开启事务
            mWDB.beginTransaction();

            //参数一：表名，参数二：条件，参数三：条件赋值
            //条件 1=1 代表全部删除
            int deleteResult = mWDB.delete(TABLE_NAME, "1=1", null);
            //事务成功
            mWDB.setTransactionSuccessful();
            return deleteResult;
        }catch (Exception e){
            e.fillInStackTrace();
        }finally {
            //结束事务
            mWDB.endTransaction();
        }

        return -1;
    }

    //修改
    public int modifyByName(User user){
        //参数一：表名，参数二，ContentValues对象，参数三：修改条件，参数四：修改条件的值
        ContentValues values = new ContentValues();
        values.put("name",user.getName());
        values.put("age",user.getAge());
        values.put("height",user.getHeight());
        values.put("weight",user.getWeight());
        values.put("married",user.getMarried());
        try{
            //开启事务
            mWDB.beginTransaction();

            int updateResult = mWDB.update(TABLE_NAME, values, "name=?", new String[]{user.getName()});
            //事务成功
            mWDB.setTransactionSuccessful();
            return updateResult;
        }catch (Exception e){
            e.fillInStackTrace();
        }finally {
            mWDB.endTransaction();
        }

        return -1;
    }

    //查询所有
    public List<User> queryAll(){
        List<User> userList = new ArrayList<>();
        /**
         * table：表名。相当于select语句from关键字后面的部分。如果是多表联合查询，可以用逗号将两个表名分开。
         * columns：要查询出来的列名。格式为：new String[] {”列名“，”列名"}。
         *      相当于select语句select关键字后面的部分，当填入null或者new String[] {”*“}则表示查询所有列。
         * selection：查询条件子句，相当于select语句where关键字后面的部分。
         *      格式为：“列名 = ？and 列名 = ？” ，列名之间是使用and衔接，而非逗号。
         * selectionArgs：对应于selection语句中占位符的值，通俗的讲就是对应参数四中的”？“，
         *      表示所选中列需要查询的数值，数值必须与参数四中列名相对应，位置一致。
         * groupBy：分组。相当于select语句group by关键字后面的部分，
         *      传入列名即可，表格会按照列的不同值对数据进行分组。
         * having：排除。相当于select语句having关键字后面的部分，排除不满足条件的列，
         *      一般结合参数五进行使用，格式如：“列名 > 3” ,表示排除这列小于3的数据。
         * orderBy：排序。相当于select语句order by关键字后面的部分，指定列进行排序，如填入“列名”,则按照该列的值从小到大排列。
         */
        //返回一个游标类似与 jdbc 中的 ResultSet
        Cursor cursor = mRDB.query(TABLE_NAME, null, null, null, null, null, null);
        while (cursor.moveToNext()){
            User user = new User();
            user.setId(cursor.getInt(0));
            user.setName(cursor.getString(1));
            user.setAge(cursor.getInt(2));
            user.setHeight(cursor.getLong(3));
            user.setWeight(cursor.getFloat(4));
            //SQLite 没有 boolean 类型的值 用 0 表示 false ，1表示true
            user.setMarried(cursor.getInt(5)==0?false:true);
            userList.add(user);
        }
        return userList;
    }

    //根据姓名查询
    public List<User> queryByName(String name){
        List<User> userList = new ArrayList<>();
        //返回一个游标类似与 jdbc 中的 ResultSet
        Cursor cursor = mRDB.query(TABLE_NAME, null, "name=?", new String[]{name}, null, null, null);
        while (cursor.moveToNext()){
            User user = new User();
            user.setId(cursor.getInt(0));
            user.setName(cursor.getString(1));
            user.setAge(cursor.getInt(2));
            user.setHeight(cursor.getLong(3));
            user.setWeight(cursor.getFloat(4));
            //SQLite 没有 boolean 类型的值 用 0 表示 false ，1表示true
            user.setMarried(cursor.getInt(5)==0?false:true);
            userList.add(user);
        }
        return userList;
    }

    //版本更新会调用此方法
    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        //向数据库增加两个字段
        String sql = "ALTER TABLE "+TABLE_NAME+" ADD COLUMN iphone VARCHAR;";
        db.execSQL(sql);
        sql = "ALTER TABLE "+TABLE_NAME+" ADD COLUMN password VARCHAR";
        db.execSQL(sql);
    }
}
```



## 存储卡的文件操作

本节介绍Android的文件存储方式—在存储卡上读写文件，包括：公有存储空间与私有存储空间有什么 区别、如何利用存储卡读写文本文件、如何利用存储卡读写图片文件等。


### 私有存储空间与公共存储空间

为了更规范地管理手机存储空间，Android从7.0开始将存储卡划分为私有存储和公共存储两大部分，也 就是分区存储方式，系统给每个App都分配了默认的私有存储空间。App在私有空间上读写文件无须任 何授权，但是若想在公共空间读写文件，则要在AndroidManifest.xml里面添加下述的权限配置。

```xml
<!-- 存储卡读写 -->
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAG" />
```

android版本大于30时，部署的APP出现明明在manifest清单中罗列了需要的存储权限，也通过requestPermissions动态申请到了权限，到手机设置 - 应用管理 - 权限管理中查看，APP也赋予了相应存储权限，但是就是新建文件、创建文件夹失败。

- 在application节点新增旧的存储模式的申明

```xml
android:requestLegacyExternalStorage="true"
```

但是即使App声明了完整的存储卡操作权限，系统仍然默认禁止该App访问公共空间。打开手机的系统 设置界面，进入到具体应用的管理页面，会发现该应用的存储访问权限被禁止了，如图6-13所示。

<img src="/androidImages/image-20230801205434560.png" alt="image-20230801205434560" style="zoom:80%;" />

当然图示的禁止访问只是不让访问存储卡的公共空间，App自身的私有空间依旧可以正常读写。这缘于 Android把存储卡分成了两块区域，一块是所有应用均可访问的公共空间，另一块是只有应用自己才可 访问的专享空间。虽然Android给每个应用都分配了单独的安装目录，但是安装目录的空间很紧张，所 以Android在存储卡的“Android/data”目录下给每个应用又单独建了一个文件目录，用来保存应用自己 需要处理的临时文件。这个目录只有当前应用才能够读写文件，其他应用是不允许读写的。由于私有空 间本身已经加了访问权限控制，因此它不受系统禁止访问的影响，应用操作自己的文件目录自然不成问 题。因为私有的文件目录只有属主应用才能访问，所以一旦属主应用被卸载，那么对应的目录也会被删掉。

既然存储卡分为公共空间和私有空间两部分，它们的空间路径获取也就有所不同。若想获取公共空间的 存储路径，调用的是Environment.getExternalStoragePublicDirectory方法；若想获取应用私有空间的存储路径，调用的是getExternalFilesDir方法。下面是分别获取两个空间路径的代码例子：

```java
// 获取系统的公共存储路径
String publicPath = Environment.getExternalStoragePublicDirectory
     (Environment.DIRECTORY_DOWNLOADS).toString();
// 获取当前App的私有存储路径
String privatePath = getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS).toString();
boolean isLegacy = true;
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
     // Android10的存储空间默认采取分区方式，此处判断是传统方式还是分区方式
     isLegacy = Environment.isExternalStorageLegacy();
}
String desc = "系统的公共存储路径位于" + publicPath +"\n\n当前App的私有存储路径位于"
     + privatePath +"\n\nAndroid7.0之后默认禁止访问公共存储目录" +
	"\n\n当前App的存储空间采取" + (isLegacy?"传统方式":"分区方式");
tv_path.setText(desc);
```


该例子运行之后获得的路径信息如图6-14所示，可见应用的私有空间路径位于“存储卡根目 录/Android/data/应用包名/files/Download”这个目录中。

<img src="/androidImages/image-20230801205630969.png" alt="image-20230801205630969" style="zoom:80%;" />

### 在存储卡上读写文本文件

文本文件的读写借助于文件IO流FileOutputStream和FileInputStream。其中，FileOutputStream用于 写文件，FileInputStream用于读文件，它们读写文件的代码例子如下：

```java
// 把字符串保存到指定路径的文本文件
public static void saveText(String path, String txt) {
     // 根据指定的文件路径构建文件输出流对象
     try (FileOutputStream fos = new FileOutputStream(path)) {
     	fos.write(txt.getBytes()); // 把字符串写入文件输出流
     } catch (Exception e) {
     	e.printStackTrace();
     }
}

// 从指定路径的文本文件中读取内容字符串
public static String openText(String path) {
     String readStr = "";
     // 根据指定的文件路径构建文件输入流对象
     try (FileInputStream fis = new FileInputStream(path)) {
          byte[] b = new byte[fis.available()];
          fis.read(b); // 从文件输入流读取字节数组
          readStr = new String(b); // 把字节数组转换为字符串
     } catch (Exception e) {
     	e.printStackTrace();
     }
     return readStr; // 返回文本文件中的文本字符串
}
```

接着分别创建写文件页面和读文件页面，其中写文件页面调用saveText方法保存文本，而读文件页面调用 readText方法从指定路径的文件中读取文本内容


java代码：

```java
public class FileIOActivity extends AppCompatActivity implements View.OnClickListener {

    private EditText et_name;
    private EditText et_age;
    private EditText et_height;
    private EditText et_weight;
    private CheckBox cb_married;
    private String path;
    private TextView tv_txt;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_file_io);
        et_name = findViewById(R.id.et_name);
        et_age = findViewById(R.id.et_age);
        et_height = findViewById(R.id.et_height);
        et_weight = findViewById(R.id.et_weight);
        cb_married = findViewById(R.id.cb_married);
        findViewById(R.id.btn_write).setOnClickListener(this);
        findViewById(R.id.btn_read).setOnClickListener(this);
        tv_txt = findViewById(R.id.tv_txt);
    }

    @Override
    public void onClick(View v) {
        //点击了保存
        if (v.getId() == R.id.btn_write) {
            String name = et_name.getText().toString();
            int age = Integer.parseInt(et_age.getText().toString());
            String height = et_height.getText().toString();
            String weight = et_weight.getText().toString();
            boolean married = cb_married.isChecked();
            StringBuilder sb = new StringBuilder();
            sb.append("姓名：" + name)
                    .append("\n年龄：" + age)
                    .append("\n身高：" + height)
                    .append("\n体重：" + weight)
                    .append("\n婚否：" + married);

            String directory = null;
            /**
             * 私有空间 app 一删除，私有空间的数据也会随之消失，而公共空间的数据不会
             */
            //外部存储的私有空间 外部空间的 /storage/emulated/0/Android/data/com.example.chapter06/files/Download/1690862150331.txt
            directory = getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS).toString();
            //外部存储的公共空间 /storage/emulated/0/Download/1690862460689.txt
            /**
             * 如果要使用外部存储公共空间的话，还应该在 AndroidManifest.xml中添加获取权限
             * <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
             * <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
             * android:requestLegacyExternalStorage="true"：在application标签里加
             */
            directory = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS).toString();
            //内部存储私有空间 /data/user/0/com.example.chapter06/files/1690862946909.txt
            directory = getFilesDir().toString();
            String fileName = System.currentTimeMillis() + ".txt";
            path = directory + File.separatorChar + fileName;
            FileIoUtil.saveText(path, sb.toString());
            ToastUtils.show(this, "保存成功！");
            Log.d("TAG", path);
        }
        //点击了读取
        if (v.getId() == R.id.btn_read) {
            tv_txt.setText(FileIoUtil.readText(path));
        }
    }
}
```

<div style="page-break-after: always;"></div>

然后运行测试App，先打开文本写入页面，录入注册信息后保存为私有目录里的文本文件，此时写入界 面如图6-15所示。再打开文本读取页面，App自动在私有目录下找到文本文件列表，并展示其中一个文 件的文本内容，此时读取界面如图6-16所示。

<img src="/androidImages/image-20230801210138493.png" alt="image-20230801210138493" style="zoom:80%;" />

<img src="/androidImages/image-20230801210151910.png" alt="image-20230801210151910" style="zoom:80%;" />


### 在存储卡上读写图片文件

文本文件读写可以转换为对字符串的读写，而图片文件保存的是图像数据，需要专门的位图工具Bitmap 处理。位图对象依据来源不同又分成3种获取方式，分别对应位图工厂BitmapFactory的下列3种方法：

- decodeResource：从指定的资源文件中获取位图数据。例如下面代码表示从资源文件huawei.png 获取位图对象：

```java
Bitmap bitmap = BitmapFactory.decodeResource(getResources(),R.drawable.huawei);
```

- decodeFile：从指定路径的文件中获取位图数据。注意从Android 10开始，该方法只适用于私有目 录下的图片，不适用公共空间下的图片。 
- decodeStream：从指定的输入流中获取位图数据。比如使用IO流打开图片文件，此时文件输入流 对象即可作为decodeStream方法的入参，相应的图片读取代码如下：

```java
// 从指定路径的图片文件中读取位图数据
public static Bitmap openImage(String path) {
	Bitmap bitmap = null; // 声明一个位图对象
	// 根据指定的文件路径构建文件输入流对象
	try (FileInputStream fis = new FileInputStream(path)) {
		bitmap = BitmapFactory.decodeStream(fis); // 从文件输入流中解码位图数据
	} catch (Exception e) {
		e.printStackTrace();
	}
	return bitmap; // 返回图片文件中的位图数据
}
```

得到位图对象之后，就能在图像视图上显示位图。图像视图ImageView提供了下列方法显示各种来源的 图片：

- setImageResource：设置图像视图的图片资源，该方法的入参为资源图片的编号，形如 “R.drawable.去掉扩展名的图片名称”。 
- setImageBitmap：设置图像视图的位图对象，该方法的入参为Bitmap类型。 
- setImageURI：设置图像视图的路径对象，该方法的入参为Uri类型。字符串格式的文件路径可通过 代码“Uri.parse(file_path)”转换成路径对象。

读取图片文件的花样倒是挺多，把位图数据写入图片文件却只有一种，即通过位图对象的compress方法 将位图数据压缩到文件输出流。具体的图片写入代码如下所示：

```java
// 把位图数据保存到指定路径的图片文件
public static void saveImage(String path, Bitmap bitmap) {
     // 根据指定的文件路径构建文件输出流对象
     try (FileOutputStream fos = new FileOutputStream(path)) {
          // 把位图数据压缩到文件输出流中
          bitmap.compress(Bitmap.CompressFormat.JPEG, 80, fos);
     } catch (Exception e) {
     	e.printStackTrace();
     }
}
```

接下来完整演示一遍图片文件的读写操作，首先创建图片写入页面，从某个资源图片读取位图数据，再 把位图数据保存为私有目录的图片文件，相关代码示例如下：

```java
// 获取当前App的私有下载目录
String path = getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS).toString() +
"/";
// 从指定的资源文件中获取位图对象
Bitmap bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.huawei);
String file_path = path + DateUtil.getNowDateTime("") + ".jpeg";
FileUtil.saveImage(file_path, bitmap); // 把位图对象保存为图片文件
tv_path.setText("图片文件的保存路径为：\n" + file_path);
```

然后创建图片读取页面，从私有目录找到图片文件，并挑出一张在图像视图上显示，相关代码示例如下：

```java
// 获取当前App的私有下载目录
mPath = getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS).toString() + "/";
// 获得指定目录下面的所有图片文件
mFilelist = FileUtil.getFileList(mPath, new String[]{".jpeg"});
if (mFilelist.size() > 0) {
     // 打开并显示选中的图片文件内容
     String file_path = mFilelist.get(0).getAbsolutePath();
     tv_content.setText("找到最新的图片文件，路径为"+file_path);
     // 显示存储卡图片文件的第一种方式：直接调用setImageURI方法
     //iv_content.setImageURI(Uri.parse(file_path)); // 设置图像视图的路径对象
     // 第二种方式：先调用BitmapFactory.decodeFile获得位图，再调用setImageBitmap方法
     //Bitmap bitmap = BitmapFactory.decodeFile(file_path);
     //iv_content.setImageBitmap(bitmap); // 设置图像视图的位图对象
     // 第三种方式：先调用FileUtil.openImage获得位图，再调用setImageBitmap方法
     Bitmap bitmap = FileUtil.openImage(file_path);
     iv_content.setImageBitmap(bitmap); // 设置图像视图的位图对象
}
```

运行测试App，先打开图片写入页面，点击保存按钮把资源图片保存到存储卡，此时写入界面如图6-17 所示。再打开图片读取页面，App自动在私有目录下找到图片文件列表，并展示其中一张图片，此时读 取界面如图6-18所示。

<img src="/androidImages/image-20230801210531912.png" alt="image-20230801210531912" style="zoom:80%;" />

<img src="/androidImages/image-20230801210547314.png" alt="image-20230801210547314" style="zoom:80%;" />


## 应用组件Application

本节介绍Android重要组件Application的基本概念和常见用法。首先说明Application的生命周期贯穿了 App的整个运行过程，接着利用Application实现App全局变量的读写，然后阐述了如何借助App实例来 操作Room数据库框架。


### 1、什么是Application？

Application和Activity,Service一样,是Android框架的一个系统组件，当Android程序启动时系统会创建一Application 对象，用来存储系统的一些信息。

通常我们是不需要指定一个Application的，这时系统会自动帮我们创建，如果需要创建自己的Application，也很简单。创建一个类AppApplication继承Application并在AndroidManifest的application标签中进行注册(只需要给application 标签增加个name属性把自己的Application的名字写入即可)。

Android系统会为每个程序运行时创建一个Application类的对象且仅创建一个（打开微信安卓系统会为微信创建一个Application对象，再打开微博安卓系统又会为微博创建一个Application对象），所以Application可以说是单例 (singleton)模式的一个类，且Application对象的生命周期是整个程序中最长的，它的生命周期就等于这个程序的生命周期。因为它是全局的单例的，所以在不同的Activity,Service中获得的Application对象都是同一个对象。所以可以通过Application来进行一些，数据传递，数据共享,数据缓存等操作。

Application对象的生命周期是整个程序中最长的，它的生命周期就等于这个程序的生命周期。因为它是全局的单例 的，所以在不同的Activity,Service中获得的Application对象都是同一个对象。所以可以通过Application来进行一些，数据传递，数据共享,数据缓存等操作。


### 2、通过Application传递数据

假如有一个Activity A, 跳转到 Activity B ,并需要传递一些数据，通常的作法是Intent.putExtra()让Intent携带，或者有 一个Bundle把信息加入Bundle让Intent推荐Bundle对象，实现传递。但这样作有一个问题在于，Intent和Bundle所能携 带的数据类型都是一些基本的数据类型，如果想实现复杂的数据传递就比较麻烦了，通常需要实现Serializable或者
Parcellable接口。这其实是Android的一种IPC数据传递的方法。如果我们的两个Activity在同一个进程当中为什么还要
这么麻烦呢，只要把需要传递的对象的引用传递过去就可以了。

基本思路是这样的。在Application中创建一个HashMap ，以字符串为索引，Object为value这样我们的HashMap就可 以存储任何类型的对象了。
在Activity A中把需要传递的对象放入这个HashMap，然后通过Intent或者其它途经再把这索引的字符串传递给Activity B ,Activity B 就可以根据这个字符串在HashMap中取出这个对象了。只要再向下转个型 ，就实现对象的传递。


### 3、Application数据共享

多个组件之间数据共享。举例：两个Activity之间数据共享
Application 对同一个应用程序是唯一的，所以可以使用Application进行数据共享。


### 4、Application数据缓存

　　  我一般会习惯在Application中建立两个HashMap一个用于数据的传递，一个用于缓存一些数据。
比如有一个Activity需要从网站获取一些数据，获取完之后我们就可以把这个数据cache到Application当中，
当页面设置到其它Activity再回来的时候，就可以直接使用缓存好的数据了。但如果需要cache一些大量的数据，
最好是cache一些 (软引用)SoftReference ，并把这些数据cache到本地rom上或者sd卡上。
如果在application中的缓存不存在，从本地缓存查找，如果本地缓存的数据也不存在再从网络上获取。

### 5、易导致的错误

使用Application如果保存了一些不该保存的对象很容易导致内存泄漏。
如果在Application的onCreate中执行比较耗时的操作，将直接影响程序的启动时间。
一些清理工作不能依靠onTerminate完成，因为android会尽量让你的程序一直运行，所以很有可能onTerminate()方法 不会被调用。


### Application的生命周期

Application是Android的一大组件，在App运行过程中有且仅有一个Application对象贯穿应用的整个生 命周期。打开AndroidManifest.xml，发现activity节点的上级正是application节点，不过该节点并未指 定name属性，此时App采用默认的Application实例。

注意到每个activity节点都指定了name属性，譬如常见的name属性值为.MainActivity，让人知晓该 activity的入口代码是MainActivity.java。现在尝试给application节点加上name属性，看看其庐山真面 目，具体步骤说明如下： 

（1）打开AndroidManifest.xml，给application节点加上name属性，表示application的入口代码是 MainApplication.java。修改后的application节点示例如下：

```xml
<application
     android:name=".MainApplication"
	android:icon="@mipmap/ic_launcher"
     android:label="@string/app_name"
     android:theme="@style/AppTheme">
```

（2）在Java代码的包名目录下创建MainApplication.java，要求该类继承Application，继承之后可供重写的方法主要有以下3个，加粗斜体表示。

- ***onCreate***：在App启动时调用。 
- ***onTerminate***：在App终止时调用（按字面意思）。 在模拟环境下执行。当终止应用程序对象时调用，不保证一定被调用，当程序是被内核终止以便为其他应用程序释放资源，那么将不会提醒，并且不调用应用程序Application对象的onTerminate方法而直接终止进程。（一般是在做系统开发的时候该函数会被调用，但是开发者发布运行不会被调用）
- ***onConfigurationChanged***：在配置改变时调用，例如从竖屏变为横屏。
- onTrimMemory（int level）程序在进行内存清理时执行

- onLowMemory（） 低内存的时候执行好的应用程序一般会在这个方法里面释放一些不必要的资源，来应付当后台程序已经终止，前台应用程序内存还不够时的情况。

光看字面意思的话，与生命周期有关的方法是onCreate和onTerminate，那么重写这两个方法，并在重 写后的方法中打印日志，修改后的Java代码如下所示：

```java
public class MainApplication extends Application {

     @Override
     public void onCreate() {
     	super.onCreate();
     	Log.d(TAG, "onCreate");
     }
     
     @Override
     public void onTerminate() {
     	super.onTerminate();
     	Log.d(TAG, "onTerminate");
     }	
     
}
```

运行测试App，在logcat窗口观察应用日志。但是只在启动一开始看到MainApplication的 onCreate日志（该日志先于MainActivity的onCreate日志），却始终无法看到它的onTerminate日志， 无论是自行退出App还是强行杀掉App，日志都不会打印onTerminate。

无论你怎么折腾，这个onTerminate日志都不会出来。Android明明提供了这个方法，同时提供了关于 该方法的解释，说明文字如下：This method is for use in emulated process environments．It will never be called on a production Android device, where processes are removed by simply killing them; no user code (including this callback) is executed when doing so。这段话的意思是：该方法 供模拟环境使用，它在真机上永远不会被调用，无论是直接杀进程还是代码退出；执行该操作时，不会 执行任何用户代码。 现在很明确了，onTerminate方法就是个摆设，中看不中用。如果读者想在App退出前回收系统资源， 就不能指望onTerminate方法的回调了。


### onLowMemory和OnTrimMemory

##### 1、OnLowMemory

OnLowMemory是Android提供的API，在系统内存不足，所有后台程序（优先级为background的进程，不是指后台运行的进程）都被杀死时，系统会调用OnLowMemory。

系统提供的回调有：Application/Activity/Fragment/Service/ContentProvider

除了上述系统提供的API，还可以自己实现ComponentCallbacks，通过API注册，这样也能得到OnLowMemory回调。 例如：

```java
public static class MyCallback implements ComponentCallbacks { 
     @Override
     public void onConfigurationChanged(Configuration arg) { 
          
     }

     @Override
     public void onLowMemory() {
     	//do release operation
     }
} 
```

然后，通过Context.registerComponentCallbacks ()在合适的时候注册回调就可以了。通过这种自定义的方法，可以在很多地方注册回调，而不需要局限于系统提供的组件。

##### 2、OnTrimMemory

OnTrimMemory回调是Android 4.0之后提供的API，系统会根据不同的内存状态来回调。这个API是提供给开发者的，它的主要作用是提示开发者在系统内存不足的时候，通过处理部分资源来释放内存，从而避免被Android系统杀死。这样应用在下一次启动的时候，速度就会比较快。

系统提供的回调有：Application/Activity/Fragment/Service/ContentProvider

OnTrimMemory的参数是一个int数值，代表不同的内存状态：以下4个是4.0增加的

1. TRIM_MEMORY_COMPLETE（80）：内存不足，并且该进程在后台进程列表最后一个，马上就要被清理

   表示手机目前内存已经很低了，并且我们的程序处于LRU缓存列表的最边缘位 置，系统会最优先考虑杀掉我们的应用程序，在这个时候应当尽可能地把一切 可以释放的东西都进行释放。

2. TRIM_MEMORY_MODERATE（60）：内存不足，并且该进程在后台进程列表的中部。

   表示手机目前内存已经很低了，并且我们的程序处于LRU缓存列表的中间位 置，如果手机内存还得不到进一步释放的话，那么我们的程序就有被系统杀掉 的风险了。

3. TRIM_MEMORY_BACKGROUND（40）：内存不足，并且该进程是后台进程。

   表示手机目前内存已经很低了，系统准备开始根据LRU缓存来清理进程。

4. 这个时候我们的程序在LRU缓存列表的最近位置，是不太可能被清理掉的，但这时去释放掉一些比较容易恢复的资源能够让手机的内存变得比较充足，从而让我们的程序更长时间地保留在缓存当中，这样当用户返回我们的程序时会感觉非常顺畅，而不是经历了一次重新启动的过程。

5. TRIM_MEMORY_UI_HIDDEN（20）：内存不足，并且该进程的UI已经不可见了。

   表示应用程序的所有UI界面被隐藏了，即用户点击了Home键或者Back键导 致应用的UI界面不可见．这时候应该释放一些资源。

以下3个是4.1增加的：

1. TRIM_MEMORY_RUNNING_CRITICAL（15）：内存不足(后台进程不足3个)，并且该进程优先级比较高，需要清 理内存表示应用程序仍然正常运行，但是系统已经根据LRU缓存规 则杀掉了大部分缓存的进程了。这个时候我们应当尽可能地去释放任何不必要的资源，不然的话系统可能会继续杀掉所有缓存中的进程，并且开始杀掉一些本来应当保持运行的进程，比如说后台运行的服务。 
2. TRIM_MEMORY_RUNNING_LOW（10）：内存不足(后台进程不足5个)，并且该进程优先级比较高，需要清理内 存表示应用程序正常运行，并且不会被杀掉。但是目前手机的内存已经非常低了，我们应该去释放掉一些不必要的资源以提升系统的性能，同时这也会直接影响到我们应用程序的性能。
3. TRIM_MEMORY_RUNNING_MODERATE（5）：内存不足(后台进程超过5个)，并且该进程优先级比较高，需要清理内存表示应用程序正常运行，并且不会被杀掉。但是目 前手机的内存已经有点低了，系统可能会开始根据LRU缓存规则来杀死进程了。

将参数值进行分类：

1. 下面3个等级是当我们的应用程序真正运行时的回调：

   TRIM_MEMORY_RUNNING_MODERATE（5） (后台进程超过5个)

   TRIM_MEMORY_RUNNING_LOW（10） (后台进程不足5个)

   TRIM_MEMORY_RUNNING_CRITICAL（15） (后台进程不足3个)

2. 当应用程序是缓存的，则会收到以下几种类型的回调：

   TRIM_MEMORY_BACKGROUND（40） （处于LRU缓存列表的最近位置）

   TRIM_MEMORY_MODERATE（60） （处于LRU缓存列表的中间位置）

   TRIM_MEMORY_COMPLETE（80） （处于LRU缓存列表的最边缘位置）

系统也提供了一个ComponentCallbacks2，任何实现了ComponentCallbacks2接口的类都可以重写实现这个回调方法。通过Context.registerComponentCallbacks()注册后，就会被系统回调到。


#### OnLowMemory和OnTrimMemory的比较

1. OnLowMemory被回调时，已经没有后台进程了（已经全部被杀死了）；而onTrimMemory被回调时，还有后台进 程。
2. OnLowMemory是在最后一个后台进程被杀时调用，一般情况是low memory killer 杀进程后触发；而OnTrimMemory的触发更频繁，每次计算进程优先级时，只要满足条件，都会触发。
3. 通过一键清理后，OnLowMemory不会被触发，而OnTrimMemory会被触发一次。
4. 在引入OnTrimMemory之前都是使用OnLowMemory回调，需要知道的是，OnLowMemory大概和 OnTrimMemory中的TRIM_MEMORY_COMPLETE级别相同，如果你想兼容api<14的机器，那么可以用 OnLowMemory来实现，否则你可以忽略OnLowMemory，直接使用OnTrimMemory即可。


#### OnTrimMemory和onStop的关系？

onTrimMemory()方法中的TRIM_MEMORY_UI_HIDDEN回调只有当我们程序中的所有UI组件全部不可见的时候才会触 发，这和onStop()方法还是有很大区别的，因为onStop()方法只是当一个Activity完全不可见的时候就会调用。

比如说用户打开了我们程序中的另一个Activity。 因此，我们可以在onStop()方法中去释放一些Activity相关的资源

比如说取消网络连接或者注销广播接收器等，但是像UI相关的资源应该一直要等到 onTrimMemory(TRIM_MEMORY_UI_HIDDEN)这个回调之后才去释放，这样可以保证如果用户只是从我们程序的一个 Activity回到了另外一个Activity，界面相关的资源都不需要重新加载，从而提升响应速度。 



==需要注意的是，onTrimMemory的TRIM_MEMORY_UI_HIDDEN 等级是在onStop方法之前调用的。==



#### 为什么要调用OnTrimMemory？

尽管系统在内存不足的时候杀进程的顺序是按照LRU Cache中从低到高来的，但是它同时也会考虑杀掉那些占用内存较 高的应用来让系统更快地获得更多的内存。 
所以如果你的应用占用内存较小，就可以增加不被杀掉的几率，从而快速地恢复（如果不被杀掉，启动的时候就是热启 动，否则就是冷启动，其速度差在2~3倍）。 
所以说在几个不同的OnTrimMemory回调中释放自己的UI资源，可以有效地提高用户体验。


#### 有哪些典型的使用场景？

1. 常驻内存的应用 

   一些常驻内存的应用，比如Launcher、安全中心、电话等，在用户使用过要退出的时候，需要调用OnTrimMemory来及时释放用户使用的时候所产生的多余的内存资源：比如动态生成的View、图片缓存、Fragment等。

2. 有后台Service运行的应用 

   这些应用不是常驻内存的，意味着可以被任务管理器杀掉，但是在某些场景下用户不会去杀。 这类应用包括：音乐、下载等。用户退出UI界面后，音乐还在继续播放，下载程序还在运行。这时候音乐应该释放部分UI资源和Cache。


### **application 被杀死的情况分析**

Android会根据运行在这些进程内的组件及他们的状态把进程划分成一个”**重要程度层次**”，进而决定在内存较低的时候杀掉哪个进程。其重要的程度按以下规则排序：

1. 前端进程：

   顾名思义，前端进程就是目前显示在屏幕上和用户交互的进程，在系统中前端进程数量很少，比如用户正在使用微信聊天，微信app此时为前端进程。而这种进程是对用户体验的影响最大，只有系统的内存稀少到不足以维持和用户的基本交互时才会销毁前端进程。因此这种进程重要性是最高的。

2. 可视进程：

   可视进程是一个被用户可见, 但没有显示在最前端 (onPause方法被调用时) 的Activity的进程。比如在微信聊天时候，输入文字是的搜狗输入法。这种进程被系统认为是极其重要的, 并且通常不会被杀掉， 除非为了保持所有前端进程正常运行不得不杀掉这些可见进程。

3. 服务进程：

   这是一个包含Service的进程, 该Service是由startService()方法启动的, 尽管这些进程用户不能直接看到，比如在后台播放mp3或是在后台下载上传文件。因此系统保持它们运行，除非没有足够内存来保证所有的前台进程和可视进程。

4. 后台进程：

   要说明的是，android里的后台进程是调用了OnStop()的，可以理解成用户暂时没有和这个进程交互的愿望，所以这里后台进程有点“待销毁”的意思。

5. 空进程：

   是没有持有任何活动应用组件的进程，保留这种进程的唯一理由是为了提供一种缓存机制，缩短他的应用下次运行时的启动时间。系统杀掉这些进程，是为了在这些空进程和底层的核心缓存之间平衡整个系统的资源。

   当需要给一个进程分类的时候, 系统会在该进程中处于活动状态的所有组件里掉选一个重要等级最高作为分类依据. 
   查看Activity, Service,和IntentReceiver的文档, 了解每个组件在进程整个生命周期中的贡献. 
   每一个classes的文档详细描述他们在各自应用的生命周期中所起得作用.


### 利用Application操作全局变量

C/C++有全局变量的概念，因为全局变量保存在内存中，所以操作全局变量就是操作内存，显然内存的 读写速度远比读写数据库或读写文件快得多。所谓全局，指的是其他代码都可以引用该变量，因此全局 变量是共享数据和消息传递的好帮手。不过Java没有全局变量的概念，与之比较接近的是类里面的静态 成员变量，该变量不但能被外部直接引用，而且它在不同地方引用的值是一样的（前提是在引用期间不 能改动变量值），所以借助静态成员变量也能实现类似全局变量的功能。

根据上一小节的介绍可知，Application的生命周期覆盖了App运行的全过程。不像短暂的Activity生命周 期，一旦退出该页面，Activity实例就被销毁。因此，利用Application的全生命特性，能够在 Application实例中保存全局变量。 

适合在Application中保存的全局变量主要有下面3类数据：

（1）会频繁读取的信息，例如用户名、手机号码等。 

（2）不方便由意图传递的数据，例如位图对象、非字符串类型的集合对象等。 

（3）容易因频繁分配内存而导致内存泄漏的对象，例如Handler处理器实例等。

要想通过Application实现全局内存的读写，得完成以下3项工作： 

（1）编写一个继承自Application的新类MainApplication。该类采用单例模式，内部先声明自身类的一 个静态成员对象，在创建App时把自身赋值给这个静态对象，然后提供该对象的获取方法getInstance。 具体实现代码示例如下：

```java
public class MainApplication extends Application {
	private final static String TAG = "MainApplication";
     
     private static MainApplication mApp; // 声明一个当前应用的静态实例
     // 声明一个公共的信息映射对象，可当作全局变量使用
     
     public HashMap<String, String> infoMap = new HashMap<String, String>();
     // 利用单例模式获取当前应用的唯一实例
     public static MainApplication getInstance() {
     	return mApp;
     }	
     
     @Override
     public void onCreate() {
          super.onCreate();
          Log.d(TAG, "onCreate");
          mApp = this; // 在打开应用时对静态的应用实例赋值
     }		
}
```


（2）在活动页面代码中调用MainApplication的getInstance方法，获得它的一个静态对象，再通过该对象访问MainApplication的公共变量和公共方法。

```java
public class MyApplication extends Application {

    private static MyApplication mApplicaiton;

    //声明一个公共的信息对象，可当做全局变量使用
    public Map<String,Object> infoHashMap = new HashMap();

    public static MyApplication getInstance(){
        return mApplicaiton;
    }

    /**
     * onCreate()：程序创建的时候执行
     */
    @Override
    public void onCreate() {
        super.onCreate();
        mApplicaiton = this;
        Log.d("TAG", "MyApplication=>onCreate");
    }

    /**
     * onTerminate()：程序终止的时候执行
     *
     * 在模拟环境下执行。当终止应用程序对象时调用，不保证一定被调用，当程序是被内核终止以便为其他应用程序释放资源，
     * 那么将不会提醒，并且不调用应用程序Application对象的onTerminate方法而直接终止进程。
     *
     *  一般是在做系统开发的时候该函数会被调用，但是开发者发布运行不会被调用
     */
    @Override
    public void onTerminate() {
        super.onTerminate();
    }

    /**
     * onLowMemory（） 低内存的时候执行
     *
     * 好的应用程序一般会在这个方法里面释放一些不必要的资源，来应付当后台程序已经终止，
     * 前台应用程序内存还不够时的情况。
     */
    @Override
    public void onLowMemory() {
        super.onLowMemory();
        Log.d("TAG", "MyApplication=>onLowMemory");
    }

    /**
     * onConfigurationChanged()：配置改变时触发这个方法。
     * 例如：竖屏变成横屏
     * @param newConfig The new device configuration.
     */
    @Override
    public void onConfigurationChanged(@NonNull Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Log.d("TAG", "MyApplication=>onConfigurationChanged");
    }

    /**
     * onTrimMemory（int level）：程序在进行内存清理时执行
     */
    @Override
    public void onTrimMemory(int level) {
        super.onTrimMemory(level);
        Log.d("TAG", "MyApplication=>onTrimMemory");
    }
}
```


（3）不要忘了在AndroidManifest.xml中注册新定义的Application类名，也就是给application节点增 加android:name属性，其值为.MainApplication。 

```xml
<applicaiton android:name=".MyApplication" ....省略></applicaiton>
```

接下来演示如何读写内存中的全局变量，首先分别创建写内存页面和读内存页面，其中写内存页面把用户的注册信息保存到全局变量infoHashMap和而读内存页面从全局变量 infoHashMap读取用户的注册信息

```java
public class ApplicationIOActivity extends AppCompatActivity implements View.OnClickListener {

    private EditText et_name;
    private EditText et_age;
    private EditText et_height;
    private EditText et_weight;
    private CheckBox cb_married;
    private MyApplication myInstance;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_application_io);
        et_name = findViewById(R.id.et_name);
        et_age = findViewById(R.id.et_age);
        et_height = findViewById(R.id.et_height);
        et_weight = findViewById(R.id.et_weight);
        cb_married = findViewById(R.id.cb_married);
        findViewById(R.id.btn_save).setOnClickListener(this);
        myInstance = MyApplication.getInstance();
        reload();
    }
	//写入数据
    private void reload() {
        Log.d("TAG",String.valueOf(!myInstance.infoHashMap.isEmpty()));
        if (myInstance.infoHashMap.isEmpty()){
            return;
        }
        String name = myInstance.infoHashMap.get("name").toString();
        String age = myInstance.infoHashMap.get("age").toString();
        String height = myInstance.infoHashMap.get("height").toString();
        String weight = myInstance.infoHashMap.get("weight").toString();
        boolean married = Boolean.parseBoolean(myInstance.infoHashMap.get("married").toString());
        Log.d("TAG", "reload: ");
        et_name.setText(name);
        et_age.setText(age);
        et_height.setText(height);
        et_weight.setText(weight);
        cb_married.setChecked(married);
    }

    @Override
    public void onClick(View v) {
        String name = et_name.getText().toString();
        int age = Integer.parseInt(et_age.getText().toString());
        float height = Float.parseFloat(et_height.getText().toString());
        float weight = Float.parseFloat(et_weight.getText().toString());
        boolean married = cb_married.isChecked();
        //保存数据
        myInstance.infoHashMap.put("name",name);
        myInstance.infoHashMap.put("age",age);
        myInstance.infoHashMap.put("height",height);
        myInstance.infoHashMap.put("weight",weight);
        myInstance.infoHashMap.put("married",married);
        ToastUtils.show(this,"保存成功");
    }
}
```

<img src="/androidImages/image-20230802174357356.png" alt="image-20230802174357356" style="zoom:80%;" />

<img src="/androidImages/image-20230802174413833.png" alt="image-20230802174413833" style="zoom:80%;" />


### 利用Room简化数据库操作

虽然Android提供了数据库帮助器，但是开发者在进行数据库编程时仍有诸多不便，比如每次增加一张 新表，开发者都得手工实现以下代码逻辑：

（1）重写数据库帮助器的onCreate方法，添加该表的建表语句。 

（2）在插入记录之时，必须将数据实例的属性值逐一赋给该表的各字段。 

（3）在查询记录之时，必须遍历结果集游标，把各字段值逐一赋给数据实例。 

（4）每次读写操作之前，都要先开启数据库连接；读写操作之后，又要关闭数据库连接。

上述的处理操作无疑存在不少重复劳动，数年来引得开发者叫苦连连。为此各类数据库处理框架纷纷涌 现，包括GreenDao、OrmLite、Realm等，可谓百花齐放。眼见SQLite渐渐乏人问津，谷歌公司干脆整 了个自己的数据库框架—Room，该框架同样基于SQLite，但它通过注解技术极大地简化了数据库操 作，减少了原来相当一部分编码工作量。

由于Room并未集成到SDK中，而是作为第三方框架提供，因此要修改模块的build.gradle文件，往 dependencies节点添加下面两行配置，表示导入指定版本的Room库：

```xml
implementation 'androidx.room:room-runtime:2.2.5'
annotationProcessor 'androidx.room:room-compiler:2.2.5'
```

导入Room库之后，还要编写若干对应的代码文件。以录入图书信息为例，此时要对图书信息表进行增 删改查，则具体的编码过程分为下列5个步骤：


**1．编写图书信息表对应的实体类**

假设图书信息类名为BookInfo，且它的各属性与图书信息表的各字段一一对应，那么要给该类添加 “@Entity”注解，表示该类是Room专用的数据类型，对应的表名称也叫BookInfo。如果BookInfo表的 name字段是该表的主键，则需给BookInfo类的name属性添加“@PrimaryKey”与“@NonNull”两个注 解，表示该字段是个非空的主键。下面是BookInfo类的定义代码例子：

```java
//书籍信息
@Entity
public class BookInfo {
     @PrimaryKey // 该字段是主键，不能重复
     @NonNull // 主键必须是非空字段
     private String name; // 书籍名称
     private String author; // 作者
     private String press; // 出版社
     private double price; // 价格
     public void setName(String name) {
     this.name = name;
     }
     public String getName() {
     return this.name;
     }
     public void setAuthor(String author) {
     this.author = author;
     }
     public String getAuthor() {
          return this.author;
     }
     public void setPress(String press) {
     this.press = press;
     }
     public String getPress() {
     return this.press;
     }
     public void setPrice(double price) {
     this.price = price;
     }
     public double getPrice() {
     return this.price;
     }
}
```


**2．编写图书信息表对应的持久化类**

所谓持久化，指的是将数据保存到磁盘而非内存，其实等同于增删改等SQL语句。假设图书信息表的持 久化类名叫作BookDao，那么该类必须添加“@Dao”注解，内部的记录查询方法必须添加“@Query”注 解，记录插入方法必须添加“@Insert”注解，记录更新方法必须添加“@Update”注解，记录删除方法必须 添加“@Delete”注解（带条件的删除方法除外）。对于记录查询方法，允许在@Query之后补充具体的查 询语句以及查询条件；对于记录插入方法与记录更新方法，需明确出现重复记录时要采取哪种处理策 略。下面是BookDao类的定义代码例子：

```java
@Dao
public interface BookDao {
     @Query("SELECT * FROM BookInfo") // 设置查询语句
     List<BookInfo> queryAllBook(); // 加载所有书籍信息
     @Query("SELECT * FROM BookInfo WHERE name = :name") // 设置带条件的查询语句
     BookInfo queryBookByName(String name); // 根据名字加载书籍
     @Insert(onConflict = OnConflictStrategy.REPLACE) // 记录重复时替换原记录
     void insertOneBook(BookInfo book); // 插入一条书籍信息
     @Insert
     void insertBookList(List<BookInfo> bookList); // 插入多条书籍信息
     @Update(onConflict = OnConflictStrategy.REPLACE)// 出现重复记录时替换原记录
     int updateBook(BookInfo book); // 更新书籍信息
     @Delete
     void deleteBook(BookInfo book); // 删除书籍信息
     @Query("DELETE FROM BookInfo WHERE 1=1") // 设置删除语句
     void deleteAllBook(); // 删除所有书籍信息
}
```


**3．编写图书信息表对应的数据库类**

因为先有数据库然后才有表，所以图书信息表还得放到某个数据库里，这个默认的图书数据库要从 RoomDatabase派生而来，并添加“@Database”注解。下面是数据库类BookDatabase的定义代码例子：

```java
//entities表示该数据库有哪些表，version表示数据库的版本号
//exportSchema表示是否导出数据库信息的json串，建议设为false，若设为true还需指定json文件的保存路径
@Database(entities = {BookInfo.class},version = 1, exportSchema = false)
public abstract class BookDatabase extends RoomDatabase {
     // 获取该数据库中某张表的持久化对象
     public abstract BookDao bookDao();
}
```

**4．在自定义的Application类中声明图书数据库的唯一实例**

为了避免重复打开数据库造成的内存泄漏问题，每个数据库在App运行过程中理应只有一个实例，此时 要求开发者自定义新的Application类，在该类中声明并获取图书数据库的实例，并将自定义的 Application类设为单例模式，保证App运行之时有且仅有一个应用实例。下面是自定义Application类的代码例子：

```java
public class MainApplication extends Application {
     
     private final static String TAG = "MainApplication";
     
     private static MainApplication mApp; // 声明一个当前应用的静态实例
     
     // 声明一个公共的信息映射对象，可当作全局变量使用
     public HashMap<String, String> infoMap = new HashMap<String, String>();
     
     private BookDatabase bookDatabase; // 声明一个书籍数据库对象
     
     // 利用单例模式获取当前应用的唯一实例
     public static MainApplication getInstance() {
     	return mApp;
     }
     
     @Override
     public void onCreate() {
          super.onCreate();
          Log.d(TAG, "onCreate");
          mApp = this; // 在打开应用时对静态的应用实例赋值
          // 构建书籍数据库的实例
          bookDatabase = Room.databaseBuilder(mApp, BookDatabase.class,"BookInfo")
          .addMigrations() // 允许迁移数据库（发生数据库变更时，Room默认删除原数据库再创建新数据库。如此一来原来的记录会丢失，故而要改为迁移方式以便保存原有记录）
          .allowMainThreadQueries() // 允许在主线程中操作数据库（Room默认不能在主线程中操作数据库）
          .build();
     }
     
	// 获取书籍数据库的实例
	public BookDatabase getBookDB(){
     	return bookDatabase;
     }
}
```


**5．在操作图书信息表的地方获取数据表的持久化对象**

持久化对象的获取代码很简单，只需下面一行代码就够了：

```java
// 从App实例中获取唯一的图书持久化对象
BookDao bookDao = MainApplication.getInstance().getBookDB().bookDao();
```

完成以上5个编码步骤之后，接着调用持久化对象的queryXXX、insertXXX、updateXXX、deleteXXX等 方法，就能实现图书信息的增删改查操作了。例程的图书信息演示页面有两个，分别是记录保存页面和 记录读取页面，其中记录保存页面通过insertOneBook方法向数据库添加图书信息

运行测试App，先打开记录保存页面，依次录入两本图书信息并保存至数据库，如图6-21和图6-22所 示。再打开记录读取页面，从数据库读取图书信息并展示在页面上，如图6-23所示。

<img src="/androidImages/image-20230823161725232.png" alt="image-20230823161725232" style="zoom:80%;" />

<img src="/androidImages/image-20230823161742031.png" alt="image-20230823161742031" style="zoom:80%;" />

<img src="/androidImages/image-20230823161754492.png" alt="image-20230823161754492" style="zoom:80%;" />