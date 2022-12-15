const { assert } = require('console')
const { getGrid, solve } = require('./util')

const { grid, start, end } = getGrid()
const result = solve(grid, start, end)
console.log(result)
assert(result === 330)
