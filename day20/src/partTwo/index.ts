import { shout } from "../utils";
import Heap from "heap-js";

export const partTwoShout = async (input = [] as string[]) => {
  shout("Hello from Part Two!");

  let start = [0, 0];
  let end = [0, 0];

  const map = input.map((line) => {
    const row = line.split("");
    if (row.includes("S")) start = [input.indexOf(line), row.indexOf("S")];
    if (row.includes("E")) end = [input.indexOf(line), row.indexOf("E")];
    return row;
  });

  type Move = { row: number, col: number, count: number }

  type NodeItem = {
    row: number;
    col: number;
    direction: number[];
    steps: number;
    moves: Move[];
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

    positions.push({ 
      row: nextRow, 
      col: nextCol, 
      direction: direction,
      steps: node.steps + 1,
      moves: node.moves ? 
        [...node.moves, { row: nextRow, col: nextCol, count: node.steps + 1 }] : 
        [{ row: nextRow, col: nextCol, count: node.steps + 1 }]
    });
  }

  const navigate = (): { steps: number, moves: Move[] } => {
    const nodes = new Heap<NodeItem>((a: NodeItem, b: NodeItem) => a.steps - b.steps);
    nodes.push({ 
      row: start[0], 
      col: start[1], 
      direction: [0, 1], 
      steps: 0,
      moves: [{ row: start[0], col: start[1], count: 0 }]
    });
    const visited = new Set<string>();

    while (nodes.length > 0) {
      const node = nodes.pop() as NodeItem;
      if (checkVisited(visited, node)) continue;
      if (node.row === end[0] && node.col === end[1]) {
        return { steps: node.steps, moves: node.moves || [] };
      }
      directions.forEach((direction) => tryDirection(nodes, node, direction));
    }
    throw new Error("Didn't find anything :(");
  }

  const { steps, moves } = navigate();
  shout(`Path length: ${steps}`);

  // Find other moves within a manhattan distance of 20
  const jumpMap = new Map<number, number>();
  moves.forEach((move) => {
    const otherMoves = moves.filter(m => Math.abs(m.row - move.row) + Math.abs(m.col - move.col) <= 20);
    otherMoves.forEach((otherMove) => {   
      const manhattanDistance = Math.abs(otherMove.row - move.row) + Math.abs(otherMove.col - move.col)
      const stepsSkipped = otherMove.count - move.count - manhattanDistance;
      if (stepsSkipped > 0) {
        jumpMap.set(stepsSkipped, (jumpMap.get(stepsSkipped) || 0) + 1);
      }
    });
  });


  let numCheats = 0;
  const sortedJumpMap = Array.from(jumpMap.entries()).sort((a, b) => a[0] - b[0]);
  sortedJumpMap.forEach(([key, value]) => {
 
    if (key >= 100) numCheats += value;
  });
  shout(`Number of cheats: ${numCheats}`);
};
