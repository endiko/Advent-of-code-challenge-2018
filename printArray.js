module.exports.print = (arr, size) => {
    console.clear();
     for (let j = size.y0 - 1; j < size.yn; j++) {
         let s = '';
         for (let i = size.x0; i < size.xn + 1; i++) {
             s += arr[j][i] + ' ';
         }
         console.log(s);
     }
 }

// Usage import
// const printArray = require('../printArray');
// printArray.print(arrayName, sizeObject)