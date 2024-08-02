import { defineConfig } from 'vitepress'
import { set_sidebar } from "../.vitepress/utils/auto_sidebar.mjs";
// import { fireworks } from '../public/webjs/fireworks.js'
// import { anime } from '../public/webjs/anime.min.js'
// import plugin from 'markdown-it-mathjax3';
export default defineConfig({
  base:"/docs-demo/",
  mermaidPlugin: {
    class: "mermaid my-class", // set additional css classes for parent container
  },
  //配置图标
  head: [
    ["link", { rel: "icon", href: "./public/webImage/logo.svg" }],
    // 添加 canvas-nest.js 到你的头部信息
    ['script', { src: './public/webjs/canvas-nest.js' }]
  ],
  title: "MeAlert的笔记网站",//标题
  description: "记录学习日常",
  lang: 'en-US',
  markdown:{
    //图片懒加载
    image:{
      lazyLoading:true
    },
    math:true,
    lineNumbers: true
  },
  themeConfig: {
    //网页配置目录
    outlineTitle:"目录",
    outline:[2,6],
    logo:'./public/webImage/alert.png',
    //导航栏
    nav: [ 
      { text: '主页', 
        link: '/'
      },
      { text: '前端', items:[
        {
          link:'/doc-text/bootstrap/bootstrap',
          text:"BootStrap",
          activeMatch:'/doc-text/bootstrap/bootstrap' 
        },
        {
          text:"vue",
          link:'/doc-text/vue/vue2',
          activeMatch:'/doc-text/vue/vue2'
        },
        {
          text:"uniapp",
          link:'/doc-text/uniapp/uniapp基础知识',
          activeMatch:'/doc-text/uniapp/uniapp基础知识'
        }]
      },{
        link:'/doc-text/emu/emu',
        text:"汇编",
        activeMatch:'/doc-text/emu/emu'
      },{
        link:'/doc-text/wx/wx',
        text:"微信小程序",
        activeMatch:'/doc-text/wx/wx'
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
        text:'前端',
        collapsed: false,
        items:[
          {
            text:"bootStrap",link:"/doc-text/bootstrap/bootstrap"
          },
          {
            text:'Vue',link:'/doc-text/vue/vue2'
          }
        ]
      },
      {
        text:'微信小程序',
        collapsed: false,
        items:[
          {text:'微信小程序',link:'/doc-text/wx/wx'}
        ]
      },
      {
        text:'汇编',
        collapsed: false,
        items:[
          {text:'emu8086',link:'/doc-text/emu/emu'}
        ]
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
