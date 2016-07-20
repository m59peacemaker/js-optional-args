const optionalArgs = require('../')
const test = require('tape')

test('0, 0', t => {
  t.plan(1)
  function fn () {
    t.false(arguments.length)
  }
  optionalArgs(fn)()
})

test('0, 1 - should pass the arg through anyway', t => {
  t.plan(1)
  function fn () {
    t.deepEqual([...arguments], [true])
  }
  optionalArgs(fn)(true)
})

test('2, 4', t => {
  t.plan(1)
  function fn (a, b) {
    t.deepEqual([...arguments], [1, 2, 3, 4])
  }
  optionalArgs(fn)(1, 2, 3, 4)
})

test('3, 2', t => {
  t.plan(1)
  function fn (a, b, c) {
    t.deepEqual([...arguments], [1, undefined, 3])
  }
  optionalArgs(fn)(1, 3)
})

test('5, 3', t => {
  t.plan(1)
  function fn (a, b, c, d, e) {
    t.deepEqual([...arguments], [1, 2, undefined, undefined, 5])
  }
  optionalArgs(fn)(1, 2, 5)
})

test('4, 3', t => {
  t.plan(1)
  function fn (a, b, c, d) {
    t.deepEqual([a, b, c, d], [1, 2, undefined, 4])
  }
  optionalArgs(fn)(1, 2, 4)
})

test('4, 3 - with default 3rd', t => {
  t.plan(1)
  function fn (a, b, c = {}, d) {
    t.deepEqual([a, b, c, d], [1, 2, {}, 4])
  }
  optionalArgs(4, fn)(1, 2, 4)
})
