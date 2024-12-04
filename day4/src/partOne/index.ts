import { shout } from "../utils";

export const partOneShout = async (input = [] as string[]) => {
  shout("Hello from Part One");

  const process = (row: number, col: number, grid: string[][]) => {
    const xmas = ['X', 'M', 'A', 'S'];
    if (grid[row][col] !== 'X') return 0;

    // Define direction vectors for all 8 directions
    const directions = [
      [-1, 0],  // Up
      [1, 0],   // Down
      [0, -1],  // Left
      [0, 1],   // Right
      [-1, -1], // Up-Left
      [-1, 1],  // Up-Right
      [1, -1],  // Down-Left
      [1, 1],   // Down-Right
    ];

    return directions.reduce((sum, [dx, dy]) => {
      // Check if we have enough space in this direction
      const hasSpace = 
        row + dx * 3 >= 0 && row + dx * 3 < grid.length &&
        col + dy * 3 >= 0 && col + dy * 3 < grid[0].length;

      if (!hasSpace) return sum;

      // Check if we have XMAS in this direction
      const isValid = [1, 2, 3].every(i => 
        grid[row + dx * i][col + dy * i] === xmas[i]
      );

      return sum + (isValid ? 1 : 0);
    }, 0);
  };

  let sum = 0;
  const grid = input.map(line => line.split(''));

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      sum += process(row, col, grid);
    }
  }

  shout(`sum: ${sum}`);
};
