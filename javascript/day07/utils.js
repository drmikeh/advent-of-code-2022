const { inspect } = require('util')

function pp(o, options = {}) {
    console.log(inspect(o, {
        showHidden: false,
        depth: 20,
        colors: true,
        ...options
    }))
}

function prettyPrint(node, level = 0) {
    console.log(''.padStart(level * 2), `-`, node.name, '(dir)')
    node.dirs.forEach(d => {
        prettyPrint(d, level + 1)
    })
    node.files.forEach(f => {
        console.log(''.padStart((level+1) * 2), '-', f.name, `(file, size=${f.size})`)
    })
}

