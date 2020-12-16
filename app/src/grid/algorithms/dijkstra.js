export default function Dijkstra(grid,start,finish) {
    start.weight = 0
    let visitedNodes = []
    let unVisited = grid.flat()
    while(unVisited.length()){
        unVisited = sortByWeight(unVisited)
        let closestNode = unVisited.shift();
        if(closestNode.isWall) continue;
        if(closestNode.weight === Infinity) return visitedNodes;
        closestNode.visited = true;
        visitedNodes.push(closestNode);
        if(closestNode === finish) return visitedNodes;
        for(let node of getUnvisitedNeighbors(closestNode,grid)) {
            node.weight = closestNode.weight+1;
            node.parent = closestNode;
        }
    }
    console.log(visitedNodes)
}
function getUnvisitedNeighbors(node,grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0)                  neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1)    neighbors.push(grid[row + 1][col]);
    if (col > 0)                  neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);  
}
function sortByWeight(x) {
    return x.sort((a,b)=>a.weight-b.weight)
}