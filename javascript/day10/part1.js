const { assert } = require('console')

const input = require('../file-reader.js')
    .readFile('input.txt', '\n', String)
    .map(s => s.split(' '))
    .map(instr => ({ code: instr[0], value: Number(instr[1])}))

let clock = 1
let oldX = 1
let X = 1
let nextSignalStrengthClock = 20
const signalStrengths = []

function addMeasurement(clock, X) {
    const v = clock * X
    // console.log('PUSHING', v, clock, X)
    signalStrengths.push(v)
}

input.forEach(instr => {
    const { code, value } = instr
    switch (code) {
        case 'noop':
            clock += 1
            break
        case 'addx':
            clock += 2
            oldX = X
            X += value
            break
        default:
            throw new Error(`Unrecognized code ${code}`)
    }
    if (clock === nextSignalStrengthClock) {
        addMeasurement(nextSignalStrengthClock, X)
        nextSignalStrengthClock += 40
    } else if (clock > nextSignalStrengthClock) {
        addMeasurement(nextSignalStrengthClock, oldX)
        nextSignalStrengthClock += 40
    }
    // console.log({ code, value, clock, X, next: nextSignalStrengthClock })
})

const sum = (a, b) => a + b
const result = signalStrengths.reduce(sum, 0)
console.log(result)
assert(result === 14820)
