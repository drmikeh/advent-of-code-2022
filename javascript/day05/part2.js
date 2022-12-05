const { assert } = require('console')
const { stacks, procedure, getTopCrateIndex, getFirstEmptyIndex } = require('./utils')

procedure.forEach(p => {
    const from = stacks[p.from - 1]
    let fromIndex = getTopCrateIndex(from)
    const to = stacks[p.to - 1]
    let toIndex = getFirstEmptyIndex(to)
    let cratesRemoved = []
    for (let n = 0; n < p.qty; n++, fromIndex--) {
        const crate = from[fromIndex]
        from[fromIndex] = null
        cratesRemoved.unshift(crate)
    }
    for (let n = 0; n < p.qty; n++, toIndex++) {
        to[toIndex] = cratesRemoved[n]
    }
})

const result = stacks.reduce((topCrates, stack) => [...topCrates, stack[getTopCrateIndex(stack)]], []).join('')
console.log(result)
assert(result === 'QNDWLMGNS')
