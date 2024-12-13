import { shout } from "../utils";

export const partTwoShout = async (input = [] as string[]) => {
  shout("Hello from Part Two!");

  function findPrices(regions: Region[]): number {

    const coords = new Map();

    const directions = [
      [-1, 0],  // Up
      [0, 1],   // Right
      [1, 0],   // Down
      [0, -1],  // Left
    ];
    
    let results = 0;
  
    regions.forEach(region => {
      let sides = 0;

      region.cells.forEach(cell => {

        const point = `${cell.row},${cell.col}`;
        coords.set(point, []);
        
        // Check each direction for boundaries
        directions.forEach(([dRow, dCol], ind) => {
          const row = cell.row;
          const col = cell.col;
         
          // If there's a boundary (different value) in the current direction record as a boundary
          if (grid[row + dRow]?.[col + dCol] !== grid[row][col]) {

            // Calculate positions of cells to the "left" and "right" relative to current direction
            // e.g., if going up, check the diagonal cells to either side
            const left = [row + directions[(ind + 1) % 4][0], col + directions[(ind + 1) % 4][1]];
            const right = [row + directions[(ind + 3) % 4][0], col + directions[(ind + 3) % 4][1]];

            coords.set(point, [...coords.get(point), ind]);
            const leftPoint = left.toString();
            const rightPoint = right.toString();
            
            // Check if the left adjacent cell is outside the region or hasn't been processed
            const leftOutside = !region.cells.some(c => `${c.row},${c.col}` === leftPoint) ||
                      !coords.get(leftPoint)?.includes(ind);
                      
            // Same check for the right adjacent cell
            const rightOutside = !region.cells.some(c => `${c.row},${c.col}` === rightPoint) ||
                      !coords.get(rightPoint)?.includes(ind);
            
            // If both adjacent cells are "outside", this is an exposed edge or corner
            if (leftOutside && rightOutside) sides++;

            // If both adjacent cells are "inside", this is an internal boundary
            else if (!leftOutside && !rightOutside) sides--;
          }
        });
      }); 

      results += sides * region.cells.length;
    });
  
    return results;
  }

  const grid = input.map((line) => line.split(''));
  const rowLength = grid.length;
  const colLength = grid[0].length;

  type Cell = {
    row: number;
    col: number;
    direction?: number[];
  }

  type Region = {
    value: string;
    cells: Cell[]
    perimeterCells: Set<Cell>
  }

  const visited = new Set<string>();
  const regions = [] as Region[];

  for (let row = 0; row < rowLength; row++) {
    for (let col = 0; col < colLength; col++) {
      const cell = grid[row][col];

      const localRegion = [] as Cell[];
      
      const queue = [] as Cell[];
      queue.unshift({ row, col });

      while (queue.length > 0) {
        const { row, col } = queue.pop()!;

        // If the cell is out of bounds, skip it
        if (row < 0 || row >= rowLength || col < 0 || col >= colLength) continue;

        // If the cell has been visited, skip it
        if (visited.has(`${row},${col}`)) continue;

        // If the cell is not the same as the current cell, skip it
        const visitedCell = grid[row][col];
        if (visitedCell !== cell) continue;

        // If the cell is the same as the current cell, add it to the visited set
        visited.add(`${row},${col}`);
        localRegion.push({ row, col });

        // Add the adjacent cells to the queue
        queue.unshift({ row: row + 1, col });
        queue.unshift({ row: row - 1, col });
        queue.unshift({ row, col: col + 1 });
        queue.unshift({ row, col: col - 1 });
      }

      if (localRegion.length > 0) regions.push({ value: cell, cells: localRegion, perimeterCells: new Set() })
    }
  }

  const sideCount = findPrices(regions);
  shout(`Side Count: ${sideCount}`);
};
