// https://adventofcode.com/2018/day/12

const fs = require('fs');
const md5 = require('md5');

const inputData = fs.readFileSync('12.txt').toString().split('\n').map(i => i.replace(/\r$/, '')).filter(i => i.length > 0);
const initialState = inputData[0].replace(/\w+/g, '').split('').filter(i => i != ' ' && i != ':').join('');
const templates = inputData.splice(1).filter(item => item[item.length-1] == '#').map(item => item.substring(0, 5));

String.prototype.replaceAt = function (index, replaceSymbol) {
    return this.substr(0, index) + replaceSymbol + this.substr(index + 1);
}

function sumOfGen(str, counter) {
    let sum = 0;

    for(let i = 0; i < str.length; i++) {
        if(str[i] == '#') {
            sum += i - counter;
        }
    }
    return sum;
}

// --- Part 1 --- //

function findGeneration(input, template, genNum) {
    let curGen = '...' + input + '...';
    let counter = 3;
    
    for(let i = 0; i < genNum; i++) {
        let newGen = '';
        for(let j = 0; j < curGen.length; j++) {
            newGen += '.'
        }
        template.forEach(item => {
            let idx = curGen.indexOf(item);
            while(idx !== -1) {
                newGen = newGen.replaceAt(idx + 2, '#');
                idx = curGen.indexOf(item, idx + 1);
            }
        })
        if(newGen[2] == '#') {
            newGen = '.' + newGen;
            counter++;
        } else{
            let index = newGen.indexOf('#');
            newGen = newGen.substring(index - 3);
            counter -= index - 3;
        }
        if(newGen[newGen.length - 3] == '#') {
            newGen = newGen + '.';
        }
        curGen = newGen;
    }
    return sumOfGen(curGen, counter);
}


let smallGen = 20;
let sum = findGeneration(initialState, templates, smallGen);
console.log(`After ${smallGen} generations the sum of the numbers of all pots which contain a plant is ${sum}`);

// --- Part 2 ---//

// Sn = Sm + (n - m)*dx

let hashStore = [];
let bigGen = 50000000000;

function findGenerationExt(input, template, genNum) {
    let curGen = '...' + input + '...';
    let counter = 3;
    let targetGen = 0;
    
    for(let i = 0; i < genNum; i++) {
        let newGen = '';
        for(let j = 0; j < curGen.length; j++) {
            newGen += '.'
        }
        template.forEach(item => {
            let idx = curGen.indexOf(item);
            while(idx !== -1) {
                newGen = newGen.replaceAt(idx + 2, '#');
                idx = curGen.indexOf(item, idx + 1);
            }
        })
        if(newGen[2] == '#') {
            newGen = '.' + newGen;
            counter++;
        } else{
            let index = newGen.indexOf('#');
            newGen = newGen.substring(index - 3);
            counter -= index - 3;
        }
        if(newGen[newGen.length - 3] == '#') {
            newGen = newGen + '.';
        }
        curGen = newGen;

        let curHash = md5(curGen);

        if(!hashStore.hasOwnProperty(curHash)) {
            hashStore[curHash] = curGen;
        } else {
            curGen = hashStore[curHash];
            targetGen = i - 1;
            break;
        }   
    }

    let arr = Object.values(hashStore);
    let n = arr.length;
    let curSum = sumOfGen(curGen, counter);
    let prevSum = sumOfGen(arr[n - 2], counter); 
    
    return (curSum + (bigGen - targetGen) * Math.abs(curSum - prevSum));
}

let res = findGenerationExt(initialState, templates, bigGen);
console.log(`After fifty billion (${bigGen}) generations the sum of numbers of all pots which contain a plant is ${res}`); // The answer should be 3250000000956, but mine is 3150000001300(((
