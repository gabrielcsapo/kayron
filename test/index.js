const test = require('tape');
const kayron = require('../');

test('@kayron', (t) => {

  t.test('should be able to parse comments', (t) => {
    let parsed = kayron(`// hello world`);
    t.equal(parsed, '<span class="comment">// hello world</span>');
    t.end();
  });

  t.test('should be able to parse keywords', (t) => {
    let parsed = kayron(`
      const
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
      <span class="keyword">const</span>
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
    `);
    t.end();
  });

  t.test('should be able to parse functions in different respects', (t) => {
    let parsed = kayron(`
      var Turtler = require('turtler');
      var table = new Turtler([
        ["uid", "name"],
        ["1", "Doe"],
        ["2", "Hemma"]
      ]);
      table.toString();
    `);
    t.equal(parsed, `
      <span class="keyword">var</span> <span class="class">Turtler</span> <span class="operator">=</span> <span class="function">require</span>(<span class="string">'turtler'</span>);
      <span class="keyword">var</span> table <span class="operator">=</span> <span class="keyword">new</span> <span class="class">Turtler</span>([
        [<span class="string">"uid"</span>, <span class="string">"name"</span>],
        [<span class="string">"1"</span>, <span class="string">"Doe"</span>],
        [<span class="string">"2"</span>, <span class="string">"Hemma"</span>]
      ]);
      table.<span class="function">toString</span>();
    `);
    t.end();
  });

  t.test('should be able to parse operators', (t) => {
    let parsed = kayron(`
      const t = 'hi';
      let b = 'hi';
      b += 'hiii';
      var d = 'asdf';
      b -= 'hiii';
      let s = b || d;
    `);
    t.equal(parsed, `
      <span class="keyword">const</span> t <span class="operator">=</span> <span class="string">'hi'</span>;
      <span class="keyword">let</span> b <span class="operator">=</span> <span class="string">'hi'</span>;
      b <span class="operator">+</span><span class="operator">=</span> <span class="string">'hiii'</span>;
      <span class="keyword">var</span> d <span class="operator">=</span> <span class="string">'asdf'</span>;
      b -<span class="operator">=</span> <span class="string">'hiii'</span>;
      <span class="keyword">let</span> s <span class="operator">=</span> b <span class="operator">|</span><span class="operator">|</span> d;
    `);
    t.end();
  });

});
