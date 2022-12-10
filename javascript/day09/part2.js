const { assert } = require('console')

const input = require('../file-reader.js')
    .readFile('input.txt', '\n', String)
    .map(s => s.split(' '))
    .map(instr => ({ dir: instr[0], amt: Number(instr[1])}))

// const knots = new Array(10).fill({ x: 0, y: 0 }) // why doesn't this work???
const knots = [
    { id: 0, x: 0, y: 0 },
    { id: 1, x: 0, y: 0 },
    { id: 2, x: 0, y: 0 },
    { id: 3, x: 0, y: 0 },
    { id: 4, x: 0, y: 0 },
    { id: 5, x: 0, y: 0 },
    { id: 6, x: 0, y: 0 },
    { id: 7, x: 0, y: 0 },
    { id: 8, x: 0, y: 0 },
    { id: 9, x: 0, y: 0 },
]

const goLeft = knot => knot.x -= 1
const goRight = knot => knot.x += 1
const goUp = knot => knot.y += 1
const goDown = knot => knot.y -= 1

const strategies = {
    L: goLeft,
    R: goRight,
    U: goUp,
    D: goDown
}

/**
 * If the head is ever two steps directly up, down, left, or right from the tail,
 * the tail must also move one step in that direction so it remains close enough
 */
function moveDirectly(k1, k2) {
    const distanceX = k1.x - k2.x
    const distanceY = k1.y - k2.y

    if (distanceX > 1 && k1.y === k2.y) {
        goRight(k2)
        return true
    } else if (distanceX < -1 && k1.y === k2.y) {
        goLeft(k2)
        return true
    } else if (distanceY > 1 && k1.x === k2.x) {
        goUp(k2)
        return true
    } else if (distanceY < -1 && k1.x === k2.x) {
        goDown(k2)
        return true
    }
    return false
}

/**
 * Otherwise, if the head and tail aren't touching and aren't in the same row or column,
 * the tail always moves one step diagonally to keep up
 */
function moveDiagonally(k1, k2) {
    if (k1.x > k2.x) {
        goRight(k2)
    } else {
        goLeft(k2)
    }
    if (k1.y > k2.y) {
        goUp(k2)
    } else {
        goDown(k2)
    }
}

function notTouching(k1, k2) {
    const distanceX = Math.abs(k1.x - k2.x)
    const distanceY = Math.abs(k1.y - k2.y)
    return distanceX > 1 || distanceY > 1
}

function sameRowOrColumn(k1, k2) {
    if (k1.x === k2.x) return true
    if (k1.y === k2.y) return true
    return false
}

const tailSet = new Set()
input.forEach(instr => {
    const { dir, amt } = instr
    for (let n = 0; n < amt; n++) {
        strategies[dir](knots[0])
        for (let k = 1; k < knots.length; k++) {
            const head = knots[k - 1]
            const tail = knots[k]
            const tailMoved = moveDirectly(head, tail)
            if (tailMoved) {
            } else if (notTouching(head, tail) && !sameRowOrColumn(head, tail)) {
                moveDiagonally(head, tail)
            }
        }
        const tail = knots[knots.length - 1]
        tailSet.add(`${tail.x}-${tail.y}`)
    }
})

const result = tailSet.size
console.log(result)
assert(result === 2455)
