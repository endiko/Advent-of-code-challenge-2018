// https://adventofcode.com/2018/day/25

const fs = require('fs');
const inputData = fs.readFileSync('25.txt').toString().split('\n').map(str => str.replace(/\r$/, '')).filter(str => str.length > 0)
                                                  .map(item => item.split(',').map(s => parseInt(s, 10)));


function calcManhDist(p, q) {
     let sum = 0;
     for(let i = 0; i < p.length; i++) {
          sum += Math.abs(p[i] - q[i])
     }
     return sum;
}

function arrayOfManhDistances(arr) {
    let manhDistArray = Array(inputData.length).fill().map(() => []);
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr.length; j++) {
            manhDistArray[i][j] = calcManhDist(arr[i], arr[j]) < 4 ? 1 : 0;
        }
    }
    return manhDistArray; 
}

function findConstellations(arr, ix) {
    let found = 0;
    for (let i = 0; i < arr.length; i++) {
        if(arr[ix][i] === 1) {
            arr[ix][i] = 0;
            found = 1;
            findConstellations(arr, i);
        }
    }
    return found;
}

function countConstellations(distances) {
    let constellationsCount = 0;

    for (let i = 0; i < distances.length; i++) {
        constellationsCount += findConstellations(distances, i);
    }

    return constellationsCount;
}

let distances = arrayOfManhDistances(inputData);

// --- Part 1 --- // 

console.log(countConstellations(distances));

