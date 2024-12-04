import { shout } from "../utils";

export const partTwoShout = async (input = [] as string[]) => {
  shout("Hello from Part Two!");

  const process = (row: number, col: number, grid: string[][]) => {
    if (grid[row][col] !== 'A') return 0;

    const hasSpace = 
        row - 1 >= 0 && row + 1 < grid.length &&
        col - 1 >= 0 && col + 1 < grid[0].length;

    if (!hasSpace) return 0;

    const diag1Valid = (grid[row + 1][col + 1] === 'S' && grid[row - 1][col - 1] === 'M') || 
      (grid[row + 1][col + 1] === 'M' && grid[row - 1][col - 1] === 'S');

    const diag2Valid = (grid[row + 1][col - 1] === 'S' && grid[row - 1][col + 1] === 'M') || 
      (grid[row + 1][col - 1] === 'M' && grid[row - 1][col + 1] === 'S');

    return diag1Valid && diag2Valid ? 1 : 0;
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
