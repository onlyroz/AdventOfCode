import { shout } from "../utils";

export const partTwoShout2 = async (input = [] as string[]) => {
  shout("Hello from Part Two b!");

  function findRegion(char, [y, x], region) {
    if (coords.has([y, x].toString()) || input[y][x] !== char) return;
    coords.set([y, x].toString(), []);
    regions.set(
      region,
      regions.has(region)
        ? [...regions.get(region), [y, x].toString()]
        : [[y, x].toString()]
    );
    dirs.forEach(([y1, x1]) => {
      if (input[y + y1]?.[x + x1]) findRegion(char, [y + y1, x + x1], region);
    });
  }

  const coords = new Map(),
    regions = new Map(),
    dirs = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];

  input.map(line => line.split('')).forEach((line, y) => {
    line.forEach((char, x) => {
      findRegion(char, [y, x], [y, x].toString());
    });
  });

  let results = 0;

  regions.forEach(region => {
    let sides = 0;
    region.forEach(point => {
      dirs.forEach(([y1, x1], ind) => {
        const [y, x] = point.split(",").map(x => parseInt(x)),
          left = [y + dirs[(ind + 1) % 4][0], x + dirs[(ind + 1) % 4][1]],
          right = [y + dirs[(ind + 3) % 4][0], x + dirs[(ind + 3) % 4][1]];
        if (input[y + y1]?.[x + x1] !== input[y][x]) {
          coords.set(point, [...coords.get(point), ind]);
          const a =
              !region.includes(left.toString()) ||
              !coords.get(left.toString())?.includes(ind),
            b =
              !region.includes(right.toString()) ||
              !coords.get(right.toString())?.includes(ind);
          if (a && b) sides++;
          else if (!a && !b) sides--;
        }
      });
    });
    results += sides * region.length;
  });

  console.log(results);
};
