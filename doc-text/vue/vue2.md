# vue

## vue作者：



​	vue框架是尤雨溪开发的。尤雨溪在就职于谷歌的期间发现常用的angular过于臃肿，所以想自己写一个简单的框架练手，vue就是这样诞生的。

​	2014 年 2 月，vue第一次发布在 Github 上，至今已经有8年了，目前核心库依然由尤雨溪维护，其他的子项目由团队成员维护。vue的发行版都是以动漫命名的。



### 什么是vue？



​	官方给出的解释是：Vue是一套用于构建用户页面的前端框架。

#### 1.**构建用户页面：用vue往html页面中填充数据，非常方便：**



​	前端开发者最主要的工作，就是为了网站的使用者(又称为：网站的用户)构建出美观、舒适、好用的网页。



1. 编写页面结构：使用html超文本标记语言，搭建出网页的内容结构

   


2. 美化样式：使用css样式，美化的可视化效果

   


3. 处理交互：使用JavaScript来操作DOM对象，处理用户和网页之间的交互行为



​	使用vue构建用户页面，解决了jQuery+模板引擎的诸多痛点，极大提高了前端开发的效率和体验。



#### 2.框架：



​		框架是一套现成的解决方案，程序员只能遵守框架的规范，去填写自己的业务功能！



​		官方给vue的定位是前端框架，因为他提供了构建用户页面的一整套解决方案(俗称vue全家桶)



​	vue(核心库)		vue-router(路由方案)		vuex(状态管理方案)		vue组件库(快速搭建页面UI效果的方案)



​		以及辅助vue项目开发的一系列工具：



​				vue-cli(npm全局包：一键生成工程化的vue项目-基于webpack、大而全)



​				vite(npm全局包：一键生成工程化的vue项目-小而巧)



​				vue-devtools(浏览器插件：辅助调试的工具)



​				vetur(vscode插件：提供语法高亮和只能提示)

​		

**总结：Vue.js是一套构建用户界面的渐进式框架，Vue 采用自下向上增量开发的设计，其核心库只关注视图层，易于上手。**



​	同时vue完全有能力驱动采用单文件组件和 Vue 生态系统支持的库开发的复杂单页应用。



1. MVVM即model，view，viewmodel，它是数据驱动模式，即所有的一切通过操作数据来进行，而尽量避免操作dom树。

   

2. 用户的操作在view通过viewmodel进行数据处理，分情况是否通过ajax与model层进行交互，再返回到view层，在这个过程中

   view和viewmodel的数据双向绑定使得我们完全的摆脱了对dom的繁琐操作，而是专心于对用户的操作进行处理，避免了MVC中

   control层过厚的问题。

   

#### 扩展资料：

​		

**vue在web开发、网站制作中的优势**

1. 据绑定：vue会根据对应的元素，进行设置元素数据，通过输入框，以及get获取数据等多种方式进行数据的实时绑定，进行网页及应用的数据渲染 。

   

2. 组件式开发：通过vue的模块封装，它可以将一个web开发中设计的各种模块进行拆分，变成单独的组件，然后通过数据绑定，调用对应模版组件，同时传入参数，即可完成对整个项目的开发。

   

3. 简单小巧的核心，渐进式技术栈，足以应付任何规模的应用。

#### vue的特性：



##### 1.数据驱动视图



###### 1.1.1什么是数据驱动视图？



​			数据的变化会驱动视图自动更新

​			在使用了vue的页面中，vue会监听数据的变化，从而自动重新渲染页面的结构

> ​		**注意：数据驱动视图是单向的数据绑定。**
>
> ​		**好处：当页面数据发生变化时，页面会自动重新渲染！**

##### 2.双向数据绑定

​		在网页中form表单负责采集数据，Ajax负责提交数据。

​		在填写表单时，双向数据绑定可以辅助开发者在不操作DOM的前提下，自动把用户填写的内容同步到数据源中

​		好处：开发者不需要手动操作DOM元素，来获取表单元素最新的值！

> ###### 什么是双向数据绑定？
>
> ​			**1、js数据的变化，会被自动渲染到页面上**
>
> ​			**2、页面上表单采集的数据发生的变化的时候，会被vue自动获取到，并更新到js数据中。**

## MVVM

### 	1.MVVM示意图：

​		MVVM 是 vue 实现数据驱动视图和双向数据绑定的核心原理。MVVM 指的是 Model、View 和 ViewModel， 它把每个 HTML 页面都拆分成了这三个部分，如图所示：



<img src="/vue/vue2Images/MVVM模型.jpeg" style="zoom:50%;" />

**在 MVVM 概念中：**

1. Model 表示当前页面渲染时所依赖的数据源。 
2. View 表示当前页面所渲染的 DOM 结构。 
3. ViewModel 表示 vue 的实例，它是 MVVM 的核心。

### MVVM工作原理：



​	ViewModel 作为 MVVM 的核心，是它把当前页面的数据源（Model）和页面的结构（View）连接在了一起。

<img src="/vue/vue2Images/MVVM工作原理.png" style="zoom: 80%;" />

1. **当数据源发生变化时，会被 ViewModel 监听到，VM 会根据最新的数据源自动更新页面的结构** 

   

2. **当表单元素的值发生变化时，也会被 VM 监听到，VM 会把变化过后最新的值自动同步到 Model 数据源中**




## vue的优势：



​		**MVVM 在 vue中，程序员不需要操作 DOM，程序员只需要把数据维护好即可！(数据驱动视图)**



## 结论：



​	**在 vue 项目中，强烈不建议安装和使用jQuery**

​	

### 	假设：

​			**在 vue 中，需要操作 DOM 了，需要拿到页面上某个 DOM元素的引用，此时怎么办？**

​	

​			**可以使用 ref 引用，后面有介绍**

## vue 的版本 



​	**当前，vue 共有 3 个大版本，其中：** 



​	**2.x 版本的 vue 是目前企业级项目开发中的主流版本** 



​	**3.x 版本的 vue 于 2020-09-19 发布，生态还不完善，尚未在企业级项目开发中普及和推广** 



​	**1.x 版本的 vue 几乎被淘汰，不再建议学习与使用**



### 	vue版本总结： 



1. ​	**3.x 版本的 vue 是未来企业级项目开发的趋势；**
2. ​	**2.x 版本的 vue 在未来（1 ~ 2年内）会被逐渐淘汰；**





## vue 的基本使用



### 1.基本使用步骤



1. ​		导入 vue.js 的 script 脚本文件
2. ​		在页面中声明一个将要被 vue 所控制的 DOM 区域
3. ​		创建 vm 实例对象（vue 实例对象）

```html
<!DOCTYPE html>
<html>
     <head>
          <meta charset="utf-8">
          <title></title>
          <!-- 1.导入vue文件，在window全局就有了Vue这个构造函数 -->
          <script src="js/vue.js"></script>
     </head>
     <body>
          <!-- 希望Vue能够控制这个div，帮助我们把这个数据填充到div内部 -->
          <div id="app">
               {{ username }}
          </div>
          <!-- 2.创建vue的实例对象 -->
          <script>
               //创建Vue的实例对象
               const vm = new Vue({
                    //el属性是固定的写法，表示当前vm实例控制页面上的那个区域，接收的值是一个选择器
                    el:'#app',
                    //data对象就是要渲染到页面上的数据
                    data:{
                         username:'lisi'
                    }
               })
          </script>
     </body>
</html>

```




### 2.基本代码与 MVVM 的对应关系

​		简单来说上方的data就是数据源model，el所控制的区域就是视图view，

​		const vm = new Vue({ 这里面的就是ViewModel })，

```html
<div id="app">{{ username }} </div>也属于view视图
```



## vue 的指令与过滤器

### 		1.指令的概念



​		**指令（Directives）是 vue 为开发者提供的模板语法，用于辅助开发者渲染页面的基本结构。vue 中的指令按照不同的用途可以分为如下 6 大类：**



1. **内容渲染指令**
2. **属性绑定指令**
3. **事件绑定指令**
4. **双向绑定指令**
5. **条件渲染指令**
6. **列表渲染指令**

​	**注意：指令是 vue 开发中最基础、最常用、最简单的知识点。**

#### 1.1 内容渲染指令

**内容渲染指令用来辅助开发者渲染 DOM 元素的文本内容。常用的内容渲染指令有如下 3 个：**

​				⚫ v-text
​				⚫ {{ }}
​				⚫ v-html



**注意：{{}}(插值表达式) 只能用在元素的内容节点中，不能用在元素的属性节点中！**

<div style="page-break-after:always;"></div>

<div style="page-break-after:always;"></div>

##### 1.1.1：**v-text指令**



​	**用法实例：**

```html
<body>
      <div id="app">
           <p v-text="username"></p>
           <p v-text="gender">性别</p>
      </div>
      <script src="js/vue.js"></script>
      <script>
           const vm = new Vue({
                el:'#app',
                data:{
                     username:'zs',
                     gender:'女'
                }
           })
      </script>
</body>
```

​					

​		**特点：v-text只能渲染值**

​					

​		**注意：v-text 指令会覆盖元素(标签)内默认的值。**



##### 2.2.2：{{ }} 插值表达式



​		**vue 提供的 {{ }} 语法，专门用来解决 v-text 会覆盖默认文本内容的问题。这种 {{ }} 语法的专业名称是插值表达式（英文名为：Mustache）。**



**用法示例：**


```html
<body>
 <div id="app">
      <p>{{ username }}</p>
      <p>性别{{ gender }}</p>
 </div>
 <script src="js/vue.js"></script>
 <script>
      const vm = new Vue({
           el:'#app',
           data:{
                username:'zs',
                gender:'女'
           }
      })
 </script>
</body>
```
​				



​		**{{}}的好处：插值表达式里面支持js语法**



​		**注意：相对于 v-text 指令来说，插值表达式在开发中更常用一些！因为它不会覆盖元素中默认的文本内容。**



##### 3.3.3：v-html

​					**v-text 指令和插值表达式只能渲染纯文本内容。如果要把包含 HTML 标签的字符串渲染为页面的 HTML 元素，则需要用到 v-html 这个指令：**

​         

```html
<body>
	 <div id="app">
          <p v-html="blue"></p>
     </div>
     <script src="js/vue.js"></script>
     <script>
          const vm = new Vue({
               el:'#app',
               data:{
                    blue:"<h2 style='color:blue'>李四</h2>"
               }
          })
     </script>
</body>
```

​					

​			**v-html的作用：可以把带有标签的字符串，渲染到真正的HTML内容！**



##### 4.4.4：v-bind(单向绑定指令): 属性绑定指令

​				

​			**如果需要为元素的属性动态绑定属性值，则需要用到 v-bind 属性绑定指令。用法示例如下：**

```html
<!DOCTYPE html>
<html>
     <head>
          <meta charset="utf-8">
          <title></title>
          <script src="js/vue.js"></script>
     </head>
     <body>
          <div id="app">
               <!-- v-bind:xxx 动态绑定值  -->
               <!-- v-bind:xxx可以简写成 :xxx 效果一样 -->
               <input type="text" v-bind:placeholder="tips">
          </div>
          <script>
               const vm = new Vue({
                    el:'#app',
                    data:{
                         tips:'请输入用户名：'
                    }
               })
          </script>
     </body>
</html>
```

​					



​		**结果为input里面是：请输入用户名：**





###### 4.4.5：属性绑定指令的简写形式：



​					**由于 v-bind 指令在开发中使用频率非常高，因此，vue官方为其提供了简写形式（简写为英文的 : ）。**

​				**在vue中，可以使用v-bind:指令中，为元素的属性动态绑定值：**



​			**简写是英文的:**



​				**再使用v-bind:属性绑定期间，如果绑定内容需要进行动态拼接，则字符串的外面应该包裹单引号，例如：**



```html
				<div :title="'box'+index">这是一个div</div> index是data属性的变量
```

<div style="page-break-after:always;"></div>

##### 5.5.5：事件绑定指令

​			**vue 提供了 v-on 事件绑定指令，用来辅助程序员为 DOM 元素绑定事件监听。语法格式如下：**

​		**事件绑定指令：**
​				**通过 v-on 绑定的事件处理函数，需要在 methods 节点中进行声明：**

```html
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<p>{{ count }}</p>
			<button v-on:click="addCount">+1</button>
		</div>
		<script>
			const vm = new Vue({
				el:'#app',
				data:{
					count:0
				},
				//methods:的作用就是可以定义事件处理函数
				methods:{
					addCount(){	//推荐使用这种写法
					this.count++
					},
				//这样也可以
					addCount:funtion(){
						this.count++
					}
				}
			})
		</script>
	</body>
</html>
```
​			



​	**注意：原生 DOM 对象有 onclick、oninput、onkeyup 等原生事件，替换为 vue 的事件绑定形式后，分别为：v-on:click、v-on:input、v-on:keyup**



###### 		5.5.6：事件绑定的简写形式

​			**由于 v-on 指令在开发中使用频率非常高，因此，vue 官方为其提供了简写形式（简写为英文的 @ ）**



​			

```html
<button v-on:click="addCount">+1</button>
```

​				**可以简写为： <button @click="addCount">+1</button>**

​			**这些也可以被简写为：**

​				**@click、@input、@keyup**



###### 5.5.7：绑定事件并传参



​			**在使用 v-on 指令绑定事件时，可以使用 ( ) 进行传参，示例代码如下：**





```html
     <div id="app">
          <p>count的值是：{{ count }}</p>
          <!-- 如果count是偶数，则按钮背景颜色变成红色，否则取消背景颜色 -->
          <button @click="addCount(1)">+N</button>
     </div>
     <script>
          const vm = new Vue({
               el:"#app",
               data:{
                    count:0
               },
               methods:{
                    addCount(value){
                         this.count += value
                    }
               }
          })
     </script>
```

##### $event内置函数：



​			**$event 是 vue 提供的特殊变量，用来表示原生的事件参数对象 event。$event 可以解决事件参数对象 event被覆盖的问题。示例用法如下：**



```html
<div id="app">

     <p>count的值是：{{ count }}</p>
     <!-- 如果count是偶数，则按钮背景颜色变成红色，否则取消背景颜色 -->
     <!-- addCount(1,$event) 中的$event是固定的不能更改 -->
     <button @click="addCount(1,$event)">+N</button>
     
</div>

<script>
const vm = new Vue({
     el:"#app",
     data:{
          count:0
     },
     methods:{

          addCount(value,$event){		
               // addCount(value,$event)中的$event可以被更改
               //在绑定事件对象的时候，如果不传参的时候，默认有一个e
               //如果事件传参了，事件对象e就会被覆盖掉
               
        		//vue提供了内置对象，名字是固定的，"$event"，它就是DOM的原生对象
               this.count += value
               //判断count的值是否为偶数
               if(this.count %2 === 0){
                    //偶数
                    $event.target.style.backgroundColor = "red"
               }else{
                    //奇数
                    $event.target.style.backgroundColor = ""
               }
          }
     }
})
</script>
```



##### 事件修饰符:

​	

​		**在事件处理函数中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。因此，vue 提供了事件修饰符的概念，来辅助程序员更方便的对事件的触发进行控制。常用的 5 个事件修饰符如下：**	



​	![](/vue/vue2Images/event修饰符.png)





​				**例如：**
​							

```html
<!-- 触发click点击事件时，阻止a的默认跳转行为 -->
<a href="https://www.baidu.com" @click.prevent="onLinkClick">百度一下</a>
<script>
     const vm = new Vue({
          methods: {
                    onLinkClick(){
                         console.log(111);
                    }
          }
     })
</script>
```



##### 按键修饰符



​			**在监听键盘事件时，我们经常需要判断详细的按键。此时，可以为键盘相关的事件添加按键修饰符，例如：**
​				
​					**按esc清空文本输入框的值：**
​				

```html
<div id="app">
     <input type="text" placeholder="请输入内容" @keyup.esc="clearInput">
</div>
<script>
     const vm = new Vue({
          el:"#app",
          methods:{
               clearInput(e){	
                   //默认有一个e对象，传递参数的时候就会把e对象给覆盖了
                   e.target.value=''
               }
          }
     })
</script>
```
​				

​			**注意：**	**@keyup可以绑定多个按键**



##### v-model双向绑定指令：

​			

​			**vue 提供了 v-model 双向数据绑定指令，用来辅助开发者在不操作 DOM 的前提下，快速获取表单的数据。**





```html
<div id="app">
     <p>用户的名字：{{ username }}</p>
     <input type="text" v-model="username" v-bind:placeholder="text">
     <select v-model="city">
          <option value="">请选择城市</option>
          <option value="1">北京</option>
          <option value="2">上海</option>
          <option value="3">广州</option>
     </select>
</div>
<script>
     const vm = new Vue({
          el:'#app',
          data:{
               username:'zs',
               text:'请输入用户名',
               city:''		//显示的是option中的value值
          }
     })
</script>
```
​			

​	

**注意：**
			

​			**v-model只能绑定：**
​				
​				**1、input输入框：**
​				
​					**type="radio" 单选框**
​					
​					**type="checkbox" 复选框**
​					
​					**type="xxx"**
​					
​				**2、textarea文本框**	
​				
​				**3、select下拉列表**
​				
​					**不能绑定标签.....**



###### v-model 指令的修饰符

​			

**为了方便对用户输入的内容进行处理，vue 为 v-model 指令提供了 3 个修饰符，分别是：**



​						![](/vue/vue2Images/v-model指令修饰符.png)

​	

**示例用法如下：**
							

```html
<div id="app">

 <input type="text" v-model.number='n1'>+
 <input type="text" v-model.number='n2'>={{ n1+n2 }}
 <hr>
 <input type="text" v-model.trim="username">
 <button @click="getName">获取用户名</button>
 <hr>
 <input type="text" v-model.lazy="username">

</div>
<script>
 const vm = new Vue({
      el:'#app',
      data:{
           n1:1,
           n2:2,
           username:'zhangsan'
      },
      methods:{
           getName(){
                console.log(`用户名是："${ this.username }"`);
           }
      }
 })
</script>
```





##### 条件渲染指令

​		

​		**条件渲染指令用来辅助开发者按需控制 DOM 的显示与隐藏。条件渲染指令有如下两个，分别是：**
​				
​					⚫ v-if

​					⚫ v-show

###### v-if和v-show:

​		**示例用法如下：**
​							

```html
<html>
	<head>
          <meta charset="utf-8">
          <title></title>
          <script src="js/v2.6.10/vue.js"></script>
	</head>
​	<body>
​		<!-- 点击显示和不显示 -->
		<div id="app">
			<!-- v-if 会被 vue 动态的移除 -->
			<p v-if="flag">这是被v-if控制的语句</p>
			<!-- v-show 会被添加 display:none; 属性 -->
			<p v-show="flag">这是被v-show控制的语句</p>
			<button @click="clickFlag">点击隐藏</button>
		</div>
		<script>
			const vm = new Vue({
				el:'#app',
				data:{
					flag:true
				},
				methods:{
					clickFlag(){
					this.flag = false
					}
				}
			})
          </script>
​	</body>
</html>
```

​					

​			**v-if的原理是:**	
​					
​						   **1、每次动态的创建或移除元素，实现元素的显示和隐藏**	

​		

​							**2、如果刚进入页面的时候，某些元素默认不需要被展示，而且后期这个元素很可能也不需要被展示出来，此时v-if性能							更好**
​					
​			**v-show的原理是:**	
​					
​						**1、会动态的添加或移除display:none;样式，来实现元素的显示和隐藏**
​						
​						**2、如果要频繁的切换元素的显示状态，用v-show性能会更好**
​							
​					**结论：在实际开发中，绝大多数的情况下，不用考虑什么性能问题，直接使用v-if就好了。**
​					

###### 				**v-if 和 v-show 的区别：**

​					

​						**1、实现原理不同：**

​						
​							**⚫ v-if 指令会动态地创建或移除 DOM 元素，从而控制元素在页面上的显示与隐藏。**
​							
​							**⚫ v-show 指令会动态为元素添加或移除 style="display: none;" 样式，从而控制元素的显示与隐藏。**
​							
​						**2、性能消耗不同：**
​						
​							**v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此：**
​							
​								**⚫ 如果需要非常频繁地切换，则使用 v-show 较好**
​								
​								**⚫ 如果在运行时条件很少改变，则使用 v-if 较好**
​			

###### 				v-else、v-else-if


​					**v-if 可以单独使用，或配合 v-else 指令一起使用：**


​							**示例如下：**
```html
<div id="app">
	<p v-if="type === 'A'">优秀</p>
     <p v-else-if="type === 'B'">良</p>
     <p v-else-if="type === 'C'">中等</p>
     <p v-else>差</p>
</div>
<script>
     const vm = new Vue({
          el:'#app',
          data:{
               type:'A'
          }
     })
</script>
```



​							**注意：v-else 指令必须配合 v-if 指令一起使用，否则它将不会被识别！**





##### 列表渲染指令

​				 

​				**vue 提供了 v-for 列表渲染指令，用来辅助开发者基于一个数组来循环渲染一个列表结构。v-for 指令需要使用 item in items 形式的特殊语法，其中：**
​				
​					⚫ **items 是待循环的数组**
​					
​					⚫ **item 是被循环的每一项**



​						**示例v-for循环数据添加到表格：**
​					
```vue
<html>
   <head>
         <meta charset="utf-8">
         <title></title>
         <link rel="stylesheet" href="css/bootstrap.css">
         <script src="js/v2.6.10/vue.js"></script>
   </head>
    <body>
        <div id="app">
             <table class="table table-bordered table-hover table-striped">
             	<thead>
                   <th>索引</th>
                   <th>ID</th>
                   <th>姓名</th>
                </thead>
                <tbody>
                      <tr v-for="item in list">
                          <td>{{ item.id }}</td>
                          <td>{{ item.name }}</td>
                       </tr>
                 </tbody>
              </table>
         </div>
         <script>
            const vm = new Vue({
               el:'#app',
               data:{
                	list:[
                       { id: 1 , name : '张三' },
                       { id: 2 , name : '李四' },
                       { id: 3 , name : '王五' },
                       { id: 4 , name : '赵六' }
                    ]
               }
           })
         </script>
    </body>
</html>
```



##### v-for 中的索引：



​				**语法：**

​						**v-for 指令还支持一个可选的第二个参数，即当前项的索引。语法格式为 (item, index) in items，**
​					
​							**示例代码如下：**
​						

```html
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<link rel="stylesheet" href="css/bootstrap.css">
		<script src="js/v2.6.10/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<table class="table table-bordered table-hover table-striped">
				<thead>
					<th>索引</th>
					<th>ID</th>
					<th>姓名</th>
				</thead>
				<tbody>
					<tr v-for="(item,index) in list">
						<td>{{ index }}</td>
						<td>{{ item.id }}</td>
						<td>{{ item.name }}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<script>
			const vm = new Vue({
				el:'#app',
				data:{
					list:[
						{ id: 1 , name : '张三' },
						{ id: 2 , name : '李四' },
						{ id: 3 , name : '王五' },
						{ id: 4 , name : '赵六' }
					]
				}
			})
		</script>
	</body>
</html>
```
​				

​	**注意：v-for 指令中的 item 项和 index 索引都是形参，可以根据需要进行重命名。例如 (user, i) in userlist**



###### 		使用 key 维护列表的状态




​			**1、当列表的数据变化时，默认情况下，vue 会尽可能的复用已存在的 DOM 元素，从而提升渲染的性能。**

​			**但这种默认的性能优化策略，会导致有状态的列表无法被正确更新。**
​			
​			**2、为了给 vue 一个提示，以便它能跟踪每个节点的身份，从而在保证有状态的列表被正确更新的前提下，提升渲**			
​			**染的性能。此时，需要为每项提供一个唯一的 key 属性：**



```html
     <ul>
          <li v-for="item in userList" :key="item.id">
               姓名{{ item.name }}
          </li>
     </ul>
```
​				

###### 	key 的注意事项：

​					**① key 的值只能是字符串或数字类型**
​					
​					**② key 的值必须具有唯一性（即：key 的值不能重复）**
​					
​					**③ 建议把数据项 id 属性的值作为 key 的值（因为 id 属性的值具有唯一性）**
​					
​					**④ 使用 index 的值当作 key 的值没有任何意义（因为 index 的值不具有唯一性，不是一一对应的）**
​					
​					**⑤ 建议使用 v-for 指令时一定要指定 key 的值（既提升性能、又防止列表状态紊乱）**



​			**使用v-for添加学生示例：**
​			
```html
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="js/v2.6.10/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<input type="text" v-model="name">
			<button @click="addClick">添加</button>
			<ul>
				<li v-for="item in userList" :key="item.id">
					<input type="checkbox">
					姓名{{ item.name }}
				</li>
			</ul>
		</div>
		<script>
			const vm = new Vue({
				el:'#app',
				data:{
					userList:[
						{id:1,name:'zs'}
					],
                        //输入的用户名
					name:'',		
					nextId:2
				},
				methods:{
					addClick(){
						this.userList.push({id:this.nextId,name:this.name})	
                              //向末尾添加元素    
						// this.userList.unshift({id:this.nextId,name:this.name})	
                              //向首部添加元素
						this.name = ''
						this.nextId++
					}
				}
			})
		</script>
	</body>
</html>
```





##### 过滤器：

​		 

​		**1、vue2才有，vue3已经淘汰了**
​	 
​		**2、过滤器（Filters）是 vue 为开发者提供的功能，常用于文本的格式化。过滤器可以用在两个地方：**

​		**插值表达式和 v-bind 属性绑定。**
​		
​		**3、过滤器应该被添加在 JavaScript 表达式的尾部，由“管道符”进行调用**
​		
​			**使用私有过滤器写首字母转大写示例如下：**
​			

```html
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="js/v2.6.10/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<p>{{ message | capitalize }}</p>
		</div>
		<script>
			const vm = new Vue({
				el:'#app',
				data:{
					message:'Hello vue.js'
				},
					//过滤器函数，必须定义到filters之下
					//过滤器本质上是函数
				filters:{
					capitalize(val){//接收变量message
                              
                              const first = val.charAt(0).toUpperCase()
                              const other = val.slice(1)	//从索引1开始截取到结尾
                              //过滤器中必须要有返回值
                              return first + other
                              
					}
				}
			})
		</script>
	</body>
</html>
```
​			

###### 1、私有过滤器和全局过滤器：


​				**1.1：私有过滤器和全局过滤器在 filters 节点下定义的过滤器，称为“私有过滤器”，**
​				
​					**因为它只能在当前 vm 实例所控制的 el 区域内使用。如果希望在多个 vue 实例之间共享过滤器，**
​				
​					**则可以按照如下的格式定义全局过滤器**
​					
​				**1.2：全局过滤器：独立于每个vm实例之外**
​				
​					**使用全局过滤器写首字母转大写示例如下：**
​					

```html
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="js/v2.6.10/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<p>message信息：{{ message |  capitalize}}</p>
		</div>
		<div id="app2">
			<p>message信息：{{ message |  capitalize}}</p>
		</div>
		<script>
                                        
                    //Vue.filter()方法接收两个参数

                    //第1个参数，是全局过滤器的"名字"

                    //第2个参数，是全局过滤器的"处理函数"

                    Vue.filter('capitalize',(val)=>{

                         const first = val.charAt(0).toUpperCase()
                         const other = val.slice(1)
                         return first+other
                    })
                    const vm = new Vue({
                         el:'#app',
                         data:{
                              message:'Hello vue.js'
                         }

                    })
                    const vm2 = new Vue({
                         el:'#app2',
                         data:{
                              message:'hello world'
                         }
                    })
                    
			</script>
	</body>
</html>
```


​				**注意：全局过滤器必须定义在script里面，new Vue({})外面**



###### 			2、过滤器的注意点：

​				**2.1：要定义到filters节点下，本质是一个函数**
​				
​				**2.2、在过滤器函数中，一定要有return值**
​				
​				**2.3、在过滤器的形参中，就可以获取到“管道符”前面那个待处理的那个值**



​				**2.4、如果全局过滤器和私有过滤器名字一致，此时按照就近原则，调用的是"私有过滤器"**
​				



###### **3、连续调用多个过滤器**

​					
​				**过滤器可以串联地进行调用，例如：**



​					  **1、把message的值，交给filterA进行处理**



​					  **2、把filterA处理的结果，再交给filterB进行处理**



​					  **3、最终把filterB处理的结果，作为最终的值渲染到页面上**

​							**例如：**

```html
                 <p>{{ message | filterA | filterB }}</p>
```

​			

​	**连续调用多个过滤器，第一个首字母转大写和控制文本的最大长度，示例如下：**
​				

```html
<html>
	<head>
		<meta charset="utf-8">
          <title></title>
		<script src="js/v2.6.10/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<p>{{ message | capitalize | maxLength }}</p>
		</div>
		<script>
			const vm = new Vue({
				el:'#app',
				data:{
					message:'Hello vue.js'
				},
					//过滤器函数，必须定义到filters之下
					//过滤器本质上是函数
				filters:{
                         
					//第一个首字母转大写
					capitalize(val){//接收变量message
						const first = val.charAt(0).toUpperCase()
						const other = val.slice(1)	//从索引1开始截取到结尾
						//过滤器中必须要有返回值
						return first + other
					},
                         
					//控制文本最大长度
					maxLength(str){
						if(str.length<=10){
							return str
						}
						return str.slice(0,12)+"  ....."
					}
				}
			})
               
			//过滤器的注意点：
			//1、要定义到filters节点下，本质是一个函数
			//2、在过滤器函数中，一定要有return值
			//3、在过滤器的形参中，就可以获取到“管道符”前面那个待处理的那个值
		</script>
	</body>
</html>
```
​			



###### 	**4、过滤器传参**


​					**过滤器的本质是 JavaScript 函数，因此可以接收参数，格式如下：**
​				
​						

```html
<!-- arg1 和 arg2 是传递给 filterA的参数 -->
<p>{{ message | filterA(arg1,arg2) }}</p>
<script>
     //过滤器处理函数的形参列表中：
          //第一个参数：永远都是“管道符”前面待处理的值
          //第二个参数开始，才是调用过滤器传递过来的 arg1 和 arg2 参数
     Vue.filter('filterA',(message,arg1,arg2)=>{
               //过滤器的代码逻辑
     })
</script>
```

​						

​				**过滤器传参代码如下：**
​						

```html
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="js/v2.6.10/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<p>{{ message | capitalize | maxLength(12) }}</p>
		</div>
		<script>
			const vm = new Vue({
                    
				el:'#app',
				data:{
					message:'Hello vue.js'
				},
					//过滤器函数，必须定义到filters之下
					//过滤器本质上是函数
                    
				filters:{
                         
					//第一个首字母转大写
					capitalize(val){//接收变量message
						const first = val.charAt(0).toUpperCase()
                              
						const other = val.slice(1)	//从索引1开始截取到结尾
                              
						//过滤器中必须要有返回值
						return first + other
					},
                         
					//控制文本最大长度
					maxLength(str,len){
						if(str.length<=10){
							return str
						}
					return str.slice(0,len)+"  ....."
					}
				}
			})
				//过滤器的注意点：
						//1、要定义到filters节点下，本质是一个函数
						//2、在过滤器函数中，一定要有return值
						//3、在过滤器的形参中，就可以获取到“管道符”前面那个待处理的那个值
		</script>
	</body>
</html>
```
​				



###### 	**5、过滤器的兼容性:**

​					**过滤器仅在 vue 2.x 和 1.x 中受支持，在 vue 3.x 的版本中剔除了过滤器相关的功能。**
​					
​						**在企业级项目开发中：**
​						
​							**⚫ 如果使用的是 2.x 版本的 vue，则依然可以使用过滤器相关的功能**
​							
​							**⚫ 如果项目已经升级到了 3.x 版本的 vue，官方建议使用计算属性或方法代替被剔除的过滤器功能**
​							
​							**具体的迁移指南，请参考 vue 3.x 的官方文档给出的说明：**
​							
​								https://v3.vuejs.org/guide/migration/filters.html#migration-strategy



​									

## 侦听器

​			

### 1、什么是 watch 侦听器



​				**watch 侦听器允许开发者监视数据的变化，从而针对数据的变化做特定的操作。**
​				

#### 			侦听器的格式：



##### 						1、方法格式的侦听器


​							**缺点1：无法在刚进入页面的时候，自动触发默认值**
​					
​							**缺点2：如果侦听的是一个对象，如果对象中的属性发生了变化，不会触发侦听器**
​					

##### 						2、对象格式的侦听器

​							**好处1：可以通过immediate选项，让侦听器自动触发！**
​					
​							**好处2：可以通过deep选项，让侦听器深度监听对象中每个属性的变化！**
​				
​				**方法格式的侦听器语法格式如下：**
​					

```html
<div id="app">
     <input type="text" v-model="username">
</div>
<script src="js/v2.6.10/vue.js"></script>
<script>
     const vm = new Vue({
          el:'#app',
          data:{
               username:''
          },//所有的侦听器，都应该定义到 watch 节点下
          watch:{
               //侦听器本质上是一个函数，要监听那个数据的变化，就把数据名作为方法名即可，规定
               //第一个形参永远都是：newVal 是"变化后的新值"，第二个形参永远都是：oldVal 是"变化之前的值"
               //newVal和oldVal名字可以变
               username(newVal,oldVal){
                    console.log("新值："+newVal+"旧值："+oldVal);
               }
          }
     })
</script>
```

### 2、对象格式的侦听器：

**默认情况下，组件在初次加载完毕后不会调用 watch 侦听器。如果想让 watch 侦听器立即被调用，则需要使用 immediate 选项。示例如下：**

```html
<div id="app">
     请输入用户名：<input type="text" v-model="userName" />
</div>
<script src="js/v2.6.10/vue.js"></script>
<script src="js/jquery-3.6.1.js"></script>
<script>
      const vm = new Vue({
          el:'#app',
          data:{
               userName:'admin'
          },
          watch:{
               //定义对象格式的侦听器
               userName:{
                    //侦听器的处理函数
                    //只要监视到了userName值的变化，会自动触发handler函数
                    handler(newVal,oldVal){
                         if(newVal === '') return //如果 newVal 等于 null return出去
                         //1、调用jQuery中的 Ajax 发起请求，判断 newVal 是否被占用
                         $.get('https://www.escook.cn/api/finduser/'+newVal,result=>{
                         //把newVal，发送给服务器
                              console.log(result)
                         })
                    },
                    //immediate里面的true表示一进入页面就会触发handler函数，
                    //false表示一进页面就不会触发handler函数
                    //immediate默认值是false
                    immediate:true 
               }
          }
     })
</script>				
```

### 		3、深度侦听：

​			**如果 watch 侦听的是一个对象，如果对象中的属性值发生了变化，则无法被监听到。此时需要使用 deep 选项**
​			
​				**示例如下：**
​				

```html
<div id="app">
     请输入用户名：<input type="text" v-model="info.userName">
</div>
<script src="js/v2.6.10/vue.js"></script>
<script src="js/jquery-3.6.1.js"></script>
<script>
     const vm = new Vue({
          el:'#app',
          data:{
               //用户的信息对象
               info:{
                    userName:'admin'
               }
          },
          watch:{
               //侦听的是 data 里面的 info 对象
               info:{ 
                    handler(newVal){
                         console.log(newVal);
                    },
                    //开启深度监听，只要对象中任何一个属性发生变化了，都会触发对象侦听器
                    //deep属性，默认未开启，需要手动开启，true开启，false未开启
                    deep:true
               }
               //如果要侦听的是对象的子属性的变化：则必须包裹一层单引号
               //示例：
               'info.userName'(newVal,oldVal){
                              console.log(newVal,oldVal);
               }
          }
     })
</script>
```


​										
​			

### 		4、jQuery中的Ajax判断用户名是否被占用：

```html
<div id="app">
     请输入用户名：<input type="text" v-model="userName">
</div>
<script src="js/v2.6.10/vue.js"></script>
<script src="js/jquery-3.6.1.js"></script>
<script>
     const vm = new Vue({
          el:'#app',
          data:{
               userName:''
          },
          watch:{
               userName(newVal){
                    if(newVal === '') return //如果 newVal 等于 null return出去
                    //1、调用jQuery中的 Ajax 发起请求，判断 newVal 是否被占用
                    $.get('https://www.escook.cn/api/finduser/'+newVal,result=>{//把newVal，发送给服务器
                         console.log(result)
                    })		
               }
          }
     })
</script>
```



## 侦听器



### 	1、什么是 watch 侦听器

​				**watch 侦听器允许开发者监视数据的变化，从而针对数据的变化做特定的操作。**
​				

#### **侦听器的格式：**

#### **1、方法格式的侦听器**

​				
​						**缺点1：无法在刚进入页面的时候，自动触发默认值**
​					
​						**缺点2：如果侦听的是一个对象，如果对象中的属性发生了变化，不会触发侦听器**
​					

#### 				2、对象格式的侦听器


​					**好处1：可以通过immediate选项，让侦听器自动触发！**
​					
​					**好处2：可以通过deep选项，让侦听器深度监听对象中每个属性的变化！**
​				
​				**方法格式的侦听器语法格式如下：**
​					

```html
<div id="app">
     <input type="text" v-model="username">
</div>
<script src="js/v2.6.10/vue.js"></script>
<script>
     const vm = new Vue({
          el:'#app',
          data:{
               username:''
          },//所有的侦听器，都应该定义到 watch 节点下
          watch:{
               //侦听器本质上是一个函数，要监听那个数据的变化，就把数据名作为方法名即可，规定
               //第一个形参永远都是：newVal 是"变化后的新值"，第二个形参永远都是：oldVal 是"变化之前的值"
               //newVal和oldVal名字可以变
               username(newVal,oldVal){
                    console.log("新值："+newVal+"旧值："+oldVal);
               }
          }
     })
</script>
```


​								
​		

### 		2、对象格式的侦听器：

​			**默认情况下，组件在初次加载完毕后不会调用 watch 侦听器。如果想让 watch 侦听器立即被调用，则需要使用 immediate 选项。**
​			
​		**示例如下：**

```html
<div id="app">
	请输入用户名：<input type="text" v-model="userName">
</div>
<script src="js/v2.6.10/vue.js"></script>
<script src="js/jquery-3.6.1.js"></script>
<script>
     const vm = new Vue({
          el:'#app',
          data:{
               userName:'admin'
          },
          watch:{
               //定义对象格式的侦听器
               userName:{
                    //侦听器的处理函数
                    //只要监视到了userName值的变化，会自动触发handler函数
                    handler(newVal,oldVal){
                         if(newVal === '') return //如果 newVal 等于 null return出去
                         //1、调用jQuery中的 Ajax 发起请求，判断 newVal 是否被占用
                    $.get('https://www.escook.cn/api/finduser/'+newVal,result=>{
                 	//把newVal，发送给服务器
                      console.log(result)
                 })
            },
            //immediate里面的true表示一进入页面就会触发handler函数，
            //false表示一进页面就不会触发handler函数
            //immediate默认值是false
            immediate:true 
       }
  	}
   })
</script>          
```

### 3、深度侦听：

​			**如果 watch 侦听的是一个对象，如果对象中的属性值发生了变化，则无法被监听到。此时需要使用 deep 选项**
​**示例如下：**

```html
<div id="app">
   请输入用户名：<input type="text" v-model="info.userName" />
</div>
<script src="js/v2.6.10/vue.js"></script>
<script src="js/jquery-3.6.1.js"></script>
<script>
     var vm = new Vue({
          el:'#app',
          data:{
               //用户的信息对象
               info:{
                   userName:'admin'
               }
          },
          watch:{
               //侦听的是 data 里面的 info 对象
               info:{ 
                    handler(newVal){
                         console.log(newVal);
                    },
                    //开启深度监听，只要对象中任何一个属性发生变化了，都会触发对象侦听器
                    //deep属性，默认未开启，需要手动开启，true开启，false未开启
                    deep:true
               }
               //如果要侦听的是对象的子属性的变化：则必须包裹一层单引号
               // 示例：
               'info.userName'(newVal,oldVal){
                    console.log(newVal,oldVal);
               }
          }
     })
</script>
```

### 		4、jQuery中的Ajax判断用户名是否被占用：

​		

```html
<div id="app">
     请输入用户名：<input type="text" v-model="userName">
</div>
<script src="js/v2.6.10/vue.js"></script>
<script src="js/jquery-3.6.1.js"></script>
<script>
     const vm = new Vue({
          el:'#app',
          data:{
               userName:''
          },
          watch:{
               userName(newVal){
                    if(newVal === '') return //如果 newVal 等于 null return出去
                    //1、调用jQuery中的 Ajax 发起请求，判断 newVal 是否被占用
                    $.get('https://www.escook.cn/api/finduser/'+newVal,result=>{//把newVal，发送给服务器
                         console.log(result)
                    })						
               }
          }
     })
</script>
```





### 计算属性：



#### 			1. 什么是计算属性：



​					**计算属性指的是通过一系列运算之后，最终得到一个属性值。**
​				
​					**这个动态计算出来的属性值可以被模板结构或 methods 方法使用。示例代码如下：**



```html
<!DOCTYPE html>
<html>
     <head>
          <meta charset="utf-8">
          <title></title>
          <style>
               *{
                    margin: 0px;
                    padding: 0px;
               }
               #box{
                    width: 200px;
                    height: 200px;
                    background-color: #000000;
               }
          </style>
     </head>
     <body>
          <div id="app">
               R:<input type="text" v-model.number="r"><br>
               G:<input type="text" v-model.number="g"><br>
               B:<input type="text" v-model.number="b">
               <!-- 差值表达式都是js代码 -->
               <!-- :style 代表动态绑定一个样式对象 ，它的值是{ }对象 -->
               <!-- 当前的样式对象，只包含 backgroundColor 背景颜色 ，里面的值是动态的 -->
               <div id="box" :style="{ backgroundColor:`rgb( ${r} , ${g} , ${b} )` }">
                    {{ `rgb( ${r} , ${g} , ${b} )` }}
               </div>
               <button @click="showRgb">按钮</button>
               <p>computed属性：{{ show }}</p>
          </div>
          <script src="js/v2.6.10/vue.js"></script>
          <script>
               const vm = new Vue({
                    el:'#app',
                    data:{
                         //红
                         r:0,
                         //绿
                         g:0,
                         //蓝
                         b:0
                    },
                    methods:{
                         showRgb(){
                              console.log(`rgb( ${this.r} , ${this.g} , ${this.b} )`)
                         }
                    },
                    computed:{
                         show(){
                              return `rgb( ${this.r} , ${this.g} , ${this.b} )`
                         }
                    }
               })
          </script>
     </body>
</html>
```





#### 			2.计算属性的特点

​					

​				**① 虽然计算属性在声明的时候被定义为方法，但是计算属性的本质是一个属性**
​					
​				**② 计算属性会缓存计算的结果，只有计算属性依赖的数据变化时，才会重新进行运算**



##### 						特点：

​				

###### 							**1、定义的时候，要被定义为"方法"**

​				

###### 							**2、在使用计算属性的时候，当普通的属性使用即可**

​				

##### 						好处：



###### 							**1、实现了代码的复用**

​				

###### 							**2、只要计算属性中依赖的数据变化了，则计算属性会自动重新求值**



### axios(Web数据交互方式)

​		

#### 		介绍：

​		

​				**axios是一个专注于网络请求的库！**



​				**Axios，是一个基于promise  的网络请求库，作用于node.js和浏览器中，它是 isomorphic 的(即同一套代码可以运行在浏览器和node.js中)。在服务端它使用原生node.js 模块, 而在客户端 (浏览端) 则使用XMLHttpRequest。**



#### 	axios的基本使用



##### 			1、使用GET方式发起请求



```javascript
axios({
     method:'GET',	//请求方式
     url:'http:www.liulongbin.top:3006/api/getbooks',//请求地址
     //url（GET） 中的查询参数
     params:{
          id:1
     },

     //请求体参数 （POST）
     data:{}
}).then(function(result){
     console.log(result)
})
```


​								

##### 		2、使用POST方式发起请求



```html
<body>
     <button id="btnPost">发起POST请求</button>
     <script src="js/axios.js"></script>
     <script>
          document.querySelector('#btnPost').addEventListener('click',async function(){
               //如果调用某个方法的返回值是 Promise 实例，则前面可以添加个 await！
               //await 只能用在被 async "修饰"的方法中
               const result = await axios({
                    method:'POST',
                    url:'http://www.liulongbin.top:3006/api/post',
                    data:{
                         name:'zs',
                         age:20
                    }
               })
               // .then(function(result){
               // 	console.log(result)
               // })
               console.log(result)
          })
     </script>
</body>
```





##### axios使用解构赋值



```html
<body>
     <button id="btnPost">发起POST请求</button>
     <button id="btnGet">发起GET请求</button>
     <script src="js/axios.js"></script>
     <script>
          document.querySelector('#btnPost').addEventListener('click',async function(){
          //如果调用某个方法的返回值是 Promise 实例，则前面可以添加个 await！
          // 调用 axios 返回的就是 Prmise 使用 ，则可以使用 await
          //await 只能用在被 async "修饰"的方法中

          //使用解构赋值,把axios里面的data数据拿过来
               const { data } = await axios({
                    method:'POST',
                    url:'http://www.liulongbin.top:3006/api/post',
                    data:{
                         name:'zs',
                         age:20
                    }
               })
               console.log(data)
          })
          document.querySelector('#btnGet').addEventListener('click',async function(){
          //解构赋值的时候，使用 ：进行重命名
          //1、调用 axios 之后，使用 async/await 进行简化
          //2、使用解构赋值，从axios封装的大对象中 data 属性解构出来
          //3、把解构出来的 data 属性，使用冒号进行重命名，一般重命名为 { data : result }
               const { data : result } = await axios({
                    method:'GET',
                    url:'http://www.liulongbin.top:3006/api/getbooks',
                    params:{
                         id:1
                    }
               })
               console.log(result.data)
          })
     </script>
</body>
```





##### axios.get 和 axios.post 请求方式



```html
<body>
     <button id="btnGet">GET请求</button>
     <button id="btnPost">POST请求</button>
     <script src="js/axios.js"></script>
     <script>
          document.querySelector('#btnGet').addEventListener('click',async function(){
          // axios.get('url地址',{
          // 	//get参数
          // 	params:{}
          // })
               const { data : result } =await axios.get('http://www.liulongbin.top:3006/api/getbooks',{
                    params:{
                         id:1
                    }
               })
               console.log(result)
          })
          document.querySelector('#btnPost').addEventListener('click',async function(){
          // axios.post('url',{
          // 	//这是post请求体数据
          // })
               const { data : result } = await axios.post('http://www.liulongbin.top:3006/api/post',{
                    name:'zs',
                    gender:'女'
               })
               console.log(result)
          })
     </script>
</body>
```





### vue-cli



#### 	1.什么是单页面应用程序:



​		**单页面应用程序（英文名：Single Page Application）简称 SPA，顾名**
​		**思义，指的是一个 Web 网站中只有唯一的一个 HTML 页面，所有的功能**
​		**与交互都在这唯一的一个页面内完成。**
​		

#### 	2.什么是 vue-cli:



​		**vue-cli 是 Vue.js 开发的标准工具。它简化了程序员基于 webpack 创建工程化的 Vue 项目的过程。**
​	
​			**引用自 vue-cli 官网上的一句话：**
​		
​				**程序员可以专注在撰写应用上，而不必花好几天去纠结 webpack 配置的问题。**
​			
​			**中文官网：https://cli.vuejs.org/zh/**



#### 	3.安装和使用:

​			

​			**vue-cli 是 npm 上的一个全局包，使用 npm install 命令，即可方便的把它安装到自己的电脑上：**
​		
​					**npm install -g @vue/cli		简写 npm i -g @vue/cli**			**-g：全局安装**
​						
​				**基于 vue-cli 快速生成工程化的 Vue 项目：**
​		
​					**vue create 项目的名称**
​			
​				**检查 vue-cli 版本号： vue -V**



##### 		**安装 ：**

​							

###### 			**1、选择自定义选项，按回车进入下一项**

​			<img src="/vue/vue2Images/vue-cli创建项目的步骤截图/步骤一.jpg" style="zoom: 80%;" />

​		

###### **2.选择Babel和cssPre-processors，使用上下箭头调到Babel和cssPre-processors按空格选中，然后按回车进入下一项**		

​			<img src="/vue/vue2Images/vue-cli创建项目的步骤截图/步骤二.jpg" style="zoom:80%;" />



###### 3.选择2.0，2.0是vue2.0，然后按回车进入下一项

​			<img src="/vue/vue2Images/vue-cli创建项目的步骤截图/步骤三.jpg" style="zoom:80%;" />		



###### 4.选择Less语法，按回车进入下一项

​			<img src="/vue/vue2Images/vue-cli创建项目的步骤截图/步骤四.jpg" style="zoom:80%;" />



###### 5.选择In dedicated config files ，让Babel和cssPre-processors放到独立配置文件，In package.json 是把下载的模块放到package.json文件里面，然后等待即可

​			<img src="/vue/vue2Images/vue-cli创建项目的步骤截图/步骤五.jpg" style="zoom:80%;" />



#### 4.vue 项目的运行流程



> ​	**在工程化的项目中，vue 要做的事情很单纯：通过 main.js 把 App.vue 渲染到 index.html 的指定区域中。**
> ​	
> ​		**其中：**
> ​		
> ​			**① App.vue 用来编写待渲染的模板结构**
> ​			**② index.html 中需要预留一个 el 区域**
> ​			**③ main.js 把 App.vue 渲染到了 index.html 所预留的区域中**





### Vue 组件



#### 	1.什么是组件化开发


​		**组件化开发指的是：根据封装的思想，把页面上可重用的 UI 结构封装为组件，从而方便项目的开发和维护。**
​	

#### 	2.vue 中的组件化开发



​		**vue 是一个支持组件化开发的前端框架。**
​	
​		**vue 中规定：组件的后缀名是 .vue。之前接触到的 App.vue 文件本质上就是一个 vue 的组件。**

#### 3.vue 组件的三个组成部分

 ​		**每个 .vue 组件都由 3 部分构成，分别是：**
>
> ​			** template -> 组件的模板结构**
> ​			** script -> 组件的 JavaScript 行为**
> ​			** style -> 组件的样式**
>
> ****
> **其中，每个组件中必须包含 template 模板结构，而 script 行为和 style 样式是可选的组成部分。**



##### 	3.1 template

​			

​			**vue 规定：每个组件对应的模板结构，需要定义到 template 标签节点中。**
​	

<template>
     <!-- 当前组件的 DOM 结构，需要定义到 template 标签的内部 -->
</template>



​		**注意：**
​		
​				** template 是 vue 提供的容器标签，只起到包裹性质的作用，它不会被渲染为真正的 DOM 元素**
​		
​				** template 中只能包含唯一的根节点**



##### 3.2 script



​	**vue 规定：开发者可以在 script标签 节点中封装组件的 JavaScript 业务逻辑。**
​	
​	script 标签 节点的基本结构如下：
​    

```javascript
<script>
     // 今后，组件相关的 data 数据，methods 方法等...
     // 都需要定义到 export default 所导出的对象中，
     export default{}
</script>
```

​	**.vue 组件中的 data 必须是函数：**
​	
​				**vue 规定：.vue 组件中的 data 必须是一个函数，不能直接指向一个数据对象。**
​		
​		**因此在组件中定义 data 数据节点时，下面的方式是错误的：**
​		
​					**data:{ // 组件中，不能直接让 data 指向一个数据对象 （会报错）**
​						**count：0**
​					**}**
​		

​		**会导致多个组件实例共用同一份数据的问题，请参考官方给出的示例：**

​				**https://cn.vuejs.org/v2/guide/components.html#data-必须是一个函数**
​		

##### 3.3 style



​	**vue 规定：组件内的 style 标签节点是可选的，开发者可以在 style标签节点中编写样式美化当前组件的 UI 结构。**
​	
​		script标签节点的基本结构如下：

```vue
<style>
     h1{
          font-weight: normal;
     }
</style>
```
​	

​	**让 style 中支持 less 语法：**
​	
​			**在 style 标签上添加 lang="less" 属性，即可使用 less 语法编写组件的样式：**
​		

```vue
<style lang="less">
     h1{
          font-weight: normal;
     }
</style>
```



#### 4.组件之间的父子关系



​						<img src="/vue/vue2Images/组件的父子关系.png" style="zoom:60%;" />

**组件在被封装好之后，彼此之间是相互独立的，不存在父子关系 在使用组件的时候，根据彼此的嵌套关系，形成了父子关系、兄弟关系**



##### 4.1 使用组件的三个步骤



###### 		**步骤1：使用 import 语法导入需要的组件：**



```javascript
import Right from '@/components/Right.vue'
```

​		

###### 	**步骤2：使用 components 节点注册组件**



```javascript
export default {
  components: {
    Right
  }
}
```



###### 	步骤3：以标签形式使用刚才注册的组件



```html
<div class="box">
	<Right></Right>
</div>
```





##### 4.2 通过 components 注册的是私有子组件



​	 **例如：** 

​			**在组件 A 的 components 节点下，注册了组件 F。 则组件 F 只能用在组件 A 中；不能被用在组件 C 中。**



##### 4.3 注册全局组件



​	**在 vue 项目的 main.js 入口文件中，通过 Vue.component() 方法，可以注册全局组件。**

​		**示例代码如下：**



```javascript
//导入需要注册的全局组件
import Right from '@/components/Right.vue'

//参数1：字符串格式，表示组件的"注册名称"
//参数2：需要被全局注册的那个组件
Vue.component('Right',Right)
```



#### 5.组件的 props

​			

​		**props 是组件的自定义属性，在封装通用组件的时候，合理地使用 props 可以极大的提高组件的复用性！**
​			
​			**它的语法格式如下：**


```javascript
export default {
  //组件的自定义属性
  props:['init'],
  //组件的私有数据
  data(){
  	return{}
  }
}
```



##### 5.1 props 是只读的



​	**vue 规定：组件中封装的自定义属性是只读的，程序员不能直接修改 props 的值。否则会直接报错**

​		

​							![](/vue/vue2Images/props的值是只读的.png)



**要想修改 props 的值，可以把 props 的值转存到 data 中，因为 data 中的数据都是可读可写的！**

```javascript
export default{
     props:['init'],
     data() {
          return{
            count: this.init
          }
     }
}
```



##### 5.2 props 的 default 默认值



​	**在声明自定义属性时，可以通过 default 来定义属性的默认值。示例代码如下：**

​		

```javascript
export default{
 props:{
     init:{
       //如果外界使用 Coun 组件的时候，没有传递 init属性，则默认值生效
       default:0
     }
  }
}
```



##### 5.3 props 的 type 值类型

​	

​		**在声明自定义属性时，可以通过 type 来定义属性的值类型。**

​			**示例代码如下：**



```javascript
export default{
  props:{
     init:{
       //如果外界使用 Coun 组件的时候，没有传递 init属性，则默认值生效
       default:0,
       //init的值传递的不是 Number 类型的值，则终端报错
       type:Number
     }
  }
}
```



##### 5.4 props 的 required 必填项 



​	**在声明自定义属性时，可以通过 required 选项，将属性设置为必填项，强制用户必须传递属性的值。**

​		**示例代 码如下：**


```javascript
export default{	 
 props:{
     init:{
       //如果外界使用 Coun 组件的时候，没有传递 init属性，则默认值生效
       default:0,
       //init的值传递的不是 Number 类型的值，则终端报错
       type:Number,
       //必填项校验，如果不填 init 的值则终端报错，如果有默认值的话，也会报错
       require:true
     }
  }
}
```

​			

#### 6.组件之间的样式冲突问题

​	

​	**默认情况下，写在 .vue 组件中的样式会全局生效，因此很容易造成多个组件之间的样式冲突问题。**
​			
​			**导致组件之间样式冲突的根本原因是：**
​			
​				**① 单页面应用程序中，所有组件的 DOM 结构，都是基于唯一的 index.html 页面进行呈现的**
​				
​				**② 每个组件中的样式，都会影响整个 index.html 页面中的 DOM 元素**



##### 6.1 思考：如何解决组件样式冲突的问题



​		**为每个组件分配唯一的自定义属性，在编写组件样式时，通过属性选择器来控制样式的作用域。**



​			**示例代码如下：**



```vue
<template>
     <div class="left-container">
          <h3 data-v-001>Left 组件</h3>
     </div>
</template>
<script>

export default{}

</script>
<style lang="less">
     .left-container{
          padding: 0 20px 20px;
          background-color: lightskyblue;
          min-height: 250px;
          flex: 1;
     }
     h3[data-v-001]{
          color: red;
     }
</style>
```



##### 6.2 style 节点的 scoped 属性

​				

​				**为了提高开发效率和开发体验，vue 为 style 节点提供了 scoped 属性，从而防止组件之间的样式冲突问题：**


​					
```vue
<template>
     <div class="left-container">
          <h3>Left 组件</h3>
     </div>
</template>
<script>

export default{}

</script>
<style lang="less" scoped>
     .left-container{
          padding: 0 20px 20px;
          background-color: lightskyblue;
          min-height: 250px;
          flex: 1;
     }
     h3{
          color: red;
     }
</style>
```





##### 6.3 /deep/ 样式穿透



​			**如果给当前组件的 style 节点添加了 scoped 属性，则当前组件的样式对其子组件是不生效的。如果想让某些样**
​			**式对子组件生效，可以使用 /deep/ 深度选择器**



​	**示例如下：**

```vue
<template>
     <div class="left-container">
          <h3>Left 组件</h3>
          <count :init="1"></count>
     </div>
</template>
<script>

export default{}

</script>
<style lang="less" scoped>
     .left-container{
          padding: 0 20px 20px;
          background-color: lightskyblue;
          min-height: 250px;
          flex: 1;
     }

     // 不加 /deep/: h5 [data-v-3c83f0b7]
     //加 /deep/ : [data-v-3c83f0b7] h5
     // /deep/ ：会先找父元素的 data-v-3c83f0b7 然后再找标签
     //当使用第三方组件库的时候，如果有修改第三方默认样式的需求，需要用到 /deep/
     /deep/ h5{
          color: pink;
     }

</style>

```





### 组件的生命周期



#### 		1.生命周期 & 生命周期函数



​					**生命周期（Life Cycle）是指一个组件从创建 -> 运行 -> 销毁的整个阶段，强调的是一个时间段。** 

​					**生命周期函数：是由 vue 框架提供的内置函数，会伴随着组件的生命周期，自动按次序执行。**



​					 **注意：生命周期强调的是时间段，生命周期函数强调的是时间点。**



#### 	2. 组件生命周期函数的分类



​											<img src="/vue/vue2Images/生命周期阶段.png" style="zoom:80%;" />		



#### 3.生命周期图示

​		

​							<img src="/vue/vue2Images/生命周期图示.png" style="zoom:67%;" />



#### 生命周期分为三个阶段：



##### 			1.创建阶段：一个.vue文件只执行一次

​				

###### 					1.beforeCreate



​						**创建阶段的 props/data/methods 尚未被创建，都处于不可用的状态**



```javascript
beforeCreate() {
    console.log("初始化事件和生命周期")
}
```

​				

###### 						2.created		



​						**created 生命周期函数，非常常用**

​						**经常在它里面，调用 methods 中的方法，请求服务器的数据**

​						**并且，把请求到的数据，转存到 data 中，供 template 模板渲染的时候使用！**

​							

```javascript
created(){
   console.log("组件创建好阶段")
   console.log(this.info)
   console.log(this.message)
   this.show()
   console.log("ajax请求：")
   this.initBookList()
   console.log("----------------")
}
```



###### 			**3.beforeMount**



​					**将要把内存中编译好的 HTML 结构渲染到浏览器中，此时浏览器中还没有当前组件的 DOM 结构**



```javascript
beforeMount(){
   console.log("beforeMount")
}
```

​				

​					**注意：  beforeMount 操作不了 dom 元素**



###### 		4.mounted



​					**已经把内存中的 HTML 结构，成功的渲染到浏览器之中，此时浏览器已经包含了当前组件的 DOM 结构**



​					**如果要操作当前组件的 DOM 最早，只能在 mounted 阶段执行**



```javascript
mounted() {
   console.log("mounted")
}
```

​	



##### 			2.运行阶段：运行阶段函数最少执行0次，如果数据没发生变化就不会执行，最多执行 N 次



###### 				1.beforeUpdate：



​					**将要根据变化过后、最新的数据，重新渲染组件的模板结构**



```javascript
beforeUpdate(){
   console.log("beforeUpdate")
}
```



###### 				2.updated



​					**根据最新的数据，重新渲染组件的 DOM 结构**

​					**当数据变化之后，为了能够操作到最新的 DOM 结构，必须把代码写到 updated 生命周期函数中**



​					

```javascript
updated(){
   console.log("updated")
}
```





##### 3.销毁阶段：一个.vue文件只执行一次



###### 	**1.beforeDestroy**

​			

​			**将要销毁此组件，此时尚未销毁，组件还处于正常工作的状态**



```javascript
beforeDestroy(){
   console.log("组件销毁之前")
   console.log(this.message)
}
```



###### 	2.destroyed



​			**组件已经被销毁，此组件在浏览器中对应 DOM 结构已被完全移除**



```javascript
destroyed(){
   console.log("组件销毁了")
}
```





### 组件之间的数据共享



#### 	1. 组件之间的关系



​				**在项目开发中，组件之间的最常见的关系分为如下两种：**

​					 **① 父子关系** 

​					 **② 兄弟关系**

​																		![](/vue/vue2Images/组件之间的关系.png)

#### 		2. 父子组件之间的数据共享



​				**父子组件之间的数据共享又分为：** 

​						**① 父 -> 子共享数据** 

​						**② 子 -> 父共享数据**





##### 			2.1 父组件向子组件共享数据

​		

​				**父组件向子组件共享数据需要使用自定义属性。示例代码如下：**



​						<img src="/vue/vue2Images/父向子组件传递数据.png" style="zoom:80%;" />								

​	

##### 	2.2 子组件向父组件共享数据

​			

​			**子组件向父组件共享数据使用自定义事件。示例代码如下：**

​						

​						<img src="/vue/vue2Images/子向父组件传递数据.png" style="zoom:80%;" />



#### 3.兄弟组件之间的数据共享



​			**在 vue2.x 中，兄弟组件之间数据共享的方案是 EventBus。**

​				

​						<img src="/vue/vue2Images/兄弟组件数据共享.png" style="zoom: 67%;" />



#### EventBus 的使用步骤

​		

​			**① 创建 eventBus.js 模块，并向外共享一个 Vue 的实例对象**

​			**② 在数据发送方，调用 bus.$emit('事件名称', 要发送的数据) 方法触发自定义事件**	

​			**③ 在数据接收方，调用 bus.$on('事件名称', 事件处理函数) 方法注册一个自定义事件**





## **前面的复习总结思维导图**

​		

​				<img src="/vue/vue2Images/vue基础思维导图.png" style="zoom:80%;" />





### ref引用

​	

#### 		1. 什么是 ref 引用



​						**ref 用来辅助开发者在不依赖于 jQuery 的情况下，获取 DOM 元素或组件的引用。 每个 vue 的组件实例上，都包含一个 $refs 对象，里面存储着对应的 DOM 元素或组件的引用。默认情况下， 组件的 $refs 指向一个空对象。**



![](/vue/vue2Images/ref引用介绍.png)



#### 2. 使用 ref 引用 DOM 元素



​			**如果想要使用 ref 引用页面上的 DOM 元素，则可以按照如下的方式进行操作：**



<img src="/vue/vue2Images/ref引用介绍2.png" style="zoom: 80%;" />



#### 3.使用 ref 引用组件实例



​				**如果想要使用 ref 引用页面上的组件实例，则可以按照如下的方式进行操作：**



​							<img src="/vue/vue2Images/ref引用介绍3.png" style="zoom:80%;" />



#### 4.控制文本框和按钮的按需切换



​			**通过布尔值 inputVisible 来控制组件中的文本框与按钮的按需切换。示例代码如下：**



​							<img src="/vue/vue2Images/ref引用介绍4.png" style="zoom: 67%;" />





#### 5.让文本框自动获得焦点



​			**当文本框展示出来之后，如果希望它立即获得焦点，则可以为其添加 ref 引用，并调用原生 DOM 对象的 .focus() 方法即可。示例代码如下：**



​								<img src="/vue/vue2Images/ref引用介绍5.png" style="zoom:80%;" />





#### 6.this.$nextTick(cb) 方法



​				**组件的 $nextTick(cb) 方法，会把 cb 回调推迟到下一个 DOM 更新周期之后执行。通俗的理解是：等组件的 DOM 更新完成之后，再执行 cb 回调函数。从而能保证 cb 回调函数可以操作到最新的 DOM 元素。**





​								<img src="/vue/vue2Images/ref引用介绍6.png" style="zoom:80%;" />





### 数组中的 some 循环



#### 		some和forEach循环对比：

​		

​				**forEach 循环一旦开始，无法在中间被停止，所有的数据都会走一遍,return、break不管用**



​				**some 循环可以通过return true终止循环**

​	

##### 用法示例：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<script>
			const arr = ['小红','倪大红','苏大强','张三']
			arr.forEach((item,index)=>{
				console.log(index)
				if(item == '苏大强'){
					console.log('苏大强的索引是',index)
				}
			})
			console.log("-------------------");
			arr.some((item,index)=>{
				console.log(index)
				if(item == '苏大强'){
					console.log('苏大强的索引是',index)
					// 在找到对应的项之后，可以通过 return true 固定的语法，来终止 some 循环
					return true
				}
			})
		</script>
	</body>
</html>
```





### 数组中的 every 判断

​			

#### 			介绍：



​				**every 判断数组中的 布尔值是否为true，如果全部为 true，则为true，否则为false**



##### 用法示例：

```javascript
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<script>
			const arr = [
				{ id:1,name:'西瓜',state:true },
				{ id:2,name:'榴莲',state:false },
				{ id:3,name:'草莓',state:true }
			]
			const result = arr.every(item => item.state)
			console.log(result)
		</script>
	</body>
</html>
```



### 数组中的 reduce 累加器



#### 	语法：



​		**数组.reduce( (累加的结果,当前的循环项) => {},初始值)**



##### 	用法示例：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<script>
               //需求：把 arr 数组中的布尔值为 state为：true，根据数量计算总价
			const arr = [
				{ id:1,name:'西瓜',state:true,price:10,count:1},
				{ id:2,name:'榴莲',state:false,price:80,count:2 },
				{ id:3,name:'草莓',state:true,price:20,count:3 }
			]
			const result = arr.filter(item => item.state).reduce((amt,item) => {
				return amt += item.price * item.count
			},0)
			console.log(result)
		</script>
	</body>
</html>
```

###### reduce 简化写法：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<script>
			const arr = [
				{ id:1,name:'西瓜',state:true,price:10,count:1},
				{ id:2,name:'榴莲',state:false,price:80,count:2 },
				{ id:3,name:'草莓',state:true,price:20,count:3 }
			]
			const result2 = arr.filter(item => item.state).reduce((amt,item) => amt += item.price * item.count,0)
			console.log(result2)
		</script>
	</body>
</html>
```





### 动态组件



#### 		1. 什么是动态组件



​					**动态组件指的是动态切换组件的显示与隐藏。**



#### 		2.如何实现动态组件渲染



​					**vue 提供了一个内置的  组件，专门用来实现动态组件的渲染。示例代码如下：**



​								<img src="/vue/vue2Images/动态组件.png" style="zoom: 80%;" />





#### 3.使用 keep-alive 保持状态

​		

​		**默认情况下，切换动态组件时无法保持组件的状态。此时可以使用 vue 内置的  组件保持动态组 件的状态。示例代码如下：**



​						<img src="/vue/vue2Images/keep-alive.png" style="zoom:80%;" />





#### 4.keep-alive 对应的生命周期函数



​		**当组件被缓存时，会自动触发组件的 deactivated 生命周期函数。** 

​		**当组件被激活时，会自动触发组件的 activated 生命周期函数。**

​				

​						<img src="/vue/vue2Images/keep-alive生命周期函数.png" style="zoom:80%;" />







#### 5.keep-alive 的 include 属性



​		**include 属性用来指定：只有名称匹配的组件会被缓存。多个组件名之间使用英文的逗号分隔：**



​					<img src="/vue/vue2Images/keep-alive中的属性include.png" style="zoom:80%;" />





#### 6.keep-alive中的exclude属性



​		**exclude属性指定哪些组件不需要被缓存，默认的话所有组件都会被缓存，用法和include一样**



​				**注意：**

​							**exclude属性不能和include属性一起使用**





### name属性



​		**如果在“声明组件的时候”，没有为组件指定 name 名称，则组件的名称默认就是“注册时候的名称”**



​			**用法实例：**



​						<img src="/vue/vue2Images/name属性.png" style="zoom:80%;" />







### 插槽



#### 		1. 什么是插槽



​			**插槽（Slot）是 vue 为组件的封装者提供的能力。允许开发者在封装组件时，把不确定的、希望由用户指定的 部分定义为插槽。**



![](/vue/vue2Images/插槽1.png)



​				**可以把插槽认为是组件封装期间，为用户预留的内容的占位符。**



#### 		2.体验插槽的基础用法



​			**在封装组件时，可以通过  元素定义插槽，从而为用户预留内容占位符。示例代码如下：**



<img src="/vue/vue2Images/插槽2.png" style="zoom:80%;" />



##### 		2.1 没有预留插槽的内容会被丢弃

​	

​			**如果在封装组件时没有预留任何  插槽，则用户提供的任何自定义内容都会被丢弃。示例代码如下：**

​		

<img src="/vue/vue2Images/插槽3.png" style="zoom:80%;" />



##### 		2.2 后备内容(默认内容)

​		

​					**封装组件时，可以为预留的  插槽提供后备内容（默认内容）。如果组件的使用者没有为插槽提供任何 内容，则后备内容会生效。示例代码如下：**



​					<img src="/vue/vue2Images/插槽4.png" style="zoom:80%;" />





#### 3.具名插槽



​	**如果在封装组件时需要预留多个插槽节点，则需要为每个  插槽指定具体的 name 名称。这种带有具体 名称的插槽叫做“具名插槽”。示例代码如下：**

​		

​						<img src="/vue/vue2Images/插槽5.png" style="zoom:80%;" />



​		**注意：没有指定 name 名称的插槽， 会有隐含的名称叫做 “default”。**



##### 3.1 为具名插槽提供内容

​	

​			**在向具名插槽提供内容的时候，我们可以在一个template标签元素上使用 v-slot 指令，并以 v-slot 的参数的 形式提供其名称。示例代码如下：**



![](/vue/vue2Images/插槽6.png)





##### 3.2 具名插槽的简写形式



​		**跟 v-on 和 v-bind 一样，v-slot 也有缩写，即把参数之前的所有内容 (v-slot:) 替换为字符 #。例如 v-slot:header 可以被重写为 #header：**



<img src="/vue/vue2Images/插槽7.png" style="zoom:80%;" />



#### 	4.作用域插槽



​		**在封装组件的过程中，可以为预留的  插槽绑定 props 数据，这种带有 props 数据的  叫做“作用 域插槽”。示例代码如下：**



<img src="/vue/vue2Images/插槽8.png" style="zoom:80%;" />



##### 		4.1 使用作用域插槽

​			

​			**可以使用 v-slot: 的形式，接收作用域插槽对外提供的数据。示例代码如下：**

​		

​						<img src="/vue/vue2Images/插槽9.png" style="zoom:80%;" />



##### 	4.2 解构插槽 Prop

​			

​			**作用域插槽对外提供的数据对象，可以使用解构赋值简化数据的接收过程。示例代码如下：**



<img src="/vue/vue2Images/插槽10.png" style="zoom:80%;" />







### 自定义指令



#### 	1.什么是自定义指令

 

​			**vue 官方提供了 v-text、v-for、v-model、v-if 等常用的指令。除此之外 vue 还允许开发者自定义指令。**



####    2.自定义指令的分类



​			**vue 中的自定义指令分为两类，分别是：**



​					**⚫ 私有自定义指令**

​				

​					**⚫ 全局自定义指令**

​			

####     3.私有自定义指令

​	

​			**在每个 vue 组件中，可以在 directives 节点下声明私有自定义指令。示例代码如下：**



​						<img src="/vue/vue2Images/自定义指令1.png" style="zoom:80%;" />



####   4.使用自定义指令



​			**在使用自定义指令时，需要加上 v- 前缀。示例代码如下：**

​					

​					<img src="/vue/vue2Images/自定义指令2.png" style="zoom:80%;" />



#### 5.为自定义指令动态绑定参数值



​			**在 template 结构中使用自定义指令时，可以通过等号（=）的方式，为当前指令动态绑定参数值：**



​							<img src="/vue/vue2Images/自定义指令3.png" style="zoom:80%;" />



#### 6.通过 binding 获取指令的参数



​			**在声明自定义指令时，可以通过形参中的第二个参数，来接收指令的参数值：**



​						<img src="/vue/vue2Images/自定义指令4.png" style="zoom:80%;" />



####  7.update 函数



​			**bind 函数只调用 1 次：当指令第一次绑定到元素时调用，当 DOM 更新时 bind 函数不会被触发。 update 函 数会在每次 DOM 更新时被调用。示例代码如下：**



​							<img src="/vue/vue2Images/自定义指令5.png" style="zoom:80%;" />





####  		8.函数简写



​					**如果 bind 和update 函数中的逻辑完全相同，则对象格式的自定义指令可以简写成函数格式：**

​		

​								<img src="/vue/vue2Images/自定义指令6.png" style="zoom:80%;" />



#### 		9.全局自定义指令



​					**全局共享的自定义指令需要通过“Vue.directive()”进行声明，示例代码如下：**



​							<img src="/vue/vue2Images/自定义指令7.png" style="zoom:80%;" />



### 总结



- [ ] **① 能够掌握 keep-alive 元素的基本使用 ⚫  标签、include 属性**
- [ ] **② 能够掌握插槽的基本用 ⚫  标签、具名插槽、作用域插槽、后备内容**
- [ ] **③ 能够知道如何自定义指令 **
- [ ] **⚫ 私有自定义指令 directives: { } **
- [ ] **⚫ 全局自定义指令 Vue.directive()**



