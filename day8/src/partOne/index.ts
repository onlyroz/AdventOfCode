import { shout } from "../utils";

export const partOneShout = async (input = [] as string[]) => {
  shout("Hello from Part One");
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
    loc2: {row: number, col: number}
  ) => {
    const dx = loc2.row - loc1.row;
    const dy = loc2.col - loc1.col;
    
    const end1 = { row: loc1.row - dx, col: loc1.col - dy };
    const end2 = { row: loc2.row + dx, col: loc2.col + dy };

    return [end1, end2].filter(end => end.row >= 0 && end.row < gridWidth 
      && end.col >= 0 && end.col < gridHeight);;
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
