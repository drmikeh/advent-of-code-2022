function getInput(fileName) {
    const regex = /\d+,\d+/g
    const input = require('../file-reader.js')
        .readFile(fileName, '\n', String)
        .map(line => line.match(regex).map(coord => coord.split(',').map(Number)))
    return input
}

const min = (a, b) => Math.min(a, b)
const max = (a, b) => Math.max(a, b)
const lineToX = line => line.map(coord => coord[0])
const lineToY = line => line.map(coord => coord[1])

function getBounds(input) {
    const minX = input.flatMap(lineToX).reduce(min, Infinity)
    const maxX = input.flatMap(lineToX).reduce(max, -Infinity)
    const minY = 0
    const maxY = input.flatMap(lineToY).reduce(max, -Infinity)
    return { minX, maxX, minY, maxY }
}

const EMPTY = '.'
const ROCK = '#'
const SAND_SOURCE = '+'
const GRAIN_OF_SAND = 'o'
const SAND_SOURCE_LOC = [500, 0]

function makeGrid(minX, maxX, minY, maxY) {
    const grid = []
    for (let y = minY; y <= maxY; y++) {
        grid[y] = []
        for (let x = minX; x <= maxX; x++) {
            grid[y][x] = EMPTY
        }
    }
    grid[SAND_SOURCE_LOC[1]][SAND_SOURCE_LOC[0]] = SAND_SOURCE
    return grid
}

function printGrid(grid) {
    console.log('\n=== GRID ===')
    grid.forEach(row => {
        console.log(row.join(''))
    })
}

function addRock(grid, data) {
    data.forEach(line => {
        for (let l = 0; l < line.length - 1; l++) {
            let startX = Math.min(line[l][0], line[l + 1][0])
            let endX   = Math.max(line[l][0], line[l + 1][0])
            let startY = Math.min(line[l][1], line[l + 1][1])
            let endY   = Math.max(line[l][1], line[l + 1][1])

            for (let x = startX; x <= endX; x++) {
                for (let y = startY; y <= endY; y++) {
                    grid[y][x] = ROCK
                }
            }
        }
    })
}

function addFloor(grid, minX, maxX, maxY) {
    for (let x = minX; x <= maxX; x++) {
        grid[maxY][x] = ROCK
    }
}

/**
 * Move a grain of sand according to the rules of the game.
 * @returns an object containing x and y and r which is of the following:
 *   1 if sand was moved to another location on grid,
 *   0 if sand could not be moved, and
 *  -1 if sand fell into the abyss
 */
 function dropStep(grid, loc, termFn) {
    let [x, y] = loc

    const below = [x, y + 1]
    const diagLeft = [x - 1, y + 1]
    const diagRight = [x + 1, y + 1]

    const isEmpty = loc => grid[loc[1]][loc[0]] === EMPTY

    const allOptions = [below, diagLeft, diagRight]
    for (option of allOptions) {
        const [ox, oy] = option
        const terminateResult = termFn(ox, oy)
        if (terminateResult.end) {
            return terminateResult
        }
        if (isEmpty(option)) {
            return { x: ox, y: oy, r: 1 }
        }
    }
    // all options were non-empty
    return { x, y, r: 0 }
}

function dropOneGrainOfSand(grid, termFn) {
    let [x, y] = SAND_SOURCE_LOC
    let r = 1
    while (r === 1) {
        ; ({ x, y, r } = dropStep(grid, [x, y], termFn))
    }
    return { x, y, r }
}

function dropSand(grid, termFn) {
    let done = false
    let sandCount = 0
    while (!done) {
        sandCount += 1
        const { x, y, r } = dropOneGrainOfSand(grid, termFn)
        done = r === -1
        if (!done) {
            grid[y][x] = GRAIN_OF_SAND
        }
    }
    return sandCount - 1
}

module.exports = {
    getInput,
    getBounds,
    makeGrid,
    printGrid,
    addRock,
    dropSand,
    addFloor,
    SAND_SOURCE_LOC,
    GRAIN_OF_SAND
}
