// https://adventofcode.com/2018/day/1

const fs = require('fs');

const inputData = fs.readFileSync('01.txt').toString().split('\n').map(str => str.replace(/\r$/, '')).filter(str => str.length > 0);

let arr = inputData;

let res = arr.reduce((prev, curr) => {
    return Number(prev) + Number(curr);
}, 0);

console.log(res);

// - - - Part 2 - - - //


function freqTwice (array, initValue) {
    let obj = {};
    let res = initValue;

    for (let i = 0; i < array.length;) {
        res += Number(array[i]);
        if (!obj.hasOwnProperty(res)) {
            obj[res] = i;
            if (i == array.length - 1) {
                i = 0;
            } else {
                i++;
            }
        } else {
           return res;
        }
    }
}

console.log(freqTwice(arr, 0)); 