import { shout } from "../utils";

export const partOneShout = async (input = [] as string[]) => {
  shout("Hello from Part One");

  const guard = { row: 0, col: 0, direction: "up", visited: new Set<string>() };

  const grid = input.map((line, idx) => {
    const row = line.split('');
    const guardIdx = row.findIndex((c) => c === '^');
    if (guardIdx !== -1) {
      guard.row = idx;
      guard.col = guardIdx;
      guard.visited.add(`${idx},${guardIdx}`);
    }
    
    return row.map((c) => c === '.' ? ' ' : c);
  });

  const rowLength = grid.length;
  const colLength = grid[0].length;

  let move = true;

  while (move) {
    let newRow = guard.row;
    let newCol = guard.col;

    if (guard.direction === 'up') {
      newRow--;
    } else if (guard.direction === 'down') {
      newRow++;
    } else if (guard.direction === 'left') {
      newCol--;
    } else if (guard.direction === 'right') {
      newCol++;
    }

    if (newRow < 0 || newRow >= rowLength || newCol < 0 || newCol >= colLength) {
      move = false;
      continue;
    }

    if (grid[newRow][newCol] === '#') {
      if (guard.direction === 'up') {
        guard.direction = 'right';
      } else if (guard.direction === 'down') {
        guard.direction = 'left';
      } else if (guard.direction === 'left') {
        guard.direction = 'up';
      } else if (guard.direction === 'right') {
        guard.direction = 'down';
      }
      continue;
    }

    guard.row = newRow;
    guard.col = newCol;
    guard.visited.add(`${guard.row},${guard.col}`);
    grid[guard.row][guard.col] = '+';
  }

  shout(`Visited: ${guard.visited.size}`);
};
