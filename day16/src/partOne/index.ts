import { shout } from "../utils";
import Heap from "heap-js";

export const partOneShout = async (input = [] as string[]) => {
  shout("Hello from Part One");

  const map = input.map((line) => line.split(""));

  map.forEach((line) => {
    console.log(line.join(""));
  });

  type NodeItem = {
    row: number;
    col: number;
    direction: number[];
    points: number;
    path?: string[][];
  }

  const directions = [
    [-1, 0],  // Up
    [0, 1],   // Right
    [1, 0],   // Down
    [0, -1],  // Left
  ];

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

    // Going forward is 1 point, turning is 1000 points
    const points = dx === currDx && dy === currDy ? 1 : 1001;

    // Create a copy of the current path
    const newPath = node.path ? 
      node.path.map(row => [...row]) : 
      map.map(row => [...row]);

    // Mark the path with a direction indicator
    const marker = dx === 0 ? (dy > 0 ? '>' : '<') : 
                  (dx > 0 ? 'v' : '^');
    newPath[nextRow][nextCol] = marker;

    positions.push({ 
      row: nextRow, 
      col: nextCol, 
      direction: direction,
      points: node.points + points,
      path: newPath
    });
  }

  const startRow = map.length - 2;
  const startCol = 1;

  const nodes = new Heap<NodeItem>((a: NodeItem, b: NodeItem) => a.points - b.points);
  nodes.push({ 
    row: startRow, 
    col: startCol, 
    direction: [0, 1], 
    points: 0,
    path: map.map(row => [...row])
  });
  const visited = new Set<string>();

  const minPoints = (): number => {
    while (nodes.length > 0) {
      const node = nodes.pop() as NodeItem;
      if (checkVisited(visited, node)) continue;
      if (map[node.row][node.col] === "E") {
        console.log('')
        console.log("Final path:");
        console.log('')
        node.path?.forEach(row => console.log(row.join('')));
        console.log(`Points: ${node.points}`);
        return node.points;
      }
      directions.forEach((direction) => tryDirection(nodes, node, direction));
    }
    throw new Error("Didn't find anything :(");
  }

  shout(`Part 1 min points: ${minPoints()}`); 
};
