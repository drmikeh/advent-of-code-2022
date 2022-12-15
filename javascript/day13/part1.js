const { assert } = require('console')

const input = require('../file-reader.js')
    .readFile('input.txt', '\n', String)
    .map(s => eval(s))

DEBUG_FLAG = false
function debug(...args) {
    if (DEBUG_FLAG) {
        console.log(args)
    }
}

const asString = a => JSON.stringify(a)
const isNumber = v => typeof v === 'number'
const isArray = v => Array.isArray(v)
const getMessage = v =>
    v < 0 ? '- Left side is smaller, so inputs are in the right order' :
    v > 0 ? '- Right side is smaller, so inputs are not in the right order' :
    '- Values are the same, keep going'

function compare(left, right, level = 0) {
    debug(' '.repeat(level * 2), `- Compare ${asString(left)} vs ${asString(right)}`)
    if (isNumber(left) && isNumber(right)) {
        const diff = left - right
        debug(' '.repeat(level * 2 + 2), getMessage(diff))
        return diff                                                 // If both values are integers
    }
    if (Array.isArray(left) && Array.isArray(right)) {              // If both values are lists
        const shortestLength = Math.min(left.length, right.length)
        for (let idx = 0; idx < shortestLength; idx++) {
            const c = compare(left[idx], right[idx], level + 1)
            if (c !== 0) return c
        }
        return left.length - right.length // If the right list runs out of items first, the inputs are not in the right order.
    }
    if (isArray(left) && isNumber(right)) return compare(left, [right], level + 1)
    if (isNumber(left) && isArray(right)) return compare([left], right, level + 1)
}

const indices = []
for (let n = 0; n < input.length; n += 2) {
    const left = input[n]
    const right = input[n + 1]
    const pairNumber = Math.floor((n + 2) / 2)
    debug(`\n== Pair ${pairNumber} ==`)
    const c = compare(left, right)
    debug('----------------------------------------------------------')
    debug('Result:', getMessage(c))
    if (c < 0) {
        indices.push(pairNumber)
    }
}

debug({ indices })
const sum = (a, b) => a + b
const result = indices.reduce(sum, 0)
console.log(result)
assert(result === 4821)
