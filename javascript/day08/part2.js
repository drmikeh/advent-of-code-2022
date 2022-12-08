const { assert } = require('console')

const input = require('../file-reader.js')
    .readFile('input.txt', '\n', String)
    .map(s => s.split('').map(c => Number(c)))

const numRows = input.length
const numCols = input[0].length

function countLeftVisibleTrees(row, col) {
    let count = 0
    for (let c = col - 1; c >= 0; c--) {
        count += 1
        if (input[row][c] >= input[row][col]) {
            return count
        }
    }
    return count
}

function countRightVisibleTrees(row, col) {
    let count = 0
    for (let c = col + 1; c < numCols; c++) {
        count += 1
        if (input[row][c] >= input[row][col]) {
            return count
        }
    }
    return count
}

function countAboveVisibleTrees(row, col) {
    let count = 0
    for (let r = row - 1; r >= 0; r--) {
        count += 1
        if (input[r][col] >= input[row][col]) {
            return count
        }
    }
    return count
}

function countBelowVisibleTrees(row, col) {
    let count = 0
    for (let r = row + 1; r < numRows; r++) {
        count += 1
        if (input[r][col] >= input[row][col]) {
            return count
        }
    }
    return count
}

function calcScenicScore(row, col) {
    return countLeftVisibleTrees(row, col) *
        countRightVisibleTrees(row, col) *
        countAboveVisibleTrees(row, col) *
        countBelowVisibleTrees(row, col)
}

let maxScenicScore = -1
for (let row = 1; row < numRows - 1; row++) {
    for (let col = 1; col < numCols - 1; col++) {
        const score = calcScenicScore(row, col)
        maxScenicScore = Math.max(score, maxScenicScore)
    }
}

console.log(maxScenicScore)
assert(maxScenicScore === 422059)
