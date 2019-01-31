// https://adventofcode.com/2018/day/18

const fs = require('fs');
//const md5 = require('md5');
const makeArray = require('../createArray');

const inputData = fs.readFileSync('18.txt').toString().split('\n').map(str => str.replace(/\r$/, '')).filter(str => str.length > 0).map(item => item.split(''));


function checkOpenAcre(x, y, array) {
     let count = 0;
     for(let i = y - 1; i < y + 2; i++) {
          for(let j = x - 1; j < x + 2; j++) {
               if(i >= 0 && j >= 0 && (i < array.length && j < array.length)) { 
                    if(array[i][j] == '|') {
                         count++;
                    }
               }
          }
     }
     return (count >= 3) ? '|' : '.';
}

function checkTreeAcre(x, y, array) {
     let count = 0;
     for(let i = y - 1; i < y + 2; i++) {
          for(let j = x - 1; j < x + 2; j++) {
               if(i >= 0 && j >= 0 && (i < array.length && j < array.length)) { 
                    if( array[i][j] == '#') {
                         count++;
                    }
               }
          }
     }
     return (count >= 3) ? '#' : '|';
}

function checkLumbyardAcre(x, y, array) {
     let tcount = 0, lcount = 0;
     for(let i = y - 1; i < y + 2; i++) {
          for(let j = x - 1; j < x + 2; j++) {
               if(i >= 0 && j >= 0 && (i < array.length && j < array.length)) { 
                    if(array[i][j] == '|') {
                         tcount++;
                    } else if(array[i][j] == '#') {
                         lcount++;
                    }
               } 
          }
     }
     return (tcount >= 1 && lcount > 1) ? '#' : '.';
}

function lumberCollec(inputData, minutes) {
     let inputArray = inputData;
     let round = 1;
     while(round < minutes + 1) {
          let arr = makeArray.NxM(inputData.length, inputData.length);
          
          for(let i = 0; i < inputArray.length; i++) {
               for(let j = 0; j < inputArray[i].length; j++) {
                    if(inputArray[i][j] == '.'){
                         arr[i][j] = checkOpenAcre(j, i, inputArray);
                    } else if(inputArray[i][j] == '|') {
                         arr[i][j] = checkTreeAcre(j, i, inputArray);
                    } else if(inputArray[i][j] == '#') {
                         arr[i][j] = checkLumbyardAcre (j, i, inputArray);
                    } else {
                         arr[i][j] = inputArray[i][j];
                    }
               }
          }
          round++;
          inputArray = arr;
     }
     return inputArray;
}

function calcLumberCollecValue(array) {
     let ctree = 0, clumber = 0;
     for(let i = 0; i < array.length; i++) {
          for(let j = 0; j < array.length; j++) {
               if(array[i][j] == '|') ctree++;
               else if(array[i][j] == '#') clumber++;
          }
     }
     return ctree * clumber;
}

// --- Part 1 --- //

let res = lumberCollec(inputData, 10);
console.log(calcLumberCollecValue(res));
