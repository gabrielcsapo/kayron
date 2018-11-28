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
