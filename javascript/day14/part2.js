const { assert } = require('console')
const {
    getInput,
    makeGrid,
    addRock,
    dropSand,
    addFloor,
    SAND_SOURCE_LOC,
    GRAIN_OF_SAND,
    getBounds
} = require('./util')

function solve() {
    const input = getInput('input.txt')
    let { minX, maxX, minY, maxY } = getBounds(input)

    // make the floor big enough
    minX -= 200
    maxX += 200
    maxY += 2

    const grid = makeGrid(minX, maxX, minY, maxY)
    addRock(grid, input)
    addFloor(grid, minX, maxX, maxY)

    function checkFull(x, y) {
        if (grid[SAND_SOURCE_LOC[1]][SAND_SOURCE_LOC[0]] === GRAIN_OF_SAND) {
            return { x, y, r: -1, end: true }
        } else {
            return { x, y, end: false }
        }
    }
    const r = dropSand(grid, checkFull)
    return r
}

const result = solve()
console.log(result)
assert(result === 31722)
