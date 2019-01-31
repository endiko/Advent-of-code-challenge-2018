// https://adventofcode.com/2018/day/5

const fs = require('fs');

const inputData = fs.readFileSync('05.txt').toString().split('').map(str => str.replace(/\r$/, '')).filter(str => str.length > 0);


function reducePairs(arr) {
    for(let i = 1; i < arr.length; i++) {
        if(arr[i].toLowerCase() === arr[i-1].toLowerCase() && arr[i] !== arr[i-1]) {
            arr.splice(i-1, 2);
            i = 1;
        }
    }
    return arr.length;
}


console.log(reducePairs(inputData));

// - - - Part 2 - - - //

function makeLenArr(arr) {
    let storageArr = [];
    let tempArr = [];
    let lengthArr = [];
    for(let i = 0; i < arr.length; i++) {
        if(!storageArr.includes(arr[i].toLowerCase())) {
            tempArr = arr.filter(item => (item.toLocaleLowerCase() !== arr[i].toLowerCase()));
            lengthArr.push(reducePairs(tempArr));
            storageArr.push(arr[i].toLowerCase());
        }
    }
    return lengthArr;
}

function findMin(arr) {
    return Math.min.apply(null, arr);
}

let resArr = makeLenArr(inputData);
let min = findMin(resArr);
console.log(min)