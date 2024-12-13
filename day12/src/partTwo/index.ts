import { shout } from "../utils";

export const partTwoShout = async (input = [] as string[]) => {
  shout("Hello from Part Two!");

  function getDirections(dx: number, dy: number): [number, number, number][] {
    if (dx === 0) {
      // Going horizontally (right or left)
      const side = dy; // will be 1 for right, -1 for left
      return [
        [-1 * side, 0, 1],  // turn up
        [0, dy, 0],         // straight
        [1 * side, 0, 1],   // turn down
        [0, -dy, 2]         // turn back
      ];
    } else {
      // Going vertically (down or up)
      const side = dx; // will be 1 for down, -1 for up
      return [
        [0, 1 * side, 1],   // turn right
        [dx, 0, 0],         // straight
        [0, -1 * side, 1],  // turn left
        [-dx, 0, 2]         // turn back
      ];
    }
  }

  const grid = input.map((line) => line.split(''));
  const rowLength = grid.length;
  const colLength = grid[0].length;

  const directions = [
    [-1, 0],  // Up
    [1, 0],   // Down
    [0, -1],  // Left
    [0, 1],   // Right
  ];

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

  let price = 0;
  regions.forEach(region => {
    let corners = 0; // Start with 1 for the starting corner
    
    region.cells.forEach(cell => {
      // Check all 8 adjacent positions
      const adjacentPositions = [
        { row: cell.row + 1, col: cell.col },
        { row: cell.row - 1, col: cell.col },
        { row: cell.row, col: cell.col + 1 },
        { row: cell.row, col: cell.col - 1 },
        { row: cell.row + 1, col: cell.col + 1 },
        { row: cell.row + 1, col: cell.col - 1 },
        { row: cell.row - 1, col: cell.col + 1 },
        { row: cell.row - 1, col: cell.col - 1 },
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
          region.perimeterCells.add(cell);
        }
      });
    });

    if (region.cells.length === 1) {
      corners = 4;
    } else {
      const visited = new Set<string>();
      let currentDirection = [0, 1]; // Start by going right
      let currentRow = Array.from(region.perimeterCells)[0].row;
      let currentCol = Array.from(region.perimeterCells)[0].col;
      const startPos = `${currentRow},${currentCol}`;

      // Track unique perimeter positions we've visited
      const visitedPositions = new Set<string>();
      const perimeterPositions = new Set(Array.from(region.perimeterCells).map(p => `${p.row},${p.col}`));

      const perimeterQueue = [] as Cell[];
      perimeterQueue.unshift({ row: currentRow, col: currentCol, direction: currentDirection });

      while (perimeterQueue.length > 0) {
        const { row, col, direction } = perimeterQueue.pop()!;
        const [dx, dy] = direction!;
        const cellKey = `${row},${col},${dx},${dy}`;
        const pos = `${row},${col}`;

        if (region.cells.length === 1) {
          corners = 4;
          break;
        } 

        visitedPositions.add(pos);

        // If we're back at the start and we've visited all perimeter cells, we're done
        if (pos === startPos && visited.size > 0) {
          // Check if we've visited all perimeter positions
          let allVisited = true;
          for (const perimPos of perimeterPositions) {
            if (!visitedPositions.has(perimPos)) {
              allVisited = false;
              break;
            }
          }
          
          if (allVisited) {
            const diffRow = currentDirection[0] - dx;
            const diffCol = currentDirection[1] - dy;

            if (diffRow === 0 && diffCol === 2) corners += 2;
            else if (diffRow === 2 && diffCol === 0) corners += 2;
            else corners++;
            break;
          }
        }

        visited.add(cellKey);

        // Try directions in this order:
        const possibleDirections = getDirections(dx, dy);

        let foundNext = false;
        for (const dir of possibleDirections) {
          const nextRow = row + dir[0];
          const nextCol = col + dir[1];
          
          const visitKey = `${nextRow},${nextCol},${dir[0]},${dir[1]}`;

          // Check if this is a valid perimeter cell we haven't visited from this direction
          if (Array.from(region.perimeterCells).some(p => p.row === nextRow && p.col === nextCol) && 
              !visited.has(visitKey)) {
            // If we changed direction, we've found a corner
            if (dir[0] !== dx || dir[1] !== dy) {
              corners += dir[2];
            }
            perimeterQueue.push({ 
              row: nextRow, 
              col: nextCol, 
              direction: dir 
            });
            foundNext = true;
            break;
          }
        }
      }
    }

    price += (region.cells.length * corners);
  //  console.log(`Region ${region.value} at (${region.cells[0].row},${region.cells[0].col}): Size=${region.cells.length}, Corners=${corners}, Price=${region.cells.length * corners}`);
  });

  shout(`Price: ${price}`);
};
