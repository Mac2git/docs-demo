---
layout: home

hero:
  name: "MeAlert的知识区"
  text: "温故而知新,可以为师矣"
  tagline: If a man keeps cherishing his old knowledge, so as continually to be acquiring new, he may be a teacher of others.
  image:
    src: /webImage/background1.png
    alt: 背景图片
  actions:
    - theme: brand
      text: Markdown 示例
      link: /markdown-examples
    - theme: alt
      text: API 示例
      link: /api-examples

features:
  - title: 💡 每日小tips
    details: 梦想，就是做梦在想
  - title: ✊ 加油吧，未来路还很漫长
    details: 不要把自己太当回事，也别不把自己太不当回事
  - title: 🤔 想一想
    details: 没有一个冬天不可逾越，没有一个春天不会来临
---

<div id="canvas-nest"></div>
<script setup>
import { ref,onMounted, watch } from 'vue';
import CanvasNest from 'canvas-nest.js';
onMounted(() => {
  const config = {
    color: "0,0,0",
    opacity: 0.5,
    zIndex: 1,
    count: 99,        
  };
  const canvasNest = new CanvasNest(document.getElementById('canvas-nest'), config);
  console.log(3333)
});

</script>
 
<style>
#canvas-nest {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
}
</style>