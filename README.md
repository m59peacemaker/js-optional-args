# optional-args

Wraps a function whose last argument is preceded by optional arguments so that when fewer arguments are passed in, missing optional arguments are filled in as `undefined`.

The is useful for functions that have an API such as `(input, options, cb)`, but the function allows `options` to be omitted so that it can be called as `(input, cb)`. Rather than having code that examines the arguments to make some optional, just wrap the function with `optionalArgs()` and it will just work.

## install

```sh
npm install optional-args
```

## example

```js
const optionalArgs = require('optional-args')

// 1 optional argument, 3 total arguments
const myFn = optionalArgs(1, 3, (input, options, cb) => {})

myFn(123, () => {}) // input -> 123, options -> undefined, cb -> function
myFn(123)           // input -> 123, options -> undefined, cb -> undefined
```

## API

### optionalArgs(optionalArgCount, argCount, fn)

- `optionalArgCount: number` the number of arguments that are optional
- `argCount: number` the total number of arguments `fn` accepts
- `fn: function` the function to be wrapped so that it has optional arguments
- **returns**: `function`
