// https://adventofcode.com/2018/day/6

const fs = require('fs');

const input = fs.readFileSync('06.txt').toString().split('\n').map(i => i.replace(/\r$/, '')).filter(i => i.length > 0).map(subarr => subarr.split(', ').map(i => parseInt(i, 10)));

function findBorders(arr) {
    let minX = Number.MAX_SAFE_INTEGER, maxX = Number.MIN_SAFE_INTEGER, 
        minY = Number.MAX_SAFE_INTEGER, maxY = Number.MIN_SAFE_INTEGER;
    arr.forEach(item => {
        if(minX > item[0]) {
            minX = item[0];
        } else if(maxX < item[0]) {
            maxX = item[0];
        }
        if(minY > item[1]) {
            minY = item[1]
        } else if(maxY < item[1]) {
            maxY = item[1];
        }
    })
    return {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY
    }
}

function calcManhattenDistance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function calcMaxArea(inputData) {
    let borders = findBorders(inputData);
    let minXB = borders.minX,
        maxXB = borders.maxX,
        minYB = borders.minY,
        maxYB = borders.maxY;
    let S = [], 
        exS = [];
    
    inputData.forEach(() => S.push(0));

    for(let i = minXB; i <= maxXB; i++) {
        for(let j = minYB; j <= maxYB; j++) {
            let curArr = [];
            inputData.forEach(item => curArr.push(calcManhattenDistance(i, j, item[0], item[1])))

            let minDistance = Math.min.apply(null, curArr);
            let minDistanceCount = curArr.filter(item => item == minDistance).length;

            if (minDistanceCount > 1) continue;

            let idx = curArr.indexOf(minDistance);
            if(exS.includes(idx)) continue;
            if(i == minXB || i == maxXB || j == minYB || j == maxYB) {
                exS.push(idx);
                S[idx] = 0;
            } else {
                S[idx] += 1;
            }
        }
    }
    return Math.max.apply(null, S);
}

console.log(calcMaxArea(input));

// - - - - Part 2 - - - - //

function calcRegion(inputData, limit) {
    let borders = findBorders(inputData);
    let minXB = borders.minX,
        maxXB = borders.maxX,
        minYB = borders.minY,
        maxYB = borders.maxY;
    let S = 0;
    
    for(let i = minXB; i <= maxXB; i++) {
        for(let j = minYB; j <= maxYB; j++) {
            let curArr = [];
            inputData.forEach(item => curArr.push(calcManhattenDistance(i, j, item[0], item[1])))
            let SumOfDistances = curArr.reduce((cur, prev) => cur + prev);

            if(SumOfDistances < limit) {
                S++;
            }
        }
    }
    return S;
}

console.log(calcRegion(input, 10000));