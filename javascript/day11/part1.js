const { assert } = require('console')
const { getMonkeys, doRounds } = require('./utils')

function calcWorryLevel(item, op, opAmt) {
    if (opAmt === 'old') opAmt = item
    const evalString = `${item} ${op} ${opAmt}`
    return Math.floor(eval(evalString) / 3)
}

const monkeys = getMonkeys()
doRounds(monkeys, 20, calcWorryLevel)

monkeys.sort((m1, m2) => m2.inspectionCount - m1.inspectionCount)
const prod = (a, b) => a * b
const result = monkeys.slice(0, 2).map(m => m.inspectionCount).reduce(prod, 1)
console.log(result)
assert(result === 107822)
