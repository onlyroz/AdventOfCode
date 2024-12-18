import { shout } from "../utils";
import Heap from "heap-js";

export const partTwoShout = async (input = [] as string[]) => {
  shout("Hello from Part Two!");
  const startTime = performance.now();

  const map = Array(71).fill('.').map(() => Array(71).fill('.'));
  const start = [0,0];
  const end = [70,70];

  input.forEach((item, idx) => {
    if (idx < 1024) {
      const [col, row] = item.split(',').map(Number);
      map[row][col] = '#'
    }
  });

  const directions = [
    [-1, 0],  // Up
    [0, 1],   // Right
    [1, 0],   // Down
    [0, -1],  // Left
  ];

  type NodeItem = {
    row: number;
    col: number;
    direction: number[];
    steps: number;
  }

  const checkVisited = (visited: Set<string>, node: NodeItem) => {
    const key = `${node.row}-${node.col}-${node.direction[0]}-${node.direction[1]}`
    if (visited.has(key)) return true
    visited.add(key)
    return false
  }

  const tryDirection = (
    positions: Heap<NodeItem>,
    node: NodeItem,
    direction: number[]
  ): void => {
    const [currDx, currDy] = node.direction;
    const [dx, dy] = direction;
    const nextRow = node.row + dx;
    const nextCol = node.col + dy;

    // Boundary check
    if (nextRow < 0 || nextRow >= map.length || 
      nextCol < 0 || nextCol >= map[0].length) return;

    // Wall check
    if (map[nextRow][nextCol] === "#") return;

    // Backwards check
    if (dx === -currDx && dy === -currDy) return;

    positions.push({ 
      row: nextRow, 
      col: nextCol, 
      direction: direction,
      steps: node.steps + 1,
    });
  }

  const nodes = new Heap<NodeItem>(
    (a: NodeItem, b: NodeItem) => a.steps - b.steps);
  nodes.push({
    row: start[0],
    col: start[1],
    direction: [0,1],
    steps: 0
  });
  let visited = new Set<string>();

  const minPath = (): boolean => {
    while (nodes.length > 0) {
      const node = nodes.pop() as NodeItem;
      if (checkVisited(visited, node)) continue;
      if (node.row === end[0] && node.col === end[1]) {
        return true;
      }
      directions.forEach((direction) => tryDirection(nodes, node, direction));
    }
    return false;
  }

  let counter = 1023;
  do {
    counter++;
    const [col, row] = input[counter].split(',').map(Number);
    map[row][col] = '#';

    nodes.push({
      row: start[0],
      col: start[1],
      direction: [0,1],
      steps: 0
    });
    visited = new Set<string>();
    
  } while (minPath())

  shout(`Tiles: ${input[counter]}`);

  const endTime = performance.now();
  shout(`Time taken: ${((endTime - startTime)/1000).toFixed(3)} s`); 
};
