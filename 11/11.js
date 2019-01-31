// https://adventofcode.com/2018/day/11

let serialNum = 9221;
let gridSize = 300;

function mappingGrid(gridSize, serialNum) {
    let arr = [];
    for(let i = 0; i < gridSize; i++) {
        arr[i] = [];
        for(let j = 0; j < gridSize; j++) {
            let rackID = (i + 1) + 10;
            let res = (rackID * (j + 1) + serialNum) * rackID;
            arr[i][j] = (res % 1000 - res % 100) / 100 - 5;
        }
    }
    return arr;
}

function findPower(arr, a, b) {
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr.length; j++) {
            if(i == a-1 && j === b-1){ 
                console.log(arr[i][j]);
            }
        }
    }
}

function calc3x3Matrix(arr, x, y, size) {
    let sum = 0;
    for(let i = x; i < x + size; i++) {
        for(let j = y; j < y + size; j++) {
            sum += arr[i][j];
        }
    }
    return sum;
}

function Fn(arr, size) {
    let maxValue = Number.MIN_SAFE_INTEGER;
    let coordX = 0, coordY = 0; 

    for(let i = 0; i < arr.length - (size - 1); i++) {
        for(let j = 0; j < arr.length - (size - 1); j++) {
            let currSum = calc3x3Matrix(arr, i, j, size)
            if(maxValue < currSum) {
                maxValue = currSum;
                coordX = i;
                coordY = j;
            }
        }
    }
    console.log('maxval: ' + maxValue, 'val: ' + arr[coordX][coordY])
    return {
        x : coordX + 1,
        y : coordY + 1
    }
}


let a = mappingGrid(gridSize, serialNum);

// --- Part 1 --- //

console.log(Fn(a, 3)) // maxval: 29 20,77

// --- Part 2 --- //

console.log(Fn(a, 10)) // 67 x: 143, y: 57, size: 10
