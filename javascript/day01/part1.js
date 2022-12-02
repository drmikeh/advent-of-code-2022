const { assert } = require('console')
const input = require('../file-reader.js').readFile('input.txt', '\n', Number, v => true)

let max = 0
let total = 0
input.forEach(val => {
    if (val === 0) {
        max = max < total ? total : max
        total = 0
    } else {
        total += val
    }
});

console.log(max)
assert(max === 69693, `Incorrect result`)
