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
