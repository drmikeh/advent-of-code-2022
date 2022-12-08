const { assert } = require('console')

const input = require('../file-reader.js')
    .readFile('input.txt', '\n', String)
    .map(s => s.split('').map(c => Number(c)))

const numRows = input.length
const numCols = input[0].length

function getLeftMax(row, col) {
    let max = -1
    for (let c = 0; c < col; c++) {
        const h = input[row][c]
        max = max > h ? max : h
    }
    return max
}

function getRightMax(row, col) {
    let max = -1
    for (let c = col + 1; c < numCols; c++) {
        const h = input[row][c]
        max = max > h ? max : h
    }
    return max
}

function getAboveMax(row, col) {
    let max = -1
    for (let r = 0; r < row; r++) {
        const h = input[r][col]
        max = max > h ? max : h
    }
    return max
}

function getBelowMax(row, col) {
    let max = -1
    for (let r = row + 1; r < numRows; r++) {
        const h = input[r][col]
        max = max > h ? max : h
    }
    return max
}

function isVisible(row, col) {
    const height = input[row][col]
    if (getLeftMax(row, col) < height) return true
    if (getRightMax(row, col) < height) return true
    if (getAboveMax(row, col) < height) return true
    if (getBelowMax(row, col) < height) return true
    return false
}

const numEdgeTrees = numRows * 2 + numCols * 2 - 4
let totalVisible = numEdgeTrees
for (let row = 1; row < numRows-1; row++) {
    for (let col = 1; col < numCols - 1; col++) {
        if (isVisible(row, col)) {
            totalVisible += 1
        }
    }
}

console.log(totalVisible)
assert(totalVisible === 1693)
