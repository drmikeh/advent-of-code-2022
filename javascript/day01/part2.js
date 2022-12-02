const { assert } = require('console')
const input = require('../file-reader.js').readFile('input.txt', '\n', Number, v => true)

const sum = (a, b) => a + b
const sortHelper = (a, b) => b - a

let max3 = [0, 0, 0]
const updateMax3 = (max3, val) => [...max3, val].sort(sortHelper).slice(0, 3)

let total = 0
input.forEach(val => {
    if (val === 0) {
        max3 = updateMax3(max3, total)
        total = 0
    } else {
        total += val
    }
});

const result = max3.reduce(sum)
console.log(result)
assert(result === 200945, `Incorrect result`)
