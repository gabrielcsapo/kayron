const test = require('tape');
const { encode, decode, parse } = require('../util.js');

test('@kayron util', (t) => {

  t.test('encode', (t) => {
    t.equal(encode('boo'), '⡢ ⡯ ⡯');
    t.end();
  });

  t.test('decode', (t) => {
    t.equal(decode('⡢ ⡯ ⡯'), 'boo');
    t.end();
  });

  t.test('encode', (t) => {
    let parsed = parse(`
      const
      console
      process
      let
      var
      function
      if
      else
      for
      while
      break
      switch
      case
      do
      new
      continue
      delete
      return
      this
      true
      false
      throw
      catch
      typeof
    `);
    t.equal(parsed, `
      {#keyword#⡣ ⡯ ⡮ ⡳ ⡴#}
      {#keyword#⡣ ⡯ ⡮ ⡳ ⡯ ⡬ ⡥#}
      {#keyword#⡰ ⡲ ⡯ ⡣ ⡥ ⡳ ⡳#}
      {#keyword#⡬ ⡥ ⡴#}
      {#keyword#⡶ ⡡ ⡲#}
      {#keyword#⡦ ⡵ ⡮ ⡣ ⡴ ⡩ ⡯ ⡮#}
      {#keyword#⡩ ⡦#}
      {#keyword#⡥ ⡬ ⡳ ⡥#}
      {#keyword#⡦ ⡯ ⡲#}
      {#keyword#⡷ ⡨ ⡩ ⡬ ⡥#}
      {#keyword#⡢ ⡲ ⡥ ⡡ ⡫#}
      {#keyword#⡳ ⡷ ⡩ ⡴ ⡣ ⡨#}
      {#keyword#⡣ ⡡ ⡳ ⡥#}
      {#keyword#⡤ ⡯#}
      {#keyword#⡮ ⡥ ⡷#}
      {#keyword#⡣ ⡯ ⡮ ⡴ ⡩ ⡮ ⡵ ⡥#}
      {#keyword#⡤ ⡥ ⡬ ⡥ ⡴ ⡥#}
      {#keyword#⡲ ⡥ ⡴ ⡵ ⡲ ⡮#}
      {#keyword#⡴ ⡨ ⡩ ⡳#}
      {#keyword#⡴ ⡲ ⡵ ⡥#}
      {#keyword#⡦ ⡡ ⡬ ⡳ ⡥#}
      {#keyword#⡴ ⡨ ⡲ ⡯ ⡷#}
      {#keyword#⡣ ⡡ ⡴ ⡣ ⡨#}
      {#keyword#⡴ ⡹ ⡰ ⡥ ⡯ ⡦#}
    `);
    t.end();
  });

});
