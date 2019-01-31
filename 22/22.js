// https://adventofcode.com/2018/day/22

const depth = 9171;
const targetCoordinatesX = 7, 
      targetCoordinatesY = 721;

function regions(cX, cY, depth) {
    let regionsType = [];
    let erosionLevel = [];

    for(let y = 0; y < cY + 1; y++) {
        erosionLevel[y] = []; 
        regionsType[y] = [];
        for(let x = 0; x < cX + 1; x++) {
            if((y == 0 && x == 0) || (y == cY && x == cX)) {
                erosionLevel[y][x] = depth % 20183;
            } else if(y == 0) {
                erosionLevel[y][x] = (x * 16807 + depth) % 20183;
            } else if(x == 0) {
                erosionLevel[y][x] = (y * 48271 + depth) % 20183;
            } else {
                erosionLevel[y][x] = (erosionLevel[y][x - 1] * erosionLevel[y - 1][x] + depth) % 20183;
            }
            regionsType[y][x] = erosionLevel[y][x] % 3;
        }
    }

    return regionsType;
}

function totalSum(arr) {
    let sum = 0;

    arr.forEach(item => {
        sum += item.reduce((prev, next) => prev + next);
    })

    return sum;
}

let allRegions = regions(targetCoordinatesX, targetCoordinatesY, depth);

// --- Part 1 --- //

console.log(`Total risk level for the smallest rectangle that includes 0,0 and the target's coordinates is ${totalSum(allRegions)}`);