const test = require('tape')
const { encode, decode, parse, objectToStyleString } = require('../util.js')

test('@util', (t) => {
  t.test('encode', (t) => {
    t.plan(1)

    t.equal(encode('boo'), '⡢ ⡯ ⡯')
  })

  t.test('decode', (t) => {
    t.plan(1)

    t.equal(decode('⡢ ⡯ ⡯'), 'boo')
  })

  t.test('@objectToStyleString', (t) => {
    t.plan(1);

    t.equal(objectToStyleString({ color: 'blue', 'font-size': '19px'}), 'color:bluefont-size:19px')
  })

  t.test('encode', (t) => {
    t.plan(1)

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
    `)
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
    `)
  })
})
