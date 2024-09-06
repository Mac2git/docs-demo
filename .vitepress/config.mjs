import { defineConfig } from 'vitepress';
import { set_sidebar } from "../.vitepress/utils/auto_sidebar.mjs";

//https://www.cnblogs.com/justrico/p/11440164.html
export default defineConfig({
  base:"/docs-demo/",
  mermaidPlugin: {
    class: "mermaid my-class", // set additional css classes for parent container
  },
  //配置图标
  head: [
    ["link", { rel: "icon", href: "./webImage/logo.svg" }],
    // 添加 canvas-nest.js 到你的头部信息
    ['script',{ src:'./webjs/anime.min.js' }],
    ['script',{ src:'./webjs/fireworks.js' }]
  ],
  title: "MeAlert的笔记网站",//标题
  description: "记录学习日常",
  lang: 'en-US',
  markdown:{
    lazyLoading:true,
    math:true,
    lineNumbers: true
  },
  themeConfig: {
    //网页配置目录
    outlineTitle:"目录",
    outline:[2,6],
    logo:'./webImage/alert.png',
    //导航栏
    nav: [ 
      { text: '主页', 
        link: '/'
      },
      { text: '前端', items:[
        {
          link:'/doc-text/bootstrap/bootstrap01',
          text:"BootStrap",
          activeMatch:'/doc-text/bootstrap/bootstrap01' 
        },
        {
          text:"vue",
          link:'/doc-text/vue/vue201',
          activeMatch:'/doc-text/vue/vue201'
        },
        {
          text:"uniapp",
          link:'/doc-text/uniapp/uniapp01',
          activeMatch:'/doc-text/uniapp/uniapp01'
        }]
      },{
        link:'/doc-text/emu/emu01',
        text:"汇编",
        activeMatch:'/doc-text/emu/emu01'
      },{
        link:'/doc-text/wx/wx01',
        text:"微信小程序",
        activeMatch:'/doc-text/wx/wx01'
      },
      {
        text:'编译原理',
        link:'/doc-text/compile/编译原理01'
      },
      {
        text:'Android',
        link:'/doc-text/android/android01',
        activeMatch:'/doc-text/android/android01'
      },
      {
        text:'Python',
        link:'/doc-text/python/开始学习Python'
      },
      { 
        text: '关于我',
        link: '/about',
        activeMatch:'/about'
       }
    ],
    //上一页，下一页
    docFooter: { 
      prev: '上一文', 
      next: '下一文' 
    },
    //自定义编译链接
    editLink: {
      pattern: "https://github.com/Mac2git/docs-demo",
      text: "Github编辑此页",
    },
   
    //sidebar:false,//是否关闭侧边栏
    aside:'right',//设置右侧边栏在左侧显示
    //更新显示时间
    lastUpdated: true,
    lastUpdatedText: "最后更新",
    // sidebar:{
    //   "/doc-text/bootstrap/bootstrap":set_sidebar("/doc-text/bootstrap")
    // },
    //侧边栏
    sidebar:[
      {
        text:'BootStrap',
        collapsed: true,
        items:[
          {
            text:"媒体查询(@media)",link:"/doc-text/bootstrap/bootstrap01"
          },{
            text:"布局容器",link:"/doc-text/bootstrap/bootstrap02"
          },{
            text:"栅格系统的使用",link:"/doc-text/bootstrap/bootstrap03"
          }
        ]
      },{
        text:'Vue',
        collapsed:true,
        items:[
          {
            text:'Vue 作者',link:'/doc-text/vue/vue201'
          },
          {
            text:'MVVM',link:'/doc-text/vue/vue202'
          },
          {
            text:'结论',link:'/doc-text/vue/vue203'
          },
          {
            text:'Vue 版本',link:'/doc-text/vue/vue204'
          },
          {
            text:'Vue 的基本使用',link:'/doc-text/vue/vue205'
          },
          {
            text:'Vue 的指令与过滤器',link:'/doc-text/vue/vue206'
          },
          {
            text:'侦听器',link:'/doc-text/vue/vue207'
          },
          {
            text:'前面的复习总结思维导图',link:'/doc-text/vue/vue208'
          }
        ]
      },
      {
        text:'微信小程序',
        collapsed: true,
        items:[
          {
            text:'1.小程序代码的构成',link:'/doc-text/wx/wx01'
          },
          {
            text:'2. 小程序页面的组成部分',link:'/doc-text/wx/wx02'
          },
          {
            text:'json文件中的window属性',link:'/doc-text/wx/wx03'
          },
          {
            text:'3. WXML、WXSS、js逻辑交互',link:'/doc-text/wx/wx04'
          },
          {
            text:'4.小程序的宿主环境',link:'/doc-text/wx/wx05'
          },
          {
            text:'5.小程序的宿主环境 - 通信模型',link:'/doc-text/wx/wx06'
          },
          {
            text:'6.小程序的宿主环境 - 运行机制',link:'/doc-text/wx/wx07'
          },
          {
            text:'7. 小程序的宿主环境 - 组件',link:'/doc-text/wx/wx08'
          },
          {
            text:'8. 小程序的宿主环境 - API',link:'/doc-text/wx/wx09'
          },
          {
            text:'9.协同工作和发布',link:'/doc-text/wx/wx10'
          },
          {
            text:'10.协同工作和发布 - 小程序成员管理',link:'/doc-text/wx/wx11'
          },
          {
            text:'11. 协同工作和发布 - 小程序的版本',link:'/doc-text/wx/wx12'
          },
          {
            text:'12. 协同工作和发布 - 发布上线',link:'/doc-text/wx/wx13'
          },
          {
            text:'13. 协同工作和发布 - 运营数据',link:'/doc-text/wx/wx14'
          },
          {
            text:'14. WXML模板语法',link:'/doc-text/wx/wx15'
          },
          {
            text:'15. WXSS 模板样式',link:'/doc-text/wx/wx16'
          },
          {
            text:'16. WXSS 模板样式 - rpx',link:'/doc-text/wx/wx17'
          },
          {
            text:'17.WXSS 模板样式 - 样式导入',link:'/doc-text/wx/wx18'
          },
          {
            text:'18.WXSS 模板样式 - 全局样式和局部样式',link:'/doc-text/wx/wx19'
          },
          {
            text:'19.全局配置',link:'/doc-text/wx/wx20'
          },
          {
            text:'20. 页面配置',link:'/doc-text/wx/wx21'
          },
          {
            text:'21.网络数据请求',link:'/doc-text/wx/wx22'
          },
          {
            text:'22.页面导航',link:'/doc-text/wx/wx23'
          },
          {
            text:'23.生命周期',link:'/doc-text/wx/wx24'
          },
          {
            text:'24.WXS 脚本 ',link:'/doc-text/wx/wx25'
          },
          {
            text:'25. 自定义组件-组件的创建与引用',link:'/doc-text/wx/wx26'
          },
          {
            text:'26. 使用 npm 包',link:'/doc-text/wx/wx27'
          },
          {
            text:'27. 分包',link:'/doc-text/wx/wx28'
          }
        ]
      },
      {
        text:'汇编',
        collapsed: true,
        items:[
          {
            text:'运算基础',link:'/doc-text/emu/emu01'
          },
          {
            text:'流水线技术',link:'/doc-text/emu/emu02'
          },
          {
            text:'寻址方式和指令系统',link:'/doc-text/emu/emu03'
          },
          {
            text:'宏汇编语言的基本语法',link:'/doc-text/emu/emu04'
          },{
            text:'伪指令和宏指令',link:'/doc-text/emu/emu05'
          },
          {
            text:'汇编语言程序的结构',link:'/doc-text/emu/emu06'
          },
          {
            text:'存储器',link:'/doc-text/emu/emu07'
          },
          {
            text:'SRAM-6264(静态RAM) 和DRAM(动态RAM2164)',link:'/doc-text/emu/emu08'
          },
          {
            text:'存储器地址分配及译码',link:'/doc-text/emu/emu09'
          },
          {
            text:'IO',link:'/doc-text/emu/emu10'
          },
          {
            text:'中断(CPU被动模式)',link:'/doc-text/emu/emu11'
          },
          {
            text:'8086/8088的中断系统 ',link:'/doc-text/emu/emu12'
          },
          {
            text:'8259A可编程中断控制器',link:'/doc-text/emu/emu13'
          },
          {
            text:'8255并行通信和并行接口芯片 ',link:'/doc-text/emu/emu14'
          },
          {
            text:'8253可编程定时/计数器',link:'/doc-text/emu/emu15'
          },
          {
            text:'16位乘法表',link:'/doc-text/emu/emu16'
          }
        ]
      },
      {
        text:'VitePress',
        collapsed: true,
        items:[
          {
            text:'1.VitePress是什么？',link:'/doc-text/vitepress/vitepress01'
          },
          {
            text:'2.性能',link:'/doc-text/vitepress/vitepress02'
          },
          {
            text:'3.安装？',link:'/doc-text/vitepress/vitepress03'
          },
          {
            text:'4.目录结构',link:'/doc-text/vitepress/vitepress04'
          },
          {
            text:'5.静态资源目录？',link:'/doc-text/vitepress/vitepress05'
          },
          {
            text:'6.config文件配置',link:'/doc-text/vitepress/vitepress06'
          },
          {
            text:'7.配置页脚',link:'/doc-text/vitepress/vitepress07'
          },
          {
            text:'8.提交并部署到 git pages',link:'/doc-text/vitepress/vitepress08'
          },
          {
            text:'9.开启GithubActions并配置deploy',link:'/doc-text/vitepress/vitepress09'
          }
        ]
      },{
        text:'uniapp',
        collapsed:true,
        items:[{
          text:'uniapp介绍',link:'/doc-text/uniapp/uniapp01'
        },{
          text:'全局配置和页面配置',link:'/doc-text/uniapp/uniapp02'
        },{
          text:'组件的基本使用',link:'/doc-text/uniapp/uniapp03'
        }]
      },{
        text:'Android',
        collapsed:true,
        items:[{
          text:'Android系统介绍',link:'/doc-text/android/android01'
        },{
          text:'开发环境搭建',link:'/doc-text/android/android02'
        },{
          text:'了解 Android Studio 界面',link:'/doc-text/android/android03'
        },{
          text:'Android App开发基础',link:'/doc-text/android/android04'
        },{
          text:'App的开发语言',link:'/doc-text/android/android05'
        },{
          text:'App连接的数据库',link:'/doc-text/android/android06'
        },{
          text:'App的工程结构',link:'/doc-text/android/android07'
        },{
          text:'App的设计规范',link:'/doc-text/android/android08'
        },{
          text:'App的活动页面',link:'/doc-text/android/android09'
        },{
          text:'简单控件',link:'/doc-text/android/android10'
        },{
          text:'活动Activity',link:'/doc-text/android/android11'
        },{
          text:'中级控件',link:'/doc-text/android/android12'
        },{
          text:'数据存储',link:'/doc-text/android/android13'
        },{
          text:'第7章　内容共享',link:'/doc-text/android/android14'
        },{
          text:'第8章　高级控件',link:'/doc-text/android/android15'
        },{
          text:'第9章　广播组件Broadcast',link:'/doc-text/android/android16'
        },{
          text:'第10章　自定义控件',link:'/doc-text/android/android17'
        }]
      },{
        text:'编译原理',
        collapsed:true,
        items:[{
          text:'第一章引论',
          link:'/doc-text/compile/编译原理01'
        },{
          text:'第二章文法和语言',
          link:'/doc-text/compile/编译原理02'
        },{
          text:'练习题答案',
          link:'/doc-text/compile/练习题答案'
        }]
      },{
        text:'Python',
        collapsed:true,
        items:[{
          text:'开始学习Python',
          link:'/doc-text/python/开始学习Python'
        },{
          text:'数据类型和运算符',
          link:'/doc-text/python/数据类型和运算符'
        }]
      },{
        text:'杂七杂八',
        collapsed:true,
        items:[{
          text:'CSS之包含块',
          link:'/doc-text/interview/你不知道的 CSS 之包含块'
        },{
          text:'前端面试题',
          link:'/doc-text/interview/前端面试题'
        },{
          text:'事件循环',
          link:'/doc-text/interview/事件循环'
        },{
          text:'CSS 属性计算过程',
          link:'/doc-text/interview/CSS 属性计算过程'
        }]  
      }
    ],
    // 个人图标
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Mac2git?tab=repositories' },
      { 
        icon:{
          svg:'<svg t="1721989539361" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5025" width="256" height="256"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="#C71D23" p-id="5026"></path></svg>'
        }, 
        link:'https://gitee.com/wx_00ba6ce280'},
    ],
    //页尾
    footer:{
      copyright:"Copyright © Albert MeAlert"
    },
    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            }, 
          },
        },
      }
    }
  }
})
