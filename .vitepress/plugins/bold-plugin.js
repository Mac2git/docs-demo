// vitepress/plugins/bold-plugin.js
module.exports = (md) => {
  md.core.ruler.push('bold', state => {
    state.tokens.forEach((token, i) => {
      if (token.type === 'text' && token.content.startsWith('==') && token.content.endsWith('==')) {
        token.tag = 'strong';
        token.attrs = [['class', 'bold-text']];
        token.content = token.content.slice(2, token.content.length - 2);
      }
    });
  });
};