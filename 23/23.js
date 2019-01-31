// https://adventofcode.com/2018/day/23

const fs = require('fs');

const inputData = fs.readFileSync('23.txt').toString().split('\n').map(str => str.replace(/\r$/, '')).filter(str => str.length > 0);

function makeArrayOfNanorobots(data) {
    let nanorobots = [];

    data.forEach(item => {
        let nanorobot = {};
    
        nanorobot.pos = (/-?\d+,-?\d+,-?\d+/g.exec(item))[0].split(',').map(item => parseInt(item, 10));
        nanorobot.r = parseInt(/r=(\d+)/g.exec(item)[1], 10);
        nanorobots.push(nanorobot);
    })

    return nanorobots;
}

function findMax(array) {
    let maxR = Number.MIN_SAFE_INTEGER;

    array.forEach(nanorobot => {
        if(nanorobot.r > maxR) {
            maxR = nanorobot.r;
        }
    })
    
    return maxR;
}

function findMaxNanorobot(array, maxValue) {
    return array.find(nanorobot => {
        if(nanorobot.r == maxValue) {
            return nanorobot;
        }
    })
}

function filteredArrayOfNanorobots(array, maxNanorobot, maxValue) {
    return array.filter(nanorobot => {
        let dist = Math.abs(maxNanorobot.pos[0] - nanorobot.pos[0]) + 
                   Math.abs(maxNanorobot.pos[1] - nanorobot.pos[1]) + 
                   Math.abs(maxNanorobot.pos[2] - nanorobot.pos[2]);
        if(dist <= maxValue) {
            return nanorobot;
        }
    })
}

// --- Part 1 --- //

let robots = makeArrayOfNanorobots(inputData);
let max = findMax(robots);
let maxRobot = findMaxNanorobot(robots, max);
let filteredRobots = filteredArrayOfNanorobots(robots, maxRobot, max);

console.log(`${filteredRobots.length} nanobots are in range of its signals`);


