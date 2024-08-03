const md = require('markdown-it');
const anchor = require('markdown-it-anchor');
module.exports = {
  markdown: {
    config(md) {
      md.use(anchor, {
        level: 2,
        slugify: s => s.toLowerCase().replace(/ /g, '-'),
        permalink: true,
        permalinkBefore: true
      });
    }
  }
}