# 微信小程序

------



## 1.小程序代码的构成

------

![](/wxImages/项目的基本组成结构.png)



<div style="page-break-after:always"></div>



## 2. 小程序页面的组成部分

------



​	<img src="/wxImages/小程序页面的组成部分.png" alt="image-20230227214037703" style="zoom: 80%;" />



​		其中，每个页面由 4 个基本文件组成，它们分别是：

​		① .js 文件（页面的脚本文件，存放页面的数据、事件处理函数等）

​		② .json 文件（当前页面的配置文件，配置窗口的外观、表现等）

​		③ .wxml 文件（页面的模板结构文件）

​		④ .wxss 文件（当前页面的样式表文件）

​		① .js 文件（页面的脚本文件，存放页面的数据、事件处理函数等）

​		② .json 文件（当前页面的配置文件，配置窗口的外观、表现等）

​		③ .wxml 文件（页面的模板结构文件）

​		④ .wxss 文件（当前页面的样式表文件）

<div style="page-break-after:always"></div>



### 2.1 JSON 配置文件的作用



​		JSON 是一种数据格式，在实际开发中，JSON 总是以配置文件的形式出现。小程序项目中也不例外：通过不同的 .json 配置文件，可以对小程序项目进行不同级别的配置。



​		小程序项目中有 4 种 json 配置文件，分别是：

​		①项目根目录中的 app.json 配置文件

​		②项目根目录中的 project.config.json 配置文件

​		③项目根目录中的 sitemap.json 配置文件

​		④每个页面文件夹中的 .json 配置文件



### 2.2 app.json 文件



​		app.json 是当前小程序的全局配置，包括了小程序的所有页面路径、窗口外观、界面表现、底部 tab 等。Demo 项目里边的 app.json 配置内容如下：



<img src="/wxImages/小程序的页面的组成app.json文件.png" style="zoom:67%;" />



​			简单了解下这 4 个配置项的作用：

​				①pages：用来记录当前小程序所有页面的路径

​				②window：全局定义小程序所有页面的背景色、文字颜色等

​				③style：全局定义小程序组件所使用的样式版本

​				sitemapLocation：用来指明 sitemap.json 的位置

<div style="page-break-after: always;"></div> 

### 2.3 project.config.json 文件

​	

​		project.config.json 是项目配置文件，用来记录我们对小程序开发工具所做的个性化配置，例如：

​				setting 中保存了编译相关的配置

​				projectname 中保存的是项目名称

			appid 中保存的是小程序的账号 ID



### 2.4 sitemap.json 文件



​		微信现已开放小程序内搜索，效果类似于 PC 网页的 SEO。sitemap.json 文件用来配置小程序页面是否允许微信索引。

​		当开发者允许微信索引时，微信会通过爬虫的形式，为小程序的页面内容建立索引。当用户的搜索关键字和页面的索引匹配成功		的时候，小程序的页面将可能展示在搜索结果中。



![](/wxImages/小程序页面的组成部分sitemap.json文件.png)



> 注意：sitemap 的索引提示是默认开启的，如需要关闭 sitemap 的索引提示，可在小程序项目配置文件 project.config.json 的 setting 中配置字段 checkSiteMap 为 false



 <div style="page-break-after: always;"></div>



### 2.5 页面的.json 配置文件



​		小程序中的每一个页面，可以使用 .json 文件来对本页面的窗口外观进行配置，页面中的配置项会覆盖 app.json 的 window 中相同的配置项。例如：



<img src="/wxImages/小程序页面的组成部分.json配置文件.png" style="zoom:80%;" />

 <div style="page-break-after: always;"></div>



------



## json文件中的window属性

​	

|             属性             |                 说明                 |           值           |
| :--------------------------: | :----------------------------------: | :--------------------: |
| navigationBarBackgroundColor |        窗口外观背景颜色16进制        |      仅支持16进制      |
|    navigationBarTitleText    |          导航栏标题文字内容          |     String 字符串      |
|    navigationBarTextStyle    |            导航栏标题颜色            |  仅支持 black / white  |
|       backgroundColor        |             窗口的背景色             |      仅支持16进制      |
|     backgroundTextStyle      |      下拉 loading(加载) 的样式       |  仅支持 dark / light   |
|    enablePullDownRefresh     |        是否全局开启下拉刷新。        |       true/false       |
|    onReachBottomDistance     | 页面上拉触底事件触发时距页面底部距离 | 默认为50px, 单位为px。 |
|                              |                                      |                        |
|                              |                                      |                        |

### 注意：

​				在app.json文件夹里只能在window属性下使用，如果全局配置文件和页面配置文件发生冲突，以页面配置文件为主

------

 <div style="page-break-after: always;"></div>



### 2.6  新建小程序页面

​			

​			只需要在 app.json -> pages 中新增页面的存放路径，小程序开发者工具即可帮我们自动创建对应的页面文件



​								![](/wxImages/新建小程序页面.png)

------

 <div style="page-break-after: always;"></div>



### 2.7  修改项目首页



​				只需要调整 app.json -> pages 数组中页面路径的前后顺序，即可修改项目的首页。小程序会把排在第一位的页面，当作项目首页进行渲染，如图所示：



![](/wxImages/修改项目首页.png)



------

 <div style="page-break-after: always;"></div>



## 3. WXML、WXSS、js逻辑交互



### WXML



### 		3.1  什么是 WXML



​					WXML（WeiXin Markup Language）是小程序框架设计的一套标签语言，用来构建小程序页面的结构，其作用类似于网			页开发中的 HTML。





### 3.2  WXML 和 HTML 的区别



#### 3.2.1 标签名称不同



​			●  HTML （div, span, img, a）

​			●  WXML（view, text, image, navigator）



#### 3.2.2 属性节点不同				

```html
​<a href="#">超链接 </a>

​<navigator url="/pages/home/home"></navigator>
```


#### 3.2.3.提供了类似于 Vue 中的模板语法

​			数据绑定

​			列表渲染

​			条件渲染

------



### WXSS



### 3.3什么是 WXSS



​		WXSS (WeiXin Style Sheets)是一套样式语言，用于描述 WXML 的组件样式，类似于网页开发中的 CSS。



#### 3.3.1  WXSS 和 CSS 的区别



#### 		①新增了 rpx 尺寸单位



​					CSS 中需要手动进行像素单位换算，例如 rem



​					WXSS 在底层支持新的尺寸单位 rpx，在不同大小的屏幕上小程序会自动进行换算



#### 		②提供了全局的样式和局部样式



​				项目根目录中的 app.wxss 会作用于所有小程序页面



​				局部页面的 .wxss 样式仅对当前页面生效



#### 		③WXSS 仅支持部分 CSS 选择器



​				.class 和 #id



​				element



​				并集选择器、后代选择器



​				::after 和 ::before 等伪类选择器



------



### js逻辑交互

​		

#### 		1. 小程序中的 .js 文件



​				一个项目仅仅提供界面展示是不够的，在小程序中，我们通过 .js 文件来处理用户的操作。例如：响应用户的点击、获取用			户的位置等等。







------

​			

#### 		2. 小程序中 .js 文件的分类

​	

​			小程序中的 JS 文件分为三大类，分别是：



##### 					①app.js



​						是整个小程序项目的入口文件，通过调用 App() 函数来启动整个小程序



##### 					②页面的 .js 文件



​					是页面的入口文件，通过调用 Page() 函数来创建并运行页面



​				③普通的 .js 文件



​					是普通的功能模块文件，用来封装公共的函数或属性供页面使用



------



### 4.小程序的宿主环境



### 		4.1  什么是宿主环境



​				宿主环境（host environment）指的是程序运行所必须的依赖环境。例如：

Android 系统和 iOS 系统是两个不同的宿主环境。安卓版的微信 App 是不能在 iOS 环境下运行的，所以，Android 是安卓软件的宿主环境，脱离了宿主环境的软件是没有任何意义的！



![image-20230301215436684](/wxImages/什么是宿主环境.png)





------



### 4.2 小程序的宿主环境



​	手机微信是小程序的宿主环境，如图所示：



​				![image-20230301215535300](/wxImages/小程序的宿主环境.png)



小程序借助宿主环境提供的能力，可以完成许多普通网页无法完成的功能，例如：微信扫码、微信支付、微信登录、地理定位、etc…





------

### 4.3 小程序宿主环境包含的内容



​			①通信模型

​			②运行机制

​			③组件

​			④API

------



## 5.小程序的宿主环境 - 通信模型



#### 	5.1 通信的主体



​		小程序中通信的主体是渲染层和逻辑层，其中：

​				①WXML 模板和 WXSS 样式工作在渲染层

​				②JS 脚本工作在逻辑层



![image-20230301215858674](/wxImages/通信的主题.png)

​		

------



#### 5.2 小程序的通信模型



​		小程序中的通信模型分为两部分：



​			① 渲染层和逻辑层之间的通信

​				由微信客户端进行转发



​			② 逻辑层和第三方服务器之间的通信

​				由微信客户端进行转发



<img src="/wxImages/小程序的通信模型.png" alt="image-20230301220003481" style="zoom:80%;" />



------



## 6.小程序的宿主环境 - 运行机制



#### 			6.1 小程序启动的过程



​					①把小程序的代码包下载到本地

​					②解析 app.json 全局配置文件

​					③执行 app.js 小程序入口文件，调用 App() 创建小程序实例

​					④渲染小程序首页

​					⑤小程序启动完成

------



#### 		6.2 页面渲染的过程



​				①加载解析页面的 .json 配置文件

​				②加载页面的 .wxml 模板和 .wxss 样式

​				③执行页面的 .js 文件，调用 Page() 创建页面实例

​				④页面渲染完成

------



## 7. 小程序的宿主环境 - 组件



#### 	7.1 小程序中组件的分类

​		

​			小程序中的组件也是由宿主环境提供的，开发者可以基于组件快速搭建出漂亮的页面结构。官方把小程序的组件分为了 9 大类，分别是：

​					①视图容器

​					②基础内容

​					③表单组件

​					④导航组件

​					⑤媒体组件

​					⑥map 地图组件

​					⑦canvas 画布组件

​					⑧开放能力

​					⑨无障碍访问

------



#### 	7.2 常用的视图容器类组件



​		①view

​			普通视图区域

​			类似于 HTML 中的 div，是一个块级元素

​			常用来实现页面的布局效果

​		②scroll-view

​			可滚动的视图区域

​			常用来实现滚动列表效果

​		③swiper 和 swiper-item

​			轮播图容器组件 和 轮播图 item 组件

------



#### 		7.3 view 组件的基本使用

​			

​				实现如图的 flex 横向布局效果：



​							<img src="/wxImages/view组件的基本使用.png" alt="image-20230301220630086" style="zoom:50%;" />





​					代码：如下

```html
<view class="container">
  <view>A</view>
  <view>B</view>
  <view>C</view>
</view>
```



------



#### 7.4 scroll-view 组件的基本使用



​	实现如图的纵向滚动效果：



​			<img src="/wxImages/scroll-view组件的基本使用.png" alt="image-20230301220804829" style="zoom: 67%;" />





​			代码：

```html
<!-- scroll-y 属性，允许纵向滚动 -->
<!-- scroll-x 属性，允许横向滚动 -->
<!-- 注意：使用竖向滚动，必须给 scroll-view一个固定的高度 -->
<scroll-view class="container" scroll-y>
  <view>A</view>
  <view>B</view>
  <view>C</view>
</scroll-view>
```

```css
.container view{
  width: 150rpx;
  height: 150rpx;
  text-align: center;
  line-height: 150rpx;
}
.container view:nth-child(1){
  background-color: aquamarine;
}
.container view:nth-child(2){
  background-color: brown;
}
.container view:nth-child(3){
  background-color: palevioletred;
}
.container{
  display: flex;
  justify-content:space-around;
}

```



------



#### 7.5 swiper 和 swiper-item 组件的基本使用



​		swiper 和 swiper-item 组件的基本使用



​				实现如图的轮播图效果：



​						<img src="/wxImages/swiper和swiper-item组件的基本使用.png" alt="image-20230301221009601" style="zoom: 50%;" />



​			代码：

```html
<!-- 轮播图 -->
<swiper class="swiper-container" indicator-dots indicator-color="skyblue" indicator-active-color="white" autoplay interval="2000" circular>
  <!-- 第一个轮播图 -->
  <swiper-item>
    <view class="item">1</view>
  </swiper-item>

  <!-- 第二个轮播图 -->
  <swiper-item>
    <view class="item">2</view>
  </swiper-item>

  <!-- 第三个轮播图 -->
  <swiper-item>
    <view class="item">3</view>
  </swiper-item>

</swiper>
```

````css

/* 纵向滚动 */
scroll-view{
  margin-top: 10px;
  display: none;
  text-align: center;
  border: 1px solid black;
  width: 150rpx;
  height: 150rpx;
} 

/* 轮播图 */
.swiper-container{
  height: 200rpx;
  margin-top: 10px;
}

.item{
  height: 100%;
  line-height: 200rpx;
  text-align: center;
}
swiper-item:nth-child(1) .item{
  background-color: teal;
}
swiper-item:nth-child(2) .item{
  background-color: sandybrown;
}
swiper-item:nth-child(3) .item{
  background-color: lavender;
}
````



------



#### 7.6 swiper 组件的常用属性



| 属性               | 类型 | 默认值         | 说明             |
| ---------------------- | -------- | ------------------ | -------------------- |
| indicator-dots         | boolean  | false              | 是否显示面板指示点   |
| indicator-color        | color    | rgba(0,  0, 0, .3) | 指示点颜色           |
| indicator-active-color | color    | #000000            | 当前选中的指示点颜色 |
| autoplay               | boolean  | false              | 是否自动切换         |
| interval               | number   | 5000               | 自动切换时间间隔     |
| circular               | boolean  | false              | 是否采用衔接滑动     |
| duration               | number   | 500                | 动画滑动的时间       |
| vertical               | boolean  | false              | 是否纵向滚动         |
|                        |          |                    |                      |





#### 7.7 常用的基础内容组件



​		①text

​			文本组件

​			类似于 HTML 中的 span 标签，是一个行内元素

​		②rich-text

​			富文本组件

​			支持把 HTML 字符串渲染为 WXML 结构



#### 7.8  text 组件的基本使用



​	通过 text 组件的 selectable 属性，实现长按选中文本内容的效果：



​					<img src="/wxImages/text组件的基本使用.png" alt="image-20230301221312057" style="zoom:67%;" />



​				代码：

````html
<!-- text 组件
        使用 selectable 支持长按选中
 -->
<view>
  手机号支持长按选中效果<text selectable>111312323</text>
</view>
````



------



#### 7.9 rich-text 组件的基本使用



​		通过 rich-text 组件的 nodes 属性节点，把 HTML 字符串渲染为对应的 UI 结构：



​				<img src="/wxImages/rich-text组件的基本使用.png" alt="image-20230301221413326" style="zoom:67%;" />



​				代码：

```html
<!-- rich-text 可以渲染html标签 -->
<rich-text nodes="<h1 style='color:red;'>标题</h1>"></rich-text>
```



------



#### 7.10 其它常用组件



​		①button

​			按钮组件

​			功能比 HTML 中的 button 按钮丰富

​			通过 open-type 属性可以调用微信提供的各种功能（客服、转发、获取用户授权、获取用户信息等）



​		②image

​			图片组件

​			image 组件默认宽度约 300px、高度约 240px



​		③navigator（后面课程会专门讲解）

​			页面导航组件

​			类似于 HTML 中的 a 链接



------



#### 7.11 button 按钮的基本使用



​		<img src="/wxImages/button组件的基本使用.png" alt="image-20230301221620851" style="zoom: 67%;" />



​			代码：

```html
<!-- button 按钮 -->
<view>
  <!-- 默认 button 按钮(灰色背景) -->
  <button>默认按钮</button>
  <!-- 主色调按钮(绿色背景) -->
  <button type="primary">主色调按钮</button>
  <!-- 警告按钮（字体是红色的） -->
  <button type="warn">警告按钮</button>
  <!-- 小尺寸按钮 -->
  <button size="mini">小尺寸按钮</button>
  <!-- 镂空按钮(背景颜色是白色的，边框线是黑色的) -->
  <button plain>镂空按钮</button>
</view>
```



------



#### 7.12 image 组件的基本使用



​			<img src="/wxImages/image组件的基本使用.png" alt="image-20230301221708514" style="zoom: 50%;" />



​	代码：

```html
<!-- image组件 -->
<view>
  <image></image>
  <image src="/pages/images/1.png" mode="heightFix"/>
</view>
```



------



#### 7.13 image 组件的 mode 属性



​		image 组件的 mode 属性用来指定图片的裁剪和缩放模式，常用的 mode 属性值如下：



| mode 值 | 说明                                                     |
| :-------------: | ------------------------------------------------------------ |
|   scaleToFill   | （默认值）缩放模式，不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素 |
|    aspectFit    | 缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。 |
|   aspectFill    | 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。 |
|    widthFix     | 缩放模式，宽度不变，高度自动变化，保持原图宽高比不变         |
|    heightFix    | 缩放模式，高度不变，宽度自动变化，保持原图宽高比不变         |

​			

------



## 8. 小程序的宿主环境 - API



#### 		8.1 小程序 API 概述



​				小程序中的 API 是由宿主环境提供的，通过这些丰富的小程序 API，开发者可以方便的调用微信提供的能力，例如：获取用户信息、本地存储、支付功能等。



------



#### 8.2 小程序 API 的 3 大分类



​		小程序官方把 API 分为了如下 3 大类：

​				①事件监听 API

​					特点：以 on 开头，用来监听某些事件的触发

​					举例：wx.onWindowResize(function callback) 监听窗口尺寸变化的事件



​				②同步 API

​					特点1：以 Sync 结尾的 API 都是同步 API

​					特点2：同步 API 的执行结果，可以通过函数返回值直接获取，如果执行出错会抛出异常

​					举例：wx.setStorageSync('key', 'value') 向本地存储中写入内容



​				③异步 API

​					特点：类似于 jQuery 中的 $.ajax(options) 函数，需要通过 success、fail、complete 接收调用的结果

​					举例：wx.request() 发起网络数据请求，通过 success 回调函数接收数据

------



## 9.协同工作和发布



#### 		9.1 了解权限管理需求



​				在中大型的公司里，人员的分工非常仔细：同一个小程序项目，一般会有不同岗位、不同角色的员工同时参与设计与开发。



​				此时出于管理需要，我们迫切需要对不同岗位、不同角色的员工的权限进行边界的划分，使他们能够高效的进行协同工作。





------



#### 		9.2 了解项目成员的组织结构

​	

​										<img src="/wxImages/了解项目成员的组织结构.png" alt="image-20230301222346678" style="zoom: 67%;" />





------



#### 9.3 小程序的开发流程



​		![image-20230301222507005](/wxImages/小程序的开发流程.png)





------



## 10.协同工作和发布 - 小程序成员管理



#### 		10.1 成员管理的两个方面

​			

​				小程序成员管理体现在管理员对小程序项目成员及体验成员的管理：



​					①项目成员：

​						表示参与小程序开发、运营的成员

​						可登录小程序管理后台

​					管理员可以添加、删除项目成员，并设置项目成员的角色



​				②体验成员：

​					表示参与小程序内测体验的成员

​					可使用体验版小程序，但不属于项目成员

​					管理员及项目成员均可添加、删除体验成员





<img src="/wxImages/成员管理的两个方面.png" alt="image-20230301222730220" style="zoom: 67%;" />





------



#### 10.2 不同项目成员对应的权限



| 权限   | 运营者 | 开发者 | 数据分析者 |
| ---------- | ---------- | ---------- | -------------- |
| 开发者权限 |            | √      |                |
| 体验者权限 | √          | √      | √              |
| 登录       | √          | √      | √              |
| 数据分析   |            |            | √              |
| 微信支付   | √          |            |                |
| 推广       | √          |            |                |
| 开发管理   | √          |            |                |
| 开发设置   |            | √      |                |





| 权限       | 运营者 | 开发者 | 数据分析者 |
| -------------- | ---------- | ---------- | -------------- |
| 暂停服务       | √          |            |                |
| 解除关联公众号 | √          |            |                |
| 腾讯云管理     |            | √      |                |
| 小程序插件     | √          |            |                |
| 游戏运营管理   | √          |            |                |



------



#### 10.3 开发者的权限说明



​		① 开发者权限：可使用小程序开发者工具及对小程序的功能进行代码开发

​		② 体验者权限：可使用体验版小程序

​		③ 登录权限：可登录小程序管理后台，无需管理员确认

​		④ 开发设置：设置小程序服务器域名、消息推送及扫描普通链接二维码打开小程序

​		⑤ 腾讯云管理：云开发相关设置

------



#### 10.4 添加项目成员和体验成员



<img src="/wxImages/添加项目成员和体验成员.png" alt="image-20230301223009264" style="zoom: 50%;" />





------



## 11. 协同工作和发布 - 小程序的版本



#### 		11.1 软件开发过程中的不同版本



​				在软件开发过程中，根据时间节点的不同，会产出不同的软件版本，例如：

​					①开发者编写代码的同时，对项目代码进行自测（开发版本）

​					②直到程序达到一个稳定可体验的状态时，开发者把体验版本给到产品经理和测试人员进行体验测试

​					③最后修复完程序的 Bug 后，发布正式版供外部用户使用



------



#### 		11.2 小程序的版本



​				

| 版本阶段 | 说明                                                     |
| ------------ | ------------------------------------------------------------ |
| 开发版本     | 使用开发者工具，可将代码上传到开发版本中。  开发版本只保留每人最新的一份上传的代码。     点击提交审核，可将代码提交审核。开发版本可删除，不影响线上版本和审核中版本的代码。 |
| 体验版本     | 可以选择某个开发版本作为体验版，并且选取一份体验版。         |
| 审核中的版本 | 只能有一份代码处于审核中。有审核结果后可以发布到线上，也可直接重新提交审核，覆盖原审核版本。 |
| 线上版本     | 线上所有用户使用的代码版本，该版本代码在新版本代码发布后被覆盖更新。 |





------



## 12. 协同工作和发布 - 发布上线



#### 		12.1 小程序发布上线的整体步骤



​			一个小程序的发布上线，一般要经过上传代码 -> 提交审核 -> 发布这三个步骤。



#### 		12.2 上传代码



​				①点击开发者工具顶部工具栏中的“上传” 按钮

​				②填写版本号以及项目备注

​	

<img src="/wxImages/协同工作和发布(上传代码).png" alt="image-20230301223353214" style="zoom: 50%;" />

------



#### 	12.3 在后台查看上传之后的版本



​			登录小程序管理后台 -> 管理 -> 版本管理 -> 开发版本，即可查看刚才提交上传的版本了：



<img src="/wxImages/在后台查看上传之后的版本.png" alt="image-20230301223505759" style="zoom: 50%;" />



------



#### 	12.4提交审核



​		为什么需要提交审核：为了保证小程序的质量，以及符合相关的规范，小程序的发布是需要经过腾讯官方审核的。

​		提交审核的方式：在开发版本的列表中，点击“提交审核”按钮之后，按照页面提示填写相关的信息，就能把小程序提交到腾讯官方进行审核。



<img src="/wxImages/小程序的上线和发布(提交审核).png" alt="image-20230301223650677" style="zoom:50%;" />



------



#### 	12.5 发布



​		审核通过之后，管理员的微信中会收到小程序通过审核的通知，此时在审核版本的列表中，点击“发布”按钮之后，即可把“审核通过”的版本发布为“线上版本”，供所有小程序用户访问和使用。



<img src="/wxImages/小程序的发布.png" alt="image-20230301223754758" style="zoom:50%;" />





------



#### 12.6 基于小程序码进行推广



​	相对于普通二维码来说，小程序码的优势如下：

​			①在样式上更具辨识度和视觉冲击力

​			②能够更加清晰地树立小程序的品牌形象

​			③可以帮助开发者更好地推广小程序



​									<img src="/wxImages/微信的二维码.png" alt="image-20230301223952401" style="zoom: 67%;" />



​		●获取小程序码的 5 个步骤：

​			登录小程序管理后台 -> 设置 -> 基本设置 -> 基本信息 -> 小程序码及线下物料下载

​					

​									<img src="/wxImages/小程序的二维码.png" alt="image-20230301224032993" style="zoom:67%;" />



------





## 13. 协同工作和发布 - 运营数据



#### 	13.1 查看小程序运营数据的两种方式





​			①在“小程序后台”查看

​				1.登录小程序管理后台

​				2.点击侧边栏的“统计”

​				3.点击相应的 tab 可以看到相关的数据



​		②使用“小程序数据助手”查看

​				1.打开微信

​				2.搜索“小程序数据助手”

​				3.查看已发布的小程序相关的数据



### 总结



​		①能够知道如何创建小程序项目

​			微信开发者工具的使用、appID 的获取



​		②能够清楚小程序项目的基本组成结构

​			app.js、app.json、app.wxss、pages 文件夹



​		③能够知道小程序页面由几部分组成

​			wxml、wxss、json、js



​		④能够知道小程序中常见的组件如何使用

​			view、text、image



​		⑤能够知道小程序如何进行协同开发和发布

​			成员管理、发布小程序、查看运营数据



## 14. WXML模板语法

​	

### 		14.1 数据绑定



#### 					14.1.1  数据绑定的基本原则



​						①在 data 中定义数据

​						②在 WXML 中使用数据

​	

------

#### 						

#### 					14.1.2  在 data 中定义页面的数据



​							在页面对应的 .js 文件中，把数据定义到 data 对象中即可：



![image-20230302214608481](/wxImages/在data中定义页面的数据.png)



​		代码：

```html
<view>{{ info }}</view>
```

````js
data:{
    info:'hello world'
}
````

------



#### 				14.1.3 Mustache 语法的格式

​		![image-20230302214758893](/wxImages/Mustache语法的格式.png)





#### 				14.1.4  Mustache 语法的应用场景



​						Mustache 语法的主要应用场景如下：



​								绑定内容

​								绑定属性

```apl
							运算（三元运算、算术运算等）
```

------



#### 				14.1.5 动态绑定内容



​						页面的数据如下：

​								<img src="/wxImages/动态绑定内容js.png" alt="image-20230302215103708" style="zoom:67%;" />



​					页面的结构如下：

​								<img src="/wxImages/动态绑定内容html.png" alt="image-20230302215205006" style="zoom:67%;" />



------

​	

#### 			14.1.6 动态绑定属性



​				页面的数据如下：

​								<img src="/wxImages/动态绑定属性js.png" alt="image-20230302215303968" style="zoom:67%;" />



​				页面的结构如下：



<img src="/wxImages/动态绑定属性html.png" alt="image-20230302215343465" style="zoom:67%;" />



------



#### 			14.1.7 三元运算



​					页面的数据如下：

​							<img src="/wxImages/三元运算符js.png" alt="image-20230302215441371" style="zoom:67%;" />



​					页面的结构如下：



​						<img src="/wxImages/三元运算html.png" alt="image-20230302215605041" style="zoom:67%;" />

------



#### 			14.1.8 算数运算



​					页面的数据如下：



​						<img src="/wxImages/算数运算符js.png" alt="image-20230302215808434" style="zoom:67%;" />



​					页面的结构如下：



<img src="/wxImages/算数运算html.png" alt="image-20230302215842583" style="zoom:67%;" />



------



### 			14.2 事件

​	

#### 						14.2.1 什么是事件



​								事件是渲染层到逻辑层的通讯方式。通过事件可以将用户在渲染层产生的行为，反馈到逻辑层进行业务的处理



<img src="/wxImages/什么是事件.png" alt="image-20230302220021498" style="zoom:67%;" />

------



#### 					14.2.2 小程序中常用的事件

​		

| 类型 | 绑定方式              | 事件描述                                    |
| :------- | ------------------------- | :---------------------------------------------- |
| tap      | bindtap 或 bind:tap       | 手指触摸后马上离开，类似于 HTML 中的 click 事件 |
| input    | bindinput 或 bind:input   | 文本框的输入事件                                |
| change   | bindchange 或 bind:change | 状态改变时触发                                  |



------



#### 					14.2.3 事件对象的属性列表



​							当事件回调触发的时候，会收到一个事件对象 event，它的详细属性如下表所示：



| 属性       | 类型 | 说明                                     |
| -------------- | -------- | -------------------------------------------- |
| type           | String   | 事件类型                                     |
| timeStamp      | Integer  | 页面打开到触发事件所经过的毫秒数             |
| target         | Object   | 触发事件的组件的一些属性值集合               |
| currentTarget  | Object   | 当前组件的一些属性值集合                     |
| detail         | Object   | 额外的信息                                   |
| touches        | Array    | 触摸事件，当前停留在屏幕中的触摸点信息的数组 |
| changedTouches | Array    | 触摸事件，当前变化的触摸点信息的数组         |



------



#### 				14.2.4 target 和 currentTarget 的区别



​						target 是触发该事件的源头组件，而 currentTarget 则是当前事件所绑定的组件。举例如下：



​							<img src="/wxImages/target和currentTarget的区别.png" alt="image-20230302220307341" style="zoom:67%;" />





​							点击内部的按钮时，点击事件以冒泡的方式向外扩散，也会触发外层 view 的 tap 事件处理函数。

​							此时，对于外层的 view 来说：

​									e.target 指向的是触发事件的源头组件，因此，e.target 是内部的按钮组件

​									e.currentTarget 指向的是当前正在触发事件的那个组件，因此，e.currentTarget 是当前的 view 组件



------



#### 					14.2.5 bindtap 的语法格式



​							在小程序中，不存在 HTML 中的 onclick 鼠标点击事件，而是通过 tap 事件来响应用户的触摸行为。



​								①通过 bindtap，可以为组件绑定 tap 触摸事件，语法如下：



​										<img src="/wxImages/bindtap语法格式1.png" alt="image-20230302220505144" style="zoom:67%;" />



​							②在页面的 .js 文件中定义对应的事件处理函数，事件参数通过形参 event（一般简写成 e） 来接收：



​									<img src="/wxImages/bindtap语法格式2.png" alt="image-20230302220544708" style="zoom:67%;" />



------



#### 				14.2.6 在事件处理函数中为 data 中的数据赋值



​							通过调用 this.setData(dataObject) 方法，可以给页面 data 中的数据重新赋值，示例如下：



​									<img src="/wxImages/在事件处理函数中为data中的数据赋值.png" alt="image-20230302220803664" style="zoom:67%;" />



------





#### 	14.2.7 事件传参



##### 			第一种方式通过()传参：

​				小程序中的事件传参比较特殊，不能在绑定事件的同时为事件处理函数传递参数。例如，下面的代码将不能正常工作：



​									<img src="/wxImages/事件传参.png" alt="image-20230302220924410" style="zoom:67%;" />



​			因为小程序会把 bindtap 的属性值，统一当作事件名称来处理，相当于要调用一个名称为 btnHandler(123) 的事件处理函数。



##### 第二种方式通过data-xx传参：



​			可以为组件提供 data-* 自定义属性传参，其中 代表的是参数的名字，示例代码如下：

​	

​									<img src="/wxImages/data-xxx自定义属性传参.png" alt="image-20230302221037861" style="zoom:67%;" />





​					最终：

​						info 会被解析为参数的名字

​						数值 2 会被解析为参数的值

​	

##### 获取参数值：

​			在事件处理函数中，通过 event.target.dataset.参数名 即可获取到具体参数的值，示例代码如下：



​									<img src="/wxImages/事件传参event.target.dataset.参数名.png" alt="image-20230302221220131" style="zoom:67%;" />



------



#### 	14.2.8 bindinput 的语法格式



​		在小程序中，通过 input 事件来响应文本框的输入事件，语法格式如下：



​			①通过 bindinput，可以为文本框绑定输入事件：



​					<img src="/wxImages/bindinput的语法格式1.png" alt="image-20230302221751328" style="zoom:67%;" />



​			②在页面的 .js 文件中定义事件处理函数：



​					<img src="/wxImages/bindinput的语法格式2.png" alt="image-20230302221829360" style="zoom:67%;" />



------



#### 		14.2.9 实现文本框和data之间的数据同步



##### 				实现步骤：

​					①定义数据

​					②渲染结构

​					③美化样式

​					④绑定 input 事件处理函数



###### 			①定义数据

​			

​						<img src="/wxImages/实现文本框和data之间的数据同步-定义数据.png" 	alt="image-20230302222130663" style="zoom:67%;" />



###### 		②渲染结构



​						<img src="/wxImages/实现文本框和data之间的数据同步-渲染结构.png" alt="image-20230302222223154" style="zoom:67%;" />



###### 	③美化样式

​	

​						<img src="/wxImages/实现文本框和data之间的数据同步-美化样式.png" alt="image-20230302222344510" style="zoom:67%;" />



###### ④绑定 input 事件处理函数



<img src="/wxImages/实现文本框和data之间的数据同步-绑定input事件处理函数.png" alt="image-20230302222423626" style="zoom:67%;" />



------



### 	14.3 模板语法 -条件渲染



#### 				14.3.1 wx:if



​						在小程序中，使用 wx:if="{{condition}}" 来判断是否需要渲染该代码块：



​							<img src="/wxImages/条件渲染1.png" alt="image-20230302222658506" style="zoom:67%;" />



​						也可以用 wx:elif 和 wx:else 来添加 else 判断：

<img src="/wxImages/条件渲染02.png" alt="image-20230302222755993" style="zoom:67%;" />



------



#### 14.3.2 结合 <block /> 使用 wx:if



​		如果要一次性控制多个组件的展示与隐藏，可以使用一个 <block></block> 标签将多个组件包装起来，并在<block /> 标签上使用 wx:if 控制属性，示例如下：



​				<img src="/wxImages/结合block使用if.png" alt="image-20230302223102505" style="zoom:67%;" />



> 注意： <block /> 并不是一个组件，它只是一个包裹性质的容器，不会在页面中做任何渲染。





------



#### 14.3.3 hidden



​			在小程序中，直接使用 hidden="{{ condition }}" 也能控制元素的显示与隐藏：



<img src="/wxImages/hidden.png" alt="image-20230302223233492" style="zoom:67%;" />



------



#### 14.3.4 wx:if 与 hidden 的对比



##### 		①运行方式不同



​			wx:if 以动态创建和移除元素的方式，控制元素的展示与隐藏

​			hidden 以切换样式的方式（display: none/block;），控制元素的显示与隐藏



##### 		②使用建议



​			频繁切换时，建议使用 hidden

​			控制条件复杂时，建议使用 wx:if 搭配 wx:elif、wx:else 进行展示与隐藏的切换



------



#### 12.4 模板语法 - 列表渲染 



#### 	14.4.1  wx:for



​		通过 wx:for 可以根据指定的数组，循环渲染重复的组件结构，语法示例如下：



<img src="/wxImages/for列表渲染.png" alt="image-20230302223608411" style="zoom:67%;" />



​		默认情况下，当前循环项的索引用 index 表示；当前循环项用 item 表示。



------



#### 	14.4.2 手动指定索引和当前项的变量名



​		使用 wx:for-index 可以指定当前循环项的索引的变量名

​		使用 wx:for-item 可以指定当前项的变量名



​			示例代码如下：

<img src="/wxImages/手动指定索引和当前项的变量名.png" alt="image-20230302223754872" style="zoom:67%;" />



------



#### 	14.4.3  wx:key 的使用



​		类似于 Vue 列表渲染中的 :key，小程序在实现列表渲染时，也建议为渲染出来的列表项指定唯一的 key 值，从而提高渲染的效率，示例代码如下：



​								<img src="/wxImages/key的使用.png" alt="image-20230302223916385" style="zoom:67%;" />



------



## 15. WXSS 模板样式



#### 	15.1.1  什么是 WXSS



​		WXSS (WeiXin Style Sheets)是一套样式语言，用于美化 WXML 的组件样式，类似于网页开发中的 CSS。





------



#### 	15.1.2 WXSS 和 CSS 的关系



​		WXSS 具有 CSS 大部分特性，同时，WXSS 还对 CSS 进行了扩充以及修改，以适应微信小程序的开发。与 CSS 相比，WXSS 扩展的特性有：



​		rpx 尺寸单位

​		@import 样式导入



<img src="/wxImages/WXSS和CSS的关系.png" style="zoom:67%;" />



------



## 16. WXSS 模板样式 - rpx



#### 	16.1.1 什么是 rpx 尺寸单位



​		rpx（responsive pixel）是微信小程序独有的，用来解决屏适配的尺寸单位。



------



#### 	16.1.2. rpx 的实现原理



​		rpx 的实现原理非常简单：鉴于不同设备屏幕的大小不同，为了实现屏幕的自动适配，rpx 把所有设备的屏幕，在宽度上等分为 750 份（即：当前屏幕的总宽度为 750rpx）。



​	在较小的设备上，1rpx 所代表的宽度较小

​	在较大的设备上，1rpx 所代表的宽度较大



​	小程序在不同设备上运行的时候，会自动把 rpx 的样式单位换算成对应的像素单位来渲染，从而实现屏幕适配。



------



#### 	16.1.3. rpx 与 px 之间的单位换算/*



​		在 iPhone6 上，屏幕宽度为375px，共有 750 个物理像素，等分为 750rpx。则：

​		

​			750rpx = 375px = 750 物理像素

​		    1rpx = 0.5px = 1物理像素



| 设备      | rpx换算px (屏幕宽度/750) | px换算rpx (750/屏幕宽度) |
| ------------- | ---------------------------- | ---------------------------- |
| iPhone5       | 1rpx = 0.42px                | 1px  = 2.34rpx               |
| iPhone6       | 1rpx = 0.5px     | 1px = 2rpx                   |
| iPhone6  Plus | 1rpx = 0.552px               | 1px  = 1.81rpx               |





​	官方建议：开发微信小程序时，设计师可以用 iPhone6 作为视觉稿的标准。

​	开发举例：在 iPhone6 上如果要绘制宽100px，高20px的盒子，换算成rpx单位，宽高分别为 200rpx 和 40rpx。



------



## 17.WXSS 模板样式 - 样式导入



#### 	17.1.1  什么是样式导入



​		使用 WXSS 提供的 @import 语法，可以导入外联的样式表。



------



#### 	17.1.2 @import 的语法格式



​		@import 后跟需要导入的外联样式表的相对路径，用 ; 表示语句结束。示例如下：



<img src="/wxImages/@import的语法格式.png" alt="image-20230308192938105" style="zoom:67%;" />





------



## 18.WXSS 模板样式 - 全局样式和局部样式



#### 	18.1.1  全局样式



​		定义在 app.wxss 中的样式为全局样式，作用于每一个页面。





------



#### 	18.1.2 局部样式



​		在页面的 .wxss 文件中定义的样式为局部样式，只作用于当前页面。



> ​		注意：
>
> ​			①当局部样式和全局样式冲突时，根据就近原则，局部样式会覆盖全局样式
>
> ​			②当局部样式的权重大于或等于全局样式的权重时，才会覆盖全局的样式



------



## 19.全局配置



##### 	19.1全局配置文件及常用的配置项



​		小程序根目录下的 app.json 文件是小程序的全局配置文件。常用的配置项如下：

​			① pages

​				记录当前小程序所有页面的存放路径

​			② window

​				全局设置小程序窗口的外观

​			③ tabBar

​				设置小程序底部的 tabBar 效果

​			④ style

​				是否启用新版的组件样式



------



#### 		19.2 全局配置 - window



##### 			19.2 小程序窗口的组成部分



​									<img src="/wxImages/小程序窗口的组成部分.png" alt="image-20230308193431138" style="zoom:67%;" />



------



##### 		19.3 了解 window 节点常用的配置项



| 属性名                   | 类型 | 默认值 | 说明                                       |
| ---------------------------- | -------- | ---------- | ---------------------------------------------- |
| navigationBarTitleText       | String   | 字符串     | 导航栏标题文字内容                             |
| navigationBarBackgroundColor | HexColor | #000000    | 导航栏背景颜色，如 #000000                     |
| navigationBarTextStyle       | String   | white      | 导航栏标题颜色，仅支持 black / white           |
| backgroundColor              | HexColor | #ffffff    | 窗口的背景色                                   |
| backgroundTextStyle          | String   | dark       | 下拉 loading 的样式，仅支持 dark / light       |
| enablePullDownRefresh        | Boolean  | false      | 是否全局开启下拉刷新                           |
| onReachBottomDistance        | Number   | 50         | 页面上拉触底事件触发时距页面底部距离，单位为px |





------



##### 	19.4 设置导航栏的标题



​		设置步骤：app.json -> window -> navigationBarTitleText

​		需求：把导航栏上的标题，从默认的 “WeChat”修改为“黑马程序员”，效果如图所示：



​												<img src="/wxImages/设置导航栏的标题.png" alt="image-20230308193636662" style="zoom:67%;" />



------



##### 	19.5 设置导航栏的背景色



​			设置步骤：app.json -> window -> navigationBarBackgroundColor

​			需求：把导航栏标题的背景色，从默认的 #fff 修改为 #2b4b6b ，效果如图所示：



<img src="/wxImages/设置导航的背景色.png" alt="image-20230308193748093" style="zoom:67%;" />



------



##### 	19.6 设置导航栏的标题颜色



​			设置步骤：app.json -> window -> navigationBarTextStyle

​			需求：把导航栏上的标题颜色，从默认的 black 修改为 white ，效果如图所示：

​	

​													<img src="/wxImages/设置导航的标题颜色.png" alt="image-20230308193901437" style="zoom:67%;" />





------



##### 		19.7 全局开启下拉刷新功能



​					概念：下拉刷新是移动端的专有名词，指的是通过手指在屏幕上的下拉滑动操作，从而重新加载页面数据的行为。

​					设置步骤：app.json -> window -> 把 enablePullDownRefresh 的值设置为 true



​					注意：在 app.json 中启用下拉刷新功能，会作用于每个小程序页面！





------



##### 		19.8 设置下拉刷新时窗口的背景色



​					当全局开启下拉刷新功能之后，默认的窗口背景为白色。如果自定义下拉刷新窗口背景色，设置步骤为: app.json -> window -> 为 backgroundColor 指定16进制的颜色值 #efefef。效果如下：



​										<img src="/wxImages/设置下拉刷新时窗口的背景颜色.png" alt="image-20230308194105848" style="zoom:67%;" />





------



##### 	19.9 设置下拉刷新时 loading 的样式



​			当全局开启下拉刷新功能之后，默认窗口的 loading 样式为白色，如果要更改 loading 样式的效果，设置步骤为 app.json -> window -> 为 backgroundTextStyle 指定 dark 值。效果如下：



​											<img src="/wxImages/设置下拉刷新时loading的样式.png" alt="image-20230308194314310" style="zoom:67%;" />





------

​	

##### 	19.10 设置上拉触底的距离



​			概念：上拉触底是移动端的专有名词，通过手指在屏幕上的上拉滑动操作，从而加载更多数据的行为。

​			设置步骤： app.json -> window -> 为 onReachBottomDistance 设置新的数值



​			注意：默认距离为50px，如果没有特殊需求，建议使用默认值即可。





------



#### 		19.11 全局配置 - tabBar



##### 				19.12 什么是 tabBar



​				tabBar 是移动端应用常见的页面效果，用于实现多页面的快速切换。小程序中通常将其分为：

​					底部 tabBar

​					顶部 tabBar



​			注意：

​				tabBar中只能配置最少 2 个、最多 5 个 tab 页签

​				当渲染顶部 tabBar 时，不显示 icon，只显示文本



​												<img src="/wxImages/底部tabbar1.png" alt="image-20230308195059646" style="zoom: 50%;" /><img src="/wxImages/底部tabbar2.png" alt="image-20230308195114366" style="zoom: 50%;" />





------



##### 		19.13 tabBar 的 6 个组成部分



​			① backgroundColor：tabBar 的背景色

​			② selectedIconPath：选中时的图片路径

​			③ borderStyle：tabBar 上边框的颜色

​			④ iconPath：未选中时的图片路径

​			⑤ selectedColor：tab 上的文字选中时的颜色

​			⑥ color：tab 上文字的默认（未选中）颜色



<img src="/wxImages/tabbar6个组成部分.png" alt="image-20230308195447426" style="zoom:67%;" />



------



​	19.14  tabBar 节点的配置项



| 属性        | 类型 | 必填 | 默认值 | 描述                                     |
| --------------- | -------- | -------- | ---------- | -------------------------------------------- |
| position        | String   | 否       | bottom     | tabBar 的位置，仅支持 bottom/top             |
| borderStyle     | String   | 否       | black      | tabBar 上边框的颜色，仅支持 black/white      |
| color           | HexColor | 否       |            | tab 上文字的默认（未选中）颜色               |
| selectedColor   | HexColor | 否       |            | tab 上的文字选中时的颜色                     |
| backgroundColor | HexColor | 否       |            | tabBar 的背景色                              |
| list            | Array    | 是       |            | tab 页签的列表，  最少 2  个、最多  5 个 tab |





------



##### 	19.15 每个 tab 项的配置选项



| 属性         | 类型 | 必填 | 描述                                              |
| ---------------- | -------- | -------- | ----------------------------------------------------- |
| pagePath         | String   | 是       | 页面路径，页面必须在 pages  中预先定义                |
| text             | String   | 是       | tab 上显示的文字                                      |
| iconPath         | String   | 否       | 未选中时的图标路径；当 postion 为 top 时，不显示 icon |
| selectedIconPath | String   | 否       | 选中时的图标路径；当 postion 为 top 时，不显示 icon   |



------



## 20. 页面配置



#### 	20.1 页面配置文件的作用



​		小程序中，每个页面都有自己的 .json 配置文件，用来对当前页面的窗口外观、页面效果等进行配置。



------



#### 	20.2 页面配置和全局配置的关系



​		小程序中，app.json 中的 window 节点，可以全局配置小程序中每个页面的窗口表现。

​		如果某些小程序页面想要拥有特殊的窗口表现，此时，“页面级别的 .json 配置文件”就可以实现这种需求。



​		注意：当页面配置与全局配置冲突时，根据就近原则，最终的效果以页面配置为准。



------



#### 	20.3页面配置中常用的配置项



| 属性                     | 类型 | 默认值 | 描述                                         |
| ---------------------------- | -------- | ---------- | :----------------------------------------------- |
| navigationBarBackgroundColor | HexColor | #000000    | 当前页面导航栏背景颜色，如 #000000               |
| navigationBarTextStyle       | String   | white      | 当前页面导航栏标题颜色，仅支持 black / white     |
| navigationBarTitleText       | String   |            | 当前页面导航栏标题文字内容                       |
| backgroundColor              | HexColor | #ffffff    | 当前页面窗口的背景色                             |
| backgroundTextStyle          | String   | dark       | 当前页面下拉 loading 的样式，仅支持 dark / light |
| enablePullDownRefresh        | Boolean  | false      | 是否为当前页面开启下拉刷新的效果                 |
| onReachBottomDistance        | Number   | 50         | 页面上拉触底事件触发时距页面底部距离，单位为 px  |





------



## 	21.网络数据请求



#### 		21.1 小程序中网络数据请求的限制



​			出于安全性方面的考虑，小程序官方对数据接口的请求做出了如下两个限制：



​				①只能请求 HTTPS 类型的接口

​				②必须将接口的域名添加到信任列表中





<img src="/wxImages/小程序中网络数据请求的限制.png" alt="image-20230308200126923" style="zoom:67%;" />



------



#### 21.2  配置 request 合法域名



​	需求描述：假设在自己的微信小程序中，希望请求 https://www.escook.cn/ 域名下的接口

​	配置步骤：登录微信小程序管理后台 -> 开发 -> 开发设置 -> 服务器域名 -> 修改 request 合法域名



​		注意事项：

​				①域名只支持 https 协议

​				②域名不能使用 IP 地址或 localhost

​				③域名必须经过 ICP 备案

​				④服务器域名一个月内最多可申请 5 次修改



------



#### 	21.3 发起 GET 请求



​		调用微信小程序提供的 wx.request() 方法，可以发起 GET 数据请求，示例代码如下：



​						<img src="/wxImages/发起GET请求.png" alt="image-20230308200343461" style="zoom:67%;" />





------



#### 	21.4 发起 POST 请求



​		调用微信小程序提供的 wx.request() 方法，可以发起 POST 数据请求，示例代码如下：



<img src="/wxImages/发起POST请求.png" alt="image-20230308200441620" style="zoom:67%;" />





------



#### 	21.5 在页面刚加载时请求数据



​			在很多情况下，我们需要在页面刚加载的时候，自动请求一些初始化的数据。此时需要在页面的 onLoad 事件中调用获取数据的函数，示例代码如下：



​									<img src="/wxImages/在页面刚加载时请求数据.png" alt="image-20230308200706500" style="zoom:67%;" />





------



#### 	21.6 跳过 request 合法域名校验



​		如果后端程序员仅仅提供了 http 协议的接口、暂时没有提供 https 协议的接口。



​		此时为了不耽误开发的进度，我们可以在微信开发者工具中，临时开启「开发环境不校验请求域名、TLS 版本及 HTTPS 证书」选项，跳过 request 合法域名的校验。



> ​		注意：
>
> ​				跳过 request 合法域名校验的选项，仅限在开发与调试阶段使用！



<img src="/wxImages/跳过request合法域名校验.png" alt="image-20230308200838173" style="zoom:67%;" />



------



#### 	21.7 关于跨域和 Ajax 的说明



​		跨域问题只存在于基于浏览器的 Web 开发中。由于小程序的宿主环境不是浏览器，而是微信客户端，所以小程序中不存在跨域的问题。

​		Ajax 技术的核心是依赖于浏览器中的 XMLHttpRequest 这个对象，由于小程序的宿主环境是微信客户端，所以小程序中不能叫做“发起 Ajax 请求”，而是叫做“发起网络数据请求”。





------



## 22.页面导航



#### 	22.1.1 什么是页面导航



​		页面导航指的是页面之间的相互跳转。例如，浏览器中实现页面导航的方式有如下两种：

​			①<a /> 链接

​			②location.href





------



#### 	22.2 .2小程序中实现页面导航的两种方式

​	

​		① 声明式导航

​				在页面上声明一个 <navigator /> 导航组件

​				通过点击 <navigator /> 组件实现页面跳转



​		② 编程式导航

​				调用小程序的导航 API，实现页面的跳转





------



#### 	22.3 页面导航 - 声明式导航



##### 		22.3.1. 导航到 tabBar 页面



​			tabBar 页面指的是被配置为 tabBar 的页面。

​			在使用 <navigator /> 组件跳转到指定的 tabBar 页面时，需要指定 url 属性和 open-type 属性，其中：

​				url 表示要跳转的页面的地址，必须以 / 开头

​				open-type 表示跳转的方式，必须为 switchTab



​		示例代码如下：



<img src="/wxImages/导航到tabBar页面.png" alt="image-20230310232805319" style="zoom: 50%;" />





------



##### 	22.3.2 导航到非 tabBar 页面



​		非 tabBar 页面指的是没有被配置为 tabBar 的页面。

​		在使用 <navigator /> 组件跳转到普通的非 tabBar 页面时，则需要指定 url 属性和 open-type 属性，其中：

​				url 表示要跳转的页面的地址，必须以 / 开头

​				open-type 表示跳转的方式，必须为 navigate



​			示例代码如下：



<img src="/wxImages/导航到非tabBar页面.png" alt="image-20230310232952363" style="zoom:50%;" />





> 注意：为了简便，在导航到非 tabBar 页面时，open-type="navigate" 属性可以省略。





------



##### 	22.3.3 后退导航



​		如果要后退到上一页面或多级页面，则需要指定 open-type 属性和 delta 属性，其中：

​			open-type 的值必须是 navigateBack，表示要进行后退导航

​			delta 的值必须是数字，表示要后退的层级



​	示例代码如下：



<img src="/wxImages/后退导航.png" alt="image-20230310233131857" style="zoom: 67%;" />



> 注意：为了简便，如果只是后退到上一页面，则可以省略 delta 属性，因为其默认值就是 1。





------



#### 	22.4 页面导航 - 编程式导航



##### 		22.4.1 导航到 tabBar 页面



​			调用 wx.switchTab(Object object) 方法，可以跳转到 tabBar 页面。其中 Object 参数对象的属性列表如下：



| 属性 | 类型 | 是否必选 | 说明                                         |
| -------- | -------- | ------------ | ------------------------------------------------ |
| url      | string   | 是           | 需要跳转的 tabBar 页面的路径，路径后不能带参数   |
| success  | function | 否           | 接口调用成功的回调函数                           |
| fail     | function | 否           | 接口调用失败的回调函数                           |
| complete | function | 否           | 接口调用结束的回调函数（调用成功、失败都会执行） |



​		示例代码如下：



<img src="/wxImages/导航到tabBar页面(编程式导航).png" alt="image-20230310233340259" style="zoom:50%;" />



------



##### 	22.4.2 导航到非 tabBar 页面



​	调用 wx.navigateTo(Object object) 方法，可以跳转到非 tabBar 的页面。其中 Object 参数对象的属性列表如下：



| 属性 | 类型 | 是否必选 | 说明                                           |
| -------- | -------- | ------------ | -------------------------------------------------- |
| url      | string   | 是           | 需要跳转到的非 tabBar 页面的路径，路径后可以带参数 |
| success  | function | 否           | 接口调用成功的回调函数                             |
| fail     | function | 否           | 接口调用失败的回调函数                             |
| complete | function | 否           | 接口调用结束的回调函数（调用成功、失败都会执行）   |



​		示例代码如下：



<img src="/wxImages/导航到非tabBar页面(编程式导航).png" alt="image-20230310233504066" style="zoom:67%;" />



------



##### 	22.4.3 后退导航

​	

​		调用 wx.navigateBack(Object object) 方法，可以返回上一页面或多级页面。其中 Object 参数对象可选的属性列表如下：



| 属性 | 类型 | 默认值 | 是否必选 | 说明                                              |
| -------- | -------- | ---------- | ------------ | ----------------------------------------------------- |
| delta    | number   | 1          | 否           | 返回的页面数，如果 delta 大于现有页面数，则返回到首页 |
| success  | function |            | 否           | 接口调用成功的回调函数                                |
| fail     | function |            | 否           | 接口调用失败的回调函数                                |
| complete | function |            | 否           | 接口调用结束的回调函数（调用成功、失败都会执行）      |

​	

​	示例代码如下：



​						<img src="/wxImages/后退导航(编程式导航).png" alt="image-20230310233621532" style="zoom:67%;" />



------



#### 	22.5 页面导航 - 导航传参

​		

##### 		22.5.1 声明式导航传参



​			navigator 组件的 url 属性用来指定将要跳转到的页面的路径。同时，路径的后面还可以携带参数：

​				 参数与路径之间使用 ? 分隔

​				 参数键与参数值用 = 相连

​				 不同参数用 & 分隔



​	代码示例如下：



<img src="/wxImages/声明式导航传参.png" alt="image-20230310233802478" style="zoom: 67%;" />





------



##### 		22.5.2 编程式导航传参



​		调用 wx.navigateTo(Object object) 方法跳转页面时，也可以携带参数，代码示例如下：

​	

​							<img src="/wxImages/编程式导航传参.png" alt="image-20230310233911335" style="zoom:67%;" />





------



##### 	22.5.3 在 onLoad 中接收导航参数



​		通过声明式导航传参或编程式导航传参所携带的参数，可以直接在 onLoad 事件中直接获取到，示例代码如下



​						<img src="/wxImages/在onLoad中接收导航参数.png" alt="image-20230310234015614" style="zoom:67%;" />





------



### 		22.6 页面事件



------



#### 			22.7页面事件 - 下拉刷新事件



##### 					22.7.1 什么是下拉刷新



​					下拉刷新是移动端的专有名词，指的是通过手指在屏幕上的下拉滑动操作，从而重新加载页面数据的行为。



------



​		22.7.2 启用下拉刷新



​			启用下拉刷新有两种方式：

​				①全局开启下拉刷新

​					在 app.json 的 window 节点中，将 enablePullDownRefresh 设置为 true

​				②局部开启下拉刷新

​					在页面的 .json 配置文件中，将 enablePullDownRefresh 设置为 true



在实际开发中，推荐使用第 2 种方式，为需要的页面单独开启下拉刷新的效果。



------



##### 	22.7.3 配置下拉刷新窗口的样式



​		在全局或页面的 .json 配置文件中，通过 backgroundColor 和 backgroundTextStyle 来配置下拉刷新窗口的样式，其中：

​			backgroundColor 用来配置下拉刷新窗口的背景颜色，仅支持16 进制的颜色值

​			backgroundTextStyle 用来配置下拉刷新 loading 的样式，仅支持 dark 和 light





------



##### 	22.7.4 监听页面的下拉刷新事件



​		在页面的 .js 文件中，通过 onPullDownRefresh() 函数即可监听当前页面的下拉刷新事件。

​	例如，在页面的 wxml 中有如下的 UI 结构，点击按钮可以让 count 值自增 +1：



​						<img src="/wxImages/监听页面的下拉刷新事件.png" alt="image-202		30310234523079" style="zoom:67%;" />





​	在触发页面的下拉刷新事件的时候，如果要把 count 的值重置为 0，示例代码如下：



​						<img src="/wxImages/触发页面的下拉刷新事件.png" alt="image-20230310234601318" style="zoom:67%;" />





------



##### 		22.7.5 停止下拉刷新的效果



​			当处理完下拉刷新后，下拉刷新的 loading 效果会一直显示，不会主动消失，所以需要手动隐藏下拉刷新的 loading 效果。此时，调用 wx.stopPullDownRefresh() 可以停止当前页面的下拉刷新。示例代码如下：



​							<img src="/wxImages/停止下拉刷新的效果.png" alt="image-20230310234717784" style="zoom:67%;" />





------



#### 	22.8 页面事件 - 上拉触底事件



##### 			1. 什么是上拉触底



​			上拉触底是移动端的专有名词，通过手指在屏幕上的上拉滑动操作，从而加载更多数据的行为。



​		

------



##### 		2. 监听页面的上拉触底事件



​				在页面的 .js 文件中，通过 onReachBottom() 函数即可监听当前页面的上拉触底事件。示例代码如下：



​							<img src="/wxImages/监听页面的上拉触底事件.png" alt="image-20230310234855889" style="zoom:67%;" />





------



##### 	3. 配置上拉触底距离



​		上拉触底距离指的是触发上拉触底事件时，滚动条距离页面底部的距离。

​		可以在全局或页面的 .json 配置文件中，通过 onReachBottomDistance 属性来配置上拉触底的距离。

​		小程序默认的触底距离是 50px，在实际开发中，可以根据自己的需求修改这个默认值。



​	

------



##### 	4. 消息提示框



​		参数

|      | 属性     | 类型     | 默认值  | 必填 | 说明                                                         |      |
| :--: | :------- | :------- | :------ | :--- | :----------------------------------------------------------- | :--: |
|      | title    | string   |         | 是   | 提示的内容                                                   |      |
|      | icon     | string   | success | 否   | 图标                                                         |      |
|      | success  |          |         |      | 显示成功图标，此时 title 文本最多显示 7 个汉字长度           |      |
|      | error    |          |         |      | 显示失败图标，此时 title 文本最多显示 7 个汉字长度           |      |
|      | loading  |          |         |      | 显示加载图标，此时 title 文本最多显示 7 个汉字长度           |      |
|      | none     |          |         |      | 不显示图标，此时 title 文本最多可显示两行，[1.9.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)及以上版本支持 |      |
|      | image    | string   |         | 否   | 自定义图标的本地路径，image 的优先级高于 icon                |      |
|      | duration | number   | 1500    | 否   | 提示的延迟时间                                               |      |
|      | mask     | boolean  | false   | 否   | 是否显示透明蒙层，防止触摸穿透                               |      |
|      | success  | function |         | 否   | 接口调用成功的回调函数                                       |      |
|      | fail     | function |         | 否   | 接口调用失败的回调函数                                       |      |
|      | complete | function |         | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |      |



代码：

```js
wx.showToast({
 title: '成功',
  icon: 'success',
  duration: 2000
})
```




> 注意
>
> - [wx.showLoading](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showLoading.html) 和 [wx.showToast](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html) 同时只能显示一个
> - [wx.showToast](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html) 应与 [wx.hideToast](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.hideToast.html) 配对使用



​	

------

​	

##### 		5.显示 loading 提示框



​			显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框



​		参数：

​		

| 属性     | 类型     | 默认值 | 必填 | 说明                                             |
| :------- | :------- | :----- | :--- | :----------------------------------------------- |
| title    | string   |        | 是   | 提示的内容                                       |
| mask     | boolean  | false  | 否   | 是否显示透明蒙层，防止触摸穿透                   |
| success  | function |        | 否   | 接口调用成功的回调函数                           |
| fail     | function |        | 否   | 接口调用失败的回调函数                           |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |



示例代码



```js
wx.showLoading({
  title: '加载中',
})

setTimeout(function () {
  wx.hideLoading()
}, 2000)
```



> 注意
>
> - [wx.showLoading](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showLoading.html) 和 [wx.showToast](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html) 同时只能显示一个
> - [wx.showLoading](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showLoading.html) 应与 [wx.hideLoading](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.hideLoading.html) 配对使用





------



##### 	6.隐藏消息提示框

​	

​		参数：



| 属性       | 类型     | 默认值 | 必填 | 说明                                                         | 最低版本                                                     |
| :--------- | :------- | :----- | :--- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| noConflict | boolean  | false  | 否   | 目前 toast 和 loading 相关接口可以相互混用，此参数可用于取消混用特性 | [2.22.1](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| success    | function |        | 否   | 接口调用成功的回调函数                                       |                                                              |
| fail       | function |        | 否   | 接口调用失败的回调函数                                       |                                                              |
| complete   | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |                                                              |



------



#### 		页面事件 - 上拉触底案例



##### 				1. 案例效果展示



​													<img src="/wxImages/上拉触底案例.png" alt="image-20230310235058179" style="zoom:67%;" />



------



##### 			2. 案例的实现步骤



​				①定义获取随机颜色的方法

​				②在页面加载时获取初始数据

​				③渲染 UI 结构并美化页面效果

​				④在上拉触底时调用获取随机颜色的方法

​				⑤添加 loading 提示效果

​				⑥对上拉触底进行节流处理





------



##### 		3. 步骤1 - 定义获取随机颜色的方法



​							<img src="/wxImages/定义获取随机颜色的办法.png" alt="image-20230310235234957" style="zoom:67%;" />





------



##### 		3. 步骤2 - 在页面加载时获取初始数据



​						<img src="/wxImages/在页面加载时获取初始数据.png" alt="image-20230310235323155" style="zoom:67%;" />





------

​		

##### 		3. 步骤3 - 渲染 UI 结构并美化页面效果



​						<img src="/wxImages/渲染UI结构并美化页面效果.png" alt="image-20230310235427207" style="zoom:67%;" />





------



##### 	3. 步骤4 - 上拉触底时获取随机颜色



​						<img src="/wxImages/上拉触底时获取随机颜色.png" alt="image-20230310235519253" style="zoom:67%;" />





------



##### 	3. 步骤5 - 添加 loading 提示效果



​					<img src="/wxImages/添加loading提示效果.png" alt="image-20230310235609182" style="zoom:67%;" />



------



##### 	3. 步骤6 - 对上拉触底进行节流处理



​			①在 data 中定义 isloading 节流阀

​				false 表示当前没有进行任何数据请求

​				true 表示当前正在进行数据请求

​			②在 getColors() 方法中修改 isloading 节流阀的值

​				在刚调用 getColors 时将节流阀设置 true

​				在网络请求的 complete 回调函数中，将节流阀重置为 false

​			③在 onReachBottom 中判断节流阀的值，从而对数据请求进行节流控制

​				如果节流阀的值为 true，则阻止当前请求

​				如果节流阀的值为 false，则发起数据请求



------

## 	23.生命周期



------



#### 	1. 什么是生命周期



​		生命周期（Life Cycle）是指一个对象从创建 -> 运行 -> 销毁的整个阶段，强调的是一个时间段。例如：

​			张三出生，表示这个人生命周期的开始

​			张三离世，表示这个人生命周期的结束

​			中间张三的一生，就是张三的生命周期



​	我们可以把每个小程序运行的过程，也概括为生命周期：

​			小程序的启动，表示生命周期的开始

​			小程序的关闭，表示生命周期的结束

​			中间小程序运行的过程，就是小程序的生命周期





------



#### 	2. 生命周期的分类



​			在小程序中，生命周期分为两类，分别是：

​				① 应用生命周期

​						特指小程序从启动 -> 运行 -> 销毁的过程

​				② 页面生命周期

​					特指小程序中，每个页面的加载 -> 渲染 -> 销毁的过程



​			其中，页面的生命周期范围较小，应用程序的生命周期范围较大，如图所示：



<img src="/wxImages/生命周期的分类.png" alt="image-20230311230803004" style="zoom:67%;" />





------



#### 	3. 什么是生命周期函数



​		生命周期函数：是由小程序框架提供的内置函数，会伴随着生命周期，自动按次序执行。



​		生命周期函数的作用：允许程序员在特定的时间点，执行某些特定的操作。例如，页面刚加载的时候，可以在 onLoad 生命周期函数中初始化页面的数据。



> ​		注意：生命周期强调的是时间段，生命周期函数强调的是时间点。





------



#### 	4. 生命周期函数的分类



​		小程序中的生命周期函数分为两类，分别是：

​			① 应用的生命周期函数

​				特指小程序从启动 -> 运行 -> 销毁期间依次调用的那些函数

​			② 页面的生命周期函数

​				特指小程序中，每个页面从加载 -> 渲染 -> 销毁期间依次调用的那些函数



------



#### 	5. 应用的生命周期函数



​			小程序的应用生命周期函数需要在 app.js 中进行声明，示例代码如下：



​							<img src="/wxImages/应用的生命周期函数.png" alt="image-20230311230957224" style="zoom:50%;" />





------



#### 		6. 页面的生命周期函数



​				小程序的页面生命周期函数需要在页面的 .js 文件中进行声明，示例代码如下：



​								<img src="/wxImages/页面的生命周期函数.png" alt="image-20230311231043067" style="zoom:50%;" />



------



## 	24.WXS 脚本 



------



#### 			1. 什么是 wxs



​					WXS（WeiXin Script）是小程序独有的一套脚本语言，结合 WXML，可以构建出页面的结构。





------



#### 			2. wxs 的应用场景



​				wxml 中无法调用在页面的 .js 中定义的函数，但是，wxml 中可以调用 wxs 中定义的函数。因此，小程序中 wxs 的典型应用场景就是“过滤器”。



------



#### 		3. wxs 和 JavaScript 的关系



​				虽然 wxs 的语法类似于 JavaScript，但是 wxs 和 JavaScript 是完全不同的两种语言：

​					①wxs 有自己的数据类型

​						number 数值类型、string 字符串类型、boolean 布尔类型、object 对象类型、

​						function 函数类型、array 数组类型、  date 日期类型、   regexp 正则

​					②wxs 不支持类似于 ES6 及以上的语法形式

​						不支持：let、const、解构赋值、展开运算符、箭头函数、对象属性简写、etc...

​						支持：var 定义变量、普通 function 函数等类似于 ES5 的语法

​					③wxs 遵循 CommonJS 规范

​						module 对象

​						require() 函数

```apl
					module.exports 对象
```





------



#### 		4. 内嵌 wxs 脚本



​				wxs 代码可以编写在 wxml 文件中的 wxs 标签内，就像 Javascript 代码可以编写在 html 文件中的 script 标签内一样。

wxml 文件中的每个 <wxs></wxs> 标签，必须提供 module 属性，用来指定当前 wxs 的模块名称，方便在 wxml 中访问模块中的成员：



​								<img src="/wxImages/内嵌wxs脚本.png" alt="image-20230311231440407" style="zoom:50%;" />





------



#### 		5.定义外联的 wxs 脚本



​			wxs 代码还可以编写在以 .wxs 为后缀名的文件内，就像 javascript 代码可以编写在以 .js 为后缀名的文件中一样。示例代码如下：



<img src="/wxImages/定义外联的wxs脚本.png" alt="image-20230311231534072" style="zoom:50%;" />





------



#### 	6.使用外联的 wxs 脚本



​			在 wxml 中引入外联的 wxs 脚本时，必须为 wxs 标签添加 module 和 src 属性，其中：

​				module 用来指定模块的名称

​				src 用来指定要引入的脚本的路径，且必须是相对路径

​	示例代码如下：



<img src="/wxImages/使用外联的wxs脚本.png" alt="image-20230311231635531" style="zoom:50%;" />





------



#### 	7.WXS 的特点



##### 			1. 与 JavaScript 不同



​			为了降低 wxs（WeiXin Script）的学习成本， wxs 语言在设计时借大量鉴了 JavaScript 的语法。但是本质上，wxs 和 JavaScript 是完全不同的两种语言！



------



##### 		2. 不能作为组件的事件回调



​			wxs 典型的应用场景就是“过滤器”，经常配合 Mustache 语法进行使用，例如：



<img src="/wxImages/不能作为组件的事件回调.png" alt="image-20230311231807360" style="zoom:50%;" />

​		

​		但是，在 wxs 中定义的函数不能作为组件的事件回调函数。例如，下面的用法是错误的：



​													<img src="/wxImages/不能作为组件的事件回调2.png" alt="image-20230311231842365" style="zoom:50%;" />





------



##### 		3. 隔离性



​			隔离性指的是 wxs 的运行环境和其他 JavaScript 代码是隔离的。体现在如下两方面：

​				①wxs 不能调用 js 中定义的函数

​				②wxs 不能调用小程序提供的 API





------



##### 	4. 性能好

​	

​			在 iOS 设备上，小程序内的 WXS 会比 JavaScript 代码快 2 ~ 20 倍

​			在 android 设备上，二者的运行效率无差异



------



## 		25. 自定义组件-组件的创建与引用



#### 				1. 创建组件



​					①在项目的根目录中，鼠标右键，创建 components -> test 文件夹

​					②在新建的 components -> test 文件夹上，鼠标右键，点击“新建 Component”

​					③键入组件的名称之后回车，会自动生成组件对应的 4 个文件，后缀名分别为 .js，.json， .wxml 和 .wxss



​					注意：为了保证目录结构的清晰，建议把不同的组件，存放到单独目录中，例如：

​															<img src="/wxImages/创建组件.png" alt="image-20230311232230352" style="zoom:67%;" />





------



#### 		2. 引用组件



​				组件的引用方式分为“局部引用”和“全局引用”，顾名思义：

​					局部引用：组件只能在当前被引用的页面内使用

​					全局引用：组件可以在每个小程序页面中使用





------



#### 		3. 局部引用组件



​			在页面的 .json 配置文件中引用组件的方式，叫做“局部引用”。示例代码如下：

<img src="/wxImages/局部引用组件.png" alt="image-20230311232419947" style="zoom:50%;" />





------



#### 			4. 全局引用组件



​					在 app.json 全局配置文件中引用组件的方式，叫做“全局引用”。示例代码如下：

<img src="/wxImages/全局引用组件.png" alt="image-20230311232508909" style="zoom:50%;" />





------





#### 		5. 全局引用 VS 局部引用



​				根据组件的使用频率和范围，来选择合适的引用方式：

​					如果某组件在多个页面中经常被用到，建议进行“全局引用”

​					如果某组件只在特定的页面中被用到，建议进行“局部引用”





------



#### 		6. 组件和页面的区别



​		从表面来看，组件和页面都是由 .js、.json、.wxml 和 .wxss 这四个文件组成的。但是，组件和页面的 .js 与 .json 文件有明显的不同：

​			组件的 .json 文件中需要声明 "component": true 属性

​			组件的 .js 文件中调用的是 Component() 函数

​			组件的事件处理函数需要定义到 methods 节点中





------



#### 	自定义组件 - 样式



#### 			1. 组件样式隔离



​					默认情况下，自定义组件的样式只对当前组件生效，不会影响到组件之外的 UI 结构，如图所示：

​						组件 A 的样式不会影响组件 C 的样式

​						组件 A 的样式不会影响小程序页面的样式

​						小程序页面的样式不会影响组件 A 和 C 的样式

​				好处：

​					①防止外界的样式影响组件内部的样式

​					②防止组件的样式破坏外界的样式



<img src="/wxImages/组件样式隔离.png" alt="image-20230311232743155" style="zoom:50%;" />





------



#### 		2. 组件样式隔离的注意点



​			app.wxss 中的全局样式对组件无效

​			只有 class 选择器会有样式隔离效果，id 选择器、属性选择器、标签选择器不受样式隔离的影响



> ​			建议：在组件和引用组件的页面中建议使用 class 选择器，不要使用 id、属性、标签选择器！





------



#### 		3. 修改组件的样式隔离选项



​			默认情况下，自定义组件的样式隔离特性能够防止组件内外样式互相干扰的问题。但有时，我们希望在外界能够控制组件内部的样式，此时，可以通过 styleIsolation 修改组件的样式隔离选项，用法如下：



<img src="/wxImages/修改组件的样式隔离选项.png" alt="image-20230311232915605" style="zoom:50%;" />





------



#### 		4. styleIsolation 的可选值



| 可选值   | 默认值 | 描述                                                     |
| ------------ | ---------- | :----------------------------------------------------------- |
| isolated     | 是         | 表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响 |
| apply-shared | 否         | 表示页面 wxss  样式将影响到自定义组件，但自定义组件  wxss  中指定的样式不会影响页面 |
| shared       | 否         | 表示页面 wxss 样式将影响到自定义组件，自定义组件 wxss 中指定的样式也会影响页面和其他设置了 apply-shared 或 shared 的自定义组件 |



------



#### 	自定义组件 - 数据、方法和属性



​		

#### 			1. data 数据



​					在小程序组件中，用于组件模板渲染的私有数据，需要定义到 data 节点中，示例如下：

<img src="/wxImages/data数据.png" alt="image-20230311233115908" style="zoom:50%;" />





------



#### 			2. methods 方法



​				在小程序组件中，事件处理函数和自定义方法需要定义到 methods 节点中，示例代码如下：

<img src="/wxImages/methods方法.png" alt="image-20230311233151994" style="zoom:50%;" />





------



#### 			3. properties 属性



​				在小程序组件中，properties 是组件的对外属性，用来接收外界传递到组件中的数据，示例代码如下：

<img src="/wxImages/properties属性.png" alt="image-20230311233232662" style="zoom:50%;" />





------



#### 			4. data 和 properties 的区别



​			在小程序的组件中，properties 属性和 data 数据的用法相同，它们都是可读可写的，只不过：

​				data 更倾向于存储组件的私有数据

​				properties 更倾向于存储外界传递到组件中的数据



<img src="/wxImages/data和properties的区别.png" alt="image-20230311233321961" style="zoom:50%;" />





------



#### 			5. 使用 setData 修改 properties 的值



​					由于 data 数据和 properties 属性在本质上没有任何区别，因此 properties 属性的值也可以用于页面渲染，或使用 setData 为 properties 中的属性重新赋值，示例代码如下：



<img src="/wxImages/使用setData修改properties的值.png" alt="image-20230311233417067" style="zoom:50%;" />





------



#### 		自定义组件 - 数据监听器



#### 			1. 什么是数据监听器



​					数据监听器用于监听和响应任何属性和数据字段的变化，从而执行特定的操作。它的作用类似于 vue 中的 watch 侦听器。在小程序组件中，数据监听器的基本语法格式如下：



<img src="/wxImages/什么是数据监听器.png" alt="image-20230311233607306" style="zoom:50%;" />





------



#### 			2. 数据监听器的基本用法



​				组件的 UI 结构如下：



<img src="/wxImages/数据监听器的基本用法.png" alt="image-20230311233647223" style="zoom: 67%;" />





​				组件的 .js 文件代码如下：

<img src="/wxImages/数据监听器的基本用法2.png" alt="image-20230311233731699" style="zoom:67%;" />



------



#### 			3. 监听对象属性的变化



​					数据监听器支持监听对象中单个或多个属性的变化，示例语法如下：



<img src="/wxImages/监听对象属性的变化.png" alt="image-20230311233818003" style="zoom:67%;" />



------



#### 		自定义组件 - 纯数据字段

​	

#### 				1. 什么是纯数据字段



​					概念：纯数据字段指的是那些不用于界面渲染的 data 字段。



​					应用场景：例如有些情况下，某些 data 中的字段既不会展示在界面上，也不会传递给其他组件，仅仅在当前组件内部使用。带有这种特性的 data 字段适合被设置为纯数据字段。



​					好处：纯数据字段有助于提升页面更新的性能。



------



#### 			2. 使用规则



​					在 Component 构造器的 options 节点中，指定 pureDataPattern 为一个正则表达式，字段名符合这个正则表达式的字段将成为纯数据字段，示例代码如下：



​						<img src="/wxImages/纯数据字段使用规则.png" alt="image-20230311234000169" style="zoom: 67%;" />





------



#### 			3. 使用纯数据字段改造数据监听器案例



​							<img src="/wxImages/使用纯数据字段改造数据监听器.png" alt="image-20230311234045991" style="zoom:67%;" />





------



#### 	自定义组件 - 组件的生命周期



#### 			1. 组件全部的生命周期函数



​				小程序组件可用的全部生命周期如下表所示：



| 生命周期函数 | 参数     | 描述说明                             |
| ---------------- | ------------ | ---------------------------------------- |
| created          | 无           | 在组件实例刚刚被创建时执行               |
| attached         | 无           | 在组件实例进入页面节点树时执行           |
| ready            | 无           | 在组件在视图层布局完成后执行             |
| moved            | 无           | 在组件实例被移动到节点树另一个位置时执行 |
| detached         | 无           | 在组件实例被从页面节点树移除时执行       |
| error            | Object Error | 每当组件方法抛出错误时执行               |



------



#### 		2. 组件主要的生命周期函数



​			在小程序组件中，最重要的生命周期函数有 3 个，分别是 created、attached、detached。它们各自的特点如下：

​				① 组件实例刚被创建好的时候，created 生命周期函数会被触发

​					此时还不能调用 setData

​					通常在这个生命周期函数中，只应该用于给组件的 this 添加一些自定义的属性字段

​				② 在组件完全初始化完毕、进入页面节点树后， attached 生命周期函数会被触发

​					此时， this.data 已被初始化完毕

​					这个生命周期很有用，绝大多数初始化的工作可以在这个时机进行（例如发请求获取初始数据）

​				③ 在组件离开页面节点树后， detached 生命周期函数会被触发

​					退出一个页面时，会触发页面内每个自定义组件的 detached 生命周期函数

​					此时适合做一些清理性质的工作





------



#### 	3. lifetimes 节点

​		

​				在小程序组件中，生命周期函数可以直接定义在 Component 构造器的第一级参数中，可以在 lifetimes 字段内进行声明（这是推荐的方式，其优先级最高）。示例代码如下：



<img src="/wxImages/lifetimes节点.png" alt="image-20230311234451926" style="zoom:67%;" />





------



#### 		自定义组件 - 组件所在页面的生命周期



#### 			1. 什么是组件所在页面的生命周期



​					有时，自定义组件的行为依赖于页面状态的变化，此时就需要用到组件所在页面的生命周期。

​					例如：每当触发页面的 show 生命周期函数的时候，我们希望能够重新生成一个随机的 RGB 颜色值。

​					在自定义组件中，组件所在页面的生命周期函数有如下 3 个，分别是：



| 生命周期函数 | 参数    | 描述                     |
| ---------------- | ----------- | ---------------------------- |
| show             | 无          | 组件所在的页面被展示时执行   |
| hide             | 无          | 组件所在的页面被隐藏时执行   |
| resize           | Object Size | 组件所在的页面尺寸变化时执行 |





------



#### 		2. pageLifetimes 节点



​				组件所在页面的生命周期函数，需要定义在 pageLifetimes 节点中，示例代码如下：



<img src="/wxImages/pageLifetimes节点.png" alt="image-20230311234617795" style="zoom:67%;" />





------



#### 			3. 生成随机的 RGB 颜色值



​							<img src="/wxImages/生成随机的RGB颜色值.png" alt="image-20230311234702281" style="zoom:67%;" />



<img src="/wxImages/生成随机的RGB颜色值2.png" alt="image-20230311234727543" style="zoom:67%;" />





------



#### 			自定义组件 - 插槽



#### 					1. 什么是插槽



​							在自定义组件的 wxml 结构中，可以提供一个 slot 节点（插槽），用于承载组件使用者提供的 wxml 结构。



<img src="/wxImages/什么是插槽.png" alt="image-20230311234818924" style="zoom: 67%;" />





------



#### 			2. 单个插槽



​				在小程序中，默认每个自定义组件中只允许使用一个 slot 进行占位，这种个数上的限制叫做单个插槽。



<img src="/wxImages/单个插槽.png" alt="image-20230311234909688" style="zoom:67%;" />





------



#### 			3. 启用多个插槽



​				在小程序的自定义组件中，需要使用多 slot 插槽时，可以在组件的 .js 文件中，通过如下方式进行启用。



<img src="/wxImages/启用多个插槽.png" alt="image-20230311234958328" style="zoom:67%;" />





------



#### 		4. 定义多个插槽



​				可以在组件的 .wxml 中使用多个 slot 标签，以不同的 name 来区分不同的插槽。示例代码如下：

​	

<img src="/wxImages/定义多个插槽.png" alt="image-20230311235049758" style="zoom:67%;" />



------



#### 			5. 使用多个插槽



​					在使用带有多个插槽的自定义组件时，需要用 slot 属性来将节点插入到不同的 slot 标签中。示例代码如下：



<img src="/wxImages/使用多个插槽.png" alt="image-20230311235154553" style="zoom:67%;" />



实例代码：

```html
<!-- 用户页面 -->
<my-test4>

 <view slot="before">这是通过插槽填充的内容</view>

 <view slot="after">-----------</view>

</my-test4>
<!-- 组件页面 -->
<view>
  <slot name="before"></slot>
  <view>这里是组件的内部结构</view>
  <slot name="after"></slot>
</view>
```





------



#### 		自定义组件 - 父子组件之间的通信





#### 				1. 父子组件之间通信的 3 种方式



​							①属性绑定

​								用于父组件向子组件的指定属性设置数据，仅能设置 JSON 兼容的数据

​							②事件绑定

​								用于子组件向父组件传递数据，可以传递任意数据

​							③获取组件实例

​								父组件还可以通过 this.selectComponent() 获取子组件实例对象

​								这样就可以直接访问子组件的任意数据和方法



------



#### 			2. 属性绑定

​				

​					属性绑定用于实现父向子传值，而且只能传递普通类型的数据，无法将方法传递给子组件。父组件的示例代码如下：



<img src="/wxImages/属性绑定.png" alt="image-20230311235349496" style="zoom:67%;" />



​				子组件在 properties 节点中声明对应的属性并使用。示例代码如下：



<img src="/wxImages/子组件properties节点中生命对应的属性并使用.png" alt="image-20230311235428364" style="zoom:67%;" />



------



#### 		3. 事件绑定



​				事件绑定用于实现子向父传值，可以传递任何类型的数据。使用步骤如下：

​					①在父组件的 js 中，定义一个函数，这个函数即将通过自定义事件的形式，传递给子组件

​					②在父组件的 wxml 中，通过自定义事件的形式，将步骤 1 中定义的函数引用，传递给子组件

​					③在子组件的 js 中，通过调用 this.triggerEvent('自定义事件名称', { /* 参数对象 */ }) ，将数据发送到父组件

​					④在父组件的 js 中，通过 e.detail 获取到子组件传递过来的数据



​			步骤1：在父组件的 js 中，定义一个函数，这个函数即将通过自定义事件的形式，传递给子组件。



​					<img src="/wxImages/事件绑定步骤一.png" alt="image-20230311235559470" style="zoom:67%;" />



​			步骤2：在父组件的 wxml 中，通过自定义事件的形式，将步骤 1 中定义的函数引用，传递给子组件。



<img src="/wxImages/事件绑定步骤二.png" alt="image-20230311235639242" style="zoom:67%;" />



​		步骤3：在子组件的 js 中，通过调用 this.triggerEvent(‘自定义事件名称’, { /* 参数对象 */ }) ，将数据发送到父组件。



​							<img src="/wxImages/事件绑定步骤三.png" alt="image-20230311235751136" style="zoom:67%;" />



​			步骤4：在父组件的 js 中，通过 e.detail 获取到子组件传递过来的数据。



<img src="/wxImages/事件绑定步骤四.png" alt="image-20230311235826839" style="zoom:67%;" />





------



#### 		4. 获取组件实例



​				可在父组件里调用 this.selectComponent("id或class选择器") ，获取子组件的实例对象，从而直接访问子组件的任意数据和方法。调用时需要传入一个选择器，例如 this.selectComponent(".my-component")。



​						<img src="/wxImages/获取组件实例.png" alt="image-20230311235910653" style="zoom:67%;" />





------



#### 	自定义组件 - behaviors



#### 			1. 什么是 behaviors



​					behaviors 是小程序中，用于实现组件间代码共享的特性，类似于 Vue.js 中的 “mixins”。

<img src="/wxImages/什么是behaviors.png" alt="image-20230312000008030" style="zoom:67%;" />





------



#### 		2. behaviors 的工作方式



​				每个 behavior 可以包含一组属性、数据、生命周期函数和方法。组件引用它时，它的属性、数据和方法会被合并到组件中。

​				每个组件可以引用多个 behavior，behavior 也可以引用其它 behavior。





------



#### 		3. 创建 behavior



​			调用 Behavior(Object object) 方法即可创建一个共享的 behavior 实例对象，供所有的组件使用：



<img src="/wxImages/创建behaviors.png" alt="image-20230312000133626" style="zoom: 67%;" />





------



#### 		4. 导入并使用 behavior



​				在组件中，使用 require() 方法导入需要的 behavior，挂载后即可访问 behavior 中的数据或方法，示例代码如下：



<img src="/wxImages/导入并使用behavior.png" alt="image-20230312000232753" style="zoom:67%;" />





------



#### 		5. behavior 中所有可用的节点



| 可用的节点 | 类型     | 是否必填 | 描述            |
| -------------- | ------------ | ------------ | ------------------- |
| properties     | Object Map   | 否           | 同组件的属性        |
| data           | Object       | 否           | 同组件的数据        |
| methods        | Object       | 否           | 同自定义组件的方法  |
| behaviors      | String Array | 否           | 引入其它的 behavior |
| created        | Function     | 否           | 生命周期函数        |
| attached       | Function     | 否           | 生命周期函数        |
| ready          | Function     | 否           | 生命周期函数        |
| moved          | Function     | 否           | 生命周期函数        |
| detached       | Function     | 否           | 生命周期函数        |





------



#### 	6. 同名字段的覆盖和组合规则/*



​			组件和它引用的 behavior 中可以包含同名的字段，此时可以参考如下 3 种同名时的处理规则：

​					①同名的数据字段 (data)

​					②同名的属性 (properties) 或方法 (methods)

​					③同名的生命周期函数



​		关于详细的覆盖和组合规则，大家可以参考微信小程序官方文档给出的说明：

​		https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/behaviors.html





------



## 	26. 使用 npm 包



#### 			26.1 小程序对 npm 的支持与限制



​				目前，小程序中已经支持使用 npm 安装第三方包，从而来提高小程序的开发效率。但是，在小程序中使用 npm 包有如下 3 个限制：

​				①不支持依赖于 Node.js 内置库的包

​				②不支持依赖于浏览器内置对象的包

​				③不支持依赖于 C++ 插件的包



总结：虽然 npm 上的包有千千万，但是能供小程序使用的包却“为数不多”。





------



#### 		26.2 Vant Weapp



##### 			1. 什么是 Vant Weapp



​				Vant Weapp 是有赞前端团队开源的一套小程序 UI 组件库，助力开发者快速搭建小程序应用。它所使用的是 MIT 开源许可协议，对商业使用比较友好。

​			官方文档地址 https://youzan.github.io/vant-weapp



​			扫描下方的小程序二维码，体验组件库示例：



<img src="/wxImages/VantWeapp官方小程序.png" alt="image-20230313215307038" style="zoom:67%;" />



------



##### 			2. 安装 Vant 组件库



​			在小程序项目中，安装 Vant 组件库主要分为如下 3 步：

​					①通过 npm 安装（建议指定版本为@1.3.3）

​					②构建 npm 包

​					③修改 app.json



​			详细的操作步骤，大家可以参考 Vant 官方提供的快速上手教程：

​			[https://youzan.github.io/vant-weapp/#/quickstart#an-zhuang](https://youzan.github.io/vant-weapp/)



------



##### 		3. 使用 Vant 组件



​			安装完 Vant 组件库之后，可以在 app.json 的 usingComponents 节点中引入需要的组件，即可在 wxml 中直接使用组件。示例代码如下：



<img src="/wxImages/使用Vant组件.png" alt="image-20230313220003693" style="zoom:67%;" />





------



​	4. 定制全局主题样式



​		Vant Weapp 使用 CSS 变量来实现定制主题。 关于 CSS 变量的基本用法，请参考 MDN 文档：

​		https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties





------



##### 		5. 定制全局主题样式



​			在 app.wxss 中，写入 CSS 变量，即可对全局生效：



​				<img src="/wxImages/定制全局主题样式.png" alt="image-20230313220137451" style="zoom:67%;" />





​			所有可用的颜色变量，请参考 Vant 官方提供的配置文件：

​			https://github.com/youzan/vant-weapp/blob/dev/packages/common/style/var.less





------



#### 			26.3使用 npm 包 - API Promise化



##### 					1. 基于回调函数的异步 API 的缺点



​						默认情况下，小程序官方提供的异步 API 都是基于回调函数实现的，例如，网络请求的 API 需要按照如下的方式调用：



​								<img src="/wxImages/基于回调函数的异步API的缺点.png" alt="image-20230313220307571" style="zoom:67%;" />





> ​						缺点：容易造成回调地狱的问题，代码的可读性、维护性差





------



##### 			2. 什么是 API Promise 化



​				API Promise化，指的是通过额外的配置，将官方提供的、基于回调函数的异步 API，升级改造为基于 Promise 的异步 API，从而提高代码的可读性、维护性，避免回调地狱的问题。





------



##### 			3. 实现 API Promise 化



​				在小程序中，实现 API Promise 化主要依赖于 miniprogram-api-promise 这个第三方的 npm 包。它的安装和使用步骤如下：



<img src="/wxImages/实现API-Promise化1.png" alt="image-20230313220441525" style="zoom:67%;" />



<img src="/wxImages/实现API-Promise化2.png" alt="image-20230313220509851" style="zoom:67%;" />





------



##### 		4. 调用 Promise 化之后的异步 API



​								<img src="/wxImages/调用Promise化之后的异步.png" alt="image-20230313220542225" style="zoom:67%;" />





------



#### 		26.4 全局数据共享



​				

------



##### 			1. 什么是全局数据共享



​				全局数据共享（又叫做：状态管理）是为了解决组件之间数据共享的问题。

​				开发中常用的全局数据共享方案有：Vuex、Redux、MobX 等。



<img src="/wxImages/什么是全局数据共享.png" alt="image-20230313220707175" style="zoom:67%;" />



##### 			2. 小程序中的全局数据共享方案



​				在小程序中，可使用 mobx-miniprogram 配合 mobx-miniprogram-bindings 实现全局数据共享。其中：

​					mobx-miniprogram 用来创建 Store 实例对象

​					mobx-miniprogram-bindings 用来把 Store 中的共享数据或方法，绑定到组件或页面中使用



​																	<img src="/wxImages/小程序的全局数据共享方案.png" alt="image-20230313221256822" style="zoom:67%;" />





------



#### 		26.5 全局数据共享 - MobX



------



##### 				1. 安装 MobX 相关的包



​					在项目中运行如下的命令，安装 MobX 相关的包：



<img src="/wxImages/安装Mobx相关的包.png" alt="image-20230313221515199" style="zoom:67%;" />



> ​			注意：MobX 相关的包安装完毕之后，记得删除 miniprogram_npm 目录后，重新构建 npm。



------



##### 			2. 创建 MobX 的 Store 实例



​								<img src="/wxImages/创建MobX的实例.png" alt="image-20230313221614637" style="zoom:67%;" />





------



##### 		3. 将 Store 中的成员绑定到页面中



​					<img src="/wxImages/将Store中的成员绑定到页面中.png" alt="image-20230313221804950" style="zoom:67%;" />



------



##### 	4. 在页面上使用 Store 中的成员



​					<img src="/wxImages/在页面上使用Store中的成员.png" alt="image-20230313222006090" style="zoom:67%;" />





------



##### 		5. 将 Store 中的成员绑定到组件中



​								<img src="/wxImages/将Store中的成员绑定到组件中.png" alt="image-20230313222058961" style="zoom:67%;" />



------



##### 			6. 在组件中使用 Store 中的成员



​							<img src="/wxImages/在组建中使用Store中的成员.png" alt="image-20230313222149500" style="zoom:67%;" />





------



## 	27. 分包 



------



#### 		 27.1 分包—基础概念

##### 			

##### 				1. 什么是分包



​					分包指的是把一个完整的小程序项目，按照需求划分为不同的子包，在构建时打包成不同的分包，用户在使用时按需进行加载。





------



##### 			2. 分包的好处



​			对小程序进行分包的好处主要有以下两点：

​				① 可以优化小程序首次启动的下载时间

​				② 在多团队共同开发时可以更好的解耦协作 



------



##### 		3. 分包前项目的构成



​			分包前，小程序项目中所有的页面和资源都被打包到了一起，导致整个项目体积过大，影响小程序首次启动的下载时间。



​													<img src="/wxImages/分包前项目的构成.png" alt="image-20230313222456802" style="zoom:67%;" />





------



##### 			4. 分包后项目的构成

​		

​				分包后，小程序项目由 1 个主包 + 多个分包组成：

​					主包：一般只包含项目的启动页面或 TabBar 页面、以及所有分包都需要用到的一些公共资源

​					分包：只包含和当前分包有关的页面和私有资源



<img src="/wxImages/分包后项目的构成.png" alt="image-20230313222558538" style="zoom:67%;" />





------



##### 		5. 分包的加载规则



​			①在小程序启动时，默认会下载主包并启动主包内页面

​					tabBar 页面需要放到主包中

​			②当用户进入分包内某个页面时，客户端会把对应分包下载下来，下载完成后再进行展示

​					非 tabBar 页面可以按照功能的不同，划分为不同的分包之后，进行按需下载





------

 

##### 			6. 分包的体积限制



​				目前，小程序分包的大小有以下两个限制：

​					整个小程序所有分包大小不超过 16M（主包 + 所有分包）

​					单个分包/主包大小不能超过 2M





------





#### 			27.2 分包 - 使用分包



##### 					1. 配置方法



​								<img src="/wxImages/分包-配置1.png" alt="image-20230313222926582" style="zoom: 50%;" />  <img src="/wxImages/箭头.png" style="zoom:50%;" /><img src="/wxImages/分包-配置2.png" alt="image-20230313222950251" style="zoom: 50%;" />





------



##### 			2. 打包原则



​				①小程序会按 subpackages 的配置进行分包，subpackages 之外的目录将被打包到主包中

​				②主包也可以有自己的 pages（即最外层的 pages 字段）

​				③tabBar 页面必须在主包内

​				④分包之间不能互相嵌套



------



##### 			3. 引用原则



​					①主包无法引用分包内的私有资源

​					②分包之间不能相互引用私有资源

​					③分包可以引用主包内的公共资源



<img src="/wxImages/分包-引用原则.png" alt="image-20230313223317953" style="zoom:67%;" />



------



#### 		27.3 分包 - 独立分包



------



##### 				1. 什么是独立分包



​					独立分包本质上也是分包，只不过它比较特殊，可以独立于主包和其他分包而单独运行。



<img src="/wxImages/什么是独立分包.png" alt="image-20230313223426009" style="zoom:67%;" />





------



##### 			2. 独立分包和普通分包的区别



​				最主要的区别：是否依赖于主包才能运行

​					普通分包必须依赖于主包才能运行

​					独立分包可以在不下载主包的情况下，独立运行





------



##### 			3. 独立分包的应用场景



​				开发者可以按需，将某些具有一定功能独立性的页面配置到独立分包中。原因如下：

​					当小程序从普通的分包页面启动时，需要首先下载主包

​					而独立分包不依赖主包即可运行，可以很大程度上提升分包页面的启动速度



> ​				注意：一个小程序中可以有多个独立分包。





------



##### 		4. 独立分包的配置方法



​								<img src="/wxImages/独立分包的配置方法1.png" alt="image-20230313223614065" style="zoom: 50%;" />	<img src="/wxImages/箭头.png" alt="image-20230313225124242" style="zoom:50%;" /><img src="/wxImages/独立分包的配置方法2.png" alt="image-20230313223638528" style="zoom: 50%;" />





------



##### 				5. 引用原则



​				独立分包和普通分包以及主包之间，是相互隔绝的，不能相互引用彼此的资源！例如：

​					①主包无法引用独立分包内的私有资源

​					②独立分包之间，不能相互引用私有资源

​					③独立分包和普通分包之间，不能相互引用私有资源

​					④特别注意：独立分包中不能引用主包内的公共资源





------



#### 		27.4 分包 - 分包预下载



------



##### 				1. 什么是分包预下载



​					分包预下载指的是：在进入小程序的某个页面时，由框架自动预下载可能需要的分包，从而提升进入后续分包页面时的启动速度。



------



##### 			2. 配置分包的预下载



​				预下载分包的行为，会在进入指定的页面时触发。在 app.json 中，使用 preloadRule 节点定义分包的预下载规则，示例代码如下：



​							<img src="/wxImages/配置分包的预下载.png" alt="image-20230313223934288" style="zoom:67%;" />



------



##### 			3. 分包预下载的限制



​				同一个分包中的页面享有共同的预下载大小限额 2M，例如：



​						<img src="/wxImages/分包预下载的限制1.png" alt="image-20230313224020720" style="zoom:67%;" /><img src="/wxImages/分包预下载的限制2.png" alt="image-20230313224042073" style="zoom: 67%;" />
