const { assert } = require('console')

const transformInputMap = {
    A: 'ROCK', B: 'PAPER', C: 'SCISSORS',
    X: 'LOSE', Y: 'DRAW', Z: 'WIN'
}

const mapFunction = str => str.split(' ').map(val => transformInputMap[val])
const games = require('../file-reader.js').readFile('input.txt', '\n', mapFunction, v => v.length > 0)

const outcomePointsMap = {
    LOSE: 0,
    DRAW: 3,
    WIN: 6
}

const findMyToolMap = {
    ROCK: { WIN: 'PAPER', DRAW: 'ROCK', LOSE: 'SCISSORS' },
    PAPER: { WIN: 'SCISSORS', DRAW: 'PAPER', LOSE: 'ROCK' },
    SCISSORS: { WIN: 'ROCK', DRAW: 'SCISSORS', LOSE: 'PAPER' },
}

const toolPointsMap = { ROCK: 1, PAPER: 2, SCISSORS: 3 }

const calcScore = game => toolPointsMap[findMyToolMap[game[0]][game[1]]] + outcomePointsMap[game[1]]

const sum = (a, b) => a + b
const score = games.map(game => calcScore(game)).reduce(sum, 0)
console.log(score)
assert(score === 12683, `Incorrect score`)
