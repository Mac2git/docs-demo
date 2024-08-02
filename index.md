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
<script>
import "./public/webjs/canvas-nest.js";

export default {
  extendsMarkdown: (md) => {
    md.use(require("markdown-it-vue").default, {
      components: {
        "canvas-nest": {
          mounted() {
            const cnv = document.createElement("canvas");
            cnv.className = "cnv";
            document.body.appendChild(cnv);
            new CanvasNest(cnv, {
              color: "rgba(255,255,255,0.5)",
              pointColor: "rgba(255,255,255,0.5)",
              lineColor: "rgba(255,255,255,0.5)",
              count: 300,
            });
          },
        },
      },
    });
  }
};
</script>