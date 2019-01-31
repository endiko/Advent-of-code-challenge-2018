// https://adventofcode.com/2018/day/4

const fs = require('fs');

const inputData = fs.readFileSync('04.txt').toString().split('\n').map(str => str.replace(/\r$/, '')).filter(str => str.length > 0);


function applyRegex (data, regexp) {
    return regexp.exec(data)[1];
}

function findMax(arr) {
    return Math.max.apply(null, arr);
}

function getSubObject() {
    let arr = [];
    for(let i = 0; i < 60; i++) {
        arr[i] = 0;
    }
    return {
        'minutes': arr,
        'total': 0
    }
}

function fillMinutesArray(arr, start, end) {
    for(let i = start; i < end; i++) {
        arr[i] += 1;
    }
    return arr;
}

function makeDataTable(data) {
    let obj = {}; 
    let id = 0, 
        fallAsleep = 0, 
        wakeUp = 0, 
        sleepingTime = 0;
    let regex1 = /:(\d+)/;
    let regex2 = /#(\d+)/;

    for (let i = 0; i < data.length; i++) {
        if(data[i].includes('begins shift')) {
            id = +(applyRegex(data[i], regex2));
            if(obj[id] == undefined) {
                obj[id] = getSubObject();
            }
        } else if(data[i].includes('falls asleep')) {
            fallAsleep = +(applyRegex(data[i], regex1));
        } else if(data[i].includes('wakes up')) {
            wakeUp = +(applyRegex(data[i], regex1));
            sleepingTime = wakeUp - fallAsleep;

            if(obj[id] != undefined) {
                obj[id]['minutes'] = fillMinutesArray(obj[id]['minutes'], fallAsleep, wakeUp);
                obj[id]['total'] += sleepingTime;
            }
        }
    }
    return obj;
}

function calcMaxKey(obj) {
    let maxKey = 0, maxValue = 0;
    for(const key in obj) {
        if(obj[key]['total'] > maxValue) {
            maxValue = obj[key]['total'];
            maxKey = key;
        }
    }
    return maxKey;
}

function calcTheMinute(obj, maxId) {
    let arr= [];
    if(obj.hasOwnProperty(maxId)) {
        arr = obj[maxId]['minutes'];
        for(let i = 0; i < arr.length; i++) {
            if(arr[i] === findMax(arr)) {
                return i;
            }
        }
    }
}

let inputSort = inputData.sort();
let obj = makeDataTable(inputSort);
let maxKey = calcMaxKey(obj);
let theMinute = calcTheMinute(obj, maxKey);
console.log(maxKey * theMinute);

                    // - - - Part 2 - - - //

function calcMostFreqPair(object) {
    let arr = [];
    let maxEl=0, maxMinute = 0, maxMinuteKey = 0, maxMinuteIndex = 0;
    for (const key in object) {
        arr = object[key]['minutes'];
        maxEl = findMax(arr);
        if(maxEl > maxMinute) {
            maxMinute = maxEl;
            maxMinuteKey = key;
        }
    }
    if(object.hasOwnProperty(maxMinuteKey)) {
        let temp = object[maxMinuteKey]['minutes'];
        maxMinuteIndex = temp.indexOf(maxMinute);
    }
    return maxMinuteKey * maxMinuteIndex;
}

let res = calcMostFreqPair(obj);
console.log(res);