const fs = require('fs');

let data = fs.readFileSync('./07.txt', 'utf8').split('\n');
const pattern = /Step (\w) must be finished before step (\w) can begin./;

class Graph {
  constructor() {
    this.adjList = new Map();
  }

  addVertex(v) {
    if (!this.adjList.has(v)) {
      this.adjList.set(v, []);
    }
  }
  addEdge(v, w) {
    this.adjList.get(v).push(w);
  }
  getSize() {
    console.log(this.adjList.size);
  }
  printGraph() {
    let keys = this.adjList.keys();
    for (let i of keys) {
      let vals = this.adjList.get(i);
      let str = '';
      for (let j of vals) {
        str += `${j} `;
      }
      console.log(`${i} -> [ ${str}]`);
    }
  }

  findPath() {
    let filtered = [];
    let searchQueue = [];
    let visited = [];

    for (let key of this.adjList.keys()) {
      let itHas = false;

      for (let value of this.adjList.values()) {
        if (value.includes(key)) {
          itHas = true;
          break;
        }
      }
      if (!itHas) {
        if (!filtered.includes(key)) {
          filtered.push(key);
        }
      }
    }

    searchQueue = filtered.sort();

    while (searchQueue.length) {
      let parent = searchQueue[0];
      let children = this.adjList.get(parent) || [];
      this.adjList.delete(parent);

      let filteredChildren = [];

      if (children.length) {
        filteredChildren = children.filter(el => {
          for (let value of this.adjList.values()) {
            if (value.includes(el)) {
              return false;
            }
          }
          return true;
        });
      }

      searchQueue.shift();

      if (!visited.includes(parent)) visited.push(parent);

      if (filteredChildren.length) {
        searchQueue.push(...filteredChildren);
        searchQueue.sort();
      }
    }
    console.log(visited.join(''));
    return visited;
  }
}

data = data.map(i => {
  let arr = pattern.exec(i);
  let res = [];
  res.push(arr[1], arr[2]);
  return res;
});

let graph = new Graph();

data.forEach(item => {
  graph.addVertex(item[0]);
  graph.addEdge(item[0], item[1]);
});

graph.findPath();
