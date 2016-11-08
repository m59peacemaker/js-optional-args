# optional-args

Wraps a function whose last argument is preceded by optional arguments so that when fewer arguments are passed in, missing optional arguments are filled in as `undefined`.

The is useful for functions that have an API such as `(input, options, cb)`, but the function allows `options` to be omitted so that it can be called as `(input, cb)`. Rather than having code that examines the arguments to make some optional, just wrap the function with `optionalArgs()` and it will just work.

Fun fact: `optional-args` [calls itself](https://github.com/m59peacemaker/js-optional-args/blob/master/index.js#L14) to make its `argCount` parameter optional. Code is neat.

## install

```sh
npm install optional-args
```

## example

```js
const optionalArgs = require('optional-args')

const myFn = optionalArgs((foo, options, cb) => {})
myFn(123, function() {}) //  foo -> 123, options -> undefined, cb -> function
myFn(function() {}) // foo -> undefined, options -> undefined, cb -> function

// with default parameters, specify argument count
const myFn = optionalArgs(3, (foo, options = {}, cb) => {})
```

## API

### optionalArg([argCount], fn)

- `argCount: number, fn.length` the total number of arguments `fn` accepts. Required for functions that use default parameters since `fn.length` only counts up to the first default parameter.
- `fn: function` the function to be wrapped so that it has optional arguments
- **returns**: `function`
