// for the future
const optionalArgs = (length, fn) => {
  return (...args) => {
    const fnLength = length || fn.length
    const missing = Math.max(0, fnLength - args.length)
    missing && args.splice(args.length - 1, 0, ...new Array(missing))
    return fn(...args)
  }
}

module.exports = optionalArgs(2, optionalArgs)
