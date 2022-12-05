const { assert } = require('console')
const { getPriority } = require('./utils')
const rucksacks = require('../file-reader.js').readFile('input.txt', '\n', String)

function findDuplicate(sack) {
    const middleIndex = sack.length / 2
    const first = sack.slice(0, middleIndex)
    const second = sack.slice(middleIndex)
    const set = new Set(first.split(''))
    const secondLetters = second.split('')
    for (const letter of secondLetters) {
        if (set.has(letter)) { return letter }
    }
    throw new Error(`Cannot find a duplicate item in rucksack ${sack}`)
}

const sum = (a, b) => a + b
const prioritySum = rucksacks.map(sack => findDuplicate(sack)).map(getPriority).reduce(sum, 0)
console.log(prioritySum)
assert(prioritySum === 7848, `Incorrect sum of priorities.`)
