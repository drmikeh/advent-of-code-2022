const { assert } = require('console')

const input = require('../file-reader.js')
    .readFile('input.txt', '\n', String)
    .map(s => eval(s))

const asString = a => JSON.stringify(a)
const isNumber = v => typeof v === 'number'
const isArray = v => Array.isArray(v)
const getMessage = v =>
    v < 0 ? '- Left side is smaller, so inputs are in the right order' :
    v > 0 ? '- Right side is smaller, so inputs are not in the right order' :
    '- Values are the same, keep going'

function compare(left, right) {
    if (isNumber(left) && isNumber(right)) {
        return left - right
    }
    if (Array.isArray(left) && Array.isArray(right)) {              // If both values are lists
        const shortestLength = Math.min(left.length, right.length)
        for (let idx = 0; idx < shortestLength; idx++) {
            const c = compare(left[idx], right[idx])
            if (c !== 0) return c
        }
        return left.length - right.length // If the right list runs out of items first, the inputs are not in the right order.
    }
    if (isArray(left) && isNumber(right)) return compare(left, [right])
    if (isNumber(left) && isArray(right)) return compare([left], right)
}

input.push([[2]])
input.push([[6]])
input.sort(compare)

const firstIndex = input.findIndex(v => v.length === 1 && v[0][0] === 2) + 1
const secondIndex = input.findIndex(v => v.length === 1 && v[0][0] === 6) + 1
const result = firstIndex * secondIndex
console.log(result)
assert(result === 21890)
