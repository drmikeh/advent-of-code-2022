const { assert } = require('console')

const input = require('../file-reader.js')
    .readFile('input.txt', '\n', String)[0]

function findIndex(data) {
    for (let i = 0; i < data.length; i++) {
        const set = new Set(data.slice(i, i + 4))
        if (set.size === 4) {
            return i + 4
        }
    }
}

const result = findIndex(input)
console.log(result)
assert(result === 1987)
