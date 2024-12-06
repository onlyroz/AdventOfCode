import { shout } from "../utils";

type Direction = 'up' | 'down' | 'left' | 'right';
type Position = { row: number; col: number };

const DIRECTIONS = {
  up: { row: -1, col: 0 },
  down: { row: 1, col: 0 },
  left: { row: 0, col: -1 },
  right: { row: 0, col: 1 },
};

const NEXT_DIRECTION = {
  up: 'right',
  right: 'down',
  down: 'left',
  left: 'up',
};

export const partTwoShout = async (input: string[]) => {
  const startTime = performance.now();

  // Parse grid and find starting position
  let startRow = 0, startCol = 0;
  const grid = input.map((line, row) => {
    const cols = line.split('');
    const guardCol = cols.findIndex(c => c === '^');
    if (guardCol !== -1) {
      startRow = row;
      startCol = guardCol;
    }
    return cols.map(c => c === '.' ? ' ' : c);
  });

  // Walk the path and track visited positions
  const visited = new Set<string>();
  const walk = (row: number, col: number, direction: Direction, trackPath = true) => {
    let currentRow = row;
    let currentCol = col;
    let currentDir = direction;
    const seen = new Set<string>();

    while (true) {
      // Calculate next position
      const delta = DIRECTIONS[currentDir];
      const nextRow = currentRow + delta.row;
      const nextCol = currentCol + delta.col;

      // Check bounds
      if (nextRow < 0 || nextRow >= grid.length || nextCol < 0 || nextCol >= grid[0].length) {
        break;
      }

      // Handle wall/turn
      if (grid[nextRow][nextCol] === '#') {
        currentDir = NEXT_DIRECTION[currentDir] as Direction;
        continue;
      }

      // Move to next position
      currentRow = nextRow;
      currentCol = nextCol;

      const posWithDir = `${currentRow},${currentCol},${currentDir}`;
      if (!trackPath && seen.has(posWithDir)) {
        return true;
      }

      if (trackPath) {
        visited.add(`${currentRow},${currentCol}`);
        if (!['o', '^', '+'].includes(grid[currentRow][currentCol])) {
          grid[currentRow][currentCol] = currentDir === 'up' || currentDir === 'down' ? '|' : '-';
        }
      }
      seen.add(posWithDir);
    }
    return false;
  };

  // First pass: track the initial path
  walk(startRow, startCol, 'up');

  // Second pass: check each visited position for loops
  const loops = Array.from(visited).reduce((count, pos) => {
    const [row, col] = pos.split(',').map(Number);
    const original = grid[row][col];
    
    grid[row][col] = '#';
    const isLoop = walk(startRow, startCol, 'up', false);
    grid[row][col] = isLoop ? 'o' : original;
    
    return count + (isLoop ? 1 : 0);
  }, 0);

  const endTime = performance.now();
  
  shout(`Visited positions: ${visited.size}`);
  shout(`Found loops: ${loops}`);
  shout(`Time taken: ${((endTime - startTime)/1000).toFixed(2)} s`);
  console.log(grid.map((r) => r.join('')).join('\n')); 
};
