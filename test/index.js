const test = require('tape')
const krayon = require('../')

test('@krayon', (t) => {
  t.test('should be able to parse comments', (t) => {
    t.plan(1)

    t.equal(krayon(`// hello world`), '<span class="comment">// hello world</span>')
  })

  t.test('should be able to parse keywords', (t) => {
    t.plan(1)

    const parsed = krayon(`
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
      <span class="keyword">const</span>
      <span class="keyword">console</span>
      <span class="keyword">process</span>
      <span class="keyword">let</span>
      <span class="keyword">var</span>
      <span class="keyword">function</span>
      <span class="keyword">if</span>
      <span class="keyword">else</span>
      <span class="keyword">for</span>
      <span class="keyword">while</span>
      <span class="keyword">break</span>
      <span class="keyword">switch</span>
      <span class="keyword">case</span>
      <span class="keyword">do</span>
      <span class="keyword">new</span>
      <span class="keyword">continue</span>
      <span class="keyword">delete</span>
      <span class="keyword">return</span>
      <span class="keyword">this</span>
      <span class="keyword">true</span>
      <span class="keyword">false</span>
      <span class="keyword">throw</span>
      <span class="keyword">catch</span>
      <span class="keyword">typeof</span>
    `)
  })

  t.test('should be able to parse functions in different respects', (t) => {
    t.plan(1)
    const parsed = krayon(`
      var Turtler = require('turtler');
      var table = new Turtler([
        ["uid", "name"],
        ["1", "Doe"],
        ["2", "Hemma"]
      ]);
      table.toString();
    `)
    t.equal(parsed, `
      <span class="keyword">var</span> <span class="class">Turtler</span> <span class="operator">=</span> <span class="function">require</span>(<span class="string">'turtler'</span>);
      <span class="keyword">var</span> table <span class="operator">=</span> <span class="keyword">new</span> <span class="class">Turtler</span>([
        [<span class="string">"uid"</span>, <span class="string">"name"</span>],
        [<span class="string">"1"</span>, <span class="string">"Doe"</span>],
        [<span class="string">"2"</span>, <span class="string">"Hemma"</span>]
      ]);
      table.<span class="function">toString</span>();
    `)
  })

  t.test('should be able to parse operators', (t) => {
    t.plan(1)
    const parsed = krayon(`
      const t = 'hi';
      let b = 'hi';
      b += 'hiii';
      var d = 'asdf';
      b -= 'hiii';
      let s = b || d;
      let f = !b || d;
      let e = !b <> s;
      let g = %(d / b) * ~(t / b);
    `)
    t.equal(parsed, `
      <span class="keyword">const</span> t <span class="operator">=</span> <span class="string">'hi'</span>;
      <span class="keyword">let</span> b <span class="operator">=</span> <span class="string">'hi'</span>;
      b <span class="operator">+</span><span class="operator">=</span> <span class="string">'hiii'</span>;
      <span class="keyword">var</span> d <span class="operator">=</span> <span class="string">'asdf'</span>;
      b -<span class="operator">=</span> <span class="string">'hiii'</span>;
      <span class="keyword">let</span> s <span class="operator">=</span> b <span class="operator">|</span><span class="operator">|</span> d;
      <span class="keyword">let</span> f <span class="operator">=</span> <span class="operator">!</span>b <span class="operator">|</span><span class="operator">|</span> d;
      <span class="keyword">let</span> e <span class="operator">=</span> <span class="operator">!</span>b <span class="operator"><</span><span class="operator">></span> s;
      <span class="keyword">let</span> g <span class="operator">=</span> <span class="operator">%</span>(d / b) <span class="operator">*</span> <span class="operator">~</span>(t / b);
    `)
  })

  t.test('should be able to parse multiline string that contains valid javascript', (t) => {
    t.plan(1)

    const parsed = krayon(`
      var Krayon = require('krayon');

      console.html(Krayon(\`
        // this is a cool library check it out
        var Turtler = require('turtler');
        var table = new Turtler([
          ["uid", "name"],
          ["1", "Doe"],
          ["2", "Hemma"]
        ]);
        table.markdown();
      \`));
    `)

    t.deepEqual(parsed, `
      <span class="keyword">var</span> <span class="class">Krayon</span> <span class="operator">=</span> <span class="function">require</span>(<span class="string">'krayon'</span>);

      <span class="keyword">console</span>.<span class="function">html</span>(<span class="class">Krayon</span>(<span class="string">\`
        // this is a cool library check it out
        var Turtler = require('turtler');
        var table = new Turtler([
          ["uid", "name"],
          ["1", "Doe"],
          ["2", "Hemma"]
        ]);
        table.markdown();
      \`</span>));
    `)
  })

  t.test('should be able to parse zero width strings', (t) => {
    t.plan(3)

    t.equal(krayon(`''`), '<span class="string">\'\'</span>')
    t.equal(krayon(`""`), '<span class="string">""</span>')
    t.equal(krayon('``'), '<span class="string">``</span>')
  })

  t.test('should be able to parse sub entities', (t) => {
    t.plan(1)

    const parsed = krayon(`
      t.pipe(d.pipe(b.pipe()));
    `)
    t.equal(parsed, `
      t.<span class="function">pipe</span>(d.<span class="function">pipe</span>(b.<span class="function">pipe</span>()));
    `)
  })
})
