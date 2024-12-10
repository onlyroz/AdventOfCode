import { shout } from "../utils";

export const partTwoShout = async (input = [] as string[]) => {
  shout("Hello from Part Two!");
    const startTime = performance.now();

  const directions = [
    [-1, 0],  // Up
    [1, 0],   // Down
    [0, -1],  // Left
    [0, 1],   // Right
  ];

  const NUM_ROWS = input.length;
  const NUM_COLS = input[0].length;

  const grid = input.map((line) => line.split("").map(Number));

  type TrailHead = {
    row: number;
    col: number;
    score: number;
  };

  const trailHeads = grid.reduce((acc, line, rowIdx) => {
    line.forEach((value, colIdx) => {
      if (value === 0) {
        acc.push({ row: rowIdx, col: colIdx, score: 0 });
      }
    });
    return acc;
  }, [] as TrailHead[]);

  const process = (trailHead: TrailHead, row: number, col: number) => {
    const currentValue = grid[row][col];

    if (currentValue === 9) {
      trailHead.score++;
      return;
    }

    directions.forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;

      if (newRow >= 0 && newRow < NUM_ROWS && newCol >= 0 && newCol < NUM_COLS &&
        grid[newRow][newCol] - currentValue === 1) {
          process(trailHead, newRow, newCol);
      }
    });
  }

  let scores = 0;
  trailHeads.forEach((trailHead) => {
    process(trailHead, trailHead.row, trailHead.col);
    scores += trailHead.score;
  });

  const endTime = performance.now();
  shout(`Scores: ${scores}`);
  shout(`Time taken: ${((endTime - startTime)/1000).toFixed(3)} s`);
};
