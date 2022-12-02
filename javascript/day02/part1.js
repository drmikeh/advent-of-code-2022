const { assert } = require('console')

const mapFunction = str => str.split(' ').map(val => {
    switch (val) {
        case 'A': return 'ROCK'
        case 'B': return 'PAPER'
        case 'C': return 'SCISSORS'
        case 'X': return 'ROCK'
        case 'Y': return 'PAPER'
        case 'Z': return 'SCISSORS'
    }
})
const games = require('../file-reader.js').readFile('input.txt', '\n', mapFunction, v => v.length > 0)

const LOST_POINTS = 0
const DRAW_POINTS = 3
const WIN_POINTS = 6

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
