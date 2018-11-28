require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// reserved keywords in javascript
const keywords = [
  'const',
  'console',
  'process',
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
  'typeof'
]

// Syntax definition
// The key becomes the class name of the <span>
// around the matched block of code.
const syntax = {
  'string': /("[^"]*"|'[^']*'|`[^`]*`)/g,
  'comment': /(\/\*.*?\*\/|\/\/.*)/g,
  'class': /\b([A-Z][a-z]+)\b/g,
  'number': /\b([0-9]+(?:\.[0-9]+)?)\b/g,
  'keyword': new (RegExp)('\\b(' + keywords.join('|') + ')\\b', 'g'),
  'function': /([\w+]*)\(.*\);?/g,
  'operator': /([+|=|-|||!|<|>|%|*|~])/g
}

/**
 * walks through the syntaxes that we have and tokenizes the entities that correspond
 * @method parse
 * @param  {String} code - raw code string
 * @return {String} - encoded code string
 */
function parse (code) {
  Object.keys(syntax).forEach((s) => {
    code = code.replace(syntax[s], (_, m) => {
      // ensure if the regex only matches part of the string that we keep the leftover
      let leftOver = _.replace(m, '')
      // encode the string and class
      let parsed = `{#${s}#${encode(m)}#}`

      if (s === 'function' && leftOver) {
        // we want to parse sub commands and the easiest way to do that is to
        // run over the leftOver portion of the function call with the same regex
        let startingParenthesis = leftOver.indexOf('(')
        let endingParenthesis = leftOver.lastIndexOf(')')
        let endingComma = leftOver.lastIndexOf(';')

        // since we don't want to create a new string for every operation
        // we can simply walk the string and replace the character that needs it
        let subFunction = leftOver.replace(/./g, (c, i) => {
          // we can define a waterfall case that only replaces the three positions with nothing
          // leaving the other characters in their place
          switch (i) {
            case startingParenthesis:
            case endingParenthesis:
            case endingComma:
              return ''
            default:
              return c
          }
        })
        leftOver = `(${parse(subFunction)})${endingComma > -1 ? ';' : ''}`
      }
      return parsed + leftOver
    })
  })
  return code
}

/**
 * encode utf8 string to braile
 * @method encode
 * @param  {String} str - utf8 string
 * @return {String} - brailed encoded string
 */
function encode (str) {
  return str.split('').map((s) => {
    if (s.charCodeAt(0) > 127) return s
    return String.fromCharCode(s.charCodeAt(0) + 0x2800)
  }).join(' ')
};

/**
 * decode brail back to utf8
 * @method decode
 * @param  {String} str - brail string
 * @return {String} - utf8 decoded string
 */
function decode (str) {
  return str.trim().split(' ').map((s) => {
    if (s.charCodeAt(0) - 0x2800 > 127) return s
    return String.fromCharCode(s.charCodeAt(0) - 0x2800)
  }).join('')
}

module.exports = {
  decode,
  encode,
  parse
}

},{}],"krayon":[function(require,module,exports){
const { decode, parse } = require('./util.js')

module.exports = function kayron (code) {
  // we want to decode all the entities and walk the string to convert them to html entities
  return parse(code).replace(/\{#([a-z]+)#(.*?)#\}/g, (_, name, value) => {
    let decoded = decode(value)
    // only return a span if the value is not blank
    if (decoded !== '\x00') return `<span class="${name}">${decoded}</span>`
    return ''
  })
}

},{"./util.js":1}]},{},[]);
