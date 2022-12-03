const { assert } = require('console')

const transformInputMap = {
    A: 'ROCK', B: 'PAPER', C: 'SCISSORS',
    X: 'ROCK', Y: 'PAPER', Z: 'SCISSORS'
}

const mapFunction = str => str.split(' ').map(val => transformInputMap[val])
const games = require('../file-reader.js').readFile('input.txt', '\n', mapFunction, v => v.length > 0)

const LOST_POINTS = 0, DRAW_POINTS = 3, WIN_POINTS = 6

const outcomePointsMap = {
    ROCK: { ROCK: DRAW_POINTS, PAPER: LOST_POINTS, SCISSORS: WIN_POINTS },
    PAPER: { ROCK: WIN_POINTS, PAPER: DRAW_POINTS, SCISSORS: LOST_POINTS },
    SCISSORS: { ROCK: LOST_POINTS, PAPER: WIN_POINTS, SCISSORS: DRAW_POINTS },
}

const toolPointsMap = { ROCK: 1, PAPER: 2, SCISSORS: 3 }

const calcScore = tools => toolPointsMap[tools[1]] + outcomePointsMap[tools[1]][tools[0]]

const sum = (a, b) => a + b
const score = games.map(game => calcScore(game)).reduce(sum, 0)
console.log(score)
assert(score === 12458, `Incorrect score`)
