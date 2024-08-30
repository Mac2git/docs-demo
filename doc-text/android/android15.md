

# 第8章　高级控件

本章介绍了App开发常用的一些高级控件用法，主要包括：如何使用下拉框及其适配器、如何使用列表 类视图及其适配器、如何使用翻页类视图及其适配器、如何使用碎片及其适配器等。然后结合本章所学 的知识，演示了一个实战项目“记账本”的设计与实现。

<div style="page-break-after: always;"></div>

## 8.1　下拉列表

本节介绍下拉框的用法以及适配器的基本概念，结合对下拉框Spinner的使用说明分别阐述数组适配器 ArrayAdapter、简单适配器SimpleAdapter的具体用法与展示效果。



<div style="page-break-after: always;"></div>

### 8.1.1　下拉框Spinner

Spinner是下拉框控件，它用于从一串列表中选择某项，其功能类似于单选按钮的组合。下拉列表的展示 方式有两种，一种是在当前下拉框的正下方弹出列表框，此时要把spinnerMode属性设置为 dropdown，下面是XML文件中采取下拉模式的Spinner标签例子：

```xml
<Spinner
     android:id="@+id/sp_dropdown"
     android:layout_width="match_parent"
     android:layout_height="wrap_content"
     android:spinnerMode="dropdown" />
```

另一种是在页面中部弹出列表对话框，此时要把spinnerMode属性设置为dialog，下面是XML文件中采 取对话框模式的Spinner标签例子：

```xml
<Spinner
     android:id="@+id/sp_dialog"
     android:layout_width="match_parent"
     android:layout_height="wrap_content"
     android:spinnerMode="dialog" />
```

此外，在Java代码中，Spinner还可以调用下列4个方法。

- setPrompt：设置标题文字。注意对话框模式才显示标题，下拉模式不显示标题。
- setAdapter：设置列表项的数据适配器。 
- setSelection：设置当前选中哪项。注意该方法要在setAdapter方法后调用。
- setOnItemSelectedListener：设置下拉列表的选择监听器，该监听器要实现接口 OnItemSelectedListener。

下面是初始化下拉框，并设置选择监听器的代码例子：

```java
// 初始化下拉模式的列表框
private void initSpinnerForDropdown() {
     // 声明一个下拉列表的数组适配器
     ArrayAdapter<String> starAdapter = new ArrayAdapter<String>(this,R.layout.item_select, starArray);
     // 从布局文件中获取名叫sp_dropdown的下拉框
     Spinner sp_dropdown = findViewById(R.id.sp_dropdown);
     // 设置下拉框的标题。对话框模式才显示标题，下拉模式不显示标题
     sp_dropdown.setPrompt("请选择行星");
     sp_dropdown.setAdapter(starAdapter); // 设置下拉框的数组适配器
     sp_dropdown.setSelection(0); // 设置下拉框默认显示第一项
     // 给下拉框设置选择监听器，一旦用户选中某一项，就触发监听器的onItemSelected方法
     sp_dropdown.setOnItemSelectedListener(new MySelectedListener());
}
// 定义下拉列表需要显示的文本数组
private String[] starArray = {"水星", "金星", "地球", "火星", "木星", "土星"};
     // 定义一个选择监听器，它实现了接口OnItemSelectedListener
     class MySelectedListener implements OnItemSelectedListener {
          // 选择事件的处理方法，其中arg2代表选择项的序号
          public void onItemSelected(AdapterView<?> arg0, View arg1, int arg2, long
          arg3) {
               Toast.makeText(SpinnerDropdownActivity.this, "您选择的是" +
               starArray[arg2],
               Toast.LENGTH_LONG).show();
     	}
     // 未选择时的处理方法，通常无需关注
     public void onNothingSelected(AdapterView<?> arg0) {}
}

```

接下来观察两种下拉列表的界面效果，运行测试App，一开始的下拉框如图8-1所示。

<img src="/androidImages/image-20230829175325158.png" alt="image-20230829175325158" style="zoom:80%;" />

在下拉模式页面（SpinnerDropdownActivity.java）单击下拉框，六大行星的列表框在下拉框正下方展 开，如图8-2所示。点击某项后，列表框消失，同时下拉框文字变为刚选中的行星名称。再打开对话框模 式页面（SpinnerDialogActivity），单击下拉框会在页面中央弹出六大行星的列表对话框，如图8-3所 示。点击某项后，对话框消失，同时下拉框文字也变为刚选中的行星名称。

<img src="/androidImages/image-20230829175337370.png" alt="image-20230829175337370" style="zoom:80%;" />

<img src="/androidImages/image-20230829175350409.png" alt="image-20230829175350409" style="zoom:80%;" />

### 8.1.2　数组适配器ArrayAdapter

上一小节在演示下拉框控件时，调用了setAdapter方法设置列表适配器。这个适配器好比一组数据的加 工流水线，你丢给它一大把糖果（六大行星的原始数据），适配器先按顺序排列糖果（对应行星数组 starArray），然后拿来制作好的包装盒（对应每个列表项的布局文件item_select.xml），把糖果往里面 一塞，出来的便是一个个精美的糖果盒（界面上排布整齐的列表框）。这个流水线可以做得很复杂，也 可以做得简单一些，最简单的流水线就是之前演示用到的数组适配器ArrayAdapter。

ArrayAdapter主要用于每行列表只展示文本的情况，实现过程分成下列3个步骤：

步骤一，编写列表项的XML文件，内部布局只有一个TextView标签，示例如下：

```xml
<TextView xmlns:android="http://schemas.android.com/apk/res/android"
     android:id="@+id/tv_name"
     android:layout_width="match_parent"
     android:layout_height="50dp"
     android:gravity="center"/>
```

步骤二，调用ArrayAdapter的构造方法，填入待展现的字符串数组，以及列表项的包装盒，即XML文件 R.layout.item_select。构造方法的调用代码示例如下。

```java
// 声明一个下拉列表的数组适配器
ArrayAdapter<String> starAdapter = new ArrayAdapter<String>
(this,R.layout.item_select, starArray);
```

步骤三，调用下拉框控件的setAdapter方法，传入第二步得到的适配器实例，代码如下：

```java
sp_dropdown.setAdapter(starAdapter); // 设置下拉框的数组适配器
```

经过以上3个步骤，先由ArrayAdapter明确原料糖果的分拣过程与包装方式，再由下拉框调用 setAdapter方法发出开工指令，适配器便会把一个个包装好的糖果盒输出到界面。

### 8.1.3　简单适配器SimpleAdapter

ArrayAdapter只能显示文本列表，显然不够美观，有时还想给列表加上图标，比如希望显示六大行星的 天文影像。这时简单适配器SimpleAdapter就派上用场了，它允许在列表项中同时展示文本与图片。

SimpleAdapter的实现过程略微复杂，因为它的原料需要更多信息。例如，原料不但有糖果，还有贺 卡，这样就得把一大袋糖果和一大袋贺卡送进流水线，适配器每次拿一颗糖果和一张贺卡，把糖果与贺 卡按规定塞进包装盒。对于SimpleAdapter的构造方法来说，第2个参数Map容器放的是原料糖果与贺 卡，第3个参数放的是包装盒，第4个参数放的是糖果袋与贺卡袋的名称，第5个参数放的是包装盒里塞 糖果的位置与塞贺卡的位置。

下面是下拉框控件使用简单适配器的示例代码：

```java
// 初始化下拉框，演示简单适配器
private void initSpinnerForSimpleAdapter() {
     // 声明一个映射对象的列表，用于保存行星的图标与名称配对信息
     List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
     // iconArray是行星的图标数组，starArray是行星的名称数组
     for (int i = 0; i < iconArray.length; i++) {
     	Map<String, Object> item = new HashMap<String, Object>();
          item.put("icon", iconArray[i]);
          item.put("name", starArray[i]);
          list.add(item); // 把行星图标与名称的配对映射添加到列表
     }
     // 声明一个下拉列表的简单适配器，其中指定了图标与文本两组数据
     SimpleAdapter starAdapter = new SimpleAdapter(this, list,R.layout.item_simple,
     new String[]{"icon", "name"},new int[]{R.id.iv_icon,R.id.tv_name});
     // 设置简单适配器的布局样式
     starAdapter.setDropDownViewResource(R.layout.item_simple);
     // 从布局文件中获取名叫sp_icon的下拉框
     Spinner sp_icon = findViewById(R.id.sp_icon);
     sp_icon.setPrompt("请选择行星"); // 设置下拉框的标题
     sp_icon.setAdapter(starAdapter); // 设置下拉框的简单适配器
     sp_icon.setSelection(0); // 设置下拉框默认显示第一项
     // 给下拉框设置选择监听器，一旦用户选中某一项，就触发监听器的onItemSelected方法
     sp_icon.setOnItemSelectedListener(new MySelectedListener());
}
```

以上代码中，简单适配器使用的包装盒名为R.layout.item_simple，它的布局内容如下：

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
     android:layout_width="match_parent"
     android:layout_height="wrap_content"
     android:orientation="horizontal">
          <!-- 这是展示行星图标的ImageView -->
          <ImageView
          android:id="@+id/iv_icon"
          android:layout_width="0dp"
          android:layout_height="50dp"
          android:layout_weight="1" />
          <!-- 这是展示行星名称的TextView -->
          <TextView
          android:id="@+id/tv_name"
          android:layout_width="0dp"
          android:layout_height="match_parent"
          android:layout_weight="3"
          android:gravity="center"
          android:textColor="#ff0000"
          android:textSize="17sp" />
</LinearLayout>
```

运行测试App，一开始的下拉框如图8-4所示，可见默认选项既有图标又有文字。然后单击下拉框，页面 中央弹出六大行星的列表对话框，如图8-5所示，可见列表框的各项也一齐展示了行星的图标及其名称。

<img src="/androidImages/image-20230829175822819.png" alt="image-20230829175822819" style="zoom:80%;" />


## 8.2　列表类视图

本节介绍列表类视图怎样结合基本适配器展示视图阵列，包括：基本适配器BaseAdapter的用法、列表 视图ListView的用法及其常见问题的解决、网格视图GridView的用法及其拉伸模式说明。

### 8.2.1　基本适配器BaseAdapter

由上一节的介绍可知，数组适配器适用于纯文本的列表数据，简单适配器适用于带图标的列表数据。然 而实际应用常常有更复杂的列表，比如每个列表项存在3个以上的控件，这种情况即便是简单适配器也很 吃力，而且不易扩展。为此Android提供了一种适应性更强的基本适配器BaseAdapter，该适配器允许 开发者在别的代码文件中编写操作代码，大大提高了代码的可读性和可维护性。 

从BaseAdapter派生的数据适配器主要实现下面5种方法。

- 构造方法：指定适配器需要处理的数据集合。
- getCount：获取列表项的个数。 
- getItem：获取列表项的数据。 
- getItemId：获取列表项的编号。 
- getView：获取每项的展示视图，并对每项的内部控件进行业务处理。

下面以下拉框控件为载体，演示如何操作BaseAdapter，具体的编码过程分为3步：

​	步骤一，编写列表项的布局文件，示例代码如下：

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
     android:layout_width="match_parent"
     android:layout_height="wrap_content"
     android:orientation="horizontal">
          <!-- 这是显示行星图片的图像视图 -->
          <ImageView
               android:id="@+id/iv_icon"
               android:layout_width="0dp"
               android:layout_height="80dp"
               android:layout_weight="1"
               android:scaleType="fitCenter" />
     
          <LinearLayout
               android:layout_width="0dp"
               android:layout_height="match_parent"
               android:layout_weight="3"
               android:layout_marginLeft="5dp"
               android:orientation="vertical">
               
               <!-- 这是显示行星名称的文本视图 -->
               <TextView
                    android:id="@+id/tv_name"
                    android:layout_width="match_parent"
                    android:layout_height="0dp"
                    android:layout_weight="1"
                    android:gravity="left|center"
                    android:textColor="@color/black"
                    android:textSize="20sp" />
               <!-- 这是显示行星描述的文本视图 -->
               <TextView
                    android:id="@+id/tv_desc"
                    android:layout_width="match_parent"
                    android:layout_height="0dp"
                    android:layout_weight="2"
                    android:gravity="left|center"
                    android:textColor="@color/black"
                    android:textSize="13sp" />
               
          </LinearLayout>
</LinearLayout>
```

步骤二，写个新的适配器继承BaseAdapter，实现对列表项的管理操作，示例代码如下：

```java
public class PlanetBaseAdapter extends BaseAdapter {
     private Context mContext; // 声明一个上下文对象
     private List<Planet> mPlanetList; // 声明一个行星信息列表
     
     // 行星适配器的构造方法，传入上下文与行星列表
     public PlanetBaseAdapter(Context context, List<Planet> planet_list) {
          mContext = context;
          mPlanetList = planet_list;
     }
     // 获取列表项的个数
     public int getCount() {
     	return mPlanetList.size();
     }
     // 获取列表项的数据
     public Object getItem(int arg0) {
     	return mPlanetList.get(arg0);
     }
     // 获取列表项的编号
     public long getItemId(int arg0) {
     	return arg0;
     }
     // 获取指定位置的列表项视图
     public View getView(final int position, View convertView, ViewGroup parent)
     {
          ViewHolder holder;
          if (convertView == null) { // 转换视图为空
               holder = new ViewHolder(); // 创建一个新的视图持有者
               // 根据布局文件item_list.xml生成转换视图对象
               convertView =
                    LayoutInflater.from(mContext).inflate(R.layout.item_list, null);
                    holder.iv_icon = convertView.findViewById(R.id.iv_icon);
                    holder.tv_name = convertView.findViewById(R.id.tv_name);
                    holder.tv_desc = convertView.findViewById(R.id.tv_desc);
              convertView.setTag(holder); // 将视图持有者保存到转换视图当中
          } else { // 转换视图非空
               // 从转换视图中获取之前保存的视图持有者
               holder = (ViewHolder) convertView.getTag();
     	}
          Planet planet = mPlanetList.get(position);
          holder.iv_icon.setImageResource(planet.image); // 显示行星的图片
          holder.tv_name.setText(planet.name); // 显示行星的名称
          holder.tv_desc.setText(planet.desc); // 显示行星的描述
          holder.iv_icon.requestFocus();
          return convertView;
	}
     // 定义一个视图持有者，以便重用列表项的视图资源
     public final class ViewHolder {
          public ImageView iv_icon; // 声明行星图片的图像视图对象
          public TextView tv_name; // 声明行星名称的文本视图对象
          public TextView tv_desc; // 声明行星描述的文本视图对象
     }
}
```

步骤三，在页面代码中创建该适配器实例，并交给下拉框设置，示例代码如下：

```java
// 初始化行星列表的下拉框
private void initPlanetSpinner() {
     // 获取默认的行星列表，即水星、金星、地球、火星、木星、土星
     planetList = Planet.getDefaultList();
     // 构建一个行星列表的适配器
     PlanetBaseAdapter adapter = new PlanetBaseAdapter(this, planetList);
     // 从布局文件中获取名叫sp_planet的下拉框
     Spinner sp_planet = findViewById(R.id.sp_planet);
     sp_planet.setPrompt("请选择行星"); // 设置下拉框的标题
     sp_planet.setAdapter(adapter); // 设置下拉框的列表适配器
     sp_planet.setSelection(0); // 设置下拉框默认显示第一项
     // 给下拉框设置选择监听器，一旦用户选中某一项，就触发监听器的onItemSelected方法
     sp_planet.setOnItemSelectedListener(new MySelectedListener());
}
```


运行测试App，一开始的下拉框如图8-6所示，可见默认选项有图标有标题还有内容。然后单击下拉框， 页面中央弹出六大行星的列表对话框，如图8-7所示，可见列表框的各项也一齐展示了行星的图标、名称 及其详细描述。因为对列表项布局item_list.xml使用了单独的适配器代码PlanetBaseAdapter，所以即 使多加几个控件也不怕麻烦了。

<img src="/androidImages/image-20230829180352766.png" alt="image-20230829180352766" style="zoom:80%;" />

<img src="/androidImages/image-20230829180411460.png" alt="image-20230829180411460" style="zoom:80%;" />


### 8.2.2　列表视图ListView

上一小节给下拉框控件设置了基本适配器，然而列表效果只在弹出对话框中展示，一旦选中某项，回到 页面时又只显示选中的内容。这么丰富的列表信息没展示在页面上实在是可惜，也许用户对好几项内容 都感兴趣。若想在页面上直接显示全部列表信息，就要引入新的列表视图ListView。列表视图允许在页 面上分行展示相似的数据列表，例如新闻列表、商品列表、图书列表等，方便用户浏览与操作。

ListView同样通过setAdapter方法设置列表项的数据适配器，但操作列表项的时候，它不使用 setOnItemSelectedListener方法，而是调用setOnItemClickListener方法设置列表项的点击监听器 OnItemClickListener，有时也调用setOnItemLongClickListener方法设置列表项的长按监听器 OnItemLongClickListener。在点击列表项或者长按列表项之时，即可触发监听器对应的事件处理方 法。除此之外，列表视图还新增了几个属性与方法，详细说明见表8-1。

![image-20230829180503183](/androidImages/image-20230829180503183.png)

在XML文件中添加ListView很简单，只要以下几行就声明了一个列表视图：

```xml
<ListView
     android:id="@+id/lv_planet"
     android:layout_width="match_parent"
     android:layout_height="wrap_content" />
```

往列表视图填充数据也很容易，先利用基本适配器实现列表适配器，再调用setAdapter方法设置适配器 对象。下面是使用列表视图在界面上展示行星列表的代码例子：

```java
List<Planet> planetList = Planet.getDefaultList(); // 获得默认的行星列表
// 构建一个行星列表的列表适配器
PlanetListAdapter adapter = new PlanetListAdapter(this, planetList);
// 从布局视图中获取名为lv_planet的列表视图
ListView lv_planet = findViewById(R.id.lv_planet);
lv_planet.setAdapter(adapter); // 设置列表视图的适配器
lv_planet.setOnItemClickListener(adapter); // 设置列表视图的点击监听器
lv_planet.setOnItemLongClickListener(adapter); // 设置列表视图的长按监听器
```

其中列表项的点击事件和长按事件的处理方法代码如下所示：

```java
// 处理列表项的点击事件，由接口OnItemClickListener触发
public void onItemClick(AdapterView<?> parent, View view, int position, long id)
{
     String desc = String.format("您点击了第%d个行星，它的名字是%s", position + 1,
     mPlanetList.get(position).name);
     Toast.makeText(mContext, desc, Toast.LENGTH_LONG).show();
}
// 处理列表项的长按事件，由接口OnItemLongClickListener触发
public boolean onItemLongClick(AdapterView<?> parent, View view, int position,long id) {
     String desc = String.format("您长按了第%d个行星，它的名字是%s", position + 1,
     mPlanetList.get(position).name);
     Toast.makeText(mContext, desc, Toast.LENGTH_LONG).show();
     return true;
}
```

运行App后打开包含列表视图的测试页面，行星列表的界面效果如图8-8所示。

<img src="/androidImages/image-20230829180647738.png" alt="image-20230829180647738" style="zoom:80%;" />


由图8-8可见，列表视图在各项之间默认展示灰色的分隔线，点击或长按某项时会显示默认的灰色水波背 景。若想修改分隔线样式或按压背景，则需调整ListView的对应属性，调整时候的注意点说明如下：

**1．修改列表视图的分隔线样式**

修改分隔线样式要在XML文件中同时设置divider（分隔图片）与dividerHeight（分隔高度）两个属性， 并且遵循下列两条规则：

1. divider属性设置为@null时，不能再将dividerHeight属性设置为大于0的数值，因为这会导致最后 一项没法完全显示，底部有一部分被掩盖了。原因是列表高度为wrap_content时，系统已按照没有分隔 线的情况计算列表高度，此时dividerHeight占用了n-1块空白分隔区域，使得最后一项被挤到背影里面 去了。
2. 通过代码设置的话，务必先调用setDivider方法再调用setDividerHeight方法。如果先调用 setDividerHeight后调用setDivider，分隔线高度就会变成分隔图片的高度，而不是setDividerHeight设 置的高度。XML布局文件则不存在divider属性和dividerHeight属性的先后顺序问题。

下面的代码示范了如何在代码中正确设置分隔线，以及如何正确去掉分隔线：

```java
if (ck_divider.isChecked()) { // 显示分隔线
     // 从资源文件获得图形对象
     Drawable drawable = getResources().getDrawable(R.color.red);
     lv_planet.setDivider(drawable); // 设置列表视图的分隔线
     lv_planet.setDividerHeight(Utils.dip2px(this, 5)); // 设置列表视图的分隔线高度
     } else { // 不显示分隔线
     lv_planet.setDivider(null); // 设置列表视图的分隔线
     lv_planet.setDividerHeight(0); // 设置列表视图的分隔线高度
}
```

**2．修改列表项的按压背景**

若想取消按压列表项之时默认的水波背景，可在布局文件中设置也可在代码中设置，两种方式的注意点 说明如下：

1. 在布局文件中取消按压背景的话，直接将listSelector属性设置为@null并不合适，因为尽管设为 @null，按压列表项时仍出现橙色背景。只有把listSelector属性设置为透明色才算真正取消背景，此时 listSelector的属性值如下所示（事先在colors.xml中定义好透明色）：

   ```xml
   android:listSelector="@color/transparent"
   ```

2. 在代码中取消按压背景的话，调用setSelector方法不能设置null值，因为null值会在运行时报空指 针异常。正确的做法是先从资源文件获得透明色的图形对象，再调用setSelector方法设置列表项的按压 状态图形，设置按压背景的代码如下所示：

   ```java
   // 从资源文件获得图形对象
   Drawable drawable = getResources().getDrawable(R.color.transparent);
   lv_planet.setSelector(drawable); // 设置列表项的按压状态图形
   ```

   列表视图除了以上两处属性修改，实际开发还有两种用法要特别小心，一种是列表视图的高度问题，另 一种是列表项的点击问题，分别叙述如下。

**1．列表视图的高度问题**

在XML文件中，如果ListView后面还有其他平级的控件，就要将ListView的高度设为0dp，同时权重设为 1，确保列表视图扩展到剩余的页面区域；如果ListView的高度设置为wrap_content，系统就只给列表 视图预留一行高度，如此一来只有列表的第一项会显示，其他项不显示，这显然不是我们所期望的。因 此建议列表视图的尺寸参数按照如下方式设置：

```xml
<ListView
     android:id="@+id/lv_planet"
     android:layout_width="match_parent"
     android:layout_height="0dp"
     android:layout_weight="1"/>
```

**2．列表项的点击问题**

通常只要调用setOnItemClickListener方法设置点击监听器，点击列表项即可触发列表项的点击事件， 但是如果列表项中存在编辑框或按钮（含Button、ImageButton、Checkbox等），点击列表项就无法 触发点击事件了。缘由在于编辑框和按钮这类控件会抢占焦点，因为它们要么等待用户输入、要么等待 用户点击，按道理用户点击按钮确实应该触发按钮的点击事件，而非触发列表项的点击事件，可问题是 用户点击列表项的其余区域，也由于焦点被抢占的缘故导致触发不了列表项的点击事件。

为了规避焦点抢占的问题，列表视图允许开发者自行设置内部视图的焦点抢占方式，该方式在XML文件 中由descendantFocusability属性指定，在代码中由setDescendantFocusability方法设置，详细的焦点 抢占方式说明见表8-2。

![image-20230829181211246](/androidImages/image-20230829181211246.png)

注意焦点抢占方式不是由ListView设置，而是由列表项的根布局设置，也就是item_***.xml的根节点。 完整的演示代码见本章源码中的ListFocusActivity.java、PlanetListWithButtonAdapter．java，以及列 表项的布局文件item_list_with_button.xml。自行指定焦点抢占方式的界面效果如图8-9所示。

<img src="/androidImages/image-20230829181236301.png" alt="image-20230829181236301" style="zoom:80%;" />

在图8-9所示的界面上选择方式“不让子控件处理”（FOCUS_BLOCK_DESCENDANTS），之后点击列表项 除按钮之外的区域，才会弹出列表项点击事件的提示。


### 8.2.3　网格视图GridView

除了列表视图，网格视图GridView也是常见的列表类视图，它用于分行分列显示表格信息，比列表视图 更适合展示物品清单。除了沿用列表视图的3个方法setAdapter、setOnItemClickListener、 setOnItemLongClickListener，网格视图还新增了部分属性与方法，新属性与新方法的说明见表8-3。

![image-20230829181348639](/androidImages/image-20230829181348639.png)

​																				表8-4　网格视图拉伸模式的取值说明

![image-20230829181407607](/androidImages/image-20230829181407607.png)

在XML文件中添加GridView需要指定列的数目，以及空隙的拉伸模式，示例如下：

```xml
<GridView
     android:id="@+id/gv_planet"
     android:layout_width="match_parent"
     android:layout_height="wrap_content"
     android:numColumns="2"
     android:stretchMode="columnWidth" />
```

网格视图的按压背景与焦点抢占问题类似于列表视图，此外还需注意网格项的拉伸模式，因为同一行的 网格项可能占不满该行空间，多出来的空间就由拉伸模式决定怎么分配。接下来做个实验，看看各种拉 伸模式分别呈现什么样的界面效果。实验之前先给网格视图设置青色背景，通过观察背景的覆盖区域， 即可知晓网格项之间的空隙分布。

下面是演示网格视图拉伸模式的代码片段：

```java
int dividerPad = Utils.dip2px(GridViewActivity.this, 2); // 定义间隔宽度为2dp
gv_planet.setBackgroundColor(Color.CYAN); // 设置背景颜色
gv_planet.setHorizontalSpacing(dividerPad); // 设置列表项在水平方向的间距
gv_planet.setVerticalSpacing(dividerPad); // 设置列表项在垂直方向的间距
gv_planet.setStretchMode(GridView.STRETCH_COLUMN_WIDTH); // 设置拉伸模式
gv_planet.setColumnWidth(Utils.dip2px(GridViewActivity.this, 120)); // 设置每列宽度为120dp
gv_planet.setPadding(0, 0, 0, 0); // 设置网格视图的四周间距
if (arg2 == 0) { // 不显示分隔线
     gv_planet.setBackgroundColor(Color.WHITE);
     gv_planet.setHorizontalSpacing(0);
     gv_planet.setVerticalSpacing(0);
} else if (arg2 == 1) { // 不拉伸(NO_STRETCH)
	gv_planet.setStretchMode(GridView.NO_STRETCH);
} else if (arg2 == 2) { // 拉伸列宽(COLUMN_WIDTH)
	gv_planet.setStretchMode(GridView.STRETCH_COLUMN_WIDTH);
} else if (arg2 == 3) { // 列间空隙(STRETCH_SPACING)
	gv_planet.setStretchMode(GridView.STRETCH_SPACING);
} else if (arg2 == 4) { // 左右空隙(SPACING_UNIFORM)
	gv_planet.setStretchMode(GridView.STRETCH_SPACING_UNIFORM);
} else if (arg2 == 5) { // 使用padding显示全部分隔线
	gv_planet.setPadding(dividerPad, dividerPad, dividerPad, dividerPad);
}
```

运行测试App，一开始的行星网格界面如图8-11所示，此时网格视图没有分隔线。点击界面顶部的下拉 框，并选择“不拉伸NO_STRETCH”，此时每行的网格项紧挨着，多出来的空隙排在当前行的右边，如图 8-12所示。


拉伸模式选择“拉伸列宽（COLUMN_WIDTH）”，此时行星网格界面如图8-13所示，可见每个网格的宽 度都变宽了。拉伸模式选择“列间空隙（STRETCH_SPACING）”，此时行星网格界面如图8-14所示，可见 多出来的空隙位于网格项中间。

<img src="/androidImages/image-20230829181544408.png" alt="image-20230829181544408"  />


![image-20230829181606187](/androidImages/image-20230829181606187.png)


![image-20230829181642806](/androidImages/image-20230829181642806.png)

![image-20230829181642806](/androidImages/image-202308291816428016.png)

拉伸模式选择“左右空隙（SPACING_UNIFORM）”，此时行星网格界面如图8-15所示，可见空隙同时出 现在网格项的左右两边。拉伸模式选择“使用padding显示全部分隔线”，此时行星网格界面如图8-16所 示，可见网格视图的内外边界都显示了分隔线。


![image-20230829181711265](/androidImages/image-20230829181711265.png)


![image-20230829181728961](/androidImages/image-20230829181728961.png)


## 8.3　翻页类视图

本节介绍翻页类视图的相关用法，包括：翻页视图ViewPager如何搭配翻页适配器PagerAdapter、如何 搭配翻页标签栏PagerTabStrip，最后结合实战演示了如何使用翻页视图实现简单的启动引导页。

![image-20230829181820581](/androidImages/image-20230829181820581.png)

### 8.3.1　翻页视图ViewPager

上一节介绍的列表视图与网格视图，一个分行展示，另一个分行又分列，其实都是在垂直方向上下滑动。有没有一种控件允许页面在水平方向左右滑动，就像翻书、翻报纸一样呢？为了实现左右滑动的翻 页功能，Android提供了相应的控件—翻页视图ViewPager。对于ViewPager来说，一个页面就是一个项 （相当于ListView的一个列表项），许多个页面组成了ViewPager的页面项。

既然明确了翻页视图的原理类似列表视图和网格视图，它们的用法也很类似。例如，列表视图和网格视 图使用基本适配器BaseAdapter，翻页视图则使用翻页适配器PagerAdapter；列表视图和网格视图使用 列表项的点击监听器OnItemClickListener，翻页视图则使用页面变更监听器OnPageChangeListener监听页面切换事件。

下面是翻页视图3个常用方法的说明。

- setAdapter：设置页面项的适配器。适配器用的是PagerAdapter及其子类。 
- setCurrentItem：设置当前页码，也就是要显示哪个页面。 
- addOnPageChangeListener：添加翻页视图的页面变更监听器。该监听器需实现接口 OnPageChangeListener下的3个方法，具体说明如下。　 
  - onPageScrollStateChanged：在页面滑动状态变化时触发。　 
  - onPageScrolled：在页面滑动过程中触发。　 
  - onPageSelected：在选中页面时，即滑动结束后触发。

在XML文件中添加ViewPager时注意指定完整路径的节点名称，示例如下：

```xml
<!-- 注意翻页视图ViewPager的节点名称要填全路径 -->
<androidx.viewpager.widget.ViewPager
     android:id="@+id/vp_content"
     android:layout_width="match_parent"
     android:layout_height="370dp" />
```

由于翻页视图包含了多个页面项，因此要借助翻页适配器展示每个页面。翻页适配器的实现原理与基本 适配器类似，从PagerAdapter派生的翻页适配器主要实现下面6个方法。

- 构造方法：指定适配器需要处理的数据集合。 
- getCount：获取页面项的个数。 
- isViewFromObject：判断当前视图是否来自指定对象，返回view == object即可。 
- instantiateItem：实例化指定位置的页面，并将其添加到容器中。 
- destroyItem：从容器中销毁指定位置的页面。 
- getPageTitle：获得指定页面的标题文本，有搭配翻页标签栏时才要实现该方法。


以商品信息为例，翻页适配器需要通过构造方法传入商品列表，再由instantiateItem方法实例化视图对 象并添加至容器，详细的翻页适配器代码示例如下：

```java
public class ImagePagerAdapater extends PagerAdapter {
     // 声明一个图像视图列表
     private List<ImageView> mViewList = new ArrayList<ImageView>();
     // 声明一个商品信息列表
     private List<GoodsInfo> mGoodsList = new ArrayList<GoodsInfo>();
     // 图像翻页适配器的构造方法，传入上下文与商品信息列表
     public ImagePagerAdapater(Context context, List<GoodsInfo> goodsList) {
          mGoodsList = goodsList;
          // 给每个商品分配一个专用的图像视图
          for (int i = 0; i < mGoodsList.size(); i++) {
               ImageView view = new ImageView(context); // 创建一个图像视图对象
               view.setLayoutParams(new LayoutParams(
               LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT));
               view.setImageResource(mGoodsList.get(i).pic);
               mViewList.add(view); // 把该商品的图像视图添加到图像视图列表
          }
     }
     // 获取页面项的个数
     public int getCount() {
     	return mViewList.size();
     }
     // 判断当前视图是否来自指定对象
     public boolean isViewFromObject(View view, Object object) {
     	return view == object;
     }
     // 从容器中销毁指定位置的页面
     public void destroyItem(ViewGroup container, int position, Object object) {
     	container.removeView(mViewList.get(position));
     }
     // 实例化指定位置的页面，并将其添加到容器中
     public Object instantiateItem(ViewGroup container, int position) {
          container.addView(mViewList.get(position));
          return mViewList.get(position);
     }
     // 获得指定页面的标题文本
     public CharSequence getPageTitle(int position) {
     	return mGoodsList.get(position).name;
     }
}
```


接着回到活动页面代码，给翻页视图设置上述的翻页适配器，代码如下所示：

```java
public class ViewPagerActivity extends AppCompatActivity implements OnPageChangeListener {
     private List<GoodsInfo> mGoodsList; // 手机商品列表
     
     @Override
     protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_view_pager);
          mGoodsList = GoodsInfo.getDefaultList();
          // 构建一个商品图片的翻页适配器
          ImagePagerAdapater adapter = new ImagePagerAdapater(this, mGoodsList);
          // 从布局视图中获取名叫vp_content的翻页视图
          ViewPager vp_content = findViewById(R.id.vp_content);
          vp_content.setAdapter(adapter); // 设置翻页视图的适配器
          vp_content.setCurrentItem(0); // 设置翻页视图显示第一页
          vp_content.addOnPageChangeListener(this); // 给翻页视图添加页面变更监听器
     }
     // 翻页状态改变时触发。state取值说明为：0表示静止，1表示正在滑动，2表示滑动完毕
     // 在翻页过程中，状态值变化依次为：正在滑动→滑动完毕→静止
     public void onPageScrollStateChanged(int state) {}
     // 在翻页过程中触发。该方法的三个参数取值说明为 ：第一个参数表示当前页面的序号
     // 第二个参数表示页面偏移的百分比，取值为0到1；第三个参数表示页面的偏移距离
     public void onPageScrolled(int position, float ratio, int offset) {}
     // 在翻页结束后触发。position表示当前滑到了哪一个页面
     public void onPageSelected(int position) {
          Toast.makeText(this, "您翻到的手机品牌是：" + mGoodsList.get(position).name,
          Toast.LENGTH_SHORT).show();
     }
}
```

由于监听器OnPageChangeListener多数情况只用到onPageSelected方法，很少用到 onPageScrollStateChanged和onPageScrolled两个方法，因此Android又提供了简化版的页面变更监听 器名为SimpleOnPageChangeListener，新的监听器仅需实现onPageSelected方法。给翻页视图添加简 化版监听器的代码示例如下：

```java
// 给翻页视图添加简化版的页面变更监听器
vp_content.addOnPageChangeListener(new ViewPager.SimpleOnPageChangeListener() {
     @Override
     public void onPageSelected(int position) {
          Toast.makeText(ViewPagerActivity.this, "您翻到的手机品牌是："
  		+ mGoodsList.get(position).name,
          Toast.LENGTH_SHORT).show();
     }
});
```

然后运行测试App，初始的翻页界面如图8-18所示，此时整个页面只显示第一部手机。用手指从右向左 活动页面，滑到一半的界面如图8-19所示，可见第一部手机逐渐向左隐去，而第二部手机逐渐从右边拉 出。继续向左活动一段距离再松开手指，此时滑动结束的界面如图8-20所示，可见整个页面完全显示第 二部手机了。

<img src="/androidImages/image-20230829182425717.png" alt="image-20230829182425717" style="zoom:67%;" />

​																							图8-19　滑到一半的翻页视图

<img src="/androidImages/image-20230829182436232.png" alt="image-20230829182436232" style="zoom: 67%;" />

<img src="/androidImages/image-20230829182436233.png" alt="image-20230829182436232" style="zoom: 67%;" />

### 8.3.2　翻页标签栏PagerTabStrip

尽管翻页视图实现了左右滑动，可是没滑动的时候看不出这是个翻页视图，而且也不晓得当前滑到了哪 个页面。为此Android提供了翻页标签栏PagerTabStrip，它能够在翻页视图上方显示页面标题，从而方 便用户的浏览操作。PagerTabStrip类似选项卡效果，文本下面有横线，点击左右选项卡即可切换到对应 页面。给翻页视图引入翻页标签栏只需下列两个步骤：

步骤一，在XML文件的ViewPager节点内部添加PagerTabStrip节点，示例如下：

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
     android:layout_width="match_parent"
     android:layout_height="match_parent"
     android:orientation="vertical"
     android:padding="5dp">
          <!-- 注意翻页视图ViewPager的节点名称要填全路径 -->
          <androidx.viewpager.widget.ViewPager
          android:id="@+id/vp_content"
          android:layout_width="match_parent"
          android:layout_height="400dp">
          <!-- 注意翻页标签栏PagerTabStrip的节点名称要填全路径 -->
          <androidx.viewpager.widget.PagerTabStrip
          android:id="@+id/pts_tab"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content" />
          </androidx.viewpager.widget.ViewPager>
</LinearLayout>
```

步骤二，在翻页适配器的代码中重写getPageTitle方法，在不同位置返回对应的标题文本，示例代码如 下：

```java
// 获得指定页面的标题文本
public CharSequence getPageTitle(int position) {
     return mGoodsList.get(position).name;
}
```

完成上述两步骤之后，重新运行测试App，即可观察翻页标签栏的界面效果。如图8-21和图8-22所示， 这是翻到不同页面的翻页视图，可见界面正上方是当前页面的标题，左上方文字是左边页面的标题，右 上方文字是右边页面的标题。

<img src="/androidImages/image-20230829182634357.png" alt="image-20230829182634357" style="zoom:80%;" />


<img src="/androidImages/image-20230829182659547.png" alt="image-20230829182659547" style="zoom:80%;" />

另外，若想修改翻页标签栏的文本样式，必须在Java代码中调用setTextSize和setTextColor方法才行， 因为PagerTabStrip不支持在XML文件中设置文本大小和文本颜色，只能在代码中设置文本样式，具体的 设置代码如下所示：

```java
// 初始化翻页标签栏
private void initPagerStrip() {
     // 从布局视图中获取名叫pts_tab的翻页标签栏
     PagerTabStrip pts_tab = findViewById(R.id.pts_tab);
     // 设置翻页标签栏的文本大小
     pts_tab.setTextSize(TypedValue.COMPLEX_UNIT_SP, 20);
     pts_tab.setTextColor(Color.BLACK); // 设置翻页标签栏的文本颜色
}
```


### 8.3.3　简单的启动引导页

翻页视图的使用范围很广，当用户安装一个新应用时，首次启动大多出现欢迎页面，这个引导页要往右 翻好几页，才会进入应用主页。这种启动引导页就是通过翻页视图实现的。

下面就来动手打造你的第一个App启动欢迎页吧！翻页技术的核心在于页面项的XML布局及其适配器， 因此首先要设计页面项的布局。一般来说，引导页由两部分组成，一部分是背景图；另一部分是页面下 方的一排圆点，其中高亮的圆点表示当前位于第几页。启动引导页的界面效果如图8-23与图8-24所示。 其中，图8-23为欢迎页面的第一页，此时第一个圆点高亮显示；图8-24为右翻到了第二页，此时第二个 圆点高亮显示。


<img src="/androidImages/image-20230829182808265.png" alt="image-20230829182808265" style="zoom:80%;" />


<img src="/androidImages/image-20230829182837347.png" alt="image-20230829182837347" style="zoom:80%;" />

除了背景图与一排圆点之外，最后一页往往有个按钮，它便是进入应用主页的入口。于是页面项的XML 文件至少包含3个控件：引导页的背景图（采用ImageView）、底部的一排圆点（采用RadioGroup）、 最后一页的入口按钮（采用Button），XML内容示例如下：


```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
     android:layout_width="match_parent"
     android:layout_height="match_parent">
     
          <!-- 这是引导图片的图像视图 -->
          <ImageView
          android:id="@+id/iv_launch"
          android:layout_width="match_parent"
          android:layout_height="match_parent"
          android:scaleType="fitXY" />
          <!-- 这里容纳引导页底部的一排圆点 -->
          <RadioGroup
          android:id="@+id/rg_indicate"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:layout_alignParentBottom="true"
          android:layout_centerHorizontal="true"
          android:orientation="horizontal"
          android:paddingBottom="20dp" />
          <!-- 这是最后一页的入口按钮 -->
          <Button
          android:id="@+id/btn_start"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:layout_centerInParent="true"
          android:text="立即开始美好生活"
          android:textColor="#ff3300"
          android:textSize="22sp"
          android:visibility="gone" />"
</RelativeLayout>
```


根据上面的XML文件，引导页的最后两页如图8-25与图8-26所示。其中，图8-25是第三页，此时第三个 圆点高亮显示；图8-26是最后一页，只有该页才会显示入口按钮。

<img src="/androidImages/image-20230829182956167.png" alt="image-20230829182956167" style="zoom:80%;" />


<img src="/androidImages/image-20230829183015564.png" alt="image-20230829183015564" style="zoom:80%;" />

写好了页面项的XML布局，还得编写启动引导页的适配器代码，主要完成3项工作：

1. 根据页面项的XML文件构造每页的视图。
2. 让当前页码的圆点高亮显示。 
3. 如果翻到了最后一页，就显示中间的入口按钮。

下面是启动引导页对应的翻页适配器代码例子：


```java
public class LaunchSimpleAdapter extends PagerAdapter {
     private List<View> mViewList = new ArrayList<View>(); // 声明一个引导页的视图列表
     // 引导页适配器的构造方法，传入上下文与图片数组
     public LaunchSimpleAdapter(final Context context, int[] imageArray) {
          for (int i = 0; i < imageArray.length; i++) {
               // 根据布局文件item_launch.xml生成视图对象
               View view =
               LayoutInflater.from(context).inflate(R.layout.item_launch, null);
               ImageView iv_launch = view.findViewById(R.id.iv_launch);
               RadioGroup rg_indicate = view.findViewById(R.id.rg_indicate);
               Button btn_start = view.findViewById(R.id.btn_start);
               iv_launch.setImageResource(imageArray[i]); // 设置引导页的全屏图片
               // 每个页面都分配一个对应的单选按钮
          	for (int j = 0; j < imageArray.length; j++) {
                    RadioButton radio = new RadioButton(context); // 创建一个单选按钮
                    radio.setLayoutParams(new LayoutParams(
                    LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT));
                    radio.setButtonDrawable(R.drawable.launch_guide); // 设置单选按钮的图标
                    radio.setPadding(10, 10, 10, 10); // 设置单选按钮的四周间距
                    rg_indicate.addView(radio); // 把单选按钮添加到页面底部的单选组
               }
               // 当前位置的单选按钮要高亮显示，比如第二个引导页就高亮第二个单选按钮
               ((RadioButton) rg_indicate.getChildAt(i)).setChecked(true);
               // 如果是最后一个引导页，则显示入口按钮，以便用户点击按钮进入主页
               if (i == imageArray.length - 1) {
                    btn_start.setVisibility(View.VISIBLE);
                    btn_start.setOnClickListener(new OnClickListener() {
                         @Override
                         public void onClick(View v) {
                              // 这里要跳到应用主页
                              Toast.makeText(context, "欢迎您开启美好生活",
                              Toast.LENGTH_SHORT).show();
              			}
              		});
			}
			mViewList.add(view); // 把该图片对应的页面添加到引导页的视图列表
		}
}
     // 获取页面项的个数
     public int getCount() {
          return mViewList.size();
     }
     // 判断当前视图是否来自指定对象
     public boolean isViewFromObject(View view, Object object) {
     	return view == object;
     }
     // 从容器中销毁指定位置的页面
     public void destroyItem(ViewGroup container, int position, Object object) {
     	container.removeView(mViewList.get(position));
     }
     // 实例化指定位置的页面，并将其添加到容器中
     public Object instantiateItem(ViewGroup container, int position) {
          container.addView(mViewList.get(position));
          return mViewList.get(position);
     }
}
```


## 8.4　碎片Fragment

本节介绍碎片的概念及其用法，包括：通过静态注册方式使用碎片、通过动态注册方式使用碎片（需要 配合碎片适配器FragmentPagerAdapter），并分析两种注册方式的碎片生命周期，最后结合实战演示 了如何使用碎片改进启动引导页。


### 8.4.1　碎片的静态注册

碎片Fragment是个特别的存在，它有点像报纸上的专栏，看起来只占据页面的一小块区域，但是这一区 域有自己的生命周期，可以自行其是，仿佛独立王国；并且该区域只占据空间不扰乱业务，添加之后不 影响宿主页面的其他区域，去除之后也不影响宿主页面的其他区域。

每个碎片都有对应的XML布局文件，依据其使用方式可分为静态注册与动态注册两类。静态注册指的是 在XML文件中直接放置fragment节点，类似于一个普通控件，可被多个布局文件同时引用。静态注册一 般用于某个通用的页面部件（如Logo条、广告条等），每个活动页面均可直接引用该部件。

下面是碎片页对应的XML文件内容，看起来跟列表项与网格项的布局文件差不多。

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
     android:layout_width="match_parent"
     android:layout_height="wrap_content"
     android:orientation="horizontal"
     android:background="#bbffbb">
          <TextView
               android:id="@+id/tv_adv"
               android:layout_width="0dp"
               android:layout_height="match_parent"
               android:layout_weight="1"
               android:gravity="center"
               android:text="广告图片"
               android:textColor="#000000"
               android:textSize="17sp" />
          <ImageView
               android:id="@+id/iv_adv"
               android:layout_width="0dp"
               android:layout_height="match_parent"
               android:layout_weight="4"
               android:src="@drawable/adv"
               android:scaleType="fitCenter" />
</LinearLayout>
```


下面是与上述XML布局对应的碎片代码，除了继承自Fragment与入口方法onCreateView两点，其他地方类似活动页面代码。

```java
public class StaticFragment extends Fragment implements View.OnClickListener {
     private static final String TAG = "StaticFragment";
     protected View mView; // 声明一个视图对象
     protected Context mContext; // 声明一个上下文对象
     // 创建碎片视图
     @Override
     public View onCreateView(LayoutInflater inflater, ViewGroup container,
     Bundle savedInstanceState) {
          mContext = getActivity(); // 获取活动页面的上下文
          // 根据布局文件fragment_static.xml生成视图对象
          mView = inflater.inflate(R.layout.fragment_static, container, false);
          TextView tv_adv = mView.findViewById(R.id.tv_adv);
          ImageView iv_adv = mView.findViewById(R.id.iv_adv);
          tv_adv.setOnClickListener(this); // 设置点击监听器
          iv_adv.setOnClickListener(this); // 设置点击监听器
          Log.d(TAG, "onCreateView");
          return mView; // 返回该碎片的视图对象
     }
     @Override
     public void onClick(View v) {
          if (v.getId() == R.id.tv_adv) {
          	Toast.makeText(mContext, "您点击了广告文本", Toast.LENGTH_LONG).show();
          } else if (v.getId() == R.id.iv_adv) {
          	Toast.makeText(mContext, "您点击了广告图片", Toast.LENGTH_LONG).show();
          }
     }
}
```

若想在活动页面的XML文件中引用上面定义的StaticFragment，可以直接添加一个fragment节点，但需 注意下列两点：

1. fragment节点必须指定id属性，否则App运行会报错。
2. fragment节点必须通过name属性指定碎片类的完整路径。

下面是在布局文件中引用碎片的XML例子。

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
     android:layout_width="match_parent"
     android:layout_height="match_parent"
     android:orientation="vertical">
          <!-- 把碎片当作一个控件使用，其中android:name指明了碎片来源 -->
          <fragment
               android:id="@+id/fragment_static"
               android:name="com.example.chapter08.fragment.StaticFragment"
               android:layout_width="match_parent"
               android:layout_height="60dp" />
          <TextView
               android:layout_width="match_parent"
               android:layout_height="wrap_content"
               android:gravity="center"
               android:text="这里是每个页面的具体内容"
               android:textColor="#000000"
               android:textSize="17sp" />
</LinearLayout>
```

运行测试App，可见碎片所在界面如图8-27所示。此时碎片区域仿佛一个视图，其内部控件同样可以接 收点击事件。


<img src="/androidImages/image-20230829183736401.png" alt="image-20230829183736401" style="zoom:80%;" />

另外，介绍一下碎片在静态注册时的生命周期，像活动的基本生命周期方法onCreate、onStart、 onResume、onPause、onStop、onDestroy，碎片同样也有，而且还多出了下面5个生命周期方法。

- onAttach：与活动页面结合。 
- onCreateView：创建碎片视图。 
- onActivityCreated：在活动页面创建完毕后调用。 
- onDestroyView：回收碎片视图。 
- onDetach：与活动页面分离。

至于这些周期方法的先后调用顺序，观察日志最简单明了。下面是打开活动页面时的日志信息，此时碎 片的onCreate方法先于活动的onCreate方法，而碎片的onStart与onResume均在活动的同名方法之后。

```txt
12:26:11.506：D/StaticFragment：onAttach
12:26:11.506：D/StaticFragment：onCreate
12:26:11.530：D/StaticFragment：onCreateView
12:26:11.530：D/FragmentStaticActivity：onCreate
12:26:11.530：D/StaticFragment：onActivityCreated
12:26:11.530：D/FragmentStaticActivity：onStart
12:26:11.530：D/StaticFragment：onStart
12:26:11.530：D/FragmentStaticActivity：onResume
12:26:11.530：D/StaticFragment：onResume
```

下面是退出活动页面时的日志信息，此时碎片的onPause、onStop、onDestroy都在活动的同名方法之前。

```txt
12:26:36.586：D/StaticFragment：onPause
12:26:36.586：D/FragmentStaticActivity：onPause
12:26:36.990：D/StaticFragment：onStop
12:26:36.990：D/FragmentStaticActivity：onStop
12:26:36.990：D/StaticFragment：onDestroyView
12:26:36.990：D/StaticFragment：onDestroy
12:26:36.990：D/StaticFragment：onDetach
12:26:36.990：D/FragmentStaticActivity：onDestroy
```

总结一下，在静态注册时，除了碎片的创建操作在页面创建之前，其他操作没有僭越页面范围。就像老实本分的下级，上级开腔后才能说话，上级要做总结性发言前赶紧闭嘴。


### 8.4.2　碎片的动态注册

碎片拥有两种使用方式，也就是静态注册和动态注册。相比静态注册，实际开发中动态注册用得更多。 静态注册是在XML文件中直接添加fragment节点，而动态注册迟至代码执行时才动态添加碎片。动态生 成的碎片基本给翻页视图使用，要知道ViewPager和Fragment可是一对好搭档。

要想在翻页视图中使用动态碎片，关键在于适配器。在“8.3.1　翻页视图ViewPager”小节演示翻页功能 时，用到了翻页适配器PagerAdapter。如果结合使用碎片，翻页视图的适配器就要改用碎片适配器 FragmentPagerAdapter。与翻页适配器相比，碎片适配器增加了getItem方法用于获取指定位置的碎 片，同时去掉了isViewFromObject、instantiateItem、destroyItem三个方法，用起来更加容易。下面是一个碎片适配器的实现代码例子。

```java
public class MobilePagerAdapter extends FragmentPagerAdapter {
private List<GoodsInfo> mGoodsList = new ArrayList<GoodsInfo>(); // 声明一个商品列表
     // 碎片页适配器的构造方法，传入碎片管理器与商品信息列表
     public MobilePagerAdapter(FragmentManager fm, List<GoodsInfo> goodsList) {
          super(fm, BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT);
          mGoodsList = goodsList;
     }
     // 获取碎片Fragment的个数
     public int getCount() {
     	return mGoodsList.size();
     }
     // 获取指定位置的碎片Fragment
     public Fragment getItem(int position) {
     	return DynamicFragment.newInstance(position,mGoodsList.get(position).pic, mGoodsList.get(position).desc);
     }
     // 获得指定碎片页的标题文本
     public CharSequence getPageTitle(int position) {
     	return mGoodsList.get(position).name;
     }
}
```


上面的适配器代码在getItem方法中不调用碎片的构造方法，却调用了newInstance方法，目的是给碎片 对象传递参数信息。由newInstance方法内部先调用构造方法创建碎片对象，再调用setArguments方法 塞进请求参数，然后在onCreateView中调用getArguments方法才能取出请求参数。下面是在动态注册 时传递请求参数的碎片代码例子：

```java
public class DynamicFragment extends Fragment {
     private static final String TAG = "DynamicFragment";
     protected View mView; // 声明一个视图对象
     protected Context mContext; // 声明一个上下文对象
     private int mPosition; // 位置序号
     private int mImageId; // 图片的资源编号
     private String mDesc; // 商品的文字描述
     // 获取该碎片的一个实例
     public static DynamicFragment newInstance(int position, int image_id, String desc) {
          DynamicFragment fragment = new DynamicFragment(); // 创建该碎片的一个实例
          Bundle bundle = new Bundle(); // 创建一个新包裹
          bundle.putInt("position", position); // 往包裹存入位置序号
          bundle.putInt("image_id", image_id); // 往包裹存入图片的资源编号
          bundle.putString("desc", desc); // 往包裹存入商品的文字描述
          fragment.setArguments(bundle); // 把包裹塞给碎片
          return fragment; // 返回碎片实例
     }
     // 创建碎片视图
     public View onCreateView(LayoutInflater inflater, ViewGroup container,
     Bundle savedInstanceState) {
          mContext = getActivity(); // 获取活动页面的上下文
          if (getArguments() != null) { // 如果碎片携带有包裹，就打开包裹获取参数信息
               mPosition = getArguments().getInt("position", 0); // 从包裹取出位置序号
               mImageId = getArguments().getInt("image_id", 0); // 从包裹取出图片的资源编号
               mDesc = getArguments().getString("desc"); // 从包裹取出商品的文字描述
     	}
          // 根据布局文件fragment_dynamic.xml生成视图对象
          mView = inflater.inflate(R.layout.fragment_dynamic, container, false);
          ImageView iv_pic = mView.findViewById(R.id.iv_pic);
          TextView tv_desc = mView.findViewById(R.id.tv_desc);
          iv_pic.setImageResource(mImageId);
          tv_desc.setText(mDesc);
          Log.d(TAG, "onCreateView position=" + mPosition);
     	return mView; // 返回该碎片的视图对象
     }
}

```


现在有了适用于动态注册的适配器与碎片对象，还需要一个活动页面展示翻页视图及其搭配的碎片适配 器。下面便是动态注册用到的活动页面代码。

```java
public class FragmentDynamicActivity extends AppCompatActivity {
     private static final String TAG = "FragmentDynamicActivity";
     
     @Override
     protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_fragment_dynamic);
          List<GoodsInfo> goodsList = GoodsInfo.getDefaultList();
          // 构建一个手机商品的碎片翻页适配器
          MobilePagerAdapter adapter = new MobilePagerAdapter(
          getSupportFragmentManager(), goodsList);
          // 从布局视图中获取名叫vp_content的翻页视图
          ViewPager vp_content = findViewById(R.id.vp_content);
          vp_content.setAdapter(adapter); // 设置翻页视图的适配器
          vp_content.setCurrentItem(0); // 设置翻页视图显示第一页
     }
}

```


运行测试App，初始的碎片界面如图8-28所示，此时默认展示第一个碎片，包含商品图片和商品描述。 接着一路滑到最后一页如图8-29所示，此时展示了最后一个碎片，可见总体界面效果类似于“8.3.2　翻 页标签栏PagerTabStrip”那样。

<img src="/androidImages/image-20230901184732806.png" alt="image-20230901184732806" style="zoom:80%;" />

<img src="/androidImages/image-20230901184805097.png" alt="image-20230901184805097" style="zoom:80%;" />


接下来观察动态注册时候的碎片生命周期。按惯例分别在活动代码与碎片代码内部补充生命周期的日 志，然后观察App运行日志。下面是打开活动页面时的日志信息：

```txt
12:28:28.074：D/FragmentDynamicActivity：onCreate
12:28:28.074：D/FragmentDynamicActivity：onStart
12:28:28.074：D/FragmentDynamicActivity：onResume
12:28:28.086：D/DynamicFragment：onAttach position=0
12:28:28.086：D/DynamicFragment：onCreate position=0
12:28:28.114：D/DynamicFragment：onCreateView position=0
12:28:28.114：D/DynamicFragment：onActivityCreated position=0
12:28:28.114：D/DynamicFragment：onStart position=0
12:28:28.114：D/DynamicFragment：onResume position=0
12:28:28.114：D/DynamicFragment：onAttach position=0
12:28:28.114：D/DynamicFragment：onCreate position=0
12:28:28.146：D/DynamicFragment：onCreateView position=1
12:28:28.146：D/DynamicFragment：onStart position=1
12:28:28.146：D/DynamicFragment：onResume position=1
```

下面是退出活动页面时的日志信息：

```txt
12:28:57.994：D/DynamicFragment：onPause position=0
12:28:57.994：D/DynamicFragment：onPause position=1
12:28:57.994：D/FragmentDynamicActivity：onPause
12:28:58.402：D/DynamicFragment：onStop position=0
12:28:58.402：D/DynamicFragment：onStop position=1
12:28:58.402：D/FragmentDynamicActivity：onStop
12:28:58.402：D/DynamicFragment：onDestroyView position=0
12:28:58.402：D/DynamicFragment：onDestroy position=0
12:28:58.402：D/DynamicFragment：onDetach position=0
12:28:58.402：D/DynamicFragment：onDestroyView position=1
12:28:58.402：D/DynamicFragment：onDestroy position=1
12:28:58.402：D/DynamicFragment：onDetach position=1
12:28:58.402：D/FragmentDynamicActivity：onDestroy
```

日志搜集完毕，分析其中的奥妙，总结一下主要有以下3点：

1. 动态注册时，碎片的onCreate方法在活动的onCreate方法之后，其余方法的先后顺序与静态注册 时保持一致。
2. 注意onActivityCreated方法，无论是静态注册还是动态注册，该方法都在活动的onCreate方法之 后，可见该方法的确在页面创建之后才调用。
3. 最重要的一点，进入第一个碎片之际，实际只加载了第一页和第二页，并没有加载所有碎片页，这 正是碎片动态注册的优点。无论当前位于哪一页，系统都只会加载当前页及相邻的左右两页，总共加载 不超过3页。一旦发生页面切换，相邻页面就被加载，非相邻页面就被回收。这么做的好处是节省了宝贵 的系统资源，只有用户正在浏览与将要浏览的碎片页才会加载，避免所有碎片页一起加载造成资源浪 费，后者正是普通翻页视图的缺点。