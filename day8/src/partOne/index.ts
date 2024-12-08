import { shout } from "../utils";

export const partOneShout = async (input = [] as string[]) => {
  shout("Hello from Part One");

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

  const findDiagonalEndPoints = (
    loc1: {row: number, col: number}, 
    loc2: {row: number, col: number},
    gridWidth: number,
    gridHeight: number
  ) => {
    const dx = loc2.row - loc1.row;
    const dy = loc2.col - loc1.col;
    
    const end1 = { row: loc1.row - dx, col: loc1.col - dy };
    const end2 = { row: loc2.row + dx, col: loc2.col + dy };

    return [end1, end2].filter(end => end.row >= 0 && end.row < gridWidth 
      && end.col >= 0 && end.col < gridHeight);;
  };

  for (const item of Object.values(nodeMap)) {
    for (let i = 0; i < item.nodeLocations.length; i++) {
      for (let j = i + 1; j < item.nodeLocations.length; j++) {
        const location1 = item.nodeLocations[i];
        const location2 = item.nodeLocations[j];

        const endPoints = findDiagonalEndPoints(location1, location2, gridWidth, gridHeight);

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
