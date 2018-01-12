const test = require('tape');
const { encode, decode } = require('../util.js');

test('@kayron util', (t) => {

  t.test('encode', (t) => {
    t.equal(encode('boo'), '⡢ ⡯ ⡯');
    t.end();
  });

  t.test('decode', (t) => {
    t.equal(decode('⡢ ⡯ ⡯'), 'boo');
    t.end();
  });

});
