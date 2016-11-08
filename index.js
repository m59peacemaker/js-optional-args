var optionalArgs = function (optionalArgCount, argCount, fn) {
  if (typeof optionalArgCount !== 'number' || optionalArgCount < 1) {
    throw new Error('"optionalArgCount" is a required argument and must be a number greater than 0')
  }
  if (typeof argCount !== 'number') {
    throw new Error('"argCount" is a required argument and must be a number')
  }
  if (typeof fn !== 'function') {
    throw new Error('"fn" is a required argument and must be a function')
  }
  if (argCount < 2) {
    throw new Error('function does not accept enough arguments for any to be optional. function must accept at least 2 arguments.')
  }
  if (optionalArgCount > argCount - 1) {
    throw new Error('"fn" accepts ' + argCount + ' arguments. "optionalArgCount" must be less than ' + argCount)
  }
  return function () {
    var givenArgs = [].slice.call(arguments)
    if (givenArgs.length < argCount) {
      var startingArgCount = argCount - optionalArgCount - 1
      var missing = argCount - givenArgs.length
      var pad = new Array(missing)
      var beforeLastArg = Math.min(givenArgs.length, argCount) - 1
      var spliceAt = Math.max(startingArgCount, beforeLastArg)
      var spliceArgs = [spliceAt, 0].concat(pad)
      console.log(givenArgs, missing, pad, spliceAt)
      givenArgs.splice.apply(givenArgs, spliceArgs)
      return fn.apply(undefined, givenArgs)
    } else {
      return fn.apply(undefined, arguments)
    }
  }
}

module.exports = optionalArgs
