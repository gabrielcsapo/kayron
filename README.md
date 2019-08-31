# krayon

> 🖍 make javascript colorful

[![Npm Version](https://img.shields.io/npm/v/krayon.svg)](https://www.npmjs.com/package/krayon)
[![Build Status](https://travis-ci.org/gabrielcsapo/krayon.svg?branch=master)](https://travis-ci.org/gabrielcsapo/krayon)
[![Coverage Status](https://lcov-server.gabrielcsapo.com/badge/github%2Ecom/gabrielcsapo/krayon.svg)](https://lcov-server.gabrielcsapo.com/coverage/github%2Ecom/gabrielcsapo/krayon)
[![Dependency Status](https://starbuck.gabrielcsapo.com/badge/github/gabrielcsapo/krayon/status.svg)](https://starbuck.gabrielcsapo.com/github/gabrielcsapo/krayon)
[![devDependency Status](https://starbuck.gabrielcsapo.com/badge/github/gabrielcsapo/krayon/dev-status.svg)](https://starbuck.gabrielcsapo.com/github/gabrielcsapo/krayon#info=devDependencies)
[![npm](https://img.shields.io/npm/dt/krayon.svg)]()
[![npm](https://img.shields.io/npm/dm/krayon.svg)]()

## Installation

```
npm install krayon --save
```

## Usage

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
