var optionalArgs = function (length, fn) {
  return function () {
    var args = [].slice.call(arguments)
    var fnLength = length || fn.length
    var missing = Math.max(0, fnLength - args.length)
    if (missing) {
      var spliceArgs = [args.length - 1, 0].concat(new Array(missing))
      args.splice.apply(args, spliceArgs)
    }
    return fn.apply(undefined, args)
  }
}

module.exports = optionalArgs(2, optionalArgs)
