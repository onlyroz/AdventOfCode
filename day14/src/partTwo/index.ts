import { shout } from "../utils";

export const partTwoShout = async (input = [] as string[]) => {
  shout("Hello from Part Two!");

  type Robot = {
    row: number;
    col: number;
    speedRow: number;
    speedCol: number;
  }

  const robots = input.map((line) => {
    const [position, velocity] = line.replace('p=','').replace('v=','').split(' ');
    const [col, row] = position.split(',').map(Number);
    const [speedCol, speedRow] = velocity.split(',').map(Number);
    return { row, col, speedRow, speedCol } as Robot;
  });

  const numCols = 101;
  const numRows = 103;
  let iterations = 0;
  let hasUniquePositions = false;

  const printGrid = () => {
    const grid = Array(numRows).fill('.').map(() => Array(numCols).fill('.'));
    robots.forEach((robot) => {
      grid[robot.row][robot.col] = 'X';
    });
    
    console.log('\nGrid state:');
    grid.forEach(row => console.log(row.join('')));
  }

  while (!hasUniquePositions) {
    // Move all robots
    robots.forEach((robot) => {
      let newRow = robot.row + robot.speedRow;
      let newCol = robot.col + robot.speedCol;

      if (newRow < 0) {
        newRow = numRows + newRow;
      }

      if (newCol < 0) {
        newCol = numCols + newCol;
      }

      if (newRow >= numRows) {
        newRow = newRow - numRows;
      }

      if (newCol >= numCols) {
        newCol = newCol - numCols;
      }

      robot.row = newRow;
      robot.col = newCol;
    });

    iterations++;

    // Check if all positions are unique
    const positions = new Set(robots.map(r => `${r.row},${r.col}`));
    if (positions.size === robots.length) {
      hasUniquePositions = true;
      console.log('\nFinal state (unique positions):');
      printGrid();
    }
  }

  shout(`Found unique positions after ${iterations} iterations`);
  return iterations; 
}; 
