const { assert } = require('console')
const { stacks, procedure, getTopCrateIndex, getFirstEmptyIndex } = require('./utils')

procedure.forEach(p => {
    for (let n = 0; n < p.qty; n++) {
        const from = stacks[p.from - 1]
        const fromIndex = getTopCrateIndex(from)
        const to = stacks[p.to - 1]
        const toIndex = getFirstEmptyIndex(to)
        const crate = from[fromIndex]
        from[fromIndex] = null
        to[toIndex] = crate
    }
})

const result = stacks.reduce((topCrates, stack) => [...topCrates, stack[getTopCrateIndex(stack)]], []).join('')
console.log(result)
assert(result === 'CNSZFDVLJ')
