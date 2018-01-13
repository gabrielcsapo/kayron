const { encode, decode } = require('./util.js');

// reserved keywords in javascript
const keywords = [
  'const',
  'let',
  'var',
  'function',
  'if',
  'else',
  'for',
  'while',
  'break',
  'switch',
  'case',
  'do',
  'new',
  'continue',
  'delete',
  'return',
  'this',
  'true',
  'false',
  'throw',
  'catch',
  'typeof',
];

// Syntax definition
// The key becomes the class name of the <span>
// around the matched block of code.
const syntax = {
  'string': /("[^"]*"|'[^']+'|`[^`]+`)/g,
  'comment': /(\/\*.*?\*\/|\/\/.*)/g,
  'class': /\b([A-Z][a-z]+)\b/g,
  'number': /\b([0-9]+(?:\.[0-9]+)?)\b/g,
  'keyword': new(RegExp)('\\b(' + keywords.join('|') + ')\\b', 'g'),
  'function': /([\w+]*)\(.*\);?/g,
  'operator': /([+|=|-||])/g
};

module.exports = function kayron(code) {
  Object.keys(syntax).forEach((s) => {
    code = code.replace(syntax[s], (_, m) => {
      // ensure if the regex only matches part of the string that we keep the leftover
      let leftOver = _.replace(m, '');
      // encode the string and class
      return `{#${s}#${encode(m)}#}${leftOver}`;
    });
  });

  return code.replace(/\{#([a-z]+)#(.*?)#\}/g, (_, name, value) => '<span class="' + name + '">' + decode(value) + '</span>');
};
