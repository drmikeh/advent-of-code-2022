const { assert } = require('console')
const { buildTree } = require('./build-tree')
const input = require('../file-reader.js').readFile('input.txt', '\n', String)

function findSmallDirectories(node, result = []) {
    node.dirs.forEach(child => {
        if (child.size <= 100000) {
            result.push(child)
        }
        findSmallDirectories(child, result)
    })
    return result
}

const root = buildTree(input)
// prettyPrint(root)
// pp(root)
const smallDirs = findSmallDirectories(root)
// console.log('Small Dirs:', smallDirs.map(d => d.name))
const result = smallDirs.reduce((sum, d) => sum + d.size, 0)
console.log(result)
assert(result === 1449447)
