# 0.0.4 (01/13/2018)

- fixes bug where zero width strings that were either denoted using back tick or apostrophe
- parses nested functions and colorizes those
  - an example of a nested function would be `t.pipe(d.pipe(b.pipe()));`
- adds console as a keyword
- adds process as a keyword
- adds ! as an operator
- adds < as an operator
- adds > as an operator
- adds % as an operator
- adds * as an operator
- adds ~ as an operator

# 0.0.3 (01/12/2018)

- string should be interpreted first as to deal with nested entities

# 0.0.2 (01/12/2018)

- ensures that template strings are interpreted as strings.

# 0.0.1 (01/12/2018)

- basic features working
