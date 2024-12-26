import { useState } from 'react';

export default function Day15() {
  type Robot = {
    row: number;
    col: number;
    currentInstruction: number;
  };

  type Box = {
    row: number;
    col: number;
  };

  type Direction = {
    dx: number;
    dy: number;
    symbol: string;
  };

  const DIRECTIONS: { [key: string]: Direction } = {
    '>': { dx: 1, dy: 0, symbol: '>' },
    '<': { dx: -1, dy: 0, symbol: '<' },
    '^': { dx: 0, dy: -1, symbol: '^' },
    v: { dx: 0, dy: 1, symbol: 'v' },
  };

  const dim = 10;

  const [grid, setGrid] = useState(() =>
    Array.from({ length: dim + 2 }, (_, row) =>
      Array.from({ length: dim + 2 }, (_, col) =>
        row === 0 || row === dim + 1 || col === 0 || col === dim + 1
          ? '#'
          : '.',
      ),
    ),
  );

  const [numBoxes, setNumBoxes] = useState<number>(10);
  const [numInnerWalls, setNumInnerWalls] = useState<number>(0);

  const [boxes, setBoxes] = useState<Box[]>(() =>
    Array.from({ length: numBoxes }, () => ({
      row: Math.floor(Math.random() * dim) + 1,
      col: Math.floor(Math.random() * dim) + 1,
    })),
  );

  const [robot, setRobot] = useState<Robot>(() => {
    let row: number, col: number;
    do {
      row = Math.floor(Math.random() * dim) + 1;
      col = Math.floor(Math.random() * dim) + 1;
    } while (boxes.some((box) => box.row === row && box.col === col));

    return { row, col, currentInstruction: 0 };
  });

  const getCellContent = (rowIdx: number, colIdx: number): string => {
    if (robot.row === rowIdx && robot.col === colIdx) return '🤖';
    if (boxes.find((b) => b.row === rowIdx && b.col === colIdx)) return '📦';
    if (grid[rowIdx][colIdx] === '#') return '🧱';
    return '';
  };

  function moveRobotAndBoxes(instruction: string): void {
    const dir = DIRECTIONS[instruction];
    if (!dir) return;

    // Find boxes in path
    const boxesInPath = [];
    let currentRow = robot.row + dir.dy;
    let currentCol = robot.col + dir.dx;

    while (boxes.some((b) => b.row === currentRow && b.col === currentCol)) {
      const box = boxes.find(
        (b) => b.row === currentRow && b.col === currentCol,
      );
      if (box) {
        boxesInPath.push(box);
      }
      currentRow += dir.dy;
      currentCol += dir.dx;
    }

    // Check if movement is blocked by wall
    const nextRow =
      boxesInPath.length > 0
        ? boxesInPath[boxesInPath.length - 1].row + dir.dy
        : robot.row + dir.dy;
    const nextCol =
      boxesInPath.length > 0
        ? boxesInPath[boxesInPath.length - 1].col + dir.dx
        : robot.col + dir.dx;

    const wallBlocking = grid[nextRow][nextCol] === '#';

    if (!wallBlocking) {
      // Create new copies of the state
      const newBoxes = [...boxes];

      // Move boxes first (from farthest to nearest)
      boxesInPath.reverse().forEach((box) => {
        const boxToMove = newBoxes.find(
          (b) => b.row === box.row && b.col === box.col,
        );
        if (boxToMove) {
          boxToMove.row += dir.dy;
          boxToMove.col += dir.dx;
        }
      });

      // Update boxes state
      setBoxes(newBoxes);

      // Then move robot
      setRobot((prevRobot) => ({
        ...prevRobot,
        row: prevRobot.row + dir.dy,
        col: prevRobot.col + dir.dx,
      }));
    }
  }

  const handleSettingsChange = (newBoxCount: number, newWallCount: number) => {
    setNumBoxes(newBoxCount);
    setNumInnerWalls(newWallCount);

    // Start with a fresh grid (only outer walls)
    const newGrid = Array.from({ length: dim + 2 }, (_, row) =>
      Array.from({ length: dim + 2 }, (_, col) =>
        row === 0 || row === dim + 1 || col === 0 || col === dim + 1
          ? '#'
          : '.',
      ),
    );

    // Place inner walls first
    let wallsPlaced = 0;
    while (wallsPlaced < newWallCount) {
      const row = Math.floor(Math.random() * dim) + 1;
      const col = Math.floor(Math.random() * dim) + 1;
      if (newGrid[row][col] === '.') {
        newGrid[row][col] = '#';
        wallsPlaced++;
      }
    }
    setGrid(newGrid);

    // Generate new boxes (avoiding walls)
    const newBoxes: Box[] = [];
    while (newBoxes.length < newBoxCount) {
      const row = Math.floor(Math.random() * dim) + 1;
      const col = Math.floor(Math.random() * dim) + 1;
      if (
        newGrid[row][col] === '.' &&
        !newBoxes.some((b) => b.row === row && b.col === col)
      ) {
        newBoxes.push({ row, col });
      }
    }
    setBoxes(newBoxes);

    // Reset robot to a new position (avoiding walls and boxes)
    setRobot(() => {
      let row: number, col: number;
      do {
        row = Math.floor(Math.random() * dim) + 1;
        col = Math.floor(Math.random() * dim) + 1;
      } while (
        newGrid[row][col] === '#' ||
        newBoxes.some((box) => box.row === row && box.col === col)
      );
      return { row, col, currentInstruction: 0 };
    });
  };

  const DirectionButton = ({
    direction,
    emoji,
  }: {
    direction: string;
    emoji: string;
  }) => (
    <button
      onClick={() => moveRobotAndBoxes(direction)}
      className="text-4xl hover:scale-110 active:scale-95 transition-all duration-150">
      {emoji}
    </button>
  );

  return (
    <div className="w-full mt-4">
      <div className="flex gap-8 w-fit mx-auto items-start">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-1 w-fit">
            {grid.map((row, rowIdx) => (
              <div key={`rowIdx-${rowIdx}`} className="flex flex-row gap-1">
                {row.map((_, colIdx) => {
                  const isWall = grid[rowIdx][colIdx] === '#';
                  return (
                    <div
                      key={`colIdx-${colIdx}`}
                      className={`h-10 w-10 rounded-md flex items-center justify-center text-2xl
                        ${isWall ? 'bg-stone-700' : 'bg-purple-100'}
                      `}>
                      {getCellContent(rowIdx, colIdx)}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Settings</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Boxes: {numBoxes}
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={numBoxes}
                  onChange={(e) =>
                    handleSettingsChange(Number(e.target.value), numInnerWalls)
                  }
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Inner Walls: {numInnerWalls}
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={numInnerWalls}
                  onChange={(e) =>
                    handleSettingsChange(numBoxes, Number(e.target.value))
                  }
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <button
                onClick={() => handleSettingsChange(numBoxes, numInnerWalls)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Reset Grid
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Movement</h3>
            <div className="flex flex-col items-center gap-2">
              <DirectionButton direction="^" emoji="⬆️" />
              <div className="flex gap-8">
                <DirectionButton direction="<" emoji="⬅️" />
                <DirectionButton direction=">" emoji="➡️" />
              </div>
              <DirectionButton direction="v" emoji="⬇️" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
