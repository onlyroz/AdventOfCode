import { shout } from "../utils";

export const partOneShout = async (input = [] as string[]) => {
  shout("Hello from Part One");

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

  for (let i = 0; i < 100; i++) {
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
  }

  let numQuad1 = 0;
  let numQuad2 = 0;
  let numQuad3 = 0;
  let numQuad4 = 0;

  let quadWidth = Math.floor(numCols / 2);
  let quadHeight = Math.floor(numRows / 2);

  robots.forEach((robot) => {
    if (robot.row < quadHeight && robot.col < quadWidth) {
      numQuad1++;
    }

    if (robot.row < quadHeight && robot.col > quadWidth) {
      numQuad2++;
    }

    if (robot.row > quadHeight && robot.col < quadWidth) {  
      numQuad3++;
    }

    if (robot.row > quadHeight && robot.col > quadWidth) {
      numQuad4++;
    }
  });

  shout(`Safety factor: ${numQuad1 * numQuad2 * numQuad3 * numQuad4}`);
};
