const { assert } = require('console')
const { getGrid, solve } = require('./util')

function findAllLowestPoints(grid) {
    const lowestPoints = []
    for (let r = 0; r < grid.length; r++) {
        const row = grid[r]
        for (let c = 0; c < row.length; c++) {
            if (row[c] === 'a') {
                lowestPoints.push({r, c})
            }
        }
    }
    return lowestPoints
}

const { grid, end } = getGrid()
const lowestPoints = findAllLowestPoints(grid)

let shortestPath = Infinity
for (start of lowestPoints) {
    shortestPath = Math.min(shortestPath, solve(grid, start, end))
}
console.log(shortestPath)
assert(shortestPath === 321)
