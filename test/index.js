const test = require('tape')
const krayon = require('../')

test('@krayon', (t) => {
  t.test('should be able to parse comments', (t) => {
    t.plan(2)

    t.equal(krayon(`// hello world`), '<span class="comment" style=color:#6a737d>// hello world</span>')
    t.equal(krayon(`// hello world`, { output: 'ascii' }), '\x1b[38;5;102m// hello world\x1b[39m')
  })

  t.test('should be able to parse keywords', (t) => {
    t.plan(2)

    const keywords = `
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
    `

    t.equal(krayon(keywords), `
      <span class="keyword" style=color:#d73a49>const</span>
      <span class="keyword" style=color:#d73a49>console</span>
      <span class="keyword" style=color:#d73a49>process</span>
      <span class="keyword" style=color:#d73a49>let</span>
      <span class="keyword" style=color:#d73a49>var</span>
      <span class="keyword" style=color:#d73a49>function</span>
      <span class="keyword" style=color:#d73a49>if</span>
      <span class="keyword" style=color:#d73a49>else</span>
      <span class="keyword" style=color:#d73a49>for</span>
      <span class="keyword" style=color:#d73a49>while</span>
      <span class="keyword" style=color:#d73a49>break</span>
      <span class="keyword" style=color:#d73a49>switch</span>
      <span class="keyword" style=color:#d73a49>case</span>
      <span class="keyword" style=color:#d73a49>do</span>
      <span class="keyword" style=color:#d73a49>new</span>
      <span class="keyword" style=color:#d73a49>continue</span>
      <span class="keyword" style=color:#d73a49>delete</span>
      <span class="keyword" style=color:#d73a49>return</span>
      <span class="keyword" style=color:#d73a49>this</span>
      <span class="keyword" style=color:#d73a49>true</span>
      <span class="keyword" style=color:#d73a49>false</span>
      <span class="keyword" style=color:#d73a49>throw</span>
      <span class="keyword" style=color:#d73a49>catch</span>
      <span class="keyword" style=color:#d73a49>typeof</span>
    `)

    t.equal(krayon(keywords, { output: 'ascii' }), `
      \x1b[38;5;167mconst\x1b[39m
      \x1b[38;5;167mconsole\x1b[39m
      \x1b[38;5;167mprocess\x1b[39m
      \x1b[38;5;167mlet\x1b[39m
      \x1b[38;5;167mvar\x1b[39m
      \x1b[38;5;167mfunction\x1b[39m
      \x1b[38;5;167mif\x1b[39m
      \x1b[38;5;167melse\x1b[39m
      \x1b[38;5;167mfor\x1b[39m
      \x1b[38;5;167mwhile\x1b[39m
      \x1b[38;5;167mbreak\x1b[39m
      \x1b[38;5;167mswitch\x1b[39m
      \x1b[38;5;167mcase\x1b[39m
      \x1b[38;5;167mdo\x1b[39m
      \x1b[38;5;167mnew\x1b[39m
      \x1b[38;5;167mcontinue\x1b[39m
      \x1b[38;5;167mdelete\x1b[39m
      \x1b[38;5;167mreturn\x1b[39m
      \x1b[38;5;167mthis\x1b[39m
      \x1b[38;5;167mtrue\x1b[39m
      \x1b[38;5;167mfalse\x1b[39m
      \x1b[38;5;167mthrow\x1b[39m
      \x1b[38;5;167mcatch\x1b[39m
      \x1b[38;5;167mtypeof\x1b[39m
    `)
  })

  t.test('should be able to parse functions in different respects', (t) => {
    t.plan(2)

    const testString = `
      var Turtler = require('turtler');
      var table = new Turtler([
        ["uid", "name"],
        ["1", "Doe"],
        ["2", "Hemma"]
      ]);
      table.toString();
    `

    t.equal(krayon(testString), `
      <span class="keyword" style=color:#d73a49>var</span> <span class="class" style=color:#6f42c1>Turtler</span> <span class="operator" style=color:#d73a49>=</span> <span class="function" style=color:#005cc5>require</span>(<span class="string" style=color:#032f62>'turtler'</span>);
      <span class="keyword" style=color:#d73a49>var</span> table <span class="operator" style=color:#d73a49>=</span> <span class="keyword" style=color:#d73a49>new</span> <span class="class" style=color:#6f42c1>Turtler</span>([
        [<span class="string" style=color:#032f62>"uid"</span>, <span class="string" style=color:#032f62>"name"</span>],
        [<span class="string" style=color:#032f62>"1"</span>, <span class="string" style=color:#032f62>"Doe"</span>],
        [<span class="string" style=color:#032f62>"2"</span>, <span class="string" style=color:#032f62>"Hemma"</span>]
      ]);
      table.<span class="function" style=color:#005cc5>toString</span>();
    `)

    t.equal(krayon(testString, { output: 'ascii' }), `
      \x1b[38;5;167mvar\x1b[39m \x1b[38;5;98mTurtler\x1b[39m \x1b[38;5;167m=\x1b[39m \x1b[38;5;32mrequire\x1b[39m(\x1b[38;5;24m'turtler'\x1b[39m);
      \x1b[38;5;167mvar\x1b[39m table \x1b[38;5;167m=\x1b[39m \x1b[38;5;167mnew\x1b[39m \x1b[38;5;98mTurtler\x1b[39m([
        [\x1b[38;5;24m"uid"\x1b[39m, \x1b[38;5;24m"name"\x1b[39m],
        [\x1b[38;5;24m"1"\x1b[39m, \x1b[38;5;24m"Doe"\x1b[39m],
        [\x1b[38;5;24m"2"\x1b[39m, \x1b[38;5;24m"Hemma"\x1b[39m]
      ]);
      table.\x1b[38;5;32mtoString\x1b[39m();
    `)
  })

  t.test('should be able to parse operators', (t) => {
    t.plan(2)

    const testString = `
      const t = 'hi';
      let b = 'hi';
      b += 'hiii';
      var d = 'asdf';
      b -= 'hiii';
      let s = b || d;
      let f = !b || d;
      let e = !b <> s;
      let g = %(d / b) * ~(t / b);
    `

    t.equal(krayon(testString), `
      <span class="keyword" style=color:#d73a49>const</span> t <span class="operator" style=color:#d73a49>=</span> <span class="string" style=color:#032f62>'hi'</span>;
      <span class="keyword" style=color:#d73a49>let</span> b <span class="operator" style=color:#d73a49>=</span> <span class="string" style=color:#032f62>'hi'</span>;
      b <span class="operator" style=color:#d73a49>+</span><span class="operator" style=color:#d73a49>=</span> <span class="string" style=color:#032f62>'hiii'</span>;
      <span class="keyword" style=color:#d73a49>var</span> d <span class="operator" style=color:#d73a49>=</span> <span class="string" style=color:#032f62>'asdf'</span>;
      b -<span class="operator" style=color:#d73a49>=</span> <span class="string" style=color:#032f62>'hiii'</span>;
      <span class="keyword" style=color:#d73a49>let</span> s <span class="operator" style=color:#d73a49>=</span> b <span class="operator" style=color:#d73a49>|</span><span class="operator" style=color:#d73a49>|</span> d;
      <span class="keyword" style=color:#d73a49>let</span> f <span class="operator" style=color:#d73a49>=</span> <span class="operator" style=color:#d73a49>!</span>b <span class="operator" style=color:#d73a49>|</span><span class="operator" style=color:#d73a49>|</span> d;
      <span class="keyword" style=color:#d73a49>let</span> e <span class="operator" style=color:#d73a49>=</span> <span class="operator" style=color:#d73a49>!</span>b <span class="operator" style=color:#d73a49><</span><span class="operator" style=color:#d73a49>></span> s;
      <span class="keyword" style=color:#d73a49>let</span> g <span class="operator" style=color:#d73a49>=</span> <span class="operator" style=color:#d73a49>%</span>(d / b) <span class="operator" style=color:#d73a49>*</span> <span class="operator" style=color:#d73a49>~</span>(t / b);
    `)

    t.equal(krayon(testString, { output: 'ascii' }), `
      \x1b[38;5;167mconst\x1b[39m t \x1b[38;5;167m=\x1b[39m \x1b[38;5;24m'hi'\x1b[39m;
      \x1b[38;5;167mlet\x1b[39m b \x1b[38;5;167m=\x1b[39m \x1b[38;5;24m'hi'\x1b[39m;
      b \x1b[38;5;167m+\x1b[39m\x1b[38;5;167m=\x1b[39m \x1b[38;5;24m'hiii'\x1b[39m;
      \x1b[38;5;167mvar\x1b[39m d \x1b[38;5;167m=\x1b[39m \x1b[38;5;24m'asdf'\x1b[39m;
      b -\x1b[38;5;167m=\x1b[39m \x1b[38;5;24m'hiii'\x1b[39m;
      \x1b[38;5;167mlet\x1b[39m s \x1b[38;5;167m=\x1b[39m b \x1b[38;5;167m|\x1b[39m\x1b[38;5;167m|\x1b[39m d;
      \x1b[38;5;167mlet\x1b[39m f \x1b[38;5;167m=\x1b[39m \x1b[38;5;167m!\x1b[39mb \x1b[38;5;167m|\x1b[39m\x1b[38;5;167m|\x1b[39m d;
      \x1b[38;5;167mlet\x1b[39m e \x1b[38;5;167m=\x1b[39m \x1b[38;5;167m!\x1b[39mb \x1b[38;5;167m<\x1b[39m\x1b[38;5;167m>\x1b[39m s;
      \x1b[38;5;167mlet\x1b[39m g \x1b[38;5;167m=\x1b[39m \x1b[38;5;167m%\x1b[39m(d / b) \x1b[38;5;167m*\x1b[39m \x1b[38;5;167m~\x1b[39m(t / b);
    `)
  })

  t.test('should be able to parse multiline string that contains valid javascript', (t) => {
    t.plan(2)

    const testString = `
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
    `

    t.deepEqual(krayon(testString), `
      <span class="keyword" style=color:#d73a49>var</span> <span class="class" style=color:#6f42c1>Krayon</span> <span class="operator" style=color:#d73a49>=</span> <span class="function" style=color:#005cc5>require</span>(<span class="string" style=color:#032f62>'krayon'</span>);

      <span class="keyword" style=color:#d73a49>console</span>.<span class="function" style=color:#005cc5>html</span>(<span class="class" style=color:#6f42c1>Krayon</span>(<span class="string" style=color:#032f62>\`
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

    t.deepEqual(krayon(testString, { output: 'ascii' }), `
      \x1b[38;5;167mvar\x1b[39m \x1b[38;5;98mKrayon\x1b[39m \x1b[38;5;167m=\x1b[39m \x1b[38;5;32mrequire\x1b[39m(\x1b[38;5;24m'krayon'\x1b[39m);

      \x1b[38;5;167mconsole\x1b[39m.\x1b[38;5;32mhtml\x1b[39m(\x1b[38;5;98mKrayon\x1b[39m(\x1b[38;5;24m\`\x1b[39m
\x1b[38;5;24m        // this is a cool library check it out\x1b[39m
\x1b[38;5;24m        var Turtler = require('turtler');\x1b[39m
\x1b[38;5;24m        var table = new Turtler([\x1b[39m
\x1b[38;5;24m          ["uid", "name"],\x1b[39m
\x1b[38;5;24m          ["1", "Doe"],\x1b[39m
\x1b[38;5;24m          ["2", "Hemma"]\x1b[39m
\x1b[38;5;24m        ]);\x1b[39m
\x1b[38;5;24m        table.markdown();\x1b[39m
\x1b[38;5;24m      \`\x1b[39m));
    `)
  })

  t.test('should be able to parse zero width strings', (t) => {
    t.plan(6)

    t.equal(krayon(`''`), '<span class="string" style=color:#032f62>\'\'</span>')
    t.equal(krayon(`""`), '<span class="string" style=color:#032f62>""</span>')
    t.equal(krayon('``'), '<span class="string" style=color:#032f62>``</span>')

    t.equal(krayon(`''`, { output: 'ascii' }), '\x1b[38;5;24m\'\'\x1b[39m')
    t.equal(krayon(`""`, { output: 'ascii' }), '\x1b[38;5;24m""\x1b[39m')
    t.equal(krayon('``', { output: 'ascii' }), '\x1b[38;5;24m``\x1b[39m')
  })

  t.test('should be able to parse sub entities', (t) => {
    t.plan(2)

    const testString = `
      t.pipe(d.pipe(b.pipe()));
    `

    t.equal(krayon(testString), `
      t.<span class="function" style=color:#005cc5>pipe</span>(d.<span class="function" style=color:#005cc5>pipe</span>(b.<span class="function" style=color:#005cc5>pipe</span>()));
    `)

    t.equal(krayon(testString, { output: 'ascii' }), `
      t.\x1b[38;5;32mpipe\x1b[39m(d.\x1b[38;5;32mpipe\x1b[39m(b.\x1b[38;5;32mpipe\x1b[39m()));
    `)
  })
})
