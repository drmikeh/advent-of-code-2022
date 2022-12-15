const { assert } = require('console')

const input = require('../file-reader.js')
    .readFile('input.txt', '\n', String)
    .map(s => s.split(' '))
    .map(instr => ({ code: instr[0], value: Number(instr[1])}))

let X = 1
let instrPtr = 0
let pendingInstruction = null

const WIDTH = 40
const HEIGHT = 6

function makeCRT() {
    const crt = new Array(HEIGHT)
    for (let r = 0; r < HEIGHT; r++) {
        const row = new Array(WIDTH)
        for (let c = 0; c < WIDTH; c++) {
            row[c] = ' '
        }
        crt[r] = row
    }
    return crt
}

function printCRT(crt) {
    for (let r = 0; r < HEIGHT; r++) {
        console.log(crt[r].join(''))
    }
}

const CRT = makeCRT()

function drawPixel(pixel, sprite) {
    const row = Math.floor(pixel / 40)
    const col = pixel % 40
    if (col >= sprite - 1 && col <= sprite + 1) {
        CRT[row][col] = '#'
    } else {
        CRT[row][col] = ' '
    }
 }

for (let clock = 1; clock <= 240; clock++) {
    const pixel = (clock - 1) % (WIDTH * HEIGHT)
    drawPixel(pixel, X)
    if (pendingInstruction) {
        X += pendingInstruction.value
        pendingInstruction = null
    } else {
        const instr = input[instrPtr++]
        switch (instr.code) {
            case 'noop':
                break
            case 'addx':
                pendingInstruction = instr
                break
            default:
                throw new Error(`Unrecognized code ${code}`)
        }
    }
}

printCRT(CRT)

// hash the CRT as a string to verify that it is still the correct answer.
String.prototype.hashCode = function() {
    var hash = 0, i = 0, len = this.length;
    while ( i < len ) {
        hash  = ((hash << 5) - hash + this.charCodeAt(i++)) << 0;
    }
    return hash + 2147483647 + 1;
};
const hash = CRT.reduce((str, row) => str + row.join(''), '').hashCode()
assert(hash === 3784316381)
