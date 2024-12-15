import { shout } from "../utils";

export const partOneShout = async (input = [] as string[]) => {
  shout("Hello from Part One");

  type Robot = {
    row: number;
    col: number;
    currentInstruction: number;
  }

  type Box = {
    row: number;
    col: number;
  }

  const grid: string[][] = [];
  const instructions: string[] = [];
  const boxes: Box[] = [];
  const robot: Robot = {
    row: 0,
    col: 0,
    currentInstruction: 0,
  };

  for (let i = 0; i < input.length; i++) {
    const line = input[i].split('');
    if (line[0] === '#') {
      grid.push(Array(line.length).fill('.'));
      line.forEach((char, index) => {                
        if (char === '#') {
          grid[i][index] = '#';
        } else if (char === 'O') {
          boxes.push({ row: i, col: index });
        } else if (char === '@') {
          robot.row = i;
          robot.col = index;
        }
      });
    } else if (line.length > 0) {
      instructions.push(...line);
    }
  }

  type Direction = {
    dx: number;
    dy: number;
    symbol: string;
  };

  const DIRECTIONS: { [key: string]: Direction } = {
    '>': { dx: 1, dy: 0, symbol: '>' },
    '<': { dx: -1, dy: 0, symbol: '<' },
    '^': { dx: 0, dy: -1, symbol: '^' },
    'v': { dx: 0, dy: 1, symbol: 'v' }
  };

  function moveRobotAndBoxes(
    instruction: string,
    robot: { row: number; col: number },
    boxes: { row: number; col: number }[],
    grid: string[][]
  ): void {
    const dir = DIRECTIONS[instruction];
    if (!dir) return;

    // Find boxes in path
    const boxesInPath = [];
    let currentRow = robot.row + dir.dy;
    let currentCol = robot.col + dir.dx;

    while (true) {
      const box = boxes.find(b => 
        b.row === currentRow && b.col === currentCol
      );
      if (!box) break;
      boxesInPath.push(box);
      currentRow += dir.dy;
      currentCol += dir.dx;
    }

    // Check if movement is blocked by wall
    const nextRow = boxesInPath.length > 0 
      ? boxesInPath[boxesInPath.length - 1].row + dir.dy 
      : robot.row + dir.dy;
    const nextCol = boxesInPath.length > 0 
      ? boxesInPath[boxesInPath.length - 1].col + dir.dx 
      : robot.col + dir.dx;

    const wallBlocking = grid[nextRow][nextCol] === '#';

    if (!wallBlocking) {
      // Move boxes first (from farthest to nearest)
      boxesInPath.reverse().forEach(box => {
        box.row += dir.dy;
        box.col += dir.dx;
      });
      // Then move robot
      robot.row += dir.dy;
      robot.col += dir.dx;
    }
  }

  for (const instruction of instructions) {
    moveRobotAndBoxes(instruction, robot, boxes, grid);
  }

  const finalGrid = grid.map(row => [...row]);
  boxes.forEach(box => {
    finalGrid[box.row][box.col] = 'O';
  });
  finalGrid[robot.row][robot.col] = '@';

  finalGrid.forEach(row => {
    console.log(row.join(''));
  });

  const sum = boxes.reduce((acc, box) => 
    acc + (100 * box.row) + box.col, 
  0);

  shout(`Sum: ${sum}`);
};
