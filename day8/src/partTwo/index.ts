import { shout } from "../utils";

export const partTwoShout = async (input = [] as string[]) => {
  shout("Hello from Part Two!");
  const startTime = performance.now();

  const visualGrid = input.map(row => [...row]);

  type NodeLocation = {
    row: number, 
    col: number,
  }

  const nodeMap = input.reduce((acc, curr, j) => {
    [...curr].forEach((cell, i) => {
      if (cell !== '.') {
        acc[cell] = acc[cell] ?? [];
        acc[cell].push({row: i, col: j});
      }
    });
    return acc;
  }, {} as {[key: string]: NodeLocation[]});

  const gridWidth = input[0].length;
  const gridHeight = input.length;
  const uniqueAntiNodes = new Set<string>();

  const findDiagonalPoints = (
    loc1: {row: number, col: number}, 
    loc2: {row: number, col: number},
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
    for (let i = 0; i < item.length; i++) {
      for (let j = i + 1; j < item.length; j++) {
        const location1 = item[i];
        const location2 = item[j];

        const endPoints = findDiagonalPoints(location1, location2);

        endPoints.forEach(end => {
          uniqueAntiNodes.add(`${end.row},${end.col}`);
          if (visualGrid[end.col][end.row] === '.') visualGrid[end.col][end.row] = '#';
        });
      }
    }
  }
  
  visualGrid.forEach(row => console.log(row.join('')));

  const endTime = performance.now();
  shout(`Time taken: ${((endTime - startTime)/1000).toFixed(3)} s`);

  shout(`Total unique anti-node locations: ${uniqueAntiNodes.size}`)
};
