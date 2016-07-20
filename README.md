# optional-args

Wraps a function whose last argument is preceded by optional arguments so that when less arguments are passed in, missing optional arguments are filled in as `undefined`

## Install

```sh
npm install optional-args
```

## Usage

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

- `[argCount]: number, fn.length` the total number of arguments `fn` accepts, required for functions that use default parameters
- `fn: function`
- **returns**: `function`
