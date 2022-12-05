const input = require('../file-reader.js')
    .readFile('input.txt', '\n', String)

const transpose = arr => arr.reduce(
    (m, r) => (
        r.forEach(
            (v, i) => (m[i] ??= [], m[i].push(v))
        ),
        m
    ), []
)

function printStacks(stacks) {
    const transposed = transpose(stacks.map(a => [...a].reverse()))
    console.table(transposed)
}

const indexOfStackLabels = input.findIndex(line => line.startsWith(' 1'))
const stacks = transpose(
    input
        .slice(0, indexOfStackLabels)
        .map(row => {
            const arr = []
            for (let i = 1; i < row.length; i += 4) {
                arr.push(row[i] === ' ' ? null : row[i])
            }
            return arr
        })
        .reverse()
)

const procedure = input
    .slice(indexOfStackLabels + 1)
    .map(s => s.split(' '))
    .map(line => ({ qty: line[1], from: line[3], to: line[5] }))

const getTopCrateIndex = arr => arr.length - 1 - [...arr].reverse().findIndex(v => v !== null)
const getFirstEmptyIndex = arr => {
    const firstEmptyIndex = arr.findIndex(v => v === null)
    return firstEmptyIndex === -1 ? arr.length : firstEmptyIndex
}

module.exports = {
    printStacks,
    stacks,
    procedure,
    getTopCrateIndex,
    getFirstEmptyIndex
}
