module.exports.N = (n) => {
    return Array(n).fill('');
}

module.exports.NxM = (n, m) => {
    return Array(n).fill('').map(() => Array(m).fill(''));
}


