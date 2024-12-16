import { shout } from "../utils";
import Heap from "heap-js";

export const partTwoShout = async (input = [] as string[]) => {
  shout("Hello from Part Two!");

  const startTime = performance.now();
  const map = input.map((line) => line.split(""));

  type NodeItem = {
    row: number;
    col: number;
    direction: number[];
    points: number;
    moves?: [number, number][];
  }

  const directions = [
    [-1, 0],  // Up
    [0, 1],   // Right
    [1, 0],   // Down
    [0, -1],  // Left
  ];

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

    positions.push({ 
      row: nextRow, 
      col: nextCol, 
      direction: direction,
      points: node.points + points,
      moves: node.moves ? [...node.moves, [nextRow, nextCol]] : [[nextRow, nextCol]]
    });
  }

  const minPoints = (): { minScore: number, allPaths: NodeItem[] } => {
    const nodes = new Heap<NodeItem>((a: NodeItem, b: NodeItem) => a.points - b.points);
    nodes.push({ 
        row: map.length - 2, 
        col: 1, 
        direction: [0, 1], 
        points: 0,
        moves: []
    });
    
    // Instead of a visited set, keep track of best scores for each position+direction
    const bestScores = new Map<string, number>();
    let minScore = Infinity;
    const allPaths: NodeItem[] = [];

    while (nodes.length > 0) {
        const node = nodes.pop() as NodeItem;
        const key = `${node.row}|${node.col}|${node.direction[0]}|${node.direction[1]}`;
        
        // If we've found paths and this node's points exceed minScore, skip it
        if (minScore < Infinity && node.points > minScore) continue;
        
        // If we've seen this position+direction before with a better score, skip it
        const previousBest = bestScores.get(key);
        if (previousBest !== undefined && previousBest < node.points) continue;
        
        // Update the best score for this position+direction
        bestScores.set(key, node.points);

        // If we've reached the end, check if it's a new minimum path
        if (map[node.row][node.col] === "E") {
            if (node.points < minScore) {
                minScore = node.points;
                allPaths.length = 0;
            }
            allPaths.push(node);
            continue;
        }

        directions.forEach((direction) => tryDirection(nodes, node, direction));
    }
    
    return { minScore, allPaths };
  };

  const { minScore, allPaths } = minPoints();
  shout(`Found ${allPaths.length} paths with score ${minScore}`);

  // Collect all tiles that are part of any minimum path
  const minPathTiles = new Set<string>();

  // Explicitly add start and end positions
  minPathTiles.add(`${map.length - 2}|1`);  // Start position
  minPathTiles.add(`1|${map[0].length - 2}`);  // End position

  // Add all other path tiles
  allPaths.forEach(path => {
    path.moves?.forEach(([r, c]) => {
        minPathTiles.add(`${r}|${c}`);
    });
  });

  shout(`Number of tiles in minimum paths: ${minPathTiles.size}`);

  // After collecting minPathTiles, create and display the visualization
  const visualizeMinPaths = map.map(row => [...row]);
  minPathTiles.forEach(pos => {
    const [r, c] = pos.split('|').map(Number);
    if (visualizeMinPaths[r][c] !== '#') {
        visualizeMinPaths[r][c] = 'O';
    }
  });

  console.log('\nAll tiles that are part of any minimum path:');
  console.log('')
  visualizeMinPaths.forEach(row => console.log(row.join('')));
  
  const endTime = performance.now();
  shout(`Time taken: ${((endTime - startTime)/1000).toFixed(3)} s`); 
};
