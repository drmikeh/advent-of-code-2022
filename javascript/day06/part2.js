const assert = require('assert')

const input = require('../file-reader.js')
    .readFile('input.txt', '\n', String)[0]

function findIndex(data) {
    for (let i = 0; i < data.length; i++) {
        const set = new Set(data.slice(i, i + 14))
        if (set.size === 14) {
            return i + 14
        }
    }
}

const result = findIndex(input)
console.log(result)
assert(result === 3059)
