const { assert } = require('console')
const { getMonkeys, doRounds } = require('./utils')

function calcWorryLevel(item, op, opAmt, mod) {
    item %= mod
    if (opAmt === 'old') opAmt = item
    const evalString = `${item} ${op} ${opAmt}`
    return eval(evalString)
}

const monkeys = getMonkeys()
const mod = monkeys.map(m => m.testAmt).reduce((a, b) => a * b, 1)
doRounds(monkeys, 10000, (item, op, opAmt) => calcWorryLevel(item, op, opAmt, mod))

monkeys.sort((m1, m2) => m2.inspectionCount - m1.inspectionCount)
const prod = (a, b) => a * b
const result = monkeys.slice(0, 2).map(m => m.inspectionCount).reduce(prod, 1)
console.log(result)
assert(result === 27267163742)
