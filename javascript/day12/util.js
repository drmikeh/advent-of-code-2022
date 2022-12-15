const START = 'S'
const END = 'E'

function getGrid() {
    const grid = require('../file-reader.js')
        .readFile('input.txt', '\n', String)
        .map(row => row.split(''))

    let start = findValue(grid, START)
    grid[start.r][start.c] = 'a'        // fix starting location value

    const end = findValue(grid, END)
    grid[end.r][end.c] = 'z'            // fix ending location value

    return { grid, start, end }
}

function findValue(grid, value) {
    for (let r = 0; r < grid.length; r++) {
        const row = grid[r]
        for (let c = 0; c < row.length; c++) {
            if (row[c] === value) {
                return { r, c }
            }
        }
    }
    return null
}

const asString = loc => `(${loc.r},${loc.c})`

function getOptions(grid, visited, r, c) {
    const neighbors = []
    if (r > 0)                  neighbors.push({ r: r - 1, c        })
    if (r < grid.length - 1)    neighbors.push({ r: r + 1, c        })
    if (c > 0)                  neighbors.push({ r: r,     c: c - 1 })
    if (c < grid[0].length - 1) neighbors.push({ r: r, c: c + 1 })

    function filterFn(curr, next) {
        // no back tracking
        if (visited.has(asString(next))) {
            return false
        }
        const currVal = grid[curr.r][curr.c].charCodeAt()
        const nextVal = grid[next.r][next.c].charCodeAt()
        return nextVal - currVal <= 1
    }
    return neighbors.filter(n => filterFn({r, c}, n))
}

function solve(grid, startLoc, endLoc) {
    const visited = new Set()
    visited.add(asString(startLoc))
    const queue = [{ ...startLoc, stepCount: 0 }]

    while (queue.length > 0) {
        const { stepCount, r, c } = queue.shift()
        const options = getOptions(grid, visited, r, c)
        for (option of options) {
            if (option.r === endLoc.r && option.c === endLoc.c) {
                return stepCount + 1
            }
            visited.add(asString(option))
            queue.push({ ...option, stepCount: stepCount + 1 })
        }
    }
    return Infinity
}

module.exports = {
    getGrid,
    solve
}
