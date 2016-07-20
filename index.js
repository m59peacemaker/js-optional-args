const optionalArgs = (length, fn) => {
  return (...args) => {
    const fnLength = length || fn.length
    const missing = Math.max(0, fnLength - args.length)
    args.splice(args.length - 1, 0, ...new Array(missing).fill(undefined))
    return fn(...args)
  }
}

module.exports = optionalArgs(2, optionalArgs)
