import { shout } from "../utils";

export const partTwoShout = async (input = [] as string[]) => {
  shout("Hello from Part Two!");

  const visualGrid = input.map(row => [...row]);

  type NodeItem = {
    nodeLocations: {row: number, col: number}[],
    antiNodeLocations: {row: number, col: number}[]
  }
  const nodeMap = input.reduce((acc, curr, y) => {
    [...curr].forEach((cell, x) => {
      if (cell !== '.') {
        acc[cell] = acc[cell] ?? {
          nodeLocations: [], 
          antiNodeLocations: []
        };
        acc[cell].nodeLocations.push({row: x, col: y});
      }
    });
    return acc;
  }, {} as {[key: string]: NodeItem});

  const gridWidth = input[0].length;
  const gridHeight = input.length;
  const uniqueAntiNodes = new Set<string>();

  const findDiagonalPoints = (
    loc1: {row: number, col: number}, 
    loc2: {row: number, col: number},
    gridWidth: number,
    gridHeight: number
  ): {row: number, col: number}[] => {
    const dx = loc2.row - loc1.row;
    const dy = loc2.col - loc1.col;
    
    const points: {row: number, col: number}[] = [];
    
    // Start from the furthest valid point in one direction
    let currentRow = loc1.row;
    let currentCol = loc1.col;
    
    // Move backwards until we hit the grid boundary
    while (currentRow >= 0 && currentRow < gridWidth && 
           currentCol >= 0 && currentCol < gridHeight) {
      points.push({row: currentRow, col: currentCol});
      currentRow -= dx;
      currentCol -= dy;
    }
    
    // Reset to starting point and move forwards
    currentRow = loc1.row + dx;
    currentCol = loc1.col + dy;
    
    // Move forwards until we hit the grid boundary
    while (currentRow >= 0 && currentRow < gridWidth && 
           currentCol >= 0 && currentCol < gridHeight) {
      points.push({row: currentRow, col: currentCol});
      currentRow += dx;
      currentCol += dy;
    }
    
    return points;
  };

  for (const item of Object.values(nodeMap)) {
    for (let i = 0; i < item.nodeLocations.length; i++) {
      for (let j = i + 1; j < item.nodeLocations.length; j++) {
        const location1 = item.nodeLocations[i];
        const location2 = item.nodeLocations[j];

        const endPoints = findDiagonalPoints(location1, location2, gridWidth, gridHeight);

        endPoints.forEach(end => {
          item.antiNodeLocations.push(end);
          uniqueAntiNodes.add(`${end.row},${end.col}`);
          if (visualGrid[end.col][end.row] === '.') visualGrid[end.col][end.row] = '#';
        });
      }
    }
  }
  
  visualGrid.forEach(row => console.log(row.join('')));

  shout(`Total unique anti-node locations: ${uniqueAntiNodes.size}`)
};
