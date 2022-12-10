const NUM_ROWS = 40
const NUM_COLS = 40

function getChar(knots, r, c) {
    const knotIndex = knots.findIndex(k => k.x === c && k.y === r)
    if (knotIndex === 0) return 'H'
    else if (knotIndex === knots.length - 1) return 'T'
    else if (knotIndex !== -1) return knotIndex
    else if (r === 0 && c === 0) return 's'
    return '.'
}

function printGrid(knots) {
    for (let r = NUM_ROWS - 1; r >= 0; r--) {
        let rowString = ''
        for (let c = 0; c < NUM_COLS; c++) {
            rowString += getChar(knots, r, c)
        }
        console.log(rowString)
    }
    console.log()
}

module.exports = {
    printGrid
}
