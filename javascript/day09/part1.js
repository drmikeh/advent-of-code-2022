const { group, assert } = require('console')

const input = require('../file-reader.js')
    .readFile('input.txt', '\n', String)
    .map(s => s.split(' '))
    .map(instr => ({ dir: instr[0], amt: Number(instr[1])}))

const head = { x: 0, y: 0 }
const tail = { x: 0, y: 0 }

/**
 * If head and tail were diagonally positioned before moving the head
 * then we need to align the tail to the head in the direction corresponding
 * to the movement of the head
 */
function handleDiagonal(dir, isDiagonal) {
    if (isDiagonal) {
        if (dir === 'L' || dir === 'R') tail.y = head.y
        else tail.x = head.x
    }
}

function updateTail(dir, isDiagonal) {
    if (head.x > tail.x + 1) {
        tail.x += 1
        handleDiagonal(dir, isDiagonal)
    } else if (head.x < tail.x - 1) {
        tail.x -= 1
        handleDiagonal(dir, isDiagonal)
    }
    if (head.y > tail.y + 1) {
        tail.y += 1
        handleDiagonal(dir, isDiagonal)
    } else if (head.y < tail.y - 1) {
        tail.y -= 1
        handleDiagonal(dir, isDiagonal)
    }
}

const goLeft = () => head.x -= 1
const goRight = () => head.x += 1
const goUp = () => head.y += 1
const goDown = () => head.y -= 1

const strategies = {
    L: goLeft,
    R: goRight,
    U: goUp,
    D: goDown
}

const tailSet = new Set()
input.forEach(instr => {
    const { dir, amt } = instr
    for (let n = 0; n < amt; n++) {
        const isDiagonal = head.x != tail.x && head.y != tail.y
        strategies[dir]()
        updateTail(dir, isDiagonal)
        tailSet.add(`${tail.x}-${tail.y}`)
    }
})

const result = tailSet.size
console.log(result)
assert(result === 6337)
