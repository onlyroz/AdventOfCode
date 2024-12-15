import { shout } from "../utils";

export const partTwoShout = async (input = [] as string[]) => {
  shout("Hello from Part Two!");

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
      grid.push(Array(line.length*2).fill('.'));
      line.forEach((char, index) => {                
        if (char === '#') {
          grid[i][index*2] = '#';
          grid[i][index*2+1] = '#';
        } else if (char === 'O') {
          boxes.push({ row: i, col: index*2 });
        } else if (char === '@') {
          robot.row = i;
          robot.col = index*2;
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

  function moveRobotAndBoxesHorizontally(instruction: string): void {
    const dir = DIRECTIONS[instruction];
    if (!dir) return;

    // Find boxes in path
    const boxesInPath: Box[] = [];
    let currentCol = robot.col + (dir.symbol === '<' ? dir.dx*2 : dir.dx);

    let counter = 0;
    while (true) {
      const box = boxes.find(b => {
          return b.row === robot.row && b.col === currentCol;
      });

      if (!box) break;
      boxesInPath.push(box);
      currentCol += dir.dx*2;
      counter++;
    }
 
    // Check if movement is blocked by wall
    const nextCol = boxesInPath.length > 0 
      ? boxesInPath[boxesInPath.length - 1].col + dir.dx*2 
      : robot.col + dir.dx;

    const wallBlocking = grid[robot.row][dir.symbol === '<' && boxesInPath.length > 0 ? nextCol+1 : nextCol] === '#';
  
    if (!wallBlocking) {
      // Move boxes first (from farthest to nearest)
      boxesInPath.reverse().forEach(box => {
        box.col += dir.dx;
      });
      // Then move robot
      robot.col += dir.dx;
    } 
  }

  function moveRobotAndBoxesVertically(instruction: string): void {
    const dir = DIRECTIONS[instruction];
    if (!dir) return;

    // Find boxes in path
    const boxesInPath: Box[] = [];

    // Find boxes immediately next to the robot
    const boxNextToRobot = boxes.find(b => {
      return b.row === robot.row + dir.dy && 
             (b.col === robot.col || b.col === robot.col-1);
    });

    if (boxNextToRobot) {
      boxesInPath.push(boxNextToRobot);
    }

    // Find boxes next to boxes in the path
    let currentRow = robot.row + (boxesInPath.length > 0 ? 2 : 1) * dir.dy;
    while (true) {
      const nextBoxes = boxes.filter(b => {
        return b.row === currentRow &&
        boxesInPath.some(bip => {
          return bip.row === currentRow - dir.dy && 
                (b.col === bip.col || b.col === bip.col-1 || b.col === bip.col+1);
        });
      });

      if (nextBoxes.length === 0) break;
      boxesInPath.push(...nextBoxes);
      currentRow += dir.dy;
    }

    // Check if movement is blocked by wall
    const wallBlocking = grid[robot.row + dir.dy][robot.col] === '#' ||
      boxesInPath.some(box => 
        grid[box.row + dir.dy][box.col] === '#' || 
        grid[box.row + dir.dy][box.col+1] === '#'
      );

    if (!wallBlocking) {
      // Move boxes first (from farthest to nearest)
      boxesInPath.reverse().forEach(box => {
        box.row += dir.dy;
      });
      // Then move robot
      robot.row += dir.dy;
    }
  }

  const printGrid = () => {
    const finalGrid = grid.map(row => [...row]);
    boxes.forEach(box => {
      finalGrid[box.row][box.col] = '[';
      finalGrid[box.row][box.col+1] = ']';
    });
    finalGrid[robot.row][robot.col] = '@';

    finalGrid.forEach(row => {
      console.log(row.join(''));
    });
  }

  for (const instruction of instructions) {
    if (instruction === '>' || instruction === '<') {
      moveRobotAndBoxesHorizontally(instruction);
    } else {
      moveRobotAndBoxesVertically(instruction);
    }
  }

  printGrid();

  const sum = boxes.reduce((acc, box) => 
    acc + (100 * box.row) + box.col, 
  0); 

  shout(`Sum: ${sum}`); 
} 