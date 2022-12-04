const data = require('../file-reader.js')
    .readFile('input.txt', '\n', String)
    .map(s => s.split(',').map(s => s.split('-').map(Number)).map(a => ({ s: a[0], e: a[1]})))

function isOverlapping(pair) {
    const [a, b] = pair
    return !(a.s > b.e || b.s > a.e)
}

const sum = data.reduce((sum, pair) => sum + isOverlapping(pair), 0)
console.log(sum)
