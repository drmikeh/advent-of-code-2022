const { assert } = require('console')
const {
    getInput,
    getBounds,
    makeGrid,
    addRock,
    dropSand
} = require('./util')

function solve() {
    const input = getInput('input.txt')
    const { minX, maxX, minY, maxY } = getBounds(input)

    const grid = makeGrid(minX, maxX, minY, maxY)
    addRock(grid, input)

    function checkAbyss(x, y) {
        if (x < minX || x > maxX || y > maxY) {
            return { x, y, r: -1, end: true }
        } else {
            return { x, y, end: false }
        }
    }

    return dropSand(grid, checkAbyss)
}

const result = solve()
console.log(result)
assert(result === 638)
