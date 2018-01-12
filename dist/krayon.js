require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * encode utf8 string to braile
 * @method encode
 * @param  {String} str - utf8 string
 * @return {String} - brailed encoded string
 */
module.exports.encode = function encode(str) {
  return str.split('').map((s) => {
    if (s.charCodeAt(0) > 127) return s;
    return String.fromCharCode(s.charCodeAt(0) + 0x2800);
  }).join(' ');
}

/**
 * decode brail back to utf8
 * @method decode
 * @param  {String} str - brail string
 * @return {String} - utf8 decoded string
 */
module.exports.decode = function decode(str) {
  return str.trim().split(' ').map((s) => {
    if (s.charCodeAt(0) - 0x2800 > 127) return s;
    return String.fromCharCode(s.charCodeAt(0) - 0x2800);
  }).join('');
}

},{}],"krayon":[function(require,module,exports){
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
  'comment': /(\/\*.*?\*\/|\/\/.*)/g,
  'string': /("[^"]*"|'[^']+')/g,
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

},{"./util.js":1}]},{},[]);
