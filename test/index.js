const test = require('tape')
const tryCatch = require('try_catch')
const optionalArgs = require('../')

test('[options], cb', t => {
  optionalArgs(1, 2, (options, cb) => t.deepEqual([options, cb], [undefined, undefined]))()
  optionalArgs(1, 2, (options, cb) => t.deepEqual([options, cb], [undefined, 2]))(2)
  optionalArgs(1, 2, (options, cb) => t.deepEqual([options, cb], [1, 2]))(1, 2)
  optionalArgs(1, 2, function (options, cb) { t.deepEqual([...arguments], [1, 2, 3])})(1, 2, 3)
  t.end()
})

test('data, [options], cb', t => {
  optionalArgs(1, 3, (data, options, cb) => t.deepEqual([data, options, cb], [undefined, undefined, undefined]))()
  optionalArgs(1, 3, (data, options, cb) => t.deepEqual([data, options, cb], [1, undefined, undefined]))(1)
  optionalArgs(1, 3, (data, options, cb) => t.deepEqual([data, options, cb], [1, undefined, 3]))(1, 3)
  optionalArgs(1, 3, (data, options, cb) => t.deepEqual([data, options, cb], [1, 2, 3]))(1, 2, 3)
  optionalArgs(1, 3, function (data, options, cb) { t.deepEqual([...arguments], [1, 2, 3, 4])})(1, 2, 3, 4)
  t.end()
})

test('a, b, [c], [d], [e], cb', t => {
  optionalArgs(3, 6, (a, b, c, d, e, cb) => t.deepEqual([a, b, c, d, e, cb], [undefined, undefined, undefined, undefined, undefined, undefined]))()
  optionalArgs(3, 6, (a, b, c, d, e, cb) => t.deepEqual([a, b, c, d, e, cb], [1, undefined, undefined, undefined, undefined, undefined]))(1)
  optionalArgs(3, 6, (a, b, c, d, e, cb) => t.deepEqual([a, b, c, d, e, cb], [1, 2, undefined, undefined, undefined, undefined]))(1, 2)
  optionalArgs(3, 6, (a, b, c, d, e, cb) => t.deepEqual([a, b, c, d, e, cb], [1, 2, undefined, undefined, undefined, 6]))(1, 2, 6)
  optionalArgs(3, 6, (a, b, c, d, e, cb) => t.deepEqual([a, b, c, d, e, cb], [1, 2, 3, undefined, undefined, 6]))(1, 2, 3, 6)
  optionalArgs(3, 6, (a, b, c, d, e, cb) => t.deepEqual([a, b, c, d, e, cb], [1, 2, 3, 4, undefined, 6]))(1, 2, 3, 4, 6)
  optionalArgs(3, 6, (a, b, c, d, e, cb) => t.deepEqual([a, b, c, d, e, cb], [1, 2, 3, 4, 5, 6]))(1, 2, 3, 4, 5, 6)
  optionalArgs(3, 6, function (a, b, c, d, e, cb) { t.deepEqual([...arguments], [1, 2, 3, 4, 5, 6, 7])})(1, 2, 3, 4, 5, 6, 7)
  t.end()
})

test('returned fn.length === argCount', t => {
  t.equal(optionalArgs(1, 3, function (a, b, c) {}).length, 3)
  t.equal(optionalArgs(1, 3, function () {}).length, 3)
  t.equal(optionalArgs(1, 3, (a, b, c) => {}).length, 3)
  t.equal(optionalArgs(1, 3, () => {}).length, 3)
  t.equal(optionalArgs(2, 3, (a, b, c) => {}).length, 3)
  t.equal(optionalArgs(2, 5, (a, b, c, d, e) => {}).length, 5)
  t.equal(optionalArgs(2, 5, (a, b, c, d) => {}).length, 5)
  t.end()
})

test('function accepts 0 arguments - throw error', t => {
  t.plan(1)
  const fn = () => {}
  tryCatch(() => optionalArgs(1, 0, fn), t.pass)
})

test('function accepts 1 argument - throw error', t => {
  t.plan(1)
  const fn = () => {}
  tryCatch(() => optionalArgs(1, 1, fn), t.pass)
})

test('no optional arguments - no need for optional-args', t => {
  t.plan(1)
  const fn = () => {}
  tryCatch(() => optionalArgs(0, 2, fn), t.pass)
})
