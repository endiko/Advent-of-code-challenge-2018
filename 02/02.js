// https://adventofcode.com/2018/day/2

const fs = require('fs');

const inputData = fs.readFileSync('02.txt').toString().split('\n').map(str => str.replace(/\r$/, '')).filter(str => str.length > 0);

let arr = inputData;

function compareItemsAndMakingObject(item, object) {
    if(object[item] != undefined) {
        ++object[item];
    } else {
        object[item] = 1;
    }
}

function findingChecksum(array) {
    let resArr = [];
    let two = 0, 
        three = 0;

    array.forEach(item => {
        let obj = {};
        let obj2 = {};
        let splittingArray = item.split('');

        splittingArray.forEach(elem => {
            compareItemsAndMakingObject(elem, obj);
            return obj;
        });

        let objectValuesArray = Object.values(obj);
        
        objectValuesArray.forEach(item => {
            if(item == 2 || item == 3) {
                compareItemsAndMakingObject(item, obj2);
            }
            return obj2;
        })
        resArr.push(obj2);
    })
    
    resArr.forEach(item => {
        for(const key in item) {
            if (key == 2) {
                two++;
            } else if(key == 3) {
                three++;
            }
        }
    })
    
    return two * three;
}

console.log(findingChecksum(arr));

// - - - Part 2 - - - //

let compareArray = ['abcde', 'fghij', 'klmno', 'pqrst', 'fguij', 'axcye', 'wvxyz'];

function compareTwoArrays(arrOne, arrTwo) {
    let resArr =  arrOne.filter(indx => arrTwo.indexOf(indx) != -1);

    return resArr;
}

function crossArray(array1, array2) {
    let resArr = [];
    let len = array1.length;

    for(let i = 0; i < len; i++) {
        if(array1[i] === array2[i]) {
            resArr.push(array1[i])
        }
    }
    return resArr;
}

function commonLetters(array) {
    let resultingArray = [];
    let maxLength = array[0].length;
    let arr = array.map(item => {
        return item.split('');
    })

    for(let i = 0; i < arr.length - 1; i++) {
        for(let j = i + 1; j < arr.length; j++) {
            let temp = crossArray(arr[i], arr[j]);
            if(temp.length > 0) {
                resultingArray.push(temp);
            } 
        }
    }    

    let resStr = (resultingArray.find(item => {
        if(item.length === maxLength - 1) {
            return item;
        }
    })).join('');

    return resStr;
}

console.log(commonLetters(arr));

