import { shout } from "../utils";

export const partOneShout = async (input = [] as string[]) => {
  shout("Hello from Part One");

  const grid = input.map((line) => line.split(''));
  const rowLength = grid.length;
  const colLength = grid[0].length;


  type Cell = {
    row: number;
    col: number;
  }

  type Region = {
    value: string;
    cells: Cell[]
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

      if (localRegion.length > 0) regions.push({ value: cell, cells: localRegion })
    }
  }

  let price = 0;
  regions.forEach(region => {
    let perimeter = 0;
    
    region.cells.forEach(cell => {
      // Check all 4 adjacent positions
      const adjacentPositions = [
        { row: cell.row + 1, col: cell.col },
        { row: cell.row - 1, col: cell.col },
        { row: cell.row, col: cell.col + 1 },
        { row: cell.row, col: cell.col - 1 }
      ];

      adjacentPositions.forEach(pos => {
        // Count as perimeter if:
        // 1. Position is out of bounds, or
        // 2. Position contains a different value
        if (
          pos.row < 0 || 
          pos.row >= rowLength || 
          pos.col < 0 || 
          pos.col >= colLength ||
          grid[pos.row][pos.col] !== region.value
        ) {
          perimeter++;
        }
      });
    });

    price += (region.cells.length * perimeter);    
  });

  shout(`Price: ${price}`);
};
