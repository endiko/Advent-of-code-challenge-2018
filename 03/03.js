// https://adventofcode.com/2018/day/3

const fs = require('fs');

const inputData = fs.readFileSync('03.txt').toString().split('\n').map(str => str.replace(/\r$/, '')).filter(str => str.length > 0);

let input = inputData;

function createArray(n) {
    let array = [];
    for (let i = 0; i < n; i++) {
        array[i] = [];
        for (let j = 0; j < n; j++) {
            array[i][j] = 0;
        }
    }
    return array; 
}

function parseInput(inputArray, matchingRegex) {
    return inputArray.map(ix => {
        return matchingRegex.exec(ix).filter(ixf => {
            if(!Number.isNaN(Number(ixf))) {
                return ixf;
            }
        })
    })
}

function toNumberArray(array) {
    return array.map(item => item.map(subitem => +subitem));
}

function calcSquareInches(array) {
    let count = 0;
    array.forEach(item => {
        for(let i = 0; i < item.length; i++) {
            if(item[i] == 'x') {
                count++;
            }
        }
    })
    return count;
}

function fillMatrix(arr1, arr2) {
    arr1.forEach(element => {
        let ix = element[0],
            left = element[1],
            top = element[2],
            width = left + element[3],
            height = top + element[4];
        
        for(let i = left; i < width; i++) {
            for(let j = top; j < height; j++) {
                if(arr2[j][i] == 0) {
                    arr2[j][i] = ix;
                } else {
                    arr2[j][i] = 'x';
                }
                
            }
        }
    });
    return arr2;
}

let matrixLength = 1000;
let regex = /(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;
let inputArr = toNumberArray(parseInput(input, regex));
let arr = createArray(matrixLength);
let resArr = fillMatrix(inputArr, arr);

console.log(calcSquareInches(resArr));

// - - - - Part 2 - - - - //

let testInput = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'];
let testInputArr = toNumberArray(parseInput(testInput, regex));
let testArr = createArray(10);

function findingID(arr1, arr2) {
    let id = 0;
    arr1.forEach(element => {
        let ix = element[0],
            left = element[1],
            top = element[2],
            width = left + element[3],
            height = top + element[4],
            sq = element[3] * element[4],
            count = 0;
            
        for(let i = left; i < width; i++) {
            for(let j = top; j < height; j++) {
                if(arr2[j][i] === ix) count++; 
            }
        }
        if (count === sq) id = ix;
    });
    return id;
}

console.log(findingID(inputArr, resArr));

