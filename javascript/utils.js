// Usage: makeArray(5, 3, 4) will create an array[5][3][4]
function makeArray(length) {
    const arr = new Array(length || 0)
    let i = length

    if (arguments.length > 1) {
        const args = Array.prototype.slice.call(arguments, 1)
        while (i--) arr[length - 1 - i] = makeArray.apply(this, args)
    }

    return arr
}

module.exports = {
    makeArray,
}
