// https://adventofcode.com/2018/day/17

const fs = require('fs');

const inputData = fs.readFileSync('17.txt').toString().split('\n').map(str => str.replace(/\r$/, '')).filter(str => str.length > 0);

function parseInputData(data) {
    return data.map(el => el.split(', ')).map(item => {
        let regex =/(\d+)..(\d+)/g;
        let cX, cY; 
        let rangeArr = [];
        item.forEach(item => {
            if(item.includes('x')) {
                if(item.includes('..')) {
                    let test = regex.exec(item);
                    for(let i = parseInt(test[1]) ; i < parseInt(test[2]) + 1; i++) {
                        rangeArr.push(i);
                    }
                    cX = rangeArr;
                } else {
                    cX = parseInt(item.slice(2));
                }
            } else if(item.includes('y')) {
                if(item.includes('..')) {
                    let test = regex.exec(item);
                    for(let i = parseInt(test[1]) ; i < parseInt(test[2]) + 1; i++) {
                        rangeArr.push(i);
                    }
                    cY = rangeArr;
                } else {
                    cY = parseInt(item.slice(2));
                }
            }
        })
        return {
            x : cX,
            y : cY
        }
    })
}

function findMaxMin(data) {
    let maxX = Number.MIN_SAFE_INTEGER, minX = Number.MAX_SAFE_INTEGER, 
        minY = Number.MAX_SAFE_INTEGER, maxY = Number.MIN_SAFE_INTEGER;
    data.forEach(obj => {
        for (const key in obj) {
            if(key == 'x') {
                let curVal = obj[key];
                if(typeof(curVal) == 'number') {
                    if(curVal > maxX) {
                        maxX = curVal;
                    } 
                    if(curVal < minX){
                        minX = curVal;
                    }
                } else {
                    if(curVal[1] > maxX) {
                        maxX = curVal[1];
                    } 
                    if(curVal[0] < minX){
                        minX = curVal[0];
                    }
                }
                
            } else if(key == 'y') {
                let curVal = obj[key];
                if(typeof(curVal) == 'number') {
                    if(curVal > maxY) {
                        maxY = curVal;
                    } 
                    if(curVal < minY){
                        minY = curVal;
                    }
                } else {
                    if(curVal[1] > maxY) {
                        maxY = curVal[1];
                    } 
                    if(curVal[0] < minY){
                        minY = curVal[0];
                    }
                }
            }
        }
        return {
            minX : minX,
            maxX : maxX,
            minY : minY,
            maxY : maxY
        }
    })
    return {
        x0 : minX - 1,
        xn : maxX + 1,
        y0 : minY,
        yn : maxY +1
    }
}
function fillArray(coordArray) {
    let arr = [];
    for(let i = 0; i < gsize.yn + 1; i++){
        arr[i] = [];
        for(let j = gsize.x0 - 1; j < gsize.xn + 1; j++){
            arr[i][j] = '.';
            if(i == 0 && j == 500) {
                arr[i][j] = '+'
            }
        }
    }
    coordArray.forEach(obj => {
        for(const key in obj) {
            let val = obj[key];
            if(val.length > 1) {
                for(let i = 0; i < val.length; i++) {
                    if(key == 'x') {
                        arr[obj.y][val[i]] = '#';
                    } else if(key == 'y') {
                        arr[val[i]][obj.x] = '#';
                    }
                }
            }
        }
    })
    return arr;
}

function pouringWater(arr){
    let i = 0;
    while (i < gsize.yn) {
        for(let j = gsize.x0; j <= gsize.xn;j++) {
            if(arr[i][j] == '+' || arr[i][j] == '|') {
                if(arr[i + 1][j] == '.') {
                    arr[i + 1][j] = '|';
                    continue;
                } else if(arr[i + 1][j] == '|') {
                    continue;
                }

                let leftBorder = Number.MAX_SAFE_INTEGER, 
                    rightBorder = Number.MIN_SAFE_INTEGER;

                for(let k = j - 1; k >= gsize.x0; k--) {
                    if(arr[i][k] != '#' && arr[i][k] != '~'){
                        if(arr[i][k] != '|'){
                            arr[i][k] = '|';
                            if(arr[i + 1][k] == '.'){
                                arr[i + 1][k] = '|';
                                break;
                            }
                        } else {
                            if(arr[i+1][k] == '|'){
                               break;
                            }
                        }
                        
                    } else if(arr[i][k] == '#'){
                        leftBorder = k;
                        break;
                    }
                }      
                for(j = j + 1; j <= gsize.xn; j++) {
                    if(arr[i][j] == '.'){
                        if(arr[i][j] != '|'){
                            arr[i][j] = '|';
                            if(arr[i + 1][j] == '.'){
                                arr[i + 1][j] = '|';
                                break;
                            }
                        } else {
                            if(arr[i+1][j] == '|'){
                                break;
                            }
                        }
                    }
                    else if(arr[i][j] == '#'){
                        rightBorder = j;
                        break;
                    } else if(arr[i][j] == '|' && arr[i + 1][j] == '|') {
                        break;
                    }
                } 
                if(rightBorder > leftBorder) {
                    for(let k = leftBorder + 1; k < rightBorder + 1; k++) {
                        if(arr[i][k] != '#') {
                            arr[i][k] = '~';
                        }
                        j--;
                    }
                    i--;
                }      
            }
        }
        i++;
    }
    return arr;
}

function sumOfTiles(arr) {
    let sum = 0;
    for(let i = gsize.y0; i < gsize.yn; i++) {
        for(let j = gsize.x0; j <= gsize.xn; j++){
            if(arr[i][j] == '|' || arr[i][j] == '~'){
                sum += 1;
            }
        }
    }
    return sum;
}

let workingArray = parseInputData(inputData);
let gsize = findMaxMin(workingArray);
let arr = fillArray(workingArray);
let waterArray = pouringWater(arr);

// --- Part 1 --- //

console.log(`The total number of tiles the water can reach is ${sumOfTiles(waterArray)}`);


// --- Part 2 --- //

function sumOfContainedWater(arr) {
    let sum = 0;
    for(let i = gsize.y0; i < gsize.yn; i++) {
        for(let j = gsize.x0; j <= gsize.xn; j++){
            if(arr[i][j] == '~'){
                sum += 1;
            }
        }
    }
    return sum;
}

console.log(`Sum of lefted water tiles is ${sumOfContainedWater(arr)}`);




