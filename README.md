# krayon

> 🖍 make javascript colorful

## Installation

```
npm install krayon --save
```

## Usage

> Since there is a html component to this library it is import to include `krayon/dist/krayon.css`

```js
require('krayon/dist/krayon.css');

const krayon = require('krayon');

// This will colorize your javascript and output an HTML string
krayon(`
  // this is a cool library check it out
  let table = new Turtler([
    ["uid", "name"],
    ["1", "Doe"],
    ["2", "Hemma"]
  ], {
    hasHeader: true,
    columnSeperator: ' | ',
    headerSeperator: '='
  });

  console.log(table);
`);
```
