const { assert } = require('console')
const { getPriority } = require('./utils')
const rucksacks = require('../file-reader.js').readFile('input.txt', '\n', String)

function intersection (a, b, c) {
    const setA = new Set(a);
    const ab = b.filter(value => setA.has(value));
    const setAB = new Set(ab)
    return c.filter(value => setAB.has(value))
}

let prioritySum = 0
for (let i = 0; i < rucksacks.length; i += 3) {
    const group = rucksacks.slice(i, i + 3).map(sack => sack.split(''))
    const badge = intersection(...group)[0]
    const priority = getPriority(badge)
    prioritySum += priority
}

console.log(prioritySum)
assert(prioritySum === 2616, `Incorrect sum of priorities.`)
