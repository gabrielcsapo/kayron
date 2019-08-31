const chalk = require('chalk')
const { decode, parse, objectToStyleString } = require('./util.js')

const defaultTheme = {
  'string': {
    color: '#032f62'
  },
  'keyword': {
    color: '#d73a49'
  },
  'operator': {
    color: '#d73a49'
  },
  'function': {
    color: '#005cc5'
  },
  'class': {
    color: '#6f42c1'
  },
  'comment': {
    color: '#6a737d'
  }
}

chalk.enabled = true
chalk.level = 2

/**
 * colorize javascript string
 * @param  {String} code                    - raw javascript string
 * @param  {String} options.output          - the output wanted (html, ascii)
 * @param  {Object} options.theme           - the theme object, containing particular css values for each type
 * @return {String}                         - the html or ascii string containing the colorized javascript
 */
module.exports = function kayron (code, options = {}) {
  const { theme, output } = Object.assign({
    output: 'html',
    theme: defaultTheme
  }, options)
  // we want to decode all the entities and walk the string to convert them to html entities
  return parse(code).replace(/\{#([a-z]+)#(.*?)#\}/g, (_, name, value) => {
    let decoded = decode(value)

    if (decoded !== '\x00') {
      switch (output) {
        case 'html':
          return `<span class="${name}" style=${objectToStyleString(theme[name])}>${decoded}</span>`
        case 'ascii':
          return chalk.hex(theme[name].color)(decoded)
        default:
          return value
      }
    }

    return ''
  })
}
